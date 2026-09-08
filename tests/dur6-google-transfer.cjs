'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createClient} = require('../dur6-google-transfer.js');

const ENDPOINT = 'https://script.google.com/macros/s/Example_DUR6-Deployment/exec';
const GOOGLE_FRAME = 'https://n-abc123-def-script.googleusercontent.com';

function fixture() {
  let nextTimer = 1;
  let randomByte = 0;
  let now = 0;
  const timers = new Map();
  const listeners = new Set();
  const opened = [];
  const popup = {closed: false, close() { this.closed = true; }};
  popup.top = popup;
  const posted = [];
  const frame = {top: popup, postMessage(data, origin) { posted.push({data, origin}); }};
  const env = {
    location: {origin: 'https://dashboard.example'},
    crypto: {getRandomValues(bytes) { for (let i = 0; i < bytes.length; i++) bytes[i] = randomByte++ % 256; return bytes; }},
    open(url, name, features) { opened.push({url, name, features}); return popup; },
    addEventListener(type, fn) { assert.equal(type, 'message'); listeners.add(fn); },
    removeEventListener(type, fn) { assert.equal(type, 'message'); listeners.delete(fn); },
    setTimeout(fn, delay) { const id = nextTimer++; timers.set(id, {fn, at: now + delay, interval: 0}); return id; },
    clearTimeout(id) { timers.delete(id); },
    setInterval(fn, delay) { const id = nextTimer++; timers.set(id, {fn, at: now + delay, interval: delay}); return id; },
    clearInterval(id) { timers.delete(id); }
  };
  const f = {
    env, popup, frame, posted, opened, timers, listeners,
    current: true,
    open() {
      this.session = createClient(env).open(ENDPOINT, {isCurrent: () => this.current});
      this.nonce = new URL(opened.at(-1).url).searchParams.get('nonce');
      return this.session;
    },
    emit(data, source = frame, origin = GOOGLE_FRAME) { [...listeners].forEach(fn => fn({data, source, origin})); },
    ready(source = frame, origin = GOOGLE_FRAME, nonce = this.nonce) { this.emit({type: 'relayops-dur6-ready', nonce}, source, origin); },
    result(result, overrides = {}) {
      this.emit({type: 'relayops-dur6-result', nonce: this.nonce, id: posted.at(-1).data.id, result, ...overrides});
    },
    advance(ms) {
      const end = now + ms;
      for (;;) {
        const first = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!first) break;
        const [id, timer] = first;
        now = timer.at;
        if (timer.interval) timer.at += timer.interval;
        else timers.delete(id);
        timer.fn();
      }
      now = end;
    },
    clean() { assert.equal(listeners.size, 0); assert.equal(timers.size, 0); assert.equal(popup.closed, true); }
  };
  return f;
}

async function run() {
  {
    const f = fixture();
    for (const bad of ['http://script.google.com/macros/s/id/exec', ENDPOINT + '?x=1', ENDPOINT + '#hash', ENDPOINT + '/other', 'https://script.google.com.evil.test/macros/s/id/exec']) {
      assert.throws(() => createClient(f.env).open(bad, {isCurrent: () => true}), {code: 'DUR6_INVALID_ENDPOINT'});
    }
    assert.equal(f.opened.length, 0);
    assert.throws(() => createClient(f.env).open(ENDPOINT, {}), {code: 'DUR6_MISSING_CONTEXT'});
    f.current = false;
    assert.throws(() => f.open(), {code: 'DUR6_STALE_CONTEXT'});
    assert.equal(f.opened.length, 0);
  }
  {
    const f = fixture();
    const s = f.open();
    const url = new URL(f.opened[0].url);
    assert.equal(url.searchParams.get('relayops'), 'handoff');
    assert.equal(url.searchParams.get('origin'), f.env.location.origin);
    assert.match(f.nonce, /^[0-9a-f]{32}$/);
    assert.match(f.opened[0].name, /^relayops_dur6_[0-9a-f]{32}$/);
    assert.equal(f.opened.length, 1, 'window opens synchronously');
    const status = s.request('status');
    assert.equal(f.posted.length, 0, 'waits for Google sign-in');
    for (const bad of ['https://evil.test', 'https://script.google.com.evil.test', 'http://script.google.com', 'https://googleusercontent.com', 'https://evil.googleusercontent.com', GOOGLE_FRAME + ':444', GOOGLE_FRAME + '.evil.test']) f.ready(f.frame, bad);
    f.ready({top: {}}, GOOGLE_FRAME);
    f.ready(f.frame, GOOGLE_FRAME, 'wrong-nonce');
    f.ready({get top() { throw new Error('unreadable'); }}, GOOGLE_FRAME);
    assert.equal(f.posted.length, 0, 'hostile and unrelated messages ignored');
    f.ready();
    assert.equal(f.posted.length, 1);
    assert.equal(f.posted[0].origin, GOOGLE_FRAME);
    assert.deepEqual(f.posted[0].data, {type: 'relayops-dur6-request', nonce: f.nonce, id: f.nonce + '-1', action: 'status', payload: {}});
    const alternate = {top: f.popup, postMessage() { assert.fail('must not repin'); }};
    f.ready(alternate, 'https://script.google.com');
    const message = {type: 'relayops-dur6-result', nonce: f.nonce, id: f.posted[0].data.id, result: {ok: true}};
    f.emit(message, alternate);
    f.emit(message, f.frame, 'https://script.google.com');
    f.result({ok: true}, {nonce: 'wrong'});
    f.result({ok: true}, {id: 'unknown'});
    const expected = {ok: true, stationCode: 'DUR6'};
    f.result(expected);
    assert.equal(await status, expected);
    s.close();
    f.clean();
  }
  {
    const f = fixture();
    const s = f.open();
    f.ready();
    const first = s.request('dry-run', {operationDate: '2026-09-07'});
    const second = s.request('send', {operationDate: '2026-09-07'});
    assert.equal(f.posted.length, 1, 'requests serialized');
    f.result({ok: true, dryRun: true});
    assert.equal(f.posted.length, 2);
    assert.equal(f.posted[1].data.action, 'send');
    assert.notEqual(f.posted[0].data.id, f.posted[1].data.id);
    f.result({ok: true, sheetName: 'DUR6 9.7.26'});
    assert.equal((await first).dryRun, true);
    assert.equal((await second).sheetName, 'DUR6 9.7.26');
    const failed = s.request('send');
    f.result({ok: false, error: 'Editing access required'});
    await assert.rejects(failed, {message: 'Editing access required', relayOpsConfirmed: true});
    await assert.rejects(s.request('delete'), {code: 'DUR6_INVALID_ACTION'});
    assert.equal(f.popup.closed, false, 'normal responses keep the session open');
    s.close(); f.clean();
  }
  {
    const f = fixture();
    const s = f.open();
    f.popup.postMessage = f.frame.postMessage;
    f.ready(f.popup, 'https://script.google.com');
    const result = s.request('status');
    assert.equal(f.posted[0].origin, 'https://script.google.com');
    f.emit({type: 'relayops-dur6-result', nonce: f.nonce, id: f.posted[0].data.id, result: {ok: true}}, f.popup, 'https://script.google.com');
    assert.equal((await result).ok, true);
    s.close(); f.clean();
  }
  for (const stage of ['before-ready', 'before-request', 'before-result', 'poll']) {
    const f = fixture();
    const s = f.open();
    if (stage !== 'before-ready') f.ready();
    if (stage === 'before-request') f.current = false;
    const request = s.request('send');
    const rejection = assert.rejects(request, {code: 'DUR6_STALE_CONTEXT'});
    f.current = false;
    if (stage === 'before-ready') f.ready();
    if (stage === 'before-result') f.result({ok: true});
    if (stage === 'poll') f.advance(250);
    await rejection;
    f.clean();
  }
  {
    const f = fixture(); const s = f.open();
    const pending = assert.rejects(s.request('status'), {code: 'DUR6_TRANSFER_TIMEOUT'});
    const queued = assert.rejects(s.request('dry-run'), {code: 'DUR6_TRANSFER_TIMEOUT'});
    f.advance(179999);
    assert.equal(f.popup.closed, false);
    f.advance(1);
    await Promise.all([pending, queued]);
    await assert.rejects(s.request('send'), {code: 'DUR6_TRANSFER_TIMEOUT'});
    f.clean();
  }
  {
    const f = fixture(); const s = f.open(); f.ready();
    const pending = assert.rejects(s.request('send'), {code: 'DUR6_TRANSFER_CLOSED'});
    f.popup.closed = true; f.advance(250); await pending; f.clean();
  }
  {
    const f = fixture(); const s = f.open(); f.ready();
    const pending = assert.rejects(s.request('send'), {code: 'DUR6_TRANSFER_CLOSED'});
    const queued = assert.rejects(s.request('status'), {code: 'DUR6_TRANSFER_CLOSED'});
    s.close(); s.close(); await Promise.all([pending, queued]); f.clean();
  }
  for (const throws of [false, true]) {
    const f = fixture();
    f.env.open = () => { if (throws) throw new Error('blocked'); return null; };
    assert.throws(() => f.open(), {code: 'DUR6_POPUP_BLOCKED'});
    assert.equal(f.listeners.size, 0); assert.equal(f.timers.size, 0);
  }
  {
    const f = fixture(); const s = f.open(); f.ready();
    f.frame.postMessage = () => { throw new Error('unavailable'); };
    await assert.rejects(s.request('send'), {code: 'DUR6_MESSAGE_FAILED'}); f.clean();
  }
  {
    const f = fixture(); const s = f.open(); f.ready();
    const pending = assert.rejects(s.request('send'), {code: 'DUR6_INVALID_RESPONSE'});
    f.result({unexpected: true}); await pending; f.clean();
  }
  const source = fs.readFileSync(path.join(__dirname, '../dur6-google-transfer.js'), 'utf8');
  assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|no-cors|Math\.random|postMessage\([^;]*,[\s]*['"]\*['"]/);
  console.log('DUR6 authenticated popup transfer: all tests passed.');
}

run().catch(error => { console.error(error); process.exitCode = 1; });
