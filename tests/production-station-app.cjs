const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {createRequire} = require('node:module');

// Reuse the DOM-only app harness; this does not start a browser or hit cloud.
const harnessPath=require.resolve('./multi-station-local-preview.cjs');
const harnessSource=fs.readFileSync(harnessPath,'utf8').split('async function main()')[0];
const {browserHarness,appSource}=new Function('require',`${harnessSource}\nreturn {browserHarness,appSource};`)(createRequire(harnessPath));

function load(code='DUR6',{seed={},error=''}={}) {
  const h=browserHarness({hostname:'alecgonz79-ai.github.io',search:`?station=${code}&page=morning`,seed});
  const native=h.context.localStorage;
  const key=name=>code==='DUR6'?`relayops_station_DUR6_${name}`:name;
  const storage=error?{getItem:()=>null,setItem(){},removeItem(){}}:{
    getItem:name=>native.getItem(key(name)),setItem:(name,value)=>native.setItem(key(name),value),removeItem:name=>native.removeItem(key(name))
  };
  h.context.window.RelayOpsStation=Object.freeze({enabled:true,preview:false,code:error?'':code,stationId:error?'':`${code}-uuid`,storage,error});
  h.context.location.assign=url=>{h.assigned=url;};
  vm.createContext(h.context);vm.runInContext(appSource,h.context,{filename:'app.js'});
  h.run=source=>vm.runInContext(source,h.context);
  h.run('globalThis.notices=[];toast=(message)=>notices.push(message);');
  return h;
}

(async()=>{
  const djt6Route={dsp:'LLOL',driver:'DJT6 Driver',route:'CX123',wave:'11:15 AM',stationCode:'DJT6'};
  const legacy={relayops_station_code:'DJT6',relayops_morning:JSON.stringify([djt6Route]),relayops_driver_contacts:JSON.stringify([{name:'DJT6 Driver'}]),relayops_morning_sheets_endpoint:'https://script.google.com/macros/s/djt6-only/exec',relayops_equipment_import:JSON.stringify({details:{EV1:{device:'101',portable:'A'}}})};
  const dur6=load('DUR6',{seed:legacy});
  assert.equal(dur6.run('MULTI_STATION_ENABLED'),true);assert.equal(dur6.run('MULTI_STATION_PREVIEW'),false);
  assert.equal(dur6.run('state.stationCode'),'DUR6');assert.equal(dur6.run('activeMorningWaveCount()'),3);
  for(const expression of ['state.morningRoutes.length','state.driverContacts.length','rivianFleet.length','state.vanParking.length','state.inventoryItems.length'])assert.equal(dur6.run(expression),0,expression);
  assert.equal(dur6.run('state.equipmentImport'),null);assert.equal(dur6.run('state.morningSheetsEndpoint'),'');
  assert(dur6.run('sidebarStationSelectorHtml()').indexOf('data-station="DJT6"')<dur6.run('sidebarStationSelectorHtml()').indexOf('data-station="DUR6"'));
  assert(dur6.run('stationWorkspaceTabs()').includes('Separate shared workspace'));
  assert(dur6.run('livePage()').includes('DUR6 Device &amp; Portable Sheet'));
  assert(dur6.run('sharedDashboardUrl()').includes('station=DUR6'));
  assert.equal(dur6.run('hasOwnerAdminAccess()'),false,'Production retains Admin PIN');
  assert.throws(()=>dur6.run("state.stationCode='DJT6'"),/cannot change/);
  for(const method of ['applySharedWorkspaceState','applyPersistentWorkspaceState'])assert.throws(()=>dur6.run(`${method}({stationCode:'DJT6',morningSheetsEndpoint:'bad',routes:[{route:'WRONG'}]})`),/Blocked DJT6/);
  assert.throws(()=>dur6.run("applySharedWorkspaceState({stationCode:'DUR6',morningRoutes:[{stationCode:'DJT6'}]})"),/another station/);
  dur6.run("state.openingPicklistNotes='DUR6 only';persist()");
  assert(dur6.writes.every(name=>name.startsWith('relayops_station_DUR6_')));
  for(const [name,value] of Object.entries(legacy))assert.equal(dur6.storage.get(name),value,`Unchanged DJT6 cache ${name}`);
  const before=dur6.fetches.length;
  await assert.rejects(dur6.run("postMorningSheetsPayload('https://example.invalid',{})"),/separate Google confirmation/);
  assert.equal(await dur6.run('sendRtsTimesToGoogleSheets()'),false);assert.equal(await dur6.run('sendWhiparoundChecksToGoogleSheets()'),false);
  assert.equal(dur6.fetches.length,before,'DUR6 never uses DJT6 anonymous POST path');

  const home=load('DJT6',{seed:legacy});
  assert.equal(home.run('state.morningRoutes[0].driver'),'DJT6 Driver');assert.equal(home.run('state.morningSheetsEndpoint'),legacy.relayops_morning_sheets_endpoint);assert.equal(home.run('activeMorningWaveCount()'),6);
  home.run("state.openingPicklistNotes='DJT6 only';persist()");assert.equal(home.storage.get('relayops_opening_picklist_notes'),'DJT6 only');

  const broken=load('UNKNOWN',{error:'Unknown station configuration'});
  assert(broken.context.document.getElementById('app').innerHTML.includes('Station setup needs attention'));
  assert(!broken.context.document.getElementById('app').innerHTML.includes('data-action="import"'));
  assert.throws(()=>broken.run('applySharedWorkspaceState({})'),/Unknown station/);

  const missing=browserHarness({hostname:'alecgonz79-ai.github.io',search:'?station=DUR6',seed:legacy});
  missing.context.window.RELAYOPS_CLOUD_CONFIG={multiStationEnabled:true};
  vm.createContext(missing.context);vm.runInContext(appSource,missing.context);
  assert(missing.context.document.getElementById('app').innerHTML.includes('Station selection could not load'));
  assert.equal(missing.reads.length,0,'Missing station runtime cannot read DJT6 caches');
  vm.runInContext('persist()',missing.context);assert.equal(missing.writes.length,0,'Missing runtime cannot write legacy storage');

  const filePreview=browserHarness({hostname:'localhost',search:'?multiStationPreview=1&station=DUR6',seed:legacy});
  Object.assign(filePreview.context.location,{hostname:'',protocol:'file:',origin:'null',href:'file:///preview/index.html?multiStationPreview=1&station=DUR6',pathname:'/preview/index.html'});
  filePreview.context.window.RelayOpsStation={enabled:true,preview:true,code:'DUR6',stationId:'',storage:filePreview.context.localStorage,error:''};
  vm.createContext(filePreview.context);vm.runInContext(appSource,filePreview.context);
  assert.equal(vm.runInContext('MULTI_STATION_PREVIEW',filePreview.context),true,'App agrees with runtime on file preview');
  vm.runInContext('persist()',filePreview.context);
  assert(filePreview.writes.every(name=>name==='relayops_multistation_preview_v1'),'Explicit file preview only writes its prototype snapshot');
  for(const [name,value]of Object.entries(legacy))assert.equal(filePreview.storage.get(name),value);

  let flushes=0;
  dur6.context.window.RelayOpsCloud={prepareStationSwitch:async()=>{flushes++;return {ok:false,error:'Pending save'};}};
  assert.equal(await dur6.run("switchOpeningStation('DJT6')"),false);assert.equal(dur6.assigned,undefined);assert.equal(flushes,1);
  dur6.run("state.importReadingFiles=['DUR6 upload.xlsx']");await dur6.run("switchOpeningStation('DJT6')");assert.equal(flushes,1,'Active import prevents station switch');dur6.run('state.importReadingFiles=[]');
  dur6.context.window.RelayOpsCloud.prepareStationSwitch=async()=>({ok:true});
  assert.equal(await dur6.run("switchOpeningStation('DJT6')"),true);
  const target=new URL(dur6.assigned);assert.equal(target.searchParams.get('station'),'DJT6');assert.equal(target.searchParams.get('page'),'morning');assert(target.searchParams.get('date'));assert.equal(target.searchParams.has('multiStationPreview'),false);
  assert.equal(dur6.run('activeMorningStationCode()'),'DUR6','Current JS context remains immutable until navigation');
  console.log('Production station app isolation, immutable identity, safe switch, and Google routing tests passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
