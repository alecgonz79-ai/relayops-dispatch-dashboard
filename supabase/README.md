# RelayOps shared cloud setup

RelayOps uses automatic Supabase anonymous sessions for synchronized station data, realtime updates, and audit history. Anyone with the published dashboard link can join the shared station workspace without an email sign-in. Imported employee contacts are therefore visible to anyone who receives that link.

## Owner setup

1. Create a Supabase project for Legacy Logistics / LLOL.
2. In **SQL Editor**, run `schema.sql` once. Existing projects created before July 14, 2026 must also run `migrations/20260714_owner_member_access.sql` once.
3. Run `migrations/20260720_link_access_admin_pin.sql` once.
4. In **Authentication → Sign In / Providers**, enable **Allow anonymous sign-ins**.
5. Copy Project URL and the public anon key from **Project Settings → API** into `config.js`.
6. Commit and deploy `config.js`. Never place the service-role key, Admin PIN, Amazon cookies, or FleetOS cookies in this repository.

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

## Shared-link access and Admin PIN

The link-access migration provisions every new anonymous Supabase user as a dispatcher for the configured organization and station. The browser persists that anonymous session, so refreshes return to the same synchronized workspace without sending email.

The Admin screen uses a server-verified four-digit PIN. The public JavaScript never contains the PIN; Supabase stores only a password hash and rate-limits failed attempts. The Admin PIN gates the interface, while daily operational writes remain available to anyone with the shared dashboard link.

Treat the dashboard URL as operationally sensitive. Anyone who receives it can view and edit shared route, driver, phone, fleet, device, and parking data.

## What synchronizes

- Morning Sheet rows and published roster state
- Drivers & Team contacts and removals
- Fleet imports, operational/grounded status, battery state, and name mappings
- Device and Portable assignments and custom rows
- Van Parking layout, battery entries, and last-updated value
- Station/DSP settings needed by daily operations
- Coaching review queue and shared message template

Each day is stored as a versioned station workspace. Writes use an expected revision, reload newer work on a conflict, publish realtime changes to open dispatcher sessions, and write an audit event.

Shared links include `?date=YYYY-MM-DD`, so every dispatcher opens the same operational day. The anonymous browser session is restricted to the configured station and is automatically restored. A new date is initialized through the same synchronized dispatcher workspace.

## Authenticated Fleet refresh

Deploy `functions/fleet-live-proxy` when live Fleet refresh is enabled. The public dashboard sends its automatic shared-link Supabase access token to this function; the function validates active organization membership and station access before calling the private Fleet connector.

Configure `FLEET_PROXY_ALLOWED_ORIGINS`, `FLEET_CONNECTOR_URL`, and `FLEET_CONNECTOR_TOKEN` as Supabase function secrets. Never place the connector token, portal cookies, passwords, or upstream URLs in public dashboard files. Full setup: [`functions/fleet-live-proxy/README.md`](functions/fleet-live-proxy/README.md).
