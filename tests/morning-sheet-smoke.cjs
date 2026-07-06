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
  if (!uploadHtml.includes('Create my operations sheet')) throw new Error('Simple upload action missing');
  if (!uploadHtml.includes('CX route matching')) throw new Error('CX matching explanation missing');
  state.page = 'fleet';
  const fleetHtml = fleetPage();
  if (!fleetHtml.includes('FleetOS + Amazon EV live board') || !fleetHtml.includes('Refresh battery %') || !fleetHtml.includes('logistics.amazon.com/fleet-management/#vehicles') || !fleetHtml.includes('business.rivian.com/vehicles/tracker') || !fleetHtml.includes('EDV-014816') || !fleetHtml.includes('7FCEHEB79PN014816') || !fleetHtml.includes('98 mi / 63%')) throw new Error('FleetOS/Amazon EV board missing');
  state.expandedFleetVin = '7FCEHEB79PN014816';
  const expandedFleetHtml = fleetPage();
  if (!expandedFleetHtml.includes('8HJK214') || !expandedFleetHtml.includes('Operational') || !expandedFleetHtml.includes('FleetOS + Amazon')) throw new Error('Expandable FleetOS/Amazon EV details missing');
  state.fleetSort = 'battery-low';
  const sortedFleet = sortedRivianFleet();
  if (sortedFleet[0].battery !== 18 || batteryTone(18) !== 'critical' || batteryTone(92) !== 'high') throw new Error('Rivian battery sorting or color tone failed');
  refreshFleetStatus();
  if (state.fleetLastRefresh === 'Not refreshed yet' || !fleetPage().includes('Last refresh:')) throw new Error('Fleet refresh did not update the board');
  const morningHtml = morningSheetPage();
  if (!morningHtml.includes('Three easy steps') || !morningHtml.includes('White cells + Google Sheets paste')) throw new Error('Quick start guide missing');
  const details = routeDetailsFromRows([
    ['Route Code','Driver Name','Stop Count','Planned Departure Time'],
    ['CX901','Taylor Driver|Helper Name','177','12:05pm']
  ]);
  if (details.CX901.driver !== 'Taylor Driver' || details.CX901.stops !== 177 || details.CX901.plannedRts !== '12:05 PM') throw new Error('ROUTE_DJT6 detail parsing failed');
  state.importedFile = {
    name: 'DAYOFOPSPLAN.xlsx + ROUTE_DJT6.xlsx', kind: 'plan', routeDetails: details, routeDetailsCount: 1,
    headers: ['DSP','Route Code','Wave','Staging Location','Num Zones','Num Packages'],
    rows: [['LLOL','CX901','11:15 AM','STG.V.1','21','340']]
  };
  applyImport();
  if (state.morningRoutes[0].driver !== 'Taylor Driver' || state.morningRoutes[0].stops !== 177) throw new Error('CX route merge failed');
  state.morningRoutes[0].ev = '21';
  const equipment = equipmentDetailsFromText('EV/VAN "21" Device "3" Portable "-"');
  if (equipment['21'].device !== '3' || equipment['21'].portable !== '-') throw new Error('EV/device text parsing failed');
  const filledScreenshotText = equipmentDetailsFromText('1 40 31 37 31 -\\n2 41 32 38 32 -\\nF33 76 P1 R35 77 P2');
  if (filledScreenshotText['37'].device !== '31' || filledScreenshotText['2'].portable !== '32' || filledScreenshotText.R35.portable !== 'P2') throw new Error('Filled VAN/DEV/PORT OCR text parsing failed');
  const denseScreenshotText = equipmentDetailsFromText('EV/VAN DEVICE Portable EV/VAN DEVICE Portable 1 40 31 37 31 - 2 41 32 38 32 - 55 49 - 56 50 2 57 51 7 58 52 9');
  if (denseScreenshotText['1'].device !== '40' || denseScreenshotText['58'].portable !== '9') throw new Error('Dense screenshot text parsing failed');
  const positionedOcr = detectionsToText([
    { rawValue:'37', boundingBox:{x:350,y:35,height:20} }, { rawValue:'31', boundingBox:{x:500,y:36,height:14} }, { rawValue:'-', boundingBox:{x:620,y:37,height:14} },
    { rawValue:'1', boundingBox:{x:45,y:35,height:20} }, { rawValue:'40', boundingBox:{x:160,y:36,height:14} }, { rawValue:'31', boundingBox:{x:280,y:37,height:14} },
    { rawValue:'2', boundingBox:{x:45,y:68,height:20} }, { rawValue:'41', boundingBox:{x:160,y:69,height:14} }, { rawValue:'32', boundingBox:{x:280,y:70,height:14} }
  ]);
  const positionedDetails = equipmentDetailsFromText(positionedOcr);
  if (positionedDetails['37'].portable !== '-' || positionedDetails['2'].device !== '41') throw new Error('Positioned OCR row grouping failed');
  const equipmentRows = equipmentDetailsFromRows([
    ['EV/VAN','Device','Portable'],
    ['21','3','-']
  ]);
  if (equipmentRows['21'].device !== '3' || equipmentRows['21'].portable !== '-') throw new Error('EV/device row parsing failed');
  const splitEquipmentRows = equipmentDetailsFromRows([
    ['EV/VAN','DEVICE','Portable','EV/VAN','DEVICE','Portable'],
    ['21','3','-','37','8','P1'],
    ['F33','4','P2','H1','9','-']
  ]);
  if (splitEquipmentRows['37'].device !== '8' || splitEquipmentRows.F33.portable !== 'P2' || splitEquipmentRows.H1.device !== '9') throw new Error('Split VAN/DEV/PORT table parsing failed');
  state.equipmentImport = { name: 'device list', details: equipment };
  applyEquipmentImport();
  if (state.morningRoutes[0].deviceName !== '3' || state.morningRoutes[0].portable !== '-') throw new Error('EV/device assignment failed');
  state.morningRoutes[0].ev = '37';
  state.equipmentImport = { name: 'filled screenshot trial', details: denseScreenshotText };
  applyEquipmentImport();
  if (state.morningRoutes[0].deviceName !== '31' || state.morningRoutes[0].portable !== '-') throw new Error('Filled screenshot EV/device assignment failed');
  state.modal = 'equipment';
  if (!modal().includes('VAN/DEV/PORT IMPORT') || !modal().includes('Drop screenshot, JPEG, PDF, CSV, or XLSX here') || !modal().includes('equipment-drop') || !modal().includes('equipment-paste-text')) throw new Error('EV/device import modal missing');
  state.modal = 'equipment';
  handleEquipmentPaste({ preventDefault(){}, clipboardData:{ files:[], getData:()=> '1 40 31 37 31 -' } });
  if (!state.equipmentImport || state.equipmentImport.details['37'].device !== '31') throw new Error('Equipment paste shortcut failed');
  state.editMode = true;
  const editableHtml = morningSheetPage();
  if (!editableHtml.includes('contenteditable="true"') || !editableHtml.includes('data-sheet-cell="true"') || !editableHtml.includes('<th>PORTABLE</th>') || !editableHtml.includes('PLANNED RTS') || !editableHtml.includes('VAN/DEV/PORT Import') || !editableHtml.includes('EV 1-57 Low → High') || !editableHtml.includes('Randomize EVs') || !editableHtml.includes('Assign Gas Vehicles') || !editableHtml.includes('Copy Google Sheets table') || !editableHtml.includes('Open paste box') || !editableHtml.includes('Remove blank rows') || !editableHtml.includes('Preview JPEG')) throw new Error('Editable sheet or JPEG control missing');
  assignElectricVehicles('low');
  if (state.morningRoutes[0].ev !== '1') throw new Error('Lowest-to-highest EV assignment failed');
  assignGasVehicles();
  if (state.morningRoutes[0].ev !== 'F33') throw new Error('Gas vehicle assignment failed');
  const tsv = morningSheetTsv();
  if (!tsv.startsWith('WAVE\\tDRIVER\\tROUTE') || !tsv.includes('11:15 (1)')) throw new Error('Google Sheets TSV output missing headers or wave count');
  if (morningDisplayRows(morningSections(filteredMorningRows())[0]).length !== 14) throw new Error('Template row padding missing');
  state.fitMorningRows = true;
  if (morningDisplayRows(morningSections(filteredMorningRows())[0]).length !== 1) throw new Error('Fit-to-drivers row sizing failed');
  if (!morningSheetPage().includes('✓ Fit to drivers')) throw new Error('Fit-to-drivers toggle missing');
  state.fitMorningRows = false;
  state.sheetCopyText = tsv; state.modal = 'sheets-helper';
  if (!modal().includes('Paste-ready morning sheet') || !modal().includes('sheets-copy-text')) throw new Error('Google Sheets paste helper missing');
  state.screenshotPreview = 'data:image/jpeg;base64,demo'; state.modal = 'screenshot';
  if (!modal().includes('Approve & save JPEG') || !modal().includes('Driver/Helper')) throw new Error('JPEG approval dialog missing');
  globalThis.__parseXlsx = parseXlsxArrayBuffer;
  globalThis.__readPdfText = readPdfText;
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
  const pdfLike = Buffer.from('%PDF-1.4\\nBT (1 40 31 37 31 - 2 41 32 38 32 -) Tj ET\\n%%EOF');
  const pdfText = await context.__readPdfText(pdfLike.buffer.slice(pdfLike.byteOffset, pdfLike.byteOffset + pdfLike.byteLength));
  if (!pdfText.includes('1 40 31 37 31 -')) throw new Error('PDF text extraction failed');
  console.log('Morning sheet CSV/XLSX smoke test passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
