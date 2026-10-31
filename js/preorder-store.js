/**
 * AMABELLEPEAU — Pre-Order & Recurring Orders Engine
 * Handles small-to-large quantity bulk orders, production lead dates,
 * volume discount tiers, and recurring replenishment subscriptions.
 */
(function(window) {
  'use strict';

  const STORAGE_KEY = 'abp_preorders';

  // Volume discount tiers
  const DISCOUNT_TIERS = [
    { minQty: 100, discount: 0.20, label: 'Tarif Grossiste (-20%)' },
    { minQty: 50,  discount: 0.15, label: 'Volume Élite (-15%)' },
    { minQty: 20,  discount: 0.10, label: 'Club & Revendeur (-10%)' },
    { minQty: 5,   discount: 0.05, label: 'Lot Découverte (-5%)' },
    { minQty: 1,   discount: 0.00, label: 'Tarif Standard' }
  ];

  const DEFAULT_PREORDERS = [
    {
      id: 'PRE-2026-0042',
      date: '2026-10-28',
      productId: 'prod-clarylex-200g',
      productName: 'Savon CLARYLEX (200 g)',
      productImage: 'assets/images/products/savon-clarylex.jpg',
      merchantId: 'ets-marie-andrea',
      merchantName: 'ETS Marie Andrea',
      quantity: 50,
      unitPrice: 4000,
      discountPercent: 15,
      unitPriceDiscounted: 3400,
      totalPrice: 170000,
      depositAmount: 51000,
      deliveryDate: '2026-11-15',
      recurrence: 'monthly',
      recurrenceLabel: 'Mensuelle (Chaque mois)',
      customerName: 'Kouassi Estelle',
      customerPhone: '+225 07 48 22 11 00',
      customerAddress: 'Cocody Riviera 3, Abidjan',
      notes: 'Commande groupée pour salon de beauté & spa. Cure douce garantie.',
      status: 'in_production',
      statusLabel: 'En cours de cure & saponification'
    },
    {
      id: 'PRE-2026-0038',
      date: '2026-10-26',
      productId: 'prod-kit-barbe-amabellebarbe',
      productName: 'Kit Entretien Barbe AMABELLEBARBE Homme',
      productImage: 'assets/images/products/amabellebarbe-kit.jpg',
      merchantId: 'amabellebarbe',
      merchantName: 'AMABELLEBARBE Homme',
      quantity: 20,
      unitPrice: 15000,
      discountPercent: 10,
      unitPriceDiscounted: 13500,
      totalPrice: 270000,
      depositAmount: 81000,
      deliveryDate: '2026-11-08',
      recurrence: 'biweekly',
      recurrenceLabel: 'Toutes les 2 semaines',
      customerName: 'Barbershop Le Barbier d\'Abidjan',
      customerPhone: '+225 05 06 77 88 99',
      customerAddress: 'Marcory Zone 4, Rue du 7 Décembre',
      notes: 'Réassort régulier pour notre clientèle masculine.',
      status: 'pending',
      statusLabel: 'En attente de confirmation'
    }
  ];

  const PreorderStore = {
    getAll: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      this.saveAll(DEFAULT_PREORDERS);
      return DEFAULT_PREORDERS;
    },

    saveAll: function(list) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('abp_preorders_updated', { detail: list }));
        }
      } catch (e) {
        console.warn('PreorderStore saveAll error:', e);
      }
    },

    create: function(data) {
      const all = this.getAll();
      const num = Math.floor(1000 + Math.random() * 9000);
      const preId = 'PRE-' + new Date().getFullYear() + '-' + num;

      const qty = parseInt(data.quantity, 10) || 5;
      const basePrice = parseInt(data.unitPrice, 10) || 4000;
      const tier = this.getTier(qty);

      const discountedUnit = Math.round(basePrice * (1 - tier.discount));
      const total = discountedUnit * qty;
      const deposit = Math.round(total * 0.30); // 30% advance deposit standard in artisanal manufacturing

      const recurrenceLabels = {
        'none': 'Commande unique',
        'biweekly': 'Toutes les 2 semaines (Bi-mensuelle)',
        'monthly': 'Chaque mois (Mensuelle)',
        'quarterly': 'Chaque trimestre (Saisonnière)'
      };

      const newPreorder = {
        id: preId,
        date: new Date().toISOString().split('T')[0],
        productId: data.productId || 'custom',
        productName: data.productName || 'Soins Cosmétiques Artisanaux',
        productImage: data.productImage || 'assets/images/products/1.png',
        merchantId: data.merchantId || 'ets-marie-andrea',
        merchantName: data.merchantName || 'ETS Marie Andrea',
        quantity: qty,
        unitPrice: basePrice,
        discountPercent: Math.round(tier.discount * 100),
        unitPriceDiscounted: discountedUnit,
        totalPrice: total,
        depositAmount: deposit,
        deliveryDate: data.deliveryDate || this.getDefaultLeadDate(7),
        recurrence: data.recurrence || 'none',
        recurrenceLabel: recurrenceLabels[data.recurrence] || 'Commande unique',
        customerName: data.customerName || 'Client Partenaire',
        customerPhone: data.customerPhone || '+225 07 00 00 00 00',
        customerAddress: data.customerAddress || 'Abidjan, Côte d\'Ivoire',
        notes: data.notes || '',
        status: 'pending',
        statusLabel: 'En attente de confirmation'
      };

      all.unshift(newPreorder);
      this.saveAll(all);
      return newPreorder;
    },

    updateStatus: function(id, newStatus) {
      const all = this.getAll();
      const target = all.find(p => p.id === id);
      if (target) {
        target.status = newStatus;
        const labels = {
          'pending': 'En attente de confirmation',
          'in_production': 'En cours de fabrication & cure',
          'ready': 'Prêt pour expédition',
          'completed': 'Livré avec succès'
        };
        target.statusLabel = labels[newStatus] || newStatus;
        this.saveAll(all);
        return target;
      }
      return null;
    },

    getTier: function(qty) {
      for (let i = 0; i < DISCOUNT_TIERS.length; i++) {
        if (qty >= DISCOUNT_TIERS[i].minQty) {
          return DISCOUNT_TIERS[i];
        }
      }
      return DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
    },

    calculateBreakdown: function(unitPrice, quantity) {
      const qty = Math.max(1, parseInt(quantity, 10) || 1);
      const price = Math.max(0, parseInt(unitPrice, 10) || 0);
      const tier = this.getTier(qty);
      const discountedUnit = Math.round(price * (1 - tier.discount));
      const total = discountedUnit * qty;
      const deposit = Math.round(total * 0.30);
      const savings = (price * qty) - total;

      return {
        quantity: qty,
        basePrice: price,
        discountPercent: Math.round(tier.discount * 100),
        tierLabel: tier.label,
        discountedUnit: discountedUnit,
        totalPrice: total,
        depositAmount: deposit,
        savings: savings
      };
    },

    getDefaultLeadDate: function(daysAhead = 7) {
      const d = new Date();
      d.setDate(d.getDate() + daysAhead);
      return d.toISOString().split('T')[0];
    }
  };

  if (typeof window !== 'undefined') {
    window.PreorderStore = PreorderStore;
    window.DISCOUNT_TIERS = DISCOUNT_TIERS;
  }
})(typeof window !== 'undefined' ? window : global);
