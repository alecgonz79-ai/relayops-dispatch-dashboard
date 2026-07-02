# RelayOps prototype

A dispatcher-first operations dashboard inspired by the feature breadth of Hera, with original branding and interaction design.

## Live hosting

This repository includes an automatic GitHub Pages deployment. Every push to `main` publishes the current dashboard through the workflow in `.github/workflows/deploy-pages.yml`.

## Local preview

Serve this folder with any static web server, then open `index.html` through that server. The prototype has no build step.

## Included

- Opening roster, live routes, rescue log, drivers, fleet/devices, performance, coaching, checklists, inbox, inventory, reports, and owner controls
- Working CSV roster import with flexible Amazon-style column mapping
- Working CSV and Excel-compatible `.xls` export
- Tab-separated copy for Google Sheets
- Responsive desktop, tablet, and mobile layouts
- Local demo persistence through browser storage

## Current boundary

This GitHub Pages version is a functional front-end prototype. It is suitable for workflow validation and file exports, but GitHub Pages is static hosting: it cannot safely hold Amazon credentials or enforce shared user accounts by itself. Real authentication, role enforcement, shared cloud data, true XLSX import/export, notifications, and approved Amazon Vendor Exchange/API connectivity require a secure backend. The intended production architecture is documented in `PRODUCTION_BUILD_BRIEF.md` and can be implemented with a backend provider while GitHub remains the source of truth.
