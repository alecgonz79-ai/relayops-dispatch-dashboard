const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const h=fs.readFileSync(require.resolve('./rostering-workflow.cjs'),'utf8').split('function run()')[0].replace('console, Intl,','location:{hostname:"localhost",search:"",href:"http://localhost/"}, console, Intl,');
const c=new Function('require',h+'\nreturn harness();')(require);
c.report=process.argv[2]?fs.readFileSync(process.argv[2],'utf8'):'';
vm.runInContext(`
const fixture=[['Employee','Tue Sep 29'],['DJT6-Delivery Associate',''],['Test, Home','Delivery Associate\\n10:30 AM - 07:00 PM'],['DUR9 Delivery Associates',''],['Test, Away','Delivery Associate\\n10:30 AM - 07:00 PM']];
globalThis.parsed=scheduleEntriesFromRows(fixture,{fileName:'ReportClass-20260928103703.xls'});
globalThis.home=parsed.filter(scheduleEntryMatchesStation);
globalThis.aliasCode=paycomStationCode('DUR6 Delivery Associates');
activeOpeningStationCode='DUR6';globalThis.away=parsed.filter(scheduleEntryMatchesStation);
globalThis.label=stationDisplayCode();
activeOpeningStationCode='DJT6';
if(report){const actual=scheduleEntriesFromRows(htmlTableRows(report),{fileName:'ReportClass-20260928103703.xls'});globalThis.counts=actual.reduce((a,e)=>(a[e.sourceStation||'unknown']=(a[e.sourceStation||'unknown']||0)+1,a),{});globalThis.actualHome=actual.filter(scheduleEntryMatchesStation).every(e=>e.sourceStation==='DJT6');}
state.rosteringDate='2026-09-29';state.rosteringPlans={};state.driverContacts=[];
storeRosteringScheduleEntries([{name:'Test Trainee',role:'Ride Along',date:'2026-09-29',sourceStation:'DJT6'}]);
const plan=currentRosteringPlan();plan.services=[{id:'swa',name:'SWA Commingled - Electric Rivian Medium',kind:'driver',confirmed:1},{id:'nursery',name:'Nursery Route Level 1 - Electric Vehicle',kind:'driver',confirmed:1}];plan.assignments=[];
globalThis.result=autoRosterFromPaycom({silent:true});globalThis.assigned=plan.assignments.filter(r=>r.associate).length;
`,c);
assert.equal(c.home.length,1);assert.equal(c.home[0].sourceStation,'DJT6');
assert.equal(c.away.length,1);assert.equal(c.away[0].sourceStation,'DUR9');assert.equal(c.label,'DUR9');
assert.equal(c.aliasCode,'DUR9');
assert.equal(c.assigned,0);assert.equal(c.result.remaining,1);
if(c.report){assert(c.actualHome);assert(c.counts.DJT6>0&&c.counts.DUR9>0);assert(!c.counts.unknown);console.log('Attached report shift counts:',c.counts);}
console.log('Station headings isolated; DUR9 alias preserved; no non-Rivian trainee fallback.');
vm.runInContext(`
activeOpeningStationCode='DUR6';state.rosteringPlans={};state.rosteringDate='2026-09-29';
const mixed=[
 {name:'Away Dispatcher',role:'Opening Dispatcher',sourceStation:'DUR9'},
 {name:'Home Dispatcher',role:'Opening Dispatcher',sourceStation:'DJT6'},
 {name:'Unlabeled Dispatcher',role:'Opening Dispatcher'},
 {name:'Named Dispatcher',role:'DUR9 Closing Dispatcher'},
 {name:'Conflicting Dispatcher',role:'DJT6 Midshift',sourceStation:'DUR9'},
 {name:'Unlabeled Driver',role:'Delivery Associate'},
 {name:'Away Driver',role:'Delivery Associate',sourceStation:'DUR9'}
].map(entry=>({...entry,date:'2026-09-29'}));
storeRosteringScheduleEntries(mixed,'mixed-stations');
globalThis.strictNames=rosteringScheduleEntriesForDate().map(e=>e.name);
globalThis.storedCount=currentRosteringPlan().paycomEntries.length;
currentRosteringPlan().paycomEntries.push(mixed[2]);
globalThis.visibleCount=rosteringScheduleEntriesForDate().length;
`,c);
assert.deepEqual(Array.from(c.strictNames),['Away Dispatcher','Named Dispatcher','Away Driver']);
assert.equal(c.storedCount,3);assert.equal(c.visibleCount,3);
console.log('DUR9 rostering excludes foreign, conflicting and unlabeled shifts, including dispatchers.');
vm.runInContext(`
activeOpeningStationCode='DJT6';state.rosteringPlans={};state.rosteringDate='2026-09-29';
storeRosteringScheduleEntries(mixed,'mixed-stations');
globalThis.djt6StrictNames=rosteringScheduleEntriesForDate().map(e=>e.name);
`,c);
assert.deepEqual(Array.from(c.djt6StrictNames),['Home Dispatcher','Unlabeled Dispatcher','Unlabeled Driver']);
console.log('DJT6 rejects foreign and conflicting shifts while retaining its legacy unlabeled import support.');
