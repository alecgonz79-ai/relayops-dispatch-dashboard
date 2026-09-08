-- Same approved dispatchers, separate DJT6 / DUR6 workspaces.
-- First inspect supabase/dual_station_preflight.sql on the target project.
-- Run this entire file as the database migration owner. It is transactional
-- and repeatable; it never copies, clears, or rewrites operational snapshots.
begin;
set local lock_timeout = '5s';
set local statement_timeout = '60s';
select pg_catalog.pg_advisory_xact_lock(7269120260907);

do $verify$
begin
  if not exists (
    select 1 from public.stations
    where id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
      and organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
      and code='DJT6'
  ) then
    raise exception 'DUR6 setup stopped: the pinned DJT6 station/organization does not match';
  end if;
  if not exists (
    select 1 from public.relayops_link_access
    where station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
      and organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
  ) then
    raise exception 'DUR6 setup stopped: the existing DJT6 shared-link configuration is missing';
  end if;
  if exists (
    select 1 from public.stations
    where organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
      and pg_catalog.upper(pg_catalog.btrim(code))='DUR6' and code<>'DUR6'
  ) then
    raise exception 'DUR6 setup stopped: reconcile the existing noncanonical DUR6 station code first';
  end if;
  if exists (
    select 1 from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid=p.pronamespace
    where n.nspname='public' and
      (p.proname like 'ensure_relayops_link_%'
       or (p.proname like 'provision_relayops_link_%' and p.proname<>'provision_relayops_link_user'))
  ) then
    raise exception 'DUR6 setup stopped: review and reconcile the additional live shared-link provisioning function first';
  end if;
end;
$verify$;

-- The database generates the new UUID. Reruns preserve the existing DUR6 UUID,
-- name, data, and any separately granted DUR6 station memberships.
insert into public.stations(organization_id,code,name)
values('c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid,'DUR6','Temecula')
on conflict(organization_id,code) do nothing;

-- Only newly created mirror grants are recorded here. Existing independent
-- DUR6 grants are never claimed and therefore never removed by this mirror.
create table if not exists public.relayops_station_access_mirrors (
  station_id uuid not null references public.stations(id) on delete cascade,
  source_station_id uuid not null references public.stations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(station_id,user_id),
  constraint relayops_station_access_mirrors_home_only check (
    source_station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
    and station_id<>source_station_id
  )
);
alter table public.relayops_station_access_mirrors enable row level security;
revoke all on public.relayops_station_access_mirrors from public,anon,authenticated;

create or replace function public.relayops_mirror_djt6_access_to_dur6(target_user uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $mirror$
declare
  dur6_id uuid;
  inserted_station uuid;
begin
  if target_user is null then return; end if;
  -- Serializes a grant/revoke for the same person only, not daily operations.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('relayops-djt6-dur6-access:'||target_user::text,0));
  select s.id into dur6_id
  from public.stations s
  where s.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid and s.code='DUR6';
  if dur6_id is null or not exists (
    select 1 from public.station_memberships sm
    join public.stations home on home.id=sm.station_id
    join public.memberships m on m.user_id=sm.user_id and m.organization_id=home.organization_id
    where sm.station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
      and home.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
      and home.code='DJT6' and sm.user_id=target_user and m.active
  ) then return; end if;

  insert into public.station_memberships(station_id,user_id)
  values(dur6_id,target_user)
  on conflict(station_id,user_id) do nothing
  returning station_id into inserted_station;

  if inserted_station is not null then
    insert into public.relayops_station_access_mirrors(station_id,source_station_id,user_id)
    values(dur6_id,'d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid,target_user)
    on conflict(station_id,user_id) do nothing;
  end if;
end;
$mirror$;
revoke all on function public.relayops_mirror_djt6_access_to_dur6(uuid) from public,anon,authenticated;

create or replace function public.relayops_sync_dual_station_membership()
returns trigger
language plpgsql
security definer
set search_path = ''
as $sync$
declare
  dur6_id uuid;
  removed_old_key boolean := false;
begin
  -- ON DELETE / PK changes revoke only an access row that this mirror owns.
  -- A pre-existing independent DUR6 grant has no marker and is preserved.
  if tg_op in ('DELETE','UPDATE') then
    if tg_op='DELETE' then
      removed_old_key := true;
    else
      removed_old_key := new.station_id is distinct from old.station_id
                         or new.user_id is distinct from old.user_id;
    end if;
    if old.station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
       and removed_old_key then
      perform pg_catalog.pg_advisory_xact_lock(
        pg_catalog.hashtextextended('relayops-djt6-dur6-access:'||old.user_id::text,0));
      select id into dur6_id from public.stations
      where organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid and code='DUR6';
      delete from public.station_memberships sm
      where sm.station_id=dur6_id and sm.user_id=old.user_id
        and exists (
          select 1 from public.relayops_station_access_mirrors owned
          where owned.station_id=sm.station_id and owned.user_id=sm.user_id
            and owned.source_station_id=old.station_id
        );
      delete from public.relayops_station_access_mirrors
      where station_id=dur6_id and source_station_id=old.station_id and user_id=old.user_id;
    end if;
    -- An explicit DUR6 deletion or PK change also discards its ownership
    -- marker, so a later independent DUR6 grant is not claimed by old history.
    if removed_old_key then
      delete from public.relayops_station_access_mirrors
      where station_id=old.station_id and user_id=old.user_id;
    end if;
  end if;
  if tg_op in ('INSERT','UPDATE') then
    if new.station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid then
      perform public.relayops_mirror_djt6_access_to_dur6(new.user_id);
    end if;
    return new;
  end if;
  return old;
end;
$sync$;
revoke all on function public.relayops_sync_dual_station_membership() from public,anon,authenticated;
drop trigger if exists relayops_dual_station_membership on public.station_memberships;
create trigger relayops_dual_station_membership
after insert or update or delete on public.station_memberships
for each row execute function public.relayops_sync_dual_station_membership();

-- Inactive memberships are not enabled or copied. If the owner later enables
-- one that still has DJT6 access, its DUR6 grant is created then. Role is never
-- modified: viewers remain viewers, and owners/ops retain existing org access.
create or replace function public.relayops_sync_dual_station_activation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $activation$
begin
  if new.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid and new.active then
    perform public.relayops_mirror_djt6_access_to_dur6(new.user_id);
  end if;
  return new;
end;
$activation$;
revoke all on function public.relayops_sync_dual_station_activation() from public,anon,authenticated;
drop trigger if exists relayops_dual_station_activation on public.memberships;
create trigger relayops_dual_station_activation
after insert or update of active,organization_id,user_id on public.memberships
for each row execute function public.relayops_sync_dual_station_activation();

-- Pin anonymous shared-link provisioning to the EXISTING DJT6 link. Never use
-- "newest enabled station", create another link/PIN row, or reactivate a
-- disabled membership. The shared-link policy remains otherwise unchanged.
create or replace function public.provision_relayops_link_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $provision$
begin
  if not coalesce(new.is_anonymous,false) then return new; end if;
  if not exists (
    select 1 from public.relayops_link_access access
    join public.stations home on home.id=access.station_id and home.organization_id=access.organization_id
    where access.station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
      and access.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
      and access.enabled and home.code='DJT6'
  ) then return new; end if;

  insert into public.memberships(organization_id,user_id,role,display_name,active)
  values('c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid,new.id,'dispatcher','Shared link dispatcher',true)
  on conflict(organization_id,user_id) do nothing;

  if exists (
    select 1 from public.memberships
    where organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
      and user_id=new.id and active
  ) then
    insert into public.station_memberships(station_id,user_id)
    values('d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid,new.id)
    on conflict(station_id,user_id) do nothing;
    perform public.relayops_mirror_djt6_access_to_dur6(new.id);
  end if;
  return new;
end;
$provision$;
revoke all on function public.provision_relayops_link_user() from public,anon,authenticated;

-- Existing auth trigger is retained unchanged. Refuse an incomplete install
-- rather than silently leaving new shared-link dispatchers without access.
do $auth_trigger$
begin
  if not exists (
    select 1 from pg_catalog.pg_trigger t
    where t.tgrelid='auth.users'::regclass and not t.tgisinternal
      and t.tgfoid='public.provision_relayops_link_user()'::regprocedure
      and t.tgenabled in ('O','A')
  ) then
    raise exception 'DUR6 setup stopped: enabled shared-link auth provisioning trigger is missing';
  end if;
end;
$auth_trigger$;

do $backfill$
declare eligible_user record;
begin
  for eligible_user in
    select sm.user_id from public.station_memberships sm
    join public.memberships m on m.user_id=sm.user_id
      and m.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
    where sm.station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid and m.active
    order by sm.user_id
  loop
    perform public.relayops_mirror_djt6_access_to_dur6(eligible_user.user_id);
  end loop;
end;
$backfill$;

-- Publish only the station identity and aggregate access counts. Use this
-- returned UUID to configure the DUR6 client; never reuse the DJT6 UUID.
select s.id as dur6_station_id, s.organization_id, s.code, s.name,
       (select count(*) from public.station_memberships sm
        join public.memberships m on m.user_id=sm.user_id and m.organization_id=s.organization_id
        where sm.station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid and m.active) as active_djt6_explicit_memberships,
       (select count(*) from public.station_memberships sm
        join public.memberships m on m.user_id=sm.user_id and m.organization_id=s.organization_id
        where sm.station_id=s.id and m.active) as active_dur6_explicit_memberships,
       (select count(*) from public.relayops_station_access_mirrors owned
        where owned.station_id=s.id) as mirror_owned_memberships
from public.stations s
where s.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid and s.code='DUR6';

commit;
