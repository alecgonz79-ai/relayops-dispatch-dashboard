-- READ ONLY. Run before 20260907_dual_station_shared_access.sql.
-- These results contain no email addresses, user IDs, PIN hashes, or tokens.
begin read only;

select s.id as station_id, s.organization_id, s.code, s.name,
       (s.id = 'd70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid) as pinned_home_station,
       (select count(*) from public.station_memberships sm
        join public.memberships m on m.user_id=sm.user_id and m.organization_id=s.organization_id
        where sm.station_id=s.id and m.active) as active_explicit_memberships,
       (select count(*) from public.memberships m
        where m.organization_id=s.organization_id and m.active
        and m.role in ('owner','ops_manager')) as active_org_wide_managers
from public.stations s
where s.organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid
  and (s.code in ('DJT6','DUR6') or s.id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid)
order by s.code;

select station_id, organization_id, enabled,
       (station_id='d70f25c4-be18-45be-b13d-49e3bcb9b124'::uuid
        and organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid) as pinned_home_link
from public.relayops_link_access
where organization_id='c98e010b-b1a5-4757-92fa-8a8755b119bc'::uuid;

select table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_schema='public'
  and table_name in ('stations','memberships','station_memberships','relayops_link_access')
order by table_name, ordinal_position;

-- Inspect every deployed provisioning variant, including a recovery RPC that
-- may exist on the server even when not present in the repository. Stop and
-- reconcile unexpected function bodies before applying the migration.
select p.proname, pg_catalog.pg_get_function_identity_arguments(p.oid) as arguments,
       p.prosecdef as security_definer,
       pg_catalog.pg_get_functiondef(p.oid) as function_definition
from pg_catalog.pg_proc p
join pg_catalog.pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
  and (p.proname in ('provision_relayops_link_user','ensure_relayops_link_access','can_access_station')
       or p.proname like 'provision_relayops_link_%'
       or p.proname like 'ensure_relayops_link_%')
order by p.proname, arguments;

select n.nspname as table_schema, c.relname as table_name, t.tgname,
       pg_catalog.pg_get_triggerdef(t.oid) as trigger_definition
from pg_catalog.pg_trigger t
join pg_catalog.pg_class c on c.oid=t.tgrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where not t.tgisinternal
  and ((n.nspname='auth' and c.relname='users')
       or (n.nspname='public' and c.relname in ('memberships','station_memberships')))
order by n.nspname, c.relname, t.tgname;

commit;
