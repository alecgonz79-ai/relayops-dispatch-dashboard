const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}
const app={innerHTML:''},fileInput={accept:'',addEventListener(){},click(){}};
const storage=new Map();
const element=()=>({addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},setSelectionRange(){},click(){}});
const documentMock={
  body:{appendChild(){}},
  getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,
  querySelectorAll(){return[];},
  createElement:element
};
const context={
  console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,
  navigator:{clipboard:{writeText:async()=>true}},
  window:{scrollTo(){}},
  localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value))},
  document:documentMock
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
vm.runInContext(`
  toast=()=>{};render=()=>{};
  state.dspCode='LLOL';state.fitMorningRows=true;state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.driverContacts=[{name:'Pedro Miguel Carrillo',phone:'(951) 555-0101',role:'Delivery Associate',transporterId:'P1',key:'pedro miguel carrillo'}];
  state.driverProfiles={
    'name:pedro carrillo':{
      canonical:'Pedro Carrillo',nickname:'',names:['Pedro Carrillo'],tags:[],flags:[],customFlags:[],preferredEvs:[],transporterId:'',updatedAt:'2026-07-01T00:00:00.000Z'
    },
    'id:P1':{
      canonical:'Pedro Miguel Carrillo',nickname:'Pedro',names:['Pedro Miguel Carrillo','Pedro Carrillo','Pedro'],tags:[],flags:[],customFlags:[],preferredEvs:[],transporterId:'P1',updatedAt:'2026-07-20T00:00:00.000Z'
    }
  };
  invalidateDriverDirectoryCaches();
  state.pendingPreferredVehicleId='EV51';
  document.querySelectorAll=selector=>selector==='[data-preferred-vehicle-driver]:checked'?[{value:'Pedro Miguel Carrillo'}]:[];
  savePreferredVehicleDrivers();
  globalThis.__profilesAfterSave=JSON.parse(JSON.stringify(state.driverProfiles));
  globalThis.__pedroPreferred=driverPreferredVehicleIds('Pedro Carrillo');
  globalThis.__pedroFullPreferred=driverPreferredVehicleIds('Pedro Miguel Carrillo');
  globalThis.__priorityList=prioritizedDriversForVehicle('51');

  const vehicle=(number,battery=90,operational='Operational')=>({
    name:'EV'+number,vin:'7FCEHEB79PN'+String(number).padStart(6,'0'),battery,miles:130,
    vehicleType:'Rivian EDV 700',operational,active:'Active',
    source:'Amazon fleet list + FleetOS tracker',
    hasBattery:true,hasMiles:true,hasActive:true,hasOperational:true
  });
  rivianFleet.splice(0,rivianFleet.length,vehicle(51),vehicle(52));
  state.equipmentImport={details:{
    '51':{device:'D51',portable:'P51'},
    '52':{device:'D52',portable:'P52'}
  }};
  state.morningRoutes=[
    {dsp:'LLOL',driver:'Another Driver',route:'CX200',service:'Standard Parcel',wave:'11:15 AM',staging:'STG.V.1',ev:'',deviceName:'',portable:''},
    {dsp:'LLOL',driver:'Pedro Carrillo',route:'CX201',service:'Standard Parcel',wave:'11:20 AM',staging:'STG.V.2',ev:'',deviceName:'',portable:''}
  ];
  assignOperationalVehicles();
  globalThis.__assigned=JSON.parse(JSON.stringify(state.morningRoutes));

  state.driverProfiles={
    'id:P1':{
      canonical:'Pedro Miguel Carrillo',nickname:'Pedro',names:['Pedro Miguel Carrillo','Pedro'],tags:[],flags:[],customFlags:[],preferredEvs:['51'],transporterId:'P1',updatedAt:'2026-07-20T00:00:00.000Z'
    }
  };
  invalidateDriverDirectoryCaches();
  globalThis.__variantPreferred=driverPreferredVehicleIds('Pedro Carrillo');
`,context);

const profiles=Object.values(context.__profilesAfterSave);
assert(profiles.length===1,'Saving a prioritized van must merge the legacy name profile into the Transporter-ID profile');
assert(profiles[0].transporterId==='P1','The Transporter-ID profile must remain authoritative');
assert(profiles[0].preferredEvs.join(',')==='51','EV51 must be saved on Pedro’s canonical profile');
assert(context.__pedroPreferred.join(',')==='51'&&context.__pedroFullPreferred.join(',')==='51','Full and shortened Pedro names must resolve EV51');
assert(context.__priorityList.length===1&&context.__priorityList[0]==='Pedro Miguel Carrillo','EV51 priority list must contain Pedro exactly once');
const pedro=context.__assigned.find(row=>row.route==='CX201'),other=context.__assigned.find(row=>row.route==='CX200');
assert(pedro.ev==='51'&&pedro.deviceName==='D51'&&pedro.portable==='P51','Automatic safe assignment must give Pedro EV51 with its equipment');
assert(other.ev==='52','The earlier non-prioritized route must not take Pedro’s reserved EV51');
assert(context.__variantPreferred.join(',')==='51','A shortened Morning Sheet name must resolve a full Transporter-backed Pedro profile');

console.log('Duplicate-profile and shortened-name EV51 priority contracts passed');
