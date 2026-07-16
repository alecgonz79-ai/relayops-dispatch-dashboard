# RelayOps dispatcher dashboard build plan

## Product objective

Create one dependable opening-operations workspace where a dispatcher can import daily files, review exceptions, assign safe vehicles and equipment, send only approved values into the fixed Google Ops Log, and share current state with the rest of the station team.

The operating principle is **simple on the surface, strict underneath**. Routine actions should take one obvious button; dangerous or ambiguous changes must fail visibly instead of silently changing another wave, route, driver, or vehicle.

## Workstream ownership

### Lead operator and integration

- Define safety invariants and release gates.
- Keep worker file ownership separate and review every merged change.
- Protect publishing and authenticated connector boundaries.
- Run the complete automated suite plus real desktop/mobile browser checks.
- Maintain the local preview and decide when a build is ready to publish.

### Dispatch workflow and Google Sheets integration

- Preserve stable Wave 1–5, Adhoc, Helper, and DSP slot identities.
- Distinguish full-sheet replacement from filtered partial updates.
- Prevent a filtered send from clearing unrelated routes or waves.
- Match Whiparound writes by route, canonical driver, and fixed wave slot.
- Match RTS writes by route and fixed wave slot.
- Reject stale Paycom dates and contradictory daily roster states.
- Keep the embedded Apps Script identical to the downloadable source.

### Product design and accessibility

- Contain spreadsheet and parking-map scrolling inside their own surfaces.
- Keep the page shell free of horizontal overflow.
- Use clear tool groups, restrained Legacy blue accents, and consistent hierarchy.
- Provide touch-sized controls, keyboard focus, reduced-motion behavior, and viewport-safe dialogs/toasts.
- Preserve the exact Morning Sheet and Picklist geometry required by the Ops Log.

### QA and release engineering

- Turn every serious audit finding into a repeatable regression test.
- Cover stable wave identity, partial-write scope, route/driver identity, stale dates, mutually exclusive roster buckets, and mobile overflow.
- Exercise the real Paycom HTML/XLS export when it is available locally.
- Require JavaScript syntax checks, all test files, and `git diff --check` to pass.

### Fleet safety and assignment

- Use one eligibility policy for every automatic vehicle assignment path.
- Exclude grounded, inactive, issue-blocked, low-battery, and unverified-battery EVs.
- Never repeat a vehicle when the safe pool is smaller than the route count.
- Represent unknown charge as unknown rather than inventing a usable percentage.
- Preserve manual override capability while keeping warnings visible.

## Safety invariants

1. A filtered Google send may update only the routes explicitly present in its payload.
2. Route, driver, and fixed wave-slot identity must agree before Whiparound values are written.
3. Route and fixed wave-slot identity must agree before Planned RTS is written.
4. A Paycom import dated for another operation day must not populate today's roster.
5. One person cannot remain simultaneously marked as backup, helper, reduction, stay-home, call-off replacement, and on-route.
6. Automatic fleet assignment must never use a grounded or inactive vehicle.
7. Unknown FleetOS charge is not a dispatch-ready battery reading.
8. The public deployment artifact must contain only the explicit website allowlist.
9. Authenticated Amazon/Rivian cookies must never be sent to caller-provided URLs.
10. The browser UI must remain usable at phone width without shrinking the spreadsheet itself into unreadable cells.

## Release sequence

1. Run architecture and dirty-worktree checks.
2. Apply worker changes in non-overlapping file areas.
3. Review source diffs against the safety invariants.
4. Run `node --check` on browser and connector JavaScript.
5. Run every `tests/*.cjs` regression.
6. Run deployment/live-connector security contracts.
7. Reload the local preview and inspect Morning Sheet, Roster, Fleet Health, Parking, Whiparound, dialogs, and responsive shell behavior.
8. Bump browser cache versions only after the final integration is stable.
9. Publish only after the preview is accepted; the dev preview never changes the live GitHub Pages site.

## Deferred production architecture

- Replace snapshot-level last-writer-wins synchronization with domain/row-level revisions for Morning routes, parking, chargers, and fleet imports.
- Route Google Sheets writes through an authenticated server/Edge Function instead of an anonymous Apps Script web endpoint.
- Complete an approved Amazon/Rivian API or server-side connector integration; do not automate private portals from public browser JavaScript.
- Add an authenticated application gate before exposing real driver phone numbers, schedules, and station operations on a production host.
