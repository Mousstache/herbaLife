import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface MobileAdaptiveStyles {
  isMobile: boolean;
  isTablet: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  deviceCategory: 'phone' | 'tablet' | 'desktop';
  safeSpacing: number;
  contentPadding: number;
  titleSize: number;
  bodySize: number;
  buttonSize: number;
  iconSize: number;
}

export const useMobileResponsive = (): MobileAdaptiveStyles => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const orientation = width > height ? 'landscape' : 'portrait';
  
  // Catégorie de périphérique
  const deviceCategory = width < 768 ? 'phone' : width < 1024 ? 'tablet' : 'desktop';

  // Espacement sécurisé adaptatif
  const safeSpacing = (() => {
    if (width < 375) return 12; // Très petits écrans
    if (width < 428) return 16; // Écrans mobile standard
    if (width < 768) return 20; // Grands mobiles
    return 24; // Tablettes
  })();

  // Padding de contenu adaptatif
  const contentPadding = (() => {
    if (width < 375) return 16; // iPhone SE
    if (width < 428) return 20; // iPhone standard
    if (width < 768) return 24; // Grands mobiles
    return 32; // Tablettes
  })();

  // Tailles de texte adaptatives
  const titleSize = (() => {
    if (width < 375) return 20; // Très petits écrans
    if (width < 428) return 24; // Écrans mobile standard
    if (width < 768) return 28; // Grands mobiles
    return 32; // Tablettes
  })();

  const bodySize = (() => {
    if (width < 375) return 14; // Très petits écrans
    if (width < 428) return 16; // Écrans mobile standard
    if (width < 768) return 17; // Grands mobiles
    return 18; // Tablettes
  })();

  const buttonSize = (() => {
    if (width < 375) return 16; // Très petits écrans
    if (width < 428) return 18; // Écrans mobile standard
    if (width < 768) return 19; // Grands mobiles
    return 20; // Tablettes
  })();

  const iconSize = (() => {
    if (width < 375) return 20; // Très petits écrans
    if (width < 428) return 24; // Écrans mobile standard
    if (width < 768) return 28; // Grands mobiles
    return 32; // Tablettes
  })();

  return {
    isMobile,
    isTablet,
    screenWidth: width,
    screenHeight: height,
    orientation,
    deviceCategory,
    safeSpacing,
    contentPadding,
    titleSize,
    bodySize,
    buttonSize,
    iconSize,
  };
};

// Hook spécialisé pour la mise en page des cartes
export const useCardLayout = () => {
  const mobile = useMobileResponsive();
  
  return {
    ...mobile,
    cardColumns: mobile.isMobile ? 1 : mobile.isTablet ? 2 : 3,
    cardSpacing: mobile.isMobile ? 12 : 16,
    cardPadding: mobile.isMobile ? 16 : 20,
    cardBorderRadius: mobile.isMobile ? 12 : 16,
    cardMinHeight: mobile.isMobile ? 120 : 160,
    cardDirection: mobile.isMobile ? 'row' : 'column' as 'row' | 'column',
  };
};

// Hook pour les boutons adaptatifs
export const useButtonStyles = () => {
  const mobile = useMobileResponsive();
  
  return {
    ...mobile,
    buttonHeight: mobile.isMobile ? 48 : 52,
    buttonPadding: mobile.isMobile ? 16 : 20,
    buttonRadius: mobile.isMobile ? 12 : 16,
    buttonFontSize: mobile.buttonSize,
    buttonMinWidth: mobile.isMobile ? '100%' : 'auto',
  };
};
