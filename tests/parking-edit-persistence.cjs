const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}

const source=fs.readFileSync(require.resolve('../app.js'),'utf8');

assert(
  source.includes("'[data-parking-id],[data-parking-battery],[data-parking-notes],[data-parking-date],[data-charging-check-date],[data-parking-kind]'")||
  (source.includes('[data-parking-id],[data-parking-battery],[data-parking-notes]')&&source.includes('[data-charging-check-date],[data-parking-kind]')),
  'Parking editors must count as active operational editors so cloud refreshes cannot replace their DOM while focused'
);
assert(
  source.includes("el.addEventListener('click',event=>{selectParkingSlot(el.dataset.parkingId,false);syncParkingSelectionVisual(el.dataset.parkingId);if(!parkingTapOpensEditor(event))return;")&&
  source.includes("el.addEventListener('dblclick',event=>{event.preventDefault();event.stopPropagation();beginParkingSlotEdit(el);})")&&
  !source.includes('parkingLastClickAt')&&
  !source.includes('parkingTouchOpened')&&
  source.includes("el.addEventListener('input',()=>{if(el.readOnly)return;updateParkingSlot(el.dataset.parkingId,el.value,false)")&&
  source.includes("el.addEventListener('blur',()=>finishParkingSlotEdit(el))"),
  'Parking van inputs must open on one mobile tap or a desktop double-click, update locally while typing, and finish the edit on blur'
);
assert(
  source.includes('readonly aria-readonly="true"')&&source.includes('title="Double-click to edit')&&
  source.includes('tap once on mobile')&&
  source.includes("function beginParkingSlotEdit(el)")&&
  source.includes("el.readOnly=false")&&
  source.includes("el.readOnly=true"),
  'Parking spots must stay read-only until a mobile tap or desktop double-click explicitly opens that EV number for editing'
);
assert(
  source.includes("if(activeParkingEditId||activeOperationalEditor()")&&
  source.includes("if(!deferredCloudRender||activeParkingEditId||activeOperationalEditor())return;"),
  'Cloud refreshes must wait until a double-click parking edit is finished'
);
assert(
  source.includes("el.addEventListener('change',()=>{if(!el.readOnly)commitParkingSlotEditor(el);})"),
  'Parking van inputs must update locally while typing and commit only when the edit is finished'
);
assert(
  source.includes("updateParkingBattery(el.dataset.parkingBattery,el.value,false)")&&
  source.includes("el.addEventListener('change',()=>commitParkingBatteryEditor(el))"),
  'Parking battery inputs must not create a cloud write for every digit'
);
assert(
  source.includes("el.addEventListener('focus',()=>{selectParkingSlot(el.dataset.parkingId,false)")&&
  source.includes("if(rerender){persist();render();}"),
  'Focusing a parking spot must select it without immediately cloud-saving and rebuilding the map'
);
assert(
  source.includes('function focusParkingSlotEditor(editor)')&&
  source.includes("editor.focus?.({preventScroll:true})")&&
  source.includes('editor.select?.()')&&
  source.includes("pageX=window.scrollX||0,pageY=window.scrollY||0")&&
  source.includes("pane.scrollTop=paneTop;pane.scrollLeft=paneLeft")&&
  source.includes("window.scrollTo(pageX,pageY)"),
  'Parking editor focus must preserve both page and map-pane scroll positions'
);
assert(
  source.includes("UI_SCROLL_MEMORY_SELECTORS=['.sheet-scroll','.opening-picklist-scroll','.device-sheet-table-wrap','.parking-lot']")&&
  source.includes("OPERATIONAL_SCROLL_PANE_SELECTOR='.sheet-scroll,.opening-picklist-scroll,.picklist-sheet-scroll,.device-sheet-table-wrap,.device-sheet-scroll,.parking-lot'")&&
  source.includes('.rostering-associate-list,.parking-map-scroll,.parking-lot'),
  'The parking canvas must participate in scroll memory and intentional user-pan detection'
);
assert(
  source.includes("el.addEventListener('input',()=>{state.parkingNotes=el.value;});")&&
  source.includes("el.addEventListener('change',()=>{state.parkingNotes=el.value;el.dataset.parkingOriginal=el.value;persist();});"),
  'Parking notes must save once on commit instead of once per keystroke'
);

const start=source.indexOf('function updateParkingSlot(');
const end=source.indexOf('function toggleParkingCharger(',start);
assert(start>=0&&end>start,'Parking editor functions were not found');

let persists=0,renders=0;
const context={
  state:{
    vanParking:[{id:'west-1',value:'',kind:'spot'},{id:'east-1',value:'22',kind:'charging'}],
    vanParkingBatteries:{'west-1':88,'east-1':77},
    parkingChargerStatus:{'middle-1-left':'green'},
    parkingNotes:'Keep aisle open',
    vanParkingUpdated:'7/15',
    chargingStationChecked:'2026-07-15',
    selectedParkingId:''
  },
  persist(){persists+=1;},
  render(){renders+=1;},
  syncParkingSlotVisual(){},
  syncParkingSelectionVisual(){},
  applyParkingBatteryTone(){},
  focusOperationalGridEditor(){},
  activeParkingEditId:'',
  operationalEditScrollLock:null,
  Intl,
  Date,
  String,
  Number,
  Math,
  setTimeout
};
vm.createContext(context);
vm.runInContext(source.slice(start,end),context);

context.updateParkingSlot('west-1','40',false);
assert(context.state.vanParking[0].value==='40','Typing a parking value must immediately update local state');
assert(persists===0&&renders===0,'Typing must not trigger a cloud save or full map render');

// Simulate a remote snapshot arriving after the last keypress but before blur.
context.state.vanParking[0].value='';
const slotInput={
  value:'40',
  dataset:{parkingId:'west-1',parkingOriginal:''},
  matches(selector){return selector==='[data-parking-id]';},
  blur(){}
};
context.commitParkingSlotEditor(slotInput);
assert(context.state.vanParking[0].value==='40','Finishing the edit must restore the focused DOM value after a stale remote snapshot');
assert(slotInput.dataset.parkingOriginal==='40','Committed parking value must become the Escape baseline');
assert(persists===1&&renders===0,'A committed parking edit must cloud-save exactly once without rebuilding the map');

context.updateParkingBattery('west-1','95',false);
assert(context.state.vanParkingBatteries['west-1']===95&&persists===1,'Battery typing must remain local until commit');
context.state.vanParkingBatteries['west-1']='';
const batteryInput={
  value:'95',
  dataset:{parkingBattery:'west-1',parkingOriginal:''},
  matches(){return false;},
  blur(){}
};
context.commitParkingBatteryEditor(batteryInput);
assert(context.state.vanParkingBatteries['west-1']===95,'Battery commit must win over a stale remote snapshot');
assert(persists===2&&renders===0,'Battery commit must cloud-save once without rebuilding the map');

// Exercise the actual parking editor functions used by the desktop double-click
// and mobile tap handlers. No test helper is allowed to mutate app state for them.
function parkingInput(value='') {
  const classes=new Set(),attributes={},input={
    value,readOnly:true,isConnected:true,
    dataset:{parkingId:'west-1',parkingOriginal:value},
    matches(selector){return selector==='[data-parking-id]'||selector==='input:not([type="date"]),textarea';},
    setAttribute(name,next){attributes[name]=String(next);},
    closest(selector){return selector==='.parking-slot'?{classList:{add:name=>classes.add(name),remove:name=>classes.delete(name)}}:null;},
    blur(){context.finishParkingSlotEdit(input);}
  };
  return {input,classes,attributes};
}
const untouched=()=>({
  otherSlot:JSON.stringify(context.state.vanParking[1]),
  batteries:JSON.stringify(context.state.vanParkingBatteries),
  chargers:JSON.stringify(context.state.parkingChargerStatus),
  notes:context.state.parkingNotes,
  chargerDate:context.state.chargingStationChecked
});

// Desktop double-click path: begin edit, type, press Enter, save once, close.
persists=0;renders=0;context.state.vanParking[0].value='40';context.state.vanParkingUpdated='7/15';
let pageY=642,focuses=0;
context.focusParkingSlotEditor=()=>{focuses+=1;};
const desktop=parkingInput('40'),desktopBefore=untouched();
context.beginParkingSlotEdit(desktop.input);
context.beginParkingSlotEdit(desktop.input);
assert(desktop.input.readOnly===false&&desktop.input.dataset.parkingEditing==='true'&&desktop.classes.has('editing'),'Desktop double-click must open the parking input for editing');
desktop.input.value='57';context.updateParkingSlot('west-1','57',false);
let prevented=0;context.handleParkingEditorKeydown({key:'Enter',preventDefault(){prevented+=1;}},desktop.input);
assert(prevented===1&&context.state.vanParking[0].value==='57','Enter must save the edited EV number');
assert(desktop.input.readOnly===true&&desktop.input.dataset.parkingEditing==='false'&&!desktop.classes.has('editing'),'Enter must close the parking editor');
assert(persists===1&&renders===0&&focuses===1&&pageY===642,'Enter save must persist exactly once without rendering or changing page position');
assert(JSON.stringify(untouched())===JSON.stringify(desktopBefore),'Saving one spot must preserve other spots, battery values, charger state, notes, and charging-check date');

// Escape must restore the original cell and must not count as a map edit.
persists=0;context.state.vanParkingUpdated='7/15';
const escapeEdit=parkingInput('57');context.beginParkingSlotEdit(escapeEdit.input);
escapeEdit.input.value='58';context.updateParkingSlot('west-1','58',false);
context.handleParkingEditorKeydown({key:'Escape',preventDefault(){}},escapeEdit.input);
assert(context.state.vanParking[0].value==='57'&&escapeEdit.input.readOnly===true,'Escape must cancel the typed EV and close edit mode');
assert(persists===0,'Escape cancellation must not perform a cloud save');
const escapePreservedMapDate=context.state.vanParkingUpdated==='7/15';

// Blur is the third supported commit path and must preserve surrounding state.
persists=0;context.state.vanParkingUpdated='7/15';
const blurEdit=parkingInput('57'),blurBefore=untouched();context.beginParkingSlotEdit(blurEdit.input);
blurEdit.input.value='59';context.updateParkingSlot('west-1','59',false);context.finishParkingSlotEdit(blurEdit.input);
assert(context.state.vanParking[0].value==='59'&&persists===1&&blurEdit.input.readOnly===true,'Blurring an edited parking input must save once and close editing');
assert(JSON.stringify(untouched())===JSON.stringify(blurBefore),'Blur save must preserve battery, charger, notes, check date, and every other parking spot');

// Mobile detection is a behavior contract, not just a label in the HTML.
const tapStart=source.indexOf('function parkingTapOpensEditor('),tapEnd=source.indexOf('function syncParkingSlotVisual(',tapStart);
assert(tapStart>=0&&tapEnd>tapStart,'Mobile parking tap detector was not found');
const tapContext={navigator:{maxTouchPoints:1},window:{innerWidth:390,matchMedia:()=>({matches:true})},Number,Boolean};
vm.createContext(tapContext);vm.runInContext(source.slice(tapStart,tapEnd),tapContext);
assert(tapContext.parkingTapOpensEditor({sourceCapabilities:{firesTouchEvents:true}})===true,'A mobile/touch parking tap must request edit mode');

// If Safari moves the page or parking pane while focusing, the scroll guard
// must put both coordinates back on the captured edit position.
const guardStart=source.indexOf('function handleOperationalScrollGuard('),guardEnd=source.indexOf('function scheduleOperationalScrollGuard(',guardStart);
assert(guardStart>=0&&guardEnd>guardStart,'Operational scroll guard was not found');
const editor={},pane={isConnected:true,scrollTop:0,scrollLeft:0},scrollCalls=[];
const guardContext={
  operationalEditScrollLock:{editor,pane,pageX:12,pageY:642,paneTop:88,paneLeft:34},
  operationalUserScrollUntil:0,operationalScrollGuardRestoring:false,
  document:{activeElement:editor},window:{scrollX:0,scrollY:0,scrollTo:(x,y)=>{scrollCalls.push([x,y]);guardContext.window.scrollX=x;guardContext.window.scrollY=y;},requestAnimationFrame(){}},
  activeOperationalEditor:()=>true,rememberOperationalScrollAnchor(){},Date,setTimeout
};
vm.createContext(guardContext);vm.runInContext(source.slice(guardStart,guardEnd),guardContext);guardContext.handleOperationalScrollGuard();
assert(pane.scrollTop===88&&pane.scrollLeft===34&&scrollCalls.some(([x,y])=>x===12&&y===642),'Parking edit scroll guard must undo a page/pane jump');
assert(escapePreservedMapDate,'Escape cancellation must preserve the previous map-updated date');

console.log('Parking spot edit and cloud persistence contracts passed');
