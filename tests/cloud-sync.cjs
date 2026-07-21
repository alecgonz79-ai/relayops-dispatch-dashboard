const fs=require('fs');
const vm=require('vm');

const events=[],rpcCalls=[],applied=[],memberUpdates=[],savedPayload={morningRoutes:[{route:'CX100'}]},persistentPayload={fleetIssues:{EV1:{active:[],history:[]}}};
let authCallback=null,signInRequest=null,channelCalls=0;
const row={payload:{morningRoutes:[{route:'CX200'}]},revision:4,updated_at:'2026-07-11T12:00:00Z',updated_by:'user-2'};
const client={
  auth:{
    getSession:async()=>({data:{session:{user:{id:'user-1',email:'owner@example.com'}}}}),
    onAuthStateChange:callback=>{authCallback=callback;return{data:{subscription:{unsubscribe(){}}}};},
    signInWithOtp:async request=>{signInRequest=request;return{error:null};},signOut:async()=>({error:null})
  },
  from(table){let updatePayload=null;const filters=[];return{
    update(payload){updatePayload=payload;return this;},select(){return this;},eq(field,value){filters.push({op:'eq',field,value});return this;},neq(field,value){filters.push({op:'neq',field,value});return this;},
    order(){return Promise.resolve({data:[],error:null});},
    maybeSingle:async()=>{if(updatePayload){memberUpdates.push({table,payload:updatePayload,filters});return{data:{user_id:'user-2',role:updatePayload.role,display_name:'Dispatcher Two',active:updatePayload.active,created_at:'2026-07-01'},error:null};}if(table==='memberships')return{data:{user_id:'user-1',role:'owner',display_name:'Owner',active:true},error:null};return{data:row,error:null};}
  };},
  rpc:async(name,args)=>{rpcCalls.push({name,args});if(name==='relayops_admin_status')return{data:false,error:null};return{data:{revision:5,updated_at:'2026-07-11T12:01:00Z'},error:null};},
  functions:{invoke:async()=>({data:{ok:true},error:null})},
  channel(){channelCalls++;return{on(){return this;},subscribe(){return this;},presenceState(){return{};},async track(){}};},
  removeChannel(){}
};
const context={
  console,setTimeout,clearTimeout,URL,
  location:{href:'https://example.test/?v=cache-bust#temporary'},
  window:{
    RELAYOPS_CLOUD_CONFIG:{supabaseUrl:'https://relayops.supabase.co',supabaseAnonKey:'public-anon',organizationId:'org-1',stationId:'station-1'},
    supabase:{createClient:()=>client},
    RelayOpsApp:{operationDate:()=> '2026-07-11',sharedState:()=>savedPayload,persistentState:()=>persistentPayload,applySharedState:payload=>applied.push({kind:'daily',payload}),applyPersistentState:payload=>applied.push({kind:'persistent',payload})}
  }
};
const cloudSource=fs.readFileSync('cloud-sync.js','utf8');
if(!cloudSource.includes("const SYNC_META='__relayopsSync'")||!cloudSource.includes('function semanticKey(')||!cloudSource.includes('function reconcilePayload(remote={},local={},base={})'))throw new Error('Cloud sync must use semantic IDs and three-way reconciliation metadata');
vm.runInNewContext(cloudSource,context,{filename:'cloud-sync.js'});
const cloud=context.window.RelayOpsCloud;
cloud.on(event=>events.push(event));

(async()=>{
  if(!cloud.configured)throw new Error('Configured cloud client was not detected');
  await cloud.init();
  if(applied.length!==2||applied[0].kind!=='daily'||applied[0].payload.morningRoutes[0].route!=='CX200'||applied[1].kind!=='persistent'||cloud.revision!==4||cloud.persistentRevision!==4)throw new Error('Daily and persistent snapshots did not load');
  await cloud.save('test.save');
  const saveCalls=rpcCalls.filter(call=>call.name==='save_workspace_snapshot_v2');
  if(saveCalls.length!==2||saveCalls[0].args.expected_revision!==4||saveCalls[0].args.target_station!=='station-1'||saveCalls[0].args.new_payload.morningRoutes[0].route!=='CX100'||!saveCalls[0].args.new_payload.__relayopsSync||saveCalls[1].args.target_date!=='2000-01-01'||!saveCalls[1].args.new_payload.fleetIssues||!saveCalls[1].args.new_payload.__relayopsSync||cloud.revision!==5||cloud.persistentRevision!==5)throw new Error('Versioned daily/persistent workspace save failed');
  if(channelCalls!==0)throw new Error('Cloud sync must not open Realtime channels on nano compute');
  cloud.__test.applyRemoteSnapshot({operation_date:'2000-01-01',revision:6,payload:{fleetIssues:{EV9:{active:[{id:'issue-9',text:'Flat tire'}],history:[]}}},updated_at:'2026-07-11T12:01:30Z'},'2026-07-11');
  if(applied.length!==3||applied[2].kind!=='persistent'||!applied[2].payload.fleetIssues.EV9||cloud.persistentRevision!==6)throw new Error('Station-wide persistent Fleet update failed');
  cloud.__test.applyRemoteSnapshot({operation_date:'2026-07-11',revision:6,payload:{morningRoutes:[{route:'CX300'}]},updated_at:'2026-07-11T12:02:00Z'},'2026-07-11');
  if(applied.length!==4||applied[3].kind!=='daily'||applied[3].payload.morningRoutes[0].route!=='CX300'||cloud.revision!==6||!events.some(event=>event.type==='remote-update'))throw new Error('Realtime dispatcher update failed');
  await cloud.signIn('dispatcher@example.com');
  if(!events.some(event=>event.type==='magic-link-sent'))throw new Error('Passwordless sign-in event missing');
  if(signInRequest?.options?.emailRedirectTo!=='https://example.test/?date=2026-07-11')throw new Error(`Passwordless redirect must preserve only the shared date, received ${signInRequest?.options?.emailRedirectTo}`);
  const updated=await cloud.updateMemberAccess({userId:'user-2',role:'fleet_lead',active:false});
  if(updated.role!=='fleet_lead'||updated.active!==false||memberUpdates.length!==1||memberUpdates[0].table!=='memberships'||!memberUpdates[0].filters.some(filter=>filter.op==='neq'&&filter.field==='role'&&filter.value==='owner'))throw new Error('RLS-backed member role/active update failed');
  if(!events.some(event=>event.type==='member-updated'))throw new Error('Member access update event missing');
  console.log('Cloud synchronization multi-session test passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
