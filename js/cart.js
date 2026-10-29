/**
 * AMABELLEPEAU — Cart Manager
 * ===========================
 * LocalStorage-based shopping cart for the MVP.
 * One merchant per cart (enforced).
 */

const Cart = (() => {
  const CART_KEY = 'abp_cart';
  const MAX_QTY  = 99;

  // ── Internal helpers ─────────────────────────────────────────
  function load() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || { merchantId: null, items: [] };
    } catch { return { merchantId: null, items: [] }; }
  }

  function save(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchUpdate(cart);
  }

  function dispatchUpdate(cart) {
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    updateCartBadge(cart);
  }

  function updateCartBadge(cart) {
    const count = cart.items.reduce((sum, i) => sum + i.qty, 0);
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ── Public API ────────────────────────────────────────────────
  return {
    get() { return load(); },

    /**
     * Add item to cart. Enforces single-merchant rule.
     * @returns {boolean} success
     */
    add(item) {
      const cart = load();
      const { merchantId, productId, name, price, image, variant, qty = 1 } = item;

      // Enforce single-merchant rule
      if (cart.merchantId && cart.merchantId !== merchantId) {
        return { success: false, reason: 'different_merchant', message: 'Votre panier contient des produits d\'un autre marchand. Videz le panier pour ajouter ce produit.' };
      }

      cart.merchantId = merchantId;
      const existing = cart.items.find(i => i.productId === productId && i.variant === variant);

      if (existing) {
        existing.qty = Math.min(existing.qty + qty, MAX_QTY);
      } else {
        cart.items.push({ productId, merchantId, name, price, image, variant, qty });
      }

      save(cart);
      return { success: true };
    },

    remove(productId, variant) {
      const cart = load();
      cart.items = cart.items.filter(i => !(i.productId === productId && i.variant === variant));
      if (cart.items.length === 0) cart.merchantId = null;
      save(cart);
    },

    updateQty(productId, variant, qty) {
      const cart = load();
      const item = cart.items.find(i => i.productId === productId && i.variant === variant);
      if (item) {
        if (qty <= 0) {
          this.remove(productId, variant);
          return;
        }
        item.qty = Math.min(qty, MAX_QTY);
      }
      save(cart);
    },

    clear() {
      save({ merchantId: null, items: [] });
    },

    count() {
      return load().items.reduce((sum, i) => sum + i.qty, 0);
    },

    subtotal() {
      return load().items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    total(deliveryFee = 0) {
      return this.subtotal() + deliveryFee;
    },

    isEmpty() {
      return load().items.length === 0;
    },

    init() {
      const cart = load();
      updateCartBadge(cart);
    }
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => Cart.init());
