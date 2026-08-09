const fs=require('fs');
const path=require('path');
const assert=require('assert');

const root=path.join(__dirname,'..');
const cloud=fs.readFileSync(path.join(root,'cloud-sync.js'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');

assert(
  cloud.includes('Number(config.saveTimeoutMs)||30000'),
  'Mobile cloud saves need a longer default window than lightweight polling requests'
);
assert(
  (cloud.match(/CLOUD_SAVE_TIMEOUT_MS/g)||[]).length>=3,
  'Daily and persistent snapshot writes must use the dedicated save timeout'
);
assert(
  cloud.includes("if(error?.code==='cloud_timeout'){notify({type:'save-delayed',error});return {delayed:true,action};}"),
  'A slow save must remain queued instead of becoming a destructive cloud error'
);
assert(
  cloud.includes('schedulePendingSaveRetry')&&cloud.includes('CLOUD_MAX_AUTOMATIC_RETRIES')&&cloud.includes('const steps=[30000,60000,120000,300000]'),
  'Slow mobile saves must retry with a capped, jittered backoff'
);
assert(
  !cloud.includes('RelayOps will start a fresh shared session'),
  'A save timeout must never claim that the shared session will be replaced'
);

const authFunction=cloud.match(/function isAuthSessionError\(error\)\{([^}]+)\}/)?.[1]||'';
assert(
  !authFunction.includes('cloud_timeout'),
  'Network slowness must not be treated as an authentication failure'
);
assert(
  app.includes("const sharedSheetHistory={past:(state.sheetHistory?.past||[]).slice(-6),future:(state.sheetHistory?.future||[]).slice(-6)}"),
  'Shared payload history must stay small enough for reliable mobile uploads'
);
assert(
  app.includes("if(event.type==='save-delayed')")&&
  app.includes('Your edit is safe on this device and will retry automatically.'),
  'The dashboard must explain delayed saves without telling dispatchers their data was lost'
);
assert(
  app.includes('function cloudToastOnce('),
  'Repeated failures from the same save must be collapsed into one mobile notice'
);

console.log('cloud mobile save contract tests passed');
