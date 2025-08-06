/**
 * Images de plantes importées statiquement pour React Native
 */

// Import des images les plus courantes
// Note: Cette approche nécessite des imports statiques connus à l'avance

export const PLANT_IMAGES: { [key: string]: any } = {
  // Les images doivent être importées une par une avec require()
  // 'ginkgo-biloba': require('../assets/images/ginkgo-biloba.jpg'),
  // 'curcuma': require('../assets/images/curcuma.jpg'),
  // etc.
};

// Pour l'instant, utilisons une approche avec des URLs pour les images web
export const getPlantImageUrl = (imageName: string): string => {
  // En mode développement, utiliser l'URL du serveur Metro
  if (__DEV__) {
    return `http://localhost:8081/assets/images/${imageName}.jpg`;
  }
  
  // En production, utiliser les assets empaquetés
  return `/assets/images/${imageName}.jpg`;
};

// Liste des images disponibles (synchronisée avec le contenu du dossier images)
export const AVAILABLE_PLANT_IMAGES = [
  'achillee-millefeuille',
  'agaricus-blazei',
  'aigremoine',
  'ail-des-ours',
  'aloe-vera',
  'angelique',
  'anis-vert',
  'arnica',
  'artichaut',
  'aubepine',
  'baies-dargousier',
  'baies-de-goji',
  'bambou-tabashir',
  'baobab',
  'bardane',
  'basilic-sacre-tulsi',
  'brocoli',
  'camomille-allemande',
  'camomille-romaine',
  'cannelle',
  'capucine',
  'cardamome',
  'carotte',
  'celeri',
  'chicoree',
  'chou-kale',
  'chrysanthellum-americain',
  'citronnelle',
  'clou-de-girofle',
  'cordyceps-militaris',
  'coriandre',
  'cresson',
  'criniere-de-lion',
  'cumin',
  'curcuma',
  'cynorrhodon',
  'dulse',
  'echinacee',
  'eglantier',
  'eleutherocoque',
  'epices-quatre-epices',
  'epinard',
  'erable',
  'eucalyptus',
  'fenouil-doux',
  'fenugrec',
  'feuilles-de-framboisier',
  'fumeterre',
  'gentiane',
  'gingembre',
  'ginkgo-biloba',
  'ginseng',
  'gotu-kola',
  'graines-de-chanvre',
  'graines-de-citrouille',
  'graines-de-sesame',
  'graines-de-tournesol',
  'hamamelis',
  'harpagophyton',
  'houblon',
  'kombu',
  'lavande',
  'lavande-vraie',
  'lierre-terrestre',
  'liveche',
  'maca',
  'maitake',
  'mauve',
  'mauve-sylvestre',
  'melisse',
  'menthe-poivree',
  'millepertuis',
  'moringa',
  'mousse-dirlande',
  'mures-sauvages',
  'myrtilles-sauvages',
  'nigelle',
  'olivier',
  'oranger',
  'origan',
  'ortie',
  'paille-davoine',
  'pamplemousse',
  'passiflore',
  'pensee-sauvage',
  'pin-sylvestre',
  'plantain-lanceole',
  'poivre-noir',
  'pourpier',
  'prele',
  'propolis',
  'psyllium-blond',
  'quinoa',
  'radis-noir',
  'reglisse',
  'reine-des-pres',
  'reishi',
  'rhodiola',
  'romarin',
  'rooibos',
  'sauge-officinale',
  'sauge-sclaree',
  'saule-blanc',
  'serpolet',
  'shiitake',
  'souci-calendula',
  'spiruline',
  'sureau-noir',
  'the-vert',
  'thym',
  'tilleul',
  'trefle-rouge',
  'tussilage',
  'valeriane',
  'verge-dor',
  'verveine-odorante',
  'vigne-rouge',
  'wakame',
  'yerba-mate'
];

// Fonction pour vérifier si une image est disponible
export const isPlantImageAvailable = (imageName: string): boolean => {
  return AVAILABLE_PLANT_IMAGES.includes(imageName);
};
