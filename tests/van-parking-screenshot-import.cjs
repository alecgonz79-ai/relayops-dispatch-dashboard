const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const storage=new Map();
const app={innerHTML:''};
const fileInput={addEventListener(){},click(){}};
const element=()=>({
  addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},
  setAttribute(){},style:{},focus(){},select(){},setSelectionRange(){},click(){}
});

const context={
  console,Intl,URL,URLSearchParams,Blob,TextDecoder,setTimeout,clearTimeout,assert,
  location:{search:'',href:'https://relayops.example.test/'},
  history:{replaceState(){}},
  navigator:{clipboard:{writeText:async()=>true}},
  localStorage:{
    getItem:key=>storage.has(key)?storage.get(key):null,
    setItem:(key,value)=>storage.set(key,String(value)),
    removeItem:key=>storage.delete(key)
  },
  window:{
    scrollTo(){},addEventListener(){},
    RelayOpsCloud:{schedule(){},on(){},load:async()=>{},session:null}
  },
  document:{
    body:{appendChild(){}},
    visibilityState:'visible',
    addEventListener(){},
    getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,
    querySelectorAll:()=>[],
    createElement:element
  }
};
context.window.localStorage=context.localStorage;
context.globalThis=context;

const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
const checks=`
__toasts=[];
toast=(message,type='success')=>__toasts.push({message,type});
render=()=>{};

assert(source.includes('data-action="clear-parking-spots"'),'Van Parking must expose a Clear Spots button');
assert(source.includes("'clear-parking-spots'"),'Fleet-team parking scope must allow Clear Spots');

state.vanParking=defaultVanParkingSlots();
state.vanParking.forEach(slot=>{slot.value='OLD';});
state.vanParkingBatteries={old:44};
state.parkingChargerStatus={'middle-1-left':'green'};
state.parkingNotes='Keep charger note';

const sheetScreenshotText=[
  '1 #1 #36 4',
  '17 #2 #35 38',
  '2 (100%) #3 #34 34',
  '3 #4 #33 28',
  '5 #5 #32 39',
  '35 #6 #31 20',
  '57 #7 #30 32',
  '8 #8 #29 31 (100%)',
  '9 #9 #28 45',
  '13 #10 #27 26',
  '14 #11 #26 29',
  '12 #12 #25 19',
  '30 #13 #24 11',
  '15 #14 #23 23',
  '16 #15 #22 22',
  '40 (100%) #16 #21 36',
  '21 #17 #20 25',
  '18 #37 #19 42',
  '49 #38 #18 27',
  '51 #39',
  '37 #40',
  '24 #46 #45 48',
  '55 #47 #44 41',
  '33 80% #48 #43 54',
  '10 #49 #42 43',
  '47 #50 #41 53'
].join('\\n');

const count=applyParkingText(sheetScreenshotText);
assert.strictEqual(count,50,'Google Sheets screenshot text should match every numbered parking spot');

const slotBySpot=spot=>parkingSpotSlotMap().get(String(spot));
assert.strictEqual(slotBySpot(1).value,'1');
assert.strictEqual(slotBySpot(36).value,'4');
assert.strictEqual(slotBySpot(3).value,'2');
assert.strictEqual(String(state.vanParkingBatteries[slotBySpot(3).id]),'100');
assert.strictEqual(slotBySpot(29).value,'31');
assert.strictEqual(String(state.vanParkingBatteries[slotBySpot(29).id]),'100');
assert.strictEqual(slotBySpot(48).value,'33');
assert.strictEqual(String(state.vanParkingBatteries[slotBySpot(48).id]),'80');
assert.strictEqual(slotBySpot(46).value,'24');
assert.strictEqual(slotBySpot(41).value,'53');
assert.strictEqual(slotBySpot(39).value,'51');
assert.strictEqual(slotBySpot(40).value,'37');
assert.strictEqual(state.parkingChargerStatus['middle-1-left'],'green','Parking import must not wipe charger status');
assert.strictEqual(state.parkingNotes,'Keep charger note','Parking import must not wipe notes');

state.vanParkingPasteText=sheetScreenshotText;
clearParkingSpots();
assert(state.vanParking.every(slot=>slot.value===''),'Clear Spots must empty every van spot value');
assert.deepStrictEqual(state.vanParkingBatteries,{},'Clear Spots must clear stale battery values');
assert.strictEqual(state.parkingChargerStatus['middle-1-left'],'green','Clear Spots must preserve charger status');
assert.strictEqual(state.parkingNotes,'Keep charger note','Clear Spots must preserve parking notes');
assert.strictEqual(state.vanParkingPasteText,'','Clear Spots must clear the last imported parking text');
assert(__toasts.at(-1).message.includes('Cleared'),'Clear Spots should confirm how many spots were cleared');

console.log('Van Parking screenshot import and Clear Spots contracts passed');
`;

context.source=source;
vm.createContext(context);
vm.runInContext(`${source}\n${checks}`,context);
