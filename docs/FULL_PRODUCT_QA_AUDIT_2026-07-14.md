# RelayOps full-product QA audit — 2026-07-14

## Release verdict

**Functionally release-gated, with external setup and live visual acceptance still required.** Core dispatcher workflows, multi-writer reconciliation, Admin access controls, Coaching review, and historical imports now have executable coverage. The Fleet proxy still needs deployment/secrets, the Admin RLS migration must be applied to an existing Supabase project, and final pixel/pointer acceptance still needs a live browser.

The local preview responded successfully on `http://127.0.0.1:4176/`. A live in-app browser session was not exposed to this QA worker, so pixel-level desktop/mobile and real pointer/keyboard checks are marked unverified rather than inferred from source. Responsive, modal, focus, overflow, and reduced-motion contracts were verified from the rendered markup and CSS.

## Automated evidence

The suite covers:

- Every visible navigation page rendered as an administrator.
- Every rendered `data-action` checked against the central dispatcher.
- Inert-looking button inventory; the current rendered page inventory is empty.
- Viewer/Admin navigation gating.
- All 28 modal variants with dialog semantics, accessible labels, close controls, Escape handling, and focus containment source contracts.
- Source-specific file chooser rules and sequential chooser reset.
- Morning → Device Sheet, Fleet issue, Whiparound, Parking, and shared-state dependencies.
- Full Morning Sheet, filtered partial update, RTS-only, and Whiparound-only Google Sheets safety contracts.
- Fleet grounded/inactive/unknown-battery safety and assignment behavior.
- Cloud load/save/realtime/offline queue behavior.
- GitHub Pages public-file allowlist and live-connector upstream-host security.

Always-on embedded parser fixtures cover DayOfOps, Routes_DJT6, Itineraries duplicate-rescue selection, Amazon operational status/service type, FleetOS battery/range, Whiparound Pre/Post DVIR, and associate contacts.

When the private Downloads corpus is present, strict evidence is:

| Fixture | Verified result |
| --- | ---: |
| DayOfOpsPlan | 322 data rows |
| Routes_DJT6 | 43 route details |
| Itineraries_DJT6 | 40 planned RTS routes |
| CX189 duplicate rescue case | 9:14 PM retained, 2:10 PM rescue ignored |
| VehiclesData | 62 vehicles, 7 grounded |
| Vehicle_List | 58 FleetOS vehicles with battery/range |
| Whiparound report | 25 valid DVIR rows |
| AssociateData | 127 contacts with name/phone |

Require the private corpus locally with:

```bash
RELAYOPS_REQUIRE_HISTORICAL_FIXTURES=1 node tests/historical-parser-fixtures.cjs
```

CI runs the embedded schemas and prints an explicit skip if the private files are unavailable.

The GitHub Pages publish job now runs Node syntax checks, every `tests/*.cjs` regression, and a committed-diff whitespace check before assembling the public allowlist. A failing release check blocks deployment.

## Product surface inventory

| Page | Release-relevant behaviors audited | Current status |
| --- | --- | --- |
| Today | Phase navigation, route actions, readiness links, alerts | Core render works; some dashboard cards remain sample/prototype data |
| Morning sheet | dual-file import, filters, edit/copy, vehicle/equipment assignment, Google sends, screenshots | Strong regression coverage |
| Opening roster | Paycom import, route swaps, backup/helper/stay-home/reduction state, Picklist editing | Strong regression coverage |
| Device and Portable Sheet | source import, editable rows, clear/add/remove, Morning transfer | Cross-page match covered |
| Drivers & team | CSV/XLSX/extensionless Associate import, add/delete/text, canonical aliases | Import and removal covered |
| Fleet Health | Amazon/FleetOS source gates, grounded/issue/low-charge safety, refresh review | Safety covered; live connector contract blocker remains |
| Van Parking | editable spaces, batteries, chargers, dates, notes, assignment ordering | Persistence/state covered; visual pointer QA unverified |
| Whiparound | CSV/XLSX import, on-route matching, reminders, Morning/Google checks | Cross-page and connector covered |
| Performance | secure external launcher | Working launcher; not embedded because target disallows framing |
| Coaching | shared queue, review notes, message template, copy/manual-send confirmation | Implemented and regression-covered; automatic external delivery is explicitly unavailable |
| Inventory | item add/edit, assignment/adjustment log, category filtering | Implemented and regression-covered |
| Reports & export | exports and handoff cards | Generic exports work; report-specific datasets need product confirmation |
| Admin | organization save, invite, fixed role matrix, member role/active controls | Implemented; owner-only RLS migration is required for existing Supabase projects; ADP is honestly unavailable |

## Prioritized blockers

### P1 — Fleet live proxy must be deployed and configured before live refresh is usable

The current tree includes `supabase/functions/fleet-live-proxy`, and the browser contract correctly sends the signed-in Supabase JWT plus organization/station scope to that proxy. The proxy verifies the caller and uses server-side secrets to call the private Fleet connector; no connector token or caller-selected upstream URL enters public JavaScript.

Production setup still requires deploying the Edge Function and setting `FLEET_PROXY_ALLOWED_ORIGINS`, `FLEET_CONNECTOR_URL`, and `FLEET_CONNECTOR_TOKEN`. Until that external setup is complete, Fleet upload/paste is the supported fallback.

### P1 — live visual and interaction acceptance is incomplete

The local files and HTTP assets are available, but this QA worker had no browser instance to inspect. Before publishing, perform real checks at desktop, tablet, and phone widths for:

- Morning/Picklist horizontal scroll containment and sticky headers.
- Parking map proportions, charger alignment, street editing, and touch targets.
- All 25 dialogs, long modal scrolling, Escape, Tab/Shift-Tab, and return focus.
- Sheet pointer drag, copy keyboard shortcuts, double-click edit, Enter/arrow movement.
- Roster list horizontal clipping and long button labels.

### P1 — existing Supabase projects must apply the member-access migration

Fresh projects get owner-only membership policies from `supabase/schema.sql`. Existing projects must run `supabase/migrations/20260714_owner_member_access.sql` once. The Admin member editor then updates role/active state through `cloud-sync.js`, while RLS blocks non-owners and protects owner rows. The invite Edge Function likewise accepts only an active owner and cannot invite another owner.

### P2 — source copy and product boundary need cleanup

- Slack import is intentionally locked; all dispatcher-facing onboarding should direct users to the current DayOfOps/Cortex file workflow.
- The root README still describes the dashboard primarily as a front-end prototype even though shared Supabase state and role logic now exist. Update the production boundary, data privacy, and connector setup text.
- Coaching texts remain manual by design: RelayOps can prepare/copy and record dispatcher confirmation, but does not claim external SMS delivery.

## Permissions and privacy

- Fresh/signed-out browsers default to Viewer.
- Admin navigation is hidden and `go('admin')` rejects non-admin roles.
- Supabase/RLS remains the real security boundary; client-side role checks are UX only.
- Driver phones, schedules, vehicle issues, and parking state are sensitive operational data. Do not publish a readable Supabase anon policy or expose a writable Apps Script endpoint in the repository.
- The live connector correctly rejects caller-selected upstream URLs and requires HTTPS allowlists, preventing credential forwarding to arbitrary hosts.

## Responsive and keyboard evidence

Verified source contracts:

- Page shell clips accidental horizontal overflow; worksheet/map surfaces own intentional scrolling.
- `.main`, `.content`, and `.card` can shrink in grid/flex layouts.
- Phone-width topbar wraps; modals use viewport-relative width and internal scrolling.
- Toasts stay inset on mobile and use an ARIA live region.
- Global `:focus-visible` and `prefers-reduced-motion` rules are present.
- Modal Escape and focus wrap are implemented.

Still requires live-browser acceptance because static contracts cannot prove actual pixel overlap or pointer hit targets.

## Release command

Run after all workers stop editing:

```bash
set -e
node --check app.js
node --check cloud-sync.js
node --check live-connector/server.mjs
for f in tests/*.cjs; do node "$f"; done
RELAYOPS_REQUIRE_HISTORICAL_FIXTURES=1 node tests/historical-parser-fixtures.cjs
git diff --check
```

Do not approve publishing until this command passes from the final integrated tree and the live-browser acceptance checklist is completed.
