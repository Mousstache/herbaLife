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
                <Text style={styles.mainEmoji}>{contraindication.emoji}</Text>

                {/* Titre */}
                <Text style={[styles.cardTitle, isSelected && styles.selectedCardTitle]}>
                  {contraindication.label}
                </Text>

                {/* Description */}
                <Text style={[styles.cardDescription, isSelected && styles.selectedCardDescription]}>
                  {contraindication.description}
                </Text>

                {/* Indicateur de sélection */}
                {isSelected && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Informations supplémentaires */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>ℹ️</Text>
            <Text style={styles.infoText}>
              Vos données restent privées et sont stockées localement sur votre appareil
            </Text>
          </View>
        </View>

        {/* Boutons d'action */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={continueToBodyZone}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              Continuer ({selectedContraindications.length} sélectionnée(s))
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={skipContraindications}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>
              Passer cette étape
            </Text>
          </TouchableOpacity>
        </View>

        {/* Espace en bas pour éviter que le contenu soit coupé */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: responsive.spacing.lg,
  },
  loadingText: {
    marginTop: responsive.spacing.md,
    fontSize: responsive.fontSize.medium,
    color: '#7c9885',
    textAlign: 'center',
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: responsive.spacing.lg,
    paddingTop: responsive.spacing.xl,
    paddingBottom: responsive.spacing.lg,
    backgroundColor: '#ffffff',
    marginBottom: responsive.spacing.md,
    borderBottomLeftRadius: responsive.borderRadius.large,
    borderBottomRightRadius: responsive.borderRadius.large,
    ...responsive.shadow.small,
  },
  title: {
    fontSize: responsive.fontSize.title,
    fontWeight: 'bold',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.sm,
  },
  subtitle: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
    textAlign: 'center',
    lineHeight: responsive.fontSize.medium * 1.4,
    marginBottom: responsive.spacing.md,
  },
  progressIndicator: {
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    paddingHorizontal: responsive.spacing.md,
    paddingVertical: responsive.spacing.xs,
    borderRadius: responsive.borderRadius.large,
    alignSelf: 'center',
  },
  progressText: {
    fontSize: responsive.fontSize.small,
    color: '#7c9885',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: responsive.spacing.lg,
    justifyContent: 'space-between',
  },
  contraindicationCard: {
    width: responsive.width < 600 ? '48%' : '31%',
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    marginBottom: responsive.spacing.md,
    borderWidth: 2,
    borderColor: '#e8f0e8',
    position: 'relative',
    minHeight: 140,
    ...responsive.shadow.small,
  },
  selectedCard: {
    borderColor: '#7c9885',
    backgroundColor: '#f0f8f0',
    transform: [{ scale: 1.02 }],
    ...responsive.shadow.medium,
  },
  categoryBadge: {
    position: 'absolute',
    top: responsive.spacing.xs,
    right: responsive.spacing.xs,
    backgroundColor: '#e8f0e8',
    paddingHorizontal: responsive.spacing.xs,
    paddingVertical: 2,
    borderRadius: responsive.borderRadius.small,
  },
  selectedCategoryBadge: {
    backgroundColor: '#7c9885',
  },
  categoryText: {
    fontSize: responsive.fontSize.xs,
    color: '#7c9885',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  mainEmoji: {
    fontSize: responsive.fontSize.title + 4,
    textAlign: 'center',
    marginBottom: responsive.spacing.xs,
    marginTop: responsive.spacing.sm,
  },
  cardTitle: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '700',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.xs,
  },
  selectedCardTitle: {
    color: '#1a3d21',
  },
  cardDescription: {
    fontSize: responsive.fontSize.small,
    color: '#6b7c68',
    textAlign: 'center',
    lineHeight: responsive.fontSize.small * 1.3,
  },
  selectedCardDescription: {
    color: '#2d5738',
  },
  selectedIndicator: {
    position: 'absolute',
    top: responsive.spacing.xs,
    left: responsive.spacing.xs,
    backgroundColor: '#7c9885',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    paddingHorizontal: responsive.spacing.lg,
    marginVertical: responsive.spacing.lg,
  },
  infoCard: {
    backgroundColor: '#e8f4f8',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4a90a4',
  },
  infoEmoji: {
    fontSize: responsive.fontSize.large,
    marginRight: responsive.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: responsive.fontSize.small,
    color: '#2d4a52',
    lineHeight: responsive.fontSize.small * 1.4,
  },
  actionButtons: {
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.spacing.md,
  },
  continueButton: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.borderRadius.medium,
    paddingVertical: responsive.padding.button + 4,
    alignItems: 'center',
    marginBottom: responsive.spacing.sm,
    ...responsive.shadow.medium,
  },
  continueButtonText: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderRadius: responsive.borderRadius.medium,
    paddingVertical: responsive.padding.button,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d1d9d1',
  },
  skipButtonText: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '500',
    color: '#6b7c68',
  },
  bottomSpacer: {
    height: responsive.spacing.xl,
  },
});
