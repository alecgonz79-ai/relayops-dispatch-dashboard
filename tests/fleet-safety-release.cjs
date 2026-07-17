const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const app = { innerHTML: '' };
const fileInput = { addEventListener() {}, click() {} };
const storage = new Map();
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
  classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
  focus() {}, blur() {}, setSelectionRange() {}, click() {}, querySelector() { return null; }, querySelectorAll() { return []; }
});
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
  navigator: { clipboard: { writeText: async () => true } },
  window: { scrollTo() {}, open() {} },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  },
  document: {
    body: { appendChild() {} }, activeElement: null,
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelector: () => null, querySelectorAll: () => [], createElement: element,
    addEventListener() {}, removeEventListener() {}
  }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });

vm.runInContext(`
  globalThis.__toasts=[];
  toast=(message,tone='')=>globalThis.__toasts.push({message,tone});
  render=()=>{};persist=()=>{};
  const vehicle=(number,battery,overrides={})=>({
    name:'EV'+number,vin:'7FCEHEB79PN'+String(number).padStart(6,'0'),plate:'TEST'+number,
    battery,miles:battery==null?null:Math.round(battery*1.5),active:'Active',operational:'Operational',
    source:'Amazon fleet list + FleetOS tracker',hasBattery:battery!=null,hasActive:true,hasOperational:true,
    ...overrides
  });
  const vehicles=[
    vehicle(1,90), vehicle(2,80), vehicle(3,92,{operational:'Grounded'}),
    vehicle(4,91,{active:'Inactive'}), vehicle(5,20),
    vehicle(6,null,{source:'Amazon fleet list',hasBattery:false}),
    vehicle(7,88), vehicle(8,75), vehicle(9,null)
  ];
  rivianFleet.splice(0,rivianFleet.length,...vehicles);
  const highVin=cleanVin(vehicles[6].vin),watchVin=cleanVin(vehicles[7].vin);
  state.fleetIssues={
    [highVin]:{label:'EV7',active:[{id:'high-1',text:'Brake warning',severity:'high',status:'active'}],history:[]},
    [watchVin]:{label:'EV8',active:[{id:'watch-1',text:'Cosmetic scrape',severity:'watch',status:'active'}],history:[]}
  };
  globalThis.__eligibility={
    safe:fleetVehicleAssignmentEligibility(vehicles[0]),
    grounded:fleetVehicleAssignmentEligibility(vehicles[2]),
    inactive:fleetVehicleAssignmentEligibility(vehicles[3]),
    low:fleetVehicleAssignmentEligibility(vehicles[4]),
    missing:fleetVehicleAssignmentEligibility(vehicles[5]),
    high:fleetVehicleAssignmentEligibility(vehicles[6]),
    watch:fleetVehicleAssignmentEligibility(vehicles[7]),
    unknown:fleetVehicleAssignmentEligibility(vehicles[8])
  };
  state.dspCode='LLOL';state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.morningRoutes=Array.from({length:5},(_,index)=>({
    routeUid:'safe-'+index,dsp:'LLOL',driver:'Driver '+(index+1),route:'CX'+(101+index),
    wave:'11:15 AM',staging:'STG.V.'+(index+1),service:'Standard Parcel',ev:'58',deviceName:'old',portable:'old'
  }));
  assignOperationalVehicles();
  globalThis.__assigned=state.morningRoutes.map(row=>({ev:row.ev,device:row.deviceName,portable:row.portable}));
  globalThis.__unknown=normalizeFleetVehicle({name:'EV10',vin:'7FCEHEB79PN000010',active:'Active',operational:'Operational',source:'Amazon fleet list'});
  globalThis.__unknownCard=rivianCard(globalThis.__unknown);
  globalThis.__manualWarnings={low:vehicleIssueForEquipmentId('5'),reported:vehicleIssueForEquipmentId('7')};
  state.fleetFilter='low';
  globalThis.__lowBatterySection={
    threshold:LOW_BATTERY_SECTION_THRESHOLD,
    filtered:sortedRivianFleet().map(vehicle=>vehicle.name),
    chargeRows:fleetChargeRows().map(vehicle=>vehicle.name),
    alertCount:operationalAlertGroups().find(group=>group.id==='low')?.count,
    page:fleetPage()
  };
`, context);

const e = context.__eligibility;
assert(e.safe.eligible, 'A verified active/operational EV with sufficient battery should be eligible');
assert(!e.grounded.eligible && e.grounded.reason === 'grounded', 'Grounded vehicles must never be auto-assigned');
assert(!e.inactive.eligible && e.inactive.reason === 'inactive', 'Inactive vehicles must never be auto-assigned');
assert(!e.low.eligible && e.low.lowBattery, 'Low-battery EVs must stay out of the safe assignment pool');
assert(!e.missing.eligible && /FleetOS battery unverified/.test(e.missing.reason), 'Amazon-only EVs must not be auto-assigned without FleetOS battery proof');
assert(!e.unknown.eligible && /FleetOS battery unverified/.test(e.unknown.reason), 'Unknown battery EVs must not be auto-assigned');
assert(!e.high.eligible && /fleet issue/.test(e.high.reason), 'High/critical active fleet issues must block auto-assignment');
assert(e.watch.eligible, 'Watch-level issues should remain manually reviewable without blocking the automatic safe pool');

const assigned = context.__assigned.map(row => row.ev);
assert(assigned.join(',') === '1,2,8,,', `Safe assignment should use each safe EV once and leave the shortfall blank, received ${assigned.join(',')}`);
assert(new Set(assigned.filter(Boolean)).size === assigned.filter(Boolean).length, 'Automatic assignment must never repeat a van');
assert(context.__assigned.slice(3).every(row => row.device === '' && row.portable === ''), 'Unfilled routes must not retain stale device or portable assignments');
assert(context.__toasts.some(row => /left blank/.test(row.message)), 'An insufficient safe pool must produce a clear operator warning');

assert(context.__unknown.battery === null && context.__unknown.miles === null, 'Missing battery/range must remain unknown instead of becoming synthetic values');
assert(context.__unknownCard.includes('Unknown battery / range') && !context.__unknownCard.includes('63%'), 'Fleet card must honestly display unknown battery/range');
assert(context.__unknownCard.includes('Battery unknown') && !context.__unknownCard.includes('Charge now'), 'Unknown charge must not be categorized as a zero-percent/charge-now battery');
assert(context.__manualWarnings.low?.type === 'battery' && context.__manualWarnings.reported?.type === 'reported', 'Manual Morning Sheet edits must retain low-battery and reported-issue flags');
assert(context.__lowBatterySection.threshold===80,'Fleet low-battery section threshold must be 80%');
assert(context.__lowBatterySection.filtered.length===3&&['EV2','EV5','EV8'].every(name=>context.__lowBatterySection.filtered.includes(name)),'Low-battery filter must include every EV at 80% or lower and exclude EVs above 80%');
assert(context.__lowBatterySection.chargeRows.join(',')==='EV5,EV8,EV2','Recommended charging section must use the same inclusive 80% threshold');
assert(context.__lowBatterySection.alertCount===3&&context.__lowBatterySection.page.includes('80% or lower'),'Fleet alert counts and visible copy must explain the inclusive 80% threshold');

console.log('Fleet assignment safety and honest unknown-battery regression contracts passed');
