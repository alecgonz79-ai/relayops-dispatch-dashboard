const fs = require('fs');
const vm = require('vm');

const appSource = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const cloudSource = fs.readFileSync(require.resolve('../cloud-sync.js'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function browserHarness({ hostname = 'localhost', search = '', seed = {} } = {}) {
  const storage = new Map(Object.entries(seed).map(([key, value]) => [key, String(value)]));
  const writes = [];
  const reads = [];
  const removals = [];
  const fetches = [];
  const app = { innerHTML: '' };
  const fileInput = { accept: '', files: [], addEventListener() {}, click() {} };
  const classList = { add() {}, remove() {}, toggle() { return false; }, contains() { return false; } };
  const element = () => ({
    addEventListener() {},
    appendChild() {},
    remove() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    classList,
    dataset: {},
    setAttribute() {},
    removeAttribute() {},
    style: { setProperty() {}, removeProperty() {} },
    focus() {},
    blur() {},
    setSelectionRange() {},
    click() {},
    getBoundingClientRect() { return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }; }
  });
  const localStorage = {
    getItem(key) { reads.push(String(key)); return storage.has(String(key)) ? storage.get(String(key)) : null; },
    setItem(key, value) { writes.push(String(key)); storage.set(String(key), String(value)); },
    removeItem(key) { removals.push(String(key)); storage.delete(String(key)); }
  };
  const base = hostname === 'localhost' || hostname === '127.0.0.1' ? `http://${hostname}:4173` : `https://${hostname}`;
  const location = {
    hostname,
    search,
    href: `${base}/${search}`,
    origin: base,
    pathname: '/',
    protocol: base.startsWith('https:') ? 'https:' : 'http:',
    host: hostname
  };
  const history = {
    replaceState(_state, _title, href) {
      location.href = String(href);
      const parsed = new URL(location.href);
      location.search = parsed.search;
    }
  };
  const document = {
    body: { appendChild() {}, classList },
    documentElement: { clientWidth: 1280, clientHeight: 800, style: { setProperty() {}, removeProperty() {} } },
    activeElement: { blur() {} },
    visibilityState: 'visible',
    addEventListener() {},
    getElementById(id) { return id === 'app' ? app : id === 'file-input' ? fileInput : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement: element
  };
  const window = {
    localStorage,
    location,
    innerWidth: 1280,
    innerHeight: 800,
    scrollTo() {},
    addEventListener() {},
    removeEventListener() {},
    matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; }
  };
  const quietConsole = { log() {}, warn() {}, error() {} };
  const context = {
    console: quietConsole,
    Intl,
    Blob,
    URL,
    URLSearchParams,
    TextDecoder,
    TextEncoder,
    setTimeout,
    clearTimeout,
    navigator: { clipboard: { writeText: async () => true } },
    location,
    history,
    localStorage,
    window,
    document,
    fetch: async (url, options = {}) => {
      fetches.push({ url: String(url), options });
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify({
            ok: true,
            dryRun: true,
            version: 'relayops-morning-v1',
            build: '2026-08-03-six-wave-142-row-layout',
            waveTimes: 6,
            writeMode: 'full-replace',
            rows: 142,
            sections: 9,
            startCell: 'A3',
            writtenRange: 'A3:V144'
          });
        }
      };
    }
  };
  window.fetch = context.fetch;
  return { context, storage, writes, reads, removals, fetches };
}

function loadApp(options) {
  const harness = browserHarness(options);
  vm.createContext(harness.context);
  vm.runInContext(appSource, harness.context, { filename: 'app.js' });
  return harness;
}

async function main() {
  // The prototype is deliberately impossible to activate from a published
  // hostname, and localhost alone is not enough without the explicit flag.
  const remote = loadApp({ hostname: 'relayops.example.com', search: '?multiStationPreview=1&date=2026-08-31' });
  assert(vm.runInContext('MULTI_STATION_PREVIEW', remote.context) === false, 'Published host must ignore multiStationPreview=1');
  assert(vm.runInContext('stationWorkspaceTabs()', remote.context) === '', 'Published build must not expose the local station switcher');
  vm.runInContext(`
    render=()=>{};
    state.adminPinUnlocked=false;state.page='dashboard';state.modal=null;
    go('admin');
    globalThis.__publishedAdminGate={
      access:hasOwnerAdminAccess(),
      page:state.page,
      modal:state.modal,
      lockedPage:adminPage(),
      pinDialog:modal()
    };
  `, remote.context);
  assert(!remote.context.__publishedAdminGate.access && remote.context.__publishedAdminGate.page === 'dashboard' && remote.context.__publishedAdminGate.modal === 'admin-pin', 'Published Admin navigation must remain PIN-gated even when multiStationPreview=1 is present in the URL');
  assert(remote.context.__publishedAdminGate.lockedPage.includes('Admin PIN required') && remote.context.__publishedAdminGate.pinDialog.includes('Server-verified PIN'), 'Published Admin access must retain the server-verified PIN boundary');
  assert(cloudSource.includes("client.rpc('unlock_relayops_admin'") && cloudSource.includes("client.rpc('relayops_admin_status'") && cloudSource.includes("client.rpc('lock_relayops_admin'"), 'Published Admin PIN lifecycle must remain server-verified');
  const localWithoutFlag = loadApp({ hostname: 'localhost', search: '?date=2026-08-31' });
  assert(vm.runInContext('MULTI_STATION_PREVIEW', localWithoutFlag.context) === false, 'Localhost must require the explicit multiStationPreview=1 flag');

  const seedRoute = {
    dsp: 'LLOL',
    driver: 'DJT6 Seed Driver',
    route: 'CX600',
    service: 'Standard Parcel',
    wave: '11:15 AM',
    staging: 'STG.A.1',
    pad: '',
    padOverride: '',
    ev: '',
    deviceName: '',
    portable: '',
    stops: 100,
    packages: 200
  };
  const preview = loadApp({
    hostname: 'localhost',
    search: '?multiStationPreview=1&station=DJT6&date=2026-08-31',
    seed: {
      relayops_morning: JSON.stringify([seedRoute]),
      relayops_opening_picklist_notes: 'Legacy DJT6 seed',
      relayops_opening_picklist_wave_slots: '6',
      relayops_morning_sheets_endpoint: 'https://script.google.com/macros/s/production-djt6/exec'
    }
  });
  const { context, writes, removals, fetches, storage } = preview;
  context.__toasts = [];
  vm.runInContext(`
    toast=(message,type='success')=>{__toasts.push({message:String(message),type});};
    render=()=>{};
    renderLightweightModal=()=>{};
    yieldMorningImportPaint=async()=>{};
  `, context);

  // This single-browser planning build must not strand its owner behind a
  // forgotten production PIN. The bypass is intentionally limited to the
  // explicit localhost preview gate above; the published-host proof remains
  // locked and server verified.
  context.__adminCloudCalls = [];
  vm.runInContext(`
    window.RelayOpsCloud={
      configured:false,
      unlockAdminPin:async pin=>{__adminCloudCalls.push(['unlock',pin]);return true;},
      adminStatus:async()=>{__adminCloudCalls.push(['status']);return true;},
      lockAdmin:async()=>{__adminCloudCalls.push(['lock']);}
    };
    state.adminPinUnlocked=false;state.page='dashboard';state.modal=null;
    go('admin');
    globalThis.__localAdminAccess={
      access:hasOwnerAdminAccess(),
      page:state.page,
      modal:state.modal,
      pageHtml:localPreviewAdminPage(),
      sidebarHtml:sidebar()
    };
  `, context);
  assert(context.__localAdminAccess.access && context.__localAdminAccess.page === 'admin' && context.__localAdminAccess.modal !== 'admin-pin', 'Explicit localhost multi-station preview must open Admin controls without asking for a PIN');
  assert(context.__localAdminAccess.pageHtml.includes('data-action="save-organization"') && !context.__localAdminAccess.pageHtml.includes('Admin PIN required'), 'Local preview Admin page did not expose its controls directly');
  assert(context.__localAdminAccess.pageHtml.includes('Local preview · Admin open') && !context.__localAdminAccess.pageHtml.includes('data-action="lock-admin"'), 'Rendered local Admin page still offers a misleading PIN lock control');
  assert(!context.__localAdminAccess.sidebarHtml.includes('<b class="nav-count">🔒</b>'), 'Local preview sidebar still presents Admin as PIN-locked');
  assert(context.__adminCloudCalls.length === 0, 'Opening local preview Admin controls contacted the cloud PIN lifecycle');
  await vm.runInContext(`(async()=>{
    await lockAdminAccess();
    go('admin');
    globalThis.__localAdminAfterLockAction={access:hasOwnerAdminAccess(),page:state.page,modal:state.modal};
  })()`, context);
  assert(context.__localAdminAfterLockAction.access && context.__localAdminAfterLockAction.page === 'admin' && context.__localAdminAfterLockAction.modal !== 'admin-pin', 'A stale local Lock Admin action reintroduced the forgotten-PIN gate');
  assert(context.__adminCloudCalls.length === 0, 'A local Lock Admin action contacted the production cloud PIN lifecycle');

  assert(vm.runInContext('MULTI_STATION_PREVIEW', context) === true, 'Explicit localhost preview gate did not activate');
  assert(vm.runInContext('activeMorningStationCode()', context) === 'DJT6', 'DJT6 should remain the default station');
  const stationTabs = vm.runInContext('stationWorkspaceTabs()', context);
  assert(stationTabs.includes('role="tablist"') && stationTabs.includes('role="tab"') && stationTabs.includes('data-station="DJT6"') && stationTabs.includes('data-station="DUR6"'), 'Local preview must render accessible DJT6 and DUR6 station tabs');
  const djt6Contract = vm.runInContext(`({
    count:activeMorningWaveCount(),
    anchors:morningBlankWaveAnchors().length,
    labels:morningCoreWaveLabels().length,
    slots:state.openingPicklistWaveSlots,
    route:state.morningRoutes.find(row=>row.route==='CX600')?.route||'',
    note:state.openingPicklistNotes
  })`, context);
  assert(djt6Contract.count === 6 && djt6Contract.anchors === 6 && djt6Contract.labels === 6 && djt6Contract.slots === 6, 'DJT6 must retain its six-wave contract');
  assert(djt6Contract.route === 'CX600' && djt6Contract.note === 'Legacy DJT6 seed', 'Preview must seed DJT6 by reading the existing local workspace');

  vm.runInContext(`
    state.morningRoutes=[{...state.morningRoutes.find(row=>row.route==='CX600'),driver:'DJT6 Local Driver'}];
    state.openingPicklistNotes='DJT6 local only';
    persist();
    switchOpeningStation('DUR6');
    globalThis.__dur6Blank={
      code:activeMorningStationCode(),
      count:activeMorningWaveCount(),
      defaultTimes:[...activeMorningWaveTimes()],
      anchors:morningBlankWaveAnchors().map(row=>({blank:row._blank,pad:row.pad,padOverride:row.padOverride})),
      labels:morningCoreWaveLabels().length,
      sections:morningSections(allMorningRows()).filter(section=>section.hasTime).length,
      slots:state.openingPicklistWaveSlots,
      routes:state.morningRoutes.filter(row=>!row._blank).length,
      note:state.openingPicklistNotes,
      routeKpiBlank:morningSheetPage().includes('<i><b>0</b> routes</i>')
    };
  `, context);
  const dur6Blank = context.__dur6Blank;
  assert(dur6Blank.code === 'DUR6' && dur6Blank.count === 3 && dur6Blank.labels === 3 && dur6Blank.sections === 3 && dur6Blank.slots === 3, 'DUR6 must expose exactly three wave slots');
  assert(dur6Blank.defaultTimes.every(value => value === ''), 'DUR6 must not invent launch times before an import or manual entry');
  assert(dur6Blank.anchors.length === 3 && dur6Blank.anchors.every(row => row.blank && !row.pad && !row.padOverride), 'DUR6 blank wave rows must stay blank-capable with manual pads');
  assert(dur6Blank.routes === 0 && dur6Blank.note === '' && dur6Blank.routeKpiBlank, 'A new DUR6 day must not inherit DJT6 routes or count blank wave anchors as routes');
  const dur6SetupChecklist = vm.runInContext('morningSheetsSetupChecklist()', context);
  assert(!/Who has access:\s*Anyone with the link/i.test(dur6SetupChecklist) && /authenticated|domain-restricted|access gate/i.test(dur6SetupChecklist), 'DUR6 setup must not recommend an unauthenticated write-enabled Apps Script deployment');

  // One, two, and three unique wave imports all fit the compact DUR6 layout.
  vm.runInContext(`
    function __applyDur6WaveCount(count){
      const times=['10:15 AM','10:30 AM','10:45 AM'].slice(0,count);
      state.importedFile={
        name:'DAYOFOPSPLAN_DUR6.csv',kind:'plan',
        headers:['DSP','Route Code','Driver Name','Wave','Staging Location','Num Packages','All Stops'],
        rows:times.map((wave,index)=>['LLOL','CX70'+(index+1),'DUR6 Driver '+(index+1),wave,'STG.T.'+(index+1),String(220+index),String(110+index)])
      };
      applyImport();
      const payload=morningSheetsConnectorPayload();
      return {
        routes:state.morningRoutes.filter(row=>!row._blank).length,
        slots:state.openingPicklistWaveSlots,
        importedWaves:new Set(state.morningRoutes.filter(row=>!row._blank).map(row=>row.wave)).size,
        sectionSlots:morningSections(allMorningRows()).filter(section=>section.hasTime).length,
        stationCode:payload.stationCode,
        layoutId:payload.layoutId,
        waveSlotCount:payload.waveSlotCount,
        activeWaveCount:payload.activeWaveCount
      };
    }
    globalThis.__dur6Imports=[1,2,3].map(__applyDur6WaveCount);
    state.openingPicklistNotes='DUR6 local only';
    persist();
  `, context);
  context.__dur6Imports.forEach((result, index) => {
    const expected = index + 1;
    assert(result.routes === expected && result.slots === expected && result.importedWaves === expected, `DUR6 ${expected}-wave import did not stay within its imported wave count`);
    assert(result.sectionSlots === 3 && result.waveSlotCount === 3, `DUR6 ${expected}-wave import changed the fixed three-slot layout`);
    assert(result.stationCode === 'DUR6' && result.layoutId === 'dur6-ops-log-v1' && result.activeWaveCount === expected, `DUR6 ${expected}-wave connector metadata is not station-scoped`);
  });

  vm.runInContext(`
    state.morningFilters={wave:'10:15 AM',staging:'all',pad:'all'};
    const filteredDur6Payload=morningSheetsConnectorPayload();
    const filteredDur6Proof=morningSheetsPreflight(filteredDur6Payload);
    globalThis.__filteredDur6={writeMode:filteredDur6Payload.writeMode,sections:filteredDur6Payload.sections.map(section=>section.slotKey),activeWaveCount:filteredDur6Payload.activeWaveCount,ready:filteredDur6Proof.ready};
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
  `, context);
  assert(context.__filteredDur6.writeMode === 'full-replace' && context.__filteredDur6.sections.join(',') === 'WAVE1,WAVE2,WAVE3,ADHOCS,HELPERS', `DUR6 filters must not create a partial or missing-section Google handoff: ${JSON.stringify(context.__filteredDur6)}`);
  assert(context.__filteredDur6.activeWaveCount === 3 && context.__filteredDur6.ready, 'Filtered DUR6 view must retain the complete three-wave connector proof');

  vm.runInContext(`
    __toasts.length=0;
    const beforeBlankWave=JSON.stringify(state.morningRoutes);
    state.importedFile={
      name:'DAYOFOPSPLAN_DUR6_BLANK_WAVE.csv',kind:'plan',
      headers:['DSP','Route Code','Driver Name','Wave','Staging Location','Service Type'],
      rows:[
        ['LLOL','CX901','Driver 1','10:15 AM','STG.T.1','Standard Parcel'],
        ['LLOL','CX902','Driver 2','10:30 AM','STG.T.2','Standard Parcel'],
        ['LLOL','CX903','Driver 3','10:45 AM','STG.T.3','Standard Parcel'],
        ['LLOL','CX904','Driver 4','','STG.T.4','Standard Parcel']
      ]
    };
    const blankWaveProof=importPreflight(state.importedFile);
    applyImport();
    globalThis.__blankWave={ready:blankWaveProof.ready,missing:blankWaveProof.missing.join(' '),unchanged:beforeBlankWave===JSON.stringify(state.morningRoutes),toast:__toasts.at(-1)?.message||''};
    state.importedFile=null;
  `, context);
  assert(!context.__blankWave.ready && context.__blankWave.unchanged, 'A DUR6 route without a wave time must fail atomically before changing the sheet');
  assert(/without a wave|missing a wave/i.test(context.__blankWave.missing + ' ' + context.__blankWave.toast), 'Blank-wave DUR6 rejection must identify the missing wave time');

  // More than three regular waves must fail before replacing the current DUR6
  // day. Otherwise the fourth wave would be stored but hidden by the compact UI.
  vm.runInContext(`
    __toasts.length=0;
    const beforeFourWave=JSON.stringify(state.morningRoutes);
    state.importedFile={
      name:'DAYOFOPSPLAN_DUR6_4_WAVES.csv',kind:'plan',
      headers:['DSP','Route Code','Driver Name','Wave','Staging Location','Service Type'],
      rows:['10:15 AM','10:30 AM','10:45 AM','11:00 AM'].map((wave,index)=>['LLOL','CX80'+index,'Driver '+index,wave,'STG.T.'+(index+1),'Standard Parcel'])
    };
    const fourWaveProof=importPreflight(state.importedFile);
    applyImport();
    globalThis.__fourWave={ready:fourWaveProof.ready,missing:fourWaveProof.missing.join(' '),unchanged:beforeFourWave===JSON.stringify(state.morningRoutes),toast:__toasts.at(-1)?.message||''};
    state.importedFile=null;
  `, context);
  assert(!context.__fourWave.ready && context.__fourWave.unchanged, 'A four-wave DUR6 import must fail atomically before changing the sheet');
  assert(/1.?3|four|4|wave/i.test(context.__fourWave.missing + ' ' + context.__fourWave.toast), 'The four-wave DUR6 rejection must explain the three-wave limit');

  // An explicitly named file for the other station must be rejected before
  // parsing so it cannot replace the active station or waste workbook CPU.
  await vm.runInContext(`(async()=>{
    state.importPurpose='morning';state.importedFile=null;__toasts.length=0;
    globalThis.__parseCalls=0;
    parseUploadedFile=async file=>{__parseCalls++;return {name:file.name,rows:[['Route code','Driver name','Planned Departure Time'],['CX999','Wrong Station','10:15 AM']]};};
    const before=JSON.stringify(state.morningRoutes);
    await readFiles([{name:'Routes_DJT6_2026-08-31.xlsx',size:1024}]);
    globalThis.__wrongStation={parseCalls:__parseCalls,unchanged:before===JSON.stringify(state.morningRoutes),importedFile:state.importedFile,toast:__toasts.at(-1)?.message||''};
  })()`, context);
  assert(context.__wrongStation.parseCalls === 0, 'Wrong-station workbook should be rejected before parsing');
  assert(context.__wrongStation.unchanged && context.__wrongStation.importedFile === null, 'Wrong-station workbook changed the active DUR6 sheet');
  assert(/DJT6/i.test(context.__wrongStation.toast) && /DUR6/i.test(context.__wrongStation.toast), 'Wrong-station rejection must identify both the file station and active station');

  await vm.runInContext(`(async()=>{
    state.importPurpose='morning';state.importedFile=null;__toasts.length=0;__parseCalls=0;
    const before=JSON.stringify(state.morningRoutes);
    await readFiles([{name:'DAYOFOPSPLAN_DJT6_DUR6.csv',size:1024}]);
    globalThis.__ambiguousStation={parseCalls:__parseCalls,unchanged:before===JSON.stringify(state.morningRoutes),toast:__toasts.at(-1)?.message||''};
  })()`, context);
  assert(context.__ambiguousStation.parseCalls === 0 && context.__ambiguousStation.unchanged, 'A filename naming both stations must fail before parsing or mutation');
  assert(/both DJT6 and DUR6/i.test(context.__ambiguousStation.toast), 'Ambiguous station filename rejection must explain the conflict');

  // Switching and clearing DUR6 cannot disturb the DJT6 workspace.
  vm.runInContext(`
    switchOpeningStation('DJT6');
    globalThis.__djt6Restored={routes:state.morningRoutes.map(row=>row.route),driver:state.morningRoutes.find(row=>row.route==='CX600')?.driver||'',note:state.openingPicklistNotes,count:activeMorningWaveCount()};
    switchOpeningStation('DUR6');
    state.pendingSheetClear='morning';confirmClearOperationalSheet();
    globalThis.__dur6AfterClear={routes:state.morningRoutes.filter(row=>!row._blank).length,anchors:state.morningRoutes.filter(row=>row._blank&&row._waveAnchor).length};
    switchOpeningStation('DJT6');
    globalThis.__djt6AfterDur6Clear={routes:state.morningRoutes.map(row=>row.route),note:state.openingPicklistNotes};
  `, context);
  assert(context.__djt6Restored.routes.includes('CX600') && context.__djt6Restored.driver === 'DJT6 Local Driver' && context.__djt6Restored.note === 'DJT6 local only' && context.__djt6Restored.count === 6, 'Station switching did not restore the DJT6 slice');
  assert(context.__dur6AfterClear.routes === 0 && context.__dur6AfterClear.anchors === 3, 'Clearing DUR6 must leave exactly three blank wave anchors');
  assert(context.__djt6AfterDur6Clear.routes.includes('CX600') && context.__djt6AfterDur6Clear.note === 'DJT6 local only', 'Clearing DUR6 changed DJT6 data');

  // Each station owns a separate snapshot for every operation date.
  vm.runInContext(`
    switchOpeningStation('DUR6');
    state.openingPicklistNotes='DUR6 date A';persist();
    loadSharedOperationDate('2026-09-01');
    globalThis.__dateBInitiallyBlank=state.openingPicklistNotes===''&&state.morningRoutes.filter(row=>!row._blank).length===0;
    state.openingPicklistNotes='DUR6 date B';persist();
    loadSharedOperationDate('2026-08-31');
    globalThis.__dateARestored=state.openingPicklistNotes;
    loadSharedOperationDate('2026-09-01');
    globalThis.__dateBRestored=state.openingPicklistNotes;
    loadSharedOperationDate('2026-08-31');
    switchOpeningStation('DJT6');
    globalThis.__djt6DateAStillThere=state.morningRoutes.some(row=>row.route==='CX600')&&state.openingPicklistNotes==='DJT6 local only';
  `, context);
  assert(context.__dateBInitiallyBlank, 'A new DUR6 date inherited the previous day');
  assert(context.__dateARestored === 'DUR6 date A' && context.__dateBRestored === 'DUR6 date B', 'DUR6 date snapshots were not restored independently');
  assert(context.__djt6DateAStillThere, 'DUR6 date switching changed the DJT6 date-A snapshot');

  // Buttons and the underlying callable functions are both network-blocked.
  await vm.runInContext(`(async()=>{
    state.morningSheetsEndpoint='https://script.google.com/macros/s/must-not-send/exec';
    const calls=[
      ['sendRtsTimesToGoogleSheets',()=>sendRtsTimesToGoogleSheets()],
      ['sendWhiparoundChecksToGoogleSheets',()=>sendWhiparoundChecksToGoogleSheets()],
      ['syncFilteredMorningToSheets',()=>syncFilteredMorningToSheets()],
      ['testMorningSheetsConnector',()=>testMorningSheetsConnector()],
      ['dryRunMorningToSheets',()=>dryRunMorningToSheets()],
      ['sendMorningToSheets',()=>sendMorningToSheets()]
    ];
    globalThis.__directGoogleBlocks=[];
    for(const [name,call] of calls){
      __toasts.length=0;
      const result=await call();
      __directGoogleBlocks.push({name,result,toast:__toasts.at(-1)?.message||''});
    }
    const actionNames=['send-rts-to-sheets','send-whiparound-to-sheets','test-morning-sheets-connector','dry-run-morning-to-sheets','send-morning-to-sheets','sync-filtered-morning-to-sheets'];
    globalThis.__actionGoogleBlocks=actionNames.map(name=>{__toasts.length=0;const result=action(name,{dataset:{}});return {name,result,toast:__toasts.at(-1)?.message||''};});
  })()`, context);
  assert(fetches.length === 0, `Local multi-station preview made ${fetches.length} Google network request(s)`);
  assert(context.__directGoogleBlocks.every(item => item.result !== true && /local|disabled|prototype/i.test(item.toast)), 'At least one direct Google send function was not explicitly blocked in local preview');
  assert(context.__actionGoogleBlocks.every(item => /local|disabled|prototype/i.test(item.toast)), 'At least one Google send action was not explicitly blocked in local preview');

  const allowedPreviewKey = 'relayops_multistation_preview_v1';
  assert(writes.length > 0 && writes.every(key => key === allowedPreviewKey), `Preview wrote legacy localStorage keys: ${[...new Set(writes.filter(key => key !== allowedPreviewKey))].join(', ')}`);
  assert(removals.length === 0, `Preview removed legacy localStorage keys: ${[...new Set(removals)].join(', ')}`);
  const previewStore = JSON.parse(storage.get(allowedPreviewKey));
  assert(previewStore.stations.DJT6.days['2026-08-31'] && previewStore.stations.DUR6.days['2026-08-31'] && previewStore.stations.DUR6.days['2026-09-01'], 'Preview store is missing station/date partitions');

  // cloud-sync.js must disable itself before creating a Supabase client,
  // revision queues, timers, RPC calls, or any other RelayOpsCloud traffic.
  let createClientCalls = 0;
  const cloudLocation = { hostname: 'localhost', search: '?multiStationPreview=1', href: 'http://localhost:4173/?multiStationPreview=1' };
  const cloudStorage = { getItem() { return null; }, setItem() {}, removeItem() {} };
  const cloudContext = {
    console: { log() {}, warn() {}, error() {} },
    URL,
    URLSearchParams,
    TextEncoder,
    setTimeout,
    clearTimeout,
    location: cloudLocation,
    localStorage: cloudStorage,
    window: {
      localStorage: cloudStorage,
      RELAYOPS_CLOUD_CONFIG: {
        supabaseUrl: 'https://example.supabase.co',
        supabaseAnonKey: 'public-anon-key',
        organizationId: 'org-production',
        stationId: 'station-djt6'
      },
      supabase: { createClient() { createClientCalls++; throw new Error('Supabase client must not be created in local preview'); } },
      RelayOpsApp: {
        operationDate: () => '2026-08-31',
        sharedState: () => ({ morningRoutes: [] }),
        persistentState: () => ({}),
        applySharedState() {},
        applyPersistentState() {}
      }
    }
  };
  vm.createContext(cloudContext);
  vm.runInContext(cloudSource, cloudContext, { filename: 'cloud-sync.js' });
  assert(cloudContext.window.RelayOpsCloud.configured === false, 'RelayOpsCloud remained configured in local preview');
  const cloudInit = await cloudContext.window.RelayOpsCloud.init();
  assert(cloudInit.configured === false && createClientCalls === 0, 'RelayOpsCloud init created traffic in local preview');
  const localAdminUnlock = await cloudContext.window.RelayOpsCloud.unlockAdminPin('1234').catch(() => false);
  const localAdminStatus = await cloudContext.window.RelayOpsCloud.adminStatus();
  await cloudContext.window.RelayOpsCloud.lockAdmin();
  assert(localAdminUnlock === false && localAdminStatus === false && createClientCalls === 0, 'Local preview Admin helpers created a Supabase client or reported a server-verified session');
  assert(fetches.length === 0 && context.__adminCloudCalls.length === 0, 'Local preview created an Admin RPC or network request');

  console.log('Local DJT6/DUR6 multi-station preview safety contract passed');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
