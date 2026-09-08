const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function occurrences(value = '', needle = '') {
  return String(value).split(String(needle)).length - 1;
}

function harness() {
  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const storage = new Map();
  const element = () => ({
    addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
    focus() {}, blur() {}, click() {}, querySelector() { return null; }, querySelectorAll() { return []; }
  });
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout,
    navigator: { clipboard: { writeText: async () => true } },
    window: { scrollTo() {}, open() {} },
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    document: {
      body: { appendChild() {} }, activeElement: null,
      getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
      querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
      addEventListener() {}, removeEventListener() {}
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{};render=()=>{};persist=()=>{};', context);
  return context;
}

function run() {
  const context = harness();
  vm.runInContext(`
    state.rosteringDate='2026-09-06';
    state.morningOperationDate='2026-09-06';
    state.rosteringPlans={[state.rosteringDate]:normalizeRosteringPlan({services:rosteringDefaultServices()})};
    state.rosteringHelperPool={};
    state.rosteringManualTraining={};
    state.scheduleStayHome={};
    state.scheduleReductions={};
    state.callOffDriverKeys={};

    // Mirror the two formats accepted by the PAYCOM importer: the native
    // employee report and generic exported files whose role field may be
    // called Shift, Role, or Title.
    const paycomReport=scheduleEntriesFromPaycomReportRows([
      ['Employee','Sun 9/6/2026'],
      ['Riley Space','Ride Along 10:30 AM - 8:30 PM'],
      ['Riley Space','RIDE-ALONG 10:30 AM - 8:30 PM'],
      ['Jordan Hyphen','RIDE-ALONG 10:35 AM - 8:35 PM']
    ]);
    const roleExport=scheduleEntriesFromRows([
      ['Name','Role','Date','Start','End'],
      ['Taylor Compact','rIdEaLoNg shift','9/6/2026','10:40 AM','8:40 PM'],
      ['Sam Split Role','Ride Along','9/6/2026','10:50 AM','8:50 PM']
    ]);
    const titleExport=scheduleEntriesFromRows([
      ['Name','Title','Date','Start','End'],
      ['Morgan Embedded','Delivery Associate Ride  Along','9/6/2026','10:45 AM','8:45 PM']
    ]);
    const shiftExport=scheduleEntriesFromRows([
      ['Name','Shift','Date','Start','End'],
      ['Avery Normal','Delivery Associate','9/6/2026','11:15 AM','9:15 PM'],
      ['Sam Split Role','Delivery Associate','9/6/2026','11:20 AM','9:20 PM'],
      ['Hayden Helper','Driver Helper','9/6/2026','11:20 AM','9:20 PM']
    ]);

    const imported=[...paycomReport,...roleExport,...titleExport,...shiftExport];
    const variantRoles=['Ride Along','RIDE-ALONG','rIdEaLoNg shift','Delivery Associate Ride  Along'];
    storeRosteringScheduleEntries(imported,'paycom-ridealong-fixture.xls');
    const plan=currentRosteringPlan();
    const autoResult=autoRosterFromPaycom({silent:true,mode:'abc'});
    const ridealongs=rosteringRidealongEntries();
    const helpers=rosteringHelperPoolRows();
    const assigned=plan.assignments.filter(row=>row.associate).map(row=>({name:row.associate,role:row.role,service:plan.services.find(service=>service.id===row.serviceId)?.kind||''}));
    const paycomHtml=rosteringPaycomHtml(plan);
    const trainingHtml=rosteringTrainingHtml();
    const pageHtml=rosteringPage();
    const emailText=rosteringEmailTemplateText(plan);
    const emailHtml=rosteringEmailTemplateHtml(plan);

    globalThis.__result={
      rawCounts:{paycom:paycomReport.length,role:roleExport.length,title:titleExport.length,shift:shiftExport.length},
      variants:variantRoles.map(role=>({role,group:scheduleRoleGroup(role),category:rosteringPaycomCategoryFor({name:'Variant Proof',role}),helper:isDriverHelperOnlyRole(role),eligible:rosteringEntryEligibleForRoster({name:'Variant Proof',role})})),
      autoResult,
      ridealongs:ridealongs.map(row=>({name:row.name,date:row.date,start:row.start,end:row.end,role:row.role})),
      helpers:helpers.map(row=>row.name),
      assigned,
      backupNames:Object.values(rosteringUnrosteredBackupGroups(plan)).flat().map(row=>row.name),
      paycomHtml,trainingHtml,pageHtml,emailText,emailHtml
    };
  `, context);

  const result = context.__result;
  assert(result.rawCounts.paycom === 3, 'Native PAYCOM report rows containing Ride Along/RIDE-ALONG must be read without losing the duplicate source row');
  assert(result.rawCounts.role === 2 && result.rawCounts.title === 1 && result.rawCounts.shift === 3, 'Shift, Role, and Title exports must all recognize their role column');
  assert(result.variants.every(row=>row.group==='training'&&row.category==='training'&&!row.helper&&!row.eligible), 'Case, spacing, hyphen, compact, and embedded Ride Along role values must classify only as Training');

  const expected = [
    ['Jordan Hyphen', '2026-09-06', '10:35 AM', '8:35 PM'],
    ['Morgan Embedded', '2026-09-06', '10:45 AM', '8:45 PM'],
    ['Riley Space', '2026-09-06', '10:30 AM', '8:30 PM'],
    ['Sam Split Role', '2026-09-06', '10:50 AM', '8:50 PM'],
    ['Taylor Compact', '2026-09-06', '10:40 AM', '8:40 PM']
  ];
  assert(JSON.stringify(result.ridealongs.map(row=>[row.name,row.date,row.start,row.end])) === JSON.stringify(expected), 'Ride-along rows must preserve each imported name, date, start, and end time');
  assert(result.ridealongs.length === 5 && new Set(result.ridealongs.map(row=>row.name.toLowerCase())).size === 5, 'Repeated PAYCOM ride-along rows must collapse to one Rostering row per person');
  assert(result.ridealongs.every(row=>/ride\s*-?\s*along/i.test(row.role)||/ridealong/i.test(row.role)), 'Every case, spacing, hyphen, and embedded Ride Along role variant must classify as training');

  assert(result.helpers.join(',') === 'Hayden Helper', 'Ride-along shifts must not enter the Helper box');
  assert(result.autoResult.drivers === 1 && result.autoResult.helpers === 1, 'Auto Roster must place only the normal driver and helper, not ride-along shifts');
  assert(!result.assigned.some(row=>result.ridealongs.some(ridealong=>ridealong.name===row.name)), 'Ride-along shifts must not occupy normal driver or Helper service positions');
  assert(!result.backupNames.includes('Sam Split Role'), 'A person with both Ride Along and Delivery Associate rows must not leak into a backup group');
  assert((result.paycomHtml.match(/data-rostering-paycom-category="training"/g)||[]).length === 5, 'PAYCOM Rostering must expose each unique Ride Along in the separate Training category');
  assert(result.pageHtml.includes('HELPER SHIFTS') && result.pageHtml.includes('RIDEALONGS / TRAINING'), 'Rostering must render distinct Helper and Ride Along sections');
  expected.forEach(([name,,start,end])=>{
    assert(occurrences(result.trainingHtml, '<strong>'+name+'</strong>') === 1, name+' must render exactly once in the Ride Along section');
    assert(result.trainingHtml.includes(start) && result.trainingHtml.includes(end), name+' must keep its PAYCOM start and end time in the Ride Along section');
  });

  const ridealongHeading=result.emailText.match(/^Ride[ -]?Alongs?:\s*$/im)?.[0]||'';
  assert(ridealongHeading, 'Plain email template must contain a separate Ride Alongs section');
  assert(/<strong>Ride[ -]?Alongs?:<\/strong>/i.test(result.emailHtml), 'Formatted email template must contain a separate bold Ride Alongs heading');
  const emailLines=result.emailText.split('\n'),helperIndex=emailLines.indexOf('Helpers:'),ridealongIndex=emailLines.findIndex(line=>/^Ride[ -]?Alongs?:\s*$/i.test(line)),backupIndex=emailLines.indexOf('Back Ups:'),dividerAfterRidealong=emailLines.findIndex((line,index)=>index>ridealongIndex&&/^-{10,}$/.test(line));
  const ridealongSection=emailLines.slice(ridealongIndex+1,dividerAfterRidealong).filter(Boolean);
  assert(helperIndex>=0&&helperIndex<ridealongIndex&&ridealongIndex<dividerAfterRidealong&&dividerAfterRidealong<backupIndex, 'Email sections must stay ordered as Helpers, Ride Alongs, then Back Ups');
  assert(JSON.stringify(ridealongSection)===JSON.stringify(expected.map(row=>row[0])), 'The plain Ride Alongs email section must contain only the unique ride-along names');
  expected.forEach(([name])=>{
    assert(occurrences(result.emailText,name) === 1, name+' must appear exactly once in the plain Ride Alongs email section');
    assert(occurrences(result.emailHtml,name) === 1, name+' must appear exactly once in the formatted Ride Alongs email section');
  });
  assert(!result.emailText.match(/^Avery Normal$/m), 'Normal route drivers must not leak into the Ride Alongs email section');
  assert(occurrences(result.emailText,'Hayden Helper') === 1, 'The existing Helper email section must stay separate and duplicate-free');

  vm.runInContext(`
    state.rosteringPlans={[state.rosteringDate]:normalizeRosteringPlan({services:rosteringDefaultServices()})};state.rosteringHelperPool={};
    state.driverContacts=[{name:'Unavailable Canon',key:'unavailable canon',transporterId:'RID-UNAVAILABLE'}];
    state.driverProfiles={};ensureDriverProfile(state.driverContacts[0]);
    const unavailableProfile=driverProfileEntry('Unavailable Canon').profile;unavailableProfile.nickname='Unavailable Ridealong';unavailableProfile.names.push('Unavailable Ridealong');
    invalidateDriverDirectoryCaches();
    state.scheduleStayHome={['2026-09-06|'+nameKey('Unavailable Canon')]:{name:'Unavailable Canon'}};
    storeRosteringScheduleEntries([
      {date:'9/6/2026',name:'Helper Wins',role:'Driver Helper',start:'11:20 AM',end:'9:20 PM'},
      {date:'9/6/2026',name:'Helper Wins',role:'Ride Along',start:'10:20 AM',end:'8:20 PM'},
      {date:'9/6/2026',name:'Available Ridealong',role:'Ride Along',start:'10:25 AM',end:'8:25 PM'},
      {date:'9/6/2026',name:'Unavailable Ridealong',role:'Ride Along',start:'10:30 AM',end:'8:30 PM'}
    ],'paycom-ridealong-precedence-fixture.xls');
    const precedencePlan=currentRosteringPlan();autoRosterFromPaycom({silent:true,mode:'abc'});
    const staleDriverAssignment=precedencePlan.assignments.find(row=>precedencePlan.services.find(service=>service.id===row.serviceId)?.kind==='driver');
    Object.assign(staleDriverAssignment,{associate:'Available Ridealong',role:'Delivery Associate',source:'manual'});
    globalThis.__precedence={text:rosteringEmailTemplateText(precedencePlan),html:rosteringEmailTemplateHtml(precedencePlan),ridealongs:rosteringEmailRidealongRows(precedencePlan),helpers:rosteringEmailHelperRows(precedencePlan),counts:rosteringAllocatedCounts(precedencePlan)};
  `, context);
  const precedence=context.__precedence;
  assert(precedence.helpers.join(',')==='Helper Wins' && occurrences(precedence.text,'Helper Wins')===1, 'An assigned Helper must remain only in Helpers when PAYCOM also lists Ride Along');
  assert(precedence.ridealongs.join(',')==='Available Ridealong', 'Unavailable or assigned-Helper identities must not appear in the Ride Alongs email block');
  assert(!precedence.text.includes('Unavailable Ridealong') && !precedence.html.includes('Unavailable Ridealong'), 'A Ride Along marked unavailable under their canonical name leaked into the email through a PAYCOM nickname');
  assert(precedence.counts.rivian===0 && precedence.counts.total===0, 'Ride Along and Helper shifts, including a stale manual Ride Along route assignment, changed allocated route totals');

  console.log('PAYCOM ride-along Rostering and separate email-section regression passed');
}

try { run(); } catch (error) { console.error(error); process.exitCode = 1; }
