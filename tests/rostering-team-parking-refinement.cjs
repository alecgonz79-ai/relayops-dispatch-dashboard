const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}

const app={innerHTML:''},storage=new Map(),fileInput={addEventListener(){},click(){}};
const element=()=>({addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},dataset:{},style:{},setAttribute(){},focus(){},click(){},querySelector(){return null;},querySelectorAll(){return[];}});
const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){},open(){}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},document:{body:{appendChild(){}},activeElement:null,getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,querySelector(){return null;},querySelectorAll(){return[];},createElement:element,addEventListener(){},removeEventListener(){}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
vm.runInContext(`
  toast=()=>{};render=()=>{};persist=()=>{};
  state.rosteringDate='2026-07-18';state.rosteringPlans={};
  state.scheduleEntries=[
    {date:'7/18/2026',name:'Actual Associate',role:'Delivery Associate',start:'11:15 AM'},
    {date:'7/18/2026',name:'Rescue Backup',role:'Rescue',start:'11:20 AM'},
    {date:'7/18/2026',name:'Fleet Lead',role:'Fleet Coordinator',start:'8:00 AM'},
    {date:'7/18/2026',name:'Midshift Support',role:'Midshift',start:'2:00 PM'}
  ];
  state.scheduleStayHomeHistory={'2026-07-17|rescue backup':{name:'Rescue Backup',date:'2026-07-17'}};
  const plan=currentRosteringPlan(),groups=rosteringUnrosteredBackupGroups(plan);
  globalThis.__groups={vto2:groups.vto2.map(row=>row.name),vto4:groups.vto4.map(row=>row.name),other:groups.other.map(row=>row.name)};
  globalThis.__paycom=rosteringPaycomHtml(plan);globalThis.__backup=rosteringBackupBuilderHtml(plan);globalThis.__email=rosteringEmailTemplateText(plan);
  const target=plan.assignments.find(row=>row.serviceId==='rivian-medium');target.associate='Rostered Person';target.role='Delivery Associate';
  state.pendingRosteringSwap={name:'Rescue Backup'};const originalGet=document.getElementById;document.getElementById=id=>id==='rostering-swap-assignment'?{value:target.id}:originalGet(id);applyRosteringDriverSwap();document.getElementById=originalGet;
  globalThis.__swap={name:target.associate,count:plan.assignments.filter(row=>row.associate==='Rescue Backup').length,old:plan.assignments.some(row=>row.associate==='Rostered Person')};
  state.driverContacts=[{name:'Actual Associate',key:'actual associate',status:'ACTIVE',role:'Delivery Associate',phone:'(555) 111-2222',transporterId:'A123',email:'driver@example.com'}];
  globalThis.__teamRows=teamDriverRows().map(row=>row.name);globalThis.__teamCollapsed=teamPage();state.expandedDriverKey='actual associate';globalThis.__teamExpanded=teamPage();
  state.vanParking=defaultVanParkingSlots();
  globalThis.__parking={
    west:[3,4,5,17,18,19,20,21,22].map(index=>parkingSpotNumber('west',index)),
    east:[2,3,4,5,19,20].map(index=>parkingSpotNumber('east',index)),
    westIds:parkingSlots('west').slice(3,6).map(row=>row.id),
    eastIds:parkingSlots('east').slice(3,6).map(row=>row.id),
    lowerWest:parkingSlots('west').slice(18,22).map((row,index)=>({id:row.id,value:row.value,kind:row.kind,spot:parkingSpotNumber('west',index+18)})),
    lowerEast:parkingSlots('east').slice(18,21).map((row,index)=>({id:row.id,value:row.value,kind:row.kind,spot:parkingSpotNumber('east',index+18)})),
    westIdsAll:parkingSlots('west').map(row=>row.id),
    eastIdsAll:parkingSlots('east').map(row=>row.id)
  };
  localStorage.setItem('relayops_van_parking',JSON.stringify([
    {id:'west-05',zone:'west',value:'SAVED',kind:'spot'},
    {id:'east-05',zone:'east',value:'KEPT',kind:'spot'},
    {id:'west-20',zone:'west',value:'WEST-CROSSWALK-ASSIGNMENT',kind:'crosswalk'},
    {id:'east-20',zone:'east',value:'EAST-CROSSWALK-ASSIGNMENT',kind:'crosswalk'},
    {id:'west-19',zone:'west',value:'WEST-38-ASSIGNMENT',kind:'spot'},
    {id:'east-19',zone:'east',value:'EAST-18-ASSIGNMENT',kind:'spot'}
  ]));
  const migrated=loadVanParkingSlots();
  const migratedWest=migrated.filter(row=>row.zone==='west'),migratedEast=migrated.filter(row=>row.zone==='east');
  globalThis.__parkingMigration={
    west:migratedWest.slice(3,6).map(row=>[row.id,row.value]),
    east:migratedEast.slice(3,6).map(row=>[row.id,row.value]),
    lowerWest:migratedWest.slice(18,22).map(row=>[row.id,row.value,row.kind]),
    lowerEast:migratedEast.slice(18,21).map(row=>[row.id,row.value,row.kind])
  };
  const legacyLayout=defaultVanParkingSlots(),moveLegacyBefore=(movingId,beforeId)=>{const from=legacyLayout.findIndex(row=>row.id===movingId),to=legacyLayout.findIndex(row=>row.id===beforeId),row=legacyLayout.splice(from,1)[0];legacyLayout.splice(to,0,row);};
  moveLegacyBefore('west-20','west-19');moveLegacyBefore('east-20','east-19');
  const chargerPlan=lowerParkingChargerMovePlan(legacyLayout);
  globalThis.__chargerMigration={plan:chargerPlan,...migrateLowerParkingChargerRows(
    {'middle-21-left':'red','middle-21-right':'green','middle-22-left':'green'},
    [{id:'left-report',chargerKey:'middle-21-left',concern:'Left issue'},{id:'untouched-report',chargerKey:'middle-22-left',concern:'Other issue'}],
    chargerPlan
  )};
`,context);

assert(context.__groups.vto2.join(',')==='Rescue Backup','Rescue must be grouped as VTO 2');
assert(context.__groups.vto4.join(',')==='Actual Associate','Delivery Associate must be grouped as VTO 4');
assert(context.__groups.other.join(',')==='Fleet Lead,Midshift Support','Midshift and non-route roles must stay grouped under Other roles');
assert(context.__paycom.includes('Add to roster')&&context.__paycom.includes('Swap with rostered driver')&&!context.__paycom.includes('Keep as VTO 2'),'PAYCOM route-driver cards need Add and Swap controls');
assert(context.__backup.includes('Other roles')&&context.__backup.includes('Fleet Lead')&&context.__backup.includes('Midshift Support')&&context.__backup.includes('Swap with rostered driver'),'Unrostered backup list lost Other roles or swap controls');
assert(context.__email.includes('Fleet: Fleet')&&!context.__email.includes('Fleet: Fleet Lead'),'Unrostered shifts email must show only the first name for Fleet Coordinator and dispatcher shifts');
assert(context.__swap.name==='Rescue Backup'&&context.__swap.count===1&&!context.__swap.old,'Roster swap must replace one rostered driver without duplication');
assert(context.__teamRows.join(',')==='Actual Associate','Drivers & Team must use only imported directory names');
assert(context.__teamCollapsed.includes('data-driver-card-toggle="true"')&&!context.__teamCollapsed.includes('>ACTIVE<')&&!context.__teamCollapsed.includes('>Active<'),'Driver cards must be expandable without the redundant Active status');
assert(context.__teamExpanded.includes('driver-card expanded')&&context.__teamExpanded.includes('Transporter ID')&&context.__teamExpanded.includes('driver@example.com'),'Expanded driver cards must show the imported details');
assert(JSON.stringify(context.__parking.west)===JSON.stringify(['',4,5,17,37,38,'',39,40]),'West parking must move spot #38 up into the former crosswalk row and place the crosswalk below it');
assert(JSON.stringify(context.__parking.east)===JSON.stringify([34,'',33,32,18,'']),'East parking must move spot #18 up into the former crosswalk row and place the crosswalk below it');
assert(JSON.stringify(context.__parking.westIds)===JSON.stringify(['west-04','west-missing-04','west-05'])&&JSON.stringify(context.__parking.eastIds)===JSON.stringify(['east-04','east-missing-33','east-05']),'Missing spaces must render directly above #5 and #32');
assert(JSON.stringify(context.__parking.lowerWest)===JSON.stringify([
  {id:'west-18',value:'18',kind:'spot',spot:37},
  {id:'west-19',value:'30',kind:'spot',spot:38},
  {id:'west-20',value:'50',kind:'crosswalk',spot:''},
  {id:'west-21',value:'35',kind:'spot',spot:39}
]),'West lower rows must move the stable #38 slot ID and van assignment above the stable crosswalk row ID');
assert(JSON.stringify(context.__parking.lowerEast)===JSON.stringify([
  {id:'east-18',value:'49',kind:'spot',spot:19},
  {id:'east-19',value:'44',kind:'spot',spot:18},
  {id:'east-20',value:'19',kind:'crosswalk',spot:''}
]),'East lower rows must move the stable #18 slot ID and van assignment above the stable crosswalk row ID');
assert(new Set(context.__parking.westIdsAll).size===context.__parking.westIdsAll.length&&new Set(context.__parking.eastIdsAll).size===context.__parking.eastIdsAll.length,'Parking row move must not duplicate or replace stable slot IDs');
assert(JSON.stringify(context.__parkingMigration.west)===JSON.stringify([['west-04','4'],['west-missing-04',''],['west-05','SAVED']])&&JSON.stringify(context.__parkingMigration.east)===JSON.stringify([['east-04','15'],['east-missing-33',''],['east-05','KEPT']]),'Saved maps must retain existing vans while inserting the new spaces in place');
assert(JSON.stringify(context.__parkingMigration.lowerWest)===JSON.stringify([
  ['west-18','18','spot'],
  ['west-19','WEST-38-ASSIGNMENT','spot'],
  ['west-20','WEST-CROSSWALK-ASSIGNMENT','crosswalk'],
  ['west-21','35','spot']
])&&JSON.stringify(context.__parkingMigration.lowerEast)===JSON.stringify([
  ['east-18','49','spot'],
  ['east-19','EAST-18-ASSIGNMENT','spot'],
  ['east-20','EAST-CROSSWALK-ASSIGNMENT','crosswalk']
]),'Saved parking assignments must follow their stable IDs when #38/#18 and the crosswalk exchange visual rows');
assert(JSON.stringify(context.__chargerMigration.plan)===JSON.stringify([{side:'left',from:21,to:20},{side:'right',from:21,to:20}]),'Legacy crosswalk placement must generate the exact one-row charger migration plan');
assert(context.__chargerMigration.status['middle-20-left']==='red'&&context.__chargerMigration.status['middle-20-right']==='green'&&!('middle-21-left' in context.__chargerMigration.status)&&context.__chargerMigration.status['middle-22-left']==='green','Charger status must move up with spots #38/#18 without changing neighboring chargers');
assert(context.__chargerMigration.reports.find(row=>row.id==='left-report')?.chargerKey==='middle-20-left'&&context.__chargerMigration.reports.find(row=>row.id==='untouched-report')?.chargerKey==='middle-22-left','Charger issue history must follow the moved parking row and leave other reports untouched');
console.log('Rostering actions, imported-only Driver cards, and stable-ID crosswalk parking regression passed');
