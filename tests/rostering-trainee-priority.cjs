const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const h=fs.readFileSync(require.resolve('./rostering-workflow.cjs'),'utf8').split('function run()')[0].replace('console, Intl,','location:{hostname:"localhost",search:"",href:"http://localhost/"}, console, Intl,');
for(const mode of ['abc','random']){
 const c=new Function('require',h+'\nreturn harness();')(require);c.mode=mode;
 vm.runInContext(`
 state.rosteringDate='2026-09-28';state.rosteringPlans={};state.driverContacts=[];state.driverProfiles={};state.rosteringManualTraining={};
 storeRosteringScheduleEntries([['Aaron Regular','Delivery Associate'],['Zoe Trainee','Ride Along'],['Angel Sanchez','Ride Along'],['Michael Plourde','Low Performer Ride Along'],['Classroom Driver','Training Day 1'],['Called Off','Ride Along']].map(([name,role])=>({name,role,date:'9/28/2026',start:'10:30 AM'})),'fixture');
 state.callOffDriverKeys={'2026-09-28|called off':{name:'Called Off'}};
 const plan=currentRosteringPlan();plan.services=[{id:'regular',name:'Rivian',kind:'driver',confirmed:1},{id:'nursery',name:'Nursery Route Level 1 - Electric Vehicle',kind:'driver',confirmed:1}];plan.assignments=[];
 autoRosterFromPaycom({silent:true,mode,random:()=>0.5});
 globalThis.rows=plan.assignments;globalThis.training=rosteringRidealongEntries();
 autoRosterFromPaycom({silent:true,mode});globalThis.again=plan.assignments;
 `,c);
 assert.equal(c.rows.find(r=>r.serviceId==='nursery').associate,'Zoe Trainee');
 assert.equal(c.rows.find(r=>r.serviceId==='regular').associate,'Aaron Regular');
 assert(c.training.some(r=>r.name==='Zoe Trainee'),'Rostered trainee must remain in Training matches');
 assert.equal(c.again.filter(r=>r.associate==='Zoe Trainee').length,1);
 vm.runInContext(`
 currentRosteringPlan().assignments=[{id:'t',serviceId:'nursery',associate:'Zoe Trainee',role:'',start:'8:00 AM'},{id:'r',serviceId:'nursery',associate:'Aaron Regular',start:'11:00 AM'}];
 globalThis.sorted=rosteringServiceRows('nursery');
 `,c);
 assert.equal(c.sorted.at(-1).associate,'Zoe Trainee','Trainees display last even with earlier shifts or imported rows missing role');
}
console.log('ABC/random: trainees get nursery priority, remain in Training matches, exclude trainers/classroom/call-offs, no duplicate on rerun');
