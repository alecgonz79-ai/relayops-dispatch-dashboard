const fs = require('fs');
const vm = require('vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require.resolve('../app.js'), 'utf8');
const drawing = source.slice(source.indexOf('function drawPicklistEquipmentValue('), source.indexOf('function previewWaveScreenshot('));
const rows = [
  {driver:'Sample Driver A',route:'CX101',staging:'STG.V.1',ev:'10',deviceName:'33',portable:'X'},
  {driver:'Sample Driver B',route:'CX102',staging:'STG.V.2',ev:'R54',deviceName:'24/7',portable:'-'},
  {driver:'Sample Driver C',route:'CX103',staging:'STG.V.3',ev:'38',deviceName:'13/78',portable:'92'},
  {driver:'Sample Driver D',route:'CX104',staging:'STG.V.4',ev:'',deviceName:'',portable:''}
];
const fixture = `const rows=${JSON.stringify(rows)};
const state={organizationName:'Equipment icon preview'};
let station='DJT6';
function displayedStationCode(){return station;}
function openingPicklistDateText(){return '9/14/2026';}
function openingPicklistTime(){return '11:00 (4)';}
function routeEquipmentValue(row){return row.ev;}
function openingPicklistSections(){return [{label:'WAVE 1',pad:'B',hasTime:true,rows}];}`;

// Optional isolated visual proof. Uses only synthetic rows and the real canvas
// functions; no dashboard initialization, storage, imports or cloud requests.
if (process.argv.includes('--preview')) {
  require('http').createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.end(`<!doctype html><title>Picklist equipment icon proof</title><style>body{margin:24px;background:#e7edef;font:16px system-ui}img{width:100%;max-width:1470px}h1{font-size:20px}</style><h1>Picklist equipment icons · synthetic examples</h1><img id="proof" alt="Picklist with van, phone and lightning icons"><script>${fixture}\n${drawing}\ndocument.getElementById('proof').src=buildPicklistScreenshot();</script>`);
  }).listen(4175,'127.0.0.1',()=>console.log('Icon proof: http://localhost:4175'));
} else {
  const text=[], shapes=[];
  const ctx = {measureText:v=>({width:String(v).length*10}),fillText:(...a)=>text.push(a)};
  for(const op of ['save','restore','translate','beginPath','moveTo','lineTo','stroke','arc','strokeRect','closePath','fill','fillRect'])ctx[op]=(...args)=>shapes.push([op,...args]);
  const canvas={getContext:()=>ctx,toDataURL:(type,quality)=>{assert.equal(type,'image/jpeg');assert.equal(quality,.94);return 'data:image/jpeg;base64,proof';}};
  const context=vm.createContext({document:{createElement:()=>canvas}});
  vm.runInContext(fixture+'\n'+drawing,context);
  for(const code of ['DJT6','DUR6']){
    text.length=0;shapes.length=0;
    vm.runInContext(`station='${code}';globalThis.before=JSON.stringify(rows);globalThis.result=buildPicklistScreenshot();globalThis.after=JSON.stringify(rows)`,context);
    assert.equal(context.before,context.after,'Export must not mutate assignments');
    assert.equal(context.result,'data:image/jpeg;base64,proof');
    assert.equal(canvas.width,1470);
    for(const value of ['10','R54','38','33','24/7','13/78','X','-','92'])assert(text.some(call=>call[0]===value),`${code}: preserve ${value}`);
    assert.equal(shapes.filter(call=>call[0]==='arc').length,6,'Two van wheels for each nonblank van');
    assert.equal(shapes.filter(call=>call[0]==='fill').length,3,'Lightning for a letter, dash and number; no icon in blank cells');
    assert(text.some(call=>call[0].includes(`${code} Opening Picklist`)));
  }
  text.length=0;shapes.length=0;
  vm.runInContext(`drawPicklistEquipmentValue(document.createElement('canvas').getContext('2d'),'','phone',75,24,150)`,context);
  assert.equal(text.length+shapes.length,0,'Empty assignments stay empty');
  vm.runInContext(`drawPicklistEquipmentValue(document.createElement('canvas').getContext('2d'),'12345678901234567890','phone',75,24,150)`,context);
  assert(text[0][0].endsWith('…'),'Long values fit without overlapping columns');
  assert.match(source,/state\.screenshotPreview=buildPicklistScreenshot\(\)/,'Preview uses the icon renderer');
  assert.match(source,/a\.href=state\.screenshotPreview/,'Download reuses preview pixels');
  console.log('Picklist equipment icons passed: DJT6/DUR6, vans, phones, portable dashes/letters, blank cells, bounded text and unchanged data.');
}
