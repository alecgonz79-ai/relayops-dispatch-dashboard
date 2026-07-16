const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function harness() {
  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const storage = new Map();
  const element = () => ({
    addEventListener() {}, appendChild() {}, prepend() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {}, dataset: {},
    focus() {}, blur() {}, click() {}, setSelectionRange() {}, querySelector() { return null; }, querySelectorAll() { return []; }
  });
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
    navigator: { clipboard: { writeText: async () => true } }, location: { href: 'https://relayops.example.test/' },
    window: { scrollTo() {}, open() {}, print() {}, addEventListener() {} },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key) },
    document: { body: { appendChild() {} }, activeElement: null, getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null, querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element, addEventListener() {}, removeEventListener() {} }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{};render=()=>{};persist=()=>{};', context);
  return context;
}

function browserFile(path, type = '') {
  const bytes = fs.readFileSync(path);
  return {
    name: path.split('/').pop(), type,
    arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    text: async () => bytes.toString('utf8')
  };
}

async function parse(context, path, purpose, type = '') {
  assert(fs.existsSync(path), `Historical fixture is missing: ${path}`);
  context.__fixture = browserFile(path, type);
  vm.runInContext(`state.importPurpose=${JSON.stringify(purpose)};`, context);
  await vm.runInContext('parseUploadedFile(globalThis.__fixture).then(value=>globalThis.__parsed=value)', context);
  return context.__parsed;
}

function runEmbeddedSchemaAssertions(context) {
  context.__embeddedDay = [
    ['DSP', 'Route Code', 'Wave', 'Staging Location'],
    ['LLOL', 'CX101', '11:15 AM', 'STG.V.1']
  ];
  context.__embeddedRoutes = [
    ['Route Code', 'Driver Name', 'All Stops'],
    ['CX101', 'Maya Collins|Helper Person', '188']
  ];
  context.__embeddedItinerary = [
    ['Route Code', 'Planned return to station', 'All Stops', 'Total Packages'],
    ['CX189', '2:10 PM', '27', '41'],
    ['CX189', '9:14 PM', '181', '319']
  ];
  context.__embeddedAmazon = [
    ['Vehicle Name', 'VIN', 'License Plate', 'Active', 'operationalStatus', 'serviceType'],
    ['EV1', '7FCEHEB79PN014816', '9ABC123', 'ACTIVE', 'OPERATIONAL', 'Rivian EDV 700'],
    ['R35', '1FTYR3XM0KKA12345', '8GAS123', 'ACTIVE', 'GROUNDED', 'Ford Transit']
  ];
  context.__embeddedFleetos = [
    ['VIN', 'State of Charge', 'Distance to Empty'],
    ['7FCEHEB79PN014816', '87%', '132 mi']
  ];
  context.__embeddedWhip = [
    ['Form', 'Date inspection occurred', 'Asset name', 'Driver first name', 'Driver last name'],
    ['Pre-Trip EDV Inspection (DVIR)', '7/14/2026 10:00 AM', 'EV1', 'Maya', 'Collins'],
    ['Post-Trip EDV Inspection (DVIR)', '7/14/2026 8:00 PM', 'EV1', 'Maya', 'Collins']
  ];
  context.__embeddedContacts = [
    ['Name and ID', 'Personal Phone', 'Position', 'TransporterID'],
    ['Maya Collins', '(951) 555-0100', 'Driver', 'A123']
  ];
  vm.runInContext(`
    globalThis.__embeddedDayHeader=findImportHeader(globalThis.__embeddedDay,[['route','routecode'],['wave','wavetime'],['staging','staginglocation']]);
    globalThis.__embeddedRouteDetails=routeDetailsFromRows(globalThis.__embeddedRoutes);
    globalThis.__embeddedRts=itineraryRtsDetailsFromRows(globalThis.__embeddedItinerary);
    globalThis.__embeddedAmazonParsed=fleetDetailsFromRows(globalThis.__embeddedAmazon,'Amazon fleet list');
    globalThis.__embeddedFleetosParsed=fleetDetailsFromRows(globalThis.__embeddedFleetos,'FleetOS tracker');
    globalThis.__embeddedWhipParsed=inspectionRecordsFromRows(globalThis.__embeddedWhip);
    globalThis.__embeddedContactsParsed=driverContactsFromRows(globalThis.__embeddedContacts);
  `, context);
  assert(context.__embeddedDayHeader === 0, 'Embedded DAYOFOPS schema was not recognized');
  assert(context.__embeddedRouteDetails.CX101?.driver === 'Maya Collins' && context.__embeddedRouteDetails.CX101?.stops === 188, 'Embedded Routes_DJT6 schema lost first driver or stops');
  assert(context.__embeddedRts.CX189?.plannedRts === '9:14 PM', 'Embedded itinerary rescue duplicate did not keep the main-route RTS');
  assert(context.__embeddedAmazonParsed[0]?.operational === 'Operational' && context.__embeddedAmazonParsed[1]?.operational === 'Grounded', 'Embedded Amazon operationalStatus values were not retained');
  assert(context.__embeddedAmazonParsed[1]?.serviceType === 'Ford Transit', 'Embedded Amazon serviceType was not retained');
  assert(context.__embeddedFleetosParsed[0]?.battery === 87 && context.__embeddedFleetosParsed[0]?.miles === 132, 'Embedded FleetOS battery/range schema was not retained');
  assert(context.__embeddedWhipParsed.length === 2 && context.__embeddedWhipParsed.some(row => row.type === 'pre') && context.__embeddedWhipParsed.some(row => row.type === 'post'), 'Embedded Whiparound schemas lost Pre/Post records');
  assert(context.__embeddedContactsParsed[0]?.name === 'Maya Collins' && /555-0100/.test(context.__embeddedContactsParsed[0]?.phone || ''), 'Embedded associate contact schema lost name/phone');
  console.log('Embedded parser schema fixtures passed');
}

async function run() {
  const context = harness();
  runEmbeddedSchemaAssertions(context);
  const root = process.env.RELAYOPS_HISTORICAL_FIXTURE_ROOT || '/Users/alecgonzo/Downloads';
  const required = process.env.RELAYOPS_REQUIRE_HISTORICAL_FIXTURES === '1';
  const expected = [
    '2026-07-13-DJT6-CYCLE_1-DSP-DayOfOpsPlanLLOL3.xlsx',
    'Routes_DJT6_2026-07-13_12_42 (PDT).xlsx',
    'Itineraries_DJT6_2026-07-13_12_43 (PDT).xlsx',
    'VehiclesData-10.xlsx',
    'Vehicle_List-5.csv',
    'Inspections Report_2026-07-13-15-02-13.csv',
    'AssociateData-4'
  ];
  const missing = expected.filter(name => !fs.existsSync(`${root}/${name}`));
  if (missing.length) {
    const message = `Historical Downloads corpus skipped: ${missing.length}/${expected.length} fixture files are unavailable under ${root}. Embedded schema coverage still ran. Set RELAYOPS_REQUIRE_HISTORICAL_FIXTURES=1 to require the full private corpus.`;
    if (required) throw new Error(`${message} Missing: ${missing.join(', ')}`);
    console.log(message);
    return;
  }
  const evidence = {};

  const dayPath = `${root}/2026-07-13-DJT6-CYCLE_1-DSP-DayOfOpsPlanLLOL3.xlsx`;
  const day = await parse(context, dayPath, 'morning', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  context.__rows = day.rows;
  vm.runInContext(`globalThis.__dayHeader=findImportHeader(globalThis.__rows,[['route','routecode','cxnumber','cxroute','blockid'],['wave','wavetime','starttime'],['staging','staginglocation']]);`, context);
  assert(context.__dayHeader >= 0 && day.rows.length > 20, 'Real DAYOFOPSPLAN must expose route, wave, and staging rows');
  evidence.dayOfOpsRows = day.rows.length - context.__dayHeader - 1;

  const routesPath = `${root}/Routes_DJT6_2026-07-13_12_42 (PDT).xlsx`;
  const routes = await parse(context, routesPath, 'morning', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  context.__rows = routes.rows;
  vm.runInContext('globalThis.__routeDetails=routeDetailsFromRows(globalThis.__rows)', context);
  assert(Object.keys(context.__routeDetails).length > 20, 'Real Routes_DJT6 must produce CX-to-driver/stop details');
  assert(Object.values(context.__routeDetails).some(value => value.driver && Number.isFinite(value.stops)), 'Routes_DJT6 must retain driver names and numeric stop counts');
  evidence.routeDetails = Object.keys(context.__routeDetails).length;

  const itineraryPath = `${root}/Itineraries_DJT6_2026-07-13_12_43 (PDT).xlsx`;
  const itinerary = await parse(context, itineraryPath, 'itinerary-rts', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  context.__rows = itinerary.rows;
  vm.runInContext('globalThis.__itinerary=itineraryRtsDetailsFromRows(globalThis.__rows)', context);
  assert(Object.keys(context.__itinerary).length > 20, 'Real Itineraries_DJT6 must produce Planned RTS route details');
  assert(context.__itinerary.CX189?.plannedRts === '9:14 PM', `CX189 must select the main-route 9:14 PM RTS, received ${context.__itinerary.CX189?.plannedRts}`);
  evidence.itineraryRoutes = Object.keys(context.__itinerary).length;

  const amazonPath = `${root}/VehiclesData-10.xlsx`;
  const amazon = await parse(context, amazonPath, 'fleet', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  context.__rows = amazon.rows;
  vm.runInContext("globalThis.__amazonFleet=fleetDetailsFromRows(globalThis.__rows,'Amazon fleet list')", context);
  assert(context.__amazonFleet.length >= 50, 'Real VehiclesData workbook must produce the full mixed fleet');
  assert(context.__amazonFleet.some(vehicle => vehicle.operational === 'Grounded'), 'VehiclesData operationalStatus must retain Grounded vehicles');
  assert(context.__amazonFleet.some(vehicle => vehicle.operational === 'Operational'), 'VehiclesData operationalStatus must retain Operational vehicles');
  assert(context.__amazonFleet.some(vehicle => /^1FTYR3|^3C6LRV/.test(vehicle.vin)), 'VehiclesData must include identifiable gas VINs');
  evidence.amazonVehicles = context.__amazonFleet.length;
  evidence.amazonGrounded = context.__amazonFleet.filter(vehicle => vehicle.operational === 'Grounded').length;

  const fleetosPath = `${root}/Vehicle_List-5.csv`;
  const fleetos = await parse(context, fleetosPath, 'fleet', 'text/csv');
  context.__rows = fleetos.rows;
  vm.runInContext("globalThis.__fleetos=fleetDetailsFromRows(globalThis.__rows,'FleetOS tracker')", context);
  assert(context.__fleetos.length >= 50, 'Real Vehicle_List CSV must produce FleetOS VIN rows');
  assert(context.__fleetos.every(vehicle => vehicle.hasBattery), 'Every Vehicle_List row must retain state of charge');
  assert(context.__fleetos.every(vehicle => vehicle.hasMiles), 'Every Vehicle_List row must retain distance to empty');
  evidence.fleetosVehicles = context.__fleetos.length;

  const inspectionsPath = `${root}/Inspections Report_2026-07-13-15-02-13.csv`;
  const inspections = await parse(context, inspectionsPath, 'whiparound', 'text/csv');
  context.__rows = inspections.rows;
  vm.runInContext('globalThis.__inspections=inspectionRecordsFromRows(globalThis.__rows)', context);
  assert(context.__inspections.length > 20, 'Real Whiparound report must produce DVIR records');
  assert(context.__inspections.some(row => row.type === 'pre') && context.__inspections.some(row => row.type === 'post'), 'Whiparound report must retain both Pre-Trip and Post-Trip DVIR forms');
  assert(context.__inspections.every(row => row.date && row.asset && row.driver), 'Whiparound parser must retain the requested date, asset, and driver identity');
  evidence.whiparoundRows = context.__inspections.length;

  const associateCsvPath = `${root}/AssociateData-4`;
  const associateText = fs.readFileSync(associateCsvPath, 'utf8');
  context.__associateRows = vm.runInContext(`parseCSV(${JSON.stringify(associateText)})`, context);
  vm.runInContext('globalThis.__contacts=driverContactsFromRows(globalThis.__associateRows)', context);
  assert(context.__contacts.length > 50, 'Real AssociateData CSV content must produce driver contacts');
  assert(context.__contacts.every(contact => contact.name && contact.phone), 'AssociateData contacts must retain both name and phone');
  evidence.associateContacts = context.__contacts.length;

  console.log(`Historical parser fixtures passed ${JSON.stringify(evidence)}`);
}

run().catch(error => { console.error(error); process.exitCode = 1; });
