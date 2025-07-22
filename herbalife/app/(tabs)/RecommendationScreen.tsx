import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import PlantCard from '../../components/PlantCard';
import PlantDetailModal from '../../components/PlantDetails';
import { plantsData, Plant } from '../../data/DataPlant';

type RecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'Recommendations'>;

interface Props {
  route: RecommendationsScreenRouteProp;
}

export default function RecommendationsScreen({ route }: Props) {
  const { zone } = route.params;
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        <Text style={styles.title}>Plantes pour</Text>
        <Text style={styles.zoneName}>{zoneNames[zone]}</Text>
        <Text style={styles.subtitle}>
          {recommendedPlants.length} plante{recommendedPlants.length > 1 ? 's' : ''} recommandée{recommendedPlants.length > 1 ? 's' : ''}
        </Text>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ede8',
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