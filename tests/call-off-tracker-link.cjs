const fs=require('fs'),assert=require('assert/strict');
const source=fs.readFileSync(require.resolve('../app.js'),'utf8');
assert(source.includes("['coaching','Call Off Tracker','calendar']"));
assert(!source.includes("['coaching','Coaching','coach','6']"));
assert(source.includes("const CALL_OFF_TRACKER_URL = 'https://callofftracker.pplx.app/#/';"));
assert(source.includes('aria-label="Call Off Tracker (opens in a new tab)"'));
assert(source.includes('href="${CALL_OFF_TRACKER_URL}" target="_blank" rel="noopener noreferrer"'));
assert(source.includes('function legacyCoachingPage()'), 'Retain existing coaching logic/data without deleting records');
console.log('Call Off Tracker replaces Coaching navigation with a safe external link');
