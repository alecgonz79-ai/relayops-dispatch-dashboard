const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}
const app={innerHTML:''},fileInput={accept:'',addEventListener(){},click(){}};
const storage=new Map();
const element=()=>({addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},setSelectionRange(){},click(){}});
const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value))},document:{body:{appendChild(){}},getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,querySelectorAll(){return[];},createElement:element}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
vm.runInContext(`
  toast=()=>{};render=()=>{};
  state.dspCode='LLOL';state.fitMorningRows=true;state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.importedFile={
    name:'all-service-types.xlsx',kind:'plan',
    headers:['DSP','Route Code','Service Type','Wave','Staging Location','Route Duration','Num Packages'],
    rows:[
      ['LLOL','CX101','Standard Parcel Electric - Rivian MEDIUM','11:40 AM','STG.V.1',420,301],
      ['LLOL','CX102','Nursery Route Level 1 - Electric Vehicle','11:20 AM','STG.P.1',300,190],
      ['LLOL','CX103','Nursery Route Level 2 - Electric Vehicle','11:20 AM','STG.P.2',310,212],
      ['LLOL','CX104','Nursery Route Level 3 - Electric Vehicle','11:20 AM','STG.P.3',320,225],
      ['LLOL','CX105','Standard Parcel - Extra Large Van - US','11:45 AM','STG.X.5',440,280],
      ['LLOL','CX106','Standard Parcel - Small Van','11:25 AM','STG.S.6',360,230],
      ['LLOL','CX107','Standard Parcel Electric - Rivian MEDIUM with Helper',0.46875,'STG.M.7',480,355],
      ['LLOL','CX108','Extra Large - AMZ Donations','11:25 AM','STG.X.8',390,244],
      ['LLOL','CX109','XL_US Custom Service','11:45 AM','STG.X.9',440,280],
      ['OTHER','CX999','Standard Parcel','11:10 AM','STG.A.1',400,300],
      ['LLOL','','Standard Parcel','11:50 AM','STG.V.9',400,300]
    ]
  };
  globalThis.__preflight=importPreflight();
  applyImport();
  globalThis.__imported=JSON.parse(JSON.stringify(state.morningRoutes));
  globalThis.__sections=morningSections(allMorningRows()).map(section=>({label:section.label,routes:section.rows.map(row=>row.route)}));

  state.driverContacts=[];state.driverProfiles={};state.driverNameAliases={};
  mergeDriverContacts([{name:'Alice Driver',phone:'(555) 111-1111',role:'Delivery Associate',transporterId:'A1',key:'alice driver'},{name:'Bob Driver',phone:'(555) 222-2222',role:'Delivery Associate',transporterId:'B1',key:'bob driver'},{name:'Cara Driver',phone:'(555) 333-3333',role:'Delivery Associate',transporterId:'C1',key:'cara driver'}]);
  driverProfileEntry('Alice Driver').profile.preferredEvs=normalizePreferredVehicleIds(['EV3','EV2']);
  driverProfileEntry('Bob Driver').profile.preferredEvs=normalizePreferredVehicleIds(['1']);
  driverProfileEntry('Cara Driver').profile.preferredEvs=normalizePreferredVehicleIds(['EV4']);
  mergeDriverContacts([{name:'Alice A. Driver',phone:'(555) 111-1111',role:'Delivery Associate',transporterId:'A1',key:'alice a driver'}]);
  globalThis.__aliceProfileAfterImport=JSON.parse(JSON.stringify(driverProfileEntry('Alice A. Driver').profile));
  persist();
  globalThis.__savedProfiles=JSON.parse(localStorage.getItem('relayops_driver_profiles'));
  globalThis.__sharedProfiles=JSON.parse(JSON.stringify(sharedWorkspaceState().driverProfiles));
  openDriverAlias('Alice A. Driver');globalThis.__profileModal=modal();state.modal=null;globalThis.__teamHtml=teamPage();

  const vehicle=(number,battery=80,operational='Operational')=>({name:'EV'+number,vin:'7FCEHEB79PN'+String(number).padStart(6,'0'),battery,miles:120,vehicleType:'Rivian EDV 700',operational,active:'Active',source:'Amazon fleet list + FleetOS tracker',hasBattery:true,hasMiles:true,hasActive:true,hasOperational:true});
  rivianFleet.splice(0,rivianFleet.length,vehicle(1),vehicle(2,80,'Grounded'),vehicle(3),vehicle(4,20),vehicle(5));
  state.equipmentImport={details:{'1':{device:'D1',portable:'P1'},'3':{device:'D3',portable:'P3'},'5':{device:'D5',portable:'P5'}}};
  state.morningRoutes=[
    {dsp:'LLOL',driver:'Alice Driver',route:'CX201',service:'Standard Parcel',wave:'11:15 AM',staging:'STG.V.1',ev:'',deviceName:'',portable:''},
    {dsp:'LLOL',driver:'Bob Driver',route:'CX202',service:'Standard Parcel',wave:'11:20 AM',staging:'STG.V.2',ev:'',deviceName:'',portable:''},
    {dsp:'LLOL',driver:'Cara Driver',route:'CX203',service:'Standard Parcel',wave:'11:25 AM',staging:'STG.V.3',ev:'',deviceName:'',portable:''}
  ];
  assignOperationalVehicles();
  globalThis.__assigned=JSON.parse(JSON.stringify(state.morningRoutes));
  globalThis.__picklistHtml=openingPicklistHtml();
`,context);

assert(context.__preflight.ready&&context.__preflight.included===9&&context.__preflight.excluded===2,'Preflight must keep every valid LLOL Route Code and skip the other DSP/blank route');
assert(context.__preflight.checks.some(check=>check.label==='All Service Types included'&&check.ok),'Preflight must explicitly prove Service Type completeness');
assert(context.__imported.length===9,'DAYOFOPSPLAN import dropped a DSP-matching service variant');
assert(context.__imported.map(row=>row.route).join(',')==='CX107,CX102,CX103,CX104,CX106,CX108,CX101,CX105,CX109','Routes must retain the correct wave and sort earliest first');
assert(context.__imported.find(row=>row.route==='CX107').wave==='11:15 AM','Numeric Excel wave time was not normalized correctly');
for(const service of ['Standard Parcel Electric - Rivian MEDIUM','Nursery Route Level 1 - Electric Vehicle','Nursery Route Level 2 - Electric Vehicle','Nursery Route Level 3 - Electric Vehicle','Standard Parcel - Extra Large Van - US','Standard Parcel - Small Van','Standard Parcel Electric - Rivian MEDIUM with Helper','Extra Large - AMZ Donations','XL_US Custom Service'])assert(context.__imported.some(row=>row.service===service),`Service Type was dropped or rewritten: ${service}`);
const sectionRoutes=context.__sections.flatMap(section=>section.routes);
assert(['CX101','CX102','CX103','CX104','CX105','CX106','CX107','CX108','CX109'].every(route=>sectionRoutes.includes(route)),'Morning Sheet sections must render every imported Service Type route');

assert(context.__aliceProfileAfterImport.canonical==='Alice A. Driver'&&context.__aliceProfileAfterImport.preferredEvs.join(',')==='3,2','Preferred EV order must survive a same-TransporterID team reimport');
assert(Object.values(context.__savedProfiles).some(profile=>profile.transporterId==='A1'&&profile.preferredEvs.join(',')==='3,2'),'Preferred EVs must persist in local workspace state');
assert(Object.values(context.__sharedProfiles).some(profile=>profile.transporterId==='A1'&&profile.preferredEvs.join(',')==='3,2'),'Preferred EVs must be included in shared workspace state');
assert(context.__profileModal.includes('Preferred EV(s) / van(s)')&&context.__profileModal.includes('EV3, EV2')&&context.__profileModal.includes('Save driver profile'),'Driver profile editor must expose ordered preferred EVs and its safety explanation');
assert(context.__teamHtml.includes('Preferred vans')&&context.__teamHtml.includes('EV3 · EV2'),'Driver cards must show saved preferred vans to dispatchers');
assert(context.__assigned.map(row=>row.ev).join(',')==='3,1,5','Automatic assignment must honor safe preferences, skip grounded/low preferences, and keep vans unique');
assert(context.__assigned.map(row=>`${row.deviceName}/${row.portable}`).join(',')==='D3/P3,D1/P1,D5/P5','Preferred assignment must still match device/portable by assigned van');
assert(context.__picklistHtml.includes('Alice A. Driver')&&context.__picklistHtml.includes('D3')&&context.__picklistHtml.includes('P3'),'Opening Picklist must reflect the same preferred assignment as the Morning Sheet');
assert(context.__picklistHtml.includes('Bob Driver')&&context.__picklistHtml.includes('D1')&&context.__picklistHtml.includes('P1'),'Picklist did not receive the second preferred EV assignment');

console.log('All-Service-Type morning import and safe preferred-EV assignment contracts passed');
