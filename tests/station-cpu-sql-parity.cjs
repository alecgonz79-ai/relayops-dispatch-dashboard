const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = name => fs.readFileSync(path.join(__dirname, '../supabase', name), 'utf8');
const schema = read('schema.sql');
const writerMigration = read('migrations/20260821_cpu_safe_workspace_writer_v5.sql');
const expirationMigration = read('migrations/20260816_daily_workspace_expiration_v4.sql');
const auditMigration = read('migrations/20260804_audit_retention_guardrails.sql');
const withoutComments = sql => sql.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const compact = sql => withoutComments(sql).replace(/\s+/g, ' ').trim();

// Inspect only the selected definition, not unrelated seed/access SQL that
// legitimately names DJT6 or DUR6. These are source contracts, not DB execution.
function definition(sql, name) {
  const matches = [...withoutComments(sql).matchAll(new RegExp(
    String.raw`create\s+or\s+replace\s+function\s+public\.${name}\s*\([\s\S]*?\bas\s+\$\$([\s\S]*?)\$\$\s*;`, 'gi'
  ))];
  assert.equal(matches.length, 1, `Expected one ${name} definition in this source`);
  return { declaration: compact(matches[0][0]), body: compact(matches[0][1]) };
}

function stationAgnostic(sql, label) {
  assert.doesNotMatch(sql, /'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'/i, `${label} must not hardcode a station or organization UUID`);
  assert.doesNotMatch(sql, /'\s*[A-Z]{3}\d\s*'/i, `${label} must not select a literal station code`);
  assert.doesNotMatch(sql, /\b(?:station_code|code)\s*(?:=|<>|in\s*\()/i, `${label} must not branch by station code`);
}

function writerContract({ declaration, body }) {
  stationAgnostic(body, 'Writer v5');
  assert.match(declaration, /target_station uuid\s*,\s*target_date date/i);
  assert.match(declaration, /returns jsonb language plpgsql security definer set search_path\s*=\s*''/i);
  assert.match(body, /from public\.stations s join public\.memberships m on m\.organization_id\s*=\s*s\.organization_id and m\.user_id\s*=\s*actor_id and m\.active where s\.id\s*=\s*target_station/i);
  assert.match(body, /from public\.station_memberships sm where sm\.station_id\s*=\s*s\.id and sm\.user_id\s*=\s*actor_id/i);
  assert.match(body, /m\.role\s*=\s*any\(array\['owner','ops_manager','dispatcher','fleet_lead'\]/i);
  const snapshotReads = [...body.matchAll(/from public\.workspace_snapshots\s+where\s+([^;]+?)(?:\s+for update)?;/gi)];
  assert.equal(snapshotReads.length, 2, 'Initial and insert-race reads must both address the requested station/date');
  snapshotReads.forEach(([, predicate]) => assert.match(predicate, /^station_id\s*=\s*target_station and operation_date\s*=\s*target_date$/i));
  assert.match(body, /update public\.workspace_snapshots set [^;]+ where station_id\s*=\s*target_station and operation_date\s*=\s*target_date returning \* into current_row;/i);
  assert.match(body, /values\(target_org,target_station,target_date,1,new_payload,actor_id\) on conflict\(station_id,operation_date\) do nothing/i);
  assert.match(body, /insert into public\.audit_log\([^;]+values\(\s*target_org,target_station,actor_id,action_name,'workspace'/i);
  assert.match(body, /target_date\s*=\s*date '2000-01-01' and payload_bytes\s*>\s*4194304/i);
  assert.match(body, /target_date\s*<>\s*date '2000-01-01' and payload_bytes\s*>\s*2097152/i);
  assert.match(body, /if target_date\s*<>\s*date '2000-01-01' and target_date\s*<\s*current_operation_date then return pg_catalog\.jsonb_build_object\(\s*'status','stale_date'/i, 'Only expired daily writes are rejected; current/future/permanent writes remain eligible');
  assert.match(body, /current_operation_date\s*:=\s*\(pg_catalog\.clock_timestamp\(\) at time zone 'America\/Los_Angeles'\)::date/i);
  assert.ok(body.indexOf('pg_advisory_xact_lock_shared(7269120250816)') >= 0 && body.indexOf('pg_advisory_xact_lock_shared(7269120250816)') < body.indexOf('current_operation_date :='), 'Writer must take the shared expiration lock before computing the date');
  assert.match(body, /if current_row\.payload\s*=\s*new_payload then return pg_catalog\.jsonb_build_object\(\s*'status','unchanged'/i);
  assert.match(body, /if current_row\.revision\s*<>\s*expected_revision then return pg_catalog\.jsonb_build_object\(\s*'status','conflict'/i);
  assert.doesNotMatch(body, /raise exception/i, 'Ordinary writer outcomes must not create database ERROR/retry storms');
  const saved = body.match(/return pg_catalog\.jsonb_build_object\(\s*'status','saved',([^;]+)\);/i);
  assert.ok(saved, 'Writer must return compact save metadata');
  assert.doesNotMatch(saved[1], /\b(?:payload|new_payload)\b/i, 'Save acknowledgment must not echo the full JSON snapshot');
}

function expirationContract({ body }) {
  stationAgnostic(body, 'Daily expiration');
  const deletes = [...body.matchAll(/delete from ([a-z_.]+) where ([^;]+);/gi)];
  assert.equal(deletes.length, 1);
  assert.equal(deletes[0][1], 'public.workspace_snapshots');
  assert.match(deletes[0][2], /^operation_date\s*<>\s*date '2000-01-01' and operation_date\s*<\s*cutoff_date$/i, 'Expiration must cover every station and preserve permanent, current, and future snapshots');
  assert.match(body, /cutoff_date\s*:=\s*\(clock_timestamp\(\) at time zone 'America\/Los_Angeles'\)::date/i);
  assert.ok(body.indexOf('pg_advisory_xact_lock(7269120250816)') >= 0 && body.indexOf('pg_advisory_xact_lock(7269120250816)') < body.indexOf('cutoff_date :='), 'Cleanup must serialize with writers before computing midnight cutoff');
}

function indexContract(sql, name, expected) {
  const matches = [...withoutComments(sql).matchAll(new RegExp(String.raw`create\s+index\s+if\s+not\s+exists\s+${name}\b([^;]+);`, 'gi'))];
  assert.equal(matches.length, 1, `Missing or duplicate idempotent ${name} index`);
  assert.match(compact(matches[0][1]), expected);
}

function cronContract(sql, name, schedule, command) {
  const source = withoutComments(sql);
  const calls = [...source.matchAll(/\bcron\.schedule\s*\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/gi)];
  assert.equal((source.match(/\bcron\.schedule\s*\(/gi) || []).length, calls.length, 'All cron calls must use an explicit stable name');
  assert.deepEqual(calls.map(match => match.slice(1)), [[name, schedule, command]], 'Use one named all-station cleanup job, not one job per station');
}

for (const sql of [schema, writerMigration]) {
  writerContract(definition(sql, 'save_workspace_snapshot_v5'));
  indexContract(sql, 'memberships_user_id_idx', /^on public\.memberships\s*\(user_id\)$/i);
  indexContract(sql, 'station_memberships_user_id_idx', /^on public\.station_memberships\s*\(user_id\)$/i);
}
for (const sql of [schema, expirationMigration]) {
  expirationContract(definition(sql, 'prune_expired_workspace_snapshots'));
  indexContract(sql, 'workspace_snapshots_operation_date_idx', /^on public\.workspace_snapshots\s*\(operation_date\) where operation_date\s*<>\s*date '2000-01-01'$/i);
  cronContract(sql, 'relayops-daily-workspace-expiration', '0 7,8 * * *', 'select public.prune_expired_workspace_snapshots();');
}

const audit = definition(auditMigration, 'prune_relayops_audit_log');
stationAgnostic(audit.body, 'Audit retention');
assert.doesNotMatch(audit.body, /\b(?:station_id|workspace_snapshots)\b/i, 'Audit pruning must apply to all stations and never touch snapshots');
const auditDeletes = [...audit.body.matchAll(/delete from ([a-z_.]+) where ([^;]+);/gi)];
assert.equal(auditDeletes.length, 2);
auditDeletes.forEach(([, table]) => assert.equal(table, 'public.audit_log'));
assert.match(auditDeletes[0][2], /^created_at < now\(\) - interval '14 days' and entity = 'workspace' and \(/i);
assert.match(auditDeletes[1][2], /^created_at < now\(\) - interval '180 days' and not \(/i);
for (const [, , predicate] of auditDeletes) {
  assert.match(predicate, /action like 'workspace\.autosave%'/);
  assert.match(predicate, /action like 'workspace\.retry%'/);
  assert.match(predicate, /'workspace\.initialize', 'workspace\.offline-reconcile', 'workspace\.poll-reconcile'/);
}
indexContract(auditMigration, 'audit_log_station_created_at_idx', /^on public\.audit_log\s*\(station_id, created_at desc\)$/i);
indexContract(auditMigration, 'audit_log_created_at_idx', /^on public\.audit_log\s*\(created_at\)$/i);
cronContract(auditMigration, 'relayops-audit-retention', '23 3 * * *', 'select public.prune_relayops_audit_log();');

// Upgrade deployments retain the compact v4 circuit breaker. Fresh schema
// installs deliberately revoke v4 instead; do not confuse those two paths.
const compatibility = definition(writerMigration, 'save_workspace_snapshot_v4');
stationAgnostic(compatibility.body, 'v4 compatibility writer');
assert.match(compatibility.body, /outcome := public\.save_workspace_snapshot_v5\(\s*target_station,target_date,expected_revision,new_payload,action_name\s*\)/i);
assert.match(compatibility.body, /current_row\.revision := -greatest\(pg_catalog\.abs\(current_row\.revision\),1::bigint\)/i);
assert.match(compatibility.body, /current_row\.station_id := target_station; current_row\.operation_date := target_date; current_row\.revision := -1;/i);
assert.doesNotMatch(compatibility.body, /revision_conflict|\b(?:insert into|update|delete from)\s+(?:public\.)?workspace_snapshots\b/i, 'v4 must delegate writes to v5 and stop stale-tab retry loops');
assert.match(withoutComments(schema), /revoke execute on function public\.save_workspace_snapshot_v4\(uuid,date,bigint,jsonb,text\) from public,anon,authenticated;/i);

// Guard against vacuous source checks: these intentionally broken definitions
// must be rejected without editing files or contacting a database.
const writer = definition(writerMigration, 'save_workspace_snapshot_v5');
assert.throws(() => writerContract({ ...writer, body: writer.body.replace('s.id=target_station', "s.code='DUR6'") }));
assert.throws(() => writerContract({ ...writer, body: writer.body.replace('s.id=target_station', "s.id='00000000-0000-0000-0000-000000000001'") }));
const expiration = definition(expirationMigration, 'prune_expired_workspace_snapshots');
assert.throws(() => expirationContract({ body: expiration.body.replace('operation_date < cutoff_date', 'operation_date <= cutoff_date') }));
assert.throws(() => expirationContract({ body: expiration.body.replace('operation_date < cutoff_date', 'operation_date < cutoff_date and station_id=target_station') }));

console.log('All-station CPU SQL contracts passed: v5, expiration, audit retention, indexes, named jobs, and v4 brake (no live database execution)');
