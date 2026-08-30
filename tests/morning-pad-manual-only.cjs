const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP_SOURCE = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createContext() {
  const storage = new Map();
  const app = { innerHTML: '' };
  const fileInput = { accept: '', multiple: true, value: '', files: [], addEventListener() {}, click() {} };
  const element = () => ({
    addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
    focus() {}, blur() {}, select() {}, setSelectionRange() {}, click() {},
    cloneNode() { return element(); }, querySelector() { return null; }, querySelectorAll() { return []; },
    textContent: '', value: ''
  });
  const context = {
    console, Intl, Blob, URL, URLSearchParams, TextDecoder, TextEncoder,
    setTimeout, clearTimeout, setInterval, clearInterval,
    navigator: { clipboard: { writeText: async () => true } },
    location: new URL('https://relayops.example.test/?date=2026-08-29'),
    history: { replaceState() {} },
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    document: {
      visibilityState: 'visible', activeElement: null,
      body: { appendChild() {}, classList: { add() {}, remove() {} } },
      documentElement: { contains() { return true; }, style: { setProperty() {}, removeProperty() {} } },
      getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
      querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
      addEventListener() {}, removeEventListener() {}
    },
    window: {
      scrollTo() {}, open() {}, print() {}, addEventListener() {}, removeEventListener() {}
    }
  };
  context.globalThis = context;
  context.window.location = context.location;
  context.window.localStorage = context.localStorage;
  vm.createContext(context);
  vm.runInContext(APP_SOURCE, context, { filename: 'app.js' });
  vm.runInContext(`
    globalThis.__persistCount=0;
    toast=()=>{};
    render=()=>{};
    renderLightweightModal=()=>{};
    persist=()=>{globalThis.__persistCount+=1;};
    state.dspCode='LLOL';
    state.organizationName='Legacy Logistics';
    state.morningOperationDate='2026-08-29';
    state.page='morning';
    state.fitMorningRows=true;
    state.fitOpeningPicklistRows=true;
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
    state.morningWaveTimeOverrides={};
    state.morningSectionPadOverrides={};
    state.driverContacts=[];
    state.driverProfiles={};
    state.driverNameAliases={};
    state.fleetIssues={};
    state.equipmentIssues={};
  `, context);
  return context;
}

function jsonValue(context, expression, globalName) {
  vm.runInContext(`globalThis.${globalName}=JSON.parse(JSON.stringify(${expression}));`, context);
  return clone(context[globalName]);
}

function seedPlan(context, { suffix = '', packageDelta = 0 } = {}) {
  context.__planSuffix = suffix;
  context.__packageDelta = packageDelta;
  vm.runInContext(`
    state.importedFile={
      name:'DAYOFOPSPLAN${globalThis.__planSuffix}.xlsx + Routes_DJT6${globalThis.__planSuffix}.xlsx',
      kind:'plan',
      headers:['DSP','Route Code','Service Type','Wave','Staging Location','Route Duration','Num Packages'],
      rows:[
        ['LLOL','CX101','Standard Parcel','11:15 AM','STG.V.1',420,300+globalThis.__packageDelta],
        ['LLOL','CX201','Standard Parcel','11:20 AM','STG.P.1',430,310+globalThis.__packageDelta]
      ],
      routeDetails:{
        CX101:{driver:'Driver One',stops:171,plannedRts:''},
        CX201:{driver:'Driver Two',stops:181,plannedRts:''}
      },
      routeDetailsCount:2
    };
    applyImport();
  `, context);
}

function padSnapshot(context, globalName) {
  return jsonValue(context, `(()=>{
    const sections=morningSections(allMorningRows()).filter(section=>/^WAVE\\s*[1-6]$/i.test(section.label));
    const payload=morningSheetsConnectorPayload();
    return {
      raw:state.morningRoutes.map(row=>({route:row.route,pad:row.pad||'',padOverride:row.padOverride||''})),
      effective:state.morningRoutes.map(row=>({route:row.route,pad:morningEffectivePad(row)})),
      sections:sections.map(section=>({label:section.label,pad:morningSectionPad(section)})),
      connector:payload.sections.filter(section=>/^WAVE\\s*[1-6]$/i.test(section.label)).map(section=>({label:section.label,pad:section.pad})),
      connectorRoutePads:payload.rows.filter((row,index)=>payload.rowTypes[index]==='route').map(row=>String(row[4]||''))
    };
  })()`, globalName);
}

function padsByLabel(snapshot) {
  return Object.fromEntries(snapshot.sections.map(section => [section.label, section.pad]));
}

function checkOnlyManualPad(snapshot, expected = {}, phase = 'Morning Sheet') {
  const actual = padsByLabel(snapshot);
  for (let index = 1; index <= 6; index += 1) {
    const label = `WAVE ${index}`;
    check((actual[label] || '') === (expected[label] || ''),
      `${phase}: ${label} PAD must be ${expected[label] ? `'${expected[label]}'` : 'blank'}; got '${actual[label] || ''}'.`);
  }
  check(snapshot.connector.every(section => (section.pad || '') === (expected[section.label] || '')),
    `${phase}: Google Morning Sheet handoff PAD values did not match dispatcher-only values: ${JSON.stringify(snapshot.connector)}.`);
  check(snapshot.connectorRoutePads.every(value => !value || Object.values(expected).includes(value)),
    `${phase}: a connector route row contained a generated PAD value: ${JSON.stringify(snapshot.connectorRoutePads)}.`);
}

function editWaveOnePad(context, value = 'Q', original = '') {
  context.__manualPad = value;
  context.__manualPadOriginal = original;
  vm.runInContext(`
    saveMorningEditCell({
      dataset:{editField:'padOverride',editOriginal:globalThis.__manualPadOriginal,editSection:'WAVE 1',editWave:'11:15 AM'},
      cloneNode(){return {textContent:globalThis.__manualPad,querySelectorAll(){return [];}};}
    });
  `, context);
}

const context = createContext();

// A combined DAYOFOPSPLAN + Routes_DJT6 import may populate route, driver,
// wave, staging, and counts, but PAD is always a dispatcher-entered field.
seedPlan(context);
const afterImport = padSnapshot(context, '__padsAfterImport');
check(afterImport.raw.every(row => !row.pad && !row.padOverride),
  `DAYOFOPSPLAN/Routes import wrote raw PAD data: ${JSON.stringify(afterImport.raw)}.`);
check(afterImport.effective.every(row => !row.pad),
  `DAYOFOPSPLAN/Routes import generated effective PAD letters: ${JSON.stringify(afterImport.effective)}.`);
checkOnlyManualPad(afterImport, {}, 'Initial DAYOFOPSPLAN + Routes_DJT6 import');

// Legacy/generated row.pad values are not proof of dispatcher input and must
// never revive the old A/B/C cycle after the release upgrade.
vm.runInContext(`state.morningRoutes.forEach((row,index)=>{row.pad=index?'B':'A';});`, context);
checkOnlyManualPad(padSnapshot(context, '__legacyRawPads'), {}, 'Legacy generated row.pad values');
vm.runInContext(`state.morningRoutes.forEach(row=>{delete row.pad;});`, context);

// Exercise the three dispatcher paths that fill van/device/portable values.
// None of them is allowed to derive or mutate a PAD.
vm.runInContext(`
  const dailyVehicle=(number)=>({
    name:'EV'+number,vin:'7FCEHEB79PN'+String(number).padStart(6,'0'),battery:95,miles:150,
    vehicleType:'Rivian EDV 700',operational:'Operational',active:'Active',
    source:'Amazon fleet list + FleetOS tracker',hasBattery:true,hasMiles:true,
    hasActive:true,hasOperational:true
  });
  const dailyFleet=[dailyVehicle(1),dailyVehicle(2)];
  rivianFleet.splice(0,rivianFleet.length,...dailyFleet);
  state.fleetImport={name:'Daily Fleet Health',vehicles:JSON.parse(JSON.stringify(dailyFleet))};
  state.fleetSourceUploads={fleetos:{name:'Vehicle_List.csv',vehicles:JSON.parse(JSON.stringify(dailyFleet))}};
  state.equipmentImport={name:'Device and Portable Sheet',details:{
    '1':{device:'D1',portable:'P1'},'2':{device:'D2',portable:'P2'}
  }};
  assignOperationalVehicles();
`, context);
const afterSafeVans = padSnapshot(context, '__padsAfterSafeVans');
checkOnlyManualPad(afterSafeVans, {}, 'Assign safe vans');
check(jsonValue(context, `state.morningRoutes.every(row=>row.ev&&row.deviceName&&row.portable)`, '__safeAssigned'),
  'The safe-van setup did not actually assign vehicle/equipment, so its PAD invariant was not exercised.');

vm.runInContext(`clearMorningVehicleAssignments();assignBagReadyVehicles();`, context);
const afterPreppedVans = padSnapshot(context, '__padsAfterPreppedVans');
checkOnlyManualPad(afterPreppedVans, {}, 'Prepped Vans');
check(jsonValue(context, `state.morningRoutes.every(row=>row.ev&&row.deviceName&&row.portable)`, '__preppedAssigned'),
  'The Prepped Vans setup did not actually assign vehicle/equipment, so its PAD invariant was not exercised.');

vm.runInContext(`inputDeviceSheetToMorning();`, context);
checkOnlyManualPad(padSnapshot(context, '__padsAfterDeviceInput'), {}, 'Input Device Sheet to Morning');

// Use the real editable PAD-cell save path. One edit applies to the section,
// is persisted, appears in the connector, and leaves every other wave blank.
const persistsBeforeEdit = context.__persistCount;
editWaveOnePad(context, 'Q');
const afterManualEdit = padSnapshot(context, '__padsAfterManualEdit');
checkOnlyManualPad(afterManualEdit, { 'WAVE 1': 'Q' }, 'Manual PAD edit');
check(afterManualEdit.raw.filter(row => row.route === 'CX101').every(row => row.padOverride === 'Q'),
  'The dispatcher PAD edit did not attach to the Wave 1 route.');
check(context.__persistCount > persistsBeforeEdit,
  'The dispatcher PAD edit did not use the normal persisted Morning Sheet edit path.');

// An intentional manual clear is authoritative and must not reveal any old
// generated value. The empty section key is retained for cross-dispatch sync.
editWaveOnePad(context, '', 'Q');
checkOnlyManualPad(padSnapshot(context, '__padsAfterManualClear'), {}, 'Manual PAD clear');
check(jsonValue(context, `Object.prototype.hasOwnProperty.call(state.morningSectionPadOverrides,morningSectionPadOverrideKey('WAVE 1'))`, '__manualClearSentinel'),
  'A manual PAD clear did not retain an explicit shared clear marker.');
editWaveOnePad(context, 'Q', '');

// The shared daily snapshot must carry the manual value to another dispatcher.
const sharedManualSnapshot = jsonValue(context, 'sharedWorkspaceState()', '__sharedManualSnapshot');
const receiver = createContext();
receiver.__sharedManualSnapshot = sharedManualSnapshot;
vm.runInContext(`applySharedWorkspaceState(globalThis.__sharedManualSnapshot);`, receiver);
checkOnlyManualPad(padSnapshot(receiver, '__receiverPads'), { 'WAVE 1': 'Q' }, 'Second-dispatcher shared hydration');

// Re-importing updated plan/route files for the same operation date may refresh
// route data, but it must retain the manual PAD and keep untouched waves blank.
seedPlan(context, { suffix: '-refresh', packageDelta: 9 });
const afterReimport = padSnapshot(context, '__padsAfterReimport');
checkOnlyManualPad(afterReimport, { 'WAVE 1': 'Q' }, 'Same-day DAYOFOPSPLAN + Routes_DJT6 re-import');
check(jsonValue(context, `state.morningRoutes.find(row=>row.route==='CX101')?.packages`, '__reimportPackages') === 309,
  'The re-import fixture did not refresh route data, so PAD preservation was not exercised during a real plan refresh.');

// Keep this check independent if a production regression above erased the PAD.
if ((padsByLabel(afterReimport)['WAVE 1'] || '') !== 'Q') editWaveOnePad(context, 'Q');
vm.runInContext(`
  state.importedFile={
    name:'Routes_DJT6-refresh.xlsx',kind:'details',headers:['Route code','Driver name','All stops'],rows:[],
    routeDetails:{CX101:{driver:'Driver One Updated',stops:177},CX201:{driver:'Driver Two Updated',stops:187}},
    routeDetailsCount:2
  };
  applyImport();
`, context);
const afterDetails = padSnapshot(context, '__padsAfterDetails');
checkOnlyManualPad(afterDetails, { 'WAVE 1': 'Q' }, 'Routes_DJT6-only detail refresh');
check(jsonValue(context, `state.morningRoutes.find(row=>row.route==='CX101')?.stops`, '__detailStops') === 177,
  'The Routes_DJT6-only fixture did not refresh stop counts, so its PAD invariant was not exercised.');

// A shared operational update with newer vehicle/equipment values but no PAD
// value must not erase a local manual PAD. Blank/stale remote PAD data is not
// evidence that a dispatcher intentionally cleared the cell.
const staleSharedUpdate = jsonValue(context, `(()=>{
  const payload=sharedWorkspaceState();
  payload.morningRoutes=payload.morningRoutes.map(row=>({
    routeUid:row.routeUid,dsp:row.dsp,driver:row.driver,route:row.route,service:row.service,
    wave:row.wave,staging:row.staging,stops:row.stops,packages:row.packages,
    ev:row.route==='CX101'?'9':row.ev,deviceName:row.route==='CX101'?'D9':row.deviceName,
    portable:row.route==='CX101'?'P9':row.portable,pad:'',padOverride:''
  }));
  payload.morningSectionPadOverrides={};
  return payload;
})()`, '__staleSharedUpdate');
context.__staleSharedUpdate = staleSharedUpdate;
vm.runInContext(`applySharedWorkspaceState(globalThis.__staleSharedUpdate);`, context);
const afterSharedApply = padSnapshot(context, '__padsAfterSharedApply');
checkOnlyManualPad(afterSharedApply, { 'WAVE 1': 'Q' }, 'Blank/stale shared-state application');
check(jsonValue(context, `state.morningRoutes.find(row=>row.route==='CX101')?.ev`, '__sharedEv') === '9',
  'The shared update fixture did not apply its newer EV value, so PAD preservation was not exercised during shared-state application.');

// A newer client can distinguish an intentional remote clear from a missing
// stale field by including the empty section override key.
const explicitSharedClear = jsonValue(context, `(()=>{
  const payload=sharedWorkspaceState(),key=morningSectionPadOverrideKey('WAVE 1');
  payload.morningRoutes=payload.morningRoutes.map(row=>({...row,pad:row.wave==='11:15 AM'?'Q':'',padOverride:row.wave==='11:15 AM'?'Q':''}));
  payload.morningSectionPadOverrides={...(payload.morningSectionPadOverrides||{}),[key]:''};
  return payload;
})()`, '__explicitSharedClear');
context.__explicitSharedClear = explicitSharedClear;
vm.runInContext(`applySharedWorkspaceState(globalThis.__explicitSharedClear);`, context);
checkOnlyManualPad(padSnapshot(context, '__padsAfterExplicitSharedClear'), {}, 'Explicit shared PAD clear');
vm.runInContext(`rememberManualMorningPads();`, context);
checkOnlyManualPad(padSnapshot(context, '__padsAfterRememberingExplicitClear'), {}, 'Explicit shared PAD clear after legacy migration');

if (failures.length) {
  console.error(`Manual-only Morning PAD regression failed (${failures.length}):`);
  failures.forEach((message, index) => console.error(`${index + 1}. ${message}`));
  process.exitCode = 1;
} else {
  console.log('Manual-only Morning PAD regression passed: imports and assignments stay blank; dispatcher PADs survive refreshes and shared updates.');
}
