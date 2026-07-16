const fs=require('fs');
const vm=require('vm');

const context={console,setTimeout,clearTimeout,location:{href:'https://example.test/'},window:{RELAYOPS_CLOUD_CONFIG:{}}};
context.globalThis=context;
vm.runInNewContext(fs.readFileSync('cloud-sync.js','utf8'),context,{filename:'cloud-sync.js'});
const {preparePayload,reconcilePayload,canonical}=context.window.RelayOpsCloud.__test;
const json=value=>JSON.parse(JSON.stringify(value));
const by=(rows,key,value)=>(rows||[]).find(row=>row?.[key]===value);

const baseRaw={
  morningRoutes:[{routeUid:'route-1',route:'CX101',wave:'11:15 AM',driver:'Maya Rivera',ev:'1'}],
  vanParking:[{id:'west-1',zone:'west',label:'Left 1',value:'1'},{id:'east-1',zone:'east',label:'Right 1',value:'2'}],
  scheduleEntries:[{date:'7/15/2026',name:'Maya Rivera',role:'Delivery Associate',start:'10:25 AM',end:'8:25 PM'}],
  inventoryItems:[{id:'phones',name:'CAT phones',total:10,available:10},{id:'banks',name:'Power banks',total:10,available:10}],
  inventoryLog:[],
  driverContacts:[{key:'maya-rivera',name:'Maya Rivera',phone:'1111111111'}],
  fleetImport:{vehicles:[{vin:'VIN-1',name:'EV1',operationalStatus:'Unknown',activeStatus:'Unknown',battery:80}]},
  fleetIssues:{EV1:{label:'EV1',active:[],history:[],updatedAt:'2026-07-15T09:00:00.000Z'}},
  equipmentIssues:{'device:3':{label:'Device 3',type:'device',equipmentId:'3',active:[],history:[],updatedAt:'2026-07-15T09:00:00.000Z'}}
};
const base=preparePayload(baseRaw,{},null,'2026-07-15T10:00:00.000Z');

const clientA=json(baseRaw);
clientA.morningRoutes[0].driver='Maya Rivera + Jon Torres';
clientA.vanParking[0].value='11';
clientA.inventoryItems[0].available=7;
clientA.scheduleEntries.push({date:'7/15/2026',name:'Alex Kim',role:'Rescue',start:'10:25 AM',end:'8:25 PM'});
clientA.inventoryLog.push({id:'log-a',itemId:'phones',type:'assign',quantity:1,createdAt:'2026-07-15T10:01:00.000Z'});
clientA.driverContacts.push({key:'alex-kim',name:'Alex Kim',phone:'2222222222'});
Object.assign(clientA.fleetImport.vehicles[0],{operationalStatus:'OPERATIONAL',activeStatus:'Active',battery:75});
clientA.fleetIssues.EV1.active.push({id:'issue-a',text:'Mirror cracked',status:'active',createdAt:'2026-07-15T10:01:00.000Z'});
clientA.fleetIssues.EV1.history.push(clientA.fleetIssues.EV1.active[0]);
clientA.fleetIssues.EV1.updatedAt='2026-07-15T10:01:00.000Z';
clientA.equipmentIssues['device:3'].active.push({id:'equipment-a',text:'Cracked screen',status:'active',createdAt:'2026-07-15T10:01:00.000Z'});
clientA.equipmentIssues['device:3'].history.push(clientA.equipmentIssues['device:3'].active[0]);clientA.equipmentIssues['device:3'].updatedAt='2026-07-15T10:01:00.000Z';

const clientB=json(baseRaw);
clientB.morningRoutes[0].ev='22';
clientB.vanParking[1].value='33';
clientB.inventoryItems[1].available=6;
clientB.scheduleEntries.push({date:'7/15/2026',name:'Dee Singh',role:'Midshift',start:'12:00 PM',end:'8:00 PM'});
clientB.inventoryLog.push({id:'log-b',itemId:'banks',type:'assign',quantity:2,createdAt:'2026-07-15T10:02:00.000Z'});
clientB.driverContacts.push({key:'dee-singh',name:'Dee Singh',phone:'3333333333'});
Object.assign(clientB.fleetImport.vehicles[0],{operationalStatus:'GROUNDED',activeStatus:'Inactive',battery:20});
clientB.fleetIssues.EV1.active.push({id:'issue-b',text:'Flat tire',status:'active',createdAt:'2026-07-15T10:02:00.000Z'});
clientB.fleetIssues.EV1.history.push(clientB.fleetIssues.EV1.active[0]);
clientB.fleetIssues.EV1.updatedAt='2026-07-15T10:02:00.000Z';
clientB.equipmentIssues['device:3'].active.push({id:'equipment-b',text:'Battery swelling',status:'active',createdAt:'2026-07-15T10:02:00.000Z'});
clientB.equipmentIssues['device:3'].history.push(clientB.equipmentIssues['device:3'].active[0]);clientB.equipmentIssues['device:3'].updatedAt='2026-07-15T10:02:00.000Z';

const preparedA=preparePayload(clientA,base,null,'2026-07-15T10:01:00.000Z');
const preparedB=preparePayload(clientB,base,null,'2026-07-15T10:02:00.000Z');
const merged=reconcilePayload(preparedA,preparedB,base);
const reversed=reconcilePayload(preparedB,preparedA,base);

if(canonical(merged)!==canonical(reversed))throw new Error('Concurrent reconciliation is not deterministic when client order is reversed');
const route=by(merged.morningRoutes,'routeUid','route-1');
if(route.driver!=='Maya Rivera + Jon Torres'||route.ev!=='22')throw new Error('Different concurrent edits to one route were not both preserved');
if(by(merged.vanParking,'id','west-1').value!=='11'||by(merged.vanParking,'id','east-1').value!=='33')throw new Error('Concurrent parking edits were overwritten');
if(by(merged.inventoryItems,'id','phones').available!==7||by(merged.inventoryItems,'id','banks').available!==6)throw new Error('Concurrent inventory edits were overwritten');
if(merged.scheduleEntries.length!==3||!by(merged.scheduleEntries,'name','Alex Kim')||!by(merged.scheduleEntries,'name','Dee Singh'))throw new Error('Concurrent schedule additions were not unioned');
if(merged.inventoryLog.length!==2||!by(merged.inventoryLog,'id','log-a')||!by(merged.inventoryLog,'id','log-b'))throw new Error('Concurrent inventory movements were not unioned');
if(merged.driverContacts.length!==3||!by(merged.driverContacts,'key','alex-kim')||!by(merged.driverContacts,'key','dee-singh'))throw new Error('Concurrent driver-contact additions were not unioned');
const vehicle=by(merged.fleetImport.vehicles,'vin','VIN-1');
if(vehicle.operationalStatus!=='GROUNDED'||vehicle.activeStatus!=='Inactive'||vehicle.battery!==20)throw new Error('Fleet safety conflict did not keep the conservative status and battery');
if(merged.fleetIssues.EV1.active.length!==2||merged.fleetIssues.EV1.history.length!==2)throw new Error('Concurrent Fleet issue reports were not unioned');
if(merged.equipmentIssues['device:3'].active.length!==2||merged.equipmentIssues['device:3'].history.length!==2)throw new Error('Concurrent Device issue reports were not unioned');

const issueRecord={id:'equipment-fixed-race',text:'Charging failure',severity:'high',status:'active',createdAt:'2026-07-15T12:00:00.000Z'};
const issueBaseRaw={equipmentIssues:{'portable:12':{label:'Portable 12',type:'portable',equipmentId:'12',active:[issueRecord],history:[issueRecord],updatedAt:'2026-07-15T12:00:00.000Z'}}};
const issueBase=preparePayload(issueBaseRaw,{},null,'2026-07-15T12:00:00.000Z');
const fixedClient=json(issueBaseRaw);fixedClient.equipmentIssues['portable:12'].active=[];fixedClient.equipmentIssues['portable:12'].history=[{...issueRecord,status:'fixed',resolvedAt:'2026-07-15T12:02:00.000Z',resolvedBy:'Dispatcher A'}];fixedClient.equipmentIssues['portable:12'].updatedAt='2026-07-15T12:02:00.000Z';
const staleClient=json(issueBaseRaw),newIssue={id:'equipment-new-race',text:'Damaged cable',severity:'watch',status:'active',createdAt:'2026-07-15T12:03:00.000Z'};staleClient.equipmentIssues['portable:12'].active.push(newIssue);staleClient.equipmentIssues['portable:12'].history.push(newIssue);staleClient.equipmentIssues['portable:12'].updatedAt='2026-07-15T12:03:00.000Z';
const fixedPrepared=preparePayload(fixedClient,issueBase,null,'2026-07-15T12:02:00.000Z'),stalePrepared=preparePayload(staleClient,issueBase,null,'2026-07-15T12:03:00.000Z'),issueMerged=reconcilePayload(fixedPrepared,stalePrepared,issueBase),issueStore=issueMerged.equipmentIssues['portable:12'];
if(issueStore.active.some(record=>record.id==='equipment-fixed-race')||!issueStore.active.some(record=>record.id==='equipment-new-race')||issueStore.history.find(record=>record.id==='equipment-fixed-race')?.status!=='fixed')throw new Error('Fixed equipment issue was resurrected by a concurrent stale client');

const deleteBaseRaw={inventoryItems:[{id:'delete-me',name:'Delete me',total:4,available:4}]};
const deleteBase=preparePayload(deleteBaseRaw,{},null,'2026-07-15T11:00:00.000Z');
const deleted=preparePayload({inventoryItems:[]},deleteBase,null,'2026-07-15T11:03:00.000Z');
const edited=preparePayload({inventoryItems:[{id:'delete-me',name:'Delete me',total:4,available:2}]},deleteBase,null,'2026-07-15T11:02:00.000Z');
const deletionWins=reconcilePayload(deleted,edited,deleteBase);
if(deletionWins.inventoryItems.length!==0||!deletionWins.__relayopsSync.tombstones.inventoryItems['id:delete-me'])throw new Error('A newer explicit deletion did not win with a tombstone');

const newerEdit=preparePayload({inventoryItems:[{id:'delete-me',name:'Delete me',total:4,available:1}]},deleteBase,null,'2026-07-15T11:04:00.000Z');
const editWins=reconcilePayload(deleted,newerEdit,deleteBase);
if(editWins.inventoryItems.length!==1||editWins.inventoryItems[0].available!==1||editWins.__relayopsSync.tombstones.inventoryItems?.['id:delete-me'])throw new Error('A newer edit did not supersede an older tombstone');

console.log('Cloud concurrent reconciliation and tombstone test passed');
