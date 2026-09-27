const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
function fn(name){const start=source.indexOf(`function ${name}(`),end=source.indexOf('\n}',start);assert(start>=0&&end>start);return source.slice(start,end+2);}
let renders=0,saves=0,blurs=0;
const route={routeUid:'test',ev:'44',helperBag:'H1'};
const device={dataset:{picklistField:'deviceName'},textContent:'old'};
const portable={dataset:{picklistField:'portable'},textContent:'old'};
const context={state:{editMode:true,morningRoutes:[route]},operationalGridFocusRequestVersion:0,
  picklistEditableCellValue:el=>el.textContent,morningEditableCellValue:()=> '44',
  morningRouteByUid:()=>route,pushSheetHistory(){},persist(){saves++;},
  fillEquipmentForRoute:r=>{r.deviceName='22';r.portable='-';},setTimeout(){},
  render(){renders++;},toast(){},recalculateEquipmentReadiness(){}};
vm.createContext(context);
for(const name of ['prepareVanAssignmentEditor','saveOpeningPicklistCell','handleOpeningPicklistKeydown'])vm.runInContext(fn(name),context);
const el={dataset:{picklistField:'ev',picklistOriginal:'44 / H1',picklistRouteUid:'test',picklistRouteIndex:'0'},textContent:'R54',isContentEditable:true,
  parentElement:{querySelectorAll:()=>[device,portable]},blur(){blurs++;}};
context.handleOpeningPicklistKeydown({key:'Enter',preventDefault(){}},el);
assert.equal(route.ev,'R54');assert.equal(route.helperBag,undefined);
assert.equal(device.textContent,'22');assert.equal(device.dataset.picklistOriginal,'22');
assert.equal(portable.textContent,'-');assert.equal(portable.dataset.picklistOriginal,'-');
assert.equal(renders,0,'Saving must not rebuild the sheet');assert.equal(blurs,1);
assert.equal(context.state.editMode,true);assert.equal(context.operationalGridFocusRequestVersion,1);
context.saveOpeningPicklistCell(el);assert.equal(saves,1,'Blur after Enter must not save twice');
assert.equal(context.prepareVanAssignmentEditor(el),true);assert.equal(el.textContent,'44','Only assignment text remains editable');
assert(!fn('handleSheetKeydown').includes('render()'),'Morning Enter must also avoid rebuilding');
assert(fn('render').includes('const scrollMemory=captureUiScrollMemory()'),'Render must preserve the current scroll, not a stale anchor');
console.log('Van replacement, equipment refresh, idempotent save, and non-rendering Enter passed');
