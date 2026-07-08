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
  if (!fleetHtml.includes('FleetOS + Amazon EV live board') || !fleetHtml.includes('Header status: DEMO') || !fleetHtml.includes('Upload Amazon + FleetOS before trusting EV battery/status') || !fleetHtml.includes('Source timestamps') || !fleetHtml.includes('No upload yet') || !fleetHtml.includes('name / plate / active / grounded') || !fleetHtml.includes('battery % / range miles') || !fleetHtml.includes('Refresh rule') || !fleetHtml.includes('Refresh checks the latest uploaded files') || !fleetHtml.includes('upload fresh exports first') || !fleetHtml.includes('Refresh battery %') || !fleetHtml.includes('Clear upload') || !fleetHtml.includes('Verified EVs') || !fleetHtml.includes('Need charge') || !fleetHtml.includes('Grounded') || !fleetHtml.includes('Missing data') || !fleetHtml.includes('Expected EVs') || !fleetHtml.includes('View: Tiny grid') || !fleetHtml.includes('tiny-view') || !fleetHtml.includes('fleet-card-cue') || !fleetHtml.includes('fleet-source-badges') || !fleetHtml.includes('Amazon —') || !fleetHtml.includes('FleetOS —') || !fleetHtml.includes('A— · F— · click') || !fleetHtml.includes(rivianFleet.length + ' of ' + rivianFleet.length + ' EVs showing') || !fleetHtml.includes('Copy visible VINs') || !fleetHtml.includes('Show all EVs') || !fleetHtml.includes('Tiny grid') || !fleetHtml.includes('Quick Fleet filters') || !fleetHtml.includes('Low battery') || !fleetHtml.includes('data-filter="verified"') || !fleetHtml.includes('data-filter="changed"') || !fleetHtml.includes('Upload both portal lists for a trusted refresh') || !fleetHtml.includes('Next step: Upload today’s Amazon + FleetOS files') || !fleetHtml.includes('Start here: upload both portal exports') || !fleetHtml.includes('EV name, plate, Active/Inactive, Grounded') || !fleetHtml.includes('battery %, miles, charge readiness') || !fleetHtml.includes('matches the same van across both files') || !fleetHtml.includes('Amazon fleet list') || !fleetHtml.includes('FleetOS battery/range') || !fleetHtml.includes('Amazon names the van') || !fleetHtml.includes('FleetOS updates battery') || !fleetHtml.includes('Refresh rebuilds the grid from the latest files you uploaded') || !fleetHtml.includes('Board trust: not 100% yet') || !fleetHtml.includes('Fix with upload') || !fleetHtml.includes('Before dispatch checklist') || !fleetHtml.includes('Amazon fleet list loaded') || !fleetHtml.includes('VINs match both portals') || !fleetHtml.includes('Expected EV count covered') || !fleetHtml.includes('No duplicate VINs') || !fleetHtml.includes('No grounded / low battery surprises') || !fleetHtml.includes('Fix yellow items before trusting this board for launch') || !fleetHtml.includes('Upload/export both lists') || !fleetHtml.includes('Full EV portal check') || !fleetHtml.includes('Simple EV source map') || !fleetHtml.includes('Source field health') || !fleetHtml.includes('Upload Amazon + FleetOS exports to check whether every required column was included') || !fleetHtml.includes('Amazon names/status') || !fleetHtml.includes('FleetOS battery/range') || !fleetHtml.includes('All EVs covered') || !fleetHtml.includes('Use the yellow boxes as your to-do list before dispatch') || !fleetHtml.includes('Full fleet view') || !fleetHtml.includes('Demo/sample view') || !fleetHtml.includes('Accuracy check') || !fleetHtml.includes('Not 100% yet') || !fleetHtml.includes('Missing FleetOS') || !fleetHtml.includes('Missing Amazon') || !fleetHtml.includes('Upload the Amazon fleet list and FleetOS tracker export') || !fleetHtml.includes('logistics.amazon.com/fleet-management/#vehicles') || !fleetHtml.includes('business.rivian.com/vehicles/tracker') || !fleetHtml.includes('Green') || !fleetHtml.includes('VIN matched both portals') || !fleetHtml.includes('EDV-014816') || !fleetHtml.includes('7FCEHEB79PN014816') || !fleetHtml.includes('98 mi / 63%')) throw new Error('FleetOS/Amazon EV board missing');
  if (!fleetHtml.includes('Portal row-count check') || !fleetHtml.includes('Upload both portal exports to compare row counts') || !fleetHtml.includes('Amazon rows') || !fleetHtml.includes('FleetOS rows') || !fleetHtml.includes('matched rows')) throw new Error('Fleet row-count check missing');
  if (!fleetHtml.includes('Dispatcher proof: WAIT before trusting board') || !fleetHtml.includes('Amazon official names') || !fleetHtml.includes('FleetOS battery rows') || !fleetHtml.includes('VIN match proof') || !fleetHtml.includes('Full roster count') || !fleetHtml.includes('Clean data check')) throw new Error('Fleet dispatcher proof strip missing');
  if (!fleetHtml.includes('Live connector not connected yet') || !fleetHtml.includes('Set endpoint') || !fleetHtml.includes('Refresh will call the secure backend first') && fleetHtml.includes('Live connector ready')) throw new Error('Fleet live connector setup strip missing');
  state.fleetLiveEndpoint = 'https://relayops.example.com/api/fleet/live';
  if (!fleetLiveConnectorStrip().includes('Live connector ready') || !fleetLiveConnectorStrip().includes('Live refresh') || fleetLiveEndpoint() !== 'https://relayops.example.com/api/fleet/live') throw new Error('Fleet live connector endpoint state failed');
  const liveRows = liveFleetVehiclesFromPayload({ amazon:[{vehicleName:'LLOL EV 21',vin:'7FCEHEB79PN014816',licensePlate:'9ABC123',active:'Active',operationalStatus:'Operational'}], fleetos:[{vin:'7FCEHEB79PN014816',batteryPercent:63,rangeMiles:98,status:'Connected'}] });
  if (liveRows.length !== 2 || liveRows[0].source !== 'Amazon fleet list' || liveRows[1].source !== 'FleetOS tracker' || liveRows[0].name !== 'LLOL EV 21' || liveRows[1].battery !== 63 || !liveRows[0].hasName || !liveRows[1].hasBattery) throw new Error('Fleet live connector payload normalization failed');
  state.fleetLiveEndpoint = '';
  state.fleetView = 'detail';
  if (!fleetPage().includes('detail-view') || !fleetPage().includes('View: Detail grid')) throw new Error('Fleet detail grid view missing');
  state.fleetView = 'tiny';
  if (fleetHtml.includes('Assigned today')) throw new Error('Fleet page should only show the compact FleetOS/Amazon EV grid');
  if (!fleetAttentionStrip().includes('data-filter="low"') || !fleetAttentionStrip().includes('data-filter="grounded"') || !fleetAttentionStrip().includes('data-filter="needs-data"') || !fleetAttentionStrip().includes('copy-fleet-attention') || !fleetAttentionStrip().includes('Copy alerts')) throw new Error('Fleet attention strip missing quick filters');
  if (!fleetAttentionText().includes('EDV-000688') || !fleetAttentionText().includes('grounded') || !fleetAttentionText().includes('battery 18%')) throw new Error('Fleet attention copy text should include low/grounded EV details');
  if (fleetRecentChangesStrip() !== '') throw new Error('Fleet recent changes strip should stay hidden until an upload changes EVs');
  const startingCoverage = fleetCoverageStats();
  if (startingCoverage.demo !== rivianFleet.length || startingCoverage.needsData !== rivianFleet.length) throw new Error('Fleet coverage counters should flag demo data');
  const noUploadBattery = rivianFleet.find(v => v.vin === '7FCEHEB79PN014816').battery;
  refreshFleetStatus();
  if (rivianFleet.find(v => v.vin === '7FCEHEB79PN014816').battery !== noUploadBattery || state.modal !== 'fleet-import') throw new Error('Fleet refresh should require a real upload before changing battery data');
  state.modal = null;
  const amazonOnlyAuditRows = fleetDetailsFromRows([
    ['Vehicle Name','VIN','License Plate','Active','Operational Status'],
    ['LLOL EV Missing','7FCTGAAA1PN111111','9MISS1','Active','Operational']
  ],'amazon fleet list.csv');
  state.fleetImport = { name: 'amazon fleet list.csv', vehicles: amazonOnlyAuditRows, uploadedAt: '2026-07-05T12:00:00.000Z' };
  if (!fleetGapAuditStrip().includes('Missing VIN audit') || !fleetGapAuditStrip().includes('gap-priority high') || !fleetGapAuditStrip().includes('Missing FleetOS battery/range') || !fleetGapAuditStrip().includes('Amazon-only VINs need FleetOS tracker battery/range rows') || !fleetGapAuditStrip().includes('Download gap CSV')) throw new Error('Fleet missing VIN audit should show source gaps before dispatch');
  resetFleetDemo();
  state.expandedFleetVin = '7FCEHEB79PN014816';
  const expandedFleetHtml = fleetPage();
  if (!expandedFleetHtml.includes('rivian-id-summary') || !expandedFleetHtml.includes('Battery source') || !expandedFleetHtml.includes('8HJK214') || !expandedFleetHtml.includes('Operational') || !expandedFleetHtml.includes('Demo') || !expandedFleetHtml.includes('Demo name') || !expandedFleetHtml.includes('Name source') || !expandedFleetHtml.includes('Needs attention') || !expandedFleetHtml.includes('Dispatch check') || !expandedFleetHtml.includes('Needs: real upload') || !expandedFleetHtml.includes('Battery demo only') || !expandedFleetHtml.includes('Tap to collapse')) throw new Error('Expandable FleetOS/Amazon EV details missing');
  state.fleetSort = 'battery-low';
  const sortedFleet = sortedRivianFleet();
  if (sortedFleet[0].battery !== 18 || batteryTone(18) !== 'critical' || batteryTone(92) !== 'high') throw new Error('Rivian battery sorting or color tone failed');
  state.expandedFleetVin = '';
  const compactFleetHtml = fleetPage();
  if (!compactFleetHtml.includes('Tap for plate/status')) throw new Error('Compact EV cards should show tap-for-details cue');
  if (!compactFleetHtml.includes('hard-status-pill grounded') || !compactFleetHtml.includes('hard-status-pill inactive') || !compactFleetHtml.includes('hard-status')) throw new Error('Grounded/inactive EV cards should stay obvious in compact view');
  const amazonFleetRows = [
    ['Vehicle Name','VIN','License Plate','Active','Operational Status'],
    ['LLOL EV 21','7FCEHEB79PN014816','9ABC123','Inactive','Grounded']
  ];
  const fleetOsRows = [
    ['VIN','State of Charge','Estimated Range'],
    ['7FCEHEB79PN014816','41%','64 mi']
  ];
  const mergedFleet = [...fleetDetailsFromRows(amazonFleetRows,'amazon fleet list.csv'),...fleetDetailsFromRows(fleetOsRows,'FleetOS tracker.xlsx')];
  if (mergedFleet.length !== 2 || mergedFleet[0].name !== 'LLOL EV 21' || mergedFleet[1].battery !== 41) throw new Error('FleetOS/Amazon fleet row parsing failed');
  state.fleetImport = { name: 'amazon fleet list.csv + FleetOS tracker.xlsx', vehicles: mergedFleet, uploadedAt: '2026-07-05T12:34:00.000Z' };
  state.fleetRefreshPreview = fleetRefreshPreviewFromVehicles(mergedFleet); state.modal = 'fleet-refresh';
  if (!state.fleetRefreshPreview.batteryChanges?.length || !modal().includes('Battery changes to review') || !modal().includes('63%') || !modal().includes('41%') || !modal().includes('98 mi') || !modal().includes('64 mi')) throw new Error('Fleet refresh preview should show old to new EV battery/range changes');
  if (!state.fleetRefreshPreview.statusChanges?.length || !modal().includes('Amazon status changes to review') || !modal().includes('Active: Active → Inactive') || !modal().includes('Status: Operational → Grounded') || !modal().includes('Plate: 8HJK214 → 9ABC123')) throw new Error('Fleet refresh preview should show old to new Amazon name/status changes');
  state.modal = null;
  applyFleetVehicles(mergedFleet,{silent:true});
  const matchedFleetStats = fleetPortalMatchStats();
  if (!fleetChangeSourceLabels(['name','battery']).join('|').includes('Amazon: name') || !fleetChangeSourceLabels(['name','battery']).join('|').includes('FleetOS: battery') || !fleetRecentChangesStrip().includes('Amazon:') || !fleetRecentChangesStrip().includes('FleetOS:')) throw new Error('Fleet refresh changes should be grouped by Amazon vs FleetOS source');
  if (state.fleetUpdateSummary.duplicates !== 0 || matchedFleetStats.uniqueVins.size !== 1 || matchedFleetStats.amazon.size !== 1 || matchedFleetStats.fleetos.size !== 1 || matchedFleetStats.both.length !== 1 || matchedFleetStats.amazonOnly.length || matchedFleetStats.fleetosOnly.length || !fleetPortalMatchStrip().includes('unique VINs accounted') || !fleetPortalMatchStrip().includes('matched both') || !fleetPortalMatchStrip().includes('portal-coverage-meter') || !fleetPortalMatchStrip().includes('100% matched both uploads') || !fleetRowCountCheckStrip().includes('Row counts line up') || !fleetRowCountCheckStrip().includes('100% matched by VIN') || !fleetTrustStrip().includes('Board trust: verified') || fleetGapAuditStrip() !== '') throw new Error('FleetOS/Amazon matched VINs should reconcile without duplicate warnings');
  state.fleetExpectedCount = 2;
  if (!fleetPortalMatchStrip().includes('1 short of expected 2') || !fleetPortalMatchStrip().includes('50% of expected EV count loaded') || !fleetRowCountCheckStrip().includes('1 EV short of expected') || !fleetosRosterCoverageStrip().includes('FleetOS battery roster coverage') || !fleetosRosterCoverageStrip().includes('1/2 EVs have battery/range rows') || !fleetosRosterCoverageStrip().includes('1</b>missing battery rows')) throw new Error('Fleet expected count short warning missing');
  if (!fleetDispatchChecklist().includes('Expected EV count covered') || !fleetDispatchChecklist().includes('1/2 portal VINs loaded')) throw new Error('Fleet dispatch checklist should warn when expected EV count is short');
  state.fleetExpectedCount = 1;
  if (!fleetPortalMatchStrip().includes('complete vs expected 1')) throw new Error('Fleet expected count complete warning missing');
  if (!fleetDispatchChecklist().includes('1/1 portal VINs loaded')) throw new Error('Fleet dispatch checklist should show expected EV count coverage');
  if (!fleetosRosterCoverageStrip().includes('FleetOS battery rows cover the full expected EV roster') || !fleetosRosterCoverageStrip().includes('1/1 EVs have battery/range rows')) throw new Error('FleetOS roster coverage should confirm full battery coverage');
  rivianFleet[0].active = 'Active';
  rivianFleet[0].operational = 'Operational';
  rivianFleet[0].battery = 64;
  if (!fleetNextStepBox().includes('Ready — review refresh before launch') || !fleetNextStepBox().includes('Review refresh')) throw new Error('Fleet next-step box should send fully matched boards to refresh review');
  rivianFleet[0].battery = 41;
  rivianFleet[0].miles = 64;
  state.expandedFleetVin = rivianFleet[0].vin;
  if (!fleetPage().includes('Watch charge') || !fleetPage().includes('battery under 50%')) throw new Error('Verified EVs under 50% should show a simple watch-charge label');
  state.fleetExpectedCount = 0;
  resetFleetDemo();
  state.fleetExpectedCount = 9;
  resetFleetDemo();
  if (state.fleetExpectedCount !== 0) throw new Error('Fleet clear upload should reset expected EV count');
  const messyFleetRows = [
    ['Asset ID','Vehicle Identification Number','Registration Number','Availability Status','Grounding Status','State of Charge %','Estimated Range (mi)'],
    ['LLOL EV 34','7FCTGAAA9PN999999','9MESSY9','Enabled','Out of Service','72%','113 mi']
  ];
  const messyFleet = fleetDetailsFromRows(messyFleetRows,'FleetOS tracker.xlsx');
  if (messyFleet.length !== 1 || messyFleet[0].name !== 'LLOL EV 34' || messyFleet[0].plate !== '9MESSY9' || messyFleet[0].active !== 'Active' || messyFleet[0].operational !== 'Grounded' || messyFleet[0].battery !== 72 || messyFleet[0].miles !== 113) throw new Error('Fleet export alias headers failed');
  const alternateFleetRows = [
    ['Asset Name','VIN #','Plate #','Lifecycle State','Operational State','SOC %','Range (mi)'],
    ['LLOL EV 55','7FCTGAAA1PN555555','9ALT555','Active','Operational','81%','126 mi']
  ];
  const alternateFleet = fleetDetailsFromRows(alternateFleetRows,'manual fleet export.csv');
  if (alternateFleet.length !== 1 || alternateFleet[0].name !== 'LLOL EV 55' || alternateFleet[0].plate !== '9ALT555' || alternateFleet[0].active !== 'Active' || alternateFleet[0].operational !== 'Operational' || alternateFleet[0].battery !== 81 || alternateFleet[0].miles !== 126) throw new Error('Fleet alternate export headers failed');
  const currentBattery = rivianFleet.find(v => v.vin === '7FCEHEB79PN014816').battery;
  applyFleetVehicles(fleetDetailsFromRows(amazonFleetRows,'amazon fleet list.csv'),{silent:true});
  const amazonOnlyVehicle = rivianFleet.find(v => v.vin === '7FCEHEB79PN014816');
  if (amazonOnlyVehicle.battery !== currentBattery || !fleetPage().includes('Amazon only') || !fleetPage().includes('Amazon official') || !fleetPage().includes('Amazon name verified') || !fleetPage().includes('Needs: FleetOS battery') || !fleetPage().includes('Updated') || !fleetPage().includes('Changed by source') || !fleetPage().includes('Amazon: name, plate, active status, operational state')) throw new Error('Amazon fleet import should preserve battery and flag status changes');
  if (!fleetNextStepBox().includes('Upload FleetOS battery tracker next') || !fleetNextStepBox().includes('Add FleetOS so every VIN gets battery')) throw new Error('Amazon-only fleet next step should request FleetOS upload');
  if (!fleetSourceStatus().hasAmazon || fleetSourceStatus().hasFleetos) throw new Error('Fleet source status should detect Amazon-only import');
  if (rivianFleet.length !== 1 || fleetCoverageStats().demo !== 0 || !fleetPage().includes('not in upload')) throw new Error('Real fleet import should replace demo-only EV rows');
  resetFleetDemo();
  let combinedSourceVehicles = rememberFleetSourceUpload(fleetDetailsFromRows(amazonFleetRows,'amazon fleet list.csv'),'amazon fleet list.csv','2026-07-05T12:00:00.000Z');
  if (state.fleetExpectedCount !== 1 || !fleetFullListStrip().includes('expected EVs from Amazon')) throw new Error('Amazon fleet upload should set expected EV count from official VIN list');
  applyFleetVehicles(combinedSourceVehicles,{silent:true});
  const fleetOsFreshRows = [
    ['VIN','State of Charge','Estimated Range'],
    ['7FCEHEB79PN014816','38%','59 mi']
  ];
  combinedSourceVehicles = rememberFleetSourceUpload(fleetDetailsFromRows(fleetOsFreshRows,'FleetOS tracker.xlsx'),'FleetOS tracker.xlsx','2026-07-05T12:10:00.000Z');
  applyFleetVehicles(combinedSourceVehicles,{silent:true});
  const sourceMemoryEv = rivianFleet.find(v => v.vin === '7FCEHEB79PN014816');
  const sourceMemoryStats = fleetPortalMatchStats();
  if (!sourceMemoryEv.hasName || !sourceMemoryEv.hasPlate || !sourceMemoryEv.hasActive || !sourceMemoryEv.hasOperational || !sourceMemoryEv.hasBattery || !sourceMemoryEv.hasMiles || fleetMissingFields(sourceMemoryEv).length) throw new Error('Merged Fleet card should preserve proven Amazon and FleetOS field flags');
  if (state.fleetImport.vehicles.length !== 2 || sourceMemoryEv.name !== 'LLOL EV 21' || sourceMemoryEv.plate !== '9ABC123' || sourceMemoryEv.battery !== 38 || !fleetSourceStatus().hasAmazon || !fleetSourceStatus().hasFleetos || sourceMemoryStats.uniqueVins.size !== 1 || sourceMemoryStats.both.length !== 1 || fleetSourceUploadedAt('amazon','iso') !== '2026-07-05T12:00:00.000Z' || fleetSourceUploadedAt('fleetos','iso') !== '2026-07-05T12:10:00.000Z' || fleetSourceAge('fleetos',new Date('2026-07-05T14:40:00.000Z')).label !== '2h 30m old' || !fleetSourceAge('fleetos',new Date('2026-07-05T14:40:00.000Z')).stale || !fleetHeaderRefreshGuide().includes('Refresh is ready to compare both portals') || !fleetRefreshReadinessStrip().includes('Refresh readiness') || (!fleetRefreshReadinessStrip().includes('Fresh') && !fleetRefreshReadinessStrip().includes('Stale')) || !fleetRefreshReadinessStrip().includes('Saved upload freshness') || !fleetRefreshReadinessStrip().includes('Amazon Jul 5') || !fleetRefreshReadinessStrip().includes('FleetOS Jul 5') || !fleetRefreshReadinessStrip().includes('Review refresh') || !fleetRefreshReadinessStrip().includes('name + plate + active/grounded') || !fleetRefreshReadinessStrip().includes('battery % + range') || !fleetRefreshReadinessStrip().includes('match key')) throw new Error('Separate Amazon and FleetOS uploads should combine by VIN and preserve latest source data');
  resetFleetDemo();
  state.fleetImport = { name: 'amazon fleet list.csv + FleetOS tracker.xlsx', vehicles: mergedFleet, uploadedAt: '2026-07-05T12:34:00.000Z' };
  applyFleetVehicles(mergedFleet,{silent:true});
  state.expandedFleetVin = '7FCEHEB79PN014816';
  const importedFleetHtml = fleetPage();
  if (!importedFleetHtml.includes('LLOL EV 21') || !importedFleetHtml.includes('9ABC123') || !importedFleetHtml.includes('41%') || !importedFleetHtml.includes('Verified') || !importedFleetHtml.includes('Header status: VERIFIED') || !importedFleetHtml.includes('EVs matched by VIN') || !importedFleetHtml.includes('Source timestamps') || !importedFleetHtml.includes('loaded') || !importedFleetHtml.includes('Needs attention') || !importedFleetHtml.includes('inactive') || !importedFleetHtml.includes('Amazon official') || !importedFleetHtml.includes('Amazon name verified') || !importedFleetHtml.includes('Official name from Amazon fleet list') || !importedFleetHtml.includes('Dispatcher proof: SAFE to review refresh') || !importedFleetHtml.includes('Every EV appears named by Amazon') || !importedFleetHtml.includes('Source field health') || !importedFleetHtml.includes('Every uploaded EV row has the required Amazon/FleetOS fields') || !importedFleetHtml.includes('Vehicle Name') || !importedFleetHtml.includes('Range Miles') || !importedFleetHtml.includes('Full source view is ready') || !importedFleetHtml.includes('Accuracy check passed') || !importedFleetHtml.includes('Dispatch-ready') || !importedFleetHtml.includes('Refresh full list') || importedFleetHtml.includes('Needs: FleetOS battery') || !importedFleetHtml.includes('Changed by source') || !importedFleetHtml.includes('Amazon:') || !importedFleetHtml.includes('FleetOS: battery, range') || !importedFleetHtml.includes('rows read') || !importedFleetHtml.includes('duplicate VINs') || !importedFleetHtml.includes('EV CSV') || !importedFleetHtml.includes('Gap CSV') || !importedFleetHtml.includes('Upload / paste fleet list') || !importedFleetHtml.includes('EV changed after upload') || !importedFleetHtml.includes('Show changed only')) throw new Error('FleetOS/Amazon fleet import did not update cards');
  action('fleet-filter-quick',{dataset:{filter:'changed'}});
  if (state.fleetFilter !== 'changed' || !fleetPage().includes('Changed only') || !sortedRivianFleet().length || sortedRivianFleet().some(v => !(state.fleetChangedVins?.[v.vin] || v.changedFields || []).length)) throw new Error('Fleet recent changes quick filter failed');
  state.fleetFilter = 'all';
  const staleAge = fleetUploadAge(new Date('2026-07-05T15:00:00.000Z'));
  if (!staleAge.stale || staleAge.label !== '2h 26m old') throw new Error('Fleet upload age warning calculation failed');
  state.fleetImport.uploadedAt = new Date(Date.now() - 130 * 60000).toISOString();
  if (!fleetPage().includes('Battery data may be stale')) throw new Error('Fleet page should warn when upload is stale');
  const stalePreview = fleetRefreshPreviewFromVehicles(state.fleetImport.vehicles);
  if (!stalePreview.blockers.some(x => x.includes('Saved fleet upload') && x.includes('fresh Amazon/FleetOS exports'))) throw new Error('Fleet refresh should block stale saved portal uploads');
  state.fleetImport.uploadedAt = new Date().toISOString();
  if (fleetUploadAge().stale || fleetPage().includes('Battery data may be stale')) throw new Error('Fresh fleet upload should not show stale warning');
  if (!fleetSourceStatus().hasAmazon || !fleetSourceStatus().hasFleetos) throw new Error('Fleet source status should detect combined Amazon + FleetOS import');
  state.expandedFleetVin = '7FCEHEB79PN014816';
  if (!fleetPage().includes('rivian-id-summary') || !fleetPage().includes('Last change') || !fleetPage().includes('Amazon uploaded') || !fleetPage().includes('FleetOS uploaded') || !fleetPage().includes('VIN source audit') || !fleetPage().includes('VIN matched both portals') || !fleetPage().includes('✓ Amazon row found') || !fleetPage().includes('✓ FleetOS row found') || !fleetPage().includes('Battery check') || (!fleetPage().includes('Battery fresh') && !fleetPage().includes('Battery stale') && !fleetPage().includes('Battery source missing')) || !fleetPage().includes('Changed</b>') || !fleetPage().includes('FleetOS: battery, range')) throw new Error('Fleet expanded card should show change audit details');
  if (!fleetCoverageStats().verified) throw new Error('Fleet coverage counters should show verified EVs after Amazon + FleetOS import');
  const fleetRows = fleetExportRows();
  const exportedEv = fleetRows.find(row => row[1] === '7FCEHEB79PN014816');
  if (!exportedEv || exportedEv[0] !== 'LLOL EV 21' || !String(exportedEv[7]).startsWith('Battery') || exportedEv[8] !== 'Verified' || exportedEv[9] !== 'VIN matched both portals' || exportedEv[10] !== '✓ Amazon row found' || exportedEv[11] !== '✓ FleetOS row found' || exportedEv[12] !== '' || !exportedEv[14] || !exportedEv[15] || !exportedEv[16] || !exportedEv[17].includes('Amazon fleet list')) throw new Error('Fleet CSV export rows missing verified EV data');
  const duplicateFleetRows = [
    ['Vehicle Name','VIN','License Plate','Active','Operational Status'],
    ['LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational'],
    ['LLOL EV 21 duplicate','7FCEHEB79PN014816','9ABC123','Active','Operational']
  ];
  applyFleetVehicles(fleetDetailsFromRows(duplicateFleetRows,'amazon fleet list.csv'),{silent:true});
  if (state.fleetUpdateSummary.duplicates !== 1 || state.fleetUpdateSummary.conflicts !== 1 || !state.fleetUpdateSummary.duplicateVins.includes('7FCEHEB79PN014816') || !state.fleetUpdateSummary.conflictRows.some(x => x.vin === '7FCEHEB79PN014816' && x.field === 'Name') || !fleetPage().includes('duplicate VINs') || !fleetPage().includes('field conflicts') || !fleetTrustStrip().includes('1 duplicate VIN in upload') || !fleetTrustStrip().includes('1 conflicting field in upload') || !fleetDispatchChecklist().includes('No duplicate VINs') || !fleetDispatchChecklist().includes('1 duplicate VIN') || !fleetDispatchChecklist().includes('No conflicting VIN data') || !fleetAccuracyGate().includes('1 duplicate VIN') || !fleetAccuracyGate().includes('1 field conflict') || !fleetPage().includes('7FCEHEB79PN014816') || !fleetGapRows().some(row => row[0] === 'HIGH' && row[1] === 'Duplicate VIN in upload' && row[2] === '7FCEHEB79PN014816') || !fleetGapRows().some(row => row[0] === 'HIGH' && row[1] === 'Conflicting Name' && row[2] === '7FCEHEB79PN014816')) throw new Error('Fleet duplicate/conflicting VIN warning failed');
  const duplicatePreview = fleetRefreshPreviewFromVehicles(fleetDetailsFromRows(duplicateFleetRows,'amazon fleet list.csv'));
  state.fleetRefreshPreview = duplicatePreview; state.modal = 'fleet-refresh';
  if (!duplicatePreview.blockers.some(x => x.includes('duplicate VIN')) || !duplicatePreview.blockers.some(x => x.includes('conflicting field')) || duplicatePreview.duplicates !== 1 || duplicatePreview.conflicts !== 1 || !modal().includes('Duplicate VINs in upload') || !modal().includes('Conflicting portal values') || !modal().includes('LLOL EV 21 vs LLOL EV 21 duplicate') || !modal().includes('7FCEHEB79PN014816')) throw new Error('Fleet refresh preview should block duplicate/conflicting VIN approval');
  applyFleetVehicles(mergedFleet,{silent:true});
  state.fleetFilter = 'grounded';
  if (!fleetPage().includes('LLOL EV 21') || sortedRivianFleet().some(v => v.operational !== 'Grounded')) throw new Error('Grounded fleet filter failed');
  action('fleet-filter-quick',{dataset:{filter:'low'}});
  if (state.fleetFilter !== 'low' || sortedRivianFleet().some(v => v.battery >= 40)) throw new Error('Fleet attention strip quick filter failed');
  state.fleetFilter = 'verified';
  if (!fleetPage().includes('Verified only') || !sortedRivianFleet().every(v => fleetConfidence(v).label === 'Verified')) throw new Error('Verified fleet filter failed');
  state.fleetFilter = 'needs-data';
  if (!fleetPage().includes('Needs data') || !sortedRivianFleet().every(v => fleetMissingFields(v).length > 0)) throw new Error('Needs-data fleet filter failed');
  resetFleetDemo();
  applyFleetVehicles(fleetDetailsFromRows(amazonFleetRows,'amazon fleet list.csv'),{silent:true});
  rememberFleetSourceUpload(fleetDetailsFromRows(amazonFleetRows,'amazon fleet list.csv'),'amazon fleet list.csv','2026-07-05T12:00:00.000Z');
  state.fleetExpectedCount = 2;
  const gapRows = fleetGapRows();
  if (!gapRows.some(row => row[0] === 'HIGH' && row[1] === 'Missing FleetOS battery/range' && row[2] === '7FCEHEB79PN014816' && row[9] === 'Amazon only — battery needs FleetOS' && row[10] === 2 && row[11] === '2026-07-05T12:00:00.000Z') || !gapRows.some(row => row[0] === 'MED' && row[1] === 'Expected EV count short' && row[9] === 'Expected count from Amazon fleet list')) throw new Error('Fleet gap rows should include missing FleetOS and expected count shortage');
  if (!fleetosRosterCoverageStrip().includes('Download missing battery CSV') || !fleetosRosterCoverageStrip().includes('Copy missing VINs') || !fleetosRosterCoverageStrip().includes('export-fleetos-missing') || !fleetosRosterCoverageStrip().includes('copy-fleetos-missing')) throw new Error('FleetOS coverage strip should offer focused missing-battery actions');
  let capturedGapCsv = null;
  downloadBlob = (data,type,name) => { capturedGapCsv = { data, type, name }; };
  exportFleetGapsCSV();
  if (!capturedGapCsv || capturedGapCsv.name !== 'relayops-ev-source-gaps.csv' || !capturedGapCsv.data.includes('Priority,Issue,VIN') || !capturedGapCsv.data.includes('VIN Source Audit') || !capturedGapCsv.data.includes('Amazon Uploaded At') || !capturedGapCsv.data.includes('FleetOS Uploaded At') || !capturedGapCsv.data.includes('HIGH,Missing FleetOS battery/range') || !capturedGapCsv.data.includes('MED,Expected EV count short')) throw new Error('Fleet gap CSV export failed');
  let capturedMissingFleetosCsv = null;
  downloadBlob = (data,type,name) => { capturedMissingFleetosCsv = { data, type, name }; };
  exportMissingFleetosCSV();
  if (!capturedMissingFleetosCsv || capturedMissingFleetosCsv.name !== 'relayops-missing-fleetos-battery.csv' || !capturedMissingFleetosCsv.data.includes('VIN,Vehicle Name,License Plate') || !capturedMissingFleetosCsv.data.includes('7FCEHEB79PN014816') || !capturedMissingFleetosCsv.data.includes('Upload FleetOS tracker row for this VIN')) throw new Error('Focused missing FleetOS CSV export failed');
  if (missingFleetosVinText() !== '7FCEHEB79PN014816') throw new Error('Focused missing FleetOS VIN copy text failed');
  state.fleetExpectedCount = 0;
  state.fleetFilter = 'amazon-only';
  if (!fleetPage().includes('Amazon only') || !fleetPage().includes('Upload missing source') || !fleetPage().includes('Partial source view') || !fleetPage().includes('Not uploaded yet') || !fleetPage().includes('Review missing FleetOS') || !fleetPage().includes('Copy FleetOS VINs') || !sortedRivianFleet().length || sortedRivianFleet().some(v => fleetConfidence(v).label !== 'Amazon only')) throw new Error('Amazon-only fleet filter failed');
  action('fleet-filter-quick',{dataset:{filter:'missing-fleetos'}});
  if (state.fleetFilter !== 'missing-fleetos' || !sortedRivianFleet().length || sortedRivianFleet().some(v => fleetConfidence(v).label !== 'Amazon only')) throw new Error('Missing-FleetOS quick filter failed');
  if (visibleFleetVinText() !== '7FCEHEB79PN014816') throw new Error('Visible Fleet VIN copy text should follow active filter');
  resetFleetDemo();
  applyFleetVehicles(fleetDetailsFromRows(fleetOsRows,'FleetOS tracker.xlsx'),{silent:true});
  state.fleetFilter = 'fleetos-only';
  state.fleetImport = { name: 'FleetOS tracker.xlsx', vehicles: fleetDetailsFromRows(fleetOsRows,'FleetOS tracker.xlsx'), uploadedAt: new Date().toISOString() };
  if (!fleetPage().includes('FleetOS only') || !fleetPage().includes('Needs Amazon') || !fleetPage().includes('missing Amazon') || !fleetPage().includes('Amazon name lock') || !fleetPage().includes('using VIN-only names') || !fleetPage().includes('Do not rename them manually') || !fleetPage().includes('temporary VIN name') || !fleetPage().includes('FleetOS roster view is showing') || !fleetPage().includes('FleetOS EV count') || !fleetPage().includes('Need Amazon') || !fleetPage().includes('FleetOS-only VINs need Amazon fleet-list name/status rows') || !fleetPage().includes('Review missing Amazon') || !fleetPage().includes('Copy Amazon VINs') || !fleetPage().includes('Download missing Amazon CSV') || missingAmazonVinText() !== '7FCEHEB79PN014816' || !sortedRivianFleet().length || sortedRivianFleet().some(v => fleetConfidence(v).label !== 'FleetOS only')) throw new Error('FleetOS-only fleet filter failed');
  let capturedMissingAmazonCsv = null;
  downloadBlob = (data,type,name) => { capturedMissingAmazonCsv = { data, type, name }; };
  exportMissingAmazonCSV();
  if (!capturedMissingAmazonCsv || capturedMissingAmazonCsv.name !== 'relayops-missing-amazon-name-status.csv' || !capturedMissingAmazonCsv.data.includes('VIN,Temporary Name,Battery %') || !capturedMissingAmazonCsv.data.includes('7FCEHEB79PN014816') || !capturedMissingAmazonCsv.data.includes('Upload Amazon fleet-list row for this VIN')) throw new Error('Focused missing Amazon CSV export failed');
  resetFleetDemo();
  applyFleetVehicles(messyFleet,{silent:true});
  if (rivianFleet[0].name === 'LLOL EV 34' || rivianFleet[0].name !== '7FCTGAAA9PN999999' || fleetPage().includes('<h3>LLOL EV 34</h3>')) throw new Error('FleetOS-only names should not replace official Amazon fleet names');
  resetFleetDemo();
  applyFleetVehicles(fleetDetailsFromRows(fleetOsRows,'FleetOS tracker.xlsx'),{silent:true});
  const fleetOsOnlyExistingDemoVin = rivianFleet.find(v => v.vin === '7FCEHEB79PN014816');
  if (!fleetOsOnlyExistingDemoVin || fleetOsOnlyExistingDemoVin.name !== '7FCEHEB79PN014816' || fleetPage().includes('<h3>EDV-014816</h3>')) throw new Error('FleetOS-only rows should not keep demo names for existing VINs');
  action('fleet-filter-quick',{dataset:{filter:'missing-amazon'}});
  if (state.fleetFilter !== 'missing-amazon' || !sortedRivianFleet().length || sortedRivianFleet().some(v => fleetConfidence(v).label !== 'FleetOS only')) throw new Error('Missing-Amazon quick filter failed');
  resetFleetDemo();
  state.fleetFilter = 'demo-only';
  if (!fleetPage().includes('Demo only') || !sortedRivianFleet().length || sortedRivianFleet().some(v => fleetConfidence(v).label !== 'Demo')) throw new Error('Demo-only fleet filter failed');
  applyFleetVehicles(mergedFleet,{silent:true});
  state.fleetFilter = 'all';
  state.modal = 'fleet-import';
  const fleetImportHtml = modal();
  if (!fleetImportHtml.includes('Amazon fleet list') || !fleetImportHtml.includes('FleetOS tracker') || !fleetImportHtml.includes('Use this for the official van name') || !fleetImportHtml.includes('Use this for battery accuracy') || !fleetImportHtml.includes('Before you press refresh') || !fleetImportHtml.includes('Amazon fleet list file') || !fleetImportHtml.includes('Open Amazon fleet') || !fleetImportHtml.includes('FleetOS tracker file') || !fleetImportHtml.includes('Open FleetOS tracker') || !fleetImportHtml.includes('Upload both together') || !fleetImportHtml.includes('Choose both files') || !fleetImportHtml.includes('Full export sanity check') || !fleetImportHtml.includes('All vehicles') || !fleetImportHtml.includes('Do not export from a filtered/search view') || !fleetImportHtml.includes('Same day') || !fleetImportHtml.includes('Row count') || !fleetImportHtml.includes('If count looks short') || !fleetImportHtml.includes('logistics.amazon.com/fleet-management/#vehicles') || !fleetImportHtml.includes('business.rivian.com/vehicles/tracker') || !fleetImportHtml.includes('Current upload status') || !fleetImportHtml.includes('Source checklist after upload') || !fleetImportHtml.includes('Amazon required fields') || !fleetImportHtml.includes('FleetOS required fields') || !fleetImportHtml.includes('Full roster') || !fleetImportHtml.includes('FleetOS coverage') || !fleetImportHtml.includes('matched both') || !fleetImportHtml.includes('Vehicle Name') || !fleetImportHtml.includes('Battery %') || !fleetImportHtml.includes('Not uploaded yet') || !fleetImportHtml.includes('Amazon columns to copy') || !fleetImportHtml.includes('FleetOS columns to copy') || !fleetImportHtml.includes('Amazon names/status win') || !fleetImportHtml.includes('VIN is the match key') || !fleetImportHtml.includes('Amazon also sets Expected EVs automatically') || !fleetImportHtml.includes('Do not rename Amazon vehicles') || !fleetImportHtml.includes('Name lock') || !fleetImportHtml.includes('cards use the VIN as the temporary name') || !fleetImportHtml.includes('Use Amazon fleet names exactly') || !fleetImportHtml.includes('Set Expected EVs from Amazon') || !fleetImportHtml.includes('short lists are flagged automatically') || !fleetImportHtml.includes('Or paste the copied FleetOS/Amazon table here') || !fleetImportHtml.includes('Read pasted table') || !fleetImportHtml.includes('Need fleet example?')) throw new Error('Fleet paste modal missing');
  let capturedFleetTemplate = null;
  downloadBlob = (data,type,name) => { capturedFleetTemplate = { data, type, name }; };
  downloadFleetTemplate();
  if (!capturedFleetTemplate || capturedFleetTemplate.name !== 'fleetos-amazon-ev-import-template.csv' || !capturedFleetTemplate.data.includes('Source,Vehicle Name,VIN') || !capturedFleetTemplate.data.includes('Amazon fleet list') || !capturedFleetTemplate.data.includes('FleetOS tracker') || !capturedFleetTemplate.data.includes('Amazon required: Vehicle Name') || !capturedFleetTemplate.data.includes('FleetOS required: VIN') || !capturedFleetTemplate.data.includes('Do not rename Amazon vehicles') || !capturedFleetTemplate.data.includes('Official name/status row') || !capturedFleetTemplate.data.includes('Battery/range row for same VIN')) throw new Error('Fleet template should explain Amazon and FleetOS source rows');
  const sourceColumnRows = [
    ['Source','Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles'],
    ['Amazon fleet list','LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational','',''],
    ['FleetOS tracker','','7FCEHEB79PN014816','','','','63%','98']
  ];
  const sourceColumnFleet = fleetDetailsFromRows(sourceColumnRows,'manual fleet table.csv');
  if (sourceColumnFleet.length !== 2 || sourceColumnFleet[0].source !== 'Amazon fleet list' || sourceColumnFleet[1].source !== 'FleetOS tracker') throw new Error('Fleet Source column should identify Amazon vs FleetOS rows');
  state.fleetSourceUploads = {};
  state.fleetExpectedCount = 0;
  rememberFleetSourceUpload(fleetDetailsFromRows([
    ['Vehicle Name','VIN','License Plate','Active','Operational Status'],
    ['LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational'],
    ['LLOL EV 22','7FCTGAAA1PN000184','9XYZ222','Active','Operational']
  ],'amazon fleet list.csv'),'amazon fleet list.csv','2026-07-05T12:00:00.000Z');
  rememberFleetSourceUpload(fleetDetailsFromRows(fleetOsRows,'FleetOS tracker.xlsx'),'FleetOS tracker.xlsx','2026-07-05T12:10:00.000Z');
  if (!fleetFullRosterReadinessStrip().includes('Full roster not proven yet') || !fleetFullRosterReadinessStrip().includes('1/2') || !fleetFullRosterReadinessStrip().includes('1 missing battery rows') || !fleetFullRosterReadinessStrip().includes('Upload full exports')) throw new Error('Fleet full roster readiness should flag partial FleetOS exports');
  rememberFleetSourceUpload(fleetDetailsFromRows([
    ['VIN','State of Charge','Estimated Range'],
    ['7FCEHEB79PN014816','41%','64 mi'],
    ['7FCTGAAA1PN000184','88%','137 mi']
  ],'FleetOS tracker.xlsx'),'FleetOS tracker.xlsx','2026-07-05T12:15:00.000Z');
  if (!fleetFullRosterReadinessStrip().includes('Full roster ready to review') || !fleetFullRosterReadinessStrip().includes('2/2') || !fleetFullRosterReadinessStrip().includes('Review refresh')) throw new Error('Fleet full roster readiness should confirm complete FleetOS exports');
  const combinedPastedRows = [
    ['Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles'],
    ['LLOL EV 40','7FCTGAAA9PN004040','9BOTH40','Active','Operational','77%','120 mi']
  ];
  const combinedPastedFleet = fleetDetailsFromRows(combinedPastedRows,'Pasted Amazon/FleetOS fleet table');
  if (combinedPastedFleet.length !== 1 || combinedPastedFleet[0].source !== 'Amazon fleet list + FleetOS tracker' || fleetConfidence(combinedPastedFleet[0]).label !== 'Verified') throw new Error('Combined pasted fleet table should infer verified Amazon + FleetOS source');
  state.fleetPasteText = 'Vehicle Name\\tVIN\\tLicense Plate\\tActive\\tOperational Status\\tBattery %\\tRange Miles\\nLLOL EV 22\\t7FCTGAAA1PN000184\\t9XYZ222\\tActive\\tOperational\\t88%\\t137 mi';
  parseFleetPasteAction();
  state.expandedFleetVin = '7FCTGAAA1PN000184';
  if (!fleetPage().includes('LLOL EV 22') || !fleetPage().includes('88%') || !fleetPage().includes('9XYZ222') || !fleetPage().includes('A✓ · F✓ · click') || fleetConfidence(rivianFleet.find(v => v.vin === '7FCTGAAA1PN000184')).label !== 'Verified' || !fleetSourceStatus().hasAmazon || !fleetSourceStatus().hasFleetos || !fleetRefreshReadinessStrip().includes('Review refresh')) throw new Error('Fleet pasted table did not update verified cards');
  resetFleetDemo();
  if (rivianFleet.length !== demoRivianFleet.length || state.fleetImport !== null || Object.keys(state.fleetSourceUploads||{}).length || state.fleetUpdateSummary !== null || state.fleetLastRefresh !== 'Not refreshed yet' || state.fleetView !== 'tiny' || !fleetPage().includes('EDV-014816') || !fleetPage().includes('Needs: real upload')) throw new Error('Fleet clear upload should restore demo board');
  state.fleetPasteText = 'Vehicle Name\\tVIN\\tLicense Plate\\tActive\\tOperational Status\\tBattery %\\tRange Miles\\nLLOL EV 22\\t7FCTGAAA1PN000184\\t9XYZ222\\tActive\\tOperational\\t88%\\t137 mi';
  parseFleetPasteAction();
  state.expandedFleetVin = '7FCTGAAA1PN000184';
  state.fleetSearch = '9xyz222';
  if (sortedRivianFleet().length !== 1 || sortedRivianFleet()[0].name !== 'LLOL EV 22' || !fleetPage().includes('Find EV, VIN, or plate') || !fleetPage().includes('1 of') || !fleetPage().includes('search: “9xyz222”')) throw new Error('Fleet search by plate failed');
  state.fleetSearch = 'PN000184';
  if (!sortedRivianFleet().some(v => v.vin === '7FCTGAAA1PN000184')) throw new Error('Fleet search by VIN failed');
  state.fleetSearch = 'not-a-real-ev';
  if (!fleetPage().includes('No EVs match this search/filter') || !fleetPage().includes('Press Clear to show every EV again') || !fleetPage().includes('data-action="clear-fleet-search"')) throw new Error('Fleet search empty state missing');
  state.fleetFilter = 'grounded';
  action('clear-fleet-search',{});
  if (state.fleetSearch !== '' || state.fleetFilter !== 'all' || sortedRivianFleet().length !== rivianFleet.length) throw new Error('Fleet clear search/filter failed');
  state.fleetExpectedCount = rivianFleet.length + 1;
  refreshFleetStatus();
  if (state.modal !== 'fleet-refresh' || !state.fleetRefreshPreview || state.fleetRefreshPreview.expectedShort !== 1 || state.fleetRefreshPreview.unknownExpectedShort !== 1 || state.fleetRefreshPreview.fleetosShort !== 1 || !state.fleetRefreshPreview.blockers.some(x => x.includes('FleetOS battery row')) || !state.fleetRefreshPreview.blockers.length || !state.fleetRefreshPreview.fieldBreakdown?.length || !modal().includes('Approve fleet refresh') || !modal().includes('WAIT') || !modal().includes('Refresh proof: WAIT') || !modal().includes('File freshness') || !modal().includes('Amazon status') || !modal().includes('FleetOS battery') || !modal().includes('Full roster') || !modal().includes('VIN match') || !modal().includes('Approve risk') || !modal().includes('What changed?') || !modal().includes('Amazon name/status') || !modal().includes('FleetOS battery/range') || !modal().includes('risk checks') || !modal().includes('new / removed') || !modal().includes('Approval summary') || !modal().includes('blockers before approval') || !modal().includes('Amazon status/name changes') || !modal().includes('FleetOS battery/range changes') || !modal().includes('need review before approving') || !modal().includes('source rows read') || !modal().includes('short of expected') || !modal().includes('FleetOS battery coverage short') || !modal().includes('1/2') || !modal().includes('not in upload') || !modal().includes('Fix before approving') || !modal().includes('Unknown missing EV') || !modal().includes('not in the uploaded rows yet') || !modal().includes('identify the exact VIN') || !modal().includes('1 EV short of expected') || !modal().includes('1 FleetOS battery row missing') || !modal().includes('Refresh will update') || !modal().includes('Changed fields by source') || !modal().includes('Active / Inactive') || !modal().includes('Operational / Grounded') || !modal().includes('Battery %') || !modal().includes('Range miles') || !modal().includes('Amazon fleet list') || !modal().includes('Amazon wins for van names and status') || !modal().includes('FleetOS tracker') || !modal().includes('FleetOS wins for battery and range') || !modal().includes('official EV name') || !modal().includes('battery %, range miles') || !modal().includes('Accuracy reminder') || !modal().includes('upload fresh exports first before approving') || !modal().includes('warn-approve') || !modal().includes('Approve anyway')) throw new Error('Fleet refresh should show approval preview before applying');
  resetFleetDemo();
  const twoEvFleetRows = fleetDetailsFromRows([
    ['Source','Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles'],
    ['Amazon fleet list','LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational','',''],
    ['FleetOS tracker','','7FCEHEB79PN014816','','','','41%','77'],
    ['Amazon fleet list','LLOL EV 22','7FCTGAAA1PN000184','9XYZ222','Active','Operational','',''],
    ['FleetOS tracker','','7FCTGAAA1PN000184','','','','88%','137']
  ],'combined fleet table.csv');
  applyFleetVehicles(twoEvFleetRows,{silent:true});
  state.fleetImport = { name: 'partial amazon fleet list.csv', vehicles: fleetDetailsFromRows(amazonFleetRows,'amazon fleet list.csv'), uploadedAt: new Date().toISOString() };
  refreshFleetStatus();
  if (!state.fleetRefreshPreview.removed || !state.fleetRefreshPreview.removedVehicles?.length || state.fleetRefreshPreview.missingVinCount !== 1 || refreshMissingVinText() !== '7FCEHEB79PN014816' || !state.fleetRefreshPreview.missingVinPreview?.some(x => x.vin === '7FCEHEB79PN014816' && x.issue.includes('FleetOS')) || !state.fleetRefreshPreview.blockers.some(x => x.includes('not in this upload')) || !modal().includes('partial export') || !modal().includes('Missing source VINs') || !modal().includes('Copy shown VINs') || !modal().includes('copy-refresh-missing-vins') || !modal().includes('Needs FleetOS battery/range') || !modal().includes('Amazon only') || !modal().includes('EVs not in this upload') || !modal().includes('LLOL EV 22') || !modal().includes('7FCTGAAA1PN000184')) throw new Error('Fleet refresh should warn before a partial upload removes EV cards');
  applyFleetVehicles(mergedFleet,{silent:true});
  state.fleetImport = { name: 'amazon fleet list.csv + FleetOS tracker.xlsx', vehicles: mergedFleet, uploadedAt: new Date().toISOString() };
  state.fleetExpectedCount = 0;
  refreshFleetStatus();
  if (!state.fleetRefreshPreview || state.fleetRefreshPreview.blockers.length || !modal().includes('SAFE') || !modal().includes('Refresh proof: SAFE after review') || !modal().includes('Counts and sources line up') || !modal().includes('What changed?') || !modal().includes('No blocker found') || !modal().includes('No roster size change') || !modal().includes('Approval summary') || !modal().includes('Ready to approve after review') || !modal().includes('Safe to approve') || !modal().includes('Approve refresh') || modal().includes('Approve anyway')) throw new Error('Clean fleet refresh should show normal approval button');
  action('approve-fleet-refresh',{});
  if (state.fleetLastRefresh === 'Not refreshed yet' || state.modal || state.fleetRefreshPreview || !fleetPage().includes('Last refresh:') || !fleetPage().includes('Refresh readiness')) throw new Error('Approved fleet refresh did not update the board');
  const morningHtml = morningSheetPage();
  if (!morningHtml.includes('Three easy steps') || !morningHtml.includes('Send to Sheet') || !morningHtml.includes('Exact merged template')) throw new Error('Quick start guide missing');
  if (!topbar().includes('data-action="share-dispatcher-link"') || DISPATCHER_SHARE_URL !== 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/' || !DISPATCHER_SHARE_TEXT.includes('https://')) throw new Error('Clickable dispatcher share link missing');
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
  const latestDeviceLayout = equipmentDetailsFromRows([
    ['EV','DEVICE','PORTABLE','EV','DEVICE','PORTABLE'],
    ['1','40','31','37','31','-'],
    ['2','41','32','38','32','-'],
    ['3','42','33','39','33','-'],
    ['4','43','34','40','34','r'],
    ['5','44','35','41','35','f'],
    ['21','60','51','57','51','7'],
    ['22','61','52','58','52','9'],
    ['23','62','53','GAS VAN','DEVICE','PORTABLE'],
    ['24','63','54','F33','',''],
    ['31','70','61','HELPER','DEVICE','PORTABLE'],
    ['32','71','62','H1','','']
  ]);
  if (latestDeviceLayout['1'].device !== '40' || latestDeviceLayout['40'].portable !== 'r' || latestDeviceLayout['58'].portable !== '9' || latestDeviceLayout.F33 || latestDeviceLayout.HELPER) throw new Error('Latest VAN/DEV/PORT sheet layout parsing failed');
  const cleanDeviceLayout = equipmentDetailsFromRows([
    ['EV/VAN','DEVICE','PORTABLE'],
    ['1','40','31'],
    ['37','31','-'],
    ['40','34','r'],
    ['43','37','cc']
  ]);
  if (cleanDeviceLayout['43'].portable !== 'cc' || cleanDeviceLayout['37'].device !== '31') throw new Error('Clean Google Sheets VAN/DEV/PORT layout parsing failed');
  state.equipmentImport = { name: 'device list', details: equipment };
  applyEquipmentImport();
  if (state.morningRoutes[0].deviceName !== '3' || state.morningRoutes[0].portable !== '-') throw new Error('EV/device assignment failed');
  state.morningRoutes[0].ev = '37';
  state.equipmentImport = { name: 'filled screenshot trial', details: denseScreenshotText };
  applyEquipmentImport();
  if (state.morningRoutes[0].deviceName !== '31' || state.morningRoutes[0].portable !== '-') throw new Error('Filled screenshot EV/device assignment failed');
  state.modal = 'equipment';
  const equipmentModalHtml = modal();
  if (!equipmentModalHtml.includes('VAN/DEV/PORT IMPORT') || !equipmentModalHtml.includes('Drop VAN/DEV/PORT file here') || !equipmentModalHtml.includes('equipment-drop') || !equipmentModalHtml.includes('Download VAN/DEV/PORT layout') || equipmentModalHtml.includes('equipment-paste-text')) throw new Error('EV/device import modal missing');
  state.modal = 'equipment';
  handleEquipmentPaste({ preventDefault(){}, clipboardData:{ files:[], getData:()=> '1 40 31 37 31 -' } });
  if (!state.equipmentImport || state.equipmentImport.details['37'].device !== '31') throw new Error('Equipment paste shortcut failed');
  state.editMode = true;
  state.copyMode = false;
  const editableHtml = morningSheetPage();
  if (!editableHtml.includes('contenteditable="true"') || !editableHtml.includes('data-sheet-cell="true"') || !editableHtml.includes('sheet-letters-row') || !editableHtml.includes('sheet-row-num') || !editableHtml.includes('PORTABLE') || !editableHtml.includes('sheet-spacer-col') || !editableHtml.includes('PLANNED RTS') || !editableHtml.includes('VAN/DEV/PORT Import') || !editableHtml.includes('EV 1-57 Low → High') || !editableHtml.includes('Randomize EVs') || !editableHtml.includes('Assign Gas Vehicles') || !editableHtml.includes('Copy mode') || !editableHtml.includes('PERFECT GOOGLE SHEETS HANDOFF') || !editableHtml.includes('Set up exact-format connector') || !editableHtml.includes('Copy fallback') || !editableHtml.includes('Formatted XLS') || !editableHtml.includes('Open paste box') || !editableHtml.includes('Remove blank rows') || !editableHtml.includes('Preview JPEG') || !editableHtml.includes('Click and drag white cells')) throw new Error('Editable sheet or JPEG control missing');
  assignElectricVehicles('low');
  if (state.morningRoutes[0].ev !== '1') throw new Error('Lowest-to-highest EV assignment failed');
  assignGasVehicles();
  if (state.morningRoutes[0].ev !== 'F33') throw new Error('Gas vehicle assignment failed');
  state.copyMode = true;
  state.editMode = false;
  const copyModeHtml = morningSheetPage();
  if (!copyModeHtml.includes('copy-ops-sheet') || !copyModeHtml.includes('morning-template-sheet') || copyModeHtml.includes('exact-ops-sheet') || !copyModeHtml.includes('sheet-letters-row') || !copyModeHtml.includes('data-sheet-copy-cell="true"') || !copyModeHtml.includes('data-sheet-section="0"') || !copyModeHtml.includes('Copy selected cells') || !copyModeHtml.includes('STOP COUNT') || !copyModeHtml.includes('PACKAGE COUNT') || !copyModeHtml.includes('PLANNED RTS') || !copyModeHtml.includes('11:15 (1)') || copyModeHtml.includes('PRE DVIC') || !copyModeHtml.includes('Divider columns I and L split manual copy into A–H, J–K, and M blocks') || !copyModeHtml.includes('Black divider columns I and L are real boundaries')) throw new Error('Copy mode should be Sheets-like and match the A-M morning template without old exact sheet styling');
  const copyModeRows = morningCopyRowsForSections(morningSections(filteredMorningRows()));
  if (copyModeRows[0].values.length !== 13 || copyModeRows[0].values[0] !== 'WAVE 1' || copyModeRows[0].values[5] !== 'F33' || copyModeRows[0].values[8] !== '' || String(copyModeRows[0].values[9]) !== '177' || String(copyModeRows[0].values[10]) !== '340') throw new Error('Copy mode rows should include the A-M template columns');
  state.copyMode = false;
  const tsv = morningSheetTsv();
  const tsvRows = tsv.split('\\n').map(row => row.split('\\t'));
  if (!tsv.startsWith('WAVE 1\\tTaylor Driver') || !tsv.includes('\\n11:15 (1)\\t') || tsvRows.some(row => row.length !== 13) || tsvRows[0][8] !== '' || tsvRows[0][11] !== '' || tsv.includes('WAVE\\tDRIVER\\tROUTE')) throw new Error('Google Sheets TSV output should match the A-M template body pasted at A3');
  if (morningDisplayRows(morningSections(filteredMorningRows())[0]).length !== 12) throw new Error('Template row padding missing');
  state.fitMorningRows = true;
  if (morningDisplayRows(morningSections(filteredMorningRows())[0]).length !== 1) throw new Error('Fit-to-drivers row sizing failed');
  if (!morningSheetPage().includes('✓ Fit to drivers')) throw new Error('Fit-to-drivers toggle missing');
  state.fitMorningRows = false;
  state.sheetCopyText = tsv; state.modal = 'sheets-helper';
  if (!modal().includes('Paste-ready morning sheet') || !modal().includes('Paste in A3') || !modal().includes('sheets-copy-text')) throw new Error('Google Sheets paste helper missing');
  let capturedFormattedMorning = null;
  downloadBlob = (data,type,name) => { capturedFormattedMorning = { data, type, name }; };
  exportMorningTemplateSheet();
  if (!capturedFormattedMorning || capturedFormattedMorning.name !== 'LLOL-opening-operations-formatted.xls' || capturedFormattedMorning.type !== 'application/vnd.ms-excel' || !capturedFormattedMorning.data.includes('rowspan="12"') || !capturedFormattedMorning.data.includes('WAVE 1') || !capturedFormattedMorning.data.includes('11:15 (1)') || !capturedFormattedMorning.data.includes('class="spacer"')) throw new Error('Formatted morning XLS export missing template layout');
  state.screenshotPreview = 'data:image/jpeg;base64,demo'; state.modal = 'screenshot';
  if (!modal().includes('Approve & save JPEG') || !modal().includes('Driver/Helper')) throw new Error('JPEG approval dialog missing');
  globalThis.__parseXlsx = parseXlsxArrayBuffer;
  globalThis.__readPdfText = readPdfText;
`;

vm.runInNewContext(`${source}\n${checks}`, context, { filename: 'app.js' });
const fleetCss = fs.readFileSync('styles.css','utf8');
  if (!fleetCss.includes('.morning-template-sheet .wave-label span { display:inline-block; writing-mode:vertical-rl; transform:rotate(180deg);') || fleetCss.includes('.morning-template-sheet .pad-label span { display:inline-block; writing-mode:vertical-rl')) throw new Error('Morning template should keep Wave vertical but Pad horizontal');
  if (!fleetCss.includes('.morning-template-sheet .sheet-spacer-col { width:16px; min-width:16px;') || !fleetCss.includes('.morning-template-sheet th:nth-child(10), .morning-template-sheet th:nth-child(13) { width:16px;')) throw new Error('Morning template spacer columns I/L should stay slim');
  if (!fleetCss.includes('minmax(74px,1fr)') || !fleetCss.includes('min-height:42px') || !fleetCss.includes('width:19px; height:10px') || !fleetCss.includes('repeat(7,minmax(0,1fr))') || !fleetCss.includes('repeat(4,minmax(0,1fr))') || !fleetCss.includes('.fleet-card-cue') || !fleetCss.includes('.fleet-source-badges') || !fleetCss.includes('.fleet-source-badges i.ok') || !fleetCss.includes('.fleet-source-map') || !fleetCss.includes('.fleet-row-count-check') || !fleetCss.includes('.fleet-row-count-grid') || !fleetCss.includes('.fleet-name-lock-strip') || !fleetCss.includes('.fleet-name-lock-preview') || !fleetCss.includes('.fleet-dispatcher-proof') || !fleetCss.includes('.fleet-dispatcher-proof-grid') || !fleetCss.includes('.fleet-live-connector') || !fleetCss.includes('.fleet-live-connector-steps') || !fleetCss.includes('.fleet-source-timestamps') || !fleetCss.includes('.fleet-refresh-rule-mini') || !fleetCss.includes('.refresh-freshness-summary') || !fleetCss.includes('.fleet-refresh-proof') || !fleetCss.includes('.fleet-refresh-proof-grid') || !fleetCss.includes('.fleet-refresh-what-changed') || !fleetCss.includes('.rivian-id-summary') || !fleetCss.includes('.fleet-gap-fix-tips') || !fleetCss.includes('.fleet-refresh-blockers') || !fleetCss.includes('.fleet-refresh-unknown-short') || !fleetCss.includes('.fleet-refresh-missing-vins') || !fleetCss.includes('.fleet-refresh-conflicts') || !fleetCss.includes('.fleet-refresh-missing-vins > .btn') || !fleetCss.includes('.fleet-full-export-check') || !fleetCss.includes('.fleet-refresh-guide') || !fleetCss.includes('.name-source-pill em') || !fleetCss.includes('.gap-priority') || !fleetCss.includes('.change-source-pills') || !fleetCss.includes('.warn-approve')) throw new Error('Tiny EV grid should stay compact and scan-friendly');

(async () => {
  const zip = new JSZip();
  zip.file('xl/workbook.xml', '<?xml version="1.0"?><workbook xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Operations" sheetId="1" r:id="rId1"/></sheets></workbook>');
  zip.file('xl/_rels/workbook.xml.rels', '<?xml version="1.0"?><Relationships><Relationship Id="rId1" Target="worksheets/sheet1.xml"/></Relationships>');
  zip.file('xl/sharedStrings.xml', '<?xml version="1.0"?><sst><si><t>DSP</t></si><si><t>Route Code</t></si><si><t>Wave</t></si><si><t>Staging Location</t></si><si><t>Num Packages</t></si><si><t>LLOL</t></si><si><t>CX100</t></si><si><t>11:15 AM</t></si><si><t>STG.V.1</t></si></sst>');
  zip.file('xl/worksheets/sheet1.xml', '<?xml version="1.0"?><worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c><c r="D1" t="s"><v>3</v></c><c r="E1" t="s"><v>4</v></c></row><row r="2"><c r="A2" t="s"><v>5</v></c><c r="B2" t="s"><v>6</v></c><c r="C2" t="s"><v>7</v></c><c r="D2" t="s"><v>8</v></c><c r="E2"><v>332</v></c></row></sheetData></worksheet>');
  const workbook = await zip.generateAsync({ type: 'nodebuffer' });
  const parsed = await context.__parseXlsx(workbook);
  if (parsed.length !== 2 || parsed[0][0] !== 'DSP' || parsed[1][1] !== 'CX100' || parsed[1][4] !== 332) throw new Error('XLSX parsing failed');
  const fleetZip = new JSZip();
  fleetZip.file('xl/workbook.xml', '<?xml version="1.0"?><workbook xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Instructions" sheetId="1" r:id="rId1"/><sheet name="FleetOS Tracker" sheetId="2" r:id="rId2"/></sheets></workbook>');
  fleetZip.file('xl/_rels/workbook.xml.rels', '<?xml version="1.0"?><Relationships><Relationship Id="rId1" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Target="worksheets/sheet2.xml"/></Relationships>');
  fleetZip.file('xl/sharedStrings.xml', '<?xml version="1.0"?><sst><si><t>Read me</t></si><si><t>VIN</t></si><si><t>State of Charge</t></si><si><t>Estimated Range</t></si><si><t>7FCEHEB79PN014816</t></si><si><t>64%</t></si><si><t>101 mi</t></si></sst>');
  fleetZip.file('xl/worksheets/sheet1.xml', '<?xml version="1.0"?><worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c></row></sheetData></worksheet>');
  fleetZip.file('xl/worksheets/sheet2.xml', '<?xml version="1.0"?><worksheet><sheetData><row r="1"><c r="A1" t="s"><v>1</v></c><c r="B1" t="s"><v>2</v></c><c r="C1" t="s"><v>3</v></c></row><row r="2"><c r="A2" t="s"><v>4</v></c><c r="B2" t="s"><v>5</v></c><c r="C2" t="s"><v>6</v></c></row></sheetData></worksheet>');
  const fleetWorkbook = await fleetZip.generateAsync({ type: 'nodebuffer' });
  const parsedFleetWorkbook = await context.__parseXlsx(fleetWorkbook);
  if (parsedFleetWorkbook.length !== 2 || parsedFleetWorkbook[0][0] !== 'VIN' || parsedFleetWorkbook[1][0] !== '7FCEHEB79PN014816') throw new Error('XLSX fleet parser should choose the VIN roster tab over workbook instructions');
  const pdfLike = Buffer.from('%PDF-1.4\\nBT (1 40 31 37 31 - 2 41 32 38 32 -) Tj ET\\n%%EOF');
  const pdfText = await context.__readPdfText(pdfLike.buffer.slice(pdfLike.byteOffset, pdfLike.byteOffset + pdfLike.byteLength));
  if (!pdfText.includes('1 40 31 37 31 -')) throw new Error('PDF text extraction failed');
  console.log('Morning sheet CSV/XLSX smoke test passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
