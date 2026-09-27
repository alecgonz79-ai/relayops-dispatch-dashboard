const fs=require('fs'),assert=require('assert/strict');
const read=f=>fs.readFileSync(require.resolve('../'+f),'utf8');
const index=read('index.html'),sw=read('service-worker.js'),workflow=read('.github/workflows/pages.yml');
for(const file of ['apple-design-preview.js','apple-design-preview.css','apple-scroll-cards.js','apple-scroll-cards.css']){
  assert(sw.includes(file),'Appearance must work after a cache update: '+file);
  assert(workflow.includes(file),'Public allowlist must include '+file);
}
assert(index.includes('apple-design-preview.js')&&index.includes('apple-scroll-cards.js'));
assert(!read('apple-design-preview.js').includes("params.get('multiStationPreview') !== '1'"));
assert(read('apple-scroll-cards.js').includes("!card.querySelector('table,input,textarea,[contenteditable]')"),'Operational editing panels must not collapse');
assert(read('apple-design-preview.js').includes('prefers-reduced-motion'));
assert(!read('app.js').includes('CORTEX_LOCAL_PREVIEW'),'Do not release experimental Cortex entry points');
assert(!workflow.includes('cp cortex-')&&!workflow.includes('cp desktop-pilot'),'Pilot files remain outside the public artifact');
console.log('Published appearance assets, accessibility and pilot exclusion checks passed');
