# DJT6 / DUR6 shared dispatcher access

The approved policy is the same existing dispatcher access at both stations,
with separate station UUIDs and operational workspaces. This migration does not
publish the dashboard and does not alter either Google connector.

## Verified production migration — September 7, 2026

The deployment operator confirmed a successful live application of
`20260907_dual_station_shared_access.sql` after reviewing the read-only preflight.
The preflight matched the repository schema and authorization function, found
only the existing `relayops_provision_link_user` auth trigger/function, and found
one enabled shared-link configuration pinned to the expected DJT6 station.
No unreviewed `ensure_relayops_link_*` recovery function was present.

Verified result:

- Organization: `c98e010b-b1a5-4757-92fa-8a8755b119bc`.
- DJT6 station: `d70f25c4-be18-45be-b13d-49e3bcb9b124`.
- Generated DUR6 station: `4a35bc36-983e-4ac7-bcd1-6b0d718f7c4f`.
- Active explicit memberships after migration: DJT6 **375**, DUR6 **375**.
- The approved policy is the same existing DJT6 dispatcher access at DUR6,
  without organization-role promotion or disabled-user reactivation.

This records production provisioning, not frontend publication or a successful
Google transfer. Final dispatcher/release tests and publication are pending.
The separate DUR6 Google confirmation connector remains installed with writes
disabled pending renewed Google authorization and supervised transfer/restore
verification. No successful live DUR6 Google transfer is recorded.

## Deployment sequence

1. Run `dual_station_preflight.sql` in the intended Supabase project's SQL
   editor. It is read-only. Confirm organization
   `c98e010b-b1a5-4757-92fa-8a8755b119bc`, home station
   `d70f25c4-be18-45be-b13d-49e3bcb9b124`, code `DJT6`, and the existing shared-link
   row. Inspect the live function definitions and triggers. If a live
   `ensure_relayops_link_*` function or another provisioner exists, reconcile it
   first; the migration deliberately refuses an unreviewed alternate path.
2. Run the entire `migrations/20260907_dual_station_shared_access.sql` file as
   the migration owner. It uses one transaction and bounded lock/statement
   timeouts. A failure rolls back the complete change; do not run partial
   selections or remove a failed guard.
3. Record the returned `dur6_station_id` and aggregate membership counts.
   The UUID is database-generated and is preserved if the migration is rerun.
   Configure the DUR6 client with that UUID, never with DJT6's UUID.
4. Verify with fresh dispatcher sessions that both station tabs are visible,
   DUR6 starts with its own data, and station changes wait for outstanding saves
   and uploads. A viewer must remain read-only at both stations. Verify the
   existing DJT6 save/reload flow before releasing the station-aware client.

## Safety boundaries

- Existing active DJT6 station memberships receive DUR6 membership. Organization
  roles are unchanged; a viewer does not become a dispatcher. Owners and
  operations managers retain their existing organization-wide access.
- Disabled memberships remain disabled and are not copied by the backfill.
  If an owner later re-enables one, its existing DJT6 station grant is mirrored
  at that time. Deactivation continues to block both stations through the
  existing active-membership authorization checks.
- Future explicit DJT6 grants are mirrored. A private ownership table records
  only DUR6 rows actually created by this mechanism. Removing a DJT6 grant
  removes its mirror-owned DUR6 grant, but not an independently existing DUR6
  grant. Removing a DUR6 row clears its mirror ownership, so a later independent
  DUR6 grant is not accidentally removed by old provenance.
- Anonymous shared-link users are provisioned from the exact existing DJT6 link
  only when that link is enabled. They receive the existing default dispatcher
  role only for a new organization membership; conflicts never reactivate or
  promote an existing membership. Newly granted home access is mirrored to DUR6.
- No DUR6 `relayops_link_access` row is created. The DJT6 link, PIN hash, PIN
  attempt counters, admin sessions, and existing Admin PIN functions are
  untouched. The auth trigger is retained; its existing function is replaced
  with a station-pinned implementation.
- No snapshot, import, equipment inventory, dated workspace, or audit history
  is copied or deleted. DUR6 has no seeded operational payload. No daily writer,
  cleanup job, retention policy, or row-level authorization policy is changed.
- Mirror helpers are security-definer functions with an empty search path and
  no public/anonymous/authenticated execution grant. The provenance table has
  row-level security enabled and no client access. The helpers run only from
  reviewed database triggers or the migration owner, not browser RPCs.
- There is no new polling or scheduled job. Mirroring runs only for membership
  changes and account provisioning, not normal daily saves or reads.

## Verification status

`node tests/dual-station-shared-access-sql.cjs` checks SQL safety contracts and a
reference access-policy model, including reruns, viewers, disabled users,
independent DUR6 access, revocations, future grants, and link provisioning. This
test does **not** execute PostgreSQL and is not proof of a live deployment.
The operator's verified preflight and migration result are recorded above.
Dispatcher-session and release checks remain separate from that SQL result.

## Recovery

If the transaction fails, PostgreSQL rolls it back. After a successful rollout,
prefer fixing the station-aware client or returning its default navigation to
DJT6 over deleting DUR6 or its data. Do not blindly restore the old "newest
enabled link" provisioning function. Any access-policy rollback should be a
separately reviewed migration that preserves independently granted memberships
and operational snapshots; this change intentionally provides no destructive
automatic rollback.
