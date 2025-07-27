import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useWishlist } from '../contexts/WishlistContext';
import { useContraindications } from '../contexts/ContraindicationsContext';
import { ModernCard } from '../components/ui/ModernCard';
import { ModernButton } from '../components/ui/ModernButton';
import { responsive } from '../utils/responsive';

export default function WishlistScreen() {
  const { 
    favorites, 
    favoriteProducts, 
    filteredFavorites, 
    safeFavorites, 
    dangerousFavorites,
    filterBySafety, 
    setFilterBySafety,
    removeFromFavorites,
    removeProductFromFavorites 
  } = useWishlist();
  
  const { userContraindications } = useContraindications();
  const [activeTab, setActiveTab] = useState<'plants' | 'products'>('plants');

  const displayedFavorites = filterBySafety ? safeFavorites : filteredFavorites;

  const renderPlantItem = ({ item }: { item: any }) => (
    <ModernCard style={styles.plantCard}>
      <View style={styles.plantHeader}>
        <Text style={styles.plantEmoji}>{item.emoji}</Text>
        <View style={styles.plantInfo}>
          <Text style={styles.plantName}>{item.name}</Text>
          <Text style={styles.plantLatinName}>{item.latinName}</Text>
        </View>
        
        {/* Badge de sécurité */}
        {dangerousFavorites.find(p => p.id === item.id) && (
          <View style={styles.safetyBadge}>
            <Text style={styles.safetyBadgeText}>⚠️ Attention</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.plantDescription}>{item.shortDescription}</Text>
      
      <ModernButton
        title="Retirer de la wishlist"
        variant="outline"
        size="small"
        onPress={() => removeFromFavorites(item.id)}
        style={styles.removeButton}
      />
    </ModernCard>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <ModernCard style={styles.productCard}>
      <View style={styles.productHeader}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      
      <Text style={styles.productDescription}>{item.description}</Text>
      
      <ModernButton
        title="Retirer de la wishlist"
        variant="outline"
        size="small"
        onPress={() => removeProductFromFavorites(item.id)}
        style={styles.removeButton}
      />
    </ModernCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ma Wishlist 🌿</Text>
        
        {/* Filtre de sécurité */}
        {userContraindications.length > 0 && (
          <View style={styles.filterContainer}>
            <ModernButton
              title={filterBySafety ? "Voir tout" : "Masquer les dangereuses"}
              variant={filterBySafety ? "primary" : "outline"}
              size="small"
              onPress={() => setFilterBySafety(!filterBySafety)}
              style={styles.filterButton}
            />
            
            {dangerousFavorites.length > 0 && (
              <View style={styles.warningBadge}>
                <Text style={styles.warningBadgeText}>{dangerousFavorites.length} plante(s) à risque</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Onglets */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'plants' && styles.activeTab]}
          onPress={() => setActiveTab('plants')}
        >
          <Text style={[styles.tabText, activeTab === 'plants' && styles.activeTabText]}>
            Plantes ({displayedFavorites.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>
            Produits ({favoriteProducts.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenu */}
      {activeTab === 'plants' ? (
        displayedFavorites.length > 0 ? (
          <FlatList
            data={displayedFavorites}
            renderItem={renderPlantItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {filterBySafety && dangerousFavorites.length > 0 
                ? "Aucune plante sûre dans votre wishlist" 
                : "Aucune plante dans votre wishlist"}
            </Text>
            <Text style={styles.emptySubtext}>
              Explorez nos recommandations pour découvrir de nouvelles plantes !
            </Text>
          </View>
        )
      ) : (
        favoriteProducts.length > 0 ? (
          <FlatList
            data={favoriteProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun produit dans votre wishlist</Text>
            <Text style={styles.emptySubtext}>
              Consultez les fiches plantes pour découvrir nos produits !
            </Text>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: responsive.padding.container,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    flex: 0,
  },
  warningBadge: {
    flex: 0,
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ea580c',
  },
  warningBadgeText: {
    fontSize: 12,
    color: '#ea580c',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#7c9885',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#7c9885',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: responsive.padding.container,
  },
  plantCard: {
    marginBottom: responsive.spacing.md,
  },
  plantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  plantEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  plantLatinName: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  safetyBadge: {
    marginLeft: 8,
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  safetyBadgeText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
  plantDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  productCard: {
    marginBottom: responsive.spacing.md,
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
    color: '#1f2937',
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7c9885',
  },
  productDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  removeButton: {
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.padding.container,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});
