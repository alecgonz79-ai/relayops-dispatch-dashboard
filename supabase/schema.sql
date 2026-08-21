-- RelayOps synchronized multi-user foundation
-- Run once in a new Supabase project SQL editor.
create extension if not exists pgcrypto;

create type public.relayops_role as enum ('owner','ops_manager','dispatcher','fleet_lead','viewer');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  dsp_code text not null,
  created_at timestamptz not null default now()
);

create table public.stations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (organization_id, code)
);

create table public.memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.relayops_role not null default 'viewer',
  display_name text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.station_memberships (
  station_id uuid not null references public.stations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (station_id, user_id)
);

create table public.workspace_snapshots (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  station_id uuid not null references public.stations(id) on delete cascade,
  operation_date date not null,
  revision bigint not null default 1,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid not null default auth.uid() references auth.users(id),
  primary key (station_id, operation_date)
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  station_id uuid references public.stations(id) on delete set null,
  user_id uuid not null default auth.uid() references auth.users(id),
  action text not null,
  entity text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from memberships m where m.organization_id=target_org and m.user_id=auth.uid() and m.active); $$;

create or replace function public.has_org_role(target_org uuid, allowed public.relayops_role[])
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from memberships m where m.organization_id=target_org and m.user_id=auth.uid() and m.active and m.role=any(allowed)); $$;

create or replace function public.can_access_station(target_station uuid)
returns boolean language sql stable security definer set search_path=public
as $$
  select exists(
    select 1 from stations s join memberships m on m.organization_id=s.organization_id
    where s.id=target_station and m.user_id=auth.uid() and m.active
      and (m.role in ('owner','ops_manager') or exists(select 1 from station_memberships sm where sm.station_id=s.id and sm.user_id=auth.uid()))
  );
$$;

alter table organizations enable row level security;
alter table stations enable row level security;
alter table memberships enable row level security;
alter table station_memberships enable row level security;
alter table workspace_snapshots enable row level security;
alter table audit_log enable row level security;

create policy org_read on organizations for select using (is_org_member(id));
create policy station_read on stations for select using (is_org_member(organization_id) and can_access_station(id));
create policy membership_read on memberships for select using (is_org_member(organization_id));
create policy membership_owner_insert on memberships for insert with check (has_org_role(organization_id,array['owner']::relayops_role[]) and role<>'owner');
create policy membership_owner_update on memberships for update using (has_org_role(organization_id,array['owner']::relayops_role[]) and role<>'owner') with check (has_org_role(organization_id,array['owner']::relayops_role[]) and role<>'owner');
create policy station_membership_read on station_memberships for select using (can_access_station(station_id));
create policy station_membership_owner_admin on station_memberships for all using (exists(select 1 from stations s where s.id=station_id and has_org_role(s.organization_id,array['owner']::relayops_role[]))) with check (exists(select 1 from stations s where s.id=station_id and has_org_role(s.organization_id,array['owner']::relayops_role[])));
create policy snapshot_read on workspace_snapshots for select using (is_org_member(organization_id) and can_access_station(station_id));
create policy snapshot_write on workspace_snapshots for insert with check (can_access_station(station_id) and has_org_role(organization_id,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[]));
create policy snapshot_update on workspace_snapshots for update using (can_access_station(station_id) and has_org_role(organization_id,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[])) with check (can_access_station(station_id) and has_org_role(organization_id,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[]));
create policy audit_read on audit_log for select using (has_org_role(organization_id,array['owner','ops_manager']::relayops_role[]));
create policy audit_insert on audit_log for insert with check (is_org_member(organization_id) and (station_id is null or can_access_station(station_id)));

create or replace function public.save_workspace_snapshot(target_station uuid,target_date date,expected_revision bigint,new_payload jsonb,action_name text default 'workspace.save')
returns workspace_snapshots language plpgsql security invoker as $$
declare current_row workspace_snapshots; target_org uuid;
begin
  select organization_id into target_org from stations where id=target_station;
  if target_org is null or not can_access_station(target_station) or not has_org_role(target_org,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[]) then raise exception 'not authorized'; end if;
  select * into current_row from workspace_snapshots where station_id=target_station and operation_date=target_date for update;
  if found and current_row.revision<>expected_revision then raise exception 'revision_conflict' using errcode='40001'; end if;
  insert into workspace_snapshots(organization_id,station_id,operation_date,revision,payload,updated_by)
  values(target_org,target_station,target_date,1,new_payload,auth.uid())
  on conflict(station_id,operation_date) do update set revision=workspace_snapshots.revision+1,payload=excluded.payload,updated_at=now(),updated_by=auth.uid()
  returning * into current_row;
  insert into audit_log(organization_id,station_id,action,entity,metadata) values(target_org,target_station,action_name,'workspace',jsonb_build_object('operation_date',target_date,'revision',current_row.revision));
  return current_row;
end; $$;

-- Current clients use the versioned writer below. Keeping the former RPC
-- non-executable stops stale dashboard tabs from flooding a small PostgREST
-- pool while still allowing them to recover after one refresh.
revoke execute on function public.save_workspace_snapshot(uuid,date,bigint,jsonb,text) from public, anon, authenticated;

create or replace function public.save_workspace_snapshot_v3(target_station uuid,target_date date,expected_revision bigint,new_payload jsonb,action_name text default 'workspace.save')
returns workspace_snapshots language plpgsql security invoker as $$
declare current_row workspace_snapshots; target_org uuid;
begin
  select organization_id into target_org from stations where id=target_station;
  if target_org is null or not can_access_station(target_station) or not has_org_role(target_org,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[]) then raise exception 'not authorized'; end if;
  select * into current_row from workspace_snapshots where station_id=target_station and operation_date=target_date for update;
  if found and current_row.payload=new_payload then return current_row; end if;
  if found and current_row.revision<>expected_revision then raise exception 'revision_conflict' using errcode='40001'; end if;
  insert into workspace_snapshots(organization_id,station_id,operation_date,revision,payload,updated_by)
  values(target_org,target_station,target_date,1,new_payload,auth.uid())
  on conflict(station_id,operation_date) do update set revision=workspace_snapshots.revision+1,payload=excluded.payload,updated_at=now(),updated_by=auth.uid()
  returning * into current_row;
  insert into audit_log(organization_id,station_id,action,entity,metadata) values(target_org,target_station,action_name,'workspace',jsonb_build_object('operation_date',target_date,'revision',current_row.revision));
  return current_row;
end; $$;

grant execute on function public.save_workspace_snapshot_v3(uuid,date,bigint,jsonb,text) to authenticated;

create index if not exists workspace_snapshots_operation_date_idx on public.workspace_snapshots(operation_date) where operation_date<>date '2000-01-01';

create or replace function public.prune_expired_workspace_snapshots()
returns bigint language plpgsql security definer set search_path=public,pg_temp as $$
declare cutoff_date date; deleted_count bigint := 0;
begin
  perform pg_advisory_xact_lock(7269120250816);
  cutoff_date := (clock_timestamp() at time zone 'America/Los_Angeles')::date;
  delete from public.workspace_snapshots where operation_date<>date '2000-01-01' and operation_date<cutoff_date;
  get diagnostics deleted_count = row_count;
  return deleted_count;
end; $$;

revoke all on function public.prune_expired_workspace_snapshots() from public, anon, authenticated;

create or replace function public.save_workspace_snapshot_v4(target_station uuid,target_date date,expected_revision bigint,new_payload jsonb,action_name text default 'workspace.save')
returns workspace_snapshots language plpgsql security invoker as $$
declare current_row workspace_snapshots; target_org uuid; current_operation_date date;
begin
  select organization_id into target_org from stations where id=target_station;
  if target_org is null or not can_access_station(target_station) or not has_org_role(target_org,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[]) then raise exception 'not authorized'; end if;
  perform pg_advisory_xact_lock_shared(7269120250816);
  current_operation_date := (clock_timestamp() at time zone 'America/Los_Angeles')::date;
  if target_date<>date '2000-01-01' and target_date<current_operation_date then raise exception 'stale_operation_date' using errcode='22023'; end if;
  select * into current_row from workspace_snapshots where station_id=target_station and operation_date=target_date for update;
  if found then
    if current_row.payload=new_payload then return current_row; end if;
    if current_row.revision<>expected_revision then raise exception 'revision_conflict' using errcode='40001'; end if;
    update workspace_snapshots set revision=current_row.revision+1,payload=new_payload,updated_at=now(),updated_by=auth.uid()
    where station_id=target_station and operation_date=target_date returning * into current_row;
  else
    if expected_revision<>0 then raise exception 'revision_conflict' using errcode='40001'; end if;
    insert into workspace_snapshots(organization_id,station_id,operation_date,revision,payload,updated_by)
    values(target_org,target_station,target_date,1,new_payload,auth.uid())
    on conflict(station_id,operation_date) do nothing returning * into current_row;
    if not found then
      select * into current_row from workspace_snapshots where station_id=target_station and operation_date=target_date;
      if found and current_row.payload=new_payload then return current_row; end if;
      raise exception 'revision_conflict' using errcode='40001';
    end if;
  end if;
  insert into audit_log(organization_id,station_id,action,entity,metadata) values(target_org,target_station,action_name,'workspace',jsonb_build_object('operation_date',target_date,'revision',current_row.revision));
  return current_row;
end; $$;

grant execute on function public.save_workspace_snapshot_v4(uuid,date,bigint,jsonb,text) to authenticated;

-- Current browser writer. Normal optimistic conflicts are returned as compact
-- data instead of PostgreSQL errors, and successful saves do not echo the
-- full JSON payload back to the browser.
create index if not exists memberships_user_id_idx on public.memberships(user_id);
create index if not exists station_memberships_user_id_idx on public.station_memberships(user_id);

create or replace function public.save_workspace_snapshot_v5(
  target_station uuid,target_date date,expected_revision bigint,new_payload jsonb,
  action_name text default 'workspace.save'
)
returns jsonb language plpgsql security definer set search_path='' as $$
declare
  actor_id uuid := auth.uid();
  target_org uuid;
  current_row public.workspace_snapshots%rowtype;
  current_operation_date date;
  payload_bytes bigint;
begin
  if actor_id is null then return pg_catalog.jsonb_build_object('status','not_authorized'); end if;
  select s.organization_id into target_org
  from public.stations s
  join public.memberships m on m.organization_id=s.organization_id and m.user_id=actor_id and m.active
  where s.id=target_station
    and m.role=any(array['owner','ops_manager','dispatcher','fleet_lead']::public.relayops_role[])
    and (m.role=any(array['owner','ops_manager']::public.relayops_role[])
      or exists(select 1 from public.station_memberships sm where sm.station_id=s.id and sm.user_id=actor_id))
  limit 1;
  if target_org is null then return pg_catalog.jsonb_build_object('status','not_authorized'); end if;

  payload_bytes := pg_catalog.octet_length(new_payload::text);
  if (target_date=date '2000-01-01' and payload_bytes>4194304)
     or (target_date<>date '2000-01-01' and payload_bytes>2097152)
  then return pg_catalog.jsonb_build_object('status','payload_too_large','payload_bytes',payload_bytes); end if;

  perform pg_catalog.pg_advisory_xact_lock_shared(7269120250816);
  current_operation_date := (pg_catalog.clock_timestamp() at time zone 'America/Los_Angeles')::date;
  if target_date<>date '2000-01-01' and target_date<current_operation_date then
    return pg_catalog.jsonb_build_object('status','stale_date','operation_date',target_date,'current_operation_date',current_operation_date);
  end if;

  select * into current_row from public.workspace_snapshots
  where station_id=target_station and operation_date=target_date for update;
  if found then
    if current_row.payload=new_payload then
      return pg_catalog.jsonb_build_object('status','unchanged','revision',current_row.revision,'updated_at',current_row.updated_at,'updated_by',current_row.updated_by,'operation_date',current_row.operation_date);
    end if;
    if current_row.revision<>expected_revision then
      return pg_catalog.jsonb_build_object('status','conflict','revision',current_row.revision,'updated_at',current_row.updated_at,'updated_by',current_row.updated_by,'operation_date',current_row.operation_date);
    end if;
    update public.workspace_snapshots
    set revision=current_row.revision+1,payload=new_payload,updated_at=pg_catalog.now(),updated_by=actor_id
    where station_id=target_station and operation_date=target_date returning * into current_row;
  else
    if expected_revision<>0 then
      return pg_catalog.jsonb_build_object('status','conflict','revision',0,'operation_date',target_date);
    end if;
    insert into public.workspace_snapshots(organization_id,station_id,operation_date,revision,payload,updated_by)
    values(target_org,target_station,target_date,1,new_payload,actor_id)
    on conflict(station_id,operation_date) do nothing returning * into current_row;
    if not found then
      select * into current_row from public.workspace_snapshots
      where station_id=target_station and operation_date=target_date;
      if current_row.payload=new_payload then
        return pg_catalog.jsonb_build_object('status','unchanged','revision',current_row.revision,'updated_at',current_row.updated_at,'updated_by',current_row.updated_by,'operation_date',current_row.operation_date);
      end if;
      return pg_catalog.jsonb_build_object('status','conflict','revision',current_row.revision,'updated_at',current_row.updated_at,'updated_by',current_row.updated_by,'operation_date',current_row.operation_date);
    end if;
  end if;

  insert into public.audit_log(organization_id,station_id,user_id,action,entity,metadata)
  values(target_org,target_station,actor_id,action_name,'workspace',pg_catalog.jsonb_build_object('operation_date',target_date,'revision',current_row.revision));
  return pg_catalog.jsonb_build_object('status','saved','revision',current_row.revision,'updated_at',current_row.updated_at,'updated_by',current_row.updated_by,'operation_date',current_row.operation_date);
end; $$;

revoke all on function public.save_workspace_snapshot_v5(uuid,date,bigint,jsonb,text) from public,anon,authenticated;
grant execute on function public.save_workspace_snapshot_v5(uuid,date,bigint,jsonb,text) to authenticated;
-- Fresh installations have no pre-v5 tabs, so legacy writers stay closed.
revoke execute on function public.save_workspace_snapshot_v4(uuid,date,bigint,jsonb,text) from public,anon,authenticated;
notify pgrst, 'reload schema';

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
      perform cron.schedule('relayops-daily-workspace-expiration','0 7,8 * * *','select public.prune_expired_workspace_snapshots();');
    exception
      when undefined_function or invalid_schema_name or insufficient_privilege then
        raise notice 'Expiration function installed, but pg_cron scheduling was unavailable: %', sqlerrm;
    end;
  else
    raise notice 'pg_cron is unavailable. Run select public.prune_expired_workspace_snapshots(); from a trusted scheduler.';
  end if;
end;
$$;

revoke execute on function public.save_workspace_snapshot_v3(uuid,date,bigint,jsonb,text) from public, anon, authenticated;

-- RelayOps performs lightweight, visibility-aware polling. Publishing the
-- large JSON snapshots to Realtime exhausts nano compute even with few tabs.
do $$ begin
  if exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='workspace_snapshots') then
    alter publication supabase_realtime drop table public.workspace_snapshots;
  end if;
end $$;
