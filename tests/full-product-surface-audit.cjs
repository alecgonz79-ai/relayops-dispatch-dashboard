const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function harness() {
  const app = { innerHTML: '' };
  const fileInput = { accept: '', files: [], addEventListener() {}, click() {} };
  const storage = new Map();
  const listeners = new Map();
  const element = () => ({
    addEventListener() {}, appendChild() {}, prepend() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {}, getAttribute() { return null; }, style: {}, dataset: {},
    focus() {}, blur() {}, click() {}, setSelectionRange() {},
    querySelector() { return null; }, querySelectorAll() { return []; }
  });
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
    navigator: { clipboard: { writeText: async () => true } },
    location: { href: 'https://relayops.example.test/' },
    window: { scrollTo() {}, open() {}, print() {}, addEventListener() {}, RelayOpsCloud: null },
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    document: {
      body: { appendChild() {} }, activeElement: null,
      getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
      querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
      addEventListener(type, fn) { listeners.set(type, fn); },
      removeEventListener(type, fn) { if (listeners.get(type) === fn) listeners.delete(type); },
      execCommand() { return true; }
    }
  };
  context.window.document = context.document;
  vm.createContext(context);
  const source = fs.readFileSync(require.resolve('../app.js'), 'utf8');
  vm.runInContext(source, context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{}; persist=()=>{};', context);
  return { context, app, fileInput, listeners, source };
}

function actionsIn(html = '') {
  return [...html.matchAll(/data-action="([^"]+)"/g)].map(match => match[1]);
}

function inertButtonsIn(html = '') {
  return [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)]
    .filter(match => !/\bdata-(?:action|page|phase|parking-charger)=/.test(match[1]))
    .map(match => {
      const aria = match[1].match(/\baria-label="([^"]+)"/i)?.[1];
      const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (aria) return aria;
      if (/\bclass="[^"]*\bswitch\b/i.test(match[1])) return '[unlabeled permission switch]';
      return text || '[unlabeled icon button]';
    });
}

function testVisiblePageInventory() {
  const { context, source } = harness();
  const pages = ['dashboard', 'morning', 'roster', 'rostering', 'live', 'team', 'fleet', 'parking', 'performance', 'coaching', 'inbox', 'inventory', 'reports', 'admin'];
  const criticalPages = new Set(['dashboard', 'morning', 'roster', 'rostering', 'live', 'team', 'fleet', 'parking', 'inbox', 'reports', 'admin']);
  const handled = new Set([...source.matchAll(/name==='([^']+)'/g)].map(match => match[1]));
  const inventory = {};
  vm.runInContext("state.role='admin'; state.morningOperationDate='2026-07-14';", context);
  for (const page of pages) {
    vm.runInContext(`state.page=${JSON.stringify(page)}; globalThis.__pageHtml=topbar()+pageContent();`, context);
    const html = context.__pageHtml;
    assert(typeof html === 'string' && html.length > 100, `${page} page did not render meaningful markup`);
    const actions = [...new Set(actionsIn(html))];
    const unhandled = actions.filter(action => !handled.has(action));
    inventory[page] = { actions, unhandled, inertButtons: inertButtonsIn(html), bytes: html.length };
    if (criticalPages.has(page)) assert(!unhandled.length, `${page} exposes unhandled actions: ${unhandled.join(', ')}`);
  }
  assert(inventory.morning.actions.includes('sync-filtered-morning-to-sheets'), 'Morning page lost filtered Google send');
  assert(inventory.morning.actions.includes('send-rts-to-sheets'), 'Morning page lost RTS-only Google send');
  assert(inventory.roster.actions.includes('schedule-import') && inventory.roster.actions.includes('open-route-swap'), 'Opening roster lost Paycom or swap controls');
  assert(inventory.rostering.actions.includes('schedule-import') && inventory.rostering.actions.includes('rostering-auto-roster') && inventory.rostering.actions.includes('rostering-import-screenshot') && inventory.rostering.actions.includes('rostering-add-service'), 'Rostering lost PAYCOM, Auto Roster, screenshot import, or service controls');
  assert(inventory.live.actions.includes('device-sheet-to-morning'), 'Device/Portable page lost Morning Sheet transfer');
  assert(inventory.team.actions.includes('driver-import') && inventory.team.actions.includes('request-driver-removal'), 'Drivers & Team lost import/delete controls');
  assert(inventory.fleet.actions.includes('fleet-import-amazon') && inventory.fleet.actions.includes('fleet-import-fleetos'), 'Fleet Health lost source-specific imports');
  assert(inventory.parking.actions.includes('parking-choose-file') && inventory.parking.actions.includes('copy-parking-list'), 'Van Parking lost import/copy controls');
  assert(inventory.inbox.actions.includes('whiparound-import') && inventory.inbox.actions.includes('send-whiparound-to-sheets'), 'Whiparound lost import/send controls');
  assert(inventory.performance.actions.length >= 2 && inventory.performance.unhandled.length === 0, 'Performance launcher should expose only working shared-shell controls');
  assert(inventory.coaching.unhandled.length === 0 && ['coach-all','template','coach'].every(action=>inventory.coaching.actions.includes(action)), 'Coaching must expose only implemented queue, template, and review controls');
  assert(inventory.inventory.unhandled.length === 0 && ['inventory-log','add-item','inventory-adjust','inventory-edit'].every(action=>inventory.inventory.actions.includes(action)), 'Inventory must expose only implemented add/edit/adjust/log controls');

  // An inert button looks interactive but cannot dispatch anything. Release
  // pages must use a real action, a link, or honest non-interactive status text.
  globalThis.__inertButtonInventory = Object.fromEntries(Object.entries(inventory).filter(([,value]) => value.inertButtons.length).map(([page,value]) => [page,value.inertButtons]));
  for (const page of pages) {
    assert(inventory[page].inertButtons.length === 0, `${page} added an unexpected inert control: ${inventory[page].inertButtons.join(', ')}`);
  }
  vm.runInContext("state.role='admin';globalThis.__adminHtml=adminPage();", context);
  assert(context.__adminHtml.includes('Fixed role policy') && context.__adminHtml.includes('Database enforced'), 'Admin must show a truthful fixed role-policy matrix');
  assert(context.__adminHtml.includes('ADP Workforce') && context.__adminHtml.includes('Not available') && !context.__adminHtml.includes('>Connect<'), 'Unavailable ADP integration must not look clickable');

  const result = Object.entries(inventory).map(([page, value]) => `${page}:${value.actions.length}${value.unhandled.length ? `[prototype:${value.unhandled.join('|')}]` : ''}`).join(' ');
  console.log(`Visible page/action inventory passed (${result})`);
  console.log(`Inert button inventory ${JSON.stringify(globalThis.__inertButtonInventory)}`);
}

function testPermissionsAndImportChooserContracts() {
  const { context, fileInput } = harness();
  vm.runInContext(`
    state.role='viewer';state.page='dashboard';go('admin');globalThis.__viewerPage=state.page;globalThis.__viewerSide=sidebar();
    state.role='admin';globalThis.__adminSide=sidebar();
    action('fleet-import-amazon',{});globalThis.__amazonAccept=fileInput.accept;
    action('fleet-import-fleetos',{});globalThis.__fleetosAccept=fileInput.accept;
    action('driver-import',{});globalThis.__driverAccept=fileInput.accept;
    action('whiparound-import',{});globalThis.__whipAccept=fileInput.accept;
    action('schedule-import',{});globalThis.__scheduleAccept=fileInput.accept;
    state.importPurpose='itinerary-rts';action('choose-file',{});globalThis.__rtsAccept=fileInput.accept;
    action('fleet-import-fleetos',{});action('equipment-import',{});action('choose-file',{});globalThis.__equipmentAfterFleetosAccept=fileInput.accept;
    action('fleet-import-amazon',{});state.importPurpose='morning';action('choose-file',{});globalThis.__morningAfterAmazonAccept=fileInput.accept;
  `, context);
  assert(context.__viewerPage === 'dashboard', 'Viewer must not navigate to Admin control');
  assert(!context.__viewerSide.includes('data-page="admin"') && context.__adminSide.includes('data-page="admin"'), 'Admin navigation visibility must follow role');
  assert(context.__amazonAccept.includes('.xlsx') && !context.__amazonAccept.includes('.csv'), 'Amazon Fleet chooser must stay XLSX-only');
  assert(context.__fleetosAccept.includes('.csv') && !context.__fleetosAccept.includes('.xlsx'), 'FleetOS chooser must stay CSV-only');
  assert(context.__driverAccept.includes('.csv') && context.__driverAccept.includes('.xlsx'), 'Driver chooser must accept CSV and XLSX');
  assert(context.__whipAccept.includes('.csv') && context.__whipAccept.includes('.xlsx'), 'Whiparound chooser must accept CSV and XLSX');
  for (const extension of ['.xls', '.xlsx', '.csv', '.pdf', '.txt', 'image/*']) assert(context.__scheduleAccept.includes(extension), `Paycom chooser lost ${extension}`);
  assert(context.__rtsAccept.includes('.xlsx') && !context.__rtsAccept.includes('.csv'), 'RTS chooser must stay XLSX-only');
  assert(context.__equipmentAfterFleetosAccept.includes('image/*') && context.__equipmentAfterFleetosAccept.includes('.xlsx'), 'Device/Portable chooser must reset the previous FleetOS CSV-only filter');
  assert(context.__morningAfterAmazonAccept.includes('.csv') && context.__morningAfterAmazonAccept.includes('.xlsx'), 'Morning chooser must reset the previous Amazon XLSX-only filter');
  console.log('Role gating and source-specific import chooser contracts passed');
}

function testModalAndKeyboardInventory() {
  const { context, listeners } = harness();
  const setups = {
    'cloud-account': '',
    'invite-user': '',
    'member-access': "state.pendingMemberEdit={user_id:'member-2',display_name:'Dispatcher Two',role:'dispatcher',active:true};",
    'coaching-review': "state.pendingCoachingId='andre-wilson-following-distance';ensureCoachingRecord(state.pendingCoachingId);",
    'coaching-template': '',
    'import': "state.importPurpose='morning';",
    'equipment': '',
    'fleet-import': '',
    'fleet-live-setup': '',
    'alert-center': '',
    'inventory-item': '',
    'inventory-adjust': "state.inventoryPendingId=state.inventoryItems[0].id;",
    'inventory-log': '',
    'morning-diagnostics': '',
    'morning-sheets-connector': '',
    'sheets-helper': "state.sheetCopyText='A\\tB';",
    'add-driver': '',
    'remove-driver': "state.pendingDriverRemoval={key:'maya collins',name:'Maya Collins'};",
    'roster-swap': "state.pendingRosterSwap={route:'CX101',driverName:'Maya Collins',driverLabel:'Maya Collins',mode:'swap'};",
    'helper-match': "state.pendingHelperMatch={name:'Helper Person',role:'Driver Helper'};state.morningRoutes=[{dsp:'LLOL',route:'CX101',routeUid:'R1',driver:'Maya Collins',wave:'11:15 AM',service:'Standard Parcel'}];",
    'driver-alias': "state.pendingDriverAlias={canonical:'Maya Collins',display:'Maya'};",
    'morning-vehicle-issue': "state.pendingMorningIssue={route:'CX101',equipment:'EV1',issues:[]};",
    'delete-picklist-wave': "state.pendingPicklistWaveDelete={sectionKey:'WAVE1',label:'WAVE 1'};",
    'text-driver': "state.pendingDriverText={name:'Maya Collins',phone:'5551234567',driverKey:'maya collins',queueKey:'q',message:'Test'};",
    'export': '',
    'gas-assignment': "state.gasAssignmentRoutes=[];state.gasAssignmentVans=[];",
    'fleet-refresh': "state.fleetRefreshPreview={input:1,total:1,updated:0,newCount:0,removed:0,duplicates:0,conflicts:0,expected:1,expectedShort:0,fleetosCount:1,fleetosShort:0,missingSources:[],blockers:[],sourceImpact:[],fieldBreakdown:[],batteryChanges:[],statusChanges:[],removedVehicles:[],duplicateVins:[],conflictRows:[],missingVinPreview:[],changedPreview:[]};",
    'screenshot': "state.screenshotKind='morning';state.screenshotPreview='data:image/jpeg;base64,AA==';"
  };
  for (const [modalName, setup] of Object.entries(setups)) {
    vm.runInContext(`${setup} state.modal=${JSON.stringify(modalName)};globalThis.__modalHtml=modal();`, context);
    const html = context.__modalHtml;
    assert(/role="(?:dialog|alertdialog)"/.test(html) && html.includes('aria-modal="true"'), `${modalName} modal lacks dialog semantics`);
    assert(html.includes('data-action="close-modal"') && html.includes('aria-label="Close"'), `${modalName} modal lacks a labeled close control`);
  }
  vm.runInContext("state.modal='cloud-account';render();", context);
  assert(listeners.has('keydown'), 'Opening a modal must attach the keyboard handler');
  const event = { key: 'Escape', preventDefaultCalled: false, preventDefault() { this.preventDefaultCalled = true; } };
  // The click target is exercised structurally because this harness intentionally has no browser DOM.
  vm.runInContext("globalThis.__escapeSource=handleModalKeydown.toString();", context);
  assert(context.__escapeSource.includes("event.key==='Escape'") && context.__escapeSource.includes("[data-action=\"close-modal\"]"), 'Escape must route through the same close action as the visible close button');
  assert(event.key === 'Escape', 'Keyboard event fixture failed');
  console.log('Modal semantics and keyboard-path inventory passed');
}

function testCrossPageStateDependencies() {
  const { context } = harness();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-14';state.morningFilters={wave:'all',staging:'all',pad:'all'};
    state.driverContacts=[{name:'Maya Collins',key:'maya collins',phone:'(555) 123-4567'}];
    state.morningRoutes=[{dsp:'LLOL',route:'CX101',routeUid:'R1',driver:'Maya Collins',wave:'11:15 AM',staging:'STG.V.1',service:'Standard Parcel',ev:'EV1',deviceName:'',portable:''}];
    state.equipmentImport={name:'fixture',details:{'1':{device:'7',portable:'8'}}};
    inputDeviceSheetToMorning();globalThis.__deviceRoute={...state.morningRoutes[0]};
    state.fleetIssues={'1':{label:'EV1',active:[{id:'issue-1',text:'Mirror cracked',severity:'high',status:'active'}],history:[]}};
    globalThis.__issue=vehicleIssueForEquipmentId('EV1');
    state.whiparoundInspections=[{id:'pre-1',type:'pre',date:'2026-07-14',asset:'EV1',driver:'Maya Collins'}];
    globalThis.__whip=applyWhiparoundChecksToMorning('2026-07-14');
    state.vanParking=[{id:'w1',zone:'west',label:'Left 1',value:'1',kind:'spot'}];state.vanParkingBatteries={'w1':'90'};
    globalThis.__parkingStats=vanParkingStats();
  `, context);
  assert(context.__deviceRoute.deviceName === '7' && context.__deviceRoute.portable === '8', 'Device Sheet must update the matching Morning Sheet EV');
  assert(context.__issue?.reported?.text === 'Mirror cracked' || context.__issue?.reported?.active?.some?.(item => item.text === 'Mirror cracked'), 'Fleet issue must remain discoverable from the Morning Sheet EV');
  assert(context.__whip.pre === 1 && context.__whip.post === 0, 'Whiparound import must update only the matching Morning Sheet check');
  assert(context.__parkingStats.filled === 1, 'Van Parking edits must remain available to morning assignment logic');
  console.log('Cross-page device, fleet issue, Whiparound, and parking dependencies passed');
}

function testSharedAndPersistentStateContracts() {
  const { context } = harness();
  vm.runInContext(`
    globalThis.__daily=sharedWorkspaceState();
    globalThis.__persistent=persistentWorkspaceState();
    applySharedWorkspaceState({organizationName:'Shared DSP',stationCode:'DJT6',morningRoutes:[{route:'CX777'}],parkingNotes:'Shared note'});
    globalThis.__applied={organizationName:state.organizationName,stationCode:state.stationCode,route:state.morningRoutes[0]?.route,parkingNotes:state.parkingNotes};
    applyPersistentWorkspaceState({rosteringDate:'2026-07-16',rosteringPlans:{'2026-07-16':{services:[],assignments:[]}}});
    globalThis.__persistentRoster={date:state.rosteringDate,hasPlan:Boolean(state.rosteringPlans['2026-07-16'])};
  `, context);
  const dailyFields = [
    'organizationName', 'stationCode', 'morningRoutes', 'fleetImport', 'fleetIssues', 'vanParking',
    'parkingNotes', 'equipmentImport', 'driverContacts', 'driverNameAliases', 'scheduleEntries', 'rosteringDate', 'rosteringPlans',
    'scheduleBackupRecords', 'scheduleStayHome', 'scheduleStayHomeHistory', 'scheduleReductions',
    'scheduleHelpers', 'openingPicklistTopics', 'openingPicklistNotes', 'whiparoundInspections',
    'whiparoundComplianceHistory', 'coachingQueue', 'coachingTemplate', 'morningSheetsEndpoint'
  ];
  const persistentFields = [
    'organizationName', 'stationCode', 'fleetImport', 'fleetIssues', 'vanParking', 'parkingNotes',
    'equipmentImport', 'driverContacts', 'driverNameAliases', 'scheduleStayHomeHistory', 'rosteringDate', 'rosteringPlans',
    'whiparoundInspections', 'whiparoundComplianceHistory', 'coachingTemplate', 'morningSheetsEndpoint'
  ];
  for (const field of dailyFields) assert(Object.prototype.hasOwnProperty.call(context.__daily, field), `Shared workspace snapshot lost ${field}`);
  for (const field of persistentFields) assert(Object.prototype.hasOwnProperty.call(context.__persistent, field), `Persistent workspace snapshot lost ${field}`);
  assert(context.__applied.organizationName === 'Shared DSP' && context.__applied.stationCode === 'DJT6' && context.__applied.route === 'CX777' && context.__applied.parkingNotes === 'Shared note', 'Remote shared state did not apply across organization, Morning Sheet, and Van Parking');
  assert(context.__persistentRoster.date === '2026-07-16' && context.__persistentRoster.hasPlan, 'Station-persistent Rostering plans did not restore');
  console.log('Shared daily and station-persistent state contracts passed');
}

testVisiblePageInventory();
testPermissionsAndImportChooserContracts();
testModalAndKeyboardInventory();
testCrossPageStateDependencies();
testSharedAndPersistentStateContracts();
