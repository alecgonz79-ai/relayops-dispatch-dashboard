const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
function fn(name){const start=source.indexOf(`function ${name}(`);return source.slice(start,source.indexOf('\n}',start)+2);}
let now=1000,writes=0,queued=[];
const editor={matches:()=>true,isConnected:true};
const pane={isConnected:true,scrollTop:400,scrollLeft:0};
const context={Date:{now:()=>now},Number,Math,
 document:{activeElement:editor},window:{scrollX:0,scrollY:700,requestAnimationFrame:fn=>{queued.push(fn);return queued.length;},scrollTo(){writes++;}},
 operationalGridEditorSelector:'editor',OPERATIONAL_SCROLL_PANE_SELECTOR:'pane',OPERATIONAL_INTERACTION_SELECTOR:'input',
 operationalEditScrollLock:null,operationalScrollLockVersion:0,operationalScrollGuardFrame:0,operationalScrollGuardRestoring:false,
 operationalUserScrollUntil:0,sheetFocusRequestVersion:0,operationalGridFocusRequestVersion:0,
 operationalScrollPaneFor:()=>pane,activeOperationalEditor:()=>true,rememberOperationalScrollAnchor(){},setTimeout:fn=>fn()};
vm.createContext(context);
for(const name of ['captureOperationalEditScrollLock','scheduleOperationalScrollGuard','handleOperationalScrollGuard','markOperationalUserScrollIntent'])vm.runInContext(fn(name),context);
context.captureOperationalEditScrollLock(editor);
assert.equal(context.operationalEditScrollLock.expiresAt,1180);
now=1200;pane.scrollTop=620;context.window.scrollY=900;
context.handleOperationalScrollGuard();
assert.equal(pane.scrollTop,620);assert.equal(writes,0);assert.equal(context.operationalEditScrollLock,null);
context.captureOperationalEditScrollLock(editor);
context.markOperationalUserScrollIntent({type:'wheel',target:{closest:()=>pane}});
assert.equal(context.operationalEditScrollLock,null);
assert.equal(context.sheetFocusRequestVersion,1);assert.equal(context.operationalGridFocusRequestVersion,1);
pane.scrollTop=850;context.window.scrollY=1000;
while(queued.length)queued.shift()();
assert.equal(pane.scrollTop,850);assert.equal(writes,0);assert.equal(queued.length,0);
console.log('Expired focus locks and manual scrolling cannot rewind the sheet; guard loop stops');
