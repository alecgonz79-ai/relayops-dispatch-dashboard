const fs = require('fs');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const app = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');

assert(app.includes("function activeOperationalEditor()") && app.includes("renderFromCloudEvent()") && app.includes("deferredCloudRender=true"), 'Cloud status updates must defer full table rendering while an operational cell is active');
assert(app.includes('function markOperationalInteraction(event)')&&app.includes('Date.now()<operationalInteractionUntil'), 'A cloud refresh must not replace a cell between pointer-down and browser focus');
assert(app.includes("UI_SCROLL_MEMORY_SELECTORS=['.sheet-scroll','.opening-picklist-scroll','.device-sheet-table-wrap']") && app.includes('restoreUiScrollMemory(scrollMemory)'), 'Morning Sheet, Picklist, and Device tables must preserve their own scroll positions across renders');
assert(!app.includes("target.scrollIntoView({block:'nearest',inline:'nearest'});"), 'Double-click editing must not jump the table viewport');
const sheetFocusBody=app.match(/function focusSheetCell\(el\) \{([\s\S]*?)\n\}/)?.[1]||'';
const gridFocusBody=app.match(/function focusOperationalGridEditor\(editor\) \{([\s\S]*?)\n\}/)?.[1]||'';
assert(sheetFocusBody&&!sheetFocusBody.includes('scrollIntoView')&&gridFocusBody&&!gridFocusBody.includes('scrollIntoView'), 'Arrow navigation must never scroll the whole page to the focused table cell');
assert(app.includes('function keepOperationalEditorVisible(el,padding=10)')&&app.includes('window.scrollTo(pageX,pageY)'), 'Cell focus must preserve page position and scroll only the operational table pane');
assert((app.match(/el\.addEventListener\('click',startEdit\)/g)||[]).length>=2, 'Morning Sheet and Picklist cells must enter editing from one click or tap');
assert(app.includes('if(state.editMode&&el.isContentEditable)')&&app.includes('focusOperationalGridEditor(el)')&&app.includes('focusSheetCell(el)'), 'Already-editable table cells must receive explicit focus when Safari ignores native table-cell taps');
assert(app.includes('function verticalSheetCell(el,direction=1)')&&app.includes('if(dr)return focusSheetCell(verticalSheetCell(el,dr)||el);'), 'Up and Down must follow real Google-style sheet column numbers and skip divider rows');
assert((app.match(/el\.addEventListener\('click',\(\)=>focusOperationalGridEditor\(el\)\)/g)||[]).length>=2, 'Device and Portable inputs must receive explicit focus when clicked');
assert(app.includes("next.focus({preventScroll:true})"), 'Enter-to-next-row Device entry must not force the table back to the top');

assert(app.includes("state.modal='picklist-screenshot-review'") && app.includes('Confirm pads and Cortex swaps') && app.includes('continue-picklist-screenshot'), 'Waves + Adhocs screenshot must open the combined pad and Cortex review first');
assert(app.includes('data-screenshot-review-pad=') && app.includes('function saveScreenshotReviewPad(input,commit=false)') && app.includes('row.padOverride=value'), 'Pad letters must be directly editable from the pre-screenshot review and update shared Morning Sheet rows');
assert(app.includes("matches?.('[data-device-sheet-field]") && app.includes('[data-screenshot-review-pad]'), 'Cloud updates must not replace an active pad-review editor');
assert(app.includes("state.modal=null;state.page='morning'") && !app.includes("state.modal='pad-check-reminder';state.page='morning'"), 'Day-file import must no longer force the pad reminder');
assert(app.includes('recordPicklistRosterChange({from:outgoing,to:incoming') && app.includes("from:'Unassigned Adhoc'"), 'Route swaps and Adhoc additions must be recorded for the Cortex review');
assert(app.includes('picklistSwapAudit:state.picklistSwapAudit') && app.includes("'picklistSwapAudit'"), 'Cortex swap review history must be included in the shared daily workspace');
assert(app.includes('function syncManualAdhocRosterAssignment') && app.includes("reconcileDailyRosterFlags(exact,'adhoc')") && app.includes("state.scheduleDriverMarks[scheduleDriverMarkKey(exact)]='adhoc'"), 'Typing an Adhoc driver must remove that person from VTO and reconcile their shared roster status');
assert(app.includes('CORTEX SWAP TRACKER') && app.includes('data-picklist-swap-check=') && app.includes('function setPicklistSwapAuditChecked'), 'The Picklist must show a persistent side-by-side Cortex swap checklist');
assert(app.includes('class="opening-picklist-swap-rail"') && app.indexOf('openingPicklistRightHtml()}<aside class="opening-picklist-swap-rail"')>0, 'The Cortex swap tracker must render in its own third column to the right of the Picklist operations boxes');

assert(app.includes("document.querySelectorAll?.('.picklist-vto-driver.is-popup-open,.picklist-vto-driver.linger-open')") && css.includes('.picklist-vto-driver:not(.is-popup-open) .picklist-vto-actions{display:none!important}'), 'VTO hover menus must close every other driver popup before opening the active one');
assert(css.includes('.picklist-review-grid') && css.includes('.cortex-swap-review-list'), 'The combined safety review must have a responsive, scrollable layout');
assert(css.includes('.picklist-swap-tracker-list') && css.includes('label.confirmed'), 'The side-by-side Cortex tracker must visually distinguish checked swaps');
assert(css.includes('grid-template-columns:702px 300px 360px') && css.includes('.opening-picklist-swap-rail .picklist-swap-tracker'), 'The desktop Picklist must reserve a readable, dedicated Cortex tracker rail');

console.log('Stable editor scroll, single VTO popup, and screenshot safety review contracts passed');
