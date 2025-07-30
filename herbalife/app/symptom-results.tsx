import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { findPlantsBySymptoms, Plant } from '../data/DataPlant';
import PlantCard from '../components/PlantCard';
import PlantDetailModal from '../components/PlantDetails';
import { responsive } from '../utils/responsive';

export default function SymptomResultsScreen() {
  const params = useLocalSearchParams();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { fontSize: responsive.fontSize.title }]}>
          Résultats de la recherche 🌿
        </Text>
        
        <View style={[styles.symptomsContainer, { 
          padding: responsive.padding.md,
          borderRadius: responsive.borderRadius.medium,
          marginBottom: responsive.spacing.lg
        }]}>
          <Text style={[styles.symptomsTitle, { fontSize: responsive.fontSize.medium }]}>
            Symptômes recherchés :
          </Text>
          <View style={styles.symptomsGrid}>
            {symptoms.map((symptom: string, index: number) => (
              <View 
                key={index} 
                style={[styles.symptomTag, { 
                  padding: responsive.padding.sm,
                  borderRadius: responsive.borderRadius.small
                }]}
              >
                <Text style={[styles.symptomTagText, { fontSize: responsive.fontSize.small }]}>
                  {symptom}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={[styles.resultsCount, { fontSize: responsive.fontSize.medium }]}>
          {plants.length} plante{plants.length > 1 ? 's' : ''} trouvée{plants.length > 1 ? 's' : ''}
        </Text>

        {plants.length === 0 ? (
          <View style={[styles.noResults, { 
            padding: responsive.padding.lg,
            borderRadius: responsive.borderRadius.medium
          }]}>
            <Text style={[styles.noResultsTitle, { fontSize: responsive.fontSize.large }]}>
              Aucune plante trouvée 😔
            </Text>
            <Text style={[styles.noResultsText, { fontSize: responsive.fontSize.medium }]}>
              Nous n'avons pas encore de plantes référencées pour ces symptômes spécifiques.
            </Text>
            <TouchableOpacity
              style={[styles.backButton, { 
                padding: responsive.padding.md,
                borderRadius: responsive.borderRadius.medium,
                marginTop: responsive.spacing.md
              }]}
              onPress={() => router.back()}
            >
              <Text style={[styles.backButtonText, { fontSize: responsive.fontSize.medium }]}>
                Modifier ma recherche
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.plantsContainer}>
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onPress={() => handlePlantPress(plant)}
                userContraindications={[]} // À remplacer par les vraies contre-indications utilisateur
              />
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.newSearchButton, { 
            padding: responsive.padding.md,
            borderRadius: responsive.borderRadius.medium,
            marginTop: responsive.spacing.lg,
            marginBottom: responsive.spacing.xl
          }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.newSearchButtonText, { fontSize: responsive.fontSize.medium }]}>
            Nouvelle recherche
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
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
    paddingHorizontal: responsive.padding.container,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: responsive.spacing.md,
    marginBottom: responsive.spacing.lg,
  },
  symptomsContainer: {
    backgroundColor: '#1a2419',
    borderWidth: 1,
    borderColor: '#38E078',
  },
  symptomsTitle: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: responsive.spacing.sm,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing.xs,
  },
  symptomTag: {
    backgroundColor: '#122117',
    borderWidth: 1,
    borderColor: '#96C4A8',
  },
  symptomTagText: {
    color: '#96C4A8',
    fontWeight: '500',
  },
  resultsCount: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: responsive.spacing.md,
    textAlign: 'center',
  },
  noResults: {
    backgroundColor: '#1a2419',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#96C4A8',
    ...responsive.shadow.medium,
  },
  noResultsTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: responsive.spacing.sm,
    textAlign: 'center',
  },
  noResultsText: {
    color: '#96C4A8',
    textAlign: 'center',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#122117',
    borderWidth: 2,
    borderColor: '#38E078',
  },
  backButtonText: {
    color: '#38E078',
    fontWeight: '600',
  },
  plantsContainer: {
    gap: responsive.spacing.md,
  },
  newSearchButton: {
    backgroundColor: '#122117',
    borderWidth: 2,
    borderColor: '#38E078',
    alignItems: 'center',
  },
  newSearchButtonText: {
    color: '#38E078',
    fontWeight: '600',
  },
});
