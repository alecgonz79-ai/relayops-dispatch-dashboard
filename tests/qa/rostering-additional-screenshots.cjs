const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),{createRequire}=require('node:module');
const hp=require.resolve('./rostering-collapsed-screenshot-ocr.cjs');
const prefix=fs.readFileSync(hp,'utf8').split('(async()=>{')[0];
const {c,loadImage,createCanvas}=new Function('require',prefix+';return {c,loadImage,createCanvas};')(createRequire(hp));
c.createImageBitmap=async file=>{const image=await loadImage(file.path);image.close=()=>{};return image;};
const ip=require.resolve('../rostering-import-isolation.cjs');
const load=new Function('require',fs.readFileSync(ip,'utf8').split('function seedOpening(')[0]+';return load;')(createRequire(ip));
(async()=>{
  for(const [name,counts] of [['two',[1,47]],['eight',[1,2,1,35,2,1,2,1]]]){
    c.file={name:name+'.png',type:'image/png',path:require.resolve(`../fixtures/rostering-${name}-services.png`)};
    c.parsed=await vm.runInContext("parseUploadedFile(file,'rostering-screenshot')",c);
    for(const code of ['DJT6','DUR6']){
      const h=load(code);h.context.inputFiles=[{name:c.file.name,parsed:c.parsed}];
      h.run("state.importPurpose='rostering-screenshot';state.page='rostering';notices=[];");
      await h.run('readFiles(inputFiles)');
      assert.deepEqual(h.read("notices.filter(n=>n.type==='error')"),[]);
      const p=h.read('currentRosteringPlan()');
      assert.deepEqual(p.services.map(s=>s.confirmed),counts);
      assert.deepEqual(p.services.map(s=>s.screenshotRostered),counts);
      assert(p.services.every(s=>!/^[vVyY|]+\s*\+/.test(s.name)));
      assert(p.assignments.every(r=>!r.associate),'Collapsed counts cannot invent employee names');
    }
  }
  // Optional original image stays outside source control because it has an employee name.
  let card=process.argv[2];
  if(!card){const canvas=createCanvas(560,118),ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,560,118);ctx.fillStyle='#284558';ctx.font='bold 20px Arial';ctx.fillText('Sample Training Associate',26,54);ctx.font='15px Arial';ctx.fillText('Ride Along · 10:30 AM–7:00 PM',26,78);card=canvas.toBuffer('image/png');}
  for(const purpose of ['schedule','rostering-screenshot']){
    c.file={name:'ride-along.png',type:'image/png',path:card};c.parsed=await vm.runInContext(`parseUploadedFile(file,'${purpose}')`,c);
    c.cardEntries=vm.runInContext("rosteringScheduleCardsFromText(parsed.text,'2026-09-07','DUR9')",c);
    assert.equal(c.cardEntries.length,1);assert.equal(c.cardEntries[0].role,'Ride Along');assert.equal(c.cardEntries[0].start,'10:30 AM');assert.equal(c.cardEntries[0].end,'7:00 PM');
    for(const code of ['DJT6','DUR6']){
      const h=load(code);h.run("storeRosteringScheduleEntries([{name:'Existing Associate',role:'Delivery Associate',date:state.rosteringDate,sourceStation:stationDisplayCode()}],'existing.csv');");
      const opening=h.run('JSON.stringify(state.scheduleEntries)');
      h.context.inputFiles=[{name:'ride-along.png',parsed:c.parsed}];h.context.purpose=purpose;
      h.run("state.importPurpose=purpose;state.scheduleImportDestination='rostering';state.page='rostering';notices=[];");
      await h.run('readFiles(inputFiles)');
      assert.deepEqual(h.read("notices.filter(n=>n.type==='error')"),[]);
      const entries=h.read('rosteringScheduleEntriesForDate()');assert.equal(entries.length,2);
      assert.equal(entries.find(e=>e.role==='Ride Along').sourceStation,code==='DUR6'?'DUR9':'DJT6');
      assert.equal(h.run('JSON.stringify(state.scheduleEntries)'),opening);
      h.run("state.importPurpose=purpose;state.scheduleImportDestination='rostering';");await h.run('readFiles(inputFiles)');
      assert.equal(h.read('rosteringScheduleEntriesForDate()').length,2,'Repeat card must not duplicate driver');
    }
  }
  assert.equal(vm.runInContext("rosteringScheduleCardsFromText('Sample Person\\nRide Along · 29:30 AM-7:00 PM').length",c),0);
  assert.equal(vm.runInContext("rosteringScheduleCardsFromText('DJT6\\nSample Person\\nRide Along · 10:30 AM-7:00 PM').length",c),0,'Do not override report station labels');
  console.log('Actual OCR and imports pass: two/eight service blocks, schedule cards through both pickers, both stations, additive imports, no opening changes.');
})().catch(error=>{console.error(error);process.exitCode=1;});
