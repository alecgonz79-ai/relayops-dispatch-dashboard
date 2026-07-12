// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;
const RELAYOPS_WRITE_RANGE = 'A3:M';
const RELAYOPS_TEMPLATE_COLS = 22;
const RELAYOPS_TEMPLATE_RANGE = 'A3:V';
const RELAYOPS_TEMPLATE_SHEET = 'OPS LOG 2026';
const RELAYOPS_SPREADSHEET_ID = '1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ';
const RELAYOPS_BUILD = '2026-07-12-values-only-transfer';
const RELAYOPS_LAYOUT = [
  {key:'WAVE1', label:'WAVE 1', startRow:3, routeCapacity:13, timeRow:16, separatorRow:17},
  {key:'WAVE2', label:'WAVE 2', startRow:18, routeCapacity:13, timeRow:31, separatorRow:32},
  {key:'WAVE3', label:'WAVE 3', startRow:33, routeCapacity:13, timeRow:46, separatorRow:47},
  {key:'WAVE4', label:'WAVE 4', startRow:48, routeCapacity:13, timeRow:61, separatorRow:62},
  {key:'WAVE5', label:'WAVE 5', startRow:63, routeCapacity:13, timeRow:76, separatorRow:77},
  {key:'ADHOCS', label:"ADHOC's", startRow:79, routeCapacity:15, separatorRow:94},
  {key:'HELPERS', label:'HELPERS', startRow:95, routeCapacity:15, separatorRow:110},
  {key:'DSP', label:'DSP', startRow:111, routeCapacity:6}
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('RelayOps')
    .addItem('Connector status', 'relayOpsConnectorStatus')
    .addItem('Validate template layout', 'relayOpsValidateTemplate')
    .addItem('Run demo write', 'testRelayOpsMorningSheet')
    .addToUi();
}

function relayOpsConnectorStatus() {
  const ss = relayOpsSpreadsheet();
  SpreadsheetApp.getUi().alert(
    'RelayOps connector is installed',
    'Spreadsheet: ' + ss.getName() + '\nDeploy this Apps Script as a Web app, then paste the /exec URL into the RelayOps dashboard.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function doGet(e) {
  const ss = relayOpsSpreadsheet();
  const sheet = ss.getSheetByName(RELAYOPS_TEMPLATE_SHEET);
  if (!sheet) throw new Error('Blank template tab "' + RELAYOPS_TEMPLATE_SHEET + '" was not found');
  const layout = relayOpsTemplateLayout(sheet, 0);
  return relayOpsJson({
    ok: true,
    connector: 'relayops-morning-v1',
    build: RELAYOPS_BUILD,
    spreadsheet: ss.getName(),
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
      const target = resolveRelayOpsTarget(payload, false);
      const sheet = target.sheet;
      const layout = relayOpsTemplateLayout(sheet, (payload.rows || []).length);
      return relayOpsJson({
        ok: true,
        build: RELAYOPS_BUILD,
        dryRun: true,
        sheet: target.targetName,
        templateSheet: sheet.getName(),
        wouldCreateSheet: target.wouldCreate,
        startCell: payload.startCell,
        writeRange: payload.writeRange,
        writtenRange: 'A3:V116',
        lastCell: 'V116',
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
    sheetName: RELAYOPS_TEMPLATE_SHEET,
    sheetNameCandidates: [RELAYOPS_TEMPLATE_SHEET]
  };
}

function relayOpsAllowedDateNames(operationDate) {
  const match = String(operationDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return [];
  const year = String(Number(match[1])).slice(-2);
  const month = String(Number(match[2]));
  const day = String(Number(match[3]));
  return [month + '/' + day + '/' + year, month + '.' + day + '.' + year];
}

function relayOpsSectionKey(value) {
  const key = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (key === 'ADHOC' || key === 'ADHOCS') return 'ADHOCS';
  return key;
}

function relayOpsLayoutForSection(section) {
  const key = relayOpsSectionKey(section && (section.label || section.wave));
  for (var i = 0; i < RELAYOPS_LAYOUT.length; i++) if (RELAYOPS_LAYOUT[i].key === key) return RELAYOPS_LAYOUT[i];
  return null;
}

function relayOpsSectionRows(payload, section) {
  const sourceIndex = Math.max(0, Number(section.startRow || RELAYOPS_START_ROW) - RELAYOPS_START_ROW);
  return (payload.rows || []).slice(sourceIndex, sourceIndex + Number(section.rowCount || 0)).filter(function(row) {
    return row && [row[1], row[2], row[5]].some(function(value) { return String(value || '').trim() !== ''; });
  });
}

function validateRelayOpsMorningPayload(payload) {
  const errors = [];
  const rows = payload && payload.rows || [];
  const rowTypes = payload && payload.rowTypes || [];
  const headers = payload && payload.headers || [];
  const sections = payload && payload.sections || [];
  if (!payload || payload.version !== 'relayops-morning-v1') errors.push('Wrong payload version');
  const allowedDateNames = relayOpsAllowedDateNames(payload && payload.operationDate);
  if (!allowedDateNames.length) errors.push('Operation date must be YYYY-MM-DD');
  if (allowedDateNames.length && allowedDateNames.indexOf(payload.sheetName) < 0) errors.push('Target tab must match operation date: ' + allowedDateNames.join(' or '));
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
    const fixedLayout = relayOpsLayoutForSection(section);
    if (!fixedLayout) errors.push('Section ' + (i + 1) + ' is not supported by OPS LOG 2026: ' + String(section.label || section.wave || 'unnamed'));
    else {
      const invalidBase = !start || start < RELAYOPS_START_ROW || !count;
      const invalidTime = Boolean(fixedLayout.timeRow) && (!time || time <= start);
      const invalidSeparator = Boolean(fixedLayout.separatorRow) && (!separator || separator <= start || (fixedLayout.timeRow && separator <= time));
      if (invalidBase || invalidTime || invalidSeparator) errors.push('Section ' + (i + 1) + ' has invalid merge rows');
      if (relayOpsSectionRows(payload, section).length > fixedLayout.routeCapacity) errors.push(fixedLayout.label + ' exceeds ' + fixedLayout.routeCapacity + ' available route rows');
    }
  });
  return {ready: errors.length === 0, errors: errors};
}

function relayOpsValidateTemplate() {
  const sheet = relayOpsSpreadsheet().getSheetByName(RELAYOPS_TEMPLATE_SHEET);
  if (!sheet) throw new Error('Blank template tab "' + RELAYOPS_TEMPLATE_SHEET + '" was not found');
  validateRelayOpsTemplateSignature(sheet);
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
  // The original OPS LOG 2026 template is a fixed 116-row form. Do not
  // calculate capacity from payload length: doing so previously inserted rows
  // and shifted the template's merged Wave/PAD cells and divider rows.
  const neededRows = 116;
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
  const target = resolveRelayOpsTarget(payload, true);
  const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);

  // Clear only dashboard-owned cells inside the fixed OPS LOG 2026 sections.
  // Existing merges, headers, widths, colors, checkboxes J:M, divider N,
  // and operations columns O/R/S/T/V remain untouched.
  RELAYOPS_LAYOUT.forEach(function(layout) {
    sheet.getRange(layout.startRow, 2, layout.routeCapacity, 3).clearContent();
    sheet.getRange(layout.startRow, 6, layout.routeCapacity, 3).clearContent();
    sheet.getRange(layout.startRow, 16, layout.routeCapacity, 2).clearContent();
    sheet.getRange(layout.startRow, 21, layout.routeCapacity, 1).clearContent();
    sheet.getRange(layout.startRow, 1).setValue(layout.label);
    if (layout.timeRow) sheet.getRange(layout.timeRow, 1).clearContent();
  });

  (payload.sections || []).forEach(function(section) {
    const layout = relayOpsLayoutForSection(section);
    if (!layout) return;
    const sectionRows = relayOpsSectionRows(payload, section);
    if (sectionRows.length) {
      sheet.getRange(layout.startRow, 2, sectionRows.length, 3).setValues(sectionRows.map(function(row) { return [row[1], row[2], row[3]]; }));
      sheet.getRange(layout.startRow, 6, sectionRows.length, 3).setValues(sectionRows.map(function(row) { return [row[5], row[6], row[7]]; }));
      sheet.getRange(layout.startRow, 16, sectionRows.length, 2).setValues(sectionRows.map(function(row) { return [row[9], row[10]]; }));
      sheet.getRange(layout.startRow, 21, sectionRows.length, 1).setValues(sectionRows.map(function(row) { return [row[12]]; }));
    }
    sheet.getRange(layout.startRow, 1).setValue(layout.label);
    if (section.pad !== undefined && section.pad !== null && String(section.pad) !== '') sheet.getRange(layout.startRow, 5).setValue(section.pad);
    if (layout.timeRow) sheet.getRange(layout.timeRow, 1).setValue(section.waveTime || '');
  });
  return {sheetName: sheet.getName(), startCell: 'A3', writeRange: RELAYOPS_TEMPLATE_RANGE, writtenRange: 'A3:V116', lastCell: 'V116', createdSheet: target.created};
}

function validateRelayOpsTemplateSignature(sheet) {
  if (!sheet) throw new Error('OPS LOG sheet was not found');
  if (sheet.getMaxRows() < 116 || sheet.getMaxColumns() < 22) throw new Error('Target tab is not the 116-row, 22-column OPS LOG 2026 layout');
  const expected = [['A1','WAVE'],['J1','PRE DVIC'],['P1','STOP COUNT'],['U1','PLANNED RTS'],['V1','CLOCK OUT TIME'],['A3','WAVE 1'],['A18','WAVE 2'],['A33','WAVE 3'],['A48','WAVE 4'],['A63','WAVE 5'],['A79',"ADHOC's"],['A95','HELPERS'],['A111','DSP']];
  expected.forEach(function(item) {
    const actual = String(sheet.getRange(item[0]).getDisplayValue() || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const wanted = String(item[1]).toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (actual !== wanted) throw new Error('Target tab does not match OPS LOG 2026 at ' + item[0] + ' (expected ' + item[1] + ')');
  });
  return true;
}

function resolveRelayOpsTarget(payload, createIfMissing) {
  const ss = relayOpsSpreadsheet();
  const allowedNames = relayOpsAllowedDateNames(payload.operationDate);
  if (!allowedNames.length) throw new Error('A valid operationDate is required before choosing a dated Ops Log tab');
  if (allowedNames.indexOf(payload.sheetName) < 0) throw new Error('Refusing non-date target. Expected ' + allowedNames.join(' or '));
  const sheetNames = [payload.sheetName].concat(allowedNames).filter(function(name, index, values) { return name && values.indexOf(name) === index; });
  let sheet = null;
  for (var s = 0; s < sheetNames.length && !sheet; s++) sheet = ss.getSheetByName(sheetNames[s]);
  if (sheet) { validateRelayOpsTemplateSignature(sheet);return {sheet:sheet,targetName:sheet.getName(),wouldCreate:false,created:false}; }
  const template = ss.getSheetByName(RELAYOPS_TEMPLATE_SHEET);
  if (!template) throw new Error('Blank template tab "' + RELAYOPS_TEMPLATE_SHEET + '" was not found');
  validateRelayOpsTemplateSignature(template);
  if (!createIfMissing) return {sheet:template,targetName:payload.sheetName,wouldCreate:true,created:false};
  const created = template.copyTo(ss).setName(payload.sheetName);
  validateRelayOpsTemplateSignature(created);
  return {sheet:created,targetName:created.getName(),wouldCreate:false,created:true};
}

function relayOpsSpreadsheet() {
  return SpreadsheetApp.openById(RELAYOPS_SPREADSHEET_ID);
}

function findRelayOpsMorningSheet(payload) {
  return resolveRelayOpsTarget(payload, false).sheet;
}

function testRelayOpsMorningSheet() {
  const sample = {
    version: 'relayops-morning-v1',
    startCell: 'A3',
    writeRange: 'A3:M',
    headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    operationDate: '2026-07-12',
    sheetName: '7/12/26',
    sheetNameCandidates: ['7/12/26','7.12.26'],
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    rowTypes: ['route','time','separator'],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}]
  };
  writeRelayOpsMorningSheet(sample);
}
