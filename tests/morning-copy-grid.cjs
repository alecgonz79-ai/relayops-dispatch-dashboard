const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

const app = { innerHTML: '' };
const fileInput = { addEventListener() {}, click() {} };
const storage = new Map();
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {}, classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {}, style: {}, focus() {}, setSelectionRange() {}, click() {}
});

const context = {
  console,
  Intl,
  Blob,
  URL,
  setTimeout,
  clearTimeout,
  navigator: { clipboard: { writeText: async () => true } },
  JSZip,
  window: { scrollTo() {} },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  document: {
    body: { appendChild() {} },
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelectorAll: () => [],
    createElement: element
  }
};

const source = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
const connectorFile = fs.readFileSync(require.resolve('../google-sheets/relayops-morning-connector.gs'), 'utf8');
const readme = fs.readFileSync(require.resolve('../README.md'), 'utf8');
const checks = `
  if (!${JSON.stringify(readme)}.includes('Morning Sheet connectors') || !${JSON.stringify(readme)}.includes('Google Sheets connector — ready now') || !${JSON.stringify(readme)}.includes('Slack / day-of-operations connector — demo/import mode today') || !${JSON.stringify(readme)}.includes('Cortex / Amazon Logistics connector — upload mode today') || !${JSON.stringify(readme)}.includes('original A:V Ops Log') || !${JSON.stringify(readme)}.includes('A:H') || !${JSON.stringify(readme)}.includes('P:Q')) throw new Error('README should explain the original Ops Log connector map');
  if (!${JSON.stringify(css)}.includes('.sheet-scroll { width:100%; overflow:auto; max-height:calc(100vh - 278px); position:relative; background:#fff; isolation:isolate;')) throw new Error('Sheet scroll area should isolate the sticky Google-style header');
  if (!${JSON.stringify(css)}.includes('border-collapse:separate; border-spacing:0;')) throw new Error('Morning sheet table should use separate borders so sticky headers do not float over filled cells');
  if (!${JSON.stringify(css)}.includes('.ops-sheet thead tr:nth-child(2) th { top:24px; z-index:11; box-shadow:0 1px 0 #111; }')) throw new Error('Second sticky header row must sit directly below column letters');
  if (!${JSON.stringify(css)}.includes('.ops-sheet .sheet-letters-row th { top:0; z-index:12;')) throw new Error('Column letters sticky header layer missing');
  if (!${JSON.stringify(css)}.includes('background-clip:padding-box')) throw new Error('Sticky header background clipping missing');
  if (!${JSON.stringify(css)}.includes('.sheets-preflight-grid') || !${JSON.stringify(css)}.includes('.sheets-preflight-grid span.warn')) throw new Error('Sheets preflight styling missing');
  if (!${JSON.stringify(css)}.includes('.sheets-receipt') || !${JSON.stringify(css)}.includes('.sheets-receipt.needs-check') || !${JSON.stringify(css)}.includes('grid-template-columns:repeat(7,minmax(0,1fr))')) throw new Error('Sheets receipt styling missing');
  if (!${JSON.stringify(css)}.includes('.sheets-proof') || !${JSON.stringify(css)}.includes('.sheets-proof.warn')) throw new Error('Sheets handoff proof styling missing');
  if (!${JSON.stringify(css)}.includes('.copy-fallback-proof') || !${JSON.stringify(css)}.includes('.copy-fallback-proof.warn')) throw new Error('Copy fallback proof styling missing');
  if (!${JSON.stringify(css)}.includes('.sheets-row-audit') || !${JSON.stringify(css)}.includes('.sheets-row-audit.warn')) throw new Error('Sheets row audit styling missing');
  if (!${JSON.stringify(css)}.includes('.sheets-live-proof') || !${JSON.stringify(css)}.includes('grid-template-columns:repeat(6,minmax(0,1fr))')) throw new Error('Live Google proof styling missing');
  if (!${JSON.stringify(css)}.includes('.handoff-readiness') || !${JSON.stringify(css)}.includes('.handoff-readiness.copy-ready') || !${JSON.stringify(css)}.includes('.handoff-readiness-grid')) throw new Error('Morning handoff readiness styling missing');
  if (!${JSON.stringify(css)}.includes('.morning-sheet-bridge') || !${JSON.stringify(css)}.includes('.bridge-route') || !${JSON.stringify(css)}.includes('.bridge-node') || !${JSON.stringify(css)}.includes('.bridge-send')) throw new Error('Filtered-waves Google bridge styling missing');
  if (!${JSON.stringify(css)}.includes('.wave-copy-group') || !${JSON.stringify(css)}.includes('.wave-copy-group .btn.small')) throw new Error('Wave block copy button styling missing');
  toast = () => {};
  state.page = 'morning';
  state.copyMode = true;
  state.editMode = false;
  state.morningOperationDate = '2026-07-11';
  const html = morningSheetPage();
  if (!html.includes('Ops Log connector setup')) throw new Error('Morning connector guide missing');
  if (!html.includes('Day of operation') || !html.includes('7/11/26 or 7.11.26') || !html.includes('Slack Import') || !html.includes('LOCKED') || !html.includes('Setup & diagnostics') || !html.includes('ℹ')) throw new Error('Morning setup should expose operation date, locked Slack, and top diagnostics entry');
  const bridgeRequirements=['Filtered waves','Fixed Ops Log check','Dated Ops Log','Send filtered waves','Dry run happens before every send','Copy fallback','Handoff proof','Google range','Connector rows','Import / route source','Visible rows = payload','Exact connector'];
  const missingBridgeRequirements=bridgeRequirements.filter(value=>!html.includes(value));
  if (missingBridgeRequirements.length) throw new Error('Fixed OPS LOG 2026 handoff UI missing: '+missingBridgeRequirements.join(', '));
  if (!html.includes('data-copy-block="all"') || !html.includes('data-copy-block="setup"') || !html.includes('data-copy-block="counts"') || !html.includes('data-copy-block="rts"') || !html.includes('A–H setup') || !html.includes('J–K counts') || !html.includes('M planned RTS')) throw new Error('Copy mode should expose per-wave block copy shortcuts');
  if (!html.includes(MORNING_TEMPLATE_URL)) throw new Error('Google Sheets template link missing');
  if (!html.includes('creates it by duplicating the blank OPS LOG 2026 template')) throw new Error('Dated Google tab creation guidance missing');
  if (!html.includes('sheet-letters-row')) throw new Error('Column letters header missing');
  if (!html.includes('<th class="sheet-row-num">1</th>')) throw new Error('Copy-mode header row number missing');
  if (html.includes('<th class="sheet-row-num">#</th>')) throw new Error('Copy mode should use normal Google Sheets row numbering, not #');
  state.copyMode = false;
  const viewHtml = morningSheetPage();
  if (!viewHtml.includes('<th class="sheet-row-num">1</th>')) throw new Error('View/edit header row number missing');
  state.copyMode = true;
  if (html.includes('class="wave-separator"') && html.includes('colspan="13"')) throw new Error('Separator rows must be real A-M grid cells, not colspan');
  const sepMatch = html.match(/<tr class="wave-separator[\\s\\S]*?<\\/tr>/);
  if (!sepMatch) throw new Error('Separator row missing');
  const sepCellCount = (sepMatch[0].match(/<td/g) || []).length;
  if (sepCellCount !== 13) throw new Error('Separator row should contain 13 A-M cells, got ' + sepCellCount);
  const tsv = morningSheetTsv();
  const rows = tsv.split('\\n');
  if (rows.length < 10) throw new Error('Morning TSV too short');
  rows.forEach((row, index) => {
    const cols = row.split('\\t');
    if (cols.length !== 13) throw new Error('TSV row ' + (index + 1) + ' has ' + cols.length + ' columns instead of 13');
  });
  const hasSeparator = rows.some(row => row.split('\\t').every(cell => cell === ''));
  if (!hasSeparator) throw new Error('TSV should include blank separator rows for black divider rows');
  if (sheetCopyZone(0).join(',') !== '0,7' || sheetCopyZone(7).join(',') !== '0,7') throw new Error('Wave setup copy block should stop before black divider column I');
  if (sheetCopyZone(8).join(',') !== '8,8' || sheetCopyZone(11).join(',') !== '11,11') throw new Error('Black spacer columns must be real selectable copy boundaries');
  if (sheetCopyZone(9).join(',') !== '9,10' || sheetCopyZone(10).join(',') !== '9,10') throw new Error('Stop/package count copy block should stay between black dividers');
  if (sheetCopyZone(12).join(',') !== '12,12') throw new Error('Planned RTS column should copy as its own bounded block');
  if (typeof writeClipboardTable !== 'function') throw new Error('Rich clipboard table writer missing');
  const clipHtml = morningSheetClipboardHtml();
  if (!clipHtml.includes('<table')) throw new Error('Clipboard HTML table missing');
  if (!clipHtml.includes('<colgroup>') || !clipHtml.includes('width:132px') || !clipHtml.includes('width:18px')) throw new Error('Clipboard HTML should include fixed A-M column width hints');
  if (!clipHtml.includes('height:21px;mso-height-source:userset') || !clipHtml.includes('height:25px;mso-height-source:userset') || !clipHtml.includes('height:14px;mso-height-source:userset')) throw new Error('Clipboard HTML should include route, time, and divider row height hints');
  if (!clipHtml.includes('rowspan=')) throw new Error('Clipboard HTML should include merged-cell rowspans for wave/pad cells');
  if (!clipHtml.includes('background:#050505')) throw new Error('Clipboard HTML should preserve black divider/spacer styling');
  if (!clipHtml.includes('background:#b4a7d6')) throw new Error('Clipboard HTML should preserve planned RTS purple styling');
  if (!clipHtml.includes('WAVE 1')) throw new Error('Clipboard HTML should include wave labels');
  const fallbackHtml = tsvToHtmlTable(tsv);
  if (!fallbackHtml.includes('<td') || !fallbackHtml.includes('table-layout:fixed')) throw new Error('TSV HTML fallback table missing');
  if (!fallbackHtml.includes('<colgroup>') || !fallbackHtml.includes('width:132px') || !fallbackHtml.includes('width:18px')) throw new Error('TSV HTML fallback should include fixed A-M column width hints');
  if (!fallbackHtml.includes('height:21px;mso-height-source:userset') || !fallbackHtml.includes('height:14px;mso-height-source:userset')) throw new Error('TSV HTML fallback should include row height hints');
  const firstWaveItems = morningCopyRowsForSections([morningSections(filteredMorningRows())[0]]);
  const setupHtml = copyRowsClipboardHtml(firstWaveItems,0,7);
  const countsHtml = copyRowsClipboardHtml(firstWaveItems,9,10);
  const rtsHtml = copyRowsClipboardHtml(firstWaveItems,12,12);
  if (!setupHtml.includes('width:132px') || setupHtml.includes('width:18px') || !setupHtml.includes('rowspan=') || !setupHtml.includes('WAVE 1') || !setupHtml.includes('background:#eef3ff;font-size:22pt')) throw new Error('A-H wave setup copy should include setup widths and merged Wave/Pad cells without divider columns');
  if (!countsHtml.includes('width:96px') || countsHtml.includes('width:132px') || countsHtml.includes('width:18px') || countsHtml.includes('rowspan=')) throw new Error('J-K counts copy should include count widths only without merge cells');
  if (!rtsHtml.includes('width:96px') || rtsHtml.includes('width:132px') || rtsHtml.includes('width:18px') || rtsHtml.includes('rowspan=')) throw new Error('M planned RTS copy should include planned RTS width only without merge cells');
  if (!exportMorningTemplateSheet.toString().includes('morningClipboardColumnWidths') || !exportMorningTemplateSheet.toString().includes('separatorCell') || !exportMorningTemplateSheet.toString().includes('FreezePanes') || !exportMorningTemplateSheet.toString().includes('SplitHorizontal>1') || !exportMorningTemplateSheet.toString().includes('Morning Operations') || exportMorningTemplateSheet.toString().includes('colspan="13"')) throw new Error('Formatted sheet export should use fixed widths, frozen row 1 metadata, and real A-M divider cells');
  const payload = morningSheetsConnectorPayload();
  if (payload.version !== 'relayops-morning-v1') throw new Error('Morning Sheets connector payload version missing');
  if (payload.operationDate !== '2026-07-11' || payload.sheetName !== '7/11/26') throw new Error('Morning Sheets connector should target the selected operation date');
  if (!Array.isArray(payload.sheetNameCandidates) || !payload.sheetNameCandidates.includes('7/11/26') || !payload.sheetNameCandidates.includes('7.11.26')) throw new Error('Morning Sheets connector should support slash and dot date tab names');
  if (payload.startCell !== 'A3') throw new Error('Morning Sheets connector should target A3');
  if (payload.writeRange !== 'A3:M') throw new Error('Morning Sheets connector should lock writes to A3:M only');
  if (payload.headers.length !== 13) throw new Error('Morning Sheets connector should use 13 A-M headers');
  if (payload.headers[0] !== 'WAVE' || payload.headers[12] !== 'PLANNED RTS') throw new Error('Morning Sheets connector headers should match the A-M template');
  if (!payload.rows.length || !payload.sections.length) throw new Error('Morning Sheets connector payload missing rows or sections');
  const preflight = morningSheetsPreflight(payload);
  if (!preflight.ready || preflight.checks.length !== 7 || !preflight.checks.every(check => check.ok)) throw new Error('Morning Sheets preflight should pass for the current A-M payload');
  const preflightHtml = morningSheetsPreflightHtml(payload);
  if (!preflightHtml.includes('Preflight ready') || !preflightHtml.includes('A–M write scope only') || !preflightHtml.includes('Columns N+ stay untouched') || !preflightHtml.includes('Every row has 13 columns') || !preflightHtml.includes('Black dividers are real rows') || !preflightHtml.includes('Wave/Pad merge map ready') || !preflightHtml.includes('Target cell A3')) throw new Error('Morning Sheets preflight UI missing required checks');
  const proof = morningSheetsHandoffProof(payload);
  if (!proof.ready || proof.rows !== payload.rows.length || proof.visibleRows !== payload.rows.length || proof.range !== ('A3:M' + (payload.rows.length + 2)) || proof.dividers !== payload.sections.length) throw new Error('Morning Sheets handoff proof should match visible rows to connector payload rows');
  const proofHtml = morningSheetsHandoffProofHtml(payload);
  if (!proofHtml.includes('Handoff proof') || !proofHtml.includes('Google range') || !proofHtml.includes('Divider rows') || !proofHtml.includes('Visible Morning Sheet rows match')) throw new Error('Morning Sheets handoff proof UI missing required details');
  const structure = morningSheetStructureProof(payload);
  const structureHtml = morningSheetStructureProofHtml(payload);
  if (!structure.ready || !structureHtml.includes('Google Sheets structure proof') || !structureHtml.includes('Column letters') || !structureHtml.includes('A–M labels match Google Sheets') || !structureHtml.includes('Every row numbered') || !structureHtml.includes('Header stays fixed') || !structureHtml.includes('Black divider rows') || !structureHtml.includes('Black divider columns') || !structureHtml.includes('Merged Wave/Pad map') || !structureHtml.includes('Exact formatting path') || !structureHtml.includes('Use Send to Google Sheet')) throw new Error('Morning Sheets structure proof should confirm row numbers, A-M letters, dividers, sticky header, merges, and exact connector path');
  const readiness = morningHandoffReadiness(payload);
  if (!readiness.ready || !readiness.canCopy || readiness.rows <= 0 || !readiness.checks.some(check => check.label === 'Exact connector' && check.ok)) throw new Error('Morning handoff readiness should confirm the production connector');
  const readinessHtml = morningHandoffReadinessHtml(payload);
  if (!readinessHtml.includes('Safe to send to Google Sheets') || !readinessHtml.includes('target A3:M') || !readinessHtml.includes('Google format payload') || !readinessHtml.includes('Exact connector')) throw new Error('Morning handoff readiness UI missing required checks');
  const normalizedPayloadRows = payload.rows.map(row => row.map(cell => String(cell ?? '')));
  if (JSON.stringify(normalizedPayloadRows) !== JSON.stringify(rows.map(row => row.split('\\t')))) throw new Error('Copy TSV rows and connector payload rows must match exactly as visible cell values');
  if (!Array.isArray(payload.rowTypes) || payload.rowTypes.length !== payload.rows.length) throw new Error('Morning Sheets connector rowTypes should match row count');
  if (!payload.rowTypes.includes('blank') || !payload.rowTypes.includes('separator') || !payload.rowTypes.includes('time')) throw new Error('Morning Sheets connector should explicitly mark blank, time, and separator rows');
  const blankIndex = payload.rowTypes.indexOf('blank');
  if (blankIndex < 0 || payload.rows[blankIndex].some(cell => String(cell || '') !== '')) throw new Error('Test expected a truly empty blank driver row');
  const separatorIndex = payload.rowTypes.indexOf('separator');
  if (separatorIndex < 0 || payload.rows[separatorIndex].some(cell => String(cell || '') !== '')) throw new Error('Explicit separator row should be empty and marked separately from blank driver rows');
  payload.rows.forEach((row, index) => {
    if (row.length !== 13) throw new Error('Connector row ' + (index + 1) + ' has ' + row.length + ' columns instead of 13');
  });
  if (payload.sections[0].startRow !== 3 || payload.sections[0].separatorRow <= payload.sections[0].timeRow) throw new Error('Connector section row numbering is wrong');
  const script = ${JSON.stringify(connectorFile)};
  if (morningSheetsAppsScript().trim() !== script.trim()) throw new Error('Embedded copyable Apps Script must exactly match the downloadable connector');
  if (copyMorningAppsScript.toString().includes('fetch(') || !copyMorningAppsScript.toString().includes('morningSheetsAppsScript()')) throw new Error('Copy Apps Script must use the embedded connector without a network fetch');
  if (!script.includes('function onOpen') || !script.includes("createMenu('RelayOps')") || !script.includes('relayOpsConnectorStatus') || !script.includes('Validate template layout') || !script.includes('Run demo write')) throw new Error('Apps Script should add a RelayOps menu for install verification');
  if (!script.includes('function doGet') || !script.includes('relayops-morning-v1') || !script.includes('function doPost') || !script.includes('writeRelayOpsMorningSheet') || !script.includes('RELAYOPS_TEMPLATE_SHEET') || !script.includes('RELAYOPS_LAYOUT') || !script.includes('resolveRelayOpsTarget') || !script.includes('validateRelayOpsTemplateSignature')) throw new Error('Morning Sheets Apps Script connector missing fixed OPS LOG 2026 writer code');
  if (!script.includes('function relayOpsValidateTemplate') || !script.includes('RelayOps template layout is ready') || !script.includes('writeRange: RELAYOPS_WRITE_RANGE') || !script.includes('function relayOpsDefaultPayload')) throw new Error('Apps Script should expose safe template layout validation');
  if (!script.includes('function validateRelayOpsMorningPayload') || !script.includes("const RELAYOPS_WRITE_RANGE = 'A3:M'") || !script.includes('Write range must be A3:M') || !script.includes('Header row must match A-M template') || !script.includes('Row types must match row count') || !script.includes('Separator row ') || !script.includes('has invalid merge rows')) throw new Error('Apps Script should validate payload before writing');
  if (!script.includes('payload.dryRun') || !script.includes('dryRun: true') || !script.includes('layout: layout') || !script.includes('function findRelayOpsMorningSheet')) throw new Error('Apps Script should support dry-run validation without writing cells');
  if (!script.includes('function relayOpsJson') || !script.includes('ok: false') || !script.includes('RelayOps preflight failed') || !script.includes('preflight: validation')) throw new Error('Apps Script should return clear JSON success/failure responses');
  if (!script.includes('LockService.getDocumentLock()') || !script.includes('lock.waitLock(20000)') || !script.includes('lock.releaseLock()')) throw new Error('Apps Script connector should lock the document during writes');
  if (!script.includes('function relayOpsTemplateLayout') || !script.includes('function ensureRelayOpsTemplateCapacity') || !script.includes('insertRowsAfter') || !script.includes('insertColumnsAfter')) throw new Error('Apps Script should verify and expand Google Sheet template capacity before writing');
  if (!script.includes('const result = writeRelayOpsMorningSheet(payload)') || !script.includes('sheet: result.sheetName') || !script.includes('startCell: result.startCell') || !script.includes('writeRange: result.writeRange') || !script.includes('writtenRange: result.writtenRange') || !script.includes("writtenRange: 'A3:V116'") || !script.includes("lastCell: 'V116'")) throw new Error('Apps Script confirmation should report fixed A3:V116 range');
  if (!script.includes('payload.sheetName') || !script.includes('relayOpsAllowedDateNames') || !script.includes('ss.getSheetByName') || !script.includes('Refusing non-date target') || !script.includes('template.copyTo(ss).setName(payload.sheetName)')) throw new Error('Apps Script should use only exact dated tabs and create missing dates from OPS LOG 2026');
  if (!script.includes('RELAYOPS_TEMPLATE_COLS = 22') || !script.includes("RELAYOPS_TEMPLATE_RANGE = 'A3:V'") || !script.includes('return [row[1], row[2], row[3]]') || !script.includes('return [row[5], row[6], row[7]]') || !script.includes('return [row[9], row[10]]') || !script.includes('return [row[12]]')) throw new Error('Apps Script should map compact dashboard rows into fixed B:D, F:H, P:Q, and U blocks');
  if (script.includes('clearFormat()') || script.includes('setColumnWidths(') || script.includes('setValues([headers])')) throw new Error('Original-template connector must preserve formats, widths, headers, and checkbox columns');
  const connectorHtml = (state.modal = 'morning-sheets-connector', modal());
  if (!connectorHtml.includes('GOOGLE SHEETS CONNECTOR') || !connectorHtml.includes('COPY REVISED APPS SCRIPT') || !connectorHtml.includes('Legacy Logistics Operations') || !connectorHtml.includes('OPS LOG 2026') || !connectorHtml.includes('exact date only') || !connectorHtml.includes('Wave 1 row 3') || !connectorHtml.includes('DSP row 111') || !connectorHtml.includes('Copy setup checklist') || !connectorHtml.includes('Download .gs file') || !connectorHtml.includes(MORNING_APPS_SCRIPT_URL) || !connectorHtml.includes('Test connector') || !connectorHtml.includes('Dry run') || !connectorHtml.includes('Send to Google Sheet')) throw new Error('Fixed OPS LOG 2026 connector modal is missing date-only mapping/setup guidance');
  if (!${JSON.stringify(connectorFile)}.includes('function onOpen') || !${JSON.stringify(connectorFile)}.includes("createMenu('RelayOps')") || !${JSON.stringify(connectorFile)}.includes('Validate template layout') || !${JSON.stringify(connectorFile)}.includes('function relayOpsValidateTemplate') || !${JSON.stringify(connectorFile)}.includes('function validateRelayOpsMorningPayload') || !${JSON.stringify(connectorFile)}.includes('Write range must be A3:M') || !${JSON.stringify(connectorFile)}.includes('payload.dryRun') || !${JSON.stringify(connectorFile)}.includes('function relayOpsTemplateLayout') || !${JSON.stringify(connectorFile)}.includes('function ensureRelayOpsTemplateCapacity') || !${JSON.stringify(connectorFile)}.includes("RELAYOPS_TEMPLATE_RANGE = 'A3:V'") || !${JSON.stringify(connectorFile)}.includes('function findRelayOpsMorningSheet') || !${JSON.stringify(connectorFile)}.includes('ok: false') || !${JSON.stringify(connectorFile)}.includes('LockService.getDocumentLock()') || !${JSON.stringify(connectorFile)}.includes('function doPost') || !${JSON.stringify(connectorFile)}.includes('writeRelayOpsMorningSheet') || !${JSON.stringify(connectorFile)}.includes('sheet: result.sheetName')) throw new Error('Permanent Apps Script connector file missing original-template behavior');
  if (connectorUrlWithPing('https://script.google.com/macros/s/demo/exec') !== 'https://script.google.com/macros/s/demo/exec?relayops=ping') throw new Error('Connector ping URL without query failed');
  if (connectorUrlWithPing('https://script.google.com/macros/s/demo/exec?x=1') !== 'https://script.google.com/macros/s/demo/exec?x=1&relayops=ping') throw new Error('Connector ping URL with query failed');
  if (!testMorningSheetsConnector.toString().includes('A3:V') || !testMorningSheetsConnector.toString().includes('2026-07-11-main-ops-log-id-locked') || !testMorningSheetsConnector.toString().includes('Connector deployment is outdated')) throw new Error('Connector test should verify OPS LOG 2026 fixed-layout deployment');
  if (!syncFilteredMorningToSheets.toString().includes("mode:'no-cors'") || !syncFilteredMorningToSheets.toString().includes('needs-verification')) throw new Error('One-click Google bridge should fall back safely when Apps Script CORS blocks response reading');
  if (parseMorningSheetsResponse('{"ok":true,"rows":12}', 200).rows !== 12) throw new Error('Connector response parser should accept ok:true JSON');
  let rejected = false;
  try { parseMorningSheetsResponse('{"ok":false,"error":"Row 1 must have 13 columns"}', 200); } catch(error) { rejected = error.relayOpsConfirmed && error.message.includes('13 columns'); }
  if (!rejected) throw new Error('Connector response parser must reject ok:false without fallback');
  if (!sendMorningToSheets.toString().includes('morningSheetsPreflight(payload)') || !sendMorningToSheets.toString().includes('morningSheetsHandoffProof(payload)') || !sendMorningToSheets.toString().includes('Row audit failed') || !sendMorningToSheets.toString().includes('status:\\'confirmed\\'') || !sendMorningToSheets.toString().includes('status:\\'needs-verification\\'') || !sendMorningToSheets.toString().includes('result.writtenRange') || !sendMorningToSheets.toString().includes('error?.relayOpsConfirmed') || !sendMorningToSheets.toString().includes('Google Sheets connector rejected send')) throw new Error('Send to Sheets should gate preflight and row audit, store confirmed/fallback receipts, and reject confirmed connector errors');
  if (!dryRunMorningToSheets.toString().includes('dryRun:true') || !dryRunMorningToSheets.toString().includes('morningSheetsHandoffProof(payload)') || !dryRunMorningToSheets.toString().includes('Row audit failed') || !dryRunMorningToSheets.toString().includes('Connector did not confirm dry run mode') || !dryRunMorningToSheets.toString().includes('result.writtenRange') || !dryRunMorningToSheets.toString().includes('template will auto-expand') || !dryRunMorningToSheets.toString().includes('state.morningSheetsLastDryRun')) throw new Error('Dry run should validate row audit through Apps Script without writing cells');
  if (!syncFilteredMorningToSheets.toString().includes('dryRun:true') || !syncFilteredMorningToSheets.toString().includes('postMorningSheetsPayload(endpoint,payload)') || !syncFilteredMorningToSheets.toString().includes('Google did not confirm the safety check') || !syncFilteredMorningToSheets.toString().includes('filterScope:morningFilterScopeText()')) throw new Error('One-click bridge should dry run, send the exact filtered payload, and save filter scope in its receipt');
  if (!action.toString().includes('sync-filtered-morning-to-sheets')) throw new Error('Filtered-waves Google bridge action missing');
  const setupChecklist = morningSheetsSetupChecklist();
  if (!setupChecklist.includes(MORNING_TEMPLATE_URL) || !setupChecklist.includes('Extensions > Apps Script') || !setupChecklist.includes('Validate template layout') || !setupChecklist.includes('Deploy > New deployment > Web app') || !setupChecklist.includes('Execute as: Me') || !setupChecklist.includes('Anyone with the link') || !setupChecklist.includes('Dry run') || !setupChecklist.includes('exact written range') || !setupChecklist.includes('last cell') || !setupChecklist.includes('A:H') || !setupChecklist.includes('P:Q') || !setupChecklist.includes('Last confirmed Google write')) throw new Error('Morning Sheets setup checklist missing original-template install steps');
  if (!copyMorningSheetsSetup.toString().includes('morningSheetsSetupChecklist()') || !action.toString().includes('copy-morning-sheets-setup')) throw new Error('Morning Sheets setup checklist copy action missing');
  const verifyChecklist = morningSheetsVerificationChecklist(payload);
  if (!verifyChecklist.includes('RelayOps Google Sheet Send Verification') || !verifyChecklist.includes('Expected template range: A3:V') || !verifyChecklist.includes('Expected last cell: V') || !verifyChecklist.includes('Protected mapping: A:H setup') || !verifyChecklist.includes('Row 1 should stay frozen') || !verifyChecklist.includes('Stop Count is in P') || !verifyChecklist.includes('Planned RTS is in purple column U') || !verifyChecklist.includes('Sent — verify in Google Sheet')) throw new Error('Morning Sheets verification checklist missing original-template checks');
  if (!copyMorningSheetsVerification.toString().includes('morningSheetsVerificationChecklist()') || !action.toString().includes('copy-morning-sheets-verify')) throw new Error('Morning Sheets verification checklist copy action missing');
  if (!copySelectedSheetCells.toString().includes('Select cells first') || !handleSheetSelectionCopy.toString().includes('Nothing copied') || !copyMorningVisible.toString().includes('morningSheetsHandoffProof().range')) throw new Error('Copy fallback should give clear no-selection and paste-range guidance');
  state.morningSheetsLastReceipt = {sheet:'Morning Operations',startCell:'A3',writeRange:'A3:M46',lastCell:'M46',rows:44,sections:5,status:'confirmed',updatedAt:'2026-07-08T12:00:00.000Z'};
  const receiptHtml = morningSheetsReceiptHtml();
  if (!receiptHtml.includes('Last confirmed Google write') || !receiptHtml.includes('Confirmed') || !receiptHtml.includes('Morning Operations') || !receiptHtml.includes('A3:M46') || !receiptHtml.includes('Last cell') || !receiptHtml.includes('M46') || !receiptHtml.includes('44') || !receiptHtml.includes('5')) throw new Error('Morning Sheets receipt UI missing confirmed write details');
  state.morningSheetsLastReceipt = {sheet:'Morning Operations',startCell:'A3',writeRange:'A3:M99',rows:97,sections:7,status:'needs-verification',updatedAt:'9:41 AM'};
  const fallbackReceiptHtml = morningSheetsReceiptHtml();
  if (!fallbackReceiptHtml.includes('Sent — verify in Google Sheet') || !fallbackReceiptHtml.includes('Needs check') || !fallbackReceiptHtml.includes('Browser fallback was used') || !fallbackReceiptHtml.includes('A3:M99') || !fallbackReceiptHtml.includes('last written cell is M99')) throw new Error('Morning Sheets fallback receipt should clearly require Google verification');
  const receiptConnectorHtml = (state.modal = 'morning-sheets-connector', modal());
  if (!receiptConnectorHtml.includes('Sent — verify in Google Sheet') || !receiptConnectorHtml.includes('Needs check')) throw new Error('Morning Sheets connector modal should show fallback verification receipt');
  if (!persist.toString().includes('relayops_morning_sheets_last_receipt') || !persist.toString().includes('relayops_morning_sheets_last_dry_run')) throw new Error('Morning Sheets receipt and dry run should persist locally');
  state.modal = null;
`;

vm.createContext(context);
vm.runInContext(source + checks, context, { filename: 'app.js' });
console.log('Morning copy grid test passed');
