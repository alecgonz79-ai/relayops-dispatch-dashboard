# LLOLDispatchOpeningOperations

A dispatcher-first opening operations dashboard for LLOL dispatchers, with original branding and interaction design.

## Live hosting

GitHub Pages publishes this static dashboard directly from the root of `main`. Every push to `main` updates the public site automatically.

Dispatcher share link:

https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/

Send the full `https://` URL so GroupMe, Slack, text messages, and email turn it into a clickable link.
Do not shorten or swap the GitHub account name in the URL. For example, `https://AG79.github.io/...` will show GitHub's 404 page unless a GitHub account or organization named `AG79` owns and publishes the site.

## Local preview

Serve this folder with any static web server, then open `index.html` through that server. The prototype has no build step.

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
- Local demo persistence through browser storage

## Current boundary

This GitHub Pages version is a functional front-end prototype. It is suitable for workflow validation and file exports, but GitHub Pages is static hosting: it cannot safely hold Amazon or FleetOS credentials or enforce shared user accounts by itself. Real authentication, role enforcement, shared cloud data, true XLSX export, notifications, and approved Amazon/FleetOS connectivity require a secure backend. The intended production architecture is documented in `PRODUCTION_BUILD_BRIEF.md` and can be implemented with a backend provider while GitHub remains the source of truth.

## Morning Sheet connectors

There are three connector types in the Morning Sheet workflow:

1. Google Sheets connector — ready now.
   - Use this for the exact-format handoff.
   - Open the Google Sheet template, go to Extensions → Apps Script, and paste the RelayOps Apps Script from the dashboard or `google-sheets/relayops-morning-connector.gs`.
   - Deploy it as a Web app with Execute as: Me and access: Anyone with the link.
   - Paste the generated `/exec` URL into Morning Sheet → Google Sheets Connector.
   - Run Test connector, then Dry run, then Send to Google Sheet.
   - The dashboard still sends a compact 13-column payload, but the Apps Script maps setup data to `A:H`, stop/package counts to `P:Q`, and Planned RTS to `U`.
   - It preserves the original A:V headers, widths, colors, checkbox columns J:M, black divider N, and operations-entry columns O/R/S/T/V. Only Wave and Pad merges are rebuilt.

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

The Fleet page now supports a live connector endpoint. In Fleet → Live setup, paste a secure backend URL such as:

```text
https://your-backend.example.com/api/fleet/live
```

When configured, the Refresh button pulls live Amazon + FleetOS data from that endpoint first, then opens the same approval screen before updating EV cards.

Backend scaffold and the required JSON shape live in:

```text
live-connector/
```

Never put Amazon/FleetOS usernames, passwords, cookies, or tokens in the GitHub Pages dashboard. Keep those only in the backend connector.
