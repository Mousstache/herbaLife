import React from 'react';
import { View, ViewStyle, StyleSheet, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useResponsiveStyles, useResponsiveDimensions } from '../hooks/useResponsive';
import { responsive, BREAKPOINTS } from '../utils/responsive';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  variant?: 'container' | 'grid' | 'flex' | 'fullscreen' | 'centered' | 'adaptive';
  columns?: number;
  gap?: number;
  padding?: boolean | 'sm' | 'md' | 'lg';
  style?: ViewStyle | ViewStyle[];
  scrollable?: boolean;
  safeArea?: boolean;
  maxWidth?: number;
  backgroundColor?: string;
  centerContent?: boolean;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  variant = 'container',
  columns,
  gap,
  padding = true,
  style,
  scrollable = false,
  safeArea = true,
  maxWidth,
  backgroundColor = '#f8f9f5',
  centerContent = false
}) => {
  const responsiveStyles = useResponsiveStyles();
  const { width, height, category, orientation } = useResponsiveDimensions();

  // Calcul du padding adaptatif
  const getPaddingValue = () => {
    if (padding === false) return 0;
    if (padding === 'sm') return responsiveStyles.padding.sm;
    if (padding === 'md') return responsiveStyles.padding.md;
    if (padding === 'lg') return responsiveStyles.padding.lg;
    return responsiveStyles.padding.container;
  };

  // Adaptation automatique des colonnes selon la largeur d'écran
  const getAdaptiveColumns = () => {
    if (columns) return columns;
    
    // Calcul intelligent basé sur la largeur d'écran
    if (width < BREAKPOINTS.SM) return 1;
    if (width < BREAKPOINTS.MD) return 2;
    if (width < BREAKPOINTS.LG) return 2;
    if (width < BREAKPOINTS.XL) return 3;
    return 4;
  };

  const getLayoutStyles = (): ViewStyle => {
    const paddingValue = getPaddingValue();
    const adaptiveColumns = getAdaptiveColumns();
    
    const baseStyles: ViewStyle = {
      backgroundColor,
      ...(paddingValue > 0 && { 
        paddingHorizontal: paddingValue,
        paddingVertical: responsiveStyles.padding.sm 
      })
    };

    // Centrage automatique sur grands écrans
    const centeringStyles: ViewStyle = centerContent && width > BREAKPOINTS.LG ? {
      alignSelf: 'center',
      maxWidth: maxWidth || Math.min(width * 0.85, 1200),
      width: '100%',
    } : {};

    switch (variant) {
      case 'container':
        return {
          ...baseStyles,
          ...centeringStyles,
          flex: 1,
        };
        
      case 'grid':
        return {
          ...baseStyles,
          ...centeringStyles,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: gap || responsiveStyles.spacing.md,
          justifyContent: adaptiveColumns === 1 ? 'center' : 'space-between',
          alignContent: 'flex-start',
        };
        
      case 'flex':
        return {
          ...baseStyles,
          ...centeringStyles,
          flex: 1,
          flexDirection: 'column',
        };

      case 'adaptive':
        // Mise en page qui s'adapte automatiquement
        return {
          ...baseStyles,
          ...centeringStyles,
          flex: 1,
          flexDirection: width > height && width > BREAKPOINTS.LG ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: gap || responsiveStyles.spacing.md,
        };

      // Composant final avec support de scroll et safe area
  const ContainerComponent = safeArea ? SafeAreaView : View;
  const ContentComponent = scrollable ? ScrollView : View;

  const finalStyles = StyleSheet.flatten([getLayoutStyles(), style]);

  const scrollProps = scrollable ? {
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 },
    keyboardShouldPersistTaps: 'handled' as const,
  } : {};

  return (
    <ContainerComponent style={{ flex: 1, backgroundColor }}>
      <ContentComponent
        style={scrollable ? { flex: 1 } : finalStyles}
        contentContainerStyle={scrollable ? finalStyles : undefined}
        {...scrollProps}
      >
        {children}
      </ContentComponent>
    </ContainerComponent>
  );
};
  };
        
      case 'fullscreen':
        return {
          flex: 1,
          width: '100%',
          height: '100%',
        };
        
      default:
        return baseStyles;
    }
  };

  return (
    <View style={[getLayoutStyles(), style]}>
      {children}
    </View>
  );
};

interface ResponsiveGridItemProps {
  children: React.ReactNode;
  columns?: number;
  style?: ViewStyle | ViewStyle[];
}

export const ResponsiveGridItem: React.FC<ResponsiveGridItemProps> = ({
  children,
  columns,
  style
}) => {
  const responsive = useResponsiveStyles();

  const itemStyle: ViewStyle = {
    width: parseFloat(responsive.itemWidth(columns)) || '100%',
    marginBottom: responsive.spacing.sm,
  };

  return (
    <View style={[itemStyle, style]}>
      {children}
    </View>
  );
};

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'xs' | 'small' | 'medium' | 'large' | 'title' | 'bigTitle' | 'hero';
  style?: any;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'medium',
  style
}) => {
  const responsive = useResponsiveStyles();

  const textStyle = {
    fontSize: responsive.fontSize[variant],
    ...style
  };

  return (
    <Text style={textStyle}>
      {children}
    </Text>
  );
};
