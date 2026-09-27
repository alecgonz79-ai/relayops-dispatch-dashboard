const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),{createRequire}=require('module');
const harnessPath=require.resolve('./rostering-workflow.cjs');
const prefix=fs.readFileSync(harnessPath,'utf8').split('function run()')[0].replace('console, Intl,','location: {hostname: "example.test", search: "", href: "https://example.test/"}, URLSearchParams, console, Intl,');
const harness=new Function('require',prefix+'\nreturn harness;')(createRequire(harnessPath));
const c=harness();
const names=[
  'Standard Parcel - On-Road Experience: Driver - Default as station - 10 Hours',
  'Nursery Route Level 1 - Electric Vehicle - Default as station - 10 Hours',
  'Standard Parcel - On-Road Experience: Rider - Default as station - 10 Hours',
  'Standard Parcel Electric - Rivian MEDIUM - Default as station - 10 Hours',
  'DSP Initiated Work (Standard Vehicle) - Default as station - 10 Hours',
  'Nursery Route Level 3 - Electric Vehicle - Default as station - 9 Hours',
  'Standard Parcel Electric - Rivian MEDIUM - Recycle - Default as station - 10 Hours',
  'Nursery Route Level 2 - Electric Vehicle - Default as station - 10 Hours',
  'SWA Commingled - Electric Rivian Medium - Default as station - 8 Hours',
  'Standard Parcel - Extra Large Van - AMZ Donations - Default as station - 10 Hours',
  'Standard Parcel Electric - Rivian MEDIUM with Helper - Default as station - 10 Hours',
  'Standard Parcel Electric - Rivian MEDIUM with Helper: Helper - Default as station - 10 Hours',
  'Standard Parcel - Extra Large Van - US - Default as station - 10 Hours'
];
const counts=[1,2,1,35,2,1,2,1,1,2,8,8,3];
for(const split of [false,true]){
  c.fixture='CONFIRMED SERVICES\n'+names.map((name,i)=>`● + ${name}${split?'\nConfirmed\n'+counts[i]+'\nRostered\n0':' '+counts[i]+' Confirmed 0 Rostered'}`).join('\n');
  vm.runInContext('globalThis.plan=rosteringPlanFromScreenshotText(fixture,"blocks.png")',c);
  const p=c.plan;
  assert.equal(p.services.length,names.length);
  assert.equal(new Set(p.services.map(s=>s.id)).size,names.length,'distinct blocks must not merge');
  p.services.forEach((s,i)=>{
    assert.equal(s.name,names[i]);assert.equal(s.confirmed,counts[i]);assert.equal(s.screenshotRostered,0);
    assert.equal(s.kind,i===11?'helper':'driver');
    assert.equal(p.assignments.filter(r=>r.serviceId===s.id).length,counts[i]);
  });
  assert(p.assignments.every(r=>!r.associate),'collapsed blocks must not invent driver names');
}
console.log('All supplied screenshot block types preserve names, counts, separate identities and helper roles');

