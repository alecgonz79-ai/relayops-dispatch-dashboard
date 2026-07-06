const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  roster: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  van: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17V6a2 2 0 0 1 2-2h9v13H3Z"/><path d="M14 9h4l3 4v4h-7V9Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V9M10 19V5M16 19v-7M22 19V2"/></svg>',
  coach: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="m8 11 2 2 5-5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
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
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
};

const NAV = [
  { section: 'Command', items: [
    ['dashboard','Today','dashboard'], ['morning','Morning sheet','calendar'], ['roster','Opening roster','roster'], ['live','Live routes','live','3']
  ]},
  { section: 'Operations', items: [
    ['team','Drivers & team','users'], ['fleet','Fleet & devices','van'], ['checklists','Checklists','check'], ['inbox','Team inbox','inbox','4'], ['inventory','Inventory','box']
  ]},
  { section: 'Improve', items: [
    ['performance','Performance','chart'], ['coaching','Coaching','coach','6'], ['reports','Reports & export','report']
  ]},
  { section: 'Owner', admin: true, items: [['admin','Admin control','settings']] }
];

const routesSeed = [
  { route:'CX12', driver:'Maya Collins', id:'DA-1042', wave:'Wave 1 · 9:20', staging:'A-14', van:'EDV 224', device:'CAT-17', stops:186, packages:312, progress:74, delta:18, status:'Ahead', rescue:'—' },
  { route:'CX18', driver:'Jordan Lee', id:'DA-1028', wave:'Wave 1 · 9:20', staging:'A-08', van:'CDV 118', device:'CAT-08', stops:174, packages:296, progress:61, delta:-7, status:'Watch', rescue:'Review 2:30' },
  { route:'CX21', driver:'Andre Wilson', id:'DA-1061', wave:'Wave 1 · 9:20', staging:'A-03', van:'Prime 341', device:'CAT-22', stops:192, packages:338, progress:58, delta:-16, status:'At risk', rescue:'T. Price → 18' },
  { route:'CX27', driver:'Sofia Ramirez', id:'DA-1037', wave:'Wave 2 · 9:40', staging:'B-11', van:'EDV 209', device:'CAT-11', stops:165, packages:281, progress:69, delta:11, status:'Ahead', rescue:'—' },
  { route:'CX31', driver:'Ethan Brooks', id:'DA-1053', wave:'Wave 2 · 9:40', staging:'B-17', van:'CDV 104', device:'CAT-04', stops:181, packages:305, progress:64, delta:2, status:'On pace', rescue:'—' },
  { route:'CX36', driver:'Nina Patel', id:'DA-1019', wave:'Wave 2 · 9:40', staging:'B-06', van:'Prime 327', device:'CAT-19', stops:169, packages:287, progress:51, delta:-12, status:'At risk', rescue:'M. Chen → 15' },
  { route:'CX42', driver:'Marcus Chen', id:'DA-1070', wave:'Ad hoc · 10:05', staging:'C-02', van:'Rental 61', device:'CAT-26', stops:92, packages:154, progress:79, delta:24, status:'Ahead', rescue:'N. Patel → 15' },
  { route:'CX44', driver:'Taylor Price', id:'DA-1066', wave:'Ad hoc · 10:05', staging:'C-04', van:'Rental 48', device:'CAT-29', stops:88, packages:149, progress:82, delta:28, status:'Ahead', rescue:'A. Wilson → 18' }
];

const team = [
  ['Maya Collins','Lead DA','Fantastic Plus','96.8%','6 days'], ['Jordan Lee','Delivery Associate','Fantastic','94.1%','2 days'],
  ['Andre Wilson','Delivery Associate','Fair','88.4%','Today'], ['Sofia Ramirez','Lead DA','Fantastic Plus','97.3%','9 days'],
  ['Ethan Brooks','Delivery Associate','Great','92.7%','4 days'], ['Nina Patel','Delivery Associate','Great','91.2%','1 day'],
  ['Marcus Chen','Rescue / DA','Fantastic','95.4%','12 days'], ['Taylor Price','Rescue / DA','Fantastic','95.9%','7 days'],
  ['Kiara Owens','Delivery Associate','Great','91.8%','3 days']
];

const fleet = [
  ['EDV 224','Rivian EDV','Ready','Maya Collins','81%'], ['CDV 118','Ford Transit','Ready','Jordan Lee','Full'],
  ['Prime 341','Ram ProMaster','Ready','Andre Wilson','3/4'], ['EDV 209','Rivian EDV','Ready','Sofia Ramirez','76%'],
  ['CDV 104','Ford Transit','Ready','Ethan Brooks','Full'], ['Prime 327','Ram ProMaster','Watch','Nina Patel','1/2'],
  ['Rental 61','Budget Transit','Ready','Marcus Chen','Full'], ['Rental 48','Enterprise Transit','Ready','Taylor Price','3/4'],
  ['Prime 319','Ram ProMaster','Service','Unassigned','—']
];

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

let state = {
  page: localStorage.getItem('relayops_page') || 'dashboard',
  role: localStorage.getItem('relayops_role') || 'admin',
  phase: Number(localStorage.getItem('relayops_phase') || 2),
  routes: JSON.parse(localStorage.getItem('relayops_routes') || 'null') || routesSeed,
  morningRoutes: JSON.parse(localStorage.getItem('relayops_morning') || 'null') || morningSeed,
  dspCode: localStorage.getItem('relayops_dsp') || 'LLOL',
  lastImportExcluded: Number(localStorage.getItem('relayops_excluded') || 0),
  morningFilters: {wave:'all',staging:'all',pad:'all'},
  fleetSort: localStorage.getItem('relayops_fleet_sort') || 'normal',
  fleetFilter: localStorage.getItem('relayops_fleet_filter') || 'all',
  fleetSearch: localStorage.getItem('relayops_fleet_search') || '',
  expandedFleetVin: localStorage.getItem('relayops_expanded_fleet_vin') || '',
  fleetLastRefresh: localStorage.getItem('relayops_fleet_refresh') || 'Not refreshed yet',
  fleetImport: JSON.parse(localStorage.getItem('relayops_fleet_import') || 'null'),
  fleetSourceUploads: JSON.parse(localStorage.getItem('relayops_fleet_source_uploads') || 'null') || {},
  fleetExpectedCount: Number(localStorage.getItem('relayops_fleet_expected_count') || 0),
  fleetChangedVins: {},
  fleetUpdateSummary: null,
  fitMorningRows: localStorage.getItem('relayops_fit_rows') === 'true',
  importSource: 'computer',
  importPurpose: 'morning',
  rosterPublished: localStorage.getItem('relayops_published') === 'true',
  search: '',
  modal: null,
  importedFile: null,
  editMode: false,
  screenshotPreview: null,
  sheetCopyText: '',
  equipmentText: '',
  fleetPasteText: '',
  equipmentImport: null,
  rating: Number(localStorage.getItem('relayops_rating') || 0)
};

if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
if(state.fleetImport?.vehicles?.length) applyFleetVehicles(state.fleetImport.vehicles,{silent:true});

const app = document.getElementById('app');
const fileInput = document.getElementById('file-input');
const gasVehicleIds = ['F33','F34','R35','R36','R54','R55','R62'];
const sheetEditFields = ['driver','route','staging','padOverride','ev','deviceName','portable','stops','packages','packageReturns','endTime','rtsTime','plannedRts','clockOutTime'];
let sheetSelection = { anchor: null, focus: null };

function initials(name='') { return name.split(/\s+/).map(p => p[0]).join('').slice(0,2).toUpperCase(); }
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

function sidebar() {
  return `<aside class="sidebar" id="sidebar">
    <div class="brand"><div class="brand-mark"></div><div class="brand-copy"><div class="brand-name">RelayOps</div><div class="brand-sub">Dispatch command</div></div></div>
    <div class="station-pill"><div class="station-icon">DAX</div><div class="station-copy"><strong>Northstar Delivery</strong><span>DAX5 · Los Angeles</span></div>${ICONS.chevron}</div>
    <nav>${NAV.filter(g => !g.admin || state.role === 'admin').map(group => `<div class="side-section"><div class="side-label">${group.section}</div>${group.items.map(([id,label,icon,count]) => `<button class="nav-item ${state.page===id?'active':''}" data-page="${id}" aria-label="${label}">${ICONS[icon]}<span>${label}</span>${count?`<b class="nav-count">${count}</b>`:''}</button>`).join('')}</div>`).join('')}</nav>
    <div class="side-bottom"><div class="user-card"><div class="avatar">AG</div><div class="user-copy"><strong>Alex Gonzalez</strong><span>${state.role==='admin'?'Owner · Full access':'Opening dispatcher'}</span></div><div class="role-tag">${state.role==='admin'?'ADMIN':'OPS'}</div></div></div>
  </aside>`;
}

const pageInfo = {
  dashboard:['Today’s command','A clear view from load-out through RTS'], morning:['Morning operations sheet','DSP-only routes, grouped by earliest wave, staging, and pad'], roster:['Opening roster','Resolve exceptions, assign equipment, then publish'],
  live:['Live routes','Spot pressure early and document every rescue'], team:['Drivers & team','Availability, compliance, recognition, and history'],
  fleet:['Fleet & devices','Readiness, maintenance, damage, and assignments'], performance:['Performance','Scorecard trends and driver-level focus areas'],
  coaching:['Coaching','Turn scorecard signals into consistent follow-through'], checklists:['Checklists','Repeatable opening, load-out, and closeout routines'],
  inbox:['Team inbox','Calls, messages, and announcements in one place'], inventory:['Inventory','Devices, uniforms, supplies, and assignments'],
  reports:['Reports & export','Google Sheets-ready operational data'], admin:['Admin control','People, permissions, connections, and audit history']
};

function topbar() {
  const [title,sub] = pageInfo[state.page] || pageInfo.dashboard;
  return `<header class="topbar">
    <div style="display:flex;align-items:center;gap:10px"><button class="icon-button mobile-menu" data-action="menu" aria-label="Open menu">${ICONS.menu}</button><div class="page-heading"><h1>${title}</h1><p>${sub}</p></div></div>
    <div class="top-actions"><label class="search">${ICONS.search}<input id="global-search" placeholder="Search driver, route, van…" value="${esc(state.search)}" /></label><button class="icon-button" aria-label="Notifications">${ICONS.bell}<i class="notification-dot"></i></button><button class="btn primary" data-action="import">${ICONS.upload}<span class="hide-mobile">Upload Excel / CSV</span></button></div>
  </header>`;
}

function contextBar(extra='') {
  return `<div class="context-bar"><div class="date-nav"><div class="date-chip">${ICONS.calendar}${fmtDate()}</div>${extra}</div><div class="sync-state"><i class="live-dot"></i> Demo data · last refreshed 6 min ago</div></div>`;
}

function kpiCard(label,value,meta,icon,tint='#eef2ed') { return `<article class="card kpi" style="--tint:${tint}"><div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon">${ICONS[icon]}</span></div><div class="kpi-value">${value}</div><div class="kpi-meta">${meta}</div></article>`; }

function phaseStrip() {
  const phases = [['Roster','Resolve exceptions'],['Load-out','Stage & launch'],['On road','Monitor & rescue'],['Closeout','RTS & verify']];
  return `<div class="phase-strip">${phases.map((p,i)=>`<button class="phase ${state.phase===i?'active':''}" data-phase="${i}"><span class="phase-number">${i<state.phase?'✓':i+1}</span><span><strong>${p[0]}</strong><span>${p[1]}</span></span></button>`).join('')}</div>`;
}

function dashboard() {
  const atRisk = state.routes.filter(r=>r.status==='At risk').length;
  return `${contextBar(`<button class="btn small ghost" data-action="phase-next">Advance shift phase ${ICONS.chevron}</button>`)}${phaseStrip()}
  <section class="grid kpi-grid">
    ${kpiCard('Routes launched',`${state.routes.length}<span style="font-size:13px;color:#7b877f"> / ${state.routes.length}</span>`,'<span class="trend-up">100% covered</span> · 2 rescues','roster','#e9f7df')}
    ${kpiCard('Drivers on duty','12','8 routes · 2 rescue · 2 support','users','#e5efff')}
    ${kpiCard('Fleet ready','24<span style="font-size:13px;color:#7b877f"> / 26</span>','<span class="trend-warn">2 need attention</span>','van','#fff2cf')}
    ${kpiCard('Routes at risk',atRisk,'2 rescue plans documented','live','#ffe7e2')}
  </section>
  <section class="grid dashboard-grid">
    <div class="grid">
      <article class="card"><div class="card-head"><div class="card-title"><h2>Opening readiness</h2><p>Every critical handoff before the first wave</p></div><button class="btn small" data-page="checklists">Open checklist</button></div><div class="readiness"><div class="readiness-top"><div class="readiness-ring"><div><strong>93%</strong><span>READY</span></div></div><div class="readiness-steps"><div class="step"><div class="step-status">✓</div><strong>Roster matched</strong><span>${state.routes.length}/${state.routes.length} routes staffed</span></div><div class="step"><div class="step-status">✓</div><strong>Equipment assigned</strong><span>Vans + devices confirmed</span></div><div class="step warn"><div class="step-status">!</div><strong>Fleet exceptions</strong><span>2 notes need review</span></div></div></div></div></article>
      ${routesTable(state.routes.slice(0,5),'Route health','Live operational position from Cortex inputs')}
    </div>
    <div class="grid">
      <article class="card"><div class="card-head"><div class="card-title"><h2>Needs your attention</h2><p>Ordered by operational impact</p></div><span class="status risk">3 open</span></div><div class="alert-stack">
        ${alertRow('red','Andre is 16 stops behind','Rescue handoff scheduled with Taylor','Now')}
        ${alertRow('','Prime 327 DVIC follow-up','Tire pressure note from Nina','8m')}
        ${alertRow('','CAT-31 not returned','Last assigned to Kiara Owens','1d')}
      </div></article>
      <article class="card"><div class="card-head"><div class="card-title"><h2>Scorecard pulse</h2><p>Week 26 · team aggregate</p></div><span class="status">Fantastic</span></div><div class="page-summary"><div class="summary-line"><span>Delivery quality</span><strong>99.4%</strong></div><div class="summary-line"><span>Safety compliance</span><strong>98.1%</strong></div><div class="summary-line"><span>Customer delivery feedback</span><strong>95.7%</strong></div><div class="divider"></div><div class="callout"><strong>Three coaching opportunities</strong><p>Focus this week: DNR, following distance, and contact compliance.</p><button class="btn small lime" data-page="coaching">Review coaching</button></div></div></article>
    </div>
  </section>`;
}

function alertRow(color,title,sub,time) { return `<div class="alert-row"><div class="alert-icon ${color}">${ICONS.alert}</div><div class="alert-copy"><strong>${title}</strong><span>${sub}</span></div><span class="alert-time">${time}</span></div>`; }

function routesTable(rows,title='Today’s route board',sub='Driver, route, equipment, and live position') {
  return `<article class="card table-card"><div class="card-head"><div class="card-title"><h2>${title}</h2><p>${sub}</p></div><div class="head-actions"><button class="btn small" data-action="copy">${ICONS.copy} Copy</button><button class="btn small" data-action="export-menu">${ICONS.download} Export</button></div></div><div class="table-wrap"><table><thead><tr><th>Route / Driver</th><th>Wave</th><th>Van + device</th><th>Stops</th><th>Progress</th><th>Route health</th><th>Rescue plan</th><th></th></tr></thead><tbody>${rows.map(r=>`<tr><td><div class="driver-cell"><div class="driver-avatar ${r.status==='At risk'?'gold':''}">${initials(r.driver)}</div><div class="driver-copy"><strong>${esc(r.driver)}</strong><span class="route-code">${esc(r.route)} · ${esc(r.id)}</span></div></div></td><td>${esc(r.wave)}<br><span style="color:#849087;font-size:8px">Stage ${esc(r.staging)}</span></td><td>${esc(r.van)}<br><span style="color:#849087;font-size:8px">${esc(r.device)}</span></td><td><strong>${r.stops}</strong><br><span style="color:#849087;font-size:8px">${r.packages} pkg</span></td><td><div class="progress-cell"><div class="progress-track"><div class="progress-fill ${r.status==='At risk'?'risk':r.status==='Watch'?'warn':''}" style="width:${r.progress}%"></div></div><strong>${r.progress}%</strong></div><span class="${r.delta<0?'metric-down':'metric-up'}">${r.delta>0?'+':''}${r.delta} stops</span></td><td><span class="status ${statusClass(r.status)}">${esc(r.status)}</span></td><td>${esc(r.rescue)}</td><td><button class="mini-icon-btn" data-action="route" data-route="${esc(r.route)}" aria-label="Route actions">${ICONS.more}</button></td></tr>`).join('')}</tbody></table></div></article>`;
}

function rosterPage() {
  const rows = routeFiltered();
  return `${contextBar(`<span class="status ${state.rosterPublished?'':'warn'}">${state.rosterPublished?'Published to team':'Draft · not sent'}</span>`)}${phaseStrip()}
  <div class="toolbar"><div class="toolbar-left"><select class="filter-select"><option>All waves</option><option>Wave 1</option><option>Wave 2</option><option>Ad hoc</option></select><select class="filter-select"><option>All readiness</option><option>Ready</option><option>Needs assignment</option></select><button class="btn" data-action="auto-assign">${ICONS.link} Auto-fill equipment</button></div><div class="toolbar-right"><button class="btn" data-action="add-route">${ICONS.plus} Add route</button><button class="btn lime" data-action="publish">${state.rosterPublished?'Republish updates':'Publish roster'}</button></div></div>
  ${routesTable(rows,'Opening roster','Amazon roster → verified dispatch plan')}
  <div class="card" style="margin-top:16px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap"><div><strong style="font-size:11px">Opening handoff</strong><div style="font-size:8px;color:var(--muted);margin-top:4px">Roster imported 8:04 AM · equipment filled 8:17 AM · last edit by Alex</div></div><div style="display:flex;gap:8px"><span class="status">${state.routes.length} staffed</span><span class="status">${state.routes.length} vans</span><span class="status">${state.routes.length} devices</span></div></div>`;
}

function waveMinutes(value='') {
  const m=String(value).trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i); if(!m)return 9999;
  let h=Number(m[1])%12; if((m[3]||'').toUpperCase()==='PM')h+=12; return h*60+Number(m[2]);
}
function routeCompare(a='',b='') { return String(a).localeCompare(String(b),undefined,{numeric:true,sensitivity:'base'}); }
function stagingArea(value='') { const m=String(value).toUpperCase().match(/^STG\.([A-Z]+)/); return m?`STG.${m[1]}`:'Other'; }
function morningWaveList() { return [...new Set(state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>r.wave))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)); }
function padForWave(wave) { const pads=['A','B','C','A','B','C']; const i=morningWaveList().indexOf(wave); return pads[Math.max(0,i)%pads.length]; }
function filteredMorningRows() {
  return state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>({...r,pad:r.padOverride||padForWave(r.wave)})).filter(r=>
    (state.morningFilters.wave==='all'||r.wave===state.morningFilters.wave)&&
    (state.morningFilters.staging==='all'||r.staging===state.morningFilters.staging)&&
    (state.morningFilters.pad==='all'||r.pad===state.morningFilters.pad)
  ).sort((a,b)=>waveMinutes(a.wave)-waveMinutes(b.wave)||routeCompare(a.route,b.route)||a.staging.localeCompare(b.staging,undefined,{numeric:true}));
}

function morningSheetPage() {
  const rows=filteredMorningRows(), waves=morningWaveList(), staging=[...new Set(state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>r.staging))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  const excluded=state.lastImportExcluded;
  const groups=morningSections(rows);
  const irregular=rows.filter(r=>r.plannedRtsIssue).length;
  const copyRowsCount=groups.reduce((n,g)=>n+morningDisplayRows(g).length+(g.wave?1:0),1);
  return `${contextBar(`<span class="status blue">Earliest waves first</span>`)}
  <div class="morning-command card"><div><span class="eyebrow">LLOL OPENING OPERATIONS</span><h2>Morning operations sheet</h2><p>Upload DAYOFOPSPLAN plus ROUTE_DJT6. RelayOps keeps only ${state.dspCode}, matches CX routes, uses the first driver name only, and keeps waves earliest first.</p></div><div class="morning-actions"><button class="btn" data-action="slack-import">${ICONS.inbox} Slack Import <span class="demo-tag">DEMO</span></button><button class="btn primary easy-upload-button" data-action="import">${ICONS.upload} Cortex Import</button><button class="btn lime" data-action="planned-rts-import">${ICONS.calendar} Planned RTS Upload</button><button class="btn" data-action="equipment-import">${ICONS.van} VAN/DEV/PORT Import</button></div></div>
  <div class="quick-start" aria-label="Three easy steps"><div class="quick-step done"><b>1</b><span><strong>Pick import</strong><small>Slack or Cortex</small></span></div><div class="quick-arrow">→</div><div class="quick-step"><b>2</b><span><strong>We match CX</strong><small>Wave + staging + pad</small></span></div><div class="quick-arrow">→</div><div class="quick-step"><b>3</b><span><strong>Edit/copy</strong><small>White cells + Google Sheets paste</small></span></div></div>
  <div class="sheet-toolbar"><div class="sheet-filter"><label>DSP</label><select data-morning-filter="dsp"><option>${state.dspCode}</option></select></div><div class="sheet-filter"><label>Wave</label><select data-morning-filter="wave"><option value="all">All waves</option>${waves.map(v=>`<option ${state.morningFilters.wave===v?'selected':''}>${v}</option>`).join('')}</select></div><div class="sheet-filter"><label>Staging location</label><select data-morning-filter="staging"><option value="all">All staging</option>${staging.map(v=>`<option ${state.morningFilters.staging===v?'selected':''}>${v}</option>`).join('')}</select></div><div class="sheet-filter"><label>Pad</label><select data-morning-filter="pad"><option value="all">All pads</option>${['A','B','C'].map(v=>`<option ${state.morningFilters.pad===v?'selected':''}>${v}</option>`).join('')}</select></div><button class="btn small" data-action="clear-morning-filters">Clear filters</button><span class="filter-note">Sorted ${ICONS.chevron} earliest launch first</span><button class="btn small ${state.editMode?'lime':''}" data-action="toggle-morning-edit">${state.editMode?'✓ Done editing':'✎ Edit mode'}</button><button class="btn small ${state.fitMorningRows?'lime':''}" data-action="toggle-fit-rows">${state.fitMorningRows?'✓ Fit to drivers':'Remove blank rows'}</button><button class="btn small" data-action="assign-ev-low">EV 1-57 Low → High</button><button class="btn small" data-action="assign-ev-random">Randomize EVs</button><button class="btn small" data-action="assign-gas-vans">Assign Gas Vehicles</button><button class="btn small" data-action="copy-morning-visible">${ICONS.copy} Copy for Sheets</button><button class="btn small" data-action="preview-wave-screenshot">${ICONS.download} Preview JPEG</button><button class="btn small" data-action="export-morning">${ICONS.download} Export sheet</button></div>
  <div class="sheet-kpis"><span><strong>${rows.length}</strong> routes</span><span><strong>${rows.reduce((n,r)=>n+r.packages,0).toLocaleString()}</strong> packages</span><span><strong>${rows.reduce((n,r)=>n+r.stops,0).toLocaleString()}</strong> stops</span><span><strong>${irregular}</strong> RTS flags</span></div>
  <div class="sheets-helper card"><div class="sheets-helper-copy"><span class="eyebrow">GOOGLE SHEETS HANDOFF</span><h3>One-click paste into your template</h3><p>Click copy, open Google Sheets, click cell A1, then paste. No dragging or perfect highlighting needed.</p></div><div class="sheets-helper-steps"><span>1 Copy ${copyRowsCount} rows</span><span>2 Open Google Sheets</span><span>3 Paste in A1</span></div><div class="sheets-helper-actions"><button class="btn primary" data-action="copy-morning-visible">${ICONS.copy} Copy Google Sheets table</button><button class="btn" data-action="open-sheets-helper">Open paste box</button></div></div>
  ${state.editMode?`<div class="edit-help">Editing is on. Click a white cell, type, press Enter to move down, or use arrow keys like Google Sheets. Paste tabbed rows from Sheets and RelayOps will fill across/down.</div>`:''}
  <article class="card morning-board"><div class="sheet-scroll"><table class="ops-sheet exact-ops-sheet"><thead><tr><th>WAVE</th><th>DRIVER</th><th>ROUTE</th><th>STAGING</th><th>PAD</th><th>EV</th><th>DEVICE</th><th>PORTABLE</th><th>PRE DVIC</th><th>PRE-WHIP</th><th>POST DVIC</th><th>POST-WHIP</th><th>RESCUED</th><th>STOP COUNT</th><th>PACKAGE COUNT</th><th>PACKAGE RETURNS</th><th>END TIME</th><th>RTS TIME</th><th>PLANNED RTS</th><th>CLOCK OUT TIME</th></tr></thead><tbody>${groups.length?groups.map((section)=>morningWaveGroup(section)).join(''):`<tr><td colspan="20"><div class="empty-state"><h3>No routes match these filters</h3><p>Clear a filter or upload a new day-of-operations file.</p></div></td></tr>`}</tbody></table></div></article>
  <div class="dispatcher-rating card"><div><strong>How easy was this opening sheet?</strong><span>Your 5-star tap helps find what needs to be smoother next.</span></div><div class="stars">${[1,2,3,4,5].map(n=>`<button class="${state.rating>=n?'active':''}" data-action="rate-service" data-rating="${n}" aria-label="${n} stars">★</button>`).join('')}</div></div>`;
}

function morningSections(rows) {
  const waveGroups=[...new Set(rows.map(r=>r.wave))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)).map(w=>({label:'',wave:w,rows:rows.filter(r=>r.wave===w)}));
  const sections=waveGroups.slice(0,5).map((g,i)=>({...g,label:`WAVE ${i+1}`,minRows:14}));
  const used=new Set(sections.flatMap(s=>s.rows.map(r=>r.route)));
  const adHoc=rows.filter(r=>!used.has(r.route)&&/ad\s*hoc|adhoc|nursery|extra/i.test(`${r.wave} ${r.service}`));
  const helpers=rows.filter(r=>/helper/i.test(r.service||'')&&!used.has(r.route)&&!adHoc.some(x=>x.route===r.route));
  sections.push({label:"ADHOC's",wave:'',rows:adHoc,minRows:14});
  sections.push({label:'HELPERS',wave:'',rows:helpers,minRows:16});
  sections.push({label:'DSP',wave:'',rows:[],minRows:5,dsp:true});
  if(state.fitMorningRows) return sections.filter(s=>s.rows.length||s.dsp);
  return sections.filter(s=>s.rows.length||s.label.startsWith('WAVE')||s.dsp||state.morningFilters.wave==='all');
}

function blankMorningRow(section,index) {
  return {dsp:state.dspCode,driver:'',route:`__blank_${section.label}_${index}`,service:'',wave:section.wave,staging:'',pad:section.rows[0]?.pad||'',padOverride:section.rows[0]?.padOverride||'',ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,stops:'',packages:'',packageReturns:'',endTime:'',rtsTime:'',plannedRts:'',clockOutTime:'',_blank:true};
}

function morningDisplayRows(section) {
  const rows=[...section.rows];
  const target=state.fitMorningRows?Math.max(rows.length,section.dsp?1:0):section.minRows;
  while(rows.length<target) rows.push(blankMorningRow(section,rows.length));
  return rows;
}

function createManualMorningRoute(seed={}) {
  const route={dsp:state.dspCode,driver:'',route:seed.route||`MANUAL-${Date.now().toString().slice(-6)}`,service:'Manual opening edit',wave:seed.wave||'Manual',staging:'',duration:0,zones:0,packages:0,commercial:0,stops:0,eta:'',bags:0,overflow:0,parking:'',ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,packageReturns:'',endTime:'',rtsTime:'',plannedRts:'',clockOutTime:'',checkedIn:false,vanReady:false,deviceReady:false,portableReady:false,loadReady:false};
  state.morningRoutes.push(route);
  return route;
}

function morningWaveGroup(section) {
  const rows=morningDisplayRows(section);
  const edit=state.editMode;
  const blankEditable=(r,field,value,cls='')=>`<td class="sheet-edit-cell ${cls} ${r.plannedRtsIssue&&field==='plannedRts'?'flag-cell':''} ${edit?'editable-cell':''}" ${edit?`contenteditable="true" tabindex="0" data-sheet-cell="true" data-edit-route="${esc(r.route)}" data-edit-field="${field}" data-edit-wave="${esc(r.wave||section.wave||'')}" data-edit-section="${esc(section.label)}"`:''}>${esc(value??'')}</td>`;
  const check=(r,field,value)=>`<input class="sheet-check" type="checkbox" data-check-route="${esc(r.route)}" data-check-wave="${esc(r.wave||section.wave||'')}" data-check-field="${field}" ${value?'checked':''}>`;
  const label=section.dsp?`<span>DSP</span>`:`<span>${esc(section.label)}</span>`;
  const timeRow=section.wave?`<tr class="wave-time-row"><td>${esc(String(section.wave).replace(/\s*[AP]M/i,''))} (${section.rows.length})</td><td colspan="19"></td></tr>`:'';
  return `<tr class="wave-separator"><td colspan="20"></td></tr>${rows.map((r,i)=>`<tr class="ops-row ${r._blank?'blank-row':''}">${i===0?`<td class="wave-label ${section.dsp?'dsp-label':''}" rowspan="${rows.length}">${label}</td>`:''}${blankEditable(r,'driver',r.driver,'driver-name')}${blankEditable(r,'route',r._blank?'':r.route,'route-id')}${blankEditable(r,'staging',r.staging,'staging-code')}${i===0?`<td class="pad-label sheet-edit-cell ${edit?'editable-cell':''}" rowspan="${rows.length}" ${edit?`contenteditable="true" tabindex="0" data-sheet-cell="true" data-edit-wave="${esc(section.wave)}" data-edit-field="padOverride"`:''}>${esc(section.rows[0]?.padOverride||section.rows[0]?.pad||'')}</td>`:''}${blankEditable(r,'ev',r.ev||'')}${blankEditable(r,'deviceName',r.deviceName||'')}${blankEditable(r,'portable',r.portable||'')}<td>${check(r,'preDvic',r.preDvic)}</td><td>${check(r,'preWhip',r.preWhip)}</td><td>${check(r,'postDvic',r.postDvic)}</td><td>${check(r,'postWhip',r.postWhip)}</td><td>${check(r,'rescued',r.rescued)}</td>${blankEditable(r,'stops',r.stops,'count-cell')}${blankEditable(r,'packages',r.packages,'count-cell')}${blankEditable(r,'packageReturns',r.packageReturns||'')}${blankEditable(r,'endTime',r.endTime||'')}${blankEditable(r,'rtsTime',r.rtsTime||'')}${blankEditable(r,'plannedRts',r.plannedRts||'','planned-rts-cell')}${blankEditable(r,'clockOutTime',r.clockOutTime||'')}</tr>`).join('')}${timeRow}`;
}

function livePage() {
  return `${contextBar(`<span class="status">Live · ${state.routes.length} routes</span>`)}
  <section class="grid kpi-grid">${kpiCard('On pace / ahead','6','75% of routes','live','#e9f7df')}${kpiCard('At risk','2','Both have rescue coverage','alert','#ffe7e2')}${kpiCard('Rescue capacity','0','2 rescuers already committed','users','#fff2cf')}${kpiCard('Projected last RTS','7:38','Nina Patel · CX36','calendar','#e5efff')}</section>
  ${routesTable(routeFiltered(),'Live route health','Progress, capacity, and rescue decisions')}
  <article class="card" style="margin-top:16px"><div class="card-head"><div class="card-title"><h2>Rescue decision log</h2><p>Auditable reason, transfer, and owner</p></div><button class="btn small" data-action="new-rescue">${ICONS.plus} Plan rescue</button></div><div class="table-wrap"><table><thead><tr><th>Time</th><th>From</th><th>To</th><th>Transfer</th><th>Reason</th><th>Approved by</th><th>Status</th></tr></thead><tbody><tr><td>2:12 PM</td><td>Taylor Price · CX44</td><td>Andre Wilson · CX21</td><td>18 stops</td><td>Late load-out + apartments</td><td>Alex G.</td><td><span class="status blue">En route</span></td></tr><tr><td>2:19 PM</td><td>Marcus Chen · CX42</td><td>Nina Patel · CX36</td><td>15 stops</td><td>Route density / access</td><td>Alex G.</td><td><span class="status warn">Planned</span></td></tr></tbody></table></div></article>`;
}

function teamPage() {
  return `${contextBar()}<div class="toolbar"><div class="toolbar-left"><select class="filter-select"><option>All status</option><option>Active</option><option>Leave</option></select><select class="filter-select"><option>All roles</option><option>Lead DA</option><option>Delivery Associate</option></select></div><button class="btn lime" data-action="invite">${ICONS.plus} Add team member</button></div><section class="grid team-grid">${team.map((d,i)=>`<article class="card entity-card"><div class="entity-top"><div class="driver-avatar" style="width:38px;height:38px;border-radius:12px">${initials(d[0])}</div><span class="status ${statusClass(d[2])}">${d[2]}</span></div><h3>${d[0]}</h3><p>${d[1]} · ${`DA-${1019+i*7}`}</p><div class="entity-meta"><div class="entity-stat"><span>Delivery quality</span><strong>${d[3]}</strong></div><div class="entity-stat"><span>Last coaching</span><strong>${d[4]}</strong></div></div></article>`).join('')}</section>`;
}

function fleetPage() {
  const rivians=sortedRivianFleet(), low=rivianFleet.filter(v=>v.battery<40).length, avg=Math.round(rivianFleet.reduce((n,v)=>n+v.battery,0)/rivianFleet.length);
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded').length;
  const coverage=fleetCoverageStats();
  const sourceStatus=fleetSourceStatus();
  const age=fleetUploadAge();
  const uploadedAt=state.fleetImport?.uploadedAt?new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(state.fleetImport.uploadedAt)):'';
  const sourceName=state.fleetImport?.name?`Latest upload: ${esc(state.fleetImport.name)}${uploadedAt?` · loaded ${uploadedAt}`:''}${age.label?` · ${esc(age.label)}`:''}`:'Upload FleetOS + Amazon exports when you have them.';
  const readyCopy=coverage.verified===coverage.total?'Every EV verified':'Upload both exports to verify every EV';
  return `${contextBar(`<a class="btn small ghost" href="https://business.rivian.com/vehicles/tracker" target="_blank" rel="noopener">${ICONS.link} Rivian tracker</a><a class="btn small ghost" href="https://logistics.amazon.com/fleet-management/#vehicles" target="_blank" rel="noopener">${ICONS.link} Amazon fleet list</a>`)}<section class="grid kpi-grid">${kpiCard('Rivian battery avg',`${avg}%`,`${low} below 40%`,'van',low?'#fff2cf':'#e9f7df')}${kpiCard('EVs tracked',rivianFleet.length,readyCopy,'van',coverage.needsData?'#fff2cf':'#e9f7df')}${kpiCard('Verified EVs',`${coverage.verified}/${coverage.total}`,`${coverage.needsData} need data`,'check',coverage.needsData?'#fff2cf':'#e9f7df')}${kpiCard('Grounded EVs',grounded,'Tap a van for details','alert',grounded?'#ffe7e2':'#e9f7df')}</section><article class="card rivian-panel"><div class="card-head"><div class="card-title"><h2>FleetOS + Amazon EV live board</h2><p>Compact EV grid for battery %, VIN, license plate, active status, and operational state. Last refresh: ${esc(state.fleetLastRefresh)}.</p></div><div class="head-actions"><input class="fleet-search-input" data-fleet-search placeholder="Find EV, VIN, or plate" value="${esc(state.fleetSearch)}"><label class="fleet-count-label">Expected EVs<input class="fleet-count-input" data-fleet-expected type="number" min="0" inputmode="numeric" value="${state.fleetExpectedCount||''}" placeholder="all"></label><select class="filter-select" data-fleet-filter><option value="all" ${state.fleetFilter==='all'?'selected':''}>Show all EVs</option><option value="changed" ${state.fleetFilter==='changed'?'selected':''}>Changed only</option><option value="verified" ${state.fleetFilter==='verified'?'selected':''}>Verified only</option><option value="needs-data" ${state.fleetFilter==='needs-data'?'selected':''}>Needs data</option><option value="amazon-only" ${state.fleetFilter==='amazon-only'?'selected':''}>Amazon only</option><option value="fleetos-only" ${state.fleetFilter==='fleetos-only'?'selected':''}>FleetOS only</option><option value="demo-only" ${state.fleetFilter==='demo-only'?'selected':''}>Demo only</option><option value="low" ${state.fleetFilter==='low'?'selected':''}>Needs charge</option><option value="grounded" ${state.fleetFilter==='grounded'?'selected':''}>Grounded only</option><option value="inactive" ${state.fleetFilter==='inactive'?'selected':''}>Inactive only</option></select><button class="btn small ghost" data-action="clear-fleet-search">Clear</button><select class="filter-select" data-rivian-sort><option value="normal" ${state.fleetSort==='normal'?'selected':''}>Default order</option><option value="battery-low" ${state.fleetSort==='battery-low'?'selected':''}>Battery: low to high</option></select><button class="btn small lime" data-action="refresh-fleet">${ICONS.download} Refresh battery %</button><button class="btn small" data-action="export-fleet-csv">${ICONS.download} EV CSV</button><button class="btn small" data-action="export-fleet-gaps">${ICONS.download} Gap CSV</button><button class="btn small primary" data-action="fleet-import">${ICONS.upload} Upload / paste fleet list</button><button class="btn small ghost" data-action="reset-fleet-demo">Clear upload</button><a class="btn small" href="https://business.rivian.com/vehicles/tracker" target="_blank" rel="noopener">FleetOS</a><a class="btn small" href="https://logistics.amazon.com/fleet-management/#vehicles" target="_blank" rel="noopener">Amazon</a></div></div><div class="fleet-source-note ${age.stale?'stale':''}"><strong>${sourceName}</strong>${age.stale?'<div class="fleet-stale-warning">Battery data may be stale — upload fresh FleetOS/Amazon exports before dispatch decisions.</div>':''}<div class="fleet-sync-steps"><span>1. Open FleetOS and Amazon</span><span>2. Upload/export both lists</span><span>3. Press Refresh to re-check the latest real data</span></div><div class="fleet-source-checks"><span class="${sourceStatus.hasAmazon?'ok':'warn'}"><b>${sourceStatus.hasAmazon?'✓':'!'}</b> Amazon fleet list</span><span class="${sourceStatus.hasFleetos?'ok':'warn'}"><b>${sourceStatus.hasFleetos?'✓':'!'}</b> FleetOS battery/range</span></div><div class="fleet-coverage-strip"><span class="${coverage.demo?'warn':''}"><b>${coverage.demo}</b> demo</span><span><b>${coverage.amazonOnly}</b> Amazon only</span><span><b>${coverage.fleetosOnly}</b> FleetOS only</span><span class="${coverage.needsData?'warn':'ok'}"><b>${coverage.needsData}</b> need data</span></div><small>RelayOps matches rows by VIN first, keeps Amazon fleet-list names exactly as uploaded, and marks anything that is not fully verified.</small></div>${fleetPortalMatchStrip()}${fleetRefreshReadinessStrip()}${fleetUpdateSummary()}${fleetRecentChangesStrip()}${fleetAttentionStrip()}<section class="grid rivian-grid">${rivians.length?rivians.map(v=>rivianCard(v)).join(''):`<div class="empty-state">No EVs match this search/filter. Press Clear to show every EV again.</div>`}</section></article><div class="toolbar"><div class="toolbar-left"><select class="filter-select"><option>All vehicles</option><option>Ready</option><option>Service</option></select><button class="btn" data-action="devices">${ICONS.phone} Device cabinet</button></div><button class="btn lime" data-action="add-vehicle">${ICONS.plus} Add vehicle</button></div><section class="grid fleet-grid">${fleet.map(v=>`<article class="card entity-card"><div class="entity-top"><div class="entity-icon">${ICONS.van}</div><span class="status ${statusClass(v[2])}">${v[2]}</span></div><h3>${v[0]}</h3><p>${v[1]}</p><div class="entity-meta"><div class="entity-stat"><span>Assigned today</span><strong>${v[3]}</strong></div><div class="entity-stat"><span>Fuel / charge</span><strong>${v[4]}</strong></div></div></article>`).join('')}</section>`;
}

function fleetUpdateSummary() {
  const s=state.fleetUpdateSummary;
  if(!s)return '';
  return `<div class="fleet-update-summary"><span><b>${s.input}</b> rows read</span><span><b>${s.updated}</b> updated</span><span><b>${s.newCount}</b> new</span><span class="${s.duplicates?'warn':''}"><b>${s.duplicates||0}</b> duplicate VINs</span><span><b>${s.removed||0}</b> not in upload</span><span><b>${s.visible}</b> showing now</span></div>`;
}

function fleetAttentionStrip() {
  const charge=rivianFleet.filter(v=>v.battery<40);
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded');
  const missing=rivianFleet.filter(v=>fleetMissingFields(v).length);
  const firstNames=rows=>rows.slice(0,3).map(v=>v.name).join(', ')||'None';
  return `<div class="fleet-attention-strip"><button data-action="fleet-filter-quick" data-filter="low" class="${charge.length?'warn':'ok'}"><b>${charge.length}</b><span>Need charge</span><small>${esc(firstNames(charge))}</small></button><button data-action="fleet-filter-quick" data-filter="grounded" class="${grounded.length?'danger':'ok'}"><b>${grounded.length}</b><span>Grounded</span><small>${esc(firstNames(grounded))}</small></button><button data-action="fleet-filter-quick" data-filter="needs-data" class="${missing.length?'warn':'ok'}"><b>${missing.length}</b><span>Missing data</span><small>${esc(firstNames(missing))}</small></button></div>`;
}

function fleetRecentChanges() {
  return rivianFleet.filter(v=>(state.fleetChangedVins?.[v.vin]||v.changedFields||[]).length);
}

function fleetRecentChangesStrip() {
  const changed=fleetRecentChanges();
  if(!changed.length)return '';
  const preview=changed.slice(0,4).map(v=>{
    const fields=state.fleetChangedVins?.[v.vin]||v.changedFields||[];
    return `<span><b>${esc(v.name)}</b>${esc(fields.join(', '))}</span>`;
  }).join('');
  return `<div class="fleet-recent-changes"><div><strong>${changed.length} EV${changed.length===1?'':'s'} changed after upload</strong><p>Quick audit before dispatch uses the new FleetOS/Amazon data.</p></div><div class="fleet-change-list">${preview}</div><button class="btn small" data-action="fleet-filter-quick" data-filter="changed">Show changed only</button></div>`;
}

function fleetPortalMatchStats() {
  const rows=state.fleetImport?.vehicles||[];
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

function fleetPortalMatchStrip() {
  const stats=fleetPortalMatchStats();
  if(!stats.rows.length)return `<div class="fleet-portal-match empty"><strong>Full EV portal check</strong><span>Upload the Amazon fleet list and FleetOS tracker export to list every EV, match names to VINs, and verify battery % before dispatch.</span><button class="btn small primary" data-action="fleet-import">Upload both lists</button></div>`;
  const status=stats.amazonOnly.length||stats.fleetosOnly.length?'warn':'ok';
  const expected=Number(state.fleetExpectedCount)||0;
  const short=Math.max(0,expected-stats.uniqueVins.size);
  const countClass=expected?(short?'warn':'ok'):'';
  const countCopy=expected?(short?`${short} short of expected ${expected}`:`complete vs expected ${expected}`):'set expected count above';
  const missingAmazon=stats.fleetosOnly.slice(0,3).join(', ')||'None';
  const missingFleetos=stats.amazonOnly.slice(0,3).join(', ')||'None';
  const actionButtons=status==='ok'?'<button class="btn small" data-action="fleet-filter-quick" data-filter="verified">Show verified</button>':`<div class="portal-match-actions">${stats.amazonOnly.length?'<button class="btn small" data-action="fleet-filter-quick" data-filter="missing-fleetos">Review missing FleetOS</button>':''}${stats.fleetosOnly.length?'<button class="btn small" data-action="fleet-filter-quick" data-filter="missing-amazon">Review missing Amazon</button>':''}</div>`;
  return `<div class="fleet-portal-match ${status}"><div><strong>Full EV portal check</strong><span>${status==='ok'?'Every uploaded VIN matched between Amazon names and FleetOS battery rows.':'Some VINs only appeared in one upload — review the exact missing side below.'}</span></div><div class="portal-match-grid"><span class="${countClass}"><b>${stats.uniqueVins.size}</b>unique VINs accounted<em>${esc(countCopy)}</em></span><span><b>${stats.amazon.size}</b>Amazon named EVs</span><span><b>${stats.fleetos.size}</b>FleetOS battery EVs</span><span><b>${stats.both.length}</b>matched both</span><span class="${stats.amazonOnly.length?'warn':'ok'}"><b>${stats.amazonOnly.length}</b>missing FleetOS</span><span class="${stats.fleetosOnly.length?'warn':'ok'}"><b>${stats.fleetosOnly.length}</b>missing Amazon</span></div><small>Missing FleetOS: ${esc(missingFleetos)} · Missing Amazon: ${esc(missingAmazon)}</small>${actionButtons}</div>`;
}

function fleetSourceKey(source='') {
  const value=String(source||'').toLowerCase();
  if(value.includes('amazon fleet list'))return 'amazon';
  if(value.includes('fleetos tracker')||value.includes('rivian'))return 'fleetos';
  return 'other';
}

function fleetImportFromSourceUploads() {
  const uploads=Object.values(state.fleetSourceUploads||{}).filter(u=>u?.vehicles?.length);
  const vehicles=uploads.flatMap(u=>u.vehicles||[]);
  const uploadDates=uploads.map(u=>u.uploadedAt).filter(Boolean).sort();
  const uploadedAt=uploadDates[uploadDates.length-1]||new Date().toISOString();
  const names=[...new Set(uploads.map(u=>u.name).filter(Boolean))];
  return {name:names.join(' + ')||'Latest fleet source uploads',vehicles,uploadedAt};
}

function rememberFleetSourceUpload(vehicles=[],name='Fleet upload',uploadedAt=new Date().toISOString()) {
  const grouped={};
  vehicles.forEach(vehicle=>{
    const key=fleetSourceKey(vehicle.source);
    if(!grouped[key])grouped[key]=[];
    grouped[key].push(vehicle);
  });
  state.fleetSourceUploads=state.fleetSourceUploads||{};
  Object.entries(grouped).forEach(([key,rows])=>{
    state.fleetSourceUploads[key]={name,vehicles:rows,uploadedAt};
  });
  state.fleetImport=fleetImportFromSourceUploads();
  return state.fleetImport.vehicles;
}

function fleetSourceUploadLabel(key='') {
  const upload=state.fleetSourceUploads?.[key];
  if(!upload?.vehicles?.length)return 'Not uploaded yet';
  const when=upload.uploadedAt?new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(upload.uploadedAt)):'saved';
  return `${upload.vehicles.length} rows · ${when}`;
}

function fleetSourceUploadedAt(key='',format='time') {
  const uploadedAt=state.fleetSourceUploads?.[key]?.uploadedAt;
  if(!uploadedAt)return '—';
  const date=new Date(uploadedAt);
  if(!Number.isFinite(date.getTime()))return '—';
  return format==='iso'?date.toISOString():new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(date);
}

function fleetRefreshReadinessStrip() {
  if(!state.fleetImport?.vehicles?.length)return '';
  const stats=fleetPortalMatchStats();
  const hasAmazon=stats.amazon.size>0, hasFleetos=stats.fleetos.size>0;
  const tone=hasAmazon&&hasFleetos?'ok':'warn';
  const message=hasAmazon&&hasFleetos?'Refresh will rebuild the board from the latest saved Amazon names and FleetOS battery data.':`Refresh can run, but upload the ${hasAmazon?'FleetOS tracker':'Amazon fleet list'} next for full accuracy.`;
  return `<div class="fleet-refresh-readiness ${tone}"><div><strong>Refresh readiness</strong><span>${esc(message)}</span></div><div class="refresh-source-pills"><span class="${hasAmazon?'ok':'warn'}"><b>Amazon</b>${esc(fleetSourceUploadLabel('amazon'))}</span><span class="${hasFleetos?'ok':'warn'}"><b>FleetOS</b>${esc(fleetSourceUploadLabel('fleetos'))}</span></div><button class="btn small ${hasAmazon&&hasFleetos?'lime':'primary'}" data-action="${hasAmazon&&hasFleetos?'refresh-fleet':'fleet-import'}">${hasAmazon&&hasFleetos?'Refresh now':'Upload missing source'}</button></div>`;
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

function batteryTone(percent=0) {
  if(percent>=75)return 'high';
  if(percent>=50)return 'medium';
  if(percent>=30)return 'low';
  return 'critical';
}
function batteryLabel(percent=0) {
  if(percent>=75)return 'Route ready';
  if(percent>=50)return 'Good';
  if(percent>=30)return 'Charge soon';
  return 'Charge now';
}
function sortedRivianFleet() {
  const rows=[...rivianFleet];
  const q=String(state.fleetSearch||'').trim().toLowerCase();
  const filtered=rows.filter(v=>{
    if(state.fleetFilter==='low')return v.battery<40;
    if(state.fleetFilter==='grounded')return v.operational==='Grounded';
    if(state.fleetFilter==='inactive')return v.active==='Inactive';
    if(state.fleetFilter==='changed')return (state.fleetChangedVins?.[v.vin]||v.changedFields||[]).length>0;
    if(state.fleetFilter==='verified')return fleetConfidence(v).label==='Verified';
    if(state.fleetFilter==='needs-data')return fleetMissingFields(v).length>0;
    if(state.fleetFilter==='amazon-only')return fleetConfidence(v).label==='Amazon only';
    if(state.fleetFilter==='fleetos-only')return fleetConfidence(v).label==='FleetOS only';
    if(state.fleetFilter==='missing-fleetos')return fleetConfidence(v).label==='Amazon only';
    if(state.fleetFilter==='missing-amazon')return fleetConfidence(v).label==='FleetOS only';
    if(state.fleetFilter==='demo-only')return fleetConfidence(v).label==='Demo';
    return true;
  }).filter(v=>{
    if(!q)return true;
    return [v.name,v.vin,v.plate,v.active,v.operational].some(value=>String(value||'').toLowerCase().includes(q));
  });
  if(state.fleetSort==='battery-low') filtered.sort((a,b)=>a.battery-b.battery||a.vin.localeCompare(b.vin));
  return filtered;
}
function amazonRivianIcon(tone='high') {
  return `<span class="rivian-van-art ${tone}" aria-hidden="true"><span class="van-cab"></span><span class="van-box"><i class="prime-smile"></i><b>prime</b></span><span class="van-wheel front"></span><span class="van-wheel rear"></span></span>`;
}
function fleetConfidence(vehicle={}) {
  const source=String(vehicle.source||'').toLowerCase();
  const hasAmazon=source.includes('amazon fleet list');
  const hasFleetos=source.includes('fleetos tracker')||source.includes('rivian');
  if(hasAmazon&&hasFleetos)return {label:'Verified',className:'verified'};
  if(hasAmazon)return {label:'Amazon only',className:'partial'};
  if(hasFleetos)return {label:'FleetOS only',className:'partial'};
  return {label:'Demo',className:'demo'};
}
function fleetMissingFields(vehicle={}) {
  const confidence=fleetConfidence(vehicle);
  if(confidence.label==='Demo')return ['real upload'];
  const missing=[];
  if(!String(vehicle.plate||'').trim())missing.push('plate');
  if(!String(vehicle.active||'').trim())missing.push('active status');
  if(!String(vehicle.operational||'').trim())missing.push('operational state');
  if(!vehicle.hasBattery&&confidence.label!=='Amazon only')missing.push('battery');
  if(confidence.label==='Amazon only')missing.push('FleetOS battery');
  if(confidence.label==='FleetOS only')missing.push('Amazon name/plate/status');
  return [...new Set(missing)];
}
function rivianCard(v) {
  const tone=batteryTone(v.battery), open=state.expandedFleetVin===v.vin;
  const changes=state.fleetChangedVins?.[v.vin]||v.changedFields||[];
  const confidence=fleetConfidence(v);
  const missing=fleetMissingFields(v);
  const changedAt=v.updatedAt?new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(v.updatedAt)):'—';
  return `<button class="rivian-card ${tone} ${open?'expanded':''} ${changes.length?'updated':''} ${missing.length?'needs-data':''}" data-action="toggle-fleet-card" data-vin="${esc(v.vin)}" aria-expanded="${open?'true':'false'}"><div class="rivian-card-main"><div class="rivian-copy"><div class="rivian-title-line"><h3>${esc(v.name)}</h3><span class="confidence-pill ${confidence.className}">${esc(confidence.label)}</span>${changes.length?'<span class="update-pill">Updated</span>':''}</div><span class="rivian-vin">${esc(v.vin)}</span><div class="rivian-charge-line"><span class="battery-icon ${tone}"><i style="width:${Math.max(8,v.battery)}%"></i></span><strong>${v.miles} mi / ${v.battery}%</strong></div><span class="rivian-live-status ${tone}">${esc(v.status)} · ${batteryLabel(v.battery)}</span><span class="tap-cue">${open?'Tap to collapse':'Tap for plate/status'}</span>${missing.length?`<span class="missing-line">Needs: ${esc(missing.join(', '))}</span>`:''}${changes.length?`<span class="change-line">Changed: ${esc(changes.join(', '))}</span>`:''}</div>${amazonRivianIcon(tone)}</div>${open?`<div class="rivian-details"><span><b>Plate</b>${esc(v.plate||'—')}</span><span><b>Active</b>${esc(v.active||'—')}</span><span><b>State</b>${esc(v.operational||'—')}</span><span><b>Last change</b>${esc(changedAt)}</span><span><b>Amazon uploaded</b>${esc(fleetSourceUploadedAt('amazon'))}</span><span><b>FleetOS uploaded</b>${esc(fleetSourceUploadedAt('fleetos'))}</span><span><b>Confidence</b>${esc(confidence.label)}</span><span><b>Needs</b>${esc(missing.join(', ')||'Nothing')}</span><span><b>Changed</b>${esc(changes.join(', ')||'No changes')}</span><span><b>Source</b>${esc(v.source||'Demo data')}</span></div>`:''}</button>`;
}

function performancePage() {
  const vals=[84,87,91,89,93,92,96,95];
  return `${contextBar('<select class="filter-select"><option>Last 8 weeks</option><option>Last 4 weeks</option></select>')}<section class="grid kpi-grid">${kpiCard('Overall standing','Fantastic','Up from Great','chart','#e9f7df')}${kpiCard('Delivery quality','99.4%','<span class="trend-up">+0.6%</span> vs last week','check','#e5efff')}${kpiCard('Safety events','4','<span class="trend-up">-3 events</span> vs last week','alert','#fff2cf')}${kpiCard('Coach completion','87%','6 open acknowledgments','coach','#ffe7e2')}</section><section class="grid page-grid"><article class="card"><div class="card-head"><div class="card-title"><h2>Scorecard trend</h2><p>Composite performance index · 8 weeks</p></div><span class="status">Improving</span></div><div class="chart"><div class="chart-bars">${vals.map((v,i)=>`<div class="bar-group"><div class="bar" style="height:${v-20}%"></div><div class="bar primary" style="height:${v}%"></div><span class="bar-label">W${19+i}</span></div>`).join('')}</div><div class="chart-legend"><span><i class="legend-dot"></i>Network threshold</span><span><i class="legend-dot primary"></i>Northstar DSP</span></div></div></article><article class="card"><div class="card-head"><div class="card-title"><h2>Focus areas</h2><p>Highest impact first</p></div></div><div class="alert-stack">${alertRow('red','Following distance','3 drivers · 5 events','High')}${alertRow('','Delivery not received','2 drivers · 4 DNRs','Med')}${alertRow('','Contact compliance','Team average 94.2%','Med')}</div></article></section><div style="margin-top:16px">${driverPerformanceTable()}</div>`;
}

function driverPerformanceTable() {
  return `<article class="card table-card"><div class="card-head"><div class="card-title"><h2>Driver performance</h2><p>Scorecard signals with coaching status</p></div><button class="btn small" data-action="export-menu">${ICONS.download} Export</button></div><div class="table-wrap"><table><thead><tr><th>Driver</th><th>Tier</th><th>Quality</th><th>Safety</th><th>CED</th><th>Coaching</th></tr></thead><tbody>${team.slice(0,8).map((d,i)=>`<tr><td><div class="driver-cell"><div class="driver-avatar">${initials(d[0])}</div><strong>${d[0]}</strong></div></td><td><span class="status ${statusClass(d[2])}">${d[2]}</span></td><td>${d[3]}</td><td>${[100,98,91,100,97,94,99,100][i]}%</td><td>${[96,94,89,98,93,92,97,96][i]}%</td><td><span class="status ${i===2||i===5?'warn':''}">${i===2||i===5?'Due':'Current'}</span></td></tr>`).join('')}</tbody></table></div></article>`;
}

function coachingPage() {
  const coaching = [
    ['Andre Wilson','Following distance','Netradyne · 2 events','Due today','High'],['Nina Patel','Contact compliance','Scorecard · 91.8%','Due today','Medium'],
    ['Jordan Lee','Delivery not received','2 DNRs this week','Due tomorrow','High'],['Kiara Owens','Seatbelt-off event','Netradyne · 1 event','Sent','High'],
    ['Ethan Brooks','Customer feedback','CED down 2.1%','Acknowledged','Medium'],['Marcus Chen','Positive recognition','Top rescue support','Ready','Positive']
  ];
  return `${contextBar()}<div class="toolbar"><div class="toolbar-left"><button class="btn lime" data-action="coach-all">${ICONS.coach} Send due coaching</button><select class="filter-select"><option>All priorities</option><option>High</option><option>Medium</option></select></div><button class="btn" data-action="template">Manage templates</button></div><article class="card table-card"><div class="card-head"><div class="card-title"><h2>Coaching queue</h2><p>Draft → review → send → acknowledge</p></div><span class="status warn">6 open</span></div><div class="table-wrap"><table><thead><tr><th>Driver</th><th>Focus</th><th>Source</th><th>Priority</th><th>Status</th><th></th></tr></thead><tbody>${coaching.map((c,i)=>`<tr><td><div class="driver-cell"><div class="driver-avatar">${initials(c[0])}</div><strong>${c[0]}</strong></div></td><td><strong>${c[1]}</strong></td><td>${c[2]}</td><td><span class="status ${c[4]==='High'?'risk':c[4]==='Medium'?'warn':''}">${c[4]}</span></td><td><span class="status ${statusClass(c[3])}">${c[3]}</span></td><td><button class="btn small" data-action="coach" data-driver="${c[0]}">${i<3?'Review':'Open'}</button></td></tr>`).join('')}</tbody></table></div></article>`;
}

function checklistsPage() {
  const groups = [
    ['Opening dispatch','12 / 14','86%',['Import Amazon roster','Confirm callouts & coverage','Assign vans and devices','Verify keys, fuel cards, phones','Send stand-up notes']],
    ['Load-out','7 / 8','88%',['Confirm staging locations','Scan route exceptions','Document late departures','Verify all routes launched']],
    ['Closeout','0 / 9','0%',['Confirm RTS for every route','Collect devices and keys','Record van damage / DVIC','Close rescue log','Prepare next-day coverage']]
  ];
  return `${contextBar()}<section class="grid fleet-grid">${groups.map((g,gi)=>`<article class="card"><div class="card-head"><div class="card-title"><h2>${g[0]}</h2><p>${g[1]} complete</p></div><span class="status ${gi===2?'neutral':gi===1?'warn':''}">${g[2]}</span></div><div class="page-summary">${g[3].map((x,i)=>`<label style="display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:1px solid #eef0ed;font-size:9px"><input type="checkbox" class="check-item" ${gi===0&&i<4||gi===1&&i<3?'checked':''}/> ${x}</label>`).join('')}<button class="btn small" style="margin-top:14px;width:100%" data-action="checklist">Open full checklist</button></div></article>`).join('')}</section><article class="card" style="margin-top:16px"><div class="card-head"><div class="card-title"><h2>Recent completion history</h2><p>Accountability across every shift</p></div></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Opening dispatcher</th><th>Opening</th><th>Load-out</th><th>Closeout</th><th>Exceptions</th></tr></thead><tbody><tr><td>Wed, Jul 1</td><td>Alex Gonzalez</td><td><span class="status">100%</span></td><td><span class="status">100%</span></td><td><span class="status">100%</span></td><td>2 notes</td></tr><tr><td>Tue, Jun 30</td><td>Sam Rivera</td><td><span class="status">100%</span></td><td><span class="status">100%</span></td><td><span class="status warn">89%</span></td><td>1 overdue</td></tr></tbody></table></div></article>`;
}

function inboxPage() {
  const msgs=[['Andre Wilson','Running behind after late load-out. Apartments are heavy.','2 min','Unread'],['Nina Patel','Tire light came on. Pressure looks okay in the app.','8 min','Unread'],['Taylor Price','Ready for the rescue. Send the meet point.','12 min','Unread'],['Maya Collins','CX12 is clear. No support needed.','18 min','Read']];
  return `${contextBar()}<section class="grid page-grid"><article class="card"><div class="card-head"><div class="card-title"><h2>Unified team inbox</h2><p>Calls, SMS, and operational updates</p></div><button class="btn small lime" data-action="message">${ICONS.plus} New message</button></div><div class="alert-stack">${msgs.map(m=>`<button class="alert-row" style="width:100%;border:0;background:transparent;text-align:left" data-action="open-message"><div class="driver-avatar">${initials(m[0])}</div><div class="alert-copy"><strong>${m[0]}</strong><span>${m[1]}</span></div><span class="alert-time">${m[2]}<br>${m[3]}</span></button>`).join('')}</div></article><article class="card"><div class="card-head"><div class="card-title"><h2>Broadcasts</h2><p>Reusable, approved messages</p></div></div><div class="page-summary"><button class="btn" style="width:100%;margin-bottom:8px" data-action="broadcast">Send shift details</button><button class="btn" style="width:100%;margin-bottom:8px" data-action="broadcast">Send lunch reminder</button><button class="btn" style="width:100%;margin-bottom:8px" data-action="broadcast">Send RTS reminder</button><div class="callout"><strong>Quiet hours active</strong><p>Non-urgent recurring messages will wait until 6:00 AM.</p></div></div></article></section>`;
}

function inventoryPage() {
  const items=[['CAT phones','34','31 ready','3 charging','0'],['Power banks','28','24 ready','2 assigned','2 low'],['Safety vests','62','18 in stock','44 assigned','0'],['Gas cards','30','26 active','4 spare','0'],['First aid kits','29','25 assigned','2 expiring','2 order'],['Charging cables','41','15 in stock','26 assigned','0']];
  return `${contextBar()}<div class="toolbar"><div class="toolbar-left"><select class="filter-select"><option>All categories</option></select><button class="btn" data-action="inventory-log">Assignment log</button></div><button class="btn lime" data-action="add-item">${ICONS.plus} Add item</button></div><section class="grid fleet-grid">${items.map(x=>`<article class="card entity-card"><div class="entity-top"><div class="entity-icon">${ICONS.box}</div><span class="status ${x[4]!=='0'?'warn':''}">${x[4]==='0'?'Healthy':x[4]}</span></div><h3>${x[0]}</h3><p>${x[1]} total tracked</p><div class="entity-meta"><div class="entity-stat"><span>Available</span><strong>${x[2]}</strong></div><div class="entity-stat"><span>Other</span><strong>${x[3]}</strong></div></div></article>`).join('')}</section>`;
}

function reportsPage() {
  const reports=[['Daily roster','Drivers, routes, staging, vans, devices','Today · 8 rows','roster'],['Route progress','Stops, packages, pace, rescue decisions','Live · 8 rows','live'],['Weekly scorecard','Driver metrics and coaching status','Week 26 · 52 rows','chart'],['Fleet readiness','DVIC, assignments, maintenance, fuel','Today · 26 rows','van'],['Attendance & hours','Scheduled vs actual shift activity','This week · 74 rows','users'],['Device assignments','Daily custody and return history','Today · 34 rows','phone']];
  return `${contextBar()}<section class="grid report-grid">${reports.map((r,i)=>`<article class="card entity-card"><div class="entity-top"><div class="entity-icon">${ICONS[r[3]]}</div><button class="mini-icon-btn" data-action="export-report" data-report="${r[0]}">${ICONS.download}</button></div><h3>${r[0]}</h3><p>${r[1]}</p><div class="entity-meta"><div class="entity-stat" style="grid-column:1 / -1"><span>Current dataset</span><strong>${r[2]}</strong></div></div></article>`).join('')}</section><section class="grid settings-grid" style="margin-top:16px"><article class="card settings-section"><h2>Google Sheets handoff</h2><p>Export clean tabular data in the order your template expects.</p><div class="field-grid"><div class="field"><label>Template profile</label><select><option>Daily Wave Sheet</option><option>Payroll & Attendance</option><option>Weekly Scorecard</option></select></div><div class="field"><label>Date format</label><select><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div></div><div class="mapping"><div class="mapping-row"><div class="mapping-col">Amazon: route_code</div><div class="mapping-arrow">→</div><div class="mapping-col">Sheet: Route</div></div><div class="mapping-row"><div class="mapping-col">Amazon: transporter_name</div><div class="mapping-arrow">→</div><div class="mapping-col">Sheet: Driver</div></div><div class="mapping-row"><div class="mapping-col">RelayOps: vehicle_id</div><div class="mapping-arrow">→</div><div class="mapping-col">Sheet: Van</div></div></div><div class="modal-actions"><button class="btn" data-action="copy">${ICONS.copy} Copy tab-separated</button><button class="btn lime" data-action="export-menu">${ICONS.download} Download</button></div></article><article class="card settings-section"><h2>Export center</h2><p>These downloads use only the data visible to your role.</p><div class="connection"><div class="connection-logo">CSV</div><div class="connection-copy"><strong>Universal CSV</strong><span>Best for Google Sheets and imports</span></div><button class="btn small" data-action="export-csv">Download</button></div><div class="connection"><div class="connection-logo" style="background:#1c6e44">XLS</div><div class="connection-copy"><strong>Excel workbook</strong><span>Formatted spreadsheet with filters</span></div><button class="btn small" data-action="export-excel">Download</button></div><div class="connection"><div class="connection-logo" style="background:#2b5bb8">TPL</div><div class="connection-copy"><strong>Import template</strong><span>Blank CSV with accepted columns</span></div><button class="btn small" data-action="template-csv">Download</button></div></article></section>`;
}

function adminPage() {
  if (state.role !== 'admin') return `<article class="card empty-state"><div class="empty-icon">${ICONS.alert}</div><h3>Owner access required</h3><p>This area is protected by role-based access and is not visible to dispatcher accounts.</p></article>`;
  return `${contextBar('<span class="status">Owner access</span>')}<section class="grid settings-grid"><div class="grid"><article class="card settings-section"><h2>Organization</h2><p>These details identify your workspace and default station.</p><div class="field-grid"><div class="field"><label>DSP name</label><input value="Northstar Delivery LLC" /></div><div class="field"><label>Station code</label><input value="DAX5" /></div><div class="field"><label>Timezone</label><select><option>America/Los_Angeles</option></select></div><div class="field"><label>Operating day starts</label><input type="time" value="06:00" /></div></div><div class="modal-actions"><button class="btn primary" data-action="save">Save changes</button></div></article><article class="card table-card"><div class="card-head"><div class="card-title"><h2>Role permissions</h2><p>Owner retains full access; dispatcher permissions are explicit</p></div><button class="btn small" data-action="invite">${ICONS.plus} Invite user</button></div><div class="table-wrap"><table class="permissions-table"><thead><tr><th>Capability</th><th>Owner</th><th>Ops manager</th><th>Dispatcher</th></tr></thead><tbody>${['View all stations','Import Amazon files','Publish daily roster','Edit driver records','Send coaching','Export reports','Manage users & billing'].map((p,i)=>`<tr><td><strong>${p}</strong></td><td><button class="switch on"></button></td><td><button class="switch ${i===0||i===6?'':'on'}"></button></td><td><button class="switch ${i===1||i===2||i===5?'on':''}"></button></td></tr>`).join('')}</tbody></table></div></article></div><div class="grid"><article class="card settings-section"><h2>Connections</h2><p>Credentials belong in encrypted server-side secrets, never the browser.</p><div class="connection"><div class="connection-logo">amz</div><div class="connection-copy"><strong>Amazon Logistics</strong><span>CSV/XLSX import active · official API pending</span></div><span class="status warn">Setup</span></div><div class="connection"><div class="connection-logo" style="background:#287247">GS</div><div class="connection-copy"><strong>Google Sheets</strong><span>Export and copy ready</span></div><span class="status">Ready</span></div><div class="connection"><div class="connection-logo" style="background:#2463a8">ADP</div><div class="connection-copy"><strong>ADP Workforce</strong><span>Not connected</span></div><button class="btn small">Connect</button></div><button class="btn" style="width:100%;margin-top:5px" data-action="import">Configure Amazon import</button></article><article class="card settings-section"><h2>Access preview</h2><p>See exactly what your opening dispatcher sees.</p><div class="callout"><strong>Current view: Owner / admin</strong><p>Admin settings, user management, connection secrets, and the audit log are available.</p><button class="btn small lime" data-action="role-preview">Preview dispatcher access</button></div></article><article class="card settings-section"><h2>Recent audit activity</h2><p>Immutable account actions for owner review.</p>${[['8:17 AM','Alex G.','Published roster'],['8:04 AM','Alex G.','Imported roster CSV/XLSX'],['Yesterday','Sam R.','Updated van DVIC'],['Jun 30','Alex G.','Changed dispatcher permission']].map(x=>`<div class="summary-line"><span>${x[0]} · ${x[1]}</span><strong>${x[2]}</strong></div>`).join('')}</article></div></section>`;
}

function importPreviewStats() {
  if(!state.importedFile)return null;
  if(state.importedFile.kind==='details') return {included:state.importedFile.routeDetailsCount||0,excluded:0};
  const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
  const dsp=state.importedFile.headers.findIndex(h=>['dsp','dspcode','company'].includes(norm(h)));
  const included=dsp<0?state.importedFile.rows.length:state.importedFile.rows.filter(r=>String(r[dsp]).trim().toUpperCase()===state.dspCode).length;
  return {included,excluded:state.importedFile.rows.length-included};
}

function modal() {
  if (!state.modal) return '';
  if (state.modal === 'import') {
    const stats=importPreviewStats(), isRts=state.importPurpose==='rts';
    const source=state.importSource==='slack'&&!isRts?`<div class="slack-panel"><div class="slack-brand"><div class="slack-logo">S</div><div><strong>Slack Import</strong><span>#morning-operations · demo connection</span></div><span class="demo-tag">DEMO</span></div><button class="slack-file" data-action="load-slack-demo"><span class="file-type">CSV</span><span><strong>Today’s operations file</strong><small>Shared by Operations Bot · ready to use</small></span><span class="btn small">Choose this file</span></button><div class="import-note">For this demo, RelayOps will keep only ${state.dspCode} routes from the Slack file.</div></div>`:`<div class="drop-zone ${state.importedFile?'has-file':''}" id="drop-zone"><div><div class="drop-icon">${state.importedFile?ICONS.check:ICONS.upload}</div><strong>${state.importedFile?`Great! ${esc(state.importedFile.name)} is ready.`:isRts?'Choose the Routes_DJT6 file':'Choose DAYOFOPSPLAN and ROUTE_DJT6'}</strong><span>${state.importedFile?`${state.importedFile.rows.length} rows found${state.importedFile.routeDetailsCount?` · ${state.importedFile.routeDetailsCount} CX rows matched`:''}.`:isRts?'Excel (.xlsx) or CSV is supported. RelayOps pulls only Planned Departure Time into Planned RTS.':'Select both files at the same time. Excel (.xlsx) and CSV are supported.'}</span><button class="btn primary upload-choice" data-action="choose-file">${state.importedFile?'Choose different files':isRts?'Choose Planned RTS file':'Choose Amazon files'}</button></div></div>`;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal import-modal" role="dialog" aria-modal="true" aria-labelledby="import-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">${isRts?'PLANNED RTS':'EASY UPLOAD'}</span><h2 id="import-title">${isRts?'Upload Planned RTS times':'Make my morning sheet'}</h2><p>${isRts?'Drop the Routes_DJT6 export. Only the Planned Departure Time column is used.':'Choose the plan and route files. RelayOps joins them by CX route.'}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="upload-progress"><div class="upload-progress-step active"><b>1</b><span>Choose files</span></div><i></i><div class="upload-progress-step ${state.importedFile?'active':''}"><b>${state.importedFile?'✓':'2'}</b><span>${isRts?'Find planned time':'Match CX routes'}</span></div><i></i><div class="upload-progress-step"><b>3</b><span>${isRts?'Fill purple cells':'Make sheet'}</span></div></div>${!isRts?`<div class="source-tabs import-choice-grid"><button class="source-tab import-choice-card ${state.importSource==='slack'?'active':''}" data-action="set-import-source" data-source="slack"><strong>Slack Import</strong><small>Daily file from the operations channel</small></button><button class="source-tab import-choice-card ${state.importSource==='computer'?'active':''}" data-action="set-import-source" data-source="computer"><strong>Cortex Import</strong><small>Amazon DAYOFOPSPLAN + ROUTE_DJT6 exports</small></button></div>`:''}${source}${state.importedFile?`<div class="import-preview"><span class="preview-check">✓</span><div><strong>${isRts?`${state.importedFile.routeDetailsCount||0} Planned RTS times ready`:`${stats.included} ${state.dspCode} routes matched`}</strong><span>${isRts?'Irregular or missing times will be highlighted light red.':`${stats.excluded} routes from other DSPs will be left out automatically.`}</span></div></div><div class="auto-match"><strong>RelayOps will do these things:</strong><div><span>✓ Earliest wave first</span><span>✓ CX route matching</span><span>${isRts?'✓ Planned RTS purple cells':'✓ First driver name only'}</span></div></div>`:''}<div class="modal-actions easy-actions"><button class="btn sample-button" data-action="template-csv">Need an example file?</button><button class="btn primary create-sheet-button" data-action="apply-import" ${state.importedFile?'':'disabled'}>${state.importedFile?(isRts?'Fill Planned RTS →':'Create my operations sheet →'):'Choose files first'}</button></div><p class="upload-help">Nothing is sent to Amazon. RelayOps reads the files in this browser and keeps the originals unchanged.</p></div></div></div>`;
  }
  if (state.modal === 'export') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div><h2>Export route data</h2><p>Ready for Excel or your Google Sheets template</p></div><button class="icon-button" data-action="close-modal">×</button></div><div class="modal-body"><div class="connection"><div class="connection-logo">CSV</div><div class="connection-copy"><strong>CSV file</strong><span>Fastest option for Google Sheets</span></div><button class="btn small" data-action="export-csv">Download</button></div><div class="connection"><div class="connection-logo" style="background:#1c6e44">XLS</div><div class="connection-copy"><strong>Excel workbook</strong><span>Styled table that opens in Excel</span></div><button class="btn small" data-action="export-excel">Download</button></div><div class="connection"><div class="connection-logo" style="background:#2866b4">TAB</div><div class="connection-copy"><strong>Copy for Google Sheets</strong><span>Paste directly into cell A1</span></div><button class="btn small" data-action="copy">Copy</button></div></div></div></div>`;
  if (state.modal === 'sheets-helper') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal sheets-modal" role="dialog" aria-modal="true" aria-labelledby="sheets-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">GOOGLE SHEETS PASTE BOX</span><h2 id="sheets-title">Paste-ready morning sheet</h2><p>If one-click copy does not work, click Select all, copy, then paste into Google Sheets cell A1.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="paste-guide"><span><b>1</b> Select all</span><span><b>2</b> Copy</span><span><b>3</b> Paste in A1</span></div><textarea id="sheets-copy-text" class="sheets-copy-text" readonly>${esc(state.sheetCopyText||morningSheetTsv())}</textarea><div class="modal-actions"><button class="btn" data-action="select-sheets-text">Select all text</button><button class="btn primary" data-action="copy-morning-visible">${ICONS.copy} Copy again</button></div></div></div></div>`;
  if (state.modal === 'equipment') {
    const count=state.equipmentImport?Object.keys(state.equipmentImport.details||{}).length:0;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">VAN/DEV/PORT IMPORT</span><h2 id="equipment-title">Match vans to devices</h2><p>Upload the screenshot, CSV, XLSX, PDF, or Google Sheets export. RelayOps matches each EV/VAN number to the EV cell, then fills Device and Portable.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="equipment-drop" id="equipment-drop" tabindex="0"><div class="equipment-drop-copy"><strong>Drop VAN/DEV/PORT file here</strong><span>Accepts screenshots, JPEG/PNG, PDF, CSV, XLSX, TXT, or copied screenshot files. Best Google Sheets layout: one row per van with columns EV/VAN, DEVICE, PORTABLE.</span></div><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose file</button></div><div class="equipment-layout-tip"><strong>Safest Google Sheets layout</strong><span>EV/VAN | DEVICE | PORTABLE — no merged cells. The split two-table screenshot also works, but the simple 3-column list is easiest for every dispatcher.</span></div>${state.equipmentImport?`<div class="import-preview ${count?'':'import-warning'}"><span class="preview-check">${count?'✓':'!'}</span><div><strong>${count} EV/VAN assignments found</strong><span>${count?(state.equipmentImport.name?esc(state.equipmentImport.name):'Ready to match against the EV column.'):'Try the 3-column Google Sheets layout, or upload a clearer screenshot/export.'}</span></div></div><div class="equipment-preview">${Object.entries(state.equipmentImport.details||{}).slice(0,6).map(([van,d])=>`<span><b>${esc(van)}</b> Device ${esc(d.device||'')} · Portable ${esc(d.portable||'')}</span>`).join('')}</div>`:''}<div class="modal-actions"><button class="btn" data-action="equipment-template-csv">Download VAN/DEV/PORT layout</button><button class="btn primary" data-action="apply-equipment-import" ${count?'':'disabled'}>Fill Device + Portable cells</button></div></div></div></div>`;
  }
  if (state.modal === 'fleet-import') {
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="fleet-import-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">FLEETOS + AMAZON IMPORT</span><h2 id="fleet-import-title">Update EV battery board</h2><p>Upload both files together when you can. RelayOps matches by VIN and keeps the van name exactly like the Amazon fleet list.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="fleet-import-sources"><button class="fleet-source-card" data-action="choose-file"><strong>Amazon fleet list</strong><span>Names, VINs, license plates, Active/Inactive, Operational/Grounded</span><small>Use this for the official van name.</small></button><button class="fleet-source-card" data-action="choose-file"><strong>FleetOS tracker</strong><span>VINs, battery %, range miles, live charge readiness</span><small>Use this for battery accuracy.</small></button></div><div class="equipment-drop" id="drop-zone"><div class="equipment-drop-copy"><strong>Drop CSV or XLSX fleet files here</strong><span>Best: choose the Amazon fleet list and FleetOS tracker at the same time. Accepted columns include VIN, vehicle/name, license plate, active/inactive, operational/grounded, SOC/battery %, and range/miles.</span></div><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose fleet files</button></div><label class="equipment-text-label" for="fleet-paste-text">Or paste the copied FleetOS/Amazon table here</label><textarea id="fleet-paste-text" class="equipment-paste-text" placeholder="Vehicle Name&#9;VIN&#9;License Plate&#9;Active&#9;Operational Status&#10;LLOL EV 21&#9;7FCEHEB79PN014816&#9;9ABC123&#9;Active&#9;Operational">${esc(state.fleetPasteText)}</textarea><div class="auto-match"><strong>RelayOps will do this:</strong><div><span>✓ Match by VIN</span><span>✓ Use Amazon fleet names</span><span>✓ Update battery + status cards</span></div></div><div class="modal-actions"><button class="btn" data-action="fleet-template-csv">Need fleet example?</button><button class="btn" data-action="parse-fleet-paste">Read pasted table</button><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose fleet files</button></div><p class="upload-help">Tip: if only one file is uploaded, the Fleet board will warn whether Amazon names/status or FleetOS battery/range is missing.</p></div></div></div>`;
  }
  if (state.modal === 'screenshot' && state.screenshotPreview) return `<div class="modal-backdrop" data-action="close-modal"><div class="modal screenshot-modal" role="dialog" aria-modal="true" aria-labelledby="screenshot-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">APPROVAL REQUIRED</span><h2 id="screenshot-title">Approve GroupMe JPEG</h2><p>Only Wave, Driver/Helper, Route, Staging, Pad, EV, Device, and Portable are included.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="jpeg-preview"><img src="${state.screenshotPreview}" alt="Wave sheet JPEG preview"></div><div class="modal-actions"><button class="btn" data-action="close-modal">Go back</button><button class="btn primary" data-action="save-wave-screenshot">Approve & save JPEG</button></div></div></div></div>`;
  return '';
}

function pageContent() {
  return ({dashboard,morning:morningSheetPage,roster:rosterPage,live:livePage,team:teamPage,fleet:fleetPage,performance:performancePage,coaching:coachingPage,checklists:checklistsPage,inbox:inboxPage,inventory:inventoryPage,reports:reportsPage,admin:adminPage}[state.page] || dashboard)();
}

function render() {
  app.innerHTML = `<div class="app-shell">${sidebar()}<main class="main">${topbar()}<div class="content">${pageContent()}</div></main></div>${modal()}<div class="toast-stack" id="toast-stack"></div>`;
  bind();
}

function bind() {
  document.removeEventListener?.('paste',handleEquipmentPaste);
  document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.page)));
  document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action,el)));
  document.querySelectorAll('[data-phase]').forEach(el=>el.addEventListener('click',()=>{state.phase=Number(el.dataset.phase);persist();render();}));
  document.querySelectorAll('[data-morning-filter]').forEach(el=>el.addEventListener('change',()=>{const key=el.dataset.morningFilter;if(key!=='dsp')state.morningFilters[key]=el.value;render();}));
  document.querySelectorAll('[data-rivian-sort]').forEach(el=>el.addEventListener('change',()=>{state.fleetSort=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-filter]').forEach(el=>el.addEventListener('change',()=>{state.fleetFilter=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-search]').forEach(el=>el.addEventListener('input',()=>{state.fleetSearch=el.value;persist();render();const s=document.querySelector('[data-fleet-search]');if(s){s.focus();s.setSelectionRange(state.fleetSearch.length,state.fleetSearch.length);}}));
  document.querySelectorAll('[data-fleet-expected]').forEach(el=>el.addEventListener('input',()=>{state.fleetExpectedCount=Math.max(0,Number(el.value)||0);persist();render();const s=document.querySelector('[data-fleet-expected]');if(s){s.focus();s.setSelectionRange(s.value.length,s.value.length);}}));
  document.querySelectorAll('[data-edit-field]').forEach(el=>{
    el.addEventListener('focus',()=>selectSheetCell(el));
    el.addEventListener('mousedown',()=>selectSheetCell(el));
    el.addEventListener('blur',()=>saveMorningEditCell(el));
    el.addEventListener('keydown',e=>handleSheetKeydown(e,el));
    el.addEventListener('paste',e=>handleSheetPaste(e,el));
  });
  document.querySelectorAll('[data-check-field]').forEach(el=>el.addEventListener('change',()=>{let route=state.morningRoutes.find(r=>r.route===el.dataset.checkRoute);if(!route&&el.checked)route=createManualMorningRoute({wave:el.dataset.checkWave||'Manual'});if(route){route[el.dataset.checkField]=el.checked;persist();}}));
  const search = document.getElementById('global-search');
  if (search) search.addEventListener('input',e=>{state.search=e.target.value;if(['roster','live'].includes(state.page)){const pos=e.target.selectionStart;render();const s=document.getElementById('global-search');s.focus();s.setSelectionRange(pos,pos);}});
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
  const equipmentDrop=document.getElementById('equipment-drop');
  if(equipmentDrop) {
    ['dragenter','dragover'].forEach(ev=>equipmentDrop.addEventListener(ev,e=>{e.preventDefault();equipmentDrop.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>equipmentDrop.addEventListener(ev,e=>{e.preventDefault();equipmentDrop.classList.remove('drag');}));
    equipmentDrop.addEventListener('drop',e=>{const files=[...e.dataTransfer.files];if(files.length) readEquipmentFiles(files);});
    equipmentDrop.addEventListener('paste',e=>handleEquipmentPaste(e));
  }
  if(state.modal==='equipment') document.addEventListener?.('paste',handleEquipmentPaste);
}

function readEquipmentFiles(files) {
  state.importPurpose='equipment';
  return readFiles(files);
}

function handleEquipmentPaste(e) {
  if(state.modal!=='equipment')return;
  const files=[...(e.clipboardData?.files||[])];
  if(files.length){e.preventDefault();return readEquipmentFiles(files);}
  const text=e.clipboardData?.getData('text/plain')||'';
  if(text&&document.activeElement?.id!=='equipment-paste-text') {
    e.preventDefault();
    state.equipmentText=text;
    const details=equipmentDetailsFromText(text);
    state.equipmentImport={name:'Pasted VAN/DEV/PORT text',details};
    render();
    toast(`${Object.keys(details).length} EV/VAN assignments found`);
  }
}

function saveMorningEditCell(el) {
  const value=el.textContent.trim(), field=el.dataset.editField;
  if(!field)return null;
  if(el.dataset.editWave&&field==='padOverride') {
    state.morningRoutes.filter(r=>r.wave===el.dataset.editWave).forEach(r=>r[field]=value.toUpperCase());
    persist(); return null;
  }
  let route=state.morningRoutes.find(r=>r.route===el.dataset.editRoute);
  if(!route&&value) {
    route=createManualMorningRoute({route:field==='route'?value:'',wave:el.dataset.editWave||'Manual'});
    updateSheetRowRoute(el,route.route);
  }
  if(route) {
    const clean=['stops','packages'].includes(field)?Number(value)||0:value;
    route[field]=clean;
    if(field==='route'&&value) { route.route=value; updateSheetRowRoute(el,value); }
    if(field==='plannedRts') {
      route.plannedRtsIssue=isIrregularPlannedRts(value,route.wave);
      el.classList.toggle('flag-cell',route.plannedRtsIssue);
    }
  }
  persist();
  return route;
}

function updateSheetRowRoute(el,route) {
  el.parentElement?.querySelectorAll('[data-edit-route]').forEach(cell=>{cell.dataset.editRoute=route;});
}

function sheetCells() { return [...document.querySelectorAll('[data-sheet-cell="true"]')]; }
function selectSheetCell(el) {
  sheetCells().forEach(cell=>cell.classList.remove('sheet-active-cell','sheet-selected-cell'));
  el.classList.add('sheet-active-cell','sheet-selected-cell');
  sheetSelection={anchor:el,focus:el};
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
  const row=[...el.parentElement.parentElement.querySelectorAll('tr.ops-row')].indexOf(el.parentElement);
  const col=sheetEditFields.indexOf(el.dataset.editField);
  return {row,col};
}
function cellAt(row,col) {
  if(row<0||col<0)return null;
  const rows=[...document.querySelectorAll('tr.ops-row')];
  const field=sheetEditFields[col];
  return rows[row]?.querySelector(`[data-edit-field="${field}"]`)||null;
}
function moveSheetCell(el,dr,dc) {
  saveMorningEditCell(el);
  if(dc) {
    const rowCells=[...el.parentElement.querySelectorAll('[data-sheet-cell="true"]')];
    const next=rowCells[rowCells.indexOf(el)+dc];
    return focusSheetCell(next||el);
  }
  const pos=cellPosition(el);
  focusSheetCell(cellAt(pos.row+dr,pos.col+dc)||el);
}
function handleSheetKeydown(e,el) {
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='c') return;
  if(e.key==='Enter') { e.preventDefault(); return moveSheetCell(el,e.shiftKey?-1:1,0); }
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
  saveMorningEditCell(el);
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

function go(page) {
  if (page==='admin'&&state.role!=='admin') return toast('Owner permission required','error');
  state.page=page; state.search=''; state.modal=null; persist(); render(); window.scrollTo({top:0,behavior:'smooth'});
}

function action(name,el) {
  if (name==='menu') return document.getElementById('sidebar').classList.toggle('open');
  if (name==='import') { state.modal='import'; state.importSource='computer'; state.importPurpose='morning'; state.importedFile=null; return render(); }
  if (name==='slack-import') { state.modal='import'; state.importSource='slack'; state.importPurpose='morning'; state.importedFile=null; return render(); }
  if (name==='planned-rts-import') { state.modal='import'; state.importSource='computer'; state.importPurpose='rts'; state.importedFile=null; return render(); }
  if (name==='equipment-import') { state.modal='equipment'; state.importPurpose='equipment'; state.equipmentImport=null; return render(); }
  if (name==='fleet-import') { state.modal='fleet-import'; state.importPurpose='fleet'; return render(); }
  if (name==='set-import-source') { state.importSource=el.dataset.source; state.importedFile=null; return render(); }
  if (name==='load-slack-demo') return loadSlackDemo();
  if (name==='close-modal') { state.modal=null;state.screenshotPreview=null;return render(); }
  if (name==='choose-file') return fileInput.click();
  if (name==='apply-import') return applyImport();
  if (name==='export-menu') { state.modal='export'; return render(); }
  if (name==='export-csv') return exportCSV();
  if (name==='export-excel') return exportExcel();
  if (name==='export-fleet-csv') return exportFleetCSV();
  if (name==='export-fleet-gaps') return exportFleetGapsCSV();
  if (name==='copy') return copyRows();
  if (name==='template-csv') return downloadTemplate();
  if (name==='equipment-template-csv') return downloadEquipmentTemplate();
  if (name==='fleet-template-csv') return downloadFleetTemplate();
  if (name==='clear-morning-filters') { state.morningFilters={wave:'all',staging:'all',pad:'all'};render();return; }
  if (name==='clear-fleet-search') { state.fleetSearch='';state.fleetFilter='all';persist();render();return toast('Showing every EV again'); }
  if (name==='fleet-filter-quick') { state.fleetFilter=el.dataset.filter||'all';state.fleetSearch='';persist();render();return toast(`Fleet filtered: ${state.fleetFilter.replace('-',' ')}`); }
  if (name==='reset-fleet-demo') return resetFleetDemo();
  if (name==='toggle-morning-edit') { state.editMode=!state.editMode;render();return toast(state.editMode?'Editing is on — click any highlighted cell':'Edits saved'); }
  if (name==='toggle-fit-rows') { state.fitMorningRows=!state.fitMorningRows;persist();render();return toast(state.fitMorningRows?'Blank rows removed — waves fit driver count':'Template rows restored'); }
  if (name==='assign-ev-low') return assignElectricVehicles('low');
  if (name==='assign-ev-random') return assignElectricVehicles('random');
  if (name==='assign-gas-vans') return assignGasVehicles();
  if (name==='toggle-fleet-card') return toggleFleetCard(el.dataset.vin);
  if (name==='refresh-fleet') return refreshFleetStatus();
  if (name==='preview-wave-screenshot') return previewWaveScreenshot();
  if (name==='save-wave-screenshot') return saveWaveScreenshot();
  if (name==='export-morning') return exportMorningSheet();
  if (name==='copy-morning-visible') return copyMorningVisible();
  if (name==='open-sheets-helper') { state.sheetCopyText=morningSheetTsv(); state.modal='sheets-helper'; return render(); }
  if (name==='select-sheets-text') return selectSheetsText();
  if (name==='parse-equipment-text') return parseEquipmentTextAction();
  if (name==='apply-equipment-import') return applyEquipmentImport();
  if (name==='parse-fleet-paste') return parseFleetPasteAction();
  if (name==='rate-service') { state.rating=Number(el.dataset.rating)||0;persist();render();return toast(`Thanks — ${state.rating} stars saved`); }
  if (name==='publish') { state.rosterPublished=true;persist();render();return toast('Roster published to the team'); }
  if (name==='phase-next') { state.phase=Math.min(3,state.phase+1);persist();render();return toast(`Shift advanced to ${['Roster','Load-out','On road','Closeout'][state.phase]}`); }
  if (name==='role-preview') { state.role='dispatcher';state.page='dashboard';persist();render();return toast('Dispatcher access preview is on'); }
  if (name==='save') return toast('Organization settings saved');
  if (name==='auto-assign') return toast('Equipment auto-fill complete — no conflicts found');
  if (name==='export-report') { state.modal='export';render();return; }
  if (name==='route') return toast(`${el.dataset.route} details opened in the production build`);
  if (name==='coach') return toast(`${el.dataset.driver} coaching review opened`);
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
function isIrregularPlannedRts(value='',wave='') {
  const t=waveMinutes(value), w=waveMinutes(wave);
  if(t===9999) return Boolean(String(value||'').trim());
  if(t<8*60 || t>14*60) return true;
  return w!==9999 && Math.abs(t-w)>150;
}
function normalizeEquipmentId(value='') {
  return String(value??'').toUpperCase().replace(/\b(EV|VAN|VEHICLE|DEVICE|PORTABLE)\b/g,'').replace(/["']/g,'').replace(/[^A-Z0-9-]/g,'').replace(/^0+(?=\d)/,'');
}
function cleanEquipmentValue(value='') {
  const text=String(value??'').replace(/["']/g,'').trim();
  return text || '-';
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
  details[key]={device:cleanEquipmentValue(device),portable:cleanEquipmentValue(portable)};
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
async function parseUploadedFile(file) {
  const name=file.name.toLowerCase(); let rows;
  if(/^image\//.test(file.type)||/\.(png|jpe?g|webp)$/i.test(name)) return {name:file.name,rows:[],text:await readImageText(file),kind:'image'};
  if(file.type==='application/pdf'||name.endsWith('.pdf')) return {name:file.name,rows:[],text:await readPdfText(await file.arrayBuffer()),kind:'pdf'};
  if(name.endsWith('.csv')) rows=parseCSV(await file.text());
  else if(name.endsWith('.xlsx')) rows=await parseXlsxArrayBuffer(await file.arrayBuffer());
  else return {name:file.name,rows:[],text:await file.text().catch(()=>''),kind:'text'};
  if(rows.length<2) throw new Error('empty');
  return {name:file.name,rows};
}
async function readImageText(file) {
  try {
    if(typeof TextDetector==='undefined'||typeof createImageBitmap==='undefined') return '';
    const detector=new TextDetector();
    const bitmap=await createImageBitmap(file);
    const results=await detector.detect(bitmap);
    return detectionsToText(results);
  } catch { return ''; }
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
    const raw=pdfBytesToLatin1(buffer), pieces=[];
    raw.replace(/\((?:\\.|[^\\)])*\)\s*Tj/g,match=>{pieces.push(decodePdfString(match.replace(/\)\s*Tj$/,'').slice(1)));return match;});
    raw.replace(/\[(.*?)\]\s*TJ/gs,(_,body)=>{body.replace(/\((?:\\.|[^\\)])*\)/g,s=>{pieces.push(decodePdfString(s.slice(1,-1)));return s;});return _;});
    if(!pieces.length) raw.replace(/\((?:\\.|[^\\)]){1,80}\)/g,s=>{const text=decodePdfString(s.slice(1,-1)).trim();if(/[A-Za-z0-9-]{1,}/.test(text))pieces.push(text);return s;});
    return pieces.join('\n');
  } catch { return ''; }
}
async function readFiles(files) {
  try {
    const parsed=await Promise.all(files.map(parseUploadedFile));
    if(state.importPurpose==='equipment') {
      const textParts=parsed.map(f=>f.text||rowsToText(f.rows)).filter(Boolean);
      const details=textParts.reduce((all,text)=>({...all,...equipmentDetailsFromText(text)}),{});
      const rowDetails=parsed.reduce((all,f)=>({...all,...equipmentDetailsFromRows(f.rows||[])}),{});
      state.equipmentText=textParts.join('\n').trim()||state.equipmentText;
      state.equipmentImport={name:parsed.map(f=>f.name).join(' + '),details:{...details,...rowDetails}};
      const count=Object.keys(state.equipmentImport.details).length;
      state.modal='equipment';render();
      return toast(count?`${count} EV/VAN assignments ready to match`:'No EV/VAN assignments found yet — paste the screenshot text or try a clearer image/PDF','error');
    }
    if(state.importPurpose==='fleet') {
      const vehicles=parsed.flatMap(f=>fleetDetailsFromRows(f.rows||[],f.name));
      if(!vehicles.length) throw new Error('no fleet rows');
      const combinedVehicles=rememberFleetSourceUpload(vehicles,parsed.map(f=>f.name).join(' + '),new Date().toISOString());
      const total=applyFleetVehicles(combinedVehicles);
      state.modal=null; state.page='fleet';
      persist(); render();
      return toast(`${vehicles.length} fleet rows read · ${state.fleetUpdateSummary.updated} changed · ${total} EV cards tracked`);
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
    console.error(error);toast(state.importPurpose==='fleet'?'Could not find VIN rows. Use a CSV/XLSX export with a VIN column.':'These files could not be read. Choose DAYOFOPSPLAN and ROUTE_DJT6 as CSV or XLSX.','error');
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
  const wanted=names.map(normalizeHeader);
  const ix=headers.findIndex(h=>wanted.includes(normalizeHeader(h)));
  return ix>=0?row[ix]:'';
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
function normalizeOperational(value='',fallback='Operational') {
  const s=String(value||'').toLowerCase();
  if(/grounded|outofservice|out of service|service|repair|maintenance|disabled|inactive/.test(s))return 'Grounded';
  if(/operational|active|ready|available|in service|inservice/.test(s))return 'Operational';
  return fallback;
}
function normalizeFleetVehicle(vehicle={}) {
  const battery=Math.max(0,Math.min(100,Math.round(numberFrom(vehicle.battery,63))));
  return {
    name:String(vehicle.name||vehicle.vin||'Unnamed EV').trim(),
    vin:cleanVin(vehicle.vin)||String(vehicle.vin||'').trim().toUpperCase(),
    plate:String(vehicle.plate||'').trim(),
    battery,
    miles:Math.max(0,Math.round(numberFrom(vehicle.miles,Math.round(battery*1.56)))),
    active:normalizeActive(vehicle.active||vehicle.status,vehicle.active||'Active'),
    operational:normalizeOperational(vehicle.operational||vehicle.status,vehicle.operational||'Operational'),
    status:String(vehicle.status||batteryLabel(battery)).trim(),
    source:String(vehicle.source||'Demo data').trim(),
    changedFields:Array.isArray(vehicle.changedFields)?vehicle.changedFields:[],
    updated:Boolean(vehicle.updated),
    updatedAt:String(vehicle.updatedAt||'').trim(),
    hasName:Boolean(vehicle.hasName),
    hasPlate:Boolean(vehicle.hasPlate),
    hasActive:Boolean(vehicle.hasActive),
    hasOperational:Boolean(vehicle.hasOperational),
    hasBattery:Boolean(vehicle.hasBattery),
    hasMiles:Boolean(vehicle.hasMiles)
  };
}
function fleetDetailsFromRows(rows=[],sourceName='Fleet export') {
  const header=findImportHeader(rows,[['vin','vehicleidentificationnumber','vehiclevin']]);
  if(header<0)return [];
  const headers=rows[header].map(v=>String(v||''));
  const source=/amazon|logistics|fleet.?management/i.test(sourceName)?'Amazon fleet list':(/rivian|fleetos|tracker/i.test(sourceName)?'FleetOS tracker':'Fleet export');
  return rows.slice(header+1).map(row=>{
    const vin=cleanVin(firstExisting(row,headers,['vin','vin number','vinnumber','vehicle identification number','vehicleidentificationnumber','vehicle vin','vehiclevin','vehicle id','vehicleid']));
    if(!vin)return null;
    const rawName=firstExisting(row,headers,['vehicle','vehicle name','vehiclename','name','asset','asset id','assetid','fleet id','fleetid','van','ev','display name','displayname','vehicle display name','vehicledisplayname','unit','unit number','unitnumber']);
    const name=rawName||vin;
    const plate=firstExisting(row,headers,['license plate','licenseplate','plate','plate number','platenumber','registration','registration number','registrationnumber','license','tag']);
    const active=firstExisting(row,headers,['active','activity status','activitystatus','lifecycle status','lifecyclestatus','vehicle status','vehiclestatus','availability','availability status','availabilitystatus','assignment status','assignmentstatus','status']);
    const operational=firstExisting(row,headers,['operational','operation status','operationstatus','operational status','operationalstatus','grounded','grounding status','groundingstatus','state','vehicle state','vehiclestate','service status','servicestatus','maintenance status','maintenancestatus','status']);
    const battery=firstExisting(row,headers,['battery','battery %','battery percent','batterypercentage','battery percentage','soc','soc %','socpercent','state of charge','stateofcharge','state of charge %','stateofchargepercent','charge','charge %','charge percent','chargepercent']);
    const miles=firstExisting(row,headers,['range','range miles','rangemiles','estimated range','estimatedrange','estimated range miles','estimatedrangemiles','estimated range (mi)','remaining miles','remainingmiles','miles remaining','milesremaining']);
    const item=normalizeFleetVehicle({vin,name,plate,battery:numberFrom(battery,undefined),miles:numberFrom(miles,undefined),active,operational,status:active||operational||'',source});
    item.hasName=Boolean(String(rawName||'').trim());
    item.hasPlate=Boolean(String(plate||'').trim());
    item.hasActive=Boolean(String(active||'').trim());
    item.hasOperational=Boolean(String(operational||'').trim());
    item.hasBattery=String(battery??'').trim()!=='';
    item.hasMiles=String(miles??'').trim()!=='';
    return item;
  }).filter(Boolean);
}
function fleetChangedFields(before={},after={}) {
  if(!before.vin)return ['new EV'];
  const labels={name:'name',plate:'plate',battery:'battery',miles:'range',active:'active status',operational:'operational state'};
  return Object.entries(labels).filter(([key])=>String(before[key]??'')!==String(after[key]??'')).map(([,label])=>label);
}
function mergeFleetVehicles(imports=[]) {
  const previousByVin=new Map(rivianFleet.map(v=>[cleanVin(v.vin),normalizeFleetVehicle(v)]));
  const byVin=new Map();
  const nowIso=new Date().toISOString();
  const touched=new Set(), newVins=new Set(), seenImportRows=new Set(), duplicateVins=new Set();
  imports.forEach(item=>{
    const vin=cleanVin(item.vin); if(!vin)return;
    const rowKey=`${vin}|${item.source||'unknown'}`;
    if(seenImportRows.has(rowKey))duplicateVins.add(vin);
    seenImportRows.add(rowKey);
    const current=byVin.get(vin)||previousByVin.get(vin)||{};
    if(!previousByVin.has(vin))newVins.add(vin);
    touched.add(vin);
    const next={...current,...item,vin};
    if(item.source==='Amazon fleet list'&&item.name) next.name=item.name;
    else if(current.name&&!/^EDV-\d+$/i.test(current.name)) next.name=current.name;
    if(!item.hasName&&current.name) next.name=current.name;
    if(!item.hasPlate&&current.plate) next.plate=current.plate;
    if(!item.hasActive&&current.active) next.active=current.active;
    if(!item.hasOperational&&current.operational) next.operational=current.operational;
    if(!item.hasBattery&&current.battery!==undefined) next.battery=current.battery;
    if(!item.hasMiles&&current.miles!==undefined) next.miles=current.miles;
    next.source=[current.source,item.source].filter(Boolean).join(' + ').split(' + ').filter((v,i,a)=>a.indexOf(v)===i).join(' + ')||'FleetOS + Amazon';
    const normalized=normalizeFleetVehicle(next);
    normalized.changedFields=fleetChangedFields(current,normalized);
    normalized.updated=normalized.changedFields.length>0;
    normalized.updatedAt=normalized.updated?nowIso:(current.updatedAt||normalized.updatedAt||'');
    byVin.set(vin,normalized);
  });
  const rows=[...byVin.values()].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})||a.vin.localeCompare(b.vin));
  const updated=rows.filter(v=>touched.has(cleanVin(v.vin))&&v.updated).length;
  const removed=[...previousByVin.keys()].filter(vin=>!touched.has(vin)).length;
  rows.summary={input:imports.length,touched:touched.size,newCount:newVins.size,updated,unchanged:Math.max(0,touched.size-updated),removed,duplicates:duplicateVins.size,duplicateVins:[...duplicateVins]};
  return rows;
}
function applyFleetVehicles(vehicles=[],options={}) {
  const merged=mergeFleetVehicles(vehicles);
  rivianFleet.splice(0,rivianFleet.length,...merged);
  state.fleetChangedVins=Object.fromEntries(merged.filter(v=>v.updated).map(v=>[v.vin,v.changedFields]));
  state.fleetUpdateSummary={...(merged.summary||{}),visible:sortedRivianFleet().length};
  if(!options.silent) {
    state.fleetLastRefresh=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    persist();
    render();
  }
  return merged.length;
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
  let fallback=[];
  for(const path of paths) {
    const rows=parseWorksheetXml(await read(path),shared); if(!rows.length)continue; if(!fallback.length)fallback=rows;
    const header=rows.findIndex(row=>{const cells=row.map(v=>String(v).toLowerCase().replace(/[^a-z0-9]/g,''));return cells.includes('dsp')&&cells.includes('routecode')&&cells.includes('wave')&&cells.includes('staginglocation');});
    if(header>=0) return rows.slice(header);
  }
  return fallback;
}

function applyImport() {
  const f=state.importedFile;if(!f)return;
  if(f.kind==='details'||f.kind==='rts') {
    let matched=0, flagged=0;
    state.morningRoutes.forEach(route=>{const detail=f.routeDetails?.[String(route.route).toUpperCase()];if(!detail)return;matched++;if(f.kind==='details'){if(detail.driver)route.driver=firstDriverName(detail.driver);if(detail.stops!==null)route.stops=detail.stops;}if(detail.plannedRts){route.plannedRts=detail.plannedRts;route.plannedRtsIssue=isIrregularPlannedRts(detail.plannedRts,route.wave);if(route.plannedRtsIssue)flagged++;}});
    state.modal=null;state.page='morning';state.editMode=false;persist();render();return toast(f.kind==='rts'?`${matched} Planned RTS times filled · ${flagged} flagged for review`:`${matched} CX routes updated with driver names and stop counts`);
  }
  const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
  const index=(...names)=>{const n=names.map(norm);return f.headers.findIndex(h=>n.includes(norm(h)));};
  const ix={dsp:index('dsp','dspcode','company'),route:index('route','routecode','cxnumber','cxroute','blockid'),driver:index('driver','drivername','transportername','employeename','daname','associatename','da'),service:index('servicetype','service'),wave:index('wave','wave time','wavetime','starttime'),staging:index('staging','staginglocation'),duration:index('routeduration','duration'),zones:index('numzones','zones'),commercial:index('numcommercialpkgs','commercialpackages','commercial'),van:index('van','vehicle','vehicleid'),device:index('device','deviceid'),stops:index('stops','stopcount','plannedstops','stopsplanned','numstops'),packages:index('packages','packagecount','numpackages')};
  if(ix.wave>=0&&ix.staging>=0) {
    const candidates=f.rows.filter(r=>ix.dsp<0||String(r[ix.dsp]).trim().toUpperCase()===state.dspCode);
    const excluded=f.rows.length-candidates.length;
    state.morningRoutes=candidates.map((r,i)=>{
      const route=r[ix.route]||`IMP-${i+1}`, known=morningSeed.find(x=>x.route===route), detail=f.routeDetails?.[String(route).trim().toUpperCase()];
      const packages=Number(r[ix.packages])||known?.packages||0, zones=Number(r[ix.zones])||known?.zones||0;
      const importedStops=Number(r[ix.stops]);
      const wave=r[ix.wave]||'Wave pending', plannedRts=detail?.plannedRts||known?.plannedRts||'';
      return {dsp:ix.dsp>=0?String(r[ix.dsp]).trim().toUpperCase():state.dspCode,driver:firstDriverName(detail?.driver||(ix.driver>=0&&r[ix.driver])||known?.driver||'Unassigned driver'),route,service:(ix.service>=0&&r[ix.service])||known?.service||'Standard Parcel',wave,staging:r[ix.staging]||'—',duration:Number(r[ix.duration])||known?.duration||0,zones,packages,commercial:Number(r[ix.commercial])||known?.commercial||0,stops:detail?.stops!==null&&detail?.stops!==undefined?detail.stops:(Number.isFinite(importedStops)&&importedStops?importedStops:known?.stops||Math.round(135+zones*2.2)),eta:known?.eta||'—',bags:known?.bags||Math.max(1,Math.round(packages/13)),overflow:known?.overflow||Math.max(0,Math.round(packages/24)),parking:known?.parking||'',ev:known?.ev||'',deviceName:known?.deviceName||'',portable:known?.portable||'',preDvic:Boolean(known?.preDvic),preWhip:Boolean(known?.preWhip),postDvic:Boolean(known?.postDvic),postWhip:Boolean(known?.postWhip),rescued:Boolean(known?.rescued),packageReturns:known?.packageReturns||'',endTime:known?.endTime||'',rtsTime:known?.rtsTime||'',plannedRts,plannedRtsIssue:isIrregularPlannedRts(plannedRts,wave),clockOutTime:known?.clockOutTime||'',checkedIn:Boolean(known?.checkedIn),vanReady:Boolean(known?.vanReady),deviceReady:Boolean(known?.deviceReady),portableReady:Boolean(known?.portableReady),loadReady:false};
    }).sort((a,b)=>waveMinutes(a.wave)-waveMinutes(b.wave)||routeCompare(a.route,b.route)||a.staging.localeCompare(b.staging,undefined,{numeric:true}));
    state.routes=state.morningRoutes.map((r,i)=>({route:r.route,driver:r.driver,id:`DA-${1100+i}`,wave:r.wave,staging:r.staging,van:'Unassigned',device:'Unassigned',stops:r.stops,packages:r.packages,progress:0,delta:0,status:r.driver==='Unassigned driver'?'Needs review':'Assigned',rescue:'—'}));
    state.lastImportExcluded=excluded;state.modal=null;state.page='morning';state.morningFilters={wave:'all',staging:'all',pad:'all'};state.rosterPublished=false;persist();render();return toast(`${state.morningRoutes.length} ${state.dspCode} routes loaded · ${excluded} other-DSP routes excluded`);
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
  let matched=0, missing=[];
  state.morningRoutes.forEach(route=>{
    const key=normalizeEquipmentId(route.ev);
    if(!key)return;
    const item=details[key];
    if(!item){missing.push(key);return;}
    matched++;
    route.deviceName=item.device||'';
    route.portable=item.portable||'';
  });
  state.modal=null;state.page='morning';persist();render();
  toast(`${matched} EV/VAN rows updated${missing.length?` · ${missing.length} EVs not found in import`:''}`);
}

function morningAssignmentTargets() {
  return filteredMorningRows().map(row=>state.morningRoutes.find(r=>r.route===row.route)).filter(r=>r&&r.dsp===state.dspCode&&r.route&&!String(r.route).startsWith('__blank_'));
}
function shuffled(values) {
  const copy=[...values];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
function fillEquipmentForRoute(route) {
  const item=state.equipmentImport?.details?.[normalizeEquipmentId(route.ev)];
  if(item){route.deviceName=item.device||'';route.portable=item.portable||'';}
  else {route.deviceName=route.deviceName||'';route.portable=route.portable||'';}
}
function assignElectricVehicles(mode='low') {
  const targets=morningAssignmentTargets();
  if(!targets.length)return toast('No visible driver rows to assign','error');
  const vans=mode==='random'?shuffled(Array.from({length:57},(_,i)=>String(i+1))):Array.from({length:57},(_,i)=>String(i+1));
  targets.forEach((route,i)=>{route.ev=vans[i%vans.length];fillEquipmentForRoute(route);});
  persist();render();
  toast(`${targets.length} EVs assigned ${mode==='random'?'randomly':'lowest to highest'}${targets.length>57?' · numbers repeated after 57':''}`);
}
function assignGasVehicles() {
  const targets=morningAssignmentTargets().filter((_,i)=>i<gasVehicleIds.length);
  if(!targets.length)return toast('No visible driver rows to assign gas vehicles','error');
  targets.forEach((route,i)=>{route.ev=gasVehicleIds[i];fillEquipmentForRoute(route);});
  persist();render();
  toast(`${targets.length} gas vehicles assigned: ${gasVehicleIds.slice(0,targets.length).join(', ')}`);
}

function toggleFleetCard(vin='') {
  state.expandedFleetVin=state.expandedFleetVin===vin?'':vin;
  persist();render();
}

function refreshFleetStatus() {
  if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
  if(state.fleetImport?.vehicles?.length) {
    const total=applyFleetVehicles(state.fleetImport.vehicles);
    const stats=fleetPortalMatchStats();
    const missing=[];
    if(!stats.amazon.size)missing.push('Amazon fleet list');
    if(!stats.fleetos.size)missing.push('FleetOS tracker');
    toast(`${state.fleetUpdateSummary.updated} changed · ${total} EV cards refreshed from saved ${stats.amazon.size?'Amazon':''}${stats.amazon.size&&stats.fleetos.size?' + ':''}${stats.fleetos.size?'FleetOS':''} upload${missing.length?` · upload ${missing.join(' + ')} for full accuracy`:''}`);
    return;
  }
  state.modal='fleet-import';
  state.importPurpose='fleet';
  persist();render();
  toast('Upload the latest FleetOS/Amazon export first so refresh stays accurate. No demo battery changes were made.','error');
}

function resetFleetDemo() {
  rivianFleet.splice(0,rivianFleet.length,...demoRivianFleet.map(v=>normalizeFleetVehicle(v)));
  state.fleetImport=null;
  state.fleetSourceUploads={};
  state.fleetUpdateSummary=null;
  state.fleetChangedVins={};
  state.fleetSearch='';
  state.fleetFilter='all';
  state.fleetSort='normal';
  state.expandedFleetVin='';
  state.fleetLastRefresh='Not refreshed yet';
  persist();render();
  toast('Fleet upload cleared — demo EV board restored');
}

const exportHeaders=['Route','Driver','Driver ID','Wave','Staging','Vehicle','Device','Stops','Packages','Progress %','Pace Delta','Status','Rescue Plan'];
function exportRows(){return routeFiltered().map(r=>[r.route,r.driver,r.id,r.wave,r.staging,r.van,r.device,r.stops,r.packages,r.progress,r.delta,r.status,r.rescue]);}
function csvEscape(v){const s=String(v??'');return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
function downloadBlob(data,type,name){const blob=new Blob([data],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);}
async function writeClipboardText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const area=document.createElement('textarea');
    area.value=text; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.left='-9999px'; area.style.top='0';
    document.body.appendChild(area); area.select(); const ok=document.execCommand('copy'); area.remove(); return ok;
  } catch { return false; }
}
function exportCSV(){const csv=[exportHeaders,...exportRows()].map(r=>r.map(csvEscape).join(',')).join('\r\n');downloadBlob('\ufeff'+csv,'text/csv;charset=utf-8','relayops-daily-roster.csv');state.modal=null;render();toast('CSV downloaded — ready for Google Sheets');}
function fleetExportRows() {
  return sortedRivianFleet().map(v=>{
    const confidence=fleetConfidence(v), missing=fleetMissingFields(v), changes=state.fleetChangedVins?.[v.vin]||v.changedFields||[];
    return [v.name,v.vin,v.plate||'',v.active||'',v.operational||'',v.battery,v.miles,confidence.label,missing.join('; '),changes.join('; '),v.updatedAt||'',fleetSourceUploadedAt('amazon','iso'),fleetSourceUploadedAt('fleetos','iso'),v.source||'Demo data'];
  });
}
function exportFleetCSV(){const h=['Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles','Confidence','Needs','Changed Fields','Last Changed At','Amazon Uploaded At','FleetOS Uploaded At','Source'];const rows=fleetExportRows();downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8','relayops-ev-fleet-board.csv');toast(`${rows.length} EV rows downloaded`);}
function fleetGapRows() {
  const stats=fleetPortalMatchStats(), byVin=new Map(rivianFleet.map(v=>[cleanVin(v.vin),v])), rows=[];
  const vehicleRow=(issue,vin,fix)=>{
    const v=byVin.get(cleanVin(vin))||{};
    rows.push([issue,vin,v.name||'',v.plate||'',v.active||'',v.operational||'',v.battery??'',v.miles??'',fix]);
  };
  stats.amazonOnly.forEach(vin=>vehicleRow('Missing FleetOS battery/range',vin,'Upload FleetOS tracker row for this VIN'));
  stats.fleetosOnly.forEach(vin=>vehicleRow('Missing Amazon name/status',vin,'Upload Amazon fleet-list row for this VIN'));
  const expected=Number(state.fleetExpectedCount)||0, short=Math.max(0,expected-stats.uniqueVins.size);
  if(short) rows.push(['Expected EV count short','',`Tracked ${stats.uniqueVins.size} of expected ${expected}`,'','','','','',`Find ${short} missing VIN${short===1?'':'s'} in Amazon/FleetOS exports`]);
  return rows;
}
function exportFleetGapsCSV(){const h=['Issue','VIN','Vehicle Name','License Plate','Active','Operational Status','Battery %','Range Miles','Fix'];const rows=fleetGapRows();downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8','relayops-ev-source-gaps.csv');toast(rows.length?`${rows.length} Fleet gap rows downloaded`:'No Fleet gaps found — source match looks complete');}
function exportExcel(){
  const rows=[exportHeaders,...exportRows()];
  const xml=`<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1D4D35" ss:Pattern="Solid"/></Style><Style ss:ID="Cell"><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E6DF"/></Borders></Style></Styles><Worksheet ss:Name="Daily Roster"><Table>${rows.map((r,i)=>`<Row>${r.map(v=>`<Cell ss:StyleID="${i===0?'Header':'Cell'}"><Data ss:Type="${typeof v==='number'?'Number':'String'}">${xmlEscape(v)}</Data></Cell>`).join('')}</Row>`).join('')}</Table><AutoFilter xmlns="urn:schemas-microsoft-com:office:excel" x:Range="R1C1:R${rows.length}C${exportHeaders.length}" xmlns:x="urn:schemas-microsoft-com:office:excel"/></Worksheet></Workbook>`;
  downloadBlob(xml,'application/vnd.ms-excel','relayops-daily-roster.xls');state.modal=null;render();toast('Excel workbook downloaded');
}
async function copyRows(){const text=[exportHeaders,...exportRows()].map(r=>r.join('\t')).join('\n');if(await writeClipboardText(text)){state.modal=null;render();toast('Copied — paste into cell A1 in Google Sheets');}else toast('Clipboard access was blocked; use CSV download instead','error');}
function morningSheetCopyRows() {
  const headers=['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','PRE DVIC','PRE-WHIP','POST DVIC','POST-WHIP','RESCUED','STOP COUNT','PACKAGE COUNT','PACKAGE RETURNS','END TIME','RTS TIME','PLANNED RTS','CLOCK OUT TIME'];
  const lines=[headers];
  morningSections(filteredMorningRows()).forEach(section=>{
    const rows=morningDisplayRows(section);
    rows.forEach((r,i)=>lines.push([
      i===0?section.label:'',
      r.driver||'',
      r._blank?'':r.route||'',
      r.staging||'',
      i===0?(section.rows[0]?.padOverride||section.rows[0]?.pad||''):'',
      r.ev||'',
      r.deviceName||'',
      r.portable||'',
      r.preDvic?'✓':'',
      r.preWhip?'✓':'',
      r.postDvic?'✓':'',
      r.postWhip?'✓':'',
      r.rescued?'✓':'',
      r.stops||'',
      r.packages||'',
      r.packageReturns||'',
      r.endTime||'',
      r.rtsTime||'',
      r.plannedRts||'',
      r.clockOutTime||''
    ]));
    if(section.wave) lines.push([`${String(section.wave).replace(/\s*[AP]M/i,'')} (${section.rows.length})`,...Array(19).fill('')]);
  });
  return lines;
}
function morningSheetTsv(){ return morningSheetCopyRows().map(row=>row.join('\t')).join('\n'); }
async function copyMorningVisible(){
  state.sheetCopyText=morningSheetTsv();
  const board=document.querySelector('.morning-board');
  if(board){board.classList.add('sheet-copy-highlight');setTimeout(()=>board.classList.remove('sheet-copy-highlight'),1400);}
  if(await writeClipboardText(state.sheetCopyText)) toast('Google Sheets table copied — highlighted blue like Sheets. Click A1 in Google Sheets and paste');
  else toast('Clipboard access was blocked; use Export sheet instead','error');
}
function selectSheetsText(){
  const el=document.getElementById('sheets-copy-text');
  if(!el)return;
  el.focus(); el.select();
  toast('Paste box selected — press ⌘C, then paste into Google Sheets A1');
}
function loadSlackDemo(){
  const headers=['DSP','Driver','Route Code','Service Type','Wave','Staging Location','Route Duration','Num Zones','Num Packages','Num Commercial Pkgs','Stops'];
  const rows=morningSeed.map(r=>[r.dsp,r.driver,r.route,r.service,r.wave,r.staging,r.duration,r.zones,r.packages,r.commercial,r.stops]);
  rows.splice(5,0,['OTHER','Other DSP Driver','ZZ101','Standard Parcel','11:10 AM','STG.A.1',390,19,301,11,172],['OTHER','Another DSP Driver','ZZ102','Standard Parcel','11:15 AM','STG.A.2',405,22,344,16,181],['TEST','Test DSP Driver','ZZ103','Standard Parcel','11:20 AM','STG.B.1',420,23,355,9,185]);
  state.importedFile={name:'day-of-operations-07-02.csv',headers,rows,kind:'plan',routeDetails:{},routeDetailsCount:0};render();toast('Slack demo file selected · DSP filter preview ready');
}
function exportMorningSheet(){const h=['Wave','Driver','Route','Staging','Pad','EV','Device','Portable','Pre DVIC','Pre-Whip','Post DVIC','Post-Whip','Rescued','Stop Count','Package Count','Package Returns','End Time','RTS Time','Planned RTS','Clock Out Time'];const rows=filteredMorningRows().map(r=>[r.wave,r.driver,r.route,r.staging,r.pad,r.ev||'',r.deviceName||'',r.portable||'',r.preDvic?'Yes':'No',r.preWhip?'Yes':'No',r.postDvic?'Yes':'No',r.postWhip?'Yes':'No',r.rescued?'Yes':'No',r.stops,r.packages,r.packageReturns||'',r.endTime||'',r.rtsTime||'',r.plannedRts||'',r.clockOutTime||'']);downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8',`${state.dspCode}-opening-operations.csv`);toast('Morning operations sheet downloaded');}
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
function previewWaveScreenshot(){const rows=filteredMorningRows();if(!rows.length)return toast('No wave rows are visible to capture','error');state.screenshotPreview=buildWaveScreenshot(rows);state.modal='screenshot';render();}
function saveWaveScreenshot(){if(!state.screenshotPreview)return;const a=document.createElement('a');a.href=state.screenshotPreview;a.download=`${state.dspCode}-${state.morningFilters.wave==='all'?'all-waves':state.morningFilters.wave.replace(/[^a-z0-9]+/gi,'-')}.jpg`;document.body.appendChild(a);a.click();a.remove();state.modal=null;state.screenshotPreview=null;render();toast('Approved JPEG saved — ready for GroupMe');}
function downloadTemplate(){const h=['DSP','Driver','Route Code','Service Type','Wave','Staging Location','Route Duration','Num Zones','Num Packages','Num Commercial Pkgs','Stops'];const a=['LLOL','Maya Collins','CX249','Standard Parcel Electric','11:15 AM','STG.V.1','420','21','332','12','188'];const b=['OTHER','Other DSP Driver','ZZ101','Standard Parcel','11:10 AM','STG.A.1','390','19','301','11','172'];downloadBlob(`${h.join(',')}\r\n${a.join(',')}\r\n${b.join(',')}\r\n`,'text/csv','day-of-operations-import-template.csv');toast('Day-of-operations template downloaded');}
function downloadEquipmentTemplate(){
  const h=['EV/VAN','DEVICE','PORTABLE'];
  const rows=[
    ['1','40','31'],['2','41','32'],['3','42','33'],['21','60','51'],['37','31','-'],['40','34','r'],['43','37','cc'],['58','52','9'],
    ['F33','',''],['F34','',''],['R35','',''],['R36','',''],['R54','',''],['R55','',''],['R62','',''],['H1','',''],['H2','',''],['H3','',''],['H4','','']
  ];
  downloadBlob('\ufeff'+[h,...rows].map(r=>r.map(csvEscape).join(',')).join('\r\n')+'\r\n','text/csv;charset=utf-8','van-dev-port-google-sheets-layout.csv');
  toast('VAN/DEV/PORT Google Sheets layout downloaded');
}
function downloadFleetTemplate(){const h=['Source','Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles','Dispatcher Note'];const amazon=['Amazon fleet list','LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational','','','Official name/status row'];const fleetos=['FleetOS tracker','','7FCEHEB79PN014816','','','','63%','98','Battery/range row for same VIN'];const both=['Amazon + FleetOS','LLOL EV 22','7FCTGAAA1PN000184','9XYZ222','Active','Operational','88%','137','One complete combined row also works'];downloadBlob(`${h.map(csvEscape).join(',')}\r\n${amazon.map(csvEscape).join(',')}\r\n${fleetos.map(csvEscape).join(',')}\r\n${both.map(csvEscape).join(',')}\r\n`,'text/csv','fleetos-amazon-ev-import-template.csv');toast('FleetOS/Amazon EV template downloaded');}

function xmlEscape(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function persist(){localStorage.setItem('relayops_page',state.page);localStorage.setItem('relayops_role',state.role);localStorage.setItem('relayops_phase',state.phase);localStorage.setItem('relayops_routes',JSON.stringify(state.routes));localStorage.setItem('relayops_morning',JSON.stringify(state.morningRoutes));localStorage.setItem('relayops_dsp',state.dspCode);localStorage.setItem('relayops_excluded',state.lastImportExcluded);localStorage.setItem('relayops_published',state.rosterPublished);localStorage.setItem('relayops_rating',state.rating);localStorage.setItem('relayops_fit_rows',state.fitMorningRows);localStorage.setItem('relayops_fleet_sort',state.fleetSort);localStorage.setItem('relayops_fleet_filter',state.fleetFilter);localStorage.setItem('relayops_fleet_search',state.fleetSearch);localStorage.setItem('relayops_expanded_fleet_vin',state.expandedFleetVin);localStorage.setItem('relayops_fleet_refresh',state.fleetLastRefresh);localStorage.setItem('relayops_fleet_import',JSON.stringify(state.fleetImport||null));localStorage.setItem('relayops_fleet_source_uploads',JSON.stringify(state.fleetSourceUploads||{}));localStorage.setItem('relayops_fleet_expected_count',state.fleetExpectedCount||0);}
function toast(message,type='success') { let stack=document.getElementById('toast-stack');if(!stack){stack=document.createElement('div');stack.id='toast-stack';stack.className='toast-stack';document.body.appendChild(stack);}const el=document.createElement('div');el.className=`toast ${type}`;el.innerHTML=`<span class="toast-icon">${type==='error'?'!':'✓'}</span><span>${esc(message)}</span>`;stack.appendChild(el);setTimeout(()=>el.remove(),3200); }

render();
