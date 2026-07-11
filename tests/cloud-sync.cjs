const fs=require('fs');
const vm=require('vm');

const events=[],rpcCalls=[],applied=[],savedPayload={morningRoutes:[{route:'CX100'}]};
let authCallback=null,postgresCallback=null;
const row={payload:{morningRoutes:[{route:'CX200'}]},revision:4,updated_at:'2026-07-11T12:00:00Z',updated_by:'user-2'};
const client={
  auth:{
    getSession:async()=>({data:{session:{user:{id:'user-1',email:'owner@example.com'}}}}),
    onAuthStateChange:callback=>{authCallback=callback;return{data:{subscription:{unsubscribe(){}}}};},
    signInWithOtp:async()=>({error:null}),signOut:async()=>({error:null})
  },
  from(){return{select(){return this;},eq(){return this;},order(){return Promise.resolve({data:[],error:null});},maybeSingle:async()=>({data:row,error:null})};},
  rpc:async(name,args)=>{rpcCalls.push({name,args});return{data:{revision:5,updated_at:'2026-07-11T12:01:00Z'},error:null};},
  functions:{invoke:async()=>({data:{ok:true},error:null})},
  channel(name){const presence=name.startsWith('presence:');return{on(_event,_filter,callback){if(!presence)postgresCallback=callback;return this;},subscribe(callback){if(callback)setTimeout(()=>callback('SUBSCRIBED'),0);return this;},presenceState(){return{};},async track(){}};},
  removeChannel(){}
};
const context={
  console,setTimeout,clearTimeout,
  location:{href:'https://example.test/'},
  window:{
    RELAYOPS_CLOUD_CONFIG:{supabaseUrl:'https://relayops.supabase.co',supabaseAnonKey:'public-anon',organizationId:'org-1',stationId:'station-1'},
    supabase:{createClient:()=>client},
    RelayOpsApp:{operationDate:()=> '2026-07-11',sharedState:()=>savedPayload,applySharedState:payload=>applied.push(payload)}
  }
};
vm.runInNewContext(fs.readFileSync('cloud-sync.js','utf8'),context,{filename:'cloud-sync.js'});
const cloud=context.window.RelayOpsCloud;
cloud.on(event=>events.push(event));

(async()=>{
  if(!cloud.configured)throw new Error('Configured cloud client was not detected');
  await cloud.init();
  if(applied.length!==1||applied[0].morningRoutes[0].route!=='CX200'||cloud.revision!==4)throw new Error('Initial shared snapshot did not load');
  await cloud.save('test.save');
  if(rpcCalls.length!==1||rpcCalls[0].name!=='save_workspace_snapshot'||rpcCalls[0].args.expected_revision!==4||rpcCalls[0].args.target_station!=='station-1'||rpcCalls[0].args.new_payload!==savedPayload||cloud.revision!==5)throw new Error('Versioned workspace save failed');
  postgresCallback({new:{operation_date:'2026-07-11',revision:6,payload:{morningRoutes:[{route:'CX300'}]},updated_at:'2026-07-11T12:02:00Z'}});
  if(applied.length!==2||applied[1].morningRoutes[0].route!=='CX300'||cloud.revision!==6||!events.some(event=>event.type==='remote-update'))throw new Error('Realtime dispatcher update failed');
  await cloud.signIn('dispatcher@example.com');
  if(!events.some(event=>event.type==='magic-link-sent'))throw new Error('Passwordless sign-in event missing');
  console.log('Cloud synchronization multi-session test passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
