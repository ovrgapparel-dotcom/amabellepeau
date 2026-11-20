/**
 * AMABELLEPEAU — Service Worker
 * ==============================
 * Offline-first PWA support with resilience.
 * Caches core assets and scripts for 100% offline browsing.
 */

const CACHE_NAME = 'abp-v2.1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/catalogue.html',
  '/produit.html',
  '/panier.html',
  '/checkout.html',
  '/compte.html',
  '/facture.html',
  '/marchand.html',
  '/commission-agreement.html',
  '/admin/index.html',
  '/admin/influenceurs.html',
  '/css/main.css',
  '/css/social-share.css',
  '/js/storage-db.js',
  '/js/products-data.js',
  '/js/admin-store.js',
  '/js/order-invoice-engine.js',
  '/js/social-share.js',
  '/js/cart.js',
  '/js/payments.js',
  '/assets/icons/brand-logo.png',
  '/assets/icons/logo.png',
  '/assets/images/og-share-amabellepeau.png',
  '/manifest.json'
];

// ── Install: Cache all static shell assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.allSettled(
          STATIC_ASSETS.map(url => cache.add(url).catch(err => {
            console.warn('[SW] Could not pre-cache asset:', url, err);
          }))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activate: Clean up old cache versions ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: Stale-While-Revalidate & Cache-First strategy with Offline Fallback ──
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests
  if (req.method !== 'GET') return;

  // For Supabase and external API requests: Try network first, graceful fail if offline
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(req).catch(() => {
        // Return a clean offline json response so app doesn't crash
        return new Response(JSON.stringify({ error: 'offline', data: null }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Only handle same-origin or CDN static resources
  if (!url.origin.includes(self.location.origin) && !url.hostname.includes('jsdelivr') && !url.hostname.includes('cdnjs')) {
    return;
  }

  // Cache-first with background network revalidation
  event.respondWith(
    caches.match(req).then(cachedResponse => {
      const fetchPromise = fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return networkResponse;
      }).catch(err => {
        // Network offline
        if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
          return caches.match(req).then(res => res || caches.match('/index.html'));
        }
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
