const fs = require('fs');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const source = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const app = { innerHTML: '' };
const fileInput = { accept: '', files: [], addEventListener() {}, click() {} };
const storage = new Map();
const element = () => ({
  addEventListener() {}, appendChild() {}, prepend() {}, remove() {}, insertAdjacentHTML() {},
  classList: { add() {}, remove() {}, toggle() {} },
  setAttribute() {}, removeAttribute() {}, getAttribute() { return null; },
  style: {}, dataset: {}, focus() {}, blur() {}, click() {}, setSelectionRange() {},
  querySelector() { return null; }, querySelectorAll() { return []; }
});
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout,
  navigator: { clipboard: { writeText: async () => true } },
  location: { href: 'https://relayops.example.test/' },
  history: { replaceState() {} },
  window: { scrollX: 0, scrollY: 0, scrollTo() {}, open() {}, print() {}, addEventListener() {}, removeEventListener() {}, RelayOpsCloud: null },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  },
  document: {
    body: { appendChild() {} }, documentElement: { contains() { return true; } }, activeElement: null,
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : null,
    querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
    addEventListener() {}, removeEventListener() {}, execCommand() { return true; }
  }
};
context.window.document = context.document;
vm.createContext(context);
vm.runInContext(source, context, { filename: 'app.js' });
vm.runInContext('render=()=>{globalThis.__renderCount=(globalThis.__renderCount||0)+1;};', context);

const fleetControls = [
  '[data-fleet-search]',
  '[data-fleet-filter]',
  '[data-rivian-sort]',
  '[data-fleet-view]',
  '[data-fleet-expected]'
];

for (const selector of fleetControls) {
  context.document.activeElement = {
    matches: selectorList => selectorList.includes(selector)
  };
  vm.runInContext('__renderCount=0;deferredCloudRender=false;globalThis.__deferredResult=renderFromCloudEvent();', context);
  assert(context.__deferredResult === false, `${selector} must defer a realtime page rebuild while focused`);
  assert(context.__renderCount === 0, `${selector} was replaced while its native control was open`);
}

context.document.activeElement = { matches: () => false };
vm.runInContext('__renderCount=0;deferredCloudRender=false;globalThis.__idleResult=renderFromCloudEvent();', context);
assert(context.__idleResult === true && context.__renderCount === 1, 'Realtime updates must still render when no Fleet control is active');

console.log('Fleet control focus persistence tests passed');
