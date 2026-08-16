const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

const APP_SOURCE = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const CLOUD_SOURCE = fs.readFileSync(require.resolve('../cloud-sync.js'), 'utf8');

const clone = value => JSON.parse(JSON.stringify(value));

function appContext({
  href = 'https://relayops.example.test/?date=2026-08-04',
  now = '2026-08-04T19:00:00.000Z',
  bootStoredDate = ''
} = {}) {
  let nowMs = Date.parse(now);
  class FakeDate extends Date {
    constructor(...args) { super(...(args.length ? args : [nowMs])); }
    static now() { return nowMs; }
  }

  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const storage = new Map();
  if (bootStoredDate) storage.set('relayops_morning_operation_date', bootStoredDate);
  const windowListeners = new Map();
  const documentListeners = new Map();
  const replacedUrls = [];
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
    history: {
      replaceState(_state, _title, next) {
        replacedUrls.push(String(next));
        location.href = String(next);
      }
    },
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
      location, localStorage, scrollTo() {}, open() {}, print() {},
      addEventListener(type, fn) { windowListeners.set(type, fn); },
      removeEventListener(type, fn) { if (windowListeners.get(type) === fn) windowListeners.delete(type); }
    }
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(APP_SOURCE, context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{}; render=()=>{}; persist=()=>{};', context);
  context.__setNow = value => { nowMs = Date.parse(value); };
  context.__windowListeners = windowListeners;
  context.__documentListeners = documentListeners;
  context.__replacedUrls = replacedUrls;
  return context;
}

function testStaleSavedDateBootsIntoCurrentDay() {
  const context = appContext({
    href: 'https://relayops.example.test/',
    now: '2026-08-04T19:00:00.000Z',
    bootStoredDate: '2026-08-03'
  });
  const boot = clone(vm.runInContext(`JSON.parse(JSON.stringify({
    date:state.morningOperationDate,
    routes:state.morningRoutes.map(row=>({route:row.route,wave:row.wave,waveAnchor:row._waveAnchor}))
  }))`, context));
  assert.strictEqual(boot.date, '2026-08-04', 'A browser carrying yesterday\'s saved date must advance to today during startup');
  assert.strictEqual(boot.routes.length, 6, 'Startup recovery must create all six blank Wave anchors');
  boot.routes.forEach((row,index)=>{
    assert.strictEqual(row.route, `__blank_wave_${index+1}`, `Startup recovery lost Wave ${index+1}`);
    assert.strictEqual(row.waveAnchor, true, `Startup recovery did not preserve Wave ${index+1} as an anchor`);
  });
}

function seedDirtyDay(context) {
  vm.runInContext(`
    state.dspCode='LLOL';
    state.organizationName='Legacy Logistics';
    state.stationCode='DJT6';
    state.morningOperationDate='2026-08-04';
    state.routes=[{route:'CX099',driver:'Yesterday Driver'}];
    state.morningRoutes=[{routeUid:'old-route',dsp:'LLOL',route:'CX099',driver:'Yesterday Driver',wave:'11:15 AM',staging:'STG.V.1',ev:'1'}];
    state.lastImportExcluded=7;state.rosterPublished=true;
    state.morningFilters={wave:'11:15 AM',staging:'STG.V.1',pad:'A'};
    state.messageQueueStatus={'2026-08-04|CX099':'sent'};
    state.morningIssueAcknowledgements={'2026-08-04|CX099|issue-1':true};
    state.scheduleEntries=[{date:'8/4/2026',name:'Yesterday Driver',role:'Delivery Associate'}];
    state.scheduleImportName='Paycom-8-4.xls';
    state.callOffDriverKeys={'2026-08-04|calloff':{name:'Calloff Driver'}};
    state.callOffReasons={'2026-08-04|calloff':'Sick'};
    state.scheduleDriverMarks={'2026-08-04|backup':'backup'};
    state.scheduleBackupRecords={'2026-08-04|backup':{name:'Backup Driver',vto:'VTO 4'}};
    state.scheduleStayHome={'2026-08-04|home':{name:'Home Driver'}};
    state.scheduleReductions={'2026-08-04|reduction':{name:'Reduced Driver'}};
    state.scheduleHelpers={'2026-08-04|helper':{name:'Helper Driver'}};
    state.openingPicklistTopics=['Yesterday topic'];state.openingPicklistNotes='Yesterday notes';
    state.openingPicklistCalloffRows=12;state.openingPicklistTopicRows=9;state.openingPicklistBackupRows=35;
    state.fitMorningRows=true;state.fitOpeningPicklistRows=true;
    state.openingPicklistCalloffDrafts=[{name:'Draft Calloff'}];
    state.openingPicklistBackupOverrides={'0':'Backup Driver'};
    state.openingPicklistLabels={'wave-1':'OLD WAVE'};
    state.picklistSwapAudit=[{id:'old-swap',date:'2026-08-04',from:'A',to:'B'}];
    state.sheetHistory={past:[{id:'old-history'}],future:[]};
    state.whiparoundNotOnRoute={'2026-08-04|old':true};
    state.lastImportExcluded=7;

    state.fleetImport={vehicles:[{vin:'VIN-1',name:'EV1',battery:88}]};
    state.fleetSourceUploads={amazon:{name:'VehiclesData.xlsx'}};
    state.fleetExpectedCount=62;
    state.fleetNameOverrides={'VIN-1':'EV1'};
    state.fleetIssues={EV1:{active:[{id:'issue-1',text:'Mirror'}],history:[]}};
    state.equipmentIssues={'device:1':{active:[{id:'device-issue',text:'Cracked'}],history:[]}};
    state.vanParking=[{id:'west-1',zone:'west',value:'1'}];
    state.vanParkingUpdated='8/4/2026';state.chargingStationChecked='8/4/2026';
    state.vanParkingBatteries={'west-1':88};state.parkingChargerStatus={'west-1':'green'};state.parkingNotes='Keep this';
    state.equipmentImport=[{vehicle:'EV1',device:'1',portable:'2'}];
    state.deviceCustomRows=[{id:'EV99',device:'99',portable:'100'}];state.removedDeviceVehicleIds=['EV98'];
    state.driverContacts=[{key:'driver-one',name:'Driver One',phone:'5551112222'}];state.driverContactsLastImport='AssociateData.xlsx';
    state.removedDriverKeys=['old-driver'];state.driverNameAliases={'driver one':['D One']};
    state.driverProfiles={'driver one':{name:'Driver One',flags:['trainer'],preferredVehicle:'EV1'}};
    state.scheduleStayHomeHistory={'2026-08-01|driver one':{name:'Driver One'}};
    state.rosteringPlans={'2026-08-05':{services:[]}};state.rosteringHelperPool={'2026-08-05':[]};
    state.rosteringTrainingMatches={'2026-08-05|ridealong':{trainer:'Driver One'}};
    state.rosteringManualTraining={'2026-08-05|ridealong':{name:'Ride Along'}};
    state.whiparoundComplianceHistory={'driver one':{missedPre:2,missedPost:1}};
    state.whiparoundReminderTemplates={pre:'Permanent pre-trip reminder',post:'Permanent post-trip reminder'};
    state.messageQueueTemplate='route';
    state.coachingQueue=[{id:'coach-1',driver:'Driver One',status:'open',createdAt:'2026-08-01T12:00:00.000Z'}];
    state.inventoryItems=[{id:'phones',name:'Phones',total:10,available:8}];
    state.inventoryLog=[{id:'log-1',itemId:'phones',type:'assign',quantity:2}];
    state.coachingTemplate='Permanent coaching template';
    state.morningSheetsEndpoint='https://script.google.test/exec';state.slackReportRoomUrl='https://slack.test/room';
    state.chargerReports=[{id:'charger-1',parkingSpot:'1',concern:'Offline'}];
  `, context);
}

const PERMANENT_FIELDS = [
  'dspCode', 'organizationName', 'stationCode', 'fleetNameOverrides', 'fleetIssues', 'equipmentIssues',
  'driverContacts', 'driverContactsLastImport', 'removedDriverKeys', 'driverNameAliases', 'driverProfiles', 'scheduleStayHomeHistory',
  'rosteringPlans', 'rosteringHelperPool', 'rosteringTrainingMatches',
  'rosteringManualTraining', 'whiparoundComplianceHistory',
  'whiparoundReminderTemplates', 'messageQueueTemplate', 'coachingQueue', 'inventoryItems', 'inventoryLog',
  'coachingTemplate', 'morningSheetsEndpoint', 'slackReportRoomUrl', 'chargerReports'
];

function snapshotFields(context, fields) {
  context.__snapshotFieldNames = fields;
  return clone(vm.runInContext(`JSON.parse(JSON.stringify(Object.fromEntries(globalThis.__snapshotFieldNames.map(key=>[key,state[key]]))))`, context));
}

function testLosAngelesDateBoundaries() {
  const context = appContext();
  const values = vm.runInContext(`[
    defaultOperationDate(new Date('2026-08-05T06:59:59.999Z')),
    defaultOperationDate(new Date('2026-08-05T07:00:00.000Z')),
    defaultOperationDate(new Date('2026-12-15T07:59:59.999Z')),
    defaultOperationDate(new Date('2026-12-15T08:00:00.000Z'))
  ]`, context);
  assert.deepStrictEqual(Array.from(values), ['2026-08-04', '2026-08-05', '2026-12-14', '2026-12-15'], 'Operation dates must roll at Los Angeles midnight in both PDT and PST');
  assert.strictEqual(vm.runInContext("window.RelayOpsApp.operationDateIsWritable('2026-08-05')", context), true, 'A future operation date must remain writable for advance planning');
  assert.strictEqual(vm.runInContext("window.RelayOpsApp.operationDateIsWritable('2026-08-03')", context), false, 'An expired operation date must remain read-only');
}

function testFreshDayResetAndPermanentPreservation() {
  const context = appContext();
  assert.strictEqual(typeof context.window.RelayOpsApp?.resetDailyState, 'function', 'RelayOpsApp must expose resetDailyState(date) for a missing shared day');
  seedDirtyDay(context);
  const beforePermanent = snapshotFields(context, PERMANENT_FIELDS);
  const beforeParkingLayout = clone(vm.runInContext('parkingLayoutSnapshot(state.vanParking)', context));
  vm.runInContext(`window.RelayOpsApp.resetDailyState('2026-08-05')`, context);
  const afterPermanent = snapshotFields(context, PERMANENT_FIELDS);
  const afterParkingLayout = clone(vm.runInContext('parkingLayoutSnapshot(state.vanParking)', context));
  assert.deepStrictEqual(afterPermanent, beforePermanent, 'A daily reset must not mutate permanent issues, driver identities, history, inventory, or connector data');
  assert.deepStrictEqual(afterParkingLayout, beforeParkingLayout, 'A daily reset must preserve the permanent parking layout');

  const after = clone(vm.runInContext(`JSON.parse(JSON.stringify({
    date:state.morningOperationDate,routes:state.routes,morningRoutes:state.morningRoutes,
    filters:state.morningFilters,lastImportExcluded:state.lastImportExcluded,rosterPublished:state.rosterPublished,
    messageQueueStatus:state.messageQueueStatus,morningIssueAcknowledgements:state.morningIssueAcknowledgements,
    scheduleEntries:state.scheduleEntries,scheduleImportName:state.scheduleImportName,
    callOffDriverKeys:state.callOffDriverKeys,callOffReasons:state.callOffReasons,
    scheduleDriverMarks:state.scheduleDriverMarks,scheduleBackupRecords:state.scheduleBackupRecords,
    scheduleStayHome:state.scheduleStayHome,scheduleReductions:state.scheduleReductions,scheduleHelpers:state.scheduleHelpers,
    topics:state.openingPicklistTopics,notes:state.openingPicklistNotes,
    calloffDrafts:state.openingPicklistCalloffDrafts,backupOverrides:state.openingPicklistBackupOverrides,
    labels:state.openingPicklistLabels,swapAudit:state.picklistSwapAudit,sheetHistory:state.sheetHistory,
    waveSlots:state.openingPicklistWaveSlots,showAdhoc:state.openingPicklistShowAdhoc,
    calloffRows:state.openingPicklistCalloffRows,topicRows:state.openingPicklistTopicRows,
    backupRows:state.openingPicklistBackupRows,fitMorningRows:state.fitMorningRows,
    fitOpeningPicklistRows:state.fitOpeningPicklistRows
  }))`, context));
  assert.strictEqual(after.date, '2026-08-05', 'Fresh reset must switch the operation date');
  assert.strictEqual(after.routes.length, 0, 'Fresh reset must clear the prior dispatch route list');
  assert.strictEqual(after.morningRoutes.length, 6, 'Fresh reset must create exactly six blank Wave anchors');
  after.morningRoutes.forEach((row, index) => {
    assert(row._blank === true && row._waveAnchor === true, `Wave ${index + 1} reset row must remain a blank anchor`);
    assert.strictEqual(row.route, `__blank_wave_${index + 1}`, `Wave ${index + 1} blank route marker changed`);
    assert.strictEqual(row.driver, '', `Wave ${index + 1} inherited a prior driver`);
  });
  assert.deepStrictEqual(after.filters, { wave: 'all', staging: 'all', pad: 'all' }, 'Fresh day filters must return to all routes');
  assert.strictEqual(after.lastImportExcluded, 0, 'Fresh day must clear the prior import exclusion count');
  assert.strictEqual(after.rosterPublished, false, 'Fresh day must not inherit yesterday’s published roster state');
  for (const [name, value] of Object.entries({
    messageQueueStatus: after.messageQueueStatus, morningIssueAcknowledgements: after.morningIssueAcknowledgements,
    callOffDriverKeys: after.callOffDriverKeys, callOffReasons: after.callOffReasons,
    scheduleDriverMarks: after.scheduleDriverMarks, scheduleBackupRecords: after.scheduleBackupRecords,
    scheduleStayHome: after.scheduleStayHome, scheduleReductions: after.scheduleReductions,
    scheduleHelpers: after.scheduleHelpers, backupOverrides: after.backupOverrides, labels: after.labels
  })) assert.strictEqual(Object.keys(value || {}).length, 0, `Fresh day retained ${name}`);
  assert.strictEqual(after.scheduleEntries.length, 0, 'Fresh day retained the prior PAYCOM import');
  assert.strictEqual(after.scheduleImportName, '', 'Fresh day retained the prior PAYCOM filename');
  assert.strictEqual(vm.runInContext('state.fleetImport', context), null, 'Fresh day retained the prior fleet import');
  assert.deepStrictEqual(clone(vm.runInContext('state.fleetSourceUploads', context)), {}, 'Fresh day retained fleet source uploads');
  assert.strictEqual(vm.runInContext('state.equipmentImport', context), null, 'Fresh day retained the prior device/portable import');
  assert(!clone(vm.runInContext('state.vanParking', context)).some(slot => !/^x$/i.test(String(slot.value || '').trim()) && String(slot.value || '').trim()), 'Fresh day retained prior parking assignments');
  assert.strictEqual(vm.runInContext('state.vanParkingUpdated', context), '', 'Fresh day retained the parking import date');
  assert.deepStrictEqual(clone(vm.runInContext('state.vanParkingBatteries', context)), {}, 'Fresh day retained parking battery readings');
  assert.deepStrictEqual(clone(vm.runInContext('state.parkingChargerStatus', context)), {}, 'Fresh day retained charger statuses');
  assert.strictEqual(vm.runInContext('state.parkingNotes', context), '', 'Fresh day retained parking notes');
  assert(after.topics.every(value => value === '') && after.notes === '', 'Fresh day retained Picklist topics or notes');
  assert.strictEqual(after.calloffDrafts.length, 0, 'Fresh day retained Picklist call-off drafts');
  assert.strictEqual(after.swapAudit.length, 0, 'Fresh day retained prior-day swap audit rows');
  assert.strictEqual(after.sheetHistory.past.length + after.sheetHistory.future.length, 0, 'Fresh day retained prior sheet undo history');
  assert.strictEqual(after.waveSlots, 6, 'Fresh day must restore all six wave slots');
  assert.strictEqual(after.showAdhoc, true, 'Fresh day must keep the Adhocs section available');
  assert.strictEqual(after.calloffRows, 6, 'Fresh day retained yesterday\u2019s expanded call-off row geometry');
  assert.strictEqual(after.topicRows, 4, 'Fresh day retained yesterday\u2019s expanded stand-up-topic row geometry');
  assert.strictEqual(after.backupRows, 21, 'Fresh day retained yesterday\u2019s expanded backup row geometry');
  assert.strictEqual(after.fitMorningRows, false, 'Fresh day retained yesterday\u2019s compact Morning Sheet row mode');
  assert.strictEqual(after.fitOpeningPicklistRows, false, 'Fresh day retained yesterday\u2019s compact Picklist row mode');

  const once = vm.runInContext(`JSON.stringify(window.RelayOpsApp.sharedState())`, context);
  vm.runInContext(`window.RelayOpsApp.resetDailyState('2026-08-05')`, context);
  const twice = vm.runInContext(`JSON.stringify(window.RelayOpsApp.sharedState())`, context);
  assert.strictEqual(twice, once, 'Calling resetDailyState twice for the same date must be idempotent');
}

function testRolloverPolicyAndIdempotence() {
  const current = appContext({ href: 'https://relayops.example.test/?date=2026-08-04', now: '2026-08-04T19:00:00.000Z' });
  assert.strictEqual(typeof current.window.RelayOpsApp?.rolloverOperationDateIfNeeded, 'function', 'RelayOpsApp must expose the LA-aware rollover hook');
  seedDirtyDay(current);
  current.__setNow('2026-08-05T07:00:01.000Z');
  const first = vm.runInContext(`window.RelayOpsApp.rolloverOperationDateIfNeeded('focus',new Date())`, current);
  const firstState = vm.runInContext(`JSON.stringify(window.RelayOpsApp.sharedState())`, current);
  const second = vm.runInContext(`window.RelayOpsApp.rolloverOperationDateIfNeeded('visibilitychange',new Date())`, current);
  const secondState = vm.runInContext(`JSON.stringify(window.RelayOpsApp.sharedState())`, current);
  assert.strictEqual(Boolean(first), true, 'A link opened on the current day must advance after LA midnight');
  assert.strictEqual(Boolean(second), false, 'Repeated wake signals after one rollover must be no-ops');
  assert.strictEqual(secondState, firstState, 'Repeated wake signals changed the freshly reset day');
  assert.strictEqual(vm.runInContext('state.morningOperationDate', current), '2026-08-05', 'Current-day link did not advance to the new LA date');
  assert(current.__replacedUrls.some(url => /[?&]date=2026-08-05(?:&|$)/.test(url)), 'Rollover must update the shared URL to the new operation date');

  const historical = appContext({ href: 'https://relayops.example.test/?date=2026-08-03', now: '2026-08-04T19:00:00.000Z' });
  seedDirtyDay(historical);
  vm.runInContext(`state.morningOperationDate='2026-08-03'`, historical);
  historical.__setNow('2026-08-05T07:00:01.000Z');
  const pinned = vm.runInContext(`window.RelayOpsApp.rolloverOperationDateIfNeeded('focus',new Date())`, historical);
  assert.strictEqual(Boolean(pinned), false, 'An explicitly historical operation date must remain pinned');
  assert.strictEqual(vm.runInContext('state.morningOperationDate', historical), '2026-08-03', 'Historical link silently advanced to today');

  const historicalFocus = historical.__windowListeners.get('focus');
  assert.strictEqual(typeof historicalFocus, 'function', 'Historical-date protection must be wired to the real focus handler');
  historicalFocus();
  assert.strictEqual(vm.runInContext('state.morningOperationDate', historical), '2026-08-03', 'The real focus handler advanced an explicitly dated historical link');
}

function testSharedHydrationResetPreservesLocalDispatcherState() {
  const context = appContext();
  assert.strictEqual(typeof context.window.RelayOpsApp?.resetSharedDailyState, 'function', 'RelayOpsApp must expose a hydration-safe shared daily reset');
  seedDirtyDay(context);
  vm.runInContext(`
    state.morningFilters={wave:'11:15 AM',staging:'STG.V.1',pad:'A'};
    state.lastItineraryRts={CX099:'7:42 PM'};
    state.morningSheetsLastPush='2026-08-04T20:00:00.000Z';
    state.morningSheetsLastError='Local connector warning';
    state.morningSheetsLastReceipt={ok:true,tab:'8/4/26'};
    state.morningSheetsLastDryRun='2026-08-04T19:59:00.000Z';
    state.pendingRouteTrainer={routeUid:'old-route'};
    state.screenshotPreview={url:'blob:local-preview'};
    state.screenshotKind='picklist';
    state.screenshotReview={pads:true,cortex:false};
    window.RelayOpsApp.resetSharedDailyState('2026-08-05');
    globalThis.__hydrationReset={
      filters:state.morningFilters,lastItineraryRts:state.lastItineraryRts,
      lastPush:state.morningSheetsLastPush,lastError:state.morningSheetsLastError,
      receipt:state.morningSheetsLastReceipt,dryRun:state.morningSheetsLastDryRun,
      pendingRouteTrainer:state.pendingRouteTrainer,screenshotPreview:state.screenshotPreview,
      screenshotKind:state.screenshotKind,screenshotReview:state.screenshotReview,
      routes:state.routes,morningRoutes:state.morningRoutes,scheduleEntries:state.scheduleEntries,
      fitMorningRows:state.fitMorningRows,fitOpeningPicklistRows:state.fitOpeningPicklistRows,
      calloffRows:state.openingPicklistCalloffRows,topicRows:state.openingPicklistTopicRows,
      backupRows:state.openingPicklistBackupRows
    };
    window.RelayOpsApp.applySharedState({
      morningRoutes:[{routeUid:'remote-route',dsp:'LLOL',route:'CX201',driver:'Remote Driver',wave:'11:20 AM'}],
      scheduleEntries:[{date:'8/5/2026',name:'Remote Driver',role:'Delivery Associate'}],
      fitMorningRows:true,openingPicklistCalloffRows:8
    });
    globalThis.__hydrated={
      route:state.morningRoutes[0]?.route,scheduled:state.scheduleEntries[0]?.name,
      fitMorningRows:state.fitMorningRows,calloffRows:state.openingPicklistCalloffRows,
      filters:state.morningFilters,lastItineraryRts:state.lastItineraryRts,
      receipt:state.morningSheetsLastReceipt,pendingRouteTrainer:state.pendingRouteTrainer
    };
  `, context);
  const reset = clone(context.__hydrationReset), hydrated = clone(context.__hydrated);
  assert.deepStrictEqual(reset.filters, { wave: '11:15 AM', staging: 'STG.V.1', pad: 'A' }, 'Remote hydration reset cleared this dispatcher\'s active Morning Sheet filters');
  assert.deepStrictEqual(reset.lastItineraryRts, { CX099: '7:42 PM' }, 'Remote hydration reset cleared the browser-only RTS import cache');
  assert.strictEqual(reset.lastPush, '2026-08-04T20:00:00.000Z', 'Remote hydration reset cleared the local connector receipt time');
  assert.strictEqual(reset.lastError, 'Local connector warning', 'Remote hydration reset cleared the local connector error');
  assert.deepStrictEqual(reset.receipt, { ok: true, tab: '8/4/26' }, 'Remote hydration reset cleared the local Google receipt');
  assert.strictEqual(reset.dryRun, '2026-08-04T19:59:00.000Z', 'Remote hydration reset cleared the local dry-run proof');
  assert.deepStrictEqual(reset.pendingRouteTrainer, { routeUid: 'old-route' }, 'Remote hydration reset dismissed the dispatcher\'s pending trainer selection');
  assert.deepStrictEqual(reset.screenshotPreview, { url: 'blob:local-preview' }, 'Remote hydration reset dismissed the dispatcher\'s screenshot preview');
  assert.strictEqual(reset.screenshotKind, 'picklist', 'Remote hydration reset changed the local screenshot kind');
  assert.deepStrictEqual(reset.screenshotReview, { pads: true, cortex: false }, 'Remote hydration reset changed the local screenshot checklist');
  assert.strictEqual(reset.routes.length, 0, 'Hydration-safe reset retained stale shared routes');
  assert.strictEqual(reset.morningRoutes.length, 6, 'Hydration-safe reset must install six temporary blank wave anchors');
  assert.strictEqual(reset.scheduleEntries.length, 0, 'Hydration-safe reset retained stale shared PAYCOM rows');
  assert.strictEqual(reset.fitMorningRows, false, 'Hydration-safe reset retained stale Morning Sheet row geometry');
  assert.strictEqual(reset.fitOpeningPicklistRows, false, 'Hydration-safe reset retained stale Picklist row geometry');
  assert.deepStrictEqual([reset.calloffRows, reset.topicRows, reset.backupRows], [6, 4, 21], 'Hydration-safe reset did not restore default daily row counts');
  assert.strictEqual(hydrated.route, 'CX201', 'Remote daily route did not hydrate after the safe reset');
  assert.strictEqual(hydrated.scheduled, 'Remote Driver', 'Remote PAYCOM row did not hydrate after the safe reset');
  assert.strictEqual(hydrated.fitMorningRows, true, 'Remote row geometry did not hydrate after the safe reset');
  assert.strictEqual(hydrated.calloffRows, 8, 'Remote Picklist row count did not hydrate after the safe reset');
  assert.deepStrictEqual(hydrated.filters, reset.filters, 'Applying a remote daily snapshot changed local filters');
  assert.deepStrictEqual(hydrated.lastItineraryRts, reset.lastItineraryRts, 'Applying a remote daily snapshot changed the local RTS cache');
  assert.deepStrictEqual(hydrated.receipt, reset.receipt, 'Applying a remote daily snapshot changed the local connector receipt');
  assert.deepStrictEqual(hydrated.pendingRouteTrainer, reset.pendingRouteTrainer, 'Applying a remote daily snapshot changed pending local UI state');
}

async function testCloudResetsBeforeMissingDayInitialization() {
  const order = [], rpcCalls = [];
  let dailyState = { morningRoutes: [{ routeUid: 'stale', route: 'CXOLD', driver: 'Yesterday Driver' }] };
  const remotePersistentState = {
    fleetIssues: { EV1: { active: [{ id: 'issue-1', text: 'Mirror' }], history: [] } },
    vanParkingLayout: [{ id: 'west-1', zone: 'west', label: 'Left 1', value: '', kind: 'spot' }],
    driverContacts: [{ key: 'driver-one', name: 'Driver One', phone: '5551112222' }],
    driverNameAliases: { 'driver one': ['D One'] },
    driverProfiles: { 'driver one': { name: 'Driver One', preferredVehicleIds: ['1'] } },
    coachingQueue: [{ id: 'coach-1', driver: 'Driver One', status: 'open' }]
  };
  let persistentState = {};
  const session = { user: { id: 'dispatcher-1', email: 'dispatcher@example.com' } };
  const client = {
    auth: {
      getSession: async () => ({ data: { session } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      signOut: async () => ({ error: null })
    },
    from(table) {
      let targetDate = '';
      return {
        select() { return this; },
        eq(field, value) { if (field === 'operation_date') targetDate = value; return this; },
        maybeSingle: async () => {
          if (table === 'memberships') return { data: { user_id: 'dispatcher-1', role: 'owner', active: true }, error: null };
          if (table !== 'workspace_snapshots') return { data: null, error: null };
          if (targetDate === '2000-01-01') return { data: { operation_date: targetDate, revision: 4, payload: clone(remotePersistentState), updated_at: '2026-08-05T07:00:00Z' }, error: null };
          return { data: null, error: null };
        }
      };
    },
    rpc: async (name, args) => {
      if (name === 'relayops_admin_status') return { data: false, error: null };
      if (name === 'save_workspace_snapshot_v4') {
        order.push(`write:${args.target_date}`); rpcCalls.push(clone(args));
        return { data: { revision: 1, updated_at: '2026-08-05T07:00:01Z' }, error: null };
      }
      return { data: null, error: null };
    },
    removeChannel() {}
  };
  const context = {
    console, URL, Date, setTimeout, clearTimeout,
    location: { href: 'https://relayops.example.test/?date=2026-08-05' },
    document: { visibilityState: 'visible', addEventListener() {} },
    window: {
      addEventListener() {}, localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
      RELAYOPS_CLOUD_CONFIG: { supabaseUrl: 'https://relayops.supabase.co', supabaseAnonKey: 'anon', organizationId: 'org', stationId: 'station' },
      supabase: { createClient: () => client },
      RelayOpsApp: {
        operationDate: () => '2026-08-05',
        sharedState: () => clone(dailyState),
        persistentState: () => clone(persistentState),
        resetDailyState(date) {
          order.push(`reset:${date}`);
          dailyState = { morningRoutes: Array.from({ length: 6 }, (_, index) => ({ routeUid: `WAVE-ANCHOR-${date}-${index + 1}`, route: `__blank_wave_${index + 1}`, driver: '', _blank: true, _waveAnchor: true })) };
          return clone(dailyState);
        },
        applySharedState(payload) { dailyState = clone(payload); },
        applyPersistentState(payload) { persistentState = { ...persistentState, ...clone(payload || {}) }; }
      }
    }
  };
  context.globalThis = context;
  vm.runInNewContext(CLOUD_SOURCE, context, { filename: 'cloud-sync.js' });
  await context.window.RelayOpsCloud.init();
  await new Promise(resolve => setTimeout(resolve, 25));
  const dailyWrite = rpcCalls.find(call => call.target_date === '2026-08-05');
  assert(order.includes('reset:2026-08-05'), 'Cloud load must reset app daily state when the selected day has no snapshot');
  assert(dailyWrite, 'Missing shared day was not initialized');
  assert(order.indexOf('reset:2026-08-05') < order.indexOf('write:2026-08-05'), 'Cloud initialized the missing day before resetDailyState completed');
  assert.strictEqual(dailyWrite.new_payload.morningRoutes.length, 6, 'Missing day initialization did not write six blank wave anchors');
  assert(!dailyWrite.new_payload.morningRoutes.some(row => row.route === 'CXOLD' || row.driver === 'Yesterday Driver'), 'Missing day initialization copied prior-day operational data');
  assert(!rpcCalls.some(call => call.target_date === '2000-01-01'), 'Missing daily row caused an unnecessary permanent workspace write');
  assert.deepStrictEqual(persistentState, remotePersistentState, 'A missing-day reset failed to preserve or hydrate permanent driver, fleet-issue, parking-layout, and coaching data');
}

async function run() {
  testLosAngelesDateBoundaries();
  testStaleSavedDateBootsIntoCurrentDay();
  testFreshDayResetAndPermanentPreservation();
  testSharedHydrationResetPreservesLocalDispatcherState();
  testRolloverPolicyAndIdempotence();
  await testCloudResetsBeforeMissingDayInitialization();
  console.log('Daily operation rollover, reset, preservation, and missing-day initialization contracts passed');
}

run().catch(error => { console.error(error); process.exitCode = 1; });
