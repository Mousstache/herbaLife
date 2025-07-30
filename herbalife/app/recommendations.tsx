import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import PlantCard from '../components/PlantCard';
import PlantDetailModal from '../components/PlantDetails';
import { plantsData, Plant } from '../data/DataPlant';
import { useWishlist } from '../contexts/WishlistContext';
import { responsive } from '../utils/responsive';

export default function RecommendationsScreen() {
  const { zone, contraindications } = useLocalSearchParams<{ zone: string; contraindications?: string }>();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { favorites } = useWishlist();

  const userContraindications = contraindications ? JSON.parse(contraindications) : [];
  const recommendedPlants = plantsData[zone || ''] || [];

  const handlePlantPress = (plant: Plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  const zoneNames: { [key: string]: string } = {
    tete: 'Tête & Cerveau',
    gorge: 'Gorge & Respiratoire',
    coeur: 'Cœur & Circulation',
    ventre: 'Ventre & Digestion',
    articulations: 'Articulations & Muscles',
    peau: 'Peau & Beauté',
    sommeil: 'Sommeil & Détente',
    immunite: 'Immunité & Énergie',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>
                Plantes pour {zoneNames[zone || '']}
              </Text>
              <Text style={styles.subtitle}>
                {recommendedPlants.length} plante{recommendedPlants.length > 1 ? 's' : ''} recommandée{recommendedPlants.length > 1 ? 's' : ''}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.wishlistButton}
              onPress={() => router.push('/wishlist' as any)}
              activeOpacity={0.7}
            >
              <Text style={styles.wishlistIcon}>♥</Text>
              {favorites.length > 0 && (
                <View style={styles.wishlistBadge}>
                  <Text style={styles.wishlistBadgeText}>{favorites.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {recommendedPlants.length > 0 ? (
          <FlatList
            data={recommendedPlants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlantCard 
                plant={item} 
                onPress={() => handlePlantPress(item)}
                userContraindications={userContraindications}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucune plante disponible pour cette zone pour le moment.
            </Text>
          </View>
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
    backgroundColor: '#122117',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: responsive.spacing.lg,
    marginBottom: responsive.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    marginRight: responsive.spacing.md,
  },
  wishlistButton: {
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wishlistIcon: {
    fontSize: 20,
    color: '#7c9885',
  },
  wishlistBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d5738',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7c9885',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#7c9885',
    textAlign: 'center',
    lineHeight: 24,
  },
});
