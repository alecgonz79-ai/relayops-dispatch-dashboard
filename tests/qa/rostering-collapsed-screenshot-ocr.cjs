const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),{createRequire}=require('node:module');
const {loadImage,createCanvas}=require('@napi-rs/canvas');
const Tesseract=require('tesseract.js');
const harnessPath=require.resolve('../rostering-workflow.cjs');
const prefix=fs.readFileSync(harnessPath,'utf8').split('function run()')[0].replace('console, Intl,','location: {hostname:"example.test",search:"",href:"https://example.test/"}, URLSearchParams, console, Intl,');
const c=new Function('require',prefix+';return harness();')(createRequire(harnessPath));
const imagePath=require.resolve('../fixtures/rostering-collapsed-rivian.png');
c.createImageBitmap=async()=>{const image=await loadImage(imagePath);image.close=()=>{};return image;};
c.document.createElement=()=>createCanvas(1,1);
// Run the actual image preprocessing and Tesseract reader. Only bridge the
// browser canvas to a PNG buffer for the Node OCR worker.
c.window.Tesseract={createWorker:async(...args)=>{
  const worker=await Tesseract.createWorker(...args),recognize=worker.recognize.bind(worker);
  worker.recognize=(image,...rest)=>recognize(image.toBuffer('image/png'),...rest);
  return worker;
}};
c.TextDetector=class {constructor(){throw new Error('Rosters must use the consistent OCR path');}};
c.file={name:'collapsed-rivian.png',type:'image/png'};
(async()=>{
  c.parsed=await vm.runInContext("parseUploadedFile(file,'rostering-screenshot')",c);
  assert.match(c.parsed.text,/5\s+Confirmed/i);
  assert.match(c.parsed.text,/0\s+Rostered/i);
  for(const station of ['DJT6','DUR6']){
    c.station=station;
    const plan=vm.runInContext("activeOpeningStationCode=station;rosteringPlanFromScreenshotText(parsed.text,file.name)",c);
    assert.equal(plan.services.length,1);
    assert.match(plan.services[0].name,/Standard Parcel Electric.*Rivian MEDIUM/i);
    assert.equal(plan.services[0].confirmed,5);
    assert.equal(plan.services[0].screenshotRostered,0);
    assert.equal(plan.assignments.length,5);
    assert(plan.assignments.every(row=>!row.associate));
  }
  console.log('Supplied collapsed screenshot: 5 confirmed, 0 rostered, 5 empty positions; DJT6/DUR9 parsing passes.');
})().catch(error=>{console.error(error);process.exitCode=1;});
