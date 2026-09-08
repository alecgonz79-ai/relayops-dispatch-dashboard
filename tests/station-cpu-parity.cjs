const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const cloudSource = fs.readFileSync(path.join(root, 'cloud-sync.js'), 'utf8');
const configSource = fs.readFileSync(path.join(root, 'supabase/config.js'), 'utf8');
const stationSource = fs.readFileSync(path.join(root, 'station-workspace.js'), 'utf8');
// Keep the clock implementation identical to the existing CPU proof. No
// production endpoint is contacted: every SDK operation below is a local fake.
const clockSource = fs.readFileSync(path.join(__dirname, 'cloud-cpu-usage-proof.cjs'), 'utf8').split('function dispatcherHarness(')[0];
const {FakeClock, fakeDate, storageHarness, settle} = new Function('require', '__dirname', `${clockSource}\nreturn {FakeClock,fakeDate,storageHarness,settle};`)(require, __dirname);
const clone = value => JSON.parse(JSON.stringify(value));
const DAY = '2026-09-08';
const PERMANENT = '2000-01-01';

function harness(code, database = new Map()) {
  const clock = new FakeClock(Date.parse(`${DAY}T19:00:00Z`));
  const queries = [], rpcs = [], events = [];
  const documentListeners = {}, windowListeners = {};
  const session = {access_token: 'local-test-token', user: {id: 'dispatcher-test', email: 'dispatcher@example.test'}};
  const state = {daily: {}, persistent: {}};
  let authListener, membershipMode = 'ready', writerMode = 'ready', writable = true, channels = 0, anonymous = 0;
  const location = new URL(`https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/?station=${code}&date=${DAY}`);
  const localStorage = storageHarness();
  const math = Object.create(Math);math.random = () => 0.5;
  const context = {
    console, URL, URLSearchParams, Error, TypeError, Promise,
    Date: fakeDate(clock), Math: math,
    setTimeout: clock.setTimeout.bind(clock), clearTimeout: clock.clearTimeout.bind(clock),
    location, localStorage,
    document: {visibilityState: 'visible', addEventListener(name, fn) {documentListeners[name] = fn;}},
    window: {
      location, localStorage, sessionStorage: storageHarness(),
      addEventListener(name, fn) {windowListeners[name] = fn;},
      RelayOpsApp: {
        operationDate: () => DAY, operationDateIsWritable: () => writable,
        sharedState: () => clone(state.daily), persistentState: () => clone(state.persistent),
        resetDailyState() {state.daily = {};}, resetSharedDailyState() {state.daily = {};},
        applySharedState(payload) {state.daily = clone(payload);},
        applyPersistentState(payload) {state.persistent = clone(payload);}
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(configSource, context, {filename: 'supabase/config.js'});
  vm.runInContext(stationSource, context, {filename: 'station-workspace.js'});
  const config = context.window.RELAYOPS_CLOUD_CONFIG;
  assert.equal(context.window.RelayOpsStation.code, code);
  assert.equal(config.stationId, config.stations[code].stationId);
  // Both stations can use one backend. Only the composite station/date key
  // resolves a row; two stations' same-day revisions are independent.
  const snapshotKey = date => `${config.stationId}|${date}`;
  const snapshots = {
    get(date) {return database.get(snapshotKey(date));},
    set(date, row) {database.set(snapshotKey(date), row);return this;}
  };
  for (const [date, row] of [
    [DAY, {station_id: config.stationId, operation_date: DAY, revision: 2, payload: {stationCode: code, morningRoutes: [{routeUid: 'r1', route: 'CX100'}]}, updated_at: `${DAY}T19:00:00Z`}],
    [PERMANENT, {station_id: config.stationId, operation_date: PERMANENT, revision: 3, payload: {stationCode: code, driverNameAliases: {driver: 'Driver Name'}}, updated_at: `${DAY}T19:00:00Z`}]
  ]) if (!snapshots.get(date)) snapshots.set(date, row);
  const client = {
    auth: {
      getSession: async () => ({data: {session}, error: null}),
      onAuthStateChange(listener) {authListener = listener;return {data: {subscription: {unsubscribe() {}}}};},
      signInAnonymously: async () => {anonymous++;return {data: {session}, error: null};},
      signOut: async () => ({error: null})
    },
    from(table) {
      const filters = {};let selected = '';
      return {
        select(fields) {selected = fields;return this;},
        eq(field, value) {filters[field] = value;return this;},
        async maybeSingle() {
          queries.push({table, selected, filters: {...filters}});
          if (table === 'memberships') return membershipMode === 'busy'
            ? {data: null, error: {code: 'PGRST003', message: 'Timed out acquiring connection from the connection pool'}}
            : {data: {user_id: session.user.id, role: 'dispatcher', active: true}, error: null};
          assert.equal(filters.station_id, config.stationId, `${code}: a read escaped its captured station`);
          if (table === 'station_memberships') return {data: {station_id: config.stationId}, error: null};
          assert.equal(table, 'workspace_snapshots');
          const source = snapshots.get(filters.operation_date);
          if (!source) return {data: null, error: null};
          const data = clone(source);if (!/\bpayload\b/.test(selected)) delete data.payload;
          return {data, error: null};
        }
      };
    },
    rpc(name, args) {
      rpcs.push({name, args: clone(args || {})});
      if (name === 'relayops_admin_status') return Promise.resolve({data: false, error: null});
      assert.equal(name, 'save_workspace_snapshot_v5', 'An installed v5 writer must not fall back to extra v4 writes');
      assert.equal(args.target_station, config.stationId, `${code}: a save escaped its captured station`);
      if (writerMode === 'timeout') return new Promise(() => {});
      const source = snapshots.get(args.target_date);
      if (writerMode === 'conflict' || args.expected_revision !== source.revision) return Promise.resolve({data: {status: 'conflict', revision: source.revision}, error: null});
      const next = {...source, revision: source.revision + 1, payload: clone(args.new_payload)};
      snapshots.set(args.target_date, next);
      return Promise.resolve({data: {status: 'saved', revision: next.revision, operation_date: args.target_date, updated_at: new Date(clock.now).toISOString()}, error: null});
    },
    channel() {channels++;throw new Error('Realtime channels must remain disabled');},
    removeChannel() {}
  };
  context.window.supabase = {createClient: () => client};
  vm.runInContext(cloudSource, context, {filename: `cloud-sync-${code}.js`});
  const cloud = context.window.RelayOpsCloud;
  cloud.on(event => events.push(event));
  const counts = () => ({
    membership: queries.filter(row => row.table === 'memberships').length,
    stationAccess: queries.filter(row => row.table === 'station_memberships').length,
    summaries: queries.filter(row => row.table === 'workspace_snapshots' && !/\bpayload\b/.test(row.selected)).length,
    payloads: queries.filter(row => row.table === 'workspace_snapshots' && /\bpayload\b/.test(row.selected)).length,
    writes: rpcs.filter(row => row.name.startsWith('save_workspace')).length,
    admin: rpcs.filter(row => row.name === 'relayops_admin_status').length,
    channels, anonymous
  });
  return {
    code, cloud, config, clock, state, snapshots, database, localStorage, context, queries, rpcs, events, counts,
    clear() {queries.length = 0;rpcs.length = 0;events.length = 0;},
    membership(mode) {membershipMode = mode;}, writer(mode) {writerMode = mode;}, writable(value) {writable = value;},
    authNoise() {for (let index = 0;index < 50;index++) authListener(index % 2 ? 'SIGNED_IN' : 'TOKEN_REFRESHED', session);},
    hidden(value) {context.document.visibilityState = value ? 'hidden' : 'visible';},
    resume() {windowListeners.focus();documentListeners.visibilitychange();},
    async pollTimer(delay) {const timers = clock.pending(delay);assert.equal(timers.length, 1);await clock.run(timers[0]);}
  };
}

async function proveRegularBudget(code) {
  const h = harness(code);assert.equal(h.cloud.configured, true);
  await h.cloud.init();
  assert.deepEqual(h.counts(), {membership: 1, stationAccess: 1, summaries: 0, payloads: 2, writes: 0, admin: 1, channels: 0, anonymous: 0});
  assert.equal(h.state.daily.morningRoutes[0].route, 'CX100');
  assert.equal(h.state.persistent.driverNameAliases.driver, 'Driver Name');
  h.clear();h.authNoise();await settle();
  assert.equal(h.queries.length + h.rpcs.length, 0, 'Same-user auth noise cannot recheck access or reload data');
  await Promise.all(Array.from({length: 20}, () => h.cloud.currentMembership({refresh: true})));
  assert.equal(h.queries.length, 0, 'Production five-minute membership cache must apply to both stations');
  h.clock.now += 300001;
  await Promise.all(Array.from({length: 20}, () => h.cloud.currentMembership({refresh: true})));
  assert.equal(h.counts().membership, 1);assert.equal(h.counts().stationAccess, 1, 'Expired membership checks must be single-flight');
  h.clear();h.membership('busy');
  const first = h.cloud.retryLinkAccess(), second = h.cloud.retryLinkAccess();
  assert.equal(first, second, 'Reconnect triggers must coalesce');
  assert.equal((await first).deferred, true);
  assert.deepEqual(h.counts(), {membership: 1, stationAccess: 0, summaries: 0, payloads: 0, writes: 0, admin: 0, channels: 0, anonymous: 0});
  assert(h.cloud.membership, 'A busy access check cannot discard verified dispatcher access');
  h.membership('ready');h.clear();
  await h.cloud.save('unchanged');assert.equal(h.rpcs.length, 0, 'Unchanged payloads must not write');
  for (let index = 0;index < 50;index++) {h.state.daily.morningRoutes[0].route = `CX${index}`;h.cloud.schedule('route.edit');}
  assert.equal(h.rpcs.length, 0);assert.equal(h.clock.pending(5000).length, 1);
  await h.clock.run(h.clock.pending(5000)[0]);
  assert.equal(h.counts().writes, 1, 'Fifty route edits must produce one v5 RPC');
  assert.equal(h.snapshots.get(DAY).payload.morningRoutes[0].route, 'CX49');
  const activeBudget = h.counts();h.clear();
  for (let index = 0;index < 50;index++) {
    h.state.persistent.rosteringPlans = {[DAY]: {paycomEntries: [{date: DAY, name: `Roster ${index}`} ]}};
    h.cloud.schedule('rostering.import');
  }
  await h.clock.run(h.clock.pending(5000)[0]);
  assert.equal(h.counts().writes, 1);assert.equal(h.rpcs[0].args.target_date, PERMANENT, 'Rostering changes must write only station-persistent state');
  h.clear();h.hidden(true);
  for (let index = 0;index < 50;index++) {h.state.daily.note = `Hidden ${index}`;h.cloud.schedule('hidden.edit');}
  assert.equal(h.clock.pending(5000).length, 0);
  for (let index = 0;index < 5;index++) {const timer = h.clock.next();assert(timer);await h.clock.run(timer);}
  assert.equal(h.queries.length + h.rpcs.length, 0, 'Hidden tabs must not poll or autosave');
  const queued = JSON.parse(h.localStorage.getItem(`relayops_cloud_queue:${h.config.stationId}:${DAY}`));
  assert.equal(queued.payload.note, 'Hidden 49', 'Pausing hidden network work must preserve the last edit');
  h.hidden(false);h.resume();await settle(100);await h.clock.runDue();await settle(100);
  assert.equal(h.counts().writes, 1, 'Focus and visibility events must flush one queued v5 write');
  assert(h.counts().summaries <= 2 && h.counts().payloads === 0, 'Resume must not duplicate unchanged full payload downloads');
  assert.equal(h.snapshots.get(DAY).payload.note, 'Hidden 49');
  return {activeBudget, resumeBudget: h.counts()};
}

async function proveIdleAndFailureBudgets(code) {
  const idle = harness(code);await idle.cloud.init();idle.clear();
  for (const delay of [60000,60000,300000,300000]) await idle.pollTimer(delay);
  assert.deepEqual(idle.counts(), {membership: 0, stationAccess: 0, summaries: 5, payloads: 0, writes: 0, admin: 0, channels: 0, anonymous: 0}, 'Twelve idle minutes must use four daily plus one persistent summary read');
  const expired = harness(code);expired.writable(false);await expired.cloud.init();expired.clear();
  expired.state.daily.note = 'Expired edit';expired.cloud.schedule('expired.edit');expired.resume();await settle();
  assert.equal(expired.clock.timers.size, 0);assert.equal(expired.queries.length + expired.rpcs.length, 0, 'Historical links must be dormant');

  const conflict = harness(code);await conflict.cloud.init();conflict.clear();conflict.writer('conflict');
  conflict.state.daily.note = 'Conflicting edit';await conflict.cloud.save('conflict');await settle();
  assert.equal(conflict.counts().writes, 1);assert.equal(conflict.counts().payloads, 2);
  assert.equal(conflict.clock.pending(0).length, 0, 'Conflict hydration cannot enqueue an immediate write loop');
  assert.equal(conflict.clock.pending(30000).filter(timer => String(timer.fn).includes('pendingSnapshot')).length, 1);

  const slow = harness(code);await slow.cloud.init();slow.clear();slow.writer('timeout');slow.state.daily.note = 'Timed-out edit';
  const initial = slow.cloud.save('slow');await settle();
  await slow.clock.run(slow.clock.pending(30000)[0]);await initial;
  for (const delay of [30000,60000,120000,300000,300000]) {
    const retry = slow.clock.pending(delay).find(timer => String(timer.fn).includes('pendingSnapshot'));
    assert(retry, 'An automatic retry must use minute-scale bounded backoff');
    await slow.clock.run(retry, {awaitResult: false});await settle();
    const timeout = slow.clock.pending(30000).find(timer => !String(timer.fn).includes('pendingSnapshot'));
    assert(timeout);await slow.clock.run(timeout);await settle(60);
  }
  assert.equal(slow.counts().writes, 6, 'Failed v5 saves stop after one initial plus five retry attempts');
  assert.equal([...slow.clock.timers.values()].filter(timer => String(timer.fn).includes('pendingSnapshot')).length, 0);
  assert(slow.events.some(event => event.reason === 'automatic-retries-paused'));
  assert(slow.localStorage.getItem(`relayops_cloud_queue:${slow.config.stationId}:${DAY}`), 'Retry exhaustion must retain unsaved work');

  for (const [kind, bytes] of [['daily', 2 * 1024 * 1024], ['persistent', 4 * 1024 * 1024]]) {
    const oversized = harness(code);await oversized.cloud.init();oversized.clear();oversized.state[kind].oversized = 'x'.repeat(bytes);
    await assert.rejects(oversized.cloud.save('oversized'), error => error.code === 'cloud_payload_limit');
    assert.equal(oversized.counts().writes, 0, `${kind} payload cap must stop oversized RPCs before the network`);
  }
  return {idle: idle.counts(), conflict: conflict.counts(), timeout: slow.counts()};
}

async function proveSimultaneousStations() {
  const database = new Map();
  const home = harness('DJT6', database), popup = harness('DUR6', database);
  await Promise.all([home.cloud.init(), popup.cloud.init()]);
  assert.equal(database.size, 4, 'One backend must hold separate daily and persistent rows for each station');
  assert.notEqual(home.config.stationId, popup.config.stationId);
  for (const dispatcher of [home, popup]) dispatcher.clear();
  for (let index = 0;index < 50;index++) {
    for (const dispatcher of [home, popup]) {
      dispatcher.state.daily.morningRoutes[0].route = `${dispatcher.code}-CX${index}`;
      dispatcher.cloud.schedule('simultaneous-station.edit');
    }
  }
  assert.equal(home.clock.pending(5000).length, 1);
  assert.equal(popup.clock.pending(5000).length, 1);
  await Promise.all([
    home.clock.run(home.clock.pending(5000)[0]),
    popup.clock.run(popup.clock.pending(5000)[0])
  ]);
  for (const dispatcher of [home, popup]) {
    const row = database.get(`${dispatcher.config.stationId}|${DAY}`);
    assert.equal(row.payload.stationCode, dispatcher.code);
    assert.equal(row.payload.morningRoutes[0].route, `${dispatcher.code}-CX49`, 'Concurrent saves must retain only that station’s final route edit');
    assert.equal(row.revision, 3, 'Each station must advance its own revision exactly once');
    assert.equal(dispatcher.cloud.revision, 3);
    assert.equal(dispatcher.counts().writes, 1, 'Fifty edits per station must remain one v5 write per station on the shared backend');
    assert.equal(dispatcher.counts().payloads, 0, 'Separate station writes cannot trigger conflict hydration');
    assert(!dispatcher.events.some(event => event.type === 'conflict'), 'Same-date activity at the other station cannot produce a revision conflict');
    assert.equal([...dispatcher.clock.timers.values()].filter(timer => String(timer.fn).includes('pendingSnapshot')).length, 0, 'Simultaneous station saves cannot fan out retry chains');
    assert.equal(database.get(`${dispatcher.config.stationId}|${PERMANENT}`).revision, 3, 'Daily station edits cannot rewrite persistent state');
  }
  // One additional home-station edit must not advance DUR6’s revision.
  home.state.daily.morningRoutes[0].route = 'DJT6-CX-next';
  home.cloud.schedule('home-only.edit');await home.clock.run(home.clock.pending(5000)[0]);
  assert.equal(database.get(`${home.config.stationId}|${DAY}`).revision, 4);
  assert.equal(database.get(`${popup.config.stationId}|${DAY}`).revision, 3);
  assert.equal(database.get(`${popup.config.stationId}|${DAY}`).payload.morningRoutes[0].route, 'DUR6-CX49');
}

(async () => {
  const budgets = {};
  for (const code of ['DJT6', 'DUR6']) budgets[code] = {regular: await proveRegularBudget(code), failures: await proveIdleAndFailureBudgets(code)};
  assert.deepEqual(budgets.DJT6, budgets.DUR6, 'Every CPU request budget must be identical for the two real production station configurations');
  await proveSimultaneousStations();
  console.log('DJT6/DUR6 production CPU parity passed: simultaneous shared-backend station edits, membership cache, no realtime, v5 batching, Rostering-only writes, hidden tabs, idle polls, retry cap, payload limits, and dormant dates');
})().catch(error => {console.error(error);process.exitCode = 1;});
