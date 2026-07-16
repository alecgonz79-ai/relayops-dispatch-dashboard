const fs = require('fs');
const vm = require('vm');

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
    setAttribute() {}, style: {}, focus() {}, blur() {}, click() {},
    querySelector() { return null; }, querySelectorAll() { return []; }
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
      querySelector: () => null, querySelectorAll: () => [], createElement: element,
      addEventListener() {}, removeEventListener() {}
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('globalThis.__toasts=[];toast=(message,type)=>__toasts.push({message,type}); render=()=>{}; persist=()=>{};', context);
  return context;
}

function run() {
  const context = appContext();
  vm.runInContext(`
    state.dspCode='LLOL';state.morningOperationDate='2026-07-15';state.fitMorningRows=true;
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
    state.scheduleEntries=[
      {date:'7/15/2026',name:'Primary Driver',role:'Delivery Associate',start:'10:30 AM'},
      {date:'7/15/2026',name:'Replacement Driver',role:'Delivery Associate',start:'10:30 AM'},
      {date:'7/15/2026',name:'Helper Person',role:'Driver Helper',start:'10:25 AM'}
    ];
    const helperKey=scheduleHelperKey('Helper Person');
    state.scheduleHelpers[helperKey]={name:'Helper Person',role:'Driver Helper',matchedDriver:'Primary Driver',matchedRoute:'CX101'};
    state.morningRoutes=[{dsp:'LLOL',driver:'Primary Driver + Helper Person',route:'CX101',wave:'11:15 AM',staging:'STG.V.1',service:'Standard Parcel',helperAssignmentKey:helperKey,ev:'EV1',stops:187,packages:342,plannedRts:'7:18 PM'}];
    addRosterReduction('Primary Driver','Delivery Associate','CX101','11:15 AM');
    globalThis.__afterReduction=JSON.parse(JSON.stringify(state.morningRoutes[0]));
    globalThis.__rosterHtml=openingRosterScheduleHtml();
    globalThis.__picklistHtml=openingPicklistHtml();
    const section=morningSections(filteredMorningRows())[0];
    globalThis.__morningHtml=morningWaveGroup(section,0);

    restoreRosterStatus('Primary Driver','reduction');
    globalThis.__afterReductionRestore=JSON.parse(JSON.stringify(state.morningRoutes[0]));
    globalThis.__reductionRemovedAfterRestore=!state.scheduleReductions[scheduleDriverMarkKey('Primary Driver')];
    addRosterReduction('Primary Driver','Delivery Associate','CX101','11:15 AM');

    state.pendingRosterSwap={route:'CX101',driverName:'',driverLabel:'Unassigned driver',mode:'vacancy'};
    const originalGet=document.getElementById;
    document.getElementById=id=>id==='roster-swap-replacement'?{value:'Replacement Driver'}:originalGet(id);
    applyRosterSwap();
    globalThis.__afterAssignment=JSON.parse(JSON.stringify(state.morningRoutes[0]));
    globalThis.__conflictRestoreResult=restoreRosterStatus('Primary Driver','reduction');
    globalThis.__afterConflictRestore=JSON.parse(JSON.stringify(state.morningRoutes[0]));
    globalThis.__reductionKeptAfterConflict=Boolean(state.scheduleReductions[scheduleDriverMarkKey('Primary Driver')]);
    globalThis.__conflictToast=globalThis.__toasts.at(-1);

    state.pendingRosterSwap={route:'CX101',driverName:'Replacement Driver',driverLabel:'Replacement Driver',mode:'swap'};
    leaveRosterRouteUnassigned();
    globalThis.__afterSwapOff=JSON.parse(JSON.stringify(state.morningRoutes[0]));
    globalThis.__afterSwapOffDisplay=routeDriverDisplayValue(state.morningRoutes[0]);

    state.morningRoutes=[{dsp:'LLOL',driver:'Solo Driver',route:'CX202',wave:'11:20 AM',staging:'STG.P.1',service:'Standard Parcel'}];
    addRosterReduction('Solo Driver','Delivery Associate','CX202','11:20 AM');
    globalThis.__solo=JSON.parse(JSON.stringify(state.morningRoutes[0]));

    state.scheduleDriverMarks[scheduleDriverMarkKey('Adhoc Driver')]='adhoc';
    state.morningRoutes=[{dsp:'LLOL',driver:'Adhoc Driver',route:'AX',wave:'Ad hoc',staging:'',service:'Adhoc',adhocKey:adhocIdentityKey('Adhoc Driver')}];
    addRosterReduction('Adhoc Driver','Delivery Associate','AX','Ad hoc');
    globalThis.__adhoc=JSON.parse(JSON.stringify(state.morningRoutes[0]));
  `, context);

  assert(context.__afterReduction.route === 'CX101', 'A reduction must preserve the CX route');
  assert(context.__afterReduction.staging === 'STG.V.1' && context.__afterReduction.stops === 187 && context.__afterReduction.packages === 342 && context.__afterReduction.plannedRts === '7:18 PM', 'A reduction must preserve staging, stop count, package count, and Planned RTS');
  assert(context.__afterReduction.driver === 'Helper Person', 'Removing the primary driver must preserve the helper name');
  assert(context.__afterReduction.assignmentStatus === 'unassigned' && context.__afterReduction.missingDriver === true, 'A reduced route must enter the shared vacancy state');
  assert(context.__rosterHtml.includes('route-driver-row route-vacancy-row') && context.__rosterHtml.includes('Helper remains: Helper Person'), 'Drivers on route must show a red vacancy and the preserved helper');
  assert(context.__picklistHtml.includes('route-vacancy-row') && context.__picklistHtml.includes('DRIVER NEEDED'), 'Picklist must render the vacancy warning');
  assert(context.__morningHtml.includes('route-vacancy-row') && context.__morningHtml.includes('DRIVER NEEDED'), 'Morning Sheet must render the vacancy warning');
  assert(context.__afterReductionRestore.driver === 'Primary Driver + Helper Person' && !context.__afterReductionRestore.assignmentStatus && context.__reductionRemovedAfterRestore, 'Restoring a reduction must return the driver to the original vacant route and preserve its helper');
  assert(context.__afterAssignment.driver === 'Replacement Driver + Helper Person', 'Assigning a vacancy must insert the new primary before the preserved helper');
  assert(context.__afterAssignment.route === 'CX101' && context.__afterAssignment.staging === 'STG.V.1' && context.__afterAssignment.stops === 187 && context.__afterAssignment.packages === 342 && context.__afterAssignment.plannedRts === '7:18 PM', 'Assigning a replacement must not alter protected route data');
  assert(!context.__afterAssignment.assignmentStatus && !context.__afterAssignment.missingDriver, 'Assigning a vacancy must clear every red vacancy flag');
  assert(context.__conflictRestoreResult === false && context.__afterConflictRestore.driver === 'Replacement Driver + Helper Person' && context.__reductionKeptAfterConflict, 'A restore must not overwrite a route that was given to another driver, and the reduced driver must remain in Reductions');
  assert(context.__conflictToast?.type === 'error' && context.__conflictToast.message.includes('Route was given to another driver'), 'A conflicting restore must show the dispatcher the route reassignment message');
  assert(context.__afterSwapOff.driver === 'Helper Person' && context.__afterSwapOff.assignmentStatus === 'unassigned', 'Swap off must again preserve the helper and leave the route visibly unassigned');
  assert(context.__afterSwapOff.route === 'CX101' && context.__afterSwapOff.staging === 'STG.V.1' && context.__afterSwapOff.stops === 187 && context.__afterSwapOff.packages === 342 && context.__afterSwapOff.plannedRts === '7:18 PM', 'Swapping off a driver must preserve every protected route field');
  assert(context.__afterSwapOffDisplay==='? + Helper Person','A missing primary must display ? before the preserved helper');
  assert(context.__solo.route === 'CX202' && context.__solo.driver === '' && context.__solo.assignmentStatus === 'unassigned', 'A single-driver reduction must preserve the route with an empty driver assignment');
  assert(context.__adhoc.route === 'AX' && context.__adhoc.driver === '' && context.__adhoc.assignmentStatus === 'unassigned', 'Reducing a generated Adhoc route must not delete its visible vacancy');
  console.log('Route vacancy workflow contracts passed');
}

try { run(); } catch (error) { console.error(error); process.exitCode = 1; }
