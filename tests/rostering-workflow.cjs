const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function harness() {
  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const storage = new Map();
  const element = () => ({
    addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
    focus() {}, blur() {}, click() {}, querySelector() { return null; }, querySelectorAll() { return []; }
  });
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout,
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
      querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
      addEventListener() {}, removeEventListener() {}
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{};render=()=>{};persist=()=>{};', context);
  return context;
}

function run() {
  const context = harness();
  vm.runInContext(`
    state.page='rostering';state.rosteringDate='2026-07-15';state.rosteringPlans={};
    state.scheduleEntries=[
      {date:'7/15/2026',name:'Maya Collins',role:'Delivery Associate',start:'11:15 AM',end:'9:15 PM'},
      {date:'7/15/2026',name:'John Helper',role:'Driver Helper',start:'11:20 AM',end:'9:20 PM'},
      {date:'7/15/2026',name:'Nina Patel',role:'Rescue',start:'11:25 AM',end:'9:25 PM'},
      {date:'7/15/2026',name:'Rex Rescue',role:'Rescue',start:'11:30 AM',end:'9:30 PM'},
      {date:'7/15/2026',name:'Evan Stone',role:'Delivery Associate',start:'11:40 AM',end:'9:40 PM'},
      {date:'7/15/2026',name:'Riley Rookie',role:'Ride Along',start:'11:15 AM',end:'9:15 PM'},
      {date:'7/15/2026',name:'Terry Trainer',role:'Fleet Coordinator',start:'10:00 AM',end:'8:00 PM'}
    ];
    state.driverContacts=[
      {name:'Maya Collins',key:'maya collins'},{name:'John Helper',key:'john helper'},{name:'Nina Patel',key:'nina patel'},{name:'Rex Rescue',key:'rex rescue'},{name:'Evan Stone',key:'evan stone'}
      ,{name:'Riley Rookie',key:'riley rookie',transporterId:'RID-RILEY'},{name:'Terry Trainer',key:'terry trainer',transporterId:'RID-TERRY'}
    ];
    state.driverProfiles={};state.driverContacts.forEach(contact=>ensureDriverProfile(contact));toggleDriverCapability('Terry Trainer','trainer');
    const trainerProfile=driverProfileEntry('Terry Trainer').profile;trainerProfile.nickname='Coach T';trainerProfile.names.push('Coach T');
    const ridealongProfile=driverProfileEntry('Riley Rookie').profile;ridealongProfile.nickname='Riley R';ridealongProfile.names.push('Riley R');
    const mayaProfile=driverProfileEntry('Maya Collins').profile;mayaProfile.flags=DRIVER_NOTE_FLAGS.map(row=>row[0]);
    state.scheduleStayHomeHistory={
      '2026-07-12|maya collins':{name:'Maya Collins',date:'2026-07-12'},
      '2026-07-14|maya collins':{name:'Maya Collins',date:'2026-07-14'},
      '2026-07-10|nina patel':{name:'Nina Patel',date:'2026-07-10'},
      '2026-07-12|nina patel':{name:'Nina Patel',date:'2026-07-12'},
      '2026-07-14|nina patel':{name:'Nina Patel',date:'2026-07-14'},
      '2026-07-14|evan stone':{name:'Evan Stone',date:'2026-07-14'}
    };
    const plan=currentRosteringPlan();
    globalThis.__defaults={services:plan.services.length,confirmed:plan.services.reduce((n,s)=>n+s.confirmed,0),assignments:plan.assignments.length};
    globalThis.__samePlan=currentRosteringPlan()===plan;
    globalThis.__added=fillRosteringFromPaycom('',{silent:true});
    globalThis.__duplicateAdded=fillRosteringFromPaycom('',{silent:true});
    globalThis.__after={rostered:plan.assignments.filter(row=>row.associate).length,helpers:plan.assignments.filter(row=>row.associate==='John Helper').map(row=>plan.services.find(service=>service.id===row.serviceId)?.kind),mayaCount:rosteringStayHomeCount('Maya Collins'),ninaCount:rosteringStayHomeCount('Nina Patel'),evanCount:rosteringStayHomeCount('Evan Stone')};
    globalThis.__html=rosteringPage();
    globalThis.__pageInfoRostering=pageInfo.rostering;
    state.rosteringPlans={};state.rosteringAutoMode='abc';const autoPlan=currentRosteringPlan();globalThis.__autoResult=autoRosterFromPaycom({silent:true});
    globalThis.__autoRows=autoPlan.assignments.filter(row=>row.source==='auto-roster').map(row=>row.associate);
    globalThis.__autoHelpers=autoPlan.assignments.filter(row=>row.source==='auto-helper').map(row=>row.associate);
    globalThis.__donationAutoRows=autoPlan.assignments.filter(row=>row.serviceId==='xl-donations'&&row.associate).length;
    state.rosteringOpenServices['xl-donations']=true;globalThis.__donationHtml=rosteringServiceHtml(autoPlan.services.find(row=>row.id==='xl-donations'),autoPlan,new Set());
    globalThis.__orders={abc:rosteringOrderEntries([{name:'Charlie'},{name:'Alpha'},{name:'Bravo'}],'abc').map(row=>row.name),random:rosteringOrderEntries([{name:'Alpha'},{name:'Bravo'},{name:'Charlie'}],'random',()=>0).map(row=>row.name)};
    globalThis.__helperHtml=rosteringHelperShiftsHtml(autoPlan);
    state.scheduleEntries.push({date:'7/15/2026',name:'Uma Rescue',role:'Rescue',start:'11:45 AM',end:'9:45 PM'},{date:'7/15/2026',name:'Zora VTO Four',role:'Delivery Associate',start:'11:45 AM',end:'9:45 PM'},{date:'7/15/2026',name:'Morgan Midshift',role:'Midshift',start:'2:00 PM',end:'8:00 PM'});
    globalThis.__paycomHtml=rosteringPaycomHtml(autoPlan);globalThis.__backupEmail=rosteringBackupEmailText(autoPlan);globalThis.__backupGroups=rosteringUnrosteredBackupGroups(autoPlan);
    state.rosteringPaycomCategory='vto2';globalThis.__vto2PaycomHtml=rosteringPaycomHtml(autoPlan);state.rosteringPaycomCategory='all';
    state.scheduleEntries.push({date:'7/15/2026',name:'Riley R',role:'Training',start:'11:15 AM',end:'9:15 PM'});
    globalThis.__trainingHtml=rosteringTrainingHtml();globalThis.__trainingRidealongCount=[...new Map(scheduleEntriesForDate(state.rosteringDate).filter(entry=>isRidealongRole(entry.role)).map(entry=>[driverIdentityKey(entry.name),entry])).values()].length;
    assignRosteringTrainer('Riley R','Coach T');globalThis.__trainingMatch=state.rosteringTrainingMatches[rosteringTrainingKey('Riley Rookie')];globalThis.__matchedTrainingHtml=rosteringTrainingHtml();clearRosteringTrainerMatch('Riley R');globalThis.__swapCleared=!state.rosteringTrainingMatches[rosteringTrainingKey('Riley Rookie')];assignRosteringTrainer('Riley R','Coach T');
    trainerProfile.tags=[];globalThis.__staleTrainingHtml=rosteringTrainingHtml();trainerProfile.tags=['trainer'];
    globalThis.__roleGroups=['Ride Along','Ride-Along Shift','Training','Trainee','New Hire'].map(scheduleRoleGroup);
    const screenshotText=[
      'Standard Parcel - Extra Large Van - AMZ Donations - Default as station - 10 Hours 2 Confirmed 2 Rostered',
      '11:10 am Donation Placeholder Driver',
      'XL-US - Default as station - 10 Hours 3 Confirmed 3 Rostered',
      'Standard Parcel Electric - Rivian MEDIUM with Helper - Default as station - 10 Hours 4 Confirmed 4 Rostered',
      'Standard Parcel Electric - Rivian MEDIUM - Default as station - 10 Hours 40 Confirmed 40 Rostered',
      'Standard Parcel Electric - Rivian MEDIUM with Helper: Helper - Default as station - 10 Hours 4 Confirmed 4 Rostered',
      'Standard Parcel Electric - Rivian MEDIUM - Default as station - 10 Hours 40 Confirmed 40 Rostered',
      'Confirmed Routes',
      'Confirmed Services',
      '11:15 am Bulk Import Associates 2',
      '11:15 am Maya Collins +19511234567 Riverside (DJT6) - Amazon.com',
      'No Route Generated',
      '11:20 am Nina Patel +19517654321 Riverside (DJT6) - Amazon.com CX101'
    ].join('\\n');
    globalThis.__screenshotPlan=rosteringPlanFromScreenshotText(screenshotText,'amazon-roster.png');
    globalThis.__screenshotSummary={services:__screenshotPlan.services.length,xlUs:__screenshotPlan.services.find(row=>row.id==='xl-us')?.confirmed,medium:__screenshotPlan.services.find(row=>row.id==='rivian-medium')?.confirmed,associates:__screenshotPlan.assignments.filter(row=>row.associate).map(row=>({name:row.associate,route:row.route})),source:__screenshotPlan.importName};
    const clearPlan=currentRosteringPlan(),clearService=clearPlan.services.find(row=>row.id==='rivian-medium'),clearRows=clearPlan.assignments.filter(row=>row.serviceId===clearService.id),clearRow=clearRows.find(row=>row.associate)||clearRows[0];clearRow.associate='Maya Collins';clearRow.route='CX909';clearRow.role='Delivery Associate';clearRosteringAssociate(clearRow.id);globalThis.__singleClear={associate:clearRow.associate,route:clearRow.route,confirmed:clearService.confirmed,rows:clearRows.length};clearRows.slice(0,2).forEach((row,index)=>{row.associate=index?'Nina Patel':'Maya Collins';row.route='CX91'+index;});clearRosteringServiceAssociates(clearService.id);globalThis.__serviceClear={names:clearRows.map(row=>row.associate),routes:clearRows.slice(0,2).map(row=>row.route),confirmed:clearService.confirmed,rows:clearRows.length};
    globalThis.__flagLabels=driverFlagSummary('Maya Collins');globalThis.__notesHtml=rosteringDriverNotesHtml();
    state.pendingDriverFlags='Maya Collins';state.modal='driver-flags';globalThis.__flagsModal=modal();state.modal=null;state.pendingDriverFlags=null;globalThis.__rosteringFlagHtml=rosteringAssignmentRowHtml({id:'flag-row',serviceId:'rivian-medium',start:'11:15 AM',associate:'Maya Collins',route:'CX777',role:'Delivery Associate'});
    state.morningRoutes=[{routeUid:'flag-route',dsp:state.dspCode,route:'CX777',driver:'Maya Collins + John Helper',wave:'11:15 AM',staging:'STG.V.1',ev:'1'}];state.morningFilters={dsp:'all',wave:'all',staging:'all',pad:'all'};globalThis.__morningFlagHtml=morningSheetPage();globalThis.__picklistFlagHtml=openingPicklistHtml();
    globalThis.__nav={sections:NAV.map(group=>group.section),achatSection:NAV.find(group=>group.items.some(item=>item[0]==='achat'))?.section,achatIndex:NAV.find(group=>group.items.some(item=>item[0]==='achat'))?.items.findIndex(item=>item[0]==='achat')};
    globalThis.__daily=sharedWorkspaceState();
    globalThis.__persistent=persistentWorkspaceState();
    const swapTarget=autoPlan.assignments.find(row=>row.associate==='Maya Collins'),originalGetElementById=document.getElementById;state.pendingRosteringSwap={name:'Uma Rescue'};document.getElementById=id=>id==='rostering-swap-assignment'?{value:swapTarget.id}:originalGetElementById(id);applyRosteringDriverSwap();document.getElementById=originalGetElementById;globalThis.__driverSwap={incoming:swapTarget.associate,displacedStillRostered:autoPlan.assignments.some(row=>row.associate==='Maya Collins'),incomingCount:autoPlan.assignments.filter(row=>row.associate==='Uma Rescue').length};
    const custom={id:'delete-me',name:'Delete confirmation service',confirmed:1,kind:'driver',defaultTime:'11:15 AM'};autoPlan.services.push(custom);autoPlan.assignments.push({id:'delete-row',serviceId:'delete-me',start:'11:15 AM',associate:'Maya Collins',route:'',role:'',source:'manual'});requestDeleteRosteringService('delete-me');globalThis.__deleteModal=modal();confirmDeleteRosteringService();globalThis.__deleted=!autoPlan.services.some(row=>row.id==='delete-me')&&!autoPlan.assignments.some(row=>row.serviceId==='delete-me');
  `, context);

  assert(context.__defaults.services === 4, 'Rostering must start with the four confirmed Amazon-style service groups');
  assert(context.__defaults.confirmed === 50 && context.__defaults.assignments === 50, 'Default confirmed counts and editable shift rows must stay aligned');
  assert(context.__samePlan, 'Repeated roster reads must preserve the same live plan while dispatchers edit');
  assert(context.__added === 4 && context.__duplicateAdded === 0 && context.__after.rostered === 4, 'PAYCOM fill must add each scheduled driver once without duplicates');
  assert(context.__after.ninaCount === 3 && context.__after.mayaCount === 2 && context.__after.evanCount === 1, 'Fairness rotation must count one, two, and three distinct stay-home days in the rolling seven-day window');
  assert(context.__html.includes('Rostering') && context.__html.includes('CONFIRMED SERVICES') && context.__html.includes('All Scheduled driver shifts'), 'Rostering page lost its confirmed-services or PAYCOM surfaces');
  assert(context.__pageInfoRostering?.[0] === 'Rostering' && /unfilled shifts/i.test(context.__pageInfoRostering?.[1]||''), 'Rostering navigation must keep its own page title and dispatcher guidance instead of falling back to Today');
  assert(context.__html.includes('1× stay-home') && context.__html.includes('2× stay-home') && context.__html.includes('3× · prioritize hours') && context.__html.includes('level-3'), 'One-to-three stay-home events must render progressively stronger fairness flags');
  assert(context.__html.includes('Maya Collins') && context.__html.includes('John Helper') && context.__html.includes('Nina Patel'), 'PAYCOM drivers must remain visible in the roster or import panel');
  assert(context.__autoResult.drivers === 4 && context.__autoResult.helpers === 1 && context.__autoResult.mode === 'abc' && context.__autoRows.join(',') === 'Evan Stone,Maya Collins,Nina Patel,Rex Rescue', 'ABC Auto Roster must place Delivery Associate and Rescue shifts alphabetically');
  assert(context.__autoRows.includes('Rex Rescue'), 'Rescue/VTO 2 drivers must be eligible for an active roster position');
  assert(context.__donationAutoRows === 0, 'AMZ Donations must remain empty and manual-only during Auto Roster');
  assert(context.__donationHtml.includes('Manual assignment only') && !context.__donationHtml.includes('Bulk Import Associates'), 'AMZ Donations must not expose an automatic PAYCOM fill control');
  assert(context.__orders.abc.join(',') === 'Alpha,Bravo,Charlie' && context.__orders.random.join(',') === 'Bravo,Charlie,Alpha', 'Auto Roster must offer deterministic ABC order and a genuinely shuffled random mode');
  assert(context.__autoHelpers.length === 1 && context.__autoHelpers[0] === 'John Helper' && context.__helperHtml.includes('Added to Helper roster'), 'Scheduled Helper shifts must automatically populate the Helper service and box');
  assert(context.__paycomHtml.indexOf('Evan Stone') < context.__paycomHtml.indexOf('Rex Rescue') && context.__paycomHtml.includes('class="assigned"') && context.__paycomHtml.includes('class="unassigned"'), 'PAYCOM shifts must sort rostered dark-green rows before unrostered dark-yellow rows');
  assert(context.__paycomHtml.includes('data-rostering-paycom-search') && context.__paycomHtml.includes('data-rostering-category="vto2"') && context.__vto2PaycomHtml.includes('data-rostering-paycom-category="vto2"'), 'PAYCOM category buttons and name/role search hooks must render');
  assert(context.__backupGroups.vto2.some(row=>row.name==='Uma Rescue') && context.__backupGroups.vto4.some(row=>row.name==='Zora VTO Four') && context.__backupGroups.other.some(row=>row.name==='Morgan Midshift'), 'Unrostered backup builder must group VTO 2, VTO 4, and all other roles');
  assert(context.__paycomHtml.includes('Copy email text') && context.__backupEmail.includes('VTO 2 · Rescue') && context.__backupEmail.includes('Uma Rescue') && context.__backupEmail.includes('Zora VTO Four') && context.__backupEmail.includes('Morgan Midshift'), 'Backup builder must produce grouped email-ready text');
  assert(!context.__paycomHtml.includes('Keep as VTO 2') && context.__paycomHtml.includes('Add to roster') && context.__paycomHtml.includes('Swap with rostered driver'), 'Rescue and Delivery Associate cards must expose add and swap controls in PAYCOM and backup lists');
  assert(context.__driverSwap.incoming==='Uma Rescue'&&!context.__driverSwap.displacedStillRostered&&context.__driverSwap.incomingCount===1, 'Swap with rostered driver must replace exactly one assignment without duplicating either driver');
  assert(context.__trainingHtml.includes('Riley R') && context.__trainingHtml.includes('Coach T') && context.__trainingHtml.includes('scheduled'), 'Ridealong shifts must render with saved display names beside scheduled Trainer-tagged drivers');
  assert(context.__trainingRidealongCount === 1, 'Canonical and nickname variants of the same ridealong must render as one training match');
  assert(context.__trainingMatch?.trainer === 'Terry Trainer', 'Ridealong-to-trainer matches must save by roster date');
  assert(context.__matchedTrainingHtml.includes('Swap Trainer') && context.__swapCleared, 'Each matched ridealong must expose a working Swap Trainer control');
  assert(!context.__staleTrainingHtml.includes('✓ Matched') && context.__staleTrainingHtml.includes('Saved trainer unavailable'), 'A removed or unavailable Trainer flag must not leave a stale matched status');
  assert(context.__roleGroups.every(group=>group==='training'), 'PAYCOM ridealong and training role variants must be recognized as training shifts');
  assert(context.__screenshotSummary.services === 5 && context.__screenshotSummary.xlUs === 3 && context.__screenshotSummary.medium === 40 && context.__screenshotSummary.associates.length === 2, 'Amazon roster screenshot text must rebuild every known service group, including shorthand XL-US, counts, and associates, without auto-filling AMZ Donations');
  assert(!context.__screenshotSummary.associates.some(row=>/Donation Placeholder|Confirmed Services/i.test(row.name)), 'Screenshot OCR must never create placeholder people from Confirmed Services or AMZ Donations');
  assert(context.__screenshotSummary.associates.some(row=>row.name==='Maya Collins'&&row.route==='No Route Generated') && context.__screenshotSummary.associates.some(row=>row.name==='Nina Patel'&&row.route==='CX101') && context.__screenshotSummary.source==='amazon-roster.png', 'Screenshot import must retain recognized routes and source proof');
  assert(context.__singleClear.associate===''&&context.__singleClear.route==='CX909'&&context.__singleClear.confirmed===40&&context.__singleClear.rows===40, 'Per-row Clear name must keep the route, confirmed count, and shift row');
  assert(context.__serviceClear.names.every(name=>name==='')&&context.__serviceClear.routes.join(',')==='CX910,CX911'&&context.__serviceClear.confirmed===40&&context.__serviceClear.rows===40, 'Per-service Clear roster must clear names without deleting routes, confirmed count, or shift rows');
  assert(context.__flagLabels.length===8&&['Late Driver','Violations','Performance','Suspended','Modified Duty','Only Later Waves','Likes Helper Routes','New Driver'].every(label=>context.__flagLabels.includes(label)), 'PAYCOM Driver Notes must preserve all eight supported flags');
  assert(context.__notesHtml.includes('Maya Collins')&&context.__notesHtml.includes('Late Driver')&&context.__notesHtml.includes('New Driver'), 'Scheduled PAYCOM Driver Notes must surface saved profile flags');
  assert(context.__notesHtml.includes('data-rostering-driver-note-search') && context.__notesHtml.indexOf('Evan Stone') < context.__notesHtml.indexOf('Maya Collins') && context.__notesHtml.indexOf('Maya Collins') < context.__notesHtml.indexOf('Rex Rescue'), 'Driver flags must be searchable and alphabetically ordered');
  assert((context.__flagsModal.match(/data-driver-flag-option/g)||[]).length===8, 'Driver Notes editor must render all eight PAYCOM profile flags');
  assert(context.__rosteringFlagHtml.includes('data-driver-profile-name="Maya Collins"')&&context.__rosteringFlagHtml.includes('data-driver-flags="Late Driver'), 'Rostering rows must expose shared driver flags for hover');
  assert(context.__morningFlagHtml.includes('data-driver-profile-name="Maya Collins + John Helper"')&&context.__morningFlagHtml.includes('data-driver-flags="Late Driver')&&context.__picklistFlagHtml.includes('data-driver-profile-name="Maya Collins + John Helper"'), 'Morning Sheet and Picklist combined Driver + Helper rows must expose shared profile flags for hover');
  assert(context.__nav.sections.join('|')==='Opening Operations|Closing Operations|Improve|Owner'&&context.__nav.achatSection==='Improve'&&context.__nav.achatIndex===3, 'Navigation group renames or A-Chat placement changed unexpectedly');
  assert(context.__daily.rosteringPlans && context.__persistent.rosteringPlans && context.__daily.rosteringTrainingMatches && context.__persistent.rosteringTrainingMatches, 'Rostering plans and training matches must be included in shared and persistent workspace state');
  const appSource=fs.readFileSync(require.resolve('../app.js'),'utf8');
  const styleSource=fs.readFileSync(require.resolve('../styles.css'),'utf8');
  assert(context.__deleteModal.includes('Delete roster block') && context.__deleteModal.includes('Delete confirmation service') && context.__deleted, 'Deleting a roster block must require confirmation and remove only the selected block');
  assert(appSource.includes("if (name==='rostering-paycom-category')") && appSource.includes("document.querySelectorAll('[data-rostering-paycom-search]')") && styleSource.includes('.rostering-paycom-list>div.assigned') && styleSource.includes('.rostering-paycom-list>div.unassigned'), 'PAYCOM category/search behavior and high-contrast roster states must remain wired');
  assert(styleSource.includes('.rostering-driver-note-list') && styleSource.includes('max-height:320px') && styleSource.includes('overflow:auto'), 'Driver flags must remain in a compact scrollable list');
  assert(appSource.includes("el.addEventListener('pointerleave',closeDriverProfilePopover)")&&/function render\(\) \{[\s\S]{0,220}closeDriverProfilePopover\(\)/.test(appSource), 'Driver-note hover popovers must close on pointer exit and before rerendering any page');
  console.log('Rostering confirmed-services, PAYCOM fill, and fairness rotation tests passed');
}

try { run(); } catch (error) { console.error(error); process.exitCode = 1; }
