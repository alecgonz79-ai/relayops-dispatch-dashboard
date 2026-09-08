const fs = require('fs');
const vm = require('vm');

const appSource = fs.readFileSync(require.resolve('../app.js'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function browserHarness({ hostname = 'localhost', search = '', seed = {}, sharedStorage = null } = {}) {
  const storage = sharedStorage || new Map(Object.entries(seed).map(([key, value]) => [key, String(value)]));
  const writes = [];
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
    select() {},
    setSelectionRange() {},
    click() {},
    getBoundingClientRect() { return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }; }
  });
  const localStorage = {
    getItem(key) { return storage.has(String(key)) ? storage.get(String(key)) : null; },
    setItem(key, value) { writes.push(String(key)); storage.set(String(key), String(value)); },
    removeItem(key) { storage.delete(String(key)); }
  };
  const base = ['localhost', '127.0.0.1'].includes(hostname) ? `http://${hostname}:4173` : `https://${hostname}`;
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
      location.search = new URL(location.href).search;
    }
  };
  const document = {
    body: { appendChild() {}, classList },
    documentElement: { clientWidth: 1280, clientHeight: 800, style: { setProperty() {}, removeProperty() {} }, contains() { return true; } },
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
    scrollX: 0,
    scrollY: 0,
    scrollTo() {},
    addEventListener() {},
    removeEventListener() {},
    matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; }
  };
  const context = {
    console: { log() {}, warn() {}, error() {} },
    Intl,
    Blob,
    URL,
    URLSearchParams,
    TextDecoder,
    TextEncoder,
    setTimeout,
    clearTimeout,
    navigator: { clipboard: { writeText: async () => true, readText: async () => '' } },
    crypto: { randomUUID: (() => { let index = 0; return () => `test-uuid-${++index}`; })() },
    location,
    history,
    localStorage,
    window,
    document,
    fetch: async () => { throw new Error('This isolation test must never contact a network'); }
  };
  window.fetch = context.fetch;
  return { context, storage, writes };
}

function loadApp(options) {
  const harness = browserHarness(options);
  vm.createContext(harness.context);
  vm.runInContext(appSource, harness.context, { filename: 'app.js' });
  harness.context.__toasts = [];
  vm.runInContext(`
    toast=(message,type='success')=>{__toasts.push({message:String(message),type});};
    render=()=>{};
    renderLightweightModal=()=>{};
    yieldMorningImportPaint=async()=>{};
  `, harness.context);
  return harness;
}

function activeEquipmentSnapshot(context) {
  return vm.runInContext(`({
    station:activeMorningStationCode(),
    date:state.morningOperationDate,
    importName:state.equipmentImport?.name||'',
    details:JSON.parse(JSON.stringify(state.equipmentImport?.details||{})),
    custom:JSON.parse(JSON.stringify(state.deviceCustomRows||{})),
    removed:[...(state.removedDeviceVehicleIds||[])],
    issues:JSON.parse(JSON.stringify(state.equipmentIssues||{})),
    endpoint:String(state.morningSheetsEndpoint||''),
    receipt:JSON.parse(JSON.stringify(state.morningSheetsLastReceipt||null)),
    routes:state.morningRoutes.filter(row=>!row._blank).map(row=>({route:row.route,ev:row.ev,deviceName:row.deviceName,portable:row.portable,stationCode:row.stationCode}))
  })`, context);
}

function addStationEquipment(context, {
  station,
  route,
  ev,
  device,
  portable,
  customLabel,
  customDevice,
  customPortable,
  issueText,
  endpoint,
  receiptId
}) {
  context.__fixture = { station, route, ev, device, portable, customLabel, customDevice, customPortable, issueText, endpoint, receiptId };
  vm.runInContext(`(()=>{
    const __f=__fixture;
    state.morningRoutes=[{
      routeUid:__f.station+'-'+__f.route,stationCode:__f.station,dsp:state.dspCode,
      driver:__f.station+' Driver',route:__f.route,service:'Standard Parcel',wave:__f.station==='DJT6'?'11:15 AM':'10:15 AM',
      staging:'STG.1',pad:'',padOverride:'',ev:__f.ev,deviceName:'',portable:'',stops:100,packages:200
    }];
    state.equipmentImport={name:__f.station+' equipment.csv',details:{
      [normalizeEquipmentId(__f.ev)]:{device:__f.device,portable:__f.portable},
      [normalizeEquipmentId(__f.customLabel)]:{device:__f.customDevice,portable:__f.customPortable}
    }};
    state.deviceCustomRows={ev:[{uid:__f.station+'-custom',label:__f.customLabel,device:__f.customDevice,portable:__f.customPortable,source:'manual'}],gas:[],helper:[]};
    state.removedDeviceVehicleIds=[__f.station+'-REMOVED'];
    const __issueKey=equipmentIssueKey('device',__f.device);
    state.equipmentIssues={
      [__issueKey]:{type:'device',equipmentId:__f.device,label:'Device '+__f.device,active:[{id:__f.station+'-issue',text:__f.issueText,severity:'high',createdAt:'2026-08-31T12:00:00.000Z',status:'active'}],history:[]}
    };
    state.morningSheetsEndpoint=__f.endpoint;
    state.morningSheetsLastReceipt={id:__f.receiptId,stationCode:__f.station,operationDate:state.morningOperationDate,status:'confirmed'};
    inputDeviceSheetToMorning();
    persist();
  })()`, context);
  delete context.__fixture;
}

async function settleDeferredSetup(context, resolverName, attempts = 20) {
  for (let index = 0; index < attempts; index++) {
    if (context[resolverName]) return;
    await new Promise(resolve => setImmediate(resolve));
  }
  throw new Error(`Deferred parser did not expose ${resolverName}`);
}

async function main() {
  const failures = [];
  const check = async (label, fn) => {
    try { await fn(); }
    catch (error) { failures.push(`${label}: ${error.message}`); }
  };

  const preview = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  const { context } = preview;

  await check('Device page station tabs and identity', () => {
    vm.runInContext(`state.page='live';globalThis.__devicePage=pageContent('live');`, context);
    const html = context.__devicePage;
    assert(html.includes('role="tablist"') && html.includes('aria-label="Station workspace"'), 'Device and Portable page is missing its accessible station tablist');
    assert((html.match(/role="tab"/g) || []).length === 2, 'Device and Portable page must expose exactly the DJT6 and DUR6 tabs');
    assert(html.includes('data-station="DJT6"') && html.includes('data-station="DUR6"'), 'Device and Portable page is missing a station choice');
    assert(html.includes('role="tabpanel"') && html.includes('aria-labelledby="station-tab-djt6"'), 'Device and Portable content is not associated with its selected station tab');
    assert(html.includes('data-opening-station="djt6"') && html.includes('Working in DJT6 · Home station'), 'DJT6 Device and Portable page does not show a clear active-station identity');
  });

  addStationEquipment(context, {
    station: 'DJT6', route: 'CX101', ev: 'EV1', device: '101', portable: 'P1',
    customLabel: 'DJT6 RENTAL', customDevice: '102', customPortable: 'P2',
    issueText: 'DJT6 cracked screen', endpoint: 'https://script.google.com/macros/s/djt6-private/exec', receiptId: 'djt6-receipt'
  });
  const djt6Payload = vm.runInContext('morningSheetsConnectorPayload()', context);
  const djt6 = activeEquipmentSnapshot(context);

  vm.runInContext(`switchOpeningStation('DUR6');state.page='live';globalThis.__dur6DevicePage=pageContent('live');`, context);
  await check('Blank DUR6 equipment slice and identity', () => {
    const blank = activeEquipmentSnapshot(context);
    assert(blank.station === 'DUR6', 'Station switch did not enter DUR6');
    assert(!blank.importName && Object.keys(blank.details).length === 0, 'DUR6 inherited the DJT6 equipment import');
    assert(Object.values(blank.custom).every(rows => rows.length === 0), 'DUR6 inherited DJT6 custom Device and Portable rows');
    assert(blank.removed.length === 0, 'DUR6 inherited DJT6 removed-vehicle choices');
    assert(Object.keys(blank.issues).length === 0, 'DUR6 inherited DJT6 device/portable issues');
    assert(!blank.endpoint && blank.receipt === null, 'DUR6 fell back to the DJT6 Google connector or receipt');
    assert(context.__dur6DevicePage.includes('data-opening-station="dur6"') && context.__dur6DevicePage.includes('Working in DUR6 · Temecula'), 'DUR6 Device and Portable page does not clearly identify Temecula');
    assert(context.__dur6DevicePage.includes('aria-labelledby="station-tab-dur6"'), 'DUR6 Device content is not associated with the DUR6 tab');
  });

  addStationEquipment(context, {
    station: 'DUR6', route: 'CX701', ev: 'EV7', device: '201', portable: 'T1',
    customLabel: 'DUR6 RENTAL', customDevice: '202', customPortable: 'T2',
    issueText: 'DUR6 battery fault', endpoint: 'https://script.google.com/macros/s/dur6-private/exec', receiptId: 'dur6-receipt'
  });
  const dur6Payload = vm.runInContext('morningSheetsConnectorPayload()', context);
  const dur6 = activeEquipmentSnapshot(context);

  await check('Station-specific assignments, rows, and issues', () => {
    assert(djt6.routes.length === 1 && djt6.routes[0].deviceName === '101' && djt6.routes[0].portable === 'P1', 'DJT6 Device and Portable assignments did not apply by EV');
    assert(dur6.routes.length === 1 && dur6.routes[0].deviceName === '201' && dur6.routes[0].portable === 'T1', 'DUR6 Device and Portable assignments did not apply by EV');
    assert(!Object.prototype.hasOwnProperty.call(dur6.details, '1') && !Object.prototype.hasOwnProperty.call(djt6.details, '7'), 'Equipment assignments crossed station boundaries');
    assert(djt6.custom.ev[0]?.label === 'DJT6 RENTAL' && dur6.custom.ev[0]?.label === 'DUR6 RENTAL', 'Custom vehicle rows were not distinct per station');
    assert(Object.keys(djt6.issues).join(',') === 'device:101' && Object.keys(dur6.issues).join(',') === 'device:201', 'Device issue history was not distinct per station');
  });

  await check('Shared Google spreadsheet with separate station endpoint, receipt, template, and date tabs', () => {
    const sharedSpreadsheetId='1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ';
    assert(djt6.endpoint.includes('/djt6-private/') && djt6.receipt?.stationCode === 'DJT6', 'DJT6 connector state is missing or mislabeled');
    assert(dur6.endpoint.includes('/dur6-private/') && dur6.receipt?.stationCode === 'DUR6', 'DUR6 connector state is missing or mislabeled');
    assert(djt6.endpoint !== dur6.endpoint && djt6.receipt.id !== dur6.receipt.id, 'The two stations share a Google endpoint or receipt');
    assert(djt6Payload.stationCode === 'DJT6' && djt6Payload.layoutId === 'djt6-ops-log-2026' && djt6Payload.templateSheet === 'OPS LOG 2026', 'DJT6 payload lost its existing Ops Log contract');
    assert(dur6Payload.stationCode === 'DUR6' && dur6Payload.layoutId === 'dur6-ops-log-v1' && dur6Payload.templateSheet === 'OPS LOG DUR6', 'DUR6 payload is not bound to its own Ops Log template');
    assert(djt6Payload.workbookKey === 'DJT6_OPS_LOG' && dur6Payload.workbookKey === 'DUR6_OPS_LOG', 'Google payloads do not carry separate station destination namespaces');
    assert(dur6Payload.spreadsheetId === sharedSpreadsheetId, 'DUR6 payload does not bind its destination to the shared DJT6/DUR6 spreadsheet');
    assert(djt6Payload.sheetName === '8/31/26' && djt6Payload.sheetNameCandidates.join('|') === '8/31/26|8.31.26', 'DJT6 existing unprefixed dated-tab routing changed');
    assert(dur6Payload.sheetNameCandidates.length === 2 && dur6Payload.sheetNameCandidates.includes('DUR6 8.31.26') && dur6Payload.sheetNameCandidates.includes('DUR6 8/31/26'), 'DUR6 dated targets are missing their station prefix');
    assert(dur6Payload.sheetNameCandidates.includes(dur6Payload.sheetName), 'DUR6 default target is not a valid station-prefixed dated tab');
    context.__dur6PayloadForIdentity = dur6Payload;
    const validResponse={...dur6Payload,spreadsheetId:sharedSpreadsheetId,sheet:dur6Payload.sheetName,targetSheet:dur6Payload.sheetName};
    const verify=(response,payload=dur6Payload,options={})=>{
      context.__responseForIdentity=response;context.__dur6PayloadForIdentity=payload;context.__identityOptions=options;
      return vm.runInContext(`verifyMorningWorkbookIdentity(__responseForIdentity,__dur6PayloadForIdentity,__identityOptions)`,context);
    };
    assert(verify(validResponse) === true, 'Frontend rejected a matching DUR6 response in the shared spreadsheet');
    for(const sheetName of dur6Payload.sheetNameCandidates) {
      assert(verify({...validResponse,sheet:sheetName,targetSheet:sheetName}) === true, `Frontend rejected the DUR6 date-tab format ${sheetName}`);
      assert(verify({...validResponse,sheet:sheetName,targetSheet:undefined}) === true, 'Frontend rejected a valid sheet-only receipt');
      assert(verify({...validResponse,sheet:undefined,targetSheet:sheetName}) === true, 'Frontend rejected a valid targetSheet-only receipt');
    }
    const badResponses=[
      ['missing spreadsheet ID',{spreadsheetId:undefined}],['another spreadsheet',{spreadsheetId:'other-spreadsheet'}],
      ['missing template',{templateSheet:undefined}],['DJT6 template',{templateSheet:'OPS LOG 2026'}],
      ['missing station',{stationCode:undefined}],['DJT6 station',{stationCode:'DJT6'}],
      ['missing destination namespace',{workbookKey:undefined}],['DJT6 destination namespace',{workbookKey:'DJT6_OPS_LOG'}],
      ['unprefixed DJT6 slash date',{sheet:'8/31/26',targetSheet:'8/31/26'}],
      ['unprefixed DJT6 dot date',{sheet:'8.31.26',targetSheet:'8.31.26'}],
      ['DUR6 master template',{sheet:'OPS LOG DUR6',targetSheet:'OPS LOG DUR6'}],
      ['DJT6 master template',{sheet:'OPS LOG 2026',targetSheet:'OPS LOG 2026'}],
      ['another operation date',{sheet:'DUR6 9.1.26',targetSheet:'DUR6 9.1.26'}],
      ['missing written target',{sheet:undefined,targetSheet:undefined}],
      ['conflicting station targets',{sheet:dur6Payload.sheetName,targetSheet:'8/31/26'}],
      ['conflicting dated-tab names',{sheet:'DUR6 8.31.26',targetSheet:'DUR6 8/31/26'}]
    ];
    for(const [label,fields] of badResponses) {
      let rejected=false;try{verify({...validResponse,...fields});}catch(error){rejected=Boolean(error.relayOpsConfirmed);}
      assert(rejected,`Frontend accepted a DUR6 receipt with ${label}`);
    }
    assert(verify({...validResponse,sheet:undefined,targetSheet:undefined},dur6Payload,{checkTarget:false}) === true, 'Matching connector status should validate without a written date target');
    assert(verify({},djt6Payload) === true, 'Frontend rejected a legacy DJT6 connector response that omits DUR6-only identity fields');
    delete context.__responseForIdentity;delete context.__identityOptions;
    delete context.__dur6PayloadForIdentity;
    assert(`${djt6Payload.layoutId}|${djt6Payload.templateSheet}` !== `${dur6Payload.layoutId}|${dur6Payload.templateSheet}`, 'Google payloads do not carry distinct station/template identities');
    assert(djt6Payload.connectorBuild !== dur6Payload.connectorBuild, 'Google payloads fell back to the same connector build');
    vm.runInContext(`switchOpeningStation('DJT6');globalThis.__djt6Template=activeMorningTemplateUrl();switchOpeningStation('DUR6');globalThis.__dur6Template=activeMorningTemplateUrl();`, context);
    const djt6TemplateUrl=new URL(context.__djt6Template),dur6TemplateUrl=new URL(context.__dur6Template);
    assert(djt6TemplateUrl.pathname.includes(`/d/${sharedSpreadsheetId}/`) && dur6TemplateUrl.pathname.includes(`/d/${sharedSpreadsheetId}/`), 'Station template links do not share the configured physical spreadsheet');
    assert(dur6TemplateUrl.searchParams.get('gid') === '1876715045', 'DUR6 template link does not open the observed OPS LOG DUR6 tab');
    assert(djt6TemplateUrl.searchParams.get('gid') !== dur6TemplateUrl.searchParams.get('gid'), 'DUR6 template link opens the DJT6 template tab');
  });

  await check('Station dated-tab routing accepts only real operation dates', () => {
    const dates=loadApp({hostname:'localhost',search:'?multiStationPreview=1&station=DUR6&date=2026-09-01'});
    const dur6Names=vm.runInContext(`operationDateTabNames('2026-09-01')`,dates.context);
    assert(dur6Names.length === 2 && dur6Names.includes('DUR6 9.1.26') && dur6Names.includes('DUR6 9/1/26'), 'September 1 did not produce both DUR6-prefixed date targets');
    for(const date of ['', '2026-09', '9/1/2026', '2026-13-01', '2026-02-30', '2026-00-01', '2026-09-00', '2026-09-31']) {
      dates.context.__invalidDate=date;
      assert(vm.runInContext(`operationDateTabNames(__invalidDate).length`,dates.context) === 0, `Invalid date ${JSON.stringify(date)} produced a Google target tab`);
    }
    vm.runInContext(`switchOpeningStation('DJT6');`,dates.context);
    assert(vm.runInContext(`operationDateTabNames('2026-09-01').join('|')`,dates.context) === '9/1/26|9.1.26', 'DJT6 September 1 date targets changed');
  });

  await check('Station restore after round trip', () => {
    vm.runInContext(`switchOpeningStation('DJT6');`, context);
    const restoredDjt6 = activeEquipmentSnapshot(context);
    assert(restoredDjt6.details['1']?.device === '101' && !restoredDjt6.details['7'], `Returning to DJT6 did not restore only DJT6 assignments: ${JSON.stringify(restoredDjt6.details)}`);
    assert(restoredDjt6.custom.ev[0]?.label === 'DJT6 RENTAL', 'Returning to DJT6 did not restore its custom row');
    assert(Object.keys(restoredDjt6.issues).join(',') === 'device:101', 'Returning to DJT6 restored another station’s issues');
    assert(restoredDjt6.endpoint.includes('/djt6-private/') && restoredDjt6.receipt?.id === 'djt6-receipt', 'Returning to DJT6 did not restore its connector and receipt');
    assert(restoredDjt6.routes[0]?.stationCode === 'DJT6' && restoredDjt6.routes[0]?.deviceName === '101', 'DJT6 route equipment or station identity changed during the round trip');
  });

  const actualImports = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('Completed equipment file imports remain in their starting station', async () => {
    vm.runInContext(`
      parseUploadedFile=async file=>String(file.name).includes('DUR6')
        ? {name:file.name,rows:[['VAN','DEVICE','PORTABLE'],['EV7','271','T7']],text:''}
        : {name:file.name,rows:[['VAN','DEVICE','PORTABLE'],['EV1','171','P7']],text:''};
    `, actualImports.context);
    await vm.runInContext(`readEquipmentFiles([{name:'DJT6_device_portable.csv',type:'text/csv',size:90}])`, actualImports.context);
    let imported = activeEquipmentSnapshot(actualImports.context);
    assert(imported.details['1']?.device === '171' && imported.details['1']?.portable === 'P7', 'DJT6 file import did not save its own equipment rows');
    vm.runInContext(`switchOpeningStation('DUR6');`, actualImports.context);
    assert(Object.keys(activeEquipmentSnapshot(actualImports.context).details).length === 0, 'Opening DUR6 exposed the completed DJT6 file import');
    await vm.runInContext(`readEquipmentFiles([{name:'DUR6_device_portable.csv',type:'text/csv',size:90}])`, actualImports.context);
    imported = activeEquipmentSnapshot(actualImports.context);
    assert(imported.details['7']?.device === '271' && imported.details['7']?.portable === 'T7' && !imported.details['1'], 'DUR6 file import mixed with DJT6 rows');
    vm.runInContext(`switchOpeningStation('DJT6');`, actualImports.context);
    imported = activeEquipmentSnapshot(actualImports.context);
    assert(imported.details['1']?.device === '171' && !imported.details['7'], 'Returning to DJT6 did not restore only its completed file import');
  });

  await check('Per-date equipment isolation within a station', () => {
    vm.runInContext(`loadSharedOperationDate('2026-09-01');`, context);
    const nextDay = activeEquipmentSnapshot(context);
    assert(nextDay.date === '2026-09-01' && !nextDay.importName && Object.keys(nextDay.details).length === 0, 'A new DJT6 date inherited the prior day equipment import');
    assert(Object.values(nextDay.custom).every(rows => rows.length === 0) && nextDay.removed.length === 0, 'A new DJT6 date inherited custom/removed rows');
    assert(Object.keys(nextDay.issues).join(',') === 'device:101', 'DJT6 issue history should persist within DJT6 across operation dates');
    vm.runInContext(`loadSharedOperationDate('2026-08-31');`, context);
    const restored = activeEquipmentSnapshot(context);
    assert(restored.details['1']?.device === '101' && restored.custom.ev[0]?.label === 'DJT6 RENTAL', 'Returning to the original date did not restore its Device and Portable work');
  });

  const asyncEquipment = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('Stale async equipment import cannot commit after station switch', async () => {
    vm.runInContext(`
      globalThis.__resolveEquipmentParse=null;
      parseUploadedFile=()=>new Promise(resolve=>{__resolveEquipmentParse=()=>resolve({name:'DJT6_devices.csv',rows:[['VAN','DEVICE','PORTABLE'],['EV1','311','P9']],text:''});});
      state.importPurpose='equipment';
      globalThis.__equipmentRead=readEquipmentFiles([{name:'DJT6_devices.csv',type:'text/csv',size:80}]);
    `, asyncEquipment.context);
    await settleDeferredSetup(asyncEquipment.context, '__resolveEquipmentParse');
    vm.runInContext(`switchOpeningStation('DUR6');__resolveEquipmentParse();`, asyncEquipment.context);
    await asyncEquipment.context.__equipmentRead;
    let target = activeEquipmentSnapshot(asyncEquipment.context);
    assert(target.station === 'DUR6' && !target.importName && Object.keys(target.details).length === 0, 'A DJT6 equipment parser committed into DUR6 after the switch');
    assert(vm.runInContext('state.importedFile===null', asyncEquipment.context), 'A stale equipment parser became a DUR6 Morning import');
    vm.runInContext(`switchOpeningStation('DJT6');`, asyncEquipment.context);
    const source = activeEquipmentSnapshot(asyncEquipment.context);
    assert(!source.importName && Object.keys(source.details).length === 0, 'A stale DJT6 equipment parser committed after its workspace was left');
  });

  const outOfOrderEquipment = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('Older DJT6 equipment result cannot contaminate a newer DUR6 equipment import', async () => {
    vm.runInContext(`
      parseUploadedFile=file=>new Promise(resolve=>{const done=()=>resolve(String(file.name).includes('DUR6')
        ? {name:file.name,rows:[['VAN','DEVICE','PORTABLE'],['EV7','707','T7']],text:''}
        : {name:file.name,rows:[['VAN','DEVICE','PORTABLE'],['EV1','101','P1']],text:''});if(String(file.name).includes('DUR6'))globalThis.__resolveNewDur6=done;else globalThis.__resolveOldDjt6=done;});
      state.modal='equipment';state.importPurpose='equipment';
      globalThis.__oldDjt6Read=readEquipmentFiles([{name:'DJT6_devices.csv',type:'text/csv',size:80}]);
    `, outOfOrderEquipment.context);
    await settleDeferredSetup(outOfOrderEquipment.context, '__resolveOldDjt6');
    vm.runInContext(`switchOpeningStation('DUR6');state.modal='equipment';state.importPurpose='equipment';globalThis.__newDur6Read=readEquipmentFiles([{name:'DUR6_devices.csv',type:'text/csv',size:80}]);`, outOfOrderEquipment.context);
    await settleDeferredSetup(outOfOrderEquipment.context, '__resolveNewDur6');
    vm.runInContext(`__resolveNewDur6();`, outOfOrderEquipment.context);
    await outOfOrderEquipment.context.__newDur6Read;
    vm.runInContext(`__resolveOldDjt6();`, outOfOrderEquipment.context);
    await outOfOrderEquipment.context.__oldDjt6Read;
    const target = activeEquipmentSnapshot(outOfOrderEquipment.context);
    assert(target.station === 'DUR6' && target.details['7']?.device === '707' && !target.details['1'], `Old DJT6 equipment contaminated the newer DUR6 import: ${JSON.stringify(target.details)}`);
    vm.runInContext(`switchOpeningStation('DJT6');`, outOfOrderEquipment.context);
    assert(Object.keys(activeEquipmentSnapshot(outOfOrderEquipment.context).details).length === 0, 'Cancelled DJT6 equipment result was committed after leaving the station');
  });

  const supersededOcr = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('A newer equipment selection terminates the superseded OCR worker', async () => {
    vm.runInContext(`
      globalThis.__oldOcrTerminateCount=0;
      globalThis.__parseStartedAfterOcrStop=false;
      activeEquipmentOcrWorker={terminate:async()=>{__oldOcrTerminateCount++;}};
      parseUploadedFile=async file=>{__parseStartedAfterOcrStop=__oldOcrTerminateCount===1;return {name:file.name,rows:[['VAN','DEVICE','PORTABLE'],['EV2','202','P2']],text:''};};
      state.modal='equipment';state.importPurpose='equipment';
      globalThis.__replacementRead=readEquipmentFiles([{name:'DJT6_replacement_devices.csv',type:'text/csv',size:80}]);
    `, supersededOcr.context);
    await supersededOcr.context.__replacementRead;
    assert(supersededOcr.context.__oldOcrTerminateCount === 1, 'The older Tesseract worker kept running after a newer equipment selection');
    assert(supersededOcr.context.__parseStartedAfterOcrStop === true, 'The replacement import started before the older OCR worker stopped');
    assert(vm.runInContext(`activeEquipmentOcrWorker===null`, supersededOcr.context), 'The superseded OCR worker remained tracked after replacement');
    assert(activeEquipmentSnapshot(supersededOcr.context).details['2']?.device === '202', 'The replacement equipment import did not complete after OCR cancellation');
  });

  const overlappingReplacement = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('An older replacement waiting on OCR shutdown cannot cancel a newer import', async () => {
    vm.runInContext(`
      globalThis.__releaseOldOcr=null;globalThis.__resolveNewMorning=null;
      activeEquipmentOcrWorker={terminate:()=>new Promise(resolve=>{__releaseOldOcr=resolve;})};
      parseUploadedFile=file=>new Promise(resolve=>{__resolveNewMorning=()=>resolve({name:file.name,rows:[['DSP','Route Code','Driver Name','Wave','Staging Location'],['LLOL','CX505','Newer Morning Driver','11:15 AM','STG.5']],text:''});});
      state.importPurpose='equipment';
      globalThis.__waitingReplacement=readFiles([{name:'DJT6_replacement_devices.csv',type:'text/csv',size:80}]);
    `, overlappingReplacement.context);
    await settleDeferredSetup(overlappingReplacement.context, '__releaseOldOcr');
    vm.runInContext(`state.importPurpose='morning';state.modal='import';globalThis.__newerMorningRead=readFiles([{name:'DAYOFOPSPLAN_DJT6.csv',type:'text/csv',size:120}]);`, overlappingReplacement.context);
    await settleDeferredSetup(overlappingReplacement.context, '__resolveNewMorning');
    assert(vm.runInContext(`state.importReadingFiles.includes('DAYOFOPSPLAN_DJT6.csv')`, overlappingReplacement.context), 'The newer Morning import did not enter its reading state');
    vm.runInContext(`__releaseOldOcr();`, overlappingReplacement.context);
    await overlappingReplacement.context.__waitingReplacement;
    assert(vm.runInContext(`state.importReadingFiles.includes('DAYOFOPSPLAN_DJT6.csv')`, overlappingReplacement.context), 'The older replacement cleared the newer import reading state after OCR shutdown');
    vm.runInContext(`__resolveNewMorning();`, overlappingReplacement.context);
    await overlappingReplacement.context.__newerMorningRead;
    assert(vm.runInContext(`state.importedFile?.name==='DAYOFOPSPLAN_DJT6.csv'`, overlappingReplacement.context), 'The newer Morning import was cancelled by the older replacement');
  });

  const clipboardReplacement = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('Clipboard equipment import terminates superseded screenshot OCR', async () => {
    clipboardReplacement.context.navigator.clipboard.readText = async () => 'VAN\tDEVICE\tPORTABLE\nEV3\t303\tP3';
    vm.runInContext(`
      globalThis.__clipboardOcrStops=0;
      activeEquipmentOcrWorker={terminate:async()=>{__clipboardOcrStops++;}};
      state.modal='equipment';state.importPurpose='equipment';
      globalThis.__clipboardImport=importEquipmentFromClipboard();
    `, clipboardReplacement.context);
    await clipboardReplacement.context.__clipboardImport;
    assert(clipboardReplacement.context.__clipboardOcrStops === 1, 'Clipboard import left screenshot OCR running');
    assert(vm.runInContext(`activeEquipmentOcrWorker===null`, clipboardReplacement.context), 'Clipboard import kept the old OCR worker tracked');
    assert(activeEquipmentSnapshot(clipboardReplacement.context).details['3']?.device === '303', 'Clipboard equipment did not replace the superseded screenshot workflow');
  });

  const pastedTextReplacement = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('Pasted equipment text invalidates and terminates superseded screenshot OCR', () => {
    vm.runInContext(`
      globalThis.__pasteOcrStops=0;globalThis.__pastePrevented=false;
      activeEquipmentOcrWorker={terminate:()=>{__pasteOcrStops++;}};
      state.modal='equipment';state.importPurpose='equipment';state.importReadingFiles=['DJT6 screenshot.png'];
      globalThis.__tokenBeforePaste=morningImportReadToken;
      handleEquipmentPaste({preventDefault:()=>{__pastePrevented=true;},clipboardData:{files:[],getData:type=>type==='text/plain'?'VAN\\tDEVICE\\tPORTABLE\\nEV4\\t404\\tP4':''}});
    `, pastedTextReplacement.context);
    assert(pastedTextReplacement.context.__pastePrevented === true, 'Pasted table was not claimed by the equipment import');
    assert(pastedTextReplacement.context.__pasteOcrStops === 1, 'Pasted equipment text left screenshot OCR running');
    assert(vm.runInContext(`morningImportReadToken===__tokenBeforePaste+1&&activeEquipmentOcrWorker===null&&state.importReadingFiles.length===0`, pastedTextReplacement.context), 'Pasted equipment text did not invalidate the old import context');
    assert(activeEquipmentSnapshot(pastedTextReplacement.context).details['4']?.device === '404', 'Pasted equipment text did not replace the superseded screenshot workflow');
  });

  const asyncMorning = loadApp({ hostname: 'localhost', search: '?multiStationPreview=1&station=DJT6&date=2026-08-31' });
  await check('Stale async Morning import cannot commit after station switch', async () => {
    vm.runInContext(`
      globalThis.__resolveMorningParse=null;
      parseUploadedFile=()=>new Promise(resolve=>{__resolveMorningParse=()=>resolve({name:'DAYOFOPSPLAN_DJT6.csv',rows:[['DSP','Route Code','Driver Name','Wave','Staging Location'],['LLOL','CX333','Delayed DJT6 Driver','11:15 AM','STG.3']]});});
      state.importPurpose='morning';state.modal='import';
      globalThis.__morningRead=readFiles([{name:'DAYOFOPSPLAN_DJT6.csv',type:'text/csv',size:120}]);
    `, asyncMorning.context);
    await settleDeferredSetup(asyncMorning.context, '__resolveMorningParse');
    vm.runInContext(`switchOpeningStation('DUR6');__resolveMorningParse();`, asyncMorning.context);
    await asyncMorning.context.__morningRead;
    assert(vm.runInContext(`state.importedFile===null&&state.morningRoutes.filter(row=>!row._blank).length===0`, asyncMorning.context), 'A delayed DJT6 Morning import committed into DUR6');
    vm.runInContext(`switchOpeningStation('DJT6');`, asyncMorning.context);
    assert(vm.runInContext(`state.importedFile===null&&state.morningRoutes.filter(row=>!row._blank).length===0`, asyncMorning.context), 'A delayed DJT6 Morning import committed after its station was left');
  });

  const published = loadApp({ hostname: 'relayops.example.com', search: '?date=2026-08-31' });
  await check('Existing DJT6 production behavior unchanged', () => {
    assert(vm.runInContext('MULTI_STATION_PREVIEW', published.context) === false, 'Published dashboard unexpectedly enabled the local station prototype');
    assert(vm.runInContext(`stationWorkspaceTabs()===''`, published.context), 'Published DJT6 dashboard unexpectedly added local station tabs');
    const deviceHtml = vm.runInContext(`livePage()`, published.context);
    assert(deviceHtml.includes('Device and Portable') && !deviceHtml.includes('data-opening-station='), 'Existing DJT6 Device and Portable page contract changed');
    vm.runInContext(`
      state.morningRoutes=[{routeUid:'DJT6-CX900',stationCode:'DJT6',dsp:state.dspCode,driver:'DJT6 Driver',route:'CX900',service:'Standard Parcel',wave:'11:15 AM',staging:'STG.9',pad:'',padOverride:'',ev:'EV9',deviceName:'',portable:''}];
      state.equipmentImport={name:'existing DJT6 import',details:{9:{device:'99',portable:'P9'}}};
      inputDeviceSheetToMorning();
      globalThis.__publishedPayload=morningSheetsConnectorPayload();
    `, published.context);
    const route = vm.runInContext(`state.morningRoutes[0]`, published.context);
    assert(route.deviceName === '99' && route.portable === 'P9', `Existing DJT6 equipment-to-Morning matching changed: ${JSON.stringify(route)}`);
    assert(published.context.__publishedPayload.version === 'relayops-morning-v1' && published.context.__publishedPayload.layoutId === 'djt6-ops-log-2026' && published.context.__publishedPayload.waveSlotCount === 6, 'Existing DJT6 Google payload contract changed');
  });

  if (failures.length) throw new Error(`Multi-station Device/Portable isolation failures (${failures.length}):\n- ${failures.join('\n- ')}`);
  console.log('Multi-station Device/Portable, upload, and Google isolation contract passed');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
