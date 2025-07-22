import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import PlantCard from '../components/PlantCard';
import ProductCard from '../components/ProductCard';
import PlantDetailModal from '../components/PlantDetails';
import { Plant } from '../data/DataPlant';
import { useWishlist } from '../contexts/WishlistContext';
import { responsive } from '../utils/responsive';

export default function WishlistScreen() {
  const { favorites, favoriteProducts } = useWishlist();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'plants' | 'products'>('plants');

  const handlePlantPress = (plant: Plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Ma Wishlist 🌿</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'plants' && styles.activeTab]}
                onPress={() => setActiveTab('plants')}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, activeTab === 'plants' && styles.activeTabText]}>
                  Plantes ({favorites.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'products' && styles.activeTab]}
                onPress={() => setActiveTab('products')}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
                  Produits ({favoriteProducts.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.placeholder} />
        </View>

        {activeTab === 'plants' ? (
          favorites.length > 0 ? (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PlantCard 
                  plant={item} 
                  onPress={() => handlePlantPress(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🌱</Text>
              <Text style={styles.emptyTitle}>Aucune plante en favoris</Text>
              <Text style={styles.emptyText}>
                Explorez les plantes et ajoutez vos préférées en appuyant sur le cœur ♥️
              </Text>
              <TouchableOpacity 
                style={styles.exploreButton}
                onPress={() => router.push('/contraindications' as any)}
                activeOpacity={0.8}
              >
                <Text style={styles.exploreButtonText}>Explorer les plantes</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          favoriteProducts.length > 0 ? (
            <FlatList
              data={favoriteProducts}
              keyExtractor={(item) => item.id || 'unknown'}
              renderItem={({ item }) => (
                <ProductCard 
                  product={item} 
                  onPress={() => {
                    // Optionnel : Ajouter navigation vers détails du produit
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🛒</Text>
              <Text style={styles.emptyTitle}>Aucun produit en favoris</Text>
              <Text style={styles.emptyText}>
                Explorez les produits dans les fiches des plantes et ajoutez vos préférés ♥️
              </Text>
              <TouchableOpacity 
                style={styles.exploreButton}
                onPress={() => router.push('/contraindications' as any)}
                activeOpacity={0.8}
              >
                <Text style={styles.exploreButtonText}>Explorer les plantes</Text>
              </TouchableOpacity>
            </View>
          )
        )}

        {selectedPlant && (
          <PlantDetailModal
            plant={selectedPlant}
            visible={modalVisible}
            onClose={closeModal}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: responsive.padding.container,
  },
  header: {
    marginTop: responsive.spacing.lg,
    marginBottom: responsive.spacing.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#7c9885',
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: responsive.fontSize.title,
    fontWeight: '700',
    color: '#2d5738',
    marginBottom: responsive.spacing.xs,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: responsive.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.xl,
  },
  emptyEmoji: {
    fontSize: responsive.width < 350 ? 80 : 100,
    marginBottom: responsive.spacing.lg,
  },
  emptyTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: '#2d5738',
    marginBottom: responsive.spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6c57',
    textAlign: 'center',
    lineHeight: responsive.fontSize.medium * 1.5,
    marginBottom: responsive.spacing.xl,
  },
  exploreButton: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.borderRadius.small,
    paddingVertical: responsive.padding.button,
    paddingHorizontal: responsive.spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    ...responsive.shadow.medium,
  },
  exploreButtonText: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Styles pour les onglets
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    borderRadius: 20,
    padding: 4,
    marginTop: responsive.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: responsive.spacing.sm,
    paddingHorizontal: responsive.spacing.md,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#7c9885',
  },
  tabText: {
    fontSize: responsive.fontSize.small,
    fontWeight: '600',
    color: '#7c9885',
  },
  activeTabText: {
    color: '#fff',
  },
});
