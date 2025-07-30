import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';
import { useContraindications } from '../contexts/ContraindicationsContext';
import { firstLaunchService } from '../utils/firstLaunchService';
import { useMobileResponsive } from '../hooks/useMobileResponsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mapping des images pour chaque contre-indication
const contraindicationImages: { [key: string]: any } = {
  'grossesse': require('../assets/images/grossesse.png'),
  'allaitement': require('../assets/images/grossesse.png'), // Réutilise grossesse pour allaitement
  'hypertension': require('../assets/images/hypertension.png'),
  'anticoagulants': require('../assets/images/medicaments.png'),
  'allergies_asteracees': require('../assets/images/medecin.png'),
  'diabete': require('../assets/images/diabete.png'),
  'troubles_hepatiques': require('../assets/images/hepatique.png'),
  'troubles_renaux': require('../assets/images/reins.png'),
  'epilepsie': require('../assets/images/medecin.png'),
  'chirurgie': require('../assets/images/medecin.png'),
};

interface Contraindication {
  id: string;
  label: string;
  description: string;
  emoji: string;
  category: string;
}

const contraindications: Contraindication[] = [
  {
    id: 'grossesse',
    label: 'Grossesse',
    description: 'Éviter les plantes déconseillées pendant la grossesse',
    emoji: '🤱',
    category: 'Femmes'
  },
  {
    id: 'allaitement',
    label: 'Allaitement',
    description: 'Prudence avec les plantes pendant l\'allaitement',
    emoji: '🍼',
    category: 'Femmes'
  },
  {
    id: 'hypertension',
    label: 'Hypertension',
    description: 'Éviter les plantes qui peuvent augmenter la tension',
    emoji: '💓',
    category: 'Cardiovasculaire'
  },
  {
    id: 'anticoagulants',
    label: 'Anticoagulants',
    description: 'Interactions possibles avec les médicaments anticoagulants',
    emoji: '💊',
    category: 'Médicaments'
  },
  {
    id: 'allergies_asteracees',
    label: 'Allergies Astéracées',
    description: 'Allergie aux plantes de la famille des astéracées',
    emoji: '🌼',
    category: 'Allergies'
  },
  {
    id: 'diabete',
    label: 'Diabète',
    description: 'Surveiller les plantes qui affectent la glycémie',
    emoji: '🩸',
    category: 'Métabolisme'
  },
  {
    id: 'troubles_hepatiques',
    label: 'Troubles hépatiques',
    description: 'Éviter les plantes hépatotoxiques',
    emoji: '🫘',
    category: 'Organes'
  },
  {
    id: 'troubles_renaux',
    label: 'Troubles rénaux',
    description: 'Prudence avec les plantes diurétiques',
    emoji: '🫘',
    category: 'Organes'
  },
  {
    id: 'epilepsie',
    label: 'Épilepsie',
    description: 'Éviter les plantes convulsivantes',
    emoji: '🧠',
    category: 'Neurologique'
  },
  {
    id: 'chirurgie',
    label: 'Chirurgie prévue',
    description: 'Arrêter certaines plantes avant une intervention',
    emoji: '🏥',
    category: 'Médical'
  }
];

export default function ContraindicationsScreen() {
  const [selectedContraindications, setSelectedContraindications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userContraindications, saveContraindications, clearContraindications } = useContraindications();
  const mobile = useMobileResponsive();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isLoading) {
      setSelectedContraindications(userContraindications);
    }
  }, [userContraindications, isLoading]);

  useEffect(() => {
    // Simuler un petit délai de chargement pour une meilleure UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleContraindication = (id: string) => {
    setSelectedContraindications(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const continueToBodyZone = async () => {
    try {
      // Sauvegarder les contre-indications sélectionnées
      await saveContraindications(selectedContraindications);
      
      // Marquer l'onboarding comme complété
      await firstLaunchService.markOnboardingCompleted();
      
      // Naviguer vers les zones du corps
      router.push('/body-zones');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder les contre-indications');
    }
  };

  const skipContraindications = async () => {
    try {
      await clearContraindications();
      await firstLaunchService.markOnboardingCompleted();
      router.push('/body-zones');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      router.push('/body-zones');
    }
  };

  // Fonction pour créer des styles dynamiques basés sur la taille d'écran
  const createStyles = () => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#122117',
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0, // Gestion Android
    },
    scrollView: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: mobile.contentPadding,
    },
    loadingText: {
      marginTop: mobile.safeSpacing,
      fontSize: mobile.bodySize,
      color: '#96C4A8',
      textAlign: 'center',
      fontWeight: '500',
    },
    
    // Header Section
    header: {
      paddingHorizontal: mobile.contentPadding,
      paddingTop: Math.max(insets.top, mobile.safeSpacing * 1.5), // Respecte les safe areas
      paddingBottom: mobile.safeSpacing,
      backgroundColor: 'transparent',
      marginBottom: mobile.safeSpacing,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: mobile.safeSpacing / 2,
    },
    continueHeaderButton: {
      backgroundColor: '#38E078',
      paddingHorizontal: mobile.safeSpacing,
      paddingVertical: mobile.safeSpacing / 2,
      borderRadius: mobile.isMobile ? 8 : 10,
    },
    continueHeaderButtonText: {
      color: '#ffffff',
      fontSize: mobile.bodySize - 2,
      fontWeight: '600',
    },
    nextButton: {
      backgroundColor: '#38E078',
      paddingHorizontal: mobile.safeSpacing,
      paddingVertical: mobile.safeSpacing / 2,
      borderRadius: mobile.isMobile ? 8 : 10,
    },
    nextButtonText: {
      color: '#ffffff',
      fontSize: mobile.bodySize - 2,
      fontWeight: '600',
    },
    title: {
      fontSize: mobile.titleSize,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 0,
      flex: 1,
    },
    subtitle: {
      fontSize: mobile.bodySize,
      color: '#96C4A8',
      textAlign: 'center',
      lineHeight: mobile.bodySize * 1.4,
      marginBottom: mobile.safeSpacing,
    },
    progressIndicator: {
      backgroundColor: 'rgba(124, 152, 133, 0.1)',
      paddingHorizontal: mobile.safeSpacing,
      paddingVertical: mobile.safeSpacing / 2,
      borderRadius: mobile.isMobile ? 12 : 16,
      alignSelf: 'center',
    },
    progressText: {
      fontSize: mobile.bodySize - 2,
      color: '#96C4A8',
      fontWeight: '600',
    },
    skipButtonHeader: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#96C4A8',
      borderRadius: mobile.isMobile ? 8 : 10,
      paddingHorizontal: mobile.safeSpacing,
      paddingVertical: mobile.safeSpacing / 2,
      alignSelf: 'center',
      marginBottom: mobile.safeSpacing / 2,
    },
    skipButtonHeaderText: {
      color: '#96C4A8',
      fontSize: mobile.bodySize - 3,
      fontWeight: '600',
      textAlign: 'center',
    },

    // Grid Container
    gridContainer: {
      paddingHorizontal: mobile.contentPadding,
      flexDirection: 'column',
      gap: mobile.safeSpacing / 2,
    },

    // Card Styles
    contraindicationCard: {
      width: '100%',
      backgroundColor: 'transparent',
      borderRadius: mobile.isMobile ? 8 : 10,
      padding: mobile.safeSpacing / 1.5,
      marginBottom: 0,
      borderWidth: 0,
      borderColor: 'transparent',
      position: 'relative',
      minHeight: mobile.isMobile ? 80 : 100,
      flexDirection: 'row',
      alignItems: 'center',
      ...responsive.shadow.small,
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: '#38E078',
      backgroundColor: 'rgba(56, 224, 120, 0.1)',
    },

    // Image Container
    imageContainer: {
      backgroundColor: 'transparent',
      padding: 0,
      borderRadius: 0,
      marginBottom: 0,
      marginLeft: mobile.safeSpacing / 2,
      width: mobile.isMobile ? 60 : 80,
      height: mobile.isMobile ? 60 : 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contraindicationImage: {
      width: mobile.isMobile ? 50 : 70,
      height: mobile.isMobile ? 50 : 70,
    },

    // Content Container
    contentContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingRight: mobile.safeSpacing / 2,
    },

    // Text Styles
    contraindicationTitle: {
      fontSize: mobile.isMobile ? mobile.bodySize : mobile.bodySize + 1,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'left',
      marginBottom: mobile.safeSpacing / 4,
      flex: 0,
    },
    contraindicationDescription: {
      fontSize: mobile.bodySize - 2,
      color: '#96C4A8',
      textAlign: 'left',
      lineHeight: (mobile.bodySize - 2) * 1.2,
      marginBottom: 0,
    },

    // Selection Indicator
    selectionIndicator: {
      position: 'absolute',
      bottom: mobile.safeSpacing / 2,
      right: mobile.safeSpacing / 2,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#38E078',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkIcon: {
      color: '#ffffff',
      fontSize: mobile.bodySize,
      fontWeight: 'bold',
    },

    // Info Container
    infoContainer: {
      paddingHorizontal: mobile.contentPadding,
      marginVertical: mobile.safeSpacing,
    },
    infoCard: {
      backgroundColor: '#e8f4f8',
      borderRadius: mobile.isMobile ? 12 : 16,
      padding: mobile.safeSpacing,
      flexDirection: 'row',
      alignItems: 'center',
      borderLeftWidth: 4,
      borderLeftColor: '#4a90a4',
    },
    infoEmoji: {
      fontSize: mobile.bodySize + 2,
      marginRight: mobile.safeSpacing / 2,
    },
    infoText: {
      flex: 1,
      fontSize: mobile.bodySize - 1,
      color: '#2d4a52',
      lineHeight: (mobile.bodySize - 1) * 1.4,
    },
    bottomSpacer: {
      height: mobile.safeSpacing * 2,
    },
  });

  const styles = createStyles();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#122117" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7c9885" />
          <Text style={styles.loadingText}>
            Préparation de vos contre-indications...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#122117" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Sélectionnez vos conditions médicales pour recevoir des recommandations sécurisées
          </Text>
          <TouchableOpacity
            style={styles.skipButtonHeader}
            onPress={skipContraindications}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonHeaderText}>
              Ignorer cette étape
            </Text>
          </TouchableOpacity>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>
              {selectedContraindications.length} sélectionnée(s)
            </Text>
          </View>
        </View>

        {/* Liste des contre-indications */}
        <View style={styles.gridContainer}>
          {contraindications.map((contraindication) => {
            const isSelected = selectedContraindications.includes(contraindication.id);
            
            return (
              <TouchableOpacity
                key={contraindication.id}
                style={[
                  styles.contraindicationCard,
                  isSelected && styles.selectedCard
                ]}
                onPress={() => toggleContraindication(contraindication.id)}
                activeOpacity={0.8}
              >
                {/* Contenu principal avec titre et description à gauche */}
                <View style={styles.contentContainer}>
                  <Text style={styles.contraindicationTitle}>{contraindication.label}</Text>
                  <Text style={styles.contraindicationDescription}>
                    {contraindication.description}
                  </Text>
                </View>

                {/* Image principale à droite */}
                <View style={styles.imageContainer}>
                  <Image
                    source={contraindicationImages[contraindication.id]}
                    style={styles.contraindicationImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Indicateur de sélection */}
                {isSelected && (
                  <View style={styles.selectionIndicator}>
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Information supplémentaire */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>ℹ️</Text>
            <Text style={styles.infoText}>
              Ces informations nous aident à filtrer les plantes qui pourraient ne pas vous convenir
            </Text>
          </View>
        </View>

        {/* Espace en bas */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}
