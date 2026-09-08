(function (root) {
  'use strict';

  const MAX_SESSION_MS = 180000;
  const CHECK_INTERVAL_MS = 250;
  const ENDPOINT_PATTERN = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;
  const FRAME_ORIGIN_PATTERN = /^https:\/\/(?:script|[a-z0-9](?:[a-z0-9-]*[a-z0-9])?-script)\.googleusercontent\.com$/;
  const ACTIONS = new Set(['status', 'dry-run', 'send']);

  function transferError(message, code) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  function createClient(env) {
    function open(endpoint, options) {
      if (typeof endpoint !== 'string' || !ENDPOINT_PATTERN.test(endpoint)) {
        throw transferError('Choose a valid Google Apps Script DUR6 connector URL.', 'DUR6_INVALID_ENDPOINT');
      }
      if (!options || typeof options.isCurrent !== 'function') {
        throw transferError('The DUR6 transfer needs a current station and date check.', 'DUR6_MISSING_CONTEXT');
      }
      const isCurrent = () => {
        try { return options.isCurrent() === true; } catch (_) { return false; }
      };
      const staleError = () => transferError('The station or date changed. Reopen the DUR6 transfer from the current sheet.', 'DUR6_STALE_CONTEXT');
      if (!isCurrent()) throw staleError();

      const origin = String(env.location && env.location.origin || '');
      let parsedOrigin;
      try { parsedOrigin = new URL(origin); } catch (_) { /* Rejected below. */ }
      if (!parsedOrigin || !['http:', 'https:'].includes(parsedOrigin.protocol) || parsedOrigin.origin !== origin) {
        throw transferError('Open the dashboard from its normal web address before transferring.', 'DUR6_INVALID_ORIGIN');
      }
      if (!env.crypto || typeof env.crypto.getRandomValues !== 'function') {
        throw transferError('This browser cannot securely open the DUR6 transfer.', 'DUR6_NO_SECURE_RANDOM');
      }
      const randomHex = () => Array.from(env.crypto.getRandomValues(new Uint8Array(16)), value => value.toString(16).padStart(2, '0')).join('');
      const nonce = randomHex();
      const windowName = 'relayops_dur6_' + randomHex();
      const url = new URL(endpoint);
      url.searchParams.set('relayops', 'handoff');
      url.searchParams.set('origin', origin);
      url.searchParams.set('nonce', nonce);

      let popup = null;
      let pinnedSource = null;
      let pinnedOrigin = '';
      let pending = null;
      let sequence = 0;
      let closedError = null;
      let timeout = null;
      let checkInterval = null;
      const queue = [];

      function finish(error) {
        if (closedError) return;
        closedError = error || transferError('The DUR6 transfer window was closed.', 'DUR6_TRANSFER_CLOSED');
        env.removeEventListener('message', onMessage);
        if (timeout !== null) env.clearTimeout(timeout);
        if (checkInterval !== null) env.clearInterval(checkInterval);
        timeout = null;
        checkInterval = null;
        if (pending) {
          pending.reject(closedError);
          pending = null;
        }
        queue.splice(0).forEach(item => item.reject(closedError));
        pinnedSource = null;
        try { if (popup && !popup.closed) popup.close(); } catch (_) { /* Cross-origin window may already be gone. */ }
      }

      function checkContext() {
        if (closedError) return false;
        if (!isCurrent()) {
          finish(staleError());
          return false;
        }
        try {
          if (popup && popup.closed) {
            finish(transferError('The Google transfer window was closed. Open the DUR6 transfer again.', 'DUR6_TRANSFER_CLOSED'));
            return false;
          }
        } catch (_) { /* A navigation must not weaken message validation. */ }
        return true;
      }

      function pump() {
        if (!checkContext() || pending || !pinnedSource || !queue.length) return;
        pending = queue.shift();
        try {
          pinnedSource.postMessage({
            type: 'relayops-dur6-request', nonce, id: pending.id,
            action: pending.action, payload: pending.payload
          }, pinnedOrigin);
        } catch (_) {
          finish(transferError('Could not contact the authenticated Google transfer window. Reopen the DUR6 transfer.', 'DUR6_MESSAGE_FAILED'));
        }
      }

      function isTrustedSource(event) {
        if (!event.source || !popup || !(event.origin === 'https://script.google.com' || FRAME_ORIGIN_PATTERN.test(event.origin))) return false;
        try { return event.source.top === popup; } catch (_) { return false; }
      }

      function onMessage(event) {
        if (closedError || !event.data || typeof event.data !== 'object' || event.data.nonce !== nonce) return;
        if (!isTrustedSource(event)) return;
        if (event.data.type === 'relayops-dur6-ready') {
          if (pinnedSource || !checkContext()) return;
          pinnedSource = event.source;
          pinnedOrigin = event.origin;
          pump();
          return;
        }
        if (event.data.type !== 'relayops-dur6-result' || event.source !== pinnedSource || event.origin !== pinnedOrigin || !pending || event.data.id !== pending.id) return;
        if (!checkContext()) return;
        const result = event.data.result;
        if (!result || typeof result !== 'object' || Array.isArray(result) || typeof result.ok !== 'boolean') {
          finish(transferError('Google returned an unrecognized DUR6 transfer response. Check the sheet before retrying.', 'DUR6_INVALID_RESPONSE'));
          return;
        }
        const completed = pending;
        pending = null;
        if (result.ok === false) {
          const error = transferError(String(result.error || result.message || 'Google did not complete the DUR6 transfer.'), 'DUR6_SERVER_REJECTED');
          error.relayOpsConfirmed = true;
          completed.reject(error);
        } else {
          completed.resolve(result);
        }
        pump();
      }

      // Opening synchronously preserves the user's click gesture through Google sign-in.
      env.addEventListener('message', onMessage);
      try {
        popup = env.open(url.toString(), windowName, 'popup=yes,width=780,height=720');
      } catch (_) {
        finish(transferError('The Google transfer window could not open. Allow pop-ups for this dashboard and retry.', 'DUR6_POPUP_BLOCKED'));
        throw closedError;
      }
      if (!popup) {
        finish(transferError('The Google transfer window was blocked. Allow pop-ups for this dashboard and retry.', 'DUR6_POPUP_BLOCKED'));
        throw closedError;
      }
      // One bounded lifetime includes sign-in, validation, and confirmation; no background polling survives it.
      timeout = env.setTimeout(() => finish(transferError('The DUR6 transfer timed out. Check Google Sheets before retrying a send.', 'DUR6_TRANSFER_TIMEOUT')), MAX_SESSION_MS);
      checkInterval = env.setInterval(checkContext, CHECK_INTERVAL_MS);

      return Object.freeze({
        request(action, payload) {
          if (closedError) return Promise.reject(closedError);
          if (!checkContext()) return Promise.reject(closedError);
          if (!ACTIONS.has(action)) return Promise.reject(transferError('That DUR6 transfer action is not supported.', 'DUR6_INVALID_ACTION'));
          return new Promise((resolve, reject) => {
            queue.push({id: nonce + '-' + (++sequence), action, payload: payload == null ? {} : payload, resolve, reject});
            pump();
          });
        },
        close() { finish(); }
      });
    }
    return Object.freeze({open});
  }

  if (typeof module === 'object' && module.exports) module.exports = {createClient};
  if (root && root.window === root) root.RelayOpsDur6Transfer = createClient(root);
})(typeof window !== 'undefined' ? window : globalThis);
