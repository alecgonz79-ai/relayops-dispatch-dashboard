const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}
const storage=new Map(),app={innerHTML:''},fileInput={accept:'',addEventListener(){},click(){}};
const element=()=>({addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},setSelectionRange(){},click(){}});
const document={
  body:{appendChild(){}},
  documentElement:{contains(){return true;}},
  getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,
  querySelector(){return null;},
  querySelectorAll(){return[];},
  createElement:element
};
const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value))},document};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
vm.runInContext(`
  toast=()=>{};render=()=>{};persist=()=>{};
  state.dspCode='LLOL';state.driverContacts=[
    {name:'Alice Driver',role:'Delivery Associate',transporterId:'A1'},
    {name:'Bob Driver',role:'Delivery Associate',transporterId:'B1'}
  ];state.driverProfiles={};state.driverNameAliases={};state.driverContacts.forEach(ensureDriverProfile);
  driverProfileEntry('Bob Driver').profile.preferredEvs=['1'];
  state.pendingPreferredVehicleId='EV1';state.modal='preferred-vehicle-drivers';
  globalThis.__preferenceModal=modal();
  globalThis.__deviceBefore=deviceSheetRows('ev');

  document.querySelectorAll=selector=>selector==='[data-preferred-vehicle-driver]:checked'?[{value:'Alice Driver'}]:[];
  savePreferredVehicleDrivers();
  globalThis.__alicePreferred=driverPreferredVehicleIds('Alice Driver');
  globalThis.__bobPreferred=driverPreferredVehicleIds('Bob Driver');
  globalThis.__deviceAfter=deviceSheetRows('ev');

  const ev=(number)=>({name:'EV'+number,vin:'7FCEHEB79PN'+String(number).padStart(6,'0'),battery:95,miles:150,vehicleType:'Rivian EDV 700',operational:'Operational',active:'Active',source:'Amazon fleet list + FleetOS tracker',hasBattery:true,hasMiles:true,hasActive:true,hasOperational:true});
  const gas=(name,vin)=>({name,vin,battery:null,miles:null,vehicleType:'Ford Transit Cargo Van',operational:'Operational',active:'Active',source:'Amazon fleet list',hasBattery:false,hasMiles:false,hasActive:true,hasOperational:true});
  rivianFleet.splice(0,rivianFleet.length,ev(1),ev(2),ev(3),gas('F33','1FTYR3XM1PKA00033'));
  state.equipmentImport={details:{'1':{device:'1',portable:'2'},'2':{device:'2',portable:''},'3':{device:'3',portable:'4'},F33:{device:'33',portable:'-'}}};
  driverProfileEntry('Alice Driver').profile.preferredEvs=['3'];
  state.morningRoutes=[
    {dsp:'LLOL',driver:'Alice Driver',route:'CX101',service:'Standard Parcel',wave:'11:15 AM',staging:'STG.V.1',ev:'',deviceName:'',portable:''},
    {dsp:'LLOL',driver:'Bob Driver',route:'CX102',service:'Standard Parcel',wave:'11:20 AM',staging:'STG.V.2',ev:'',deviceName:'',portable:''},
    {dsp:'LLOL',driver:'Cara Driver',route:'CX103',service:'Standard Parcel',wave:'11:25 AM',staging:'STG.V.3',ev:'',deviceName:'',portable:''}
  ];
  parkingSlots=zone=>zone==='west'?[{value:'EV2'},{value:'EV1'}]:zone==='east'?[{value:'EV3'}]:[];
  assignVansByParking();
  globalThis.__parkingAssignments=state.morningRoutes.map(route=>route.ev);
  state.morningRoutes.forEach(clearEquipmentForRoute);
  assignBagReadyVehicles();
  globalThis.__preppedAssignments=state.morningRoutes.map(route=>route.ev);

  openGasVehicleAssignment();
  globalThis.__gasInitial={routes:[...state.gasAssignmentRoutes],vans:[...state.gasAssignmentVans],html:modal()};
  toggleGasDriver('CX102');
  applyGasVehicleAssignment();
  globalThis.__gasFinal=state.morningRoutes.map(route=>({route:route.route,ev:route.ev,device:route.deviceName,portable:route.portable}));
`,context);

assert(context.__preferenceModal.includes('Who should receive EV1?')&&context.__preferenceModal.includes('Alice Driver')&&context.__preferenceModal.includes('Bob Driver'),'Preferred-EV star modal must list Drivers & Team names');
assert(context.__deviceBefore.includes('open-preferred-vehicle-drivers')&&context.__deviceBefore.includes('device-priority-star active'),'Every EV row must expose its star and show saved priority');
assert(context.__alicePreferred.join(',')==='1'&&context.__bobPreferred.length===0,'Saving an EV star must add selected drivers and remove unchecked drivers for that EV');
assert(context.__deviceAfter.includes('Alice Driver prioritized for EV1'),'Active EV star must identify the prioritized driver');
assert(context.__parkingAssignments.join(',')==='3,2,1',`Parking-order assignment must honor a safe preferred EV, preserve parking order, and allow a blank Portable when a Device is entered (got ${context.__parkingAssignments.join(',')})`);
assert(context.__preppedAssignments.join(',')==='3,1,2',`Prepped Vans must honor preferences while assigning safe EVs with a Device; Portable may be blank or dash (got ${context.__preppedAssignments.join(',')})`);
assert(!fs.readFileSync(require.resolve('../app.js'),'utf8').includes('Bag Ready Vans</button>')&&fs.readFileSync(require.resolve('../app.js'),'utf8').includes('Prepped Vans</button>'),'Morning tools must label the readiness action Prepped Vans');
assert(context.__gasInitial.routes.length===0,'Gas assignment must never preselect drivers');
assert(context.__gasInitial.vans.join(',')==='F33','Verified gas vans should be ready automatically so dispatchers only need to choose driver names');
assert(context.__gasInitial.html.includes('Choose the driver boxes receiving gas vans')&&context.__gasInitial.html.includes('Alice Driver')&&context.__gasInitial.html.includes('Bob Driver'),'Gas picker must clearly list visible driver names');
assert(context.__gasFinal.find(row=>row.route==='CX101').ev==='3','Unselected drivers must keep their existing van');
assert(context.__gasFinal.find(row=>row.route==='CX102').ev==='F33'&&context.__gasFinal.find(row=>row.route==='CX102').device==='33','Only the selected driver should receive the chosen gas van and matched device');

console.log('Preferred EV star, parking priority, and explicit gas-driver picker contracts passed');
