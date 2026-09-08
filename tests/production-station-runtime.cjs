const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const runtimeSource=fs.readFileSync(require.resolve('../station-workspace.js'),'utf8');
const cloudSource=fs.readFileSync(require.resolve('../cloud-sync.js'),'utf8');
const DJT6='d70f25c4-be18-45be-b13d-49e3bcb9b124';
const DUR6='810b35e1-df69-494b-9a35-4a953a4dc839'; // Test fixture, never deployment configuration.
const clone=value=>JSON.parse(JSON.stringify(value));
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function storage(seed={}){
  const values=new Map(Object.entries(seed));
  return {values,get length(){return values.size;},key(index){return [...values.keys()][index]??null;},getItem(key){return values.get(String(key))??null;},setItem(key,value){values.set(String(key),String(value));},removeItem(key){values.delete(String(key));},clear(){values.clear();}};
}
function config(){return {multiStationEnabled:true,organizationId:'org',stationId:DJT6,stations:{DJT6:{stationId:DJT6},DUR6:{stationId:DUR6}},supabaseUrl:'https://test.supabase.co',supabaseAnonKey:'public-test-key',authRedirectUrl:'https://relayops.example/',saveDebounceMs:5000};}
function runtime({url='https://relayops.example/?station=DJT6',settings=config(),store=storage(),client=null}={}){
  const location=new URL(url),timers=new Set();
  const context={console,URL,URLSearchParams,location,Date,Math,Map,Set,WeakMap,
    setTimeout(fn,ms){const timer=setTimeout(()=>{timers.delete(timer);fn();},ms);timer.unref?.();timers.add(timer);return timer;},
    clearTimeout(timer){timers.delete(timer);clearTimeout(timer);},
    document:{visibilityState:'visible',addEventListener(){}},
    window:{location,localStorage:store,sessionStorage:storage(),addEventListener(){},RELAYOPS_CLOUD_CONFIG:settings,supabase:{createClient:()=>{assert(client,'No database client should be created in a disabled workspace');return client;}}}};
  vm.createContext(context);vm.runInContext(runtimeSource,context,{filename:'station-workspace.js'});
  return {context,station:context.window.RelayOpsStation,store,timers,close(){timers.forEach(clearTimeout);timers.clear();},cloud(){vm.runInContext(cloudSource,context,{filename:'cloud-sync.js'});return context.window.RelayOpsCloud;}};
}
function deferred(){let resolve;const promise=new Promise(yes=>{resolve=yes;});return {promise,resolve};}
function backend(){
  const rows=new Map(),reads=[],writes=[];
  const key=(station,date)=>`${station}:${date}`;
  return {rows,reads,writes,key,seed(station,date,payload,revision=1){rows.set(key(station,date),{operation_date:date,payload:clone(payload),revision,updated_at:'2026-09-07T20:00:00Z'});},client(userId,hook=()=>null){
    const session={user:{id:userId,email:`${userId}@example.com`}};
    return {auth:{getSession:async()=>({data:{session},error:null}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),signInWithOtp:async request=>{reads.push({kind:'auth-redirect',userId,request});return {error:null};},signOut:async()=>({error:null})},
      from(table){const filters={};let select='';return {select(fields){select=fields;return this;},eq(field,value){filters[field]=value;return this;},async maybeSingle(){reads.push({kind:table,userId,filters:{...filters},select});if(table==='memberships')return {data:{user_id:userId,role:'dispatcher',active:true},error:null};if(table==='station_memberships')return {data:{station_id:filters.station_id},error:null};return {data:clone(rows.get(key(filters.station_id,filters.operation_date))||null),error:null};}};},
      async rpc(name,args){if(name==='relayops_admin_status')return {data:false,error:null};assert.equal(name,'save_workspace_snapshot_v5');writes.push({userId,...clone(args)});const intercept=hook(args);if(intercept)return await intercept;const prior=rows.get(key(args.target_station,args.target_date));if(args.expected_revision!==Number(prior?.revision||0))return {data:{status:'conflict'},error:null};const row={operation_date:args.target_date,payload:clone(args.new_payload),revision:Number(prior?.revision||0)+1,updated_at:'2026-09-07T20:01:00Z'};rows.set(key(args.target_station,args.target_date),row);return {data:{status:'saved',...clone(row)},error:null};},removeChannel(){}};
  }};
}
function workspace(server,{code='DJT6',date='2026-09-07',userId='dispatcher-1',store=storage(),hook}={}){
  const page=runtime({url:`https://relayops.example/?station=${code}&date=${date}`,store,client:server.client(userId,hook)});
  let daily={},persistent={},activeDate=date;
  page.context.window.RelayOpsApp={operationDate:()=>activeDate,operationDateIsWritable:()=>true,sharedState:()=>daily,persistentState:()=>persistent,
    resetDailyState(){daily={};},resetSharedDailyState(){daily={};},applySharedState(value){daily=clone(value);},applyPersistentState(value){persistent=clone(value);}};
  return {...page,cloud:page.cloud(),get daily(){return daily;},get persistent(){return persistent;},setDaily(value){daily=clone(value);},setPersistent(value){persistent=clone(value);},setDate(value){activeDate=value;}};
}

(async()=>{
  const store=storage({'relayops_morning':'DJT6 routes','relayops_equipment_import':'DJT6 devices','relayops_morning_sheets_endpoint':'DJT6 connector','sb-test-auth-token':'shared authentication','relayops_station_DUR6:relayops_morning':'DUR6 routes'});
  const djt=runtime({store}),dur=runtime({url:'https://relayops.example/?station=DUR6',store});
  assert.equal(djt.station.code,'DJT6');assert.equal(dur.station.stationId,DUR6);assert(Object.isFrozen(dur.station));
  assert.equal(djt.station.storage.getItem('relayops_morning'),'DJT6 routes');assert.equal(dur.station.storage.getItem('relayops_morning'),'DUR6 routes');
  assert.equal(dur.station.storage.getItem('relayops_equipment_import'),null,'Never seed DUR6 with DJT6 equipment');
  assert.equal(dur.station.storage.getItem('relayops_morning_sheets_endpoint'),null,'Never inherit DJT6 Google connector');
  assert.equal(dur.station.storage.getItem('sb-test-auth-token'),'shared authentication');
  dur.station.storage.setItem('relayops_equipment_import','DUR6 equipment');
  assert.equal(store.getItem('relayops_station_DUR6:relayops_equipment_import'),'DUR6 equipment');assert.equal(store.getItem('relayops_equipment_import'),'DJT6 devices');
  assert.equal(dur.station.storage.getItem('relayops_station_DJT6:relayops_morning'),null);
  dur.station.storage.clear();assert.equal(store.getItem('relayops_morning'),'DJT6 routes');assert.equal(store.getItem('sb-test-auth-token'),'shared authentication');
  assert.equal(store.getItem('relayops_station_DUR6:relayops_equipment_import'),null);
  const settings=config(),fixed=runtime({url:'https://relayops.example/?station=DUR6',settings});settings.stations.DUR6.stationId=DJT6;settings.stationId=DJT6;
  assert.equal(fixed.context.window.RELAYOPS_CLOUD_CONFIG.stationId,DUR6);assert.equal(fixed.context.window.RELAYOPS_CLOUD_CONFIG.stations.DUR6.stationId,DUR6);
  for(const query of ['?station=EVIL','?station=','?station=DJT6&station=DUR6','?station='+DUR6]){
    const page=runtime({url:'https://relayops.example/'+query,store});assert(page.station.error);assert.equal(page.station.code,'');assert.equal(page.station.stationId,'');assert.equal(page.station.storage.getItem('relayops_morning'),null);page.station.storage.setItem('relayops_morning','wrong');assert.equal(store.getItem('relayops_morning'),'DJT6 routes');assert.equal(page.cloud().configured,false);
  }
  for(const changed of [value=>{delete value.stations.DUR6;},value=>{value.stations.DUR6.stationId=DJT6;},value=>{value.stations.DUR6.stationId='not-uuid';}]){
    const settings=config();changed(settings);const page=runtime({settings});assert(page.station.error);assert.equal(page.cloud().configured,false);
  }
  const disabled=config();disabled.multiStationEnabled=false;const disabledDur=runtime({settings:disabled,url:'https://relayops.example/?station=DUR6'});assert(disabledDur.station.error);assert.equal(disabledDur.cloud().configured,false);
  for(const url of ['http://localhost:4173/?multiStationPreview=1&station=DUR6','file:///preview/index.html?multiStationPreview=1&station=DUR6']){
    const page=runtime({url,store});assert.equal(page.station.preview,true);assert.equal(page.station.storage,store,'Keep the existing preview snapshot store');assert.equal(page.cloud().configured,false);assert.equal((await page.context.window.RelayOpsCloud.prepareStationSwitch()).ok,true);
  }
  const exported=runtime({url:'file:///dashboard/index.html?station=DUR6'});assert(exported.station.error);assert.equal(exported.cloud().configured,false);
  const productionPreviewFlag=runtime({url:'https://relayops.example/?multiStationPreview=1&station=DUR6'});assert.equal(productionPreviewFlag.station.preview,false);assert.equal(productionPreviewFlag.cloud().configured,true);
  const missingRuntime=runtime();delete missingRuntime.context.window.RelayOpsStation;assert.equal(missingRuntime.cloud().configured,false,'Missing boot module must not silently use the legacy station UUID');
  const clearStore=storage({[`relayops_cloud_queue:${DUR6}:2026-09-07`]:'DUR6 pending',relayops_morning:'DJT6 cache','sb-auth':'keep signed in'}),clearHome=runtime({store:clearStore});
  assert.equal(clearHome.station.storage.getItem(`relayops_cloud_queue:${DUR6}:2026-09-07`),null);clearHome.station.storage.clear();assert.equal(clearStore.getItem(`relayops_cloud_queue:${DUR6}:2026-09-07`),'DUR6 pending');assert.equal(clearStore.getItem('sb-auth'),'keep signed in');

  const server=backend(),sharedBrowserStorage=storage({'relayops_morning':'keep DJT6 cache','relayops_station_DUR6:relayops_morning':'DUR6 cache'}),date='2026-09-07';
  for(const station of [DJT6,DUR6]){
    server.seed(station,date,{morningRoutes:[{id:`${station}-route`,driver:station===DJT6?'Home driver':'Popup driver'}]});
    server.seed(station,'2026-09-08',{morningRoutes:[]});
    server.seed(station,'2000-01-01',{inventoryItems:[{id:`${station}-device`,name:station===DJT6?'Home device':'Popup device'}]});
  }
  const home=workspace(server,{store:sharedBrowserStorage}),popup=workspace(server,{code:'DUR6',userId:'dispatcher-2',store:sharedBrowserStorage});
  await Promise.all([home.cloud.init(),popup.cloud.init()]);assert.equal(home.daily.morningRoutes[0].driver,'Home driver');assert.equal(popup.daily.morningRoutes[0].driver,'Popup driver');assert.equal(popup.persistent.inventoryItems[0].name,'Popup device');
  assert(server.reads.filter(read=>read.kind==='station_memberships'&&read.userId==='dispatcher-2').every(read=>read.filters.station_id===DUR6));
  home.setDaily({morningRoutes:[{id:'home-upload',driver:'New DJT6 upload'}]});popup.setDaily({morningRoutes:[{id:'dur6-upload',driver:'New DUR6 upload'}]});
  home.cloud.schedule('test.home-import');popup.cloud.schedule('test.dur6-import');
  const homeQueue=`relayops_cloud_queue:${DJT6}:${date}`,popupQueue=`relayops_cloud_queue:${DUR6}:${date}`;
  assert(sharedBrowserStorage.getItem(homeQueue));assert(sharedBrowserStorage.getItem(popupQueue));assert(!home.cloud.canSafelySwitch());assert(!popup.cloud.canSafelySwitch());
  const popupPreparation=await popup.cloud.prepareStationSwitch();assert.equal(popupPreparation.ok,true,JSON.stringify(popupPreparation));
  assert.equal(server.rows.get(server.key(DUR6,date)).payload.morningRoutes[0].driver,'New DUR6 upload');assert.equal(server.rows.get(server.key(DJT6,date)).payload.morningRoutes[0].driver,'Home driver');assert(sharedBrowserStorage.getItem(homeQueue),'Saving DUR6 must leave DJT6 queued edits untouched');assert.equal(sharedBrowserStorage.getItem(popupQueue),null);
  assert.equal((await home.cloud.prepareStationSwitch()).ok,true);assert.equal(sharedBrowserStorage.getItem(homeQueue),null);
  popup.setDate('2026-09-08');await popup.cloud.load();popup.setDaily({morningRoutes:[{id:'next-day-dur6',driver:'Next day'}]});await popup.cloud.save('test.next-day');
  assert.equal(server.rows.get(server.key(DUR6,'2026-09-08')).payload.morningRoutes[0].driver,'Next day');assert.equal(server.rows.get(server.key(DJT6,'2026-09-08')).payload.morningRoutes.length,0);assert.equal(server.rows.get(server.key(DUR6,date)).payload.morningRoutes[0].driver,'New DUR6 upload');
  assert(server.writes.filter(write=>write.userId==='dispatcher-2').every(write=>write.target_station===DUR6));
  // Replacing the public config or query after boot cannot redirect a running save.
  popup.context.window.RELAYOPS_CLOUD_CONFIG={...config(),stationId:DJT6};popup.context.location.search='?station=DJT6';popup.setDaily({morningRoutes:[{id:'immutable',driver:'Still DUR6'}]});await popup.cloud.save('test.immutable-station');assert.equal(server.writes.at(-1).target_station,DUR6);
  await popup.cloud.signIn('dispatcher-2@example.com');assert.equal(new URL(server.reads.at(-1).request.options.emailRedirectTo).searchParams.get('station'),'DUR6');
  popup.cloud.reclaimStorageForSharedSession();assert.equal(sharedBrowserStorage.getItem('relayops_morning'),'keep DJT6 cache');assert.equal(sharedBrowserStorage.getItem('relayops_station_DUR6:relayops_morning'),null);
  // Bad snapshots must be rejected before resetting visible data or advancing
  // revisions. Both snapshots are checked before either half of a poll applies.
  const activeDate='2026-09-08',dailyBefore=clone(popup.daily),persistentBefore=clone(popup.persistent),revisionBefore=popup.cloud.revision,persistentRevisionBefore=popup.cloud.persistentRevision;
  const dailyRowBefore=clone(server.rows.get(server.key(DUR6,activeDate))),persistentRowBefore=clone(server.rows.get(server.key(DUR6,'2000-01-01')));
  server.seed(DUR6,activeDate,{stationCode:'DJT6',morningRoutes:[{id:'wrong-station'}]},revisionBefore+20);
  await assert.rejects(popup.cloud.load(),/Blocked DJT6/);assert.deepEqual(popup.daily,dailyBefore);assert.deepEqual(popup.persistent,persistentBefore);assert.equal(popup.cloud.revision,revisionBefore);assert.equal(popup.cloud.persistentRevision,persistentRevisionBefore);
  server.seed(DUR6,'2000-01-01',{stationCode:'DUR6',inventoryItems:[{id:'should-not-apply-yet'}]},persistentRevisionBefore+20);
  assert.equal(await popup.cloud.__test.pollForUpdates(activeDate,{forcePersistent:true}),false);assert.deepEqual(popup.persistent,persistentBefore);assert.equal(popup.cloud.persistentRevision,persistentRevisionBefore);
  server.rows.set(server.key(DUR6,activeDate),dailyRowBefore);server.rows.set(server.key(DUR6,'2000-01-01'),persistentRowBefore);
  assert.throws(()=>popup.cloud.__test.applyRemoteSnapshot({station_id:DJT6,operation_date:activeDate,payload:{stationCode:'DUR6'},revision:100},activeDate),/another station/);assert.deepEqual(popup.daily,dailyBefore);assert.equal(popup.cloud.revision,revisionBefore);
  assert.throws(()=>popup.cloud.__test.applyRemoteSnapshot({operation_date:activeDate,payload:{stationCode:'DUR6',morningRoutes:[{stationCode:'DJT6'}]},revision:100},activeDate),/Blocked DJT6/);assert.deepEqual(popup.daily,dailyBefore);
  popup.setDaily({stationCode:'DJT6',morningRoutes:[]});const writeCountBeforeInvalid=server.writes.length;await assert.rejects(popup.cloud.save('test.wrong-station'),/Blocked DJT6/);assert.equal(server.writes.length,writeCountBeforeInvalid);popup.setDaily(dailyBefore);
  const activeQueue=`relayops_cloud_queue:${DUR6}:${activeDate}`,badQueue=JSON.stringify({shared:true,userId:'dispatcher-2',payload:{stationCode:'DJT6'},persistentPayload:{}});sharedBrowserStorage.setItem(activeQueue,badQueue);
  await assert.rejects(popup.cloud.load(),/Blocked DJT6/);assert.equal(sharedBrowserStorage.getItem(activeQueue),badQueue);assert.deepEqual(popup.daily,dailyBefore);sharedBrowserStorage.removeItem(activeQueue);
  // Historical queues already on disk survive navigation without being drained
  // into today's sheet. They must not block a currently synced dispatcher.
  const oldQueue=`relayops_cloud_queue:${DUR6}:2026-09-06`,oldRecord=JSON.stringify({shared:true,userId:'dispatcher-2',payload:{morningRoutes:[{id:'old'}]},persistentPayload:{}}),historicalWriteCount=server.writes.length;
  sharedBrowserStorage.setItem(oldQueue,oldRecord);assert.equal(popup.cloud.canSafelySwitch(),true);assert.equal((await popup.cloud.prepareStationSwitch()).ok,true);assert.equal(sharedBrowserStorage.getItem(oldQueue),oldRecord);assert.equal(server.writes.length,historicalWriteCount,'Station navigation must not replay expired-date imports');sharedBrowserStorage.removeItem(oldQueue);
  sharedBrowserStorage.setItem(oldQueue,'corrupt historical queue preserved');assert.equal((await popup.cloud.prepareStationSwitch()).ok,true);assert.equal(sharedBrowserStorage.getItem(oldQueue),'corrupt historical queue preserved');sharedBrowserStorage.removeItem(oldQueue);
  sharedBrowserStorage.setItem(activeQueue,'corrupt current queue preserved');assert.equal((await popup.cloud.prepareStationSwitch()).ok,false);assert.equal(sharedBrowserStorage.getItem(activeQueue),'corrupt current queue preserved');sharedBrowserStorage.removeItem(activeQueue);

  const failing=workspace(server,{code:'DUR6',userId:'dispatcher-failure',hook:()=>Promise.resolve({error:new Error('network unavailable'),data:null})});await failing.cloud.init();failing.setDaily({morningRoutes:[{id:'keep-me',driver:'Unsaved'}]});failing.cloud.schedule('test.offline');const failed=await failing.cloud.prepareStationSwitch();assert.equal(failed.ok,false);assert.match(failed.error,/Could not save/);assert(failing.store.getItem(popupQueue));
  const conflict=workspace(server,{code:'DUR6',userId:'dispatcher-conflict',hook:()=>Promise.resolve({error:null,data:{status:'conflict'}})});await conflict.cloud.init();conflict.setDaily({morningRoutes:[{id:'conflict',driver:'Keep after conflict'}]});conflict.cloud.schedule('test.conflict');const before=server.writes.length;assert.equal((await conflict.cloud.prepareStationSwitch()).ok,false);assert.equal(server.writes.length,before+1,'Navigation must not repeatedly hammer a conflicting workspace');assert(conflict.store.getItem(popupQueue));
  // Save cannot finish a station switch while another edit arrives in flight.
  const gate=deferred();let hold=true;
  const concurrent=workspace(server,{code:'DUR6',userId:'dispatcher-concurrent',hook:()=>hold?gate.promise:null});await concurrent.cloud.init();concurrent.setDaily({morningRoutes:[{id:'first'}]});concurrent.cloud.schedule();const preparing=concurrent.cloud.prepareStationSwitch();await tick();concurrent.setDaily({morningRoutes:[{id:'second'}]});concurrent.cloud.schedule();hold=false;gate.resolve({data:{status:'saved',revision:9},error:null});assert.equal((await preparing).ok,false,'Newly queued edits require another save before leaving');assert(concurrent.store.getItem(popupQueue));
  const memory=workspace(server,{code:'DUR6',userId:'dispatcher-memory'});await memory.cloud.init();memory.context.document.visibilityState='hidden';memory.setDaily({morningRoutes:[{id:'memory-only'}]});memory.store.setItem=()=>{throw new Error('quota full');};memory.cloud.schedule('test.memory');memory.setDate('2026-09-08');const memoryWriteCount=server.writes.length;assert.equal(memory.cloud.canSafelySwitch(),false);const memoryBlocked=await memory.cloud.prepareStationSwitch();assert.equal(memoryBlocked.ok,false);assert.match(memoryBlocked.error,/tab’s memory/);assert.equal(server.writes.length,memoryWriteCount,'Do not replay a prior-date memory queue while switching');
  // A failed storage write can leave an older durable value behind. The newest
  // in-memory queue must retain priority and still prevent navigation.
  const newerMemory=workspace(server,{code:'DUR6',userId:'dispatcher-newer-memory'});await newerMemory.cloud.init();newerMemory.context.document.visibilityState='hidden';newerMemory.setDaily({morningRoutes:[{id:'old-disk-value'}]});newerMemory.cloud.schedule('test.old-disk');const diskBefore=newerMemory.store.getItem(popupQueue);newerMemory.store.setItem=()=>{throw new Error('quota full');};newerMemory.setDaily({morningRoutes:[{id:'new-memory-value'}]});newerMemory.cloud.schedule('test.new-memory');newerMemory.setDate('2026-09-08');assert.equal((await newerMemory.cloud.prepareStationSwitch()).ok,false);assert.equal(newerMemory.store.getItem(popupQueue),diskBefore,'Navigation must not overwrite another durable queue while preserving a memory-only update');
  const noStorage=workspace(server,{code:'DUR6',userId:'dispatcher-no-storage'});await noStorage.cloud.init();noStorage.context.document.visibilityState='hidden';noStorage.context.window.localStorage=null;noStorage.setDaily({morningRoutes:[{id:'no-storage-edit'}]});noStorage.cloud.schedule('test.no-storage');noStorage.setDate('2026-09-08');assert.equal((await noStorage.cloud.prepareStationSwitch()).ok,false,'Unavailable storage must not discard the memory fallback');
  for(const page of [djt,dur,fixed,home,popup,failing,conflict,concurrent,memory,newerMemory,noStorage])page.close();
  console.log('Production station runtime passed: isolated caches, immutable targets, concurrent station/date uploads, native auth, safe navigation and bounded conflict retries.');
})().catch(error=>{console.error(error);process.exitCode=1;});
