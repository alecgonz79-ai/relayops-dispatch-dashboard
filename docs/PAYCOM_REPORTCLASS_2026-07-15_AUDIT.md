# PAYCOM ReportClass Import Audit - 2026-07-15

## Sources

- `ReportClass-20260715055736.xls` - PAYCOM HTML-table workbook with 81 scheduled shifts.
- `7:15.pdf` - same-day Schedule Exchange roster with 80 scheduled shifts.

## Result

- 81 XLS rows decoded into 81 unique associate identities.
- 80 PDF rows decoded into 80 unique associate identities.
- All 80 PDF identities matched an XLS identity after comparing first and last name.
- All matched rows had the same role, start time, and end time.
- Zero duplicate identities and zero unmatched PDF identities.
- The only XLS-only row was the expected `Alec Gonzalez` Closing Dispatcher shift from 2:00 PM to 10:30 PM.

## Verified role totals

| Role | XLS | PDF |
| --- | ---: | ---: |
| Delivery Associate | 59 | 59 |
| Rescue | 12 | 12 |
| Pilot/Rescue | 1 | 1 |
| Modified duty | 1 | 1 |
| Fleet Coordinator/Rescue | 1 | 1 |
| Midshift | 1 | 1 |
| Driver Helper | 1 | 1 |
| First Opening Dispatcher | 1 | 1 |
| Lead Dispatch | 1 | 1 |
| Second Closer | 1 | 1 |
| Second Opening Dispatch | 1 | 1 |
| Closing Dispatcher | 1 | 0 |

## Regression locks

- Full 81-row normalized fingerprint: `1d855638d033c1a0115310e3f920f5ee305994e93e316ae76566923d174ad301`
- 80-row PDF-backed fingerprint: `915c5a4425298bca9cd6b69c8189a075c589a6d2a5aa988864bd58e983970777`

The production parser also derives the four-digit year from `ReportClass-YYYYMMDD...xls`, so an archived PAYCOM export cannot silently inherit the wrong year from the current dashboard date.
