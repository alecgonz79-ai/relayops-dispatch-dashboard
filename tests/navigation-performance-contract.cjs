const fs=require('fs');

const source=fs.readFileSync(require.resolve('../app.js'),'utf8');

function assert(condition,message){if(!condition)throw new Error(message);}

const goBody=source.match(/function go\(page\) \{([\s\S]*?)\n\}/)?.[1]||'';
assert(goBody,'Navigation function was not found');
assert(!/(?:^|[^A-Za-z])persist\(\)/.test(goBody),'Tab navigation must not serialize and cloud-save the entire operational workspace');
assert(goBody.includes("localStorage.setItem('relayops_page',state.page)"),'Tab navigation must still remember the last local page');
assert(goBody.includes('renderNavigationPage(previousPage)'),'Tab navigation must update the existing shell instead of rebuilding the whole application');
assert(goBody.includes("document.getElementById('sidebar')?.classList?.remove('open')")&&goBody.includes("setAttribute?.('aria-expanded','false')"),'Mobile tab selection must close the navigation drawer and reset its trigger');
assert(source.includes("if(el.dataset.relayopsPageBound==='true')return"),'Persistent sidebar buttons must not accumulate duplicate click handlers');
assert(source.includes('const navigationPageCache=new Map()')&&source.includes('NAVIGATION_PAGE_CACHE_LIMIT=3'),'Tab navigation must retain a bounded recent-page DOM cache');
assert(source.includes('window.requestAnimationFrame(()=>window.requestAnimationFrame(build))'),'Uncached tabs must yield a paint before building large page tables');
assert(source.includes("content.dataset.ready='true'")&&source.includes('recordNavigationTiming(targetPage,startedAt,true)'),'Cached tab restores must be marked ready and measured');
assert(source.includes('function invalidateNavigationPageCache()')&&source.includes('function persist(){\ninvalidateNavigationPageCache();'),'Operational saves must invalidate cached pages so shared data cannot go stale');
assert(source.includes('let operationalAlertGroupsCache=null')&&source.includes('if(operationalAlertGroupsCache)return operationalAlertGroupsCache'),'Tab navigation must reuse the expensive fleet and Whiparound alert summary');
assert(source.includes('openingRosterControlsOpen:')&&source.includes("controlsOpen?openingRosterScheduleHtml()"),'The large Opening Roster control lists must stay lazy until dispatchers open them');
assert(source.includes('function teamDriverMetrics(drivers=[])'),'Drivers & Team must aggregate history in one pass instead of rescanning every history record per card');
assert(source.includes("if(card.querySelector('.driver-text-button'))return"),'Driver text controls must not be rebuilt once per card after navigation');

console.log('Fast tab navigation and one-pass Drivers & Team rendering contracts passed');
