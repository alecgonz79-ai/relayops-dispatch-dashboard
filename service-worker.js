const CACHE='relayops-fleet-recovery-v102';
const CORE=[
  './',
  './index.html',
  './styles.css?v=20260812-fleet-recovery-r1',
  './macos-preview.css?v=20260725-tahoe-published-r1',
  './tahoe-preview.css?v=20260725-tahoe-published-r1',
  './tahoe-midnight-preview.css?v=20260726-fleet-warning-r1',
  './app.js?v=20260812-fleet-recovery-r1',
  './cloud-sync.js?v=20260728-egress-budget-r2',
  './supabase/config.js?v=20260720-auth-redirect',
  './vendor/jszip.min.js',
  './assets/rivian-prime-van.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache=>cache.addAll(CORE.map(url=>new Request(url,{cache:'reload'}))))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  if(event.request.mode==='navigate'||/\.(?:js|css)$/.test(url.pathname)){
    const fallback=event.request.mode==='navigate'?'./index.html':event.request;
    const freshRequest=new Request(event.request,{cache:'reload'});
    event.respondWith(fetch(freshRequest).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(fallback,{ignoreSearch:true})));
    return;
  }
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
});
