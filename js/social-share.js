/**
 * AMABELLEPEAU — Social Media Sharing Engine
 * Supports WhatsApp, Facebook, X (Twitter), Telegram, Native Web Share API, and Copy Link.
 */

(function (window, document) {
  'use strict';

  const ICONS = {
    whatsapp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.914z"/></svg>`,
    native: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
    copy: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    check: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
  };

  function resolveShareUrl(product) {
    if (product && product.url) return product.url;
    if (product && product.id) {
      const base = window.location.origin + window.location.pathname.replace(/[^/]+$/, '');
      return `${base}produit.html?id=${encodeURIComponent(product.id)}`;
    }
    return window.location.href;
  }

  function getActiveProductData(passedProduct) {
    if (!passedProduct && typeof window !== 'undefined' && window.currentProduct) {
      passedProduct = window.currentProduct;
    }
    if (passedProduct && passedProduct.name) {
      return {
        id: passedProduct.id || '',
        name: passedProduct.name,
        price: passedProduct.price ? (typeof passedProduct.price === 'number' ? new Intl.NumberFormat('fr-FR').format(passedProduct.price) + ' XOF' : passedProduct.price) : '',
        image: passedProduct.image || 'assets/images/og-share-amabellepeau.png',
        vertus: passedProduct.vertus || passedProduct.description || passedProduct.shortDesc || '',
        url: resolveShareUrl(passedProduct)
      };
    }

    // Try reading from current produit.html DOM
    const nameEl = document.getElementById('productTitle');
    const priceEl = document.getElementById('productPriceDisplay') || document.getElementById('totalPrice');
    const vertusEl = document.getElementById('vertusText') || document.getElementById('productDesc');
    const imgEl = document.getElementById('mainProductPhoto');
    const urlParams = new URLSearchParams(window.location.search);
    const pid = urlParams.get('id') || '';

    return {
      id: pid,
      name: nameEl ? nameEl.textContent.trim() : 'Soin Artisanal AMABELLEPEAU',
      price: priceEl ? priceEl.textContent.trim() : '',
      image: imgEl ? imgEl.src : 'assets/images/og-share-amabellepeau.png',
      vertus: vertusEl ? vertusEl.textContent.trim() : '',
      url: window.location.href
    };
  }

  function notifyUser(msg) {
    if (typeof window.showToast === 'function') {
      window.showToast(msg);
      return;
    }
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:84px;right:20px;background:#1B4D1E;color:#FFFFFF;padding:12px 20px;border-radius:10px;font-weight:700;font-size:13px;z-index:999999;box-shadow:0 8px 24px rgba(0,0,0,0.25);animation:fadeIn 0.3s ease;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  const SocialShare = {
    icons: ICONS,

    getShareData: getActiveProductData,

    share: function (platform, product) {
      const p = getActiveProductData(product);
      const url = p.url;
      const name = p.name;
      const priceStr = p.price ? ` (${p.price})` : '';

      switch (platform) {
        case 'whatsapp': {
          let text = `🌿 *${name}*${priceStr} sur AMABELLEPEAU !\nCosmétique 100% naturel confectionné en Côte d'Ivoire.`;
          if (p.vertus) text += `\n✨ ${p.vertus.substring(0, 100)}...`;
          text += `\n👉 Découvrir ce soin : ${url}`;
          const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
          window.open(waUrl, '_blank', 'noopener,noreferrer');
          break;
        }

        case 'facebook': {
          const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          window.open(fbUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
          break;
        }

        case 'x':
        case 'twitter': {
          const tweetText = `Découvrez ${name}${priceStr} sur @AMABELLEPEAU — Soins et savons 100% naturels en Côte d'Ivoire ! 🌿✨`;
          const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`;
          window.open(xUrl, '_blank', 'width=600,height=450,noopener,noreferrer');
          break;
        }

        case 'telegram': {
          const tgText = `🌿 ${name}${priceStr} — AMABELLEPEAU Cosmétique Bio`;
          const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tgText)}`;
          window.open(tgUrl, '_blank', 'noopener,noreferrer');
          break;
        }

        case 'native': {
          if (navigator.share) {
            navigator.share({
              title: `${name} — AMABELLEPEAU`,
              text: `Découvrez ${name}${priceStr} sur AMABELLEPEAU`,
              url: url
            }).catch(err => {
              if (err.name !== 'AbortError') {
                SocialShare.copyLink(product);
              }
            });
          } else {
            // Fallback to copy link on devices without Web Share API
            SocialShare.copyLink(product);
          }
          break;
        }

        case 'copy': {
          SocialShare.copyLink(product);
          break;
        }

        default:
          console.warn('Unknown share platform:', platform);
      }
    },

    copyLink: function (product, btnElement) {
      const p = getActiveProductData(product);
      const url = p.url;

      const finishCopy = () => {
        notifyUser('✓ Lien du soin copié dans le presse-papier !');
        // Visual button feedback
        const targetBtn = btnElement || document.getElementById('btnCopyProductLink') || document.querySelector('.share-modal-copy-btn');
        if (targetBtn) {
          const origHtml = targetBtn.innerHTML;
          targetBtn.classList.add('copied');
          targetBtn.innerHTML = `${ICONS.check} <span>Lien copié !</span>`;
          setTimeout(() => {
            targetBtn.classList.remove('copied');
            targetBtn.innerHTML = origHtml;
          }, 2500);
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(finishCopy).catch(() => {
          fallbackCopyText(url, finishCopy);
        });
      } else {
        fallbackCopyText(url, finishCopy);
      }
    },

    
    openModalById: function (id) {
      let p = null;
      if (typeof ProductStore !== 'undefined' && ProductStore.getById) {
        p = ProductStore.getById(id);
      }
      if (!p && typeof getProductsList === 'function') {
        p = getProductsList().find(x => String(x.id) === String(id));
      }
      if (!p && typeof DEFAULT_PRODUCTS !== 'undefined') {
        p = DEFAULT_PRODUCTS.find(x => String(x.id) === String(id));
      }
      SocialShare.openModal(p || { id: id });
    },

    openModal: function (product) {
      const p = getActiveProductData(product);
      let overlay = document.getElementById('socialShareModal');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'socialShareModal';
        overlay.className = 'social-share-modal-overlay';
        overlay.innerHTML = `
          <div class="social-share-modal-card" onclick="event.stopPropagation()">
            <div class="share-modal-header">
              <div class="share-modal-title">
                <span>✨</span> Partager avec vos proches
              </div>
              <button type="button" class="share-modal-close" id="closeShareModalBtn" aria-label="Fermer">&times;</button>
            </div>
            <div class="share-modal-product-preview">
              <img src="${p.image}" alt="${p.name}" class="share-modal-thumb" id="shareModalThumb" onerror="this.src='assets/images/products/1.png'">
              <div class="share-modal-info">
                <div class="share-modal-pname" id="shareModalName">${p.name}</div>
                <div class="share-modal-pprice" id="shareModalPrice">${p.price || ''}</div>
              </div>
            </div>
            <div class="share-modal-grid">
              <button type="button" class="share-platform-item" data-platform="whatsapp">
                <div class="share-platform-icon-wrap bg-whatsapp">${ICONS.whatsapp}</div>
                <span class="share-platform-name">WhatsApp</span>
              </button>
              <button type="button" class="share-platform-item" data-platform="facebook">
                <div class="share-platform-icon-wrap bg-facebook">${ICONS.facebook}</div>
                <span class="share-platform-name">Facebook</span>
              </button>
              <button type="button" class="share-platform-item" data-platform="x">
                <div class="share-platform-icon-wrap bg-x">${ICONS.x}</div>
                <span class="share-platform-name">X</span>
              </button>
              <button type="button" class="share-platform-item" data-platform="telegram">
                <div class="share-platform-icon-wrap bg-telegram">${ICONS.telegram}</div>
                <span class="share-platform-name">Telegram</span>
              </button>
              <button type="button" class="share-platform-item" data-platform="native">
                <div class="share-platform-icon-wrap bg-native">${ICONS.native}</div>
                <span class="share-platform-name">Partager</span>
              </button>
            </div>
            <div class="share-modal-link-box">
              <div class="share-modal-link-wrap">
                <input type="text" readonly class="share-modal-link-input" id="shareModalLinkInput" value="${p.url}">
                <button type="button" class="share-modal-copy-btn" id="shareModalCopyBtn">
                  Copier
                </button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => SocialShare.closeModal());
        document.getElementById('closeShareModalBtn').addEventListener('click', () => SocialShare.closeModal());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && overlay.classList.contains('active')) {
            SocialShare.closeModal();
          }
        });

        // Delegate clicks for platforms inside modal
        overlay.querySelectorAll('.share-platform-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            SocialShare.share(platform, overlay._activeProduct);
          });
        });

        document.getElementById('shareModalCopyBtn').addEventListener('click', function () {
          SocialShare.copyLink(overlay._activeProduct, this);
        });
      }

      // Update contents
      overlay._activeProduct = p;
      const thumb = document.getElementById('shareModalThumb');
      if (thumb) thumb.src = p.image;
      const nameEl = document.getElementById('shareModalName');
      if (nameEl) nameEl.textContent = p.name;
      const priceEl = document.getElementById('shareModalPrice');
      if (priceEl) priceEl.textContent = p.price;
      const linkInput = document.getElementById('shareModalLinkInput');
      if (linkInput) linkInput.value = p.url;

      requestAnimationFrame(() => overlay.classList.add('active'));
    },

    closeModal: function () {
      const overlay = document.getElementById('socialShareModal');
      if (overlay) overlay.classList.remove('active');
    }
  };

  function fallbackCopyText(text, callback) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      callback();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  window.SocialShare = SocialShare;

  // Hide native share button on desktop if Web Share is not supported
  document.addEventListener('DOMContentLoaded', () => {
    if (!navigator.share) {
      const nativeBtns = document.querySelectorAll('.share-native');
      nativeBtns.forEach(b => {
        // Keep it accessible as a quick-copy on desktop
        b.title = 'Copier et partager';
      });
    }
  });

})(window, document);
