import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { responsive } from '../../utils/responsive';

interface ModernButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" size="small" />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsive.borderRadius.medium,
    paddingHorizontal: responsive.spacing.lg,
  },

  // Variants
  primary: {
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  secondary: {
    backgroundColor: '#64748b',
  },
  secondaryText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  outlineText: {
    color: '#22c55e',
    fontWeight: '600',
  },

  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: '#22c55e',
    fontWeight: '600',
  },

  // Sizes
  small: {
    paddingVertical: responsive.spacing.sm,
    minHeight: 36,
  },
  smallText: {
    fontSize: responsive.fontSize.small,
  },

  medium: {
    paddingVertical: responsive.spacing.md,
    minHeight: 44,
  },
  mediumText: {
    fontSize: responsive.fontSize.medium,
  },

  large: {
    paddingVertical: responsive.spacing.lg,
    minHeight: 52,
  },
  largeText: {
    fontSize: responsive.fontSize.large,
  },

  // States
  disabled: {
    backgroundColor: '#e2e8f0',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    color: '#94a3b8',
  },
});
