const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function appContext() {
  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const storage = new Map();
  const element = () => ({
    addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {}, style: {}, focus() {}, blur() {}, setSelectionRange() {}, click() {},
    querySelector() { return null; }, querySelectorAll() { return []; }
  });
  const documentListeners = new Map();
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
    navigator: { clipboard: { writeText: async () => true } },
    window: { scrollTo() {}, open() {} },
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    document: {
      body: { appendChild() {} }, activeElement: null,
      getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
      querySelector: () => null, querySelectorAll: () => [], createElement: element,
      addEventListener(type, fn) { documentListeners.set(type, fn); },
      removeEventListener(type, fn) { if (documentListeners.get(type) === fn) documentListeners.delete(type); }
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{}; render=()=>{}; persist=()=>{};', context);
  return { context, app, fileInput, storage, documentListeners };
}

async function testMorningPayloadScope() {
  const { context } = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';
    state.morningOperationDate='2026-07-14';
    state.fitMorningRows=true;
    state.morningRoutes=[
      {dsp:'LLOL',driver:'Wave One',route:'CX101',wave:'11:15 AM',staging:'STG.V.1',padOverride:'A',stops:101,packages:201},
      {dsp:'LLOL',driver:'Wave Two',route:'CX201',wave:'11:20 AM',staging:'STG.P.1',padOverride:'B',stops:102,packages:202},
      {dsp:'LLOL',driver:'Wave Three A',route:'CX301',wave:'11:25 AM',staging:'STG.Z.1',padOverride:'C',stops:103,packages:203},
      {dsp:'LLOL',driver:'Wave Three B',route:'CX302',wave:'11:25 AM',staging:'STG.Z.2',padOverride:'C',stops:104,packages:204}
    ];
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
    globalThis.__full=morningSheetsConnectorPayload();
    state.morningFilters={wave:'11:25 AM',staging:'all',pad:'all'};
    globalThis.__wave=morningSheetsConnectorPayload();
    state.morningFilters={wave:'11:25 AM',staging:'STG.Z.2',pad:'all'};
    globalThis.__route=morningSheetsConnectorPayload();
  `, context);
  const full = context.__full, wave = context.__wave, route = context.__route;
  assert(full.writeMode === 'full-replace', 'Unfiltered Morning Sheet sends must declare full-replace');
  assert(full.sections.slice(0, 3).map(section => section.slotKey).join(',') === 'WAVE1,WAVE2,WAVE3', 'Full sends must retain stable fixed wave slot keys');
  assert(wave.writeMode === 'partial-update', 'A selected non-first wave must use partial-update');
  assert(wave.sections.length === 1 && wave.sections[0].slotKey === 'WAVE3' && wave.sections[0].label === 'WAVE 3', 'Filtering Wave 3 must not renumber it to WAVE 1');
  assert(wave.sections[0].rowCount === 2, 'The complete selected wave should retain both Wave 3 routes');
  assert(route.writeMode === 'partial-update', 'A staging subset must use partial-update');
  assert(route.sections.length === 1 && route.sections[0].slotKey === 'WAVE3', 'A route subset must retain its original Wave 3 slot');
  assert(route.sections[0].rowCount === 1 && route.rows.some(row => row[2] === 'CX302') && !route.rows.some(row => row[2] === 'CX301'), 'The partial staging payload must contain only the selected route');
}

async function testWhiparoundIdentitySafety() {
  const { context } = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-14';
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
    state.driverContacts=[{name:'Maya Collins',key:'maya collins'},{name:'Michael Collins',key:'michael collins'}];
    state.morningRoutes=[{dsp:'LLOL',driver:'Maya Collins',route:'CX101',wave:'11:15 AM',staging:'STG.V.1',service:'Standard Parcel'}];
    state.whiparoundInspections=[
      {id:'wrong-pre',type:'pre',date:'2026-07-14',asset:'EV2',driver:'Michael Collins'},
      {id:'right-post',type:'post',date:'2026-07-14',asset:'EV1',driver:'Maya Collins'}
    ];
    globalThis.__looseMatch=inspectionNameMatches('Michael Collins','Maya Collins');
    globalThis.__applied=applyWhiparoundChecksToMorning('2026-07-14');
    globalThis.__whipPayload=morningWhiparoundOnlyPayload();
  `, context);
  assert(context.__looseMatch === false, 'Whiparound matching must not accept same-last-name/first-initial collisions');
  assert(context.__applied.pre === 0 && context.__applied.post === 1, 'A different driver must not check the route PRE-WHIP box');
  assert(context.__whipPayload.updates[0].driver === 'Maya Collins', 'Whiparound payload must carry the canonical route driver for connector verification');
}

async function testStalePaycomAndRosterReconciliation() {
  const { context } = appContext();
  vm.runInContext(`
    state.morningOperationDate='2026-07-14';
    state.scheduleEntries=[{date:'7/13/2026',name:'Stale Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'}];
    globalThis.__stale=currentScheduleEntries();
    state.scheduleEntries=[{date:'7/14/2026',name:'Casey Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'}];
    state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.scheduleStayHome={};state.scheduleStayHomeHistory={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};state.morningRoutes=[];
    markPaycomBackup('Casey Driver','Delivery Associate');
    globalThis.__afterBackup={marks:{...state.scheduleDriverMarks},backups:{...state.scheduleBackupRecords},stay:{...state.scheduleStayHome},reductions:{...state.scheduleReductions},helpers:{...state.scheduleHelpers}};
    addRosterReduction('Casey Driver','Delivery Associate','CX101');
    globalThis.__afterReduction={marks:{...state.scheduleDriverMarks},backups:{...state.scheduleBackupRecords},stay:{...state.scheduleStayHome},reductions:{...state.scheduleReductions},helpers:{...state.scheduleHelpers}};
    moveReductionToBackup('Casey Driver','Delivery Associate');
    globalThis.__afterMove={marks:{...state.scheduleDriverMarks},backups:{...state.scheduleBackupRecords},stay:{...state.scheduleStayHome},reductions:{...state.scheduleReductions},helpers:{...state.scheduleHelpers}};
    state.scheduleHelpers[scheduleHelperKey('Casey Driver')]={name:'Casey Driver',role:'Driver Helper',matchedRoute:'CX101'};
    state.morningRoutes=[{dsp:'LLOL',driver:'Primary Driver + Casey Driver',route:'CX101',wave:'11:15 AM',service:'Standard Parcel',helperAssignmentKey:scheduleHelperKey('Casey Driver')}];
    markPaycomStayHome('Casey Driver','Delivery Associate');
    globalThis.__afterStay={marks:{...state.scheduleDriverMarks},backups:{...state.scheduleBackupRecords},stay:{...state.scheduleStayHome},reductions:{...state.scheduleReductions},helpers:{...state.scheduleHelpers},driver:state.morningRoutes[0]?.driver||''};

    state.scheduleEntries.push({date:'7/14/2026',name:'Replacement Driver',start:'10:30 AM',end:'7:00 PM',role:'Rescue'});
    const replacementKey=scheduleDriverMarkKey('Replacement Driver');
    state.scheduleDriverMarks[replacementKey]='backup';
    state.scheduleBackupRecords[replacementKey]=rosterRecord('Replacement Driver','Rescue');
    state.scheduleReductions[replacementKey]=rosterRecord('Replacement Driver','Rescue');
    state.scheduleHelpers[replacementKey]={name:'Replacement Driver',role:'Rescue'};
    state.morningRoutes=[{dsp:'LLOL',driver:'Original Driver',route:'CX900',wave:'11:15 AM',service:'Standard Parcel'}];
    state.pendingRosterSwap={route:'CX900',driverName:'Original Driver',driverLabel:'Original Driver',mode:'calloff'};
    document.getElementById=id=>id==='roster-swap-replacement'?{value:'Replacement Driver'}:null;
    applyRosterSwap();
    globalThis.__afterCalloff={driver:state.morningRoutes[0].driver,calloffs:{...state.callOffDriverKeys},marks:{...state.scheduleDriverMarks},backups:{...state.scheduleBackupRecords},stay:{...state.scheduleStayHome},reductions:{...state.scheduleReductions},helpers:{...state.scheduleHelpers}};
  `, context);
  assert(context.__stale.length === 0, 'A Paycom file for another date must not silently populate today’s roster');
  assert(Object.keys(context.__afterBackup.backups).length === 1 && Object.keys(context.__afterBackup.stay).length === 0 && Object.keys(context.__afterBackup.reductions).length === 0, 'Backup state must exclude stay-home, reduction, and helper states');
  assert(Object.keys(context.__afterReduction.reductions).length === 1 && Object.keys(context.__afterReduction.backups).length === 0 && Object.keys(context.__afterReduction.marks).length === 0, 'Reduction state must remove the prior backup state');
  assert(Object.keys(context.__afterMove.backups).length === 1 && Object.keys(context.__afterMove.reductions).length === 0 && Object.values(context.__afterMove.marks)[0] === 'backup', 'Moving a reduction to backups must reconcile both stores');
  assert(Object.keys(context.__afterStay.stay).length === 1 && Object.keys(context.__afterStay.backups).length === 0 && Object.keys(context.__afterStay.helpers).length === 0 && !context.__afterStay.driver.includes('Casey Driver'), 'Stay-home state must remove backup/helper assignments and the matched helper name');
  assert(context.__afterCalloff.driver === 'Replacement Driver' && Object.values(context.__afterCalloff.calloffs).some(record => record.name === 'Original Driver'), 'Call off & swap must replace the route and record the called-off driver');
  const replacementKey = '2026-07-14|replacement driver';
  assert(!context.__afterCalloff.marks[replacementKey] && !context.__afterCalloff.backups[replacementKey] && !context.__afterCalloff.stay[replacementKey] && !context.__afterCalloff.reductions[replacementKey] && !context.__afterCalloff.helpers[replacementKey], 'A route replacement must be removed from every unavailable/helper bucket');
}

async function testReportClassHtmlXls() {
  const { context } = appContext();
  const html = `<!doctype html><html><body><table>
    <tr><th>Employee</th><th>Tuesday, July 14, 2026</th></tr>
    <tr><td>DRIVER, CASEY</td><td>Delivery Associate<br>10:30 AM - 7:00 PM</td></tr>
    <tr><td>HELPER, HARPER</td><td>Driver Helper<br>10:25 AM - 6:55 PM</td></tr>
    <tr><td>LEAD, MORGAN</td><td>First Opening Dispatcher<br>9:45 AM - 6:15 PM</td></tr>
  </table></body></html>`;
  context.__file = {
    name: 'ReportClass-20260714050418.xls', type: 'application/vnd.ms-excel',
    arrayBuffer: async () => new TextEncoder().encode(html).buffer,
    text: async () => html
  };
  vm.runInContext(`state.morningOperationDate='2031-01-01'`, context);
  await vm.runInContext(`parseUploadedFile(globalThis.__file).then(file=>{globalThis.__parsedFile=file;globalThis.__entries=scheduleEntriesFromRows(file.rows,{fileName:file.name});})`, context);
  const file = context.__parsedFile, entries = context.__entries;
  assert(file.kind === 'paycom-html-xls' && file.rows.length === 4, 'ReportClass HTML .xls must be recognized before attempting XLSX parsing');
  assert(entries.length === 3, 'ReportClass HTML .xls must produce all scheduled shift rows');
  assert(entries[0].name === 'Casey Driver' && entries[0].date === '7/14/2026' && entries[0].role === 'Delivery Associate', 'ReportClass employee/date/role normalization or filename year hint failed');
  assert(entries[1].name === 'Harper Helper' && entries[1].start === '10:25 AM', 'ReportClass helper shift normalization failed');
  assert(entries[2].role === 'First Opening Dispatcher', 'ReportClass dispatcher role must remain available for dispatcher grouping');

  const actualPath = '/Users/alecgonzo/Downloads/ReportClass-20260714050418.xls';
  if (fs.existsSync(actualPath)) {
    const bytes = fs.readFileSync(actualPath);
    context.__actualPaycom = {
      name: 'ReportClass-20260714050418.xls', type: 'application/vnd.ms-excel',
      arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      text: async () => bytes.toString('utf8')
    };
    await vm.runInContext(`parseUploadedFile(globalThis.__actualPaycom).then(file=>{globalThis.__actualEntries=scheduleEntriesFromRows(file.rows,{fileName:file.name});})`, context);
    assert(context.__actualEntries.length === 83, `The supplied ReportClass file should produce 83 shifts, received ${context.__actualEntries.length}`);
    assert(context.__actualEntries.every(entry => entry.date === '7/14/2026'), 'The supplied ReportClass shifts must retain the report operation date');
  }

  const matchedPath = '/Users/alecgonzo/Downloads/ReportClass-20260715055736.xls';
  if (fs.existsSync(matchedPath)) {
    const bytes = fs.readFileSync(matchedPath);
    context.__matchedPaycom = {
      name: 'ReportClass-20260715055736.xls', type: 'application/vnd.ms-excel',
      arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      text: async () => bytes.toString('utf8')
    };
    await vm.runInContext(`parseUploadedFile(globalThis.__matchedPaycom).then(file=>{globalThis.__matchedEntries=scheduleEntriesFromRows(file.rows,{fileName:file.name});})`, context);
    const matched = context.__matchedEntries;
    assert(matched.length === 81 && new Set(matched.map(entry => entry.name.toLowerCase())).size === 81, `The 7/15 ReportClass file should produce 81 unique shifts, received ${matched.length}`);
    assert(matched.every(entry => entry.date === '7/15/2026' && entry.name && entry.start && entry.end && entry.role), 'Every 7/15 ReportClass shift must retain its date, name, times, and role');
    const roleCounts = Object.fromEntries([...new Set(matched.map(entry => entry.role))].map(role => [role, matched.filter(entry => entry.role === role).length]));
    assert(roleCounts['Delivery Associate'] === 59 && roleCounts.Rescue === 12 && roleCounts['Driver Helper'] === 1 && roleCounts['Closing Dispatcher'] === 1, 'The 7/15 ReportClass role totals no longer match the Paycom PDF proof');
    assert(matched.some(entry => entry.name === 'Alec Gonzalez' && entry.role === 'Closing Dispatcher' && entry.start === '2:00 PM' && entry.end === '10:30 PM'), 'The expected XLS-only Alec Gonzalez shift is missing or incorrect');
    const canonical = rows => rows.map(entry => [entry.date, entry.name, entry.start, entry.end, entry.role].join('|')).sort().join('\n');
    const allHash = crypto.createHash('sha256').update(canonical(matched)).digest('hex');
    const pdfReferenceHash = crypto.createHash('sha256').update(canonical(matched.filter(entry => entry.name !== 'Alec Gonzalez'))).digest('hex');
    assert(allHash === '1d855638d033c1a0115310e3f920f5ee305994e93e316ae76566923d174ad301', 'One or more 7/15 XLS names, times, or roles changed from the verified 81-row source');
    assert(pdfReferenceHash === '915c5a4425298bca9cd6b69c8189a075c589a6d2a5aa988864bd58e983970777', 'The 80 PDF-backed shifts no longer match the verified same-day Schedule Exchange roster');
  }
}

async function run() {
  await testMorningPayloadScope();
  await testWhiparoundIdentitySafety();
  await testStalePaycomAndRosterReconciliation();
  await testReportClassHtmlXls();
  console.log('Release workflow regression contracts passed');
}

run().catch(error => { console.error(error); process.exitCode = 1; });
