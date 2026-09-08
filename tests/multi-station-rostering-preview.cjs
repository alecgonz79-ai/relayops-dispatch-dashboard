const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const appSource = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const STORAGE_KEY = 'relayops_multistation_preview_v1';
const openingDate = '2099-09-07';
const futureDate = '2099-09-08';

function loadApp({ station = 'DJT6', date = openingDate, seed = {}, storage = new Map(Object.entries(seed)) } = {}) {
  const classList = { add() {}, remove() {}, toggle() { return false; }, contains() { return false; } };
  const style = { setProperty() {}, removeProperty() {} };
  const element = () => ({ classList, style, dataset: {}, addEventListener() {}, appendChild() {}, remove() {}, setAttribute() {}, removeAttribute() {}, querySelector() { return null; }, querySelectorAll() { return []; }, focus() {}, blur() {}, select() {}, setSelectionRange() {}, click() {}, getBoundingClientRect() { return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }; } });
  const app = { innerHTML: '' }, fileInput = { ...element(), files: [] };
  const localStorage = { getItem(key) { return storage.get(String(key)) ?? null; }, setItem(key, value) { storage.set(String(key), String(value)); }, removeItem(key) { storage.delete(String(key)); } };
  const location = { hostname: 'localhost', host: 'localhost:4173', protocol: 'http:', origin: 'http://localhost:4173', pathname: '/', search: `?multiStationPreview=1&station=${station}&date=${date}` };
  location.href = location.origin + '/' + location.search;
  const history = { replaceState(_state, _title, href) { location.href = String(href); location.search = new URL(location.href).search; } };
  const document = { body: { classList, appendChild() {} }, documentElement: { clientWidth: 1280, clientHeight: 800, style, contains() { return true; } }, visibilityState: 'visible', activeElement: { blur() {} }, addEventListener() {}, getElementById(id) { return id === 'app' ? app : id === 'file-input' ? fileInput : null; }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element };
  const window = { localStorage, location, innerWidth: 1280, innerHeight: 800, scrollX: 0, scrollY: 0, scrollTo() {}, addEventListener() {}, removeEventListener() {}, matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; } };
  const context = { console: { log() {}, warn() {}, error() {} }, Intl, Blob, URL, URLSearchParams, TextDecoder, TextEncoder, setTimeout() { return 0; }, clearTimeout() {}, navigator: { clipboard: { writeText: async () => true } }, crypto: { randomUUID: () => 'preview-test-id' }, localStorage, location, history, window, document, fetch: async () => { throw new Error('Preview must not contact a network'); } };
  window.fetch = context.fetch;
  vm.createContext(context);
  vm.runInContext(appSource, context, { filename: 'app.js' });
  vm.runInContext('render=()=>{};renderLightweightModal=()=>{};toast=()=>{};', context);
  return { context, storage };
}

function run(harness, source) { return vm.runInContext(source, harness.context); }
function snapshot(harness) {
  return JSON.parse(run(harness, `JSON.stringify({station:activeMorningStationCode(),openingDate:state.morningOperationDate,date:state.rosteringDate,plans:state.rosteringPlans,helperPool:state.rosteringHelperPool,trainingMatches:state.rosteringTrainingMatches,manualTraining:state.rosteringManualTraining,openServices:state.rosteringOpenServices,category:state.rosteringPaycomCategory,autoMode:state.rosteringAutoMode})`));
}
function addRostering(harness, label, rosterDate = futureDate) {
  harness.context.__fixture = { label, rosterDate };
  run(harness, `(()=>{
    const {label,rosterDate}=__fixture;state.rosteringDate=rosterDate;
    state.rosteringPlans[rosterDate]={services:[],assignments:[],paycomEntries:[{date:rosterDate,name:label+' Driver',role:'Delivery Associate'}],paycomImportName:label+'.csv'};
    state.rosteringHelperPool[rosterDate]=[{name:label+' Helper'}];
    state.rosteringTrainingMatches[rosterDate+'|trainee']={ridealong:label+' Trainee',trainer:label+' Trainer'};
    state.rosteringManualTraining[rosterDate+'|ridealong|manual']={kind:'ridealong',name:label+' Manual'};
    state.rosteringOpenServices={[label]:true};state.rosteringPaycomCategory='helper';state.rosteringAutoMode='abc';
    persistRosteringSlice();
  })()`);
}

const legacyPlan = { services: [], assignments: [], paycomEntries: [{ date: futureDate, name: 'Legacy Home Driver', role: 'Rescue' }] };
const legacySeed = { relayops_rostering_plans: JSON.stringify({ [futureDate]: legacyPlan }), relayops_rostering_date: futureDate };
const home = loadApp({ seed: legacySeed });
assert.strictEqual(snapshot(home).plans[futureDate].paycomEntries[0].name, 'Legacy Home Driver', 'DJT6 lost its legacy Rostering plan');
const originalLegacy = home.storage.get('relayops_rostering_plans');
addRostering(home, 'DJT6');
const savedHome = snapshot(home);
run(home, `switchOpeningStation('DUR6');`);
assert.deepStrictEqual(snapshot(home).plans, {}, 'DUR6 inherited DJT6 Rostering plans');
assert.deepStrictEqual(snapshot(home).helperPool, {}, 'DUR6 inherited DJT6 helper pool');
assert.deepStrictEqual(snapshot(home).trainingMatches, {}, 'DUR6 inherited DJT6 trainer matches');
assert.deepStrictEqual(snapshot(home).manualTraining, {}, 'DUR6 inherited DJT6 manual training');
addRostering(home, 'DUR6');
const savedDur6 = snapshot(home);
assert.strictEqual(savedDur6.openingDate, openingDate, 'Preparing future Rostering changed the active Opening day');
run(home, `switchOpeningStation('DJT6');`);
assert.deepStrictEqual(snapshot(home), savedHome, 'Returning to DJT6 lost its future-date Rostering selection or records');
run(home, `switchOpeningStation('DUR6');`);
assert.deepStrictEqual(snapshot(home), savedDur6, 'Returning to DUR6 lost its future-date Rostering selection or records');
assert.strictEqual(home.storage.get('relayops_rostering_plans'), originalLegacy, 'Preview overwrote production-compatible legacy Rostering storage');

const reloaded = loadApp({ station: 'DUR6', storage: home.storage });
assert.deepStrictEqual(snapshot(reloaded), savedDur6, 'DUR6 Rostering did not survive reloading');
const anotherHome = loadApp({ station: 'DJT6', storage: home.storage });
addRostering(anotherHome, 'DJT6 updated');
addRostering(reloaded, 'DUR6 updated');
const concurrentlySaved = JSON.parse(home.storage.get(STORAGE_KEY));
assert.strictEqual(concurrentlySaved.stations.DJT6.rostering.plans[futureDate].paycomEntries[0].name, 'DJT6 updated Driver', 'DUR6 tab overwrote a newer DJT6 Rostering import');
assert.strictEqual(concurrentlySaved.stations.DUR6.rostering.plans[futureDate].paycomEntries[0].name, 'DUR6 updated Driver', 'Future DUR6 import was written under the wrong Opening-day slice');

// Existing previews already have daily data, but no station-owned planner.
// First opening DUR6 must still preserve the one-time home-station upgrade.
const oldStore = { version: 1, stations: { DJT6: { days: { [openingDate]: { daily: {}, ui: {} } } }, DUR6: { days: { [openingDate]: { daily: {}, ui: {} } } } } };
const upgraded = loadApp({ station: 'DUR6', seed: { ...legacySeed, [STORAGE_KEY]: JSON.stringify(oldStore) } });
assert.deepStrictEqual(snapshot(upgraded).plans, {}, 'Opening an older DUR6 preview imported home-station plans');
run(upgraded, `switchOpeningStation('DJT6');`);
assert.strictEqual(snapshot(upgraded).plans[futureDate].paycomEntries[0].name, 'Legacy Home Driver', 'Home-station migration was lost when first opening DUR6');

// Starting a new Opening day must not reseed legacy state over saved plans.
const newDay = loadApp({ station: 'DJT6', date: '2099-09-09', storage: home.storage });
assert.strictEqual(snapshot(newDay).plans[futureDate].paycomEntries[0].name, 'DJT6 updated Driver', 'New Opening day overwrote saved DJT6 Rostering with stale legacy data');

console.log('Multi-station preview Rostering isolation passed (legacy upgrade, future dates, reloads, and dispatcher tabs).');
