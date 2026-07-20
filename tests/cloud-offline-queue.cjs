const fs=require('fs');
const vm=require('vm');

const store=new Map(),events=[];
const localStorage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};
let failSave=false;
const client={
  auth:{getSession:async()=>({data:{session:{user:{id:'user-1',email:'dispatcher@example.com'}}}}),onAuthStateChange:()=>({}),signInWithOtp:async()=>({error:null}),signOut:async()=>({error:null})},
  from(table){return{select(){return this;},eq(){return this;},order(){return Promise.resolve({data:[],error:null});},maybeSingle:async()=>({data:table==='memberships'?{user_id:'user-1',role:'dispatcher',active:true}:table==='station_memberships'?{station_id:'station'}:{payload:{fleetIssues:{}},revision:2,updated_at:'2026-07-12T10:00:00Z'},error:null})};},
  rpc:async()=>failSave?{data:null,error:{message:'network unavailable'}}:{data:{revision:3,updated_at:'2026-07-12T10:05:00Z'},error:null},
  functions:{invoke:async()=>({data:{},error:null})},
  channel(){return{on(){return this;},subscribe(){return this;},presenceState(){return{};},track:async()=>{}};},removeChannel(){}
};
const context={console,setTimeout,clearTimeout,Date,globalThis:null,location:{href:'https://example.test/'},window:{
  localStorage,addEventListener(){},RELAYOPS_CLOUD_CONFIG:{supabaseUrl:'https://relayops.supabase.co',supabaseAnonKey:'anon',organizationId:'org',stationId:'station'},
  supabase:{createClient:()=>client},RelayOpsApp:{operationDate:()=> '2026-07-12',sharedState:()=>({fleetIssues:{EV1:{active:[{id:'i1',text:'Flat tire'}],history:[{id:'i1',text:'Flat tire'}]}}}),applySharedState(){}}
}};
context.globalThis=context;context.localStorage=localStorage;
vm.runInNewContext(fs.readFileSync('cloud-sync.js','utf8'),context,{filename:'cloud-sync.js'});
const cloud=context.window.RelayOpsCloud;cloud.on(event=>events.push(event));

(async()=>{
  await cloud.init();
  failSave=true;
  try{await cloud.save('offline.test');}catch{}
  if(![...store.keys()].some(key=>key.startsWith('relayops_cloud_queue:')))throw new Error('Offline snapshot was not queued');
  if(!events.some(event=>event.type==='offline'))throw new Error('Offline state was not reported');
  failSave=false;await cloud.save('online.retry');
  if([...store.keys()].some(key=>key.startsWith('relayops_cloud_queue:')))throw new Error('Offline queue was not cleared after a successful retry');
  console.log('Cloud offline queue and retry test passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
