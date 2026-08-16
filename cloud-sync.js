(function(){
  const config=window.RELAYOPS_CLOUD_CONFIG||{};
  const configured=Boolean(config.supabaseUrl&&config.supabaseAnonKey&&config.organizationId&&config.stationId&&!config.supabaseUrl.includes('YOUR_PROJECT'));
  const PERSISTENT_DATE='2000-01-01';
  const SYNC_META='__relayopsSync';
  const DAILY_STATION_FIELDS=new Set(['fleetImport','fleetSourceUploads','fleetExpectedCount','fleetNameOverrides','fleetIssues','equipmentIssues','vanParking','vanParkingUpdated','chargingStationChecked','vanParkingBatteries','parkingChargerStatus','parkingNotes','equipmentImport','deviceCustomRows','removedDeviceVehicleIds','driverContacts','driverContactsLastImport','removedDriverKeys','driverNameAliases','driverProfiles','scheduleStayHomeHistory','rosteringPlans','rosteringHelperPool','rosteringTrainingMatches','rosteringManualTraining','whiparoundComplianceHistory','whiparoundReminderTemplates','messageQueueTemplate','coachingQueue','inventoryItems','inventoryLog','coachingTemplate','morningSheetsEndpoint','slackReportRoomUrl','chargerReports']);
  let client=null,session=null,membership=null,revision=0,persistentRevision=0,channel=null,presenceChannel=null,pollTimer=null,polling=false,saveTimer=null,saveInFlight=null,pendingSaveAction='',saveRetryTimer=null,saveRetryAttempts=0,applying=false,initializing=false,initializingSince=0,basePayload={},basePersistentPayload={},lastPersistentPollAt=0,lastActivityAt=Date.now(),loadGeneration=0;
  const memoryPendingByKey=new Map();
  const CLOUD_TIMEOUT_MS=Math.max(4000,Math.min(30000,Number(config.requestTimeoutMs)||10000));
  const CLOUD_SAVE_TIMEOUT_MS=Math.max(CLOUD_TIMEOUT_MS,Math.min(60000,Number(config.saveTimeoutMs)||30000));
  const CLOUD_POLL_MS=Math.max(30000,Math.min(120000,Number(config.pollIntervalMs)||60000));
  const CLOUD_IDLE_POLL_MS=Math.max(CLOUD_POLL_MS,Math.min(600000,Number(config.idlePollIntervalMs)||300000));
  const CLOUD_PERSISTENT_POLL_MS=Math.max(120000,Math.min(1800000,Number(config.persistentPollIntervalMs)||600000));
  const CLOUD_ACTIVE_WINDOW_MS=Math.max(60000,Math.min(600000,Number(config.activeWindowMs)||120000));
  const CLOUD_SAVE_DEBOUNCE_MS=Math.max(1800,Math.min(15000,Number(config.saveDebounceMs)||5000));
  const CLOUD_MAX_AUTOMATIC_RETRIES=Math.max(1,Math.min(8,Number(config.maxAutomaticSaveRetries)||5));
  const CLOUD_DAILY_PAYLOAD_LIMIT=Math.max(524288,Math.min(8388608,Number(config.maxDailyPayloadBytes||config.dailyPayloadMaxBytes)||2097152));
  const CLOUD_PERSISTENT_PAYLOAD_LIMIT=Math.max(1048576,Math.min(16777216,Number(config.maxPersistentPayloadBytes||config.persistentPayloadMaxBytes)||4194304));
  const listeners=new Set();
  const notify=event=>listeners.forEach(fn=>{try{fn(event);}catch(error){console.error(error);}});
  const queuePrefix=()=>`relayops_cloud_queue:${config.stationId||'local'}:`;
  const queueKey=(date=operationDate())=>`relayops_cloud_queue:${config.stationId||'local'}:${date}`;
  function storage(){try{return window.localStorage||globalThis.localStorage||null;}catch{return null;}}
  function pendingSnapshot(date=operationDate()){const key=queueKey(date);try{return JSON.parse(storage()?.getItem(key)||'null')||memoryPendingByKey.get(key)||null;}catch{return memoryPendingByKey.get(key)||null;}}
  function clearPending(date=operationDate()){const key=queueKey(date);memoryPendingByKey.delete(key);try{storage()?.removeItem(key);}catch{}}
  function sanitizeCloudString(value=''){
    const input=String(value),parts=[];
    for(let index=0;index<input.length;index++){
      const code=input.charCodeAt(index);
      if(code===0)continue;
      if(code>=0xD800&&code<=0xDBFF){
        const next=input.charCodeAt(index+1);
        if(next>=0xDC00&&next<=0xDFFF){parts.push(input[index],input[index+1]);index++;}else parts.push('\uFFFD');
      }else if(code>=0xDC00&&code<=0xDFFF)parts.push('\uFFFD');
      else parts.push(input[index]);
    }
    return parts.join('');
  }
  function sanitizeCloudValue(value,seen=new WeakMap()){
    if(typeof value==='string')return sanitizeCloudString(value);
    if(value===null||value===undefined||typeof value!=='object')return value;
    if(seen.has(value))return seen.get(value);
    if(Array.isArray(value)){
      const result=[];seen.set(value,result);value.forEach(item=>result.push(sanitizeCloudValue(item,seen)));return result;
    }
    const result={};seen.set(value,result);
    Object.entries(value).forEach(([key,item])=>{const clean=sanitizeCloudValue(item,seen);if(clean!==undefined)result[sanitizeCloudString(key)]=clean;});
    return result;
  }
  function clone(value){if(value===undefined)return undefined;try{return sanitizeCloudValue(JSON.parse(JSON.stringify(value)));}catch{return sanitizeCloudValue(value);}}
  function payloadByteLength(value){
    const text=JSON.stringify(value??{});let bytes=0;
    for(let index=0;index<text.length;index++){
      const code=text.charCodeAt(index);
      if(code<=0x7f)bytes+=1;
      else if(code<=0x7ff)bytes+=2;
      else if(code>=0xd800&&code<=0xdbff&&index+1<text.length&&text.charCodeAt(index+1)>=0xdc00&&text.charCodeAt(index+1)<=0xdfff){bytes+=4;index+=1;}
      else bytes+=3;
    }
    return bytes;
  }
  function enforcePayloadBudget(payload,label,limit){
    const bytes=payloadByteLength(payload);
    if(bytes<=limit)return bytes;
    const error=new Error(`${label} is ${(bytes/1048576).toFixed(1)} MB, above RelayOps' ${(limit/1048576).toFixed(1)} MB sync safety limit. Clear expired daily imports or history before retrying.`);
    error.code='cloud_payload_limit';error.bytes=bytes;error.limit=limit;throw error;
  }
  function compactDailyPayload(value={}){
    const output=clone(value||{});
    DAILY_STATION_FIELDS.forEach(key=>delete output[key]);
    const meta=output?.[SYNC_META];
    if(meta){
      for(const bucket of ['versions','tombstones']){
        Object.keys(meta[bucket]||{}).forEach(path=>{
          if(DAILY_STATION_FIELDS.has(String(path||'').split('.')[0]))delete meta[bucket][path];
        });
      }
    }
    return output;
  }
  function canonical(value){
    if(value===undefined)return 'undefined';if(value===null||typeof value!=='object')return JSON.stringify(value);
    if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;
    return `{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  function same(left,right){return canonical(left)===canonical(right);}
  function sameStoredPayload(left,right){
    const normalize=value=>{
      const copy=clone(value||{}),meta=copy?.[SYNC_META];
      const bucketEmpty=bucket=>Object.values(bucket||{}).every(rows=>!Object.keys(rows||{}).length);
      if(meta&&bucketEmpty(meta.versions)&&bucketEmpty(meta.tombstones))delete copy[SYNC_META];
      return copy;
    };
    return same(normalize(left),normalize(right));
  }
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
    const cleanRaw=clone(raw||{}),cleanBase=clone(base||{}),cleanPrevious=previous===null?null:clone(previous||{});
    const next=clone(cleanRaw),meta=mergeSyncMeta(cleanBase?.[SYNC_META],cleanPrevious?.[SYNC_META],cleanRaw?.[SYNC_META]);
    stampCollections(next,cleanBase,cleanPrevious||{},[],meta,now);next[SYNC_META]=meta;return next;
  }
  function reconcilePayload(remote={},local={},base={}){
    remote=clone(remote||{});local=clone(local||{});base=clone(base||{});
    const remoteMeta=mergeSyncMeta(remote?.[SYNC_META]),localMeta=mergeSyncMeta(local?.[SYNC_META]),baseMeta=mergeSyncMeta(base?.[SYNC_META]),resultMeta=mergeSyncMeta(baseMeta,remoteMeta,localMeta);
    const result=mergeValue(remote||{},local||{},base||{},[],'','',remoteMeta,localMeta,baseMeta,resultMeta)||{};result[SYNC_META]=resultMeta;return result;
  }
  function writePending(record,date=operationDate()){
    const key=queueKey(date);memoryPendingByKey.set(key,record);
    try{storage()?.setItem(key,JSON.stringify(record));memoryPendingByKey.delete(key);}catch{}
    return record;
  }
  function queueSnapshot(payload,action='workspace.offline',persistentPayload,date=operationDate(),baseOverrides={}){
    const existing=pendingSnapshot(date),now=new Date().toISOString(),dailyBase=existing?.basePayload||baseOverrides.daily||basePayload||{},persistentBase=existing?.basePersistentPayload||baseOverrides.persistent||basePersistentPayload||{};
    const prepared=preparePayload(payload||{},dailyBase,existing?.payload||null,now),preparedPersistent=preparePayload(persistentPayload===undefined?(window.RelayOpsApp?.persistentState?.()||{}):persistentPayload,persistentBase,existing?.persistentPayload||null,now);
    const record=writePending({payload:prepared,persistentPayload:preparedPersistent,basePayload:clone(dailyBase),basePersistentPayload:clone(persistentBase),action,shared:true,userId:session?.user?.id||'',queuedAt:existing?.queuedAt||now,updatedAt:now},date);
    notify({type:'queued',action});return record;
  }
  function stationPendingRecords(){
    const prefix=queuePrefix(),records=new Map(),target=storage();
    try{
      for(let index=0;index<(target?.length||0);index++){
        const key=target.key(index);if(!key?.startsWith(prefix))continue;
        try{const record=JSON.parse(target.getItem(key)||'null');if(record)records.set(key,record);}catch{}
      }
    }catch{}
    memoryPendingByKey.forEach((record,key)=>{if(key.startsWith(prefix)&&record)records.set(key,record);});
    return [...records.entries()].map(([key,record])=>({key,date:key.slice(prefix.length),record}));
  }
  function carriedPersistentPayload(remote={},currentDate=operationDate(),currentPending=null){
    let next=clone(remote||{}),carried=false;
    const records=stationPendingRecords().filter(item=>item.date!==currentDate&&item.record?.shared&&item.record.userId===session?.user?.id)
      .sort((left,right)=>timestamp(left.record?.updatedAt)-timestamp(right.record?.updatedAt));
    records.forEach(({record})=>{
      if(!record?.persistentPayload||sameStoredPayload(record.persistentPayload,record.basePersistentPayload||{}))return;
      next=reconcilePayload(next,record.persistentPayload,record.basePersistentPayload||{});carried=true;
    });
    if(currentPending?.persistentPayload)next=reconcilePayload(next,currentPending.persistentPayload,currentPending.basePersistentPayload||{});
    return {payload:next,carried};
  }
  function acknowledgeStationPersistentPayload(payload={}){
    stationPendingRecords().forEach(({date,record})=>{
      if(!record?.shared||record.userId!==session?.user?.id||!record.persistentPayload)return;
      const reconciled=reconcilePayload(payload,record.persistentPayload,record.basePersistentPayload||{});
      writePending({...record,persistentPayload:reconciled,basePersistentPayload:clone(payload),updatedAt:new Date().toISOString()},date);
    });
  }
  function authSessionStorage(){try{return window.sessionStorage||null;}catch{return null;}}
  async function unlockedAuthOperation(_name,_acquireTimeout,operation){return operation();}
  function cloudFetch(input,init={}){
    const fetchImpl=window.fetch||globalThis.fetch;
    if(typeof fetchImpl!=='function')throw new Error('Shared cloud networking is unavailable');
    if(typeof AbortController!=='function')return fetchImpl(input,init);
    const method=String(init?.method||'GET').toUpperCase(),controller=new AbortController(),sourceSignal=init?.signal;
    let timedOut=false;
    if(sourceSignal?.aborted)controller.abort(sourceSignal.reason);
    else sourceSignal?.addEventListener?.('abort',()=>controller.abort(sourceSignal.reason),{once:true});
    const timeout=Math.max(3500,(method==='GET'||method==='HEAD'?CLOUD_TIMEOUT_MS:CLOUD_SAVE_TIMEOUT_MS)-250);
    const timer=setTimeout(()=>{timedOut=true;controller.abort();},timeout);
    return fetchImpl(input,{...init,signal:controller.signal}).catch(error=>{
      if(!timedOut)throw error;
      const wrapped=new Error('Shared database is busy. Your edits remain safe on this device; retry in a minute.');wrapped.code='cloud_timeout';throw wrapped;
    }).finally(()=>clearTimeout(timer));
  }
  function createClient(){
    if(!configured||!window.supabase?.createClient)return null;
    // RelayOps uses an anonymous, link-scoped session. Keep that session inside
    // the current tab instead of the app's already-busy localStorage. Supabase's
    // default cross-tab Web Lock can remain held by a sleeping mobile tab and
    // leave every other dispatcher stuck on "Connecting". Each tab has its own
    // anonymous session, so running the small auth operation directly is safe.
    const auth={persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,lock:unlockedAuthOperation};
    const isolatedStorage=authSessionStorage();if(isolatedStorage)auth.storage=isolatedStorage;
    return window.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey,{auth,global:{fetch:cloudFetch}});
  }
  function authRedirectUrl(){
    const configuredRedirect=String(config.authRedirectUrl||'').trim();
    try{
      const redirect=new URL(configuredRedirect||location.href,location.href);
      redirect.hash='';
      if(!configuredRedirect)redirect.search='';
      redirect.searchParams.set('date',operationDate());
      const view=new URL(location.href,location.href).searchParams.get('view');
      if(view)redirect.searchParams.set('view',view);
      return redirect.href;
    }catch{
      return String(location.href||'').split(/[?#]/)[0];
    }
  }
  function readableAuthError(error){
    const message=String(error?.message||error||'').trim();
    if(/email rate limit exceeded|rate limit.*email|too many.*email/i.test(message)){
      const friendly=new Error('Supabase has reached its two-email hourly limit. Open the newest RelayOps invitation already in your inbox, or wait up to one hour before requesting one more link.');
      friendly.code='email_rate_limit';
      return friendly;
    }
    if(/load failed|failed to fetch|fetch failed|network request failed|networkerror|network error/i.test(message)){
      return new Error('Shared cloud service is unreachable. Check the connection, then retry.');
    }
    return error instanceof Error?error:new Error(message||'Unable to send the secure sign-in link');
  }
  const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  function withCloudTimeout(promise,label='Shared cloud request',timeout=CLOUD_TIMEOUT_MS){
    let timer;
    return Promise.race([
      Promise.resolve(promise),
      new Promise((_,reject)=>{timer=setTimeout(()=>{const saving=/save/i.test(label),error=new Error(saving?`${label} is taking longer than normal. Your edits are safe on this device and will retry automatically.`:`${label} timed out. Please retry.`);error.code='cloud_timeout';reject(error);},timeout);})
    ]).finally(()=>clearTimeout(timer));
  }
  function transientPoolError(error){return /PGRST003|connection pool|timed out acquiring connection|database.*busy/i.test(String(error?.code||'')+' '+String(error?.message||error||''));}
  async function cloudRequest(factory,label){
    const result=await withCloudTimeout(factory(),label);
    // Retrying PGRST003 immediately creates another waiter in PostgREST's
    // already exhausted pool. Surface the busy response and let the guarded
    // minute-scale retry path handle it instead.
    if(transientPoolError(result?.error))notify({type:'reconnecting',reason:'database-busy'});
    return result;
  }
  function isAuthSessionError(error){return /jwt|refresh.?token|invalid.?token|session.*(missing|expired|invalid)|unauthorized|not authenticated/i.test(String(error?.message||error||''));}
  function isStorageQuotaError(error){return /quota|storage.*full|exceeded/i.test(String(error?.message||error||''));}
  function reclaimStorageForSharedSession(){
    const target=storage();if(!target)return 0;
    let freed=0;
    const discard=new Set([
      'relayops_sheet_history','relayops_achat_messages','relayops_morning_sheets_last_receipt','relayops_morning_sheets_last_dry_run',
      'relayops_morning_sheets_last_error','relayops_fleet_live_last_error','relayops_cloud_signin_cooldown_until'
    ]);
    const redundantOnCloud=new Set([
      'relayops_routes','relayops_morning','relayops_fleet_import','relayops_fleet_source_uploads','relayops_van_parking',
      'relayops_driver_contacts','relayops_schedule_entries','relayops_rostering_plans','relayops_whiparound_inspections',
      'relayops_whiparound_roster_snapshots','relayops_inventory_log','relayops_equipment_import'
    ]);
    const entries=[];
    try{for(let index=0;index<target.length;index++){const key=target.key(index);if(key)entries.push([key,target.getItem(key)||'']);}}catch{}
    entries.forEach(([key,value])=>{
      const cloudQueue=key.startsWith('relayops_cloud_queue:');
      if(cloudQueue&&key===queueKey()&&!memoryPendingByKey.has(key)){try{memoryPendingByKey.set(key,JSON.parse(value||'null'));}catch{}}
      // Keep queued edits for other operation dates intact. Only the active
      // date's queue is moved into memory while Safari makes room for the
      // Supabase session token.
      if((cloudQueue&&key===queueKey())||discard.has(key)||redundantOnCloud.has(key)){
        try{target.removeItem(key);freed+=key.length+value.length;}catch{}
      }
    });
    return freed;
  }
  async function createAnonymousLinkSession(){
    if(typeof client?.auth?.signInAnonymously!=='function')throw new Error('Automatic shared access is unavailable');
    let lastError=null;
    for(let attempt=0;attempt<3;attempt++){
      let anonymous;
      try{anonymous=await withCloudTimeout(client.auth.signInAnonymously({options:{data:{relayops_link_access:true}}}),'Shared link sign-in');}
      catch(error){anonymous={data:null,error};}
      if(!anonymous.error&&anonymous.data?.session)return anonymous.data.session;
      lastError=anonymous.error||new Error('Automatic shared access did not return a session');
      if(isStorageQuotaError(lastError)){reclaimStorageForSharedSession();if(attempt<2)continue;}
      if(!/load failed|failed to fetch|network|timeout/i.test(String(lastError?.message||lastError)))break;
      if(attempt<2)await pause(500*(attempt+1));
    }
    throw readableAuthError(lastError||new Error('Automatic shared access failed'));
  }
  async function replaceWithAnonymousLinkSession(){
    if(session)await withCloudTimeout(client.auth.signOut({scope:'local'}),'Old shared session cleanup',5000).catch(()=>{});
    session=null;membership=null;
    session=await createAnonymousLinkSession();
    notify({type:'auth',session});
    await load();
    if(!membership)throw new Error('The shared station membership could not be created');
    notify({type:'admin-status',unlocked:await adminStatus().catch(()=>false)});
    notify({type:'ready',revision,persistentRevision});
    return session;
  }
  async function init(){
    client=createClient();
    if(!client){notify({type:'offline',reason:'not-configured'});return {configured:false};}
    initializing=true;initializingSince=Date.now();
    try{
      const result=await withCloudTimeout(client.auth.getSession(),'Saved shared session check');if(result?.error)throw result.error;session=result?.data?.session||null;
      client.auth.onAuthStateChange((_event,next)=>{
        session=next;if(!session)membership=null;
        // init()/retryLinkAccess() own the first load. A delayed SIGNED_IN
        // callback must not change a fully loaded workspace back to
        // "Connecting" or start a duplicate snapshot request.
        if(initializing)return;
        notify({type:'auth',session});
        if(session)load().catch(error=>notify({type:'error',error}));
      });
      if(!session)session=await createAnonymousLinkSession();
      if(session){
        notify({type:'auth',session});
        try{await load();}
        catch(error){if(!isAuthSessionError(error))throw error;await replaceWithAnonymousLinkSession();}
        // Replace any stale browser session that lacks station access, including
        // anonymous sessions created before the link-access trigger existed.
        if(!membership)await replaceWithAnonymousLinkSession();
        if(membership){
          notify({type:'admin-status',unlocked:await adminStatus().catch(()=>false)});
          notify({type:'ready',revision,persistentRevision});
        }
      }else notify({type:'link-access-error',error:new Error('Automatic shared access is unavailable')});
      return {configured:true,session};
    }catch(error){notify({type:'link-access-error',error});return {configured:true,session,error};}
    finally{initializing=false;initializingSince=0;}
  }
  async function retryLinkAccess(){
    if(initializing){
      notify({type:'reconnecting'});
      const deadline=(initializingSince||Date.now())+CLOUD_TIMEOUT_MS+1500;
      while(initializing&&Date.now()<deadline)await pause(150);
      if(initializing)throw new Error('The previous shared-cloud connection stalled. Reload once to start the repaired session.');
      if(session&&membership){notify({type:'ready',revision,persistentRevision});return {configured:true,session};}
    }
    if(!client)client=createClient();
    if(!client)throw new Error('Shared cloud is not configured');
    initializing=true;initializingSince=Date.now();notify({type:'reconnecting'});
    try{
      if(session){
        await load();
        if(membership){notify({type:'admin-status',unlocked:await adminStatus().catch(()=>false)});notify({type:'ready',revision,persistentRevision});return {configured:true,session};}
      }
      await replaceWithAnonymousLinkSession();
      return {configured:true,session};
    }catch(error){notify({type:'link-access-error',error});throw error;}
    finally{initializing=false;initializingSince=0;}
  }
  function operationDate(){return window.RelayOpsApp?.operationDate?.()||new Date().toISOString().slice(0,10);}
  async function signIn(email){
    if(!client)throw new Error('Cloud is not configured');
    try{
      const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:authRedirectUrl()}});if(error)throw error;
      notify({type:'magic-link-sent',email});
    }catch(error){throw readableAuthError(error);}
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
  async function currentMembership({refresh=false}={}){
    if(!client||!session)return null;
    if(membership&&!refresh)return membership;
    const {data,error}=await cloudRequest(()=>client.from('memberships').select('user_id,role,display_name,active').eq('organization_id',config.organizationId).eq('user_id',session.user.id).eq('active',true).maybeSingle(),'Shared station access check');
    if(error)throw error;
    membership=data||null;
    if(membership&&!['owner','ops_manager'].includes(membership.role)){
      const station=await cloudRequest(()=>client.from('station_memberships').select('station_id').eq('station_id',config.stationId).eq('user_id',session.user.id).maybeSingle(),'Station membership check');
      if(station.error)throw station.error;
      if(!station.data)membership=null;
    }
    if(!membership)notify({type:'access-denied',email:session.user.email||''});
    else notify({type:'access-granted',membership});
    return membership;
  }
  function canWrite(){return Boolean(membership&&membership.active&&membership.role!=='viewer');}
  function canInitialize(){return canWrite();}
  function currentOperationRequest(date,generation){return date===operationDate()&&generation===loadGeneration;}
  async function load(){
    if(!client||!session)return null;
    clearTimeout(saveTimer);saveTimer=null;
    const date=operationDate(),generation=++loadGeneration;
    const access=await currentMembership({refresh:true});
    if(!access||!currentOperationRequest(date,generation))return null;
    const query=targetDate=>cloudRequest(()=>client.from('workspace_snapshots').select('payload,revision,updated_at,updated_by').eq('station_id',config.stationId).eq('operation_date',targetDate).maybeSingle(),targetDate===PERSISTENT_DATE?'Shared station settings download':'Shared daily operations download');
    // Run the two small snapshot reads in sequence. On Supabase's nano compute,
    // parallel PostgREST requests can compete for the same tiny connection pool.
    const dailyResult=await query(date);
    if(!currentOperationRequest(date,generation))return null;
    const persistentResult=await query(PERSISTENT_DATE);
    if(!currentOperationRequest(date,generation))return null;
    if(dailyResult.error)throw dailyResult.error;if(persistentResult.error)throw persistentResult.error;
    const data=dailyResult.data,persistent=persistentResult.data,legacyDaily=clone(data?.payload||{}),dailyRemote=compactDailyPayload(legacyDaily),persistentBaseRemote=clone(persistent?.payload||{}),persistentRemote=clone(persistentBaseRemote);
    let legacyPersistentMigration=false;
    for(const key of ['coachingQueue','messageQueueTemplate']){
      if(!Object.prototype.hasOwnProperty.call(persistentBaseRemote,key)&&Object.prototype.hasOwnProperty.call(legacyDaily,key)){
        persistentRemote[key]=clone(legacyDaily[key]);legacyPersistentMigration=true;
      }
    }
    let pending=pendingSnapshot(date);
    // Pre-cloud and signed-out browser queues are device-local caches, not
    // authoritative shared edits. Never merge one dispatcher's stale cache
    // into the station workspace after sign-in.
    if(pending&&(!pending.shared||pending.userId!==session.user.id)){clearPending(date);pending=null;}
    revision=Number(data?.revision)||0;persistentRevision=Number(persistent?.revision)||0;
    const carriedPersistent=carriedPersistentPayload(persistentRemote,date,pending),hasPersistentPending=Boolean(pending?.persistentPayload)||carriedPersistent.carried;
    const dailyPayload=pending?.payload?reconcilePayload(dailyRemote,pending.payload,pending.basePayload||basePayload||{}):dailyRemote;
    const persistentPayload=carriedPersistent.payload;
    basePayload=clone(dailyRemote);basePersistentPayload=clone(persistentBaseRemote);lastPersistentPollAt=Date.now();
    applying=true;
    try{
      // A missing date is a true new-day initialization. Existing snapshots
      // use the narrower hydration reset so a remote update cannot close local
      // dialogs or discard filters, connector receipts, and screenshot review.
      if(data||pending?.payload)(window.RelayOpsApp?.resetSharedDailyState||window.RelayOpsApp?.resetDailyState)?.(date);
      else window.RelayOpsApp?.resetDailyState?.(date);
      if(data||pending?.payload)window.RelayOpsApp?.applySharedState?.(dailyPayload);
      if(persistent||hasPersistentPending||legacyPersistentMigration)window.RelayOpsApp?.applyPersistentState?.(persistentPayload);
    }finally{applying=false;}
    if(!currentOperationRequest(date,generation))return null;
    notify({type:'loaded',revision,persistentRevision,updatedAt:data?.updated_at||persistent?.updated_at,operationDate:date});
    if(pending)writePending({...pending,payload:dailyPayload,persistentPayload,basePayload:clone(dailyRemote),basePersistentPayload:clone(persistentBaseRemote),updatedAt:new Date().toISOString()},date);
    if((!data||!persistent)&&!canInitialize())notify({type:'workspace-empty',operationDate:date,missingDaily:!data,missingPersistent:!persistent});
    if(((!data||!persistent)&&canInitialize())||pending?.payload||carriedPersistent.carried||legacyPersistentMigration){
      const action=legacyPersistentMigration?'workspace.legacy-station-migration':carriedPersistent.carried?'workspace.prior-date-station-reconcile':!data||!persistent?'workspace.initialize':'workspace.offline-reconcile';
      setTimeout(()=>save(action).catch(error=>notify({type:'error',error})),0);
    }
    subscribe(date);subscribePresence(date);return data;
  }
  async function performSave(action='workspace.save'){
    const currentPayload=window.RelayOpsApp?.sharedState?.();if(!currentPayload)return null;
    const currentPersistentPayload=window.RelayOpsApp?.persistentState?.()||{};
    if(applying)return null;
    if(!client||!session){notify({type:'offline',reason:'not-connected'});return null;}
    const saveDate=operationDate(),saveGeneration=loadGeneration,saveRevision=revision,savePersistentRevision=persistentRevision,saveBasePayload=clone(basePayload),saveBasePersistentPayload=clone(basePersistentPayload);
    // Queue under the captured date before any await. If midnight occurs while
    // membership or the RPC is in flight, yesterday's edit remains isolated
    // and recoverable instead of being written into today's workspace.
    const queued=queueSnapshot(currentPayload,action,currentPersistentPayload,saveDate,{daily:saveBasePayload,persistent:saveBasePersistentPayload}),payload=queued.payload,persistentPayload=queued.persistentPayload;
    if(!membership)await currentMembership({refresh:true});
    if(!canWrite())throw new Error('This account does not have permission to edit the shared workspace');
    const dailyChanged=!sameStoredPayload(payload,saveBasePayload),persistentChanged=!sameStoredPayload(persistentPayload,saveBasePersistentPayload);
    try{
      if(!dailyChanged&&!persistentChanged){
        const latest=pendingSnapshot(saveDate);
        if(!latest||(same(latest.payload,payload)&&same(latest.persistentPayload,persistentPayload)))clearPending(saveDate);
        if(saveDate===operationDate())notify({type:'saved',revision,persistentRevision,unchanged:true,operationDate:saveDate});return null;
      }
      let daily=null,persistent=null;
      if(dailyChanged){
        enforcePayloadBudget(payload,'Daily operations data',CLOUD_DAILY_PAYLOAD_LIMIT);
        daily=await withCloudTimeout(client.rpc('save_workspace_snapshot_v3',{target_station:config.stationId,target_date:saveDate,expected_revision:saveRevision,new_payload:payload,action_name:action}),'Daily operations save',CLOUD_SAVE_TIMEOUT_MS);
        if(daily.error){
          if(String(daily.error.message||'').includes('revision_conflict')){
            notify({type:'conflict',operationDate:saveDate});
            if(saveDate===operationDate())await load();
            return {conflict:true,action,operationDate:saveDate};
          }
          throw daily.error;
        }
        if(currentOperationRequest(saveDate,saveGeneration)){revision=Number(daily.data?.revision)||saveRevision+1;basePayload=clone(payload);}
      }
      if(persistentChanged){
        enforcePayloadBudget(persistentPayload,'Permanent station data',CLOUD_PERSISTENT_PAYLOAD_LIMIT);
        persistent=await withCloudTimeout(client.rpc('save_workspace_snapshot_v3',{target_station:config.stationId,target_date:PERSISTENT_DATE,expected_revision:savePersistentRevision,new_payload:persistentPayload,action_name:`${action}.persistent` }),'Station settings save',CLOUD_SAVE_TIMEOUT_MS);
        if(persistent.error){
          if(String(persistent.error.message||'').includes('revision_conflict')){
            notify({type:'conflict',operationDate:saveDate});
            await load();return {conflict:true,action,operationDate:saveDate};
          }
          throw persistent.error;
        }
        const serverPersistentRevision=Number(persistent.data?.revision)||savePersistentRevision+1;
        if(serverPersistentRevision>=persistentRevision){
          persistentRevision=serverPersistentRevision;basePersistentPayload=clone(persistentPayload);
          acknowledgeStationPersistentPayload(persistentPayload);
          // A station save can finish after midnight. Its response advances the
          // shared revision, but must never repaint driver/fleet edits made in
          // the newly active day while that request was in flight.
          if(!currentOperationRequest(saveDate,saveGeneration)){
            const activeDate=operationDate(),activePersistent=window.RelayOpsApp?.persistentState?.()||{},activeDaily=window.RelayOpsApp?.sharedState?.()||{};
            if(!sameStoredPayload(activePersistent,persistentPayload)){
              queueSnapshot(activeDaily,'workspace.stale-station-reconcile',activePersistent,activeDate,{daily:basePayload,persistent:persistentPayload});
              pendingSaveAction=pendingSaveAction||'workspace.stale-station-reconcile';
            }
          }
        }
      }
      const latest=pendingSnapshot(saveDate);
      if(!latest||(same(latest.payload,payload)&&same(latest.persistentPayload,persistentPayload)))clearPending(saveDate);
      if(saveDate===operationDate())notify({type:'saved',revision,persistentRevision,updatedAt:daily?.data?.updated_at||persistent?.data?.updated_at,operationDate:saveDate});
      return daily?.data||persistent?.data||null;
    }catch(error){
      // The starting snapshot was queued before the request. Keep the newest
      // queue entry intact: a dispatcher may have made another edit while the
      // failing request was in flight.
      if(!pendingSnapshot(saveDate))writePending(queued,saveDate);
      if(error?.code==='cloud_timeout'){notify({type:'save-delayed',error});return {delayed:true,action};}
      notify({type:'offline',reason:'save-failed',error});throw error;
    }
  }
  function clearSaveRetry(){clearTimeout(saveRetryTimer);saveRetryTimer=null;saveRetryAttempts=0;}
  function schedulePendingSaveRetry(action='workspace.retry'){
    clearTimeout(saveRetryTimer);
    if(typeof document!=='undefined'&&document.visibilityState==='hidden'){notify({type:'save-delayed',reason:'background-tab-paused'});return;}
    if(saveRetryAttempts>=CLOUD_MAX_AUTOMATIC_RETRIES){
      notify({type:'save-delayed',reason:'automatic-retries-paused',error:new Error('Automatic cloud retries paused until this tab is active again')});return;
    }
    const steps=[30000,60000,120000,300000],base=steps[Math.min(saveRetryAttempts,steps.length-1)],jitter=.8+Math.random()*.4,delay=Math.round(base*jitter);saveRetryAttempts+=1;
    saveRetryTimer=setTimeout(()=>{
      saveRetryTimer=null;
      if(!pendingSnapshot()||!session||!membership)return;
      if(typeof document!=='undefined'&&document.visibilityState==='hidden')return;
      save(action).catch(error=>notify({type:'error',error}));
    },delay);
    if(typeof saveRetryTimer?.unref==='function')saveRetryTimer.unref();
  }
  function save(action='workspace.save'){
    // Explicit critical saves (for example, clearing a shared sheet) replace
    // the delayed autosave instead of racing it with a duplicate write.
    clearTimeout(saveTimer);saveTimer=null;
    if(saveInFlight){pendingSaveAction=action;return saveInFlight;}
    saveInFlight=performSave(action);
    return saveInFlight.then(result=>{
      saveInFlight=null;
      const next=pendingSaveAction;pendingSaveAction='';
      if(result?.delayed){schedulePendingSaveRetry(next||result.action||action);return null;}
      if(result?.conflict){schedulePendingSaveRetry(next||'workspace.conflict-retry');return result;}
      clearSaveRetry();
      if(next&&session&&membership)setTimeout(()=>save(next).catch(error=>notify({type:'error',error})),0);
      return result;
    },error=>{saveInFlight=null;pendingSaveAction='';throw error;});
  }
  function schedule(action='workspace.autosave'){
    if(applying)return;
    if(!session){notify({type:'offline',reason:'signed-out-local-only'});return;}
    // Do not let startup renders fan out concurrent writes while the station
    // membership check is still pending. Once load succeeds, normal edits are
    // queued and the single-flight writer flushes them in order.
    if(!membership){notify({type:'reconnecting',reason:'membership-pending'});return;}
    if(membership&&!canWrite())return;
    lastActivityAt=Date.now();
    const payload=window.RelayOpsApp?.sharedState?.();if(payload)queueSnapshot(payload,action,window.RelayOpsApp?.persistentState?.()||{});
    clearTimeout(saveRetryTimer);saveRetryTimer=null;
    clearTimeout(saveTimer);
    // Background tabs keep the latest edit in the date-scoped local queue but
    // never compete with the dispatcher who is actively using the workspace.
    if(typeof document!=='undefined'&&document.visibilityState==='hidden')return;
    if(client&&session)saveTimer=setTimeout(()=>save(action).catch(error=>notify({type:'error',error})),CLOUD_SAVE_DEBOUNCE_MS);
  }
  function flushPendingOnResume(action='workspace.resume'){
    if(!pendingSnapshot()||!session||!membership||!canWrite())return Promise.resolve(null);
    clearSaveRetry();return save(action).catch(error=>{notify({type:'error',error});return null;});
  }
  function applyRemoteSnapshot(row,date,generation=loadGeneration){
    if(!currentOperationRequest(date,generation))return false;
    const pending=pendingSnapshot(date);if(!row?.operation_date)return false;
    if(row.operation_date===PERSISTENT_DATE){
      if(Number(row.revision)<=persistentRevision)return false;
      const remote=row.payload||{},local=pending?.persistentPayload||null,next=local?reconcilePayload(remote,local,pending?.basePersistentPayload||basePersistentPayload||{}):remote;
      persistentRevision=Number(row.revision);basePersistentPayload=clone(remote);
      if(pending)writePending({...pending,persistentPayload:next,basePersistentPayload:clone(remote),updatedAt:new Date().toISOString()},date);
      applying=true;window.RelayOpsApp?.applyPersistentState?.(next);applying=false;notify({type:'remote-update',revision,persistentRevision,updatedAt:row.updated_at});
    }else{
      if(row.operation_date!==date||Number(row.revision)<=revision)return false;
      const remote=compactDailyPayload(row.payload||{}),next=pending?.payload?reconcilePayload(remote,pending.payload,pending?.basePayload||basePayload||{}):remote;
      revision=Number(row.revision);basePayload=clone(remote);
      if(pending)writePending({...pending,payload:next,basePayload:clone(remote),updatedAt:new Date().toISOString()},date);
      applying=true;try{(window.RelayOpsApp?.resetSharedDailyState||window.RelayOpsApp?.resetDailyState)?.(date);window.RelayOpsApp?.applySharedState?.(next);}finally{applying=false;}notify({type:'remote-update',revision,persistentRevision,updatedAt:row.updated_at});
    }
    if(pending?.payload)setTimeout(()=>save('workspace.poll-reconcile').catch(error=>notify({type:'error',error})),0);return true;
  }
  async function pollForUpdates(date=operationDate(),options={}){
    if(polling||!client||!session||date!==operationDate())return false;
    if(typeof document!=='undefined'&&document.visibilityState==='hidden'&&!options.force)return false;
    const generation=loadGeneration;polling=true;
    try{
      const summary=targetDate=>cloudRequest(()=>client.from('workspace_snapshots').select('revision,updated_at,updated_by,operation_date').eq('station_id',config.stationId).eq('operation_date',targetDate).maybeSingle(),targetDate===PERSISTENT_DATE?'Shared station revision check':'Shared daily revision check');
      const full=targetDate=>cloudRequest(()=>client.from('workspace_snapshots').select('payload,revision,updated_at,updated_by,operation_date').eq('station_id',config.stationId).eq('operation_date',targetDate).maybeSingle(),targetDate===PERSISTENT_DATE?'Changed station settings download':'Changed daily operations download');
      const dailySummary=await summary(date);if(dailySummary.error)throw dailySummary.error;
      if(!currentOperationRequest(date,generation))return false;
      const persistentDue=Boolean(options.forcePersistent)||Date.now()-lastPersistentPollAt>=CLOUD_PERSISTENT_POLL_MS;
      let persistentSummary=null;
      if(persistentDue){persistentSummary=await summary(PERSISTENT_DATE);if(persistentSummary.error)throw persistentSummary.error;if(!currentOperationRequest(date,generation))return false;lastPersistentPollAt=Date.now();}
      let daily=null,persistent=null;
      if(Number(dailySummary.data?.revision)>revision){daily=await full(date);if(daily.error)throw daily.error;if(!currentOperationRequest(date,generation))return false;}
      if(Number(persistentSummary?.data?.revision)>persistentRevision){persistent=await full(PERSISTENT_DATE);if(persistent.error)throw persistent.error;if(!currentOperationRequest(date,generation))return false;}
      const changed=applyRemoteSnapshot(persistent?.data,date,generation)|applyRemoteSnapshot(daily?.data,date,generation);return Boolean(changed);
    }catch(error){notify({type:'offline',reason:'poll-failed',error});return false;}
    finally{polling=false;}
  }
  function scheduleNextPoll(date){
    clearTimeout(pollTimer);
    const delay=Date.now()-lastActivityAt<CLOUD_ACTIVE_WINDOW_MS?CLOUD_POLL_MS:CLOUD_IDLE_POLL_MS;
    pollTimer=setTimeout(async()=>{await pollForUpdates(date);if(session&&date===operationDate())scheduleNextPoll(date);},delay);
    if(typeof pollTimer?.unref==='function')pollTimer.unref();
  }
  function subscribe(date){
    // Realtime's WAL polling consumed nearly all CPU on the project's nano
    // compute even with only a few tabs. Use adaptive revision checks instead:
    // 60 seconds while dispatch is active, 5 minutes while idle, and fetch the
    // large JSON payload only after its revision changes.
    if(channel)client.removeChannel(channel);if(presenceChannel)client.removeChannel(presenceChannel);channel=null;presenceChannel=null;
    notify({type:'presence',users:session?[{userId:session.user.id,email:session.user.email||'Shared link',onlineAt:new Date().toISOString()}]:[]});scheduleNextPoll(date);
  }
  function subscribePresence(){return null;}
  async function members(){
    if(!client||!session)return [];
    const {data,error}=await client.from('memberships').select('user_id,role,display_name,active,created_at').eq('organization_id',config.organizationId).order('display_name');
    if(error)throw error;return data||[];
  }
  async function inviteMember({email,displayName='',role='dispatcher'}){
    if(!client||!session)throw new Error('Sign in first');
    const {data,error}=await client.functions.invoke('invite-user',{body:{email,displayName,role,organizationId:config.organizationId,stationId:config.stationId,redirectTo:authRedirectUrl()}});
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
  async function unlockAdminPin(pin){
    if(!client||!session)throw new Error('Shared workspace is still connecting');
    const {data,error}=await client.rpc('unlock_relayops_admin',{candidate_pin:String(pin||''),target_org:config.organizationId});
    if(error)throw error;return Boolean(data);
  }
  async function adminStatus(){
    if(!client||!session)return false;
    const {data,error}=await client.rpc('relayops_admin_status',{target_org:config.organizationId});
    if(error)throw error;return Boolean(data);
  }
  async function lockAdmin(){
    if(!client||!session)return;
    const {error}=await client.rpc('lock_relayops_admin',{target_org:config.organizationId});
    if(error)throw error;
  }
  if(window.addEventListener){
    window.addEventListener('online',()=>{notify({type:'reconnecting'});retryLinkAccess().then(()=>flushPendingOnResume('workspace.online')).catch(error=>notify({type:'link-access-error',error}));});
    window.addEventListener('offline',()=>notify({type:'offline',reason:'browser-offline'}));
    window.addEventListener('focus',()=>{lastActivityAt=Date.now();flushPendingOnResume('workspace.focus').then(()=>pollForUpdates(operationDate())).catch(error=>notify({type:'offline',reason:'focus-refresh-failed',error}));});
  }
  if(typeof document!=='undefined'&&document.addEventListener){
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState!=='visible')return;
      lastActivityAt=Date.now();
      flushPendingOnResume('workspace.visible').then(()=>pollForUpdates(operationDate())).catch(error=>notify({type:'offline',reason:'visibility-refresh-failed',error}));
    });
  }
  window.RelayOpsCloud={configured,init,retryLinkAccess,reclaimStorageForSharedSession,signIn,signOut,accessToken,workspaceContext,currentMembership,load,save,schedule,members,inviteMember,updateMemberAccess,unlockAdminPin,adminStatus,lockAdmin,on(fn){listeners.add(fn);return()=>listeners.delete(fn);},get session(){return session;},get membership(){return membership;},get revision(){return revision;},get persistentRevision(){return persistentRevision;},__test:{sanitizeCloudString,sanitizeCloudValue,compactDailyPayload,preparePayload,reconcilePayload,semanticKey,canonical,sameStoredPayload,payloadByteLength,enforcePayloadBudget,reclaimStorageForSharedSession,withCloudTimeout,pollForUpdates,applyRemoteSnapshot}};
})();
