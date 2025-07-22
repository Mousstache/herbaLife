import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PlantCard from '../components/PlantCard';
import PlantDetailModal from '../components/PlantDetails';
import { plantsData, Plant } from '../data/DataPlant';

export default function RecommendationsScreen() {
  const { zone } = useLocalSearchParams<{ zone: string }>();
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
          <Text style={styles.title}>
            Plantes pour {zoneNames[zone || '']}
          </Text>
          <Text style={styles.subtitle}>
            {recommendedPlants.length} plante{recommendedPlants.length > 1 ? 's' : ''} recommandée{recommendedPlants.length > 1 ? 's' : ''}
          </Text>
        </View>

        {recommendedPlants.length > 0 ? (
          <FlatList
            data={recommendedPlants}
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
    backgroundColor: '#f8f9f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
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
