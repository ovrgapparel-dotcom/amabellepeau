/**
 * AMABELLEPEAU - Admin Back-Office Data Store
 * Handles persistence for Merchants, Commissions, Influencer codes, and Orders.
 */

const DEFAULT_MERCHANTS = [
  {
    id: 'merch-marie-andrea',
    name: 'ETS Marie Andrea',
    owner: 'Marie Andrea',
    category: 'Savonnerie Artisanale & Soins',
    commune: 'Cocody Riviera 3, Abidjan',
    phone: '+225 07 09 72 40 96',
    waveNumber: '+225 07 09 72 40 96',
    commissionRate: 15,
    status: 'approved',
    productsCount: 12,
    salesVolume: 3450000,
    isOfficial: true,
    joinedDate: '15 Jan 2026'
  },
  {
    id: 'merch-amabellebarbe',
    name: 'AMABELLEBARBE Homme',
    owner: 'Direction AMABELLEPEAU',
    category: 'Grooming & Soins Barbe',
    commune: 'Marcory Zone 4, Abidjan',
    phone: '+225 07 99 10 81 08',
    waveNumber: '+225 07 99 10 81 08',
    commissionRate: 15,
    status: 'approved',
    productsCount: 4,
    salesVolume: 1850000,
    isOfficial: true,
    joinedDate: '01 Fév 2026'
  },
  {
    id: 'merch-amafleurdepeau',
    name: 'AMAFLEURDEPEAU Rituels',
    owner: 'Direction AMABELLEPEAU',
    category: 'Coffrets Cadeaux & Rituels',
    commune: 'Deux-Plateaux Vallons, Abidjan',
    phone: '+225 07 99 10 81 08',
    waveNumber: '+225 07 99 10 81 08',
    commissionRate: 15,
    status: 'approved',
    productsCount: 3,
    salesVolume: 2200000,
    isOfficial: true,
    joinedDate: '10 Fév 2026'
  },
  {
    id: 'merch-maison-botanique',
    name: 'Maison Botanique',
    owner: 'Koffi Yao',
    category: 'Savonnerie Artisanale',
    commune: 'Cocody Angré, Abidjan',
    phone: '+225 05 44 33 22 11',
    waveNumber: '+225 05 44 33 22 11',
    commissionRate: 15,
    status: 'approved',
    productsCount: 8,
    salesVolume: 1120000,
    isOfficial: false,
    joinedDate: '20 Fév 2026'
  },
  {
    id: 'merch-ivoire-naturals',
    name: 'Ivoire Naturals',
    owner: 'Awa Diop',
    category: 'Soins Éco-certifiés',
    commune: 'Grand-Bassam Littoral',
    phone: '+225 07 11 22 33 44',
    waveNumber: '+225 07 11 22 33 44',
    commissionRate: 15,
    status: 'approved',
    productsCount: 6,
    salesVolume: 890000,
    isOfficial: false,
    joinedDate: '05 Mar 2026'
  },
  {
    id: 'merch-aura-noire',
    name: 'Aura Noire Cosmetics',
    owner: 'Salif Traoré',
    category: 'Beurres Rares d’Afrique',
    commune: 'Marcory Biétry, Abidjan',
    phone: '+225 01 23 45 67 89',
    waveNumber: '+225 01 23 45 67 89',
    commissionRate: 15,
    status: 'approved',
    productsCount: 5,
    salesVolume: 940000,
    isOfficial: false,
    joinedDate: '12 Mar 2026'
  },
  {
    id: 'merch-bioclat-ci',
    name: 'BioÉclat CI',
    owner: 'Gisèle Konan',
    category: 'Botanique & Aloe Vera',
    commune: 'Plateau Centre, Abidjan',
    phone: '+225 07 55 66 77 88',
    waveNumber: '+225 07 55 66 77 88',
    commissionRate: 15,
    status: 'pending',
    productsCount: 4,
    salesVolume: 0,
    isOfficial: false,
    joinedDate: '24 Oct 2026'
  },
  {
    id: 'merch-botanica-sp',
    name: 'Botanica San Pedro',
    owner: 'Éric Beugré',
    category: 'Soins Détox Marins',
    commune: 'San Pedro Ville',
    phone: '+225 05 99 88 77 66',
    waveNumber: '+225 05 99 88 77 66',
    commissionRate: 15,
    status: 'pending',
    productsCount: 3,
    salesVolume: 0,
    isOfficial: false,
    joinedDate: '26 Oct 2026'
  }
];

const DEFAULT_REPRESENTATIVES = [
  {
    id: 'rep-1',
    name: 'Jean-Marc Kouamé',
    zone: 'Abidjan — Cocody & Bingerville',
    phone: '+225 07 89 45 12 00',
    salesCount: 148,
    salesVolume: 3250000,
    rate: 15,
    commissionDue: 487500,
    paidAmount: 350000,
    pendingBalance: 137500,
    status: 'active'
  },
  {
    id: 'rep-2',
    name: 'Estelle Bamba',
    zone: 'Abidjan — Plateau & Marcory',
    phone: '+225 05 12 34 56 78',
    salesCount: 112,
    salesVolume: 2450000,
    rate: 15,
    commissionDue: 367500,
    paidAmount: 300000,
    pendingBalance: 67500,
    status: 'active'
  },
  {
    id: 'rep-3',
    name: 'Ibrahim Cissé',
    zone: 'Abidjan — Yopougon & Attécoubé',
    phone: '+225 01 98 76 54 32',
    salesCount: 84,
    salesVolume: 1680000,
    rate: 15,
    commissionDue: 252000,
    paidAmount: 200000,
    pendingBalance: 52000,
    status: 'active'
  },
  {
    id: 'rep-4',
    name: 'Clarisse N’Goran',
    zone: 'Intérieur — San Pedro & Littoral',
    phone: '+225 07 33 44 55 66',
    salesCount: 65,
    salesVolume: 1320000,
    rate: 15,
    commissionDue: 198000,
    paidAmount: 150000,
    pendingBalance: 48000,
    status: 'active'
  }
];

const DEFAULT_INFLUENCERS = [
  {
    id: 'inf-1',
    code: 'AMABELLE10',
    name: 'Aminata K. (Lifestyle Abidjan)',
    handle: '@aminata_naturelle',
    discountPercent: 10,
    commissionPercent: 5,
    usesCount: 184,
    salesGenerated: 2760000,
    commissionEarned: 138000,
    paidCommission: 100000,
    status: 'active',
    expiresAt: '31 Déc 2026'
  },
  {
    id: 'inf-2',
    code: 'BEARD2026',
    name: 'Moussa Barbe Pro',
    handle: '@moussa_barber',
    discountPercent: 10,
    commissionPercent: 8,
    usesCount: 96,
    salesGenerated: 1440000,
    commissionEarned: 115200,
    paidCommission: 80000,
    status: 'active',
    expiresAt: '31 Déc 2026'
  },
  {
    id: 'inf-3',
    code: 'ANDREA15',
    name: 'Fatou Beauté CI',
    handle: '@fatou_beaute',
    discountPercent: 15,
    commissionPercent: 6,
    usesCount: 142,
    salesGenerated: 1980000,
    commissionEarned: 118800,
    paidCommission: 90000,
    status: 'active',
    expiresAt: '31 Déc 2026'
  },
  {
    id: 'inf-4',
    code: 'FLEUR20',
    name: 'Aïcha Rituels',
    handle: '@aicha_glow',
    discountPercent: 10,
    commissionPercent: 5,
    usesCount: 68,
    salesGenerated: 1020000,
    commissionEarned: 51000,
    paidCommission: 51000,
    status: 'active',
    expiresAt: '15 Nov 2026'
  }
];

const DEFAULT_ORDERS = [
  {
    id: 'AB-1048',
    customerName: 'Mariam Coulibaly',
    phone: '+225 07 88 12 34',
    commune: 'Cocody Angré',
    items: 'Savon CLARYLEX (200 g) x 2, Savon Miel x 1',
    subtotal: 11500,
    deliveryFee: 1500,
    total: 13000,
    paymentMethod: 'wave',
    paymentStatus: 'succeeded',
    orderStatus: 'preparing',
    date: '29 Oct 2026, 13:45',
    merchant: 'ETS Marie Andrea'
  },
  {
    id: 'AB-1047',
    customerName: 'Yapi Kouamé',
    phone: '+225 05 44 22 11',
    commune: 'Marcory Zone 4',
    items: 'Kit Entretien Barbe AMABELLEBARBE x 1',
    subtotal: 15000,
    deliveryFee: 1500,
    total: 16500,
    paymentMethod: 'orange_money',
    paymentStatus: 'succeeded',
    orderStatus: 'out_for_delivery',
    date: '29 Oct 2026, 12:20',
    merchant: 'AMABELLEBARBE Homme'
  },
  {
    id: 'AB-1046',
    customerName: 'Grace Amani',
    phone: '+225 01 23 89 76',
    commune: 'Plateau',
    items: 'Coffret Signature AMAFLEURDEPEAU x 1',
    subtotal: 18000,
    deliveryFee: 1500,
    total: 19500,
    paymentMethod: 'wave',
    paymentStatus: 'succeeded',
    orderStatus: 'delivered',
    date: '29 Oct 2026, 10:15',
    merchant: 'AMAFLEURDEPEAU Rituels'
  },
  {
    id: 'AB-1045',
    customerName: 'Stéphane B.',
    phone: '+225 07 55 11 99',
    commune: 'Yopougon Maroc',
    items: 'Savon Henné & Curcuma x 3',
    subtotal: 10500,
    deliveryFee: 2000,
    total: 12500,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'pending_payment',
    date: '29 Oct 2026, 09:30',
    merchant: 'ETS Marie Andrea'
  },
  {
    id: 'AB-1044',
    customerName: 'Fanta Touré',
    phone: '+225 05 99 33 22',
    commune: 'Riviera Bonoumin',
    items: 'Savon Gel Aloès x 2, Savon Carapa x 1',
    subtotal: 10500,
    deliveryFee: 1500,
    total: 12000,
    paymentMethod: 'wave',
    paymentStatus: 'succeeded',
    orderStatus: 'delivered',
    date: '28 Oct 2026, 16:40',
    merchant: 'ETS Marie Andrea'
  }
];

const AdminStore = {
  // ── Merchants ──
  getMerchants: function() {
    try {
      const s = localStorage.getItem('abp_admin_merchants');
      if (s) return JSON.parse(s);
    } catch(e){}
    localStorage.setItem('abp_admin_merchants', JSON.stringify(DEFAULT_MERCHANTS));
    return DEFAULT_MERCHANTS;
  },
  saveMerchants: function(data) {
    localStorage.setItem('abp_admin_merchants', JSON.stringify(data));
  },
  addMerchant: function(m) {
    const list = this.getMerchants();
    m.id = 'merch-' + Date.now();
    m.joinedDate = 'Aujourd’hui';
    list.unshift(m);
    this.saveMerchants(list);
    return m;
  },
  updateMerchant: function(id, data) {
    const list = this.getMerchants();
    const idx = list.findIndex(m => m.id === id || m.slug === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data };
      this.saveMerchants(list);
    }
    return list;
  },
  updateMerchantStatus: function(id, status) {
    const list = this.getMerchants();
    const item = list.find(m => m.id === id);
    if (item) {
      item.status = status;
      this.saveMerchants(list);
    }
  },
  deleteMerchant: function(id) {
    let list = this.getMerchants().filter(m => m.id !== id);
    this.saveMerchants(list);
    return list;
  },

  // ── Representatives & Commissions ──
  getRepresentatives: function() {
    try {
      const s = localStorage.getItem('abp_admin_representatives');
      if (s) return JSON.parse(s);
    } catch(e){}
    localStorage.setItem('abp_admin_representatives', JSON.stringify(DEFAULT_REPRESENTATIVES));
    return DEFAULT_REPRESENTATIVES;
  },
  saveRepresentatives: function(data) {
    localStorage.setItem('abp_admin_representatives', JSON.stringify(data));
  },
  addRepresentative: function(r) {
    const list = this.getRepresentatives();
    r.id = 'rep-' + Date.now();
    r.salesCount = 0;
    r.salesVolume = 0;
    r.commissionDue = 0;
    r.paidAmount = 0;
    r.pendingBalance = 0;
    r.status = 'active';
    list.unshift(r);
    this.saveRepresentatives(list);
    return r;
  },
  recordPayout: function(repId, amount) {
    const list = this.getRepresentatives();
    const rep = list.find(r => r.id === repId);
    if (rep) {
      rep.paidAmount = (rep.paidAmount || 0) + Number(amount);
      rep.pendingBalance = Math.max(0, (rep.commissionDue || 0) - rep.paidAmount);
      this.saveRepresentatives(list);
      return rep;
    }
    return null;
  },

  // ── Influencers ──
  getInfluencers: function() {
    try {
      const s = localStorage.getItem('abp_admin_influencers');
      if (s) return JSON.parse(s);
    } catch(e){}
    localStorage.setItem('abp_admin_influencers', JSON.stringify(DEFAULT_INFLUENCERS));
    return DEFAULT_INFLUENCERS;
  },
  saveInfluencers: function(data) {
    localStorage.setItem('abp_admin_influencers', JSON.stringify(data));
  },
  addInfluencer: function(inf) {
    const list = this.getInfluencers();
    inf.id = 'inf-' + Date.now();
    inf.usesCount = 0;
    inf.salesGenerated = 0;
    inf.commissionEarned = 0;
    inf.paidCommission = 0;
    inf.status = 'active';
    list.unshift(inf);
    this.saveInfluencers(list);
    return inf;
  },
  deleteInfluencer: function(id) {
    let list = this.getInfluencers().filter(i => i.id !== id);
    this.saveInfluencers(list);
    return list;
  },

  // ── Orders ──
  getOrders: function() {
    try {
      const s = localStorage.getItem('abp_admin_orders');
      if (s) return JSON.parse(s);
    } catch(e){}
    localStorage.setItem('abp_admin_orders', JSON.stringify(DEFAULT_ORDERS));
    return DEFAULT_ORDERS;
  },
  saveOrders: function(data) {
    localStorage.setItem('abp_admin_orders', JSON.stringify(data));
  },
  updateOrderStatus: function(id, status) {
    const list = this.getOrders();
    const ord = list.find(o => o.id === id);
    if (ord) {
      ord.orderStatus = status;
      this.saveOrders(list);
    }
  },

  // ── Promotions, Banners & Short Videos ──
  getPromotions: function() {
    let list = null;
    try {
      const s = localStorage.getItem('abp_admin_promotions');
      if (s) list = JSON.parse(s);
    } catch(e){}

    if (!Array.isArray(list) || list.length === 0) {
      const defaultPromos = [
        {
          id: 'promo-1',
          title: 'Offre Découverte de Bienvenue : -10% sur tout le catalogue',
          subtitle: 'Utilisez le code promo exclusif AMABELLE10 lors de votre commande.',
          type: 'banner', // 'banner', 'video', 'advert'
          mediaUrl: 'assets/images/products/ets-marie-andrea-catalogue.jpg',
          badge: 'Offre Spéciale',
          targetUrl: 'catalogue.html',
          active: true,
          startDate: '2026-10-01',
          endDate: '2026-12-31'
        },
        {
          id: 'promo-2',
          title: 'Spotlight : AMABELLEBARBE Huile 100% Naturelle',
          subtitle: 'Découvrez la vidéo exclusive du rituel d\'entretien de barbe haut de gamme.',
          type: 'video',
          mediaUrl: 'assets/images/products/amabellebarbe-homme.jpg',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-barber-massaging-and-grooming-a-beard-43048-large.mp4',
          badge: 'Vidéo & Démo',
          targetUrl: 'produit.html?id=prod-kit-barbe-amabellebarbe',
          active: true,
          startDate: '2026-10-15',
          endDate: '2026-12-31'
        },
        {
          id: 'promo-3',
          title: 'Coffret Signature AMAFLEURDEPEAU Édition Limitée',
          subtitle: 'L\'alliance du beurre de karité, du miel sauvage et du curcuma d\'exception.',
          type: 'advert',
          mediaUrl: 'assets/images/products/amafleurdepeau-coffret.png',
          badge: 'Édition Prestige',
          targetUrl: 'produit.html?id=prod-coffret-signature',
          active: true,
          startDate: '2026-10-20',
          endDate: '2026-12-31'
        }
      ];
      this.savePromotions(defaultPromos);
      return defaultPromos;
    }

    // Hydrate any images from IndexedDB
    if (typeof ABPStorage !== 'undefined' && ABPStorage.cache) {
      list.forEach(pr => {
        const cached = ABPStorage.getImage('promo_img_' + pr.id);
        if (cached) pr.mediaUrl = cached;
      });
    }

    return list;
  },

  savePromotions: function(data) {
    try {
      if (typeof ABPStorage !== 'undefined') {
        data.forEach(pr => {
          if (pr.mediaUrl && pr.mediaUrl.startsWith('data:')) {
            ABPStorage.setImage('promo_img_' + pr.id, pr.mediaUrl);
          }
        });
        ABPStorage.safeSetItem('abp_admin_promotions', JSON.stringify(data));
      } else {
        localStorage.setItem('abp_admin_promotions', JSON.stringify(data));
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('abp_promotions_updated', { detail: data }));
      }
    } catch (err) {
      console.warn('savePromotions error:', err);
    }
  },

  addPromotion: function(promo) {
    const list = this.getPromotions();
    if (!promo.id) promo.id = 'promo-' + Date.now();
    promo.active = promo.active !== false;
    if (promo.mediaUrl && promo.mediaUrl.startsWith('data:') && typeof ABPStorage !== 'undefined') {
      ABPStorage.setImage('promo_img_' + promo.id, promo.mediaUrl);
    }
    list.unshift(promo);
    this.savePromotions(list);
    return promo;
  },

  updatePromotion: function(id, data) {
    const list = this.getPromotions();
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      if (data.mediaUrl && data.mediaUrl.startsWith('data:') && typeof ABPStorage !== 'undefined') {
        ABPStorage.setImage('promo_img_' + id, data.mediaUrl);
      }
      list[idx] = { ...list[idx], ...data };
      this.savePromotions(list);
    }
    return list;
  },
  deletePromotion: function(id) {
    let list = this.getPromotions().filter(p => p.id !== id);
    this.savePromotions(list);
    return list;
  },
  togglePromotion: function(id) {
    const list = this.getPromotions();
    const p = list.find(x => x.id === id);
    if (p) {
      p.active = !p.active;
      this.savePromotions(list);
    }
    return list;
  },

  // ── Newsletter & VIP Subscribers ──
  getSubscribers: function() {
    try {
      const s = localStorage.getItem('abp_newsletter_subscribers');
      if (s) return JSON.parse(s);
    } catch(e){}
    const defaultSubscribers = [
      {
        id: 'sub-1',
        name: 'Awa Konan',
        email: 'awa.konan@gmail.com',
        phone: '+225 07 48 99 21 00',
        interest: 'Savons dermatologiques & Teint',
        subscribedAt: '28 Oct 2026 14:22',
        status: 'active'
      },
      {
        id: 'sub-2',
        name: 'Jean-Marc Kouassi',
        email: 'jm.kouassi@outlook.com',
        phone: '+225 05 01 22 34 56',
        interest: 'Soins Barbe & Homme (AMABELLEBARBE)',
        subscribedAt: '27 Oct 2026 09:15',
        status: 'active'
      },
      {
        id: 'sub-3',
        name: 'Fatou Bamba',
        email: 'fatoubamba.ci@yahoo.fr',
        phone: '+225 01 44 88 12 30',
        interest: 'Coffrets Rituels & Cadeaux',
        subscribedAt: '26 Oct 2026 18:40',
        status: 'active'
      }
    ];
    localStorage.setItem('abp_newsletter_subscribers', JSON.stringify(defaultSubscribers));
    return defaultSubscribers;
  },
  saveSubscribers: function(data) {
    localStorage.setItem('abp_newsletter_subscribers', JSON.stringify(data));
  },
  addSubscriber: function(sub) {
    const list = this.getSubscribers();
    // Check duplicate by email
    const existing = list.find(s => s.email.toLowerCase() === sub.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'Cette adresse email est déjà inscrite à notre Cercle Beauté.' };
    }
    sub.id = 'sub-' + Date.now();
    sub.subscribedAt = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    sub.status = 'active';
    list.unshift(sub);
    this.saveSubscribers(list);
    return { success: true, subscriber: sub };
  },
  deleteSubscriber: function(id) {
    let list = this.getSubscribers().filter(s => s.id !== id);
    this.saveSubscribers(list);
    return list;
  }
};

if (typeof window !== 'undefined') {
  window.AdminStore = AdminStore;
}
