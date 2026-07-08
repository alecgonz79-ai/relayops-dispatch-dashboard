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
const FLEETOS_PORTAL_URL = 'https://business.rivian.com/vehicles/tracker';
const MORNING_TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1DqQxK7iHPEGnHgQRaZeDvxLMMi5GcZzdsilzew24ypQ/edit?gid=0#gid=0';

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
  ['10(93%)','','','','39'].forEach((value,i)=>slots.push({id:`street-${i+1}`,zone:'street',label:i===0?'Street charge':'Street curb',value,kind:'street'}));
  west.forEach((value,i)=>slots.push({id:`west-${String(i+1).padStart(2,'0')}`,zone:'west',label:`Left row ${i+1}`,value,kind:i===19?'crosswalk':'spot'}));
  crosswalk.forEach((value,i)=>slots.push({id:`crosswalk-${String(i+1).padStart(2,'0')}`,zone:'crosswalk',label:`Crosswalk ${i+1}`,value,kind:'crosswalk'}));
  east.forEach((value,i)=>slots.push({id:`east-${String(i+1).padStart(2,'0')}`,zone:'east',label:`Right row ${i+1}`,value,kind:i===3?'crosswalk':'spot'}));
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
  fleetAmazonUrl: localStorage.getItem('relayops_fleet_amazon_url') || AMAZON_FLEET_PORTAL_URL,
  fleetFleetosUrl: localStorage.getItem('relayops_fleet_fleetos_url') || FLEETOS_PORTAL_URL,
  fleetLiveLastPull: localStorage.getItem('relayops_fleet_live_last_pull') || '',
  fleetLiveLastError: localStorage.getItem('relayops_fleet_live_last_error') || '',
  vanParking: loadVanParkingSlots(),
  vanParkingUpdated: localStorage.getItem('relayops_van_parking_updated') || '7/6',
  vanParkingPasteText: '',
  vanParkingBatteries: JSON.parse(localStorage.getItem('relayops_van_parking_batteries') || 'null') || {},
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
  equipmentImport: null,
  rating: Number(localStorage.getItem('relayops_rating') || 0)
};

if(Object.keys(state.fleetSourceUploads||{}).length) state.fleetImport=fleetImportFromSourceUploads();
if(state.fleetImport?.vehicles?.length) applyFleetVehicles(state.fleetImport.vehicles,{silent:true});

const app = document.getElementById('app');
const fileInput = document.getElementById('file-input');
const gasVehicleIds = ['F33','F34','R35','R36','R54','R55','R62'];
const sheetEditFields = ['driver','route','staging','padOverride','ev','deviceName','portable','stops','packages','plannedRts'];
const morningTemplateHeaders = ['WAVE','DRIVER','ROUTE','STAGING','PAD','EV','DEVICE','PORTABLE','','STOP COUNT','PACKAGE COUNT','','PLANNED RTS'];
const sheetCopyFields = ['waveLabel','driver','route','staging','pad','ev','deviceName','portable','spacerA','stops','packages','spacerB','plannedRts'];
const sheetSpacerColumns = new Set([8,11]);
const sheetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
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
  fleet:['Fleet Health','Simple Rivian battery, status, and source health'], parking:['Van Parking','Interactive parking map for closing and morning dispatch'], performance:['Performance','Scorecard trends and driver-level focus areas'],
  coaching:['Coaching','Turn scorecard signals into consistent follow-through'], checklists:['Checklists','Repeatable opening, load-out, and closeout routines'],
  inbox:['Team inbox','Calls, messages, and announcements in one place'], inventory:['Inventory','Devices, uniforms, supplies, and assignments'],
  reports:['Reports & export','Google Sheets-ready operational data'], admin:['Admin control','People, permissions, connections, and audit history']
};

function topbar() {
  const [title,sub] = pageInfo[state.page] || pageInfo.dashboard;
  return `<header class="topbar">
    <div style="display:flex;align-items:center;gap:10px"><button class="icon-button mobile-menu" data-action="menu" aria-label="Open menu">${ICONS.menu}</button><div class="page-heading"><h1>${title}</h1><p>${sub}</p></div></div>
    <div class="top-actions"><label class="search">${ICONS.search}<input id="global-search" placeholder="Search driver, route, van…" value="${esc(state.search)}" /></label><button class="btn ghost share-link-btn" data-action="share-dispatcher-link">${ICONS.link}<span class="hide-mobile">Share link</span></button><button class="icon-button" aria-label="Notifications">${ICONS.bell}<i class="notification-dot"></i></button><button class="btn primary" data-action="import">${ICONS.upload}<span class="hide-mobile">Upload Excel / CSV</span></button></div>
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

function morningSheetPage() {
  const rows=filteredMorningRows(), waves=morningWaveList(), staging=[...new Set(state.morningRoutes.filter(r=>r.dsp===state.dspCode).map(r=>r.staging))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  const excluded=state.lastImportExcluded;
  const groups=morningSections(rows);
  const irregular=rows.filter(r=>r.plannedRtsIssue).length;
  const copyRowsCount=groups.reduce((n,g)=>n+morningDisplayRows(g).length,0);
  const sheetMode=state.copyMode?'copy':'edit';
  return `${contextBar(`<span class="status blue">Earliest waves first</span>`)}
  <div class="morning-command card"><div><span class="eyebrow">LLOL OPENING OPERATIONS</span><h2>Morning operations sheet</h2><p>Upload DAYOFOPSPLAN plus ROUTE_DJT6. RelayOps keeps only ${state.dspCode}, matches CX routes, uses the first driver name only, and keeps waves earliest first.</p></div><div class="morning-actions"><button class="btn" data-action="slack-import">${ICONS.inbox} Slack Import <span class="demo-tag">DEMO</span></button><button class="btn primary easy-upload-button" data-action="import">${ICONS.upload} Cortex Import</button><button class="btn lime" data-action="planned-rts-import">${ICONS.calendar} Planned RTS Upload</button><button class="btn" data-action="equipment-import">${ICONS.van} VAN/DEV/PORT Import</button></div></div>
  <div class="quick-start" aria-label="Three easy steps"><div class="quick-step done"><b>1</b><span><strong>Pick import</strong><small>Slack or Cortex</small></span></div><div class="quick-arrow">→</div><div class="quick-step"><b>2</b><span><strong>We match CX</strong><small>Wave + staging + pad</small></span></div><div class="quick-arrow">→</div><div class="quick-step"><b>3</b><span><strong>Edit/copy</strong><small>White cells + Google Sheets paste</small></span></div></div>
  ${morningConnectorGuide()}
  <div class="sheet-toolbar"><div class="sheet-filter"><label>DSP</label><select data-morning-filter="dsp"><option>${state.dspCode}</option></select></div><div class="sheet-filter"><label>Wave</label><select data-morning-filter="wave"><option value="all">All waves</option>${waves.map(v=>`<option ${state.morningFilters.wave===v?'selected':''}>${v}</option>`).join('')}</select></div><div class="sheet-filter"><label>Staging location</label><select data-morning-filter="staging"><option value="all">All staging</option>${staging.map(v=>`<option ${state.morningFilters.staging===v?'selected':''}>${v}</option>`).join('')}</select></div><div class="sheet-filter"><label>Pad</label><select data-morning-filter="pad"><option value="all">All pads</option>${['A','B','C'].map(v=>`<option ${state.morningFilters.pad===v?'selected':''}>${v}</option>`).join('')}</select></div><button class="btn small" data-action="clear-morning-filters">Clear filters</button><span class="filter-note">Sorted ${ICONS.chevron} earliest launch first</span><button class="btn small ${state.editMode?'lime':''}" data-action="toggle-morning-edit">${state.editMode?'✓ Done editing':'✎ Edit mode'}</button><button class="btn small ${state.copyMode?'lime':''}" data-action="toggle-morning-copy">${state.copyMode?'✓ Copy mode':'Copy mode'}</button><button class="btn small ${state.fitMorningRows?'lime':''}" data-action="toggle-fit-rows">${state.fitMorningRows?'✓ Fit to drivers':'Remove blank rows'}</button><button class="btn small" data-action="assign-ev-low">EV 1-57 Low → High</button><button class="btn small" data-action="assign-ev-random">Randomize EVs</button><button class="btn small" data-action="assign-gas-vans">Assign Gas Vehicles</button><button class="btn small" data-action="copy-morning-visible">${ICONS.copy} Copy for Sheets</button><button class="btn small lime" data-action="export-morning-template">${ICONS.download} Formatted XLS</button><button class="btn small" data-action="preview-wave-screenshot">${ICONS.download} Preview JPEG</button><button class="btn small" data-action="export-morning">${ICONS.download} Export CSV</button></div>
  <div class="sheet-kpis"><span><strong>${rows.length}</strong> routes</span><span><strong>${rows.reduce((n,r)=>n+r.packages,0).toLocaleString()}</strong> packages</span><span><strong>${rows.reduce((n,r)=>n+r.stops,0).toLocaleString()}</strong> stops</span><span><strong>${irregular}</strong> RTS flags</span></div>
  <div class="sheets-helper card"><div class="sheets-helper-copy"><span class="eyebrow">GOOGLE SHEETS HANDOFF</span><h3>Paste into the new opening template</h3><p>Use the linked A–M layout: Wave, Driver, Route, Staging, Pad, EV, Device, Portable, Stop Count, Package Count, and Planned RTS.</p></div><div class="sheets-helper-steps"><span>1 Copy ${copyRowsCount} data rows</span><span>2 Open Google Sheets</span><span>3 Paste in A3</span></div><div class="sheets-helper-actions"><button class="btn primary" data-action="copy-morning-visible">${ICONS.copy} Copy Google Sheets table</button><button class="btn" data-action="open-sheets-helper">Open paste box</button><button class="btn lime" data-action="morning-sheets-connector">${ICONS.link} Sheets connector</button></div></div>
  ${state.copyMode?copyModeToolbar(groups):''}
  ${state.copyMode?`<div class="edit-help copy-help">Copy mode is on. Drag across cells exactly like Google Sheets, watch the blue highlight, then press ⌘C on Mac or Ctrl+C on Windows. Click a wave button to pulse/highlight that whole wave before copying it. The layout matches the new A–M Google template with spacer columns I and L.</div>`:state.editMode?`<div class="edit-help">Editing is on. Columns and rows are labeled like Google Sheets. Click and drag white cells to select a rectangle, press ⌘C to copy, or paste tabbed rows from Sheets to fill across/down.</div>`:''}
  <article class="card morning-board ${state.copyMode?'copy-board':state.editMode?'edit-board':'view-board'}"><div class="sheet-scroll"><table class="ops-sheet morning-template-sheet ${state.copyMode?'copy-ops-sheet':''}"><thead>${sheetModeHeader(morningTemplateHeaders,sheetMode)}</thead><tbody>${groups.length?groups.map((section,sectionIndex)=>morningWaveGroup(section,sectionIndex)).join(''):`<tr><td colspan="14"><div class="empty-state"><h3>No routes match these filters</h3><p>Clear a filter or upload a new day-of-operations file.</p></div></td></tr>`}</tbody></table></div></article>
  <div class="dispatcher-rating card"><div><strong>How easy was this opening sheet?</strong><span>Your 5-star tap helps find what needs to be smoother next.</span></div><div class="stars">${[1,2,3,4,5].map(n=>`<button class="${state.rating>=n?'active':''}" data-action="rate-service" data-rating="${n}" aria-label="${n} stars">★</button>`).join('')}</div></div>`;
}

function morningConnectorGuide() {
  const connected=Boolean(state.morningSheetsEndpoint);
  return `<details class="morning-connectors card"><summary><div><strong>Connector setup for clean Google Sheets handoff</strong><span>Use uploads today; add secure connectors later for Slack, Cortex/Amazon Logistics, and Google Sheets.</span></div><b>Open</b></summary><div class="morning-connector-grid"><div><strong>1 · Slack / day file</strong><span>Best connector: Slack file picker or bot export. It should pass the DAYOFOPSPLAN file to this dashboard, then RelayOps filters to ${esc(state.dspCode)} only.</span><button class="btn small" data-action="slack-import">Use demo Slack import</button></div><div><strong>2 · Cortex / Amazon Logistics</strong><span>Best connector: secure backend endpoint. Browser-only GitHub Pages cannot safely store Amazon login cookies. Until that backend exists, upload XLSX/CSV exports.</span><button class="btn small primary" data-action="import">Upload Cortex files</button></div><div><strong>3 · Google Sheets connector</strong><span>${connected?'Connector saved. Send writes A–M rows directly into the template.':'Best for exact merges: install the provided Apps Script in your Google template, paste its web app URL here, then Send to Sheets.'}</span><button class="btn small lime" data-action="morning-sheets-connector">${connected?'Open connector':'Set up connector'}</button><a class="btn small" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open template</a></div></div><p>Copy/paste cannot reliably transfer merged-cell formatting from a website into Google Sheets. The reliable connector workflow is: Google Sheets keeps the formatting/merged cells, RelayOps sends exact A–M values and section instructions into that template.</p></details>`;
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
  return `<tr class="sheet-letters-row"><th class="sheet-corner"></th>${sheetColumnLetters(headers.length).map(l=>`<th>${l}</th>`).join('')}</tr><tr><th class="sheet-row-num">${mode==='copy'?'#':'1'}</th>${labels}</tr>`;
}
function copyModeToolbar(groups=[]) {
  const buttons=groups.filter(g=>!g.dsp).map((g,i)=>{
    const label=g.wave?`${g.label} ${morningWaveTimeText(g)}`:g.label;
    return `<button class="btn small" data-action="copy-wave" data-wave-index="${i}">${ICONS.copy} ${esc(label||`Wave ${i+1}`)}</button>`;
  }).join('');
  return `<div class="copy-mode-toolbar card"><div><strong>Copy mode</strong><span>Select only the cells you want. The visible grid is built for clean Google Sheets copy/paste.</span></div><div class="copy-mode-buttons"><button class="btn small primary" data-action="copy-selected-cells">Copy selected cells</button>${buttons}</div></div>`;
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
  const cell=(r,field,value,colIndex,cls='')=>`<td class="sheet-edit-cell copy-sheet-cell ${cls} ${r?.plannedRtsIssue&&field==='plannedRts'?'flag-cell':''} ${edit?'editable-cell':''}" ${attrs(r,field,rows.indexOf(r),colIndex)}>${esc(value??'')}</td>`;
  const waveCell=`<td class="wave-label ${section.dsp?'dsp-label':''} copy-sheet-cell" rowspan="${rows.length}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase-3}" data-sheet-col="0"`:''}><span>${esc(waveTitle)}</span></td>`;
  const padCell=`<td class="pad-label sheet-edit-cell copy-sheet-cell ${edit?'editable-cell':''}" rowspan="${rows.length+1}" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase-3}" data-sheet-col="4" ${edit?`contenteditable="true" data-edit-wave="${esc(section.wave)}" data-edit-field="padOverride"`:''}`:''}><span>${esc(pad)}</span></td>`;
  const body=rows.map((r,i)=>`<tr class="ops-row ${r._blank?'blank-row':''} wave-section-${sectionIndex}" data-wave-section="${sectionIndex}">${showGridLabels?`<th class="sheet-row-num">${rowBase+i}</th>`:''}${i===0?waveCell:''}${cell(r,'driver',r.driver,1,'driver-name')}${cell(r,'route',r._blank?'':r.route,2,'route-id')}${cell(r,'staging',r.staging,3,'staging-code')}${i===0?padCell:''}${cell(r,'ev',r.ev||'',5)}${cell(r,'deviceName',r.deviceName||'',6)}${cell(r,'portable',r.portable||'',7)}<td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+i-3}" data-sheet-col="8"`:''}></td>${cell(r,'stops',r.stops,9,'count-cell')}${cell(r,'packages',r.packages,10,'count-cell')}<td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${rowBase+i-3}" data-sheet-col="11"`:''}></td>${cell(r,'plannedRts',r.plannedRts||'',12,'planned-rts-cell')}</tr>`).join('');
  const timeRowIndex=rowBase+rows.length-3;
  const timeRow=`<tr class="ops-row wave-time-row wave-section-${sectionIndex}" data-wave-section="${sectionIndex}">${showGridLabels?`<th class="sheet-row-num">${rowBase+rows.length}</th>`:''}<td class="wave-time-cell copy-sheet-cell" ${interactive?`tabindex="0" data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="0"`:''}>${esc(waveTime)}</td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="1"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="2"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="3"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="5"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="6"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="7"`:''}></td><td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="8"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="9"`:''}></td><td class="sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="10"`:''}></td><td class="sheet-spacer-col" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="11"`:''}></td><td class="planned-rts-cell sheet-edit-cell copy-sheet-cell" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${timeRowIndex}" data-sheet-col="12"`:''}></td></tr>`;
  const separatorRowIndex=timeRowIndex+1;
  const separatorRow=`<tr class="wave-separator wave-section-${sectionIndex}" data-wave-section="${sectionIndex}">${showGridLabels?`<th class="sheet-row-num">${rowBase+rows.length+1}</th>`:''}${sheetCopyFields.map((field,colIndex)=>`<td class="${sheetSpacerColumns.has(colIndex)?'sheet-spacer-col':''}" ${interactive?`data-sheet-cell="true" ${state.copyMode?'data-sheet-copy-cell="true"':''} data-sheet-section="${sectionIndex}" data-sheet-row="${separatorRowIndex}" data-sheet-col="${colIndex}"`:''}></td>`).join('')}</tr>`;
  return `${body}${timeRow}${separatorRow}`;
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
  const readyCopy=coverage.verified===coverage.total?'Every EV verified':'Upload both exports to verify every EV';
  const filters=['all','changed','verified','needs-data','missing-fleetos','missing-amazon','amazon-only','fleetos-only','demo-only','low','grounded','inactive'];
  const labels={'all':'Show all EVs','changed':'Changed only','verified':'Verified only','needs-data':'Needs data','missing-fleetos':'Missing FleetOS','missing-amazon':'Missing Amazon','amazon-only':'Amazon only','fleetos-only':'FleetOS only','demo-only':'Demo only','low':'Needs charge','grounded':'Grounded only','inactive':'Inactive only'};
  return `${contextBar(`<a class="btn small ghost" href="https://business.rivian.com/vehicles/tracker" target="_blank" rel="noopener">${ICONS.link} Rivian tracker</a><a class="btn small ghost" href="https://logistics.amazon.com/fleet-management/#vehicles" target="_blank" rel="noopener">${ICONS.link} Amazon fleet list</a>`)}
  <section class="grid kpi-grid">${kpiCard('Rivian battery avg',`${avg}%`,`${low} below 40%`,'van',low?'#fff2cf':'#e9f7df')}${kpiCard('EVs tracked',rivianFleet.length,readyCopy,'van',coverage.needsData?'#fff2cf':'#e9f7df')}${kpiCard('Verified EVs',`${coverage.verified}/${coverage.total}`,`${coverage.needsData} need data`,'check',coverage.needsData?'#fff2cf':'#e9f7df')}${kpiCard('Grounded EVs',grounded,'Tap a van for details','alert',grounded?'#ffe7e2':'#e9f7df')}</section>
  <article class="card rivian-panel"><div class="card-head fleet-clean-head"><div class="card-title"><h2>Fleet Health</h2><span class="assistive-text">FleetOS + Amazon EV live board · Refresh battery %</span><p>Simple Rivian health board. Amazon fleet names are used first after import; VIN stays below each card for matching. Last refresh: ${esc(state.fleetLastRefresh)}.</p>${fleetHeaderAccuracyBadge()}</div><div class="head-actions fleet-primary-actions"><input class="fleet-search-input" data-fleet-search placeholder="Find EV, VIN, or plate" value="${esc(state.fleetSearch)}"><select class="filter-select" data-fleet-filter>${filters.map(value=>`<option value="${value}" ${state.fleetFilter===value?'selected':''}>${labels[value]}</option>`).join('')}</select><button class="btn small ghost" data-action="clear-fleet-search">Clear</button><select class="filter-select" data-rivian-sort><option value="normal" ${state.fleetSort==='normal'?'selected':''}>Default order</option><option value="battery-low" ${state.fleetSort==='battery-low'?'selected':''}>Battery: low to high</option></select><button class="btn small lime" data-action="refresh-fleet">${ICONS.download} Refresh battery %</button><button class="btn small primary" data-action="fleet-import">${ICONS.upload} Upload / paste fleet list</button></div></div>
  ${fleetHealthSummary()}
  ${fleetChargeRecommendations()}
  <div class="fleet-clean-toolbar"><div class="fleet-view-controls"><label class="fleet-count-label">Expected EVs<input class="fleet-count-input" data-fleet-expected type="number" min="0" inputmode="numeric" value="${state.fleetExpectedCount||''}" placeholder="all"></label>${fleetViewSwitcher()}</div><div class="fleet-secondary-actions"><button class="btn small" data-action="fleet-live-setup">${ICONS.link} Live setup</button><button class="btn small" data-action="export-fleet-csv">${ICONS.download} EV CSV</button><button class="btn small" data-action="export-fleet-gaps">${ICONS.download} Gap CSV</button><button class="btn small ghost" data-action="reset-fleet-demo">Clear upload</button><a class="btn small" href="https://business.rivian.com/vehicles/tracker" target="_blank" rel="noopener">FleetOS</a><a class="btn small" href="https://logistics.amazon.com/fleet-management/#vehicles" target="_blank" rel="noopener">Amazon</a></div></div>
  ${fleetDataDrawer()}
  ${fleetQuickFilterChips()}${fleetResultBar(rivians.length,labels[state.fleetFilter]||'Show all EVs')}<section class="grid rivian-grid ${fleetViewClass()}">${rivians.length?rivians.map(v=>rivianCard(v)).join(''):`<div class="empty-state">No EVs match this search/filter. Press Clear to show every EV again.</div>`}</section></article>`;
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
  const coverage=fleetCoverageStats(), low=rivianFleet.filter(v=>v.battery<40).length, grounded=rivianFleet.filter(v=>v.operational==='Grounded').length;
  const avg=Math.round(rivianFleet.reduce((n,v)=>n+Number(v.battery||0),0)/Math.max(1,rivianFleet.length));
  const sourceStatus=fleetSourceStatus();
  const liveReady=!!fleetLiveEndpoint();
  return `<div class="fleet-health-summary"><div class="fleet-health-card primary"><strong>${rivianFleet.length}</strong><span>Rivians displayed</span><small>Default board shows the full 58-card Rivian fleet.</small></div><div class="fleet-health-card ${low?'warn':'ok'}"><strong>${avg}%</strong><span>Average battery</span><small>${low} van${low===1?'':'s'} below 40%.</small></div><div class="fleet-health-card ${grounded?'danger':'ok'}"><strong>${grounded}</strong><span>Grounded</span><small>Sort low to high before launch.</small></div><div class="fleet-health-card ${coverage.needsData?'warn':'ok'}"><strong>${coverage.verified}/${coverage.total}</strong><span>Verified sources</span><small>${sourceStatus.hasAmazon?'Amazon loaded':'Needs Amazon'} · ${sourceStatus.hasFleetos?'FleetOS loaded':'Needs FleetOS'} · ${liveReady?'Live ready':'Manual import'}</small></div></div>`;
}

function fleetChargeRows() {
  return [...rivianFleet].filter(v=>Number(v.battery)<50).sort((a,b)=>Number(a.battery)-Number(b.battery)||String(a.name||'').localeCompare(String(b.name||'')));
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
function parkingSlotInput(slot) {
  const tone=slot.kind==='crosswalk'?' crosswalk-slot':slot.kind==='overflow'?' overflow-slot':slot.kind==='street'?' street-slot':'';
  const selected=state.selectedParkingId===slot.id?' selected':'';
  const battery=parkingBatteryForSlot(slot);
  const blocked=/^x$/i.test(String(slot.value||''))||slot.kind==='blocked';
  const charging=slot.kind==='charging'||/\(\d{1,3}%\)/.test(String(slot.value||''));
  return `<label class="parking-slot${tone}${selected}${blocked?' blocked':''}${charging?' charging':''}" title="${esc(slot.label)}" data-parking-select="${esc(slot.id)}"><span>${esc(slot.label)}</span><input aria-label="${esc(slot.label)}" data-parking-id="${esc(slot.id)}" value="${esc(slot.value||'')}" placeholder=""><em>${battery!==''?`${esc(battery)}%`:blocked?'BLOCK':charging?'CHG':''}</em></label>`;
}
function parkingStack(zone,title,subtitle='') {
  return `<section class="parking-stack ${zone}"><div class="parking-stack-title"><strong>${esc(title)}</strong>${subtitle?`<small>${esc(subtitle)}</small>`:''}</div>${parkingSlots(zone).map(parkingSlotInput).join('')}</section>`;
}
function parkingStreetCells() {
  const slots=parkingSlots('street');
  return `<div class="street-cell">STREET</div><div class="street-cell editable-street">${slots[0]?parkingSlotInput(slots[0]):''}</div><div class="street-cell">STREET</div><div class="street-cell">STREET</div><div class="street-cell wide">STREET</div><div class="street-cell">STREET</div><div class="street-cell editable-street">${slots[4]?parkingSlotInput(slots[4]):''}</div><div class="street-cell">STREET</div>`;
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
  return `<div class="parking-mode-controls">${modes.map(([mode,label,detail])=>`<button class="${state.parkingMode===mode?'active':''}" data-action="set-parking-mode" data-mode="${mode}"><b>${esc(label)}</b><span>${esc(detail)}</span></button>`).join('')}<button class="add-temp-spot" data-action="add-parking-spot">${ICONS.plus} Add temp spot</button></div>`;
}
function vanParkingSection() {
  const stats=vanParkingStats();
  return `<article class="van-parking-card" id="van-parking"><div class="van-parking-head"><div><span class="eyebrow">Van Parking</span><h2>Parking Map</h2><p>Closing dispatcher updates this at night. Morning dispatcher uses it to keep each wave parked together and avoid drivers hunting for vans.</p></div><div class="parking-head-actions"><span class="parking-updated">Updated ${esc(state.vanParkingUpdated||'today')}</span><button class="btn small" data-action="copy-parking-list">${ICONS.copy} Copy parking list</button><button class="btn small ghost" data-action="reset-parking">Reset mockup</button></div></div>${parkingModeControls()}<div class="parking-helper-grid park-easy-stats"><div><strong>${stats.filled}</strong><span>occupied / assigned</span></div><div><strong>${stats.overflow}</strong><span>overflow + crosswalk spots</span></div><div><strong>Click a van</strong><span>Type EV number, battery %, or spot type.</span></div></div><div class="parking-import-row"><div class="parking-drop" id="parking-drop" tabindex="0"><b>Drop parking list here</b><span>CSV, XLSX, TXT, or a copied Google Sheets export. One EV per row works best.</span><button class="btn small primary" data-action="parking-choose-file">${ICONS.upload} Choose file</button></div>${parkingBatteryEditor()}<div class="parking-paste-box"><label for="parking-paste-text">Paste parking list</label><textarea id="parking-paste-text" placeholder="57&#10;2&#10;1&#10;4&#10;...">${esc(state.vanParkingPasteText)}</textarea><button class="btn small" data-action="parse-parking-paste">Fill parking spots</button></div></div><div class="parking-lot sheet-style park-easy-map"><div class="parking-map-grid"><div class="parking-empty-grid"></div><div class="parking-top-block"><div class="parking-lane"></div>${parkingStack('northLeft','', '')}<div class="parking-lane skinny"></div>${parkingStack('northRight','', '')}<div class="parking-lane"></div></div><div class="parking-street-row">${parkingStreetCells()}</div><div class="parking-main-block"><div class="parking-lane vertical"></div>${parkingStack('west','', '')}<div class="parking-crosswalk"><div class="tent-icon">⛺</div><strong>TENT</strong>${parkingStack('crosswalk','', '')}</div>${parkingStack('east','', '')}<div class="parking-lane vertical"></div></div><div class="parking-side-area"><div class="parking-date-box"><strong>DATE LAST UPDATED:</strong><span>${esc(state.vanParkingUpdated||'')}</span></div></div></div></div></article>`;
}

function vanParkingPage() {
  return `${contextBar(`<button class="btn small primary" data-action="parking-choose-file">${ICONS.upload} Import parking</button><button class="btn small" data-action="copy-parking-list">${ICONS.copy} Copy parking</button>`)}${vanParkingSection()}`;
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
function fleetAmazonPortalUrl() {
  return String(state.fleetAmazonUrl || AMAZON_FLEET_PORTAL_URL).trim();
}
function fleetFleetosPortalUrl() {
  return String(state.fleetFleetosUrl || FLEETOS_PORTAL_URL).trim();
}

function fleetLiveConnectorStrip() {
  const endpoint=fleetLiveEndpoint(), connected=Boolean(endpoint), last=state.fleetLiveLastPull, error=state.fleetLiveLastError;
  const tone=connected?(error?'warn':'ok'):'warn';
  const title=connected?'Live connector ready':'Live connector not connected yet';
  const detail=connected?`Refresh will call the secure backend first, then open the approval screen. ${last?`Last live pull: ${esc(last)}.`:'No live pull completed yet.'}`:'Save the Amazon Fleet and FleetOS portal links, then add a secure backend endpoint when ready. Without that backend, Refresh opens the upload/paste fallback instead of changing data blindly.';
  return `<div class="fleet-live-connector ${tone}"><div><strong>${esc(title)}</strong><span>${detail}</span>${error?`<small>${esc(error)}</small>`:''}<div class="fleet-live-links"><a href="${esc(fleetAmazonPortalUrl())}" target="_blank" rel="noopener">Amazon Fleet</a><a href="${esc(fleetFleetosPortalUrl())}" target="_blank" rel="noopener">FleetOS</a></div></div><div class="fleet-live-connector-steps"><span class="ok"><b>1</b>Amazon Fleet link saved</span><span class="ok"><b>2</b>FleetOS link saved</span><span class="${connected?'ok':'warn'}"><b>3</b>Secure backend endpoint</span></div><button class="btn small ${connected?'lime':'primary'}" data-action="${connected?'refresh-fleet':'fleet-live-setup'}">${connected?'Live refresh':'Live setup'}<span class="assistive-text">Set endpoint</span></button></div>`;
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
  const duplicates=state.fleetUpdateSummary?.duplicates||0, conflicts=state.fleetUpdateSummary?.conflicts||0, grounded=rivianFleet.filter(v=>v.operational==='Grounded').length, low=rivianFleet.filter(v=>v.battery<40).length;
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
  else if(grounded||low) step={tone:'caution',badge:'4',title:'Review grounded or low-battery EVs',detail:`${grounded} grounded · ${low} below 40%. Decide what needs charge, swap, or maintenance follow-up.`,action:'fleet-filter-quick',filter:grounded?'grounded':'low',button:'Review EVs'};
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
  const grounded=rivianFleet.filter(v=>v.operational==='Grounded').length, low=rivianFleet.filter(v=>v.battery<40).length;
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
  return `<div class="fleet-result-bar"><div><strong>${visible} of ${total} EVs showing</strong><span>${esc(filterLabel)}${searching?` · search: “${esc(searching)}”`:''}</span></div><div><span>${esc(fleetViewLabel())}</span><button class="btn small" data-action="copy-visible-fleet-vins">Copy visible VINs</button><button class="btn small ghost" data-action="clear-fleet-search">Show all EVs</button></div></div>`;
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
    low:rivianFleet.filter(v=>v.battery<40).length,
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
  const charge=rivianFleet.filter(v=>v.battery<40);
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
  return `<span class="rivian-van-art ${tone}" aria-hidden="true"><img src="assets/rivian-prime-van.png" alt=""></span>`;
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
  const source=String(vehicle.source||'').toLowerCase();
  if(source.includes('amazon fleet list')&&String(vehicle.name||'').trim())return vehicle.name;
  if(source.includes('fleetos tracker')||source.includes('rivian'))return vehicle.name||vehicle.vin||'Unknown EV';
  return vehicle.vin||vehicle.name||'Unknown EV';
}
function fleetCardStatusPills(vehicle={}) {
  const active=normalizeActive(vehicle.active||'');
  const operational=normalizeOperational(vehicle.operational||'');
  const activeClass=active==='Active'?'ok':'warn';
  const operationalClass=operational==='Operational'?'ok':operational==='Grounded'?'danger':'warn';
  return `<div class="fleet-card-status-line"><span class="${activeClass}"><i></i>${esc(active||'Unknown')}</span><span class="${operationalClass}"><i></i>${esc(operational||'Unknown')}</span></div>`;
}
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
  if(!String(vehicle.plate||'').trim())missing.push('plate');
  if(!String(vehicle.active||'').trim())missing.push('active status');
  if(!String(vehicle.operational||'').trim())missing.push('operational state');
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
  if(fleetConfidence(vehicle).label!=='Verified')problems.push('not matched');
  if(missing.length)problems.push(missing[0]);
  if(vehicle.active==='Inactive')problems.push('inactive');
  if(vehicle.operational==='Grounded')problems.push('grounded');
  if(Number(vehicle.battery)<30)problems.push('charge');
  if(problems.length)return {label:'Needs attention',className:'warn',detail:problems.slice(0,2).join(' + ')};
  if(Number(vehicle.battery)<50)return {label:'Watch charge',className:'caution',detail:'battery under 50%'};
  return {label:'Ready',className:'ready',detail:'matched + usable'};
}
function rivianCardIdSummary(v={},confidence={},batteryFreshness={}) {
  return `<div class="rivian-id-summary" aria-label="EV quick details"><span><b>Plate</b>${esc(v.plate||'—')}</span><span><b>Active</b>${esc(v.active||'—')}</span><span><b>Status</b>${esc(v.operational||'—')}</span><span><b>Battery source</b>${esc(batteryFreshness.label||confidence.label||'—')}</span></div>`;
}
function rivianCard(v) {
  const tone=batteryTone(v.battery), open=state.expandedFleetVin===v.vin;
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
  const compactDetails=`<div class="rivian-details simple-details"><span><b>VIN</b>${esc(v.vin||'—')}</span><span><b>Battery %</b>${v.battery??'—'}%</span><span><b>License plate #</b>${esc(v.plate||'—')}</span><span><b>Miles till empty</b>${esc(v.miles??'—')}</span><span class="${v.active==='Active'?'detail-ok':'detail-warn'}"><b>Active</b>${esc(v.active||'—')}</span><span class="${v.operational==='Operational'?'detail-ok':'detail-danger'}"><b>Status</b>${esc(v.operational||'—')}</span></div>`;
  const auditText=`Dispatch check ${dispatchReady.label}; Name source ${nameSource.detail}; Needs attention; Needs: ${missing.join(', ')||'real upload'}; Tap to collapse; Last change ${changedAt}; Amazon uploaded ${fleetSourceUploadedAt('amazon')}; FleetOS uploaded ${fleetSourceUploadedAt('fleetos')}; VIN source audit ${audit.summary}; Amazon row ${audit.amazon}; FleetOS row ${audit.fleetos}; Battery check ${batteryFreshness.label}; Confidence ${confidence.label}; Needs ${missing.join(', ')||'Nothing'}; <b>Changed</b> ${fleetChangeSourceLabels(changes).join(' | ')||'No changes'}; Source ${v.source||'Demo data'}; ${fleetChangeSourceLabels(changes).join(' | ')}; ${fleetChangeSourcePills(changes)}`;
  return `<button class="rivian-card ${tone} ${open?'expanded':''} ${changes.length?'updated':''} ${missing.length?'needs-data':''} ${hardStatus.length?'hard-status':''}" data-action="toggle-fleet-card" data-vin="${esc(v.vin)}" aria-expanded="${open?'true':'false'}"><div class="rivian-card-main"><div class="rivian-copy"><div class="rivian-title-line"><h3>${esc(displayName)}</h3>${v.name&&v.name!==displayName?`<span class="assistive-text">${esc(v.name)}</span>`:''}${hardStatusHtml}<span class="confidence-pill ${confidence.className}">${esc(confidence.label)}</span>${changes.length?'<span class="update-pill">Updated</span>':''}</div><span class="rivian-vin">${esc(v.vin)}</span>${fleetSourceBadges(v)}<span class="fleet-ready-pill ${dispatchReady.className}" title="${esc(dispatchReady.detail)}"><b>${esc(dispatchReady.label)}</b><em>${esc(dispatchReady.detail)}</em></span><span class="name-source-pill ${nameSource.className}" title="${esc(nameSource.detail)}"><b>${esc(nameSource.shortLabel)}</b><em>${esc(nameSource.label)}</em></span><div class="rivian-charge-line"><span class="battery-icon ${tone}"><i style="width:${Math.max(8,v.battery)}%"></i></span><strong>${v.miles===undefined||v.battery===undefined?'— / —':`${v.miles} mi / ${v.battery}%`}</strong></div>${fleetCardStatusPills(v)}<span class="fleet-card-cue ${confidence.className}">${esc(fleetCardCue(v))}</span><span class="rivian-live-status ${tone}">${esc(v.status)} · ${batteryLabel(v.battery)}</span><span class="battery-freshness ${batteryFreshness.className}">${esc(batteryFreshness.label)}</span><span class="tap-cue">${open?'Tap to collapse':'Tap for plate/status'}</span>${missing.length?`<span class="missing-line">Needs: ${esc(missing.join(', '))}</span>`:''}${changes.length?`<span class="change-line">Changed by source ${fleetChangeSourcePills(changes)}</span>`:''}</div>${amazonRivianIcon(tone)}</div>${open?`${rivianCardIdSummary(v,confidence,batteryFreshness)}${compactDetails}<span class="assistive-text">${auditText}</span>`:''}</button>`;
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
  return `${contextBar('<span class="status">Owner access</span>')}<section class="grid settings-grid"><div class="grid"><article class="card settings-section"><h2>Organization</h2><p>These details identify your workspace and default station.</p><div class="field-grid"><div class="field"><label>DSP name</label><input value="Northstar Delivery LLC" /></div><div class="field"><label>Station code</label><input value="DAX5" /></div><div class="field"><label>Timezone</label><select><option>America/Los_Angeles</option></select></div><div class="field"><label>Operating day starts</label><input type="time" value="06:00" /></div></div><div class="modal-actions"><button class="btn primary" data-action="save">Save changes</button></div></article><article class="card table-card"><div class="card-head"><div class="card-title"><h2>Role permissions</h2><p>Owner retains full access; dispatcher permissions are explicit</p></div><button class="btn small" data-action="invite">${ICONS.plus} Invite user</button></div><div class="table-wrap"><table class="permissions-table"><thead><tr><th>Capability</th><th>Owner</th><th>Ops manager</th><th>Dispatcher</th></tr></thead><tbody>${['View all stations','Import Amazon files','Publish daily roster','Edit driver records','Send coaching','Export reports','Manage users & billing'].map((p,i)=>`<tr><td><strong>${p}</strong></td><td><button class="switch on"></button></td><td><button class="switch ${i===0||i===6?'':'on'}"></button></td><td><button class="switch ${i===1||i===2||i===5?'on':''}"></button></td></tr>`).join('')}</tbody></table></div></article></div><div class="grid"><article class="card settings-section"><h2>Connections</h2><p>Credentials belong in encrypted server-side secrets, never the browser.</p><div class="connection"><div class="connection-logo">amz</div><div class="connection-copy"><strong>Amazon Logistics</strong><span>CSV/XLSX import active · official API pending</span></div><span class="status warn">Setup</span></div><div class="connection"><div class="connection-logo" style="background:#287247">GS</div><div class="connection-copy"><strong>Google Sheets</strong><span>Export and copy ready</span></div><span class="status">Ready</span></div><div class="connection"><div class="connection-logo" style="background:#2463a8">ADP</div><div class="connection-copy"><strong>ADP Workforce</strong><span>Not connected</span></div><button class="btn small">Connect</button></div><button class="btn" style="width:100%;margin-top:5px" data-action="import">Configure Amazon import</button></article><article class="card settings-section"><h2>Dispatcher access link</h2><p>Send this full https:// link to your dispatchers. It stays clickable when pasted into GroupMe, Slack, text, or email.</p><div class="callout"><strong>Live shared dashboard</strong><p><a href="${DISPATCHER_SHARE_URL}" target="_blank" rel="noopener">${DISPATCHER_SHARE_URL}</a></p><p class="share-note">${DISPATCHER_SHARE_NOTE}</p><button class="btn small lime" data-action="share-dispatcher-link">${ICONS.copy} Copy clickable link</button></div><div class="callout"><strong>Current view: Owner / admin</strong><p>Admin settings, user management, connection secrets, and the audit log are available.</p><button class="btn small" data-action="role-preview">Preview dispatcher access</button></div></article><article class="card settings-section"><h2>Recent audit activity</h2><p>Immutable account actions for owner review.</p>${[['8:17 AM','Alex G.','Published roster'],['8:04 AM','Alex G.','Imported roster CSV/XLSX'],['Yesterday','Sam R.','Updated van DVIC'],['Jun 30','Alex G.','Changed dispatcher permission']].map(x=>`<div class="summary-line"><span>${x[0]} · ${x[1]}</span><strong>${x[2]}</strong></div>`).join('')}</article></div></section>`;
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
  if (state.modal === 'sheets-helper') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal sheets-modal" role="dialog" aria-modal="true" aria-labelledby="sheets-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">GOOGLE SHEETS PASTE BOX</span><h2 id="sheets-title">Paste-ready morning sheet</h2><p>If one-click copy does not work, click Select all, copy, then paste into Google Sheets cell A3 so the template headers stay formatted.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="paste-guide"><span><b>1</b> Select all</span><span><b>2</b> Copy</span><span><b>3</b> Paste in A3</span></div><textarea id="sheets-copy-text" class="sheets-copy-text" readonly>${esc(state.sheetCopyText||morningSheetTsv())}</textarea><div class="modal-actions"><button class="btn" data-action="select-sheets-text">Select all text</button><button class="btn primary" data-action="copy-morning-visible">${ICONS.copy} Copy again</button></div></div></div></div>`;
  if (state.modal === 'morning-sheets-connector') {
    const payload=morningSheetsConnectorPayload(), rows=payload.rows.length, sections=payload.sections.length;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal sheets-modal" role="dialog" aria-modal="true" aria-labelledby="morning-sheets-connector-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">GOOGLE SHEETS CONNECTOR</span><h2 id="morning-sheets-connector-title">Send directly to the opening template</h2><p>This is the reliable path for merged cells. Google Sheets owns the formatting; RelayOps sends exact A–M data and wave merge instructions.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="sheets-connector-status ${state.morningSheetsEndpoint?'ready':'warn'}"><strong>${state.morningSheetsEndpoint?'Connector saved':'Connector not set yet'}</strong><span>${state.morningSheetsEndpoint?`Last send: ${esc(state.morningSheetsLastPush||'not sent yet')}`:'Copy the Apps Script, deploy it as a web app, then paste the web app URL below.'}</span></div><div class="sheets-connector-grid"><div class="connector-step"><b>1</b><strong>Install script in Google Sheets</strong><span>Open Extensions → Apps Script in the template, paste the script, deploy as Web app, and allow access.</span><button class="btn small" data-action="copy-morning-apps-script">${ICONS.copy} Copy Apps Script</button></div><div class="connector-step"><b>2</b><strong>Paste web app endpoint</strong><span>Use the Apps Script deployment URL. Do not paste Google passwords or Amazon/Rivian credentials.</span><input id="morning-sheets-endpoint" value="${esc(state.morningSheetsEndpoint)}" placeholder="https://script.google.com/macros/s/.../exec"><button class="btn small" data-action="save-morning-sheets-connector">Save endpoint</button><button class="btn small ghost" data-action="test-morning-sheets-connector" ${state.morningSheetsEndpoint?'':'disabled'}>Test connector</button></div><div class="connector-step"><b>3</b><strong>Send checked sheet</strong><span>${rows} A–M rows · ${sections} sections · starts at A3. The script rewrites values, dividers, wave labels, pad labels, and Planned RTS color.</span><button class="btn small primary" data-action="send-morning-to-sheets" ${state.morningSheetsEndpoint?'':'disabled'}>Send to Google Sheet</button><button class="btn small ghost" data-action="copy-morning-sheets-payload">${ICONS.copy} Copy payload JSON</button></div></div>${state.morningSheetsLastError?`<div class="import-preview import-warning"><span class="preview-check">!</span><div><strong>Connector note</strong><span>${esc(state.morningSheetsLastError)}</span></div></div>`:''}<div class="sheets-connector-preview"><strong>Connector payload preview</strong><span>DSP ${esc(payload.dsp)} · Start ${esc(payload.startCell)} · Headers ${payload.headers.length} · Rows ${rows}</span><textarea readonly>${esc(JSON.stringify(payload,null,2).slice(0,1800))}${JSON.stringify(payload).length>1800?'\n...':''}</textarea></div><div class="modal-actions"><a class="btn" href="${MORNING_TEMPLATE_URL}" target="_blank" rel="noopener">Open template</a><button class="btn" data-action="copy-morning-apps-script">Copy script</button><button class="btn" data-action="test-morning-sheets-connector" ${state.morningSheetsEndpoint?'':'disabled'}>Test connector</button><button class="btn primary" data-action="send-morning-to-sheets" ${state.morningSheetsEndpoint?'':'disabled'}>Send now</button></div><p class="upload-help">Best case: Google confirms the write. If Apps Script blocks browser confirmation, RelayOps still sends with a safe fallback and tells you to check the sheet instead of pretending it was verified.</p></div></div></div>`;
  }
  if (state.modal === 'equipment') {
    const count=state.equipmentImport?Object.keys(state.equipmentImport.details||{}).length:0;
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="equipment-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">VAN/DEV/PORT IMPORT</span><h2 id="equipment-title">Match vans to devices</h2><p>Upload the screenshot, CSV, XLSX, PDF, or Google Sheets export. RelayOps matches each EV/VAN number to the EV cell, then fills Device and Portable.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="equipment-drop" id="equipment-drop" tabindex="0"><div class="equipment-drop-copy"><strong>Drop VAN/DEV/PORT file here</strong><span>Accepts screenshots, JPEG/PNG, PDF, CSV, XLSX, TXT, or copied screenshot files. Best Google Sheets layout: one row per van with columns EV/VAN, DEVICE, PORTABLE.</span></div><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose file</button></div><div class="equipment-layout-tip"><strong>Safest Google Sheets layout</strong><span>EV/VAN | DEVICE | PORTABLE — no merged cells. The split two-table screenshot also works, but the simple 3-column list is easiest for every dispatcher.</span></div>${state.equipmentImport?`<div class="import-preview ${count?'':'import-warning'}"><span class="preview-check">${count?'✓':'!'}</span><div><strong>${count} EV/VAN assignments found</strong><span>${count?(state.equipmentImport.name?esc(state.equipmentImport.name):'Ready to match against the EV column.'):'Try the 3-column Google Sheets layout, or upload a clearer screenshot/export.'}</span></div></div><div class="equipment-preview">${Object.entries(state.equipmentImport.details||{}).slice(0,6).map(([van,d])=>`<span><b>${esc(van)}</b> Device ${esc(d.device||'')} · Portable ${esc(d.portable||'')}</span>`).join('')}</div>`:''}<div class="modal-actions"><button class="btn" data-action="equipment-template-csv">Download VAN/DEV/PORT layout</button><button class="btn primary" data-action="apply-equipment-import" ${count?'':'disabled'}>Fill Device + Portable cells</button></div></div></div></div>`;
  }
  if (state.modal === 'fleet-import') {
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="fleet-import-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">FLEETOS + AMAZON IMPORT</span><h2 id="fleet-import-title">Update EV battery board</h2><p>Upload both files together when you can. RelayOps matches by VIN and keeps the van name exactly like the Amazon fleet list.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body">${fleetUploadPrepChecklist()}${fleetFullExportSanityCheck()}<div class="fleet-import-sources"><button class="fleet-source-card" data-action="choose-file"><strong>Amazon fleet list</strong><span>Names, VINs, license plates, Active/Inactive, Operational/Grounded</span><small>Use this for the official van name.</small></button><button class="fleet-source-card" data-action="choose-file"><strong>FleetOS tracker</strong><span>VINs, battery %, range miles, live charge readiness</span><small>Use this for battery accuracy.</small></button></div><div class="fleet-import-status"><strong>Current upload status</strong><span class="${state.fleetSourceUploads?.amazon?.vehicles?.length?'ok':'warn'}"><b>Amazon</b>${esc(fleetSourceUploadLabel('amazon'))}</span><span class="${state.fleetSourceUploads?.fleetos?.vehicles?.length?'ok':'warn'}"><b>FleetOS</b>${esc(fleetSourceUploadLabel('fleetos'))}</span></div>${fleetImportChecklist()}${fleetFullRosterReadinessStrip()}${fleetDispatcherProofStrip()}<div class="fleet-column-guide"><div><strong>Amazon columns to copy</strong><span>Vehicle Name</span><span>VIN</span><span>License Plate</span><span>Active / Inactive</span><span>Operational / Grounded</span></div><div><strong>FleetOS columns to copy</strong><span>VIN</span><span>Battery % / State of Charge</span><span>Range Miles</span><span>Status if shown</span></div></div><div class="fleet-source-rule"><strong>Simple rule</strong><span>Amazon names/status win. FleetOS battery/range wins. VIN is the match key. Amazon also sets Expected EVs automatically. Do not rename Amazon vehicles.</span></div><div class="fleet-source-rule name-lock"><strong>Name lock</strong><span>If only FleetOS is uploaded, cards use the VIN as the temporary name until the matching Amazon fleet-list row is uploaded.</span></div><div class="equipment-drop" id="drop-zone"><div class="equipment-drop-copy"><strong>Drop CSV or XLSX fleet files here</strong><span>Best: choose the Amazon fleet list and FleetOS tracker at the same time. Accepted columns include VIN, vehicle/name, license plate, active/inactive, operational/grounded, SOC/battery %, and range/miles.</span></div><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose fleet files</button></div><label class="equipment-text-label" for="fleet-paste-text">Or paste the copied FleetOS/Amazon table here</label><textarea id="fleet-paste-text" class="equipment-paste-text" placeholder="Vehicle Name&#9;VIN&#9;License Plate&#9;Active&#9;Operational Status&#10;LLOL EV 21&#9;7FCEHEB79PN014816&#9;9ABC123&#9;Active&#9;Operational">${esc(state.fleetPasteText)}</textarea><div class="auto-match"><strong>RelayOps will do this:</strong><div><span>✓ Match by VIN</span><span>✓ Use Amazon fleet names exactly</span><span>✓ Set Expected EVs from Amazon</span><span>✓ Update battery + status cards</span></div></div><div class="modal-actions"><button class="btn" data-action="fleet-template-csv">Need fleet example?</button><button class="btn" data-action="parse-fleet-paste">Read pasted table</button><button class="btn primary" data-action="choose-file">${ICONS.upload} Choose fleet files</button></div><p class="upload-help">Tip: if only one file is uploaded, the Fleet board will warn whether Amazon names/status or FleetOS battery/range is missing. Amazon upload also sets the expected EV count so short lists are flagged automatically.</p></div></div></div>`;
  }
  if (state.modal === 'fleet-live-setup') {
    const endpoint=fleetLiveEndpoint();
    return `<div class="modal-backdrop" data-action="close-modal"><div class="modal equipment-modal" role="dialog" aria-modal="true" aria-labelledby="fleet-live-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">LIVE FLEET SETUP</span><h2 id="fleet-live-title">Connect Amazon Fleet + FleetOS</h2><p>Save the two portal links dispatchers use every morning. Add a secure backend endpoint when you are ready for true live pull.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="fleet-live-setup-grid"><label><strong>Amazon Fleet link</strong><input id="fleet-amazon-url" value="${esc(fleetAmazonPortalUrl())}" placeholder="${AMAZON_FLEET_PORTAL_URL}"><span>Official source for vehicle name, VIN, plate, Active, Operational, and Grounded.</span></label><label><strong>FleetOS link</strong><input id="fleet-fleetos-url" value="${esc(fleetFleetosPortalUrl())}" placeholder="${FLEETOS_PORTAL_URL}"><span>Official source for battery %, range miles, and charge readiness.</span></label><label class="full"><strong>Secure live connector endpoint</strong><input id="fleet-live-endpoint" value="${esc(endpoint)}" placeholder="https://your-secure-backend.example.com/api/fleet/live"><span>Optional but required for true one-click live pull. Do not paste Amazon/Rivian cookies or passwords here.</span></label></div><div class="fleet-live-flow"><strong>Morning flow</strong><span><b>1</b>Open Amazon + FleetOS links</span><span><b>2</b>Refresh pulls via secure backend if connected</span><span><b>3</b>If backend is offline, upload/paste exports and RelayOps still protects the morning sheet</span></div><div class="fleet-live-warning"><strong>Why a backend is needed</strong><span>Amazon Logistics and Rivian FleetOS are authenticated portals. GitHub Pages cannot safely log in or scrape them directly from the browser. The backend keeps credentials server-side and sends RelayOps clean VIN rows only.</span></div>${state.fleetLiveLastError?`<div class="import-preview import-warning"><span class="preview-check">!</span><div><strong>Last live pull failed</strong><span>${esc(state.fleetLiveLastError)}</span></div></div>`:''}<div class="modal-actions"><a class="btn" href="${esc(fleetAmazonPortalUrl())}" target="_blank" rel="noopener">Open Amazon Fleet</a><a class="btn" href="${esc(fleetFleetosPortalUrl())}" target="_blank" rel="noopener">Open FleetOS</a><button class="btn" data-action="fleet-import">Use upload/paste instead</button><button class="btn primary" data-action="save-fleet-live-setup">Save setup</button></div><p class="upload-help">Refresh will never silently assign unsafe vans. If live data is unavailable, it will ask for fresh Amazon + FleetOS exports before applying updates.</p></div></div></div>`;
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
  if (state.modal === 'screenshot' && state.screenshotPreview) return `<div class="modal-backdrop" data-action="close-modal"><div class="modal screenshot-modal" role="dialog" aria-modal="true" aria-labelledby="screenshot-title" onclick="event.stopPropagation()"><div class="modal-head"><div><span class="eyebrow">APPROVAL REQUIRED</span><h2 id="screenshot-title">Approve GroupMe JPEG</h2><p>Only Wave, Driver/Helper, Route, Staging, Pad, EV, Device, and Portable are included.</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="jpeg-preview"><img src="${state.screenshotPreview}" alt="Wave sheet JPEG preview"></div><div class="modal-actions"><button class="btn" data-action="close-modal">Go back</button><button class="btn primary" data-action="save-wave-screenshot">Approve & save JPEG</button></div></div></div></div>`;
  return '';
}

function pageContent() {
  return ({dashboard,morning:morningSheetPage,roster:rosterPage,live:livePage,team:teamPage,fleet:fleetPage,parking:vanParkingPage,performance:performancePage,coaching:coachingPage,checklists:checklistsPage,inbox:inboxPage,inventory:inventoryPage,reports:reportsPage,admin:adminPage}[state.page] || dashboard)();
}

function render() {
  app.innerHTML = `<div class="app-shell">${sidebar()}<main class="main">${topbar()}<div class="content">${pageContent()}</div></main></div>${modal()}<div class="toast-stack" id="toast-stack"></div>`;
  bind();
}

function bind() {
  document.removeEventListener?.('paste',handleEquipmentPaste);
  document.removeEventListener?.('mousemove',handleSheetPointerMove);
  document.removeEventListener?.('pointermove',handleSheetPointerMove);
  document.removeEventListener?.('mouseup',stopSheetDrag);
  document.removeEventListener?.('pointerup',stopSheetDrag);
  document.removeEventListener?.('copy',handleSheetSelectionCopy);
  document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.page)));
  document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action,el)));
  document.querySelectorAll('[data-phase]').forEach(el=>el.addEventListener('click',()=>{state.phase=Number(el.dataset.phase);persist();render();}));
  document.querySelectorAll('[data-morning-filter]').forEach(el=>el.addEventListener('change',()=>{const key=el.dataset.morningFilter;if(key!=='dsp')state.morningFilters[key]=el.value;render();}));
  document.querySelectorAll('[data-rivian-sort]').forEach(el=>el.addEventListener('change',()=>{state.fleetSort=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-filter]').forEach(el=>el.addEventListener('change',()=>{state.fleetFilter=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-view]').forEach(el=>el.addEventListener('change',()=>{state.fleetView=el.value;persist();render();}));
  document.querySelectorAll('[data-fleet-search]').forEach(el=>el.addEventListener('input',()=>{state.fleetSearch=el.value;persist();render();const s=document.querySelector('[data-fleet-search]');if(s){s.focus();s.setSelectionRange(state.fleetSearch.length,state.fleetSearch.length);}}));
  document.querySelectorAll('[data-fleet-expected]').forEach(el=>el.addEventListener('input',()=>{state.fleetExpectedCount=Math.max(0,Number(el.value)||0);persist();render();const s=document.querySelector('[data-fleet-expected]');if(s){s.focus();s.setSelectionRange(s.value.length,s.value.length);}}));
  document.querySelectorAll('[data-parking-select]').forEach(el=>el.addEventListener('click',e=>{if(e.target?.matches?.('[data-parking-id]'))return;selectParkingSlot(el.dataset.parkingSelect);}));
  document.querySelectorAll('[data-parking-id]').forEach(el=>{
    el.addEventListener('focus',()=>selectParkingSlot(el.dataset.parkingId,false));
    el.addEventListener('input',()=>updateParkingSlot(el.dataset.parkingId,el.value,false));
  });
  document.querySelectorAll('[data-parking-battery]').forEach(el=>el.addEventListener('input',()=>updateParkingBattery(el.dataset.parkingBattery,el.value)));
  document.querySelectorAll('[data-parking-kind]').forEach(el=>el.addEventListener('change',()=>updateParkingKind(el.dataset.parkingKind,el.value)));
  document.querySelectorAll('[data-edit-field]').forEach(el=>{
    el.addEventListener('focus',()=>{if(!sheetSelection.dragging&&(!state.copyMode||sheetCopyZone(el.dataset.sheetCol)))selectSheetCell(el);});
    el.addEventListener('mousedown',e=>handleSheetMouseDown(e,el));
    el.addEventListener('pointerdown',e=>handleSheetMouseDown(e,el));
    el.addEventListener('mouseenter',()=>handleSheetMouseEnter(el));
    el.addEventListener('pointerenter',()=>handleSheetMouseEnter(el));
    el.addEventListener('blur',()=>saveMorningEditCell(el));
    el.addEventListener('keydown',e=>handleSheetKeydown(e,el));
    el.addEventListener('paste',e=>handleSheetPaste(e,el));
  });
  document.querySelectorAll('[data-sheet-copy-cell]').forEach(el=>{
    el.addEventListener('focus',()=>{if(!sheetSelection.dragging&&(!state.copyMode||sheetCopyZone(el.dataset.sheetCol)))selectSheetCell(el);});
    el.addEventListener('mousedown',e=>handleSheetMouseDown(e,el));
    el.addEventListener('pointerdown',e=>handleSheetMouseDown(e,el));
    el.addEventListener('mouseenter',()=>handleSheetMouseEnter(el));
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
  }
  if(state.modal==='equipment') document.addEventListener?.('paste',handleEquipmentPaste);
}

function readEquipmentFiles(files) {
  state.importPurpose='equipment';
  return readFiles(files);
}

function readParkingFiles(files) {
  state.importPurpose='parking';
  return readFiles(files);
}

function updateParkingSlot(id,value,rerender=true) {
  const slot=(state.vanParking||[]).find(s=>s.id===id);
  if(!slot)return;
  slot.value=String(value||'').trim().toUpperCase();
  state.selectedParkingId=id;
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();
  if(rerender)render();
}

function selectParkingSlot(id,rerender=true) {
  if(!id)return;
  state.selectedParkingId=id;
  persist();
  if(rerender)render();
}

function updateParkingBattery(id,value) {
  const clean=String(value||'').replace(/[^\d]/g,'').slice(0,3);
  const n=clean===''?'':Math.max(0,Math.min(100,Number(clean)));
  state.vanParkingBatteries={...(state.vanParkingBatteries||{}),[id]:n};
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();
}

function updateParkingKind(id,kind='spot') {
  const slot=(state.vanParking||[]).find(s=>s.id===id);
  if(!slot)return;
  slot.kind=kind;
  if(kind==='blocked'&&!slot.value)slot.value='X';
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();render();
}

function addParkingSpot() {
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
  const values=parkingImportValuesFromText(text);
  if(!values.length) return 0;
  const editable=(state.vanParking||[]).filter(slot=>!['street'].includes(slot.kind)||String(slot.value||'').trim());
  editable.forEach((slot,i)=>{if(values[i]!==undefined)slot.value=values[i];});
  state.vanParkingUpdated=new Intl.DateTimeFormat('en-US',{month:'numeric',day:'numeric'}).format(new Date());
  persist();
  return Math.min(values.length,editable.length);
}

function parseParkingPasteAction() {
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
  state.vanParking=defaultVanParkingSlots();
  state.vanParkingUpdated='7/6';
  state.vanParkingPasteText='';
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
function sheetCopyZone(col) {
  const n=Number(col);
  if(n>=0&&n<=12)return [0,12];
  return null;
}
function inSameSheetBoundary(anchor,cell) {
  if(!anchor||!cell)return false;
  if(anchor.dataset.sheetSection!==undefined&&cell.dataset.sheetSection!==undefined&&anchor.dataset.sheetSection!==cell.dataset.sheetSection)return false;
  if(state.copyMode) {
    const anchorZone=sheetCopyZone(anchor.dataset.sheetCol), cellZone=sheetCopyZone(cell.dataset.sheetCol);
    if(!anchorZone||!cellZone)return false;
    return anchorZone[0]===cellZone[0]&&anchorZone[1]===cellZone[1];
  }
  return true;
}
function clampSheetFocus(anchor,focus) {
  if(!anchor||!focus)return focus;
  if(anchor.dataset.sheetSection!==undefined&&focus.dataset.sheetSection!==undefined&&anchor.dataset.sheetSection!==focus.dataset.sheetSection)return sheetSelection.focus||anchor;
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
  return {top:Math.min(a.row,f.row),bottom:Math.max(a.row,f.row),left:zone?Math.max(zone[0],left):left,right:zone?Math.min(zone[1],right):right,section:sheetSelection.anchor.dataset.sheetSection};
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
  if(section!==undefined) document.querySelectorAll(`[data-sheet-section="${section}"], .wave-section-${section}`).forEach(el=>el.classList.add('sheet-selected-wave'));
  sheetSelection.focus?.classList.add('sheet-active-cell');
}
function selectSheetCell(el) {
  sheetCells().forEach(cell=>cell.classList.remove('sheet-active-cell','sheet-selected-cell','sheet-selected-wave'));
  document.querySelectorAll('.wave-pulse').forEach(el=>el.classList.remove('wave-pulse'));
  el.classList.add('sheet-active-cell','sheet-selected-cell');
  const section=el.dataset?.sheetSection;
  if(section!==undefined) document.querySelectorAll(`[data-sheet-section="${section}"], .wave-section-${section}`).forEach(item=>item.classList.add('sheet-selected-wave'));
  sheetSelection={anchor:el,focus:el,dragging:false};
}
function handleSheetMouseDown(e,el) {
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
  if(!text)return false;
  state.sheetCopyText=text;
  writeClipboardTable(text,selectedSheetHtml()||tsvToHtmlTable(text)).then(ok=>toast(ok?`Copied selected ${selectedSheetCells().length} cell${selectedSheetCells().length===1?'':'s'} for Google Sheets`:'Clipboard access was blocked — use the paste box',ok?'':'error'));
  return true;
}
function copyWaveByIndex(index=0) {
  const groups=morningSections(filteredMorningRows()).filter(g=>!g.dsp);
  const group=groups[index];
  if(!group)return toast('That wave is not available to copy','error');
  const rows=morningCopyRowsForSections([group]).map(item=>item.values.join('\t')).join('\n');
  state.sheetCopyText=rows;
  const sectionIndex=morningSections(filteredMorningRows()).findIndex(s=>s.label===group.label&&s.wave===group.wave);
  document.querySelectorAll('.wave-pulse,.sheet-selected-wave').forEach(el=>el.classList.remove('wave-pulse','sheet-selected-wave'));
  if(sectionIndex>=0) document.querySelectorAll(`[data-sheet-section="${sectionIndex}"], .wave-section-${sectionIndex}`).forEach(el=>el.classList.add('sheet-selected-wave','wave-pulse'));
  writeClipboardTable(rows,morningSheetClipboardHtml([group])).then(ok=>toast(ok?`Copied ${group.label} ${morningWaveTimeText(group)} for Google Sheets`:'Clipboard access was blocked — use the paste box',ok?'':'error'));
  return true;
}
function handleSheetSelectionCopy(e) {
  if(state.page!=='morning'||(!state.editMode&&!state.copyMode))return;
  const text=selectedSheetTsv();
  if(!text)return;
  e.preventDefault();
  e.clipboardData?.setData('text/plain',text);
  e.clipboardData?.setData('text/html',selectedSheetHtml()||tsvToHtmlTable(text));
  state.sheetCopyText=text;
  toast(`Copied selected ${selectedSheetCells().length} cell${selectedSheetCells().length===1?'':'s'} for Google Sheets`);
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
  const ok=await writeClipboardText(DISPATCHER_SHARE_TEXT);
  toast(ok?'Clickable dispatcher link copied — paste it into GroupMe, Slack, text, or email':'Clipboard access was blocked — copy the full https:// link from Admin control',ok?'':'error');
  return ok;
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
  if (name==='parking-choose-file') { state.importPurpose='parking'; return fileInput.click(); }
  if (name==='set-import-source') { state.importSource=el.dataset.source; state.importedFile=null; return render(); }
  if (name==='load-slack-demo') return loadSlackDemo();
  if (name==='close-modal') { state.modal=null;state.screenshotPreview=null;state.fleetRefreshPreview=null;return render(); }
  if (name==='choose-file') return fileInput.click();
  if (name==='share-dispatcher-link') return shareDispatcherLink();
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
  if (name==='clear-fleet-search') { state.fleetSearch='';state.fleetFilter='all';persist();render();return toast('Showing every EV again'); }
  if (name==='fleet-filter-quick') { state.fleetFilter=el.dataset.filter||'all';state.fleetSearch='';persist();render();return toast(`Fleet filtered: ${state.fleetFilter.replace('-',' ')}`); }
  if (name==='set-fleet-view') { state.fleetView=el.dataset.view||'tiny';persist();render();return toast(`Fleet view: ${fleetViewLabel()}`); }
  if (name==='reset-fleet-demo') return resetFleetDemo();
  if (name==='toggle-morning-edit') { state.editMode=!state.editMode;if(state.editMode)state.copyMode=false;render();return toast(state.editMode?'Editing is on — columns and rows are labeled':'Edits saved'); }
  if (name==='toggle-morning-copy') { state.copyMode=!state.copyMode;if(state.copyMode)state.editMode=false;sheetSelection={anchor:null,focus:null,dragging:false};render();return toast(state.copyMode?'Copy mode is on — drag cells, then press ⌘C/Ctrl+C':'Copy mode off'); }
  if (name==='toggle-fit-rows') { state.fitMorningRows=!state.fitMorningRows;persist();render();return toast(state.fitMorningRows?'Blank rows removed — waves fit driver count':'Template rows restored'); }
  if (name==='assign-ev-low') return assignElectricVehicles('low');
  if (name==='assign-ev-random') return assignElectricVehicles('random');
  if (name==='assign-gas-vans') return assignGasVehicles();
  if (name==='toggle-fleet-card') return toggleFleetCard(el.dataset.vin);
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
  if (name==='copy-wave') return copyWaveByIndex(Number(el.dataset.waveIndex)||0);
  if (name==='morning-sheets-connector') { state.modal='morning-sheets-connector'; return render(); }
  if (name==='save-morning-sheets-connector') return saveMorningSheetsConnector();
  if (name==='copy-morning-apps-script') return copyMorningAppsScript();
  if (name==='copy-morning-sheets-payload') return copyMorningSheetsPayload();
  if (name==='test-morning-sheets-connector') return testMorningSheetsConnector();
  if (name==='send-morning-to-sheets') return sendMorningToSheets();
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
    const plate=firstExisting(row,headers,['license plate','licenseplate','license plate #','licenseplateid','plate','plate #','plate id','plateid','plate number','platenumber','registration','registration number','registrationnumber','license','tag']);
    const active=firstExisting(row,headers,['active','activity status','activitystatus','lifecycle status','lifecyclestatus','lifecycle state','lifecyclestate','vehicle status','vehiclestatus','availability','availability status','availabilitystatus','assignment status','assignmentstatus','status']);
    const operational=firstExisting(row,headers,['operational','operation status','operationstatus','operational state','operationalstate','operational status','operationalstatus','grounded','grounding status','groundingstatus','state','vehicle state','vehiclestate','service status','servicestatus','maintenance status','maintenancestatus','status']);
    const battery=firstExisting(row,headers,['battery','battery %','battery percent','batterypercentage','battery percentage','soc','soc %','socpercent','state of charge','stateofcharge','state of charge %','stateofchargepercent','charge','charge %','charge percent','chargepercent']);
    const miles=firstExisting(row,headers,['range','range mi','rangemi','range miles','rangemiles','estimated range','estimatedrange','estimated range mi','estimatedrangemi','estimated range miles','estimatedrangemiles','estimated range (mi)','remaining range','remainingrange','remaining range mi','remainingrangemi','remaining range miles','remainingrangemiles','remaining miles','remainingmiles','miles remaining','milesremaining']);
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
  const labels={name:'Name',plate:'License plate',active:'Active/Inactive',operational:'Operational/Grounded',battery:'Battery %',miles:'Range miles'};
  const hasFlag={name:'hasName',plate:'hasPlate',active:'hasActive',operational:'hasOperational',battery:'hasBattery',miles:'hasMiles'};
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
    if(!item.hasBattery&&current.battery!==undefined) next.battery=current.battery;
    if(!item.hasMiles&&current.miles!==undefined) next.miles=current.miles;
    next.hasName=Boolean(current.hasName||item.hasName);
    next.hasPlate=Boolean(current.hasPlate||item.hasPlate);
    next.hasActive=Boolean(current.hasActive||item.hasActive);
    next.hasOperational=Boolean(current.hasOperational||item.hasOperational);
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
  state.fleetChangedVins=Object.fromEntries(merged.filter(v=>v.updated).map(v=>[v.vin,v.changedFields]));
  state.fleetUpdateSummary={...(merged.summary||{}),visible:sortedRivianFleet().length};
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
      batteryBefore:Number.isFinite(Number(old.battery))?Number(old.battery):null,
      batteryAfter:Number.isFinite(Number(v.battery))?Number(v.battery):null,
      milesBefore:Number.isFinite(Number(old.miles))?Number(old.miles):null,
      milesAfter:Number.isFinite(Number(v.miles))?Number(v.miles):null,
      tone:batteryTone(Number(v.battery)||0)
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
  let fallback=[], bestVinSheet=null;
  for(const path of paths) {
    const rows=parseWorksheetXml(await read(path),shared); if(!rows.length)continue; if(!fallback.length)fallback=rows;
    const header=rows.findIndex(row=>{const cells=row.map(v=>String(v).toLowerCase().replace(/[^a-z0-9]/g,''));return cells.includes('dsp')&&cells.includes('routecode')&&cells.includes('wave')&&cells.includes('staginglocation');});
    if(header>=0) return rows.slice(header);
    const vinHeader=rows.findIndex(row=>row.map(headerKey).some(h=>['vin','vinnumber','vehiclevin','vehicleidentificationnumber'].includes(h)));
    if(vinHeader>=0) {
      const keys=rows[vinHeader].map(headerKey);
      const fleetCols=['vin','vinnumber','vehiclevin','vehicleidentificationnumber','vehiclename','licenseplate','active','operational','battery','batterypercent','soc','stateofcharge','rangemiles','estimatedrange'];
      const score=(rows.length-vinHeader)*10+keys.filter(h=>fleetCols.includes(h)).length;
      if(!bestVinSheet||score>bestVinSheet.score) bestVinSheet={score,rows:rows.slice(vinHeader)};
    }
  }
  return bestVinSheet?.rows||fallback;
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
function clipboardCellStyle(colIndex,type='cell') {
  const base='border:1px solid #111;text-align:center;vertical-align:middle;font-family:Arial,sans-serif;font-size:10pt;font-weight:700;height:21px;mso-number-format:"\\@";';
  if(type==='separator')return `${base}background:#050505;color:#050505;border-color:#050505;height:14px;`;
  if(type==='wave')return `${base}background:#eef3ff;font-size:24pt;font-weight:900;writing-mode:vertical-rl;transform:rotate(180deg);min-width:72px;`;
  if(type==='time')return `${base}background:#eef3ff;font-size:11pt;font-weight:900;`;
  if(type==='pad')return `${base}background:#eef3ff;font-size:22pt;font-weight:900;min-width:52px;`;
  if(type==='spacer'||sheetSpacerColumns.has(colIndex))return `${base}background:#050505;color:#050505;border-color:#050505;min-width:14px;width:14px;`;
  if(colIndex===12)return `${base}background:#b4a7d6;min-width:78px;`;
  if([1,2,3,5,6,7,9,10].includes(colIndex))return `${base}background:#eef3ff;min-width:${colIndex===1?122:colIndex===3?82:70}px;`;
  return `${base}background:#eef3ff;min-width:70px;`;
}
function clipboardTd(value='',colIndex=0,type='cell',attrs='') {
  return `<td ${attrs} style="${clipboardCellStyle(colIndex,type)}">${xmlEscape(value)}</td>`;
}
function morningSheetClipboardHtml(sections=morningSections(filteredMorningRows())) {
  const body=sections.map(section=>{
    const display=morningDisplayRows(section), waveLabel=section.dsp?'DSP':section.label;
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const rows=display.map((r,i)=>`<tr>${i===0?clipboardTd(waveLabel,0,'wave',`rowspan="${display.length}"`):''}${clipboardTd(r.driver||'',1)}${clipboardTd(r._blank?'':r.route||'',2)}${clipboardTd(r.staging||'',3)}${i===0?clipboardTd(pad,4,'pad',`rowspan="${display.length+1}"`):''}${clipboardTd(r.ev||'',5)}${clipboardTd(r.deviceName||'',6)}${clipboardTd(r.portable||'',7)}${clipboardTd('',8,'spacer')}${clipboardTd(r.stops||'',9)}${clipboardTd(r.packages||'',10)}${clipboardTd('',11,'spacer')}${clipboardTd(r.plannedRts||'',12)}</tr>`).join('');
    const time=`<tr>${clipboardTd(morningWaveTimeText(section),0,'time')}${clipboardTd('',1)}${clipboardTd('',2)}${clipboardTd('',3)}${clipboardTd('',5)}${clipboardTd('',6)}${clipboardTd('',7)}${clipboardTd('',8,'spacer')}${clipboardTd('',9)}${clipboardTd('',10)}${clipboardTd('',11,'spacer')}${clipboardTd('',12)}</tr>`;
    const separator=`<tr>${sheetCopyFields.map((_,i)=>clipboardTd('',i,'separator')).join('')}</tr>`;
    return rows+time+separator;
  }).join('');
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${body}</table>`);
}
function tsvToHtmlTable(text='') {
  const rows=String(text).split('\n').map(row=>row.split('\t'));
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${rows.map(row=>`<tr>${row.map((value,i)=>clipboardTd(value,i)).join('')}</tr>`).join('')}</table>`);
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
    rows.push(`<tr>${cells.join('')}</tr>`);
  }
  return clipboardHtmlShell(`<table style="border-collapse:collapse;table-layout:fixed">${rows.join('')}</table>`);
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
  const lines=[];
  morningSections(filteredMorningRows()).forEach(section=>{
    const rows=morningDisplayRows(section);
    const waveLabel=section.dsp?'DSP':section.label;
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    rows.forEach((r,i)=>lines.push([
      i===0?waveLabel:'',
      r.driver||'',
      r._blank?'':r.route||'',
      r.staging||'',
      i===0?pad:'',
      r.ev||'',
      r.deviceName||'',
      r.portable||'',
      '',
      r.stops||'',
      r.packages||'',
      '',
      r.plannedRts||''
    ]));
    lines.push([morningWaveTimeText(section),'','','','','','','','','','','','']);
  });
  return lines;
}
function morningSheetTsv(){ return morningSheetCopyRows().map(row=>row.join('\t')).join('\n'); }
function morningSheetsConnectorPayload() {
  const sections=morningSections(filteredMorningRows()), rows=[], sectionMeta=[];
  let index=0;
  sections.forEach(section=>{
    const display=morningDisplayRows(section), pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const startRow=index+3;
    const waveLabel=section.dsp?'DSP':section.label;
    display.forEach((r,i)=>{
      rows.push([
        i===0?waveLabel:'',
        r.driver||'',
        r._blank?'':r.route||'',
        r.staging||'',
        i===0?pad:'',
        r.ev||'',
        r.deviceName||'',
        r.portable||'',
        '',
        r.stops||'',
        r.packages||'',
        '',
        r.plannedRts||''
      ]);
      index+=1;
    });
    rows.push([morningWaveTimeText(section),'','','','','','','','','','','','']);
    const timeRow=index+3;
    index+=1;
    rows.push(['','','','','','','','','','','','','']);
    const separatorRow=index+3;
    index+=1;
    sectionMeta.push({label:waveLabel,wave:section.wave||'',waveTime:morningWaveTimeText(section),pad,startRow,rowCount:display.length,timeRow,separatorRow,dsp:Boolean(section.dsp)});
  });
  return {version:'relayops-morning-v1',templateUrl:MORNING_TEMPLATE_URL,dsp:state.dspCode,generatedAt:new Date().toISOString(),startCell:'A3',headers:morningTemplateHeaders,rows,sections:sectionMeta};
}
function morningSheetsAppsScript() {
  return `// RelayOps Morning Sheet connector
// Install in the Google Sheet template: Extensions > Apps Script.
// Deploy: Deploy > New deployment > Web app > Execute as me > Anyone with link.
const RELAYOPS_START_ROW = 3;
const RELAYOPS_START_COL = 1;
const RELAYOPS_COLS = 13;

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    connector: 'relayops-morning-v1',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getName(),
    checkedAt: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const payload = JSON.parse(e.postData.contents || '{}');
  writeRelayOpsMorningSheet(payload);
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    rows: (payload.rows || []).length,
    sections: (payload.sections || []).length,
    updatedAt: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function writeRelayOpsMorningSheet(payload) {
  if (!payload || payload.version !== 'relayops-morning-v1') throw new Error('Wrong RelayOps payload');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  const rows = payload.rows || [];
  if (!rows.length) throw new Error('No morning rows sent');
  const rowCount = Math.max(rows.length, 120);
  const target = sheet.getRange(RELAYOPS_START_ROW, RELAYOPS_START_COL, rowCount, RELAYOPS_COLS);
  target.breakApart();
  target.clearContent();
  target.setBackground('#ffffff').setFontColor('#111111').setFontWeight('normal')
    .setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true, '#111111', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(RELAYOPS_START_ROW, RELAYOPS_START_COL, rows.length, RELAYOPS_COLS).setValues(rows);

  sheet.setFrozenRows(1);
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
    if (row.every(function(cell) { return String(cell || '') === ''; })) {
      sheet.getRange(sheetRow, RELAYOPS_START_COL, 1, RELAYOPS_COLS)
        .setBackground('#050505').setFontColor('#050505').setBorder(true, true, true, true, true, true, '#050505', SpreadsheetApp.BorderStyle.SOLID);
      sheet.setRowHeight(sheetRow, 14);
    } else {
      sheet.getRange(sheetRow, 1, 1, 8).setBackground('#eef3ff');
      sheet.getRange(sheetRow, 9, 1, 1).setBackground('#050505').setFontColor('#050505');
      sheet.getRange(sheetRow, 10, 1, 2).setBackground('#eef3ff');
      sheet.getRange(sheetRow, 12, 1, 1).setBackground('#050505').setFontColor('#050505');
      sheet.getRange(sheetRow, 13, 1, 1).setBackground('#b4a7d6');
      sheet.setRowHeight(sheetRow, 21);
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

  sheet.getRange(1, 1, 1, RELAYOPS_COLS).setFontWeight('bold');
  return true;
}

function testRelayOpsMorningSheet() {
  const sample = {
    version: 'relayops-morning-v1',
    rows: [['WAVE 1','Demo Driver','CX200','STG.V.1','A','21','3','-','','188','331','','6:20 PM'], ['11:15 (1)','','','','','','','','','','','',''], ['','','','','','','','','','','','','']],
    sections: [{label:'WAVE 1', wave:'11:15 AM', waveTime:'11:15 (1)', pad:'A', startRow:3, rowCount:1, timeRow:4, separatorRow:5}]
  };
  writeRelayOpsMorningSheet(sample);
}`;
}
function saveMorningSheetsConnector() {
  const input=document.getElementById('morning-sheets-endpoint');
  state.morningSheetsEndpoint=(input?.value||'').trim();
  state.morningSheetsLastError='';
  persist(); render();
  toast(state.morningSheetsEndpoint?'Google Sheets connector endpoint saved':'Google Sheets connector endpoint cleared');
}
async function copyMorningAppsScript() {
  const ok=await writeClipboardText(morningSheetsAppsScript());
  toast(ok?'Apps Script copied — paste it into Extensions → Apps Script in your Google template':'Clipboard blocked — open connector and copy manually',ok?'':'error');
  return ok;
}
async function copyMorningSheetsPayload() {
  const text=JSON.stringify(morningSheetsConnectorPayload(),null,2);
  const ok=await writeClipboardText(text);
  toast(ok?'Morning Sheet connector payload copied':'Clipboard blocked — use the preview box',ok?'':'error');
  return ok;
}
function connectorUrlWithPing(endpoint='') {
  if(!endpoint)return '';
  const join=endpoint.includes('?')?'&':'?';
  return `${endpoint}${join}relayops=ping`;
}
async function testMorningSheetsConnector() {
  const endpoint=(state.morningSheetsEndpoint||'').trim();
  if(!endpoint) { state.modal='morning-sheets-connector'; render(); return toast('Paste your Google Apps Script web app URL first','error'); }
  try {
    const response=await fetch(connectorUrlWithPing(endpoint),{method:'GET'});
    const text=await response.text();
    if(!response.ok||!/relayops-morning-v1/.test(text))throw new Error(`Unexpected connector response ${response.status}`);
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
async function sendMorningToSheets() {
  const endpoint=(state.morningSheetsEndpoint||'').trim();
  if(!endpoint) { state.modal='morning-sheets-connector'; render(); return toast('Paste your Google Apps Script web app URL first','error'); }
  const payload=morningSheetsConnectorPayload();
  try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
    const text=await response.text();
    if(!response.ok||!/ok|rows|updatedAt/i.test(text))throw new Error(`Connector returned ${response.status}`);
    state.morningSheetsLastPush=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date());
    state.morningSheetsLastError='';
    persist(); render();
    toast(`Google confirmed Morning Sheet update · ${payload.rows.length} rows`);
    return true;
  } catch(error) {
    try {
      await fetch(endpoint,{method:'POST',mode:'no-cors',body:JSON.stringify(payload)});
      state.morningSheetsLastPush=`${new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date())} · check sheet`;
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
  const board=document.querySelector('.morning-board');
  if(board){board.classList.add('sheet-copy-highlight');setTimeout(()=>board.classList.remove('sheet-copy-highlight'),1400);}
  if(await writeClipboardTable(state.sheetCopyText,morningSheetClipboardHtml())) toast('Google Sheets template data copied — click A3 in Google Sheets and paste');
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
  const sections=morningSections(filteredMorningRows());
  const body=sections.map(section=>{
    const rows=morningDisplayRows(section);
    const waveText=section.dsp?'DSP':section.label;
    const pad=section.rows[0]?.padOverride||section.rows[0]?.pad||'';
    const data=rows.map((r,i)=>`<tr>${i===0?cell(waveText,section.dsp?'wave dsp':'wave',`rowspan="${rows.length}"`):''}${cell(r.driver||'','driver')}${cell(r._blank?'':r.route||'')}${cell(r.staging||'')}${i===0?cell(pad,'pad',`rowspan="${rows.length+1}"`):''}${cell(r.ev||'')}${cell(r.deviceName||'')}${cell(r.portable||'')}${cell('','spacer')}${cell(r.stops||'')}${cell(r.packages||'')}${cell('','spacer')}${cell(r.plannedRts||'','planned')}</tr>`).join('');
    return `${data}<tr>${cell(morningWaveTimeText(section),'waveTime')}${cell('')}${cell('')}${cell('')}${cell('')}${cell('')}${cell('')}${cell('','spacer')}${cell('')}${cell('')}${cell('','spacer')}${cell('','planned')}</tr><tr class="separator"><td colspan="13"></td></tr>`;
  }).join('');
  const html=`<!doctype html><html><head><meta charset="utf-8"><style>
    table{border-collapse:collapse;font-family:Arial,sans-serif;} td{mso-number-format:"\\@";}
    .head,.waveHead,.plannedHead{height:34px;border:2px solid #111;text-align:center;font-weight:900;font-size:12px;background:#92f4fa;}
    .waveHead,.plannedHead{background:#b4a7d6}.spacer{width:16px;background:#000;border:1px solid #000;color:#000}
    .cell,.driver,.planned{height:24px;min-width:82px;border:1px solid #222;text-align:center;font-weight:700;font-size:10px;background:#eef3ff}.driver{min-width:130px}.wave{min-width:90px;font-size:28px;font-weight:900;writing-mode:vertical-rl;transform:rotate(180deg);background:#eef3ff}.waveTime{font-size:13px;font-weight:900;background:#eef3ff}.dsp{vertical-align:bottom}.pad{font-size:24px;font-weight:900;background:#eef3ff}.planned{background:#b4a7d6}.separator td{height:14px;background:#000;border:1px solid #000}
  </style></head><body><table><tr>${headers.map((h,i)=>cell(h,cls(i))).join('')}</tr>${body}</table></body></html>`;
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
  localStorage.setItem('relayops_page',state.page);localStorage.setItem('relayops_role',state.role);localStorage.setItem('relayops_phase',state.phase);localStorage.setItem('relayops_routes',JSON.stringify(state.routes));localStorage.setItem('relayops_morning',JSON.stringify(state.morningRoutes));localStorage.setItem('relayops_dsp',state.dspCode);localStorage.setItem('relayops_excluded',state.lastImportExcluded);localStorage.setItem('relayops_published',state.rosterPublished);localStorage.setItem('relayops_rating',state.rating);localStorage.setItem('relayops_fit_rows',state.fitMorningRows);localStorage.setItem('relayops_fleet_sort',state.fleetSort);localStorage.setItem('relayops_fleet_filter',state.fleetFilter);localStorage.setItem('relayops_fleet_view',state.fleetView);localStorage.setItem('relayops_fleet_search',state.fleetSearch);localStorage.setItem('relayops_expanded_fleet_vin',state.expandedFleetVin);localStorage.setItem('relayops_fleet_refresh',state.fleetLastRefresh);localStorage.setItem('relayops_fleet_import',JSON.stringify(state.fleetImport||null));localStorage.setItem('relayops_fleet_source_uploads',JSON.stringify(state.fleetSourceUploads||{}));localStorage.setItem('relayops_fleet_expected_count',state.fleetExpectedCount||0);localStorage.setItem('relayops_fleet_live_endpoint',state.fleetLiveEndpoint||'');localStorage.setItem('relayops_morning_sheets_endpoint',state.morningSheetsEndpoint||'');localStorage.setItem('relayops_morning_sheets_last_push',state.morningSheetsLastPush||'');localStorage.setItem('relayops_morning_sheets_last_error',state.morningSheetsLastError||'');localStorage.setItem('relayops_fleet_amazon_url',state.fleetAmazonUrl||AMAZON_FLEET_PORTAL_URL);localStorage.setItem('relayops_fleet_fleetos_url',state.fleetFleetosUrl||FLEETOS_PORTAL_URL);localStorage.setItem('relayops_fleet_live_last_pull',state.fleetLiveLastPull||'');localStorage.setItem('relayops_fleet_live_last_error',state.fleetLiveLastError||'');localStorage.setItem('relayops_van_parking',JSON.stringify(state.vanParking||[]));localStorage.setItem('relayops_van_parking_updated',state.vanParkingUpdated||'');localStorage.setItem('relayops_van_parking_batteries',JSON.stringify(state.vanParkingBatteries||{}));localStorage.setItem('relayops_selected_parking_id',state.selectedParkingId||'');localStorage.setItem('relayops_parking_mode',state.parkingMode||'manual');
}
function toast(message,type='success') { let stack=document.getElementById('toast-stack');if(!stack){stack=document.createElement('div');stack.id='toast-stack';stack.className='toast-stack';document.body.appendChild(stack);}const el=document.createElement('div');el.className=`toast ${type}`;el.innerHTML=`<span class="toast-icon">${type==='error'?'!':'✓'}</span><span>${esc(message)}</span>`;stack.appendChild(el);setTimeout(()=>el.remove(),3200); }

render();
