const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'cloud-sync.js'), 'utf8');
const operationDate = '2026-08-16';
const permanentDate = '2000-01-01';
const sharedSnapshots = new Map([
  [operationDate, { payload: { morningRoutes: [{ routeUid: 'route-1', route: 'CX101' }] }, revision: 7 }],
  [permanentDate, { payload: { driverNameAliases: {} }, revision: 3 }]
]);

const realSetTimeout = setTimeout;
const wait = ms => new Promise(resolve => realSetTimeout(resolve, ms));

function storageHarness() {
  const values = new Map();
  return {
    get length() { return values.size; },
    key(index) { return [...values.keys()][index] || null; },
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(String(key), String(value)); },
    removeItem(key) { values.delete(String(key)); }
  };
}

function dispatcherHarness(userId) {
  const session = { access_token: `token-${userId}`, user: { id: userId, email: `${userId}@example.test` } };
  const counts = { membership: 0, station: 0, snapshot: 0, anonymous: 0 };
  const events = [];
  let membershipMode = 'ready';
  let heldMembershipResolvers = [];
  let authListener = null;

  const client = {
    auth: {
      getSession: async () => ({ data: { session }, error: null }),
      onAuthStateChange: listener => {
        authListener = listener;
        return { data: { subscription: { unsubscribe() {} } } };
      },
      signInAnonymously: async () => {
        counts.anonymous += 1;
        return { data: { session }, error: null };
      },
      signOut: async () => ({ error: null })
    },
    from(table) {
      let date = '';
      return {
        select() { return this; },
        eq(field, value) { if (field === 'operation_date') date = value; return this; },
        maybeSingle: async () => {
          if (table === 'memberships') {
            counts.membership += 1;
            if (membershipMode === 'timeout') return new Promise(() => {});
            if (membershipMode === 'held') {
              return new Promise(resolve => heldMembershipResolvers.push(resolve));
            }
            return { data: { user_id: userId, role: 'dispatcher', display_name: userId, active: true }, error: null };
          }
          if (table === 'station_memberships') {
            counts.station += 1;
            return { data: { station_id: 'station-1' }, error: null };
          }
          if (table === 'workspace_snapshots') {
            counts.snapshot += 1;
            const row = sharedSnapshots.get(date);
            return row
              ? { data: { ...row, updated_at: `${operationDate}T12:00:00.000Z`, updated_by: 'owner-1' }, error: null }
              : { data: null, error: null };
          }
          return { data: null, error: null };
        }
      };
    },
    rpc: async name => ({ data: name === 'relayops_admin_status' ? false : null, error: null }),
    removeChannel() {}
  };

  // Keep the regression fast while still exercising the real timeout path.
  // Only the configured four-second request deadline is shortened; longer
  // backoff/poll timers retain their production behavior and are unref'ed.
  function harnessSetTimeout(fn, milliseconds, ...args) {
    const delay = Number(milliseconds) === 4000 && membershipMode === 'timeout' ? 15 : milliseconds;
    const timer = realSetTimeout(fn, delay, ...args);
    if (Number(delay) >= 10000) timer?.unref?.();
    return timer;
  }

  const localStorage = storageHarness();
  const context = {
    console, URL, Date, Error, TypeError, Promise,
    setTimeout: harnessSetTimeout,
    clearTimeout,
    location: { href: `https://relayops.example.test/?date=${operationDate}` },
    document: { visibilityState: 'visible', addEventListener() {} },
    window: {
      addEventListener() {},
      localStorage,
      sessionStorage: storageHarness(),
      RELAYOPS_CLOUD_CONFIG: {
        supabaseUrl: 'https://relayops.supabase.co',
        supabaseAnonKey: 'anon',
        organizationId: 'org-1',
        stationId: 'station-1',
        requestTimeoutMs: 4000,
        pollIntervalMs: 120000,
        idlePollIntervalMs: 600000,
        persistentPollIntervalMs: 1800000
      },
      supabase: { createClient: () => client },
      RelayOpsApp: {
        operationDate: () => operationDate,
        operationDateIsWritable: () => true,
        sharedState: () => ({ morningRoutes: [] }),
        persistentState: () => ({}),
        resetDailyState() {},
        resetSharedDailyState() {},
        applySharedState() {},
        applyPersistentState() {}
      }
    }
  };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: `cloud-sync-${userId}.js` });
  const cloud = context.window.RelayOpsCloud;
  cloud.on(event => events.push({
    type: event.type,
    reason: event.reason || '',
    code: event.error?.code || '',
    message: event.error?.message || ''
  }));
  return {
    cloud, counts, events,
    timeoutMembership() { membershipMode = 'timeout'; },
    holdMembership() { membershipMode = 'held'; },
    releaseMembership() {
      membershipMode = 'ready';
      const result = { data: { user_id: userId, role: 'dispatcher', display_name: userId, active: true }, error: null };
      const resolvers = heldMembershipResolvers;
      heldMembershipResolvers = [];
      resolvers.forEach(resolve => resolve(result));
    },
    refreshToken() { authListener?.('TOKEN_REFRESHED', session); },
    repeatSignIn() { authListener?.('SIGNED_IN', session); },
    clearEvents() { events.length = 0; }
  };
}

(async () => {
  const first = dispatcherHarness('dispatcher-1');
  const second = dispatcherHarness('dispatcher-2');

  await Promise.all([first.cloud.init(), second.cloud.init()]);
  for (const dispatcher of [first, second]) {
    assert.strictEqual(dispatcher.cloud.membership?.role, 'dispatcher', 'Initial dispatcher membership was not verified');
    assert.deepStrictEqual(
      dispatcher.counts,
      { membership: 1, station: 1, snapshot: 2, anonymous: 0 },
      'Initial shared workspace hydration made an unexpected number of requests'
    );
    dispatcher.clearEvents();
    dispatcher.refreshToken();
    dispatcher.repeatSignIn();
    await wait(0);
    assert.deepStrictEqual(
      dispatcher.counts,
      { membership: 1, station: 1, snapshot: 2, anonymous: 0 },
      'A same-user auth refresh started another access or workspace load'
    );
    assert(!dispatcher.events.some(event => event.type === 'auth' || event.type === 'reconnecting'), 'A same-user auth refresh changed healthy sync status');
    dispatcher.clearEvents();
    dispatcher.timeoutMembership();
  }

  // Two UI reconnect triggers can overlap (for example, focus plus the status
  // button) while another dispatcher is doing the same thing. A slow access
  // query must stay a transient connection condition, not become a false
  // "station access" failure or multiply requests against a busy database.
  const reconnects = await Promise.allSettled([
    first.cloud.retryLinkAccess(), first.cloud.retryLinkAccess(),
    second.cloud.retryLinkAccess(), second.cloud.retryLinkAccess()
  ]);
  await wait(30);

  reconnects.forEach((result, index) => {
    assert.strictEqual(
      result.status,
      'fulfilled',
      `Transient membership timeout escaped reconnect ${index + 1}: ${result.reason?.message || result.reason || ''}`
    );
  });

  for (const dispatcher of [first, second]) {
    assert.strictEqual(dispatcher.cloud.membership?.role, 'dispatcher', 'A transient timeout discarded an already verified membership');
    assert.strictEqual(dispatcher.counts.membership, 2, 'Overlapping reconnects fanned out membership checks');
    assert.strictEqual(dispatcher.counts.station, 1, 'Reconnect continued into a station query after membership timed out');
    assert.strictEqual(dispatcher.counts.snapshot, 2, 'Reconnect continued into snapshot downloads after membership timed out');
    assert.strictEqual(dispatcher.counts.anonymous, 0, 'A transient membership timeout replaced a valid dispatcher session');
    assert(
      !dispatcher.events.some(event => event.type === 'access-denied' || event.type === 'link-access-error'),
      `Transient timeout was misreported as an access failure: ${JSON.stringify(dispatcher.events)}`
    );
  }

  const slow = dispatcherHarness('dispatcher-slow-init');
  slow.holdMembership();
  const slowInit = slow.cloud.init();
  for (let attempt = 0; attempt < 20 && slow.counts.membership < 1; attempt += 1) await Promise.resolve();
  assert.strictEqual(slow.counts.membership, 1, 'Slow initialization did not reach its first membership request');
  slow.clearEvents();
  const deferredInitRetry = await slow.cloud.retryLinkAccess();
  assert.strictEqual(deferredInitRetry?.deferred, true, 'Reconnect did not defer to the active initialization');
  assert.strictEqual(deferredInitRetry?.initializing, true, 'Slow initialization deferral lost its reason');
  assert.strictEqual(deferredInitRetry?.session?.user?.id, 'dispatcher-slow-init', 'Slow initialization deferral discarded its session');
  assert.deepStrictEqual(
    slow.counts,
    { membership: 1, station: 0, snapshot: 0, anonymous: 0 },
    'Reconnect fanned out requests while initialization already owned the request chain'
  );
  assert(!slow.events.some(event => event.type === 'link-access-error'), 'Slow initialization was mislabeled as an access failure');
  slow.releaseMembership();
  await slowInit;
  assert.strictEqual(slow.cloud.membership?.role, 'dispatcher', 'Slow initialization did not finish after its access check resumed');

  const signingOut = dispatcherHarness('dispatcher-sign-out');
  await signingOut.cloud.init();
  signingOut.clearEvents();
  signingOut.timeoutMembership();
  const pendingRetry = signingOut.cloud.retryLinkAccess();
  await signingOut.cloud.signOut();
  const cancelledRetry = await pendingRetry;
  assert.strictEqual(cancelledRetry?.cancelled, true, 'Sign-out did not cancel the pending reconnect');
  assert.strictEqual(signingOut.cloud.session, null, 'Pending reconnect restored a session after explicit sign-out');
  assert.strictEqual(signingOut.cloud.membership, null, 'Pending reconnect restored membership after explicit sign-out');
  assert.strictEqual(signingOut.counts.anonymous, 0, 'Pending reconnect created a replacement anonymous session after sign-out');
  assert.strictEqual(signingOut.counts.station, 1, 'Pending reconnect continued into station access after sign-out');
  assert.strictEqual(signingOut.counts.snapshot, 2, 'Pending reconnect continued into workspace downloads after sign-out');
  assert(
    !signingOut.events.some(event => event.type === 'link-access-error' || event.type === 'access-denied' || event.type === 'ready'),
    `Cancelled reconnect emitted a stale terminal event after sign-out: ${JSON.stringify(signingOut.events)}`
  );

  console.log('Two-dispatcher membership timeout reconnect test passed');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
