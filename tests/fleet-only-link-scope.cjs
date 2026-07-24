const fs=require('fs');

function assert(condition,message){if(!condition)throw new Error(message);}

const app=fs.readFileSync('app.js','utf8');
const styles=fs.readFileSync('styles.css','utf8');

assert(app.includes("const FLEET_TEAM_ALLOWED_PAGES = new Set(['fleet','parking'])"),'Fleet-only link must allow exactly Fleet Health and Van Parking');
assert(app.includes("sharedDashboardUrl('fleet')"),'Copied fleet link must open the restricted Fleet Health workspace');
assert(app.includes('fleet-locked-nav')&&app.includes('disabled aria-disabled="true"'),'Every non-fleet sidebar tab must be visibly locked and non-interactive');
assert(app.includes("!FLEET_TEAM_ALLOWED_PAGES.has(page)"),'Direct dashboard navigation must reject pages outside the fleet-only scope');
assert(app.includes('This fleet link can edit Van Parking. Other dashboard tools stay locked.'),'Fleet-only actions must allow parking edits while enforcing the remaining scope');
assert(app.includes('fleet-issues-readonly'),'Vehicle issue-entry controls must remain read-only on Fleet Health');
assert(!app.includes('if(PARKING_ONLY_VIEW)return withChargers'),'Fleet and dispatcher links must render the same complete parking map');
assert(app.includes('readonly aria-readonly="true"')&&app.includes('title="Double-click to edit')&&app.includes('beginParkingSlotEdit(el)'),'Fleet parking van fields must use the same double-click editing interaction as the dispatcher map');
assert(app.includes("'parking-choose-file','copy-parking-list','reset-parking','parse-parking-paste'")&&app.includes("'report-charging-station','copy-charger-report','copy-open-charger-slack'"),'Fleet parking action scope must include editing, imports, and charger reporting');
assert(app.includes('vanParking:state.vanParking')&&app.includes('vanParkingBatteries:state.vanParkingBatteries')&&app.includes('parkingChargerStatus:state.parkingChargerStatus')&&app.includes('parkingNotes:state.parkingNotes'),'Parking edits must remain part of the shared cloud payload');
assert(styles.includes('.fleet-locked-nav')&&styles.includes('cursor:not-allowed'),'Locked navigation must be visually distinct');
assert(styles.includes('touch-action:pan-x pan-y pinch-zoom')&&styles.includes('.parking-mobile-gesture-hint'),'Fleet parking must support mobile pan and pinch zoom guidance');

console.log('Fleet-only Health + shared editable Parking link scope test passed');
