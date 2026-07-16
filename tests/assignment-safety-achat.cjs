const fs=require('fs');
const vm=require('vm');

function assert(condition,message){if(!condition)throw new Error(message);}
const app={innerHTML:''},fileInput={accept:'',addEventListener(){},click(){}};
const storage=new Map();
const element=()=>({addEventListener(){},appendChild(){},remove(){},insertAdjacentHTML(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},blur(){},querySelector(){return null;},querySelectorAll(){return[];}});
const context={console,Intl,Blob,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>true}},window:{scrollTo(){},open(){}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value))},document:{body:{appendChild(){}},activeElement:null,getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,querySelector(){return null;},querySelectorAll(){return[];},createElement:element,addEventListener(){},removeEventListener(){}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context,{filename:'app.js'});
vm.runInContext(`
  toast=()=>{};render=()=>{};persist=()=>{};
  state.dspCode='LLOL';state.fitMorningRows=true;state.morningFilters={wave:'all',staging:'all',pad:'all'};
  state.morningRoutes=[{dsp:'LLOL',driver:'Remaining Helper',route:'CX500',wave:'11:15 AM',staging:'STG.V.8',pad:'A',service:'Standard Parcel',stops:188,packages:355,plannedRts:'7:12 PM',assignmentStatus:'unassigned',missingDriver:true}];
  globalThis.__display=routeDriverDisplayValue(state.morningRoutes[0]);
  globalThis.__payload=morningSheetsConnectorPayload();
  globalThis.__answer=aChatAnswer('Which routes need a driver?');
  globalThis.__page=aChatPage();
  globalThis.__segment=driverSuggestionSegment('Primary Driver + Jon');
  globalThis.__scoreNear=driverSuggestionScore('Jonathan Torres','Jon');
  globalThis.__scoreFar=driverSuggestionScore('Zachary Wilson','Jon');
  sendAChatMessage('Which routes need a driver?');
  globalThis.__messages=JSON.parse(JSON.stringify(state.aChatMessages));
`,context);

assert(context.__display==='? + Remaining Helper','Missing primary placeholder must appear before a preserved helper');
const routeRow=context.__payload.rows.find(row=>row[2]==='CX500');
assert(routeRow&&routeRow[1]==='? + Remaining Helper'&&routeRow[3]==='STG.V.8'&&routeRow[9]===188&&routeRow[10]===355&&routeRow[12]==='7:12 PM','Google payload must preserve route data while exporting the visible ? assignment');
assert(context.__answer.includes('CX500')&&context.__answer.includes('highlighted red'),'A-Chat must report the active missing-driver route');
assert(context.__page.includes('A-Chat')&&context.__page.includes('data-achat-input')&&context.__page.includes('dispatcher helper'),'A-Chat page and composer are missing');
assert(context.__messages.length===2&&context.__messages[0].role==='user'&&context.__messages[1].role==='assistant','A-Chat send flow did not save a user/assistant exchange');
assert(context.__segment.prefix.includes('+')&&context.__segment.query==='Jon'&&context.__scoreNear<context.__scoreFar,'Closest-name helper-segment suggestion ranking failed');
console.log('Protected assignment, name suggestion, and A-Chat contracts passed');
