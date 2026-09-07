const fs=require('fs');
const vm=require('vm');
const assert=require('assert/strict');

const storage=new Map(),nodes=new Map();let focused=0;
const element=()=>({dataset:{},style:{},innerHTML:'',addEventListener(){},appendChild(){},remove(){nodes.delete(this.id);},classList:{add(){},remove(){},toggle(){}},setAttribute(){},focus(){focused++;},blur(){},contains(){return false;},querySelector(){return {value:'',addEventListener(){},focus(){focused++;}};},querySelectorAll(){return[];}});
const app={innerHTML:''},fileInput={addEventListener(){},click(){}};
const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){},open(){},innerWidth:1280,innerHeight:900},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},document:{body:{appendChild(node){nodes.set(node.id,node);}},activeElement:null,getElementById:id=>nodes.get(id)||(id==='app'?app:id==='file-input'?fileInput:null),querySelector(){return null;},querySelectorAll(){return[];},createElement:element,addEventListener(){},removeEventListener(){}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
const run=code=>vm.runInContext(code,context);
run(`
  toast=()=>{};render=()=>{};persist=()=>{};recalculateEquipmentReadiness=()=>{};
  state.dspCode='LLOL';state.morningOperationDate='2026-09-06';state.modal=null;
  state.driverContacts=['Driver One','Driver Two','Helper One','Helper Two','Backup Driver'].map((name,index)=>({name,key:name.toLowerCase(),transporterId:'TEST-'+index,role:'Delivery Associate'}));
  state.driverProfiles={};state.driverNameAliases={'backup alias':{canonical:'Backup Driver',display:'Backup Driver',aliases:['Backup Alias']}};
  state.scheduleEntries=[{date:'9/6/2026',name:'Backup Alias',role:'Rescue',start:'11:15 AM'}];
  state.scheduleDriverMarks={'2026-09-06|backup alias':'backup'};
  state.scheduleBackupRecords={'2026-09-06|backup alias':{name:'Backup Alias',role:'Rescue',vto:'VTO 2'}};
  state.scheduleStayHome={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};state.openingPicklistBackupOverrides={'vto2:0':'Backup Alias'};
  state.morningRoutes=[];state.picklistSwapAudit=[];state.sheetHistory={past:[],future:[]};
  globalThis.secondMidActions=picklistVtoDriverCell('vto2',0,{name:'Backup Alias',role:'Rescue'},'Backup Alias');
  globalThis.secondMidResult=applyPicklistVtoAction('Backup Alias','Rescue','second-mid','2026-09-06');
  globalThis.secondMid=JSON.parse(JSON.stringify({routes:state.morningRoutes,marks:state.scheduleDriverMarks,records:state.scheduleBackupRecords,overrides:state.openingPicklistBackupOverrides,audit:state.picklistSwapAudit}));
  applyPicklistVtoAction('Backup Alias','Rescue','second-mid','2026-09-06');
  globalThis.secondMidRepeat=state.morningRoutes.length;
  undoSheetChange();
  globalThis.secondMidUndo=JSON.parse(JSON.stringify({routes:state.morningRoutes,backups:currentBackupDriverRows(),audit:state.picklistSwapAudit}));
  globalThis.dateBefore=JSON.stringify(operationalSheetSnapshot());
  moveVtoDriverToSecondMid('Backup Alias','Rescue','2026-09-05');
  globalThis.oldDateUntouched=globalThis.dateBefore===JSON.stringify(operationalSheetSnapshot());

  globalThis.fixtureRoutes=()=>[
    {routeUid:'cx-one',dsp:'LLOL',driver:'Driver One + Helper One',helperAssignmentKey:'helper-one',route:'CX101',wave:'11:15 AM',service:'Standard Parcel',staging:'STG.V.4',pad:'A',padOverride:'A',ev:'EV21',deviceName:'4',portable:'P3',stops:180,packages:320,plannedRts:'8:30 PM',trainerNames:['Helper One']},
    {routeUid:'cx-two',dsp:'LLOL',driver:'Driver Two + Helper Two',helperAssignmentKey:'helper-two',route:'CX102',wave:'11:30 AM',service:'Standard Parcel',staging:'STG.V.9',pad:'C',padOverride:'C',ev:'EV44',deviceName:'45',portable:'P8',stops:134,packages:260,plannedRts:'8:45 PM'},
    {routeUid:'not-cx',dsp:'LLOL',driver:'Adhoc Person',route:'AX',wave:'Ad hoc',service:'Adhoc'},
    {routeUid:'other-dsp',dsp:'OTHER',driver:'Other Driver',route:'CX999',wave:'11:15 AM',service:'Standard Parcel'}
  ];
  globalThis.resetRoutes=()=>{state.morningRoutes=fixtureRoutes();state.scheduleHelpers={'helper-one':{name:'Helper One',matchedDriver:'Driver One',matchedRoute:'CX101',matchedRouteUid:'cx-one'},'helper-two':{name:'Helper Two',matchedDriver:'Driver Two',matchedRoute:'CX102',matchedRouteUid:'cx-two'}};state.sheetHistory={past:[],future:[]};state.picklistSwapAudit=[];state.pendingCxRouteSwap=null;state.modal=null;};
  resetRoutes();
  openCxRouteSwap('cx-one','Driver One');
  globalThis.candidates=JSON.parse(JSON.stringify(state.pendingCxRouteSwap.candidates));
  globalThis.cxModal=modal();
  globalThis.cxResult=performCxRouteSwap('cx-two');
  globalThis.cxAfter=JSON.parse(JSON.stringify({routes:state.morningRoutes,helpers:state.scheduleHelpers,audit:state.picklistSwapAudit}));
  undoSheetChange();
  globalThis.cxUndo=JSON.parse(JSON.stringify({routes:state.morningRoutes,helpers:state.scheduleHelpers,audit:state.picklistSwapAudit}));

  resetRoutes();openCxRouteSwap('cx-one','Driver One');state.morningRoutes[1].driver='New Dispatcher Assignment + Helper Two';
  const staleBefore=JSON.stringify(operationalSheetSnapshot());globalThis.staleTarget=performCxRouteSwap('cx-two');globalThis.staleTargetUntouched=staleBefore===JSON.stringify(operationalSheetSnapshot());
  resetRoutes();openCxRouteSwap('cx-one','Driver One');state.morningRoutes[0].driver='Another Driver + Helper One';globalThis.staleSource=performCxRouteSwap('cx-two');
  resetRoutes();openCxRouteSwap('cx-one','Driver One');state.morningRoutes[1].routeUid='replacement-uid';globalThis.reusedCode=performCxRouteSwap('cx-two');
  resetRoutes();openCxRouteSwap('cx-one','Driver One');state.morningOperationDate='2026-09-07';globalThis.staleDate=performCxRouteSwap('cx-two');state.morningOperationDate='2026-09-06';
  resetRoutes();openCxRouteSwap('cx-one','Driver One');state.driverNameAliases['driver one alias']={canonical:'Driver One',display:'Driver One',aliases:['Driver One Alias']};state.morningRoutes.push({routeUid:'duplicate',dsp:'LLOL',driver:'Driver One Alias',route:'CX103',wave:'11:15 AM'});globalThis.duplicate=performCxRouteSwap('cx-two');
  resetRoutes();openCxRouteSwap('cx-one','Helper One');globalThis.helperRejected=!state.pendingCxRouteSwap;
  resetRoutes();globalThis.routeSource={dataset:{viewUid:'cx-one'},getBoundingClientRect(){return {left:10,bottom:100};}};
  state.editMode=false;globalThis.driverViewAttrs=openingPicklistCellAttrs({key:'wave-1'},0,state.morningRoutes[0],0,'driver');
  openDriverRouteContextMenu({},routeSource,{hover:true});
`);
assert(context.secondMidActions.includes('>2nd MID</button>'),'Backup hover actions expose 2nd MID');
assert.equal(context.secondMidResult,true);
assert.equal(context.secondMid.routes.length,1);
assert.equal(context.secondMid.routes[0].driver,'Backup Driver','Alias resolves to one canonical driver');
assert.equal(context.secondMid.routes[0].service,'2nd MID');
assert.equal(context.secondMid.routes[0].wave,'Ad hoc');
assert.equal(context.secondMid.routes[0].route,'AX');
assert.equal(Object.keys(context.secondMid.records).length,0);
assert.equal(Object.keys(context.secondMid.overrides).length,0);
assert.equal(context.secondMidRepeat,1,'Repeated action never toggles off or duplicates the 2nd MID');
assert.equal(context.secondMidUndo.routes.length,0);
assert.equal(context.secondMidUndo.backups.length,1);
assert.equal(context.secondMidUndo.audit.length,0);
assert(context.oldDateUntouched,'Stale day actions do not change tomorrow’s roster');
assert.equal(context.candidates.length,1,'Only another assigned CX in this DSP is eligible');
assert(context.cxModal.includes('Destination CX and current driver'));
assert.equal(context.cxResult.ok,true);
assert.equal(context.cxAfter.routes[0].driver,'Driver Two + Helper One');
assert.equal(context.cxAfter.routes[1].driver,'Driver One + Helper Two');
for(let index=0;index<2;index++){
  const before=context.cxUndo.routes[index],after=context.cxAfter.routes[index];
  for(const field of ['routeUid','route','wave','service','staging','pad','padOverride','ev','deviceName','portable','stops','packages','plannedRts','helperAssignmentKey','trainerNames'])assert.deepEqual(after[field],before[field],field+' stays with its CX');
}
assert.equal(context.cxAfter.helpers['helper-one'].matchedDriver,'Driver Two');
assert.equal(context.cxAfter.helpers['helper-two'].matchedDriver,'Driver One');
assert.equal(context.cxAfter.audit.length,2,'Cortex tracker records both route assignments');
assert.equal(context.cxUndo.routes[0].driver,'Driver One + Helper One');
assert.equal(context.cxUndo.helpers['helper-one'].matchedDriver,'Driver One');
assert.equal(context.cxUndo.audit.length,0,'Undo also restores swap confirmations');
for(const key of ['staleTarget','staleSource','reusedCode','staleDate','duplicate'])assert.equal(context[key].ok,false,key+' must fail before mutation');
assert(context.staleTargetUntouched);
assert(context.helperRejected,'A helper cannot accidentally swap into a primary DA slot');
assert(nodes.get('driver-route-context-menu').innerHTML.includes('Swap to another CX'));
assert.equal(focused,0,'Opening route actions on hover must not steal typing focus');
assert(context.driverViewAttrs.includes('tabindex="0"')&&context.driverViewAttrs.includes('aria-keyshortcuts="Alt+ArrowDown Shift+F10"'),'Picklist driver actions can be reached from the keyboard outside edit mode');
run("closeDriverRouteContextMenu();");
console.log('CX driver swap and 2nd MID VTO workflow regressions passed');
