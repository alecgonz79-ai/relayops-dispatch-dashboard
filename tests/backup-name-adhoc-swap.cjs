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
  state.dspCode='LLOL';state.morningOperationDate='2026-08-08';
  state.driverContacts=[
    {name:'Pedro Carrillo',key:'pedro carrillo',transporterId:'PEDRO1',role:'Delivery Associate'},
    {name:'Backup Person',key:'backup person',transporterId:'BACKUP1',role:'Delivery Associate'},
    {name:'Not A Backup',key:'not a backup',transporterId:'OTHER1',role:'Delivery Associate'},
    {name:'Adhoc Alias',key:'adhoc alias',transporterId:'ADHOC1',role:'Delivery Associate'},
    {name:'Regular Driver',key:'regular driver',transporterId:'REG1',role:'Delivery Associate'}
  ];
  state.driverProfiles={};state.driverNameAliases={};
  state.scheduleEntries=[
    {date:'8/8/2026',name:'Backup Person',role:'Delivery Associate',start:'11:15 AM'},
    {date:'8/8/2026',name:'Not A Backup',role:'Delivery Associate',start:'11:20 AM'}
  ];
  state.scheduleDriverMarks={'2026-08-08|backup person':'backup','2026-08-08|not a backup':'paycom'};
  state.scheduleBackupRecords={'2026-08-08|backup person':{name:'Backup Person',role:'Delivery Associate',vto:'VTO 4'}};
  state.scheduleStayHome={};state.scheduleReductions={};state.scheduleHelpers={};state.callOffDriverKeys={};state.callOffReasons={};state.openingPicklistBackupOverrides={};

  state.morningRoutes=[
    {routeUid:'match-1',dsp:'LLOL',driver:'Pedro Antonio Carrillo',route:'CX101',wave:'11:15 AM',service:'Standard Parcel'},
    {routeUid:'match-2',dsp:'LLOL',driver:'Another Route Driver',route:'CX102',wave:'11:20 AM',service:'Standard Parcel'}
  ];
  globalThis.__matchCandidates=duplicateDriverNameCandidates('Pedro Carrillo');
  globalThis.__backupActions=picklistVtoDriverCell('vto4',0,{name:'Pedro Carrillo',role:'Delivery Associate'},'Pedro Carrillo');
  state.pendingDuplicateDriverName={source:'Pedro Carrillo'};state.modal='duplicate-driver-name';globalThis.__matchModal=modal();
  document.getElementById=id=>id==='duplicate-driver-target'?{value:'Pedro Antonio Carrillo'}:id==='app'?app:id==='file-input'?fileInput:null;
  applyDuplicateDriverNameMatch();
  globalThis.__routeAlias={source:driverIdentityKey('Pedro Carrillo'),target:driverIdentityKey('Pedro Antonio Carrillo'),names:driverProfileEntry('Pedro Antonio Carrillo').profile.names};

  state.pendingRosterSwap={route:'CX100',driverName:'Regular Driver',driverLabel:'Regular Driver',mode:'calloff'};state.modal='roster-swap';
  globalThis.__calloffModal=modal();

  state.pendingDuplicateDriverName={source:'P. Carrillo'};
  document.getElementById=id=>id==='duplicate-driver-target'?{value:'Pedro Carrillo'}:id==='app'?app:id==='file-input'?fileInput:null;
  applyDuplicateDriverNameMatch();
  globalThis.__alias={canonical:canonicalDriverName('P. Carrillo'),identity:driverIdentityKey('P. Carrillo'),target:driverIdentityKey('Pedro Carrillo'),names:driverProfileEntry('Pedro Carrillo').profile.names};

  const adhoc={routeUid:'adhoc-1',dsp:'LLOL',driver:'Adhoc Alias',route:'AX',wave:'Ad hoc',service:'Adhoc',staging:'',pad:'',padOverride:'',ev:'EV51',deviceName:'72',portable:'94',stops:8,packages:10,plannedRts:'3:00 PM'};
  const regular={routeUid:'route-1',dsp:'LLOL',driver:'Regular Driver + Helper Name',route:'CX225',wave:'11:15 AM',service:'Standard Parcel',staging:'STG.V.4',pad:'A',padOverride:'A',ev:'EV21',deviceName:'4',portable:'P3',stops:180,packages:320,plannedRts:'8:30 PM'};
  state.morningRoutes=[adhoc,regular];state.scheduleDriverMarks['2026-08-08|adhoc alias']='adhoc';state.picklistSwapAudit=[];
  state.pendingAdhocRouteSwap={routeUid:'adhoc-1',driverName:'Adhoc Alias'};document.getElementById=id=>id==='adhoc-route-swap-target'?{value:'route-1'}:id==='app'?app:id==='file-input'?fileInput:null;
  applyAdhocRouteSwap();
  globalThis.__swap={adhoc:{...adhoc},regular:{...regular},audit:[...state.picklistSwapAudit],marks:{...state.scheduleDriverMarks}};
`,context);

assert(context.__calloffModal.includes('Backup Person')&&!context.__calloffModal.includes('Not A Backup'),'Call off & swap must list only current VTO/backup drivers');
assert(context.__matchCandidates[0]?.name==='Pedro Antonio Carrillo'&&context.__matchCandidates[0]?.score>context.__matchCandidates[1]?.score,'Backup name matching must rank route drivers by first and last names');
assert(context.__backupActions.includes('Match with driver name on route'),'Each populated backup row must expose the route-name match popup');
assert(context.__matchModal.includes('Match Pedro Carrillo with a route driver')&&context.__matchModal.includes('Suggested first and last name match')&&context.__matchModal.includes('Pedro Antonio Carrillo - CX101'),'The backup match popup must suggest and identify the closest driver on a Picklist route');
assert(context.__routeAlias.source===context.__routeAlias.target&&context.__routeAlias.names.includes('Pedro Carrillo')&&context.__routeAlias.names.includes('Pedro Antonio Carrillo'),'Confirming the route driver must teach the dashboard both PAYCOM and Amazon name variations');
assert(context.__alias.canonical==='Pedro Carrillo'&&context.__alias.identity===context.__alias.target&&context.__alias.names.includes('P. Carrillo'),'Duplicate Name must persist the imported variant on the selected driver identity');
assert(context.__swap.regular.driver==='Adhoc Alias + Helper Name'&&context.__swap.adhoc.driver==='Regular Driver','Adhoc and regular primary drivers were not exchanged cleanly');
assert(context.__swap.regular.route==='CX225'&&context.__swap.regular.staging==='STG.V.4'&&context.__swap.regular.pad==='A'&&context.__swap.regular.ev==='EV21'&&context.__swap.regular.deviceName==='4'&&context.__swap.regular.portable==='P3'&&context.__swap.regular.stops===180&&context.__swap.regular.packages===320&&context.__swap.regular.plannedRts==='8:30 PM','Regular-route operational data moved during the Adhoc swap');
assert(context.__swap.adhoc.route==='AX'&&context.__swap.adhoc.ev==='EV51'&&context.__swap.adhoc.deviceName==='72'&&context.__swap.adhoc.portable==='94','Adhoc operational data moved during the swap');
assert(context.__swap.audit.length===1&&context.__swap.audit[0].from==='Regular Driver'&&context.__swap.audit[0].to==='Adhoc Alias','Cortex swap tracker did not record the regular-route change');
console.log('Backup duplicate-name, call-off candidate, and Adhoc route swap tests passed');
