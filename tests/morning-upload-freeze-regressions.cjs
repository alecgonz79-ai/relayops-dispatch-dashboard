const fs = require('fs');
const path = require('path');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = path.resolve(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const serviceWorkerSource = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const storage = new Map();
const fileInputListeners = new Map();
const app = { innerHTML: '' };
const fileInput = {
  accept: '',
  multiple: true,
  clicks: 0,
  addEventListener(name, handler) { fileInputListeners.set(name, handler); },
  click() { this.clicks += 1; }
};
const element = () => ({
  addEventListener() {},
  appendChild() {},
  remove() {},
  classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {},
  style: {},
  focus() {},
  setSelectionRange() {},
  click() {}
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
  window: { scrollTo() {}, addEventListener() {} },
  localStorage: {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  },
  document: {
    body: { appendChild() {} },
    documentElement: { contains() { return true; } },
    activeElement: null,
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement: element,
    addEventListener() {},
    removeEventListener() {}
  }
};

vm.createContext(context);
vm.runInContext(appSource, context, { filename: 'app.js' });
vm.runInContext(`
  render=()=>{};
  renderLightweightModal=()=>{};
  persist=()=>{};
  toast=()=>{};
  state.dspCode='LLOL';
  state.organizationName='Legacy Logistics';
  state.page='morning';
  state.morningOperationDate='2026-08-29';
  state.morningFilters={wave:'all',staging:'all',pad:'all'};
`, context);

const sparseWorksheetXml = [
  '<worksheet><sheetData>',
  '<row r="1">',
  '<c r="A1" t="inlineStr"><is><t>Route Code</t></is></c>',
  '<c r="C1" t="inlineStr"><is><t>Wave</t></is></c>',
  // Real Amazon workbooks can contain a styled-but-empty cell at Excel's
  // last possible column. Assigning it before checking the value balloons a
  // two-cell row to 16,384 entries and can freeze Chrome while parsing.
  '<c r="XFD1" s="42"></c>',
  '</row>',
  '<row r="2">',
  '<c r="A2" t="inlineStr"><is><t>CX701</t></is></c>',
  '<c r="AA2" t="inlineStr"><is><t>meaningful-under-cap</t></is></c>',
  '<c r="XFD2" s="42"></c>',
  '</row>',
  '</sheetData></worksheet>'
].join('');

function assertSparseWorksheetParser(parse, label) {
  const rows = parse(sparseWorksheetXml, []);
  assert(rows.length === 2, `${label}: meaningful worksheet rows must still parse`);
  assert(rows[0][0] === 'Route Code' && rows[0][2] === 'Wave', `${label}: meaningful cells and their column positions must be preserved`);
  assert(rows[0].length === 3, `${label}: a styled blank XFD cell must not expand the header row to 16,384 columns`);
  assert(rows[1][0] === 'CX701' && rows[1][26] === 'meaningful-under-cap', `${label}: meaningful columns within the parser cap must remain available`);
  assert(rows[1].length === 27, `${label}: the row must end at its last meaningful column, not styled blank XFD`);
}

assertSparseWorksheetParser(context.parseWorksheetXml, 'main XLSX parser');

function csvFile(name, body, textOverride) {
  return {
    name,
    type: 'text/csv',
    text: textOverride || (async () => body),
    arrayBuffer: async () => new TextEncoder().encode(await (textOverride?textOverride():body)).buffer
  };
}

function value(expression, key) {
  vm.runInContext(`globalThis.${key}=JSON.parse(JSON.stringify(${expression}));`, context);
  return context[key];
}

const planCsv = [
  'DSP,Route Code,Wave,Staging Location,Total Packages',
  'LLOL,CX701,11:20 AM,STG.A.1,301'
].join('\n');
// This deliberately includes Planned Departure Time, so header sniffing alone
// would mistake the real Amazon Routes_DJT6 export for a plan. The plural
// filename must win and keep it in the route-details role.
const routesCsv = [
  'Route code,DSP,Driver name,Planned Departure Time,All stops,Total deliveries',
  'CX701,Legacy Logistics,Lorenzo Route Name,11:20 AM,179,301'
].join('\n');

async function assertSequentialPair(order, label) {
  vm.runInContext(`action('import',{});`, context);
  for (const file of order) await context.readFiles([file]);
  const selected = value('state.importedFile', `__selected_${label}`);
  assert(selected.kind === 'plan', `${label}: the completed pair must keep DAYOFOPSPLAN as the primary plan`);
  assert(selected.name.includes('DAYOFOPSPLAN') && selected.name.includes('Routes_DJT6'), `${label}: filenames selected one at a time must accumulate in the preview`);
  assert(selected.headers.some(header => /staging/i.test(header)), `${label}: Routes_DJT6 must not overwrite the plan headers`);
  assert(selected.rows.length === 1 && selected.rows[0].includes('STG.A.1'), `${label}: the DAYOFOPSPLAN route row must remain primary`);
  assert(selected.routeDetailsCount === 1, `${label}: the plural Routes_DJT6 file must classify as route details`);
  assert(selected.routeDetails.CX701?.driver === 'Lorenzo Route Name', `${label}: the accumulated route details must preserve the Amazon driver name`);
  assert(selected.routeDetails.CX701?.stops === 179, `${label}: the accumulated route details must preserve All stops`);
}

(async () => {
  const plan = csvFile('DAYOFOPSPLAN_2026-08-29.csv', planCsv);
  const routes = csvFile('Routes_DJT6_2026-08-29.csv', routesCsv);

  // Browsers may stop requestAnimationFrame in a hidden tab. The paint yield
  // must still settle quickly so returning from the file chooser cannot leave
  // dispatchers stuck at Step 1.
  context.requestAnimationFrame = () => 0;
  const hiddenPaintStarted = Date.now();
  await context.yieldMorningImportPaint();
  assert(Date.now() - hiddenPaintStarted < 300, 'Hidden-tab animation throttling must not stall the Morning importer');
  delete context.requestAnimationFrame;

  // Even when both files are selected in one picker, only one file reader may
  // run at a time. This caps peak ZIP/string memory on dispatcher laptops.
  vm.runInContext(`action('import',{});`, context);
  let releaseFirst, secondStarted = false;
  const firstText = new Promise(resolve => { releaseFirst = () => resolve(planCsv); });
  const orderedRead = context.readFiles([
    csvFile('DAYOFOPSPLAN_ORDERED.csv', '', () => firstText),
    csvFile('Routes_DJT6_ORDERED.csv', routesCsv, async () => { secondStarted = true; return routesCsv; })
  ]);
  await new Promise(resolve => setTimeout(resolve, 0));
  await new Promise(resolve => setTimeout(resolve, 0));
  assert(!secondStarted, 'The second Amazon file must not start parsing while the first file is unresolved');
  releaseFirst();
  await orderedRead;
  assert(secondStarted, 'The second Amazon file must parse after the first one finishes');

  await assertSequentialPair([plan, routes], 'plan_then_routes');
  await assertSequentialPair([routes, plan], 'routes_then_plan');

  // A corrupt or unrelated first choice must not remain in the module-local
  // batch and poison every later retry. Dispatchers should be able to choose
  // the correct pair immediately without closing and reopening the modal.
  vm.runInContext(`action('import',{});`, context);
  await context.readFiles([csvFile('unrelated_export.csv', 'not,a,morning,file')]);
  await context.readFiles([plan, routes]);
  const afterBadRetry = value('state.importedFile', '__afterBadRetry');
  assert(afterBadRetry.name.includes('DAYOFOPSPLAN') && afterBadRetry.name.includes('Routes_DJT6') && afterBadRetry.routeDetailsCount === 1, 'A failed Morning selection must be discarded so the next valid pair succeeds');

  // Closing Step 1 must invalidate the module-local raw-file accumulator even
  // if the next session is opened by another UI path.
  await assertSequentialPair([plan, routes], 'before_close');
  vm.runInContext(`action('close-modal',{});state.modal='import';state.importPurpose='morning';state.importedFile=null;`, context);
  await context.readFiles([csvFile('DAYOFOPSPLAN_AFTER_CLOSE.csv', planCsv.replace('CX701', 'CX703'))]);
  const afterClose = value('state.importedFile', '__afterClose');
  assert(afterClose.name === 'DAYOFOPSPLAN_AFTER_CLOSE.csv' && !afterClose.routeDetailsCount, 'Closing the import modal must clear pending Amazon raw files');

  // Successfully creating the sheet is also a terminal boundary. Pending raw
  // files from that import may not leak into a later upload session.
  await assertSequentialPair([plan, routes], 'before_apply');
  vm.runInContext(`action('apply-import',{});state.modal='import';state.importPurpose='morning';state.importedFile=null;`, context);
  await context.readFiles([csvFile('DAYOFOPSPLAN_AFTER_APPLY.csv', planCsv.replace('CX701', 'CX704'))]);
  const afterApply = value('state.importedFile', '__afterApply');
  assert(afterApply.name === 'DAYOFOPSPLAN_AFTER_APPLY.csv' && !afterApply.routeDetailsCount, 'Applying a Morning import must clear pending Amazon raw files');

  // Starting a fresh Step 1 session must discard the previous raw-file pair.
  vm.runInContext(`action('import',{});`, context);
  await context.readFiles([csvFile('DAYOFOPSPLAN_FRESH.csv', planCsv.replace('CX701', 'CX702'))]);
  const fresh = value('state.importedFile', '__fresh');
  assert(fresh.name === 'DAYOFOPSPLAN_FRESH.csv', 'A fresh Morning import must not retain filenames from the prior pair');
  assert(!fresh.routeDetailsCount, 'A fresh Morning import must not retain route details from the prior pair');

  // Keep one parse unresolved, then finish a newer selection first. The old
  // completion must be ignored instead of overwriting the dispatcher’s latest
  // choice or clearing its reading indicator.
  vm.runInContext(`action('import',{});`, context);
  let releaseSlow;
  const slowText = new Promise(resolve => { releaseSlow = () => resolve(planCsv.replace('CX701', 'CX801')); });
  const slow = csvFile('DAYOFOPSPLAN_STALE.csv', '', () => slowText);
  const slowRead = context.readFiles([slow]);
  await Promise.resolve();
  const reading = value('state.importReadingFiles', '__reading');
  assert(Array.isArray(reading) && reading.includes('DAYOFOPSPLAN_STALE.csv'), 'The modal must expose the selected filename while the browser is reading it');
  const busyModal = vm.runInContext('modal()', context);
  assert(/read(?:ing)?|prepar(?:e|ing)/i.test(busyModal) && busyModal.includes('DAYOFOPSPLAN_STALE.csv'), 'The Morning modal must show a visible reading state and filename');

  const fast = csvFile('DAYOFOPSPLAN_LATEST.csv', planCsv.replace('CX701', 'CX802'));
  await context.readFiles([fast]);
  let latest = value('state.importedFile', '__latestBeforeStale');
  assert(latest.name === 'DAYOFOPSPLAN_LATEST.csv' && latest.rows[0].includes('CX802'), 'The newest completed file must become the active Morning import');
  releaseSlow();
  await slowRead;
  latest = value('state.importedFile', '__latestAfterStale');
  assert(latest.name === 'DAYOFOPSPLAN_LATEST.csv' && latest.rows[0].includes('CX802'), 'A stale async completion must never replace the newest Morning import');
  assert(value('state.importReadingFiles', '__idle').length === 0, 'The reading indicator must clear after the active operation completes');

  vm.runInContext(`action('import',{});`, context);
  let releaseOlder, releaseNewer;
  const olderText = new Promise(resolve => { releaseOlder = () => resolve(planCsv.replace('CX701', 'CX811')); });
  const newerText = new Promise(resolve => { releaseNewer = () => resolve(planCsv.replace('CX701', 'CX812')); });
  const olderRead = context.readFiles([csvFile('DAYOFOPSPLAN_OLDER.csv', '', () => olderText)]);
  await Promise.resolve();
  const newerRead = context.readFiles([csvFile('DAYOFOPSPLAN_NEWER.csv', '', () => newerText)]);
  await Promise.resolve();
  releaseOlder();
  await olderRead;
  const stillReadingNewer = value('state.importReadingFiles', '__stillReadingNewer');
  assert(stillReadingNewer.length === 1 && stillReadingNewer[0] === 'DAYOFOPSPLAN_NEWER.csv', 'A stale completion must not clear the active newer selection’s reading indicator');
  releaseNewer();
  await newerRead;
  assert(value('state.importedFile', '__newerAfterOlder').name === 'DAYOFOPSPLAN_NEWER.csv', 'The newer delayed selection must finish normally after the older selection is discarded');

  // Closing while Chrome is still reading a File from disk must prevent the
  // stale continuation from starting a hidden worker job after the modal has
  // gone away.
  vm.runInContext(`
    globalThis.__workerStarts=0;
    parseMorningXlsxInWorker=async()=>{globalThis.__workerStarts++;return [['DSP','Route Code','Wave','Staging Location'],['LLOL','CX901','11:20 AM','STG.A.1']];};
    action('import',{});
  `, context);
  let releaseArrayBuffer;
  const delayedBuffer = new Promise(resolve => { releaseArrayBuffer = () => resolve(new ArrayBuffer(8)); });
  const delayedXlsx = {name:'DAYOFOPSPLAN_DELAYED.xlsx',type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',size:8,arrayBuffer:()=>delayedBuffer};
  const delayedRead = context.readFiles([delayedXlsx]);
  await Promise.resolve();
  vm.runInContext(`action('close-modal',{});`, context);
  releaseArrayBuffer();
  await delayedRead;
  assert(context.__workerStarts === 0, 'A closed Morning import must not start a worker after a delayed file.arrayBuffer resolves');
  assert(value('state.importedFile', '__closedImportFile') === null, 'Closing the Morning import must release its temporary parsed rows');

  // Keep the proven native chooser path. The production screenshot shows that
  // Chrome opens the picker; the freeze happens only after selection begins.
  vm.runInContext(`action('import',{});`, context);
  vm.runInContext(`action('choose-file',{});`, context);
  assert(fileInput.clicks > 0, 'Choose Amazon files must continue opening the browser’s native file picker');
  assert(fileInput.accept.includes('.csv') && fileInput.accept.includes('.xlsx'), 'The Morning chooser must continue accepting CSV and XLSX exports');
  assert(typeof fileInputListeners.get('change') === 'function', 'The native chooser must remain wired to read selected files');

  // Worker assertions are conditional because the safety design retains a
  // main-thread fallback for older browsers. If the worker ships, all of its
  // deployment/cache wiring must ship with it.
  const workerPath = path.join(root, 'morning-import-worker.js');
  if (fs.existsSync(workerPath)) {
    const workerSource = fs.readFileSync(workerPath, 'utf8');
    assert(/function\s+parseMorningXlsxInWorker|parseMorningXlsxInWorker\s*=/.test(appSource), 'Morning XLSX worker helper is missing from app.js');
    assert(/new\s+Worker\s*\([^)]*morning-import-worker\.js/.test(appSource), 'Morning XLSX parsing must construct the static worker');
    assert(/parseMorningFileInWorker\(buffer,fileName,'parse-xlsx'\)/.test(appSource), 'The main thread must send the parse-xlsx worker request');
    assert(/parse-xlsx/.test(workerSource) && /parse-csv/.test(workerSource) && /postMessage/.test(workerSource), 'The Morning worker must receive XLSX and CSV parsing work and post a result');
    assert(/type\s*:\s*['"]result['"]/.test(workerSource) && /type\s*:\s*['"]error['"]/.test(workerSource), 'The Morning worker must return explicit result and error messages');
    assert(/MAX_XML_ENTRY_BYTES/.test(workerSource) && /MAX_XML_TOTAL_BYTES/.test(workerSource), 'The worker must cap individual and total expanded worksheet XML memory');
    assert(/MORNING_IMPORT_MAX_FILE_BYTES/.test(appSource) && /MORNING_IMPORT_WORKER_TIMEOUT_MS/.test(appSource), 'The main thread must cap Morning file size and abandon stalled worker jobs');
    assert(/MORNING_IMPORT_MAX_ROWS/.test(appSource) && /MORNING_IMPORT_MAX_CELLS/.test(appSource) && /MAX_IMPORT_ROWS/.test(workerSource) && /MAX_IMPORT_CELLS/.test(workerSource), 'Main and worker parsers must cap returned Morning rows and cells');
    assert(/morning-import-worker\.js/.test(serviceWorkerSource), 'The offline service worker must cache the Morning XLSX worker');
    const workerContext = {
      console,
      TextDecoder,
      importScripts() {},
      self: { addEventListener() {}, postMessage() {} }
    };
    vm.createContext(workerContext);
    vm.runInContext(workerSource, workerContext, { filename: 'morning-import-worker.js' });
    const workerParser = vm.runInContext('typeof parseWorksheetXml === "function" ? parseWorksheetXml : null', workerContext);
    assert(typeof workerParser === 'function', 'The worker must use a directly testable bounded worksheet parser');
    assertSparseWorksheetParser(workerParser, 'worker XLSX parser');
  }

  assert(/<input\b[^>]*id=["']file-input["'][^>]*\bmultiple\b/i.test(indexSource), 'The shared fallback file input must preserve multiple-file selection');
  console.log('Morning upload freeze regressions passed (bounded XLSX rows, sequential pair, plural Routes, stale async guard, reading UI, native chooser, worker wiring)');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
