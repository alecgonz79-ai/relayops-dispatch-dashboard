const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {createRequire} = require('node:module');

// Reuse only the DOM harness, not its tests. These imports never hit a real
// database or browser, and the real PAYCOM row parser and import commit run.
const harnessPath = require.resolve('./multi-station-local-preview.cjs');
const harnessSource = fs.readFileSync(harnessPath, 'utf8').split('async function main()')[0];
const {browserHarness, appSource} = new Function('require', `${harnessSource}\nreturn {browserHarness,appSource};`)(createRequire(harnessPath));
const stationSource = fs.readFileSync(require.resolve('../station-workspace.js'), 'utf8');
const TODAY = '2026-09-07';
const TOMORROW = '2026-09-08';
const DAY_AFTER = '2026-09-09';
const clone = value => JSON.parse(JSON.stringify(value));

function load(code = 'DJT6', seed = {}) {
  const h = browserHarness({hostname: 'alecgonz79-ai.github.io', search: `?station=${code}&date=${TODAY}`, seed});
  let now = Date.parse('2026-09-07T19:00:00Z');
  class FakeDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  h.advance = date => { now = Date.parse(date); };
  h.context.Date = FakeDate;
  h.context.setTimeout = () => ({unref() {}});
  h.context.clearTimeout = () => {};
  Object.defineProperty(h.context.localStorage, 'length', {get: () => h.storage.size});
  h.context.localStorage.key = index => [...h.storage.keys()][index] ?? null;
  h.context.window.RELAYOPS_CLOUD_CONFIG = {
    multiStationEnabled: true,
    stations: {
      DJT6: {stationId: '00000000-0000-4000-8000-000000000001'},
      DUR6: {stationId: '00000000-0000-4000-8000-000000000002'}
    }
  };
  vm.createContext(h.context);
  vm.runInContext(stationSource, h.context, {filename: 'station-workspace.js'});
  vm.runInContext(appSource, h.context, {filename: 'app.js'});
  h.run = source => vm.runInContext(source, h.context);
  h.read = source => clone(h.run(source));
  h.run(`
    globalThis.notices=[];toast=(message,type)=>notices.push({message,type});render=()=>{};
    parseUploadedFile=async file=>file.parsed;
  `);
  return h;
}

function seedOpening(h) {
  h.run(`
    state.morningOperationDate='${TODAY}';state.rosteringDate='${TODAY}';
    state.rosteringPlans={};state.rosteringHelperPool={};state.rosteringManualTraining={};state.rosteringTrainingMatches={};
    state.morningRoutes=[];state.scheduleImportName='Opening-only-paycom.csv';
    state.scheduleEntries=[
      {date:'9/7/2026',name:'Opening Associate',role:'Delivery Associate',start:'11:15 AM'},
      {date:'9/7/2026',name:'Opening Rescue',role:'Rescue',start:'11:20 AM'},
      {date:'9/7/2026',name:'Opening Helper',role:'Driver Helper',start:'11:20 AM'},
      {date:'9/7/2026',name:'Opening Called Off',role:'Delivery Associate',start:'11:15 AM'}
    ];
    state.scheduleDriverMarks={'${TODAY}|manual backup':'backup'};
    state.scheduleBackupRecords={'${TODAY}|manual backup':{name:'Manual Backup',role:'Rescue',vto:'VTO 2'}};
    state.scheduleStayHome={'${TODAY}|stay home':{name:'Stay Home',role:'Delivery Associate'}};
    state.scheduleReductions={'${TODAY}|reduced driver':{name:'Reduced Driver',role:'Delivery Associate'}};
    state.scheduleHelpers={'${TODAY}|manual helper':{name:'Manual Helper',role:'Driver Helper'}};
    state.callOffDriverKeys={'${TODAY}|opening called off':{name:'Opening Called Off',role:'Delivery Associate'}};
    state.callOffReasons={'${TODAY}|opening called off':'Sick'};
    state.openingPicklistBackupOverrides={'vto2:0':'Manual Backup'};
    state.rosteringPlans[state.rosteringDate]=normalizeRosteringPlan({services:rosteringDefaultServices()});
    globalThis.openingSnapshot=()=>JSON.stringify({
      scheduleEntries:state.scheduleEntries,scheduleImportName:state.scheduleImportName,
      morningOperationDate:state.morningOperationDate,morningRoutes:state.morningRoutes,
      scheduleDriverMarks:state.scheduleDriverMarks,scheduleBackupRecords:state.scheduleBackupRecords,
      scheduleStayHome:state.scheduleStayHome,scheduleReductions:state.scheduleReductions,
      scheduleHelpers:state.scheduleHelpers,callOffDriverKeys:state.callOffDriverKeys,
      callOffReasons:state.callOffReasons,openingPicklistBackupOverrides:state.openingPicklistBackupOverrides,
      backups:currentBackupDriverRows(),helpers:helperRosterRows()
    });
  `);
}

function parsedFile(entries, name = 'Paycom-shifts.csv') {
  return {name, parsed: {name, rows: [
    ['Date', 'Name', 'Role', 'Start', 'End'],
    ...entries.map(row => [row.date || '', row.name, row.role || 'Delivery Associate', row.start || '11:15 AM', '9:15 PM'])
  ]}};
}

async function importSchedule(h, destination, entries, name) {
  h.context.inputFiles = [parsedFile(entries, name)];
  h.context.destination = destination;
  h.run("state.importPurpose='schedule';state.scheduleImportDestination=destination;state.page=destination;notices=[];");
  await h.run('readFiles(inputFiles)');
  assert.equal(h.read("notices.filter(row=>row.type==='error')").length, 0, 'The actual import must succeed');
}

async function testStation(code) {
  const h = load(code);
  seedOpening(h);
  assert.deepEqual(h.read('rosteringScheduleEntriesForDate()'), [], `${code}: Rostering must never fall back to Opening shifts`);
  const openingBefore = h.run('openingSnapshot()');
  await importSchedule(h, 'rostering', [
    {date: TODAY, name: `${code} Roster Associate`},
    {date: TODAY, name: `${code} Roster Rescue`, role: 'Rescue'},
    {date: TODAY, name: `${code} Roster Helper`, role: 'Driver Helper'},
    {date: TODAY, name: `${code} Roster Ridealong`, role: 'Ride Along'}
  ]);
  assert.equal(h.run('openingSnapshot()'), openingBefore, `${code}: Rostering import must not alter any Opening shifts, derived backups, helper rows, or manual operational decisions`);
  const rosterNames = h.read('rosteringScheduleEntriesForDate().map(row=>row.name)');
  assert.equal(rosterNames.length, 4);
  assert(rosterNames.every(name => name.startsWith(code)));
  assert(h.read('currentRosteringPlan().assignments').some(row => row.associate === `${code} Roster Helper` && row.source === 'auto-helper'));
  const email = h.run('rosteringEmailTemplateText()');
  assert(email.includes(`Helpers:\n\n${code} Roster Helper`));
  assert(email.includes(`Ride Alongs:\n\n${code} Roster Ridealong`));
  assert(!email.includes('Opening Associate') && !email.includes('Opening Helper'), 'Rostering email cannot borrow Opening imports');

  const persistent = h.read('persistentWorkspaceState()');
  assert.equal(persistent.rosteringPlans[TODAY].paycomEntries.length, 4, 'Roster shifts must travel with the station-persistent plan');
  assert.equal(h.read('sharedWorkspaceState()').rosteringPlans, undefined, 'Daily workspace must not duplicate persistent roster shifts');
  const restored = load(code, Object.fromEntries(h.storage));
  assert.deepEqual(restored.read('rosteringScheduleEntriesForDate().map(row=>row.name)'), rosterNames, 'A browser reload must retain isolated roster PAYCOM shifts');
  const secondDispatcher = load(code);
  seedOpening(secondDispatcher);
  secondDispatcher.context.payload = persistent;
  const secondOpening = secondDispatcher.run('openingSnapshot()');
  secondDispatcher.run('applyPersistentWorkspaceState(payload)');
  assert.deepEqual(secondDispatcher.read('rosteringScheduleEntriesForDate().map(row=>row.name)'), rosterNames, 'A second dispatcher must receive roster shifts through the persistent station payload');
  assert.equal(secondDispatcher.run('openingSnapshot()'), secondOpening, 'Persistent roster hydration must not populate Opening backups');

  const rosterBeforeOpeningImport = h.run('JSON.stringify(currentRosteringPlan())');
  await importSchedule(h, 'roster', [
    {date: TODAY, name: 'New Opening Associate'},
    {date: TODAY, name: 'New Opening Rescue', role: 'Rescue'}
  ], 'Opening-new.csv');
  assert.equal(h.run('JSON.stringify(currentRosteringPlan())'), rosterBeforeOpeningImport, 'Opening reimport must preserve the independent Rostering plan and PAYCOM rows');
  const backups = h.read('currentBackupDriverRows()');
  assert(backups.some(row => row.name === 'New Opening Associate' && row.vto === 'VTO 4'));
  assert(backups.some(row => row.name === 'New Opening Rescue' && row.vto === 'VTO 2'));
  assert(!backups.some(row => row.name.startsWith(`${code} Roster`)));
  assert.equal(h.fetches.length, 0, 'These local imports must not introduce direct fetch or polling work');
  return h;
}

async function testDatesAndScreenshots() {
  const h = load();seedOpening(h);
  const openingBefore = h.run('openingSnapshot()');
  await importSchedule(h, 'rostering', [{date: TODAY, name: 'Today Roster'}, {date: TOMORROW, name: 'Tomorrow Roster'}]);
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${TODAY}').map(row=>row.name)`), ['Today Roster']);
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${TOMORROW}').map(row=>row.name)`), ['Tomorrow Roster']);
  await importSchedule(h, 'rostering', [{date: TOMORROW, name: 'Tomorrow Replacement'}]);
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${TODAY}').map(row=>row.name)`), ['Today Roster'], 'Refreshing one roster date must retain other dates');
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${TOMORROW}').map(row=>row.name)`), ['Tomorrow Replacement']);
  h.run(`state.rosteringDate='${DAY_AFTER}'`);
  await importSchedule(h, 'rostering', [{name: 'Undated Selected Date'}]);
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${DAY_AFTER}').map(row=>row.name)`), ['Undated Selected Date']);
  assert.deepEqual(h.read("rosteringScheduleEntriesForDate('2026-09-10')"), [], 'An undated import cannot become a fallback for other dates');

  h.run(`state.rosteringDate='${TODAY}';applyRosteringScreenshotText('Standard Parcel Electric - Rivian MEDIUM - Default as station - 10 Hours 2 Confirmed 0 Rostered','confirmed-roster.png');`);
  assert.deepEqual(h.read('rosteringScheduleEntriesForDate().map(row=>row.name)'), ['Today Roster'], 'Screenshot replacement must preserve PAYCOM entries already imported for that date');
  assert.equal(h.run('currentRosteringPlan().paycomImportName'), 'Paycom-shifts.csv');
  await importSchedule(h, 'rostering', [{date: DAY_AFTER, name: 'Screenshot Locked Driver'}], 'Locked-Paycom.csv');
  assert.equal(h.run('state.rosteringDate'), TODAY);
  assert.deepEqual(h.read('rosteringScheduleEntriesForDate().map(row=>row.name)'), ['Screenshot Locked Driver'], 'Existing confirmed screenshot keeps its selected roster date');
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${DAY_AFTER}').map(row=>row.name)`), ['Undated Selected Date'], 'A screenshot-locked import must not overwrite its original file date');
  assert.equal(h.run('openingSnapshot()'), openingBefore, 'Date alignment and screenshots must leave Opening state untouched');

  h.advance('2026-09-08T07:00:01Z');
  h.run(`resetSharedDailyOperationsState('${TOMORROW}')`);
  assert.equal(h.run(`Boolean(state.rosteringPlans['${TODAY}'])`), false, 'Midnight must expire the prior-day roster and its PAYCOM shifts together');
  assert.deepEqual(h.read('currentScheduleEntries()'), [], 'Opening schedule must still start fresh after midnight');
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${TOMORROW}').map(row=>row.name)`), ['Tomorrow Replacement'], 'Midnight cannot delete tomorrow’s already prepared Rostering plan');
  assert.deepEqual(h.read(`rosteringScheduleEntriesForDate('${DAY_AFTER}').map(row=>row.name)`), ['Undated Selected Date']);
  assert.deepEqual(h.read('currentBackupDriverRows()'), [], 'Retained future roster imports must not leak into the new Opening day');
}

async function testStaleImport(change, label) {
  const h = load();seedOpening(h);
  let resolveParse;
  h.context.delayedParse = () => new Promise(resolve => { resolveParse = resolve; });
  h.run("parseUploadedFile=delayedParse;state.importPurpose='schedule';state.scheduleImportDestination='rostering';");
  const openingBefore = h.run('openingSnapshot()');
  const planBefore = h.run('JSON.stringify(state.rosteringPlans)');
  const pending = h.run("readFiles([{name:'Delayed-Paycom.csv'}])");
  for (let turn = 0; turn < 10 && !resolveParse; turn++) await Promise.resolve();
  assert(resolveParse, 'Deferred parse must actually begin before changing UI context');
  h.run(change);
  resolveParse(parsedFile([{date: TODAY, name: 'Stale Import Driver'}]).parsed);
  await pending;
  assert.equal(h.run('openingSnapshot()'), openingBefore, `${label}: a stale import cannot be redirected into Opening`);
  assert.equal(h.run('JSON.stringify(state.rosteringPlans)'), planBefore, `${label}: a stale import cannot change Rostering plans`);
}

(async () => {
  const home = await testStation('DJT6');
  const popup = await testStation('DUR6');
  const combined = {...Object.fromEntries(home.storage), ...Object.fromEntries(popup.storage)};
  for (const code of ['DJT6', 'DUR6']) {
    const restored = load(code, combined);
    const names = restored.read('rosteringScheduleEntriesForDate().map(row=>row.name)');
    assert.equal(names.length, 4);
    assert(names.every(name => name.startsWith(code)), `${code}: real station-scoped storage must not read the other station’s Rostering shifts`);
  }
  await testDatesAndScreenshots();
  await testStaleImport("state.scheduleImportDestination='roster'", 'Changed destination');
  await testStaleImport(`state.rosteringDate='${TOMORROW}'`, 'Changed roster date');
  console.log('Rostering import separation, Opening backup preservation, station storage, hydration, dates, rollover, screenshot, and stale-import tests passed');
})().catch(error => {console.error(error);process.exitCode = 1;});
