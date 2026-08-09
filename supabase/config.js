// Public browser configuration. Row-level security in schema.sql protects data.
window.RELAYOPS_CLOUD_CONFIG = {
  supabaseUrl: 'https://rzaztrmroaxekoimajzb.supabase.co',
  supabaseAnonKey: 'sb_publishable_H6ZPHXDHp0rpb2IgqysrWw_Tr_PHQAg',
  authRedirectUrl: 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/',
  organizationId: 'c98e010b-b1a5-4757-92fa-8a8755b119bc',
  stationId: 'd70f25c4-be18-45be-b13d-49e3bcb9b124',
  // Conservative shared-workspace limits. The sync client treats these as
  // upper bounds, so dispatchers keep collaborating without creating a hot
  // polling, retry, or oversized-payload loop in Supabase.
  pollIntervalMs: 60000,
  idlePollIntervalMs: 300000,
  persistentPollIntervalMs: 600000,
  saveDebounceMs: 5000,
  maxAutomaticSaveRetries: 5,
  maxDailyPayloadBytes: 2 * 1024 * 1024,
  maxPersistentPayloadBytes: 4 * 1024 * 1024
};
