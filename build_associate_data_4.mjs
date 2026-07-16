import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const source='/Users/alecgonzo/Downloads/AssociateData-4';
const outputDir='/Users/alecgonzo/Documents/Hera look alike/outputs/associate_data_4';
const text=(await fs.readFile(source,'utf8')).replace(/^\uFEFF/,'');
const imported=await Workbook.fromCSV(text,{sheetName:'Imported'});
const raw=imported.worksheets.getItem('Imported').getUsedRange().values;
const headers=raw[0].map(value=>String(value??'').trim());
const key=value=>String(value??'').toLowerCase().replace(/[^a-z0-9]/g,'');
const ix=name=>headers.findIndex(header=>key(header)===key(name));
const nameIx=ix('Name and ID'),transporterIx=ix('TransporterID'),positionIx=ix('Position');
const qualificationsIx=ix('Qualifications'),expirationIx=ix('ID expiration'),personalIx=ix('Personal Phone Number');
const workIx=ix('Work Phone Number'),emailIx=ix('Email'),statusIx=ix('Status');

const phone=value=>{
  const digits=String(value??'').replace(/\D/g,'').replace(/^1(?=\d{10}$)/,'');
  return digits.length===10?`(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`:String(value??'').trim();
};
const cleanName=value=>String(value??'').replace(/\s+/g,' ').trim();
const cleanQualifications=value=>String(value??'').replace(/\s+,/g,',').replace(/,\s*/g,', ').trim();
const excelDate=value=>{
  const match=String(value??'').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match?new Date(Number(match[1]),Number(match[2])-1,Number(match[3])):null;
};
const rows=raw.slice(1).filter(row=>cleanName(row[nameIx])).map(row=>({
  name:cleanName(row[nameIx]),
  transporter:String(row[transporterIx]??'').trim(),
  position:String(row[positionIx]??'').trim(),
  qualifications:cleanQualifications(row[qualificationsIx]),
  expiration:excelDate(row[expirationIx]),
  personal:phone(row[personalIx]),
  work:phone(row[workIx]),
  email:String(row[emailIx]??'').trim().toLowerCase(),
  status:String(row[statusIx]??'').trim().toUpperCase()
})).sort((a,b)=>a.name.localeCompare(b.name));

const workbook=Workbook.create();
const primary=workbook.worksheets.add('Dispatcher List');
const full=workbook.worksheets.add('Full Associate Details');
const importReady=workbook.worksheets.add('Dashboard Import');
const navy='#173A57',blue='#78B7DF',light='#EEF6FB',line='#D7E3EC',green='#EAF7EC',greenInk='#24623A',red='#FDE8E7',redInk='#A33A35',amber='#FFF4D6';
const lastPrimary=rows.length+3,lastFull=rows.length+2,lastImport=rows.length+1;

primary.showGridLines=false;
primary.mergeCells('A1:E1');
primary.getRange('A1').values=[['Delivery Associate Directory']];
primary.getRange('A1:E1').format={fill:navy,font:{bold:true,color:'#FFFFFF',size:16},verticalAlignment:'center'};
primary.getRange('A1:E1').format.rowHeight=34;
primary.mergeCells('A2:E2');
primary.getRange('A2').formulas=[[`=COUNTA('Full Associate Details'!$A$3:$A$${lastFull})&" associates · "&COUNTIF('Full Associate Details'!$I$3:$I$${lastFull},"ACTIVE")&" active · organized for dispatcher use"`]];
primary.getRange('A2:E2').format={fill:light,font:{color:'#4B6173',italic:true},verticalAlignment:'center'};
primary.getRange('A3:E3').values=[['Delivery Associate','Personal Phone','Position','Status','Transporter ID']];
primary.getRange('A3:E3').format={fill:blue,font:{bold:true,color:'#102C42'},horizontalAlignment:'left',verticalAlignment:'center',borders:{bottom:{style:'medium',color:navy}}};
primary.getRange(`A4:E${lastPrimary}`).values=rows.map(row=>[row.name,row.personal,row.position,row.status,row.transporter]);
primary.getRange(`A4:E${lastPrimary}`).format={font:{color:'#213444'},verticalAlignment:'center',borders:{insideHorizontal:{style:'thin',color:line}}};
primary.getRange(`A4:A${lastPrimary}`).format.font={bold:true,color:'#155E91'};
primary.getRange(`B4:B${lastPrimary}`).format.numberFormat='@';
primary.getRange(`E4:E${lastPrimary}`).format.numberFormat='@';
primary.getRange(`D4:D${lastPrimary}`).conditionalFormats.add('containsText',{text:'ACTIVE',format:{fill:green,font:{bold:true,color:greenInk}}});
primary.getRange(`D4:D${lastPrimary}`).conditionalFormats.add('containsText',{text:'INACTIVE',format:{fill:red,font:{bold:true,color:redInk}}});
primary.getRange(`D4:D${lastPrimary}`).dataValidation={rule:{type:'list',values:['ACTIVE','INACTIVE']}};
primary.getRange('A:A').format.columnWidthPx=315;
primary.getRange('B:B').format.columnWidthPx=145;
primary.getRange('C:C').format.columnWidthPx=165;
primary.getRange('D:D').format.columnWidthPx=95;
primary.getRange('E:E').format.columnWidthPx=150;
primary.getRange(`A4:E${lastPrimary}`).format.rowHeight=22;
primary.freezePanes.freezeRows(3);
primary.tables.add(`A3:E${lastPrimary}`,true,'DispatcherDirectory').style='TableStyleMedium2';

full.showGridLines=false;
full.mergeCells('A1:I1');
full.getRange('A1').values=[['Full Associate Details']];
full.getRange('A1:I1').format={fill:navy,font:{bold:true,color:'#FFFFFF',size:15},verticalAlignment:'center'};
full.getRange('A1:I1').format.rowHeight=32;
full.getRange('A2:I2').values=[['Name','Transporter ID','Position','Qualifications','ID Expiration','Personal Phone','Work Phone','Email','Status']];
full.getRange('A2:I2').format={fill:blue,font:{bold:true,color:'#102C42'},verticalAlignment:'center',wrapText:true,borders:{bottom:{style:'medium',color:navy}}};
full.getRange(`A3:I${lastFull}`).values=rows.map(row=>[row.name,row.transporter,row.position,row.qualifications,row.expiration,row.personal,row.work,row.email,row.status]);
full.getRange(`A3:I${lastFull}`).format={verticalAlignment:'center',borders:{insideHorizontal:{style:'thin',color:line}}};
full.getRange(`A3:A${lastFull}`).format.font={bold:true,color:'#155E91'};
full.getRange(`B3:B${lastFull}`).format.numberFormat='@';
full.getRange(`E3:E${lastFull}`).format.numberFormat='mmm d, yyyy';
full.getRange(`F3:G${lastFull}`).format.numberFormat='@';
full.getRange(`I3:I${lastFull}`).conditionalFormats.add('containsText',{text:'ACTIVE',format:{fill:green,font:{bold:true,color:greenInk}}});
full.getRange(`I3:I${lastFull}`).conditionalFormats.add('containsText',{text:'INACTIVE',format:{fill:red,font:{bold:true,color:redInk}}});
full.getRange(`I3:I${lastFull}`).dataValidation={rule:{type:'list',values:['ACTIVE','INACTIVE']}};
full.getRange(`E3:E${lastFull}`).conditionalFormats.add('cellIs',{operator:'lessThan',formula:'DATE(2026,10,13)',format:{fill:amber,font:{color:'#7A5310'}}});
full.getRange('A:A').format.columnWidthPx=315;
full.getRange('B:B').format.columnWidthPx=165;
full.getRange('C:C').format.columnWidthPx=140;
full.getRange('D:D').format.columnWidthPx=390;
full.getRange('E:E').format.columnWidthPx=120;
full.getRange('F:G').format.columnWidthPx=145;
full.getRange('H:H').format.columnWidthPx=270;
full.getRange('I:I').format.columnWidthPx=90;
full.getRange(`A3:I${lastFull}`).format.rowHeight=22;
full.freezePanes.freezeRows(2);
full.tables.add(`A2:I${lastFull}`,true,'FullAssociateDirectory').style='TableStyleMedium2';

importReady.showGridLines=false;
importReady.getRange('A1:I1').values=[['Name and ID','TransporterID','Position','Qualifications','ID expiration','Personal Phone Number','Work Phone Number','Email','Status']];
importReady.getRange('A1:I1').format={fill:navy,font:{bold:true,color:'#FFFFFF'},verticalAlignment:'center',wrapText:true};
importReady.getRange(`A2:I${lastImport}`).values=rows.map(row=>[row.name,row.transporter,row.position,row.qualifications,row.expiration,row.personal,row.work,row.email,row.status]);
importReady.getRange(`A2:I${lastImport}`).format={verticalAlignment:'center',borders:{insideHorizontal:{style:'thin',color:line}}};
importReady.getRange(`B2:B${lastImport}`).format.numberFormat='@';
importReady.getRange(`E2:E${lastImport}`).format.numberFormat='yyyy-mm-dd';
importReady.getRange(`F2:G${lastImport}`).format.numberFormat='@';
importReady.getRange('A:A').format.columnWidthPx=315;
importReady.getRange('B:B').format.columnWidthPx=165;
importReady.getRange('C:C').format.columnWidthPx=140;
importReady.getRange('D:D').format.columnWidthPx=390;
importReady.getRange('E:E').format.columnWidthPx=110;
importReady.getRange('F:G').format.columnWidthPx=145;
importReady.getRange('H:H').format.columnWidthPx=270;
importReady.getRange('I:I').format.columnWidthPx=90;
importReady.getRange(`A2:I${lastImport}`).format.rowHeight=22;
importReady.freezePanes.freezeRows(1);
importReady.tables.add(`A1:I${lastImport}`,true,'DashboardImportTable').style='TableStyleMedium2';

await fs.mkdir(outputDir,{recursive:true});
const previews=[
  ['Dispatcher List','A1:E18','dispatcher_list_preview.png'],
  ['Full Associate Details','A1:I15','full_details_preview.png'],
  ['Dashboard Import','A1:I15','dashboard_import_preview.png']
];
for(const [sheetName,range,file] of previews){
  const preview=await workbook.render({sheetName,range,scale:1.2,format:'png'});
  await fs.writeFile(`${outputDir}/${file}`,new Uint8Array(await preview.arrayBuffer()));
}
const output=await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/AssociateData-4_Organized.xlsx`);
const inspect=await workbook.inspect({kind:'table',range:'Dispatcher List!A1:E10',include:'values,formulas',tableMaxRows:10,tableMaxCols:5});
const errors=await workbook.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',options:{useRegex:true,maxResults:100},summary:'final formula error scan'});
console.log(JSON.stringify({rows:rows.length,active:rows.filter(row=>row.status==='ACTIVE').length,inactive:rows.filter(row=>row.status==='INACTIVE').length,inspect:inspect.ndjson,errors:errors.ndjson,output:`${outputDir}/AssociateData-4_Organized.xlsx`}));
