import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../data/DataPlant';
import { useWishlist } from '../contexts/WishlistContext';
import { responsive } from '../utils/responsive';

interface Props {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  const { isProductFavorite, toggleProductFavorite } = useWishlist();
  const isFavorite = product.id ? isProductFavorite(product.id) : false;

  const handleFavoritePress = () => {
    if (product.id) {
      toggleProductFavorite(product);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
        
        {product.id && (
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {product.description}
      </Text>
      
      <Text style={styles.composition} numberOfLines={1}>
        {product.composition}
      </Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Voir le produit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    marginBottom: responsive.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: '#7c9885',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsive.spacing.sm,
  },
  titleSection: {
    flex: 1,
    marginRight: responsive.spacing.sm,
  },
  name: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '600',
    color: '#2d5738',
    marginBottom: 4,
  },
  price: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '700',
    color: '#7c9885',
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteActive: {
    backgroundColor: '#7c9885',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#7c9885',
  },
  favoriteIconActive: {
    color: '#fff',
  },
  description: {
    fontSize: responsive.fontSize.small,
    color: '#5a6b5d',
    lineHeight: responsive.fontSize.small * 1.4,
    marginBottom: responsive.spacing.sm,
  },
  composition: {
    fontSize: responsive.fontSize.small - 1,
    color: '#8a9688',
    fontStyle: 'italic',
    marginBottom: responsive.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewButton: {
    backgroundColor: '#7c9885',
    paddingVertical: responsive.spacing.sm,
    paddingHorizontal: responsive.spacing.md,
    borderRadius: responsive.borderRadius.small,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: responsive.fontSize.small,
    fontWeight: '600',
  },
});
