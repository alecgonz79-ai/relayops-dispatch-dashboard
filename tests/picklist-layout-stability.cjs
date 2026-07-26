const fs = require('fs');

const app = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const css = fs.readFileSync(require.resolve('../styles.css'), 'utf8');
const tahoeMidnightCss = fs.readFileSync(require.resolve('../tahoe-midnight-preview.css'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(
  app.includes('waveLabelFont=Math.max(8,Math.min(36') &&
    app.includes('style="--picklist-wave-font:${waveLabelFont}px"'),
  'Compact Picklist waves must calculate a label size from the rendered row span'
);
assert(
  css.includes('font-size:var(--picklist-wave-font,36px)') &&
    /\.picklist-wave-label\s*\{[^}]*overflow:hidden/i.test(css),
  'Wave labels must stay clipped inside their resized merged cell'
);
assert(
  app.includes("OPERATIONAL_INTERACTION_SELECTOR=") &&
    app.includes('[data-roster-search]') &&
    app.includes('function focusRosterSearchWithoutPageJump'),
  'Opening-roster search fields must participate in scroll and cloud-render protection'
);
assert(
  app.includes("el.addEventListener('pointerdown',event=>focusRosterSearchWithoutPageJump(el,event))") &&
    app.includes("input.focus?.({preventScroll:true})"),
  'Roster searches must receive focus without allowing the browser to move the page'
);
assert(
  css.includes('background:linear-gradient(90deg,#fff 0 702px,#000 702px 714px,#fff 714px 1014px') &&
    /body \.opening-picklist-sheet\s*\{[^}]*background:\s*linear-gradient\(90deg,\s*#fff 0 702px,\s*#000 702px 714px,\s*#fff 714px 1014px\)/i.test(tahoeMidnightCss),
  'Every Tahoe viewport must keep only the worksheet divider black and leave the date column white'
);

console.log('Compact Picklist labels, stable roster search, and print background contracts passed');
