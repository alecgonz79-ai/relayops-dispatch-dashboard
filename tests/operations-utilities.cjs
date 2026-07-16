const fs = require('fs');
const vm = require('vm');
const JSZip = require('../vendor/jszip.min.js');

function assert(condition, message) { if (!condition) throw new Error(message); }

const app = { innerHTML: '' }, storage = new Map(), fields = new Map(), fileInput = { addEventListener() {}, click() {} };
const element = () => ({
  addEventListener() {}, appendChild() {}, prepend() {}, remove() {}, insertAdjacentHTML() {},
  classList: { add() {}, remove() {}, toggle() {} }, setAttribute() {}, style: {}, dataset: {},
  focus() {}, blur() {}, click() {}, setSelectionRange() {}, querySelector() { return null; }, querySelectorAll() { return []; }
});
const context = {
  console, Intl, Blob, URL, TextDecoder, TextEncoder, setTimeout, clearTimeout, JSZip,
  navigator: { clipboard: { writeText: async () => true } }, location: { href: 'https://relayops.example.test/' },
  window: { scrollTo() {}, open() {}, print() {}, addEventListener() {}, RelayOpsCloud: null },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key)
  },
  document: {
    body: { appendChild() {} }, activeElement: null,
    getElementById: id => id === 'app' ? app : id === 'file-input' ? fileInput : fields.get(id) || null,
    querySelector() { return null; }, querySelectorAll() { return []; }, createElement: element,
    addEventListener() {}, removeEventListener() {}, execCommand() { return true; }
  }
};
context.window.document = context.document;
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), context, { filename: 'app.js' });
vm.runInContext('globalThis.__state=state;globalThis.__toasts=[];toast=(message,type)=>globalThis.__toasts.push({message,type});render=()=>{};', context);
context.state = context.__state;

function setFields(values) { fields.clear();Object.entries(values).forEach(([id,value])=>fields.set(id,{value:String(value)})); }
function lastToast() { return context.__toasts.at(-1) || {}; }

function testInventoryWorkflow() {
  const initial = context.state.inventoryItems.length;
  const html = context.inventoryPage();
  for (const action of ['inventory-log','add-item','inventory-adjust','inventory-edit']) assert(html.includes(`data-action="${action}"`), `Inventory page lost ${action}`);

  context.action('add-item', {});
  assert(context.state.modal === 'inventory-item' && context.modal().includes('id="inventory-item-total"'), 'Add item must open the validated inventory form');
  setFields({
    'inventory-item-name':'Portable chargers','inventory-item-category':'Devices',
    'inventory-item-total':'3','inventory-item-available':'4','inventory-item-notes':'Top shelf'
  });
  context.saveInventoryItem();
  assert(context.state.inventoryItems.length === initial && /cannot be greater/.test(lastToast().message), 'Inventory must reject available counts above total');
  fields.get('inventory-item-available').value='2';context.saveInventoryItem();
  let item=context.state.inventoryItems.find(row=>row.name==='Portable chargers');
  assert(item && item.total===3 && item.available===2 && item.notes==='Top shelf', 'Validated inventory item was not saved');
  assert(JSON.parse(storage.get('relayops_inventory_items')).some(row=>row.name==='Portable chargers'), 'Inventory items must persist locally');

  context.action('inventory-edit',{dataset:{inventoryId:item.id}});
  setFields({
    'inventory-item-name':'Portable chargers','inventory-item-category':'Device pool',
    'inventory-item-total':'12','inventory-item-available':'8','inventory-item-notes':'Opening cabinet'
  });
  context.saveInventoryItem();item=context.inventoryItemById(item.id);
  assert(item.category==='Device pool'&&item.total===12&&item.available===8&&item.notes==='Opening cabinet','Inventory edit did not save every editable field');

  context.action('inventory-adjust',{dataset:{inventoryId:item.id}});
  setFields({'inventory-adjust-type':'assign','inventory-adjust-quantity':'3','inventory-adjust-assignee':'Angelique Murray','inventory-adjust-notes':'Morning route'});
  context.saveInventoryAdjustment();item=context.inventoryItemById(item.id);
  assert(item.available===5&&context.state.inventoryLog[0].assignee==='Angelique Murray'&&context.state.inventoryLog[0].quantity===3,'Inventory assignment did not update availability and log history');
  assert(JSON.parse(storage.get('relayops_inventory_log'))[0].itemName==='Portable chargers','Inventory movement log must persist locally');

  context.action('inventory-adjust',{dataset:{inventoryId:item.id}});
  setFields({'inventory-adjust-type':'assign','inventory-adjust-quantity':'99','inventory-adjust-assignee':'','inventory-adjust-notes':''});
  context.saveInventoryAdjustment();
  assert(context.inventoryItemById(item.id).available===5&&/Only 5/.test(lastToast().message),'Inventory must reject assignments larger than available stock');

  context.action('inventory-log',{});
  const logHtml=context.modal();
  assert(logHtml.includes('Assignment &amp; adjustment log')===false && logHtml.includes('Assignment & adjustment log') && logHtml.includes('Angelique Murray') && logHtml.includes('−3'),'Inventory log modal must show assignment details and signed quantity');
  const shared=context.sharedWorkspaceState(),persistent=context.persistentWorkspaceState();
  assert(shared.inventoryItems.length&&shared.inventoryLog.length&&persistent.inventoryItems.length&&persistent.inventoryLog.length,'Inventory state must be included in shared and persistent workspace payloads');
}

function testOperationalAlertCenter() {
  vm.runInContext(`
    rivianFleet.splice(0,rivianFleet.length,
      normalizeFleetVehicle({vin:'7FCEHEB79PN014816',name:'EV1',battery:22,miles:31,active:'Active',operational:'Grounded',source:'Amazon Fleet FleetOS'}),
      normalizeFleetVehicle({vin:'1FTYR3XM2KKB78356',name:'F33',active:'Inactive',operational:'Operational',source:'Amazon Fleet'})
    );
    state.fleetIssues={'1':{label:'EV1',active:[{id:'issue-1',text:'Mirror cracked',severity:'high',status:'active'}],history:[]}};
    state.dspCode='LLOL';state.morningFilters={wave:'all',staging:'all',pad:'all'};state.morningOperationDate='2026-07-15';state.whiparoundSelectedDate='2026-07-15';
    state.morningRoutes=[{dsp:'LLOL',route:'CX101',routeUid:'R1',driver:'Maya Collins',wave:'11:15 AM',service:'Standard Parcel',plannedRts:'2:10 PM',plannedRtsIssue:true}];
    state.whiparoundInspections=[];state.whiparoundNotOnRoute={};state.callOffDriverKeys={};
  `, context);
  const groups=context.operationalAlertGroups(),byId=Object.fromEntries(groups.map(group=>[group.id,group]));
  assert(byId.grounded.count===1&&byId.inactive.count===1&&byId.low.count===1&&byId.issues.count===1,'Alert center lost a fleet safety alert category');
  assert(byId.rts.count===1&&byId['whip-pre'].count===1&&byId['whip-post'].count===1,'Alert center lost Morning RTS or Whiparound missing checks');
  const button=context.notificationButtonHtml();
  assert(button.includes('data-action="open-alert-center"')&&button.includes('notification-count')&&button.includes('7 operational alerts'),'Notification bell must expose the derived alert total and working action');
  context.action('open-alert-center',{});
  const modal=context.modal();
  assert(context.state.modal==='alert-center'&&modal.includes('Grounded vehicles')&&modal.includes('Missing Post-Trip DVIR')&&modal.includes('data-action="navigate-alert"'),'Alert center modal must summarize and link every active operational group');
  context.action('navigate-alert',{dataset:{page:'fleet',filter:'low'}});
  assert(context.state.page==='fleet'&&context.state.fleetFilter==='low'&&context.state.modal===null,'Fleet alert navigation must apply the safe Fleet Health filter');
  context.action('open-alert-center',{});context.action('navigate-alert',{dataset:{page:'inbox'}});
  assert(context.state.page==='inbox'&&context.state.modal===null,'Whiparound alert navigation must open the Whiparound page');
  assert(!context.__toasts.some(row=>row.message==='Action captured in this prototype'),'Operational utility actions must never fall through to the generic prototype toast');
}

testInventoryWorkflow();
testOperationalAlertCenter();
console.log('Inventory persistence/validation/logging and operational alert-center workflows passed');
