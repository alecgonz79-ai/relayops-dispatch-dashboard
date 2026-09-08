const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');

const source = fs.readFileSync(require.resolve('../google-sheets/relayops-morning-connector-dur6.local.gs'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(require.resolve('../google-sheets/relayops-morning-connector-dur6.appsscript.json'), 'utf8'));
const server = vm.createContext({
  console,
  ScriptApp:{AuthMode:{FULL:'FULL'},requireScopes(){}},
  HtmlService: {createHtmlOutput(text) {const output={text,setTitle(){return output;}};return output;}}
});
vm.runInContext(source, server);
const origin = 'http://localhost:4173';
const nonce = 'b'.repeat(48);
const build = '2026-09-07-dur6-google-editors-v2';
const status = {ok:true,stationCode:'DUR6',workbookKey:'DUR6_OPS_LOG',build,writesEnabled:true,spreadsheet:'Morning Sheet Transfer',templateSheet:'OPS LOG DUR6'};
const preview = {...status,dryRun:true,routeCount:3,targetSheet:'DUR6 9.7.26',wouldCreateSheet:true,expectedWriteToken:'e'.repeat(64),preflightToken:'f'.repeat(32),preflightExpiresAt:new Date(Date.now()+180000).toISOString()};

function clientHarness(options = {}) {
  const html = server.doGet({parameter: options.readOnly?{relayops:'status-page'}:{relayops:'handoff',origin,nonce}}).text;
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const calls=[],outbox=[],elements=new Map(),timers=[];
  const opener = {postMessage(value,target){outbox.push({value,target});}};
  const handlers={};
  const document={getElementById(id){if(!elements.has(id))elements.set(id,{textContent:'',className:'',hidden:true,disabled:false,handlers:{},addEventListener(type,handler){this.handlers[type]=handler;}});return elements.get(id);}};
  const run={
    withSuccessHandler(success){this.success=success;return this;},
    withFailureHandler(failure){this.failure=failure;return this;},
    relayOpsDur6BridgeStatus(){calls.push({action:'status'});this.success({...status});},
    relayOpsDur6BridgeSubmit(payload){calls.push({action:'submit',payload:JSON.parse(JSON.stringify(payload))});this.success(payload.dryRun?{...preview,...options.preview}:{...status,targetSheet:'DUR6 9.7.26'});}
  };
  const context=vm.createContext({document,window:{top:{opener:options.noOpener?null:opener},addEventListener(type,handler){handlers[type]=handler;}},google:{script:{run}},console,Map,Date,JSON,
    setTimeout(fn,ms){timers.push({fn,ms});return timers.length;},clearTimeout(){},setInterval(fn,ms){timers.push({fn,ms,interval:true});return timers.length;},clearInterval(){}});
  vm.runInContext(script,context);
  async function request(action,payload={},id=action,changes={}){
    const data={type:'relayops-dur6-request',nonce,id,action,payload};
    await handlers.message?.({origin,source:opener,data,...changes});
    await Promise.resolve();
  }
  return {calls,outbox,elements,request,opener,timers,html};
}

async function main(){
  assert.deepEqual(manifest, {
    timeZone:'America/Los_Angeles',dependencies:{},exceptionLogging:'STACKDRIVER',runtimeVersion:'V8',
    webapp:{executeAs:'USER_ACCESSING',access:'ANYONE'},
    oauthScopes:['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/userinfo.email']
  }, 'DUR6 manifest must preserve accessing-user authentication and request only Sheets and Google identity scopes');
  assert(source.includes('SpreadsheetApp.openById(config.spreadsheetId)'), 'Review Sheets scope if standalone workbook access changes');
  assert(source.includes('Session.getActiveUser().getEmail()') && source.includes('Session.getEffectiveUser().getEmail()'), 'Review identity scope if accessing-user checks change');
  assert(!/\b(?:DriveApp|GmailApp|MailApp|UrlFetchApp)\s*\./.test(source), 'A new privileged service needs an explicit OAuth scope review');
  assert([...source.matchAll(/\bScriptApp\.(\w+)/g)].every(match=>['requireScopes','AuthMode'].includes(match[1])), 'A new ScriptApp operation needs an explicit scope review');
  const scriptApp = server.ScriptApp;
  const htmlService = server.HtmlService;
  server.HtmlService = {createHtmlOutput(){throw new Error('HTML_RENDER_BEFORE_CONSENT');}};
  let scopeChecks=0;
  server.ScriptApp = {AuthMode:{FULL:'FULL'},requireScopes(mode,scopes){
    assert.equal(mode,'FULL');assert.deepEqual(JSON.parse(JSON.stringify(scopes)),manifest.oauthScopes);scopeChecks++;throw new Error('GOOGLE_CONSENT_REQUIRED');
  }};
  for(const run of [
    ()=>server.doGet({parameter:{relayops:'status-page'}}),
    ()=>server.doGet({parameter:{relayops:'handoff',origin,nonce}}),
    ()=>server.relayOpsDur6ValidateStandalone(),
    ()=>server.relayOpsDur6BridgeStatus(),
    ()=>server.relayOpsDur6BridgeSubmit({dryRun:true}),
    ()=>server.relayOpsDur6BridgeSubmit({dryRun:false}),
    ()=>server.relayOpsDur6ConfigureStandalone_()
  ])assert.throws(run,/GOOGLE_CONSENT_REQUIRED/,'Partial consent was swallowed or a Google operation happened before required scopes');
  assert.equal(scopeChecks,7);
  server.ScriptApp = scriptApp;
  server.HtmlService = htmlService;
  for(const badOrigin of ['https://evil.example','http://localhost:4174','https://alecgonz79-ai.github.io.evil.example','null']){
    const html=server.doGet({parameter:{relayops:'handoff',origin:badOrigin,nonce}}).text;
    assert.match(html,/no trusted dashboard session/);
    assert(!html.includes('google.script.run'));
  }
  for(const badNonce of ['', 'x'.repeat(32),'<script>alert(1)</script>','a'.repeat(65)]){
    assert.match(server.doGet({parameter:{relayops:'handoff',origin,nonce:badNonce}}).text,/no trusted dashboard session/);
  }
  const standalone=clientHarness({readOnly:true});
  await Promise.resolve();await Promise.resolve();
  assert.equal(standalone.calls.length,1);
  assert.equal(standalone.calls[0].action,'status');
  assert.match(standalone.elements.get('message').textContent,/DUR6 connector validated/);
  assert(standalone.elements.get('confirm').hidden);
  const unbound=clientHarness({noOpener:true});
  assert.equal(unbound.calls.length,0);
  assert.match(unbound.elements.get('message').textContent,/Open this transfer from the RelayOps dashboard/);

  const c=clientHarness();
  assert.equal(c.outbox[0].value.type,'relayops-dur6-ready');
  assert(c.outbox.every(item=>item.target===origin));
  await c.request('status',{},'forged-origin',{origin:'https://evil.example'});
  await c.request('status',{},'forged-source',{source:{}});
  await c.request('status',{},'forged-nonce',{data:{type:'relayops-dur6-request',nonce:'a'.repeat(48),id:'bad',action:'status'}});
  assert.equal(c.calls.length,0,'A forged origin, opener, or nonce reached Google');
  await c.request('status');
  assert.equal(c.calls.length,1);
  assert.equal(c.outbox.at(-1).value.result.stationCode,'DUR6');
  await c.request('send',{sheetName:'DUR6 9.7.26',requestId:'request-1'},'send-1');
  assert.equal(c.calls.length,2);
  assert.equal(c.calls[1].payload.dryRun,true);
  assert.equal(c.elements.get('destination').textContent,'DUR6 9.7.26');
  assert.equal(c.elements.get('routes').textContent,'3');
  assert.equal(c.elements.get('confirm').hidden,false);
  assert(!c.calls.some(call=>call.payload?.dryRun===false),'A write occurred before confirmation');
  await c.request('send',{sheetName:'DUR6 9.7.26'},'send-2');
  assert.equal(c.calls.length,2,'Concurrent requests bypassed the single-request gate');
  assert.match(c.outbox.at(-1).value.result.error,/already being reviewed/);
  await c.elements.get('confirm').handlers.click();
  assert.equal(c.calls.length,3);
  assert.equal(c.calls[2].payload.dryRun,false);
  assert.equal(c.calls[2].payload.expectedWriteToken,preview.expectedWriteToken);
  assert.equal(c.calls[2].payload.preflightToken,preview.preflightToken);
  assert.equal(c.outbox.at(-1).value.type,'relayops-dur6-result');
  assert.equal(c.outbox.at(-1).value.id,'send-1');
  assert.equal(c.outbox.at(-1).value.result.targetSheet,'DUR6 9.7.26');
  await c.request('send',{sheetName:'DUR6 9.7.26',requestId:'request-1'},'send-1');
  assert.equal(c.calls.length,3,'A repeated request processed the transfer twice');
  assert(c.outbox.every(item=>item.target===origin),'A response used a wildcard or changed origin');

  const cancel=clientHarness();
  await cancel.request('send',{sheetName:'DUR6 9.7.26'},'cancel-1');
  cancel.elements.get('cancel').handlers.click();
  assert.equal(cancel.calls.length,1);
  assert.equal(cancel.outbox.at(-1).value.result.canceled,true);
  const dry=clientHarness();
  await dry.request('dry-run',{sheetName:'DUR6 9.7.26'});
  assert.equal(dry.calls.length,1);
  assert.equal(dry.calls[0].payload.dryRun,true);
  assert.equal(dry.outbox.at(-1).value.result.dryRun,true);
  assert(dry.elements.get('confirm').hidden);
  const disabled=clientHarness({preview:{writesEnabled:false}});
  await disabled.request('send',{sheetName:'DUR6 9.7.26'});
  assert.equal(disabled.calls.length,1);
  assert.match(disabled.outbox.at(-1).value.result.error,/transfers are disabled/);
  assert(disabled.elements.get('confirm').hidden);
  const wrong=clientHarness({preview:{stationCode:'DJT6'}});
  await wrong.request('send',{sheetName:'DUR6 9.7.26'});
  assert.equal(wrong.calls.length,1);
  assert.match(wrong.outbox.at(-1).value.result.error,/identity could not be verified/);
  const oversize=clientHarness();
  await oversize.request('send',{rows:['x'.repeat(750001)]});
  assert.equal(oversize.calls.length,0);
  assert.match(oversize.outbox.at(-1).value.result.error,/safe transfer limit/);
  assert(!c.html.includes('.innerHTML'),'Runtime data is inserted as HTML rather than text');
  console.log('DUR6 authenticated server handoff page test passed');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
