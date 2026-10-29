/**
 * AMABELLEPEAU - Master Catalog Store
 * Real product data curated from ETS Marie Andrea, AMABELLEBARBE & AMAFLEURDEPEAU
 * High-definition official studio product photography & featured poster visuals
 */

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-clarylex-featured',
    name: 'Le CLARYLEX — Visage & Corps (250 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-specifiques',
    categoryName: 'Soins Spécifiques & Teint',
    price: 5000,
    oldPrice: 6500,
    badge: 'Produit Vedette',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 184,
    stock: 90,
    status: 'in_stock',
    weight: '250 ml',
    composition: 'Huile de Palmiste, Acide de fruits naturels (AHA), Parfums naturels.',
    vertus: 'Nettoyant, Renforçant, Régénérant, Uniformisation de Teint et Éclat, Antirides.',
    skinType: 'Teint noir & métis — Éclat suprême visage & corps.',
    image: 'assets/images/products/le-clarylex-featured.jpg',
    fallbackImage: 'assets/images/products/savon-clarylex.jpg',
    featured: true
  },
  {
    id: 'prod-chebe-shampoo-250ml',
    name: 'Le Chébé Shampoo — Soins Capillaires (250 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-capillaires',
    categoryName: 'Soins Capillaires',
    price: 7500,
    oldPrice: 9000,
    badge: 'Pousse & Vitalité',
    badgeClass: 'badge-new',
    rating: 4.9,
    reviews: 112,
    stock: 75,
    status: 'in_stock',
    weight: '250 ml',
    composition: 'Savon noir Carapa & huile de Palme, Potasse végétale, Extrait authentique de Chébé du Tchad, Parfum.',
    vertus: 'Hydratant puissant, Anti-chute, Favorise la pousse active, Anti-inflammatoire, Neutraliseur de cuir chevelu alcalin.',
    skinType: 'Cheveux secs, cassants, crépus, frisés ou dévitalisés.',
    image: 'assets/images/products/chebe-shampoo.jpg',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-chebeserum-barbe',
    name: 'Le Chébé Sérum — Huile & Soin Barbe (100 ml)',
    brand: 'AMABELLEBARBE',
    merchant: 'AMABELLEBARBE Homme',
    category: 'barbe-homme',
    categoryName: 'Soins Barbe & Homme',
    price: 8500,
    oldPrice: 10000,
    badge: 'Élixir Homme',
    badgeClass: 'badge-bestseller',
    rating: 5.0,
    reviews: 96,
    stock: 65,
    status: 'in_stock',
    weight: '100 ml',
    composition: 'Sérum capillaire au Chébé pur, complexe d’huiles végétales fortifiantes, karité liquide, parfum boisé.',
    vertus: 'Nourrissant, favorise la repousse, assouplissant, démêlant et densifie la toison masculine.',
    skinType: 'Tous types de barbes et cuir chevelu masculin.',
    image: 'assets/images/products/chebeserum-barbe.jpg',
    fallbackImage: 'assets/images/products/amabellebarbe-homme.jpg',
    featured: true
  },
  {
    id: 'prod-bamboucha-250ml',
    name: 'Le Bamboucha — Gommage Détox (250 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-dermatologiques',
    categoryName: 'Soins Dermatologiques',
    price: 5500,
    oldPrice: 7000,
    badge: 'Détox Pores',
    badgeClass: 'badge-promo',
    rating: 4.9,
    reviews: 87,
    stock: 80,
    status: 'in_stock',
    weight: '250 ml',
    composition: 'Palmiste, Karité, Poudre fine de Charbon de Bambou de Chine pur, Parfum.',
    vertus: 'Gommant actif, Masque purifiant, Nettoyant séborégulateur, Anti-acné et anti-pollution.',
    skinType: 'Peaux grasses à imperfections, comédons, points noirs.',
    image: 'assets/images/products/le-bamboucha.jpg',
    fallbackImage: 'assets/images/products/bambou-chine-label.png',
    featured: true
  },
  {
    id: 'prod-combocreme-250ml',
    name: 'Combocrème — Visage & Corps (250 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'soins-dermatologiques',
    categoryName: 'Soins Dermatologiques',
    price: 6500,
    oldPrice: 8000,
    badge: 'Traitement Imperfections',
    badgeClass: 'badge-new',
    rating: 4.9,
    reviews: 79,
    stock: 70,
    status: 'in_stock',
    weight: '250 ml',
    composition: 'Pur beurre de Kombo d’Afrique de l’Ouest, Karité brut, Actifs cicatrisants naturels.',
    vertus: 'Traitement intensif des imperfections de la peau, anti-taches pigmentaires, cicatrisant et unifiant.',
    skinType: 'Peaux à problèmes, dermatoses, taches sombres, cicatrices.',
    image: 'assets/images/products/combocreme.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-coco-a-250ml',
    name: 'Coco A — Savon Naturel Visage & Corps (250 ml)',
    brand: 'AMABELLEPEAU',
    merchant: 'ETS Marie Andrea',
    category: 'savons',
    categoryName: 'Savons Artisanaux',
    price: 4500,
    oldPrice: 5500,
    badge: 'Douceur Coco',
    badgeClass: 'badge-bestseller',
    rating: 4.8,
    reviews: 94,
    stock: 100,
    status: 'in_stock',
    weight: '250 ml',
    composition: 'Huile de coco vierge première pression, Karité pur, Parfum délicat.',
    vertus: 'Nettoyage soyeux, hydratation veloutée, apporte douceur, élasticité et fraîcheur immédiate.',
    skinType: 'Tous types de peaux, particulièrement peaux sèches et sensibles.',
    image: 'assets/images/products/coco-a-savon.png',
    fallbackImage: 'assets/images/products/fiche-produits.png',
    featured: true
  },
  {
    id: 'prod-clarylex-200g',
    name: 'Savon CLARYLEX Pain Artisanal (200 g)',
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
  }
];

// Product Store with LocalStorage Persistence
const ProductStore = {
  STORAGE_VERSION: 'v4.0',
  STORAGE_KEY: 'abp_products_catalog_v4',

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