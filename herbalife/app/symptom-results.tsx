import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { findPlantsBySymptoms, Plant } from '../data/DataPlant';
import PlantDetailModal from '../components/PlantDetails';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../i18n';
import { getSymptomTranslation } from '../utils/symptomTranslations';
import { getPlantImageFileName } from '../utils/imageHelper';
import { getPlantImageSource, isPlantImageAvailable } from '../constants/PlantImages';

export default function SymptomResultsScreen() {
  const params = useLocalSearchParams();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const { t } = useTranslation();

  useEffect(() => {
    if (params.symptoms) {
      try {
        const symptoms = JSON.parse(params.symptoms as string);
        const foundPlants = findPlantsBySymptoms(symptoms);
        setPlants(foundPlants);
      } catch (error) {
        console.error('Erreur parsing des symptômes:', error);
      }
    }
  }, [params.symptoms]);

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

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  const symptoms = params.symptoms ? JSON.parse(params.symptoms as string) : [];

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

        {/* Titre principal */}
        <Text style={styles.mainTitle}>Résultats de recherche</Text>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Symptômes recherchés */}
          <View style={styles.symptomsContainer}>
            <Text style={styles.symptomsTitle}>Symptômes recherchés:</Text>
            <View style={styles.symptomsGrid}>
              {symptoms.map((symptom: string, index: number) => (
                <View key={index} style={styles.symptomTag}>
                  <Text style={styles.symptomTagText}>
                    {getSymptomTranslation(symptom, t)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Liste des plantes */}
          {plants.length === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsTitle}>Aucun résultat trouvé</Text>
              <Text style={styles.noResultsText}>
                Essayez de modifier vos symptômes de recherche
              </Text>
            </View>
          ) : (
            plants.map((plant, index) => (
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
            ))
          )}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/body-zones')}>
          <Ionicons name="home-outline" size={24} color="#96c5a8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/plant-search')}>
          <Ionicons name="search-outline" size={24} color="#FFFFFF" />
          <Text style={styles.navTextActive}>Recherche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/wishlist')}>
          <Ionicons name="bookmark-outline" size={24} color="#96c5a8" />
          <Text style={styles.navText}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color="#96c5a8" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espacement final */}
      <View style={styles.bottomSpacer} />

      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
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
  plantCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    width: 120,
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
    justifyContent: 'flex-end',
  },
  navText: {
    fontSize: 12,
    color: '#96c5a8',
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
    backgroundColor: '#1b3124',
  },
  symptomsContainer: {
    backgroundColor: '#1a2419',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#38E078',
  },
  symptomsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomTag: {
    backgroundColor: '#122117',
    borderWidth: 1,
    borderColor: '#96C4A8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 2,
  },
  symptomTagText: {
    color: '#96C4A8',
    fontSize: 12,
    fontWeight: '500',
  },
  noResults: {
    backgroundColor: '#1a2419',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#96C4A8',
    marginHorizontal: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: '#96C4A8',
    textAlign: 'center',
    lineHeight: 22,
  },
});
