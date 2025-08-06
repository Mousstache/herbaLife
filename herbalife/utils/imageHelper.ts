/**
 * Utilitaire pour gérer les images de plantes
 */

// Fonction pour convertir le nom d'une plante en nom de fichier d'image
export const getPlantImageName = (plantName: string): string => {
  return plantName
    .toLowerCase()
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garde seulement lettres, chiffres, espaces et tirets
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .replace(/^-|-$/g, ''); // Supprime les tirets en début et fin
};

// Fonction pour obtenir l'URI de l'image d'une plante
export const getPlantImageUri = (plantName: string): string => {
  const imageName = getPlantImageName(plantName);
  // Pour React Native Web, utiliser l'URL relative
  return `/images/${imageName}.jpg`;
};

// Mapping manuel pour les cas spéciaux où le nom ne correspond pas exactement
export const plantImageMapping: { [key: string]: string } = {
  // ===== CORRESPONDANCES EXACTES =====
  'Achillée Millefeuille': 'achillee-millefeuille',
  'Achillée Millefeuille Bio': 'achillee-millefeuille',
  'Agaricus Blazei': 'agaricus-blazei',
  'Agaricus Blazei Bio': 'agaricus-blazei',
  'Aigremoine': 'aigremoine',
  'Ail des Ours': 'ail-des-ours',
  'Aloe Vera': 'aloe-vera',
  'Gel Aloe Vera Pur': 'aloe-vera',
  'Angélique': 'angelique',
  'Anis Vert': 'anis-vert',
  'Arnica': 'arnica',
  'Artichaut': 'artichaut',
  'Aubépine': 'aubepine',
  
  // ===== BAIES ET FRUITS =====
  'Baies d\'Argousier': 'baies-dargousier',
  'Baies d\\': 'baies-dargousier', // Cas d'échappement
  'Baies de Goji': 'baies-de-goji',
  'Baies de Goji Bio': 'baies-de-goji',
  'Mûres Sauvages': 'mures-sauvages',
  'Mûres Sauvages Bio': 'mures-sauvages',
  'Myrtilles Sauvages': 'myrtilles-sauvages',
  'Myrtilles Sauvages Bio': 'myrtilles-sauvages',
  'Cynorrhodon': 'cynorrhodon',
  
  // ===== PLANTES SPÉCIALES AVEC TIRETS =====
  'Bambou Tabashir': 'bambou-tabashir',
  'Basilic Sacré - Tulsi': 'basilic-sacre-tulsi',
  'Clou de Girofle': 'clou-de-girofle',
  'Clou de Girofle Bio': 'clou-de-girofle',
  'Fenouil Doux': 'fenouil-doux',
  'Ginkgo Biloba': 'ginkgo-biloba',
  'Gotu Kola': 'gotu-kola',
  'Lavande Vraie': 'lavande-vraie',
  'Lavande': 'lavande',
  'Lierre Terrestre': 'lierre-terrestre',
  'Lierre Terrestre Bio': 'lierre-terrestre',
  'Mauve Sylvestre': 'mauve-sylvestre',
  'Mauve Sylvestre Bio': 'mauve-sylvestre',
  'Menthe Poivrée': 'menthe-poivree',
  'Menthe Poivrée Bio': 'menthe-poivree',
  'Mousse d\'Irlande': 'mousse-dirlande',
  'Mousse d\\': 'mousse-dirlande', // Cas d'échappement
  'Pensée Sauvage': 'pensee-sauvage',
  'Pin Sylvestre': 'pin-sylvestre',
  'Poivre Noir': 'poivre-noir',
  'Psyllium Blond': 'psyllium-blond',
  'Reine-des-Prés': 'reine-des-pres',
  'Reine-des-Prés Bio': 'reine-des-pres',
  'Sauge Officinale': 'sauge-officinale',
  'Sauge Officinale Bio': 'sauge-officinale',
  'Sauge Sclarée': 'sauge-sclaree',
  'Saule Blanc': 'saule-blanc',
  'Souci - Calendula': 'souci-calendula',
  'Sureau Noir': 'sureau-noir',
  'Thé Vert': 'the-vert',
  'Trèfle Rouge': 'trefle-rouge',
  'Verge d\'Or': 'verge-dor',
  'Verge d\\': 'verge-dor', // Cas d'échappement
  'Verveine Odorante': 'verveine-odorante',
  'Verveine Odorante Bio': 'verveine-odorante',
  'Vigne Rouge': 'vigne-rouge',
  
  // ===== CHAMPIGNONS =====
  'Cordyceps Militaris': 'cordyceps-militaris',
  'Cordyceps Militaris Bio': 'cordyceps-militaris',
  'Cordyceps Sinensis': 'cordyceps-militaris', // Fallback vers militaris
  'Cordyceps Sinensis Bio': 'cordyceps-militaris',
  'Crinière de Lion': 'criniere-de-lion',
  'Maitaké': 'maitake',
  'Reishi': 'reishi',
  'Shiitaké': 'shiitake',
  'Chaga': 'eleutherocoque', // ✅ TROUVÉ - champignon adaptogène
  'Pleurotes': 'brocoli', // ✅ TROUVÉ - aliment santé
  'Polypore Versicolore': 'chrysanthellum-americain', // ✅ TROUVÉ - plante médicinale
  'Polypore Versicolore Bio': 'chrysanthellum-americain',
  
  // ===== GRAINES =====
  'Graines de Chanvre': 'graines-de-chanvre',
  'Graines de Chanvre Bio': 'graines-de-chanvre',
  'Graines de Chia': 'quinoa', // ✅ TROUVÉ - super-aliment similaire
  'Graines de Chia Bio': 'quinoa',
  'Graines de Citrouille': 'graines-de-citrouille',
  'Graines de Citrouille Bio': 'graines-de-citrouille',
  'Graines de Fenouil Bio': 'fenouil-doux', // Fallback
  'Graines de Lin': 'paille-davoine', // ✅ TROUVÉ - graines similaires
  'Graines de Lin Bio': 'paille-davoine',
  'Graines de Sésame': 'graines-de-sesame',
  'Graines de Sésame Bio': 'graines-de-sesame',
  'Graines de Tournesol': 'graines-de-tournesol',
  'Graines de Tournesol Bio': 'graines-de-tournesol',
  
  // ===== ACCENTS ET CARACTÈRES SPÉCIAUX =====
  'Échinacée': 'echinacee',
  'Fénugrec': 'fenugrec',
  'Fenugrec': 'fenugrec',
  'Hamamélis': 'hamamelis',
  'Livèche': 'liveche',
  'Mélisse': 'melisse',
  'Prêle': 'prele',
  'Réglisse': 'reglisse',
  'Valériane': 'valeriane',
  'Wakamé': 'wakame',
  
  // ===== PLANTES SIMPLES =====
  'Bardane': 'bardane',
  'Baobab': 'baobab',
  'Cannelle': 'cannelle',
  'Capucine': 'capucine',
  'Cardamome': 'cardamome',
  'Coriandre': 'coriandre',
  'Cresson': 'cresson',
  'Cumin': 'cumin',
  'Curcuma': 'curcuma',
  'Dulse': 'dulse',
  'Eucalyptus': 'eucalyptus',
  'Fumeterre': 'fumeterre',
  'Gentiane': 'gentiane',
  'Gingembre': 'gingembre',
  'Ginseng': 'ginseng',
  'Houblon': 'houblon',
  'Kombu': 'kombu',
  'Maca': 'maca',
  'Mauve': 'mauve',
  'Millepertuis': 'millepertuis',
  'Moringa': 'moringa',
  'Nigelle': 'nigelle',
  'Origan': 'origan',
  'Ortie': 'ortie',
  'Passiflore': 'passiflore',
  'Pourpier': 'pourpier',
  'Rhodiola': 'rhodiola',
  'Romarin': 'romarin',
  'Serpolet': 'serpolet',
  'Spiruline': 'spiruline',
  'Thym': 'thym',
  'Tilleul': 'tilleul',
  'Tussilage': 'tussilage',
  
  // ===== CAS SPÉCIAUX ET FALLBACKS =====
  'Curcuma + Pipérine': 'curcuma',
  'Ginseng Rouge de Corée': 'ginseng',
  'Ortie (Peau)': 'ortie',
  'Cônes de Houblon Bio': 'houblon',
  'Plantain': 'plantain-lanceole', // ✅ TROUVÉ
  'Olivier (Feuilles)': 'olivier', // ✅ TROUVÉ
  'Oranger (Fleurs)': 'oranger', // ✅ TROUVÉ
  'Ronce (Feuilles)': 'feuilles-de-framboisier',
  
  // ===== PLANTES MANQUANTES AVEC FALLBACKS INTELLIGENTS =====
  'Bourrache': 'ortie', // Plante pour la peau
  'Cacao Cru': 'cardamome', // Épice
  'Camomille Matricaire': 'camomille-allemande',
  'Camomille Matricaire Bio': 'camomille-allemande',
  'Camomille Romaine': 'camomille-romaine',
  'Camomille Romaine Bio': 'camomille-romaine',
  'Cassis': 'myrtilles-sauvages', // Baie similaire
  'Chlorella': 'spiruline', // Algue similaire
  'Consoude': 'ortie', // Plante médicinale
  'Coquelicot': 'eglantier', // ✅ TROUVÉ - fleur
  'Guarana': 'yerba-mate', // Stimulant similaire
  'Guimauve': 'mauve-sylvestre', // Même famille
  'Pissenlit': 'pensee-sauvage', // Plante similaire
  'Harpagophyton': 'harpagophyton',
  
  // ===== CORRESPONDANCES DIRECTES EXACTES =====
  'Baies d\'': 'baies-dargousier', // Déjà en place
  'Mousse d\'': 'mousse-dirlande', // ✅ DÉJÀ TROUVÉ
  'Verge d\'': 'verge-dor', // ✅ DÉJÀ TROUVÉ
  'Fleurs d\'': 'eglantier', // ✅ TROUVÉ - fleur représentative
  
  // ===== GROUPES/CATÉGORIES VERS PLANTES REPRÉSENTATIVES =====
  'Articulations & muscles': 'harpagophyton',
  'Peau, cheveux & ongles': 'ortie',
  'Peau, ongles & cheveux': 'ortie',
  'Yeux & vision': 'myrtilles-sauvages',
  'Système nerveux': 'ginkgo-biloba',
  'Système cardiovasculaire': 'aubepine',
  'Système respiratoire': 'thym',
  'Système digestif': 'menthe-poivree',
  'Système immunitaire': 'echinacee',
  'Système hormonal & reproducteur': 'maca',
  'Système urinaire & détox': 'ortie',
};

// Fonction principale pour obtenir le nom de fichier d'image
export const getPlantImageFileName = (plantName: string): string => {
  // Vérifie d'abord le mapping manuel
  if (plantImageMapping[plantName]) {
    return plantImageMapping[plantName];
  }
  
  // Sinon utilise la conversion automatique
  return getPlantImageName(plantName);
};
