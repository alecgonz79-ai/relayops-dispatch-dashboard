const fs=require('fs');
const assert=require('assert');
const vm=require('vm');

const app=fs.readFileSync('app.js','utf8');
const cloud=fs.readFileSync('cloud-sync.js','utf8');
const dailySource=app.slice(app.indexOf('function sharedWorkspaceState()'),app.indexOf('function persistentWorkspaceState()'));
const persistentSource=app.slice(app.indexOf('function persistentWorkspaceState()'),app.indexOf('function applySharedWorkspaceState('));

const stationOnly=[
  'fleetIssues','equipmentIssues','vanParkingLayout','driverContacts','driverProfiles','scheduleStayHomeHistory',
  'rosteringPlans','rosteringHelperPool','rosteringTrainingMatches','rosteringManualTraining',
  'whiparoundComplianceHistory','whiparoundReminderTemplates','coachingQueue',
  'inventoryItems','inventoryLog','morningSheetsEndpoint','chargerReports'
];

for(const field of stationOnly){
  assert(!new RegExp(`\\b${field}\\s*:`).test(dailySource),`Daily payload duplicates station field ${field}`);
  assert(new RegExp(`\\b${field}\\s*:`).test(persistentSource),`Persistent payload lost station field ${field}`);
}

const dailyImports=['fleetImport','fleetSourceUploads','fleetExpectedCount','fleetLastRefresh','equipmentImport','deviceCustomRows','removedDeviceVehicleIds','vanParking','vanParkingUpdated','chargingStationChecked','vanParkingBatteries','parkingChargerStatus','parkingNotes'];
for(const field of dailyImports){
  assert(new RegExp(`\\b${field}\\s*:`).test(dailySource),`Daily payload lost shared import field ${field}`);
  assert(!new RegExp(`\\b${field}\\s*:`).test(persistentSource),`Permanent payload duplicated daily import field ${field}`);
}

assert(cloud.includes('Number(config.pollIntervalMs)||60000'),'Active tabs should use the guarded 60 second revision interval');
assert(cloud.includes('Number(config.idlePollIntervalMs)||300000'),'Idle tabs should use the guarded 5 minute revision interval');
assert(cloud.includes('Number(config.persistentPollIntervalMs)||600000'),'Permanent station state should be checked at most every 10 minutes by default');
assert(cloud.includes("document.visibilityState==='hidden')return"),'Hidden tabs must queue locally without scheduling network writes');
assert(cloud.includes('CLOUD_DAILY_PAYLOAD_LIMIT')&&cloud.includes('CLOUD_PERSISTENT_PAYLOAD_LIMIT'),'Daily and permanent payloads need hard safety limits');
assert(cloud.includes("select('revision,updated_at,updated_by,operation_date')"),'Polling must continue fetching only lightweight revision metadata');
assert(!cloud.includes(".on('postgres_changes'"),'Realtime row broadcasts would restore high egress and CPU usage');

const context={console,setTimeout,clearTimeout,Date,globalThis:null,location:{href:'https://relayops.test/'},window:{RELAYOPS_CLOUD_CONFIG:{},addEventListener(){}}};
context.globalThis=context;
vm.runInNewContext(cloud,context,{filename:'cloud-sync.js'});
const compact=context.window.RelayOpsCloud.__test.compactDailyPayload({
  morningRoutes:[{route:'CX100'}],
  fleetImport:{vehicles:[{vin:'VIN1'}]},
  driverContacts:[{name:'Driver'}],
  __relayopsSync:{version:1,versions:{'fleetImport.vehicles':{'vin:vin1':'2026-07-28T12:00:00Z'},morningRoutes:{'route:cx100':'2026-07-28T12:00:00Z'}},tombstones:{driverContacts:{'driver:driver':'2026-07-28T12:00:00Z'}}}
});
assert(compact.morningRoutes?.[0]?.route==='CX100','Daily compaction removed operational route data');
assert(compact.fleetImport?.vehicles?.[0]?.vin==='VIN1'&&!compact.driverContacts,'Daily compaction removed a daily import or retained permanent driver data');
assert(compact.__relayopsSync.versions['fleetImport.vehicles']&&!compact.__relayopsSync.tombstones.driverContacts,'Daily compaction removed import synchronization metadata or retained station-only metadata');

console.log('Cloud egress budget contracts passed');
