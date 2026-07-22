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
      {date:'7/16/2026',name:'Pilot Rescue Support',start:'12:00 PM',end:'8:30 PM',role:'Pilot/Rescues'},
      {date:'7/16/2026',name:'Modified Duty Support',start:'12:00 PM',end:'8:30 PM',role:'Modified duty/Rescues'},
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
  assert(!context.__auto.some(row => /Pilot Rescue|Modified Duty/.test(row.name)), 'Pilot/Rescues and Modified Duty shifts must never become automatic VTO backups');
  assert(context.__picklist.some(row => row.name === 'Unrostered Rescue' && row.vto === 'VTO 2') && context.__picklist.some(row => row.name === 'Unrostered Associate' && row.vto === 'VTO 4'), 'Automatic VTO rows must flow into the Picklist backup table');
  assert(context.__html.includes('VTO 2 · Rescue backups') && context.__html.includes('VTO 4 · Delivery Associate backups'), 'Opening Roster must render separate VTO 2 and VTO 4 destination boxes');
  assert(context.__html.includes('roster-bottom-destination scroll-roster') && context.__html.includes('data-roster-destination="vto2"') && context.__html.includes('data-roster-destination="vto4"'), 'VTO destination boxes must stay scrollable and expose destination actions');
  assert(context.__html.includes('data-action="open-roster-destination-actions"'), 'Non-PAYCOM roster names must open the destination action popup');
  const paycom = context.__html.split('All Scheduled driver shifts (PAYCOM)')[1].split('scheduled-section called-off')[0];
  assert(paycom.includes('Unrostered Rescue') && paycom.includes('Unrostered Associate') && paycom.includes('Midshift Support') && paycom.includes('Routed Rescue'), 'All Scheduled must retain every imported driver even after VTO or route placement');
  assert(paycom.includes('data-paycom-tab="scheduled"') && paycom.includes('data-paycom-tab="unmarked"') && paycom.includes('data-paycom-tab="marked"') && paycom.includes('All Scheduled') && paycom.includes('Unmarked Drivers') && paycom.includes('Marked Drivers'), 'PAYCOM must expose All Scheduled, Unmarked Drivers, and Marked Drivers inner tabs');
  assert(!paycom.includes('Pilot Rescue Support') && !paycom.includes('Modified Duty Support') && context.__html.includes('Pilot Rescue Support') && context.__html.includes('Modified Duty Support'), 'Pilot/Rescues and Modified Duty must move out of the driver PAYCOM list and into Other scheduled shifts');
  assert(!paycom.includes('roster-driver-action-trigger') || !paycom.match(/roster-driver-action-trigger[\s\S]{0,250}Midshift Support/), 'PAYCOM names must remain plain and must not open the destination popup');
}

function testMarkedDriversInnerTab() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';state.scheduleFilter='all';state.openingRosterPaycomTab='marked';
    state.morningRoutes=[
      {routeUid:'route-main',dsp:'LLOL',driver:'Route Driver',route:'CX201',wave:'11:15 AM',service:'Standard Parcel'},
      {routeUid:'route-adhoc',dsp:'LLOL',driver:'Adhoc Driver',route:'AX',wave:'Ad hoc',service:'Adhoc'}
    ];
    state.scheduleEntries=[
      {date:'7/16/2026',name:'Route Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Adhoc Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Backup Rescue',start:'10:30 AM',end:'7:00 PM',role:'Rescue'},
      {date:'7/16/2026',name:'Backup Associate',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Reduction Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Calloff Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Stay Home Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Helper Driver',start:'10:30 AM',end:'7:00 PM',role:'Driver Helper'},
      {date:'7/16/2026',name:'Plain Midshift',start:'12:00 PM',end:'8:30 PM',role:'Midshift'}
    ];
    state.scheduleDriverMarks={'2026-07-16|adhoc driver':'adhoc'};state.scheduleBackupRecords={};
    state.scheduleStayHome={'2026-07-16|stay home driver':{name:'Stay Home Driver',role:'Delivery Associate'}};
    state.scheduleReductions={'2026-07-16|reduction driver':{name:'Reduction Driver',role:'Delivery Associate',originalRoute:'CX299'}};
    state.scheduleHelpers={};
    state.callOffDriverKeys={'2026-07-16|calloff driver':{name:'Calloff Driver',role:'Delivery Associate',route:'CX288'}};state.callOffReasons={};
    globalThis.__marked=openingRosterMarkedDrivers({
      scheduled:currentScheduleEntries().filter(entry=>scheduleRoleGroup(entry.role)==='driver'),
      onRoute:[{name:'Route Driver',route:'CX201',start:'11:15 AM'},{name:'Adhoc Driver',route:'AX',start:'Ad hoc'}],
      backups:currentBackupDriverRows(),stayHome:rosterStatusRows(state.scheduleStayHome),reductions:rosterStatusRows(state.scheduleReductions),
      calledOff:rosterStatusRows(state.callOffDriverKeys),helpers:helperRosterRows()
    });
    globalThis.__unmarked=openingRosterUnmarkedDrivers(currentScheduleEntries().filter(entry=>scheduleRoleGroup(entry.role)==='driver'),globalThis.__marked);
    globalThis.__html=openingRosterScheduleHtml();
    action('opening-paycom-tab',{dataset:{paycomTab:'unmarked'}});globalThis.__tab=state.openingRosterPaycomTab;globalThis.__saved=localStorage.getItem('relayops_opening_roster_paycom_tab');globalThis.__unmarkedHtml=openingRosterScheduleHtml();globalThis.__unmarkedPaycom=globalThis.__unmarkedHtml.split('All Scheduled driver shifts (PAYCOM)')[1].split('scheduled-section called-off')[0];
  `, context);
  const statusByName = Object.fromEntries(context.__marked.map(row => [row.name, row.statusLabel]));
  assert(statusByName['Route Driver'] === 'On Route' && statusByName['Adhoc Driver'] === 'Adhoc', 'Marked Drivers must identify route and Adhoc placements');
  assert(statusByName['Backup Rescue'] === 'VTO 2' && statusByName['Backup Associate'] === 'VTO 4', 'Marked Drivers must distinguish VTO 2 and VTO 4');
  assert(statusByName['Reduction Driver'] === 'Reduction' && statusByName['Calloff Driver'] === 'Called Off' && statusByName['Stay Home Driver'] === 'Told To Stay Home', 'Marked Drivers must show reduction, call-off, and stay-home destinations');
  assert(statusByName['Helper Driver'] === 'Helper' && !statusByName['Plain Midshift'], 'Helper must appear while an unmarked scheduled shift stays out of Marked Drivers');
  assert(context.__html.includes('data-paycom-pane="marked"') && context.__html.includes('aria-selected="true" data-action="opening-paycom-tab" data-paycom-tab="marked"'), 'Marked Drivers must render as the active accessible inner tab');
  ['marked-driver-route','marked-driver-adhoc','marked-driver-vto2','marked-driver-vto4','marked-driver-reduction','marked-driver-called-off','marked-driver-stay-home','marked-driver-helper'].forEach(className=>assert(context.__html.includes(className), `${className} color status is missing`));
  assert(!context.__html.includes('Plain Midshift'), 'Marked Drivers pane must omit unmarked scheduled shifts');
  assert(context.__unmarked.length === 1 && context.__unmarked[0].name === 'Plain Midshift', 'Unmarked Drivers must identify every route-eligible PAYCOM shift without a destination');
  assert(context.__unmarkedPaycom.includes('data-paycom-pane="unmarked"') && context.__unmarkedPaycom.includes('Plain Midshift') && !context.__unmarkedPaycom.includes('Route Driver'), 'Unmarked Drivers pane must show only drivers still needing a roster decision');
  assert(context.__tab === 'unmarked' && context.__saved === 'unmarked', 'Unmarked PAYCOM inner-tab selection must persist locally');
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
  assert(context.__autoModal.includes('Swap To Route') && context.__manualModal.includes('Swap To Route'), 'Both automatic and manual VTO destination popups must offer Swap To Route');
  assert(context.__manualModal.includes('Move to VTO 4 · Delivery Associate') && context.__manualModal.includes('Add as Adhoc'), 'Destination popup must expose the common roster moves');
  assert(context.__record.vto === 'VTO 4' && context.__rows.some(row => row.name === 'Casey Rescue' && row.vto === 'VTO 4'), 'A manual VTO override must persist and stay in the correct Picklist column');
}

function testRestoreIsSingleDestinationAndPicklistActions() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';state.morningRoutes=[];
    state.scheduleEntries=[{date:'7/16/2026',name:'Casey Rescue',start:'10:30 AM',end:'7:00 PM',role:'Rescue'}];
    state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.scheduleStayHome={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};state.openingPicklistBackupOverrides={'vto2:0':'Casey Rescue'};
    moveRosterDriverToVto('Casey Rescue','Rescue','VTO 2');
    globalThis.__before=currentBackupDriverRows().filter(row=>driverIdentityKey(row.name)===driverIdentityKey('Casey Rescue')).length;
    restoreRosterStatus('Casey Rescue','backup');
    globalThis.__after=currentBackupDriverRows().filter(row=>driverIdentityKey(row.name)===driverIdentityKey('Casey Rescue')).length;
    globalThis.__mark=dailyRosterMark('Casey Rescue');
    globalThis.__override=Object.values(state.openingPicklistBackupOverrides).includes('Casey Rescue');
    globalThis.__restoredHtml=openingRosterScheduleHtml();
    moveRosterDriverToVto('Casey Rescue','Rescue','VTO 2');
    globalThis.__picklistActions=openingPicklistRightHtml();
    applyPicklistVtoAction('Casey Rescue','Rescue','calloff');
    globalThis.__calledOff=rosterStatusRows(state.callOffDriverKeys,'Called off');
    globalThis.__calledOffHtml=openingRosterScheduleHtml();
  `, context);
  assert(context.__before === 1, 'A driver identity must have only one VTO record before restore');
  assert(context.__after === 0 && context.__mark === 'paycom', 'Restore must suppress automatic VTO recreation and return the driver to PAYCOM');
  assert(context.__override === false, 'Restore must clear a matching saved Picklist backup cell');
  const paycom = context.__restoredHtml.split('All Scheduled driver shifts (PAYCOM)')[1].split('scheduled-section called-off')[0];
  assert((paycom.match(/data-roster-name="casey rescue"/g)||[]).length === 1, 'Restored driver must appear exactly once in the PAYCOM list');
  assert(context.__picklistActions.includes('picklist-vto-actions') && context.__picklistActions.includes('data-vto-target="calloff"') && context.__picklistActions.includes('data-vto-target="reduction"') && context.__picklistActions.includes('data-vto-target="stay-home"'), 'Picklist VTO names must expose the scrollable destination action controls');
  assert(context.__picklistActions.includes('data-action="open-vto-route-swap"') && context.__picklistActions.includes('Swap To Route'), 'Every populated Picklist VTO hover menu must expose Swap To Route');
  const styleSource=fs.readFileSync(require.resolve('../styles.css'),'utf8'),appSource=fs.readFileSync(require.resolve('../app.js'),'utf8');
  assert(styleSource.includes('.picklist-vto-driver.is-popup-open .picklist-vto-actions') && styleSource.includes('top:calc(100% - 1px)') && appSource.includes(".picklist-vto-driver.is-popup-open,.picklist-vto-driver.linger-open") && appSource.includes('setTimeout(()=>closeCard(card),700)'), 'Picklist VTO hover controls must bridge the cursor gap while keeping exactly one driver menu open');
  assert(context.__calledOff.length === 1 && context.__calledOff[0].name === 'Casey Rescue', 'A Picklist VTO action must move the driver to the selected destination exactly once');
  assert(context.__calledOffHtml.includes('roster-destination-called-off'), 'Destination rows must retain a visible status color class');
}

function testAtomicVtoToRouteSwap() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';
    state.morningRoutes=[{
      routeUid:'route-cx225',dsp:'LLOL',driver:'Primary Driver + Route Helper',route:'CX225',wave:'11:20 AM',service:'Standard Parcel with Helper',
      staging:'STG.V.4',pad:'B',padOverride:'B',ev:'EV12',deviceName:'12',portable:'13',stops:181,packages:333,plannedRts:'7:45 PM'
    }];
    state.scheduleEntries=[
      {date:'7/16/2026',name:'Primary Driver',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'},
      {date:'7/16/2026',name:'Casey Rescue',start:'10:30 AM',end:'7:00 PM',role:'Rescue'},
      {date:'7/16/2026',name:'Route Helper',start:'10:30 AM',end:'7:00 PM',role:'Driver Helper'}
    ];
    state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.scheduleStayHome={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};state.openingPicklistBackupOverrides={};
    moveRosterDriverToVto('Casey Rescue','Rescue','VTO 2');
    openVtoRouteSwap('Casey Rescue','Rescue','VTO 2');
    globalThis.__swapModal=modal();
    globalThis.__before=Object.fromEntries(ROUTE_DATA_PROTECTED_FIELDS.map(field=>[field,state.morningRoutes[0][field]]));
    globalThis.__result=performVtoRouteSwap('route-cx225');
    globalThis.__route=state.morningRoutes[0];
    globalThis.__after=Object.fromEntries(ROUTE_DATA_PROTECTED_FIELDS.map(field=>[field,state.morningRoutes[0][field]]));
    globalThis.__backups=currentBackupDriverRows();
  `, context);
  assert(context.__swapModal.includes('id="vto-route-swap-target"') && context.__swapModal.includes('Primary Driver · CX225') && context.__swapModal.includes('Confirm Swap To Route'), 'Swap To Route must open a scrollable route-driver picker with an explicit confirmation');
  assert(context.__result.ok === true, 'The selected VTO-to-route swap must complete atomically');
  assert(context.__route.driver === 'Casey Rescue + Route Helper', 'The VTO driver must replace only the primary while the existing helper remains attached');
  assert(JSON.stringify(context.__before) === JSON.stringify(context.__after), 'A VTO route swap must not alter route, staging, pad, wave, counts, or Planned RTS');
  assert(context.__backups.filter(row => row.name === 'Primary Driver' && row.vto === 'VTO 4').length === 1, 'The outgoing Delivery Associate must move exactly once to VTO 4');
  assert(!context.__backups.some(row => row.name === 'Casey Rescue'), 'The incoming route driver must be removed from VTO after the swap');
}

function testVtoSwapUsesRescueDestination() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-16';
    state.morningRoutes=[{routeUid:'route-cx240',dsp:'LLOL',driver:'Rescue Route Driver',route:'CX240',wave:'11:25 AM',service:'Standard Parcel',staging:'STG.P.4',stops:170,packages:290,plannedRts:'7:30 PM'}];
    state.scheduleEntries=[
      {date:'7/16/2026',name:'Rescue Route Driver',start:'10:30 AM',end:'7:00 PM',role:'Rescue'},
      {date:'7/16/2026',name:'Dana Associate',start:'10:30 AM',end:'7:00 PM',role:'Delivery Associate'}
    ];
    state.scheduleDriverMarks={};state.scheduleBackupRecords={};state.scheduleStayHome={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};state.openingPicklistBackupOverrides={};
    moveRosterDriverToVto('Dana Associate','Delivery Associate','VTO 4');
    openVtoRouteSwap('Dana Associate','Delivery Associate','VTO 4');
    globalThis.__result=performVtoRouteSwap('route-cx240');globalThis.__backups=currentBackupDriverRows();
  `, context);
  assert(context.__result.ok === true && context.__backups.some(row => row.name === 'Rescue Route Driver' && row.vto === 'VTO 2'), 'An outgoing Rescue shift must move to VTO 2 after the route swap');
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
testMarkedDriversInnerTab();
testDestinationPopupAndManualOverride();
testRestoreIsSingleDestinationAndPicklistActions();
testAtomicVtoToRouteSwap();
testVtoSwapUsesRescueDestination();
testPicklistAndConnectorSurface();
console.log('Opening Roster automatic VTO, destination actions, Picklist, and Connector Settings contracts passed.');
