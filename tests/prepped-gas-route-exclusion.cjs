const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
const code=source.slice(source.indexOf('function isGasOnlyMorningService('),source.indexOf('function clearMorningVehicleAssignments('));
for(const station of ['DJT6','DUR6']){
 const gas=['Extra Large','Large','Small'].map(size=>({stationCode:station,service:`Standard Parcel - ${size} Van - US`,ev:'',deviceName:'',portable:''}));
 const manual={stationCode:station,service:gas[0].service,ev:'R54',deviceName:'27',portable:'P1'};
 const ev={stationCode:station,service:'Standard Parcel - Electric Van - US',ev:''};
 let targets=[],poolReads=0,toastText='';
 const ctx={morningAssignmentTargets:()=>[...gas,manual,ev],isExplicitHelperMorningRoute:()=>false,dailyFleetHealthLoaded:()=>true,automaticFleetVehiclePool:()=>{poolReads++;return [{key:'EV1'}]},assignAutomaticVehiclePool:rows=>{targets=rows;rows.forEach(row=>row.ev='1')},toast:message=>toastText=message};
 vm.createContext(ctx);vm.runInContext(code,ctx);ctx.assignBagReadyVehicles();
 assert.deepStrictEqual(targets,[ev]);assert.equal(ev.ev,'1');
 assert(gas.every(row=>row.ev===''&&row.deviceName===''&&row.portable===''));
 assert.equal(manual.ev,'R54');assert.equal(manual.deviceName,'27');assert.equal(manual.portable,'P1');
 for(const service of [' standard parcel – LARGE van – us ','Standard Parcel - Small Van - US - Default as station - 10 Hours'])assert(ctx.isGasOnlyMorningService({service}));
 for(const service of ['', 'Standard Parcel', 'Standard Parcel - Electric Van - US', 'Standard Parcel - Large Van - CA'])assert(!ctx.isGasOnlyMorningService({service}));
 ctx.morningAssignmentTargets=()=>gas;poolReads=0;ctx.assignBagReadyVehicles();assert.equal(poolReads,0);assert(toastText.includes('Gas-only routes skipped'));
}
console.log('Gas-only Prepped Vans exclusion passed for DJT6 and DUR6');
