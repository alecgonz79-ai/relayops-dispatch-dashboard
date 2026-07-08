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
const checks = `
  if (!${JSON.stringify(css)}.includes('.ops-sheet thead tr:nth-child(2) th { top:25px; z-index:11; }')) throw new Error('Second sticky header row must sit below column letters');
  if (!${JSON.stringify(css)}.includes('.ops-sheet .sheet-letters-row th { top:0; z-index:12;')) throw new Error('Column letters sticky header layer missing');
  if (!${JSON.stringify(css)}.includes('background-clip:padding-box')) throw new Error('Sticky header background clipping missing');
  toast = () => {};
  state.page = 'morning';
  state.copyMode = true;
  state.editMode = false;
  const html = morningSheetPage();
  if (!html.includes('Connector setup for exact Google Sheets handoff')) throw new Error('Morning connector guide missing');
  if (!html.includes('PERFECT GOOGLE SHEETS HANDOFF') || !html.includes('Set up exact-format connector') || !html.includes('Copy fallback')) throw new Error('Exact-format handoff UI should prioritize the Sheets connector and keep copy as fallback');
  if (!html.includes(MORNING_TEMPLATE_URL)) throw new Error('Google Sheets template link missing');
  if (!html.includes('Copy/paste cannot reliably transfer merged-cell formatting')) throw new Error('Merged-cell paste warning missing');
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
  if (sheetCopyZone(8).join(',') !== '0,12' || sheetCopyZone(11).join(',') !== '0,12') throw new Error('Black spacer columns must be selectable/copyable');
  if (sheetCopyZone(12).join(',') !== '0,12') throw new Error('Planned RTS column should be in the same copy boundary');
  if (typeof writeClipboardTable !== 'function') throw new Error('Rich clipboard table writer missing');
  const clipHtml = morningSheetClipboardHtml();
  if (!clipHtml.includes('<table')) throw new Error('Clipboard HTML table missing');
  if (!clipHtml.includes('rowspan=')) throw new Error('Clipboard HTML should include merged-cell rowspans for wave/pad cells');
  if (!clipHtml.includes('background:#050505')) throw new Error('Clipboard HTML should preserve black divider/spacer styling');
  if (!clipHtml.includes('background:#b4a7d6')) throw new Error('Clipboard HTML should preserve planned RTS purple styling');
  if (!clipHtml.includes('WAVE 1')) throw new Error('Clipboard HTML should include wave labels');
  const fallbackHtml = tsvToHtmlTable(tsv);
  if (!fallbackHtml.includes('<td') || !fallbackHtml.includes('table-layout:fixed')) throw new Error('TSV HTML fallback table missing');
  const payload = morningSheetsConnectorPayload();
  if (payload.version !== 'relayops-morning-v1') throw new Error('Morning Sheets connector payload version missing');
  if (payload.sheetName !== 'Morning Operations') throw new Error('Morning Sheets connector should include target sheet name');
  if (!Array.isArray(payload.sheetNameCandidates) || !payload.sheetNameCandidates.includes('Opening Operations') || !payload.sheetNameCandidates.includes('Sheet1')) throw new Error('Morning Sheets connector should include safe target sheet fallbacks');
  if (payload.startCell !== 'A3') throw new Error('Morning Sheets connector should target A3');
  if (payload.headers.length !== 13) throw new Error('Morning Sheets connector should use 13 A-M headers');
  if (payload.headers[0] !== 'WAVE' || payload.headers[12] !== 'PLANNED RTS') throw new Error('Morning Sheets connector headers should match the A-M template');
  if (!payload.rows.length || !payload.sections.length) throw new Error('Morning Sheets connector payload missing rows or sections');
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
  const script = morningSheetsAppsScript();
  if (!script.includes('function doGet') || !script.includes('relayops-morning-v1') || !script.includes('function doPost') || !script.includes('writeRelayOpsMorningSheet') || !script.includes('breakApart') || !script.includes('merge()')) throw new Error('Morning Sheets Apps Script connector missing required writer code');
  if (!script.includes('const result = writeRelayOpsMorningSheet(payload)') || !script.includes('sheet: result.sheetName') || !script.includes('startCell: result.startCell') || !script.includes("return {sheetName: sheet.getName(), startCell: 'A3'}")) throw new Error('Apps Script confirmation should report the updated sheet tab and start cell');
  if (!script.includes('payload.sheetName') || !script.includes('payload.sheetNameCandidates') || !script.includes('ss.getSheetByName') || !script.includes('No target sheet tab found')) throw new Error('Apps Script should target the intended sheet tab before falling back');
  if (!script.includes("rowType === 'separator'") || script.includes('row.every(function(cell)')) throw new Error('Apps Script should use explicit rowTypes, not blank-row guessing, for separators');
  if (!script.includes('sheet.setFrozenRows(1)') || !script.includes('setValues([headers])') || !script.includes("sheet.setRowHeight(1, 28)") || !script.includes("sheet.getRange(1, 9).setBackground('#050505')") || !script.includes("sheet.getRange(1, 13).setBackground('#b4a7d6')")) throw new Error('Apps Script should restore the frozen A-M header row');
  const connectorHtml = (state.modal = 'morning-sheets-connector', modal());
  if (!connectorHtml.includes('GOOGLE SHEETS CONNECTOR') || !connectorHtml.includes('Copy Apps Script') || !connectorHtml.includes('Download .gs file') || !connectorHtml.includes(MORNING_APPS_SCRIPT_URL) || !connectorHtml.includes('Test connector') || !connectorHtml.includes('Send to Google Sheet') || !connectorHtml.includes('Connector payload preview')) throw new Error('Morning Sheets connector modal missing');
  if (!${JSON.stringify(connectorFile)}.includes('function doPost') || !${JSON.stringify(connectorFile)}.includes('writeRelayOpsMorningSheet') || !${JSON.stringify(connectorFile)}.includes("rowType === 'separator'") || !${JSON.stringify(connectorFile)}.includes('sheet: result.sheetName')) throw new Error('Permanent Apps Script connector file missing required behavior');
  if (connectorUrlWithPing('https://script.google.com/macros/s/demo/exec') !== 'https://script.google.com/macros/s/demo/exec?relayops=ping') throw new Error('Connector ping URL without query failed');
  if (connectorUrlWithPing('https://script.google.com/macros/s/demo/exec?x=1') !== 'https://script.google.com/macros/s/demo/exec?x=1&relayops=ping') throw new Error('Connector ping URL with query failed');
  state.modal = null;
`;

vm.createContext(context);
vm.runInContext(source + checks, context, { filename: 'app.js' });
console.log('Morning copy grid test passed');
