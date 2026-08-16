-- RelayOps daily workspace expiration and stale-tab guard.
--
-- File-derived operational data lives in one operation-date snapshot. The
-- permanent station snapshot (2000-01-01) is never removed. pg_cron runs at
-- both possible Los Angeles midnight hours; the LA-date predicate makes the
-- daylight-saving-time duplicate a harmless no-op.

create index if not exists workspace_snapshots_operation_date_idx
  on public.workspace_snapshots (operation_date)
  where operation_date <> date '2000-01-01';

create or replace function public.prune_expired_workspace_snapshots()
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  cutoff_date date;
  deleted_count bigint := 0;
begin
  -- Serialize expiration against in-flight v4 writes. Writers take the
  -- shared form of this transaction lock, so normal dispatchers still save
  -- concurrently while midnight cleanup cannot miss an uncommitted row.
  perform pg_advisory_xact_lock(7269120250816);
  cutoff_date := (clock_timestamp() at time zone 'America/Los_Angeles')::date;
  delete from public.workspace_snapshots
  where operation_date <> date '2000-01-01'
    and operation_date < cutoff_date;
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

comment on function public.prune_expired_workspace_snapshots() is
  'Deletes expired RelayOps operation-date snapshots at Los Angeles midnight; never deletes the permanent 2000-01-01 station snapshot.';

revoke all on function public.prune_expired_workspace_snapshots() from public, anon, authenticated;

create or replace function public.save_workspace_snapshot_v4(
  target_station uuid,
  target_date date,
  expected_revision bigint,
  new_payload jsonb,
  action_name text default 'workspace.save'
)
returns workspace_snapshots
language plpgsql
security invoker
as $$
declare
  current_row workspace_snapshots;
  target_org uuid;
  current_operation_date date;
begin
  select organization_id into target_org from stations where id=target_station;
  if target_org is null
    or not can_access_station(target_station)
    or not has_org_role(target_org,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[])
  then
    raise exception 'not authorized';
  end if;

  perform pg_advisory_xact_lock_shared(7269120250816);
  current_operation_date := (clock_timestamp() at time zone 'America/Los_Angeles')::date;
  if target_date <> date '2000-01-01' and target_date < current_operation_date then
    raise exception 'stale_operation_date' using errcode='22023';
  end if;

  select * into current_row
  from workspace_snapshots
  where station_id=target_station and operation_date=target_date
  for update;

  if found then
    if current_row.payload=new_payload then
      return current_row;
    end if;
    if current_row.revision<>expected_revision then
      raise exception 'revision_conflict' using errcode='40001';
    end if;
    update workspace_snapshots
    set revision=current_row.revision+1,
        payload=new_payload,
        updated_at=now(),
        updated_by=auth.uid()
    where station_id=target_station and operation_date=target_date
    returning * into current_row;
  else
    if expected_revision<>0 then
      raise exception 'revision_conflict' using errcode='40001';
    end if;
    insert into workspace_snapshots(organization_id,station_id,operation_date,revision,payload,updated_by)
    values(target_org,target_station,target_date,1,new_payload,auth.uid())
    on conflict(station_id,operation_date) do nothing
    returning * into current_row;
    if not found then
      select * into current_row
      from workspace_snapshots
      where station_id=target_station and operation_date=target_date;
      if found and current_row.payload=new_payload then
        return current_row;
      end if;
      raise exception 'revision_conflict' using errcode='40001';
    end if;
  end if;

  insert into audit_log(organization_id,station_id,action,entity,metadata)
  values(target_org,target_station,action_name,'workspace',jsonb_build_object('operation_date',target_date,'revision',current_row.revision));
  return current_row;
end;
$$;

grant execute on function public.save_workspace_snapshot_v4(uuid,date,bigint,jsonb,text) to authenticated;

do $$
begin
  if not exists (select 1 from pg_extension where extname='pg_cron') then
    begin
      create extension if not exists pg_cron with schema pg_catalog;
    exception
      when insufficient_privilege or feature_not_supported then
        raise notice 'pg_cron could not be enabled automatically: %', sqlerrm;
    end;
  end if;

  if exists (select 1 from pg_extension where extname='pg_cron') then
    begin
      perform cron.schedule(
        'relayops-daily-workspace-expiration',
        '0 7,8 * * *',
        'select public.prune_expired_workspace_snapshots();'
      );
      raise notice 'Scheduled RelayOps expiration for both possible Los Angeles midnight UTC hours.';
    exception
      when undefined_function or invalid_schema_name or insufficient_privilege then
        raise notice 'Expiration function installed, but pg_cron scheduling was unavailable: %', sqlerrm;
    end;
  else
    raise notice 'pg_cron is unavailable. Run select public.prune_expired_workspace_snapshots(); from a trusted scheduler.';
  end if;
end;
$$;
