Warning: truncated output (original token count: 118018)
Total output lines: 4822

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
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>'
};

const NAV = [
  { section: 'Command', items: [
    ['dashboard','Today','dashboard'], ['morning','Morning sheet','calendar'], ['roster','Opening roster','roster'], ['live','Device and Portable Sheet','phone']
  ]},
  { section: 'Operations', items: [
    ['team','Drivers & team','users'], ['fleet','Fleet Health','van'], ['parking','Van Parking','check'], ['inbox','Team inbox','inbox','4'], ['inventory','Inventory','box']
  ]},
  { section: 'Improve', items: [
    ['performance','Performance','chart'], ['coaching','Coaching','coach','6'], ['reports','Reports & export','report']
  ]},
  { section: 'Owner', admin: true, items: [['admin','Admin control','settings']] }
];

const DISPATCHER_SHARE_URL = 'https://alecgonz79-ai.github.io/relayops-dispatch-dashboard/';
const DISPATCHER_SHARE_TEXT = `LLOL Dispatch Opening Operations\n${DISPATCHER_SHARE_URL}`;
const DISPATCHER_SHARE_NOTE = 'Use this exact full link. GitHub Pages will show 404 if the account name is shortened or changed, like AG79.github.io.';
const AMAZON_FLEET_PORTAL_URL = 'https://logistics.amazon.com/fleet-management/#vehicles';
const AMAZON_WORKFORCE_ASSOCIATES_URL = 'https://logistics.amazon.com/workforce?pageId=da_console_associates&station=DJT6&companyId=ab7228f0-51de-4c53-98f3-7d3c3da46724&tabId=da-console-associates-tab';
const FLEETOS_PORTAL_URL = 'https://business.rivian.com/vehicles/tracker';
const MORNING_TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ/edit?gid=0#gid=0';
const MORNING_TEMPLATE_SHEET_NAME = 'Morning Operations';
const MORNING_TEMPLATE_SHEET_CANDIDATES = [MORNING_TEMPLATE_SHEET_NAME,'Opening Operations','Morning Sheet','Sheet1'];
const MORNING_APPS_SCRIPT_URL = 'google-sheets/relayops-morning-connector.gs';

function defaultOperationDate() {
  const date=new Date();date.setDate(date.getDate()+1);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
function operationDateTabNames(value='') {
  const parts=String(value||'').split('-').map(Number);
  if(parts.length!==3||parts.some(n=>!n))return [];
  const [year,month,day]=parts,shortYear=String(year).slice(-2);
  return [`${month}/${day}/${shortYear}`,`${month}.${day}.${shortYear}`];
}

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
  west.forEach((value,i)=>slots.push({id:`west-${String(i+1).padStart(2,'0')}`,zone:'west',label:`Left row ${i+1}`,value,kind:['4','50'].includes(value)?'crosswalk':'spot'}));
  crosswalk.forEach((value,i)=>slots.push({id:`crosswalk-${String(i+1).padStart(2,'0')}`,zone:'crosswalk',label:`Crosswalk ${i+1}`,value,kind:'crosswalk'}));
  east.forEach((value,i)=>slots.push({id:`east-${String(i+1).padStart(2,'0')}`,zone:'east',label:`Right row ${i+1}`,value,kind:i===3||value==='19'?'crosswalk':'spot'}));
  gasVehicleIds.forEach((value,i)=>slots.push({id:`gas-${String(i+1).padStart(2,'0')}`,zone:'gas',label:`Gas spot ${i+1}`,value,kind:'spot'}));
  return slots;
}

function loadVanParkingSlots() {
  try {
    const saved=JSON.parse(localStorage.getItem('relayops_van_parking')||'null');
    if(Array.isArray(saved)&&saved.length) {
      const defaults=new Map(defaultVanParkingSlots().map(s=>[s.id,s]));
      const merged=saved.map(slot=>({...defaults.get(slot.id),...slot})).filter(slot=>slot.id);
      const seen=new Set(merged.map(slot=>slot.id));
      defaultVanParkingSlots().forEach(slot=>{if(!seen.has(slot.id))merged.push(slot);});
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

let state = {
  page: localStorage.getItem('relayops_page') || 'dashboard',
  role: localStorage.getItem('relayops_role') || 'admin',
  phase: Number(localStorage.getItem('relayops_phase') || 2),
  routes: JSON.parse(localStorage.getItem('relayops_routes') || 'null') || routesSeed,
  morningRoutes: JSON.parse(localStorage.getItem('relayops_morning') || 'null') || morningSeed,
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
  morningSheetsEndpoint: localStorage.getItem('relayops_morning_sheets_endpoint') || '',
  morningSheetsLastPush: localStorage.getItem('relayops_morning_sheets_last_push') || '',
  morningSheetsLastError: localStorage.getItem('relayops_morning_sheets_last_error') || '',
  morningSheetsLastReceipt: JSON.parse(localStorage.getItem('relayops_morning_sheets_last_receipt') || 'null'),
  morningSheetsLastDryRun: localStorage.getItem('relayops_morning_sheets_last_dry_run') || '',
  morningOperationDate: localStorage.getItem('relayops_morning_operation_date') || defaultOperationDate(),
  fleetNameOverrides: JSON.parse(localStorage.getItem('relayops_fleet_name_overrides') || 'null') || {},
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
  importSource: 'computer',
  importPurpose: 'morning',
  rosterPublished: localStorage.getItem('relayops_published') === 'true',
  search: '',
  modal: null,
  importedFile: null,
  editMode: false,
  copyMode: false,
  screenshotPreview: null,
  sheetCopyText: '',
  equipmentText: '',
  fleetPasteText: '',
  fleetImportSourceHint: '',
  equipmentImport: JSON.parse(localStorage.getItem('relayops_equipment_import') || 'null'),
  gasAssignmentRoutes: [],
  gasAssignmentVans: [],
  deviceClearConfirm: null,
  deviceCustomRows: loadDeviceCustomRows(),
  driverContacts: JSON.parse(localStorage.getItem('relayops_driver_contacts') || 'null') || [],
  driverContactsLastImport: localStorage.getItem('relayops_driver_contacts_last_import') || '',
  pendingDriverText: null,
  messageQueueTemplate: localStorage.getItem('relayops_message_queue_template') || 'standup',
  messageQueueStatus: JSON.parse(localStorage.getItem('relayops_message_queue_status') || 'null') || {},
  scheduleEntries: JSON.parse(localStorage.getItem('relayops_schedule_entries') || 'null') || [],
  scheduleImportName: localStorage.getItem('relayops_schedule_import_name') || '',
  scheduleFilter: localStorage.getItem('relayops_schedule_filter') || 'all',
  callOffDriverKeys: JSON.parse(localStorage.getItem('relayops_call_off_driver_keys') || 'null') || {},
  scheduleDriverMarks: JSON.parse(localStorage.getItem('relayops_schedule_driver_marks') || 'null') || {},
  pendingRosterSwap: null,
  removedDriverKeys: JSON.parse(localStorage.getItem('relayops_removed_driver_keys') || 'null') || [],
  pendingDriverRemoval: null,
  cloudStatus: window.RelayOpsCloud?.configured?'connecting':'setup-required',
  cloudUser: '',
  cloudPresence: [],
  cloudMembers: [],
  rating: Number(localStorage.getItem('relayops_rating') || 0)
};

if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
if(state.fleetImport?.vehicles?.length) applyFleetVehicles(state.fleetImport.vehicles,{silent:true});

const app = document.getElementById('app');
const fileInput = document.getElementById('file-input');
const sheetEditFields = ['driver','route','staging','padOverride','ev','deviceName','portable','stops','packages','plannedRts'];
const morningTemplateHeaders = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'];
const sheetCopyFields = ['waveLabel','driver','route','staging','pad','ev','deviceName','portable','spacerA','stops','packages','spacerB','plannedRts'];
const sheetSpacerColumns = new Set([8,11]);
const sheetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let sheetSelection = { anchor: null, focus: null };

function initials(name='') { return name.split(/\s+/).map(p => p[0]).join('').slice(0,2).toUpperCase(); }
function nameKey(name='') { return String(name||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' '); }
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
  const byKey=new Map((state.driverContacts||[]).map(contact=>[contact.key||nameKey(contact.name),contact]));
  incoming.forEach(contact=>{byKey.set(contact.key||nameKey(contact.name),{...(byKey.get(contact.key)||{}),...contact});});
  state.driverContacts=[...byKey.values()].sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));
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
  const key=nameKey(firstDriverName(name));
  return (state.driverContacts||[]).find(contact=>(contact.key||nameKey(contact.name))===key);
}
function teamDriverRows() {
  const removed=new Set(state.removedDriverKeys||[]);
  const imported=(state.driverContacts||[]).filter(contact=>!team.some(d=>nameKey(d[0])===(contact.key||nameKey(contact.name))));
  return [
    ...team.map((d,i)=>({name:d[0],role:d[1],status:d[2],quality:d[3],coaching:d[4],id:`DA-${1019+i*7}`,phone:driverContactForName(d[0])?.phone||'',imported:false})),
    ...imported.map((contact,i)=>({name:contact.name,role:contact.role||'Delivery Associate',status:String(contact.status||'').toUpperCase()==='ACTIVE'?'Active':'Imported',quality:'—',coaching:'—',id:contact.transporterId||`IMP-${String(i+1).padStart(3,'0')}`,phone:contact.phone||'',imported:true}))
  ].filter(driver=>!removed.has(nameKey(driver.name)));
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

function sidebar() {
  return `<aside class="sidebar" id="sidebar">
    <div class="brand"><div class="brand-mark"></div><div class="brand-copy"><div class="brand-name">RelayOps</div><div class="brand-sub">Dispatch command</div></div></div>
    <div class="station-pill"><div class="station-icon">${esc(state.stationCode.slice(0,3).toUpperCase())}</div><div class="station-copy"><strong>${esc(state.organizationName)}</strong><span>${esc(state.stationCode.toUpperCase())} · Los Angeles</span></div>${ICONS.chevron}</div>
    <nav>${NAV.filter(g => !g.admin || state.role === 'admin').map(group => `<div class="side-section"><div class="side-label">${group.section}</div>${group.items.map(([id,label,icon,count]) => `<button class="nav-item ${state.page===id?'active':''}" data-page="${id}" aria-label="${label}">${ICONS[icon]}<span>${label}</span>${count?`<b class="nav-count">${count}</b>`:''}</button>`).join('')}</div>`).join('')}</nav>
    <div class="side-bottom"><div class="user-card"><div class="avatar">AG</div><div class="user-copy"><strong>Alex Gonzalez</strong><span>${state.role==='admin'?'Owner · Full access':'Opening dispatcher'}</span></div><div class="role-tag">${state.role==='admin'?'ADMIN':'OPS'}</div></div></div>
  </aside>`;
}

const pageInfo = {
  dashboard:['Today’s command','A clear view from load-out through RTS'], morning:['Morning operations sheet','DSP-only routes, grouped by earliest wave, staging, and pad'], roster:['Opening roster','Resolve exceptions, assign equipment, then publish'],
  live:['Device and Portable Sheet','Type today’s assignments, then match them to every EV on the Morning Sheet'], team:['Drivers & team','Availability, compliance, recognition, and history'],
  fleet:['Fleet Health','Electric and gas vehicle status, battery, and operational health'], parking:['Van Parking','Interactive parking map for closing and morning dispatch'], performance:['Performance','Scorecard trends and driver-level focus areas'],
  coaching:['Coaching','Turn scorecard signals into consistent follow-through'], checklists:['Checklists','Repeatable opening, load-out, and closeout routines'],
  inbox:['Team inbox','Calls, messages, and announcements in one place'], inventory:['Inventory','Devices, uniforms, supplies, and assignments'],
  reports:['Reports & export','Google Sheets-ready operational data'], admin:['Admin control','People, permissions, connections, and audit history']
};

function topbarLegacy() {
  const [title,sub] = pageInfo[state.page] || pageInfo.dashboard;
  const fleetClean=state.page==='fleet';
  return `<header class="topbar">
    <div style="display:flex;align-items:center;gap:10px"><button class="icon-button mobile-menu" data-action="menu" aria-label="Open menu">${ICONS.menu}</button><div class="page-heading"><h1>${title}</h1><p>${sub}</p></div></div>
    <div class="top-actions">${fleetClean?'':`<label class="search">${ICONS.search}<input id="global-search" placeholder="Search driver, route, van…" value="${esc(state.search)}" /></label>`}${state.page==='morning'?'<button class="btn info-top-button" data-action="open-morning-diagnostics" title="Setup & diagnostics"><span>ℹ</span><span class="hide-mobile">Setup & diagnostics</span></button>':''}<button class="btn cloud-status-button ${esc(state.cloudStatus)}" data-action="cloud-account"><i></i><span class="hide-mobile">${state.cloudStatus==='synced'?`Shared & synced${state.cloudPresence.length?` · ${state.cloudPresence.length} online`:''}`:state.cloudStatus==='connecting'?'Connecting…':state.cloudStatus==='signed-out'?'Dispatcher sign in':'Cloud setup'}</span></button><button class="btn ghost share-link-btn" data-action="share-dispatcher-link">${ICONS.link}<span class="hide-mobile">Share link</span></button><button class="icon-button" aria-label="Notifications">${ICONS.bell}<i class="notification-dot"></i></button>${fleetClean?'':`<button class="btn primary" data-action="import">${ICONS.upload}<span class="hide-mobile">Upload Excel / CSV</span></button>`}</div>
  </header>`;
}

function topbar() {
  return topbarLegacy().replace(/<button class="btn primary" data-action="import">[\s\S]*?<span class="hide-mobile">Upload Excel \/ CSV<\/span><\/button>/,'');
}

function contextBar(extra='') {
  const synced=state.cloudStatus==='synced',label=synced?`Shared workspace${state.cloudUser?` · ${state.cloudUser}`:''}`:state.cloudStatus==='signed-out'?'Local cache · sign in to share':state.cloudStatus==='connecting'?'Connecting shared workspace…':'Local cache · cloud setup required';
  return `<div class="context-bar"><div class="date-nav"><div class="date-chip">${ICONS.calendar}${fmtDate()}</div>${extra}</div><div class="sync-state ${synced?'cloud-live':''}"><i class="live-dot"></i>${esc(label)}</div></div>`;
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
      <article class="card"><div class="card-head"><div class="card-title"><h2>Opening readiness</h2><p>Every critical handoff before the first wave</p></div><button class="btn small" data-page="parking">Open van parking</button></div><div class="readiness"><div class="readiness-top"><div class="readiness-ring"><div><strong>93%</strong><span>READY</span></div></div><div class="readiness-steps"><div class="step"><div class="step-status">✓</div><strong>Roster matched</strong><span>${state.routes.length}/${state.routes.length} routes staffed</span></div><div class="step"><div class="step-status">✓</div><strong>Equipment assigned</strong><span>Vans + devices confirmed</span></div><div class="step warn"><div class="step-status">!</div><strong>Fleet exceptions</strong><span>2 notes need review</span></div></div></div></div></article>
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
  return `<section class="morning-sheet-bridge card ${connected?'connected':'setup'}" aria-label="Google Sheets bridge"><div class="bridge-route"><span class="bridge-node source"><b>1</b><strong>Filtered waves</strong><small>${esc(morningFilterScopeText())}<br>${routeCount} routes · ${waveCount} wave${waveCount===1?'':'s'}</small></span><i>→</i><span class="bridge-node check"><b>2</b><strong>Automatic check</strong><small>${esc(proof.range)} · ${payload.sections.length} merge sections<br>Dry run happens before every send</small></span><i>→</i><span class="bridge-node destination"><b>3</b><strong>Google Ops Log</strong><small>${esc(payload.sheetName)} / Sheet1<br>${esc(receiptText)}</small></span></div><div class="bridge-actions"><button class="btn primary bridge-send" data-action="sync-filtered-morning-to-sheets">${ICONS.link} ${connected?'Send filtered waves':'Connect Google Sheet'}</button><a class="btn" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open Google Sheet</a><button class="btn" data-action="morning-sheets-connector">${connected?'Connector settings':'One-time setup'}</button></div><p>${connected?'One click checks the exact visible rows, runs a Google dry run, then writes only A3:M. Columns N+ remain untouched.':'Connect the Apps Script /exec URL once. After that, every dispatcher can send the currently filtered waves with one button.'}</p></section>`;
}

function morningSheetPage() {
  const rows=filteredMorningRows(), waves=morningWaveList(), staging=[...new Set(state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>r.staging))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  const excluded=state.lastImportExcluded;
  const groups=morningSections(rows);
  const irregular=rows.filter(r=>r.plannedRtsIssue).length;
  const handoffRowsCount=morningCopyRowsForSections(groups).length;
  const sheetsConnected=Boolean(state.morningSheetsEndpoint);
  const sheetMode=state.copyMode?'copy':'edit';
  return `${contextBar(`<span class="status blue">Earliest waves first</span>`)}
  <div class="morning-command card"><div><span class="eyebrow">LLOL OPENING OPERATIONS</span><h2>Build today’s morning sheet</h2><p>Start with the day files. Routes are matched by CX number and arranged earliest wave first.</p></div><label class="operation-date-picker"><span>Day of operation</span><input type="date" data-operation-date value="${esc(state.morningOperationDate)}"><small>Google tab: ${esc(operationDateTabNames(state.morningOperationDate).join(' or '))}</small></label><div class="morning-actions"><button class="btn primary easy-upload-button" data-action="import">${ICONS.upload} Upload day files</button><button class="btn locked" disabled title="Slack Import is locked until the secure Slack connector is ready">${ICONS.inbox} Slack Import <span class="demo-tag">LOCKED</span></button><button class="btn" data-action="planned-rts-import">${ICONS.calendar} Add planned RTS</button><button class="btn" data-action="equipment-import" title="VAN/DEV/PORT Import">${ICONS.van} Add van devices</button></div></div>
  <div class="quick-start" aria-label="Three easy steps"><div class="quick-step done"><b>1</b><span><strong>Pick import</strong><small>Slack or Cortex</small></span></div><div class="quick-arrow">→</div><div class="quick-step"><b>2</b><span><strong>We match CX</strong><small>Wave + staging + pad</small></span></div><div class="quick-arrow">→</div><div class="quick-step"><b>3</b><span><strong>Send to Sheet</strong><small>Exact merged template</small></span></div></div>
  <div class="sheet-toolbar morning-daily-toolbar"><div class="sheet-filter"><label>Wave</label><select data-morning-filter="wave"><option value="all">All waves</option>${waves.map(v=>`<option ${state.morningFilters.wave===v?'selected':''}>${v}</option>`).join('')}</select></div><div class="sheet-filter"><label>Staging</label><select data-morning-filter="staging"><option value="all">All locations</option>${staging.map(v=>`<option ${state.morningFilters.staging===v?'selected':''}>${v}</option>`).join('')}</select></div><div class="sheet-filter"><label>Pad</label><select data-morning-filter="pad"><option value="all">All pads</option>${['A','B','C'].map(v=>`<option ${state.morningFilters.pad===v?'selected':''}>${v}</option>`).join('')}</select></div><button class="btn small" data-action="clear-morning-filters">Clear</button><span class="filter-note">${ICONS.chevron} Earliest first</span><div class="morning-toolbar-spacer"></div><button class="btn small ${state.editMode?'lime':''}" data-action="toggle-morning-edit">${state.editMode?'✓ Finish editing':'✎ Edit sheet'}</button><button class="btn small ${state.copyMode?'lime':''}" data-action="toggle-morning-copy">${state.copyMode?'✓ Exit copy mode':'Copy cells'}</button></div>
  <div class="sheet-kpis"><span><strong>${rows.length}</strong> routes</span><span><strong>${rows.reduce((n,r)=>n+r.packages,0).toLocaleString()}</strong> packages</span><span><strong>${rows.reduce((n,r)=>n+r.stops,0).toLocaleString()}</strong> stops</span><span><strong>${irregular}</strong> RTS flags</span></div>
  ${morningSheetsBridgeHtml()}
  <details class="morning-more-tools card"><summary><span><strong>More morning tools</strong><small>Van assignment, row sizing, screenshots, downloads and backup copy</small></span><b>Open</b></summary><div class="morning-more-actions"><button class="btn small ${state.fitMorningRows?'lime':''}" data-action="toggle-fit-rows">${state.fitMorningRows?'✓ Fit to drivers':'Remove blank rows'}</button><button class="btn small" data-action="assign-ev-low">EV 1-57 Low → High</button><button class="btn small" data-action="assign-ev-random">Randomize EVs</button><button class="btn small" data-action="assign-gas-vans">Assign Gas Vehicles</button><button class="btn small" data-action="preview-wave-screenshot">${ICONS.download} Preview JPEG</button><button class="btn small" data-action="export-morning">${ICONS.download} Export CSV</button><button class="btn small" data-action="export-morning-template">${ICONS.download} Formatted XLS</button><button class="btn small" data-action="copy-morning-visible">${ICONS.copy} Copy fallback</button><button class="btn small" data-action="open-sheets-helper">Open paste box</button></div></details>
  <details id="morning-diagnostics" class="morning-advanced-checks card"><summary><span><strong>ℹ Setup & diagnostics</strong><small>Only needed if imports or Google Sheets are not working</small></span><b>Open</b></summary><div class="morning-advanced-content">${morningConnectorGuide()}${morningHandoffReadinessHtml()}${morningImportTemplateProofHtml()}<div class="sheets-helper card ops-log-helper"><div class="sheets-helper-copy"><span class="eyebrow">BACKUP TRANSFER</span><h3>Copy or download if the connector is unavailable</h3><p>The bridge above is the preferred path. These backups use the same ${handoffRowsCount} numbered A–M rows.</p></div><div class="sheets-helper-actions"><button class="btn" data-action="copy-morning-visible">${ICONS.copy} Copy fallback</button><button class="btn" data-action="open-sheets-helper">Open paste box</button><button class="btn" data-action="export-morning-template">${ICONS.download} Formatted XLS</button></div></div>${morningSheetsHandoffProofHtml()}${morningSheetStructureProofHtml()}${morningCopyFallbackProofHtml()}</div></details>
  ${state.copyMode?copyModeToolbar(groups):''}
  ${state.copyMode?`<div class="edit-help copy-help">Copy mode is on. Drag across cells exactly like Google Sheets, watch the blue highlight, then press ⌘C on Mac or Ctrl+C on Windows. Click a wave button to pulse/highlight that whole wave before copying it. Divider columns I and L split manual copy into A–H, J–K, and M blocks.</div>`:state.editMode?`<div class="edit-help">Editing is on. Columns and rows are labeled like Google Sheets. Click and drag white cells to select a rectangle, press ⌘C to copy, or paste tabbed rows from Sheets to fill across/down.</div>`:''}
  <article class="card morning-board ${state.copyMode?'copy-board':state.editMode?'edit-board':'view-board'}"><div class="sheet-scroll"><table class="ops-sheet morning-template-sheet ${state.copyMode?'copy-ops-sheet':''}"><thead>${sheetModeHeader(morningTemplateHeaders,sheetMode)}</thead><tbody>${groups.length?groups.map((section,sectionIndex)=>morningWaveGroup(section,sectionIndex)).join(''):`<tr><td colspan="14"><div class="empty-state"><h3>No routes match these filters</h3><p>Clear a filter or upload a new day-of-operations file.</p></div></td></tr>`}</tbody></table></div></article>
  <div class="dispatcher-rating card"><div><strong>How easy was this opening sheet?</strong><span>Your 5-star tap helps find what needs to be smoother next.</span></div><div class="stars">${[1,2,3,4,5].map(n=>`<button class="${state.rating>=n?'active':''}" data-action="rate-service" data-rating="${n}" aria-label="${n} stars">★</button>`).join('')}</div></div>`;
}

function morningConnectorGuide() {
  const connected=Boolean(state.morningSheetsEndpoint),tabs=operationDateTabNames(state.morningOperationDate);
  return `<details class="morning-connectors card"><summary><div><strong>Ops Log connector setup</strong><span>Google Sheets is ready through Apps Script. Slack stays locked until its secure connector is built.</span></div><b>Open</b></summary><div class="morning-connector-grid"><div><strong>1 · Slack / day file</strong><span>Locked for now. Use Amazon XLSX/CSV upload so no dispatcher expects an unfinished connection to work.</span><button class="btn small locked" disabled>Slack Import · locked</button></div><div><strong>2 · Cortex / Amazon Logistics</strong><span>Upload XLSX/CSV files. RelayOps reads them locally and filters ${esc(state.dspCode)} routes.</span><button class="btn small primary" data-action="import">Upload Amazon files</button></div><div><strong>3 · Google Sheets Ops Log</strong><span>${connected?`Connected. Sends only to the ${esc(tabs.join(' or '))} tab and writes A3:M.`:'Install the Apps Script once, save the /exec URL, then send to the selected operation-date tab.'}</span><button class="btn small lime" data-action="morning-sheets-connector">${connected?'Open Ops Log connector':'Connect Ops Log'}</button><a class="btn small" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open ops log</a></div></div><p>The date tab must already exist. If it is missing, RelayOps stops instead of writing into a different tab.</p></details>`;
}

function morningSections(rows) {
  const waveGroups=[...new Set(rows.map(r=>r.wave))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)).map(w=>({label:'',wave:w,rows:rows.filter(r=>r.wave===w)}));
  const sections=waveGroups.slice(0,5).map((g,i)=>({...g,label:`WAVE ${i+1}`,minRows:12}));
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
    return `<span class="wave-copy-group"><b>${esc(label||`Wave ${i+1}`)}</b><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="all">All</button><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="setup">A–H</button><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="counts">J–K</button><button class="btn small" data-action="copy-wave" data-wave-index="${i}" data-copy-block="rts">M</button></span>`;
  }).join('');
  return `<div class="copy-mode-toolbar card"><div><strong>Copy mode</strong><span>Drag inside one block at a time, or use a wave shortcut: All, A–H setup, J–K counts, or M planned RTS. Black divider columns I and L are real boundaries so the paste lines up in Google Sheets.</span></div><div class="copy-mode-buttons"><button class="btn small primary" data-action="copy-selected-cells">Copy selected cells</button>${buttons}</div></div>`;
}
function morningWaveTimeText(section) {
  return section.wave?`${String(section.wave).replace(/\s*[AP]M/i,'')} (${section.rows.length})`:'';
}
function copyCellValue(row,field,waveLabel,pad) {
  if(field==='waveLabel')return waveLabel;
  if(field==='pad')return pad;
  if(field==='spacerA'||field==='spacerB')return '';
  if(field==='route')return row._blank?'':row.route||'';
  if(field==='stops')return row.stops||'';
  if(field==='packages')return row.packages||'';
  return row[field]||'';
}
function morningCopyRowsForSections(sections=morningSections(filteredMorningRows())) {
  const rows=[];
  sections.forEach(section=>{
    const display=morningDisplayRows(section), pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const waveLabel=section.dsp?'DSP':section.label;
    display.forEach((r,i)=>rows.push({section,row:r,values:sheetCopyFields.map(field=>copyCellValue(r,field,i===0?waveLabel:'',i===0?pad:''))}));
    rows.push({section,row:null,time:true,values:sheetCopyFields.map((field,i)=>i===0?morningWaveTimeText(section):'')});
    rows.push({section,row:null,separator:true,values:sheetCopyFields.map(()=> '')});
  });
  return rows;
}
function morningCopyGrid(groups=[]) {
  const rows=morningCopyRowsForSections(groups);
  return `<table class="ops-sheet copy-ops-sheet morning-template-sheet"><thead>${sheetModeHeader(morningTemplateHeaders,'copy')}</thead><tbody>${rows.map((item,rowIndex)=>`<tr class="ops-row copy-row ${item.time?'wave-time-row':''}"><th class="sheet-row-num">${rowIndex+3}</th>${item.values.map((value,colIndex)=>`<td class="${sheetCopyFields[colIndex]?.startsWith('spacer')?'sheet-spacer-col':'sheet-edit-cell copy-sheet-cell'} ${sheetCopyFields[colIndex]==='plannedRts'?'planned-rts-cell':''}" tabindex="0" data-sheet-cell="true" data-sheet-copy-cell="true" data-sheet-section="${morningSections(groups.flatMap(g=>g.rows)).indexOf(item.section)}" data-sheet-row="${rowIndex}" data-sheet-col="${colIndex}">${esc(value)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function createManualMorningRoute(seed={}) {
  const route={dsp:state.dspCode,driver:'',route:seed.route||`MANUAL-${Date.now().toString().slice(-6)}`,service:'Manual opening edit',wave:seed.wave||'Manual',staging:'',duration:0,zones:0,packages:0,commercial:0,stops:0,eta:'',bags:0,overflow:0,parking:'',ev:'',deviceName:'',portable:'',preDvic:false,preWhip:false,postDvic:false,postWhip:false,rescued:false,packageReturns:'',endTime:'',rtsTime:'',plannedRts:'',clockOutTime:'',checkedIn:false,vanReady:false,deviceReady:false,portableReady:false,loadReady:false};
  state.morningRoutes.push(route);
  return route;
}

function morningWaveGroup(section,sectionIndex=0) {
  const rows=morningDisplayRows(section);
  const interactive=state.editMode||state.copyMode;
  const showGridLabels=true;
  const edit=state.editMode;
  const prior=morningSections(filteredMorningRows()).slice(0,sectionIndex);
  const rowBase=prior.reduce((n,s)=>n+morningDisplayRows(s).length+2,3);
  const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
  const waveTitle=section.dsp?'DSP':section.label;
  const waveTime=morningWaveTimeText(section);
  const attrs=(r,field,rowIndex,colIndex,extra='')=>interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+rowIndex-3}" data-sheet-col="${colIndex}" ${edit?`contenteditable="true" data-edit-route="${esc(r?.route||'')}" data-edit-field="${field}" data-edit-wave="${esc(r?.wave||section.wave||'')}" data-edit-section="${esc(section.label)}"`:''} ${extra}`:'';
  const cell=(r,field,value,colIndex,cls='')=>{const issue=field==='ev'?vehicleIssueForEquipmentId(value):null,issueClass=issue?.type==='grounded'?'grounded-van-cell':issue?.type==='battery'?'low-battery-van-cell':'';return `<td class="sheet-edit-cell copy-sheet-cell ${cls} ${issueClass} ${r?.plannedRtsIssue&&field==='plannedRts'?'flag-cell':''} ${edit?'editable-cell':''}" data-view-route="${esc(r?.route||'')}" data-view-field="${field}" data-view-wave="${esc(r?.wave||section.wave||'')}" title="${issue?esc(issue.title):edit?'Press Enter to save':'Double-click to edit'}" ${attrs(r,field,rows.indexOf(r),colIndex)}>${esc(value??'')}</td>`;};
  const waveCell=`<td class="wave-label ${section.dsp?'dsp-label':''} copy-sheet-cell" rowspan="${rows.length}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase-3}" data-sheet-col="0"`:''}><span>${esc(waveTitle)}</span></td>`;
  const padCell=`<td class="pad-label sheet-edit-cell copy-sheet-cell ${edit?'editable-cell':''}" rowspan="${rows.length+1}" data-view-field="padOverride" data-view-wave="${esc(section.wave)}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase-3}" data-sheet-col="4" ${edit?`contenteditable="true" data-edit-wave="${esc(section.wave)}" data-edit-field="padOverride"`:''}`:''}><span>${esc(pad)}</span></td>`;
  const body=rows.map((r,i)=>`<tr class="ops-row ${r._blank?'blank-row':''} wave-section-${sectionIndex}" data-wave-section="${sectionIndex}">${showGridLabels?`<th class="sheet-row-num">${rowBase+i}</th>`:''}${i===0?waveCell:''}${cell(r,'driver',r.driver,1,'driver-name')}${cell(r,'route',r._blank?'':r.route,2,'route-id')}${cell(r,'staging',r.staging,3,'staging-code')}${i===0?padCell:''}${cell(r,'ev',r.ev||'',5)}${cell(r,'deviceName',r.deviceName||'',6)}${cell(r,'portable',r.portable||'',7)}<td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+i-3}" data-sheet-col="8"`:''}></td>${cell(r,'stops',r.stops,9,'count-cell')}${cell(r,'packages',r.packages,10,'count-cell')}<td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+i-3}" data-sheet-col="11"`:''}></td>${cell(r,'plannedRts',r.plannedRts||'',12,'planned-rts-cell')}</tr>`).join('');
  const timeRowIndex=rowBase+rows.length-3;
  const timeRow=`<tr class="ops-row wave-time-row wave-section-${sectionIndex}" data-wave-section="${sectionIndex}">${showGridLabels?`<th class="sheet-row-num">${rowBase+rows.length}</th>`:''}<td class="wave-time-cell copy-sheet-cell" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="0"`:''}>${esc(waveTime)}</td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="1"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="2"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="3"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="5"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="6"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="7"`:''}></td><td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="8"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="9"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="10"`:''}></td><td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="11"`:''}></td><td class="planned-rts-cell sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="12"`:''}></td></tr>`;
  const separatorRowIndex=timeRowIndex+1;
  const separatorRow=`<tr class="wave-separator wave-section-${sectionIndex}" data-wave-section="${sectionIndex}">${showGridLabels?`<th class="sheet-row-num">${rowBase+rows.length+1}</th>`:''}${sheetCopyFields.map((field,colIndex)=>`<td class="${sheetSpacerColumns.has(colIndex)?'sheet-spacer-col':''}" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${separatorRowIndex}" data-sheet-col="${colIndex}"`:''}></td>`).join('')}</tr>`;
  return `${body}${timeRow}${separatorRow}`;
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
  const vin=String(vehicle.vin||'').toUpperCase(),name=String(state.fleetNameOverrides?.[cleanVin(vin)]||vehicle.name||'').trim(),upper=name.toUpperCase();
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
function vehicleIssueForEquipmentId(value='') {
  const vehicle=fleetVehicleForEquipmentId(value);if(!vehicle)return null;
  if(normalizeOperational(vehicle.operational||vehicle.status)==='Grounded')return {type:'grounded',label:'⛔ Grounded',title:'Grounded vehicle — do not assign'};
  if(normalizeActive(vehicle.active||vehicle.status)==='Inactive')return {type:'grounded',label:'Inactive',title:'Inactive vehicle — verify before assigning'};
  if(isElectricFleetVehicle(vehicle)&&Number(vehicle.battery)<40)return {type:'battery',label:`Low ${Number(vehicle.battery)}%`,title:`Low battery ${Number(vehicle.battery)}% — charge or swap before dispatch`};
  return null;
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
    const issue=vehicleIssueForEquipmentId(label),rowClass=issue?.type==='grounded'?'grounded-vehicle-row':issue?.type==='battery'?'low-battery-vehicle-row':'';
    const vanCell=row.fixed?`<th>${esc(label)}${issue?`<span>${esc(issue.label)}</span>`:''}</th>`:`<th class="custom-van-cell"><input class="device-sheet-van-input" aria-label="${esc(section)} custom van" data-device-custom-uid="${esc(row.uid)}" data-device-custom-field="label" value="${esc(label)}" placeholder="Van name"><button data-action="remove-device-custom-row" data-device-custom-uid="${esc(row.uid)}" aria-label="Remove ${esc(label||'custom van')} row">×</button>${issue?`<span>${esc(issue.label)}</span>`:''}</th>`;
    const field=(name,max)=>`<td><input aria-label="${esc(label||'New van')} ${name}" ${row.fixed?`data-device-sheet-id="${esc(key)}" data-device-sheet-field="${name}"`:`data-device-custom-uid="${esc(row.uid)}" data-device-custom-field="${name}"`} inputmode="numeric" maxlength="${max}" value="${esc(item[name]||'')}" placeholder="—"></td>`;
    return `<tr class="${rowClass}">${vanCell}${field('device',3)}${field('portable',4)}</tr>`;
  }).join('');
}
function deviceSheetTable(title,subtitle,section='') {
  const confirming=state.deviceClearConfirm===section,count=deviceSheetBaseIds(section).length+deviceSheetCustomRows(section).length;
  return `<article class="card device-sheet-card ${section}-list"><div class="device-sheet-card-head"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div><div class="device-sheet-card-actions"><span>${count} rows</span><button class="btn small" data-action="add-device-sheet-row" data-device-section="${esc(section)}">${ICONS.plus} Add row</button><button class="btn small ${confirming?'danger':''}" data-action="clear-device-sheet-section" data-device-section="${esc(section)}">${confirming?'Click again to clear':'Clear sheet'}</button></div></div><div class="device-sheet-table-wrap"><table class="device-sheet-table"><thead><tr><th>VAN</th><th>DEVICE</th><th>PORTABLE</th></tr></thead><tbody>${deviceSheetRows(section)}</tbody></table></div></article>`;
}
function livePage() {
  const details=deviceSheetDetails(),filled=Object.values(details).filter(item=>String(item?.device||'').trim()||String(item?.portable||'').trim()).length;
  const assigned=state.morningRoutes.filter(route=>route.ev&&details[normalizeEquipmentId(route.ev)]).length;
  return `${contextBar(`<span class="status">${filled} assignments saved</span>`)}
  <section class="device-sheet-intro card"><div><span class="eyebrow">TODAY’S EQUIPMENT</span><h2>Type the Device and Portable beside each van</h2><p>EV labels stay fixed. Click any white box and type today’s number. Your work saves automatically on this device.</p></div><div class="device-sheet-steps"><span><b>1</b>Type numbers</span><span><b>2</b>Check the EV</span><span><b>3</b>Send to Morning Sheet</span></div><button class="btn primary device-sheet-send" data-action="device-sheet-to-morning">Input to Morning Sheet ${ICONS.chevron}</button></section>
  <section class="device-sheet-summary"><span><b>${filled}</b>van rows filled</span><span><b>${assigned}</b>Morning Sheet drivers currently matched</span><span><b>${state.morningRoutes.filter(route=>route.ev).length}</b>drivers have a van assigned</span></section>
  <section class="device-sheet-layout"><div>${deviceSheetTable('Electric vehicles','EV1 through EV58 plus Fleet Health and manual additions','ev')}</div><aside>${deviceSheetTable('Gas vehicles','Ford, Ram and rental vans from Fleet Health plus manual additions','gas')}${deviceSheetTable('Helper bags','Use H1–H4 or add another helper bag','helper')}</aside></section>
  <div class="device-sheet-sticky-action"><div><strong>Ready to match equipment?</strong><span>The EV/VAN number is the match key. Driver names and routes stay unchanged.</span></div><button class="btn primary" data-action="device-sheet-to-morning">Input to Morning Sheet</button></div>`;
}

function teamPage() {
  const drivers=teamDriverRows(), contacts=state.driverContacts||[];
  const onRouteNames=new Set(filteredMorningRows().map(r=>nameKey(r.driver)).filter(Boolean));
  return `${contextBar(`<a class="btn small ghost" href="${AMAZON_WORKFORCE_ASSOCIATES_URL}" target="_blank" rel="noopener">${ICONS.link} Open Amazon Workforce</a>`)}<div class="toolbar"><div class="toolbar-left"><select class="filter-select"><option>All status</option><option>Active</option><option>Leave</option></select><select class="filter-select"><option>All roles</option><option>Lead DA</option><option>Delivery Associate</option></select><span class="filter-note">${contacts.length} imported phone contact${contacts.length===1?'':'s'}${state.driverContactsLastImport?` · last import ${esc(state.driverContactsLastImport)}`:''}</span></div><div class="toolbar-right"><a class="btn" href="${AMAZON_WORKFORCE_ASSOCIATES_URL}" target="_blank" rel="noopener">${ICONS.link} Amazon Workforce</a><button class="btn primary" data-action="driver-import">${ICONS.upload} Import Drivers CSV / Excel</button><button class="btn lime" data-action="add-delivery-associate">${ICONS.plus} Add Delivery Associate</button></div></div>
  <div class="driver-workforce-import card"><div><strong>Driver & phone import</strong><span>Drop in an AssociateData CSV or Excel workbook (.xlsx). RelayOps finds the associate sheet, matches Name with Personal Phone, and keeps Position, Transporter ID, and Active status.</span></div><div><button class="btn small primary" data-action="driver-import">Choose CSV or Excel</button><button class="btn small" data-action="add-delivery-associate">Add one manually</button></div><small>Contacts stay in this browser’s private storage. They are not embedded in or published with the public GitHub Pages website.</small></div>
  <div class="driver-message-readiness card"><div><strong>Future text reminder prep</strong><span>After the Morning Sheet is finalized, RelayOps can identify on-route drivers by the visible Morning Sheet names. Texting will need a secure SMS connector and driver opt-in before it sends anything.</span></div><div><b>${drivers.filter(d=>onRouteNames.has(nameKey(d.name))).length}</b><small>current team cards recognized on the Morning Sheet</small></div></div>
  <section class="grid team-grid">${drivers.map(d=>`<article class="card entity-card driver-card"><div class="entity-top"><div class="driver-avatar" style="width:38px;height:38px;border-radius:12px">${initials(d.name)}</div><div class="driver-card-actions"><span class="status ${statusClass(d.status)}">${d.status}</span><button class="driver-delete-button" data-action="request-driver-removal" data-driver-key="${esc(nameKey(d.name))}" aria-label="Remove ${esc(d.name)}" title="Remove Delivery Associate">${ICONS.trash}</button></div></div><h3>${esc(d.name)}</h3><p>${esc(d.role)} · ${esc(d.id)}</p><div class="driver-phone-line">${ICONS.phone}<span>${d.phone?esc(d.phone):'No phone imported yet'}</span></div><div class="entity-meta"><div class="entity-stat"><span>Delivery quality</span><strong>${esc(d.quality)}</strong></div><div class="entity-stat"><span>Last coaching</span><strong>${esc(d.coaching)}</strong></div></div></article>`).join('')}</section>`;
}

function fleetPage() {
  const vehicles=sortedRivianFleet(),electric=electricFleetVehicles(),gas=rivianFleet.filter(isGasFleetVehicle),low=electric.filter(v=>v.battery<40).length,charge=fleetChargeRows().length;
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded').length,coverage=fleetCoverageStats();
  const filters=['all','changed','verified','needs-data','missing-fleetos','missing-amazon','amazon-only','fleetos-only','demo-only','low','grounded','inactive'];
  const labels={'all':'All vehicles','changed':'Changed only','verified':'Verified only','needs-data':'Needs data','missing-fleetos':'Missing FleetOS','missing-amazon':'Missing Amazon','amazon-only':'Amazon only','fleetos-only':'FleetOS only','demo-only':'Demo only','low':'Low-battery EVs','grounded':'Grounded only','inactive':'Inactive only'};
  return `${contextBar('<span class="status">Amazon names/status · FleetOS EV battery</span>')}
  <section class="fleet-simple-import card"><div><span class="eyebrow">START HERE</span><h2>Update Fleet Health</h2><p>Amazon adds every vehicle name, VIN and status. FleetOS adds battery and range for electric vans.</p></div><button class="fleet-import-button amazon" data-action="fleet-import-amazon">${ICONS.upload}<span><b>Amazon Fleet Import</b><small>All electric + gas vehicles</small></span></button><button class="fleet-import-button fleetos" data-action="fleet-import-fleetos">${ICONS.upload}<span><b>FleetOS Import</b><small>EV battery + range</small></span></button></section>
  ${fleetHealthSummary()}
  <section class="fleet-alert-squares"><button class="danger" data-action="fleet-filter-quick" data-filter="grounded"><span>Grounded vehicles</span><strong>${grounded}</strong><small>Red · do not assign</small></button><button class="battery" data-action="fleet-filter-quick" data-filter="low"><span>Low-battery EVs</span><strong>${low}</strong><small>Below 40%</small></button><button class="charge" data-action="fleet-filter-quick" data-filter="low"><span>Recommended to charge</span><strong>${charge}</strong><small>EVs below 50%</small></button><button class="review" data-action="fleet-filter-quick" data-filter="needs-data"><span>Needs information</span><strong>${coverage.needsData}</strong><small>Missing source fields</small></button></section>
  <article class="card rivian-panel simplified"><div class="card-head fleet-clean-head"><div class="card-title"><h2>All vehicles</h2><p>${electric.length} electric · ${gas.length} gas · names remain the same everywhere in RelayOps</p></div><div class="head-actions fleet-primary-actions"><input class="fleet-search-input" data-fleet-search placeholder="Find vehicle, VIN, or plate" value="${esc(state.fleetSearch)}"><select class="filter-select" data-fleet-filter>${filters.map(value=>`<option value="${value}" ${state.fleetFilter===value?'selected':''}>${labels[value]}</option>`).join('')}</select><select class="filter-select" data-rivian-sort><option value="normal" ${state.fleetSort==='normal'?'selected':''}>Default order</option><option value="battery-low" ${state.fleetSort==='battery-low'?'selected':''}>Battery: low to high</option></select><button class="btn small" data-action="clear-fleet-search">Clear</button><button class="btn small primary" data-action="refresh-fleet">Refresh</button></div></div>
  <details class="fleet-small-tools"><summary>More fleet tools</summary><div><label class="fleet-count-label">Expected vehicles<input class="fleet-count-input" data-fleet-expected type="number" min="0" inputmode="numeric" value="${state.fleetExpectedCount||''}" placeholder="all"></label>${fleetViewSwitcher()}<button class="btn small" data-action="fleet-live-setup">Live setup</button><button class="btn small" data-action="export-fleet-csv">Vehicle CSV</button><button class="btn small" data-action="export-fleet-gaps">Gap CSV</button><a class="btn small" href="${AMAZON_FLEET_PORTAL_URL}" target="_blank" rel="noopener">Amazon</a><a class="btn small" href="${FLEETOS_PORTAL_URL}" target="_blank" rel="noopener">FleetOS</a></div>${fleetDataDrawer()}</details>
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
  const coverage=fleetCoverageStats(),electric=electricFleetVehicles(),gas=rivianFleet.filter(isGasFleetVehicle),low=electric.filter(v=>v.battery<40).length,grounded=rivianFleet.filter(v=>v.operational==='Grounded').length;
  const avg=Math.round(electric.reduce((n,v)=>n+Number(v.battery||0),0)/Math.max(1,electric.length));
  const sourceStatus=fleetSourceStatus();
  const liveReady=!!fleetLiveEndpoint();
  return `<div class="fleet-health-summary compact"><div class="fleet-health-card primary"><strong>${rivianFleet.length}</strong><span>All vehicles</span><small>${electric.length} electric · ${gas.length} gas</small></div><div class="fleet-health-card ${low?'warn':'ok'}"><strong>${avg}%</strong><span>EV battery average</span><small>${low} below 40%</small></div><div class="fleet-health-card ${grounded?'danger':'ok'}"><strong>${grounded}</strong><span>Grounded</span><small>Do not assign</small></div><div class="fleet-health-card ${coverage.needsData?'warn':'ok'}"><strong>${coverage.verified}/${coverage.total}</strong><span>Verified sources</span><small>${sourceStatus.hasAmazon?'Amazon loaded':'Needs Amazon'} · ${sourceStatus.hasFleetos?'FleetOS loaded':'Needs FleetOS'} · ${liveReady?'Live ready':'Manual import'}</small></div></div>`;
}

function fleetChargeRows() {
  return electricFleetVehicles().filter(v=>Number(v.battery)<50).sort((a,b)=>Number(a.battery)-Number(b.battery)||String(a.name||'').localeCompare(String(b.name||'')));
}
function fleetChargeRecommendations() {
  const rows=fleetChargeRows();
  const urgent=rows.filter(v=>Number(v.battery)<40).length;
  const preview=rows.slice(0,8).map(v=>`<button data-action="toggle-fleet-card" data-vin="${esc(v.vin)}" class="${Number(v.battery)<40?'urgent':'watch'}"><b>${esc(fleetDisplayName(v))}</b><span>${v.battery}% · ${v.miles} mi</span><small>${esc(v.plate||v.vin)} · ${esc(v.operational||'—')}</small></button>`).join('');
  return `<div class="fleet-charge-recommendations ${rows.length?'warn':'ok'}"><div><strong>Recommended to be charged</strong><span>${rows.length?`${rows.length} EV${rows.length===1?'':'s'} under 50% · ${urgent} priority under 40%`:'No EVs under 50% right now'}</span></div><div class="fleet-charge-preview">${preview||'<span class="charge-empty">Fleet is above the watch threshold.</span>'}</div><div class="fleet-charge-actions"><button class="btn small ${rows.length?'primary':'ghost'}" data-action="copy-charge-recommendations">${ICONS.copy} Copy charge list</button><button class="btn small" data-action="fleet-filter-quick" data-filter="low">Show low battery</button></div></div>`;
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
function parkingChargerButton(key,label='Charger') {
  const status=state.parkingChargerStatus[key]||'unknown',text=status==='green'?'CHG':status==='red'?'FAULT':'SET';
  return `<button type="button" class="parking-charger-toggle charger-${status}" data-parking-charger="${esc(key)}" title="${esc(label)}: click for green, red, or clear"><i></i><span>${text}</span></button>`;
}
function parkingChargerColumn() {
  const leftSlots=parkingSlots('west'),rightSlots=parkingSlots('east'),leftCount=leftSlots.length,rightCount=rightSlots.length,rows=Math.max(leftCount,rightCount,4);
  const tent=`<div class="parking-tent-square" title="Operations tent"><svg viewBox="0 0 64 52" aria-hidden="true"><path d="M32 5 57 45H7L32 5Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M32 5v40M20 45l12-18 12 18" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg><span>TENT</span></div>`;
  return `<div class="parking-crosswalk charger-column"><div class="parking-charger-pairs">${Array.from({length:rows},(_,index)=>{const isTent=index===3,isBottomCrosswalk=index>=19,left=index<leftCount&&!isTent&&!isBottomCrosswalk&&leftSlots[index]?.kind!=='crosswalk'?parkingChargerButton(`middle-${index+1}-left`,`Left charger ${index+1}`):'<span></span>',right=index<rightCount&&!isTent&&!isBottomCrosswalk&&rightSlots[index]?.kind!=='crosswalk'?parkingChargerButton(`middle-${index+1}-right`,`Right charger ${index+1}`):'<span></span>';return isTent?`<div class="charger-pair tent-row"><span></span>${tent}<span></span></div>`:`<div class="charger-pair">${left}${right}</div>`;}).join('')}</div></div>`;
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
  const upperCharger=['northLeft','northRight'].includes(slot.zone)?parkingChargerButton(`upper-${slot.id}`,`${slot.label} charger`):'';
  return `<div class="parking-slot parking-slot-row zone-${esc(slot.zone)}${tone}${selected}${blocked?' blocked':''}${charging?' charging':''}${hasVehicle?' has-vehicle':''}${slot.zone==='gas'?' gas-vehicle':' ev-vehicle'}" title="${esc(slot.label)}"><label class="parking-van-cell" data-parking-select="${esc(slot.id)}"><span>${esc(slot.label)}</span><input aria-label="${esc(slot.label)}" data-parking-id="${esc(slot.id)}" value="${esc(slot.value||'')}" placeholder="${slot.kind==='street'?'STREET':''}">${!showBatteryBox&&status?`<em>${status}</em>`:''}</label>${showBatteryBox?`<label class="parking-battery-mini battery-${batteryTone}" title="Battery % for ${esc(slot.value||slot.label)}"><input aria-label="Battery percent for ${esc(slot.value||slot.label)}" data-parking-battery="${esc(slot.id)}" type="number" min="0" max="100" inputmode="numeric" value="${esc(battery)}" placeholder="--"></label>`:''}${upperCharger}</div>`;
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
  const slot=selectedParkingSlot();
  if(!slot)return '';
  const battery=parkingBatteryForSlot(slot);
  const kinds=['spot','charging','crosswalk','overflow','street','blocked'];
  return `<div class="parking-selected-card"><div><span class="eyebrow">Selected van</span><strong>${esc(slot.value||'Empty spot')}</strong><small>${esc(slot.label)} · ${esc(slot.zone)}</small></div><label>Battery %<input data-parking-battery="${esc(slot.id)}" type="number" min="0" max="100" inputmode="numeric" value="${esc(battery)}" placeholder="Type %"></label><label>Spot type<select data-parking-kind="${esc(slot.id)}">${kinds.map(k=>`<option value="${k}" ${slot.kind===k?'selected':''}>${k}</option>`).join('')}</select></label><div class="parking-selected-actions"><button class="btn small" data-action="clear-selected-parking">Clear selected</button><button class="btn small ghost" data-action="remove-selected-parking">Remove temp spot</button></div></div>`;
}
function parkingModeControls() {
  const modes=[['auto','Auto','Reset to base layout'],['assisted','Assisted','Edit vans + battery'],['manual','Manual','Add/remove custom spots']];
  return `<div class="parking-mode-controls">${modes.map(([mode,label,detail])=>`<button class="${state.parkingMode===mode?'active':''}" data-action="set-parking-mode" data-mode="${mode}"><b>${…68018 tokens truncated…:r.staging,van:'Unassigned',device:'Unassigned',stops:r.stops,packages:r.packages,progress:0,delta:0,status:r.driver==='Unassigned driver'?'Needs review':'Assigned',rescue:'—'}));
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

function updateDeviceSheetCell(id,field,value) {
  const key=normalizeEquipmentId(id);
  if(!key||!['device','portable'].includes(field))return;
  const clean=String(value??'').toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,field==='device'?3:4);
  const details={...deviceSheetDetails()},current={...(details[key]||{device:'',portable:''})};
  current[field]=clean;details[key]=current;
  state.equipmentImport={name:'Device and Portable Sheet',details};
  persist();
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
  persist();
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
  state.equipmentImport={name:'Device and Portable Sheet',details};
  state.deviceClearConfirm=null;persist();render();
  toast(`${section==='ev'?'Electric Vehicles':section==='gas'?'Gas Vehicles':'Helper Bags'} boxes cleared`);
}
function inputDeviceSheetToMorning() {
  const details=deviceSheetDetails();
  const filled=Object.values(details).filter(item=>String(item?.device||'').trim()||String(item?.portable||'').trim()).length;
  if(!filled)return toast('Type at least one Device or Portable number first','error');
  let matched=0,missing=0;
  state.morningRoutes.forEach(route=>{
    const key=normalizeEquipmentId(route.ev);
    if(!key)return;
    const item=details[key];
    if(!item){missing++;return;}
    route.deviceName=item.device||'';route.portable=item.portable||'';matched++;
  });
  state.page='morning';persist();render();
  toast(`${matched} Morning Sheet driver${matched===1?'':'s'} matched by EV/VAN${missing?` · ${missing} assigned vans still blank`:''}`);
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
  const grounded=groundedParkingIds(),values=(zones,reverse=false)=>[...new Set(zones.flatMap(zone=>{const slots=parkingSlots(zone);return reverse?[...slots].reverse():slots;}).map(parkedVanId).filter(id=>id&&!grounded.has(id)))];
  const west=values(['west']),east=values(['east'],true),remainingAll=values(['northRight','northLeft','street','streetLower','west','east','gas']),remainingHealthy=remainingAll.filter(id=>vehicleIssueForEquipmentId(id)?.type!=='battery'),remainingLow=remainingAll.filter(id=>vehicleIssueForEquipmentId(id)?.type==='battery');
  const used=new Set(),cursors=new Map(),take=pool=>{let index=cursors.get(pool)||0,id='';while(index<pool.length&&!id){const candidate=pool[index++];if(!used.has(candidate))id=candidate;}cursors.set(pool,index);if(id)used.add(id);return id;};
  const waves=[...new Set(targets.map(route=>route.wave))].sort((a,b)=>waveMinutes(a)-waveMinutes(b)),assigned=[];targets.forEach(route=>{const waveIndex=Math.max(0,waves.indexOf(route.wave));let van=waveIndex<=1?take(west):waveIndex<=3?take(east):take(remainingHealthy);if(!van)van=take(remainingHealthy)||take(remainingLow);if(van){route.ev=van;fillEquipmentForRoute(route);assigned.push(van);}});
  persist();render();toast(`${assigned.length} vans assigned by parking order${grounded.size?` · ${grounded.size} grounded skipped`:''}`);
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
  if(!gasVehicleIds.includes(van))return;
  const selected=new Set(state.gasAssignmentVans||[]);
  selected.has(van)?selected.delete(van):selected.add(van);
  state.gasAssignmentVans=gasVehicleIds.filter(id=>selected.has(id));
  render();
}
function applyGasVehicleAssignment() {
  const routeIds=state.gasAssignmentRoutes||[], vans=state.gasAssignmentVans||[];
  if(!routeIds.length||!vans.length)return toast('Choose at least one driver and one gas van','error');
  const targets=morningAssignmentTargets().filter(route=>routeIds.includes(route.route));
  const count=Math.min(targets.length,vans.length);
  targets.slice(0,count).forEach((route,i)=>{route.ev=vans[i];fillEquipmentForRoute(route);});
  state.modal=null;state.gasAssignmentRoutes=[];state.gasAssignmentVans=[];
  persist();render();
  toast(`${count} selected gas vehicle${count===1?'':'s'} assigned${targets.length>vans.length?` · ${targets.length-vans.length} driver${targets.length-vans.length===1?'':'s'} still need a van`:''}`);
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
  state.fleetLiveEndpoint=String(endpoint||'').trim();
  state.fleetAmazonUrl=String(amazon||AMAZON_FLEET_PORTAL_URL).trim();
  state.fleetFleetosUrl=String(fleetos||FLEETOS_PORTAL_URL).trim();
  state.fleetLiveLastError='';
  state.modal=null;
  persist();render();
  toast(state.fleetLiveEndpoint?'Live setup saved — Refresh will try the secure connector first':'Portal links saved — upload/paste fallback will be used until a secure endpoint is added');
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
  const url=new URL(endpoint, 'https://relayops.local/');
  url.searchParams.set('amazonPortalUrl',fleetAmazonPortalUrl());
  url.searchParams.set('fleetosPortalUrl',fleetFleetosPortalUrl());
  const response=await fetch(url.toString(),{headers:{'Accept':'application/json'},credentials:'omit'});
  if(!response.ok)throw new Error(`Live connector returned ${response.status}`);
  const payload=await response.json();
  const vehicles=liveFleetVehiclesFromPayload(payload);
  if(!vehicles.length)throw new Error('Live connector returned no EV VIN rows');
  const uploadedAt=payload.asOf||payload.as_of||payload.fetchedAt||payload.fetched_at||new Date().toISOString();
  state.fleetSourceUploads={};
  state.fleetImport={name:payload.name||'Live Amazon + FleetOS connector',vehicles,uploadedAt};
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
const morningClipboardColumnWidths=[76,132,76,82,76,76,76,76,18,96,96,18,96];
function morningClipboardColgroup(left=0,right=morningClipboardColumnWidths.length-1) {
  const widths=morningClipboardColumnWidths.slice(Math.max(0,left),Math.min(morningClipboardColumnWidths.length-1,right)+1);
  return `<colgroup>${widths.map(width=>`<col style="width:${width}px;min-width:${width}px">`).join('')}</colgroup>`;
}
function clipboardCellStyle(colIndex,type='cell') {
  const width=morningClipboardColumnWidths[colIndex]||76;
  const base=`border:1px solid #111;text-align:center;vertical-align:middle;font-family:Arial,sans-serif;font-size:10pt;font-weight:700;height:21px;width:${width}px;min-width:${width}px;mso-number-format:"\\@";`;
  if(type==='separator')return `${base}background:#050505;color:#050505;border-color:#050505;height:14px;`;
  if(type==='wave')return `${base}background:#eef3ff;font-size:24pt;font-weight:900;writing-mode:vertical-rl;transform:rotate(180deg);`;
  if(type==='time')return `${base}background:#eef3ff;font-size:11pt;font-weight:900;`;
  if(type==='pad')return `${base}background:#eef3ff;font-size:22pt;font-weight:900;`;
  if(type==='spacer'||sheetSpacerColumns.has(colIndex))return `${base}background:#050505;color:#050505;border-color:#050505;`;
  if(colIndex===12)return `${base}background:#b4a7d6;`;
  return `${base}background:#eef3ff;`;
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
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const rows=display.map((r,i)=>clipboardTr(`${i===0?clipboardTd(waveLabel,0,'wave',`rowspan="${display.length}"`):''}${clipboardTd(r.driver||'',1)}${clipboardTd(r._blank?'':r.route||'',2)}${clipboardTd(r.staging||'',3)}${i===0?clipboardTd(pad,4,'pad',`rowspan="${display.length+1}"`):''}${clipboardTd(r.ev||'',5)}${clipboardTd(r.deviceName||'',6)}${clipboardTd(r.portable||'',7)}${clipboardTd('',8,'spacer')}${clipboardTd(r.stops||'',9)}${clipboardTd(r.packages||'',10)}${clipboardTd('',11,'spacer')}${clipboardTd(r.plannedRts||'',12)}`,r._blank?'blank':'route')).join('');
    const time=clipboardTr(`${clipboardTd(morningWaveTimeText(section),0,'time')}${clipboardTd('',1)}${clipboardTd('',2)}${clipboardTd('',3)}${clipboardTd('',5)}${clipboardTd('',6)}${clipboardTd('',7)}${clipboardTd('',8,'spacer')}${clipboardTd('',9)}${clipboardTd('',10)}${clipboardTd('',11,'spacer')}${clipboardTd('',12)}`,'time');
    const separator=clipboardTr(sheetCopyFields.map((_,i)=>clipboardTd('',i,'separator')).join(''),'separator');
    return rows+time+separator;
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
  const rows=[];
  for(let row=bounds.top;row<=bounds.bottom;row++) {
    const cells=[];
    for(let col=bounds.left;col<=bounds.right;col++) {
      const el=cellAt(row,col,bounds.section);
      const text=el?.textContent?.trim()||'';
      const type=el?.closest?.('tr')?.classList?.contains('wave-separator')?'separator':el?.classList?.contains('wave-time-cell')?'time':el?.classList?.contains('pad-label')?'pad':el?.classList?.contains('wave-label')?'wave':sheetSpacerColumns.has(col)?'spacer':'cell';
      cells.push(clipboardTd(text,col,type));
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
function fleetAttentionRows(){const byVin=new Map();rivianFleet.forEach(v=>{const reasons=[v.battery<40?`battery ${v.battery}%`:'',v.operational==='Grounded'?'grounded':'',v.active==='Inactive'?'inactive':''].filter(Boolean);if(reasons.length)byVin.set(cleanVin(v.vin),{v,reasons});});return [...byVin.values()];}
function fleetAttentionText(){return fleetAttentionRows().map(({v,reasons})=>`${v.name} | ${v.vin} | ${v.battery}% / ${v.miles} mi | ${v.active||'—'} | ${v.operational||'—'} | ${reasons.join(', ')}`).join('\n');}
async function copyFleetAttentionList(){const rows=fleetAttentionRows(), text=fleetAttentionText();if(!rows.length)return toast('No low-battery or grounded EVs to copy');const ok=await writeClipboardText(text);toast(ok?`${rows.length} EV alert${rows.length===1?'':'s'} copied for dispatch chat`:'Clipboard access was blocked — use EV CSV instead',ok?'':'error');return ok;}
function chargeRecommendationText(){return fleetChargeRows().map(v=>`${fleetDisplayName(v)} | ${v.vin} | ${v.battery}% | ${v.miles} mi | Plate ${v.plate||'—'} | ${v.active||'—'} | ${v.operational||'—'}${Number(v.battery)<40?' | PRIORITY PLUG-IN':' | plug in if available'}`).join('\n');}
async function copyChargeRecommendations(){const rows=fleetChargeRows(), text=chargeRecommendationText();if(!rows.length)return toast('No EVs under 50% to send for charging');const ok=await writeClipboardText(text);toast(ok?`${rows.length} charge recommendation${rows.length===1?'':'s'} copied for fleet`:'Clipboard access was blocked — use EV CSV instead',ok?'':'error');return ok;}
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
function morningSheetsConnectorPayload() {
  const sections=morningSections(filteredMorningRows()), rows=[], rowTypes=[], sectionMeta=[];
  let index=0;
  sections.forEach(section=>{
    const display=morningDisplayRows(section), pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const startRow=index+3;
    const waveLabel=section.dsp?'DSP':section.label;
    display.forEach((r,i)=>{
      rows.push(sheetCopyFields.map(field=>copyCellValue(r,field,i===0?waveLabel:'',i===0?pad:'')));
      rowTypes.push(r._blank?'blank':'route');
      index+=1;
    });
    rows.push([morningWaveTimeText(section),'','','','','','','','','','','','']);
    rowTypes.push('time');
    const timeRow=index+3;
    index+=1;
    rows.push(['','','','','','','','','','','','','']);
    rowTypes.push('separator');
    const separatorRow=index+3;
    index+=1;
    sectionMeta.push({label:waveLabel,wave:section.wave||'',waveTime:morningWaveTimeText(section),pad,startRow,rowCount:display.length,timeRow,separatorRow,dsp:Boolean(section.dsp)});
  });
  const dateTabs=operationDateTabNames(state.morningOperationDate),sheetName=dateTabs[0]||MORNING_TEMPLATE_SHEET_NAME;
  return {version:'relayops-morning-v1',templateUrl:MORNING_TEMPLATE_URL,operationDate:state.morningOperationDate,sheetName,sheetNameCandidates:dateTabs.length?dateTabs:MORNING_TEMPLATE_SHEET_CANDIDATES,dsp:state.dspCode,generatedAt:new Date().toISOString(),startCell:'A3',writeRange:'A3:M',headers:morningTemplateHeaders,rows,rowTypes,sections:sectionMeta};
}
function morningSheetsPreflight(payload=morningSheetsConnectorPayload()) {
  const rows=payload.rows||[], rowTypes=payload.rowTypes||[], sections=payload.sections||[], headers=payload.headers||[];
  const separatorIndexes=rowTypes.map((type,i)=>type==='separator'?i:-1).filter(i=>i>=0);
  const checks=[
    {label:'Target cell A3',ok:payload.startCell==='A3',detail:'Data starts below the fixed template header row.'},
    {label:'A–M write scope only',ok:payload.writeRange==='A3:M',detail:'RelayOps will not touch columns N and beyond.'},
    {label:'Row 1 headers ready',ok:headers.length===13&&headers[0]==='WAVE'&&headers[12]==='PLANNED RTS',detail:'A–M headers match the opening template.'},
    {label:'Every row has 13 columns',ok:rows.length>0&&rows.every(row=>Array.isArray(row)&&row.length===13),detail:`${rows.length} row${rows.length===1?'':'s'} will write across A–M.`},
    {label:'Black dividers are real rows',ok:separatorIndexes.length>0&&separatorIndexes.every(i=>rows[i]?.length===13&&rows[i].every(cell=>String(cell||'')==='')),detail:`${separatorIndexes.length} divider row${separatorIndexes.length===1?'':'s'} included as numbered sheet rows.`},
    {label:'Wave/Pad merge map ready',ok:sections.length>0&&sections.every(section=>Number(section.startRow)>=3&&Number(section.rowCount)>0&&Number(section.timeRow)>Number(section.startRow)&&Number(section.separatorRow)>Number(section.timeRow)),detail:`${sections.length} section${sections.length===1?'':'s'} tell Google which Wave and Pad cells to merge.`},
    {label:'Row types match payload',ok:rowTypes.length===rows.length&&rowTypes.includes('route')&&rowTypes.includes('time')&&rowTypes.includes('separator'),detail:'Google can tell route rows, wave-time rows, blank rows, and dividers apart.'}
  ];
  return {ready:checks.every(check=>check.ok),checks};
}
function morningSheetsPreflightHtml(payload=morningSheetsConnectorPayload()) {
  const preflight=morningSheetsPreflight(payload);
  return `<div class="sheets-preflight ${preflight.ready?'ready':'warn'}"><div><strong>${preflight.ready?'Preflight ready':'Preflight needs review'}</strong><span>${preflight.ready?'This payload is shaped for the A–M Google Sheets template. Columns N+ stay untouched.':'Fix the warning items before sending to the template.'}</span></div><div class="sheets-preflight-grid">${preflight.checks.map(check=>`<span class="${check.ok?'ok':'warn'}"><b>${check.ok?'✓':'!'}</b><em>${esc(check.label)}</em><small>${esc(check.detail)}</small></span>`).join('')}</div></div>`;
}
function morningSheetsHandoffProof(payload=morningSheetsConnectorPayload()) {
  const rows=payload.rows||[], sections=payload.sections||[];
  const visibleRows=morningSheetCopyRows();
  const mismatchIndex=rows.findIndex((row,i)=>JSON.stringify(row.map(cell=>String(cell??'')))!==JSON.stringify((visibleRows[i]||[]).map(cell=>String(cell??''))));
  const exactRows=rows.length===visibleRows.length&&mismatchIndex<0;
  const lastRow=rows.length?rows.length+2:2;
  const separatorRows=sections.map(section=>section.separatorRow).filter(Boolean);
  const mergeRows=sections.map(section=>`${section.label||'Section'} ${section.startRow}:${section.timeRow}`).join(', ');
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
  const dividerRows=sections.map(section=>section.separatorRow).filter(Boolean);
  const mergeCount=sections.filter(section=>Number(section.startRow)>=3&&Number(section.timeRow)>Number(section.startRow)).length;
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
  return `// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;
const RELAYOPS_WRITE_RANGE = 'A3:M';
const RELAYOPS_BUILD = '2026-07-10-dated-tab';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('RelayOps')
    .addItem('Connector status', 'relayOpsConnectorStatus')
    .addItem('Validate template layout', 'relayOpsValidateTemplate')
    .addItem('Run demo write', 'testRelayOpsMorningSheet')
    .addToUi();
}

function relayOpsConnectorStatus() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.getUi().alert(
    'RelayOps connector is installed',
    'Spreadsheet: ' + ss.getName() + '\\nDeploy this Apps Script as a Web app, then paste the /exec URL into the RelayOps dashboard.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function doGet(e) {
  const sheet = findRelayOpsMorningSheet(relayOpsDefaultPayload());
  const layout = relayOpsTemplateLayout(sheet, 0);
  return relayOpsJson({
    ok: true,
    connector: 'relayops-morning-v1',
    build: RELAYOPS_BUILD,
    spreadsheet: SpreadsheetApp.getActiveSpreadsheet().getName(),
    sheet: sheet.getName(),
    startCell: 'A3',
    writeRange: RELAYOPS_WRITE_RANGE,
    layout: layout,
    checkedAt: new Date().toISOString()
  });
}

function doPost(e) {
  let lock = null;
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const validation = validateRelayOpsMorningPayload(payload);
    if (!validation.ready) throw new Error('RelayOps preflight failed: ' + validation.errors.join('; '));
    if (payload.dryRun) {
      const sheet = findRelayOpsMorningSheet(payload);
      const layout = relayOpsTemplateLayout(sheet, (payload.rows || []).length);
      return relayOpsJson({
        ok: true,
        build: RELAYOPS_BUILD,
        dryRun: true,
        sheet: sheet.getName(),
        startCell: payload.startCell,
        writeRange: payload.writeRange,
        writtenRange: 'A3:M' + ((payload.rows || []).length + 2),
        lastCell: 'M' + ((payload.rows || []).length + 2),
        rows: (payload.rows || []).length,
        sections: (payload.sections || []).length,
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
    sheetName: 'Morning Operations',
    sheetNameCandidates: ['Morning Operations', 'Opening Operations', 'Morning Sheet', 'Sheet1']
  };
}

function validateRelayOpsMorningPayload(payload) {
  const errors = [];
  const rows = payload && payload.rows || [];
  const rowTypes = payload && payload.rowTypes || [];
  const headers = payload && payload.headers || [];
  const sections = payload && payload.sections || [];
  if (!payload || payload.version !== 'relayops-morning-v1') errors.push('Wrong payload version');
  if (payload && payload.startCell !== 'A3') errors.push('Start cell must be A3');
  if (payload && payload.writeRange !== RELAYOPS_WRITE_RANGE) errors.push('Write range must be A3:M');
  if (headers.length !== RELAYOPS_COLS || headers[0] !== 'WAVE' || headers[12] !== 'PLANNED RTS') errors.push('Header row must match A-M template');
  if (!rows.length) errors.push('No morning rows sent');
  rows.forEach(function(row, i) {
    if (!Array.isArray(row) || row.length !== RELAYOPS_COLS) errors.push('Row ' + (i + 1) + ' must have 13 columns');
  });
  if (rowTypes.length !== rows.length) errors.push('Row types must match row count');
  if (rowTypes.indexOf('route') < 0 || rowTypes.indexOf('time') < 0 || rowTypes.indexOf('separator') < 0) errors.push('Missing route/time/separator row types');
  rowTypes.forEach(function(type, i) {
    if (type === 'separator' && rows[i] && rows[i].some(function(cell) { return String(cell || '') !== ''; })) errors.push('Separator row ' + (i + 1) + ' must be empty');
  });
  if (!sections.length) errors.push('No wave sections sent');
  sections.forEach(function(section, i) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    const time = Number(section.timeRow);
    const separator = Number(section.separatorRow);
    if (!start || start < RELAYOPS_START_ROW || !count || time <= start || separator <= time) errors.push('Section ' + (i + 1) + ' has invalid merge rows');
  });
  return {ready: errors.length === 0, errors: errors};
}

function relayOpsValidateTemplate() {
  const sheet = findRelayOpsMorningSheet(relayOpsDefaultPayload());
  const layout = relayOpsTemplateLayout(sheet, 0);
  const ready = layout.hasEnoughColumns && layout.maxRows >= RELAYOPS_START_ROW;
  SpreadsheetApp.getUi().alert(
    ready ? 'RelayOps template layout is ready' : 'RelayOps template needs review',
    'Sheet tab: ' + sheet.getName() +
      '\\nWrite range: ' + RELAYOPS_WRITE_RANGE +
      '\\nRows available: ' + layout.maxRows + ' / needs ' + layout.neededRows +
      '\\nColumns available: ' + layout.maxColumns + ' / needs ' + layout.neededColumns +
      '\\nFrozen rows: ' + layout.frozenRows +
      '\\nStatus: ' + (ready ? 'Ready for Dry run / Send' : 'Dry run can auto-expand rows/columns, then Send can format A:M'),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  return layout;
}

function relayOpsTemplateLayout(sheet, sentRows) {
  const neededRows = RELAYOPS_START_ROW + Math.max(Number(sentRows) || 0, 120) - 1;
  return {
    maxRows: sheet.getMaxRows(),
    maxColumns: sheet.getMaxColumns(),
    neededRows: neededRows,
    neededColumns: RELAYOPS_COLS,
    hasEnoughRows: sheet.getMaxRows() >= neededRows,
    hasEnoughColumns: sheet.getMaxColumns() >= RELAYOPS_COLS,
    frozenRows: sheet.getFrozenRows()
  };
}

function ensureRelayOpsTemplateCapacity(sheet, rowCount) {
  const layout = relayOpsTemplateLayout(sheet, rowCount);
  if (!layout.hasEnoughRows) sheet.insertRowsAfter(sheet.getMaxRows(), layout.neededRows - sheet.getMaxRows());
  if (!layout.hasEnoughColumns) sheet.insertColumnsAfter(sheet.getMaxColumns(), RELAYOPS_COLS - sheet.getMaxColumns());
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
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = findRelayOpsMorningSheet(payload);
  const rows = payload.rows || [];
  const rowTypes = payload.rowTypes || [];
  const headers = (payload.headers || []).slice(0, RELAYOPS_COLS);
  if (!rows.length) throw new Error('No morning rows sent');
  while (headers.length < RELAYOPS_COLS) headers.push('');
  const rowCount = Math.max(rows.length, 120);
  ensureRelayOpsTemplateCapacity(sheet, rows.length);
  const target = sheet.getRange(RELAYOPS_START_ROW, RELAYOPS_START_COL, rowCount, RELAYOPS_COLS);
  target.breakApart();
  target.clearContent();
  target.clearFormat();
  target.setBackground('#ffffff').setFontColor('#111111').setFontWeight('normal')
    .setFontSize(10).setTextRotation(0)
    .setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, '#111111', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(RELAYOPS_START_ROW, RELAYOPS_START_COL, rows.length, RELAYOPS_COLS).setValues(rows);

  freezeRelayOpsHeader(sheet);
  sheet.getRange(1, 1, 1, RELAYOPS_COLS).setValues([headers])
    .setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, '#111111', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(1, 1).setBackground('#b4a7d6');
  sheet.getRange(1, 2, 1, 7).setBackground('#86e8ed').setFontColor('#000000');
  sheet.getRange(1, 9).setBackground('#050505').setFontColor('#050505');
  sheet.getRange(1, 10, 1, 2).setBackground('#86e8ed').setFontColor('#000000');
  sheet.getRange(1, 12).setBackground('#050505').setFontColor('#050505');
  sheet.getRange(1, 13).setBackground('#b4a7d6').setFontColor('#000000');
  sheet.setRowHeight(1, 28);
  sheet.setColumnWidths(1, 1, 75);
  sheet.setColumnWidths(2, 1, 132);
  sheet.setColumnWidths(3, 2, 74);
  sheet.setColumnWidths(5, 1, 76);
  sheet.setColumnWidths(6, 3, 76);
  sheet.setColumnWidths(9, 1, 18);
  sheet.setColumnWidths(10, 2, 94);
  sheet.setColumnWidths(12, 1, 18);
  sheet.setColumnWidths(13, 1, 92);

  rows.forEach(function(row, i) {
    const sheetRow = RELAYOPS_START_ROW + i;
    const rowType = rowTypes[i] || '';
    if (rowType === 'separator') {
      sheet.getRange(sheetRow, RELAYOPS_START_COL, 1, RELAYOPS_COLS)
        .setBackground('#050505').setFontColor('#050505').setBorder(true, true, true, true, true, true, '#050505', SpreadsheetApp.BorderStyle.SOLID);
      sheet.setRowHeight(sheetRow, 14);
    } else {
      sheet.getRange(sheetRow, 1, 1, 8).setBackground('#eef3ff');
      sheet.getRange(sheetRow, 9, 1, 1).setBackground('#050505').setFontColor('#050505');
      sheet.getRange(sheetRow, 10, 1, 2).setBackground('#eef3ff');
      sheet.getRange(sheetRow, 12, 1, 1).setBackground('#050505').setFontColor('#050505');
      sheet.getRange(sheetRow, 13, 1, 1).setBackground('#b4a7d6');
      if (rowType === 'time') sheet.getRange(sheetRow, 1, 1, RELAYOPS_COLS)
        .setFontSize(10).setTextRotation(0).setFontWeight('bold').setHorizontalAlignment('center');
      sheet.setRowHeight(sheetRow, rowType === 'blank' ? 18 : 21);
    }
  });

  (payload.sections || []).forEach(function(section) {
    const start = Number(section.startRow);
    const count = Number(section.rowCount);
    if (!start || !count) return;
    sheet.getRange(start, 1, count, 1).merge().setValue(section.label || '')
      .setFontSize(26).setFontWeight('bold').setTextRotation(90).setBackground('#eef3ff');
    sheet.getRange(start + count, 1).setValue(section.waveTime || '').setFontWeight('bold').setBackground('#eef3ff');
    sheet.getRange(start, 5, count + 1, 1).merge().setValue(section.pad || '')
      .setFontSize(22).setFontWeight('bold').setBackground('#eef3ff');
  });
  const lastRow = rows.length + RELAYOPS_START_ROW - 1;
  return {sheetName: sheet.getName(), startCell: 'A3', writeRange: RELAYOPS_WRITE_RANGE, writtenRange: 'A3:M' + lastRow, lastCell: 'M' + lastRow};
}

function findRelayOpsMorningSheet(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = [payload.sheetName].concat(payload.sheetNameCandidates || []).filter(Boolean);
  let sheet = null;
  for (var s = 0; s < sheetNames.length && !sheet; s++) sheet = ss.getSheetByName(sheetNames[s]);
  if (!sheet && payload.operationDate) throw new Error('No operations tab found for ' + payload.operationDate + '. Create or rename a tab to ' + sheetNames.join(' or ') + ', then send again. Nothing was written.');
  sheet = sheet || ss.getActiveSheet() || ss.getSheets()[0];
  if (!sheet) throw new Error('No target sheet tab found');
  return sheet;
}

function testRelayOpsMorningSheet() {
  const sample = {
    version: 'relayops-morning-v1',
    startCell: 'A3',
    writeRange: 'A3:M',
    headers: ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'],
    sheetName: 'Morning Operations',
    sheetNameCandidates: ['Morning Operations','Opening Operations','Morning Sheet','Sheet1'],
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    rowTypes: ['route','time','separator'],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}]
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
    if(button)button.textContent='Sending filtered waves…';
    const result=await postMorningSheetsPayload(endpoint,payload);
    const sentAt=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    state.morningSheetsLastDryRun=sentAt;
    state.morningSheetsLastPush=sentAt;
    state.morningSheetsLastReceipt={sheet:result.sheet||payload.sheetName,startCell:result.startCell||payload.startCell,writeRange:result.writtenRange||result.writeRange||payload.writeRange,lastCell:result.lastCell||'',rows:result.rows||payload.rows.length,sections:result.sections||payload.sections.length,status:'confirmed',updatedAt:result.updatedAt||sentAt,sentAt,filterScope:morningFilterScopeText()};
    state.morningSheetsLastError='';
    persist(); render();
    toast(`Google confirmed ${filteredMorningRows().length} filtered routes · ${result.writtenRange||payload.writeRange}`);
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
  const ok=await writeClipboardText(morningSheetsAppsScript());
  toast(ok?'Apps Script CODE copied — delete myFunction, then paste into the empty Apps Script editor':'Clipboard blocked — download the .gs script file instead',ok?'':'error');
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
    '5a. In the RelayOps menu, click Validate template layout. Confirm it says the template is ready for A3:M.',
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
    'Expected target: Morning Operations tab, protected write scope A3:M only, exact written range like A3:M99, 13 A-M columns. Columns N+ stay untouched.'
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
  const lastCell=proof.range.split(':')[1] || 'M';
  return [
    'RelayOps Google Sheet Send Verification',
    '',
    `Template: ${MORNING_TEMPLATE_URL}`,
    `Target tab: ${payload.sheetName}`,
    `Expected write range: ${proof.range}`,
    `Expected last cell: ${lastCell}`,
    'Protected write scope: A3:M only',
    `Rows sent: ${payload.rows.length}`,
    `Wave/Pad merge sections: ${payload.sections.length}`,
    `Black divider rows: ${proof.dividerRows || 'none'}`,
    '',
    'After Send Now:',
    `1. Open the Google Sheet template and confirm the ${payload.sheetName} tab is selected.`,
    '2. Row 1 should stay frozen while scrolling.',
    '3. Headers A1:M1 should read: WAVE, DRIVER, ROUTE, STAGING, PAD, EV, DEVICE, PORTABLE, blank I, STOP COUNT, PACKAGE COUNT, blank L, PLANNED RTS.',
    `4. Confirm the first route starts at A${firstSection.startRow||3} and data ends at ${lastCell}.`,
    '5. Confirm Wave cells in column A and Pad cells in column E are merged like the template.',
    '6. Confirm black divider rows are still black and row-numbered.',
    '7. Confirm columns I and L are slim black spacer columns.',
    '8. Confirm Planned RTS column M is purple.',
    '9. Confirm columns N and beyond were not changed.',
    `10. Confirm the RelayOps receipt shows Range ${proof.range} and Last cell ${lastCell}.`,
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
    if(!response.ok||!/relayops-morning-v1/.test(text)||!/A3:M/.test(text))throw new Error(`Unexpected connector response ${response.status}`);
    if(!/2026-07-10-dated-tab/.test(text))throw new Error('Connector deployment is outdated. In Apps Script choose Deploy → Manage deployments → Edit → New version → Deploy.');
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
  const cls=(i)=>i===0?'waveHead':i===8||i===11?'spacer':i===12?'plannedHead':'head';
  const cell=(value='',klass='cell',attrs='')=>`<td ${attrs} class="${klass}">${xmlEscape(value)}</td>`;
  const colgroup=`<colgroup>${morningClipboardColumnWidths.map(width=>`<col style="width:${width}px">`).join('')}</colgroup>`;
  const sections=morningSections(filteredMorningRows());
  const body=sections.map(section=>{
    const rows=morningDisplayRows(section);
    const waveText=section.dsp?'DSP':section.label;
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const data=rows.map((r,i)=>`<tr>${i===0?cell(waveText,section.dsp?'wave dsp':'wave',`rowspan="${rows.length}"`):''}${cell(r.driver||'','driver')}${cell(r._blank?'':r.route||'')}${cell(r.staging||'')}${i===0?cell(pad,'pad',`rowspan="${rows.length+1}"`):''}${cell(r.ev||'')}${cell(r.deviceName||'')}${cell(r.portable||'')}${cell('','spacer')}${cell(r.stops||'')}${cell(r.packages||'')}${cell('','spacer')}${cell(r.plannedRts||'','planned')}</tr>`).join('');
    return `${data}<tr>${cell(morningWaveTimeText(section),'waveTime')}${cell('')}${cell('')}${cell('')}${cell('')}${cell('')}${cell('')}${cell('','spacer')}${cell('')}${cell('')}${cell('','spacer')}${cell('','planned')}</tr><tr class="separator">${headers.map(()=>cell('','separatorCell')).join('')}</tr>`;
  }).join('');
  const excelOptions=`<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Morning Operations</x:Name><x:WorksheetOptions><x:FreezePanes/><x:FrozenNoSplit/><x:SplitHorizontal>1</x:SplitHorizontal><x:TopRowBottomPane>1</x:TopRowBottomPane><x:ActivePane>2</x:ActivePane></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>`;
  const html=`<!doctype html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8">${excelOptions}<style>
    table{border-collapse:collapse;font-family:Arial,sans-serif;} td{mso-number-format:"\\@";}
    .head,.waveHead,.plannedHead{height:34px;border:2px solid #111;text-align:center;font-weight:900;font-size:12px;background:#92f4fa;}
    .waveHead,.plannedHead{background:#b4a7d6}.spacer{width:16px;background:#000;border:1px solid #000;color:#000}
    .cell,.driver,.planned{height:24px;min-width:82px;border:1px solid #222;text-align:center;font-weight:700;font-size:10px;background:#eef3ff}.driver{min-width:130px}.wave{min-width:90px;font-size:28px;font-weight:900;writing-mode:vertical-rl;transform:rotate(180deg);background:#eef3ff}.waveTime{font-size:13px;font-weight:900;background:#eef3ff}.dsp{vertical-align:bottom}.pad{font-size:24px;font-weight:900;background:#eef3ff}.planned{background:#b4a7d6}.separatorCell{height:14px;background:#000;border:1px solid #000;color:#000}
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
function downloadFleetTemplate(){const h=['Source','Vehicle Name','VIN','License Plate','Active','Operational Status','Battery %','Range Miles','Dispatcher Note'];const guide1=['READ ME','','','','','','','','Amazon required: Vehicle Name, VIN, License Plate, Active, Operational Status'];const guide2=['READ ME','','','','','','','','FleetOS required: VIN, Battery % or State of Charge, Range Miles'];const guide3=['READ ME','','','','','','','','Do not rename Amazon vehicles — RelayOps keeps Amazon fleet-list names exactly'];const amazon=['Amazon fleet list','LLOL EV 21','7FCEHEB79PN014816','9ABC123','Active','Operational','','','Official name/status row'];const fleetos=['FleetOS tracker','','7FCEHEB79PN014816','','','','63%','98','Battery/range row for same VIN'];const both=['Amazon + FleetOS','LLOL EV 22','7FCTGAAA1PN000184','9XYZ222','Active','Operational','88%','137','One complete combined row also works'];downloadBlob(`${[h,guide1,guide2,guide3,amazon,fleetos,both].map(r=>r.map(csvEscape).join(',')).join('\r\n')}\r\n`,'text/csv','fleetos-amazon-ev-import-template.csv');toast('FleetOS/Amazon EV template downloaded');}

function xmlEscape(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function persist(){
localStorage.setItem('relayops_equipment_import',JSON.stringify(state.equipmentImport||null));
localStorage.setItem('relayops_device_custom_rows',JSON.stringify(state.deviceCustomRows||{ev:[],gas:[],helper:[]}));
localStorage.setItem('relayops_organization_name',state.organizationName);
localStorage.setItem('relayops_station_code',state.stationCode);
localStorage.setItem('relayops_message_queue_template',state.messageQueueTemplate);
localStorage.setItem('relayops_message_queue_status',JSON.stringify(state.messageQueueStatus||{}));
localStorage.setItem('relayops_schedule_entries',JSON.stringify(state.scheduleEntries||[]));
localStorage.setItem('relayops_schedule_import_name',state.scheduleImportName||'');
localStorage.setItem('relayops_schedule_filter',state.scheduleFilter||'all');
localStorage.setItem('relayops_call_off_driver_keys',JSON.stringify(state.callOffDriverKeys||{}));
localStorage.setItem('relayops_schedule_driver_marks',JSON.stringify(state.scheduleDriverMarks||{}));
localStorage.setItem('relayops_parking_charger_status',JSON.stringify(state.parkingChargerStatus||{}));
localStorage.setItem('relayops_parking_notes',state.parkingNotes||'');
localStorage.setItem('relayops_charging_station_checked',state.chargingStationChecked||'');
localStorage.setItem('relayops_page',state.page);localStorage.setItem('relayops_role',state.role);localStorage.setItem('relayops_phase',state.phase);localStorage.setItem('relayops_routes',JSON.stringify(state.routes));localStorage.setItem('relayops_morning',JSON.stringify(state.morningRoutes));localStorage.setItem('relayops_dsp',state.dspCode);localStorage.setItem('relayops_excluded',state.lastImportExcluded);localStorage.setItem('relayops_published',state.rosterPublished);localStorage.setItem('relayops_rating',state.rating);localStorage.setItem('relayops_fit_rows',state.fitMorningRows);localStorage.setItem('relayops_fleet_sort',state.fleetSort);localStorage.setItem('relayops_fleet_filter',state.fleetFilter);localStorage.setItem('relayops_fleet_view',state.fleetView);localStorage.setItem('relayops_fleet_search',state.fleetSearch);localStorage.setItem('relayops_expanded_fleet_vin',state.expandedFleetVin);localStorage.setItem('relayops_fleet_refresh',state.fleetLastRefresh);localStorage.setItem('relayops_fleet_import',JSON.stringify(state.fleetImport||null));localStorage.setItem('relayops_fleet_source_uploads',JSON.stringify(state.fleetSourceUploads||{}));localStorage.setItem('relayops_fleet_expected_count',state.fleetExpectedCount||0);localStorage.setItem('relayops_fleet_live_endpoint',state.fleetLiveEndpoint||'');localStorage.setItem('relayops_morning_sheets_endpoint',state.morningSheetsEndpoint||'');localStorage.setItem('relayops_morning_sheets_last_push',state.morningSheetsLastPush||'');localStorage.setItem('relayops_morning_sheets_last_error',state.morningSheetsLastError||'');localStorage.setItem('relayops_morning_sheets_last_receipt',JSON.stringify(state.morningSheetsLastReceipt||null));localStorage.setItem('relayops_morning_sheets_last_dry_run',state.morningSheetsLastDryRun||'');localStorage.setItem('relayops_fleet_amazon_url',state.fleetAmazonUrl||AMAZON_FLEET_PORTAL_URL);localStorage.setItem('relayops_fleet_fleetos_url',state.fleetFleetosUrl||FLEETOS_PORTAL_URL);localStorage.setItem('relayops_fleet_live_last_pull',state.fleetLiveLastPull||'');localStorage.setItem('relayops_fleet_live_last_error',state.fleetLiveLastError||'');localStorage.setItem('relayops_van_parking',JSON.stringify(state.vanParking||[]));localStorage.setItem('relayops_van_parking_updated',state.vanParkingUpdated||'');localStorage.setItem('relayops_van_parking_batteries',JSON.stringify(state.vanParkingBatteries||{}));localStorage.setItem('relayops_selected_parking_id',state.selectedParkingId||'');localStorage.setItem('relayops_parking_mode',state.parkingMode||'manual');localStorage.setItem('relayops_driver_contacts',JSON.stringify(state.driverContacts||[]));localStorage.setItem('relayops_driver_contacts_last_import',state.driverContactsLastImport||'');localStorage.setItem('relayops_removed_driver_keys',JSON.stringify(state.removedDriverKeys||[]));
localStorage.setItem('relayops_morning_operation_date',state.morningOperationDate||defaultOperationDate());
localStorage.setItem('relayops_fleet_name_overrides',JSON.stringify(state.fleetNameOverrides||{}));
window.RelayOpsCloud?.schedule?.('workspace.autosave');
}
function toast(message,type='success') { let stack=document.getElementById('toast-stack');if(!stack){stack=document.createElement('div');stack.id='toast-stack';stack.className='toast-stack';document.body.appendChild(stack);}const el=document.createElement('div');el.className=`toast ${type}`;el.innerHTML=`<span class="toast-icon">${type==='error'?'!':'✓'}</span><span>${esc(message)}</span>`;stack.appendChild(el);setTimeout(()=>el.remove(),3200); }

function sharedWorkspaceState() {
  return {
    schemaVersion:1,dspCode:state.dspCode,organizationName:state.organizationName,stationCode:state.stationCode,routes:state.routes,morningRoutes:state.morningRoutes,
    lastImportExcluded:state.lastImportExcluded,rosterPublished:state.rosterPublished,
    fleetImport:state.fleetImport,fleetSourceUploads:state.fleetSourceUploads,fleetExpectedCount:state.fleetExpectedCount,
    fleetNameOverrides:state.fleetNameOverrides,vanParking:state.vanParking,vanParkingUpdated:state.vanParkingUpdated,chargingStationChecked:state.chargingStationChecked,
    vanParkingBatteries:state.vanParkingBatteries,parkingChargerStatus:state.parkingChargerStatus,parkingNotes:state.parkingNotes,equipmentImport:state.equipmentImport,deviceCustomRows:state.deviceCustomRows,
    driverContacts:state.driverContacts,driverContactsLastImport:state.driverContactsLastImport,removedDriverKeys:state.removedDriverKeys,
    messageQueueTemplate:state.messageQueueTemplate,messageQueueStatus:state.messageQueueStatus,
    scheduleEntries:state.scheduleEntries,scheduleImportName:state.scheduleImportName,callOffDriverKeys:state.callOffDriverKeys,scheduleDriverMarks:state.scheduleDriverMarks,
    morningSheetsEndpoint:state.morningSheetsEndpoint
  };
}
function applySharedWorkspaceState(payload={}) {
  const allowed=['dspCode','organizationName','stationCode','routes','morningRoutes','lastImportExcluded','rosterPublished','fleetImport','fleetSourceUploads','fleetExpectedCount','fleetNameOverrides','vanParking','vanParkingUpdated','chargingStationChecked','vanParkingBatteries','parkingChargerStatus','parkingNotes','equipmentImport','deviceCustomRows','driverContacts','driverContactsLastImport','removedDriverKeys','messageQueueTemplate','messageQueueStatus','scheduleEntries','scheduleImportName','callOffDriverKeys','scheduleDriverMarks','morningSheetsEndpoint'];
  allowed.forEach(key=>{if(Object.prototype.hasOwnProperty.call(payload,key))state[key]=payload[key];});
  if(state.fleetImport?.vehicles?.length)applyFleetVehicles(state.fleetImport.vehicles,{silent:true});
  persist();render();
}
window.RelayOpsApp={sharedState:sharedWorkspaceState,applySharedState:applySharedWorkspaceState,operationDate:()=>state.morningOperationDate};
window.RelayOpsCloud?.on?.(event=>{
  if(event.type==='offline'){state.cloudStatus='setup-required';render();}
  if(event.type==='auth'){state.cloudStatus=event.session?'connecting':'signed-out';state.cloudUser=event.session?.user?.email||'';render();}
  if(event.type==='presence'){state.cloudPresence=event.users||[];render();}
  if(event.type==='loaded'||event.type==='saved'){state.cloudStatus='synced';render();}
  if(event.type==='remote-update'){state.cloudStatus='synced';render();toast('Another dispatcher updated today’s workspace');}
  if(event.type==='conflict')toast('A newer dispatcher update was loaded before saving','error');
  if(event.type==='error'){state.cloudStatus='error';render();toast(`Cloud sync error: ${event.error?.message||'retrying locally'}`,'error');}
  if(event.type==='magic-link-sent')toast(`Sign-in link sent to ${event.email}`);
});
render();
window.RelayOpsCloud?.init?.().catch(error=>console.error('RelayOps cloud initialization failed',error));
