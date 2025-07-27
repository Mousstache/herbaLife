import React from 'react';
import { useResponsiveDimensions } from './useResponsive';

// Hook spécialement conçu pour l'adaptabilité sur différents portables
export const usePortableAdaptiveStyles = () => {
  const { width, height, category, orientation } = useResponsiveDimensions();
  
  // Détection intelligente du type d'appareil portable
  const deviceType = React.useMemo(() => {
    if (width < 380) return 'compact';     // iPhone SE, petits Android (320-379px)
    if (width < 450) return 'standard';    // iPhone 12/13/14, Android moyen (380-449px)
    if (width < 550) return 'large';       // iPhone Plus/Pro Max, grands Android (450-549px)
    if (width < 800) return 'tablet';      // Petites tablettes, pliables (550-799px)
    return 'desktop';                      // Grandes tablettes, ordinateurs (800px+)
  }, [width]);

  // Adaptation dynamique selon l'orientation
  const orientationAware = React.useMemo(() => ({
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    shouldUseColumns: orientation === 'landscape' && width > 600,
  }), [orientation, width]);

  return {
    // Informations sur l'appareil
    deviceType,
    ...orientationAware,
    
    // Helpers pour les conditions
    isCompact: deviceType === 'compact',
    isStandard: deviceType === 'standard', 
    isLarge: deviceType === 'large',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    
    // Dimensions optimisées selon l'appareil
    dimensions: {
      buttonHeight: deviceType === 'compact' ? 40 : 
                   deviceType === 'standard' ? 44 : 
                   deviceType === 'large' ? 48 : 52,
      
      inputHeight: deviceType === 'compact' ? 36 : 
                  deviceType === 'standard' ? 40 : 
                  deviceType === 'large' ? 44 : 48,
      
      cardMinHeight: deviceType === 'compact' ? 80 : 
                    deviceType === 'standard' ? 90 : 
                    deviceType === 'large' ? 100 : 110,
      
      headerHeight: deviceType === 'compact' ? 50 : 
                   deviceType === 'standard' ? 60 : 
                   deviceType === 'large' ? 70 : 80,
    },
    
    // Espacements optimisés pour différentes tailles
    spacing: {
      container: deviceType === 'compact' ? 12 : 
                deviceType === 'standard' ? 16 : 
                deviceType === 'large' ? 20 : 24,
      
      items: deviceType === 'compact' ? 8 : 
            deviceType === 'standard' ? 12 : 
            deviceType === 'large' ? 16 : 20,
      
      sections: deviceType === 'compact' ? 16 : 
               deviceType === 'standard' ? 20 : 
               deviceType === 'large' ? 24 : 28,
      
      cards: deviceType === 'compact' ? 6 : 
            deviceType === 'standard' ? 8 : 
            deviceType === 'large' ? 10 : 12,
    },
    
    // Colonnes optimales selon la largeur d'écran et l'orientation
    columns: {
      // Pour les cartes principales
      main: orientationAware.isLandscape && width > 600 ? 
            (deviceType === 'compact' ? 2 : 
             deviceType === 'standard' ? 3 : 
             deviceType === 'large' ? 3 : 4) :
            (deviceType === 'compact' ? 1 : 
             deviceType === 'standard' ? 2 : 
             deviceType === 'large' ? 2 : 3),
      
      // Pour les listes d'éléments
      list: deviceType === 'compact' ? 1 : 
            deviceType === 'standard' ? 1 : 
            deviceType === 'large' ? 2 :
            deviceType === 'tablet' ? 2 : 3,
      
      // Pour les contre-indications
      contraindications: deviceType === 'compact' ? 1 : 
                        deviceType === 'standard' ? 2 : 
                        deviceType === 'large' ? 2 :
                        deviceType === 'tablet' ? 3 : 4,
      
      // Pour les symptômes
      symptoms: deviceType === 'compact' ? 2 : 
               deviceType === 'standard' ? 2 : 
               deviceType === 'large' ? 3 :
               deviceType === 'tablet' ? 4 : 5,
    },
    
    // Tailles de police adaptées selon l'écran
    typography: {
      caption: deviceType === 'compact' ? 10 : 12,
      small: deviceType === 'compact' ? 12 : 14,
      body: deviceType === 'compact' ? 14 : 16, 
      subtitle: deviceType === 'compact' ? 16 : 18,
      title: deviceType === 'compact' ? 20 : 24,
      hero: deviceType === 'compact' ? 28 : 32,
      display: deviceType === 'compact' ? 32 : 40,
    },
    
    // Tailles d'icônes et emojis adaptées
    iconSizes: {
      tiny: deviceType === 'compact' ? 12 : 14,
      small: deviceType === 'compact' ? 16 : 20,
      medium: deviceType === 'compact' ? 20 : 24,
      large: deviceType === 'compact' ? 24 : 28,
      xl: deviceType === 'compact' ? 32 : 40,
    },
    
    // Rayons de bordure adaptatifs
    borderRadius: {
      small: deviceType === 'compact' ? 6 : 8,
      medium: deviceType === 'compact' ? 10 : 12,
      large: deviceType === 'compact' ? 14 : 16,
    },
    
    // Ombres adaptatives
    shadows: {
      light: {
        shadowOffset: { width: 0, height: deviceType === 'compact' ? 1 : 2 },
        shadowOpacity: 0.1,
        shadowRadius: deviceType === 'compact' ? 2 : 4,
        elevation: deviceType === 'compact' ? 2 : 3,
      },
      medium: {
        shadowOffset: { width: 0, height: deviceType === 'compact' ? 2 : 4 },
        shadowOpacity: 0.15,
        shadowRadius: deviceType === 'compact' ? 4 : 8,
        elevation: deviceType === 'compact' ? 4 : 6,
      },
    },
    
    // Informations brutes pour calculs personnalisés
    raw: {
      width,
      height,
      category,
      orientation,
    }
  };
};

// Hook pour calculer automatiquement les largeurs d'éléments
export const usePortableItemWidth = (columns?: number, includeGap: boolean = true) => {
  const adaptiveStyles = usePortableAdaptiveStyles();
  
  return React.useMemo(() => {
    const actualColumns = columns || adaptiveStyles.columns.main;
    
    if (actualColumns === 1) return '100%';
    
    const gap = includeGap ? adaptiveStyles.spacing.items : 0;
    const containerPadding = adaptiveStyles.spacing.container;
    const availableWidth = adaptiveStyles.raw.width - (containerPadding * 2) - (gap * (actualColumns - 1));
    
    return Math.floor(availableWidth / actualColumns);
  }, [columns, adaptiveStyles, includeGap]);
};
