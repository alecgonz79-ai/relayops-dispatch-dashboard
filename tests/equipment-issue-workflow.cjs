const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}
function harness(){
  const storage=new Map(),elements=new Map(),app={innerHTML:''},fileInput={addEventListener(){},click(){}};
  const node=()=>({addEventListener(){},appendChild(){},remove(){},insertAdjacentHTML(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},blur(){},select(){},querySelector(){return null;},querySelectorAll(){return [];}});
  const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){},open(){return{}},RelayOpsCloud:null},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},document:{body:{appendChild(){}},activeElement:null,getElementById(id){if(id==='app')return app;if(id==='file-input')return fileInput;return elements.get(id)||null;},querySelector(){return null;},querySelectorAll(){return[];},createElement:node,addEventListener(){},removeEventListener(){}}};
  vm.createContext(context);vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});vm.runInContext('globalThis.__state=state;globalThis.__toasts=[];toast=(message,type)=>globalThis.__toasts.push({message,type});render=()=>{};',context);return{context,storage,elements};
}

function run(){
  const {context,storage,elements}=harness();
  Object.entries({'equipment-issue-type':'portable','equipment-issue-id':'0012','equipment-issue-text':'Cracked screen <script>','equipment-issue-severity':'high'}).forEach(([id,value])=>elements.set(id,{value}));
  vm.runInContext(`
    state.dspCode='LLOL';state.cloudUser='Dispatcher One';state.pendingEquipmentIssue={type:'device',value:''};
    state.morningRoutes=[{routeUid:'route-1',dsp:'LLOL',driver:'Driver One',route:'CX101',wave:'11:15 AM',staging:'STG.V.1',service:'Standard Parcel',ev:'1',deviceName:'3',portable:'12',deviceReady:false,portableReady:true,stops:180,packages:300}];
    saveEquipmentIssue();
    const route=state.morningRoutes[0],issue=equipmentIssueFor('portable','0012'),displayDate=equipmentIssueDate(issue.active[0].createdAt);
    state.equipmentImport={name:'test',details:{'1':{device:'3',portable:'12'}}};state.fitMorningRows=true;state.morningFilters={wave:'all',staging:'all',pad:'all'};
    const section=morningSections(state.morningRoutes)[0],pickSection={key:'wave-1',label:'WAVE 1',wave:'11:15 AM',rows:[route],capacity:1,hasTime:true,pad:'A'};
    globalThis.__saved={key:issue.key,text:issue.active[0].text,displayDate,popover:equipmentIssuePopoverHtml('portable','12'),deviceRows:deviceSheetRows('ev'),morning:morningWaveGroup(section,0),picklist:openingPicklistSectionHtml(pickSection,0),deviceIssue:equipmentIssueFor('device','12'),readiness:[route.deviceReady,route.portableReady],shared:sharedWorkspaceState(),persistent:persistentWorkspaceState()};
    markEquipmentIssueFixed(issue.key,issue.active[0].id);
    state.pendingEquipmentIssue={type:'portable',value:'12'};state.modal='equipment-issue';
    globalThis.__fixed={active:equipmentIssueFor('portable','12'),history:state.equipmentIssues['portable:12'].history,ready:route.portableReady,modal:modal()};
    state.equipmentIssues['device:3']={type:'device',equipmentId:'3',label:'Device 3',active:[{id:'d3',text:'Broken device',severity:'high',createdAt:new Date().toISOString(),status:'active'}],history:[]};
    route.deviceName='3';recalculateEquipmentReadiness();globalThis.__deviceBlocked=route.deviceReady;
    saveMorningEditCell({textContent:'4',dataset:{editField:'deviceName',editUid:'route-1'},closest(){return null;},classList:{toggle(){}}});globalThis.__deviceAfterEdit=route.deviceReady;
    state.equipmentIssues['portable:12']={type:'portable',equipmentId:'12',label:'Portable 12',active:[{id:'p12',text:'Will not charge',severity:'critical',createdAt:new Date().toISOString(),status:'active'}],history:[]};
    route.portable='12';recalculateEquipmentReadiness();globalThis.__portableBlocked=route.portableReady;
    saveOpeningPicklistCell({textContent:'13',dataset:{picklistField:'portable',picklistRouteUid:'route-1',picklistWave:'11:15 AM',picklistSectionKey:'wave-1'},parentElement:null});globalThis.__portableAfterEdit=route.portableReady;
    globalThis.__duplicate=equipmentAssignmentConflicts({'1':{device:'3',portable:'20'},'2':{device:'003',portable:'0020'}});
    state.equipmentImport={name:'stale-check',details:{'2':{device:'8',portable:'9'}}};route.ev='1';route.deviceName='OLD';route.portable='OLD';route.deviceReady=true;route.portableReady=true;inputDeviceSheetToMorning();globalThis.__stale=[route.deviceName,route.portable,route.deviceReady,route.portableReady];
    route.ev='1';route.deviceName='OLD';route.portable='OLD';route.deviceReady=true;route.portableReady=true;state.equipmentImport={name:'duplicate-check',details:{'1':{device:'3',portable:'20'},'2':{device:'003',portable:'21'}}};inputDeviceSheetToMorning();globalThis.__blockedTransfer=[route.deviceName,route.portable,globalThis.__toasts.at(-1)];
    clearEquipmentForRoute(route);globalThis.__cleared=[route.ev,route.deviceName,route.portable,route.deviceReady,route.portableReady];
  `,context);

  const saved=context.__saved;
  assert(saved.key==='portable:12'&&saved.text==='Cracked screen <script>','Typed Portable issue must honor the selected type and preserve the dispatcher note');
  assert(!saved.deviceIssue,'Device and Portable with the same number must remain separate physical issue identities');
  assert(saved.popover.includes(saved.displayDate)&&saved.popover.includes('Cracked screen &lt;script&gt;')&&!saved.popover.includes('<script>'),'Issue popup must show the logged date and escape typed notes');
  assert((saved.deviceRows.match(/has-equipment-issue/g)||[]).length===1&&saved.deviceRows.includes('data-equipment-type="portable"'),'Device Sheet must flag only the exact affected item cell');
  assert((saved.morning.match(/equipment-issue-trigger active/g)||[]).length===1&&saved.morning.includes('data-equipment-type="portable"'),'Morning Sheet must flag only the exact affected item cell');
  assert((saved.picklist.match(/equipment-issue-trigger active/g)||[]).length===1&&saved.picklist.includes('data-equipment-type="portable"'),'Opening Picklist must flag only the exact affected item cell');
  assert(saved.readiness[0]===true&&saved.readiness[1]===false,'High Portable issue must block only Portable readiness');
  assert(saved.shared.equipmentIssues['portable:12']&&saved.persistent.equipmentIssues['portable:12'],'Equipment issues must be included in shared and persistent cloud snapshots');
  assert(JSON.parse(storage.get('relayops_equipment_issues'))['portable:12'],'Equipment issue must persist in local storage');

  const fixed=context.__fixed;
  assert(fixed.active===null&&fixed.ready===true,'Mark fixed must clear the active flag and restore readiness');
  assert(fixed.history[0].status==='fixed'&&fixed.history[0].resolvedAt&&fixed.history[0].resolvedBy==='Dispatcher One','Mark fixed must retain dated resolver history');
  assert(fixed.modal.includes('fixed')&&fixed.modal.includes('Issue history'),'Fixed lifecycle must remain visible in issue history');
  assert(context.__deviceBlocked===false&&context.__deviceAfterEdit===true&&context.__portableBlocked===false&&context.__portableAfterEdit===true,'Manual Morning/Picklist equipment edits must recalculate readiness immediately');
  assert(context.__duplicate.length===2&&context.__duplicate.some(value=>value.includes('Device 3'))&&context.__duplicate.some(value=>value.includes('Portable 20')),'Leading-zero duplicates must be treated as the same physical assets');
  assert(context.__stale[0]===''&&context.__stale[1]===''&&context.__stale[2]===false&&context.__stale[3]===false,'Missing current assignments must clear stale values and readiness');
  assert(context.__blockedTransfer[0]==='OLD'&&context.__blockedTransfer[1]==='OLD'&&/Fix duplicate equipment/.test(context.__blockedTransfer[2].message),'Duplicate equipment must block transfer before mutating routes');
  assert(context.__cleared[0]===''&&context.__cleared[1]===''&&context.__cleared[2]===''&&context.__cleared[3]===false&&context.__cleared[4]===false,'Cleared automatic assignments must not retain stale readiness flags');
  console.log('Device and Portable issue notes, flags, lifecycle, and assignment safety tests passed');
}

try{run();}catch(error){console.error(error);process.exitCode=1;}
