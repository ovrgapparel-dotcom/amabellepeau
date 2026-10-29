/**
 * AMABELLEPEAU — Service Worker
 * ==============================
 * Offline-first PWA support.
 * Caches core assets for offline browsing.
 */

const CACHE_NAME = 'abp-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/catalogue.html',
  '/panier.html',
  '/checkout.html',
  '/auth.html',
  '/css/main.css',
  '/js/cart.js',
  '/js/payments.js',
  '/assets/icons/logo.png',
  '/manifest.json',
];

// ── Install: cache static assets ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ─────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for API, cache-first for assets ──────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and external requests
  if (event.request.method !== 'GET') return;
  if (!url.origin.includes(self.location.origin)) return;

  // API calls: network only
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Assets: cache-first, fallback to network
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Offline fallback
      if (event.request.headers.get('accept').includes('text/html')) {
        return caches.match('/index.html');
      }
    })
  );
});
