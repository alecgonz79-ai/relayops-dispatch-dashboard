const fs=require('fs');
const vm=require('vm');

const store=new Map(),events=[],rpcCalls=[];
const localStorage={getItem:key=>store.has(key)?store.get(key):null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key)};
let failSave=false;
const client={
  auth:{getSession:async()=>({data:{session:{user:{id:'user-1',email:'dispatcher@example.com'}}}}),onAuthStateChange:()=>({}),signInWithOtp:async()=>({error:null}),signOut:async()=>({error:null})},
  from(table){return{select(){return this;},eq(){return this;},order(){return Promise.resolve({data:[],error:null});},maybeSingle:async()=>({data:table==='memberships'?{user_id:'user-1',role:'dispatcher',active:true}:table==='station_memberships'?{station_id:'station'}:{payload:{fleetIssues:{}},revision:2,updated_at:'2026-07-12T10:00:00Z'},error:null})};},
  rpc:async(name,args)=>{rpcCalls.push({name,args});return failSave?{data:null,error:{message:'network unavailable'}}:{data:{revision:3,updated_at:'2026-07-12T10:05:00Z'},error:null};},
  functions:{invoke:async()=>({data:{},error:null})},
  channel(){return{on(){return this;},subscribe(){return this;},presenceState(){return{};},track:async()=>{}};},removeChannel(){}
};
const context={console,setTimeout,clearTimeout,Date,globalThis:null,location:{href:'https://example.test/'},window:{
  localStorage,addEventListener(){},RELAYOPS_CLOUD_CONFIG:{supabaseUrl:'https://relayops.supabase.co',supabaseAnonKey:'anon',organizationId:'org',stationId:'station'},
  supabase:{createClient:()=>client},RelayOpsApp:{operationDate:()=> '2026-07-12',sharedState:()=>({fleetIssues:{EV1:{active:[{id:'i1',text:'Flat\u0000 tire \uD800'}],history:[{id:'i1',text:'Flat tire 🚚'}]}},['bad\u0000key']:'clean'}),persistentState:()=>({organizationName:'Legacy\u0000 Logistics',emoji:'🚚'}),applySharedState(){},applyPersistentState(){}}
}};
context.globalThis=context;context.localStorage=localStorage;
vm.runInNewContext(fs.readFileSync('cloud-sync.js','utf8'),context,{filename:'cloud-sync.js'});
const cloud=context.window.RelayOpsCloud;cloud.on(event=>events.push(event));

(async()=>{
  await cloud.init();
  const sanitized=cloud.__test.sanitizeCloudValue({note:'A\u0000B\uD800C',emoji:'🚚',['bad\u0000key']:'value'});
  if(sanitized.note!=='AB\uFFFDC'||sanitized.emoji!=='🚚'||sanitized.badkey!=='value')throw new Error('Cloud sanitizer must remove null bytes, replace unpaired surrogates, preserve emoji, and clean object keys');
  failSave=true;
  try{await cloud.save('offline.test');}catch{}
  const queued=[...store.entries()].find(([key])=>key.startsWith('relayops_cloud_queue:'));
  if(!queued)throw new Error('Offline snapshot was not queued');
  if(queued[1].includes('\\u0000')||queued[1].includes('\\ud800'))throw new Error('Offline queue retained a PostgreSQL-incompatible Unicode escape');
  if(!events.some(event=>event.type==='offline'))throw new Error('Offline state was not reported');
  failSave=false;await cloud.save('online.retry');
  if([...store.keys()].some(key=>key.startsWith('relayops_cloud_queue:')))throw new Error('Offline queue was not cleared after a successful retry');
  const sent=rpcCalls.map(call=>call.args?.new_payload).filter(Boolean);
  if(!sent.length||sent.some(payload=>JSON.stringify(payload).includes('\\u0000')||JSON.stringify(payload).includes('\\ud800')))throw new Error('Supabase RPC received an unsupported Unicode escape');
  if(!sent.some(payload=>payload.emoji==='🚚'||payload.fleetIssues?.EV1?.history?.[0]?.text?.includes('🚚')))throw new Error('Valid emoji was removed from the cloud payload');
  console.log('Cloud offline queue and retry test passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
