import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getPlantImageFileName } from '../utils/imageHelper';
import { isPlantImageAvailable, getPlantImageUrl } from '../constants/PlantImages';

const testPlants = [
  'Ginkgo Biloba',
  'Curcuma',
  'Menthe Poivrée',
  'Échinacée',
  'Thym',
  'Lavande Vraie',
  'Ail des Ours',
  'Basilic Sacré - Tulsi',
  'Baies d\'Argousier',
  'Mousse d\'Irlande',
  'Verge d\'Or',
  'Curcuma + Pipérine',
  'Ginseng Rouge de Corée',
  'Articulations & muscles',
  'Peau, cheveux & ongles'
];

export default function PlantImageTest() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Test Système d'Images de Plantes</Text>
      
      {testPlants.map((plantName, index) => {
        const imageFileName = getPlantImageFileName(plantName);
        const isAvailable = isPlantImageAvailable(imageFileName);
        const imageUrl = getPlantImageUrl(imageFileName);
        
        return (
          <View key={index} style={styles.testItem}>
            <Text style={styles.plantName}>
              {isAvailable ? '✅' : '❌'} {plantName}
            </Text>
            <Text style={styles.fileName}>Fichier: {imageFileName}.jpg</Text>
            <Text style={styles.status}>
              Disponible: {isAvailable ? 'OUI' : 'NON'}
            </Text>
            
            {isAvailable && (
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  onError={() => console.log(`Erreur chargement: ${imageUrl}`)}
                  onLoad={() => console.log(`Succès chargement: ${imageUrl}`)}
                />
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  testItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fileName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  status: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
