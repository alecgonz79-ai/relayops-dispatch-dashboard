const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function harness() {
  const storage = new Map();
  const app = { innerHTML: '' };
  const fileInput = { accept: '', addEventListener() {}, click() {} };
  const elements = new Map();
  const element = () => ({
    value: '', addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {},
    classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {},
    focus() {}, blur() {}, click() {}, querySelector() { return null; }, querySelectorAll() { return []; }
  });
  const context = {
    console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout,
    navigator: { clipboard: { writeText: async () => true } },
    window: { scrollTo() {}, open() { return {}; }, RelayOpsCloud: null },
    localStorage: {
      getItem: key => storage.has(key) ? storage.get(key) : null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: key => storage.delete(key)
    },
    document: {
      body: { appendChild() {} }, activeElement: null,
      getElementById(id) { if (id === 'app') return app; if (id === 'file-input') return fileInput; return elements.get(id) || null; },
      querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
      addEventListener() {}, removeEventListener() {}
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
  vm.runInContext('toast=()=>{};render=()=>{};', context);
  return { context, storage, elements };
}

function run() {
  const { context, storage, elements } = harness();
  vm.runInContext(`
    state.driverContacts=[];state.driverProfiles={};state.driverNameAliases={};
    mergeDriverContacts([{name:'Alex Jonathan Gonzalez',phone:'(555) 111-2222',role:'Delivery Associate',transporterId:'A2J6',status:'ACTIVE',key:'alex jonathan gonzalez'}]);
    const first=driverProfileEntry('Alex Jonathan Gonzalez');first.profile.nickname='Alec G';first.profile.names.push('Alex Gonzalez');first.profile.tags=['trainer','helper-driver'];
    persist();
    mergeDriverContacts([{name:'Alejandro Jonathan Gonzalez',phone:'(555) 111-2222',role:'Delivery Associate',transporterId:'A2J6',status:'ACTIVE',key:'alejandro jonathan gonzalez'}]);
    const updated=driverProfileEntry('Alex Gonzalez');
    mergeDriverContacts([{name:'Alec G',phone:'(555) 333-4444',role:'Delivery Associate',transporterId:'A2J6',status:'ACTIVE',key:'alec g'}]);
    globalThis.__profile={...updated.profile,names:[...updated.profile.names],tags:[...updated.profile.tags]};
    globalThis.__aliasImportContact=state.driverContacts.find(row=>row.transporterId==='A2J6');
    globalThis.__oldResolves=canonicalDriverName('Alex Jonathan Gonzalez');
    globalThis.__nicknameResolves=canonicalDriverName('Alec G');
    globalThis.__teamHtml=teamPage();
    globalThis.__daily=sharedWorkspaceState();globalThis.__persistent=persistentWorkspaceState();
    state.driverProfiles['id:OTHER']={canonical:'Another Driver',nickname:'',names:['Another Driver','AJ'],tags:[],transporterId:'OTHER'};
    globalThis.__collision=driverIdentityCollision(['AJ'],'id:A2J6');
  `, context);

  assert(context.__profile.canonical === 'Alejandro Jonathan Gonzalez', 'Same Transporter ID import must update the canonical legal name');
  assert(context.__profile.nickname === 'Alec G' && context.__profile.tags.includes('trainer') && context.__profile.tags.includes('helper-driver'), 'Nickname and capability tags must survive refreshed imports');
  assert(context.__profile.names.includes('Alex Jonathan Gonzalez') && context.__profile.names.includes('Alex Gonzalez'), 'Previous legal and known names must stay linked to the profile');
  assert(context.__profile.names.includes('Alec G') && context.__aliasImportContact?.name === 'Alejandro Jonathan Gonzalez', 'A later import using the saved nickname must update the same driver without replacing the canonical identity');
  assert(context.__aliasImportContact?.phone === '(555) 333-4444', 'A nickname-based import must still update the linked driver contact details');
  assert(context.__oldResolves === 'Alejandro Jonathan Gonzalez' && context.__nicknameResolves === 'Alejandro Jonathan Gonzalez', 'Old names and nicknames must resolve to the updated canonical driver');
  assert(storage.has('relayops_driver_profiles'), 'Driver profiles must be written to local storage');
  assert(context.__daily.driverProfiles && context.__persistent.driverProfiles, 'Driver profiles must be included in shared and persistent cloud snapshots');
  assert(context.__teamHtml.includes('team-directory-layout') && context.__teamHtml.includes('team-message-column') && context.__teamHtml.includes('Trainer') && context.__teamHtml.includes('Helper Driver'), 'Drivers & Team must render the compact right-side queue and capability controls');
  assert(context.__collision?.profile?.canonical === 'Another Driver', 'Duplicate known names must be detected before an alias is saved');

  const fieldValues = {
    'charger-report-company': 'LLOL', 'charger-report-port': 'Left charger 1', 'charger-report-spot': '1',
    'charger-report-station': 'ST-101', 'charger-report-lights': 'Yes', 'charger-report-color': 'Red',
    'charger-report-plugged': 'Yes', 'charger-report-display': 'Fault 42', 'charger-report-replugged': 'Yes',
    'charger-report-restored': 'No', 'charger-report-other-van': 'Yes', 'charger-report-test': 'Second van also failed',
    'charger-report-concern': 'Will not begin charging', 'charger-report-slack-room': 'https://app.slack.com/client/T1/C1',
    'charger-report-preview': ''
  };
  Object.entries(fieldValues).forEach(([id, value]) => elements.set(id, { value }));
  vm.runInContext(`
    state.pendingChargerReport={company:'LLOL'};state.slackReportRoomUrl='https://app.slack.com/client/T1/C1';
    updateChargerReportPreview();globalThis.__chargerPreview=document.getElementById('charger-report-preview').value;
    persist();globalThis.__chargerTemplate=chargerReportTemplate(chargerReportFromModal());
  `, context);
  assert(context.__chargerPreview === context.__chargerTemplate, 'Charger Slack preview must update from the current form values');
  for (const label of ['Company: LLOL', 'Charge Port: Left charger 1', 'Parking spot: 1', 'Station ID: ST-101', 'Concern: Will not begin charging']) assert(context.__chargerTemplate.includes(label), `Charger report lost ${label}`);
  for (const label of ['Lights illuminated:', 'Color:', 'Van plugged in:', 'Charger port displays:', 'Unplugged/replugged:', 'Restored:', 'Tried another van:', 'Test result:']) assert(context.__chargerTemplate.includes(label), `Charger report lost exact template field ${label}`);
  assert(storage.get('relayops_slack_report_room_url') === 'https://app.slack.com/client/T1/C1', 'Saved Slack room must survive reload');
  vm.runInContext(`
    state.chargerReports=[];state.parkingChargerStatus={};state.pendingChargerReport={key:'middle-1-left'};
    saveChargerReport(chargerReportFromModal(),'copied');
    globalThis.__savedChargerReports=state.chargerReports;globalThis.__savedChargerStatus=state.parkingChargerStatus;
    globalThis.__chargerButton=parkingChargerButton('middle-1-left','Left charger 1',1);
    globalThis.__chargerShared=sharedWorkspaceState();globalThis.__chargerPersistent=persistentWorkspaceState();
    openChargerReport('middle-1-left');globalThis.__chargerModal=modal();
  `, context);
  assert(context.__savedChargerReports.length === 1 && context.__savedChargerReports[0].chargerKey === 'middle-1-left', 'Charger report must persist against the selected charger key');
  assert(context.__savedChargerStatus['middle-1-left'] === 'red', 'Saving a charger concern must mark that exact charger as a fault');
  assert(JSON.parse(storage.get('relayops_charger_reports')).length === 1, 'Charger report history must survive a local reload');
  assert(context.__chargerShared.chargerReports.length === 1 && context.__chargerPersistent.chargerReports.length === 1, 'Charger report history must be included in daily and persistent shared state');
  assert(context.__chargerButton.includes('data-action="report-charging-station"') && context.__chargerButton.includes('data-charger-key="middle-1-left"'), 'Every charger control must expose a report action tied to its charger/spot');
  assert(context.__chargerModal.includes('Copy only') && context.__chargerModal.includes('Copy & open saved Slack') && context.__chargerModal.includes('Recent reports for this charger'), 'Charger modal must provide safe Slack fallback actions and recent spot history');

  const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
  for (const selector of ['.team-directory-layout', '.team-message-column', '.rostering-lower-grid', '.rostering-training', '.charger-report-grid', '.charger-report-trigger']) assert(css.includes(selector), `Missing ${selector} layout styling`);
  assert(/\.team-directory-layout\{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(310px,340px\)/.test(css), 'Drivers & Team must keep the imported driver cards beside a compact desktop message rail');
  assert(/\.team-message-column \.morning-message-queue\{[^}]*max-height:calc\(100vh - 118px\)[^}]*overflow:hidden/.test(css), 'Confirmed-driver message box must stay compact inside the desktop viewport');
  assert(/\.team-message-column \.message-queue-list\{[^}]*max-height:min\(52vh,460px\)[^}]*overflow-y:auto[^}]*overscroll-behavior:contain/.test(css), 'Confirmed drivers must scroll inside the message box instead of stretching the page');
  assert(/@media screen and \(max-width:980px\)\{[^}]*\.team-directory-layout,\.rostering-lower-grid\{grid-template-columns:1fr\}\.team-message-column\{position:static;order:0\}/.test(css), 'Drivers & Team must stack the message box after the imported driver list on mobile');
  assert(css.includes('.parking-slot .parking-charger-control { position:relative; width:100%; height:100%; overflow:visible; clip:auto; }'), 'Parking-slot accessibility labels must not collapse or cover the spot-specific charger report button');
  console.log('Driver identity, compact queue, training, and charger handoff tests passed');
}

try { run(); } catch (error) { console.error(error); process.exitCode = 1; }
