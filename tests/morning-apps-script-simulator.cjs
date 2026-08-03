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
  getDisplayValues() {
    return Array.from({ length: this.numRows }, (_, r) => Array.from({ length: this.numCols }, (_, c) => String(this.sheet.getCell(this.row + r, this.col + c) ?? '')));
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
  getRow() { return this.row; }
  getColumn() { return this.col; }
  getMergedRanges() {
    return this.sheet.merges
      .filter(merge =>
        merge.row <= this.row + this.numRows - 1 &&
        merge.row + merge.numRows - 1 >= this.row &&
        merge.col <= this.col + this.numCols - 1 &&
        merge.col + merge.numCols - 1 >= this.col
      )
      .map(merge => new FakeRange(this.sheet, merge.row, merge.col, merge.numRows, merge.numCols));
  }
  copyTo(target, pasteType) {
    for (let r = 0; r < target.numRows; r += 1) {
      for (let c = 0; c < target.numCols; c += 1) {
        const sourceRow = this.row + (r % this.numRows);
        const sourceCol = this.col + (c % this.numCols);
        const targetRow = target.row + r;
        const targetCol = target.col + c;
        if (pasteType === 'PASTE_FORMAT') {
          const format = this.sheet.formats.get(this.sheet.key(sourceRow, sourceCol));
          if (format) this.sheet.formats.set(this.sheet.key(targetRow, targetCol), { ...format });
        }
      }
    }
    return target;
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
  insertRowsBefore(before, count) {
    const shiftMap = source => {
      const shifted = new Map();
      source.forEach((value, key) => {
        const [row, col] = key.split(':').map(Number);
        shifted.set(this.key(row >= before ? row + count : row, col), value);
      });
      return shifted;
    };
    this.values = shiftMap(this.values);
    this.formats = shiftMap(this.formats);
    this.rowHeights = new Map([...this.rowHeights].map(([row, value]) => [row >= before ? row + count : row, value]));
    this.merges = this.merges.map(merge => {
      if (merge.row >= before) return { ...merge, row: merge.row + count };
      if (merge.row + merge.numRows - 1 >= before) return { ...merge, numRows: merge.numRows + count };
      return merge;
    });
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
  getRowHeight(row) { return this.rowHeights.get(row) || 20; }
  setRowHeights(startRow, count, value) {
    for (let row = startRow; row < startRow + count; row += 1) this.rowHeights.set(row, value);
    return this;
  }
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
  const sheet = new FakeSheet(name, 142, 22);
  const headers = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','PRE DVIC','PRE-WHIP','POST DVIC','POST-WHIP','','RESCUED','STOP COUNT','PACKAGE COUNT','PACKAGE RETURNS','END TIME','RTS TIME','PLANNED RTS','CLOCK OUT TIME'];
  headers.forEach((value, index) => sheet.setCell(1, index + 1, value));
  const waveStarts = [3,20,37,54,71,88];
  [[3,'WAVE 1'],[20,'WAVE 2'],[37,'WAVE 3'],[54,'WAVE 4'],[71,'WAVE 5'],[88,'WAVE 6'],[105,"ADHOC's"],[121,'HELPERS'],[137,'DSP']].forEach(([row, value]) => sheet.setCell(row, 1, value));
  waveStarts.forEach(row => {
    sheet.merges.push({row, col:1, numRows:15, numCols:1});
    sheet.merges.push({row, col:5, numRows:16, numCols:1});
  });
  [[105,15],[121,15],[137,6]].forEach(([row, numRows]) => {
    sheet.merges.push({row, col:1, numRows, numCols:1});
    sheet.merges.push({row, col:5, numRows, numCols:1});
  });
  for (let row = 3; row <= 142; row += 1) for (let col = 10; col <= 13; col += 1) sheet.setCell(row, col, false);
  sheet.frozenRows = 2;
  return sheet;
}

function runConnectorWithSheet(sheet, payload, rtsPayload = null, whipPayload = null) {
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
      BorderStyle: { SOLID: 'SOLID' },
      CopyPasteType: { PASTE_FORMAT: 'PASTE_FORMAT', PASTE_DATA_VALIDATION: 'PASTE_DATA_VALIDATION' }
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: text => ({ text, setMimeType() { return this; } })
    }
  };
  const context = { ...sandbox, __payload: payload, __rtsPayload: rtsPayload, __whipPayload: whipPayload, __ui: ui, __spreadsheet: spreadsheet };
  vm.runInNewContext(`${connector}
    globalThis.__validation = validateRelayOpsMorningPayload(globalThis.__payload);
    globalThis.__ping = JSON.parse(doGet({}).text);
    globalThis.__templateLayout = relayOpsValidateTemplate();
    globalThis.__layoutBefore = relayOpsTemplateLayout(findRelayOpsMorningSheet(globalThis.__payload), globalThis.__payload.rows.length);
    globalThis.__result = writeRelayOpsMorningSheet(globalThis.__payload);
    if (globalThis.__rtsPayload) {
      globalThis.__rtsValidation = validateRelayOpsRtsPayload(globalThis.__rtsPayload);
      globalThis.__rtsResult = writeRelayOpsRtsOnly(globalThis.__rtsPayload);
    }
    if (globalThis.__whipPayload) {
      globalThis.__whipValidation = validateRelayOpsWhiparoundPayload(globalThis.__whipPayload);
      globalThis.__whipResult = writeRelayOpsWhiparoundOnly(globalThis.__whipPayload);
    }
    globalThis.__layoutAfter = relayOpsTemplateLayout(findRelayOpsMorningSheet(globalThis.__payload), globalThis.__payload.rows.length);
  `, context);
  return context;
}

const payload = {
  version: 'relayops-morning-v1',
  writeMode: 'full-replace',
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
  sections: [{ label: 'WAVE 1', wave: '11:15 AM', driverCount: 2, waveTime: '', pad: 'A', startRow: 3, rowCount: 2, timeRow: 5, separatorRow: 6 }],
  waves: [
    {label:'WAVE 1',value:'11:15 (2)'},
    {label:'WAVE 2',value:'11:20 (0)'},
    {label:'WAVE 3',value:'11:25 (0)'},
    {label:'WAVE 4',value:'11:40 (0)'},
    {label:'WAVE 5',value:'11:45 (0)'},
    {label:'WAVE 6',value:'12:05 (0)'}
  ]
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
if (sheet.getMaxRows() !== 142) throw new Error(`Connector should preserve the dated 142-row template, got ${sheet.getMaxRows()}`);
if (sheet.getMaxColumns() !== 22) throw new Error(`Connector should expand to the original A-V layout, got ${sheet.getMaxColumns()} columns`);
if (sheet.frozenRows !== 2) throw new Error('Connector should preserve the template two-row freeze setting');
if (sheet.getCell(1, 10) !== 'PRE DVIC' || sheet.getCell(1, 21) !== 'PLANNED RTS' || sheet.getCell(1, 22) !== 'CLOCK OUT TIME') throw new Error('Connector should preserve the original A-V headers');
if (sheet.getCell(3, 2) !== 'Driver One' || sheet.getCell(4, 3) !== 'CX202') throw new Error('Connector should write route rows starting at A3');
if (sheet.getCell(3, 16) !== '188' || sheet.getCell(3, 17) !== '331' || sheet.getCell(3, 21) !== '5:35 PM') throw new Error('Connector should map stop/package/Planned RTS into P/Q/U');
if (sheet.formats.get('3:16')?.numberFormat !== '0' || sheet.formats.get('3:17')?.numberFormat !== '0') throw new Error('Stop and Package Count must remain numeric instead of displaying as times');
if (sheet.getCell(3, 10) !== false || sheet.getCell(3, 13) !== false || sheet.getCell(3, 15) !== 'KEEP RESCUED' || sheet.getCell(3, 18) !== 'KEEP RETURNS' || sheet.getCell(3, 19) !== 'KEEP END' || sheet.getCell(3, 20) !== 'KEEP RTS' || sheet.getCell(3, 22) !== 'KEEP CLOCK OUT') throw new Error('Connector overwrote original checkbox or closing-operations columns');
if (sheet.getCell(18, 1) !== '11:15 (2)' || sheet.getCell(35, 1) !== '11:20 (0)' || sheet.getCell(52, 1) !== '11:25 (0)' || sheet.getCell(69, 1) !== '11:40 (0)' || sheet.getCell(86, 1) !== '11:45 (0)' || sheet.getCell(103, 1) !== '12:05 (0)') throw new Error('Connector should write all six wave time/count labels into the dedicated footer cells');
if (sheet.getCell(20, 1) !== 'WAVE 2' || sheet.getCell(37, 1) !== 'WAVE 3' || sheet.getCell(88, 1) !== 'WAVE 6' || sheet.getCell(105, 1) !== "ADHOC's" || sheet.getCell(137, 1) !== 'DSP') throw new Error('Connector should preserve the exact 142-row OPS LOG 2026 section anchors');
if (sheet.columnWidths.get(9) !== 77 || sheet.columnWidths.get(14) !== 77) throw new Error('Connector should preserve every original column width');
if (resultContext.__result.writeRange !== 'A3:V' || resultContext.__result.writtenRange !== 'A3:V142' || resultContext.__result.lastCell !== 'V142') throw new Error('Connector should return the exact A3:V142 template proof');

const wave5Rows = Array.from({ length: 15 }, (_, index) => [
  index === 0 ? 'WAVE 5' : '',
  `Wave Five Driver ${index + 1}`,
  `CX${501 + index}`,
  `STG.V.${index + 1}`,
  index === 0 ? 'B' : '',
  String(index + 1),
  `D${index + 1}`,
  `P${index + 1}`,
  '',
  String(180 + index),
  String(300 + index),
  '',
  '8:45 PM'
]);
const wave5Payload = {
  ...payload,
  rows: [...wave5Rows, ['11:45 (15)', '', '', '', '', '', '', '', '', '', '', '', ''], Array(13).fill('')],
  rowTypes: [...Array(15).fill('route'), 'time', 'separator'],
  sections: [{ label: 'WAVE 5', wave: '11:45 AM', driverCount: 15, waveTime: '', pad: 'B', sourceIndex: 0, startRow: 71, rowCount: 15, timeRow: 86, separatorRow: 87 }],
  waves: [
    {label:'WAVE 1',value:'11:15 (0)'},
    {label:'WAVE 2',value:'11:20 (0)'},
    {label:'WAVE 3',value:'11:25 (0)'},
    {label:'WAVE 4',value:'11:40 (0)'},
    {label:'WAVE 5',value:'11:45 (15)'},
    {label:'WAVE 6',value:'12:05 (0)'}
  ]
};
const wave5Sheet = createLegacyTemplate('7/12/26');
const wave5Context = runConnectorWithSheet(wave5Sheet, wave5Payload);
if (!wave5Context.__validation.ready || wave5Sheet.getCell(85, 2) !== 'Wave Five Driver 15' || wave5Sheet.getCell(85, 3) !== 'CX515') throw new Error('Connector should accept and write all 15 Wave 5 route rows');
if (wave5Sheet.getCell(86, 1) !== '11:45 (15)' || wave5Sheet.getCell(88, 1) !== 'WAVE 6' || wave5Sheet.getCell(105, 1) !== "ADHOC's") throw new Error('Full Wave 5 should keep its footer at A86 and preserve Wave 6 and Adhocs anchors');

const capacityRows = [], capacityRowTypes = [], capacitySections = [];
const exactWaveStarts = [3,20,37,54,71,88];
const exactWaveCapacities = [15,15,15,15,15,15];
const exactWaveTimes = [18,35,52,69,86,103];
const exactWaveSeparators = [19,36,53,70,87,104];
const exactWaveLabels = ['11:15','11:20','11:25','11:40','11:45','12:05'];
for (let waveIndex = 0; waveIndex < 6; waveIndex += 1) {
  const sourceIndex = capacityRows.length, capacity = exactWaveCapacities[waveIndex];
  for (let routeIndex = 0; routeIndex < capacity; routeIndex += 1) {
    capacityRows.push([
      routeIndex === 0 ? `WAVE ${waveIndex + 1}` : '',
      `Wave ${waveIndex + 1} Driver ${routeIndex + 1}`,
      `CX${1000 + waveIndex * 20 + routeIndex}`,
      `STG.${waveIndex + 1}.${routeIndex + 1}`,
      routeIndex === 0 ? ['A','B','C','A','B','C'][waveIndex] : '',
      String(waveIndex * 20 + routeIndex + 1),
      `D${routeIndex + 1}`,
      routeIndex % 3 ? `P${routeIndex + 1}` : '-',
      '',
      String(180 + routeIndex),
      String(300 + routeIndex),
      '',
      '8:45 PM'
    ]);
    capacityRowTypes.push('route');
  }
  capacityRows.push([`${exactWaveLabels[waveIndex]} (${capacity})`, '', '', '', '', '', '', '', '', '', '', '', '']);
  capacityRowTypes.push('time');
  capacityRows.push(Array(13).fill(''));
  capacityRowTypes.push('separator');
  capacitySections.push({
    label:`WAVE ${waveIndex + 1}`,
    wave:`${exactWaveLabels[waveIndex]} ${waveIndex===5?'PM':'AM'}`,
    driverCount:capacity,
    pad:['A','B','C','A','B','C'][waveIndex],
    sourceIndex,
    startRow:exactWaveStarts[waveIndex],
    rowCount:capacity,
    timeRow:exactWaveTimes[waveIndex],
    separatorRow:exactWaveSeparators[waveIndex]
  });
}
[
  {label:"ADHOC's",startRow:105,capacity:15,separatorRow:120,prefix:'Adhoc',routePrefix:'AX'},
  {label:'HELPERS',startRow:121,capacity:15,separatorRow:136,prefix:'Helper',routePrefix:'HELPER'},
  {label:'DSP',startRow:137,capacity:6,separatorRow:null,prefix:'DSP',routePrefix:'DSP'}
].forEach(section => {
  const sourceIndex=capacityRows.length;
  for(let routeIndex=0;routeIndex<section.capacity;routeIndex+=1){
    capacityRows.push([
      routeIndex===0?section.label:'',
      `${section.prefix} Driver ${routeIndex+1}`,
      `${section.routePrefix}${routeIndex+1}`,
      `STG.${section.prefix.toUpperCase()}.${routeIndex+1}`,
      '',
      `${section.prefix.toUpperCase()}-EV${routeIndex+1}`,
      `${section.prefix.toUpperCase()}-D${routeIndex+1}`,
      routeIndex%3?`${section.prefix.toUpperCase()}-P${routeIndex+1}`:'-',
      '',
      String(120+routeIndex),
      String(220+routeIndex),
      '',
      '9:15 PM'
    ]);
    capacityRowTypes.push('route');
  }
  if(section.separatorRow){
    capacityRows.push(Array(13).fill(''));
    capacityRowTypes.push('separator');
  }
  capacitySections.push({label:section.label,sourceIndex,startRow:section.startRow,rowCount:section.capacity,separatorRow:section.separatorRow});
});
const fullCapacityPayload = {...payload,rows:capacityRows,rowTypes:capacityRowTypes,sections:capacitySections};
const fullCapacitySheet = createLegacyTemplate('7/12/26');
fullCapacitySheet.setCell(105,5,'STALE PAD');
const fullCapacityContext = runConnectorWithSheet(fullCapacitySheet, fullCapacityPayload);
if (!fullCapacityContext.__validation.ready) throw new Error(`Exact 142-row template preflight should pass: ${fullCapacityContext.__validation.errors.join('; ')}`);
if (fullCapacitySheet.getCell(17, 2) !== 'Wave 1 Driver 15' || fullCapacitySheet.getCell(85, 2) !== 'Wave 5 Driver 15' || fullCapacitySheet.getCell(102, 2) !== 'Wave 6 Driver 15' || fullCapacitySheet.getCell(119, 2) !== 'Adhoc Driver 15' || fullCapacitySheet.getCell(135, 2) !== 'Helper Driver 15' || fullCapacitySheet.getCell(142, 2) !== 'DSP Driver 6') throw new Error('Connector should fill every exact-capacity section through row 142 without overlap');
if (String(fullCapacitySheet.getCell(19, 1) || '') !== '' || fullCapacitySheet.getCell(20, 1) !== 'WAVE 2' || String(fullCapacitySheet.getCell(104, 1) || '') !== '' || fullCapacitySheet.getCell(105, 1) !== "ADHOC's" || String(fullCapacitySheet.getCell(136, 1) || '') !== '' || fullCapacitySheet.getCell(137, 1) !== 'DSP') throw new Error('Exact-capacity sections should retain every divider row and downstream anchor');
if (String(fullCapacitySheet.getCell(105, 5) || '') !== '') throw new Error('Ad Hoc pad must stay blank by default even at full capacity');
const manualAdhocPadPayload=JSON.parse(JSON.stringify(fullCapacityPayload));
const manualAdhocSection=manualAdhocPadPayload.sections.find(section=>section.label==="ADHOC's");
manualAdhocSection.pad='Q';manualAdhocPadPayload.rows[manualAdhocSection.sourceIndex][4]='Q';
const manualAdhocPadSheet=createLegacyTemplate('7/12/26');
runConnectorWithSheet(manualAdhocPadSheet,manualAdhocPadPayload);
if(manualAdhocPadSheet.getCell(105,5)!=='Q')throw new Error('A dispatcher-entered Ad Hoc pad must write to the Ad Hoc Pad block');

for(let waveIndex=0;waveIndex<6;waveIndex+=1){
  const label=`WAVE ${waveIndex+1}`,waveTime=exactWaveLabels[waveIndex];
  const overflowWaveRows = Array.from({length:16},(_,index)=>[
    index===0?label:'',`Overflow Wave ${waveIndex+1} Driver ${index+1}`,`CX${700+waveIndex*20+index}`,`STG.${waveIndex+1}.${index+1}`,index===0?'A':'',
    String(index+1),`D${index+1}`,`P${index+1}`,'',String(180+index),String(300+index),'','8:45 PM'
  ]);
  const overflowPayload = {
    ...payload,
    rows:[...overflowWaveRows,[`${waveTime} (16)`,'','','','','','','','','','','',''],Array(13).fill('')],
    rowTypes:[...Array(16).fill('route'),'time','separator'],
    sections:[{label,wave:`${waveTime} AM`,driverCount:16,pad:'A',sourceIndex:0,startRow:3,rowCount:16,timeRow:19,separatorRow:20}],
    waves:payload.waves.map((wave,index)=>index===waveIndex?{...wave,value:`${waveTime} (16)`}:wave)
  };
  let overflowRejected=false;
  try { runConnectorWithSheet(createLegacyTemplate('7/12/26'),overflowPayload); }
  catch(error) { overflowRejected=new RegExp(label+' exceeds 15 available route rows').test(String(error.message)); }
  if(!overflowRejected) throw new Error(`${label} must reject a 16th route before writing`);
}

const rtsOnlyPayload = {version:'relayops-morning-v1',mode:'rts-only',operationDate:'2026-07-12',sheetName:'7/12/26',sheetNameCandidates:['7/12/26','7.12.26'],updates:[{route:'CX201',plannedRts:'8:45 PM'},{route:'CX202',plannedRts:'9:06 PM'}],waves:payload.waves};
const rtsSheet = createLegacyTemplate('7/12/26');
const rtsContext = runConnectorWithSheet(rtsSheet, payload, rtsOnlyPayload);
if (!rtsContext.__rtsValidation.ready || rtsContext.__rtsResult.updated !== 2 || rtsContext.__rtsResult.waveTimes !== 6) throw new Error('RTS-only connector should validate and update two route times plus all six wave labels');
if (rtsSheet.getCell(3, 21) !== '8:45 PM' || rtsSheet.getCell(4, 21) !== '9:06 PM' || rtsSheet.getCell(18, 1) !== '11:15 (2)' || rtsSheet.getCell(69, 1) !== '11:40 (0)' || rtsSheet.getCell(86, 1) !== '11:45 (0)' || rtsSheet.getCell(103, 1) !== '12:05 (0)') throw new Error('RTS-only connector should write only Planned RTS and all six wave-time/count cells');
if (rtsSheet.getCell(3, 2) !== 'Driver One' || rtsSheet.getCell(3, 16) !== '188') throw new Error('RTS-only connector changed non-RTS Morning Sheet data');

const whipOnlyPayload = {version:'relayops-morning-v1',mode:'whiparound-only',operationDate:'2026-07-12',sheetName:'7/12/26',sheetNameCandidates:['7/12/26','7.12.26'],updates:[{route:'CX201',driver:'Driver One',preWhip:true,postWhip:false},{route:'CX202',driver:'Driver Two',preWhip:true,postWhip:true}]};
const whipSheet = createLegacyTemplate('7/12/26');
const whipContext = runConnectorWithSheet(whipSheet, payload, null, whipOnlyPayload);
if (!whipContext.__whipValidation.ready || whipContext.__whipResult.updated !== 2 || whipContext.__whipResult.missingRoutes.length) throw new Error('Whiparound-only connector should validate and update both matching route rows');
if (whipSheet.getCell(3,11) !== true || whipSheet.getCell(3,13) !== false || whipSheet.getCell(4,11) !== true || whipSheet.getCell(4,13) !== true) throw new Error('Whiparound-only connector should write PRE-WHIP and POST-WHIP checkbox booleans');
if (whipSheet.getCell(3,15) !== undefined || whipSheet.getCell(3,16) !== '188' || whipSheet.getCell(3,17) !== '331' || whipSheet.getCell(3,21) !== '5:35 PM' || whipSheet.getCell(3,2) !== 'Driver One') throw new Error('Whiparound-only connector changed unrelated Ops Log cells');

const sentinelSheet = createLegacyTemplate('7.12.26');
sentinelSheet.setCell(3, 14, 'DO NOT TOUCH N3');
runConnectorWithSheet(sentinelSheet, payload);
if (sentinelSheet.getMaxColumns() !== 22) throw new Error('Connector should retain all A-V template columns');
if (sentinelSheet.getCell(3, 14) !== 'DO NOT TOUCH N3') throw new Error('Connector should not touch columns N and beyond');
if (sentinelSheet.breakApartCalls.length) throw new Error('Connector should preserve every original merged range');

const creationContext = runConnectorWithSheet(createLegacyTemplate(), payload);
const createdDateSheet = creationContext.__spreadsheet.getSheetByName('7/12/26');
if (creationContext.__result.sheetName !== '7/12/26' || !creationContext.__result.createdSheet || !createdDateSheet || createdDateSheet.getCell(3, 2) !== 'Driver One' || createdDateSheet.getCell(18, 1) !== '11:15 (2)' || createdDateSheet.getCell(137,1)!=='DSP') throw new Error('Connector should create the exact operation-date tab from OPS LOG 2026 and populate the 142-row anchors and wave footer');

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
