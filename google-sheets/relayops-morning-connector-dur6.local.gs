// RelayOps DUR6 Morning Sheet connector — authenticated Google-user handoff.
//
// This file is intentionally separate from the live DJT6 connector. Configure
// its spreadsheet ID to the same workbook used by DJT6. DUR6 owns only its
// station-prefixed dated tabs copied from the exact OPS LOG DUR6 template.
// The authorized workbook/template IDs below bind standalone setup to the
// supplied Google Sheet. No deployment URL or credentials are included.
// Until the required Script Properties are supplied it can report status,
// but it cannot read or write a workbook. Real writes also require the explicit
// RELAYOPS_DUR6_WRITES_ENABLED=true safety switch.
// Deploy the web app as "User accessing the web app" and require signed-in
// Google accounts. Existing spreadsheet editing rights remain authoritative;
// this project never adds sharing or borrows its owner's credentials. Direct
// POST writes are disabled. Transfers use the verified HtmlService handoff,
// a fresh user-bound preview, explicit confirmation, and a same-date CAS check.
//
// Standalone installation: paste this file into a separate Apps Script
// project, then run relayOpsDur6ConfigureStandalone_ from the editor. It sets
// only this project's three DUR6 Script Properties, leaves writes disabled,
// and logs read-only validation. Run relayOpsDur6ValidateStandalone to repeat
// validation without changing configuration. Neither needs a bound-sheet UI;
// Internal helpers use Apps Script's private trailing-underscore convention,
// so google.script.run cannot call setup, receipt, or low-level write helpers.
// Do not run onOpen_ in a standalone project. No triggers/deployment are added.
//
// Required Script Properties:
//   RELAYOPS_DUR6_SPREADSHEET_ID  (the shared DJT6/DUR6 spreadsheet ID)
//   RELAYOPS_DUR6_TEMPLATE_SHEET=OPS LOG DUR6
//   RELAYOPS_DUR6_WRITES_ENABLED=false  (leave false through dry-run review)

const RELAYOPS_DUR6_STATION = 'DUR6';
const RELAYOPS_DUR6_WORKBOOK_KEY = 'DUR6_OPS_LOG';
const RELAYOPS_DUR6_TEMPLATE_SHEET = 'OPS LOG DUR6';
const RELAYOPS_DUR6_EXPECTED_SPREADSHEET_ID = '1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ';
const RELAYOPS_DUR6_EXPECTED_TEMPLATE_ID = 1876715045;
const RELAYOPS_DUR6_LAYOUT_ID = 'dur6-ops-log-v1';
const RELAYOPS_DUR6_BUILD = '2026-09-07-dur6-google-editors-v2';
const RELAYOPS_DUR6_START_ROW = 3;
const RELAYOPS_DUR6_LAST_ROW = 142;
const RELAYOPS_DUR6_TEMPLATE_COLS = 22;
const RELAYOPS_DUR6_COMPACT_COLS = 13;
const RELAYOPS_DUR6_WRITE_RANGE = 'A3:M';
const RELAYOPS_DUR6_WRITTEN_RANGES = 'A3:H142, P3:Q142, U3:U142';
const RELAYOPS_DUR6_MAX_POST_BYTES = 750000;
const RELAYOPS_DUR6_PREFLIGHT_SECONDS = 180;
const RELAYOPS_DUR6_HANDOFF_ORIGINS = Object.freeze(['http://localhost:4173', 'http://127.0.0.1:4173', 'https://alecgonz79-ai.github.io']);
const RELAYOPS_DUR6_REQUIRED_SCOPES = Object.freeze(['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/userinfo.email']);
const RELAYOPS_DUR6_LAYOUT = Object.freeze([
  {key:'WAVE1', label:'WAVE 1', startRow:3, routeCapacity:15, timeRow:18, separatorRow:19},
  {key:'WAVE2', label:'WAVE 2', startRow:20, routeCapacity:15, timeRow:35, separatorRow:36},
  {key:'WAVE3', label:'WAVE 3', startRow:37, routeCapacity:15, timeRow:52, separatorRow:53},
  {key:'WAVE4', label:'WAVE 4', startRow:54, routeCapacity:15, timeRow:69, separatorRow:70},
  {key:'WAVE5', label:'WAVE 5', startRow:71, routeCapacity:15, timeRow:86, separatorRow:87},
  {key:'WAVE6', label:'WAVE 6', startRow:88, routeCapacity:15, timeRow:103, separatorRow:104},
  {key:'ADHOCS', label:"ADHOC's", startRow:105, routeCapacity:15, separatorRow:120},
  {key:'HELPERS', label:'HELPERS', startRow:121, routeCapacity:15, separatorRow:136},
  {key:'DSP', label:'DSP', startRow:137, routeCapacity:6}
]);

function onOpen_() {
  SpreadsheetApp.getUi()
    .createMenu('RelayOps DUR6')
    .addItem('Connector status', 'relayOpsDur6ConnectorStatus_')
    .addItem('Validate DUR6 template', 'relayOpsDur6ValidateTemplate_')
    .addToUi();
}

function relayOpsDur6ConfigureStandalone_() {
  relayOpsDur6RequireScopes_();
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const properties = PropertiesService.getScriptProperties();
    // Fail closed even if validation fails or this helper is run again later.
    // Other station settings, write receipts, and deployments are not changed.
    properties.setProperty('RELAYOPS_DUR6_WRITES_ENABLED', 'false');
    const spreadsheetId = String(properties.getProperty('RELAYOPS_DUR6_SPREADSHEET_ID') || '').trim();
    const templateSheet = String(properties.getProperty('RELAYOPS_DUR6_TEMPLATE_SHEET') || '').trim();
    if (spreadsheetId && spreadsheetId !== RELAYOPS_DUR6_EXPECTED_SPREADSHEET_ID) throw new Error('Refusing to replace an existing DUR6 spreadsheet configuration; writes have been disabled.');
    if (templateSheet && templateSheet !== RELAYOPS_DUR6_TEMPLATE_SHEET) throw new Error('Refusing to replace an existing DUR6 template configuration; writes have been disabled.');
    properties.setProperty('RELAYOPS_DUR6_SPREADSHEET_ID', RELAYOPS_DUR6_EXPECTED_SPREADSHEET_ID);
    properties.setProperty('RELAYOPS_DUR6_TEMPLATE_SHEET', RELAYOPS_DUR6_TEMPLATE_SHEET);
    return relayOpsDur6ValidateStandalone();
  } finally {
    lock.releaseLock();
  }
}

function relayOpsDur6ValidateStandalone() {
  relayOpsDur6RequireScopes_();
  const config = relayOpsDur6RequireConfiguration_(false);
  const ss = relayOpsDur6Spreadsheet_(config);
  const template = relayOpsDur6Template_(ss);
  const result = {
    ok: true,
    ready: true,
    readOnly: true,
    stationCode: RELAYOPS_DUR6_STATION,
    workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
    build: RELAYOPS_DUR6_BUILD,
    spreadsheet: ss.getName(),
    spreadsheetId: ss.getId(),
    templateSheet: template.getName(),
    templateSheetId: template.getSheetId(),
    writesEnabled: config.writesEnabled,
    targetSheet: '',
    dailyNameFormat: 'DUR6 M.D.YY',
    waveSlotCount: 3,
    lastRow: RELAYOPS_DUR6_LAST_ROW,
    templateRange: 'A3:V142',
    writtenRanges: RELAYOPS_DUR6_WRITTEN_RANGES,
    checkedAt: new Date().toISOString()
  };
  console.log(JSON.stringify(result));
  return result;
}

function relayOpsDur6Configuration_() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = String(properties.getProperty('RELAYOPS_DUR6_SPREADSHEET_ID') || '').trim();
  const templateSheet = String(properties.getProperty('RELAYOPS_DUR6_TEMPLATE_SHEET') || '').trim();
  const writesEnabled = /^true$/i.test(String(properties.getProperty('RELAYOPS_DUR6_WRITES_ENABLED') || 'false').trim());
  const missingProperties = [];
  const configurationErrors = [];
  if (!spreadsheetId) missingProperties.push('RELAYOPS_DUR6_SPREADSHEET_ID');
  if (spreadsheetId && spreadsheetId !== RELAYOPS_DUR6_EXPECTED_SPREADSHEET_ID) configurationErrors.push('RELAYOPS_DUR6_SPREADSHEET_ID must match the authorized shared DJT6/DUR6 spreadsheet');
  if (!templateSheet) missingProperties.push('RELAYOPS_DUR6_TEMPLATE_SHEET');
  if (templateSheet && templateSheet !== RELAYOPS_DUR6_TEMPLATE_SHEET) configurationErrors.push('RELAYOPS_DUR6_TEMPLATE_SHEET must be exactly ' + RELAYOPS_DUR6_TEMPLATE_SHEET);
  return {
    spreadsheetId: spreadsheetId,
    templateSheet: templateSheet,
    writesEnabled: writesEnabled,
    configured: missingProperties.length === 0 && configurationErrors.length === 0,
    missingProperties: missingProperties,
    configurationErrors: configurationErrors
  };
}

function relayOpsDur6RequireConfiguration_(forWrite) {
  const config = relayOpsDur6Configuration_();
  if (!config.configured) {
    throw new Error('DUR6 connector is not provisioned. ' + (config.missingProperties.length ? 'Missing Script Properties: ' + config.missingProperties.join(', ') + '. ' : '') + config.configurationErrors.join('; '));
  }
  if (forWrite && !config.writesEnabled) {
    throw new Error('DUR6 writes are disabled. Complete template validation and dry-run review before setting RELAYOPS_DUR6_WRITES_ENABLED=true.');
  }
  return config;
}

function relayOpsDur6ConnectorStatus_() {
  const config = relayOpsDur6Configuration_();
  const lines = [
    'Station: ' + RELAYOPS_DUR6_STATION,
    'Layout: ' + RELAYOPS_DUR6_LAYOUT_ID,
    'Build: ' + RELAYOPS_DUR6_BUILD,
    'Provisioned: ' + (config.configured ? 'yes' : 'no'),
    'Writes enabled: ' + (config.writesEnabled ? 'yes' : 'no')
  ];
  if (config.missingProperties.length) lines.push('Missing: ' + config.missingProperties.join(', '));
  if (config.configurationErrors.length) lines.push('Configuration: ' + config.configurationErrors.join('; '));
  SpreadsheetApp.getUi().alert(
    'RelayOps DUR6 connector',
    lines.join('\n'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function doGet(e) {
  relayOpsDur6RequireScopes_();
  if (e && e.parameter && e.parameter.relayops === 'handoff') return relayOpsDur6HandoffPage_(e.parameter);
  if (e && e.parameter && e.parameter.relayops === 'status-page') return relayOpsDur6HandoffPage_({}, true);
  return relayOpsDur6Json_(relayOpsDur6BridgeStatus());
}

function relayOpsDur6HandoffPage_(parameters, readOnly) {
  const origin = String(parameters.origin || '');
  const nonce = String(parameters.nonce || '');
  if (!readOnly && (RELAYOPS_DUR6_HANDOFF_ORIGINS.indexOf(origin) < 0 || !/^[a-f0-9]{32,64}$/.test(nonce))) {
    return HtmlService.createHtmlOutput('<!doctype html><html><head><title>DUR6 transfer</title></head><body><h1>DUR6 transfer unavailable</h1><p>Open the transfer window from the RelayOps dashboard. This link has no trusted dashboard session.</p></body></html>').setTitle('DUR6 transfer');
  }
  // Only allowlisted origins and a hexadecimal nonce enter the document. All
  // runtime payload/error values are rendered using textContent, never HTML.
  const settings = JSON.stringify({origin: origin, nonce: nonce, readOnly: Boolean(readOnly), maxBytes: RELAYOPS_DUR6_MAX_POST_BYTES}).replace(/</g, '\\u003c');
  const html = `<!doctype html><html lang="en"><head><base target="_top"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DUR6 morning sheet transfer</title>
<style>
:root{color-scheme:light;--navy:#172c40;--deep:#0f1f2e;--blue:#0b78d0;--sky:#e9f3fa;--paper:#fff;--ink:#203246;--muted:#5b6b76}*{box-sizing:border-box}body{margin:0;background:var(--sky);color:var(--ink);font-family:"Segoe UI",Arial,sans-serif;font-size:16px;line-height:1.5}header{background:var(--navy);color:var(--paper);padding:22px 26px;border-bottom:5px solid var(--blue)}header span{font:700 13px/1.4 ui-monospace,Consolas,monospace;letter-spacing:.08em}h1{font-size:24px;line-height:1.2;margin:9px 0 0;font-weight:650}main{max-width:620px;margin:24px auto;padding:0 20px}.panel{background:var(--paper);padding:24px;border-radius:12px;border:1px solid #d3e0e9}p{margin:0 0 16px}.muted{color:var(--muted);font-size:14px}dl{margin:20px 0;border-left:4px solid var(--blue);padding:0 0 0 16px}dt{font-size:13px;color:var(--muted)}dd{margin:0 0 14px;font-weight:650;overflow-wrap:anywhere}button{font:600 16px/1.4 "Segoe UI",Arial,sans-serif;padding:12px 18px;border:0;border-radius:7px;background:var(--blue);color:var(--paper);cursor:pointer;min-height:44px}button.secondary{background:var(--sky);color:var(--ink)}button:disabled{opacity:.5;cursor:default}button:focus-visible{outline:3px solid var(--deep);outline-offset:3px}.actions{display:flex;gap:10px;flex-wrap:wrap}#message{white-space:pre-wrap;overflow-wrap:anywhere}#message.error{color:#a12c30}#message.success{color:#176943}[hidden]{display:none!important}@media(max-width:380px){header{padding:18px}main{padding:0 12px}.panel{padding:18px}.actions button{width:100%}}
</style></head><body><header><span>RELAYOPS / DUR6</span><h1>Morning sheet transfer</h1></header><main><section class="panel" aria-label="DUR6 transfer"><p id="message" role="status" aria-live="polite">Connecting to your dashboard…</p><p class="muted">Uses your signed-in Google account and existing spreadsheet access. DJT6 sheets and the OPS LOG DUR6 template stay unchanged.</p><dl id="preview" hidden><dt>Destination</dt><dd id="destination"></dd><dt>Morning routes</dt><dd id="routes"></dd><dt>Transfer</dt><dd id="mode"></dd></dl><div class="actions"><button id="confirm" type="button" hidden>Confirm DUR6 transfer</button><button id="cancel" class="secondary" type="button" hidden>Cancel</button></div></section><p class="muted" style="margin-top:16px">Keep this window open until the transfer is confirmed.</p></main>
<script>
(function(){'use strict';
const settings=${settings};
const message=document.getElementById('message'),preview=document.getElementById('preview'),confirm=document.getElementById('confirm'),cancel=document.getElementById('cancel');
const completed=new Map();let pending=null;let busy=false;let opener=null;let readyTimer=null;let expiryTimer=null;
function show(text,kind){message.textContent=String(text||'');message.className=kind||'';}
function statusMessage(status){if(!status||!status.ok)return status&&status.error||'The DUR6 connector is unavailable.';if(status.canEdit===false)return 'This Google account has read-only access. Editing access is required to transfer the DUR6 morning sheet.';return 'DUR6 connector validated. '+(status.writesEnabled?'Transfers are enabled.':'Transfers remain disabled.');}
function send(value){if(opener)opener.postMessage(value,settings.origin);}
function result(id,value){completed.set(id,value);while(completed.size>50)completed.delete(completed.keys().next().value);send({type:'relayops-dur6-result',nonce:settings.nonce,id:id,result:value});}
function failed(error){return {ok:false,error:String(error&&error.message||error||'Google transfer failed. Try again.')};}
function invoke(name,payload){return new Promise(function(resolve){try{const runner=google.script.run.withSuccessHandler(resolve).withFailureHandler(function(error){resolve(failed(error));});if(name==='status')runner.relayOpsDur6BridgeStatus();else runner.relayOpsDur6BridgeSubmit(payload);}catch(error){resolve(failed(error));}});}
function finish(id,value){busy=false;pending=null;clearTimeout(expiryTimer);confirm.hidden=true;cancel.hidden=true;confirm.disabled=false;result(id,value);}
function validResult(value){return value&&value.ok&&value.stationCode==='DUR6'&&value.workbookKey==='DUR6_OPS_LOG'&&value.build==='${RELAYOPS_DUR6_BUILD}';}
async function receive(event){
 if(!opener||event.origin!==settings.origin||event.source!==opener)return;
 const data=event.data;if(!data||data.type!=='relayops-dur6-request'||data.nonce!==settings.nonce||typeof data.id!=='string'||!/^[a-zA-Z0-9._:-]{1,128}$/.test(data.id))return;
 if(completed.has(data.id)){result(data.id,completed.get(data.id));return;}
 if(busy){if(!pending||pending.id!==data.id)result(data.id,failed('A DUR6 transfer is already being reviewed. Finish or cancel it first.'));return;}
 if(['status','dry-run','send'].indexOf(data.action)<0){result(data.id,failed('Unsupported DUR6 transfer action.'));return;}
 clearInterval(readyTimer);busy=true;pending={id:data.id};show('Checking DUR6 spreadsheet access…');preview.hidden=true;
 if(data.action==='status'){const status=await invoke('status');show(statusMessage(status),status&&status.ok&&status.canEdit!==false?'':'error');finish(data.id,status);return;}
 let payload;try{const text=JSON.stringify(data.payload);if(!text||text.length>settings.maxBytes)throw new Error('The morning sheet exceeds the safe transfer limit.');payload=JSON.parse(text);if(!payload||typeof payload!=='object'||Array.isArray(payload))throw new Error('No DUR6 morning sheet was supplied.');}catch(error){const value=failed(error);show(value.error,'error');finish(data.id,value);return;}
 delete payload.expectedWriteToken;delete payload.preflightToken;payload.dryRun=true;
 const check=await invoke('submit',payload);
 if(!validResult(check)||!check.dryRun){const value=check&&check.ok?failed('DUR6 connector identity could not be verified.'):check;show(value&&value.error||'DUR6 preview failed.','error');finish(data.id,value);return;}
 document.getElementById('destination').textContent=check.targetSheet;
 document.getElementById('routes').textContent=String(check.routeCount);
 document.getElementById('mode').textContent=check.wouldCreateSheet?'Create a dated copy of OPS LOG DUR6':'Update the existing DUR6 date; keep a backup first';preview.hidden=false;
 if(data.action==='dry-run'){show('Preview checked. No Google sheets were changed.','success');finish(data.id,check);return;}
 if(!check.writesEnabled){const value=failed('DUR6 transfers are disabled. Your preview is valid; no Google sheets were changed.');show(value.error,'error');finish(data.id,value);return;}
 payload.dryRun=false;payload.expectedWriteToken=check.expectedWriteToken;payload.preflightToken=check.preflightToken;pending={id:data.id,payload:payload};confirm.hidden=false;cancel.hidden=false;
 show('Review this DUR6 destination, then confirm the transfer.');
 expiryTimer=setTimeout(function(){if(pending&&pending.id===data.id){const value=failed('The DUR6 preview expired. Start the transfer again to review current data.');show(value.error,'error');finish(data.id,value);}},Math.max(0,new Date(check.preflightExpiresAt).getTime()-Date.now()));
}
confirm.addEventListener('click',async function(){if(!pending||!pending.payload||confirm.disabled)return;const transfer=pending;confirm.disabled=true;cancel.hidden=true;clearTimeout(expiryTimer);show('Transferring to '+transfer.payload.sheetName+'…');const value=await invoke('submit',transfer.payload);if(validResult(value)&&!value.dryRun){show('Transferred to '+value.targetSheet+'. You can return to the dashboard.','success');finish(transfer.id,value);}else{const failure=value&&value.ok?failed('The transfer response could not be verified. Check Google Sheets before retrying.'):value;show(failure&&failure.error||'The transfer failed.','error');finish(transfer.id,failure);}});
cancel.addEventListener('click',function(){if(!pending||confirm.disabled)return;const id=pending.id;show('Transfer canceled. No Google sheets were changed.');finish(id,{ok:false,canceled:true,error:'DUR6 transfer canceled.'});});
if(settings.readOnly){show('Checking DUR6 connector status…');invoke('status').then(function(status){show(statusMessage(status),status&&status.ok&&status.canEdit!==false?'success':'error');if(status&&status.ok){document.getElementById('destination').textContent=(status.spreadsheet||'Shared workbook')+' / '+status.templateSheet;document.getElementById('routes').textContent='Read-only status check';document.getElementById('mode').textContent=(status.signedInUser||'Signed-in Google account')+' · '+(status.canEdit===false?'Read-only access':'Existing editing access');preview.hidden=false;}});return;}
try{opener=window.top.opener;}catch(error){opener=null;}
if(!opener){show('Open this transfer from the RelayOps dashboard so your morning sheet can be verified. No Google sheets were changed.','error');return;}
window.addEventListener('message',receive);
function ready(){send({type:'relayops-dur6-ready',nonce:settings.nonce});}
ready();readyTimer=setInterval(ready,1000);setTimeout(function(){clearInterval(readyTimer);},600000);
})();
</script></body></html>`;
  return HtmlService.createHtmlOutput(html).setTitle(readOnly ? 'DUR6 connector status' : 'DUR6 morning sheet transfer');
}

function relayOpsDur6BridgeStatus() {
  relayOpsDur6RequireScopes_();
  try {
    const googleUser = relayOpsDur6RequireGoogleUser_();
    const config = relayOpsDur6Configuration_();
    let templateReady = false;
    let spreadsheetName = '';
    let spreadsheetId = '';
    let canEdit = false;
    if (config.configured) {
      const ss = relayOpsDur6Spreadsheet_(config);
      const template = relayOpsDur6Template_(ss);
      canEdit = relayOpsDur6CanEditTarget_({sheet: template});
      templateReady = true;
      spreadsheetName = ss.getName();
      spreadsheetId = ss.getId();
    }
    return {
      ok: true,
      connector: 'relayops-morning-v2',
      stationCode: RELAYOPS_DUR6_STATION,
      workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
      layoutId: RELAYOPS_DUR6_LAYOUT_ID,
      build: RELAYOPS_DUR6_BUILD,
      configured: config.configured,
      writesEnabled: config.writesEnabled && canEdit,
      connectorWritesEnabled: config.writesEnabled,
      canEdit: canEdit,
      access: canEdit ? 'editor' : 'read-only',
      authentication: 'google-user-spreadsheet-editors',
      signedInUser: googleUser,
      templateReady: templateReady,
      spreadsheet: spreadsheetName,
      spreadsheetId: spreadsheetId,
      templateSheet: config.configured ? config.templateSheet : '',
      targetSheet: '',
      missingProperties: config.missingProperties,
      configurationErrors: config.configurationErrors,
      waveSlotCount: 3,
      waveTimes: 3,
      writeMode: 'full-replace',
      templateRange: 'A3:V142',
      writtenRange: 'A3:V142',
      writtenRanges: RELAYOPS_DUR6_WRITTEN_RANGES,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    return relayOpsDur6Failure_(error);
  }
}

function doPost() {
  return relayOpsDur6Json_(relayOpsDur6Failure_(new Error('DUR6 transfers require the signed-in Google transfer window. Direct POST transfers are disabled.')));
}

// These two Bridge methods are the only public google.script.run entry points.
// Setup, receipt, target, and writer helpers end in _ and cannot be called from
// HtmlService. Deploy this project as the accessing user, never as the owner.
function relayOpsDur6BridgeSubmit(input) {
  relayOpsDur6RequireScopes_();
  let lock = null;
  try {
    relayOpsDur6RequireGoogleUser_();
    const raw = typeof input === 'string' ? input : JSON.stringify(input || {});
    if (!raw) throw new Error('No DUR6 payload was supplied');
    if (raw.length > RELAYOPS_DUR6_MAX_POST_BYTES) throw new Error('DUR6 payload is larger than the safe connector limit');
    const payload = JSON.parse(raw);
    const config = relayOpsDur6RequireConfiguration_(false);
    const validation = relayOpsDur6ValidatePayload_(payload, config);
    if (!validation.ready) throw new Error('DUR6 preflight failed: ' + validation.errors.join('; '));

    const preflightTarget = relayOpsDur6ResolveTarget_(payload, config, false);
    relayOpsDur6RequireWorkbookEditor_(preflightTarget);

    const payloadHash = relayOpsDur6PayloadHash_(payload);
    const previewDisposition = relayOpsDur6WriteDisposition_(payload, payloadHash);
    if (payload.dryRun) {
      const target = preflightTarget;
      const expectedWriteToken = relayOpsDur6WriteToken_(payload);
      const preflightToken = relayOpsDur6IssuePreflight_(payload, payloadHash, expectedWriteToken);
      return {
        ok: true,
        dryRun: true,
        stationCode: RELAYOPS_DUR6_STATION,
        workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
        layoutId: RELAYOPS_DUR6_LAYOUT_ID,
        build: RELAYOPS_DUR6_BUILD,
        sheet: target.targetName,
        targetSheet: target.targetName,
        spreadsheetId: target.spreadsheet.getId(),
        templateSheet: config.templateSheet,
        wouldCreateSheet: target.wouldCreate,
        writesEnabled: config.writesEnabled,
        activeWaveCount: Number(payload.activeWaveCount),
        waveSlotCount: 3,
        waveTimes: 3,
        writeMode: payload.writeMode,
        rows: (payload.rows || []).length,
        sections: (payload.sections || []).length,
        duplicate: previewDisposition.duplicate,
        expectedWriteToken: expectedWriteToken,
        preflightToken: preflightToken,
        preflightExpiresAt: new Date(Date.now() + RELAYOPS_DUR6_PREFLIGHT_SECONDS * 1000).toISOString(),
        routeCount: payload.sections.reduce(function(count, section) { return count + relayOpsDur6SectionRows_(payload, section).length; }, 0),
        templateRange: 'A3:V142',
        writtenRange: 'A3:V142',
        lastCell: 'V142',
        writtenRanges: RELAYOPS_DUR6_WRITTEN_RANGES,
        preflight: validation,
        checkedAt: new Date().toISOString()
      };
    }

    relayOpsDur6RequireConfiguration_(true);
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    // Setup may have disabled writes while this request was waiting for the lock.
    relayOpsDur6RequireConfiguration_(true);

    // Recheck idempotency and revision ordering after the lock is held. Two
    // dispatchers can reach the web app at the same time; only one may decide
    // that a write is current.
    const disposition = relayOpsDur6WriteDisposition_(payload, payloadHash);
    if (disposition.duplicate) {
      const existing = relayOpsDur6ResolveTarget_(payload, config, false);
      if (existing.wouldCreate || !disposition.previous || disposition.previous.sheetName !== existing.targetName) throw new Error('The previously written DUR6 dated tab changed or is missing. Review the workbook before retrying.');
      return {
        ok: true,
        duplicate: true,
        stationCode: RELAYOPS_DUR6_STATION,
        workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
        layoutId: RELAYOPS_DUR6_LAYOUT_ID,
        build: RELAYOPS_DUR6_BUILD,
        requestId: payload.requestId,
        sheet: existing.targetName,
        targetSheet: existing.targetName,
        spreadsheetId: existing.spreadsheet.getId(),
        templateSheet: config.templateSheet,
        waveTimes: 3,
        writeMode: payload.writeMode,
        templateRange: 'A3:V142',
        writtenRange: 'A3:V142',
        lastCell: 'V142',
        writtenRanges: RELAYOPS_DUR6_WRITTEN_RANGES,
        updatedAt: disposition.previous && disposition.previous.updatedAt || new Date().toISOString()
      };
    }

    relayOpsDur6RequirePreflight_(payload, payloadHash);
    if (payload.expectedWriteToken !== relayOpsDur6WriteToken_(payload)) throw new Error('Another dispatcher changed this DUR6 date after your preview. Review a fresh preview before transferring.');
    relayOpsDur6RequireWorkbookEditor_(relayOpsDur6ResolveTarget_(payload, config, false));
    const target = relayOpsDur6ResolveTarget_(payload, config, true);
    const backupSheet = target.created ? '' : relayOpsDur6BackupSheet_(target.spreadsheet, target.sheet);
    const result = relayOpsDur6WriteMorningSheet_(target.sheet, payload);
    relayOpsDur6RecordWrite_(payload, payloadHash, result.sheetName);
    return {
      ok: true,
      duplicate: false,
      stationCode: RELAYOPS_DUR6_STATION,
      workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
      layoutId: RELAYOPS_DUR6_LAYOUT_ID,
      build: RELAYOPS_DUR6_BUILD,
      requestId: payload.requestId,
      workspaceRevision: relayOpsDur6PayloadRevision_(payload),
      sheet: result.sheetName,
      targetSheet: result.sheetName,
      spreadsheetId: target.spreadsheet.getId(),
      templateSheet: config.templateSheet,
      createdSheet: target.created,
      backupSheet: backupSheet,
      activeWaveCount: Number(payload.activeWaveCount),
      waveSlotCount: 3,
      waveTimes: 3,
      writeMode: payload.writeMode,
      updatedRoutes: result.updatedRoutes,
      updated: result.updatedRoutes,
      waveLabels: result.waveLabels,
      templateRange: 'A3:V142',
      writtenRange: 'A3:V142',
      writtenRanges: RELAYOPS_DUR6_WRITTEN_RANGES,
      lastCell: 'V142',
      preflight: validation,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    return relayOpsDur6Failure_(error);
  } finally {
    if (lock) lock.releaseLock();
  }
}

function relayOpsDur6Json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function relayOpsDur6Error_(error) {
  return relayOpsDur6Json_(relayOpsDur6Failure_(error));
}

function relayOpsDur6Failure_(error) {
  return {
    ok: false,
    stationCode: RELAYOPS_DUR6_STATION,
    workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
    layoutId: RELAYOPS_DUR6_LAYOUT_ID,
    build: RELAYOPS_DUR6_BUILD,
    error: error && error.message ? error.message : String(error),
    updatedAt: new Date().toISOString()
  };
}

function relayOpsDur6RequireGoogleUser_() {
  const active = String(Session.getActiveUser().getEmail() || '').trim().toLowerCase();
  const effective = String(Session.getEffectiveUser().getEmail() || '').trim().toLowerCase();
  if (!active || !effective || active !== effective) throw new Error('Sign in with a Google account that can edit the spreadsheet. This connector must run as the accessing user.');
  return active;
}

function relayOpsDur6RequireScopes_() {
  // Keep this outside entry-point try/catch blocks: Google must stop execution
  // and render its own consent prompt when a user granted only partial access.
  ScriptApp.requireScopes(ScriptApp.AuthMode.FULL, RELAYOPS_DUR6_REQUIRED_SCOPES);
}

function relayOpsDur6RequireWorkbookEditor_(target) {
  if (!relayOpsDur6CanEditTarget_(target)) {
    throw new Error('Your signed-in Google account cannot edit this DUR6 sheet. Ask the spreadsheet owner for editing access.');
  }
}

function relayOpsDur6CanEditTarget_(target) {
  return Boolean(target && target.sheet && [[3,1,140,8], [3,16,140,2], [3,21,140,1]].every(function(range) {
    return target.sheet.getRange(range[0], range[1], range[2], range[3]).canEdit();
  }));
}

function relayOpsDur6WriteToken_(payload) {
  return relayOpsDur6PayloadHash_({receipt: relayOpsDur6PreviousWrite_(payload), operationDate: payload.operationDate, spreadsheetId: payload.spreadsheetId});
}

function relayOpsDur6IssuePreflight_(payload, payloadHash, expectedWriteToken) {
  const token = String(Utilities.getUuid()).replace(/-/g, '');
  CacheService.getUserCache().put('DUR6_PREFLIGHT_' + token, JSON.stringify({payloadHash: payloadHash, expectedWriteToken: expectedWriteToken, issuedAt: Date.now()}), RELAYOPS_DUR6_PREFLIGHT_SECONDS);
  return token;
}

function relayOpsDur6RequirePreflight_(payload, payloadHash) {
  if (!/^[a-f0-9]{32}$/.test(String(payload.preflightToken || '')) || !/^[a-f0-9]{64}$/.test(String(payload.expectedWriteToken || ''))) throw new Error('A fresh DUR6 preview is required before transferring.');
  const raw = CacheService.getUserCache().get('DUR6_PREFLIGHT_' + payload.preflightToken);
  let preflight = null;
  try { preflight = raw ? JSON.parse(raw) : null; } catch (_) { /* Reject an invalid or expired preview. */ }
  if (!preflight || Date.now() - preflight.issuedAt > RELAYOPS_DUR6_PREFLIGHT_SECONDS * 1000 || preflight.payloadHash !== payloadHash || preflight.expectedWriteToken !== payload.expectedWriteToken) throw new Error('Your DUR6 preview expired or the data changed. Review a fresh preview before transferring.');
}

function relayOpsDur6SectionKey_(value) {
  const key = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (key === 'ADHOC' || key === 'ADHOCS') return 'ADHOCS';
  return key;
}

function relayOpsDur6LayoutForSection_(section) {
  const key = relayOpsDur6SectionKey_(section && (section.slotKey || section.label || section.wave));
  for (let i = 0; i < RELAYOPS_DUR6_LAYOUT.length; i++) {
    if (RELAYOPS_DUR6_LAYOUT[i].key === key) return RELAYOPS_DUR6_LAYOUT[i];
  }
  return null;
}

function relayOpsDur6AllowedDateNames_(operationDate) {
  const match = String(operationDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return [];
  const fullYear = Number(match[1]);
  const monthNumber = Number(match[2]);
  const dayNumber = Number(match[3]);
  const date = new Date(Date.UTC(fullYear, monthNumber - 1, dayNumber));
  if (date.getUTCFullYear() !== fullYear || date.getUTCMonth() !== monthNumber - 1 || date.getUTCDate() !== dayNumber) return [];
  const year = String(fullYear).slice(-2);
  const month = String(monthNumber);
  const day = String(dayNumber);
  return ['DUR6 ' + month + '.' + day + '.' + year, 'DUR6 ' + month + '/' + day + '/' + year];
}

function relayOpsDur6SectionRows_(payload, section) {
  const sourceIndex = Number(section && section.sourceIndex);
  const rowCount = Number(section && section.rowCount);
  if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || !Number.isInteger(rowCount) || rowCount < 0) return [];
  return (payload.rows || []).slice(sourceIndex, sourceIndex + rowCount).filter(function(row) {
    return Array.isArray(row) && [row[1], row[2], row[5]].some(function(value) {
      return String(value === undefined || value === null ? '' : value).trim() !== '';
    });
  });
}

function relayOpsDur6ValidatePayload_(payload, config) {
  const errors = [];
  const versions = ['relayops-morning-v1', 'relayops-morning-v2'];
  const rows = payload && Array.isArray(payload.rows) ? payload.rows : [];
  const rowTypes = payload && Array.isArray(payload.rowTypes) ? payload.rowTypes : [];
  const headers = payload && Array.isArray(payload.headers) ? payload.headers : [];
  const sections = payload && Array.isArray(payload.sections) ? payload.sections : [];
  const waves = payload && Array.isArray(payload.waves) ? payload.waves : [];
  const activeWaveCount = Number(payload && payload.activeWaveCount);

  if (!payload || versions.indexOf(payload.version) < 0) errors.push('Payload version must be relayops-morning-v1 or relayops-morning-v2');
  if (String(payload && payload.stationCode || '').trim().toUpperCase() !== RELAYOPS_DUR6_STATION) errors.push('Station identity must be DUR6');
  if (String(payload && payload.workbookKey || '').trim().toUpperCase() !== RELAYOPS_DUR6_WORKBOOK_KEY) errors.push('Workbook identity must use the DUR6 namespace ' + RELAYOPS_DUR6_WORKBOOK_KEY + '; DJT6 tabs are never DUR6 targets');
  if (!String(payload && payload.spreadsheetId || '').trim() || String(payload.spreadsheetId).trim() !== config.spreadsheetId) errors.push('Payload spreadsheetId must match the configured shared DJT6/DUR6 spreadsheet');
  if (String(payload && payload.layoutId || '').trim() !== RELAYOPS_DUR6_LAYOUT_ID) errors.push('Layout identity must be ' + RELAYOPS_DUR6_LAYOUT_ID);
  if (payload && payload.templateLayout && String(payload.templateLayout) !== RELAYOPS_DUR6_LAYOUT_ID) errors.push('Template layout identity does not match DUR6');
  if (String(payload && payload.connectorBuild || '') !== RELAYOPS_DUR6_BUILD) errors.push('Connector build identity must be ' + RELAYOPS_DUR6_BUILD);
  if (Number(payload && payload.waveSlotCount) !== 3) errors.push('DUR6 waveSlotCount must be 3');
  if (!Number.isInteger(activeWaveCount) || activeWaveCount < 1 || activeWaveCount > 3) errors.push('DUR6 activeWaveCount must be from 1 through 3');
  if (!payload || payload.writeMode !== 'full-replace') errors.push('DUR6 scaffold accepts full-replace only; filtered partial updates stay disabled');
  if (!payload || payload.startCell !== 'A3') errors.push('Start cell must be A3');
  if (!payload || payload.writeRange !== RELAYOPS_DUR6_WRITE_RANGE) errors.push('Write range must be A3:M');
  if (!payload || !String(payload.requestId || '').trim()) errors.push('A requestId is required for idempotent writes');
  if (String(payload && payload.requestId || '').length > 200) errors.push('requestId is too long');
  if (config.templateSheet !== RELAYOPS_DUR6_TEMPLATE_SHEET || String(payload && payload.templateSheet || '') !== RELAYOPS_DUR6_TEMPLATE_SHEET) errors.push('Payload and configured templateSheet must be exactly ' + RELAYOPS_DUR6_TEMPLATE_SHEET);

  const revision = relayOpsDur6PayloadRevision_(payload);
  if (payload && payload.workspaceRevision !== undefined && payload.workspaceRevision !== null && payload.workspaceRevision !== '' && revision === null) {
    errors.push('workspaceRevision must be a non-negative integer when supplied');
  }

  const allowedDateNames = relayOpsDur6AllowedDateNames_(payload && payload.operationDate);
  if (!allowedDateNames.length) errors.push('Operation date must be YYYY-MM-DD');
  if (allowedDateNames.length && allowedDateNames.indexOf(String(payload && payload.sheetName || '')) < 0) {
    errors.push('Target tab must match operation date: ' + allowedDateNames.join(' or '));
  }
  if (allowedDateNames.indexOf(config.templateSheet) >= 0 || String(payload && payload.sheetName || '') === config.templateSheet) {
    errors.push('DUR6 template tab must be a permanent blank template, not the selected dated tab');
  }

  if (headers.length !== RELAYOPS_DUR6_COMPACT_COLS || headers[0] !== 'WAVE' || headers[12] !== 'PLANNED RTS') {
    errors.push('Header row must match the 13-column RelayOps payload');
  }
  if (!rows.length) errors.push('No morning rows were supplied');
  if (rows.length > 120) errors.push('Morning payload exceeds the compact DUR6 row limit');
  rows.forEach(function(row, index) {
    if (!Array.isArray(row) || row.length !== RELAYOPS_DUR6_COMPACT_COLS) {
      errors.push('Row ' + (index + 1) + ' must have 13 columns');
      return;
    }
    row.forEach(function(value) {
      if (String(value === undefined || value === null ? '' : value).length > 500) errors.push('Row ' + (index + 1) + ' contains an overlong cell');
    });
  });
  if (rowTypes.length !== rows.length) errors.push('rowTypes must match the supplied row count');
  rowTypes.forEach(function(type, index) {
    if (['route', 'blank', 'time', 'separator'].indexOf(type) < 0) errors.push('Row ' + (index + 1) + ' has an unsupported row type');
    if (type === 'separator' && Array.isArray(rows[index]) && rows[index].some(function(value) { return String(value || '').trim() !== ''; })) {
      errors.push('Separator row ' + (index + 1) + ' must be empty');
    }
    if (type === 'time' && Array.isArray(rows[index]) && rows[index].slice(1).some(function(value) { return String(value || '').trim() !== ''; })) {
      errors.push('Time row ' + (index + 1) + ' may contain a footer only in column A');
    }
  });

  const requiredKeys = ['WAVE1', 'WAVE2', 'WAVE3', 'ADHOCS', 'HELPERS'];
  const sectionKeys = {};
  const coveredRouteIndexes = {};
  if (sections.length !== requiredKeys.length) errors.push('DUR6 full handoff must contain exactly five dashboard sections');
  sections.forEach(function(section, index) {
    const layout = relayOpsDur6LayoutForSection_(section);
    if (!layout || requiredKeys.indexOf(layout.key) < 0) {
      errors.push('Section ' + (index + 1) + ' is not a supported dashboard handoff slot');
      return;
    }
    if (sectionKeys[layout.key]) errors.push('Duplicate DUR6 section: ' + layout.label);
    sectionKeys[layout.key] = true;
    const labelKey = relayOpsDur6SectionKey_(section && section.label);
    const slotKey = relayOpsDur6SectionKey_(section && section.slotKey);
    if (labelKey && slotKey && labelKey !== slotKey) errors.push(layout.label + ' label and slotKey do not match');
    const sourceIndex = Number(section.sourceIndex);
    const rowCount = Number(section.rowCount);
    if (!Number.isInteger(sourceIndex) || sourceIndex < 0 || !Number.isInteger(rowCount) || rowCount < 0 || sourceIndex + rowCount > rows.length) {
      errors.push(layout.label + ' points outside the supplied morning rows');
      return;
    }
    if (rowCount > layout.routeCapacity) errors.push(layout.label + ' source row count exceeds its fixed capacity of ' + layout.routeCapacity);
    for (let rowIndex = sourceIndex; rowIndex < sourceIndex + rowCount; rowIndex++) {
      if (coveredRouteIndexes[rowIndex]) errors.push(layout.label + ' overlaps another section at payload row ' + (rowIndex + 1));
      coveredRouteIndexes[rowIndex] = layout.key;
      if (rowTypes[rowIndex] !== 'route' && rowTypes[rowIndex] !== 'blank') {
        errors.push(layout.label + ' includes a non-route row at payload row ' + (rowIndex + 1));
      }
    }
    const sectionRows = relayOpsDur6SectionRows_(payload, section);
    if (sectionRows.length > layout.routeCapacity) errors.push(layout.label + ' exceeds ' + layout.routeCapacity + ' available route rows');
    sectionRows.forEach(function(row, rowIndex) {
      if (!String(row[1] || '').trim()) errors.push(layout.label + ' route ' + (rowIndex + 1) + ' is missing a driver');
      if (!String(row[2] || '').trim()) errors.push(layout.label + ' route ' + (rowIndex + 1) + ' is missing a route');
    });
  });
  requiredKeys.forEach(function(key) {
    if (!sectionKeys[key]) errors.push('Missing required compact section: ' + key);
  });
  rows.forEach(function(row, index) {
    const hasRouteValue = Array.isArray(row) && [row[1], row[2], row[5]].some(function(value) { return String(value || '').trim() !== ''; });
    if ((rowTypes[index] === 'route' || rowTypes[index] === 'blank') && hasRouteValue && !coveredRouteIndexes[index]) {
      errors.push('Populated route row ' + (index + 1) + ' is not assigned to a DUR6 section');
    }
  });

  const activeLayouts = RELAYOPS_DUR6_LAYOUT.slice(0, 3).filter(function(layout) {
    const section = sections.filter(function(candidate) { return relayOpsDur6LayoutForSection_(candidate) === layout; })[0];
    return section && relayOpsDur6SectionRows_(payload, section).length > 0;
  });
  if (Number.isInteger(activeWaveCount) && activeLayouts.length !== activeWaveCount) {
    errors.push('activeWaveCount does not match the number of populated DUR6 wave slots');
  }
  if (Number.isInteger(activeWaveCount)) {
    const activeKeys = activeLayouts.map(function(layout) { return layout.key; }).join(',');
    const expectedKeys = RELAYOPS_DUR6_LAYOUT.slice(0, activeWaveCount).map(function(layout) { return layout.key; }).join(',');
    if (activeKeys !== expectedKeys) errors.push('Populated DUR6 waves must use contiguous slots starting with Wave 1');
  }

  const waveValues = {};
  waves.forEach(function(wave) {
    const key = relayOpsDur6SectionKey_(wave && wave.label);
    if (/^WAVE[1-3]$/.test(key)) {
      if (Object.prototype.hasOwnProperty.call(waveValues, key)) errors.push('Duplicate wave footer slot: ' + key);
      waveValues[key] = String(wave && wave.value || '').trim();
    } else errors.push('Unsupported wave footer slot: ' + String(wave && wave.label || 'unnamed'));
  });
  if (waves.length !== 3) errors.push('DUR6 payload must include exactly three wave label slots');
  ['WAVE1', 'WAVE2', 'WAVE3'].forEach(function(key) {
    if (!Object.prototype.hasOwnProperty.call(waveValues, key)) errors.push('Missing wave footer slot: ' + key);
  });
  activeLayouts.forEach(function(layout) {
    if (!waveValues[layout.key]) errors.push(layout.label + ' needs a time/count footer before handoff');
    else if (/^WAVE\s*\d/i.test(waveValues[layout.key])) errors.push(layout.label + ' still has a placeholder instead of a real wave time');
  });

  return {
    ready: errors.length === 0,
    errors: errors,
    stationCode: RELAYOPS_DUR6_STATION,
    workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
    layoutId: RELAYOPS_DUR6_LAYOUT_ID,
    activeWaveCount: activeWaveCount,
    waveSlotCount: 3
  };
}

function relayOpsDur6PayloadRevision_(payload) {
  if (!payload || payload.workspaceRevision === undefined || payload.workspaceRevision === null || payload.workspaceRevision === '') return null;
  const revision = Number(payload.workspaceRevision);
  return Number.isInteger(revision) && revision >= 0 ? revision : null;
}

function relayOpsDur6Canonicalize_(value) {
  if (Array.isArray(value)) return value.map(relayOpsDur6Canonicalize_);
  if (value && Object.prototype.toString.call(value) === '[object Object]') {
    const output = {};
    Object.keys(value).sort().forEach(function(key) { output[key] = relayOpsDur6Canonicalize_(value[key]); });
    return output;
  }
  return value;
}

function relayOpsDur6PayloadHash_(payload) {
  const stable = JSON.parse(JSON.stringify(payload || {}));
  delete stable.requestId;
  delete stable.generatedAt;
  delete stable.dryRun;
  delete stable.expectedWriteToken;
  delete stable.preflightToken;
  const text = JSON.stringify(relayOpsDur6Canonicalize_(stable));
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8);
  return bytes.map(function(value) {
    const normalized = value < 0 ? value + 256 : value;
    return ('0' + normalized.toString(16)).slice(-2);
  }).join('');
}

function relayOpsDur6WriteStateKey_(operationDate, spreadsheetId) {
  const workbookScope = relayOpsDur6PayloadHash_({spreadsheetId:String(spreadsheetId || '')}).slice(0, 20);
  return 'RELAYOPS_DUR6_WRITE_STATE_' + workbookScope + '_' + String(operationDate || '').replace(/[^0-9]/g, '_');
}

function relayOpsDur6PreviousWrite_(payload) {
  const raw = PropertiesService.getScriptProperties().getProperty(relayOpsDur6WriteStateKey_(payload.operationDate, payload.spreadsheetId));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (error) { throw new Error('Stored DUR6 write state is invalid; review Script Properties before retrying'); }
}

function relayOpsDur6WriteDisposition_(payload, payloadHash) {
  const previous = relayOpsDur6PreviousWrite_(payload);
  if (!previous) return {duplicate:false, previous:null};
  const requestId = String(payload.requestId || '').trim();
  if (String(previous.requestId || '') === requestId) {
    if (String(previous.payloadHash || '') !== payloadHash) throw new Error('requestId was already used for different DUR6 data');
    return {duplicate:true, previous:previous};
  }
  const incomingRevision = relayOpsDur6PayloadRevision_(payload);
  const previousRevision = Number.isInteger(previous.workspaceRevision) ? previous.workspaceRevision : null;
  if (previousRevision !== null && incomingRevision === null) {
    throw new Error('workspaceRevision is required because this DUR6 date already has revisioned writes');
  }
  if (previousRevision !== null && incomingRevision < previousRevision) {
    throw new Error('Stale DUR6 workspaceRevision ' + incomingRevision + '; latest Google write is revision ' + previousRevision);
  }
  if (previousRevision !== null && incomingRevision === previousRevision) {
    if (String(previous.payloadHash || '') === payloadHash) return {duplicate:true, previous:previous};
    throw new Error('DUR6 workspaceRevision ' + incomingRevision + ' was already written with different data');
  }
  return {duplicate:false, previous:previous};
}

function relayOpsDur6RecordWrite_(payload, payloadHash, sheetName) {
  const record = {
    stationCode: RELAYOPS_DUR6_STATION,
    workbookKey: RELAYOPS_DUR6_WORKBOOK_KEY,
    spreadsheetId: String(payload.spreadsheetId || ''),
    templateSheet: RELAYOPS_DUR6_TEMPLATE_SHEET,
    layoutId: RELAYOPS_DUR6_LAYOUT_ID,
    requestId: String(payload.requestId || '').trim(),
    payloadHash: payloadHash,
    workspaceRevision: relayOpsDur6PayloadRevision_(payload),
    sheetName: sheetName,
    updatedAt: new Date().toISOString()
  };
  PropertiesService.getScriptProperties().setProperty(
    relayOpsDur6WriteStateKey_(payload.operationDate, payload.spreadsheetId),
    JSON.stringify(record)
  );
}

function relayOpsDur6Spreadsheet_(config) {
  if (config.spreadsheetId !== RELAYOPS_DUR6_EXPECTED_SPREADSHEET_ID || config.templateSheet !== RELAYOPS_DUR6_TEMPLATE_SHEET) throw new Error('DUR6 requires the authorized shared spreadsheet ID and exact OPS LOG DUR6 template');
  const ss = SpreadsheetApp.openById(config.spreadsheetId);
  if (String(ss.getId()) !== config.spreadsheetId) throw new Error('Opened spreadsheetId does not match the configured shared spreadsheet');
  return ss;
}

function relayOpsDur6Template_(ss) {
  const template = ss.getSheetByName(RELAYOPS_DUR6_TEMPLATE_SHEET);
  if (!template) throw new Error('Exact DUR6 template tab was not found: ' + RELAYOPS_DUR6_TEMPLATE_SHEET);
  if (Number(template.getSheetId()) !== RELAYOPS_DUR6_EXPECTED_TEMPLATE_ID) throw new Error('OPS LOG DUR6 template ID does not match the authorized template tab');
  relayOpsDur6ValidateTemplateSignature_(template);
  return template;
}

function relayOpsDur6ValidateTemplateSignature_(sheet) {
  if (!sheet) throw new Error('OPS LOG DUR6 template was not found');
  if (sheet.getMaxRows() < RELAYOPS_DUR6_LAST_ROW || sheet.getMaxColumns() < RELAYOPS_DUR6_TEMPLATE_COLS) {
    throw new Error('OPS LOG DUR6 must include at least 142 rows and columns A through V');
  }
  const headers = [['A1','WAVE'], ['J1','PRE DVIC'], ['P1','STOP COUNT'], ['U1','PLANNED RTS'], ['V1','CLOCK OUT TIME']];
  headers.forEach(function(item) {
    const actual = relayOpsDur6SectionKey_(sheet.getRange(item[0]).getDisplayValue());
    const expected = relayOpsDur6SectionKey_(item[1]);
    if (actual !== expected) throw new Error('DUR6 template mismatch at ' + item[0] + ' (expected ' + item[1] + ')');
  });
  RELAYOPS_DUR6_LAYOUT.forEach(function(layout) {
    const actual = relayOpsDur6SectionKey_(sheet.getRange(layout.startRow, 1).getDisplayValue());
    const expected = relayOpsDur6SectionKey_(layout.label);
    if (actual !== expected) throw new Error('DUR6 template anchor mismatch at A' + layout.startRow + ' (expected ' + layout.label + ')');
  });
  return true;
}

function relayOpsDur6ValidateTemplate_() {
  const result = relayOpsDur6ValidateStandalone();
  const message = 'Template: ' + result.templateSheet +
    '\nGeometry: first 3 waves in the 142-row template; waves 4–6 stay empty; ADHOC, HELPERS, DSP retain their template positions' +
    '\nValue scope: ' + RELAYOPS_DUR6_WRITTEN_RANGES +
    '\nWrites enabled: ' + (result.writesEnabled ? 'yes' : 'no');
  SpreadsheetApp.getUi().alert('RelayOps DUR6 template is ready', message, SpreadsheetApp.getUi().ButtonSet.OK);
  return result;
}

function relayOpsDur6ResolveTarget_(payload, config, createIfMissing) {
  if (String(payload.spreadsheetId || '') !== config.spreadsheetId) throw new Error('Refusing a mismatched shared spreadsheetId');
  if (String(payload.templateSheet || '') !== RELAYOPS_DUR6_TEMPLATE_SHEET) throw new Error('Refusing a template other than OPS LOG DUR6');
  const ss = relayOpsDur6Spreadsheet_(config);
  const allowedNames = relayOpsDur6AllowedDateNames_(payload.operationDate);
  if (!allowedNames.length || allowedNames.indexOf(payload.sheetName) < 0) throw new Error('Refusing a target without the DUR6 operation-date prefix');
  const template = relayOpsDur6Template_(ss);
  if (allowedNames.filter(function(name) { return Boolean(ss.getSheetByName(name)); }).length > 1) throw new Error('Multiple DUR6 tabs exist for this date. Resolve the duplicate dated tabs before sending.');
  const orderedNames = [payload.sheetName].concat(allowedNames).filter(function(name, index, values) {
    return name && values.indexOf(name) === index;
  });
  for (let i = 0; i < orderedNames.length; i++) {
    const dated = ss.getSheetByName(orderedNames[i]);
    if (!dated) continue;
    relayOpsDur6ValidateTemplateSignature_(dated);
    return {spreadsheet:ss, sheet:dated, targetName:dated.getName(), wouldCreate:false, created:false};
  }
  if (!createIfMissing) return {spreadsheet:ss, sheet:template, targetName:payload.sheetName, wouldCreate:true, created:false};
  const created = template.copyTo(ss).setName(payload.sheetName);
  relayOpsDur6ValidateTemplateSignature_(created);
  return {spreadsheet:ss, sheet:created, targetName:created.getName(), wouldCreate:false, created:true};
}

function relayOpsDur6BackupSheet_(ss, sheet) {
  if (!/^DUR6 \d{1,2}[./]\d{1,2}[./]\d{2}$/.test(String(sheet.getName() || ''))) throw new Error('Refusing to back up a non-DUR6 dated target');
  const base = String(sheet.getName() || 'dated-tab').replace(/[^A-Za-z0-9._-]+/g, '.').slice(0, 44);
  const stamp = Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyyMMdd-HHmmss');
  let name = ('DUR6 backup ' + base + ' ' + stamp).slice(0, 100);
  let suffix = 2;
  while (ss.getSheetByName(name)) {
    const ending = '-' + suffix;
    name = ('DUR6 backup ' + base + ' ' + stamp).slice(0, 100 - ending.length) + ending;
    suffix++;
  }
  const backup = sheet.copyTo(ss).setName(name);
  if (!backup) throw new Error('DUR6 pre-write backup could not be created');
  return backup.getName();
}

function relayOpsDur6SafeCell_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  const text = String(value);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function relayOpsDur6WaveValue_(payload, layout) {
  const waveNumber = Number(String(layout && layout.key || '').replace('WAVE', ''));
  if (Number.isInteger(waveNumber) && waveNumber > Number(payload && payload.activeWaveCount || 0)) return '';
  const wave = (payload.waves || []).filter(function(candidate) {
    return relayOpsDur6SectionKey_(candidate && candidate.label) === layout.key;
  })[0];
  return wave ? String(wave.value || '').trim() : '';
}

function relayOpsDur6WaveLabelCell_(sheet, layout) {
  const cell = sheet.getRange(layout.timeRow, 1);
  const merged = cell.getMergedRanges();
  return merged.length ? sheet.getRange(merged[0].getRow(), merged[0].getColumn()) : cell;
}

function relayOpsDur6WriteMorningSheet_(sheet, payload) {
  if (relayOpsDur6AllowedDateNames_(payload.operationDate).indexOf(sheet.getName()) < 0) throw new Error('Refusing to write to a master, DJT6, or non-DUR6 dated tab');
  relayOpsDur6ValidateTemplateSignature_(sheet);

  // The existing OPS LOG DUR6 template remains authoritative. Waves 4–6 are
  // cleared but keep their structural labels, rows, and formatting. Only cells owned by
  // RelayOps are touched; formatting, merges, widths, checkbox areas J:M,
  // divider N, and operations-entry columns O/R/S/T/V are preserved.
  RELAYOPS_DUR6_LAYOUT.forEach(function(layout) {
    sheet.getRange(layout.startRow, 2, layout.routeCapacity, 3).clearContent(); // B:D
    sheet.getRange(layout.startRow, 6, layout.routeCapacity, 3).clearContent(); // F:H
    sheet.getRange(layout.startRow, 16, layout.routeCapacity, 2).clearContent(); // P:Q
    sheet.getRange(layout.startRow, 21, layout.routeCapacity, 1).clearContent(); // U
    sheet.getRange(layout.startRow, 5).clearContent(); // E section Pad
    sheet.getRange(layout.startRow, 1).setValue(layout.label); // A section anchor
    if (layout.timeRow) relayOpsDur6WaveLabelCell_(sheet, layout).clearContent();
  });

  let updatedRoutes = 0;
  (payload.sections || []).forEach(function(section) {
    const layout = relayOpsDur6LayoutForSection_(section);
    if (!layout || layout.key === 'DSP') return;
    const sectionRows = relayOpsDur6SectionRows_(payload, section);
    if (sectionRows.length) {
      sheet.getRange(layout.startRow, 2, sectionRows.length, 3).setValues(sectionRows.map(function(row) {
        return [relayOpsDur6SafeCell_(row[1]), relayOpsDur6SafeCell_(row[2]), relayOpsDur6SafeCell_(row[3])];
      }));
      sheet.getRange(layout.startRow, 6, sectionRows.length, 3).setValues(sectionRows.map(function(row) {
        return [relayOpsDur6SafeCell_(row[5]), relayOpsDur6SafeCell_(row[6]), relayOpsDur6SafeCell_(row[7])];
      }));
      sheet.getRange(layout.startRow, 16, sectionRows.length, 2).setValues(sectionRows.map(function(row) {
        return [relayOpsDur6SafeCell_(row[9]), relayOpsDur6SafeCell_(row[10])];
      }));
      sheet.getRange(layout.startRow, 21, sectionRows.length, 1).setValues(sectionRows.map(function(row) {
        return [relayOpsDur6SafeCell_(row[12])];
      }));
      updatedRoutes += sectionRows.length;
    }
    const pad = section && Object.prototype.hasOwnProperty.call(section, 'pad') ? String(section.pad || '').trim().toUpperCase() : '';
    if (pad) sheet.getRange(layout.startRow, 5).setValue(relayOpsDur6SafeCell_(pad));
  });

  let waveLabels = 0;
  RELAYOPS_DUR6_LAYOUT.slice(0, 3).forEach(function(layout) {
    const value = relayOpsDur6WaveValue_(payload, layout);
    if (!value) return;
    relayOpsDur6WaveLabelCell_(sheet, layout).setValue(relayOpsDur6SafeCell_(value));
    waveLabels++;
  });
  SpreadsheetApp.flush();

  // Read back the route keys and active footer labels. A failed or shifted
  // template write is rejected before its requestId/revision is recorded.
  (payload.sections || []).forEach(function(section) {
    const layout = relayOpsDur6LayoutForSection_(section);
    if (!layout || layout.key === 'DSP') return;
    const expectedRows = relayOpsDur6SectionRows_(payload, section);
    if (!expectedRows.length) return;
    const actualRoutes = sheet.getRange(layout.startRow, 3, expectedRows.length, 1).getDisplayValues();
    expectedRows.forEach(function(row, index) {
      if (String(actualRoutes[index][0] || '').trim() !== String(row[2] || '').trim()) {
        throw new Error('DUR6 route verification failed in ' + layout.label + ' row ' + (index + 1));
      }
    });
  });
  RELAYOPS_DUR6_LAYOUT.slice(0, 3).forEach(function(layout) {
    const expected = relayOpsDur6WaveValue_(payload, layout);
    if (!expected) return;
    const actual = String(relayOpsDur6WaveLabelCell_(sheet, layout).getDisplayValue() || '').trim();
    if (actual !== expected) throw new Error('DUR6 footer verification failed for ' + layout.label);
  });

  return {sheetName:sheet.getName(), updatedRoutes:updatedRoutes, waveLabels:waveLabels};
}
