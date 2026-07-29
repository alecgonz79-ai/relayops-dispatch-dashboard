const fs=require('fs');
const assert=require('assert');
const vm=require('vm');

const app=fs.readFileSync('app.js','utf8');
const cloud=fs.readFileSync('cloud-sync.js','utf8');
const dailySource=app.slice(app.indexOf('function sharedWorkspaceState()'),app.indexOf('function persistentWorkspaceState()'));
const persistentSource=app.slice(app.indexOf('function persistentWorkspaceState()'),app.indexOf('function applySharedWorkspaceState('));

const stationOnly=[
  'fleetImport','fleetSourceUploads','fleetIssues','equipmentIssues','vanParking',
  'equipmentImport','driverContacts','driverProfiles','scheduleStayHomeHistory',
  'inventoryItems','inventoryLog','morningSheetsEndpoint','chargerReports'
];

for(const field of stationOnly){
  assert(!new RegExp(`\\b${field}\\s*:`).test(dailySource),`Daily payload duplicates station field ${field}`);
  assert(new RegExp(`\\b${field}\\s*:`).test(persistentSource),`Persistent payload lost station field ${field}`);
}

assert(cloud.includes('Number(config.pollIntervalMs)||30000'),'Active tabs should use the lower-egress 30 second revision interval');
assert(cloud.includes('Number(config.idlePollIntervalMs)||120000'),'Idle tabs should use the lower-egress 120 second revision interval');
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
assert(!compact.fleetImport&&!compact.driverContacts,'Daily compaction retained duplicate station data');
assert(!compact.__relayopsSync.versions['fleetImport.vehicles']&&!compact.__relayopsSync.tombstones.driverContacts,'Daily compaction retained station-only synchronization metadata');

console.log('Cloud egress budget contracts passed');
