/**
 * AMABELLEPEAU — Cart Manager (Unified v5.0)
 * ===========================================
 * LocalStorage-based shopping cart for AMABELLEPEAU.
 * Bridges both 'abp_cart' and 'amabellepeau_cart' keys
 * for 100% interoperability across all storefront pages.
 */

const Cart = (() => {
  const CART_KEY = 'abp_cart';
  const LEGACY_KEY = 'amabellepeau_cart';
  const MAX_QTY  = 99;

  // ── Internal Normalizer ──────────────────────────────────────────
  function normalizeItem(raw) {
    if (!raw) return null;
    const id = raw.id || raw.productId || ('prod-' + Math.random().toString(36).substr(2, 9));
    const name = raw.name || 'Produit AMABELLEPEAU';
    const price = Number(raw.price) || 0;
    const qty = Number(raw.quantity || raw.qty || 1);
    const image = raw.image || raw.imageGradient || 'assets/images/products/1.png';
    const variant = raw.variant || raw.weight || 'Format standard';
    const brand = raw.brand || raw.merchantName || 'AMABELLEPEAU';
    const merchantId = raw.merchantId || 'ets-marie-andrea';

    return {
      id: id,
      productId: id,
      name: name,
      brand: brand,
      merchantId: merchantId,
      merchantName: brand,
      price: price,
      image: image,
      variant: variant,
      weight: variant,
      quantity: Math.max(1, qty),
      qty: Math.max(1, qty)
    };
  }

  // ── Internal Loader ──────────────────────────────────────────────
  function load() {
    let items = [];
    let merchantId = null;

    try {
      const primary = localStorage.getItem(CART_KEY);
      if (primary) {
        const parsed = JSON.parse(primary);
        if (Array.isArray(parsed)) {
          items = parsed.map(normalizeItem).filter(Boolean);
        } else if (parsed && typeof parsed === 'object') {
          merchantId = parsed.merchantId || null;
          if (Array.isArray(parsed.items)) {
            items = parsed.items.map(normalizeItem).filter(Boolean);
          }
        }
      }

      // Check legacy key fallback if primary is empty
      if (items.length === 0) {
        const legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          const parsedLegacy = JSON.parse(legacy);
          if (Array.isArray(parsedLegacy)) {
            items = parsedLegacy.map(normalizeItem).filter(Boolean);
          }
        }
      }
    } catch (e) {
      console.warn('Error reading cart from localStorage', e);
      items = [];
    }

    return { merchantId: merchantId, items: items };
  }

  // ── Internal Saver ──────────────────────────────────────────────
  function save(cartState) {
    const safeState = {
      merchantId: cartState.merchantId || (cartState.items.length > 0 ? (cartState.items[0].merchantId || 'ets-marie-andrea') : null),
      items: (cartState.items || []).map(normalizeItem).filter(Boolean)
    };

    try {
      // Save structured object to abp_cart
      localStorage.setItem(CART_KEY, JSON.stringify(safeState));
      // Save array directly to amabellepeau_cart for legacy pages
      localStorage.setItem(LEGACY_KEY, JSON.stringify(safeState.items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }

    dispatchUpdate(safeState);
  }

  function dispatchUpdate(cartState) {
    try {
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: cartState }));
    } catch (e) {}
    updateCartBadges(cartState);
  }

  function updateCartBadges(cartState) {
    const totalCount = (cartState.items || []).reduce((sum, i) => sum + (i.quantity || i.qty || 1), 0);

    // Target all badge selector variants
    const selectors = [
      '#cartCount',
      '#headerCartCount',
      '#mobileCartCount',
      '.cart-badge-count',
      '.badge-counter',
      '#navCartCount'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.textContent = totalCount;
        if (el.classList.contains('cart-badge-count')) {
          el.style.display = totalCount > 0 ? 'flex' : 'none';
        }
      });
    });
  }

  // ── Public API ───────────────────────────────────────────────────
  return {
    get() {
      return load();
    },

    getItems() {
      return load().items;
    },

    /**
     * Add item to cart.
     * Enforces single-merchant rule if different merchant exists and merchant enforcement is desired.
     */
    add(item) {
      const cart = load();
      const norm = normalizeItem(item);
      if (!norm) return { success: false, message: 'Produit invalide' };

      // Check single-merchant rule (AMABELLEPEAU, ETS Marie Andrea, AMABELLEBARBE belong to same house)
      const allowedHouseMerchants = ['amabellepeau', 'ets-marie-andrea', 'amabellebarbe', 'amafleurdepeau'];
      const isHouseMerchant = allowedHouseMerchants.includes(norm.merchantId);
      const currentIsHouse = !cart.merchantId || allowedHouseMerchants.includes(cart.merchantId);

      if (cart.merchantId && cart.merchantId !== norm.merchantId && !(isHouseMerchant && currentIsHouse)) {
        return {
          success: false,
          reason: 'different_merchant',
          message: 'Votre panier contient des produits d\'un autre marchand indépendant. Finalisez ou videz ce panier avant d\'en changer.'
        };
      }

      cart.merchantId = norm.merchantId;
      const existing = cart.items.find(i => (i.id === norm.id || i.productId === norm.productId) && i.variant === norm.variant);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + norm.quantity, MAX_QTY);
        existing.qty = existing.quantity;
      } else {
        cart.items.push(norm);
      }

      save(cart);
      return { success: true, count: this.count() };
    },

    remove(idOrProductId, variant) {
      const cart = load();
      cart.items = cart.items.filter(i => {
        const matchesId = (i.id === idOrProductId || i.productId === idOrProductId);
        if (!variant) return !matchesId;
        return !(matchesId && i.variant === variant);
      });

      if (cart.items.length === 0) cart.merchantId = null;
      save(cart);
    },

    updateQty(idOrProductId, deltaOrAbsolute, isAbsolute = false) {
      const cart = load();
      const item = cart.items.find(i => (i.id === idOrProductId || i.productId === idOrProductId));
      if (!item) return;

      let newQty;
      if (isAbsolute) {
        newQty = deltaOrAbsolute;
      } else {
        newQty = item.quantity + deltaOrAbsolute;
      }

      if (newQty <= 0) {
        this.remove(idOrProductId);
        return;
      }

      item.quantity = Math.min(newQty, MAX_QTY);
      item.qty = item.quantity;
      save(cart);
    },

    clear() {
      save({ merchantId: null, items: [] });
    },

    count() {
      return load().items.reduce((sum, i) => sum + (i.quantity || i.qty || 1), 0);
    },

    subtotal() {
      return load().items.reduce((sum, i) => sum + (i.price * (i.quantity || i.qty || 1)), 0);
    },

    total(deliveryFee = 0, discount = 0) {
      return Math.max(0, this.subtotal() - discount + deliveryFee);
    },

    isEmpty() {
      return load().items.length === 0;
    },

    init() {
      const cart = load();
      updateCartBadges(cart);
    }
  };
})();

// Initialize on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => Cart.init());
}

if (typeof window !== 'undefined') {
  window.Cart = Cart;
}
