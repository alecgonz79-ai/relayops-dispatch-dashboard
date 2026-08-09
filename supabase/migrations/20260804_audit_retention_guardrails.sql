-- RelayOps audit-retention guardrails.
--
-- This migration never deletes workspace_snapshots. It only removes old
-- audit_log records after their useful troubleshooting window has passed.
-- The cleanup function remains available for a manual SQL-editor run when
-- pg_cron is not installed; scheduling is conditional and idempotent.

create index if not exists audit_log_station_created_at_idx
  on public.audit_log (station_id, created_at desc);

create index if not exists audit_log_created_at_idx
  on public.audit_log (created_at);

create or replace function public.prune_relayops_audit_log()
returns table (
  workspace_autosave_deleted bigint,
  older_audit_deleted bigint
)
language plpgsql
security definer
set search_path = public
as $$
declare
  autosave_count bigint := 0;
  older_count bigint := 0;
begin
  -- Autosave/reconciliation entries are high-volume operational telemetry.
  -- Keep two weeks for diagnosis, then discard only those audit rows.
  delete from public.audit_log
  where created_at < now() - interval '14 days'
    and entity = 'workspace'
    and (
      action like 'workspace.autosave%'
      or action like 'workspace.retry%'
      or action in (
        'workspace.initialize',
        'workspace.offline-reconcile',
        'workspace.poll-reconcile'
      )
    );
  get diagnostics autosave_count = row_count;

  -- Keep all remaining audit categories for six months. The autosave
  -- predicate is repeated so this pass cannot change its shorter policy.
  delete from public.audit_log
  where created_at < now() - interval '180 days'
    and not (
      entity = 'workspace'
      and (
        action like 'workspace.autosave%'
        or action like 'workspace.retry%'
        or action in (
          'workspace.initialize',
          'workspace.offline-reconcile',
          'workspace.poll-reconcile'
        )
      )
    );
  get diagnostics older_count = row_count;

  return query select autosave_count, older_count;
end;
$$;

comment on function public.prune_relayops_audit_log() is
  'Deletes RelayOps workspace autosave audit rows older than 14 days and other audit rows older than 180 days; never touches workspace snapshots.';

revoke all on function public.prune_relayops_audit_log() from public, anon, authenticated;

do $$
begin
  if exists (
    select 1
    from pg_extension
    where extname = 'pg_cron'
  ) then
    begin
      -- pg_cron updates the existing named job instead of creating a duplicate,
      -- which makes rerunning this migration safe.
      execute $schedule$
        select cron.schedule(
          'relayops-audit-retention',
          '23 3 * * *',
          'select public.prune_relayops_audit_log();'
        )
      $schedule$;
      raise notice 'Scheduled relayops-audit-retention with pg_cron.';
    exception
      when undefined_function or invalid_schema_name or insufficient_privilege then
        raise notice 'Audit cleanup function installed, but pg_cron scheduling was unavailable: %', sqlerrm;
    end;
  else
    raise notice 'pg_cron is not installed. Run select * from public.prune_relayops_audit_log(); manually or schedule it externally.';
  end if;
end;
$$;
