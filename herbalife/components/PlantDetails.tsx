import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Plant } from '../data/DataPlant';
import { useWishlist } from '../contexts/WishlistContext';
import { Ionicons } from '@expo/vector-icons';
import { getPlantImageFileName } from '../utils/imageHelper';
import { getPlantImageUrl, isPlantImageAvailable } from '../constants/PlantImages';

const { height: screenHeight } = Dimensions.get('window');

interface Props {
  plant: Plant;
  visible: boolean;
  onClose: () => void;
}

export default function PlantDetailModal({ plant, visible, onClose }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;
  const { favoriteProducts, toggleProductFavorite, isProductFavorite, isFavorite, toggleFavorite } = useWishlist();
  const [activeTab, setActiveTab] = useState('description');
  const [imageError, setImageError] = useState(false);
  
  // Fonction pour obtenir l'image de la plante
  const getPlantImage = () => {
    const imageFileName = getPlantImageFileName(plant.name);
    
    // Vérifier si l'image est disponible dans notre liste
    if (!isPlantImageAvailable(imageFileName) || imageError) {
      return <Text style={styles.plantEmoji}>{plant.emoji}</Text>;
    }
    
    return (
      <Image 
        source={{ uri: getPlantImageUrl(imageFileName) }}
        style={styles.plantImage}
        onError={() => {
          console.log(`Image non trouvée pour ${plant.name}: ${imageFileName}.jpg`);
          setImageError(true);
        }}
        onLoad={() => {
          console.log(`Image chargée avec succès pour ${plant.name}: ${imageFileName}.jpg`);
        }}
      />
    );
  };
  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy > 10 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {},
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const threshold = screenHeight * 0.25;
      
      if (gestureState.dy > threshold || gestureState.vy > 0.5) {
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          translateY.setValue(0);
          onClose();
        });
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'preparation', label: 'Preparation & Dosage' },
    { id: 'effects', label: 'Side Effects' },
    { id: 'botany', label: 'Botany' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <View>
            <Text style={styles.tabContent}>
              {plant.shortDescription || plant.latinName}
            </Text>
            {plant.systemsTargeted && plant.systemsTargeted.length > 0 && (
              <View style={styles.descriptionSection}>
                <Text style={styles.descriptionSubtitle}>Systèmes ciblés :</Text>
                <Text style={styles.tabContent}>
                  Cette plante agit principalement sur {plant.systemsTargeted.join(', ').toLowerCase()}, 
                  offrant un soutien naturel et efficace pour votre bien-être.
                </Text>
              </View>
            )}
            {plant.targetedSymptoms && plant.targetedSymptoms.length > 0 && (
              <View style={styles.descriptionSection}>
                <Text style={styles.descriptionSubtitle}>Bienfaits principaux :</Text>
                <Text style={styles.tabContent}>
                  {plant.name} est particulièrement recommandée pour traiter {plant.targetedSymptoms.slice(0, 4).join(', ')}.
                  {plant.targetedSymptoms.length > 4 && ` et ${plant.targetedSymptoms.length - 4} autres symptômes`}.
                </Text>
              </View>
            )}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Utilisation traditionnelle :</Text>
              <Text style={styles.tabContent}>
                Cette plante médicinale est utilisée depuis des siècles dans la phytothérapie traditionnelle. 
                Son efficacité reconnue en fait un choix privilégié pour un traitement naturel et respectueux de votre organisme.
              </Text>
            </View>
          </View>
        );
      case 'preparation':
        return (
          <View>
            <Text style={styles.tabContent}>
              {plant.usage || 'Informations de préparation non disponibles.'}
            </Text>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Dosage recommandé :</Text>
              <Text style={styles.tabContent}>
                • Infusion : 1 à 2 cuillères à café par tasse d'eau chaude, 2 à 3 fois par jour
                {'\n'}• Décoction : Faire bouillir 5 minutes, laisser infuser 10 minutes
                {'\n'}• Extrait : Suivre les indications du fabricant
              </Text>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Conseils d'utilisation :</Text>
              <Text style={styles.tabContent}>
                Pour une efficacité optimale, consommer de préférence à jeun ou entre les repas. 
                Une cure de 3 semaines avec une pause d'une semaine est généralement recommandée.
              </Text>
            </View>
          </View>
        );
      case 'effects':
        return (
          <View>
            <Text style={styles.tabContent}>
              {plant.contraindications || 'Aucune contre-indication spécifiée.'}
            </Text>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Précautions d'emploi :</Text>
              <Text style={styles.tabContent}>
                • Déconseillé aux femmes enceintes et allaitantes sans avis médical
                {'\n'}• Ne pas dépasser les doses recommandées
                {'\n'}• Conserver dans un endroit sec et à l'abri de la lumière
                {'\n'}• Tenir hors de portée des enfants
              </Text>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Interactions possibles :</Text>
              <Text style={styles.tabContent}>
                En cas de traitement médicamenteux, consultez votre médecin ou pharmacien avant utilisation. 
                Certaines plantes peuvent interagir avec des médicaments.
              </Text>
            </View>
          </View>
        );
      case 'botany':
        return (
          <View>
            <Text style={styles.tabContent}>
              Nom latin: {plant.latinName}
              {plant.systemsTargeted && `\nSystèmes ciblés: ${plant.systemsTargeted.join(', ')}`}
            </Text>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Classification botanique :</Text>
              <Text style={styles.tabContent}>
                {plant.name} ({plant.latinName}) appartient à une famille de plantes médicinales 
                reconnues pour leurs propriétés thérapeutiques exceptionnelles.
              </Text>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Habitat naturel :</Text>
              <Text style={styles.tabContent}>
                Cette plante pousse dans des conditions spécifiques qui lui confèrent ses propriétés uniques. 
                La qualité du terroir et les méthodes de récolte influencent directement son efficacité.
              </Text>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionSubtitle}>Partie utilisée :</Text>
              <Text style={styles.tabContent}>
                Les parties actives de la plante sont soigneusement sélectionnées pour garantir 
                une concentration optimale en principes actifs bénéfiques pour la santé.
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.modalContent,
            { transform: [{ translateY }] }
          ]}
          {...panResponder.panHandlers}
        >
          {/* Header avec retour */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>HerbaLife</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Image de la plante */}
            <View style={styles.imageContainer}>
              {getPlantImage()}
            </View>

            {/* Nom et informations principales */}
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantLatinName}>{plant.latinName}</Text>

            {/* Bouton favoris */}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(plant)}
            >
              <Ionicons 
                name={isFavorite(plant.id) ? "heart" : "heart-outline"} 
                size={20} 
                color="#FFFFFF" 
              />
              <Text style={styles.favoriteButtonText}>Add to favorites</Text>
            </TouchableOpacity>

            {/* Onglets */}
            <View style={styles.tabsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tabsWrapper}>
                  {tabs.map((tab) => (
                    <TouchableOpacity
                      key={tab.id}
                      style={[
                        styles.tab,
                        activeTab === tab.id && styles.tabActive
                      ]}
                      onPress={() => setActiveTab(tab.id)}
                    >
                      <Text style={[
                        styles.tabText,
                        activeTab === tab.id && styles.tabTextActive
                      ]}>
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Contenu de l'onglet */}
            <View style={styles.tabContentContainer}>
              {renderTabContent()}
            </View>

            {/* Symptômes traités */}
            <Text style={styles.sectionTitle}>Symptoms Treated</Text>
            <View style={styles.symptomsContainer}>
              {plant.targetedSymptoms?.slice(0, 3).map((symptom, index) => (
                <View key={index} style={styles.symptomTag}>
                  <Text style={styles.symptomTagText}>
                    {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Contre-indications */}
            <Text style={styles.sectionTitle}>Contraindications</Text>
            <View style={styles.contraindicationItem}>
              <View style={styles.warningIcon}>
                <Ionicons name="warning" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.contraindicationText}>
                {plant.contraindications || 'Consulter un professionnel de santé'}
              </Text>
            </View>

            {/* Produits disponibles */}
            {plant.products && plant.products.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Available Products</Text>
                {plant.products.map((product, index) => (
                  <View key={index} style={styles.productItem}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDescription}>{product.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.productButton}>
                      <Text style={styles.productButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121714',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#121714',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121714',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: '100%',
    height: 320,
    backgroundColor: '#121714',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  plantEmoji: {
    fontSize: 80,
  },
  plantImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  plantName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.015,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  plantLatinName: {
    color: '#a2b4a9',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b362f',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    alignSelf: 'flex-start',
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
  tabsContainer: {
    paddingBottom: 12,
    paddingTop: 20,
  },
  tabsWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#404f46',
    paddingHorizontal: 16,
    gap: 32,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    paddingBottom: 13,
    paddingTop: 16,
  },
  tabActive: {
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    color: '#a2b4a9',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabContent: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    paddingBottom: 12,
    paddingTop: 4,
  },
  descriptionSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  descriptionSubtitle: {
    color: '#96c5a8',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.015,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  symptomTag: {
    backgroundColor: '#2b362f',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  symptomTagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  contraindicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#121714',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  warningIcon: {
    backgroundColor: '#2b362f',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contraindicationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#121714',
    paddingHorizontal: 16,
    minHeight: 72,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  productDescription: {
    color: '#a2b4a9',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  productButton: {
    backgroundColor: '#2b362f',
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});