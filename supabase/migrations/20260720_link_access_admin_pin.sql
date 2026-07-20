-- RelayOps link access + server-verified Admin PIN.
-- Anonymous Auth must also be enabled in Authentication -> Sign In / Providers.

create table if not exists public.relayops_link_access (
  station_id uuid primary key references public.stations(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  enabled boolean not null default true,
  admin_pin_hash text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.relayops_admin_pin_attempts (
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  failed_attempts integer not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, organization_id)
);

create table if not exists public.relayops_admin_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  primary key (user_id, organization_id)
);

alter table public.relayops_link_access enable row level security;
alter table public.relayops_admin_pin_attempts enable row level security;
alter table public.relayops_admin_sessions enable row level security;

revoke all on public.relayops_link_access from anon, authenticated;
revoke all on public.relayops_admin_pin_attempts from anon, authenticated;
revoke all on public.relayops_admin_sessions from anon, authenticated;

insert into public.relayops_link_access(station_id, organization_id, enabled, admin_pin_hash)
values (
  'd70f25c4-be18-45be-b13d-49e3bcb9b124',
  'c98e010b-b1a5-4757-92fa-8a8755b119bc',
  true,
  '$2a$06$yxIUhnS8E9QVhM2p/bssjOxHTfJ8.Ep37krtd3gQ83fP3kZV985RW'
)
on conflict (station_id) do update
set organization_id=excluded.organization_id,
    enabled=excluded.enabled,
    admin_pin_hash=excluded.admin_pin_hash,
    updated_at=now();

create or replace function public.provision_relayops_link_user()
returns trigger
language plpgsql
security definer
set search_path=public,auth
as $$
declare access_row record;
begin
  if not coalesce(new.is_anonymous,false) then return new; end if;
  select organization_id,station_id into access_row
  from public.relayops_link_access where enabled order by updated_at desc limit 1;
  if access_row.organization_id is null then return new; end if;

  insert into public.memberships(organization_id,user_id,role,display_name,active)
  values(access_row.organization_id,new.id,'dispatcher','Shared link dispatcher',true)
  on conflict(organization_id,user_id) do update set active=true;

  insert into public.station_memberships(station_id,user_id)
  values(access_row.station_id,new.id)
  on conflict(station_id,user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists relayops_provision_link_user on auth.users;
create trigger relayops_provision_link_user
after insert on auth.users
for each row execute function public.provision_relayops_link_user();

revoke all on function public.provision_relayops_link_user() from public,anon,authenticated;

create or replace function public.unlock_relayops_admin(candidate_pin text,target_org uuid)
returns boolean
language plpgsql
security definer
set search_path=public,auth
as $$
declare access_row record; attempt_row record; next_failures integer;
begin
  if auth.uid() is null or candidate_pin !~ '^[0-9]{4}$' then return false; end if;
  if not exists(select 1 from public.memberships where organization_id=target_org and user_id=auth.uid() and active) then return false; end if;

  select * into access_row from public.relayops_link_access
  where organization_id=target_org and enabled order by updated_at desc limit 1;
  if access_row.admin_pin_hash is null then return false; end if;

  select * into attempt_row from public.relayops_admin_pin_attempts
  where user_id=auth.uid() and organization_id=target_org;
  if attempt_row.locked_until is not null and attempt_row.locked_until>now() then return false; end if;

  if crypt(candidate_pin,access_row.admin_pin_hash)=access_row.admin_pin_hash then
    delete from public.relayops_admin_pin_attempts where user_id=auth.uid() and organization_id=target_org;
    insert into public.relayops_admin_sessions(user_id,organization_id,expires_at)
    values(auth.uid(),target_org,now()+interval '8 hours')
    on conflict(user_id,organization_id) do update set expires_at=excluded.expires_at,created_at=now();
    return true;
  end if;

  next_failures=coalesce(attempt_row.failed_attempts,0)+1;
  insert into public.relayops_admin_pin_attempts(user_id,organization_id,failed_attempts,locked_until,updated_at)
  values(auth.uid(),target_org,case when next_failures>=5 then 0 else next_failures end,case when next_failures>=5 then now()+interval '15 minutes' else null end,now())
  on conflict(user_id,organization_id) do update
  set failed_attempts=excluded.failed_attempts,locked_until=excluded.locked_until,updated_at=now();
  return false;
end;
$$;

create or replace function public.relayops_admin_status(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path=public,auth
as $$
  select auth.uid() is not null and exists(
    select 1 from public.relayops_admin_sessions s
    join public.memberships m on m.organization_id=s.organization_id and m.user_id=s.user_id and m.active
    where s.organization_id=target_org and s.user_id=auth.uid() and s.expires_at>now()
  );
$$;

create or replace function public.lock_relayops_admin(target_org uuid)
returns void
language sql
security definer
set search_path=public,auth
as $$ delete from public.relayops_admin_sessions where organization_id=target_org and user_id=auth.uid(); $$;

revoke all on function public.unlock_relayops_admin(text,uuid) from public,anon;
revoke all on function public.relayops_admin_status(uuid) from public,anon;
revoke all on function public.lock_relayops_admin(uuid) from public,anon;
grant execute on function public.unlock_relayops_admin(text,uuid) to authenticated;
grant execute on function public.relayops_admin_status(uuid) to authenticated;
grant execute on function public.lock_relayops_admin(uuid) to authenticated;
