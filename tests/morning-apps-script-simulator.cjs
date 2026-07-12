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
  setNumberFormat(value) {
    this.eachCell((row, col) => this.sheet.setFormat(row, col, 'numberFormat', value));
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
  getDisplayValue() {
    const value = this.sheet.getCell(this.row, this.col);
    return value === undefined || value === null ? '' : String(value);
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
    if (typeof row === 'string') {
      const match = row.match(/^([A-Z]+)(\d+)$/i);
      if (!match) throw new Error(`Unsupported A1 range ${row}`);
      col = match[1].toUpperCase().split('').reduce((total, char) => total * 26 + char.charCodeAt(0) - 64, 0);
      row = Number(match[2]);
      numRows = 1;
      numCols = 1;
    }
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
  setName(value) { this.name = value; return this; }
  copyTo(spreadsheet) { return spreadsheet.copySheet(this); }
}

class FakeSpreadsheet {
  constructor(sheets) { this.sheets = Array.isArray(sheets) ? sheets : [sheets]; this.sheets.forEach(sheet => { sheet.spreadsheet = this; }); }
  getName() { return 'Fake RelayOps Template'; }
  getSheetByName(name) { return this.sheets.find(sheet => sheet.getName() === name) || null; }
  getActiveSheet() { return this.sheets[0]; }
  getSheets() { return this.sheets; }
  copySheet(source) {
    const copy = new FakeSheet(`Copy of ${source.getName()}`, source.maxRows, source.maxColumns);
    copy.values = new Map(source.values);
    copy.formats = new Map([...source.formats].map(([key, value]) => [key, { ...value }]));
    copy.rowHeights = new Map(source.rowHeights);
    copy.columnWidths = new Map(source.columnWidths);
    copy.merges = source.merges.map(merge => ({ ...merge }));
    copy.frozenRows = source.frozenRows;
    copy.spreadsheet = this;
    this.sheets.push(copy);
    return copy;
  }
}

function createLegacyTemplate(name = 'OPS LOG 2026') {
  const sheet = new FakeSheet(name, 116, 22);
  const headers = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','PRE DVIC','PRE-WHIP','POST DVIC','POST-WHIP','','RESCUED','STOP COUNT','PACKAGE COUNT','PACKAGE RETURNS','END TIME','RTS TIME','PLANNED RTS','CLOCK OUT TIME'];
  headers.forEach((value, index) => sheet.setCell(1, index + 1, value));
  [[3,'WAVE 1'],[18,'WAVE 2'],[33,'WAVE 3'],[48,'WAVE 4'],[63,'WAVE 5'],[79,"ADHOC's"],[95,'HELPERS'],[111,'DSP']].forEach(([row, value]) => sheet.setCell(row, 1, value));
  for (let row = 3; row <= 116; row += 1) for (let col = 10; col <= 13; col += 1) sheet.setCell(row, col, false);
  sheet.frozenRows = 2;
  return sheet;
}

function runConnectorWithSheet(sheet, payload) {
  const connector = fs.readFileSync(require.resolve('../google-sheets/relayops-morning-connector.gs'), 'utf8');
  const template = sheet.getName() === 'OPS LOG 2026' ? sheet : createLegacyTemplate();
  const spreadsheet = new FakeSpreadsheet(template === sheet ? [sheet] : [template, sheet]);
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
      openById: id => {
        if (id !== '1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ') throw new Error('Connector opened the wrong spreadsheet ID');
        return spreadsheet;
      },
      getUi: () => ui,
      BorderStyle: { SOLID: 'SOLID' }
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: text => ({ text, setMimeType() { return this; } })
    }
  };
  const context = { ...sandbox, __payload: payload, __ui: ui, __spreadsheet: spreadsheet };
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
  operationDate: '2026-07-12',
  sheetName: '7/12/26',
  sheetNameCandidates: ['7/12/26', '7.12.26'],
  rows: [
    ['WAVE 1', 'Driver One', 'CX201', 'STG.V.1', 'A', '21', '3', '-', '', '188', '331', '', '5:35 PM'],
    ['', 'Driver Two', 'CX202', 'STG.V.2', '', '22', '4', '8', '', '190', '340', '', '6:05 PM'],
    ['11:15 (2)', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '']
  ],
  rowTypes: ['route', 'route', 'time', 'separator'],
  sections: [{ label: 'WAVE 1', waveTime: '11:15 (2)', pad: 'A', startRow: 3, rowCount: 2, timeRow: 5, separatorRow: 6 }]
};

const sheet = createLegacyTemplate('7/12/26');
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

if (resultContext.__ping.writeRange !== 'A3:M' || resultContext.__ping.sheet !== 'OPS LOG 2026' || resultContext.__ping.templateRange !== 'A3:V') throw new Error('Connector ping should report OPS LOG 2026 and its A:V template range');
if (!resultContext.__templateLayout || resultContext.__templateLayout.neededColumns !== 22) throw new Error('Template validation should require the original A-V Ops Log layout');
if (!resultContext.__ui.alerts.some(alert => alert.title.includes('RelayOps template'))) throw new Error('Template validation should alert the installer inside Google Sheets');
if (sheet.getMaxRows() !== 116) throw new Error(`Connector should retain the exact 116-row template, got ${sheet.getMaxRows()}`);
if (sheet.getMaxColumns() !== 22) throw new Error(`Connector should expand to the original A-V layout, got ${sheet.getMaxColumns()} columns`);
if (sheet.frozenRows !== 2) throw new Error('Connector should preserve the template two-row freeze setting');
if (sheet.getCell(1, 10) !== 'PRE DVIC' || sheet.getCell(1, 21) !== 'PLANNED RTS' || sheet.getCell(1, 22) !== 'CLOCK OUT TIME') throw new Error('Connector should preserve the original A-V headers');
if (sheet.getCell(3, 2) !== 'Driver One' || sheet.getCell(4, 3) !== 'CX202') throw new Error('Connector should write route rows starting at A3');
if (sheet.getCell(3, 16) !== '188' || sheet.getCell(3, 17) !== '331' || sheet.getCell(3, 21) !== '5:35 PM') throw new Error('Connector should map stop/package/Planned RTS into P/Q/U');
if (sheet.formats.get('3:16')?.numberFormat !== '0' || sheet.formats.get('3:17')?.numberFormat !== '0') throw new Error('Stop and Package Count must remain numeric instead of displaying as times');
if (sheet.getCell(3, 10) !== false || sheet.getCell(3, 13) !== false || sheet.getCell(3, 15) !== 'KEEP RESCUED' || sheet.getCell(3, 18) !== 'KEEP RETURNS' || sheet.getCell(3, 19) !== 'KEEP END' || sheet.getCell(3, 20) !== 'KEEP RTS' || sheet.getCell(3, 22) !== 'KEEP CLOCK OUT') throw new Error('Connector overwrote original checkbox or closing-operations columns');
if (sheet.getCell(16, 1) !== '11:15 (2)') throw new Error('Connector should write Wave 1 time into fixed row 16');
if (sheet.getCell(18, 1) !== 'WAVE 2' || sheet.getCell(33, 1) !== 'WAVE 3' || sheet.getCell(79, 1) !== "ADHOC's" || sheet.getCell(111, 1) !== 'DSP') throw new Error('Connector should preserve fixed OPS LOG 2026 section anchors');
if (sheet.columnWidths.get(9) !== 77 || sheet.columnWidths.get(14) !== 77) throw new Error('Connector should preserve every original column width');
if (resultContext.__result.writeRange !== 'A3:V' || resultContext.__result.writtenRange !== 'A3:V116' || resultContext.__result.lastCell !== 'V116') throw new Error('Connector should return the full fixed A3:V116 template proof');

const sentinelSheet = createLegacyTemplate('7.12.26');
sentinelSheet.setCell(3, 14, 'DO NOT TOUCH N3');
runConnectorWithSheet(sentinelSheet, payload);
if (sentinelSheet.getMaxColumns() !== 22) throw new Error('Connector should retain all A-V template columns');
if (sentinelSheet.getCell(3, 14) !== 'DO NOT TOUCH N3') throw new Error('Connector should not touch columns N and beyond');
if (sentinelSheet.breakApartCalls.length) throw new Error('Connector should preserve every original merged range');

const creationContext = runConnectorWithSheet(createLegacyTemplate(), payload);
const createdDateSheet = creationContext.__spreadsheet.getSheetByName('7/12/26');
if (creationContext.__result.sheetName !== '7/12/26' || !creationContext.__result.createdSheet || !createdDateSheet || createdDateSheet.getCell(3, 2) !== 'Driver One' || createdDateSheet.getCell(16, 1) !== '11:15 (2)') throw new Error('Connector should create the exact operation-date tab from OPS LOG 2026 and populate fixed anchors');

const datedPayload = { ...payload, operationDate: '2026-07-11', sheetName: '7/11/26', sheetNameCandidates: ['7/11/26', '7.11.26'] };
const dottedDateSheet = createLegacyTemplate('7.11.26');
const datedContext = runConnectorWithSheet(dottedDateSheet, datedPayload);
if (datedContext.__result.sheetName !== '7.11.26' || dottedDateSheet.getCell(3, 2) !== 'Driver One') throw new Error('Connector should match the selected operation date using dot-formatted tabs');
const wrongDateSheet = createLegacyTemplate('7.10.26');
wrongDateSheet.setCell(3, 2, 'DO NOT TOUCH WRONG DATE');
const exactDateContext = runConnectorWithSheet(wrongDateSheet, datedPayload);
if (wrongDateSheet.getCell(3, 2) !== 'DO NOT TOUCH WRONG DATE' || exactDateContext.__result.sheetName !== '7/11/26' || !exactDateContext.__result.createdSheet) throw new Error('Connector must create the exact operation-date tab and never write into another date');

const badPayload = { ...payload, writeRange: 'A3:N' };
let rejected = false;
try {
  runConnectorWithSheet(createLegacyTemplate('7/12/26'), badPayload);
} catch (error) {
  rejected = String(error.message).includes('Write range must be A3:M');
}
if (!rejected) throw new Error('Connector should reject writes outside A3:M');

const wrongTargetPayload = { ...payload, sheetName: 'Morning Operations' };
let wrongTargetRejected = false;
try { runConnectorWithSheet(createLegacyTemplate('Morning Operations'), wrongTargetPayload); } catch (error) { wrongTargetRejected = /Target tab must match operation date|Refusing non-date target/.test(String(error.message)); }
if (!wrongTargetRejected) throw new Error('Connector should reject any non-date target sheet name');

console.log('Morning Apps Script connector simulator test passed');
