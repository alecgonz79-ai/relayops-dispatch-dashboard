const fs = require('fs');

function read(path) {
  return fs.readFileSync(require.resolve(path), 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const workflow = read('../.github/workflows/pages.yml');
const connector = read('../live-connector/server.mjs');
const app = read('../app.js');
const cloud = read('../cloud-sync.js');
const fleetProxy = read('../supabase/functions/fleet-live-proxy/index.ts');
const linkMigration = read('../supabase/migrations/20260720_link_access_admin_pin.sql');

assert(/Build public site allowlist/.test(workflow), 'GitHub Pages must be assembled from an explicit public-file allowlist');
assert(/Run release regression gate/.test(workflow), 'GitHub Pages publishing must be gated by the release regression suite');
assert(/node --check app\.js/.test(workflow) && /for test_file in tests\/\*\.cjs/.test(workflow), 'The Pages gate must run browser syntax checks and every CJS regression');
assert(/path:\s*_site/.test(workflow), 'GitHub Pages must upload only the assembled _site directory');
assert(!/upload-pages-artifact@[\s\S]{0,180}?path:\s*\.(?:\s|$)/.test(workflow), 'GitHub Pages must never publish the repository root');

assert(/CONNECTOR_TOKEN/.test(connector), 'The live fleet connector must require a server-side bearer token');
assert(/req\.headers\.authorization\s*!==\s*`Bearer \$\{CONNECTOR_TOKEN\}`/.test(connector), 'The connector must reject requests without the configured bearer token');
assert(/AMAZON_ALLOWED_HOSTS/.test(connector) && /FLEETOS_ALLOWED_HOSTS/.test(connector), 'Both authenticated upstreams need explicit host allowlists');
assert(/url\.protocol\s*!==\s*'https:'/.test(connector), 'Authenticated upstream calls must require HTTPS');
assert(!/searchParams\.get\(['"](?:amazon|fleetos)(?:Json|Portal)Url/.test(connector), 'Callers must not be able to override credentialed upstream URLs');
assert(!/ALLOW_ORIGIN\s*=\s*env\.ALLOW_ORIGIN\s*\|\|\s*['"]\*['"]/.test(connector), 'CORS must not default to every origin');

assert(/FLEET_PROXY_ALLOWED_ORIGINS/.test(fleetProxy)&&/allowedOrigins\.includes\(origin\)/.test(fleetProxy), 'Fleet Edge proxy must use a controlled exact-origin CORS list');
assert(!/Access-Control-Allow-Origin['"]?\s*:\s*['"]\*['"]/.test(fleetProxy), 'Fleet Edge proxy must never allow every origin');
assert(/auth\.getUser\(token\)/.test(fleetProxy), 'Fleet Edge proxy must validate the signed-in Supabase user access token');
assert(/from\(['"]memberships['"]\)[\s\S]{0,260}?eq\(['"]active['"],true\)/.test(fleetProxy), 'Fleet Edge proxy must require active organization membership');
assert(/from\(['"]stations['"]\)[\s\S]{0,260}?eq\(['"]organization_id['"],organizationId\)/.test(fleetProxy), 'Fleet Edge proxy must validate station access inside the selected organization');
assert(/Deno\.env\.get\(['"]FLEET_CONNECTOR_URL['"]\)/.test(fleetProxy)&&/Deno\.env\.get\(['"]FLEET_CONNECTOR_TOKEN['"]\)/.test(fleetProxy), 'Fleet Edge proxy must get the private connector URL/token only from server secrets');
assert(/Authorization:`Bearer \$\{connectorToken\}`/.test(fleetProxy), 'Fleet Edge proxy must authenticate to the private connector server-side');
assert(!/request\.json\(\)/.test(fleetProxy)&&!/searchParams\.get/.test(fleetProxy), 'Fleet Edge proxy must not accept caller-provided upstream URLs or request bodies');
assert(/new URL\(request\.url\)\.search/.test(fleetProxy), 'Fleet Edge proxy must reject caller query parameters entirely');

assert(/async function accessToken\(\)[\s\S]{0,220}?client\.auth\.getSession\(\)/.test(cloud), 'Cloud bridge must fetch the current Supabase access token without persisting it separately');
assert(/headers\.Authorization=`Bearer \$\{accessToken\}`/.test(app), 'Fleet refresh must send the signed-in Supabase user access token to the authenticated proxy');
assert(/x-relayops-organization-id/.test(app)&&/x-relayops-station-id/.test(app), 'Fleet refresh must send its public workspace scope for membership validation');
assert(/url\.protocol!==['"]https:['"][\s\S]{0,100}?local/.test(app), 'Fleet proxy endpoint validation must require HTTPS with a localhost-only development exception');
assert(/url\.pathname\.split\(['"]\/['"]\)\.includes\(['"]fleet-live-proxy['"]\)/.test(app), 'Dashboard must accept only the fleet-live-proxy endpoint contract, never the private connector URL');
assert(!/searchParams\.set\(['"]amazonPortalUrl/.test(app)&&!/searchParams\.set\(['"]fleetosPortalUrl/.test(app), 'Dashboard must not let callers forward Amazon/FleetOS upstream URLs');
assert(/Wait for the automatic shared cloud session before authenticated Fleet refresh/.test(app), 'Cloud Fleet refresh must wait for automatic shared-link access');

assert(/MORNING_SHEETS_DEFAULT_ENDPOINT\s*=\s*['"]['"]/.test(app), 'A writable Google Apps Script endpoint must not be hardcoded into the public dashboard');
assert(/role:\s*localStorage\.getItem\(['"]relayops_role['"]\)\s*\|\|\s*['"]viewer['"]/.test(app), 'Fresh or signed-out browsers must not default to the admin UI role');
assert(/signInAnonymously/.test(cloud) && /relayops_link_access:true/.test(cloud), 'Every shared-link browser must receive an automatic restricted Supabase session');
assert(/state\?\.adminPinUnlocked/.test(app) && /OWNER_ADMIN_ACTIONS\.has\(name\)&&!hasOwnerAdminAccess\(\)/.test(app), 'Admin mutations must use the same PIN-unlocked gate as the Admin page');
assert(/unlock_relayops_admin/.test(cloud) && /relayops_admin_status/.test(cloud) && /lock_relayops_admin/.test(cloud), 'Admin PIN unlock, status, and lock must be verified by Supabase RPCs');
assert(/crypt\(candidate_pin,access_row\.admin_pin_hash\)/.test(linkMigration) && /next_failures>=5/.test(linkMigration) && /interval '15 minutes'/.test(linkMigration), 'Admin PIN verification must be hashed and rate-limited server-side');
assert(!app.includes('"6969"') && !app.includes("'6969'"), 'The requested Admin PIN must never be exposed in public application JavaScript');
assert(/handleModalKeydown/.test(app) && /event\.key\s*===\s*['"]Escape['"]/.test(app), 'Dialogs must support Escape and keyboard focus containment');
assert(/id="toast-stack"[^>]*aria-live="polite"/.test(app), 'Status messages must be announced to assistive technology');

console.log('Deployment allowlist, authenticated Fleet proxy, and live-connector security contracts passed');
