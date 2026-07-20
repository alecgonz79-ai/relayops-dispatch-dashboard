const fs=require('fs');
const vm=require('vm');

let request=null,authFailure=new TypeError('Load failed');
const client={
  auth:{
    getSession:async()=>({data:{session:null}}),
    onAuthStateChange:()=>({}),
    signInWithOtp:async value=>{request=value;throw authFailure;},
    signOut:async()=>({error:null})
  }
};
const context={console,setTimeout,clearTimeout,URL,Error,TypeError,location:{href:'https://preview.example.test/?v=one-off#debug'},window:{
  addEventListener(){},
  RELAYOPS_CLOUD_CONFIG:{supabaseUrl:'https://missing.supabase.co',supabaseAnonKey:'public',organizationId:'org',stationId:'station',authRedirectUrl:'https://dashboard.example.test/relayops/'},
  supabase:{createClient:()=>client}
}};
context.globalThis=context;
vm.runInNewContext(fs.readFileSync('cloud-sync.js','utf8'),context,{filename:'cloud-sync.js'});

(async()=>{
  const cloud=context.window.RelayOpsCloud;
  await cloud.init();
  let message='';
  try{await cloud.signIn('dispatcher@example.com');}catch(error){message=error.message;}
  if(request?.options?.emailRedirectTo!=='https://dashboard.example.test/relayops/?date=2026-07-20')throw new Error(`Configured dashboard redirect did not preserve the shared operation date: ${request?.options?.emailRedirectTo}`);
  if(!/restore the Supabase project/i.test(message))throw new Error(`Network auth failure was not translated into an actionable message: ${message}`);
  authFailure=new Error('email rate limit exceeded');
  let limited=null;
  try{await cloud.signIn('owner@example.com');}catch(error){limited=error;}
  if(limited?.code!=='email_rate_limit'||!/two-email hourly limit/i.test(limited?.message||'')||!/newest RelayOps invitation/i.test(limited?.message||''))throw new Error(`Email limit did not produce the safe invitation recovery path: ${limited?.message}`);
  console.log('Cloud auth redirect and recovery message test passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
