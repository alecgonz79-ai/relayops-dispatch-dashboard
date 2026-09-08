# DJT6 + DUR6 station guide

## Release status — September 7, 2026

Production DUR6 provisioning is complete. DJT6 and DUR6 each have 375 active
explicit station memberships, with the same approved dispatcher access.
Organization roles and disabled memberships were preserved. This dual-station
release enables both station workspaces on the standard dashboard link.

DUR6 uses station UUID `4a35bc36-983e-4ac7-bcd1-6b0d718f7c4f`. DJT6 retains its
existing station UUID and data. No DJT6 snapshots, imports, equipment records,
Admin PIN settings, or Google connector settings were changed by provisioning.

The DUR6 Google confirmation path is installed, but
`RELAYOPS_DUR6_WRITES_ENABLED=false`. Renewed Google authorization and supervised
transfer verification are still required. No successful live DUR6 transfer is
claimed. This Google limitation is separate from shared dashboard access.

## Working at both stations

- Select **DJT6** for the home station or **DUR6** for Temecula. Each station has
  its own Morning Sheet, Opening Picklist, and Device & Portable section.
- DJT6 keeps six wave slots. DUR6 has three slots and can operate with one,
  two, or three populated waves. Pads stay blank until entered manually.
- Imports and equipment assignments belong to the selected station and date.
  A file that explicitly names the other station is rejected.
- File reads are bound to the station, date, purpose, and import generation.
  Changing context cancels the old result. A station change must wait for
  outstanding saves; imports and station switches never send a Google sheet.
- Shared state uses separate station UUIDs and dated snapshots. Access to both
  stations does not merge their routes, drivers, device assignments, or imports.
  The same equipment label can have different assignments at each station.
- The existing midnight retention rules apply by station and date. Permanent
  settings and driver aliases are not daily imports and must be preserved.

Existing DJT6 access is mirrored to DUR6 without changing organization roles.
Viewers remain viewers; disabled memberships remain disabled. Future DJT6
membership grants are mirrored. Revocation removes only a DUR6 grant created
by the mirror, preserving independently granted DUR6 access. No new polling
or scheduled database job was added for this access policy.

## Separate Google tabs in the same workbook

Both stations use the [existing shared spreadsheet](https://docs.google.com/spreadsheets/d/1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ/edit).
They keep separate templates, connector settings, transfer receipts, and date tabs.

| Station | Template | Example date tab |
| --- | --- | --- |
| DJT6 | `OPS LOG 2026` | `9.7.26` — existing behavior |
| DUR6 | `OPS LOG DUR6` | `DUR6 9.7.26` |

The DUR6 connector is pinned to spreadsheet
`1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ`, template sheet ID
`1876715045`, and destination key `DUR6_OPS_LOG`. It must never fall back to
DJT6's template or an unprefixed date tab. The connector source is available at
[relayops-morning-connector-dur6.local.gs](google-sheets/relayops-morning-connector-dur6.local.gs).

The Google deployment executes as **User accessing the web app** and requires
a signed-in Google account. Existing spreadsheet editing permissions apply;
the connector does not add sharing access or borrow the owner's identity.
Google access is workbook-wide: separate tabs are transfer destinations, not
independent Google sharing permissions.

**Send DUR6 Morning Sheet** opens a separate Google confirmation window.
It previews the date and route count and requires explicit confirmation before
a write. Station, date, sheet-content, or endpoint changes cancel a pending
handoff. Direct POST writes and anonymous/no-cors fallback sends are rejected.

The connector keeps the existing 142-row master layout. DUR6 uses Waves 1–3;
full replacement clears connector-owned values in unused Waves 4–6. Adhocs,
Helpers, and DSP start at rows 105, 121, and 137. Owned ranges are `A3:H142`,
`P3:Q142`, and `U3:U142`. Formatting, merges, checkbox columns J:M, and manual
operations columns O/R/S/T/V are preserved. Replacing a DUR6 dated tab first
creates a timestamped backup.

The handoff uses expiring, user-bound preflight tokens, a same-date write token,
and idempotent request IDs. Stale previews, mismatched destinations, and reused
request IDs with different data are rejected. A same-date token is not the
same thing as a verified cloud workspace revision; both must be checked in
the final end-to-end release tests.

### Google verification still required

1. Complete renewed Google authorization with an existing spreadsheet editor.
2. Use **Test Google access** and **Check without writing** while writes remain
   disabled. Confirm the exact workbook, template, DUR6-prefixed date, and
   current connector build `2026-09-07-dur6-google-editors-v2`.
3. Perform a supervised transfer to a disposable DUR6-prefixed date tab, verify
   every owned range, then test replacement, backup, and restore. Confirm DJT6
   templates and dated tabs remain unchanged.
4. Test two dispatcher confirmations for the same DUR6 date and reject the
   stale preview. Verify accounts without spreadsheet editing permission
   cannot write.
5. Enable normal DUR6 writes only after those checks pass. Keep the deployment
   URL in DUR6's station-scoped connector settings, not in public source code.

The initial DUR6 connector supports full-sheet replacement only. Filtered
partial updates, RTS-only updates, and Whiparound-only updates remain disabled.

## Isolated local preview

From the repository root, run:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/?multiStationPreview=1&station=DUR6` or change the
station to `DJT6`. This explicit localhost preview remains separate from the
production cloud workspaces and uses isolated browser storage. Its optional
Google test and confirmation buttons are explicit user actions, not import
side effects. Export important local test data before clearing browser storage.

The localhost preview can open Admin without a PIN. This does not remove,
change, or bypass the published dashboard's server-verified Admin PIN.

## Release and recovery checks

Before publication, run the DJT6 baseline, station isolation, simultaneous
dispatcher, delayed-upload, reconnect, midnight-reset, and release-asset tests.
Verify new DUR6 imports never alter DJT6 and that pending saves are protected
when switching stations. Confirm the public links select the intended station.

If a release issue occurs, return navigation to DJT6 or restore the previous
client build while retaining DUR6 data and memberships. Keep Google writes
disabled until verified. Do not delete station snapshots or restore the old
“newest enabled station” provisioning behavior as a shortcut.
