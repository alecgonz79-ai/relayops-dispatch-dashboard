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
  navigator: { clipboard: { writeText: async () => {} } },
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
const checks = `
  toast = () => {};
  const expectedWaves = ['11:15 AM','11:20 AM','11:25 AM','11:40 AM','11:45 AM'];
  if (JSON.stringify(morningWaveList()) !== JSON.stringify(expectedWaves)) throw new Error('Wave sort failed');
  if (expectedWaves.map(padForWave).join(',') !== 'A,B,C,A,B') throw new Error('Pad assignment failed');
  state.importedFile = {
    name: 'day.csv',
    headers: ['DSP','Route Code','Wave','Staging Location','Num Zones','Num Packages'],
    rows: [
      ['LLOL','CX900','11:20 AM','STG.P.2','20','320'],
      ['OTHER','ZZ100','11:10 AM','STG.A.1','19','301'],
      ['LLOL','CX901','11:15 AM','STG.V.1','21','340']
    ]
  };
  applyImport();
  if (state.morningRoutes.length !== 2) throw new Error('DSP filter failed');
  if (state.lastImportExcluded !== 1) throw new Error('Excluded count failed');
  if (state.morningRoutes[0].wave !== '11:15 AM') throw new Error('Imported wave ordering failed');
  state.modal = 'import';
  const uploadHtml = modal();
  if (!uploadHtml.includes('Make my morning sheet')) throw new Error('Simple upload heading missing');
  if (!uploadHtml.includes('Create my wave & pad sheet')) throw new Error('Simple upload action missing');
  if (!uploadHtml.includes('CX + staging + pad')) throw new Error('Pad matching explanation missing');
  const morningHtml = morningSheetPage();
  if (!morningHtml.includes('Three easy steps') || !morningHtml.includes('Wave time + staging + pad')) throw new Error('Quick start guide missing');
  const details = routeDetailsFromRows([
    ['Route Code','Driver Name','Stop Count'],
    ['CX901','Taylor Driver','177']
  ]);
  if (details.CX901.driver !== 'Taylor Driver' || details.CX901.stops !== 177) throw new Error('ROUTE_DJT6 detail parsing failed');
  state.importedFile = {
    name: 'DAYOFOPSPLAN.xlsx + ROUTE_DJT6.xlsx', kind: 'plan', routeDetails: details, routeDetailsCount: 1,
    headers: ['DSP','Route Code','Wave','Staging Location','Num Zones','Num Packages'],
    rows: [['LLOL','CX901','11:15 AM','STG.V.1','21','340']]
  };
  applyImport();
  if (state.morningRoutes[0].driver !== 'Taylor Driver' || state.morningRoutes[0].stops !== 177) throw new Error('CX route merge failed');
  state.editMode = true;
  const editableHtml = morningSheetPage();
  if (!editableHtml.includes('contenteditable="true"') || !editableHtml.includes('<th>Portable</th>') || !editableHtml.includes('Preview JPEG')) throw new Error('Editable sheet or JPEG control missing');
  state.screenshotPreview = 'data:image/jpeg;base64,demo'; state.modal = 'screenshot';
  if (!modal().includes('Approve & save JPEG') || !modal().includes('Driver/Helper')) throw new Error('JPEG approval dialog missing');
  globalThis.__parseXlsx = parseXlsxArrayBuffer;
`;

vm.runInNewContext(`${source}\n${checks}`, context, { filename: 'app.js' });

(async () => {
  const zip = new JSZip();
  zip.file('xl/workbook.xml', '<?xml version="1.0"?><workbook xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Operations" sheetId="1" r:id="rId1"/></sheets></workbook>');
  zip.file('xl/_rels/workbook.xml.rels', '<?xml version="1.0"?><Relationships><Relationship Id="rId1" Target="worksheets/sheet1.xml"/></Relationships>');
  zip.file('xl/sharedStrings.xml', '<?xml version="1.0"?><sst><si><t>DSP</t></si><si><t>Route Code</t></si><si><t>Wave</t></si><si><t>Staging Location</t></si><si><t>Num Packages</t></si><si><t>LLOL</t></si><si><t>CX100</t></si><si><t>11:15 AM</t></si><si><t>STG.V.1</t></si></sst>');
  zip.file('xl/worksheets/sheet1.xml', '<?xml version="1.0"?><worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c><c r="D1" t="s"><v>3</v></c><c r="E1" t="s"><v>4</v></c></row><row r="2"><c r="A2" t="s"><v>5</v></c><c r="B2" t="s"><v>6</v></c><c r="C2" t="s"><v>7</v></c><c r="D2" t="s"><v>8</v></c><c r="E2"><v>332</v></c></row></sheetData></worksheet>');
  const workbook = await zip.generateAsync({ type: 'nodebuffer' });
  const parsed = await context.__parseXlsx(workbook);
  if (parsed.length !== 2 || parsed[0][0] !== 'DSP' || parsed[1][1] !== 'CX100' || parsed[1][4] !== 332) throw new Error('XLSX parsing failed');
  console.log('Morning sheet CSV/XLSX smoke test passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
