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
  const plan=currentRosteringPlan(),groups=rosteringUnrosteredBackupGroups(plan);
  globalThis.__groups={vto2:groups.vto2.map(row=>row.name),vto4:groups.vto4.map(row=>row.name),other:groups.other.map(row=>row.name)};
  globalThis.__paycom=rosteringPaycomHtml(plan);globalThis.__backup=rosteringBackupBuilderHtml(plan);
  const target=plan.assignments.find(row=>row.serviceId==='rivian-medium');target.associate='Rostered Person';target.role='Delivery Associate';
  state.pendingRosteringSwap={name:'Rescue Backup'};const originalGet=document.getElementById;document.getElementById=id=>id==='rostering-swap-assignment'?{value:target.id}:originalGet(id);applyRosteringDriverSwap();document.getElementById=originalGet;
  globalThis.__swap={name:target.associate,count:plan.assignments.filter(row=>row.associate==='Rescue Backup').length,old:plan.assignments.some(row=>row.associate==='Rostered Person')};
  state.driverContacts=[{name:'Actual Associate',key:'actual associate',status:'ACTIVE',role:'Delivery Associate',phone:'(555) 111-2222',transporterId:'A123',email:'driver@example.com'}];
  globalThis.__teamRows=teamDriverRows().map(row=>row.name);globalThis.__teamCollapsed=teamPage();state.expandedDriverKey='actual associate';globalThis.__teamExpanded=teamPage();
  state.vanParking=defaultVanParkingSlots();
  globalThis.__parking=[parkingSpotNumber('west',3),parkingSpotNumber('west',16),parkingSpotNumber('west',17),parkingSpotNumber('west',18),parkingSpotNumber('west',19),parkingSpotNumber('west',20),parkingSpotNumber('west',21)];
`,context);

assert(context.__groups.vto2.join(',')==='Rescue Backup','Rescue must be grouped as VTO 2');
assert(context.__groups.vto4.join(',')==='Actual Associate','Delivery Associate must be grouped as VTO 4');
assert(context.__groups.other.join(',')==='Fleet Lead,Midshift Support','Every non-Rescue/Delivery Associate shift must be grouped under Other roles');
assert(context.__paycom.includes('Add to roster')&&context.__paycom.includes('Swap with rostered driver')&&!context.__paycom.includes('Keep as VTO 2'),'PAYCOM route-driver cards need Add and Swap controls');
assert(context.__backup.includes('Other roles')&&context.__backup.includes('Fleet Lead')&&context.__backup.includes('Midshift Support')&&context.__backup.includes('Swap with rostered driver'),'Unrostered backup list lost Other roles or swap controls');
assert(context.__swap.name==='Rescue Backup'&&context.__swap.count===1&&!context.__swap.old,'Roster swap must replace one rostered driver without duplication');
assert(context.__teamRows.join(',')==='Actual Associate','Drivers & Team must use only imported directory names');
assert(context.__teamCollapsed.includes('data-driver-card-toggle="true"')&&!context.__teamCollapsed.includes('>ACTIVE<')&&!context.__teamCollapsed.includes('>Active<'),'Driver cards must be expandable without the redundant Active status');
assert(context.__teamExpanded.includes('driver-card expanded')&&context.__teamExpanded.includes('Transporter ID')&&context.__teamExpanded.includes('driver@example.com'),'Expanded driver cards must show the imported details');
assert(JSON.stringify(context.__parking)===JSON.stringify(['',17,37,38,'',39,40]),'Parking numbering must skip crosswalks and continue 17, 37, 38, 39, 40');
console.log('Rostering actions, imported-only Driver cards, and crosswalk-safe parking numbering passed');
