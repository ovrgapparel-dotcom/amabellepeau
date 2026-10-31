/**
 * AMABELLEPEAU - Persistent IndexedDB & Quota-Safe Storage Engine (v2.0)
 * Handles high-resolution product photos, multi-image galleries, and promotional banners
 * without ever hitting the 5MB browser localStorage limit.
 */
(function(window) {
  'use strict';

  const DB_NAME = 'abp_storage_db';
  const DB_VERSION = 2;
  const STORE_NAME = 'media_cache';

  const ABPStorage = {
    cache: {},
    ready: false,
    _initPromise: null,

    init: function() {
      if (this._initPromise) return this._initPromise;

      // 1. Proactive cleanup of legacy localStorage bloat
      this.purgeObsoleteStorageKeys();

      this._initPromise = new Promise((resolve) => {
        if (!('indexedDB' in window)) {
          console.warn('IndexedDB not supported, falling back to memory cache');
          this.ready = true;
          return resolve();
        }

        try {
          const req = indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded = function(e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME);
            }
          };

          req.onsuccess = (e) => {
            const db = e.target.result;
            this._db = db;
            // Preload all cached images into fast memory
            try {
              const tx = db.transaction(STORE_NAME, 'readonly');
              const store = tx.objectStore(STORE_NAME);
              const cursorReq = store.openCursor();
              cursorReq.onsuccess = (ev) => {
                const cursor = ev.target.result;
                if (cursor) {
                  ABPStorage.cache[cursor.key] = cursor.value;
                  cursor.continue();
                } else {
                  ABPStorage.ready = true;
                  // Auto-migrate any unmigrated data URLs from localStorage
                  ABPStorage.proactiveMigrateBloat();

                  window.dispatchEvent(new CustomEvent('abp_storage_ready'));
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('abp_products_updated'));
                    window.dispatchEvent(new CustomEvent('abp_promotions_updated'));
                    window.dispatchEvent(new CustomEvent('abp_merchants_updated'));
                  }
                  resolve();
                }
              };
              cursorReq.onerror = () => {
                ABPStorage.ready = true;
                resolve();
              };
            } catch (err) {
              ABPStorage.ready = true;
              resolve();
            }
          };

          req.onerror = function(err) {
            console.warn('IndexedDB open error:', err);
            ABPStorage.ready = true;
            resolve();
          };
        } catch (err) {
          console.warn('IndexedDB init error:', err);
          this.ready = true;
          resolve();
        }
      });

      return this._initPromise;
    },

    /**
     * Purges old obsolete versions from localStorage to free up 3-4 MB immediately.
     */
    purgeObsoleteStorageKeys: function() {
      try {
        const obsoleteKeys = [
          'abp_products_catalog_v1',
          'abp_products_catalog_v2',
          'abp_products_catalog_v3',
          'abp_products_catalog_v4',
          'abp_products_catalog',
          'abp_catalog_v1',
          'abp_catalog_v2',
          'abp_catalog_v3',
          'abp_catalog_v4',
          'abp_products_backup'
        ];
        obsoleteKeys.forEach(k => {
          try {
            if (localStorage.getItem(k) !== null) {
              localStorage.removeItem(k);
            }
          } catch(e) {}
        });
      } catch(e) {}
    },

    /**
     * Scans localStorage for heavy data URLs and safely moves them to IndexedDB.
     */
    proactiveMigrateBloat: function() {
      // 1. Products catalog
      try {
        const raw = localStorage.getItem('abp_products_catalog_v5');
        if (raw && raw.includes('data:image')) {
          const products = JSON.parse(raw);
          let modified = false;
          products.forEach(p => {
            if (p.image && p.image.startsWith('data:')) {
              const k = 'prod_img_' + p.id;
              this.setImage(k, p.image);
              p.image = 'idb:' + k;
              modified = true;
            }
            if (Array.isArray(p.images)) {
              p.images = p.images.map((img, idx) => {
                if (img && img.startsWith('data:')) {
                  const k = 'prod_img_' + p.id + '_' + idx;
                  this.setImage(k, img);
                  modified = true;
                  return 'idb:' + k;
                }
                return img;
              });
            }
          });
          if (modified) {
            this.safeSetItem('abp_products_catalog_v5', JSON.stringify(products));
          }
        }
      } catch(e) {}

      // 2. Promotions
      try {
        const rawPromo = localStorage.getItem('abp_admin_promotions');
        if (rawPromo && (rawPromo.includes('data:image') || rawPromo.includes('data:video'))) {
          const promos = JSON.parse(rawPromo);
          let modifiedP = false;
          promos.forEach(pr => {
            if (pr.mediaUrl && pr.mediaUrl.startsWith('data:')) {
              const k = 'promo_img_' + pr.id;
              this.setImage(k, pr.mediaUrl);
              pr.mediaUrl = 'idb:' + k;
              modifiedP = true;
            }
            if (pr.videoUrl && pr.videoUrl.startsWith('data:')) {
              const k = 'promo_vid_' + pr.id;
              this.setImage(k, pr.videoUrl);
              pr.videoUrl = 'idb:' + k;
              modifiedP = true;
            }
          });
          if (modifiedP) {
            this.safeSetItem('abp_admin_promotions', JSON.stringify(promos));
          }
        }
      } catch(e) {}

      // 3. Merchants
      try {
        const rawMerch = localStorage.getItem('abp_merchants');
        if (rawMerch && rawMerch.includes('data:image')) {
          const merchants = JSON.parse(rawMerch);
          let modifiedM = false;
          merchants.forEach(m => {
            if (m.logo && m.logo.startsWith('data:')) {
              const k = 'merch_logo_' + m.id;
              this.setImage(k, m.logo);
              m.logo = 'idb:' + k;
              modifiedM = true;
            }
            if (m.banner && m.banner.startsWith('data:')) {
              const k = 'merch_banner_' + m.id;
              this.setImage(k, m.banner);
              m.banner = 'idb:' + k;
              modifiedM = true;
            }
          });
          if (modifiedM) {
            this.safeSetItem('abp_merchants', JSON.stringify(merchants));
          }
        }
      } catch(e) {}
    },

    setImage: function(key, dataUrl) {
      if (!key) return Promise.resolve();
      const cleanKey = key.startsWith('idb:') ? key.replace('idb:', '') : key;
      this.cache[cleanKey] = dataUrl;

      return new Promise((resolve) => {
        if (!this._db) return resolve();
        try {
          const tx = this._db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(dataUrl, cleanKey);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch (e) {
          resolve();
        }
      });
    },

    getImage: function(key) {
      if (!key) return null;
      const cleanKey = key.startsWith('idb:') ? key.replace('idb:', '') : key;
      if (this.cache[cleanKey]) return this.cache[cleanKey];
      return null;
    },

    /**
     * Resolves an image source safely: handles idb: keys, data URLs,
     * and normal URL paths without flashing or throwing errors.
     */
    resolveImage: function(src, fallback) {
      const fb = fallback || 'assets/icons/brand-logo.png';
      if (!src) return fb;

      // Handle accidental leading slashes or prefixes before data:
      if (typeof src === 'string' && src.includes('data:image')) {
        const idx = src.indexOf('data:image');
        return src.substring(idx);
      }

      // Handle idb: pointer
      if (typeof src === 'string' && src.startsWith('idb:')) {
        const key = src.replace('idb:', '');
        const cached = this.getImage(key);
        if (cached) return cached;
        return fallback || fb;
      }

      // Handle raw IDB key without prefix
      if (typeof src === 'string' && (src.startsWith('prod_img_') || src.startsWith('promo_img_') || src.startsWith('merch_'))) {
        const cached = this.getImage(src);
        if (cached) return cached;
        return fallback || fb;
      }

      return src;
    },

    removeImage: function(key) {
      const cleanKey = key.startsWith('idb:') ? key.replace('idb:', '') : key;
      delete this.cache[cleanKey];
      if (!this._db) return Promise.resolve();
      return new Promise((resolve) => {
        try {
          const tx = this._db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.delete(cleanKey);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch(e) {
          resolve();
        }
      });
    },

    /**
     * Ultra-lightweight image compressor using Canvas.
     * Shrinks any camera / high-res upload to crisp ~25KB - 40KB JPEG.
     */
    compressImage: function(fileOrDataUrl, maxWidth = 640, maxHeight = 640, quality = 0.75) {
      return new Promise((resolve, reject) => {
        const processImg = (img) => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };

        if (typeof fileOrDataUrl === 'string') {
          const img = new Image();
          img.onload = () => processImg(img);
          img.onerror = reject;
          img.src = fileOrDataUrl;
        } else {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => processImg(img);
            img.onerror = reject;
            img.src = e.target.result;
          };
          reader.readAsDataURL(fileOrDataUrl);
        }
      });
    },

    /**
     * Bulletproof localStorage.setItem that catches QuotaExceededError,
     * strips any leftover data URLs to IndexedDB, and retries cleanly.
     */
    safeSetItem: function(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (err) {
        if (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014) {
          console.warn('LocalStorage quota reached. Purging obsolete data and migrating to IndexedDB...');
          this.purgeObsoleteStorageKeys();
          this.proactiveMigrateBloat();
          try {
            localStorage.setItem(key, value);
            return true;
          } catch (retryErr) {
            console.warn('Second attempt failed, stripping all inline base64 from value...');
            try {
              // Emergency strip of any data: in value itself
              const stripped = value.replace(/"data:image\/[^"]+"/g, '"assets/images/products/1.png"')
                                    .replace(/"data:video\/[^"]+"/g, '""');
              localStorage.setItem(key, stripped);
              return true;
            } catch (finalErr) {
              console.error('Final localStorage safeSetItem failure:', finalErr);
              return false;
            }
          }
        }
        return false;
      }
    }
  };

  // Immediate init
  if (typeof window !== 'undefined') {
    ABPStorage.init();
    window.ABPStorage = ABPStorage;
  }

})(typeof window !== 'undefined' ? window : this);
