const fs=require('fs');
const vm=require('vm');

const source=fs.readFileSync('cloud-sync.js','utf8');
if(!source.includes("event:'*'"))throw new Error('Realtime must subscribe to both the first INSERT and later UPDATE events');
if(!source.includes("pending.shared")||!source.includes("pending.userId!==session.user.id"))throw new Error('Device-local stale queues must not merge into another dispatcher session');
if(!source.includes("from('station_memberships')"))throw new Error('Dispatcher station access must be checked before loading shared snapshots');
if(!source.includes("['owner','ops_manager'].includes(membership.role)"))throw new Error('Only an owner or operations manager may initialize a missing shared day');

const app=fs.readFileSync('app.js','utf8');
if(!app.includes('morningOperationDate: requestedOperationDate()'))throw new Error('A stale device-local date can still choose the workspace');
if(!app.includes("url.searchParams.set('date',state.morningOperationDate)"))throw new Error('Changing operation dates must keep the dated shared URL in sync');
if(!app.includes('every signed-in dispatcher opens the same shared day'))throw new Error('Share link must explain that the dated workspace is shared');

console.log('Cloud shared-workspace access/date/realtime guard tests passed');
