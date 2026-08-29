const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const app = { innerHTML: '' };
const storage = new Map();
const fileListeners = new Map();
const fileInput = {
  accept: '',
  multiple: true,
  clicks: 0,
  addEventListener(name, handler) { fileListeners.set(name, handler); },
  click() { this.clicks += 1; }
};
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {},
  classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {}, style: {}, focus() {}, setSelectionRange() {}, click() {}
});
const context = {
  console,
  Intl,
  Blob,
  URL,
  TextDecoder,
  TextEncoder,
  setTimeout,
  clearTimeout,
  navigator: { clipboard: { writeText: async () => true } },
  window: { scrollTo() {} },
  localStorage: {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  document: {
    body: { appendChild() {} },
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelectorAll() { return []; },
    querySelector() { return null; },
    createElement: element
  }
};

vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
vm.runInContext(`
  render=()=>{};
  persist=()=>{};
  globalThis.__toasts=[];
  toast=(message,tone='success')=>globalThis.__toasts.push({message,tone});
  state.dspCode='LLOL';
  state.organizationName='Legacy Logistics';
  state.page='morning';
  state.morningOperationDate='2026-08-29';
  state.morningFilters={wave:'all',staging:'all',pad:'all'};
`, context);

const changeHandler = fileListeners.get('change');
assert(typeof changeHandler === 'function', 'The shared file input must bind its change handler');
assert(/<input[^>]+id="file-input"[^>]+multiple/i.test(fs.readFileSync(require.resolve('../index.html'), 'utf8')), 'The published file input must allow selecting DAYOFOPSPLAN and ROUTE_DJT6 together');

function csvFile(name, text) {
  return {
    name,
    type: 'text/csv',
    text: async () => text,
    arrayBuffer: async () => new TextEncoder().encode(text).buffer
  };
}

async function selectFiles(files) {
  const target = { files, value: 'selected-files' };
  changeHandler({ target });
  assert(target.value === '', 'The file input value must reset so the same export can be chosen again');
  // The browser event handler starts readFiles asynchronously and intentionally
  // does not return its promise. Wait for the background-reader paint and
  // compatibility path instead of assuming a fixed number of timer turns.
  for(let attempt=0;attempt<50;attempt++) {
    await new Promise(resolve => setTimeout(resolve, 0));
    if(vm.runInContext(`state.importedFile!==null&&state.importReadingFiles.length===0`, context))return;
  }
  throw new Error('The selected Morning files did not finish reading');
}

function snapshot(expression, key) {
  vm.runInContext(`globalThis.${key}=JSON.parse(JSON.stringify(${expression}));`, context);
  return context[key];
}

(async () => {
  // A stale purpose/accept from Add devices must not leak into Step 1.
  vm.runInContext(`state.importPurpose='equipment';state.importedFile={name:'old.png'};`, context);
  fileInput.accept = 'image/*,.pdf';
  vm.runInContext(`action('import',{});`, context);
  let openState = snapshot(`({modal:state.modal,purpose:state.importPurpose,importedFile:state.importedFile})`, '__openState');
  assert(openState.modal === 'import', 'Step 1 must open the Morning Sheet import modal');
  assert(openState.purpose === 'morning', 'Step 1 must replace a stale equipment import purpose');
  assert(openState.importedFile === null, 'Step 1 must clear only the old pending file preview');
  assert(vm.runInContext(`modal().includes('Choose DAYOFOPSPLAN and ROUTE_DJT6')`, context), 'The Morning Sheet modal must show the two-file instructions');

  vm.runInContext(`action('choose-file',{});`, context);
  assert(fileInput.clicks === 1, 'Choose Amazon files must open the native file picker');
  assert(fileInput.accept.includes('.csv') && fileInput.accept.includes('.xlsx'), 'Morning upload must replace stale accept types with CSV/XLSX');
  assert(!fileInput.accept.includes('image/*') && !fileInput.accept.includes('.pdf'), 'Morning upload must not retain equipment-only accept types');

  // A single DAYOFOPSPLAN is a supported partial import; route details remain optional.
  const singlePlan = csvFile('DAYOFOPSPLAN_2026-08-29.csv', [
    'DSP,Route Code,Driver Name,Wave,Staging Location,All Stops,Total Packages',
    'LLOL,CX501,Single File Driver,11:15 AM,STG.V.1,171,312'
  ].join('\n'));
  await selectFiles([singlePlan]);
  let selected = snapshot(`state.importedFile`, '__singleSelected');
  assert(selected.name === singlePlan.name && selected.kind === 'plan', 'A single DAYOFOPSPLAN selection must reach readFiles as a Morning plan');
  assert(selected.rows.length === 1 && selected.routeDetailsCount === 0, 'Single-file import must remain ready without ROUTE_DJT6 details');
  assert(vm.runInContext(`importPreflight().ready`, context), 'Single DAYOFOPSPLAN selection must pass import preflight');
  vm.runInContext(`action('apply-import',{});`, context);
  let routes = snapshot(`state.morningRoutes`, '__singleRoutes');
  assert(routes.length === 1 && routes[0].route === 'CX501', 'Applying a single DAYOFOPSPLAN must create its Morning Sheet route');
  assert(routes[0].driver === 'Single File Driver' && routes[0].stops === 171, 'Single-file plan fields must be preserved');

  // Reopen from a different stale purpose, then select both files in one chooser.
  vm.runInContext(`state.importPurpose='fleet';`, context);
  fileInput.accept = '.xlsx';
  vm.runInContext(`action('import',{});action('choose-file',{});`, context);
  assert(fileInput.clicks === 2, 'Reopening Step 1 must open the file picker again');
  assert(vm.runInContext(`state.importPurpose==='morning'`, context), 'Reopened Morning upload must replace a stale fleet purpose');
  assert(fileInput.accept.includes('.csv') && fileInput.accept.includes('.xlsx'), 'Reopened Morning upload must replace a stale fleet accept filter');

  const dayPlan = csvFile('DAYOFOPSPLAN_2026-08-29.csv', [
    'DSP,Route Code,Wave,Staging Location,All Stops,Total Packages',
    'LLOL,CX601,11:20 AM,STG.P.1,180,330',
    'OTHER,CX999,11:10 AM,STG.A.1,190,350'
  ].join('\n'));
  const routeDetails = csvFile('ROUTE_DJT6_2026-08-29.csv', [
    'Route Code,Driver Name,Stops',
    'CX601,Lorenzo Route Name,183'
  ].join('\n'));
  // Reverse the file order to ensure recognition does not depend on picker order.
  await selectFiles([routeDetails, dayPlan]);
  selected = snapshot(`state.importedFile`, '__multiSelected');
  assert(selected.name.includes('DAYOFOPSPLAN') && selected.name.includes('ROUTE_DJT6'), 'Both selected Amazon filenames must remain visible in the import preview');
  assert(selected.kind === 'plan' && selected.routeDetailsCount === 1, 'The two-file selection must join the plan with ROUTE_DJT6 details');
  assert(selected.routeDetails.CX601.driver === 'Lorenzo Route Name', 'ROUTE_DJT6 driver details must match by CX route');
  assert(vm.runInContext(`importPreflight().ready && importPreflight().included===1 && importPreflight().excluded===1 && importPreflight().matched===1`, context), 'Two-file preflight must keep LLOL, exclude the other DSP, and prove the CX match');
  vm.runInContext(`action('apply-import',{});`, context);
  routes = snapshot(`state.morningRoutes`, '__multiRoutes');
  assert(routes.length === 1 && routes[0].route === 'CX601', 'Applying DAYOFOPSPLAN + ROUTE_DJT6 must create the matched Morning Sheet route');
  assert(routes[0].driver === 'Lorenzo Route Name' && routes[0].stops === 183, 'ROUTE_DJT6 values must win for the matched driver and stop count');
  assert(routes[0].wave === '11:20 AM' && routes[0].staging === 'STG.P.1' && routes[0].packages === 330, 'DAYOFOPSPLAN values must supply wave, staging, and packages');

  console.log('Morning Sheet file-control upload contract passed (single + multiple files, stale purpose/accept reset, and apply)');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
