// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;
const RELAYOPS_WRITE_RANGE = 'A3:M';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('RelayOps')
    .addItem('Connector status', 'relayOpsConnectorStatus')
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
  return relayOpsJson({
    ok: true,
    connector: 'relayops-morning-v1',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getName(),
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
      return relayOpsJson({
        ok: true,
        dryRun: true,
        sheet: sheet.getName(),
        startCell: payload.startCell,
        writeRange: payload.writeRange,
        rows: (payload.rows || []).length,
        sections: (payload.sections || []).length,
        preflight: validation,
        updatedAt: new Date().toISOString()
      });
    }
    lock = LockService.getDocumentLock();
    lock.waitLock(20000);
    const result = writeRelayOpsMorningSheet(payload);
    return relayOpsJson({
      ok: true,
      sheet: result.sheetName,
      startCell: result.startCell,
      writeRange: result.writeRange,
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

function writeRelayOpsMorningSheet(payload) {
  const validation = validateRelayOpsMorningPayload(payload);
  if (!validation.ready) throw new Error('RelayOps preflight failed: ' + validation.errors.join('; '));
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = findRelayOpsMorningSheet(payload);
  const rows = payload.rows || [];
  const rowTypes = payload.rowTypes || [];
  const headers = (payload.headers || []).slice(0, RELAYOPS_COLS);
  if (!rows.length) throw new Error('No morning rows sent');
  while (headers.length < RELAYOPS_COLS) headers.push('');
  const rowCount = Math.max(rows.length, 120);
  const target = sheet.getRange(RELAYOPS_START_ROW, RELAYOPS_START_COL, rowCount, RELAYOPS_COLS);
  target.breakApart();
  target.clearContent();
  target.setBackground('#ffffff').setFontColor('#111111').setFontWeight('normal')
    .setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, '#111111', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(RELAYOPS_START_ROW, RELAYOPS_START_COL, rows.length, RELAYOPS_COLS).setValues(rows);

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, RELAYOPS_COLS).setValues([headers])
    .setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, '#111111', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(1, 1).setBackground('#b4a7d6');
  sheet.getRange(1, 2, 1, 7).setBackground('#86e8ed').setFontColor('#000000');
  sheet.getRange(1, 9).setBackground('#050505').setFontColor('#050505');
  sheet.getRange(1, 10, 1, 2).setBackground('#86e8ed').setFontColor('#000000');
  sheet.getRange(1, 12).setBackground('#050505').setFontColor('#050505');
  sheet.getRange(1, 13).setBackground('#b4a7d6').setFontColor('#000000');
  sheet.setRowHeight(1, 28);
  sheet.setColumnWidths(1, 1, 75);
  sheet.setColumnWidths(2, 1, 132);
  sheet.setColumnWidths(3, 2, 74);
  sheet.setColumnWidths(5, 1, 76);
  sheet.setColumnWidths(6, 3, 76);
  sheet.setColumnWidths(9, 1, 18);
  sheet.setColumnWidths(10, 2, 94);
  sheet.setColumnWidths(12, 1, 18);
  sheet.setColumnWidths(13, 1, 92);

  rows.forEach(function(row, i) {
    const sheetRow = RELAYOPS_START_ROW + i;
    const rowType = rowTypes[i] || '';
    if (rowType === 'separator') {
      sheet.getRange(sheetRow, RELAYOPS_START_COL, 1, RELAYOPS_COLS)
        .setBackground('#050505').setFontColor('#050505').setBorder(true, true, true, true, true, true, '#050505', SpreadsheetApp.BorderStyle.SOLID);
      sheet.setRowHeight(sheetRow, 14);
    } else {
      sheet.getRange(sheetRow, 1, 1, 8).setBackground('#eef3ff');
      sheet.getRange(sheetRow, 9, 1, 1).setBackground('#050505').setFontColor('#050505');
      sheet.getRange(sheetRow, 10, 1, 2).setBackground('#eef3ff');
      sheet.getRange(sheetRow, 12, 1, 1).setBackground('#050505').setFontColor('#050505');
      sheet.getRange(sheetRow, 13, 1, 1).setBackground('#b4a7d6');
      sheet.setRowHeight(sheetRow, rowType === 'blank' ? 18 : 21);
    }
  });

  (payload.sections || []).forEach(function(section) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    if (!start || !count) return;
    sheet.getRange(start, 1, count, 1).merge().setValue(section.label || '')
      .setFontSize(26).setFontWeight('bold').setTextRotation(90).setBackground('#eef3ff');
    sheet.getRange(start + count, 1).setValue(section.waveTime || '').setFontWeight('bold').setBackground('#eef3ff');
    sheet.getRange(start, 5, count + 1, 1).merge().setValue(section.pad || '')
      .setFontSize(22).setFontWeight('bold').setBackground('#eef3ff');
  });
  return {sheetName: sheet.getName(), startCell: 'A3', writeRange: RELAYOPS_WRITE_RANGE};
}

function findRelayOpsMorningSheet(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = [payload.sheetName].concat(payload.sheetNameCandidates || []).filter(Boolean);
  let sheet = null;
  for (var s = 0; s < sheetNames.length && !sheet; s++) sheet = ss.getSheetByName(sheetNames[s]);
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
