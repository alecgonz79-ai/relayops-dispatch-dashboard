const fs = require('fs');
const assert = require('assert');
const vm = require('vm');

const CLOUD_SOURCE = fs.readFileSync(require.resolve('../cloud-sync.js'), 'utf8');
const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
const tick = () => new Promise(resolve => setImmediate(resolve));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const settleWithin = (promise, ms = 20) => Promise.race([
  Promise.resolve(promise).then(value => ({ settled: true, value })),
  wait(ms).then(() => ({ settled: false }))
]);

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function storageHarness({ failWrites = false } = {}) {
  const values = new Map();
  return {
    get length() { return values.size; },
    key(index) { return [...values.keys()][index] || null; },
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { if (failWrites) throw new Error('simulated storage quota exceeded'); values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
    has(key) { return values.has(key); },
    value(key) { return values.get(key); }
  };
}

function freshDailyState(date) {
  return {
    morningOperationDate: date,
    morningRoutes: Array.from({ length: 6 }, (_, index) => ({
      routeUid: `WAVE-ANCHOR-${date}-${index + 1}`,
      route: `__blank_wave_${index + 1}`,
      driver: '',
      _blank: true,
      _waveAnchor: true
    }))
  };
}

function createCloudHarness({
  date = '2026-08-04',
  today = date,
  snapshots = {},
  dailyState = { morningOperationDate: date, morningRoutes: [] },
  persistentState = {},
  storageWriteFails = false,
  readHook = null,
  rpcHook = null
} = {}) {
  let activeDate = date;
  let currentToday = today;
  let currentDaily = clone(dailyState);
  let currentPersistent = clone(persistentState);
  let onRead = readHook;
  let onRpc = rpcHook;
  const storage = storageHarness({ failWrites: storageWriteFails });
  const queryLog = [];
  const rpcLog = [];
  const resetLog = [];
  const applyLog = [];
  const events = [];
  const session = { user: { id: 'dispatcher-1', email: 'dispatcher@example.com' } };

  const client = {
    auth: {
      getSession: async () => ({ data: { session }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      signOut: async () => ({ error: null })
    },
    from(table) {
      let selected = '';
      let targetDate = '';
      return {
        select(fields) { selected = fields; return this; },
        eq(field, value) { if (field === 'operation_date') targetDate = value; return this; },
        maybeSingle: async () => {
          if (table === 'memberships') return { data: { user_id: session.user.id, role: 'owner', active: true }, error: null };
          if (table !== 'workspace_snapshots') return { data: null, error: null };
          const request = { table, targetDate, selected, full: /\bpayload\b/.test(selected) };
          queryLog.push(request);
          if (onRead) {
            const intercepted = onRead(request);
            if (intercepted !== undefined) return await intercepted;
          }
          const row = snapshots[targetDate];
          if (!row) return { data: null, error: null };
          const data = {
            operation_date: targetDate,
            revision: Number(row.revision) || 0,
            updated_at: row.updated_at || `${targetDate}T12:00:00.000Z`,
            updated_by: row.updated_by || session.user.id
          };
          if (request.full) data.payload = clone(row.payload || {});
          return { data, error: null };
        }
      };
    },
    rpc: async (name, args) => {
      if (name === 'relayops_admin_status') return { data: false, error: null };
      if (name !== 'save_workspace_snapshot_v4') return { data: null, error: null };
      rpcLog.push(clone(args));
      if (onRpc) {
        const intercepted = onRpc(name, clone(args));
        if (intercepted !== undefined) return await intercepted;
      }
      const previous = snapshots[args.target_date];
      const nextRevision = (Number(previous?.revision) || 0) + 1;
      snapshots[args.target_date] = {
        operation_date: args.target_date,
        revision: nextRevision,
        payload: clone(args.new_payload),
        updated_at: new Date().toISOString(),
        updated_by: session.user.id
      };
      return { data: clone(snapshots[args.target_date]), error: null };
    },
    removeChannel() {}
  };

  const context = {
    console, URL, Date, setTimeout, clearTimeout,
    location: { href: `https://relayops.example.test/?date=${date}` },
    document: { visibilityState: 'visible', addEventListener() {} },
    window: {
      addEventListener() {},
      localStorage: storage,
      sessionStorage: storageHarness(),
      RELAYOPS_CLOUD_CONFIG: {
        supabaseUrl: 'https://relayops.supabase.co',
        supabaseAnonKey: 'anon',
        organizationId: 'org',
        stationId: 'station',
        pollIntervalMs: 120000,
        idlePollIntervalMs: 600000,
        persistentPollIntervalMs: 1800000,
        saveDebounceMs: 15000
      },
      supabase: { createClient: () => client },
      RelayOpsApp: {
        operationDate: () => activeDate,
        operationDateIsWritable: targetDate => String(targetDate || '') >= currentToday,
        sharedState: () => clone(currentDaily),
        persistentState: () => clone(currentPersistent),
        resetDailyState(nextDate) {
          activeDate = nextDate;
          currentDaily = freshDailyState(nextDate);
          resetLog.push(nextDate);
          return clone(currentDaily);
        },
        applySharedState(payload) {
          currentDaily = { ...currentDaily, ...clone(payload || {}) };
          applyLog.push({ kind: 'daily', date: activeDate, payload: clone(payload || {}) });
        },
        applyPersistentState(payload) {
          currentPersistent = { ...currentPersistent, ...clone(payload || {}) };
          applyLog.push({ kind: 'persistent', date: activeDate, payload: clone(payload || {}) });
        }
      }
    }
  };
  context.globalThis = context;
  vm.runInNewContext(CLOUD_SOURCE, context, { filename: 'cloud-sync.js' });
  const cloud = context.window.RelayOpsCloud;
  cloud.on(event => events.push(clone(event)));
  return {
    cloud, snapshots, storage, queryLog, rpcLog, resetLog, applyLog, events,
    init: () => cloud.init(),
    date: () => activeDate,
    daily: () => clone(currentDaily),
    persistent: () => clone(currentPersistent),
    setDate(nextDate, nextDaily = freshDailyState(nextDate)) { activeDate = nextDate; currentDaily = clone(nextDaily); },
    setToday(nextDate) { currentToday = nextDate; },
    setDaily(next) { currentDaily = clone(next); },
    setPersistent(next) { currentPersistent = clone(next); },
    setReadHook(next) { onRead = next; },
    setRpcHook(next) { onRpc = next; }
  };
}

function snapshot(date, revision, payload) {
  return { operation_date: date, revision, payload: clone(payload), updated_at: `${date}T12:00:00.000Z`, updated_by: 'dispatcher-1' };
}

async function testStaleLoadCannotRestorePriorDate() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 3, { morningRoutes: [{ route: 'CX-OLD', driver: 'Old Driver' }] }),
    [newDate]: snapshot(newDate, 8, { morningRoutes: [{ route: 'CX-NEW', driver: 'New Driver' }] }),
    '2000-01-01': snapshot('2000-01-01', 5, { driverContacts: [{ name: 'Permanent Driver' }] })
  };
  const harness = createCloudHarness({ date: oldDate, snapshots });
  await harness.init();

  const entered = deferred();
  const release = deferred();
  let held = false;
  harness.setReadHook(request => {
    if (!held && request.targetDate === oldDate && request.full) {
      held = true;
      entered.resolve();
      return release.promise;
    }
    return undefined;
  });

  const staleLoad = harness.cloud.load();
  await entered.promise;
  harness.setDate(newDate);
  const newLoad = harness.cloud.load();
  const newLoadBeforeRelease = await settleWithin(newLoad);
  if (newLoadBeforeRelease.settled) assert.strictEqual(harness.daily().morningRoutes[0].route, 'CX-NEW', 'Control: the new operation date did not load');
  release.resolve({ data: clone(snapshots[oldDate]), error: null });
  await Promise.all([staleLoad, newLoad]);

  assert.strictEqual(harness.date(), newDate, 'A delayed prior-date load changed the active operation date');
  assert.strictEqual(harness.daily().morningRoutes[0].route, 'CX-NEW', 'A delayed prior-date load replaced the new day with yesterday\u2019s routes');
}

async function testStalePollCannotRestorePriorDate() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 1, { morningRoutes: [{ route: 'CX-OLD-1' }] }),
    '2000-01-01': snapshot('2000-01-01', 1, {})
  };
  const harness = createCloudHarness({ date: oldDate, snapshots });
  await harness.init();
  snapshots[oldDate] = snapshot(oldDate, 99, { morningRoutes: [{ route: 'CX-STALE-POLL', driver: 'Yesterday' }] });

  const entered = deferred();
  const release = deferred();
  let held = false;
  harness.setReadHook(request => {
    if (!held && request.targetDate === oldDate && !request.full) {
      held = true;
      entered.resolve();
      return release.promise;
    }
    return undefined;
  });

  const stalePoll = harness.cloud.__test.pollForUpdates(oldDate, { forcePersistent: false });
  await entered.promise;
  harness.setDate(newDate, { morningOperationDate: newDate, morningRoutes: [{ route: 'CX-NEW-LOCAL', driver: 'Today' }] });
  const resetsBeforeRelease = harness.resetLog.length;
  release.resolve({
    data: { operation_date: oldDate, revision: 99, updated_at: `${oldDate}T23:59:59.000Z`, updated_by: 'other-dispatcher' },
    error: null
  });
  await stalePoll;

  assert.strictEqual(harness.date(), newDate, 'A delayed prior-date poll changed the active operation date');
  assert.strictEqual(harness.daily().morningRoutes[0].route, 'CX-NEW-LOCAL', 'A delayed prior-date poll replaced today\u2019s local state');
  assert.strictEqual(harness.resetLog.length, resetsBeforeRelease, 'A stale poll invoked resetDailyState after the date changed');
}

async function testStaleSaveCannotClobberNewDateRevision() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 3, { morningRoutes: [{ route: 'CX-OLD' }] }),
    [newDate]: snapshot(newDate, 27, { morningRoutes: [{ route: 'CX-NEW' }] }),
    '2000-01-01': snapshot('2000-01-01', 4, {})
  };
  const harness = createCloudHarness({ date: oldDate, snapshots });
  await harness.init();
  harness.setDaily({ morningOperationDate: oldDate, morningRoutes: [{ route: 'CX-OLD-EDIT', driver: 'Old Edit' }] });

  const entered = deferred();
  const release = deferred();
  let held = false;
  harness.setRpcHook((_name, args) => {
    if (!held && args.target_date === oldDate) {
      held = true;
      entered.resolve();
      return release.promise;
    }
    return undefined;
  });

  const staleSave = harness.cloud.save('test.prior-date-save');
  await entered.promise;
  harness.setDate(newDate);
  const newLoad = harness.cloud.load();
  const newLoadBeforeRelease = await settleWithin(newLoad);
  if (newLoadBeforeRelease.settled) assert.strictEqual(harness.cloud.revision, 27, 'Control: the new day revision did not load');
  release.resolve({ data: { revision: 4, updated_at: `${oldDate}T23:59:59.000Z` }, error: null });
  await Promise.all([staleSave, newLoad]);

  assert.strictEqual(harness.date(), newDate, 'Completing a prior-date save changed the selected day');
  assert.strictEqual(harness.cloud.revision, 27, 'A prior-date save response overwrote the active day\u2019s revision');

  harness.setDaily({ morningOperationDate: newDate, morningRoutes: [{ route: 'CX-NEW-EDIT', driver: 'Today Edit' }] });
  await harness.cloud.save('test.new-date-save');
  const newWrite = harness.rpcLog.findLast(call => call.target_date === newDate);
  assert(newWrite, 'The new-day edit did not produce a daily snapshot write');
  assert.strictEqual(newWrite.expected_revision, 27, 'The next new-day save inherited the prior day\u2019s revision');
}

async function testStalePersistentSaveCannotClobberNewerPermanentEdit() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 3, { morningRoutes: [{ route: 'CX-OLD' }] }),
    [newDate]: snapshot(newDate, 8, { morningRoutes: [{ route: 'CX-NEW' }] }),
    '2000-01-01': snapshot('2000-01-01', 4, { driverContacts: [{ name: 'Original Driver' }] })
  };
  const harness = createCloudHarness({ date: oldDate, snapshots });
  await harness.init();
  harness.setPersistent({ driverContacts: [{ name: 'Yesterday Fleet Edit' }] });

  const entered = deferred();
  const release = deferred();
  let held = false;
  harness.setRpcHook((_name, args) => {
    if (!held && args.target_date === '2000-01-01') {
      held = true;
      entered.resolve();
      return release.promise;
    }
    return undefined;
  });

  const staleSave = harness.cloud.save('test.prior-date-persistent-save');
  await entered.promise;
  harness.setDate(newDate);
  await harness.cloud.load();
  harness.setPersistent({ driverContacts: [{ name: 'Today Newer Edit' }] });
  harness.cloud.schedule('test.today-newer-persistent-edit');
  release.resolve({ data: { revision: 5, updated_at: `${oldDate}T23:59:59.000Z` }, error: null });
  await staleSave;

  assert.deepStrictEqual(
    harness.persistent().driverContacts,
    [{ name: 'Today Newer Edit' }],
    'A completed prior-date permanent save repainted newer driver/fleet state in the active day'
  );
  const newQueue = JSON.parse(harness.storage.value(`relayops_cloud_queue:station:${newDate}`) || 'null');
  assert.deepStrictEqual(
    newQueue?.persistentPayload?.driverContacts,
    [{ name: 'Today Newer Edit' }],
    'A completed prior-date permanent save discarded the active day\u2019s queued permanent edit'
  );
}

async function testFailedSavePreservesNewerQueuedEdit() {
  const date = '2026-08-04';
  const snapshots = {
    [date]: snapshot(date, 3, { morningRoutes: [{ route: 'CX-BASE', driver: 'Base Driver' }] }),
    '2000-01-01': snapshot('2000-01-01', 4, {})
  };
  const harness = createCloudHarness({ date, snapshots });
  await harness.init();
  harness.setDaily({ morningOperationDate: date, morningRoutes: [{ route: 'CX-FIRST', driver: 'First Edit' }] });

  const entered = deferred();
  const release = deferred();
  let held = false;
  harness.setRpcHook((_name, args) => {
    if (!held && args.target_date === date) {
      held = true;
      entered.resolve();
      return release.promise;
    }
    return undefined;
  });

  const failedSave = harness.cloud.save('test.first-in-flight-edit').catch(() => null);
  await entered.promise;
  harness.setDaily({ morningOperationDate: date, morningRoutes: [{ route: 'CX-NEWEST', driver: 'Newest Edit' }] });
  harness.cloud.schedule('test.newest-edit-queued-behind-save');
  release.reject(new Error('simulated mobile connection failure'));
  await failedSave;

  const queued = JSON.parse(harness.storage.value(`relayops_cloud_queue:station:${date}`) || 'null');
  assert.strictEqual(
    queued?.payload?.morningRoutes?.[0]?.route,
    'CX-NEWEST',
    'A failed in-flight save overwrote the newer daily edit already queued behind it'
  );
}

async function testPriorDatePendingEditIsDateScoped() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 3, { morningRoutes: [{ route: 'CX-OLD' }] }),
    '2000-01-01': snapshot('2000-01-01', 4, { fleetImport: { vehicles: [{ vin: 'VIN-1', name: 'EV1' }] } })
  };
  const harness = createCloudHarness({ date: oldDate, snapshots });
  await harness.init();
  harness.setDaily({ morningOperationDate: oldDate, morningRoutes: [{ route: 'CX-PENDING-OLD', driver: 'Offline Old Edit' }] });
  harness.cloud.schedule('test.old-date-pending');
  const oldQueueKey = `relayops_cloud_queue:station:${oldDate}`;
  assert(harness.storage.has(oldQueueKey), 'Control: the prior-date edit was not queued');

  harness.setDate(newDate);
  await harness.cloud.load();
  await wait(30);
  const newWrite = harness.rpcLog.find(call => call.target_date === newDate);
  assert(newWrite, 'The missing new operation date was not initialized');
  assert(!JSON.stringify(newWrite.new_payload).includes('CX-PENDING-OLD'), 'A queued prior-date route leaked into the new date snapshot');
  assert(harness.storage.has(oldQueueKey), 'Loading a new date discarded the prior date\u2019s unsaved queue');
  assert(!JSON.stringify(harness.daily()).includes('CX-PENDING-OLD'), 'A queued prior-date route was applied to the new day UI');
}

async function testMemoryQueuePreservesPriorDateWhenStorageUnavailable() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 3, { morningRoutes: [{ route: 'CX-OLD' }] }),
    '2000-01-01': snapshot('2000-01-01', 4, { driverContacts: [{ name: 'Permanent Driver' }] })
  };
  const harness = createCloudHarness({ date: oldDate, snapshots, storageWriteFails: true });
  await harness.init();
  harness.setDaily({ morningOperationDate: oldDate, morningRoutes: [{ route: 'CX-UNSENT-OLD', driver: 'Offline Old Edit' }] });
  harness.cloud.schedule('test.memory-only-old-date-pending');

  harness.setDate(newDate);
  await harness.cloud.load();
  await wait(30);
  harness.setDate(oldDate);
  await harness.cloud.load();

  assert.strictEqual(
    harness.daily().morningRoutes[0].route,
    'CX-UNSENT-OLD',
    'Initializing a new date erased the prior date\u2019s in-memory pending edit when localStorage was unavailable'
  );
}

async function testExpiredQueueCarriesPermanentDeltaThenRetires() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const snapshots = {
    [oldDate]: snapshot(oldDate, 3, { morningRoutes: [{ route: 'CX-OLD' }] }),
    [newDate]: snapshot(newDate, 1, freshDailyState(newDate)),
    '2000-01-01': snapshot('2000-01-01', 4, { driverContacts: [{ name: 'Original Driver' }] })
  };
  const harness = createCloudHarness({ date: oldDate, snapshots });
  await harness.init();
  harness.setDaily({ morningOperationDate: oldDate, fleetImport: { name: 'Large expired import', vehicles: [{ vin: 'VIN-OLD' }] } });
  harness.setPersistent({ driverContacts: [{ name: 'Updated Driver' }] });
  harness.cloud.schedule('test.expired-queue');
  const oldQueueKey = `relayops_cloud_queue:station:${oldDate}`;
  assert(harness.storage.has(oldQueueKey), 'Control: the expired-date queue was not created');

  harness.setToday(newDate);
  harness.setDate(newDate);
  await harness.cloud.load();
  await wait(40);

  const permanentWrite = harness.rpcLog.findLast(call => call.target_date === '2000-01-01');
  assert.deepStrictEqual(permanentWrite?.new_payload?.driverContacts, [{ name: 'Updated Driver' }], 'Permanent edits in the expired queue were not carried forward safely');
  assert(!harness.storage.has(oldQueueKey), 'Expired daily imports remained in localStorage after their permanent edits were acknowledged');
  assert(!harness.rpcLog.some(call => call.target_date === oldDate), 'An expired daily queue was written back to its deleted operation date');
}

async function testAlreadyCommittedExpiredQueueRetiresWithoutRewrite() {
  const oldDate = '2026-08-04';
  const newDate = '2026-08-05';
  const committedPersistent = { driverContacts: [{ name: 'Already Committed Driver' }] };
  const snapshots = {
    [newDate]: snapshot(newDate, 1, freshDailyState(newDate)),
    '2000-01-01': snapshot('2000-01-01', 5, committedPersistent)
  };
  const harness = createCloudHarness({ date: newDate, today: newDate, snapshots });
  const oldQueueKey = `relayops_cloud_queue:station:${oldDate}`;
  harness.storage.setItem(oldQueueKey, JSON.stringify({
    payload: { fleetImport: { name: 'Expired import after timeout', vehicles: [{ vin: 'VIN-OLD' }] } },
    basePayload: {},
    persistentPayload: committedPersistent,
    basePersistentPayload: { driverContacts: [{ name: 'Original Driver' }] },
    shared: true,
    userId: 'dispatcher-1',
    queuedAt: '2026-08-04T23:59:00.000Z',
    updatedAt: '2026-08-04T23:59:30.000Z'
  }));

  await harness.init();
  await wait(20);

  assert(!harness.storage.has(oldQueueKey), 'An expired queue survived even though its permanent edit was already present remotely');
  assert(!harness.rpcLog.some(call => call.target_date === '2000-01-01'), 'An already-committed permanent edit caused a redundant rewrite');
}

async function testLegacyDailyPersistentFieldsMigrateWhenMissing() {
  const date = '2026-08-04';
  const legacyRecord = { id: 'legacy-coach-1', driver: 'Driver One', status: 'open', createdAt: '2026-08-01T12:00:00.000Z' };
  const snapshots = {
    [date]: snapshot(date, 9, { morningRoutes: [{ route: 'CX100' }], coachingQueue: [legacyRecord], messageQueueTemplate: 'route' }),
    '2000-01-01': snapshot('2000-01-01', 6, { driverContacts: [{ name: 'Driver One' }] })
  };
  const harness = createCloudHarness({ date, snapshots, persistentState: { coachingQueue: [], messageQueueTemplate: 'standup' } });
  await harness.init();

  assert.deepStrictEqual(harness.persistent().coachingQueue, [legacyRecord], 'Legacy coachingQueue data in a daily snapshot was dropped instead of migrated');
  assert.strictEqual(harness.persistent().messageQueueTemplate, 'route', 'Legacy messageQueueTemplate data in a daily snapshot was dropped instead of migrated');
  await harness.cloud.save('test.flush-legacy-coaching-migration');
  const migrationWrite = harness.rpcLog.find(call => call.target_date === '2000-01-01' && Array.isArray(call.new_payload?.coachingQueue));
  assert(migrationWrite, 'Legacy daily fields were not saved to the permanent station snapshot');
  assert.deepStrictEqual(migrationWrite.new_payload.coachingQueue, [legacyRecord], 'The permanent migration write changed the legacy coaching queue');
  assert.strictEqual(migrationWrite.new_payload.messageQueueTemplate, 'route', 'The permanent migration write changed the legacy message template');
}

async function testExplicitPersistentLegacyFieldsWin() {
  const date = '2026-08-04';
  const dailyLegacyRecord = { id: 'daily-legacy', driver: 'Daily Driver', status: 'open' };
  const snapshots = {
    [date]: snapshot(date, 9, { morningRoutes: [{ route: 'CX100' }], coachingQueue: [dailyLegacyRecord], messageQueueTemplate: 'route' }),
    '2000-01-01': snapshot('2000-01-01', 6, { driverContacts: [{ name: 'Driver One' }], coachingQueue: [], messageQueueTemplate: 'simple' })
  };
  const harness = createCloudHarness({ date, snapshots, persistentState: { coachingQueue: [{ id: 'local-stale' }], messageQueueTemplate: 'standup' } });
  await harness.init();

  assert.deepStrictEqual(harness.persistent().coachingQueue, [], 'An explicit persistent empty coaching queue was overwritten by legacy daily data');
  assert.strictEqual(harness.persistent().messageQueueTemplate, 'simple', 'An explicit persistent message template was overwritten by legacy daily data');
  assert(!harness.rpcLog.some(call => call.target_date === '2000-01-01'), 'Explicit persistent legacy fields caused an unnecessary migration write');
}

async function runCase(name, fn, failures) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, error });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

(async () => {
  const failures = [];
  await runCase('stale load is ignored after operation-date switch', testStaleLoadCannotRestorePriorDate, failures);
  await runCase('stale poll is ignored after operation-date switch', testStalePollCannotRestorePriorDate, failures);
  await runCase('stale save cannot clobber the new-day revision', testStaleSaveCannotClobberNewDateRevision, failures);
  await runCase('stale permanent save cannot repaint a newer active-day edit', testStalePersistentSaveCannotClobberNewerPermanentEdit, failures);
  await runCase('failed save preserves the newest queued same-day edit', testFailedSavePreservesNewerQueuedEdit, failures);
  await runCase('prior-date pending edits stay date scoped', testPriorDatePendingEditIsDateScoped, failures);
  await runCase('memory fallback preserves prior-date pending edits across rollover', testMemoryQueuePreservesPriorDateWhenStorageUnavailable, failures);
  await runCase('expired queues carry permanent edits then retire daily imports', testExpiredQueueCarriesPermanentDeltaThenRetires, failures);
  await runCase('already-committed expired queues retire without rewrite', testAlreadyCommittedExpiredQueueRetiresWithoutRewrite, failures);
  await runCase('legacy daily fields migrate when persistent fields are absent', testLegacyDailyPersistentFieldsMigrateWhenMissing, failures);
  await runCase('explicit persistent legacy fields win over daily fallbacks', testExplicitPersistentLegacyFieldsWin, failures);
  if (failures.length) {
    const summary = failures.map(({ name, error }) => `${name}: ${error.message}`).join('\n');
    throw new Error(`${failures.length} cloud operation-date regression(s) failed:\n${summary}`);
  }
  console.log('Cloud operation-date race, queue isolation, and legacy migration contracts passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
