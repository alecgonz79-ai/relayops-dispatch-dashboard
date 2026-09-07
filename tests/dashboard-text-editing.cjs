const fs=require('fs');
const vm=require('vm');
const assert=require('assert/strict');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
function body(name){const start=source.indexOf(`function ${name}(`),end=source.indexOf('\n}',start);assert(start>=0&&end>start,`Missing ${name}`);return source.slice(start,end+2);}
const callbacks=[];
let selectionWrites=0,renders=0,copied=0;
const selection={anchorNode:null,focusNode:null,isCollapsed:true,removeAllRanges(){selectionWrites++;},addRange(range){this.anchorNode=range.editor;this.focusNode=range.editor;this.isCollapsed=true;}};
const context={
  state:{page:'morning',editMode:true,copyMode:false},document:{body:{},activeElement:null,createRange(){return {selectNodeContents(editor){this.editor=editor;},collapse(){}};},querySelectorAll(){return[];}},
  window:{scrollX:0,scrollY:0,scrollTo(){},getSelection:()=>selection,requestAnimationFrame:fn=>callbacks.push(fn)},
  setTimeout:fn=>callbacks.push(fn),Date,Boolean,
  sheetFocusRequestVersion:0,operationalGridFocusRequestVersion:0,operationalScrollAnchorVersion:0,operationalInteractionUntil:0,
  activeParkingEditId:'',deferredCloudRender:false,sheetSelection:{},
  operationalScrollPaneFor:()=>null,captureOperationalEditScrollLock(){},selectSheetCell(){},applySheetSelection(){},keepOperationalEditorVisible(){},rememberOperationalScrollAnchor(){},showDriverNameSuggestions(){},
  captureUiScrollMemory:()=>({page:'morning'}),restoreUiScrollMemory(){},render(){renders++;},
  selectedSheetTsv:()=>{copied++;return 'Full cell';},selectedSheetHtml:()=>'<table></table>',selectedSheetCells:()=>[{}],toast(){},sheetCopyZone:()=>true
};
vm.createContext(context);
vm.runInContext(source.match(/const DASHBOARD_TEXT_EDITOR_SELECTOR=.*?;\n/)[0],context);
// Keep the production selector, including the exclusions for non-text inputs.
context.textSelector=vm.runInContext('DASHBOARD_TEXT_EDITOR_SELECTOR',context);
vm.runInContext(`const operationalGridEditorSelector='[data-edit-field],[data-device-sheet-field],[data-picklist-edit]';`,context);
for(const name of ['isDashboardTextEditor','handleDashboardTextDoubleClick','activeOperationalEditor','focusSheetCell','focusOperationalGridEditor','handleSheetMouseDown','handleSheetSelectionCopy','focusRosterSearchWithoutPageJump','renderFromCloudEvent'])vm.runInContext(body(name),context);

function field({tag='input',type='text',data={},readOnly=false,disabled=false,contentEditable=false,inert=false}={}){
  const editor={tagName:tag.toUpperCase(),type,dataset:data,readOnly,disabled,isContentEditable:contentEditable,isConnected:true,value:'Driver Example',selects:0,focuses:0,
    getAttribute(){return null;},contains(node){return node===editor;},
    matches(selector){
      if(selector===context.textSelector)return contentEditable||tag==='textarea'||tag==='input'&&!['button','submit','reset','image','file','hidden','checkbox','radio','range','color'].includes(type);
      if(selector==='input:not([type="date"]),textarea')return tag==='textarea'||tag==='input'&&type!=='date';
      return selector.split(',').some(item=>{const match=item.match(/\[data-([\w-]+)\]/);return match&&Object.hasOwn(data,match[1].replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase()));});
    },
    closest(selector){if(selector==='[inert],fieldset[disabled]')return inert?{}:null;return editor.matches(selector)?editor:null;},
    focus(){this.focuses++;context.document.activeElement=this;},select(){this.selects++;},classList:{add(){},remove(){}}
  };return editor;
}
function flush(){while(callbacks.length)callbacks.shift()();}
function reset(){flush();context.document.activeElement=context.document.body;context.operationalInteractionUntil=0;selection.anchorNode=null;selection.focusNode=null;selection.isCollapsed=true;selectionWrites=0;}
function pointer(target){return {target,button:0,shiftKey:false,prevented:false,preventDefault(){this.prevented=true;}};}

reset();
const oldSearch=field(),morning=field({tag:'td',contentEditable:true,data:{editField:'driver'}});
context.document.activeElement=oldSearch;
context.focusSheetCell(morning);
assert.equal(context.document.activeElement,morning,'A Morning Sheet click must immediately transfer focus from a search or form field');
selection.isCollapsed=false;selection.anchorNode=morning;selection.focusNode=morning;
const writesAfterFocus=selectionWrites;
flush();
assert.equal(selectionWrites,writesAfterFocus,'Delayed focus repairs must preserve the word selected by double-click');
const doubleClick=pointer(morning);context.handleSheetMouseDown(doubleClick,morning);context.handleDashboardTextDoubleClick(doubleClick);
assert.equal(doubleClick.prevented,false,'The second click in an active cell must keep native caret and word selection');
assert.equal(morning.value,'Driver Example','Entering editing must never replace the saved text');

reset();
context.focusSheetCell(morning);
const otherCell=field({tag:'td',contentEditable:true,data:{editField:'route'}});otherCell.focus();flush();
assert.equal(context.document.activeElement,otherCell,'A delayed Morning Sheet focus repair must not steal focus back from another cell');

reset();
const device=field({data:{deviceSheetField:'device'}});context.focusOperationalGridEditor(device);
assert.equal(device.selects,1,'Entering a device cell retains its replace-value workflow');
context.focusOperationalGridEditor(device);flush();
assert.equal(device.selects,1,'Repeated click/double-click must not reselect all text in an already-active input');
context.focusOperationalGridEditor(device);otherCell.focus();flush();
assert.equal(context.document.activeElement,otherCell,'A delayed device/Picklist repair must not steal another editor’s focus');

for(const options of [{},{type:'number'},{type:'search'},{type:'email'},{type:'date'},{tag:'textarea'},{data:{rosteringAssignment:'slot-1'}}]){
  reset();const editor=field(options),event=pointer(editor);context.handleDashboardTextDoubleClick(event);
  assert.equal(context.document.activeElement,editor,`Double-click focuses a writable ${options.type||options.tag||'text'} field`);
  assert.equal(event.prevented,false,'Native text selection must not be cancelled');
  assert.equal(context.renderFromCloudEvent(),false,'Cloud updates must defer while any writable form control is active');
}
for(const options of [{readOnly:true},{disabled:true},{inert:true},{type:'checkbox'},{type:'file'},{type:'color'},{tag:'select'},{tag:'button'}]){
  reset();const editor=field(options);context.handleDashboardTextDoubleClick(pointer(editor));
  assert.equal(context.document.activeElement,context.document.body,'Readonly/disabled controls and non-text controls must not be unlocked or focused by the text handler');
  assert.equal(editor.readOnly,Boolean(options.readOnly),'Double-click must never remove a readonly restriction');
}
reset();
const nestedButton={closest:selector=>selector==='button,a,select,[contenteditable="false"]'?nestedButton:morning};
context.handleDashboardTextDoubleClick(pointer(nestedButton));
assert.equal(context.document.activeElement,context.document.body,'Buttons nested inside editable cells must keep their own double-click behavior');

reset();
const search=field({data:{rosterSearch:'paycom'}});context.focusRosterSearchWithoutPageJump(search,pointer(search));device.focus();flush();
assert.equal(context.document.activeElement,device,'Roster search retries must not take focus back after moving to another input');

reset();morning.focus();selection.anchorNode=morning;selection.focusNode=morning;selection.isCollapsed=false;
const copy={prevented:false,preventDefault(){this.prevented=true;},clipboardData:{setData(){}}};context.handleSheetSelectionCopy(copy);
assert.equal(copy.prevented,false,'Copying selected words inside an editable cell must use native text copying');
assert.equal(copied,0,'Selected words must not be replaced with the entire spreadsheet cell');
context.state.copyMode=true;context.handleSheetSelectionCopy(copy);
assert.equal(copy.prevented,true,'Spreadsheet Copy mode must retain its table-copy behavior');
assert.equal(copied,1);
assert.equal(renders,0,'Editing and focus repairs must never rebuild the dashboard or save blank values');
console.log('Double-click editing, selection, focus transfer, readonly protection, and dispatcher refresh tests passed');
