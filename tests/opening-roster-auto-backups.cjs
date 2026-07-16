const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function appContext() {
  const app = { innerHTML: '' }, fileInput = { accept: '', addEventListener() {}, click() {} }, storage = new Map();
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

function testAutomaticVtoDestinations() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';state.scheduleFilter='all';
    state.morningRoutes=[{routeUid:'routed-rescue',dsp:'LLOL',driver:'Routed Rescue',route:'CX101',wave:'11:15 AM',service:'Standard Parcel'}];
    state.scheduleEntries=[
      {date:'7/16/2026',name:'Routed Rescue',start:'10:30 AM',end:'7:00 PM',role:'Rescue'},
      {date:'7/16/2026',name:'Unrostered Rescue',start:'10:30 AM',end:'7:00 PM',role:'Rescue'},
      {date:'7/16/2026',name:'Unrostered Associate',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Midshift Support',start:'12:00 PM',end:'8:30 PM',role:'Midshift'},
      {date:'7/16/2026',name:'Fleet Coordinator',start:'8:00 AM',end:'4:30 PM',role:'Fleet Coordinator/Rescue'}
    ];
    state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.scheduleStayHome={};state.scheduleStayHomeHistory={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};
    globalThis.__auto=automaticUnrosteredBackupRows();
    globalThis.__backups=currentBackupDriverRows();
    globalThis.__picklist=openingPicklistBackupRows();
    globalThis.__html=openingRosterScheduleHtml();
  `, context);
  assert(context.__auto.length === 2, 'Only unrostered Rescue and Delivery Associate driver shifts should auto-back up');
  assert(context.__auto.some(row => row.name === 'Unrostered Rescue' && row.vto === 'VTO 2'), 'Unrostered Rescue must auto-mark VTO 2');
  assert(context.__auto.some(row => row.name === 'Unrostered Associate' && row.vto === 'VTO 4'), 'Unrostered Delivery Associate must auto-mark VTO 4');
  assert(!context.__auto.some(row => row.name === 'Fleet Coordinator'), 'A Fleet Coordinator/Rescue dispatcher shift must not be misclassified as VTO 2');
  assert(context.__picklist.some(row => row.name === 'Unrostered Rescue' && row.vto === 'VTO 2') && context.__picklist.some(row => row.name === 'Unrostered Associate' && row.vto === 'VTO 4'), 'Automatic VTO rows must flow into the Picklist backup table');
  assert(context.__html.includes('VTO 2 · Rescue backups') && context.__html.includes('VTO 4 · Delivery Associate backups'), 'Opening Roster must render separate VTO 2 and VTO 4 destination boxes');
  assert(context.__html.includes('roster-bottom-destination scroll-roster') && context.__html.includes('data-roster-destination="vto2"') && context.__html.includes('data-roster-destination="vto4"'), 'VTO destination boxes must stay scrollable and expose destination actions');
  assert(context.__html.includes('data-action="open-roster-destination-actions"'), 'Non-PAYCOM roster names must open the destination action popup');
  const paycom = context.__html.split('All Scheduled driver shifts (PAYCOM)')[1].split('scheduled-section called-off')[0];
  assert(!paycom.includes('Unrostered Rescue') && !paycom.includes('Unrostered Associate') && paycom.includes('Midshift Support'), 'Automatic VTO drivers must leave PAYCOM while unclassified Midshift remains there');
  assert(!paycom.includes('roster-driver-action-trigger') || !paycom.match(/roster-driver-action-trigger[\s\S]{0,250}Midshift Support/), 'PAYCOM names must remain plain and must not open the destination popup');
}

function testDestinationPopupAndManualOverride() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';state.morningRoutes=[];
    state.scheduleEntries=[{date:'7/16/2026',name:'Casey Rescue',start:'10:30 AM',end:'7:00 PM',role:'Rescue'}];
    state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.scheduleStayHome={};state.scheduleStayHomeHistory={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};
    openRosterDestinationActions('Casey Rescue','Rescue','vto2','','10:30 AM',true);globalThis.__autoModal=modal();
    openRosterDestinationActions('Casey Rescue','Rescue','vto2','','10:30 AM',false);globalThis.__manualModal=modal();
    applyRosterDestinationAction('vto4');globalThis.__record=state.scheduleBackupRecords[scheduleDriverMarkKey('Casey Rescue')];globalThis.__rows=openingPicklistBackupRows();
  `, context);
  assert(context.__autoModal.includes('Automatic backup') && context.__autoModal.includes('Choose a different destination to override it'), 'Automatic VTO popup must explain why the driver was placed there');
  assert(!context.__autoModal.includes('Remove from backups'), 'Automatic VTO rows must not offer a no-op remove action');
  assert(context.__manualModal.includes('Remove from backups'), 'Manual backup rows must offer a return action');
  assert(context.__manualModal.includes('Move to VTO 4 · Delivery Associate') && context.__manualModal.includes('Add as Adhoc'), 'Destination popup must expose the common roster moves');
  assert(context.__record.vto === 'VTO 4' && context.__rows.some(row => row.name === 'Casey Rescue' && row.vto === 'VTO 4'), 'A manual VTO override must persist and stay in the correct Picklist column');
}

function testPicklistAndConnectorSurface() {
  const context = appContext();
  vm.runInContext(`
    state.morningOperationDate='2026-07-16';state.scheduleEntries=[];state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.callOffDriverKeys={};state.callOffReasons={};
    globalThis.__right=openingPicklistRightHtml();
    state.page='morning';globalThis.__morningTop=topbar();
    state.page='roster';globalThis.__rosterTop=topbar();
  `, context);
  assert(context.__right.includes('picklist-date') && !context.__right.includes('picklist-side-filler'), 'Picklist must retain its date and remove the unused boxes beneath it');
  assert(context.__morningTop.includes('connector-settings-icon') && context.__morningTop.includes('data-action="morning-sheets-connector"'), 'Connector Settings must remain in the Morning Sheet top bar');
  assert(!context.__rosterTop.includes('connector-settings-icon'), 'Connector Settings must remain scoped to Morning Sheet');
  const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
  assert(css.includes('.scheduled-section.roster-bottom-destination .scheduled-list { max-height:250px; overflow:auto;'), 'Both bottom VTO destination boxes must have a bounded scroll area');
  assert(css.includes('.roster-driver-action-trigger') && css.includes('.roster-destination-actions'), 'Roster name actions and their popup must have dedicated UI styling');
  assert(!css.includes('.picklist-side-filler'), 'Removed Picklist filler must not remain in display or print CSS');
}

testAutomaticVtoDestinations();
testDestinationPopupAndManualOverride();
testPicklistAndConnectorSurface();
console.log('Opening Roster automatic VTO, destination actions, Picklist, and Connector Settings contracts passed.');
