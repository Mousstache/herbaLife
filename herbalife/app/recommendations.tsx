import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import PlantCard from '../components/PlantCard';
import PlantDetailModal from '../components/PlantDetails';
import { plantsData, Plant } from '../data/DataPlant';
import { useWishlist } from '../contexts/WishlistContext';
import { responsive } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../i18n';
import { getPlantImageFileName } from '../utils/imageHelper';
import { getPlantImageUrl, isPlantImageAvailable } from '../constants/PlantImages';

export default function RecommendationsScreen() {
  const { zone, contraindications } = useLocalSearchParams<{ zone: string; contraindications?: string }>();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const { favorites } = useWishlist();
  const { t } = useTranslation();

  const userContraindications = contraindications ? JSON.parse(contraindications) : [];
  const recommendedPlants = plantsData[zone || ''] || [];

  // Fonction pour obtenir l'image d'une plante avec fallback vers emoji
  const getPlantImage = (plant: Plant) => {
    const imageFileName = getPlantImageFileName(plant.name);
    const hasImageError = imageErrors[plant.id];
    
    // Vérifier si l'image est disponible dans notre liste
    if (!isPlantImageAvailable(imageFileName) || hasImageError) {
      return <Text style={styles.plantEmoji}>{plant.emoji}</Text>;
    }
    
    return (
      <Image 
        source={{ uri: getPlantImageUrl(imageFileName) }}
        style={styles.plantImage}
        onError={(error) => {
          console.log(`Image non trouvée pour ${plant.name}: ${imageFileName}.jpg`);
          setImageErrors(prev => ({ ...prev, [plant.id]: true }));
        }}
        onLoad={() => {
          console.log(`Image chargée avec succès pour ${plant.name}: ${imageFileName}.jpg`);
        }}
      />
    );
  };

  const handlePlantPress = (plant: Plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  const getZoneName = (zoneKey: string): string => {
    return t(`recommendations.zones.${zoneKey}`) || zoneKey;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HerbaLife</Text>
      </View>

      {/* Titre des recommandations */}
      <Text style={styles.mainTitle}>Nos Recommandations Personnalisées</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Liste des plantes recommandées */}
        {recommendedPlants.map((plant, index) => (
          <View key={index} style={styles.plantCard}>
            <TouchableOpacity
              style={styles.plantCardContent}
              onPress={() => handlePlantPress(plant)}
              activeOpacity={0.7}
            >
              <View style={styles.plantInfo}>
                <Text style={styles.plantCategory}>
                  {plant.systemsTargeted?.[0] || 'Adaptogène'}
                </Text>
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.plantDescription}>
                  {plant.shortDescription}
                </Text>
              </View>
              <View style={styles.plantImageContainer}>
                {getPlantImage(plant)}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/body-zones')}>
          <Ionicons name="home-outline" size={24} color="#96c5a8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/plant-search')}>
          <Ionicons name="search-outline" size={24} color="#96c5a8" />
          <Text style={styles.navText}>Recherche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/wishlist')}>
          <Ionicons name="bookmark" size={24} color="#FFFFFF" />
          <Text style={styles.navTextActive}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color="#96c5a8" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espacement final comme dans le design */}
      <View style={styles.bottomSpacer} />

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
    backgroundColor: '#122118',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#122118',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.015,
    flex: 1,
    textAlign: 'center',
    paddingRight: 48,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.015,
    paddingHorizontal: 16,
    textAlign: 'left',
    paddingBottom: 8,
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  plantCard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  plantCardContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 16,
    borderRadius: 12,
  },
  plantInfo: {
    flex: 2,
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'flex-start',
  },
  plantCategory: {
    color: '#96c5a8',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  plantName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  plantDescription: {
    color: '#96c5a8',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  plantImageContainer: {
    aspectRatio: 16/9,
    backgroundColor: '#121714',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  plantEmoji: {
    fontSize: 24,
  },
  plantImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1b3124',
    paddingVertical: 8,
    paddingBottom: 12,
    paddingTop: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#264532',
    gap: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#96c5a8',
    fontWeight: '500',
    letterSpacing: 0.015,
  },
  navTextActive: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 0.015,
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: '#1b3124',
  },
});
