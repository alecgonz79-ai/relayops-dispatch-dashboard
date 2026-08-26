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

console.log("Morning van qualification passed: Fleet/Device rules, reserved filters, issue blocks, duplicate rejection, and non-destructive persisted imports are protected");
