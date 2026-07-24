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
  source.includes("doubleClick=event.detail>=2||now-last<500")&&
  source.includes("el.addEventListener('dblclick',event=>{event.preventDefault();event.stopPropagation();beginParkingSlotEdit(el);})")&&
  source.includes("el.addEventListener('input',()=>{if(el.readOnly)return;updateParkingSlot(el.dataset.parkingId,el.value,false)")&&
  source.includes("el.addEventListener('blur',()=>finishParkingSlotEdit(el))"),
  'Parking van inputs must require a double-click, update locally while typing, and finish the edit on blur'
);
assert(
  source.includes('readonly aria-readonly="true"')&&source.includes('title="Double-click to edit')&&
  source.includes("function beginParkingSlotEdit(el)")&&
  source.includes("el.readOnly=false")&&
  source.includes("el.readOnly=true"),
  'Parking spots must stay read-only until a double-click explicitly opens that EV number for editing'
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
    vanParking:[{id:'west-1',value:'',kind:'spot'}],
    vanParkingBatteries:{},
    selectedParkingId:''
  },
  persist(){persists+=1;},
  render(){renders+=1;},
  syncParkingSlotVisual(){},
  applyParkingBatteryTone(){},
  Intl,
  Date,
  String,
  Number,
  Math
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

console.log('Parking spot edit and cloud persistence contracts passed');
