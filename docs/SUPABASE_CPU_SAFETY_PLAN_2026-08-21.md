# Supabase CPU safety and proof plan — 2026-08-21

## Incident evidence

At 2:09 PM Pacific, the production project reported 98.4–100% CPU on Nano compute. Unified Logs showed about 309,000 PostgreSQL errors in the preceding hour, almost all `revision_conflict` from `save_workspace_snapshot_v4`—about 86 rejected writes per second. Four PostgREST workers were continuously executing that RPC. The normal API surface showed only tens of successful requests, the database was about 0.03 GB, RAM was about 434 MB used, and the active workspace payloads were only about 67 KB daily and 109 KB permanent. This rules out database size and ordinary dispatcher polling as the primary cause.

The client conflict path loaded the newer snapshot and that load immediately scheduled another save before the intended 30-second conflict backoff was armed. Concurrent tabs could therefore keep resubmitting stale revisions at database speed.

## Controls in this release

1. Conflict hydration may merge the newer workspace but cannot schedule an immediate save. One jittered, capped retry owns the next attempt.
2. Writer v5 reports normal conflicts as compact JSON data rather than PostgreSQL errors. Successful saves return only revision metadata, never a duplicate of the full uploaded payload.
3. The writer authorizes once with a locked search path, retains optimistic row locking and the midnight advisory lock, and enforces the existing 2 MB daily / 4 MB permanent limits server-side.
4. The v4 compatibility circuit breaker lets already-open tabs finish non-conflicting saves. A conflicting old tab receives a negative revision sentinel, stops retrying, and cannot overwrite the newer row; refreshing moves it to v5.
5. A failed daily load stops before requesting permanent settings.
6. Expired dated links load once but do not poll, autosave, or resume-save. New links copied for today omit the date and therefore follow the current Los Angeles operating day.
7. Realtime stays disabled for the large workspace row. Current 60-second active and 5-minute idle revision polling remains unchanged for today's dashboard.

## No-disruption rollout

1. Publish the browser first. It prefers v5 but safely falls back to v4 while the migration is not yet installed.
2. Verify a fresh production page can load routes, PAYCOM, Fleet, Devices, Parking, Whiparound, contacts, aliases, and permanent station settings.
3. Install `20260821_cpu_safe_workspace_writer_v5.sql`. This is additive; it does not delete workspace data or restart the database.
4. Open two independent dispatcher sessions on today's date. Change separate route/device fields at nearly the same time and verify both converge after at most one delayed conflict retry.
5. Keep the v4 compatibility brake during the observation period. Do not revoke it while an older tab may still be open.

## Automated release gates

The release must pass all JavaScript syntax checks and every runnable `tests/*.cjs` suite. `tests/cloud-cpu-usage-proof.cjs` enforces these budgets:

- Fixed startup request count for two dispatchers.
- Zero database traffic for repeated same-user auth events.
- One access check for overlapping reconnects.
- Fifty rapid visible edits collapse into one write.
- Hidden tabs perform zero reads and writes.
- A conflict arms one 30-second retry; it cannot immediately recurse.
- Twelve idle minutes use only four daily and one permanent revision checks.
- A stalled write stops after the configured retry cap.
- An expired dated link creates no poll or autosave timer.

## Live acceptance thresholds

Observe Supabase Unified Logs and Database Observability immediately after migration, again after 15 minutes, after 60 minutes, and through the next full dispatch shift.

Pass criteria:

- `revision_conflict` error rate falls from about 309,000/hour to zero for v5 and does not reappear as another repeated error.
- CPU trends below 50% after the queued v4 requests drain and remains below 80% during normal two-dispatcher work.
- No sustained set of PostgREST workers continuously executes the save RPC.
- Each user edit reaches both sessions; no route, driver, import, equipment, fleet, parking, Whiparound, alias, or permanent setting disappears.
- No “Database busy,” reconnect timeout, or sync-error toast repeats during the two-dispatcher proof.

## Stop and rollback conditions

Stop the rollout if any core state fails to converge, a successful save returns the wrong revision, authorization changes, or CPU/error volume rises after v5.

Rollback is browser-first: republish the previous browser commit while leaving v5 installed but unused. The additive v5 function does not alter stored rows. Do not restore the exception-throwing v4 conflict behavior during an active storm; keep the compatibility brake until clients are confirmed refreshed. Workspace snapshots should never be deleted as part of rollback.

## Later maintenance, only after the incident is stable

- Measure anonymous-user age and clean users older than 30 days in small off-hours batches after resolving audit/snapshot foreign keys.
- Add bounded audit pruning only if production proves its retention job is absent or behind.
- Consider a station-access RPC and per-tab offline queue keys as separate, independently tested releases.
- Do not slow today's collaboration poll or reduce shared undo depth until a full-shift proof shows those changes are necessary.
