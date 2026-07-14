const fs=require('fs');
const vm=require('vm');
const JSZip=require('../vendor/jszip.min.js');
const app={innerHTML:''};
const fileInput={accept:'',addEventListener(){},click(){this.clicked=true;}};
const storage=new Map();
const element=()=>({addEventListener(){},appendChild(){},remove(){},classList:{add(){},remove(){},toggle(){}},setAttribute(){},style:{},focus(){},setSelectionRange(){},click(){}});
const context={console,Intl,Blob,URL,setTimeout,clearTimeout,navigator:{clipboard:{writeText:async()=>{}}},JSZip,window:{scrollTo(){}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value))},document:{body:{appendChild(){}},getElementById:id=>id==='app'?app:id==='file-input'?fileInput:null,querySelectorAll:()=>[],createElement:element}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'),'utf8'),context);
vm.runInContext(`
toast=()=>{};
if(!NAV.flatMap(group=>group.items).some(item=>item[0]==='inbox'&&item[1]==='Whiparound'&&item[2]==='whiparound'))throw new Error('Whiparound navigation replacement missing');
const rows=[
 ['Inspection ID','Form','Date inspection occurred','Asset name','Driver first name','Driver last name','Ignored field'],
 ['1','Pre-Trip EDV Inspection (DVIR) ','07/12/2026','EV1','Maya','Collins','ignore me'],
 ['2','Pre-Trip EDV Inspection (DVIR)','07/12/2026','EV2','Jordan','Lee','ignore me'],
 ['3','Post-Trip EDV Inspection (DVIR) ','07/12/2026','EV2','Jordan','Lee','ignore me'],
 ['Inspection ID','Form','Date inspection occurred','Asset name','Driver first name','Driver last name','Ignored field']
];
const records=inspectionRecordsFromRows(rows);
if(records.length!==3||records.some(row=>Object.prototype.hasOwnProperty.call(row,'Ignored field'))||records[0].date!=='2026-07-12')throw new Error('Whiparound five-column parser failed');
state.morningOperationDate='2026-07-12';
state.morningRoutes=[{dsp:'LLOL',driver:'Maya Collins + Helper Name',route:'CX1',wave:'11:15 AM',staging:'STG.V.1'},{dsp:'LLOL',driver:'Jordan Lee',route:'CX2',wave:'11:20 AM',staging:'STG.P.1'}];
state.scheduleEntries=[{date:'07/12/2026',name:'Fredy Guerra',start:'10:30 AM',end:'6:00 PM',role:'Rescue'}];
state.whiparoundInspections=records;state.whiparoundSelectedDate='2026-07-12';state.whiparoundRosterSnapshots={'2026-07-12':currentWhiparoundRoster()};state.whiparoundNotOnRoute={};state.whiparoundComplianceHistory={};
const status=rebuildWhiparoundHistory('2026-07-12');
if(status.expected.length!==3||status.preComplete.length!==2||status.postComplete.length!==1||!status.missingPost.some(row=>row.name==='Maya Collins')||!status.missingPre.some(row=>row.name==='Fredy Guerra'))throw new Error('Opening Roster to Whiparound comparison failed');
const html=inboxPage();
for(const token of ['Whiparound Import','CSV / XLSX','Missing Pre-Trip DVIR','Missing Post-Trip DVIR','Text to remind driver','Not on Route','Prewritten reminders','Completed inspections'])if(!html.includes(token))throw new Error('Whiparound UI missing '+token);
markWhiparoundNotOnRoute('Fredy Guerra');
if(whiparoundStatus('2026-07-12').expected.some(row=>row.name==='Fredy Guerra'))throw new Error('Not on Route removal failed');
restoreWhiparoundDriver('fredy guerra');
if(!whiparoundStatus('2026-07-12').expected.some(row=>row.name==='Fredy Guerra'))throw new Error('Whiparound restore failed');
state.driverContacts=[{name:'Maya Collins',key:'maya collins',phone:'(555) 123-4567',role:'Driver'}];
openWhiparoundReminder('Maya Collins','post');
if(state.modal!=='text-driver'||!state.pendingDriverText.message.includes('Post-Trip EDV Inspection')||!modal().includes('Copy & open Google Messages'))throw new Error('Reviewed reminder handoff failed');
state.whiparoundComplianceHistory={'2026-07-11|maya collins':{date:'2026-07-11',name:'Maya Collins',missingPre:true,missingPost:true},'2026-07-12|maya collins':{date:'2026-07-12',name:'Maya Collins',missingPre:false,missingPost:true}};
if(!driverWhiparoundStats('Maya Collins').frequent||!teamPage().includes('Frequent Whiparound follow-up'))throw new Error('Repeated missed-inspection driver flag failed');
action('whiparound-import',{});
if(state.importPurpose!=='whiparound'||!fileInput.accept.includes('.csv')||!fileInput.accept.includes('.xlsx'))throw new Error('Whiparound import file types failed');
persist();
if(!localStorage.getItem('relayops_whiparound_inspections')||!sharedWorkspaceState().whiparoundComplianceHistory)throw new Error('Whiparound local/cloud persistence failed');
` ,context);

const actual='/Users/alecgonzo/Downloads/Inspections Report_2026-07-13-07-20-17.csv';
if(fs.existsSync(actual)){
  const count=vm.runInContext(`inspectionRecordsFromRows(parseCSV(${JSON.stringify(fs.readFileSync(actual,'utf8'))})).length`,context);
  if(count!==78)throw new Error(`Actual Whiparound report should yield 78 valid DVIR rows, received ${count}`);
}
console.log('Whiparound CSV/XLSX roster matching, reminders, history, and shared persistence test passed');
