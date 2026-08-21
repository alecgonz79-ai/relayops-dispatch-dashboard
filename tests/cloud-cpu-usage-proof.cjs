const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const cloudSource = fs.readFileSync(path.join(__dirname, '..', 'cloud-sync.js'), 'utf8');
const operationDate = '2026-08-21';
const permanentDate = '2000-01-01';
const nativeDate = Date;

const clone = value => JSON.parse(JSON.stringify(value));
const settle = async (turns = 30) => {
  for (let index = 0; index < turns; index += 1) await Promise.resolve();
};

class FakeClock {
  constructor(now = nativeDate.parse(`${operationDate}T08:00:00.000Z`)) {
    this.now = now;
    this.nextId = 1;
    this.timers = new Map();
  }

  setTimeout(fn, delay = 0, ...args) {
    const id = this.nextId++;
    const timer = {
      id,
      due: this.now + Math.max(0, Number(delay) || 0),
      delay: Math.max(0, Number(delay) || 0),
      fn,
      args,
      unref() {}
    };
    this.timers.set(id, timer);
    return timer;
  }

  clearTimeout(timer) {
    this.timers.delete(typeof timer === 'object' ? timer?.id : timer);
  }

  pending(delay) {
    return [...this.timers.values()].filter(timer => timer.delay === delay).sort((left, right) => left.due - right.due || left.id - right.id);
  }

  next() {
    return [...this.timers.values()].sort((left, right) => left.due - right.due || left.id - right.id)[0] || null;
  }

  async run(timer, { awaitResult = true } = {}) {
    if (!timer || !this.timers.has(timer.id)) return null;
    this.timers.delete(timer.id);
    this.now = Math.max(this.now, timer.due);
    const result = timer.fn(...timer.args);
    if (awaitResult) await result;
    await settle();
    return result;
  }

  async runDue() {
    for (;;) {
      const timer = this.next();
      if (!timer || timer.due > this.now) break;
      await this.run(timer);
    }
  }
}

function fakeDate(clock) {
  return class ClockDate extends nativeDate {
    constructor(...args) {
      if (args.length) super(...args);
      else super(clock.now);
    }
    static now() { return clock.now; }
  };
}

function storageHarness() {
  const values = new Map();
  return {
    get length() { return values.size; },
    key(index) { return [...values.keys()][index] || null; },
    getItem(key) { return values.has(String(key)) ? values.get(String(key)) : null; },
    setItem(key, value) { values.set(String(key), String(value)); },
    removeItem(key) { values.delete(String(key)); }
  };
}

function sharedDatabase() {
  return {
    snapshots: new Map([
      [operationDate, {
        operation_date: operationDate,
        revision: 10,
        payload: { morningRoutes: [{ routeUid: 'route-1', route: 'CX100', wave: 'WAVE 1' }], deviceCustomRows: [] },
        updated_at: `${operationDate}T08:00:00.000Z`,
        updated_by: 'seed'
      }],
      [permanentDate, {
        operation_date: permanentDate,
        revision: 4,
        payload: { driverNameAliases: { 'lorenzo a': 'Lorenzo Alvarez' } },
        updated_at: `${operationDate}T08:00:00.000Z`,
        updated_by: 'seed'
      }]
    ])
  };
}

function dispatcherHarness({ userId, database, saveMode = 'ready', writable = true }) {
  const clock = new FakeClock();
  const documentListeners = {};
  const windowListeners = {};
  const events = [];
  const metrics = {
    membershipReads: 0,
    stationReads: 0,
    snapshotSummaryReads: 0,
    snapshotPayloadReads: 0,
    snapshotWriteAttempts: 0,
    snapshotWrites: 0,
    adminReads: 0,
    anonymousSignIns: 0
  };
  const session = {
    access_token: `token-${userId}`,
    user: { id: userId, email: `${userId}@example.test` }
  };
  const state = { daily: {}, persistent: {} };
  let membershipMode = 'ready';
  let currentSaveMode = saveMode;
  let authListener = null;

  const client = {
    auth: {
      getSession: async () => ({ data: { session }, error: null }),
      onAuthStateChange(listener) {
        authListener = listener;
        return { data: { subscription: { unsubscribe() {} } } };
      },
      signInAnonymously: async () => {
        metrics.anonymousSignIns += 1;
        return { data: { session }, error: null };
      },
      signOut: async () => ({ error: null })
    },
    from(table) {
      let selected = '';
      let targetDate = '';
      return {
        select(fields) { selected = fields; return this; },
        eq(field, value) { if (field === 'operation_date') targetDate = value; return this; },
        maybeSingle: async () => {
          if (table === 'memberships') {
            metrics.membershipReads += 1;
            if (membershipMode === 'pool-error') {
              return { data: null, error: { code: 'PGRST003', message: 'Timed out acquiring connection from the connection pool' } };
            }
            return { data: { user_id: userId, role: 'dispatcher', display_name: userId, active: true }, error: null };
          }
          if (table === 'station_memberships') {
            metrics.stationReads += 1;
            return { data: { station_id: 'station-1' }, error: null };
          }
          if (table === 'workspace_snapshots') {
            if (/\bpayload\b/.test(selected)) metrics.snapshotPayloadReads += 1;
            else metrics.snapshotSummaryReads += 1;
            const source = database.snapshots.get(targetDate);
            if (!source) return { data: null, error: null };
            const data = {
              operation_date: source.operation_date,
              revision: source.revision,
              updated_at: source.updated_at,
              updated_by: source.updated_by
            };
            if (/\bpayload\b/.test(selected)) data.payload = clone(source.payload);
            return { data, error: null };
          }
          return { data: null, error: null };
        }
      };
    },
    rpc(name, args) {
      if (name === 'relayops_admin_status') {
        metrics.adminReads += 1;
        return Promise.resolve({ data: false, error: null });
      }
      if (name !== 'save_workspace_snapshot_v4') return Promise.resolve({ data: null, error: null });
      metrics.snapshotWriteAttempts += 1;
      if (currentSaveMode === 'timeout') return new Promise(() => {});
      const row = database.snapshots.get(args.target_date);
      if (Number(args.expected_revision) !== Number(row?.revision || 0)) {
        return Promise.resolve({ data: null, error: { message: 'revision_conflict' } });
      }
      const next = {
        operation_date: args.target_date,
        revision: Number(row?.revision || 0) + 1,
        payload: clone(args.new_payload),
        updated_at: new nativeDate(clock.now).toISOString(),
        updated_by: userId
      };
      database.snapshots.set(args.target_date, next);
      metrics.snapshotWrites += 1;
      return Promise.resolve({ data: clone(next), error: null });
    },
    removeChannel() {}
  };

  const fakeMath = Object.create(Math);
  fakeMath.random = () => 0.5;
  const document = {
    visibilityState: 'visible',
    addEventListener(name, listener) { documentListeners[name] = listener; }
  };
  const context = {
    console,
    URL,
    Error,
    TypeError,
    Promise,
    Date: fakeDate(clock),
    Math: fakeMath,
    setTimeout: clock.setTimeout.bind(clock),
    clearTimeout: clock.clearTimeout.bind(clock),
    location: { href: `https://relayops.example.test/?date=${operationDate}` },
    document,
    window: {
      addEventListener(name, listener) { windowListeners[name] = listener; },
      localStorage: storageHarness(),
      sessionStorage: storageHarness(),
      RELAYOPS_CLOUD_CONFIG: {
        supabaseUrl: 'https://relayops.supabase.co',
        supabaseAnonKey: 'anon',
        organizationId: 'org-1',
        stationId: 'station-1',
        requestTimeoutMs: 4000,
        saveTimeoutMs: 4000,
        pollIntervalMs: 60000,
        idlePollIntervalMs: 300000,
        persistentPollIntervalMs: 600000,
        activeWindowMs: 120000,
        saveDebounceMs: 5000,
        maxAutomaticSaveRetries: 5
      },
      supabase: { createClient: () => client },
      RelayOpsApp: {
        operationDate: () => operationDate,
        operationDateIsWritable: () => writable,
        sharedState: () => clone(state.daily),
        persistentState: () => clone(state.persistent),
        resetDailyState() { state.daily = {}; },
        resetSharedDailyState() { state.daily = {}; },
        applySharedState(payload) { state.daily = clone(payload); },
        applyPersistentState(payload) { state.persistent = clone(payload); }
      }
    }
  };
  context.globalThis = context;
  vm.runInNewContext(cloudSource, context, { filename: `cloud-sync-${userId}.js` });
  const cloud = context.window.RelayOpsCloud;
  cloud.on(event => events.push({
    type: event.type,
    reason: event.reason || '',
    code: event.error?.code || '',
    message: event.error?.message || ''
  }));

  return {
    cloud,
    clock,
    document,
    documentListeners,
    windowListeners,
    events,
    metrics,
    state,
    session,
    setMembershipMode(mode) { membershipMode = mode; },
    setSaveMode(mode) { currentSaveMode = mode; },
    emitAuth(event) { authListener?.(event, session); },
    clearMetrics() { Object.keys(metrics).forEach(key => { metrics[key] = 0; }); }
  };
}

async function runAutosaveTimer(dispatcher) {
  const timers = dispatcher.clock.pending(5000);
  assert.strictEqual(timers.length, 1, 'Burst edits must collapse into exactly one autosave timer');
  await dispatcher.clock.run(timers[0]);
}

async function runNextPoll(dispatcher, expectedDelay) {
  const timers = dispatcher.clock.pending(expectedDelay);
  assert.strictEqual(timers.length, 1, `Expected one ${expectedDelay}ms poll timer, found ${timers.length}`);
  await dispatcher.clock.run(timers[0]);
}

async function proveTwoDispatcherBudgets() {
  const database = sharedDatabase();
  const active = dispatcherHarness({ userId: 'dispatcher-active', database });
  const background = dispatcherHarness({ userId: 'dispatcher-background', database });

  await Promise.all([active.cloud.init(), background.cloud.init()]);
  for (const dispatcher of [active, background]) {
    assert.deepStrictEqual(
      dispatcher.metrics,
      {
        membershipReads: 1,
        stationReads: 1,
        snapshotSummaryReads: 0,
        snapshotPayloadReads: 2,
        snapshotWriteAttempts: 0,
        snapshotWrites: 0,
        adminReads: 1,
        anonymousSignIns: 0
      },
      'A dispatcher startup exceeded the fixed access-and-hydration request budget'
    );
    assert.strictEqual(dispatcher.state.daily.morningRoutes[0].route, 'CX100', 'Core route data was not hydrated');
    assert.strictEqual(dispatcher.state.persistent.driverNameAliases['lorenzo a'], 'Lorenzo Alvarez', 'Permanent driver aliases were not hydrated');
    dispatcher.clearMetrics();
  }

  for (const dispatcher of [active, background]) {
    for (let index = 0; index < 20; index += 1) {
      dispatcher.emitAuth(index % 2 ? 'TOKEN_REFRESHED' : 'SIGNED_IN');
    }
  }
  await settle();
  for (const dispatcher of [active, background]) {
    assert.strictEqual(
      Object.values(dispatcher.metrics).reduce((sum, value) => sum + value, 0),
      0,
      'Repeated same-user auth events must not reload access or snapshots'
    );
  }

  for (const dispatcher of [active, background]) dispatcher.setMembershipMode('pool-error');
  const retryPromises = [
    active.cloud.retryLinkAccess(), active.cloud.retryLinkAccess(),
    background.cloud.retryLinkAccess(), background.cloud.retryLinkAccess()
  ];
  assert.strictEqual(retryPromises[0], retryPromises[1], 'One dispatcher created duplicate reconnect chains');
  assert.strictEqual(retryPromises[2], retryPromises[3], 'The second dispatcher created duplicate reconnect chains');
  const retryResults = await Promise.all(retryPromises);
  for (const [index, dispatcher] of [active, background].entries()) {
    assert.strictEqual(retryResults[index * 2]?.deferred, true, 'Database saturation was not treated as a delayed reconnect');
    assert.strictEqual(dispatcher.metrics.membershipReads, 1, 'Overlapping reconnects multiplied membership reads');
    assert.strictEqual(dispatcher.metrics.stationReads, 0, 'A failed membership recheck continued into a station read');
    assert.strictEqual(dispatcher.metrics.snapshotPayloadReads, 0, 'A failed membership recheck continued into snapshot downloads');
    assert.strictEqual(dispatcher.metrics.anonymousSignIns, 0, 'A transient database error replaced a verified dispatcher session');
    assert(dispatcher.cloud.membership, 'A transient database error discarded verified access');
    dispatcher.setMembershipMode('ready');
    dispatcher.clearMetrics();
  }

  for (let index = 0; index < 50; index += 1) {
    active.state.daily.morningRoutes[0].route = `CX${200 + index}`;
    active.cloud.schedule(`route.edit.${index}`);
  }
  assert.strictEqual(active.metrics.snapshotWriteAttempts, 0, 'Autosave wrote before its debounce window');
  await runAutosaveTimer(active);
  assert.strictEqual(active.metrics.snapshotWriteAttempts, 1, 'Fifty active edits must become one snapshot write');
  assert.strictEqual(active.metrics.snapshotWrites, 1, 'The collapsed active autosave did not persist');
  assert.strictEqual(database.snapshots.get(operationDate).payload.morningRoutes[0].route, 'CX249', 'The final active edit was not preserved');

  background.document.visibilityState = 'hidden';
  for (let index = 0; index < 50; index += 1) {
    background.state.daily.deviceCustomRows = [{ id: 'device-1', note: `hidden-edit-${index}` }];
    background.cloud.schedule(`device.hidden.${index}`);
  }
  assert.strictEqual(background.clock.pending(5000).length, 0, 'A hidden tab scheduled a network autosave');
  await runNextPoll(background, 60000);
  await runNextPoll(background, 60000);
  await runNextPoll(background, 300000);
  assert.strictEqual(background.metrics.snapshotSummaryReads, 0, 'A hidden tab polled Supabase while idle');
  assert.strictEqual(background.metrics.snapshotPayloadReads, 0, 'A hidden tab downloaded payloads while idle');
  assert.strictEqual(background.metrics.snapshotWriteAttempts, 0, 'A hidden tab wrote while idle');

  background.document.visibilityState = 'visible';
  background.documentListeners.visibilitychange();
  await settle(80);
  await background.clock.runDue();
  await settle(80);
  const conflictRetry = background.clock.pending(30000);
  assert.strictEqual(conflictRetry.length, 1, 'A resume conflict must arm one bounded retry instead of an immediate write loop');
  await background.clock.run(conflictRetry[0]);
  await settle(80);
  assert(background.metrics.snapshotWriteAttempts <= 2, 'Resume conflict recovery exceeded two bounded write attempts');
  assert.strictEqual(background.metrics.snapshotWrites, 1, 'The latest hidden edit was not saved after resume');
  assert(background.metrics.snapshotPayloadReads <= 2, 'Resume conflict recovery downloaded snapshots more than once');
  assert(background.metrics.snapshotSummaryReads <= 1, 'Focus/visibility recovery multiplied revision checks');
  const shared = database.snapshots.get(operationDate).payload;
  assert.strictEqual(shared.morningRoutes[0].route, 'CX249', 'Conflict recovery lost the other dispatcher\'s route edit');
  assert.strictEqual(shared.deviceCustomRows[0].note, 'hidden-edit-49', 'Conflict recovery lost the hidden dispatcher\'s final edit');
}

async function proveAdaptiveIdlePolling() {
  const dispatcher = dispatcherHarness({ userId: 'dispatcher-idle', database: sharedDatabase() });
  await dispatcher.cloud.init();
  dispatcher.clearMetrics();

  await runNextPoll(dispatcher, 60000);
  await runNextPoll(dispatcher, 60000);
  assert.strictEqual(dispatcher.clock.pending(300000).length, 1, 'An inactive dispatcher did not switch to the five-minute poll cadence');
  await runNextPoll(dispatcher, 300000);
  await runNextPoll(dispatcher, 300000);

  assert.strictEqual(dispatcher.metrics.snapshotSummaryReads, 5, 'A 12-minute idle window exceeded the four daily plus one station revision-read budget');
  assert.strictEqual(dispatcher.metrics.snapshotPayloadReads, 0, 'Unchanged idle polling downloaded full payloads');
  assert.strictEqual(dispatcher.metrics.snapshotWriteAttempts, 0, 'An idle dispatcher generated writes');
  assert.strictEqual(dispatcher.metrics.membershipReads, 0, 'Idle polling rechecked membership unnecessarily');
}

async function proveExpiredDateIsDormant() {
  const dispatcher = dispatcherHarness({ userId: 'dispatcher-expired', database: sharedDatabase(), writable: false });
  await dispatcher.cloud.init();
  dispatcher.clearMetrics();
  dispatcher.state.daily.morningRoutes[0].route = 'CX-CLOSED';
  dispatcher.cloud.schedule('closed-day.edit');
  dispatcher.windowListeners.focus();
  dispatcher.documentListeners.visibilitychange();
  await settle(40);
  assert.strictEqual(dispatcher.clock.timers.size, 0, 'An expired shared link armed a recurring poll or autosave timer');
  assert.strictEqual(dispatcher.metrics.snapshotSummaryReads, 0, 'An expired shared link continued revision polling');
  assert.strictEqual(dispatcher.metrics.snapshotPayloadReads, 0, 'An expired shared link redownloaded workspace payloads');
  assert.strictEqual(dispatcher.metrics.snapshotWriteAttempts, 0, 'An expired shared link attempted to save closed-day data');
}

async function proveAutomaticRetryCap() {
  const dispatcher = dispatcherHarness({ userId: 'dispatcher-slow-save', database: sharedDatabase(), saveMode: 'timeout' });
  await dispatcher.cloud.init();
  dispatcher.clearMetrics();
  dispatcher.state.daily.morningRoutes[0].route = 'CX999';

  const initialSave = dispatcher.cloud.save('cpu-proof.slow-save');
  await settle();
  await dispatcher.clock.run(dispatcher.clock.pending(4000)[0]);
  await initialSave;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const retryDelays = [30000, 60000, 120000, 300000, 300000];
    const retryTimer = dispatcher.clock.pending(retryDelays[attempt])
      .find(timer => String(timer.fn).includes('pendingSnapshot'));
    assert(retryTimer, `Automatic save retry ${attempt + 1} was not scheduled with bounded backoff`);
    await dispatcher.clock.run(retryTimer, { awaitResult: false });
    await settle();
    const timeoutTimer = dispatcher.clock.pending(4000)[0];
    assert(timeoutTimer, `Automatic save retry ${attempt + 1} did not retain the save timeout`);
    await dispatcher.clock.run(timeoutTimer);
    await settle(60);
  }

  assert.strictEqual(dispatcher.metrics.snapshotWriteAttempts, 6, 'Slow saves must stop after one initial attempt and five automatic retries');
  assert.strictEqual(
    [...dispatcher.clock.timers.values()].filter(timer => String(timer.fn).includes('pendingSnapshot')).length,
    0,
    'Slow-save retry cap left an extra retry timer'
  );
  assert(dispatcher.events.some(event => event.type === 'save-delayed' && event.reason === 'automatic-retries-paused'), 'Retry exhaustion did not pause automatic writes safely');
  assert.strictEqual(dispatcher.metrics.snapshotWrites, 0, 'A timed-out save was falsely acknowledged');
}

(async () => {
  await proveTwoDispatcherBudgets();
  await proveAdaptiveIdlePolling();
  await proveExpiredDateIsDormant();
  await proveAutomaticRetryCap();
  console.log('Cloud CPU safety proof passed: concurrent access, auth noise, autosave, hidden tabs, idle polling, and retries are bounded');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
