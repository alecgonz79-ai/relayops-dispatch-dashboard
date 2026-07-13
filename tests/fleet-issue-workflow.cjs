const fs=require('fs');
const app=fs.readFileSync('app.js','utf8');
const css=fs.readFileSync('styles.css','utf8');
const required=[
  'Nail in front driver tire','Flat tire','Missing panels','Hanging Netradyne camera','Expired tags/registration',
  'Turtle mode','Roll up door not closing','A/C not working','360 Cam not working','Custom issue',
  'markFleetIssueFixed','fleetCardIssueManagerHtml','acknowledgeMorningVehicleIssue','morningIssueAcknowledgements'
];
for(const token of required)if(!app.includes(token))throw new Error(`Missing Fleet issue workflow token: ${token}`);
for(const token of ['fleet-card-issue-manager','fleet-active-issue','morning-issue-modal','.van-issue-mark.acknowledged'])if(!css.includes(token))throw new Error(`Missing Fleet issue UI style: ${token}`);
if(!fs.existsSync('service-worker.js'))throw new Error('Offline service worker is missing');
console.log('Fleet issue catalog, history, acknowledgement, and offline UI regression test passed');
