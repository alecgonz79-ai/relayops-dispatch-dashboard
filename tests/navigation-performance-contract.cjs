const fs=require('fs');

const source=fs.readFileSync(require.resolve('../app.js'),'utf8');

function assert(condition,message){if(!condition)throw new Error(message);}

const goBody=source.match(/function go\(page\) \{([\s\S]*?)\n\}/)?.[1]||'';
assert(goBody,'Navigation function was not found');
assert(!/(?:^|[^A-Za-z])persist\(\)/.test(goBody),'Tab navigation must not serialize and cloud-save the entire operational workspace');
assert(goBody.includes("localStorage.setItem('relayops_page',state.page)"),'Tab navigation must still remember the last local page');
assert(goBody.includes('renderNavigationPage(previousPage)'),'Tab navigation must update the existing shell instead of rebuilding the whole application');
assert(goBody.includes("document.getElementById('sidebar')?.classList?.remove('open')")&&goBody.includes("setAttribute?.('aria-expanded','false')"),'Mobile tab selection must close the navigation drawer and reset its trigger');
assert(source.includes('let pageNavigationDelegationBound=false')&&source.includes("document.addEventListener?.('click',handlePageNavigationClick)"),'Persistent sidebar buttons must use one stable delegated navigation handler');
assert(source.includes('let actionDelegationBound=false')&&source.includes("document.addEventListener?.('click',handleActionControlClick)"),'Persistent controls must use one stable delegated action handler');
assert(source.includes("el.classList?.contains?.('modal-backdrop')&&event.target?.closest?.('.modal')"),'Clicks inside a modal must not be misread as backdrop-close actions');
assert(!source.includes('onclick="event.stopPropagation()"'),'Modal shells must not block delegated controls such as Choose files and Close');
assert(source.includes('const navigationPageCache=new Map()')&&source.includes('NAVIGATION_PAGE_CACHE_LIMIT=6'),'Tab navigation must retain the six high-use dispatch pages in a bounded DOM cache');
assert(source.includes('if(window.setTimeout)window.setTimeout(build,0);else build();'),'Uncached tabs must yield one task without using throttled requestAnimationFrame delays');
assert(source.includes("content.dataset.ready='true'")&&source.includes('recordNavigationTiming(targetPage,startedAt,true)'),'Cached tab restores must be marked ready and measured');
assert(source.includes('function invalidateNavigationPageCache()')&&source.includes('function persist(){\ninvalidateNavigationPageCache();'),'Operational saves must invalidate cached pages so shared data cannot go stale');
assert(source.includes('let operationalAlertGroupsCache=null')&&source.includes('if(operationalAlertGroupsCache)return operationalAlertGroupsCache'),'Tab navigation must reuse the expensive fleet and Whiparound alert summary');
assert(source.includes('openingRosterControlsOpen:')&&source.includes("controlsOpen?openingRosterScheduleHtml()"),'The large Opening Roster control lists must stay lazy until dispatchers open them');
assert(source.includes('function teamDriverMetrics(drivers=[])'),'Drivers & Team must aggregate history in one pass instead of rescanning every history record per card');
assert(source.includes("if(card.querySelector('.driver-text-button'))return"),'Driver text controls must not be rebuilt once per card after navigation');
assert(source.includes("if (name==='import') { state.importSource='computer'; state.importPurpose='morning'; state.importedFile=null; return openLightweightModal('import'); }"),'Upload day files must open without rebuilding the large Morning Sheet');
assert(source.includes("['picklist-screenshot-review','screenshot','vto-route-swap','import'].includes(state.modal)"),'The lightweight upload modal must close without rebuilding the Morning Sheet');
assert(source.includes('bindUploadDropZone(backdrop);'),'The lightweight upload modal must preserve drag-and-drop file support');
assert(source.includes("if(event.type==='saved'){state.cloudStatus='synced';state.cloudAccessError='';cloudAutoRetryAttempts=0;refreshCloudStatusUi();}"),'Cloud save acknowledgements must refresh only the sync indicator instead of rebuilding the active page');

console.log('Fast tab navigation and one-pass Drivers & Team rendering contracts passed');
