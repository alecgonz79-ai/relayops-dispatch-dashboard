-- CPU-safe RelayOps writer rollout.
--
-- v5 makes optimistic conflicts a normal compact response rather than a
-- PostgreSQL ERROR, returns only metadata after successful saves, authorizes
-- once, and preserves the v4 compatibility surface for already-open tabs.

create index if not exists memberships_user_id_idx
  on public.memberships(user_id);

create index if not exists station_memberships_user_id_idx
  on public.station_memberships(user_id);

create or replace function public.save_workspace_snapshot_v5(
  target_station uuid,
  target_date date,
  expected_revision bigint,
  new_payload jsonb,
  action_name text default 'workspace.save'
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := auth.uid();
  target_org uuid;
  current_row public.workspace_snapshots%rowtype;
  current_operation_date date;
  payload_bytes bigint;
begin
  if actor_id is null then
    return pg_catalog.jsonb_build_object('status','not_authorized');
  end if;

  select s.organization_id
  into target_org
  from public.stations s
  join public.memberships m
    on m.organization_id=s.organization_id
   and m.user_id=actor_id
   and m.active
  where s.id=target_station
    and m.role=any(array['owner','ops_manager','dispatcher','fleet_lead']::public.relayops_role[])
    and (
      m.role=any(array['owner','ops_manager']::public.relayops_role[])
      or exists (
        select 1
        from public.station_memberships sm
        where sm.station_id=s.id and sm.user_id=actor_id
      )
    )
  limit 1;

  if target_org is null then
    return pg_catalog.jsonb_build_object('status','not_authorized');
  end if;

  payload_bytes := pg_catalog.octet_length(new_payload::text);
  if (target_date=date '2000-01-01' and payload_bytes>4194304)
     or (target_date<>date '2000-01-01' and payload_bytes>2097152)
  then
    return pg_catalog.jsonb_build_object(
      'status','payload_too_large',
      'payload_bytes',payload_bytes
    );
  end if;

  -- Serialize midnight pruning with writes, exactly as v4 does.
  perform pg_catalog.pg_advisory_xact_lock_shared(7269120250816);
  current_operation_date := (pg_catalog.clock_timestamp() at time zone 'America/Los_Angeles')::date;
  if target_date<>date '2000-01-01' and target_date<current_operation_date then
    return pg_catalog.jsonb_build_object(
      'status','stale_date',
      'operation_date',target_date,
      'current_operation_date',current_operation_date
    );
  end if;

  select *
  into current_row
  from public.workspace_snapshots
  where station_id=target_station and operation_date=target_date
  for update;

  if found then
    if current_row.payload=new_payload then
      return pg_catalog.jsonb_build_object(
        'status','unchanged',
        'revision',current_row.revision,
        'updated_at',current_row.updated_at,
        'updated_by',current_row.updated_by,
        'operation_date',current_row.operation_date
      );
    end if;
    if current_row.revision<>expected_revision then
      return pg_catalog.jsonb_build_object(
        'status','conflict',
        'revision',current_row.revision,
        'updated_at',current_row.updated_at,
        'updated_by',current_row.updated_by,
        'operation_date',current_row.operation_date
      );
    end if;
    update public.workspace_snapshots
    set revision=current_row.revision+1,
        payload=new_payload,
        updated_at=pg_catalog.now(),
        updated_by=actor_id
    where station_id=target_station and operation_date=target_date
    returning * into current_row;
  else
    if expected_revision<>0 then
      return pg_catalog.jsonb_build_object(
        'status','conflict',
        'revision',0,
        'operation_date',target_date
      );
    end if;
    insert into public.workspace_snapshots(
      organization_id,station_id,operation_date,revision,payload,updated_by
    )
    values(target_org,target_station,target_date,1,new_payload,actor_id)
    on conflict(station_id,operation_date) do nothing
    returning * into current_row;
    if not found then
      select *
      into current_row
      from public.workspace_snapshots
      where station_id=target_station and operation_date=target_date;
      if current_row.payload=new_payload then
        return pg_catalog.jsonb_build_object(
          'status','unchanged',
          'revision',current_row.revision,
          'updated_at',current_row.updated_at,
          'updated_by',current_row.updated_by,
          'operation_date',current_row.operation_date
        );
      end if;
      return pg_catalog.jsonb_build_object(
        'status','conflict',
        'revision',current_row.revision,
        'updated_at',current_row.updated_at,
        'updated_by',current_row.updated_by,
        'operation_date',current_row.operation_date
      );
    end if;
  end if;

  insert into public.audit_log(
    organization_id,station_id,user_id,action,entity,metadata
  )
  values(
    target_org,target_station,actor_id,action_name,'workspace',
    pg_catalog.jsonb_build_object('operation_date',target_date,'revision',current_row.revision)
  );

  return pg_catalog.jsonb_build_object(
    'status','saved',
    'revision',current_row.revision,
    'updated_at',current_row.updated_at,
    'updated_by',current_row.updated_by,
    'operation_date',current_row.operation_date
  );
end;
$$;

revoke all on function public.save_workspace_snapshot_v5(uuid,date,bigint,jsonb,text)
  from public, anon, authenticated;
grant execute on function public.save_workspace_snapshot_v5(uuid,date,bigint,jsonb,text)
  to authenticated;

-- Compatibility circuit breaker for tabs that loaded v4 before this rollout.
-- A stale v4 revision receives a negative revision sentinel instead of a
-- logged SQL exception. Those tabs stop their retry loop and cannot overwrite
-- newer work; refreshing moves them to v5, which performs normal reconciliation.
create or replace function public.save_workspace_snapshot_v4(
  target_station uuid,
  target_date date,
  expected_revision bigint,
  new_payload jsonb,
  action_name text default 'workspace.save'
)
returns public.workspace_snapshots
language plpgsql
security invoker
as $$
declare
  outcome jsonb;
  current_row public.workspace_snapshots%rowtype;
begin
  outcome := public.save_workspace_snapshot_v5(
    target_station,target_date,expected_revision,new_payload,action_name
  );

  if (outcome->>'status') in ('saved','unchanged') then
    select * into current_row
    from public.workspace_snapshots
    where station_id=target_station and operation_date=target_date;
    return current_row;
  end if;

  if outcome->>'status'='not_authorized' then
    raise exception 'not authorized' using errcode='42501';
  end if;

  select * into current_row
  from public.workspace_snapshots
  where station_id=target_station and operation_date=target_date;
  if found then
    current_row.revision := -greatest(pg_catalog.abs(current_row.revision),1::bigint);
    return current_row;
  end if;

  select s.organization_id into current_row.organization_id
  from public.stations s where s.id=target_station;
  current_row.station_id := target_station;
  current_row.operation_date := target_date;
  current_row.revision := -1;
  current_row.payload := '{}'::jsonb;
  current_row.updated_at := pg_catalog.now();
  current_row.updated_by := auth.uid();
  return current_row;
end;
$$;

revoke all on function public.save_workspace_snapshot_v4(uuid,date,bigint,jsonb,text)
  from public, anon;
grant execute on function public.save_workspace_snapshot_v4(uuid,date,bigint,jsonb,text)
  to authenticated;

comment on function public.save_workspace_snapshot_v5(uuid,date,bigint,jsonb,text)
  is 'CPU-safe RelayOps writer: compact success responses and non-error optimistic conflicts.';
comment on function public.save_workspace_snapshot_v4(uuid,date,bigint,jsonb,text)
  is 'Temporary compatibility circuit breaker for pre-v5 browser tabs.';

notify pgrst, 'reload schema';
