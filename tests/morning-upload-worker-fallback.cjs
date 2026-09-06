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

function withDeadline(promise, label, milliseconds = 12000) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${label} did not finish within ${milliseconds} ms`)), milliseconds);
    })
  ]).finally(() => clearTimeout(timer));
}

const root = path.resolve(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const serviceWorkerSource = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const planPath = process.env.RELAYOPS_AUG29_PLAN_XLSX
  || path.join(os.homedir(), 'Downloads', 'LLOL DOOP 8.29.xlsx');
const routesPath = process.env.RELAYOPS_AUG29_ROUTES_XLSX
  || path.join(os.homedir(), 'Downloads', 'Routes_DJT6_2026-08-29_23_00 (PDT).xlsx');

if (!fs.existsSync(planPath) || !fs.existsSync(routesPath)) {
  console.log('Morning worker-fallback exact-file regression skipped (set RELAYOPS_AUG29_PLAN_XLSX and RELAYOPS_AUG29_ROUTES_XLSX to run it)');
  process.exit(0);
}

const planBytes = fs.readFileSync(planPath);
const routesBytes = fs.readFileSync(routesPath);

function makeFile(filePath, bytes) {
  return {
    name: path.basename(filePath),
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: bytes.byteLength,
    arrayBuffer: async () => exactArrayBuffer(bytes)
  };
}

function createFailingWorker(mode, stats) {
  return class FailingMorningWorker {
    constructor(url) {
      stats.constructors++;
      stats.urls.push(String(url));
      this.listeners = { message: [], error: [] };
      if (mode === 'startup') throw new Error('Morning worker construction was blocked');
    }

    addEventListener(type, listener) {
      if (this.listeners[type]) this.listeners[type].push(listener);
    }

    postMessage(message, transfer = []) {
      stats.posts++;
      // Match real Worker transfer semantics: when production transfers the
      // selected ArrayBuffer, the sender's buffer is detached immediately.
      // A working fallback therefore has to preserve a bounded retry copy (or
      // deliberately avoid transferring the only copy).
      const workerMessage = transfer.length
        ? structuredClone(message, { transfer })
        : structuredClone(message);
      setTimeout(() => {
        if (mode === 'load') {
          this.listeners.error.forEach(listener => listener({
            message: 'Failed to load morning-import-worker.js'
          }));
          return;
        }
        this.listeners.message.forEach(listener => listener({
          data: {
            type: 'error',
            id: workerMessage.id,
            message: 'The background Excel reader failed while opening this workbook'
          }
        }));
      }, 0);
    }

    terminate() {
      stats.terminations++;
    }
  };
}

function createAppContext(workerMode) {
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
  const stats = {
    constructors: 0,
    posts: 0,
    terminations: 0,
    urls: [],
    directParses: 0,
    persists: 0,
    cloudWrites: 0,
    applyCalls: 0,
    toasts: []
  };
  const Worker = createFailingWorker(workerMode, stats);
  const context = {
    console: { ...console, error() {} },
    Intl,
    Blob,
    URL,
    JSZip,
    Worker,
    TextDecoder,
    TextEncoder,
    structuredClone,
    setTimeout,
    clearTimeout,
    requestAnimationFrame: callback => setTimeout(callback, 0),
    navigator: { clipboard: { writeText: async () => true } },
    window: {
      location: { href: 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/' },
      scrollTo() {},
      addEventListener() {}
    },
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    fetch: async () => {
      stats.cloudWrites++;
      throw new Error('Morning preview must not call the network');
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
    __stats: stats
  };
  vm.createContext(context);
  vm.runInContext(appSource, context, { filename: 'app.js' });
  vm.runInContext(`
    globalThis.__realDirectMorningParser=parseXlsxArrayBuffer;
    parseXlsxArrayBuffer=async(...args)=>{
      globalThis.__stats.directParses++;
      return globalThis.__realDirectMorningParser(...args);
    };
    render=()=>{};
    renderLightweightModal=()=>{};
    persist=()=>{globalThis.__stats.persists++;};
    toast=(message,tone='success')=>{globalThis.__stats.toasts.push({message:String(message),tone});};
    globalThis.__realApplyImport=applyImport;
    applyImport=(...args)=>{globalThis.__stats.applyCalls++;return globalThis.__realApplyImport(...args);};
    state.dspCode='LLOL';
    state.organizationName='Legacy Logistics';
    state.page='morning';
    state.modal='import';
    state.importPurpose='morning';
    state.morningOperationDate='2026-08-29';
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
  `, context);
  return context;
}

function jsonValue(context, expression, name) {
  vm.runInContext(`globalThis.${name}=JSON.parse(JSON.stringify(${expression}));`, context);
  return context[name];
}

async function verifyExactPairFallback(mode) {
  const context = createAppContext(mode);
  await withDeadline(context.readFiles([
    makeFile(planPath, planBytes),
    makeFile(routesPath, routesBytes)
  ]), `${mode} worker fallback`);

  const imported = jsonValue(context, 'state.importedFile', `__${mode}Imported`);
  const proof = jsonValue(context, 'importPreflight()', `__${mode}Proof`);
  const stats = context.__stats;

  assert(imported && imported.kind === 'plan', `${mode}: a failed worker must still produce the safe Morning plan preview`);
  assert(imported.rows.length === 43 && imported.routeDetailsCount === 43,
    `${mode}: the exact pair must preview all 43 plan and 43 route-detail rows after fallback`);
  assert(proof.ready && proof.included === 43 && proof.excluded === 0 && proof.matched === 43,
    `${mode}: fallback preview must remain ready with 43/43 CX matches; got ${JSON.stringify(proof)}`);
  assert(imported.routeDetails.CX123?.driver === 'Lorenzo Ball' && imported.routeDetails.CX123?.stops === 173,
    `${mode}: fallback preview must retain the real CX123 driver and stop values`);

  assert(stats.directParses === 2,
    `${mode}: each of the two workbooks must use exactly one bounded main-thread fallback, got ${stats.directParses}`);
  assert(stats.constructors <= 2 && stats.posts <= 2,
    `${mode}: a failed background reader must not create an unbounded retry loop (${stats.constructors} constructors, ${stats.posts} posts)`);
  assert(stats.persists === 0 && stats.applyCalls === 0 && stats.cloudWrites === 0,
    `${mode}: preview fallback must not persist, apply, or send cloud writes`);
  assert(!stats.toasts.some(entry => entry.tone === 'error'),
    `${mode}: a successful safe fallback must not show the generic read error`);

  const counts = [stats.constructors, stats.posts, stats.directParses];
  await new Promise(resolve => setTimeout(resolve, 25));
  assert(counts[0] === stats.constructors && counts[1] === stats.posts && counts[2] === stats.directParses,
    `${mode}: worker/fallback activity continued after the preview completed`);
}

async function verifyPreciseFailureDiagnostic() {
  const context = createAppContext('runtime');
  vm.runInContext(`
    parseXlsxArrayBuffer=async()=>{
      globalThis.__stats.directParses++;
      throw new Error('ZIP central directory is corrupt');
    };
  `, context);
  const corruptBytes = Buffer.from('not an xlsx workbook');
  await withDeadline(context.readFiles([makeFile('/tmp/DAYOFOPSPLAN_corrupt.xlsx', corruptBytes)]), 'worker + fallback diagnostic');

  const stats = context.__stats;
  const errorToast = [...stats.toasts].reverse().find(entry => entry.tone === 'error');
  assert(errorToast, 'A worker and fallback failure must show an error diagnostic');
  assert(errorToast.message !== 'These files could not be read. Choose DAYOFOPSPLAN and Routes_DJT6 as CSV or XLSX, then try again.',
    'The final diagnostic must not collapse the underlying reader failure into the generic screenshot message');
  assert(/background|reader|worker|zip|corrupt|safe fallback/i.test(errorToast.message),
    `The final diagnostic must identify the actual worker/fallback problem, got: ${errorToast.message}`);
  assert(stats.posts === 1 && stats.directParses === 1,
    `A terminal read failure must attempt the worker once and the bounded fallback once (${stats.posts} worker, ${stats.directParses} fallback)`);
  assert(stats.persists === 0 && stats.applyCalls === 0 && stats.cloudWrites === 0,
    'A terminal Morning read failure must not persist, apply, or send cloud writes');
}

async function verifyNoFallbackForTerminalWorkerErrors() {
  const cases = [
    {
      label: 'selection cancellation',
      message: 'The Morning import was closed or replaced.',
      shouldContinue: true
    },
    {
      label: 'selection-token cancellation',
      message: 'The background Excel reader could not start',
      shouldContinue: false
    },
    {
      label: 'worker timeout',
      message: 'This Excel file took too long to read. Export it again or use CSV, then retry.',
      shouldContinue: true
    },
    {
      label: 'worksheet size guard',
      message: 'This workbook sheet is too large for a safe browser import. Export it as CSV and retry.',
      shouldContinue: true
    },
    {
      label: 'row/cell safety guard',
      message: 'This workbook has too many rows or cells for a safe browser import. Split the export and retry.',
      shouldContinue: true
    }
  ];

  for (const testCase of cases) {
    const context = createAppContext('startup');
    let fallbackFileReads = 0;
    context.__terminalMessage = testCase.message;
    vm.runInContext(`
      parseMorningXlsxInWorker=async()=>{throw new Error(globalThis.__terminalMessage);};
    `, context);
    const file = {
      name: 'DAYOFOPSPLAN_guard.xlsx',
      size: 16,
      arrayBuffer: async () => {
        fallbackFileReads++;
        return new ArrayBuffer(16);
      }
    };
    let caught;
    try {
      await withDeadline(
        context.parseMorningXlsxWithFallback(file, new ArrayBuffer(16), () => testCase.shouldContinue),
        `${testCase.label} classification`,
        2000
      );
    } catch (error) {
      caught = error;
    }
    assert(caught && caught.message === testCase.message,
      `${testCase.label}: the original terminal error must be returned without a compatibility retry`);
    assert(context.__stats.directParses === 0 && fallbackFileReads === 0,
      `${testCase.label}: cancellation, timeout, and safety errors must not trigger the main-thread fallback`);
  }
}

function createServiceWorkerContext({ status = 200, networkError = null } = {}) {
  const handlers = {};
  const stats = { fetches: [], puts: [], matches: [] };
  const context = {
    console,
    URL,
    Request,
    Response,
    location: { origin: 'https://alecgonz79-ai.github.io' },
    Error,
    Promise,
    self: {
      addEventListener(type, handler) { handlers[type] = handler; },
      skipWaiting: async () => {},
      clients: { claim: async () => {} }
    },
    fetch: async request => {
      stats.fetches.push(request.url);
      if (networkError) throw networkError;
      return new Response(`network ${status}`, { status });
    },
    caches: {
      open: async () => ({
        addAll: async () => {},
        put: async (request, response) => {
          stats.puts.push({ url: request.url, status: response.status });
        }
      }),
      keys: async () => [],
      delete: async () => true,
      match: async (request, options = {}) => {
        stats.matches.push({ url: request.url, options: { ...options } });
        return new Response('cached exact asset', { status: 200 });
      }
    },
    __handlers: handlers,
    __stats: stats
  };
  vm.createContext(context);
  vm.runInContext(serviceWorkerSource, context, { filename: 'service-worker.js' });
  return context;
}

async function dispatchServiceWorkerAsset(context, url) {
  let responsePromise;
  const request = new Request(url);
  context.__handlers.fetch({
    request,
    respondWith(promise) { responsePromise = Promise.resolve(promise); }
  });
  assert(responsePromise, `The service worker did not handle ${url}`);
  const response = await responsePromise;
  // cache.put is intentionally fire-and-forget in the production worker.
  await new Promise(resolve => setTimeout(resolve, 0));
  return response;
}

async function verifyServiceWorkerAssetHardening() {
  const appAsset = 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/app.js?v=20260906-rostering-ridealong-r1';
  const cssAsset = 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/styles.css?v=20260816-storage-recovery-r1';

  for (const [label, url, status] of [['JavaScript', appAsset, 503], ['CSS', cssAsset, 404]]) {
    const context = createServiceWorkerContext({ status });
    const response = await dispatchServiceWorkerAsset(context, url);
    assert(await response.text() === 'cached exact asset',
      `${label}: a non-OK network response must fall back to the cached asset`);
    assert(context.__stats.puts.length === 0,
      `${label}: a ${status} response must never replace a working cached asset`);
    assert(context.__stats.matches.length === 1,
      `${label}: a failed refresh must make one bounded cache fallback lookup`);
  }

  const exactContext = createServiceWorkerContext({ networkError: new Error('offline') });
  await dispatchServiceWorkerAsset(exactContext, appAsset);
  assert(exactContext.__stats.matches.length === 1
    && exactContext.__stats.matches[0].url === appAsset
    && exactContext.__stats.matches[0].options.ignoreSearch === false,
  'Versioned JavaScript fallback must retain the exact r4 query instead of matching an older query with ignoreSearch');

  const healthyContext = createServiceWorkerContext({ status: 200 });
  const healthyResponse = await dispatchServiceWorkerAsset(healthyContext, appAsset);
  assert(await healthyResponse.text() === 'network 200' && healthyContext.__stats.puts.length === 1,
    'A successful JavaScript refresh must return and cache the verified OK response');
  assert(healthyContext.__stats.puts[0].url === appAsset && healthyContext.__stats.puts[0].status === 200,
    'The service worker must cache the exact versioned URL only after response.ok');

  const version = '20260906-rostering-ridealong-r1';
  assert(new RegExp(`morning-import-worker\\.js\\?v=${version}`).test(appSource),
    'app.js must start the Ride Along release Morning import worker');
  assert(new RegExp(`app\\.js\\?v=${version}`).test(indexSource)
    && new RegExp(`service-worker\\.js\\?v=${version}`).test(indexSource),
  'index.html must load the Ride Along app and register its service worker together');
  assert(/const CACHE='relayops-rostering-ridealong-v114'/.test(serviceWorkerSource)
    && new RegExp(`app\\.js\\?v=${version}`).test(serviceWorkerSource)
    && new RegExp(`morning-import-worker\\.js\\?v=${version}`).test(serviceWorkerSource),
  'cache v114 must precache the matching Ride Along app and Morning worker assets');
}

(async () => {
  await verifyExactPairFallback('startup');
  await verifyExactPairFallback('load');
  await verifyExactPairFallback('runtime');
  await verifyPreciseFailureDiagnostic();
  await verifyNoFallbackForTerminalWorkerErrors();
  await verifyServiceWorkerAssetHardening();

  assert(/XLSX_IMPORT_MAX_WORKSHEET_BYTES\s*=\s*64\s*\*\s*1024\s*\*\s*1024/.test(appSource)
    && /XLSX_IMPORT_MAX_XML_TOTAL_BYTES\s*=\s*128\s*\*\s*1024\s*\*\s*1024/.test(appSource)
    && /XLSX_IMPORT_MAX_ROW_XML_BYTES\s*=\s*2\s*\*\s*1024\s*\*\s*1024/.test(appSource),
  'The main-thread worker fallback must retain worksheet, expanded-workbook, and per-row safety ceilings');
  assert(/internalStream\(['"]string['"]\)/.test(appSource),
    'The main-thread fallback must stream worksheet XML instead of inflating the sparse sheet into one giant string');

  console.log('Morning worker recovery regression passed (exact 43/43 preview; bounded fallback; terminal guards; zero writes; precise diagnostic; ridealong v114 cache hardening)');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
