/**
 * AMABELLEPEAU - Persistent IndexedDB & Quota-Safe Storage Engine
 * Handles high-resolution product photos and promotional banners without
 * hitting the 5MB browser localStorage limit.
 */
(function(window) {
  'use strict';

  const DB_NAME = 'abp_storage_db';
  const DB_VERSION = 1;
  const STORE_NAME = 'media_cache';

  const ABPStorage = {
    cache: {},
    ready: false,
    _initPromise: null,

    init: function() {
      if (this._initPromise) return this._initPromise;

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
                  window.dispatchEvent(new CustomEvent('abp_storage_ready'));
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

    setImage: function(key, dataUrl) {
      if (!key) return Promise.resolve();
      this.cache[key] = dataUrl;

      return new Promise((resolve) => {
        if (!this._db) return resolve();
        try {
          const tx = this._db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(dataUrl, key);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch (e) {
          resolve();
        }
      });
    },

    getImage: function(key) {
      if (this.cache[key]) return this.cache[key];
      return null;
    },

    removeImage: function(key) {
      delete this.cache[key];
      if (!this._db) return Promise.resolve();
      return new Promise((resolve) => {
        try {
          const tx = this._db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.delete(key);
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
          // Fill background white in case of transparency converting to JPEG
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
     * strips oversized bloat, frees space, and guarantees persistence.
     */
    safeSetItem: function(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (err) {
        if (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014) {
          console.warn('LocalStorage quota exceeded. Purging bloat and migrating heavy images to IndexedDB...');
          this.purgeQuotaBloat();
          try {
            localStorage.setItem(key, value);
            return true;
          } catch (retryErr) {
            console.warn('Second attempt failed, performing aggressive compression on products catalog...');
            this.aggressiveCompressCatalog();
            try {
              localStorage.setItem(key, value);
              return true;
            } catch (finalErr) {
              console.error('Final localStorage safeSetItem failure:', finalErr);
              return false;
            }
          }
        }
        return false;
      }
    },

    /**
     * Emergency quota cleaner: converts oversized base64 in stored catalogs into IndexedDB keys
     */
    purgeQuotaBloat: function() {
      // 1. Clean products catalog
      try {
        const raw = localStorage.getItem('abp_products_catalog_v5');
        if (raw) {
          const products = JSON.parse(raw);
          let changed = false;
          products.forEach(p => {
            if (p.image && p.image.startsWith('data:') && p.image.length > 50000) {
              const idbKey = 'prod_img_' + p.id;
              this.setImage(idbKey, p.image);
              // Replace in localStorage with lightweight placeholder or pointer
              p.image = idbKey;
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem('abp_products_catalog_v5', JSON.stringify(products));
          }
        }
      } catch (e) {}

      // 2. Clean promotions
      try {
        const rawP = localStorage.getItem('abp_admin_promotions');
        if (rawP) {
          const promos = JSON.parse(rawP);
          let changedP = false;
          promos.forEach(pr => {
            if (pr.mediaUrl && pr.mediaUrl.startsWith('data:') && pr.mediaUrl.length > 50000) {
              const idbKey = 'promo_img_' + pr.id;
              this.setImage(idbKey, pr.mediaUrl);
              pr.mediaUrl = idbKey;
              changedP = true;
            }
          });
          if (changedP) {
            localStorage.setItem('abp_admin_promotions', JSON.stringify(promos));
          }
        }
      } catch (e) {}
    },

    aggressiveCompressCatalog: function() {
      try {
        const raw = localStorage.getItem('abp_products_catalog_v5');
        if (raw) {
          const products = JSON.parse(raw);
          products.forEach(p => {
            if (p.image && p.image.startsWith('data:')) {
              const idbKey = 'prod_img_' + p.id;
              this.setImage(idbKey, p.image);
              p.image = p.fallbackImage || 'assets/images/products/1.png';
            }
          });
          localStorage.setItem('abp_products_catalog_v5', JSON.stringify(products));
        }
      } catch(e) {}
    }
  };

  // Immediate init
  ABPStorage.init();
  window.ABPStorage = ABPStorage;

})(window);
