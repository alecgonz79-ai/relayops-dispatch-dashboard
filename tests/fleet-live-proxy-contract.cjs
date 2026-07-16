const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) { if (!condition) throw new Error(message); }

const storage = new Map();
const app = { innerHTML: '' };
const fileInput = { addEventListener() {}, click() {} };
const element = () => ({
  addEventListener() {}, appendChild() {}, remove() {}, insertAdjacentHTML() {}, click() {}, focus() {}, blur() {}, select() {}, setSelectionRange() {},
  classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {}, querySelector() { return null; }, querySelectorAll() { return []; }
});
let fetchCall = null;
const cloud = {
  configured: true,
  session: { user: { id: 'dispatcher-1' } },
  async accessToken() { return 'signed-in-supabase-jwt'; },
  workspaceContext() { return { organizationId: 'c98e010b-b1a5-4757-92fa-8a8755b119bc', stationId: '8fb05351-6ab6-459c-9139-309f6bdf453a' }; },
  on() {}, init: async () => ({ configured: true })
};
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
  fetch: async (url, options) => {
    fetchCall = { url, options };
    return {
      ok: true,
      status: 200,
      json: async () => ({
        name: 'Authenticated Fleet fixture',
        asOf: '2026-07-15T12:00:00.000Z',
        amazon: [{ vehicleName: 'EV1', vin: '7FCEHEB79PN014816', active: 'Active', operationalStatus: 'Operational' }],
        fleetos: [{ vin: '7FCEHEB79PN014816', batteryPercent: 91, rangeMiles: 141 }]
      })
    };
  },
  navigator: { clipboard: { writeText: async () => true } },
  window: { scrollTo() {}, open() {}, RelayOpsCloud: cloud },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
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
vm.runInContext('globalThis.__state=state;toast=()=>{};render=()=>{};persist=()=>{};', context);
context.state = context.__state;

async function run() {
  assert(!context.fleetLiveEndpointInfo('http://relayops.example.com/fleet').valid, 'Public HTTP proxy endpoints must be rejected');
  assert(!context.fleetLiveEndpointInfo('https://logistics.amazon.com/fleet-management/').valid, 'Amazon portal URLs must not be accepted as proxy endpoints');
  assert(!context.fleetLiveEndpointInfo('https://private.example.com/api/fleet/live').valid, 'Private connector URLs must not be accepted in the browser');
  assert(!context.fleetLiveEndpointInfo('https://example.supabase.co/functions/v1/fleet-live-proxy?token=secret').valid, 'Proxy endpoint URLs must not contain query parameters or tokens');
  assert(context.fleetLiveEndpointInfo('https://example.supabase.co/functions/v1/fleet-live-proxy').valid, 'HTTPS Edge Function endpoint must be accepted');
  assert(context.fleetLiveEndpointInfo('http://localhost:54321/functions/v1/fleet-live-proxy').valid, 'Localhost HTTP must remain available for development');

  context.state.fleetLiveEndpoint = 'https://example.supabase.co/functions/v1/fleet-live-proxy';
  const vehicles = await context.pullFleetLiveData();
  assert(vehicles.length === 2, 'Authenticated proxy payload must still normalize Amazon and FleetOS VIN rows');
  assert(fetchCall.url === 'https://example.supabase.co/functions/v1/fleet-live-proxy', 'Dashboard must call only the saved proxy URL without caller-supplied portal query parameters');
  assert(fetchCall.options.headers.Authorization === 'Bearer signed-in-supabase-jwt', 'Dashboard must send the current signed-in Supabase user access token');
  assert(fetchCall.options.headers['x-relayops-organization-id'] === cloud.workspaceContext().organizationId, 'Dashboard must send organization scope');
  assert(fetchCall.options.headers['x-relayops-station-id'] === cloud.workspaceContext().stationId, 'Dashboard must send station scope');
  assert(fetchCall.options.credentials === 'omit' && fetchCall.options.cache === 'no-store', 'Fleet proxy call must not send ambient credentials or use a cached response');

  fetchCall = null;
  cloud.session = null;
  cloud.accessToken = async () => '';
  let signedOutError = '';
  try { await context.pullFleetLiveData(); } catch (error) { signedOutError = error.message; }
  assert(/Sign in as an authorized dispatcher/.test(signedOutError), 'Cloud proxy refresh must fail clearly when the dispatcher is signed out');
  assert(fetchCall === null, 'Signed-out browser must not call the cloud Fleet proxy');

  cloud.session = { user: { id: 'dispatcher-1' } };
  cloud.accessToken = async () => 'signed-in-supabase-jwt';
  cloud.workspaceContext = () => ({ organizationId: '', stationId: '' });
  let scopeError = '';
  try { await context.pullFleetLiveData(); } catch (error) { scopeError = error.message; }
  assert(/organization and station must be configured/.test(scopeError), 'Cloud proxy refresh must fail before the request when workspace scope is missing');
  assert(fetchCall === null, 'Missing workspace scope must not call the Fleet proxy');

  console.log('Authenticated Fleet proxy browser contract passed');
}

run().catch(error => { console.error(error); process.exitCode = 1; });
