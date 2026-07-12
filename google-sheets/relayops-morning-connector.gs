// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;
const RELAYOPS_WRITE_RANGE = 'A3:M';
const RELAYOPS_TEMPLATE_COLS = 22;
const RELAYOPS_TEMPLATE_RANGE = 'A3:V';
const RELAYOPS_BUILD = '2026-07-11-legacy-ops-log';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('RelayOps')
    .addItem('Connector status', 'relayOpsConnectorStatus')
    .addItem('Validate template layout', 'relayOpsValidateTemplate')
    .addItem('Run demo write', 'testRelayOpsMorningSheet')
    .addToUi();
}

function relayOpsConnectorStatus() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.getUi().alert(
    'RelayOps connector is installed',
    'Spreadsheet: ' + ss.getName() + '\nDeploy this Apps Script as a Web app, then paste the /exec URL into the RelayOps dashboard.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function doGet(e) {
  const sheet = findRelayOpsMorningSheet(relayOpsDefaultPayload());
  const layout = relayOpsTemplateLayout(sheet, 0);
  return relayOpsJson({
    ok: true,
    connector: 'relayops-morning-v1',
    build: RELAYOPS_BUILD,
    spreadsheet: SpreadsheetApp.getActiveSpreadsheet().getName(),
    sheet: sheet.getName(),
    startCell: 'A3',
    writeRange: RELAYOPS_WRITE_RANGE,
    templateRange: RELAYOPS_TEMPLATE_RANGE,
    layout: layout,
    checkedAt: new Date().toISOString()
  });
}

function doPost(e) {
  let lock = null;
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const validation = validateRelayOpsMorningPayload(payload);
    if (!validation.ready) throw new Error('RelayOps preflight failed: ' + validation.errors.join('; '));
    if (payload.dryRun) {
      const sheet = findRelayOpsMorningSheet(payload);
      const layout = relayOpsTemplateLayout(sheet, (payload.rows || []).length);
      return relayOpsJson({
        ok: true,
        build: RELAYOPS_BUILD,
        dryRun: true,
        sheet: sheet.getName(),
        startCell: payload.startCell,
        writeRange: payload.writeRange,
        writtenRange: 'A3:V' + ((payload.rows || []).length + 2),
        lastCell: 'V' + ((payload.rows || []).length + 2),
        rows: (payload.rows || []).length,
        sections: (payload.sections || []).length,
        layout: layout,
        preflight: validation,
        updatedAt: new Date().toISOString()
      });
    }
    lock = LockService.getDocumentLock();
    lock.waitLock(20000);
    const result = writeRelayOpsMorningSheet(payload);
    return relayOpsJson({
      ok: true,
      build: RELAYOPS_BUILD,
      sheet: result.sheetName,
      startCell: result.startCell,
      writeRange: result.writeRange,
      writtenRange: result.writtenRange,
      lastCell: result.lastCell,
      rows: (payload.rows || []).length,
      sections: (payload.sections || []).length,
      preflight: validation,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return relayOpsJson({
      ok: false,
      error: error && error.message ? error.message : String(error),
      updatedAt: new Date().toISOString()
    });
  } finally {
    if (lock) lock.releaseLock();
  }
}

function relayOpsJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function relayOpsDefaultPayload() {
  return {
    sheetName: 'Morning Operations',
    sheetNameCandidates: ['Morning Operations', 'Opening Operations', 'Morning Sheet', 'Sheet1']
  };
}

function validateRelayOpsMorningPayload(payload) {
  const errors = [];
  const rows = payload && payload.rows || [];
  const rowTypes = payload && payload.rowTypes || [];
  const headers = payload && payload.headers || [];
  const sections = payload && payload.sections || [];
  if (!payload || payload.version !== 'relayops-morning-v1') errors.push('Wrong payload version');
  if (payload && payload.startCell !== 'A3') errors.push('Start cell must be A3');
  if (payload && payload.writeRange !== RELAYOPS_WRITE_RANGE) errors.push('Write range must be A3:M');
  if (headers.length !== RELAYOPS_COLS || headers[0] !== 'WAVE' || headers[12] !== 'PLANNED RTS') errors.push('Header row must match A-M template');
  if (!rows.length) errors.push('No morning rows sent');
  rows.forEach(function(row, i) {
    if (!Array.isArray(row) || row.length !== RELAYOPS_COLS) errors.push('Row ' + (i + 1) + ' must have 13 columns');
  });
  if (rowTypes.length !== rows.length) errors.push('Row types must match row count');
  if (rowTypes.indexOf('route') < 0 || rowTypes.indexOf('time') < 0 || rowTypes.indexOf('separator') < 0) errors.push('Missing route/time/separator row types');
  rowTypes.forEach(function(type, i) {
    if (type === 'separator' && rows[i] && rows[i].some(function(cell) { return String(cell || '') !== ''; })) errors.push('Separator row ' + (i + 1) + ' must be empty');
  });
  if (!sections.length) errors.push('No wave sections sent');
  sections.forEach(function(section, i) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    const time = Number(section.timeRow);
    const separator = Number(section.separatorRow);
    if (!start || start < RELAYOPS_START_ROW || !count || time <= start || separator <= time) errors.push('Section ' + (i + 1) + ' has invalid merge rows');
  });
  return {ready: errors.length === 0, errors: errors};
}

function relayOpsValidateTemplate() {
  const sheet = findRelayOpsMorningSheet(relayOpsDefaultPayload());
  const layout = relayOpsTemplateLayout(sheet, 0);
  const ready = layout.hasEnoughColumns && layout.maxRows >= RELAYOPS_START_ROW;
  SpreadsheetApp.getUi().alert(
    ready ? 'RelayOps template layout is ready' : 'RelayOps template needs review',
    'Sheet tab: ' + sheet.getName() +
      '\nDashboard payload: ' + RELAYOPS_WRITE_RANGE +
      '\nOriginal template: ' + RELAYOPS_TEMPLATE_RANGE +
      '\nRows available: ' + layout.maxRows + ' / needs ' + layout.neededRows +
      '\nColumns available: ' + layout.maxColumns + ' / needs ' + layout.neededColumns +
      '\nFrozen rows: ' + layout.frozenRows +
      '\nStatus: ' + (ready ? 'Ready for Dry run / Send' : 'The original Ops Log needs columns A through V'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  return layout;
}

function relayOpsTemplateLayout(sheet, sentRows) {
  const neededRows = RELAYOPS_START_ROW + Math.max(Number(sentRows) || 0, 120) - 1;
  return {
    maxRows: sheet.getMaxRows(),
    maxColumns: sheet.getMaxColumns(),
    neededRows: neededRows,
    neededColumns: RELAYOPS_TEMPLATE_COLS,
    hasEnoughRows: sheet.getMaxRows() >= neededRows,
    hasEnoughColumns: sheet.getMaxColumns() >= RELAYOPS_TEMPLATE_COLS,
    frozenRows: sheet.getFrozenRows()
  };
}

function ensureRelayOpsTemplateCapacity(sheet, rowCount) {
  const layout = relayOpsTemplateLayout(sheet, rowCount);
  if (!layout.hasEnoughRows) sheet.insertRowsAfter(sheet.getMaxRows(), layout.neededRows - sheet.getMaxRows());
  if (!layout.hasEnoughColumns) sheet.insertColumnsAfter(sheet.getMaxColumns(), RELAYOPS_TEMPLATE_COLS - sheet.getMaxColumns());
}

function freezeRelayOpsHeader(sheet) {
  try {
    sheet.getRange(1, 1, 2, RELAYOPS_COLS).getMergedRanges().forEach(function(range) {
      if (range.getRow() === 1) range.breakApart();
    });
  } catch (error) {}
  return sheet.getFrozenRows();
}

function writeRelayOpsMorningSheet(payload) {
  const validation = validateRelayOpsMorningPayload(payload);
  if (!validation.ready) throw new Error('RelayOps preflight failed: ' + validation.errors.join('; '));
  const sheet = findRelayOpsMorningSheet(payload);
  const rows = payload.rows || [];
  if (!rows.length) throw new Error('No morning rows sent');
  const rowCount = Math.max(rows.length, 120);
  ensureRelayOpsTemplateCapacity(sheet, rows.length);
  // Preserve the original A:V Ops Log formatting. Only clear and write the
  // dashboard-owned cells: A:H, P:Q, and U. J:M checkboxes, N/O dividers,
  // returns, end/RTS/clock-out columns, widths, colors, and validations remain untouched.
  sheet.getRange(RELAYOPS_START_ROW, 1, rowCount, 1).breakApart();
  sheet.getRange(RELAYOPS_START_ROW, 5, rowCount, 1).breakApart();
  sheet.getRange(RELAYOPS_START_ROW, 1, rowCount, 8).clearContent();
  sheet.getRange(RELAYOPS_START_ROW, 16, rowCount, 2).clearContent();
  sheet.getRange(RELAYOPS_START_ROW, 21, rowCount, 1).clearContent();
  sheet.getRange(RELAYOPS_START_ROW, 1, rows.length, 8).setValues(rows.map(function(row) { return row.slice(0, 8); }));
  sheet.getRange(RELAYOPS_START_ROW, 16, rows.length, 1).setValues(rows.map(function(row) { return [row[9]]; }));
  sheet.getRange(RELAYOPS_START_ROW, 17, rows.length, 1).setValues(rows.map(function(row) { return [row[10]]; }));
  sheet.getRange(RELAYOPS_START_ROW, 21, rows.length, 1).setValues(rows.map(function(row) { return [row[12]]; }));

  (payload.sections || []).forEach(function(section) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    if (!start || !count) return;
    sheet.getRange(start, 1, count, 1).merge().setValue(section.label || '');
    sheet.getRange(start + count, 1).setValue(section.waveTime || '');
    sheet.getRange(start, 5, count + 1, 1).merge().setValue(section.pad || '');
  });
  const lastRow = rows.length + RELAYOPS_START_ROW - 1;
  return {sheetName: sheet.getName(), startCell: 'A3', writeRange: RELAYOPS_TEMPLATE_RANGE, writtenRange: 'A3:V' + lastRow, lastCell: 'V' + lastRow};
}

function findRelayOpsMorningSheet(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = [payload.sheetName].concat(payload.sheetNameCandidates || []).filter(Boolean);
  let sheet = null;
  for (var s = 0; s < sheetNames.length && !sheet; s++) sheet = ss.getSheetByName(sheetNames[s]);
  if (!sheet && payload.operationDate) throw new Error('No operations tab found for ' + payload.operationDate + '. Create or rename a tab to ' + sheetNames.join(' or ') + ', then send again. Nothing was written.');
  sheet = sheet || ss.getActiveSheet() || ss.getSheets()[0];
  if (!sheet) throw new Error('No target sheet tab found');
  return sheet;
}

function testRelayOpsMorningSheet() {
  const sample = {
    version: 'relayops-morning-v1',
    startCell: 'A3',
    writeRange: 'A3:M',
    headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    sheetName: 'Morning Operations',
    sheetNameCandidates: ['Morning Operations','Opening Operations','Morning Sheet','Sheet1'],
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    rowTypes: ['route','time','separator'],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}]
  };
  writeRelayOpsMorningSheet(sample);
}
