const fs=require('fs');

function assert(condition,message){if(!condition)throw new Error(message);}

const app=fs.readFileSync('app.js','utf8');
const styles=fs.readFileSync('styles.css','utf8');

assert(app.includes("const FLEET_TEAM_ALLOWED_PAGES = new Set(['fleet','parking'])"),'Fleet-only link must allow exactly Fleet Health and Van Parking');
assert(app.includes("sharedDashboardUrl('fleet')"),'Copied fleet link must open the restricted Fleet Health workspace');
assert(app.includes('fleet-locked-nav')&&app.includes('disabled aria-disabled="true"'),'Every non-fleet sidebar tab must be visibly locked and non-interactive');
assert(app.includes("!FLEET_TEAM_ALLOWED_PAGES.has(page)"),'Direct dashboard navigation must reject pages outside the fleet-only scope');
assert(app.includes("Fleet-only access is read-only"),'Fleet-only actions must have a read-only enforcement guard');
assert(app.includes("if(PARKING_ONLY_VIEW)return '';")&&app.includes('fleet-issues-readonly'),'Vehicle renaming and issue-entry controls must be removed from fleet-only cards');
assert(styles.includes('.fleet-locked-nav')&&styles.includes('cursor:not-allowed'),'Locked navigation must be visually distinct');

console.log('Fleet-only Health + Parking link scope test passed');
