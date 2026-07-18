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
    state.role='admin';
    window.RelayOpsCloud={configured:true,session:{user:{id:'owner-1'}},updateMemberAccess:async()=>({})};
    state.cloudMembers=[
      {user_id:'owner-1',display_name:'Owner',role:'owner',active:true},
      {user_id:'dispatcher-2',display_name:'Dispatcher Two',role:'dispatcher',active:true}
    ];
    globalThis.__admin=adminPage();
    openMemberAccess('dispatcher-2');globalThis.__memberModal=modal();
  `,context);
  assert(context.__admin.includes('Fixed role policy')&&context.__admin.includes('permission-mark allowed')&&!context.__admin.includes('class="switch'),'Admin must render a fixed policy matrix without inert switches');
  assert(context.__admin.includes('ADP Workforce')&&context.__admin.includes('Not available')&&!context.__admin.includes('>Connect<'),'ADP must be shown as unavailable rather than clickable');
  assert(context.__admin.includes('Owner access locked')&&context.__admin.includes('data-action="edit-member-access"'),'Admin member rows must lock owners and allow editing non-owners');
  assert(context.__memberModal.includes('member-access-role')&&context.__memberModal.includes('member-access-active')&&context.__memberModal.includes('save-member-access'),'Member access modal must expose working role and active controls');
}

function testCloudPolicyContracts(){
  const cloud=fs.readFileSync(require.resolve('../cloud-sync.js'),'utf8'),schema=fs.readFileSync(require.resolve('../supabase/schema.sql'),'utf8'),migration=fs.readFileSync(require.resolve('../supabase/migrations/20260714_owner_member_access.sql'),'utf8'),invite=fs.readFileSync(require.resolve('../supabase/functions/invite-user/index.ts'),'utf8');
  assert(cloud.includes('async function updateMemberAccess')&&cloud.includes(".neq('role','owner')")&&cloud.includes('updateMemberAccess,on('),'Cloud bridge must expose an owner-safe member role/active update');
  assert(schema.includes('membership_owner_update')&&schema.includes("array['owner']::relayops_role[]")&&!schema.includes('create policy membership_admin'),'Fresh schema must enforce owner-only membership updates');
  assert(migration.includes('drop policy if exists membership_admin')&&migration.includes('membership_owner_update'),'Existing projects must have an owner-only RLS migration');
  assert(invite.includes("membership.role!=='owner'")&&!invite.includes("['owner','ops_manager'].includes(membership.role)"),'Invite function must require owner access');
}

testCoachingWorkflow();
testAdminWorkflow();
testCloudPolicyContracts();
console.log('Admin role policy/member controls and shared Coaching workflow tests passed');
