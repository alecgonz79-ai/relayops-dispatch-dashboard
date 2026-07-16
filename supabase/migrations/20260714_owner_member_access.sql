-- Tighten member access changes for existing RelayOps Supabase projects.
-- Run once in the Supabase SQL editor after the original schema.sql.

drop policy if exists membership_admin on public.memberships;
drop policy if exists membership_owner_insert on public.memberships;
drop policy if exists membership_owner_update on public.memberships;
drop policy if exists station_membership_admin on public.station_memberships;
drop policy if exists station_membership_owner_admin on public.station_memberships;

create policy membership_owner_insert on public.memberships
for insert
with check (
  public.has_org_role(organization_id,array['owner']::public.relayops_role[])
  and role<>'owner'
);

create policy membership_owner_update on public.memberships
for update
using (
  public.has_org_role(organization_id,array['owner']::public.relayops_role[])
  and role<>'owner'
)
with check (
  public.has_org_role(organization_id,array['owner']::public.relayops_role[])
  and role<>'owner'
);

create policy station_membership_owner_admin on public.station_memberships
for all
using (
  exists(
    select 1 from public.stations s
    where s.id=station_id
      and public.has_org_role(s.organization_id,array['owner']::public.relayops_role[])
  )
)
with check (
  exists(
    select 1 from public.stations s
    where s.id=station_id
      and public.has_org_role(s.organization_id,array['owner']::public.relayops_role[])
  )
);
