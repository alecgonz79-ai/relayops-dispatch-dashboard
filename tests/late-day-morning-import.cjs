const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
// Reuse the existing browserless application harness, without its test scenario.
const harness=fs.readFileSync(path.join(__dirname,'routes-djt6-six-wave-import.cjs'),'utf8').split('vm.runInContext(`')[0];
const outer={require,console,__dirname,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout};vm.createContext(outer);
vm.runInContext(harness+'\nglobalThis.testContext=context;',outer);
const c=outer.testContext;
const run=code=>vm.runInContext(code,c);
run(`render=()=>{};renderLightweightModal=()=>{};persist=()=>{};toast=(message)=>globalThis.lastToast=message;yieldMorningImportPaint=async()=>{};state.dspCode='LLOL';state.organizationName='Legacy Logistics';state.morningOperationDate='2026-10-03';state.importPurpose='morning';state.modal='import';parseUploadedFile=async(file)=>file;`);
const headers=['Route code','DSP','Transporter Id','Driver name','Route progress','Delivery Service Type','Route Duration','All stops','Stops complete','not started stops','total deliveries','total pickups','On-road pickups','Time windows','Planned Departure Time'];
const route=(id,driver,dsp='LLOL')=>[id,dsp,'ID',driver,'ON_TIME','Standard Parcel',400,100,50,50,200,0,0,0,'11:20am'];
const plan={name:'DOOP LLOL 10.3.xlsx',rows:[['LLOL','CX115','Standard Parcel Electric - Rivian MEDIUM with Helper','10:55 AM','STG.O.7',522,27,424,157],['LLOL','CX116','Nursery Route Level 1 - Electric Vehicle','10:55 AM','STG.O.8',440,14,261,48]]};
async function load(station,files){
  c.files=files;c.station=station;
  run(`activeOpeningStationCode=station;resetMorningImportBatch();state.importedFile=null;state.importPurpose='morning';state.modal='import';`);
  await run('readFiles(files)');
}
(async()=>{
  for(const station of ['DJT6','DUR6']){
    const label=station==='DUR6'?'DUR9':station;
    const routes={name:`Routes_${label}_2026-10-03.xlsx`,rows:[headers,route('CX115','Original Driver'),route('CX116','Trainee'),route('AX25','Adhoc Driver'),route('AX26','Other DSP','OTHER')]};
    run(`state.morningRoutes=[];state.routes=[];state.morningWaveTimeOverrides={};`);
    await load(station,[plan,routes]);
    assert.equal(run('state.importedFile.kind'),'plan');
    assert.equal(run('importPreflight().included'),3);
    assert.equal(run('importPreflight().ready'),true);
    run('applyImport()');
    assert.equal(run('state.morningRoutes.length'),3);
    run(`state.driverNameAliases={'original driver':{canonical:'Original Driver',display:'Orig',aliases:['Original Driver','Orig']}};invalidateDriverDirectoryCaches();`);
    assert.equal(run(`routeDriverDisplayValue(state.morningRoutes.find(r=>r.route==='CX115'))`),'Original Driver','imported full name overrides nickname on sheets');
    assert.equal(run(`routeDriverDisplayValue({driver:'Original Driver + Very Long Helper Full Name',service:'Helper'})`),'Original Driver + Very Long Helper Full Name','long helper names are not shortened');
    assert.equal(run(`morningSections(state.morningRoutes).find(s=>s.label.includes('ADHOC')).rows[0].route`),'AX25');
    assert.equal(run(`state.routes.find(r=>r.route==='AX25').progress`),50);
    run(`Object.assign(state.morningRoutes[0],{driver:'Dispatcher Swap',ev:'62',deviceName:'9',portable:'P',preDvic:true,endTime:'5:00 PM',padOverride:'PAD-A'});state.morningRoutes.push({route:'AX99',wave:'ADHOC',driver:'Manual',stationCode:station});`);
    await load(station,[plan,routes]);run('applyImport()');
    assert.equal(run('state.morningRoutes.length'),4,'repeat import retains manual route without duplicates');
    assert.equal(run('state.morningRoutes[0].driver'),'Dispatcher Swap');
    for(const [key,value] of Object.entries({ev:'62',deviceName:'9',portable:'P',preDvic:true,endTime:'5:00 PM',padOverride:'PAD-A'}))assert.equal(run(`state.morningRoutes[0][${JSON.stringify(key)}]`),value);
    run(`state.morningRoutes=[];state.routes=[];`);await load(station,[routes]);run('applyImport()');
    assert.equal(run('state.morningRoutes.length'),3,'routes-only later-day start works');
    assert(run('state.morningRoutes.every(r=>r.stationCode===station)'));
    const wrong={...routes,name:`Routes_${station==='DJT6'?'DUR9':'DJT6'}_2026-10-03.xlsx`};
    await load(station,[wrong]);assert.equal(run('state.importedFile'),null,'reject cross-station file');
    await load(station,[{...routes,name:`Routes_${label}_2026-10-02.xlsx`}]);assert.equal(run('state.importedFile'),null,'reject cross-date file');
    await load(station,[routes,{name:'unknown.xlsx',rows:[['bad'],['data']]}]);assert.equal(run('state.importedFile'),null,'unknown attachment cannot silently pass');
  }
  const planPath=path.join(require('os').homedir(),'Downloads','DOOP LLOL 10.3.xlsx');
  const routesPath=path.join(require('os').homedir(),'Downloads','Routes_DJT6_2026-10-03_15_07 (PDT).xlsx');
  if(fs.existsSync(planPath)&&fs.existsSync(routesPath)){
    const worker={console,JSZip:require('../vendor/jszip.min.js'),TextDecoder,importScripts(){},self:{addEventListener(){}}};vm.createContext(worker);
    vm.runInContext(fs.readFileSync(path.join(__dirname,'../morning-import-worker.js'),'utf8'),worker);
    const files=[];
    for(const file of [planPath,routesPath]){const bytes=fs.readFileSync(file);worker.bytes=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);files.push({name:path.basename(file),rows:await vm.runInContext('parseXlsx(bytes)',worker)});}
    run('state.morningRoutes=[];state.routes=[];');await load('DJT6',files);run('applyImport()');
    assert.equal(run('state.morningRoutes.filter(isCxMorningRoute).length'),36);
    assert.equal(run('state.morningRoutes.filter(isExplicitAdhocMorningRoute).length'),9);
    assert.equal(run(`state.morningRoutes.find(r=>r.route==='CX115').staging`),'STG.O.7');
    console.log('Exact October 3 production files: 36 CX + 9 AX routes, first Slack row retained');
  }
  console.log('Late-day import: headerless plan, AX, routes-only, repeat preservation, station/date isolation passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
