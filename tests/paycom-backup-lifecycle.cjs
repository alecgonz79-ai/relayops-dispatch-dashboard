const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}
const app={innerHTML:''},fileInput={accept:'',addEventListener(){},click(){}},storage=new Map();
const element=()=>({addEventListener(){},appendChild(){},remove(){},insertAdjacentHTML(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},blur(){},querySelector(){return null;},querySelectorAll(){return[];}});
const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){},open(){}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},document:{body:{appendChild(){}},activeElement:null,getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,querySelector(){return null;},querySelectorAll(){return[];},createElement:element,addEventListener(){},removeEventListener(){}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
vm.runInContext(`
  toast=()=>{};render=()=>{};persist=()=>{};
  const opening=[{date:'7/25/2026',name:'Opening Driver',role:'Delivery Associate',start:'11:15 AM'}];
  const future=[{date:'7/26/2026',name:'Future Driver',role:'Delivery Associate',start:'11:20 AM'}];
  const merged=mergeScheduleEntriesByImportedDate(opening,future);
  const refreshed=mergeScheduleEntriesByImportedDate(merged,[{date:'7/26/2026',name:'Updated Future Driver',role:'Delivery Associate',start:'11:25 AM'}]);
  globalThis.__imports={merged:merged.map(row=>row.name),refreshed:refreshed.map(row=>row.name)};

  state.morningOperationDate='2026-07-25';
  state.driverContacts=[{name:'Stay Home Driver',key:'stay home driver'},{name:'Old Backup Driver',key:'old backup driver'},{name:'Second Backup Driver',key:'second backup driver'}];
  state.scheduleEntries=[
    {date:'7/25/2026',name:'Stay Home Driver',role:'Delivery Associate',start:'11:15 AM'},
    {date:'7/25/2026',name:'Old Backup Driver',role:'Rescue',start:'11:20 AM'},
    {date:'7/25/2026',name:'Second Backup Driver',role:'Delivery Associate',start:'11:25 AM'}
  ];
  state.scheduleDriverMarks={};
  state.scheduleBackupRecords={};
  state.scheduleStayHome={'2026-07-25|stay home driver':{name:'Stay Home Driver',role:'Delivery Associate',start:'11:15 AM'}};
  state.scheduleStayHomeHistory={};
  state.scheduleReductions={};
  state.scheduleHelpers={};
  state.callOffDriverKeys={};
  state.callOffReasons={};
  state.openingPicklistBackupOverrides={};
  state.morningRoutes=[];

  restoreRosterStatus('Stay Home Driver','stay-home');
  globalThis.__restored={
    stayHome:Object.keys(state.scheduleStayHome),
    mark:state.scheduleDriverMarks['2026-07-25|stay home driver'],
    backup:state.scheduleBackupRecords['2026-07-25|stay home driver'],
    rows:currentBackupDriverRows().map(row=>row.name)
  };

  removeBackupDriver('Stay Home Driver');
  globalThis.__removed={
    mark:state.scheduleDriverMarks['2026-07-25|stay home driver'],
    record:state.scheduleBackupRecords['2026-07-25|stay home driver'],
    rows:currentBackupDriverRows().map(row=>row.name)
  };

  state.scheduleDriverMarks['2026-07-25|old backup driver']='backup';
  state.scheduleBackupRecords['2026-07-25|old backup driver']={name:'Old Backup Driver',role:'Rescue'};
  state.openingPicklistBackupOverrides={'vto2:0':'Old Backup Driver','vto4:0':'Second Backup Driver'};
  clearDailyBackupState();
  globalThis.__cleared={
    overrides:Object.keys(state.openingPicklistBackupOverrides),
    records:Object.keys(state.scheduleBackupRecords),
    rows:currentBackupDriverRows().map(row=>row.name),
    marks:{...state.scheduleDriverMarks}
  };
  globalThis.__hover=picklistVtoDriverCell('vto2',0,{name:'Old Backup Driver',role:'Rescue'},'Old Backup Driver');
`,context);

assert(context.__imports.merged.includes('Opening Driver')&&context.__imports.merged.includes('Future Driver'),'A Rostering PAYCOM import must preserve the Opening Picklist date');
assert(context.__imports.refreshed.includes('Opening Driver')&&context.__imports.refreshed.includes('Updated Future Driver')&&!context.__imports.refreshed.includes('Future Driver'),'A refreshed PAYCOM import must replace only its own imported date');
assert(context.__restored.stayHome.length===0&&context.__restored.mark==='backup'&&context.__restored.backup?.name==='Stay Home Driver'&&context.__restored.rows.includes('Stay Home Driver'),'Restoring Told To Stay Home must return the driver to the correct VTO backup list');
assert(context.__removed.mark==='paycom'&&!context.__removed.record&&!context.__removed.rows.includes('Stay Home Driver'),'Remove Driver must clear the VTO record and suppress immediate automatic recreation');
assert(context.__cleared.overrides.length===0&&context.__cleared.records.length===0&&context.__cleared.rows.length===0&&Object.values(context.__cleared.marks).every(mark=>mark==='paycom'),'Clearing either operational sheet must fully empty both VTO lists');
assert(context.__hover.includes('data-vto-target="remove"')&&context.__hover.includes('Remove Driver'),'The backup hover menu must expose Remove Driver');
console.log('PAYCOM import isolation and backup/VTO lifecycle tests passed');
