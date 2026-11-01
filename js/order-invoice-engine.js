/**
 * AMABELLEPEAU — Three-Way Order & Branded Invoice Engine (v1.0)
 * ===============================================================
 * Coordinates 3-way order confirmations (Customer, Merchant, Admin)
 * via WhatsApp & Email, and generates luxury branded PDF invoices
 * with live lifecycle status (Paiement Reçu, En Attente, Expédiée, Livrée).
 */
(function(window) {
  'use strict';

  const STORAGE_KEY = 'abp_admin_orders';
  const ADMIN_PHONE = '+2250799108108';
  const ADMIN_EMAIL = 'contact@amabellepeau.ci';

  // Merchant directory for routing alerts
  const MERCHANT_DIRECTORY = {
    'ets-marie-andrea': {
      id: 'merch-marie-andrea',
      name: 'ETS Marie Andrea',
      owner: 'Marie Andrea',
      phone: '+2250709724096',
      email: 'marieandrea.cosmetics@gmail.com',
      commune: 'Cocody Riviera 3, Abidjan'
    },
    'amabellebarbe': {
      id: 'merch-amabellebarbe',
      name: 'AMABELLEBARBE Homme',
      owner: 'Direction AMABELLEPEAU',
      phone: '+2250799108108',
      email: 'contact@amabellebarbe.ci',
      commune: 'Marcory Zone 4, Abidjan'
    },
    'amafleurdepeau': {
      id: 'merch-amafleurdepeau',
      name: 'AMAFLEURDEPEAU Rituels',
      owner: 'Fatou K.',
      phone: '+2250544221199',
      email: 'rituels@amafleurdepeau.ci',
      commune: 'Plateau & Cocody, Abidjan'
    }
  };

  // Status definitions with labels, colors, and badges
  const ORDER_STATUSES = {
    payment_received: {
      key: 'payment_received',
      label: 'Paiement Reçu',
      shortDesc: 'Paiement validé avec succès via Mobile Money',
      badgeClass: 'badge-success',
      color: '#1B4D1E',
      icon: '✅',
      customerNote: 'Votre paiement a été reçu et validé avec succès. Notre atelier prépare soigneusement vos produits.'
    },
    order_pending: {
      key: 'order_pending',
      label: 'Commande En Attente',
      shortDesc: 'En attente de validation ou règlement',
      badgeClass: 'badge-warning',
      color: '#D4A017',
      icon: '⏳',
      customerNote: 'Votre commande a bien été enregistrée. Elle est en cours de validation auprès de notre service logistique.'
    },
    order_shipped: {
      key: 'order_shipped',
      label: 'Commande Expédiée',
      shortDesc: 'Colis confié au coursier en cours d\'acheminement',
      badgeClass: 'badge-info',
      color: '#2980B9',
      icon: '🛵',
      customerNote: 'Excellente nouvelle ! Votre colis est en cours de livraison par notre coursier à Abidjan.'
    },
    order_delivered: {
      key: 'order_delivered',
      label: 'Commande Livrée',
      shortDesc: 'Colis remis en main propre au destinataire',
      badgeClass: 'badge-purple',
      color: '#8E44AD',
      icon: '✨',
      customerNote: 'Votre colis vous a été remis en main propre. Nous vous remercions pour votre confiance en AMABELLEPEAU.'
    }
  };

  const OrderInvoiceEngine = {
    STATUSES: ORDER_STATUSES,
    MERCHANTS: MERCHANT_DIRECTORY,

    /**
     * Retrieves all orders from storage.
     */
    getAllOrders: function() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}

      if (typeof AdminStore !== 'undefined' && typeof AdminStore.getOrders === 'function') {
        return AdminStore.getOrders();
      }
      return [];
    },

    /**
     * Saves order list to storage.
     */
    saveOrders: function(orders) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
          window.dispatchEvent(new CustomEvent('abp_orders_updated', { detail: orders }));
        }
      } catch (e) {
        console.error('OrderInvoiceEngine: Failed to save orders', e);
      }
    },

    /**
     * Gets an order by its ID or reference number.
     */
    getOrderById: function(id) {
      if (!id) return null;
      const cleanId = String(id).trim().toUpperCase();
      const list = this.getAllOrders();
      const found = list.find(o => String(o.id).toUpperCase() === cleanId || String(o.orderNumber || '').toUpperCase() === cleanId);
      if (found) return found;

      // Fallback check in pendingOrder
      try {
        const pending = localStorage.getItem('pendingOrder');
        if (pending) {
          const p = JSON.parse(pending);
          if (String(p.orderNumber || p.id || '').toUpperCase() === cleanId) {
            return p;
          }
        }
      } catch (e) {}

      return null;
    },

    /**
     * Creates and registers a new customer order.
     * Integrates with AdminStore and Merchant views.
     */
    createOrder: function(orderPayload) {
      const orders = this.getAllOrders();

      const orderNumber = orderPayload.orderNumber || `ABP-${Date.now().toString(36).toUpperCase()}`;
      const now = new Date();
      const dateStr = now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Default status resolution
      let statusKey = 'order_pending';
      if (orderPayload.paymentMethod === 'wave' || orderPayload.paymentMethod === 'orangeMoney' || orderPayload.paymentStatus === 'succeeded') {
        statusKey = 'payment_received';
      }

      // Format items string if items is an array
      const itemsList = Array.isArray(orderPayload.items) ? orderPayload.items : [];
      const itemsText = itemsList.map(it => `${it.name} (x${it.qty || it.quantity || 1})`).join(', ') || orderPayload.itemsText || 'Articles cosmétiques bio';

      // Identify primary merchant
      let primaryMerchant = 'ETS Marie Andrea';
      let primaryMerchantSlug = 'ets-marie-andrea';
      if (itemsList.length > 0 && itemsList[0].merchant) {
        primaryMerchant = itemsList[0].merchant;
        primaryMerchantSlug = itemsList[0].merchantId || 'ets-marie-andrea';
      }

      const newOrder = {
        id: orderNumber,
        orderNumber: orderNumber,
        date: dateStr,
        createdAt: now.toISOString(),
        customerName: orderPayload.customerName || 'Client AMABELLEPEAU',
        phone: orderPayload.phone || '',
        email: orderPayload.email || '',
        commune: orderPayload.commune || orderPayload.address || 'Abidjan',
        address: orderPayload.address || orderPayload.commune || 'Abidjan, Côte d\'Ivoire',
        landmark: orderPayload.landmark || '',
        deliveryMethod: orderPayload.deliveryMethod || 'Livraison Standard Abidjan (24-48h)',
        deliveryFee: Number(orderPayload.deliveryFee) || 1500,
        subtotal: Number(orderPayload.subtotal) || Number(orderPayload.total) - 1500,
        discount: Number(orderPayload.discount) || 0,
        total: Number(orderPayload.total) || 0,
        paymentMethod: orderPayload.paymentMethod || 'wave',
        paymentLabel: orderPayload.paymentLabel || 'Mobile Money',
        paymentStatus: statusKey === 'payment_received' ? 'succeeded' : 'pending',
        orderStatus: statusKey,
        merchant: primaryMerchant,
        merchantSlug: primaryMerchantSlug,
        items: itemsText,
        rawItems: itemsList,
        notes: orderPayload.notes || ''
      };

      // Add to front of order list (most recent first)
      const existingIdx = orders.findIndex(o => o.id === orderNumber);
      if (existingIdx > -1) {
        orders[existingIdx] = Object.assign({}, orders[existingIdx], newOrder);
      } else {
        orders.unshift(newOrder);
      }

      this.saveOrders(orders);

      // Keep latest order reference for instant invoice viewing
      try {
        localStorage.setItem('abp_latest_order', JSON.stringify(newOrder));
      } catch (e) {}

      return newOrder;
    },

    /**
     * Updates an order's lifecycle status.
     * Returns the updated order object.
     */
    updateOrderStatus: function(id, newStatusKey) {
      const orders = this.getAllOrders();
      const order = orders.find(o => o.id === id || o.orderNumber === id);
      if (!order) return null;

      order.orderStatus = newStatusKey;
      if (newStatusKey === 'payment_received') {
        order.paymentStatus = 'succeeded';
      }
      order.updatedAt = new Date().toISOString();

      this.saveOrders(orders);
      return order;
    },

    /**
     * Formats XOF amount.
     */
    formatXOF: function(amount) {
      const val = Number(amount) || 0;
      return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        maximumFractionDigits: 0
      }).format(val) + ' XOF';
    },

    /**
     * Resolves absolute URL for the invoice.
     */
    getInvoiceUrl: function(orderId) {
      if (typeof window !== 'undefined') {
        const origin = window.location.origin;
        return `${origin}/facture.html?id=${encodeURIComponent(orderId)}`;
      }
      return `https://amabellepeau.vercel.app/facture.html?id=${encodeURIComponent(orderId)}`;
    },

    /**
     * ── 1. CUSTOMER NOTIFICATIONS (WhatsApp & Email) ──
     */
    buildCustomerWhatsAppMessage: function(order) {
      const statusObj = ORDER_STATUSES[order.orderStatus] || ORDER_STATUSES.payment_received;
      const invoiceUrl = this.getInvoiceUrl(order.id);

      return `🌿 *AMABELLEPEAU — VOTRE FACTURE & CONFIRMATION DE COMMANDE*
----------------------------------------
Bonjour *${order.customerName}*, merci pour votre confiance !
Votre commande *${order.id}* est enregistrée.

📌 *Statut actuel :* ${statusObj.icon} *${statusObj.label.toUpperCase()}*
💡 _${statusObj.customerNote}_

💰 *Total réglé :* ${this.formatXOF(order.total)}
💳 *Moyen de paiement :* ${order.paymentLabel || order.paymentMethod}
🚚 *Livraison :* ${order.commune} (${order.address})

📦 *Articles commandés :*
${this._formatItemsForMessage(order)}

📄 *Votre Facture Officielle PDF :*
👉 ${invoiceUrl}
_(Cliquez sur le lien pour afficher ou imprimer votre facture au format PDF)_

Pour toute question, répondez directement à ce message WhatsApp.
*AMABELLEPEAU — Savons Naturels & Cosmétiques d'Abidjan* ✨`;
    },

    buildCustomerWhatsAppUrl: function(order) {
      const phone = (order.phone || '').replace(/[^0-9]/g, '');
      const msg = this.buildCustomerWhatsAppMessage(order);
      if (phone) {
        return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      }
      // Fallback: opens chat with customer prefilled message
      return `https://wa.me/?text=${encodeURIComponent(msg)}`;
    },

    buildCustomerEmailMailto: function(order) {
      const statusObj = ORDER_STATUSES[order.orderStatus] || ORDER_STATUSES.payment_received;
      const invoiceUrl = this.getInvoiceUrl(order.id);
      const subject = `[AMABELLEPEAU] Facture et Confirmation de Commande ${order.id} — ${statusObj.label}`;
      const body = `Bonjour ${order.customerName},

Nous vous confirmons la bonne prise en compte de votre commande ${order.id}.

STATUT DE LA COMMANDE : ${statusObj.label.toUpperCase()}
${statusObj.customerNote}

RÉCAPITULATIF DE LA COMMANDE :
------------------------------------------------
Référence : ${order.id}
Date : ${order.date}
Client : ${order.customerName}
Téléphone : ${order.phone}
Adresse de livraison : ${order.address} (${order.commune})

ARTICLES :
${order.items}

MONTANT TOTAL : ${this.formatXOF(order.total)}
Paiement : ${order.paymentLabel || order.paymentMethod}

CONSULTER ET TÉLÉCHARGER VOTRE FACTURE PDF :
${invoiceUrl}

Nous vous remercions pour votre fidélité.

Cordialement,
L'équipe AMABELLEPEAU
Abidjan, Côte d'Ivoire
Tél : +225 07 99 10 81 08
https://amabellepeau.vercel.app`;

      const to = order.email ? encodeURIComponent(order.email) : '';
      return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },

    /**
     * ── 2. MERCHANT NOTIFICATIONS (WhatsApp & Email) ──
     */
    buildMerchantWhatsAppMessage: function(order) {
      const statusObj = ORDER_STATUSES[order.orderStatus] || ORDER_STATUSES.payment_received;
      const invoiceUrl = this.getInvoiceUrl(order.id);
      const merchantObj = MERCHANT_DIRECTORY[order.merchantSlug] || MERCHANT_DIRECTORY['ets-marie-andrea'];

      return `🚨 *NOUVELLE COMMANDE MARCHAND — AMABELLEPEAU*
----------------------------------------
À l'attention de : *${merchantObj.name}*
Une nouvelle commande a été attribuée à votre enseigne !

📦 *Réf Commande :* ${order.id}
📅 *Date :* ${order.date}
📌 *Statut :* ${statusObj.icon} *${statusObj.label.toUpperCase()}*

👤 *Client :* ${order.customerName}
📱 *Téléphone :* ${order.phone}
📍 *Livraison :* ${order.address} (${order.commune})

🛒 *Articles à préparer :*
${this._formatItemsForMessage(order)}

💰 *Montant Total :* ${this.formatXOF(order.total)}
💳 *Règlement :* ${order.paymentLabel || order.paymentMethod}

📄 *Consulter le Bon de Commande / Facture PDF :*
👉 ${invoiceUrl}

Merci de lancer le conditionnement du colis dès réception.
*AMABELLEPEAU Merchant Hub* 🌿`;
    },

    buildMerchantWhatsAppUrl: function(order) {
      const merchantObj = MERCHANT_DIRECTORY[order.merchantSlug] || MERCHANT_DIRECTORY['ets-marie-andrea'];
      const phone = (merchantObj.phone || '').replace(/[^0-9]/g, '');
      const msg = this.buildMerchantWhatsAppMessage(order);
      return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    },

    buildMerchantEmailMailto: function(order) {
      const merchantObj = MERCHANT_DIRECTORY[order.merchantSlug] || MERCHANT_DIRECTORY['ets-marie-andrea'];
      const statusObj = ORDER_STATUSES[order.orderStatus] || ORDER_STATUSES.payment_received;
      const invoiceUrl = this.getInvoiceUrl(order.id);
      const subject = `[ALERTE MARCHAND] Nouvelle commande ${order.id} attribuée à ${merchantObj.name}`;
      const body = `Bonjour ${merchantObj.owner || merchantObj.name},

Une nouvelle commande a été enregistrée sur AMABELLEPEAU pour vos produits.

RÉFÉRENCE : ${order.id}
STATUT : ${statusObj.label.toUpperCase()}

DÉTAILS CLIENT :
Nom : ${order.customerName}
Téléphone : ${order.phone}
Destination : ${order.address} (${order.commune})

ARTICLES À PRÉPARER :
${order.items}

TOTAL COMMANDE : ${this.formatXOF(order.total)}

ACCÉDER À LA FACTURE & BON DE PRÉPARATION :
${invoiceUrl}

Veuillez confirmer la disponibilité et préparer le paquet pour le coursier.

AMABELLEPEAU Marchands
https://amabellepeau.vercel.app/marchand/index.html`;

      return `mailto:${encodeURIComponent(merchantObj.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },

    /**
     * ── 3. ADMIN NOTIFICATIONS (WhatsApp & Email) ──
     */
    buildAdminWhatsAppMessage: function(order) {
      const statusObj = ORDER_STATUSES[order.orderStatus] || ORDER_STATUSES.payment_received;
      const invoiceUrl = this.getInvoiceUrl(order.id);

      return `🔔 *CENTRE DE CONTRÔLE AMABELLEPEAU — NOUVELLE COMMANDE*
----------------------------------------
Réf : *${order.id}*
Date : ${order.date}
Marchand assigné : *${order.merchant}*

📌 *Statut :* ${statusObj.icon} *${statusObj.label.toUpperCase()}*
💰 *Montant :* ${this.formatXOF(order.total)} (Sous-total: ${this.formatXOF(order.subtotal)} + Livraison: ${this.formatXOF(order.deliveryFee)})
💳 *Paiement :* ${order.paymentLabel || order.paymentMethod} (${order.paymentStatus})

👤 *Client :* ${order.customerName} (${order.phone})
📍 *Zone de livraison :* ${order.commune} — ${order.address}

📦 *Panier :*
${order.items}

📄 *Facture Officielle :*
👉 ${invoiceUrl}

⚙️ *Tableau de bord Admin :*
https://amabellepeau.vercel.app/admin/index.html#orders`;
    },

    buildAdminWhatsAppUrl: function(order) {
      const msg = this.buildAdminWhatsAppMessage(order);
      const phone = ADMIN_PHONE.replace(/[^0-9]/g, '');
      return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    },

    buildAdminEmailMailto: function(order) {
      const statusObj = ORDER_STATUSES[order.orderStatus] || ORDER_STATUSES.payment_received;
      const invoiceUrl = this.getInvoiceUrl(order.id);
      const subject = `[ADMIN NOTIFICATION] Nouvelle commande ${order.id} — ${this.formatXOF(order.total)} (${statusObj.label})`;
      const body = `Notification Administrateur AMABELLEPEAU

Une nouvelle commande a été enregistrée :

RÉFÉRENCE : ${order.id}
DATE : ${order.date}
MARCHAND : ${order.merchant}
STATUT : ${statusObj.label}

CLIENT :
${order.customerName} - ${order.phone}
${order.address} (${order.commune})

PANIER :
${order.items}

FINANCIER :
Sous-total : ${this.formatXOF(order.subtotal)}
Livraison : ${this.formatXOF(order.deliveryFee)}
Total encaissé : ${this.formatXOF(order.total)}
Méthode : ${order.paymentLabel}

FACTURE EN LIGNE :
${invoiceUrl}

Consulter le tableau de bord :
https://amabellepeau.vercel.app/admin/index.html`;

      return `mailto:${encodeURIComponent(ADMIN_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },

    /**
     * ── 4. LIFECYCLE STATUS UPDATE NOTIFICATION ──
     * Generates customer WhatsApp message when status transitions (e.g. to Expédiée / Shipped).
     */
    buildStatusUpdateWhatsAppUrl: function(order, newStatusKey) {
      const statusObj = ORDER_STATUSES[newStatusKey] || ORDER_STATUSES.order_shipped;
      const invoiceUrl = this.getInvoiceUrl(order.id);
      const phone = (order.phone || '').replace(/[^0-9]/g, '');

      const msg = `🌿 *AMABELLEPEAU — SUIVI DE VOTRE COMMANDE ${order.id}*
----------------------------------------
Bonjour *${order.customerName}*,

Votre commande est passée au statut :
${statusObj.icon} *${statusObj.label.toUpperCase()}*

💡 _${statusObj.customerNote}_

📍 *Adresse de livraison :* ${order.address} (${order.commune})
💰 *Total :* ${this.formatXOF(order.total)}

📄 *Votre Facture à jour :*
👉 ${invoiceUrl}

Merci pour votre confiance,
*AMABELLEPEAU — Excellence Cosmétique d'Abidjan* ✨`;

      if (phone) {
        return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      }
      return `https://wa.me/?text=${encodeURIComponent(msg)}`;
    },

    // Internal helper
    _formatItemsForMessage: function(order) {
      if (Array.isArray(order.rawItems) && order.rawItems.length > 0) {
        return order.rawItems.map(it => `• ${it.name} (x${it.qty || it.quantity || 1}) — ${this.formatXOF((it.price || 0) * (it.qty || it.quantity || 1))}`).join('\n');
      }
      return `• ${order.items || 'Articles cosmétiques bio'}`;
    }
  };

  // Export
  if (typeof window !== 'undefined') {
    window.OrderInvoiceEngine = OrderInvoiceEngine;
  }
  if (typeof module !== 'undefined') {
    module.exports = OrderInvoiceEngine;
  }
})(typeof window !== 'undefined' ? window : global);
