const fs = require('fs');
const vm = require('vm');

class FakeRange {
  constructor(sheet, row, col, numRows = 1, numCols = 1) {
    this.sheet = sheet;
    this.row = row;
    this.col = col;
    this.numRows = numRows;
    this.numCols = numCols;
  }
  eachCell(fn) {
    for (let r = 0; r < this.numRows; r += 1) {
      for (let c = 0; c < this.numCols; c += 1) fn(this.row + r, this.col + c);
    }
  }
  setValues(values) {
    values.forEach((row, r) => row.forEach((value, c) => this.sheet.setCell(this.row + r, this.col + c, value)));
    return this;
  }
  setValue(value) {
    this.eachCell((row, col) => this.sheet.setCell(row, col, value));
    return this;
  }
  clearContent() {
    this.eachCell((row, col) => this.sheet.setCell(row, col, ''));
    return this;
  }
  clearFormat() {
    this.eachCell((row, col) => this.sheet.formats.delete(`${row}:${col}`));
    return this;
  }
  breakApart() {
    this.sheet.breakApartCalls.push({ row: this.row, col: this.col, numRows: this.numRows, numCols: this.numCols });
    this.sheet.merges = this.sheet.merges.filter(merge =>
      merge.row < this.row || merge.row > this.row + this.numRows - 1 || merge.col < this.col || merge.col > this.col + this.numCols - 1
    );
    return this;
  }
  merge() {
    this.sheet.merges.push({ row: this.row, col: this.col, numRows: this.numRows, numCols: this.numCols });
    return this;
  }
  setBackground(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'background', value));
    return this;
  }
  setFontColor(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'fontColor', value));
    return this;
  }
  setFontWeight(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'fontWeight', value));
    return this;
  }
  setHorizontalAlignment(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'horizontalAlignment', value));
    return this;
  }
  setVerticalAlignment(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'verticalAlignment', value));
    return this;
  }
  setBorder() { return this; }
  setFontSize(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'fontSize', value));
    return this;
  }
  setTextRotation(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'textRotation', value));
    return this;
  }
}

class FakeSheet {
  constructor(name, rows, cols) {
    this.name = name;
    this.maxRows = rows;
    this.maxColumns = cols;
    this.values = new Map();
    this.formats = new Map();
    this.rowHeights = new Map();
    this.columnWidths = new Map();
    this.merges = [];
    this.breakApartCalls = [];
    this.frozenRows = 0;
  }
  key(row, col) { return `${row}:${col}`; }
  getName() { return this.name; }
  getMaxRows() { return this.maxRows; }
  getMaxColumns() { return this.maxColumns; }
  getFrozenRows() { return this.frozenRows; }
  insertRowsAfter(after, count) {
    if (after !== this.maxRows) throw new Error(`Expected rows to insert after current max ${this.maxRows}, got ${after}`);
    this.maxRows += count;
  }
  insertColumnsAfter(after, count) {
    if (after !== this.maxColumns) throw new Error(`Expected columns to insert after current max ${this.maxColumns}, got ${after}`);
    this.maxColumns += count;
  }
  getRange(row, col, numRows = 1, numCols = 1) {
    if (row + numRows - 1 > this.maxRows) throw new Error(`Range exceeds rows: ${row}:${numRows} > ${this.maxRows}`);
    if (col + numCols - 1 > this.maxColumns) throw new Error(`Range exceeds columns: ${col}:${numCols} > ${this.maxColumns}`);
    return new FakeRange(this, row, col, numRows, numCols);
  }
  setFrozenRows(value) { this.frozenRows = value; return this; }
  setRowHeight(row, value) { this.rowHeights.set(row, value); return this; }
  setColumnWidths(startCol, count, width) {
    for (let col = startCol; col < startCol + count; col += 1) this.columnWidths.set(col, width);
    return this;
  }
  setCell(row, col, value) { this.values.set(this.key(row, col), value); }
  getCell(row, col) { return this.values.get(this.key(row, col)); }
  setFormat(row, col, field, value) {
    const key = this.key(row, col);
    const format = this.formats.get(key) || {};
    format[field] = value;
    this.formats.set(key, format);
  }
  getFormat(row, col, field) {
    return (this.formats.get(this.key(row, col)) || {})[field];
  }
}

class FakeSpreadsheet {
  constructor(sheet) { this.sheet = sheet; }
  getName() { return 'Fake RelayOps Template'; }
  getSheetByName(name) { return name === this.sheet.getName() ? this.sheet : null; }
  getActiveSheet() { return this.sheet; }
  getSheets() { return [this.sheet]; }
}

function runConnectorWithSheet(sheet, payload) {
  const connector = fs.readFileSync(require.resolve('../google-sheets/relayops-morning-connector.gs'), 'utf8');
  const spreadsheet = new FakeSpreadsheet(sheet);
  const ui = {
    ButtonSet: { OK: 'OK' },
    alerts: [],
    alert(title, message) {
      this.alerts.push({ title, message });
    }
  };
  const sandbox = {
    console,
    SpreadsheetApp: {
      getActiveSpreadsheet: () => spreadsheet,
      getUi: () => ui,
      BorderStyle: { SOLID: 'SOLID' }
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: text => ({ text, setMimeType() { return this; } })
    }
  };
  const context = { ...sandbox, __payload: payload, __ui: ui };
  vm.runInNewContext(`${connector}
    globalThis.__validation = validateRelayOpsMorningPayload(globalThis.__payload);
    globalThis.__ping = JSON.parse(doGet({}).text);
    globalThis.__templateLayout = relayOpsValidateTemplate();
    globalThis.__layoutBefore = relayOpsTemplateLayout(findRelayOpsMorningSheet(globalThis.__payload), globalThis.__payload.rows.length);
    globalThis.__result = writeRelayOpsMorningSheet(globalThis.__payload);
    globalThis.__layoutAfter = relayOpsTemplateLayout(findRelayOpsMorningSheet(globalThis.__payload), globalThis.__payload.rows.length);
  `, context);
  return context;
}

const payload = {
  version: 'relayops-morning-v1',
  startCell: 'A3',
  writeRange: 'A3:M',
  headers: ['WAVE', 'DRIVER', 'ROUTE', 'STAGING', 'PAD', 'EV', 'DEVICE', 'PORTABLE', '', 'STOP COUNT', 'PACKAGE COUNT', '', 'PLANNED RTS'],
  sheetName: 'Morning Operations',
  sheetNameCandidates: ['Opening Operations', 'Sheet1'],
  rows: [
    ['WAVE 1', 'Driver One', 'CX201', 'STG.V.1', 'A', '21', '3', '-', '', '188', '331', '', '5:35 PM'],
    ['', 'Driver Two', 'CX202', 'STG.V.2', '', '22', '4', '8', '', '190', '340', '', '6:05 PM'],
    ['11:15 (2)', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '']
  ],
  rowTypes: ['route', 'route', 'time', 'separator'],
  sections: [{ label: 'WAVE 1', waveTime: '11:15 (2)', pad: 'A', startRow: 3, rowCount: 2, timeRow: 5, separatorRow: 6 }]
};

const sheet = new FakeSheet('Morning Operations', 5, 8);
const legacyHeaders = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','PRE DVIC','PRE-WHIP','POST DVIC','POST-WHIP','','RESCUED','STOP COUNT','PACKAGE COUNT','PACKAGE RETURNS','END TIME','RTS TIME','PLANNED RTS','CLOCK OUT TIME'];
legacyHeaders.forEach((value, index) => sheet.setCell(1, index + 1, value));
sheet.setCell(3, 10, false);
sheet.setCell(3, 13, false);
sheet.setCell(3, 15, 'KEEP RESCUED');
sheet.setCell(3, 18, 'KEEP RETURNS');
sheet.setCell(3, 19, 'KEEP END');
sheet.setCell(3, 20, 'KEEP RTS');
sheet.setCell(3, 22, 'KEEP CLOCK OUT');
sheet.setFormat(6, 1, 'background', '#050505');
sheet.setColumnWidths(1, 22, 77);
const resultContext = runConnectorWithSheet(sheet, payload);

if (resultContext.__ping.writeRange !== 'A3:M' || resultContext.__ping.sheet !== 'Morning Operations') throw new Error('Connector ping should report the target sheet and A3:M write range');
if (!resultContext.__templateLayout || resultContext.__templateLayout.neededColumns !== 22) throw new Error('Template validation should require the original A-V Ops Log layout');
if (!resultContext.__ui.alerts.some(alert => alert.title.includes('RelayOps template'))) throw new Error('Template validation should alert the installer inside Google Sheets');
if (sheet.getMaxRows() < 122) throw new Error(`Connector should expand rows to at least 122, got ${sheet.getMaxRows()}`);
if (sheet.getMaxColumns() !== 22) throw new Error(`Connector should expand to the original A-V layout, got ${sheet.getMaxColumns()} columns`);
if (sheet.frozenRows !== 0) throw new Error('Connector should preserve the sheet freeze setting instead of changing merged-row boundaries');
if (sheet.getCell(1, 10) !== 'PRE DVIC' || sheet.getCell(1, 21) !== 'PLANNED RTS' || sheet.getCell(1, 22) !== 'CLOCK OUT TIME') throw new Error('Connector should preserve the original A-V headers');
if (sheet.getCell(3, 2) !== 'Driver One' || sheet.getCell(4, 3) !== 'CX202') throw new Error('Connector should write route rows starting at A3');
if (sheet.getCell(3, 16) !== '188' || sheet.getCell(3, 17) !== '331' || sheet.getCell(3, 21) !== '5:35 PM') throw new Error('Connector should map stop/package/Planned RTS into P/Q/U');
if (sheet.getCell(3, 10) !== false || sheet.getCell(3, 13) !== false || sheet.getCell(3, 15) !== 'KEEP RESCUED' || sheet.getCell(3, 18) !== 'KEEP RETURNS' || sheet.getCell(3, 19) !== 'KEEP END' || sheet.getCell(3, 20) !== 'KEEP RTS' || sheet.getCell(3, 22) !== 'KEEP CLOCK OUT') throw new Error('Connector overwrote original checkbox or closing-operations columns');
if (sheet.getCell(5, 1) !== '11:15 (2)') throw new Error('Connector should write wave time under the wave label');
if (sheet.getFormat(6, 1, 'background') !== '#050505') throw new Error('Connector should preserve the original black divider formatting');
if (!sheet.merges.some(merge => merge.row === 3 && merge.col === 1 && merge.numRows === 2 && merge.numCols === 1)) throw new Error('Connector should merge Wave cells for route rows');
if (!sheet.merges.some(merge => merge.row === 3 && merge.col === 5 && merge.numRows === 3 && merge.numCols === 1)) throw new Error('Connector should merge Pad cells through the time row');
if (sheet.columnWidths.get(9) !== 77 || sheet.columnWidths.get(14) !== 77) throw new Error('Connector should preserve every original column width');
if (resultContext.__result.writeRange !== 'A3:V' || resultContext.__result.writtenRange !== 'A3:V6' || resultContext.__result.lastCell !== 'V6') throw new Error('Connector should return the original A-V template range proof');

const sentinelSheet = new FakeSheet('Morning Operations', 130, 22);
sentinelSheet.setCell(3, 14, 'DO NOT TOUCH N3');
runConnectorWithSheet(sentinelSheet, payload);
if (sentinelSheet.getMaxColumns() !== 22) throw new Error('Connector should retain all A-V template columns');
if (sentinelSheet.getCell(3, 14) !== 'DO NOT TOUCH N3') throw new Error('Connector should not touch columns N and beyond');
if (sentinelSheet.breakApartCalls.some(call => ![1,5].includes(call.col) || call.numCols !== 1)) throw new Error('Connector should break apart only Wave A and Pad E merges');

const sheet1Template = new FakeSheet('Sheet1', 130, 22);
const sheet1Context = runConnectorWithSheet(sheet1Template, payload);
if (sheet1Context.__result.sheetName !== 'Sheet1' || sheet1Template.getCell(3, 2) !== 'Driver One') {
  throw new Error('Connector should target Sheet1 when the Google template tab has not been renamed');
}

const datedPayload = { ...payload, operationDate: '2026-07-11', sheetName: '7/11/26', sheetNameCandidates: ['7/11/26', '7.11.26'] };
const dottedDateSheet = new FakeSheet('7.11.26', 130, 22);
const datedContext = runConnectorWithSheet(dottedDateSheet, datedPayload);
if (datedContext.__result.sheetName !== '7.11.26' || dottedDateSheet.getCell(3, 2) !== 'Driver One') throw new Error('Connector should match the selected operation date using dot-formatted tabs');
let missingDateRejected = false;
try {
  runConnectorWithSheet(new FakeSheet('7.10.26', 130, 22), datedPayload);
} catch (error) {
  missingDateRejected = String(error.message).includes('No operations tab found for 2026-07-11') && String(error.message).includes('Nothing was written');
}
if (!missingDateRejected) throw new Error('Connector must stop instead of writing a dated payload into the wrong tab');

const badPayload = { ...payload, writeRange: 'A3:N' };
let rejected = false;
try {
  runConnectorWithSheet(new FakeSheet('Morning Operations', 130, 22), badPayload);
} catch (error) {
  rejected = String(error.message).includes('Write range must be A3:M');
}
if (!rejected) throw new Error('Connector should reject writes outside A3:M');

console.log('Morning Apps Script connector simulator test passed');
