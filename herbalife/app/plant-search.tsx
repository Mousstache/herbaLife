import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { plantsData, Plant } from '../data/DataPlant';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../i18n';
import { getPlantImageFileName } from '../utils/imageHelper';
import { getPlantImageSource, isPlantImageAvailable } from '../constants/PlantImages';

export default function PlantSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const { t } = useTranslation();

  useEffect(() => {
    // Récupérer toutes les plantes de toutes les zones
    const plants: Plant[] = [];
    Object.values(plantsData).forEach(zonePlants => {
      plants.push(...zonePlants);
    });
    
    // Supprimer les doublons basés sur l'ID
    const uniquePlants = plants.filter((plant, index, self) => 
      index === self.findIndex(p => p.id === plant.id)
    );
    
    setAllPlants(uniquePlants);
    setFilteredPlants(uniquePlants);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPlants(allPlants);
    } else {
      const filtered = allPlants.filter(plant =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.systemsTargeted?.some(system => 
          system.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        plant.targetedSymptoms?.some(symptom =>
          symptom.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredPlants(filtered);
    }
  }, [searchQuery, allPlants]);

  // Fonction pour obtenir l'image d'une plante avec fallback vers emoji
  const getPlantImage = (plant: Plant) => {
    const imageFileName = getPlantImageFileName(plant.name);
    const hasImageError = imageErrors[plant.id];
    
    // Vérifier si l'image est disponible dans notre liste
    if (!isPlantImageAvailable(imageFileName) || hasImageError) {
      return <Text style={styles.plantEmoji}>{plant.emoji}</Text>;
    }
    
    // Obtenir la source de l'image avec require()
    const imageSource = getPlantImageSource(imageFileName);
    
    if (!imageSource) {
      return <Text style={styles.plantEmoji}>{plant.emoji}</Text>;
    }
    
    return (
      <Image 
        source={imageSource}
        style={styles.plantImage}
        onError={() => {
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
    // Naviguer vers les détails de la plante ou une autre action
    console.log('Plante sélectionnée:', plant.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Header avec retour */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>HerbaLife</Text>
        </View>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <View style={styles.searchIcon}>
              <Ionicons name="search" size={24} color="#96c5a8" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des plantes..."
              placeholderTextColor="#96c5a8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.mainTitle}>Nos Plantes</Text>

        {/* Grille des plantes */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.plantsGrid}>
            {filteredPlants.map((plant, index) => (
              <TouchableOpacity
                key={plant.id}
                style={styles.plantCard}
                onPress={() => handlePlantPress(plant)}
                activeOpacity={0.7}
              >
                <View style={styles.plantImageContainer}>
                  {getPlantImage(plant)}
                </View>
                <Text style={styles.plantName} numberOfLines={2}>
                  {plant.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/body-zones')}>
          <Ionicons name="home-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
          <Text style={styles.navTextActive}>Recherche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/wishlist')}>
          <Ionicons name="bookmark-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espacement final */}
      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122118',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#122118',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    lineHeight: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b362f',
    borderRadius: 12,
    height: 48,
  },
  searchIcon: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFF',
    paddingRight: 16,
    paddingLeft: 8,
  },
  scrollContent: {
    flex: 1,
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
    lineHeight: 29,
  },
  plantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 20,
  },
  plantCard: {
    width: '47%', // Pour avoir 2 colonnes avec un gap
    flexDirection: 'column',
    gap: 12,
    paddingBottom: 12,
  },
  plantImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#2b362f',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantEmoji: {
    fontSize: 32,
  },
  plantImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  plantName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'left',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1a2f1f',
    paddingVertical: 8,
    paddingBottom: 12,
    paddingTop: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#2d3e32',
    gap: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
    justifyContent: 'flex-end',
  },
  navText: {
    fontSize: 12,
    color: '#9eb7a8',
    fontWeight: '500',
    letterSpacing: 0.015,
    lineHeight: 16,
  },
  navTextActive: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 0.015,
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: '#122118',
  },
});
