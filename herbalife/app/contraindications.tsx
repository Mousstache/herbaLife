import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';

interface Contraindication {
  id: string;
  label: string;
  description: string;
  emoji: string;
}

const contraindications: Contraindication[] = [
  {
    id: 'grossesse',
    label: 'Grossesse',
    description: 'Éviter les plantes déconseillées pendant la grossesse',
    emoji: '🤱'
  },
  {
    id: 'allaitement',
    label: 'Allaitement',
    description: 'Prudence avec les plantes pendant l\'allaitement',
    emoji: '🤱'
  },
  {
    id: 'hypertension',
    label: 'Hypertension',
    description: 'Éviter les plantes qui peuvent augmenter la tension',
    emoji: '💓'
  },
  {
    id: 'anticoagulants',
    label: 'Anticoagulants',
    description: 'Interactions possibles avec les médicaments anticoagulants',
    emoji: '💊'
  },
  {
    id: 'allergies_asteracees',
    label: 'Allergies aux Astéracées',
    description: 'Éviter les plantes de la famille des Astéracées',
    emoji: '🌼'
  },
  {
    id: 'maladies_auto_immunes',
    label: 'Maladies auto-immunes',
    description: 'Prudence avec les plantes immunostimulantes',
    emoji: '🛡️'
  },
  {
    id: 'ulceres_gastriques',
    label: 'Ulcères gastriques',
    description: 'Éviter les plantes irritantes pour l\'estomac',
    emoji: '🫃'
  },
  {
    id: 'troubles_hormonaux',
    label: 'Troubles hormonaux',
    description: 'Prudence avec les plantes à effets hormonaux',
    emoji: '⚖️'
  },
  {
    id: 'phenylcetonurie',
    label: 'Phénylcétonurie',
    description: 'Éviter certaines plantes riches en acides aminés',
    emoji: '🧬'
  },
  {
    id: 'enfants',
    label: 'Enfant de moins de 12 ans',
    description: 'Dosages et plantes adaptés aux enfants',
    emoji: '👶'
  }
];

export default function ContraindicationsScreen() {
  const [selectedContraindications, setSelectedContraindications] = useState<string[]>([]);

  const toggleContraindication = (id: string) => {
    setSelectedContraindications(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const continueToBodyZone = () => {
    // Stocker les contre-indications sélectionnées (on pourra les utiliser plus tard)
    // Pour l'instant, on navigue vers la sélection des zones du corps
    router.push({
      pathname: '/body-zone',
      params: { contraindications: JSON.stringify(selectedContraindications) }
    });
  };

  const skipContraindications = () => {
    router.push('/body-zone');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Contre-indications</Text>
          <Text style={styles.subtitle}>
            Sélectionnez vos contre-indications pour personnaliser vos recommandations
          </Text>
        </View>

        <View style={styles.contraindicationsList}>
          {contraindications.map((contraindication) => (
            <TouchableOpacity
              key={contraindication.id}
              style={[
                styles.contraindicationItem,
                selectedContraindications.includes(contraindication.id) && styles.selectedItem
              ]}
              onPress={() => toggleContraindication(contraindication.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{contraindication.emoji}</Text>
              <Text style={[
                styles.label,
                selectedContraindications.includes(contraindication.id) && styles.selectedLabel
              ]}>
                {contraindication.label}
              </Text>
              
              {/* Indicateur de sélection */}
              {selectedContraindications.includes(contraindication.id) && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={continueToBodyZone}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              Continuer {selectedContraindications.length > 0 && `(${selectedContraindications.length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={skipContraindications}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>Ignorer cette étape</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: responsive.padding.container,
  },
  header: {
    marginTop: responsive.spacing.lg,
    marginBottom: responsive.spacing.md,
    alignItems: 'center',
  },
  title: {
    fontSize: responsive.fontSize.title,
    fontWeight: '700',
    color: '#2d5738',
    marginBottom: responsive.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6c57',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: responsive.spacing.md,
  },
  contraindicationsList: {
    flex: 1,
    flexDirection: responsive.columns.contraindications === 1 ? 'column' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    gap: responsive.spacing.xs,
  },
  contraindicationItem: {
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    width: responsive.columns.contraindications === 1 ? '100%' : '48%',
    height: responsive.height < 700 ? 85 : 95, // Hauteur fixe plus petite
    padding: responsive.padding.card - 4,
    borderWidth: 2,
    borderColor: '#e8ede8',
    shadowColor: '#000',
    ...responsive.shadow.small, // Ombres plus petites
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedItem: {
    backgroundColor: '#e8f5e8',
    borderColor: '#7c9885',
    borderWidth: 3,
  },
  emoji: {
    fontSize: responsive.height < 700 ? 20 : 24, // Emoji plus petit sur petits écrans
    marginBottom: responsive.spacing.xs / 2,
    textAlign: 'center',
  },
  label: {
    fontSize: responsive.height < 700 ? 11 : responsive.fontSize.small,
    fontWeight: '700',
    color: '#2d5738',
    textAlign: 'center',
    lineHeight: responsive.height < 700 ? 13 : 16,
    paddingHorizontal: 2,
  },
  selectedLabel: {
    color: '#2d5738',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#7c9885',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    paddingVertical: responsive.spacing.md,
  },
  continueButton: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.borderRadius.small,
    paddingVertical: responsive.padding.button,
    alignItems: 'center',
    marginBottom: responsive.spacing.sm,
    shadowColor: '#7c9885',
    ...responsive.shadow.medium,
  },
  continueButtonText: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: '#ffffff',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderRadius: responsive.borderRadius.small,
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
});
