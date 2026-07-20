const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

class Range {
  constructor(sheet, row, col, rows = 1, cols = 1) { Object.assign(this, { sheet, row, col, rows, cols }); }
  cells(fn) { for (let r = 0; r < this.rows; r += 1) for (let c = 0; c < this.cols; c += 1) fn(this.row + r, this.col + c); }
  setValue(value) { this.cells((r, c) => this.sheet.set(r, c, value)); return this; }
  setValues(values) { values.forEach((line, r) => line.forEach((value, c) => this.sheet.set(this.row + r, this.col + c, value))); return this; }
  getDisplayValue() { return String(this.sheet.get(this.row, this.col) ?? ''); }
  getDisplayValues() { return Array.from({ length: this.rows }, (_, r) => Array.from({ length: this.cols }, (_, c) => String(this.sheet.get(this.row + r, this.col + c) ?? ''))); }
  clearContent() { this.cells((r, c) => this.sheet.set(r, c, '')); return this; }
  setNumberFormat() { return this; }
  getMergedRanges() { return []; }
  breakApart() { return this; }
}

class Sheet {
  constructor(name = '7/14/26') { this.name = name; this.values = new Map(); this.maxRows = 116; this.maxCols = 22; this.seedTemplate(); }
  key(r, c) { return `${r}:${c}`; }
  set(r, c, value) { this.values.set(this.key(r, c), value); }
  get(r, c) { return this.values.get(this.key(r, c)); }
  getName() { return this.name; }
  getMaxRows() { return this.maxRows; }
  getMaxColumns() { return this.maxCols; }
  getFrozenRows() { return 2; }
  getRange(row, col, rows = 1, cols = 1) {
    if (typeof row === 'string') {
      const found = row.match(/^([A-Z]+)(\d+)$/i); if (!found) throw new Error(`Unsupported range ${row}`);
      col = [...found[1].toUpperCase()].reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0); row = Number(found[2]); rows = cols = 1;
    }
    return new Range(this, row, col, rows, cols);
  }
  copyTo(spreadsheet) { const copy = new Sheet(this.name); copy.values = new Map(this.values); copy.spreadsheet = spreadsheet; spreadsheet.sheets.push(copy); return copy; }
  setName(name) { this.name = name; return this; }
  seedTemplate() {
    const headers = { 1:'WAVE',10:'PRE DVIC',16:'STOP COUNT',21:'PLANNED RTS',22:'CLOCK OUT TIME' };
    Object.entries(headers).forEach(([col, value]) => this.set(1, Number(col), value));
    [[3,'WAVE 1'],[18,'WAVE 2'],[33,'WAVE 3'],[48,'WAVE 4'],[63,'WAVE 5'],[79,"ADHOC's"],[95,'HELPERS'],[111,'DSP']].forEach(([row, value]) => this.set(row, 1, value));
  }
}

class Spreadsheet {
  constructor(sheet) { this.sheets = [sheet]; sheet.spreadsheet = this; }
  getName() { return 'RelayOps connector test'; }
  getSheetByName(name) { return this.sheets.find(sheet => sheet.getName() === name) || null; }
  getActiveSheet() { return this.sheets[0]; }
  getSheets() { return this.sheets; }
}

function connectorContext(sheet) {
  const spreadsheet = new Spreadsheet(sheet);
  const context = {
    console,
    SpreadsheetApp: {
      openById: () => spreadsheet,
      getActiveSpreadsheet: () => spreadsheet,
      getUi: () => ({ ButtonSet: { OK: 'OK' }, alert() {} }),
      BorderStyle: { SOLID: 'SOLID' }
    },
    ContentService: { MimeType: { JSON: 'application/json' }, createTextOutput: text => ({ text, setMimeType() { return this; } }) }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../google-sheets/relayops-morning-connector.gs'), 'utf8'), context, { filename: 'relayops-morning-connector.gs' });
  return context;
}

function partialPayload(route = 'CX302') {
  return {
    version: 'relayops-morning-v1', writeMode: 'partial-update', operationDate: '2026-07-14', sheetName: '7/14/26', sheetNameCandidates: ['7/14/26','7.14.26'],
    startCell: 'A3', writeRange: 'A3:M', headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    rows: [['WAVE 3','Updated Driver',route,'STG.Z.2','C','31','7','8','','188','344','','8:44 PM']], rowTypes: ['route'],
    sections: [{ label:'WAVE 3', slotKey:'WAVE3', wave:'11:25 AM', waveTime:'11:25 (2)', pad:'C', sourceIndex:0, startRow:3, rowCount:1, timeRow:4, separatorRow:5, hasTimeRow:true }],
    waves: [{label:'WAVE 1',value:'11:15 (7)'},{label:'WAVE 2',value:'11:20 (9)'},{label:'WAVE 3',value:'11:25 (2)'},{label:'WAVE 4',value:'11:40 (11)'},{label:'WAVE 5',value:'11:45 (8)'}]
  };
}

function testPartialWritePreservesOtherCells() {
  const sheet = new Sheet();
  sheet.set(3, 2, 'KEEP WAVE ONE'); sheet.set(3, 3, 'CX101'); sheet.set(3, 16, '101');
  sheet.set(33, 2, 'Wave Three A'); sheet.set(33, 3, 'CX301'); sheet.set(33, 16, 'KEEP ROUTE A');
  sheet.set(34, 2, 'Wave Three B'); sheet.set(34, 3, 'CX302'); sheet.set(34, 16, '104');
  const context = connectorContext(sheet), result = context.writeRelayOpsMorningSheet(partialPayload());
  assert(result.writeMode === 'partial-update', 'Connector receipt must report a partial update');
  assert(result.waveTimes === 5, 'A filtered partial update must write and confirm all five wave labels');
  assert(sheet.get(16, 1) === '11:15 (7)' && sheet.get(31, 1) === '11:20 (9)' && sheet.get(46, 1) === '11:25 (2)' && sheet.get(61, 1) === '11:40 (11)' && sheet.get(76, 1) === '11:45 (8)', 'A filtered partial update must preserve every Wave 1-5 footer label');
  assert(sheet.get(3, 2) === 'KEEP WAVE ONE' && sheet.get(3, 16) === '101', 'A Wave 3 partial send must not clear Wave 1');
  assert(sheet.get(33, 2) === 'Wave Three A' && sheet.get(33, 16) === 'KEEP ROUTE A', 'A one-route Wave 3 filter must not clear another Wave 3 route');
  assert(sheet.get(34, 2) === 'Updated Driver' && sheet.get(34, 3) === 'CX302' && String(sheet.get(34, 16)) === '188', 'Partial updates must find and update the selected route in its fixed Wave 3 slot');
}

function testWhiparoundDriverAndSectionGuard() {
  const sheet = new Sheet();
  sheet.set(33, 2, 'Maya Collins'); sheet.set(33, 3, 'CX301'); sheet.set(33, 11, false); sheet.set(33, 13, false);
  const context = connectorContext(sheet), base = { version:'relayops-morning-v1', mode:'whiparound-only', operationDate:'2026-07-14', sheetName:'7/14/26', sheetNameCandidates:['7/14/26','7.14.26'] };
  const wrongDriver = context.writeRelayOpsWhiparoundOnly({ ...base, updates:[{route:'CX301',driver:'Michael Collins',expectedSection:'WAVE 3',preWhip:true,postWhip:true}] });
  assert(wrongDriver.updated === 0 && sheet.get(33, 11) === false && sheet.get(33, 13) === false, 'Whiparound connector must reject a route match with the wrong driver');
  const wrongSection = context.writeRelayOpsWhiparoundOnly({ ...base, updates:[{route:'CX301',driver:'Maya Collins',expectedSection:'WAVE 2',preWhip:true,postWhip:true}] });
  assert(wrongSection.updated === 0 && sheet.get(33, 11) === false, 'Whiparound connector must reject a route found outside the expected fixed wave slot');
  const correct = context.writeRelayOpsWhiparoundOnly({ ...base, updates:[{route:'CX301',driver:'Maya Collins',expectedSection:'WAVE 3',preWhip:true,postWhip:false}] });
  assert(correct.updated === 1 && sheet.get(33, 11) === true && sheet.get(33, 13) === false, 'Whiparound connector must update only the matching route + driver + fixed wave');
}

testPartialWritePreservesOtherCells();
testWhiparoundDriverAndSectionGuard();
console.log('Connector partial-scope and Whiparound identity safety contracts passed');
