# RelayOps live Fleet connector

This folder is the secure backend bridge for true live-pull Fleet data.

The GitHub Pages dashboard cannot safely log into Amazon Logistics or FleetOS directly because browser code would expose credentials and authenticated portal requests are blocked by normal web security rules. Run this connector on a private server. The dashboard must call the authenticated `supabase/functions/fleet-live-proxy` Edge Function, which then calls this connector with a server-side token.

Fleet Health → Authenticated Fleet proxy also stores the dispatcher-facing portal links:

- Amazon Fleet: `https://logistics.amazon.com/fleet-management/#vehicles`
- FleetOS: `https://business.rivian.com/vehicles/tracker`

Those links only help dispatchers open the right portals. They are not sent to the connector. The connector uses only server-side JSON/API endpoints, cookies, or approved API access configured in its environment.

## Private proxy-to-connector contract

Only the authenticated Edge Function should call:

```http
GET /api/fleet/live
Authorization: Bearer FLEET_CONNECTOR_TOKEN
```

The response is JSON:

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
CONNECTOR_TOKEN=generate-a-long-random-server-secret

AMAZON_FLEET_PORTAL_URL=https://logistics.amazon.com/fleet-management/#vehicles
AMAZON_FLEET_JSON_URL=https://logistics.amazon.com/fleet-management/your-observed-json-endpoint
AMAZON_ALLOWED_HOSTS=logistics.amazon.com
AMAZON_COOKIE=your-secure-server-side-cookie

FLEETOS_PORTAL_URL=https://business.rivian.com/vehicles/tracker
FLEETOS_JSON_URL=https://business.rivian.com/vehicles/tracker/your-observed-json-endpoint
FLEETOS_ALLOWED_HOSTS=business.rivian.com
FLEETOS_COOKIE=your-secure-server-side-cookie
```

The connector rejects query-provided upstream URLs and only fetches HTTPS hosts in the two explicit allowlists. This prevents portal cookies from being forwarded to an attacker-controlled server. The exact JSON endpoints may need to be captured from the authenticated browser Network tab or replaced with approved API endpoints if Amazon/Rivian provide them to your DSP. Do not put cookies, passwords, or portal session tokens in the dashboard.

## Run locally

```bash
node live-connector/server.mjs
```

For local connector development, test this private endpoint with a server-side HTTP client:

```text
http://localhost:8787/api/fleet/live
```

The calling service must attach `Authorization: Bearer <CONNECTOR_TOKEN>`. Never paste this private endpoint or token into the dashboard. For the multi-user deployment, deploy `supabase/functions/fleet-live-proxy`, set its `FLEET_CONNECTOR_URL` and `FLEET_CONNECTOR_TOKEN` secrets, and save only the Edge Function HTTPS URL in Fleet Health → Authenticated Fleet proxy. See [`../supabase/functions/fleet-live-proxy/README.md`](../supabase/functions/fleet-live-proxy/README.md).

If the endpoint is missing or offline, the dashboard will open the upload/paste fallback so dispatchers can still build the morning sheet without trusting stale battery/status data.
