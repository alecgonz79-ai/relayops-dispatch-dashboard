const crypto = require('crypto');
const fs = require('fs');
const vm = require('vm');

const appSource = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const SHARED_SPREADSHEET_ID = appSource.match(/const MORNING_TEMPLATE_URL\s*=\s*'https:\/\/docs\.google\.com\/spreadsheets\/d\/([^/]+)/)[1];
const connectorPath = require.resolve('../google-sheets/relayops-morning-connector-dur6.local.gs');
const connectorSource = fs.readFileSync(connectorPath, 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function browserHarness() {
  const storage = new Map();
  const app = { innerHTML: '' };
  const fileInput = { accept: '', files: [], addEventListener() {}, click() {} };
  const classList = { add() {}, remove() {}, toggle() { return false; }, contains() { return false; } };
  const element = () => ({
    addEventListener() {}, appendChild() {}, remove() {}, querySelector() { return null; },
    querySelectorAll() { return []; }, classList, dataset: {}, setAttribute() {},
    removeAttribute() {}, style: { setProperty() {}, removeProperty() {} }, focus() {},
    blur() {}, setSelectionRange() {}, click() {},
    getBoundingClientRect() { return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }; }
  });
  const localStorage = {
    getItem(key) { return storage.has(String(key)) ? storage.get(String(key)) : null; },
    setItem(key, value) { storage.set(String(key), String(value)); },
    removeItem(key) { storage.delete(String(key)); }
  };
  const location = {
    hostname: 'localhost',
    search: '?multiStationPreview=1&station=DUR6&date=2026-08-31',
    href: 'http://localhost:4173/?multiStationPreview=1&station=DUR6&date=2026-08-31',
    origin: 'http://localhost:4173',
    pathname: '/',
    protocol: 'http:',
    host: 'localhost'
  };
  const history = {
    replaceState(_state, _title, href) {
      location.href = String(href);
      location.search = new URL(location.href).search;
    }
  };
  const document = {
    body: { appendChild() {}, classList },
    documentElement: { clientWidth: 1280, clientHeight: 800, style: { setProperty() {}, removeProperty() {} } },
    activeElement: { blur() {} }, visibilityState: 'visible', addEventListener() {},
    getElementById(id) { return id === 'app' ? app : id === 'file-input' ? fileInput : null; },
    querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element
  };
  const window = {
    localStorage, location, innerWidth: 1280, innerHeight: 800, scrollTo() {},
    addEventListener() {}, removeEventListener() {},
    matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; }
  };
  const context = {
    console: { log() {}, warn() {}, error() {} },
    Intl, Blob, URL, URLSearchParams, TextDecoder, TextEncoder, setTimeout, clearTimeout,
    navigator: { clipboard: { writeText: async () => true } },
    location, history, localStorage, window, document,
    fetch: async () => { throw new Error('DUR6 local connector test must not call the network'); }
  };
  window.fetch = context.fetch;
  return context;
}

function installAppsScriptStubs(context) {
  const properties = new Map();
  context.ScriptApp = {AuthMode:{FULL:'FULL'},requireScopes(){}};
  const userCache = new Map();
  context.Session = {
    getActiveUser() { return {getEmail() { return 'dispatcher@example.com'; }}; },
    getEffectiveUser() { return {getEmail() { return 'dispatcher@example.com'; }}; }
  };
  context.CacheService = {getUserCache() { return {get(key) { return userCache.get(key) || null; },put(key,value) { userCache.set(key,value); }}; }};
  context.HtmlService = {createHtmlOutput(text) {const output={text,setTitle(){return output;}};return output;}};
  context.PropertiesService = {
    getScriptProperties() {
      return {
        getProperty(key) { return properties.has(key) ? properties.get(key) : null; },
        setProperty(key, value) { properties.set(key, String(value)); }
      };
    }
  };
  context.Utilities = {
    getUuid() { return crypto.randomUUID(); },
    DigestAlgorithm: { SHA_256: 'SHA_256' },
    Charset: { UTF_8: 'UTF_8' },
    computeDigest(_algorithm, text) {
      return [...crypto.createHash('sha256').update(String(text), 'utf8').digest()].map(value => value > 127 ? value - 256 : value);
    },
    formatDate() { return '20260831-120000'; }
  };
  context.ContentService = {
    MimeType: { JSON: 'JSON' },
    createTextOutput(text) {
      const output = { text, setMimeType() { return output; } };
      return output;
    }
  };
  context.SpreadsheetApp = {
    getUi() {
      return {
        createMenu() { return { addItem() { return this; }, addToUi() { return this; } }; },
        alert() {}
      };
    },
    openById() { throw new Error('Unconfigured connector attempted workbook access'); },
    flush() {}
  };
  context.LockService = { getScriptLock() { return { waitLock() {}, releaseLock() {} }; } };
  return properties;
}

class FakeRange {
  constructor(sheet, row, column, rows = 1, columns = 1) {
    this.sheet = sheet;
    this.row = row;
    this.column = column;
    this.rows = rows;
    this.columns = columns;
  }
  cells() {
    const cells = [];
    for (let row = 0; row < this.rows; row++) for (let column = 0; column < this.columns; column++) cells.push([this.row + row, this.column + column]);
    return cells;
  }
  clearContent() {
    this.cells().forEach(([row, column]) => { this.sheet.values[row - 1][column - 1] = ''; });
    this.sheet.operations.push({ type: 'clear', cells: this.cells() });
    return this;
  }
  setValue(value) {
    this.sheet.values[this.row - 1][this.column - 1] = value;
    this.sheet.operations.push({ type: 'set', cells: [[this.row, this.column]] });
    return this;
  }
  setValues(values) {
    for (let row = 0; row < this.rows; row++) for (let column = 0; column < this.columns; column++) this.sheet.values[this.row - 1 + row][this.column - 1 + column] = values[row][column];
    this.sheet.operations.push({ type: 'set', cells: this.cells() });
    return this;
  }
  getDisplayValue() { return String(this.sheet.values[this.row - 1][this.column - 1] ?? ''); }
  getDisplayValues() {
    return Array.from({ length: this.rows }, (_, row) => Array.from({ length: this.columns }, (_, column) => String(this.sheet.values[this.row - 1 + row][this.column - 1 + column] ?? '')));
  }
  getMergedRanges() { return []; }
  canEdit() { return this.sheet.canEdit !== false; }
}

let nextFakeSheetId = 100;
class FakeSheet {
  constructor(name = 'DUR6 8.31.26') {
    this.name = name;
    this.sheetId = name === 'OPS LOG DUR6' ? 1876715045 : nextFakeSheetId++;
    this.values = Array.from({ length: 142 }, () => Array(22).fill('KEEP'));
    this.operations = [];
  }
  getName() { return this.name; }
  getSheetId() { return this.sheetId; }
  setName(name) {
    if (this.spreadsheet) this.spreadsheet.sheets.delete(this.name);
    this.name = name;
    if (this.spreadsheet) this.spreadsheet.sheets.set(name, this);
    return this;
  }
  getMaxRows() { return 142; }
  getMaxColumns() { return 22; }
  copyTo(spreadsheet) {
    const copy = new FakeSheet(this.name + ' copy');
    copy.values = this.values.map(row => [...row]);
    spreadsheet.addSheet(copy);
    return copy;
  }
  getRange(rowOrA1, column, rows, columns) {
    if (typeof rowOrA1 === 'string') {
      const match = rowOrA1.match(/^([A-Z]+)(\d+)$/);
      const resolvedColumn = [...match[1]].reduce((total, character) => total * 26 + character.charCodeAt(0) - 64, 0);
      return new FakeRange(this, Number(match[2]), resolvedColumn);
    }
    return new FakeRange(this, rowOrA1, column, rows, columns);
  }
}

class FakeSpreadsheet {
  constructor(...sheets) {
    this.sheets = new Map();
    sheets.forEach(sheet => this.addSheet(sheet));
  }
  addSheet(sheet) { sheet.spreadsheet = this; this.sheets.set(sheet.getName(), sheet); return sheet; }
  getName() { return 'Shared DJT6 and DUR6 Test Workbook'; }
  getId() { return SHARED_SPREADSHEET_ID; }
  getSheetByName(name) { return this.sheets.get(name) || null; }
}

function initializeTemplate(sheet) {
  [['A1', 'WAVE'], ['J1', 'PRE DVIC'], ['P1', 'STOP COUNT'], ['U1', 'PLANNED RTS'], ['V1', 'CLOCK OUT TIME']]
    .forEach(([cell, value]) => sheet.getRange(cell).setValue(value));
  [[3, 'WAVE 1'], [20, 'WAVE 2'], [37, 'WAVE 3'], [54, 'WAVE 4'], [71, 'WAVE 5'], [88, 'WAVE 6'], [105, "ADHOC's"], [121, 'HELPERS'], [137, 'DSP']]
    .forEach(([row, value]) => sheet.getRange(row, 1).setValue(value));
  sheet.operations = [];
}

function expectFailure(run, pattern, message) {
  let error = null;
  try { run(); } catch (caught) { error = caught; }
  assert(error && pattern.test(String(error.message || error)), message);
}

function main() {
  const context = browserHarness();
  vm.createContext(context);
  vm.runInContext(appSource, context, { filename: 'app.js' });
  vm.runInContext(`
    render=()=>{};toast=()=>{};
    switchOpeningStation('DUR6');
    function __makeDur6Payload(waveCount){
      const times=['10:15 AM','10:30 AM','10:45 AM'];
      state.morningOperationDate='2026-08-31';
      state.morningFilters={wave:'all',staging:'all',pad:'all'};
      state.fitMorningRows=false;
      state.morningRoutes=times.slice(0,waveCount).map((wave,index)=>({
        routeUid:'DUR6-'+waveCount+'-'+index,dsp:'LLOL',driver:'DUR6 Driver '+(index+1),
        route:'CX7'+String(index+1).padStart(2,'0'),service:'Standard Parcel',wave,
        staging:'STG.T.'+(index+1),pad:'',padOverride:'',ev:'EV'+(index+1),
        deviceName:String(20+index),portable:'-',preDvic:false,preWhip:false,
        postDvic:false,postWhip:false,rescued:false,stops:110+index,packages:220+index,
        packageReturns:'',endTime:'',rtsTime:'',plannedRts:'6:30 PM',clockOutTime:''
      }));
      return JSON.parse(JSON.stringify(morningSheetsConnectorPayload()));
    }
    globalThis.__dur6Payloads=[1,2,3].map(__makeDur6Payload);
  `, context);
  const properties = installAppsScriptStubs(context);
  vm.runInContext(connectorSource, context, { filename: 'relayops-morning-connector-dur6.local.gs' });

  const unconfigured = JSON.parse(context.doGet().text);
  assert(unconfigured.ok && !unconfigured.configured && !unconfigured.writesEnabled, 'DUR6 connector must remain non-operational without Script Properties');
  assert(unconfigured.workbookKey === 'DUR6_OPS_LOG', 'GET response is not bound to the separate DUR6 operation namespace');
  assert(unconfigured.templateRange === 'A3:V142' && unconfigured.writtenRange === 'A3:V142', 'GET response is missing the A3:V compatibility range');
  assert(unconfigured.waveTimes === 3 && unconfigured.writeMode === 'full-replace', 'GET response is missing fixed-wave/write-mode aliases');
  properties.set('RELAYOPS_DUR6_SPREADSHEET_ID', SHARED_SPREADSHEET_ID);
  properties.set('RELAYOPS_DUR6_TEMPLATE_SHEET', 'OPS LOG 2026');
  assert(!context.relayOpsDur6Configuration_().configured, 'A DJT6 master cannot be provisioned as the DUR6 template');
  properties.set('RELAYOPS_DUR6_TEMPLATE_SHEET', 'OPS LOG DUR6');
  const config = context.relayOpsDur6Configuration_();

  context.__dur6Payloads.forEach((payload, index) => {
    const expected = index + 1;
    const validation = context.relayOpsDur6ValidatePayload_(payload, config);
    assert(validation.ready, `Real app-generated ${expected}-wave DUR6 payload failed: ${validation.errors.join('; ')}`);
    assert(payload.version === 'relayops-morning-v2', 'DUR6 payload must use the station-aware v2 contract');
    assert(payload.stationCode === 'DUR6' && payload.layoutId === 'dur6-ops-log-v1', 'DUR6 station/layout identity is missing');
    assert(payload.workbookKey === 'DUR6_OPS_LOG', 'DUR6 payload is not bound to its separate operation namespace');
    assert(payload.spreadsheetId === SHARED_SPREADSHEET_ID, 'DUR6 payload must target the same Google spreadsheet ID as DJT6');
    assert(payload.connectorBuild === '2026-09-07-dur6-google-editors-v2', 'DUR6 build identity is missing');
    assert(payload.waveSlotCount === 3 && payload.activeWaveCount === expected, 'DUR6 wave metadata is incorrect');
    assert(payload.sections.map(section => section.slotKey).join(',') === 'WAVE1,WAVE2,WAVE3,ADHOCS,HELPERS', 'DUR6 section contract is not compact/fixed');
  });

  const payload = context.__dur6Payloads[2];
  const invalidCases = [
    [{ ...payload, stationCode: 'DJT6' }, /Station identity/, 'Wrong station passed'],
    [{ ...payload, workbookKey: 'DJT6_OPS_LOG' }, /Workbook identity/, 'DJT6 Ops Log identity passed the DUR6 connector'],
    [{ ...payload, layoutId: 'djt6-ops-log-2026' }, /Layout identity/, 'Wrong layout passed'],
    [{ ...payload, connectorBuild: 'wrong-build' }, /Connector build identity/, 'Wrong build passed'],
    [{ ...payload, activeWaveCount: 0 }, /activeWaveCount/, 'Zero waves passed'],
    [{ ...payload, activeWaveCount: 4 }, /activeWaveCount/, 'More than three waves passed'],
    [{ ...payload, writeMode: 'partial-update' }, /full-replace/, 'Partial write passed'],
    [{ ...payload, spreadsheetId: '' }, /spreadsheetId/, 'Missing spreadsheet ID passed'],
    [{ ...payload, spreadsheetId: 'a-different-workbook' }, /spreadsheetId/, 'Wrong spreadsheet ID passed'],
    [{ ...payload, templateSheet: '' }, /templateSheet/, 'Missing exact template passed'],
    [{ ...payload, templateSheet: 'OPS LOG 2026' }, /templateSheet/, 'DJT6 template passed'],
    [{ ...payload, templateSheet: 'OPS LOG DUR6 COPY' }, /templateSheet/, 'Approximate template name passed'],
    ...['8/31/26','8.31.26','DJT6 8.31.26','OPS LOG 2026','OPS LOG DUR6','DUR6 9.1.26'].map(sheetName => [{ ...payload, sheetName }, /Target tab|template tab/, 'Unsafe target passed: ' + sheetName])
  ];
  invalidCases.forEach(([candidate, pattern, message]) => {
    const validation = context.relayOpsDur6ValidatePayload_(candidate, config);
    assert(!validation.ready && validation.errors.some(error => pattern.test(error)), message);
  });

  const templateSheet = new FakeSheet('OPS LOG DUR6');
  const djt6Template = new FakeSheet('OPS LOG 2026');
  const datedSheet = new FakeSheet('8/31/26');
  [templateSheet,djt6Template,datedSheet].forEach(initializeTemplate);
  datedSheet.values[2][1] = 'DJT6 Driver Must Stay';
  const protectedSheets = [templateSheet,djt6Template,datedSheet].map(sheet => ({sheet,values:JSON.stringify(sheet.values)}));
  const fakeSpreadsheet = new FakeSpreadsheet(templateSheet,djt6Template,datedSheet);
  context.SpreadsheetApp.openById = id => { assert(id === SHARED_SPREADSHEET_ID, 'Connector opened a different workbook'); return fakeSpreadsheet; };
  context.SpreadsheetApp.getUi = () => { throw new Error('Standalone setup cannot use a bound spreadsheet UI'); };
  ['RELAYOPS_DUR6_SPREADSHEET_ID','RELAYOPS_DUR6_TEMPLATE_SHEET','RELAYOPS_DUR6_WRITES_ENABLED'].forEach(key => properties.delete(key));
  properties.set('DJT6_EXISTING_SETTING', 'preserve');
  const standaloneSetup = context.relayOpsDur6ConfigureStandalone_();
  assert(standaloneSetup.ok && standaloneSetup.ready && standaloneSetup.readOnly && !standaloneSetup.writesEnabled, 'Standalone setup must validate read-only with writes disabled');
  assert(standaloneSetup.spreadsheetId === SHARED_SPREADSHEET_ID && standaloneSetup.templateSheet === 'OPS LOG DUR6' && standaloneSetup.templateSheetId === 1876715045, 'Standalone setup did not bind the exact supplied workbook and template tab');
  assert(standaloneSetup.dailyNameFormat === 'DUR6 M.D.YY' && standaloneSetup.targetSheet === '', 'Standalone setup must describe DUR6 date names without creating a daily tab');
  assert(properties.get('RELAYOPS_DUR6_SPREADSHEET_ID') === SHARED_SPREADSHEET_ID && properties.get('RELAYOPS_DUR6_TEMPLATE_SHEET') === 'OPS LOG DUR6' && properties.get('RELAYOPS_DUR6_WRITES_ENABLED') === 'false', 'Standalone setup did not install its three exact safe Script Properties');
  assert(properties.get('DJT6_EXISTING_SETTING') === 'preserve' && properties.size === 4, 'Standalone setup changed unrelated project settings');
  assert(fakeSpreadsheet.sheets.size === 3 && protectedSheets.every(({sheet,values}) => JSON.stringify(sheet.values) === values && sheet.operations.length === 0), 'Standalone setup modified a workbook tab');
  properties.set('RELAYOPS_DUR6_WRITES_ENABLED', 'true');
  const standaloneValidation = context.relayOpsDur6ValidateStandalone();
  assert(standaloneValidation.readOnly && standaloneValidation.writesEnabled && properties.get('RELAYOPS_DUR6_WRITES_ENABLED') === 'true', 'Read-only standalone validation changed configuration');
  assert(!context.relayOpsDur6ConfigureStandalone_().writesEnabled, 'Repeated standalone setup must disable previously enabled writes');
  properties.set('RELAYOPS_DUR6_SPREADSHEET_ID', 'another-workbook');
  properties.set('RELAYOPS_DUR6_WRITES_ENABLED', 'true');
  assert(!context.relayOpsDur6Configuration_().configured, 'Configuration accepted a workbook other than the authorized shared workbook');
  expectFailure(() => context.relayOpsDur6ConfigureStandalone_(), /Refusing to replace.*spreadsheet/, 'Setup silently repointed an existing workbook configuration');
  assert(properties.get('RELAYOPS_DUR6_SPREADSHEET_ID') === 'another-workbook' && properties.get('RELAYOPS_DUR6_WRITES_ENABLED') === 'false', 'Conflicting workbook setup failed to preserve configuration and disable writes');
  properties.set('RELAYOPS_DUR6_SPREADSHEET_ID', SHARED_SPREADSHEET_ID);
  properties.set('RELAYOPS_DUR6_TEMPLATE_SHEET', 'OPS LOG 2026');
  properties.set('RELAYOPS_DUR6_WRITES_ENABLED', 'true');
  expectFailure(() => context.relayOpsDur6ConfigureStandalone_(), /Refusing to replace.*template/, 'Setup silently replaced a DJT6 template configuration');
  assert(properties.get('RELAYOPS_DUR6_TEMPLATE_SHEET') === 'OPS LOG 2026' && properties.get('RELAYOPS_DUR6_WRITES_ENABLED') === 'false', 'Conflicting template setup failed to preserve configuration and disable writes');
  properties.set('RELAYOPS_DUR6_TEMPLATE_SHEET', 'OPS LOG DUR6');
  templateSheet.sheetId = 999;
  expectFailure(() => context.relayOpsDur6ConfigureStandalone_(), /template ID does not match/, 'Standalone setup accepted a renamed/copied template instead of the supplied exact tab');
  assert(properties.get('RELAYOPS_DUR6_WRITES_ENABLED') === 'false', 'Template-ID validation failure left writes enabled');
  templateSheet.sheetId = 1876715045;
  fakeSpreadsheet.sheets.delete('OPS LOG DUR6');
  expectFailure(() => context.relayOpsDur6ConfigureStandalone_(), /Exact DUR6 template/, 'Standalone setup fell back to a DJT6 template when OPS LOG DUR6 was missing');
  fakeSpreadsheet.addSheet(templateSheet);
  context.relayOpsDur6ConfigureStandalone_();
  const statusResponse = JSON.parse(context.doGet().text);
  assert(statusResponse.spreadsheetId === SHARED_SPREADSHEET_ID && statusResponse.templateSheet === 'OPS LOG DUR6', 'Connector status did not verify the actual shared workbook/template');
  const directPost = JSON.parse(context.doPost({postData:{contents:JSON.stringify({...payload,dryRun:true})}}).text);
  assert(!directPost.ok && /Direct POST transfers are disabled/.test(directPost.error), 'Unauthenticated direct POST ingress remains exposed');
  const dryResponse = context.relayOpsDur6BridgeSubmit({ ...payload, requestId: 'dur6-dry-contract', dryRun: true });
  assert(dryResponse.ok && dryResponse.dryRun, `DUR6 dry-run response failed: ${dryResponse.error || 'unknown error'}`);
  assert(dryResponse.workbookKey === 'DUR6_OPS_LOG', 'Dry-run response lost the DUR6 namespace');
  assert(dryResponse.templateRange === 'A3:V142' && dryResponse.writtenRange === 'A3:V142' && dryResponse.lastCell === 'V142', 'Dry-run response range aliases do not match the frontend contract');
  assert(dryResponse.waveTimes === 3 && dryResponse.writeMode === payload.writeMode, 'Dry-run response waveTimes/writeMode do not match the frontend contract');
  assert(dryResponse.wouldCreateSheet && fakeSpreadsheet.sheets.size === 3, 'Dry run must not copy or overwrite any tab');
  const originalSession = context.Session;
  context.Session = {getActiveUser(){return {getEmail(){return 'dispatcher@example.com';}};},getEffectiveUser(){return {getEmail(){return 'owner@example.com';}};}};
  assert(!context.relayOpsDur6BridgeStatus().ok && !context.relayOpsDur6BridgeSubmit({...payload,dryRun:true}).ok, 'Execute-as-owner deployment was not rejected for another signed-in user');
  context.Session = {getActiveUser(){return {getEmail(){return '';}};},getEffectiveUser(){return {getEmail(){return '';}};}};
  assert(!context.relayOpsDur6BridgeStatus().ok && !context.relayOpsDur6BridgeSubmit({...payload,dryRun:true}).ok, 'Anonymous users reached the authenticated bridge');
  context.Session = originalSession;
  templateSheet.canEdit = false;
  const viewerStatus = context.relayOpsDur6BridgeStatus();
  assert(viewerStatus.ok && viewerStatus.canEdit === false && viewerStatus.access === 'read-only' && !viewerStatus.writesEnabled, 'Status incorrectly claimed transfer permission for a spreadsheet viewer');
  const noEditor = context.relayOpsDur6BridgeSubmit({...payload,dryRun:true});
  assert(!noEditor.ok && /cannot edit/.test(noEditor.error), 'Spreadsheet viewer received a transferable preflight');
  templateSheet.canEdit = true;
  assert(context.relayOpsDur6BridgeStatus().canEdit === true && context.relayOpsDur6BridgeStatus().signedInUser === 'dispatcher@example.com', 'Status did not identify the active account and actual existing edit access');
  assert(/^[a-f0-9]{64}$/.test(dryResponse.expectedWriteToken) && /^[a-f0-9]{32}$/.test(dryResponse.preflightToken), 'Dry run is missing fresh receipt/CAS and user-bound preflight tokens');
  const disabledResponse = context.relayOpsDur6BridgeSubmit({ ...payload, requestId: 'disabled-send' });
  assert(!disabledResponse.ok && /writes are disabled/.test(disabledResponse.error) && fakeSpreadsheet.sheets.size === 3, 'Writes-disabled switch did not prevent a DUR6 sheet creation');
  const originalLockService = context.LockService;
  let releasedAfterDisable = false;
  properties.set('RELAYOPS_DUR6_WRITES_ENABLED', 'true');
  context.LockService = { getScriptLock() { return { waitLock() { properties.set('RELAYOPS_DUR6_WRITES_ENABLED', 'false'); }, releaseLock() { releasedAfterDisable = true; } }; } };
  const concurrentDisable = context.relayOpsDur6BridgeSubmit({...payload,requestId:'disabled-while-waiting'});
  assert(!concurrentDisable.ok && /writes are disabled/.test(concurrentDisable.error) && releasedAfterDisable && fakeSpreadsheet.sheets.size === 3, 'A send waiting for the lock ignored writes being disabled during setup');
  context.LockService = originalLockService;
  properties.set('RELAYOPS_DUR6_WRITES_ENABLED', 'true');
  const sendPayload = {...payload,requestId:'dur6-send-contract',expectedWriteToken:dryResponse.expectedWriteToken,preflightToken:dryResponse.preflightToken};
  const noPreflight = context.relayOpsDur6BridgeSubmit({...payload,requestId:'no-preflight'});
  assert(!noPreflight.ok && /fresh DUR6 preview/.test(noPreflight.error) && fakeSpreadsheet.sheets.size === 3, 'Direct bridge send bypassed preview');
  const sendResponse = context.relayOpsDur6BridgeSubmit(sendPayload);
  assert(sendResponse.ok && !sendResponse.duplicate, `DUR6 real-send response failed: ${sendResponse.error || 'unknown error'}`);
  assert(sendResponse.workbookKey === 'DUR6_OPS_LOG', 'Real-send response lost the DUR6 namespace');
  assert(sendResponse.templateRange === 'A3:V142' && sendResponse.writtenRange === 'A3:V142' && sendResponse.lastCell === 'V142', 'Real-send response range aliases do not match the frontend contract');
  assert(sendResponse.waveTimes === 3 && sendResponse.writeMode === payload.writeMode, 'Real-send response waveTimes/writeMode do not match the frontend contract');
  assert(sendResponse.createdSheet && sendResponse.sheet === 'DUR6 8.31.26' && fakeSpreadsheet.getSheetByName(sendResponse.sheet), 'DUR6 send did not create its own prefixed tab beside the existing DJT6 date');
  const duplicateResponse = context.relayOpsDur6BridgeSubmit({...sendPayload,expectedWriteToken:'stale',preflightToken:'expired'});
  assert(duplicateResponse.ok && duplicateResponse.duplicate, 'Retried real send was not acknowledged as an idempotent duplicate');
  assert(duplicateResponse.waveTimes === 3 && duplicateResponse.writeMode === payload.writeMode && duplicateResponse.writtenRange === 'A3:V142', 'Duplicate response is missing frontend compatibility aliases');
  [dryResponse,sendResponse,duplicateResponse].forEach(response => {
    assert(response.spreadsheetId === SHARED_SPREADSHEET_ID && response.stationCode === 'DUR6' && response.templateSheet === 'OPS LOG DUR6' && response.targetSheet === 'DUR6 8.31.26', 'Response did not confirm actual workbook/station/template/target');
  });
  const updatePayload = JSON.parse(JSON.stringify({...payload,requestId:'dur6-update-contract'}));
  updatePayload.rows[updatePayload.sections[0].sourceIndex][1] = 'Updated DUR6 Driver';
  const staleResponse = context.relayOpsDur6BridgeSubmit({...updatePayload,expectedWriteToken:dryResponse.expectedWriteToken,preflightToken:dryResponse.preflightToken});
  assert(!staleResponse.ok && /preview expired or the data changed/.test(staleResponse.error), 'Old preview was reused for changed data');
  const updatePreview = context.relayOpsDur6BridgeSubmit({...updatePayload,dryRun:true});
  assert(updatePreview.ok && updatePreview.expectedWriteToken !== dryResponse.expectedWriteToken, 'New receipt failed to advance CAS token');
  updatePayload.expectedWriteToken = updatePreview.expectedWriteToken;
  updatePayload.preflightToken = updatePreview.preflightToken;
  const otherDispatcherPayload = JSON.parse(JSON.stringify({...payload,requestId:'other-dispatcher'}));
  otherDispatcherPayload.rows[otherDispatcherPayload.sections[0].sourceIndex][1] = 'Concurrent DUR6 Driver';
  const otherPreview = context.relayOpsDur6BridgeSubmit({...otherDispatcherPayload,dryRun:true});
  const updateResponse = context.relayOpsDur6BridgeSubmit(updatePayload);
  assert(updateResponse.ok && !updateResponse.createdSheet && /^DUR6 backup /.test(updateResponse.backupSheet || '') && fakeSpreadsheet.getSheetByName(updateResponse.backupSheet), 'Existing DUR6 dated tab was not backed up before update');
  assert(fakeSpreadsheet.getSheetByName('DUR6 8.31.26').values[2][1] === 'Updated DUR6 Driver', 'Update did not reach the existing DUR6 dated tab');
  assert(fakeSpreadsheet.getSheetByName(updateResponse.backupSheet).values[2][1] === 'DUR6 Driver 1', 'Pre-write backup failed to preserve the earlier DUR6 assignment');
  const rejectedConcurrent = context.relayOpsDur6BridgeSubmit({...otherDispatcherPayload,expectedWriteToken:otherPreview.expectedWriteToken,preflightToken:otherPreview.preflightToken});
  assert(!rejectedConcurrent.ok && /Another dispatcher changed/.test(rejectedConcurrent.error), 'Concurrent dispatcher preview overwrote a newer DUR6 receipt');
  assert(fakeSpreadsheet.getSheetByName('DUR6 8.31.26').values[2][1] === 'Updated DUR6 Driver', 'Rejected stale CAS still wrote a driver');
  const cacheService = context.CacheService;
  context.CacheService = {getUserCache(){return {get(){return null;}};}};
  const expiredResponse = context.relayOpsDur6BridgeSubmit({...otherDispatcherPayload,expectedWriteToken:otherPreview.expectedWriteToken,preflightToken:otherPreview.preflightToken});
  assert(!expiredResponse.ok && /preview expired/.test(expiredResponse.error), 'Expired per-user cache preflight was accepted');
  const retryWithoutCache = context.relayOpsDur6BridgeSubmit(updatePayload);
  assert(retryWithoutCache.ok && retryWithoutCache.duplicate, 'Successful retry must remain idempotent after preflight expiry');
  context.CacheService = cacheService;
  assert(context.relayOpsDur6PayloadHash_(payload) === context.relayOpsDur6PayloadHash_({...payload,dryRun:true,expectedWriteToken:'any',preflightToken:'any'}), 'Payload hash changed when bridge preview tokens changed');
  const functionNames = [...connectorSource.replace(/const html = `[\s\S]*?`;/, '').matchAll(/^function\s+(\w+)\(/gm)].map(match=>match[1]);
  const publicFunctions = functionNames.filter(name=>!name.endsWith('_')).sort();
  assert(publicFunctions.join(',') === ['doGet','doPost','relayOpsDur6BridgeStatus','relayOpsDur6BridgeSubmit','relayOpsDur6ValidateStandalone'].sort().join(','), 'An internal configuration, receipt, or writer helper is callable through google.script.run');
  protectedSheets.forEach(({sheet,values}) => assert(JSON.stringify(sheet.values) === values && sheet.operations.length === 0, sheet.getName() + ' was modified by a DUR6 send'));
  ['8/31/26','8.31.26','DJT6 8.31.26','OPS LOG 2026','OPS LOG DUR6'].forEach(sheetName => {
    const response = context.relayOpsDur6BridgeSubmit({...payload,requestId:'unsafe-'+sheetName,sheetName});
    assert(!response.ok, 'A direct request was allowed to target protected tab ' + sheetName);
  });
  protectedSheets.forEach(({sheet,values}) => assert(JSON.stringify(sheet.values) === values && sheet.operations.length === 0, sheet.getName() + ' changed after a rejected send'));

  const verificationChecklist=vm.runInContext('morningSheetsVerificationChecklist(morningSheetsConnectorPayload())',context);
  assert(/Expected template range: A3:V142/.test(verificationChecklist) && /Expected last cell: V142/.test(verificationChecklist), 'DUR6 verification checklist must use the existing template boundary V142');

  const revisioned = { ...payload, requestId: 'dur6-revision-10', workspaceRevision: 10 };
  const revisionedHash = context.relayOpsDur6PayloadHash_(revisioned);
  context.relayOpsDur6RecordWrite_(revisioned, revisionedHash, revisioned.sheetName);
  assert(context.relayOpsDur6WriteDisposition_(revisioned, revisionedHash).duplicate, 'Same requestId/hash was not idempotent');
  expectFailure(
    () => context.relayOpsDur6WriteDisposition_(revisioned, revisionedHash + '-different'),
    /requestId was already used/,
    'Same requestId with different data did not fail'
  );
  expectFailure(
    () => context.relayOpsDur6WriteDisposition_({ ...revisioned, requestId: 'dur6-revision-9', workspaceRevision: 9 }, revisionedHash),
    /Stale DUR6 workspaceRevision/,
    'Stale workspace revision did not fail'
  );
  assert(!context.relayOpsDur6WriteDisposition_({...revisioned,spreadsheetId:'another-configured-workbook'},revisionedHash).duplicate, 'Idempotency state must not acknowledge a write from another workbook');

  const geometry = JSON.parse(vm.runInContext('JSON.stringify(RELAYOPS_DUR6_LAYOUT)', context));
  assert(JSON.stringify(geometry) === JSON.stringify([
    { key: 'WAVE1', label: 'WAVE 1', startRow: 3, routeCapacity: 15, timeRow: 18, separatorRow: 19 },
    { key: 'WAVE2', label: 'WAVE 2', startRow: 20, routeCapacity: 15, timeRow: 35, separatorRow: 36 },
    { key: 'WAVE3', label: 'WAVE 3', startRow: 37, routeCapacity: 15, timeRow: 52, separatorRow: 53 },
    { key: 'WAVE4', label: 'WAVE 4', startRow: 54, routeCapacity: 15, timeRow: 69, separatorRow: 70 },
    { key: 'WAVE5', label: 'WAVE 5', startRow: 71, routeCapacity: 15, timeRow: 86, separatorRow: 87 },
    { key: 'WAVE6', label: 'WAVE 6', startRow: 88, routeCapacity: 15, timeRow: 103, separatorRow: 104 },
    { key: 'ADHOCS', label: "ADHOC's", startRow: 105, routeCapacity: 15, separatorRow: 120 },
    { key: 'HELPERS', label: 'HELPERS', startRow: 121, routeCapacity: 15, separatorRow: 136 },
    { key: 'DSP', label: 'DSP', startRow: 137, routeCapacity: 6 }
  ]), 'DUR6 actual 142-row template geometry changed');

  const sheet = new FakeSheet();
  initializeTemplate(sheet);
  const result = context.relayOpsDur6WriteMorningSheet_(sheet, payload);
  assert(result.updatedRoutes === 3 && result.waveLabels === 3, 'DUR6 simulated write count is incorrect');
  assert(sheet.values[2][1] === 'DUR6 Driver 1' && sheet.values[2][2] === 'CX701', 'Wave 1 B:C mapping shifted');
  assert(sheet.values[19][1] === 'DUR6 Driver 2' && sheet.values[36][1] === 'DUR6 Driver 3', 'Wave 2/3 fixed anchors shifted');
  assert(sheet.values[2][4] === '' && sheet.values[19][4] === '' && sheet.values[36][4] === '', 'Blank manual Pads were not preserved');
  assert(sheet.values[2][15] === 110 && sheet.values[2][16] === 220 && sheet.values[2][20] === '6:30 PM', 'P:Q/U mapping shifted');
  assert(sheet.values[17][0] === '10:15 (1)' && sheet.values[34][0] === '10:30 (1)' && sheet.values[51][0] === '10:45 (1)', 'Wave footer geometry shifted');
  [[54,69,'WAVE 4'],[71,86,'WAVE 5'],[88,103,'WAVE 6']].forEach(([startRow,timeRow,label]) => {
    assert(sheet.values[startRow-1][0] === label && sheet.values[timeRow-1][0] === '' && sheet.values[startRow-1][4] === '', 'Unused wave label or blank footer/pad shifted');
    for(let row=startRow;row<startRow+15;row++)[2,3,4,6,7,8,16,17,21].forEach(column => assert(sheet.values[row-1][column-1] === '', 'Old DUR6 data survived in unused wave cell ' + row + ':' + column));
  });
  [9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 22].forEach(column => {
    assert(sheet.values[2][column - 1] === 'KEEP', `Protected column ${column} was modified`);
  });
  const forbiddenColumns = new Set([9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 22]);
  assert(sheet.operations.every(operation => operation.cells.every(([, column]) => !forbiddenColumns.has(column))), 'Writer touched a column outside A:H/P:Q/U');
  context.__dur6Payloads.slice(0,2).forEach((shortPayload,index)=>{
    const activeCount=index+1,shortSheet=new FakeSheet();initializeTemplate(shortSheet);
    const shortResult=context.relayOpsDur6WriteMorningSheet_(shortSheet,shortPayload);
    assert(shortResult.updatedRoutes === activeCount && shortResult.waveLabels === activeCount, activeCount + '-wave payload did not keep its active wave count');
    [[3,18],[20,35],[37,52]].slice(activeCount).forEach(([startRow,timeRow])=>assert(shortSheet.values[startRow-1][1] === '' && shortSheet.values[timeRow-1][0] === '', 'Inactive wave retained an old driver or footer'));
  });
  const supplementalPayload=JSON.parse(JSON.stringify(payload));
  [['ADHOCS','DUR6 Adhoc','AX'],['HELPERS','DUR6 Helper','HELPER']].forEach(([slotKey,driver,route])=>{
    const section=supplementalPayload.sections.find(row=>row.slotKey===slotKey),index=section.sourceIndex;
    supplementalPayload.rows[index]=['',driver,route,'','','EV9','99','-',false,10,20,'','4:00 PM'];supplementalPayload.rowTypes[index]='route';
  });
  const supplementalSheet=new FakeSheet();initializeTemplate(supplementalSheet);
  context.relayOpsDur6WriteMorningSheet_(supplementalSheet,supplementalPayload);
  assert(supplementalSheet.values[104][1] === 'DUR6 Adhoc' && supplementalSheet.values[120][1] === 'DUR6 Helper', 'Adhoc/helper data did not use the existing OPS LOG DUR6 positions');
  expectFailure(()=>context.relayOpsDur6WriteMorningSheet_(djt6Template,payload),/Refusing to write/,'Direct writer allowed a master template');
  expectFailure(()=>context.relayOpsDur6WriteMorningSheet_(datedSheet,payload),/Refusing to write/,'Direct writer allowed a DJT6 bare-date tab');

  const slashSheet=new FakeSheet('DUR6 8/31/26');initializeTemplate(slashSheet);
  const slashWorkbook=new FakeSpreadsheet(templateSheet,djt6Template,datedSheet,slashSheet);
  context.SpreadsheetApp.openById=()=>slashWorkbook;
  const slashTarget=context.relayOpsDur6ResolveTarget_(payload,config,false);
  assert(!slashTarget.wouldCreate && slashTarget.targetName === 'DUR6 8/31/26', 'Existing slash-format DUR6 date should be reused instead of creating a second date tab');
  slashWorkbook.addSheet(new FakeSheet('DUR6 8.31.26'));
  expectFailure(()=>context.relayOpsDur6ResolveTarget_(payload,config,true),/Multiple DUR6 tabs/,'Ambiguous DUR6 dates were not rejected');
  context.SpreadsheetApp.openById=()=>({getId(){return 'unexpected-workbook';}});
  expectFailure(()=>context.relayOpsDur6ResolveTarget_(payload,config,true),/Opened spreadsheetId/,'Actual workbook identity mismatch was not rejected');
  context.SpreadsheetApp.openById=()=>new FakeSpreadsheet(djt6Template,datedSheet);
  expectFailure(()=>context.relayOpsDur6ResolveTarget_(payload,config,true),/Exact DUR6 template/,'Missing DUR6 template fell back to a DJT6 sheet');

  const backupNames = new Set();
  const fakeBackupSpreadsheet = { getSheetByName(name) { return backupNames.has(name) ? { name } : null; } };
  const backupSource = {
    getName() { return 'DUR6 8/31/26'; },
    copyTo() {
      return {
        setName(name) { this.name = name; backupNames.add(name); return this; },
        getName() { return this.name; }
      };
    }
  };
  const backupName = context.relayOpsDur6BackupSheet_(fakeBackupSpreadsheet, backupSource);
  assert(/^DUR6 backup DUR6\.8\.31\.26 20260831-120000/.test(backupName), 'Pre-write backup was not created with a recoverable name');

  assert(!/script\.google\.com|docs\.google\.com|spreadsheets\/d\//.test(connectorSource), 'DUR6 connector hardcodes an endpoint/workbook URL');
  assert(vm.runInContext('RELAYOPS_DUR6_EXPECTED_SPREADSHEET_ID',context) === SHARED_SPREADSHEET_ID, 'Standalone setup workbook differs from the dashboard shared spreadsheet');
  assert(vm.runInContext('RELAYOPS_DUR6_EXPECTED_TEMPLATE_ID',context) === 1876715045, 'Standalone setup must bind the supplied DUR6 template gid');
  console.log('DUR6 shared-workbook connector scaffold test passed');
}

main();
