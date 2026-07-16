import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const source='/Users/alecgonzo/.codex/attachments/56a85b9d-4fff-44bd-b160-2d8d636db427/pasted-text.txt';
const outputDir='/Users/alecgonzo/Documents/Hera look alike/outputs';
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
const rows=raw.slice(1).filter(row=>cleanName(row[nameIx])).map(row=>({
  name:cleanName(row[nameIx]),transporter:String(row[transporterIx]??'').trim(),position:String(row[positionIx]??'').trim(),
  qualifications:String(row[qualificationsIx]??'').replace(/\s+,/g,',').replace(/,\s*/g,', ').trim(),
  expiration:String(row[expirationIx]??'').trim(),personal:phone(row[personalIx]),work:phone(row[workIx]),
  email:String(row[emailIx]??'').trim(),status:String(row[statusIx]??'').trim().toUpperCase()
})).sort((a,b)=>a.name.localeCompare(b.name));

const workbook=Workbook.create();
const primary=workbook.worksheets.add('Dispatcher List');
const full=workbook.worksheets.add('Full Associate Details');
const navy='#173A57',blue='#78B7DF',light='#EEF6FB',line='#D7E3EC',green='#EAF7EC',greenInk='#24623A';

primary.showGridLines=false;
primary.mergeCells('A1:E1');
primary.getRange('A1').values=[['Delivery Associate Directory']];
primary.getRange('A1:E1').format={fill:navy,font:{bold:true,color:'#FFFFFF',size:16},verticalAlignment:'center'};
primary.getRange('A1:E1').format.rowHeight=32;
primary.getRange('A2:E2').values=[[`${rows.length} associates · organized for dispatcher use`,'','','','']];
primary.mergeCells('A2:E2');
primary.getRange('A2:E2').format={fill:light,font:{color:'#4B6173',italic:true},verticalAlignment:'center'};
primary.getRange('A3:E3').values=[['Delivery Associate','Personal Phone','Position','Status','Transporter ID']];
primary.getRange('A3:E3').format={fill:blue,font:{bold:true,color:'#102C42'},horizontalAlignment:'left',verticalAlignment:'center',borders:{bottom:{style:'medium',color:navy}}};
primary.getRange(`A4:E${rows.length+3}`).values=rows.map(row=>[row.name,row.personal,row.position,row.status,row.transporter]);
primary.getRange(`A4:E${rows.length+3}`).format={font:{color:'#213444'},verticalAlignment:'center',borders:{insideHorizontal:{style:'thin',color:line}}};
primary.getRange(`D4:D${rows.length+3}`).format={fill:green,font:{bold:true,color:greenInk},horizontalAlignment:'center'};
primary.getRange(`A4:A${rows.length+3}`).format.font={bold:true,color:'#155E91'};
primary.getRange(`B4:B${rows.length+3}`).format.numberFormat='@';
primary.getRange(`E4:E${rows.length+3}`).format.numberFormat='@';
primary.getRange('A:A').format.columnWidthPx=245;
primary.getRange('B:B').format.columnWidthPx=145;
primary.getRange('C:C').format.columnWidthPx=165;
primary.getRange('D:D').format.columnWidthPx=90;
primary.getRange('E:E').format.columnWidthPx=150;
primary.freezePanes.freezeRows(3);
primary.tables.add(`A3:E${rows.length+3}`,true,'DispatcherDirectory').style='TableStyleMedium2';

full.showGridLines=false;
full.mergeCells('A1:I1');
full.getRange('A1').values=[['Full Associate Details']];
full.getRange('A1:I1').format={fill:navy,font:{bold:true,color:'#FFFFFF',size:15},verticalAlignment:'center'};
full.getRange('A2:I2').values=[['Name','Transporter ID','Position','Qualifications','ID Expiration','Personal Phone','Work Phone','Email','Status']];
full.getRange('A2:I2').format={fill:blue,font:{bold:true,color:'#102C42'},verticalAlignment:'center',wrapText:true,borders:{bottom:{style:'medium',color:navy}}};
full.getRange(`A3:I${rows.length+2}`).values=rows.map(row=>[row.name,row.transporter,row.position,row.qualifications,row.expiration,row.personal,row.work,row.email,row.status]);
full.getRange(`A3:I${rows.length+2}`).format={verticalAlignment:'center',borders:{insideHorizontal:{style:'thin',color:line}}};
full.getRange(`A3:A${rows.length+2}`).format.font={bold:true,color:'#155E91'};
full.getRange(`I3:I${rows.length+2}`).format={fill:green,font:{bold:true,color:greenInk},horizontalAlignment:'center'};
full.getRange('A:A').format.columnWidthPx=230; full.getRange('B:B').format.columnWidthPx=150;
full.getRange('C:C').format.columnWidthPx=140; full.getRange('D:D').format.columnWidthPx=300;
full.getRange('E:E').format.columnWidthPx=110; full.getRange('F:G').format.columnWidthPx=145;
full.getRange('H:H').format.columnWidthPx=235; full.getRange('I:I').format.columnWidthPx=85;
full.getRange(`B3:B${rows.length+2}`).format.numberFormat='@';
full.getRange(`E3:G${rows.length+2}`).format.numberFormat='@';
full.freezePanes.freezeRows(2);
full.tables.add(`A2:I${rows.length+2}`,true,'FullAssociateDirectory').style='TableStyleMedium2';

await fs.mkdir(outputDir,{recursive:true});
const preview=await workbook.render({sheetName:'Dispatcher List',range:'A1:E18',scale:1.4,format:'png'});
await fs.writeFile(`${outputDir}/organized_associate_data_preview.png`,new Uint8Array(await preview.arrayBuffer()));
const output=await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/organized_associate_data.xlsx`);
const inspect=await workbook.inspect({kind:'table',range:'Dispatcher List!A1:E10',include:'values,formulas',tableMaxRows:10,tableMaxCols:5});
console.log(JSON.stringify({rows:rows.length,inspect:inspect.ndjson,output:`${outputDir}/organized_associate_data.xlsx`}));
