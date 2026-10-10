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

const {context}=harness();
vm.runInContext(`
 state.driverProfiles={one:{canonical:'Full Driver Name',nickname:'Short',names:['Full Driver Name','Wrong Name'],tags:['trainer'],phone:'555',flags:[],customFlags:[]}};
 state.driverNameAliases={short:{canonical:'Full Driver Name',display:'Short'}};
 state.driverContacts=[{name:'Full Driver Name',phone:'555'}];
 state.driverLinkedNamesDate='2000-01-01';
 expireLinkedDriverNames();
 if(state.driverProfiles.one.nickname!==''||state.driverProfiles.one.names.length!==1)throw Error('Aliases retained');
 if(state.driverProfiles.one.tags[0]!=='trainer'||state.driverContacts[0].phone!=='555')throw Error('Driver details lost');
 if(Object.keys(state.driverNameAliases).length)throw Error('Legacy aliases retained');
 if(state.driverLinkedNamesDate!==defaultOperationDate())throw Error('Reset date not advanced');
 const saved=persistentWorkspaceState();
 if(saved.driverLinkedNamesDate!==defaultOperationDate())throw Error('Reset date not synced');
`,context);
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
assert(!source.includes('route-trainer-display'),'Manual name input remains');
assert(source.includes('Search Trainers / Helpers'),'Search missing');
assert(source.includes('Reset Linked names'),'Reset button missing');
assert(source.includes("card?.scrollIntoView({block:'start'"),'Expanded card not kept visible');
console.log('Driver tools reset, preservation, search and visibility checks passed');
