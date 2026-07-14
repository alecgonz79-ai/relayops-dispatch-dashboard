(function(){
  const config=window.RELAYOPS_CLOUD_CONFIG||{};
  const configured=Boolean(config.supabaseUrl&&config.supabaseAnonKey&&config.organizationId&&config.stationId&&!config.supabaseUrl.includes('YOUR_PROJECT'));
  const PERSISTENT_DATE='2000-01-01';
  let client=null,session=null,revision=0,persistentRevision=0,channel=null,presenceChannel=null,saveTimer=null,applying=false;
  const listeners=new Set();
  const notify=event=>listeners.forEach(fn=>{try{fn(event);}catch(error){console.error(error);}});
  const queueKey=()=>`relayops_cloud_queue:${config.stationId||'local'}:${operationDate()}`;
  function storage(){try{return window.localStorage||globalThis.localStorage||null;}catch{return null;}}
  function queueSnapshot(payload,action='workspace.offline'){
    try{storage()?.setItem(queueKey(),JSON.stringify({payload,action,queuedAt:new Date().toISOString()}));}catch{}
    notify({type:'queued',action});return payload;
  }
  function pendingSnapshot(){try{return JSON.parse(storage()?.getItem(queueKey())||'null');}catch{return null;}}
  function clearPending(){try{storage()?.removeItem(queueKey());}catch{}}
  function mergeIssueStores(remote={},local={}){
    const merged={...remote};
    Object.entries(local||{}).forEach(([key,entry])=>{
      const current=merged[key]||{};
      const historyById=new Map();
      [...(current.history||[]),...(entry?.history||[])].forEach(record=>{if(record){const id=record.id||`${record.text}|${record.createdAt}`;historyById.set(id,record);}});
      const history=[...historyById.values()];
      const fixed=new Set(history.filter(record=>record?.status==='fixed').map(record=>record.id));
      const active=[...(current.active||[]),...(entry?.active||[])].filter(record=>record&&!fixed.has(record.id)).filter((record,index,array)=>array.findIndex(item=>item.id===record.id)===index);
      merged[key]={...current,...entry,active,history};
    });
    return merged;
  }
  function mergeRecords(remote=[],local=[]){const byId=new Map();[...(remote||[]),...(local||[])].forEach(row=>{if(row){const id=row.id||`${row.date}|${row.type}|${row.driver}|${row.asset}`;byId.set(id,row);}});return [...byId.values()];}
  function reconcilePayload(remote={},local={}){
    return {...remote,...local,fleetIssues:mergeIssueStores(remote.fleetIssues,local.fleetIssues),driverNameAliases:{...(remote.driverNameAliases||{}),...(local.driverNameAliases||{})},morningIssueAcknowledgements:{...(remote.morningIssueAcknowledgements||{}),...(local.morningIssueAcknowledgements||{})},scheduleStayHome:{...(remote.scheduleStayHome||{}),...(local.scheduleStayHome||{})},scheduleStayHomeHistory:{...(remote.scheduleStayHomeHistory||{}),...(local.scheduleStayHomeHistory||{})},scheduleBackupRecords:{...(remote.scheduleBackupRecords||{}),...(local.scheduleBackupRecords||{})},scheduleReductions:{...(remote.scheduleReductions||{}),...(local.scheduleReductions||{})},callOffReasons:{...(remote.callOffReasons||{}),...(local.callOffReasons||{})},whiparoundInspections:mergeRecords(remote.whiparoundInspections,local.whiparoundInspections),whiparoundRosterSnapshots:{...(remote.whiparoundRosterSnapshots||{}),...(local.whiparoundRosterSnapshots||{})},whiparoundNotOnRoute:{...(remote.whiparoundNotOnRoute||{}),...(local.whiparoundNotOnRoute||{})},whiparoundComplianceHistory:{...(remote.whiparoundComplianceHistory||{}),...(local.whiparoundComplianceHistory||{})},whiparoundReminderTemplates:{...(remote.whiparoundReminderTemplates||{}),...(local.whiparoundReminderTemplates||{})}};
  }
  function createClient(){
    if(!configured||!window.supabase?.createClient)return null;
    return window.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  }
  async function init(){
    client=createClient();
    if(!client){notify({type:'offline',reason:'not-configured'});return {configured:false};}
    const result=await client.auth.getSession();session=result.data.session;
    client.auth.onAuthStateChange((_event,next)=>{session=next;notify({type:'auth',session});if(session)load();});
    if(session)await load();else notify({type:'auth',session:null});
    return {configured:true,session};
  }
  function operationDate(){return window.RelayOpsApp?.operationDate?.()||new Date().toISOString().slice(0,10);}
  async function signIn(email){
    if(!client)throw new Error('Cloud is not configured');
    const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:location.href.split('#')[0]}});if(error)throw error;
    notify({type:'magic-link-sent',email});
  }
  async function signOut(){if(client)await client.auth.signOut();}
  async function load(){
    if(!client||!session)return null;
    const date=operationDate();
    const query=date=>client.from('workspace_snapshots').select('payload,revision,updated_at,updated_by').eq('station_id',config.stationId).eq('operation_date',date).maybeSingle();
    const [dailyResult,persistentResult]=await Promise.all([query(date),query(PERSISTENT_DATE)]);
    if(dailyResult.error)throw dailyResult.error;if(persistentResult.error)throw persistentResult.error;
    const data=dailyResult.data,persistent=persistentResult.data,pending=pendingSnapshot();
    revision=Number(data?.revision)||0;persistentRevision=Number(persistent?.revision)||0;
    applying=true;
    if(data){const payload=pending?.payload?reconcilePayload(data.payload||{},pending.payload):data.payload||{};window.RelayOpsApp?.applySharedState?.(payload);}
    if(persistent){const payload=pending?.payload?reconcilePayload(persistent.payload||{},pending.payload):persistent.payload||{};window.RelayOpsApp?.applyPersistentState?.(payload);}
    applying=false;notify({type:'loaded',revision,persistentRevision,updatedAt:data?.updated_at||persistent?.updated_at});
    if(!data||!persistent||pending?.payload)setTimeout(()=>save(!data||!persistent?'workspace.initialize':'workspace.offline-reconcile').catch(error=>notify({type:'error',error})),0);
    subscribe(date);subscribePresence(date);return data;
  }
  async function save(action='workspace.save'){
    const payload=window.RelayOpsApp?.sharedState?.();if(!payload)return null;
    const persistentPayload=window.RelayOpsApp?.persistentState?.()||{};
    if(applying)return null;
    queueSnapshot(payload,action);
    if(!client||!session){notify({type:'offline',reason:'not-connected'});return null;}
    try{
      const daily=await client.rpc('save_workspace_snapshot',{target_station:config.stationId,target_date:operationDate(),expected_revision:revision,new_payload:payload,action_name:action});
      if(daily.error){if(String(daily.error.message||'').includes('revision_conflict')){notify({type:'conflict'});await load();return null;}throw daily.error;}
      revision=Number(daily.data?.revision)||revision+1;
      const persistent=await client.rpc('save_workspace_snapshot',{target_station:config.stationId,target_date:PERSISTENT_DATE,expected_revision:persistentRevision,new_payload:persistentPayload,action_name:`${action}.persistent`});
      if(persistent.error){if(String(persistent.error.message||'').includes('revision_conflict')){notify({type:'conflict'});await load();return null;}throw persistent.error;}
      persistentRevision=Number(persistent.data?.revision)||persistentRevision+1;clearPending();notify({type:'saved',revision,persistentRevision,updatedAt:daily.data?.updated_at||persistent.data?.updated_at});return daily.data;
    }catch(error){queueSnapshot(payload,action);notify({type:'offline',reason:'save-failed',error});throw error;}
  }
  function schedule(action='workspace.autosave'){
    if(applying)return;
    const payload=window.RelayOpsApp?.sharedState?.();if(payload)queueSnapshot(payload,action);
    clearTimeout(saveTimer);if(client&&session)saveTimer=setTimeout(()=>save(action).catch(error=>notify({type:'error',error})),500);
  }
  function subscribe(date){
    if(channel)client.removeChannel(channel);
    channel=client.channel(`workspace:${config.stationId}:${date}`).on('postgres_changes',{event:'UPDATE',schema:'public',table:'workspace_snapshots',filter:`station_id=eq.${config.stationId}`},payload=>{
      const row=payload.new,pending=pendingSnapshot();
      if(row.operation_date===PERSISTENT_DATE){
        if(Number(row.revision)<=persistentRevision)return;
        const next=pending?.payload?reconcilePayload(row.payload||{},pending.payload):row.payload||{};
        persistentRevision=Number(row.revision);applying=true;window.RelayOpsApp?.applyPersistentState?.(next);applying=false;notify({type:'remote-update',revision,persistentRevision,updatedAt:row.updated_at});
      }else{
        if(row.operation_date!==date||Number(row.revision)<=revision)return;
        const next=pending?.payload?reconcilePayload(row.payload||{},pending.payload):row.payload||{};
        revision=Number(row.revision);applying=true;window.RelayOpsApp?.applySharedState?.(next);applying=false;notify({type:'remote-update',revision,persistentRevision,updatedAt:row.updated_at});
      }
      if(pending?.payload)setTimeout(()=>save('workspace.realtime-reconcile').catch(error=>notify({type:'error',error})),0);
    }).subscribe();
  }
  function subscribePresence(date){
    if(presenceChannel)client.removeChannel(presenceChannel);
    presenceChannel=client.channel(`presence:${config.stationId}:${date}`,{config:{presence:{key:session.user.id}}})
      .on('presence',{event:'sync'},()=>{const state=presenceChannel.presenceState();const users=Object.values(state).flat().map(item=>({userId:item.user_id,email:item.email,onlineAt:item.online_at}));notify({type:'presence',users});})
      .subscribe(async status=>{if(status==='SUBSCRIBED')await presenceChannel.track({user_id:session.user.id,email:session.user.email,online_at:new Date().toISOString()});});
  }
  async function members(){
    if(!client||!session)return [];
    const {data,error}=await client.from('memberships').select('user_id,role,display_name,active,created_at').eq('organization_id',config.organizationId).order('display_name');
    if(error)throw error;return data||[];
  }
  async function inviteMember({email,displayName='',role='dispatcher'}){
    if(!client||!session)throw new Error('Sign in first');
    const {data,error}=await client.functions.invoke('invite-user',{body:{email,displayName,role,organizationId:config.organizationId,stationId:config.stationId,redirectTo:location.href.split('#')[0]}});
    if(error)throw error;notify({type:'member-invited',member:data});return data;
  }
  if(window.addEventListener){
    window.addEventListener('online',()=>{notify({type:'reconnecting'});if(session)load().catch(error=>notify({type:'error',error}));});
    window.addEventListener('offline',()=>notify({type:'offline',reason:'browser-offline'}));
  }
  window.RelayOpsCloud={configured,init,signIn,signOut,load,save,schedule,members,inviteMember,on(fn){listeners.add(fn);return()=>listeners.delete(fn);},get session(){return session;},get revision(){return revision;},get persistentRevision(){return persistentRevision;}};
})();
