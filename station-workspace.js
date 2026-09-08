(function(){
  'use strict';
  // Resolve the station exactly once, before app.js or cloud-sync.js captures
  // storage, revisions, or asynchronous work. A switch requires a new page.
  const original=window.RELAYOPS_CLOUD_CONFIG||{};
  const codes=Object.freeze(['DJT6','DUR6']);
  const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  let params,preview=false,code='',stationId='',error='';
  try{
    params=new URLSearchParams(location.search||'');
    const host=String(location.hostname||'').toLowerCase();
    const local=location.protocol==='file:'||['localhost','127.0.0.1','::1','[::1]'].includes(host);
    preview=local&&params.get('multiStationPreview')==='1';
    const requested=params.has('station')?String(params.get('station')).trim().toUpperCase():'DJT6';
    if(!codes.includes(requested)||params.getAll('station').length>1)throw new Error('Unknown station link. Open the dashboard using DJT6 or DUR6. No shared data has been loaded.');
    code=requested;
  }catch(problem){error=problem.message||'The station link could not be read safely.';}
  const enabled=preview||original.multiStationEnabled===true;
  const stations=Object.freeze(Object.fromEntries(codes.map(name=>[name,Object.freeze({...original.stations?.[name]})])));
  if(!error&&!preview){
    if(enabled){
      const first=String(stations.DJT6.stationId||''),second=String(stations.DUR6.stationId||'');
      if(!uuid.test(first)||!uuid.test(second)||first.toLowerCase()===second.toLowerCase())error='Station setup is incomplete. Shared operations are paused to prevent mixing DJT6 and DUR6.';
      else stationId=String(stations[code].stationId);
    }else if(code!=='DJT6')error='DUR6 is not enabled in this dashboard version. No DJT6 data has been opened.';
    else stationId=String(original.stationId||'');
  }
  // Opening an exported file must never connect to the production database.
  const fileOnly=String(location.protocol||'')==='file:';
  if(fileOnly&&!preview&&!error)error='Open the hosted dashboard, or use the explicit local preview, before loading a station.';
  if(error){code='';stationId='';}
  let nativeStorage=null;
  try{nativeStorage=window.localStorage||globalThis.localStorage||null;}catch{}
  const namespace=!preview&&code==='DUR6'?'relayops_station_DUR6:':'';
  const isStationNamespace=key=>String(key).startsWith('relayops_station_');
  const nativeKey=key=>{
    key=String(key);
    if(isStationNamespace(key))return null;
    if(key.startsWith('relayops_cloud_queue:')&&!key.startsWith(`relayops_cloud_queue:${stationId}:`))return null;
    return namespace&&key.startsWith('relayops_')?namespace+key:key;
  };
  function visibleKeys(){
    if(error||!nativeStorage)return [];
    const result=[];
    for(let index=0;index<nativeStorage.length;index++){
      const key=nativeStorage.key(index);if(key===null)continue;
      if(preview){result.push(key);continue;}
      if(key.startsWith('relayops_cloud_queue:')&&!key.startsWith(`relayops_cloud_queue:${stationId}:`))continue;
      if(namespace&&key.startsWith(namespace+'relayops_'))result.push(key.slice(namespace.length));
      else if(!isStationNamespace(key)&&(!namespace||!key.startsWith('relayops_')))result.push(key);
    }
    return result;
  }
  const storage=preview&&!error&&nativeStorage?nativeStorage:Object.freeze({
    get length(){return visibleKeys().length;},
    key(index){return visibleKeys()[Number(index)]??null;},
    getItem(key){const mapped=nativeKey(key);return error||mapped===null?null:nativeStorage?.getItem(mapped)??null;},
    setItem(key,value){const mapped=nativeKey(key);if(!error&&mapped!==null)nativeStorage?.setItem(mapped,String(value));},
    removeItem(key){const mapped=nativeKey(key);if(!error&&mapped!==null)nativeStorage?.removeItem(mapped);},
    clear(){
      // Clearing station data must not sign out other stations or erase them.
      visibleKeys().filter(key=>key.startsWith('relayops_')).forEach(key=>this.removeItem(key));
    }
  });
  const config=Object.freeze({...original,stations,stationId:preview||error?'':stationId});
  window.RELAYOPS_CLOUD_CONFIG=config;
  window.RelayOpsStation=Object.freeze({enabled,preview,code,stationId:preview?'':stationId,storage,error});
})();
