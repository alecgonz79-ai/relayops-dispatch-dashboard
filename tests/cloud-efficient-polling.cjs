const fs=require('fs');
const vm=require('vm');

const clone=value=>JSON.parse(JSON.stringify(value));
const queryLog=[],rpcLog=[],applied=[],windowListeners={},documentListeners={};
let dailyState={morningRoutes:[{route:'CX100',wave:'WAVE 1'}]};
let persistentState={fleetIssues:{EV1:{active:[],history:[]}}};
const snapshots={
  '2026-07-28':{operation_date:'2026-07-28',revision:2,payload:clone(dailyState),updated_at:'2026-07-28T12:00:00Z',updated_by:'dispatcher-1'},
  '2000-01-01':{operation_date:'2000-01-01',revision:7,payload:clone(persistentState),updated_at:'2026-07-28T12:00:00Z',updated_by:'dispatcher-1'}
};

const client={
  auth:{
    getSession:async()=>({data:{session:{user:{id:'dispatcher-1',email:'dispatcher@example.com'}}}}),
    onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}}),
    signOut:async()=>({error:null})
  },
  from(table){
    let selected='',targetDate='';
    return{
      select(fields){selected=fields;return this;},
      eq(field,value){if(field==='operation_date')targetDate=value;return this;},
      maybeSingle:async()=>{
        if(table==='memberships')return{data:{user_id:'dispatcher-1',role:'owner',display_name:'Dispatcher',active:true},error:null};
        if(table!=='workspace_snapshots')return{data:null,error:null};
        const source=snapshots[targetDate]||null;
        queryLog.push({targetDate,selected,full:/\bpayload\b/.test(selected)});
        if(!source)return{data:null,error:null};
        const data={operation_date:source.operation_date,revision:source.revision,updated_at:source.updated_at,updated_by:source.updated_by};
        if(/\bpayload\b/.test(selected))data.payload=clone(source.payload);
        return{data,error:null};
      }
    };
  },
  rpc:async(name,args)=>{
    if(name==='relayops_admin_status')return{data:false,error:null};
    if(name!=='save_workspace_snapshot_v4')return{data:null,error:null};
    rpcLog.push({name,args:clone(args)});
    const row=snapshots[args.target_date];
    row.revision+=1;row.payload=clone(args.new_payload);row.updated_at='2026-07-28T12:05:00Z';
    return{data:clone(row),error:null};
  },
  removeChannel(){}
};

const context={
  console,URL,setTimeout,clearTimeout,
  location:{href:'https://relayops.example.test/?date=2026-07-28'},
  document:{visibilityState:'visible',addEventListener(name,fn){documentListeners[name]=fn;}},
  window:{
    addEventListener(name,fn){windowListeners[name]=fn;},
    RELAYOPS_CLOUD_CONFIG:{
      supabaseUrl:'https://relayops.supabase.co',
      supabaseAnonKey:'public-anon',
      organizationId:'org-1',
      stationId:'station-1',
      pollIntervalMs:15000,
      persistentPollIntervalMs:300000
    },
    supabase:{createClient:()=>client},
    RelayOpsApp:{
      operationDate:()=> '2026-07-28',
      sharedState:()=>clone(dailyState),
      persistentState:()=>clone(persistentState),
      applySharedState(payload){dailyState=clone(payload);applied.push({kind:'daily',payload:clone(payload)});},
      applyPersistentState(payload){persistentState=clone(payload);applied.push({kind:'persistent',payload:clone(payload)});}
    }
  }
};
context.globalThis=context;
vm.runInNewContext(fs.readFileSync('cloud-sync.js','utf8'),context,{filename:'cloud-sync.js'});

(async()=>{
  const cloud=context.window.RelayOpsCloud;
  await cloud.init();
  if(queryLog.filter(entry=>entry.full).length!==2)throw new Error(`Initial load must fetch the daily and persistent payloads once: ${JSON.stringify(queryLog)}`);

  queryLog.length=0;
  await cloud.__test.pollForUpdates('2026-07-28',{forcePersistent:true});
  if(queryLog.length!==2||queryLog.some(entry=>entry.full))throw new Error('Unchanged polling must read only the two lightweight revision summaries');

  queryLog.length=0;
  snapshots['2026-07-28'].revision=3;
  snapshots['2026-07-28'].payload={morningRoutes:[{route:'CX200',wave:'WAVE 1'}]};
  await cloud.__test.pollForUpdates('2026-07-28');
  if(queryLog.length!==2||queryLog.filter(entry=>entry.full).length!==1)throw new Error('A changed day must trigger one summary and one changed-payload download');
  if(dailyState.morningRoutes[0].route!=='CX200')throw new Error('Changed daily payload was not applied');

  rpcLog.length=0;
  await cloud.save('test.unchanged');
  if(rpcLog.length!==0)throw new Error(`An unchanged workspace must not create Supabase writes: ${JSON.stringify(rpcLog)}`);

  dailyState={morningRoutes:[{route:'CX300',wave:'WAVE 1'}]};
  await cloud.save('test.daily-only');
  if(rpcLog.length!==1||rpcLog[0].args.target_date!=='2026-07-28')throw new Error('A daily-only edit must create exactly one daily snapshot write');

  rpcLog.length=0;
  persistentState={fleetIssues:{EV9:{active:[{id:'issue-9',text:'Flat tire'}],history:[]}}};
  await cloud.save('test.persistent-only');
  if(rpcLog.length!==1||rpcLog[0].args.target_date!=='2000-01-01')throw new Error('A persistent-only edit must create exactly one station snapshot write');

  if(typeof windowListeners.focus!=='function'||typeof documentListeners.visibilitychange!=='function')throw new Error('Focus and visibility refresh hooks are missing');
  console.log('Cloud efficient revision polling and changed-snapshot writes passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
