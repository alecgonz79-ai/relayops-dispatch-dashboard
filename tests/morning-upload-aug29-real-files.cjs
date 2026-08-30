const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function exactArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

const root = path.resolve(__dirname, '..');
const planPath = process.env.RELAYOPS_AUG29_PLAN_XLSX
  || path.join(os.homedir(), 'Downloads', 'LLOL DOOP 8.29.xlsx');
const routesPath = process.env.RELAYOPS_AUG29_ROUTES_XLSX
  || path.join(os.homedir(), 'Downloads', 'Routes_DJT6_2026-08-29_23_00 (PDT).xlsx');

if (!fs.existsSync(planPath) || !fs.existsSync(routesPath)) {
  console.log('Morning Aug 29 exact-file regression skipped (set RELAYOPS_AUG29_PLAN_XLSX and RELAYOPS_AUG29_ROUTES_XLSX to run it)');
  process.exit(0);
}

const planBytes = fs.readFileSync(planPath);
const routesBytes = fs.readFileSync(routesPath);
const workerSource = fs.readFileSync(path.join(root, 'morning-import-worker.js'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

async function parseWithPublishedWorker(bytes, fileName) {
  const workerContext = {
    console,
    JSZip,
    TextDecoder,
    importScripts() {},
    self: { addEventListener() {}, postMessage() {} }
  };
  vm.createContext(workerContext);
  vm.runInContext(workerSource, workerContext, { filename: 'morning-import-worker.js' });
  const parseXlsx = vm.runInContext('parseXlsx', workerContext);
  return parseXlsx(exactArrayBuffer(bytes), fileName);
}

function fileLike(filePath, bytes) {
  return {
    name: path.basename(filePath),
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: bytes.byteLength,
    arrayBuffer: async () => exactArrayBuffer(bytes)
  };
}

function createAppContext(parsedByName) {
  const storage = new Map();
  const app = { innerHTML: '' };
  const fileInput = {
    accept: '',
    multiple: true,
    value: '',
    files: [],
    addEventListener() {},
    click() {}
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
    },
    __parsedByName: parsedByName
  };
  vm.createContext(context);
  vm.runInContext(appSource, context, { filename: 'app.js' });
  vm.runInContext(`
    render=()=>{};
    renderLightweightModal=()=>{};
    persist=()=>{};
    toast=()=>{};
    parseMorningXlsxInWorker=async(_buffer,fileName)=>globalThis.__parsedByName[fileName];
    state.dspCode='LLOL';
    state.organizationName='Legacy Logistics';
    state.page='morning';
    state.morningOperationDate='2026-08-29';
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
  `, context);
  return context;
}

function jsonValue(context, expression, name) {
  vm.runInContext(`globalThis.${name}=JSON.parse(JSON.stringify(${expression}));`, context);
  return context[name];
}

(async () => {
  const planZip = await JSZip.loadAsync(exactArrayBuffer(planBytes));
  const planSheet = planZip.file('xl/worksheets/sheet1.xml');
  const declaredPlanXmlBytes = Number(planSheet?._data?.uncompressedSize) || 0;
  assert(declaredPlanXmlBytes > 48 * 1024 * 1024,
    'The exact regression plan must retain the oversized sparse worksheet that triggered the published error');
  assert(planBytes.byteLength < 3 * 1024 * 1024,
    'The exact plan should remain a normal compressed upload rather than a genuinely huge source file');

  const planRows = await parseWithPublishedWorker(planBytes, path.basename(planPath));
  const routesRows = await parseWithPublishedWorker(routesBytes, path.basename(routesPath));

  assert(planRows.length === 44, `LLOL DOOP 8.29 must parse to one header plus 43 routes, got ${planRows.length} rows`);
  assert(routesRows.length === 44, `Routes_DJT6 must parse to one header plus 43 routes, got ${routesRows.length} rows`);
  assert(planRows[0].join('|') === 'DSP|Route Code|Service Type|Wave|Staging Location|Route Duration|Num Zones|Num Packages|Num Commercial Pkgs',
    'The oversized plan must retain its real DayOfOps header');
  assert(routesRows[0][0] === 'Route code' && routesRows[0][3] === 'Driver name' && routesRows[0][7] === 'All stops',
    'The route-details workbook must retain its Route code, Driver name, and All stops fields');

  const planCells = planRows.reduce((count, row) => count + row.length, 0);
  const routeCells = routesRows.reduce((count, row) => count + row.length, 0);
  assert(planCells === 396 && Math.max(...planRows.map(row => row.length)) === 9,
    `Sparse empty formatting must stay out of the plan result (expected 396 cells across 9 columns, got ${planCells})`);
  assert(routeCells === 748 && Math.max(...routesRows.map(row => row.length)) === 17,
    `Routes output must stay bounded to 748 cells across 17 columns, got ${routeCells}`);
  const planRouteCodes = new Set(planRows.slice(1).map(row => String(row[1] || '').trim()).filter(Boolean));
  const detailRouteCodes = new Set(routesRows.slice(1).map(row => String(row[0] || '').trim()).filter(Boolean));
  assert(planRouteCodes.size === 43 && detailRouteCodes.size === 43
    && [...planRouteCodes].every(route => detailRouteCodes.has(route)),
    'The exact workbooks must retain the same complete set of 43 CX route codes');

  const parsedByName = {
    [path.basename(planPath)]: planRows,
    [path.basename(routesPath)]: routesRows
  };
  const context = createAppContext(parsedByName);
  context.__planRows = planRows;
  context.__routesRows = routesRows;
  const roles = jsonValue(context, `({
    plan:morningParsedFileRole({name:${JSON.stringify(path.basename(planPath))},rows:globalThis.__planRows}),
    routes:morningParsedFileRole({name:${JSON.stringify(path.basename(routesPath))},rows:globalThis.__routesRows})
  })`, '__aug29Roles');
  assert(roles.plan === 'plan', 'The exact LLOL DOOP filename must classify as a plan from its DayOfOps columns');
  assert(roles.routes === 'routes', 'The exact plural Routes_DJT6 filename must classify as route details');

  vm.runInContext(`action('import',{});`, context);
  await context.readFiles([
    fileLike(planPath, planBytes),
    fileLike(routesPath, routesBytes)
  ]);

  const imported = jsonValue(context, 'state.importedFile', '__aug29Imported');
  const proof = jsonValue(context, 'importPreflight()', '__aug29Proof');
  assert(imported.kind === 'plan', 'The combined exact-file import must keep the DOOP workbook as the primary plan');
  assert(imported.rows.length === 43, `The combined import must expose 43 LLOL route rows, got ${imported.rows.length}`);
  assert(imported.routeDetailsCount === 43, `The combined import must expose 43 route-detail rows, got ${imported.routeDetailsCount}`);
  assert(proof.ready && proof.included === 43 && proof.excluded === 0 && proof.matched === 43,
    `The exact pair must be ready with 43 included, 0 excluded, and 43 matched routes; got ${JSON.stringify(proof)}`);
  assert(imported.routeDetails.CX123?.driver === 'Lorenzo Ball',
    'The exact route-details import must keep Lorenzo Ball as the first assigned driver');
  assert(imported.routeDetails.CX123?.stops === 173,
    'The exact route-details import must retain CX123 stop count');

  vm.runInContext('applyImport()', context);
  const morningRoutes = jsonValue(context, 'state.morningRoutes', '__aug29MorningRoutes');
  assert(morningRoutes.length === 43, `Applying the exact pair must create 43 Morning Sheet routes, got ${morningRoutes.length}`);
  assert(morningRoutes.every(route => route.driver && route.driver !== 'Unassigned driver'),
    'All 43 exact-file CX matches must supply a driver');
  const lorenzo = morningRoutes.find(route => route.route === 'CX123');
  assert(lorenzo?.driver === 'Lorenzo Ball' && lorenzo?.stops === 173,
    'Morning Sheet application must keep Lorenzo Ball as the first driver and 173 stops on CX123');

  assert(/MAX_IMPORT_ROWS\s*=\s*20000/.test(workerSource) && /MAX_IMPORT_CELLS\s*=\s*250000/.test(workerSource),
    'The exact-file compatibility fix must preserve worker row and cell safety ceilings');
  assert(/MAX_XML_TOTAL_BYTES/.test(workerSource),
    'The exact-file compatibility fix must preserve a total expanded-workbook safety ceiling');
  assert(/MORNING_IMPORT_MAX_ROWS\s*=\s*20000/.test(appSource) && /MORNING_IMPORT_MAX_CELLS\s*=\s*250000/.test(appSource),
    'The exact-file compatibility fix must preserve main-thread result ceilings');

  console.log(`Morning Aug 29 exact-file regression passed (${declaredPlanXmlBytes.toLocaleString()} sparse XML bytes -> 44 bounded plan rows; 43/43 CX matches)`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
