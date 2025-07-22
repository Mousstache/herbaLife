import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { router } from 'expo-router';
import { RootStackParamList } from './_layout';
import PlantCard from '../../components/PlantCard';
import PlantDetailModal from '../../components/PlantDetails';
import { plantsData, Plant } from '../../data/DataPlant';
import { useWishlist } from '../../contexts/WishlistContext';
import { responsive } from '../../utils/responsive';

type RecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'Recommendations'>;

interface Props {
  route: RecommendationsScreenRouteProp;
}

export default function RecommendationsScreen({ route }: Props) {
  const { zone } = route.params;
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { favorites } = useWishlist();

  const recommendedPlants = plantsData[zone] || [];

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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Plantes pour</Text>
            <Text style={styles.zoneName}>{zoneNames[zone]}</Text>
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

      <FlatList
        data={recommendedPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard plant={item} onPress={() => handlePlantPress(item)} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          visible={modalVisible}
          onClose={closeModal}
        />
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
    padding: responsive.spacing.lg,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ede8',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
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
    fontSize: 16,
    color: '#5a6c57',
    textAlign: 'center',
  },
  zoneName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d5016',
    textAlign: 'center',
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7c9885',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
});