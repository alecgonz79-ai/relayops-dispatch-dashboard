# DJT6 / DUR6 CPU safeguards

Verified on September 8, 2026 against the published dashboard and the shared Supabase project. Both stations already use the same controls; no live settings, dispatch records, connector behavior, or compute plan were changed for this verification.

## One policy, separate station data

`supabase/config.js` defines the common policy. `station-workspace.js` captures that configuration and changes only the active station ID. Do not create a second copy of the sync settings under DUR6. Each station keeps separate snapshot rows, revisions, and pending edits while sharing the project's compute capacity.

| Protection | DJT6 and DUR6 |
| --- | --- |
| Active revision checks | About every 60 seconds, with randomized timing |
| Idle revision checks | About every 5 minutes after 2 minutes without activity |
| Persistent station revision checks | Every 10 minutes when due |
| Hidden tabs | No routine polling or autosaves; pending edits remain queued |
| Save batching | 5-second debounce; one in-flight save per client |
| Membership checks | 5-minute cache; concurrent requests share one check |
| Ordinary request / save timeout | 20 / 30 seconds |
| Automatic save retries | At most 5 after the initial attempt; 30, 60, 120, 300, 300 seconds |
| Payload limits | 2 MiB daily; 4 MiB persistent, enforced client-side and server-side |
| Unchanged data | No snapshot write; routine checks download revisions, not full payloads |
| Realtime snapshot channels | Not used; snapshot table absent from Realtime publications |
| Expired dated links | No automatic polling or saves |
| Daily expiration | One all-station job covers Los Angeles midnight, preserving current/future days and the permanent station row |

Focus/reconnection checks and manual saves are intentional exceptions to routine polling/batching. No setting promises a fixed CPU percentage or instantaneous remote updates. Do not shorten the polling interval to imitate Realtime.

## Live verification evidence

At approximately 12:46 PM Pacific on September 8:

- Refreshed Supabase overview: healthy, CPU 3%, RAM 54%, 9 of 60 connections. This is a point-in-time observation, not a continuous monitor.
- The installed v5 writer has the same 2/4 MiB limits, compact conflict responses, and unchanged-data fast path for both station IDs. v4 delegates to v5; original and v3 writers are not executable by authenticated clients.
- Snapshot and membership lookup indexes are installed.
- `relayops-daily-workspace-expiration` is active with schedule `0 7,8 * * *` (UTC). The Los Angeles date predicate handles daylight saving time; the second pass is harmless. Its most recent run succeeded at 08:00 UTC on September 8.
- Both DJT6 and DUR6 had **zero expired daily snapshots**. The installed prune function has no station filter and excludes the permanent `2000-01-01` row.
- `workspace_snapshots` belongs to no Realtime publication.

Do not add a duplicate DUR6 cleanup job: the existing job already covers it. Do not clear current-day work to lower CPU.

## Release checks

`tests/station-cpu-parity.cjs` loads the actual public configuration, station resolver, and cloud client for each station. Deterministic tests cover batching, membership caching, hidden-tab queues, revision-only polling, v5 conflicts, retry exhaustion, payload rejection before RPC, and dormant historical dates. A shared-backend scenario proves simultaneous DJT6/DUR6 edits use separate station/date rows without conflict or retry fanout.

`tests/station-cpu-sql-parity.cjs` checks station-independent writer/expiration definitions, indexes, stable named jobs, safe cutoff predicates, and the v4 compatibility brake. These are source contracts, not proof that an optional migration is installed. Both tests run in the existing Pages release gate.

## Optional log retention is not enabled

Read-only inspection found that `prune_relayops_audit_log()` and its optional cron job are **not installed**. The audit table was about 1.1 MB including indexes, with approximately 4,806 live rows. This does not affect station parity or the functioning daily-import cleanup.

The existing optional migration would delete workspace autosave/retry logs after 14 days and other audit logs after 180 days, without deleting dispatch snapshots. Do not install or run it silently: confirm those audit-history retention periods with the owner first.

## If resource warnings return

Review project CPU, database latency, active connections, slow-query statistics, and the latest cleanup run before changing sync behavior. Keep unsaved queues and station isolation intact. Identical limits reduce avoidable requests, but both stations' legitimate traffic still adds to one project's workload. Capacity changes require a separate owner decision.

Reference: [Supabase high CPU guidance](https://supabase.com/docs/guides/troubleshooting/high-cpu-usage) and [database inspection tools](https://supabase.com/docs/guides/observability/inspect).
