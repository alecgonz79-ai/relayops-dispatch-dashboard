const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
function fn(name){const start=source.indexOf(`function ${name}(`);assert(start>=0);return source.slice(start,source.indexOf('\n}',start)+2);}
let now=10000,navigated=[],renders=0,blurred=0,prevented=0;
const c={Date:{now:()=>now},state:{editMode:true,modal:null},document:{documentElement:{contains:()=>true},activeElement:{blur(){blurred++;}},getElementById:()=>null,querySelector:()=>null},go:p=>navigated.push(p),render(){renders++;},toast(){}};
vm.createContext(c);
vm.runInContext('let editModeEscapePressedAt=0; const EDIT_MODE_ESCAPE_WINDOW_MS=700;'+fn('handlePageNavigationClick')+'\n'+fn('handleEditModeEscapeKey'),c);
const target=(content,action=false)=>({closest:()=>({classList:{contains:()=>content},hasAttribute:()=>action,dataset:{page:'morning'}})});
c.handlePageNavigationClick({target:target(true)});assert.equal(navigated.length,0,'Content clicks must not navigate or recreate editors');
c.handlePageNavigationClick({target:target(false)});assert.deepEqual(navigated,['morning']);
c.handlePageNavigationClick({target:target(false,true)});assert.equal(navigated.length,1);
const escape={key:'Escape',target:{closest:()=>null},preventDefault(){prevented++;}};
c.handleEditModeEscapeKey(escape);assert(c.state.editMode);assert.equal(renders,0);
now+=300;c.handleEditModeEscapeKey(escape);assert(!c.state.editMode);assert.equal(renders,1);assert.equal(blurred,1);assert.equal(prevented,1);
c.state.editMode=true;now+=1000;c.handleEditModeEscapeKey(escape);now+=800;c.handleEditModeEscapeKey(escape);assert(c.state.editMode,'Slow Escape presses must not exit');
vm.runInContext('editModeEscapePressedAt=0',c);c.state.modal='import';now+=1000;c.handleEditModeEscapeKey(escape);now+=100;c.handleEditModeEscapeKey(escape);assert(c.state.editMode);
c.state.modal=null;c.handleEditModeEscapeKey({...escape,target:{closest:()=>({})}});assert(c.state.editMode,'Form controls keep their existing Escape handling');
assert(source.includes("removeEventListener?.('keydown',handleEditModeEscapeKey)"));assert(source.includes("addEventListener?.('keydown',handleEditModeEscapeKey)"));
console.log('Content clicks preserve editors; double Escape exits, single Escape and form/modal handling remain unchanged');
