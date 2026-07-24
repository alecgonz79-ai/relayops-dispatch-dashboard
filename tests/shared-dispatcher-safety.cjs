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
  state.dspCode='LLOL';state.morningOperationDate='2026-07-20';state.driverContacts=[{name:'Call Off Driver',key:'call off driver'},{name:'Helper One',key:'helper one'},{name:'Driver A',key:'driver a'},{name:'Driver B',key:'driver b'},{name:'Driver C',key:'driver c'}];
  state.scheduleEntries=[{date:'2026-07-20',name:'Call Off Driver',role:'Rescue',start:'11:15 AM'},{date:'2026-07-20',name:'Helper One',role:'Driver Helper',start:'11:20 AM'}];
  state.scheduleDriverMarks={'2026-07-20|call off driver':'backup'};state.scheduleBackupRecords={'2026-07-20|call off driver':{name:'Call Off Driver',role:'Rescue'}};state.openingPicklistBackupOverrides={'vto2:0':'Call Off Driver'};state.openingPicklistCalloffDrafts=[{name:'Call Off Driver',reason:'Sick'}];state.callOffDriverKeys={};state.callOffReasons={};
  commitOpeningPicklistCalloffDraft(0);
  globalThis.__calloff={marks:Object.keys(state.scheduleDriverMarks),backups:Object.keys(state.scheduleBackupRecords),override:state.openingPicklistBackupOverrides['vto2:0'],records:Object.values(state.callOffDriverKeys),reason:Object.values(state.callOffReasons)[0]};

  state.rosteringDate='2026-07-20';state.rosteringHelperPool={};state.rosteringPlans={'2026-07-20':normalizeRosteringPlan({services:[{id:'driver-only',name:'Driver service',confirmed:1,kind:'driver',defaultTime:'11:15 AM'}],assignments:[{id:'slot-1',serviceId:'driver-only',start:'11:15 AM',associate:'',route:'',role:'',source:'template'}]})};
  const noHelperPlan=currentRosteringPlan(),helperAdded=syncRosteringHelperShifts(noHelperPlan);globalThis.__noHelper={added:helperAdded,services:noHelperPlan.services.length,box:rosteringHelperShiftsHtml(noHelperPlan)};
  noHelperPlan.services.push({id:'helper-block',name:'Helper service',confirmed:1,kind:'helper',defaultTime:'11:20 AM'});noHelperPlan.assignments.push({id:'helper-slot',serviceId:'helper-block',start:'11:20 AM',associate:'Helper One',route:'',role:'Driver Helper',source:'manual'});state.pendingRosteringServiceDelete={id:'helper-block',name:'Helper service'};confirmDeleteRosteringService();globalThis.__helperRemoved={service:noHelperPlan.services.some(row=>row.id==='helper-block'),pool:rosteringHelperPoolRows().map(row=>row.name)};

  state.scheduleEntries=[{date:'2026-07-20',name:'Driver A',role:'Delivery Associate',start:'11:15 AM'},{date:'2026-07-20',name:'Driver B',role:'Delivery Associate',start:'11:20 AM'},{date:'2026-07-20',name:'Driver C',role:'Rescue',start:'11:25 AM'}];
  state.rosteringPlans={'2026-07-20':normalizeRosteringPlan({services:[{id:'one-route',name:'One confirmed route',confirmed:1,kind:'driver',defaultTime:'11:15 AM'}],assignments:[{id:'one',serviceId:'one-route',start:'11:15 AM',associate:'',route:'',role:'',source:'template'},{id:'extra-a',serviceId:'one-route',start:'11:20 AM',associate:'',route:'',role:'',source:'template'},{id:'extra-b',serviceId:'one-route',start:'11:25 AM',associate:'',route:'',role:'',source:'template'}]})};
  const cappedPlan=currentRosteringPlan(),cappedResult=autoRosterFromPaycom({silent:true,mode:'abc'});globalThis.__cap={drivers:cappedResult.drivers,confirmed:cappedPlan.services[0].confirmed,rostered:cappedPlan.assignments.filter(row=>row.associate).length};

  rivianFleet.splice(0,rivianFleet.length,{name:'EV1',vin:'7FCEHEB79PN000001',battery:96,miles:150,operational:'Operational',active:'Active',vehicleType:'Rivian EDV 700',source:'Amazon fleet list + FleetOS tracker',hasBattery:true,hasActive:true,hasOperational:true},{name:'EV2',vin:'7FCEHEB79PN000002',battery:97,miles:151,operational:'Operational',active:'Active',vehicleType:'Rivian EDV 700',source:'Amazon fleet list + FleetOS tracker',hasBattery:true,hasActive:true,hasOperational:true},{name:'EV3',vin:'7FCEHEB79PN000003',battery:98,miles:152,operational:'Operational',active:'Active',vehicleType:'Rivian EDV 700',source:'Amazon fleet list + FleetOS tracker',hasBattery:true,hasActive:true,hasOperational:true});
  state.equipmentImport={details:{'1':{device:'D1',portable:'P1'},'2':{device:'D2',portable:''},'3':{device:'D3',portable:'-'}}};globalThis.__readyPool=automaticFleetVehiclePool({electricOnly:true}).map(row=>row.label);
  state.deviceCustomRows={ev:[{uid:'ev60',label:'EV60'},{uid:'ev59',label:'EV59'}],gas:[],helper:[]};state.removedDeviceVehicleIds=[];sortDeviceCustomRows('ev');const sortedDeviceIds=deviceSheetAllIds('ev');removeDeviceVehicleRow('ev','EV2','');globalThis.__deviceList={ids:deviceSheetAllIds('ev'),removed:[...state.removedDeviceVehicleIds],custom:state.deviceCustomRows.ev.map(row=>row.label),sorted:sortedDeviceIds};removeDeviceVehicleRow('ev','EV60','ev60');globalThis.__customDeviceRemoval={ids:deviceSheetAllIds('ev'),removed:[...state.removedDeviceVehicleIds]};

  state.fitOpeningPicklistRows=true;state.openingPicklistWaveSlots=5;state.openingPicklistShowAdhoc=true;state.morningRoutes=[['CX1','11:15 AM','1'],['CX2','11:20 AM','1'],['CX3','11:25 AM',''],['CX4','11:40 AM',''],['CX5','11:45 AM',''],['AX','Ad hoc','']].map(([route,wave,ev],index)=>({routeUid:'u'+index,dsp:'LLOL',driver:'Driver '+index,route,wave,staging:'STG.V.'+(index+1),pad:'A',service:route==='AX'?'Adhoc':'Standard Parcel',ev,deviceName:'',portable:'',stops:100,packages:200}));
  const sections=openingPicklistSections(),duplicateSection={...sections[0],rows:state.morningRoutes.slice(0,2),capacity:2,hasTime:true};globalThis.__picklist={waveCaps:sections.slice(0,5).map(row=>row.capacity),adhoc:sections.find(row=>row.key==='adhoc')?.capacity,duplicate:openingPicklistSectionHtml(duplicateSection,0),morning:morningWaveGroup(duplicateSection,0)};
  state.pendingVtoRouteSwap={name:'Driver C',role:'Rescue',vto:'VTO 2'};state.modal='vto-route-swap';globalThis.__swapModal=modal();
  globalThis.__shared=sharedWorkspaceState();globalThis.__persistent=persistentWorkspaceState();
`,context);

assert(context.__calloff.marks.length===0&&context.__calloff.backups.length===0&&!context.__calloff.override&&context.__calloff.records.length===1&&context.__calloff.records[0].name==='Call Off Driver'&&context.__calloff.reason==='Sick','Typed call-off did not leave exactly one Called Off record and clear VTO/backups');
assert(context.__noHelper.added===0&&context.__noHelper.services===1&&context.__noHelper.box.includes('Waiting in Helper box')&&!context.__noHelper.box.includes('Added to Helper roster'),'PAYCOM helpers must stay in Helper box when Amazon confirms no helper service');
assert(!context.__helperRemoved.service&&context.__helperRemoved.pool.includes('Helper One'),'Deleting a helper service must move its rostered names into the Helper box');
assert(context.__cap.drivers===1&&context.__cap.confirmed===1&&context.__cap.rostered===1,'Auto Roster exceeded the exact confirmed route count');
assert(context.__readyPool.join(',')==='EV1,EV2,EV3',`Automatic assignment must allow blank or dash Portable when a Device is entered (got ${context.__readyPool.join(',')||'empty'})`);
assert(!context.__deviceList.ids.includes('EV2')&&context.__deviceList.removed.includes('2'),'Deleting a fixed EV must persistently remove it from the Device and Portable list');
assert(context.__deviceList.sorted.slice(-2).join(',')==='EV59,EV60'&&context.__deviceList.custom.join(',')==='EV59,EV60','New EV rows must stay in natural numerical order');
assert(!context.__customDeviceRemoval.ids.includes('EV60')&&context.__customDeviceRemoval.removed.includes('60'),'Deleting a newly added EV must keep it removed during later Fleet imports');
assert(context.__picklist.waveCaps.every(value=>value===1)&&context.__picklist.adhoc===15,'Picklist blank-row compaction must affect only Wave 1–5');
assert(context.__picklist.duplicate.includes('duplicate-van-cell')&&context.__picklist.duplicate.includes('EV assigned twice')&&context.__picklist.morning.includes('duplicate-van-cell'),'Duplicate EV warning must appear in both Picklist and Morning Sheet cells');
assert(context.__swapModal.includes('vto-route-swap-search')&&context.__swapModal.includes('Search driver or CX route'),'Swap To Route modal lost its searchable route picker');
assert(context.__shared.fitOpeningPicklistRows===true&&context.__shared.rosteringHelperPool&&context.__persistent.rosteringHelperPool,'Shared snapshots must include Picklist compaction and Helper-box state');
console.log('Shared dispatcher sync, roster cap, equipment readiness, duplicate EV, and Picklist compaction tests passed');
