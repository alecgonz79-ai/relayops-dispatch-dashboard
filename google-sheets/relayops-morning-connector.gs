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
const RELAYOPS_BUILD = '2026-07-22-verified-five-wave-footers';
const RELAYOPS_LAYOUT = [
  {key:'WAVE1', label:'WAVE 1', startRow:3, routeCapacity:13, timeRow:16, separatorRow:17},
  {key:'WAVE2', label:'WAVE 2', startRow:18, routeCapacity:13, timeRow:31, separatorRow:32},
  {key:'WAVE3', label:'WAVE 3', startRow:33, routeCapacity:13, timeRow:46, separatorRow:47},
  {key:'WAVE4', label:'WAVE 4', startRow:48, routeCapacity:13, timeRow:61, separatorRow:62},
  {key:'WAVE5', label:'WAVE 5', startRow:63, routeCapacity:14, timeRow:77, separatorRow:78},
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
    if (payload.mode === 'rts-only') {
      const rtsValidation = validateRelayOpsRtsPayload(payload);
      if (!rtsValidation.ready) throw new Error('RelayOps RTS-only preflight failed: ' + rtsValidation.errors.join('; '));
      if (payload.dryRun) {
        const target = resolveRelayOpsTarget(payload, false);
        return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'rts-only',dryRun:true,sheet:target.targetName,wouldCreateSheet:target.wouldCreate,updates:payload.updates.length,waveTimes:payload.waves.length,preflight:rtsValidation,updatedAt:new Date().toISOString()});
      }
      lock = LockService.getDocumentLock();lock.waitLock(20000);
      const rtsResult = writeRelayOpsRtsOnly(payload);
      return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'rts-only',sheet:rtsResult.sheetName,updated:rtsResult.updated,waveTimes:rtsResult.waveTimes,missingRoutes:rtsResult.missingRoutes,sectionMismatches:rtsResult.sectionMismatches,preflight:rtsValidation,updatedAt:new Date().toISOString()});
    }
    if (payload.mode === 'whiparound-only') {
      const whipValidation = validateRelayOpsWhiparoundPayload(payload);
      if (!whipValidation.ready) throw new Error('RelayOps Whiparound-only preflight failed: ' + whipValidation.errors.join('; '));
      if (payload.dryRun) {
        const target = resolveRelayOpsTarget(payload, false);
        return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'whiparound-only',dryRun:true,sheet:target.targetName,wouldCreateSheet:target.wouldCreate,updates:payload.updates.length,preflight:whipValidation,updatedAt:new Date().toISOString()});
      }
      lock = LockService.getDocumentLock();lock.waitLock(20000);
      const whipResult = writeRelayOpsWhiparoundOnly(payload);
      return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'whiparound-only',sheet:whipResult.sheetName,updated:whipResult.updated,missingRoutes:whipResult.missingRoutes,driverMismatches:whipResult.driverMismatches,sectionMismatches:whipResult.sectionMismatches,preflight:whipValidation,updatedAt:new Date().toISOString()});
    }
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
        waveTimes: relayOpsWaveLabels(payload).filter(function(wave) { return Boolean(wave.value); }).length,
        writeMode: payload.writeMode,
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
      writeMode: result.writeMode,
      updated: result.updated,
      waveTimes: result.waveTimes,
      missingRoutes: result.missingRoutes,
      sectionMismatches: result.sectionMismatches,
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
  const sourceIndex = Math.max(0, section.sourceIndex === undefined ? Number(section.startRow || RELAYOPS_START_ROW) - RELAYOPS_START_ROW : Number(section.sourceIndex));
  return (payload.rows || []).slice(sourceIndex, sourceIndex + Number(section.rowCount || 0)).filter(function(row) {
    return row && [row[1], row[2], row[5]].some(function(value) { return String(value || '').trim() !== ''; });
  });
}

function relayOpsWaveTimeValue(section) {
  const explicit = String(section && section.waveTime || '').trim();
  if (explicit) return explicit;
  const time = String(section && section.wave || '').replace(/\s*[AP]M\s*$/i, '').trim();
  const count = Number(section && section.driverCount);
  return time ? time + ' (' + (Number.isFinite(count) ? count : 0) + ')' : '';
}

function relayOpsWaveLabels(payload) {
  const explicit = Array.isArray(payload && payload.waves) ? payload.waves : [];
  const byKey = {};
  explicit.forEach(function(wave) { const layout = relayOpsLayoutForSection({label:wave && wave.label});if (layout && layout.timeRow) byKey[layout.key] = String(wave.value || '').trim(); });
  (payload && payload.sections || []).forEach(function(section) { const layout = relayOpsLayoutForSection(section);if (layout && layout.timeRow && !byKey[layout.key]) byKey[layout.key] = relayOpsWaveTimeValue(section); });
  return RELAYOPS_LAYOUT.filter(function(layout) { return Boolean(layout.timeRow); }).map(function(layout) { return {layout:layout,value:byKey[layout.key] || ''}; });
}

function writeRelayOpsWaveLabels(sheet, payload) {
  const waves = relayOpsWaveLabels(payload);
  waves.forEach(function(wave) {
    if (!wave.value) return;
    const cell = sheet.getRange(wave.layout.timeRow, 1);
    cell.clearContent();
    cell.setValue(String(wave.value));
  });
  if (SpreadsheetApp.flush) SpreadsheetApp.flush();
  const failed = waves.filter(function(wave) {
    if (!wave.value) return true;
    return String(sheet.getRange(wave.layout.timeRow, 1).getDisplayValue() || '').trim() !== String(wave.value).trim();
  });
  if (failed.length) throw new Error('Wave footer verification failed for ' + failed.map(function(wave) { return wave.layout.label; }).join(', '));
  return waves.length;
}

function validateRelayOpsMorningPayload(payload) {
  const errors = [];
  const rows = payload && payload.rows || [];
  const rowTypes = payload && payload.rowTypes || [];
  const headers = payload && payload.headers || [];
  const sections = payload && payload.sections || [];
  if (!payload || payload.version !== 'relayops-morning-v1') errors.push('Wrong payload version');
  if (payload && ['full-replace','partial-update'].indexOf(payload.writeMode) < 0) errors.push('Write mode must be full-replace or partial-update');
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
  if (rowTypes.indexOf('route') < 0 || (payload.writeMode === 'full-replace' && (rowTypes.indexOf('time') < 0 || rowTypes.indexOf('separator') < 0))) errors.push('Missing required route/time/separator row types');
  rowTypes.forEach(function(type, i) {
    if (type === 'separator' && rows[i] && rows[i].some(function(cell) { return String(cell || '') !== ''; })) errors.push('Separator row ' + (i + 1) + ' must be empty');
  });
  if (!sections.length) errors.push('No wave sections sent');
  const waveLabels = relayOpsWaveLabels(payload);
  if (waveLabels.length !== 5 || waveLabels.some(function(wave) { return !wave.value; })) errors.push('All five Wave 1-5 time/count labels are required');
  sections.forEach(function(section, i) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    const time = Number(section.timeRow);
    const separator = Number(section.separatorRow);
    const fixedLayout = relayOpsLayoutForSection(section);
    if (!fixedLayout) errors.push('Section ' + (i + 1) + ' is not supported by OPS LOG 2026: ' + String(section.label || section.wave || 'unnamed'));
    else {
      if (section.slotKey && relayOpsSectionKey(section.slotKey) !== fixedLayout.key) errors.push('Section ' + (i + 1) + ' slot identity does not match ' + fixedLayout.label);
      const invalidBase = !start || start < RELAYOPS_START_ROW || !count;
      const invalidTime = Boolean(fixedLayout.timeRow) && (!time || time <= start);
      const invalidSeparator = Boolean(fixedLayout.separatorRow) && (!separator || separator <= start || (fixedLayout.timeRow && separator <= time));
      if (invalidBase || invalidTime || invalidSeparator) errors.push('Section ' + (i + 1) + ' has invalid merge rows');
      if (relayOpsSectionRows(payload, section).length > fixedLayout.routeCapacity) errors.push(fixedLayout.label + ' exceeds ' + fixedLayout.routeCapacity + ' available route rows');
    }
  });
  return {ready: errors.length === 0, errors: errors};
}

function validateRelayOpsRtsPayload(payload) {
  const errors = [], allowed = relayOpsAllowedDateNames(payload && payload.operationDate), updates = payload && payload.updates || [], waves = payload && payload.waves || [];
  if (!payload || payload.version !== 'relayops-morning-v1' || payload.mode !== 'rts-only') errors.push('Wrong RTS-only payload version');
  if (!allowed.length || allowed.indexOf(payload.sheetName) < 0) errors.push('RTS target tab must match the operation date');
  if (!updates.length) errors.push('No Planned RTS updates were supplied');
  updates.forEach(function(update, index) {
    if (!String(update.route || '').trim() || !String(update.plannedRts || '').trim()) errors.push('RTS update ' + (index + 1) + ' needs Route and Planned RTS');
    if (update.expectedSection && !relayOpsLayoutForSection({label:update.expectedSection})) errors.push('RTS update ' + (index + 1) + ' has an unsupported fixed wave slot');
  });
  const waveLabels = relayOpsWaveLabels(payload);
  if (waves.length !== 5 || waveLabels.some(function(wave) { return !wave.value; })) errors.push('All five Wave 1-5 time/count labels are required');
  return {ready:errors.length===0,errors:errors};
}

function validateRelayOpsWhiparoundPayload(payload) {
  const errors = [], allowed = relayOpsAllowedDateNames(payload && payload.operationDate), updates = payload && payload.updates || [];
  if (!payload || payload.version !== 'relayops-morning-v1' || payload.mode !== 'whiparound-only') errors.push('Wrong Whiparound-only payload version');
  if (!allowed.length || allowed.indexOf(payload.sheetName) < 0) errors.push('Whiparound target tab must match the operation date');
  if (!updates.length) errors.push('No Whiparound checks were supplied');
  updates.forEach(function(update, index) {
    if (!String(update.route || '').trim()) errors.push('Whiparound update ' + (index + 1) + ' needs a Route');
    if (!String(update.driver || '').trim()) errors.push('Whiparound update ' + (index + 1) + ' needs a Driver');
    if (update.expectedSection && !relayOpsLayoutForSection({label:update.expectedSection})) errors.push('Whiparound update ' + (index + 1) + ' has an unsupported fixed wave slot');
    if (typeof update.preWhip !== 'boolean' || typeof update.postWhip !== 'boolean') errors.push('Whiparound update ' + (index + 1) + ' needs PRE-WHIP and POST-WHIP booleans');
  });
  return {ready:errors.length===0,errors:errors};
}

function relayOpsRouteKey(value) {
  const text = String(value || '').toUpperCase(), match = text.match(/\bCX\d+\b/);
  return match ? match[0] : text.replace(/\s+/g, '');
}

function relayOpsLayoutForRow(row) {
  for (var i = 0; i < RELAYOPS_LAYOUT.length; i++) {
    const layout = RELAYOPS_LAYOUT[i];
    if (row >= layout.startRow && row < layout.startRow + layout.routeCapacity) return layout;
  }
  return null;
}

function relayOpsDriverKey(value) {
  const primary = String(value || '').split(/\s*(?:\+|\||&|\band\b)\s*/i)[0] || '';
  return primary.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function relayOpsRouteIndex(sheet) {
  const values = sheet.getRange(3, 2, 108, 2).getDisplayValues(), byRoute = {};
  values.forEach(function(row, index) {
    const key = relayOpsRouteKey(row[1]), sheetRow = index + 3, layout = relayOpsLayoutForRow(sheetRow);
    if (key && layout && !byRoute[key]) byRoute[key] = {row:sheetRow,driver:String(row[0] || '').trim(),layout:layout};
  });
  return byRoute;
}

function writeRelayOpsRtsOnly(payload) {
  const target = resolveRelayOpsTarget(payload, false);if (target.wouldCreate) throw new Error('Send the full Morning Sheet once before RTS-only updates');const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);ensureRelayOpsWave5Capacity(sheet);
  const byRoute = relayOpsRouteIndex(sheet);
  let updated = 0;const missingRoutes = [], sectionMismatches = [];
  (payload.updates || []).forEach(function(update) {
    const key = relayOpsRouteKey(update.route), record = byRoute[key];
    if (!record) { missingRoutes.push(key);return; }
    const expected = update.expectedSection ? relayOpsLayoutForSection({label:update.expectedSection}) : null;
    if (expected && expected.key !== record.layout.key) { sectionMismatches.push({route:key,expectedSection:expected.label,actualSection:record.layout.label});return; }
    sheet.getRange(record.row, 21).setValue(update.plannedRts);updated++;
  });
  const waveTimes = writeRelayOpsWaveLabels(sheet, payload);
  return {sheetName:sheet.getName(),updated:updated,waveTimes:waveTimes,missingRoutes:missingRoutes,sectionMismatches:sectionMismatches};
}

function writeRelayOpsWhiparoundOnly(payload) {
  const target = resolveRelayOpsTarget(payload, false);if (target.wouldCreate) throw new Error('Send the full Morning Sheet once before Whiparound-only updates');const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);ensureRelayOpsWave5Capacity(sheet);
  const byRoute = relayOpsRouteIndex(sheet);
  let updated = 0;const missingRoutes = [], driverMismatches = [], sectionMismatches = [];
  (payload.updates || []).forEach(function(update) {
    const key = relayOpsRouteKey(update.route), record = byRoute[key];if (!record) { missingRoutes.push(key);return; }
    const expected = update.expectedSection ? relayOpsLayoutForSection({label:update.expectedSection}) : null;
    if (expected && expected.key !== record.layout.key) { sectionMismatches.push({route:key,expectedSection:expected.label,actualSection:record.layout.label});return; }
    if (relayOpsDriverKey(update.driver) !== relayOpsDriverKey(record.driver)) { driverMismatches.push({route:key,expectedDriver:String(update.driver || ''),actualDriver:record.driver,row:record.row});return; }
    const row = record.row;
    sheet.getRange(row, 11).setValue(Boolean(update.preWhip));
    sheet.getRange(row, 13).setValue(Boolean(update.postWhip));
    updated++;
  });
  return {sheetName:sheet.getName(),updated:updated,missingRoutes:missingRoutes,driverMismatches:driverMismatches,sectionMismatches:sectionMismatches};
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

function ensureRelayOpsWave5Capacity(sheet) {
  const probe = sheet.getRange('A63');
  if (!probe || typeof probe.getMergedRanges !== 'function' || typeof probe.copyTo !== 'function') return false;
  const existing = probe.getMergedRanges().find(function(range) {
    return range.getRow() === 63 && range.getColumn() === 1;
  });
  if (existing && existing.getNumRows() >= 14) return false;
  ['A63:A77','E63:E77'].forEach(function(a1) {
    sheet.getRange(a1).getMergedRanges().forEach(function(range) { range.breakApart(); });
  });
  sheet.getRange(76, 1, 1, RELAYOPS_TEMPLATE_COLS).copyTo(sheet.getRange(77, 1, 1, RELAYOPS_TEMPLATE_COLS), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  sheet.getRange(76, 1, 1, RELAYOPS_TEMPLATE_COLS).copyTo(sheet.getRange(77, 1, 1, RELAYOPS_TEMPLATE_COLS), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
  sheet.getRange(75, 1, 1, RELAYOPS_TEMPLATE_COLS).copyTo(sheet.getRange(76, 1, 1, RELAYOPS_TEMPLATE_COLS), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  sheet.getRange(75, 1, 1, RELAYOPS_TEMPLATE_COLS).copyTo(sheet.getRange(76, 1, 1, RELAYOPS_TEMPLATE_COLS), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
  sheet.getRange(76, 2, 1, RELAYOPS_TEMPLATE_COLS - 1).clearContent();
  sheet.getRange(77, 1).clearContent();
  sheet.getRange('A63:A76').merge();
  sheet.getRange('E63:E77').merge();
  return true;
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
  const writeMode = payload.writeMode;
  const target = resolveRelayOpsTarget(payload, writeMode === 'full-replace');
  if (writeMode === 'partial-update' && target.wouldCreate) throw new Error('Send all waves once before using a filtered partial update');
  const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);
  ensureRelayOpsWave5Capacity(sheet);

  // Clear only dashboard-owned cells inside the fixed OPS LOG 2026 sections.
  // Existing merges, headers, widths, colors, checkboxes J:M, divider N,
  // and operations columns O/R/S/T/V remain untouched.
  if (writeMode === 'full-replace') {
    RELAYOPS_LAYOUT.forEach(function(layout) {
      sheet.getRange(layout.startRow, 2, layout.routeCapacity, 3).clearContent();
      sheet.getRange(layout.startRow, 6, layout.routeCapacity, 3).clearContent();
      sheet.getRange(layout.startRow, 16, layout.routeCapacity, 2).clearContent();
      sheet.getRange(layout.startRow, 16, layout.routeCapacity, 2).setNumberFormat('0');
      sheet.getRange(layout.startRow, 21, layout.routeCapacity, 1).clearContent();
      sheet.getRange(layout.startRow, 1).setValue(layout.label);
      if (layout.timeRow) sheet.getRange(layout.timeRow, 1).clearContent();
    });
  }

  if (writeMode === 'partial-update') {
    const byRoute = relayOpsRouteIndex(sheet), missingRoutes = [], sectionMismatches = [];let updated = 0;
    (payload.sections || []).forEach(function(section) {
      const layout = relayOpsLayoutForSection(section);if (!layout) return;
      relayOpsSectionRows(payload, section).forEach(function(row) {
        const key = relayOpsRouteKey(row[2]), record = byRoute[key];
        if (!record) { missingRoutes.push(key);return; }
        if (record.layout.key !== layout.key) { sectionMismatches.push({route:key,expectedSection:layout.label,actualSection:record.layout.label});return; }
        sheet.getRange(record.row, 2, 1, 3).setValues([[row[1], row[2], row[3]]]);
        sheet.getRange(record.row, 6, 1, 3).setValues([[row[5], row[6], row[7]]]);
        sheet.getRange(record.row, 16, 1, 2).setValues([[row[9], row[10]]]).setNumberFormat('0');
        sheet.getRange(record.row, 21).setValue(row[12]);updated++;
      });
    });
    const waveTimes = writeRelayOpsWaveLabels(sheet, payload);
    return {sheetName:sheet.getName(),startCell:'A3',writeRange:RELAYOPS_TEMPLATE_RANGE,writtenRange:'matched routes + five wave labels',lastCell:'',createdSheet:false,writeMode:writeMode,updated:updated,waveTimes:waveTimes,missingRoutes:missingRoutes,sectionMismatches:sectionMismatches};
  }

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
  });
  const waveTimes = writeRelayOpsWaveLabels(sheet, payload);
  return {sheetName: sheet.getName(), startCell: 'A3', writeRange: RELAYOPS_TEMPLATE_RANGE, writtenRange: 'A3:V116', lastCell: 'V116', createdSheet: target.created, writeMode:writeMode, updated:(payload.rows || []).filter(function(row){return row && String(row[2] || '').trim();}).length, waveTimes:waveTimes, missingRoutes:[], sectionMismatches:[]};
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
    writeMode: 'full-replace',
    startCell: 'A3',
    writeRange: 'A3:M',
    headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    operationDate: '2026-07-12',
    sheetName: '7/12/26',
    sheetNameCandidates: ['7/12/26','7.12.26'],
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    rowTypes: ['route','time','separator'],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}],
    waves: [{label:'WAVE 1',value:'11:15 (1)'},{label:'WAVE 2',value:'11:20 (0)'},{label:'WAVE 3',value:'11:25 (0)'},{label:'WAVE 4',value:'11:40 (0)'},{label:'WAVE 5',value:'11:45 (0)'}]
  };
  writeRelayOpsMorningSheet(sample);
}
