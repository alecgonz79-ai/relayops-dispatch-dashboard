const assert = require('assert');
const fs = require('fs');
const path = require('path');

const migration = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '20260821_cpu_safe_workspace_writer_v5.sql'), 'utf8');
const cloud = fs.readFileSync(path.join(__dirname, '..', 'cloud-sync.js'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

assert(/save_workspace_snapshot_v5[\s\S]*returns jsonb[\s\S]*security definer[\s\S]*set search_path\s*=\s*''/i.test(migration), 'Writer v5 must return a compact JSON result from a locked SECURITY DEFINER function');
assert(/m\.user_id=actor_id[\s\S]*m\.active[\s\S]*station_memberships[\s\S]*sm\.user_id=actor_id/i.test(migration), 'Writer v5 must authorize the calling user for the target station exactly once');
assert(/payload_bytes>4194304[\s\S]*payload_bytes>2097152/i.test(migration), 'Writer v5 must enforce permanent and daily server payload limits');
assert(/'status','conflict'/i.test(migration), 'Writer v5 must return optimistic conflicts as data');

const v5Body = migration.match(/create or replace function public\.save_workspace_snapshot_v5[\s\S]*?\n\$\$;/i)?.[0] || '';
assert(v5Body && !/raise exception 'revision_conflict'/i.test(v5Body), 'Normal v5 conflicts must not generate PostgreSQL ERROR log storms');
assert(!/'status','saved'[\s\S]{0,300}'payload'/i.test(v5Body), 'A successful v5 write must not echo the full workspace payload');
assert(/save_workspace_snapshot_v4[\s\S]*current_row\.revision\s*:=\s*-greatest[\s\S]*1::bigint/i.test(migration), 'Already-open v4 tabs need the negative-revision circuit breaker');
assert(/revoke all on function public\.save_workspace_snapshot_v5[\s\S]*grant execute[\s\S]*to authenticated/i.test(migration), 'Writer v5 must be executable only by authenticated sessions');

assert(cloud.includes("rpc('save_workspace_snapshot_v5'"), 'The browser must prefer writer v5');
assert(cloud.includes("rpc('save_workspace_snapshot_v4'"), 'The additive rollout must retain a temporary v4 fallback');
assert(cloud.includes('suppressAutoSave:true'), 'Conflict hydration must suppress the immediate reconcile save');
assert(/if\(!suppressAutoSave&&/.test(cloud), 'A conflict load can still schedule an immediate save loop');
assert(/dailyResult=await query\(date\)[\s\S]{0,220}if\(dailyResult\.error\)throw dailyResult\.error;[\s\S]{0,120}persistentResult=await query\(PERSISTENT_DATE\)/.test(cloud), 'A failed daily read must stop before the permanent read');
assert(/pollForUpdates[\s\S]{0,220}!operationDateIsWritable\(date\)/.test(cloud), 'Expired operation dates must not poll');
assert(/function sharedDashboardUrl[\s\S]{0,400}selectedDate!==defaultOperationDate\(\)/.test(app), 'Today\'s copied dashboard link must float instead of pinning an expiring date');

console.log('CPU-safe writer v5, compatibility brake, bounded conflict, and expired-link contracts passed');
