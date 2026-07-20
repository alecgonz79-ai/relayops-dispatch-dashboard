const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  roster: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  van: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17V6a2 2 0 0 1 2-2h9v13H3Z"/><path d="M14 9h4l3 4v4h-7V9Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M19.5 9h2v6h-2M11 9v6M8 12h6"/></svg>',
  parking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="2" width="18" height="20" rx="3"/><path d="M9 18V6h4.1a4 4 0 0 1 0 8H9M9 10h4"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V9M10 19V5M16 19v-7M22 19V2"/></svg>',
  coach: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="m8 11 2 2 5-5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  whiparound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m8 15 2.2 2.2L16 11.5"/></svg>',
  achat: '<svg viewBox="0 0 24 24" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3Zm2 4v10h2v-3h6v3h2V7h-2V5H9v2H7Zm3 0h4v5h-4V7Z"/><path fill="#fff" d="M10 8h4v4h-4z"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m21 8-9 5-9-5 9-5 9 5Z"/><path d="m3 8 9 5 9-5v8l-9 5-9-5V8Z"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.18.38.52.72 1 .9.35.13.72.2 1.1.2h.1v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.3 4.1 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>'
};

const ADMIN_OWNER_EMAIL = 'alecgonz79@gmail.com';
const OWNER_ADMIN_ACTIONS = new Set(['invite','send-user-invite','edit-member-access','save-member-access','save-organization']);

function authenticatedCloudEmail() {
  return String(window.RelayOpsCloud?.session?.user?.email||state?.cloudUser||'').trim().toLowerCase();
}
function hasOwnerAdminAccess() {
  return state?.role==='admin'&&authenticatedCloudEmail()===ADMIN_OWNER_EMAIL;
}

const NAV = [
  { section: 'Opening Operations', items: [
    ['dashboard','Today','dashboard'], ['morning','Morning sheet','calendar'], ['roster','Opening Picklist','roster'], ['rostering','Rostering','users'], ['live','Device and Portable Sheet','phone']
  ]},
  { section: 'Closing Operations', items: [
    ['team','Drivers & team','users'], ['fleet','Fleet Health','battery'], ['parking','Van Parking','parking'], ['inbox','Whiparound','whiparound'], ['inventory','Inventory','box']
  ]},
  { section: 'Improve', items: [
    ['performance','Performance','chart'], ['coaching','Coaching','coach','6'], ['reports','Reports & export','report'], ['achat','A-Chat','achat'], ['admin','Admin access','settings','',true]
  ]}
];

const DISPATCHER_SHARE_URL = 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/';
const DISPATCHER_SHARE_TEXT = `LLOL Dispatch Opening Operations\n${DISPATCHER_SHARE_URL}`;
const DISPATCHER_SHARE_NOTE = 'Use this exact full link. GitHub Pages will show 404 if the account name is shortened or changed, like AG79.github.io.';
const FLEET_PARKING_SHARE_URL = `${DISPATCHER_SHARE_URL}?view=parking`;
const FLEET_PARKING_SHARE_TEXT = `LLOL Van Parking Map\n${FLEET_PARKING_SHARE_URL}`;
const AMAZON_FLEET_PORTAL_URL = 'https://logistics.amazon.com/fleet-management/#vehicles';
const AMAZON_WORKFORCE_ASSOCIATES_URL = 'https://logistics.amazon.com/workforce?pageId=da_console_associates&station=DJT6&companyId=ab7228f0-51de-4c53-98f3-7d3c3da46724&tabId=da-console-associates-tab';
const FLEETOS_PORTAL_URL = 'https://business.rivian.com/vehicles/tracker';
const FIXED_FLEET_NAMES = Object.freeze({
  '7FCEHEB25RN017610': 'EV53'
});
const MORNING_TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ/edit?gid=0#gid=0';
// Connector deployments are station-specific and must come from local/shared
// configuration. Never ship a writable Apps Script endpoint in public code.
const MORNING_SHEETS_DEFAULT_ENDPOINT = '';
const MORNING_TEMPLATE_SHEET_NAME = 'OPS LOG 2026';
const MORNING_TEMPLATE_SHEET_CANDIDATES = [MORNING_TEMPLATE_SHEET_NAME];
const MORNING_APPS_SCRIPT_URL = 'google-sheets/relayops-morning-connector.gs';
const PERFORMANCE_TRAINING_URL = 'https://cdfda-performance.pplx.app/#/';
const AMAZON_SCHEDULING_URL = 'https://logistics.amazon.com/scheduling?serviceAreaId=f0c05ae0-b2c0-462c-8ee0-f72f5ab653ec';
const LOW_BATTERY_SECTION_THRESHOLD = 80;
const DISPATCH_BATTERY_BLOCK_THRESHOLD = 40;
const initialUrlParams = (()=>{if(typeof URLSearchParams!=='function')return {get:()=>''};try{return new URLSearchParams(location.search||'');}catch{return new URLSearchParams('');}})();
const PARKING_ONLY_VIEW = ['parking','van-parking','fleet-parking'].includes(String(initialUrlParams.get('view')||initialUrlParams.get('tab')||'').toLowerCase());
const DEFAULT_ROSTERING_SERVICES = Object.freeze([
  {id:'xl-donations',name:'Standard Parcel - Extra Large Van - AMZ Donations - Default as station - 10 Hours',confirmed:2,kind:'driver',defaultTime:'11:15 AM'},
  {id:'rivian-helper-route',name:'Standard Parcel Electric - Rivian MEDIUM with Helper - Default as station - 10 Hours',confirmed:4,kind:'driver',defaultTime:'11:15 AM'},
  {id:'rivian-medium',name:'Standard Parcel Electric - Rivian MEDIUM - Default as station - 10 Hours',confirmed:40,kind:'driver',defaultTime:'11:25 AM'},
  {id:'helper-associate',name:'Standard Parcel Electric - Rivian MEDIUM with Helper: Helper - Default as station - 10 Hours',confirmed:4,kind:'helper',defaultTime:'11:15 AM'}
]);
const XL_US_ROSTERING_SERVICE = Object.freeze({id:'xl-us',name:'Standard Parcel - Extra Large Van - US - Default as station - 10 Hours',confirmed:3,kind:'driver',defaultTime:'11:15 AM'});
const DRIVER_NOTE_FLAGS = Object.freeze([
  ['late-driver','Late Driver'],['violations','Violations'],['performance','Performance'],['suspended','Suspended'],
  ['modified-duty','Modified Duty'],['later-waves','Only Later Waves'],['helper-routes','Likes Helper Routes'],['new-driver','New Driver']
]);
const DRIVER_NOTE_FLAG_LABELS = Object.freeze(Object.fromEntries(DRIVER_NOTE_FLAGS));

function defaultOperationDate() {
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(part=>[part.type,part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function requestedOperationDate() {
  const requested=String(initialUrlParams.get('date')||'').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(requested)?requested:defaultOperationDate();
}
function sharedDashboardUrl(view='') {
  const url=new URL(DISPATCHER_SHARE_URL);
  url.searchParams.set('date',state?.morningOperationDate||requestedOperationDate());
  if(view)url.searchParams.set('view',view);
  return url.href;
}
function operationDateTabNames(value='') {
  const parts=String(value||'').split('-').map(Number);
  if(parts.length!==3||parts.some(n=>!n))return [];
  const [year,month,day]=parts,shortYear=String(year).slice(-2);
  return [`${month}/${day}/${shortYear}`,`${month}.${day}.${shortYear}`];
}

// Legacy coaching fixtures remain available to the workflow engine for saved
// records, but the UI only renders a fixture when that exact person exists in
// the imported Drivers & Team directory.
const COACHING_OPPORTUNITIES = Object.freeze([
  {id:'andre-wilson-following-distance',driver:'Andre Wilson',focus:'Following distance',source:'Netradyne · 2 events',due:'Due today',priority:'High'},
  {id:'nina-patel-contact-compliance',driver:'Nina Patel',focus:'Contact compliance',source:'Scorecard · 91.8%',due:'Due today',priority:'Medium'},
  {id:'jordan-lee-delivery-not-received',driver:'Jordan Lee',focus:'Delivery not received',source:'2 DNRs this week',due:'Due tomorrow',priority:'High'},
  {id:'kiara-owens-seatbelt',driver:'Kiara Owens',focus:'Seatbelt-off event',source:'Netradyne · 1 event',due:'Ready',priority:'High'},
  {id:'ethan-brooks-customer-feedback',driver:'Ethan Brooks',focus:'Customer feedback',source:'CED down 2.1%',due:'Ready',priority:'Medium'},
  {id:'marcus-chen-recognition',driver:'Marcus Chen',focus:'Positive recognition',source:'Top rescue support',due:'Ready',priority:'Positive'}
]);
const DEFAULT_COACHING_TEMPLATE = 'Hi {first}, dispatch would like to review {focus} with you. {notes} Please reply when you are ready to connect.';

const rivianFleet = [
  { name:'EDV-014816', vin:'7FCEHEB79PN014816', plate:'8HJK214', battery:63, miles:98, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-000184', vin:'7FCTGAAA1PN000184', plate:'8HJK215', battery:92, miles:144, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-000231', vin:'7FCTGAAA7PN000231', plate:'8HJK216', battery:76, miles:119, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-000315', vin:'7FCTGAAA4PN000315', plate:'8HJK217', battery:64, miles:100, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-000402', vin:'7FCTGAAA9PN000402', plate:'8HJK218', battery:48, miles:75, active:'Active', operational:'Operational', status:'Charge watch' },
  { name:'EDV-000517', vin:'7FCTGAAA2PN000517', plate:'8HJK219', battery:33, miles:52, active:'Active', operational:'Operational', status:'Needs charge' },
  { name:'EDV-000688', vin:'7FCTGAAA6PN000688', plate:'8HJK220', battery:18, miles:28, active:'Active', operational:'Grounded', status:'Critical' },
  { name:'EDV-000742', vin:'7FCTGAAA8PN000742', plate:'8HJK221', battery:85, miles:133, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-000809', vin:'7FCTGAAA3PN000809', plate:'8HJK222', battery:71, miles:111, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-000874', vin:'7FCTGAAA5PN000874', plate:'8HJK223', battery:56, miles:88, active:'Inactive', operational:'Operational', status:'Idle' },
  { name:'EDV-000936', vin:'7FCTGAAA9PN000936', plate:'8HJK224', battery:42, miles:66, active:'Active', operational:'Operational', status:'Charge watch' },
  { name:'EDV-001022', vin:'7FCTGAAA2PN001022', plate:'8HJK225', battery:27, miles:42, active:'Active', operational:'Grounded', status:'Needs charge' },
  { name:'EDV-001105', vin:'7FCTGAAA4PN001105', plate:'8HJK226', battery:97, miles:152, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-001188', vin:'7FCTGAAA7PN001188', plate:'8HJK227', battery:69, miles:108, active:'Active', operational:'Operational', status:'Connected' },
  { name:'EDV-001240', vin:'7FCTGAAA1PN001240', plate:'8HJK228', battery:58, miles:91, active:'Active', operational:'Operational', status:'Idle' },
  { name:'EDV-001319', vin:'7FCTGAAA6PN001319', plate:'8HJK229', battery:22, miles:34, active:'Inactive', operational:'Grounded', status:'Critical' }
];
const demoBatteryCycle = [88,82,79,74,69,64,58,53,47,41,36,31,26,91,84,77,72,66,61,55,49,43,38,33,95,87,81,76,70,65,59,54,48,42,37,32,89,83,78,73,67,62];
while (rivianFleet.length < 58) {
  const i = rivianFleet.length + 1;
  const battery = demoBatteryCycle[(i-17)%demoBatteryCycle.length];
  const vinSuffix = String(200000+i).padStart(6,'0');
  const grounded = battery < 34 && i%3===0;
  rivianFleet.push({
    name:`EDV-${vinSuffix}`,
    vin:`7FCTGAAA${(i*7)%10}PN${vinSuffix}`,
    plate:`8HJK${String(230+i).padStart(3,'0')}`,
    battery,
    miles:Math.max(18,Math.round(battery*1.55)),
    active:i%19===0?'Inactive':'Active',
    operational:grounded?'Grounded':'Operational',
    status:grounded?'Needs charge':battery<40?'Charge watch':'Connected'
  });
}
const demoRivianFleet = rivianFleet.map(v=>({...v}));

const morningSeed = [
  ['LLOL','Gustavo Rosales','CX249','Standard Parcel Electric - Rivian MEDIUM with Helper','11:15 AM','STG.M.13',21,332,163,188,'5:35 PM'],
  ['LLOL','Anthony Moore','CX255','Standard Parcel Electric - Rivian MEDIUM with Helper','11:15 AM','STG.V.1',25,416,136,188,'6:58 PM'],
  ['LLOL','Johnathon Salazar + MINOR','CX236','Standard Parcel Electric - Rivian MEDIUM with Helper','11:15 AM','STG.V.2',19,319,9,184,'7:37 PM'],
  ['LLOL','ANTONIO + J TORRES','CX237','Standard Parcel Electric - Rivian MEDIUM','11:15 AM','STG.V.3',16,272,8,182,'7:18 PM'],
  ['LLOL','Juan Hlongwane + KEVIN','CX240','Standard Parcel Electric - Rivian MEDIUM with Helper','11:15 AM','STG.V.4',26,439,62,189,'8:09 PM'],
  ['LLOL','Ronaldo Andrade + JOHN A','CX219','Standard Parcel Electric - Rivian MEDIUM','11:15 AM','STG.V.5',25,393,1,185,'8:07 PM'],
  ['LLOL','Jordan Burnett Foster','CX253','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.O.14',20,327,5,189,'6:36 PM'],
  ['LLOL','Psalm Washington','CX251','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.O.15',21,348,6,187,'6:09 PM'],
  ['LLOL','Joshua Willumeier','CX225','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.O.16',22,358,64,190,'7:23 PM'],
  ['LLOL','Clarence Butler','CX224','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.O.17',23,379,47,189,'6:04 PM'],
  ['LLOL','Fernando Velazquez Tapia','CX221','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.P.1',21,381,38,189,'5:56 PM'],
  ['LLOL','John Wall','CX215','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.P.2',19,313,36,109,'4:32 PM'],
  ['LLOL','Ralph Gomez','CX238','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.P.3',17,303,11,188,'6:24 PM'],
  ['LLOL','Andre Antoine Walker','CX235','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.P.4',23,350,7,174,'7:47 PM'],
  ['LLOL','Isaiah Whidbee','CX208','Standard Parcel Electric - Rivian MEDIUM','11:20 AM','STG.P.5',20,339,7,187,'6:16 PM'],
  ['LLOL','SOTO','CX262','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.1',23,343,14,190,'6:49 PM'],
  ['LLOL','Geoffrey','CX248','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.2',20,342,4,164,'6:20 PM'],
  ['LLOL','Erik Rojo','CX247','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.3',20,318,5,189,'5:27 PM'],
  ['LLOL','ALEJANDRO PADILLA','CX231','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.4',18,300,70,187,'6:12 PM'],
  ['LLOL','Elias Reyna','CX234','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.5',22,364,64,186,'7:54 PM'],
  ['LLOL','Janette Osorio','CX213','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.6',18,334,61,190,'5:56 PM'],
  ['LLOL','Rafael Pineda','CX232','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.7',23,367,32,145,'6:54 PM'],
  ['LLOL','Jesus Sandoval','CX243','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.8',26,331,17,187,'7:21 PM'],
  ['LLOL','Adrian Elizondo','CX218','Standard Parcel Electric - Rivian MEDIUM','11:25 AM','STG.Z.9',26,356,8,189,'6:03 PM'],
  ['LLOL','Alexander Lopez','CX214','Nursery Route Level 3 - Electric Vehicle','11:40 AM','STG.U.1',14,233,8,138,'6:29 PM'],
  ['LLOL','Carlos Melendez','CX246','Standard Parcel Electric - Rivian MEDIUM','11:40 AM','STG.V.6',22,340,8,183,'6:33 PM'],
  ['LLOL','Angel Landin','CX220','Standard Parcel Electric - Rivian MEDIUM','11:40 AM','STG.V.7',24,387,51,181,'7:57 PM'],
  ['LLOL','Gilbert','CX233','Standard Parcel Electric - Rivian MEDIUM','11:40 AM','STG.V.8',18,335,38,186,'6:05 PM'],
  ['LLOL','J SALDANA','CX211','Standard Parcel Electric - Rivian MEDIUM','11:40 AM','STG.V.9',24,387,32,187,'5:43 PM'],
  ['LLOL','Lynette Linder','CX216','Standard Parcel Electric - Rivian MEDIUM','11:40 AM','STG.V.10',21,363,27,184,'6:54 PM'],
  ['LLOL','Jason Cortes','CX229','Standard Parcel Electric - Rivian MEDIUM','11:45 AM','STG.X.1',19,411,0,138,'5:43 PM'],
  ['LLOL','Leman Carter Jr','CX223','Nursery Route Level 2 - Electric Vehicle','11:45 AM','STG.X.2',14,283,8,188,'6:09 PM'],
  ['LLOL','Braylin Collins','CX252','Standard Parcel Electric - Rivian MEDIUM','11:45 AM','STG.P.6',22,364,8,180,'6:22 PM'],
  ['LLOL','Andrew Dominguez','CX207','Standard Parcel Electric - Rivian MEDIUM','11:45 AM','STG.P.7',23,332,3,175,'6:11 PM'],
  ['LLOL','Robert DANIELS','CX212','Standard Parcel Electric - Rivian MEDIUM','11:45 AM','STG.P.8',21,395,73,190,'6:02 PM'],
  ['LLOL','KAITLEN','CX239','Standard Parcel Electric - Rivian MEDIUM','11:45 AM','STG.P.9',23,341,16,183,'6:46 PM']
].map((r,i)=>({dsp:r[0],driver:r[1],route:r[2],service:r[3],wave:r[4],staging:r[5],zones:r[6],packages:r[7],commercial:r[8],stops:r[9],eta:r[10],duration:360+i*3,bags:Math.max(8,Math.round(r[7]/13)),overflow:Math.max(2,Math.round(r[7]/24)),parking:i%5===0?`P${12+(i%21)}`:'',checkedIn:i<28,vanReady:i%7!==0,deviceReady:i%9!==0,loadReady:false}));

function defaultVanParkingSlots() {
  const west=['57','2','1','4','6','36','55','29','9','40','5','13','42','14','20','16','24','18','30','50','35','51'];
  const east=['38','58','52','15','33','43','31','23','11','28','26','34','53','48','22','21','45','49','44','19'];
  const topLeft=['X','X','X','X','X'], topRight=['47','27','56','54','53'];
  const crosswalk=['','','','15','','','','','','','','','','','','','','','','50','',''];
  const slots=[];
  topLeft.forEach((value,i)=>slots.push({id:`north-left-${i+1}`,zone:'northLeft',label:`North overflow ${i+1}`,value,kind:'overflow'}));
  topRight.forEach((value,i)=>slots.push({id:`north-right-${i+1}`,zone:'northRight',label:`North row ${i+1}`,value,kind:'spot'}));
  ['10(93%)','','','','39','','',''].forEach((value,i)=>slots.push({id:`street-${i+1}`,zone:'street',label:i===0?'Street charge':`Street upper spot ${i+1}`,value,kind:'street'}));
  Array.from({length:8}).forEach((_,i)=>slots.push({id:`street-lower-${i+1}`,zone:'streetLower',label:`Street lower spot ${i+1}`,value:'',kind:'street'}));
  west.forEach((value,i)=>{
    slots.push({id:`west-${String(i+1).padStart(2,'0')}`,zone:'west',label:`Left row ${i+1}`,value,kind:['4','50'].includes(value)?'crosswalk':'spot'});
    if(i===3)slots.push({id:'west-missing-04',zone:'west',label:'Left row missing spot above #5',value:'',kind:'spot'});
  });
  crosswalk.forEach((value,i)=>slots.push({id:`crosswalk-${String(i+1).padStart(2,'0')}`,zone:'crosswalk',label:`Crosswalk ${i+1}`,value,kind:'crosswalk'}));
  east.forEach((value,i)=>{
    slots.push({id:`east-${String(i+1).padStart(2,'0')}`,zone:'east',label:`Right row ${i+1}`,value,kind:i===3||value==='19'?'crosswalk':'spot'});
    if(i===3)slots.push({id:'east-missing-33',zone:'east',label:'Right row missing spot above #32',value:'',kind:'spot'});
  });
  gasVehicleIds.forEach((value,i)=>slots.push({id:`gas-${String(i+1).padStart(2,'0')}`,zone:'gas',label:`Gas spot ${i+1}`,value,kind:'spot'}));
  return slots;
}

function loadVanParkingSlots() {
  try {
    const saved=JSON.parse(localStorage.getItem('relayops_van_parking')||'null');
    if(Array.isArray(saved)&&saved.length) {
      const defaults=defaultVanParkingSlots(),savedById=new Map(saved.filter(slot=>slot?.id).map(slot=>[slot.id,slot])),defaultIds=new Set(defaults.map(slot=>slot.id));
      const merged=defaults.map(slot=>({...slot,...savedById.get(slot.id)}));
      saved.forEach(slot=>{if(slot?.id&&!defaultIds.has(slot.id))merged.push(slot);});
      return merged;
    }
  } catch {}
  return defaultVanParkingSlots();
}

function loadDeviceCustomRows() {
  try {
    const saved=JSON.parse(localStorage.getItem('relayops_device_custom_rows')||'null');
    if(saved&&typeof saved==='object')return {
      ev:Array.isArray(saved.ev)?saved.ev:[],
      gas:Array.isArray(saved.gas)?saved.gas:[],
      helper:Array.isArray(saved.helper)?saved.helper:[]
    };
  } catch {}
  return {ev:[],gas:[],helper:[]};
}

const gasVehicleIds = ['F33','F34','R35','R36','R37','R54','R55','R62'];

const FLEET_ISSUE_CATALOG = [
  {group:'Tires',options:[
    ['nail-front-driver','Nail in front driver tire'],['nail-rear-driver','Nail in rear driver tire'],
    ['nail-front-passenger','Nail in front passenger tire'],['nail-rear-passenger','Nail in rear passenger tire'],
    ['low-air-tires','Low air in tires'],['flat-tire','Flat tire'],
    ['tread-front-driver','Low tire tread on front driver tire'],['tread-front-passenger','Low tread in front passenger tire'],
    ['tread-rear-passenger','Low tread in rear passenger tire'],['tread-rear-driver','Low tread in rear driver tire']
  ]},
  {group:'Body & doors',options:[
    ['missing-panels','Missing panels'],['undercarriage','Hanging undercarriage'],
    ['rollup-not-closing','Roll up door not closing'],['rollup-issues','Roll up door issues'],
    ['passenger-sliding-door','Passenger sliding door issues']
  ]},
  {group:'Lights & cameras',options:[
    ['driver-tail-light','Cracked driver tail light'],['passenger-tail-light','Cracked passenger tail light'],
    ['netradyne-camera','Hanging Netradyne camera'],['camera-360','360 Cam not working'],
    ['missing-side-lights','Missing side lights'],['side-light-off','Side light off'],['front-top-lights','Front top lights out']
  ]},
  {group:'Documents',options:[
    ['expired-registration','Expired tags/registration'],['missing-insurance','Missing insurance']
  ]},
  {group:'Drive & controls',options:[
    ['turtle-mode','Turtle mode'],['shifter-broken','Shifter broken'],['exposed-wires','Exposed wires']
  ]},
  {group:'Cabin',options:[
    ['wiper-fluid','Wiper fluid low'],['ac-not-working','A/C not working'],['ac-weak','A/C not blowing hard']
  ]},
  {group:'Other',options:[['custom','Custom issue']]}
];
const FLEET_ISSUE_LABELS = Object.fromEntries(FLEET_ISSUE_CATALOG.flatMap(group=>group.options));
function issueId(){return globalThis.crypto?.randomUUID?.()||`issue-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;}
function normalizeFleetIssuesStore(raw={}) {
  const normalized={};
  Object.entries(raw||{}).forEach(([key,value])=>{
    if(!value||typeof value!=='object')return;
    if(Array.isArray(value.active)||Array.isArray(value.history)){
      const active=(value.active||[]).filter(Boolean).map(item=>({...item,id:item.id||issueId(),text:item.text||FLEET_ISSUE_LABELS[item.category]||'Reported issue'}));
      const history=(value.history||[]).filter(Boolean).map(item=>({...item,id:item.id||issueId(),text:item.text||FLEET_ISSUE_LABELS[item.category]||'Reported issue'}));
      normalized[key]={...value,active,history};return;
    }
    if(value.text){
      const id=`legacy-${String(value.updatedAt||key).replace(/[^a-z0-9]/gi,'').slice(-24)}`;
      const record={id,category:'custom',group:'Other',text:value.text,severity:value.severity||'watch',createdAt:value.updatedAt||new Date().toISOString(),status:'active'};
      normalized[key]={label:value.label||key,active:[record],history:[record],updatedAt:value.updatedAt||record.createdAt};
    }
  });
  return normalized;
}
function normalizeEquipmentIssuesStore(raw={}) {
  const normalized={};
  Object.entries(raw&&typeof raw==='object'?raw:{}).forEach(([rawKey,value])=>{
    if(!value||typeof value!=='object')return;
    const key=String(rawKey||'').toLowerCase(),type=key.startsWith('portable:')?'portable':'device',equipmentId=normalizeEquipmentIssueId(type,value.equipmentId||key.split(':').slice(1).join(':'));
    if(!equipmentId)return;
    const cleanRecord=item=>{const created=new Date(item?.createdAt||Date.now()),resolved=item?.resolvedAt?new Date(item.resolvedAt):null;return {id:String(item?.id||issueId()),text:String(item?.text||'Equipment issue').trim().slice(0,280),severity:['watch','high','critical'].includes(item?.severity)?item.severity:'watch',createdAt:Number.isNaN(created.getTime())?new Date().toISOString():created.toISOString(),createdBy:String(item?.createdBy||'Dispatcher').trim().slice(0,80),status:item?.status==='fixed'?'fixed':'active',resolvedAt:resolved&&!Number.isNaN(resolved.getTime())?resolved.toISOString():'',resolvedBy:String(item?.resolvedBy||'').trim().slice(0,80)};};
    const history=(Array.isArray(value.history)?value.history:[]).filter(Boolean).map(cleanRecord),fixed=new Set(history.filter(item=>item.status==='fixed').map(item=>item.id)),active=(Array.isArray(value.active)?value.active:[]).filter(Boolean).map(cleanRecord).filter(item=>item.status!=='fixed'&&!fixed.has(item.id));
    normalized[`${type}:${equipmentId}`]={type,equipmentId,label:`${type==='portable'?'Portable':'Device'} ${equipmentId}`,active,history,updatedAt:String(value.updatedAt||active.at(-1)?.createdAt||history.at(-1)?.createdAt||'')};
  });
  return normalized;
}

const DEFAULT_INVENTORY_ITEMS = [
  {id:'cat-phones',name:'CAT phones',category:'Devices',total:34,available:31,notes:'3 charging'},
  {id:'power-banks',name:'Power banks',category:'Devices',total:28,available:24,notes:'Charge before assignment'},
  {id:'safety-vests',name:'Safety vests',category:'Uniforms',total:62,available:18,notes:'44 issued'},
  {id:'gas-cards',name:'Gas cards',category:'Fleet supplies',total:30,available:26,notes:'4 spare cards'},
  {id:'first-aid-kits',name:'First aid kits',category:'Safety',total:29,available:27,notes:'2 need replacement'},
  {id:'charging-cables',name:'Charging cables',category:'Devices',total:41,available:15,notes:'26 assigned'}
];
function inventoryRecordId(prefix='inventory') { return globalThis.crypto?.randomUUID?.()||`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
function normalizeInventoryItems(raw=null) {
  const source=Array.isArray(raw)?raw:DEFAULT_INVENTORY_ITEMS;
  return source.filter(Boolean).map((item,index)=>{
    const total=Math.max(0,Math.trunc(Number(item.total)||0)),available=Math.max(0,Math.min(total,Math.trunc(Number(item.available)||0)));
    return {id:String(item.id||`item-${index+1}`),name:String(item.name||`Inventory item ${index+1}`).trim(),category:String(item.category||'Other').trim()||'Other',total,available,notes:String(item.notes||'').trim()};
  });
}
function normalizeInventoryLog(raw=[]) {
  return (Array.isArray(raw)?raw:[]).filter(Boolean).map(record=>{const date=new Date(record.createdAt||Date.now());return {id:String(record.id||inventoryRecordId('movement')),itemId:String(record.itemId||''),itemName:String(record.itemName||'Inventory item'),type:['assign','return','unavailable','restore'].includes(record.type)?record.type:'unavailable',quantity:Math.max(1,Math.trunc(Number(record.quantity)||1)),assignee:String(record.assignee||'').trim(),notes:String(record.notes||'').trim(),createdAt:Number.isNaN(date.getTime())?new Date().toISOString():date.toISOString()};});
}
function normalizeChargerReports(raw=[]) {
  return (Array.isArray(raw)?raw:[]).filter(Boolean).slice(-200).map((record,index)=>{
    const created=new Date(record.createdAt||Date.now()),clean=(value,max=180)=>String(value||'').trim().slice(0,max);
    return {id:clean(record.id,100)||`charger-${created.getTime()}-${index}`,chargerKey:clean(record.chargerKey,80),company:'LLOL',chargePort:clean(record.chargePort),parkingSpot:clean(record.parkingSpot,40),stationId:clean(record.stationId,80),lights:clean(record.lights,20),color:clean(record.color,40),vanPlugged:clean(record.vanPlugged,20),display:clean(record.display,240),replugged:clean(record.replugged,20),restored:clean(record.restored,20),otherVan:clean(record.otherVan,20),testResult:clean(record.testResult,280),concern:clean(record.concern,500),createdAt:Number.isNaN(created.getTime())?new Date().toISOString():created.toISOString(),createdBy:clean(record.createdBy,100)||'Dispatcher',handoff:clean(record.handoff,40)||'saved'};
  });
}

let state = {
  page: PARKING_ONLY_VIEW ? 'parking' : (localStorage.getItem('relayops_page') || 'dashboard'),
  role: localStorage.getItem('relayops_role') || 'viewer',
  phase: Number(localStorage.getItem('relayops_phase') || 2),
  routes: JSON.parse(localStorage.getItem('relayops_routes') || 'null') || [],
  morningRoutes: JSON.parse(localStorage.getItem('relayops_morning') || 'null') || [],
  dspCode: localStorage.getItem('relayops_dsp') || 'LLOL',
  organizationName: localStorage.getItem('relayops_organization_name') || 'Legacy Logistics',
  stationCode: localStorage.getItem('relayops_station_code') || 'DJT6',
  lastImportExcluded: Number(localStorage.getItem('relayops_excluded') || 0),
  morningFilters: {wave:'all',staging:'all',pad:'all'},
  fleetSort: localStorage.getItem('relayops_fleet_sort') || 'normal',
  fleetFilter: localStorage.getItem('relayops_fleet_filter') || 'all',
  fleetView: localStorage.getItem('relayops_fleet_view') || 'tiny',
  fleetSearch: localStorage.getItem('relayops_fleet_search') || '',
  expandedFleetVin: localStorage.getItem('relayops_expanded_fleet_vin') || '',
  fleetLastRefresh: localStorage.getItem('relayops_fleet_refresh') || 'Not refreshed yet',
  fleetImport: JSON.parse(localStorage.getItem('relayops_fleet_import') || 'null'),
  fleetSourceUploads: JSON.parse(localStorage.getItem('relayops_fleet_source_uploads') || 'null') || {},
  fleetExpectedCount: Number(localStorage.getItem('relayops_fleet_expected_count') || 0),
  fleetLiveEndpoint: localStorage.getItem('relayops_fleet_live_endpoint') || '',
  morningSheetsEndpoint: localStorage.getItem('relayops_morning_sheets_endpoint') || MORNING_SHEETS_DEFAULT_ENDPOINT,
  morningSheetsLastPush: localStorage.getItem('relayops_morning_sheets_last_push') || '',
  morningSheetsLastError: localStorage.getItem('relayops_morning_sheets_last_error') || '',
  morningSheetsLastReceipt: JSON.parse(localStorage.getItem('relayops_morning_sheets_last_receipt') || 'null'),
  morningSheetsLastDryRun: localStorage.getItem('relayops_morning_sheets_last_dry_run') || '',
  // A shared link always opens today's operation unless an explicit ?date=
  // is present. Never let an old device-local date silently select a stale
  // cloud snapshot for another dispatcher.
  morningOperationDate: requestedOperationDate(),
  morningWaveTimeOverrides: JSON.parse(localStorage.getItem('relayops_morning_wave_time_overrides') || 'null') || {},
  lastItineraryRts: JSON.parse(localStorage.getItem('relayops_last_itinerary_rts') || 'null') || {},
  fleetNameOverrides: JSON.parse(localStorage.getItem('relayops_fleet_name_overrides') || 'null') || {},
  fleetIssues: normalizeFleetIssuesStore(JSON.parse(localStorage.getItem('relayops_fleet_issues') || 'null') || {}),
  morningIssueAcknowledgements: JSON.parse(localStorage.getItem('relayops_morning_issue_acknowledgements') || 'null') || {},
  pendingMorningIssue: null,
  pendingRouteCode: '',
  editingFleetVin: '',
  fleetAmazonUrl: localStorage.getItem('relayops_fleet_amazon_url') || AMAZON_FLEET_PORTAL_URL,
  fleetFleetosUrl: localStorage.getItem('relayops_fleet_fleetos_url') || FLEETOS_PORTAL_URL,
  fleetLiveLastPull: localStorage.getItem('relayops_fleet_live_last_pull') || '',
  fleetLiveLastError: localStorage.getItem('relayops_fleet_live_last_error') || '',
  vanParking: loadVanParkingSlots(),
  vanParkingUpdated: localStorage.getItem('relayops_van_parking_updated') || '7/6',
  chargingStationChecked: localStorage.getItem('relayops_charging_station_checked') || '',
  vanParkingPasteText: '',
  vanParkingBatteries: JSON.parse(localStorage.getItem('relayops_van_parking_batteries') || 'null') || {},
  parkingChargerStatus: JSON.parse(localStorage.getItem('relayops_parking_charger_status') || 'null') || {},
  parkingNotes: localStorage.getItem('relayops_parking_notes') || '',
  selectedParkingId: localStorage.getItem('relayops_selected_parking_id') || '',
  parkingMode: localStorage.getItem('relayops_parking_mode') || 'manual',
  fleetChangedVins: {},
  fleetUpdateSummary: null,
  fleetRefreshPreview: null,
  fitMorningRows: localStorage.getItem('relayops_fit_rows') === 'true',
  fitOpeningPicklistRows: localStorage.getItem('relayops_fit_picklist_rows') === 'true',
  importSource: 'computer',
  importPurpose: 'morning',
  rosterPublished: localStorage.getItem('relayops_published') === 'true',
  search: '',
  modal: null,
  importedFile: null,
  editMode: false,
  copyMode: false,
  screenshotPreview: null,
  screenshotKind: '',
  sheetCopyText: '',
  equipmentText: '',
  fleetPasteText: '',
  fleetImportSourceHint: '',
  equipmentImport: JSON.parse(localStorage.getItem('relayops_equipment_import') || 'null'),
  equipmentIssues: normalizeEquipmentIssuesStore(JSON.parse(localStorage.getItem('relayops_equipment_issues') || 'null') || {}),
  pendingEquipmentIssue: null,
  gasAssignmentRoutes: [],
  gasAssignmentVans: [],
  deviceClearConfirm: null,
  deviceCustomRows: loadDeviceCustomRows(),
  driverContacts: JSON.parse(localStorage.getItem('relayops_driver_contacts') || 'null') || [],
  driverContactsLastImport: localStorage.getItem('relayops_driver_contacts_last_import') || '',
  driverNameAliases: JSON.parse(localStorage.getItem('relayops_driver_name_aliases') || 'null') || {},
  driverProfiles: normalizeDriverProfiles(JSON.parse(localStorage.getItem('relayops_driver_profiles') || 'null') || {}),
  pendingDriverFlags: null,
  pendingDriverAlias: null,
  pendingDriverText: null,
  messageQueueTemplate: localStorage.getItem('relayops_message_queue_template') || 'standup',
  messageQueueStatus: JSON.parse(localStorage.getItem('relayops_message_queue_status') || 'null') || {},
  coachingQueue: JSON.parse(localStorage.getItem('relayops_coaching_queue') || 'null') || [],
  coachingTemplate: localStorage.getItem('relayops_coaching_template') || DEFAULT_COACHING_TEMPLATE,
  pendingCoachingId: '',
  scheduleEntries: JSON.parse(localStorage.getItem('relayops_schedule_entries') || 'null') || [],
  scheduleImportName: localStorage.getItem('relayops_schedule_import_name') || '',
  scheduleFilter: localStorage.getItem('relayops_schedule_filter') || 'all',
  openingRosterPaycomTab: localStorage.getItem('relayops_opening_roster_paycom_tab') === 'marked' ? 'marked' : 'scheduled',
  scheduleImportDestination: '',
  rosteringDate: localStorage.getItem('relayops_rostering_date') || defaultOperationDate(),
  rosteringPlans: JSON.parse(localStorage.getItem('relayops_rostering_plans') || 'null') || {},
  rosteringOpenServices: JSON.parse(localStorage.getItem('relayops_rostering_open_services') || 'null') || {'rivian-medium':true},
  rosteringTrainingMatches: JSON.parse(localStorage.getItem('relayops_rostering_training_matches') || 'null') || {},
  rosteringManualTraining: JSON.parse(localStorage.getItem('relayops_rostering_manual_training') || 'null') || {},
  rosteringHelperPool: JSON.parse(localStorage.getItem('relayops_rostering_helper_pool') || 'null') || {},
  rosteringPaycomCategory: localStorage.getItem('relayops_rostering_paycom_category') || 'all',
  rosteringAutoMode: localStorage.getItem('relayops_rostering_auto_mode') === 'abc' ? 'abc' : 'random',
  pendingRosteringServiceDelete: null,
  pendingRosteringSwap: null,
  pendingRosteringTrainingAdd: null,
  expandedDriverKey: '',
  callOffDriverKeys: JSON.parse(localStorage.getItem('relayops_call_off_driver_keys') || 'null') || {},
  scheduleDriverMarks: JSON.parse(localStorage.getItem('relayops_schedule_driver_marks') || 'null') || {},
  scheduleBackupRecords: JSON.parse(localStorage.getItem('relayops_schedule_backup_records') || 'null') || {},
  scheduleStayHome: JSON.parse(localStorage.getItem('relayops_schedule_stay_home') || 'null') || {},
  scheduleStayHomeHistory: JSON.parse(localStorage.getItem('relayops_schedule_stay_home_history') || 'null') || {},
  scheduleReductions: JSON.parse(localStorage.getItem('relayops_schedule_reductions') || 'null') || {},
  callOffReasons: JSON.parse(localStorage.getItem('relayops_call_off_reasons') || 'null') || {},
  openingPicklistTopics: JSON.parse(localStorage.getItem('relayops_opening_picklist_topics') || 'null') || ['', '', '', ''],
  openingPicklistNotes: localStorage.getItem('relayops_opening_picklist_notes') || '',
  openingPicklistCalloffRows: Math.max(1,Number(localStorage.getItem('relayops_opening_picklist_calloff_rows') || 6)),
  openingPicklistTopicRows: Math.max(1,Number(localStorage.getItem('relayops_opening_picklist_topic_rows') || 4)),
  openingPicklistBackupRows: Math.max(1,Number(localStorage.getItem('relayops_opening_picklist_backup_rows') || 21)),
  openingPicklistWaveSlots: Math.max(0,Math.min(5,Number(localStorage.getItem('relayops_opening_picklist_wave_slots') ?? 5))),
  openingPicklistShowAdhoc: localStorage.getItem('relayops_opening_picklist_show_adhoc') !== 'false',
  openingPicklistCalloffDrafts: JSON.parse(localStorage.getItem('relayops_opening_picklist_calloff_drafts') || 'null') || [],
  openingPicklistBackupOverrides: JSON.parse(localStorage.getItem('relayops_opening_picklist_backup_overrides') || 'null') || {},
  openingPicklistLabels: JSON.parse(localStorage.getItem('relayops_opening_picklist_labels') || 'null') || {},
  pendingPicklistWaveDelete: null,
  pendingSheetClear: null,
  sheetHistory: JSON.parse(localStorage.getItem('relayops_sheet_history') || 'null') || {past:[],future:[]},
  scheduleHelpers: JSON.parse(localStorage.getItem('relayops_schedule_helpers') || 'null') || {},
  pendingHelperMatch: null,
  whiparoundInspections: JSON.parse(localStorage.getItem('relayops_whiparound_inspections') || 'null') || [],
  whiparoundRosterSnapshots: JSON.parse(localStorage.getItem('relayops_whiparound_roster_snapshots') || 'null') || {},
  whiparoundNotOnRoute: JSON.parse(localStorage.getItem('relayops_whiparound_not_on_route') || 'null') || {},
  whiparoundComplianceHistory: JSON.parse(localStorage.getItem('relayops_whiparound_compliance_history') || 'null') || {},
  whiparoundImportName: localStorage.getItem('relayops_whiparound_import_name') || '',
  whiparoundSelectedDate: localStorage.getItem('relayops_whiparound_selected_date') || '',
  whiparoundReminderTemplates: JSON.parse(localStorage.getItem('relayops_whiparound_reminder_templates') || 'null') || {
    pre:'Hi {first}, please complete or re-submit your Pre-Trip EDV Inspection (DVIR) in Whiparound before departure. Reply when it is submitted. Thank you — Dispatch.',
    post:'Hi {first}, please complete or re-submit your Post-Trip EDV Inspection (DVIR) in Whiparound before clocking out. Reply when it is submitted. Thank you — Dispatch.'
  },
  inventoryItems: normalizeInventoryItems(JSON.parse(localStorage.getItem('relayops_inventory_items') || 'null')),
  inventoryLog: normalizeInventoryLog(JSON.parse(localStorage.getItem('relayops_inventory_log') || 'null') || []),
  inventoryFilter: localStorage.getItem('relayops_inventory_filter') || 'all',
  inventoryEditingId: '',
  inventoryPendingId: '',
  pendingRosterSwap: null,
  pendingRosterDestination: null,
  pendingVtoRouteSwap: null,
  pendingRouteTrainer: null,
  pendingRouteVtoSwap: null,
  removedDriverKeys: JSON.parse(localStorage.getItem('relayops_removed_driver_keys') || 'null') || [],
  pendingDriverRemoval: null,
  cloudStatus: window.RelayOpsCloud?.configured?'connecting':'setup-required',
  cloudUser: '',
  cloudPresence: [],
  cloudAccessError: '',
  cloudSigninPrompted: false,
  cloudMembers: [],
  pendingMemberEdit: null,
  pendingChargerReport: null,
  slackReportRoomUrl: localStorage.getItem('relayops_slack_report_room_url') || 'https://app.slack.com/client',
  chargerReports: normalizeChargerReports(JSON.parse(localStorage.getItem('relayops_charger_reports') || 'null') || []),
  aChatMessages: JSON.parse(localStorage.getItem('relayops_achat_messages') || 'null') || [],
  rating: Number(localStorage.getItem('relayops_rating') || 0)
};

(state.driverContacts||[]).forEach(contact=>ensureDriverProfile(contact));
state.sheetHistory=state.sheetHistory&&Array.isArray(state.sheetHistory.past)&&Array.isArray(state.sheetHistory.future)?state.sheetHistory:{past:[],future:[]};
if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
if(state.fleetImport?.vehicles?.length) applyFleetVehicles(state.fleetImport.vehicles,{silent:true});

const app = document.getElementById('app');
const fileInput = document.getElementById('file-input');
const sheetEditFields = ['driver','route','staging','padOverride','ev','deviceName','portable','stops','packages','packageReturns','endTime','rtsTime','plannedRts','clockOutTime'];
const morningTemplateHeaders = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','PRE DVIC','PRE-WHIP','POST DVIC','POST-WHIP','','RESCUED','STOP COUNT','PACKAGE COUNT','PACKAGE RETURNS','END TIME','RTS TIME','PLANNED RTS','CLOCK OUT TIME'];
const sheetCopyFields = ['waveLabel','driver','route','staging','pad','ev','deviceName','portable','spacerA','preDvic','preWhip','postDvic','postWhip','spacerB','rescued','stops','packages','packageReturns','endTime','rtsTime','plannedRts','clockOutTime'];
const morningConnectorHeaders = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'];
const morningConnectorFields = ['waveLabel','driver','route','staging','pad','ev','deviceName','portable','spacerA','stops','packages','spacerB','plannedRts'];
const sheetSpacerColumns = new Set([8,13]);
const sheetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let sheetSelection = { anchor: null, focus: null };
let modalWasOpen = false;
let modalReturnFocus = null;

function initials(name='') { return name.split(/\s+/).map(p => p[0]).join('').slice(0,2).toUpperCase(); }
function nameKey(name='') { return String(name||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' '); }
function normalizePreferredVehicleIds(values=[]) {
  const source=Array.isArray(values)?values:String(values||'').split(/[,;\n]+/);
  return [...new Set(source.map(value=>{
    const key=normalizeEquipmentId(value);if(!key)return '';
    if(/^\d+$/.test(key))return String(Number(key));
    return key;
  }).filter(Boolean))];
}
function normalizeDriverProfiles(raw={}) {
  const source=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};
  return Object.fromEntries(Object.entries(source).map(([key,value])=>{
    const profile=value&&typeof value==='object'?value:{};
    const canonical=String(profile.canonical||profile.canonicalName||'').replace(/\s+/g,' ').trim();
    const nicknameRaw=String(profile.nickname||profile.display||'').replace(/[+|&]/g,' ').replace(/\s+/g,' ').trim(),nickname=nameKey(nicknameRaw)===nameKey(canonical)?'':nicknameRaw;
    const names=[...new Set([canonical,nickname,...(Array.isArray(profile.names)?profile.names:[]),...(Array.isArray(profile.aliases)?profile.aliases:[])].map(name=>String(name||'').replace(/\s+/g,' ').trim()).filter(Boolean))];
    const tags=[...new Set((Array.isArray(profile.tags)?profile.tags:[]).filter(tag=>['trainer','helper-driver'].includes(tag)))],flags=[...new Set((Array.isArray(profile.flags)?profile.flags:[]).filter(flag=>DRIVER_NOTE_FLAG_LABELS[flag]))];
    return [key,{canonical:canonical||names[0]||'',nickname,names,tags,flags,preferredEvs:normalizePreferredVehicleIds(profile.preferredEvs||profile.preferredVehicles||[]),transporterId:String(profile.transporterId||'').trim(),updatedAt:String(profile.updatedAt||'')}];
  }).filter(([,profile])=>profile.canonical||profile.names.length));
}
function driverProfileStorageKey(contact={}) {
  const transporter=String(contact?.transporterId||'').trim().toUpperCase();
  return transporter?`id:${transporter}`:`name:${nameKey(contact?.name||contact?.canonical||'unknown')}`;
}
function driverProfileEntry(name='') {
  const query=nameKey(name);if(!query)return null;
  for(const [key,profile] of Object.entries(state?.driverProfiles||{})){
    const names=[profile.canonical,profile.nickname,...(profile.names||[])].map(nameKey);
    if(names.includes(query))return {key,profile};
  }
  return null;
}
function ensureDriverProfile(contact={}) {
  const input=typeof contact==='string'?{name:contact}:contact||{},name=String(input.name||input.canonical||'').replace(/\s+/g,' ').trim();if(!name)return null;
  const transporterId=String(input.transporterId||'').trim().toUpperCase(),byId=transporterId&&Object.entries(state.driverProfiles||{}).find(([,profile])=>String(profile.transporterId||'').trim().toUpperCase()===transporterId),byName=driverProfileEntry(name),existing=byId?{key:byId[0],profile:byId[1]}:byName;
  const targetKey=transporterId?`id:${transporterId}`:(existing?.key||driverProfileStorageKey({name})),prior=existing?.profile||{},legacy=state.driverNameAliases?.[nameKey(prior.canonical||name)],legacyRecord=typeof legacy==='string'?{display:legacy}:legacy||{};
  const names=[...new Set([...(prior.names||[]),prior.canonical,prior.nickname,name,...(Array.isArray(input.knownNames)?input.knownNames:[]),legacyRecord.display,...(Array.isArray(legacyRecord.aliases)?legacyRecord.aliases:[])].map(value=>String(value||'').replace(/\s+/g,' ').trim()).filter(Boolean))];
  const nicknameValue=String(prior.nickname||legacyRecord.display||'').trim(),profile={canonical:name,nickname:nameKey(nicknameValue)===nameKey(name)?'':nicknameValue,names,tags:[...new Set([...(prior.tags||[]),...(Array.isArray(input.tags)?input.tags:[])])].filter(tag=>['trainer','helper-driver'].includes(tag)),flags:[...new Set([...(prior.flags||[]),...(Array.isArray(input.flags)?input.flags:[])])].filter(flag=>DRIVER_NOTE_FLAG_LABELS[flag]),preferredEvs:normalizePreferredVehicleIds(input.preferredEvs?.length?input.preferredEvs:prior.preferredEvs||[]),transporterId:transporterId||prior.transporterId||'',updatedAt:new Date().toISOString()};
  if(existing?.key&&existing.key!==targetKey)delete state.driverProfiles[existing.key];state.driverProfiles[targetKey]=profile;return {key:targetKey,profile};
}
function driverCapabilities(name='') { return driverProfileEntry(name)?.profile?.tags||[]; }
function driverHasCapability(name='',tag='') { return driverCapabilities(name).includes(tag); }
function driverIdentityCollision(values=[],ownerKey='') {
  const wanted=new Set(values.map(nameKey).filter(Boolean));if(!wanted.size)return null;
  for(const [key,profile] of Object.entries(state.driverProfiles||{})){
    if(key===ownerKey)continue;
    const claimed=[profile.canonical,profile.nickname,...(profile.names||[])].map(nameKey).filter(Boolean);
    const duplicate=claimed.find(value=>wanted.has(value));
    if(duplicate)return {key,profile,value:duplicate};
  }
  return null;
}
function toggleDriverCapability(name='',tag='') {
  if(!['trainer','helper-driver'].includes(tag))return;
  const contact=(state.driverContacts||[]).find(row=>nameKey(row.name)===nameKey(name))||{name},entry=ensureDriverProfile(contact);if(!entry)return;
  const tags=new Set(entry.profile.tags||[]);if(tags.has(tag))tags.delete(tag);else tags.add(tag);entry.profile.tags=[...tags];entry.profile.updatedAt=new Date().toISOString();persist();render();toast(`${entry.profile.canonical} ${tags.has(tag)?'marked':'unmarked'} ${tag==='trainer'?'Trainer':'Helper Driver'}`);
}
function driverProfileFlags(name='') { return driverProfileEntry(name)?.profile?.flags||[]; }
function driverPreferredVehicleIds(name='') { return normalizePreferredVehicleIds(driverProfileEntry(name)?.profile?.preferredEvs||[]); }
function driverPreferredVehiclesHtml(name='') {
  const vehicles=driverPreferredVehicleIds(name);if(!vehicles.length)return '';
  return `<div class="driver-preferred-vehicles" title="Automatic assignment uses the first verified-safe available preference"><span>Preferred vans</span><strong>${vehicles.map(value=>/^\d+$/.test(value)?`EV${value}`:value).map(esc).join(' · ')}</strong></div>`;
}
function driverFlagSummary(name='') {
  const names=morningDriverNames(name);return [...new Set((names.length?names:[name]).flatMap(value=>driverProfileFlags(value)).map(flag=>DRIVER_NOTE_FLAG_LABELS[flag]).filter(Boolean))];
}
function driverProfileAttrs(name='') {
  const canonical=canonicalDriverEntryValue(name)||canonicalDriverName(name),flags=driverFlagSummary(canonical);if(!canonical)return '';
  return `data-driver-profile-name="${esc(canonical)}" ${flags.length?`data-driver-flags="${esc(flags.join(' · '))}" aria-label="${esc(canonical)} · ${esc(flags.join(', '))}"`:''}`;
}
function driverFlagBadgeHtml(name='') { const flags=driverFlagSummary(name);return flags.length?`<span class="driver-flag-count" title="${esc(flags.join(' · '))}">⚑ ${flags.length}</span>`:''; }
function openDriverFlags(name='') { const canonical=canonicalDriverName(name);if(!canonical)return;ensureDriverProfile((state.driverContacts||[]).find(row=>nameKey(row.name)===nameKey(canonical))||canonical);state.pendingDriverFlags=canonical;state.modal='driver-flags';render(); }
function saveDriverFlags() {
  const canonical=state.pendingDriverFlags,entry=driverProfileEntry(canonical);if(!entry)return;
  entry.profile.flags=[...document.querySelectorAll('[data-driver-flag-option]:checked')].map(input=>input.value).filter(flag=>DRIVER_NOTE_FLAG_LABELS[flag]);entry.profile.updatedAt=new Date().toISOString();state.pendingDriverFlags=null;state.modal=null;persist();render();toast(`${canonical} driver notes saved`);
}
function driverFlagsCardHtml(name='') {
  const flags=driverFlagSummary(name);return `<button type="button" class="rostering-driver-note-card ${flags.length?'flagged':''}" data-action="open-driver-flags" data-driver-name="${esc(name)}" ${driverProfileAttrs(name)}><span><strong>${esc(driverDisplayName(name))}</strong><small>${flags.length?esc(flags.join(' · ')):'No driver notes'}</small></span><b>${flags.length||'+'}</b></button>`;
}
function closeDriverProfilePopover() { document.getElementById?.('driver-profile-popover')?.remove?.(); }
function showDriverProfilePopover(source) {
  const name=source?.dataset?.driverProfileName||'',flags=driverFlagSummary(name);closeDriverProfilePopover();if(!name||!flags.length||!document.body?.appendChild)return;
  const pop=document.createElement('div');pop.id='driver-profile-popover';pop.className='driver-profile-popover';pop.setAttribute('role','tooltip');pop.innerHTML=`<strong>${esc(driverDisplayValue(name))}</strong><span>${flags.map(flag=>`<b>${esc(flag)}</b>`).join('')}</span>`;document.body.appendChild(pop);
  const rect=source.getBoundingClientRect?.()||{left:0,bottom:0,top:0,width:0},width=Math.min(320,Math.max(210,pop.offsetWidth||230)),left=Math.max(8,Math.min((window.innerWidth||1024)-width-8,rect.left+Math.min(rect.width||0,24))),top=Math.max(8,rect.bottom+8);pop.style.left=`${left}px`;pop.style.top=`${top}px`;
}
function driverAliasRecord(name='') {
  const exact=String(name||'').trim(),key=nameKey(exact),profile=driverProfileEntry(exact)?.profile;if(profile)return {canonical:profile.canonical||exact,display:profile.nickname||profile.canonical||exact,aliases:profile.names||[]};
  const direct=state.driverNameAliases?.[key];
  if(direct)return typeof direct==='string'?{canonical:exact,display:direct}:{canonical:direct.canonical||exact,display:direct.display||exact};
  return Object.values(state.driverNameAliases||{}).map(value=>typeof value==='string'?{canonical:'',display:value}:value).find(value=>nameKey(value?.display)===key||nameKey(value?.canonical)===key||(value?.aliases||[]).some(alias=>nameKey(alias)===key))||null;
}
function canonicalDriverName(name='') {
  const clean=String(name||'').trim(),alias=driverAliasRecord(clean),contact=contactForMorningDriverRaw(alias?.canonical||clean);
  return contact?.name||alias?.canonical||clean;
}
function driverIdentityKey(name='') { return nameKey(canonicalDriverName(name)); }
function driverDisplayName(name='') {
  const canonical=canonicalDriverName(name),profile=driverProfileEntry(canonical)?.profile,alias=state.driverNameAliases?.[nameKey(canonical)];
  return String(profile?.nickname||(typeof alias==='string'?alias:alias?.display)||canonical||name).trim();
}
function driverDisplayValue(value='') { return morningDriverNames(value).map(driverDisplayName).join(' + '); }
function canonicalDriverValue(value='') { return morningDriverNames(value).map(canonicalDriverName).join(' + '); }
function canonicalDriverEntryValue(value='') { return morningDriverNames(value).filter(name=>String(name).trim()!=='?').map(canonicalDriverName).join(' + '); }
function compactDriverName(name='') {
  const display=driverDisplayName(name),canonical=canonicalDriverName(name);
  if(nameKey(display)!==nameKey(canonical))return display;
  return suggestedDriverAlias(canonical)||display;
}
function routeMissingPrimary(route={}) {
  if(!route||route._blank||!String(route.route||'').trim()||String(route.route||'').startsWith('__blank_')||/helper/i.test(String(route.service||'')))return false;
  return route.assignmentStatus==='unassigned'||route.missingDriver===true||!String(route.driver||'').trim();
}
function routeMissingHelper(route={}) {
  if(!route||route._blank)return false;
  const helperService=/helper/i.test(`${route.service||''} ${route.wave||''}`);
  return route.missingHelper===true||(helperService&&String(route.route||'').trim()&&!String(route.driver||'').trim());
}
function routeDriverDisplayValue(route={}) {
  if(!route||route._blank)return '';
  const names=morningDriverNames(route.driver),helperService=/helper/i.test(`${route.service||''} ${route.wave||''}`);
  let displayed=names.map(driverDisplayName);
  if(helperService&&displayed.length===1&&displayed[0].length>18)displayed=[compactDriverName(names[0])];
  if(displayed.join(' + ').length>30)displayed=displayed.map((name,index)=>index===0?name:compactDriverName(names[index]));
  if(routeMissingPrimary(route))displayed.unshift('?');
  if(routeMissingHelper(route)){
    if(helperService&&!displayed.length)displayed=['?'];
    else if(!helperService)displayed.push('?');
  }
  return displayed.join(' + ')||((routeMissingPrimary(route)||routeMissingHelper(route))?'?':'');
}
function suggestedDriverAlias(name='') {
  const parts=String(name||'').trim().split(/\s+/).filter(Boolean);if(parts.length<2)return parts[0]||'';
  const suffix=/^(jr|sr|ii|iii|iv)$/i.test(parts.at(-1))?` ${parts.pop()}`:'';
  return `${parts[0]} ${parts.at(-1)?.[0]||''}.${suffix}`.trim();
}
function phoneDisplay(value='') {
  const raw=String(value||'').trim();
  const digits=raw.replace(/\D/g,'');
  if(digits.length===11&&digits.startsWith('1')) return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  if(digits.length===10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  return raw;
}
function driverContactsFromRows(rows=[]) {
  const header=findImportHeader(rows,[['name','nameandid','preferredname','fullname','driver','drivername','employeename','associate','associatename','deliveryassociate','da','first','firstname'],['phone','phonenumber','personalphone','personalphonenumber','primaryphone','mobile','mobilephone','cell','cellphone','telephone']]);
  if(header<0)return [];
  const keys=rows[header].map(headerKey);
  const index=(...names)=>{const wanted=names.map(headerKey);return keys.findIndex(k=>wanted.includes(k));};
  const nameIx=index('name','name and id','nameandid','preferred name','preferredname','full name','fullName','driver','drivername','employee name','employeename','associate','associate name','associatename','delivery associate','deliveryassociate','da');
  const firstIx=index('first','firstname','first name');
  const lastIx=index('last','lastname','last name');
  const phoneIx=index('personal phone','personalphone','personal phone number','personalphonenumber','phone','phonenumber','phone number','primary phone','primaryphone','mobile','mobile phone','mobilephone','cell','cellphone','cell phone','telephone');
  const roleIx=index('role','position','jobtitle','job title'),transporterIx=index('transporterid','transporter id','associate id','associateid'),statusIx=index('status','associate status','associatestatus');
  const contacts=[], seen=new Set();
  rows.slice(header+1).forEach(row=>{
    const combined=[row[firstIx],row[lastIx]].filter(Boolean).join(' ').trim();
    const name=String((nameIx>=0&&row[nameIx])||combined||'').trim();
    const phone=phoneDisplay(phoneIx>=0?row[phoneIx]:'');
    const key=nameKey(name);
    if(!key||seen.has(key))return;
    seen.add(key);
    contacts.push({name:name.replace(/\s+/g,' ').trim(),phone,role:roleIx>=0?String(row[roleIx]||'').trim():'',transporterId:transporterIx>=0?String(row[transporterIx]||'').trim():'',status:statusIx>=0?String(row[statusIx]||'').trim():'',key});
  });
  return contacts;
}
function mergeDriverContacts(incoming=[]) {
  const contacts=[...(state.driverContacts||[])];
  incoming.forEach(contact=>{
    const transporter=String(contact.transporterId||'').trim().toUpperCase(),incomingKey=contact.key||nameKey(contact.name),profileMatch=driverProfileEntry(contact.name);
    let index=contacts.findIndex(existing=>transporter&&String(existing.transporterId||'').trim().toUpperCase()===transporter);
    if(index<0)index=contacts.findIndex(existing=>{const existingKey=existing.key||nameKey(existing.name);return existingKey===incomingKey||profileMatch?.profile?.names?.some(alias=>nameKey(alias)===existingKey);});
    const previous=index>=0?contacts[index]:null,knownIdentity=profileMatch?.profile&&[profileMatch.profile.nickname,...(profileMatch.profile.names||[])].some(alias=>nameKey(alias)===nameKey(contact.name)),canonicalName=knownIdentity?(profileMatch.profile.canonical||previous?.name||contact.name):contact.name,merged={...(previous||{}),...contact,name:canonicalName,key:nameKey(canonicalName)};
    if(index>=0)contacts[index]=merged;else contacts.push(merged);
    ensureDriverProfile({...merged,knownNames:[previous?.name,contact.name].filter(Boolean)});
  });
  contacts.forEach(contact=>ensureDriverProfile(contact));
  const deduped=new Map();contacts.forEach(contact=>{const identity=String(contact.transporterId||'').trim().toUpperCase()||contact.key||nameKey(contact.name);deduped.set(identity,contact);});
  state.driverContacts=[...deduped.values()].sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));
  return state.driverContacts.length;
}
function saveManualDriver() {
  const name=String(document.getElementById('manual-driver-name')?.value||'').replace(/\s+/g,' ').trim();
  const phone=phoneDisplay(document.getElementById('manual-driver-phone')?.value||'');
  const role=String(document.getElementById('manual-driver-role')?.value||'Delivery Associate').trim();
  const transporterId=String(document.getElementById('manual-driver-id')?.value||'').trim().toUpperCase();
  if(!name)return toast('Enter the associate’s full name','error');
  if(phone.replace(/\D/g,'').length<10)return toast('Enter a complete phone number','error');
  mergeDriverContacts([{name,phone,role,transporterId,status:'ACTIVE',key:nameKey(name)}]);
  state.driverContactsLastImport=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date());
  state.modal=null;state.page='team';persist();render();toast(`${name} added to Drivers & Team`);return true;
}
function driverContactForName(name='') {
  const raw=firstDriverName(name),profile=driverProfileEntry(raw)?.profile,key=nameKey(profile?.canonical||raw),known=new Set([key,...(profile?.names||[]).map(nameKey)]);
  return (state.driverContacts||[]).find(contact=>known.has(contact.key||nameKey(contact.name))||Boolean(profile?.transporterId&&String(contact.transporterId||'').trim().toUpperCase()===String(profile.transporterId).trim().toUpperCase()));
}
function teamDriverRows() {
  const removed=new Set(state.removedDriverKeys||[]);
  return (state.driverContacts||[]).map((contact,i)=>({
    name:contact.name,
    role:contact.role||'Delivery Associate',
    status:String(contact.status||'').trim(),
    quality:contact.quality||'—',
    coaching:contact.coaching||'—',
    id:contact.transporterId||`IMP-${String(i+1).padStart(3,'0')}`,
    phone:contact.phone||'',
    email:contact.email||'',
    qualifications:contact.qualifications||'',
    imported:true
  })).filter(driver=>driver.name&&!removed.has(nameKey(driver.name))).sort((a,b)=>a.name.localeCompare(b.name,undefined,{sensitivity:'base'}));
}
function requestDriverRemoval(key='') {
  const normalized=nameKey(key),driver=teamDriverRows().find(item=>nameKey(item.name)===normalized);
  if(!driver)return toast('Delivery Associate could not be found','error');
  state.pendingDriverRemoval={key:normalized,name:driver.name};state.modal='remove-driver';render();
}
function confirmDriverRemoval() {
  const pending=state.pendingDriverRemoval;if(!pending)return;
  state.driverContacts=(state.driverContacts||[]).filter(contact=>(contact.key||nameKey(contact.name))!==pending.key);
  state.removedDriverKeys=[...new Set([...(state.removedDriverKeys||[]),pending.key])];
  const name=pending.name;state.pendingDriverRemoval=null;state.modal=null;persist();render();toast(`${name} removed from Drivers & Team`);
}
function fmtDate() { return new Intl.DateTimeFormat('en-US',{weekday:'long',month:'short',day:'numeric'}).format(new Date()); }
function statusClass(status) {
  const s = String(status).toLowerCase();
  if (s.includes('risk') || s.includes('service') || s.includes('overdue')) return 'risk';
  if (s.includes('watch') || s.includes('fair') || s.includes('pending')) return 'warn';
  if (s.includes('pace') || s.includes('great') || s.includes('assigned')) return 'blue';
  if (s.includes('unassigned') || s === '—') return 'neutral';
  return '';
}
function routeFiltered() {
  const q = state.search.trim().toLowerCase();
  if (!q) return state.routes;
  return state.routes.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
}

function globalSearchResults(query=state.search) {
  const q=String(query||'').trim().toLowerCase();
  if(q.length<2)return [];
  const results=[],seen=new Set(),add=(type,title,detail,page,searchValue='')=>{
    const key=`${type}|${String(title).toLowerCase()}|${String(detail).toLowerCase()}`;
    if(seen.has(key)||results.length>=9)return;
    seen.add(key);results.push({type,title,detail,page,searchValue:searchValue||title});
  };
  teamDriverRows().forEach(driver=>{
    const haystack=`${driver.name} ${driver.phone||''} ${driver.id||''} ${driver.role||''}`.toLowerCase();
    if(haystack.includes(q))add('Driver',driverDisplayName(driver.name),[driver.phone,driver.role].filter(Boolean).join(' · '),'team',driver.name);
  });
  (state.morningRoutes||[]).forEach(route=>{
    const haystack=`${route.route||''} ${route.driver||''} ${route.wave||''} ${route.staging||''} ${route.ev||''}`.toLowerCase();
    if(haystack.includes(q))add('Route',route.route||'Unnumbered route',[route.driver,route.wave,route.staging].filter(Boolean).join(' · '),'morning',route.route||route.driver);
  });
  rivianFleet.forEach(vehicle=>{
    const display=fleetDisplayName(vehicle),haystack=`${display} ${vehicle.name||''} ${vehicle.vin||''} ${vehicle.plate||''} ${vehicle.operational||''}`.toLowerCase();
    if(haystack.includes(q))add('Vehicle',display,[vehicle.plate,vehicle.operational].filter(Boolean).join(' · '),'fleet',display||vehicle.vin);
  });
  return results;
}
function globalSearchResultsPanelHtml() {
  const results=globalSearchResults(),query=String(state.search||'').trim();
  if(query.length<2)return '';
  return `<div class="global-search-results" role="listbox" aria-label="Search results">${results.length?results.map(result=>`<button type="button" role="option" data-action="open-global-search-result" data-search-page="${esc(result.page)}" data-search-value="${esc(result.searchValue)}"><span>${esc(result.type)}</span><strong>${esc(result.title)}</strong><small>${esc(result.detail||'Open in RelayOps')}</small></button>`).join(''):`<div class="global-search-empty"><strong>No match found</strong><span>Try a driver name, CX route, EV number, VIN, or plate.</span></div>`}<button type="button" class="global-search-clear" data-action="clear-global-search">Clear search</button></div>`;
}
function globalSearchHtml() {
  return `<div class="global-search-shell"><label class="search">${ICONS.search}<input id="global-search" autocomplete="off" aria-label="Search drivers, routes, and vehicles" placeholder="Search driver, route, van…" value="${esc(state.search)}" /></label><div id="global-search-results-anchor">${globalSearchResultsPanelHtml()}</div></div>`;
}

function sidebar() {
  if(PARKING_ONLY_VIEW)return `<aside class="sidebar fleet-parking-sidebar" id="sidebar">
    <div class="brand"><div class="brand-mark"></div><div class="brand-copy"><div class="brand-name">RelayOps</div><div class="brand-sub">Fleet view</div></div></div>
    <div class="station-pill"><div class="station-icon">${esc(state.stationCode.slice(0,3).toUpperCase())}</div><div class="station-copy"><strong>${esc(state.organizationName)}</strong><span>${esc(state.stationCode.toUpperCase())} · Van Parking</span></div>${ICONS.chevron}</div>
    <nav><div class="side-section"><div class="side-label">Shared With Fleet</div><button class="nav-item active" aria-label="Van Parking">${ICONS.parking}<span>Van Parking</span></button></div></nav>
    <div class="side-bottom"><div class="user-card"><div class="avatar">FT</div><div class="user-copy"><strong>Fleet team view</strong><span>Parking map only</span></div><div class="role-tag">VIEW</div></div></div>
  </aside>`;
  return `<aside class="sidebar" id="sidebar">
    <div class="brand"><div class="brand-mark"></div><div class="brand-copy"><div class="brand-name">RelayOps</div><div class="brand-sub">Dispatch command</div></div></div>
    <div class="station-pill"><div class="station-icon">${esc(state.stationCode.slice(0,3).toUpperCase())}</div><div class="station-copy"><strong>${esc(state.organizationName)}</strong><span>${esc(state.stationCode.toUpperCase())} · Los Angeles</span></div>${ICONS.chevron}</div>
    <nav>${NAV.map(group=>({...group,items:group.items.filter(item=>!item[4]||hasOwnerAdminAccess())})).filter(group=>group.items.length).map(group => `<div class="side-section"><div class="side-label">${group.section}</div>${group.items.map(([id,label,icon,count]) => `<button class="nav-item ${state.page===id?'active':''}" data-page="${id}" aria-label="${label}">${ICONS[icon]}<span>${label}</span>${count?`<b class="nav-count">${count}</b>`:''}</button>`).join('')}</div>`).join('')}</nav>
    <div class="side-bottom"><div class="user-card"><div class="avatar">AG</div><div class="user-copy"><strong>Alex Gonzalez</strong><span>${hasOwnerAdminAccess()?'Owner · Full access':'Opening dispatcher'}</span></div><div class="role-tag">${hasOwnerAdminAccess()?'ADMIN':'OPS'}</div></div></div>
  </aside>`;
}

const pageInfo = {
  dashboard:['Today’s command','A clear view from load-out through RTS'], morning:['Morning operations sheet','DSP-only routes, grouped by earliest wave, staging, and pad'], roster:['Opening Picklist','Resolve exceptions, assign equipment, then publish'],
  rostering:['Rostering','Build confirmed services, catch unfilled shifts, and rotate hours fairly'],
  live:['Device and Portable Sheet','Type today’s assignments, then match them to every EV on the Morning Sheet'], team:['Drivers & team','Availability, compliance, recognition, and history'],
  fleet:['Fleet Health','Electric and gas vehicle status, battery, and operational health'], parking:['Van Parking','Interactive parking map for closing and morning dispatch'], performance:['Performance','Scorecard trends and driver-level focus areas'],
  coaching:['Coaching','Turn scorecard signals into consistent follow-through'], checklists:['Checklists','Repeatable opening, load-out, and closeout routines'],
  inbox:['Whiparound','Pre-trip and post-trip DVIR completion checker'], inventory:['Inventory','Devices, uniforms, supplies, and assignments'],
  reports:['Reports & export','Google Sheets-ready operational data'], achat:['A-Chat','A small dispatcher helper for quick operational answers'], admin:['Admin access','People, permissions, connections, and audit history']
};

function operationalAlertGroups() {
  const preview=rows=>rows.slice(0,3).map(vehicle=>fleetDisplayName(vehicle)||vehicle.name||vehicle.vin).join(', ')+(rows.length>3?` +${rows.length-3}`:'');
  const grounded=rivianFleet.filter(vehicle=>String(vehicle.operational||'').toLowerCase()==='grounded');
  const inactive=rivianFleet.filter(vehicle=>String(vehicle.active||'').toLowerCase()==='inactive');
  const low=rivianFleet.filter(isFleetLowBattery);
  const issueVans=Object.values(state.fleetIssues||{}).filter(group=>group?.active?.length),issueRows=issueVans.flatMap(group=>group.active);
  const rts=(state.morningRoutes||[]).filter(route=>route.dsp===state.dspCode&&route.plannedRtsIssue);
  let whip={missingPre:[],missingPost:[]};try{whip=whiparoundStatus();}catch(error){console.warn('Alert center could not build Whiparound summary',error);}
  return [
    {id:'grounded',label:'Grounded vehicles',count:grounded.length,detail:preview(grounded)||'No grounded vans',tone:'danger',page:'fleet',filter:'grounded'},
    {id:'inactive',label:'Inactive vehicles',count:inactive.length,detail:preview(inactive)||'No inactive vans',tone:'danger',page:'fleet',filter:'inactive'},
    {id:'low',label:'Low-battery EVs',count:low.length,detail:preview(low)||`No EVs at or below ${LOW_BATTERY_SECTION_THRESHOLD}%`,tone:'warn',page:'fleet',filter:'low'},
    {id:'issues',label:'Vans with reported issues',count:issueVans.length,detail:issueRows.length?`${issueVans.length} van${issueVans.length===1?'':'s'} · ${issueRows.length} active report${issueRows.length===1?'':'s'}`:'No active reports',tone:'warn',page:'fleet',filter:'issues'},
    {id:'rts',label:'Morning RTS flags',count:rts.length,detail:rts.length?rts.slice(0,3).map(route=>route.route).join(', ')+(rts.length>3?` +${rts.length-3}`:''):'No irregular Planned RTS times',tone:'warn',page:'morning'},
    {id:'whip-pre',label:'Missing Pre-Trip DVIR',count:whip.missingPre.length,detail:whip.missingPre.length?whip.missingPre.slice(0,3).map(row=>row.name).join(', ')+(whip.missingPre.length>3?` +${whip.missingPre.length-3}`:''):'Pre-Trip checks complete',tone:'info',page:'inbox'},
    {id:'whip-post',label:'Missing Post-Trip DVIR',count:whip.missingPost.length,detail:whip.missingPost.length?whip.missingPost.slice(0,3).map(row=>row.name).join(', ')+(whip.missingPost.length>3?` +${whip.missingPost.length-3}`:''):'Post-Trip checks complete',tone:'info',page:'inbox'}
  ];
}
function operationalAlertCount() { return operationalAlertGroups().reduce((sum,group)=>sum+group.count,0); }
function notificationButtonHtml() {
  const count=operationalAlertCount(),label=count?`${count} operational alert${count===1?'':'s'}`:'No operational alerts';
  return `<button class="icon-button notification-button" data-action="open-alert-center" aria-label="Notifications · ${esc(label)}" title="${esc(label)}">${ICONS.bell}${count?`<b class="notification-count">${count>99?'99+':count}</b>`:''}</button>`;
}

function topbarLegacy() {
  const [title,sub] = pageInfo[state.page] || pageInfo.dashboard;
  const fleetClean=state.page==='fleet';
  if(PARKING_ONLY_VIEW)return `<header class="topbar fleet-parking-topbar">
    <div style="display:flex;align-items:center;gap:10px"><button class="icon-button mobile-menu" data-action="menu" aria-label="Open menu" aria-controls="sidebar" aria-expanded="false">${ICONS.menu}</button><div class="page-heading"><h1>Van Parking</h1><p>Read-only parking map, battery levels, and charger status for the fleet team</p></div></div>
    <div class="top-actions"><button class="btn cloud-status-button ${esc(state.cloudStatus)}" data-action="cloud-account"><i></i><span class="hide-mobile">${state.cloudStatus==='synced'?`Shared & synced${state.cloudPresence.length?` · ${state.cloudPresence.length} online`:''}`:state.cloudStatus==='connecting'?'Connecting…':state.cloudStatus==='offline'?'Offline · saved here':state.cloudStatus==='signed-out'?'Dispatcher sign in':'Cloud setup'}</span></button><button class="btn ghost share-link-btn" data-action="copy-fleet-parking-link">${ICONS.link}<span class="hide-mobile">Copy fleet link</span></button></div>
  </header>`;
  return `<header class="topbar">
    <div style="display:flex;align-items:center;gap:10px"><button class="icon-button mobile-menu" data-action="menu" aria-label="Open menu" aria-controls="sidebar" aria-expanded="false">${ICONS.menu}</button><div class="page-heading"><h1>${title}</h1><p>${sub}</p></div></div>
    <div class="top-actions">${fleetClean?'':globalSearchHtml()}${state.page==='morning'?'<button class="btn info-top-button" data-action="open-morning-diagnostics" title="Setup & diagnostics"><span>ℹ</span><span class="hide-mobile">Setup & diagnostics</span></button>':''}<button class="btn cloud-status-button ${esc(state.cloudStatus)}" data-action="cloud-account"><i></i><span class="hide-mobile">${state.cloudStatus==='synced'?`Shared & synced${state.cloudPresence.length?` · ${state.cloudPresence.length} online`:''}`:state.cloudStatus==='connecting'?'Connecting…':state.cloudStatus==='offline'?'Offline · saved here':state.cloudStatus==='signed-out'?'Dispatcher sign in':'Cloud setup'}</span></button><button class="btn ghost share-link-btn" data-action="share-dispatcher-link">${ICONS.link}<span class="hide-mobile">Share link</span></button>${notificationButtonHtml()}${state.page==='morning'?`<button class="icon-button connector-settings-icon" data-action="morning-sheets-connector" aria-label="Google Sheets connector settings" title="Google Sheets connector settings">${ICONS.settings||'⚙'}</button>`:''}${fleetClean?'':`<button class="btn primary" data-action="import">${ICONS.upload}<span class="hide-mobile">Upload Excel / CSV</span></button>`}</div>
  </header>`;
}

function topbar() {
  return topbarLegacy().replace(/<button class="btn primary" data-action="import">[\s\S]*?<span class="hide-mobile">Upload Excel \/ CSV<\/span><\/button>/,'');
}

function contextBar(extra='') {
  const synced=state.cloudStatus==='synced',label=synced?`Shared workspace${state.cloudUser?` · ${state.cloudUser}`:''}`:state.cloudStatus==='access-denied'?'Access required · ask the owner to invite this email':state.cloudStatus==='workspace-empty'?'Shared day is waiting for an owner to start it':state.cloudStatus==='offline'?'Offline · edits saved and will sync automatically':state.cloudStatus==='signed-out'?'Sign in required · local changes are not shared':state.cloudStatus==='connecting'?'Connecting shared workspace…':'Local cache · cloud setup required';
  return `<div class="context-bar"><div class="date-nav"><div class="date-chip">${ICONS.calendar}${fmtDate()}</div>${extra}</div><div class="sync-state ${synced?'cloud-live':''}"><i class="live-dot"></i>${esc(label)}</div></div>`;
}

function kpiCard(label,value,meta,icon,tint='#eef2ed') { return `<article class="card kpi" style="--tint:${tint}"><div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon">${ICONS[icon]}</span></div><div class="kpi-value">${value}</div><div class="kpi-meta">${meta}</div></article>`; }

function phaseStrip() {
  const phases = [['Roster','Resolve exceptions'],['Load-out','Stage & launch'],['On road','Monitor & rescue'],['Closeout','RTS & verify']];
  return `<div class="phase-strip">${phases.map((p,i)=>`<button class="phase ${state.phase===i?'active':''}" data-phase="${i}"><span class="phase-number">${i<state.phase?'✓':i+1}</span><span><strong>${p[0]}</strong><span>${p[1]}</span></span></button>`).join('')}</div>`;
}

function dashboard() {
  const atRisk = state.routes.filter(r=>r.status==='At risk').length,driversOnDuty=new Set(state.routes.map(route=>firstDriverName(route.driver)).filter(name=>name&&!/^unassigned/i.test(name))).size,fleetTotal=rivianFleet.length,fleetReady=rivianFleet.filter(vehicle=>vehicle.active!=='Inactive'&&vehicle.operational!=='Grounded').length;
  const attention=[...state.routes.filter(route=>route.status==='At risk').slice(0,2).map(route=>['red',`${route.route} needs route support`,[route.driver,route.rescue].filter(Boolean).join(' · '),'Now']),...rivianFleet.filter(vehicle=>vehicle.operational==='Grounded'||fleetIssueForVehicle(vehicle)).slice(0,2).map(vehicle=>['',`${fleetDisplayName(vehicle)} needs fleet review`,vehicle.operational==='Grounded'?'Grounded · do not assign':'Reported vehicle issue','Fleet'])].slice(0,3);
  return `${contextBar(`<button class="btn small ghost" data-action="phase-next">Advance shift phase ${ICONS.chevron}</button>`)}${phaseStrip()}
  <section class="grid kpi-grid">
    ${kpiCard('Routes launched',`${state.routes.length}<span style="font-size:13px;color:#7b877f"> / ${state.routes.length}</span>`,'<span class="trend-up">100% covered</span> · 2 rescues','roster','#e9f7df')}
    ${kpiCard('Drivers on duty',driversOnDuty,`${state.routes.length} imported route${state.routes.length===1?'':'s'}`,'users','#e5efff')}
    ${kpiCard('Fleet ready',`${fleetReady}<span style="font-size:13px;color:#7b877f"> / ${fleetTotal}</span>`,fleetTotal===fleetReady?'All imported vehicles ready':`<span class="trend-warn">${fleetTotal-fleetReady} need attention</span>`,'van','#fff2cf')}
    ${kpiCard('Routes at risk',atRisk,'2 rescue plans documented','live','#ffe7e2')}
  </section>
  <section class="grid dashboard-grid">
    <div class="grid">
      <article class="card"><div class="card-head"><div class="card-title"><h2>Opening readiness</h2><p>Every critical handoff before the first wave</p></div><button class="btn small" data-page="parking">Open van parking</button></div><div class="readiness"><div class="readiness-top"><div class="readiness-ring"><div><strong>93%</strong><span>READY</span></div></div><div class="readiness-steps"><div class="step"><div class="step-status">✓</div><strong>Roster matched</strong><span>${state.routes.length}/${state.routes.length} routes staffed</span></div><div class="step"><div class="step-status">✓</div><strong>Equipment assigned</strong><span>Vans + devices confirmed</span></div><div class="step warn"><div class="step-status">!</div><strong>Fleet exceptions</strong><span>2 notes need review</span></div></div></div></div></article>
      ${routesTable(state.routes.slice(0,5),'Route health','Live operational position from Cortex inputs')}
    </div>
    <div class="grid">
      <article class="card"><div class="card-head"><div class="card-title"><h2>Needs your attention</h2><p>Ordered by operational impact</p></div><span class="status ${attention.length?'risk':''}">${attention.length} open</span></div><div class="alert-stack">${attention.length?attention.map(row=>alertRow(...row)).join(''):'<div class="empty-state"><h3>No imported exceptions</h3><p>Route and Fleet Health alerts will appear here after today’s files are loaded.</p></div>'}</div></article>
      <article class="card"><div class="card-head"><div class="card-title"><h2>Scorecard pulse</h2><p>Week 26 · team aggregate</p></div><span class="status">Fantastic</span></div><div class="page-summary"><div class="summary-line"><span>Delivery quality</span><strong>99.4%</strong></div><div class="summary-line"><span>Safety compliance</span><strong>98.1%</strong></div><div class="summary-line"><span>Customer delivery feedback</span><strong>95.7%</strong></div><div class="divider"></div><div class="callout"><strong>Three coaching opportunities</strong><p>Focus this week: DNR, following distance, and contact compliance.</p><button class="btn small lime" data-page="coaching">Review coaching</button></div></div></article>
    </div>
  </section>`;
}

function alertRow(color,title,sub,time) { return `<div class="alert-row"><div class="alert-icon ${color}">${ICONS.alert}</div><div class="alert-copy"><strong>${title}</strong><span>${sub}</span></div><span class="alert-time">${time}</span></div>`; }

function routesTable(rows,title='Today’s route board',sub='Driver, route, equipment, and live position') {
  return `<article class="card table-card"><div class="card-head"><div class="card-title"><h2>${title}</h2><p>${sub}</p></div><div class="head-actions"><button class="btn small" data-action="copy">${ICONS.copy} Copy</button><button class="btn small" data-action="export-menu">${ICONS.download} Export</button></div></div><div class="table-wrap"><table><thead><tr><th>Route / Driver</th><th>Wave</th><th>Van + device</th><th>Stops</th><th>Progress</th><th>Route health</th><th>Rescue plan</th><th></th></tr></thead><tbody>${rows.map(r=>`<tr><td><div class="driver-cell"><div class="driver-avatar ${r.status==='At risk'?'gold':''}">${initials(r.driver)}</div><div class="driver-copy"><strong>${esc(r.driver)}</strong><span class="route-code">${esc(r.route)} · ${esc(r.id)}</span></div></div></td><td>${esc(r.wave)}<br><span style="color:#849087;font-size:8px">Stage ${esc(r.staging)}</span></td><td>${esc(r.van)}<br><span style="color:#849087;font-size:8px">${esc(r.device)}</span></td><td><strong>${r.stops}</strong><br><span style="color:#849087;font-size:8px">${r.packages} pkg</span></td><td><div class="progress-cell"><div class="progress-track"><div class="progress-fill ${r.status==='At risk'?'risk':r.status==='Watch'?'warn':''}" style="width:${r.progress}%"></div></div><strong>${r.progress}%</strong></div><span class="${r.delta<0?'metric-down':'metric-up'}">${r.delta>0?'+':''}${r.delta} stops</span></td><td><span class="status ${statusClass(r.status)}">${esc(r.status)}</span></td><td>${esc(r.rescue)}</td><td><button class="mini-icon-btn" data-action="route" data-route="${esc(r.route)}" aria-label="Route actions">${ICONS.more}</button></td></tr>`).join('')}</tbody></table></div></article>`;
}

function openingPicklistSections() {
  ensureMorningRouteUids();
  const eligible=(state.morningRoutes||[]).filter(row=>row.dsp===state.dspCode&&!isExplicitHelperMorningRoute(row)&&!String(row.route||'').startsWith('__blank_'));
  const waveNames=[...new Set(eligible.filter(row=>!isExplicitAdhocMorningRoute(row)).map(row=>row.wave).filter(Boolean))].sort((a,b)=>waveMinutes(a)-waveMinutes(b));
  const waveSlots=Math.max(0,Math.min(5,Number(state.openingPicklistWaveSlots??5)));
  const waves=Array.from({length:waveSlots},(_,index)=>{const key=`wave-${index+1}`,wave=waveNames[index]||'',rows=wave?eligible.filter(row=>row.wave===wave):[],capacity=state.fitOpeningPicklistRows?Math.max(1,rows.length):13;return {key,label:state.openingPicklistLabels?.[key]||`WAVE ${index+1}`,wave,rows,capacity,hasTime:true,pad:rows[0]?.padOverride||rows[0]?.pad||padForWave(wave)};});
  const used=new Set(waves.flatMap(section=>section.rows.map(row=>row.route)));
  const adhoc=eligible.filter(row=>!used.has(row.route)&&isExplicitAdhocMorningRoute(row));
  // Adhocs intentionally keep their full worksheet block. The Picklist
  // compact control applies only to Wave 1–5 so late additions still have a
  // visible place to be entered.
  if(state.openingPicklistShowAdhoc)waves.push({key:'adhoc',label:state.openingPicklistLabels?.adhoc||"ADHOC'S",wave:'Ad hoc',rows:adhoc,capacity:15,hasTime:false,pad:''});
  return waves;
}
function openingPicklistTime(section={}) { return morningWaveTimeText({...section,label:coreMorningWaveLabel(section.key,section.label)}); }
function routeEquipmentValue(row={}) { return [String(row.ev||'').trim(),String(row.helperBag||'').trim()].filter(Boolean).join(' / '); }
function vehicleIssuePopoverHtml(route='',equipment='',issue=null) {
  const reported=issue?.type==='reported'?issue.reported:reportedFleetIssueForEquipmentId(equipment);if(!reported?.active?.length)return '';
  const acknowledged=morningIssueAcknowledged(route,reported);
  return `<div class="vehicle-issue-popover" role="dialog" aria-label="Reported issues for ${esc(equipment)}"><strong>⚠ ${esc(equipment)} · ${reported.active.length} issue${reported.active.length===1?'':'s'}</strong><div class="vehicle-issue-popover-list">${reported.active.map(record=>`<div><span>${esc(record.text)}</span><small>${esc(record.group||'Other')} · ${esc(record.severity||'watch')}</small><button type="button" data-action="mark-fleet-issue-fixed" data-issue-key="${esc(reported.key||'')}" data-issue-id="${esc(record.id||'')}">Mark as repaired</button></div>`).join('')}</div><button type="button" class="acknowledge" data-action="acknowledge-van-issue-inline" data-route="${esc(route)}" data-equipment="${esc(equipment)}" ${acknowledged?'disabled':''}>${acknowledged?'✓ Acknowledged':'Acknowledge'}</button></div>`;
}
function duplicateMorningEquipmentRoutes(equipment='') {
  const key=normalizeEquipmentId(equipment);if(!key)return [];
  return (state.morningRoutes||[]).filter(row=>row.dsp===state.dspCode&&String(row.route||'').trim()&&!String(row.route||'').startsWith('__blank_')&&normalizeEquipmentId(row.ev)===key);
}
function duplicateVehiclePopoverHtml(equipment='') {
  const routes=duplicateMorningEquipmentRoutes(equipment);if(routes.length<2)return '';
  return `<div class="duplicate-vehicle-popover" role="alert"><strong>EV assigned twice</strong>${routes.map(row=>`<span>${esc(row.route)} · ${esc(routeDriverDisplayValue(row)||'Unassigned')}</span>`).join('')}</div>`;
}
function warnDuplicateMorningEquipment(equipment='') {
  const routes=duplicateMorningEquipmentRoutes(equipment);if(routes.length<2)return false;
  toast(`${equipment} is assigned to ${routes.map(row=>row.route).join(' and ')}`,'error');return true;
}
function openingPicklistCellAttrs(section={},sectionIndex=0,row=null,rowIndex=0,field='') {
  const routeIndex=row?state.morningRoutes.indexOf(row):-1,key=`${section.key}:${rowIndex}:${field}`;
  return `data-picklist-cell="${esc(key)}" data-picklist-view="true" data-picklist-field="${esc(field)}" data-picklist-route-index="${routeIndex}" data-picklist-route-uid="${esc(row?.routeUid||'')}" data-picklist-wave="${esc(section.wave||'')}" data-picklist-section-key="${esc(section.key||'')}" data-picklist-section-index="${sectionIndex}" data-picklist-row-index="${rowIndex}" title="${state.editMode?'Press Enter to save':'Double-click to edit'}" ${state.editMode?'contenteditable="true" tabindex="0" data-picklist-edit="true"':''}`;
}
function openingPicklistSectionHtml(section={},sectionIndex=0) {
  const rows=[...section.rows];while(rows.length<section.capacity)rows.push(null);
  const cell=(row,index,field,value,cls='')=>{const equipment=field==='ev'?String(row?.ev||value||''):String(value||''),vehicleIssue=field==='ev'?vehicleIssueForEquipmentId(equipment):null,equipmentType=field==='deviceName'?'device':field==='portable'?'portable':'',equipmentIssue=equipmentType?equipmentIssueFor(equipmentType,equipment):null,duplicate=field==='ev'&&duplicateMorningEquipmentRoutes(equipment).length>1,issueClass=duplicate?'duplicate-van-cell':vehicleIssue?.type==='grounded'?'grounded-van-cell':vehicleIssue?.type==='battery'?'low-battery-van-cell':vehicleIssue?.type==='reported'?'reported-van-cell':equipmentIssue?'reported-equipment-cell':'',vacant=field==='driver'&&routeAssignmentVacant(row),vacancyLabel=vacant?(routeMissingPrimary(row)?(String(row?.driver||'').trim()?'DRIVER NEEDED':'UNASSIGNED DRIVER'):'HELPER NEEDED'):'';return `<td class="picklist-data-cell ${cls} ${issueClass} ${vacant?'route-vacancy-driver-cell':''}" ${vacant?`data-vacancy-label="${esc(vacancyLabel)}"`:''} ${field==='driver'&&row?driverProfileAttrs(row.driver):''} ${openingPicklistCellAttrs(section,sectionIndex,row,index,field)}>${equipmentIssue?`<button type="button" class="equipment-issue-trigger active" data-action="open-equipment-issue" data-equipment-type="${equipmentType}" data-equipment-id="${esc(equipment)}">⚠</button>`:''}${esc(value||'')}${duplicateVehiclePopoverHtml(equipment)}${vehicleIssuePopoverHtml(row?.route||'',equipment,vehicleIssue)}${equipmentIssuePopoverHtml(equipmentType,equipment)}</td>`;};
  const pending=state.pendingPicklistWaveDelete?.key===section.key;
  const padSpan=section.capacity+(section.hasTime?1:0);
  const body=rows.map((row,index)=>`<tr class="${routeAssignmentVacant(row)?'route-vacancy-row':''}">${index===0?`<td class="picklist-wave-label picklist-data-cell" rowspan="${section.capacity}" data-picklist-meta="label" ${openingPicklistCellAttrs(section,sectionIndex,null,index,'waveLabel')}><button type="button" class="picklist-wave-delete" data-action="request-delete-picklist-wave" data-section-key="${esc(section.key)}" aria-label="Delete ${esc(section.label)}" contenteditable="false">${ICONS.trash}</button><span>${esc(section.label)}</span></td>`:''}${cell(row,index,'driver',routeDriverDisplayValue(row),'picklist-driver')}${cell(row,index,'route',row?.route||'')}${cell(row,index,'staging',row?.staging||'')}${index===0?`<td class="picklist-pad picklist-data-cell" rowspan="${padSpan}" data-picklist-meta="pad" ${openingPicklistCellAttrs(section,sectionIndex,null,index,'padOverride')}><span>${esc(section.pad||'')}</span></td>`:''}${cell(row,index,'ev',row?routeEquipmentValue(row):'')}${cell(row,index,'deviceName',row?.deviceName||'')}${cell(row,index,'portable',row?.portable||'')}</tr>`).join('');
  const time=section.hasTime?`<tr class="picklist-wave-time"><td class="picklist-data-cell" data-picklist-meta="waveTime" ${openingPicklistCellAttrs(section,sectionIndex,null,section.capacity,'waveTime')}>${esc(openingPicklistTime(section))}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`:'';
  return `<tbody class="picklist-section ${section.hasTime?'wave':'adhoc'} ${pending?'delete-pending':''}">${body}${time}<tr class="picklist-black-divider"><td colspan="8"></td></tr></tbody>`;
}
function openingPicklistBackupRows() {
  return currentBackupDriverRows().map(entry=>({...entry,vto:entry.vto||scheduleBackupLabel(entry.role)}));
}
function picklistVtoDriverCell(group='',index=0,row=null,value='') {
  const name=String(value||'').trim(),label=group==='vto2'?'VTO 2':'VTO 4',role=row?.role||(group==='vto2'?'Rescue':'Delivery Associate');
  const input=`<input data-picklist-backup="${esc(group)}:${index}" data-driver-name-input="true" value="${esc(name)}" aria-label="${label} backup ${index+1}" placeholder="Driver">`;
  if(!name)return input;
  const action=(target,text,tone='')=>`<button type="button" class="${esc(tone)}" data-action="picklist-vto-action" data-vto-target="${esc(target)}" data-driver-name="${esc(name)}" data-driver-role="${esc(role)}">${esc(text)}</button>`;
  const swap=`<button type="button" class="swap-route" data-action="open-vto-route-swap" data-driver-name="${esc(name)}" data-driver-role="${esc(role)}" data-vto-label="${esc(label)}">Swap To Route</button>`;
  return `<div class="picklist-vto-driver ${group==='vto2'?'vto-2':'vto-4'}" tabindex="0" data-vto-driver-name="${esc(name)}">${input}<span class="picklist-vto-status">${esc(label)}</span><div class="picklist-vto-actions" role="group" aria-label="Roster actions for ${esc(name)}"><header><strong>${esc(name)}</strong><small>Currently ${esc(label)} · choose where this driver belongs</small></header><div>${swap}${action('return','Return to scheduled','return')}${action('calloff','Called off','called-off')}${action('reduction','Reduction','reduction')}${action('stay-home','Told to stay home','stay-home')}${group==='vto2'?action('vto4','Move to VTO 4','vto-4'):action('vto2','Move to VTO 2','vto-2')}${canBecomeHelperRole(role)?action('helper','Helper','helper'):''}${action('adhoc','Adhoc','adhoc')}</div></div></div>`;
}
function openingPicklistCallOffRows() {
  return Object.entries(state.callOffDriverKeys||{}).filter(([key])=>key.startsWith(`${state.morningOperationDate}|`)).map(([key,value])=>({key,name:value.name||'',reason:state.callOffReasons?.[key]||'',route:value.route||''})).sort((a,b)=>a.name.localeCompare(b.name));
}
function openingPicklistRightHtml() {
  const controls=area=>`<span class="picklist-row-controls" aria-label="Add or subtract ${esc(area)} row"><button type="button" data-action="resize-picklist-area" data-area="${esc(area)}" data-delta="-1" title="Subtract one line">−</button><button type="button" data-action="resize-picklist-area" data-area="${esc(area)}" data-delta="1" title="Add one line">+</button></span>`;
  const backups=openingPicklistBackupRows(),vto2=backups.filter(row=>row.vto==='VTO 2'),vto4=backups.filter(row=>row.vto!=='VTO 2'),backupCount=Math.max(1,state.openingPicklistBackupRows||21,vto2.length,vto4.length);
  const overrides=state.openingPicklistBackupOverrides||{},backupValue=(group,index,fallback)=>Object.prototype.hasOwnProperty.call(overrides,`${group}:${index}`)?overrides[`${group}:${index}`]:fallback;
  const backupRows=Array.from({length:backupCount},(_,index)=>{const left=backupValue('vto2',index,vto2[index]?.name||''),right=backupValue('vto4',index,vto4[index]?.name||'');return `<tr><td>${picklistVtoDriverCell('vto2',index,vto2[index],left)}</td><td>${picklistVtoDriverCell('vto4',index,vto4[index],right)}</td></tr>`;}).join('');
  const calloffs=openingPicklistCallOffRows(),drafts=Array.isArray(state.openingPicklistCalloffDrafts)?state.openingPicklistCalloffDrafts:[],filledDrafts=drafts.filter(row=>String(row?.name||row?.reason||'').trim()).length,calloffCount=Math.max(1,state.openingPicklistCalloffRows||6,calloffs.length+filledDrafts),calloffRows=Array.from({length:calloffCount},(_,index)=>{const row=calloffs[index],draftIndex=index-calloffs.length,draft=draftIndex>=0?(drafts[draftIndex]||{}):null;return `<tr><td><input ${row?`data-picklist-calloff-name="${esc(row.key)}"`:`data-picklist-calloff-draft="${draftIndex}" data-picklist-calloff-field="name"`} data-driver-name-input="true" value="${esc(row?.name||draft?.name||'')}" aria-label="Call off ${index+1}" placeholder="Driver"></td><td><input ${row?`data-picklist-calloff-reason="${esc(row.key)}"`:`data-picklist-calloff-draft="${draftIndex}" data-picklist-calloff-field="reason"`} value="${esc(row?.reason||draft?.reason||'')}" aria-label="Reason ${index+1}" placeholder="Reason"></td></tr>`;}).join('');
  const topicValues=state.openingPicklistTopics||[],lastTopic=Math.max(0,...topicValues.map((value,index)=>String(value||'').trim()?index+1:0)),topicCount=Math.max(1,state.openingPicklistTopicRows||4,lastTopic),topics=Array.from({length:topicCount},(_,index)=>`<tr><td colspan="2"><input data-picklist-topic="${index}" value="${esc(topicValues[index]||'')}" aria-label="Stand up topic ${index+1}" placeholder="Stand up topic"></td></tr>`).join('');
  return `<aside class="opening-picklist-right"><table class="picklist-side-table backup-table"><thead><tr><th colspan="2"><span>Back Ups</span>${controls('backup')}</th></tr><tr><th>VTO 2</th><th>VTO 4</th></tr></thead><tbody>${backupRows}</tbody></table><table class="picklist-side-table calloff-table"><thead><tr><th>CALL OFF</th><th><span>REASON</span>${controls('calloff')}</th></tr></thead><tbody>${calloffRows}</tbody></table><table class="picklist-side-table topics-table"><thead><tr><th colspan="2"><span>STAND UP TOPICS</span>${controls('topic')}</th></tr></thead><tbody>${topics}</tbody></table><section class="picklist-notes"><strong>NOTES</strong><textarea data-picklist-notes aria-label="Opening picklist notes" placeholder="Opening notes">${esc(state.openingPicklistNotes||'')}</textarea></section><label class="picklist-date"><span>DATE</span><input data-picklist-date value="${esc(openingPicklistDateText())}" inputmode="numeric" aria-label="Opening picklist date" placeholder="Month/Day/Year"></label></aside>`;
}
function openingPicklistDateText() { const [year,month,day]=String(state.morningOperationDate||defaultOperationDate()).split('-').map(Number);return year&&month&&day?`${month}/${day}/${year}`:''; }
function openingPicklistHtml() {
  const sections=openingPicklistSections(),routeCount=sections.reduce((total,section)=>total+section.rows.length,0),backups=openingPicklistBackupRows(),calloffs=openingPicklistCallOffRows();
  const tools=`<details class="card picklist-more-tools" open><summary><span><strong>More picklist tools</strong><small>Edit live Morning Sheet data, fit rows, assign helper bags, capture the driver view, or print one page</small></span><b>Tools</b></summary><div class="picklist-tool-actions"><button class="btn small ${state.editMode?'lime':''}" data-action="toggle-picklist-edit">${state.editMode?'✓ Finish editing':'✎ Edit picklist'}</button><button class="btn small" data-action="sheet-undo" ${state.sheetHistory?.past?.length?'':'disabled'}>↶ Undo</button><button class="btn small" data-action="sheet-redo" ${state.sheetHistory?.future?.length?'':'disabled'}>↷ Redo</button><button class="btn small" data-action="open-sheet-history">History</button><button class="btn small ${state.fitOpeningPicklistRows?'lime':''}" data-action="toggle-picklist-fit-rows">${state.fitOpeningPicklistRows?'✓ Wave rows fitted':'Remove blank wave rows'}</button><button class="btn small" data-action="assign-helper-bags">${ICONS.box} Assign Helper Bags</button><button class="btn small" data-action="preview-picklist-screenshot">${ICONS.download} Screenshot waves + Adhocs</button><button class="btn small danger-soft" data-action="clear-picklist">${ICONS.trash} Clear Picklist</button><button class="btn small primary print-picklist-button" data-action="print-opening-picklist">${ICONS.download} Print one-page Picklist</button></div></details>`;
  return `${tools}<article class="card opening-picklist-print"><div class="opening-picklist-toolbar"><div><span class="eyebrow">UNIVERSAL OPENING VIEW</span><h2>Opening Picklist</h2><p>${routeCount} Morning Sheet routes · ${backups.length} backups · ${calloffs.length} call offs · Helpers and DSP excluded</p></div></div>${state.editMode?`<div class="picklist-edit-help">Editing is on. Click any worksheet cell and press Enter to save. Every route edit immediately updates the Morning Sheet.</div>`:''}<div class="opening-picklist-scroll"><div class="opening-picklist-sheet"><table class="opening-picklist-main"><colgroup><col class="pick-col-wave"><col class="pick-col-driver"><col class="pick-col-route"><col class="pick-col-staging"><col class="pick-col-pad"><col class="pick-col-ev"><col class="pick-col-device"><col class="pick-col-portable"></colgroup><thead><tr><th>WAVE</th><th>DRIVER</th><th>ROUTE</th><th>STAGING</th><th>PAD</th><th>EV</th><th>DEVICE</th><th>PORTABLE</th></tr></thead>${sections.map(openingPicklistSectionHtml).join('')}</table>${openingPicklistRightHtml()}</div></div></article>`;
}
function rosterPage() {
  return `${contextBar(`<span class="status ${state.rosterPublished?'':'warn'}">${state.rosterPublished?'Published to team':'Draft · not sent'}</span>`)}${phaseStrip()}${openingPicklistHtml()}<details class="card opening-roster-tools" open><summary><span><strong>Opening roster controls</strong><small>PAYCOM schedule, route swaps, backups, call offs, stay-home, and reductions</small></span><b>Tools</b></summary>${openingRosterScheduleHtml()}</details>`;
}

function rosteringId(prefix='slot') { return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`; }
function rosteringDefaultServices() { return DEFAULT_ROSTERING_SERVICES.map(service=>({...service})); }
function rosteringTimeBlueprint(service={},count=0) {
  const medium=[['11:15 AM',2],['11:20 AM',8],['11:25 AM',11],['11:40 AM',11],['11:45 AM',8]].flatMap(([time,total])=>Array.from({length:total},()=>time));
  const source=service.id==='rivian-medium'?medium:Array.from({length:count},()=>service.defaultTime||'11:15 AM');
  return Array.from({length:count},(_,index)=>source[index]||service.defaultTime||'11:15 AM');
}
function normalizeRosteringPlan(plan={}) {
  const services=(Array.isArray(plan.services)&&plan.services.length?plan.services:rosteringDefaultServices()).map((service,index)=>({id:String(service.id||`service-${index+1}`),name:String(service.name||`Custom service ${index+1}`),confirmed:Math.max(0,Math.trunc(Number(service.confirmed)||0)),kind:service.kind==='helper'?'helper':'driver',defaultTime:String(service.defaultTime||'11:15 AM')}));
  const serviceIds=new Set(services.map(service=>service.id)),assignments=(Array.isArray(plan.assignments)?plan.assignments:[]).filter(row=>row&&serviceIds.has(row.serviceId)).map(row=>({id:String(row.id||rosteringId()),serviceId:String(row.serviceId),start:String(row.start||'11:15 AM'),associate:String(row.associate||''),route:String(row.route||''),role:String(row.role||''),source:String(row.source||'manual')}));
  if(!assignments.length)services.forEach(service=>rosteringTimeBlueprint(service,service.confirmed).forEach(start=>assignments.push({id:rosteringId(),serviceId:service.id,start,associate:'',route:'',role:'',source:'template'})));
  return {services,assignments,updatedAt:String(plan.updatedAt||''),importName:String(plan.importName||''),importedAt:String(plan.importedAt||''),_normalized:true};
}
function currentRosteringPlan() {
  state.rosteringPlans=state.rosteringPlans&&typeof state.rosteringPlans==='object'?state.rosteringPlans:{};
  const date=state.rosteringDate||defaultOperationDate();state.rosteringDate=date;
  if(!state.rosteringPlans[date]?._normalized)state.rosteringPlans[date]=normalizeRosteringPlan(state.rosteringPlans[date]||{});
  return state.rosteringPlans[date];
}
function rosteringService(serviceId='') { return currentRosteringPlan().services.find(service=>service.id===serviceId)||null; }
function rosteringAssignment(assignmentId='') { return currentRosteringPlan().assignments.find(row=>row.id===assignmentId)||null; }
function rosteringServiceRows(serviceId='') { return currentRosteringPlan().assignments.filter(row=>row.serviceId===serviceId).sort((a,b)=>waveMinutes(a.start)-waveMinutes(b.start)||a.associate.localeCompare(b.associate)); }
function scheduleEntriesForDate(date=state.morningOperationDate) {
  const entries=Array.isArray(state.scheduleEntries)?state.scheduleEntries:[],exact=entries.filter(entry=>scheduleDateKey(entry.date)===date);
  if(exact.length)return exact;
  const dated=entries.filter(entry=>scheduleDateKey(entry.date)),undated=entries.filter(entry=>!scheduleDateKey(entry.date));
  return dated.length?[]:undated;
}
function rosteringHistoryDate(value='',key='') {
  const direct=String(value||'').match(/^\d{4}-\d{2}-\d{2}/)?.[0],fromKey=String(key||'').match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  return direct||fromKey||scheduleDateKey(value)||'';
}
function rosteringStayHomeCount(name='',date=state.rosteringDate) {
  const target=Date.parse(`${date}T12:00:00Z`);if(!name||Number.isNaN(target))return 0;
  const dates=new Set();Object.entries(state.scheduleStayHomeHistory||{}).forEach(([key,record])=>{if(nameKey(record?.name||key.split('|').slice(1).join('|'))!==nameKey(name))return;const day=rosteringHistoryDate(record?.date,key),stamp=Date.parse(`${day}T12:00:00Z`);if(day&&!Number.isNaN(stamp)&&stamp<=target&&stamp>=target-6*86400000)dates.add(day);});
  return dates.size;
}
function rosteringFairnessBadge(name='') {
  const count=rosteringStayHomeCount(name);if(!name)return '<span class="rostering-fairness none">—</span>';
  if(!count)return '<span class="rostering-fairness clear">Clear</span>';
  const level=Math.min(3,count),label=count>=3?`${count}× · prioritize hours`:`${count}× stay-home`;
  return `<span class="rostering-fairness level-${level}" title="Told to stay home ${count} time${count===1?'':'s'} in the last 7 days">${esc(label)}</span>`;
}
function rosteringPaycomFairnessBadge(name='') {
  return rosteringStayHomeCount(name)?rosteringFairnessBadge(name):'';
}
function rosteringRolePriority(role='') {
  const key=headerKey(role);if(key.includes('modifiedduty'))return 3;if(key.includes('deliveryassociate'))return 0;if(key.includes('rescue'))return 1;if(key.includes('midshift'))return 2;return 4;
}
function rosteringUnavailableToday(name='') {
  const key=`${state.rosteringDate}|${nameKey(name)}`;
  return Boolean(state.scheduleStayHome?.[key]||state.scheduleReductions?.[key]||state.callOffDriverKeys?.[key]);
}
function rosteringPriorityEntries(entries=[]) {
  return [...entries].sort((a,b)=>rosteringStayHomeCount(b.name)-rosteringStayHomeCount(a.name)||rosteringRolePriority(a.role)-rosteringRolePriority(b.role)||waveMinutes(a.start)-waveMinutes(b.start)||String(a.name||'').localeCompare(String(b.name||'')));
}
function rosteringPaycomCategoryFor(entry={}) {
  const key=headerKey(entry.role);if(isRidealongRole(entry.role))return 'training';if(isDriverHelperOnlyRole(entry.role))return 'helper';if(key.includes('modifiedduty'))return 'modified';if(key.includes('deliveryassociate'))return 'vto4';if(key.includes('rescue'))return 'vto2';if(key.includes('midshift'))return 'midshift';return 'other';
}
function rosteringEntryEligibleForRoster(entry={}) {
  const role=headerKey(entry.role);
  return !role.includes('modifiedduty')&&(role.includes('deliveryassociate')||role.includes('rescue'))&&!rosteringUnavailableToday(entry.name);
}
function rosteringOrderEntries(entries=[],mode=state.rosteringAutoMode,random=Math.random) {
  const rows=[...entries];if(mode==='abc')return rows.sort((a,b)=>driverDisplayName(a.name).localeCompare(driverDisplayName(b.name),undefined,{sensitivity:'base'})||waveMinutes(a.start)-waveMinutes(b.start));
  for(let index=rows.length-1;index>0;index--){const swap=Math.max(0,Math.min(index,Math.floor(Number(random())*(index+1))));[rows[index],rows[swap]]=[rows[swap],rows[index]];}return rows;
}
function rosteringAssignedNameKeys(plan=currentRosteringPlan()) { return new Set(plan.assignments.map(row=>driverIdentityKey(row.associate)).filter(Boolean)); }
function rosteringDuplicateNameKeys(plan=currentRosteringPlan()) { const counts={};plan.assignments.forEach(row=>{const key=driverIdentityKey(row.associate);if(key)counts[key]=(counts[key]||0)+1;});return new Set(Object.entries(counts).filter(([,count])=>count>1).map(([key])=>key)); }
function touchRosteringPlan() { currentRosteringPlan().updatedAt=new Date().toISOString(); }
function addRosteringAssignment(serviceId='',extra={}) {
  const plan=currentRosteringPlan(),service=plan.services.find(row=>row.id===serviceId);if(!service)return null;
  const row={id:rosteringId(),serviceId,start:extra.start||service.defaultTime||'11:15 AM',associate:extra.associate||'',route:extra.route||'',role:extra.role||'',source:extra.source||'manual'};plan.assignments.push(row);touchRosteringPlan();return row;
}
function preferredRosteringServices(entry={},onlyServiceId='') {
  const services=currentRosteringPlan().services,helper=isDriverHelperOnlyRole(entry.role),eligible=services.filter(service=>service.id!=='xl-donations'&&(helper?service.kind==='helper':service.kind!=='helper')&&(!onlyServiceId||service.id===onlyServiceId));
  return eligible.sort((a,b)=>services.indexOf(a)-services.indexOf(b));
}
function addPaycomEntryToRostering(entry={},onlyServiceId='') {
  const plan=currentRosteringPlan(),exact=canonicalDriverName(contactForMorningDriver(entry.name)?.name||entry.name);if(!exact||!rosteringEntryEligibleForRoster(entry)||rosteringAssignedNameKeys(plan).has(driverIdentityKey(exact)))return false;
  const services=preferredRosteringServices(entry,onlyServiceId);if(!services.length)return false;
  let target=null;for(const service of services){target=plan.assignments.find(row=>row.serviceId===service.id&&!String(row.associate||'').trim());if(target)break;}
  if(!target)target=addRosteringAssignment(services[0].id,{route:'Support / unassigned'});if(!target)return false;
  target.associate=exact;target.start=entry.start||target.start;target.role=entry.role||'';target.source='paycom';touchRosteringPlan();return true;
}
function fillRosteringFromPaycom(serviceId='',options={}) {
  const entries=scheduleEntriesForDate(state.rosteringDate).filter(rosteringEntryEligibleForRoster);if(!entries.length){if(!options.silent)toast('No eligible PAYCOM drivers are available for this roster date','error');return 0;}
  let added=0;entries.forEach(entry=>{if(addPaycomEntryToRostering(entry,serviceId))added++;});
  if(!options.silent){persistRosteringSlice();renderRosteringContent();toast(added?`${added} PAYCOM driver${added===1?'':'s'} added to the roster`:'Every matching PAYCOM driver is already rostered');}
  return added;
}
function rosteringHelperPoolRows(date=state.rosteringDate) {
  const saved=Array.isArray(state.rosteringHelperPool?.[date])?state.rosteringHelperPool[date]:[],scheduled=scheduleEntriesForDate(date).filter(entry=>isDriverHelperOnlyRole(entry.role)),rows=new Map();
  [...scheduled,...saved].forEach(entry=>{const exact=canonicalDriverName(contactForMorningDriver(entry.name)?.name||entry.name),key=driverIdentityKey(exact);if(key&&!rows.has(key))rows.set(key,{...entry,name:exact,role:entry.role||'Driver Helper'});});
  return [...rows.values()].sort((a,b)=>waveMinutes(a.start)-waveMinutes(b.start)||driverDisplayName(a.name).localeCompare(driverDisplayName(b.name),undefined,{sensitivity:'base'}));
}
function rememberRosteringHelpers(rows=[],date=state.rosteringDate) {
  state.rosteringHelperPool=state.rosteringHelperPool&&typeof state.rosteringHelperPool==='object'?state.rosteringHelperPool:{};
  const byIdentity=new Map((state.rosteringHelperPool[date]||[]).map(row=>[driverIdentityKey(row.name),row]));
  rows.filter(row=>String(row?.associate||row?.name||'').trim()).forEach(row=>{const name=canonicalDriverName(contactForMorningDriver(row.associate||row.name)?.name||row.associate||row.name),key=driverIdentityKey(name);if(key)byIdentity.set(key,{name,role:row.role||'Driver Helper',start:row.start||'',end:row.end||'',source:'removed-helper-block'});});
  state.rosteringHelperPool[date]=[...byIdentity.values()];
}
function syncRosteringHelperShifts(plan=currentRosteringPlan()) {
  const helpers=rosteringHelperPoolRows().filter(entry=>!rosteringUnavailableToday(entry.name));if(!helpers.length)return 0;
  let service=plan.services.find(row=>row.kind==='helper');
  // PAYCOM helpers belong in the Helper box until Amazon confirms a Helper
  // service. Never invent or enlarge a Helper route block from a screenshot.
  if(!service)return 0;
  const assigned=rosteringAssignedNameKeys(plan);let added=0;
  const confirmedRows=plan.assignments.filter(row=>row.serviceId===service.id).slice(0,service.confirmed);
  rosteringPriorityEntries(helpers).forEach(entry=>{const exact=canonicalDriverName(contactForMorningDriver(entry.name)?.name||entry.name),identity=driverIdentityKey(exact);if(!exact||assigned.has(identity))return;const target=confirmedRows.find(row=>!String(row.associate||'').trim());if(!target)return;target.associate=exact;target.start=entry.start||target.start;target.role=entry.role||'Driver Helper';target.source='auto-helper';assigned.add(identity);added++;});
  if(added)touchRosteringPlan();return added;
}
function autoRosterFromPaycom(options={}) {
  const plan=currentRosteringPlan(),entries=scheduleEntriesForDate(state.rosteringDate).filter(entry=>scheduleRoleGroup(entry.role)==='driver');if(!entries.length){if(!options.silent)toast('Import a PAYCOM schedule for this roster date first','error');return {drivers:0,helpers:0,prioritized:0,remaining:0};}
  plan.assignments.forEach(row=>{if(['paycom','auto-roster','auto-helper'].includes(row.source)){row.associate='';row.role='';row.route='';row.source='template';}});
  const helpers=syncRosteringHelperShifts(plan),locked=rosteringAssignedNameKeys(plan),mode=options.mode||state.rosteringAutoMode||'random',eligible=entries.filter(entry=>!isDriverHelperOnlyRole(entry.role)&&rosteringEntryEligibleForRoster(entry)&&!locked.has(driverIdentityKey(entry.name))),drivers=rosteringOrderEntries(eligible,mode,options.random||Math.random),services=plan.services.filter(service=>service.kind!=='helper'&&service.id!=='xl-donations'),open=services.flatMap(service=>{
    let rows=plan.assignments.filter(row=>row.serviceId===service.id);while(rows.length<service.confirmed){rows.push(addRosteringAssignment(service.id));}
    return rows.slice(0,service.confirmed).filter(row=>!String(row.associate||'').trim()).map(row=>({service,row}));
  });
  let added=0,prioritized=0;drivers.slice(0,open.length).forEach((entry,index)=>{const target=open[index]?.row;if(!target)return;const exact=canonicalDriverName(contactForMorningDriver(entry.name)?.name||entry.name);target.associate=exact;target.start=entry.start||target.start;target.role=entry.role||'';target.source='auto-roster';if(rosteringStayHomeCount(exact)>0)prioritized++;added++;});
  touchRosteringPlan();const result={drivers:added,helpers,prioritized,remaining:Math.max(0,drivers.length-added),mode};
  if(!options.silent){persistRosteringSlice();renderRosteringContent();toast(`${added} route driver${added===1?'':'s'} rostered in ${mode==='abc'?'ABC':'random'} order · ${helpers} helper${helpers===1?'':'s'} added`);}return result;
}
function rosteringScreenshotServiceTemplate(name='') {
  const key=headerKey(name),raw=String(name||'');if((key.includes('extralarge')||key.includes('xl'))&&key.includes('amzdonations'))return DEFAULT_ROSTERING_SERVICES.find(row=>row.id==='xl-donations');if(key.includes('xlus')||(key.includes('extralarge')&&/(?:^|[^a-z])us(?:[^a-z]|$)/i.test(raw)))return XL_US_ROSTERING_SERVICE;if(key.includes('withhelperhelper')||key.includes('helperhelper'))return DEFAULT_ROSTERING_SERVICES.find(row=>row.id==='helper-associate');if(key.includes('withhelper'))return DEFAULT_ROSTERING_SERVICES.find(row=>row.id==='rivian-helper-route');if(key.includes('rivianmedium'))return DEFAULT_ROSTERING_SERVICES.find(row=>row.id==='rivian-medium');return null;
}
function rosteringScreenshotAssociate(line='') {
  const original=String(line||'').replace(/[|]/g,' ').replace(/\s+/g,' ').trim(),known=[...(state.driverContacts||[])].sort((a,b)=>String(b.name||'').length-String(a.name||'').length).find(contact=>{const key=nameKey(contact.name);return key&&nameKey(original).includes(key);});if(known)return known.name;
  let clean=original.replace(/^.*?\b\d{1,2}:\d{2}\s*(?:AM|PM)\b/i,'').replace(/\b(?:No Route Generated|CX\s*\d+)\b.*$/i,'').replace(/\s+\+?1?\d{10,}\b.*$/,'').replace(/\s+Riverside\b.*$/i,'').replace(/\s+\([A-Z0-9]+\).*$/i,'').replace(/\s+-\s+Amazon\.com.*$/i,'').replace(/\s+x$/i,'').trim();
  if(!/^[A-Za-z][A-Za-z .,'’-]{2,60}$/.test(clean)||/^(?:associate|associates|start time|confirmed(?: services?)?|routes?|bulk import associates|no route generated)$/i.test(clean))return '';
  return canonicalDriverName(clean.replace(/\s+/g,' '));
}
function rosteringPlanFromScreenshotText(text='',fileName='Amazon roster screenshot') {
  const lines=String(text||'').replace(/\r/g,'').split('\n').map(line=>line.replace(/[✓✔]/g,'').replace(/\s+/g,' ').trim()).filter(Boolean),services=[],serviceMap=new Map(),rows=[];let activeServiceId='',pendingTime='',lastRow=null;
  const ensureService=(rawName='',confirmedValue=null)=>{const template=rosteringScreenshotServiceTemplate(rawName),name=template?.name||rawName.replace(/^[+\-!\s]+/,'').trim(),id=template?.id||`screenshot-${headerKey(name).slice(0,48)||services.length+1}`;let service=serviceMap.get(id);if(!service){service={id,name,confirmed:Math.max(0,Number.isFinite(confirmedValue)?confirmedValue:(template?.confirmed||0)),kind:template?.kind||(/helper\s*:\s*helper/i.test(rawName)?'helper':'driver'),defaultTime:template?.defaultTime||'11:15 AM'};serviceMap.set(id,service);services.push(service);}else if(Number.isFinite(confirmedValue))service.confirmed=Math.max(service.confirmed,confirmedValue);return service;};
  lines.forEach((line,index)=>{
    if(/Standard Parcel/i.test(line)||rosteringScreenshotServiceTemplate(line)){const nearby=lines.slice(index,index+3).join(' '),nameMatch=line.match(/(Standard Parcel[\s\S]*?)(?=\s+\d+\s*Confirmed|$)/i),confirmedMatch=nearby.match(/(\d+)\s*Confirmed/i),service=ensureService(nameMatch?.[1]||line,confirmedMatch?Number(confirmedMatch[1]):null);activeServiceId=service.id;pendingTime='';lastRow=null;return;}
    const routeMatch=line.match(/\b(CX\s*\d+|No Route Generated)\b/i);if(lastRow&&routeMatch&&!/\b\d{1,2}:\d{2}\b/.test(line)){lastRow.route=/^CX/i.test(routeMatch[1])?routeMatch[1].replace(/\s+/g,'').toUpperCase():'No Route Generated';return;}
    const timeMatch=line.match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM))\b/i);if(timeMatch)pendingTime=normalizeTimeDisplay(timeMatch[1]);
    if(/(?:Confirmed Services?|Confirmed Routes|Bulk Import Associates|START TIME|Associate Name|Filter Start Time)/i.test(line))return;
    const associate=rosteringScreenshotAssociate(line);if(!associate)return;
    const serviceId=activeServiceId||rosteringScreenshotServiceTemplate('Standard Parcel Electric - Rivian MEDIUM')?.id||'rivian-medium';
    if(serviceId==='xl-donations')return;
    const row={serviceId,start:pendingTime||'11:15 AM',associate,route:routeMatch?/^CX/i.test(routeMatch[1])?routeMatch[1].replace(/\s+/g,'').toUpperCase():'No Route Generated':'',role:'',source:'screenshot'};rows.push(row);lastRow=row;
  });
  if(!services.length&&rows.length){const fallback=rosteringScreenshotServiceTemplate('Standard Parcel Electric - Rivian MEDIUM');services.push({...fallback});serviceMap.set(fallback.id,services[0]);rows.forEach(row=>row.serviceId=fallback.id);}
  if(!services.length)return null;
  services.forEach(service=>{const rostered=rows.filter(row=>row.serviceId===service.id).length;if(!service.confirmed)service.confirmed=rostered||1;});
  const plan=normalizeRosteringPlan({services,assignments:[],importName:fileName,importedAt:new Date().toISOString()});
  rows.forEach(imported=>{const service=plan.services.find(row=>row.id===imported.serviceId)||plan.services[0];const confirmedRows=plan.assignments.filter(row=>row.serviceId===service.id).slice(0,service.confirmed);let target=confirmedRows.find(row=>!row.associate&&normalizeTimeDisplay(row.start)===normalizeTimeDisplay(imported.start))||confirmedRows.find(row=>!row.associate);if(!target)return;Object.assign(target,imported,{serviceId:service.id});});
  plan.importName=fileName;plan.importedAt=new Date().toISOString();return plan;
}
function applyRosteringScreenshotText(text='',fileName='Amazon roster screenshot') {
  const plan=rosteringPlanFromScreenshotText(text,fileName);if(!plan)throw new Error('No Amazon confirmed-service or associate roster rows were recognized');state.rosteringPlans[state.rosteringDate]=plan;state.rosteringOpenServices=Object.fromEntries(plan.services.map(service=>[service.id,true]));syncRosteringHelperShifts(plan);touchRosteringPlan();return plan;
}
function adjustRosteringConfirmed(serviceId='',delta=0) {
  const plan=currentRosteringPlan(),service=plan.services.find(row=>row.id===serviceId);if(!service)return;
  const rostered=plan.assignments.filter(row=>row.serviceId===serviceId&&String(row.associate||'').trim()).length,next=Math.max(rostered,service.confirmed+Number(delta||0));
  if(next===service.confirmed)return toast(rostered?`Confirmed count cannot be lower than ${rostered} rostered associates`:'Confirmed count is already zero','error');
  if(next>service.confirmed)Array.from({length:next-service.confirmed},()=>addRosteringAssignment(serviceId));
  else {let remove=service.confirmed-next;for(let index=plan.assignments.length-1;index>=0&&remove;index--){const row=plan.assignments[index];if(row.serviceId===serviceId&&!String(row.associate||'').trim()){plan.assignments.splice(index,1);remove--;}}}
  service.confirmed=next;touchRosteringPlan();persistRosteringSlice();renderRosteringContent();
}
function addRosteringService() {
  const plan=currentRosteringPlan(),id=rosteringId('service');plan.services.push({id,name:'Custom confirmed service - Default as station - 10 Hours',confirmed:1,kind:'driver',defaultTime:'11:15 AM'});plan.assignments.push({id:rosteringId(),serviceId:id,start:'11:15 AM',associate:'',route:'',role:'',source:'manual'});state.rosteringOpenServices[id]=true;touchRosteringPlan();persistRosteringSlice();renderRosteringContent();toast('Custom service added');
}
function requestDeleteRosteringService(serviceId='') { const service=rosteringService(serviceId);if(!service)return;state.pendingRosteringServiceDelete={id:service.id,name:service.name,confirmed:service.confirmed,rostered:rosteringServiceRows(service.id).filter(row=>row.associate).length};state.modal='delete-rostering-service';render(); }
function confirmDeleteRosteringService() { const pending=state.pendingRosteringServiceDelete;if(!pending)return;const plan=currentRosteringPlan(),serviceIndex=plan.services.findIndex(service=>service.id===pending.id);if(serviceIndex<0)return;const service=plan.services[serviceIndex],removedRows=plan.assignments.filter(row=>row.serviceId===pending.id);if(service.kind==='helper')rememberRosteringHelpers(removedRows);plan.services.splice(serviceIndex,1);plan.assignments=plan.assignments.filter(row=>row.serviceId!==pending.id);delete state.rosteringOpenServices[pending.id];state.pendingRosteringServiceDelete=null;state.modal=null;touchRosteringPlan();persist();render();toast(service.kind==='helper'?`${pending.name} removed · ${removedRows.filter(row=>row.associate).length} helper${removedRows.filter(row=>row.associate).length===1?'':'s'} moved to the Helper box`:`${pending.name} roster block deleted`); }
function removeRosteringAssignment(assignmentId='') { const plan=currentRosteringPlan(),index=plan.assignments.findIndex(row=>row.id===assignmentId);if(index<0)return;const [removed]=plan.assignments.splice(index,1),service=plan.services.find(row=>row.id===removed.serviceId);if(service)service.confirmed=Math.max(plan.assignments.filter(row=>row.serviceId===removed.serviceId&&row.associate).length,service.confirmed-1);touchRosteringPlan();persistRosteringSlice();renderRosteringContent();toast(removed.associate?`${removed.associate} removed from the roster`:'Empty shift removed'); }
function clearRosteringAssociate(assignmentId='') { const row=rosteringAssignment(assignmentId);if(!row)return;const name=row.associate||'Associate';if(!row.associate)return toast('This confirmed slot is already empty');row.associate='';row.role='';row.source='manual';touchRosteringPlan();persistRosteringSlice();renderRosteringContent();toast(`${name} cleared · confirmed slot kept`); }
function clearRosteringServiceAssociates(serviceId='') { const plan=currentRosteringPlan(),service=plan.services.find(row=>row.id===serviceId);if(!service)return;const rows=plan.assignments.filter(row=>row.serviceId===serviceId),cleared=rows.filter(row=>String(row.associate||'').trim()).length;if(!cleared)return toast(`${service.name} is already clear`);rows.forEach(row=>{row.associate='';row.role='';row.source='manual';});touchRosteringPlan();persistRosteringSlice();renderRosteringContent();toast(`${cleared} name${cleared===1?'':'s'} cleared from ${service.name}`); }
function updateRosteringAssignment(assignmentId='',field='',value='') { const row=rosteringAssignment(assignmentId);if(!row||!['start','associate','route','role'].includes(field))return;if(field==='associate')row[field]=value?canonicalDriverName(value):'';else row[field]=String(value||'').trim();touchRosteringPlan(); }
function updateRosteringService(serviceId='',field='',value='') { const service=rosteringService(serviceId);if(!service)return;if(field==='name')service.name=String(value||'').trim()||service.name;if(field==='kind')service.kind=value==='helper'?'helper':'driver';if(field==='defaultTime')service.defaultTime=String(value||'').trim()||'11:15 AM';touchRosteringPlan(); }
function rosteringTimeSummary(rows=[],confirmed=0) { const counts={};rows.slice(0,confirmed).forEach(row=>{const time=row.start||'Unscheduled';counts[time]=(counts[time]||0)+1;});return Object.entries(counts).sort((a,b)=>waveMinutes(a[0])-waveMinutes(b[0])).map(([time,count])=>`<div><span>${esc(time)}</span><b>${count}</b></div>`).join('')||'<div><span>No confirmed shifts</span><b>0</b></div>'; }
function rosteringAssignmentRowHtml(row={},duplicates=new Set()) {
  const key=driverIdentityKey(row.associate),duplicate=key&&duplicates.has(key),fairCount=rosteringStayHomeCount(row.associate),classes=[!row.associate?'missing':'',duplicate?'duplicate':'',fairCount>=3?'fairness-alert':''].filter(Boolean).join(' ');
  return `<div class="rostering-associate-row ${classes}" data-rostering-name="${esc(key)}" ${row.associate?driverProfileAttrs(row.associate):''}><label><span>Start time</span><input data-rostering-assignment="${esc(row.id)}" data-rostering-field="start" value="${esc(row.start)}" aria-label="Start time"></label><label class="associate-input"><span>Associate</span><input data-rostering-assignment="${esc(row.id)}" data-rostering-field="associate" data-driver-name-input="true" value="${esc(row.associate)}" placeholder="Choose exact driver name" aria-label="Associate name"><small>${row.role?esc(row.role):row.associate?'Manual assignment':'Driver missing'}${duplicate?' · DUPLICATE':''}</small></label><label><span>Route</span><input data-rostering-assignment="${esc(row.id)}" data-rostering-field="route" value="${esc(row.route)}" placeholder="No Route Generated" aria-label="Route or status"></label><div class="rostering-fairness-cell"><span>Fair rotation</span>${rosteringFairnessBadge(row.associate)}${driverFlagBadgeHtml(row.associate)}</div><div class="rostering-row-actions">${row.associate?`<button class="rostering-clear-name" data-action="rostering-clear-associate" data-assignment-id="${esc(row.id)}" aria-label="Clear ${esc(row.associate)} but keep confirmed shift" title="Clear name · keep shift">⌫</button>`:''}<button class="rostering-remove" data-action="rostering-remove-shift" data-assignment-id="${esc(row.id)}" aria-label="Remove confirmed shift for ${esc(row.associate||'empty shift')}" title="Remove confirmed shift">×</button></div></div>`;
}
function rosteringServiceHtml(service={},plan=currentRosteringPlan(),duplicates=new Set()) {
  const rows=rosteringServiceRows(service.id),rostered=rows.filter(row=>row.associate).length,missing=Math.max(0,service.confirmed-rostered),open=Boolean(state.rosteringOpenServices[service.id]),complete=missing===0&&rostered===service.confirmed;
  const paycomFill=service.id==='xl-donations'?'<span class="rostering-manual-note">Manual assignment only</span>':`<button class="btn small" data-action="rostering-fill-paycom-service" data-service-id="${esc(service.id)}">Bulk Import Associates</button>`;
  return `<article class="rostering-service ${open?'open':''} ${complete?'complete':missing?'needs-drivers':'overstaffed'}" data-rostering-service-card="${esc(service.id)}"><button class="rostering-service-bar" data-action="rostering-toggle-service" data-service-id="${esc(service.id)}" aria-expanded="${open}"><i>${complete?'✓':'!'}</i><b>${open?'−':'+'}</b><strong>${esc(service.name)}</strong><span><em>${service.confirmed}</em> Confirmed</span><span><em>${rostered}</em> Rostered</span>${missing?`<mark>${missing} Missing</mark>`:''}</button><div class="rostering-service-body" ${open?'':'hidden'}><div class="rostering-route-summary"><header><div><span class="eyebrow">CONFIRMED ROUTES</span><h3>Start-time plan</h3></div><div class="rostering-service-actions">${paycomFill}<button class="btn small danger-soft" data-action="rostering-clear-service" data-service-id="${esc(service.id)}">Clear roster</button><button class="btn small danger" data-action="request-delete-rostering-service" data-service-id="${esc(service.id)}">${ICONS.trash} Delete block</button></div></header><div class="rostering-time-head"><span>START TIME</span><b>CONFIRMED</b></div>${rosteringTimeSummary(rows,service.confirmed)}</div><div class="rostering-service-customize"><label><span>Service name</span><input data-rostering-service="${esc(service.id)}" data-rostering-service-field="name" value="${esc(service.name)}"></label><label><span>Type</span><select data-rostering-service="${esc(service.id)}" data-rostering-service-field="kind"><option value="driver" ${service.kind==='driver'?'selected':''}>Driver</option><option value="helper" ${service.kind==='helper'?'selected':''}>Helper</option></select></label><div><span>Confirmed positions</span><p><button data-action="rostering-adjust-confirmed" data-service-id="${esc(service.id)}" data-delta="-1">−</button><b>${service.confirmed}</b><button data-action="rostering-adjust-confirmed" data-service-id="${esc(service.id)}" data-delta="1">+</button></p></div></div><div class="rostering-associate-table"><div class="rostering-associate-head"><span>START TIME</span><span>ASSOCIATE</span><span>ROUTE</span><span>FAIR ROTATION</span><span></span></div><div class="rostering-associate-list">${rows.map(row=>rosteringAssignmentRowHtml(row,duplicates)).join('')}</div><button class="btn small rostering-add-shift" data-action="rostering-add-shift" data-service-id="${esc(service.id)}">+ Add confirmed shift</button></div></div></article>`;
}
function rosteringUnrosteredBackupGroups(plan=currentRosteringPlan()) {
  const assigned=rosteringAssignedNameKeys(plan),seen=new Set(),groups={vto2:[],vto4:[],other:[]};
  scheduleEntriesForDate(state.rosteringDate).filter(entry=>!isDriverHelperOnlyRole(entry.role)&&!isRidealongRole(entry.role)&&!rosteringUnavailableToday(entry.name)&&!assigned.has(driverIdentityKey(entry.name))).forEach(entry=>{const identity=driverIdentityKey(entry.name);if(!identity||seen.has(identity))return;seen.add(identity);const category=rosteringPaycomCategoryFor(entry);groups[category==='vto2'?'vto2':category==='vto4'?'vto4':'other'].push(entry);});
  Object.values(groups).forEach(rows=>rows.sort((a,b)=>driverDisplayName(a.name).localeCompare(driverDisplayName(b.name),undefined,{sensitivity:'base'})));return groups;
}
function rosteringDriverActionButtons(entry={},isAssigned=false) {
  const eligible=rosteringEntryEligibleForRoster(entry);
  if(isAssigned)return '<button class="btn small" disabled>Rostered</button>';
  if(!eligible)return '<button class="btn small" disabled>Other role</button>';
  return `<span class="rostering-driver-actions"><button class="btn small primary" data-action="rostering-add-paycom-driver" data-driver-name="${esc(entry.name)}">Add to roster</button><button class="btn small" data-action="open-rostering-driver-swap" data-driver-name="${esc(entry.name)}">Swap with rostered driver</button></span>`;
}
function rosteringBackupBuilderHtml(plan=currentRosteringPlan()) {
  const groups=rosteringUnrosteredBackupGroups(plan),sections=[['vto2','VTO 2 · Rescue'],['vto4','VTO 4 · Delivery Associate'],['other','Other roles']];
  return `<section class="rostering-backup-builder"><header><div><span class="eyebrow">UNROSTERED BACKUP LIST</span><h3>Drivers still available</h3></div><span><b>${Object.values(groups).reduce((sum,rows)=>sum+rows.length,0)}</b><button class="btn small" data-action="copy-rostering-backup-email">${ICONS.copy} Copy email text</button></span></header><div>${sections.map(([key,label])=>`<article><h4>${esc(label)} <b>${groups[key].length}</b></h4>${groups[key].length?groups[key].map(entry=>`<div ${driverProfileAttrs(entry.name)}><span><strong>${esc(driverDisplayName(entry.name))}</strong><small>${esc(entry.role)}${rosteringStayHomeCount(entry.name)?` · ${rosteringStayHomeCount(entry.name)}× stay-home`:''}</small></span>${rosteringDriverActionButtons(entry,false)}</div>`).join(''):'<p>No drivers in this group.</p>'}</article>`).join('')}</div></section>`;
}
function rosteringBackupEmailText(plan=currentRosteringPlan()) { const groups=rosteringUnrosteredBackupGroups(plan),lines=[`RelayOps unrostered backup list · ${state.rosteringDate}`,'',`VTO 2 · Rescue (${groups.vto2.length})`,...groups.vto2.map(row=>`- ${driverDisplayName(row.name)} · ${row.role}`),'',`VTO 4 · Delivery Associate (${groups.vto4.length})`,...groups.vto4.map(row=>`- ${driverDisplayName(row.name)} · ${row.role}`),'',`Other roles (${groups.other.length})`,...groups.other.map(row=>`- ${driverDisplayName(row.name)} · ${row.role}`)];return lines.join('\n'); }
async function copyRosteringBackupEmailText() { const ok=await writeClipboardText(rosteringBackupEmailText());toast(ok?'Grouped backup email text copied':'Clipboard access was blocked',ok?'success':'error'); }
function rosteringDispatchAssignments() {
  const result={opener1:'',opener2:'',fleet:'',mid:'',closer1:'',closer2:''};let midFallback='';
  scheduleEntriesForDate(state.rosteringDate).forEach(entry=>{const key=headerKey(entry.role),name=driverDisplayName(entry.name);if(!name)return;if(key.includes('firstopeningdispatch'))result.opener1||=name;else if(key.includes('secondopeningdispatch'))result.opener2||=name;else if(key.includes('fleetcoordinator'))result.fleet||=name;else if((key.includes('mid')||key.includes('midshift'))&&key.includes('dispatch'))result.mid||=name;else if(key==='mid'||key==='midshift')midFallback||=name;else if(key.includes('secondcloser')||key.includes('secondclosingdispatch'))result.closer2||=name;else if(key.includes('closingdispatch')||key.includes('firstcloser')||key.includes('firstclosingdispatch'))result.closer1||=name;});
  result.mid||=midFallback;
  return result;
}
function rosteringEmailHelperRows(plan=currentRosteringPlan()) {
  const services=new Map((plan.services||[]).map(service=>[service.id,service]));
  return plan.assignments.filter(row=>row.associate&&services.get(row.serviceId)?.kind==='helper').map(row=>{const helper=driverDisplayName(row.associate),lead=String(row.route||'').trim();return lead&&!/^(?:no route generated|support|helper)$/i.test(lead)?`${lead} > ${helper}`:helper;});
}
function rosteringAllocatedCounts(plan=currentRosteringPlan()) {
  const services=new Map((plan.services||[]).map(service=>[service.id,service]));
  let rivian=0,helper=0;plan.assignments.forEach(row=>{if(!row.associate)return;const service=services.get(row.serviceId);if(service?.kind==='helper')helper++;else if(service?.id!=='xl-donations')rivian++;});
  return {rivian,helper,total:rivian+helper};
}
function rosteringEmailTemplateText(plan=currentRosteringPlan()) {
  const dispatch=rosteringDispatchAssignments(),helpers=rosteringEmailHelperRows(plan),groups=rosteringUnrosteredBackupGroups(plan),counts=rosteringAllocatedCounts(plan),line='---------------------------------------------------',names=rows=>rows.map(row=>driverDisplayName(row.name)).join('\n')||'';
  return [`**Opener:** *1st* ${dispatch.opener1||''} /*2nd* ${dispatch.opener2||''}       **Fleet:** ${dispatch.fleet||''}`,'',`**Mid:** ${dispatch.mid||''}`,'',`**1 st Closer:** *${dispatch.closer1||''}*  **2nd Closer***: ${dispatch.closer2||''}*`,'',line,'**Helpers:**',helpers.join('\n'),line,'','**Back Ups:** ','','**VTO (2)**',names(groups.vto2),'','**VTO (4)**',names(groups.vto4),'',line,'**Allocated:**','',`***${counts.rivian} RIV***`,`***${counts.helper} HELPER***`,`***${counts.total} Total***`].join('\n');
}
async function copyRosteringEmailTemplateText() { const ok=await writeClipboardText(rosteringEmailTemplateText());toast(ok?'Roster email template copied':'Clipboard access was blocked',ok?'success':'error'); }
function openRosteringDriverSwap(name='') {
  const entry=scheduleEntriesForDate(state.rosteringDate).find(row=>driverIdentityKey(row.name)===driverIdentityKey(name));
  if(!entry||!rosteringEntryEligibleForRoster(entry))return toast('Choose an available Rescue or Delivery Associate shift','error');
  const assignments=currentRosteringPlan().assignments.filter(row=>String(row.associate||'').trim());
  if(!assignments.length)return toast('Roster at least one driver before using Swap','error');
  state.pendingRosteringSwap={name:entry.name};state.modal='rostering-driver-swap';render();
}
function applyRosteringDriverSwap() {
  const pending=state.pendingRosteringSwap,assignmentId=document.getElementById('rostering-swap-assignment')?.value||'',target=rosteringAssignment(assignmentId);
  if(!pending||!target)return toast('Choose the rostered driver to swap','error');
  const entry=scheduleEntriesForDate(state.rosteringDate).find(row=>driverIdentityKey(row.name)===driverIdentityKey(pending.name));
  if(!entry||!rosteringEntryEligibleForRoster(entry))return toast('That PAYCOM driver is no longer available','error');
  const incoming=canonicalDriverName(contactForMorningDriver(entry.name)?.name||entry.name),displaced=target.associate;
  if(driverIdentityKey(incoming)===driverIdentityKey(displaced))return toast('Choose a different rostered driver','error');
  target.associate=incoming;target.role=entry.role||'';target.source='paycom-swap';touchRosteringPlan();state.pendingRosteringSwap=null;state.modal=null;persist();render();toast(`${incoming} replaced ${displaced} · ${displaced} is now unrostered`);
}
function rosteringPaycomHtml(plan=currentRosteringPlan()) {
  const assigned=rosteringAssignedNameKeys(plan),seen=new Set(),entries=scheduleEntriesForDate(state.rosteringDate).filter(entry=>{const key=driverIdentityKey(entry.name);if(!key||seen.has(key))return false;seen.add(key);return true;}).sort((a,b)=>Number(assigned.has(driverIdentityKey(b.name)))-Number(assigned.has(driverIdentityKey(a.name)))||driverDisplayName(a.name).localeCompare(driverDisplayName(b.name),undefined,{sensitivity:'base'})),category=state.rosteringPaycomCategory||'all',categories=[['all','All'],['rostered','Rostered'],['unrostered','Unrostered'],['vto4','Delivery Associate'],['vto2','Rescue / VTO 2'],['midshift','Midshift'],['modified','Modified Duty'],['training','Training'],['helper','Helpers'],['other','Other']];
  const categoryCount=key=>entries.filter(entry=>key==='all'||key==='rostered'&&assigned.has(driverIdentityKey(entry.name))||key==='unrostered'&&!assigned.has(driverIdentityKey(entry.name))||rosteringPaycomCategoryFor(entry)===key).length;
  return `<section class="card rostering-paycom"><header><div><span class="eyebrow">PAYCOM</span><h2>All Scheduled driver shifts</h2><p>${state.scheduleImportName?`Source: ${esc(state.scheduleImportName)}`:'Import PAYCOM, then choose Random or ABC before Auto Roster.'}</p></div><div><button class="btn" data-action="schedule-import">${ICONS.upload} Import PAYCOM</button><button class="btn primary" data-action="rostering-auto-roster">Auto Roster scheduled drivers</button></div></header><div class="rostering-paycom-stats"><span><b>${entries.length}</b> scheduled shifts</span><span><b>${entries.filter(entry=>assigned.has(driverIdentityKey(entry.name))).length}</b> rostered</span><span><b>${entries.filter(entry=>rosteringStayHomeCount(entry.name)>0).length}</b> fairness flags</span></div><div class="rostering-paycom-categories" role="group" aria-label="Filter PAYCOM shifts">${categories.map(([key,label])=>`<button type="button" class="${category===key?'active':''}" data-action="rostering-paycom-category" data-rostering-category="${key}">${esc(label)} <b>${categoryCount(key)}</b></button>`).join('')}</div><label class="roster-search rostering-paycom-search">${ICONS.search||'⌕'}<input type="search" data-rostering-paycom-search placeholder="Search names or shift roles" aria-label="Search PAYCOM drivers"></label><div class="rostering-paycom-list">${entries.length?entries.map(entry=>{const isAssigned=assigned.has(driverIdentityKey(entry.name)),entryCategory=rosteringPaycomCategoryFor(entry),visible=category==='all'||category==='rostered'&&isAssigned||category==='unrostered'&&!isAssigned||category===entryCategory,training=entryCategory==='training',haystack=nameKey(`${driverDisplayName(entry.name)} ${entry.role} ${entryCategory}`);return `<div data-rostering-paycom-name="${esc(haystack)}" data-rostering-paycom-category="${entryCategory}" data-rostering-paycom-status="${isAssigned?'rostered':'unrostered'}" class="${isAssigned?'assigned':'unassigned'}" ${visible?'':'hidden'} ${driverProfileAttrs(entry.name)}><span><strong>${esc(driverDisplayName(entry.name))}</strong><small>${esc(entry.role)} · ${esc(entry.start)}${entry.end?`–${esc(entry.end)}`:''}</small></span>${rosteringPaycomFairnessBadge(entry.name)}${driverFlagBadgeHtml(entry.name)}${training?`<button class="btn small" data-action="rostering-focus-training">Training box</button>`:rosteringDriverActionButtons(entry,isAssigned)}</div>`;}).join(''):'<div class="rostering-empty"><strong>No PAYCOM shifts for this date</strong><span>Import CSV, XLS, XLSX, PDF, image, or text.</span></div>'}</div>${rosteringBackupBuilderHtml(plan)}</section>`;
}
function rosteringTrainingKey(name='') { return `${state.rosteringDate}|${driverIdentityKey(name)}`; }
function rosteringManualTrainingKey(name='',kind='ridealong') { return `${state.rosteringDate}|${kind==='trainer'?'trainer':'ridealong'}|${driverIdentityKey(name)}`; }
function rosteringManualTrainingRows(kind='') {
  return Object.entries(state.rosteringManualTraining||{}).filter(([key,row])=>key.startsWith(`${state.rosteringDate}|`)&&(!kind||row.kind===kind)).map(([key,row])=>({...row,key,name:canonicalDriverName(row.name||''),manual:true,date:row.date||state.rosteringDate,role:row.kind==='trainer'?'Manual Trainer':'Manual Ridealong'})).filter(row=>row.name);
}
function rosteringRidealongEntries() {
  const scheduled=[...new Map(scheduleEntriesForDate(state.rosteringDate).filter(entry=>isRidealongRole(entry.role)).map(entry=>[driverIdentityKey(entry.name),{...entry,manual:false}])).values()];
  const byIdentity=new Map(scheduled.map(entry=>[driverIdentityKey(entry.name),entry]));
  rosteringManualTrainingRows('ridealong').forEach(row=>{const key=driverIdentityKey(row.name);if(key&&!byIdentity.has(key))byIdentity.set(key,row);});
  return [...byIdentity.values()].sort((a,b)=>driverDisplayName(a.name).localeCompare(driverDisplayName(b.name),undefined,{sensitivity:'base'}));
}
function rosteringTrainerUnavailable(name='') {
  const keys=new Set([nameKey(name),driverIdentityKey(name)].filter(Boolean));
  return [...keys].some(key=>{const dailyKey=`${state.rosteringDate}|${key}`;return Boolean(state.scheduleStayHome?.[dailyKey]||state.scheduleReductions?.[dailyKey]||state.callOffDriverKeys?.[dailyKey]);});
}
function rosteringTrainerCandidates() {
  const scheduled=new Set(scheduleEntriesForDate(state.rosteringDate).map(entry=>driverIdentityKey(entry.name)));
  const rows=[...teamDriverRows().filter(driver=>driverHasCapability(driver.name,'trainer')).map(driver=>({name:driver.name,manual:false})),...rosteringManualTrainingRows('trainer')];
  const byIdentity=new Map();rows.forEach(row=>{const name=canonicalDriverName(row.name),key=driverIdentityKey(name);if(key&&!rosteringTrainerUnavailable(name)&&!byIdentity.has(key))byIdentity.set(key,{...row,name});});
  return [...byIdentity.values()].sort((a,b)=>Number(scheduled.has(driverIdentityKey(b.name)))-Number(scheduled.has(driverIdentityKey(a.name)))||Number(b.manual)-Number(a.manual)||rosteringStayHomeCount(a.name)-rosteringStayHomeCount(b.name)||a.name.localeCompare(b.name));
}
function assignRosteringTrainer(ridealong='',trainer='') {
  const ridealongKey=driverIdentityKey(ridealong),entry=rosteringRidealongEntries().find(row=>driverIdentityKey(row.name)===ridealongKey);if(!entry)return toast('Ridealong shift was not found for this date','error');
  if(trainer&&!rosteringTrainerCandidates().some(row=>driverIdentityKey(row.name)===driverIdentityKey(trainer)))return toast('Add this driver as a manual trainer or mark Trainer on Drivers & Team first','error');
  if(trainer&&driverIdentityKey(trainer)===driverIdentityKey(entry.name))return toast('A ridealong driver cannot be assigned as their own trainer','error');
  if(trainer&&rosteringTrainerUnavailable(trainer))return toast('That trainer is unavailable for this date','error');
  const key=rosteringTrainingKey(entry.name);if(trainer)state.rosteringTrainingMatches[key]={ridealong:entry.name,trainer:canonicalDriverName(trainer),date:state.rosteringDate,at:new Date().toISOString()};else delete state.rosteringTrainingMatches[key];persistRosteringSlice();renderRosteringContent();toast(trainer?`${entry.name} matched with trainer ${trainer}`:`Trainer match cleared for ${entry.name}`);
}
function clearRosteringTrainerMatch(ridealong='') { const key=rosteringTrainingKey(ridealong),record=state.rosteringTrainingMatches[key];if(!record)return;delete state.rosteringTrainingMatches[key];persistRosteringSlice();renderRosteringContent();toast(`${record.ridealong||ridealong} is ready for a trainer swap`); }
function openRosteringTrainingAdd(kind='ridealong') { state.pendingRosteringTrainingAdd={kind:kind==='trainer'?'trainer':'ridealong'};state.modal='rostering-training-add';render(); }
function saveRosteringTrainingAdd() {
  const kind=document.getElementById('rostering-training-kind')?.value==='trainer'?'trainer':'ridealong',raw=String(document.getElementById('rostering-training-name')?.value||'').replace(/\s+/g,' ').trim();
  const name=canonicalDriverName(raw);if(!name)return toast('Enter a driver name for training','error');
  const key=rosteringManualTrainingKey(name,kind);state.rosteringManualTraining[key]={date:state.rosteringDate,kind,name,at:new Date().toISOString()};state.pendingRosteringTrainingAdd=null;state.modal=null;persist();render();toast(`${driverDisplayName(name)} added as ${kind==='trainer'?'a trainer':'a ridealong'}`);
}
function removeRosteringManualTraining(key='') {
  const row=state.rosteringManualTraining?.[key];if(!row)return;
  delete state.rosteringManualTraining[key];if(row.kind==='ridealong')delete state.rosteringTrainingMatches[rosteringTrainingKey(row.name)];
  persistRosteringSlice();renderRosteringContent();toast(`${driverDisplayName(row.name)} removed from manual training`);
}
function rosteringTrainingHtml() {
  const ridealongs=rosteringRidealongEntries(),trainers=rosteringTrainerCandidates(),scheduled=new Set(scheduleEntriesForDate(state.rosteringDate).map(entry=>driverIdentityKey(entry.name))),manualTrainers=rosteringManualTrainingRows('trainer');
  return `<section class="card rostering-training" id="rostering-training-box"><header><div><span class="eyebrow">RIDEALONGS / TRAINING</span><h2>Training matches</h2><p>Every PAYCOM or manual ridealong stays on its own row. Trainers scheduled today are suggested first.</p></div><div class="rostering-training-head-actions"><button class="btn small" data-action="open-rostering-training-add" data-training-kind="ridealong">+ Ridealong</button><button class="btn small" data-action="open-rostering-training-add" data-training-kind="trainer">+ Trainer</button><b>${ridealongs.length}</b></div></header><div class="rostering-training-list">${ridealongs.length?ridealongs.map(entry=>{const key=rosteringTrainingKey(entry.name),saved=state.rosteringTrainingMatches[key]?.trainer||'',eligible=trainers.filter(driver=>driverIdentityKey(driver.name)!==driverIdentityKey(entry.name)),matched=eligible.find(driver=>driverIdentityKey(driver.name)===driverIdentityKey(saved))?.name||'',suggested=eligible.find(driver=>scheduled.has(driverIdentityKey(driver.name)))?.name||eligible[0]?.name||'',stale=Boolean(saved&&!matched);return `<article class="${entry.manual?'manual-training-row':''}"><div><strong>${esc(driverDisplayName(entry.name))}</strong><span>${entry.manual?'Manual ridealong':esc(entry.role)}${entry.start?` · ${esc(entry.start)}`:''}${entry.end?`–${esc(entry.end)}`:''}</span></div><label><span>Trainer</span><select data-rostering-training-match="${esc(entry.name)}"><option value="">Choose trainer…</option>${eligible.map(driver=>`<option value="${esc(driver.name)}" ${driverIdentityKey(matched)===driverIdentityKey(driver.name)?'selected':''}>${esc(driverDisplayName(driver.name))}${scheduled.has(driverIdentityKey(driver.name))?' · scheduled':driver.manual?' · manual':''}</option>`).join('')}</select></label>${matched?`<span class="rostering-trainer-match"><em>✓ ${esc(driverDisplayName(matched))}</em><button class="btn small" data-action="rostering-swap-trainer" data-ridealong-name="${esc(entry.name)}">Swap Trainer</button>${entry.manual?`<button class="btn small ghost" data-action="remove-rostering-manual-training" data-manual-training-key="${esc(entry.key)}">Remove</button>`:''}</span>`:suggested?`<span class="rostering-trainer-match"><button class="btn small" data-action="rostering-use-trainer-suggestion" data-ridealong-name="${esc(entry.name)}" data-trainer-name="${esc(suggested)}">${stale?'Rematch':'Use'} ${esc(driverDisplayName(suggested))}</button>${entry.manual?`<button class="btn small ghost" data-action="remove-rostering-manual-training" data-manual-training-key="${esc(entry.key)}">Remove</button>`:''}</span>`:`<span class="rostering-trainer-match"><em class="needs-trainer">${stale?'Saved trainer unavailable':'Add a trainer'}</em>${entry.manual?`<button class="btn small ghost" data-action="remove-rostering-manual-training" data-manual-training-key="${esc(entry.key)}">Remove</button>`:''}</span>`}</article>`;}).join(''):'<div class="rostering-empty"><strong>No ridealong shifts found</strong><span>Import PAYCOM or use + Ridealong to add one manually.</span></div>'}</div>${manualTrainers.length?`<div class="rostering-manual-trainers"><strong>Manual trainers</strong>${manualTrainers.map(row=>`<span>${esc(driverDisplayName(row.name))}<button data-action="remove-rostering-manual-training" data-manual-training-key="${esc(row.key)}" aria-label="Remove ${esc(row.name)}">×</button></span>`).join('')}</div>`:''}<footer><span>${trainers.length} Trainer${trainers.length===1?'':'s'} available</span><small>Trainer and Helper Driver tags are managed on Drivers & Team. Use + Trainer for one-day ridealong coverage.</small></footer></section>`;
}
function rosteringDriverNotesHtml() {
  const scheduled=[...new Map(scheduleEntriesForDate(state.rosteringDate).filter(entry=>scheduleRoleGroup(entry.role)==='driver').map(entry=>[driverIdentityKey(entry.name),canonicalDriverName(entry.name)])).values()].sort((a,b)=>driverDisplayName(a).localeCompare(driverDisplayName(b),undefined,{sensitivity:'base'}));
  const flagged=scheduled.filter(name=>driverProfileFlags(name).length).length;
  return `<section class="card rostering-driver-notes"><header><div><span class="eyebrow">DRIVER NOTES</span><h2>Scheduled driver flags</h2><p>Alphabetical PAYCOM list · click any driver to update shared notes.</p></div><b>${flagged}</b></header><label class="roster-search rostering-driver-note-search">${ICONS.search||'⌕'}<input type="search" data-rostering-driver-note-search placeholder="Search driver flags" aria-label="Search driver flags"></label><div class="rostering-driver-note-list">${scheduled.length?scheduled.map(name=>`<div data-rostering-driver-note-name="${esc(nameKey(`${driverDisplayName(name)} ${driverFlagSummary(name).join(' ')}`))}">${driverFlagsCardHtml(name)}</div>`).join(''):'<div class="rostering-empty"><strong>No scheduled drivers</strong><span>Import PAYCOM to build this list.</span></div>'}</div></section>`;
}
function rosteringEmailHandoffHtml(plan=currentRosteringPlan()) {
  const text=rosteringEmailTemplateText(plan),counts=rosteringAllocatedCounts(plan);
  return `<section class="card rostering-email-handoff"><header><div><span class="eyebrow">EMAIL HANDOFF</span><h2>Unrostered shifts template</h2><p>Copy this into the route-total email after reviewing names and counts.</p></div><button class="btn small primary" data-action="copy-rostering-email-template">${ICONS.copy} Copy text</button></header><textarea readonly aria-label="Formatted unrostered shifts email template">${esc(text)}</textarea><footer><span>${counts.rivian} RIV · ${counts.helper} Helper · ${counts.total} total allocated</span><small>Backups come from unrostered PAYCOM shifts.</small></footer></section>`;
}
function rosteringHelperShiftsHtml(plan=currentRosteringPlan()) {
  const helpers=rosteringHelperPoolRows(),assigned=rosteringAssignedNameKeys(plan),hasHelperService=plan.services.some(service=>service.kind==='helper');
  return `<section class="card rostering-helper-shifts"><header><div><span class="eyebrow">HELPER SHIFTS</span><h2>Helper box</h2><p>${hasHelperService?'Helpers fill only the confirmed Helper positions.':'No Helper service was confirmed; scheduled helpers stay here and are not added to the route roster.'}</p></div><b>${helpers.length}</b></header><div>${helpers.length?helpers.map(entry=>{const added=assigned.has(driverIdentityKey(entry.name));return `<article class="${added?'added':'missing'}"><span>${ICONS.users}<strong>${esc(contactForMorningDriver(entry.name)?.name||entry.name)}</strong><small>${esc(entry.start)}${entry.end?`–${esc(entry.end)}`:''}</small></span><em>${added?'✓ Added to Helper roster':'Waiting in Helper box'}</em></article>`;}).join(''):'<div class="rostering-helper-empty">No Helper shifts are scheduled for this date.</div>'}</div></section>`;
}
function rosteringPage() {
  const plan=currentRosteringPlan(),duplicates=rosteringDuplicateNameKeys(plan),confirmed=plan.services.reduce((sum,service)=>sum+service.confirmed,0),rostered=plan.assignments.filter(row=>row.associate).length,missing=Math.max(0,confirmed-rostered),flagged=new Set(plan.assignments.filter(row=>row.associate&&rosteringStayHomeCount(row.associate)>0).map(row=>nameKey(row.associate))).size;
  return `${contextBar(`<span class="status ${missing?'warn':'blue'}">${missing?`${missing} open positions`:'Roster complete'}</span>`)}<section class="rostering-command card"><div><span class="eyebrow">DISPATCH SCHEDULING</span><h1>Rostering</h1><p>Build confirmed services, catch unfilled shifts, and rotate hours fairly.</p></div><label><span>Roster date</span><input type="date" data-rostering-date value="${esc(state.rosteringDate)}"></label><label><span>Auto roster order</span><select data-rostering-auto-mode><option value="random" ${state.rosteringAutoMode==='random'?'selected':''}>Random (default)</option><option value="abc" ${state.rosteringAutoMode==='abc'?'selected':''}>ABC</option></select></label><div class="rostering-command-actions"><a class="btn" href="${AMAZON_SCHEDULING_URL}&date=${encodeURIComponent(state.rosteringDate)}&navMenuVariant=external" target="_blank" rel="noopener">Open Amazon Scheduling</a><button class="btn" data-action="rostering-import-screenshot">${ICONS.upload} Import roster screenshot</button><button class="btn auto-roster-button" data-action="rostering-auto-roster">Auto Roster · ${state.rosteringAutoMode==='abc'?'ABC':'Random'}</button><button class="btn primary" data-action="rostering-add-service">+ Add service</button></div></section><section class="rostering-kpis"><article><span>Confirmed</span><strong>${confirmed}</strong><small>service positions</small></article><article><span>Rostered</span><strong>${rostered}</strong><small>associates added</small></article><article class="${missing?'warn':''}"><span>Missing</span><strong>${missing}</strong><small>shifts need drivers</small></article><article class="fair"><span>Fairness flags</span><strong>${flagged}</strong><small>stay-home history</small></article></section>${rosteringHelperShiftsHtml(plan)}<section class="rostering-board"><div class="rostering-board-title"><div><span class="eyebrow">CONFIRMED SERVICES</span><h2>Service roster</h2></div><span>${plan.importName?`Screenshot: ${esc(plan.importName)}`:plan.updatedAt?`Saved ${esc(new Date(plan.updatedAt).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'}))}`:'Ready to customize'}</span></div>${plan.services.map(service=>rosteringServiceHtml(service,plan,duplicates)).join('')}</section><div class="rostering-lower-grid">${rosteringPaycomHtml(plan)}<div class="rostering-training-stack">${rosteringTrainingHtml()}${rosteringDriverNotesHtml()}${rosteringEmailHandoffHtml(plan)}</div></div>`;
}

function waveMinutes(value='') {
  const m=String(value).trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i); if(!m)return 9999;
  let h=Number(m[1])%12; if((m[3]||'').toUpperCase()==='PM')h+=12; return h*60+Number(m[2]);
}
function routeCompare(a='',b='') { return String(a).localeCompare(String(b),undefined,{numeric:true,sensitivity:'base'}); }
function stagingArea(value='') { const m=String(value).toUpperCase().match(/^STG\.([A-Z]+)/); return m?`STG.${m[1]}`:'Other'; }
function ensureMorningRouteUids() { (state.morningRoutes||[]).forEach((row,index)=>{if(!row.routeUid)row.routeUid=`MR-${Date.now().toString(36)}-${index}-${Math.random().toString(36).slice(2,7)}`;}); }
function morningRouteByUid(uid='') { return uid?(state.morningRoutes||[]).find(row=>row.routeUid===uid):null; }
function morningWaveList() { return [...new Set(state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>r.wave))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)); }
function padForWave(wave) { const pads=['A','B','C','A','B','C']; const i=morningWaveList().indexOf(wave); return pads[Math.max(0,i)%pads.length]; }
function allMorningRows() {
  ensureMorningRouteUids();
  return state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>({...r,pad:r.padOverride||padForWave(r.wave)})).sort((a,b)=>waveMinutes(a.wave)-waveMinutes(b.wave)||routeCompare(a.route,b.route)||a.staging.localeCompare(b.staging,undefined,{numeric:true}));
}
function filteredMorningRows() {
  return allMorningRows().filter(r=>
    (state.morningFilters.wave==='all'||r.wave===state.morningFilters.wave)&&
    (state.morningFilters.staging==='all'||r.staging===state.morningFilters.staging)&&
    (state.morningFilters.pad==='all'||r.pad===state.morningFilters.pad)
  );
}
function morningFiltersAreActive() {
  const filters=state.morningFilters||{};
  return ['wave','staging','pad'].some(key=>filters[key]&&filters[key]!=='all');
}
function fixedMorningSections(rows=filteredMorningRows()) {
  const visibleIds=new Set(rows.map(row=>row.routeUid||`${normalizeCxRoute(row.route)}|${nameKey(row.driver)}`));
  return morningSections(allMorningRows()).map(section=>({...section,rows:section.rows.filter(row=>visibleIds.has(row.routeUid||`${normalizeCxRoute(row.route)}|${nameKey(row.driver)}`))})).filter(section=>!section.dsp&&(section.rows.length||!morningFiltersAreActive()));
}
function morningFixedSectionByRoute() {
  const byRoute=new Map();
  morningSections(allMorningRows()).forEach(section=>section.rows.forEach(row=>{const key=normalizeCxRoute(row.route);if(key&&!byRoute.has(key))byRoute.set(key,section.label);}));
  return byRoute;
}
function morningFixedSectionKey(label='') { const key=String(label||'').toUpperCase().replace(/[^A-Z0-9]/g,'');return key==='ADHOC'?'ADHOCS':key; }

function morningFilterScopeText() {
  const filters=state.morningFilters||{};
  const parts=[];
  if(filters.wave&&filters.wave!=='all')parts.push(filters.wave);
  if(filters.staging&&filters.staging!=='all')parts.push(filters.staging);
  if(filters.pad&&filters.pad!=='all')parts.push(`Pad ${filters.pad}`);
  return parts.length?parts.join(' · '):'All filtered waves';
}

function morningSheetsBridgeHtml(payload=morningSheetsConnectorPayload()) {
  const rows=filteredMorningRows(), proof=morningSheetsHandoffProof(payload), connected=Boolean(state.morningSheetsEndpoint);
  const routeCount=rows.filter(row=>!row._blank).length;
  const waveCount=new Set(rows.map(row=>row.wave).filter(Boolean)).size;
  const receipt=state.morningSheetsLastReceipt;
  const receiptText=receipt?`${receipt.status==='confirmed'?'Google confirmed':'Sent — verify'} ${receipt.writeRange||payload.writeRange}`:'Not sent yet';
  return `<section class="morning-sheet-bridge card ${connected?'connected':'setup'}" aria-label="Google Sheets bridge"><div class="bridge-route"><span class="bridge-node source"><b>1</b><strong>Filtered waves</strong><small>${esc(morningFilterScopeText())}<br>${routeCount} routes · ${waveCount} wave${waveCount===1?'':'s'}</small></span><i>→</i><span class="bridge-node check"><b>2</b><strong>Fixed Ops Log check</strong><small>OPS LOG 2026 · ${payload.sections.length} sections<br>Dry run happens before every send</small></span><i>→</i><span class="bridge-node destination"><b>3</b><strong>Dated Ops Log</strong><small>${esc(payload.sheetName)} or ${esc(payload.sheetNameCandidates?.[1]||payload.sheetName)}<br>${esc(receiptText)}</small></span></div><div class="bridge-actions bridge-send-pair"><button class="btn primary bridge-send" data-action="sync-filtered-morning-to-sheets">${ICONS.link} Send filtered waves${connected?'':' · connect first'}</button><button class="btn rts-send-only" data-action="send-rts-to-sheets">${ICONS.calendar} Send RTS Times to Google Sheets</button><a class="btn" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open Google Sheet</a></div><p>${connected?'Both send buttons use the same Google connector and dated Ops Log. RTS send changes only Planned RTS and wave labels.':'Connect the Apps Script /exec URL once. After that, both send buttons use the same Google Sheet.'}</p></section>`;
}

function morningSheetPage() {
  const rows=filteredMorningRows(), waves=morningWaveList(), staging=[...new Set(state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>r.staging))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  const excluded=state.lastImportExcluded;
  const groups=morningSections(rows);
  const irregular=rows.filter(r=>r.plannedRtsIssue).length;
  const sheetMode=state.copyMode?'copy':'edit';
  const connected=Boolean(state.morningSheetsEndpoint),receipt=state.morningSheetsLastReceipt;
  const connectorStatus=connected?(receipt?.status==='confirmed'?'Google Sheet confirmed':'Google Sheet connected'):'Google Sheet needs setup';
  return `${contextBar(`<span class="status blue">Earliest waves first</span>`)}
  <section class="morning-workflow card" aria-label="Build today's morning sheet">
    <div class="morning-workflow-head"><div><span class="eyebrow">${esc(state.dspCode)} OPENING OPERATIONS</span><h2>Build today’s morning sheet</h2><p>Press the buttons from left to right. RelayOps matches every CX and keeps the earliest waves first.</p></div><label class="operation-date-picker"><span>Day of operation</span><input type="date" data-operation-date value="${esc(state.morningOperationDate)}"><small>Google tab: ${esc(operationDateTabNames(state.morningOperationDate).join(' or '))}</small></label><span class="morning-connector-pill ${connected?'ready':'needs-setup'}"><i></i>${esc(connectorStatus)}</span></div>
    <div class="morning-workflow-section"><div class="morning-workflow-label"><b>Morning setup</b><span>Complete these four steps before stand-up.</span></div><div class="morning-workflow-grid">
      <button class="morning-step primary-step" data-action="import"><b>1</b><span>${ICONS.upload}<strong>Upload day files</strong><small>DAYOFOPSPLAN + ROUTE_DJT6</small></span></button>
      <button class="morning-step" data-action="assign-operational-vans"><b>2</b><span>${ICONS.van}<strong>Assign safe vans</strong><small>Active + operational only</small></span></button>
      <button class="morning-step" data-action="equipment-import"><b>3</b><span>${ICONS.phone}<strong>Add devices</strong><small>Device and Portable Import</small></span></button>
      <button class="morning-step send-step" data-action="sync-filtered-morning-to-sheets"><b>4</b><span>${ICONS.link}<strong>Send Morning Sheet</strong><small>${connected?'To today’s Google tab':'Connect Google Sheet first'}</small></span></button>
    </div></div>
    <div class="morning-later-row"><div class="morning-workflow-label"><b>Later: add RTS times</b><span>Use this after the Itineraries file is ready.</span></div><div class="morning-later-actions"><button class="btn" data-action="itineraries-rts-import"><b>5</b>${ICONS.calendar}<span>Import RTS times<small>Itineraries_DJT6</small></span></button><button class="btn rts-send-only" data-action="send-rts-to-sheets"><b>6</b>${ICONS.link}<span>Send RTS times<small>Updates Planned RTS only</small></span></button><a class="btn morning-open-sheet" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open Google Sheet ↗</a></div></div>
  </section>
  <details class="morning-more-tools card" open><summary><span><strong>More morning tools</strong><small>Optional filters, editing, van choices, and recovery</small></span><b>Hide</b></summary><div class="morning-tools-body">
    <section class="morning-tool-group filter-group"><div class="morning-tool-heading"><span><strong>Find routes</strong><small>Show only the part of the sheet you need.</small></span><div class="morning-kpi-pills"><i><b>${rows.length}</b> routes</i><i><b>${rows.reduce((n,r)=>n+r.packages,0).toLocaleString()}</b> packages</i><i><b>${rows.reduce((n,r)=>n+r.stops,0).toLocaleString()}</b> stops</i><i class="${irregular?'warning':''}"><b>${irregular}</b> RTS flags</i></div></div><div class="morning-filter-form"><label><span>Wave</span><select data-morning-filter="wave"><option value="all">All waves</option>${waves.map(v=>`<option ${state.morningFilters.wave===v?'selected':''}>${v}</option>`).join('')}</select></label><label><span>Staging</span><select data-morning-filter="staging"><option value="all">All staging locations</option>${staging.map(v=>`<option ${state.morningFilters.staging===v?'selected':''}>${v}</option>`).join('')}</select></label><label><span>Pad</span><select data-morning-filter="pad"><option value="all">All pads</option>${['A','B','C'].map(v=>`<option ${state.morningFilters.pad===v?'selected':''}>${v}</option>`).join('')}</select></label><button class="btn subtle" data-action="clear-morning-filters">Clear filters</button><span class="morning-sort-note">${ICONS.chevron} Earliest wave first</span></div></section>
    <div class="morning-tool-grid">
      <section class="morning-tool-group"><div class="morning-tool-heading"><span><strong>Work with the sheet</strong><small>Edit, select, or make the sheet compact.</small></span></div><div class="morning-tool-actions"><button class="btn ${state.editMode?'lime':''}" data-action="toggle-morning-edit">${state.editMode?'✓ Finish editing':'✎ Edit sheet'}</button><button class="btn ${state.copyMode?'lime':''}" data-action="toggle-morning-copy">${state.copyMode?'✓ Exit copy mode':'Copy cells'}</button><button class="btn ${state.fitMorningRows?'lime':''}" data-action="toggle-fit-rows">${state.fitMorningRows?'✓ Fit to drivers':'Remove blank rows'}</button></div></section>
      <section class="morning-tool-group"><div class="morning-tool-heading"><span><strong>Choose vans another way</strong><small>Optional alternatives to safe automatic assignment.</small></span></div><div class="morning-tool-actions morning-vehicle-actions"><button class="btn" data-action="assign-vans-by-parking">${ICONS.van} Parking order</button><button class="btn" data-action="assign-ev-low">EV 1–58 low → high</button><button class="btn" data-action="assign-ev-random">Random EVs</button><button class="btn" data-action="assign-gas-vans">Gas vehicles</button><button class="btn danger-soft" data-action="clear-morning-evs">Clear EVs</button></div></section>
      <section class="morning-tool-group"><div class="morning-tool-heading"><span><strong>Backup and recovery</strong><small>Use only when you need to undo or paste manually.</small></span></div><div class="morning-tool-actions"><button class="btn" data-action="sheet-undo" ${state.sheetHistory?.past?.length?'':'disabled'}>↶ Undo</button><button class="btn" data-action="sheet-redo" ${state.sheetHistory?.future?.length?'':'disabled'}>↷ Redo</button><button class="btn" data-action="open-sheet-history">History</button><button class="btn" data-action="copy-morning-visible">${ICONS.copy} Copy fallback</button><button class="btn" data-action="open-sheets-helper">Paste box</button><button class="btn danger-soft" data-action="clear-morning-sheet">${ICONS.trash} Clear Morning Sheet</button></div></section>
    </div>
  </div></details>
  ${state.copyMode?copyModeToolbar(groups):''}
  ${state.copyMode?`<div class="edit-help copy-help">Copy mode is on. Drag across cells exactly like Google Sheets, watch the blue highlight, then press ⌘C on Mac or Ctrl+C on Windows. Divider columns I and N split the original A–V Ops Log into setup, inspection, and operations blocks.</div>`:state.editMode?`<div class="edit-help">Editing is on. Columns A–V and every row are labeled like Google Sheets. Click and drag white cells to select a rectangle, press ⌘C to copy, or paste tabbed rows from Sheets to fill across/down.</div>`:''}
  <article class="card morning-board ${state.copyMode?'copy-board':state.editMode?'edit-board':'view-board'}"><div class="sheet-scroll"><table class="ops-sheet morning-template-sheet exact-ops-sheet ${state.copyMode?'copy-ops-sheet':''}"><thead>${sheetModeHeader(morningTemplateHeaders,sheetMode)}</thead><tbody>${groups.length?groups.map((section,sectionIndex)=>morningWaveGroup(section,sectionIndex)).join(''):`<tr><td colspan="23"><div class="empty-state"><h3>No routes match these filters</h3><p>Clear a filter or upload a new day-of-operations file.</p></div></td></tr>`}</tbody></table></div></article>
  <div class="dispatcher-rating card"><div><strong>How easy was this opening sheet?</strong><span>Your 5-star tap helps find what needs to be smoother next.</span></div><div class="stars">${[1,2,3,4,5].map(n=>`<button class="${state.rating>=n?'active':''}" data-action="rate-service" data-rating="${n}" aria-label="${n} stars">★</button>`).join('')}</div></div>`;
}

function morningConnectorGuide() {
  const connected=Boolean(state.morningSheetsEndpoint),tabs=operationDateTabNames(state.morningOperationDate);
  return `<details class="morning-connectors card"><summary><div><strong>Ops Log connector setup</strong><span>Google Sheets is ready through Apps Script. Slack stays locked until its secure connector is built.</span></div><b>Open</b></summary><div class="morning-connector-grid"><div><strong>1 · Slack / day file</strong><span>Locked for now. Use Amazon XLSX/CSV upload so no dispatcher expects an unfinished connection to work.</span><button class="btn small locked" disabled>Slack Import · locked</button></div><div><strong>2 · Cortex / Amazon Logistics</strong><span>Upload XLSX/CSV files. RelayOps reads them locally and filters ${esc(state.dspCode)} routes.</span><button class="btn small primary" data-action="import">Upload Amazon files</button></div><div><strong>3 · Google Sheets Ops Log</strong><span>${connected?`Connected. Sends only to ${esc(tabs.join(' or '))} using the original A:V layout.`:'Install the Apps Script once, save the /exec URL, then send to the selected operation-date tab.'}</span><button class="btn small lime" data-action="morning-sheets-connector">${connected?'Open Ops Log connector':'Connect Ops Log'}</button><a class="btn small" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open ops log</a></div></div><p>If the exact date tab is missing, RelayOps creates it by duplicating the blank OPS LOG 2026 template.</p></details>`;
}

const defaultMorningWaveTimes=['11:15 AM','11:20 AM','11:25 AM','11:40 AM','11:45 AM'];
function morningWaveOverrideKey(label='') { return `${state.morningOperationDate}|${morningFixedSectionKey(label)}`; }
function morningWaveTimeOverride(section={}) {
  const key=morningWaveOverrideKey(section.label||'');
  const value=state.morningWaveTimeOverrides?.[key];
  return value&&typeof value==='object'?value:null;
}
function coreMorningWaveLabel(sectionKey='',fallback='') {
  const match=String(sectionKey||'').match(/^wave-(\d+)$/i);
  return match?`WAVE ${match[1]}`:fallback;
}
function saveMorningWaveTimeValue(label='',wave='',rawValue='') {
  const key=morningWaveOverrideKey(label),value=String(rawValue||'').trim(),fallback=String(wave||'').trim();
  state.morningWaveTimeOverrides=state.morningWaveTimeOverrides&&typeof state.morningWaveTimeOverrides==='object'?state.morningWaveTimeOverrides:{};
  if(!value){delete state.morningWaveTimeOverrides[key];return {wave:fallback,count:null};}
  const match=value.match(/^(.*?)(?:\s*\((\d+)\))?\s*$/),timeInput=String(match?.[1]||'').trim(),countText=match?.[2];
  const nextWave=normalizedPicklistWave(timeInput,fallback)||fallback;
  if(nextWave&&fallback&&nextWave!==fallback){
    state.morningRoutes.filter(row=>row.dsp===state.dspCode&&row.wave===fallback&&!isExplicitHelperMorningRoute(row)&&!isExplicitAdhocMorningRoute(row)).forEach(row=>{row.wave=nextWave;});
  }
  state.morningWaveTimeOverrides[key]={time:nextWave||fallback,count:countText===undefined?null:Math.max(0,Number(countText)||0)};
  return state.morningWaveTimeOverrides[key];
}
function morningBlankWaveAnchors() {
  const existing=morningSections(allMorningRows()).filter(section=>/^WAVE\s*[1-5]$/i.test(section.label)).slice(0,5);
  return Array.from({length:5},(_,index)=>{
    const label=`WAVE ${index+1}`,section=existing[index]||{},override=morningWaveTimeOverride({label}),wave=override?.time||section.wave||defaultMorningWaveTimes[index];
    const pad=section.rows?.[0]?.padOverride||section.rows?.[0]?.pad||['A','B','C','A','B'][index];
    return {routeUid:`WAVE-ANCHOR-${state.morningOperationDate}-${index+1}`,dsp:state.dspCode,driver:'',route:`__blank_wave_${index+1}`,service:'Morning Sheet wave anchor',wave,staging:'',pad,padOverride:pad,ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,stops:'',packages:'',packageReturns:'',endTime:'',rtsTime:'',plannedRts:'',clockOutTime:'',_blank:true,_waveAnchor:true};
  });
}

function morningSections(rows) {
  const regular=rows.filter(r=>isCxMorningRoute(r)||(!isExplicitHelperMorningRoute(r)&&!isExplicitAdhocMorningRoute(r)));
  const importedWaves=[...new Set(regular.map(r=>r.wave).filter(Boolean))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)).slice(0,5);
  const sectionWaves=[...importedWaves],usedWaves=new Set(sectionWaves);
  while(sectionWaves.length<5){
    const index=sectionWaves.length,label=`WAVE ${index+1}`,override=morningWaveTimeOverride({label});
    const candidates=[override?.time,defaultMorningWaveTimes[index],...defaultMorningWaveTimes].filter(Boolean);
    const wave=candidates.find(value=>!usedWaves.has(value))||override?.time||defaultMorningWaveTimes[index]||`Wave ${index+1}`;
    sectionWaves.push(wave);usedWaves.add(wave);
  }
  const sections=sectionWaves.map((wave,i)=>({label:`WAVE ${i+1}`,wave,rows:regular.filter(r=>r.wave===wave),pad:['A','B','C','A','B'][i],routeCapacity:13,hasTime:true,separatorRows:i===4?2:1}));
  const used=new Set(sections.flatMap(s=>s.rows.map(r=>r.route)));
  const adHoc=rows.filter(r=>!used.has(r.route)&&isExplicitAdhocMorningRoute(r));
  const helpers=rows.filter(r=>!used.has(r.route)&&isExplicitHelperMorningRoute(r)&&!adHoc.some(x=>x.route===r.route));
  sections.push({label:"ADHOC's",wave:'',rows:adHoc,routeCapacity:15,hasTime:false,separatorRows:1});
  sections.push({label:'HELPERS',wave:'',rows:helpers,routeCapacity:15,hasTime:false,separatorRows:1});
  sections.push({label:'DSP',wave:'',rows:[],routeCapacity:6,hasTime:false,separatorRows:0,dsp:true});
  if(state.fitMorningRows) return sections.filter(s=>s.hasTime||s.rows.length||s.dsp);
  return sections.filter(s=>s.rows.length||s.label.startsWith('WAVE')||s.dsp||state.morningFilters.wave==='all');
}

function blankMorningRow(section,index) {
  return {dsp:state.dspCode,driver:'',route:`__blank_${section.label}_${index}`,service:'',wave:section.wave,staging:'',pad:section.rows[0]?.pad||section.pad||'',padOverride:section.rows[0]?.padOverride||section.pad||'',ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,stops:'',packages:'',packageReturns:'',endTime:'',rtsTime:'',plannedRts:'',clockOutTime:'',_blank:true};
}

function morningDisplayRows(section) {
  const rows=[...section.rows];
  const target=state.fitMorningRows?Math.max(rows.length,section.hasTime||section.dsp?1:0):section.routeCapacity;
  while(rows.length<target) rows.push(blankMorningRow(section,rows.length));
  return rows;
}

function sheetColumnLetters(count) {
  return Array.from({length:count},(_,i)=>i<26?sheetLetters[i]:`${sheetLetters[Math.floor(i/26)-1]}${sheetLetters[i%26]}`);
}
function sheetModeHeader(headers=[],mode='view') {
  const labels=headers.map((h,i)=>`<th class="${!h?'sheet-spacer-col':''}">${esc(h)}</th>`).join('');
  if(!['edit','copy'].includes(mode))return `<tr class="sheet-letters-row"><th class="sheet-corner"></th>${sheetColumnLetters(headers.length).map(l=>`<th>${l}</th>`).join('')}</tr><tr><th class="sheet-row-num">1</th>${labels}</tr>`;
  return `<tr class="sheet-letters-row"><th class="sheet-corner"></th>${sheetColumnLetters(headers.length).map(l=>`<th>${l}</th>`).join('')}</tr><tr><th class="sheet-row-num">1</th>${labels}</tr>`;
}
function copyModeToolbar(groups=[]) {
  const buttons=groups.filter(g=>!g.dsp).map((g,i)=>{
    const label=g.wave?`${g.label} ${morningWaveTimeText(g)}`:g.label;
    return `<span class="wave-copy-group"><b>${esc(label||`Wave ${i+1}`)}</b><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="all">All A–V</button><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="setup">A–H</button><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="counts">P–Q</button><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="rts">U</button></span>`;
  }).join('');
  return `<div class="copy-mode-toolbar card"><div><strong>Copy mode</strong><span>Drag inside one block at a time, or use a wave shortcut. Black divider columns I and N match the original Ops Log boundaries.</span></div><div class="copy-mode-buttons"><button class="btn small primary" data-action="copy-selected-cells">Copy selected cells</button>${buttons}</div></div>`;
}
function morningWaveTimeText(section) {
  const driverCount=(section.rows||[]).filter(row=>!row._blank&&String(row.driver||'').trim()&&!routeMissingPrimary(row)).length;
  const override=morningWaveTimeOverride(section),wave=override?.time||section.wave,count=override?.count===null||override?.count===undefined?driverCount:override.count;
  return wave?`${String(wave).replace(/\s*[AP]M/i,'')} (${count})`:'';
}
function copyCellValue(row,field,waveLabel,pad) {
  if(field==='waveLabel')return waveLabel;
  if(field==='pad')return pad;
  if(field==='spacerA'||field==='spacerB')return '';
  if(field==='route')return row._blank?'':row.route||'';
  if(field==='driver')return row._blank?'':routeDriverDisplayValue(row);
  if(field==='ev')return row._blank?'':routeEquipmentValue(row);
  if(field==='stops')return row.stops||'';
  if(field==='packages')return row.packages||'';
  if(['preDvic','preWhip','postDvic','postWhip','rescued'].includes(field))return row[field]?'TRUE':'FALSE';
  return row[field]||'';
}
function morningCopyRowsForSections(sections=morningSections(filteredMorningRows())) {
  const rows=[];
  sections.forEach(section=>{
    const display=morningDisplayRows(section), pad=section.rows[0]?.padOverride||section.rows[0]?.pad||section.pad||'';
    const waveLabel=section.dsp?'DSP':section.label;
    display.forEach((r,i)=>rows.push({section,row:r,values:sheetCopyFields.map(field=>copyCellValue(r,field,i===0?waveLabel:'',i===0?pad:''))}));
    if(section.hasTime) rows.push({section,row:null,time:true,values:sheetCopyFields.map((field,i)=>i===0?morningWaveTimeText(section):'')});
    for(let i=0;i<(section.separatorRows||0);i++)rows.push({section,row:null,separator:true,values:sheetCopyFields.map(()=> '')});
  });
  return rows;
}
function morningCopyGrid(groups=[]) {
  const rows=morningCopyRowsForSections(groups);
  return `<table class="ops-sheet copy-ops-sheet morning-template-sheet"><thead>${sheetModeHeader(morningTemplateHeaders,'copy')}</thead><tbody>${rows.map((item,rowIndex)=>`<tr class="ops-row copy-row ${item.time?'wave-time-row':''}"><th class="sheet-row-num">${rowIndex+3}</th>${item.values.map((value,colIndex)=>`<td class="${sheetCopyFields[colIndex]?.startsWith('spacer')?'sheet-spacer-col':'sheet-edit-cell copy-sheet-cell'} ${sheetCopyFields[colIndex]==='plannedRts'?'planned-rts-cell':''}" tabindex="0" data-sheet-cell="true" data-sheet-copy-cell="true" data-sheet-section="${morningSections(groups.flatMap(g=>g.rows)).indexOf(item.section)}" data-sheet-row="${rowIndex}" data-sheet-col="${colIndex}">${esc(value)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function createManualMorningRoute(seed={}) {
  const route={routeUid:`MR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,dsp:state.dspCode,driver:'',route:seed.route||`MANUAL-${Date.now().toString().slice(-6)}`,service:'Manual opening edit',wave:seed.wave||'Manual',staging:'',duration:0,zones:0,packages:0,commercial:0,stops:0,eta:'',bags:0,overflow:0,parking:'',ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,packageReturns:'',endTime:'',rtsTime:'',plannedRts:'',clockOutTime:'',checkedIn:false,vanReady:false,deviceReady:false,portableReady:false,loadReady:false};
  state.morningRoutes.push(route);
  return route;
}

function morningWaveGroup(section,sectionIndex=0) {
  const rows=morningDisplayRows(section);
  const interactive=state.editMode||state.copyMode;
  const edit=state.editMode;
  const prior=morningSections(filteredMorningRows()).slice(0,sectionIndex);
  const rowBase=prior.reduce((n,s)=>n+morningDisplayRows(s).length+(s.hasTime?1:0)+(s.separatorRows||0),3);
  const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||section.pad||'';
  const waveTitle=section.dsp?'DSP':section.label;
  const waveTime=morningWaveTimeText(section);
  const attrs=(r,field,rowIndex,colIndex,extra='')=>interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+rowIndex-3}" data-sheet-col="${colIndex}" ${edit?`contenteditable="true" data-edit-route="${esc(r?.route||'')}" data-edit-uid="${esc(r?.routeUid||'')}" data-edit-field="${field}" data-edit-wave="${esc(r?.wave||section.wave||'')}" data-edit-section="${esc(section.label)}"`:''} ${extra}`:'';
  const cell=(r,field,value,colIndex,cls='')=>{const equipment=field==='ev'?String(r?.ev||''):String(value||''),issue=field==='ev'?vehicleIssueForEquipmentId(equipment):null,equipmentType=field==='deviceName'?'device':field==='portable'?'portable':'',equipmentIssue=equipmentType?equipmentIssueFor(equipmentType,equipment):null,duplicate=field==='ev'&&duplicateMorningEquipmentRoutes(equipment).length>1,acknowledged=issue?.type==='reported'&&morningIssueAcknowledged(r?.route,issue.reported),issueClass=duplicate?'duplicate-van-cell':issue?.type==='grounded'?'grounded-van-cell':issue?.type==='battery'?'low-battery-van-cell':issue?.type==='reported'?`reported-van-cell ${acknowledged?'acknowledged':''}`:equipmentIssue?'reported-equipment-cell':'',vacant=field==='driver'&&routeAssignmentVacant(r),vacancyLabel=vacant?(routeMissingPrimary(r)?(String(r?.driver||'').trim()?'DRIVER NEEDED':'UNASSIGNED DRIVER'):'HELPER NEEDED'):'';return `<td class="sheet-edit-cell copy-sheet-cell ${cls} ${issueClass} ${vacant?'route-vacancy-driver-cell':''} ${r?.plannedRtsIssue&&field==='plannedRts'?'flag-cell':''} ${edit?'editable-cell':''}" ${vacant?`data-vacancy-label="${esc(vacancyLabel)}"`:''} ${field==='driver'&&r?driverProfileAttrs(r.driver):''} data-view-route="${esc(r?.route||'')}" data-view-uid="${esc(r?.routeUid||'')}" data-view-field="${field}" data-view-wave="${esc(r?.wave||section.wave||'')}" title="${duplicate?'This EV is assigned to more than one route':issue?esc(issue.title):equipmentIssue?esc(equipmentIssue.active.map(record=>record.text).join(' · ')):edit?'Press Enter to save':'Double-click to edit'}" ${attrs(r,field,rows.indexOf(r),colIndex)}>${issue?.type==='reported'?`<button class="van-issue-mark ${acknowledged?'acknowledged':''}" data-action="open-morning-vehicle-issue" data-route="${esc(r?.route||'')}" data-equipment="${esc(equipment)}" title="${acknowledged?'Issue acknowledged':'Review and acknowledge issue'}" onclick="event.stopImmediatePropagation();openMorningVehicleIssue(this.dataset.route,this.dataset.equipment)">${acknowledged?'✓':'⚠'}</button>`:''}${equipmentIssue?`<button type="button" class="equipment-issue-trigger active" data-action="open-equipment-issue" data-equipment-type="${equipmentType}" data-equipment-id="${esc(equipment)}">⚠</button>`:''}${esc(value??'')}${duplicateVehiclePopoverHtml(equipment)}${vehicleIssuePopoverHtml(r?.route||'',equipment,issue)}${equipmentIssuePopoverHtml(equipmentType,equipment)}</td>`;};
  const selectCell=(r,field,colIndex,cls='')=>`<td class="sheet-check-cell copy-sheet-cell ${cls}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+rows.indexOf(r)-3}" data-sheet-col="${colIndex}"`:''}><input type="checkbox" data-check-field="${field}" data-check-route="${esc(r?.route||'')}" data-check-wave="${esc(r?.wave||section.wave||'')}" ${r?.[field]?'checked':''} aria-label="${field}"></td>`;
  const divider=(rowIndex,colIndex)=>`<td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+rowIndex-3}" data-sheet-col="${colIndex}"`:''}></td>`;
  const waveCell=`<td class="wave-label ${section.dsp?'dsp-label':''} copy-sheet-cell" rowspan="${rows.length}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase-3}" data-sheet-col="0"`:''}><span>${esc(waveTitle)}</span></td>`;
  const padRows=rows.length+(section.hasTime?1:0);
  const padCell=`<td class="pad-label sheet-edit-cell copy-sheet-cell ${edit?'editable-cell':''}" rowspan="${padRows}" data-view-field="padOverride" data-view-wave="${esc(section.wave)}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase-3}" data-sheet-col="4" ${edit?`contenteditable="true" data-edit-wave="${esc(section.wave)}" data-edit-field="padOverride"`:''}`:''}><span>${esc(pad)}</span></td>`;
  const body=rows.map((r,i)=>`<tr class="ops-row ${r._blank?'blank-row':''} ${routeAssignmentVacant(r)?'route-vacancy-row':''} wave-section-${sectionIndex}" data-wave-section="${sectionIndex}"><th class="sheet-row-num">${rowBase+i}</th>${i===0?waveCell:''}${cell(r,'driver',routeDriverDisplayValue(r),1,'driver-name')}${cell(r,'route',r._blank?'':r.route,2,'route-id')}${cell(r,'staging',r.staging,3,'staging-code')}${i===0?padCell:''}${cell(r,'ev',routeEquipmentValue(r),5)}${cell(r,'deviceName',r.deviceName||'',6)}${cell(r,'portable',r.portable||'',7)}${divider(i,8)}${selectCell(r,'preDvic',9)}${selectCell(r,'preWhip',10)}${selectCell(r,'postDvic',11)}${selectCell(r,'postWhip',12)}${divider(i,13)}${selectCell(r,'rescued',14,'rescued-cell')}${cell(r,'stops',r.stops,15,'count-cell')}${cell(r,'packages',r.packages,16,'count-cell')}${cell(r,'packageReturns',r.packageReturns||'',17)}${cell(r,'endTime',r.endTime||'',18)}${cell(r,'rtsTime',r.rtsTime||'',19)}${cell(r,'plannedRts',r.plannedRts||'',20,'planned-rts-cell')}${cell(r,'clockOutTime',r.clockOutTime||'',21)}</tr>`).join('');
  const timeRowIndex=rowBase+rows.length-3;
  const timeCells=sheetCopyFields.map((field,colIndex)=>colIndex===0?`<td class="wave-time-cell sheet-edit-cell copy-sheet-cell ${edit?'editable-cell':''}" data-view-field="waveTime" data-view-wave="${esc(section.wave||'')}" data-view-section="${esc(section.label||'')}" title="${edit?'Type the wave time and driver total, then press Enter':'Double-click to edit wave time and driver total'}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="0" ${edit?`contenteditable="true" data-edit-field="waveTime" data-edit-wave="${esc(section.wave||'')}" data-edit-section="${esc(section.label||'')}"`:''}`:''}>${esc(waveTime)}</td>`:colIndex===4?'':`<td class="${sheetSpacerColumns.has(colIndex)?'sheet-spacer-col':field==='plannedRts'?'planned-rts-cell sheet-edit-cell copy-sheet-cell':'sheet-edit-cell copy-sheet-cell'}" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="${colIndex}"`:''}></td>`).join('');
  const timeRow=section.hasTime?`<tr class="ops-row wave-time-row wave-section-${sectionIndex}" data-wave-section="${sectionIndex}"><th class="sheet-row-num">${rowBase+rows.length}</th>${timeCells}</tr>`:'';
  const separators=Array.from({length:section.separatorRows||0},(_,offset)=>{const sheetRow=rowBase+rows.length+(section.hasTime?1:0)+offset,rowIndex=sheetRow-3;return `<tr class="wave-separator wave-section-${sectionIndex}" data-wave-section="${sectionIndex}"><th class="sheet-row-num">${sheetRow}</th>${sheetCopyFields.map((field,colIndex)=>`<td class="${sheetSpacerColumns.has(colIndex)?'sheet-spacer-col':''}" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowIndex}" data-sheet-col="${colIndex}"`:''}></td>`).join('')}</tr>`;}).join('');
  return `${body}${timeRow}${separators}`;
}

function deviceSheetDetails() {
  return state.equipmentImport?.details||{};
}
function deviceSheetBaseIds(section='') {
  if(section==='ev')return Array.from({length:58},(_,i)=>`EV${i+1}`);
  if(section==='gas')return [...gasVehicleIds];
  if(section==='helper')return ['H1','H2','H3','H4'];
  return [];
}
function deviceSheetCustomRows(section='') {
  return Array.isArray(state.deviceCustomRows?.[section])?state.deviceCustomRows[section]:[];
}
function deviceSheetAllIds(section='') {
  return [...deviceSheetBaseIds(section),...deviceSheetCustomRows(section).map(row=>row.label).filter(Boolean)];
}
function fleetEquipmentIdentity(vehicle={}) {
  const vin=String(vehicle.vin||'').toUpperCase(),cleanedVin=cleanVin(vin),name=String(FIXED_FLEET_NAMES[cleanedVin]||state.fleetNameOverrides?.[cleanedVin]||vehicle.name||'').trim(),upper=name.toUpperCase();
  const gasVinType=vin.startsWith('1FTYR3')?'F':vin.startsWith('3C6LRV')?'R':'';
  if(gasVinType){
    const explicit=upper.match(/\b([FR]\d+)\b/),number=upper.match(/\b(\d{1,4})\b/);
    return {section:'gas',label:explicit?explicit[1]:number?`${gasVinType}${Number(number[1])}`:name};
  }
  const ev=upper.match(/(?:^|\b)EV\s*[-#:]?\s*(\d+)\b/);
  if(ev)return {section:'ev',label:`EV${Number(ev[1])}`};
  const gasType=/\bFORD\b/.test(upper)?'F':/\b(?:RAM|RENTAL)\b/.test(upper)?'R':'';
  if(!gasType)return null;
  const explicit=upper.match(/\b([FR]\d+)\b/),number=upper.match(/\b(\d{1,4})\b/);
  return {section:'gas',label:explicit?explicit[1]:number?`${gasType}${Number(number[1])}`:name};
}
function groundedEquipmentIds() {
  const ids=new Set();
  rivianFleet.forEach(vehicle=>{if(normalizeOperational(vehicle.operational||vehicle.status)==='Grounded'){const identity=fleetEquipmentIdentity(vehicle);if(identity?.label)ids.add(normalizeEquipmentId(identity.label));}});
  return ids;
}
function isGroundedEquipmentId(value='') {
  const key=normalizeEquipmentId(value);return Boolean(key&&groundedEquipmentIds().has(key));
}
function fleetVehicleForEquipmentId(value='') {
  const key=normalizeEquipmentId(value);if(!key)return null;
  return rivianFleet.find(vehicle=>normalizeEquipmentId(fleetEquipmentIdentity(vehicle)?.label||'')===key)||null;
}
function fleetIssueKey(vehicleOrId='') {
  if(typeof vehicleOrId==='object')return cleanVin(vehicleOrId.vin)||normalizeEquipmentId(fleetEquipmentIdentity(vehicleOrId)?.label||vehicleOrId.name||'');
  const vehicle=fleetVehicleForEquipmentId(vehicleOrId);return vehicle?fleetIssueKey(vehicle):normalizeEquipmentId(vehicleOrId);
}
function fleetIssueStoreForVehicle(vehicle={}) {
  const vinKey=cleanVin(vehicle.vin),labelKey=normalizeEquipmentId(fleetEquipmentIdentity(vehicle)?.label||vehicle.name||'');
  const key=(vinKey&&state.fleetIssues?.[vinKey])?vinKey:(labelKey&&state.fleetIssues?.[labelKey])?labelKey:'';
  return key?{key,store:state.fleetIssues[key]}:null;
}
function fleetIssueForVehicle(vehicle={}) {
  const found=fleetIssueStoreForVehicle(vehicle);if(!found)return null;
  const legacy=found.store.text?[{id:`legacy-${found.key}`,category:'custom',group:'Other',text:found.store.text,severity:found.store.severity||'watch',createdAt:found.store.updatedAt||'',status:'active'}]:[];
  const active=(Array.isArray(found.store.active)?found.store.active:legacy).filter(record=>record?.status!=='fixed');if(!active.length)return null;
  const severityRank={critical:3,high:2,watch:1};
  const lead=[...active].sort((a,b)=>(severityRank[b.severity]||0)-(severityRank[a.severity]||0))[0];
  return {...found.store,key:found.key,active,text:lead?.text||'Reported issue',severity:lead?.severity||'watch',lead};
}
function issueCatalogOptionsHtml(){return FLEET_ISSUE_CATALOG.map(group=>`<optgroup label="${esc(group.group)}">${group.options.map(([value,label])=>`<option value="${esc(value)}">${esc(label)}</option>`).join('')}</optgroup>`).join('');}
function issueGroupForCategory(category=''){return FLEET_ISSUE_CATALOG.find(group=>group.options.some(([value])=>value===category))?.group||'Other';}
function allActiveFleetIssueRecords(){return Object.values(state.fleetIssues||{}).flatMap(store=>(store?.active||[]).filter(record=>record?.status!=='fixed'));}
function fleetIssuesPanel() {
  const issues=allActiveFleetIssueRecords();
  return `<section class="fleet-issues-panel card"><div class="fleet-issues-copy"><span class="eyebrow">FLEET BOT</span><div class="fleet-issues-title"><h2>Van Reports / Issues</h2><strong>${issues.length}</strong></div><p>Choose a common issue or add a custom one. Every report stays with the van through future imports.</p></div><div class="fleet-issue-entry"><label>Van / EV<input id="fleet-issue-vehicle" placeholder="EV21 or VIN"></label><label>Severity<select id="fleet-issue-severity"><option value="watch">Watch</option><option value="high">High</option><option value="critical">Do not assign</option></select></label><label class="issue-type">Issue<select id="fleet-issue-category">${issueCatalogOptionsHtml()}</select></label><label class="issue-text">Custom details<input id="fleet-issue-text" placeholder="Only needed for Custom issue"></label><button class="btn primary" data-action="save-fleet-issue" onclick="event.stopImmediatePropagation();saveFleetIssue()">Add issue</button></div><div class="fleet-issue-total" aria-label="${issues.length} active van issues"><span>⚠</span><b>${issues.length}</b><small>Active issues</small></div></section>`;
}
function saveFleetIssue() {
  const label=document.getElementById('fleet-issue-vehicle')?.value.trim()||'',category=document.getElementById('fleet-issue-category')?.value||'custom',customText=document.getElementById('fleet-issue-text')?.value.trim()||'',severity=document.getElementById('fleet-issue-severity')?.value||'watch';
  const textValue=category==='custom'?customText:(FLEET_ISSUE_LABELS[category]||customText);
  if(!label||!textValue)return toast(category==='custom'?'Enter the van and custom issue details':'Enter the van for this issue','error');
  const key=fleetIssueKey(label);if(!key)return toast('Enter a valid EV, van name, or VIN','error');
  const createdAt=new Date().toISOString(),record={id:issueId(),category,group:issueGroupForCategory(category),text:textValue,severity,createdAt,status:'active'};
  const current=state.fleetIssues[key]||{label,active:[],history:[]};
  current.label=current.label||label;current.active=[...(current.active||[]),record];current.history=[...(current.history||[]),record];current.updatedAt=createdAt;
  state.fleetIssues[key]=current;persist();render();toast(`Fleet Bot issue added to ${label}`);
}
function markFleetIssueFixed(key='',issueIdValue='') {
  const store=state.fleetIssues?.[key];if(!store)return;
  const resolvedAt=new Date().toISOString(),target=(store.active||[]).find(record=>record.id===issueIdValue);if(!target)return;
  store.active=(store.active||[]).filter(record=>record.id!==issueIdValue);
  store.history=(store.history||[]).map(record=>record.id===issueIdValue?{...record,status:'fixed',resolvedAt}:record);
  store.updatedAt=resolvedAt;persist();render();toast(`${target.text} marked fixed`);
}
function removeFleetIssue(key='') {
  const store=state.fleetIssues?.[key];if(!store)return;
  [...(store.active||[])].forEach(record=>markFleetIssueFixed(key,record.id));
}
function vehicleIssueForEquipmentId(value='') {
  const vehicle=fleetVehicleForEquipmentId(value);
  if(!vehicle){
    const key=normalizeEquipmentId(value),store=state.fleetIssues?.[key],active=(store?.active||[]).filter(record=>record?.status!=='fixed');
    if(active.length)return {type:'reported',label:`⚠ ${active.length} issue${active.length===1?'':'s'}`,title:`Reported van issue: ${active.map(item=>item.text).join(' · ')}`,reported:{...store,key,active,text:active[0]?.text||'Reported issue'}};
    return null;
  }
  if(normalizeOperational(vehicle.operational||vehicle.status)==='Grounded')return {type:'grounded',label:'⛔ Grounded',title:'Grounded vehicle — do not assign'};
  if(normalizeActive(vehicle.active||vehicle.status)==='Inactive')return {type:'grounded',label:'Inactive',title:'Inactive vehicle — verify before assigning'};
  const battery=knownBatteryPercent(vehicle.battery);
  if(isElectricFleetVehicle(vehicle)&&battery!==null&&battery<DISPATCH_BATTERY_BLOCK_THRESHOLD)return {type:'battery',label:`Low ${battery}%`,title:`Low battery ${battery}% — charge or swap before dispatch`};
  const reported=fleetIssueForVehicle(vehicle);if(reported)return {type:'reported',label:`⚠ ${reported.active.length} issue${reported.active.length===1?'':'s'}`,title:`Reported van issue: ${reported.active.map(item=>item.text).join(' · ')}`,reported};
  return null;
}
function reportedFleetIssueForEquipmentId(value='') {
  const vehicle=fleetVehicleForEquipmentId(value);if(vehicle)return fleetIssueForVehicle(vehicle);
  const key=normalizeEquipmentId(value),store=state.fleetIssues?.[key],active=(store?.active||[]).filter(record=>record?.status!=='fixed');return active.length?{...store,key,active,text:active[0]?.text||'Reported issue'}:null;
}
function normalizeEquipmentIssueId(type='',value='') { const clean=String(value||'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,type==='portable'?4:3);return /^\d+$/.test(clean)?String(Number(clean)):clean; }
function equipmentIssueKey(type='',value='') { const clean=normalizeEquipmentIssueId(type,value);return clean?`${type==='portable'?'portable':'device'}:${clean}`:''; }
function equipmentIssueFor(type='',value='') { const key=equipmentIssueKey(type,value),store=key?state.equipmentIssues?.[key]:null,active=(store?.active||[]).filter(record=>record?.status!=='fixed');return active.length?{...store,key,active,lead:[...active].sort((a,b)=>({critical:3,high:2,watch:1}[b.severity]||0)-({critical:3,high:2,watch:1}[a.severity]||0))[0]}:null; }
function activeEquipmentIssueCount() { return Object.values(state.equipmentIssues||{}).reduce((total,store)=>total+(store?.active||[]).filter(record=>record?.status!=='fixed').length,0); }
function equipmentIssueDate(value='') { const date=new Date(value);return !value||Number.isNaN(date.getTime())?'Date unavailable':new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}).format(date); }
function equipmentIssuePopoverHtml(type='',value='') {
  const issue=equipmentIssueFor(type,value);if(!issue)return '';
  return `<div class="equipment-issue-popover" role="dialog" aria-label="Issues for ${esc(issue.label)}"><strong>⚠ ${esc(issue.label)} · ${issue.active.length}</strong><div>${issue.active.map(record=>`<article><span>${esc(record.text)}</span><small>${esc(record.severity)} · ${esc(equipmentIssueDate(record.createdAt))}</small><button type="button" data-action="mark-equipment-issue-fixed" data-equipment-issue-key="${esc(issue.key)}" data-equipment-issue-id="${esc(record.id)}">Mark fixed</button></article>`).join('')}</div></div>`;
}
function openEquipmentIssue(type='',value='') { const clean=equipmentIssueKey(type,value);state.pendingEquipmentIssue={type:type==='portable'?'portable':'device',value:clean.split(':').slice(1).join(':')};state.modal='equipment-issue';render(); }
function saveEquipmentIssue() {
  const pending=state.pendingEquipmentIssue,type=document.getElementById('equipment-issue-type')?.value||pending?.type||'device',value=String(document.getElementById('equipment-issue-id')?.value||pending?.value||'').trim(),text=String(document.getElementById('equipment-issue-text')?.value||'').trim(),severity=document.getElementById('equipment-issue-severity')?.value||'watch',key=equipmentIssueKey(type,value);if(!key||!text)return toast('Enter the device or portable number and issue details','error');
  const createdAt=new Date().toISOString(),record={id:issueId(),text:text.slice(0,280),severity:['watch','high','critical'].includes(severity)?severity:'watch',createdAt,createdBy:state.cloudUser||'Dispatcher',status:'active',resolvedAt:'',resolvedBy:''},current=state.equipmentIssues[key]||{type:type==='portable'?'portable':'device',equipmentId:key.split(':').slice(1).join(':'),label:`${type==='portable'?'Portable':'Device'} ${key.split(':').slice(1).join(':')}`,active:[],history:[]};current.active=[...(current.active||[]),record];current.history=[...(current.history||[]),record];current.updatedAt=createdAt;state.equipmentIssues[key]=current;state.pendingEquipmentIssue=null;state.modal=null;recalculateEquipmentReadiness();persist();render();toast(`${current.label} issue logged`);
}
function markEquipmentIssueFixed(key='',id='') { const store=state.equipmentIssues?.[key],target=(store?.active||[]).find(record=>record.id===id);if(!store||!target)return;const resolvedAt=new Date().toISOString(),resolvedBy=state.cloudUser||'Dispatcher';store.active=(store.active||[]).filter(record=>record.id!==id);store.history=(store.history||[]).map(record=>record.id===id?{...record,status:'fixed',resolvedAt,resolvedBy}:record);store.updatedAt=resolvedAt;recalculateEquipmentReadiness();persist();render();toast(`${store.label} marked fixed`); }
function routeEquipmentIssues(route={}) { return {device:equipmentIssueFor('device',route.deviceName),portable:equipmentIssueFor('portable',route.portable)}; }
function recalculateEquipmentReadiness() { (state.morningRoutes||[]).forEach(route=>{const issues=routeEquipmentIssues(route);route.deviceReady=Boolean(String(route.deviceName||'').trim())&&!issues.device?.active.some(record=>['high','critical'].includes(record.severity));route.portableReady=Boolean(String(route.portable||'').trim()&&String(route.portable)!=='-')&&!issues.portable?.active.some(record=>['high','critical'].includes(record.severity));}); }
function morningIssueAckKey(route='',issueIdValue=''){return `${state.morningOperationDate}|${String(route||'').toUpperCase()}|${issueIdValue}`;}
function morningIssueAcknowledged(route='',reported=null){
  const records=reported?.active||[];return Boolean(records.length&&records.every(record=>state.morningIssueAcknowledgements?.[morningIssueAckKey(route,record.id)]));
}
function openMorningVehicleIssue(route='',equipment='') {
  const issue=vehicleIssueForEquipmentId(equipment);if(issue?.type!=='reported')return;
  state.pendingMorningIssue={route,equipment};state.modal='morning-vehicle-issue';render();
}
function acknowledgeMorningVehicleIssue() {
  const pending=state.pendingMorningIssue;if(!pending)return;
  const issue=vehicleIssueForEquipmentId(pending.equipment);if(issue?.type!=='reported')return;
  const acknowledgedAt=new Date().toISOString(),acknowledgedBy=state.cloudUser||'Opening dispatcher';
  issue.reported.active.forEach(record=>{state.morningIssueAcknowledgements[morningIssueAckKey(pending.route,record.id)]={acknowledgedAt,acknowledgedBy};});
  state.pendingMorningIssue=null;state.modal=null;persist();render();toast(`${pending.equipment} issue acknowledged`);
}
function syncFleetVehiclesToDeviceSheet(vehicles=[]) {
  state.deviceCustomRows=state.deviceCustomRows||{ev:[],gas:[],helper:[]};
  let added=0;
  vehicles.forEach(vehicle=>{
    const identity=fleetEquipmentIdentity(vehicle);if(!identity)return;
    const key=normalizeEquipmentId(identity.label),baseKeys=new Set(deviceSheetBaseIds(identity.section).map(normalizeEquipmentId));
    const custom=deviceSheetCustomRows(identity.section),existing=custom.find(row=>normalizeEquipmentId(row.label)===key);
    if(existing){existing.source='fleet';existing.fleetVin=vehicle.vin||existing.fleetVin||'';return;}
    if(baseKeys.has(key))return;
    custom.push({uid:`fleet-${identity.section}-${key||Date.now()}`,label:identity.label,device:'',portable:'',source:'fleet',fleetVin:vehicle.vin||''});added++;
  });
  return added;
}
function syncGasVehiclesToParking(vehicles=[]) {
  const labels=[...new Set(vehicles.filter(isGasFleetVehicle).map(vehicle=>fleetEquipmentIdentity(vehicle)?.label||fleetDisplayName(vehicle)).map(value=>String(value||'').trim()).filter(Boolean))];
  const slots=parkingSlots('gas'),existing=new Set(slots.map(slot=>normalizeEquipmentId(slot.value)));
  labels.forEach(label=>{const key=normalizeEquipmentId(label);if(existing.has(key))return;const empty=slots.find(slot=>!String(slot.value||'').trim());if(empty)empty.value=label;else state.vanParking.push({id:`gas-fleet-${key||Date.now()}`,zone:'gas',label:`Gas spot ${parkingSlots('gas').length+1}`,value:label,kind:'spot',manual:true});existing.add(key);});
  return labels.length;
}
function deviceSheetRows(section='') {
  const details=deviceSheetDetails();
  const base=deviceSheetBaseIds(section).map(label=>({label,fixed:true})),custom=deviceSheetCustomRows(section);
  return [...base,...custom].map(row=>{
    const label=String(row.label||''),key=normalizeEquipmentId(label),item=row.fixed?(details[key]||{}):{...row,device:row.device||details[key]?.device||'',portable:row.portable||details[key]?.portable||''};
  const issue=vehicleIssueForEquipmentId(label),rowClass=issue?.type==='grounded'?'grounded-vehicle-row':issue?.type==='battery'?'low-battery-vehicle-row':issue?.type==='reported'?'reported-vehicle-row':'';
    const vanCell=row.fixed?`<th>${esc(label)}${issue?`<span>${esc(issue.label)}</span>`:''}</th>`:`<th class="custom-van-cell"><input class="device-sheet-van-input" aria-label="${esc(section)} custom van" data-device-custom-uid="${esc(row.uid)}" data-device-custom-field="label" value="${esc(label)}" placeholder="Van name"><button data-action="remove-device-custom-row" data-device-custom-uid="${esc(row.uid)}" aria-label="Remove ${esc(label||'custom van')} row">×</button>${issue?`<span>${esc(issue.label)}</span>`:''}</th>`;
    const field=(name,max)=>{const value=String(item[name]||''),equipmentIssue=equipmentIssueFor(name,value);return `<td class="device-equipment-cell ${equipmentIssue?'has-equipment-issue':''}"><input aria-label="${esc(label||'New van')} ${name}" ${row.fixed?`data-device-sheet-id="${esc(key)}" data-device-sheet-field="${name}"`:`data-device-custom-uid="${esc(row.uid)}" data-device-custom-field="${name}"`} inputmode="numeric" maxlength="${max}" value="${esc(value)}" placeholder="—">${value?`<button type="button" class="equipment-issue-trigger ${equipmentIssue?'active':''}" data-action="open-equipment-issue" data-equipment-type="${name}" data-equipment-id="${esc(value)}" aria-label="Report or review ${esc(name)} ${esc(value)} issue">${equipmentIssue?'⚠':'!'}</button>`:''}${equipmentIssuePopoverHtml(name,value)}</td>`;};
    return `<tr class="${rowClass}">${vanCell}${field('device',3)}${field('portable',4)}</tr>`;
  }).join('');
}
function deviceSheetTable(title,subtitle,section='') {
  const confirming=state.deviceClearConfirm===section,count=deviceSheetBaseIds(section).length+deviceSheetCustomRows(section).length;
  return `<article class="card device-sheet-card ${section}-list"><div class="device-sheet-card-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div><div class="device-sheet-card-actions"><span>${count} rows</span><button class="btn small" data-action="open-equipment-issue" data-equipment-type="device" data-equipment-id="">⚠ Report issue</button><button class="btn small" data-action="add-device-sheet-row" data-device-section="${esc(section)}">${ICONS.plus} Add row</button><button class="btn small ${confirming?'danger':''}" data-action="clear-device-sheet-section" data-device-section="${esc(section)}">${confirming?'Click again to clear':'Clear sheet'}</button></div></div><div class="device-sheet-table-wrap"><table class="device-sheet-table"><thead><tr><th>VAN</th><th>DEVICE</th><th>PORTABLE</th></tr></thead><tbody>${deviceSheetRows(section)}</tbody></table></div></article>`;
}
function livePage() {
  const details=deviceSheetDetails(),filled=Object.values(details).filter(item=>String(item?.device||'').trim()||String(item?.portable||'').trim()).length;
  const assigned=state.morningRoutes.filter(route=>route.ev&&details[normalizeEquipmentId(route.ev)]).length;
  return `${contextBar(`<span class="status">${filled} assignments saved</span><span class="status ${activeEquipmentIssueCount()?'warn':''}">${activeEquipmentIssueCount()} equipment issues</span>`)}
  <section class="device-sheet-intro card"><div><span class="eyebrow">TODAY’S EQUIPMENT</span><h2>Type the Device and Portable beside each van</h2><p>EV labels stay fixed. Click any white box and type today’s number. Signed-in dispatchers share saved updates; offline edits stay queued on this device.</p></div><div class="device-sheet-steps"><span><b>1</b>Type numbers</span><span><b>2</b>Check the EV</span><span><b>3</b>Send to Morning Sheet</span></div><button class="btn primary device-sheet-send" data-action="device-sheet-to-morning">Input to Morning Sheet ${ICONS.chevron}</button></section>
  <section class="device-sheet-summary"><span><b>${filled}</b>van rows filled</span><span><b>${assigned}</b>Morning Sheet drivers currently matched</span><span><b>${state.morningRoutes.filter(route=>route.ev).length}</b>drivers have a van assigned</span></section>
  <section class="device-sheet-layout"><div>${deviceSheetTable('Electric vehicles','EV1 through EV58 plus Fleet Health and manual additions','ev')}</div><aside>${deviceSheetTable('Gas vehicles','Ford, Ram and rental vans from Fleet Health plus manual additions','gas')}${deviceSheetTable('Helper bags','Use H1–H4 or add another helper bag','helper')}</aside></section>
  <div class="device-sheet-sticky-action"><div><strong>Ready to match equipment?</strong><span>The EV/VAN number is the match key. Driver names and routes stay unchanged.</span></div><button class="btn primary" data-action="device-sheet-to-morning">Input to Morning Sheet</button></div>`;
}

function stayHomeHistoryEntries() {
  const merged={...(state.scheduleStayHome||{}),...(state.scheduleStayHomeHistory||{})};
  return Object.entries(merged).map(([key,value])=>({key,date:value?.date||key.split('|')[0],name:value?.name||key.split('|').slice(1).join('|'),role:value?.role||'',at:value?.at||''})).filter(row=>row.date&&row.name);
}
function stayHomeWindowEntries(days=14) {
  const anchor=Date.parse(`${state.morningOperationDate||defaultOperationDate()}T12:00:00Z`),span=Math.max(1,Number(days)||14)-1;
  return stayHomeHistoryEntries().filter(row=>{const time=Date.parse(`${row.date}T12:00:00Z`),delta=(anchor-time)/86400000;return Number.isFinite(delta)&&delta>=0&&delta<=span;});
}
function driverStayHomeStats(name='',days=14) {
  const identity=value=>nameKey(contactForMorningDriver(value)?.name||value),key=identity(name),recent=stayHomeWindowEntries(days).filter(row=>identity(row.name)===key).sort((a,b)=>b.date.localeCompare(a.date)),all=stayHomeHistoryEntries().filter(row=>identity(row.name)===key);
  return {count:recent.length,total:all.length,recent,frequent:recent.length>=2,lastDate:recent[0]?.date||all.sort((a,b)=>b.date.localeCompare(a.date))[0]?.date||''};
}
function removeDriverStayHomeMark(name='') {
  const identity=value=>nameKey(contactForMorningDriver(value)?.name||value),driverKey=identity(name),stats=driverStayHomeStats(name,3650),target=stats.recent[0];
  if(!driverKey||!target)return toast('No Told To Stay Home mark was found for this driver','error');
  const removeMatching=(records={})=>Object.keys(records||{}).forEach(key=>{const record=records[key]||{},recordName=record.name||key.split('|').slice(1).join('|'),recordDate=record.date||key.split('|')[0];if(identity(recordName)===driverKey&&recordDate===target.date)delete records[key];});
  removeMatching(state.scheduleStayHome);
  removeMatching(state.scheduleStayHomeHistory);
  persist();render();toast(`Removed the ${formatShortOperationDate(target.date)} Told To Stay Home mark for ${driverDisplayName(name)}`);
}
function formatShortOperationDate(value='') { const [year,month,day]=String(value).split('-').map(Number);return year&&month&&day?`${month}/${day}`:value; }
function driverCapabilityButtonsHtml(name='') {
  const tags=new Set(driverCapabilities(name));
  return `<div class="driver-capability-controls"><button class="${tags.has('trainer')?'active':''}" data-action="toggle-driver-capability" data-driver-name="${esc(name)}" data-capability="trainer" aria-pressed="${tags.has('trainer')}">Trainer</button><button class="${tags.has('helper-driver')?'active':''}" data-action="toggle-driver-capability" data-driver-name="${esc(name)}" data-capability="helper-driver" aria-pressed="${tags.has('helper-driver')}">Helper Driver</button></div>`;
}
function driverKnownNamesHtml(name='') {
  const profile=driverProfileEntry(name)?.profile,canonical=nameKey(profile?.canonical||name),known=[...new Set([profile?.nickname,...(profile?.names||[])].map(value=>String(value||'').trim()).filter(value=>value&&nameKey(value)!==canonical))];
  return known.length?`<div class="driver-known-names"><span>Linked names</span><strong>${known.map(esc).join(' · ')}</strong></div>`:'';
}

const DESIGNATED_DISPATCHER_NAMES=['Alec Gonzalez','Gerardo Godinez','Javier Navarrete','Jennifer Ceja','Jose Lopez','Edwin Gomez'];
function isDesignatedDispatcher(name='') {
  const parts=(driverIdentityKey(name)||nameKey(name)).split(' ').filter(Boolean);
  return DESIGNATED_DISPATCHER_NAMES.some(dispatcher=>nameKey(dispatcher).split(' ').filter(Boolean).every(part=>parts.includes(part)));
}

function driverTeamCardHtml(d={}) {
  const whip=driverWhiparoundStats(d.name),stay=driverStayHomeStats(d.name),display=driverDisplayName(d.name),dispatcher=isDesignatedDispatcher(d.name),identity=driverIdentityKey(d.name),expanded=state.expandedDriverKey===identity,profile=driverProfileEntry(d.name)?.profile||{},searchValue=nameKey([d.name,display,...(profile.names||[])].join(' ')),active=/^active$/i.test(String(d.status||'').trim());
  const statusHtml=d.status&&!active?`<span class="status ${statusClass(d.status)}">${esc(d.status)}</span>`:'';
  const details=[['Transporter ID',d.id||'—'],['Role',d.role||'—'],['Phone',d.phone||'Not imported'],['Email',d.email||'Not imported'],['Qualifications',d.qualifications||'Not imported']];
  return `<article class="card entity-card driver-card ${expanded?'expanded':''} ${dispatcher?'dispatcher-driver-card':''} ${whip.frequent?'whip-frequent-driver':''} ${stay.frequent?'stay-home-frequent-driver':''}" data-team-driver-name="${esc(searchValue)}" data-driver-card-toggle="true" data-driver-name="${esc(d.name)}" role="button" tabindex="0" aria-expanded="${expanded?'true':'false'}" ${driverProfileAttrs(d.name)}><div class="entity-top"><div class="driver-avatar" style="width:38px;height:38px;border-radius:12px">${initials(display)}</div><div class="driver-card-actions">${dispatcher?'<span class="dispatcher-badge">Dispatcher</span>':''}${statusHtml}<button class="driver-note-button" data-action="open-driver-flags" data-driver-name="${esc(d.name)}" aria-label="Driver notes for ${esc(d.name)}" title="Driver notes">⚑${driverProfileFlags(d.name).length||''}</button><button class="driver-alias-button" data-action="open-driver-alias" data-driver-name="${esc(d.name)}" aria-label="Edit driver profile for ${esc(d.name)}" title="Nickname, known names, and preferred vans">Aa</button><button class="driver-delete-button" data-action="request-driver-removal" data-driver-key="${esc(nameKey(d.name))}" aria-label="Remove ${esc(d.name)}" title="Remove Delivery Associate">${ICONS.trash}</button></div></div><h3>${esc(d.name)}</h3><p>${esc(d.role)} · ${esc(d.id)}</p><div class="driver-phone-line">${ICONS.phone}<span>${d.phone?esc(d.phone):'No phone imported yet'}</span></div><span class="driver-card-expand-cue">${expanded?'Hide details':'Click card for details'} <b>${expanded?'↑':'↓'}</b></span><div class="driver-card-expanded" aria-hidden="${expanded?'false':'true'}">${display!==d.name?`<span class="driver-alias-preview">Nickname: ${esc(display)}</span>`:''}${driverKnownNamesHtml(d.name)}${driverPreferredVehiclesHtml(d.name)}<div class="driver-detail-grid">${details.map(([label,value])=>`<span><small>${esc(label)}</small><strong>${esc(value)}</strong></span>`).join('')}</div>${driverCapabilityButtonsHtml(d.name)}${stay.count?`<div class="driver-stay-home-history ${stay.frequent?'frequent':''}"><b>${stay.count}</b><span><strong>Told to stay home · last 14 days</strong><small>${stay.recent.map(row=>formatShortOperationDate(row.date)).join(' · ')}${stay.total>stay.count?` · ${stay.total} all-time`:''}</small></span></div>`:''}${whip.missed?`<div class="driver-whiparound-flag ${whip.frequent?'frequent':''}">${ICONS.whiparound}<span><b>${whip.frequent?'Frequent Whiparound follow-up':'Whiparound follow-up'}</b><small>${whip.missed} missed form${whip.missed===1?'':'s'} across ${whip.missedDays} day${whip.missedDays===1?'':'s'}</small></span></div>`:''}<div class="entity-meta"><div class="entity-stat"><span>Delivery quality</span><strong>${esc(d.quality)}</strong></div><div class="entity-stat"><span>Last coaching</span><strong>${esc(d.coaching)}</strong></div></div></div></article>`;
}

function teamPage() {
  const drivers=teamDriverRows(), contacts=state.driverContacts||[];
  const onRouteNames=new Set(filteredMorningRows().map(r=>nameKey(r.driver)).filter(Boolean));
  return `${contextBar(`<a class="btn small ghost" href="${AMAZON_WORKFORCE_ASSOCIATES_URL}" target="_blank" rel="noopener">${ICONS.link} Open Amazon Workforce</a>`)}<div class="toolbar team-toolbar"><div class="toolbar-left"><label class="team-name-search">${ICONS.search}<input type="search" data-team-search autocomplete="off" placeholder="Search driver names" aria-label="Search Drivers and Team by name"><button type="button" data-action="clear-team-search" aria-label="Clear driver search">×</button></label><span class="filter-note" data-team-search-count>${drivers.length} drivers</span><span class="filter-note">${contacts.length} imported phone contact${contacts.length===1?'':'s'}${state.driverContactsLastImport?` · last import ${esc(state.driverContactsLastImport)}`:''}</span></div><div class="toolbar-right"><a class="btn" href="${AMAZON_WORKFORCE_ASSOCIATES_URL}" target="_blank" rel="noopener">${ICONS.link} Amazon Workforce</a><button class="btn primary" data-action="driver-import">${ICONS.upload} Import Drivers CSV / Excel</button><button class="btn lime" data-action="add-delivery-associate">${ICONS.plus} Add Delivery Associate</button></div></div>
  <div class="driver-workforce-import card"><div><strong>Driver & phone import</strong><span>Drop in an AssociateData CSV or Excel workbook (.xlsx). RelayOps finds the associate sheet, matches Name with Personal Phone, and keeps Position, Transporter ID, and Active status.</span></div><div><button class="btn small primary" data-action="driver-import">Choose CSV or Excel</button><button class="btn small" data-action="add-delivery-associate">Add one manually</button></div><small>Contacts are never embedded in the public website. Signed-in dispatchers share them only through the protected station workspace; signed-out use stays in this browser.</small></div>
  <div class="driver-message-readiness card"><div><strong>Future text reminder prep</strong><span>After the Morning Sheet is finalized, RelayOps can identify on-route drivers by the visible Morning Sheet names. Texting will need a secure SMS connector and driver opt-in before it sends anything.</span></div><div><b>${drivers.filter(d=>onRouteNames.has(nameKey(d.name))).length}</b><small>current team cards recognized on the Morning Sheet</small></div></div>
  <div class="team-directory-layout"><section class="grid team-grid">${drivers.map(driverTeamCardHtml).join('')}<div class="team-search-empty" data-team-search-empty hidden><strong>No driver found</strong><span>Try the legal name, nickname, or another linked name.</span></div></section><aside class="team-message-column">${morningMessageQueueHtml()}</aside></div>`;
}

function filterTeamDirectory(value='') {
  const query=nameKey(value),cards=[...document.querySelectorAll?.('[data-team-driver-name]')||[]];let visible=0;
  cards.forEach(card=>{const match=!query||String(card.dataset.teamDriverName||'').includes(query);card.hidden=!match;if(match)visible++;});
  const count=document.querySelector?.('[data-team-search-count]');if(count)count.textContent=query?`${visible} match${visible===1?'':'es'}`:`${cards.length} drivers`;
  const empty=document.querySelector?.('[data-team-search-empty]');if(empty)empty.hidden=visible!==0;
  return visible;
}

function fleetPage() {
  const vehicles=sortedRivianFleet(),electric=electricFleetVehicles(),gas=rivianFleet.filter(isGasFleetVehicle),low=electric.filter(isFleetLowBattery).length,charge=fleetChargeRows().length;
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded').length,coverage=fleetCoverageStats();
  const filters=['all','gas','changed','verified','needs-data','missing-fleetos','missing-amazon','amazon-only','fleetos-only','issues','low','grounded','inactive'];
  const labels={'all':'All vehicles','gas':'Gas Vehicles','changed':'Changed only','verified':'Verified only','needs-data':'Needs data','missing-fleetos':'Missing FleetOS','missing-amazon':'Missing Amazon','amazon-only':'Amazon only','fleetos-only':'FleetOS only','issues':'Issues','low':'Low-battery EVs','grounded':'Grounded only','inactive':'Inactive only'};
  return `${contextBar('<span class="status">Amazon names/status · FleetOS EV battery</span>')}
  ${fleetHealthSummary()}
  <section class="fleet-alert-squares"><button class="danger" data-action="fleet-filter-quick" data-filter="grounded"><span>Grounded vehicles</span><strong>${grounded}</strong><small>Red · do not assign</small></button><button class="battery" data-action="fleet-filter-quick" data-filter="low"><span>Low-battery EVs</span><strong>${low}</strong><small>${LOW_BATTERY_SECTION_THRESHOLD}% or lower</small></button><button class="charge" data-action="fleet-filter-quick" data-filter="low"><span>Recommended to charge</span><strong>${charge}</strong><small>${LOW_BATTERY_SECTION_THRESHOLD}% or lower</small></button><button class="review" data-action="fleet-filter-quick" data-filter="needs-data"><span>Needs information</span><strong>${coverage.needsData}</strong><small>Missing source fields</small></button></section>
  ${fleetIssuesPanel()}
  <article class="card rivian-panel simplified"><div class="card-head fleet-clean-head"><div class="card-title"><h2>All vehicles</h2><p>${electric.length} electric · ${gas.length} gas · names remain the same everywhere in RelayOps</p></div><div class="head-actions fleet-primary-actions"><input class="fleet-search-input" data-fleet-search placeholder="Find vehicle, VIN, or plate" value="${esc(state.fleetSearch)}"><select class="filter-select" data-fleet-filter>${filters.map(value=>`<option value="${value}" ${state.fleetFilter===value?'selected':''}>${labels[value]}</option>`).join('')}</select><select class="filter-select" data-rivian-sort><option value="normal" ${state.fleetSort==='normal'?'selected':''}>Default order</option><option value="battery-low" ${state.fleetSort==='battery-low'?'selected':''}>Battery: low to high</option></select><button class="btn small" data-action="clear-fleet-search">Clear</button><button class="btn small primary" data-action="refresh-fleet">Refresh</button></div></div>
  <div class="fleet-source-actions"><div class="amazon"><a href="${esc(fleetAmazonPortalUrl())}" target="_blank" rel="noopener">${ICONS.link}<span><b>Amazon Fleet</b><small>Names · VIN · status</small></span></a><button class="fleet-import-button amazon" data-action="fleet-import-amazon">${ICONS.upload}<span><b>Amazon Fleet Import <small>(.xlsx)</small></b><em>VehiclesData files only</em></span></button></div><div class="fleetos"><a href="${esc(fleetFleetosPortalUrl())}" target="_blank" rel="noopener">${ICONS.link}<span><b>FleetOS</b><small>Battery · range</small></span></a><button class="fleet-import-button fleetos" data-action="fleet-import-fleetos">${ICONS.upload}<span><b>FleetOS Import <small>(.csv)</small></b><em>Vehicle_List files only</em></span></button></div></div>
  <details class="fleet-small-tools" open><summary>More fleet tools</summary><div><label class="fleet-count-label">Expected vehicles<input class="fleet-count-input" data-fleet-expected type="number" min="0" inputmode="numeric" value="${state.fleetExpectedCount||''}" placeholder="all"></label>${fleetViewSwitcher()}<button class="btn small" data-action="fleet-live-setup" title="Set the authenticated Supabase proxy used by Refresh">${ICONS.settings} Authenticated Fleet proxy</button></div></details>
  ${fleetResultBar(vehicles.length,labels[state.fleetFilter]||'All vehicles')}<section class="grid rivian-grid ${fleetViewClass()}">${vehicles.length?vehicles.map(v=>rivianCard(v)).join(''):`<div class="empty-state">No vehicles match this search/filter. Press Clear to show every vehicle again.</div>`}</section></article>`;
}

function fleetViewMode() {
  return ['tiny','list','columns','detail'].includes(state.fleetView)?state.fleetView:'tiny';
}
function fleetViewClass() {
  const view=fleetViewMode();
  return view==='detail'?'detail-view':view==='list'?'list-view':view==='columns'?'columns-view':'tiny-view';
}
function fleetViewLabel() {
  return {tiny:'Tiny grid',list:'List view',columns:'Column view',detail:'Detail grid'}[fleetViewMode()]||'Tiny grid';
}
function fleetViewSwitcher() {
  const views=[
    ['tiny','Grid','▦','View: Tiny grid'],
    ['list','List','☷','View: List'],
    ['columns','Columns','▥','View: Columns'],
    ['detail','Detail','▭','View: Detail grid']
  ];
  return `<div class="fleet-view-switcher" role="group" aria-label="Fleet card view">${views.map(([value,label,icon,assistive])=>`<button class="${fleetViewMode()===value?'active':''}" data-action="set-fleet-view" data-view="${value}" title="${label}" aria-label="${assistive}"><span>${icon}</span><em>${label}</em>${value==='tiny'?`<i class="assistive-text">View: Tiny grid</i>`:''}${value==='detail'?`<i class="assistive-text">View: Detail grid</i>`:''}</button>`).join('')}<select class="assistive-text" data-fleet-view><option value="tiny" ${fleetViewMode()==='tiny'?'selected':''}>View: Tiny grid</option><option value="detail" ${fleetViewMode()==='detail'?'selected':''}>View: Detail grid</option></select></div>`;
}

function fleetHealthSummary() {
  const coverage=fleetCoverageStats(),electric=electricFleetVehicles(),gas=rivianFleet.filter(isGasFleetVehicle),known=electric.map(v=>knownBatteryPercent(v.battery)).filter(v=>v!==null),low=electric.filter(isFleetLowBattery).length,grounded=rivianFleet.filter(v=>v.operational==='Grounded').length;
  const avg=known.length?Math.round(known.reduce((n,v)=>n+v,0)/known.length):null;
  const sourceStatus=fleetSourceStatus();
  const liveReady=!!fleetLiveEndpoint();
  return `<div class="fleet-health-summary compact"><div class="fleet-health-card primary"><strong>${rivianFleet.length}</strong><span>All vehicles</span><small>${electric.length} electric · ${gas.length} gas</small></div><div class="fleet-health-card ${low||!known.length?'warn':'ok'}"><strong>${avg===null?'—':`${avg}%`}</strong><span>EV battery average</span><small>${known.length?`${low} at or below ${LOW_BATTERY_SECTION_THRESHOLD}%`:'Battery data unavailable'}</small></div><div class="fleet-health-card ${grounded?'danger':'ok'}"><strong>${grounded}</strong><span>Grounded</span><small>Do not assign</small></div><div class="fleet-health-card ${coverage.needsData?'warn':'ok'}"><strong>${coverage.verified}/${coverage.total}</strong><span>Verified sources</span><small>${sourceStatus.hasAmazon?'Amazon loaded':'Needs Amazon'} · ${sourceStatus.hasFleetos?'FleetOS loaded':'Needs FleetOS'} · ${liveReady?'Live ready':'Manual import'}</small></div></div>`;
}

function fleetChargeRows() {
  return electricFleetVehicles().filter(isFleetLowBattery).sort((a,b)=>knownBatteryPercent(a.battery)-knownBatteryPercent(b.battery)||String(a.name||'').localeCompare(String(b.name||'')));
}
function fleetChargeRecommendations() {
  const rows=fleetChargeRows();
  const urgent=rows.filter(v=>isDispatchBatteryBlocked(v)).length;
  const preview=rows.slice(0,8).map(v=>`<button data-action="toggle-fleet-card" data-vin="${esc(v.vin)}" class="${isDispatchBatteryBlocked(v)?'urgent':'watch'}"><b>${esc(fleetDisplayName(v))}</b><span>${v.battery}% · ${v.miles} mi</span><small>${esc(v.plate||v.vin)} · ${esc(v.operational||'—')}</small></button>`).join('');
  return `<div class="fleet-charge-recommendations ${rows.length?'warn':'ok'}"><div><strong>Recommended to be charged</strong><span>${rows.length?`${rows.length} EV${rows.length===1?'':'s'} at or below ${LOW_BATTERY_SECTION_THRESHOLD}% · ${urgent} priority under ${DISPATCH_BATTERY_BLOCK_THRESHOLD}%`:`No EVs at or below ${LOW_BATTERY_SECTION_THRESHOLD}% right now`}</span></div><div class="fleet-charge-preview">${preview||'<span class="charge-empty">Fleet is above the watch threshold.</span>'}</div><div class="fleet-charge-actions"><button class="btn small ${rows.length?'primary':'ghost'}" data-action="copy-charge-recommendations">${ICONS.copy} Copy charge list</button><button class="btn small" data-action="fleet-filter-quick" data-filter="low">Show low battery</button></div></div>`;
}

function parkingSlots(zone) {
  return (state.vanParking||[]).filter(slot=>slot.zone===zone);
}
function parkingBatteryForSlot(slot={}) {
  const key=slot.id;
  const bySlot=state.vanParkingBatteries?.[key];
  if(bySlot!==undefined&&bySlot!=='')return bySlot;
  const ev=String(slot.value||'').replace(/[^\w]/g,'').toUpperCase();
  return state.vanParkingBatteries?.[ev] || '';
}
function parkingBatteryTone(value) {
  const n=Number(String(value??'').replace(/[^\d]/g,''));
  if(!Number.isFinite(n)||String(value??'')==='')return 'empty';
  if(n>=90)return 'green';
  if(n>=70&&n<=80)return 'yellow';
  if(n<=60)return 'red';
  return 'neutral';
}
function applyParkingBatteryTone(input,value) {
  const chip=input?.closest?.('.parking-battery-mini');
  if(!chip)return;
  chip.classList.remove('battery-empty','battery-neutral','battery-green','battery-yellow','battery-red');
  chip.classList.add(`battery-${parkingBatteryTone(value)}`);
}
function parkingChargerButton(key,label='Charger',spotNumber='') {
  const status=state.parkingChargerStatus[key]||'unknown',text=status==='green'?'CHG':status==='red'?'FAULT':'SET',reports=(state.chargerReports||[]).filter(report=>report.chargerKey===key).length,location=spotNumber!==''?`spot #${spotNumber}`:label;
  const disabled=PARKING_ONLY_VIEW?' disabled aria-disabled="true"':'';
  return `<span class="parking-charger-control"><button type="button" class="parking-charger-toggle charger-${status}" data-parking-charger="${esc(key)}" title="${esc(label)}${PARKING_ONLY_VIEW?': status only':': click for green, red, or clear'}"${disabled}>${spotNumber!==''?`<small class="parking-spot-number">#${esc(spotNumber)}</small>`:''}<i></i><span>${text}</span></button>${PARKING_ONLY_VIEW?'':`<button type="button" class="charger-report-trigger" data-action="report-charging-station" data-charger-key="${esc(key)}" title="Report charging station at ${esc(location)}" aria-label="Report charging station at ${esc(location)}">!${reports?`<small>${reports}</small>`:''}</button>`}</span>`;
}
function parkingSpotNumber(zone='',index=0) {
  if(zone==='west'){
    const slots=parkingSlots('west'),slot=slots[index];
    if(!slot||slot.kind==='crosswalk')return '';
    const numberedRank=slots.slice(0,index+1).filter(row=>row.kind!=='crosswalk').length;
    if(numberedRank<=17)return numberedRank;
    return numberedRank<=21?numberedRank+19:'';
  }
  if(zone==='east'){
    const slots=parkingSlots('east'),slot=slots[index];
    if(!slot||slot.kind==='crosswalk')return '';
    const numberedRank=slots.slice(0,index+1).filter(row=>row.kind!=='crosswalk').length;
    return numberedRank<=20?37-numberedRank:'';
  }
  if(zone==='northRight')return 45-index;
  if(zone==='northLeft')return 50-index;
  return '';
}
function parkingChargerColumn() {
  const leftSlots=parkingSlots('west'),rightSlots=parkingSlots('east'),leftCount=leftSlots.length,rightCount=rightSlots.length,rows=Math.max(leftCount,rightCount,4);
  const tent=`<div class="parking-tent-square" title="Operations tent"><svg viewBox="0 0 64 52" aria-hidden="true"><path d="M32 5 57 45H7L32 5Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M32 5v40M20 45l12-18 12 18" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg><span>TENT</span></div>`;
  return `<div class="parking-crosswalk charger-column"><div class="parking-charger-pairs">${Array.from({length:rows},(_,index)=>{const isTent=index===3,left=index<leftCount&&!isTent&&leftSlots[index]?.kind!=='crosswalk'?parkingChargerButton(`middle-${index+1}-left`,`Left charger ${index+1}`,parkingSpotNumber('west',index)):'<span></span>',right=index<rightCount&&!isTent&&rightSlots[index]?.kind!=='crosswalk'?parkingChargerButton(`middle-${index+1}-right`,`Right charger ${index+1}`,parkingSpotNumber('east',index)):'<span></span>';return isTent?`<div class="charger-pair tent-row"><span></span>${tent}<span></span></div>`:`<div class="charger-pair">${left}${right}</div>`;}).join('')}</div></div>`;
}
function syncParkingSlotVisual(input) {
  const slot=input?.closest?.('.parking-slot');
  if(!slot)return;
  const value=String(input.value||'').trim(),blocked=/^x$/i.test(value);
  slot.classList.toggle('blocked',blocked);
  slot.classList.toggle('has-vehicle',Boolean(value)&&!blocked);
}
function parkingSlotInput(slot) {
  const tone=slot.kind==='crosswalk'?' crosswalk-slot':slot.kind==='overflow'?' overflow-slot':slot.kind==='street'?' street-slot':'';
  const selected=state.selectedParkingId===slot.id?' selected':'';
  const battery=parkingBatteryForSlot(slot);
  const batteryTone=parkingBatteryTone(battery);
  const blocked=/^x$/i.test(String(slot.value||''))||slot.kind==='blocked';
  const hasVehicle=Boolean(String(slot.value||'').trim())&&!blocked;
  const charging=slot.kind==='charging'||/\(\d{1,3}%\)/.test(String(slot.value||''));
  const showBatteryBox=['west','east','northLeft','northRight'].includes(slot.zone);
  const status=battery!==''?`${esc(battery)}%`:blocked?'BLOCK':charging?'CHG':'';
  const upperIndex=['northLeft','northRight'].includes(slot.zone)?parkingSlots(slot.zone).findIndex(item=>item.id===slot.id):-1;
  const upperCharger=upperIndex>=0?parkingChargerButton(`upper-${slot.id}`,`${slot.label} charger`,parkingSpotNumber(slot.zone,upperIndex)):'';
  const selectAttr=PARKING_ONLY_VIEW?'':` data-parking-select="${esc(slot.id)}"`;
  const vanInputAttrs=PARKING_ONLY_VIEW?' readonly tabindex="-1"':` data-parking-id="${esc(slot.id)}"`;
  const batteryInputAttrs=PARKING_ONLY_VIEW?' readonly tabindex="-1"':` data-parking-battery="${esc(slot.id)}"`;
  return `<div class="parking-slot parking-slot-row zone-${esc(slot.zone)}${tone}${selected}${blocked?' blocked':''}${charging?' charging':''}${hasVehicle?' has-vehicle':''}${slot.zone==='gas'?' gas-vehicle':' ev-vehicle'}" title="${esc(slot.label)}"><label class="parking-van-cell"${selectAttr}><span>${esc(slot.label)}</span><input aria-label="${esc(slot.label)}"${vanInputAttrs} value="${esc(slot.value||'')}" placeholder="${slot.kind==='street'?'STREET':''}">${!showBatteryBox&&status?`<em>${status}</em>`:''}</label>${showBatteryBox?`<label class="parking-battery-mini battery-${batteryTone}" title="Battery % for ${esc(slot.value||slot.label)}"><input aria-label="Battery percent for ${esc(slot.value||slot.label)}"${batteryInputAttrs} type="number" min="0" max="100" inputmode="numeric" value="${esc(battery)}" placeholder="--"></label>`:''}${upperCharger}</div>`;
}
function parkingStack(zone,title,subtitle='') {
  return `<section class="parking-stack ${zone}"><div class="parking-stack-title"><strong>${esc(title)}</strong>${subtitle?`<small>${esc(subtitle)}</small>`:''}</div>${parkingSlots(zone).map(parkingSlotInput).join('')}</section>`;
}
function parkingStreetCells(zone='street') {
  const slots=parkingSlots(zone);
  return Array.from({length:8}).map((_,i)=>`<div class="street-cell editable-street street-spot-cell">${slots[i]?parkingSlotInput(slots[i]):''}</div>`).join('');
}
function parkingStreetRows() {
  return `<div class="parking-street-row street-primary">${parkingStreetCells('street')}</div><div class="parking-street-row street-secondary">${parkingStreetCells('streetLower')}</div>`;
}
function vanParkingStats() {
  const values=(state.vanParking||[]).map(s=>String(s.value||'').trim()).filter(v=>v&&!/^x$/i.test(v)&&!/street/i.test(v));
  const nums=values.filter(v=>/\d/.test(v));
  return {filled:nums.length,total:(state.vanParking||[]).length,overflow:(state.vanParking||[]).filter(s=>s.kind==='crosswalk'||s.kind==='overflow').filter(s=>String(s.value||'').trim()).length};
}
function selectedParkingSlot() {
  return (state.vanParking||[]).find(s=>s.id===state.selectedParkingId) || (state.vanParking||[]).find(s=>String(s.value||'').trim()) || (state.vanParking||[])[0];
}
function parkingBatteryEditor() {
  if(PARKING_ONLY_VIEW)return '';
  const slot=selectedParkingSlot();
  if(!slot)return '';
  const battery=parkingBatteryForSlot(slot);
  const kinds=['spot','charging','crosswalk','overflow','street','blocked'];
  return `<div class="parking-selected-card"><div><span class="eyebrow">Selected van</span><strong>${esc(slot.value||'Empty spot')}</strong><small>${esc(slot.label)} · ${esc(slot.zone)}</small></div><label>Battery %<input data-parking-battery="${esc(slot.id)}" type="number" min="0" max="100" inputmode="numeric" value="${esc(battery)}" placeholder="Type %"></label><label>Spot type<select data-parking-kind="${esc(slot.id)}">${kinds.map(k=>`<option value="${k}" ${slot.kind===k?'selected':''}>${k}</option>`).join('')}</select></label><div class="parking-selected-actions"><button class="btn small" data-action="clear-selected-parking">Clear selected</button><button class="btn small ghost" data-action="remove-selected-parking">Remove temp spot</button></div></div>`;
}
function parkingModeControls() {
  if(PARKING_ONLY_VIEW)return '';
  const modes=[['auto','Auto','Reset to base layout'],['assisted','Assisted','Edit vans + battery'],['manual','Manual','Add/remove custom spots']];
  return `<div class="parking-mode-controls">${modes.map(([mode,label,detail])=>`<button class="${state.parkingMode===mode?'active':''}" data-action="set-parking-mode" data-mode="${mode}"><b>${esc(label)}</b><span>${esc(detail)}</span></button>`).join('')}<button class="add-temp-spot" data-action="add-parking-spot">${ICONS.plus} Add temp spot</button></div>`;
}
function vanParkingSectionLegacy() {
  const stats=vanParkingStats();
  const headActions=`<span class="parking-updated">Updated ${esc(state.vanParkingUpdated||'today')}</span><button class="btn small" data-action="copy-parking-list">${ICONS.copy} Copy parking list</button>${PARKING_ONLY_VIEW?'':`<button class="btn small ghost" data-action="reset-parking">Reset mockup</button>`}`;
  const editTools=PARKING_ONLY_VIEW?'':`<div class="parking-import-row"><div class="parking-drop" id="parking-drop" tabindex="0"><b>Drop parking list here</b><span>CSV, XLSX, TXT, or a copied Google Sheets export. One EV per row works best.</span><button class="btn small primary" data-action="parking-choose-file">${ICONS.upload} Choose file</button></div>${parkingBatteryEditor()}<div class="parking-paste-box"><label for="parking-paste-text">Paste parking list</label><textarea id="parking-paste-text" placeholder="57&#10;2&#10;1&#10;4&#10;...">${esc(state.vanParkingPasteText)}</textarea><button class="btn small" data-action="parse-parking-paste">Fill parking spots</button></div></div>`;
  const helperText=PARKING_ONLY_VIEW?'<strong>View only</strong><span>Parking and battery data for fleet team.</span>':'<strong>Click a van</strong><span>Type EV number, battery %, or spot type.</span>';
  const mapHint=PARKING_ONLY_VIEW?'Fleet team view: arrangement, battery, and charger status':'Click any stall to edit the van and battery';
  return `<article class="van-parking-card ${PARKING_ONLY_VIEW?'parking-view-only':''}" id="van-parking"><div class="van-parking-head"><div><span class="eyebrow">Van Parking</span><h2>Parking Map</h2><p>Closing dispatcher updates this at night. Morning dispatcher uses it to keep each wave parked together and avoid drivers hunting for vans.</p></div><div class="parking-head-actions">${headActions}</div></div>${parkingModeControls()}<div class="parking-helper-grid park-easy-stats"><div><strong>${stats.filled}</strong><span>occupied / assigned</span></div><div><strong>${stats.overflow}</strong><span>overflow + crosswalk spots</span></div><div>${helperText}</div></div>${editTools}<div class="parking-lot park-easy-map"><div class="parking-map-toolbar"><div><strong>Overhead lot view</strong><span>${mapHint}</span></div><div class="parking-map-legend"><span><i class="ready"></i>Standard stall</span><span><i class="cross"></i>Crosswalk / overflow</span><span><i class="charge"></i>Charging</span></div></div><div class="parking-map-grid"><div class="parking-empty-grid"><span class="lot-entry">ENTRY</span><span class="lane-arrow arrow-east">→</span><span class="lane-arrow arrow-north">↑</span><small>DRIVE LANE</small></div><div class="parking-top-block"><div class="parking-lane"></div>${parkingStack('northLeft','', '')}<div class="parking-lane skinny"><span class="lane-arrow">↕</span></div>${parkingStack('northRight','', '')}<div class="parking-lane"></div></div><div class="parking-street-zone">${parkingStreetRows()}</div><div class="parking-main-block"><div class="parking-lane vertical"><span class="lane-arrow">↓</span></div>${parkingStack('west','', '')}<div class="parking-crosswalk"><div class="tent-icon">TENT</div><strong>TENT</strong>${parkingStack('crosswalk','', '')}</div>${parkingStack('east','', '')}<div class="parking-lane vertical"><span class="lane-arrow">↑</span></div></div><div class="parking-side-area"><div class="parking-date-box"><strong>MAP UPDATED</strong><span>${esc(state.vanParkingUpdated||'')}</span></div><div class="lot-exit"><span>EXIT</span><b>→</b></div></div></div></div></article>`;
}
function parkingDateInputValue() { const value=String(state.vanParkingUpdated||'');if(/^\d{4}-\d{2}-\d{2}$/.test(value))return value;const m=value.match(/(\d{1,2})\/(\d{1,2})/);return m?`${new Date().getFullYear()}-${String(m[1]).padStart(2,'0')}-${String(m[2]).padStart(2,'0')}`:defaultOperationDate(); }
function chargingCheckDateInputValue() { const value=String(state.chargingStationChecked||'');return /^\d{4}-\d{2}-\d{2}$/.test(value)?value:''; }
function parkingGasArea() { return `<section class="parking-gas-area"><div><strong>Gas vehicle parking</strong><span>${parkingSlots('gas').filter(slot=>slot.value).length} tracked spots</span></div><div class="parking-gas-grid">${parkingSlots('gas').map(parkingSlotInput).join('')}</div></section>`; }

function vanParkingSection() {
  const withChargers=vanParkingSectionLegacy()
    .replace(/<div class="parking-crosswalk">[\s\S]*?(?=<section class="parking-stack east">)/,parkingChargerColumn())
    .replace(/<div class="lot-exit"><span>EXIT<\/span><b>→<\/b><\/div>/,`<div class="lot-exit"><span>EXIT</span><b>→</b></div>${parkingGasArea()}`);
  if(PARKING_ONLY_VIEW)return withChargers;
  return withChargers
    .replace(/<span class="parking-updated">Updated [\s\S]*?<\/span>/,`<label class="parking-updated parking-date-edit"><span>Last edit</span><input type="date" data-parking-date value="${esc(parkingDateInputValue())}"></label>`)
    .replace(/<div class="parking-empty-grid">[\s\S]*?<\/div><div class="parking-top-block">/,`<div class="parking-empty-grid parking-notes-area"><label><span>Add notes</span><textarea data-parking-notes placeholder="Charging issues, blocked lanes, keys, or closing notes…">${esc(state.parkingNotes||'')}</textarea></label></div><div class="parking-top-block">`)
    .replace(/<div class="parking-date-box"><strong>MAP UPDATED<\/strong><span>[\s\S]*?<\/span><\/div>/,`<div class="parking-date-cluster"><div class="parking-date-box"><strong>MAP UPDATED</strong><input type="date" data-parking-date value="${esc(parkingDateInputValue())}"></div><div class="parking-date-box charging-check-date"><strong>CHARGING STATION CHECK</strong><input type="date" data-charging-check-date value="${esc(chargingCheckDateInputValue())}"></div></div>`);
}

function vanParkingPage() {
  const issueCount=Object.values(state.parkingChargerStatus||{}).filter(status=>status==='red').length;
  const actions=PARKING_ONLY_VIEW?`<span class="status neutral">Fleet team view</span><button class="btn small" data-action="copy-parking-list">${ICONS.copy} Copy parking</button>`:`<button class="btn small primary" data-action="parking-choose-file">${ICONS.upload} Import parking</button><button class="btn small" data-action="copy-parking-list">${ICONS.copy} Copy parking</button><button class="btn small lime" data-action="copy-fleet-parking-link">${ICONS.link} Copy fleet team link</button><button class="btn small ${issueCount?'danger':''}" data-action="report-charging-station">⚡ Report charging station${issueCount?` · ${issueCount} fault${issueCount===1?'':'s'}`:''}</button>`;
  return `${contextBar(actions)}${vanParkingSection()}`;
}

function fleetSourceNote() {
  const coverage=fleetCoverageStats(), sourceStatus=fleetSourceStatus(), age=fleetUploadAge();
  const uploadedAt=state.fleetImport?.uploadedAt?new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(state.fleetImport.uploadedAt)):'';
  const sourceName=state.fleetImport?.name?`Latest upload: ${esc(state.fleetImport.name)}${uploadedAt?` · loaded ${uploadedAt}`:''}${age.label?` · ${esc(age.label)}`:''}`:'Upload FleetOS + Amazon exports when you have them.';
  return `<div class="fleet-source-note ${age.stale?'stale':''}"><strong>${sourceName}</strong>${age.stale?'<div class="fleet-stale-warning">Battery data may be stale — upload fresh FleetOS/Amazon exports before dispatch decisions.</div>':''}<div class="fleet-sync-steps"><span>1. Open FleetOS and Amazon</span><span>2. Upload/export both lists</span><span>3. Press Refresh to re-check the latest real data</span></div><div class="fleet-source-checks"><span class="${sourceStatus.hasAmazon?'ok':'warn'}"><b>${sourceStatus.hasAmazon?'✓':'!'}</b> Amazon fleet list</span><span class="${sourceStatus.hasFleetos?'ok':'warn'}"><b>${sourceStatus.hasFleetos?'✓':'!'}</b> FleetOS battery/range</span></div><div class="fleet-coverage-strip"><span class="${coverage.demo?'warn':''}"><b>${coverage.demo}</b> demo</span><span><b>${coverage.amazonOnly}</b> Amazon only</span><span><b>${coverage.fleetosOnly}</b> FleetOS only</span><span class="${coverage.needsData?'warn':'ok'}"><b>${coverage.needsData}</b> need data</span></div><small>RelayOps matches rows by VIN first, keeps Amazon fleet-list names exactly as uploaded, and marks anything that is not fully verified.</small></div>`;
}

function fleetDataDrawer() {
  return `<details class="fleet-data-drawer"><summary><div><strong>Data checks & setup</strong><span>Live connector, import proof, source gaps, and portal links</span></div><b>Open</b></summary><div class="fleet-drawer-body">${fleetLiveConnectorStrip()}${fleetSourceTimestampStrip()}${fleetHeaderRefreshGuide()}${fleetNextStepBox()}${fleetPortalQuickStart()}${fleetTrustStrip()}${fleetDispatchChecklist()}${fleetSourceNote()}${fleetPortalMatchStrip()}${fleetRowCountCheckStrip()}${fleetNameLockStrip()}${fleetDispatcherProofStrip()}${fleetosRosterCoverageStrip()}${fleetSourceMapStrip()}${fleetSourceHealthStrip()}${fleetGapAuditStrip()}${fleetFullListStrip()}${fleetRefreshReadinessStrip()}${fleetUpdateSummary()}${fleetRecentChangesStrip()}${fleetAttentionStrip()}${fleetAccuracyGate()}${fleetLegend()}</div></details>`;
}

function fleetPortalQuickStart() {
  return `<div class="fleet-portal-guide"><div><strong>1 · Amazon names the van</strong><span>Use the Amazon fleet list for the official EV name, VIN, license plate, Active/Inactive, and Operational/Grounded.</span><a href="https://logistics.amazon.com/fleet-management/#vehicles" target="_blank" rel="noopener">Open Amazon fleet list</a></div><div><strong>2 · FleetOS updates battery</strong><span>Use the Rivian/FleetOS tracker for state of charge, range miles, and charging readiness.</span><a href="https://business.rivian.com/vehicles/tracker" target="_blank" rel="noopener">Open FleetOS tracker</a></div><div class="refresh-rule"><strong>3 · Refresh rule</strong><span>Refresh rebuilds the grid from the latest files you uploaded. If the portals changed, upload fresh exports first so the board stays accurate.</span><button class="btn small primary" data-action="fleet-import">Upload latest lists</button></div></div>`;
}

function fleetLiveEndpoint() {
  return String(state.fleetLiveEndpoint || window.RELAYOPS_LIVE_FLEET_ENDPOINT || '').trim();
}
function fleetLiveEndpointInfo(value=fleetLiveEndpoint()) {
  const raw=String(value||'').trim();
  if(!raw)return {valid:false,empty:true,local:false,error:'No authenticated proxy endpoint saved'};
  try {
    const url=new URL(raw);
    const hostname=url.hostname.toLowerCase();
    const local=['localhost','127.0.0.1','::1','[::1]'].includes(hostname);
    if(url.username||url.password)return {valid:false,local,error:'Do not put usernames, passwords, or tokens in the endpoint URL'};
    if(url.protocol!=='https:'&&!(local&&url.protocol==='http:'))return {valid:false,local,error:'Use an HTTPS authenticated proxy. HTTP is allowed only on localhost for development'};
    if(['logistics.amazon.com','business.rivian.com'].includes(hostname))return {valid:false,local,error:'Use the RelayOps authenticated proxy endpoint, not an Amazon or FleetOS page'};
    if(url.search||url.hash)return {valid:false,local,error:'The authenticated proxy URL cannot contain query parameters, fragments, or tokens'};
    if(!local&&!url.pathname.split('/').includes('fleet-live-proxy'))return {valid:false,local,error:'Use the deployed fleet-live-proxy endpoint, not the private connector URL'};
    return {valid:true,local,url:url.toString(),error:''};
  } catch {
    return {valid:false,local:false,error:'Enter a complete HTTPS authenticated proxy URL'};
  }
}
function fleetAmazonPortalUrl() {
  return String(state.fleetAmazonUrl || AMAZON_FLEET_PORTAL_URL).trim();
}
function fleetFleetosPortalUrl() {
  return String(state.fleetFleetosUrl || FLEETOS_PORTAL_URL).trim();
}

function fleetLiveConnectorStrip() {
  const endpoint=fleetLiveEndpoint(), endpointInfo=fleetLiveEndpointInfo(endpoint), connected=endpointInfo.valid, last=state.fleetLiveLastPull, error=state.fleetLiveLastError||(!endpointInfo.empty&&!endpointInfo.valid?endpointInfo.error:'');
  const signedIn=Boolean(window.RelayOpsCloud?.session), authReady=endpointInfo.local||signedIn;
  const tone=connected&&authReady?(error?'warn':'ok'):'warn';
  const title=connected?(authReady?'Authenticated Fleet proxy ready':'Fleet proxy saved · dispatcher sign-in required'):'Authenticated Fleet proxy not connected';
  const detail=connected?`${endpointInfo.local?'Local development proxy':'Refresh sends the signed-in dispatcher’s Supabase access token to the proxy'}; the private connector token stays server-side. ${last?`Last live pull: ${esc(last)}.`:'No authenticated pull completed yet.'}`:'Save an HTTPS Supabase Edge Function or equivalent authenticated proxy endpoint. Refresh never calls Amazon, FleetOS, or the private connector directly from this browser.';
  return `<div class="fleet-live-connector ${tone}"><div><strong>${esc(title)}</strong><span>${detail}</span>${error?`<small>${esc(error)}</small>`:''}<div class="fleet-live-links"><a href="${esc(fleetAmazonPortalUrl())}" target="_blank" rel="noopener">Amazon Fleet</a><a href="${esc(fleetFleetosPortalUrl())}" target="_blank" rel="noopener">FleetOS</a></div></div><div class="fleet-live-connector-steps"><span class="ok"><b>1</b>Amazon Fleet link saved</span><span class="ok"><b>2</b>FleetOS link saved</span><span class="${connected?'ok':'warn'}"><b>3</b>Authenticated proxy endpoint</span><span class="${authReady?'ok':'warn'}"><b>4</b>${authReady?'Dispatcher session ready':'Sign in before cloud refresh'}</span></div><button class="btn small ${connected&&authReady?'lime':'primary'}" data-action="${connected&&authReady?'refresh-fleet':'fleet-live-setup'}">${connected&&authReady?'Authenticated refresh':'Proxy setup'}<span class="assistive-text">Set authenticated proxy endpoint</span></button></div>`;
}

function fleetHeaderAccuracyBadge() {
  const stats=fleetPortalMatchStats(), coverage=fleetCoverageStats(), expected=Number(state.fleetExpectedCount)||0;
  const amazonAge=fleetSourceAge('amazon'), fleetosAge=fleetSourceAge('fleetos'), duplicateCount=state.fleetUpdateSummary?.duplicates||0, conflictCount=state.fleetUpdateSummary?.conflicts||0;
  const short=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const stale=(amazonAge.hasUpload&&amazonAge.stale)||(fleetosAge.hasUpload&&fleetosAge.stale);
  const verified=stats.rows.length&&stats.amazon.size&&stats.fleetos.size&&!duplicateCount&&!conflictCount&&!coverage.needsData&&!short&&!stats.amazonOnly.length&&!stats.fleetosOnly.length&&!stale&&coverage.verified===coverage.total;
  let tone='demo', label='DEMO', detail='Upload Amazon + FleetOS before trusting EV battery/status.';
  if(verified){tone='ok';label='VERIFIED';detail=`${coverage.verified}/${coverage.total} EVs matched by VIN · sources fresh`;}
  else if(stale){tone='stale';label='STALE';detail=`Upload fresh files: Amazon ${amazonAge.label}, FleetOS ${fleetosAge.label}`;}
  else if(stats.rows.length){const issueCount=coverage.needsData+stats.amazonOnly.length+stats.fleetosOnly.length+short+duplicateCount+conflictCount;tone='warn';label='NOT READY';detail=`${coverage.verified}/${coverage.total} verified · ${issueCount} issue${issueCount===1?'':'s'} to fix`;}
  return `<div class="fleet-header-badge ${tone}" title="${esc(detail)}"><b>Header status: ${esc(label)}</b><span>${esc(detail)}</span></div>`;
}

function fleetSourceTimestampStrip() {
  const sourceBox=(key,label,fields)=>{
    const age=fleetSourceAge(key), uploaded=fleetSourceUploadedAt(key), upload=state.fleetSourceUploads?.[key], rows=upload?.vehicles?.length||0;
    const status=!age.hasUpload?'Missing':age.stale?'Stale':'Fresh', tone=!age.hasUpload||age.stale?'warn':'ok';
    return `<span class="${tone}"><b>${esc(label)}</b><em>${esc(status)} · ${esc(age.label)}</em><small>${rows?`${rows} rows · loaded ${uploaded}`:'No upload yet'} · ${esc(fields)}</small></span>`;
  };
  return `<div class="fleet-source-timestamps"><strong>Source timestamps</strong>${sourceBox('amazon','Amazon fleet list','name / plate / active / grounded')}${sourceBox('fleetos','FleetOS tracker','battery % / range miles')}<div class="fleet-refresh-rule-mini"><b>Refresh rule</b><span>Refresh checks the latest uploaded files. If Amazon or FleetOS changed, upload fresh exports first.</span></div><button class="btn small primary" data-action="fleet-import">Upload fresh files</button></div>`;
}

function fleetNextStepBox() {
  const stats=fleetPortalMatchStats(), coverage=fleetCoverageStats(), amazonAge=fleetSourceAge('amazon'), fleetosAge=fleetSourceAge('fleetos');
  const expected=Number(state.fleetExpectedCount)||0, expectedShort=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const duplicates=state.fleetUpdateSummary?.duplicates||0, conflicts=state.fleetUpdateSummary?.conflicts||0, grounded=rivianFleet.filter(v=>v.operational==='Grounded').length, low=rivianFleet.filter(isDispatchBatteryBlocked).length;
  const hasAmazon=stats.amazon.size>0||coverage.amazonOnly>0||coverage.verified>0;
  const hasFleetos=stats.fleetos.size>0||coverage.fleetosOnly>0||coverage.verified>0;
  let step={tone:'warn',badge:'1',title:'Upload today’s Amazon + FleetOS files',detail:'Start here: upload both portal exports so EV names, VINs, status, and battery % can match.',action:'fleet-import',button:'Upload files'};
  if(!hasAmazon&&!hasFleetos) return `<div class="fleet-next-step ${step.tone}"><div class="next-step-badge">${esc(step.badge)}</div><div><strong>Next step: ${esc(step.title)}</strong><span>${esc(step.detail)}</span></div><button class="btn small primary" data-action="${esc(step.action)}">${esc(step.button)}</button></div>`;
  if(hasAmazon&&!hasFleetos) step={tone:'warn',badge:'2',title:'Upload FleetOS battery tracker next',detail:'Amazon names are loaded. Add FleetOS so every VIN gets battery % and range.',action:'fleet-import',button:'Upload FleetOS'};
  else if(hasFleetos&&!hasAmazon) step={tone:'warn',badge:'2',title:'Upload Amazon fleet list next',detail:'FleetOS battery is loaded. Add Amazon so every VIN gets the official van name, plate, and status.',action:'fleet-import',button:'Upload Amazon'};
  else if((amazonAge.hasUpload&&amazonAge.stale)||(fleetosAge.hasUpload&&fleetosAge.stale)) step={tone:'warn',badge:'!',title:'Upload fresh portal exports',detail:`Saved data is stale: Amazon ${amazonAge.label}, FleetOS ${fleetosAge.label}. Upload fresh files before dispatch.`,action:'fleet-import',button:'Upload fresh files'};
  else if(duplicates) step={tone:'warn',badge:'!',title:'Fix duplicate VINs before trusting the board',detail:`${duplicates} duplicate VIN${duplicates===1?'':'s'} found. Download the gap CSV or clean the source file.`,action:'export-fleet-gaps',button:'Gap CSV'};
  else if(conflicts) step={tone:'warn',badge:'!',title:'Fix conflicting VIN data',detail:`${conflicts} conflicting field${conflicts===1?'':'s'} found for the same VIN/source. Clean the export before refresh.`,action:'export-fleet-gaps',button:'Gap CSV'};
  else if(expectedShort) step={tone:'warn',badge:'!',title:'Fleet list is short',detail:`${expectedShort} EV${expectedShort===1?' is':'s are'} missing from expected ${expected}. Check if the export was partial.`,action:'export-fleet-gaps',button:'Gap CSV'};
  else if(coverage.needsData) step={tone:'warn',badge:'3',title:'Review EVs missing data',detail:`${coverage.needsData} card${coverage.needsData===1?' needs':'s need'} plate, status, Amazon name, or FleetOS battery data.`,action:'fleet-filter-quick',filter:'needs-data',button:'Show needs data'};
  else if(grounded||low) step={tone:'caution',badge:'4',title:'Review grounded or priority-charge EVs',detail:`${grounded} grounded · ${low} under ${DISPATCH_BATTERY_BLOCK_THRESHOLD}%. Decide what needs charge, swap, or maintenance follow-up.`,action:'fleet-filter-quick',filter:grounded?'grounded':'low',button:'Review EVs'};
  else if(stats.amazon.size&&stats.fleetos.size) step={tone:'ok',badge:'✓',title:'Ready — review refresh before launch',detail:'Both portals are matched by VIN. Press Refresh to review any final battery/status changes before using the board.',action:'refresh-fleet',button:'Review refresh'};
  return `<div class="fleet-next-step ${step.tone}"><div class="next-step-badge">${esc(step.badge)}</div><div><strong>Next step: ${esc(step.title)}</strong><span>${esc(step.detail)}</span></div><button class="btn small ${step.tone==='ok'?'lime':'primary'}" data-action="${esc(step.action)}" ${step.filter?`data-filter="${esc(step.filter)}"`:''}>${esc(step.button)}</button></div>`;
}

function fleetTrustStrip() {
  const stats=fleetPortalMatchStats(), coverage=fleetCoverageStats(), expected=Number(state.fleetExpectedCount)||0;
  const amazonAge=fleetSourceAge('amazon'), fleetosAge=fleetSourceAge('fleetos');
  const short=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const duplicateCount=state.fleetUpdateSummary?.duplicates||0;
  const conflictCount=state.fleetUpdateSummary?.conflicts||0;
  const issues=[];
  if(!stats.rows.length)issues.push('No real portal upload yet');
  if(!stats.amazon.size)issues.push('Amazon names/status missing');
  if(!stats.fleetos.size)issues.push('FleetOS battery missing');
  if(duplicateCount)issues.push(`${duplicateCount} duplicate VIN${duplicateCount===1?'':'s'} in upload`);
  if(conflictCount)issues.push(`${conflictCount} conflicting field${conflictCount===1?'':'s'} in upload`);
  if(stats.amazonOnly.length)issues.push(`${stats.amazonOnly.length} VIN${stats.amazonOnly.length===1?'':'s'} missing FleetOS`);
  if(stats.fleetosOnly.length)issues.push(`${stats.fleetosOnly.length} VIN${stats.fleetosOnly.length===1?'':'s'} missing Amazon`);
  if(coverage.needsData)issues.push(`${coverage.needsData} card${coverage.needsData===1?'':'s'} need data`);
  if(short)issues.push(`${short} EV${short===1?'':'s'} short of expected`);
  if(amazonAge.hasUpload&&amazonAge.stale)issues.push('Amazon upload stale');
  if(fleetosAge.hasUpload&&fleetosAge.stale)issues.push('FleetOS upload stale');
  const verified=issues.length===0&&coverage.total>0&&coverage.verified===coverage.total;
  const title=verified?'Board trust: verified':'Board trust: not 100% yet';
  const message=verified?'Use this board for dispatch: every EV is matched by VIN with Amazon names/status and FleetOS battery data.':issues.slice(0,3).join(' · ');
  return `<div class="fleet-trust-strip ${verified?'ok':'warn'}"><div class="trust-badge">${verified?'YES':'WAIT'}</div><div><strong>${esc(title)}</strong><span>${esc(message||'Upload both portal lists before using this board for final dispatch decisions.')}${issues.length>3?` · ${issues.length-3} more`:''}</span></div><div class="trust-mini"><span><b>${coverage.verified}/${coverage.total}</b>verified cards</span><span><b>${stats.uniqueVins.size}</b>portal VINs</span><span><b>${expected||'Set'}</b>${expected?'expected':'expected count'}</span></div><button class="btn small ${verified?'lime':'primary'}" data-action="${verified?'refresh-fleet':'fleet-import'}">${verified?'Refresh verified board':'Fix with upload'}</button></div>`;
}

function fleetDispatchChecklist() {
  const stats=fleetPortalMatchStats(), coverage=fleetCoverageStats();
  const amazonAge=fleetSourceAge('amazon'), fleetosAge=fleetSourceAge('fleetos');
  const expected=Number(state.fleetExpectedCount)||0, expectedShort=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const duplicateVins=state.fleetUpdateSummary?.duplicateVins||[], duplicateCount=duplicateVins.length;
  const conflictCount=state.fleetUpdateSummary?.conflicts||0;
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded').length, low=rivianFleet.filter(isFleetLowBattery).length;
  const missingPortalFilter=stats.amazonOnly.length?'missing-fleetos':stats.fleetosOnly.length?'missing-amazon':'';
  const items=[
    {ok:amazonAge.hasUpload&&!amazonAge.stale,label:'Amazon fleet list loaded',detail:amazonAge.hasUpload?amazonAge.label:'Need official names/status',action:'fleet-import',button:'Upload'},
    {ok:fleetosAge.hasUpload&&!fleetosAge.stale,label:'FleetOS battery loaded',detail:fleetosAge.hasUpload?fleetosAge.label:'Need battery/range',action:'fleet-import',button:'Upload'},
    {ok:stats.both.length>0&&!stats.amazonOnly.length&&!stats.fleetosOnly.length,label:'VINs match both portals',detail:stats.uniqueVins.size?`${stats.both.length}/${stats.uniqueVins.size} matched`:'No portal VINs yet',action:missingPortalFilter?'fleet-filter-quick':'export-fleet-gaps',filter:missingPortalFilter,button:missingPortalFilter?'Review':'Gap CSV'},
    {ok:expected>0&&!expectedShort,label:'Expected EV count covered',detail:expected?`${stats.uniqueVins.size}/${expected} portal VINs loaded`:'Need Amazon fleet count',action:expectedShort?'export-fleet-gaps':'fleet-import',button:expectedShort?'Gap CSV':'Upload'},
    {ok:duplicateCount===0,label:'No duplicate VINs',detail:duplicateCount?`${duplicateCount} duplicate VIN${duplicateCount===1?'':'s'}`:'No duplicate rows',action:'export-fleet-gaps',button:'Gap CSV'},
    {ok:conflictCount===0,label:'No conflicting VIN data',detail:conflictCount?`${conflictCount} conflict${conflictCount===1?'':'s'} to clean`:'No field conflicts',action:'export-fleet-gaps',button:'Gap CSV'},
    {ok:coverage.needsData===0,label:'No missing card data',detail:coverage.needsData?`${coverage.needsData} need review`:'All cards filled',action:'fleet-filter-quick',filter:'needs-data',button:'Review'},
    {ok:grounded===0&&low===0,label:'No grounded / low battery surprises',detail:`${grounded} grounded · ${low} low`,action:grounded?'fleet-filter-quick':'fleet-filter-quick',filter:grounded?'grounded':'low',button:'Review'}
  ];
  const ready=items.every(x=>x.ok);
  return `<div class="fleet-dispatch-checklist ${ready?'ok':'warn'}"><div><strong>Before dispatch checklist</strong><span>${ready?'Ready to use after final dispatcher review.':'Fix yellow items before trusting this board for launch.'}</span></div><div class="dispatch-check-items">${items.map(x=>`<button class="${x.ok?'ok':'warn'}" data-action="${x.action}" ${x.filter?`data-filter="${x.filter}"`:''}><b>${x.ok?'✓':'!'}</b><span>${esc(x.label)}</span><em>${esc(x.detail)}</em><small>${esc(x.ok?'Done':x.button)}</small></button>`).join('')}</div></div>`;
}

function fleetUpdateSummary() {
  const s=state.fleetUpdateSummary;
  if(!s)return '';
  const duplicateList=(s.duplicateVins||[]).slice(0,3).join(', ');
  const conflictList=(s.conflictVins||[]).slice(0,3).join(', ');
  return `<div class="fleet-update-summary"><span><b>${s.input}</b> rows read</span><span><b>${s.updated}</b> updated</span><span><b>${s.newCount}</b> new</span><span class="${s.duplicates?'warn':''}"><b>${s.duplicates||0}</b> duplicate VINs${duplicateList?`<em>${esc(duplicateList)}${s.duplicateVins.length>3?'…':''}</em>`:''}</span><span class="${s.conflicts?'warn':''}"><b>${s.conflicts||0}</b> field conflicts${conflictList?`<em>${esc(conflictList)}${s.conflictVins.length>3?'…':''}</em>`:''}</span><span><b>${s.removed||0}</b> not in upload</span><span><b>${s.visible}</b> showing now</span></div>`;
}

function fleetResultBar(visible=0,filterLabel='Show all EVs') {
  const total=rivianFleet.length, searching=String(state.fleetSearch||'').trim();
  return `<div class="fleet-result-bar"><div><strong>${visible} of ${total} vehicles showing</strong><span>${esc(filterLabel)}${searching?` · search: “${esc(searching)}”`:''}</span></div><div><span>${esc(fleetViewLabel())}</span><button class="btn small" data-action="copy-visible-fleet-vins">Copy visible VINs</button><button class="btn small ghost" data-action="clear-fleet-search">Show all vehicles</button></div></div>`;
}

function fleetHeaderRefreshGuide() {
  const status=fleetSourceStatus();
  const both=status.hasAmazon&&status.hasFleetos;
  const headline=both?'Refresh is ready to compare both portals':'Upload both portal lists for a trusted refresh';
  const action=both?'Press Refresh to review changes before the grid updates.':'Start with Upload / paste fleet list, then refresh once both sides are loaded.';
  return `<div class="fleet-refresh-guide ${both?'ok':'warn'}"><div><strong>${esc(headline)}</strong><span>${esc(action)}</span></div><div class="fleet-refresh-guide-map"><span class="${status.hasAmazon?'ok':'warn'}"><b>Amazon</b>EV name, plate, Active/Inactive, Grounded</span><span class="${status.hasFleetos?'ok':'warn'}"><b>FleetOS</b>battery %, miles, charge readiness</span><span class="ok"><b>VIN</b>matches the same van across both files</span></div></div>`;
}

function fleetQuickFilterChips() {
  const counts={
    all:rivianFleet.length,
    verified:rivianFleet.filter(v=>fleetConfidence(v).label==='Verified').length,
    low:rivianFleet.filter(isFleetLowBattery).length,
    grounded:rivianFleet.filter(v=>v.operational==='Grounded').length,
    'needs-data':rivianFleet.filter(v=>fleetMissingFields(v).length).length,
    changed:fleetRecentChanges().length
  };
  const chips=[
    ['all','All EVs'],
    ['verified','Verified'],
    ['low','Low battery'],
    ['grounded','Grounded'],
    ['needs-data','Missing data'],
    ['changed','Changed']
  ];
  return `<div class="fleet-filter-chips" aria-label="Quick Fleet filters">${chips.map(([filter,label])=>`<button class="${state.fleetFilter===filter?'active':''} ${counts[filter]?'':'empty'}" data-action="fleet-filter-quick" data-filter="${filter}"><b>${counts[filter]}</b>${esc(label)}</button>`).join('')}</div>`;
}

function fleetAttentionStrip() {
  const charge=rivianFleet.filter(isFleetLowBattery);
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded');
  const missing=rivianFleet.filter(v=>fleetMissingFields(v).length);
  const attention=fleetAttentionRows();
  const firstNames=rows=>rows.slice(0,3).map(v=>v.name).join(', ')||'None';
  return `<div class="fleet-attention-strip"><button data-action="fleet-filter-quick" data-filter="low" class="${charge.length?'warn':'ok'}"><b>${charge.length}</b><span>Need charge</span><small>${esc(firstNames(charge))}</small></button><button data-action="fleet-filter-quick" data-filter="grounded" class="${grounded.length?'danger':'ok'}"><b>${grounded.length}</b><span>Grounded</span><small>${esc(firstNames(grounded))}</small></button><button data-action="fleet-filter-quick" data-filter="needs-data" class="${missing.length?'warn':'ok'}"><b>${missing.length}</b><span>Missing data</span><small>${esc(firstNames(missing))}</small></button><button data-action="copy-fleet-attention" class="${attention.length?'warn':'ok'}"><b>${attention.length}</b><span>Copy alerts</span><small>${attention.length?'Low / grounded list':'No EV alerts'}</small></button></div>`;
}

function fleetRecentChanges() {
  return rivianFleet.filter(v=>(state.fleetChangedVins?.[v.vin]||v.changedFields||[]).length);
}
function fleetChangeSourceLabels(fields=[]) {
  const amazonFields=new Set(['name','plate','active status','operational state']);
  const fleetosFields=new Set(['battery','range']);
  const labels=[];
  const cleanFields=fields.filter(Boolean);
  const amazon=cleanFields.filter(f=>amazonFields.has(f));
  const fleetos=cleanFields.filter(f=>fleetosFields.has(f));
  const other=cleanFields.filter(f=>!amazonFields.has(f)&&!fleetosFields.has(f));
  if(amazon.length)labels.push(`Amazon: ${amazon.join(', ')}`);
  if(fleetos.length)labels.push(`FleetOS: ${fleetos.join(', ')}`);
  if(other.length)labels.push(`Other: ${other.join(', ')}`);
  return labels;
}
function fleetChangeSourcePills(fields=[]) {
  const labels=fleetChangeSourceLabels(fields);
  return labels.length?`<em class="change-source-pills">${labels.map(label=>`<i>${esc(label)}</i>`).join('')}</em>`:'';
}

function fleetRecentChangesStrip() {
  const changed=fleetRecentChanges();
  if(!changed.length)return '';
  const preview=changed.slice(0,4).map(v=>{
    const fields=state.fleetChangedVins?.[v.vin]||v.changedFields||[];
    return `<span><b>${esc(v.name)}</b>${fleetChangeSourcePills(fields)}</span>`;
  }).join('');
  return `<div class="fleet-recent-changes"><div><strong>${changed.length} EV${changed.length===1?'':'s'} changed after upload</strong><p>Quick audit before dispatch uses the new FleetOS/Amazon data.</p></div><div class="fleet-change-list">${preview}</div><button class="btn small" data-action="fleet-filter-quick" data-filter="changed">Show changed only</button></div>`;
}

function fleetPortalMatchStats() {
  return fleetPortalMatchStatsForRows(state.fleetImport?.vehicles||[]);
}

function fleetPortalMatchStatsForRows(rows=[]) {
  const amazon=new Set(), fleetos=new Set();
  rows.forEach(v=>{
    const vin=cleanVin(v.vin), source=String(v.source||'').toLowerCase();
    if(!vin)return;
    if(source.includes('amazon fleet list'))amazon.add(vin);
    if(source.includes('fleetos tracker')||source.includes('rivian'))fleetos.add(vin);
  });
  const both=[...amazon].filter(vin=>fleetos.has(vin));
  const amazonOnly=[...amazon].filter(vin=>!fleetos.has(vin));
  const fleetosOnly=[...fleetos].filter(vin=>!amazon.has(vin));
  const uniqueVins=new Set([...amazon,...fleetos]);
  return {rows,amazon,fleetos,both,amazonOnly,fleetosOnly,uniqueVins};
}

function fleetSourceMapStrip() {
  const stats=fleetPortalMatchStats(), coverage=fleetCoverageStats();
  const amazonAge=fleetSourceAge('amazon'), fleetosAge=fleetSourceAge('fleetos');
  const target=fleetCoverageTarget(stats), expected=target.count, expectedShort=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const rows=[
    {key:'amazon',label:'Amazon names/status',ok:stats.amazon.size>0&&!amazonAge.stale,count:stats.amazon.size,detail:amazonAge.hasUpload?amazonAge.label:'Upload fleet list',action:stats.amazon.size?'fleet-filter-quick':'fleet-import',filter:'missing-amazon',button:'Fix names'},
    {key:'fleetos',label:'FleetOS battery/range',ok:stats.fleetos.size>0&&!fleetosAge.stale,count:stats.fleetos.size,detail:fleetosAge.hasUpload?fleetosAge.label:'Upload tracker',action:stats.fleetos.size?'fleet-filter-quick':'fleet-import',filter:'missing-fleetos',button:'Fix battery'},
    {key:'matched',label:'VINs matched',ok:stats.uniqueVins.size>0&&stats.both.length===stats.uniqueVins.size,count:stats.both.length,detail:stats.uniqueVins.size?`${stats.both.length}/${stats.uniqueVins.size} cards A✓ F✓`:'No portal rows yet',action:stats.uniqueVins.size?'fleet-filter-quick':'fleet-import',filter:'verified',button:'Show verified'},
    {key:'expected',label:'All EVs covered',ok:expected>0&&!expectedShort&&target.official,count:expected||stats.uniqueVins.size,detail:expected?`${Math.max(0,expected-expectedShort)}/${expected} ${target.label}`:'Set by Amazon/FleetOS upload',action:expected?'fleet-filter-quick':'fleet-import',filter:'needs-data',button:target.official?'Review gaps':'Need Amazon'}
  ];
  const ready=rows.every(r=>r.ok)&&coverage.verified===coverage.total&&coverage.total>0;
  const helper=ready?'Clean source map: each EV card has Amazon identity plus FleetOS battery.':'Use the yellow boxes as your to-do list before dispatch.';
  return `<div class="fleet-source-map ${ready?'ok':'warn'}"><div><strong>Simple EV source map</strong><span>${esc(helper)} Cards show <b>A✓</b> when Amazon named the van and <b>F✓</b> when FleetOS supplied battery/range.</span></div><div class="fleet-source-map-grid">${rows.map(r=>`<button class="${r.ok?'ok':'warn'}" data-action="${esc(r.ok?'fleet-filter-quick':r.action)}" ${r.action==='fleet-filter-quick'||r.ok?`data-filter="${esc(r.filter)}"`:''}><b>${esc(String(r.count))}</b><span>${esc(r.label)}</span><em>${esc(r.detail)}</em><small>${esc(r.ok?'Done':r.button)}</small></button>`).join('')}</div><button class="btn small ${ready?'lime':'primary'}" data-action="${ready?'refresh-fleet':'fleet-import'}">${ready?'Refresh all EVs':'Upload latest portals'}</button></div>`;
}

function fleetPortalMatchStrip() {
  const stats=fleetPortalMatchStats();
  if(!stats.rows.length)return `<div class="fleet-portal-match empty"><strong>Full EV portal check</strong><span>Upload the Amazon fleet list and FleetOS tracker export to list every EV, match names to VINs, and verify battery % before dispatch.</span><button class="btn small primary" data-action="fleet-import">Upload both lists</button></div>`;
  const status=stats.amazonOnly.length||stats.fleetosOnly.length?'warn':'ok';
  const expected=Number(state.fleetExpectedCount)||0;
  const short=Math.max(0,expected-stats.uniqueVins.size);
  const countClass=expected?(short?'warn':'ok'):'';
  const countCopy=expected?(short?`${short} short of expected ${expected}`:`complete vs expected ${expected}`):'set expected count above';
  const matchedPct=stats.uniqueVins.size?Math.round((stats.both.length/stats.uniqueVins.size)*100):0;
  const expectedPct=expected?Math.min(100,Math.round((stats.uniqueVins.size/expected)*100)):0;
  const missingAmazon=stats.fleetosOnly.slice(0,3).join(', ')||'None';
  const missingFleetos=stats.amazonOnly.slice(0,3).join(', ')||'None';
  const actionButtons=status==='ok'?'<button class="btn small" data-action="fleet-filter-quick" data-filter="verified">Show verified</button>':`<div class="portal-match-actions">${stats.amazonOnly.length?'<button class="btn small" data-action="fleet-filter-quick" data-filter="missing-fleetos">Review missing FleetOS</button><button class="btn small" data-action="copy-fleetos-missing">Copy FleetOS VINs</button>':''}${stats.fleetosOnly.length?'<button class="btn small" data-action="fleet-filter-quick" data-filter="missing-amazon">Review missing Amazon</button><button class="btn small" data-action="copy-amazon-missing">Copy Amazon VINs</button><button class="btn small primary" data-action="export-amazon-missing">Download missing Amazon CSV</button>':''}</div>`;
  return `<div class="fleet-portal-match ${status}"><div><strong>Full EV portal check</strong><span>${status==='ok'?'Every uploaded VIN matched between Amazon names and FleetOS battery rows.':'Some VINs only appeared in one upload — review the exact missing side below.'}</span><div class="portal-coverage-meter"><span><b>Portal match</b><i style="width:${matchedPct}%"></i></span><em>${matchedPct}% matched both uploads</em>${expected?`<em>${expectedPct}% of expected EV count loaded</em>`:''}</div></div><div class="portal-match-grid"><span class="${countClass}"><b>${stats.uniqueVins.size}</b>unique VINs accounted<em>${esc(countCopy)}</em></span><span><b>${stats.amazon.size}</b>Amazon named EVs</span><span><b>${stats.fleetos.size}</b>FleetOS battery EVs</span><span><b>${stats.both.length}</b>matched both</span><span class="${stats.amazonOnly.length?'warn':'ok'}"><b>${stats.amazonOnly.length}</b>missing FleetOS</span><span class="${stats.fleetosOnly.length?'warn':'ok'}"><b>${stats.fleetosOnly.length}</b>missing Amazon</span></div><small>Missing FleetOS: ${esc(missingFleetos)} · Missing Amazon: ${esc(missingAmazon)}</small>${actionButtons}</div>`;
}

function fleetRowCountCheckStrip() {
  const stats=fleetPortalMatchStats(), target=fleetCoverageTarget(stats), expected=target.count||0;
  const amazonUploadRows=state.fleetSourceUploads?.amazon?.vehicles?.length||0;
  const fleetosUploadRows=state.fleetSourceUploads?.fleetos?.vehicles?.length||0;
  const amazonRows=amazonUploadRows||stats.amazon.size;
  const fleetosRows=fleetosUploadRows||stats.fleetos.size;
  const hasAmazon=amazonRows>0, hasFleetos=fleetosRows>0;
  const diff=hasAmazon&&hasFleetos?Math.abs(amazonRows-fleetosRows):0;
  const expectedShort=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  let tone='warn', title='Upload both portal exports to compare row counts';
  let detail='This catches partial FleetOS or Amazon exports before a dispatcher trusts the battery board.';
  if(hasAmazon&&hasFleetos&&!diff&&!expectedShort){tone='ok';title='Row counts line up';detail='Amazon and FleetOS row counts look balanced. Still review VIN matches and statuses before launch.';}
  else if(hasAmazon&&hasFleetos&&diff){title=`Row counts differ by ${diff}`;detail='One portal may have been filtered or partially exported. Re-export All Vehicles before approving refresh.';}
  else if(expectedShort){title=`${expectedShort} EV${expectedShort===1?'':'s'} short of expected`;detail='The uploaded rows do not cover the full expected EV count from Amazon/manual setting.';}
  else if(hasAmazon&&!hasFleetos){title='FleetOS row count missing';detail='Amazon names/status are loaded. Upload FleetOS tracker rows so batteries can be verified.';}
  else if(hasFleetos&&!hasAmazon){title='Amazon row count missing';detail='FleetOS batteries are loaded. Upload Amazon fleet list rows so names, plates, and status are official.';}
  const matchedPct=stats.uniqueVins.size?Math.round((stats.both.length/stats.uniqueVins.size)*100):0;
  return `<div class="fleet-row-count-check ${tone}"><div><strong>Portal row-count check</strong><span>${esc(title)} — ${esc(detail)}</span><div class="portal-coverage-meter"><span><b>Matched VIN coverage</b><i style="width:${matchedPct}%"></i></span><em>${matchedPct}% matched by VIN</em></div></div><div class="fleet-row-count-grid"><span class="${hasAmazon?'ok':'warn'}"><b>${amazonRows||'Upload'}</b>Amazon rows<em>${esc(fleetSourceUploadLabel('amazon'))}</em></span><span class="${hasFleetos?'ok':'warn'}"><b>${fleetosRows||'Upload'}</b>FleetOS rows<em>${esc(fleetSourceUploadLabel('fleetos'))}</em></span><span class="${stats.both.length?'ok':'warn'}"><b>${stats.both.length}</b>matched rows<em>VINs found in both</em></span><span class="${expectedShort?'warn':expected?'ok':''}"><b>${expected||'Set'}</b>expected EVs<em>${expected?`${Math.max(0,expectedShort)} short`:'from Amazon export'}</em></span></div><button class="btn small ${tone==='ok'?'lime':'primary'}" data-action="${tone==='ok'?'refresh-fleet':'fleet-import'}">${tone==='ok'?'Review refresh':'Upload full lists'}</button></div>`;
}

function fleetNameLockStrip() {
  const stats=fleetPortalMatchStats();
  if(!stats.fleetosOnly.length)return '';
  const preview=stats.fleetosOnly.slice(0,4).map(vin=>`<span><b>${esc(vin)}</b><em>temporary VIN name</em></span>`).join('');
  const more=Math.max(0,stats.fleetosOnly.length-4);
  return `<div class="fleet-name-lock-strip"><div><strong>Amazon name lock</strong><span>${stats.fleetosOnly.length} FleetOS VIN${stats.fleetosOnly.length===1?' is':'s are'} using VIN-only names until the Amazon fleet list names them. Do not rename them manually.</span></div><div class="fleet-name-lock-preview">${preview}${more?`<span class="more"><b>+${more}</b><em>more need Amazon names</em></span>`:''}</div><div class="portal-match-actions"><button class="btn small" data-action="fleet-filter-quick" data-filter="missing-amazon">Review missing Amazon</button><button class="btn small" data-action="copy-amazon-missing">Copy Amazon VINs</button><button class="btn small primary" data-action="export-amazon-missing">Download missing Amazon CSV</button></div></div>`;
}

function fleetosRosterCoverageStrip() {
  const stats=fleetPortalMatchStats(), target=fleetCoverageTarget(stats), expected=target.count;
  if(!expected&&!stats.fleetos.size)return '';
  const covered=stats.fleetos.size, short=expected?Math.max(0,expected-covered):0, pct=expected?Math.min(100,Math.round((covered/expected)*100)):(covered?100:0);
  const tone=expected&&!short&&stats.fleetos.size?'ok':'warn';
  const missing=[...stats.amazon].filter(vin=>!stats.fleetos.has(vin)).slice(0,4);
  const copy=tone==='ok'?'FleetOS battery rows cover the full expected EV roster.':'FleetOS export may be partial — upload the full tracker list or review missing battery VINs.';
  const action=tone==='ok'?'<button class="btn small lime" data-action="refresh-fleet">Review refresh</button>':'<div class="portal-match-actions"><button class="btn small" data-action="fleet-filter-quick" data-filter="missing-fleetos">Show missing battery</button><button class="btn small" data-action="copy-fleetos-missing">Copy missing VINs</button><button class="btn small primary" data-action="export-fleetos-missing">Download missing battery CSV</button></div>';
  return `<div class="fleetos-roster-coverage ${tone}"><div><strong>FleetOS battery roster coverage</strong><span>${esc(copy)}</span><div class="portal-coverage-meter"><span><b>FleetOS coverage</b><i style="width:${pct}%"></i></span><em>${covered}/${expected||covered} EVs have battery/range rows${target.source!=='none'?` · target from ${esc(target.source)}`:''}</em></div></div><div class="fleetos-roster-stats"><span class="${short?'warn':'ok'}"><b>${short}</b>missing battery rows</span><span><b>${covered}</b>FleetOS battery EVs</span><span><b>${expected||'Set'}</b>${esc(target.shortLabel)}</span></div><small>Missing battery VINs: ${esc(missing.join(', ')||'None')}</small>${action}</div>`;
}

function fleetGapAuditStrip() {
  const rows=fleetGapRows();
  if(!rows.length)return '';
  const preview=rows.slice(0,5).map(row=>{
    const [priority,issue,vin,name,,,,,,,,,,fix]=row;
    const tone=String(priority||'').toLowerCase();
    return `<span><i class="gap-priority ${esc(tone)}">${esc(priority)}</i><b>${esc(issue)}</b>${esc(vin||name||'Expected count issue')}<em>${esc(fix)}</em></span>`;
  }).join('');
  const more=Math.max(0,rows.length-5);
  const stats=fleetPortalMatchStats();
  const fixTips=[
    stats.amazonOnly.length?`Amazon-only VINs need FleetOS tracker battery/range rows (${stats.amazonOnly.length})`:'',
    stats.fleetosOnly.length?`FleetOS-only VINs need Amazon fleet-list name/status rows (${stats.fleetosOnly.length})`:'',
    state.fleetUpdateSummary?.duplicates?`Duplicate VINs need one clean row per source (${state.fleetUpdateSummary.duplicates})`:''
  ].filter(Boolean);
  const actions=`${stats.amazonOnly.length?'<button class="btn small" data-action="fleet-filter-quick" data-filter="missing-fleetos">Missing FleetOS</button>':''}${stats.fleetosOnly.length?'<button class="btn small" data-action="fleet-filter-quick" data-filter="missing-amazon">Missing Amazon</button>':''}<button class="btn small primary" data-action="export-fleet-gaps">Download gap CSV</button>`;
  return `<div class="fleet-gap-audit"><div><strong>Missing VIN audit</strong><span>${rows.length} item${rows.length===1?'':'s'} to fix before the board can be treated as 100% accurate.${more?` Showing first 5 · ${more} more in CSV.`:''}</span>${fixTips.length?`<div class="fleet-gap-fix-tips">${fixTips.map(t=>`<em>${esc(t)}</em>`).join('')}</div>`:''}</div><div class="fleet-gap-preview">${preview}</div><div class="portal-match-actions">${actions}</div></div>`;
}

function fleetFullListStrip() {
  const stats=fleetPortalMatchStats(), target=fleetCoverageTarget(stats), expected=target.count;
  const short=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const complete=Boolean(target.official&&stats.amazon.size&&stats.fleetos.size&&!stats.amazonOnly.length&&!stats.fleetosOnly.length&&(!expected||!short));
  const partial=coverageLabelForFleet(stats,expected,target);
  return `<div class="fleet-full-list ${complete?'ok':partial.className}"><div><strong>Full fleet view</strong><span>${esc(partial.message)}</span></div><div class="fleet-full-list-steps"><span><b>${rivianFleet.length}</b>cards showing</span><span><b>${expected||'Set'}</b>${esc(target.shortLabel)}</span><span><b>${short}</b>still missing</span></div><button class="btn small ${complete?'lime':'primary'}" data-action="${complete?'refresh-fleet':'fleet-import'}">${complete?'Refresh full list':'Upload latest lists'}</button></div>`;
}

function fleetCoverageTarget(stats=fleetPortalMatchStats()) {
  const manual=Number(state.fleetExpectedCount)||0;
  if(manual)return {count:manual,label:'expected',shortLabel:'expected EVs from Amazon',official:true,source:'Amazon'};
  if(stats.amazon.size)return {count:stats.amazon.size,label:'Amazon EVs',shortLabel:'Amazon EV count',official:true,source:'Amazon'};
  if(stats.fleetos.size)return {count:stats.fleetos.size,label:'FleetOS EVs',shortLabel:'FleetOS EV count',official:false,source:'FleetOS'};
  return {count:0,label:'expected',shortLabel:'expected count',official:false,source:'none'};
}

function coverageLabelForFleet(stats,expected=0,target=fleetCoverageTarget(stats)) {
  if(!stats.rows.length)return {className:'warn',message:'Demo/sample view. Upload FleetOS and Amazon exports to replace it with every portal EV.'};
  if(stats.fleetos.size&&!stats.amazon.size)return {className:'warn',message:`FleetOS roster view is showing ${stats.fleetos.size} EV VIN${stats.fleetos.size===1?'':'s'} with battery data. Upload Amazon fleet list next for official van names, plates, and status.`};
  if(!stats.amazon.size||!stats.fleetos.size)return {className:'warn',message:`Partial source view. Upload the ${stats.amazon.size?'FleetOS tracker':'Amazon fleet list'} so every VIN has both name/status and battery data.`};
  if(expected&&target.official&&stats.uniqueVins.size<expected)return {className:'warn',message:`Portal lists loaded, but the board is ${expected-stats.uniqueVins.size} EV${expected-stats.uniqueVins.size===1?'':'s'} short of your expected count.`};
  if(stats.amazonOnly.length||stats.fleetosOnly.length)return {className:'warn',message:'Portal lists loaded, but some VINs only exist on one side. Use the Missing FleetOS/Amazon filters.'};
  return {className:'ok',message:'Full source view is ready: Amazon names/status and FleetOS battery rows match by VIN.'};
}

function fleetSourceKey(source='') {
  const value=String(source||'').toLowerCase();
  if(value.includes('amazon fleet list'))return 'amazon';
  if(value.includes('fleetos tracker')||value.includes('rivian'))return 'fleetos';
  return 'other';
}
function fleetSourceKeys(source='') {
  const value=String(source||'').toLowerCase(), keys=[];
  if(value.includes('amazon fleet list'))keys.push('amazon');
  if(value.includes('fleetos tracker')||value.includes('rivian'))keys.push('fleetos');
  return keys.length?keys:['other'];
}
function hasAmazonFleetSource(source='') { return String(source||'').toLowerCase().includes('amazon fleet list'); }
function uniqueFleetVinCount(rows=[]) {
  return new Set(rows.map(v=>cleanVin(v.vin)).filter(Boolean)).size;
}

function fleetImportFromSourceUploads() {
  const uploads=Object.values(state.fleetSourceUploads||{}).filter(u=>u?.vehicles?.length);
  const seen=new Set(), vehicles=[];
  uploads.flatMap(u=>u.vehicles||[]).forEach(vehicle=>{
    const key=`${cleanVin(vehicle.vin)||vehicle.vin}|${vehicle.source||''}`;
    if(seen.has(key))return;
    seen.add(key); vehicles.push(vehicle);
  });
  const uploadDates=uploads.map(u=>u.uploadedAt).filter(Boolean).sort();
  const uploadedAt=uploadDates[uploadDates.length-1]||new Date().toISOString();
  const names=[...new Set(uploads.map(u=>u.name).filter(Boolean))];
  return {name:names.join(' + ')||'Latest fleet source uploads',vehicles,uploadedAt};
}

function rememberFleetSourceUpload(vehicles=[],name='Fleet upload',uploadedAt=new Date().toISOString()) {
  const grouped={};
  vehicles.forEach(vehicle=>{
    fleetSourceKeys(vehicle.source).forEach(key=>{
      if(!grouped[key])grouped[key]=[];
      grouped[key].push(vehicle);
    });
  });
  state.fleetSourceUploads=state.fleetSourceUploads||{};
  Object.entries(grouped).forEach(([key,rows])=>{
    state.fleetSourceUploads[key]={name,vehicles:rows,uploadedAt};
  });
  if(grouped.amazon?.length) state.fleetExpectedCount=uniqueFleetVinCount(grouped.amazon);
  state.fleetImport=fleetImportFromSourceUploads();
  return state.fleetImport.vehicles;
}

function fleetSourceUploadLabel(key='') {
  const upload=state.fleetSourceUploads?.[key];
  if(!upload?.vehicles?.length)return 'Not uploaded yet';
  const when=upload.uploadedAt?new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(upload.uploadedAt)):'saved';
  return `${upload.vehicles.length} rows · ${when}`;
}

function fleetUploadPrepChecklist() {
  return `<div class="fleet-upload-prep"><div><strong>Before you press refresh</strong><span>Use fresh files from both portals so the EV board can be trusted for dispatch.</span></div><ol><li><b>1</b><span>Amazon fleet list file</span><small>From logistics.amazon.com/fleet-management/#vehicles — needs Vehicle Name, VIN, Plate, Active/Inactive, Operational/Grounded.</small><a href="https://logistics.amazon.com/fleet-management/#vehicles" target="_blank" rel="noopener">Open Amazon fleet</a></li><li><b>2</b><span>FleetOS tracker file</span><small>From business.rivian.com/vehicles/tracker — needs VIN, battery %, and range miles.</small><a href="https://business.rivian.com/vehicles/tracker" target="_blank" rel="noopener">Open FleetOS tracker</a></li><li><b>3</b><span>Upload both together</span><small>RelayOps matches the VIN, keeps Amazon’s exact van name, then updates FleetOS battery/range.</small><button class="btn small primary" data-action="choose-file">Choose both files</button></li></ol></div>`;
}

function fleetFullExportSanityCheck() {
  return `<div class="fleet-full-export-check"><strong>Full export sanity check</strong><span><b>All vehicles</b>Do not export from a filtered/search view.</span><span><b>Same day</b>Amazon and FleetOS files should be fresh together.</span><span><b>Both portals</b>Amazon names the van; FleetOS updates battery.</span><span><b>Row count</b>If count looks short, stop and re-export.</span></div>`;
}

function fleetImportChecklist() {
  const sourceCheck=(key,label,fields)=>{
    const rows=state.fleetSourceUploads?.[key]?.vehicles||[];
    const rowCount=rows.length;
    const checks=fields.map(([prop,name])=>{
      const count=rows.filter(v=>v[prop]).length, ok=rowCount>0&&count>0;
      return `<span class="${ok?'ok':'warn'}"><b>${ok?'✓':'!'}</b>${esc(name)}${rowCount?` · ${count}/${rowCount}`:' · missing'}</span>`;
    }).join('');
    const ready=rowCount>0&&fields.every(([prop])=>rows.some(v=>v[prop]));
    return `<div class="${ready?'ok':'warn'}"><strong>${esc(label)}</strong><small>${rowCount?`${rowCount} VIN row${rowCount===1?'':'s'} read`:'No rows uploaded yet'}</small><div>${checks}</div></div>`;
  };
  return `<div class="fleet-import-checklist"><strong>Source checklist after upload</strong>${sourceCheck('amazon','Amazon required fields',[['hasName','Vehicle Name'],['hasPlate','License Plate'],['hasActive','Active / Inactive'],['hasOperational','Operational / Grounded']])}${sourceCheck('fleetos','FleetOS required fields',[['hasBattery','Battery %'],['hasMiles','Range Miles']])}<p>Green means RelayOps detected the field in at least one row. Yellow means that portal or column still needs a cleaner export.</p></div>`;
}

function fleetFullRosterReadinessStrip() {
  const stats=fleetPortalMatchStats(), target=fleetCoverageTarget(stats), expected=target.count||0;
  const amazonRows=state.fleetSourceUploads?.amazon?.vehicles||[];
  const fleetosRows=state.fleetSourceUploads?.fleetos?.vehicles||[];
  const amazonCount=uniqueFleetVinCount(amazonRows), fleetosCount=uniqueFleetVinCount(fleetosRows);
  const short=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const fleetosShort=expected?Math.max(0,expected-fleetosCount):0;
  const bothLoaded=amazonCount>0&&fleetosCount>0;
  const ready=bothLoaded&&expected>0&&!short&&!fleetosShort&&!stats.amazonOnly.length&&!stats.fleetosOnly.length;
  const tone=ready?'ok':'warn';
  const title=ready?'Full roster ready to review':'Full roster not proven yet';
  const detail=ready?'Amazon and FleetOS appear to cover the full expected EV roster. Press Refresh to review final changes.':'If FleetOS row count is short, re-export All Vehicles from FleetOS before trusting battery %.';
  return `<div class="fleet-full-roster-readiness ${tone}"><div><strong>${esc(title)}</strong><span>${esc(detail)}</span></div><div class="fleet-full-roster-grid"><span class="${amazonCount?'ok':'warn'}"><b>${amazonCount||'Upload'}</b>Amazon VINs<em>official expected list</em></span><span class="${fleetosCount?'ok':'warn'}"><b>${fleetosCount||'Upload'}</b>FleetOS VINs<em>battery tracker list</em></span><span class="${fleetosShort?'warn':expected?'ok':'warn'}"><b>${expected?`${Math.max(0,expected-fleetosShort)}/${expected}`:'Set'}</b>FleetOS coverage<em>${fleetosShort?`${fleetosShort} missing battery rows`:'battery rows covered'}</em></span><span class="${stats.amazonOnly.length||stats.fleetosOnly.length||short?'warn':'ok'}"><b>${stats.both.length}</b>matched both<em>${stats.amazonOnly.length+stats.fleetosOnly.length+short?`${stats.amazonOnly.length+stats.fleetosOnly.length+short} source gap${stats.amazonOnly.length+stats.fleetosOnly.length+short===1?'':'s'}`:'VINs line up'}</em></span></div><button class="btn small ${ready?'lime':'primary'}" data-action="${ready?'refresh-fleet':'fleet-import'}">${ready?'Review refresh':'Upload full exports'}</button></div>`;
}

function fleetDispatcherProofStrip() {
  const stats=fleetPortalMatchStats(), target=fleetCoverageTarget(stats), expected=target.count||0;
  const amazonRows=state.fleetSourceUploads?.amazon?.vehicles||[];
  const fleetosRows=state.fleetSourceUploads?.fleetos?.vehicles||[];
  const amazonCount=uniqueFleetVinCount(amazonRows)||stats.amazon.size;
  const fleetosCount=uniqueFleetVinCount(fleetosRows)||stats.fleetos.size;
  const uniqueCount=stats.uniqueVins.size;
  const expectedShort=expected?Math.max(0,expected-uniqueCount):0;
  const fleetosShort=expected?Math.max(0,expected-fleetosCount):0;
  const sourceGaps=stats.amazonOnly.length+stats.fleetosOnly.length;
  const imports=state.fleetImport?.vehicles||[];
  const conflicts=fleetImportConflicts(imports).length;
  const seenRows=new Set(), duplicateSet=new Set();
  imports.forEach(item=>{const vin=cleanVin(item.vin);if(!vin)return;const key=`${vin}|${item.source||'unknown'}`;if(seenRows.has(key))duplicateSet.add(vin);seenRows.add(key);});
  const duplicateVins=duplicateSet.size;
  const safe=amazonCount>0&&fleetosCount>0&&uniqueCount>0&&!expectedShort&&!fleetosShort&&!sourceGaps&&!conflicts&&!duplicateVins;
  const rows=[
    {label:'Amazon official names',value:amazonCount||'Upload',detail:amazonCount?'name / plate / active / grounded rows loaded':'upload Amazon fleet list',ok:amazonCount>0&&!stats.fleetosOnly.length},
    {label:'FleetOS battery rows',value:fleetosCount||'Upload',detail:fleetosShort?`${fleetosShort} battery row${fleetosShort===1?'':'s'} missing`:'battery % / range rows loaded',ok:fleetosCount>0&&!stats.amazonOnly.length&&!fleetosShort},
    {label:'VIN match proof',value:stats.both.length,detail:sourceGaps?`${sourceGaps} VIN source gap${sourceGaps===1?'':'s'}`:'same VIN found in both portals',ok:uniqueCount>0&&!sourceGaps},
    {label:'Full roster count',value:expected?`${Math.max(0,expected-expectedShort)}/${expected}`:'Set expected',detail:expected?`${target.shortLabel} target`:'upload Amazon full fleet list or enter expected EVs',ok:expected>0&&!expectedShort},
    {label:'Clean data check',value:conflicts+duplicateVins,detail:conflicts||duplicateVins?`${conflicts} conflict${conflicts===1?'':'s'} · ${duplicateVins} duplicate VIN${duplicateVins===1?'':'s'}`:'no duplicate/conflicting VIN rows',ok:!conflicts&&!duplicateVins}
  ];
  return `<div class="fleet-dispatcher-proof ${safe?'ok':'warn'}"><div><strong>Dispatcher proof: ${safe?'SAFE to review refresh':'WAIT before trusting board'}</strong><span>${safe?'Every EV appears named by Amazon, battery-checked by FleetOS, and matched by VIN.':'Use this as the 10-second checklist before using Fleet for launch decisions.'}</span></div><div class="fleet-dispatcher-proof-grid">${rows.map(r=>`<span class="${r.ok?'ok':'warn'}"><b>${esc(String(r.value))}</b>${esc(r.label)}<em>${esc(r.detail)}</em></span>`).join('')}</div><button class="btn small ${safe?'lime':'primary'}" data-action="${safe?'refresh-fleet':'fleet-import'}">${safe?'Review refresh':'Fix upload'}</button></div>`;
}

function fleetRefreshProofStrip(p={}) {
  const blockers=p.blockers||[], missing=p.missingSources||[];
  const amazonReady=!missing.includes('Amazon fleet list') && (p.expected||p.total||0)>0;
  const fleetosReady=!missing.includes('FleetOS tracker') && (p.fleetosCount||0)>0 && !(p.fleetosShort||0);
  const rosterReady=Boolean(p.expected?!(p.expectedShort||0):!missing.length);
  const vinReady=!missing.length && !(p.missingVinCount||0) && !(p.unknownExpectedShort||0);
  const cleanReady=!(p.duplicates||0) && !(p.conflicts||0) && !blockers.length;
  const sourceFresh=!blockers.some(x=>String(x).toLowerCase().includes('fresh amazon/fleetos exports')||String(x).toLowerCase().includes('saved fleet upload'));
  const safe=amazonReady&&fleetosReady&&rosterReady&&vinReady&&cleanReady&&sourceFresh;
  const rows=[
    {label:'File freshness',value:sourceFresh?'Fresh':'Stale',detail:sourceFresh?'saved files are okay to review':'upload fresh portal exports',ok:sourceFresh},
    {label:'Amazon status',value:amazonReady?'Loaded':'Missing',detail:amazonReady?'names / plates / active / grounded':'needs Amazon fleet list',ok:amazonReady},
    {label:'FleetOS battery',value:fleetosReady?'Covered':(p.fleetosCount?`${p.fleetosCount}/${p.expected||'?'}`:'Missing'),detail:fleetosReady?'battery % and range ready':'needs full FleetOS tracker',ok:fleetosReady},
    {label:'Full roster',value:p.expected?`${Math.max(0,p.expected-(p.expectedShort||0))}/${p.expected}`:'Check',detail:rosterReady?'expected count covered':'short of expected EV count',ok:rosterReady},
    {label:'VIN match',value:vinReady?'Clean':(p.missingVinCount||p.unknownExpectedShort||'Review'),detail:vinReady?'same EVs across sources':'missing source VINs',ok:vinReady},
    {label:'Approve risk',value:cleanReady?'0':blockers.length,detail:cleanReady?'no blockers':'fix blockers first',ok:cleanReady}
  ];
  return `<div class="fleet-refresh-proof ${safe?'ok':'warn'}"><div><strong>Refresh proof: ${safe?'SAFE after review':'WAIT — prove the roster first'}</strong><span>${safe?'Counts and sources line up. Review changed fields, then approve.':'This catches stale files, partial exports, and source mismatches before EV cards update.'}</span></div><div class="fleet-refresh-proof-grid">${rows.map(r=>`<span class="${r.ok?'ok':'warn'}"><b>${esc(String(r.value))}</b>${esc(r.label)}<em>${esc(r.detail)}</em></span>`).join('')}</div></div>`;
}

function fleetSourceHealthRows() {
  const fallbackRowsFor=key=>(state.fleetImport?.vehicles||[]).filter(v=>fleetSourceKeys(v.source).includes(key));
  const sourceRows=(key,fields)=> {
    const rows=state.fleetSourceUploads?.[key]?.vehicles?.length?state.fleetSourceUploads[key].vehicles:fallbackRowsFor(key);
    return fields.map(([prop,label,source])=>{
      const count=rows.filter(v=>v[prop]).length;
      return {source,label,count,total:rows.length,ok:rows.length>0&&count===rows.length,partial:rows.length>0&&count>0};
    });
  };
  return [
    ...sourceRows('amazon',[
      ['hasName','Vehicle Name','Amazon'],
      ['hasPlate','License Plate','Amazon'],
      ['hasActive','Active / Inactive','Amazon'],
      ['hasOperational','Operational / Grounded','Amazon']
    ]),
    ...sourceRows('fleetos',[
      ['hasBattery','Battery %','FleetOS'],
      ['hasMiles','Range Miles','FleetOS']
    ])
  ];
}

function fleetSourceHealthStrip() {
  const rows=fleetSourceHealthRows(), hasUploads=rows.some(r=>r.total);
  if(!hasUploads)return `<div class="fleet-source-health warn"><div><strong>Source field health</strong><span>Upload Amazon + FleetOS exports to check whether every required column was included.</span></div><button class="btn small primary" data-action="fleet-import">Upload source files</button></div>`;
  const perfect=rows.every(r=>r.ok);
  return `<div class="fleet-source-health ${perfect?'ok':'warn'}"><div><strong>Source field health</strong><span>${perfect?'Every uploaded EV row has the required Amazon/FleetOS fields.':'Yellow fields mean the export is missing data for at least one EV row.'}</span></div><div class="fleet-source-health-grid">${rows.map(r=>`<span class="${r.ok?'ok':r.partial?'partial':'warn'}"><b>${esc(r.count)}/${esc(r.total||0)}</b>${esc(r.label)}<em>${esc(r.source)}</em></span>`).join('')}</div><button class="btn small ${perfect?'lime':'primary'}" data-action="${perfect?'refresh-fleet':'fleet-import'}">${perfect?'Review refresh':'Upload cleaner export'}</button></div>`;
}

function fleetSourceUploadedAt(key='',format='time') {
  const uploadedAt=state.fleetSourceUploads?.[key]?.uploadedAt;
  if(!uploadedAt)return '—';
  const date=new Date(uploadedAt);
  if(!Number.isFinite(date.getTime()))return '—';
  return format==='iso'?date.toISOString():new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(date);
}
function fleetSourceAge(key='',now=new Date()) {
  const uploadedAt=state.fleetSourceUploads?.[key]?.uploadedAt;
  if(!uploadedAt)return {label:'Not uploaded',minutes:null,stale:true,hasUpload:false};
  const date=new Date(uploadedAt), minutes=Math.max(0,Math.round((now-date)/60000));
  if(!Number.isFinite(minutes))return {label:'Unknown age',minutes:null,stale:true,hasUpload:true};
  const label=minutes<60?`${minutes} min old`:`${Math.floor(minutes/60)}h ${minutes%60}m old`;
  return {label,minutes,stale:minutes>=120,hasUpload:true};
}
function fleetSourcePill(key='',label='') {
  const age=fleetSourceAge(key), has=age.hasUpload;
  const tone=!has||age.stale?'warn':'ok';
  const status=!has?'Missing':age.stale?'Stale':'Fresh';
  return `<span class="${tone}"><b>${esc(label)}</b>${esc(fleetSourceUploadLabel(key))}<em>${esc(status)} · ${esc(age.label)}</em></span>`;
}
function fleetSourceFreshnessSummary() {
  const amazon=fleetSourceAge('amazon'), fleetos=fleetSourceAge('fleetos');
  const amazonWhen=fleetSourceUploadedAt('amazon');
  const fleetosWhen=fleetSourceUploadedAt('fleetos');
  const problems=[
    !amazon.hasUpload?'Amazon missing':amazon.stale?'Amazon stale':'',
    !fleetos.hasUpload?'FleetOS missing':fleetos.stale?'FleetOS stale':''
  ].filter(Boolean);
  const status=problems.length?`Check: ${problems.join(' · ')}`:'Both sources fresh enough for review';
  return `<div class="refresh-freshness-summary ${problems.length?'warn':'ok'}"><strong>Saved upload freshness</strong><span>Amazon ${esc(amazonWhen)} · ${esc(amazon.label)} | FleetOS ${esc(fleetosWhen)} · ${esc(fleetos.label)}</span><em>${esc(status)}</em></div>`;
}

function fleetLegend() {
  return `<div class="fleet-legend" aria-label="Fleet card legend"><span class="verified"><b>Green</b> VIN matched both portals</span><span class="partial"><b>Yellow</b> upload missing Amazon or FleetOS</span><span class="demo"><b>Gray</b> demo until real upload</span><span class="charge"><b>Battery colors</b> red/orange need charge first</span></div>`;
}

function fleetAccuracyGate() {
  const stats=fleetPortalMatchStats(), coverage=fleetCoverageStats(), expected=Number(state.fleetExpectedCount)||0;
  const short=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const fleetosAge=fleetSourceAge('fleetos'), amazonAge=fleetSourceAge('amazon');
  const duplicateCount=state.fleetUpdateSummary?.duplicates||0;
  const conflictCount=state.fleetUpdateSummary?.conflicts||0;
  const issues=[];
  if(!stats.rows.length)issues.push('upload Amazon + FleetOS');
  if(duplicateCount)issues.push(`${duplicateCount} duplicate VIN${duplicateCount===1?'':'s'}`);
  if(conflictCount)issues.push(`${conflictCount} field conflict${conflictCount===1?'':'s'}`);
  if(coverage.demo)issues.push('replace demo cards');
  if(coverage.amazonOnly)issues.push(`${coverage.amazonOnly} need FleetOS battery`);
  if(coverage.fleetosOnly)issues.push(`${coverage.fleetosOnly} need Amazon names/status`);
  if(coverage.needsData)issues.push(`${coverage.needsData} missing details`);
  if(short)issues.push(`${short} short of expected count`);
  if(fleetosAge.hasUpload&&fleetosAge.stale)issues.push('FleetOS battery is stale');
  if(amazonAge.hasUpload&&amazonAge.stale)issues.push('Amazon fleet list is stale');
  const ready=!issues.length&&coverage.total>0&&coverage.verified===coverage.total;
  const copy=ready?'Dispatch-ready: every EV card is matched by VIN with Amazon names/status and FleetOS battery data.':`Not 100% yet: ${issues.slice(0,3).join(' · ')}${issues.length>3?' · more':''}`;
  const actions=ready?`<button class="btn small lime" data-action="refresh-fleet">Refresh verified board</button>`:`<button class="btn small primary" data-action="fleet-import">Upload latest lists</button><button class="btn small" data-action="export-fleet-gaps">Download gap list</button><button class="btn small" data-action="fleet-filter-quick" data-filter="needs-data">Review missing data</button>`;
  return `<div class="fleet-accuracy-gate ${ready?'ok':'warn'}"><div><strong>${ready?'Accuracy check passed':'Accuracy check'}</strong><span>${esc(copy)}</span></div><div class="accuracy-source-mini"><span class="${amazonAge.hasUpload&&!amazonAge.stale?'ok':'warn'}"><b>Amazon</b>${esc(amazonAge.label)}</span><span class="${fleetosAge.hasUpload&&!fleetosAge.stale?'ok':'warn'}"><b>FleetOS</b>${esc(fleetosAge.label)}</span><span class="${ready?'ok':'warn'}"><b>${coverage.verified}/${coverage.total}</b>verified</span></div><div class="portal-match-actions">${actions}</div></div>`;
}

function fleetRefreshReadinessStrip() {
  if(!state.fleetImport?.vehicles?.length)return '';
  const stats=fleetPortalMatchStats();
  const hasAmazon=stats.amazon.size>0, hasFleetos=stats.fleetos.size>0;
  const tone=hasAmazon&&hasFleetos?'ok':'warn';
  const message=hasAmazon&&hasFleetos?'Refresh will rebuild the board from the latest saved Amazon names and FleetOS battery data.':`Refresh can run, but upload the ${hasAmazon?'FleetOS tracker':'Amazon fleet list'} next for full accuracy.`;
  return `<div class="fleet-refresh-readiness ${tone}"><div><strong>Refresh readiness</strong><span>${esc(message)}</span>${fleetSourceFreshnessSummary()}</div><div><div class="refresh-source-pills">${fleetSourcePill('amazon','Amazon')}${fleetSourcePill('fleetos','FleetOS')}</div><div class="refresh-update-map"><span><b>Amazon</b>name + plate + active/grounded</span><span><b>FleetOS</b>battery % + range</span><span><b>VIN</b>match key</span></div></div><button class="btn small ${hasAmazon&&hasFleetos?'lime':'primary'}" data-action="${hasAmazon&&hasFleetos?'refresh-fleet':'fleet-import'}">${hasAmazon&&hasFleetos?'Review refresh':'Upload missing source'}</button></div>`;
}

function fleetCoverageStats() {
  const counts={total:rivianFleet.length,verified:0,amazonOnly:0,fleetosOnly:0,demo:0,needsData:0};
  rivianFleet.forEach(v=>{
    const label=fleetConfidence(v).label;
    if(label==='Verified')counts.verified++;
    else if(label==='Amazon only')counts.amazonOnly++;
    else if(label==='FleetOS only')counts.fleetosOnly++;
    else counts.demo++;
    if(fleetMissingFields(v).length)counts.needsData++;
  });
  return counts;
}

function fleetSourceStatus() {
  const rows=state.fleetImport?.vehicles?.length?state.fleetImport.vehicles:rivianFleet;
  const sources=rows.map(v=>String(v.source||'').toLowerCase()).join(' + ');
  return {
    hasAmazon:sources.includes('amazon fleet list'),
    hasFleetos:sources.includes('fleetos tracker')||sources.includes('rivian')
  };
}

function fleetUploadAge(now=new Date()) {
  if(!state.fleetImport?.uploadedAt)return {label:'',minutes:null,stale:false};
  const then=new Date(state.fleetImport.uploadedAt);
  const minutes=Math.max(0,Math.round((now-then)/60000));
  if(!Number.isFinite(minutes))return {label:'',minutes:null,stale:false};
  const label=minutes<60?`${minutes} min old`:`${Math.floor(minutes/60)}h ${minutes%60}m old`;
  return {label,minutes,stale:minutes>=120};
}

function knownBatteryPercent(value) {
  const raw=String(value??'').trim();
  if(!raw)return null;
  const percent=typeof value==='number'?value:Number(raw);
  return Number.isFinite(percent)?percent:null;
}
function batteryTone(percent=null) {
  percent=knownBatteryPercent(percent);
  if(percent===null)return 'unknown';
  if(percent>=75)return 'high';
  if(percent>=50)return 'medium';
  if(percent>=30)return 'low';
  return 'critical';
}
function batteryLabel(percent=null) {
  percent=knownBatteryPercent(percent);
  if(percent===null)return 'Battery unknown';
  if(percent>=75)return 'Route ready';
  if(percent>=50)return 'Good';
  if(percent>=30)return 'Charge soon';
  return 'Charge now';
}
function isGasFleetVehicle(vehicle={}) {
  const vin=String(vehicle.vin||'').toUpperCase();
  return /\b(?:FORD|RAM|RENTAL)\b/i.test(String(vehicle.name||''))||vin.startsWith('1FTYR3')||vin.startsWith('3C6LRV');
}
function isElectricFleetVehicle(vehicle={}) {
  return !isGasFleetVehicle(vehicle)&&(/\b(?:EV\s*\d+|EDV|RIVIAN)\b/i.test(String(vehicle.name||''))||/fleetos|rivian/i.test(String(vehicle.source||''))||Boolean(vehicle.hasBattery));
}
function isFleetLowBattery(vehicle={}) {
  const battery=knownBatteryPercent(vehicle?.battery);
  return isElectricFleetVehicle(vehicle)&&battery!==null&&battery<=LOW_BATTERY_SECTION_THRESHOLD;
}
function isDispatchBatteryBlocked(vehicle={}) {
  const battery=knownBatteryPercent(vehicle?.battery);
  return isElectricFleetVehicle(vehicle)&&battery!==null&&battery<DISPATCH_BATTERY_BLOCK_THRESHOLD;
}
function fleetVehicleAssignmentEligibility(vehicleOrId='') {
  const vehicle=typeof vehicleOrId==='object'&&vehicleOrId?vehicleOrId:fleetVehicleForEquipmentId(vehicleOrId);
  if(!vehicle)return {eligible:false,primary:false,reason:'vehicle missing from Fleet Health',vehicle:null};
  const active=normalizeActive(vehicle.active||vehicle.status,'Unknown');
  const operational=normalizeOperational(vehicle.operational||vehicle.status,'Unknown');
  if(active!=='Active')return {eligible:false,primary:false,reason:active==='Inactive'?'inactive':'active status unverified',vehicle};
  if(operational!=='Operational')return {eligible:false,primary:false,reason:operational==='Grounded'?'grounded':'operational status unverified',vehicle};
  const issue=fleetIssueForVehicle(vehicle);
  const blockingIssue=issue?.active?.find(record=>['critical','high'].includes(String(record.severity||'').toLowerCase()));
  if(blockingIssue)return {eligible:false,primary:false,reason:`${blockingIssue.severity} fleet issue`,vehicle,issue:blockingIssue};
  if(isElectricFleetVehicle(vehicle)){
    const source=String(vehicle.source||'').toLowerCase(),battery=knownBatteryPercent(vehicle.battery);
    const fleetosVerified=Boolean(vehicle.hasBattery&&battery!==null&&(source.includes('fleetos tracker')||source.includes('rivian')));
    if(!fleetosVerified)return {eligible:false,primary:false,reason:'FleetOS battery unverified',vehicle};
    if(battery<DISPATCH_BATTERY_BLOCK_THRESHOLD)return {eligible:false,primary:false,reason:`low battery ${battery}%`,vehicle,lowBattery:true};
  }
  return {eligible:true,primary:true,reason:'dispatch safe',vehicle};
}
function electricFleetVehicles() {
  return rivianFleet.filter(isElectricFleetVehicle);
}
function sortedRivianFleet() {
  const rows=[...rivianFleet];
  const q=String(state.fleetSearch||'').trim().toLowerCase();
  const filtered=rows.filter(v=>{
    if(state.fleetFilter==='gas')return isGasFleetVehicle(v);
    if(state.fleetFilter==='low')return isFleetLowBattery(v);
    if(state.fleetFilter==='grounded')return v.operational==='Grounded';
    if(state.fleetFilter==='inactive')return v.active==='Inactive';
    if(state.fleetFilter==='changed')return (state.fleetChangedVins?.[v.vin]||v.changedFields||[]).length>0;
    if(state.fleetFilter==='verified')return fleetConfidence(v).label==='Verified';
    if(state.fleetFilter==='needs-data')return fleetMissingFields(v).length>0;
    if(state.fleetFilter==='amazon-only')return fleetConfidence(v).label==='Amazon only';
    if(state.fleetFilter==='fleetos-only')return fleetConfidence(v).label==='FleetOS only';
    if(state.fleetFilter==='missing-fleetos')return fleetConfidence(v).label==='Amazon only';
    if(state.fleetFilter==='missing-amazon')return fleetConfidence(v).label==='FleetOS only';
    if(state.fleetFilter==='issues')return Boolean(fleetIssueForVehicle(v));
    return true;
  }).filter(v=>{
    if(!q)return true;
    return [v.name,v.vin,v.plate,v.active,v.operational].some(value=>String(value||'').toLowerCase().includes(q));
  });
  if(state.fleetSort==='battery-low') filtered.sort((a,b)=>(isGasFleetVehicle(a)?1:0)-(isGasFleetVehicle(b)?1:0)||(knownBatteryPercent(a.battery)??Infinity)-(knownBatteryPercent(b.battery)??Infinity)||a.vin.localeCompare(b.vin));
  return filtered;
}
function amazonRivianIcon(tone='high') {
  return `<span class="rivian-van-art ${tone}" aria-hidden="true"><img src="assets/rivian-prime-van.png" alt=""></span>`;
}
function gasCanIcon() {
  return `<span class="gas-can-art" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M18 8h25v11l8 8v29H14V12a4 4 0 0 1 4-4Z"/><path d="M23 15h14v11H23zM43 21l7-7 6 6-6 7M24 37h17"/></svg><b>GAS</b></span>`;
}
function fleetConfidence(vehicle={}) {
  const source=String(vehicle.source||'').toLowerCase();
  const hasAmazon=source.includes('amazon fleet list');
  const hasFleetos=source.includes('fleetos tracker')||source.includes('rivian');
  if(isGasFleetVehicle(vehicle)&&hasAmazon)return {label:'Verified',className:'verified'};
  if(hasAmazon&&hasFleetos)return {label:'Verified',className:'verified'};
  if(hasAmazon)return {label:'Amazon only',className:'partial'};
  if(hasFleetos)return {label:'FleetOS only',className:'partial'};
  return {label:'Demo',className:'demo'};
}
function fleetSourceAudit(vehicle={}) {
  const source=String(vehicle.source||'').toLowerCase();
  const hasAmazon=source.includes('amazon fleet list');
  const hasFleetos=source.includes('fleetos tracker')||source.includes('rivian');
  return {
    amazon:hasAmazon?'✓ Amazon row found':'Missing Amazon row',
    fleetos:hasFleetos?'✓ FleetOS row found':'Missing FleetOS row',
    summary:hasAmazon&&hasFleetos?'VIN matched both portals':hasAmazon?'Amazon only — battery needs FleetOS':hasFleetos?'FleetOS only — name/status needs Amazon':'Demo data — upload both portals'
  };
}
function fleetNameSource(vehicle={}) {
  const source=String(vehicle.source||'').toLowerCase();
  if(source.includes('amazon fleet list'))return {className:'ok',label:'Amazon name verified',shortLabel:'Amazon official',detail:'Official name from Amazon fleet list'};
  if(source.includes('fleetos tracker')||source.includes('rivian'))return {className:'warn',label:'Name needs Amazon',shortLabel:'Needs Amazon',detail:'Temporary name until Amazon fleet list is uploaded'};
  return {className:'demo',label:'Demo name',shortLabel:'Demo name',detail:'Demo/sample name until portal uploads are added'};
}
function fleetDisplayName(vehicle={}) {
  const fixed=FIXED_FLEET_NAMES[cleanVin(vehicle.vin)];
  if(fixed)return fixed;
  const override=String(state.fleetNameOverrides?.[cleanVin(vehicle.vin)]||'').trim();
  if(override)return override;
  const source=String(vehicle.source||'').toLowerCase();
  if(source.includes('amazon fleet list')&&String(vehicle.name||'').trim())return vehicle.name;
  if(source.includes('fleetos tracker')||source.includes('rivian'))return vehicle.name||vehicle.vin||'Unknown EV';
  return vehicle.vin||vehicle.name||'Unknown EV';
}
function fleetNameEditorHtml(vehicle={}) {
  const vin=cleanVin(vehicle.vin),editing=state.editingFleetVin===vin,open=state.expandedFleetVin===vin;
  if(!open)return '';
  if(editing)return `<div class="fleet-name-editor"><label><span>Vehicle name</span><input data-fleet-name-input value="${esc(fleetDisplayName(vehicle))}" maxlength="40" aria-label="Vehicle name for ${esc(vin)}"></label><button class="btn small primary" data-action="save-fleet-name" data-vin="${esc(vin)}">Save</button><button class="btn small" data-action="cancel-fleet-name">Cancel</button></div>`;
  return `<button class="fleet-name-pencil" data-action="edit-fleet-name" data-vin="${esc(vin)}" title="Edit vehicle name" aria-label="Edit vehicle name">✎ <span>Edit name</span></button>`;
}
function fleetCardStatusPills(vehicle={}) {
  const active=normalizeActive(vehicle.active||'');
  const operational=normalizeOperational(vehicle.operational||'');
  const activeClass=active==='Active'?'ok':'warn';
  const operationalClass=operational==='Operational'?'ok':operational==='Grounded'?'danger':'warn';
  return `<div class="fleet-card-status-line"><span class="${activeClass}"><i></i>${esc(active||'Unknown')}</span><span class="vehicle-operational-pill ${operationalClass}"><i></i><b>${operational==='Operational'?'✓':operational==='Grounded'?'−':'?'}</b>${esc(operational||'Unknown')}</span></div>`;
}
function fleetCardIssueHtml(vehicle={}) {
  const issue=fleetIssueForVehicle(vehicle);if(!issue)return '';
  return `<span class="fleet-reported-issue ${esc(issue.severity||'watch')}" title="${esc(issue.active.map(item=>item.text).join(' · '))}">⚠ <b>${issue.active.length} active issue${issue.active.length===1?'':'s'}</b></span>`;
}
function fleetIssueDate(value='') {
  const date=new Date(value);if(!value||Number.isNaN(date.getTime()))return 'Date unavailable';
  return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}).format(date);
}
function fleetCardIssueManagerHtml(vehicle={}) {
  const found=fleetIssueStoreForVehicle(vehicle);if(!found)return `<section class="fleet-card-issue-manager empty"><b>No logged issues</b><span>This van has a clean issue history.</span></section>`;
  const active=(found.store.active||[]).filter(record=>record.status!=='fixed');
  const history=[...(found.store.history||[])].sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  const recurring=history.reduce((counts,record)=>{const key=record.category||record.text;counts[key]=(counts[key]||0)+1;return counts;},{});
  return `<section class="fleet-card-issue-manager"><div class="fleet-card-issue-head"><div><span class="eyebrow">VEHICLE ISSUE LOG</span><h4>${active.length} active · ${history.length} total</h4></div>${active.length?'<span class="issue-active-chip">Needs review</span>':'<span class="issue-clear-chip">All fixed</span>'}</div>${active.length?`<div class="fleet-active-issues">${active.map(record=>`<div class="fleet-active-issue ${esc(record.severity||'watch')}"><div><b>${esc(record.text)}</b><span>${esc(record.group||'Other')} · logged ${esc(fleetIssueDate(record.createdAt))}${(recurring[record.category||record.text]||0)>1?` · recurring ×${recurring[record.category||record.text]}`:''}</span></div><button class="btn small" data-action="mark-fleet-issue-fixed" data-issue-key="${esc(found.key)}" data-issue-id="${esc(record.id)}" onclick="event.stopImmediatePropagation();markFleetIssueFixed(this.dataset.issueKey,this.dataset.issueId)">✓ Mark fixed</button></div>`).join('')}</div>`:''}<details class="fleet-issue-history" ${active.length?'':'open'}><summary>Issue history (${history.length})</summary><div>${history.length?history.map(record=>`<span class="${record.status==='fixed'?'fixed':'active'}"><b>${record.status==='fixed'?'✓ Fixed':'⚠ Active'} · ${esc(record.text)}</b><small>Reported ${esc(fleetIssueDate(record.createdAt))}${record.resolvedAt?` · fixed ${esc(fleetIssueDate(record.resolvedAt))}`:''}</small></span>`).join(''):'<em>No issues have been logged for this van.</em>'}</div></details></section>`;
}
function fleetServiceTypeHtml(vehicle={}) { return vehicle.serviceType?`<span class="fleet-service-type">${esc(vehicle.serviceType)}</span>`:''; }
function fleetBatteryFreshness(vehicle={}) {
  const confidence=fleetConfidence(vehicle);
  if(confidence.label==='Demo')return {className:'warn',label:'Battery demo only'};
  if(confidence.label==='Amazon only')return {className:'warn',label:'Battery needs FleetOS'};
  const age=fleetSourceAge('fleetos');
  if(!age.hasUpload)return {className:'warn',label:'Battery source missing'};
  if(age.stale)return {className:'warn',label:`Battery stale · ${age.label}`};
  return {className:'ok',label:`Battery fresh · ${age.label}`};
}
function fleetMissingFields(vehicle={}) {
  const confidence=fleetConfidence(vehicle);
  if(confidence.label==='Demo')return ['real upload'];
  const missing=[];
  if(!String(vehicle.active||'').trim())missing.push('active status');
  if(!String(vehicle.operational||'').trim())missing.push('operational state');
  if(isGasFleetVehicle(vehicle))return missing;
  if(!String(vehicle.plate||'').trim())missing.push('plate');
  if(!vehicle.hasBattery&&confidence.label!=='Amazon only')missing.push('battery');
  if(confidence.label==='Amazon only')missing.push('FleetOS battery');
  if(confidence.label==='FleetOS only')missing.push('Amazon name/plate/status');
  return [...new Set(missing)];
}
function fleetCardCue(vehicle={}) {
  const audit=fleetSourceAudit(vehicle);
  const amazon=audit.amazon.startsWith('✓')?'A✓':'A—';
  const fleetos=audit.fleetos.startsWith('✓')?'F✓':'F—';
  return `${amazon} · ${fleetos} · click`;
}
function fleetSourceBadges(vehicle={}) {
  const audit=fleetSourceAudit(vehicle), amazonOk=audit.amazon.startsWith('✓'), fleetosOk=audit.fleetos.startsWith('✓');
  return `<span class="fleet-source-badges" aria-label="Fleet source status"><i class="${amazonOk?'ok':'warn'}">Amazon ${amazonOk?'✓':'—'}</i><i class="${fleetosOk?'ok':'warn'}">FleetOS ${fleetosOk?'✓':'—'}</i></span>`;
}
function fleetDispatchReadiness(vehicle={},missing=[]) {
  const problems=[];
  const battery=knownBatteryPercent(vehicle.battery);
  if(fleetConfidence(vehicle).label!=='Verified')problems.push('not matched');
  if(missing.length)problems.push(missing[0]);
  if(vehicle.active==='Inactive')problems.push('inactive');
  if(vehicle.operational==='Grounded')problems.push('grounded');
  if(battery!==null&&battery<30)problems.push('charge');
  if(problems.length)return {label:'Needs attention',className:'warn',detail:problems.slice(0,2).join(' + ')};
  if(battery===null)return {label:'Needs attention',className:'warn',detail:'battery unknown'};
  if(battery<50)return {label:'Watch charge',className:'caution',detail:'battery under 50%'};
  return {label:'Ready',className:'ready',detail:'matched + usable'};
}
function rivianCardIdSummary(v={},confidence={},batteryFreshness={}) {
  return `<div class="rivian-id-summary" aria-label="EV quick details"><span><b>Plate</b>${esc(v.plate||'—')}</span><span><b>Active</b>${esc(v.active||'—')}</span><span><b>Status</b>${esc(v.operational||'—')}</span><span><b>Battery source</b>${esc(batteryFreshness.label||confidence.label||'—')}</span></div>`;
}
function gasFleetCard(v={}) {
  const grounded=normalizeOperational(v.operational||v.status)==='Grounded',inactive=normalizeActive(v.active||v.status)==='Inactive',open=state.expandedFleetVin===v.vin;
  const operational=normalizeOperational(v.operational||v.status)==='Operational';
  return `<article class="fleet-card-shell ${open?'expanded':''}"><button class="rivian-card gas-fleet-card ${grounded?'hard-status grounded vehicle-grounded':operational?'vehicle-operational':''} ${inactive?'inactive':''} ${fleetIssueForVehicle(v)?'has-reported-issue':''}" data-action="toggle-fleet-card" data-vin="${esc(v.vin)}" aria-expanded="${open?'true':'false'}"><div class="rivian-card-main"><div class="rivian-copy"><div class="rivian-title-line"><h3>${esc(fleetDisplayName(v))}</h3>${grounded?'<span class="hard-status-pill grounded">Grounded</span>':''}</div><span class="gas-card-label">Gas vehicle</span>${fleetServiceTypeHtml(v)}<span class="rivian-vin"><b>VIN</b> ${esc(v.vin||'—')}</span>${fleetCardStatusPills(v)}${fleetCardIssueHtml(v)}</div>${gasCanIcon()}</div></button>${open?fleetCardIssueManagerHtml(v):''}${fleetNameEditorHtml(v)}</article>`;
}
function rivianCard(v) {
  if(isGasFleetVehicle(v))return gasFleetCard(v);
  const battery=knownBatteryPercent(v.battery),batteryKnown=battery!==null,tone=batteryTone(battery), open=state.expandedFleetVin===v.vin;
  const changes=state.fleetChangedVins?.[v.vin]||v.changedFields||[];
  const confidence=fleetConfidence(v);
  const audit=fleetSourceAudit(v);
  const nameSource=fleetNameSource(v);
  const batteryFreshness=fleetBatteryFreshness(v);
  const missing=fleetMissingFields(v);
  const dispatchReady=fleetDispatchReadiness(v,missing);
  const displayName=fleetDisplayName(v);
  const hardStatus=[v.operational==='Grounded'?'Grounded':'',v.active==='Inactive'?'Inactive':''].filter(Boolean);
  const hardStatusHtml=hardStatus.map(x=>`<span class="hard-status-pill ${x.toLowerCase()}">${esc(x)}</span>`).join('');
  const changedAt=v.updatedAt?new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(v.updatedAt)):'—';
  const compactDetails=`<div class="rivian-details simple-details"><span><b>VIN</b>${esc(v.vin||'—')}</span><span><b>Battery %</b>${batteryKnown?`${battery}%`:'Unknown'}</span><span><b>License plate #</b>${esc(v.plate||'—')}</span><span><b>Miles till empty</b>${esc(v.miles??'—')}</span><span class="${v.active==='Active'?'detail-ok':'detail-warn'}"><b>Active</b>${esc(v.active||'—')}</span><span class="${v.operational==='Operational'?'detail-ok':'detail-danger'}"><b>Status</b>${esc(v.operational||'—')}</span></div>`;
  const auditText=`Dispatch check ${dispatchReady.label}; Name source ${nameSource.detail}; Needs attention; Needs: ${missing.join(', ')||'real upload'}; Tap to collapse; Last change ${changedAt}; Amazon uploaded ${fleetSourceUploadedAt('amazon')}; FleetOS uploaded ${fleetSourceUploadedAt('fleetos')}; VIN source audit ${audit.summary}; Amazon row ${audit.amazon}; FleetOS row ${audit.fleetos}; Battery check ${batteryFreshness.label}; Confidence ${confidence.label}; Needs ${missing.join(', ')||'Nothing'}; <b>Changed</b> ${fleetChangeSourceLabels(changes).join(' | ')||'No changes'}; Source ${v.source||'Demo data'}; ${fleetChangeSourceLabels(changes).join(' | ')}; ${fleetChangeSourcePills(changes)}`;
  const operationalClass=v.operational==='Grounded'?'vehicle-grounded':v.operational==='Operational'?'vehicle-operational':'';
  return `<article class="fleet-card-shell ${open?'expanded':''}"><button class="rivian-card ${tone} ${operationalClass} ${open?'expanded':''} ${changes.length?'updated':''} ${missing.length?'needs-data':''} ${hardStatus.length?'hard-status':''} ${fleetIssueForVehicle(v)?'has-reported-issue':''}" data-action="toggle-fleet-card" data-vin="${esc(v.vin)}" aria-expanded="${open?'true':'false'}"><div class="rivian-card-main"><div class="rivian-copy"><div class="rivian-title-line"><h3>${esc(displayName)}</h3>${v.name&&v.name!==displayName?`<span class="assistive-text">${esc(v.name)}</span>`:''}${hardStatusHtml}<span class="confidence-pill ${confidence.className}">${esc(confidence.label)}</span>${changes.length?'<span class="update-pill">Updated</span>':''}</div>${fleetServiceTypeHtml(v)}<span class="rivian-vin">${esc(v.vin)}</span>${fleetSourceBadges(v)}<span class="fleet-ready-pill ${dispatchReady.className}" title="${esc(dispatchReady.detail)}"><b>${esc(dispatchReady.label)}</b><em>${esc(dispatchReady.detail)}</em></span><span class="name-source-pill ${nameSource.className}" title="${esc(nameSource.detail)}"><b>${esc(nameSource.shortLabel)}</b><em>${esc(nameSource.label)}</em></span><div class="rivian-charge-line"><span class="battery-icon ${tone}"><i style="width:${batteryKnown?Math.max(8,battery):0}%"></i></span><strong>${batteryKnown&&v.miles!==null&&v.miles!==undefined?`${v.miles} mi / ${battery}%`:'Unknown battery / range'}</strong></div>${fleetCardStatusPills(v)}${fleetCardIssueHtml(v)}<span class="fleet-card-cue ${confidence.className}">${esc(fleetCardCue(v))}</span><span class="rivian-live-status ${tone}">${esc(v.status||'Battery status unavailable')} · ${batteryLabel(battery)}</span><span class="battery-freshness ${batteryFreshness.className}">${esc(batteryFreshness.label)}</span><span class="tap-cue">${open?'Tap to collapse':'Tap for plate/status'}</span>${missing.length?`<span class="missing-line">Needs: ${esc(missing.join(', '))}</span>`:''}${changes.length?`<span class="change-line">Changed by source ${fleetChangeSourcePills(changes)}</span>`:''}</div>${amazonRivianIcon(tone)}</div>${open?`${rivianCardIdSummary(v,confidence,batteryFreshness)}${compactDetails}<span class="assistive-text">${auditText}</span>`:''}</button>${open?fleetCardIssueManagerHtml(v):''}${fleetNameEditorHtml(v)}</article>`;
}

function performancePage() {
  return `<section class="training-browser" aria-label="DA Performance Insights launcher"><div class="training-browser-bar"><div class="training-browser-dots" aria-hidden="true"><i></i><i></i><i></i></div><div class="training-browser-address"><span aria-hidden="true">🔒</span><span>${esc(PERFORMANCE_TRAINING_URL)}</span></div><a class="training-browser-open-small" href="${esc(PERFORMANCE_TRAINING_URL)}" target="_blank" rel="noopener">Open ↗</a></div><div class="training-browser-stage"><div class="training-browser-mark" aria-hidden="true">↗</div><p class="eyebrow">TRAINING DASHBOARD</p><h2>DA Performance Insights</h2><p class="training-browser-copy">Open the performance dashboard in a secure tab. Sign in with the training-dashboard password when prompted.</p><a class="btn primary training-browser-launch" href="${esc(PERFORMANCE_TRAINING_URL)}" target="_blank" rel="noopener">Open DA Performance Insights <span aria-hidden="true">↗</span></a><p class="training-browser-note">This training site blocks embedded pages, so RelayOps opens the real site directly instead of showing a blank frame.</p></div></section>`;
}

function driverPerformanceTable() {
  const drivers=teamDriverRows();
  return `<article class="card table-card"><div class="card-head"><div class="card-title"><h2>Driver performance</h2><p>Scorecard signals with coaching status</p></div><button class="btn small" data-action="export-menu">${ICONS.download} Export</button></div><div class="table-wrap"><table><thead><tr><th>Driver</th><th>Role</th><th>Quality</th><th>Coaching</th></tr></thead><tbody>${drivers.length?drivers.map(driver=>`<tr><td><div class="driver-cell"><div class="driver-avatar">${initials(driver.name)}</div><strong>${esc(driverDisplayName(driver.name))}</strong></div></td><td>${esc(driver.role)}</td><td>${esc(driver.quality)}</td><td>${esc(driver.coaching)}</td></tr>`).join(''):'<tr><td colspan="4">Import Drivers & Team to populate this report.</td></tr>'}</tbody></table></div></article>`;
}

function normalizeCoachingQueue(raw=[]) {
  const valid=new Set(COACHING_OPPORTUNITIES.map(item=>item.id));
  return (Array.isArray(raw)?raw:[]).filter(record=>record&&valid.has(record.id)).map(record=>({
    id:record.id,focus:String(record.focus||''),notes:String(record.notes||''),
    status:['draft','reviewed','ready-manual','sent-manual'].includes(record.status)?record.status:'draft',
    createdAt:record.createdAt||new Date().toISOString(),updatedAt:record.updatedAt||record.createdAt||new Date().toISOString(),
    reviewedAt:record.reviewedAt||'',preparedAt:record.preparedAt||'',sentAt:record.sentAt||'',sentBy:record.sentBy||''
  }));
}
function coachingOpportunityById(id='') { return COACHING_OPPORTUNITIES.find(item=>item.id===id)||null; }
function coachingRecord(id='') { return normalizeCoachingQueue(state.coachingQueue).find(record=>record.id===id)||null; }
function coachingStatus(record) {
  if(!record)return {label:'Not queued',className:'neutral'};
  if(record.status==='sent-manual')return {label:'Sent · confirmed',className:''};
  if(record.status==='ready-manual')return {label:'Ready for manual send',className:'warn'};
  if(record.status==='reviewed')return {label:'Reviewed',className:''};
  return {label:'Draft',className:'warn'};
}
function coachingMessage(op,record={}) {
  const notes=String(record.notes||'').trim()||'We will keep the conversation focused and brief.';
  return String(state.coachingTemplate||DEFAULT_COACHING_TEMPLATE)
    .replaceAll('{driver}',op.driver).replaceAll('{first}',op.driver.split(/\s+/)[0]||op.driver)
    .replaceAll('{focus}',record.focus||op.focus).replaceAll('{notes}',notes).trim();
}
function coachingPage() {
  state.coachingQueue=normalizeCoachingQueue(state.coachingQueue);
  const directory=new Set(teamDriverRows().map(driver=>driverIdentityKey(driver.name))),opportunities=COACHING_OPPORTUNITIES.filter(op=>directory.has(driverIdentityKey(op.driver)));
  const queued=state.coachingQueue.length,reviewed=state.coachingQueue.filter(record=>['reviewed','ready-manual','sent-manual'].includes(record.status)).length,sent=state.coachingQueue.filter(record=>record.status==='sent-manual').length;
  const rows=opportunities.length?opportunities.map(op=>{const record=coachingRecord(op.id),status=coachingStatus(record);return `<tr><td><div class="driver-cell"><div class="driver-avatar">${initials(op.driver)}</div><strong>${esc(op.driver)}</strong></div></td><td><strong>${esc(record?.focus||op.focus)}</strong></td><td>${esc(op.source)}</td><td><span class="status ${op.priority==='High'?'risk':op.priority==='Medium'?'warn':''}">${esc(op.priority)}</span></td><td><span class="status ${status.className}">${esc(status.label)}</span></td><td><button class="btn small" data-action="coach" data-coaching-id="${esc(op.id)}" data-driver="${esc(op.driver)}">${record?'Review':'Add & review'}</button></td></tr>`;}).join(''):'<tr><td colspan="6">No imported Drivers & Team profiles have coaching items yet.</td></tr>';
  return `${contextBar()}<section class="coaching-summary" aria-label="Coaching status"><article><span>In queue</span><strong>${queued}</strong></article><article><span>Reviewed</span><strong>${reviewed}</strong></article><article><span>Dispatcher-confirmed sent</span><strong>${sent}</strong></article></section><div class="toolbar coaching-toolbar"><div class="toolbar-left"><button class="btn lime" data-action="coach-all">${ICONS.coach} Add due items to review</button><span class="coaching-send-note">Automatic external sending is not connected.</span></div><button class="btn" data-action="template">Manage message template</button></div><article class="card table-card"><div class="card-head"><div class="card-title"><h2>Coaching queue</h2><p>Add → review → copy message → dispatcher confirms sent</p></div><span class="status ${queued?'warn':'neutral'}">${queued} queued</span></div><div class="table-wrap"><table><thead><tr><th>Driver</th><th>Focus</th><th>Source</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></article><div class="coaching-honesty card"><b>Manual send safeguard</b><span>RelayOps can prepare and copy a reviewed message. It never claims a text was delivered until a dispatcher marks it sent after using the dispatch phone.</span></div>`;
}

function checklistsPage() {
  const groups = [
    ['Opening dispatch','12 / 14','86%',['Import Amazon roster','Confirm callouts & coverage','Assign vans and devices','Verify keys, fuel cards, phones','Send stand-up notes']],
    ['Load-out','7 / 8','88%',['Confirm staging locations','Scan route exceptions','Document late departures','Verify all routes launched']],
    ['Closeout','0 / 9','0%',['Confirm RTS for every route','Collect devices and keys','Record van damage / DVIC','Close rescue log','Prepare next-day coverage']]
  ];
  return `${contextBar()}<section class="grid fleet-grid">${groups.map((g,gi)=>`<article class="card"><div class="card-head"><div class="card-title"><h2>${g[0]}</h2><p>${g[1]} complete</p></div><span class="status ${gi===2?'neutral':gi===1?'warn':''}">${g[2]}</span></div><div class="page-summary">${g[3].map((x,i)=>`<label style="display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:1px solid #eef0ed;font-size:9px"><input type="checkbox" class="check-item" ${gi===0&&i<4||gi===1&&i<3?'checked':''}/> ${x}</label>`).join('')}<button class="btn small" style="margin-top:14px;width:100%" data-action="checklist">Open full checklist</button></div></article>`).join('')}</section><article class="card" style="margin-top:16px"><div class="card-head"><div class="card-title"><h2>Recent completion history</h2><p>Accountability across every shift</p></div></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Opening dispatcher</th><th>Opening</th><th>Load-out</th><th>Closeout</th><th>Exceptions</th></tr></thead><tbody><tr><td>Wed, Jul 1</td><td>Alex Gonzalez</td><td><span class="status">100%</span></td><td><span class="status">100%</span></td><td><span class="status">100%</span></td><td>2 notes</td></tr><tr><td>Tue, Jun 30</td><td>Sam Rivera</td><td><span class="status">100%</span></td><td><span class="status">100%</span></td><td><span class="status warn">89%</span></td><td>1 overdue</td></tr></tbody></table></div></article>`;
}

function normalizeInspectionDate(value='') {
  if(typeof value==='number'&&Number.isFinite(value)) {
    const date=new Date(Date.UTC(1899,11,30)+Math.floor(value)*86400000);
    return date.toISOString().slice(0,10);
  }
  const text=String(value||'').trim(),match=text.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/);
  if(match){let year=Number(match[3]);if(year<100)year+=2000;return `${year}-${String(match[1]).padStart(2,'0')}-${String(match[2]).padStart(2,'0')}`;}
  const parsed=new Date(text);return Number.isNaN(parsed.getTime())?'':parsed.toISOString().slice(0,10);
}
function normalizeInspectionTimestamp(value='') {
  if(typeof value==='number'&&Number.isFinite(value))return new Date(Date.UTC(1899,11,30)+value*86400000).toISOString();
  const text=String(value||'').trim();if(!text)return '';
  const parsed=new Date(text);if(!Number.isNaN(parsed.getTime()))return parsed.toISOString();
  const date=normalizeInspectionDate(text);return date?`${date}T00:00:00.000Z`:'';
}
function inspectionDateLabel(value='') {
  const date=normalizeInspectionDate(value);if(!date)return 'Choose a date';
  const [year,month,day]=date.split('-').map(Number);return new Intl.DateTimeFormat('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'}).format(new Date(year,month-1,day));
}
function inspectionFormType(value='') {
  const form=String(value||'').trim().toLowerCase();
  if(form.includes('pre-trip')&&form.includes('edv')&&form.includes('dvir'))return 'pre';
  if(form.includes('post-trip')&&form.includes('edv')&&form.includes('dvir'))return 'post';
  return '';
}
function personNameParts(value='') { return nameKey(value).split(' ').filter(Boolean); }
function inspectionNameMatches(a='',b='') {
  const left=nameKey(a),right=nameKey(b);if(!left||!right)return false;if(left===right)return true;
  const suffixes=new Set(['jr','sr','ii','iii','iv']),trimSuffix=parts=>parts.length>2&&suffixes.has(parts.at(-1))?parts.slice(0,-1):parts;
  const ap=trimSuffix(personNameParts(left)),bp=trimSuffix(personNameParts(right)),af=ap[0],bf=bp[0],al=ap.at(-1),bl=bp.at(-1);
  return Boolean(af&&bf&&af.length>1&&bf.length>1&&af===bf&&al&&al===bl);
}
function inspectionRecordsFromRows(rows=[]) {
  const header=findImportHeader(rows,[['form'],['assetname'],['driverfirstname'],['driverlastname']]);
  if(header<0)return [];
  const keys=rows[header].map(headerKey),index=(...names)=>keys.findIndex(key=>names.map(headerKey).includes(key));
  const ix={form:index('form'),date:index('date inspection occurred','date inspected','inspection date','inspection occurred','dateinspectionoccurred','dateinspected'),asset:index('asset name'),first:index('driver first name'),last:index('driver last name')};
  if(ix.date<0)return [];
  const unique=new Map();
  rows.slice(header+1).forEach(row=>{
    const type=inspectionFormType(row[ix.form]),date=normalizeInspectionDate(row[ix.date]),inspectedAt=normalizeInspectionTimestamp(row[ix.date]),first=String(row[ix.first]||'').trim(),last=String(row[ix.last]||'').trim();
    const driver=`${first} ${last}`.replace(/\s+/g,' ').trim(),asset=String(row[ix.asset]||'').trim();
    if(!type||!date||!driver||headerKey(row[ix.form])==='form')return;
    const id=`${inspectedAt||date}|${type}|${nameKey(driver)}|${headerKey(asset)}`;
    unique.set(id,{id,type,date,inspectedAt:inspectedAt||`${date}T00:00:00.000Z`,asset,driver,first,last});
  });
  return [...unique.values()].sort((a,b)=>String(b.inspectedAt||b.date).localeCompare(String(a.inspectedAt||a.date)));
}
function currentWhiparoundRoster() {
  const roster=new Map(),add=(name,source,route='',asset='')=>{
    const contact=contactForMorningDriver(name),display=contact?.name||String(name||'').trim(),key=nameKey(display);
    if(!key||state.callOffDriverKeys[callOffStatusKey(display)])return;
    const current=roster.get(key)||{key,name:display,sources:[],route:'',asset:''};
    if(!current.sources.includes(source))current.sources.push(source);if(route)current.route=route;if(asset)current.asset=asset;roster.set(key,current);
  };
  filteredMorningRows().filter(row=>row.route&&!String(row.route).startsWith('__blank_')&&row.driver&&!routeMissingPrimary(row)&&!/helper/i.test(String(row.service||''))).forEach(row=>{const driver=morningDriverNames(row.driver)[0];if(driver)add(driver,'Morning Sheet',row.route,row.ev||'');});
  return [...roster.values()].sort((a,b)=>a.name.localeCompare(b.name));
}
function whiparoundAvailableDates() {
  return [...new Set((state.whiparoundInspections||[]).map(row=>row.date).filter(Boolean))].sort().reverse();
}
function selectedWhiparoundDate() { return state.whiparoundSelectedDate||whiparoundAvailableDates()[0]||state.morningOperationDate||defaultOperationDate(); }
function whiparoundExpectedForDate(date=selectedWhiparoundDate()) {
  const snapshot=state.whiparoundRosterSnapshots?.[date],rows=date===state.morningOperationDate?currentWhiparoundRoster():Array.isArray(snapshot)&&snapshot.length?snapshot:currentWhiparoundRoster();
  return rows.filter(row=>!state.whiparoundNotOnRoute?.[`${date}|${nameKey(row.name)}`]);
}
function inspectionCandidateScore(record={},driver='',asset='') {
  const expected=personNameParts(canonicalDriverName(driver)),actual=personNameParts(record.driver),sameFull=inspectionNameMatches(record.driver,driver),sameFirst=Boolean(expected[0]&&actual[0]&&expected[0]===actual[0]);
  if(!sameFull&&!sameFirst)return -1;
  const expectedAsset=normalizeEquipmentId(String(asset||'').split('/')[0]),recordAsset=normalizeEquipmentId(record.asset||'');
  // Whiparound exports sometimes shorten or vary the last name. When both
  // assets are present, first name + the assigned EV is the strongest match.
  // Every candidate in the same tier is then sorted newest-first below.
  if(expectedAsset&&recordAsset)return expectedAsset===recordAsset&&sameFirst?200:sameFull?40:-1;
  return sameFull?120:sameFirst?80:-1;
}
function inspectionForDriver(records=[],driver='',type='',asset='') {
  return records.filter(row=>row.type===type).map(row=>({row,score:inspectionCandidateScore(row,driver,asset)})).filter(item=>item.score>=0).sort((a,b)=>b.score-a.score||String(b.row.inspectedAt||b.row.date).localeCompare(String(a.row.inspectedAt||a.row.date)))[0]?.row;
}
function whiparoundStatus(date=selectedWhiparoundDate()) {
  const records=(state.whiparoundInspections||[]).filter(row=>row.date===date),expected=whiparoundExpectedForDate(date);
  const rows=expected.map(person=>{const pre=inspectionForDriver(records,person.name,'pre',person.asset),post=inspectionForDriver(records,person.name,'post',person.asset);return {...person,pre,post};});
  const matchedIds=new Set(rows.flatMap(row=>[row.pre?.id,row.post?.id]).filter(Boolean));
  return {date,records,expected:rows,preComplete:rows.filter(row=>row.pre),postComplete:rows.filter(row=>row.post),missingPre:rows.filter(row=>!row.pre),missingPost:rows.filter(row=>!row.post),unmatched:records.filter(row=>!matchedIds.has(row.id))};
}
function rebuildWhiparoundHistory(date=selectedWhiparoundDate()) {
  const status=whiparoundStatus(date),next={...(state.whiparoundComplianceHistory||{})};
  Object.keys(next).filter(key=>key.startsWith(`${date}|`)).forEach(key=>delete next[key]);
  status.expected.forEach(row=>{next[`${date}|${nameKey(row.name)}`]={date,name:row.name,missingPre:!row.pre,missingPost:!row.post,pre:Boolean(row.pre),post:Boolean(row.post)};});
  state.whiparoundComplianceHistory=next;return status;
}
function applyWhiparoundChecksToMorning(date=selectedWhiparoundDate()) {
  if(date!==state.morningOperationDate)return {routes:0,pre:0,post:0};
  const records=(state.whiparoundInspections||[]).filter(row=>row.date===date);let routes=0,pre=0,post=0;
  (state.morningRoutes||[]).filter(row=>row.dsp===state.dspCode&&row.route&&!String(row.route).startsWith('__blank_')&&row.driver&&!routeMissingPrimary(row)&&!/helper/i.test(String(row.service||''))).forEach(route=>{
    const driver=canonicalDriverName(morningDriverNames(route.driver)[0]||route.driver),preRecord=inspectionForDriver(records,driver,'pre',route.ev),postRecord=inspectionForDriver(records,driver,'post',route.ev);
    route.preWhip=Boolean(preRecord);route.postWhip=Boolean(postRecord);routes++;pre+=Number(Boolean(preRecord));post+=Number(Boolean(postRecord));
  });
  return {routes,pre,post};
}
function driverWhiparoundStats(name='') {
  const records=Object.values(state.whiparoundComplianceHistory||{}).filter(row=>inspectionNameMatches(row.name,name));
  const missed=records.reduce((sum,row)=>sum+Number(Boolean(row.missingPre))+Number(Boolean(row.missingPost)),0),missedDays=records.filter(row=>row.missingPre||row.missingPost).length;
  return {missed,missedDays,checks:records.length,frequent:missed>=3||missedDays>=2};
}
function whiparoundReminderCard(row,type) {
  const label=type==='pre'?'Pre-Trip':'Post-Trip',phone=contactForMorningDriver(row.name)?.phone||'';
  return `<article class="whip-reminder-row"><div class="driver-avatar">${initials(row.name)}</div><div><strong>${esc(row.name)}</strong><span>${esc(row.route||'Morning Sheet')} · ${phone?esc(phone):'Phone not imported'}</span></div><button class="btn small primary" data-action="whiparound-remind" data-driver-name="${esc(row.name)}" data-inspection-type="${type}">${ICONS.phone} Text to remind driver</button><button class="btn small" data-action="whiparound-not-route" data-driver-name="${esc(row.name)}">Not on Route</button><b>${label}</b></article>`;
}
function inboxPage() {
  const dates=whiparoundAvailableDates(),date=selectedWhiparoundDate(),status=whiparoundStatus(date),expected=status.expected.length,completeBoth=status.expected.filter(row=>row.pre&&row.post).length;
  const excluded=Object.keys(state.whiparoundNotOnRoute||{}).filter(key=>key.startsWith(`${date}|`)&&state.whiparoundNotOnRoute[key]).map(key=>key.slice(date.length+1));
  const sourceNote=state.whiparoundImportName?`${esc(state.whiparoundImportName)} · ${status.records.length} valid DVIR rows`:'No Whiparound report imported yet';
  return `${contextBar(`<span class="status ${status.missingPre.length||status.missingPost.length?'warn':''}">${status.missingPre.length+status.missingPost.length} reminders</span>`)}
  <section class="whip-hero card"><div class="whip-hero-icon">${ICONS.whiparound}</div><div><span class="eyebrow">WHIPAROUND CHECKER</span><h2>See who still owes a DVIR</h2><p>RelayOps checks only the active drivers on today’s Morning Sheet or Opening Picklist. PAYCOM-only drivers are not counted.</p></div><div class="whip-import-controls"><label><span>Inspection date</span><select data-whiparound-date>${dates.length?dates.map(value=>`<option value="${value}" ${value===date?'selected':''}>${esc(inspectionDateLabel(value))}</option>`).join(''):`<option value="${date}">${esc(inspectionDateLabel(date))}</option>`}</select></label><div class="whip-import-actions"><button class="btn primary" data-action="whiparound-import">${ICONS.upload} Whiparound Import <small>CSV / XLSX</small></button><button class="btn whip-send" data-action="send-whiparound-to-sheets">${ICONS.link} Send Whiparound Checks</button></div><small>${sourceNote}</small></div></section>
  <section class="whip-kpis"><article><span>Drivers on route</span><strong>${expected}</strong><small>Morning Sheet / Picklist only</small></article><article class="pre"><span>Pre-Trip complete</span><strong>${status.preComplete.length}/${expected}</strong><small>${status.missingPre.length} still missing</small></article><article class="post"><span>Post-Trip complete</span><strong>${status.postComplete.length}/${expected}</strong><small>${status.missingPost.length} still missing</small></article><article class="done"><span>Both complete</span><strong>${completeBoth}/${expected}</strong><small>${status.unmatched.length} report name${status.unmatched.length===1?'':'s'} unmatched</small></article></section>
  ${!expected?`<div class="whip-empty-roster card">${ICONS.alert}<div><strong>No route drivers found</strong><span>Fill the Morning Sheet or Opening Picklist first. Whiparound rows are saved and will match as soon as route drivers appear.</span></div></div>`:''}
  <section class="whip-check-grid"><article class="card whip-check-card pre"><div class="whip-check-head"><div><span>BEFORE DEPARTURE</span><h3>Missing Pre-Trip DVIR</h3></div><b>${status.missingPre.length}</b></div><div class="whip-scroll-list">${status.missingPre.length?status.missingPre.map(row=>whiparoundReminderCard(row,'pre')).join(''):'<div class="whip-all-done">${ICONS.check}<strong>Everyone is complete</strong><span>No Pre-Trip reminders needed.</span></div>'}</div></article><article class="card whip-check-card post"><div class="whip-check-head"><div><span>BEFORE CLOCK-OUT</span><h3>Missing Post-Trip DVIR</h3></div><b>${status.missingPost.length}</b></div><div class="whip-scroll-list">${status.missingPost.length?status.missingPost.map(row=>whiparoundReminderCard(row,'post')).join(''):'<div class="whip-all-done">${ICONS.check}<strong>Everyone is complete</strong><span>No Post-Trip reminders needed.</span></div>'}</div></article></section>
  <section class="whip-lower-grid"><article class="card whip-template-card"><div class="card-title"><h2>Prewritten reminders</h2><p>Edit once, then every reminder button uses the saved wording.</p></div><label><span>Pre-Trip message</span><textarea data-whiparound-template="pre">${esc(state.whiparoundReminderTemplates.pre||'')}</textarea></label><label><span>Post-Trip message</span><textarea data-whiparound-template="post">${esc(state.whiparoundReminderTemplates.post||'')}</textarea></label><small>Available placeholders: {first}, {form}, {date}. A dispatcher still reviews every message before it opens in Google Messages.</small></article><article class="card whip-complete-card"><div class="card-title"><h2>Completed inspections</h2><p>Only the five requested Whiparound fields are retained.</p></div><div class="whip-complete-list">${status.records.length?status.records.map(row=>`<div><span class="${row.type}">${row.type==='pre'?'PRE':'POST'}</span><strong>${esc(row.driver)}</strong><b>${esc(row.asset||'No asset')}</b></div>`).join(''):'<div class="whip-no-file">Import today’s Whiparound report to begin.</div>'}</div>${excluded.length?`<details class="whip-excluded"><summary>${excluded.length} marked Not on Route</summary>${excluded.map(key=>`<button class="btn small" data-action="whiparound-restore" data-driver-key="${esc(key)}">Restore ${esc(key.replace(/\b\w/g,c=>c.toUpperCase()))}</button>`).join('')}</details>`:''}</article></section>`;
}
function openWhiparoundReminder(name='',type='pre') {
  const driver=contactForMorningDriver(name),phone=driver?.phone||'';
  if(!phone)return toast(`${name} does not have an imported phone number yet`,'error');
  const form=type==='post'?'Post-Trip EDV Inspection (DVIR)':'Pre-Trip EDV Inspection (DVIR)',first=(driver?.name||name).split(/\s+/)[0];
  const template=state.whiparoundReminderTemplates?.[type]||'';
  const message=template.replaceAll('{first}',first).replaceAll('{form}',form).replaceAll('{date}',inspectionDateLabel(selectedWhiparoundDate()));
  state.pendingDriverText={name:driver?.name||name,phone,driverKey:nameKey(driver?.name||name),queueKey:'',message,source:'Whiparound reminder'};
  state.modal='text-driver';render();
}
function markWhiparoundNotOnRoute(name='') {
  const date=selectedWhiparoundDate(),key=`${date}|${nameKey(name)}`;
  state.whiparoundNotOnRoute[key]=true;rebuildWhiparoundHistory(date);persist();render();toast(`${name} removed from the ${inspectionDateLabel(date)} DVIR checker`);
}
function restoreWhiparoundDriver(key='') {
  const date=selectedWhiparoundDate();delete state.whiparoundNotOnRoute[`${date}|${nameKey(key)}`];rebuildWhiparoundHistory(date);persist();render();toast('Driver restored to the Whiparound checker');
}

function inventoryItemById(id='') { return (state.inventoryItems||[]).find(item=>item.id===id); }
function openInventoryItemEditor(id='') {
  state.inventoryEditingId=String(id||'');state.modal='inventory-item';render();
}
function saveInventoryItem() {
  const existing=inventoryItemById(state.inventoryEditingId);
  const name=String(document.getElementById('inventory-item-name')?.value||'').trim();
  const category=String(document.getElementById('inventory-item-category')?.value||'').trim();
  const totalText=String(document.getElementById('inventory-item-total')?.value||'').trim();
  const availableText=String(document.getElementById('inventory-item-available')?.value||'').trim();
  const notes=String(document.getElementById('inventory-item-notes')?.value||'').trim();
  if(!name)return toast('Enter an inventory item name','error');
  if(!category)return toast('Enter an inventory category','error');
  if(!/^\d+$/.test(totalText)||!/^\d+$/.test(availableText))return toast('Total and available counts must be whole numbers','error');
  const total=Number(totalText),available=Number(availableText);
  if(available>total)return toast('Available count cannot be greater than total count','error');
  const duplicate=(state.inventoryItems||[]).find(item=>item.id!==existing?.id&&nameKey(item.name)===nameKey(name));
  if(duplicate)return toast(`${duplicate.name} already exists — edit that item instead`,'error');
  const item={id:existing?.id||inventoryRecordId('item'),name,category,total,available,notes};
  if(existing)state.inventoryItems=state.inventoryItems.map(row=>row.id===existing.id?item:row);else state.inventoryItems=[...(state.inventoryItems||[]),item];
  state.inventoryEditingId='';state.modal=null;persist();render();toast(`${name} ${existing?'updated':'added'}`);
}
function openInventoryAdjustment(id='') {
  if(!inventoryItemById(id))return toast('Inventory item could not be found','error');
  state.inventoryPendingId=id;state.modal='inventory-adjust';render();
}
function saveInventoryAdjustment() {
  const item=inventoryItemById(state.inventoryPendingId);if(!item)return toast('Inventory item could not be found','error');
  const type=String(document.getElementById('inventory-adjust-type')?.value||'assign');
  const quantityText=String(document.getElementById('inventory-adjust-quantity')?.value||'').trim();
  const assignee=String(document.getElementById('inventory-adjust-assignee')?.value||'').trim();
  const notes=String(document.getElementById('inventory-adjust-notes')?.value||'').trim();
  if(!['assign','return','unavailable','restore'].includes(type))return toast('Choose a valid inventory adjustment','error');
  if(!/^[1-9]\d*$/.test(quantityText))return toast('Quantity must be a whole number greater than zero','error');
  const quantity=Number(quantityText),subtract=type==='assign'||type==='unavailable',next=item.available+(subtract?-quantity:quantity);
  if(next<0)return toast(`Only ${item.available} ${item.name} available`,'error');
  if(next>item.total)return toast(`Return would exceed the total count of ${item.total}`,'error');
  item.available=next;
  state.inventoryLog=[{id:inventoryRecordId('movement'),itemId:item.id,itemName:item.name,type,quantity,assignee,notes,createdAt:new Date().toISOString()},...(state.inventoryLog||[])].slice(0,500);
  state.inventoryPendingId='';state.modal=null;persist();render();toast(`${item.name}: ${item.available} available`);
}
function openInventoryLog() { state.modal='inventory-log';render(); }
function inventoryMovementLabel(type='') { return ({assign:'Assigned / checked out',return:'Returned',unavailable:'Marked unavailable',restore:'Restored available'})[type]||'Adjusted'; }
function navigateOperationalAlert(el={dataset:{}}) {
  const page=String(el.dataset?.page||''),filter=String(el.dataset?.filter||'');
  if(!['fleet','morning','inbox'].includes(page))return toast('This alert destination is unavailable','error');
  state.modal=null;state.page=page;
  if(page==='fleet'&&['grounded','inactive','low','issues'].includes(filter)){state.fleetFilter=filter;state.fleetSearch='';}
  persist();render();
}

function inventoryPage() {
  const all=normalizeInventoryItems(state.inventoryItems),categories=[...new Set(all.map(item=>item.category))].sort(),filter=categories.includes(state.inventoryFilter)?state.inventoryFilter:'all',items=filter==='all'?all:all.filter(item=>item.category===filter);
  const total=all.reduce((sum,item)=>sum+item.total,0),available=all.reduce((sum,item)=>sum+item.available,0),attention=all.filter(item=>item.total>0&&item.available/item.total<=.2).length;
  const cards=items.map(item=>{const assigned=item.total-item.available,ratio=item.total?item.available/item.total:0,tone=item.available===0?'risk':ratio<=.2?'warn':'',status=item.available===0?'Out':ratio<=.2?'Low':'Ready';return `<article class="card inventory-card"><div class="inventory-card-top"><div class="entity-icon">${ICONS.box}</div><span class="status ${tone}">${status}</span></div><div><span class="inventory-category">${esc(item.category)}</span><h3>${esc(item.name)}</h3><p>${esc(item.notes||'No notes')}</p></div><div class="inventory-counts"><span><b>${item.available}</b>Available</span><span><b>${assigned}</b>Assigned / unavailable</span><span><b>${item.total}</b>Total</span></div><div class="inventory-card-actions"><button class="btn small" data-action="inventory-adjust" data-inventory-id="${esc(item.id)}">Adjust / assign</button><button class="btn small ghost" data-action="inventory-edit" data-inventory-id="${esc(item.id)}">Edit</button></div></article>`;}).join('');
  return `${contextBar()}<section class="inventory-summary"><article><span>Total tracked</span><strong>${total}</strong></article><article><span>Available now</span><strong>${available}</strong></article><article class="${attention?'warn':''}"><span>Low-stock items</span><strong>${attention}</strong></article><article><span>Movement records</span><strong>${state.inventoryLog.length}</strong></article></section><div class="toolbar inventory-toolbar"><div class="toolbar-left"><select class="filter-select" data-inventory-filter><option value="all">All categories</option>${categories.map(category=>`<option value="${esc(category)}" ${filter===category?'selected':''}>${esc(category)}</option>`).join('')}</select><button class="btn" data-action="inventory-log">Assignment log</button></div><button class="btn lime" data-action="add-item">${ICONS.plus} Add item</button></div><section class="grid inventory-grid">${cards||'<div class="empty-state card"><h3>No items in this category</h3><p>Choose another category or add a new item.</p></div>'}</section>`;
}

function reportsPage() {
  const deviceCount=Object.values(deviceSheetDetails()).filter(item=>item&&(String(item.device||'').trim()||String(item.portable||'').trim())).length;
  const reports=[['Daily roster','Drivers, routes, staging, vans, devices',`Today · ${filteredMorningRows().filter(row=>row.route&&!String(row.route).startsWith('__blank_')).length} rows`,'roster'],['Route progress','Stops, packages, pace, rescue decisions',`Live · ${routeFiltered().length} rows`,'live'],['Weekly scorecard','Driver metrics and coaching status',`${teamDriverRows().length} driver rows`,'chart'],['Fleet readiness','DVIC, assignments, maintenance, fuel',`Today · ${rivianFleet.length} vehicles`,'van'],['Attendance & hours','Scheduled vs actual shift activity',`${currentScheduleEntries().length} scheduled shifts`,'users'],['Device assignments','Daily custody and return history',`Today · ${deviceCount} filled rows`,'phone']];
  return `${contextBar()}<section class="grid report-grid">${reports.map((r,i)=>`<article class="card entity-card"><div class="entity-top"><div class="entity-icon">${ICONS[r[3]]}</div><button class="mini-icon-btn" data-action="export-report" data-report="${r[0]}">${ICONS.download}</button></div><h3>${r[0]}</h3><p>${r[1]}</p><div class="entity-meta"><div class="entity-stat" style="grid-column:1 / -1"><span>Current dataset</span><strong>${r[2]}</strong></div></div></article>`).join('')}</section><section class="grid settings-grid" style="margin-top:16px"><article class="card settings-section"><h2>Google Sheets handoff</h2><p>Export clean tabular data in the order your template expects.</p><div class="field-grid"><div class="field"><label>Template profile</label><select><option>Daily Wave Sheet</option><option>Payroll & Attendance</option><option>Weekly Scorecard</option></select></div><div class="field"><label>Date format</label><select><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div></div><div class="mapping"><div class="mapping-row"><div class="mapping-col">Amazon: route_code</div><div class="mapping-arrow">→</div><div class="mapping-col">Sheet: Route</div></div><div class="mapping-row"><div class="mapping-col">Amazon: transporter_name</div><div class="mapping-arrow">→</div><div class="mapping-col">Sheet: Driver</div></div><div class="mapping-row"><div class="mapping-col">RelayOps: vehicle_id</div><div class="mapping-arrow">→</div><div class="mapping-col">Sheet: Van</div></div></div><div class="modal-actions"><button class="btn" data-action="copy">${ICONS.copy} Copy tab-separated</button><button class="btn lime" data-action="export-menu">${ICONS.download} Download</button></div></article><article class="card settings-section"><h2>Export center</h2><p>These downloads use only the data visible to your role.</p><div class="connection"><div class="connection-logo">CSV</div><div class="connection-copy"><strong>Universal CSV</strong><span>Best for Google Sheets and imports</span></div><button class="btn small" data-action="export-csv">Download</button></div><div class="connection"><div class="connection-logo" style="background:#1c6e44">XLS</div><div class="connection-copy"><strong>Excel workbook</strong><span>Formatted spreadsheet with filters</span></div><button class="btn small" data-action="export-excel">Download</button></div><div class="connection"><div class="connection-logo" style="background:#2b5bb8">TPL</div><div class="connection-copy"><strong>Import template</strong><span>Blank CSV with accepted columns</span></div><button class="btn small" data-action="template-csv">Download</button></div></article></section>`;
}

const ROLE_POLICY_MATRIX = Object.freeze([
  {capability:'View operational workspace',owner:true,ops_manager:true,dispatcher:true,fleet_lead:true,viewer:true},
  {capability:'Import morning and workforce files',owner:true,ops_manager:true,dispatcher:true,fleet_lead:false,viewer:false},
  {capability:'Edit daily routes and roster',owner:true,ops_manager:true,dispatcher:true,fleet_lead:false,viewer:false},
  {capability:'Edit fleet health and parking',owner:true,ops_manager:true,dispatcher:true,fleet_lead:true,viewer:false},
  {capability:'Review coaching and prepare messages',owner:true,ops_manager:true,dispatcher:true,fleet_lead:false,viewer:false},
  {capability:'Export or send approved operational data',owner:true,ops_manager:true,dispatcher:true,fleet_lead:true,viewer:false},
  {capability:'Manage organization and member access',owner:true,ops_manager:false,dispatcher:false,fleet_lead:false,viewer:false}
]);
function roleLabel(role='viewer') { return ({owner:'Owner',ops_manager:'Ops manager',dispatcher:'Dispatcher',fleet_lead:'Fleet lead',viewer:'Viewer'})[role]||'Viewer'; }
function permissionMark(allowed=false) { return `<span class="permission-mark ${allowed?'allowed':'denied'}" aria-label="${allowed?'Allowed':'Not allowed'}">${allowed?'✓':'—'}</span>`; }
function adminMemberRows() {
  if(!window.RelayOpsCloud?.session)return `<tr><td colspan="4"><div class="admin-members-empty"><strong>Sign in to manage access</strong><span>The member list is loaded only after Supabase verifies the owner account.</span></div></td></tr>`;
  if(!state.cloudMembers.length)return `<tr><td colspan="4"><div class="admin-members-empty"><strong>Loading authorized members…</strong><span>RelayOps is checking the organization membership table.</span></div></td></tr>`;
  const currentId=window.RelayOpsCloud.session.user?.id||'';
  return state.cloudMembers.map(member=>{const locked=member.role==='owner'||member.user_id===currentId;return `<tr><td><div class="admin-member-name"><strong>${esc(member.display_name||'Authorized member')}</strong><small>${member.user_id===currentId?'Current account':`User ${String(member.user_id||'').slice(0,8)}…`}</small></div></td><td><span class="role-chip ${esc(member.role)}">${esc(roleLabel(member.role))}</span></td><td><span class="status ${member.active?'':'risk'}">${member.active?'Active':'Inactive'}</span></td><td>${locked?'<span class="member-access-locked">Owner access locked</span>':`<button class="btn small" data-action="edit-member-access" data-member-id="${esc(member.user_id)}">Edit access</button>`}</td></tr>`;}).join('');
}
function adminPage() {
  if(!hasOwnerAdminAccess())return `<article class="card empty-state"><div class="empty-icon">${ICONS.alert}</div><h3>Owner access required</h3><p>Admin access is restricted to ${esc(ADMIN_OWNER_EMAIL)} and protected by the signed-in Supabase owner membership.</p></article>`;
  const cloudConfigured=Boolean(window.RelayOpsCloud?.configured),signedIn=Boolean(window.RelayOpsCloud?.session),sheetReady=Boolean(state.morningSheetsEndpoint);
  const policyRows=ROLE_POLICY_MATRIX.map(row=>`<tr><td><strong>${esc(row.capability)}</strong></td><td>${permissionMark(row.owner)}</td><td>${permissionMark(row.ops_manager)}</td><td>${permissionMark(row.dispatcher)}</td><td>${permissionMark(row.fleet_lead)}</td><td>${permissionMark(row.viewer)}</td></tr>`).join('');
  return `${contextBar('<span class="status">Owner access</span>')}<section class="admin-layout"><div class="admin-main"><article class="card settings-section"><h2>Organization</h2><p>These shared labels appear throughout RelayOps for every dispatcher.</p><div class="field-grid"><div class="field"><label for="admin-dsp-name">DSP name</label><input id="admin-dsp-name" value="${esc(state.organizationName)}"></div><div class="field"><label for="admin-station-code">Station code</label><input id="admin-station-code" value="${esc(state.stationCode)}" maxlength="12"></div><div class="field"><label>Timezone</label><input value="America/Los_Angeles" readonly></div><div class="field"><label>Operating day starts</label><input value="06:00" readonly></div></div><div class="modal-actions"><button class="btn primary" data-action="save-organization">Save organization</button></div></article><article class="card table-card admin-members-card"><div class="card-head"><div class="card-title"><h2>Member access</h2><p>Role and active status are saved to Supabase and enforced by row-level security.</p></div>${signedIn?`<button class="btn small" data-action="invite">${ICONS.plus} Invite user</button>`:`<button class="btn small" data-action="cloud-account">Sign in</button>`}</div><div class="table-wrap"><table><thead><tr><th>Member</th><th>Role</th><th>Status</th><th></th></tr></thead><tbody>${adminMemberRows()}</tbody></table></div></article><article class="card table-card"><div class="card-head"><div class="card-title"><h2>Fixed role policy</h2><p>This is a read-only policy summary, not a set of pretend switches.</p></div><span class="status neutral">Database enforced</span></div><div class="table-wrap"><table class="permissions-table fixed-policy-table"><thead><tr><th>Capability</th><th>Owner</th><th>Ops manager</th><th>Dispatcher</th><th>Fleet lead</th><th>Viewer</th></tr></thead><tbody>${policyRows}</tbody></table></div></article></div><aside class="admin-side"><article class="card settings-section"><h2>Connections</h2><p>RelayOps clearly separates working handoffs from unavailable integrations.</p><div class="connection"><div class="connection-logo">amz</div><div class="connection-copy"><strong>Amazon Logistics</strong><span>Manual XLSX/CSV import is available</span></div><span class="status">File import ready</span></div><div class="connection"><div class="connection-logo" style="background:#287247">GS</div><div class="connection-copy"><strong>Google Sheets</strong><span>${sheetReady?'Saved connector endpoint':'Connector endpoint not configured'}</span></div><span class="status ${sheetReady?'':'warn'}">${sheetReady?'Ready':'Setup required'}</span></div><div class="connection unavailable-connection"><div class="connection-logo" style="background:#6d7480">ADP</div><div class="connection-copy"><strong>ADP Workforce</strong><span>No supported connector is installed</span></div><span class="status neutral" aria-disabled="true">Not available</span></div><button class="btn" style="width:100%;margin-top:5px" data-action="import">Open Amazon file import</button></article><article class="card settings-section"><h2>Dispatcher access link</h2><p>Send this full HTTPS link. Authorized cloud users see the shared workspace after sign-in.</p><div class="callout"><strong>Live shared dashboard</strong><p><a href="${DISPATCHER_SHARE_URL}" target="_blank" rel="noopener">${DISPATCHER_SHARE_URL}</a></p><p class="share-note">${DISPATCHER_SHARE_NOTE}</p><button class="btn small lime" data-action="share-dispatcher-link">${ICONS.copy} Copy clickable link</button></div><div class="callout"><strong>Fleet team parking link</strong><p><a href="${FLEET_PARKING_SHARE_URL}" target="_blank" rel="noopener">${FLEET_PARKING_SHARE_URL}</a></p><p class="share-note">Opens a Van Parking-only view with map arrangement, battery percentages, and charger status.</p><button class="btn small lime" data-action="copy-fleet-parking-link">${ICONS.copy} Copy fleet team link</button></div><div class="callout"><strong>Cloud status</strong><p>${!cloudConfigured?'Supabase is not configured in this build.':signedIn?'Owner session verified.':'Supabase is configured; sign in to manage members.'}</p><button class="btn small" data-action="cloud-account">${signedIn?'View account':'Sign in'}</button></div></article><article class="card settings-section admin-security-note"><h2>Security boundary</h2><p>Owner membership updates are accepted only when Supabase RLS verifies an active owner in this organization. Owner accounts cannot be changed from this screen.</p></article></aside></section>`;
}

function importPreviewStats() {
  if(!state.importedFile)return null;
  if(state.importedFile.kind==='details') return {included:state.importedFile.routeDetailsCount||0,excluded:0};
  const candidates=morningImportCandidates(state.importedFile);
  return {included:candidates.length,excluded:(state.importedFile.rows||[]).length-candidates.length};
}
function importColumnIndexes(file=state.importedFile) {
  const headers=file?.headers||[], norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
  const index=(...names)=>{const wanted=names.map(norm);return headers.findIndex(h=>wanted.includes(norm(h)));};
  return {
    dsp:index('dsp','dspcode','company'),
    route:index('route','routecode','cxnumber','cxroute','blockid'),
    driver:index('driver','drivername','transportername','employeename','daname','associatename','da'),
    wave:index('wave','wavetime','starttime'),
    staging:index('staging','staginglocation'),
    stops:index('stops','stopcount','plannedstops','stopsplanned','numstops'),
    packages:index('packages','packagecount','numpackages')
  };
}
function normalizedImportRouteCode(value='') {
  const route=String(value??'').replace(/\s+/g,' ').trim().toUpperCase();
  return /^(?:N\/?A|NONE|NULL|MISSING|-|TOTAL)$/i.test(route)?'':route;
}
function morningImportCandidates(file=state.importedFile) {
  if(!file)return [];
  const ix=importColumnIndexes(file),dspKey=headerKey(state.dspCode);
  return (file.rows||[]).map(row=>({row,route:ix.route>=0?normalizedImportRouteCode(row[ix.route]):''})).filter(item=>item.route&&(ix.dsp<0||headerKey(item.row[ix.dsp])===dspKey));
}
function normalizeMorningWaveTime(value='') {
  if(typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<1){
    const minutes=Math.round(value*24*60)%(24*60),hour=Math.floor(minutes/60),minute=minutes%60,suffix=hour>=12?'PM':'AM';
    return `${((hour+11)%12)+1}:${String(minute).padStart(2,'0')} ${suffix}`;
  }
  const text=String(value??'').trim();
  return /\d{1,2}:\d{2}/.test(text)?normalizeTimeDisplay(text):text;
}
function importPreflight(file=state.importedFile) {
  if(!file)return null;
  if(file.kind==='details'||file.kind==='rts') {
    const count=file.routeDetailsCount||Object.keys(file.routeDetails||{}).length;
    return {
      ready:count>0,
      included:count,
      excluded:0,
      matched:count,
      missing:count?[]:['No CX routes found'],
      checks:[
        {label:file.kind==='rts'?'Planned return to station found':'ROUTE_DJT6 rows found',ok:count>0,detail:count?`${count} CX route${count===1?'':'s'} ready to match`:'Upload an Itineraries_DJT6 file with Route code and Planned return to station'},
        {label:'CX route matching',ok:count>0,detail:'Updates only routes that already exist on the Morning Sheet'}
      ]
    };
  }
  const ix=importColumnIndexes(file), rows=file.rows||[], required=[
    ['Route / CX',ix.route],
    ['Wave time',ix.wave],
    ['Staging location',ix.staging]
  ];
  const candidates=morningImportCandidates(file);
  const routeKeys=new Set(candidates.map(item=>item.route));
  const detailKeys=new Set(Object.keys(file.routeDetails||{}).map(v=>String(v).toUpperCase()));
  const matched=[...routeKeys].filter(route=>detailKeys.has(route)).length;
  const missing=required.filter(([,ixValue])=>ixValue<0).map(([label])=>label);
  const ready=!missing.length&&candidates.length>0;
  return {
    ready,
    included:candidates.length,
    excluded:rows.length-candidates.length,
    matched,
    missing,
    checks:[
      {label:'DSP filter + valid Route Code',ok:ix.dsp>=0,detail:ix.dsp>=0?`${candidates.length} ${state.dspCode} route${candidates.length===1?'':'s'} kept · ${rows.length-candidates.length} other-DSP or non-route row${rows.length-candidates.length===1?'':'s'} skipped`:'No DSP column found — every nonblank Route Code row will be treated as your DSP'},
      {label:'Required columns',ok:!missing.length,detail:missing.length?`Missing: ${missing.join(', ')}`:'Route, Wave, and Staging columns are ready'},
      {label:'Earliest waves first',ok:ix.wave>=0,detail:ix.wave>=0?'Routes will sort by launch time before hitting the template':'Wave column is required for morning order'},
      {label:'All Service Types included',ok:true,detail:'Standard, Nursery, Helper, XL, Donation, and other DSP route services stay in the import'},
      {label:'CX route matching',ok:matched>0||!detailKeys.size,detail:detailKeys.size?`${matched} of ${routeKeys.size} plan CX route${routeKeys.size===1?'':'s'} matched ROUTE_DJT6 details`:'No ROUTE_DJT6 details uploaded — names/stops use the plan file or stay reviewable'},
      {label:'Template output',ok:ready,detail:ready?'Creates the A–M numbered Morning Sheet rows':'Fix the missing items before creating the sheet'}
    ]
  };
}
function importPreflightHtml(file=state.importedFile) {
  const proof=importPreflight(file);
  if(!proof)return '';
  const title=file?.kind==='rts'?`${proof.included} Planned RTS time${proof.included===1?'':'s'} ready`:file?.kind==='details'?`${proof.included} CX detail row${proof.included===1?'':'s'} ready`:`${proof.included} ${state.dspCode} route${proof.included===1?'':'s'} ready`;
  const subtitle=file?.kind==='rts'?'Purple Planned RTS cells will fill by CX route.':file?.kind==='details'?'Driver names and stop counts will update by CX route.':`${proof.excluded} other-DSP route${proof.excluded===1?'':'s'} will be left out automatically${proof.matched?` · ${proof.matched} CX route${proof.matched===1?'':'s'} matched ROUTE_DJT6`:''}.`;
  return `<div class="import-proof ${proof.ready?'ready':'warn'}"><div class="import-proof-head"><span class="preview-check">${proof.ready?'✓':'!'}</span><div><strong>${esc(title)}</strong><span>${esc(subtitle)}</span></div></div><div class="import-proof-grid">${proof.checks.map(check=>`<div class="${check.ok?'ok':'warn'}"><b>${check.ok?'✓':'!'}</b><span>${esc(check.label)}</span><small>${esc(check.detail)}</small></div>`).join('')}</div></div>`;
}

function morningImportTemplateProofHtml(file=state.importedFile,payload=morningSheetsConnectorPayload()) {
  const rows=filteredMorningRows(), proof=file?importPreflight(file):null;
  const waves=morningSections(rows).filter(section=>section.label.startsWith('WAVE')&&section.rows.length);
  const earliest=waves[0]?.wave||rows[0]?.wave||'No wave loaded';
  const matchedRoutes=rows.filter(r=>r.route&&!String(r.route).startsWith('__blank_')&&file?.routeDetails?.[String(r.route).trim().toUpperCase()]).length;
  const helperNames=rows.filter(r=>String(r.driver||'').includes('|')).length;
  const firstDriverOk=helperNames===0;
  const ready=Boolean(rows.length)&&(!proof||proof.ready)&&firstDriverOk&&payload.rows.length>0;
  const source=file?.name||'Current dashboard rows';
  const included=proof?proof.included:rows.length;
  const excluded=proof?proof.excluded:Number(state.lastImportExcluded)||0;
  const chips=[
    {label:'Source',value:source,ok:Boolean(rows.length)},
    {label:'DSP filter',value:proof?`${included} ${state.dspCode} kept · ${excluded} excluded`:`${rows.length} ${state.dspCode} rows visible`,ok:!proof||proof.checks?.find(c=>c.label==='DSP filter')?.ok!==false},
    {label:'Earliest wave',value:earliest,ok:Boolean(rows.length)},
    {label:'Wave boxes',value:`${waves.length} wave section${waves.length===1?'':'s'} created`,ok:waves.length>0},
    {label:'CX matches',value:file?.routeDetailsCount?`${matchedRoutes} matched to ROUTE_DJT6`:'No ROUTE_DJT6 file applied',ok:!file?.routeDetailsCount||matchedRoutes>0},
    {label:'First driver names',value:firstDriverOk?'Helper names removed after |':'A driver cell still has helper text',ok:firstDriverOk},
    {label:'Template rows',value:`${payload.rows.length} numbered A–M row${payload.rows.length===1?'':'s'}`,ok:payload.rows.length>0}
  ];
  return `<div class="import-template-proof ${ready?'ready':'warn'}"><div><strong>Import → Template proof</strong><small>${ready?'Files are shaped into the Morning Sheet before copy/send.':'Review the yellow items before copying or sending to Google Sheets.'}</small></div><div>${chips.map(chip=>`<span class="${chip.ok?'ok':'warn'}"><b>${chip.ok?'✓':'!'}</b><em>${esc(chip.label)}</em><small>${esc(chip.value)}</small></span>`).join('')}</div></div>`;
}

function modal() {
  if(['invite-user','member-access'].includes(state.modal)&&!hasOwnerAdminAccess())return '';
  if (state.modal === 'route-details') {
    const route=(state.routes||[]).find(row=>row.route===state.pendingRouteCode);
    if(!route)return '';
    const fields=[['Driver',route.driver],['Wave / staging',[route.wave,route.staging&&`Stage ${route.staging}`].filter(Boolean).join(' · ')],['Van / device',[route.van,route.device].filter(Boolean).join(' · ')],['Stops / packages',`${route.stops||0} stops · ${route.packages||0} packages`],['Progress',`${route.progress||0}% · ${Number(route.delta)>0?'+':''}${route.delta||0} stops`],['Route health',route.status||'—'],['Rescue plan',route.rescue||'—']];
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal route-detail-modal" role="dialog" aria-modal="true" aria-labelledby="route-detail-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">ROUTE DETAILS</span><h2 id="route-detail-title">${esc(route.route)}</h2><p>${esc(route.id||'')} · current dispatcher view</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="route-detail-grid">${fields.map(([label,value])=>`<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('')}</div><div class="modal-actions"><button class="btn" data-action="copy-route-summary" data-route="${esc(route.route)}">${ICONS.copy} Copy summary</button><button class="btn primary" data-action="close-modal">Done</button></div></div></div></div>`;
  }
  if (!state.modal) return '';
  if (state.modal === 'rostering-driver-swap' && state.pendingRosteringSwap) {
    const pending=state.pendingRosteringSwap,assignments=currentRosteringPlan().assignments.filter(row=>String(row.associate||'').trim());
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal rostering-swap-modal" role="dialog" aria-modal="true" aria-labelledby="rostering-driver-swap-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">ROSTER SWAP</span><h2 id="rostering-driver-swap-title">Add ${esc(driverDisplayName(pending.name))}</h2><p>Choose who comes off the roster. The confirmed shift, time, route, and service block stay in place.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="rostering-swap-field"><span>Swap with rostered driver</span><select id="rostering-swap-assignment"><option value="">Choose a rostered driver…</option>${assignments.map(row=>{const service=rosteringService(row.serviceId);return `<option value="${esc(row.id)}">${esc(driverDisplayName(row.associate))} · ${esc(row.start)} · ${esc(service?.name||'Roster')}</option>`;}).join('')}</select></label><div class="private-contact-note"><b>One-for-one replacement</b><span>${esc(driverDisplayName(pending.name))} takes the selected confirmed position. The selected driver returns to the PAYCOM unrostered list without creating a duplicate.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="apply-rostering-driver-swap">Confirm swap</button></div></div></div></div>`;
  }
  if (state.modal === 'rostering-training-add') {
    const kind=state.pendingRosteringTrainingAdd?.kind==='trainer'?'trainer':'ridealong';
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal rostering-training-modal" role="dialog" aria-modal="true" aria-labelledby="rostering-training-add-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">TRAINING MATCHES</span><h2 id="rostering-training-add-title">Add training driver</h2><p>Add a one-day trainer or a driver who needs a ridealong for ${esc(state.rosteringDate)}.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="rostering-training-form"><label><span>Training role</span><select id="rostering-training-kind"><option value="ridealong" ${kind==='ridealong'?'selected':''}>Ridealong driver</option><option value="trainer" ${kind==='trainer'?'selected':''}>Trainer</option></select></label><label><span>Driver name</span><input id="rostering-training-name" data-driver-name-input="true" placeholder="Exact driver name" autocomplete="off" autofocus></label></div><div class="private-contact-note"><b>Manual training list</b><span>Manual ridealongs appear as match rows. Manual trainers appear in the trainer picker without changing their permanent Drivers & Team tags.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-rostering-training-add">Add to training</button></div></div></div></div>`;
  }
  if (state.modal === 'delete-rostering-service' && state.pendingRosteringServiceDelete) {
    const pending=state.pendingRosteringServiceDelete;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal remove-driver-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-roster-block-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">CONFIRM ROSTER CHANGE</span><h2 id="delete-roster-block-title">Delete this roster block?</h2><p>${esc(pending.name)}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="remove-driver-warning">${ICONS.alert}<div><b>${pending.confirmed} confirmed position${pending.confirmed===1?'':'s'} will be removed</b><span>${pending.rostered} rostered name${pending.rostered===1?'':'s'} and every row in this service block will be deleted. Other service blocks stay unchanged.</span></div></div><div class="modal-actions"><button class="btn" data-action="close-modal">Keep roster block</button><button class="btn danger" data-action="confirm-delete-rostering-service">${ICONS.trash} Delete roster block</button></div></div></div></div>`;
  }
  if (state.modal === 'alert-center') {
    const groups=operationalAlertGroups(),active=groups.filter(group=>group.count),count=active.reduce((sum,group)=>sum+group.count,0);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal alert-center-modal" role="dialog" aria-modal="true" aria-labelledby="alert-center-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">TODAY'S OPERATIONS</span><h2 id="alert-center-title">${count?`${count} item${count===1?'':'s'} need attention`:'No operational alerts'}</h2><p>Fleet safety, Morning RTS, and Whiparound checks in one place.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="alert-center-list">${active.length?active.map(group=>`<article class="alert-center-row ${esc(group.tone)}"><span class="alert-center-count">${group.count}</span><div><strong>${esc(group.label)}</strong><small>${esc(group.detail)}</small></div><button class="btn small" data-action="navigate-alert" data-page="${esc(group.page)}" ${group.filter?`data-filter="${esc(group.filter)}"`:''}>Review</button></article>`).join(''):`<div class="alert-center-clear">${ICONS.check}<strong>Everything looks clear</strong><span>No grounded, inactive, low-battery, van-issue, RTS, or missing-DVIR alerts were found.</span></div>`}</div><details class="alert-center-complete"><summary>Show clear checks</summary>${groups.filter(group=>!group.count).map(group=>`<span>${ICONS.check}<b>${esc(group.label)}</b><small>${esc(group.detail)}</small></span>`).join('')}</details><div class="modal-actions"><button class="btn primary" data-action="close-modal">Done</button></div></div></div></div>`;
  }
  if (state.modal === 'inventory-item') {
    const item=inventoryItemById(state.inventoryEditingId)||{name:'',category:'',total:'',available:'',notes:''},editing=Boolean(state.inventoryEditingId);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal inventory-modal" role="dialog" aria-modal="true" aria-labelledby="inventory-item-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">INVENTORY</span><h2 id="inventory-item-title">${editing?'Edit inventory item':'Add inventory item'}</h2><p>Use whole-number counts. Available can never exceed total.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="inventory-form-grid"><label><span>Item name *</span><input id="inventory-item-name" value="${esc(item.name)}" maxlength="80" placeholder="Example: CAT phones" autofocus></label><label><span>Category *</span><input id="inventory-item-category" value="${esc(item.category)}" maxlength="50" placeholder="Devices, uniforms, safety…"></label><label><span>Total *</span><input id="inventory-item-total" type="number" min="0" step="1" inputmode="numeric" value="${esc(item.total)}"></label><label><span>Available *</span><input id="inventory-item-available" type="number" min="0" step="1" inputmode="numeric" value="${esc(item.available)}"></label><label class="full"><span>Notes</span><textarea id="inventory-item-notes" rows="3" maxlength="300" placeholder="Charging, replacement, storage, or assignment notes">${esc(item.notes)}</textarea></label></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-inventory-item">${editing?'Save changes':'Add item'}</button></div></div></div></div>`;
  }
  if (state.modal === 'inventory-adjust') {
    const item=inventoryItemById(state.inventoryPendingId);if(!item){state.modal=null;return '';}
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal inventory-modal" role="dialog" aria-modal="true" aria-labelledby="inventory-adjust-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">INVENTORY MOVEMENT</span><h2 id="inventory-adjust-title">Adjust ${esc(item.name)}</h2><p>${item.available} available · ${item.total} total. Every change is saved in the assignment log.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="inventory-form-grid"><label><span>Action</span><select id="inventory-adjust-type"><option value="assign">Assign / check out</option><option value="return">Return</option><option value="unavailable">Mark unavailable</option><option value="restore">Restore available</option></select></label><label><span>Quantity *</span><input id="inventory-adjust-quantity" type="number" min="1" step="1" inputmode="numeric" value="1"></label><label class="full"><span>Driver / dispatcher / location</span><input id="inventory-adjust-assignee" maxlength="80" placeholder="Optional assignment detail"></label><label class="full"><span>Notes</span><textarea id="inventory-adjust-notes" rows="3" maxlength="300" placeholder="Reason or handoff note"></textarea></label></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-inventory-adjustment">Save movement</button></div></div></div></div>`;
  }
  if (state.modal === 'inventory-log') {
    const records=state.inventoryLog||[];
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal inventory-log-modal" role="dialog" aria-modal="true" aria-labelledby="inventory-log-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">INVENTORY HISTORY</span><h2 id="inventory-log-title">Assignment & adjustment log</h2><p>${records.length} saved movement${records.length===1?'':'s'} · newest first</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="inventory-log-list">${records.length?records.map(record=>`<article><span class="inventory-log-quantity ${record.type==='assign'||record.type==='unavailable'?'out':'in'}">${record.type==='assign'||record.type==='unavailable'?'−':'+'}${record.quantity}</span><div><strong>${esc(record.itemName)}</strong><span>${esc(inventoryMovementLabel(record.type))}${record.assignee?` · ${esc(record.assignee)}`:''}</span>${record.notes?`<small>${esc(record.notes)}</small>`:''}</div><time datetime="${esc(record.createdAt)}">${esc(new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date(record.createdAt)))}</time></article>`).join(''):'<div class="empty-state"><h3>No movements yet</h3><p>Use Adjust / assign on an inventory card to create the first log entry.</p></div>'}</div><div class="modal-actions"><button class="btn primary" data-action="close-modal">Done</button></div></div></div></div>`;
  }
  if (state.modal === 'delete-picklist-wave' && state.pendingPicklistWaveDelete) {
    const pending=state.pendingPicklistWaveDelete;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal confirm-delete-wave-modal" role="dialog" aria-modal="true" aria-labelledby="delete-wave-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">CONFIRM WAVE REMOVAL</span><h2 id="delete-wave-title">Delete ${esc(pending.label)}?</h2><p>${pending.routes} route${pending.routes===1?'':'s'} will be removed from both the Picklist and Morning Sheet.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="private-contact-note danger"><b>Undo protection is on</b><span>The wave is highlighted red behind this confirmation. If you confirm, Sheet History can restore the exact route rows.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Keep wave</button><button class="btn danger" data-action="confirm-delete-picklist-wave">${ICONS.trash} Delete ${esc(pending.label)}</button></div></div></div></div>`;
  }
  if (state.modal === 'helper-match' && state.pendingHelperMatch) {
    const candidates=helperDriverCandidates();
    const helper=canonicalDriverName(state.pendingHelperMatch.name),display=driverDisplayName(helper);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal helper-match-modal" role="dialog" aria-modal="true" aria-labelledby="helper-match-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">HELPER ROUTE MATCH</span><h2 id="helper-match-title">Match ${esc(helper)}</h2><p>Choose a Wave 1 or Wave 2 driver. RelayOps will always display Driver + Helper everywhere.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="helper-driver-picker"><span>Driver on route</span><select id="helper-match-driver" size="${Math.min(9,Math.max(4,candidates.length))}">${candidates.map((row,index)=>`<option value="${esc(row.routeUid)}" ${index===0?'selected':''}>${esc(driverDisplayValue(row.driver))} · ${esc(row.route)} · ${esc(row.wave)}</option>`).join('')}</select></label><label class="driver-alias-field"><span>Short helper name <small>optional</small></span><input id="helper-display-name" value="${esc(display)}" placeholder="${esc(suggestedDriverAlias(helper))}" maxlength="28"><small>The original identity remains ${esc(helper)} for Whiparound, phone matching, and driver history.</small></label><div class="private-contact-note"><b>Exact-name safety</b><span>The Morning Sheet and Picklist show the short name, while RelayOps keeps the exact Drivers & Team identity underneath.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="apply-helper-match">Match with driver</button></div></div></div></div>`;
  }
  if (state.modal === 'charger-report' && state.pendingChargerReport) {
    const report=state.pendingChargerReport,yesNo=(id,value)=>`<select id="${id}" data-charger-report-field><option value="">Choose…</option><option ${value==='Yes'?'selected':''}>Yes</option><option ${value==='No'?'selected':''}>No</option><option ${value==='Unknown'?'selected':''}>Unknown</option></select>`,recent=(state.chargerReports||[]).filter(item=>item.chargerKey&&item.chargerKey===report.key).slice(-3).reverse();
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal charger-report-modal" role="dialog" aria-modal="true" aria-labelledby="charger-report-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">VAN PARKING · SLACK HANDOFF</span><h2 id="charger-report-title">Report Charging Station</h2><p>${report.parkingSpot?`Spot #${esc(report.parkingSpot)} is selected. `:''}Complete the compact check, review it, then copy it into the saved Slack room.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body">${recent.length?`<div class="charger-report-history"><strong>Recent reports for this charger</strong>${recent.map(item=>`<span><b>${esc(item.concern)}</b><small>${esc(new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date(item.createdAt)))}</small></span>`).join('')}</div>`:''}<div class="charger-report-grid"><label><span>Company</span><input id="charger-report-company" data-charger-report-field value="LLOL" readonly></label><label><span>Charge Port</span><input id="charger-report-port" data-charger-report-field value="${esc(report.chargePort||'')}" placeholder="Charger / port"></label><label><span>Parking spot</span><input id="charger-report-spot" data-charger-report-field value="${esc(report.parkingSpot||'')}" placeholder="#"></label><label><span>Station ID</span><input id="charger-report-station" data-charger-report-field value="${esc(report.stationId||'')}" placeholder="Station ID"></label><label><span>Lights illuminated</span>${yesNo('charger-report-lights',report.lights)}</label><label><span>Color</span><input id="charger-report-color" data-charger-report-field value="${esc(report.color||'')}" placeholder="Green, red, none…"></label><label><span>Van plugged in</span>${yesNo('charger-report-plugged',report.vanPlugged)}</label><label><span>Charger port displays</span><input id="charger-report-display" data-charger-report-field value="${esc(report.display||'')}" placeholder="Message or code"></label><label><span>Unplugged/replugged</span>${yesNo('charger-report-replugged',report.replugged)}</label><label><span>Restored</span>${yesNo('charger-report-restored',report.restored)}</label><label><span>Tried another van</span>${yesNo('charger-report-other-van',report.otherVan)}</label><label><span>Test result</span><input id="charger-report-test" data-charger-report-field value="${esc(report.testResult||'')}" placeholder="Result after testing"></label><label class="full"><span>Concern</span><textarea id="charger-report-concern" data-charger-report-field rows="3" maxlength="500" placeholder="Describe the charging concern">${esc(report.concern||'')}</textarea></label><label class="full slack-room-field"><span>Saved Slack room</span><input id="charger-report-slack-room" value="${esc(state.slackReportRoomUrl||'https://app.slack.com/client')}" placeholder="https://app.slack.com/client/WORKSPACE/CHANNEL"><small>Use a normal Slack channel URL. RelayOps saves no Slack password, token, session, or webhook secret.</small></label></div><label class="charger-report-preview"><span>Slack message preview</span><textarea id="charger-report-preview" rows="14" readonly>${esc(chargerReportTemplate(report))}</textarea></label><div class="private-contact-note"><b>Review before sending</b><span>RelayOps saves this report, marks the charger as a fault, and copies the text. Slack still requires a dispatcher to review, paste, and send.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn" data-action="copy-charger-report">Copy only</button><button class="btn primary" data-action="copy-open-charger-slack">Copy & open saved Slack</button></div></div></div></div>`;
  }
  if (state.modal === 'driver-alias' && state.pendingDriverAlias) {
    const pending=state.pendingDriverAlias,suggestion=suggestedDriverAlias(pending.canonical);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal driver-alias-modal" role="dialog" aria-modal="true" aria-labelledby="driver-alias-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">DRIVER PROFILE</span><h2 id="driver-alias-title">Identity and preferred vans</h2><p>${esc(pending.canonical)} remains the permanent driver identity even after an updated Amazon team import.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="driver-alias-field"><span>Nickname / shortened display name</span><input id="driver-alias-display" value="${esc(pending.display)}" placeholder="${esc(suggestion)}" maxlength="28" autofocus><small>Suggested: ${esc(suggestion)} · This is what Morning Sheet, Picklist, and Rostering display.</small></label><label class="driver-alias-field"><span>Other known names</span><textarea id="driver-alias-known-names" rows="3" placeholder="Separate previous names or nicknames with commas">${esc((pending.knownNames||[]).join(', '))}</textarea><small>Every saved variation resolves to the same phone, history, Whiparound record, and driver profile.</small></label><label class="driver-alias-field"><span>Preferred EV(s) / van(s)</span><input id="driver-preferred-evs" value="${esc((pending.preferredEvs||[]).map(value=>/^\d+$/.test(value)?`EV${value}`:value).join(', '))}" placeholder="EV12, EV31, F33"><small>First choice first. Automatic assignment uses a preference only when Fleet Health verifies that van is active, operational, issue-free, and sufficiently charged.</small></label><div class="alias-preview"><span>Dashboard preview</span><strong>${esc(pending.display||pending.canonical)}</strong><small>Permanent identity: ${esc(pending.canonical)}${pending.preferredEvs?.length?` · Preferred: ${esc(pending.preferredEvs.map(value=>/^\d+$/.test(value)?`EV${value}`:value).join(', '))}`:''}</small></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn" data-action="clear-driver-alias">Use full name</button><button class="btn primary" data-action="save-driver-alias">Save driver profile</button></div></div></div></div>`;
  }
  if (state.modal === 'morning-vehicle-issue' && state.pendingMorningIssue) {
    const pending=state.pendingMorningIssue,issue=vehicleIssueForEquipmentId(pending.equipment),records=issue?.reported?.active||[],acknowledged=morningIssueAcknowledged(pending.route,issue?.reported);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal morning-issue-modal" role="dialog" aria-modal="true" aria-labelledby="morning-issue-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">MORNING SAFETY CHECK</span><h2 id="morning-issue-title">${esc(pending.equipment)} has ${records.length} logged issue${records.length===1?'':'s'}</h2><p>${esc(pending.route)} · review before this van is assigned.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="morning-issue-list">${records.map(record=>`<div class="${esc(record.severity||'watch')}"><b>⚠ ${esc(record.text)}</b><span>${esc(record.group||'Other')} · reported ${esc(fleetIssueDate(record.createdAt))}</span><button class="btn small" data-action="mark-fleet-issue-fixed" data-issue-key="${esc(issue?.reported?.key||'')}" data-issue-id="${esc(record.id||'')}">Mark as repaired</button></div>`).join('')}</div><div class="private-contact-note"><b>${acknowledged?'✓ Already acknowledged':'Opening dispatcher acknowledgement'}</b><span>${acknowledged?'This issue was reviewed for today’s operation.':'Acknowledge means you saw the warning. It does not mark the vehicle issue fixed.'}</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Close</button><button class="btn primary" data-action="acknowledge-morning-vehicle-issue" onclick="event.stopImmediatePropagation();acknowledgeMorningVehicleIssue()" ${acknowledged?'disabled':''}>${acknowledged?'Acknowledged':'I understand · acknowledge'}</button></div></div></div></div>`;
  }
  if (state.modal === 'equipment-issue' && state.pendingEquipmentIssue) {
    const pending=state.pendingEquipmentIssue,issue=equipmentIssueFor(pending.type,pending.value),history=state.equipmentIssues?.[equipmentIssueKey(pending.type,pending.value)]?.history||[];
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-issue-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-issue-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">DEVICE AND PORTABLE SAFETY</span><h2 id="equipment-issue-title">Report equipment issue</h2><p>Issues stay attached to the physical Device or Portable number, even when it moves to another van.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="equipment-issue-form"><label><span>Type</span><select id="equipment-issue-type"><option value="device" ${pending.type==='device'?'selected':''}>Device</option><option value="portable" ${pending.type==='portable'?'selected':''}>Portable</option></select></label><label><span>Number</span><input id="equipment-issue-id" value="${esc(pending.value||'')}" maxlength="4" placeholder="3"></label><label><span>Severity</span><select id="equipment-issue-severity"><option value="watch">Watch</option><option value="high">High</option><option value="critical">Do not assign</option></select></label><label class="full"><span>Issue notes</span><textarea id="equipment-issue-text" rows="3" maxlength="280" placeholder="Type the exact issue…"></textarea></label></div>${issue?`<div class="equipment-active-issue-list">${issue.active.map(record=>`<article><div><b>⚠ ${esc(record.text)}</b><span>${esc(record.severity)} · logged ${esc(equipmentIssueDate(record.createdAt))}</span></div><button class="btn small" data-action="mark-equipment-issue-fixed" data-equipment-issue-key="${esc(issue.key)}" data-equipment-issue-id="${esc(record.id)}">Mark fixed</button></article>`).join('')}</div>`:''}${history.length?`<details class="equipment-issue-history"><summary>Issue history (${history.length})</summary>${[...history].reverse().map(record=>`<span><b>${record.status==='fixed'?'✓':'⚠'} ${esc(record.text)}</b><small>${esc(equipmentIssueDate(record.createdAt))}${record.resolvedAt?` · fixed ${esc(equipmentIssueDate(record.resolvedAt))}`:''}</small></span>`).join('')}</details>`:''}<div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-equipment-issue">Save issue</button></div></div></div></div>`;
  }
  if (state.modal === 'driver-flags' && state.pendingDriverFlags) {
    const name=state.pendingDriverFlags,selected=new Set(driverProfileFlags(name));
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal driver-flags-modal" role="dialog" aria-modal="true" aria-labelledby="driver-flags-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">DRIVER PROFILE NOTES</span><h2 id="driver-flags-title">${esc(driverDisplayName(name))}</h2><p>Check every note that dispatchers should see on Rostering, Picklist, and Morning Sheet.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="driver-flag-options">${DRIVER_NOTE_FLAGS.map(([value,label])=>`<label><input type="checkbox" data-driver-flag-option value="${esc(value)}" ${selected.has(value)?'checked':''}><span>${esc(label)}</span></label>`).join('')}</div><div class="private-contact-note"><b>Shared driver identity</b><span>These notes stay linked through nickname changes and future team imports.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-driver-flags">Save driver notes</button></div></div></div></div>`;
  }
  if (state.modal === 'clear-operational-sheet' && state.pendingSheetClear) {
    const picklist=state.pendingSheetClear==='picklist',routeCount=picklist?openingPicklistSections().reduce((total,section)=>total+section.rows.length,0):(state.morningRoutes||[]).filter(route=>route.dsp===state.dspCode).length;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal confirm-clear-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="clear-sheet-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">CONFIRM CLEAR</span><h2 id="clear-sheet-title">Clear ${picklist?'Opening Picklist':'Morning Sheet'}?</h2><p>${picklist?`${routeCount} visible Picklist route row${routeCount===1?'':'s'} will clear from both shared views. Helper/DSP-only Morning rows stay in place; Picklist notes, current-date backups, and call-offs reset.`:`All ${routeCount} current DSP route row${routeCount===1?'':'s'} will clear, while five blank Wave 1–5 sections and their wave times stay ready for the next import. Other saved fleet, driver, and device data stays unchanged.`}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="private-contact-note danger"><b>Undo protection is on</b><span>This change will be placed in Sheet History so it can be immediately restored.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Keep current sheet</button><button class="btn danger" data-action="confirm-clear-operational-sheet">${ICONS.trash} Clear ${picklist?'Picklist':'Morning Sheet'}</button></div></div></div></div>`;
  }
  if (state.modal === 'sheet-history') {
    const history=[...(state.sheetHistory?.past||[])].reverse();
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal sheet-history-modal" role="dialog" aria-modal="true" aria-labelledby="sheet-history-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">REVERSIBLE OPERATIONS</span><h2 id="sheet-history-title">Morning Sheet & Picklist history</h2><p>Undo and Redo restore shared route data without changing Fleet Health or driver profiles.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="sheet-history-list">${history.length?history.map(item=>`<article><span><b>${esc(item.label)}</b><small>${esc(item.by||'Dispatcher')} · ${esc(equipmentIssueDate(item.at))}</small></span><em>${esc(item.scope||'both')}</em></article>`).join(''):'<div class="rostering-empty"><strong>No sheet changes yet</strong><span>Edits, clears, row changes, and wave removal will appear here.</span></div>'}</div><div class="modal-actions"><button class="btn" data-action="sheet-undo" ${state.sheetHistory?.past?.length?'':'disabled'}>↶ Undo latest</button><button class="btn" data-action="sheet-redo" ${state.sheetHistory?.future?.length?'':'disabled'}>↷ Redo</button><button class="btn primary" data-action="close-modal">Done</button></div></div></div></div>`;
  }
  if (state.modal === 'cloud-account') {
    const configured=Boolean(window.RelayOpsCloud?.configured),signedIn=Boolean(window.RelayOpsCloud?.session);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal cloud-account-modal" role="dialog" aria-modal="true" aria-labelledby="cloud-account-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">SHARED RELAYOPS</span><h2 id="cloud-account-title">${!configured?'Connect the shared workspace':signedIn?'Dispatcher account':'Sign in to RelayOps'}</h2><p>${!configured?'Owner setup is required once. After setup, every authorized dispatcher uses the same live operational data.':signedIn?`Signed in as ${esc(state.cloudUser||'authorized dispatcher')}. ${state.cloudAccessError?esc(state.cloudAccessError):'Changes synchronize with your station in real time.'}`:'Sign in once on this device. After that, edits and imports load from the same live station workspace.'}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body">${!configured?`<div class="cloud-setup-steps"><span><b>1</b>Create the RelayOps Supabase project</span><span><b>2</b>Run <code>supabase/schema.sql</code></span><span><b>3</b>Add project URL, anon key, organization ID, and station ID to <code>supabase/config.js</code></span></div><div class="private-contact-note"><b>Security requirement</b><span>Use only the public anon key here. Never add the Supabase service-role key, Amazon password, FleetOS password, or portal cookies.</span></div>`:signedIn?`<div class="cloud-account-summary ${state.cloudAccessError?'has-error':''}"><span><b>${state.cloudAccessError?'!':'✓'}</b>${state.cloudAccessError?'Owner invitation required':'Authenticated'}</span><span><b>${state.cloudAccessError?'!':'✓'}</b>${state.cloudAccessError?'Ask the owner to add this email in Admin control':'Station access checked by database policies'}</span><span><b>${state.cloudAccessError?'!':'✓'}</b>${state.cloudAccessError?'Local data will not replace the shared workspace':'Realtime workspace updates enabled'}</span></div>`:`<label class="cloud-email-field"><span>Dispatcher email</span><input id="cloud-signin-email" type="email" autocomplete="email" placeholder="dispatcher@company.com"></label><div class="private-contact-note"><b>Passwordless sign-in</b><span>The secure email link identifies the dispatcher. The owner must invite the same email once before it can open station data.</span></div>`}<div class="modal-actions"><button class="btn" data-action="close-modal">Close</button>${configured?(signedIn?'<button class="btn danger" data-action="cloud-sign-out">Sign out</button>':'<button class="btn primary" data-action="cloud-sign-in">Send sign-in link</button>'):''}</div></div></div></div>`;
  }
  if (state.modal === 'member-access' && state.pendingMemberEdit) {
    const member=state.pendingMemberEdit;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal member-access-modal" role="dialog" aria-modal="true" aria-labelledby="member-access-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">OWNER ACCESS CONTROL</span><h2 id="member-access-title">Edit ${esc(member.display_name||'member')}</h2><p>Changes are written to the organization membership row and checked by Supabase RLS.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="add-driver-fields"><label><span>Role</span><select id="member-access-role" autofocus><option value="ops_manager" ${member.role==='ops_manager'?'selected':''}>Operations manager</option><option value="dispatcher" ${member.role==='dispatcher'?'selected':''}>Dispatcher</option><option value="fleet_lead" ${member.role==='fleet_lead'?'selected':''}>Fleet lead</option><option value="viewer" ${member.role==='viewer'?'selected':''}>Viewer</option></select></label><label class="member-active-toggle"><span>Account status</span><select id="member-access-active"><option value="true" ${member.active?'selected':''}>Active</option><option value="false" ${member.active?'':'selected'}>Inactive · access blocked</option></select></label></div><div class="private-contact-note"><b>Owner safety</b><span>Owner accounts cannot be demoted or deactivated here. Changes to other members require the current signed-in owner.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-member-access">Save member access</button></div></div></div></div>`;
  }
  if (state.modal === 'coaching-review' && state.pendingCoachingId) {
    const op=coachingOpportunityById(state.pendingCoachingId),record=coachingRecord(state.pendingCoachingId);if(!op)return '';
    const status=coachingStatus(record),message=coachingMessage(op,record||{});
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal coaching-review-modal" role="dialog" aria-modal="true" aria-labelledby="coaching-review-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">COACHING REVIEW</span><h2 id="coaching-review-title">${esc(op.driver)}</h2><p>${esc(op.source)} · ${esc(op.priority)} priority</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="coaching-review-status"><span class="status ${status.className}">${esc(status.label)}</span><small>Shared with authorized dispatchers</small></div><label class="driver-text-field"><span>Focus</span><input id="coaching-review-focus" value="${esc(record?.focus||op.focus)}" maxlength="120" autofocus></label><label class="driver-text-field"><span>Review notes</span><textarea id="coaching-review-notes" rows="4" maxlength="600" placeholder="What was reviewed, expected behavior, and follow-up…">${esc(record?.notes||'')}</textarea></label><div class="coaching-message-preview"><span>Prepared message</span><p>${esc(message)}</p></div><div class="private-contact-note"><b>Automatic sending is unavailable</b><span>Copy the reviewed message and send it from the dispatch phone. RelayOps will not claim delivery until you confirm it below.</span></div><div class="modal-actions"><button class="btn" data-action="save-coaching-review">Save review</button><button class="btn" data-action="copy-coaching-message">${ICONS.copy} Copy reviewed message</button><button class="btn primary" data-action="mark-coaching-sent" ${record?.status==='sent-manual'?'disabled':''}>${record?.status==='sent-manual'?'Sent confirmed':'I sent it · mark sent'}</button></div></div></div></div>`;
  }
  if (state.modal === 'coaching-template') {
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal coaching-template-modal" role="dialog" aria-modal="true" aria-labelledby="coaching-template-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">SHARED COACHING TEMPLATE</span><h2 id="coaching-template-title">Message template</h2><p>This template is saved for authorized dispatchers at this station.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="driver-text-field"><span>Template</span><textarea id="coaching-template-text" rows="7" maxlength="900" autofocus>${esc(state.coachingTemplate||DEFAULT_COACHING_TEMPLATE)}</textarea></label><div class="template-token-list"><span><b>{first}</b> Driver first name</span><span><b>{driver}</b> Full driver name</span><span><b>{focus}</b> Coaching focus</span><span><b>{notes}</b> Review notes</span></div><div class="private-contact-note"><b>Message preparation only</b><span>Saving this template does not send a message or connect an external texting service.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-coaching-template">Save shared template</button></div></div></div></div>`;
  }
  if (state.modal === 'invite-user') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal invite-user-modal" role="dialog" aria-modal="true" aria-labelledby="invite-user-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">OWNER ACCESS</span><h2 id="invite-user-title">Invite a dispatcher</h2><p>The user receives a secure email link and is limited to the role selected below.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="add-driver-fields"><label><span>Full name</span><input id="invite-user-name" autocomplete="name" placeholder="Dispatcher name"></label><label><span>Company email *</span><input id="invite-user-email" type="email" autocomplete="email" placeholder="dispatcher@company.com"></label><label><span>Role</span><select id="invite-user-role"><option value="dispatcher">Dispatcher</option><option value="fleet_lead">Fleet lead</option><option value="ops_manager">Operations manager</option><option value="viewer">Viewer</option></select></label></div><div class="private-contact-note"><b>Database-enforced access</b><span>Dispatchers can edit daily operations. Fleet leads can update shared fleet data. Viewers cannot modify the workspace.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="send-user-invite">Send secure invitation</button></div></div></div></div>`;
  if (state.modal === 'text-driver' && state.pendingDriverText) {
    const driver=state.pendingDriverText;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal add-driver-modal" role="dialog" aria-modal="true" aria-labelledby="text-driver-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">DRIVER MESSAGE</span><h2 id="text-driver-title">Text ${esc(driver.name)}</h2><p>${esc(driver.phone)} · message sends only after a dispatcher reviews it.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="driver-text-field"><span>Message</span><textarea id="driver-text-message" rows="6">${esc(driver.message)}</textarea></label><div class="private-contact-note"><b>Google Messages connection</b><span>Pair the dispatch Android phone once. RelayOps copies the phone number and message, then opens Google Messages for the dispatcher to paste, review, and send.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn" data-action="open-google-messages">Copy & open Google Messages</button><button class="btn primary" data-action="open-sms-app">Open SMS app</button></div></div></div></div>`;
  }
  if (state.modal === 'roster-destination' && state.pendingRosterDestination) {
    const pending=state.pendingRosterDestination,destination=pending.destination||'',helper=state.scheduleHelpers?.[scheduleHelperKey(pending.name)],button=(target,label,tone='')=>`<button class="btn roster-destination-action ${tone}" data-action="apply-roster-destination-action" data-roster-target="${esc(target)}">${esc(label)}</button>`,actions=[];
    if(destination==='route')actions.push(button('calloff','Call off & replace','danger-soft'),button('swap','Swap off route'),button('reduction','Move to Reductions','reduction-button'));
    if(destination==='helper')actions.push(button(helper?.matchedRoute?'helper-unmatch':'helper-match',helper?.matchedRoute?'Un-match from driver':'Match with driver','primary'));
    if(['vto2','vto4','backup'].includes(destination))actions.push(button('swap-to-route','Swap To Route','swap-route'));
    if(destination==='reduction')actions.push(button('return','Restore original route','primary'));
    else if(destination==='called-off')actions.push(button('return','Return to scheduled drivers'));
    else if(destination==='stay-home')actions.push(button('return','Return to scheduled drivers'));
    else if(['vto2','vto4','backup'].includes(destination)&&!pending.automatic)actions.push(button('return','Remove from backups'));
    if(destination!=='vto2')actions.push(button('vto2','Move to VTO 2 · Rescue','vto-2'));
    if(destination!=='vto4')actions.push(button('vto4','Move to VTO 4 · Delivery Associate','vto-4'));
    if(destination!=='route')actions.push(button('adhoc','Add as Adhoc'));
    if(destination!=='helper'&&canBecomeHelperRole(pending.role))actions.push(button('helper','Move to Helpers'));
    if(destination!=='stay-home')actions.push(button('stay-home','Told to stay home','stay-home-button'));
    if(destination!=='reduction'&&destination!=='route')actions.push(button('reduction','Move to Reductions','reduction-button'));
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal roster-destination-modal" role="dialog" aria-modal="true" aria-labelledby="roster-destination-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">OPENING ROSTER ACTIONS</span><h2 id="roster-destination-title">${esc(pending.name)}</h2><p>${esc(pending.role||'Scheduled driver')} · ${esc(destination.replace(/-/g,' ')||'roster destination')}${pending.route?` · ${esc(pending.route)}`:''}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body">${pending.automatic?`<div class="private-contact-note"><b>Automatic backup</b><span>This ${automaticBackupLabel(pending.role)} assignment comes from a scheduled ${esc(pending.role)} shift that is not on the Morning Sheet. Choose a different destination to override it.</span></div>`:''}<div class="roster-destination-actions">${actions.join('')}</div><div class="modal-actions"><button class="btn" data-action="close-modal">Done</button></div></div></div></div>`;
  }
  if (state.modal === 'route-trainer' && state.pendingRouteTrainer) {
    const pending=state.pendingRouteTrainer,route=morningRouteByUid(pending.routeUid),candidates=routeTrainerCandidates(route),size=Math.min(10,Math.max(4,candidates.length));
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal route-trainer-modal" role="dialog" aria-modal="true" aria-labelledby="route-trainer-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">ROUTE TRAINER</span><h2 id="route-trainer-title">Add a trainer to ${esc(route?.route||'this route')}</h2><p>The route keeps its CX, staging, pad, van, counts, and Planned RTS. The trainer appears beside the driver everywhere.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="route-trainer-picker"><span>Trainer</span><select id="route-trainer-name" size="${size}">${candidates.map((row,index)=>`<option value="${esc(row.name)}" ${index===0?'selected':''}>${esc(driverDisplayName(row.name))}${row.trainer?' · Trainer':''}${row.role?` · ${esc(row.role)}`:''}</option>`).join('')}</select></label><label class="driver-alias-field"><span>Short display name <small>optional</small></span><input id="route-trainer-display" placeholder="${esc(candidates[0]?suggestedDriverAlias(candidates[0].name):'First L.')}" maxlength="28"><small>The exact Drivers & Team identity stays linked for Whiparound, texting, and history.</small></label>${candidates.length?'':`<div class="private-contact-note danger"><b>No available Drivers & Team names</b><span>Import the driver or add them in Drivers & Team, then try again.</span></div>`}<div class="private-contact-note"><b>One shared assignment</b><span>RelayOps removes the selected trainer from VTO, Reductions, Called Off, Told To Stay Home, or Helper boxes before adding them to this route.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="apply-route-trainer" ${candidates.length?'':'disabled'}>Add trainer</button></div></div></div></div>`;
  }
  if (state.modal === 'route-vto-swap' && state.pendingRouteVtoSwap) {
    const pending=state.pendingRouteVtoSwap,route=morningRouteByUid(pending.routeUid),backups=currentBackupDriverRows(),size=Math.min(10,Math.max(4,backups.length));
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal route-vto-swap-modal" role="dialog" aria-modal="true" aria-labelledby="route-vto-swap-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">VTO → ROUTE</span><h2 id="route-vto-swap-title">Put a VTO driver on ${esc(route?.route||'this route')}</h2><p>${esc(pending.driverName||'Current driver')} moves to their correct VTO box. The chosen backup takes the same route position.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="route-vto-picker"><span>VTO driver</span><select id="route-vto-driver" size="${size}">${backups.map((row,index)=>`<option value="${esc(row.name)}" ${index===0?'selected':''}>${esc(driverDisplayName(row.name))} · ${esc(row.vto||scheduleBackupLabel(row.role))}</option>`).join('')}</select></label>${backups.length?'':`<div class="private-contact-note danger"><b>No VTO drivers available</b><span>Mark a scheduled driver VTO 2 or VTO 4 first.</span></div>`}<div class="private-contact-note"><b>No duplicates</b><span>The incoming driver is removed from every backup/status box. The outgoing driver is placed exactly once in VTO 2 or VTO 4 from their PAYCOM role.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="apply-route-vto-swap" ${backups.length?'':'disabled'}>Confirm VTO swap</button></div></div></div></div>`;
  }
  if (state.modal === 'vto-route-swap' && state.pendingVtoRouteSwap) {
    const pending=state.pendingVtoRouteSwap,candidates=vtoRouteSwapCandidates(pending.name),size=Math.min(10,Math.max(4,candidates.length));
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal vto-route-swap-modal" role="dialog" aria-modal="true" aria-labelledby="vto-route-swap-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">VTO ROUTE SWAP</span><h2 id="vto-route-swap-title">Swap ${esc(pending.name)} to a route</h2><p>${esc(pending.vtoLabel||scheduleBackupLabel(pending.role))} · choose the route driver who will move into this VTO spot.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="vto-route-search"><span>Search driver or CX route</span><input id="vto-route-swap-search" type="search" placeholder="Start typing a name or CX…" autocomplete="off" autofocus></label><label class="vto-route-picker"><span>Driver currently on route</span><select id="vto-route-swap-target" size="${size}">${candidates.map((row,index)=>`<option value="${esc(row.routeUid)}" data-vto-route-search="${esc(nameKey(`${row.driver} ${row.route} ${row.wave} ${waveNameForTime(row.wave)}`))}" ${index===0?'selected':''}>${esc(row.driver)} · ${esc(row.route)} · ${esc(waveNameForTime(row.wave))} ${esc(row.wave)}</option>`).join('')}</select><small id="vto-route-swap-count">${candidates.length} route${candidates.length===1?'':'s'} available</small></label>${candidates.length?'':`<div class="private-contact-note"><b>No eligible routes found</b><span>Fill the Morning Sheet with at least one assigned route before using this swap.</span></div>`}<div class="private-contact-note"><b>Safe one-step swap</b><span>${esc(pending.name)} takes the selected route. The current primary driver moves to VTO 2 or VTO 4 based on their scheduled PAYCOM role. Route, staging, pad, van, stop count, package count, Planned RTS, and any helper remain unchanged.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="apply-vto-route-swap" ${candidates.length?'':'disabled'}>Confirm Swap To Route</button></div></div></div></div>`;
  }
  if (state.modal === 'roster-swap' && state.pendingRosterSwap) {
    const swap=state.pendingRosterSwap,candidates=rosterSwapCandidates(swap.driverName);
    const isVacancy=swap.mode==='vacancy';
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal add-driver-modal" role="dialog" aria-modal="true" aria-labelledby="roster-swap-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">OPENING ROSTER</span><h2 id="roster-swap-title">${swap.mode==='calloff'?'Call off & replace':isVacancy?'Assign the empty route':'Swap off route'}</h2><p>${esc(isVacancy?'Unassigned driver':swap.driverLabel||swap.driverName)} · ${esc(swap.route)} · updates the Morning Sheet and Picklist immediately.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><label class="cloud-email-field"><span>${isVacancy?'Assign driver':'Replacement driver'}</span><select id="roster-swap-replacement"><option value="">Choose an exact driver name…</option>${candidates.map(name=>`<option value="${esc(name)}">${esc(name)}</option>`).join('')}</select></label><div class="private-contact-note"><b>${swap.mode==='calloff'?'Call-off protection':isVacancy?'Vacancy protection':'Schedule swap'}</b><span>${swap.mode==='calloff'?'The called-off driver is removed from today’s text queue. The replacement takes their Morning Sheet position.':isVacancy?'Assigning a driver clears the red warning everywhere while preserving any helper already on the route.':'Choose a replacement now, or leave the route visibly unassigned so opening dispatch cannot miss it.'}</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button>${!isVacancy&&swap.mode==='swap'?'<button class="btn danger" data-action="leave-route-unassigned">Remove driver · leave unassigned</button>':''}<button class="btn primary" data-action="apply-roster-swap">${isVacancy?'Assign driver':'Confirm swap'}</button></div></div></div></div>`;
  }
  if (state.modal === 'morning-diagnostics') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal diagnostics-modal" role="dialog" aria-modal="true" aria-labelledby="diagnostics-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">MORNING SHEET</span><h2 id="diagnostics-title">Setup & diagnostics</h2><p>Use only when imports or Google Sheets are not working.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body morning-advanced-content">${morningConnectorGuide()}${morningHandoffReadinessHtml()}${morningImportTemplateProofHtml()}${morningSheetsHandoffProofHtml()}${morningSheetStructureProofHtml()}${morningCopyFallbackProofHtml()}</div></div></div>`;
  if (state.modal === 'import') {
    const proof=importPreflight(), isRts=['rts','itinerary-rts'].includes(state.importPurpose);
    const source=state.importSource==='slack'&&!isRts?`<div class="slack-panel"><div class="slack-brand"><div class="slack-logo">S</div><div><strong>Slack Import</strong><span>#morning-operations · demo connection</span></div><span class="demo-tag">DEMO</span></div><button class="slack-file" data-action="load-slack-demo"><span class="file-type">CSV</span><span><strong>Today’s operations file</strong><small>Shared by Operations Bot · ready to use</small></span><span class="btn small">Choose this file</span></button><div class="import-note">For this demo, RelayOps will keep only ${state.dspCode} routes from the Slack file.</div></div>`:`<div class="drop-zone ${state.importedFile?'has-file':''}" id="drop-zone"><div><div class="drop-icon">${state.importedFile?ICONS.check:ICONS.upload}</div><strong>${state.importedFile?`Great! ${esc(state.importedFile.name)} is ready.`:isRts?'Choose Itineraries_DJT6 XLSX':'Choose DAYOFOPSPLAN and ROUTE_DJT6'}</strong><span>${state.importedFile?`${state.importedFile.rows.length} rows found${state.importedFile.routeDetailsCount?` · ${state.importedFile.routeDetailsCount} CX rows matched`:''}.`:isRts?'Only Route code and Planned return to station are read. All other Morning Sheet data stays unchanged.':'Select both files at the same time. Excel (.xlsx) and CSV are supported.'}</span><button class="btn primary upload-choice" data-action="choose-file">${state.importedFile?'Choose different file':isRts?'Choose Itineraries_DJT6 file':'Choose Amazon files'}</button></div></div>`;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal import-modal" role="dialog" aria-modal="true" aria-labelledby="import-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">${isRts?'PLANNED RTS':'EASY UPLOAD'}</span><h2 id="import-title">${isRts?'Upload Planned RTS times':'Make my morning sheet'}</h2><p>${isRts?'Drop the Routes_DJT6 export. Only the Planned Departure Time column is used.':'Choose the plan and route files. RelayOps joins them by CX route.'}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="upload-progress"><div class="upload-progress-step active"><b>1</b><span>Choose files</span></div><i></i><div class="upload-progress-step ${state.importedFile?'active':''}"><b>${state.importedFile?'✓':'2'}</b><span>${isRts?'Find planned time':'Match CX routes'}</span></div><i></i><div class="upload-progress-step"><b>3</b><span>${isRts?'Fill purple cells':'Make sheet'}</span></div></div>${!isRts?`<div class="source-tabs import-choice-grid"><button class="source-tab import-choice-card ${state.importSource==='slack'?'active':''}" data-action="set-import-source" data-source="slack"><strong>Slack Import</strong><small>Daily file from the operations channel</small></button><button class="source-tab import-choice-card ${state.importSource==='computer'?'active':''}" data-action="set-import-source" data-source="computer"><strong>Cortex Import</strong><small>Amazon DAYOFOPSPLAN + ROUTE_DJT6 exports</small></button></div>`:''}${source}${state.importedFile?`${importPreflightHtml()}<div class="auto-match"><strong>RelayOps will do these things:</strong><div><span>✓ Earliest wave first</span><span>✓ CX route matching</span><span>${isRts?'✓ Planned RTS purple cells':'✓ First driver name only'}</span></div></div>`:''}<div class="modal-actions easy-actions"><button class="btn sample-button" data-action="template-csv">Need an example file?</button><button class="btn primary create-sheet-button" data-action="apply-import" ${state.importedFile&&proof?.ready?'':'disabled'}>${state.importedFile?(isRts?'Fill Planned RTS →':'Create my operations sheet →'):'Choose files first'}</button></div><p class="upload-help">Nothing is sent to Amazon. RelayOps reads the files in this browser and keeps the originals unchanged.</p></div></div></div>`;
  }
  if (state.modal === 'add-driver') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal add-driver-modal" role="dialog" aria-modal="true" aria-labelledby="add-driver-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">DRIVERS & TEAM</span><h2 id="add-driver-title">Add Delivery Associate</h2><p>Add one associate without re-importing the full Amazon file.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="add-driver-fields"><label><span>Full name *</span><input id="manual-driver-name" autocomplete="name" placeholder="First and last name"></label><label><span>Personal phone *</span><input id="manual-driver-phone" inputmode="tel" autocomplete="tel" placeholder="(951) 555-0123"></label><label><span>Position</span><select id="manual-driver-role"><option>Delivery Associate</option><option>Helper, Driver</option><option>Lead DA</option><option>Helper</option></select></label><label><span>Transporter ID</span><input id="manual-driver-id" autocomplete="off" placeholder="Optional Amazon ID"></label></div><div class="private-contact-note"><b>Protected station contact</b><span>Signed-in dispatchers share this contact through Supabase. It is never published in the public GitHub Pages files.</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-manual-driver">Add Delivery Associate</button></div></div></div></div>`;
  if (state.modal === 'remove-driver' && state.pendingDriverRemoval) return `<div class="modal-backdrop" data-action="close-modal"><div class="modal remove-driver-modal" role="alertdialog" aria-modal="true" aria-labelledby="remove-driver-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">CONFIRM REMOVAL</span><h2 id="remove-driver-title">Remove ${esc(state.pendingDriverRemoval.name)}?</h2><p>This Delivery Associate will be removed from the shared Drivers & Team workspace for authorized dispatchers.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="remove-driver-warning">${ICONS.alert}<div><b>Are you sure?</b><span>You can add the associate again later by re-importing the roster or using Add Delivery Associate.</span></div></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn danger" data-action="confirm-driver-removal">${ICONS.trash} Remove DA</button></div></div></div></div>`;
  if (state.modal === 'export') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="export-title" onclick="event.stopPropagation()"><div class="modal-head"><div><h2 id="export-title">Export route data</h2><p>Ready for Excel or your Google Sheets template</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="connection"><div class="connection-logo">CSV</div><div class="connection-copy"><strong>CSV file</strong><span>Fastest option for Google Sheets</span></div><button class="btn small" data-action="export-csv">Download</button></div><div class="connection"><div class="connection-logo" style="background:#1c6e44">XLS</div><div class="connection-copy"><strong>Excel workbook</strong><span>Styled table that opens in Excel</span></div><button class="btn small" data-action="export-excel">Download</button></div><div class="connection"><div class="connection-logo" style="background:#2866b4">TAB</div><div class="connection-copy"><strong>Copy for Google Sheets</strong><span>Paste directly into cell A1</span></div><button class="btn small" data-action="copy">Copy</button></div></div></div></div>`;
  if (state.modal === 'sheets-helper') { const pasteRange=morningSheetsHandoffProof().range; return `<div class="modal-backdrop" data-action="close-modal"><div class="modal sheets-modal" role="dialog" aria-modal="true" aria-labelledby="sheets-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">GOOGLE SHEETS PASTE BOX</span><h2 id="sheets-title">Paste-ready morning sheet</h2><p>If one-click copy does not work, click Select all, copy, then paste into Google Sheets cell A3. Expected filled range: ${esc(pasteRange)}.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="paste-guide"><span><b>1</b> Select all</span><span><b>2</b> Copy</span><span><b>3</b> Paste ${esc(pasteRange)}</span></div><textarea id="sheets-copy-text" class="sheets-copy-text" readonly>${esc(state.sheetCopyText||morningSheetTsv())}</textarea><div class="modal-actions"><button class="btn" data-action="select-sheets-text">Select all text</button><button class="btn primary" data-action="copy-morning-visible">${ICONS.copy} Copy again</button></div></div></div></div>`; }
  if (state.modal === 'morning-sheets-connector') {
    const payload=morningSheetsConnectorPayload(), rows=payload.rows.length, sections=payload.sections.length;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal sheets-modal" role="dialog" aria-modal="true" aria-labelledby="morning-sheets-connector-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">GOOGLE SHEETS CONNECTOR</span><h2 id="morning-sheets-connector-title">Send values into the Ops Log</h2><p>The connector writes only the Morning Sheet values into the fixed OPS LOG 2026 cells. It does not resize columns, change fonts, recolor cells, rebuild checkboxes, or modify the operations columns.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="sheets-connector-status ${state.morningSheetsEndpoint?'ready':'warn'}"><strong>${state.morningSheetsEndpoint?'Connector saved · update Apps Script once':'Connector not set yet'}</strong><span>${state.morningSheetsEndpoint?`Install the values-only OPS LOG script, redeploy it, then keep using this endpoint. Target: ${esc(payload.sheetName)} or ${esc(payload.sheetNameCandidates?.[1]||payload.sheetName)}.`:'Copy the values-only Apps Script, deploy it as a web app, then paste the web app URL below.'}</span></div>${morningSheetsPreflightHtml(payload)}${morningSheetsHandoffProofHtml(payload)}${morningSheetsRowAuditHtml(payload)}${morningSheetsLiveProofHtml(payload)}${morningSheetsReceiptHtml()}<div class="sheets-connector-grid"><div class="connector-step"><b>1</b><strong>Replace the old Apps Script</strong><span>Delete the previous connector code, paste the values-only OPS LOG version, save, then deploy a new Web app version.</span><button class="btn small lime" data-action="copy-morning-apps-script">${ICONS.copy} COPY REVISED APPS SCRIPT</button><button class="btn small ghost" data-action="copy-morning-sheets-setup">Copy setup checklist</button><a class="btn small ghost" href="${MORNING_APPS_SCRIPT_URL}" download>Download .gs file</a></div><div class="connector-step"><b>2</b><strong>Paste web app endpoint</strong><span>Use the Apps Script deployment URL. Do not paste Google passwords or Amazon/Rivian credentials.</span><input id="morning-sheets-endpoint" value="${esc(state.morningSheetsEndpoint)}" placeholder="https://script.google.com/macros/s/.../exec"><button class="btn small" data-action="save-morning-sheets-connector">Save endpoint</button><button class="btn small ghost" data-action="test-morning-sheets-connector" ${state.morningSheetsEndpoint?'':'disabled'}>Test connector</button></div><div class="connector-step"><b>3</b><strong>Send checked sheet</strong><span>Values only: Wave/Driver/Route/Staging/Pad/EV/Device/Portable, Stop Count, Package Count, and Planned RTS. ${rows} logical rows · ${sections} sections.</span><button class="btn small ghost" data-action="dry-run-morning-to-sheets" ${state.morningSheetsEndpoint?'':'disabled'}>Dry run</button><button class="btn small primary" data-action="send-morning-to-sheets" ${state.morningSheetsEndpoint?'':'disabled'}>Send to Google Sheet</button><button class="btn small ghost" data-action="copy-morning-sheets-verify">${ICONS.copy} Copy verify checklist</button></div></div>${state.morningSheetsLastError?`<div class="import-preview import-warning"><span class="preview-check">!</span><div><strong>Connector note</strong><span>${esc(state.morningSheetsLastError)}</span></div></div>`:''}<details class="sheets-advanced-preview"><summary>Advanced transfer preview — do not paste into Apps Script</summary><div class="sheets-connector-preview"><strong>Dashboard data JSON</strong><span>This is only a preview of the filtered wave data. It is not Apps Script code.</span><textarea readonly>${esc(JSON.stringify(payload,null,2).slice(0,1800))}${JSON.stringify(payload).length>1800?'\n...':''}</textarea></div></details><div class="modal-actions"><a class="btn" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open template</a><a class="btn" href="${MORNING_APPS_SCRIPT_URL}" download>Download script</a><button class="btn lime" data-action="copy-morning-apps-script">${ICONS.copy} COPY REVISED APPS SCRIPT</button><button class="btn" data-action="test-morning-sheets-connector" ${state.morningSheetsEndpoint?'':'disabled'}>Test connector</button><button class="btn" data-action="dry-run-morning-to-sheets" ${state.morningSheetsEndpoint?'':'disabled'}>Dry run</button><button class="btn primary" data-action="send-morning-to-sheets" ${state.morningSheetsEndpoint?'':'disabled'}>Send now</button></div><p class="upload-help">Values map into fixed cells only: A/B/C/D/E/F/G/H, P/Q, and U. All other Ops Log cells and formatting stay untouched.</p></div></div></div>`;
  }
  if (state.modal === 'gas-assignment') {
    const targets=morningAssignmentTargets();
    const selectedRoutes=new Set(state.gasAssignmentRoutes||[]), selectedVans=new Set(state.gasAssignmentVans||[]);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="gas-assignment-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">GAS VEHICLE ASSIGNMENT</span><h2 id="gas-assignment-title">Choose the driver boxes</h2><p>Select only the drivers receiving gas vans, then select the available gas vehicles.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="gas-assignment-steps"><span><b>1</b>Choose drivers</span><span><b>2</b>Choose gas vans</span><span><b>3</b>Assign</span></div><strong class="gas-section-title">Drivers on the visible morning sheet</strong><div class="gas-choice-grid drivers">${targets.map(route=>`<button class="gas-choice ${selectedRoutes.has(route.route)?'selected':''}" data-action="toggle-gas-driver" data-route="${esc(route.route)}"><span>${selectedRoutes.has(route.route)?'✓':''}</span><b>${esc(route.driver||'Unassigned driver')}</b><small>${esc(route.route)} · ${esc(route.wave)}</small></button>`).join('')}</div><strong class="gas-section-title">Available gas vehicles</strong><div class="gas-choice-grid vans">${gasVehicleIds.map(van=>{const ready=Boolean(equipmentAssignmentFor(van));return `<button class="gas-choice ${selectedVans.has(van)?'selected':''}" data-action="toggle-gas-van" data-van="${van}" ${ready?'':'disabled'}><span>${selectedVans.has(van)?'✓':''}</span><b>${van}</b><small>${ready?'Device + Portable ready':'Enter both Device + Portable first'}</small></button>`;}).join('')}</div><div class="gas-assignment-summary"><strong>${selectedRoutes.size} driver${selectedRoutes.size===1?'':'s'} selected</strong><span>${selectedVans.size} assignment-ready gas van${selectedVans.size===1?'':'s'} selected · vehicles are assigned in the displayed order</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="apply-gas-assignment" ${selectedRoutes.size&&selectedVans.size?'':'disabled'}>Assign selected gas vans</button></div></div></div></div>`;
  }
  if (state.modal === 'equipment') {
    const count=state.equipmentImport?Object.keys(state.equipmentImport.details||{}).length:0;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">VAN/DEV/PORT IMPORT</span><h2 id="equipment-title">Match vans to devices</h2><p>Upload the screenshot, CSV, XLSX, PDF, or Google Sheets export. RelayOps matches each EV/VAN number to the EV cell, then fills Device and Portable.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="equipment-drop" id="equipment-drop" tabindex="0"><div class="equipment-drop-copy"><strong>Drop VAN/DEV/PORT file here</strong><span>Accepts screenshots, JPEG/PNG, PDF, CSV, XLSX, TXT, or copied screenshot files. Best Google Sheets layout: one row per van with columns EV/VAN, DEVICE, PORTABLE.</span></div><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose file</button></div><div class="equipment-layout-tip"><strong>Safest Google Sheets layout</strong><span>EV/VAN | DEVICE | PORTABLE — no merged cells. The split two-table screenshot also works, but the simple 3-column list is easiest for every dispatcher.</span></div>${state.equipmentImport?`<div class="import-preview ${count?'':'import-warning'}"><span class="preview-check">${count?'✓':'!'}</span><div><strong>${count} EV/VAN assignments found</strong><span>${count?(state.equipmentImport.name?esc(state.equipmentImport.name):'Ready to match against the EV column.'):'Try the 3-column Google Sheets layout, or upload a clearer screenshot/export.'}</span></div></div><div class="equipment-preview">${Object.entries(state.equipmentImport.details||{}).slice(0,6).map(([van,d])=>`<span><b>${esc(van)}</b> Device ${esc(d.device||'')} · Portable ${esc(d.portable||'')}</span>`).join('')}</div>`:''}<div class="modal-actions"><button class="btn" data-action="equipment-template-csv">Download VAN/DEV/PORT layout</button><button class="btn primary" data-action="apply-equipment-import" ${count?'':'disabled'}>Fill Device + Portable cells</button></div></div></div></div>`;
  }
  if (state.modal === 'fleet-import') {
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="fleet-import-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">FLEETOS + AMAZON IMPORT</span><h2 id="fleet-import-title">Update EV battery board</h2><p>Upload both files together when you can. RelayOps matches by VIN and keeps the van name exactly like the Amazon fleet list.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body">${fleetUploadPrepChecklist()}${fleetFullExportSanityCheck()}<div class="fleet-import-sources"><button class="fleet-source-card" data-action="choose-file"><strong>Amazon fleet list</strong><span>Names, VINs, license plates, Active/Inactive, Operational/Grounded</span><small>Use this for the official van name.</small></button><button class="fleet-source-card" data-action="choose-file"><strong>FleetOS tracker</strong><span>VINs, battery %, range miles, live charge readiness</span><small>Use this for battery accuracy.</small></button></div><div class="fleet-import-status"><strong>Current upload status</strong><span class="${state.fleetSourceUploads?.amazon?.vehicles?.length?'ok':'warn'}"><b>Amazon</b>${esc(fleetSourceUploadLabel('amazon'))}</span><span class="${state.fleetSourceUploads?.fleetos?.vehicles?.length?'ok':'warn'}"><b>FleetOS</b>${esc(fleetSourceUploadLabel('fleetos'))}</span></div>${fleetImportChecklist()}${fleetFullRosterReadinessStrip()}${fleetDispatcherProofStrip()}<div class="fleet-column-guide"><div><strong>Amazon columns to copy</strong><span>Vehicle Name</span><span>VIN</span><span>License Plate</span><span>Active / Inactive</span><span>Operational / Grounded</span></div><div><strong>FleetOS columns to copy</strong><span>VIN</span><span>Battery % / State of Charge</span><span>Range Miles</span><span>Status if shown</span></div></div><div class="fleet-source-rule"><strong>Simple rule</strong><span>Amazon names/status win. FleetOS battery/range wins. VIN is the match key. Amazon also sets Expected EVs automatically. Do not rename Amazon vehicles.</span></div><div class="fleet-source-rule name-lock"><strong>Name lock</strong><span>If only FleetOS is uploaded, cards use the VIN as the temporary name until the matching Amazon fleet-list row is uploaded.</span></div><div class="equipment-drop" id="drop-zone"><div class="equipment-drop-copy"><strong>Drop CSV or XLSX fleet files here</strong><span>Best: choose the Amazon fleet list and FleetOS tracker at the same time. Accepted columns include VIN, vehicle/name, license plate, active/inactive, operational/grounded, SOC/battery %, and range/miles.</span></div><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose fleet files</button></div><label class="equipment-text-label" for="fleet-paste-text">Or paste the copied FleetOS/Amazon table here</label><textarea id="fleet-paste-text" class="equipment-paste-text" placeholder="Vehicle Name&#9;VIN&#9;License Plate&#9;Active&#9;Operational Status&#10;LLOL EV 21&#9;7FCEHEB79PN014816&#9;9ABC123&#9;Active&#9;Operational">${esc(state.fleetPasteText)}</textarea><div class="auto-match"><strong>RelayOps will do this:</strong><div><span>✓ Match by VIN</span><span>✓ Use Amazon fleet names exactly</span><span>✓ Set Expected EVs from Amazon</span><span>✓ Update battery + status cards</span></div></div><div class="modal-actions"><button class="btn" data-action="fleet-template-csv">Need fleet example?</button><button class="btn" data-action="parse-fleet-paste">Read pasted table</button><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose fleet files</button></div><p class="upload-help">Tip: if only one file is uploaded, the Fleet board will warn whether Amazon names/status or FleetOS battery/range is missing. Amazon upload also sets the expected EV count so short lists are flagged automatically.</p></div></div></div>`;
  }
  if (state.modal === 'fleet-live-setup') {
    const endpoint=fleetLiveEndpoint(),endpointInfo=fleetLiveEndpointInfo(endpoint),signedIn=Boolean(window.RelayOpsCloud?.session);
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="fleet-live-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">AUTHENTICATED FLEET PROXY</span><h2 id="fleet-live-title">Connect Amazon Fleet + FleetOS safely</h2><p>RelayOps calls a signed-in Supabase proxy. The proxy—not this browser—holds the private connector URL and token.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="fleet-live-setup-grid"><label><strong>Amazon Fleet link</strong><input id="fleet-amazon-url" value="${esc(fleetAmazonPortalUrl())}" placeholder="${AMAZON_FLEET_PORTAL_URL}"><span>Dispatcher shortcut only. This link is never forwarded as an upstream URL.</span></label><label><strong>FleetOS link</strong><input id="fleet-fleetos-url" value="${esc(fleetFleetosPortalUrl())}" placeholder="${FLEETOS_PORTAL_URL}"><span>Dispatcher shortcut only. This link is never forwarded as an upstream URL.</span></label><label class="full"><strong>Authenticated proxy / Supabase Edge Function endpoint</strong><input id="fleet-live-endpoint" value="${esc(endpoint)}" placeholder="https://PROJECT.supabase.co/functions/v1/fleet-live-proxy"><span>HTTPS is required. Localhost HTTP is accepted only for development. Never paste a connector token, portal cookie, password, or Amazon/FleetOS URL here.</span></label></div><div class="fleet-live-flow"><strong>Secure refresh flow</strong><span><b>1</b>Dispatcher signs in to RelayOps</span><span><b>2</b>Browser sends only the Supabase user access token</span><span><b>3</b>Edge Function validates organization + station membership</span><span><b>4</b>Server uses FLEET_CONNECTOR_URL and FLEET_CONNECTOR_TOKEN secrets</span></div><div class="fleet-live-warning"><strong>${signedIn?'Dispatcher session ready':'Sign-in required for cloud refresh'}</strong><span>${signedIn?'Your current Supabase session will authenticate the next refresh. The connector secret never enters the dashboard.':'Save the endpoint now if needed, then sign in with the Dispatcher sign in button before using authenticated Refresh.'}</span></div>${!endpointInfo.empty&&!endpointInfo.valid?`<div class="import-preview import-warning"><span class="preview-check">!</span><div><strong>Endpoint needs attention</strong><span>${esc(endpointInfo.error)}</span></div></div>`:''}${state.fleetLiveLastError?`<div class="import-preview import-warning"><span class="preview-check">!</span><div><strong>Last authenticated pull failed</strong><span>${esc(state.fleetLiveLastError)}</span></div></div>`:''}<div class="modal-actions"><a class="btn" href="${esc(fleetAmazonPortalUrl())}" target="_blank" rel="noopener">Open Amazon Fleet</a><a class="btn" href="${esc(fleetFleetosPortalUrl())}" target="_blank" rel="noopener">Open FleetOS</a><button class="btn" data-action="fleet-import">Use upload/paste instead</button><button class="btn primary" data-action="save-fleet-live-setup">Save authenticated proxy</button></div><p class="upload-help">Refresh never calls the private connector directly and never accepts a caller-provided upstream URL.</p></div></div></div>`;
  }
  if (state.modal === 'fleet-refresh' && state.fleetRefreshPreview) {
    const p=state.fleetRefreshPreview, missing=p.missingSources||[], blockers=p.blockers||[], tone=blockers.length?'warn':'ok';
    const impact=(p.sourceImpact||[]).map(x=>`<span class="${x.ready?'ok':'warn'}"><b>${esc(x.source)}</b>${esc(x.fields)}<small>${esc(x.rule||'')}</small><em>${x.ready?`${x.count} card${x.count===1?'':'s'} changing`:'missing upload'}</em></span>`).join('');
    const fieldBreakdown=(p.fieldBreakdown||[]).map(x=>`<span class="${x.count?'changed':'empty'}"><b>${x.count}</b>${esc(x.label)}<small>${esc(x.source)}</small></span>`).join('');
    const batteryReview=(p.batteryChanges||[]).map(x=>`<span class="${esc(x.tone||'')}"><b>${esc(x.name)}</b><em>${x.batteryBefore==null?'—':`${esc(String(x.batteryBefore))}%`} → ${x.batteryAfter==null?'—':`${esc(String(x.batteryAfter))}%`}</em><small>${x.milesBefore==null?'—':`${esc(String(x.milesBefore))} mi`} → ${x.milesAfter==null?'—':`${esc(String(x.milesAfter))} mi`}</small></span>`).join('');
    const statusReview=(p.statusChanges||[]).map(x=>`<span class="${esc(x.tone||'')}"><b>${esc(x.name)}</b>${(x.lines||[]).map(line=>`<small>${esc(line)}</small>`).join('')}</span>`).join('');
    const removedPreview=(p.removedVehicles||[]).slice(0,6).map(v=>`<span><b>${esc(v.name||v.vin)}</b>${esc(v.vin||'')}</span>`).join('');
    const duplicatePreview=(p.duplicateVins||[]).slice(0,6).map(vin=>`<span><b>${esc(vin)}</b>Duplicate source row</span>`).join('');
    const conflictPreview=(p.conflictRows||[]).slice(0,6).map(x=>`<span><b>${esc(x.vin)}</b>${esc(x.source)} · ${esc(x.field)}<small>${esc((x.values||[]).join(' vs '))}</small></span>`).join('');
    const missingVinPreview=(p.missingVinPreview||[]).map(x=>`<span><b>${esc(x.vin)}</b>${esc(x.issue)}<small>${esc(x.source)}</small></span>`).join('');
    const unknownShortage=p.unknownExpectedShort?`<div class="fleet-refresh-unknown-short"><strong>Unknown missing EV</strong><span>${esc(p.unknownExpectedShort)} expected EV${p.unknownExpectedShort===1?' is':'s are'} not in the uploaded rows yet. Upload the full Amazon fleet list and FleetOS tracker so RelayOps can identify the exact VIN.</span></div>`:'';
    const decision=blockers.length?`Wait — ${blockers.length} item${blockers.length===1?'':'s'} need review before approving.`:'Safe to approve — no duplicate, missing-source, partial-upload, or expected-count blockers found.';
    const whatChanged=`<div class="fleet-refresh-what-changed ${blockers.length?'warn':'ok'}"><strong>What changed?</strong><span class="${(p.statusChanges||[]).length?'warn':'ok'}"><b>${(p.statusChanges||[]).length}</b>Amazon name/status<em>${(p.statusChanges||[]).length?'Review official name, plate, Active, Grounded':'No Amazon identity changes'}</em></span><span class="${(p.batteryChanges||[]).length?'warn':'ok'}"><b>${(p.batteryChanges||[]).length}</b>FleetOS battery/range<em>${(p.batteryChanges||[]).length?'Review charge %, miles, low battery':'No battery/range changes'}</em></span><span class="${blockers.length?'warn':'ok'}"><b>${blockers.length}</b>risk checks<em>${blockers.length?'Fix blockers before trusting refresh':'No blocker found'}</em></span><span class="${p.newCount||p.removed?'warn':'ok'}"><b>${p.newCount||0}/${p.removed||0}</b>new / removed<em>${p.newCount||p.removed?'Check partial exports and new EVs':'No roster size change'}</em></span></div>`;
    const approvalSummary=`<div class="fleet-refresh-approval-summary ${blockers.length?'warn':'ok'}"><strong>Approval summary</strong><span class="${blockers.length?'warn':'ok'}"><b>${blockers.length?'WAIT':'SAFE'}</b>${blockers.length?`${blockers.length} blocker${blockers.length===1?'':'s'} before approval`:'Ready to approve after review'}</span><span><b>${p.updated}</b>card${p.updated===1?'':'s'} changing</span><span><b>${(p.statusChanges||[]).length}</b>Amazon status/name changes</span><span><b>${(p.batteryChanges||[]).length}</b>FleetOS battery/range changes</span><span class="${missing.length?'warn':'ok'}"><b>${missing.length?missing.join(' + '):'Both'}</b>${missing.length?'source missing':'sources present'}</span></div>`;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="fleet-refresh-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">REVIEW BEFORE REFRESH</span><h2 id="fleet-refresh-title">Approve fleet refresh</h2><p>RelayOps found saved portal data. Review the counts, then approve to update the EV grid.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="fleet-refresh-decision ${blockers.length?'warn':'ok'}"><b>${blockers.length?'WAIT':'SAFE'}</b><span>${esc(decision)}</span></div>${fleetRefreshProofStrip(p)}${whatChanged}${approvalSummary}<div class="fleet-refresh-preview ${tone}"><span><b>${p.input}</b>source rows read</span><span><b>${p.total}</b>EV cards after refresh</span><span><b>${p.updated}</b>cards will change</span><span><b>${p.newCount}</b>new EVs</span><span class="${p.removed?'warn':''}"><b>${p.removed||0}</b>not in upload</span><span class="${p.duplicates?'warn':''}"><b>${p.duplicates}</b>duplicate VINs</span><span class="${p.conflicts?'warn':''}"><b>${p.conflicts||0}</b>field conflicts</span><span class="${p.expectedShort?'warn':''}"><b>${p.expected?p.expectedShort:'Set'}</b>${p.expected?p.expectedShort?`short of expected ${p.expected}`:`expected ${p.expected} covered`:'expected EV count'}</span><span class="${p.fleetosShort?'warn':''}"><b>${p.expected?`${p.fleetosCount}/${p.expected}`:'Set'}</b>${p.expected?p.fleetosShort?'FleetOS battery coverage short':'FleetOS battery covered':'FleetOS target'}</span><span class="${missing.length?'warn':''}"><b>${missing.length?missing.join(' + '):'Ready'}</b>${missing.length?'missing source':'both sources matched'}</span></div>${blockers.length?`<div class="fleet-refresh-blockers"><strong>Fix before approving</strong>${blockers.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}${unknownShortage}${missingVinPreview?`<div class="fleet-refresh-missing-vins"><strong>Missing source VINs</strong><button class="btn small" data-action="copy-refresh-missing-vins">Copy shown VINs</button>${missingVinPreview}${p.missingVinCount>p.missingVinPreview.length?`<em>${p.missingVinCount-p.missingVinPreview.length} more missing source VIN${p.missingVinCount-p.missingVinPreview.length===1?'':'s'} not shown</em>`:''}</div>`:''}${duplicatePreview?`<div class="fleet-refresh-removed"><strong>Duplicate VINs in upload</strong>${duplicatePreview}${p.duplicates>6?`<em>${p.duplicates-6} more duplicate VIN${p.duplicates-6===1?'':'s'} not shown</em>`:''}</div>`:''}${conflictPreview?`<div class="fleet-refresh-conflicts"><strong>Conflicting portal values</strong>${conflictPreview}${p.conflicts>6?`<em>${p.conflicts-6} more conflict${p.conflicts-6===1?'':'s'} not shown</em>`:''}</div>`:''}${removedPreview?`<div class="fleet-refresh-removed"><strong>EVs not in this upload</strong>${removedPreview}${p.removed>6?`<em>${p.removed-6} more EV${p.removed-6===1?'':'s'} not shown</em>`:''}</div>`:''}<div class="fleet-refresh-impact"><strong>Refresh will update</strong>${impact}</div>${statusReview?`<div class="fleet-refresh-status"><strong>Amazon status changes to review</strong>${statusReview}${(p.statusChanges||[]).length>=8?`<em>Showing first 8 Amazon name/status changes</em>`:''}</div>`:''}${batteryReview?`<div class="fleet-refresh-battery"><strong>Battery changes to review</strong>${batteryReview}${(p.batteryChanges||[]).length>=8?`<em>Showing first 8 EV battery/range changes</em>`:''}</div>`:''}${fieldBreakdown?`<div class="fleet-refresh-fields"><strong>Changed fields by source</strong>${fieldBreakdown}</div>`:''}<div class="fleet-refresh-rule"><strong>Accuracy reminder</strong><span>Refresh uses the latest files saved in RelayOps. If Amazon or FleetOS changed after those uploads, upload fresh exports first before approving.</span></div>${p.changedPreview?.length?`<div class="fleet-refresh-change-list"><strong>First changes to review</strong>${p.changedPreview.map(x=>`<span><b>${esc(x.name)}</b>${esc(x.fields.join(', '))}</span>`).join('')}</div>`:''}<p class="upload-help">Nothing changes until you approve. If the counts look wrong, go back and upload the latest Amazon + FleetOS files first.</p><div class="modal-actions"><button class="btn" data-action="fleet-import">Upload newer files</button><button class="btn" data-action="close-modal">Cancel</button><button class="btn primary ${blockers.length?'warn-approve':''}" data-action="approve-fleet-refresh">${blockers.length?'Approve anyway':'Approve refresh'}</button></div></div></div></div>`;
  }
  if (state.modal === 'screenshot' && state.screenshotPreview) return `<div class="modal-backdrop" data-action="close-modal"><div class="modal screenshot-modal" role="dialog" aria-modal="true" aria-labelledby="screenshot-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">APPROVAL REQUIRED</span><h2 id="screenshot-title">Approve GroupMe JPEG</h2><p>${state.screenshotKind==='picklist'?'Waves, Adhocs, assignments, and the operation date are included. Backups, call offs, topics, and notes are hidden.':'Only Wave, Driver/Helper, Route, Staging, Pad, EV, Device, and Portable are included.'}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="jpeg-preview"><img src="${state.screenshotPreview}" alt="Wave sheet JPEG preview"></div><div class="modal-actions"><button class="btn" data-action="close-modal">Go back</button><button class="btn primary" data-action="save-wave-screenshot">Approve & save JPEG</button></div></div></div></div>`;
  return '';
}

function aChatSnapshot() {
  const routes=filteredMorningRows().filter(row=>row.route&&!String(row.route).startsWith('__blank_')&&!/helper/i.test(String(row.service||'')));
  const missingDrivers=routes.filter(routeMissingPrimary),missingHelpers=routes.filter(routeMissingHelper);
  const grounded=rivianFleet.filter(vehicle=>String(vehicle.operational||'').toLowerCase()==='grounded');
  const lowBattery=rivianFleet.filter(isFleetLowBattery);
  const issueVans=Object.entries(state.fleetIssues||{}).filter(([,group])=>group?.active?.length);
  let whip={missingPre:[],missingPost:[]};try{whip=whiparoundStatus();}catch{}
  return {routes,missingDrivers,missingHelpers,grounded,lowBattery,issueVans,whip};
}
function aChatList(items=[],formatter=value=>String(value),empty='None') {
  return items.length?items.slice(0,8).map(formatter).join(', ')+(items.length>8?` +${items.length-8} more`:''):empty;
}
function aChatAnswer(prompt='') {
  const q=nameKey(prompt),data=aChatSnapshot();
  if(/unassigned|missing driver|empty route|route needed|need a driver|needs a driver/.test(q))return data.missingDrivers.length?`${data.missingDrivers.length} route${data.missingDrivers.length===1?' is':'s are'} missing a driver: ${aChatList(data.missingDrivers,row=>row.route)}. They are highlighted red with a ? on the Morning Sheet and Picklist.`:'Every route currently has a primary driver.';
  if(/helper|missing helper/.test(q))return data.missingHelpers.length?`${data.missingHelpers.length} assignment${data.missingHelpers.length===1?' needs':'s need'} a helper: ${aChatList(data.missingHelpers,row=>row.route)}. Use Opening roster → Helpers to match them.`:'No helper vacancy is currently flagged.';
  if(/ground|operational|safe van/.test(q))return data.grounded.length?`${data.grounded.length} grounded vehicle${data.grounded.length===1?' is':'s are'} blocked from normal assignment: ${aChatList(data.grounded,fleetDisplayName)}.`:'No grounded vehicle is loaded in Fleet Health.';
  if(/battery|charge|charging|low ev/.test(q))return data.lowBattery.length?`${data.lowBattery.length} EV${data.lowBattery.length===1?' is':'s are'} at or below ${LOW_BATTERY_SECTION_THRESHOLD}%: ${aChatList(data.lowBattery,vehicle=>`${fleetDisplayName(vehicle)} (${knownBatteryPercent(vehicle.battery)}%)`)}.`:`No imported EV is at or below ${LOW_BATTERY_SECTION_THRESHOLD}% battery.`;
  if(/issue|repair|fleet report/.test(q))return data.issueVans.length?`${data.issueVans.length} van${data.issueVans.length===1?' has':'s have'} active reports: ${aChatList(data.issueVans,([key,group])=>group.label||key)}. Open Fleet Health → Van Reports / Issues for details.`:'No active van issue is logged.';
  if(/whip|dvir|pre trip|post trip|inspection/.test(q))return `Whiparound for ${inspectionDateLabel(selectedWhiparoundDate())}: ${data.whip.missingPre.length} missing Pre-Trip and ${data.whip.missingPost.length} missing Post-Trip. The newest first-name + assigned-EV match is used for duplicate forms.`;
  if(/wave|morning|route count|how many route/.test(q))return `${data.routes.length} route${data.routes.length===1?' is':'s are'} on the current Morning Sheet. ${data.missingDrivers.length} need a primary driver and ${data.missingHelpers.length} need a helper.`;
  if(/device|portable|rabbit/.test(q))return 'Open Device and Portable Sheet, fill the EV rows, then press “Input to Morning Sheet.” RelayOps matches Device and Portable values by the assigned EV without changing route, staging, counts, or Planned RTS.';
  if(/parking|park/.test(q))return `Van Parking was last updated ${state.vanParkingUpdated||'not yet'}. Use “Assign vans by parking order” in Morning tools after confirming operational status and charge.`;
  return 'I can check unassigned routes, missing helpers, grounded vans, low batteries, van issues, Whiparound, devices, and parking. Choose a quick question below or type one in plain language.';
}
function aChatWelcome() { return {role:'assistant',text:'Hi — I’m A‑Chat, your dispatcher helper. Ask me what needs attention before load-out.'}; }
function aChatPage() {
  const messages=(state.aChatMessages||[]).length?state.aChatMessages:[aChatWelcome()];
  const quick=[['Unassigned routes','Which routes need a driver?'],['Missing helpers','Which routes need a helper?'],['Fleet risks','Show grounded vans and van issues'],['Whiparound','Who is missing Whiparound?']];
  return `<section class="achat-page"><article class="achat-panel card"><header class="achat-head"><div class="achat-pet" aria-hidden="true">${ICONS.achat}</div><div><span class="eyebrow">DISPATCHER HELPER</span><h2>A-Chat</h2><p>Quick answers from the Morning Sheet, Fleet Health, Van Parking, and Whiparound.</p></div><button class="btn small" data-action="achat-clear">Clear chat</button></header><div class="achat-status"><i></i><span>Reading this dashboard’s current saved operational data</span><small>Chat history stays in this browser.</small></div><div class="achat-stream" data-achat-stream role="log" aria-live="polite">${messages.map(message=>`<div class="achat-message ${message.role==='user'?'user':'assistant'}"><span>${message.role==='user'?'You':'A'}</span><p>${esc(message.text)}</p></div>`).join('')}</div><div class="achat-quick">${quick.map(([label,prompt])=>`<button type="button" data-action="achat-quick" data-prompt="${esc(prompt)}">${esc(label)}</button>`).join('')}</div><div class="achat-compose"><textarea data-achat-input rows="2" placeholder="Ask A-Chat about today’s operation…" aria-label="Message A-Chat"></textarea><button class="btn primary" data-action="achat-send">Send</button></div><p class="achat-note">A‑Chat summarizes RelayOps data; always confirm safety-critical decisions in Fleet Health.</p></article></section>`;
}
function sendAChatMessage(prompt='') {
  const input=document.querySelector?.('[data-achat-input]'),text=String(prompt||input?.value||'').trim();if(!text)return;
  state.aChatMessages=[...(state.aChatMessages||[]),{role:'user',text},{role:'assistant',text:aChatAnswer(text)}].slice(-40);persist();render();
}
function clearAChat() { state.aChatMessages=[];persist();render();toast('A-Chat history cleared'); }

function pageContent() {
  return ({dashboard,morning:morningSheetPage,roster:rosterPage,rostering:rosteringPage,live:livePage,achat:aChatPage,team:teamPage,fleet:fleetPage,parking:vanParkingPage,performance:performancePage,coaching:coachingPage,checklists:checklistsPage,inbox:inboxPage,inventory:inventoryPage,reports:reportsPage,admin:adminPage}[state.page] || dashboard)();
}

function messageQueueStatusKey(route='') { return `${state.morningOperationDate}|${route}`; }
function callOffStatusKey(name='') { return `${state.morningOperationDate}|${nameKey(name)}`; }
function contactForMorningDriverRaw(name='') {
  const key=nameKey(firstDriverName(name));
  const contacts=teamDriverRows();
  return contacts.find(row=>nameKey(row.name)===key)||contacts.find(row=>{
    const parts=key.split(' ').filter(Boolean), candidate=nameKey(row.name);
    return parts.length>1&&candidate.includes(parts[0])&&candidate.includes(parts[parts.length-1]);
  });
}
function contactForMorningDriver(name='') { return contactForMorningDriverRaw(driverAliasRecord(firstDriverName(name))?.canonical||name); }
function morningDriverNames(value='') { return String(value||'').split(/\s*(?:\||\+|&|\band\b)\s*/i).map(name=>name.trim()).filter(Boolean); }
function routeAssignmentVacant(route={}) {
  if(!route||route._blank||!String(route.route||'').trim()||String(route.route||'').startsWith('__blank_'))return false;
  return routeMissingPrimary(route)||routeMissingHelper(route);
}
function flagRouteAssignmentVacant(route={},reason='Driver removed',removedDriver='') {
  if(!route||!String(route.route||'').trim()||String(route.route||'').startsWith('__blank_'))return route;
  route.assignmentStatus='unassigned';route.missingDriver=true;route.vacancyReason=reason||'Driver removed';route.vacatedDriver=removedDriver||route.vacatedDriver||'';route.vacatedAt=new Date().toISOString();
  return route;
}
function clearRouteAssignmentVacancy(route={}) {
  if(!route)return route;
  delete route.assignmentStatus;delete route.missingDriver;delete route.vacancyReason;delete route.vacatedDriver;delete route.vacatedAt;
  return route;
}
function applyDriverCellEdit(route={},value='',reason='Driver manually edited') {
  const previous=canonicalDriverValue(route.driver||''),clean=canonicalDriverEntryValue(value),changed=nameKey(clean)!==nameKey(previous),hasQuestion=morningDriverNames(value).some(name=>String(name).trim()==='?'),helperService=/helper/i.test(`${route.service||''} ${route.wave||''}`);
  route.driver=clean;
  if(!clean){
    if(helperService){route.missingHelper=true;route.vacatedHelper=route.vacatedHelper||'';}
    else flagRouteAssignmentVacant(route,reason);
  } else if(changed&&!hasQuestion){
    clearRouteAssignmentVacancy(route);delete route.missingHelper;delete route.vacatedHelper;
  }
  if(hasQuestion){
    if(helperService||!String(value).trim().startsWith('?'))route.missingHelper=true;
    else flagRouteAssignmentVacant(route,reason);
  }
  return clean;
}
const ROUTE_DATA_PROTECTED_FIELDS=['route','staging','stops','packages','plannedRts','plannedRtsSource','wave','service','pad','padOverride'];
function protectRouteOperationalData(route={},change=()=>{}) {
  const snapshot=Object.fromEntries(ROUTE_DATA_PROTECTED_FIELDS.map(field=>[field,route?.[field]]));
  const result=change();
  ROUTE_DATA_PROTECTED_FIELDS.forEach(field=>{route[field]=snapshot[field];});
  return result;
}
function morningRouteForDriver(routeCode='',driverName='') {
  const matches=(state.morningRoutes||[]).filter(row=>row.route===routeCode&&!isDedicatedHelperMorningRoute(row));
  return matches.find(row=>rosterSwapDriverIndex(morningDriverNames(row.driver),driverName)>=0)||matches[0]||null;
}
function leaveMorningRouteUnassigned(route={},driverName='',reason='Driver removed') {
  if(!route)return null;
  return protectRouteOperationalData(route,()=>{
    const people=morningDriverNames(route.driver);let index=rosterSwapDriverIndex(people,driverName);
    if(index<0&&people.length)index=0;
    if(index<0){flagRouteAssignmentVacant(route,reason,driverName);return {route,removed:driverName||'',helperNames:people};}
    const [removed]=people.splice(index,1);route.driver=people.join(' + ');
    if(index===0||!people.length)flagRouteAssignmentVacant(route,reason,removed||driverName);
    if(index>0){
      route.missingHelper=true;route.vacatedHelper=removed||driverName||'';
      if(route.helperAssignmentKey){const helper=state.scheduleHelpers?.[route.helperAssignmentKey];if(helper&&nameKey(helper.name)===nameKey(removed)){delete helper.matchedDriver;delete helper.matchedRoute;delete helper.matchedRouteUid;delete route.helperAssignmentKey;delete route.helperBag;}}
    }
    if(index===0&&route.helperAssignmentKey&&state.scheduleHelpers?.[route.helperAssignmentKey])state.scheduleHelpers[route.helperAssignmentKey].matchedDriver='';
    return {route,removed:removed||driverName||'',helperNames:people};
  });
}
function morningMessageQueueRows() {
  const routeRows=filteredMorningRows().filter(row=>row.route&&!String(row.route).startsWith('__blank_')&&row.driver&&!routeAssignmentVacant(row)&&!/helper/i.test(String(row.service||''))).flatMap(row=>morningDriverNames(row.driver).map((name,index)=>{
    const driver=contactForMorningDriver(name),queueKey=messageQueueStatusKey(`${row.route}:${nameKey(name)}`);
    return {name:driver?.name||name,driverKey:nameKey(driver?.name||name),phone:driver?.phone||'',route:row.route,wave:row.wave,staging:row.staging,queueKey,status:state.messageQueueStatus[queueKey]||'',source:index?'Helper / Ad hoc':'On route'};
  }));
  const existing=new Set(routeRows.map(row=>nameKey(row.name))),backups=currentScheduleEntries().filter(entry=>scheduleRoleGroup(entry.role)==='driver'&&!existing.has(nameKey(entry.name))&&!rosterDriverUnavailable(entry.name)).map(entry=>{const driver=contactForMorningDriver(entry.name),queueKey=messageQueueStatusKey(`scheduled:${nameKey(entry.name)}`);return {name:driver?.name||entry.name,driverKey:nameKey(driver?.name||entry.name),phone:driver?.phone||'',route:entry.role,wave:entry.start,staging:'Scheduled backup/support',queueKey,status:state.messageQueueStatus[queueKey]||'',source:'Scheduled backup/support'};});
  return [...routeRows,...backups].filter(row=>!state.callOffDriverKeys[callOffStatusKey(row.name)]);
}
function driverTextDraft(driver) {
  const first=String(driver.name||'').trim().split(/\s+/)[0]||'there';
  const templates={
    standup:`Hi ${first}, this is ${state.organizationName} Dispatch. You are scheduled on route ${driver.route||'today'}${driver.wave?` for the ${driver.wave} wave`:''}. Please be at stand-up by 10:25–10:30 AM. Reply YES to confirm.`,
    route:`Hi ${first}, your planned route is ${driver.route||'assigned'}${driver.staging?` with staging at ${driver.staging}`:''}${driver.wave?` for ${driver.wave}`:''}. Please contact Dispatch if anything has changed.`,
    simple:`Hi ${first}, this is ${state.organizationName} Dispatch. Please reply when you receive this message.`
  };
  return templates[state.messageQueueTemplate]||templates.standup;
}
function openDriverText(key='',queueKey='') {
  const driver=teamDriverRows().find(row=>nameKey(row.name)===key);
  if(!driver?.phone)return toast('Import a phone number for this driver first','error');
  const queue=morningMessageQueueRows().find(row=>row.queueKey===queueKey);
  state.pendingDriverText={...driver,...queue,name:driver.name,phone:driver.phone,queueKey,message:driverTextDraft({...driver,...queue})};
  state.modal='text-driver';
  render();
}
function currentDriverTextMessage() {
  return document.getElementById('driver-text-message')?.value.trim()||state.pendingDriverText?.message||'';
}
async function copyAndOpenGoogleMessages() {
  const driver=state.pendingDriverText;if(!driver)return;
  const message=currentDriverTextMessage();
  await navigator.clipboard.writeText(`${driver.phone}\n${message}`);
  if(driver.queueKey){state.messageQueueStatus[driver.queueKey]='prepared';persist();}
  window.open('https://messages.google.com/web/','_blank','noopener');
  toast('Phone and message copied — paste into Google Messages, review, then send');
}
function openDriverSmsApp() {
  const driver=state.pendingDriverText;if(!driver)return;
  if(driver.queueKey){state.messageQueueStatus[driver.queueKey]='prepared';persist();}
  const digits=driver.phone.replace(/\D/g,'');
  location.href=`sms:${digits}?&body=${encodeURIComponent(currentDriverTextMessage())}`;
}
function markQueueMessageSent(queueKey='') {
  if(!queueKey)return;
  state.messageQueueStatus[queueKey]='sent';persist();render();toast('Marked sent — RelayOps will skip this driver');
}
function openNextQueueMessage() {
  const next=morningMessageQueueRows().find(row=>row.phone&&!row.status);
  if(!next)return toast('No unsent drivers with phone numbers remain');
  openDriverText(next.driverKey,next.queueKey);
}
function morningMessageQueueHtml() {
  const rows=morningMessageQueueRows(),sent=rows.filter(row=>row.status==='sent').length,prepared=rows.filter(row=>row.status==='prepared').length,missing=rows.filter(row=>!row.phone).length;
  const options=[['standup','Stand-up reminder · 10:25–10:30'],['route','Route and staging details'],['simple','Simple dispatch check-in']];
  return `<section class="card morning-message-queue"><div class="message-queue-head"><div><span class="eyebrow">MORNING MESSAGE QUEUE</span><h2>Text confirmed drivers faster</h2><p>${rows.length} Morning Sheet driver${rows.length===1?'':'s'} · ${sent} sent · ${prepared} prepared · ${missing} missing phone</p></div><button class="btn primary" data-action="next-message-driver" ${rows.some(row=>row.phone&&!row.status)?'':'disabled'}>${ICONS.phone} Text next driver</button></div><div class="message-template-row"><label><span>Reusable message</span><select data-message-template>${options.map(([value,label])=>`<option value="${value}" ${state.messageQueueTemplate===value?'selected':''}>${label}</option>`).join('')}</select></label><span>RelayOps skips drivers marked sent so duplicate texts are less likely.</span></div><div class="message-queue-list">${rows.length?rows.map(row=>`<div class="message-queue-row ${row.status||(!row.phone?'missing':'')}"><div><strong>${esc(row.name)}</strong><span>${esc(row.route)} · ${esc(row.wave||'No wave')} · ${row.phone?esc(row.phone):'Phone missing'}</span></div><b class="message-status">${row.status==='sent'?'Sent':row.status==='prepared'?'Prepared':row.phone?'Ready':'Missing phone'}</b><div>${row.phone&&row.status!=='sent'?`<button class="btn small" data-action="text-driver" data-driver-key="${esc(row.driverKey)}" data-queue-key="${esc(row.queueKey)}">${row.status==='prepared'?'Review again':'Review text'}</button>`:''}${row.phone&&row.status!=='sent'?`<button class="btn small lime" data-action="mark-message-sent" data-queue-key="${esc(row.queueKey)}">Mark sent</button>`:''}</div></div>`).join(''):'<div class="message-queue-empty">Import and filter the Morning Sheet to build today’s driver message list.</div>'}</div></section>`;
}
function enhanceDriverTextButtons() {
  if(state.page!=='team')return;
  if(!document.querySelector?.('.team-message-column .morning-message-queue'))document.querySelector?.('.team-grid')?.insertAdjacentHTML('beforebegin',morningMessageQueueHtml());
  document.querySelectorAll('.driver-card').forEach(card=>{
    const name=card.querySelector('h3')?.textContent?.trim()||'';
    const driver=teamDriverRows().find(row=>nameKey(row.name)===nameKey(name));
    const button=document.createElement('button');
    button.className='btn small driver-text-button';
    button.dataset.action='text-driver';
    button.dataset.driverKey=nameKey(name);
    button.disabled=!driver?.phone;
    button.innerHTML=`${ICONS.phone}<span>${driver?.phone?'Text driver':'Add phone to text'}</span>`;
    card.querySelector('.driver-phone-line')?.after(button);
  });
}
function scheduleDriverMarkKey(name='') { return `${state.morningOperationDate}|${nameKey(name)}`; }
function dailyRosterIdentityKeys(store={},name='') {
  const prefix=`${state.morningOperationDate}|`,wanted=driverIdentityKey(name);
  if(!wanted)return [];
  return Object.entries(store||{}).filter(([key,value])=>{if(!key.startsWith(prefix))return false;const storedName=value&&typeof value==='object'&&value.name?value.name:key.slice(prefix.length);return driverIdentityKey(storedName)===wanted;}).map(([key])=>key);
}
function deleteDailyRosterIdentity(store={},name='',accept=()=>true) {
  dailyRosterIdentityKeys(store,name).forEach(key=>{if(accept(store[key],key))delete store[key];});
}
function dailyRosterMark(name='') {
  const key=dailyRosterIdentityKeys(state.scheduleDriverMarks,name)[0];return key?state.scheduleDriverMarks[key]:'';
}
function clearPicklistBackupDriver(name='') {
  const wanted=driverIdentityKey(name);if(!wanted)return;
  Object.entries(state.openingPicklistBackupOverrides||{}).forEach(([key,value])=>{if(driverIdentityKey(value)===wanted)delete state.openingPicklistBackupOverrides[key];});
}
function scheduleBackupLabel(role='') { const key=headerKey(role);return key.includes('deliveryassociate')?'VTO 4':'VTO 2'; }
function automaticBackupLabel(role='') { const key=headerKey(role);return key.includes('modifiedduty')?'':key.includes('rescue')?'VTO 2':key.includes('deliveryassociate')?'VTO 4':''; }
function morningRosterDriverKeys() {
  const keys=new Set();(state.morningRoutes||[]).filter(route=>route.dsp===state.dspCode&&route.route&&!String(route.route).startsWith('__blank_')).forEach(route=>morningDriverNames(route.driver).forEach(name=>keys.add(driverIdentityKey(name))));return keys;
}
function automaticUnrosteredBackupRows() {
  const rostered=morningRosterDriverKeys();
  return currentScheduleEntries().filter(entry=>{
    const label=automaticBackupLabel(entry.role);if(scheduleRoleGroup(entry.role)!=='driver'||!label||rostered.has(driverIdentityKey(entry.name)))return false;
    if(dailyRosterMark(entry.name)||dailyRosterIdentityKeys(state.scheduleStayHome,entry.name).length||dailyRosterIdentityKeys(state.scheduleReductions,entry.name).length||dailyRosterIdentityKeys(state.scheduleHelpers,entry.name).length||dailyRosterIdentityKeys(state.callOffDriverKeys,entry.name).length)return false;
    return true;
  }).map(entry=>({...entry,automatic:true,autoReason:'Not rostered for route',vto:automaticBackupLabel(entry.role)}));
}
function currentBackupDriverRows() {
  const scheduled=currentScheduleEntries().filter(entry=>dailyRosterMark(entry.name)==='backup'),records=new Map(rosterStatusRows(state.scheduleBackupRecords,'Backup driver').map(entry=>[driverIdentityKey(entry.name),entry])),byName=new Map(scheduled.map(entry=>{const identity=driverIdentityKey(entry.name),record=records.get(identity)||{};return [identity,{...entry,...record,name:record.name||entry.name}];}));
  records.forEach((entry,key)=>{if(!byName.has(key))byName.set(key,entry);});
  automaticUnrosteredBackupRows().forEach(entry=>{const identity=driverIdentityKey(entry.name);if(!byName.has(identity))byName.set(identity,entry);});
  return [...byName.values()].sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));
}
function rosterDriverUnavailable(name='') {
  return Boolean(dailyRosterIdentityKeys(state.scheduleStayHome,name).length||dailyRosterIdentityKeys(state.scheduleReductions,name).length||dailyRosterIdentityKeys(state.callOffDriverKeys,name).length);
}
function rosterStatusRows(store={},fallbackRole='') {
  return Object.entries(store||{}).filter(([key])=>key.startsWith(`${state.morningOperationDate}|`)).map(([,value])=>({...value,name:value.name,role:value.role||fallbackRole,start:value.start||'',end:value.end||'',route:value.route||''})).sort((a,b)=>a.name.localeCompare(b.name));
}
function rosterRecord(name='',role='',extra={}) {
  const scheduled=currentScheduleEntries().find(entry=>nameKey(entry.name)===nameKey(name))||{};
  return {name,role:role||scheduled.role||'Delivery Associate',start:extra.start||scheduled.start||'',end:extra.end||scheduled.end||'',route:extra.route||'',at:new Date().toISOString()};
}
function rosterSearchHtml(kind='',placeholder='Search driver names') {
  return `<label class="roster-search">${ICONS.search||'⌕'}<input type="search" data-roster-search="${esc(kind)}" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}"></label>`;
}
function rosterDestinationNameHtml(row={},destination='') {
  const label=driverDisplayName(row.name)||row.name,alias=label!==row.name?`<small class="helper-alias-preview">Displays as ${esc(label)}</small>`:'';
  if(row.paycom||!destination)return `<strong>${esc(row.name)}</strong>${alias}`;
  return `<button type="button" class="roster-driver-action-trigger" data-action="open-roster-destination-actions" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role||'')}" data-driver-route="${esc(row.route||'')}" data-driver-start="${esc(row.start||'')}" data-roster-destination="${esc(destination)}" data-roster-automatic="${row.automatic?'true':'false'}" aria-label="Open actions for ${esc(row.name)}"><strong>${esc(row.name)}</strong>${alias}<small>Tap name for actions</small></button>`;
}
function scheduledShiftRowsHtml(rows=[],empty='No scheduled shifts found',options={}) {
  const status=options.status||'',destination=options.destination||status||(options.helperBox?'helper':options.backupBox?'backup':options.allowReduction?'called-off':'');
  return rows.length?rows.map(row=>{
    const mark=dailyRosterMark(row.name),vto=row.vto||scheduleBackupLabel(row.role),data=`data-roster-name="${esc(nameKey(row.name))}"`,stayStats=status==='stay-home'?driverStayHomeStats(row.name):null;
    let actions='';
    if(row.paycom&&isDriverHelperOnlyRole(row.role))actions=`<div class="paycom-driver-actions helper-only-actions"><button class="btn small stay-home-button" data-action="mark-paycom-stay-home" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">Told to stay home</button></div>`;
    else if(row.paycom)actions=`<div class="paycom-driver-actions"><button class="btn small ${mark==='backup'?'vto-button':''}" data-action="mark-paycom-backup" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">${mark==='backup'?esc(vto):'Mark backup'}</button><button class="btn small ${mark==='adhoc'?'lime':''}" data-action="mark-paycom-adhoc" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">${mark==='adhoc'?'Adhoc added':'Mark Adhoc'}</button>${canBecomeHelperRole(row.role)?`<button class="btn small helper-button" data-action="mark-paycom-helper" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">Helper</button>`:''}<button class="btn small stay-home-button" data-action="mark-paycom-stay-home" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">Told to stay home</button><button class="btn small reduction-button" data-action="add-roster-reduction" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}" data-driver-route="${esc(row.route||'')}">Add to Reductions</button></div>`;
    else if(options.helperBox)actions=`<div class="paycom-driver-actions helper-box-actions"><button class="btn small primary" data-action="open-helper-match" data-driver-name="${esc(row.name)}">${row.matchedRoute?`Rematch · ${esc(row.matchedRoute)}`:'Match with Driver'}</button><button class="btn small" data-action="open-driver-alias" data-driver-name="${esc(row.name)}">Short name</button>${row.matchedRoute?`<button class="btn small danger-soft" data-action="unmatch-helper" data-driver-name="${esc(row.name)}">Un-match with Driver</button>`:''}${isDriverHelperOnlyRole(row.role)?`<button class="btn small stay-home-button" data-action="mark-paycom-stay-home" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">Told to stay home</button>`:''}</div>`;
    else if(status)actions=`<div class="paycom-driver-actions"><button class="btn small" data-action="restore-roster-status" data-roster-status="${esc(status)}" data-driver-name="${esc(row.name)}">${status==='reduction'?'Restore original route':'Restore'}</button>${status==='reduction'?`<button class="btn small vto-button" data-action="move-reduction-to-backup" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}">Move to backup drivers · ${esc(vto)}</button>`:''}</div>`;
    else if(options.backupBox&&!row.automatic)actions=`<div class="paycom-driver-actions helper-only-actions"><button class="btn small" data-action="restore-roster-status" data-roster-status="backup" data-driver-name="${esc(row.name)}">Remove from backups</button></div>`;
    else if(options.allowReduction)actions=`<div class="paycom-driver-actions"><button class="btn small reduction-button" data-action="add-roster-reduction" data-driver-name="${esc(row.name)}" data-driver-role="${esc(row.role)}" data-driver-route="${esc(row.route||'')}">Add to Reductions</button></div>`;
    return `<div class="scheduled-shift-row roster-destination-${esc(destination||'scheduled')} ${mark==='backup'||row.automatic?'backup-marked':mark==='adhoc'?'adhoc-marked':''}" ${data}><div>${rosterDestinationNameHtml(row,destination)}<span>${esc(row.role)}${row.automatic?' · Auto backup':''}</span>${stayStats?.count?`<small class="stay-home-fairness">${stayStats.count} time${stayStats.count===1?'':'s'} in the last 14 days</small>`:''}</div><b>${esc(row.start)}${row.end?` - ${esc(row.end)}`:''}</b>${row.route?`<em>${esc(row.route)}</em>`:''}${actions}</div>`;
  }).join(''):`<div class="scheduled-shift-empty">${empty}</div>`;
}
function adhocIdentityKey(name='') { return nameKey(name); }
function legacyAdhocRoute(name='') { return `ADHOC-${nameKey(name).replace(/[^a-z0-9]+/g,'-').toUpperCase()}`; }
function removeDriverAdhocRoute(name='') { const key=adhocIdentityKey(name),legacy=legacyAdhocRoute(name);state.morningRoutes=state.morningRoutes.filter(row=>row.adhocKey!==key&&row.route!==legacy); }
function reconcileDailyRosterFlags(name='',keep='') {
  clearPicklistBackupDriver(name);
  const marks=dailyRosterIdentityKeys(state.scheduleDriverMarks,name).map(key=>state.scheduleDriverMarks[key]);
  if(marks.includes('adhoc')&&keep!=='adhoc')removeDriverAdhocRoute(name);
  deleteDailyRosterIdentity(state.scheduleDriverMarks,name);
  deleteDailyRosterIdentity(state.scheduleBackupRecords,name);
  deleteDailyRosterIdentity(state.scheduleStayHome,name);
  deleteDailyRosterIdentity(state.scheduleReductions,name);
  dailyRosterIdentityKeys(state.callOffDriverKeys,name).forEach(key=>{delete state.callOffDriverKeys[key];delete state.callOffReasons[key];});
  if(keep!=='helper'&&dailyRosterIdentityKeys(state.scheduleHelpers,name).length){
    const helperKeys=dailyRosterIdentityKeys(state.scheduleHelpers,name);removeHelperFromMatchedDriver(name);helperKeys.forEach(key=>delete state.scheduleHelpers[key]);
    state.morningRoutes=state.morningRoutes.filter(row=>!(helperKeys.includes(row.helperAssignmentKey)&&/helper/i.test(`${row.service||''} ${row.wave||''}`)));
  }
}
function markPaycomBackup(name='',role='') {
  const key=scheduleDriverMarkKey(name),current=dailyRosterMark(name);
  if(current!=='backup'){reconcileDailyRosterFlags(name,'backup');state.scheduleDriverMarks[key]='backup';state.scheduleBackupRecords[key]=rosterRecord(contactForMorningDriver(name)?.name||name,role);}
  else {delete state.scheduleDriverMarks[key];delete state.scheduleBackupRecords[key];}
  removeDriverAdhocRoute(name);persist();render();toast(state.scheduleDriverMarks[key]?`${name} marked ${scheduleBackupLabel(role)}`:`${name} backup mark cleared`);
}
function markPaycomAdhoc(name='',role='') {
  const key=scheduleDriverMarkKey(name),adhocKey=adhocIdentityKey(name),legacy=legacyAdhocRoute(name),current=state.scheduleDriverMarks[key];
  if(current==='adhoc'){delete state.scheduleDriverMarks[key];removeDriverAdhocRoute(name);persist();render();return toast(`${name} removed from Adhoc`);}
  reconcileDailyRosterFlags(name,'adhoc');state.scheduleDriverMarks[key]='adhoc';state.openingPicklistShowAdhoc=true;let route=state.morningRoutes.find(row=>row.adhocKey===adhocKey||row.route===legacy);if(!route)route=createManualMorningRoute({route:'AX',wave:'Ad hoc'});route.route='AX';route.adhocKey=adhocKey;route.driver=contactForMorningDriver(name)?.name||name;route.service=role||'Adhoc';
  persist();render();toast(`${name} added to the Morning Sheet as Adhoc`);
}
function markPaycomStayHome(name='',role='') {
  const key=scheduleDriverMarkKey(name);
  reconcileDailyRosterFlags(name,'stay-home');const record=rosterRecord(contactForMorningDriver(name)?.name||name,role,{date:state.morningOperationDate});record.date=state.morningOperationDate;state.scheduleStayHome[key]=record;state.scheduleStayHomeHistory[key]={...(state.scheduleStayHomeHistory[key]||{}),...record,date:state.morningOperationDate};removeDriverAdhocRoute(name);persist();render();toast(`${name} moved to Told To Stay Home · ${driverStayHomeStats(name).count} time${driverStayHomeStats(name).count===1?'':'s'} in 14 days`);
}
function addRosterReduction(name='',role='',route='',start='') {
  const key=scheduleDriverMarkKey(name),morningRoute=morningRouteForDriver(route,name);
  if(morningRoute)leaveMorningRouteUnassigned(morningRoute,name,'Route reduction');
  reconcileDailyRosterFlags(name,'reduction');
  state.scheduleReductions[key]={...rosterRecord(name,role,{route,start}),originalRoute:morningRoute?.route||route,routeUid:morningRoute?.routeUid||''};
  // Reconciliation removes a driver-created Adhoc row. When that row is the
  // actual route being reduced, keep the now-empty route as a visible vacancy.
  if(morningRoute&&!state.morningRoutes.includes(morningRoute))state.morningRoutes.push(morningRoute);
  if(!morningRoute)removeDriverAdhocRoute(name);
  persist();render();toast(morningRoute?`${name} moved to Reductions · ${route} is now unassigned`:`${name} added to Reductions`);
}
function reductionOriginalMorningRoute(record={}) {
  const uid=String(record.routeUid||'').trim(),routeCode=String(record.originalRoute||record.route||'').trim();
  return (uid&&state.morningRoutes.find(route=>route.routeUid===uid))||state.morningRoutes.find(route=>routeCode&&route.route===routeCode)||null;
}
function restoreReductionToOriginalRoute(name='') {
  const key=scheduleDriverMarkKey(name),record=state.scheduleReductions[key];
  if(!record)return false;
  const routeCode=String(record.originalRoute||record.route||'').trim();
  if(!routeCode){delete state.scheduleReductions[key];persist();render();toast(`${name} returned to the PAYCOM list`);return true;}
  const route=reductionOriginalMorningRoute(record);
  if(!route){toast(`Original route ${routeCode} is no longer on the Morning Sheet. ${name} will stay in Reductions until moved elsewhere.`,'error');return false;}
  const exactName=contactForMorningDriver(record.name||name)?.name||record.name||name,people=morningDriverNames(route.driver),alreadyAssigned=people.some(person=>nameKey(person)===nameKey(exactName));
  if(!routeMissingPrimary(route)&&!alreadyAssigned){const assignedDriver=people[0]||'another driver';toast(`Route was given to another driver. ${routeCode} is assigned to ${assignedDriver}. ${exactName} will stay in Reductions until moved elsewhere.`,'error');return false;}
  protectRouteOperationalData(route,()=>{
    if(!alreadyAssigned)route.driver=[exactName,...people.filter(person=>nameKey(person)!==nameKey(exactName))].filter(Boolean).join(' + ');
    clearRouteAssignmentVacancy(route);
  });
  reconcileDailyRosterFlags(exactName,'on-route');delete state.scheduleReductions[key];persist();render();toast(`${exactName} restored to original route ${routeCode}`);return true;
}
function restoreRosterStatus(name='',status='') {
  const exactName=contactForMorningDriver(name)?.name||name,key=scheduleDriverMarkKey(exactName);if(status==='reduction')return restoreReductionToOriginalRoute(name);
  if(status==='stay-home'||status==='backup'){
    reconcileDailyRosterFlags(exactName,'paycom');
    // Explicitly suppress the automatic unrostered-backup rule. Without this,
    // Restore removed the old row and immediately recreated the same driver.
    state.scheduleDriverMarks[key]='paycom';
  }
  persist();render();toast(`${exactName} returned to the PAYCOM list`);return true;
}
function moveReductionToBackup(name='',role='') {
  const key=scheduleDriverMarkKey(name),record=state.scheduleReductions[key]||rosterRecord(name,role);reconcileDailyRosterFlags(name,'backup');state.scheduleDriverMarks[key]='backup';state.scheduleBackupRecords[key]={...record,role:role||record.role||'Delivery Associate'};removeDriverAdhocRoute(name);persist();render();toast(`${record.name||name} moved to Backup drivers as ${scheduleBackupLabel(role||record.role)}`);
}
function openRosterDestinationActions(name='',role='',destination='',route='',start='',automatic=false) {
  state.pendingRosterDestination={name:contactForMorningDriver(name)?.name||name,role:role||'',destination:destination||'',route:route||'',start:start||'',automatic:automatic===true||automatic==='true'};
  state.modal='roster-destination';render();
}
function setRosterBackupState(name='',role='',label='') {
  const exactName=contactForMorningDriver(name)?.name||name,key=scheduleDriverMarkKey(exactName),record=rosterRecord(exactName,role),vto=label||scheduleBackupLabel(role||record.role);
  reconcileDailyRosterFlags(exactName,'backup');state.scheduleDriverMarks[key]='backup';state.scheduleBackupRecords[key]={...record,originalRole:role||record.role||'',vto};removeDriverAdhocRoute(exactName);
  return {name:exactName,role:role||record.role||'Delivery Associate',vto};
}
function moveRosterDriverToVto(name='',role='',label='VTO 2') {
  const backup=setRosterBackupState(name,role,label);persist();render();toast(`${backup.name} moved to ${backup.vto}`);
}
function restoreCalledOffToPaycom(name='') {
  const exactName=contactForMorningDriver(name)?.name||name;reconcileDailyRosterFlags(exactName,'paycom');state.scheduleDriverMarks[scheduleDriverMarkKey(exactName)]='paycom';persist();render();toast(`${exactName} returned to the PAYCOM list`);
}
function applyRosterDestinationAction(target='') {
  const pending=state.pendingRosterDestination;if(!pending)return false;
  state.pendingRosterDestination=null;state.modal=null;
  if(target==='swap-to-route')return openVtoRouteSwap(pending.name,pending.role,pending.destination);
  if(target==='vto2')return moveRosterDriverToVto(pending.name,pending.role,'VTO 2');
  if(target==='vto4')return moveRosterDriverToVto(pending.name,pending.role,'VTO 4');
  if(target==='adhoc')return markPaycomAdhoc(pending.name,pending.role);
  if(target==='helper')return markPaycomHelper(pending.name,pending.role);
  if(target==='helper-match')return openHelperMatch(pending.name);
  if(target==='helper-unmatch')return unmatchHelper(pending.name);
  if(target==='stay-home')return markPaycomStayHome(pending.name,pending.role);
  if(target==='reduction')return addRosterReduction(pending.name,pending.role,pending.route,pending.start);
  if(target==='calloff')return openRosterSwap(pending.route,pending.name,'calloff',pending.name);
  if(target==='swap')return openRosterSwap(pending.route,pending.name,'swap',pending.name);
  if(target==='return') {
    if(pending.destination==='stay-home')return restoreRosterStatus(pending.name,'stay-home');
    if(pending.destination==='reduction')return restoreRosterStatus(pending.name,'reduction');
    if(pending.destination==='called-off')return restoreCalledOffToPaycom(pending.name);
    if(pending.destination==='helper')return markPaycomHelper(pending.name,pending.role);
    if(pending.destination==='vto2'||pending.destination==='vto4'||pending.destination==='backup')return restoreRosterStatus(pending.name,'backup');
  }
  render();return false;
}
function markRosterCalledOff(name='',role='') {
  const exactName=contactForMorningDriver(name)?.name||name,key=callOffStatusKey(exactName);
  reconcileDailyRosterFlags(exactName,'calloff');state.callOffDriverKeys[key]={...rosterRecord(exactName,role),name:exactName,route:'',at:new Date().toISOString()};state.callOffReasons[key]=state.callOffReasons[key]||'';
  persist();render();toast(`${exactName} moved to Called off today`);return true;
}
function applyPicklistVtoAction(name='',role='',target='') {
  const exactName=contactForMorningDriver(name)?.name||name;
  if(!exactName)return false;
  if(target==='return')return restoreRosterStatus(exactName,'backup');
  if(target==='calloff')return markRosterCalledOff(exactName,role);
  if(target==='reduction')return addRosterReduction(exactName,role);
  if(target==='stay-home')return markPaycomStayHome(exactName,role);
  if(target==='vto2')return moveRosterDriverToVto(exactName,role,'VTO 2');
  if(target==='vto4')return moveRosterDriverToVto(exactName,role,'VTO 4');
  if(target==='helper')return markPaycomHelper(exactName,role);
  if(target==='adhoc')return markPaycomAdhoc(exactName,role);
  return false;
}
function waveNameForTime(time='') { if(/^ad\s*hoc/i.test(String(time)))return 'ADHOC';const waves=morningWaveList().filter(wave=>!/^ad\s*hoc/i.test(String(wave)));const index=waves.indexOf(time);return index>=0?`WAVE ${index+1}`:'WAVE'; }
function routeDriverRowsHtml(rows=[]) {
  return rows.length?rows.map(row=>row.vacant?`<div class="scheduled-shift-row route-driver-row route-vacancy-row" data-roster-name="unassigned"><div><strong>? · Unassigned driver</strong><span>${esc(row.route)}${row.helperNames?.length?` · Helper remains: ${esc(row.helperNames.join(' + '))}`:''}</span></div><b>${esc(waveNameForTime(row.start))} · ${esc(row.start)}</b><div class="route-swap-actions"><button class="btn small danger" data-action="open-route-swap" data-swap-mode="vacancy" data-route="${esc(row.route)}" data-driver-name="" data-driver-label="Unassigned driver">Assign driver</button></div></div>`:`<div class="scheduled-shift-row route-driver-row ${row.helperMissing?'route-vacancy-row':''}" data-roster-name="${esc(nameKey(row.name))}"><div>${rosterDestinationNameHtml({...row,name:row.sourceName||row.name},'route')}<span>${esc(row.route)}${row.helperMissing?' · Helper missing':''}</span></div><b>${esc(waveNameForTime(row.start))} · ${esc(row.start)}</b><div class="route-swap-actions"><button class="btn small danger-soft" data-action="open-route-swap" data-swap-mode="calloff" data-route="${esc(row.route)}" data-driver-name="${esc(row.sourceName||row.name)}" data-driver-label="${esc(row.name)}">Call off & swap</button><button class="btn small" data-action="open-route-swap" data-swap-mode="swap" data-route="${esc(row.route)}" data-driver-name="${esc(row.sourceName||row.name)}" data-driver-label="${esc(row.name)}">Swap off route</button><button class="btn small reduction-button" data-action="add-roster-reduction" data-driver-name="${esc(row.sourceName||row.name)}" data-driver-role="${esc(row.role)}" data-driver-route="${esc(row.route)}" data-driver-start="${esc(row.start)}">Add to Reductions</button></div></div>`).join(''):'<div class="scheduled-shift-empty">Fill the Morning Sheet to see route drivers.</div>';
}
function filteredScheduledDrivers(rows=[]) {
  const filter=state.scheduleFilter;if(filter==='all')return rows;
  if(filter==='on-route')return rows.filter(row=>row.route==='On morning sheet');
  if(filter==='not-rostered')return rows.filter(row=>row.route==='Not rostered for route');
  if(filter==='modifiedduty')return rows.filter(row=>headerKey(row.role).includes('modifiedduty'));
  if(filter==='rescue'||filter==='deliveryassociate')return rows.filter(row=>!headerKey(row.role).includes('modifiedduty')&&headerKey(row.role).includes(filter));
  return rows.filter(row=>headerKey(row.role).includes(filter));
}
function openingRosterMarkedDrivers({scheduled=[],onRoute=[],backups=[],stayHome=[],reductions=[],calledOff=[],helpers=[]}={}) {
  const rows=new Map(),scheduledByIdentity=new Map(scheduled.map(row=>[driverIdentityKey(row.name),row]));
  const add=(row={},statusKey='',statusLabel='',destination='',detail='')=>{
    const identity=driverIdentityKey(row.name);if(!identity)return;
    const scheduledRow=scheduledByIdentity.get(identity)||{},previous=rows.get(identity),priority={route:1,adhoc:2,helper:3,vto2:4,vto4:4,'stay-home':5,reduction:6,'called-off':7}[statusKey]||0;
    if(previous&&previous.priority>priority)return;
    rows.set(identity,{...scheduledRow,...row,name:scheduledRow.name||row.name,role:scheduledRow.role||row.role||'Delivery Associate',start:scheduledRow.start||row.start||'',end:scheduledRow.end||row.end||'',route:row.route||scheduledRow.route||'',statusKey,statusLabel,destination,detail,priority});
  };
  onRoute.filter(row=>!row.vacant&&row.name&&row.name!=='Unassigned driver').forEach(row=>{
    const adhoc=/ad\s*hoc/i.test(String(row.start||''))||String(row.route||'').toUpperCase()==='AX';
    add(row,adhoc?'adhoc':'route',adhoc?'Adhoc':'On Route',adhoc?'adhoc':'route',row.route?`${row.route}${row.start?` · ${row.start}`:''}`:row.start||'');
  });
  helpers.forEach(row=>add(row,'helper','Helper','helper',row.matchedRoute?`Matched to ${row.matchedRoute}`:'Helper box'));
  backups.forEach(row=>{const label=row.vto||scheduleBackupLabel(row.role),key=label==='VTO 4'?'vto4':'vto2';add(row,key,label,key,row.automatic?'Auto backup':'Backup driver');});
  stayHome.forEach(row=>add(row,'stay-home','Told To Stay Home','stay-home','Removed from today\'s active roster'));
  reductions.forEach(row=>add(row,'reduction','Reduction','reduction',row.originalRoute||row.route||'Amazon route reduction'));
  calledOff.forEach(row=>add(row,'called-off','Called Off','called-off',row.route||'Called off today'));
  return [...rows.values()].sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));
}
function markedDriverRowsHtml(rows=[]) {
  return rows.length?rows.map(row=>`<div class="scheduled-shift-row marked-driver-row marked-driver-${esc(row.statusKey)}" data-roster-name="${esc(nameKey(row.name))}"><div>${rosterDestinationNameHtml(row,row.destination)}<span>${esc(row.role)}${row.start?` · ${esc(row.start)}`:''}</span></div><b class="marked-driver-status">${esc(row.statusLabel)}</b>${row.detail?`<em>${esc(row.detail)}</em>`:''}</div>`).join(''):'<div class="scheduled-shift-empty">No drivers have been marked yet.</div>';
}
function openingPaycomInnerTabsHtml(active='scheduled',scheduledCount=0,markedCount=0) {
  return `<div class="paycom-inner-tabs" role="tablist" aria-label="PAYCOM driver views"><button type="button" class="paycom-inner-tab ${active==='scheduled'?'active':''}" role="tab" aria-selected="${active==='scheduled'}" data-action="opening-paycom-tab" data-paycom-tab="scheduled"><span>All Scheduled</span><b>${scheduledCount}</b></button><button type="button" class="paycom-inner-tab ${active==='marked'?'active':''}" role="tab" aria-selected="${active==='marked'}" data-action="opening-paycom-tab" data-paycom-tab="marked"><span>Marked Drivers</span><b>${markedCount}</b></button></div>`;
}
function openingRosterScheduleHtml() {
  const morning=filteredMorningRows().filter(row=>row.route&&!String(row.route).startsWith('__blank_')&&!/helper/i.test(String(row.service||''))),onRoute=morning.flatMap(row=>routeMissingPrimary(row)?[{name:'Unassigned driver',sourceName:row.vacatedDriver||'',role:'Delivery Associate',start:row.wave||'',end:'',route:row.route,vacant:true,helperNames:morningDriverNames(row.driver)}]:morningDriverNames(row.driver).map((name,index)=>({name:contactForMorningDriver(name)?.name||name,sourceName:name,role:'Delivery Associate',start:row.wave||'',end:'',route:row.route,helperMissing:index===0&&routeMissingHelper(row)})));
  const routeNames=new Set(onRoute.map(row=>nameKey(row.name))),schedule=currentScheduleEntries(),driverShifts=schedule.filter(entry=>scheduleRoleGroup(entry.role)==='driver'),helpers=helperRosterRows(),allScheduledDrivers=driverShifts.map(entry=>({...entry,paycom:true,route:routeNames.has(nameKey(entry.name))?'On morning sheet':'Not rostered for route'}));
  const backupDrivers=currentBackupDriverRows(),vto2Drivers=backupDrivers.filter(row=>(row.vto||scheduleBackupLabel(row.role))==='VTO 2'),vto4Drivers=backupDrivers.filter(row=>(row.vto||scheduleBackupLabel(row.role))==='VTO 4'),stayHome=rosterStatusRows(state.scheduleStayHome,'Told to stay home'),reductions=rosterStatusRows(state.scheduleReductions,'Route reduction'),scheduledDrivers=filteredScheduledDrivers(allScheduledDrivers),dispatch=schedule.filter(entry=>scheduleRoleGroup(entry.role)==='dispatch'),other=schedule.filter(entry=>scheduleRoleGroup(entry.role)==='other'||headerKey(entry.role).includes('modifiedduty')),filters=[['all','All shifts'],['deliveryassociate','Delivery Associate'],['rescue','Rescue'],['midshift','Midshift'],['modifiedduty','Modified duty'],['on-route','On morning sheet'],['not-rostered','Not rostered for route']],calledOff=Object.entries(state.callOffDriverKeys||{}).filter(([key])=>key.startsWith(`${state.morningOperationDate}|`)).map(([,value])=>({name:value.name,role:value.role||'Called off',start:value.start||'',end:value.end||'',route:value.route||''})),stayHomeWindow=stayHomeWindowEntries(),paycomTab=state.openingRosterPaycomTab==='marked'?'marked':'scheduled',markedDrivers=openingRosterMarkedDrivers({scheduled:allScheduledDrivers,onRoute,backups:backupDrivers,stayHome,reductions,calledOff,helpers}),paycomList=paycomTab==='marked'?markedDriverRowsHtml(markedDrivers):scheduledShiftRowsHtml(scheduledDrivers,'No Paycom shifts match this filter.'),paycomSearch=paycomTab==='marked'?'Search marked drivers':'Search all scheduled drivers';
  return `<section class="opening-schedule-board"><div class="opening-schedule-head"><div><span class="eyebrow">TODAY'S OPENING TEAM</span><h2>Routes and scheduled shifts</h2><p>${state.scheduleImportName?`Paycom file: ${esc(state.scheduleImportName)}`:'Upload Paycom inside the green Paycom panel below.'}</p></div></div><div class="opening-schedule-grid">
    <article class="card scheduled-section route scroll-roster"><div class="scheduled-section-head"><h3>Drivers on route</h3><b>${onRoute.length}</b></div><div class="scheduled-list">${routeDriverRowsHtml(onRoute)}</div></article>
    <article class="card scheduled-section helper-roster scroll-roster"><div class="scheduled-section-head"><div><h3>Helpers</h3><span>Match helpers to Wave 1 or Wave 2</span></div><b>${helpers.length}</b></div><div class="scheduled-list">${scheduledShiftRowsHtml(helpers,'No Driver Helper shifts or helper assignments found.',{helperBox:true,destination:'helper'})}</div></article>
    <article class="card scheduled-section backup scroll-roster paycom-roster-card"><div class="scheduled-section-head paycom-head"><div><h3>All Scheduled driver shifts (PAYCOM)</h3><span>${paycomTab==='scheduled'?`${scheduledDrivers.length} shown of ${allScheduledDrivers.length} scheduled · ${markedDrivers.length} marked`:`${markedDrivers.length} marked drivers`} · the complete imported list stays intact</span></div><div class="paycom-head-tools"><a class="btn small paycom-login-link" href="https://www.paycomonline.net/v4/cl/ta-schdisplaydash.php?outputtype=GRID&amp;la=&amp;session_nonce=f0ff47b9e9bb75cf8596eb08db2dd3ba" target="_blank" rel="noopener">Open Paycom login</a><select data-schedule-filter ${paycomTab==='marked'?'disabled aria-label="Switch to All Scheduled to filter shifts"':''}>${filters.map(([value,label])=>`<option value="${value}" ${state.scheduleFilter===value?'selected':''}>${label}</option>`).join('')}</select><button class="btn small primary" data-action="schedule-import">${ICONS.upload} Import Paycom</button></div></div>${openingPaycomInnerTabsHtml(paycomTab,allScheduledDrivers.length,markedDrivers.length)}<div class="paycom-inner-pane" role="tabpanel" data-paycom-pane="${esc(paycomTab)}">${rosterSearchHtml(`paycom-${paycomTab}`,paycomSearch)}<div class="scheduled-list paycom-tab-list" data-roster-list="paycom-${esc(paycomTab)}">${paycomList}</div></div></article>
    <article class="card scheduled-section called-off scroll-roster"><div class="scheduled-section-head"><h3>Called off today</h3><b>${calledOff.length}</b></div>${rosterSearchHtml('called-off','Search called-off drivers')}<div class="scheduled-list" data-roster-list="called-off">${scheduledShiftRowsHtml(calledOff,'No drivers have been marked called off.',{allowReduction:true,destination:'called-off'})}</div></article>
    <article class="card scheduled-section stay-home scroll-roster"><div class="scheduled-section-head"><div><h3>Told To Stay Home</h3><span>${stayHomeWindow.length} decision${stayHomeWindow.length===1?'':'s'} saved in the last 14 days</span></div><b>${stayHome.length}</b></div>${rosterSearchHtml('stay-home','Search stay-home drivers')}<div class="scheduled-list" data-roster-list="stay-home">${scheduledShiftRowsHtml(stayHome,'No drivers have been told to stay home.',{status:'stay-home',destination:'stay-home'})}</div></article>
    <article class="card scheduled-section reductions scroll-roster"><div class="scheduled-section-head"><h3>Reductions</h3><b>${reductions.length}</b></div>${rosterSearchHtml('reductions','Search route reductions')}<div class="scheduled-list" data-roster-list="reductions">${scheduledShiftRowsHtml(reductions,'No Amazon route reductions added.',{status:'reduction',destination:'reduction'})}</div></article>
    <article class="card scheduled-section dispatch"><div class="scheduled-section-head"><h3>Dispatcher shifts</h3><b>${dispatch.length}</b></div>${scheduledShiftRowsHtml(dispatch,'No opening, fleet, or closing dispatcher shifts found.',{destination:'dispatch'})}</article>
    <article class="card scheduled-section other"><div class="scheduled-section-head"><h3>Other scheduled shifts</h3><b>${other.length}</b></div>${scheduledShiftRowsHtml(other,'No uncategorized or modified-duty shifts found.',{destination:'other'})}</article>
    <article class="card scheduled-section vto-destination vto2-destination roster-bottom-destination scroll-roster" aria-label="Backup drivers VTO 2"><div class="scheduled-section-head"><div><h3>VTO 2 · Rescue backups</h3><span>${vto2Drivers.length} backups · unrostered Rescue shifts are added automatically</span></div><b>VTO 2 · ${vto2Drivers.length}</b></div><div class="scheduled-list">${scheduledShiftRowsHtml(vto2Drivers,'No VTO 2 Rescue backups.',{backupBox:true,destination:'vto2'})}</div></article>
    <article class="card scheduled-section vto-destination vto4-destination roster-bottom-destination scroll-roster"><div class="scheduled-section-head"><div><h3>VTO 4 · Delivery Associate backups</h3><span>${vto4Drivers.length} backups · unrostered Delivery Associate shifts are added automatically</span></div><b>VTO 4 · ${vto4Drivers.length}</b></div><div class="scheduled-list">${scheduledShiftRowsHtml(vto4Drivers,'No VTO 4 Delivery Associate backups.',{backupBox:true,destination:'vto4'})}</div></article>
  </div></section>`;
}
function enhanceOpeningRoster() {
  if(state.page!=='roster')return;
  const table=document.querySelector?.('.content .table-card');
  table?.insertAdjacentHTML('beforebegin',openingRosterScheduleHtml());
  document.querySelectorAll?.('.vto-button').forEach(button=>button.classList.add(button.textContent.includes('VTO 4')?'vto-4':'vto-2'));
}
function enhanceMorningParkingAssignment() {
  // Parking-order assignment is rendered in the Morning Tools form so its
  // location stays predictable on desktop and mobile.
}
function rosterSwapCandidates(currentName='') {
  const onRoute=new Set(filteredMorningRows().flatMap(row=>morningDriverNames(row.driver)).map(nameKey));
  return [...new Set(currentScheduleEntries().filter(entry=>scheduleRoleGroup(entry.role)==='driver').map(entry=>entry.name))].filter(name=>nameKey(name)!==nameKey(currentName)&&!onRoute.has(nameKey(name))&&!rosterDriverUnavailable(name)).sort((a,b)=>a.localeCompare(b));
}
function isDedicatedHelperMorningRoute(row={}) { return headerKey(row.route)==='helper'||headerKey(row.wave)==='helper'||headerKey(row.service)==='driverhelper'; }
function vtoRouteSwapCandidates(incomingName='') {
  ensureMorningRouteUids();
  return (state.morningRoutes||[]).filter(row=>row.dsp===state.dspCode&&row.route&&!String(row.route).startsWith('__blank_')&&!isDedicatedHelperMorningRoute(row)&&!isExplicitAdhocMorningRoute(row)&&!routeMissingPrimary(row)).map(row=>({routeUid:row.routeUid,route:row.route,wave:row.wave||'',driver:contactForMorningDriver(morningDriverNames(row.driver)[0])?.name||morningDriverNames(row.driver)[0]||''})).filter(row=>row.driver&&driverIdentityKey(row.driver)!==driverIdentityKey(incomingName)).sort((a,b)=>waveMinutes(a.wave)-waveMinutes(b.wave)||String(a.route).localeCompare(String(b.route)));
}
function vtoLabelFromOrigin(origin='',role='') {
  const normalized=headerKey(origin);return normalized==='vto2'?'VTO 2':normalized==='vto4'?'VTO 4':/^VTO\s+[24]$/i.test(String(origin||'').trim())?String(origin).trim().toUpperCase():scheduleBackupLabel(role);
}
function openVtoRouteSwap(name='',role='',origin='') {
  const exactName=contactForMorningDriver(name)?.name||name;if(!exactName)return false;
  const candidates=vtoRouteSwapCandidates(exactName);if(!candidates.length){toast('No assigned routes are available to swap','error');return false;}
  state.pendingVtoRouteSwap={name:exactName,role:role||'',vtoLabel:vtoLabelFromOrigin(origin,role)};state.pendingRosterDestination=null;state.modal='vto-route-swap';render();return true;
}
function performVtoRouteSwap(routeUid='') {
  const pending=state.pendingVtoRouteSwap,route=morningRouteByUid(routeUid);if(!pending)return {ok:false,error:'Choose a VTO driver first'};
  if(!route||route.dsp!==state.dspCode||routeMissingPrimary(route)||isDedicatedHelperMorningRoute(route)||isExplicitAdhocMorningRoute(route))return {ok:false,error:'That route is no longer available'};
  const people=morningDriverNames(route.driver),outgoingRaw=people[0]||'',incoming=contactForMorningDriver(pending.name)?.name||pending.name,outgoing=contactForMorningDriver(outgoingRaw)?.name||outgoingRaw;
  if(!outgoing||driverIdentityKey(outgoing)===driverIdentityKey(incoming))return {ok:false,error:'Choose a different route driver'};
  const scheduled=currentScheduleEntries().find(entry=>driverIdentityKey(entry.name)===driverIdentityKey(outgoing)),outgoingRole=scheduled?.role||'Delivery Associate',outgoingVto=scheduleBackupLabel(outgoingRole);
  const applied=protectRouteOperationalData(route,()=>{people[0]=incoming;route.driver=people.join(' + ');clearRouteAssignmentVacancy(route);return true;});
  if(!applied)return {ok:false,error:'The route swap could not be completed'};
  reconcileDailyRosterFlags(incoming,'on-route');setRosterBackupState(outgoing,outgoingRole,outgoingVto);
  return {ok:true,incoming,outgoing,outgoingVto,route:route.route,wave:route.wave};
}
function applyVtoRouteSwap() {
  const routeUid=document.getElementById('vto-route-swap-target')?.value||'',result=performVtoRouteSwap(routeUid);if(!result.ok)return toast(result.error,'error');
  state.pendingVtoRouteSwap=null;state.modal=null;persist();render();toast(`${result.incoming} took ${result.route} · ${result.outgoing} moved to ${result.outgoingVto}`);return true;
}
function openRosterSwap(route='',driverName='',mode='swap',driverLabel='') { state.pendingRosterSwap={route,driverName,driverLabel:driverLabel||driverName,mode};state.modal='roster-swap';render(); }
function rosterSwapDriverIndex(people=[],target='') {
  const targetKey=nameKey(target),targetCanonical=nameKey(contactForMorningDriver(target)?.name||target);
  return people.findIndex(name=>{const key=nameKey(name),canonical=nameKey(contactForMorningDriver(name)?.name||name);return key===targetKey||canonical===targetKey||key===targetCanonical||canonical===targetCanonical;});
}
function applyRosterSwap() {
  const swap=state.pendingRosterSwap,replacement=document.getElementById('roster-swap-replacement')?.value;if(!swap||!replacement)return toast('Choose the replacement driver','error');
  const route=morningRouteForDriver(swap.route,swap.driverName)||state.morningRoutes.find(row=>row.route===swap.route);if(!route)return toast('Morning Sheet route was not found','error');
  const people=morningDriverNames(route.driver),exactReplacement=contactForMorningDriver(replacement)?.name||replacement,isVacancy=swap.mode==='vacancy'||routeMissingPrimary(route);let index=rosterSwapDriverIndex(people,swap.driverName);
  const applied=protectRouteOperationalData(route,()=>{
    if(isVacancy){if(!people.some(person=>nameKey(person)===nameKey(exactReplacement)))people.unshift(exactReplacement);}
    else {if(index<0)index=rosterSwapDriverIndex(people,swap.driverLabel);if(index<0&&people.length)index=0;if(index<0)return false;people[index]=exactReplacement;if(index>0){delete route.missingHelper;delete route.vacatedHelper;}}
    route.driver=people.join(' + ');clearRouteAssignmentVacancy(route);return true;
  });
  if(!applied)return toast('Driver is no longer assigned to that route','error');
  reconcileDailyRosterFlags(replacement,'on-route');
  const calledOffName=swap.driverLabel||contactForMorningDriver(swap.driverName)?.name||swap.driverName;
  if(swap.mode==='calloff'){reconcileDailyRosterFlags(calledOffName,'calloff');state.callOffDriverKeys[callOffStatusKey(calledOffName)]={name:calledOffName,route:swap.route,at:new Date().toISOString()};}
  state.pendingRosterSwap=null;state.modal=null;persist();render();toast(`${calledOffName} replaced by ${replacement} on ${swap.route}`);
}
function leaveRosterRouteUnassigned() {
  const swap=state.pendingRosterSwap;if(!swap)return;
  const route=morningRouteForDriver(swap.route,swap.driverName)||state.morningRoutes.find(row=>row.route===swap.route);if(!route)return toast('Morning Sheet route was not found','error');
  const result=leaveMorningRouteUnassigned(route,swap.driverName||swap.driverLabel,'Driver swapped off route'),removed=result?.removed||swap.driverLabel||swap.driverName;
  state.pendingRosterSwap=null;state.modal=null;persist();render();toast(`${removed||'Driver'} removed · ${swap.route} is highlighted as unassigned`);
}

function routeContextDriverRole(name='') {
  const scheduled=currentScheduleEntries().find(entry=>driverIdentityKey(entry.name)===driverIdentityKey(name));
  const team=teamDriverRows().find(entry=>driverIdentityKey(entry.name)===driverIdentityKey(name));
  return scheduled?.role||team?.role||'Delivery Associate';
}
function closeDriverRouteContextMenu() { document.getElementById?.('driver-route-context-menu')?.remove?.(); }
function closeDriverRouteContextOnOutside(event) {
  const menu=document.getElementById?.('driver-route-context-menu');
  if(menu&&!menu.contains?.(event?.target))closeDriverRouteContextMenu();
}
function closeDriverRouteContextOnKey(event) { if(event?.key==='Escape')closeDriverRouteContextMenu(); }
function closeDriverRouteContextOnScroll(event) {
  const menu=document.getElementById?.('driver-route-context-menu');
  if(menu&&!menu.contains?.(event?.target))closeDriverRouteContextMenu();
}
function driverRouteContextRoute(source) {
  const uid=source?.dataset?.viewUid||source?.dataset?.picklistRouteUid||'';
  if(uid)return morningRouteByUid(uid);
  const code=source?.dataset?.viewRoute||'';
  return (state.morningRoutes||[]).find(route=>route.route===code)||null;
}
function openDriverRouteContextMenu(event,source) {
  const route=driverRouteContextRoute(source),people=morningDriverNames(route?.driver).filter(name=>name&&name!=='?');
  if(!route||!route.routeUid||!people.length||route._blank||String(route.route||'').startsWith('__blank_'))return;
  event?.preventDefault?.();event?.stopPropagation?.();closeDriverProfilePopover();closeDriverSuggestions();closeDriverRouteContextMenu();
  const menu=document.createElement('div');menu.id='driver-route-context-menu';menu.className='driver-route-context-menu';menu.setAttribute('role','menu');menu.setAttribute('aria-label',`Route actions for ${route.route}`);
  const personPicker=people.length>1?`<label><span>Choose name</span><select id="driver-route-context-person">${people.map(name=>`<option value="${esc(name)}">${esc(driverDisplayName(name))}</option>`).join('')}</select></label>`:`<input id="driver-route-context-person" type="hidden" value="${esc(people[0])}">`;
  const button=(target,label,tone='',detail='')=>`<button type="button" class="${esc(tone)}" data-action="driver-route-context-action" data-route-target="${esc(target)}" data-route-uid="${esc(route.routeUid)}"><b>${esc(label)}</b>${detail?`<small>${esc(detail)}</small>`:''}</button>`;
  menu.innerHTML=`<header><div><span>DRIVER ACTIONS</span><strong>${esc(route.route)} · ${esc(waveNameForTime(route.wave))}</strong></div><button type="button" class="driver-route-context-close" aria-label="Close route actions">×</button></header>${personPicker}<div class="driver-route-context-actions">${button('calloff','Call off & swap','calloff','Choose a scheduled replacement')}${button('swap-vto','Put VTO driver on route','swap','One-step VTO swap')}${button('reduction','Move to Reductions','reduction','Leave route visibly unassigned')}${button('vto2','Move to VTO 2','vto2','Rescue backup')}${button('vto4','Move to VTO 4','vto4','Delivery Associate backup')}${button('stay-home','Told To Stay Home','stay-home','Remove from route')}${button('trainer','Add a trainer','trainer','Driver + Trainer')}</div><footer>Route, staging, pad, van, counts, and Planned RTS stay in place.</footer>`;
  document.body?.appendChild?.(menu);menu.querySelector?.('.driver-route-context-close')?.addEventListener?.('click',closeDriverRouteContextMenu);bindActionControls(menu);
  const viewportWidth=window.innerWidth||document.documentElement?.clientWidth||1024,viewportHeight=window.innerHeight||document.documentElement?.clientHeight||768,width=Math.min(360,Math.max(286,menu.offsetWidth||330)),height=Math.min(viewportHeight-16,menu.offsetHeight||430),x=Number(event?.clientX)||source.getBoundingClientRect?.().left||8,y=Number(event?.clientY)||source.getBoundingClientRect?.().bottom||8;
  menu.style.left=`${Math.max(8,Math.min(viewportWidth-width-8,x))}px`;menu.style.top=`${Math.max(8,Math.min(viewportHeight-height-8,y))}px`;
  menu.querySelector?.('select,button')?.focus?.({preventScroll:true});
}
function routeTrainerCandidates(route={}) {
  const onRoute=new Set((state.morningRoutes||[]).filter(row=>row!==route).flatMap(row=>morningDriverNames(row.driver)).map(driverIdentityKey));
  const scheduleRoles=new Map(currentScheduleEntries().map(entry=>[driverIdentityKey(entry.name),entry.role||'']));
  return teamDriverRows().filter(row=>!onRoute.has(driverIdentityKey(row.name))&&!morningDriverNames(route?.driver).some(name=>driverIdentityKey(name)===driverIdentityKey(row.name))).map(row=>({...row,role:scheduleRoles.get(driverIdentityKey(row.name))||row.role||'',trainer:driverHasCapability(row.name,'trainer')})).sort((a,b)=>Number(b.trainer)-Number(a.trainer)||driverDisplayName(a.name).localeCompare(driverDisplayName(b.name)));
}
function openRouteTrainer(routeUid='') {
  const route=morningRouteByUid(routeUid);if(!route)return toast('That route is no longer available','error');
  state.pendingRouteTrainer={routeUid};state.modal='route-trainer';render();return true;
}
function applyRouteTrainer() {
  const pending=state.pendingRouteTrainer,route=morningRouteByUid(pending?.routeUid||''),selected=document.getElementById('route-trainer-name')?.value||'';if(!route||!selected)return toast('Choose an available trainer','error');
  const exact=canonicalDriverName(selected),display=String(document.getElementById('route-trainer-display')?.value||'').replace(/[+|&]/g,' ').replace(/\s+/g,' ').trim();
  if((state.morningRoutes||[]).some(row=>row!==route&&morningDriverNames(row.driver).some(name=>driverIdentityKey(name)===driverIdentityKey(exact))))return toast(`${driverDisplayName(exact)} is already assigned to another route`,'error');
  if(display&&nameKey(display)!==nameKey(exact)){
    const profile=ensureDriverProfile(driverContactForName(exact)||{name:exact}),collision=driverIdentityCollision([display],profile?.key||'');if(collision)return toast(`“${display}” is already linked to ${collision.profile.canonical}`,'error');
    if(profile){profile.profile.nickname=display;profile.profile.updatedAt=new Date().toISOString();}state.driverNameAliases[nameKey(exact)]={canonical:exact,display,aliases:profile?.profile?.names||[exact]};
  }
  reconcileDailyRosterFlags(exact,'on-route');const people=morningDriverNames(route.driver);if(!people.some(name=>driverIdentityKey(name)===driverIdentityKey(exact)))people.push(exact);
  protectRouteOperationalData(route,()=>{route.driver=people.join(' + ');route.trainerNames=[...new Set([...(route.trainerNames||[]),exact])];});
  state.pendingRouteTrainer=null;state.modal=null;persist();render();toast(`${driverDisplayName(exact)} added as trainer on ${route.route}`);return true;
}
function moveRouteDriverToVto(routeUid='',name='',label='VTO 2') {
  const route=morningRouteByUid(routeUid);if(!route)return toast('That route is no longer available','error');
  const result=leaveMorningRouteUnassigned(route,name,`${label} reassignment`),exact=canonicalDriverName(result?.removed||name),role=routeContextDriverRole(exact),backup=setRosterBackupState(exact,role,label),key=scheduleDriverMarkKey(exact);
  state.scheduleBackupRecords[key]={...(state.scheduleBackupRecords[key]||{}),originalRoute:route.route,routeUid:route.routeUid};persist();render();toast(`${backup.name} moved to ${backup.vto} · ${route.route} is highlighted for reassignment`);return true;
}
function moveRouteDriverToStayHome(routeUid='',name='') {
  const route=morningRouteByUid(routeUid);if(!route)return toast('That route is no longer available','error');
  const result=leaveMorningRouteUnassigned(route,name,'Told to stay home'),exact=canonicalDriverName(result?.removed||name);return markPaycomStayHome(exact,routeContextDriverRole(exact));
}
function openRouteVtoSwap(routeUid='',driverName='') {
  const route=morningRouteByUid(routeUid);if(!route)return toast('That route is no longer available','error');
  if(!currentBackupDriverRows().length)return toast('No VTO 2 or VTO 4 drivers are available','error');
  state.pendingRouteVtoSwap={routeUid,driverName:canonicalDriverName(driverName)};state.modal='route-vto-swap';render();return true;
}
function applyRouteVtoSwap() {
  const pending=state.pendingRouteVtoSwap,route=morningRouteByUid(pending?.routeUid||''),incomingRaw=document.getElementById('route-vto-driver')?.value||'';if(!route||!incomingRaw)return toast('Choose a VTO driver','error');
  const people=morningDriverNames(route.driver),index=rosterSwapDriverIndex(people,pending.driverName),incoming=canonicalDriverName(incomingRaw);if(index<0)return toast('The selected driver is no longer on this route','error');
  if(people.some(name=>driverIdentityKey(name)===driverIdentityKey(incoming)))return toast('That VTO driver is already on this route','error');
  const outgoing=canonicalDriverName(people[index]),outgoingRole=routeContextDriverRole(outgoing),outgoingVto=scheduleBackupLabel(outgoingRole);
  reconcileDailyRosterFlags(incoming,'on-route');const applied=protectRouteOperationalData(route,()=>{people[index]=incoming;route.driver=people.join(' + ');if(index===0)clearRouteAssignmentVacancy(route);else {delete route.missingHelper;delete route.vacatedHelper;}return true;});if(!applied)return toast('The VTO route swap could not be completed','error');
  setRosterBackupState(outgoing,outgoingRole,outgoingVto);state.pendingRouteVtoSwap=null;state.modal=null;persist();render();toast(`${driverDisplayName(incoming)} took ${route.route} · ${driverDisplayName(outgoing)} moved to ${outgoingVto}`);return true;
}
function applyDriverRouteContextAction(target='',el=null) {
  const menu=el?.closest?.('#driver-route-context-menu')||document.getElementById?.('driver-route-context-menu'),routeUid=el?.dataset?.routeUid||'',name=menu?.querySelector?.('#driver-route-context-person')?.value||'',route=morningRouteByUid(routeUid);closeDriverRouteContextMenu();if(!route||!name)return toast('That driver assignment is no longer available','error');
  const role=routeContextDriverRole(name);
  if(target==='calloff')return openRosterSwap(route.route,name,'calloff',driverDisplayName(name));
  if(target==='swap-vto')return openRouteVtoSwap(routeUid,name);
  if(target==='reduction')return addRosterReduction(name,role,route.route,route.wave);
  if(target==='vto2'||target==='vto4')return moveRouteDriverToVto(routeUid,name,target==='vto2'?'VTO 2':'VTO 4');
  if(target==='stay-home')return moveRouteDriverToStayHome(routeUid,name);
  if(target==='trainer')return openRouteTrainer(routeUid);
  return false;
}

function startOpeningPicklistCellEdit(source) {
  const key=source.dataset.picklistCell;if(!key)return;
  state.editMode=true;state.copyMode=false;render();
  const target=[...document.querySelectorAll('[data-picklist-edit]')].find(cell=>cell.dataset.picklistCell===key);if(!target)return;
  if(target.dataset.picklistField==='driver'){const route=morningRouteByUid(target.dataset.picklistRouteUid)||(Number(target.dataset.picklistRouteIndex)>=0?state.morningRoutes[Number(target.dataset.picklistRouteIndex)]:null);if(route)target.textContent=driverDisplayValue(route.driver||'');}
  target.focus({preventScroll:true});
  const range=document.createRange();range.selectNodeContents(target);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
  target.scrollIntoView({block:'nearest',inline:'nearest'});
}
function operationalSheetSnapshot() {
  return JSON.parse(JSON.stringify({morningRoutes:state.morningRoutes||[],morningOperationDate:state.morningOperationDate,morningWaveTimeOverrides:state.morningWaveTimeOverrides||{},fitMorningRows:state.fitMorningRows,fitOpeningPicklistRows:state.fitOpeningPicklistRows,callOffDriverKeys:state.callOffDriverKeys||{},callOffReasons:state.callOffReasons||{},scheduleDriverMarks:state.scheduleDriverMarks||{},scheduleBackupRecords:state.scheduleBackupRecords||{},openingPicklistTopics:state.openingPicklistTopics||[],openingPicklistNotes:state.openingPicklistNotes||'',openingPicklistCalloffRows:state.openingPicklistCalloffRows,openingPicklistTopicRows:state.openingPicklistTopicRows,openingPicklistBackupRows:state.openingPicklistBackupRows,openingPicklistWaveSlots:state.openingPicklistWaveSlots,openingPicklistShowAdhoc:state.openingPicklistShowAdhoc,openingPicklistCalloffDrafts:state.openingPicklistCalloffDrafts||[],openingPicklistBackupOverrides:state.openingPicklistBackupOverrides||{},openingPicklistLabels:state.openingPicklistLabels||{}}));
}
function restoreOperationalSheetSnapshot(snapshot={}) {
  ['morningRoutes','morningOperationDate','morningWaveTimeOverrides','fitMorningRows','fitOpeningPicklistRows','callOffDriverKeys','callOffReasons','scheduleDriverMarks','scheduleBackupRecords','openingPicklistTopics','openingPicklistNotes','openingPicklistCalloffRows','openingPicklistTopicRows','openingPicklistBackupRows','openingPicklistWaveSlots','openingPicklistShowAdhoc','openingPicklistCalloffDrafts','openingPicklistBackupOverrides','openingPicklistLabels'].forEach(key=>{if(Object.prototype.hasOwnProperty.call(snapshot,key))state[key]=JSON.parse(JSON.stringify(snapshot[key]));});ensureMorningRouteUids();recalculateEquipmentReadiness();
}
function pushSheetHistory(label='Sheet change',scope='both',snapshot=null) { state.sheetHistory=state.sheetHistory&&Array.isArray(state.sheetHistory.past)?state.sheetHistory:{past:[],future:[]};state.sheetHistory.past.push({id:`history-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,label,scope,at:new Date().toISOString(),by:state.cloudUser||'Dispatcher',snapshot:snapshot?JSON.parse(JSON.stringify(snapshot)):operationalSheetSnapshot()});state.sheetHistory.past=state.sheetHistory.past.slice(-40);state.sheetHistory.future=[]; }
const sheetInputHistoryDrafts=new WeakMap();
function beginSheetInputHistory(el,label='Edit Picklist field',scope='picklist') { if(!el||sheetInputHistoryDrafts.has(el))return;sheetInputHistoryDrafts.set(el,{label,scope,value:String(el.value??''),snapshot:operationalSheetSnapshot()}); }
function commitSheetInputHistory(el) { const draft=el?sheetInputHistoryDrafts.get(el):null;if(!draft)return false;sheetInputHistoryDrafts.delete(el);if(String(el.value??'')===draft.value)return false;pushSheetHistory(draft.label,draft.scope,draft.snapshot);persist();return true; }
function undoSheetChange() { const item=state.sheetHistory?.past?.pop();if(!item)return toast('Nothing to undo','error');state.sheetHistory.future=state.sheetHistory.future||[];state.sheetHistory.future.push({...item,snapshot:operationalSheetSnapshot()});restoreOperationalSheetSnapshot(item.snapshot);persist();render();toast(`Undid: ${item.label}`); }
function redoSheetChange() { const item=state.sheetHistory?.future?.pop();if(!item)return toast('Nothing to redo','error');state.sheetHistory.past=state.sheetHistory.past||[];state.sheetHistory.past.push({...item,snapshot:operationalSheetSnapshot()});restoreOperationalSheetSnapshot(item.snapshot);persist();render();toast(`Redid: ${item.label}`); }
function requestClearOperationalSheet(scope='morning') { state.pendingSheetClear=scope==='picklist'?'picklist':'morning';state.modal='clear-operational-sheet';render(); }
function confirmClearOperationalSheet() {
  const scope=state.pendingSheetClear||'morning',datePrefix=`${state.morningOperationDate}|`,waveAnchors=scope==='morning'?morningBlankWaveAnchors():[];ensureMorningRouteUids();pushSheetHistory(scope==='picklist'?'Clear Opening Picklist':'Clear Morning Sheet',scope);
  if(scope==='picklist'){
    const visibleRouteUids=new Set(openingPicklistSections().flatMap(section=>section.rows).map(route=>route.routeUid).filter(Boolean));state.morningRoutes=(state.morningRoutes||[]).filter(route=>!visibleRouteUids.has(route.routeUid));
  } else {
    state.morningRoutes=[...(state.morningRoutes||[]).filter(route=>route.dsp!==state.dspCode),...waveAnchors];
    state.morningFilters={wave:'all',staging:'all',pad:'all'};
    state.fitMorningRows=false;
    waveAnchors.forEach((anchor,index)=>{state.morningWaveTimeOverrides[morningWaveOverrideKey(`WAVE ${index+1}`)]={time:anchor.wave,count:null};});
  }
  if(scope==='picklist'){
    state.openingPicklistTopics=['','','',''];state.openingPicklistNotes='';state.openingPicklistCalloffRows=6;state.openingPicklistTopicRows=4;state.openingPicklistBackupRows=21;state.openingPicklistCalloffDrafts=[];state.openingPicklistBackupOverrides={};state.openingPicklistLabels={};
    state.callOffDriverKeys=Object.fromEntries(Object.entries(state.callOffDriverKeys||{}).filter(([key])=>!key.startsWith(datePrefix)));
    state.callOffReasons=Object.fromEntries(Object.entries(state.callOffReasons||{}).filter(([key])=>!key.startsWith(datePrefix)));
    state.scheduleBackupRecords=Object.fromEntries(Object.entries(state.scheduleBackupRecords||{}).filter(([key])=>!key.startsWith(datePrefix)));
    state.scheduleDriverMarks=Object.fromEntries(Object.entries(state.scheduleDriverMarks||{}).filter(([key,value])=>!(key.startsWith(datePrefix)&&value==='backup')));
  }
  state.pendingSheetClear=null;state.modal=null;persist();render();toast(`${scope==='picklist'?'Opening Picklist':'Morning Sheet'} cleared · Undo is available`);
}
function normalizedPicklistWave(value='',fallback='') {
  let clean=String(value||'').replace(/\s*\(\d+\)\s*$/,'').trim();if(!clean)return fallback;
  if(!/\b(?:AM|PM)\b/i.test(clean)){const meridian=String(fallback||'').match(/\b(AM|PM)\b/i)?.[1];if(meridian)clean=`${clean} ${meridian.toUpperCase()}`;}
  return clean;
}
function saveOpeningPicklistCell(el) {
  const field=el.dataset.picklistField,value=el.textContent.trim(),wave=el.dataset.picklistWave||'',sectionKey=el.dataset.picklistSectionKey||'';
  if(field==='waveLabel'){pushSheetHistory('Edit Picklist wave label','picklist');state.openingPicklistLabels[sectionKey]=value||(sectionKey==='adhoc'?"ADHOC'S":`WAVE ${Number(sectionKey.split('-')[1])||1}`);persist();return;}
  if(field==='padOverride'){pushSheetHistory(`Edit ${wave} pad`,'both');state.morningRoutes.filter(row=>row.dsp===state.dspCode&&row.wave===wave).forEach(row=>{row.padOverride=value.toUpperCase();});persist();return;}
  if(field==='waveTime'){
    pushSheetHistory(`Edit ${wave} time`,'both');
    saveMorningWaveTimeValue(coreMorningWaveLabel(sectionKey,sectionKey),wave,value);persist();return;
  }
  let index=Number(el.dataset.picklistRouteIndex),route=morningRouteByUid(el.dataset.picklistRouteUid)||(Number.isInteger(index)&&index>=0?state.morningRoutes[index]:null);
  if(!route&&value){route=createManualMorningRoute({route:'',wave:wave||'Ad hoc'});route.route='';route.service=sectionKey==='adhoc'?'Adhoc':'Manual opening edit';index=state.morningRoutes.indexOf(route);el.parentElement?.querySelectorAll('[data-picklist-route-index]').forEach(cell=>{cell.dataset.picklistRouteIndex=String(index);cell.dataset.picklistRouteUid=route.routeUid||'';});}
  if(route)el.dataset.picklistRouteUid=route.routeUid||'';
  if(!route)return;
  pushSheetHistory(`Edit ${field} on ${route.route||sectionKey}`,'both');
  const clean=field==='driver'?canonicalDriverEntryValue(value):['route','staging','ev','deviceName','portable'].includes(field)?value.toUpperCase():value;
  if(field==='ev'){const parts=clean.split('/').map(part=>part.trim()).filter(Boolean);route.ev=parts[0]||'';if(parts[1])route.helperBag=parts[1];}
  else if(field==='driver')applyDriverCellEdit(route,value,'Driver cleared in Picklist');
  else route[field]=clean;
  if(field==='ev'){fillEquipmentForRoute(route);setTimeout(()=>warnDuplicateMorningEquipment(route.ev),0);}
  if(field==='deviceName'||field==='portable')recalculateEquipmentReadiness();
  persist();
}
function handleOpeningPicklistKeydown(event,el) {
  if(event.key==='Enter'){event.preventDefault();saveOpeningPicklistCell(el);state.editMode=false;render();return toast('Picklist and Morning Sheet updated · editing off');}
  if(event.key==='Escape'){event.preventDefault();el.blur();}
}
function renameOpeningPicklistCalloff(key='',name='') {
  const previous=state.callOffDriverKeys[key]||{},reason=state.callOffReasons[key]||'';name=String(name||'').trim();
  delete state.callOffDriverKeys[key];delete state.callOffReasons[key];
  if(name){const exactName=contactForMorningDriver(name)?.name||canonicalDriverName(name)||name,nextKey=callOffStatusKey(exactName);reconcileDailyRosterFlags(exactName,'calloff');state.callOffDriverKeys[nextKey]={...previous,name:exactName,at:previous.at||new Date().toISOString()};state.callOffReasons[nextKey]=reason;}
  persist();render();
}
function updateOpeningPicklistCalloffDraft(index,field,value) {
  state.openingPicklistCalloffDrafts=Array.isArray(state.openingPicklistCalloffDrafts)?state.openingPicklistCalloffDrafts:[];
  state.openingPicklistCalloffDrafts[index]={...(state.openingPicklistCalloffDrafts[index]||{}),[field]:value};persistSoon();
}
function commitOpeningPicklistCalloffDraft(index) {
  const draft=state.openingPicklistCalloffDrafts?.[index],name=String(draft?.name||'').trim();if(!name)return;
  const exactName=contactForMorningDriver(name)?.name||canonicalDriverName(name)||name,key=callOffStatusKey(exactName),scheduled=currentScheduleEntries().find(entry=>driverIdentityKey(entry.name)===driverIdentityKey(exactName));
  // A manually typed call-off is the same roster move as the action buttons:
  // remove the person from VTO/backups and every competing daily category,
  // then create exactly one Called Off card.
  reconcileDailyRosterFlags(exactName,'calloff');
  state.callOffDriverKeys[key]={...rosterRecord(exactName,scheduled?.role||''),name:exactName,route:'',at:new Date().toISOString()};
  state.callOffReasons[key]=String(draft.reason||'').trim();state.openingPicklistCalloffDrafts.splice(index,1);persist();render();toast(`${exactName} moved to Called off today`);
}
function loadSharedOperationDate(date='',message='') {
  state.morningOperationDate=date||defaultOperationDate();state.morningSheetsLastReceipt=null;localStorage.setItem('relayops_morning_operation_date',state.morningOperationDate);render();if(message)toast(message);
  try{const url=new URL(location.href);url.searchParams.set('date',state.morningOperationDate);history.replaceState(null,'',url.href);}catch{}
  if(window.RelayOpsCloud?.session){state.cloudStatus='connecting';window.RelayOpsCloud.load?.().catch(error=>{state.cloudStatus='error';render();toast(`Could not load ${state.morningOperationDate}: ${error?.message||'cloud sync error'}`,'error');});}
}
function saveOpeningPicklistDate(value='') {
  const date=scheduleDateKey(value);if(!date)return toast('Use Month/Day/Year for the picklist date','error');
  if(date===state.morningOperationDate)return;
  pushSheetHistory('Change Opening Picklist date','picklist');loadSharedOperationDate(date,`Opening date updated to ${date.replace(/-/g,'/')}`);
}
function saveOpeningPicklistBackup(key='',value='') {
  state.openingPicklistBackupOverrides=state.openingPicklistBackupOverrides&&typeof state.openingPicklistBackupOverrides==='object'?state.openingPicklistBackupOverrides:{};
  state.openingPicklistBackupOverrides[key]=String(value||'').trim();persistSoon();
}
function resizeOpeningPicklistArea(area='',delta=0) {
  const change=Math.sign(Number(delta)||0);if(!change)return;
  pushSheetHistory(`${change>0?'Add':'Remove'} ${area} row`,'picklist');
  if(area==='backup'){
    const actual=openingPicklistBackupRows(),minimum=Math.max(1,actual.filter(row=>row.vto==='VTO 2').length,actual.filter(row=>row.vto!=='VTO 2').length),current=Math.max(minimum,Number(state.openingPicklistBackupRows)||21);state.openingPicklistBackupRows=Math.max(minimum,current+change);
  } else if(area==='calloff'){
    const actual=openingPicklistCallOffRows().length,filledDrafts=(state.openingPicklistCalloffDrafts||[]).filter(row=>String(row?.name||row?.reason||'').trim()).length,minimum=Math.max(1,actual+filledDrafts),current=Math.max(minimum,Number(state.openingPicklistCalloffRows)||6);state.openingPicklistCalloffRows=Math.max(minimum,current+change);
  } else if(area==='topic'){
    const lastFilled=Math.max(0,...(state.openingPicklistTopics||[]).map((value,index)=>String(value||'').trim()?index+1:0)),minimum=Math.max(1,lastFilled),current=Math.max(minimum,Number(state.openingPicklistTopicRows)||4);state.openingPicklistTopicRows=Math.max(minimum,current+change);while(state.openingPicklistTopics.length<state.openingPicklistTopicRows)state.openingPicklistTopics.push('');
  } else return;
  persist();render();toast(change>0?'One line added':'One empty line removed');
}
function requestDeletePicklistWave(sectionKey='') {
  const section=openingPicklistSections().find(item=>item.key===sectionKey);if(!section)return;
  state.pendingPicklistWaveDelete={key:section.key,label:section.label,wave:section.wave,routes:section.rows.length};state.modal='delete-picklist-wave';render();
}
function confirmDeletePicklistWave() {
  const pending=state.pendingPicklistWaveDelete;if(!pending)return;
  pushSheetHistory(`Delete ${pending.label}`,'both');
  if(pending.key==='adhoc'){state.morningRoutes=(state.morningRoutes||[]).filter(row=>!(isExplicitAdhocMorningRoute(row)&&row.dsp===state.dspCode));state.openingPicklistShowAdhoc=false;}
  else {state.morningRoutes=(state.morningRoutes||[]).filter(row=>!(row.dsp===state.dspCode&&row.wave===pending.wave));state.openingPicklistWaveSlots=Math.max(0,Number(state.openingPicklistWaveSlots||5)-1);}
  const label=pending.label;state.pendingPicklistWaveDelete=null;state.modal=null;persist();render();toast(`${label} deleted from Picklist and Morning Sheet`);
}
function acknowledgeVanIssueInline(route='',equipment='') {
  const reported=reportedFleetIssueForEquipmentId(equipment);if(!reported?.active?.length)return;
  const acknowledgedAt=new Date().toISOString(),acknowledgedBy=state.cloudUser||'Opening dispatcher';reported.active.forEach(record=>{state.morningIssueAcknowledgements[morningIssueAckKey(route,record.id)]={acknowledgedAt,acknowledgedBy};});persist();render();toast(`${equipment} issue acknowledged`);
}

function captureModalReturnFocus() {
  const active=document.activeElement;
  if(!active||active===document.body)return null;
  if(active.id)return {id:active.id};
  if(active.dataset?.action)return {action:active.dataset.action};
  if(active.dataset?.page)return {page:active.dataset.page};
  return null;
}
function modalFocusableElements() {
  const dialog=document.querySelector?.('.modal');if(!dialog)return [];
  return [...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hidden&&el.getAttribute('aria-hidden')!=='true');
}
function restoreModalFocus() {
  const target=modalReturnFocus?.id?document.getElementById(modalReturnFocus.id):modalReturnFocus?.action?document.querySelector?.(`[data-action="${modalReturnFocus.action}"]`):modalReturnFocus?.page?document.querySelector?.(`[data-page="${modalReturnFocus.page}"]`):null;
  modalReturnFocus=null;target?.focus?.({preventScroll:true});
}
function syncModalFocus(previouslyOpen=false) {
  if(state.modal){
    const dialog=document.querySelector?.('.modal');
    const target=dialog?.querySelector('[autofocus]')||modalFocusableElements()[0]||dialog;
    if(dialog&&!dialog.hasAttribute('tabindex'))dialog.setAttribute('tabindex','-1');
    target?.focus?.({preventScroll:true});
  } else if(previouslyOpen) restoreModalFocus();
  modalWasOpen=Boolean(state.modal);
}
function handleModalKeydown(event) {
  if(!state.modal)return;
  if(event.key==='Escape'){
    event.preventDefault();document.querySelector?.('.modal [data-action="close-modal"]')?.click();return;
  }
  if(event.key!=='Tab')return;
  const focusable=modalFocusableElements();if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
}
function handleSheetHistoryKeyboard(event) {
  if(state.modal||!['morning','roster'].includes(state.page)||!(event.metaKey||event.ctrlKey))return;
  const target=event.target;if(target?.matches?.('input,textarea,[contenteditable="true"]'))return;
  if(String(event.key).toLowerCase()==='z'){event.preventDefault();return event.shiftKey?redoSheetChange():undoSheetChange();}
  if(String(event.key).toLowerCase()==='y'){event.preventDefault();return redoSheetChange();}
}

function debounce(fn,delay=160) {
  let timer=null;
  const debounced=(...args)=>{
    clearTimeout(timer);
    timer=setTimeout(()=>fn(...args),delay);
  };
  debounced.cancel=()=>{clearTimeout(timer);timer=null;};
  return debounced;
}
function frameThrottle(fn) {
  let scheduled=false,lastArgs=[];
  return (...args)=>{
    lastArgs=args;
    if(scheduled)return;
    scheduled=true;
    const run=()=>{scheduled=false;fn(...lastArgs);};
    if(window?.requestAnimationFrame)window.requestAnimationFrame(run);
    else setTimeout(run,16);
  };
}
const persistSoon=debounce(()=>persist(),320);
function persistRosteringSlice() {
  localStorage.setItem('relayops_rostering_date',state.rosteringDate||defaultOperationDate());
  localStorage.setItem('relayops_rostering_plans',JSON.stringify(state.rosteringPlans||{}));
  localStorage.setItem('relayops_rostering_helper_pool',JSON.stringify(state.rosteringHelperPool||{}));
  localStorage.setItem('relayops_rostering_open_services',JSON.stringify(state.rosteringOpenServices||{}));
  localStorage.setItem('relayops_rostering_paycom_category',state.rosteringPaycomCategory||'all');
  localStorage.setItem('relayops_rostering_auto_mode',state.rosteringAutoMode==='abc'?'abc':'random');
  localStorage.setItem('relayops_rostering_training_matches',JSON.stringify(state.rosteringTrainingMatches||{}));
  localStorage.setItem('relayops_rostering_manual_training',JSON.stringify(state.rosteringManualTraining||{}));
  window.RelayOpsCloud?.schedule?.('workspace.autosave');
}
function toggleRosteringService(serviceId='',trigger=null) {
  if(!serviceId)return;
  const open=!Boolean(state.rosteringOpenServices[serviceId]);
  state.rosteringOpenServices[serviceId]=open;
  localStorage.setItem('relayops_rostering_open_services',JSON.stringify(state.rosteringOpenServices||{}));
  const card=trigger?.closest?.('[data-rostering-service-card]')||[...(document.querySelectorAll?.('[data-rostering-service-card]')||[])].find(row=>row.dataset.rosteringServiceCard===serviceId);
  const bar=card?.querySelector?.('.rostering-service-bar'),body=card?.querySelector?.('.rostering-service-body');
  card?.classList?.toggle('open',open);
  if(bar){bar.setAttribute('aria-expanded',String(open));const marker=bar.querySelector('b');if(marker)marker.textContent=open?'−':'+';}
  if(body)body.hidden=!open;
}
function restoreInputFocus(selector,position) {
  const input=document.querySelector?.(selector);
  if(!input)return;
  input.focus?.();
  if(Number.isFinite(position)&&input.setSelectionRange){
    const next=Math.min(position,String(input.value||'').length);
    try{input.setSelectionRange(next,next);}catch(error){}
  }
}

function bindRosteringContent(root=document) {
  bindActionControls(root);
  root.querySelectorAll?.('[data-rostering-date]').forEach(el=>el.addEventListener('change',()=>{state.rosteringDate=el.value||defaultOperationDate();syncRosteringHelperShifts(currentRosteringPlan());persistRosteringSlice();renderRosteringContent();toast(`Rostering date set to ${state.rosteringDate}`);}));
  root.querySelectorAll?.('[data-rostering-auto-mode]').forEach(el=>el.addEventListener('change',()=>{state.rosteringAutoMode=el.value==='abc'?'abc':'random';persistRosteringSlice();renderRosteringContent();toast(`Auto Roster will use ${state.rosteringAutoMode==='abc'?'ABC':'random'} order`);}));
  root.querySelectorAll?.('[data-rostering-assignment]').forEach(el=>{
    el.addEventListener('input',()=>updateRosteringAssignment(el.dataset.rosteringAssignment,el.dataset.rosteringField,el.value));
    el.addEventListener('change',()=>{updateRosteringAssignment(el.dataset.rosteringAssignment,el.dataset.rosteringField,el.value);persistRosteringSlice();});
  });
  root.querySelectorAll?.('[data-rostering-service]').forEach(el=>el.addEventListener('change',()=>{updateRosteringService(el.dataset.rosteringService,el.dataset.rosteringServiceField,el.value);persistRosteringSlice();toast('Service updated');}));
  root.querySelectorAll?.('[data-rostering-training-match]').forEach(el=>el.addEventListener('change',()=>assignRosteringTrainer(el.dataset.rosteringTrainingMatch||'',el.value||'')));
  root.querySelectorAll?.('[data-rostering-paycom-search]').forEach(el=>el.addEventListener('input',()=>filterRosteringPaycomSoon(el)));
  root.querySelectorAll?.('[data-rostering-driver-note-search]').forEach(el=>el.addEventListener('input',()=>filterRosteringDriverNotesSoon(el)));
  root.querySelectorAll?.('[data-driver-name-input="true"]').forEach(el=>{
    el.addEventListener('focus',()=>showDriverNameSuggestions(el));el.addEventListener('input',()=>showDriverNameSuggestions(el));
    el.addEventListener('mouseenter',()=>{clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;});
    el.addEventListener('blur',()=>scheduleDriverSuggestionsClose(220));el.addEventListener('mouseleave',()=>scheduleDriverSuggestionsClose(320));
  });
  root.querySelectorAll?.('[data-driver-profile-name]').forEach(el=>{el.addEventListener('mouseenter',()=>showDriverProfilePopover(el));el.addEventListener('mouseleave',closeDriverProfilePopover);el.addEventListener('pointerleave',closeDriverProfilePopover);el.addEventListener('focusin',()=>showDriverProfilePopover(el));el.addEventListener('focusout',closeDriverProfilePopover);});
}

function renderRosteringContent() {
  if(state.page!=='rostering')return render();
  const content=document.querySelector?.('.content');if(!content)return render();
  const scrollTop=window.scrollY||document.documentElement?.scrollTop||0;
  closeDriverProfilePopover();closeDriverSuggestions();
  content.innerHTML=rosteringPage();
  bindRosteringContent(content);
  window.requestAnimationFrame?.(()=>window.scrollTo?.(0,scrollTop));
}
function bindActionControls(root=document) {
  root.querySelectorAll?.('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action,el)));
}
function updateGlobalSearchResults() {
  const anchor=document.getElementById?.('global-search-results-anchor');
  if(!anchor)return;
  anchor.innerHTML=globalSearchResultsPanelHtml();
  bindActionControls(anchor);
}
const updateFleetSearchSoon=debounce((value,position)=>{
  state.fleetSearch=value;
  persist();
  render();
  restoreInputFocus('[data-fleet-search]',position);
},220);
const updateFleetExpectedSoon=debounce((value,position)=>{
  state.fleetExpectedCount=Math.max(0,Number(value)||0);
  persist();
  render();
  restoreInputFocus('[data-fleet-expected]',position);
},260);
function cancelDeferredRenders() {
  updateFleetSearchSoon.cancel?.();
  updateFleetExpectedSoon.cancel?.();
}
const filterRosteringPaycomSoon=frameThrottle(el=>{
  const query=nameKey(el.value),panel=el.closest('.rostering-paycom'),category=state.rosteringPaycomCategory||'all';
  panel?.querySelectorAll('[data-rostering-paycom-name]').forEach(row=>{const matchesCategory=category==='all'||category==='rostered'&&row.dataset.rosteringPaycomStatus==='rostered'||category==='unrostered'&&row.dataset.rosteringPaycomStatus==='unrostered'||row.dataset.rosteringPaycomCategory===category;row.hidden=!matchesCategory||Boolean(query&&!String(row.dataset.rosteringPaycomName||'').includes(query));});
});
const filterRosteringDriverNotesSoon=frameThrottle(el=>{
  const query=nameKey(el.value),panel=el.closest('.rostering-driver-notes');
  panel?.querySelectorAll('[data-rostering-driver-note-name]').forEach(row=>{row.hidden=Boolean(query&&!String(row.dataset.rosteringDriverNoteName||'').includes(query));});
});
const filterTeamDirectorySoon=frameThrottle(value=>filterTeamDirectory(value));
const filterScheduledRosterSoon=frameThrottle(el=>{
  const query=nameKey(el.value),panel=el.closest('.scheduled-section');
  panel?.querySelectorAll('[data-roster-name]').forEach(row=>{row.hidden=Boolean(query&&!String(row.dataset.rosterName||'').includes(query));});
});
function filterVtoRouteSwapOptions(input) {
  const query=nameKey(input?.value||''),select=document.getElementById('vto-route-swap-target');if(!select)return;
  let first=null,count=0;[...select.options].forEach(option=>{const match=!query||String(option.dataset.vtoRouteSearch||'').includes(query);option.hidden=!match;option.disabled=!match;if(match){count++;if(!first)first=option;}});
  if(!select.selectedOptions?.[0]||select.selectedOptions[0].disabled){select.value=first?.value||'';if(first)first.selected=true;}
  const status=document.getElementById('vto-route-swap-count');if(status)status.textContent=count?`${count} matching route${count===1?'':'s'}`:'No routes match that search';
  const confirm=document.querySelector('[data-action="apply-vto-route-swap"]');if(confirm)confirm.disabled=!count;
}

function render() {
  const previouslyOpen=modalWasOpen;
  if(PARKING_ONLY_VIEW)state.page='parking';
  if(state.page==='admin'&&!hasOwnerAdminAccess())state.page='dashboard';
  if(state.modal&&!previouslyOpen)modalReturnFocus=captureModalReturnFocus();
  closeDriverProfilePopover();
  closeDriverRouteContextMenu();
  closeDriverSuggestions();
  app.innerHTML = `<div class="app-shell ${PARKING_ONLY_VIEW?'parking-only-shell':''}">${sidebar()}<main class="main">${topbar()}<div class="content">${pageContent()}</div></main></div>${modal()}<div class="toast-stack" id="toast-stack" role="status" aria-live="polite" aria-atomic="false"></div>`;
  enhanceDriverTextButtons();
  enhanceDriverStayHomeControls();
  enhanceOpeningRoster();
  enhanceMorningParkingAssignment();
  enhanceItineraryRtsModal();
  bind();
  syncModalFocus(previouslyOpen);
}

function enhanceItineraryRtsModal() {
  if(state.modal!=='import'||state.importPurpose!=='itinerary-rts')return;
  const dialog=document.querySelector('.import-modal');if(!dialog)return;
  const eyebrow=dialog.querySelector('.modal-head .eyebrow'),title=dialog.querySelector('#import-title'),description=dialog.querySelector('.modal-head p');
  if(eyebrow)eyebrow.textContent='DA ITINERARIES · RTS ONLY';
  if(title)title.textContent="Import RTS TIME (DA's Tab)";
  if(description)description.textContent='Upload Itineraries_DJT6. RelayOps reads only Planned return to station and matches it by Route code.';
  const progress=[...dialog.querySelectorAll('.upload-progress-step span')];
  if(progress[1])progress[1].textContent='Find return time';if(progress[2])progress[2].textContent='Fill Planned RTS only';
  const auto=dialog.querySelector('.auto-match');if(auto){auto.querySelector('strong').textContent='RTS-only safety check:';const spans=auto.querySelectorAll('span');['✓ Match by CX Route code','✓ Read Planned return to station','✓ Leave all other cells unchanged'].forEach((text,i)=>{if(spans[i])spans[i].textContent=text;});}
  const apply=dialog.querySelector('[data-action="apply-import"]');if(apply&&state.importedFile)apply.textContent='Fill Planned RTS only →';
}

function enhanceDriverStayHomeControls() {
  document.querySelectorAll?.('.driver-card[data-driver-name]').forEach(card=>{
    const history=card.querySelector('.driver-stay-home-history');
    if(!history||history.querySelector('[data-action="remove-driver-stay-home"]'))return;
    const button=document.createElement('button');
    button.type='button';button.className='driver-stay-home-remove';button.dataset.action='remove-driver-stay-home';button.dataset.driverName=card.dataset.driverName||'';button.title='Remove the most recent Told To Stay Home mark';button.textContent='Remove latest';
    history.append(button);
  });
}

function bind() {
  document.removeEventListener?.('paste',handleEquipmentPaste);
  document.removeEventListener?.('mousemove',handleSheetPointerMove);
  document.removeEventListener?.('pointermove',handleSheetPointerMove);
  document.removeEventListener?.('mouseup',stopSheetDrag);
  document.removeEventListener?.('pointerup',stopSheetDrag);
  document.removeEventListener?.('copy',handleSheetSelectionCopy);
  document.removeEventListener?.('keydown',handleModalKeydown);
  document.removeEventListener?.('keydown',handleSheetHistoryKeyboard);
  document.removeEventListener?.('pointerdown',closeDriverRouteContextOnOutside);
  document.removeEventListener?.('keydown',closeDriverRouteContextOnKey);
  window.removeEventListener?.('resize',closeDriverRouteContextMenu);
  window.removeEventListener?.('scroll',closeDriverRouteContextOnScroll,true);
  if(state.modal)document.addEventListener?.('keydown',handleModalKeydown);
  else document.addEventListener?.('keydown',handleSheetHistoryKeyboard);
  document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.page)));
  document.querySelectorAll('[data-action="save-fleet-issue"]').forEach(el=>el.addEventListener('click',event=>{event.stopImmediatePropagation();saveFleetIssue();}));
  document.querySelectorAll('[data-action="mark-fleet-issue-fixed"]').forEach(el=>el.addEventListener('click',event=>{event.stopImmediatePropagation();markFleetIssueFixed(el.dataset.issueKey||'',el.dataset.issueId||'');}));
  document.querySelectorAll('[data-action="open-morning-vehicle-issue"]').forEach(el=>el.addEventListener('click',event=>{event.stopImmediatePropagation();openMorningVehicleIssue(el.dataset.route||'',el.dataset.equipment||'');}));
  document.querySelectorAll('[data-action="acknowledge-morning-vehicle-issue"]').forEach(el=>el.addEventListener('click',event=>{event.stopImmediatePropagation();acknowledgeMorningVehicleIssue();}));
  bindActionControls(document);
  document.querySelectorAll('[data-driver-card-toggle]').forEach(card=>{
    const toggle=()=>action('toggle-driver-card',card);
    card.addEventListener('click',event=>{if(event.target.closest('button,a,input,select,textarea,[data-action]'))return;toggle();});
    card.addEventListener('keydown',event=>{if(event.target!==card||!['Enter',' '].includes(event.key))return;event.preventDefault();toggle();});
  });
  document.querySelectorAll('[data-driver-profile-name]').forEach(el=>{el.addEventListener('mouseenter',()=>showDriverProfilePopover(el));el.addEventListener('mouseleave',closeDriverProfilePopover);el.addEventListener('pointerleave',closeDriverProfilePopover);el.addEventListener('focusin',()=>showDriverProfilePopover(el));el.addEventListener('focusout',closeDriverProfilePopover);});
  document.querySelectorAll('.morning-template-sheet [data-view-field="driver"], .opening-picklist-main [data-picklist-field="driver"]').forEach(el=>el.addEventListener('contextmenu',event=>openDriverRouteContextMenu(event,el)));
  document.addEventListener?.('pointerdown',closeDriverRouteContextOnOutside);
  document.addEventListener?.('keydown',closeDriverRouteContextOnKey);
  window.addEventListener?.('resize',closeDriverRouteContextMenu);
  window.addEventListener?.('scroll',closeDriverRouteContextOnScroll,true);
  const aChatInput=document.querySelector?.('[data-achat-input]');
  if(aChatInput)aChatInput.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAChatMessage();}});
  const aChatStream=document.querySelector?.('[data-achat-stream]');if(aChatStream)aChatStream.scrollTop=aChatStream.scrollHeight;
  document.querySelectorAll('[data-message-template]').forEach(el=>el.addEventListener('change',()=>{state.messageQueueTemplate=el.value;persist();render();toast('Message template updated');}));
  document.querySelectorAll('[data-whiparound-date]').forEach(el=>el.addEventListener('change',()=>{state.whiparoundSelectedDate=el.value;applyWhiparoundChecksToMorning(el.value);persist();render();}));
  document.querySelectorAll('[data-whiparound-template]').forEach(el=>el.addEventListener('change',()=>{state.whiparoundReminderTemplates[el.dataset.whiparoundTemplate]=el.value.trim();persist();toast('Whiparound reminder saved');}));
  document.querySelectorAll('[data-schedule-filter]').forEach(el=>el.addEventListener('change',()=>{state.scheduleFilter=el.value;persist();render();}));
  document.querySelectorAll('[data-rostering-date]').forEach(el=>el.addEventListener('change',()=>{state.rosteringDate=el.value||defaultOperationDate();syncRosteringHelperShifts(currentRosteringPlan());persistRosteringSlice();renderRosteringContent();toast(`Rostering date set to ${state.rosteringDate}`);}));
  document.querySelectorAll('[data-rostering-auto-mode]').forEach(el=>el.addEventListener('change',()=>{state.rosteringAutoMode=el.value==='abc'?'abc':'random';persistRosteringSlice();renderRosteringContent();toast(`Auto Roster will use ${state.rosteringAutoMode==='abc'?'ABC':'random'} order`);}));
  document.querySelectorAll('[data-rostering-assignment]').forEach(el=>{
    el.addEventListener('input',()=>updateRosteringAssignment(el.dataset.rosteringAssignment,el.dataset.rosteringField,el.value));
    el.addEventListener('change',()=>{updateRosteringAssignment(el.dataset.rosteringAssignment,el.dataset.rosteringField,el.value);persistRosteringSlice();});
  });
  document.querySelectorAll('[data-rostering-service]').forEach(el=>el.addEventListener('change',()=>{updateRosteringService(el.dataset.rosteringService,el.dataset.rosteringServiceField,el.value);persistRosteringSlice();toast('Service updated');}));
  document.querySelectorAll('[data-rostering-training-match]').forEach(el=>el.addEventListener('change',()=>assignRosteringTrainer(el.dataset.rosteringTrainingMatch||'',el.value||'')));
  document.querySelectorAll('[data-charger-report-field]').forEach(el=>{
    el.addEventListener('input',updateChargerReportPreview);
    el.addEventListener('change',updateChargerReportPreview);
  });
  document.querySelectorAll('[data-rostering-paycom-search]').forEach(el=>el.addEventListener('input',()=>filterRosteringPaycomSoon(el)));
  document.querySelectorAll('[data-rostering-driver-note-search]').forEach(el=>el.addEventListener('input',()=>filterRosteringDriverNotesSoon(el)));
  document.querySelectorAll('[data-team-search]').forEach(el=>el.addEventListener('input',()=>filterTeamDirectorySoon(el.value)));
  document.querySelectorAll('[data-roster-search]').forEach(el=>el.addEventListener('input',()=>filterScheduledRosterSoon(el)));
  const vtoRouteSearch=document.getElementById('vto-route-swap-search');if(vtoRouteSearch)vtoRouteSearch.addEventListener('input',()=>filterVtoRouteSwapOptions(vtoRouteSearch));
  document.querySelectorAll('[data-picklist-calloff-reason]').forEach(el=>{el.addEventListener('focus',()=>beginSheetInputHistory(el,'Edit Picklist call-off reason'));el.addEventListener('input',()=>{state.callOffReasons[el.dataset.picklistCalloffReason]=el.value;persistSoon();});el.addEventListener('change',()=>{commitSheetInputHistory(el);persist();});});
  document.querySelectorAll('[data-picklist-backup]').forEach(el=>{el.addEventListener('focus',()=>beginSheetInputHistory(el,'Edit Picklist backup'));el.addEventListener('input',()=>saveOpeningPicklistBackup(el.dataset.picklistBackup,el.value));el.addEventListener('change',()=>{commitSheetInputHistory(el);persist();});});
  document.querySelectorAll('[data-picklist-calloff-name]').forEach(el=>{el.addEventListener('focus',()=>beginSheetInputHistory(el,'Rename Picklist call off'));el.addEventListener('change',()=>{commitSheetInputHistory(el);renameOpeningPicklistCalloff(el.dataset.picklistCalloffName,el.value);});});
  document.querySelectorAll('[data-picklist-calloff-draft]').forEach(el=>{
    el.addEventListener('focus',()=>beginSheetInputHistory(el,'Edit Picklist call off'));
    el.addEventListener('input',()=>updateOpeningPicklistCalloffDraft(Number(el.dataset.picklistCalloffDraft),el.dataset.picklistCalloffField,el.value));
    el.addEventListener('change',()=>{commitSheetInputHistory(el);if(el.dataset.picklistCalloffField==='name')commitOpeningPicklistCalloffDraft(Number(el.dataset.picklistCalloffDraft));else persist();});
  });
  document.querySelectorAll('[data-picklist-topic]').forEach(el=>{el.addEventListener('focus',()=>beginSheetInputHistory(el,'Edit Picklist stand-up topic'));el.addEventListener('input',()=>{const index=Number(el.dataset.picklistTopic);state.openingPicklistTopics=Array.isArray(state.openingPicklistTopics)?state.openingPicklistTopics:['','','',''];state.openingPicklistTopics[index]=el.value;persistSoon();});el.addEventListener('change',()=>{commitSheetInputHistory(el);persist();});});
  document.querySelectorAll('[data-picklist-notes]').forEach(el=>{el.addEventListener('focus',()=>beginSheetInputHistory(el,'Edit Picklist notes'));el.addEventListener('input',()=>{state.openingPicklistNotes=el.value;persistSoon();});el.addEventListener('change',()=>{commitSheetInputHistory(el);persist();});});
  document.querySelectorAll('[data-picklist-date]').forEach(el=>el.addEventListener('change',()=>saveOpeningPicklistDate(el.value)));
  document.querySelectorAll('[data-picklist-view]').forEach(el=>el.addEventListener('dblclick',event=>{if(!state.editMode){event.preventDefault();startOpeningPicklistCellEdit(el);}}));
  document.querySelectorAll('[data-picklist-edit]').forEach(el=>{
    if(el.dataset.picklistField==='driver'){
      el.addEventListener('focus',()=>showDriverNameSuggestions(el));
      el.addEventListener('input',()=>showDriverNameSuggestions(el));
      el.addEventListener('mouseenter',()=>{clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;});
      el.addEventListener('mouseleave',()=>scheduleDriverSuggestionsClose(320));
    }
    el.addEventListener('blur',()=>{saveOpeningPicklistCell(el);if(el.dataset.picklistField==='driver')scheduleDriverSuggestionsClose();});
    el.addEventListener('keydown',event=>handleOpeningPicklistKeydown(event,el));
    el.addEventListener('paste',event=>{const text=event.clipboardData?.getData('text/plain');if(text!==undefined){event.preventDefault();document.execCommand?.('insertText',false,text);}});
  });
  document.querySelectorAll('[data-driver-name-input="true"]').forEach(el=>{
    el.addEventListener('focus',()=>showDriverNameSuggestions(el));
    el.addEventListener('input',()=>showDriverNameSuggestions(el));
    el.addEventListener('mouseenter',()=>{clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;});
    el.addEventListener('blur',()=>scheduleDriverSuggestionsClose(220));
    el.addEventListener('mouseleave',()=>scheduleDriverSuggestionsClose(320));
  });
  document.querySelectorAll('[data-phase]').forEach(el=>el.addEventListener('click',()=>{state.phase=Number(el.dataset.phase);persist();render();}));
  document.querySelectorAll('[data-morning-filter]').forEach(el=>el.addEventListener('change',()=>{const key=el.dataset.morningFilter;if(key!=='dsp')state.morningFilters[key]=el.value;render();}));
  document.querySelectorAll('[data-operation-date]').forEach(el=>el.addEventListener('change',()=>{const date=el.value||defaultOperationDate();loadSharedOperationDate(date,`Google target set to ${operationDateTabNames(date).join(' or ')}`);}));
  document.querySelectorAll('[data-rivian-sort]').forEach(el=>el.addEventListener('change',()=>{state.fleetSort=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-filter]').forEach(el=>el.addEventListener('change',()=>{state.fleetFilter=el.value;persist();render();}));
  document.querySelectorAll('[data-inventory-filter]').forEach(el=>el.addEventListener('change',()=>{state.inventoryFilter=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-view]').forEach(el=>el.addEventListener('change',()=>{state.fleetView=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-search]').forEach(el=>{el.addEventListener('input',()=>{const pos=el.selectionStart??String(el.value||'').length;state.fleetSearch=el.value;updateFleetSearchSoon(el.value,pos);});el.addEventListener('change',()=>{state.fleetSearch=el.value;persist();});});
  document.querySelectorAll('[data-fleet-expected]').forEach(el=>{el.addEventListener('input',()=>{const pos=el.selectionStart??String(el.value||'').length;state.fleetExpectedCount=Math.max(0,Number(el.value)||0);updateFleetExpectedSoon(el.value,pos);});el.addEventListener('change',()=>{state.fleetExpectedCount=Math.max(0,Number(el.value)||0);persist();});});
  document.querySelectorAll('[data-parking-select]').forEach(el=>el.addEventListener('click',e=>{if(e.target?.matches?.('[data-parking-id]'))return;selectParkingSlot(el.dataset.parkingSelect);}));
  document.querySelectorAll('[data-parking-id]').forEach(el=>{
    el.addEventListener('focus',()=>selectParkingSlot(el.dataset.parkingId,false));
    el.addEventListener('input',()=>{updateParkingSlot(el.dataset.parkingId,el.value,false);syncParkingSlotVisual(el);});
    el.addEventListener('change',()=>persist());
  });
  document.querySelectorAll('[data-parking-battery]').forEach(el=>{el.addEventListener('input',()=>{updateParkingBattery(el.dataset.parkingBattery,el.value);applyParkingBatteryTone(el,el.value);});el.addEventListener('change',()=>persist());});
  document.querySelectorAll('[data-parking-charger]').forEach(el=>el.addEventListener('click',()=>toggleParkingCharger(el.dataset.parkingCharger)));
  document.querySelectorAll('[data-parking-date]').forEach(el=>el.addEventListener('change',()=>{state.vanParkingUpdated=el.value||defaultOperationDate();persist();render();toast('Parking map date updated');}));
  document.querySelectorAll('[data-charging-check-date]').forEach(el=>el.addEventListener('change',()=>{state.chargingStationChecked=el.value||'';persist();render();toast('Charging station check date updated');}));
  document.querySelectorAll('[data-parking-notes]').forEach(el=>el.addEventListener('input',()=>{state.parkingNotes=el.value;persist();}));
  document.querySelectorAll('[data-parking-kind]').forEach(el=>el.addEventListener('change',()=>updateParkingKind(el.dataset.parkingKind,el.value)));
  document.querySelectorAll('[data-device-sheet-field]').forEach(el=>{
    el.addEventListener('input',()=>{
      const clean=String(el.value||'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,el.dataset.deviceSheetField==='device'?3:4);
      if(el.value!==clean)el.value=clean;
      updateDeviceSheetCell(el.dataset.deviceSheetId,el.dataset.deviceSheetField,clean);
    });
    el.addEventListener('change',()=>persist());
    el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();moveDeviceEntryDown(el);}});
  });
  document.querySelectorAll('[data-device-custom-field]').forEach(el=>{
    el.addEventListener('input',()=>{
      const field=el.dataset.deviceCustomField,clean=field==='label'?String(el.value||'').toUpperCase().replace(/[^A-Z0-9 -]/g,'').slice(0,28):String(el.value||'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,field==='device'?3:4);
      if(el.value!==clean)el.value=clean;
      updateCustomDeviceRow(el.dataset.deviceCustomUid,field,clean);
    });
    el.addEventListener('change',()=>persist());
    el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();moveDeviceEntryDown(el);}});
  });
  document.querySelectorAll('.morning-template-sheet [data-edit-field]').forEach(el=>{
    el.addEventListener('focus',()=>{if(!sheetSelection.dragging&&(!state.copyMode||sheetCopyZone(el.dataset.sheetCol)))selectSheetCell(el);if(el.dataset.editField==='driver')showDriverNameSuggestions(el);});
    if(el.dataset.editField==='driver'){
      el.addEventListener('input',()=>showDriverNameSuggestions(el));
      el.addEventListener('mouseenter',()=>{clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;});
      el.addEventListener('mouseleave',()=>scheduleDriverSuggestionsClose(320));
    }
    el.addEventListener('pointerdown',e=>handleSheetMouseDown(e,el));
    el.addEventListener('pointerenter',()=>handleSheetMouseEnter(el));
    el.addEventListener('blur',()=>{saveMorningEditCell(el);if(el.dataset.editField==='driver')scheduleDriverSuggestionsClose();});
    el.addEventListener('keydown',e=>handleSheetKeydown(e,el));
    el.addEventListener('paste',e=>handleSheetPaste(e,el));
  });
  document.querySelectorAll('.morning-template-sheet [data-view-field]').forEach(el=>{
    el.addEventListener('dblclick',e=>{if(!state.editMode&&!state.copyMode){e.preventDefault();startMorningCellEdit(el);}});
  });
  document.querySelectorAll('[data-sheet-copy-cell]').forEach(el=>{
    el.addEventListener('focus',()=>{if(!sheetSelection.dragging&&(!state.copyMode||sheetCopyZone(el.dataset.sheetCol)))selectSheetCell(el);});
    el.addEventListener('pointerdown',e=>handleSheetMouseDown(e,el));
    el.addEventListener('pointerenter',()=>handleSheetMouseEnter(el));
    el.addEventListener('keydown',e=>handleSheetKeydown(e,el));
  });
  if(state.page==='morning') {
    document.addEventListener?.('mousemove',handleSheetPointerMove);
    document.addEventListener?.('pointermove',handleSheetPointerMove);
    document.addEventListener?.('mouseup',stopSheetDrag);
    document.addEventListener?.('pointerup',stopSheetDrag);
    document.addEventListener?.('copy',handleSheetSelectionCopy);
  }
  document.querySelectorAll('[data-check-field]').forEach(el=>el.addEventListener('change',()=>{let route=state.morningRoutes.find(r=>r.route===el.dataset.checkRoute);if(!route&&el.checked)route=createManualMorningRoute({wave:el.dataset.checkWave||'Manual'});if(route){route[el.dataset.checkField]=el.checked;persist();}}));
  const search = document.getElementById('global-search');
  if (search) search.addEventListener('input',e=>{state.search=e.target.value;updateGlobalSearchResults();});
  const dz=document.getElementById('drop-zone');
  if (dz) {
    ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag');}));
    dz.addEventListener('drop',e=>{if(e.dataTransfer.files.length) readFiles([...e.dataTransfer.files]);});
  }
  const equipmentText=document.getElementById('equipment-paste-text');
  if(equipmentText) equipmentText.addEventListener('input',e=>{state.equipmentText=e.target.value;state.equipmentImport=null;});
  const fleetPaste=document.getElementById('fleet-paste-text');
  if(fleetPaste) fleetPaste.addEventListener('input',e=>{state.fleetPasteText=e.target.value;});
  const parkingPaste=document.getElementById('parking-paste-text');
  if(parkingPaste) parkingPaste.addEventListener('input',e=>{state.vanParkingPasteText=e.target.value;});
  const parkingDrop=document.getElementById('parking-drop');
  if(parkingDrop) {
    ['dragenter','dragover'].forEach(ev=>parkingDrop.addEventListener(ev,e=>{e.preventDefault();parkingDrop.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>parkingDrop.addEventListener(ev,e=>{e.preventDefault();parkingDrop.classList.remove('drag');}));
    parkingDrop.addEventListener('drop',e=>{const files=[...e.dataTransfer.files];if(files.length) readParkingFiles(files);});
  }
  const equipmentDrop=document.getElementById('equipment-drop');
  if(equipmentDrop) {
    ['dragenter','dragover'].forEach(ev=>equipmentDrop.addEventListener(ev,e=>{e.preventDefault();equipmentDrop.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>equipmentDrop.addEventListener(ev,e=>{e.preventDefault();equipmentDrop.classList.remove('drag');}));
    equipmentDrop.addEventListener('drop',e=>{const files=[...e.dataTransfer.files];if(files.length) readEquipmentFiles(files);});
    equipmentDrop.addEventListener('paste',e=>handleEquipmentPaste(e));
    const chooseScreenshots=equipmentDrop.querySelector('[data-action="choose-file"]');
    if(chooseScreenshots)chooseScreenshots.innerHTML=`${ICONS.upload} Choose screenshot(s)`;
    const pasteSheetButton=document.createElement('button');
    pasteSheetButton.className='btn lime equipment-clipboard-button';pasteSheetButton.type='button';pasteSheetButton.innerHTML=`${ICONS.copy} Paste copied Google Sheet`;
    pasteSheetButton.addEventListener('click',importEquipmentFromClipboard);
    equipmentDrop.appendChild(pasteSheetButton);
  }
  if(state.modal==='equipment') document.addEventListener?.('paste',handleEquipmentPaste);
}

function readEquipmentFiles(files) {
  state.importPurpose='equipment';
  if([...files].some(file=>/^image\//.test(file.type)||/\.(png|jpe?g|webp)$/i.test(file.name||''))) toast('Reading VAN/DEV/PORT screenshot · this can take a few seconds');
  return readFiles(files);
}

function mergeEquipmentImport(name='',details={},text='') {
  const previous=state.equipmentImport||{name:'',details:{}};
  const names=[previous.name,name].filter(Boolean).filter((value,index,list)=>list.indexOf(value)===index);
  state.equipmentImport={name:names.join(' + '),details:{...(previous.details||{}),...details}};
  if(text.trim())state.equipmentText=[state.equipmentText,text].filter(Boolean).join('\n');
  return Object.keys(state.equipmentImport.details).length;
}

async function importEquipmentFromClipboard() {
  try {
    const text=await navigator.clipboard.readText();
    if(!text.trim())return toast('Clipboard is empty — copy the VAN / DEVICE / PORTABLE cells in Google Sheets first','error');
    const rows=rowsFromPastedTable(text),details={...equipmentDetailsFromText(text),...equipmentDetailsFromRows(rows)};
    const count=Object.keys(details).length;
    if(!count)return toast('No VAN / DEVICE / PORTABLE rows found — include the header row when copying','error');
    mergeEquipmentImport('Copied Google Sheet',details,text);
    persist();
    return applyEquipmentImport();
  } catch {
    toast('Clipboard permission was blocked — click the import box and press ⌘V or Ctrl+V instead','error');
  }
}

function readParkingFiles(files) {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  state.importPurpose='parking';
  return readFiles(files);
}

function updateParkingSlot(id,value,rerender=true) {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const slot=(state.vanParking||[]).find(s=>s.id===id);
  if(!slot)return;
  slot.value=String(value||'').trim().toUpperCase();
  state.selectedParkingId=id;
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  if(rerender)persist();
  else persistSoon();
  if(rerender)render();
}

function selectParkingSlot(id,rerender=true) {
  if(PARKING_ONLY_VIEW)return;
  if(!id)return;
  state.selectedParkingId=id;
  persist();
  if(rerender)render();
}

function updateParkingBattery(id,value) {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const clean=String(value||'').replace(/[^\d]/g,'').slice(0,3);
  const n=clean===''?'':Math.max(0,Math.min(100,Number(clean)));
  state.vanParkingBatteries={...(state.vanParkingBatteries||{}),[id]:n};
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persistSoon();
}
function toggleParkingCharger(key='') {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  if(!key)return;const current=state.parkingChargerStatus[key]||'unknown',next=current==='unknown'?'green':current==='green'?'red':'unknown';
  state.parkingChargerStatus={...(state.parkingChargerStatus||{}),[key]:next};state.vanParkingUpdated=defaultOperationDate();persist();render();toast(next==='green'?'Charger marked working / charging':next==='red'?'Charger marked issue':'Charger status cleared',next==='red'?'error':'success');
}
function parkingChargerReportSpot(key='') {
  const middle=String(key).match(/^middle-(\d+)-(left|right)$/);if(middle){const index=Number(middle[1])-1,zone=middle[2]==='left'?'west':'east';return {spot:String(parkingSpotNumber(zone,index)||''),chargePort:`${middle[2]==='left'?'Left':'Right'} charger ${middle[1]}`};}
  const upper=String(key).match(/^upper-(.+)$/);if(upper){const slot=(state.vanParking||[]).find(row=>row.id===upper[1]),zone=slot?.zone||'',index=parkingSlots(zone).findIndex(row=>row.id===upper[1]);return {spot:index>=0?String(parkingSpotNumber(zone,index)||''):'',chargePort:slot?.label||'Upper charger'};}
  return {spot:'',chargePort:''};
}
function openChargerReport(key='') {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const issueKey=key||Object.entries(state.parkingChargerStatus||{}).find(([,status])=>status==='red')?.[0]||'',location=parkingChargerReportSpot(issueKey),previous=[...(state.chargerReports||[])].reverse().find(report=>report.chargerKey===issueKey);
  state.pendingChargerReport={key:issueKey,company:'LLOL',chargePort:location.chargePort||previous?.chargePort||'',parkingSpot:location.spot||previous?.parkingSpot||'',stationId:previous?.stationId||'',lights:'',color:'',vanPlugged:'',display:'',replugged:'',restored:'',otherVan:'',testResult:'',concern:''};state.modal='charger-report';render();
}
function chargerReportModalValue(id='') { return String(document.getElementById(id)?.value||'').trim(); }
function chargerReportFromModal() {
  return {company:'LLOL',chargePort:chargerReportModalValue('charger-report-port'),parkingSpot:chargerReportModalValue('charger-report-spot'),stationId:chargerReportModalValue('charger-report-station'),lights:chargerReportModalValue('charger-report-lights'),color:chargerReportModalValue('charger-report-color'),vanPlugged:chargerReportModalValue('charger-report-plugged'),display:chargerReportModalValue('charger-report-display'),replugged:chargerReportModalValue('charger-report-replugged'),restored:chargerReportModalValue('charger-report-restored'),otherVan:chargerReportModalValue('charger-report-other-van'),testResult:chargerReportModalValue('charger-report-test'),concern:chargerReportModalValue('charger-report-concern')};
}
function chargerReportTemplate(report={}) {
  return `Company: LLOL\nCharge Port: ${report.chargePort||''}\nParking spot: ${report.parkingSpot||''}\nStation ID: ${report.stationId||''}\nLights illuminated: ${report.lights||''}\nColor: ${report.color||''}\nVan plugged in: ${report.vanPlugged||''}\nCharger port displays: ${report.display||''}\nUnplugged/replugged: ${report.replugged||''}\nRestored: ${report.restored||''}\nTried another van: ${report.otherVan||''}\nTest result: ${report.testResult||''}\nConcern: ${report.concern||''}`;
}
function updateChargerReportPreview() {
  const preview=document.getElementById('charger-report-preview');if(!preview)return;
  const report=chargerReportFromModal();state.pendingChargerReport={...(state.pendingChargerReport||{}),...report};preview.value=chargerReportTemplate(report);
}
async function copyChargerReportAndOpenSlack() {
  const report=chargerReportFromModal(),room=chargerReportModalValue('charger-report-slack-room')||'https://app.slack.com/client';let url;
  if(!report.chargePort&&!report.parkingSpot)return toast('Enter a Charge Port or parking spot before opening Slack','error');
  if(!report.concern)return toast('Describe the charger concern before opening Slack','error');
  try{url=new URL(room);if(url.protocol!=='https:'||url.username||url.password||!(url.hostname==='app.slack.com'||url.hostname.endsWith('.slack.com')))throw new Error();url.search='';url.hash='';}catch(error){return toast('Paste a valid Slack room URL from app.slack.com or your workspace','error');}
  state.slackReportRoomUrl=url.toString();state.pendingChargerReport={...(state.pendingChargerReport||{}),...report};saveChargerReport(report,'copy-open');const popup=window.open(url.toString(),'_blank','noopener,noreferrer');const copied=await writeClipboardText(chargerReportTemplate(report));
  if(!popup&&copied)return toast('Report copied · Slack popup was blocked, so open the saved room and paste it','error');
  if(popup&&!copied)return toast('Slack opened, but clipboard access was blocked — copy the preview manually','error');
  if(!popup&&!copied)return toast('Slack and clipboard were blocked — copy the preview manually','error');
  toast('Charger report copied · paste it into the opened Slack room');return true;
}
function saveChargerReport(report={},handoff='saved') {
  const chargerKey=String(state.pendingChargerReport?.key||''),createdAt=new Date().toISOString(),record=normalizeChargerReports([{...report,id:globalThis.crypto?.randomUUID?.()||`charger-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,chargerKey,createdAt,createdBy:state.cloudUser||'Dispatcher',handoff}])[0];
  state.chargerReports=[...(state.chargerReports||[]),record].slice(-200);
  if(chargerKey)state.parkingChargerStatus={...(state.parkingChargerStatus||{}),[chargerKey]:'red'};
  state.vanParkingUpdated=defaultOperationDate();persist();return record;
}
async function copyChargerReportOnly() {
  const report=chargerReportFromModal();
  if(!report.chargePort&&!report.parkingSpot)return toast('Enter a Charge Port or parking spot before copying','error');
  if(!report.concern)return toast('Describe the charger concern before copying','error');
  const copied=await writeClipboardText(chargerReportTemplate(report));if(!copied)return toast('Clipboard access was blocked — copy the preview manually','error');
  saveChargerReport(report,'copied');render();toast('Charging station report saved and copied for Slack');return true;
}

function updateParkingKind(id,kind='spot') {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const slot=(state.vanParking||[]).find(s=>s.id===id);
  if(!slot)return;
  slot.kind=kind;
  if(kind==='blocked'&&!slot.value)slot.value='X';
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();render();
}

function addParkingSpot() {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const id=`manual-${Date.now().toString().slice(-6)}`;
  const slot={id,zone:'crosswalk',label:`Manual spot ${parkingSlots('crosswalk').length+1}`,value:'',kind:'crosswalk',manual:true};
  state.vanParking=[...(state.vanParking||[]),slot];
  state.selectedParkingId=id;
  state.parkingMode='manual';
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();render();
  toast('Temporary parking spot added to the crosswalk');
}

function removeSelectedParkingSpot() {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const slot=selectedParkingSlot();
  if(!slot)return toast('No parking spot selected','error');
  if(!slot.manual) {
    slot.value='';
    delete state.vanParkingBatteries?.[slot.id];
    state.selectedParkingId=slot.id;
    state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
    persist();render();
    return toast('Base spot cleared. Only temporary spots can be removed.');
  }
  state.vanParking=(state.vanParking||[]).filter(s=>s.id!==slot.id);
  delete state.vanParkingBatteries?.[slot.id];
  state.selectedParkingId='';
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();render();
  toast('Temporary parking spot removed');
}

function setParkingMode(mode='manual') {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  state.parkingMode=mode;
  if(mode==='auto') {
    state.vanParking=defaultVanParkingSlots();
    state.selectedParkingId='';
    state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
    persist();render();
    return toast('Auto layout restored to the base parking map');
  }
  persist();render();
  toast(`${mode[0].toUpperCase()+mode.slice(1)} parking mode on`);
}

function parkingImportValuesFromText(text='') {
  const rows=rowsFromPastedTable(text);
  if(rows.length) {
    const values=[];
    rows.forEach(row=>{
      const cells=row.map(cell=>String(cell||'').trim()).filter(Boolean);
      if(!cells.length)return;
      if(cells.some(cell=>/^(spot|parking|location|van|ev|vehicle|street|row)$/i.test(headerKey(cell))))return;
      const vanCell=cells.find(cell=>/^(?:ev|van|vehicle)\s*[:#-]?\s*[A-Z0-9()/-]+$/i.test(cell))||cells.find(cell=>/^[A-Z]?\d{1,3}(?:\(\d{1,3}%\))?$|^[FRH]\d{1,3}$|^X$/i.test(cell));
      if(vanCell) values.push(vanCell.replace(/^(?:ev|van|vehicle)\s*[:#-]?\s*/i,'').toUpperCase());
    });
    return values;
  }
  return String(text||'').split(/\r?\n|,|\t/).map(v=>v.trim()).filter(Boolean).filter(v=>!/(spot|parking|location|vehicle|van list)/i.test(v)).map(v=>v.toUpperCase());
}

function applyParkingText(text='') {
  if(PARKING_ONLY_VIEW)return 0;
  const values=parkingImportValuesFromText(text);
  if(!values.length) return 0;
  const editable=(state.vanParking||[]).filter(slot=>!['street'].includes(slot.kind)||String(slot.value||'').trim());
  editable.forEach((slot,i)=>{if(values[i]!==undefined)slot.value=values[i];});
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();
  return Math.min(values.length,editable.length);
}

function parseParkingPasteAction() {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  const count=applyParkingText(state.vanParkingPasteText);
  render();
  toast(count?`${count} parking spot${count===1?'':'s'} filled`:'No EV parking values found — paste one EV number per row',count?'success':'error');
}

function parkingListText() {
  return (state.vanParking||[]).map(slot=>`${slot.label}\t${slot.value||''}\t${parkingBatteryForSlot(slot)}`).join('\n');
}

async function copyParkingList() {
  const ok=await writeClipboardText(parkingListText());
  toast(ok?'Van parking list copied for Google Sheets / chat':'Clipboard blocked — try again from the button',ok?'success':'error');
  return ok;
}

function resetVanParking() {
  if(PARKING_ONLY_VIEW)return toast('Fleet team view is read-only and limited to Van Parking','error');
  state.vanParking=defaultVanParkingSlots();
  state.vanParkingUpdated='7/6';
  state.vanParkingPasteText='';
  state.parkingChargerStatus={};
  state.parkingNotes='';
  state.selectedParkingId='';
  state.parkingMode='manual';
  persist();render();
  toast('Van Parking reset to the mockup layout');
}

function handleEquipmentPaste(e) {
  if(state.modal!=='equipment')return;
  const files=[...(e.clipboardData?.files||[])];
  if(files.length){e.preventDefault();return readEquipmentFiles(files);}
  const text=e.clipboardData?.getData('text/plain')||'';
  if(text&&document.activeElement?.id!=='equipment-paste-text') {
    e.preventDefault();
    const details=equipmentDetailsFromText(text);
    const total=mergeEquipmentImport('Pasted VAN/DEV/PORT text',details,text);
    render();
    toast(`${total} EV/VAN assignments ready across all uploads`);
  }
}

function startMorningCellEdit(source) {
  const route=source.dataset.viewRoute||'',uid=source.dataset.viewUid||'', field=source.dataset.viewField||'', wave=source.dataset.viewWave||'',section=source.dataset.viewSection||'';
  if(!field)return;
  state.editMode=true;state.copyMode=false;
  render();
  const target=[...document.querySelectorAll('.morning-template-sheet [data-edit-field]')].find(cell=>cell.dataset.editField===field&&(field==='waveTime'?cell.dataset.editSection===section:field==='padOverride'?cell.dataset.editWave===wave:uid?cell.dataset.editUid===uid:cell.dataset.editRoute===route));
  if(!target)return;
  if(field==='driver'){const morningRoute=morningRouteByUid(uid)||state.morningRoutes.find(row=>row.route===route);if(morningRoute)target.textContent=driverDisplayValue(morningRoute.driver||'');}
  target.focus({preventScroll:true});
  if(field==='driver')showDriverNameSuggestions(target);
  selectSheetCell(target);
  const range=document.createRange();range.selectNodeContents(target);range.collapse(false);
  const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
  target.scrollIntoView({block:'nearest',inline:'nearest'});
}

function saveMorningEditCell(el) {
  const value=el.textContent.trim(), field=el.dataset.editField;
  if(!field)return null;
  if(field==='waveTime') {
    pushSheetHistory(`Edit ${el.dataset.editSection||el.dataset.editWave||'wave'} time and total`,'both');
    saveMorningWaveTimeValue(el.dataset.editSection||'',el.dataset.editWave||'',value);
    persist();return null;
  }
  if(el.dataset.editWave&&field==='padOverride') {
    pushSheetHistory(`Edit ${el.dataset.editWave} pad`,'morning');
    state.morningRoutes.filter(r=>r.wave===el.dataset.editWave).forEach(r=>r[field]=value.toUpperCase());
    persist(); return null;
  }
  let route=morningRouteByUid(el.dataset.editUid)||state.morningRoutes.find(r=>r.route===el.dataset.editRoute);
  if(!route&&value) {
    route=createManualMorningRoute({route:field==='route'?value:'',wave:el.dataset.editWave||'Manual'});
    el.dataset.editUid=route.routeUid||'';
    updateSheetRowUid(el,route.routeUid||'');
    updateSheetRowRoute(el,route.route);
  }
  if(route) {
    pushSheetHistory(`Edit ${field} on ${route.route||'manual row'}`,'morning');
    const clean=field==='driver'?canonicalDriverEntryValue(value):['stops','packages'].includes(field)?Number(value)||0:value;
    if(field==='ev'){const parts=String(clean).toUpperCase().split('/').map(part=>part.trim()).filter(Boolean);route.ev=parts[0]||'';if(parts[1])route.helperBag=parts[1];else delete route.helperBag;}
    else if(field==='driver')applyDriverCellEdit(route,value,'Driver cleared in Morning Sheet');
    else route[field]=clean;
    if(field==='ev') {
      fillEquipmentForRoute(route);
      const rowEl=el.closest('tr');
      const deviceCell=rowEl?.querySelector('[data-edit-field="deviceName"]'), portableCell=rowEl?.querySelector('[data-edit-field="portable"]');
      if(deviceCell)deviceCell.textContent=route.deviceName||'';
      if(portableCell)portableCell.textContent=route.portable||'';
      setTimeout(()=>warnDuplicateMorningEquipment(route.ev),0);
    }
    if(field==='deviceName'||field==='portable')recalculateEquipmentReadiness();
    if(field==='route'&&value) { route.route=value; updateSheetRowRoute(el,value); }
    if(field==='plannedRts') {
      route.plannedRtsIssue=isIrregularPlannedRts(value,route.wave,route.duration);
      el.classList.toggle('flag-cell',route.plannedRtsIssue);
    }
  }
  persist();
  return route;
}
let driverSuggestionCloseTimer=null;
function closeDriverSuggestions() { clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;document.querySelector?.('.driver-name-suggestions')?.remove(); }
function scheduleDriverSuggestionsClose(delay=140) { clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=setTimeout(closeDriverSuggestions,delay); }
function handleDriverSuggestionPointerMove(event) {
  const box=document.querySelector?.('.driver-name-suggestions');if(!box)return;
  const target=event?.target,anchor=box._driverSuggestionAnchor;
  if(box.contains?.(target)||anchor?.contains?.(target)){clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;return;}
  scheduleDriverSuggestionsClose(80);
}
function driverSuggestionSegment(value='') {
  const text=String(value||''),match=text.match(/^(.*(?:\+|\||&|\band\b)\s*)([^+|&]*)$/i);
  return {prefix:match?.[1]||'',query:String(match?.[2]??text).trim()};
}
function driverNameDistance(a='',b='') {
  a=nameKey(a);b=nameKey(b);const row=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let prior=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const saved=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prior+(a[i-1]===b[j-1]?0:1));prior=saved;}}
  return row[b.length];
}
function driverSuggestionScore(name='',query='') {
  const candidate=nameKey(name),q=nameKey(query);if(!q)return 100;
  if(candidate===q)return 0;if(candidate.startsWith(q))return 5;if(candidate.split(' ').some(part=>part.startsWith(q)))return 10;
  if(candidate.includes(q))return 20;
  const first=candidate.split(' ')[0]||'',qFirst=q.split(' ')[0]||'',distance=driverNameDistance(candidate,q);
  return 40+Math.min(distance,20)+(first.startsWith(qFirst)||qFirst.startsWith(first)?0:15);
}
function showDriverNameSuggestions(el) {
  const isDriverCell=el.dataset.editField==='driver'||el.dataset.picklistField==='driver'||el.dataset.driverNameInput==='true';
  if(!isDriverCell)return;
  closeDriverSuggestions();
  const current=el.matches?.('input,textarea')?el.value:el.textContent,{prefix,query}=driverSuggestionSegment(current),names=[...new Set(teamDriverRows().map(row=>row.name))],matches=names.map(name=>({name,score:driverSuggestionScore(name,query)})).sort((a,b)=>a.score-b.score||a.name.localeCompare(b.name)).slice(0,9).map(item=>item.name);
  if(!matches.length)return;
  const box=document.createElement('div'),rect=el.getBoundingClientRect(),width=Math.min(Math.max(220,rect.width),Math.max(220,window.innerWidth-16));
  box.className='driver-name-suggestions';box.setAttribute('role','listbox');box.setAttribute('aria-label','Suggested driver names');box._driverSuggestionAnchor=el;
  box.style.width=`${width}px`;box.style.left=`${Math.max(8,Math.min(rect.left,window.innerWidth-width-8))}px`;box.style.top=`${rect.bottom+4}px`;
  box.innerHTML=`<small>Suggested names · type to narrow</small>${matches.map(name=>`<button type="button" role="option" data-suggest-driver="${esc(name)}"><b>${esc(name)}</b><span>${esc(compactDriverName(name))}</span></button>`).join('')}`;document.body.appendChild(box);
  const popupHeight=Math.min(300,box.scrollHeight);if(rect.bottom+4+popupHeight>window.innerHeight-8)box.style.top=`${Math.max(8,rect.top-popupHeight-4)}px`;
  box.addEventListener('mouseenter',()=>{clearTimeout(driverSuggestionCloseTimer);driverSuggestionCloseTimer=null;});box.addEventListener('mouseleave',()=>scheduleDriverSuggestionsClose(250));
  box.querySelectorAll('[data-suggest-driver]').forEach(button=>button.addEventListener('mousedown',event=>{event.preventDefault();const value=`${prefix}${button.dataset.suggestDriver}`.trim();if(el.matches?.('input,textarea')){el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}else{el.textContent=value;if(el.dataset.editField==='driver')saveMorningEditCell(el);if(el.dataset.picklistField==='driver')saveOpeningPicklistCell(el);}closeDriverSuggestions();el.focus();}));
}

function updateSheetRowRoute(el,route) {
  el.parentElement?.querySelectorAll('[data-edit-route]').forEach(cell=>{cell.dataset.editRoute=route;});
}
function updateSheetRowUid(el,uid) { el.parentElement?.querySelectorAll('[data-edit-field]').forEach(cell=>{cell.dataset.editUid=uid;}); }

function sheetCells() { return [...document.querySelectorAll('[data-sheet-cell="true"]')]; }
function sheetCopyZone(col) {
  const n=Number(col);
  if(n>=0&&n<=7)return [0,7];
  if(n===8)return [8,8];
  if(n>=9&&n<=12)return [9,12];
  if(n===13)return [13,13];
  if(n>=14&&n<=21)return [14,21];
  return null;
}
function inSameSheetBoundary(anchor,cell) {
  if(!anchor||!cell)return false;
  if(state.copyMode) {
    const anchorZone=sheetCopyZone(anchor.dataset.sheetCol), cellZone=sheetCopyZone(cell.dataset.sheetCol);
    if(!anchorZone||!cellZone)return false;
    return anchorZone[0]===cellZone[0]&&anchorZone[1]===cellZone[1];
  }
  return true;
}
function clampSheetFocus(anchor,focus) {
  if(!anchor||!focus)return focus;
  if(!state.copyMode)return focus;
  const zone=sheetCopyZone(anchor.dataset.sheetCol);
  if(!zone)return anchor;
  const pos=cellPosition(focus);
  const col=Math.max(zone[0],Math.min(zone[1],pos.col));
  return cellAt(pos.row,col,anchor.dataset.sheetSection)||sheetSelection.focus||anchor;
}
function sheetSelectionBounds() {
  if(!sheetSelection.anchor||!sheetSelection.focus)return null;
  const a=cellPosition(sheetSelection.anchor), f=cellPosition(sheetSelection.focus);
  if(a.row<0||a.col<0||f.row<0||f.col<0)return null;
  const zone=state.copyMode?sheetCopyZone(a.col):null;
  const left=Math.min(a.col,f.col), right=Math.max(a.col,f.col);
  return {top:Math.min(a.row,f.row),bottom:Math.max(a.row,f.row),left:zone?Math.max(zone[0],left):left,right:zone?Math.min(zone[1],right):right,section:state.copyMode?null:sheetSelection.anchor.dataset.sheetSection};
}
function selectedSheetCells() {
  const bounds=sheetSelectionBounds();
  if(!bounds)return [];
  const cells=[];
  for(let row=bounds.top;row<=bounds.bottom;row++) {
    for(let col=bounds.left;col<=bounds.right;col++) {
      const cell=cellAt(row,col,bounds.section);
      if(cell)cells.push(cell);
    }
  }
  return cells;
}
function applySheetSelection() {
  sheetCells().forEach(cell=>cell.classList.remove('sheet-active-cell','sheet-selected-cell','sheet-selected-wave'));
  document.querySelectorAll('.wave-pulse').forEach(el=>el.classList.remove('wave-pulse'));
  selectedSheetCells().forEach(cell=>cell.classList.add('sheet-selected-cell'));
  const section=sheetSelection.focus?.dataset?.sheetSection;
  if(!state.copyMode&&section!==undefined) document.querySelectorAll(`[data-sheet-section="${section}"], .wave-section-${section}`).forEach(el=>el.classList.add('sheet-selected-wave'));
  sheetSelection.focus?.classList.add('sheet-active-cell');
}
function selectSheetCell(el) {
  sheetCells().forEach(cell=>cell.classList.remove('sheet-active-cell','sheet-selected-cell','sheet-selected-wave'));
  document.querySelectorAll('.wave-pulse').forEach(el=>el.classList.remove('wave-pulse'));
  el.classList.add('sheet-active-cell','sheet-selected-cell');
  const section=el.dataset?.sheetSection;
  if(!state.copyMode&&section!==undefined) document.querySelectorAll(`[data-sheet-section="${section}"], .wave-section-${section}`).forEach(item=>item.classList.add('sheet-selected-wave'));
  sheetSelection={anchor:el,focus:el,dragging:false};
}
function handleSheetMouseDown(e,el) {
  if(state.editMode&&el.isContentEditable&&!e.shiftKey) {
    sheetSelection={anchor:el,focus:el,dragging:false};
    applySheetSelection();
    return;
  }
  e.preventDefault();
  if(state.copyMode&&!sheetCopyZone(el.dataset.sheetCol))return;
  sheetSelection={anchor:e.shiftKey&&sheetSelection.anchor?sheetSelection.anchor:el,focus:el,dragging:true};
  el.focus({preventScroll:true});
  applySheetSelection();
}
function handleSheetMouseEnter(el) {
  if(!sheetSelection.dragging)return;
  if(!inSameSheetBoundary(sheetSelection.anchor,el))return;
  sheetSelection.focus=clampSheetFocus(sheetSelection.anchor,el);
  applySheetSelection();
}
function handleSheetPointerMove(e) {
  if(!sheetSelection.dragging)return;
  const el=document.elementFromPoint?.(e.clientX,e.clientY)?.closest?.('[data-sheet-cell="true"]');
  if(!el||el===sheetSelection.focus)return;
  if(!inSameSheetBoundary(sheetSelection.anchor,el))return;
  sheetSelection.focus=clampSheetFocus(sheetSelection.anchor,el);
  applySheetSelection();
}
function stopSheetDrag() {
  if(sheetSelection.dragging)sheetSelection.dragging=false;
}
function focusSheetCell(el) {
  if(!el)return;
  el.focus({preventScroll:true});
  selectSheetCell(el);
  const range=document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const selection=window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  el.scrollIntoView({block:'nearest',inline:'nearest'});
}
function cellPosition(el) {
  if(el.dataset.sheetRow!==undefined&&el.dataset.sheetCol!==undefined)return {row:Number(el.dataset.sheetRow),col:Number(el.dataset.sheetCol)};
  const row=[...el.parentElement.parentElement.querySelectorAll('tr.ops-row')].indexOf(el.parentElement);
  const col=sheetEditFields.indexOf(el.dataset.editField);
  return {row,col};
}
function cellAt(row,col,section=null) {
  if(row<0||col<0)return null;
  const sectionSelector=section!==null&&section!==undefined?`[data-sheet-section="${section}"]`:'';
  const copyCell=document.querySelector(`[data-sheet-copy-cell="true"][data-sheet-row="${row}"][data-sheet-col="${col}"]${sectionSelector}`);
  if(copyCell)return copyCell;
  const rows=[...document.querySelectorAll('tr.ops-row')];
  const field=sheetEditFields[col];
  return rows[row]?.querySelector(`[data-edit-field="${field}"]`)||null;
}
function moveSheetCell(el,dr,dc) {
  if(el.dataset.editField)saveMorningEditCell(el);
  if(dc) {
    const rowCells=[...el.parentElement.querySelectorAll('[data-sheet-cell="true"]')];
    const next=rowCells[rowCells.indexOf(el)+dc];
    return focusSheetCell(next||el);
  }
  const pos=cellPosition(el);
  focusSheetCell(cellAt(pos.row+dr,pos.col+dc)||el);
}
function selectedSheetTsv() {
  const bounds=sheetSelectionBounds();
  if(!bounds)return '';
  const rows=[];
  for(let row=bounds.top;row<=bounds.bottom;row++) {
    const values=[];
    for(let col=bounds.left;col<=bounds.right;col++) values.push(cellAt(row,col,bounds.section)?.textContent.trim()||'');
    rows.push(values.join('\t'));
  }
  return rows.join('\n');
}
function copySelectedSheetCells() {
  const text=selectedSheetTsv();
  if(!text){toast('Select cells first — drag a blue box in Copy mode, then copy again','error');return false;}
  state.sheetCopyText=text;
  writeClipboardTable(text,selectedSheetHtml()||tsvToHtmlTable(text)).then(ok=>toast(ok?`Copied selected ${selectedSheetCells().length} cell${selectedSheetCells().length===1?'':'s'} for Google Sheets`:'Clipboard access was blocked — use the paste box',ok?'':'error'));
  return true;
}
const waveCopyBlocks={all:null,setup:[0,7],counts:[15,16],rts:[20,20]};
const waveCopyBlockLabels={all:'full A–V',setup:'A–H setup',counts:'P–Q counts',rts:'U planned RTS'};
function copyRowsClipboardHtml(items=[],left=0,right=21) {
  const routeRows=items.filter(item=>!item.time&&!item.separator).length;
  let routeIndex=0;
  const body=items.map(item=>{
    const type=item.separator?'separator':item.time?'time':item.row?._blank?'blank':'route';
    const cells=[];
    for(let col=left;col<=right;col++) {
      const value=item.values[col]||'';
      if(type==='separator') { cells.push(clipboardTd(value,col,'separator')); continue; }
      if(col===0&&item.row) {
        if(routeIndex===0) cells.push(clipboardTd(value,col,'wave',`rowspan="${routeRows}"`));
        continue;
      }
      if(col===4&&item.row) {
        if(routeIndex===0) cells.push(clipboardTd(value,col,'pad',`rowspan="${routeRows+(items.some(row=>row.time)?1:0)}"`));
        continue;
      }
      if(col===4&&item.time) continue;
      cells.push(clipboardTd(value,col,sheetSpacerColumns.has(col)?'spacer':type==='time'&&col===0?'time':'cell'));
    }
    if(item.row)routeIndex+=1;
    return clipboardTr(cells.join(''),type);
  }).join('');
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${morningClipboardColgroup(left,right)}${body}</table>`);
}
function copyWaveByIndex(index=0,block='all') {
  const groups=morningSections(filteredMorningRows()).filter(g=>!g.dsp);
  const group=groups[index];
  if(!group)return toast('That wave is not available to copy','error');
  const range=waveCopyBlocks[block]||waveCopyBlocks.all, copyRows=morningCopyRowsForSections([group]);
  const left=range?range[0]:0, right=range?range[1]:21;
  const rows=copyRows.map(item=>item.values.slice(left,right+1).join('\t')).join('\n');
  state.sheetCopyText=rows;
  const sectionIndex=morningSections(filteredMorningRows()).findIndex(s=>s.label===group.label&&s.wave===group.wave);
  document.querySelectorAll('.wave-pulse,.sheet-selected-wave').forEach(el=>el.classList.remove('wave-pulse','sheet-selected-wave'));
  if(sectionIndex>=0) document.querySelectorAll(`[data-sheet-section="${sectionIndex}"], .wave-section-${sectionIndex}`).forEach(el=>el.classList.add('sheet-selected-wave','wave-pulse'));
  const html=range?copyRowsClipboardHtml(copyRows,left,right):morningSheetClipboardHtml([group]);
  writeClipboardTable(rows,html).then(ok=>toast(ok?`Copied ${group.label} ${waveCopyBlockLabels[block]||waveCopyBlockLabels.all} ${morningWaveTimeText(group)} for Google Sheets`:'Clipboard access was blocked — use the paste box',ok?'':'error'));
  return true;
}
function handleSheetSelectionCopy(e) {
  if(state.page!=='morning'||(!state.editMode&&!state.copyMode))return;
  const text=selectedSheetTsv();
  if(!text){toast('Nothing copied — drag to select cells first','error');return;}
  e.preventDefault();
  e.clipboardData?.setData('text/plain',text);
  e.clipboardData?.setData('text/html',selectedSheetHtml()||tsvToHtmlTable(text));
  state.sheetCopyText=text;
  toast(`Copied selected ${selectedSheetCells().length} cell${selectedSheetCells().length===1?'':'s'} for Google Sheets`);
}
function handleSheetKeydown(e,el) {
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='c') return;
  if(state.editMode&&el.isContentEditable&&['ArrowLeft','ArrowRight'].includes(e.key)) return;
  if(e.key==='Enter') {
    e.preventDefault();
    saveMorningEditCell(el);
    state.editMode=false;
    render();
    return toast('Cell saved · editing off');
  }
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
    e.preventDefault();
    const map={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1],Tab:[0,e.shiftKey?-1:1]};
    const [dr,dc]=map[e.key];
    return moveSheetCell(el,dr,dc);
  }
  if(e.key==='Escape') { e.preventDefault(); el.blur(); }
}
function setCellText(el,value) {
  if(!el)return;
  el.textContent=value;
  if(el.dataset.editField)saveMorningEditCell(el);
}
function handleSheetPaste(e,el) {
  const text=e.clipboardData?.getData('text/plain')||'';
  if(!text)return;
  e.preventDefault();
  const rows=text.replace(/\r/g,'').split('\n').filter((row,i,arr)=>row||i<arr.length-1).map(row=>row.split('\t'));
  const start=cellPosition(el);
  rows.forEach((row,r)=>row.forEach((value,c)=>setCellText(cellAt(start.row+r,start.col+c),value.trim())));
  focusSheetCell(cellAt(start.row,start.col)||el);
}

async function shareDispatcherLink() {
  const url=sharedDashboardUrl(),ok=await writeClipboardText(`LLOL Dispatch Opening Operations\n${url}`);
  toast(ok?`Clickable link for ${state.morningOperationDate} copied — every signed-in dispatcher opens the same shared day`:'Clipboard access was blocked — copy the full https:// link from Admin control',ok?'':'error');
  return ok;
}
async function shareFleetParkingLink() {
  const ok=await writeClipboardText(`LLOL Van Parking Map\n${sharedDashboardUrl('parking')}`);
  toast(ok?'Fleet team Van Parking link copied':'Clipboard access was blocked — copy the fleet link from Van Parking',ok?'success':'error');
  return ok;
}
async function cloudSignIn() {
  const email=String(document.getElementById('cloud-signin-email')?.value||'').trim().toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(email))return toast('Enter a complete dispatcher email','error');
  const button=document.querySelector('[data-action="cloud-sign-in"]');
  if(button){button.disabled=true;button.textContent='Sending secure link…';}
  try{await window.RelayOpsCloud.signIn(email);toast(`Secure sign-in link sent to ${email}`);}
  catch(error){toast(`Could not send sign-in link: ${error.message||'check cloud setup'}`,'error');}
  finally{if(button){button.disabled=false;button.textContent='Send sign-in link';}}
}
async function cloudSignOut() {
  try{await window.RelayOpsCloud.signOut();state.modal=null;state.cloudStatus='signed-out';state.cloudUser='';state.role='viewer';localStorage.setItem('relayops_role','viewer');render();toast('Signed out · local cache remains on this device');}
  catch(error){toast(`Could not sign out: ${error.message||'try again'}`,'error');}
}
async function refreshCloudMembers() {
  if(!window.RelayOpsCloud?.session)return [];
  try{state.cloudMembers=await window.RelayOpsCloud.members();const current=state.cloudMembers.find(member=>member.user_id===window.RelayOpsCloud.session.user.id);if(current?.role)state.role=current.role==='owner'&&authenticatedCloudEmail()===ADMIN_OWNER_EMAIL?'admin':current.role==='owner'?'dispatcher':current.role;render();return state.cloudMembers;}
  catch(error){console.warn('Could not load members',error);return[];}
}
async function sendUserInvite() {
  if(!hasOwnerAdminAccess())return toast(`Admin access is restricted to ${ADMIN_OWNER_EMAIL}`,'error');
  const email=String(document.getElementById('invite-user-email')?.value||'').trim().toLowerCase(),displayName=String(document.getElementById('invite-user-name')?.value||'').trim(),role=String(document.getElementById('invite-user-role')?.value||'dispatcher');
  if(!/^\S+@\S+\.\S+$/.test(email))return toast('Enter a complete company email','error');
  try{await window.RelayOpsCloud.inviteMember({email,displayName,role});state.modal=null;await refreshCloudMembers();toast(`${displayName||email} invited as ${role.replace('_',' ')}`);}
  catch(error){toast(`Invitation failed: ${error.message||'check owner access'}`,'error');}
}

function openMemberAccess(userId='') {
  if(!hasOwnerAdminAccess())return toast(`Admin access is restricted to ${ADMIN_OWNER_EMAIL}`,'error');
  const member=(state.cloudMembers||[]).find(item=>item.user_id===userId);
  if(!member)return toast('Member record is no longer available — refresh Admin control','error');
  if(member.role==='owner'||member.user_id===window.RelayOpsCloud?.session?.user?.id)return toast('Owner access is locked for safety','error');
  state.pendingMemberEdit={...member};state.modal='member-access';render();
}
async function saveMemberAccess() {
  if(!hasOwnerAdminAccess())return toast(`Admin access is restricted to ${ADMIN_OWNER_EMAIL}`,'error');
  const member=state.pendingMemberEdit,role=String(document.getElementById('member-access-role')?.value||''),active=String(document.getElementById('member-access-active')?.value||'true')==='true';
  if(!member)return toast('Choose a member first','error');
  if(!['ops_manager','dispatcher','fleet_lead','viewer'].includes(role))return toast('Choose a supported member role','error');
  if(!window.RelayOpsCloud?.updateMemberAccess)return toast('Cloud member controls require the latest Supabase setup','error');
  try{
    await window.RelayOpsCloud.updateMemberAccess({userId:member.user_id,role,active});
    state.pendingMemberEdit=null;state.modal=null;await refreshCloudMembers();toast(`${member.display_name||'Member'} is now ${active?roleLabel(role):'inactive'}`);
  }catch(error){toast(`Member access was not changed: ${error.message||'owner authorization required'}`,'error');}
}

function ensureCoachingRecord(id='') {
  const op=coachingOpportunityById(id);if(!op)return null;
  state.coachingQueue=normalizeCoachingQueue(state.coachingQueue);
  let record=state.coachingQueue.find(item=>item.id===id);
  if(!record){record={id,focus:op.focus,notes:'',status:'draft',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),reviewedAt:'',preparedAt:'',sentAt:'',sentBy:''};state.coachingQueue.push(record);}
  return record;
}
function openCoachingReview(id='',driver='') {
  const op=coachingOpportunityById(id)||COACHING_OPPORTUNITIES.find(item=>item.driver===driver);
  if(!op)return toast('Coaching opportunity is no longer available','error');
  ensureCoachingRecord(op.id);state.pendingCoachingId=op.id;state.modal='coaching-review';persist();render();
}
function coachingDraftFromModal(status='reviewed') {
  const id=state.pendingCoachingId,record=ensureCoachingRecord(id);if(!record)return null;
  record.focus=String(document.getElementById('coaching-review-focus')?.value||record.focus||'').trim();
  record.notes=String(document.getElementById('coaching-review-notes')?.value||record.notes||'').trim();
  record.status=status;record.updatedAt=new Date().toISOString();if(status==='reviewed')record.reviewedAt=record.updatedAt;
  if(status==='ready-manual')record.preparedAt=record.updatedAt;
  if(status==='sent-manual'){record.sentAt=record.updatedAt;record.sentBy=state.cloudUser||'Dispatcher-confirmed';}
  return record;
}
function saveCoachingReview() {
  const record=coachingDraftFromModal('reviewed');if(!record)return toast('Coaching item was not found','error');
  persist();render();toast('Coaching review saved for the dispatcher team');
}
async function copyCoachingReviewedMessage() {
  const record=coachingDraftFromModal('ready-manual'),op=coachingOpportunityById(state.pendingCoachingId);if(!record||!op)return toast('Coaching item was not found','error');
  const ok=await writeClipboardText(coachingMessage(op,record));persist();render();toast(ok?'Reviewed message copied — send it from the dispatch phone':'Clipboard access was blocked; the review is still saved',ok?'':'error');
}
function markCoachingSent() {
  const record=coachingDraftFromModal('sent-manual');if(!record)return toast('Coaching item was not found','error');
  persist();render();toast('Marked sent by dispatcher confirmation');
}
function queueDueCoaching() {
  const directory=new Set(teamDriverRows().map(driver=>driverIdentityKey(driver.name))),due=COACHING_OPPORTUNITIES.filter(item=>/^Due/i.test(item.due)&&directory.has(driverIdentityKey(item.driver))),before=normalizeCoachingQueue(state.coachingQueue).length;
  due.forEach(item=>ensureCoachingRecord(item.id));const added=state.coachingQueue.length-before;persist();render();toast(added?`${added} due coaching item${added===1?'':'s'} added for review`:'All due coaching is already in the review queue');
}
function saveCoachingTemplate() {
  const value=String(document.getElementById('coaching-template-text')?.value||'').trim();if(!value)return toast('Enter a coaching message template','error');
  state.coachingTemplate=value;state.modal=null;persist();render();toast('Shared coaching template saved');
}

function go(page) {
  if (PARKING_ONLY_VIEW && page!=='parking') return toast('Fleet team link only opens Van Parking','error');
  if (page==='admin'&&!hasOwnerAdminAccess()) return toast(`Admin access is restricted to ${ADMIN_OWNER_EMAIL}`,'error');
  cancelDeferredRenders();
  document.body?.classList?.remove('mobile-sidebar-open');
  state.page=page; state.search=''; state.modal=null;if(page==='rostering')syncRosteringHelperShifts(currentRosteringPlan());persist(); render();if(page==='admin')refreshCloudMembers();window.scrollTo({top:0,behavior:'smooth'});
}

function toggleMobileSidebar() {
  const sidebar=document.getElementById('sidebar');if(!sidebar)return;
  const open=sidebar.classList.toggle('open');
  document.body?.classList?.toggle('mobile-sidebar-open',open);
  const trigger=document.querySelector?.('[data-action="menu"]');trigger?.setAttribute?.('aria-expanded',String(open));
  if(open){const nav=sidebar.querySelector?.('nav');if(nav)nav.scrollTop=Math.max(0,nav.scrollTop);}
}

function saveOrganizationSettings() {
  if(!hasOwnerAdminAccess())return toast(`Admin access is restricted to ${ADMIN_OWNER_EMAIL}`,'error');
  const organizationName=document.getElementById('admin-dsp-name')?.value.trim();
  const stationCode=document.getElementById('admin-station-code')?.value.trim().toUpperCase();
  if(!organizationName)return toast('Enter a DSP name','error');
  if(!stationCode)return toast('Enter a station code','error');
  state.organizationName=organizationName;
  state.stationCode=stationCode;
  persist();
  render();
  toast(`${organizationName} · ${stationCode} saved everywhere`);
}

function importAcceptForPurpose(purpose='morning') {
  const spreadsheet='.csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if(purpose==='itinerary-rts')return '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if(purpose==='equipment')return `${spreadsheet},.pdf,.txt,image/*,application/pdf,text/plain`;
  if(purpose==='fleet')return spreadsheet;
  if(purpose==='parking')return `${spreadsheet},.txt,image/*,text/plain`;
  if(purpose==='rostering-screenshot')return '.png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp,image/*';
  if(purpose==='drivers')return `${spreadsheet},.txt,text/plain,application/octet-stream`;
  if(purpose==='whiparound')return spreadsheet;
  return spreadsheet;
}

function action(name,el) {
  if(PARKING_ONLY_VIEW) {
    const allowed=new Set(['menu','copy-parking-list','copy-fleet-parking-link','cloud-account','cloud-sign-in','cloud-sign-out','close-modal']);
    if(!allowed.has(name))return toast('Fleet team view is read-only and limited to Van Parking','error');
  }
  if(OWNER_ADMIN_ACTIONS.has(name)&&!hasOwnerAdminAccess())return toast(`Admin access is restricted to ${ADMIN_OWNER_EMAIL}`,'error');
  if (name==='menu') return toggleMobileSidebar();
  if (name==='opening-paycom-tab') { state.openingRosterPaycomTab=el.dataset.paycomTab==='marked'?'marked':'scheduled';localStorage.setItem('relayops_opening_roster_paycom_tab',state.openingRosterPaycomTab);return render(); }
  if (name==='clear-global-search') { state.search='';render();setTimeout(()=>document.getElementById('global-search')?.focus(),0);return; }
  if (name==='open-global-search-result') {
    const page=el.dataset.searchPage||'dashboard',value=el.dataset.searchValue||'';
    if(page==='fleet'){state.fleetSearch=value;state.fleetFilter='all';}
    state.search='';return go(page);
  }
  if (name==='open-alert-center') { state.modal='alert-center';return render(); }
  if (name==='navigate-alert') return navigateOperationalAlert(el);
  if (name==='achat-quick') return sendAChatMessage(el.dataset.prompt||'');
  if (name==='achat-send') return sendAChatMessage();
  if (name==='achat-clear') return clearAChat();
  if (name==='add-item') return openInventoryItemEditor('');
  if (name==='inventory-edit') return openInventoryItemEditor(el.dataset.inventoryId||'');
  if (name==='save-inventory-item') return saveInventoryItem();
  if (name==='inventory-adjust') return openInventoryAdjustment(el.dataset.inventoryId||'');
  if (name==='save-inventory-adjustment') return saveInventoryAdjustment();
  if (name==='inventory-log') return openInventoryLog();
  if (name==='route') { state.pendingRouteCode=el.dataset.route||'';state.modal='route-details';return render(); }
  if (name==='copy-route-summary') return copyRouteSummary(el.dataset.route||'');
  if (name==='import') { state.modal='import'; state.importSource='computer'; state.importPurpose='morning'; state.importedFile=null; return render(); }
  if (name==='slack-import') return toast('Slack Import is locked until the secure connector is ready','error');
  if (name==='open-morning-diagnostics') { state.modal='morning-diagnostics';return render(); }
  if (name==='planned-rts-import'||name==='itineraries-rts-import') { state.modal='import'; state.importSource='computer'; state.importPurpose='itinerary-rts'; state.importedFile=null; return render(); }
  if (name==='send-rts-to-sheets') return sendRtsTimesToGoogleSheets(el);
  if (name==='send-whiparound-to-sheets') return sendWhiparoundChecksToGoogleSheets(el);
  if (name==='equipment-import') { state.modal='equipment'; state.importPurpose='equipment'; state.equipmentImport=null; return render(); }
  if (name==='fleet-import') { state.modal='fleet-import'; state.importPurpose='fleet'; state.fleetImportSourceHint=''; return render(); }
  if (name==='fleet-import-amazon') { state.importPurpose='fleet';state.fleetImportSourceHint='amazon';fileInput.accept='.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';return fileInput.click(); }
  if (name==='fleet-import-fleetos') { state.importPurpose='fleet';state.fleetImportSourceHint='fleetos';fileInput.accept='.csv,text/csv';return fileInput.click(); }
  if (name==='save-fleet-issue') return saveFleetIssue();
  if (name==='mark-fleet-issue-fixed') return markFleetIssueFixed(el.dataset.issueKey||'',el.dataset.issueId||'');
  if (name==='remove-fleet-issue') return removeFleetIssue(el.dataset.issueKey||'');
  if (name==='open-morning-vehicle-issue') return openMorningVehicleIssue(el.dataset.route||'',el.dataset.equipment||'');
  if (name==='acknowledge-morning-vehicle-issue') return acknowledgeMorningVehicleIssue();
  if (name==='acknowledge-van-issue-inline') return acknowledgeVanIssueInline(el.dataset.route||'',el.dataset.equipment||'');
  if (name==='open-equipment-issue') return openEquipmentIssue(el.dataset.equipmentType||'device',el.dataset.equipmentId||'');
  if (name==='save-equipment-issue') return saveEquipmentIssue();
  if (name==='mark-equipment-issue-fixed') return markEquipmentIssueFixed(el.dataset.equipmentIssueKey||'',el.dataset.equipmentIssueId||'');
  if (name==='driver-import') { state.importPurpose='drivers';fileInput.accept=importAcceptForPurpose('drivers');return fileInput.click(); }
  if (name==='whiparound-import') { state.importPurpose='whiparound';fileInput.accept=importAcceptForPurpose('whiparound');return fileInput.click(); }
  if (name==='whiparound-remind') return openWhiparoundReminder(el.dataset.driverName||'',el.dataset.inspectionType||'pre');
  if (name==='whiparound-not-route') return markWhiparoundNotOnRoute(el.dataset.driverName||'');
  if (name==='whiparound-restore') return restoreWhiparoundDriver(el.dataset.driverKey||'');
  if (name==='add-delivery-associate') { state.modal='add-driver';return render(); }
  if (name==='save-manual-driver') return saveManualDriver();
  if (name==='request-driver-removal') return requestDriverRemoval(el.dataset.driverKey||'');
  if (name==='confirm-driver-removal') return confirmDriverRemoval();
  if (name==='remove-driver-stay-home') return removeDriverStayHomeMark(el.dataset.driverName||'');
  if (name==='toggle-driver-capability') return toggleDriverCapability(el.dataset.driverName||'',el.dataset.capability||'');
  if (name==='open-driver-flags') return openDriverFlags(el.dataset.driverName||'');
  if (name==='save-driver-flags') return saveDriverFlags();
  if (name==='parking-choose-file') { state.importPurpose='parking';fileInput.accept=importAcceptForPurpose('parking');return fileInput.click(); }
  if (name==='report-charging-station') return openChargerReport(el.dataset.chargerKey||'');
  if (name==='copy-charger-report') return copyChargerReportOnly();
  if (name==='copy-open-charger-slack') return copyChargerReportAndOpenSlack();
  if (name==='set-import-source') { state.importSource=el.dataset.source; state.importedFile=null; return render(); }
  if (name==='load-slack-demo') return loadSlackDemo();
  if (name==='close-modal') { state.modal=null;state.pendingDriverRemoval=null;state.pendingDriverText=null;state.pendingRosterSwap=null;state.pendingRosterDestination=null;state.pendingVtoRouteSwap=null;state.pendingRouteTrainer=null;state.pendingRouteVtoSwap=null;state.pendingMorningIssue=null;state.pendingPicklistWaveDelete=null;state.pendingHelperMatch=null;state.pendingDriverAlias=null;state.pendingDriverFlags=null;state.pendingEquipmentIssue=null;state.pendingSheetClear=null;state.pendingMemberEdit=null;state.pendingChargerReport=null;state.pendingRosteringServiceDelete=null;state.pendingRosteringSwap=null;state.pendingRosteringTrainingAdd=null;state.pendingCoachingId='';state.inventoryEditingId='';state.inventoryPendingId='';state.screenshotPreview=null;state.screenshotKind='';state.fleetRefreshPreview=null;return render(); }
  if (name==='choose-file') { fileInput.accept=importAcceptForPurpose(state.importPurpose);return fileInput.click(); }
  if (name==='schedule-import') { state.scheduleImportDestination=state.page==='rostering'?'rostering':'roster';state.importPurpose='schedule';fileInput.accept='.xls,.xlsx,.csv,.pdf,.txt,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/html,text/csv,application/pdf';return fileInput.click(); }
  if (name==='rostering-import-screenshot') { state.importPurpose='rostering-screenshot';fileInput.accept=importAcceptForPurpose('rostering-screenshot');return fileInput.click(); }
  if (name==='rostering-auto-roster') return autoRosterFromPaycom();
  if (name==='rostering-paycom-category') {
    state.rosteringPaycomCategory=el.dataset.rosteringCategory||'all';localStorage.setItem('relayops_rostering_paycom_category',state.rosteringPaycomCategory);
    const panel=el.closest('.rostering-paycom');panel?.querySelectorAll('[data-action="rostering-paycom-category"]').forEach(button=>button.classList.toggle('active',button===el));
    const input=panel?.querySelector('[data-rostering-paycom-search]');if(input)filterRosteringPaycomSoon(input);return;
  }
  if (name==='rostering-focus-training') { document.getElementById('rostering-training-box')?.scrollIntoView?.({behavior:'smooth',block:'center'});return; }
  if (name==='copy-rostering-backup-email') return copyRosteringBackupEmailText();
  if (name==='copy-rostering-email-template') return copyRosteringEmailTemplateText();
  if (name==='rostering-toggle-service') return toggleRosteringService(el.dataset.serviceId||'',el);
  if (name==='rostering-add-service') return addRosteringService();
  if (name==='rostering-adjust-confirmed') return adjustRosteringConfirmed(el.dataset.serviceId||'',Number(el.dataset.delta)||0);
  if (name==='rostering-add-shift') { const service=rosteringService(el.dataset.serviceId||'');if(!service)return;service.confirmed++;addRosteringAssignment(service.id);persistRosteringSlice();renderRosteringContent();return toast('Confirmed shift added'); }
  if (name==='rostering-remove-shift') return removeRosteringAssignment(el.dataset.assignmentId||'');
  if (name==='rostering-clear-associate') return clearRosteringAssociate(el.dataset.assignmentId||'');
  if (name==='rostering-clear-service') return clearRosteringServiceAssociates(el.dataset.serviceId||'');
  if (name==='request-delete-rostering-service') return requestDeleteRosteringService(el.dataset.serviceId||'');
  if (name==='confirm-delete-rostering-service') return confirmDeleteRosteringService();
  if (name==='rostering-fill-paycom') return fillRosteringFromPaycom();
  if (name==='rostering-fill-paycom-service') return fillRosteringFromPaycom(el.dataset.serviceId||'');
  if (name==='rostering-add-paycom-driver') { const entry=scheduleEntriesForDate(state.rosteringDate).find(row=>driverIdentityKey(row.name)===driverIdentityKey(el.dataset.driverName||''));if(!entry)return toast('PAYCOM driver was not found for this date','error');if(!rosteringEntryEligibleForRoster(entry))return toast('This shift is not an available driver route shift','error');const added=addPaycomEntryToRostering(entry);if(!added)return toast('This driver is already on the roster','error');persistRosteringSlice();renderRosteringContent();return toast(`${entry.name} added to the roster`); }
  if (name==='open-rostering-driver-swap') return openRosteringDriverSwap(el.dataset.driverName||'');
  if (name==='apply-rostering-driver-swap') return applyRosteringDriverSwap();
  if (name==='open-rostering-training-add') return openRosteringTrainingAdd(el.dataset.trainingKind||'ridealong');
  if (name==='save-rostering-training-add') return saveRosteringTrainingAdd();
  if (name==='remove-rostering-manual-training') return removeRosteringManualTraining(el.dataset.manualTrainingKey||'');
  if (name==='toggle-driver-card') { const key=driverIdentityKey(el.dataset.driverName||'');state.expandedDriverKey=state.expandedDriverKey===key?'':key;return render(); }
  if (name==='rostering-use-trainer-suggestion') return assignRosteringTrainer(el.dataset.ridealongName||'',el.dataset.trainerName||'');
  if (name==='rostering-swap-trainer') return clearRosteringTrainerMatch(el.dataset.ridealongName||'');
  if (name==='open-roster-destination-actions') return openRosterDestinationActions(el.dataset.driverName||'',el.dataset.driverRole||'',el.dataset.rosterDestination||'',el.dataset.driverRoute||'',el.dataset.driverStart||'',el.dataset.rosterAutomatic||'');
  if (name==='driver-route-context-action') return applyDriverRouteContextAction(el.dataset.routeTarget||'',el);
  if (name==='apply-route-trainer') return applyRouteTrainer();
  if (name==='apply-route-vto-swap') return applyRouteVtoSwap();
  if (name==='apply-roster-destination-action') return applyRosterDestinationAction(el.dataset.rosterTarget||'');
  if (name==='picklist-vto-action') return applyPicklistVtoAction(el.dataset.driverName||'',el.dataset.driverRole||'',el.dataset.vtoTarget||'');
  if (name==='open-vto-route-swap') return openVtoRouteSwap(el.dataset.driverName||'',el.dataset.driverRole||'',el.dataset.vtoLabel||'');
  if (name==='apply-vto-route-swap') return applyVtoRouteSwap();
  if (name==='open-route-swap') return openRosterSwap(el.dataset.route||'',el.dataset.driverName||'',el.dataset.swapMode||'swap',el.dataset.driverLabel||'');
  if (name==='apply-roster-swap') return applyRosterSwap();
  if (name==='leave-route-unassigned') return leaveRosterRouteUnassigned();
  if (name==='mark-paycom-backup') return markPaycomBackup(el.dataset.driverName||'',el.dataset.driverRole||'');
  if (name==='mark-paycom-adhoc') return markPaycomAdhoc(el.dataset.driverName||'',el.dataset.driverRole||'');
  if (name==='mark-paycom-helper') return markPaycomHelper(el.dataset.driverName||'',el.dataset.driverRole||'');
  if (name==='open-helper-match') return openHelperMatch(el.dataset.driverName||'');
  if (name==='apply-helper-match') return applyHelperMatch();
  if (name==='unmatch-helper') return unmatchHelper(el.dataset.driverName||'');
  if (name==='open-driver-alias') return openDriverAlias(el.dataset.driverName||'');
  if (name==='save-driver-alias') return saveDriverAlias();
  if (name==='clear-driver-alias') { const input=document.getElementById('driver-alias-display');if(input)input.value='';return saveDriverAlias(); }
  if (name==='mark-paycom-stay-home') return markPaycomStayHome(el.dataset.driverName||'',el.dataset.driverRole||'');
  if (name==='add-roster-reduction') return addRosterReduction(el.dataset.driverName||'',el.dataset.driverRole||'',el.dataset.driverRoute||'',el.dataset.driverStart||'');
  if (name==='move-reduction-to-backup') return moveReductionToBackup(el.dataset.driverName||'',el.dataset.driverRole||'');
  if (name==='restore-roster-status') return restoreRosterStatus(el.dataset.driverName||'',el.dataset.rosterStatus||'');
  if (name==='clear-team-search') { const input=document.querySelector?.('[data-team-search]');if(input){input.value='';filterTeamDirectory('');input.focus?.();}return; }
  if (name==='toggle-picklist-edit') { state.editMode=!state.editMode;if(state.editMode)state.copyMode=false;render();return toast(state.editMode?'Picklist editing is on — double-click or select a cell':'Picklist edits saved'); }
  if (name==='resize-picklist-area') return resizeOpeningPicklistArea(el.dataset.area||'',el.dataset.delta||0);
  if (name==='request-delete-picklist-wave') return requestDeletePicklistWave(el.dataset.sectionKey||'');
  if (name==='confirm-delete-picklist-wave') return confirmDeletePicklistWave();
  if (name==='assign-helper-bags') return assignHelperBags();
  if (name==='preview-picklist-screenshot') return previewPicklistScreenshot();
  if (name==='print-opening-picklist') return printOpeningPicklistOnePage();
  if (name==='sheet-undo') return undoSheetChange();
  if (name==='sheet-redo') return redoSheetChange();
  if (name==='open-sheet-history') { state.modal='sheet-history';return render(); }
  if (name==='clear-morning-sheet') return requestClearOperationalSheet('morning');
  if (name==='clear-picklist') return requestClearOperationalSheet('picklist');
  if (name==='confirm-clear-operational-sheet') return confirmClearOperationalSheet();
  if (name==='share-dispatcher-link') return shareDispatcherLink();
  if (name==='copy-fleet-parking-link') return shareFleetParkingLink();
  if (name==='cloud-account') { state.modal='cloud-account';return render(); }
  if (name==='cloud-sign-in') return cloudSignIn();
  if (name==='cloud-sign-out') return cloudSignOut();
  if (name==='invite') { if(!window.RelayOpsCloud?.session)return toast('Sign in as the owner before inviting users','error');state.modal='invite-user';return render(); }
  if (name==='send-user-invite') return sendUserInvite();
  if (name==='edit-member-access') return openMemberAccess(el.dataset.memberId||'');
  if (name==='save-member-access') return saveMemberAccess();
  if (name==='text-driver') return openDriverText(el.dataset.driverKey||'',el.dataset.queueKey||'');
  if (name==='next-message-driver') return openNextQueueMessage();
  if (name==='mark-message-sent') return markQueueMessageSent(el.dataset.queueKey||'');
  if (name==='open-google-messages') return copyAndOpenGoogleMessages();
  if (name==='open-sms-app') return openDriverSmsApp();
  if (name==='apply-import') return applyImport();
  if (name==='export-menu') { state.modal='export'; return render(); }
  if (name==='export-csv') return exportCSV();
  if (name==='export-excel') return exportExcel();
  if (name==='export-fleet-csv') return exportFleetCSV();
  if (name==='export-fleet-gaps') return exportFleetGapsCSV();
  if (name==='export-fleetos-missing') return exportMissingFleetosCSV();
  if (name==='export-amazon-missing') return exportMissingAmazonCSV();
  if (name==='copy-fleetos-missing') return copyMissingFleetosVins();
  if (name==='copy-amazon-missing') return copyMissingAmazonVins();
  if (name==='copy-fleet-attention') return copyFleetAttentionList();
  if (name==='copy-charge-recommendations') return copyChargeRecommendations();
  if (name==='copy-parking-list') return copyParkingList();
  if (name==='reset-parking') return resetVanParking();
  if (name==='parse-parking-paste') return parseParkingPasteAction();
  if (name==='clear-selected-parking') { state.selectedParkingId='';persist();render();return toast('Selected van cleared'); }
  if (name==='add-parking-spot') return addParkingSpot();
  if (name==='remove-selected-parking') return removeSelectedParkingSpot();
  if (name==='set-parking-mode') return setParkingMode(el.dataset.mode||'manual');
  if (name==='copy-refresh-missing-vins') return copyRefreshMissingVins();
  if (name==='copy-visible-fleet-vins') return copyVisibleFleetVins();
  if (name==='copy') return copyRows();
  if (name==='template-csv') return downloadTemplate();
  if (name==='equipment-template-csv') return downloadEquipmentTemplate();
  if (name==='fleet-template-csv') return downloadFleetTemplate();
  if (name==='clear-morning-filters') { state.morningFilters={wave:'all',staging:'all',pad:'all'};render();return; }
  if (name==='clear-fleet-search') { cancelDeferredRenders();state.fleetSearch='';state.fleetFilter='all';persist();render();return toast('Showing every EV again'); }
  if (name==='fleet-filter-quick') { state.fleetFilter=el.dataset.filter||'all';state.fleetSearch='';persist();render();return toast(`Fleet filtered: ${state.fleetFilter.replace('-',' ')}`); }
  if (name==='set-fleet-view') { state.fleetView=el.dataset.view||'tiny';persist();render();return toast(`Fleet view: ${fleetViewLabel()}`); }
  if (name==='reset-fleet-demo') return resetFleetDemo();
  if (name==='toggle-morning-edit') { state.editMode=!state.editMode;if(state.editMode)state.copyMode=false;render();return toast(state.editMode?'Editing is on — columns and rows are labeled':'Edits saved'); }
  if (name==='toggle-morning-copy') { state.copyMode=!state.copyMode;if(state.copyMode)state.editMode=false;sheetSelection={anchor:null,focus:null,dragging:false};render();return toast(state.copyMode?'Copy mode is on — drag cells, then press ⌘C/Ctrl+C':'Copy mode off'); }
  if (name==='toggle-fit-rows') { state.fitMorningRows=!state.fitMorningRows;persist();render();return toast(state.fitMorningRows?'Blank rows removed — waves fit driver count':'Template rows restored'); }
  if (name==='toggle-picklist-fit-rows') { state.fitOpeningPicklistRows=!state.fitOpeningPicklistRows;persist();render();return toast(state.fitOpeningPicklistRows?'Blank rows removed from Wave 1–5 · Adhocs kept full size':'Full Wave 1–5 rows restored'); }
  if (name==='assign-ev-low') return assignElectricVehicles('low');
  if (name==='assign-ev-random') return assignElectricVehicles('random');
  if (name==='assign-operational-vans') return assignOperationalVehicles();
  if (name==='clear-morning-evs') return clearMorningVehicleAssignments();
  if (name==='assign-vans-by-parking') return assignVansByParking();
  if (name==='assign-gas-vans') return openGasVehicleAssignment();
  if (name==='toggle-gas-driver') return toggleGasDriver(el.dataset.route||'');
  if (name==='toggle-gas-van') return toggleGasVan(el.dataset.van||'');
  if (name==='apply-gas-assignment') return applyGasVehicleAssignment();
  if (name==='toggle-fleet-card') return toggleFleetCard(el.dataset.vin);
  if (name==='edit-fleet-name') { state.editingFleetVin=el.dataset.vin||'';state.expandedFleetVin=state.editingFleetVin;render();setTimeout(()=>document.querySelector('[data-fleet-name-input]')?.focus(),0);return; }
  if (name==='save-fleet-name') return saveFleetName(el.dataset.vin||'');
  if (name==='cancel-fleet-name') { state.editingFleetVin='';render();return; }
  if (name==='refresh-fleet') return refreshFleetStatus();
  if (name==='fleet-live-setup') return setupFleetLiveConnector();
  if (name==='save-fleet-live-setup') return saveFleetLiveSetup();
  if (name==='approve-fleet-refresh') return approveFleetRefresh();
  if (name==='preview-wave-screenshot') return previewWaveScreenshot();
  if (name==='save-wave-screenshot') return saveWaveScreenshot();
  if (name==='export-morning') return exportMorningSheet();
  if (name==='export-morning-template') return exportMorningTemplateSheet();
  if (name==='copy-morning-visible') return copyMorningVisible();
  if (name==='copy-selected-cells') return copySelectedSheetCells();
  if (name==='copy-wave') return copyWaveByIndex(Number(el.dataset.waveIndex)||0,el.dataset.copyBlock||'all');
  if (name==='morning-sheets-connector') { state.modal='morning-sheets-connector'; return render(); }
  if (name==='save-morning-sheets-connector') return saveMorningSheetsConnector();
  if (name==='copy-morning-apps-script') return copyMorningAppsScript();
  if (name==='copy-morning-sheets-setup') return copyMorningSheetsSetup();
  if (name==='copy-morning-sheets-verify') return copyMorningSheetsVerification();
  if (name==='copy-morning-sheets-payload') return copyMorningSheetsPayload();
  if (name==='test-morning-sheets-connector') return testMorningSheetsConnector();
  if (name==='dry-run-morning-to-sheets') return dryRunMorningToSheets();
  if (name==='send-morning-to-sheets') return sendMorningToSheets();
  if (name==='sync-filtered-morning-to-sheets') return syncFilteredMorningToSheets();
  if (name==='open-sheets-helper') { state.sheetCopyText=morningSheetTsv(); state.modal='sheets-helper'; return render(); }
  if (name==='select-sheets-text') return selectSheetsText();
  if (name==='parse-equipment-text') return parseEquipmentTextAction();
  if (name==='apply-equipment-import') return applyEquipmentImport();
  if (name==='device-sheet-to-morning') return inputDeviceSheetToMorning();
  if (name==='add-device-sheet-row') return addDeviceSheetRow(el.dataset.deviceSection||'');
  if (name==='remove-device-custom-row') return removeCustomDeviceRow(el.dataset.deviceCustomUid||'');
  if (name==='clear-device-sheet-section') return clearDeviceSheetSection(el.dataset.deviceSection||'');
  if (name==='parse-fleet-paste') return parseFleetPasteAction();
  if (name==='rate-service') { state.rating=Number(el.dataset.rating)||0;persist();render();return toast(`Thanks — ${state.rating} stars saved`); }
  if (name==='publish') { state.rosterPublished=true;persist();render();return toast('Roster published to the team'); }
  if (name==='phase-next') { state.phase=Math.min(3,state.phase+1);persist();render();return toast(`Shift advanced to ${['Roster','Load-out','On road','Closeout'][state.phase]}`); }
  if (name==='role-preview') { state.role='dispatcher';state.page='dashboard';persist();render();return toast('Dispatcher access preview is on'); }
  if (name==='save-organization') return saveOrganizationSettings();
  if (name==='auto-assign') return toast('Equipment auto-fill complete — no conflicts found');
  if (name==='export-report') return exportNamedReport(el.dataset.report||'Daily roster');
  if (name==='coach') return openCoachingReview(el.dataset.coachingId||'',el.dataset.driver||'');
  if (name==='coach-all') return queueDueCoaching();
  if (name==='template') { state.modal='coaching-template';return render(); }
  if (name==='save-coaching-review') return saveCoachingReview();
  if (name==='copy-coaching-message') return copyCoachingReviewedMessage();
  if (name==='mark-coaching-sent') return markCoachingSent();
  if (name==='save-coaching-template') return saveCoachingTemplate();
  if (name==='broadcast') return toast('Broadcast is ready for review');
  if (name==='checklist') return toast('Checklist opened');
  if (name==='switch') return;
  toast('Action captured in this prototype');
}

fileInput.addEventListener('change',e=>{if(e.target.files.length)readFiles([...e.target.files]);e.target.value='';});

const headerKey=value=>String(value??'').toLowerCase().replace(/[^a-z0-9]/g,'');
function findImportHeader(rows,groups) {
  return rows.findIndex(row=>{const keys=row.map(headerKey);return groups.every(group=>group.some(name=>keys.includes(headerKey(name))));});
}
function firstDriverName(value='') { return String(value||'').split('|')[0].trim(); }
function normalizeTimeDisplay(value='') {
  const text=String(value||'').trim();
  const m=text.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if(!m)return text;
  let h=Number(m[1]); const min=m[2], suffix=(m[3]||'').toUpperCase();
  if(suffix) return `${h}:${min} ${suffix}`;
  const ampm=h>=12?'PM':'AM'; h=((h+11)%12)+1; return `${h}:${min} ${ampm}`;
}
function isIrregularPlannedRts(value='',wave='',routeDuration=0) {
  const t=waveMinutes(value), w=waveMinutes(wave), duration=Number(routeDuration)||0;
  if(t===9999)return Boolean(String(value||'').trim());
  if(w===9999)return t<14*60||t>23*60+59;
  let elapsed=t-w;if(elapsed<0)elapsed+=24*60;
  // Planned RTS is an evening return, not a departure time. Rescue rows can
  // reuse a CX code with an implausibly early RTS, so compare against the
  // DayOfOps route duration when available. Normal traffic/overtime gets a
  // deliberately generous window and is not blanket-flagged after 2 PM.
  if(duration>0) {
    const deviation=elapsed-duration;
    return deviation < -180 || deviation > 240;
  }
  return elapsed<180 || elapsed>12*60;
}
function normalizeEquipmentId(value='') {
  return String(value??'').toUpperCase().replace(/\b(EV|VAN|VEHICLE|DEVICE|PORTABLE)\b/g,'').replace(/^(EV|VAN|VEHICLE)(?=[A-Z0-9-])/,'').replace(/["']/g,'').replace(/[^A-Z0-9-]/g,'').replace(/^0+(?=\d)/,'');
}
function cleanEquipmentValue(value='',allowBlank=false) {
  const text=String(value??'').replace(/["']/g,'').trim();
  return text || (allowBlank?'':'-');
}
function isEquipmentHeaderToken(value='') {
  return /^(ev|van|evvan|vehicle|vehicleid|vannumber|gasvan|gas|helper|device|deviceid|dev|rabbit|portable|portableid|port|powerbank|battery)$/i.test(headerKey(value));
}
function isLikelyEquipmentId(value='') {
  const id=normalizeEquipmentId(value);
  if(!id)return false;
  if(gasVehicleIds.includes(id))return true;
  if(/^H[1-4]$/.test(id))return true;
  const n=Number(id);
  return Number.isInteger(n)&&n>=1&&n<=99;
}
function addEquipmentDetail(details,van,device,portable) {
  const key=normalizeEquipmentId(van);
  if(!key||!isLikelyEquipmentId(key))return false;
  if(isEquipmentHeaderToken(van)||isEquipmentHeaderToken(device)||isEquipmentHeaderToken(portable))return false;
  if(!String(device??'').trim()&&!String(portable??'').trim())return false;
  const cleanDevice=cleanEquipmentValue(device),cleanPortable=cleanEquipmentValue(portable,true);
  if(!/^(?:\d{1,3}|-)$/.test(cleanDevice)||!/^(?:[A-Z0-9-]{1,4}|-)?$/i.test(cleanPortable))return false;
  details[key]={device:cleanDevice,portable:cleanPortable};
  return true;
}
function equipmentDetailsFromTokenStream(text='') {
  const details={}, tokens=String(text||'').replace(/[|,]/g,' ').split(/\s+/).map(t=>t.replace(/^["']|["']$/g,'').trim()).filter(Boolean).filter(t=>!isEquipmentHeaderToken(t));
  for(let i=0;i+2<tokens.length;) {
    if(addEquipmentDetail(details,tokens[i],tokens[i+1],tokens[i+2])) {
      i+=3;
    } else {
      i+=1;
    }
  }
  return details;
}
function equipmentDetailsFromRows(rows=[]) {
  let header=rows.findIndex(row=>{
    const keys=row.map(headerKey);
    for(let i=0;i<keys.length;i++) if(['evvan','ev','van','vehicle','vehicleid','vannumber'].includes(keys[i])&&['device','deviceid','rabbit'].includes(keys[i+1])&&['portable','portableid','powerbank','battery'].includes(keys[i+2])) return true;
    return false;
  });
  if(header<0)return equipmentDetailsFromText(rowsToText(rows));
  const keys=rows[header].map(headerKey), groups=[];
  for(let i=0;i<keys.length;i++) {
    if(['evvan','ev','van','vehicle','vehicleid','vannumber'].includes(keys[i])&&['device','deviceid','rabbit'].includes(keys[i+1])&&['portable','portableid','powerbank','battery'].includes(keys[i+2])) groups.push([i,i+1,i+2]);
  }
  const details={};
  rows.slice(header+1).forEach(row=>{
    groups.forEach(([vanIx,deviceIx,portableIx])=>{
      addEquipmentDetail(details,row[vanIx],row[deviceIx],row[portableIx]);
    });
  });
  return details;
}
function equipmentDetailsFromText(text='') {
  const details={}, lines=String(text||'').split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  lines.forEach(line=>{
    const cleanedLine=line.replace(/[|,]/g,' ').trim();
    if(/^(ev\s*\/?\s*van|van|vehicle|gas\s*van|helper)\b.*\b(device|dev)\b.*\b(portable|port)\b/i.test(cleanedLine)&&!/\d/.test(cleanedLine)) return;
    let m=line.match(/(?:EV\s*\/?\s*VAN|VAN|EV|VEHICLE)\s*[:#-]?\s*"?([A-Z0-9-]+)"?.*?(?:DEVICE|DEV)\s*[:#-]?\s*"?([A-Z0-9-]+|-)"?.*?(?:PORTABLE|PORT)\s*[:#-]?\s*"?([A-Z0-9-]+|-)"?/i);
    if(m&&addEquipmentDetail(details,m[1],m[2],m[3])) return;
    let parts=line.replace(/[|,]/g,'\t').split(/\t+|\s{2,}/).map(x=>x.trim()).filter(Boolean);
    const looseParts=line.split(/\s+/).map(x=>x.trim()).filter(Boolean);
    if(parts.length<3&&looseParts.length>=3&&looseParts.every(x=>/^[A-Z0-9-]+$/i.test(x))) parts=looseParts;
    parts=parts.filter(x=>!isEquipmentHeaderToken(x));
    if(parts.length>=6) {
      for(let i=0;i+2<parts.length;i+=3) {
        if(!addEquipmentDetail(details,parts[i],parts[i+1],parts[i+2])) i-=2;
      }
      return;
    }
    if(parts.length>=3) {
      addEquipmentDetail(details,parts[0],parts[1],parts[2]);
    }
  });
  return Object.keys(details).length?details:equipmentDetailsFromTokenStream(text);
}
function routeDetailsFromRows(rows) {
  const header=findImportHeader(rows,[['route','routecode','routeid','cx','cxnumber','cxroute','blockid'],['driver','drivername','transportername','employeename','daname','associatename','name','deliveryassociate','stops','stopcount','plannedstops','numstops','planneddeparturetime']]);
  if(header<0)return {};
  const headers=rows[header].map(headerKey), index=(...names)=>headers.findIndex(h=>names.map(headerKey).includes(h));
  const routeIx=index('route','routecode','routeid','cx','cxnumber','cxroute','blockid','routeidentifier'), driverIx=index('driver','drivername','transportername','transporter','employeename','daname','associatename','name','deliveryassociate','associate'), firstIx=index('firstname','driverfirstname'), lastIx=index('lastname','driverlastname'), stopsIx=index('stops','stopcount','plannedstops','stopsplanned','numstops','totalstops','allstops'), plannedIx=index('planneddeparturetime','planneddeparttime','departuretime','plannedstarttime');
  const details={};
  rows.slice(header+1).forEach(row=>{const route=String(row[routeIx]||'').trim().toUpperCase();if(!route)return;const combined=[row[firstIx],row[lastIx]].filter(Boolean).join(' ').trim();const stops=Number(row[stopsIx]);const plannedRts=plannedIx>=0?normalizeTimeDisplay(row[plannedIx]):'';details[route]={driver:firstDriverName(row[driverIx]||combined||''),stops:Number.isFinite(stops)?stops:null,plannedRts};});
  return details;
}
function normalizeCxRoute(value='') {
  const text=String(value||'').trim().toUpperCase(),match=text.match(/\bCX\d+\b/);
  return match?match[0]:text;
}
function isCxMorningRoute(row={}) {
  return /^CX\d+$/i.test(normalizeCxRoute(row?.route));
}
function isExplicitAdhocMorningRoute(row={}) {
  if(isCxMorningRoute(row))return false;
  const route=String(row?.route||'').trim();
  return /^AX(?:\d+)?$/i.test(route)||/ad\s*hoc|adhoc/i.test(`${row?.wave||''} ${row?.service||''}`);
}
function isExplicitHelperMorningRoute(row={}) {
  return !isCxMorningRoute(row)&&/helper/i.test(`${row?.wave||''} ${row?.service||''} ${row?.route||''}`);
}
function itineraryRouteCount(value) {
  if(value===null||value===undefined||String(value).trim()===''||/^missing$/i.test(String(value).trim()))return null;
  const count=Number(String(value).replace(/,/g,'').trim());
  return Number.isFinite(count)?count:null;
}
function preferItineraryRtsCandidate(current,candidate) {
  if(!current)return true;
  const currentStops=current.allStops, candidateStops=candidate.allStops;
  const currentPackages=current.totalPackages, candidatePackages=candidate.totalPackages;
  const currentKnown=Number(currentStops!=null)+Number(currentPackages!=null), candidateKnown=Number(candidateStops!=null)+Number(candidatePackages!=null);
  if(candidateKnown!==currentKnown)return candidateKnown>currentKnown;
  if(candidateStops!=null&&currentStops!=null&&candidateStops!==currentStops)return candidateStops>currentStops;
  if(candidatePackages!=null&&currentPackages!=null&&candidatePackages!==currentPackages)return candidatePackages>currentPackages;
  return false;
}
function mergeItineraryRtsDetails(target={},source={}) {
  Object.entries(source||{}).forEach(([route,candidate])=>{
    if(preferItineraryRtsCandidate(target[route],candidate))target[route]=candidate;
  });
  return target;
}
function itineraryRtsDetailsFromRows(rows=[]) {
  const header=findImportHeader(rows,[['routecode'],['plannedreturntostation']]);
  if(header<0)return {};
  const headers=rows[header].map(headerKey),routeIx=headers.indexOf('routecode'),rtsIx=headers.indexOf('plannedreturntostation'),stopsIx=headers.indexOf('allstops'),packagesIx=headers.indexOf('totalpackages'),selected={};
  rows.slice(header+1).forEach(row=>{
    const route=normalizeCxRoute(row[routeIx]),rawRts=String(row[rtsIx]??'').trim(),plannedRts=/^(?:missing|n\/?a|null|-)?$/i.test(rawRts)?'':normalizeTimeDisplay(row[rtsIx]);
    if(!route)return;
    const candidate={driver:'',stops:null,plannedRts,allStops:stopsIx>=0?itineraryRouteCount(row[stopsIx]):null,totalPackages:packagesIx>=0?itineraryRouteCount(row[packagesIx]):null};
    if(preferItineraryRtsCandidate(selected[route],candidate))selected[route]=candidate;
  });
  const details={};Object.entries(selected).forEach(([route,candidate])=>{if(candidate.plannedRts)details[route]=candidate;});
  return details;
}
async function parseUploadedFile(file) {
  const name=file.name.toLowerCase(); let rows;
  if(/^image\//.test(file.type)||/\.(png|jpe?g|webp)$/i.test(name)) { const image=await readImageContent(file);return {name:file.name,rows:image.rows||[],text:image.text||'',kind:'image'}; }
  if(file.type==='application/pdf'||name.endsWith('.pdf')) return {name:file.name,rows:[],text:await readPdfText(await file.arrayBuffer()),kind:'pdf'};
  if(name.endsWith('.csv')) rows=parseCSV(await file.text());
  else if(name.endsWith('.xlsx')) rows=await parseXlsxArrayBuffer(await file.arrayBuffer());
  else if(name.endsWith('.xls')) {
    const buffer=await file.arrayBuffer(),text=new TextDecoder('utf-8').decode(buffer);
    if(/<table\b/i.test(text)) {
      rows=htmlTableRows(text);
      if(rows.length<2)throw new Error('empty Paycom HTML workbook');
      return {name:file.name,rows,text:rowsToText(rows),kind:'paycom-html-xls'};
    }
    rows=await parseXlsxArrayBuffer(buffer);
  }
  else {
    const text=await file.text().catch(()=>''),clean=text.replace(/^\uFEFF/,'');
    // Amazon AssociateData exports are sometimes downloaded without a .csv
    // suffix. Only enable content sniffing for the driver-import workflow;
    // fleet and RTS filename gates remain strict.
    if(state.importPurpose==='drivers') {
      const csvRows=parseCSV(clean);
      if(csvRows.length>1&&driverContactsFromRows(csvRows).length) return {name:file.name,rows:csvRows,text:clean,kind:'csv-content'};
    }
    return {name:file.name,rows:[],text:clean,kind:'text'};
  }
  if(rows.length<2) throw new Error('empty');
  return {name:file.name,rows};
}
async function readImageContent(file) {
  try {
    if(state.importPurpose!=='equipment'&&typeof TextDetector!=='undefined'&&typeof createImageBitmap!=='undefined') {
      const detector=new TextDetector();
      const bitmap=await createImageBitmap(file);
      const results=await detector.detect(bitmap);
      const text=detectionsToText(results);
      if(text.trim())return {text,rows:[]};
    }
  } catch {}
  return readImageWithOcr(file);
}
async function equipmentOcrCanvas(file) {
  if(typeof createImageBitmap==='undefined')return file;
  const bitmap=await createImageBitmap(file), scale=Math.max(1.5,Math.min(3,1800/Math.max(1,bitmap.width)));
  const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
  const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
  const image=ctx.getImageData(0,0,canvas.width,canvas.height), data=image.data;
  for(let i=0;i<data.length;i+=4){const gray=.299*data[i]+.587*data[i+1]+.114*data[i+2],value=Math.max(0,Math.min(255,(gray-128)*1.35+128));data[i]=value;data[i+1]=value;data[i+2]=value;}
  const horizontal=[],vertical=[];
  for(let y=0;y<canvas.height;y++){let dark=0;for(let x=0;x<canvas.width;x++)if(data[(y*canvas.width+x)*4]<70)dark++;if(dark>canvas.width*.55)horizontal.push(y);}
  for(let x=0;x<canvas.width;x++){let dark=0;for(let y=0;y<canvas.height;y++)if(data[(y*canvas.width+x)*4]<70)dark++;if(dark>canvas.height*.55)vertical.push(x);}
  horizontal.forEach(y=>{for(let x=0;x<canvas.width;x++){const i=(y*canvas.width+x)*4;data[i]=data[i+1]=data[i+2]=255;}});
  vertical.forEach(x=>{for(let y=0;y<canvas.height;y++){const i=(y*canvas.width+x)*4;data[i]=data[i+1]=data[i+2]=255;}});
  ctx.putImageData(image,0,0);return canvas;
}
function ocrNumber(value='') {
  const text=String(value||'').toUpperCase().replace(/[O]/g,'0').replace(/[IL|!]/g,'1').replace(/Z/g,'2').replace(/A/g,'4').replace(/S/g,'5').replace(/G/g,'6').replace(/B/g,'8');
  const digits=text.replace(/[^0-9]/g,'');return digits?Number(digits):null;
}
function repairSequentialEquipmentRows(rows=[]) {
  const data=rows.filter(row=>!/^VAN$/i.test(String(row[0]||'').trim())&&row.some(Boolean));
  const anchors=data.map((row,index)=>{const m=String(row[0]||'').replace(/\s+/g,'').match(/^E[VY]?(.*)$/i);const n=m?ocrNumber(m[1]):null;return n&&n>=1&&n<=58?n-index:null;}).filter(Number.isFinite);
  if(!anchors.length)return rows;
  const counts=new Map();anchors.forEach(offset=>counts.set(offset,(counts.get(offset)||0)+1));
  const offset=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0];
  if(!Number.isFinite(offset)||offset<1||offset>58)return rows;
  let deviceMatches=0,portableMatches=0;
  data.forEach((row,index)=>{const van=offset+index,device=ocrNumber(row[1]),portable=ocrNumber(row[2]);if(device===van)deviceMatches++;if(portable===van+1)portableMatches++;});
  const sequential=deviceMatches>=4&&portableMatches>=4;
  if(!sequential)return rows;
  data.forEach((row,index)=>{
    const van=offset+index;if(van<1||van>58)return;
    row[0]=`EV${van}`;
    if(row._deviceInk?.occupied||String(row[1]||'').trim())row[1]=String(van);
    const portable=String(row[2]||'').trim();
    if(row._portableInk)row[2]=row._portableInk.occupied?(row._portableInk.dash?'-':String(van+1)):'';
    else if(portable)row[2]=/^[.\-–—]+$/.test(portable)?'-':String(van+1);
  });
  return rows;
}
function equipmentRowsFromOcrTsv(tsv='',imageWidth=0,imageCanvas=null) {
  const words=String(tsv||'').split(/\r?\n/).slice(1).map(line=>line.split('\t')).filter(parts=>parts.length>=12&&parts[11]?.trim()).map(parts=>({text:parts[11].trim(),x:Number(parts[6])||0,y:Number(parts[7])||0,width:Number(parts[8])||0,height:Number(parts[9])||0,confidence:Number(parts[10])||0})).filter(word=>word.confidence>=0);
  if(!words.length||!imageWidth)return [];
  const heights=words.map(word=>word.height||12).sort((a,b)=>a-b),median=heights[Math.floor(heights.length/2)]||12,lines=[];
  words.sort((a,b)=>(a.y+a.height/2)-(b.y+b.height/2)||a.x-b.x).forEach(word=>{
    const center=word.y+word.height/2, line=lines.find(item=>Math.abs(item.y-center)<=Math.max(6,median*.7));
    if(line){line.words.push(word);line.y=(line.y*(line.words.length-1)+center)/line.words.length;}else lines.push({y:center,words:[word]});
  });
  const vanHeaders=words.filter(word=>/^VAN$/i.test(word.text.replace(/[^A-Z]/gi,''))).length,isDouble=vanHeaders>=2;
  const half=imageWidth/2, columnWidth=isDouble?half/3:imageWidth/3;
  const inkFor=(line,col)=>{
    if(!imageCanvas?.getContext||isDouble)return null;
    const x0=Math.max(0,Math.floor(col*columnWidth+columnWidth*.1)),x1=Math.min(imageCanvas.width,Math.ceil((col+1)*columnWidth-columnWidth*.1));
    const radius=Math.max(5,Math.round(median*.8)),y0=Math.max(0,Math.floor(line.y-radius)),y1=Math.min(imageCanvas.height,Math.ceil(line.y+radius));
    if(x1<=x0||y1<=y0)return null;
    const pixels=imageCanvas.getContext('2d',{willReadFrequently:true}).getImageData(x0,y0,x1-x0,y1-y0).data;
    let count=0,minX=x1-x0,minY=y1-y0,maxX=-1,maxY=-1;
    for(let y=0;y<y1-y0;y++)for(let x=0;x<x1-x0;x++){const i=(y*(x1-x0)+x)*4;if(pixels[i]<165){count++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
    const occupied=count>=Math.max(3,(x1-x0)*(y1-y0)*.002),width=maxX>=minX?maxX-minX+1:0,height=maxY>=minY?maxY-minY+1:0;
    return {occupied,dash:occupied&&height<=Math.max(4,median*.3)&&width>height*1.4};
  };
  const rows=lines.sort((a,b)=>a.y-b.y).map(line=>{
    const row=Array(isDouble?6:3).fill('');
    line.words.sort((a,b)=>a.x-b.x).forEach(word=>{const center=word.x+word.width/2,side=isDouble&&center>=half?1:0,local=isDouble&&side?center-half:center,col=side*3+Math.max(0,Math.min(2,Math.floor(local/columnWidth)));row[col]=`${row[col]} ${word.text}`.trim();});
    [0,3].filter(col=>col<row.length).forEach(col=>{row[col]=row[col].replace(/\s+/g,'').replace(/^E[Vy]\s*/i,'EV').replace(/^EV([0-9OILSB]+)$/i,(_,id)=>`EV${id.toUpperCase().replace(/O/g,'0').replace(/[IL]/g,'1').replace(/S/g,'5').replace(/B/g,'8')}`);});
    [1,2,4,5].filter(col=>col<row.length).forEach(col=>{if(/^[OILSB]+$/i.test(row[col]))row[col]=row[col].toUpperCase().replace(/O/g,'0').replace(/[IL]/g,'1').replace(/S/g,'5').replace(/B/g,'8');});
    if(!isDouble){row._deviceInk=inkFor(line,1);row._portableInk=inkFor(line,2);}
    return row;
  }).filter(row=>row.some(Boolean));
  return isDouble?rows:repairSequentialEquipmentRows(rows);
}
async function readImageWithOcr(file) {
  try {
    if(!window.Tesseract?.createWorker)return {text:'',rows:[]};
    const image=await equipmentOcrCanvas(file);
    const worker=await window.Tesseract.createWorker('eng',1,{logger:message=>{
      if(message.status==='recognizing text'&&message.progress>.15) {
        const percent=Math.round(message.progress*100);
        const drop=document.querySelector('#equipment-drop .equipment-drop-copy span');
        if(drop)drop.textContent=`Reading screenshot… ${percent}%`;
      }
    }});
    const pageMode=image.height/image.width>2?'3':'6';
    await worker.setParameters({tessedit_pageseg_mode:pageMode,preserve_interword_spaces:'1',user_defined_dpi:'300'});
    const result=await worker.recognize(image,{}, {text:true,tsv:true});
    await worker.terminate();
    const text=String(result?.data?.text||'').replace(/\f/g,'\n').trim();
    return {text,rows:equipmentRowsFromOcrTsv(result?.data?.tsv||'',image.width||0,image)};
  } catch(error) {
    console.warn('VAN/DEV/PORT OCR failed',error);
    return {text:'',rows:[]};
  }
}
function detectionBox(result) {
  const box=result?.boundingBox||{};
  return {x:Number(box.x??box.left??0),y:Number(box.y??box.top??0),height:Number(box.height??16)};
}
function detectionsToText(results=[]) {
  const words=results.map(r=>({text:String(r.rawValue||'').trim(),...detectionBox(r)})).filter(w=>w.text);
  if(!words.length)return '';
  const medianHeight=[...words].map(w=>w.height||16).sort((a,b)=>a-b)[Math.floor(words.length/2)]||16;
  const lines=[];
  words.sort((a,b)=>a.y-b.y||a.x-b.x).forEach(word=>{
    const line=lines.find(l=>Math.abs(l.y-word.y)<=Math.max(8,medianHeight*.65));
    if(line){line.words.push(word);line.y=(line.y*(line.words.length-1)+word.y)/line.words.length;}
    else lines.push({y:word.y,words:[word]});
  });
  return lines.sort((a,b)=>a.y-b.y).map(line=>line.words.sort((a,b)=>a.x-b.x).map(w=>w.text).join(' ')).join('\n');
}
function pdfBytesToLatin1(buffer) {
  const bytes=new Uint8Array(buffer), chunk=8192, parts=[];
  for(let i=0;i<bytes.length;i+=chunk) parts.push(String.fromCharCode(...bytes.slice(i,i+chunk)));
  return parts.join('');
}
function decodePdfString(value='') {
  return String(value).replace(/\\([nrtbf()\\])/g,(_,c)=>({n:'\n',r:'\r',t:'\t',b:'\b',f:'\f','(':'(',')':')','\\':'\\'}[c]||c)).replace(/\\([0-7]{1,3})/g,(_,n)=>String.fromCharCode(parseInt(n,8)));
}
async function readPdfText(buffer) {
  try {
    if(window.pdfjsLib?.getDocument) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
      const pdf=await window.pdfjsLib.getDocument({data:new Uint8Array(buffer)}).promise,pages=[];
      for(let pageNumber=1;pageNumber<=pdf.numPages;pageNumber++) {
        const page=await pdf.getPage(pageNumber),content=await page.getTextContent();
        const lines=[],items=[...content.items].filter(item=>String(item.str||'').trim()).sort((a,b)=>{
          const ay=Number(a.transform?.[5]||0),by=Number(b.transform?.[5]||0);return Math.abs(by-ay)>3?by-ay:Number(a.transform?.[4]||0)-Number(b.transform?.[4]||0);
        });
        items.forEach(item=>{const y=Number(item.transform?.[5]||0),line=lines.find(entry=>Math.abs(entry.y-y)<=3);if(line)line.items.push(item);else lines.push({y,items:[item]});});
        pages.push(lines.sort((a,b)=>b.y-a.y).map(line=>line.items.sort((a,b)=>Number(a.transform?.[4]||0)-Number(b.transform?.[4]||0)).map(item=>item.str).join(' ').trim()).join('\n'));
      }
      const extracted=pages.join('\n');if(extracted.trim())return extracted;
    }
    const raw=pdfBytesToLatin1(buffer), pieces=[];
    raw.replace(/\((?:\\.|[^\\)])*\)\s*Tj/g,match=>{pieces.push(decodePdfString(match.replace(/\)\s*Tj$/,'').slice(1)));return match;});
    raw.replace(/\[(.*?)\]\s*TJ/gs,(_,body)=>{body.replace(/\((?:\\.|[^\\)])*\)/g,s=>{pieces.push(decodePdfString(s.slice(1,-1)));return s;});return _;});
    if(!pieces.length) raw.replace(/\((?:\\.|[^\\)]){1,80}\)/g,s=>{const text=decodePdfString(s.slice(1,-1)).trim();if(/[A-Za-z0-9-]{1,}/.test(text))pieces.push(text);return s;});
    return pieces.join('\n');
  } catch { return ''; }
}
function decodeHtmlTableCell(value='') {
  const decoded=String(value||'')
    .replace(/<br\s*\/?\s*>/gi,'\n')
    .replace(/<\/(?:p|div|li)>/gi,'\n')
    .replace(/<[^>]+>/g,'')
    .replace(/&#x([0-9a-f]+);/gi,(_,code)=>String.fromCodePoint(parseInt(code,16)))
    .replace(/&#(\d+);/g,(_,code)=>String.fromCodePoint(Number(code)))
    .replace(/&nbsp;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&quot;/gi,'"')
    .replace(/&#39;|&apos;/gi,"'")
    .replace(/&lt;/gi,'<')
    .replace(/&gt;/gi,'>')
    .replace(/\r/g,'');
  const clean=decoded.split('\n').map(line=>line.replace(/\s+/g,' ').trim()).filter(Boolean).join('\n').trim();
  return clean.replace(/^"([\s\S]*)"$/,'$1').trim();
}
function htmlTableRows(html='') {
  const rows=[];let rowMatch;
  const rowRe=/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  while((rowMatch=rowRe.exec(String(html||'')))) {
    const cells=[];let cellMatch;
    const cellRe=/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/gi;
    while((cellMatch=cellRe.exec(rowMatch[1])))cells.push(decodeHtmlTableCell(cellMatch[1]));
    if(cells.some(Boolean))rows.push(cells);
  }
  return rows;
}
function paycomFileDateHint(value='') {
  const match=String(value||'').match(/ReportClass-(\d{4})(\d{2})(\d{2})/i);if(!match)return '';
  return `${Number(match[2])}/${Number(match[3])}/${Number(match[1])}`;
}
function paycomReportDate(value='',fallbackYear=0) {
  const text=String(value||'').replace(/[,]+/g,' ').replace(/\s+/g,' ').trim();
  const numeric=text.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if(numeric) {
    let year=Number(numeric[3]||fallbackYear||String(state.morningOperationDate||'').slice(0,4)||new Date().getFullYear());if(year<100)year+=2000;
    return `${Number(numeric[1])}/${Number(numeric[2])}/${year}`;
  }
  const months={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
  const named=text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})(?:\s+(\d{4}))?\b/i);
  if(!named)return '';
  const year=Number(named[3]||fallbackYear||String(state.morningOperationDate||'').slice(0,4)||new Date().getFullYear());
  return `${months[named[1].toLowerCase()]}/${Number(named[2])}/${year}`;
}
function normalizeScheduleEmployeeName(value='') {
  const clean=String(value||'').replace(/^"|"$/g,'').replace(/\s+/g,' ').trim();
  if(!clean)return '';
  const parts=clean.split(',').map(part=>part.trim()).filter(Boolean),ordered=parts.length>1?`${parts.slice(1).join(' ')} ${parts[0]}`:clean;
  return ordered.toLowerCase().replace(/(^|[\s'-])([a-z])/g,(_,lead,letter)=>lead+letter.toUpperCase()).replace(/\s+/g,' ').trim();
}
function scheduleEntriesFromPaycomReportRows(rows=[],options={}) {
  const fileDate=paycomFileDateHint(options.fileName||''),fallbackYear=Number(fileDate.split('/')[2]||0);
  const header=rows.findIndex(row=>headerKey(row[0])==='employee'&&row.slice(1).some(cell=>paycomReportDate(cell,fallbackYear)));
  if(header<0)return [];
  const date=rowDate(rows[header])||fileDate||paycomReportDate(rows[header][1],fallbackYear),entries=[];
  rows.slice(header+1).forEach(row=>{
    const rawName=String(row[0]||'').trim(),details=String(row.slice(1).find(Boolean)||'').replace(/\r/g,'').trim();
    const times=details.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i);
    if(!rawName||!times)return;
    const name=normalizeScheduleEmployeeName(rawName),role=normalizeScheduleRole(details.slice(0,times.index).replace(/^"|"$/g,'').trim());
    if(!name||!role)return;
    entries.push({date,name,start:normalizeTimeDisplay(times[1]),end:normalizeTimeDisplay(times[2]),role});
  });
  return entries;
  function rowDate(row){for(const cell of row.slice(1)){const parsed=paycomReportDate(cell,fallbackYear);if(parsed)return parsed;}return '';}
}
function normalizeScheduleRole(value='') { return String(value||'').replace(/res(?:cue|uce|ceus?)/ig,'Rescue').replace(/\s+/g,' ').trim(); }
function scheduleEntriesFromText(text='') {
  if(/<table\b/i.test(String(text||''))) {
    const paycom=scheduleEntriesFromPaycomReportRows(htmlTableRows(text));
    if(paycom.length)return paycom;
  }
  const clean=String(text||'').replace(/\r/g,'').replace(/[–—]/g,'-').replace(/\(cid:\d+\)/g,'').split('\n').map(line=>line.trim()).filter(line=>line&&!/^Schedule Exchange/i.test(line)&&!/^https?:/i.test(line)&&!/^Page \d+/i.test(line)&&!/^Search$/i.test(line));
  const entries=[],day=/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/i,date=/^\d{1,2}\/\d{1,2}(?:\/\d{2,4})?$/,time=/^(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)$/i;
  for(let i=0;i<clean.length-4;i++) {
    if(!day.test(clean[i])||!date.test(clean[i+1]))continue;
    const name=clean[i+2],match=clean[i+3].match(time),role=normalizeScheduleRole(clean[i+4]);
    if(!match||name.length<3||/^[A-Z]{1,3}$/.test(name)||!role)continue;
    entries.push({date:clean[i+1],name:name.replace(/\s+/g,' ').replace(/\b\w/g,c=>c.toUpperCase()).replace(/\B\w/g,c=>c.toLowerCase()),start:match[1].toUpperCase(),end:match[2].toUpperCase(),role});i+=4;
  }
  return entries;
}
function scheduleEntriesFromRows(rows=[],options={}) {
  const paycom=scheduleEntriesFromPaycomReportRows(rows,options);if(paycom.length)return paycom;
  const header=findImportHeader(rows,[['name','employee','employeename','associate','deliveryassociate'],['shift','position','role','job','schedule']]);
  if(header<0)return scheduleEntriesFromText(rowsToText(rows));
  const keys=rows[header].map(headerKey),index=(...names)=>keys.findIndex(key=>names.map(headerKey).includes(key));
  const nameIx=index('name','employee','employee name','associate','delivery associate'),roleIx=index('shift','position','role','job','schedule'),dateIx=index('date','shift date','scheduled date'),startIx=index('start','start time'),endIx=index('end','end time'),timeIx=index('time','shift time','hours');
  return rows.slice(header+1).map(row=>{const combined=String(timeIx>=0?row[timeIx]:'').replace(/[–—]/g,'-').match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i);return {date:String(row[dateIx]||''),name:String(row[nameIx]||'').trim(),start:String(row[startIx]||combined?.[1]||''),end:String(row[endIx]||combined?.[2]||''),role:normalizeScheduleRole(row[roleIx])};}).filter(entry=>entry.name&&entry.role);
}
function scheduleRoleGroup(role='') {
  const key=headerKey(role);
  if(/firstopeningdispatch|fleetcoordinator|secondopeningdispatch|closingdispatch|secondcloser|leaddispatch/.test(key))return 'dispatch';
  if(/ridealong|ridealongshift|training|trainee|newhire/.test(key))return 'training';
  if(/deliveryassociate|driverhelper|rescue|midshift|modifiedduty/.test(key))return 'driver';
  return 'other';
}
function isDriverHelperOnlyRole(role='') { const key=headerKey(role);return key==='driverhelper'||key==='helper'; }
function isRidealongRole(role='') { return scheduleRoleGroup(role)==='training'; }
function canBecomeHelperRole(role='') { const key=headerKey(role);return !key.includes('modifiedduty')&&(key.includes('rescue')||key.includes('deliveryassociate')); }
function scheduleHelperKey(name='') { return `${state.morningOperationDate}|${nameKey(name)}`; }
function helperRosterRows() {
  const automatic=currentScheduleEntries().filter(entry=>isDriverHelperOnlyRole(entry.role)).map(entry=>({...entry,automatic:true}));
  const marked=Object.entries(state.scheduleHelpers||{}).filter(([key])=>key.startsWith(`${state.morningOperationDate}|`)).map(([,value])=>({...value,automatic:false}));
  const byName=new Map();[...automatic,...marked].forEach(row=>{const key=nameKey(row.name);if(!key)return;byName.set(key,{...(byName.get(key)||{}),...row});});
  return [...byName.values()].filter(row=>!state.scheduleStayHome?.[scheduleHelperKey(row.name)]&&!state.scheduleReductions?.[scheduleHelperKey(row.name)]&&!state.callOffDriverKeys?.[callOffStatusKey(row.name)]).sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));
}
function markPaycomHelper(name='',role='') {
  if(!name||!canBecomeHelperRole(role))return toast('Only Rescue or Delivery Associate shifts can be moved to Helpers','error');
  const key=scheduleHelperKey(name),current=state.scheduleHelpers[key];
  if(current){delete state.scheduleHelpers[key];removeHelperFromMatchedDriver(name);state.morningRoutes=state.morningRoutes.filter(row=>row.helperAssignmentKey!==key||!/helper/i.test(String(row.service||'')));persist();render();return toast(`${name} removed from Helpers`);}
  const scheduled=currentScheduleEntries().find(entry=>nameKey(entry.name)===nameKey(name))||{};
  reconcileDailyRosterFlags(name,'helper');state.scheduleHelpers[key]={name:contactForMorningDriver(name)?.name||name,role:role||scheduled.role||'Driver Helper',start:scheduled.start||'',end:scheduled.end||'',matchedRoute:'',matchedDriver:'',helperBag:''};
  removeDriverAdhocRoute(name);persist();render();toast(`${name} moved to the Helper box`);
}
function helperDriverCandidates() {
  const waves=[...new Set((state.morningRoutes||[]).filter(row=>row.dsp===state.dspCode&&!/helper|ad\s*hoc/i.test(`${row.service} ${row.wave}`)).map(row=>row.wave).filter(Boolean))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)).slice(0,2);
  return (state.morningRoutes||[]).filter(row=>row.dsp===state.dspCode&&waves.includes(row.wave)&&row.route&&!String(row.route).startsWith('__blank_')).map(row=>({routeUid:row.routeUid,route:row.route,wave:row.wave,driver:morningDriverNames(row.driver)[0]||row.driver}));
}
function openHelperMatch(name='') {
  const helper=helperRosterRows().find(row=>nameKey(row.name)===nameKey(name));if(!helper)return toast('Helper was not found in today’s roster','error');
  const candidates=helperDriverCandidates();if(!candidates.length)return toast('Add Wave 1 or Wave 2 drivers to the Morning Sheet first','error');
  state.pendingHelperMatch={name:helper.name,role:helper.role||'Driver Helper'};state.modal='helper-match';render();
}
function openDriverAlias(name='') {
  const canonical=canonicalDriverName(name);if(!canonical)return toast('Choose a driver or helper first','error');
  const contact=driverContactForName(canonical)||{name:canonical},entry=ensureDriverProfile(contact),profile=entry?.profile||{};
  state.pendingDriverAlias={canonical:profile.canonical||canonical,display:profile.nickname||'',knownNames:(profile.names||[]).filter(alias=>nameKey(alias)!==nameKey(profile.canonical||canonical)),preferredEvs:normalizePreferredVehicleIds(profile.preferredEvs||[])};state.modal='driver-alias';render();
}
function saveDriverAlias() {
  const pending=state.pendingDriverAlias,display=String(document.getElementById('driver-alias-display')?.value||'').replace(/[+|&]/g,' ').replace(/\s+/g,' ').trim(),knownNames=String(document.getElementById('driver-alias-known-names')?.value||'').split(/[,\n;]/).map(value=>value.replace(/[+|&]/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean),preferredEvs=normalizePreferredVehicleIds(document.getElementById('driver-preferred-evs')?.value||pending?.preferredEvs||[]);
  if(!pending?.canonical)return toast('Driver identity was not found','error');
  const contact=driverContactForName(pending.canonical)||{name:pending.canonical},entry=ensureDriverProfile(contact),canonical=entry?.profile?.canonical||pending.canonical,key=nameKey(canonical),aliases=[...new Set([...(entry?.profile?.names||[]),entry?.profile?.nickname,...(pending.knownNames||[]),...knownNames,display,canonical].filter(Boolean))],collision=driverIdentityCollision([display,...aliases],entry?.key||'');
  if(collision)return toast(`“${display||collision.value}” is already linked to ${collision.profile.canonical}. Use a different nickname.`, 'error');
  if(entry){entry.profile.nickname=display&&nameKey(display)!==key?display:'';entry.profile.names=aliases;entry.profile.preferredEvs=preferredEvs;entry.profile.updatedAt=new Date().toISOString();}
  if(!display||nameKey(display)===key)delete state.driverNameAliases[key];
  else state.driverNameAliases[key]={canonical,display,aliases};
  aliases.forEach(alias=>{if(nameKey(alias)!==key)state.driverNameAliases[nameKey(alias)]={canonical,display:display||canonical,aliases};});
  state.pendingDriverAlias=null;state.modal=null;persist();render();toast(`${display&&nameKey(display)!==key?`${pending.canonical} will display as ${display}`:`${pending.canonical} uses the full name`}${preferredEvs.length?` · ${preferredEvs.length} preferred van${preferredEvs.length===1?'':'s'} saved`:''}`);
}
function helperMorningRouteFor(name='') { return (state.morningRoutes||[]).find(row=>row.helperAssignmentKey===scheduleHelperKey(name)&&/helper/i.test(`${row.service||''} ${row.wave||''}`)); }
function removeHelperFromMatchedDriver(name='') {
  const key=nameKey(name),assignmentKey=scheduleHelperKey(name);(state.morningRoutes||[]).forEach(route=>{if(/helper/i.test(String(route.service||'')))return;protectRouteOperationalData(route,()=>{const people=morningDriverNames(route.driver),filtered=people.filter((person,index)=>index===0||nameKey(person)!==key);if(filtered.length!==people.length){route.driver=filtered.join(' + ');route.missingHelper=true;route.vacatedHelper=contactForMorningDriver(name)?.name||name;}if(route.helperAssignmentKey===assignmentKey){delete route.helperAssignmentKey;delete route.helperBag;}});});
}
function unmatchHelper(name='') {
  const key=scheduleHelperKey(name),helper=helperRosterRows().find(row=>nameKey(row.name)===nameKey(name));if(!helper)return toast('Helper was not found','error');
  const helperRoute=helperMorningRouteFor(name);removeHelperFromMatchedDriver(name);
  if(helperRoute){protectRouteOperationalData(helperRoute,()=>{helperRoute.driver='';helperRoute.missingHelper=true;helperRoute.vacatedHelper=contactForMorningDriver(name)?.name||name;});}
  const scheduled=currentScheduleEntries().find(entry=>nameKey(entry.name)===nameKey(name))||helper;state.scheduleHelpers[key]={...(state.scheduleHelpers[key]||{}),name:contactForMorningDriver(name)?.name||name,role:scheduled.role||helper.role||'Driver Helper',start:scheduled.start||helper.start||'',end:scheduled.end||helper.end||'',matchedRoute:'',matchedRouteUid:'',matchedDriver:'',helperBag:''};
  persist();render();toast(`${name} un-matched and returned to the Helper box`);
}
function applyHelperMatch() {
  const pending=state.pendingHelperMatch,picker=document.getElementById('helper-match-driver'),uid=picker?.value||picker?.options?.[0]?.value;if(!pending||!uid)return toast('Choose a Wave 1 or Wave 2 driver','error');
  const route=morningRouteByUid(uid);if(!route)return toast('That Morning Sheet driver is no longer available','error');
  const exactHelper=contactForMorningDriver(pending.name)?.name||pending.name,displayInput=String(document.getElementById('helper-display-name')?.value||'').replace(/[+|&]/g,' ').replace(/\s+/g,' ').trim();
  reconcileDailyRosterFlags(exactHelper,'helper');
  const primaryBefore=morningDriverNames(route.driver)[0]||route.driver,automaticShort=`${driverDisplayName(primaryBefore)} + ${exactHelper}`.length>30?suggestedDriverAlias(exactHelper):'',chosenDisplay=displayInput&&nameKey(displayInput)!==nameKey(exactHelper)?displayInput:automaticShort;
  if(chosenDisplay&&nameKey(chosenDisplay)!==nameKey(exactHelper)){
    const profile=ensureDriverProfile(driverContactForName(exactHelper)||{name:exactHelper}),collision=driverIdentityCollision([chosenDisplay],profile?.key||'');
    if(collision)return toast(`“${chosenDisplay}” is already linked to ${collision.profile.canonical}`, 'error');
    if(profile){profile.profile.nickname=chosenDisplay;profile.profile.updatedAt=new Date().toISOString();}
    state.driverNameAliases[nameKey(exactHelper)]={canonical:exactHelper,display:chosenDisplay,aliases:profile?.profile?.names||[exactHelper]};
  }
  removeHelperFromMatchedDriver(exactHelper);const people=morningDriverNames(route.driver),primary=people[0]||route.driver;if(!people.some(name=>nameKey(name)===nameKey(exactHelper)))people.push(exactHelper);route.driver=people.filter(Boolean).join(' + ');route.helperAssignmentKey=scheduleHelperKey(exactHelper);delete route.missingHelper;delete route.vacatedHelper;
  const key=scheduleHelperKey(exactHelper),scheduled=currentScheduleEntries().find(entry=>nameKey(entry.name)===nameKey(exactHelper))||{};
  state.scheduleHelpers[key]={...(state.scheduleHelpers[key]||{}),name:exactHelper,role:pending.role||scheduled.role||'Driver Helper',start:scheduled.start||'',end:scheduled.end||'',matchedRoute:route.route,matchedRouteUid:route.routeUid,matchedDriver:primary,helperBag:state.scheduleHelpers[key]?.helperBag||''};
  let helperRoute=helperMorningRouteFor(exactHelper);if(!helperRoute){helperRoute=createManualMorningRoute({route:'HELPER',wave:'Helper'});helperRoute.helperAssignmentKey=key;}
  helperRoute.driver=exactHelper;helperRoute.route='HELPER';helperRoute.wave='Helper';helperRoute.service='Driver Helper';helperRoute.staging='';helperRoute.padOverride='';delete helperRoute.missingHelper;delete helperRoute.vacatedHelper;clearRouteAssignmentVacancy(helperRoute);
  state.pendingHelperMatch=null;state.modal=null;persist();render();toast(`${primary} + ${exactHelper} matched on ${route.route}`);
}
function assignHelperBags() {
  const helpers=helperRosterRows().filter(row=>row.matchedRoute||state.morningRoutes.some(route=>route.helperAssignmentKey===scheduleHelperKey(row.name)&&!/helper/i.test(String(route.service||''))));
  if(!helpers.length)return toast('Match Helpers with Wave 1 or Wave 2 drivers first','error');
  const bags=deviceSheetAllIds('helper').map(normalizeEquipmentId).filter(Boolean);if(!bags.length)return toast('Add Helper Bags in the Device and Portable Sheet first','error');
  let assigned=0;helpers.forEach((helper,index)=>{const key=scheduleHelperKey(helper.name),bag=bags[index];if(!bag)return;const main=state.morningRoutes.find(route=>route.helperAssignmentKey===key&&!/helper/i.test(String(route.service||'')))||state.morningRoutes.find(route=>route.route===helper.matchedRoute);if(!main)return;main.helperBag=bag;const record=state.scheduleHelpers[key]||{name:helper.name,role:helper.role};record.helperBag=bag;record.matchedRoute=main.route;record.matchedRouteUid=main.routeUid;record.matchedDriver=morningDriverNames(main.driver)[0]||main.driver;state.scheduleHelpers[key]=record;let helperRoute=helperMorningRouteFor(helper.name);if(!helperRoute){helperRoute=createManualMorningRoute({route:'HELPER',wave:'Helper'});helperRoute.helperAssignmentKey=key;}const equipment=deviceSheetDetails()[bag]||{};helperRoute.driver=contactForMorningDriver(helper.name)?.name||helper.name;helperRoute.route='HELPER';helperRoute.wave='Helper';helperRoute.service='Driver Helper';helperRoute.ev=bag;helperRoute.deviceName=equipment.device||'';helperRoute.portable=equipment.portable||'';assigned++;});
  persist();render();toast(`${assigned} Helper Bag${assigned===1?'':'s'} assigned to matched drivers and the Helper wave`);
}
function scheduleDateKey(value='') { const m=String(value).match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);if(!m)return '';let year=m[3]?Number(m[3]):Number(state.morningOperationDate.slice(0,4));if(year<100)year+=2000;return `${year}-${String(m[1]).padStart(2,'0')}-${String(m[2]).padStart(2,'0')}`; }
function scheduleImportDateKeys(entries=[]) {
  return [...new Set((entries||[]).map(entry=>scheduleDateKey(entry?.date)).filter(Boolean))];
}
function alignScheduleImportDate(entries=[],destination='roster') {
  const dates=scheduleImportDateKeys(entries);if(!dates.length)return '';
  const current=destination==='rostering'?state.rosteringDate:state.morningOperationDate,target=dates.includes(current)?current:dates[0];
  if(destination==='rostering')state.rosteringDate=target;
  else { state.morningOperationDate=target;state.morningSheetsLastReceipt=null; }
  return target;
}
function currentScheduleEntries() {
  return scheduleEntriesForDate(state.morningOperationDate);
}
async function readFiles(files) {
  try {
    if(state.importPurpose==='fleet'&&state.fleetImportSourceHint==='amazon') {
      const invalid=[...files].find(file=>!/^VehiclesData.*\.xlsx$/i.test(String(file.name||'')));
      if(invalid)throw new Error('Amazon Fleet Import only accepts VehiclesData… .xlsx files');
    }
    if(state.importPurpose==='fleet'&&state.fleetImportSourceHint==='fleetos') {
      const invalid=[...files].find(file=>!/^Vehicle_List.*\.csv$/i.test(String(file.name||'')));
      if(invalid)throw new Error('FleetOS Import only accepts Vehicle_List… .csv files');
    }
    const parsed=await Promise.all(files.map(parseUploadedFile));
    if(state.importPurpose==='whiparound') {
      const records=parsed.flatMap(file=>inspectionRecordsFromRows(file.rows||[]));
      if(!records.length)throw new Error('No Pre-Trip or Post-Trip EDV Inspection (DVIR) rows found');
      const byId=new Map((state.whiparoundInspections||[]).map(row=>[row.id,row]));records.forEach(row=>byId.set(row.id,row));
      state.whiparoundInspections=[...byId.values()].sort((a,b)=>b.date.localeCompare(a.date)||a.driver.localeCompare(b.driver));
      const dates=[...new Set(records.map(row=>row.date))].sort().reverse(),roster=currentWhiparoundRoster();
      dates.forEach(date=>{if(roster.length)state.whiparoundRosterSnapshots[date]=roster.map(row=>({...row,sources:[...row.sources]}));});
      state.whiparoundSelectedDate=dates[0];state.whiparoundImportName=parsed.map(file=>file.name).join(' + ');
      dates.forEach(date=>rebuildWhiparoundHistory(date));
      const applied=applyWhiparoundChecksToMorning(dates[0]);
      state.importPurpose='morning';state.page='inbox';persist();render();
      return toast(`${records.length} DVIR rows read · ${applied.pre} Pre-Trip and ${applied.post} Post-Trip Morning Sheet checks updated`);
    }
    if(state.importPurpose==='schedule') {
      const entries=parsed.flatMap(file=>file.rows?.length?scheduleEntriesFromRows(file.rows,{fileName:file.name}):scheduleEntriesFromText(file.text||''));
      if(!entries.length)throw new Error('no schedule shifts');
      const destination=state.scheduleImportDestination||'roster',entryDate=alignScheduleImportDate(entries,destination);state.scheduleEntries=entries;state.scheduleImportName=parsed.map(file=>file.name).join(' + ');
      let helperAdded=0;if(destination==='rostering')helperAdded=syncRosteringHelperShifts(currentRosteringPlan());
      state.scheduleImportDestination='';state.importPurpose='morning';state.page=destination==='rostering'?'rostering':'roster';persist();render();
      const dateNote=entryDate?` · ${formatShortOperationDate(entryDate)}`:'';
      return toast(destination==='rostering'?`${entries.length} PAYCOM shifts imported${dateNote} · ${helperAdded} Helper shift${helperAdded===1?'':'s'} added automatically · Auto Roster is ready`:`${entries.length} Paycom shifts organized for the Opening Roster${dateNote}`);
    }
    if(state.importPurpose==='rostering-screenshot') {
      const text=parsed.map(file=>file.text||rowsToText(file.rows||[])).filter(Boolean).join('\n');if(!text.trim())throw new Error('No readable roster text was found in the screenshot');
      const name=parsed.map(file=>file.name).join(' + '),plan=applyRosteringScreenshotText(text,name),rostered=plan.assignments.filter(row=>row.associate).length;state.importPurpose='morning';state.page='rostering';persist();render();return toast(`${plan.services.length} confirmed service${plan.services.length===1?'':'s'} rebuilt · ${rostered} associate${rostered===1?'':'s'} recognized`);
    }
    if(state.importPurpose==='parking') {
      const text=parsed.map(f=>f.text||rowsToText(f.rows)).filter(Boolean).join('\n');
      applyParkingText(text);
      state.vanParkingPasteText=text;
      state.importPurpose='fleet';
      persist();render();
      return toast('Van Parking updated from imported file');
    }
    if(state.importPurpose==='equipment') {
      const textParts=parsed.map(f=>f.text||rowsToText(f.rows)).filter(Boolean);
      const details=textParts.reduce((all,text)=>({...all,...equipmentDetailsFromText(text)}),{});
      const rowDetails=parsed.reduce((all,f)=>({...all,...equipmentDetailsFromRows(f.rows||[])}),{});
      const batchText=textParts.join('\n').trim();
      mergeEquipmentImport(parsed.map(f=>f.name).join(' + '),{...details,...rowDetails},batchText);
      const count=Object.keys(state.equipmentImport.details).length;
      state.modal='equipment';render();
      return toast(count?`${count} EV/VAN assignments ready to match`:'Screenshot OCR could not find VAN / DEVICE / PORTABLE rows — use the full-size image or upload the Sheet as XLSX/CSV','error');
    }
    if(state.importPurpose==='fleet') {
      const forcedSource=state.fleetImportSourceHint==='amazon'?'Amazon fleet list':state.fleetImportSourceHint==='fleetos'?'FleetOS tracker':'';
      const vehicles=parsed.flatMap(f=>fleetDetailsFromRows(f.rows||[],forcedSource||f.name));
      if(!vehicles.length) throw new Error('no fleet rows');
      const combinedVehicles=rememberFleetSourceUpload(vehicles,forcedSource||parsed.map(f=>f.name).join(' + '),new Date().toISOString());
      const total=applyFleetVehicles(combinedVehicles);
      state.modal=null; state.page='fleet';state.fleetImportSourceHint='';
      persist(); render();
      const groundedCount=vehicles.filter(vehicle=>normalizeOperational(vehicle.operational)==='Grounded').length,operationalCount=vehicles.filter(vehicle=>normalizeOperational(vehicle.operational)==='Operational').length;
      return toast(`${vehicles.length} fleet rows read · ${operationalCount} operational · ${groundedCount} grounded · ${total} vehicle cards tracked`);
    }
    if(state.importPurpose==='drivers') {
      const contacts=parsed.flatMap(f=>driverContactsFromRows(f.rows||[]));
      if(!contacts.length) throw new Error('no driver contacts');
      const total=mergeDriverContacts(contacts);
      state.driverContactsLastImport=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date());
      state.importPurpose='morning';
      state.page='team';
      persist(); render();
      return toast(`${contacts.length} driver contact${contacts.length===1?'':'s'} imported · ${total} total saved`);
    }
    if(state.importPurpose==='itinerary-rts') {
      const invalidName=parsed.find(file=>!/^itineraries_djt6/i.test(String(file.name||'')));
      if(invalidName)throw new Error('RTS import requires a file beginning with Itineraries_DJT6');
      const details=parsed.reduce((all,file)=>mergeItineraryRtsDetails(all,itineraryRtsDetailsFromRows(file.rows||[])),{}),count=Object.keys(details).length;
      if(!count)throw new Error('No Route code + Planned return to station rows found');
      state.lastItineraryRts=details;
      state.importedFile={name:parsed.map(file=>file.name).join(' + '),headers:parsed[0]?.rows?.[0]||[],rows:parsed.flatMap(file=>(file.rows||[]).slice(1)),kind:'rts',routeDetails:details,routeDetailsCount:count};
      let matched=0,flagged=0;
      state.morningRoutes.forEach(route=>{
        const detail=details[normalizeCxRoute(route.route)];
        if(!detail?.plannedRts)return;
        matched++;route.plannedRts=detail.plannedRts;route.plannedRtsSource='itinerary';route.plannedRtsIssue=isIrregularPlannedRts(detail.plannedRts,route.wave,route.duration);if(route.plannedRtsIssue)flagged++;
      });
      state.modal=null;state.page='morning';state.importPurpose='morning';persist();render();
      return toast(`${matched} Planned return to station times filled automatically${flagged?` · ${flagged} flagged for review`:''}`);
    }
    const plan=parsed.find(f=>/day\s*of\s*ops\s*plan/i.test(f.name)||findImportHeader(f.rows,[['route','routecode','cxnumber','cxroute','blockid'],['wave','wavetime','starttime'],['staging','staginglocation']])>=0);
    const routeFile=parsed.find(f=>/route[_\s-]*djt6/i.test(f.name))||parsed.find(f=>f!==plan&&Object.keys(routeDetailsFromRows(f.rows)).length);
    const details=routeFile?routeDetailsFromRows(routeFile.rows):{};
    const primary=plan||routeFile;
    if(!primary)throw new Error('unrecognized');
    const planHeader=plan?findImportHeader(plan.rows,[['route','routecode','cxnumber','cxroute','blockid'],['wave','wavetime','starttime'],['staging','staginglocation']]):findImportHeader(primary.rows,[['route','routecode','routeid','cx','cxnumber','cxroute','blockid']]);
    const rows=primary.rows.slice(Math.max(0,planHeader));
    state.importedFile={name:parsed.map(f=>f.name).join(' + '),headers:rows[0],rows:rows.slice(1),kind:state.importPurpose==='rts'?'rts':(plan?'plan':'details'),routeDetails:details,routeDetailsCount:Object.keys(details).length};
    render();toast(`${parsed.length} file${parsed.length===1?'':'s'} ready · CX routes will be matched automatically`);
  } catch(error) {
    console.error(error);if(state.importPurpose==='itinerary-rts')return toast(error?.message||'Choose an Itineraries_DJT6 XLSX containing Route code and Planned return to station','error');toast(state.importPurpose==='rostering-screenshot'?(error?.message||'Could not read Amazon confirmed services or associate rows. Upload a clear full-size roster screenshot.'):state.importPurpose==='whiparound'?(error?.message||'Could not find the five required Whiparound columns. Choose a CSV or XLSX inspection report.'):state.importPurpose==='schedule'?'Could not find scheduled names, times, and shift labels. Upload the Paycom PDF, screenshot, CSV, Excel, or text export.':state.importPurpose==='fleet'?(error?.message||'Could not find VIN rows in the selected fleet file.'):state.importPurpose==='drivers'?'Could not find driver names and phone numbers. Use a CSV or XLSX file with Name and Personal Phone columns.':'These files could not be read. Choose DAYOFOPSPLAN and ROUTE_DJT6 as CSV or XLSX.','error');
  }
}
async function readFile(file) { return readFiles([file]); }

function rowsToText(rows=[]) { return rows.map(row=>row.join('\t')).join('\n'); }
function rowsFromPastedTable(text='') {
  const value=String(text||'').trim();
  if(!value)return [];
  if(value.includes('\t')) return value.split(/\r?\n/).map(line=>line.split('\t').map(cell=>cell.trim())).filter(row=>row.some(Boolean));
  const csvRows=parseCSV(value);
  if(csvRows.length&&csvRows[0]?.length>1)return csvRows;
  return value.split(/\r?\n/).map(line=>line.trim().split(/\s{2,}/).map(cell=>cell.trim())).filter(row=>row.length>1&&row.some(Boolean));
}

function normalizeHeader(value='') { return String(value).toLowerCase().replace(/[^a-z0-9]/g,''); }
function firstExisting(row,headers,names) {
  for(const name of names) {
    const wanted=normalizeHeader(name),ix=headers.findIndex(header=>normalizeHeader(header)===wanted);
    if(ix>=0)return row[ix];
  }
  return '';
}
function numberFrom(value, fallback=null) {
  const match=String(value??'').match(/-?\d+(?:\.\d+)?/);
  return match?Number(match[0]):fallback;
}
function cleanVin(value='') {
  const vin=String(value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
  return vin.length>=11?vin:'';
}
function normalizeActive(value='',fallback='Active') {
  const s=String(value||'').toLowerCase();
  if(/inactive|deactiv|retired|disabled/.test(s))return 'Inactive';
  if(/active|enabled|available|operational|ready/.test(s))return 'Active';
  return fallback;
}
function normalizeOperational(value='',fallback='Unknown') {
  const s=String(value||'').toLowerCase();
  if(/grounded|outofservice|out of service|repair|maintenance|disabled|inactive/.test(s))return 'Grounded';
  if(/operational|active|ready|available|in service|inservice/.test(s))return 'Operational';
  return fallback;
}
function normalizeFleetVehicle(vehicle={}) {
  const rawBattery=numberFrom(vehicle.battery,undefined);
  const battery=Number.isFinite(rawBattery)?Math.max(0,Math.min(100,Math.round(rawBattery))):null;
  const rawMiles=numberFrom(vehicle.miles,undefined);
  const miles=Number.isFinite(rawMiles)?Math.max(0,Math.round(rawMiles)):battery===null?null:Math.max(0,Math.round(battery*1.56));
  const vin=cleanVin(vehicle.vin)||String(vehicle.vin||'').trim().toUpperCase();
  return {
    name:String(FIXED_FLEET_NAMES[vin]||vehicle.name||vehicle.vin||'Unnamed EV').trim(),
    vin,
    plate:String(vehicle.plate||'').trim(),
    battery,
    miles,
    active:normalizeActive(vehicle.active||vehicle.status,vehicle.active||'Active'),
    operational:normalizeOperational(vehicle.operational||vehicle.status,vehicle.operational||'Unknown'),
    serviceType:String(vehicle.serviceType||'').trim(),
    status:String(vehicle.status||batteryLabel(battery)).trim(),
    source:String(vehicle.source||'Demo data').trim(),
    changedFields:Array.isArray(vehicle.changedFields)?vehicle.changedFields:[],
    updated:Boolean(vehicle.updated),
    updatedAt:String(vehicle.updatedAt||'').trim(),
    hasName:Boolean(vehicle.hasName),
    hasPlate:Boolean(vehicle.hasPlate),
    hasActive:Boolean(vehicle.hasActive),
    hasOperational:Boolean(vehicle.hasOperational),
    hasServiceType:Boolean(vehicle.hasServiceType),
    hasBattery:Boolean(vehicle.hasBattery),
    hasMiles:Boolean(vehicle.hasMiles)
  };
}
function fleetSourceFromHint(value='') {
  const hint=String(value||'').toLowerCase();
  const hasAmazon=/amazon|logistics|fleet.?management/.test(hint);
  const hasFleetos=/rivian|fleetos|tracker|state of charge|battery/.test(hint);
  if(hasAmazon&&hasFleetos)return 'Amazon fleet list + FleetOS tracker';
  if(hasAmazon)return 'Amazon fleet list';
  if(hasFleetos)return 'FleetOS tracker';
  return '';
}
function inferFleetSource(headers=[],sourceName='',rowSource='') {
  const genericName=/pasted amazon\s*\/\s*fleetos|fleet export/i.test(sourceName)?'':sourceName;
  const explicit=fleetSourceFromHint(rowSource)||fleetSourceFromHint(genericName);
  if(explicit)return explicit;
  const keys=headers.map(headerKey);
  const hasAmazonCols=keys.some(h=>['vehiclename','vehicle','name','asset','assetname','assetid','fleetid','van','ev','displayname','vehicledisplayname','unit','unitname','unitnumber','licenseplate','licenseplateid','plate','plateid','platenumber','registration','registrationnumber','license','tag','active','activitystatus','lifecyclestatus','lifecyclestate','vehiclestatus','availability','availabilitystatus','assignmentstatus','operational','operationstatus','operationalstate','operationalstatus','grounded','groundingstatus','vehiclestate','servicestatus','maintenancestatus'].includes(h));
  const hasFleetosCols=keys.some(h=>['battery','batterypercent','batterypercentage','soc','socpercent','stateofcharge','stateofchargepercent','charge','chargepercent','range','rangemi','rangemiles','estimatedrange','estimatedrangemi','estimatedrangemiles','remainingrange','remainingrangemi','remainingrangemiles','remainingmiles','milesremaining'].includes(h));
  if(hasAmazonCols&&hasFleetosCols)return 'Amazon fleet list + FleetOS tracker';
  if(hasAmazonCols)return 'Amazon fleet list';
  if(hasFleetosCols)return 'FleetOS tracker';
  return 'Fleet export';
}
function fleetDetailsFromRows(rows=[],sourceName='Fleet export') {
  const header=findImportHeader(rows,[['vin','vehicleidentificationnumber','vehiclevin']]);
  if(header<0)return [];
  const headers=rows[header].map(v=>String(v||''));
  const defaultSource=inferFleetSource(headers,sourceName);
  return rows.slice(header+1).map(row=>{
    const vin=cleanVin(firstExisting(row,headers,['vin','vin #','vin number','vinnumber','vehicle identification number','vehicleidentificationnumber','vehicle vin','vehiclevin','vehicle id','vehicleid']));
    if(!vin)return null;
    const source=inferFleetSource(headers,sourceName,firstExisting(row,headers,['source','data source','datasource','portal','system','export source','exportsource']))||defaultSource;
    const rawName=firstExisting(row,headers,['vehicle','vehicle name','vehiclename','name','asset','asset name','assetname','asset id','assetid','fleet id','fleetid','van','ev','display name','displayname','vehicle display name','vehicledisplayname','unit','unit name','unitname','unit number','unitnumber']);
    const name=rawName||vin;
    const plate=firstExisting(row,headers,['license plate','licenseplate','license plate #','license plate number','licenseplatenumber','licenseplateid','plate','plate #','plate id','plateid','plate number','platenumber','registration','registration number','registrationnumber','license','tag']);
    const active=firstExisting(row,headers,['active','activity status','activitystatus','lifecycle status','lifecyclestatus','lifecycle state','lifecyclestate','vehicle status','vehiclestatus','availability','availability status','availabilitystatus','assignment status','assignmentstatus','status']);
    const operational=firstExisting(row,headers,['operational','operation status','operationstatus','operational state','operationalstate','operational status','operationalstatus','grounded','grounding status','groundingstatus','state','vehicle state','vehiclestate','service status','servicestatus','maintenance status','maintenancestatus','status']);
    const serviceType=firstExisting(row,headers,['service type','servicetype','vehicle type','vehicletype','vehicle class','vehicleclass','asset type','assettype']);
    const battery=firstExisting(row,headers,['battery','battery %','battery percent','batterypercentage','battery percentage','soc','soc %','socpercent','state of charge','stateofcharge','state of charge %','stateofchargepercent','charge','charge %','charge percent','chargepercent']);
    const miles=firstExisting(row,headers,['range','range mi','rangemi','range miles','rangemiles','distance to empty','distancetoempty','estimated range','estimatedrange','estimated range mi','estimatedrangemi','estimated range miles','estimatedrangemiles','estimated range (mi)','remaining range','remainingrange','remaining range mi','remainingrangemi','remaining range miles','remainingrangemiles','remaining miles','remainingmiles','miles remaining','milesremaining']);
    const sourceStatus=firstExisting(row,headers,['charging status','chargingstatus','connection status','connectionstatus','status']);
    const item=normalizeFleetVehicle({vin,name,plate,battery:numberFrom(battery,undefined),miles:numberFrom(miles,undefined),active,operational,serviceType,status:sourceStatus||active||operational||'',source});
    item.hasName=Boolean(String(rawName||'').trim());
    item.hasPlate=Boolean(String(plate||'').trim());
    item.hasActive=Boolean(String(active||'').trim());
    item.hasOperational=Boolean(String(operational||'').trim());
    item.hasServiceType=Boolean(String(serviceType||'').trim());
    item.hasBattery=String(battery??'').trim()!=='';
    item.hasMiles=String(miles??'').trim()!=='';
    return item;
  }).filter(Boolean);
}
function fleetChangedFields(before={},after={}) {
  if(!before.vin)return ['new EV'];
  const labels={name:'name',plate:'plate',battery:'battery',miles:'range',active:'active status',operational:'operational state',serviceType:'service type'};
  return Object.entries(labels).filter(([key])=>String(before[key]??'')!==String(after[key]??'')).map(([,label])=>label);
}
function fleetComparableValue(value,field='') {
  if(value===undefined||value===null)return '';
  const raw=String(value).trim();
  if(!raw)return '';
  if(['battery','miles'].includes(field)){
    const n=numberFrom(raw,undefined);
    return n===undefined?'':String(n);
  }
  return raw.toLowerCase().replace(/\s+/g,' ');
}
function fleetImportConflicts(imports=[]) {
  const labels={name:'Name',plate:'License plate',active:'Active/Inactive',operational:'Operational/Grounded',serviceType:'Service type',battery:'Battery %',miles:'Range miles'};
  const hasFlag={name:'hasName',plate:'hasPlate',active:'hasActive',operational:'hasOperational',serviceType:'hasServiceType',battery:'hasBattery',miles:'hasMiles'};
  const fields=Object.keys(labels), groups=new Map(), conflicts=[];
  imports.forEach(item=>{
    const vin=cleanVin(item.vin); if(!vin)return;
    const sourceKey=fleetSourceKey(item.source), sourceLabel=sourceKey==='amazon'?'Amazon fleet list':sourceKey==='fleetos'?'FleetOS tracker':(item.source||'Fleet export');
    const key=`${vin}|${sourceKey}`;
    if(!groups.has(key))groups.set(key,{vin,source:sourceLabel,values:Object.fromEntries(fields.map(f=>[f,new Map()]))});
    const group=groups.get(key);
    fields.forEach(field=>{
      if(!item[hasFlag[field]])return;
      const comparable=fleetComparableValue(item[field],field);
      if(!comparable)return;
      const display=String(item[field]).trim();
      if(!group.values[field].has(comparable))group.values[field].set(comparable,display);
    });
  });
  groups.forEach(group=>{
    fields.forEach(field=>{
      const values=[...group.values[field].values()];
      if(values.length>1)conflicts.push({vin:group.vin,source:group.source,field:labels[field],values});
    });
  });
  return conflicts;
}
function mergeFleetVehicles(imports=[]) {
  const previousByVin=new Map(rivianFleet.map(v=>{
    const normalized=normalizeFleetVehicle(v);
    normalized.changedFields=[];
    normalized.updated=false;
    return [cleanVin(normalized.vin),normalized];
  }));
  const byVin=new Map();
  const nowIso=new Date().toISOString();
  const touched=new Set(), newVins=new Set(), seenImportRows=new Set(), duplicateVins=new Set(), conflicts=fleetImportConflicts(imports);
  imports.forEach(item=>{
    const vin=cleanVin(item.vin); if(!vin)return;
    const rowKey=`${vin}|${item.source||'unknown'}`;
    if(seenImportRows.has(rowKey))duplicateVins.add(vin);
    seenImportRows.add(rowKey);
    const current=byVin.get(vin)||previousByVin.get(vin)||{};
    const alreadyTouched=byVin.has(vin);
    if(!previousByVin.has(vin))newVins.add(vin);
    touched.add(vin);
    const next={...current,...item,vin}, itemHasAmazon=hasAmazonFleetSource(item.source), currentHasAmazon=hasAmazonFleetSource(current.source);
    if(itemHasAmazon&&item.name) next.name=item.name;
    else if(currentHasAmazon&&current.name) next.name=current.name;
    else next.name=vin;
    if(!item.hasName&&currentHasAmazon&&current.name) next.name=current.name;
    if(!item.hasPlate&&current.plate) next.plate=current.plate;
    if(!item.hasActive&&current.active) next.active=current.active;
    if(!item.hasOperational&&current.operational) next.operational=current.operational;
    if(!item.hasServiceType&&current.serviceType) next.serviceType=current.serviceType;
    if(!item.hasBattery&&current.battery!==undefined) next.battery=current.battery;
    if(!item.hasMiles&&current.miles!==undefined) next.miles=current.miles;
    next.hasName=Boolean(current.hasName||item.hasName);
    next.hasPlate=Boolean(current.hasPlate||item.hasPlate);
    next.hasActive=Boolean(current.hasActive||item.hasActive);
    next.hasOperational=Boolean(current.hasOperational||item.hasOperational);
    next.hasServiceType=Boolean(current.hasServiceType||item.hasServiceType);
    next.hasBattery=Boolean(current.hasBattery||item.hasBattery);
    next.hasMiles=Boolean(current.hasMiles||item.hasMiles);
    next.source=[current.source,item.source].filter(Boolean).join(' + ').split(' + ').filter((v,i,a)=>a.indexOf(v)===i).join(' + ')||'FleetOS + Amazon';
    const normalized=normalizeFleetVehicle(next);
    const delta=fleetChangedFields(current,normalized);
    normalized.changedFields=[...new Set([...(alreadyTouched?current.changedFields||[]:[]),...delta])];
    normalized.updated=normalized.changedFields.length>0;
    normalized.updatedAt=normalized.updated?nowIso:(current.updatedAt||normalized.updatedAt||'');
    byVin.set(vin,normalized);
  });
  const rows=[...byVin.values()].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})||a.vin.localeCompare(b.vin));
  const updated=rows.filter(v=>touched.has(cleanVin(v.vin))&&v.updated).length;
  const removedVins=[...previousByVin.keys()].filter(vin=>!touched.has(vin));
  const removed=removedVins.length;
  rows.summary={input:imports.length,touched:touched.size,newCount:newVins.size,updated,unchanged:Math.max(0,touched.size-updated),removed,removedVins,removedVehicles:removedVins.map(vin=>previousByVin.get(vin)).filter(Boolean),duplicates:duplicateVins.size,duplicateVins:[...duplicateVins],conflicts:conflicts.length,conflictVins:[...new Set(conflicts.map(x=>x.vin))],conflictRows:conflicts};
  return rows;
}
function applyFleetVehicles(vehicles=[],options={}) {
  const merged=mergeFleetVehicles(vehicles);
  rivianFleet.splice(0,rivianFleet.length,...merged);
  const deviceRowsAdded=syncFleetVehiclesToDeviceSheet(merged);
  const gasParkingRows=syncGasVehiclesToParking(merged);
  state.fleetChangedVins=Object.fromEntries(merged.filter(v=>v.updated).map(v=>[v.vin,v.changedFields]));
  state.fleetUpdateSummary={...(merged.summary||{}),visible:sortedRivianFleet().length,deviceRowsAdded,gasParkingRows};
  if(!options.silent) {
    state.fleetLastRefresh=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    persist();
    render();
  }
  return merged.length;
}
function fleetRefreshPreviewFromVehicles(vehicles=[]) {
  const currentByVin=new Map(rivianFleet.map(v=>[cleanVin(v.vin),v]));
  const merged=mergeFleetVehicles(vehicles), stats=fleetPortalMatchStatsForRows(vehicles);
  const expected=Number(state.fleetExpectedCount)||0, expectedShort=expected?Math.max(0,expected-stats.uniqueVins.size):0;
  const fleetosShort=expected?Math.max(0,expected-stats.fleetos.size):0;
  const uploadAge=fleetUploadAge();
  const missingSources=[];
  if(!stats.amazon.size)missingSources.push('Amazon fleet list');
  if(!stats.fleetos.size)missingSources.push('FleetOS tracker');
  const missingVinPreview=[
    ...stats.amazonOnly.slice(0,8).map(vin=>({vin,issue:'Needs FleetOS battery/range',source:'Amazon only'})),
    ...stats.fleetosOnly.slice(0,8).map(vin=>({vin,issue:'Needs Amazon name/status',source:'FleetOS only'}))
  ];
  const blockerList=[
    uploadAge.stale?`Saved fleet upload is ${uploadAge.label} old — upload fresh Amazon/FleetOS exports before approving`:'',
    ...missingSources.map(source=>`${source} is missing — upload it for full accuracy`),
    merged.summary?.duplicates?`${merged.summary.duplicates} duplicate VIN${merged.summary.duplicates===1?'':'s'} — remove duplicate source rows first`:'',
    merged.summary?.conflicts?`${merged.summary.conflicts} conflicting field${merged.summary.conflicts===1?'':'s'} found in portal rows — clean same-VIN disagreements before approving`:'',
    merged.summary?.removed?`${merged.summary.removed} existing EV card${merged.summary.removed===1?'':'s'} not in this upload — check for a partial export before approving`:'',
    fleetosShort?`${fleetosShort} FleetOS battery row${fleetosShort===1?'':'s'} missing vs expected ${expected} — upload the full tracker export`:'',
    expectedShort?`${expectedShort} EV${expectedShort===1?'':'s'} short of expected ${expected} — check Amazon/FleetOS exports`:''
  ].filter(Boolean);
  const changed=merged.filter(v=>v.updated), amazonFields=new Set(['name','plate','active status','operational state']), fleetosFields=new Set(['battery','range']);
  const fieldLabels=[
    ['name','Name','Amazon fleet list'],
    ['plate','Plate','Amazon fleet list'],
    ['active status','Active / Inactive','Amazon fleet list'],
    ['operational state','Operational / Grounded','Amazon fleet list'],
    ['battery','Battery %','FleetOS tracker'],
    ['range','Range miles','FleetOS tracker'],
    ['new EV','New EV card','Amazon/FleetOS']
  ];
  const fieldBreakdown=fieldLabels.map(([field,label,source])=>({field,label,source,count:changed.filter(v=>(v.changedFields||[]).includes(field)).length}));
  const batteryChanges=merged.filter(v=>(v.changedFields||[]).some(field=>fleetosFields.has(field))).slice(0,8).map(v=>{
    const old=currentByVin.get(cleanVin(v.vin))||{};
    return {
      name:v.name||v.vin,
      vin:v.vin,
      batteryBefore:knownBatteryPercent(old.battery),
      batteryAfter:knownBatteryPercent(v.battery),
      milesBefore:Number.isFinite(Number(old.miles))?Number(old.miles):null,
      milesAfter:Number.isFinite(Number(v.miles))?Number(v.miles):null,
      tone:batteryTone(v.battery)
    };
  });
  const statusChanges=merged.filter(v=>(v.changedFields||[]).some(field=>amazonFields.has(field))).slice(0,8).map(v=>{
    const old=currentByVin.get(cleanVin(v.vin))||{};
    const changedFields=v.changedFields||[];
    const lines=[
      changedFields.includes('name')?`Name: ${old.name||'—'} → ${v.name||'—'}`:'',
      changedFields.includes('plate')?`Plate: ${old.plate||'—'} → ${v.plate||'—'}`:'',
      changedFields.includes('active status')?`Active: ${old.active||'—'} → ${v.active||'—'}`:'',
      changedFields.includes('operational state')?`Status: ${old.operational||'—'} → ${v.operational||'—'}`:''
    ].filter(Boolean);
    return {
      name:v.name||v.vin,
      vin:v.vin,
      lines,
      tone:String(v.operational||'').toLowerCase().includes('ground')||String(v.active||'').toLowerCase().includes('inactive')?'warn':'ok'
    };
  });
  const sourceImpact=[
    {source:'Amazon fleet list',fields:'official EV name, license plate, Active/Inactive, Operational/Grounded',rule:'Amazon wins for van names and status',count:changed.filter(v=>(v.changedFields||[]).some(f=>amazonFields.has(f))).length,ready:stats.amazon.size>0},
    {source:'FleetOS tracker',fields:'battery %, range miles, charge readiness',rule:'FleetOS wins for battery and range',count:changed.filter(v=>(v.changedFields||[]).some(f=>fleetosFields.has(f))).length,ready:stats.fleetos.size>0}
  ];
  return {
    input:merged.summary?.input||vehicles.length,
    total:merged.length,
    updated:merged.summary?.updated||0,
    newCount:merged.summary?.newCount||0,
    removed:merged.summary?.removed||0,
    removedVehicles:merged.summary?.removedVehicles||[],
    duplicates:merged.summary?.duplicates||0,
    duplicateVins:merged.summary?.duplicateVins||[],
    conflicts:merged.summary?.conflicts||0,
    conflictVins:merged.summary?.conflictVins||[],
    conflictRows:merged.summary?.conflictRows||[],
    expected,
    expectedShort,
    unknownExpectedShort:Math.max(0,expectedShort-missingVinPreview.length),
    fleetosShort,
    fleetosCount:stats.fleetos.size,
    uniqueVins:stats.uniqueVins.size,
    missingSources,
    missingVinPreview,
    missingVinCount:stats.amazonOnly.length+stats.fleetosOnly.length,
    blockers:blockerList,
    sourceImpact,
    fieldBreakdown,
    batteryChanges,
    statusChanges,
    changedPreview:merged.filter(v=>v.updated).slice(0,5).map(v=>({name:v.name,vin:v.vin,fields:v.changedFields||[]}))
  };
}

function parseCSV(text) {
  const rows=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&quoted&&n==='"'){cell+='"';i++;}else if(c==='"'){quoted=!quoted;}else if(c===','&&!quoted){row.push(cell.trim());cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&n==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}
  row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows;
}

function decodeXml(value='') {
  return String(value).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}
function columnIndex(reference='A1') {
  const letters=(String(reference).match(/[A-Z]+/i)||['A'])[0].toUpperCase();
  return [...letters].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0)-1;
}
function textNodes(xml='') {
  const values=[]; const re=/<(?:\w+:)?t\b[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/gi; let m;
  while((m=re.exec(xml))) values.push(decodeXml(m[1]));
  return values.join('');
}
function parseWorksheetXml(xml,sharedStrings) {
  const rows=[]; const rowRe=/<(?:\w+:)?row\b[^>]*>([\s\S]*?)<\/(?:\w+:)?row>/gi; let rowMatch;
  while((rowMatch=rowRe.exec(xml))) {
    const row=[]; const cellRe=/<(?:\w+:)?c\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?c>/gi; let cell;
    while((cell=cellRe.exec(rowMatch[1]))) {
      const attrs=cell[1], body=cell[2], ref=(attrs.match(/\br="([^"]+)"/i)||[])[1]||`A${rows.length+1}`, type=(attrs.match(/\bt="([^"]+)"/i)||[])[1]||'';
      const raw=(body.match(/<(?:\w+:)?v\b[^>]*>([\s\S]*?)<\/(?:\w+:)?v>/i)||[])[1];
      let value='';
      if(type==='s') value=sharedStrings[Number(raw)]??'';
      else if(type==='inlineStr') value=textNodes(body);
      else if(type==='b') value=raw==='1'?'TRUE':'FALSE';
      else if(type==='str'||type==='e') value=decodeXml(raw??'');
      else if(raw!==undefined) value=Number.isFinite(Number(raw))?Number(raw):decodeXml(raw);
      row[columnIndex(ref)]=value;
    }
    if(row.some(v=>v!==''&&v!==undefined)) rows.push(Array.from({length:row.length},(_,i)=>row[i]??''));
  }
  return rows;
}
async function parseXlsxArrayBuffer(buffer) {
  if(typeof JSZip==='undefined') throw new Error('Excel reader is unavailable');
  const zip=await JSZip.loadAsync(buffer), read=async path=>zip.file(path)?zip.file(path).async('string'):'';
  const sharedXml=await read('xl/sharedStrings.xml'), shared=[]; const siRe=/<(?:\w+:)?si\b[^>]*>([\s\S]*?)<\/(?:\w+:)?si>/gi; let si;
  while((si=siRe.exec(sharedXml))) shared.push(textNodes(si[1]));
  const workbook=await read('xl/workbook.xml'), rels=await read('xl/_rels/workbook.xml.rels'), relationMap={};
  const relRe=/<Relationship\b([^>]*?)(?:\/>|>[\s\S]*?<\/Relationship>)/gi; let rel;
  while((rel=relRe.exec(rels))) { const id=(rel[1].match(/\bId="([^"]+)"/i)||[])[1], target=(rel[1].match(/\bTarget="([^"]+)"/i)||[])[1]; if(id&&target)relationMap[id]=target; }
  const paths=[]; const sheetRe=/<(?:\w+:)?sheet\b([^>]*?)(?:\/>|>[\s\S]*?<\/(?:\w+:)?sheet>)/gi; let sheet;
  while((sheet=sheetRe.exec(workbook))) { const id=(sheet[1].match(/\br:id="([^"]+)"/i)||[])[1], target=relationMap[id]; if(target){const clean=target.replace(/^\//,'').replace(/^\.\.\//,'');paths.push(clean.startsWith('xl/')?clean:`xl/${clean}`);} }
  if(!paths.length) paths.push(...Object.keys(zip.files).filter(p=>/^xl\/worksheets\/sheet\d+\.xml$/i.test(p)).sort());
  let fallback=[], bestVinSheet=null, bestDriverSheet=null, bestWhiparoundSheet=null;
  for(const path of paths) {
    const rows=parseWorksheetXml(await read(path),shared); if(!rows.length)continue; if(!fallback.length)fallback=rows;
    const driverHeader=findImportHeader(rows,[['name','nameandid','preferredname','fullname','driver','drivername','employeename','associate','associatename','deliveryassociate'],['phone','phonenumber','personalphone','personalphonenumber','primaryphone','mobile','mobilephone','cell','cellphone','telephone']]);
    if(driverHeader>=0) {
      const keys=rows[driverHeader].map(headerKey), driverFields=['name','nameandid','deliveryassociate','personalphone','personalphonenumber','position','status','transporterid'];
      const score=(rows.length-driverHeader)*10+keys.filter(h=>driverFields.includes(h)).length;
      if(!bestDriverSheet||score>bestDriverSheet.score) bestDriverSheet={score,rows:rows.slice(driverHeader)};
    }
    const whiparoundHeader=findImportHeader(rows,[['form'],['dateinspectionoccurred'],['assetname'],['driverfirstname'],['driverlastname']]);
    if(whiparoundHeader>=0){const score=(rows.length-whiparoundHeader)*10;if(!bestWhiparoundSheet||score>bestWhiparoundSheet.score)bestWhiparoundSheet={score,rows:rows.slice(whiparoundHeader)};}
    const header=rows.findIndex(row=>{const cells=row.map(v=>String(v).toLowerCase().replace(/[^a-z0-9]/g,''));return cells.includes('dsp')&&cells.includes('routecode')&&cells.includes('wave')&&cells.includes('staginglocation');});
    if(header>=0&&state.importPurpose!=='drivers') return rows.slice(header);
    const vinHeader=rows.findIndex(row=>row.map(headerKey).some(h=>['vin','vinnumber','vehiclevin','vehicleidentificationnumber'].includes(h)));
    if(vinHeader>=0) {
      const keys=rows[vinHeader].map(headerKey);
      const fleetCols=['vin','vinnumber','vehiclevin','vehicleidentificationnumber','vehiclename','licenseplate','active','operational','battery','batterypercent','soc','stateofcharge','rangemiles','estimatedrange'];
      const score=(rows.length-vinHeader)*10+keys.filter(h=>fleetCols.includes(h)).length;
      if(!bestVinSheet||score>bestVinSheet.score) bestVinSheet={score,rows:rows.slice(vinHeader)};
    }
  }
  if(state.importPurpose==='drivers'&&bestDriverSheet) return bestDriverSheet.rows;
  if(state.importPurpose==='whiparound'&&bestWhiparoundSheet) return bestWhiparoundSheet.rows;
  return bestVinSheet?.rows||bestDriverSheet?.rows||bestWhiparoundSheet?.rows||fallback;
}

function applyImport() {
  const f=state.importedFile;if(!f)return;
  const proof=importPreflight(f);
  if(proof&&!proof.ready) {
    state.modal='import';
    render();
    return toast(`Import needs review: ${proof.missing?.length?proof.missing.join(', '):'no matching routes found'}`,'error');
  }
  if(f.kind==='details'||f.kind==='rts') {
    let matched=0, flagged=0;
    state.morningRoutes.forEach(route=>{const detail=f.routeDetails?.[String(route.route).toUpperCase()];if(!detail)return;matched++;if(f.kind==='details'){if(detail.driver)route.driver=firstDriverName(detail.driver);if(detail.stops!==null)route.stops=detail.stops;}if(detail.plannedRts){route.plannedRts=detail.plannedRts;route.plannedRtsIssue=isIrregularPlannedRts(detail.plannedRts,route.wave,route.duration);if(route.plannedRtsIssue)flagged++;}});
    state.modal=null;state.page='morning';state.editMode=false;persist();render();return toast(f.kind==='rts'?`${matched} Planned RTS times filled · ${flagged} flagged for review`:`${matched} CX routes updated with driver names and stop counts`);
  }
  const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
  const index=(...names)=>{const n=names.map(norm);return f.headers.findIndex(h=>n.includes(norm(h)));};
  const ix={dsp:index('dsp','dspcode','company'),route:index('route','routecode','cxnumber','cxroute','blockid'),driver:index('driver','drivername','transportername','employeename','daname','associatename','da'),service:index('servicetype','service'),wave:index('wave','wave time','wavetime','starttime'),staging:index('staging','staginglocation'),duration:index('routeduration','duration'),zones:index('numzones','zones'),commercial:index('numcommercialpkgs','commercialpackages','commercial'),van:index('van','vehicle','vehicleid'),device:index('device','deviceid'),stops:index('stops','stopcount','plannedstops','stopsplanned','numstops'),packages:index('packages','packagecount','numpackages')};
  if(ix.wave>=0&&ix.staging>=0) {
    const candidates=morningImportCandidates(f);
    const excluded=f.rows.length-candidates.length;
    state.morningRoutes=candidates.map(({row:r,route},i)=>{
      const detail=f.routeDetails?.[route];
      const packages=Number(r[ix.packages])||0, zones=Number(r[ix.zones])||0;
      const importedStops=Number(r[ix.stops]);
      const wave=normalizeMorningWaveTime(r[ix.wave])||'Wave pending', plannedRts=detail?.plannedRts||'', duration=Number(r[ix.duration])||0;
      return {dsp:ix.dsp>=0?String(r[ix.dsp]).trim().toUpperCase():state.dspCode,driver:firstDriverName(detail?.driver||(ix.driver>=0&&r[ix.driver])||'Unassigned driver'),route,service:(ix.service>=0&&r[ix.service])||'Standard Parcel',wave,staging:r[ix.staging]||'—',duration,zones,packages,commercial:Number(r[ix.commercial])||0,stops:detail?.stops!==null&&detail?.stops!==undefined?detail.stops:(Number.isFinite(importedStops)?importedStops:0),eta:'—',bags:Math.max(1,Math.round(packages/13)),overflow:Math.max(0,Math.round(packages/24)),parking:'',ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,packageReturns:'',endTime:'',rtsTime:'',plannedRts,plannedRtsIssue:isIrregularPlannedRts(plannedRts,wave,duration),clockOutTime:'',checkedIn:false,vanReady:false,deviceReady:false,portableReady:false,loadReady:false};
    }).sort((a,b)=>waveMinutes(a.wave)-waveMinutes(b.wave)||routeCompare(a.route,b.route)||a.staging.localeCompare(b.staging,undefined,{numeric:true}));
    state.routes=state.morningRoutes.map((r,i)=>({route:r.route,driver:r.driver,id:`DA-${1100+i}`,wave:r.wave,staging:r.staging,van:'Unassigned',device:'Unassigned',stops:r.stops,packages:r.packages,progress:0,delta:0,status:r.driver==='Unassigned driver'?'Needs review':'Assigned',rescue:'—'}));
    const importedWaves=[...new Set(state.morningRoutes.filter(row=>!isExplicitAdhocMorningRoute(row)&&!isExplicitHelperMorningRoute(row)).map(row=>row.wave).filter(Boolean))];state.openingPicklistWaveSlots=Math.min(5,importedWaves.length);state.openingPicklistShowAdhoc=true;
    state.lastImportExcluded=excluded;state.modal=null;state.page='morning';state.morningFilters={wave:'all',staging:'all',pad:'all'};state.rosterPublished=false;persist();render();return toast(`${state.morningRoutes.length} ${state.dspCode} routes loaded across every Service Type · ${excluded} other-DSP or non-route rows skipped`);
  }
  state.routes=f.rows.map((r,i)=>({route:r[ix.route]||`IMP-${i+1}`,driver:firstDriverName(r[ix.driver]||'Unassigned driver'),id:`DA-${1100+i}`,wave:r[ix.wave]||'Wave pending',staging:r[ix.staging]||'—',van:r[ix.van]||'Unassigned',device:r[ix.device]||'Unassigned',stops:Number(r[ix.stops])||0,packages:Number(r[ix.packages])||0,progress:0,delta:0,status:(r[ix.driver]&&r[ix.van])?'Assigned':'Needs review',rescue:'—'}));
  state.modal=null;state.page='roster';state.rosterPublished=false;persist();render();toast(`${state.routes.length} routes imported — review before publishing`);
}

function parseEquipmentTextAction() {
  const el=document.getElementById('equipment-paste-text');
  state.equipmentText=el?el.value:state.equipmentText;
  const details=equipmentDetailsFromText(state.equipmentText);
  state.equipmentImport={name:'Pasted EV/device list',details};
  render();
  toast(`${Object.keys(details).length} EV/VAN assignments found`);
}
function parseFleetPasteAction() {
  const el=document.getElementById('fleet-paste-text');
  state.fleetPasteText=el?el.value:state.fleetPasteText;
  const rows=rowsFromPastedTable(state.fleetPasteText);
  const vehicles=fleetDetailsFromRows(rows,'Pasted Amazon/FleetOS fleet table');
  if(!vehicles.length) return toast('No VIN rows found. Paste the header row plus vehicle rows from FleetOS or Amazon.','error');
  const combinedVehicles=rememberFleetSourceUpload(vehicles,'Pasted Amazon/FleetOS fleet table',new Date().toISOString());
  const total=applyFleetVehicles(combinedVehicles);
  state.modal=null; state.page='fleet';
  persist(); render();
  toast(`${vehicles.length} pasted fleet rows read · ${state.fleetUpdateSummary.updated} changed · ${total} EV cards tracked`);
}
function applyEquipmentImport() {
  const details=state.equipmentImport?.details||{};
  const conflicts=equipmentAssignmentConflicts(details);if(conflicts.length)return toast(`Fix duplicate equipment first: ${conflicts.join(', ')}`,'error');
  let matched=0, missing=[];
  state.morningRoutes.forEach(route=>{
    const key=normalizeEquipmentId(route.ev);
    if(!key)return;
    const item=details[key];
    if(!item){route.deviceName='';route.portable='';missing.push(key);return;}
    matched++;
    route.deviceName=item.device||'';
    route.portable=item.portable||'';
  });
  recalculateEquipmentReadiness();state.modal=null;state.page='morning';persist();render();
  toast(`${matched} EV/VAN rows updated${missing.length?` · ${missing.length} EVs not found in import`:''}`);
}
function equipmentAssignmentConflicts(details=deviceSheetDetails()) {
  const seen={device:new Map(),portable:new Map()},conflicts=[];
  Object.entries(details||{}).forEach(([van,item])=>['device','portable'].forEach(type=>{const value=normalizeEquipmentIssueId(type,item?.[type]);if(!value||value==='-')return;const owners=seen[type].get(value)||[];owners.push(van);seen[type].set(value,owners);}));
  Object.entries(seen).forEach(([type,map])=>map.forEach((owners,value)=>{if(owners.length>1)conflicts.push(`${type==='device'?'Device':'Portable'} ${value} → ${owners.join(' / ')}`);}));return conflicts;
}

function updateDeviceSheetCell(id,field,value) {
  const key=normalizeEquipmentId(id);
  if(!key||!['device','portable'].includes(field))return;
  const clean=String(value??'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,field==='device'?3:4);
  const details={...deviceSheetDetails()},current={...(details[key]||{device:'',portable:''})};
  current[field]=clean;details[key]=current;
  state.equipmentImport={name:'Device and Portable Sheet',details};
  persistSoon();
}
function addDeviceSheetRow(section='') {
  if(!['ev','gas','helper'].includes(section))return;
  state.deviceCustomRows=state.deviceCustomRows||{ev:[],gas:[],helper:[]};
  state.deviceCustomRows[section]=state.deviceCustomRows[section]||[];
  state.deviceCustomRows[section].push({uid:`${section}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,label:'',device:'',portable:'',source:'manual'});
  state.deviceClearConfirm=null;persist();render();
  const rows=document.querySelectorAll(`.${section}-list [data-device-custom-field="label"]`),last=rows[rows.length-1];if(last)last.focus();
}
function updateCustomDeviceRow(uid,field,value) {
  const sections=['ev','gas','helper'];let row=null;
  for(const section of sections){row=(state.deviceCustomRows?.[section]||[]).find(item=>item.uid===uid);if(row)break;}
  if(!row||!['label','device','portable'].includes(field))return;
  const previousLabel=row.label||'';
  const clean=field==='label'?String(value??'').toUpperCase().replace(/[^A-Z0-9 -]/g,'').slice(0,28):String(value??'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,field==='device'?3:4);
  row[field]=clean;
  const details={...deviceSheetDetails()},oldKey=normalizeEquipmentId(previousLabel),newKey=normalizeEquipmentId(row.label);
  if(field==='label'&&oldKey&&oldKey!==newKey)delete details[oldKey];
  if(newKey)details[newKey]={device:row.device||'',portable:row.portable||''};
  state.equipmentImport={name:'Device and Portable Sheet',details};
  persistSoon();
}
function moveDeviceEntryDown(el) {
  const row=el?.closest?.('tr'),table=el?.closest?.('table');if(!row||!table)return el?.blur?.();
  const rows=[...(table.tBodies?.[0]?.rows||[])],rowIndex=rows.indexOf(row),column=el.closest('td,th')?.cellIndex??-1;
  const next=rows[rowIndex+1]?.cells?.[column]?.querySelector?.('input');
  if(next){next.focus();next.select?.();}else el.blur();
}
function removeCustomDeviceRow(uid='') {
  for(const section of ['ev','gas','helper']){
    const rows=state.deviceCustomRows?.[section]||[],index=rows.findIndex(row=>row.uid===uid);
    if(index<0)continue;
    const [removed]=rows.splice(index,1),key=normalizeEquipmentId(removed.label),details={...deviceSheetDetails()};if(key)delete details[key];
    state.equipmentImport={name:'Device and Portable Sheet',details};persist();render();return toast(`${removed.label||'Custom van'} row removed`);
  }
}
function deviceSheetSectionIds(section='') {
  return deviceSheetAllIds(section).map(normalizeEquipmentId).filter(Boolean);
}
function clearDeviceSheetSection(section='') {
  const ids=deviceSheetSectionIds(section);
  if(!ids.length)return;
  if(state.deviceClearConfirm!==section){state.deviceClearConfirm=section;render();return toast('Click Clear sheet again to confirm','error');}
  const details={...deviceSheetDetails()};ids.forEach(id=>delete details[normalizeEquipmentId(id)]);
  deviceSheetCustomRows(section).forEach(row=>{row.device='';row.portable='';});
  const idSet=new Set(ids.map(normalizeEquipmentId));(state.morningRoutes||[]).forEach(route=>{if(idSet.has(normalizeEquipmentId(route.ev))){route.deviceName='';route.portable='';route.deviceReady=false;route.portableReady=false;}});
  state.equipmentImport={name:'Device and Portable Sheet',details};
  state.deviceClearConfirm=null;persist();render();
  toast(`${section==='ev'?'Electric Vehicles':section==='gas'?'Gas Vehicles':'Helper Bags'} boxes cleared`);
}
function inputDeviceSheetToMorning() {
  const details=deviceSheetDetails();
  const filled=Object.values(details).filter(item=>String(item?.device||'').trim()||String(item?.portable||'').trim()).length;
  if(!filled)return toast('Type at least one Device or Portable number first','error');
  const conflicts=equipmentAssignmentConflicts(details);if(conflicts.length)return toast(`Fix duplicate equipment first: ${conflicts.join(', ')}`,'error');
  let matched=0,missing=0;
  state.morningRoutes.forEach(route=>{
    const key=normalizeEquipmentId(route.ev);
    if(!key)return;
    const item=details[key];
    if(!item){route.deviceName='';route.portable='';route.deviceReady=false;route.portableReady=false;missing++;return;}
    route.deviceName=item.device||'';route.portable=item.portable||'';matched++;
  });
  recalculateEquipmentReadiness();state.page='morning';persist();render();
  toast(`${matched} Morning Sheet driver${matched===1?'':'s'} matched by EV/VAN${missing?` · ${missing} assigned vans still blank`:''}`);
}

function morningAssignmentTargets() {
  return filteredMorningRows().map(row=>morningRouteByUid(row.routeUid)||state.morningRoutes.find(r=>r===row)||state.morningRoutes.find(r=>r.route===row.route&&r.wave===row.wave&&r.driver===row.driver)).filter(r=>r&&r.dsp===state.dspCode&&r.route&&!String(r.route).startsWith('__blank_'));
}
function shuffled(values) {
  const copy=[...values];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
function fillEquipmentForRoute(route) {
  const item=state.equipmentImport?.details?.[normalizeEquipmentId(route.ev)];
  if(item){route.deviceName=item.device||'';route.portable=item.portable||'';}
  else {route.deviceName='';route.portable='';}
  const issues=routeEquipmentIssues(route);route.deviceReady=Boolean(route.deviceName)&&!issues.device?.active.some(record=>['high','critical'].includes(record.severity));route.portableReady=Boolean(route.portable&&route.portable!=='-')&&!issues.portable?.active.some(record=>['high','critical'].includes(record.severity));
}
function equipmentAssignmentFor(value='') {
  const item=state.equipmentImport?.details?.[normalizeEquipmentId(value)],device=String(item?.device||'').trim(),portable=String(item?.portable||'').trim();
  return device&&portable&&portable!=='-'?item:null;
}
function clearEquipmentForRoute(route={}) {
  route.ev='';route.deviceName='';route.portable='';route.deviceReady=false;route.portableReady=false;
}
function automaticFleetVehiclePool({electricOnly=false,random=false}={}) {
  const seen=new Set(),rows=[];
  rivianFleet.forEach(vehicle=>{
    if(electricOnly&&!isElectricFleetVehicle(vehicle))return;
    const safety=fleetVehicleAssignmentEligibility(vehicle),identity=fleetEquipmentIdentity(vehicle),key=normalizeEquipmentId(identity?.label||'');
    if(!safety.eligible||!key||seen.has(key)||!equipmentAssignmentFor(key))return;
    seen.add(key);rows.push({vehicle,label:identity.label,key,safety});
  });
  rows.sort((a,b)=>routeCompare(a.label,b.label));
  return random?shuffled(rows):rows;
}
function preferredVehicleKeysForRoute(route={}) {
  const primary=morningDriverNames(route.driver)[0]||'';
  return driverPreferredVehicleIds(primary).map(normalizeEquipmentId).filter(Boolean);
}
function automaticVehicleAssignmentPlan(targets=[],pool=[]) {
  const used=new Set(),assigned=new Map();
  // Reserve each driver's first safe, available preference before filling the
  // remaining routes from the normal sorted/randomized pool. Preferences can
  // never bypass Fleet Health because `pool` already passed the safety gate.
  targets.forEach(route=>{
    const preferred=preferredVehicleKeysForRoute(route);if(!preferred.length)return;
    const match=preferred.map(key=>pool.find(item=>item.key===key&&!used.has(item.key))).find(Boolean);
    if(match){assigned.set(route,match);used.add(match.key);}
  });
  let cursor=0;
  targets.forEach(route=>{
    if(assigned.has(route))return;
    while(cursor<pool.length&&used.has(pool[cursor].key))cursor++;
    const next=pool[cursor++];if(next){assigned.set(route,next);used.add(next.key);}
  });
  return assigned;
}
function assignAutomaticVehiclePool(targets=[],pool=[],successLabel='safe vans') {
  pushSheetHistory(`Assign ${successLabel}`,'morning');
  targets.forEach(clearEquipmentForRoute);
  const assignments=automaticVehicleAssignmentPlan(targets,pool),count=assignments.size;
  let preferenceCount=0;
  assignments.forEach((item,route)=>{
    const label=item.label;
    route.ev=String(label).replace(/^EV/i,'');
    if(preferredVehicleKeysForRoute(route).includes(item.key))preferenceCount++;
    fillEquipmentForRoute(route);
  });
  persist();render();
  const shortfall=targets.length-count;
  const preferredText=preferenceCount?` · ${preferenceCount} driver preference${preferenceCount===1?'':'s'} honored`:'';
  if(shortfall)return toast(`${count}/${targets.length} ${successLabel} assigned${preferredText} · ${shortfall} driver${shortfall===1?'':'s'} left blank because no additional verified safe vehicle was available`,'error');
  toast(`${count} ${successLabel} assigned${preferredText} · grounded, inactive, issue-blocked, low-battery, and unverified EVs skipped`);
}
function assignElectricVehicles(mode='low') {
  const targets=morningAssignmentTargets();
  if(!targets.length)return toast('No visible driver rows to assign','error');
  const pool=automaticFleetVehiclePool({electricOnly:true,random:mode==='random'});
  if(!pool.length){targets.forEach(clearEquipmentForRoute);persist();render();return toast('No assignment-ready EVs available · each safe EV needs both a Device and Portable entered','error');}
  assignAutomaticVehiclePool(targets,pool,mode==='random'?'safe EVs randomly':'safe EVs lowest to highest');
}
function assignOperationalVehicles() {
  const targets=morningAssignmentTargets().filter(route=>!/helper/i.test(String(route.service||'')));if(!targets.length)return toast('No visible driver rows to assign','error');
  const pool=automaticFleetVehiclePool({electricOnly:true});
  if(!pool.length){targets.forEach(clearEquipmentForRoute);persist();render();return toast('No assignment-ready EVs available · each safe EV needs both a Device and Portable entered','error');}
  assignAutomaticVehiclePool(targets,pool,'verified safe EVs');
}
function clearMorningVehicleAssignments() {
  const targets=morningAssignmentTargets().filter(route=>!/helper/i.test(String(route.service||'')));if(!targets.length)return toast('No Morning Sheet vehicle assignments to clear','error');
  pushSheetHistory('Clear visible Morning Sheet EVs','morning');targets.forEach(route=>{route.ev='';route.deviceName='';route.portable='';route.deviceReady=false;route.portableReady=false;});persist();render();toast(`${targets.length} visible Morning Sheet EV assignments cleared · helper bags kept`);
}
function parkedVanId(slot={}) {
  const raw=String(slot.value||'').toUpperCase().replace(/\(.*?\)/g,'').trim();if(!raw||raw==='X')return '';
  const ev=raw.match(/(?:EV\s*)?(\d{1,2})$/);if(ev)return String(Number(ev[1]));
  const gas=raw.match(/\b([FRH]\d{1,3})\b/);return gas?gas[1]:'';
}
function groundedParkingIds() {
  return new Set(rivianFleet.filter(v=>String(v.operational||'').toLowerCase().includes('ground')).map(v=>{const text=`${v.name||''} ${v.vehicleName||''}`,ev=text.match(/\bEV\s*(\d{1,2})\b/i);return ev?String(Number(ev[1])):normalizeEquipmentId(fleetDisplayName(v));}).filter(Boolean));
}
function assignVansByParking() {
  const targets=state.morningRoutes.filter(route=>route.dsp===state.dspCode&&route.route&&!String(route.route).startsWith('__blank_')).sort((a,b)=>waveMinutes(a.wave)-waveMinutes(b.wave)||routeCompare(a.route,b.route));
  if(!targets.length)return toast('No Morning Sheet drivers to assign','error');
  const grounded=groundedParkingIds(),values=(zones,reverse=false)=>[...new Set(zones.flatMap(zone=>{const slots=parkingSlots(zone);return reverse?[...slots].reverse():slots;}).map(parkedVanId).filter(id=>id&&!grounded.has(id)&&fleetVehicleAssignmentEligibility(id).eligible&&equipmentAssignmentFor(id)))];
  const west=values(['west']),east=values(['east'],true),remainingHealthy=values(['northRight','northLeft','street','streetLower','west','east','gas']);
  const used=new Set(),cursors=new Map(),take=pool=>{let index=cursors.get(pool)||0,id='';while(index<pool.length&&!id){const candidate=pool[index++];if(!used.has(candidate))id=candidate;}cursors.set(pool,index);if(id)used.add(id);return id;};
  targets.forEach(clearEquipmentForRoute);
  const waves=[...new Set(targets.map(route=>route.wave))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)),assigned=[];targets.forEach(route=>{const waveIndex=Math.max(0,waves.indexOf(route.wave));let van=waveIndex<=1?take(west):waveIndex<=3?take(east):take(remainingHealthy);if(!van)van=take(remainingHealthy);if(van){route.ev=van;fillEquipmentForRoute(route);assigned.push(van);}});
  persist();render();
  const shortfall=targets.length-assigned.length;
  toast(shortfall?`${assigned.length}/${targets.length} vans assigned by parking order · ${shortfall} left blank because no additional verified safe parked van was available`:`${assigned.length} verified safe vans assigned by parking order${grounded.size?` · ${grounded.size} grounded skipped`:''}`,shortfall?'error':'');
}
function openGasVehicleAssignment() {
  const targets=morningAssignmentTargets();
  if(!targets.length)return toast('No visible driver rows to assign gas vehicles','error');
  state.gasAssignmentRoutes=[];
  state.gasAssignmentVans=[];
  state.modal='gas-assignment';
  render();
}
function toggleGasDriver(route='') {
  if(!route)return;
  const selected=new Set(state.gasAssignmentRoutes||[]);
  selected.has(route)?selected.delete(route):selected.add(route);
  state.gasAssignmentRoutes=[...selected];
  render();
}
function toggleGasVan(van='') {
  if(!gasVehicleIds.includes(van)||!equipmentAssignmentFor(van))return;
  const selected=new Set(state.gasAssignmentVans||[]);
  selected.has(van)?selected.delete(van):selected.add(van);
  state.gasAssignmentVans=gasVehicleIds.filter(id=>selected.has(id));
  render();
}
function applyGasVehicleAssignment() {
  const routeIds=state.gasAssignmentRoutes||[], vans=state.gasAssignmentVans||[];
  if(!routeIds.length||!vans.length)return toast('Choose at least one driver and one gas van','error');
  const targets=morningAssignmentTargets().filter(route=>routeIds.includes(route.route));
  const safeVans=vans.filter(van=>equipmentAssignmentFor(van)&&fleetVehicleAssignmentEligibility(van).eligible&&isGasFleetVehicle(fleetVehicleForEquipmentId(van)||{}));
  targets.forEach(clearEquipmentForRoute);
  const count=Math.min(targets.length,safeVans.length);
  targets.slice(0,count).forEach((route,i)=>{route.ev=safeVans[i];fillEquipmentForRoute(route);});
  state.modal=null;state.gasAssignmentRoutes=[];state.gasAssignmentVans=[];
  persist();render();
  const rejected=vans.length-safeVans.length,shortfall=targets.length-count;
  toast(`${count} verified safe gas vehicle${count===1?'':'s'} assigned${rejected?` · ${rejected} unsafe or unverified selection${rejected===1?'':'s'} skipped`:''}${shortfall?` · ${shortfall} driver${shortfall===1?'':'s'} still need a van`:''}`,rejected||shortfall?'error':'');
}

function toggleFleetCard(vin='') {
  state.editingFleetVin='';
  state.expandedFleetVin=state.expandedFleetVin===vin?'':vin;
  persist();render();
}
function saveFleetName(vin='') {
  const key=cleanVin(vin),input=document.querySelector('[data-fleet-name-input]'),name=String(input?.value||'').trim();
  if(!key||!name)return toast('Enter a vehicle name before saving','error');
  state.fleetNameOverrides={...(state.fleetNameOverrides||{}),[key]:name};
  state.editingFleetVin='';
  syncFleetVehiclesToDeviceSheet(rivianFleet.filter(vehicle=>cleanVin(vehicle.vin)===key));
  persist();render();toast(`Vehicle renamed to ${name}`);return true;
}

function setupFleetLiveConnector() {
  state.modal='fleet-live-setup';
  persist();render();
}

function saveFleetLiveSetup() {
  const endpoint=document.getElementById('fleet-live-endpoint')?.value || '';
  const amazon=document.getElementById('fleet-amazon-url')?.value || AMAZON_FLEET_PORTAL_URL;
  const fleetos=document.getElementById('fleet-fleetos-url')?.value || FLEETOS_PORTAL_URL;
  const endpointInfo=fleetLiveEndpointInfo(endpoint);
  if(String(endpoint||'').trim()&&!endpointInfo.valid){
    state.fleetLiveLastError=endpointInfo.error;
    render();
    return toast(endpointInfo.error,'error');
  }
  state.fleetLiveEndpoint=endpointInfo.valid?endpointInfo.url:'';
  state.fleetAmazonUrl=String(amazon||AMAZON_FLEET_PORTAL_URL).trim();
  state.fleetFleetosUrl=String(fleetos||FLEETOS_PORTAL_URL).trim();
  state.fleetLiveLastError='';
  state.modal=null;
  persist();render();
  toast(state.fleetLiveEndpoint?'Authenticated proxy saved — sign in before cloud refresh':'Portal links saved — upload/paste fallback will be used until an authenticated proxy is added');
}

function liveFleetVehicleFromObject(row={},forcedSource='') {
  const source=forcedSource || row.source || row.portal || row.provider || 'Live connector';
  const name=row.name||row.vehicleName||row.vehicle_name||row.displayName||row.assetName||row.asset_name||row.vanName||row.van_name||'';
  const vin=row.vin||row.VIN||row.vehicleVin||row.vehicle_vin||row.serial||'';
  const plate=row.plate||row.licensePlate||row.license_plate||row.license||row.tag||'';
  const battery=row.battery??row.batteryPercent??row.battery_percent??row.stateOfCharge??row.state_of_charge??row.soc??row.SOC;
  const miles=row.miles??row.rangeMiles??row.range_miles??row.estimatedRange??row.estimated_range??row.remainingMiles??row.remaining_miles;
  const active=row.active||row.activeStatus||row.active_status||row.lifecycleStatus||row.lifecycle_status||'';
  const operational=row.operational||row.operationalStatus||row.operational_status||row.groundedStatus||row.grounded_status||'';
  const status=row.status||row.connectionStatus||row.connection_status||row.chargeStatus||row.charge_status||active||operational||'';
  const item=normalizeFleetVehicle({vin,name,plate,battery:numberFrom(battery,undefined),miles:numberFrom(miles,undefined),active,operational,status,source});
  item.hasName=Boolean(String(name||'').trim());
  item.hasPlate=Boolean(String(plate||'').trim());
  item.hasActive=Boolean(String(active||'').trim());
  item.hasOperational=Boolean(String(operational||'').trim());
  item.hasBattery=String(battery??'').trim()!=='';
  item.hasMiles=String(miles??'').trim()!=='';
  return item.vin?item:null;
}

function liveFleetVehiclesFromPayload(payload={}) {
  const rows=[];
  const add=(items,source)=>Array.isArray(items)&&items.forEach(item=>{const v=liveFleetVehicleFromObject(item,source);if(v)rows.push(v);});
  add(payload.vehicles||payload.rows||payload.data,'');
  add(payload.amazon||payload.amazonVehicles||payload.amazon_fleet,'Amazon fleet list');
  add(payload.fleetos||payload.fleetOs||payload.fleetOS||payload.rivian||payload.fleetosVehicles,'FleetOS tracker');
  return rows;
}

async function pullFleetLiveData() {
  const endpoint=fleetLiveEndpoint();
  if(!endpoint)return null;
  if(typeof fetch!=='function')throw new Error('Browser fetch is unavailable');
  const endpointInfo=fleetLiveEndpointInfo(endpoint);
  if(!endpointInfo.valid)throw new Error(endpointInfo.error);
  const cloud=window.RelayOpsCloud;
  let accessToken='';
  if(!endpointInfo.local){
    if(!cloud?.configured||typeof cloud.accessToken!=='function')throw new Error('RelayOps cloud sign-in must be configured before authenticated Fleet refresh');
    accessToken=await cloud.accessToken();
    if(!accessToken)throw new Error('Sign in as an authorized dispatcher before authenticated Fleet refresh');
  } else if(typeof cloud?.accessToken==='function'&&cloud.session) {
    accessToken=await cloud.accessToken();
  }
  const workspace=cloud?.workspaceContext?.()||{};
  if(!endpointInfo.local&&(!workspace.organizationId||!workspace.stationId))throw new Error('RelayOps organization and station must be configured before authenticated Fleet refresh');
  const headers={'Accept':'application/json'};
  if(accessToken)headers.Authorization=`Bearer ${accessToken}`;
  if(workspace.organizationId)headers['x-relayops-organization-id']=workspace.organizationId;
  if(workspace.stationId)headers['x-relayops-station-id']=workspace.stationId;
  const response=await fetch(endpointInfo.url,{method:'GET',headers,credentials:'omit',cache:'no-store'});
  if(!response.ok){
    if(response.status===401)throw new Error('Fleet proxy rejected this dispatcher session. Sign in again');
    if(response.status===403)throw new Error('This dispatcher does not have access to the selected Fleet workspace');
    throw new Error(`Authenticated Fleet proxy returned ${response.status}`);
  }
  const payload=await response.json();
  const vehicles=liveFleetVehiclesFromPayload(payload);
  if(!vehicles.length)throw new Error('Authenticated Fleet proxy returned no vehicle VIN rows');
  const uploadedAt=payload.asOf||payload.as_of||payload.fetchedAt||payload.fetched_at||new Date().toISOString();
  state.fleetSourceUploads={};
  state.fleetImport={name:payload.name||'Authenticated Amazon + FleetOS proxy',vehicles,uploadedAt};
  rememberFleetSourceUpload(vehicles,state.fleetImport.name,uploadedAt);
  state.fleetImport=fleetImportFromSourceUploads();
  state.fleetLiveLastPull=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(uploadedAt));
  state.fleetLiveLastError='';
  return vehicles;
}

function refreshFleetStatus() {
  if(!fleetLiveEndpoint()&&!state.fleetImport?.vehicles?.length&&!Object.keys(state.fleetSourceUploads||{}).length) {
    state.modal='fleet-import';
    state.importPurpose='fleet';
    state.fleetLiveLastError='Live connector is not connected yet. Use upload/paste now, or open Live setup to add the secure endpoint.';
    persist();render();
    toast('Live connector is not connected yet — upload/paste the Amazon + FleetOS exports or open Live setup.','error');
    return;
  }
  if(fleetLiveEndpoint()) return refreshFleetStatusLive();
  if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
  if(state.fleetImport?.vehicles?.length) {
    state.fleetRefreshPreview=fleetRefreshPreviewFromVehicles(state.fleetImport.vehicles);
    state.modal='fleet-refresh';
    persist();render();
    toast('Review the fleet refresh before applying it');
    return;
  }
  state.modal='fleet-import';
  state.importPurpose='fleet';
  persist();render();
  toast('Upload the latest FleetOS/Amazon export first so refresh stays accurate. No demo battery changes were made.','error');
}

async function refreshFleetStatusLive() {
  try {
    toast('Pulling live Amazon + FleetOS data…');
    await pullFleetLiveData();
    state.fleetRefreshPreview=fleetRefreshPreviewFromVehicles(state.fleetImport.vehicles);
    state.modal='fleet-refresh';
    persist();render();
    toast('Live data pulled — review before applying refresh');
  } catch(error) {
    state.fleetLiveLastError=error?.message||'Live connector failed';
    state.modal='fleet-live-setup';
    persist();render();
    toast(`Live pull failed — check setup or use upload/paste: ${state.fleetLiveLastError}`,'error');
  }
}

function approveFleetRefresh() {
  if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
  if(!state.fleetImport?.vehicles?.length)return refreshFleetStatus();
  const total=applyFleetVehicles(state.fleetImport.vehicles,{silent:true});
  const stats=fleetPortalMatchStats(), missing=[];
  if(!stats.amazon.size)missing.push('Amazon fleet list');
  if(!stats.fleetos.size)missing.push('FleetOS tracker');
  state.fleetLastRefresh=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
  state.modal=null; state.fleetRefreshPreview=null; state.page='fleet';
  persist(); render();
  toast(`${state.fleetUpdateSummary.updated} changed · ${total} EV cards refreshed${missing.length?` · upload ${missing.join(' + ')} for full accuracy`:''}`);
}

function resetFleetDemo() {
  rivianFleet.splice(0,rivianFleet.length,...demoRivianFleet.map(v=>normalizeFleetVehicle(v)));
  state.fleetImport=null;
  state.fleetSourceUploads={};
  state.fleetUpdateSummary=null;
  state.fleetChangedVins={};
  state.fleetSearch='';
  state.fleetFilter='all';
  state.fleetView='tiny';
  state.fleetSort='normal';
  state.expandedFleetVin='';
  state.fleetLastRefresh='Not refreshed yet';
  state.fleetExpectedCount=0;
  persist();render();
  toast('Fleet upload cleared — demo EV board restored');
}

const exportHeaders=['Route','Driver','Driver ID','Wave','Staging','Vehicle','Device','Stops','Packages','Progress %','Pace Delta','Status','Rescue Plan'];
function exportRows(){return routeFiltered().map(r=>[r.route,r.driver,r.id,r.wave,r.staging,r.van,r.device,r.stops,r.packages,r.progress,r.delta,r.status,r.rescue]);}
function csvEscape(v){const s=String(v??'');return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
function downloadBlob(data,type,name){const blob=new Blob([data],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);}
async function copyRouteSummary(routeCode='') {
  const route=(state.routes||[]).find(row=>row.route===routeCode);
  if(!route)return toast('Route could not be found','error');
  const text=[
    `${route.route} · ${route.driver}`,
    `${route.wave} · Stage ${route.staging}`,
    `${route.van} · ${route.device}`,
    `${route.stops} stops · ${route.packages} packages · ${route.progress}% complete`,
    `Health: ${route.status} · Pace: ${Number(route.delta)>0?'+':''}${route.delta} stops`,
    `Rescue: ${route.rescue||'—'}`
  ].join('\n');
  const ok=await writeClipboardText(text);toast(ok?`${route.route} summary copied`:'Clipboard access was blocked',ok?'success':'error');return ok;
}
function namedReportDataset(name='Daily roster') {
  if(name==='Route progress')return {headers:exportHeaders,rows:exportRows(),file:'relayops-route-progress.csv'};
  if(name==='Fleet readiness')return {headers:['Vehicle','VIN','Plate','Active','Operational','Battery %','Range Miles','Service Type'],rows:sortedRivianFleet().map(v=>[fleetDisplayName(v),v.vin,v.plate||'',v.active||'',v.operational||'',isElectricFleetVehicle(v)?v.battery??'':'',isElectricFleetVehicle(v)?v.miles??'':'',v.serviceType||'']),file:'relayops-fleet-readiness.csv'};
  if(name==='Attendance & hours')return {headers:['Date','Driver','Start','End','Shift'],rows:currentScheduleEntries().map(row=>[row.date||'',row.name||'',row.start||'',row.end||'',row.role||'']),file:'relayops-attendance-hours.csv'};
  if(name==='Device assignments') {
    const details=deviceSheetDetails();
    return {headers:['Van / EV','Device','Portable'],rows:Object.entries(details).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([vehicle,item])=>[vehicle,item?.device||'',item?.portable||'']),file:'relayops-device-assignments.csv'};
  }
  if(name==='Weekly scorecard')return {headers:['Driver','Role','Status','Delivery Quality','Last Coaching'],rows:teamDriverRows().map(row=>[row.name,row.role,row.status,row.quality,row.coaching]),file:'relayops-weekly-scorecard.csv'};
  const morning=filteredMorningRows().filter(row=>row.route&&!String(row.route).startsWith('__blank_'));
  return {headers:['Wave','Driver','Route','Staging','Pad','EV','Device','Portable','Stops','Packages','Planned RTS'],rows:morning.map(row=>[row.wave,row.driver,row.route,row.staging,row.padOverride||row.pad||padForWave(row.wave),row.ev||'',row.deviceName||'',row.portable||'',row.stops||'',row.packages||'',row.plannedRts||'']),file:'relayops-daily-roster.csv'};
}
function exportNamedReport(name='Daily roster') {
  const report=namedReportDataset(name),csv=[report.headers,...report.rows].map(row=>row.map(csvEscape).join(',')).join('\r\n');
  downloadBlob('\ufeff'+csv,'text/csv;charset=utf-8',report.file);toast(`${name} downloaded · ${report.rows.length} row${report.rows.length===1?'':'s'}`);return report;
}
async function writeClipboardText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const area=document.createElement('textarea');
    area.value=text; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.left='-9999px'; area.style.top='0';
    document.body.appendChild(area); area.select(); const ok=document.execCommand('copy'); area.remove(); return ok;
  } catch { return false; }
}
async function writeClipboardTable(text,html) {
  try {
    if(navigator.clipboard?.write&&typeof ClipboardItem!=='undefined'&&html) {
      await navigator.clipboard.write([new ClipboardItem({
        'text/plain': new Blob([text],{type:'text/plain'}),
        'text/html': new Blob([html],{type:'text/html'})
      })]);
      return true;
    }
  } catch {}
  return writeClipboardText(text);
}
function clipboardHtmlShell(tableHtml) {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>${tableHtml}</body></html>`;
}
const morningClipboardColumnWidths=[56,149,52,43,64,34,51,54,15,55,59,59,58,15,53,65,69,87,74,43,67,75];
function morningClipboardColgroup(left=0,right=morningClipboardColumnWidths.length-1) {
  const widths=morningClipboardColumnWidths.slice(Math.max(0,left),Math.min(morningClipboardColumnWidths.length-1,right)+1);
  return `<colgroup>${widths.map(width=>`<col style="width:${width}px;min-width:${width}px">`).join('')}</colgroup>`;
}
function clipboardCellStyle(colIndex,type='cell') {
  const width=morningClipboardColumnWidths[colIndex]||76;
  const base=`border:1px solid #111;text-align:center;vertical-align:middle;font-family:Arial,sans-serif;font-size:10pt;font-weight:700;height:21px;width:${width}px;min-width:${width}px;mso-number-format:"\\@";`;
  if(type==='separator')return `${base}background:#050505;color:#050505;border-color:#050505;height:14px;`;
  if(type==='wave')return `${base}background:#fff;font-size:36pt;font-weight:400;writing-mode:vertical-rl;transform:rotate(180deg);`;
  if(type==='time')return `${base}background:#fff;font-size:13pt;font-weight:700;`;
  if(type==='pad')return `${base}background:#fff;font-size:24pt;font-weight:700;`;
  if(type==='spacer'||sheetSpacerColumns.has(colIndex))return `${base}background:#050505;color:#050505;border-color:#050505;`;
  if(colIndex===20)return `${base}background:#b4a7d6;`;
  return `${base}background:#fff;`;
}
function clipboardTd(value='',colIndex=0,type='cell',attrs='') {
  return `<td ${attrs} style="${clipboardCellStyle(colIndex,type)}">${xmlEscape(value)}</td>`;
}
function clipboardTr(cells='',type='route') {
  const height=type==='separator'?14:type==='time'?25:type==='blank'?18:21;
  return `<tr style="height:${height}px;mso-height-source:userset">${cells}</tr>`;
}
function morningSheetClipboardHtml(sections=morningSections(filteredMorningRows())) {
  const body=sections.map(section=>{
    const display=morningDisplayRows(section), waveLabel=section.dsp?'DSP':section.label;
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||section.pad||'';
    const padSpan=display.length+(section.hasTime?1:0);
    const rows=display.map((r,i)=>clipboardTr(sheetCopyFields.map((field,col)=>{
      if(col===0)return i===0?clipboardTd(waveLabel,col,'wave',`rowspan="${display.length}"`):'';
      if(col===4)return i===0?clipboardTd(pad,col,'pad',`rowspan="${padSpan}"`):'';
      const value=copyCellValue(r,field,'',pad);
      return clipboardTd(value,col,sheetSpacerColumns.has(col)?'spacer':'cell');
    }).join(''),r._blank?'blank':'route')).join('');
    const time=section.hasTime?clipboardTr(sheetCopyFields.map((field,col)=>col===4?'':clipboardTd(col===0?morningWaveTimeText(section):'',col,col===0?'time':sheetSpacerColumns.has(col)?'spacer':'cell')).join(''),'time'):'';
    const separators=Array.from({length:section.separatorRows||0},()=>clipboardTr(sheetCopyFields.map((_,i)=>clipboardTd('',i,'separator')).join(''),'separator')).join('');
    return rows+time+separators;
  }).join('');
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${morningClipboardColgroup()}${body}</table>`);
}
function tsvToHtmlTable(text='') {
  const rows=String(text).split('\n').map(row=>row.split('\t'));
  const maxCols=rows.reduce((max,row)=>Math.max(max,row.length),0);
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${morningClipboardColgroup(0,Math.max(0,maxCols-1))}${rows.map(row=>clipboardTr(row.map((value,i)=>clipboardTd(value,i)).join(''),row.every(cell=>String(cell||'')==='')?'separator':'route')).join('')}</table>`);
}
function selectedSheetHtml() {
  const bounds=sheetSelectionBounds();
  if(!bounds)return '';
  const rows=[], mergedThrough={};
  for(let row=bounds.top;row<=bounds.bottom;row++) {
    const cells=[];
    for(let col=bounds.left;col<=bounds.right;col++) {
      if((mergedThrough[col]??-1)>=row)continue;
      const el=cellAt(row,col,bounds.section);
      const text=el?.textContent?.trim()||'';
      const type=el?.closest?.('tr')?.classList?.contains('wave-separator')?'separator':el?.classList?.contains('wave-time-cell')?'time':el?.classList?.contains('pad-label')?'pad':el?.classList?.contains('wave-label')?'wave':sheetSpacerColumns.has(col)?'spacer':'cell';
      const span=Math.max(1,Math.min(Number(el?.rowSpan)||1,bounds.bottom-row+1));
      if(span>1)mergedThrough[col]=row+span-1;
      cells.push(clipboardTd(text,col,type,span>1?`rowspan="${span}"`:''));
    }
    const rowEl=cellAt(row,bounds.left,bounds.section)?.closest?.('tr');
    const rowType=rowEl?.classList?.contains('wave-separator')?'separator':rowEl?.classList?.contains('wave-time-row')?'time':rowEl?.classList?.contains('blank-row')?'blank':'route';
    rows.push(clipboardTr(cells.join(''),rowType));
  }
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${morningClipboardColgroup(bounds.left,bounds.right)}${rows.join('')}</table>`);
}
function exportCSV(){const csv=[exportHeaders,...exportRows()].map(r=>r.map(csvEscape).join(',')).join('\r\n');downloadBlob('\ufeff'+csv,'text/csv;charset=utf-8','relayops-daily-roster.csv');state.modal=null;render();toast('CSV downloaded — ready for Google Sheets');}
function fleetExportRows() {
  return sortedRivianFleet().map(v=>{
    const confidence=fleetConfidence(v), missing=fleetMissingFields(v), changes=state.fleetChangedVins?.[v.vin]||v.changedFields||[];
    const batteryFreshness=fleetBatteryFreshness(v), audit=fleetSourceAudit(v);
    return [v.name,v.vin,v.plate||'',v.active||'',v.operational||'',v.battery,v.miles,batteryFreshness.label,confidence.label,audit.summary,audit.amazon,audit.fleetos,missing.join('; '),changes.join('; '),v.updatedAt||'',fleetSourceUploadedAt('amazon','iso'),fleetSourceUploadedAt('fleetos','iso'),v.source||'Demo data'];
  });
}
function exportFleetCSV(){const h=['Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles','Battery Freshness','Confidence','VIN Source Audit','Amazon Row','FleetOS Row','Needs','Changed Fields','Last Changed At','Amazon Uploaded At','FleetOS Uploaded At','Source'];const rows=fleetExportRows();downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8','relayops-ev-fleet-board.csv');toast(`${rows.length} EV rows downloaded`);}
function fleetGapRows() {
  const stats=fleetPortalMatchStats(), byVin=new Map(rivianFleet.map(v=>[cleanVin(v.vin),v])), rows=[];
  const vehicleRow=(priority,issue,vin,fix)=>{
    const v=byVin.get(cleanVin(vin))||{};
    const audit=v.vin?fleetSourceAudit(v):{summary:'Missing source row'};
    rows.push([priority,issue,vin,v.name||'',v.plate||'',v.active||'',v.operational||'',v.battery??'',v.miles??'',audit.summary,Number(state.fleetExpectedCount)||'',fleetSourceUploadedAt('amazon','iso'),fleetSourceUploadedAt('fleetos','iso'),fix]);
  };
  stats.amazonOnly.forEach(vin=>vehicleRow('HIGH','Missing FleetOS battery/range',vin,'Upload FleetOS tracker row for this VIN'));
  stats.fleetosOnly.forEach(vin=>vehicleRow('HIGH','Missing Amazon name/status',vin,'Upload Amazon fleet-list row for this VIN'));
  (state.fleetUpdateSummary?.duplicateVins||[]).forEach(vin=>vehicleRow('HIGH','Duplicate VIN in upload',vin,'Remove duplicate VIN row from the source export before refresh'));
  (state.fleetUpdateSummary?.conflictRows||[]).forEach(x=>vehicleRow('HIGH',`Conflicting ${x.field}`,x.vin,`Clean ${x.source} rows for this VIN: ${(x.values||[]).join(' vs ')}`));
  const expected=Number(state.fleetExpectedCount)||0, short=Math.max(0,expected-stats.uniqueVins.size);
  if(short) rows.push(['MED','Expected EV count short','',`Tracked ${stats.uniqueVins.size} of expected ${expected}`,'','','','','','Expected count from Amazon fleet list',expected,fleetSourceUploadedAt('amazon','iso'),fleetSourceUploadedAt('fleetos','iso'),`Find ${short} missing VIN${short===1?'':'s'} in Amazon/FleetOS exports`]);
  return rows;
}
function exportFleetGapsCSV(){const h=['Priority','Issue','VIN','Vehicle Name','License Plate','Active','Operational Status','Battery %','Range Miles','VIN Source Audit','Expected EV Count','Amazon Uploaded At','FleetOS Uploaded At','Fix'];const rows=fleetGapRows();downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8','relayops-ev-source-gaps.csv');toast(rows.length?`${rows.length} Fleet gap rows downloaded`:'No Fleet gaps found — source match looks complete');}
function missingFleetosRows() {
  const stats=fleetPortalMatchStats(), byVin=new Map(rivianFleet.map(v=>[cleanVin(v.vin),v]));
  return stats.amazonOnly.map(vin=>{
    const v=byVin.get(cleanVin(vin))||{};
    return [vin,v.name||'',v.plate||'',v.active||'',v.operational||'',fleetSourceUploadedAt('amazon','iso'),fleetSourceUploadedAt('fleetos','iso'),'Upload FleetOS tracker row for this VIN'];
  });
}
function exportMissingFleetosCSV(){const h=['VIN','Vehicle Name','License Plate','Active','Operational Status','Amazon Uploaded At','FleetOS Uploaded At','Fix'];const rows=missingFleetosRows();downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8','relayops-missing-fleetos-battery.csv');toast(rows.length?`${rows.length} missing FleetOS battery row${rows.length===1?'':'s'} downloaded`:'No missing FleetOS battery rows found');}
function missingFleetosVinText(){return missingFleetosRows().map(r=>r[0]).filter(Boolean).join('\n');}
async function copyMissingFleetosVins(){const rows=missingFleetosRows(), text=missingFleetosVinText();if(!rows.length)return toast('No missing FleetOS battery VINs to copy');const ok=await writeClipboardText(text);toast(ok?`${rows.length} missing FleetOS VIN${rows.length===1?'':'s'} copied`:'Clipboard access was blocked — download the missing battery CSV instead',ok?'':'error');return ok;}
function missingAmazonRows() {
  const stats=fleetPortalMatchStats(), byVin=new Map(rivianFleet.map(v=>[cleanVin(v.vin),v]));
  return stats.fleetosOnly.map(vin=>{
    const v=byVin.get(cleanVin(vin))||{};
    return [vin,v.name||'',v.battery??'',v.miles??'',fleetSourceUploadedAt('amazon','iso'),fleetSourceUploadedAt('fleetos','iso'),'Upload Amazon fleet-list row for this VIN'];
  });
}
function missingAmazonVinText(){return missingAmazonRows().map(r=>r[0]).filter(Boolean).join('\n');}
function exportMissingAmazonCSV(){const h=['VIN','Temporary Name','Battery %','Range Miles','Amazon Uploaded At','FleetOS Uploaded At','Fix'];const rows=missingAmazonRows();downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8','relayops-missing-amazon-name-status.csv');toast(rows.length?`${rows.length} missing Amazon row${rows.length===1?'':'s'} downloaded`:'No missing Amazon name/status rows found');}
async function copyMissingAmazonVins(){const rows=missingAmazonRows(), text=missingAmazonVinText();if(!rows.length)return toast('No missing Amazon name/status VINs to copy');const ok=await writeClipboardText(text);toast(ok?`${rows.length} missing Amazon VIN${rows.length===1?'':'s'} copied`:'Clipboard access was blocked — download the gap CSV instead',ok?'':'error');return ok;}
function visibleFleetVinText(){return sortedRivianFleet().map(v=>cleanVin(v.vin)||v.vin).filter(Boolean).join('\n');}
async function copyVisibleFleetVins(){const rows=sortedRivianFleet(), text=visibleFleetVinText();if(!rows.length)return toast('No visible EV VINs to copy');const ok=await writeClipboardText(text);toast(ok?`${rows.length} visible EV VIN${rows.length===1?'':'s'} copied`:'Clipboard access was blocked — use EV CSV instead',ok?'':'error');return ok;}
function refreshMissingVinText(){return (state.fleetRefreshPreview?.missingVinPreview||[]).map(x=>cleanVin(x.vin)||x.vin).filter(Boolean).join('\n');}
async function copyRefreshMissingVins(){const rows=state.fleetRefreshPreview?.missingVinPreview||[], text=refreshMissingVinText();if(!rows.length)return toast('No missing source VINs shown in refresh review');const ok=await writeClipboardText(text);toast(ok?`${rows.length} refresh review VIN${rows.length===1?'':'s'} copied`:'Clipboard access was blocked — use the gap CSV instead',ok?'':'error');return ok;}
function fleetAttentionRows(){const byVin=new Map();rivianFleet.forEach(v=>{const battery=knownBatteryPercent(v.battery),reasons=[isFleetLowBattery(v)?`battery ${battery}%`:'',v.operational==='Grounded'?'grounded':'',v.active==='Inactive'?'inactive':''].filter(Boolean);if(reasons.length)byVin.set(cleanVin(v.vin),{v,reasons});});return [...byVin.values()];}
function fleetAttentionText(){return fleetAttentionRows().map(({v,reasons})=>`${v.name} | ${v.vin} | ${knownBatteryPercent(v.battery)===null?'unknown battery / range':`${v.battery}% / ${v.miles} mi`} | ${v.active||'—'} | ${v.operational||'—'} | ${reasons.join(', ')}`).join('\n');}
async function copyFleetAttentionList(){const rows=fleetAttentionRows(), text=fleetAttentionText();if(!rows.length)return toast('No low-battery or grounded EVs to copy');const ok=await writeClipboardText(text);toast(ok?`${rows.length} EV alert${rows.length===1?'':'s'} copied for dispatch chat`:'Clipboard access was blocked — use EV CSV instead',ok?'':'error');return ok;}
function chargeRecommendationText(){return fleetChargeRows().map(v=>`${fleetDisplayName(v)} | ${v.vin} | ${v.battery}% | ${v.miles} mi | Plate ${v.plate||'—'} | ${v.active||'—'} | ${v.operational||'—'}${isDispatchBatteryBlocked(v)?' | PRIORITY PLUG-IN':' | plug in if available'}`).join('\n');}
async function copyChargeRecommendations(){const rows=fleetChargeRows(), text=chargeRecommendationText();if(!rows.length)return toast(`No EVs at or below ${LOW_BATTERY_SECTION_THRESHOLD}% to send for charging`);const ok=await writeClipboardText(text);toast(ok?`${rows.length} charge recommendation${rows.length===1?'':'s'} copied for fleet`:'Clipboard access was blocked — use EV CSV instead',ok?'':'error');return ok;}
function exportExcel(){
  const rows=[exportHeaders,...exportRows()];
  const xml=`<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1D4D35" ss:Pattern="Solid"/></Style><Style ss:ID="Cell"><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E6DF"/></Borders></Style></Styles><Worksheet ss:Name="Daily Roster"><Table>${rows.map((r,i)=>`<Row>${r.map(v=>`<Cell ss:StyleID="${i===0?'Header':'Cell'}"><Data ss:Type="${typeof v==='number'?'Number':'String'}">${xmlEscape(v)}</Data></Cell>`).join('')}</Row>`).join('')}</Table><AutoFilter xmlns="urn:schemas-microsoft-com:office:excel" x:Range="R1C1:R${rows.length}C${exportHeaders.length}" xmlns:x="urn:schemas-microsoft-com:office:excel"/></Worksheet></Workbook>`;
  downloadBlob(xml,'application/vnd.ms-excel','relayops-daily-roster.xls');state.modal=null;render();toast('Excel workbook downloaded');
}
async function copyRows(){const text=[exportHeaders,...exportRows()].map(r=>r.join('\t')).join('\n');if(await writeClipboardText(text)){state.modal=null;render();toast('Copied — paste into cell A1 in Google Sheets');}else toast('Clipboard access was blocked; use CSV download instead','error');}
function morningSheetCopyRows() {
  return morningCopyRowsForSections().map(item=>item.values);
}
function morningSheetTsv(){ return morningSheetCopyRows().map(row=>row.join('\t')).join('\n'); }
function morningCoreWaveLabels() {
  return morningSections(allMorningRows()).filter(section=>section.hasTime&&/^WAVE\s*[1-5]$/i.test(section.label)).slice(0,5).map(section=>({label:section.label,value:morningWaveTimeText(section)}));
}
function morningSheetsConnectorPayload() {
  const visibleRows=filteredMorningRows(),sections=fixedMorningSections(visibleRows),rows=[],rowTypes=[],sectionMeta=[],writeMode=morningFiltersAreActive()?'partial-update':'full-replace';
  let index=0;
  sections.forEach(section=>{
    const display=morningDisplayRows(section), pad=section.rows[0]?.padOverride||section.rows[0]?.pad||section.pad||'';
    const sourceIndex=index,startRow=index+3;
    const waveLabel=section.dsp?'DSP':section.label;
    display.forEach((r,i)=>{
      rows.push(morningConnectorFields.map(field=>copyCellValue(r,field,i===0?waveLabel:'',i===0?pad:'')));
      rowTypes.push(r._blank?'blank':'route');
      index+=1;
    });
    let timeRow=null;
    if(section.hasTime){rows.push([morningWaveTimeText(section),'','','','','','','','','','','','']);rowTypes.push('time');timeRow=index+3;index+=1;}
    else timeRow=startRow+display.length-1;
    const separatorRows=[];
    for(let i=0;i<(section.separatorRows||0);i++){rows.push(['','','','','','','','','','','','','']);rowTypes.push('separator');separatorRows.push(index+3);index+=1;}
    const separatorRow=separatorRows[0]||null;
    const driverCount=section.rows.filter(row=>!row._blank&&String(row.driver||'').trim()&&!routeMissingPrimary(row)).length,waveTime=section.hasTime?morningWaveTimeText(section):'';
    sectionMeta.push({label:waveLabel,slotKey:morningFixedSectionKey(waveLabel),wave:section.wave||'',driverCount,waveTime,pad,sourceIndex,startRow,rowCount:display.length,timeRow,hasTimeRow:Boolean(section.hasTime),separatorRow,separatorRows,dsp:Boolean(section.dsp)});
  });
  const dateTabs=operationDateTabNames(state.morningOperationDate),sheetName=dateTabs[0]||MORNING_TEMPLATE_SHEET_NAME;
  return {version:'relayops-morning-v1',writeMode,templateUrl:MORNING_TEMPLATE_URL,templateSheet:MORNING_TEMPLATE_SHEET_NAME,templateLayout:'fixed-ops-log-2026',operationDate:state.morningOperationDate,sheetName,sheetNameCandidates:dateTabs.length?dateTabs:MORNING_TEMPLATE_SHEET_CANDIDATES,dsp:state.dspCode,generatedAt:new Date().toISOString(),startCell:'A3',writeRange:'A3:M',headers:morningConnectorHeaders,rows,rowTypes,sections:sectionMeta,waves:morningCoreWaveLabels()};
}
function morningRtsOnlyPayload() {
  const dateTabs=operationDateTabNames(state.morningOperationDate),visibleRows=filteredMorningRows(),sections=fixedMorningSections(visibleRows),sectionByRoute=morningFixedSectionByRoute();
  const visibleRoutes=new Map(visibleRows.map(route=>[normalizeCxRoute(route.route),route]));
  const latest=state.lastItineraryRts&&typeof state.lastItineraryRts==='object'?state.lastItineraryRts:{};
  const sourceLocked=new Map();
  visibleRoutes.forEach((route,key)=>{
    const imported=latest[key]?.plannedRts;
    if(imported)sourceLocked.set(key,normalizeTimeDisplay(imported));
    else if(route.plannedRtsSource==='itinerary'&&route.plannedRts)sourceLocked.set(key,normalizeTimeDisplay(route.plannedRts));
  });
  return {
    version:'relayops-morning-v1',mode:'rts-only',operationDate:state.morningOperationDate,
    sheetName:dateTabs[0]||MORNING_TEMPLATE_SHEET_NAME,sheetNameCandidates:dateTabs,
    // Only send values proven to come from the latest Itineraries_DJT6 upload.
    // Older purple-cell values may be Planned Departure Time and must never leak
    // into an RTS-only update.
    updates:[...sourceLocked.entries()].map(([route,plannedRts])=>({route,plannedRts,expectedSection:sectionByRoute.get(route)||''})),
    waves:morningCoreWaveLabels(),
    generatedAt:new Date().toISOString()
  };
}
function morningWhiparoundOnlyPayload() {
  const dateTabs=operationDateTabNames(state.morningOperationDate),sectionByRoute=morningFixedSectionByRoute();
  const updates=filteredMorningRows().filter(route=>route.route&&!String(route.route).startsWith('__blank_')&&route.driver&&!routeMissingPrimary(route)&&!/helper/i.test(String(route.service||''))).map(route=>({
    route:normalizeCxRoute(route.route),driver:driverDisplayName(canonicalDriverName(morningDriverNames(route.driver)[0]||route.driver)),expectedSection:sectionByRoute.get(normalizeCxRoute(route.route))||'',preWhip:Boolean(route.preWhip),postWhip:Boolean(route.postWhip)
  })).filter(update=>update.route);
  return {version:'relayops-morning-v1',mode:'whiparound-only',operationDate:state.morningOperationDate,sheetName:dateTabs[0]||MORNING_TEMPLATE_SHEET_NAME,sheetNameCandidates:dateTabs,updates,generatedAt:new Date().toISOString()};
}
function morningSheetsPreflight(payload=morningSheetsConnectorPayload()) {
  const rows=payload.rows||[], rowTypes=payload.rowTypes||[], sections=payload.sections||[], headers=payload.headers||[],waves=payload.waves||[];
  const separatorIndexes=rowTypes.map((type,i)=>type==='separator'?i:-1).filter(i=>i>=0);
  const checks=[
    {label:'Target cell A3',ok:payload.startCell==='A3',detail:'Data starts below the fixed template header row.'},
    {label:'A–M write scope only',ok:payload.writeRange==='A3:M',detail:'RelayOps will not touch columns N and beyond.'},
    {label:'Row 1 headers ready',ok:headers.length===13&&headers[0]==='WAVE'&&headers[12]==='PLANNED RTS',detail:'A–M headers match the opening template.'},
    {label:'Every row has 13 columns',ok:rows.length>0&&rows.every(row=>Array.isArray(row)&&row.length===13),detail:`${rows.length} row${rows.length===1?'':'s'} will write across A–M.`},
    {label:'Black dividers are real rows',ok:separatorIndexes.length>0&&separatorIndexes.every(i=>rows[i]?.length===13&&rows[i].every(cell=>String(cell||'')==='')),detail:`${separatorIndexes.length} divider row${separatorIndexes.length===1?'':'s'} included as numbered sheet rows.`},
    {label:'All five wave times ready',ok:waves.length===5&&waves.every((wave,index)=>morningFixedSectionKey(wave.label)===`WAVE${index+1}`&&String(wave.value||'').trim()),detail:`${waves.length}/5 wave time/count labels will be written to the fixed footer rows.`},
    {label:'Wave/Pad merge map ready',ok:sections.length>0&&sections.every(section=>Number(section.startRow)>=3&&Number(section.rowCount)>0&&((section.hasTimeRow===false&&Number(section.timeRow)===Number(section.startRow)+Number(section.rowCount)-1)||(!section.timeRow||Number(section.timeRow)>=Number(section.startRow)+Number(section.rowCount)))&&(!section.separatorRow||Number(section.separatorRow)>Number(section.startRow))),detail:`${sections.length} section${sections.length===1?'':'s'} tell Google which Wave and Pad cells to merge.`},
    {label:'Row types match payload',ok:rowTypes.length===rows.length&&rowTypes.includes('route')&&(payload.writeMode==='partial-update'||(rowTypes.includes('time')&&rowTypes.includes('separator'))),detail:payload.writeMode==='partial-update'?'Partial update carries only the selected fixed-slot routes.':'Google can tell route rows, wave-time rows, blank rows, and dividers apart.'}
  ];
  return {ready:checks.every(check=>check.ok),checks};
}
function morningSheetsPreflightHtml(payload=morningSheetsConnectorPayload()) {
  const preflight=morningSheetsPreflight(payload);
  return `<div class="sheets-preflight ${preflight.ready?'ready':'warn'}"><div><strong>${preflight.ready?'Preflight ready':'Preflight needs review'}</strong><span>${preflight.ready?'This payload is shaped for the A–M Google Sheets template. Columns N+ stay untouched.':'Fix the warning items before sending to the template.'}</span></div><div class="sheets-preflight-grid">${preflight.checks.map(check=>`<span class="${check.ok?'ok':'warn'}"><b>${check.ok?'✓':'!'}</b><em>${esc(check.label)}</em><small>${esc(check.detail)}</small></span>`).join('')}</div></div>`;
}
function morningSheetsHandoffProof(payload=morningSheetsConnectorPayload()) {
  const rows=payload.rows||[], sections=payload.sections||[];
  const visibleRows=morningCopyRowsForSections(fixedMorningSections(filteredMorningRows())).map(item=>item.values).map(row=>[row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[15],row[16],row[13],row[20]]);
  const mismatchIndex=rows.findIndex((row,i)=>JSON.stringify(row.map(cell=>String(cell??'')))!==JSON.stringify((visibleRows[i]||[]).map(cell=>String(cell??''))));
  const exactRows=rows.length===visibleRows.length&&mismatchIndex<0;
  const lastRow=rows.length?rows.length+2:2;
  const separatorRows=sections.flatMap(section=>section.separatorRows?.length?section.separatorRows:[section.separatorRow]).filter(Boolean);
  const mergeRows=sections.map(section=>`${section.label||'Section'} ${section.startRow}:${section.timeRow||section.startRow+section.rowCount-1}`).join(', ');
  return {ready:exactRows&&rows.length>0,rows:rows.length,visibleRows:visibleRows.length,mismatchIndex,firstRow:rows[0]||[],lastRowValues:rows[rows.length-1]||[],range:rows.length?`A3:M${lastRow}`:'A3:M',firstSheetRow:rows.length?3:'—',lastSheetRow:rows.length?lastRow:'—',dividers:separatorRows.length,dividerRows:separatorRows.join(', '),sections:sections.length,mergeRows};
}
function morningSheetsHandoffProofHtml(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetsHandoffProof(payload);
  return `<div class="sheets-proof ${proof.ready?'ready':'warn'}"><strong>${proof.ready?'Handoff proof':'Handoff mismatch'}</strong><div><span><b>Google range</b>${esc(proof.range)}</span><span><b>Visible rows</b>${esc(proof.visibleRows)}</span><span><b>Connector rows</b>${esc(proof.rows)}</span><span><b>Divider rows</b>${esc(proof.dividers)}${proof.dividerRows?` · ${esc(proof.dividerRows)}`:''}</span><span><b>Merge sections</b>${esc(proof.sections)}</span></div><small>${proof.ready?'Visible Morning Sheet rows match the connector payload exactly before sending.':`Review before sending: dashboard rows and connector rows do not match.`}</small></div>`;
}
function morningSheetStructureProof(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetsHandoffProof(payload), preflight=morningSheetsPreflight(payload);
  const headers=payload.headers||[], rowTypes=payload.rowTypes||[], sections=payload.sections||[];
  const letters=sheetColumnLetters(headers.length);
  const dividerRows=sections.flatMap(section=>section.separatorRows?.length?section.separatorRows:[section.separatorRow]).filter(Boolean);
  const mergeCount=sections.filter(section=>Number(section.startRow)>=3&&Number(section.rowCount)>0).length;
  const checks=[
    {label:'Column letters',ok:letters.join('')==='ABCDEFGHIJKLM',detail:'A–M labels match Google Sheets.'},
    {label:'Every row numbered',ok:proof.firstSheetRow===3&&proof.lastSheetRow!=='—'&&proof.rows>0,detail:`Data rows run ${proof.firstSheetRow} through ${proof.lastSheetRow}.`},
    {label:'Header stays fixed',ok:true,detail:'Row 1 and the A–M letters stay sticky while scrolling.'},
    {label:'Black divider rows',ok:dividerRows.length>0&&rowTypes.filter(type=>type==='separator').length===dividerRows.length,detail:dividerRows.length?`Numbered divider rows: ${dividerRows.join(', ')}`:'No divider rows found.'},
    {label:'Black divider columns',ok:headers[8]===''&&headers[11]==='',detail:'Columns I and L are narrow real columns.'},
    {label:'Merged Wave/Pad map',ok:mergeCount===sections.length&&sections.length>0,detail:`${mergeCount} merge section${mergeCount===1?'':'s'} ready for Google.`},
    {label:'Exact formatting path',ok:preflight.ready&&proof.ready,detail:'Use Send to Google Sheet for protected merges and row sizes.'}
  ];
  return {ready:checks.every(check=>check.ok),checks,range:proof.range};
}
function morningSheetStructureProofHtml(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetStructureProof(payload);
  return `<div class="sheet-structure-proof ${proof.ready?'ready':'warn'}"><div><strong>Google Sheets structure proof</strong><small>${proof.ready?`Ready for ${esc(proof.range)} with numbered rows, A–M columns, and real divider boundaries.`:'Review structure warnings before copy/send.'}</small></div><div>${proof.checks.map(check=>`<span class="${check.ok?'ok':'warn'}"><b>${check.ok?'✓':'!'}</b><em>${esc(check.label)}</em><small>${esc(check.detail)}</small></span>`).join('')}</div></div>`;
}
function morningCopyFallbackProofHtml(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetsHandoffProof(payload);
  return `<div class="copy-fallback-proof ${proof.ready?'ready':'warn'}"><strong>Copy fallback readiness</strong><div><span><b>Paste target</b>${esc(proof.range)}</span><span><b>Rows copied</b>${esc(proof.rows)}</span><span><b>Rich HTML</b>Wave/Pad rowspans</span><span><b>Divider rows</b>${esc(proof.dividerRows||'none')}</span><span><b>Exact format</b>Use connector</span></div><small>${proof.ready?'Copy fallback is shaped for A–M. For guaranteed merged cells and frozen row 1, use Send to Google Sheet.':'Copy fallback is not ready because visible rows and connector rows do not match.'}</small></div>`;
}
function morningSheetsRowAuditHtml(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetsHandoffProof(payload);
  const firstRoute=[proof.firstRow[1],proof.firstRow[2],proof.firstRow[3]].filter(Boolean).join(' · ')||'No route loaded';
  const mismatch=proof.mismatchIndex>=0?`Mismatch at dashboard row ${proof.mismatchIndex+3}`:'No row mismatches';
  return `<div class="sheets-row-audit ${proof.ready?'ready':'warn'}"><strong>Row-by-row audit</strong><div><span><b>First write row</b>A${esc(proof.firstSheetRow)}</span><span><b>Last write row</b>M${esc(proof.lastSheetRow)}</span><span><b>First route</b>${esc(firstRoute)}</span><span><b>Divider rows</b>${esc(proof.dividerRows||'none')}</span><span><b>Status</b>${esc(mismatch)}</span></div><small>${proof.ready?'Dashboard rows, connector rows, time rows, and black divider rows are aligned for the Google template.':'Fix this before Send now or copy fallback.'}</small></div>`;
}
function morningSheetsLiveProofHtml(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetsHandoffProof(payload);
  const lastCell=proof.range.split(':')[1]||'M';
  return `<div class="sheets-live-proof"><strong>Live Google test target</strong><div><span><b>Tab</b>${esc(payload.sheetName)}</span><span><b>Paste/send starts</b>${esc(payload.startCell)}</span><span><b>Expected finish</b>${esc(lastCell)}</span><span><b>Frozen row</b>Row 1</span><span><b>Untouched</b>Columns N+</span><span><b>Merge map</b>${esc(proof.sections)} sections</span></div><small>After Send now, the Google Sheet should show ${esc(proof.range)}, row 1 frozen, black divider rows still numbered, and no changes outside A:M.</small></div>`;
}
function morningHandoffReadiness(payload=morningSheetsConnectorPayload()) {
  const preflight=morningSheetsPreflight(payload), proof=morningSheetsHandoffProof(payload), importProof=state.importedFile?importPreflight(state.importedFile):null;
  const rows=filteredMorningRows(), irregular=rows.filter(r=>r.plannedRtsIssue).length;
  const checks=[
    {label:'Import / route source',ok:importProof?importProof.ready:rows.length>0,detail:importProof?`${importProof.included} ${state.dspCode} route${importProof.included===1?'':'s'} passed upload checks`:'No fresh upload proof — using current/demo rows on the dashboard'},
    {label:'Visible rows = payload',ok:proof.ready,detail:proof.ready?`${proof.visibleRows} numbered A–M rows match the connector payload`:'Visible rows and connector rows do not match'},
    {label:'Google format payload',ok:preflight.ready,detail:preflight.ready?'A3:M, row types, divider rows, and merge map are ready':'Fix connector preflight warnings before sending'},
    {label:'RTS review',ok:irregular===0,detail:irregular?`${irregular} Planned RTS value${irregular===1?'':'s'} highlighted for review`:'No irregular Planned RTS flags'},
    {label:'Exact connector',ok:Boolean(state.morningSheetsEndpoint),detail:state.morningSheetsEndpoint?'Google Apps Script endpoint saved':'Set up the connector for exact merged-cell formatting'}
  ];
  return {ready:checks.every(check=>check.ok),canCopy:preflight.ready&&proof.ready&&rows.length>0,checks,rows:rows.length,range:proof.range};
}
function morningHandoffReadinessHtml(payload=morningSheetsConnectorPayload()) {
  const status=morningHandoffReadiness(payload);
  return `<div class="handoff-readiness ${status.ready?'ready':status.canCopy?'copy-ready':'warn'}"><div class="handoff-readiness-title"><span>${status.ready?'✓':status.canCopy?'↗':'!'}</span><div><strong>${status.ready?'Safe to send to Google Sheets':status.canCopy?'Ready for copy fallback · connector recommended':'Morning handoff needs review'}</strong><small>${status.rows} route row${status.rows===1?'':'s'} loaded · target ${esc(status.range)} · ${status.ready?'exact connector path is ready':status.canCopy?'A–M rows are shaped correctly, but exact merged formatting needs connector setup/review':'fix yellow items before copy/send'}</small></div></div><div class="handoff-readiness-grid">${status.checks.map(check=>`<span class="${check.ok?'ok':'warn'}"><b>${check.ok?'✓':'!'}</b><em>${esc(check.label)}</em><small>${esc(check.detail)}</small></span>`).join('')}</div></div>`;
}
function morningSheetsReceiptHtml() {
  const r=state.morningSheetsLastReceipt;
  if(!r)return '';
  const verified=r.status!=='needs-verification';
  const range=r.writeRange||r.startCell||'A3:M';
  const lastCell=r.lastCell||String(range).split(':')[1]||'—';
  return `<div class="sheets-receipt ${verified?'confirmed':'needs-check'}"><strong>${verified?'Last confirmed Google write':'Sent — verify in Google Sheet'}</strong><div><span><b>Sheet</b>${esc(r.sheet||'—')}</span><span><b>Range</b>${esc(range)}</span><span><b>Last cell</b>${esc(lastCell)}</span><span><b>Rows</b>${esc(r.rows||0)}</span><span><b>Sections</b>${esc(r.sections||0)}</span><span><b>Status</b>${verified?'Confirmed':'Needs check'}</span><span><b>Time</b>${esc(r.updatedAt||r.sentAt||'—')}</span></div>${verified?'':`<small>Browser fallback was used, so RelayOps could not read Google’s response. Open the template and confirm ${esc(range)} updated and the last written cell is ${esc(lastCell)} before launch.</small>`}</div>`;
}
function morningSheetsAppsScript() {
  return String.raw`// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;
const RELAYOPS_WRITE_RANGE = 'A3:M';
const RELAYOPS_TEMPLATE_COLS = 22;
const RELAYOPS_TEMPLATE_RANGE = 'A3:V';
const RELAYOPS_TEMPLATE_SHEET = 'OPS LOG 2026';
const RELAYOPS_SPREADSHEET_ID = '1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ';
const RELAYOPS_BUILD = '2026-07-20-all-wave-labels';
const RELAYOPS_LAYOUT = [
  {key:'WAVE1', label:'WAVE 1', startRow:3, routeCapacity:13, timeRow:16, separatorRow:17},
  {key:'WAVE2', label:'WAVE 2', startRow:18, routeCapacity:13, timeRow:31, separatorRow:32},
  {key:'WAVE3', label:'WAVE 3', startRow:33, routeCapacity:13, timeRow:46, separatorRow:47},
  {key:'WAVE4', label:'WAVE 4', startRow:48, routeCapacity:13, timeRow:61, separatorRow:62},
  {key:'WAVE5', label:'WAVE 5', startRow:63, routeCapacity:13, timeRow:76, separatorRow:77},
  {key:'ADHOCS', label:"ADHOC's", startRow:79, routeCapacity:15, separatorRow:94},
  {key:'HELPERS', label:'HELPERS', startRow:95, routeCapacity:15, separatorRow:110},
  {key:'DSP', label:'DSP', startRow:111, routeCapacity:6}
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('RelayOps')
    .addItem('Connector status', 'relayOpsConnectorStatus')
    .addItem('Validate template layout', 'relayOpsValidateTemplate')
    .addItem('Run demo write', 'testRelayOpsMorningSheet')
    .addToUi();
}

function relayOpsConnectorStatus() {
  const ss = relayOpsSpreadsheet();
  SpreadsheetApp.getUi().alert(
    'RelayOps connector is installed',
    'Spreadsheet: ' + ss.getName() + '\nDeploy this Apps Script as a Web app, then paste the /exec URL into the RelayOps dashboard.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function doGet(e) {
  const ss = relayOpsSpreadsheet();
  const sheet = ss.getSheetByName(RELAYOPS_TEMPLATE_SHEET);
  if (!sheet) throw new Error('Blank template tab "' + RELAYOPS_TEMPLATE_SHEET + '" was not found');
  const layout = relayOpsTemplateLayout(sheet, 0);
  return relayOpsJson({
    ok: true,
    connector: 'relayops-morning-v1',
    build: RELAYOPS_BUILD,
    spreadsheet: ss.getName(),
    sheet: sheet.getName(),
    startCell: 'A3',
    writeRange: RELAYOPS_WRITE_RANGE,
    templateRange: RELAYOPS_TEMPLATE_RANGE,
    layout: layout,
    checkedAt: new Date().toISOString()
  });
}

function doPost(e) {
  let lock = null;
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    if (payload.mode === 'rts-only') {
      const rtsValidation = validateRelayOpsRtsPayload(payload);
      if (!rtsValidation.ready) throw new Error('RelayOps RTS-only preflight failed: ' + rtsValidation.errors.join('; '));
      if (payload.dryRun) {
        const target = resolveRelayOpsTarget(payload, false);
        return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'rts-only',dryRun:true,sheet:target.targetName,wouldCreateSheet:target.wouldCreate,updates:payload.updates.length,waveTimes:payload.waves.length,preflight:rtsValidation,updatedAt:new Date().toISOString()});
      }
      lock = LockService.getDocumentLock();lock.waitLock(20000);
      const rtsResult = writeRelayOpsRtsOnly(payload);
      return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'rts-only',sheet:rtsResult.sheetName,updated:rtsResult.updated,waveTimes:rtsResult.waveTimes,missingRoutes:rtsResult.missingRoutes,sectionMismatches:rtsResult.sectionMismatches,preflight:rtsValidation,updatedAt:new Date().toISOString()});
    }
    if (payload.mode === 'whiparound-only') {
      const whipValidation = validateRelayOpsWhiparoundPayload(payload);
      if (!whipValidation.ready) throw new Error('RelayOps Whiparound-only preflight failed: ' + whipValidation.errors.join('; '));
      if (payload.dryRun) {
        const target = resolveRelayOpsTarget(payload, false);
        return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'whiparound-only',dryRun:true,sheet:target.targetName,wouldCreateSheet:target.wouldCreate,updates:payload.updates.length,preflight:whipValidation,updatedAt:new Date().toISOString()});
      }
      lock = LockService.getDocumentLock();lock.waitLock(20000);
      const whipResult = writeRelayOpsWhiparoundOnly(payload);
      return relayOpsJson({ok:true,build:RELAYOPS_BUILD,mode:'whiparound-only',sheet:whipResult.sheetName,updated:whipResult.updated,missingRoutes:whipResult.missingRoutes,driverMismatches:whipResult.driverMismatches,sectionMismatches:whipResult.sectionMismatches,preflight:whipValidation,updatedAt:new Date().toISOString()});
    }
    const validation = validateRelayOpsMorningPayload(payload);
    if (!validation.ready) throw new Error('RelayOps preflight failed: ' + validation.errors.join('; '));
    if (payload.dryRun) {
      const target = resolveRelayOpsTarget(payload, false);
      const sheet = target.sheet;
      const layout = relayOpsTemplateLayout(sheet, (payload.rows || []).length);
      return relayOpsJson({
        ok: true,
        build: RELAYOPS_BUILD,
        dryRun: true,
        sheet: target.targetName,
        templateSheet: sheet.getName(),
        wouldCreateSheet: target.wouldCreate,
        startCell: payload.startCell,
        writeRange: payload.writeRange,
        writtenRange: 'A3:V116',
        lastCell: 'V116',
        rows: (payload.rows || []).length,
        sections: (payload.sections || []).length,
        waveTimes: relayOpsWaveLabels(payload).filter(function(wave) { return Boolean(wave.value); }).length,
        writeMode: payload.writeMode,
        layout: layout,
        preflight: validation,
        updatedAt: new Date().toISOString()
      });
    }
    lock = LockService.getDocumentLock();
    lock.waitLock(20000);
    const result = writeRelayOpsMorningSheet(payload);
    return relayOpsJson({
      ok: true,
      build: RELAYOPS_BUILD,
      sheet: result.sheetName,
      startCell: result.startCell,
      writeRange: result.writeRange,
      writtenRange: result.writtenRange,
      lastCell: result.lastCell,
      rows: (payload.rows || []).length,
      sections: (payload.sections || []).length,
      writeMode: result.writeMode,
      updated: result.updated,
      waveTimes: result.waveTimes,
      missingRoutes: result.missingRoutes,
      sectionMismatches: result.sectionMismatches,
      preflight: validation,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return relayOpsJson({
      ok: false,
      error: error && error.message ? error.message : String(error),
      updatedAt: new Date().toISOString()
    });
  } finally {
    if (lock) lock.releaseLock();
  }
}

function relayOpsJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function relayOpsDefaultPayload() {
  return {
    sheetName: RELAYOPS_TEMPLATE_SHEET,
    sheetNameCandidates: [RELAYOPS_TEMPLATE_SHEET]
  };
}

function relayOpsAllowedDateNames(operationDate) {
  const match = String(operationDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return [];
  const year = String(Number(match[1])).slice(-2);
  const month = String(Number(match[2]));
  const day = String(Number(match[3]));
  return [month + '/' + day + '/' + year, month + '.' + day + '.' + year];
}

function relayOpsSectionKey(value) {
  const key = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (key === 'ADHOC' || key === 'ADHOCS') return 'ADHOCS';
  return key;
}

function relayOpsLayoutForSection(section) {
  const key = relayOpsSectionKey(section && (section.label || section.wave));
  for (var i = 0; i < RELAYOPS_LAYOUT.length; i++) if (RELAYOPS_LAYOUT[i].key === key) return RELAYOPS_LAYOUT[i];
  return null;
}

function relayOpsSectionRows(payload, section) {
  const sourceIndex = Math.max(0, section.sourceIndex === undefined ? Number(section.startRow || RELAYOPS_START_ROW) - RELAYOPS_START_ROW : Number(section.sourceIndex));
  return (payload.rows || []).slice(sourceIndex, sourceIndex + Number(section.rowCount || 0)).filter(function(row) {
    return row && [row[1], row[2], row[5]].some(function(value) { return String(value || '').trim() !== ''; });
  });
}

function relayOpsWaveTimeValue(section) {
  const explicit = String(section && section.waveTime || '').trim();
  if (explicit) return explicit;
  const time = String(section && section.wave || '').replace(/\s*[AP]M\s*$/i, '').trim();
  const count = Number(section && section.driverCount);
  return time ? time + ' (' + (Number.isFinite(count) ? count : 0) + ')' : '';
}

function relayOpsWaveLabels(payload) {
  const explicit = Array.isArray(payload && payload.waves) ? payload.waves : [];
  const byKey = {};
  explicit.forEach(function(wave) { const layout = relayOpsLayoutForSection({label:wave && wave.label});if (layout && layout.timeRow) byKey[layout.key] = String(wave.value || '').trim(); });
  (payload && payload.sections || []).forEach(function(section) { const layout = relayOpsLayoutForSection(section);if (layout && layout.timeRow && !byKey[layout.key]) byKey[layout.key] = relayOpsWaveTimeValue(section); });
  return RELAYOPS_LAYOUT.filter(function(layout) { return Boolean(layout.timeRow); }).map(function(layout) { return {layout:layout,value:byKey[layout.key] || ''}; });
}

function writeRelayOpsWaveLabels(sheet, payload) {
  let updated = 0;
  relayOpsWaveLabels(payload).forEach(function(wave) { if (!wave.value) return;sheet.getRange(wave.layout.timeRow, 1).setValue(wave.value);updated++; });
  return updated;
}

function validateRelayOpsMorningPayload(payload) {
  const errors = [];
  const rows = payload && payload.rows || [];
  const rowTypes = payload && payload.rowTypes || [];
  const headers = payload && payload.headers || [];
  const sections = payload && payload.sections || [];
  if (!payload || payload.version !== 'relayops-morning-v1') errors.push('Wrong payload version');
  if (payload && ['full-replace','partial-update'].indexOf(payload.writeMode) < 0) errors.push('Write mode must be full-replace or partial-update');
  const allowedDateNames = relayOpsAllowedDateNames(payload && payload.operationDate);
  if (!allowedDateNames.length) errors.push('Operation date must be YYYY-MM-DD');
  if (allowedDateNames.length && allowedDateNames.indexOf(payload.sheetName) < 0) errors.push('Target tab must match operation date: ' + allowedDateNames.join(' or '));
  if (payload && payload.startCell !== 'A3') errors.push('Start cell must be A3');
  if (payload && payload.writeRange !== RELAYOPS_WRITE_RANGE) errors.push('Write range must be A3:M');
  if (headers.length !== RELAYOPS_COLS || headers[0] !== 'WAVE' || headers[12] !== 'PLANNED RTS') errors.push('Header row must match A-M template');
  if (!rows.length) errors.push('No morning rows sent');
  rows.forEach(function(row, i) {
    if (!Array.isArray(row) || row.length !== RELAYOPS_COLS) errors.push('Row ' + (i + 1) + ' must have 13 columns');
  });
  if (rowTypes.length !== rows.length) errors.push('Row types must match row count');
  if (rowTypes.indexOf('route') < 0 || (payload.writeMode === 'full-replace' && (rowTypes.indexOf('time') < 0 || rowTypes.indexOf('separator') < 0))) errors.push('Missing required route/time/separator row types');
  rowTypes.forEach(function(type, i) {
    if (type === 'separator' && rows[i] && rows[i].some(function(cell) { return String(cell || '') !== ''; })) errors.push('Separator row ' + (i + 1) + ' must be empty');
  });
  if (!sections.length) errors.push('No wave sections sent');
  const waveLabels = relayOpsWaveLabels(payload);
  if (waveLabels.length !== 5 || waveLabels.some(function(wave) { return !wave.value; })) errors.push('All five Wave 1-5 time/count labels are required');
  sections.forEach(function(section, i) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    const time = Number(section.timeRow);
    const separator = Number(section.separatorRow);
    const fixedLayout = relayOpsLayoutForSection(section);
    if (!fixedLayout) errors.push('Section ' + (i + 1) + ' is not supported by OPS LOG 2026: ' + String(section.label || section.wave || 'unnamed'));
    else {
      if (section.slotKey && relayOpsSectionKey(section.slotKey) !== fixedLayout.key) errors.push('Section ' + (i + 1) + ' slot identity does not match ' + fixedLayout.label);
      const invalidBase = !start || start < RELAYOPS_START_ROW || !count;
      const invalidTime = Boolean(fixedLayout.timeRow) && (!time || time <= start);
      const invalidSeparator = Boolean(fixedLayout.separatorRow) && (!separator || separator <= start || (fixedLayout.timeRow && separator <= time));
      if (invalidBase || invalidTime || invalidSeparator) errors.push('Section ' + (i + 1) + ' has invalid merge rows');
      if (relayOpsSectionRows(payload, section).length > fixedLayout.routeCapacity) errors.push(fixedLayout.label + ' exceeds ' + fixedLayout.routeCapacity + ' available route rows');
    }
  });
  return {ready: errors.length === 0, errors: errors};
}

function validateRelayOpsRtsPayload(payload) {
  const errors = [], allowed = relayOpsAllowedDateNames(payload && payload.operationDate), updates = payload && payload.updates || [], waves = payload && payload.waves || [];
  if (!payload || payload.version !== 'relayops-morning-v1' || payload.mode !== 'rts-only') errors.push('Wrong RTS-only payload version');
  if (!allowed.length || allowed.indexOf(payload.sheetName) < 0) errors.push('RTS target tab must match the operation date');
  if (!updates.length) errors.push('No Planned RTS updates were supplied');
  updates.forEach(function(update, index) {
    if (!String(update.route || '').trim() || !String(update.plannedRts || '').trim()) errors.push('RTS update ' + (index + 1) + ' needs Route and Planned RTS');
    if (update.expectedSection && !relayOpsLayoutForSection({label:update.expectedSection})) errors.push('RTS update ' + (index + 1) + ' has an unsupported fixed wave slot');
  });
  const waveLabels = relayOpsWaveLabels(payload);
  if (waves.length !== 5 || waveLabels.some(function(wave) { return !wave.value; })) errors.push('All five Wave 1-5 time/count labels are required');
  return {ready:errors.length===0,errors:errors};
}

function validateRelayOpsWhiparoundPayload(payload) {
  const errors = [], allowed = relayOpsAllowedDateNames(payload && payload.operationDate), updates = payload && payload.updates || [];
  if (!payload || payload.version !== 'relayops-morning-v1' || payload.mode !== 'whiparound-only') errors.push('Wrong Whiparound-only payload version');
  if (!allowed.length || allowed.indexOf(payload.sheetName) < 0) errors.push('Whiparound target tab must match the operation date');
  if (!updates.length) errors.push('No Whiparound checks were supplied');
  updates.forEach(function(update, index) {
    if (!String(update.route || '').trim()) errors.push('Whiparound update ' + (index + 1) + ' needs a Route');
    if (!String(update.driver || '').trim()) errors.push('Whiparound update ' + (index + 1) + ' needs a Driver');
    if (update.expectedSection && !relayOpsLayoutForSection({label:update.expectedSection})) errors.push('Whiparound update ' + (index + 1) + ' has an unsupported fixed wave slot');
    if (typeof update.preWhip !== 'boolean' || typeof update.postWhip !== 'boolean') errors.push('Whiparound update ' + (index + 1) + ' needs PRE-WHIP and POST-WHIP booleans');
  });
  return {ready:errors.length===0,errors:errors};
}

function relayOpsRouteKey(value) {
  const text = String(value || '').toUpperCase(), match = text.match(/\bCX\d+\b/);
  return match ? match[0] : text.replace(/\s+/g, '');
}

function relayOpsLayoutForRow(row) {
  for (var i = 0; i < RELAYOPS_LAYOUT.length; i++) {
    const layout = RELAYOPS_LAYOUT[i];
    if (row >= layout.startRow && row < layout.startRow + layout.routeCapacity) return layout;
  }
  return null;
}

function relayOpsDriverKey(value) {
  const primary = String(value || '').split(/\s*(?:\+|\||&|\band\b)\s*/i)[0] || '';
  return primary.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function relayOpsRouteIndex(sheet) {
  const values = sheet.getRange(3, 2, 108, 2).getDisplayValues(), byRoute = {};
  values.forEach(function(row, index) {
    const key = relayOpsRouteKey(row[1]), sheetRow = index + 3, layout = relayOpsLayoutForRow(sheetRow);
    if (key && layout && !byRoute[key]) byRoute[key] = {row:sheetRow,driver:String(row[0] || '').trim(),layout:layout};
  });
  return byRoute;
}

function writeRelayOpsRtsOnly(payload) {
  const target = resolveRelayOpsTarget(payload, false);if (target.wouldCreate) throw new Error('Send the full Morning Sheet once before RTS-only updates');const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);
  const byRoute = relayOpsRouteIndex(sheet);
  let updated = 0;const missingRoutes = [], sectionMismatches = [];
  (payload.updates || []).forEach(function(update) {
    const key = relayOpsRouteKey(update.route), record = byRoute[key];
    if (!record) { missingRoutes.push(key);return; }
    const expected = update.expectedSection ? relayOpsLayoutForSection({label:update.expectedSection}) : null;
    if (expected && expected.key !== record.layout.key) { sectionMismatches.push({route:key,expectedSection:expected.label,actualSection:record.layout.label});return; }
    sheet.getRange(record.row, 21).setValue(update.plannedRts);updated++;
  });
  const waveTimes = writeRelayOpsWaveLabels(sheet, payload);
  return {sheetName:sheet.getName(),updated:updated,waveTimes:waveTimes,missingRoutes:missingRoutes,sectionMismatches:sectionMismatches};
}

function writeRelayOpsWhiparoundOnly(payload) {
  const target = resolveRelayOpsTarget(payload, false);if (target.wouldCreate) throw new Error('Send the full Morning Sheet once before Whiparound-only updates');const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);
  const byRoute = relayOpsRouteIndex(sheet);
  let updated = 0;const missingRoutes = [], driverMismatches = [], sectionMismatches = [];
  (payload.updates || []).forEach(function(update) {
    const key = relayOpsRouteKey(update.route), record = byRoute[key];if (!record) { missingRoutes.push(key);return; }
    const expected = update.expectedSection ? relayOpsLayoutForSection({label:update.expectedSection}) : null;
    if (expected && expected.key !== record.layout.key) { sectionMismatches.push({route:key,expectedSection:expected.label,actualSection:record.layout.label});return; }
    if (relayOpsDriverKey(update.driver) !== relayOpsDriverKey(record.driver)) { driverMismatches.push({route:key,expectedDriver:String(update.driver || ''),actualDriver:record.driver,row:record.row});return; }
    const row = record.row;
    sheet.getRange(row, 11).setValue(Boolean(update.preWhip));
    sheet.getRange(row, 13).setValue(Boolean(update.postWhip));
    updated++;
  });
  return {sheetName:sheet.getName(),updated:updated,missingRoutes:missingRoutes,driverMismatches:driverMismatches,sectionMismatches:sectionMismatches};
}

function relayOpsValidateTemplate() {
  const sheet = relayOpsSpreadsheet().getSheetByName(RELAYOPS_TEMPLATE_SHEET);
  if (!sheet) throw new Error('Blank template tab "' + RELAYOPS_TEMPLATE_SHEET + '" was not found');
  validateRelayOpsTemplateSignature(sheet);
  const layout = relayOpsTemplateLayout(sheet, 0);
  const ready = layout.hasEnoughColumns && layout.maxRows >= RELAYOPS_START_ROW;
  SpreadsheetApp.getUi().alert(
    ready ? 'RelayOps template layout is ready' : 'RelayOps template needs review',
    'Sheet tab: ' + sheet.getName() +
      '\nDashboard payload: ' + RELAYOPS_WRITE_RANGE +
      '\nOriginal template: ' + RELAYOPS_TEMPLATE_RANGE +
      '\nRows available: ' + layout.maxRows + ' / needs ' + layout.neededRows +
      '\nColumns available: ' + layout.maxColumns + ' / needs ' + layout.neededColumns +
      '\nFrozen rows: ' + layout.frozenRows +
      '\nStatus: ' + (ready ? 'Ready for Dry run / Send' : 'The original Ops Log needs columns A through V'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  return layout;
}

function relayOpsTemplateLayout(sheet, sentRows) {
  // The original OPS LOG 2026 template is a fixed 116-row form. Do not
  // calculate capacity from payload length: doing so previously inserted rows
  // and shifted the template's merged Wave/PAD cells and divider rows.
  const neededRows = 116;
  return {
    maxRows: sheet.getMaxRows(),
    maxColumns: sheet.getMaxColumns(),
    neededRows: neededRows,
    neededColumns: RELAYOPS_TEMPLATE_COLS,
    hasEnoughRows: sheet.getMaxRows() >= neededRows,
    hasEnoughColumns: sheet.getMaxColumns() >= RELAYOPS_TEMPLATE_COLS,
    frozenRows: sheet.getFrozenRows()
  };
}

function ensureRelayOpsTemplateCapacity(sheet, rowCount) {
  const layout = relayOpsTemplateLayout(sheet, rowCount);
  if (!layout.hasEnoughRows) sheet.insertRowsAfter(sheet.getMaxRows(), layout.neededRows - sheet.getMaxRows());
  if (!layout.hasEnoughColumns) sheet.insertColumnsAfter(sheet.getMaxColumns(), RELAYOPS_TEMPLATE_COLS - sheet.getMaxColumns());
}

function freezeRelayOpsHeader(sheet) {
  try {
    sheet.getRange(1, 1, 2, RELAYOPS_COLS).getMergedRanges().forEach(function(range) {
      if (range.getRow() === 1) range.breakApart();
    });
  } catch (error) {}
  return sheet.getFrozenRows();
}

function writeRelayOpsMorningSheet(payload) {
  const validation = validateRelayOpsMorningPayload(payload);
  if (!validation.ready) throw new Error('RelayOps preflight failed: ' + validation.errors.join('; '));
  const writeMode = payload.writeMode;
  const target = resolveRelayOpsTarget(payload, writeMode === 'full-replace');
  if (writeMode === 'partial-update' && target.wouldCreate) throw new Error('Send all waves once before using a filtered partial update');
  const sheet = target.sheet;
  validateRelayOpsTemplateSignature(sheet);

  // Clear only dashboard-owned cells inside the fixed OPS LOG 2026 sections.
  // Existing merges, headers, widths, colors, checkboxes J:M, divider N,
  // and operations columns O/R/S/T/V remain untouched.
  if (writeMode === 'full-replace') {
    RELAYOPS_LAYOUT.forEach(function(layout) {
      sheet.getRange(layout.startRow, 2, layout.routeCapacity, 3).clearContent();
      sheet.getRange(layout.startRow, 6, layout.routeCapacity, 3).clearContent();
      sheet.getRange(layout.startRow, 16, layout.routeCapacity, 2).clearContent();
      sheet.getRange(layout.startRow, 16, layout.routeCapacity, 2).setNumberFormat('0');
      sheet.getRange(layout.startRow, 21, layout.routeCapacity, 1).clearContent();
      sheet.getRange(layout.startRow, 1).setValue(layout.label);
      if (layout.timeRow) sheet.getRange(layout.timeRow, 1).clearContent();
    });
  }

  if (writeMode === 'partial-update') {
    const byRoute = relayOpsRouteIndex(sheet), missingRoutes = [], sectionMismatches = [];let updated = 0;
    (payload.sections || []).forEach(function(section) {
      const layout = relayOpsLayoutForSection(section);if (!layout) return;
      relayOpsSectionRows(payload, section).forEach(function(row) {
        const key = relayOpsRouteKey(row[2]), record = byRoute[key];
        if (!record) { missingRoutes.push(key);return; }
        if (record.layout.key !== layout.key) { sectionMismatches.push({route:key,expectedSection:layout.label,actualSection:record.layout.label});return; }
        sheet.getRange(record.row, 2, 1, 3).setValues([[row[1], row[2], row[3]]]);
        sheet.getRange(record.row, 6, 1, 3).setValues([[row[5], row[6], row[7]]]);
        sheet.getRange(record.row, 16, 1, 2).setValues([[row[9], row[10]]]).setNumberFormat('0');
        sheet.getRange(record.row, 21).setValue(row[12]);updated++;
      });
    });
    const waveTimes = writeRelayOpsWaveLabels(sheet, payload);
    return {sheetName:sheet.getName(),startCell:'A3',writeRange:RELAYOPS_TEMPLATE_RANGE,writtenRange:'matched routes + five wave labels',lastCell:'',createdSheet:false,writeMode:writeMode,updated:updated,waveTimes:waveTimes,missingRoutes:missingRoutes,sectionMismatches:sectionMismatches};
  }

  (payload.sections || []).forEach(function(section) {
    const layout = relayOpsLayoutForSection(section);
    if (!layout) return;
    const sectionRows = relayOpsSectionRows(payload, section);
    if (sectionRows.length) {
      sheet.getRange(layout.startRow, 2, sectionRows.length, 3).setValues(sectionRows.map(function(row) { return [row[1], row[2], row[3]]; }));
      sheet.getRange(layout.startRow, 6, sectionRows.length, 3).setValues(sectionRows.map(function(row) { return [row[5], row[6], row[7]]; }));
      sheet.getRange(layout.startRow, 16, sectionRows.length, 2).setValues(sectionRows.map(function(row) { return [row[9], row[10]]; }));
      sheet.getRange(layout.startRow, 21, sectionRows.length, 1).setValues(sectionRows.map(function(row) { return [row[12]]; }));
    }
    sheet.getRange(layout.startRow, 1).setValue(layout.label);
    if (section.pad !== undefined && section.pad !== null && String(section.pad) !== '') sheet.getRange(layout.startRow, 5).setValue(section.pad);
  });
  const waveTimes = writeRelayOpsWaveLabels(sheet, payload);
  return {sheetName: sheet.getName(), startCell: 'A3', writeRange: RELAYOPS_TEMPLATE_RANGE, writtenRange: 'A3:V116', lastCell: 'V116', createdSheet: target.created, writeMode:writeMode, updated:(payload.rows || []).filter(function(row){return row && String(row[2] || '').trim();}).length, waveTimes:waveTimes, missingRoutes:[], sectionMismatches:[]};
}

function validateRelayOpsTemplateSignature(sheet) {
  if (!sheet) throw new Error('OPS LOG sheet was not found');
  if (sheet.getMaxRows() < 116 || sheet.getMaxColumns() < 22) throw new Error('Target tab is not the 116-row, 22-column OPS LOG 2026 layout');
  const expected = [['A1','WAVE'],['J1','PRE DVIC'],['P1','STOP COUNT'],['U1','PLANNED RTS'],['V1','CLOCK OUT TIME'],['A3','WAVE 1'],['A18','WAVE 2'],['A33','WAVE 3'],['A48','WAVE 4'],['A63','WAVE 5'],['A79',"ADHOC's"],['A95','HELPERS'],['A111','DSP']];
  expected.forEach(function(item) {
    const actual = String(sheet.getRange(item[0]).getDisplayValue() || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const wanted = String(item[1]).toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (actual !== wanted) throw new Error('Target tab does not match OPS LOG 2026 at ' + item[0] + ' (expected ' + item[1] + ')');
  });
  return true;
}

function resolveRelayOpsTarget(payload, createIfMissing) {
  const ss = relayOpsSpreadsheet();
  const allowedNames = relayOpsAllowedDateNames(payload.operationDate);
  if (!allowedNames.length) throw new Error('A valid operationDate is required before choosing a dated Ops Log tab');
  if (allowedNames.indexOf(payload.sheetName) < 0) throw new Error('Refusing non-date target. Expected ' + allowedNames.join(' or '));
  const sheetNames = [payload.sheetName].concat(allowedNames).filter(function(name, index, values) { return name && values.indexOf(name) === index; });
  let sheet = null;
  for (var s = 0; s < sheetNames.length && !sheet; s++) sheet = ss.getSheetByName(sheetNames[s]);
  if (sheet) { validateRelayOpsTemplateSignature(sheet);return {sheet:sheet,targetName:sheet.getName(),wouldCreate:false,created:false}; }
  const template = ss.getSheetByName(RELAYOPS_TEMPLATE_SHEET);
  if (!template) throw new Error('Blank template tab "' + RELAYOPS_TEMPLATE_SHEET + '" was not found');
  validateRelayOpsTemplateSignature(template);
  if (!createIfMissing) return {sheet:template,targetName:payload.sheetName,wouldCreate:true,created:false};
  const created = template.copyTo(ss).setName(payload.sheetName);
  validateRelayOpsTemplateSignature(created);
  return {sheet:created,targetName:created.getName(),wouldCreate:false,created:true};
}

function relayOpsSpreadsheet() {
  return SpreadsheetApp.openById(RELAYOPS_SPREADSHEET_ID);
}

function findRelayOpsMorningSheet(payload) {
  return resolveRelayOpsTarget(payload, false).sheet;
}

function testRelayOpsMorningSheet() {
  const sample = {
    version: 'relayops-morning-v1',
    writeMode: 'full-replace',
    startCell: 'A3',
    writeRange: 'A3:M',
    headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    operationDate: '2026-07-12',
    sheetName: '7/12/26',
    sheetNameCandidates: ['7/12/26','7.12.26'],
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    rowTypes: ['route','time','separator'],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}],
    waves: [{label:'WAVE 1',value:'11:15 (1)'},{label:'WAVE 2',value:'11:20 (0)'},{label:'WAVE 3',value:'11:25 (0)'},{label:'WAVE 4',value:'11:40 (0)'},{label:'WAVE 5',value:'11:45 (0)'}]
  };
  writeRelayOpsMorningSheet(sample);
}`;
}
function saveMorningSheetsConnector() {
  const input=document.getElementById('morning-sheets-endpoint');
  const endpoint=(input?.value||'').trim();
  if(endpoint&&!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:[?#].*)?$/i.test(endpoint)) {
    state.morningSheetsLastError='Use the Apps Script Web app URL ending in /exec. The normal Google Sheet edit link cannot receive dashboard data.';
    persist(); render();
    return toast('Paste the Apps Script Web app /exec URL — not the Google Sheet edit link','error');
  }
  state.morningSheetsEndpoint=endpoint;
  state.morningSheetsLastError='';
  state.morningSheetsLastReceipt=null;
  state.morningSheetsLastDryRun='';
  persist(); render();
  toast(state.morningSheetsEndpoint?'Google Sheets connector endpoint saved':'Google Sheets connector endpoint cleared');
}

async function postMorningSheetsPayload(endpoint,payload) {
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
  const text=await response.text();
  if(!response.ok)throw new Error(`Connector returned ${response.status}`);
  return parseMorningSheetsResponse(text,response.status);
}
function confirmedConnectorError(message='Google connector did not complete every requested update') { const error=new Error(message);error.relayOpsConfirmed=true;return error; }

async function sendRtsTimesToGoogleSheets(button=null) {
  const endpoint=(state.morningSheetsEndpoint||'').trim(),payload=morningRtsOnlyPayload();
  if(!endpoint){state.modal='morning-sheets-connector';render();return toast('Connect the Google Sheet first, then send RTS times','error');}
  if(!payload.updates.length)return toast("Import an Itineraries_DJT6 file first — no Planned RTS times are ready",'error');
  if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Checking RTS times…';}
  try {
    const dry=await postMorningSheetsPayload(endpoint,{...payload,dryRun:true});
    if(!dry.dryRun||dry.mode!=='rts-only')throw new Error('Google did not confirm RTS-only mode');
    if(dry.wouldCreateSheet)throw new Error('Send the full Morning Sheet once first. RTS-only send will not create a blank route sheet.');
    if(button)button.textContent='Sending RTS times only…';
    const result=await postMorningSheetsPayload(endpoint,payload);
    if(result.mode!=='rts-only')throw new Error('Google did not confirm RTS-only write');
    if(!Number(result.updated))throw new Error(`Google found none of the ${payload.updates.length} CX routes on ${result.sheet||payload.sheetName}. Send filtered waves once, then retry RTS times.`);
    if(result.missingRoutes?.length||result.sectionMismatches?.length||Number(result.updated)!==payload.updates.length)throw confirmedConnectorError(`Google updated ${result.updated||0} of ${payload.updates.length} RTS rows, then stopped safely · ${result.missingRoutes?.length||0} missing CX · ${result.sectionMismatches?.length||0} wrong wave slot`);
    if(Number(result.waveTimes)!==payload.waves.length)throw confirmedConnectorError(`RTS times were written, but Google updated ${result.waveTimes||0} of ${payload.waves.length} wave labels. Review the fixed wave slots.`);
    state.morningSheetsLastError='';persist();render();
    toast(`Google updated ${result.updated||0} Planned RTS time${result.updated===1?'':'s'} and ${result.waveTimes||0} wave labels${result.missingRoutes?.length?` · ${result.missingRoutes.length} CX routes not found`:''} · no other cells changed`);
    return true;
  } catch(error) {
    const message=error?.message||'RTS-only Google send failed';state.morningSheetsLastError=message;persist();
    toast(message,'error');return false;
  } finally {
    if(button&&button.isConnected){button.disabled=false;button.textContent=button.dataset.originalText||'Send RTS Times to Google Sheets';}
  }
}

async function sendWhiparoundChecksToGoogleSheets(button=null) {
  const endpoint=(state.morningSheetsEndpoint||'').trim(),payload=morningWhiparoundOnlyPayload();
  if(!endpoint){state.modal='morning-sheets-connector';render();return toast('Connect the Google Sheet first, then send Whiparound checks','error');}
  if(!payload.updates.length)return toast('No active Morning Sheet routes are ready for Whiparound checks','error');
  if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Checking Whiparound…';}
  try {
    const dry=await postMorningSheetsPayload(endpoint,{...payload,dryRun:true});
    if(!dry.dryRun||dry.mode!=='whiparound-only')throw new Error('Google did not confirm Whiparound-only mode. Update and redeploy the revised Apps Script once.');
    if(dry.wouldCreateSheet)throw new Error('Send the full Morning Sheet once first. Whiparound-only send will not create an empty route sheet.');
    if(button)button.textContent='Sending checks only…';
    const result=await postMorningSheetsPayload(endpoint,payload);
    if(result.mode!=='whiparound-only')throw new Error('Google did not confirm the Whiparound-only write');
    if(!Number(result.updated))throw new Error(`Google found none of the ${payload.updates.length} CX routes on ${result.sheet||payload.sheetName}. Send filtered waves once, then retry.`);
    if(result.missingRoutes?.length||result.driverMismatches?.length||result.sectionMismatches?.length||Number(result.updated)!==payload.updates.length)throw confirmedConnectorError(`Google updated ${result.updated||0} of ${payload.updates.length} Whiparound rows, then skipped ${result.missingRoutes?.length||0} missing CX, ${result.driverMismatches?.length||0} driver mismatch, and ${result.sectionMismatches?.length||0} wrong wave slot`);
    state.morningSheetsLastError='';persist();render();
    toast(`Google updated ${result.updated} Whiparound route${result.updated===1?'':'s'} · PRE-WHIP and POST-WHIP only${result.missingRoutes?.length?` · ${result.missingRoutes.length} CX routes not found`:''}`);
    return true;
  } catch(error) {
    const message=error?.message||'Whiparound-only Google send failed';state.morningSheetsLastError=message;persist();
    toast(message,'error');return false;
  } finally {
    if(button&&button.isConnected){button.disabled=false;button.textContent=button.dataset.originalText||'Send Whiparound Checks';}
  }
}

async function syncFilteredMorningToSheets() {
  const endpoint=(state.morningSheetsEndpoint||'').trim();
  if(!endpoint) { state.modal='morning-sheets-connector'; render(); return toast('Connect the Google Sheet once, then this button sends filtered waves','error'); }
  const payload=morningSheetsConnectorPayload();
  const preflight=morningSheetsPreflight(payload), proof=morningSheetsHandoffProof(payload);
  if(!preflight.ready||!proof.ready) {
    state.morningSheetsLastError=!preflight.ready?`Preflight failed: ${preflight.checks.filter(check=>!check.ok).map(check=>check.label).join(', ')}`:`Row audit failed: visible rows ${proof.visibleRows}, connector rows ${proof.rows}`;
    persist(); render();
    return toast('Filtered waves need review before sending','error');
  }
  const button=document.querySelector('[data-action="sync-filtered-morning-to-sheets"]');
  if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Checking Google…';}
  try {
    const dryResult=await postMorningSheetsPayload(endpoint,{...payload,dryRun:true});
    if(!dryResult.dryRun)throw new Error('Google did not confirm the safety check');
    if(Number(dryResult.waveTimes)!==5)throw confirmedConnectorError('Google is still using the older connector that can skip Wave 1–4 times. Install and redeploy the newest five-wave Apps Script before sending.');
    if(payload.writeMode==='partial-update'&&dryResult.wouldCreateSheet)throw new Error('Send all waves once before using a filtered partial update. No unrelated wave sections were changed.');
    if(button)button.textContent='Sending filtered waves…';
    const result=await postMorningSheetsPayload(endpoint,payload);
    const requestedRoutes=payload.sections.reduce((count,section)=>count+(payload.rows||[]).slice(Number(section.sourceIndex)||0,(Number(section.sourceIndex)||0)+Number(section.rowCount||0)).filter(row=>String(row?.[2]||'').trim()).length,0);
    if(result.writeMode!==payload.writeMode)throw confirmedConnectorError('Google did not confirm the requested full/partial write mode. Update and redeploy the revised Apps Script.');
    if(Number(result.waveTimes)!==5)throw confirmedConnectorError(`Google updated ${result.waveTimes||0} of 5 wave time/count labels. Update and redeploy the newest Apps Script connector, then send again.`);
    if(payload.writeMode==='partial-update'&&(result.missingRoutes?.length||result.sectionMismatches?.length||Number(result.updated)!==requestedRoutes))throw confirmedConnectorError(`Google updated ${result.updated||0} of ${requestedRoutes} filtered routes; ${result.missingRoutes?.length||0} CX missing and ${result.sectionMismatches?.length||0} in a different fixed wave slot. Unrelated sections were left unchanged.`);
    const sentAt=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    state.morningSheetsLastDryRun=sentAt;
    state.morningSheetsLastPush=sentAt;
    state.morningSheetsLastReceipt={sheet:result.sheet||payload.sheetName,startCell:result.startCell||payload.startCell,writeRange:result.writtenRange||result.writeRange||payload.writeRange,lastCell:result.lastCell||'',rows:result.rows||payload.rows.length,sections:result.sections||payload.sections.length,status:'confirmed',updatedAt:result.updatedAt||sentAt,sentAt,filterScope:morningFilterScopeText()};
    state.morningSheetsLastError='';
    persist(); render();
    toast(`Google confirmed ${filteredMorningRows().length} filtered routes + all 5 wave times · ${result.writtenRange||payload.writeRange}`);
    return true;
  } catch(error) {
    if(!error?.relayOpsConfirmed) {
      try {
        await fetch(endpoint,{method:'POST',mode:'no-cors',body:JSON.stringify(payload)});
        const sentAt=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
        state.morningSheetsLastPush=`${sentAt} · verify`;
        state.morningSheetsLastReceipt={sheet:payload.sheetName,startCell:payload.startCell,writeRange:payload.writeRange,rows:payload.rows.length,sections:payload.sections.length,status:'needs-verification',updatedAt:sentAt,sentAt,filterScope:morningFilterScopeText()};
        state.morningSheetsLastError=`Google received the send through browser-safe mode. Verify the ${payload.sheetName} tab before launch.`;
        persist();render();toast(`Sent to ${payload.sheetName} · open Google Sheet to verify`);return true;
      } catch(fallbackError) {}
    }
    state.morningSheetsLastError=error?.message||'Google Sheets bridge failed';
    persist(); render();
    toast(`Google Sheets bridge stopped safely: ${state.morningSheetsLastError}`,'error');
    return false;
  } finally {
    if(button&&button.isConnected){button.disabled=false;button.textContent=button.dataset.originalText||'Send filtered waves';}
  }
}
async function copyMorningAppsScript() {
  const code=morningSheetsAppsScript();
  if(!code.includes('2026-07-20-all-wave-labels')){toast('The five-wave Apps Script is still loading — refresh the dashboard and try again','error');return false;}
  const ok=await writeClipboardText(code);
  toast(ok?'Revised original-template Apps Script copied — replace the old code, save, and deploy a new version':'Clipboard blocked — download the .gs script file instead',ok?'':'error');
  return ok;
}
async function copyMorningSheetsPayload() {
  const text=JSON.stringify(morningSheetsConnectorPayload(),null,2);
  const ok=await writeClipboardText(text);
  toast(ok?'Morning Sheet connector payload copied':'Clipboard blocked — use the preview box',ok?'':'error');
  return ok;
}
function morningSheetsSetupChecklist() {
  return [
    'RelayOps Google Sheets Connector Setup',
    '',
    `1. Open template: ${MORNING_TEMPLATE_URL}`,
    '2. In Google Sheets, go to Extensions > Apps Script.',
    '3. Paste the RelayOps Apps Script from the dashboard, or upload/download relayops-morning-connector.gs.',
    '4. Save the Apps Script project.',
    '5. Reload the Google Sheet and confirm a RelayOps menu appears.',
    '5a. In the RelayOps menu, click Validate template layout. Confirm it recognizes the original A:V Ops Log.',
    '6. In Apps Script, click Deploy > New deployment > Web app.',
    '7. Set Execute as: Me.',
    '8. Set Who has access: Anyone with the link.',
    '9. Copy the Web app /exec URL. Do not copy passwords, cookies, or Amazon/Rivian credentials.',
    '10. Paste that /exec URL into RelayOps > Morning Sheet > Sheets connector.',
    '11. Click Save endpoint.',
    '12. Click Test connector.',
    '13. Click Dry run. This validates the payload in Google without changing cells.',
    '14. If dry run confirms, click Send now.',
    '15. Check the Last confirmed Google write receipt: sheet tab, exact written range, last cell, row count, and sections.',
    '',
    'Expected target: original A:V Ops Log. RelayOps writes A:H, P:Q, and U only. J:M checkboxes and O/R/S/T/V operations cells stay untouched.'
  ].join('\n');
}
async function copyMorningSheetsSetup() {
  const ok=await writeClipboardText(morningSheetsSetupChecklist());
  toast(ok?'Google Sheets setup checklist copied':'Clipboard blocked — copy the setup steps manually',ok?'':'error');
  return ok;
}
function morningSheetsVerificationChecklist(payload=morningSheetsConnectorPayload()) {
  const proof=morningSheetsHandoffProof(payload);
  const firstSection=payload.sections?.[0]||{};
  const lastCell=`V${payload.rows.length+2}`;
  return [
    'RelayOps Google Sheet Send Verification',
    '',
    `Template: ${MORNING_TEMPLATE_URL}`,
    `Target tab: ${payload.sheetName}`,
    `Expected template range: A3:${lastCell}`,
    `Expected last cell: ${lastCell}`,
    'Protected mapping: A:H setup · P:Q counts · U Planned RTS',
    `Rows sent: ${payload.rows.length}`,
    `Wave/Pad merge sections: ${payload.sections.length}`,
    `Black divider rows: ${proof.dividerRows || 'none'}`,
    '',
    'After Send Now:',
    `1. Open the Google Sheet template and confirm the ${payload.sheetName} tab is selected.`,
    '2. Row 1 should stay frozen while scrolling.',
    '3. Confirm the original A:V headers, widths, colors, and checkbox columns did not change.',
    `4. Confirm the first route starts at A${firstSection.startRow||3} and data ends at ${lastCell}.`,
    '5. Confirm Wave cells in column A and Pad cells in column E are merged like the template.',
    '6. Confirm black divider rows are still black and row-numbered.',
    '7. Confirm J:M checkboxes are still present and N remains the black divider.',
    '8. Confirm Stop Count is in P, Package Count is in Q, and Planned RTS is in purple column U.',
    '9. Confirm O, R, S, T, and V were not changed.',
    `10. Confirm the RelayOps receipt shows the A:V template range and Last cell ${lastCell}.`,
    '',
    'If RelayOps showed “Sent — verify in Google Sheet,” complete this checklist before launch.'
  ].join('\n');
}
async function copyMorningSheetsVerification() {
  const ok=await writeClipboardText(morningSheetsVerificationChecklist());
  toast(ok?'Google Sheets verification checklist copied':'Clipboard blocked — copy the verification steps manually',ok?'':'error');
  return ok;
}
function connectorUrlWithPing(endpoint='') {
  if(!endpoint)return '';
  const join=endpoint.includes('?')?'&':'?';
  return `${endpoint}${join}relayops=ping`;
}
function parseMorningSheetsResponse(text='',status=200) {
  let data=null;
  try { data=JSON.parse(text); } catch {}
  if(data&&data.ok===false){const error=new Error(data.error||`Connector returned ${status}`);error.relayOpsConfirmed=true;throw error;}
  if(data&&data.ok===true)return data;
  if(!/("ok"\s*:\s*true|rows|updatedAt)/i.test(text))throw new Error(`Connector returned ${status}`);
  return data||{ok:true,raw:text};
}
async function testMorningSheetsConnector() {
  const endpoint=(state.morningSheetsEndpoint||'').trim();
  if(!endpoint) { state.modal='morning-sheets-connector'; render(); return toast('Paste your Google Apps Script web app URL first','error'); }
  try {
    const response=await fetch(connectorUrlWithPing(endpoint),{method:'GET'});
    const text=await response.text();
    if(!response.ok||!/relayops-morning-v1/.test(text)||!/A3:V/.test(text))throw new Error(`Unexpected connector response ${response.status}`);
    if(!/2026-07-20-all-wave-labels/.test(text))throw new Error('Connector deployment is outdated. Replace the Apps Script with the five-wave connector, then choose Deploy → Manage deployments → Edit → New version → Deploy.');
    state.morningSheetsLastError='';
    persist(); render();
    toast('Google Sheets connector confirmed');
    return true;
  } catch(error) {
    state.morningSheetsLastError='Browser could not confirm the connector. If this is an Apps Script CORS block, Send can still use fallback mode; verify the Google Sheet after sending.';
    persist(); render();
    toast('Could not confirm connector from the browser — use Send, then check the sheet','error');
    return false;
  }
}
async function dryRunMorningToSheets() {
  const endpoint=(state.morningSheetsEndpoint||'').trim();
  if(!endpoint) { state.modal='morning-sheets-connector'; render(); return toast('Paste your Google Apps Script web app URL first','error'); }
  const payload={...morningSheetsConnectorPayload(),dryRun:true};
  const preflight=morningSheetsPreflight(payload);
  if(!preflight.ready) {
    state.morningSheetsLastError=`Preflight failed: ${preflight.checks.filter(check=>!check.ok).map(check=>check.label).join(', ')}`;
    state.modal='morning-sheets-connector';
    persist(); render();
    toast('Morning Sheet preflight failed — review the connector checks before dry run','error');
    return false;
  }
  const proof=morningSheetsHandoffProof(payload);
  if(!proof.ready) {
    state.morningSheetsLastError=`Row audit failed: visible rows ${proof.visibleRows}, connector rows ${proof.rows}${proof.mismatchIndex>=0?`, mismatch at row ${proof.mismatchIndex+3}`:''}`;
    state.modal='morning-sheets-connector';
    persist(); render();
    toast('Morning Sheet row audit failed — review before dry run','error');
    return false;
  }
  try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const text=await response.text();
    if(!response.ok)throw new Error(`Connector returned ${response.status}`);
    const result=parseMorningSheetsResponse(text,response.status);
    if(!result.dryRun)throw new Error('Connector did not confirm dry run mode');
    state.morningSheetsLastDryRun=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    state.morningSheetsLastError='';
    state.modal='morning-sheets-connector';
    persist(); render();
    const layoutNote=result.layout&&(!result.layout.hasEnoughRows||!result.layout.hasEnoughColumns)?' · template will auto-expand':'';
    toast(`Dry run confirmed · ${result.sheet||payload.sheetName} ${result.writtenRange||result.writeRange||payload.writeRange} · ${result.rows||payload.rows.length} rows${layoutNote}`);
    return true;
  } catch(error) {
    state.morningSheetsLastError=error?.message||'Google Sheets dry run failed';
    state.modal='morning-sheets-connector';
    persist(); render();
    toast(`Google Sheets dry run failed: ${state.morningSheetsLastError}`,'error');
    return false;
  }
}
async function sendMorningToSheets() {
  const endpoint=(state.morningSheetsEndpoint||'').trim();
  if(!endpoint) { state.modal='morning-sheets-connector'; render(); return toast('Paste your Google Apps Script web app URL first','error'); }
  const payload=morningSheetsConnectorPayload();
  const preflight=morningSheetsPreflight(payload);
  if(!preflight.ready) {
    state.morningSheetsLastError=`Preflight failed: ${preflight.checks.filter(check=>!check.ok).map(check=>check.label).join(', ')}`;
    state.modal='morning-sheets-connector';
    persist(); render();
    toast('Morning Sheet preflight failed — review the connector checks before sending','error');
    return false;
  }
  const proof=morningSheetsHandoffProof(payload);
  if(!proof.ready) {
    state.morningSheetsLastError=`Row audit failed: visible rows ${proof.visibleRows}, connector rows ${proof.rows}${proof.mismatchIndex>=0?`, mismatch at row ${proof.mismatchIndex+3}`:''}`;
    state.modal='morning-sheets-connector';
    persist(); render();
    toast('Morning Sheet row audit failed — review before sending','error');
    return false;
  }
  try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const text=await response.text();
    if(!response.ok)throw new Error(`Connector returned ${response.status}`);
    const result=parseMorningSheetsResponse(text,response.status);
    const sentAt=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    state.morningSheetsLastPush=sentAt;
    state.morningSheetsLastReceipt={sheet:result.sheet||payload.sheetName,startCell:result.startCell||payload.startCell,writeRange:result.writtenRange||result.writeRange||payload.writeRange,lastCell:result.lastCell||'',rows:result.rows||payload.rows.length,sections:result.sections||payload.sections.length,status:'confirmed',updatedAt:result.updatedAt||sentAt,sentAt};
    state.morningSheetsLastError='';
    persist(); render();
    toast(`Google confirmed Morning Sheet update · ${result.rows||payload.rows.length} rows`);
    return true;
  } catch(error) {
    if(error?.relayOpsConfirmed) {
      state.morningSheetsLastError=error.message||'Google Sheets connector rejected the payload';
      state.modal='morning-sheets-connector';
      persist(); render();
      toast(`Google Sheets connector rejected send: ${state.morningSheetsLastError}`,'error');
      return false;
    }
    try {
      await fetch(endpoint,{method:'POST',mode:'no-cors',body:JSON.stringify(payload)});
      const sentAt=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
      state.morningSheetsLastPush=`${sentAt} · check sheet`;
      state.morningSheetsLastReceipt={sheet:payload.sheetName,startCell:payload.startCell,writeRange:payload.writeRange,rows:payload.rows.length,sections:payload.sections.length,status:'needs-verification',updatedAt:sentAt,sentAt};
      state.morningSheetsLastError='Sent with fallback mode, but the browser could not read Google’s confirmation. Open the Google Sheet and confirm the rows updated.';
      persist(); render();
      toast(`Morning Sheet sent in fallback mode · verify Google Sheet`);
      return true;
    } catch(fallbackError) {
      state.morningSheetsLastError=fallbackError?.message||error?.message||'Google Sheets connector failed';
      persist(); render();
      toast('Google Sheets connector failed — copy the payload JSON as backup','error');
      return false;
    }
  }
}
async function copyMorningVisible(){
  state.sheetCopyText=morningSheetTsv();
  const range=morningSheetsHandoffProof().range;
  const board=document.querySelector('.morning-board');
  if(board){board.classList.add('sheet-copy-highlight');setTimeout(()=>board.classList.remove('sheet-copy-highlight'),1400);}
  if(await writeClipboardTable(state.sheetCopyText,morningSheetClipboardHtml())) toast(`Google Sheets template data copied — paste into ${range}`);
  else toast('Clipboard access was blocked; use Export sheet instead','error');
}
function selectSheetsText(){
  const el=document.getElementById('sheets-copy-text');
  if(!el)return;
  el.focus(); el.select();
  toast('Paste box selected — press ⌘C, then paste into Google Sheets A3');
}
function loadSlackDemo(){
  const headers=['DSP','Driver','Route Code','Service Type','Wave','Staging Location','Route Duration','Num Zones','Num Packages','Num Commercial Pkgs','Stops'];
  const rows=morningSeed.map(r=>[r.dsp,r.driver,r.route,r.service,r.wave,r.staging,r.duration,r.zones,r.packages,r.commercial,r.stops]);
  rows.splice(5,0,['OTHER','Other DSP Driver','ZZ101','Standard Parcel','11:10 AM','STG.A.1',390,19,301,11,172],['OTHER','Another DSP Driver','ZZ102','Standard Parcel','11:15 AM','STG.A.2',405,22,344,16,181],['TEST','Test DSP Driver','ZZ103','Standard Parcel','11:20 AM','STG.B.1',420,23,355,9,185]);
  state.importedFile={name:'day-of-operations-07-02.csv',headers,rows,kind:'plan',routeDetails:{},routeDetailsCount:0};render();toast('Slack demo file selected · DSP filter preview ready');
}
function exportMorningSheet(){const h=['Wave','Driver','Route','Staging','Pad','EV','Device','Portable','Stop Count','Package Count','Planned RTS'];const rows=filteredMorningRows().map(r=>[r.wave,r.driver,r.route,r.staging,r.pad,r.ev||'',r.deviceName||'',r.portable||'',r.stops,r.packages,r.plannedRts||'']);downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8',`${state.dspCode}-opening-operations.csv`);toast('Morning operations sheet downloaded');}
function exportMorningTemplateSheet(){
  const headers=morningTemplateHeaders;
  const cls=(i)=>i===0?'waveHead':sheetSpacerColumns.has(i)?'spacer':i===20?'plannedHead':i>=9&&i<=10?'preInspectionHead':i>=11&&i<=12?'postInspectionHead':i===14?'rescuedHead':i===17?'returnsHead':'head';
  const cell=(value='',klass='cell',attrs='')=>`<td ${attrs} class="${klass}">${xmlEscape(value)}</td>`;
  const colgroup=`<colgroup>${morningClipboardColumnWidths.map(width=>`<col style="width:${width}px">`).join('')}</colgroup>`;
  const sections=morningSections(filteredMorningRows());
  const body=sections.map(section=>{
    const rows=morningDisplayRows(section);
    const waveText=section.dsp?'DSP':section.label;
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||section.pad||'';
    const padSpan=rows.length+(section.hasTime?1:0);
    const data=rows.map((r,i)=>`<tr>${sheetCopyFields.map((field,col)=>{if(col===0)return i===0?cell(waveText,section.dsp?'wave dsp':'wave',`rowspan="${rows.length}"`):'';if(col===4)return i===0?cell(pad,'pad',`rowspan="${padSpan}"`):'';const value=copyCellValue(r,field,'',pad);return cell(value,sheetSpacerColumns.has(col)?'spacer':col===20?'planned':col===1?'driver':'cell');}).join('')}</tr>`).join('');
    const time=section.hasTime?`<tr>${sheetCopyFields.map((field,col)=>col===4?'':cell(col===0?morningWaveTimeText(section):'',col===0?'waveTime':sheetSpacerColumns.has(col)?'spacer':col===20?'planned':'cell')).join('')}</tr>`:'';
    const separators=Array.from({length:section.separatorRows||0},()=>`<tr class="separator">${headers.map(()=>cell('','separatorCell')).join('')}</tr>`).join('');
    return `${data}${time}${separators}`;
  }).join('');
  const excelOptions=`<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Morning Operations</x:Name><x:WorksheetOptions><x:FreezePanes/><x:FrozenNoSplit/><x:SplitHorizontal>1</x:SplitHorizontal><x:TopRowBottomPane>1</x:TopRowBottomPane><x:ActivePane>2</x:ActivePane></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>`;
  const html=`<!doctype html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8">${excelOptions}<style>
    table{border-collapse:collapse;font-family:Arial,sans-serif;} td{mso-number-format:"\\@";}
    .head,.waveHead,.plannedHead{height:34px;border:1px solid #111;text-align:center;font-family:Arial,sans-serif;font-weight:700;font-size:12px;background:#92f4fa;}
    .waveHead{background:#b4a7d6}.plannedHead{background:#92f4fa}.preInspectionHead{background:#fce5cd}.postInspectionHead{background:#fff2cc}.rescuedHead{background:#93c47d}.returnsHead{background:#ea9999}.spacer{width:18px;background:#000;border:1px solid #000;color:#000}
    .cell,.driver,.planned{height:24px;min-width:70px;border:1px solid #222;text-align:center;font-weight:700;font-size:10px;background:#fff}.driver{min-width:210px}.wave{min-width:76px;font-size:28px;font-weight:900;writing-mode:vertical-rl;transform:rotate(180deg);background:#fff}.waveTime{font-size:13px;font-weight:900;background:#fff}.dsp{vertical-align:bottom}.pad{font-size:24px;font-weight:900;background:#fff}.planned{background:#b4a7d6}.separatorCell{height:14px;background:#000;border:1px solid #000;color:#000}
  </style></head><body><table>${colgroup}<tr>${headers.map((h,i)=>cell(h,cls(i))).join('')}</tr>${body}</table></body></html>`;
  downloadBlob('\ufeff'+html,'application/vnd.ms-excel',`${state.dspCode}-opening-operations-formatted.xls`);
  toast('Formatted opening sheet downloaded — import/open this in Google Sheets to keep layout');
}
function buildWaveScreenshot(rows) {
  const columns=[['Wave',170],['Driver / Helper',390],['Route',150],['Staging',210],['Pad',100],['EV',130],['Device',150],['Portable',150]], rowHeight=48, headerHeight=58, separator=12;
  const groups=[...new Set(rows.map(r=>r.wave))].map(w=>[w,rows.filter(r=>r.wave===w)]), width=columns.reduce((n,c)=>n+c[1],0), height=headerHeight+groups.reduce((n,g)=>n+g[1].length*rowHeight+separator,0);
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);ctx.textBaseline='middle';ctx.strokeStyle='#555b57';ctx.lineWidth=1;
  let x=0;columns.forEach(([label,w])=>{ctx.fillStyle='#303733';ctx.fillRect(x,0,w,headerHeight);ctx.strokeRect(x,0,w,headerHeight);ctx.fillStyle='#ffffff';ctx.font='bold 18px Arial';ctx.textAlign='center';ctx.fillText(label,x+w/2,headerHeight/2);x+=w;});
  let y=headerHeight;
  const value=(r,key)=>key==='Wave'?'':key==='Driver / Helper'?r.driver:key==='Route'?r.route:key==='Staging'?r.staging:key==='Pad'?r.pad:key==='EV'?(r.ev||''):key==='Device'?(r.deviceName||''):(r.portable||'');
  groups.forEach(([wave,items],groupIndex)=>{ctx.fillStyle='#050505';ctx.fillRect(0,y,width,separator);y+=separator;items.forEach(r=>{let cx=0;columns.forEach(([label,w])=>{ctx.fillStyle=label==='Pad'?'#fbfbfa':'#ffffff';ctx.fillRect(cx,y,w,rowHeight);ctx.strokeStyle='#656b67';ctx.strokeRect(cx,y,w,rowHeight);if(label!=='Wave'){ctx.fillStyle='#111411';ctx.font=label==='Driver / Helper'?'bold 17px Arial':'bold 18px Arial';ctx.textAlign='center';const raw=String(value(r,label)||'');const max=Math.max(3,Math.floor(w/10));ctx.fillText(raw.length>max?raw.slice(0,max-1)+'…':raw,cx+w/2,y+rowHeight/2);}cx+=w;});y+=rowHeight;});
    const waveHeight=items.length*rowHeight, waveY=y-waveHeight;ctx.fillStyle='#ffffff';ctx.fillRect(0,waveY,columns[0][1],waveHeight);ctx.strokeStyle='#656b67';ctx.strokeRect(0,waveY,columns[0][1],waveHeight);ctx.fillStyle='#090b09';ctx.textAlign='center';ctx.font='bold 25px Arial';ctx.fillText(`WAVE ${groupIndex+1}`,columns[0][1]/2,waveY+waveHeight/2-16);ctx.font='bold 18px Arial';ctx.fillText(`${String(wave).replace(/\s*[AP]M/i,'')} (${items.length})`,columns[0][1]/2,waveY+waveHeight/2+18);
  });
  return canvas.toDataURL('image/jpeg',0.92);
}
function buildPicklistScreenshot() {
  const columns=[['Wave',170],['Driver / Helper',390],['Route',150],['Staging',210],['Pad',100],['EV / Bag',150],['Device',150],['Portable',150]],rowHeight=48,titleHeight=78,headerHeight=58,separator=12,sections=openingPicklistSections().filter(section=>section.rows.length),width=columns.reduce((sum,column)=>sum+column[1],0),height=titleHeight+headerHeight+sections.reduce((sum,section)=>sum+section.rows.length*rowHeight+separator,0);
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);ctx.textBaseline='middle';ctx.fillStyle='#17241d';ctx.fillRect(0,0,width,titleHeight);ctx.fillStyle='#fff';ctx.textAlign='left';ctx.font='bold 29px Arial';ctx.fillText(`${state.organizationName} · Opening Picklist`,24,29);ctx.font='bold 20px Arial';ctx.fillStyle='#b8f37a';ctx.fillText(`DATE ${openingPicklistDateText()} · ${state.stationCode}`,24,57);
  let x=0;columns.forEach(([label,w])=>{ctx.fillStyle='#303733';ctx.fillRect(x,titleHeight,w,headerHeight);ctx.strokeStyle='#555b57';ctx.strokeRect(x,titleHeight,w,headerHeight);ctx.fillStyle='#fff';ctx.font='bold 18px Arial';ctx.textAlign='center';ctx.fillText(label,x+w/2,titleHeight+headerHeight/2);x+=w;});
  let y=titleHeight+headerHeight;sections.forEach(section=>{ctx.fillStyle='#050505';ctx.fillRect(0,y,width,separator);y+=separator;const startY=y;section.rows.forEach(row=>{let cx=0;const values=['',row.driver||'',row.route||'',row.staging||'',section.pad||'',routeEquipmentValue(row),row.deviceName||'',row.portable||''];columns.forEach(([label,w],index)=>{ctx.fillStyle='#fff';ctx.fillRect(cx,y,w,rowHeight);ctx.strokeStyle='#656b67';ctx.strokeRect(cx,y,w,rowHeight);if(index){ctx.fillStyle='#111';ctx.font=index===1?'bold 17px Arial':'bold 18px Arial';ctx.textAlign='center';const raw=String(values[index]||''),max=Math.max(3,Math.floor(w/10));ctx.fillText(raw.length>max?`${raw.slice(0,max-1)}…`:raw,cx+w/2,y+rowHeight/2);}cx+=w;});y+=rowHeight;});const groupHeight=section.rows.length*rowHeight;ctx.fillStyle='#fff';ctx.fillRect(0,startY,columns[0][1],groupHeight);ctx.strokeStyle='#656b67';ctx.strokeRect(0,startY,columns[0][1],groupHeight);ctx.fillStyle='#090b09';ctx.textAlign='center';ctx.font='bold 25px Arial';ctx.fillText(section.label,columns[0][1]/2,startY+groupHeight/2-(section.hasTime?16:0));if(section.hasTime){ctx.font='bold 18px Arial';ctx.fillText(openingPicklistTime(section),columns[0][1]/2,startY+groupHeight/2+18);}});
  return canvas.toDataURL('image/jpeg',.94);
}
function previewWaveScreenshot(){const rows=filteredMorningRows();if(!rows.length)return toast('No wave rows are visible to capture','error');state.screenshotKind='morning';state.screenshotPreview=buildWaveScreenshot(rows);state.modal='screenshot';render();}
function previewPicklistScreenshot(){const rows=openingPicklistSections().flatMap(section=>section.rows);if(!rows.length)return toast('No Picklist waves are available to capture','error');state.screenshotKind='picklist';state.screenshotPreview=buildPicklistScreenshot();state.modal='screenshot';render();}
function saveWaveScreenshot(){if(!state.screenshotPreview)return;const a=document.createElement('a');a.href=state.screenshotPreview;a.download=state.screenshotKind==='picklist'?`${state.dspCode}-opening-picklist-${state.morningOperationDate}.jpg`:`${state.dspCode}-${state.morningFilters.wave==='all'?'all-waves':state.morningFilters.wave.replace(/[^a-z0-9]+/gi,'-')}.jpg`;document.body.appendChild(a);a.click();a.remove();state.modal=null;state.screenshotPreview=null;state.screenshotKind='';render();toast('Approved JPEG saved — ready for GroupMe');}
function printOpeningPicklistOnePage() {
  const sheet=document.querySelector?.('.opening-picklist-sheet'),frame=document.querySelector?.('.opening-picklist-scroll');
  if(sheet&&frame){const width=Math.max(1,sheet.scrollWidth||sheet.offsetWidth||1014),height=Math.max(1,sheet.scrollHeight||sheet.offsetHeight||2100),targetWidth=1000,targetHeight=1530,scale=Math.min(1,targetWidth/width,targetHeight/height)*.985,scaledWidth=Math.min(targetWidth,Math.ceil(width*scale)),scaledHeight=Math.min(targetHeight,Math.ceil(height*scale));document.documentElement?.style?.setProperty?.('--picklist-print-scale',String(scale));document.documentElement?.style?.setProperty?.('--picklist-print-height',`${scaledHeight}px`);document.documentElement?.style?.setProperty?.('--picklist-print-width',`${scaledWidth}px`);document.body?.classList?.add?.('printing-picklist');}
  const cleanup=()=>{document.body?.classList?.remove?.('printing-picklist');document.documentElement?.style?.removeProperty?.('--picklist-print-scale');document.documentElement?.style?.removeProperty?.('--picklist-print-height');document.documentElement?.style?.removeProperty?.('--picklist-print-width');window.removeEventListener?.('afterprint',cleanup);};window.addEventListener?.('afterprint',cleanup,{once:true});window.print();setTimeout(cleanup,1500);
}
function downloadTemplate(){const h=['DSP','Driver','Route Code','Service Type','Wave','Staging Location','Route Duration','Num Zones','Num Packages','Num Commercial Pkgs','Stops'];const a=['LLOL','','CX249','Standard Parcel Electric','11:15 AM','STG.V.1','420','21','332','12','188'];const b=['OTHER','','ZZ101','Standard Parcel','11:10 AM','STG.A.1','390','19','301','11','172'];downloadBlob(`${h.join(',')}\r\n${a.join(',')}\r\n${b.join(',')}\r\n`,'text/csv','day-of-operations-import-template.csv');toast('Day-of-operations template downloaded');}
function downloadEquipmentTemplate(){
  const h=['EV/VAN','DEVICE','PORTABLE'];
  const rows=[
    ['1','40','31'],['2','41','32'],['3','42','33'],['21','60','51'],['37','31','-'],['40','34','r'],['43','37','cc'],['58','52','9'],
    ['F33','',''],['F34','',''],['R35','',''],['R36','',''],['R54','',''],['R55','',''],['R62','',''],['H1','',''],['H2','',''],['H3','',''],['H4','','']
  ];
  downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n')+'\r\n','text/csv;charset=utf-8','van-dev-port-google-sheets-layout.csv');
  toast('VAN/DEV/PORT Google Sheets layout downloaded');
}
function downloadFleetTemplate(){const h=['Source','Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles','Dispatcher Note'];const guide1=['READ ME','','','','','','','','Amazon required: Vehicle Name, VIN, License Plate, Active, Operational Status'];const guide2=['READ ME','','','','','','','','FleetOS required: VIN, Battery % or State of Charge, Range Miles'];const guide3=['READ ME','','','','','','','','Do not rename Amazon vehicles — RelayOps keeps Amazon fleet-list names exactly'];const amazon=['Amazon fleet list','LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational','','','Official name/status row'];const fleetos=['FleetOS tracker','','7FCEHEB79PN014816','','','','63%','98','Battery/range row for same VIN'];const both=['Amazon + FleetOS','LLOL EV 22','7FCTGAAA1PN000184','9XYZ222','Active','Operational','88%','137','One complete combined row also works'];downloadBlob(`${[h,guide1,guide2,guide3,amazon,fleetos,both].map(r=>r.map(csvEscape).join(',')).join('\r\n')}\r\n`,'text/csv','fleetos-amazon-ev-import-template.csv');toast('FleetOS/Amazon EV template downloaded');}

function xmlEscape(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function persist(){
localStorage.setItem('relayops_achat_messages',JSON.stringify(state.aChatMessages||[]));
localStorage.setItem('relayops_driver_name_aliases',JSON.stringify(state.driverNameAliases||{}));
localStorage.setItem('relayops_driver_profiles',JSON.stringify(normalizeDriverProfiles(state.driverProfiles||{})));
localStorage.setItem('relayops_rostering_training_matches',JSON.stringify(state.rosteringTrainingMatches||{}));
localStorage.setItem('relayops_rostering_manual_training',JSON.stringify(state.rosteringManualTraining||{}));
localStorage.setItem('relayops_equipment_issues',JSON.stringify(normalizeEquipmentIssuesStore(state.equipmentIssues||{})));
localStorage.setItem('relayops_sheet_history',JSON.stringify({past:(state.sheetHistory?.past||[]).slice(-40),future:(state.sheetHistory?.future||[]).slice(-40)}));
localStorage.setItem('relayops_slack_report_room_url',state.slackReportRoomUrl||'https://app.slack.com/client');
localStorage.setItem('relayops_charger_reports',JSON.stringify(normalizeChargerReports(state.chargerReports||[])));
localStorage.setItem('relayops_equipment_import',JSON.stringify(state.equipmentImport||null));
localStorage.setItem('relayops_device_custom_rows',JSON.stringify(state.deviceCustomRows||{ev:[],gas:[],helper:[]}));
localStorage.setItem('relayops_organization_name',state.organizationName);
localStorage.setItem('relayops_station_code',state.stationCode);
localStorage.setItem('relayops_message_queue_template',state.messageQueueTemplate);
localStorage.setItem('relayops_message_queue_status',JSON.stringify(state.messageQueueStatus||{}));
localStorage.setItem('relayops_coaching_queue',JSON.stringify(normalizeCoachingQueue(state.coachingQueue)));
localStorage.setItem('relayops_coaching_template',state.coachingTemplate||DEFAULT_COACHING_TEMPLATE);
localStorage.setItem('relayops_schedule_entries',JSON.stringify(state.scheduleEntries||[]));
localStorage.setItem('relayops_schedule_import_name',state.scheduleImportName||'');
localStorage.setItem('relayops_schedule_filter',state.scheduleFilter||'all');
localStorage.setItem('relayops_opening_roster_paycom_tab',state.openingRosterPaycomTab==='marked'?'marked':'scheduled');
localStorage.setItem('relayops_rostering_date',state.rosteringDate||defaultOperationDate());
localStorage.setItem('relayops_rostering_plans',JSON.stringify(state.rosteringPlans||{}));
localStorage.setItem('relayops_rostering_helper_pool',JSON.stringify(state.rosteringHelperPool||{}));
localStorage.setItem('relayops_rostering_open_services',JSON.stringify(state.rosteringOpenServices||{}));
localStorage.setItem('relayops_rostering_paycom_category',state.rosteringPaycomCategory||'all');
localStorage.setItem('relayops_rostering_auto_mode',state.rosteringAutoMode==='abc'?'abc':'random');
localStorage.setItem('relayops_call_off_driver_keys',JSON.stringify(state.callOffDriverKeys||{}));
localStorage.setItem('relayops_schedule_driver_marks',JSON.stringify(state.scheduleDriverMarks||{}));
localStorage.setItem('relayops_schedule_backup_records',JSON.stringify(state.scheduleBackupRecords||{}));
localStorage.setItem('relayops_schedule_stay_home',JSON.stringify(state.scheduleStayHome||{}));
localStorage.setItem('relayops_schedule_stay_home_history',JSON.stringify(state.scheduleStayHomeHistory||{}));
localStorage.setItem('relayops_schedule_reductions',JSON.stringify(state.scheduleReductions||{}));
localStorage.setItem('relayops_call_off_reasons',JSON.stringify(state.callOffReasons||{}));
localStorage.setItem('relayops_opening_picklist_topics',JSON.stringify(state.openingPicklistTopics||['','','','']));
localStorage.setItem('relayops_opening_picklist_notes',state.openingPicklistNotes||'');
localStorage.setItem('relayops_opening_picklist_calloff_rows',String(state.openingPicklistCalloffRows||6));
localStorage.setItem('relayops_opening_picklist_topic_rows',String(state.openingPicklistTopicRows||4));
localStorage.setItem('relayops_opening_picklist_backup_rows',String(state.openingPicklistBackupRows||21));
localStorage.setItem('relayops_opening_picklist_wave_slots',String(state.openingPicklistWaveSlots??5));
localStorage.setItem('relayops_opening_picklist_show_adhoc',String(state.openingPicklistShowAdhoc!==false));
localStorage.setItem('relayops_fit_picklist_rows',String(Boolean(state.fitOpeningPicklistRows)));
localStorage.setItem('relayops_opening_picklist_calloff_drafts',JSON.stringify(state.openingPicklistCalloffDrafts||[]));
localStorage.setItem('relayops_opening_picklist_backup_overrides',JSON.stringify(state.openingPicklistBackupOverrides||{}));
localStorage.setItem('relayops_opening_picklist_labels',JSON.stringify(state.openingPicklistLabels||{}));
localStorage.setItem('relayops_morning_wave_time_overrides',JSON.stringify(state.morningWaveTimeOverrides||{}));
localStorage.setItem('relayops_schedule_helpers',JSON.stringify(state.scheduleHelpers||{}));
localStorage.setItem('relayops_whiparound_inspections',JSON.stringify(state.whiparoundInspections||[]));
localStorage.setItem('relayops_whiparound_roster_snapshots',JSON.stringify(state.whiparoundRosterSnapshots||{}));
localStorage.setItem('relayops_whiparound_not_on_route',JSON.stringify(state.whiparoundNotOnRoute||{}));
localStorage.setItem('relayops_whiparound_compliance_history',JSON.stringify(state.whiparoundComplianceHistory||{}));
localStorage.setItem('relayops_whiparound_import_name',state.whiparoundImportName||'');
localStorage.setItem('relayops_whiparound_selected_date',state.whiparoundSelectedDate||'');
localStorage.setItem('relayops_whiparound_reminder_templates',JSON.stringify(state.whiparoundReminderTemplates||{}));
localStorage.setItem('relayops_inventory_items',JSON.stringify(state.inventoryItems||[]));
localStorage.setItem('relayops_inventory_log',JSON.stringify(state.inventoryLog||[]));
localStorage.setItem('relayops_inventory_filter',state.inventoryFilter||'all');
localStorage.setItem('relayops_parking_charger_status',JSON.stringify(state.parkingChargerStatus||{}));
localStorage.setItem('relayops_parking_notes',state.parkingNotes||'');
localStorage.setItem('relayops_charging_station_checked',state.chargingStationChecked||'');
localStorage.setItem('relayops_page',state.page);localStorage.setItem('relayops_role',state.role);localStorage.setItem('relayops_phase',state.phase);localStorage.setItem('relayops_routes',JSON.stringify(state.routes));localStorage.setItem('relayops_morning',JSON.stringify(state.morningRoutes));localStorage.setItem('relayops_dsp',state.dspCode);localStorage.setItem('relayops_excluded',state.lastImportExcluded);localStorage.setItem('relayops_published',state.rosterPublished);localStorage.setItem('relayops_rating',state.rating);localStorage.setItem('relayops_fit_rows',state.fitMorningRows);localStorage.setItem('relayops_fleet_sort',state.fleetSort);localStorage.setItem('relayops_fleet_filter',state.fleetFilter);localStorage.setItem('relayops_fleet_view',state.fleetView);localStorage.setItem('relayops_fleet_search',state.fleetSearch);localStorage.setItem('relayops_expanded_fleet_vin',state.expandedFleetVin);localStorage.setItem('relayops_fleet_refresh',state.fleetLastRefresh);localStorage.setItem('relayops_fleet_import',JSON.stringify(state.fleetImport||null));localStorage.setItem('relayops_fleet_source_uploads',JSON.stringify(state.fleetSourceUploads||{}));localStorage.setItem('relayops_fleet_expected_count',state.fleetExpectedCount||0);localStorage.setItem('relayops_fleet_live_endpoint',state.fleetLiveEndpoint||'');localStorage.setItem('relayops_morning_sheets_endpoint',state.morningSheetsEndpoint||'');localStorage.setItem('relayops_morning_sheets_last_push',state.morningSheetsLastPush||'');localStorage.setItem('relayops_morning_sheets_last_error',state.morningSheetsLastError||'');localStorage.setItem('relayops_morning_sheets_last_receipt',JSON.stringify(state.morningSheetsLastReceipt||null));localStorage.setItem('relayops_morning_sheets_last_dry_run',state.morningSheetsLastDryRun||'');localStorage.setItem('relayops_fleet_amazon_url',state.fleetAmazonUrl||AMAZON_FLEET_PORTAL_URL);localStorage.setItem('relayops_fleet_fleetos_url',state.fleetFleetosUrl||FLEETOS_PORTAL_URL);localStorage.setItem('relayops_fleet_live_last_pull',state.fleetLiveLastPull||'');localStorage.setItem('relayops_fleet_live_last_error',state.fleetLiveLastError||'');localStorage.setItem('relayops_van_parking',JSON.stringify(state.vanParking||[]));localStorage.setItem('relayops_van_parking_updated',state.vanParkingUpdated||'');localStorage.setItem('relayops_van_parking_batteries',JSON.stringify(state.vanParkingBatteries||{}));localStorage.setItem('relayops_selected_parking_id',state.selectedParkingId||'');localStorage.setItem('relayops_parking_mode',state.parkingMode||'manual');localStorage.setItem('relayops_driver_contacts',JSON.stringify(state.driverContacts||[]));localStorage.setItem('relayops_driver_contacts_last_import',state.driverContactsLastImport||'');localStorage.setItem('relayops_removed_driver_keys',JSON.stringify(state.removedDriverKeys||[]));
localStorage.setItem('relayops_morning_operation_date',state.morningOperationDate||defaultOperationDate());
localStorage.setItem('relayops_last_itinerary_rts',JSON.stringify(state.lastItineraryRts||{}));
localStorage.setItem('relayops_fleet_name_overrides',JSON.stringify(state.fleetNameOverrides||{}));
localStorage.setItem('relayops_fleet_issues',JSON.stringify(state.fleetIssues||{}));
localStorage.setItem('relayops_morning_issue_acknowledgements',JSON.stringify(state.morningIssueAcknowledgements||{}));
window.RelayOpsCloud?.schedule?.('workspace.autosave');
}
function toast(message,type='success') { let stack=document.getElementById('toast-stack');if(!stack){stack=document.createElement('div');stack.id='toast-stack';stack.className='toast-stack';stack.setAttribute('role','status');stack.setAttribute('aria-live','polite');stack.setAttribute('aria-atomic','false');document.body.appendChild(stack);}const el=document.createElement('div');el.className=`toast ${type}`;el.innerHTML=`<span class="toast-icon">${type==='error'?'!':'✓'}</span><span>${esc(message)}</span>`;stack.appendChild(el);setTimeout(()=>el.remove(),3200); }

function sharedWorkspaceState() {
  return {
    schemaVersion:2,dspCode:state.dspCode,organizationName:state.organizationName,stationCode:state.stationCode,routes:state.routes,morningRoutes:state.morningRoutes,
    lastImportExcluded:state.lastImportExcluded,rosterPublished:state.rosterPublished,
    fleetImport:state.fleetImport,fleetSourceUploads:state.fleetSourceUploads,fleetExpectedCount:state.fleetExpectedCount,
    fleetNameOverrides:state.fleetNameOverrides,fleetIssues:state.fleetIssues,equipmentIssues:state.equipmentIssues,morningIssueAcknowledgements:state.morningIssueAcknowledgements,vanParking:state.vanParking,vanParkingUpdated:state.vanParkingUpdated,chargingStationChecked:state.chargingStationChecked,
    vanParkingBatteries:state.vanParkingBatteries,parkingChargerStatus:state.parkingChargerStatus,parkingNotes:state.parkingNotes,equipmentImport:state.equipmentImport,deviceCustomRows:state.deviceCustomRows,
    driverContacts:state.driverContacts,driverContactsLastImport:state.driverContactsLastImport,removedDriverKeys:state.removedDriverKeys,driverNameAliases:state.driverNameAliases,driverProfiles:normalizeDriverProfiles(state.driverProfiles||{}),
    messageQueueTemplate:state.messageQueueTemplate,messageQueueStatus:state.messageQueueStatus,coachingQueue:normalizeCoachingQueue(state.coachingQueue),coachingTemplate:state.coachingTemplate,
    scheduleEntries:state.scheduleEntries,scheduleImportName:state.scheduleImportName,rosteringDate:state.rosteringDate,rosteringPlans:state.rosteringPlans,rosteringHelperPool:state.rosteringHelperPool,rosteringTrainingMatches:state.rosteringTrainingMatches,rosteringManualTraining:state.rosteringManualTraining,callOffDriverKeys:state.callOffDriverKeys,scheduleDriverMarks:state.scheduleDriverMarks,scheduleBackupRecords:state.scheduleBackupRecords,scheduleStayHome:state.scheduleStayHome,scheduleStayHomeHistory:state.scheduleStayHomeHistory,scheduleReductions:state.scheduleReductions,scheduleHelpers:state.scheduleHelpers,callOffReasons:state.callOffReasons,morningWaveTimeOverrides:state.morningWaveTimeOverrides,fitMorningRows:state.fitMorningRows,fitOpeningPicklistRows:state.fitOpeningPicklistRows,openingPicklistTopics:state.openingPicklistTopics,openingPicklistNotes:state.openingPicklistNotes,openingPicklistCalloffRows:state.openingPicklistCalloffRows,openingPicklistTopicRows:state.openingPicklistTopicRows,openingPicklistBackupRows:state.openingPicklistBackupRows,openingPicklistWaveSlots:state.openingPicklistWaveSlots,openingPicklistShowAdhoc:state.openingPicklistShowAdhoc,openingPicklistCalloffDrafts:state.openingPicklistCalloffDrafts,openingPicklistBackupOverrides:state.openingPicklistBackupOverrides,openingPicklistLabels:state.openingPicklistLabels,sheetHistory:state.sheetHistory,
    whiparoundInspections:state.whiparoundInspections,whiparoundRosterSnapshots:state.whiparoundRosterSnapshots,whiparoundNotOnRoute:state.whiparoundNotOnRoute,whiparoundComplianceHistory:state.whiparoundComplianceHistory,whiparoundImportName:state.whiparoundImportName,whiparoundSelectedDate:state.whiparoundSelectedDate,whiparoundReminderTemplates:state.whiparoundReminderTemplates,
    inventoryItems:state.inventoryItems,inventoryLog:state.inventoryLog,
    morningSheetsEndpoint:state.morningSheetsEndpoint,slackReportRoomUrl:state.slackReportRoomUrl,chargerReports:normalizeChargerReports(state.chargerReports||[])
  };
}
function persistentWorkspaceState() {
  return {
    schemaVersion:2,organizationName:state.organizationName,stationCode:state.stationCode,dspCode:state.dspCode,
    fleetImport:state.fleetImport,fleetSourceUploads:state.fleetSourceUploads,fleetExpectedCount:state.fleetExpectedCount,
    fleetNameOverrides:state.fleetNameOverrides,fleetIssues:state.fleetIssues,equipmentIssues:state.equipmentIssues,
    vanParking:state.vanParking,vanParkingUpdated:state.vanParkingUpdated,chargingStationChecked:state.chargingStationChecked,
    vanParkingBatteries:state.vanParkingBatteries,parkingChargerStatus:state.parkingChargerStatus,parkingNotes:state.parkingNotes,
    equipmentImport:state.equipmentImport,deviceCustomRows:state.deviceCustomRows,
    driverContacts:state.driverContacts,driverContactsLastImport:state.driverContactsLastImport,removedDriverKeys:state.removedDriverKeys,driverNameAliases:state.driverNameAliases,driverProfiles:normalizeDriverProfiles(state.driverProfiles||{}),scheduleStayHomeHistory:state.scheduleStayHomeHistory,rosteringDate:state.rosteringDate,rosteringPlans:state.rosteringPlans,rosteringHelperPool:state.rosteringHelperPool,rosteringTrainingMatches:state.rosteringTrainingMatches,rosteringManualTraining:state.rosteringManualTraining,morningWaveTimeOverrides:state.morningWaveTimeOverrides,
    whiparoundInspections:state.whiparoundInspections,whiparoundRosterSnapshots:state.whiparoundRosterSnapshots,whiparoundNotOnRoute:state.whiparoundNotOnRoute,whiparoundComplianceHistory:state.whiparoundComplianceHistory,whiparoundImportName:state.whiparoundImportName,whiparoundSelectedDate:state.whiparoundSelectedDate,whiparoundReminderTemplates:state.whiparoundReminderTemplates,
    inventoryItems:state.inventoryItems,inventoryLog:state.inventoryLog,coachingTemplate:state.coachingTemplate,
    morningSheetsEndpoint:state.morningSheetsEndpoint,slackReportRoomUrl:state.slackReportRoomUrl,chargerReports:normalizeChargerReports(state.chargerReports||[])
  };
}
function applySharedWorkspaceState(payload={}) {
  const allowed=['dspCode','organizationName','stationCode','routes','morningRoutes','lastImportExcluded','rosterPublished','fleetImport','fleetSourceUploads','fleetExpectedCount','fleetNameOverrides','fleetIssues','equipmentIssues','morningIssueAcknowledgements','vanParking','vanParkingUpdated','chargingStationChecked','vanParkingBatteries','parkingChargerStatus','parkingNotes','equipmentImport','deviceCustomRows','driverContacts','driverContactsLastImport','removedDriverKeys','driverNameAliases','driverProfiles','messageQueueTemplate','messageQueueStatus','coachingQueue','coachingTemplate','scheduleEntries','scheduleImportName','rosteringDate','rosteringPlans','rosteringHelperPool','rosteringTrainingMatches','rosteringManualTraining','callOffDriverKeys','scheduleDriverMarks','scheduleBackupRecords','scheduleStayHome','scheduleStayHomeHistory','scheduleReductions','scheduleHelpers','callOffReasons','morningWaveTimeOverrides','fitMorningRows','fitOpeningPicklistRows','openingPicklistTopics','openingPicklistNotes','openingPicklistCalloffRows','openingPicklistTopicRows','openingPicklistBackupRows','openingPicklistWaveSlots','openingPicklistShowAdhoc','openingPicklistCalloffDrafts','openingPicklistBackupOverrides','openingPicklistLabels','sheetHistory','whiparoundInspections','whiparoundRosterSnapshots','whiparoundNotOnRoute','whiparoundComplianceHistory','whiparoundImportName','whiparoundSelectedDate','whiparoundReminderTemplates','inventoryItems','inventoryLog','morningSheetsEndpoint','slackReportRoomUrl','chargerReports'];
  allowed.forEach(key=>{if(Object.prototype.hasOwnProperty.call(payload,key))state[key]=payload[key];});
  state.fleetIssues=normalizeFleetIssuesStore(state.fleetIssues||{});
  state.equipmentIssues=normalizeEquipmentIssuesStore(state.equipmentIssues||{});
  state.sheetHistory=state.sheetHistory&&Array.isArray(state.sheetHistory.past)&&Array.isArray(state.sheetHistory.future)?state.sheetHistory:{past:[],future:[]};
  state.driverNameAliases=state.driverNameAliases&&typeof state.driverNameAliases==='object'?state.driverNameAliases:{};
  state.driverProfiles=normalizeDriverProfiles(state.driverProfiles||{});(state.driverContacts||[]).forEach(contact=>ensureDriverProfile(contact));
  state.rosteringTrainingMatches=state.rosteringTrainingMatches&&typeof state.rosteringTrainingMatches==='object'?state.rosteringTrainingMatches:{};
  state.rosteringManualTraining=state.rosteringManualTraining&&typeof state.rosteringManualTraining==='object'?state.rosteringManualTraining:{};
  state.slackReportRoomUrl=String(state.slackReportRoomUrl||'https://app.slack.com/client');
  state.chargerReports=normalizeChargerReports(state.chargerReports||[]);
  state.coachingQueue=normalizeCoachingQueue(state.coachingQueue);state.coachingTemplate=String(state.coachingTemplate||DEFAULT_COACHING_TEMPLATE);
  state.morningIssueAcknowledgements=state.morningIssueAcknowledgements||{};
  state.scheduleStayHomeHistory=state.scheduleStayHomeHistory&&typeof state.scheduleStayHomeHistory==='object'?state.scheduleStayHomeHistory:{};
  state.rosteringDate=String(state.rosteringDate||defaultOperationDate());state.rosteringPlans=state.rosteringPlans&&typeof state.rosteringPlans==='object'?state.rosteringPlans:{};
  state.rosteringHelperPool=state.rosteringHelperPool&&typeof state.rosteringHelperPool==='object'?state.rosteringHelperPool:{};
  state.scheduleBackupRecords=state.scheduleBackupRecords&&typeof state.scheduleBackupRecords==='object'?state.scheduleBackupRecords:{};
  state.callOffReasons=state.callOffReasons||{};
  state.morningWaveTimeOverrides=state.morningWaveTimeOverrides&&typeof state.morningWaveTimeOverrides==='object'?state.morningWaveTimeOverrides:{};
  state.openingPicklistTopics=Array.isArray(state.openingPicklistTopics)?state.openingPicklistTopics:['','','',''];
  state.openingPicklistNotes=String(state.openingPicklistNotes||'');
  state.openingPicklistCalloffRows=Math.max(1,Number(state.openingPicklistCalloffRows)||6);
  state.openingPicklistTopicRows=Math.max(1,Number(state.openingPicklistTopicRows)||4);
  state.openingPicklistBackupRows=Math.max(1,Number(state.openingPicklistBackupRows)||21);
  state.openingPicklistWaveSlots=Math.max(0,Math.min(5,Number(state.openingPicklistWaveSlots??5)));
  state.openingPicklistShowAdhoc=state.openingPicklistShowAdhoc!==false;
  state.scheduleHelpers=state.scheduleHelpers&&typeof state.scheduleHelpers==='object'?state.scheduleHelpers:{};
  state.openingPicklistCalloffDrafts=Array.isArray(state.openingPicklistCalloffDrafts)?state.openingPicklistCalloffDrafts:[];
  state.openingPicklistBackupOverrides=state.openingPicklistBackupOverrides&&typeof state.openingPicklistBackupOverrides==='object'?state.openingPicklistBackupOverrides:{};
  state.openingPicklistLabels=state.openingPicklistLabels&&typeof state.openingPicklistLabels==='object'?state.openingPicklistLabels:{};
  state.inventoryItems=normalizeInventoryItems(state.inventoryItems);state.inventoryLog=normalizeInventoryLog(state.inventoryLog);
  if(state.fleetImport?.vehicles?.length)applyFleetVehicles(state.fleetImport.vehicles,{silent:true});
  persist();
}
function applyPersistentWorkspaceState(payload={}) {
  const allowed=['organizationName','stationCode','dspCode','fleetImport','fleetSourceUploads','fleetExpectedCount','fleetNameOverrides','fleetIssues','equipmentIssues','vanParking','vanParkingUpdated','chargingStationChecked','vanParkingBatteries','parkingChargerStatus','parkingNotes','equipmentImport','deviceCustomRows','driverContacts','driverContactsLastImport','removedDriverKeys','driverNameAliases','driverProfiles','scheduleStayHomeHistory','rosteringDate','rosteringPlans','rosteringHelperPool','rosteringTrainingMatches','rosteringManualTraining','whiparoundInspections','whiparoundRosterSnapshots','whiparoundNotOnRoute','whiparoundComplianceHistory','whiparoundImportName','whiparoundSelectedDate','whiparoundReminderTemplates','inventoryItems','inventoryLog','coachingTemplate','morningSheetsEndpoint','slackReportRoomUrl','chargerReports'];
  allowed.forEach(key=>{if(Object.prototype.hasOwnProperty.call(payload,key))state[key]=payload[key];});
  state.fleetIssues=normalizeFleetIssuesStore(state.fleetIssues||{});
  state.equipmentIssues=normalizeEquipmentIssuesStore(state.equipmentIssues||{});
  state.driverNameAliases=state.driverNameAliases&&typeof state.driverNameAliases==='object'?state.driverNameAliases:{};
  state.driverProfiles=normalizeDriverProfiles(state.driverProfiles||{});(state.driverContacts||[]).forEach(contact=>ensureDriverProfile(contact));
  state.rosteringTrainingMatches=state.rosteringTrainingMatches&&typeof state.rosteringTrainingMatches==='object'?state.rosteringTrainingMatches:{};
  state.rosteringManualTraining=state.rosteringManualTraining&&typeof state.rosteringManualTraining==='object'?state.rosteringManualTraining:{};
  state.slackReportRoomUrl=String(state.slackReportRoomUrl||'https://app.slack.com/client');
  state.chargerReports=normalizeChargerReports(state.chargerReports||[]);
  state.coachingTemplate=String(state.coachingTemplate||DEFAULT_COACHING_TEMPLATE);
  state.scheduleStayHomeHistory=state.scheduleStayHomeHistory&&typeof state.scheduleStayHomeHistory==='object'?state.scheduleStayHomeHistory:{};
  state.rosteringDate=String(state.rosteringDate||defaultOperationDate());state.rosteringPlans=state.rosteringPlans&&typeof state.rosteringPlans==='object'?state.rosteringPlans:{};
  state.rosteringHelperPool=state.rosteringHelperPool&&typeof state.rosteringHelperPool==='object'?state.rosteringHelperPool:{};
  state.inventoryItems=normalizeInventoryItems(state.inventoryItems);state.inventoryLog=normalizeInventoryLog(state.inventoryLog);
  if(state.fleetImport?.vehicles?.length)applyFleetVehicles(state.fleetImport.vehicles,{silent:true});
  persist();
}
window.RelayOpsApp={sharedState:sharedWorkspaceState,persistentState:persistentWorkspaceState,applySharedState:applySharedWorkspaceState,applyPersistentState:applyPersistentWorkspaceState,operationDate:()=>state.morningOperationDate,morningSheetsPayload:()=>morningSheetsConnectorPayload()};
window.RelayOpsCloud?.on?.(event=>{
  if(event.type==='offline'){state.cloudStatus='offline';render();}
  if(event.type==='reconnecting'){state.cloudStatus='connecting';render();}
  if(event.type==='auth'){state.cloudStatus=event.session?'connecting':'signed-out';state.cloudUser=event.session?.user?.email||'';state.cloudAccessError='';if(!event.session){state.role='viewer';if(!state.cloudSigninPrompted){state.cloudSigninPrompted=true;state.modal='cloud-account';}}render();if(event.session)setTimeout(()=>refreshCloudMembers(),0);}
  if(event.type==='access-granted'){state.cloudAccessError='';}
  if(event.type==='access-denied'){state.cloudStatus='access-denied';state.cloudAccessError=`${event.email||'This email'} is signed in but has not been invited to this station.`;state.modal='cloud-account';render();}
  if(event.type==='workspace-empty'){state.cloudStatus='workspace-empty';state.cloudAccessError='The shared day has not been started by an owner yet.';render();toast('Shared workspace is not initialized for this day yet','error');}
  if(event.type==='presence'){state.cloudPresence=event.users||[];render();}
  if(event.type==='loaded'||event.type==='saved'){state.cloudStatus='synced';state.cloudAccessError='';render();}
  if(event.type==='remote-update'){state.cloudStatus='synced';render();toast('Another dispatcher updated today’s workspace');}
  if(event.type==='conflict')toast('A newer dispatcher update was loaded before saving','error');
  if(event.type==='error'){state.cloudStatus='error';render();toast(`Cloud sync error: ${event.error?.message||'retrying locally'}`,'error');}
  if(event.type==='magic-link-sent')toast(`Sign-in link sent to ${event.email}`);
});
render();
window.RelayOpsCloud?.init?.().catch(error=>console.error('RelayOps cloud initialization failed',error));
