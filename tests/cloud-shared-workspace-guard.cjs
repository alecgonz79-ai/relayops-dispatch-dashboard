const fs=require('fs');
const vm=require('vm');

const source=fs.readFileSync('cloud-sync.js','utf8');
if(!source.includes('function pollForUpdates(')||!source.includes('CLOUD_POLL_MS'))throw new Error('Shared updates must use the low-pressure background poller');
if(!source.includes("select('revision,updated_at,updated_by,operation_date')")||!source.includes('CLOUD_PERSISTENT_POLL_MS'))throw new Error('Shared polling must check lightweight revisions before downloading JSON snapshots');
if(!source.includes('dailyChanged=!sameStoredPayload')||!source.includes('persistentChanged=!sameStoredPayload'))throw new Error('Cloud saves must skip unchanged daily or persistent snapshots');
if(!source.includes("window.addEventListener('focus'")||!source.includes("document.addEventListener('visibilitychange'"))throw new Error('Returning dispatchers must receive an immediate shared refresh');
if(source.includes(".on('postgres_changes'")||source.includes(".on('presence'"))throw new Error('Nano compute must not reopen CPU-heavy Realtime replication or presence channels');
if(!source.includes("rpc('save_workspace_snapshot_v3'")||!source.includes('saveInFlight'))throw new Error('Cloud writes must use the current versioned single-flight writer');
if(!source.includes("if(!membership){notify({type:'reconnecting',reason:'membership-pending'});return;}"))throw new Error('Startup must not fan out writes before station membership loads');
if(!source.includes("pending.shared")||!source.includes("pending.userId!==session.user.id"))throw new Error('Device-local stale queues must not merge into another dispatcher session');
if(!source.includes("from('station_memberships')"))throw new Error('Dispatcher station access must be checked before loading shared snapshots');
if(!source.includes('function canInitialize(){return canWrite();}'))throw new Error('An automatic shared-link dispatcher must be able to initialize a missing shared day');
if(!source.includes('signInAnonymously')||!source.includes('relayops_link_access:true'))throw new Error('Shared-link browsers must create their restricted Supabase session automatically');
if(!source.includes('if(initializing)return;')||!source.includes("notify({type:'ready',revision,persistentRevision})"))throw new Error('A delayed auth callback can still overwrite a completed shared connection with a permanent Connecting state');

const app=fs.readFileSync('app.js','utf8');
if(!app.includes('morningOperationDate: requestedOperationDate()'))throw new Error('A stale device-local date can still choose the workspace');
if(!app.includes("url.searchParams.set('date',state.morningOperationDate)"))throw new Error('Changing operation dates must keep the dated shared URL in sync');
if(!app.includes('everyone opens the same shared day automatically'))throw new Error('Share link must explain that the dated workspace opens automatically for everyone with the link');
if(!app.includes("if(event.type==='ready')")||!app.includes('Still connecting? Tap to restart shared sync.'))throw new Error('The dashboard must accept the cloud terminal-ready event and let dispatchers retry a slow connection');

console.log('Cloud shared-workspace access/date/polling guard tests passed');
