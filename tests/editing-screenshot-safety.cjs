const fs = require('fs');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const app = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');

assert(app.includes("function activeOperationalEditor()") && app.includes("renderFromCloudEvent()") && app.includes("deferredCloudRender=true"), 'Cloud status updates must defer full table rendering while an operational cell is active');
assert(app.includes("UI_SCROLL_MEMORY_SELECTORS=['.sheet-scroll','.opening-picklist-scroll','.device-sheet-table-wrap']") && app.includes('restoreUiScrollMemory(scrollMemory)'), 'Morning Sheet, Picklist, and Device tables must preserve their own scroll positions across renders');
assert(!app.includes("target.scrollIntoView({block:'nearest',inline:'nearest'});"), 'Double-click editing must not jump the table viewport');
assert(app.includes("next.focus({preventScroll:true})"), 'Enter-to-next-row Device entry must not force the table back to the top');

assert(app.includes("state.modal='picklist-screenshot-review'") && app.includes('Confirm pads and Cortex swaps') && app.includes('continue-picklist-screenshot'), 'Waves + Adhocs screenshot must open the combined pad and Cortex review first');
assert(app.includes("state.modal=null;state.page='morning'") && !app.includes("state.modal='pad-check-reminder';state.page='morning'"), 'Day-file import must no longer force the pad reminder');
assert(app.includes('recordPicklistRosterChange({from:outgoing,to:incoming') && app.includes("from:'Unassigned Adhoc'"), 'Route swaps and Adhoc additions must be recorded for the Cortex review');
assert(app.includes('picklistSwapAudit:state.picklistSwapAudit') && app.includes("'picklistSwapAudit'"), 'Cortex swap review history must be included in the shared daily workspace');

assert(app.includes("document.querySelectorAll?.('.picklist-vto-driver.is-popup-open,.picklist-vto-driver.linger-open')") && css.includes('.picklist-vto-driver:not(.is-popup-open) .picklist-vto-actions{display:none!important}'), 'VTO hover menus must close every other driver popup before opening the active one');
assert(css.includes('.picklist-review-grid') && css.includes('.cortex-swap-review-list'), 'The combined safety review must have a responsive, scrollable layout');

console.log('Stable editor scroll, single VTO popup, and screenshot safety review contracts passed');
