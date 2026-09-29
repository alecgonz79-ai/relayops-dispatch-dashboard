const fs=require('node:fs'),assert=require('node:assert/strict'),{createRequire}=require('node:module');
const hp=require.resolve('./rostering-import-isolation.cjs');
const load=new Function('require',fs.readFileSync(hp,'utf8').split('function seedOpening(')[0]+';return load;')(createRequire(hp));
(async()=>{
 for(const code of ['DJT6','DUR6'])for(const purpose of ['schedule','rostering-screenshot']){
  const h=load(code);
  h.run("storeRosteringScheduleEntries([{name:'Existing Associate',role:'Delivery Associate',date:state.rosteringDate,sourceStation:stationDisplayCode()}],'existing.csv');");
  const opening=h.run('JSON.stringify(state.scheduleEntries)');
  h.context.inputFiles=[{name:'card.png',parsed:{name:'card.png',kind:'image',rows:[],text:'Sample Training Associate\nRide Along · 10:30 AM–7:00 PM'}}];
  h.context.purpose=purpose;
  for(let repeat=0;repeat<2;repeat++){
   h.run("state.importPurpose=purpose;state.scheduleImportDestination='rostering';notices=[];");await h.run('readFiles(inputFiles)');
   assert.deepEqual(h.read("notices.filter(n=>n.type==='error')"),[]);
   const rows=h.read('rosteringScheduleEntriesForDate()');assert.equal(rows.length,2);
   const trainee=rows.find(r=>r.role==='Ride Along');assert.equal(trainee.start,'10:30 AM');assert.equal(trainee.end,'7:00 PM');assert.equal(trainee.sourceStation,code==='DUR6'?'DUR9':'DJT6');
   assert.equal(trainee.date,h.run('state.rosteringDate'));
   assert.equal(h.run('JSON.stringify(state.scheduleEntries)'),opening);
  }
  assert.equal(h.run("rosteringScheduleCardsFromText('Sample Person\\nRide Along · 29:30 AM-7:00 PM').length"),0);
  assert.equal(h.run("rosteringScheduleCardsFromText('DJT6\\nSample Person\\nRide Along · 10:30 AM-7:00 PM').length"),0);
  h.context.fixture='CONFIRMED SERVICES\nV+ SWA Commingled - Electric Rivian Medium - Default as station - 8 Hours 1 Confirmed 1 Rostered\nY + Standard Parcel Electric - Rivian MEDIUM - Default as station - 10 Hours 47 Confirmed 47 Rostered';
  const plan=h.read('rosteringPlanFromScreenshotText(fixture)');assert.deepEqual(plan.services.map(s=>s.confirmed),[1,47]);assert(plan.services[0].name.startsWith('SWA'));assert(plan.services[1].name.startsWith('Standard Parcel'));assert(plan.assignments.every(r=>!r.associate));
 }
 console.log('Roster card imports preserve schedules, date/station ownership and service counts.');
})().catch(e=>{console.error(e);process.exitCode=1;});
