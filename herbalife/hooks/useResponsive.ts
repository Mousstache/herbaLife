import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { responsive, getScreenCategory, getOrientation } from '../utils/responsive';

// Hook personnalisé pour utiliser les dimensions de manière réactive
export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width,
      height,
      category: getScreenCategory(),
      orientation: getOrientation(),
      isLandscape: getOrientation() === 'landscape',
      isPortrait: getOrientation() === 'portrait'
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
        category: getScreenCategory(),
        orientation: getOrientation(),
        isLandscape: getOrientation() === 'landscape',
        isPortrait: getOrientation() === 'portrait'
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
};

// Hook pour obtenir des styles responsifs
export const useResponsiveStyles = () => {
  const dimensions = useResponsiveDimensions();
  
  return {
    ...responsive,
    ...dimensions,
    
    // Styles utilitaires communs
    container: {
      flex: 1,
      paddingHorizontal: responsive.padding.container,
    },
    
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    card: {
      backgroundColor: '#fff',
      borderRadius: responsive.borderRadius.medium,
      padding: responsive.padding.card,
      ...responsive.shadow.medium,
    },
    
    button: {
      height: responsive.buttonHeight.medium,
      minWidth: responsive.minButtonWidth,
      borderRadius: responsive.borderRadius.small,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: responsive.padding.button,
    },
    
    // Grilles adaptatives
    grid: (columns?: number) => ({
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsive.spacing.sm,
      justifyContent: columns === 1 ? 'center' : 'space-between',
    }),
    
    gridItem: (columns?: number) => ({
      width: responsive.itemWidth(columns),
      marginBottom: responsive.spacing.sm,
    }),
  };
};

// Hook pour des valeurs responsives personnalisées
export const useResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
}) => {
  const { category } = useResponsiveDimensions();
  
  // Retourner la valeur appropriée selon la taille d'écran
  if (category === 'XXL' && values.xxl !== undefined) return values.xxl;
  if (category === 'XL' && values.xl !== undefined) return values.xl;
  if (category === 'LG' && values.lg !== undefined) return values.lg;
  if (category === 'MD' && values.md !== undefined) return values.md;
  if (category === 'SM' && values.sm !== undefined) return values.sm;
  if (values.xs !== undefined) return values.xs;
  
  // Fallback sur la première valeur disponible
  return values.xs || values.sm || values.md || values.lg || values.xl || values.xxl;
};

// Hook pour gérer les colonnes adaptatives
export const useAdaptiveColumns = (minItemWidth: number, gap?: number) => {
  const dimensions = useResponsiveDimensions();
  
  const columns = Math.floor(
    (dimensions.width - (responsive.padding.container * 2) + (gap || responsive.spacing.sm)) /
    (minItemWidth + (gap || responsive.spacing.sm))
  );
  
  return Math.max(1, columns);
};
