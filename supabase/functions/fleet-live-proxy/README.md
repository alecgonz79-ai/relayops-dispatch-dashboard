# Authenticated Fleet live proxy

This Edge Function is the only Fleet live endpoint that the public RelayOps dashboard should call.

The browser sends its current Supabase user access token plus the configured RelayOps organization and station IDs. The function verifies the user, active organization membership, and station access through the existing row-level-security policies. Only then does it call the private `live-connector` with a server-side secret.

Set these Supabase function secrets:

```bash
supabase secrets set \
  FLEET_PROXY_ALLOWED_ORIGINS=https://alecgonz79-ai.github.io \
  FLEET_CONNECTOR_URL=https://PRIVATE-CONNECTOR.example.com/api/fleet/live \
  FLEET_CONNECTOR_TOKEN=LONG-RANDOM-CONNECTOR-SECRET
```

For more than one dashboard origin, use a comma-separated exact list for `FLEET_PROXY_ALLOWED_ORIGINS`. Do not use `*`.

Deploy it:

```bash
supabase functions deploy fleet-live-proxy
```

Then save this HTTPS URL in Fleet Health → More fleet tools → Authenticated Fleet proxy:

```text
https://YOUR_PROJECT_REF.supabase.co/functions/v1/fleet-live-proxy
```

Do not put `FLEET_CONNECTOR_TOKEN`, Amazon/FleetOS cookies, portal passwords, or upstream URLs in `app.js`, `supabase/config.js`, local storage, or the endpoint field. The function rejects caller query strings and bodies and always uses `FLEET_CONNECTOR_URL` from server secrets.
