const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const waves = ['11:15 AM', '11:20 AM', '11:25 AM', '11:40 AM', '11:45 AM'];
  const routes = [];
  waves.forEach((wave, waveIndex) => {
    for (let index = 0; index < 13; index += 1) routes.push({ routeUid: `wave-${waveIndex + 1}-${index + 1}`, dsp: 'LLOL', driver: `Driver ${waveIndex + 1}-${index + 1}`, route: `CX${waveIndex + 1}${String(index + 1).padStart(2, '0')}`, wave, staging: `STG.${String.fromCharCode(86 - waveIndex)}.${index + 1}`, padOverride: ['A', 'B', 'C', 'A', 'B'][waveIndex], service: 'Standard Parcel', ev: String(waveIndex * 13 + index + 1), deviceName: String(index + 1), portable: String(index + 2) });
  });
  for (let index = 0; index < 15; index += 1) routes.push({ routeUid: `adhoc-${index + 1}`, dsp: 'LLOL', driver: `Adhoc Driver ${index + 1}`, route: `AX${index + 1}`, wave: 'Ad hoc', staging: '', service: 'Adhoc', ev: `R${index + 1}` });
  await page.addInitScript(({ routes }) => {
    localStorage.setItem('relayops_page', 'roster');
    localStorage.setItem('relayops_role', 'owner');
    localStorage.setItem('relayops_morning', JSON.stringify(routes));
    localStorage.setItem('relayops_fit_rows', 'false');
    localStorage.setItem('relayops_opening_picklist_backup_rows', '21');
    localStorage.setItem('relayops_opening_picklist_calloff_rows', '6');
    localStorage.setItem('relayops_opening_picklist_topic_rows', '4');
  }, { routes });
  await page.goto(`file://${path.resolve(__dirname, '..', 'index.html')}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.opening-picklist-sheet', { timeout: 15000 });
  await page.evaluate(() => { window.print = () => {}; printOpeningPicklistOnePage(); });
  const metrics = await page.evaluate(() => ({
    sourceWidth: document.querySelector('.opening-picklist-sheet').scrollWidth,
    sourceHeight: document.querySelector('.opening-picklist-sheet').scrollHeight,
    scale: Number(getComputedStyle(document.documentElement).getPropertyValue('--picklist-print-scale')),
    printWidth: getComputedStyle(document.documentElement).getPropertyValue('--picklist-print-width'),
    printHeight: getComputedStyle(document.documentElement).getPropertyValue('--picklist-print-height')
  }));
  await page.emulateMedia({ media: 'print' });
  const printBounds = await page.evaluate(() => {
    const frame = document.querySelector('.opening-picklist-scroll').getBoundingClientRect(), sheet = document.querySelector('.opening-picklist-sheet').getBoundingClientRect();
    return { frame: { left: frame.left, top: frame.top, right: frame.right, bottom: frame.bottom, width: frame.width, height: frame.height }, sheet: { left: sheet.left, top: sheet.top, right: sheet.right, bottom: sheet.bottom, width: sheet.width, height: sheet.height } };
  });
  if (printBounds.sheet.left < printBounds.frame.left - 1 || printBounds.sheet.top < printBounds.frame.top - 1 || printBounds.sheet.right > printBounds.frame.right + 1 || printBounds.sheet.bottom > printBounds.frame.bottom + 1) throw new Error(`Scaled Picklist is clipped by its print frame: ${JSON.stringify(printBounds)}`);
  const pdfPath = '/tmp/relayops-picklist-one-page.pdf';
  await page.pdf({ path: pdfPath, printBackground: true, preferCSSPageSize: true });
  const pdf = await PDFDocument.load(fs.readFileSync(pdfPath));
  if (pdf.getPageCount() !== 1) throw new Error(`Expected exactly one 11×17 page, got ${pdf.getPageCount()}`);
  const [printed] = pdf.getPages(), { width, height } = printed.getSize();
  if (Math.abs(width - 792) > 2 || Math.abs(height - 1224) > 2) throw new Error(`Expected 11×17 portrait page (792×1224 pt), got ${width}×${height}`);
  if (!(metrics.scale > 0 && metrics.scale < 1) || parseFloat(metrics.printHeight) > 1530 || parseFloat(metrics.printWidth) > 1000) throw new Error(`Measured sheet did not fit the print frame: ${JSON.stringify(metrics)}`);
  console.log(`Browser print passed: 1 page, ${width}×${height} pt, scale ${metrics.scale.toFixed(3)}, source ${metrics.sourceWidth}×${metrics.sourceHeight}px.`);
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
