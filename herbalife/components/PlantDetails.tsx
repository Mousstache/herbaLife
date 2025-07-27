import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Plant } from '../data/DataPlant';
import { useWishlist } from '../contexts/WishlistContext';

const { height: screenHeight } = Dimensions.get('window');

interface Props {
  plant: Plant;
  visible: boolean;
  onClose: () => void;
}

export default function PlantDetailModal({ plant, visible, onClose }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;
  const { favoriteProducts, toggleProductFavorite, isProductFavorite, isFavorite, toggleFavorite } = useWishlist();
  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Ne déclencher que si c'est un mouvement vertical vers le bas
      return gestureState.dy > 10 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {
      // Commencer la gestion du geste
    },
    onPanResponderMove: (evt, gestureState) => {
      // Seuls les mouvements vers le bas sont autorisés
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const threshold = screenHeight * 0.25; // 25% de l'écran
      
      if (gestureState.dy > threshold || gestureState.vy > 0.5) {
        // Fermer le modal avec animation
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          translateY.setValue(0);
          onClose();
        });
      } else {
        // Remettre en position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{ translateY }]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.header}>
            {/* Indicateur de swipe */}
            <View style={styles.swipeIndicator} />
            
            {/* Espace vide pour centrer l'indicateur */}
            <View style={{ flex: 1 }} />
            
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.plantHeader}>
              <Text style={styles.emoji}>{plant.emoji}</Text>
              <Text style={styles.name}>{plant.name}</Text>
              <Text style={styles.latinName}>{plant.latinName}</Text>
              
              {/* Bouton pour ajouter la plante aux favoris */}
              <TouchableOpacity
                style={[styles.plantFavoriteButton, isFavorite(plant.id) && styles.plantFavoriteActive]}
                onPress={() => toggleFavorite(plant)}
                activeOpacity={0.7}
              >
                <Text style={[styles.plantFavoriteIcon, isFavorite(plant.id) && styles.plantFavoriteIconActive]}>
                  {isFavorite(plant.id) ? '♥' : '♡'}
                </Text>
                <Text style={[styles.plantFavoriteText, isFavorite(plant.id) && styles.plantFavoriteTextActive]}>
                  {isFavorite(plant.id) ? 'Dans ma wishlist' : 'Ajouter à ma wishlist'}
                </Text>
              </TouchableOpacity>
            </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{plant.fullDescription}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bienfaits principaux</Text>
            {plant.mainBenefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mode d'utilisation</Text>
            <Text style={styles.usage}>{plant.usage}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contre-indications</Text>
            <Text style={styles.contraindications}>{plant.contraindications}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.productsHeader}>
              <Text style={styles.sectionTitle}>Produits disponibles</Text>
              <TouchableOpacity 
                style={styles.wishlistAccessButton}
                onPress={() => {
                  onClose();
                  setTimeout(() => router.push('/wishlist' as any), 100);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.wishlistAccessIcon}>♥</Text>
                <Text style={styles.wishlistAccessText}>Ma Wishlist</Text>
                {favoriteProducts.length > 0 && (
                  <View style={styles.wishlistBadge}>
                    <Text style={styles.wishlistBadgeText}>{favoriteProducts.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            
            {plant.products.map((product, index) => {
              const productId = product.id || `${plant.id}-product-${index}`;
              const isFav = product.id ? isProductFavorite(product.id) : false;
              
              return (
                <View key={index} style={styles.productCard}>
                  <View style={styles.productHeader}>
                    <View style={styles.productTitleSection}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}</Text>
                    </View>
                    
                    {product.id && (
                      <TouchableOpacity
                        style={[styles.productFavoriteButton, isFav && styles.productFavoriteActive]}
                        onPress={() => toggleProductFavorite({ ...product, id: productId })}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.productFavoriteIcon, isFav && styles.productFavoriteIconActive]}>
                          {isFav ? '♥' : '♡'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <Text style={styles.productComposition}>
                    Composition: {product.composition}
                  </Text>
                  
                  <View style={styles.productActions}>
                    <TouchableOpacity style={styles.buyButton}>
                      <Text style={styles.buyButtonText}>Voir le produit</Text>
                    </TouchableOpacity>
                    
                    {product.id && (
                      <TouchableOpacity 
                        style={[styles.addToWishlistButton, isFav && styles.addToWishlistButtonActive]}
                        onPress={() => toggleProductFavorite({ ...product, id: productId })}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.addToWishlistText, isFav && styles.addToWishlistTextActive]}>
                          {isFav ? 'Retiré ♥' : 'Ajouter ♡'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ede8',
    position: 'relative',
  },
  swipeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d9d1',
    borderRadius: 2,
    position: 'absolute',
    left: '50%',
    top: 8,
    marginLeft: -20, // Centrage
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8ede8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#5a6c57',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  plantHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: 8,
  },
  latinName: {
    fontSize: 18,
    color: '#7c9885',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#5a6c57',
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#7c9885',
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 16,
    color: '#5a6c57',
    flex: 1,
    lineHeight: 22,
  },
  usage: {
    fontSize: 16,
    color: '#5a6c57',
    lineHeight: 24,
  },
  contraindications: {
    fontSize: 16,
    color: '#d97706',
    lineHeight: 24,
    fontWeight: '500',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7c9885',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5016',
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7c9885',
  },
  productDescription: {
    fontSize: 14,
    color: '#5a6c57',
    marginBottom: 8,
    lineHeight: 20,
  },
  productComposition: {
    fontSize: 12,
    color: '#8a9688',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  buyButton: {
    backgroundColor: '#7c9885',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Nouveaux styles pour la wishlist des produits
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wishlistAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'relative',
  },
  wishlistAccessIcon: {
    fontSize: 16,
    color: '#7c9885',
    marginRight: 6,
  },
  wishlistAccessText: {
    fontSize: 14,
    color: '#7c9885',
    fontWeight: '600',
  },
  wishlistBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productTitleSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productFavoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  productFavoriteActive: {
    backgroundColor: '#7c9885',
  },
  productFavoriteIcon: {
    fontSize: 16,
    color: '#7c9885',
  },
  productFavoriteIconActive: {
    color: '#fff',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  addToWishlistButton: {
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7c9885',
  },
  addToWishlistButtonActive: {
    backgroundColor: '#7c9885',
  },
  addToWishlistText: {
    color: '#7c9885',
    fontSize: 14,
    fontWeight: '600',
  },
  addToWishlistTextActive: {
    color: '#fff',
  },
  plantFavoriteButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7c9885',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  plantFavoriteActive: {
    backgroundColor: '#7c9885',
  },
  plantFavoriteIcon: {
    fontSize: 20,
    color: '#7c9885',
    fontWeight: 'bold',
  },
  plantFavoriteIconActive: {
    color: '#fff',
  },
  plantFavoriteText: {
    color: '#7c9885',
    fontSize: 16,
    fontWeight: '600',
  },
  plantFavoriteTextActive: {
    color: '#fff',
  },
});