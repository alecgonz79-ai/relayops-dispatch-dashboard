const fs=require('fs');
const vm=require('vm');

const source=fs.readFileSync('cloud-sync.js','utf8');
if(!source.includes('function pollForUpdates(')||!source.includes('CLOUD_POLL_MS'))throw new Error('Shared updates must use the low-pressure background poller');
if(source.includes(".on('postgres_changes'")||source.includes(".on('presence'"))throw new Error('Nano compute must not reopen CPU-heavy Realtime replication or presence channels');
if(!source.includes("pending.shared")||!source.includes("pending.userId!==session.user.id"))throw new Error('Device-local stale queues must not merge into another dispatcher session');
if(!source.includes("from('station_memberships')"))throw new Error('Dispatcher station access must be checked before loading shared snapshots');
if(!source.includes('function canInitialize(){return canWrite();}'))throw new Error('An automatic shared-link dispatcher must be able to initialize a missing shared day');
if(!source.includes('signInAnonymously')||!source.includes('relayops_link_access:true'))throw new Error('Shared-link browsers must create their restricted Supabase session automatically');

const app=fs.readFileSync('app.js','utf8');
if(!app.includes('morningOperationDate: requestedOperationDate()'))throw new Error('A stale device-local date can still choose the workspace');
if(!app.includes("url.searchParams.set('date',state.morningOperationDate)"))throw new Error('Changing operation dates must keep the dated shared URL in sync');
if(!app.includes('everyone opens the same shared day automatically'))throw new Error('Share link must explain that the dated workspace opens automatically for everyone with the link');

console.log('Cloud shared-workspace access/date/polling guard tests passed');
