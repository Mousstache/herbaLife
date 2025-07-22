import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Plant } from '../data/DataPlant';

interface Props {
  plant: Plant;
  onPress: () => void;
}

export default function PlantCard({ plant, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{plant.emoji}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.latinName}>{plant.latinName}</Text>
        </View>
      </View>
      
      <Text style={styles.shortDescription}>{plant.shortDescription}</Text>
      
      <View style={styles.benefitsContainer}>
        {plant.mainBenefits.slice(0, 2).map((benefit, index) => (
          <View key={index} style={styles.benefitTag}>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.seeMoreText}>Voir plus →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#7c9885',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 2,
  },
  latinName: {
    fontSize: 14,
    color: '#7c9885',
    fontStyle: 'italic',
  },
  shortDescription: {
    fontSize: 15,
    color: '#5a6c57',
    lineHeight: 22,
    marginBottom: 16,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  benefitTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  benefitText: {
    fontSize: 12,
    color: '#2d5016',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'flex-end',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#7c9885',
    fontWeight: '600',
  },
});