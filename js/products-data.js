/**
 * AMABELLEPEAU - Master Catalog Store
 * Real product data curated from ETS Marie Andrea, AMABELLEBARBE & AMAFLEURDEPEAU
 * Equipped with high-definition official studio product photography
 */

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-clarylex-200g',
    name: 'Savon CLARYLEX (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-specifiques',
    categoryName: 'Soins Spécifiques & Teint',
    price: 4000,
    oldPrice: 5000,
    badge: 'Bestseller Signature',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 142,
    stock: 85,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Acides de fruits naturels (AHA), Parfum.',
    vertus: 'Clarifiant Suprême, Nettoyant en profondeur, Éclat du teint, Anti-rides, Régénérant cellulaire.',
    skinType: 'Teint noir, teint métis — Uniformisation & éclat instantané.',
    image: 'assets/images/products/savon-clarylex.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-henne-curcuma-200g',
    name: 'Savon Henné & Curcuma (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 3500,
    oldPrice: null,
    badge: 'Favori Teint',
    badgeClass: 'badge-bestseller',
    rating: 4.9,
    reviews: 98,
    stock: 120,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Henné pur, Curcuma en poudre, Parfum.',
    vertus: 'Exfoliant doux, Gommant naturel, Clarifiant, Nettoyant séborégulateur.',
    skinType: 'Teint noir & marron — Anti-taches et éclat naturel.',
    image: 'assets/images/products/savon-henne-curcuma.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-gel-aloes-200g',
    name: 'Savon Gel Aloès (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 3500,
    oldPrice: null,
    badge: 'Purifiant',
    badgeClass: 'badge-new',
    rating: 4.8,
    reviews: 76,
    stock: 95,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Gel d’aloès vera frais, Parfum.',
    vertus: 'Clarifiant, Exfoliant délicat, Anti-acné, Raffermissant, Tonique vivifiant.',
    skinType: 'Peaux mixtes à grasses, peaux sensibles à imperfections.',
    image: 'assets/images/products/savon-gel-aloes.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-carapa-200g',
    name: 'Savon au Carapa (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-dermatologiques',
    categoryName: 'Soins Dermatologiques',
    price: 3500,
    oldPrice: null,
    badge: 'Dermatologique',
    badgeClass: 'badge-promo',
    rating: 4.9,
    reviews: 64,
    stock: 60,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Huile pure de Carapa, Parfum.',
    vertus: 'Exfoliant, Clarifiant, Anti-acné puissant, Antiseptique, Nettoyant apaisant.',
    skinType: 'Peaux à problèmes, dermatoses, démangeaisons, boutons.',
    image: 'assets/images/products/savon-carapa.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-tetrapleura-200g',
    name: 'Savon au Tétrapéla (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 3500,
    oldPrice: null,
    badge: 'Traditionnel',
    badgeClass: 'badge-new',
    rating: 4.7,
    reviews: 42,
    stock: 50,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Poudre de Tétrapleura (4 côtés), Parfum.',
    vertus: 'Exfoliant, Nettoyant doux, Anti-taches pigmentaires, Resserre les pores.',
    skinType: 'Tous types de peau — Uniformisation du grain de peau.',
    image: 'assets/images/products/savon-tetrapela.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-carotte-200g',
    name: 'Savon à la Carotte (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-specifiques',
    categoryName: 'Soins Spécifiques & Teint',
    price: 3500,
    oldPrice: null,
    badge: 'Bonne Mine',
    badgeClass: 'badge-bestseller',
    rating: 4.8,
    reviews: 83,
    stock: 110,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Poudre de carotte, Curcuma, Acides de fruits, Parfum.',
    vertus: 'Clarifiant, Nettoyant doux, Éclat du teint, Éclaircissant naturel velouté.',
    skinType: 'Teint terne, peaux noires & métisses, uniformisation éclatante.',
    image: 'assets/images/products/savon-carotte.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-karite-brut-200g',
    name: 'Savon Beurre de Karité (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 3500,
    oldPrice: null,
    badge: '100% Brut',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 135,
    stock: 140,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Pur beurre de karité bio de Korhogo, Parfum délicat.',
    vertus: 'Hydratant suprême, Nettoyant surgras, Émollient, Barrière protectrice cutanée.',
    skinType: 'Peaux sèches, très sèches & abîmées. Convient aux bébés et peaux sensibles.',
    image: 'assets/images/products/savon-beurre-karite.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-miel-pur-200g',
    name: 'Savon au Miel (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 3500,
    oldPrice: null,
    badge: 'Douceur Miel',
    badgeClass: 'badge-new',
    rating: 4.9,
    reviews: 67,
    stock: 80,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Karité, Miel naturel des savanes, Parfum.',
    vertus: 'Hydratant profond, Nettoyant cicatrisant, Éclat du teint, Anti-taches et antifongique.',
    skinType: 'Peaux déshydratées, sensibles ou réactives.',
    image: 'assets/images/products/savon-miel.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-cacao-200g',
    name: 'Savon au Beurre de Cacao (200 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 3500,
    oldPrice: null,
    badge: 'Anti-Vergetures',
    badgeClass: 'badge-new',
    rating: 4.8,
    reviews: 31,
    stock: 65,
    status: 'in_stock',
    weight: '200 g',
    composition: 'Palmiste, Pur beurre de cacao brut d’Afrique de l’Ouest, Parfum.',
    vertus: 'Hydratant profond, nettoyant élastifiant, prévention des vergetures, anti-âge.',
    skinType: 'Peaux sèches & abîmées, femmes enceintes, peaux matures.',
    image: 'assets/images/products/savon-beurre-cacao.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-huile-carapa-100ml',
    name: 'Huile de Carapa Pure (100 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'huiles-naturelles',
    categoryName: 'Huiles Végétales & Sérums',
    price: 6500,
    oldPrice: 8000,
    badge: 'Soin Précieux',
    badgeClass: 'badge-new',
    rating: 4.9,
    reviews: 54,
    stock: 70,
    status: 'in_stock',
    weight: '100 ml',
    composition: 'Huile vierge pure de Carapa procera obtenue par première pression à froid.',
    vertus: 'Anti-inflammatoire, cicatrisante, antiseptique puissant, soulage les rhumatismes et dermatoses, anti-moustiques naturel.',
    skinType: 'Peaux à problèmes, eczéma, psoriasis, démangeaisons, douleurs musculaires.',
    image: 'assets/images/products/huile-carapa.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-huile-safou-100ml',
    name: 'Huile de Safou (100 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'huiles-naturelles',
    categoryName: 'Huiles Végétales & Sérums',
    price: 8500,
    oldPrice: 10000,
    badge: 'Élixir Régénérant',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 68,
    stock: 60,
    status: 'in_stock',
    weight: '100 ml',
    composition: 'Huile extra-vierge de Safou (Dacryodes edulis) riche en acides gras essentiels, vitamines C et E.',
    vertus: 'Régénérante cellulaire, antioxydante d\'exception, anti-âge, nourrit intensément et redonne souplesse à l\'épiderme.',
    skinType: 'Peaux matures, peaux déshydratées, cheveux secs et dévitalisés.',
    image: 'assets/images/products/huile-safou.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-huile-baobab-100ml',
    name: 'Huile Précieuse de Baobab (100 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'huiles-naturelles',
    categoryName: 'Huiles Végétales & Sérums',
    price: 9500,
    oldPrice: 12000,
    badge: 'Arbre de Vie',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 82,
    stock: 55,
    status: 'in_stock',
    weight: '100 ml',
    composition: '100% pure huile vierge de graines de Baobab sauvage d\'Afrique de l\'Ouest (Adansonia digitata).',
    vertus: 'Cicatrisante, assouplissante, régénératrice des tissus, anti-vergetures, protège la barrière lipidique.',
    skinType: 'Peaux très sèches, irritées, cicatrices, vergetures et pointes capillaires abîmées.',
    image: 'assets/images/products/huile-baobab.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-amabellebarbe-kit',
    name: 'Kit Entretien Barbe AMABELLEBARBE',
    brand: 'AMABELLEBARBE',
    merchant: 'AMABELLEBARBE Homme',
    category: 'barbe-homme',
    categoryName: 'Soins Barbe & Homme',
    price: 15000,
    oldPrice: 18000,
    badge: 'Coffret Prestige Homme',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 89,
    stock: 35,
    status: 'in_stock',
    weight: 'Kit 5 pièces',
    composition: 'Huile à barbe 100% naturelle (50 ml) + Savon CLARYLEX (200 g) + Brosse en poil de sanglier + Peigne en corne véritable + Pochon kraft chic.',
    vertus: 'Stimule la pousse, densifie la toison, brillance et vigueur, élimine les démangeaisons sous barbe.',
    skinType: 'Tous types de barbes et épidermes masculins.',
    image: 'assets/images/products/amabellebarbe-kit.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-amabellebarbe-huile',
    name: 'Huile de Barbe AMABELLEBARBE (50 ml)',
    brand: 'AMABELLEBARBE',
    merchant: 'AMABELLEBARBE Homme',
    category: 'barbe-homme',
    categoryName: 'Soins Barbe & Homme',
    price: 7500,
    oldPrice: null,
    badge: '100% Végétale',
    badgeClass: 'badge-new',
    rating: 4.9,
    reviews: 52,
    stock: 70,
    status: 'in_stock',
    weight: '50 ml',
    composition: 'Beurre de karité liquide, huile de ricin, macérât de miel et aloès, essences rares.',
    vertus: 'Stimule la croissance des poils, offre brillance et vigueur sans graisser.',
    skinType: 'Barbes courtes, moyennes ou drues.',
    image: 'assets/images/products/amabellebarbe-homme.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-amafleurdepeau-coffret',
    name: 'Coffret Signature AMAFLEURDEPEAU',
    brand: 'AMAFLEURDEPEAU',
    merchant: 'AMAFLEURDEPEAU Rituels',
    category: 'coffrets-cadeaux',
    categoryName: 'Coffrets Cadeaux & Rituels',
    price: 18000,
    oldPrice: 22000,
    badge: 'Édition Luxe',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 73,
    stock: 25,
    status: 'in_stock',
    weight: 'Coffret Rituel',
    composition: 'Savon Karité-Curcuma (200 g) + Savon Miel (200 g) + Sérum/Lotion éclat (100 ml) + Boîte coffret luxe ruban or.',
    vertus: 'Alliance du karité, curcuma, miel et aloès pour une peau radieuse, unifiée et parfumée.',
    skinType: 'Tous types de peaux — Cadeau d’exception & rituel bien-être.',
    image: 'assets/images/products/amafleurdepeau-coffret.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-charbon-bambou-150g',
    name: 'Savon Charbon de Bambou de Chine (150 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-dermatologiques',
    categoryName: 'Soins Dermatologiques',
    price: 3800,
    oldPrice: null,
    badge: 'Détox Pores',
    badgeClass: 'badge-new',
    rating: 4.8,
    reviews: 59,
    stock: 45,
    status: 'in_stock',
    weight: '150 g',
    composition: 'Palmiste, Karité, Poudre de charbon de bambou de Chine pur, Parfum.',
    vertus: 'Gommant détox, masque nettoyant séborégulateur, anti-acné et anti-pollution.',
    skinType: 'Peaux grasses, comédons, points noirs.',
    image: 'assets/images/products/fiche-produits.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: false
  },
  {
    id: 'prod-nicotinamide-b3-90g',
    name: 'Savon Nicotinamide & Vitamine B3 (90 g)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-specifiques',
    categoryName: 'Soins Spécifiques & Teint',
    price: 4500,
    oldPrice: null,
    badge: 'Anti-Taches B3',
    badgeClass: 'badge-promo',
    rating: 4.9,
    reviews: 38,
    stock: 40,
    status: 'in_stock',
    weight: '90 g',
    composition: 'Palmiste, Karité, Nicotinamide pure (B3), Parfum.',
    vertus: 'Éclat du teint, antifongique et antiseptique, réduit les boutons avec pus et les taches rebelles.',
    skinType: 'Acné sévère, taches pigmentaires du visage.',
    image: 'assets/images/products/fiche-produits.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: false
  },
  {
    id: 'prod-chebe-serum-100ml',
    name: 'Sérum Capillaire au Chébé (100 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-capillaires',
    categoryName: 'Soins Capillaires',
    price: 6500,
    oldPrice: null,
    badge: 'Anti-Chute & Pousse',
    badgeClass: 'badge-new',
    rating: 4.9,
    reviews: 44,
    stock: 55,
    status: 'in_stock',
    weight: '100 ml',
    composition: 'Complexe huiles végétales pures, Poudre de Chébé authentique du Tchad, Conservateur naturel, Parfum.',
    vertus: 'Hydratant capillaire, assouplissant, freine la chute, active la repousse, traitement anti-squames.',
    skinType: 'Cheveux secs, cassants, crépus, frisés ou défrisés.',
    image: 'assets/images/products/fiche-produits.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: false
  }
];

// Product Store with LocalStorage Persistence
const ProductStore = {
  STORAGE_VERSION: 'v3.0',
  STORAGE_KEY: 'abp_products_catalog_v3',

  getAll: function() {
    try {
      const storedVer = localStorage.getItem('abp_catalog_version');
      if (storedVer !== this.STORAGE_VERSION) {
        localStorage.setItem('abp_catalog_version', this.STORAGE_VERSION);
        this.save(DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS;
      }
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {
      console.warn('Could not read product storage, using defaults', e);
    }
    this.save(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  },

  getFeatured: function() {
    return this.getAll().filter(p => p.featured);
  },

  getById: function(id) {
    return this.getAll().find(p => p.id === id || String(p.id) === String(id));
  },

  save: function(products) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    } catch(e) {
      console.error('Failed to save products', e);
    }
  },

  add: function(product) {
    const products = this.getAll();
    if (!product.id) {
      product.id = 'prod-' + Date.now();
    }
    products.unshift(product);
    this.save(products);
    return product;
  },

  update: function(id, data) {
    const products = this.getAll();
    const idx = products.findIndex(p => p.id === id || String(p.id) === String(id));
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...data };
      this.save(products);
      return products[idx];
    }
    return null;
  },

  remove: function(id) {
    let products = this.getAll();
    products = products.filter(p => p.id !== id && String(p.id) !== String(id));
    this.save(products);
    return products;
  },

  formatPrice: function(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' XOF';
  },

  search: function(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return this.getAll();
    return this.getAll().filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.brand || '').toLowerCase().includes(q) ||
      (p.vertus || '').toLowerCase().includes(q) ||
      (p.composition || '').toLowerCase().includes(q) ||
      (p.categoryName || '').toLowerCase().includes(q)
    );
  },

  resetDefaults: function() {
    this.save(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.ProductStore = ProductStore;
  window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
}