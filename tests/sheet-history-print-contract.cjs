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
    state.morningFilters={wave:'all',staging:'all',pad:'all'};action('clear-morning-sheet',{});globalThis.__morningConfirm=modal();globalThis.__beforeMorning=state.morningRoutes.length;action('confirm-clear-operational-sheet',{});globalThis.__afterMorning=state.morningRoutes.map(row=>row.routeUid);undoSheetChange();globalThis.__morningUndo=state.morningRoutes.map(row=>row.routeUid);
  `, context);
  const visible = context.__vehicleClear.find(row => row.uid === 'uid-visible'), duplicate = context.__vehicleClear.find(row => row.uid === 'uid-duplicate');
  assert(!visible.ev && !visible.device && !visible.portable && duplicate.ev === '2', 'Filtered Clear EVs must mutate the selected route UID, not another duplicate CX route');
  assert(context.__morningConfirm.includes('All 2 current DSP route rows') && context.__beforeMorning === 3, 'Morning clear must confirm its all-current-DSP scope before mutation');
  assert(context.__afterMorning.join(',') === 'uid-other', 'Morning clear must preserve other DSP rows');
  assert(context.__morningUndo.join(',') === 'uid-visible,uid-duplicate,uid-other', 'Morning clear must be fully undoable');
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
testPrintScalingContract();
console.log('Sheet history, scoped clear, route UID, and one-page print contract checks passed.');
