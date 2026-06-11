/* ================================================================
   GuardiansCall · SentinelHaven Service Worker  v2.0.0
   Offline-first PWA — covers both platforms
================================================================= */
const CACHE = 'gc-sh-v2.0.0';
const CDN   = 'gc-cdn-v2.0.0';
const SHELL = [
  '/', '/index.html', '/sentinelhaven.html',
  '/guardianscall-unified.css', '/sentinelhaven.css',
  '/guardianscall_logo.png', '/manifest.json', '/sentinel-manifest.json'
];
const CDN_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Space+Mono:wght@400;700&display=swap',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== CDN).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.pathname.startsWith('/api/')) return;
  if (url.hostname.includes('cdnjs') || url.hostname.includes('fonts.g')) {
    e.respondWith(
      caches.open(CDN).then(c =>
        c.match(e.request).then(h => h || fetch(e.request).then(r => {
          c.put(e.request, r.clone()); return r;
        }))
      ).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    fetch(e.request).then(r => {
      caches.open(CACHE).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() =>
      caches.match(e.request).then(h => {
        if (h) return h;
        // Fallback: serve the appropriate shell based on URL
        if (url.pathname.includes('sentinel')) return caches.match('/sentinelhaven.html');
        return caches.match('/index.html');
      })
    )
  );
});

self.addEventListener('sync', e => {
  if (e.tag === 'gc-ticket-sync') e.waitUntil(syncTickets());
  if (e.tag === 'sh-mood-sync')   e.waitUntil(syncMoodLogs());
});

async function syncTickets()  { console.log('[SW] Syncing support tickets...'); }
async function syncMoodLogs() { console.log('[SW] Syncing SentinelHaven mood logs...'); }
