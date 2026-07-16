import http from 'node:http';
import fs from 'node:fs';

function loadDotEnv(path = '.env') {
  if (!fs.existsSync(path)) return {};
  return Object.fromEntries(
    fs.readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#') && line.includes('='))
      .map(line => {
        const index = line.indexOf('=');
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
        return [key, value];
      })
  );
}

const env = { ...loadDotEnv(), ...process.env };

const PORT = Number(env.PORT || 8787);
const ALLOW_ORIGIN = env.ALLOW_ORIGIN || '';
const CONNECTOR_TOKEN = env.CONNECTOR_TOKEN || '';

function allowedHosts(value = '') {
  return String(value).split(',').map(host => host.trim().toLowerCase()).filter(Boolean);
}

function trustedPortalUrl(value, hosts, label) {
  if (!value) return '';
  const url = new URL(value);
  if (url.protocol !== 'https:') throw new Error(`${label} URL must use HTTPS`);
  if (!hosts.length || !hosts.includes(url.hostname.toLowerCase())) throw new Error(`${label} URL host is not allowlisted`);
  return url.toString();
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    ...(ALLOW_ORIGIN ? { 'access-control-allow-origin': ALLOW_ORIGIN, vary: 'origin' } : {}),
    'access-control-allow-methods': 'GET,OPTIONS',
    'access-control-allow-headers': 'content-type,authorization'
  });
  res.end(JSON.stringify(data));
}

function normalizeAmazon(row = {}) {
  return {
    source: 'Amazon fleet list',
    vehicleName: row.vehicleName || row.name || row.displayName || row.assetName || row.vehicle_name || '',
    vin: row.vin || row.VIN || row.vehicleVin || row.vehicle_vin || '',
    licensePlate: row.licensePlate || row.license_plate || row.plate || row.tag || '',
    active: row.active || row.activeStatus || row.active_status || row.status || '',
    operationalStatus: row.operationalStatus || row.operational_status || row.operational || row.groundedStatus || ''
  };
}

function normalizeFleetOS(row = {}) {
  return {
    source: 'FleetOS tracker',
    vin: row.vin || row.VIN || row.vehicleVin || row.vehicle_vin || '',
    batteryPercent: row.batteryPercent ?? row.battery_percent ?? row.battery ?? row.stateOfCharge ?? row.state_of_charge ?? row.soc,
    rangeMiles: row.rangeMiles ?? row.range_miles ?? row.miles ?? row.estimatedRange ?? row.estimated_range,
    status: row.status || row.connectionStatus || row.connection_status || row.chargeStatus || ''
  };
}

async function fetchPortalJson(url, cookie = '', hosts = [], label = 'Portal') {
  if (!url) return [];
  const trustedUrl = trustedPortalUrl(url, hosts, label);
  const response = await fetch(trustedUrl, {
    headers: {
      accept: 'application/json',
      ...(cookie ? { cookie } : {})
    }
  });
  if (!response.ok) throw new Error(`${label} returned ${response.status}`);
  const json = await response.json();
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.vehicles)) return json.vehicles;
  if (Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.rows)) return json.rows;
  return [];
}

async function liveFleetPayload() {
  const amazonUrl = env.AMAZON_FLEET_JSON_URL;
  const fleetosUrl = env.FLEETOS_JSON_URL;
  const amazonHosts = allowedHosts(env.AMAZON_ALLOWED_HOSTS);
  const fleetosHosts = allowedHosts(env.FLEETOS_ALLOWED_HOSTS);
  const [amazonRaw, fleetosRaw] = await Promise.all([
    fetchPortalJson(amazonUrl, env.AMAZON_COOKIE, amazonHosts, 'Amazon Fleet'),
    fetchPortalJson(fleetosUrl, env.FLEETOS_COOKIE, fleetosHosts, 'FleetOS')
  ]);

  return {
    name: 'Live Amazon + FleetOS connector',
    asOf: new Date().toISOString(),
    amazon: amazonRaw.map(normalizeAmazon).filter(row => row.vin),
    fleetos: fleetosRaw.map(normalizeFleetOS).filter(row => row.vin)
  };
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/health') return sendJson(res, 200, { ok: true });
  if (url.pathname !== '/api/fleet/live') return sendJson(res, 404, { error: 'Not found' });
  if (!CONNECTOR_TOKEN) return sendJson(res, 503, { error: 'Connector token is not configured' });
  if (req.headers.authorization !== `Bearer ${CONNECTOR_TOKEN}`) return sendJson(res, 401, { error: 'Unauthorized' });

  try {
    const payload = await liveFleetPayload();
    payload.portalLinks = {
      amazon: env.AMAZON_FLEET_PORTAL_URL || 'https://logistics.amazon.com/fleet-management/#vehicles',
      fleetos: env.FLEETOS_PORTAL_URL || 'https://business.rivian.com/vehicles/tracker'
    };
    sendJson(res, 200, payload);
  } catch (error) {
    sendJson(res, 502, {
      error: 'Live fleet pull failed',
      detail: error?.message || 'Unknown connector error'
    });
  }
});

server.listen(PORT, () => {
  console.log(`RelayOps live Fleet connector listening on http://localhost:${PORT}`);
});
