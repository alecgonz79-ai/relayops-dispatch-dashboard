const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function appContext() {
  const app = { innerHTML: '' }, fileInput = { addEventListener() {}, click() {} }, storage = new Map();
  const element = () => ({ addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {}, classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {}, focus() {}, blur() {}, setSelectionRange() {}, click() {}, querySelector() { return null; }, querySelectorAll() { return []; } });
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
    navigator: { clipboard: { writeText: async () => true } },
    window: { scrollTo() {}, open() {}, addEventListener() {}, removeEventListener() {}, print() {} },
    localStorage: { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key) },
    document: { body: { appendChild() {}, classList: { add() {}, remove() {} } }, documentElement: { style: { setProperty() {}, removeProperty() {} } }, activeElement: null, getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null, querySelector: () => null, querySelectorAll: () => [], createElement: element, addEventListener() {}, removeEventListener() {} }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{}; render=()=>{}; persist=()=>{};', context);
  return context;
}

function testPicklistClearUndoRedoAndScope() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';state.fitMorningRows=true;state.openingPicklistWaveSlots=5;state.openingPicklistShowAdhoc=true;
    state.morningRoutes=[
      {routeUid:'uid-a',dsp:'LLOL',driver:'First Driver',route:'CX100',wave:'11:15 AM',service:'Standard Parcel',ev:'1'},
      {routeUid:'uid-b',dsp:'LLOL',driver:'Second Driver',route:'CX100',wave:'11:20 AM',service:'Standard Parcel',ev:'2'},
      {routeUid:'uid-helper',dsp:'LLOL',driver:'Helper Driver',route:'HELPER',wave:'Helper',service:'Driver Helper',ev:'H1'},
      {routeUid:'uid-other',dsp:'OTHER',driver:'Other DSP',route:'ZZ100',wave:'11:15 AM',service:'Standard Parcel',ev:'9'}
    ];
    state.callOffDriverKeys={'2026-07-16|today':{name:'Today Calloff'},'2026-07-15|prior':{name:'Prior Calloff'}};
    state.callOffReasons={'2026-07-16|today':'Sick','2026-07-15|prior':'Old'};
    state.scheduleBackupRecords={'2026-07-16|backup':{name:'Today Backup'},'2026-07-15|prior':{name:'Prior Backup'}};
    state.scheduleDriverMarks={'2026-07-16|backup':'backup','2026-07-16|other':'adhoc','2026-07-15|prior':'backup'};
    state.openingPicklistTopics=['Safety'];state.openingPicklistNotes='Keys';state.openingPicklistCalloffRows=9;state.openingPicklistTopicRows=7;state.openingPicklistBackupRows=25;state.sheetHistory={past:[],future:[]};
    action('clear-picklist',{});
    globalThis.__confirmHtml=modal();globalThis.__beforeConfirm=state.morningRoutes.map(row=>row.routeUid);
    action('confirm-clear-operational-sheet',{});
    globalThis.__afterClear={uids:state.morningRoutes.map(row=>row.routeUid),calloffs:{...state.callOffDriverKeys},reasons:{...state.callOffReasons},backups:{...state.scheduleBackupRecords},marks:{...state.scheduleDriverMarks},topics:[...state.openingPicklistTopics],notes:state.openingPicklistNotes,rows:[state.openingPicklistCalloffRows,state.openingPicklistTopicRows,state.openingPicklistBackupRows],past:state.sheetHistory.past.length};
    undoSheetChange();globalThis.__afterUndo={uids:state.morningRoutes.map(row=>row.routeUid),calloffs:{...state.callOffDriverKeys},backups:{...state.scheduleBackupRecords},marks:{...state.scheduleDriverMarks},notes:state.openingPicklistNotes,rows:[state.openingPicklistCalloffRows,state.openingPicklistTopicRows,state.openingPicklistBackupRows],future:state.sheetHistory.future.length};
    redoSheetChange();globalThis.__afterRedo={uids:state.morningRoutes.map(row=>row.routeUid),future:state.sheetHistory.future.length};
  `, context);
  assert(context.__confirmHtml.includes('2 visible Picklist route rows') && context.__confirmHtml.includes('Helper/DSP-only Morning rows stay in place') && context.__confirmHtml.includes('Undo protection is on'), 'Picklist clear confirmation must state exact route and preservation scope');
  assert(context.__beforeConfirm.join(',') === 'uid-a,uid-b,uid-helper,uid-other', 'Opening the clear confirmation must not mutate routes');
  assert(context.__afterClear.uids.join(',') === 'uid-helper,uid-other', 'Picklist clear must remove only visible Picklist route UIDs');
  assert(!context.__afterClear.calloffs['2026-07-16|today'] && context.__afterClear.calloffs['2026-07-15|prior'], 'Picklist clear must reset only current-date calloffs');
  assert(!context.__afterClear.backups['2026-07-16|backup'] && context.__afterClear.backups['2026-07-15|prior'], 'Picklist clear must reset only current-date backups');
  assert(context.__afterClear.marks['2026-07-16|other'] === 'adhoc' && !context.__afterClear.marks['2026-07-16|backup'], 'Picklist clear must preserve non-backup roster marks');
  assert(context.__afterClear.notes === '' && context.__afterClear.rows.join(',') === '6,4,21' && context.__afterClear.past === 1, 'Picklist clear must reset editable side boxes and create one history entry');
  assert(context.__afterUndo.uids.join(',') === 'uid-a,uid-b,uid-helper,uid-other' && context.__afterUndo.notes === 'Keys' && context.__afterUndo.rows.join(',') === '9,7,25', 'Undo must restore exact routes and Picklist side-box state');
  assert(context.__afterUndo.calloffs['2026-07-16|today'] && context.__afterUndo.backups['2026-07-16|backup'] && context.__afterUndo.marks['2026-07-16|backup'] === 'backup', 'Undo must restore date-scoped calloff and backup state');
  assert(context.__afterRedo.uids.join(',') === 'uid-helper,uid-other' && context.__afterRedo.future === 0, 'Redo must safely reapply the clear');
}

function testMorningClearAndRouteUidVehicleClear() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';state.fitMorningRows=true;state.sheetHistory={past:[],future:[]};
    state.morningRoutes=[
      {routeUid:'uid-visible',dsp:'LLOL',driver:'Visible Driver',route:'CX777',wave:'11:15 AM',service:'Standard Parcel',ev:'1',deviceName:'1',portable:'2'},
      {routeUid:'uid-duplicate',dsp:'LLOL',driver:'Duplicate Driver',route:'CX777',wave:'11:20 AM',service:'Standard Parcel',ev:'2',deviceName:'2',portable:'3'},
      {routeUid:'uid-other',dsp:'OTHER',driver:'Other DSP',route:'CX777',wave:'11:15 AM',service:'Standard Parcel',ev:'9'}
    ];
    state.morningFilters={wave:'11:15 AM',staging:'all',pad:'all'};clearMorningVehicleAssignments();
    globalThis.__vehicleClear=state.morningRoutes.map(row=>({uid:row.routeUid,ev:row.ev,device:row.deviceName,portable:row.portable}));
    state.morningFilters={wave:'all',staging:'all',pad:'all'};action('clear-morning-sheet',{});globalThis.__morningConfirm=modal();globalThis.__beforeMorning=state.morningRoutes.length;action('confirm-clear-operational-sheet',{});globalThis.__afterMorning={uids:state.morningRoutes.map(row=>row.routeUid),sections:morningSections(allMorningRows()).filter(section=>/^WAVE\\s*[1-5]$/.test(section.label)).map(section=>section.label),times:morningSections(allMorningRows()).filter(section=>/^WAVE\\s*[1-5]$/.test(section.label)).map(section=>morningWaveTimeText(section)),fit:state.fitMorningRows};undoSheetChange();globalThis.__morningUndo={uids:state.morningRoutes.map(row=>row.routeUid),fit:state.fitMorningRows};
  `, context);
  const visible = context.__vehicleClear.find(row => row.uid === 'uid-visible'), duplicate = context.__vehicleClear.find(row => row.uid === 'uid-duplicate');
  assert(!visible.ev && !visible.device && !visible.portable && duplicate.ev === '2', 'Filtered Clear EVs must mutate the selected route UID, not another duplicate CX route');
  assert(context.__morningConfirm.includes('All 2 current DSP route rows') && context.__beforeMorning === 3, 'Morning clear must confirm its all-current-DSP scope before mutation');
  assert(context.__afterMorning.uids[0] === 'uid-other' && context.__afterMorning.uids.length === 6, 'Morning clear must preserve other DSP rows and add exactly five blank current-DSP wave anchors');
  assert(context.__afterMorning.sections.join(',') === 'WAVE 1,WAVE 2,WAVE 3,WAVE 4,WAVE 5', 'Morning clear must retain all five core wave sections');
  assert(context.__afterMorning.times.every(value=>/\(0\)$/.test(value)) && context.__afterMorning.fit === false, 'Cleared wave footers must remain visible with zero drivers and the full blank template');
  assert(context.__morningUndo.uids.join(',') === 'uid-visible,uid-duplicate,uid-other' && context.__morningUndo.fit === true, 'Morning clear must be fully undoable, including Fit Rows state');
}

function testEditableWaveFooterAndGooglePayload() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-17';state.fitMorningRows=false;state.morningWaveTimeOverrides={};state.morningFilters={wave:'all',staging:'all',pad:'all'};state.sheetHistory={past:[],future:[]};
    state.morningRoutes=[{routeUid:'uid-wave-one',dsp:'LLOL',driver:'Driver One',route:'CX101',wave:'11:15 AM',service:'Standard Parcel',staging:'STG.V.1',padOverride:'A',stops:188,packages:322}];
    saveMorningEditCell({textContent:'11:17 (9)',dataset:{editField:'waveTime',editWave:'11:15 AM',editSection:'WAVE 1'}});
    const section=morningSections(allMorningRows()).find(item=>item.label==='WAVE 1'),payload=morningSheetsConnectorPayload(),meta=payload.sections.find(item=>item.label==='WAVE 1');
    state.editMode=true;
    globalThis.__waveFooter={routeWave:state.morningRoutes[0].wave,text:morningWaveTimeText(section),picklist:openingPicklistTime({key:'wave-1',label:'WAVE 1',wave:state.morningRoutes[0].wave,rows:section.rows}),metaWave:meta.wave,metaTime:meta.waveTime,rowTime:payload.rows[payload.rowTypes.indexOf('time')][0],html:morningSheetPage(),history:state.sheetHistory.past.length};
  `, context);
  assert(context.__waveFooter.routeWave === '11:17 AM', 'Editing a footer must update the operational wave time used by both sheets');
  assert(context.__waveFooter.text === '11:17 (9)' && context.__waveFooter.picklist === '11:17 (9)', 'Morning Sheet and Picklist must show the same editable time/driver-total footer');
  assert(context.__waveFooter.metaWave === '11:17 AM' && context.__waveFooter.metaTime === '11:17 (9)' && context.__waveFooter.rowTime === '11:17 (9)', 'Google Sheets connector must receive the exact edited footer value and wave time');
  assert(context.__waveFooter.html.includes('data-view-section="WAVE 1"') && context.__waveFooter.html.includes('data-edit-field="waveTime"') && context.__waveFooter.html.includes('Type the wave time and driver total'), 'Wave footer must be visibly editable in Morning Sheet edit mode');
  assert(context.__waveFooter.history === 1, 'Wave footer edits must create one undoable history record');
}

function testPrintScalingContract() {
  const context = appContext(), properties = new Map(), classes = new Set();
  const sheet = { scrollWidth: 1014, offsetWidth: 1014, scrollHeight: 2520, offsetHeight: 2520 }, frame = {};
  context.document.querySelector = selector => selector === '.opening-picklist-sheet' ? sheet : selector === '.opening-picklist-scroll' ? frame : null;
  context.document.documentElement.style = { setProperty: (key, value) => properties.set(key, value), removeProperty: key => properties.delete(key) };
  context.document.body.classList = { add: key => classes.add(key), remove: key => classes.delete(key) };
  context.window.addEventListener = () => {};context.window.removeEventListener = () => {};let printed = 0;context.window.print = () => { printed += 1; };context.setTimeout = () => 0;
  vm.runInContext('printOpeningPicklistOnePage()', context);
  const scale = Number(properties.get('--picklist-print-scale')), width = parseFloat(properties.get('--picklist-print-width')), height = parseFloat(properties.get('--picklist-print-height'));
  assert(printed === 1 && classes.has('printing-picklist'), 'Print action must set the one-page mode before opening the browser print prompt');
  assert(scale > 0 && scale < 1 && width <= 1000 && height <= 1530, 'Print action must scale both dimensions inside one tabloid page');
  const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
  assert(css.includes('@page { size:11in 17in; margin:.15in; }'), 'Picklist print must explicitly target portrait 11×17 paper');
  assert(css.includes('transform:scale(var(--picklist-print-scale,.72))') && css.includes('position:absolute!important') && css.includes('height:var(--picklist-print-height,1530px)'), 'Print CSS must remove the unscaled sheet from pagination and apply the measured scale');
}

testPicklistClearUndoRedoAndScope();
testMorningClearAndRouteUidVehicleClear();
testEditableWaveFooterAndGooglePayload();
testPrintScalingContract();
console.log('Sheet history, scoped clear, route UID, and one-page print contract checks passed.');
