(function(){
  const config=window.RELAYOPS_CLOUD_CONFIG||{};
  const configured=Boolean(config.supabaseUrl&&config.supabaseAnonKey&&config.organizationId&&config.stationId&&!config.supabaseUrl.includes('YOUR_PROJECT'));
  const PERSISTENT_DATE='2000-01-01';
  const SYNC_META='__relayopsSync';
  let client=null,session=null,revision=0,persistentRevision=0,channel=null,presenceChannel=null,saveTimer=null,applying=false,basePayload={},basePersistentPayload={};
  const listeners=new Set();
  const notify=event=>listeners.forEach(fn=>{try{fn(event);}catch(error){console.error(error);}});
  const queueKey=()=>`relayops_cloud_queue:${config.stationId||'local'}:${operationDate()}`;
  function storage(){try{return window.localStorage||globalThis.localStorage||null;}catch{return null;}}
  function pendingSnapshot(){try{return JSON.parse(storage()?.getItem(queueKey())||'null');}catch{return null;}}
  function clearPending(){try{storage()?.removeItem(queueKey());}catch{}}
  function clone(value){if(value===undefined)return undefined;try{return JSON.parse(JSON.stringify(value));}catch{return value;}}
  function canonical(value){
    if(value===undefined)return 'undefined';if(value===null||typeof value!=='object')return JSON.stringify(value);
    if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;
    return `{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  function same(left,right){return canonical(left)===canonical(right);}
  function timestamp(value=''){const time=Date.parse(value||'');return Number.isFinite(time)?time:0;}
  function newestStamp(...values){return values.filter(Boolean).sort((a,b)=>timestamp(b)-timestamp(a)||String(b).localeCompare(String(a)))[0]||'';}
  function emptyMeta(){return {version:1,versions:{},tombstones:{}};}
  function mergeSyncMeta(...values){
    const merged=emptyMeta();
    values.filter(Boolean).forEach(meta=>{
      for(const bucket of ['versions','tombstones'])Object.entries(meta?.[bucket]||{}).forEach(([path,rows])=>{
        const target=merged[bucket][path]||(merged[bucket][path]={});
        Object.entries(rows||{}).forEach(([key,stamp])=>{target[key]=newestStamp(target[key],stamp);});
      });
    });
    return merged;
  }
  function semanticKey(path,row,index=0){
    if(!row||typeof row!=='object'||Array.isArray(row))return `index:${index}`;
    const leaf=String(path.at(-1)||'').toLowerCase(),clean=value=>String(value??'').trim().toLowerCase().replace(/\s+/g,' ');
    const direct=row.id||row.uid||row.routeUid||row.key;
    if(direct)return `id:${clean(direct)}`;
    if(row.vin)return `vin:${clean(row.vin).replace(/[^a-z0-9]/g,'')}`;
    if(leaf==='morningroutes'||leaf==='routes')return `route:${clean(row.route||row.routeCode||row.route_code)}|${clean(row.wave)}`;
    if(leaf==='vanparking')return `parking:${clean(row.zone)}|${clean(row.label)}|${clean(row.value)}`;
    if(leaf==='scheduleentries')return `shift:${clean(row.date)}|${clean(row.name||row.driver)}`;
    if(leaf==='inventoryitems')return `inventory:${clean(row.name)}`;
    if(leaf==='inventorylog')return `movement:${clean(row.createdAt)}|${clean(row.itemId||row.itemName)}|${clean(row.type)}|${clean(row.quantity)}`;
    if(leaf==='drivercontacts')return `driver:${clean(row.transporterId||row.transporterID||row.name)}|${clean(row.phone)}`;
    if(leaf==='whiparoundinspections')return `inspection:${clean(row.date)}|${clean(row.type)}|${clean(row.driver)}|${clean(row.asset)}`;
    if(row.name)return `name:${clean(row.name)}|${clean(row.date||row.category||row.type)}`;
    return `record:${canonical(row)}`;
  }
  function collectionMap(path,rows=[]){
    const map=new Map(),order=[],seen=new Map();
    (Array.isArray(rows)?rows:[]).forEach((row,index)=>{
      const base=semanticKey(path,row,index),occurrence=seen.get(base)||0,key=occurrence?`${base}#${occurrence}`:base;
      seen.set(base,occurrence+1);map.set(key,row);order.push(key);
    });
    return {map,order};
  }
  function recordStamp(record,meta,path,key){return newestStamp(record?.updatedAt,record?.updated_at,meta?.versions?.[path]?.[key]);}
  function conflictValue(remote,local,remoteStamp='',localStamp='',path=[]){
    const field=String(path.at(-1)||'').toLowerCase();
    // A plain object property has no deletion clock. Keep the edited value when
    // it races a legacy property deletion instead of silently losing data.
    if(remote===undefined)return clone(local);if(local===undefined)return clone(remote);
    if(field==='operational'||field==='operationalstatus'){
      if(/grounded/i.test(String(remote)))return remote;if(/grounded/i.test(String(local)))return local;
    }
    if(field==='active'||field==='activestatus'){
      if(/inactive/i.test(String(remote)))return remote;if(/inactive/i.test(String(local)))return local;
    }
    if(['battery','batterypercent','stateofcharge'].includes(field)){
      const r=Number(remote),l=Number(local);if(Number.isFinite(r)&&Number.isFinite(l))return Math.min(r,l);
    }
    if(['plannedrtsissue','predvic','prewhip','postdvic','postwhip'].includes(field)&&typeof remote==='boolean'&&typeof local==='boolean')return remote||local;
    const rt=timestamp(remoteStamp),lt=timestamp(localStamp);if(rt!==lt)return rt>lt?clone(remote):clone(local);
    return canonical(remote)>=canonical(local)?clone(remote):clone(local);
  }
  function mergeIssueStores(remote={},local={}){
    const merged={},choose=(left,right)=>{
      if(left===undefined)return clone(right);if(right===undefined)return clone(left);if(same(left,right))return clone(left);
      const leftStamp=newestStamp(left?.resolvedAt,left?.updatedAt,left?.createdAt),rightStamp=newestStamp(right?.resolvedAt,right?.updatedAt,right?.createdAt);
      if(timestamp(leftStamp)!==timestamp(rightStamp))return timestamp(leftStamp)>timestamp(rightStamp)?clone(left):clone(right);
      return canonical(left)>=canonical(right)?clone(left):clone(right);
    };
    [...new Set([...Object.keys(remote||{}),...Object.keys(local||{})])].sort().forEach(key=>{
      const left=remote?.[key]||{},right=local?.[key]||{},historyById=new Map(),activeById=new Map();
      [...(left.history||[]),...(right.history||[])].filter(Boolean).forEach(record=>{const id=record.id||`${record.text}|${record.createdAt}`;historyById.set(id,choose(historyById.get(id),record));});
      [...(left.active||[]),...(right.active||[])].filter(Boolean).forEach(record=>{const id=record.id||`${record.text}|${record.createdAt}`;activeById.set(id,choose(activeById.get(id),record));});
      const history=[...historyById.values()].sort((a,b)=>String(a.id||'').localeCompare(String(b.id||''))),fixed=new Set(history.filter(record=>record?.status==='fixed').map(record=>record.id));
      const active=[...activeById.values()].filter(record=>!fixed.has(record.id)).sort((a,b)=>String(a.id||'').localeCompare(String(b.id||'')));
      const preferred=choose(left,right)||{};
      merged[key]={...preferred,label:choose(left.label,right.label)||preferred.label,active,history,updatedAt:newestStamp(left.updatedAt,right.updatedAt)||preferred.updatedAt};
    });
    return merged;
  }
  function mergeCollection(remote=[],local=[],base=[],path=[],remoteMeta=emptyMeta(),localMeta=emptyMeta(),baseMeta=emptyMeta(),resultMeta=emptyMeta()){
    const pathKey=path.join('.'),r=collectionMap(path,remote),l=collectionMap(path,local),b=collectionMap(path,base);
    const baseOrder=b.order,additional=[...new Set([...r.order,...l.order])].filter(key=>!baseOrder.includes(key)).sort(),order=[...baseOrder,...additional],result=[];
    const remoteVersions=remoteMeta.versions?.[pathKey]||{},localVersions=localMeta.versions?.[pathKey]||{},remoteTombs=remoteMeta.tombstones?.[pathKey]||{},localTombs=localMeta.tombstones?.[pathKey]||{};
    const outVersions=resultMeta.versions[pathKey]||(resultMeta.versions[pathKey]={}),outTombs=resultMeta.tombstones[pathKey]||(resultMeta.tombstones[pathKey]={});
    order.forEach(key=>{
      const rv=r.map.get(key),lv=l.map.get(key),bv=b.map.get(key),remoteChanged=!same(rv,bv),localChanged=!same(lv,bv);
      const rs=recordStamp(rv,remoteMeta,pathKey,key),ls=recordStamp(lv,localMeta,pathKey,key),rt=remoteTombs[key]||'',lt=localTombs[key]||'';
      let chosen;
      if(!remoteChanged&&!localChanged)chosen=rv!==undefined?rv:lv!==undefined?lv:bv;
      else if(remoteChanged&&!localChanged)chosen=rv;
      else if(!remoteChanged&&localChanged)chosen=lv;
      else if(rv===undefined||lv===undefined){
        const deletionStamp=rv===undefined?rt:lt,recordValue=rv===undefined?lv:rv,recordVersion=rv===undefined?ls:rs;
        chosen=deletionStamp&&timestamp(deletionStamp)>=timestamp(recordVersion)?undefined:recordValue;
      }else chosen=mergeValue(rv,lv,bv,path,rs,ls,remoteMeta,localMeta,baseMeta,resultMeta);
      const version=newestStamp(rs,ls,remoteVersions[key],localVersions[key]),tombstone=newestStamp(rt,lt);
      if(chosen!==undefined){result.push(clone(chosen));if(version)outVersions[key]=version;if(tombstone&&timestamp(tombstone)>timestamp(version))outTombs[key]=tombstone;else delete outTombs[key];}
      else outTombs[key]=tombstone||version||new Date(0).toISOString();
    });
    return result;
  }
  function mergeValue(remote,local,base,path=[],remoteStamp='',localStamp='',remoteMeta=emptyMeta(),localMeta=emptyMeta(),baseMeta=emptyMeta(),resultMeta=emptyMeta()){
    if(same(remote,local))return clone(remote);
    const remoteChanged=!same(remote,base),localChanged=!same(local,base);
    if(remoteChanged&&!localChanged)return clone(remote);if(!remoteChanged&&localChanged)return clone(local);if(!remoteChanged&&!localChanged)return clone(remote!==undefined?remote:local);
    if(Array.isArray(remote)||Array.isArray(local)||Array.isArray(base)){
      const rows=[remote,local,base].filter(Array.isArray),recordArray=rows.some(array=>array.some(row=>row&&typeof row==='object'&&!Array.isArray(row)));
      if(recordArray)return mergeCollection(remote||[],local||[],base||[],path,remoteMeta,localMeta,baseMeta,resultMeta);
      const length=Math.max(remote?.length||0,local?.length||0,base?.length||0),result=[];
      for(let index=0;index<length;index++){const value=mergeValue(remote?.[index],local?.[index],base?.[index],[...path,String(index)],remoteStamp,localStamp,remoteMeta,localMeta,baseMeta,resultMeta);if(value!==undefined)result[index]=value;}
      return result;
    }
    const plain=value=>value&&typeof value==='object'&&!Array.isArray(value);
    if(plain(remote)||plain(local)||plain(base)){
      if(['fleetIssues','equipmentIssues'].includes(String(path.at(-1)||'')))return mergeIssueStores(remote||{},local||{});
      const result={},keys=[...new Set([...Object.keys(base||{}),...Object.keys(remote||{}),...Object.keys(local||{})])].filter(key=>key!==SYNC_META).sort();
      keys.forEach(key=>{const value=mergeValue(remote?.[key],local?.[key],base?.[key],[...path,key],remoteStamp,localStamp,remoteMeta,localMeta,baseMeta,resultMeta);if(value!==undefined)result[key]=value;});
      return result;
    }
    return conflictValue(remote,local,remoteStamp,localStamp,path);
  }
  function stampCollections(current,base,previous,path,meta,now){
    if(Array.isArray(current)||Array.isArray(base)||Array.isArray(previous)){
      const rows=[current,base,previous].filter(Array.isArray),recordArray=rows.some(array=>array.some(row=>row&&typeof row==='object'&&!Array.isArray(row)));if(!recordArray)return;
      const pathKey=path.join('.'),c=collectionMap(path,current||[]),b=collectionMap(path,base||[]),p=collectionMap(path,previous||[]),versions=meta.versions[pathKey]||(meta.versions[pathKey]={}),tombs=meta.tombstones[pathKey]||(meta.tombstones[pathKey]={});
      c.order.forEach(key=>{const row=c.map.get(key),prior=p.map.has(key)?p.map.get(key):b.map.get(key);if(!same(row,prior))versions[key]=newestStamp(row?.updatedAt,row?.updated_at,now);if(tombs[key]&&timestamp(versions[key])>=timestamp(tombs[key]))delete tombs[key];});
      [...new Set([...b.order,...p.order])].filter(key=>!c.map.has(key)).forEach(key=>{if(!tombs[key])tombs[key]=now;});return;
    }
    if((current&&typeof current==='object')||(base&&typeof base==='object')||(previous&&typeof previous==='object')){
      const keys=[...new Set([...Object.keys(current||{}),...Object.keys(base||{}),...Object.keys(previous||{})])].filter(key=>key!==SYNC_META);
      keys.forEach(key=>stampCollections(current?.[key],base?.[key],previous?.[key],[...path,key],meta,now));
    }
  }
  function preparePayload(raw={},base={},previous=null,now=new Date().toISOString()){
    const next=clone(raw||{}),meta=mergeSyncMeta(base?.[SYNC_META],previous?.[SYNC_META],raw?.[SYNC_META]);
    stampCollections(next,base||{},previous||{},[],meta,now);next[SYNC_META]=meta;return next;
  }
  function reconcilePayload(remote={},local={},base={}){
    const remoteMeta=mergeSyncMeta(remote?.[SYNC_META]),localMeta=mergeSyncMeta(local?.[SYNC_META]),baseMeta=mergeSyncMeta(base?.[SYNC_META]),resultMeta=mergeSyncMeta(baseMeta,remoteMeta,localMeta);
    const result=mergeValue(remote||{},local||{},base||{},[],'','',remoteMeta,localMeta,baseMeta,resultMeta)||{};result[SYNC_META]=resultMeta;return result;
  }
  function writePending(record){try{storage()?.setItem(queueKey(),JSON.stringify(record));}catch{}return record;}
  function queueSnapshot(payload,action='workspace.offline',persistentPayload){
    const existing=pendingSnapshot(),now=new Date().toISOString(),dailyBase=existing?.basePayload||basePayload||{},persistentBase=existing?.basePersistentPayload||basePersistentPayload||{};
    const prepared=preparePayload(payload||{},dailyBase,existing?.payload||null,now),preparedPersistent=preparePayload(persistentPayload===undefined?(window.RelayOpsApp?.persistentState?.()||{}):persistentPayload,persistentBase,existing?.persistentPayload||null,now);
    const record=writePending({payload:prepared,persistentPayload:preparedPersistent,basePayload:clone(dailyBase),basePersistentPayload:clone(persistentBase),action,queuedAt:existing?.queuedAt||now,updatedAt:now});
    notify({type:'queued',action});return record;
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
  async function accessToken(){
    if(!client)throw new Error('Cloud is not configured');
    const {data,error}=await client.auth.getSession();
    if(error)throw error;
    session=data.session;
    return session?.access_token||'';
  }
  function workspaceContext(){return {organizationId:config.organizationId||'',stationId:config.stationId||''};}
  async function load(){
    if(!client||!session)return null;
    const date=operationDate();
    const query=date=>client.from('workspace_snapshots').select('payload,revision,updated_at,updated_by').eq('station_id',config.stationId).eq('operation_date',date).maybeSingle();
    const [dailyResult,persistentResult]=await Promise.all([query(date),query(PERSISTENT_DATE)]);
    if(dailyResult.error)throw dailyResult.error;if(persistentResult.error)throw persistentResult.error;
    const data=dailyResult.data,persistent=persistentResult.data,pending=pendingSnapshot(),dailyRemote=data?.payload||{},persistentRemote=persistent?.payload||{};
    revision=Number(data?.revision)||0;persistentRevision=Number(persistent?.revision)||0;
    const pendingPersistent=pending?.persistentPayload||(pending?.payload?window.RelayOpsApp?.persistentState?.()||{}:null);
    const dailyPayload=pending?.payload?reconcilePayload(dailyRemote,pending.payload,pending.basePayload||basePayload||{}):dailyRemote;
    const persistentPayload=pendingPersistent?reconcilePayload(persistentRemote,pendingPersistent,pending?.basePersistentPayload||basePersistentPayload||{}):persistentRemote;
    basePayload=clone(dailyRemote);basePersistentPayload=clone(persistentRemote);
    applying=true;
    if(data||pending?.payload)window.RelayOpsApp?.applySharedState?.(dailyPayload);
    if(persistent||pendingPersistent)window.RelayOpsApp?.applyPersistentState?.(persistentPayload);
    applying=false;notify({type:'loaded',revision,persistentRevision,updatedAt:data?.updated_at||persistent?.updated_at});
    if(pending)writePending({...pending,payload:dailyPayload,persistentPayload,basePayload:clone(dailyRemote),basePersistentPayload:clone(persistentRemote),updatedAt:new Date().toISOString()});
    if(!data||!persistent||pending?.payload)setTimeout(()=>save(!data||!persistent?'workspace.initialize':'workspace.offline-reconcile').catch(error=>notify({type:'error',error})),0);
    subscribe(date);subscribePresence(date);return data;
  }
  async function save(action='workspace.save'){
    const currentPayload=window.RelayOpsApp?.sharedState?.();if(!currentPayload)return null;
    const currentPersistentPayload=window.RelayOpsApp?.persistentState?.()||{};
    if(applying)return null;
    const queued=queueSnapshot(currentPayload,action,currentPersistentPayload),payload=queued.payload,persistentPayload=queued.persistentPayload;
    if(!client||!session){notify({type:'offline',reason:'not-connected'});return null;}
    try{
      const daily=await client.rpc('save_workspace_snapshot',{target_station:config.stationId,target_date:operationDate(),expected_revision:revision,new_payload:payload,action_name:action});
      if(daily.error){if(String(daily.error.message||'').includes('revision_conflict')){notify({type:'conflict'});await load();return null;}throw daily.error;}
      revision=Number(daily.data?.revision)||revision+1;
      const persistent=await client.rpc('save_workspace_snapshot',{target_station:config.stationId,target_date:PERSISTENT_DATE,expected_revision:persistentRevision,new_payload:persistentPayload,action_name:`${action}.persistent`});
      if(persistent.error){if(String(persistent.error.message||'').includes('revision_conflict')){notify({type:'conflict'});await load();return null;}throw persistent.error;}
      persistentRevision=Number(persistent.data?.revision)||persistentRevision+1;basePayload=clone(payload);basePersistentPayload=clone(persistentPayload);clearPending();notify({type:'saved',revision,persistentRevision,updatedAt:daily.data?.updated_at||persistent.data?.updated_at});return daily.data;
    }catch(error){queueSnapshot(currentPayload,action,currentPersistentPayload);notify({type:'offline',reason:'save-failed',error});throw error;}
  }
  function schedule(action='workspace.autosave'){
    if(applying)return;
    const payload=window.RelayOpsApp?.sharedState?.();if(payload)queueSnapshot(payload,action,window.RelayOpsApp?.persistentState?.()||{});
    clearTimeout(saveTimer);if(client&&session)saveTimer=setTimeout(()=>save(action).catch(error=>notify({type:'error',error})),500);
  }
  function subscribe(date){
    if(channel)client.removeChannel(channel);
    channel=client.channel(`workspace:${config.stationId}:${date}`).on('postgres_changes',{event:'UPDATE',schema:'public',table:'workspace_snapshots',filter:`station_id=eq.${config.stationId}`},payload=>{
      const row=payload.new,pending=pendingSnapshot();
      if(row.operation_date===PERSISTENT_DATE){
        if(Number(row.revision)<=persistentRevision)return;
        const remote=row.payload||{},local=pending?.persistentPayload||null,next=local?reconcilePayload(remote,local,pending?.basePersistentPayload||basePersistentPayload||{}):remote;
        persistentRevision=Number(row.revision);basePersistentPayload=clone(remote);
        if(pending)writePending({...pending,persistentPayload:next,basePersistentPayload:clone(remote),updatedAt:new Date().toISOString()});
        applying=true;window.RelayOpsApp?.applyPersistentState?.(next);applying=false;notify({type:'remote-update',revision,persistentRevision,updatedAt:row.updated_at});
      }else{
        if(row.operation_date!==date||Number(row.revision)<=revision)return;
        const remote=row.payload||{},next=pending?.payload?reconcilePayload(remote,pending.payload,pending?.basePayload||basePayload||{}):remote;
        revision=Number(row.revision);basePayload=clone(remote);
        if(pending)writePending({...pending,payload:next,basePayload:clone(remote),updatedAt:new Date().toISOString()});
        applying=true;window.RelayOpsApp?.applySharedState?.(next);applying=false;notify({type:'remote-update',revision,persistentRevision,updatedAt:row.updated_at});
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
  async function updateMemberAccess({userId,role,active}){
    if(!client||!session)throw new Error('Sign in first');
    if(!userId)throw new Error('Member ID is required');
    if(!['ops_manager','dispatcher','fleet_lead','viewer'].includes(role))throw new Error('Unsupported member role');
    if(userId===session.user.id)throw new Error('Owner account access is locked');
    const {data,error}=await client.from('memberships').update({role,active:Boolean(active)})
      .eq('organization_id',config.organizationId).eq('user_id',userId).neq('role','owner')
      .select('user_id,role,display_name,active,created_at').maybeSingle();
    if(error)throw error;
    if(!data)throw new Error('Owner authorization required or member not found');
    notify({type:'member-updated',member:data});return data;
  }
  if(window.addEventListener){
    window.addEventListener('online',()=>{notify({type:'reconnecting'});if(session)load().catch(error=>notify({type:'error',error}));});
    window.addEventListener('offline',()=>notify({type:'offline',reason:'browser-offline'}));
  }
  window.RelayOpsCloud={configured,init,signIn,signOut,accessToken,workspaceContext,load,save,schedule,members,inviteMember,updateMemberAccess,on(fn){listeners.add(fn);return()=>listeners.delete(fn);},get session(){return session;},get revision(){return revision;},get persistentRevision(){return persistentRevision;},__test:{preparePayload,reconcilePayload,semanticKey,canonical}};
})();
