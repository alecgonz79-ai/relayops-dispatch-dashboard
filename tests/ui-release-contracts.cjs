const fs = require('fs');

const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
const app = fs.readFileSync(require.resolve('../app.js'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// These are behavior-level layout contracts, not pixel snapshots. Data-heavy
// worksheets may scroll horizontally; the application shell must not.
assert(/html\s*,?\s*body[^{}]*\{[^}]*overflow-x\s*:\s*clip/i.test(css), 'The page shell must prevent accidental horizontal overflow');
for (const selector of ['.main', '.content', '.card']) {
  const escaped = selector.replace('.', '\\.');
  assert(new RegExp(`${escaped}[^{}]*\\{[^}]*min-width\\s*:\\s*0`, 'i').test(css), `${selector} must be allowed to shrink inside the responsive shell`);
}
assert(/@media\s*\(max-width\s*:\s*760px\)[\s\S]*?\.topbar[^{}]*\{[^}]*grid/i.test(css), 'Mobile topbar must use a wrapping/two-row grid');
assert(/@media\s*\(max-width\s*:\s*760px\)[\s\S]*?\.modal[^{}]*\{[^}]*width\s*:\s*calc\(100vw\s*-\s*24px\)/i.test(css), 'Mobile modals must fit inside the viewport');
assert(/@media\s*\(max-width\s*:\s*760px\)[\s\S]*?\.modal-body[^{}]*\{[^}]*overflow-y\s*:\s*auto/i.test(css), 'Long mobile modal contents must scroll without overflowing the viewport');
assert(/@media\s*\(max-width\s*:\s*760px\)[\s\S]*?\.toast-stack[^{}]*\{[^}]*inset/i.test(css), 'Mobile toasts must remain inset from both viewport edges');
for (const selector of ['.sheet-scroll', '.opening-picklist-scroll', '.parking-lot']) {
  const escaped = selector.replace('.', '\\.');
  assert(new RegExp(`${escaped}[^{}]*\\{[^}]*overflow(?:-x)?\\s*:\\s*(?:auto|scroll)`, 'i').test(css), `${selector} must remain an intentional worksheet/map scroller`);
}
assert(/:focus-visible/.test(css), 'Keyboard users need a global visible focus treatment');
assert(/@media\s*\(prefers-reduced-motion\s*:\s*reduce\)/i.test(css), 'Reduced-motion users need animations disabled');

// The Picklist must print as one 11x17 page. CSS zoom can paginate the
// unscaled worksheet before zooming it, so keep the worksheet absolutely
// positioned inside a measured frame and scale it with a transform.
assert(/@media\s+print[\s\S]*?\.opening-picklist-print[^{}]*\{[^}]*height\s*:\s*var\(--picklist-print-height,1530px\)[^}]*overflow\s*:\s*hidden/i.test(css), 'Picklist print frame must use a measured, clipped page height');
assert(/@media\s+print[\s\S]*?\.opening-picklist-scroll[^{}]*\{[^}]*position\s*:\s*relative[^}]*height\s*:\s*var\(--picklist-print-height,1530px\)[^}]*overflow\s*:\s*hidden/i.test(css), 'Picklist print scroller must become a single-page positioning frame');
assert(/@media\s+print[\s\S]*?\.opening-picklist-sheet[^{}]*\{[^}]*position\s*:\s*absolute[^}]*zoom\s*:\s*1[^}]*transform\s*:\s*scale\(var\(--picklist-print-scale,.72\)\)/i.test(css), 'Picklist print sheet must use transform scaling instead of CSS zoom pagination');
assert(/function\s+printOpeningPicklistOnePage\s*\(\)[\s\S]*?targetWidth=1000,targetHeight=1530[\s\S]*?--picklist-print-scale[\s\S]*?window\.print\(\)/i.test(app), 'Picklist print action must measure the live worksheet and set one-page scale variables before printing');

// Modal markup should expose a dialog name and a keyboard-reachable close
// control. Escape/focus-trap behavior can be layered on without changing this
// stable semantic contract.
assert(/class="modal[^"\n]*"\s+role="dialog"\s+aria-modal="true"\s+aria-labelledby=/i.test(app), 'Application modals must expose role=dialog, aria-modal, and an accessible title');
assert(/class="icon-button"\s+data-action="close-modal"\s+aria-label="Close"/i.test(app), 'Application modals need a labeled keyboard-reachable close button');

console.log('Responsive overflow, focus, and modal semantic contracts passed');
