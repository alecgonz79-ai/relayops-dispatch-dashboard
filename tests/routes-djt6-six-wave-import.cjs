const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const storage = new Map();
const app = { innerHTML: '' };
const fileInput = { accept: '', addEventListener() {}, click() {} };
const element = () => ({
  addEventListener() {},
  appendChild() {},
  remove() {},
  classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {},
  style: {},
  focus() {},
  setSelectionRange() {},
  click() {}
});
const context = {
  console,
  Intl,
  Blob,
  URL,
  TextDecoder,
  TextEncoder,
  setTimeout,
  clearTimeout,
  navigator: { clipboard: { writeText: async () => true } },
  window: { scrollTo() {} },
  localStorage: {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  document: {
    body: { appendChild() {} },
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelectorAll() { return []; },
    createElement: element
  }
};

vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });

vm.runInContext(`
  toast=()=>{};
  render=()=>{};
  persist=()=>{};
  state.dspCode='LLOL';
  state.organizationName='Legacy Logistics';
  state.fitMorningRows=true;
  state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.morningOperationDate='2026-07-29';
  state.morningWaveTimeOverrides={
    '2026-07-29|WAVE1':{time:'10:55 AM',count:5},
    '2026-07-29|WAVE2':{time:'11:00 AM',count:2},
    '2026-07-29|WAVE3':{time:'11:15 AM',count:8},
    '2026-07-29|WAVE4':{time:'11:20 AM',count:10},
    '2026-07-29|WAVE5':{time:'11:25 AM',count:14},
    '2026-07-29|WAVE6':{time:'11:40 AM',count:11}
  };
  state.importedFile={
    name:'Routes_DJT6_2026-07-29_09_40 (PDT).xlsx',
    kind:'plan',
    headers:[
      'Route code','DSP','Transporter Id','Driver name','Route progress',
      'Delivery Service Type','Route Duration','All stops','Stops complete',
      'not started stops','total deliveries','total pickups','On-road pickups',
      'Time windows','Planned Departure Time','Stops with services','LQDG Mass Weight'
    ],
    rows:[
      ['CX246','The Payment Consultants LLC DBA Legacy Logistics','DA1','Joseph Alvis','ON_TIME','Standard Parcel Electric - Rivian MEDIUM',453,181,0,181,330,330,0,0,'11:20am',0,'4 lb'],
      ['CX218','The Payment Consultants LLC DBA Legacy Logistics','DA2','Victor Garcia Gutierrez','ON_TIME','Standard Parcel Electric - Rivian MEDIUM',497,171,0,171,323,323,0,0,'11:25am',0,'5 lb'],
      ['CX211','The Payment Consultants LLC DBA Legacy Logistics','DA3','Alejandro Trejo','ON_TIME','Standard Parcel Electric - Rivian MEDIUM',499,158,0,158,287,287,0,0,'11:40am',0,'15 lb'],
      ['CX198','The Payment Consultants LLC DBA Legacy Logistics','DA4','Lorenzo Ball','ON_TIME','Standard Parcel Electric - Rivian MEDIUM',519,184,0,184,323,323,0,0,'11:45am',0,'15 lb'],
      ['CX229','The Payment Consultants LLC DBA Legacy Logistics','DA5','Christian Pacheco','ON_TIME','Standard Parcel Electric - Rivian MEDIUM',486,182,0,182,327,327,1,0,'11:50am',0,'7 lb'],
      ['CX224','The Payment Consultants LLC DBA Legacy Logistics','DA6','Dustin Carson','ON_TIME','Standard Parcel - Extra Large Van - US',513,167,0,167,338,338,0,0,'12:05pm',0,'7 lb'],
      ['CX999','Different Delivery Company','DA9','Other Driver','ON_TIME','Standard Parcel',400,150,0,150,250,250,0,0,'12:10pm',0,'1 lb']
    ],
    routeDetails:{},
    routeDetailsCount:0
  };
  globalThis.__headerIndex=morningPlanHeaderIndex([state.importedFile.headers,...state.importedFile.rows]);
  globalThis.__preflight=importPreflight();
  applyImport();
  globalThis.__routes=JSON.parse(JSON.stringify(state.morningRoutes));
  globalThis.__waveLabels=JSON.parse(JSON.stringify(morningCoreWaveLabels()));
  globalThis.__sections=morningSections(allMorningRows()).map(section=>({
    label:section.label,
    wave:section.wave,
    routes:section.rows.filter(row=>!row._blank).map(row=>row.route)
  }));
`, context);

assert(context.__headerIndex === 0, 'Routes_DJT6 Planned Departure Time header must be recognized as a Morning plan');
assert(context.__preflight.ready, 'Routes_DJT6-only preflight should be ready without a staging column');
assert(context.__preflight.included === 6 && context.__preflight.excluded === 1, 'Legal-name DSP matching should keep Legacy Logistics and reject another company');
assert(context.__routes.length === 6, 'Routes_DJT6-only import should create all six valid CX rows');
assert(context.__routes.every(row => row.dsp === 'LLOL'), 'Imported legal company name must normalize to the configured DSP code');
assert(context.__routes.map(row => row.wave).join(',') === '11:20 AM,11:25 AM,11:40 AM,11:45 AM,11:50 AM,12:05 PM', 'Planned Departure Time values must become six earliest-first wave times');
assert(context.__routes.every(row => row.staging === '—'), 'Missing staging must remain an editable placeholder');
assert(context.__routes[0].stops === 181 && context.__routes[0].packages === 330, 'All stops and total deliveries must map to stop/package counts');
assert(context.__routes[5].service === 'Standard Parcel - Extra Large Van - US', 'Delivery Service Type must be retained');
assert(context.__routes.every(row => !row.plannedRts), 'Planned Departure Time must set waves without filling Planned RTS');
assert(context.__sections.slice(0, 6).every((section, index) => section.label === `WAVE ${index + 1}` && section.routes.length === 1), 'Six detected times must render as Wave 1 through Wave 6');
assert(context.__waveLabels.map(row => row.value).join(',') === '11:20 (1),11:25 (1),11:40 (1),11:45 (1),11:50 (1),12:05 (1)', 'A fresh day-file import must replace stale footer overrides with the six imported wave times');

console.log('Routes_DJT6-only six-wave import contract passed');
