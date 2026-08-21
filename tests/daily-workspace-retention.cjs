const fs = require('fs');
const assert = require('assert');

const migration = fs.readFileSync(require.resolve('../supabase/migrations/20260816_daily_workspace_expiration_v4.sql'), 'utf8');
const revoke = fs.readFileSync(require.resolve('../supabase/migrations/20260816_revoke_writer_v3_after_v4.sql'), 'utf8');
const cloud = fs.readFileSync(require.resolve('../cloud-sync.js'), 'utf8');

assert(migration.includes('prune_expired_workspace_snapshots'), 'Daily expiration function is missing');
assert(/operation_date\s*<>\s*date '2000-01-01'[\s\S]*operation_date\s*<\s*cutoff_date/.test(migration), 'Expiration must preserve the permanent station row and delete only prior dates');
assert(migration.includes("time zone 'America/Los_Angeles'"), 'Expiration must use the operating timezone');
assert(migration.includes("'0 7,8 * * *'"), 'Expiration must cover both UTC forms of Los Angeles midnight');
assert(migration.includes('save_workspace_snapshot_v4'), 'Stale-date guarded writer v4 is missing');
assert(/target_date\s*<>\s*date '2000-01-01'[\s\S]*target_date\s*<\s*current_operation_date[\s\S]*stale_operation_date/.test(migration), 'Writer v4 must reject expired daily writes while allowing permanent data');
assert(migration.indexOf('pg_advisory_xact_lock(7269120250816)') < migration.indexOf("cutoff_date := (clock_timestamp() at time zone 'America/Los_Angeles')::date"), 'Midnight cleanup must take its exclusive transaction lock before calculating the cutoff');
assert(migration.indexOf('pg_advisory_xact_lock_shared(7269120250816)') < migration.indexOf("current_operation_date := (clock_timestamp() at time zone 'America/Los_Angeles')::date"), 'Writer v4 must take the shared cleanup lock before evaluating the live LA date');
assert(/expected_revision\s*<>\s*0[\s\S]*on conflict\(station_id,operation_date\) do nothing[\s\S]*revision_conflict/.test(migration), 'The first writer for a new day must use conflict-safe optimistic initialization');
assert(cloud.includes("rpc('save_workspace_snapshot_v5'"), 'Browser client is not using the CPU-safe writer v5');
assert(cloud.includes('operationDateIsWritable(saveDate)'), 'Browser client must suppress expired-date daily saves before calling Supabase');
assert(cloud.includes('if(!operationDateIsWritable(date)){clearPending(date);return;}'), 'Expired local queues must retire after permanent edits are acknowledged');
assert(revoke.includes('save_workspace_snapshot_v3') && revoke.includes('revoke execute'), 'Post-publish migration must revoke the stale v3 writer');

console.log('Daily workspace expiration, LA-midnight schedule, and stale-writer guard contracts passed');
