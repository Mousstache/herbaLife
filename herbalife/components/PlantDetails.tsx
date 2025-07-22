import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Plant } from '../data/DataPlant';

interface Props {
  plant: Plant;
  visible: boolean;
  onClose: () => void;
}

export default function PlantDetailModal({ plant, visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.plantHeader}>
            <Text style={styles.emoji}>{plant.emoji}</Text>
            <Text style={styles.name}>{plant.name}</Text>
            <Text style={styles.latinName}>{plant.latinName}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{plant.fullDescription}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bienfaits principaux</Text>
            {plant.mainBenefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mode d'utilisation</Text>
            <Text style={styles.usage}>{plant.usage}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contre-indications</Text>
            <Text style={styles.contraindications}>{plant.contraindications}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Produits disponibles</Text>
            {plant.products.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productComposition}>
                  Composition: {product.composition}
                </Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Voir le produit</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ede8',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8ede8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#5a6c57',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  plantHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: 8,
  },
  latinName: {
    fontSize: 18,
    color: '#7c9885',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#5a6c57',
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#7c9885',
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 16,
    color: '#5a6c57',
    flex: 1,
    lineHeight: 22,
  },
  usage: {
    fontSize: 16,
    color: '#5a6c57',
    lineHeight: 24,
  },
  contraindications: {
    fontSize: 16,
    color: '#d97706',
    lineHeight: 24,
    fontWeight: '500',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7c9885',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5016',
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7c9885',
  },
  productDescription: {
    fontSize: 14,
    color: '#5a6c57',
    marginBottom: 8,
    lineHeight: 20,
  },
  productComposition: {
    fontSize: 12,
    color: '#8a9688',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  buyButton: {
    backgroundColor: '#7c9885',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});