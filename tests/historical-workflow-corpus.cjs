const fs = require('fs');
const path = require('path');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const app = { innerHTML: '' };
const fileInput = { accept: '', clicked: 0, addEventListener() {}, click() { this.clicked += 1; } };
const storage = new Map();
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {},
  classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
  focus() {}, setSelectionRange() {}, click() {}
});
const context = {
  console, Intl, Blob, URL, TextDecoder, setTimeout, clearTimeout, JSZip,
  navigator: { clipboard: { writeText: async () => {} } }, window: { scrollTo() {} },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  document: {
    body: { appendChild() {} },
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelectorAll: () => [], createElement: element
  }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context);
vm.runInContext('globalThis.__state=state; toast=()=>{}; render=()=>{}; persist=()=>{};', context);
const state = context.__state;

const downloads = '/Users/alecgonzo/Downloads';
const available = fs.existsSync(downloads) ? fs.readdirSync(downloads) : [];
const tested = [];
const boundary = [];
const fullPath = name => path.join(downloads, name);
const arrayBuffer = buffer => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
const fileObject = name => {
  const bytes = fs.readFileSync(fullPath(name));
  return {
    name,
    type: name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : '',
    arrayBuffer: async () => arrayBuffer(bytes),
    text: async () => bytes.toString('utf8')
  };
};
const xlsxRows = async name => {
  const rows = await context.parseXlsxArrayBuffer(arrayBuffer(fs.readFileSync(fullPath(name))));
  tested.push(name);
  return rows;
};
const key = value => String(value ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

async function testDayPlansAndRouteJoin() {
  const plans = {
    '2026-06-04-DJT6-CYCLE_1-DSP-DayOfOpsPlan.xlsx': 48,
    '2026-06-18-DJT6-CYCLE_1-DSP-DayOfOpsPlan.xlsx': 43,
    '2026-06-25-DJT6-CYCLE_1-DSP-DayOfOpsPlan.xlsx': 48,
    '2026-07-03-DJT6-CYCLE_1-DSP-DayOfOpsPlan.xlsx': 46,
    '2026-07-07-DJT6-CYCLE_1-DSP-DayOfOpsPlanLLLLOLLLLLLLLLLLLL.xlsx': 51,
    '2026-07-13-DJT6-CYCLE_1-DSP-DayOfOpsPlanLLOL3.xlsx': 40
  };
  const routeFiles = {
    'Routes_DJT6_2026-06-04_09_01 (PDT).xlsx': 48,
    'Routes_DJT6_2026-06-09_08_47 (PDT).xlsx': 42,
    'Routes_DJT6_2026-06-18_08_59 (PDT).xlsx': 43,
    'Routes_DJT6_2026-06-25_08_55 (PDT).xlsx': 48,
    'Routes_DJT6_2026-07-02_15_58 (PDT).xlsx': 48,
    'Routes_DJT6_2026-07-02_16_05 (PDT).xlsx': 48,
    'Routes_DJT6_2026-07-03_21_04 (PDT).xlsx': 47,
    'Routes_DJT6_2026-07-05_22_08 (PDT).xlsx': 40,
    'Routes_DJT6_2026-07-07_14_40 (PDT).xlsx': 53,
    'Routes_DJT6_2026-07-07_15_42 (PDT).xlsx': 53,
    'Routes_DJT6_2026-07-12_08_39 (PDT).xlsx': 43,
    'Routes_DJT6_2026-07-12_10_00 (PDT).xlsx': 43,
    'Routes_DJT6_2026-07-13_08_42 (PDT).xlsx': 40,
    'Routes_DJT6_2026-07-13_12_42 (PDT).xlsx': 43
  };
  if (!available.some(name => /DayOfOpsPlan/i.test(name))) {
    boundary.push('DAYOFOPSPLAN/ROUTE_DJT6 historical files not present');
    return;
  }
  for (const [name, expectedLlol] of Object.entries(plans)) {
    if (!fs.existsSync(fullPath(name))) continue;
    state.importPurpose = 'morning';
    const rows = await xlsxRows(name), headers = rows[0].map(key);
    assert(['dsp','routecode','wave','staginglocation','routeduration','numpackages'].every(header => headers.includes(header)), `${name}: required DAYOFOPSPLAN columns missing`);
    const dsp = headers.indexOf('dsp'), staging = headers.indexOf('staginglocation');
    const llol = rows.slice(1).filter(row => String(row[dsp]).trim().toUpperCase() === 'LLOL');
    assert(llol.length === expectedLlol, `${name}: expected ${expectedLlol} LLOL routes, got ${llol.length}`);
    assert(llol.every(row => String(row[staging] || '').trim()), `${name}: LLOL staging location missing`);
  }
  for (const [name, expectedRoutes] of Object.entries(routeFiles)) {
    if (!fs.existsSync(fullPath(name))) continue;
    state.importPurpose = 'morning';
    const details = context.routeDetailsFromRows(await xlsxRows(name));
    assert(Object.keys(details).length === expectedRoutes, `${name}: expected ${expectedRoutes} CX rows, got ${Object.keys(details).length}`);
    assert(Object.values(details).every(row => row.stops !== null), `${name}: stop counts were not read`);
    assert(Object.values(details).every(row => !String(row.driver).includes('|')), `${name}: helper delimiter leaked into the primary driver`);
  }

  const planName = '2026-07-13-DJT6-CYCLE_1-DSP-DayOfOpsPlanLLOL3.xlsx';
  const routeName = 'Routes_DJT6_2026-07-13_12_42 (PDT).xlsx';
  if (fs.existsSync(fullPath(planName)) && fs.existsSync(fullPath(routeName))) {
    state.importPurpose = 'morning'; state.dspCode = 'LLOL'; state.morningFilters = { wave:'all', staging:'all', pad:'all' };
    const planRows = await context.parseXlsxArrayBuffer(arrayBuffer(fs.readFileSync(fullPath(planName))));
    const routeRows = await context.parseXlsxArrayBuffer(arrayBuffer(fs.readFileSync(fullPath(routeName))));
    state.importedFile = { name:`${planName} + ${routeName}`, headers:planRows[0], rows:planRows.slice(1), kind:'plan', routeDetails:context.routeDetailsFromRows(routeRows) };
    context.applyImport();
    assert(state.morningRoutes.length === 40 && state.morningRoutes.every(row => row.dsp === 'LLOL'), 'DAYOFOPSPLAN apply must keep only LLOL routes');
    assert(state.morningRoutes.every(row => row.route && row.wave && row.staging), 'Joined Morning Sheet is missing route/wave/staging values');
    assert(state.morningRoutes.every((row, index, all) => !index || context.waveMinutes(all[index - 1].wave) <= context.waveMinutes(row.wave)), 'Morning routes are not sorted earliest-wave first');
  }
}

async function testItinerariesAndRtsFlags() {
  const expected = {
    'Itineraries_DJT6_2026-06-02_13_22 (PDT).xlsx': 40,
    'Itineraries_DJT6_2026-06-04_09_00 (PDT).xlsx': 0,
    'Itineraries_DJT6_2026-06-04_09_01 (PDT).xlsx': 0,
    'Itineraries_DJT6_2026-06-04_14_54 (PDT).xlsx': 47,
    'Itineraries_DJT6_2026-06-09_12_45 (PDT).xlsx': 42,
    'Itineraries_DJT6_2026-06-18_13_48 (PDT).xlsx': 43,
    'Itineraries_DJT6_2026-06-25_13_35 (PDT).xlsx': 48,
    'Itineraries_DJT6_2026-07-05_22_29 (PDT).xlsx': 40,
    'Itineraries_DJT6_2026-07-06_08_43 (PDT).xlsx': 0,
    'Itineraries_DJT6_2026-07-12_16_53 (PDT).xlsx': 43,
    'Itineraries_DJT6_2026-07-12_17_31 (PDT).xlsx': 43,
    'Itineraries_DJT6_2026-07-13_12_43 (PDT).xlsx': 40
  };
  if (!available.some(name => /^Itineraries_DJT6/i.test(name))) {
    boundary.push('Itineraries_DJT6 historical files not present');
    return;
  }
  let latestDetails = {};
  for (const [name, expectedRoutes] of Object.entries(expected)) {
    if (!fs.existsSync(fullPath(name))) continue;
    state.importPurpose = 'itinerary-rts';
    const rows = await xlsxRows(name), details = context.itineraryRtsDetailsFromRows(rows);
    assert(Object.keys(details).length === expectedRoutes, `${name}: expected ${expectedRoutes} planned RTS routes, got ${Object.keys(details).length}`);
    if (!expectedRoutes) {
      assert(!rows[0].map(key).includes('plannedreturntostation'), `${name}: zero RTS rows should mean the export lacks Planned return to station`);
      continue;
    }
    assert(Object.values(details).every(row => row.plannedRts && row.allStops !== null && row.totalPackages !== null), `${name}: planned RTS/stops/packages not preserved`);
    const headers = rows[0].map(key), routeIx = headers.indexOf('routecode'), stopsIx = headers.indexOf('allstops'), packageIx = headers.indexOf('totalpackages');
    const grouped = new Map();
    rows.slice(1).forEach(row => {
      const route = context.normalizeCxRoute(row[routeIx]); if (!route) return;
      const item = { stops:Number(row[stopsIx]), packages:Number(row[packageIx]) };
      const list = grouped.get(route) || []; list.push(item); grouped.set(route, list);
    });
    for (const [route, candidates] of grouped) {
      const selected = details[route]; if (!selected || candidates.length < 2) continue;
      const maxStops = Math.max(...candidates.map(row => row.stops));
      assert(selected.allStops === maxStops, `${name}: duplicate ${route} did not keep the highest All stops route`);
    }
    if (name.includes('2026-07-13')) latestDetails = details;
  }
  assert(!context.isIrregularPlannedRts('9:14 PM','11:15 AM',484), 'A normal 9:14 PM planned return must not be flagged');
  assert(context.isIrregularPlannedRts('2:10 PM','11:15 AM',484), 'A 2:10 PM rescue return must be flagged against route duration');
  assert(!context.isIrregularPlannedRts('9:53 PM','11:45 AM'), 'Evening RTS must not be blanket-flagged when duration is unavailable');
  assert(context.isIrregularPlannedRts('2:10 PM','11:15 AM'), 'An RTS under three hours after wave must be flagged without duration');
  if (Object.keys(latestDetails).length && state.morningRoutes.length) {
    const byRoute = new Map(state.morningRoutes.map(row => [context.normalizeCxRoute(row.route), row]));
    const matched = Object.entries(latestDetails).filter(([route]) => byRoute.has(route));
    assert(matched.length === 40, `7/13 corpus: expected 40 plan/itinerary matches, got ${matched.length}`);
    assert(matched.every(([route, detail]) => !context.isIrregularPlannedRts(detail.plannedRts, byRoute.get(route).wave, byRoute.get(route).duration)), '7/13 valid evening planned RTS values were falsely flagged');
  }
}

async function testDriverAndWhiparoundImports() {
  const associateNames = ['AssociateData','AssociateData 2','AssociateData 3','AssociateData 4','AssociateData-2','AssociateData-3','AssociateData-4'];
  for (const name of associateNames) {
    if (!fs.existsSync(fullPath(name))) continue;
    state.importPurpose = 'drivers';
    const parsed = await context.parseUploadedFile(fileObject(name)), contacts = context.driverContactsFromRows(parsed.rows);
    tested.push(name);
    assert(parsed.kind === 'csv-content', `${name}: extensionless AssociateData was not recognized as CSV content`);
    assert(contacts.length === 127 && contacts.every(contact => contact.phone), `${name}: expected 127 driver phone contacts`);
  }
  const organized = 'organized_associate_data.xlsx';
  if (fs.existsSync(fullPath(organized))) {
    state.importPurpose = 'drivers';
    const contacts = context.driverContactsFromRows(await xlsxRows(organized));
    assert(contacts.length === 127 && contacts.every(contact => contact.phone), 'organized_associate_data.xlsx did not yield 127 named phone contacts');
  }
  const whip = {
    'Inspections Report_2026-07-13-07-20-17.csv': 78,
    'Inspections Report_2026-07-13-15-02-13.csv': 25
  };
  for (const [name, expectedRecords] of Object.entries(whip)) {
    if (!fs.existsSync(fullPath(name))) continue;
    const records = context.inspectionRecordsFromRows(context.parseCSV(fs.readFileSync(fullPath(name),'utf8')));
    tested.push(name);
    assert(records.length === expectedRecords, `${name}: expected ${expectedRecords} Whiparound records, got ${records.length}`);
    assert(records.every(row => ['pre','post'].includes(row.type) && row.date && row.driver), `${name}: invalid Whiparound record`);
  }
}

async function testPaycomBoundariesAndParsers() {
  const reportRows = [
    ['Employee','Jul 14, 2026'],
    ['DOE, JANE','Delivery Associate\n10:30 AM - 7:00 PM'],
    ['SMITH, JOHN','Modified Duty / Rescue\n10:00 AM - 6:30 PM']
  ];
  const report = context.scheduleEntriesFromPaycomReportRows(reportRows);
  assert(report.length === 2 && report[0].name === 'Jane Doe' && report[1].role.includes('Rescue'), 'ReportClass HTML-XLS schedule parser regression');
  const exchange = context.scheduleEntriesFromText(['Tue','7/14','JANE DOE','10:30 AM - 7:00 PM','Delivery Associate'].join('\n'));
  assert(exchange.length === 1 && exchange[0].role === 'Delivery Associate', 'Schedule Exchange text parser regression');
  const reportClass = available.filter(name => /^ReportClass/i.test(name));
  if (!reportClass.length) boundary.push('ReportClass PAYCOM export is not currently present in Downloads; equivalent HTML-XLS rows were regression-tested');
  for (const name of ['7:13 paycom.pdf','Schedule Exchange - Employee Self-Service®.pdf']) {
    if (!fs.existsSync(fullPath(name))) continue;
    state.importPurpose = 'schedule';
    const parsed = await context.parseUploadedFile(fileObject(name)); tested.push(name);
    const entries = context.scheduleEntriesFromText(parsed.text || '');
    if (!entries.length) boundary.push(`${name} is image-only in the Node audit; browser PDF.js/OCR still requires interactive verification`);
  }
}

async function testTemplateEquipmentPayloadAndPickerScopes() {
  const template = 'test ops log.xlsx';
  if (fs.existsSync(fullPath(template))) {
    state.importPurpose = 'morning';
    const rows = await xlsxRows(template), headers = rows[0].map(key);
    assert(rows.length === 103 && ['wave','driver','route','staging','pad','ev','device','portable','stopcount','packagecount','plannedrts'].every(header => headers.includes(header)), 'test ops log.xlsx template columns changed unexpectedly');
  }
  const details = context.equipmentDetailsFromRows([['EV/VAN','DEVICE','PORTABLE'],['EV1','1','2'],['F33','61','7']]);
  assert(details['1']?.device === '1' && details['1']?.portable === '2' && details.F33?.device === '61', 'Device/portable three-column parser failed');
  state.morningRoutes = [{ dsp:'LLOL', driver:'Test Driver', route:'CX1', wave:'11:15 AM', staging:'STG.V.1', ev:'EV1', deviceName:'', portable:'' }];
  state.equipmentImport = { name:'fixture.csv', details };
  context.applyEquipmentImport();
  assert(state.morningRoutes[0].deviceName === '1' && state.morningRoutes[0].portable === '2', 'Device/portable handoff did not match the assigned EV');

  context.action('fleet-import-fleetos', {});
  assert(fileInput.accept === '.csv,text/csv', 'FleetOS picker setup failed');
  context.action('equipment-import', {}); context.action('choose-file', {});
  assert(fileInput.accept.includes('image/*') && fileInput.accept.includes('.pdf') && fileInput.accept.includes('.xlsx'), 'Equipment picker leaked the previous CSV-only accept filter');
  state.importPurpose = 'morning'; context.action('choose-file', {});
  assert(fileInput.accept.includes('.csv') && fileInput.accept.includes('.xlsx') && !fileInput.accept.includes('image/*'), 'Morning picker accept scope is incorrect');
  state.importPurpose = 'itinerary-rts'; context.action('choose-file', {});
  assert(fileInput.accept.includes('.xlsx') && !fileInput.accept.includes('.csv'), 'RTS picker must be XLSX-only');
  context.action('driver-import', {});
  assert(fileInput.accept.includes('text/plain') && fileInput.accept.includes('application/octet-stream'), 'Driver picker must visibly allow extensionless AssociateData text files');

  state.morningRoutes = [
    { dsp:'LLOL', driver:'Primary Driver + Helper Name', route:'CX101', wave:'11:15 AM', staging:'STG.V.1', padOverride:'A', ev:'1', deviceName:'1', portable:'2', stops:180, packages:320, duration:480, plannedRts:'9:15 PM', plannedRtsSource:'itinerary', preWhip:true, postWhip:false },
    { dsp:'LLOL', driver:'Second Driver', route:'CX201', wave:'11:20 AM', staging:'STG.P.1', padOverride:'B', ev:'2', deviceName:'2', portable:'3', stops:175, packages:300, duration:470, plannedRts:'9:10 PM', plannedRtsSource:'itinerary', preWhip:false, postWhip:true }
  ];
  state.morningOperationDate = '2026-07-14'; state.morningFilters = { wave:'all', staging:'all', pad:'all' };
  state.lastItineraryRts = { CX101:{plannedRts:'9:15 PM'}, CX201:{plannedRts:'9:10 PM'} };
  const full = context.morningSheetsConnectorPayload();
  assert(full.writeMode === 'full-replace' && full.startCell === 'A3' && full.writeRange === 'A3:M', 'Full Morning connector payload scope is incorrect');
  assert(full.rowTypes.includes('route') && full.rowTypes.includes('time') && full.rowTypes.includes('separator'), 'Full Morning payload lacks fixed template row types');
  const rts = context.morningRtsOnlyPayload();
  assert(rts.mode === 'rts-only' && rts.updates.length === 2 && rts.updates.every(row => row.expectedSection && Object.keys(row).length === 3), 'RTS-only payload contains wrong scope or lacks fixed section identity');
  const whip = context.morningWhiparoundOnlyPayload();
  assert(whip.mode === 'whiparound-only' && whip.updates.length === 2 && whip.updates[0].driver === 'Primary Driver', 'Whiparound payload must use route + primary driver + fixed section identity');
  state.morningFilters.wave = '11:20 AM';
  const partial = context.morningSheetsConnectorPayload();
  assert(partial.writeMode === 'partial-update' && partial.sections.length === 1 && partial.sections[0].slotKey === 'WAVE2', 'Filtered Morning payload did not preserve the fixed Wave 2 slot');

  const page = context.morningSheetPage();
  assert(!page.includes('id="morning-diagnostics"') && !page.includes('Slack Import') && page.includes('DAYOFOPSPLAN + ROUTE_DJT6'), 'Morning quick-start still shows duplicate diagnostics or locked Slack instead of the real day-file flow');
  context.action('open-morning-diagnostics', {});
  assert(state.modal === 'morning-diagnostics' && context.modal().includes('Setup & diagnostics'), 'Top diagnostics modal was removed with the duplicate inline panel');
}

(async () => {
  await testDayPlansAndRouteJoin();
  await testItinerariesAndRtsFlags();
  await testDriverAndWhiparoundImports();
  await testPaycomBoundariesAndParsers();
  await testTemplateEquipmentPayloadAndPickerScopes();
  console.log(`Historical dispatch corpus passed: ${tested.length} files exercised`);
  console.log(`Files: ${tested.join(' | ')}`);
  if (boundary.length) console.log(`Unverified boundaries: ${boundary.join(' | ')}`);
})().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
