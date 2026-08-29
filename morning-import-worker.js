'use strict';

importScripts('./vendor/jszip.min.js');

const MAX_IMPORT_COLUMNS=512;
const MAX_XML_ENTRY_BYTES=48*1024*1024;
const MAX_XML_TOTAL_BYTES=128*1024*1024;
const MAX_IMPORT_ROWS=20000;
const MAX_IMPORT_CELLS=250000;
let parseQueue=Promise.resolve();

function decodeXml(value='') {
  return String(value).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}
function columnIndex(reference='A1') {
  const letters=(String(reference).match(/[A-Z]+/i)||['A'])[0].toUpperCase();
  return [...letters].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0)-1;
}
function textNodes(xml='') {
  const values=[],re=/<(?:\w+:)?t\b[^>]*>([\s\S]*?)<\/(?:\w+:)?t>/gi;let match;
  while((match=re.exec(xml)))values.push(decodeXml(match[1]));
  return values.join('');
}
function parseWorksheetXml(xml,sharedStrings) {
  const rows=[];let importedCells=0;const rowRe=/<(?:\w+:)?row\b[^>]*>([\s\S]*?)<\/(?:\w+:)?row>/gi;let rowMatch;
  while((rowMatch=rowRe.exec(xml))) {
    const row=[],cellRe=/<(?:\w+:)?c\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?c>/gi;let cell;
    while((cell=cellRe.exec(rowMatch[1]))) {
      const attrs=cell[1],body=cell[2],ref=(attrs.match(/\br="([^"]+)"/i)||[])[1]||`A${rows.length+1}`,type=(attrs.match(/\bt="([^"]+)"/i)||[])[1]||'';
      const raw=(body.match(/<(?:\w+:)?v\b[^>]*>([\s\S]*?)<\/(?:\w+:)?v>/i)||[])[1];
      let value='';
      if(type==='s')value=sharedStrings[Number(raw)]??'';
      else if(type==='inlineStr')value=textNodes(body);
      else if(type==='b')value=raw==='1'?'TRUE':'FALSE';
      else if(type==='str'||type==='e')value=decodeXml(raw??'');
      else if(raw!==undefined)value=Number.isFinite(Number(raw))?Number(raw):decodeXml(raw);
      // Excel commonly serializes styled blank cells all the way through XFD.
      // Never let those blanks expand a small dispatch row to 16,384 columns.
      if(value===''||value===undefined)continue;
      const index=columnIndex(ref);if(index<0||index>=MAX_IMPORT_COLUMNS)continue;
      row[index]=value;
    }
    if(row.some(value=>value!==''&&value!==undefined)) {
      importedCells+=row.length;
      if(rows.length>=MAX_IMPORT_ROWS||importedCells>MAX_IMPORT_CELLS)throw new Error('This workbook has too many rows or cells for a safe browser import. Split the export and retry.');
      rows.push(Array.from({length:row.length},(_,index)=>row[index]??''));
    }
  }
  return rows;
}
function parseCSV(text='') {
  const rows=[];let row=[],cell='',quoted=false,importedCells=0;
  const pushRow=()=>{
    row.push(cell.trim());cell='';
    if(row.some(Boolean)) {
      if(row.length>MAX_IMPORT_COLUMNS)throw new Error('This CSV has too many columns for a safe browser import. Split the export and retry.');
      importedCells+=row.length;
      if(rows.length>=MAX_IMPORT_ROWS||importedCells>MAX_IMPORT_CELLS)throw new Error('This CSV has too many rows or cells for a safe browser import. Split the export and retry.');
      rows.push(row);
    }
    row=[];
  };
  for(let index=0;index<text.length;index++) {
    const character=text[index],next=text[index+1];
    if(character==='"'&&quoted&&next==='"'){cell+='"';index++;}
    else if(character==='"')quoted=!quoted;
    else if(character===','&&!quoted){row.push(cell.trim());cell='';}
    else if((character==='\n'||character==='\r')&&!quoted){if(character==='\r'&&next==='\n')index++;pushRow();}
    else cell+=character;
  }
  if(cell||row.length)pushRow();
  return rows;
}
function headerKey(value) {
  return String(value??'').toLowerCase().replace(/[^a-z0-9]/g,'');
}
function findImportHeader(rows,groups) {
  return rows.findIndex(row=>{const keys=row.map(headerKey);return groups.every(group=>group.some(name=>keys.includes(headerKey(name))));});
}
function preferredHeader(rows,fileName='') {
  const planGroups=[['route','routecode','cxnumber','cxroute','blockid'],['wave','wavetime','starttime','planneddeparturetime','planneddeparttime','departuretime']];
  const routeGroups=[['route','routecode','routeid','cx','cxnumber','cxroute','blockid'],['driver','drivername','transportername','employeename','daname','associatename','name','deliveryassociate','stops','stopcount','plannedstops','numstops','planneddeparturetime']];
  if(/day[_\s-]*of[_\s-]*ops[_\s-]*plan/i.test(fileName))return findImportHeader(rows,planGroups);
  if(/routes?[_\s-]*djt6/i.test(fileName))return findImportHeader(rows,routeGroups);
  const plan=findImportHeader(rows,planGroups);return plan>=0?plan:findImportHeader(rows,routeGroups);
}
async function parseXlsx(buffer,fileName='') {
  if(typeof JSZip==='undefined')throw new Error('Excel reader is unavailable');
  const zip=await JSZip.loadAsync(buffer);let expandedBytes=0;
  const read=async path=>{
    const entry=zip.file(path);if(!entry)return '';
    const declared=Number(entry?._data?.uncompressedSize)||0;
    if(declared>MAX_XML_ENTRY_BYTES)throw new Error('This workbook sheet is too large for a safe browser import. Export it as CSV and retry.');
    expandedBytes+=declared;
    if(expandedBytes>MAX_XML_TOTAL_BYTES)throw new Error('This workbook expands beyond the safe import limit. Export it as CSV and retry.');
    const value=await entry.async('string');
    if(value.length>MAX_XML_ENTRY_BYTES)throw new Error('This workbook sheet is too large for a safe browser import. Export it as CSV and retry.');
    if(!declared){expandedBytes+=value.length;if(expandedBytes>MAX_XML_TOTAL_BYTES)throw new Error('This workbook expands beyond the safe import limit. Export it as CSV and retry.');}
    return value;
  };
  const sharedXml=await read('xl/sharedStrings.xml'),shared=[],siRe=/<(?:\w+:)?si\b[^>]*>([\s\S]*?)<\/(?:\w+:)?si>/gi;let si;
  while((si=siRe.exec(sharedXml)))shared.push(textNodes(si[1]));
  const workbook=await read('xl/workbook.xml'),rels=await read('xl/_rels/workbook.xml.rels'),relationMap={};
  const relRe=/<Relationship\b([^>]*?)(?:\/>|>[\s\S]*?<\/Relationship>)/gi;let rel;
  while((rel=relRe.exec(rels))) { const id=(rel[1].match(/\bId="([^"]+)"/i)||[])[1],target=(rel[1].match(/\bTarget="([^"]+)"/i)||[])[1];if(id&&target)relationMap[id]=target; }
  const paths=[],sheetRe=/<(?:\w+:)?sheet\b([^>]*?)(?:\/>|>[\s\S]*?<\/(?:\w+:)?sheet>)/gi;let sheet;
  while((sheet=sheetRe.exec(workbook))) { const id=(sheet[1].match(/\br:id="([^"]+)"/i)||[])[1],target=relationMap[id];if(target){const clean=target.replace(/^\//,'').replace(/^\.\.\//,'');paths.push(clean.startsWith('xl/')?clean:`xl/${clean}`);} }
  if(!paths.length)paths.push(...Object.keys(zip.files).filter(path=>/^xl\/worksheets\/sheet\d+\.xml$/i.test(path)).sort());
  let fallback=[];
  for(const path of paths) {
    const rows=parseWorksheetXml(await read(path),shared);if(!rows.length)continue;
    if(!fallback.length)fallback=rows;
    const header=preferredHeader(rows,fileName);if(header>=0)return rows.slice(header);
  }
  return fallback;
}

self.addEventListener('message',event=>{
  const message=event.data||{};if(!['parse-xlsx','parse-csv'].includes(message.type))return;
  parseQueue=parseQueue.then(async()=>{
    try {
      const rows=message.type==='parse-csv'?parseCSV(new TextDecoder('utf-8').decode(message.buffer)):await parseXlsx(message.buffer,message.fileName||'');
      self.postMessage({type:'result',id:message.id,rows});
    } catch(error) {
      self.postMessage({type:'error',id:message.id,message:error?.message||'The Excel file could not be read'});
    }
  });
});
