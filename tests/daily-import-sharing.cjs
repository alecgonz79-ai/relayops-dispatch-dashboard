const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

const APP_SOURCE = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const CLOUD_SOURCE = fs.readFileSync(require.resolve('../cloud-sync.js'), 'utf8');
const clone = value => JSON.parse(JSON.stringify(value));

const DAILY_IMPORT_FIELDS = [
  'fleetImport', 'fleetSourceUploads', 'fleetExpectedCount', 'fleetLastRefresh',
  'equipmentImport', 'deviceCustomRows', 'removedDeviceVehicleIds',
  'vanParking', 'vanParkingUpdated', 'chargingStationChecked',
  'vanParkingBatteries', 'parkingChargerStatus', 'parkingNotes'
];

const PERMANENT_FIELDS = [
  'driverContacts', 'driverContactsLastImport', 'driverNameAliases', 'driverProfiles',
  'fleetNameOverrides', 'fleetIssues', 'equipmentIssues',
  'morningSheetsEndpoint', 'slackReportRoomUrl'
];

function appContext({
  href = 'https://relayops.example.test/?date=2026-08-04',
  now = '2026-08-04T19:00:00.000Z',
  cloud = null
} = {}) {
  let nowMs = Date.parse(now);
  class FakeDate extends Date {
    constructor(...args) { super(...(args.length ? args : [nowMs])); }
    static now() { return nowMs; }
  }

  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const storage = new Map();
  const windowListeners = new Map();
  const documentListeners = new Map();
  const timers = new Map();
  let timerId = 0;
  const location = new URL(href);
  const element = () => ({
    addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {}, style: {}, focus() {}, blur() {}, select() {},
    setSelectionRange() {}, click() {}, cloneNode() { return element(); },
    querySelector() { return null; }, querySelectorAll() { return []; },
    textContent: '', value: ''
  });
  const localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  };
  const context = {
    console, Intl, Blob, URL, URLSearchParams, TextDecoder, TextEncoder,
    Date: FakeDate,
    setTimeout(fn, delay = 0) { const id = ++timerId; timers.set(id, { fn, delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    setInterval(fn, delay = 0) { const id = ++timerId; timers.set(id, { fn, delay, interval: true }); return id; },
    clearInterval(id) { timers.delete(id); },
    navigator: { clipboard: { writeText: async () => true } },
    location,
    history: { replaceState(_state, _title, next) { location.href = String(next); } },
    localStorage,
    document: {
      visibilityState: 'visible', activeElement: null,
      body: { appendChild() {}, classList: { add() {}, remove() {} } },
      documentElement: { style: { setProperty() {}, removeProperty() {} } },
      getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
      querySelector: () => null, querySelectorAll: () => [], createElement: element,
      addEventListener(type, fn) { documentListeners.set(type, fn); },
      removeEventListener(type, fn) { if (documentListeners.get(type) === fn) documentListeners.delete(type); }
    },
    window: {
      location, localStorage, scrollTo() {}, open() {}, print() {}, RelayOpsCloud: cloud,
      addEventListener(type, fn) { windowListeners.set(type, fn); },
      removeEventListener(type, fn) { if (windowListeners.get(type) === fn) windowListeners.delete(type); }
    }
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(APP_SOURCE, context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{}; render=()=>{};', context);
  context.__setNow = value => { nowMs = Date.parse(value); };
  context.__windowListeners = windowListeners;
  context.__documentListeners = documentListeners;
  return context;
}

function seedImportedDay(context) {
  vm.runInContext(`
    state.morningOperationDate='2026-08-04';
    state.routes=[{route:'CX099',driver:'Imported Route Driver'}];
    state.morningRoutes=[{routeUid:'imported-route',dsp:'LLOL',route:'CX099',driver:'Imported Route Driver',wave:'11:15 AM',staging:'STG.V.1'}];
    state.lastImportExcluded=3;
    state.lastMorningImportFingerprint='day-plan-fingerprint';
    state.scheduleEntries=[{date:'8/4/2026',name:'Paycom Driver',role:'Delivery Associate'}];
    state.scheduleImportName='Paycom-8-4.xlsx';
    state.whiparoundInspections=[{date:'2026-08-04',type:'pre',driver:'Paycom Driver',asset:'EV1'}];
    state.whiparoundRosterSnapshots={'2026-08-04':{drivers:['Paycom Driver']}};
    state.whiparoundNotOnRoute={'2026-08-04|extra':true};
    state.whiparoundImportName='Whiparound-8-4.xlsx';
    state.whiparoundSelectedDate='2026-08-04';

    state.fleetImport={name:'Amazon + FleetOS 8-4.xlsx',uploadedAt:'2026-08-04T16:00:00.000Z',vehicles:[{vin:'VIN-1',name:'EV1',battery:88}]};
    state.fleetSourceUploads={amazon:{name:'Amazon-8-4.xlsx',uploadedAt:'2026-08-04T15:58:00.000Z'},fleetos:{name:'FleetOS-8-4.xlsx',uploadedAt:'2026-08-04T16:00:00.000Z'}};
    state.fleetExpectedCount=62;
    state.fleetLastRefresh='Amazon + FleetOS imported 8/4/2026';
    state.equipmentImport={name:'Device-and-Portable-8-4.xlsx',details:{EV1:{device:'40',portable:'31'}}};
    state.deviceCustomRows={ev:[{uid:'ev-custom-1',label:'EV99',device:'99',portable:'100',source:'manual'}],gas:[],helper:[]};
    state.removedDeviceVehicleIds=['98'];

    state.driverContacts=[{key:'driver-one',name:'Driver One',phone:'5551112222'}];
    state.driverContactsLastImport='AssociateData.xlsx';
    state.driverNameAliases={'driver one':['D One']};
    state.driverProfiles={'driver one':{name:'Driver One',flags:['trainer'],preferredVehicleIds:['1']}};
    state.fleetNameOverrides={'VIN-1':'EV1'};
    state.fleetIssues={EV1:{active:[{id:'fleet-issue-1',text:'Mirror'}],history:[]}};
    state.equipmentIssues={'device:40':{type:'device',equipmentId:'40',active:[{id:'device-issue-1',text:'Cracked'}],history:[]}};
    state.vanParking=[{id:'west-1',zone:'west',value:'1'}];
    state.vanParkingUpdated='8/4/2026';
    state.chargingStationChecked='8/4/2026';
    state.vanParkingBatteries={'west-1':88};
    state.parkingChargerStatus={'west-1':'green'};
    state.parkingNotes='Permanent parking note';
    state.morningSheetsEndpoint='https://script.google.test/exec';
    state.slackReportRoomUrl='https://slack.test/room';
  `, context);
}

function readState(context, fields) {
  context.__fieldNames = fields;
  return clone(vm.runInContext(
    `JSON.parse(JSON.stringify(Object.fromEntries(globalThis.__fieldNames.map(key=>[key,state[key]]))))`,
    context
  ));
}

function cloudCompactor() {
  const context = {
    console, Date, URL, setTimeout, clearTimeout,
    location: { href: 'https://relayops.example.test/?date=2026-08-04' },
    window: { RELAYOPS_CLOUD_CONFIG: {}, addEventListener() {} }
  };
  context.globalThis = context;
  vm.runInNewContext(CLOUD_SOURCE, context, { filename: 'cloud-sync.js' });
  return context.window.RelayOpsCloud.__test.compactDailyPayload;
}

function testSameDayImportsAreShared() {
  const dispatcherA = appContext();
  seedImportedDay(dispatcherA);
  const daily = clone(vm.runInContext('window.RelayOpsApp.sharedState()', dispatcherA));
  const permanent = clone(vm.runInContext('window.RelayOpsApp.persistentState()', dispatcherA));

  for (const field of DAILY_IMPORT_FIELDS) {
    assert(Object.prototype.hasOwnProperty.call(daily, field), `${field} is missing from the shared operation-date snapshot`);
    assert(!Object.prototype.hasOwnProperty.call(permanent, field), `${field} was duplicated into permanent station state`);
  }
  assert.strictEqual(daily.routes[0].route, 'CX099', 'Day-of-operations route import is missing from shared state');
  assert.strictEqual(daily.scheduleImportName, 'Paycom-8-4.xlsx', 'PAYCOM import filename is missing from shared state');
  assert.strictEqual(daily.whiparoundImportName, 'Whiparound-8-4.xlsx', 'Whiparound import filename is missing from shared state');

  const compact = cloudCompactor()({ ...daily, driverContacts: permanent.driverContacts });
  for (const field of DAILY_IMPORT_FIELDS) {
    assert(Object.prototype.hasOwnProperty.call(compact, field), `Cloud compaction removed daily import field ${field}`);
  }
  assert(!Object.prototype.hasOwnProperty.call(compact, 'driverContacts'), 'Cloud compaction retained permanent driver-directory data in the daily row');

  const dispatcherB = appContext();
  dispatcherB.__permanent = permanent;
  dispatcherB.__daily = daily;
  vm.runInContext(`
    window.RelayOpsApp.applyPersistentState(globalThis.__permanent);
    window.RelayOpsApp.applySharedState(globalThis.__daily);
  `, dispatcherB);
  const receivedDaily = readState(dispatcherB, [
    ...DAILY_IMPORT_FIELDS, 'routes', 'morningRoutes', 'scheduleEntries', 'scheduleImportName',
    'whiparoundInspections', 'whiparoundImportName'
  ]);
  for (const field of DAILY_IMPORT_FIELDS) {
    assert.deepStrictEqual(receivedDaily[field], daily[field], `A second dispatcher did not receive same-day ${field}`);
  }
  assert.strictEqual(receivedDaily.routes[0].route, 'CX099', 'A second dispatcher did not receive the route import');
  assert.strictEqual(receivedDaily.scheduleEntries[0].name, 'Paycom Driver', 'A second dispatcher did not receive the PAYCOM import');
  assert.strictEqual(receivedDaily.whiparoundInspections[0].asset, 'EV1', 'A second dispatcher did not receive the Whiparound import');
}

function testFleetRowsAreNotDuplicatedInDailyPayload() {
  const dispatcherA = appContext();
  vm.runInContext(`
    state.fleetSourceUploads={
      amazon:{name:'Amazon.xlsx',uploadedAt:'2026-08-04T15:00:00.000Z',vehicles:[{vin:'7FCEHEB79PN014816',name:'EV1',source:'Amazon fleet list',hasName:true}]},
      fleetos:{name:'FleetOS.csv',uploadedAt:'2026-08-04T15:01:00.000Z',vehicles:[{vin:'7FCEHEB79PN014816',battery:88,source:'FleetOS tracker',hasBattery:true}]}
    };
    state.fleetImport=fleetImportFromSourceUploads();
  `, dispatcherA);
  const daily = clone(vm.runInContext('window.RelayOpsApp.sharedState()', dispatcherA));
  assert.strictEqual(daily.fleetImport.derivedFromSourceUploads, true, 'Daily fleet receipt must identify source-derived rows');
  assert(!Object.prototype.hasOwnProperty.call(daily.fleetImport, 'vehicles'), 'Combined fleet rows were duplicated alongside source-upload rows');

  const dispatcherB = appContext();
  dispatcherB.__daily = daily;
  vm.runInContext('window.RelayOpsApp.applySharedState(globalThis.__daily)', dispatcherB);
  const hydrated = clone(vm.runInContext('state.fleetImport', dispatcherB));
  assert.strictEqual(hydrated.vehicles.length, 2, 'Second dispatcher did not rebuild the combined fleet view from shared source rows');
}

function testNextDayClearsImportsAndPreservesPermanentData() {
  const context = appContext();
  seedImportedDay(context);
  const beforePermanent = readState(context, PERMANENT_FIELDS);
  const beforeParkingLayout = clone(vm.runInContext('parkingLayoutSnapshot(state.vanParking)', context));

  vm.runInContext(`window.RelayOpsApp.resetDailyState('2026-08-05')`, context);

  const afterPermanent = readState(context, PERMANENT_FIELDS);
  const afterParkingLayout = clone(vm.runInContext('parkingLayoutSnapshot(state.vanParking)', context));
  assert.deepStrictEqual(afterPermanent, beforePermanent, 'Midnight cleanup mutated permanent driver, fleet, parking, issue, or connector data');
  assert.deepStrictEqual(afterParkingLayout, beforeParkingLayout, 'Midnight cleanup mutated the permanent parking layout');
  const after = readState(context, [
    ...DAILY_IMPORT_FIELDS, 'routes', 'morningRoutes', 'lastImportExcluded', 'lastMorningImportFingerprint',
    'scheduleEntries', 'scheduleImportName', 'whiparoundInspections', 'whiparoundRosterSnapshots',
    'whiparoundNotOnRoute', 'whiparoundImportName', 'whiparoundSelectedDate'
  ]);
  assert.strictEqual(after.fleetImport, null, 'Midnight cleanup retained yesterday\'s fleet import');
  assert.deepStrictEqual(after.fleetSourceUploads, {}, 'Midnight cleanup retained yesterday\'s fleet source files');
  assert.strictEqual(after.fleetExpectedCount, 0, 'Midnight cleanup retained yesterday\'s fleet expected count');
  assert.strictEqual(after.fleetLastRefresh, 'Not refreshed yet', 'Midnight cleanup retained yesterday\'s fleet refresh label');
  assert.strictEqual(after.equipmentImport, null, 'Midnight cleanup retained yesterday\'s device/portable import');
  assert.deepStrictEqual(after.deviceCustomRows, { ev: [], gas: [], helper: [] }, 'Midnight cleanup retained yesterday\'s device-sheet edits');
  assert.deepStrictEqual(after.removedDeviceVehicleIds, [], 'Midnight cleanup retained yesterday\'s device-sheet removals');
  assert(!after.vanParking.some(slot => !/^x$/i.test(String(slot.value || '').trim()) && String(slot.value || '').trim()), 'Midnight cleanup retained yesterday\'s parking assignments');
  assert.strictEqual(after.vanParkingUpdated, '', 'Midnight cleanup retained yesterday\'s parking import date');
  assert.strictEqual(after.chargingStationChecked, '', 'Midnight cleanup retained yesterday\'s charger check date');
  assert.deepStrictEqual(after.vanParkingBatteries, {}, 'Midnight cleanup retained yesterday\'s parking batteries');
  assert.deepStrictEqual(after.parkingChargerStatus, {}, 'Midnight cleanup retained yesterday\'s charger statuses');
  assert.strictEqual(after.parkingNotes, '', 'Midnight cleanup retained yesterday\'s parking notes');
  assert.deepStrictEqual(after.routes, [], 'Midnight cleanup retained yesterday\'s route import');
  assert.strictEqual(after.morningRoutes.length, 6, 'Midnight cleanup did not create six fresh wave anchors');
  assert.strictEqual(after.lastImportExcluded, 0, 'Midnight cleanup retained route import exclusions');
  assert.strictEqual(after.lastMorningImportFingerprint, '', 'Midnight cleanup retained the prior route-file fingerprint');
  assert.deepStrictEqual(after.scheduleEntries, [], 'Midnight cleanup retained yesterday\'s PAYCOM rows');
  assert.strictEqual(after.scheduleImportName, '', 'Midnight cleanup retained yesterday\'s PAYCOM filename');
  assert.deepStrictEqual(after.whiparoundInspections, [], 'Midnight cleanup retained yesterday\'s Whiparound rows');
  assert.deepStrictEqual(after.whiparoundRosterSnapshots, {}, 'Midnight cleanup retained yesterday\'s Whiparound roster snapshot');
  assert.deepStrictEqual(after.whiparoundNotOnRoute, {}, 'Midnight cleanup retained yesterday\'s Whiparound exceptions');
  assert.strictEqual(after.whiparoundImportName, '', 'Midnight cleanup retained yesterday\'s Whiparound filename');
  assert.strictEqual(after.whiparoundSelectedDate, '2026-08-05', 'Midnight cleanup did not advance the Whiparound date');
}

async function testRolloverDoesNotScheduleSaveOrRetryLoop() {
  let loadCalls = 0;
  const scheduleActions = [];
  const cloud = {
    configured: false,
    session: { user: { id: 'dispatcher-1' } },
    on() { return () => {}; },
    load() { loadCalls += 1; return Promise.resolve(); },
    schedule(action) { scheduleActions.push(action); }
  };
  const context = appContext({ cloud });
  seedImportedDay(context);
  context.__setNow('2026-08-05T07:00:01.000Z');

  const first = vm.runInContext(`window.RelayOpsApp.rolloverOperationDateIfNeeded('timer',new Date())`, context);
  const second = vm.runInContext(`window.RelayOpsApp.rolloverOperationDateIfNeeded('focus',new Date())`, context);
  context.__windowListeners.get('focus')?.();
  context.__documentListeners.get('visibilitychange')?.();
  await Promise.resolve();

  assert.strictEqual(Boolean(first), true, 'The active operation date did not roll at Los Angeles midnight');
  assert.strictEqual(Boolean(second), false, 'A repeated rollover signal was not a no-op');
  assert.strictEqual(loadCalls, 1, 'Midnight rollover loaded the fresh shared day more than once');
  assert.deepStrictEqual(scheduleActions, [], 'Midnight rollover queued an autosave/retry loop instead of loading the fresh day');
  assert.strictEqual(vm.runInContext('state.morningOperationDate', context), '2026-08-05', 'Midnight rollover did not advance the operation date');
  assert.strictEqual(vm.runInContext('state.fleetImport', context), null, 'Midnight rollover retained the prior fleet import');
  assert.strictEqual(vm.runInContext('state.equipmentImport', context), null, 'Midnight rollover retained the prior equipment import');
}

async function run() {
  testSameDayImportsAreShared();
  testFleetRowsAreNotDuplicatedInDailyPayload();
  testNextDayClearsImportsAndPreservesPermanentData();
  await testRolloverDoesNotScheduleSaveOrRetryLoop();
  console.log('Daily import sharing, midnight cleanup, permanent preservation, and no-retry-loop contracts passed');
}

run().catch(error => { console.error(error); process.exitCode = 1; });
