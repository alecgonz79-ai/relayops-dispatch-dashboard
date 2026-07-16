const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) { if (!condition) throw new Error(message); }

const app = { innerHTML: '' };
const fileInput = { addEventListener() {}, click() {}, accept: '' };
const storage = new Map();
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, JSZip, setTimeout, clearTimeout,
  navigator: { clipboard: { writeText: async () => true } },
  location: { href: 'https://relayops.example.test/' },
  window: { scrollTo() {}, open() {}, print() {}, addEventListener() {}, RelayOpsCloud: null },
  localStorage: {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  },
  document: {
    body: { appendChild() {} }, activeElement: null,
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelector() { return null; }, querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {}, execCommand() { return true; },
    createElement() { return { addEventListener() {}, appendChild() {}, remove() {}, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {}, dataset: {}, focus() {}, setSelectionRange() {} }; }
  }
};
context.window.document = context.document;
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
vm.runInContext(`
  toast=()=>{};persist=()=>{};
  state.driverContacts=[{name:'Angelique Danielle Murray',key:'angelique danielle murray',phone:'(840) 241-8056',role:'Delivery Associate'}];
  state.morningRoutes=[{dsp:'LLOL',driver:'Angelique Danielle Murray',route:'CX244',wave:'11:15 AM',staging:'STG.V.7',ev:'EV1'}];
  rivianFleet.splice(0,rivianFleet.length,{name:'EV1',vin:'7FCEHEB79PN014816',plate:'Y149598',active:'Active',operational:'Operational',battery:99,miles:155});
  state.search='angelique';globalThis.__driver=globalSearchResults();globalThis.__driverHtml=globalSearchHtml();
  state.search='CX244';globalThis.__route=globalSearchResults();
  state.search='Y149598';globalThis.__vehicle=globalSearchResults();
  state.page='dashboard';state.search='EV1';action('open-global-search-result',{dataset:{searchPage:'fleet',searchValue:'EV1'}});globalThis.__navigation={page:state.page,filter:state.fleetFilter,search:state.fleetSearch};
  state.routes=[{route:'CX244',driver:'Angelique Danielle Murray',id:'DA-1',wave:'Wave 1 · 11:15 AM',staging:'V.7',van:'EV1',device:'1',stops:188,packages:332,progress:50,delta:2,status:'On pace',rescue:'—'}];
  action('route',{dataset:{route:'CX244'}});globalThis.__routeModal=modal();
  globalThis.__routeReport=namedReportDataset('Route progress');
  globalThis.__fleetReport=namedReportDataset('Fleet readiness');
`, context);

assert(context.__driver.some(row => row.type === 'Driver' && row.title.includes('Angelique')), 'Driver name search did not return Drivers & Team');
assert(context.__driverHtml.includes('global-search-results') && context.__driverHtml.includes('open-global-search-result'), 'Search dropdown is not actionable');
assert(context.__route.some(row => row.type === 'Route' && row.title === 'CX244'), 'CX route search did not return Morning Sheet');
assert(context.__vehicle.some(row => row.type === 'Vehicle' && row.detail.includes('Y149598')), 'Plate search did not return Fleet Health');
assert(context.__navigation.page === 'fleet' && context.__navigation.filter === 'all' && context.__navigation.search === 'EV1', 'Selecting a vehicle result did not open a filtered Fleet Health view');
assert(context.__routeModal.includes('ROUTE DETAILS') && context.__routeModal.includes('Copy summary') && context.__routeModal.includes('CX244'), 'Dashboard route action did not open usable details');
assert(context.__routeReport.rows.length === 1 && context.__routeReport.rows[0][0] === 'CX244', 'Route Progress report is not dataset-specific');
assert(context.__fleetReport.rows.length === 1 && context.__fleetReport.rows[0][1] === '7FCEHEB79PN014816' && context.__fleetReport.rows[0][2] === 'Y149598', 'Fleet Readiness report is not dataset-specific');

console.log('Cross-dashboard search, route detail, and named report datasets passed');
