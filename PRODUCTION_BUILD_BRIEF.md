# RelayOps — production build brief

## Product intent

Build a secure, multi-user operations workspace for an Amazon Delivery Service Partner. The core user is an opening dispatcher who needs to turn Amazon's daily roster into a complete, verified launch plan quickly. The owner must retain full administrative control, visibility, export access, and an audit trail.

Use the local prototype as the visual and interaction reference. Preserve its calm, dense-but-readable command-center layout; responsive sidebar; exception-first dashboard; and four shift phases: Roster, Load-out, On road, Closeout. Do not copy Hera branding, assets, or proprietary text.

## Non-negotiable workflows

1. Import an Amazon roster CSV or XLSX and map columns. Never scrape protected Amazon pages or collect Amazon passwords.
2. Show import validation before committing: duplicate routes, missing drivers, unavailable vehicles, unavailable devices, invalid wave/staging fields.
3. Assign a driver, route, wave, staging location, vehicle, phone/device, parking location, and optional fuel card.
4. Flag callouts, standby drivers, ad hoc routes, and equipment conflicts before publish.
5. Publish a versioned daily roster. Record who published it and when. Notify only after an explicit confirmation.
6. Track route health, stop/package counts, pace delta, projected completion, and rescue decisions. Rescue logs require from/to driver, transfer amount, reason, dispatcher, and timestamps.
7. Close the day with RTS, key/device return, DVIC/damage follow-up, mileage/fuel/charge, and unresolved exceptions.
8. Export the current authorized view as CSV and true XLSX. Also provide tab-separated copy for direct paste into Google Sheets cell A1.
9. Support driver profiles, weekly performance metrics, coaching tasks/acknowledgments, vehicles/maintenance/DVIC, devices and inventory, checklists, and a unified message log.

## Roles and permissions

- `owner`: all stations and all data; users; roles; integrations; secrets; billing; exports; delete/restore; full audit log.
- `ops_manager`: assigned stations; all operational records; coaching; reports; no billing, secrets, or owner-role assignment.
- `dispatcher`: assigned stations and dates; roster import/edit/publish, live routes, rescue log, checklists, message log, operational exports; no integration secrets, billing, role changes, or permanent deletion.
- `fleet_lead`: fleet, devices, inventory, DVIC, and maintenance; read-only daily roster context.
- `viewer`: read-only dashboards and reports for assigned stations.

Enforce permissions in the database with row-level security. Hiding a menu is not authorization. Owners cannot remove their own final owner role. Log role changes, imports, roster publishes, exports, connection changes, and deletes.

## Secure backend architecture

Keep GitHub as the source of truth and connect a secure backend that supports email or Google sign-in, a relational database, file storage, server-side functions, encrypted secrets, and row-level access controls. Require authentication for all app routes. Create organization membership and station assignment tables; every operational table must contain `organization_id`, and station-scoped tables must also contain `station_id`.

Create these primary tables:

- `organizations`, `stations`, `profiles`, `memberships`, `member_station_access`
- `drivers`, `driver_availability`, `attendance_events`
- `daily_rosters`, `roster_rows`, `roster_versions`, `import_jobs`, `import_errors`
- `vehicles`, `vehicle_assignments`, `dvic_events`, `maintenance_items`, `damage_reports`
- `devices`, `device_assignments`, `inventory_items`, `inventory_transactions`
- `route_snapshots`, `rescue_decisions`, `route_notes`
- `scorecard_periods`, `driver_metrics`, `coaching_tasks`, `coaching_acknowledgments`
- `checklist_templates`, `checklist_runs`, `checklist_items`
- `message_threads`, `messages`, `broadcasts`
- `export_profiles`, `column_mappings`, `audit_events`

Use server-side functions for XLSX parsing/generation, imports, exports, notifications, and any future Amazon connection. Store provider credentials only as encrypted Cloud secrets. Add `created_at`, `updated_at`, `created_by`, and soft-delete fields where appropriate.

## Amazon integration boundary

Start with reliable CSV/XLSX import from reports the DSP is authorized to download. Add an Integration page with connection status, last successful sync, records changed, error log, and manual retry. Do not label a sync as live until the owner supplies approved Amazon Vendor Exchange/API access and the integration is verified. Do not use SP-API endpoints for unrelated seller/vendor fulfillment workflows.

## Opening dispatcher UX

Default landing page is Today, not a generic analytics dashboard. Put unresolved exceptions above trends. Show:

- routes required / staffed
- drivers expected / checked in / callouts / standby
- vehicles ready / held / service
- devices ready / missing / charging
- waves and launch deadlines
- blocking conflicts with an explicit owner and next action
- opening checklist progress

The roster screen should feel like a controlled workbench: inline editing, filters, keyboard-friendly assignment, conflict badges, autosave, undo, and publish confirmation. Published rosters are immutable versions; later changes create a new version and preserve the prior one.

## Exports and Google Sheets

Provide named export profiles that owners can configure. A profile maps source columns to output columns, order, date/time format, and optional fixed values. Include starter profiles for Daily Wave Sheet, Payroll & Attendance, Weekly Scorecard, Fleet Readiness, and Device Custody. Every export must respect role and station access and create an audit event without logging sensitive cell contents.

## Acceptance checks

- A dispatcher can import a 50-route roster, resolve errors, assign equipment, and publish without admin access.
- A dispatcher cannot access user roles, secrets, billing, other stations, or deleted records by direct URL or API call.
- An owner can invite/deactivate users, assign roles/stations, review the audit log, and preview dispatcher access.
- CSV opens cleanly in Google Sheets. XLSX is a valid workbook with headers, frozen top row, filters, readable widths, and separate tabs where useful.
- The app works at 390px mobile width, tablet landscape, and desktop; critical opening actions remain reachable without horizontal page scrolling.
- Empty, loading, offline, validation, permission-denied, and partial-import states are deliberately designed.

## Initial implementation milestone

Build RelayOps as a secure multi-user Amazon DSP operations command center with GitHub as the source of truth. Start with authentication, organization/station tenancy, database schema, row-level security for owner/ops_manager/dispatcher/fleet_lead/viewer, and seed demo data for one station. Then implement the Today dashboard, Opening Roster CSV/XLSX import and validation, versioned roster publishing, Reports/Exports with CSV + XLSX + Google Sheets copy, and the Owner Admin Control page. Run security checks before declaring the build complete. Never collect Amazon passwords or imply a live Amazon connection until approved credentials are configured and verified.
