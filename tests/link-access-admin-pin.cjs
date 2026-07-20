const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}

const source=fs.readFileSync('cloud-sync.js','utf8');
const app=fs.readFileSync('app.js','utf8');
const migration=fs.readFileSync('supabase/migrations/20260720_link_access_admin_pin.sql','utf8');
let anonymousCalls=0;
const rpcCalls=[];
const applied=[];
const session={access_token:'anonymous-jwt',user:{id:'link-user-1',is_anonymous:true}};
const snapshot={payload:{morningRoutes:[{route:'CX101'}]},revision:3,updated_at:'2026-07-20T12:00:00Z'};
const client={
  auth:{
    getSession:async()=>({data:{session:null}}),
    onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
    signInAnonymously:async request=>{anonymousCalls++;assert(request?.options?.data?.relayops_link_access===true,'Anonymous session lost the link-access marker');return{data:{session},error:null};},
    signOut:async()=>({error:null})
  },
  from(table){return{
    select(){return this;},eq(){return this;},
    maybeSingle:async()=>{
      if(table==='memberships')return{data:{user_id:'link-user-1',role:'dispatcher',display_name:'Shared link dispatcher',active:true},error:null};
      if(table==='station_memberships')return{data:{station_id:'station-1'},error:null};
      if(table==='workspace_snapshots')return{data:snapshot,error:null};
      return{data:null,error:null};
    }
  };},
  rpc:async(name,args)=>{rpcCalls.push({name,args});return{data:name==='lock_relayops_admin'?null:true,error:null};},
  channel(){return{on(){return this;},subscribe(callback){if(callback)setTimeout(()=>callback('SUBSCRIBED'),0);return this;},presenceState(){return{};},async track(){}};},
  removeChannel(){}
};
const context={console,setTimeout,clearTimeout,URL,location:{href:'https://relayops.test/'},window:{
  addEventListener(){},localStorage:{getItem(){return null;},setItem(){},removeItem(){}},
  RELAYOPS_CLOUD_CONFIG:{supabaseUrl:'https://relayops.supabase.co',supabaseAnonKey:'public-anon',organizationId:'org-1',stationId:'station-1'},
  supabase:{createClient:()=>client},
  RelayOpsApp:{operationDate:()=>'2026-07-20',sharedState:()=>({}),persistentState:()=>({}),applySharedState:value=>applied.push(value),applyPersistentState:value=>applied.push(value)}
}};
context.globalThis=context;
vm.runInNewContext(source,context,{filename:'cloud-sync.js'});

(async()=>{
  const cloud=context.window.RelayOpsCloud;
  await cloud.init();
  assert(anonymousCalls===1&&cloud.session?.user?.is_anonymous===true,'Fresh shared-link browser did not create an anonymous Supabase session');
  assert(cloud.membership?.role==='dispatcher'&&applied.length===2,'Anonymous session did not load the shared station workspace');
  assert(await cloud.unlockAdminPin('1234')===true,'Admin unlock RPC result was not returned');
  assert(await cloud.adminStatus()===true,'Admin status RPC result was not returned');
  await cloud.lockAdmin();
  assert(['unlock_relayops_admin','relayops_admin_status','lock_relayops_admin'].every(name=>rpcCalls.some(call=>call.name===name)),'Cloud bridge lost part of the Admin PIN RPC lifecycle');
  assert(migration.includes('new.is_anonymous')&&migration.includes('relayops_provision_link_user'),'Migration must provision anonymous link users');
  assert(migration.includes('extensions.crypt(candidate_pin,access_row.admin_pin_hash)')&&migration.includes('next_failures>=5'),'Admin PIN must be hashed and rate-limited by Supabase');
  assert(!app.includes('"6969"')&&!app.includes("'6969'"),'Public app code must not contain the Admin PIN');
  assert(!app.includes('Dispatcher sign in'),'Retired dispatcher sign-in control returned to the UI');
  console.log('Automatic shared-link access and server-verified Admin PIN test passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
