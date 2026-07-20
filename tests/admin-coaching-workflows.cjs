const fs=require('fs');
const vm=require('vm');
const JSZip=require('../vendor/jszip.min.js');

function assert(condition,message){if(!condition)throw new Error(message);}
function harness(){
  const app={innerHTML:''},storage=new Map(),fileInput={addEventListener(){},click(){},files:[],accept:''};
  const element=()=>({addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},dataset:{},style:{},setAttribute(){},getAttribute(){return null;},focus(){},blur(){},click(){},querySelector(){return null;},querySelectorAll(){return[];}});
  const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,JSZip,navigator:{clipboard:{writeText:async()=>true}},location:{href:'https://relayops.test/'},window:{scrollTo(){},open(){},print(){},addEventListener(){},RelayOpsCloud:null},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},document:{body:{appendChild(){}},activeElement:null,getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,querySelector(){return null;},querySelectorAll(){return[];},createElement:element,addEventListener(){},removeEventListener(){},execCommand(){return true;}}};
  context.window.document=context.document;vm.createContext(context);vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});vm.runInContext('toast=()=>{};render=()=>{};',context);return{context,storage};
}

function testCoachingWorkflow(){
  const {context,storage}=harness();
  vm.runInContext(`
    state.driverContacts=[
      {name:'Andre Wilson',key:'andre wilson'},
      {name:'Nina Patel',key:'nina patel'},
      {name:'Jordan Lee',key:'jordan lee'}
    ];
    state.coachingQueue=[];queueDueCoaching();
    globalThis.__queued=state.coachingQueue.map(item=>({...item}));
    globalThis.__shared=sharedWorkspaceState();
    openCoachingReview('andre-wilson-following-distance');globalThis.__reviewModal=modal();
    const record=ensureCoachingRecord('andre-wilson-following-distance');record.notes='Reviewed safe following distance';record.status='reviewed';
    globalThis.__message=coachingMessage(coachingOpportunityById(record.id),record);
    state.coachingTemplate='Hello {first}: {focus}. {notes}';persist();
    globalThis.__templateStored=localStorage.getItem('relayops_coaching_template');
  `,context);
  assert(context.__queued.length===3&&context.__queued.every(item=>item.status==='draft'),'Due coaching must enter a real draft review queue');
  assert(context.__shared.coachingQueue.length===3&&context.__shared.coachingTemplate,'Coaching queue/template must be included in shared workspace state');
  assert(context.__reviewModal.includes('role="dialog"')&&context.__reviewModal.includes('Copy reviewed message')&&context.__reviewModal.includes('Automatic sending is unavailable'),'Coaching review must be accessible and honest about external delivery');
  assert(context.__message.includes('Andre')&&context.__message.includes('Following distance')&&context.__message.includes('Reviewed safe following distance'),'Coaching template tokens did not render the reviewed message');
  assert(context.__templateStored==='Hello {first}: {focus}. {notes}','Shared coaching template did not persist locally');
}

function testAdminWorkflow(){
  const {context}=harness();
  vm.runInContext(`
    state.adminPinUnlocked=true;
    window.RelayOpsCloud={configured:true,session:{user:{id:'link-1',is_anonymous:true}}};
    globalThis.__admin=adminPage();
    state.adminPinUnlocked=false;state.modal='admin-pin';globalThis.__pinModal=modal();
    globalThis.__lockedAdmin=adminPage();
  `,context);
  assert(context.__admin.includes('Shared-link access')&&context.__admin.includes('Automatic link session')&&context.__admin.includes('Admin protection'),'Unlocked Admin must explain automatic shared access and PIN protection');
  assert(context.__admin.includes('data-action="lock-admin"')&&!context.__admin.includes('Invite user')&&!context.__admin.includes('Dispatcher sign in'),'Admin must expose a lock control without the retired email-member workflow');
  assert(context.__pinModal.includes('id="admin-pin-input"')&&context.__pinModal.includes('Server-verified PIN')&&context.__pinModal.includes('data-action="unlock-admin"'),'Locked Admin must use the server-verified PIN dialog');
  assert(context.__lockedAdmin.includes('Admin PIN required')&&context.__lockedAdmin.includes('data-action="open-admin-pin"'),'Admin content must stay gated until the PIN is unlocked');
}

function testCloudPolicyContracts(){
  const cloud=fs.readFileSync(require.resolve('../cloud-sync.js'),'utf8'),migration=fs.readFileSync(require.resolve('../supabase/migrations/20260720_link_access_admin_pin.sql'),'utf8'),app=fs.readFileSync(require.resolve('../app.js'),'utf8');
  assert(cloud.includes('signInAnonymously')&&cloud.includes('relayops_link_access:true'),'Cloud bridge must automatically create a restricted shared-link session');
  assert(cloud.includes("client.rpc('unlock_relayops_admin'")&&cloud.includes("client.rpc('relayops_admin_status'")&&cloud.includes("client.rpc('lock_relayops_admin'"),'Cloud bridge must expose the server-backed Admin PIN lifecycle');
  assert(migration.includes('new.is_anonymous')&&migration.includes('relayops_provision_link_user')&&migration.includes("'dispatcher','Shared link dispatcher',true"),'Anonymous users must be provisioned into the station as dispatchers');
  assert(migration.includes('crypt(candidate_pin,access_row.admin_pin_hash)')&&migration.includes("interval '15 minutes'")&&migration.includes("interval '8 hours'"),'Admin PIN verification must be hashed, rate-limited, and time-bound');
  assert(!app.includes('"6969"')&&!app.includes("'6969'"),'The Admin PIN must not be embedded in public application JavaScript');
}

testCoachingWorkflow();
testAdminWorkflow();
testCloudPolicyContracts();
console.log('Shared-link Admin PIN and shared Coaching workflow tests passed');
