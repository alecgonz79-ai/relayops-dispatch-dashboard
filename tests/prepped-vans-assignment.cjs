const fs = require('fs');
const vm = require('vm');

const failures = [];
function check(condition, message) { if (!condition) failures.push(message); }

const storage = new Map();
const app = { innerHTML: '' };
const fileInput = { accept: '', addEventListener() {}, click() {} };
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
  classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
  focus() {}, blur() {}, select() {}, setSelectionRange() {}, click() {},
  querySelector() { return null; }, querySelectorAll() { return []; }
});
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout,
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
    querySelector() { return null; }, querySelectorAll() { return []; },
    createElement: element, addEventListener() {}, removeEventListener() {}
  }
};

vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
vm.runInContext(`
  globalThis.__toasts=[];
  toast=(message,tone)=>globalThis.__toasts.push({message,tone});
  render=()=>{};persist=()=>{};
  state.dspCode='LLOL';
  state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.driverContacts=[];state.driverProfiles={};state.driverNameAliases={};
  state.fleetIssues={};state.equipmentIssues={};

  const ev=(number,overrides={})=>({
    name:'EV'+number,
    vin:'7FCEHEB79PN'+String(number).padStart(6,'0'),
    battery:95,
    miles:150,
    vehicleType:'Rivian EDV 700',
    operational:'Operational',
    active:'Active',
    source:'Amazon fleet list + FleetOS tracker',
    hasBattery:true,
    hasMiles:true,
    hasActive:true,
    hasOperational:true,
    ...overrides
  });

  // EV1-EV7 and EV10 are safe. EV7 starts assigned and must be reserved.
  // EV10 intentionally appears twice to prove duplicate Fleet rows collapse
  // to one usable van. EV8 is grounded; EV9 has no Device.
  rivianFleet.splice(0,rivianFleet.length,
    ev(1),ev(2),ev(3),ev(4),ev(5),ev(6),ev(7),
    ev(8,{operational:'Grounded'}),ev(9),ev(10),ev(10)
  );
  state.equipmentImport={name:'Prepped Vans regression',details:{
    '1':{device:'D1',portable:'P1'},
    '2':{device:'D2',portable:'-'},
    '3':{device:'D3',portable:''},
    '4':{device:'D4',portable:'P4'},
    '5':{device:'D5',portable:'-'},
    '6':{device:'D6',portable:''},
    '7':{device:'D7',portable:'P7'},
    '8':{device:'D8',portable:'P8'},
    '9':{device:'',portable:'P9'},
    '10':{device:'D10',portable:'P10'}
  }};

  const route=(uid,driver,cx,wave,evId='',service='Standard Parcel')=>({
    routeUid:uid,dsp:'LLOL',driver,route:cx,service,wave,
    staging:'STG.V.1',padOverride:'',ev:evId,
    deviceName:evId?'D'+evId:'',portable:evId?'P'+evId:''
  });
  state.morningRoutes=[
    // Helper rows are outside the Prepped Vans target set. Their existing EV
    // still has to be reserved so it cannot be duplicated onto a route driver.
    route('existing','Existing Helper','HELPER-1','Ad hoc','7','Helper'),
    route('wave-1','Wave 1 Driver','CX101','11:15 AM'),
    route('wave-2','Wave 2 Driver','CX201','11:20 AM'),
    route('wave-3','Wave 3 Driver','CX301','11:25 AM'),
    route('wave-4','Wave 4 Driver','CX401','11:40 AM'),
    route('wave-5','Wave 5 Driver','CX501','11:45 AM'),
    route('wave-6a','Wave 6 Driver A','CX601','11:50 AM'),
    route('wave-6b','Wave 6 Driver B','CX602','11:50 AM')
  ];
  assignBagReadyVehicles();
  globalThis.__rows=JSON.parse(JSON.stringify(state.morningRoutes));
  globalThis.__pool=automaticFleetVehiclePool({electricOnly:true}).map(item=>item.key);
  globalThis.__equipment=JSON.parse(JSON.stringify(state.equipmentImport.details));
`, context);

const rows = context.__rows;
const existing = rows.find(row => row.routeUid === 'existing');
const targets = rows.filter(row => row.routeUid !== 'existing');
const targetIds = targets.map(row => String(row.ev || ''));
const allAssignedIds = rows.map(row => String(row.ev || '')).filter(Boolean);
const expectedFreeIds = ['1','2','3','4','5','6','10'];

check(existing.ev === '7' && existing.deviceName === 'D7' && existing.portable === 'P7',
  'Prepped Vans replaced an existing EV7 assignment instead of reserving it.');
check(targets.every(row => row.ev),
  `Prepped Vans left ${targets.filter(row => !row.ev).map(row => row.driver).join(', ') || 'no'} unassigned while safe Device-equipped EVs remained.`);
check(new Set(allAssignedIds).size === allAssignedIds.length,
  `Prepped Vans assigned a duplicate/already-used vehicle (${allAssignedIds.join(', ')}).`);
check([...targetIds].sort((a,b)=>Number(a)-Number(b)).join(',') === expectedFreeIds.join(','),
  `Expected free safe EVs ${expectedFreeIds.join(',')} across Waves 1-6; got ${targetIds.filter(Boolean).sort((a,b)=>Number(a)-Number(b)).join(',') || 'none'}.`);
check(!targetIds.includes('8') && !targetIds.includes('9'),
  'Prepped Vans assigned a grounded EV or an EV without a Device.');

for (const id of ['2','3','5','6']) {
  const row = targets.find(item => String(item.ev) === id);
  const expectedPortable = context.__equipment[id].portable;
  check(Boolean(row), `EV${id} was blocked only because Portable was ${expectedPortable === '' ? 'blank' : `'${expectedPortable}'`}.`);
  if (row) {
    check(row.deviceName === `D${id}` && row.portable === expectedPortable,
      `EV${id} did not carry its Device/Portable values onto the assigned route.`);
  }
}

const freeEligible = context.__pool.filter(id => id !== '7');
const stranded = freeEligible.filter(id => !targetIds.includes(id));
const missingDrivers = targets.filter(row => !row.ev);
check(!(stranded.length && missingDrivers.length),
  `Invariant failed: eligible EV(s) ${stranded.join(',')} were stranded while ${missingDrivers.length} route driver(s) lacked a van.`);

if (failures.length) {
  console.error(`Prepped Vans regression failed (${failures.length}):`);
  failures.forEach((message,index)=>console.error(`${index+1}. ${message}`));
  process.exitCode = 1;
} else {
  console.log('Prepped Vans regression passed: Waves 1-6 filled, blank/dash Portable allowed, unsafe/duplicate/used vans excluded.');
}
