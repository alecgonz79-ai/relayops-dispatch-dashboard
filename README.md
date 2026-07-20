# LLOLDispatchOpeningOperations

A dispatcher-first opening operations dashboard for LLOL dispatchers, with original branding and interaction design.

## Live hosting

GitHub Pages publishes this static dashboard directly from the root of `main`. Every push to `main` updates the public site automatically.

Dispatcher share link:

https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/

Send the full `https://` URL so GroupMe, Slack, text messages, and email turn it into a clickable link.
Do not shorten or swap the GitHub account name in the URL. For example, `https://AG79.github.io/...` will show GitHub's 404 page unless a GitHub account or organization named `AG79` owns and publishes the site.

The dashboard's **Share link** button appends the selected operation date. Every dispatcher must open their secure email sign-in link once; after the owner invites that email, imports and edits use the same dated Supabase snapshot and update open screens in realtime.

## Local preview

Serve this folder with any static web server, then open `index.html` through that server. The dashboard has no front-end build step.

## Included

- Opening roster, live routes, rescue log, drivers, fleet/devices, performance, coaching, checklists, inbox, inventory, reports, and owner controls
- Screenshot-matched morning operations board with WAVE 1–5, ADHOC's, HELPERS, and DSP sections
- Yellow/purple input zones, edit mode, planned RTS import, and light-red RTS flags for review
- DSP-only route filtering plus visual Slack Import and Cortex Import choices
- Working CSV and `.xlsx` roster import with flexible Amazon-style column mapping
- Working CSV and Excel-compatible `.xls` export
- Tab-separated copy for Google Sheets
- Google Sheets Apps Script connector that maps the dashboard into the original A:V Ops Log without replacing its formatting
- Responsive desktop, tablet, and mobile layouts
- Offline-safe local persistence plus synchronized station workspaces through Supabase
- Passwordless dispatcher sign-in, database-enforced organization/station access, and realtime presence
- Actionable fleet/RTS/Whiparound notification center and shared inventory movements

## Current boundary

GitHub Pages serves only the public front-end files. Authentication, organization/station membership, realtime workspace data, and row-level access are handled by the configured Supabase project; they are not trusted to browser-only controls. Imports are parsed locally before the resulting operational state is synchronized to authorized dispatchers. Amazon Logistics and FleetOS credentials still must never be stored in the public front end. True live pulls require the authenticated server-side proxy documented under `live-connector/`; file imports remain the safe fallback whenever that proxy is unavailable.

## Morning Sheet connectors

There are three connector types in the Morning Sheet workflow:

1. Google Sheets connector — ready now.
   - Use this for the exact-format handoff.
   - Open the main `Legacy Logistics Operations` workbook, go to Extensions → Apps Script, and paste the RelayOps Apps Script from the dashboard or `google-sheets/relayops-morning-connector.gs`.
   - Deploy it as a Web app with Execute as: Me and access: Anyone with the link.
   - Paste the generated `/exec` URL into Morning Sheet → Google Sheets Connector.
   - Run Test connector, then Dry run, then Send to Google Sheet.
   - The dashboard still sends a compact 13-column payload, but the Apps Script maps setup data to `A:H`, stop/package counts to `P:Q`, and Planned RTS to `U`.
   - It preserves the original A:V headers, widths, colors, checkbox columns J:M, black divider N, operations-entry columns O/R/S/T/V, and all template merges.
   - It uses the fixed `OPS LOG 2026` anchors: Wave rows 3/18/33/48/63, ADHOC 79, HELPERS 95, and DSP 111.
   - If the selected date tab is missing, it duplicates `OPS LOG 2026` and names the new tab only `M/D/YY` or `M.D.YY`; it never falls back to another date or the active tab.

2. Slack / day-of-operations connector — demo/import mode today.
   - Use the dashboard upload/demo flow for now.
   - A production Slack connector should use a Slack app or secure backend file picker that passes the DAYOFOPSPLAN file to RelayOps.
   - Do not paste Slack tokens into the GitHub Pages dashboard.

3. Cortex / Amazon Logistics connector — upload mode today.
   - Use `.xlsx` or CSV exports from Amazon/Cortex today.
   - A true live Amazon Logistics connector must run through a secure backend because GitHub Pages cannot safely store Amazon credentials, cookies, or session tokens.
   - The browser dashboard should receive clean route rows only, not Amazon login secrets.

Browser copy/paste remains available as a fallback, but it cannot guarantee merged-cell formatting in Google Sheets. The Apps Script connector is the intended path for the “perfect” Morning Sheet template handoff.

## Live Fleet connector

The Fleet page accepts only the authenticated `fleet-live-proxy` endpoint. Deploy `supabase/functions/fleet-live-proxy`, then save its HTTPS URL in Fleet Health → More fleet tools → Authenticated Fleet proxy:

```text
https://YOUR_PROJECT_REF.supabase.co/functions/v1/fleet-live-proxy
```

Dispatchers must sign in before cloud refresh. The browser sends the current Supabase user access token and public organization/station IDs. The Edge Function verifies user, membership, and station access, then calls the private connector with `FLEET_CONNECTOR_URL` and `FLEET_CONNECTOR_TOKEN` stored as server secrets. The private token, portal credentials, cookies, and upstream URLs never enter public JavaScript.

Proxy deployment and private connector setup are documented in:

```text
supabase/functions/fleet-live-proxy/
live-connector/
```

The dashboard rejects non-HTTPS proxy URLs (except localhost development), private connector URLs, query parameters, Amazon/FleetOS portal URLs, and signed-out cloud pulls. File imports remain the supported fallback whenever the authenticated proxy is not deployed or available.
