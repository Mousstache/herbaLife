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
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';
import { useContraindications } from '../contexts/ContraindicationsContext';
import { firstLaunchService } from '../utils/firstLaunchService';
import { useMobileResponsive } from '../hooks/useMobileResponsive';

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
      backgroundColor: '#f8faf9',
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
      color: '#7c9885',
      textAlign: 'center',
      fontWeight: '500',
    },
    
    // Header Section
    header: {
      paddingHorizontal: mobile.contentPadding,
      paddingTop: mobile.safeSpacing * 1.5,
      paddingBottom: mobile.safeSpacing,
      backgroundColor: '#ffffff',
      marginBottom: mobile.safeSpacing,
      borderBottomLeftRadius: mobile.isMobile ? 16 : 20,
      borderBottomRightRadius: mobile.isMobile ? 16 : 20,
      ...responsive.shadow.small,
    },
    title: {
      fontSize: mobile.titleSize,
      fontWeight: 'bold',
      color: '#2d5738',
      textAlign: 'center',
      marginBottom: mobile.safeSpacing / 2,
    },
    subtitle: {
      fontSize: mobile.bodySize,
      color: '#5a6b5d',
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
      color: '#7c9885',
      fontWeight: '600',
    },

    // Grid Container
    gridContainer: {
      paddingHorizontal: mobile.contentPadding,
      flexDirection: mobile.isMobile ? 'column' : 'row',
      flexWrap: mobile.isMobile ? 'nowrap' : 'wrap',
      justifyContent: mobile.isMobile ? 'flex-start' : 'space-between',
      gap: mobile.safeSpacing,
    },

    // Card Styles
    contraindicationCard: {
      width: mobile.isMobile ? '100%' : '48%',
      backgroundColor: '#ffffff',
      borderRadius: mobile.isMobile ? 12 : 16,
      padding: mobile.safeSpacing,
      marginBottom: mobile.isMobile ? mobile.safeSpacing : 0,
      borderWidth: 2,
      borderColor: '#e8f0e8',
      position: 'relative',
      minHeight: mobile.isMobile ? 100 : 140,
      flexDirection: mobile.isMobile ? 'row' : 'column',
      alignItems: mobile.isMobile ? 'center' : 'center',
      ...responsive.shadow.medium,
    },
    selectedCard: {
      borderColor: '#7c9885',
      backgroundColor: '#f0f8f0',
    },

    // Badge Styles
    categoryBadge: {
      position: 'absolute',
      top: mobile.safeSpacing / 2,
      right: mobile.safeSpacing / 2,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: mobile.safeSpacing / 2,
      paddingVertical: 2,
      borderRadius: mobile.isMobile ? 8 : 10,
    },
    selectedCategoryBadge: {
      backgroundColor: '#7c9885',
    },
    categoryText: {
      fontSize: mobile.bodySize - 4,
      color: '#666666',
      fontWeight: '600',
    },
    selectedCategoryText: {
      color: '#ffffff',
    },

    // Emoji Container
    emojiContainer: {
      backgroundColor: '#f8f9fa',
      padding: mobile.safeSpacing / 2,
      borderRadius: mobile.isMobile ? 12 : 16,
      marginBottom: mobile.isMobile ? 0 : mobile.safeSpacing / 2,
      marginRight: mobile.isMobile ? mobile.safeSpacing : 0,
      width: mobile.isMobile ? 60 : 'auto',
      height: mobile.isMobile ? 60 : 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainEmoji: {
      fontSize: mobile.isMobile ? mobile.iconSize : mobile.iconSize + 4,
      textAlign: 'center',
    },

    // Mobile Content Layout
    mobileContentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    mobileHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: mobile.safeSpacing / 3,
    },

    // Text Styles
    contraindicationTitle: {
      fontSize: mobile.isMobile ? mobile.bodySize : mobile.bodySize + 1,
      fontWeight: 'bold',
      color: '#2d5738',
      textAlign: mobile.isMobile ? 'left' : 'center',
      marginBottom: mobile.isMobile ? 0 : mobile.safeSpacing / 3,
      flex: mobile.isMobile ? 1 : 0,
    },
    contraindicationDescription: {
      fontSize: mobile.bodySize - 2,
      color: '#6b7c68',
      textAlign: mobile.isMobile ? 'left' : 'center',
      lineHeight: (mobile.bodySize - 2) * 1.2,
      marginBottom: mobile.isMobile ? 0 : mobile.safeSpacing / 2,
    },

    // Selection Indicator
    selectionIndicator: {
      position: mobile.isMobile ? 'relative' : 'absolute',
      bottom: mobile.isMobile ? 0 : mobile.safeSpacing / 2,
      right: mobile.isMobile ? 0 : mobile.safeSpacing / 2,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#7c9885',
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

    // Action Container
    actionContainer: {
      paddingHorizontal: mobile.contentPadding,
      paddingVertical: mobile.safeSpacing,
      gap: mobile.safeSpacing,
    },
    continueButton: {
      backgroundColor: '#7c9885',
      borderRadius: mobile.isMobile ? 12 : 16,
      paddingVertical: mobile.safeSpacing,
      paddingHorizontal: mobile.safeSpacing * 1.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...responsive.shadow.medium,
    },
    continueButtonText: {
      color: '#ffffff',
      fontSize: mobile.buttonSize,
      fontWeight: 'bold',
      marginRight: mobile.safeSpacing / 2,
    },
    buttonIcon: {
      color: '#ffffff',
      fontSize: mobile.buttonSize,
      fontWeight: 'bold',
    },
    skipButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#e8f0e8',
      borderRadius: mobile.isMobile ? 12 : 16,
      paddingVertical: mobile.safeSpacing,
      paddingHorizontal: mobile.safeSpacing * 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    skipButtonText: {
      color: '#7c9885',
      fontSize: mobile.buttonSize,
      fontWeight: '600',
    },
    bottomSpacer: {
      height: mobile.safeSpacing * 2,
    },
  });

  const styles = createStyles();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7c9885" />
          <Text style={styles.loadingText}>
            Préparation de vos contre-indications...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>🛡️ Contre-indications</Text>
          <Text style={styles.subtitle}>
            Sélectionnez vos conditions médicales pour recevoir des recommandations sécurisées
          </Text>
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
                {/* Badge de catégorie */}
                <View style={[styles.categoryBadge, isSelected && styles.selectedCategoryBadge]}>
                  <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                    {contraindication.category}
                  </Text>
                </View>

                {/* Emoji principal */}
                <View style={styles.emojiContainer}>
                  <Text style={styles.mainEmoji}>{contraindication.emoji}</Text>
                </View>

                {/* Contenu adaptatif */}
                {mobile.isMobile ? (
                  <View style={styles.mobileContentContainer}>
                    <View style={styles.mobileHeaderRow}>
                      <Text style={styles.contraindicationTitle}>{contraindication.label}</Text>
                      {isSelected && (
                        <View style={styles.selectionIndicator}>
                          <Text style={styles.checkIcon}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.contraindicationDescription}>
                      {contraindication.description}
                    </Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.contraindicationTitle}>
                      {contraindication.label}
                    </Text>
                    <Text style={styles.contraindicationDescription}>
                      {contraindication.description}
                    </Text>
                    {isSelected && (
                      <View style={styles.selectionIndicator}>
                        <Text style={styles.checkIcon}>✓</Text>
                      </View>
                    )}
                  </>
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

        {/* Boutons d'action */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={continueToBodyZone}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              Continuer
            </Text>
            <Text style={styles.buttonIcon}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={skipContraindications}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>
              Passer cette étape
            </Text>
          </TouchableOpacity>
        </View>

        {/* Espace en bas */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}
