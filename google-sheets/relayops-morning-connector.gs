// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;

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
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    connector: 'relayops-morning-v1',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getName(),
    checkedAt: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  const lock = LockService.getDocumentLock();
  lock.waitLock(20000);
  try {
    const result = writeRelayOpsMorningSheet(payload);
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      sheet: result.sheetName,
      startCell: result.startCell,
      rows: (payload.rows || []).length,
      sections: (payload.sections || []).length,
      updatedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function writeRelayOpsMorningSheet(payload) {
  if (!payload || payload.version !== 'relayops-morning-v1') throw new Error('Wrong RelayOps payload');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = [payload.sheetName].concat(payload.sheetNameCandidates || []).filter(Boolean);
  let sheet = null;
  for (var s = 0; s < sheetNames.length && !sheet; s++) sheet = ss.getSheetByName(sheetNames[s]);
  sheet = sheet || ss.getActiveSheet() || ss.getSheets()[0];
  if (!sheet) throw new Error('No target sheet tab found');
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
  return {sheetName: sheet.getName(), startCell: 'A3'};
}

function testRelayOpsMorningSheet() {
  const sample = {
    version: 'relayops-morning-v1',
    headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    sheetName: 'Morning Operations',
    sheetNameCandidates: ['Morning Operations','Opening Operations','Morning Sheet','Sheet1'],
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    rowTypes: ['route','time','separator'],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}]
  };
  writeRelayOpsMorningSheet(sample);
}
