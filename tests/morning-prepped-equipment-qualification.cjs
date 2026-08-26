const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
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
vm.runInContext(appSource, context, { filename: 'app.js' });
vm.runInContext(`
  globalThis.__toasts=[];
  globalThis.__persistedEquipment=[];
  toast=(message,tone)=>globalThis.__toasts.push({message,tone});
  render=()=>{};
  persist=()=>globalThis.__persistedEquipment.push(JSON.parse(JSON.stringify(state.equipmentImport)));
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

  // The two reported rows are ready. EV3 is below the dispatch threshold,
  // EV4 is grounded, and EV5 has a Portable but no Device.
  const dailyFleet=[
    ev(1),
    ev(2),
    ev(3,{battery:39}),
    ev(4,{operational:'Grounded'}),
    ev(5)
  ];
  rivianFleet.splice(0,rivianFleet.length,...dailyFleet);
  state.fleetImport={name:'Daily Fleet Health',vehicles:JSON.parse(JSON.stringify(dailyFleet))};
  state.fleetSourceUploads={
    amazon:{name:'VehiclesData.xlsx',vehicles:JSON.parse(JSON.stringify(dailyFleet)),uploadedAt:new Date().toISOString()},
    fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(dailyFleet)),uploadedAt:new Date().toISOString()}
  };
  state.equipmentImport={name:'Reported Device and Portable rows',details:{
    '1':{device:'23',portable:'92'},
    '2':{device:'80',portable:'-'},
    '3':{device:'31',portable:'93'},
    '4':{device:'41',portable:'94'},
    '5':{device:'',portable:'95'}
  }};

  const route=(uid,driver,code,wave)=>({
    routeUid:uid,dsp:'LLOL',driver,route:code,service:'Standard Parcel',wave,
    staging:'STG.V.1',padOverride:'',ev:'',deviceName:'',portable:'',
    deviceReady:false,portableReady:false
  });
  const freshRoutes=(count=2)=>[
    route('route-1','Driver One','CX101','11:15 AM'),
    route('route-2','Driver Two','CX102','11:20 AM'),
    route('route-3','Driver Three','CX103','11:25 AM')
  ].slice(0,count);
  const assignedRoute=()=>({
    ...route('existing-route','Existing Driver','CX999','11:15 AM'),
    ev:'44',deviceName:'144',portable:'244',deviceReady:true,portableReady:true
  });

  globalThis.__qualification={
    ev1:preppedEquipmentAssignmentFor('EV1'),
    ev2:preppedEquipmentAssignmentFor('EV2'),
    low:fleetVehicleAssignmentEligibility('EV3'),
    grounded:fleetVehicleAssignmentEligibility('EV4'),
    noDevice:preppedEquipmentAssignmentFor('EV5')
  };

  // Assign safe vans is based on verified Fleet Health. EV5 deliberately has
  // no Device, but must still be assigned because it is active, operational,
  // issue-free, and above the dispatch battery threshold.
  state.morningRoutes=freshRoutes(3);
  assignOperationalVehicles();
  globalThis.__assignedSafe=JSON.parse(JSON.stringify(state.morningRoutes));

  // Prepped Vans is the narrower Device-ready action. A Portable may be blank
  // or '-', but a Device is still required, so EV5 must stay out of this pool.
  state.morningRoutes=freshRoutes(2);
  assignBagReadyVehicles();
  globalThis.__assignedPrepped=JSON.parse(JSON.stringify(state.morningRoutes));

  const guardResult=()=>({
    route:JSON.parse(JSON.stringify(state.morningRoutes[0])),
    toast:JSON.parse(JSON.stringify(globalThis.__toasts.at(-1)||{}))
  });
  globalThis.__guardResults={};

  // Missing daily Fleet Health data must never use demo/stale rows or clear a
  // dispatcher assignment that is already on the Morning Sheet.
  state.morningRoutes=[assignedRoute()];
  state.fleetImport=null;state.fleetSourceUploads={};
  rivianFleet.splice(0,rivianFleet.length,...demoRivianFleet.map(vehicle=>normalizeFleetVehicle(vehicle)));
  globalThis.__toasts=[];
  assignOperationalVehicles();
  globalThis.__guardResults.missingFleet=guardResult();

  // A real daily import can legitimately contain no dispatch-safe vans. Keep
  // the current assignment and explain the safety shortage.
  const unsafeFleet=[ev(3,{battery:39}),ev(4,{operational:'Grounded'})];
  rivianFleet.splice(0,rivianFleet.length,...unsafeFleet);
  state.fleetImport={name:'Unsafe daily Fleet Health',vehicles:JSON.parse(JSON.stringify(unsafeFleet))};
  state.fleetSourceUploads={fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(unsafeFleet)),uploadedAt:new Date().toISOString()}};
  state.morningRoutes=[assignedRoute()];
  globalThis.__toasts=[];
  assignOperationalVehicles();
  globalThis.__guardResults.noSafeFleet=guardResult();

  // Prepped Vans with safe Fleet Health but no Device entries is also a
  // diagnostic-only condition; it must not erase existing assignments.
  rivianFleet.splice(0,rivianFleet.length,ev(1),ev(2));
  state.fleetImport={name:'Safe daily Fleet Health',vehicles:JSON.parse(JSON.stringify(rivianFleet))};
  state.fleetSourceUploads={fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(rivianFleet)),uploadedAt:new Date().toISOString()}};
  state.equipmentImport={name:'Empty Device Sheet',details:{}};
  state.morningRoutes=[assignedRoute()];
  globalThis.__toasts=[];
  assignBagReadyVehicles();
  globalThis.__guardResults.noPreppedDevices=guardResult();

  globalThis.__reviewResults={};

  // A filtered assignment must reserve every van already used outside the
  // visible target set. If that consumes the entire safe pool, this action is
  // a no-op rather than a reason to erase the target's current assignment.
  rivianFleet.splice(0,rivianFleet.length,ev(1),ev(2));
  state.fleetImport={name:'Filtered daily Fleet Health',vehicles:JSON.parse(JSON.stringify(rivianFleet))};
  state.fleetSourceUploads={fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(rivianFleet)),uploadedAt:new Date().toISOString()}};
  state.equipmentImport={name:'Filtered Device Sheet',details:{
    '1':{device:'23',portable:'92'},
    '2':{device:'80',portable:'-'}
  }};
  state.equipmentIssues={};
  state.morningFilters={wave:'11:15 AM',staging:'all',pad:'all'};
  state.morningRoutes=[
    assignedRoute(),
    {...route('reserved-1','Reserved Driver One','CX201','11:20 AM'),ev:'1',deviceName:'23',portable:'92',deviceReady:true,portableReady:true},
    {...route('reserved-2','Reserved Driver Two','CX301','11:25 AM'),ev:'2',deviceName:'80',portable:'-',deviceReady:true,portableReady:false}
  ];
  const reservedBefore=JSON.parse(JSON.stringify(state.morningRoutes));
  globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  assignOperationalVehicles();
  globalThis.__reviewResults.reservedPool={
    before:reservedBefore,
    after:JSON.parse(JSON.stringify(state.morningRoutes)),
    persistCount:globalThis.__persistedEquipment.length,
    toast:JSON.parse(JSON.stringify(globalThis.__toasts.at(-1)||{}))
  };

  // High/critical issues belong to the physical Device. A van with one of
  // those Devices is not a Prepped Van even when Fleet Health itself is safe.
  rivianFleet.splice(0,rivianFleet.length,ev(1),ev(2),ev(5));
  state.fleetImport={name:'Issue daily Fleet Health',vehicles:JSON.parse(JSON.stringify(rivianFleet))};
  state.fleetSourceUploads={fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(rivianFleet)),uploadedAt:new Date().toISOString()}};
  state.equipmentImport={name:'Issue Device Sheet',details:{
    '1':{device:'23',portable:'92'},
    '2':{device:'80',portable:'-'},
    '5':{device:'55',portable:''}
  }};
  state.equipmentIssues={
    'device:23':{type:'device',equipmentId:'23',label:'Device 23',active:[{id:'high-23',text:'Broken screen',severity:'high',status:'active',createdAt:new Date().toISOString()}],history:[]},
    'device:80':{type:'device',equipmentId:'80',label:'Device 80',active:[{id:'critical-80',text:'Will not power on',severity:'critical',status:'active',createdAt:new Date().toISOString()}],history:[]}
  };
  state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.morningRoutes=freshRoutes(1);
  globalThis.__toasts=[];
  assignBagReadyVehicles();
  globalThis.__reviewResults.issueBlocked={
    route:JSON.parse(JSON.stringify(state.morningRoutes[0])),
    pool:automaticFleetVehiclePool({electricOnly:true,requireDevice:true}).map(item=>item.key)
  };

  // A FleetOS row proves only VIN, battery, and range. Merging it over a
  // carried/demo card must not turn the demo card's Active / Operational text
  // into verified Amazon status. Even with a Device, both actions are no-ops.
  const fleetosOnlyVin='7FCEHEB25RN017610';
  const carriedDemo=normalizeFleetVehicle({
    name:'EV53',vin:fleetosOnlyVin,active:'Active',operational:'Operational',
    source:'Demo data',hasName:false,hasPlate:false,hasActive:false,
    hasOperational:false,hasBattery:false,hasMiles:false
  });
  rivianFleet.splice(0,rivianFleet.length,carriedDemo);
  const fleetosOnlyRow=normalizeFleetVehicle({
    name:fleetosOnlyVin,vin:fleetosOnlyVin,battery:96,miles:151,
    source:'FleetOS tracker',hasName:false,hasPlate:false,hasActive:false,
    hasOperational:false,hasBattery:true,hasMiles:true
  });
  const fleetosOnlyMerged=mergeFleetVehicles([fleetosOnlyRow]);
  rivianFleet.splice(0,rivianFleet.length,...fleetosOnlyMerged);
  state.fleetImport={name:'FleetOS-only daily row',vehicles:[JSON.parse(JSON.stringify(fleetosOnlyRow))]};
  state.fleetSourceUploads={fleetos:{name:'Vehicle_List.csv',vehicles:[JSON.parse(JSON.stringify(fleetosOnlyRow))],uploadedAt:new Date().toISOString()}};
  state.equipmentImport={name:'FleetOS-only Device row',details:{'53':{device:'153',portable:'-'}}};
  state.equipmentIssues={};state.morningFilters={wave:'all',staging:'all',pad:'all'};
  const fleetosOnlyEligibility=fleetVehicleAssignmentEligibility(rivianFleet[0]);
  const fleetosOnlyPools={
    safe:automaticFleetVehiclePool({electricOnly:true,requireDevice:false}).map(item=>item.key),
    prepped:automaticFleetVehiclePool({electricOnly:true,requireDevice:true}).map(item=>item.key)
  };
  state.morningRoutes=[assignedRoute()];globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  assignOperationalVehicles();
  const fleetosOnlySafe={...guardResult(),persistCount:globalThis.__persistedEquipment.length};
  state.morningRoutes=[assignedRoute()];globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  assignBagReadyVehicles();
  const fleetosOnlyPrepped={...guardResult(),persistCount:globalThis.__persistedEquipment.length};
  globalThis.__reviewResults.fleetosOnlyCarried={
    vehicle:JSON.parse(JSON.stringify(rivianFleet[0])),
    eligibility:JSON.parse(JSON.stringify(fleetosOnlyEligibility)),
    pools:fleetosOnlyPools,safe:fleetosOnlySafe,prepped:fleetosOnlyPrepped
  };

  // Parking order is also fail-closed. A parked Device-ready van that fails
  // Fleet Health must leave the current Morning assignment and shared state
  // untouched rather than clearing the row before discovering an empty pool.
  parkingSlots=zone=>zone==='west'?[{value:'EV53'}]:[];
  state.morningRoutes=[assignedRoute()];globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  assignVansByParking();
  globalThis.__reviewResults.noSafeParking={
    ...guardResult(),persistCount:globalThis.__persistedEquipment.length
  };

  // The guided gas picker revalidates its selections at apply time. If its
  // saved selection has become inactive, it must not erase the selected DA's
  // existing EV/Device/Portable assignment or persist a partial update.
  const unsafeGas=normalizeFleetVehicle({
    name:'F33',vin:'1FTYR3XM1PKA00033',active:'Inactive',operational:'Operational',
    source:'Amazon fleet list',hasName:true,hasActive:true,hasOperational:true,
    hasBattery:false,hasMiles:false
  });
  rivianFleet.splice(0,rivianFleet.length,unsafeGas);
  state.equipmentImport={name:'Gas Device row',details:{F33:{device:'33',portable:'-'}}};
  state.morningRoutes=[assignedRoute()];
  state.gasAssignmentRoutes=['CX999'];state.gasAssignmentVans=['F33'];
  globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  applyGasVehicleAssignment();
  globalThis.__reviewResults.noSafeSelectedGas={
    ...guardResult(),persistCount:globalThis.__persistedEquipment.length,
    modal:state.modal,routes:[...(state.gasAssignmentRoutes||[])],vans:[...(state.gasAssignmentVans||[])]
  };

  // "with Helper" describes a legitimate CX service, not a helper-only row.
  // Every assignment method must include that CX while leaving the explicit
  // HELPER row (and its helper bag assignment) unchanged.
  const helperFleet=[ev(1)];
  rivianFleet.splice(0,rivianFleet.length,...helperFleet);
  state.fleetImport={name:'Helper classification Fleet Health',vehicles:JSON.parse(JSON.stringify(helperFleet))};
  state.fleetSourceUploads={
    amazon:{name:'VehiclesData.xlsx',vehicles:JSON.parse(JSON.stringify(helperFleet)),uploadedAt:new Date().toISOString()},
    fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(helperFleet)),uploadedAt:new Date().toISOString()}
  };
  state.equipmentImport={name:'Helper classification Device rows',details:{'1':{device:'23',portable:'92'}}};
  state.equipmentIssues={};state.morningFilters={wave:'all',staging:'all',pad:'all'};
  const cxWithHelper=()=>({...route('cx-with-helper','CX With Helper Driver','CX410','11:15 AM'),service:'Standard Parcel Electric - Rivian MEDIUM with Helper'});
  const explicitHelper=()=>({...route('explicit-helper','Helper Associate','HELPER1','HELPER'),service:'Helper Associate',ev:'77',deviceName:'177',portable:'277',deviceReady:true,portableReady:true});
  const helperClassification={
    cx:isExplicitHelperMorningRoute(cxWithHelper()),
    explicit:isExplicitHelperMorningRoute(explicitHelper())
  };
  const helperRun=actionFn=>{
    state.morningRoutes=[cxWithHelper(),explicitHelper()];globalThis.__toasts=[];
    actionFn();
    return JSON.parse(JSON.stringify(state.morningRoutes));
  };
  const helperSafe=helperRun(assignOperationalVehicles);
  const helperPrepped=helperRun(assignBagReadyVehicles);
  parkingSlots=zone=>zone==='west'?[{value:'EV1'}]:[];
  const helperParking=helperRun(assignVansByParking);
  globalThis.__reviewResults.helperClassification={
    classification:helperClassification,safe:helperSafe,prepped:helperPrepped,parking:helperParking
  };

  // Opening Add devices is non-destructive. Pasting a valid, nonempty table
  // merges with the retained rows and immediately persists the shared daily
  // equipment data, even before the dispatcher presses Fill cells.
  state.equipmentImport={name:'Existing equipment',details:{'1':{device:'23',portable:'92'}}};
  globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  const beforeOpen=JSON.parse(JSON.stringify(state.equipmentImport));
  action('equipment-import',{});
  const afterOpen=JSON.parse(JSON.stringify(state.equipmentImport));
  handleEquipmentPaste({
    preventDefault(){},
    clipboardData:{files:[],getData:()=> 'VAN\\tDEVICE\\tPORTABLE\\nEV2\\t80\\t-'}
  });
  globalThis.__equipmentLifecycle={
    beforeOpen,afterOpen,
    afterPaste:JSON.parse(JSON.stringify(state.equipmentImport)),
    persisted:JSON.parse(JSON.stringify(globalThis.__persistedEquipment))
  };

  // A pasted row that reuses a Device already saved on another van is an
  // atomic rejection: no merge, no persist, and no partial name/text change.
  globalThis.__persistedEquipment=[];globalThis.__toasts=[];
  const collisionBefore=JSON.parse(JSON.stringify(state.equipmentImport));
  handleEquipmentPaste({
    preventDefault(){},
    clipboardData:{files:[],getData:()=> 'VAN\\tDEVICE\\tPORTABLE\\nEV3\\t23\\t99'}
  });
  globalThis.__reviewResults.deviceCollision={
    before:collisionBefore,
    after:JSON.parse(JSON.stringify(state.equipmentImport)),
    persistCount:globalThis.__persistedEquipment.length,
    toast:JSON.parse(JSON.stringify(globalThis.__toasts.at(-1)||{}))
  };
`, context);

function proveAssignments(rows, actionLabel) {
  const normalized = JSON.parse(JSON.stringify(rows));
  const expected = actionLabel === 'Assign safe vans'
    ? [
        { ev: '1', device: '23', portable: '92' },
        { ev: '2', device: '80', portable: '-' },
        { ev: '5', device: '', portable: '95' }
      ]
    : [
        { ev: '1', device: '23', portable: '92' },
        { ev: '2', device: '80', portable: '-' }
      ];
  assert.deepStrictEqual(
    normalized.map(row => ({ ev: row.ev, device: row.deviceName, portable: row.portable })),
    expected,
    `${actionLabel} used the wrong Fleet Health/Device qualification rule`
  );
  assert.strictEqual(normalized[0].deviceReady, true, `${actionLabel} did not mark Device 23 ready`);
  assert.strictEqual(normalized[1].deviceReady, true, `${actionLabel} did not mark Device 80 ready`);
  assert.strictEqual(normalized[1].portableReady, false, `${actionLabel} incorrectly marked Portable '-' ready`);
  assert(!normalized.some(row => ['3', '4'].includes(String(row.ev))), `${actionLabel} assigned a low or grounded EV`);
  if(actionLabel === 'Prepped Vans')assert(!normalized.some(row => String(row.ev) === '5'), 'Prepped Vans assigned EV5 without a Device');
}

assert.strictEqual(context.__qualification.ev1.device, '23', 'EV1 Device 23 was not recognized as usable equipment');
assert.strictEqual(context.__qualification.ev1.portable, '92', 'EV1 Portable 92 was not preserved');
assert.strictEqual(context.__qualification.ev2.device, '80', 'EV2 Device 80 was not recognized as usable equipment');
assert.strictEqual(context.__qualification.ev2.portable, '-', "EV2 Portable '-' was not preserved as an allowed missing Portable");
assert.strictEqual(context.__qualification.low.eligible, false, 'EV3 at 39% must remain excluded');
assert.strictEqual(context.__qualification.grounded.eligible, false, 'Grounded EV4 must remain excluded');
assert.strictEqual(context.__qualification.noDevice, null, 'EV5 with no Device must remain excluded from Prepped Vans even when it has a Portable');

proveAssignments(context.__assignedSafe, 'Assign safe vans');
proveAssignments(context.__assignedPrepped, 'Prepped Vans');

function provePreservedGuard(result, diagnostic, message) {
  assert.deepStrictEqual(
    { ev: result.route.ev, device: result.route.deviceName, portable: result.route.portable },
    { ev: '44', device: '144', portable: '244' },
    `${message} erased a pre-existing Morning Sheet assignment`
  );
  assert.strictEqual(result.toast.tone, 'error', `${message} must produce a visible error diagnostic`);
  assert(diagnostic.test(result.toast.message || ''), `${message} diagnostic was not specific: ${result.toast.message || '(none)'}`);
}

const guardResults = JSON.parse(JSON.stringify(context.__guardResults));
provePreservedGuard(guardResults.missingFleet, /fleet health.*(?:upload|import|refresh)|(?:upload|import|refresh).*fleet health/i, 'Missing daily Fleet Health');
provePreservedGuard(guardResults.noSafeFleet, /no .*safe|grounded|low battery|dispatch-safe/i, 'No verified-safe fleet pool');
provePreservedGuard(guardResults.noPreppedDevices, /prepped.*device|device.*prepped|enter.*device/i, 'No Device-ready Prepped Vans pool');

const lifecycle = JSON.parse(JSON.stringify(context.__equipmentLifecycle));
assert.deepStrictEqual(lifecycle.afterOpen, lifecycle.beforeOpen, 'Opening Add devices cleared the existing equipment import');
assert.strictEqual(lifecycle.afterPaste.details['1'].device, '23', 'A new equipment paste replaced previously saved rows');
assert.strictEqual(lifecycle.afterPaste.details['2'].device, '80', 'The valid pasted Device row was not parsed');
assert.strictEqual(lifecycle.afterPaste.details['2'].portable, '-', "The valid pasted Portable '-' was not preserved");
assert(
  lifecycle.persisted.some(record => record?.details?.['1']?.device === '23' && record?.details?.['2']?.device === '80'),
  'A successful nonempty equipment paste was not persisted immediately'
);

const reviewResults = JSON.parse(JSON.stringify(context.__reviewResults));
assert.deepStrictEqual(
  reviewResults.reservedPool.after,
  reviewResults.reservedPool.before,
  'A filtered assignment erased or changed routes when every safe candidate was reserved outside the filter'
);
assert.strictEqual(reviewResults.reservedPool.persistCount, 0, 'An all-reserved filtered assignment persisted a mutation');

assert.strictEqual(reviewResults.issueBlocked.route.ev, '5', 'Prepped Vans assigned a Device with an active high/critical issue');
assert.strictEqual(reviewResults.issueBlocked.route.deviceName, '55', 'Prepped Vans did not fall through to the safe issue-free Device');
assert.strictEqual(reviewResults.issueBlocked.pool.join(','), '5', 'High and critical Device issues remained in the Prepped Vans pool');

const fleetosOnly = reviewResults.fleetosOnlyCarried;
assert.strictEqual(fleetosOnly.vehicle.name, 'EV53', 'The fixed EV53 VIN identity was lost during the FleetOS-only merge');
assert.strictEqual(fleetosOnly.vehicle.battery, 96, 'The verified FleetOS battery was not retained');
assert.strictEqual(fleetosOnly.vehicle.active, 'Active', 'The fixture no longer proves carried Active text');
assert.strictEqual(fleetosOnly.vehicle.operational, 'Operational', 'The fixture no longer proves carried Operational text');
assert(!/amazon fleet list/i.test(fleetosOnly.vehicle.source), 'The FleetOS-only fixture accidentally gained Amazon provenance');
assert.strictEqual(fleetosOnly.vehicle.hasActive, false, 'The FleetOS-only fixture accidentally marked Active as source-verified');
assert.strictEqual(fleetosOnly.vehicle.hasOperational, false, 'The FleetOS-only fixture accidentally marked Operational as source-verified');
assert.strictEqual(fleetosOnly.eligibility.eligible, false, 'FleetOS VIN+battery plus carried/demo statuses became dispatch eligible');
assert(/amazon.*(?:status|active|operational).*unverified/i.test(fleetosOnly.eligibility.reason || ''), `FleetOS-only rejection did not identify missing Amazon status proof: ${fleetosOnly.eligibility.reason || '(none)'}`);
assert.deepStrictEqual(fleetosOnly.pools.safe, [], 'Assign safe vans included a FleetOS-only carried-status row');
assert.deepStrictEqual(fleetosOnly.pools.prepped, [], 'Prepped Vans included a FleetOS-only carried-status row with a Device');
provePreservedGuard(fleetosOnly.safe, /no .*safe|unverified/i, 'FleetOS-only Assign safe vans');
provePreservedGuard(fleetosOnly.prepped, /no .*safe|unverified/i, 'FleetOS-only Prepped Vans');
assert.strictEqual(fleetosOnly.safe.persistCount, 0, 'FleetOS-only Assign safe vans persisted a mutation');
assert.strictEqual(fleetosOnly.prepped.persistCount, 0, 'FleetOS-only Prepped Vans persisted a mutation');

provePreservedGuard(reviewResults.noSafeParking, /parking|prepped vans/i, 'No-safe Parking order');
assert.strictEqual(reviewResults.noSafeParking.persistCount, 0, 'No-safe Parking order persisted a mutation');
provePreservedGuard(reviewResults.noSafeSelectedGas, /gas vans.*(?:safe|verified)|no assignments changed/i, 'No-safe selected gas vans');
assert.strictEqual(reviewResults.noSafeSelectedGas.persistCount, 0, 'No-safe selected gas vans persisted a mutation');

const helperQualification = reviewResults.helperClassification;
assert.strictEqual(helperQualification.classification.cx, false, "A legitimate CX service containing 'with Helper' was misclassified as a helper-only row");
assert.strictEqual(helperQualification.classification.explicit, true, 'An explicit HELPER row was not classified as helper-only');
for (const [label, rows] of Object.entries({
  'Assign safe vans': helperQualification.safe,
  'Prepped Vans': helperQualification.prepped,
  'Parking order': helperQualification.parking
})) {
  assert.deepStrictEqual(
    {ev:rows[0].ev,device:rows[0].deviceName,portable:rows[0].portable},
    {ev:'1',device:'23',portable:'92'},
    `${label} excluded a legitimate CX route merely because its service contains 'with Helper'`
  );
  assert.deepStrictEqual(
    {ev:rows[1].ev,device:rows[1].deviceName,portable:rows[1].portable},
    {ev:'77',device:'177',portable:'277'},
    `${label} changed an explicit HELPER row`
  );
}

assert.deepStrictEqual(
  reviewResults.deviceCollision.after,
  reviewResults.deviceCollision.before,
  'A duplicate Device paste partially mutated the saved equipment import'
);
assert.strictEqual(reviewResults.deviceCollision.persistCount, 0, 'A rejected duplicate Device paste was persisted');
assert.strictEqual(reviewResults.deviceCollision.toast.tone, 'error', 'A duplicate Device paste did not report an error');
assert(/device 23/i.test(reviewResults.deviceCollision.toast.message || ''), `Duplicate Device diagnostic did not identify Device 23: ${reviewResults.deviceCollision.toast.message || '(none)'}`);

const equipmentActionBranch = appSource.match(/if \(name==='equipment-import'\) \{([^}]*)\}/)?.[1] || '';
assert(!/equipmentImport\s*=\s*null/.test(equipmentActionBranch), 'The Add devices action must never clear equipmentImport');

console.log("Morning van qualification passed: source provenance, Fleet/Device rules, helper targeting, fail-closed pools, duplicate rejection, and non-destructive persisted imports are protected");
