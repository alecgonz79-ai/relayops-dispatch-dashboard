const fs = require('fs');
const path = require('path');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) { if (!condition) throw new Error(message); }
function fileObject(filePath, type = '') {
  const bytes = fs.readFileSync(filePath);
  return {
    name: path.basename(filePath), type,
    arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    text: async () => bytes.toString('utf8')
  };
}

const app = { innerHTML: '' }, fileInput = { addEventListener() {}, click() {} }, storage = new Map();
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
  classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
  focus() {}, blur() {}, select() {}, setSelectionRange() {}, click() {}, querySelector() { return null; }, querySelectorAll() { return []; }
});
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
  navigator: { clipboard: { writeText: async () => true } }, window: { scrollTo() {}, open() {} },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key)
  },
  document: {
    body: { appendChild() {} }, activeElement: null,
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelector: () => null, querySelectorAll: () => [], createElement: element,
    addEventListener() {}, removeEventListener() {}
  }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
vm.runInContext('globalThis.__state=state;globalThis.__toasts=[];toast=(message,tone)=>globalThis.__toasts.push({message,tone});render=()=>{};persist=()=>{};', context);
context.state=context.__state;

async function run() {
  const downloads = '/Users/alecgonzo/Downloads';
  const amazonPaths = fs.existsSync(downloads) ? fs.readdirSync(downloads).filter(name => /^VehiclesData(?:-\d+)?\.xlsx$/i.test(name)).sort().map(name => path.join(downloads, name)) : [];
  const fleetosPaths = fs.existsSync(downloads) ? fs.readdirSync(downloads).filter(name => /^Vehicle_List(?:-\d+)?\.csv$/i.test(name)).sort().map(name => path.join(downloads, name)) : [];

  // A dispatcher starting with an empty browser must be able to find and configure the secure connector.
  context.state.fleetLiveEndpoint = '';
  const fleetHtml = context.fleetPage();
  assert(fleetHtml.includes('More fleet tools') && fleetHtml.includes('data-action="fleet-live-setup"') && fleetHtml.includes('Authenticated Fleet proxy'), 'Fresh Fleet Health view must expose the authenticated Fleet proxy action under More fleet tools');
  context.state.fleetAmazonUrl = 'https://fleet.example.test/amazon'; context.state.fleetFleetosUrl = 'https://fleet.example.test/rivian';
  const customPortalHtml = context.fleetPage();
  assert(customPortalHtml.includes('href="https://fleet.example.test/amazon"') && customPortalHtml.includes('href="https://fleet.example.test/rivian"'), 'Saved fleet portal links must drive the visible Fleet Health source actions');
  context.action('fleet-live-setup', {});
  assert(context.state.modal === 'fleet-live-setup' && context.modal().includes('Authenticated proxy / Supabase Edge Function endpoint') && context.modal().includes('private connector URL and token'), 'Secure connector settings action must explain and open the authenticated proxy setup dialog in a fresh browser');
  context.state.modal = null;

  // Source pickers remain narrow; device/parking workflows remain flexible enough for their supported files.
  context.action('fleet-import-amazon', {}); const amazonAccept = fileInput.accept;
  context.action('fleet-import-fleetos', {}); const fleetosAccept = fileInput.accept;
  context.action('equipment-import', {}); context.action('choose-file', {}); const equipmentAccept = fileInput.accept;
  context.action('parking-choose-file', {}); const parkingAccept = fileInput.accept;
  const shellHtml = fs.readFileSync(require.resolve('../index.html'), 'utf8');
  assert(/<input\b[^>]*id="file-input"[^>]*\bmultiple\b/i.test(shellHtml), 'Shared file picker must keep multiple-file selection for split VAN/DEV/PORT screenshots and paired day files');
  assert(amazonAccept.includes('.xlsx') && !amazonAccept.includes('.csv'), 'Amazon Fleet chooser must accept XLSX only');
  assert(fleetosAccept.includes('.csv') && !fleetosAccept.includes('.xlsx'), 'FleetOS chooser must accept CSV only');
  for (const type of ['.csv','.xlsx','.pdf','.txt','image/*']) assert(equipmentAccept.includes(type), `VAN/DEV/PORT chooser lost ${type}`);
  for (const type of ['.csv','.xlsx','.txt','image/*']) assert(parkingAccept.includes(type), `Van Parking chooser lost ${type}`);

  // Always protect the exact source headers even when the local historical corpus is unavailable in CI.
  const representativeAmazon = context.fleetDetailsFromRows([
    ['vin','serviceType','vehicleName','licensePlateNumber','status','operationalStatus'],
    ['7FCEHEB25RN017610','Standard Parcel Electric - Rivian MEDIUM','Temporary name','62429A4','ACTIVE','OPERATIONAL'],
    ['1FTYR3XM2KKB78356','Standard Parcel - Extra Large Van - US','Van 33','00580X2','ACTIVE','OPERATIONAL'],
    ['3C6LRVDG6NE120124','Standard Parcel - Extra Large Van - US','Van 54','60567C4','ACTIVE','GROUNDED']
  ], 'Amazon fleet list');
  const representativeFleetos = context.fleetDetailsFromRows([
    ['VIN','Distance to Empty','Charging Status','State of Charge','Mileage'],
    ['7FCEHEB25RN017610','109 mi','Ready to Charge','69.900002%','32269 mi']
  ], 'FleetOS tracker');
  assert(representativeAmazon[0].name === 'EV53' && representativeAmazon[0].plate === '62429A4', 'EV53 VIN alias and Amazon licensePlateNumber mapping must remain exact');
  assert(representativeAmazon[0].serviceType.includes('Rivian MEDIUM') && representativeAmazon[2].operational === 'Grounded', 'serviceType and operationalStatus mappings must remain exact');
  assert(context.isGasFleetVehicle(representativeAmazon[1]) && context.fleetEquipmentIdentity(representativeAmazon[1]).label === 'F33', '1FTYR3 gas VIN must classify as F33');
  assert(context.isGasFleetVehicle(representativeAmazon[2]) && context.fleetEquipmentIdentity(representativeAmazon[2]).label === 'R54', '3C6LRV gas VIN must classify as R54');
  assert(representativeFleetos[0].battery === 70 && representativeFleetos[0].miles === 109 && representativeFleetos[0].status === 'Ready to Charge', 'FleetOS Distance to Empty, State of Charge, and Charging Status must map correctly');

  if (!amazonPaths.length || !fleetosPaths.length) {
    console.log('Fleet corpus headers passed; local VehiclesData/Vehicle_List files were not present for extended checks');
    return;
  }

  const amazonCorpora = [];
  for (const filePath of amazonPaths) {
    const parsed = await context.parseUploadedFile(fileObject(filePath, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
    const vehicles = context.fleetDetailsFromRows(parsed.rows, 'Amazon fleet list');
    assert(vehicles.length >= 35, `${path.basename(filePath)} should contain a usable Amazon fleet roster`);
    assert(vehicles.some(vehicle => vehicle.serviceType), `${path.basename(filePath)} lost serviceType values`);
    assert(vehicles.some(vehicle => vehicle.plate), `${path.basename(filePath)} lost licensePlateNumber values`);
    assert(vehicles.every(vehicle => ['Operational','Grounded'].includes(vehicle.operational)), `${path.basename(filePath)} lost operationalStatus values`);
    amazonCorpora.push({ filePath, vehicles });
  }
  const fleetosCorpora = [];
  for (const filePath of fleetosPaths) {
    const parsed = await context.parseUploadedFile(fileObject(filePath, 'text/csv'));
    const vehicles = context.fleetDetailsFromRows(parsed.rows, 'FleetOS tracker');
    assert(vehicles.length >= 55, `${path.basename(filePath)} should contain the historical FleetOS roster`);
    assert(vehicles.every(vehicle => Number.isFinite(vehicle.battery) && Number.isFinite(vehicle.miles)), `${path.basename(filePath)} lost battery or Distance to Empty values`);
    assert(vehicles.every(vehicle => vehicle.hasBattery && vehicle.hasMiles), `${path.basename(filePath)} did not mark FleetOS battery/range as verified`);
    fleetosCorpora.push({ filePath, vehicles });
  }

  const amazon = amazonCorpora.find(row => path.basename(row.filePath) === 'VehiclesData.xlsx') || amazonCorpora.at(-1);
  const fleetos = fleetosCorpora.find(row => path.basename(row.filePath) === 'Vehicle_List-5.csv') || fleetosCorpora.at(-1);
  const merged = context.mergeFleetVehicles([...amazon.vehicles, ...fleetos.vehicles]);
  vm.runInContext('rivianFleet.splice(0,rivianFleet.length,...globalThis.__merged)', Object.assign(context, { __merged: merged }));
  const ev53 = merged.find(vehicle => vehicle.vin === '7FCEHEB25RN017610');
  assert(ev53 && context.fleetDisplayName(ev53) === 'EV53' && ev53.plate === '62429A4' && ev53.miles === 109, 'Real Amazon + FleetOS merge lost EV53 alias, plate, or range');
  const grounded = merged.find(vehicle => vehicle.operational === 'Grounded');
  assert(grounded && !context.fleetVehicleAssignmentEligibility(grounded).eligible, 'Real grounded Amazon vehicle must be excluded from auto-assignment');
  const safe = merged.filter(vehicle => context.fleetVehicleAssignmentEligibility(vehicle).eligible && context.isElectricFleetVehicle(vehicle));
  assert(safe.length >= 20, 'Real merged corpus should produce a usable verified-safe EV pool');

  const dayPath=path.join(downloads,'2026-07-13-DJT6-CYCLE_1-DSP-DayOfOpsPlanLLOL3.xlsx');
  const routesPath=path.join(downloads,'Routes_DJT6_2026-07-13_12_42 (PDT).xlsx');
  const itineraryPath=path.join(downloads,'Itineraries_DJT6_2026-07-13_12_43 (PDT).xlsx');
  if(fs.existsSync(dayPath)&&fs.existsSync(routesPath)&&fs.existsSync(itineraryPath)){
    const day=await context.parseUploadedFile(fileObject(dayPath,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
    const routesFile=await context.parseUploadedFile(fileObject(routesPath,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
    const itineraryFile=await context.parseUploadedFile(fileObject(itineraryPath,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
    const routeDetails=context.routeDetailsFromRows(routesFile.rows),itineraryDetails=context.itineraryRtsDetailsFromRows(itineraryFile.rows);
    assert(Object.keys(routeDetails).length>=35&&Object.keys(itineraryDetails).length>=35,'Historical Routes/Itineraries corpus should expose the morning CX roster');
    context.state.dspCode='LLOL';context.state.importedFile={name:path.basename(dayPath),headers:day.rows[0],rows:day.rows.slice(1),routeDetails};
    context.applyImport();
    assert(context.state.morningRoutes.length>=35,'Historical DayOfOpsPlan should build the LLOL Morning Sheet roster');
    context.assignOperationalVehicles();
    const corpusAssigned=context.state.morningRoutes.map(row=>row.ev).filter(Boolean);
    assert(new Set(corpusAssigned).size===corpusAssigned.length&&corpusAssigned.every(id=>context.fleetVehicleAssignmentEligibility(id).eligible),'Historical morning roster assignment repeated or used an unsafe fleet vehicle');
  }

  // Exact VAN/DEV/PORT layout from the supplied Google Sheets screenshots: two three-column blocks.
  const deviceDetails = context.equipmentDetailsFromRows([
    ['VAN','DEVICE','PORTABLE','VAN','DEVICE','PORTABLE'],
    ['EV1','1','2','EV43','43','44'],
    ['EV2','2','3','EV44','44','45'],
    ['EV10','10','-','EV58','58','59'],
    ['F33','71','72','H1','81','82']
  ]);
  assert(deviceDetails['1'].device === '1' && deviceDetails['10'].portable === '-' && deviceDetails['58'].portable === '59' && deviceDetails.F33.device === '71' && deviceDetails.H1.portable === '82', 'VAN/DEV/PORT dual-table parsing or EV/gas/helper matching failed');
  context.state.equipmentImport = { name: 'Historical VAN_DEV_PORT corpus', details: deviceDetails };
  context.state.dspCode = 'LLOL';context.state.morningFilters = { wave:'all', staging:'all', pad:'all' };
  context.state.morningRoutes = [{ routeUid:'device-1',dsp:'LLOL',driver:'Corpus Driver',route:'CX100',wave:'11:15 AM',staging:'STG.V.1',service:'Standard Parcel',ev:'1',deviceName:'',portable:'' }];
  context.inputDeviceSheetToMorning();
  assert(context.state.morningRoutes[0].deviceName === '1' && context.state.morningRoutes[0].portable === '2', 'Device & Portable sheet did not transfer the matching EV assignment to Morning Sheet/Picklist data');

  const safeIds = safe.map(vehicle => context.fleetEquipmentIdentity(vehicle)?.label).filter(Boolean).slice(0, 6);
  assert(safeIds.length >= 5, 'Not enough corpus EV identities for assignment regression');
  const routeRows = () => Array.from({length: safeIds.length + 1}, (_, index) => ({
    routeUid:'corpus-'+index,dsp:'LLOL',driver:'Driver '+index,route:'CX'+(200+index),wave:['11:15 AM','11:20 AM','11:25 AM','11:40 AM','11:45 AM'][Math.min(index,4)],staging:'STG.V.'+(index+1),service:'Standard Parcel',ev:'58',deviceName:'stale',portable:'stale'
  }));
  context.state.morningRoutes = routeRows();
  context.assignOperationalVehicles();
  let assigned = context.state.morningRoutes.map(row => row.ev).filter(Boolean);
  assert(assigned.length === safeIds.length + 1 && new Set(assigned).size === assigned.length, 'Operational assignment must use unique corpus-verified safe EVs');
  assert(assigned.every(id => context.fleetVehicleAssignmentEligibility(id).eligible), 'Operational assignment used an unsafe corpus vehicle');
  context.state.morningRoutes = routeRows();context.assignElectricVehicles('random');
  assigned = context.state.morningRoutes.map(row => row.ev).filter(Boolean);
  assert(new Set(assigned).size === assigned.length && assigned.every(id => context.fleetVehicleAssignmentEligibility(id).eligible), 'Random assignment repeated or used an unsafe corpus vehicle');

  const low = merged.find(vehicle => context.isElectricFleetVehicle(vehicle) && context.knownBatteryPercent(vehicle.battery) < 40);
  const groundedId = context.fleetEquipmentIdentity(grounded)?.label;
  context.state.vanParking = [
    {id:'w1',zone:'west',value:safeIds[0],kind:'spot'},{id:'w2',zone:'west',value:safeIds[1],kind:'spot'},
    {id:'e1',zone:'east',value:safeIds[2],kind:'spot'},{id:'e2',zone:'east',value:groundedId||'',kind:'spot'},
    {id:'n1',zone:'northRight',value:safeIds[3],kind:'spot'},{id:'n2',zone:'northLeft',value:context.fleetEquipmentIdentity(low)?.label||safeIds[4],kind:'spot'},
    {id:'s1',zone:'street',value:safeIds[4],kind:'spot'}
  ];
  context.state.morningRoutes = routeRows();context.assignVansByParking();
  assigned = context.state.morningRoutes.map(row => row.ev).filter(Boolean);
  assert(new Set(assigned).size === assigned.length && assigned.every(id => context.fleetVehicleAssignmentEligibility(id).eligible), 'Parking-order assignment repeated or used grounded/low/unverified corpus vehicles');
  assert(context.state.morningRoutes.some(row => !row.ev), 'Parking assignment should leave a route blank when safe parked vans are exhausted');

  const safeGas = merged.find(vehicle => context.isGasFleetVehicle(vehicle) && context.fleetVehicleAssignmentEligibility(vehicle).eligible);
  const unsafeGas = merged.find(vehicle => context.isGasFleetVehicle(vehicle) && !context.fleetVehicleAssignmentEligibility(vehicle).eligible);
  if (safeGas && unsafeGas) {
    const safeGasId = context.fleetEquipmentIdentity(safeGas).label, unsafeGasId = context.fleetEquipmentIdentity(unsafeGas).label;
    context.state.morningRoutes = routeRows().slice(0,2);context.state.gasAssignmentRoutes = context.state.morningRoutes.map(row=>row.route);context.state.gasAssignmentVans = [safeGasId, unsafeGasId];
    context.applyGasVehicleAssignment();
    assert(context.state.morningRoutes[0].ev === safeGasId && context.state.morningRoutes[1].ev === '', 'Guided gas assignment must skip grounded/inactive/issue-blocked corpus gas vans');
  }

  context.state.vanParkingUpdated='7/14/2026';context.state.chargingStationChecked='7/14/2026';context.state.parkingChargerStatus={'middle-1-left':'green','middle-1-right':'red'};context.state.parkingNotes='Corpus parking check';
  const shared=context.sharedWorkspaceState();
  assert(shared.vanParkingUpdated==='7/14/2026' && shared.chargingStationChecked==='7/14/2026' && shared.parkingChargerStatus['middle-1-left']==='green' && shared.parkingNotes==='Corpus parking check', 'Parking date, charger state, and notes must persist to the shared workspace');

  console.log(`Fleet corpus regression passed: ${amazonPaths.length} VehiclesData XLSX, ${fleetosPaths.length} Vehicle_List CSV, VAN/DEV/PORT layout, safe assignments, and parking persistence`);
}

run().catch(error => { console.error(error); process.exitCode = 1; });
