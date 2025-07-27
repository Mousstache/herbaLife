import { Dimensions, PixelRatio } from 'react-native';

// Obtenir les dimensions de l'écran de manière dynamique
const getDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

let { width: screenWidth, height: screenHeight } = getDimensions();

// Mise à jour des dimensions lors de changements d'orientation
Dimensions.addEventListener('change', ({ window }) => {
  screenWidth = window.width;
  screenHeight = window.height;
});

// Points de rupture standardisés (breakpoints)
export const BREAKPOINTS = {
  XS: 320,   // Très petits écrans (iPhone SE)
  SM: 375,   // Petits écrans (iPhone standard)
  MD: 414,   // Écrans moyens (iPhone Plus)
  LG: 768,   // Tablettes
  XL: 1024,  // Grandes tablettes
  XXL: 1200  // Très grandes tablettes/Desktop
};

// Catégories d'écrans améliorées
export const getScreenCategory = () => {
  if (screenWidth < BREAKPOINTS.XS) return 'XS';
  if (screenWidth < BREAKPOINTS.SM) return 'SM';  
  if (screenWidth < BREAKPOINTS.MD) return 'MD';
  if (screenWidth < BREAKPOINTS.LG) return 'LG';
  if (screenWidth < BREAKPOINTS.XL) return 'XL';
  return 'XXL';
};

export const SCREEN_CATEGORIES = {
  XS: screenWidth < BREAKPOINTS.XS,
  SM: screenWidth >= BREAKPOINTS.XS && screenWidth < BREAKPOINTS.SM,
  MD: screenWidth >= BREAKPOINTS.SM && screenWidth < BREAKPOINTS.MD,
  LG: screenWidth >= BREAKPOINTS.MD && screenWidth < BREAKPOINTS.LG,
  XL: screenWidth >= BREAKPOINTS.LG && screenWidth < BREAKPOINTS.XL,
  XXL: screenWidth >= BREAKPOINTS.XL
};

// Fonction pour obtenir des valeurs responsives
const getResponsiveValue = (values: {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}) => {
  const category = getScreenCategory();
  
  // Retourner la valeur appropriée selon la taille d'écran
  if (category === 'XXL' && values.xxl !== undefined) return values.xxl;
  if (category === 'XL' && values.xl !== undefined) return values.xl;
  if (category === 'LG' && values.lg !== undefined) return values.lg;
  if (category === 'MD' && values.md !== undefined) return values.md;
  if (category === 'SM' && values.sm !== undefined) return values.sm;
  if (values.xs !== undefined) return values.xs;
  
  // Fallback sur la première valeur disponible
  return values.xs || values.sm || values.md || values.lg || values.xl || values.xxl || 0;
};

// Fonctions de responsive design améliorées
export const responsive = {
  // Dimensions actuelles
  get width() { return screenWidth; },
  get height() { return screenHeight; },
  get category() { return getScreenCategory(); },
  
  // Tailles de police ultra-adaptatives
  fontSize: {
    get xs() { return getResponsiveValue({ xs: 10, sm: 11, md: 12, lg: 13, xl: 14, xxl: 15 }); },
    get small() { return getResponsiveValue({ xs: 12, sm: 13, md: 14, lg: 15, xl: 16, xxl: 17 }); },
    get medium() { return getResponsiveValue({ xs: 14, sm: 15, md: 16, lg: 17, xl: 18, xxl: 20 }); },
    get large() { return getResponsiveValue({ xs: 16, sm: 18, md: 20, lg: 22, xl: 24, xxl: 26 }); },
    get title() { return getResponsiveValue({ xs: 20, sm: 24, md: 28, lg: 32, xl: 36, xxl: 40 }); },
    get bigTitle() { return getResponsiveValue({ xs: 24, sm: 28, md: 32, lg: 36, xl: 42, xxl: 48 }); },
    get hero() { return getResponsiveValue({ xs: 28, sm: 32, md: 36, lg: 42, xl: 48, xxl: 54 }); }
  },
  
  // Espacements ultra-adaptatifs
  spacing: {
    get xs() { return getResponsiveValue({ xs: 2, sm: 4, md: 4, lg: 6, xl: 8, xxl: 10 }); },
    get sm() { return getResponsiveValue({ xs: 4, sm: 6, md: 8, lg: 10, xl: 12, xxl: 16 }); },
    get md() { return getResponsiveValue({ xs: 8, sm: 10, md: 12, lg: 16, xl: 20, xxl: 24 }); },
    get lg() { return getResponsiveValue({ xs: 12, sm: 16, md: 20, lg: 24, xl: 28, xxl: 32 }); },
    get xl() { return getResponsiveValue({ xs: 16, sm: 20, md: 24, lg: 28, xl: 32, xxl: 40 }); },
    get xxl() { return getResponsiveValue({ xs: 20, sm: 24, md: 28, lg: 32, xl: 40, xxl: 48 }); }
  },
  
  // Padding ultra-adaptatif
  padding: {
    get xs() { return getResponsiveValue({ xs: 4, sm: 6, md: 8, lg: 10, xl: 12, xxl: 16 }); },
    get sm() { return getResponsiveValue({ xs: 8, sm: 10, md: 12, lg: 14, xl: 16, xxl: 20 }); },
    get md() { return getResponsiveValue({ xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 }); },
    get lg() { return getResponsiveValue({ xs: 16, sm: 18, md: 20, lg: 22, xl: 24, xxl: 28 }); },
    get xl() { return getResponsiveValue({ xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 32 }); },
    get container() { return getResponsiveValue({ xs: 16, sm: 18, md: 20, lg: 24, xl: 28, xxl: 32 }); },
    get card() { return getResponsiveValue({ xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 }); },
    get button() { return getResponsiveValue({ xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 }); }
  },
  
  
  // Colonnes adaptatives intelligentes
  columns: {
    get contraindications() { 
      return getResponsiveValue({ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }); 
    },
    get bodyZones() { 
      return getResponsiveValue({ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }); 
    },
    get plants() { 
      return getResponsiveValue({ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }); 
    },
    get products() { 
      return getResponsiveValue({ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }); 
    }
  },
  
  // Largeur des éléments en grille (fonction améliorée)
  itemWidth: (columns?: number): string => {
    const actualColumns = columns || responsive.columns.plants;
    if (actualColumns === 1) return '100%';
    
    const gap = responsive.spacing.sm;
    const padding = responsive.padding.container;
    const availableWidth = screenWidth - (padding * 2) - (gap * (actualColumns - 1));
    return `${Math.floor(availableWidth / actualColumns)}px`;
  },
  
  // Tailles d'emojis adaptatives
  get emojiSize() { 
    return getResponsiveValue({ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }); 
  },
  
  // Icônes adaptatives
  iconSize: {
    get small() { return getResponsiveValue({ xs: 16, sm: 18, md: 20, lg: 22, xl: 24, xxl: 26 }); },
    get medium() { return getResponsiveValue({ xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 32 }); },
    get large() { return getResponsiveValue({ xs: 24, sm: 26, md: 28, lg: 32, xl: 36, xxl: 40 }); }
  },
  
  // Bordures adaptatives
  borderRadius: {
    get small() { return getResponsiveValue({ xs: 8, sm: 10, md: 12, lg: 14, xl: 16, xxl: 18 }); },
    get medium() { return getResponsiveValue({ xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 }); },
    get large() { return getResponsiveValue({ xs: 16, sm: 18, md: 20, lg: 22, xl: 24, xxl: 28 }); },
    get circle() { return getResponsiveValue({ xs: 50, sm: 60, md: 70, lg: 80, xl: 90, xxl: 100 }); }
  },
  
  // Ombres adaptatives
  shadow: {
    get small() {
      const offset = getResponsiveValue({ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 8 });
      const radius = getResponsiveValue({ xs: 4, sm: 6, md: 8, lg: 10, xl: 12, xxl: 16 });
      const elevation = getResponsiveValue({ xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 8 });
      
      return {
        shadowOffset: { width: 0, height: offset },
        shadowOpacity: 0.08,
        shadowRadius: radius,
        elevation: elevation,
      };
    },
    get medium() {
      const offset = getResponsiveValue({ xs: 4, sm: 5, md: 6, lg: 8, xl: 10, xxl: 12 });
      const radius = getResponsiveValue({ xs: 6, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 });
      const elevation = getResponsiveValue({ xs: 3, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 });
      
      return {
        shadowOffset: { width: 0, height: offset },
        shadowOpacity: 0.1,
        shadowRadius: radius,
        elevation: elevation,
      };
    },
    get large() {
      const offset = getResponsiveValue({ xs: 6, sm: 8, md: 10, lg: 12, xl: 14, xxl: 16 });
      const radius = getResponsiveValue({ xs: 8, sm: 12, md: 16, lg: 20, xl: 24, xxl: 28 });
      const elevation = getResponsiveValue({ xs: 4, sm: 6, md: 8, lg: 10, xl: 12, xxl: 14 });
      
      return {
        shadowOffset: { width: 0, height: offset },
        shadowOpacity: 0.12,
        shadowRadius: radius,
        elevation: elevation,
      };
    }
  },
  
  // Tailles des boutons adaptatives
  buttonHeight: {
    get small() { return getResponsiveValue({ xs: 32, sm: 36, md: 40, lg: 44, xl: 48, xxl: 52 }); },
    get medium() { return getResponsiveValue({ xs: 40, sm: 44, md: 48, lg: 52, xl: 56, xxl: 60 }); },
    get large() { return getResponsiveValue({ xs: 48, sm: 52, md: 56, lg: 60, xl: 64, xxl: 68 }); }
  },
  
  // Largeur minimale des boutons
  get minButtonWidth() { 
    return getResponsiveValue({ xs: 80, sm: 90, md: 100, lg: 110, xl: 120, xxl: 130 }); 
  }
};

// Hook pour détecter l'orientation de manière dynamique
export const getOrientation = () => {
  const { width, height } = getDimensions();
  return width > height ? 'landscape' : 'portrait';
};

// Fonctions pour calculer des pourcentages d'écran
export const wp = (percentage: number): number => {
  const { width } = getDimensions();
  return (width * percentage) / 100;
};

export const hp = (percentage: number): number => {
  const { height } = getDimensions();
  return (height * percentage) / 100;
};

// Fonction pour normaliser les tailles selon la densité d'écran
export const normalize = (size: number): number => {
  const { width } = getDimensions();
  const scale = width / 320; // Base sur iPhone SE
  const newSize = size * scale;
  
  if (PixelRatio.get() >= 3 && width >= 400) {
    return newSize * 0.95; // Légère réduction sur les grands écrans haute densité
  }
  if (PixelRatio.get() >= 2 && width < 350) {
    return newSize * 1.1; // Légère augmentation sur les petits écrans
  }
  
  return newSize;
};

// Nouvelles fonctions utilitaires pour une meilleure adaptabilité

// Fonction pour obtenir une taille responsive fluide
export const fluidSize = (minSize: number, maxSize: number, minWidth: number = BREAKPOINTS.XS, maxWidth: number = BREAKPOINTS.XXL): number => {
  const { width } = getDimensions();
  
  if (width <= minWidth) return minSize;
  if (width >= maxWidth) return maxSize;
  
  // Interpolation linéaire
  const ratio = (width - minWidth) / (maxWidth - minWidth);
  return minSize + (maxSize - minSize) * ratio;
};

// Fonction pour adapter automatiquement les colonnes selon la largeur disponible
export const getOptimalColumns = (itemMinWidth: number, gap: number = 12, padding: number = 20): number => {
  const { width } = getDimensions();
  const availableWidth = width - (padding * 2);
  const columns = Math.floor((availableWidth + gap) / (itemMinWidth + gap));
  return Math.max(1, columns);
};

// Fonction pour calculer la largeur d'un élément selon le nombre de colonnes
export const getItemWidth = (columns: number, gap: number = 12, padding: number = 20): number => {
  const { width } = getDimensions();
  const availableWidth = width - (padding * 2) - (gap * (columns - 1));
  return Math.floor(availableWidth / columns);
};

// Breakpoint helpers
export const isXS = (): boolean => getDimensions().width < BREAKPOINTS.XS;
export const isSM = (): boolean => {
  const width = getDimensions().width;
  return width >= BREAKPOINTS.XS && width < BREAKPOINTS.SM;
};
export const isMD = (): boolean => {
  const width = getDimensions().width;
  return width >= BREAKPOINTS.SM && width < BREAKPOINTS.MD;
};
export const isLG = (): boolean => {
  const width = getDimensions().width;
  return width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG;
};
export const isXL = (): boolean => {
  const width = getDimensions().width;
  return width >= BREAKPOINTS.LG && width < BREAKPOINTS.XL;
};
export const isXXL = (): boolean => getDimensions().width >= BREAKPOINTS.XL;

// Fonction pour les tailles d'images responsives
export const getImageSize = (type: 'icon' | 'avatar' | 'card' | 'hero') => {
  const category = getScreenCategory();
  
  const sizes = {
    icon: { xs: 20, sm: 22, md: 24, lg: 26, xl: 28, xxl: 32 },
    avatar: { xs: 40, sm: 44, md: 48, lg: 52, xl: 56, xxl: 64 },
    card: { xs: 120, sm: 140, md: 160, lg: 180, xl: 200, xxl: 240 },
    hero: { xs: 200, sm: 240, md: 280, lg: 320, xl: 360, xxl: 400 }
  };
  
  return getResponsiveValue(sizes[type]);
};
