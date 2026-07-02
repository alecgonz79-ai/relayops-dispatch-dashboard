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
    ['dashboard','Today','dashboard'], ['roster','Opening roster','roster'], ['live','Live routes','live','3']
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

let state = {
  page: localStorage.getItem('relayops_page') || 'dashboard',
  role: localStorage.getItem('relayops_role') || 'admin',
  phase: Number(localStorage.getItem('relayops_phase') || 2),
  routes: JSON.parse(localStorage.getItem('relayops_routes') || 'null') || routesSeed,
  rosterPublished: localStorage.getItem('relayops_published') === 'true',
  search: '',
  modal: null,
  importedFile: null
};

const app = document.getElementById('app');
const fileInput = document.getElementById('file-input');

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
  dashboard:['Today’s command','A clear view from load-out through RTS'], roster:['Opening roster','Resolve exceptions, assign equipment, then publish'],
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
    <div class="top-actions"><label class="search">${ICONS.search}<input id="global-search" placeholder="Search driver, route, van…" value="${esc(state.search)}" /></label><button class="icon-button" aria-label="Notifications">${ICONS.bell}<i class="notification-dot"></i></button><button class="btn primary" data-action="import">${ICONS.upload}<span class="hide-mobile">Import Amazon file</span></button></div>
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
  return `${contextBar()}<section class="grid kpi-grid">${kpiCard('Fleet available','24','26 total vehicles','van','#e9f7df')}${kpiCard('In service','1','Prime 319 · brakes','alert','#ffe7e2')}${kpiCard('DVIC follow-ups','2','1 due before tomorrow','check','#fff2cf')}${kpiCard('Devices ready','31','3 on chargers','phone','#e5efff')}</section><div class="toolbar"><div class="toolbar-left"><select class="filter-select"><option>All vehicles</option><option>Ready</option><option>Service</option></select><button class="btn" data-action="devices">${ICONS.phone} Device cabinet</button></div><button class="btn lime" data-action="add-vehicle">${ICONS.plus} Add vehicle</button></div><section class="grid fleet-grid">${fleet.map(v=>`<article class="card entity-card"><div class="entity-top"><div class="entity-icon">${ICONS.van}</div><span class="status ${statusClass(v[2])}">${v[2]}</span></div><h3>${v[0]}</h3><p>${v[1]}</p><div class="entity-meta"><div class="entity-stat"><span>Assigned today</span><strong>${v[3]}</strong></div><div class="entity-stat"><span>Fuel / charge</span><strong>${v[4]}</strong></div></div></article>`).join('')}</section>`;
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
  return `${contextBar('<span class="status">Owner access</span>')}<section class="grid settings-grid"><div class="grid"><article class="card settings-section"><h2>Organization</h2><p>These details identify your workspace and default station.</p><div class="field-grid"><div class="field"><label>DSP name</label><input value="Northstar Delivery LLC" /></div><div class="field"><label>Station code</label><input value="DAX5" /></div><div class="field"><label>Timezone</label><select><option>America/Los_Angeles</option></select></div><div class="field"><label>Operating day starts</label><input type="time" value="06:00" /></div></div><div class="modal-actions"><button class="btn primary" data-action="save">Save changes</button></div></article><article class="card table-card"><div class="card-head"><div class="card-title"><h2>Role permissions</h2><p>Owner retains full access; dispatcher permissions are explicit</p></div><button class="btn small" data-action="invite">${ICONS.plus} Invite user</button></div><div class="table-wrap"><table class="permissions-table"><thead><tr><th>Capability</th><th>Owner</th><th>Ops manager</th><th>Dispatcher</th></tr></thead><tbody>${['View all stations','Import Amazon files','Publish daily roster','Edit driver records','Send coaching','Export reports','Manage users & billing'].map((p,i)=>`<tr><td><strong>${p}</strong></td><td><button class="switch on"></button></td><td><button class="switch ${i===0||i===6?'':'on'}"></button></td><td><button class="switch ${i===1||i===2||i===5?'on':''}"></button></td></tr>`).join('')}</tbody></table></div></article></div><div class="grid"><article class="card settings-section"><h2>Connections</h2><p>Credentials belong in encrypted server-side secrets, never the browser.</p><div class="connection"><div class="connection-logo">amz</div><div class="connection-copy"><strong>Amazon Logistics</strong><span>CSV import active · official API pending</span></div><span class="status warn">Setup</span></div><div class="connection"><div class="connection-logo" style="background:#287247">GS</div><div class="connection-copy"><strong>Google Sheets</strong><span>Export and copy ready</span></div><span class="status">Ready</span></div><div class="connection"><div class="connection-logo" style="background:#2463a8">ADP</div><div class="connection-copy"><strong>ADP Workforce</strong><span>Not connected</span></div><button class="btn small">Connect</button></div><button class="btn" style="width:100%;margin-top:5px" data-action="import">Configure Amazon import</button></article><article class="card settings-section"><h2>Access preview</h2><p>See exactly what your opening dispatcher sees.</p><div class="callout"><strong>Current view: Owner / admin</strong><p>Admin settings, user management, connection secrets, and the audit log are available.</p><button class="btn small lime" data-action="role-preview">Preview dispatcher access</button></div></article><article class="card settings-section"><h2>Recent audit activity</h2><p>Immutable account actions for owner review.</p>${[['8:17 AM','Alex G.','Published roster'],['8:04 AM','Alex G.','Imported roster CSV'],['Yesterday','Sam R.','Updated van DVIC'],['Jun 30','Alex G.','Changed dispatcher permission']].map(x=>`<div class="summary-line"><span>${x[0]} · ${x[1]}</span><strong>${x[2]}</strong></div>`).join('')}</article></div></section>`;
}

function modal() {
  if (!state.modal) return '';
  if (state.modal === 'import') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div><h2>Import Amazon roster</h2><p>Turn a daily roster export into a verified dispatch plan</p></div><button class="icon-button" data-action="close-modal" aria-label="Close">×</button></div><div class="modal-body"><div class="drop-zone" id="drop-zone"><div><div class="drop-icon">${ICONS.upload}</div><strong>${state.importedFile?esc(state.importedFile.name):'Drop your Amazon CSV here'}</strong><span>${state.importedFile?`${state.importedFile.rows.length} rows detected`:'CSV is supported in this prototype. Excel import will be enabled in Lovable Cloud.'}</span><button class="btn small" data-action="choose-file">Choose file</button></div></div>${state.importedFile?`<div class="mapping"><div class="mapping-row"><div class="mapping-col">${esc(state.importedFile.headers[0]||'route_code')}</div><div class="mapping-arrow">→</div><div class="mapping-col">Route</div></div><div class="mapping-row"><div class="mapping-col">${esc(state.importedFile.headers[1]||'transporter_name')}</div><div class="mapping-arrow">→</div><div class="mapping-col">Driver</div></div></div>`:''}<div class="import-note"><strong>Safe integration note:</strong> RelayOps does not scrape protected Amazon pages or store your login. Production sync should use Amazon-approved access through Vendor Exchange or an authorized API/service account.</div><div class="modal-actions"><button class="btn" data-action="template-csv">Download sample</button><button class="btn primary" data-action="apply-import" ${state.importedFile?'':'disabled'}>Import & review</button></div></div></div></div>`;
  if (state.modal === 'export') return `<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><div class="modal-head"><div><h2>Export route data</h2><p>Ready for Excel or your Google Sheets template</p></div><button class="icon-button" data-action="close-modal">×</button></div><div class="modal-body"><div class="connection"><div class="connection-logo">CSV</div><div class="connection-copy"><strong>CSV file</strong><span>Fastest option for Google Sheets</span></div><button class="btn small" data-action="export-csv">Download</button></div><div class="connection"><div class="connection-logo" style="background:#1c6e44">XLS</div><div class="connection-copy"><strong>Excel workbook</strong><span>Styled table that opens in Excel</span></div><button class="btn small" data-action="export-excel">Download</button></div><div class="connection"><div class="connection-logo" style="background:#2866b4">TAB</div><div class="connection-copy"><strong>Copy for Google Sheets</strong><span>Paste directly into cell A1</span></div><button class="btn small" data-action="copy">Copy</button></div></div></div></div>`;
  return '';
}

function pageContent() {
  return ({dashboard,roster:rosterPage,live:livePage,team:teamPage,fleet:fleetPage,performance:performancePage,coaching:coachingPage,checklists:checklistsPage,inbox:inboxPage,inventory:inventoryPage,reports:reportsPage,admin:adminPage}[state.page] || dashboard)();
}

function render() {
  app.innerHTML = `<div class="app-shell">${sidebar()}<main class="main">${topbar()}<div class="content">${pageContent()}</div></main></div>${modal()}<div class="toast-stack" id="toast-stack"></div>`;
  bind();
}

function bind() {
  document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.page)));
  document.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',()=>action(el.dataset.action,el)));
  document.querySelectorAll('[data-phase]').forEach(el=>el.addEventListener('click',()=>{state.phase=Number(el.dataset.phase);persist();render();}));
  const search = document.getElementById('global-search');
  if (search) search.addEventListener('input',e=>{state.search=e.target.value;if(['roster','live'].includes(state.page)){const pos=e.target.selectionStart;render();const s=document.getElementById('global-search');s.focus();s.setSelectionRange(pos,pos);}});
  const dz=document.getElementById('drop-zone');
  if (dz) {
    ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag');}));
    dz.addEventListener('drop',e=>{if(e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]);});
  }
}

function go(page) {
  if (page==='admin'&&state.role!=='admin') return toast('Owner permission required','error');
  state.page=page; state.search=''; state.modal=null; persist(); render(); window.scrollTo({top:0,behavior:'smooth'});
}

function action(name,el) {
  if (name==='menu') return document.getElementById('sidebar').classList.toggle('open');
  if (name==='import') { state.modal='import'; state.importedFile=null; return render(); }
  if (name==='close-modal') { state.modal=null; return render(); }
  if (name==='choose-file') return fileInput.click();
  if (name==='apply-import') return applyImport();
  if (name==='export-menu') { state.modal='export'; return render(); }
  if (name==='export-csv') return exportCSV();
  if (name==='export-excel') return exportExcel();
  if (name==='copy') return copyRows();
  if (name==='template-csv') return downloadTemplate();
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

fileInput.addEventListener('change',e=>{if(e.target.files[0])readFile(e.target.files[0]);e.target.value='';});

function readFile(file) {
  if (!file.name.toLowerCase().endsWith('.csv')) return toast('Please choose a CSV file for this prototype','error');
  const reader=new FileReader();
  reader.onload=()=>{
    const rows=parseCSV(String(reader.result));
    if(rows.length<2) return toast('No data rows were found','error');
    state.importedFile={name:file.name,headers:rows[0],rows:rows.slice(1)}; render(); toast(`${rows.length-1} roster rows detected`);
  };
  reader.readAsText(file);
}

function parseCSV(text) {
  const rows=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'&&quoted&&n==='"'){cell+='"';i++;}else if(c==='"'){quoted=!quoted;}else if(c===','&&!quoted){row.push(cell.trim());cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&n==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}
  row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows;
}

function applyImport() {
  const f=state.importedFile;if(!f)return;
  const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
  const index=(...names)=>{const n=names.map(norm);return f.headers.findIndex(h=>n.includes(norm(h)));};
  const ix={route:index('route','routecode','blockid'),driver:index('driver','drivername','transportername','da'),wave:index('wave','wave time','starttime'),staging:index('staging','staginglocation'),van:index('van','vehicle','vehicleid'),device:index('device','deviceid'),stops:index('stops','stopcount'),packages:index('packages','packagecount')};
  state.routes=f.rows.map((r,i)=>({route:r[ix.route]||`IMP-${i+1}`,driver:r[ix.driver]||'Unassigned driver',id:`DA-${1100+i}`,wave:r[ix.wave]||'Wave pending',staging:r[ix.staging]||'—',van:r[ix.van]||'Unassigned',device:r[ix.device]||'Unassigned',stops:Number(r[ix.stops])||0,packages:Number(r[ix.packages])||0,progress:0,delta:0,status:(r[ix.driver]&&r[ix.van])?'Assigned':'Needs review',rescue:'—'}));
  state.modal=null;state.page='roster';state.rosterPublished=false;persist();render();toast(`${state.routes.length} routes imported — review before publishing`);
}

const exportHeaders=['Route','Driver','Driver ID','Wave','Staging','Vehicle','Device','Stops','Packages','Progress %','Pace Delta','Status','Rescue Plan'];
function exportRows(){return routeFiltered().map(r=>[r.route,r.driver,r.id,r.wave,r.staging,r.van,r.device,r.stops,r.packages,r.progress,r.delta,r.status,r.rescue]);}
function csvEscape(v){const s=String(v??'');return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
function downloadBlob(data,type,name){const blob=new Blob([data],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);}
function exportCSV(){const csv=[exportHeaders,...exportRows()].map(r=>r.map(csvEscape).join(',')).join('\r\n');downloadBlob('\ufeff'+csv,'text/csv;charset=utf-8','relayops-daily-roster.csv');state.modal=null;render();toast('CSV downloaded — ready for Google Sheets');}
function exportExcel(){
  const rows=[exportHeaders,...exportRows()];
  const xml=`<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1D4D35" ss:Pattern="Solid"/></Style><Style ss:ID="Cell"><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E6DF"/></Borders></Style></Styles><Worksheet ss:Name="Daily Roster"><Table>${rows.map((r,i)=>`<Row>${r.map(v=>`<Cell ss:StyleID="${i===0?'Header':'Cell'}"><Data ss:Type="${typeof v==='number'?'Number':'String'}">${xmlEscape(v)}</Data></Cell>`).join('')}</Row>`).join('')}</Table><AutoFilter xmlns="urn:schemas-microsoft-com:office:excel" x:Range="R1C1:R${rows.length}C${exportHeaders.length}" xmlns:x="urn:schemas-microsoft-com:office:excel"/></Worksheet></Workbook>`;
  downloadBlob(xml,'application/vnd.ms-excel','relayops-daily-roster.xls');state.modal=null;render();toast('Excel workbook downloaded');
}
async function copyRows(){const text=[exportHeaders,...exportRows()].map(r=>r.join('\t')).join('\n');try{await navigator.clipboard.writeText(text);state.modal=null;render();toast('Copied — paste into cell A1 in Google Sheets');}catch{toast('Clipboard access was blocked; use CSV download instead','error');}}
function downloadTemplate(){const h=['route_code','transporter_name','wave','staging_location','vehicle_id','device_id','stops','packages'];const sample=['CX12','Maya Collins','Wave 1 - 9:20','A-14','EDV 224','CAT-17','186','312'];downloadBlob(`${h.join(',')}\r\n${sample.join(',')}\r\n`,'text/csv','amazon-roster-import-template.csv');toast('Import template downloaded');}

function xmlEscape(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function persist(){localStorage.setItem('relayops_page',state.page);localStorage.setItem('relayops_role',state.role);localStorage.setItem('relayops_phase',state.phase);localStorage.setItem('relayops_routes',JSON.stringify(state.routes));localStorage.setItem('relayops_published',state.rosterPublished);}
function toast(message,type='success') { let stack=document.getElementById('toast-stack');if(!stack){stack=document.createElement('div');stack.id='toast-stack';stack.className='toast-stack';document.body.appendChild(stack);}const el=document.createElement('div');el.className=`toast ${type}`;el.innerHTML=`<span class="toast-icon">${type==='error'?'!':'✓'}</span><span>${esc(message)}</span>`;stack.appendChild(el);setTimeout(()=>el.remove(),3200); }

render();
