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
assert(source.includes('if(window.setTimeout)navigationBuildTimer=window.setTimeout(build,0);else build();'),'Uncached tabs must yield one cancellable task without using throttled requestAnimationFrame delays');
assert(source.includes('function cancelNavigationBuild()')&&source.includes('cancelNavigationBuild();\n  closeDriverProfilePopover()'),'Rapid tab changes must cancel obsolete page builds before generating another large view');
assert(!source.includes('requestIdleCallback(prepare'),'The dashboard must not pre-render spreadsheet-sized hidden pages during browser idle time');
assert(source.includes("content.dataset.ready='true'")&&source.includes('recordNavigationTiming(targetPage,startedAt,true)'),'Cached tab restores must be marked ready and measured');
assert(source.includes('function invalidateNavigationPageCache()')&&source.includes('function persist(){\ninvalidateNavigationPageCache();'),'Operational saves must invalidate cached pages so shared data cannot go stale');
assert(source.includes('let operationalAlertGroupsCache=null')&&source.includes('if(operationalAlertGroupsCache)return operationalAlertGroupsCache'),'Tab navigation must reuse the expensive fleet and Whiparound alert summary');
assert(source.includes('openingRosterControlsOpen:')&&source.includes("controlsOpen?openingRosterScheduleHtml()"),'The large Opening Roster control lists must stay lazy until dispatchers open them');
assert(source.includes('function teamDriverMetrics(drivers=[])'),'Drivers & Team must aggregate history in one pass instead of rescanning every history record per card');
assert(source.includes('let driverProfileLookupCache=null')&&source.includes('driverProfileLookupCache=new Map()'),'Driver aliases and profiles must use an indexed lookup instead of scanning every profile for every Picklist cell');
assert(source.includes('let teamDriverRowsCache=null')&&source.includes('if(teamDriverRowsCache&&teamDriverRowsCacheSource===source'),'Morning Sheet and Picklist identity matching must reuse the normalized driver directory');
assert(source.includes('const driverIdentityLookupCache=new Map()')&&source.includes('const morningContactLookupCache=new Map()'),'Repeated roster identity and contact matches must be cached during a render');
assert(source.includes('openingPicklistRightHtml(backups,calloffs)'),'Opening Picklist must reuse its already-calculated backup and call-off lists');
assert(source.includes("if(card.querySelector('.driver-text-button'))return"),'Driver text controls must not be rebuilt once per card after navigation');
assert(source.includes("if (name==='import') { state.importSource='computer'; state.importPurpose='morning'; state.importedFile=null; return openLightweightModal('import'); }"),'Upload day files must open without rebuilding the large Morning Sheet');
assert(source.includes("['picklist-screenshot-review','screenshot','vto-route-swap'")&&source.includes("'early-calloff-reminder','import'].includes(state.modal)"),'Operational popups, including upload and screenshot review, must close without rebuilding the active page');
assert(source.includes('bindUploadDropZone(backdrop);'),'The lightweight upload modal must preserve drag-and-drop file support');
const savedHandler=source.match(/if\(event\.type==='saved'\)\{([^}]+)\}/)?.[1]||'';
assert(savedHandler.includes("state.cloudStatus='synced'")&&savedHandler.includes('refreshCloudStatusUi()')&&!savedHandler.includes('renderFromCloudEvent()'),'Cloud save acknowledgements must refresh only the sync indicator instead of rebuilding the active page');
const authHandler=source.match(/if\(event\.type==='auth'\)\{([^}]+)\}/)?.[1]||'';
const accessHandler=source.match(/if\(event\.type==='access-granted'\)\{([^}]+)\}/)?.[1]||'';
assert(authHandler.includes('refreshCloudStatusUi()')&&!authHandler.includes('renderFromCloudEvent()'),'Cloud authentication must not rebuild a spreadsheet-sized active page before data hydration');
assert(accessHandler.includes('refreshCloudStatusUi()')&&!accessHandler.includes('renderFromCloudEvent()'),'Membership confirmation must not trigger a second startup page rebuild');
assert(source.includes('let initialCloudHydrationPending=Boolean(window.RelayOpsCloud?.configured)'),'Cloud-enabled startup must track whether the shared workspace has hydrated');
assert(source.includes('function renderInitialShell()')&&source.includes("data-ready=\"false\" aria-busy=\"true\""),'Cloud-enabled startup must paint a lightweight navigation shell instead of an outdated spreadsheet-sized page');
assert(source.includes('function completeInitialCloudHydration()')&&source.includes("if(event.type==='loaded'")&&source.includes('if(!completeInitialCloudHydration())renderFromCloudEvent()'),'The first shared-workspace load must replace the shell with one complete render');
assert(source.includes('\nrenderInitialShell();\nif(window.RelayOpsCloud?.configured)'),'Application startup must use the hydration-aware shell');
const sharedApply=source.match(/function applySharedWorkspaceState\(payload=\{\}\) \{([\s\S]*?)\n\}/)?.[1]||'';
const persistentApply=source.match(/function applyPersistentWorkspaceState\(payload=\{\}\) \{([\s\S]*?)\n\}/)?.[1]||'';
assert(sharedApply&&!sharedApply.includes('persist();')&&persistentApply&&!persistentApply.includes('persist();'),'Cloud hydration must not serialize and queue the entire workspace back to Supabase while it is being loaded');

console.log('Fast tab navigation and one-pass Drivers & Team rendering contracts passed');
