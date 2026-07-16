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

alter publication supabase_realtime add table public.workspace_snapshots;
