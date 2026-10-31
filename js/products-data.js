/**
 * AMABELLEPEAU - Master Catalog Store (v5.0 Unified)
 * Real product data curated from ETS Marie Andrea, AMABELLEBARBE & AMAFLEURDEPEAU
 * High-definition official studio product photography & featured poster visuals
 */

const DEFAULT_PRODUCTS = [
  {
    "id": "prod-clarylex-featured",
    "name": "Le CLARYLEX — Visage & Corps (250 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "visage",
    "categoryName": "Soins Spécifiques & Teint",
    "price": 5000,
    "oldPrice": 6500,
    "badge": "Produit Vedette",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 184,
    "reviewsCount": 184,
    "stock": 90,
    "status": "in_stock",
    "weight": "250 ml",
    "composition": "Huile de Palmiste, Acide de fruits naturels (AHA), Parfums naturels.",
    "vertus": "Nettoyant, Renforçant, Régénérant, Uniformisation de Teint et Éclat, Antirides.",
    "skinType": "Teint noir & métis — Éclat suprême visage & corps.",
    "image": "assets/images/products/le-clarylex-featured.jpg",
    "fallbackImage": "assets/images/products/38.png",
    "description": "Soin clarifiant haute tolérance aux acides de fruits naturels et palmiste pressé à froid. Illumine sans décaper et unifie les teints ternes.",
    "shortDesc": "Soin clarifiant visage & corps aux acides de fruits naturels.",
    "featured": true
  },
  {
    "id": "prod-chebe-shampoo-250ml",
    "name": "Le Chébé Shampoo — Soins Capillaires (250 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "cheveux",
    "categoryName": "Soins Capillaires",
    "price": 7500,
    "oldPrice": 9000,
    "badge": "Pousse & Vitalité",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 112,
    "reviewsCount": 112,
    "stock": 75,
    "status": "in_stock",
    "weight": "250 ml",
    "composition": "Savon noir Carapa & huile de Palme, Potasse végétale, Extrait authentique de Chébé du Tchad, Parfum.",
    "vertus": "Hydratant puissant, Anti-chute, Favorise la pousse active, Anti-inflammatoire, Neutraliseur de cuir chevelu alcalin.",
    "skinType": "Cheveux secs, cassants, crépus, frisés ou dévitalisés.",
    "image": "assets/images/products/chebe-shampoo.jpg",
    "fallbackImage": "assets/images/products/30.png",
    "description": "Shampoing purifiant traditionnel enrichi aux graines de Chébé torréfiées. Fortifie les racines et stimule la repousse.",
    "shortDesc": "Shampoing stimulant la pousse et anti-chute au véritable Chébé.",
    "featured": true
  },
  {
    "id": "prod-chebeserum-barbe",
    "name": "Le Chébé Sérum — Huile & Soin Barbe (100 ml)",
    "brand": "AMABELLEBARBE",
    "merchant": "AMABELLEBARBE Homme",
    "merchantId": "amabellebarbe",
    "category": "barbe",
    "categoryName": "Soins Barbe & Homme",
    "price": 8500,
    "oldPrice": 10000,
    "badge": "Élixir Homme",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 96,
    "reviewsCount": 96,
    "stock": 65,
    "status": "in_stock",
    "weight": "100 ml",
    "composition": "Sérum capillaire au Chébé pur, complexe d’huiles végétales fortifiantes, karité liquide, parfum boisé.",
    "vertus": "Nourrissant, favorise la repousse, assouplissant, démêlant et densifie la toison masculine.",
    "skinType": "Tous types de barbes et cuir chevelu masculin.",
    "image": "assets/images/products/chebeserum-barbe.jpg",
    "fallbackImage": "assets/images/products/barbe-1.png",
    "description": "Élixir noble conçu pour discipliner, hydrater et densifier la barbe tout en apaisant les irritations de rasage.",
    "shortDesc": "Sérum fortifiant et densifiant au Chébé pour barbe masculine.",
    "featured": true
  },
  {
    "id": "prod-bamboucha-250ml",
    "name": "Le Bamboucha — Gommage Détox (250 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "visage",
    "categoryName": "Soins Dermatologiques",
    "price": 5500,
    "oldPrice": 7000,
    "badge": "Détox Pores",
    "badgeClass": "badge-promo",
    "rating": 4.9,
    "reviews": 87,
    "reviewsCount": 87,
    "stock": 80,
    "status": "in_stock",
    "weight": "250 ml",
    "composition": "Palmiste, Karité, Poudre fine de Charbon de Bambou de Chine pur, Parfum.",
    "vertus": "Gommant actif, Masque purifiant, Nettoyant séborégulateur, Anti-acné et anti-pollution.",
    "skinType": "Peaux grasses à imperfections, comédons, points noirs.",
    "image": "assets/images/products/le-bamboucha.jpg",
    "fallbackImage": "assets/images/products/10.png",
    "description": "Pâte exfoliante végétale au charbon actif de bambou. Désincruste les impuretés en profondeur pour un grain de peau affiné.",
    "shortDesc": "Gommage et masque purifiant au charbon de bambou.",
    "featured": true
  },
  {
    "id": "prod-combocreme-250ml",
    "name": "Combocrème — Visage & Corps (250 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "visage",
    "categoryName": "Crèmes & Soins Nourrissants",
    "price": 6000,
    "oldPrice": 7500,
    "badge": "Ultra Hydratant",
    "badgeClass": "badge-bestseller",
    "rating": 4.8,
    "reviews": 64,
    "reviewsCount": 64,
    "stock": 50,
    "status": "in_stock",
    "weight": "250 ml",
    "composition": "Beurre de Karité brut, Huile de Carapa, Huile de Baobab, Cire végétale, Parfum naturel.",
    "vertus": "Nourrissant en profondeur, régénérant, réparateur des peaux sèches et protection solaire douce.",
    "skinType": "Peaux sèches, normales à très déshydratées.",
    "image": "assets/images/products/combocreme.png",
    "fallbackImage": "assets/images/products/31.png",
    "description": "Crème riche fouettée combinant les vertus du karité non raffiné et des huiles de baobab et carapa.",
    "shortDesc": "Crème fouettée nutritive visage et corps.",
    "featured": true
  },
  {
    "id": "prod-coco-a-250ml",
    "name": "Coco A — Savon Naturel Visage & Corps (250 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "corps",
    "categoryName": "Savons Liquides Botaniques",
    "price": 4500,
    "oldPrice": 5500,
    "badge": "100% Végétal",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 58,
    "reviewsCount": 58,
    "stock": 70,
    "status": "in_stock",
    "weight": "250 ml",
    "composition": "Huile de Coco vierge de Grand-Bassam saponifiée, glycérine naturelle, extrait d’aloès.",
    "vertus": "Nettoie en douceur, hydrate et laisse un voile satiné parfumé à la noix de coco fraîche.",
    "skinType": "Tous types de peaux, usage quotidien pour toute la famille.",
    "image": "assets/images/products/coco-a-savon.png",
    "fallbackImage": "assets/images/products/1.png",
    "description": "Savon liquide onctueux saponifié à l'huile de coco vierge ivoirienne. Mousse généreuse et sensation soyeuse.",
    "shortDesc": "Savon liquide artisanal à la noix de coco pressée.",
    "featured": true
  },
  {
    "id": "prod-clarylex-200g",
    "name": "Savon CLARYLEX Pain Artisanal (200 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 4000,
    "oldPrice": 5000,
    "badge": "Bestseller",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 138,
    "reviewsCount": 138,
    "stock": 120,
    "status": "in_stock",
    "weight": "200 g",
    "composition": "Palmiste – Karité – Acides de fruits naturels – Parfum.",
    "vertus": "Clarifiant – Nettoyant – Éclat du teint – Anti-rides – Régénérant.",
    "skinType": "Teint noir – Teint métis – Clarifiant & Éclaircissant doux.",
    "image": "assets/images/products/38.png",
    "fallbackImage": "assets/images/products/savon-clarylex.jpg",
    "description": "Formulé à base d'acides de fruits naturels et de beurre de karité pur. Clarifie en douceur et régénère les cellules de l'épiderme.",
    "shortDesc": "Pain clarifiant 200g aux acides de fruits et karité.",
    "featured": true
  },
  {
    "id": "prod-karite-brut-200g",
    "name": "Savon au Beurre de Karité Brut (200 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": 4500,
    "badge": "Surgras 8%",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 156,
    "reviewsCount": 156,
    "stock": 110,
    "status": "in_stock",
    "weight": "200 g",
    "composition": "Beurre de Karité pur de Korhogo – Huile de Palmiste – Cire d'abeille.",
    "vertus": "Ultra-nourrissant – Adoucissant – Barrière protectrice anti-dessèchement.",
    "skinType": "Peaux sèches, sensibles, atopiques ou exposées au soleil.",
    "image": "assets/images/products/34.png",
    "fallbackImage": "assets/images/products/savon-beurre-karite.jpg",
    "description": "Pain surgras généreux de 200g concentré en beurre de karité frais non raffiné du nord ivoirien.",
    "shortDesc": "Pain surgras 200g au beurre de karité pur de Korhogo.",
    "featured": true
  },
  {
    "id": "prod-gel-aloes-200g",
    "name": "Savon Gel Aloès Vera (200 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": 4500,
    "badge": "Apaisant",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 94,
    "reviewsCount": 94,
    "stock": 95,
    "status": "in_stock",
    "weight": "200 g",
    "composition": "Gel frais d’Aloé Vera barbadensis – Huile de Palmiste – Glycérine.",
    "vertus": "Cicatrisant – Anti-brûlures – Hydratation intense – Calme les rougeurs.",
    "skinType": "Peaux réactives, échauffées ou déshydratées.",
    "image": "assets/images/products/35.png",
    "fallbackImage": "assets/images/products/savon-gel-aloes.jpg",
    "description": "Enrichi au mucilage pur d'aloe vera biologique fraîchement récolté pour une fraîcheur désaltérante.",
    "shortDesc": "Pain 200g au gel d'aloès apaisant et régénérant.",
    "featured": true
  },
  {
    "id": "prod-carapa-200g",
    "name": "Savon au Carapa Procera (200 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 4000,
    "oldPrice": 5000,
    "badge": "Dermatologique",
    "badgeClass": "badge-promo",
    "rating": 5,
    "reviews": 104,
    "reviewsCount": 104,
    "stock": 85,
    "status": "in_stock",
    "weight": "200 g",
    "composition": "Huile pure de Carapa (Touloucouna) – Palmiste – Karité brut.",
    "vertus": "Antiseptique puissant – Traitement eczéma, dartres, démangeaisons et mycoses.",
    "skinType": "Peaux à problèmes dermatologiques sévères.",
    "image": "assets/images/products/36.png",
    "fallbackImage": "assets/images/products/savon-carapa.jpg",
    "description": "Le soin roi de la pharmacopée forestière ivoirienne. Soulage instantanément tiraillements et irritations cutanées.",
    "shortDesc": "Pain médical végétal au Carapa anti-démangeaisons.",
    "featured": true
  },
  {
    "id": "prod-tetrapleura-200g",
    "name": "Savon au Tétrapéla / 4 Côtés (200 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 4000,
    "oldPrice": 5000,
    "badge": "Secret d’Afrique",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 142,
    "reviewsCount": 142,
    "stock": 90,
    "status": "in_stock",
    "weight": "200 g",
    "composition": "Extrait concentré de Tetrapleura tetraptera (4 Côtés) – Huile de Palmiste – Karité.",
    "vertus": "Raffermissant – Purifiant intime et corporel – Élimination des toxines – Parfum envoûtant.",
    "skinType": "Tous types de peaux, particulièrement recommandé pour le rituel femme.",
    "image": "assets/images/products/37.png",
    "fallbackImage": "assets/images/products/savon-tetrapela.jpg",
    "description": "Formulé avec le fruit sacré du tétrapéla (Prekese), réputé pour ses vertus détoxifiantes et raffermissantes.",
    "shortDesc": "Pain 200g au Tétrapéla (4 Côtés) tonifiant et purifiant.",
    "featured": true
  },
  {
    "id": "prod-carotte-200g",
    "name": "Savon à la Carotte & Bêta-Carotène (200 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": 4500,
    "badge": "Éclat Soleil",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 82,
    "reviewsCount": 82,
    "stock": 100,
    "status": "in_stock",
    "weight": "200 g",
    "composition": "Macérât huileux de Carotte fraîche – Huile de Palmiste – Karité – Vitamine E.",
    "vertus": "Illumine le teint – Révélateur d’éclat doré – Antioxydant puissant – Teint éclatant.",
    "skinType": "Peaux ternes, fatiguées en manque de lumière.",
    "image": "assets/images/products/39.png",
    "fallbackImage": "assets/images/products/savon-carotte.jpg",
    "description": "Riche en provitamine A végétale pour redonner bonne mine et stimuler le renouvellement cellulaire naturel.",
    "shortDesc": "Pain 200g à la carotte fraîche pour un teint éclatant et satiné.",
    "featured": true
  },
  {
    "id": "prod-huile-baobab-100ml",
    "name": "Huile Précieuse de Baobab Pure (100 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "huiles",
    "categoryName": "Huiles & Sérums Pures",
    "price": 6500,
    "oldPrice": 8000,
    "badge": "Anti-Âge",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 91,
    "reviewsCount": 91,
    "stock": 60,
    "status": "in_stock",
    "weight": "100 ml",
    "composition": "100% pure huile de graines de Baobab pressée à froid (Adansonia digitata).",
    "vertus": "Élasticité cutanée – Prévention des vergetures – Régénération cellulaire intense.",
    "skinType": "Peaux matures, peaux très sèches, vergetures post-maternité.",
    "image": "assets/images/products/32.png",
    "fallbackImage": "assets/images/products/huile-baobab.jpg",
    "description": "Huile rare et noble extraite des graines de baobabs millénaires. Redonne fermeté et souplesse au visage et au buste.",
    "shortDesc": "Huile pure de baobab 100ml pressée à froid.",
    "featured": true
  },
  {
    "id": "prod-huile-carapa-100ml",
    "name": "Huile Végétale de Carapa Pure (100 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "huiles",
    "categoryName": "Huiles & Sérums Pures",
    "price": 6000,
    "oldPrice": 7500,
    "badge": "Soin Curatif",
    "badgeClass": "badge-promo",
    "rating": 4.9,
    "reviews": 73,
    "reviewsCount": 73,
    "stock": 55,
    "status": "in_stock",
    "weight": "100 ml",
    "composition": "100% huile vierge de graines de Carapa procera.",
    "vertus": "Anti-inflammatoire – Apaise les douleurs articulaires et traite les affections cutanées tenaces.",
    "skinType": "Peaux à problèmes, cuir chevelu irrité, massages thérapeutiques.",
    "image": "assets/images/products/33.png",
    "fallbackImage": "assets/images/products/huile-carapa.jpg",
    "description": "Véritable pharmacie liquide en bouteille. Apaise les démangeaisons les plus rebelles et assainit le cuir chevelu.",
    "shortDesc": "Huile de Carapa 100ml antiseptique et réparatrice.",
    "featured": true
  },
  {
    "id": "prod-huile-safou-100ml",
    "name": "Huile de Safou Régénérante (100 ml)",
    "brand": "AMABELLEPEAU",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "huiles",
    "categoryName": "Huiles & Sérums Pures",
    "price": 7000,
    "oldPrice": 8500,
    "badge": "Régénérant",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 48,
    "reviewsCount": 48,
    "stock": 45,
    "status": "in_stock",
    "weight": "100 ml",
    "composition": "Huile de pulpe de Safou (Dacryodes edulis) première pression.",
    "vertus": "Nourrissante – Riche en acides gras essentiels et antioxydants – Protège du vieillissement.",
    "skinType": "Peaux dévitalisées et cheveux ternes.",
    "image": "assets/images/products/huile-safou.jpg",
    "fallbackImage": "assets/images/products/32.png",
    "description": "Extrait de la prune africaine, cette huile dense nourrit intensément les peaux sèches et gaine la fibre capillaire.",
    "shortDesc": "Huile de safou nutritive et réparatrice.",
    "featured": false
  },
  {
    "id": "prod-barbe-stimulante-50ml",
    "name": "Huile à Barbe Stimulante AMABELLEBARBE (50 ml)",
    "brand": "AMABELLEBARBE",
    "merchant": "AMABELLEBARBE Homme",
    "merchantId": "amabellebarbe",
    "category": "barbe",
    "categoryName": "Soins Barbe & Homme",
    "price": 6500,
    "oldPrice": 8000,
    "badge": "Densifiant",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 67,
    "reviewsCount": 67,
    "stock": 60,
    "status": "in_stock",
    "weight": "50 ml",
    "composition": "Huile de Ricin noir, Huile de Jojoba, Extrait de Chébé, Huile essentielle de Cèdre de l'Atlas.",
    "vertus": "Booste la pousse de la barbe, élimine les trous et pellicules de barbe, parfum viril noble.",
    "skinType": "Barbes clairsemées, courtes, moyennes ou longues.",
    "image": "assets/images/products/barbe-1.png",
    "fallbackImage": "assets/images/products/chebeserum-barbe.jpg",
    "description": "Cocktail botanique stimulant pour activer les follicules pileux et densifier la barbe sans effet gras.",
    "shortDesc": "Huile stimulante et densifiante pour barbe.",
    "featured": true
  },
  {
    "id": "prod-barbe-baume-60g",
    "name": "Baume Nourrissant Barbe & Moustache (60 g)",
    "brand": "AMABELLEBARBE",
    "merchant": "AMABELLEBARBE Homme",
    "merchantId": "amabellebarbe",
    "category": "barbe",
    "categoryName": "Soins Barbe & Homme",
    "price": 5500,
    "oldPrice": 7000,
    "badge": "Discipline & Brillance",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 52,
    "reviewsCount": 52,
    "stock": 70,
    "status": "in_stock",
    "weight": "60 g",
    "composition": "Beurre de Karité brut, Cire d'abeille naturelle, Huile de Carapa, Vitamine E.",
    "vertus": "Fixe et coiffe la barbe, assouplit le poil rêche et protège des agressions extérieures.",
    "skinType": "Barbes épaisses ou rebelles.",
    "image": "assets/images/products/barbe-2.png",
    "fallbackImage": "assets/images/products/barbe-1.png",
    "description": "Pâte sculptante naturelle pour hydrater et apporter une tenue impeccable toute la journée.",
    "shortDesc": "Baume coiffant et nourrissant pour barbe.",
    "featured": false
  },
  {
    "id": "prod-barbe-savon-100g",
    "name": "Savon Shampoing Solide Barbe (100 g)",
    "brand": "AMABELLEBARBE",
    "merchant": "AMABELLEBARBE Homme",
    "merchantId": "amabellebarbe",
    "category": "barbe",
    "categoryName": "Soins Barbe & Homme",
    "price": 3500,
    "oldPrice": 4500,
    "badge": "Purifiant Homme",
    "badgeClass": "badge-promo",
    "rating": 4.9,
    "reviews": 43,
    "reviewsCount": 43,
    "stock": 80,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Savon saponifié à froid au Charbon actif, Huile de Palmiste, Menthol vivifiant.",
    "vertus": "Nettoie en profondeur le poil de barbe, élimine sébum et poussières sans assécher.",
    "skinType": "Peau masculine sous la barbe.",
    "image": "assets/images/products/barbe-3.png",
    "fallbackImage": "assets/images/products/10.png",
    "description": "Pain purifiant à mousse fraîche conçu spécifiquement pour le pH de la barbe et de la peau masculine.",
    "shortDesc": "Savon solide nettoyant spécial barbe.",
    "featured": false
  },
  {
    "id": "prod-amabellebarbe-kit",
    "name": "Kit Entretien Barbe Complet AMABELLEBARBE",
    "brand": "AMABELLEBARBE",
    "merchant": "AMABELLEBARBE Homme",
    "merchantId": "amabellebarbe",
    "category": "coffrets",
    "categoryName": "Coffrets Rituels d’Exception",
    "price": 18500,
    "oldPrice": 22000,
    "badge": "Coffret Prestige",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 79,
    "reviewsCount": 79,
    "stock": 35,
    "status": "in_stock",
    "weight": "Coffret 4 pièces",
    "composition": "Huile stimulante 50ml + Baume 60g + Savon barbe 100g + Peigne antistatique en bois de santal.",
    "vertus": "Rituel complet de soins barbe pour une densité, brillance et fraîcheur exemplaires.",
    "skinType": "Cadeau idéal pour homme distingué.",
    "image": "assets/images/products/amabellebarbe-kit.png",
    "fallbackImage": "assets/images/products/barbe-4.png",
    "description": "Le coffret de référence des gentlemen abidjanais. Comprend tous les indispensables du soin de la barbe.",
    "shortDesc": "Kit 4 pièces luxe pour l’entretien complet de la barbe.",
    "featured": true
  },
  {
    "id": "prod-amafleurdepeau-coffret",
    "name": "Coffret Rituel Signature AMAFLEURDEPEAU",
    "brand": "AMAFLEURDEPEAU",
    "merchant": "AMAFLEURDEPEAU Beauté",
    "merchantId": "amafleurdepeau",
    "category": "coffrets",
    "categoryName": "Coffrets Rituels d’Exception",
    "price": 22000,
    "oldPrice": 26000,
    "badge": "Édition Luxe",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 68,
    "reviewsCount": 68,
    "stock": 25,
    "status": "in_stock",
    "weight": "Coffret 5 soins",
    "composition": "Savon CLARYLEX 200g + Combocrème 250ml + Huile de Baobab 100ml + Savon Aloès + Éponge loofah végétale.",
    "vertus": "Rituel royal de purification, régénération et éclat du teint.",
    "skinType": "Tous types de peaux, rituel complet visage et corps.",
    "image": "assets/images/products/amafleurdepeau-coffret.png",
    "fallbackImage": "assets/images/products/31.png",
    "description": "Une malle d'or végétale contenant les plus grands trésors botaniques de la maison AMABELLEPEAU.",
    "shortDesc": "Coffret d’exception 5 soins pour une routine complète.",
    "featured": true
  },
  {
    "id": "prod-soap-01",
    "name": "Savon Curcuma & Miel Pur (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Teint Éclat",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 135,
    "reviewsCount": 135,
    "stock": 90,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Curcuma longa d’Afrique de l’Ouest, Miel de forêt brut, Huile de palmiste saponifiée.",
    "vertus": "Anti-taches, illuminateur de teint, antiseptique et cicatrisant.",
    "skinType": "Peaux ternes, taches pigmentaires, peaux à imperfections.",
    "image": "assets/images/products/1.png",
    "fallbackImage": "assets/images/products/1.png",
    "description": "Le célèbre savon éclat au curcuma doré et miel crémeux. Atténue visiblement les taches sombres et donne un éclat chaud au teint.",
    "shortDesc": "Savon curcuma & miel anti-taches illuminateur.",
    "featured": true
  },
  {
    "id": "prod-soap-02",
    "name": "Savon Café Exfoliant & Karité (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Gommage Doux",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 78,
    "reviewsCount": 78,
    "stock": 85,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Café Robusta torréfié d’Abidjan moulu fin, Beurre de Karité, Palmiste.",
    "vertus": "Exfoliation douce des cellules mortes, tonifie la microcirculation et affine le grain.",
    "skinType": "Peau rêche, coudes, talons, peaux en manque de tonicité.",
    "image": "assets/images/products/2.png",
    "fallbackImage": "assets/images/products/2.png",
    "description": "Grains de café ivoirien pour un gommage quotidien stimulant, enrichi au beurre de karité pour laisser la peau douce et tonique.",
    "shortDesc": "Gommage corporel café et karité tonifiant.",
    "featured": false
  },
  {
    "id": "prod-soap-03",
    "name": "Savon Miel Pur & Cire d’Abeille (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Nourrissant",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 110,
    "reviewsCount": 110,
    "stock": 95,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Miel pur des savanes ivoiriennes, Cire d’abeille vierge, Palmiste pressé.",
    "vertus": "Hydrate intensément, favorise la régénération cutanée, protecteur contre les agressions climatiques.",
    "skinType": "Peaux sèches, délicates et peaux matures.",
    "image": "assets/images/products/3.png",
    "fallbackImage": "assets/images/products/3.png",
    "description": "Une caresse de douceur pour le visage. Le miel sauvage nourrit la peau en profondeur sans sensation de tiraillement.",
    "shortDesc": "Savon surgras au miel et cire d’abeille réparatrice.",
    "featured": false
  },
  {
    "id": "prod-soap-04",
    "name": "Savon Lait de Chèvre & Amande Douce (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": null,
    "badge": "Peaux Délicates",
    "badgeClass": "badge-new",
    "rating": 5,
    "reviews": 93,
    "reviewsCount": 93,
    "stock": 75,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Lait de chèvre entier, Huile d’amande douce, Karité, Palmiste.",
    "vertus": "Anti-âge doux, régulateur de sébum, tolérance maximale pour les peaux ultra-sensibles.",
    "skinType": "Peaux réactives, acné légère, rougeurs, bébés et enfants.",
    "image": "assets/images/products/4.png",
    "fallbackImage": "assets/images/products/4.png",
    "description": "Mousse crémeuse onctueuse au lait de chèvre riche en acides gras essentiels pour réguler et apaiser l'épiderme.",
    "shortDesc": "Savon surgras crémeux au lait de chèvre.",
    "featured": true
  },
  {
    "id": "prod-soap-05",
    "name": "Savon Moringa & Palmiste Vert (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Super-Aliment",
    "badgeClass": "badge-promo",
    "rating": 4.8,
    "reviews": 67,
    "reviewsCount": 67,
    "stock": 80,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Feuilles de Moringa oleifera réduites en poudre fine, Palmiste vierge, Karité.",
    "vertus": "Antioxydant remarquable, purifie des polluants urbains, ravive les teints fatigués.",
    "skinType": "Peaux citadines, exposées à la poussière et à la pollution.",
    "image": "assets/images/products/5.png",
    "fallbackImage": "assets/images/products/5.png",
    "description": "Véritable bouclier protecteur au moringa africain surnommé l'arbre de vie pour détoxifier l'épiderme.",
    "shortDesc": "Savon détox au moringa antioxydant.",
    "featured": false
  },
  {
    "id": "prod-soap-06",
    "name": "Savon Persil & Citron Purifiant (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Clarté Teint",
    "badgeClass": "badge-new",
    "rating": 4.7,
    "reviews": 58,
    "reviewsCount": 58,
    "stock": 70,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Extrait concentré de persil frais, Zestes et jus de citron vert, Palmiste.",
    "vertus": "Atténue les taches de rousseur et taches brunes, resserre les pores dilatés.",
    "skinType": "Peaux grasses, pores visibles, teint irrégulier.",
    "image": "assets/images/products/6.png",
    "fallbackImage": "assets/images/products/6.png",
    "description": "La fraîcheur végétale du persil combinée au citron tonique pour un grain de peau net et resserré.",
    "shortDesc": "Savon clarifiant doux au persil et citron.",
    "featured": false
  },
  {
    "id": "prod-soap-07",
    "name": "Savon au Soufre Purifiant Anti-Acné (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Anti-Acné",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 148,
    "reviewsCount": 148,
    "stock": 120,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Fleur de soufre minéral purifiée, Huile de palmiste saponifiée, Karité.",
    "vertus": "Assèche les comédons et boutons d'acné, antifongique, purifie les zones grasses du dos et du visage.",
    "skinType": "Peaux à tendance acnéique, boutons récurrents, points noirs.",
    "image": "assets/images/products/7.png",
    "fallbackImage": "assets/images/products/7.png",
    "description": "Le soin culte contre l'acné et les comédons. Régule efficacement l'excès de sébum dès les premières utilisations.",
    "shortDesc": "Savon au soufre antibactérien spécial acné.",
    "featured": true
  },
  {
    "id": "prod-soap-08",
    "name": "Savon Kojic & Curcuma Teint Radieux (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": null,
    "badge": "Teint Unifié",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 167,
    "reviewsCount": 167,
    "stock": 110,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Acide kojique végétal, Curcuma bio, Huile de coco vierge, Karité.",
    "vertus": "Unifie le teint, estompe l’hyperpigmentation et les cicatrices d’anciens boutons.",
    "skinType": "Hyperpigmentation, teint hétérogène, taches solaires.",
    "image": "assets/images/products/8.png",
    "fallbackImage": "assets/images/products/8.png",
    "description": "Une synergie végétale de pointe combinant l'acide kojique naturel et le curcuma pour unifier sans risque de dépigmentation.",
    "shortDesc": "Savon unifiant haute efficacité kojic & curcuma.",
    "featured": true
  },
  {
    "id": "prod-soap-09",
    "name": "Savon Neem & Arbre à Thé (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Purifiant Vert",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 62,
    "reviewsCount": 62,
    "stock": 80,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Huile pure de graines de Neem (Margousier), Huile essentielle de Tea tree, Palmiste.",
    "vertus": "Antibactérien majeur, élimine les impuretés cutanées, soulage les démangeaisons.",
    "skinType": "Peaux à problèmes, furoncles, folliculite de rasage.",
    "image": "assets/images/products/9.png",
    "fallbackImage": "assets/images/products/9.png",
    "description": "Le neem médicinal et le tea tree unissent leurs forces pour assainir durablement l'épiderme.",
    "shortDesc": "Savon antiseptique végétal au neem et tea tree.",
    "featured": false
  },
  {
    "id": "prod-soap-10",
    "name": "Savon Charbon Actif & Menthe Poivrée (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Détox Noir",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 129,
    "reviewsCount": 129,
    "stock": 115,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Charbon végétal activé de noix de coco, Huile essentielle de menthe, Palmiste.",
    "vertus": "Aimant à impuretés, aspire l'excès de sébum, fraîcheur intense revigorante.",
    "skinType": "Peaux mixtes à très grasses, points noirs du nez et du menton.",
    "image": "assets/images/products/10.png",
    "fallbackImage": "assets/images/products/10.png",
    "description": "Le savon noir détox par excellence. Nettoie en profondeur les pores incrustés et laisse une sensation de propreté absolue.",
    "shortDesc": "Savon au charbon actif aspirant de sébum.",
    "featured": true
  },
  {
    "id": "prod-soap-11",
    "name": "Savon Kojic & Papaye Exfoliante (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": null,
    "badge": "Peau Neuve",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 88,
    "reviewsCount": 88,
    "stock": 90,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Papaïne naturelle de papaye mûre, Acide kojique, Palmiste, Karité.",
    "vertus": "Exfoliation enzymatique sans frottement, éclaircissement harmonieux du teint, douceur soyeuse.",
    "skinType": "Teint brouillé, taches rebelles.",
    "image": "assets/images/products/11.png",
    "fallbackImage": "assets/images/products/11.png",
    "description": "Les enzymes actives de papaye grignotent les cellules mortes pour dévoiler une peau éclatante et soyeuse.",
    "shortDesc": "Savon peeling doux kojic et papaïne.",
    "featured": false
  },
  {
    "id": "prod-soap-12",
    "name": "Savon Artemisia & Plantes Vertes (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Plante Sacrée",
    "badgeClass": "badge-promo",
    "rating": 4.8,
    "reviews": 54,
    "reviewsCount": 54,
    "stock": 65,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Feuilles d’Artemisia annua broyées, Huile de palmiste saponifiée, Karité.",
    "vertus": "Régénérant cutané, apaise les réactions allergiques et démangeaisons.",
    "skinType": "Peaux délicates, irritations saisonnières.",
    "image": "assets/images/products/12.png",
    "fallbackImage": "assets/images/products/12.png",
    "description": "L'armoise annuelle bienfaitrice au service de l'équilibre épidermique et de la protection cutanée.",
    "shortDesc": "Savon médicinal à l’artemisia protectrice.",
    "featured": false
  },
  {
    "id": "prod-soap-13",
    "name": "Savon Menthe Poivrée & Eucalyptus (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Coup de Fouet",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 73,
    "reviewsCount": 73,
    "stock": 85,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Menthe poivrée, Huile essentielle d’eucalyptus globulus, Palmiste.",
    "vertus": "Fraîcheur glaciale sous la douche, décongestionnant, dynamisant du corps.",
    "skinType": "Idéal après le sport ou lors des journées chaudes à Abidjan.",
    "image": "assets/images/products/13.png",
    "fallbackImage": "assets/images/products/13.png",
    "description": "Un effet glaçon immédiat sur la peau qui réveille les sens et dissipe la fatigue accumulée.",
    "shortDesc": "Savon fraîcheur intense menthe et eucalyptus.",
    "featured": false
  },
  {
    "id": "prod-soap-14",
    "name": "Savon Eucalyptus & Romarin Frais (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Respiration",
    "badgeClass": "badge-new",
    "rating": 4.7,
    "reviews": 46,
    "reviewsCount": 46,
    "stock": 70,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Romarin officinal, Eucalyptus sauvage, Palmiste saponifié, Karité.",
    "vertus": "Tonifiant cutané, purifie la sueur corporelle et laisse une fragrance herboriste fraîche.",
    "skinType": "Tous types de peaux, transpiration active.",
    "image": "assets/images/products/14.png",
    "fallbackImage": "assets/images/products/14.png",
    "description": "Fragrance aromatique vivifiante pour purifier la peau et stimuler la clarté d'esprit dès le matin.",
    "shortDesc": "Savon tonique aux herbes aromatiques.",
    "featured": false
  },
  {
    "id": "prod-soap-15",
    "name": "Savon Cannelle & Cacao Chaud (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Gourmand",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 69,
    "reviewsCount": 69,
    "stock": 75,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Poudre d’écorce de cannelle fine, Beurre de Cacao brut de San Pedro, Palmiste.",
    "vertus": "Stimule la circulation sanguine, adoucit l'épiderme et enveloppe d'un parfum épicé chaud.",
    "skinType": "Peaux sèches, peau d'orange, manque d'éclat.",
    "image": "assets/images/products/15.png",
    "fallbackImage": "assets/images/products/15.png",
    "description": "Une alliance gourmande du beurre de cacao pur et de la cannelle stimulante pour une peau satinée.",
    "shortDesc": "Savon gourmand cacao brut et cannelle tonifiante.",
    "featured": false
  },
  {
    "id": "prod-soap-16",
    "name": "Savon Gingembre & Citronnelle (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Vitalité",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 61,
    "reviewsCount": 61,
    "stock": 80,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Jus de gingembre frais pressé, Huile essentielle de citronnelle de Côte d’Ivoire, Palmiste.",
    "vertus": "Dynamisant, anti-moustiques naturel résiduel, stimule la peau atone.",
    "skinType": "Peaux fatiguées, réveil difficile.",
    "image": "assets/images/products/16.png",
    "fallbackImage": "assets/images/products/16.png",
    "description": "Le piquant tonifiant du gingembre s'unit à la fraîcheur citronnée pour une sensation vivifiante inégalée.",
    "shortDesc": "Savon énergisant gingembre et citronnelle.",
    "featured": false
  },
  {
    "id": "prod-soap-17",
    "name": "Savon Huile de Carotte Solaire (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Bonne Mine",
    "badgeClass": "badge-bestseller",
    "rating": 4.9,
    "reviews": 122,
    "reviewsCount": 122,
    "stock": 105,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Macérât de carottes fraîches, Huile de palmiste saponifiée, Karité brut.",
    "vertus": "Donne un teint lumineux et doré, prépare la peau au soleil et prolonge l'éclat.",
    "skinType": "Teint terne, grisâtre ou fatigué.",
    "image": "assets/images/products/17.png",
    "fallbackImage": "assets/images/products/17.png",
    "description": "Le concentré de soleil végétal qui réveille le teint en douceur et procure un hâle naturel lumineux.",
    "shortDesc": "Savon bonne mine à l’huile de carotte.",
    "featured": true
  },
  {
    "id": "prod-soap-18",
    "name": "Savon Fenugrec & Karité Fermeté (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": null,
    "badge": "Galbe & Fermeté",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 97,
    "reviewsCount": 97,
    "stock": 85,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Graines de fenugrec moulues, Beurre de karité, Huile de palmiste.",
    "vertus": "Raffermit les tissus, améliore le galbe du buste et du corps, adoucit l'épiderme.",
    "skinType": "Buste, hanches, peaux en perte de fermeté.",
    "image": "assets/images/products/18.png",
    "fallbackImage": "assets/images/products/18.png",
    "description": "Le secret ancestral des femmes d'Orient et d'Afrique pour raffermir la peau et sublimer les courbes.",
    "shortDesc": "Savon raffermissant au fenugrec et karité.",
    "featured": false
  },
  {
    "id": "prod-soap-19",
    "name": "Savon Flocons d’Avoine & Miel Doux (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Peaux Sensibles",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 130,
    "reviewsCount": 130,
    "stock": 100,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Poudre colloïdale d’avoine pure, Miel sauvage, Karité, Palmiste.",
    "vertus": "Calme les démangeaisons, hydrate et protège le film hydrolipidique sans aucune agression.",
    "skinType": "Peaux atopiques, eczéma, bébés, peaux intolérantes.",
    "image": "assets/images/products/19.png",
    "fallbackImage": "assets/images/products/19.png",
    "description": "Le réconfort absolu des peaux fragiles. L'avoine apaisante et le miel adoucissent et calment les tiraillements.",
    "shortDesc": "Savon doudou à l’avoine et miel calmant.",
    "featured": true
  },
  {
    "id": "prod-soap-20",
    "name": "Savon Concombre & Aloès Hydratation (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Fraîcheur Eau",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 74,
    "reviewsCount": 74,
    "stock": 90,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Jus de concombre frais bio, Gel d’aloé vera, Palmiste saponifié.",
    "vertus": "Désaltère la peau, resserre le grain, apaise les poches et illumine le regard.",
    "skinType": "Peaux déshydratées, échauffées ou dévitalisées.",
    "image": "assets/images/products/20.png",
    "fallbackImage": "assets/images/products/20.png",
    "description": "Un bain de fraîcheur hydratant pour désaltérer la peau sous le climat chaud et humide d'Abidjan.",
    "shortDesc": "Savon désaltérant au jus de concombre frais.",
    "featured": false
  },
  {
    "id": "prod-soap-21",
    "name": "Savon Clou de Girofle Antiseptique (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Purifiant Fort",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 58,
    "reviewsCount": 58,
    "stock": 75,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Clous de girofle moulus, Huile essentielle de giroflier, Palmiste, Karité.",
    "vertus": "Assainissant puissant, neutralise les odeurs corporelles tenaces, antimicrobien.",
    "skinType": "Hygiène intime et corporelle approfondie, transpiration forte.",
    "image": "assets/images/products/21.png",
    "fallbackImage": "assets/images/products/21.png",
    "description": "Puissance antiseptique millénaire du giroflier pour une hygiène irréprochable et durable.",
    "shortDesc": "Savon assainissant au clou de girofle.",
    "featured": false
  },
  {
    "id": "prod-soap-22",
    "name": "Savon Lavande Apaisante & Sommeil (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Relaxant",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 86,
    "reviewsCount": 86,
    "stock": 80,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Fleurs de lavande séchées, Huile essentielle de lavande fine, Palmiste, Karité.",
    "vertus": "Détend les tensions musculaires, apaise l’esprit avant le coucher, adoucit l'épiderme.",
    "skinType": "Idéal pour la douche du soir et la relaxation.",
    "image": "assets/images/products/22.png",
    "fallbackImage": "assets/images/products/22.png",
    "description": "Le savon cocooning du soir par excellence pour évacuer le stress de la journée dans un parfum fleuri apaisant.",
    "shortDesc": "Savon relaxant à la lavande et karité.",
    "featured": false
  },
  {
    "id": "prod-soap-23",
    "name": "Savon Orange & Citron Zeste Éclat (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Vitamine C",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 64,
    "reviewsCount": 64,
    "stock": 85,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Zestes d’oranges et citrons mûrs, Huile essentielle d’agrumes, Palmiste, Karité.",
    "vertus": "Booster d’éclat, tonifiant de l’épiderme et parfum fruité pétillant.",
    "skinType": "Peaux ternes, normales à mixtes.",
    "image": "assets/images/products/23.png",
    "fallbackImage": "assets/images/products/23.png",
    "description": "Un cocktail d'agrumes ensoleillés gorgés de vitamine C pour donner un coup de pep's à la peau.",
    "shortDesc": "Savon pétillant aux agrumes et vitamine C.",
    "featured": false
  },
  {
    "id": "prod-soap-24",
    "name": "Savon Romarin & Argile Verte Détox (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Minéral Vert",
    "badgeClass": "badge-new",
    "rating": 4.8,
    "reviews": 55,
    "reviewsCount": 55,
    "stock": 75,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Argile montmorillonite verte, Extrait de romarin, Palmiste, Karité.",
    "vertus": "Absorbe les toxines, régule le sébum et désincruste les pores sans décaper.",
    "skinType": "Peaux grasses, zone T brillante, comédons.",
    "image": "assets/images/products/24.png",
    "fallbackImage": "assets/images/products/24.png",
    "description": "L'argile verte minérale et le romarin absorbent les impuretés pour matifier et équilibrer l'épiderme.",
    "shortDesc": "Savon purifiant à l’argile verte et romarin.",
    "featured": false
  },
  {
    "id": "prod-soap-25",
    "name": "Savon Basilic Sacré & Feuilles Vertes (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Plantes Nobles",
    "badgeClass": "badge-promo",
    "rating": 4.7,
    "reviews": 42,
    "reviewsCount": 42,
    "stock": 65,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Feuilles fraîches de Tulsi (Basilic sacré), Palmiste, Karité.",
    "vertus": "Adaptogène cutané, apaise le stress cellulaire et favorise l'harmonie de l'épiderme.",
    "skinType": "Peaux stressées et réactives.",
    "image": "assets/images/products/25.png",
    "fallbackImage": "assets/images/products/25.png",
    "description": "Le basilic sacré d'Afrique rééquilibre les peaux soumises aux agressions du soleil et de la ville.",
    "shortDesc": "Savon harmonisant au basilic sacré.",
    "featured": false
  },
  {
    "id": "prod-soap-26",
    "name": "Savon Bambou de Chine & Charbon Pur (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": null,
    "badge": "Micro-Pores",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 114,
    "reviewsCount": 114,
    "stock": 95,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Charbon de bambou ultrafin, Silice végétale de bambou, Palmiste, Karité.",
    "vertus": "Resserre les pores visibles, effet matifiant longue durée et peau de bébé.",
    "skinType": "Pores dilatés, brillance excessive, grain irrégulier.",
    "image": "assets/images/products/26.png",
    "fallbackImage": "assets/images/products/26.png",
    "description": "Le secret des peaux nettes au charbon de bambou micronisé pour lisser et matifier durablement.",
    "shortDesc": "Savon matifiant au charbon de bambou pur.",
    "featured": true
  },
  {
    "id": "prod-soap-27",
    "name": "Savon Gel Aloe Vera Vierge (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3000,
    "oldPrice": null,
    "badge": "Hydra-Soin",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 98,
    "reviewsCount": 98,
    "stock": 100,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Pulpe fraîche d’aloès, Huile de palmiste saponifiée, Cire d'abeille.",
    "vertus": "Hydrate, régénère les micro-lésions et donne un toucher velours à la peau.",
    "skinType": "Tous types de peaux, indispensable familial.",
    "image": "assets/images/products/27.png",
    "fallbackImage": "assets/images/products/27.png",
    "description": "La douceur du gel d'aloès naturel dans un format quotidien de 100g adapté à toute la famille.",
    "shortDesc": "Savon hydratant quotidien à la pulpe d’aloès.",
    "featured": false
  },
  {
    "id": "prod-soap-28",
    "name": "Savon Nicotinamide B3 & Arbutine (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 4000,
    "oldPrice": 5000,
    "badge": "Anti-Taches Expert",
    "badgeClass": "badge-bestseller",
    "rating": 5,
    "reviews": 142,
    "reviewsCount": 142,
    "stock": 90,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Niacinamide (Vitamine B3), Alpha-Arbutine d’origine végétale, Palmiste, Karité.",
    "vertus": "Estompe radicalement les taches de mélasma, régule la mélanine sans agression et illumine le teint.",
    "skinType": "Taches pigmentaires tenaces, masque de grossesse, hyperpigmentation post-inflammatoire.",
    "image": "assets/images/products/28.png",
    "fallbackImage": "assets/images/products/28.png",
    "description": "La formule dermo-cosmétique la plus avancée pour corriger les taches et uniformiser le teint avec respect.",
    "shortDesc": "Savon traitant expert à la vitamine B3 et arbutine.",
    "featured": true
  },
  {
    "id": "prod-soap-29",
    "name": "Savon Aspirine & Acide Salicylique (100 g)",
    "brand": "ETS Marie Andrea",
    "merchant": "ETS Marie Andrea",
    "merchantId": "ets-marie-andrea",
    "category": "savons",
    "categoryName": "Savons Saponifiés à Froid",
    "price": 3500,
    "oldPrice": 4500,
    "badge": "Peau Lisse",
    "badgeClass": "badge-new",
    "rating": 4.9,
    "reviews": 108,
    "reviewsCount": 108,
    "stock": 85,
    "status": "in_stock",
    "weight": "100 g",
    "composition": "Acide salicylique d’écorce de saule blanc (aspirine végétale), Palmiste, Karité.",
    "vertus": "Lisse le microrelief cutané, désobstrue les pores et prévient les poils incarnés.",
    "skinType": "Poils incarnés, peau granuleuse, acné corporelle.",
    "image": "assets/images/products/29.png",
    "fallbackImage": "assets/images/products/29.png",
    "description": "Une action kératolytique douce pour lisser les irrégularités de la peau et stopper les poils incarnés.",
    "shortDesc": "Savon lissant à l’acide salicylique végétal.",
    "featured": true
  }
];

// Product Store with LocalStorage Persistence
const ProductStore = {
  STORAGE_VERSION: 'v5.2',
  STORAGE_KEY: 'abp_products_catalog_v5',

  getAll: function() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge default products with stored customizations (preserve user uploads, prices, custom images, gallery)
          const merged = DEFAULT_PRODUCTS.map(defP => {
            const saved = parsed.find(s => s.id === defP.id || String(s.id) === String(defP.id));
            if (!saved) return defP;
            return {
              ...defP,
              ...saved,
              image: saved.image || defP.image,
              images: (Array.isArray(saved.images) && saved.images.length > 0) ? saved.images : defP.images
            };
          });

          // Also keep any newly created user products not present in DEFAULT_PRODUCTS
          const customUserProducts = parsed.filter(p => !DEFAULT_PRODUCTS.some(d => d.id === p.id || String(d.id) === String(p.id)));
          const finalList = [...merged, ...customUserProducts];

          // Re-hydrate images & gallery from IndexedDB cache
          if (typeof ABPStorage !== 'undefined' && ABPStorage.cache) {
            finalList.forEach(p => {
              // Main image
              if (p.image && p.image.startsWith('idb:')) {
                const cached = ABPStorage.getImage(p.image.replace('idb:', ''));
                if (cached) p.image = cached;
              } else {
                const cached = ABPStorage.getImage('prod_img_' + p.id);
                if (cached) p.image = cached;
              }

              // Multi-image gallery
              if (Array.isArray(p.images)) {
                p.images = p.images.map((img, i) => {
                  if (img && img.startsWith('idb:')) {
                    const cached = ABPStorage.getImage(img.replace('idb:', ''));
                    return cached || img;
                  } else {
                    const cached = ABPStorage.getImage('prod_img_' + p.id + '_' + i);
                    return cached || img;
                  }
                });
              }
            });
          }

          try {
            localStorage.setItem('abp_catalog_version', this.STORAGE_VERSION);
          } catch(e) {}
          return finalList;
        }
      }
    } catch(e) {
      console.warn('Could not read product storage, using defaults', e);
    }
    this.save(DEFAULT_PRODUCTS);
    try {
      localStorage.setItem('abp_catalog_version', this.STORAGE_VERSION);
    } catch(e) {}
    return DEFAULT_PRODUCTS;
  },

  getFeatured: function() {
    return this.getAll().filter(p => p.featured);
  },

  getByCategory: function(category) {
    if (!category || category === 'all') return this.getAll();
    return this.getAll().filter(p => p.category === category);
  },

  getById: function(id) {
    const p = this.getAll().find(prod => prod.id === id || String(prod.id) === String(id));
    if (p) {
      if (typeof ABPStorage !== 'undefined') {
        // Main image hydration
        const idbKey = (p.image && p.image.startsWith('idb:')) ? p.image.replace('idb:', '') : ('prod_img_' + p.id);
        const cached = ABPStorage.getImage(idbKey);
        if (cached) {
          p.image = cached;
        } else if (p.image && p.image.startsWith('idb:')) {
          p.image = p.fallbackImage || 'assets/images/products/1.png';
        }

        // Multi-image gallery hydration
        if (Array.isArray(p.images)) {
          p.images = p.images.map((img, i) => {
            if (img && img.startsWith('idb:')) {
              const cachedG = ABPStorage.getImage(img.replace('idb:', ''));
              return cachedG || img;
            } else {
              const cachedG = ABPStorage.getImage('prod_img_' + p.id + '_' + i);
              return cachedG || img;
            }
          });
        }
      } else if (p.image && p.image.startsWith('idb:')) {
        p.image = p.fallbackImage || 'assets/images/products/1.png';
      }
    }
    return p;
  },

  save: function(products) {
    try {
      if (typeof ABPStorage !== 'undefined') {
        // 1. Move ALL base64 blobs (main image + gallery) to IndexedDB; replace with idb: pointer in JSON
        const slim = products.map(p => {
          let updatedImage = p.image;
          if (p.image && p.image.startsWith('data:')) {
            ABPStorage.setImage('prod_img_' + p.id, p.image);
            updatedImage = 'idb:prod_img_' + p.id;
          }

          let updatedImages = p.images;
          if (Array.isArray(p.images)) {
            updatedImages = p.images.map((img, i) => {
              if (img && img.startsWith('data:')) {
                const k = 'prod_img_' + p.id + '_' + i;
                ABPStorage.setImage(k, img);
                return 'idb:' + k;
              }
              return img;
            });
          }

          return Object.assign({}, p, {
            image: updatedImage,
            images: updatedImages
          });
        });
        // 2. Save lean JSON (no base64) so localStorage never hits quota
        ABPStorage.safeSetItem(this.STORAGE_KEY, JSON.stringify(slim));
      } else {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('abp_products_updated', { detail: products }));
      }
    } catch(e) {
      console.error('Failed to save products', e);
    }
  },

  add: function(product) {
    const products = this.getAll();
    if (!product.id) {
      product.id = 'prod-' + Date.now();
    }
    if (product.image && product.image.startsWith('data:') && typeof ABPStorage !== 'undefined') {
      ABPStorage.setImage('prod_img_' + product.id, product.image);
    }
    if (Array.isArray(product.images) && typeof ABPStorage !== 'undefined') {
      product.images.forEach((img, i) => {
        if (img && img.startsWith('data:')) {
          ABPStorage.setImage('prod_img_' + product.id + '_' + i, img);
        }
      });
    }
    products.unshift(product);
    this.save(products);
    return product;
  },

  update: function(id, data) {
    const products = this.getAll();
    const idx = products.findIndex(p => p.id === id || String(p.id) === String(id));
    if (idx !== -1) {
      if (data.image && data.image.startsWith('data:') && typeof ABPStorage !== 'undefined') {
        ABPStorage.setImage('prod_img_' + id, data.image);
      }
      if (Array.isArray(data.images) && typeof ABPStorage !== 'undefined') {
        data.images.forEach((img, i) => {
          if (img && img.startsWith('data:')) {
            ABPStorage.setImage('prod_img_' + id + '_' + i, img);
          }
        });
      }
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
      (p.categoryName || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
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
