# RelayOps live Fleet connector

This folder is the secure backend bridge for true live-pull Fleet data.

The GitHub Pages dashboard cannot safely log into Amazon Logistics or FleetOS directly because browser code would expose credentials and authenticated portal requests are blocked by normal web security rules. Run this connector on a private server instead, then paste its public HTTPS endpoint into Fleet → Live setup.

Fleet → Live setup also stores the dispatcher-facing portal links:

- Amazon Fleet: `https://logistics.amazon.com/fleet-management/#vehicles`
- FleetOS: `https://business.rivian.com/vehicles/tracker`

Those links help dispatchers open the right portals and are sent to the connector as context. The connector still needs server-side JSON/API endpoints, cookies, or approved API access to pull data safely.

## Dashboard endpoint

The dashboard expects:

```http
GET /api/fleet/live
```

The response should be JSON:

```json
{
  "name": "Live Amazon + FleetOS connector",
  "asOf": "2026-07-07T10:00:00.000Z",
  "amazon": [
    {
      "vehicleName": "LLOL EV 21",
      "vin": "7FCEHEB79PN014816",
      "licensePlate": "9ABC123",
      "active": "Active",
      "operationalStatus": "Operational"
    }
  ],
  "fleetos": [
    {
      "vin": "7FCEHEB79PN014816",
      "batteryPercent": 63,
      "rangeMiles": 98,
      "status": "Connected"
    }
  ]
}
```

Amazon is the official source for van name, license plate, Active/Inactive, and Operational/Grounded. FleetOS is the official source for battery percentage and range. The dashboard matches both by VIN.

## Environment variables

Create a `.env` file on the server:

```bash
PORT=8787
ALLOW_ORIGIN=https://alecgonz79-ai.github.io

AMAZON_FLEET_PORTAL_URL=https://logistics.amazon.com/fleet-management/#vehicles
AMAZON_FLEET_JSON_URL=https://logistics.amazon.com/fleet-management/your-observed-json-endpoint
AMAZON_COOKIE=your-secure-server-side-cookie

FLEETOS_PORTAL_URL=https://business.rivian.com/vehicles/tracker
FLEETOS_JSON_URL=https://business.rivian.com/vehicles/tracker/your-observed-json-endpoint
FLEETOS_COOKIE=your-secure-server-side-cookie
```

The exact JSON endpoints may need to be captured from the authenticated browser Network tab or replaced with approved API endpoints if Amazon/Rivian provide them to your DSP. Do not put cookies, passwords, or session tokens in the dashboard.

## Run locally

```bash
node live-connector/server.mjs
```

Then set Fleet → Live setup to:

```text
http://localhost:8787/api/fleet/live
```

If the endpoint is missing or offline, the dashboard will open the upload/paste fallback so dispatchers can still build the morning sheet without trusting stale battery/status data.
