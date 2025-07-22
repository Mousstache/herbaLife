import { Dimensions, PixelRatio } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Catégories d'écrans
export const SCREEN_CATEGORIES = {
  SMALL: screenWidth < 350,      // iPhone SE, petits Android
  MEDIUM: screenWidth >= 350 && screenWidth < 414,  // iPhone standard
  LARGE: screenWidth >= 414 && screenWidth < 500,   // iPhone Plus/Pro Max
  TABLET: screenWidth >= 500     // Tablettes
};

// Fonctions de responsive design
export const responsive = {
  // Largeur d'écran
  width: screenWidth,
  height: screenHeight,
  
  // Tailles de police adaptives
  fontSize: {
    small: screenWidth < 350 ? 12 : 14,
    medium: screenWidth < 350 ? 14 : 16,
    large: screenWidth < 350 ? 18 : 20,
    title: screenWidth < 350 ? 24 : 28,
    bigTitle: screenWidth < 350 ? 28 : 32
  },
  
  // Espacements adaptatifs
  spacing: {
    xs: screenWidth < 350 ? 4 : 6,
    sm: screenWidth < 350 ? 8 : 12,
    md: screenWidth < 350 ? 12 : 16,
    lg: screenWidth < 350 ? 16 : 20,
    xl: screenWidth < 350 ? 20 : 24,
    xxl: screenWidth < 350 ? 24 : 32
  },
  
  // Padding adaptatif
  padding: {
    container: screenWidth < 350 ? 16 : 20,
    card: screenWidth < 350 ? 12 : 16,
    button: screenWidth < 350 ? 12 : 16
  },
  
  // Colonnes adaptatives
  columns: {
    contraindications: screenWidth < 350 ? 1 : 2,
    bodyZones: screenWidth < 350 ? 1 : 2,
    plants: 1 // Toujours 1 colonne pour les plantes (trop de contenu)
  },
  
  // Largeur des éléments en grille
  itemWidth: (columns: number = 2): string => {
    if (columns === 1) return '100%';
    const gap = screenWidth < 350 ? 8 : 12;
    const padding = screenWidth < 350 ? 16 : 20;
    const availableWidth = screenWidth - (padding * 2) - gap;
    return `${(availableWidth / columns)}px`;
  },
  
  // Taille des emojis
  emojiSize: screenWidth < 350 ? 28 : 32,
  
  // Bordures
  borderRadius: {
    small: screenWidth < 350 ? 12 : 16,
    medium: screenWidth < 350 ? 16 : 20,
    large: screenWidth < 350 ? 20 : 24
  },
  
  // Ombres
  shadow: {
    small: {
      shadowOffset: { width: 0, height: screenWidth < 350 ? 2 : 4 },
      shadowOpacity: 0.08,
      shadowRadius: screenWidth < 350 ? 4 : 8,
      elevation: screenWidth < 350 ? 2 : 4,
    },
    medium: {
      shadowOffset: { width: 0, height: screenWidth < 350 ? 4 : 6 },
      shadowOpacity: 0.1,
      shadowRadius: screenWidth < 350 ? 6 : 12,
      elevation: screenWidth < 350 ? 3 : 6,
    }
  }
};

// Hook pour détecter l'orientation
export const getOrientation = () => {
  return screenWidth > screenHeight ? 'landscape' : 'portrait';
};

// Fonction pour calculer des pourcentages d'écran
export const wp = (percentage: number): number => {
  return (screenWidth * percentage) / 100;
};

export const hp = (percentage: number): number => {
  return (screenHeight * percentage) / 100;
};

// Fonction pour normaliser les tailles selon la densité d'écran
export const normalize = (size: number): number => {
  const scale = screenWidth / 320; // Base sur iPhone SE
  const newSize = size * scale;
  
  if (PixelRatio.get() >= 3 && screenWidth >= 400) {
    return newSize * 0.95; // Légère réduction sur les grands écrans haute densité
  }
  if (PixelRatio.get() >= 2 && screenWidth < 350) {
    return newSize * 1.1; // Légère augmentation sur les petits écrans
  }
  
  return newSize;
};
