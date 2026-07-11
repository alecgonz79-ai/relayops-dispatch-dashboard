# RelayOps shared cloud setup

RelayOps uses Supabase for email authentication, database-enforced roles, synchronized station data, realtime updates, and audit history. Imported employee contacts are protected by row-level security and are no longer limited to one browser after this setup is completed.

## Owner setup

1. Create a Supabase project for Legacy Logistics / LLOL.
2. In **SQL Editor**, run `schema.sql` once.
3. In **Authentication → URL Configuration**, add the exact GitHub Pages dashboard URL as a redirect URL.
4. In **Authentication → Users**, invite the owner email first.
5. Run the bootstrap SQL below after replacing the owner user UUID with the UUID from Authentication → Users.
6. Copy Project URL and the public anon key from **Project Settings → API** into `config.js`.
7. Commit and deploy `config.js`. Never place the service-role key, passwords, Amazon cookies, or FleetOS cookies in this repository.

## First organization bootstrap

```sql
with new_org as (
  insert into public.organizations(name,dsp_code)
  values ('Legacy Logistics','LLOL') returning id
), new_station as (
  insert into public.stations(organization_id,code,name)
  select id,'DJT6','DJT6' from new_org returning id,organization_id
)
insert into public.memberships(organization_id,user_id,role,display_name)
select organization_id,'OWNER_AUTH_USER_UUID','owner','Alec Gonzalez' from new_station;

insert into public.station_memberships(station_id,user_id)
select id,'OWNER_AUTH_USER_UUID' from public.stations where code='DJT6';
```

Copy the resulting organization and station UUIDs into `config.js`:

```sql
select o.id organization_id,s.id station_id,o.dsp_code,s.code
from public.organizations o join public.stations s on s.organization_id=o.id;
```

## Dispatcher accounts

Invite each dispatcher in Authentication → Users, then add their user UUID:

```sql
insert into public.memberships(organization_id,user_id,role,display_name)
values ('ORGANIZATION_UUID','DISPATCHER_AUTH_USER_UUID','dispatcher','Dispatcher Name');

insert into public.station_memberships(station_id,user_id)
values ('STATION_UUID','DISPATCHER_AUTH_USER_UUID');
```

Allowed roles are `owner`, `ops_manager`, `dispatcher`, `fleet_lead`, and `viewer`. Viewers cannot modify the shared workspace. Owner and ops-manager membership changes are enforced in the database rather than only hidden in the interface.

## What synchronizes

- Morning Sheet rows and published roster state
- Drivers & Team contacts and removals
- Fleet imports, operational/grounded status, battery state, and name mappings
- Device and Portable assignments and custom rows
- Van Parking layout, battery entries, and last-updated value
- Station/DSP settings needed by daily operations

Each day is stored as a versioned station workspace. Writes use an expected revision, reload newer work on a conflict, publish realtime changes to open dispatcher sessions, and write an audit event.
