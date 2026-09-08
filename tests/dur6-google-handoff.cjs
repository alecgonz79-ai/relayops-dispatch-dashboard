const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const source = app.slice(app.indexOf('let dur6GoogleHandoffSession = null;'), app.indexOf('async function postMorningSheetsPayload'));
const build = '2026-09-07-dur6-google-editors-v2';

function setup() {
  const events = [], payload = {stationCode:'DUR6', operationDate:'2026-09-07', sheetName:'DUR6 9.7.26', rows:[['DUR6 driver']], sections:[{}], requestId:'request-1', generatedAt:'now'};
  const state = {morningSheetsEndpoint:'https://script.google.com/macros/s/test/exec', morningOperationDate:'2026-09-07'};
  const context = {MULTI_STATION_PREVIEW:true, MULTI_STATION_ENABLED:true, state, payload, events, Intl, Date, JSON, String, Number, Boolean, Error,
    code:'DUR6', preflight:true, proof:true,
    activeMorningStationCode:()=>context.code,
    activeMorningConnectorBuild:()=>build,
    morningSheetsConnectorPayload:()=>({...payload, rows:payload.rows.map(row=>row.slice())}),
    morningSheetsPreflight:()=>({ready:context.preflight}),
    morningSheetsHandoffProof:()=>({ready:context.proof}),
    verifyMorningWorkbookIdentity:(result,_payload,options)=>{events.push(['identity',options]);if(result.stationCode!=='DUR6')throw new Error('Wrong station');},
    confirmedConnectorError:message=>Object.assign(new Error(message),{relayOpsConfirmed:true}),
    persist:()=>events.push(['persist']), render:()=>events.push(['render']), toast:message=>events.push(['toast',message]),
    window:{RelayOpsDur6Transfer:{open:(_endpoint,options)=>{
      events.push(['open']);context.isCurrent=options.isCurrent;
      return {request:async action=>{events.push(['request',action]);if(context.beforeResponse)context.beforeResponse();return context.result||{ok:true,stationCode:'DUR6',build,waveTimes:3,writesEnabled:false,dryRun:action==='dry-run',requestId:payload.requestId,writeMode:'full-replace',sheet:payload.sheetName};},close:()=>events.push(['close'])};
    }}}
  };
  vm.createContext(context);vm.runInContext(source,context);return context;
}
const run = (context,action)=>vm.runInContext(`openDur6GoogleTransfer(${JSON.stringify(action)})`,context);
(async()=>{
  let c=setup();assert.equal(await run(c,'status'),true);assert.equal(c.state.morningSheetsLastReceipt,undefined);assert.equal(c.events.filter(e=>e[0]==='close').length,1);
  c=setup();assert.equal(await run(c,'dry-run'),true);assert(c.state.morningSheetsLastDryRun);assert.equal(c.state.morningSheetsLastReceipt,undefined);
  c=setup();assert.equal(await run(c,'send'),true);assert.equal(c.state.morningSheetsLastReceipt.requestId,'request-1');assert.equal(c.state.morningSheetsLastReceipt.sheet,'DUR6 9.7.26');
  for(const field of ['preflight','proof']){c=setup();c[field]=false;assert.equal(await run(c,'send'),false);assert(!c.events.some(e=>e[0]==='open'));}
  for(const code of ['DJT6','OTHER']){c=setup();c.code=code;assert.equal(await run(c,'send'),false);assert.equal(c.events.length,0);}
  c=setup();c.MULTI_STATION_PREVIEW=false;c.MULTI_STATION_ENABLED=false;assert.equal(await run(c,'send'),false);assert.equal(c.events.length,0);
  c=setup();c.MULTI_STATION_PREVIEW=false;assert.equal(await run(c,'status'),true,'Enabled production DUR6 keeps the authenticated popup path');
  for(const change of [c=>c.code='DJT6',c=>c.state.morningOperationDate='2026-09-08',c=>c.payload.rows[0][0]='newer driver',c=>c.state.morningSheetsEndpoint+='changed']){
    c=setup();c.beforeResponse=()=>change(c);assert.equal(await run(c,'send'),false);assert.equal(c.state.morningSheetsLastReceipt,undefined);assert(!c.events.some(e=>e[0]==='persist'));assert(c.events.some(e=>e[0]==='close'));
  }
  for(const invalid of [{stationCode:'DJT6'},{build:'old'},{requestId:'wrong'},{dryRun:true},{waveTimes:6},{writeMode:'partial-update'}]){
    c=setup();c.result={ok:true,stationCode:'DUR6',build,waveTimes:3,requestId:'request-1',writeMode:'full-replace',sheet:'DUR6 9.7.26',...invalid};assert.equal(await run(c,'send'),false);assert.equal(c.state.morningSheetsLastReceipt,undefined);
  }
  c=setup();c.window.RelayOpsDur6Transfer=undefined;assert.equal(await run(c,'send'),false);assert(!c.events.some(e=>e[0]==='open'));
  assert(!source.includes('fetch('),'DUR6 popup handoff must never fall back to anonymous fetch');
  assert(app.includes("if(!input)return false;"),'Missing endpoint input must not clear a station connector');
  console.log('DUR6 authenticated handoff context and receipt tests passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
