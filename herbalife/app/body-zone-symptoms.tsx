import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { responsive } from '../utils/responsive';
import { usePortableAdaptiveStyles } from '../hooks/usePortableAdaptive';
import { findPlantsBySymptoms } from '../data/DataPlant';

// Emojis personnalisés pour chaque symptôme
const symptomEmojis: { [key: string]: string } = {
  // Tête & Cerveau
  'Maux de tête': '🤕',
  'Migraine': '😵‍💫',
  'Stress': '😰',
  'Anxiété': '😟',
  'Troubles de concentration': '🤔',
  'Fatigue mentale': '😴',
  'Troubles de la mémoire': '🧠',
  'Vertiges': '💫',
  'Irritabilité': '😤',
  
  // Gorge & Respiratoire
  'Mal de gorge': '🗣️',
  'Toux sèche': '😷',
  'Toux grasse': '🤧',
  'Rhume': '🤒',
  'Sinusite': '😤',
  'Bronchite': '🫁',
  'Enrouement': '🔇',
  'Allergies respiratoires': '🤧',
  'Essoufflement': '😮‍💨',
  
  // Cœur & Circulation
  'Palpitations': '💓',
  'Hypertension': '📈',
  'Jambes lourdes': '🦵',
  'Varices': '🔴',
  'Circulation sanguine': '🩸',
  'Rétention d\'eau': '💧',
  
  // Estomac & Digestion
  'Ballonnements': '🎈',
  'Brûlures d\'estomac': '🔥',
  'Nausées': '🤢',
  'Constipation': '🚽',
  'Diarrhée': '💩',
  'Digestion difficile': '🍽️',
  'Crampes intestinales': '⚡',
  'Reflux gastrique': '↗️',
  
  // Muscles & Articulations
  'Douleurs musculaires': '💪',
  'Douleurs articulaires': '🦴',
  'Arthrite': '🔥',
  'Rhumatismes': '🌧️',
  'Crampes': '⚡',
  'Tendinite': '🎯',
  'Mal de dos': '🔙',
  'Courbatures': '😣',
  
  // Peau & Cheveux
  'Acné': '🔴',
  'Eczéma': '🟤',
  'Psoriasis': '🔶',
  'Peau sèche': '🏜️',
  'Démangeaisons': '🔴',
  'Pellicules': '❄️',
  'Chute de cheveux': '💇',
  'Irritations cutanées': '🟠',
  
  // Sommeil & Énergie
  'Insomnie': '🌙',
  'Difficultés d\'endormissement': '😴',
  'Réveils nocturnes': '🔄',
  'Fatigue chronique': '😴',
  'Manque d\'énergie': '🔋',
  'Épuisement': '😵',
  'Somnolence': '💤',
  
  // Système urinaire
  'Infections urinaires': '🚨',
  'Rétention urinaire': '💧',
  'Calculs rénaux': '⚡',
  'Incontinence': '💧',
  'Cystite': '🔥',
  'Mictions fréquentes': '🔄'
};

// Mapping des zones vers leurs symptômes spécifiques
const zoneSymptoms: { [key: string]: { name: string, emoji: string, symptoms: string[] } } = {
  'tete': {
    name: 'Tête & Cerveau',
    emoji: '🧠',
    symptoms: [
      'Maux de tête',
      'Migraine',
      'Stress',
      'Anxiété',
      'Troubles de concentration',
      'Fatigue mentale',
      'Troubles de la mémoire',
      'Vertiges',
      'Irritabilité'
    ]
  },
  'gorge': {
    name: 'Gorge & Respiratoire',
    emoji: '🫁',
    symptoms: [
      'Mal de gorge',
      'Toux sèche',
      'Toux grasse',
      'Rhume',
      'Sinusite',
      'Bronchite',
      'Enrouement',
      'Allergies respiratoires',
      'Essoufflement'
    ]
  },
  'coeur': {
    name: 'Cœur & Circulation',
    emoji: '❤️',
    symptoms: [
      'Palpitations',
      'Hypertension',
      'Hypotension',
      'Jambes lourdes',
      'Varices',
      'Œdèmes',
      'Troubles circulatoires',
      'Sensation d\'oppression'
    ]
  },
  'ventre': {
    name: 'Ventre & Digestion',
    emoji: '🫃',
    symptoms: [
      'Ballonnements',
      'Gaz',
      'Constipation',
      'Diarrhée',
      'Nausées',
      'Reflux acide',
      'Douleurs abdominales',
      'Mauvaise digestion',
      'Foie engorgé'
    ]
  },
  'articulations': {
    name: 'Articulations & Muscles',
    emoji: '🦴',
    symptoms: [
      'Douleurs articulaires',
      'Rhumatismes',
      'Arthrite',
      'Crampes musculaires',
      'Raideur matinale',
      'Douleurs dorsales',
      'Tensions cervicales',
      'Inflammations'
    ]
  },
  'peau': {
    name: 'Peau & Beauté',
    emoji: '✨',
    symptoms: [
      'Acné',
      'Eczéma',
      'Psoriasis',
      'Peau sèche',
      'Irritations cutanées',
      'Cicatrisation lente',
      'Teint terne',
      'Démangeaisons'
    ]
  },
  'sommeil': {
    name: 'Sommeil & Détente',
    emoji: '😴',
    symptoms: [
      'Insomnie',
      'Troubles du sommeil',
      'Difficultés d\'endormissement',
      'Réveils nocturnes',
      'Anxiété',
      'Stress chronique',
      'Agitation',
      'Nervosité'
    ]
  },
  'immunite': {
    name: 'Immunité & Énergie',
    emoji: '🛡️',
    symptoms: [
      'Fatigue chronique',
      'Baisse d\'immunité',
      'Infections fréquentes',
      'Convalescence',
      'Manque d\'énergie',
      'Épuisement',
      'Résistance faible'
    ]
  }
};

export default function BodyZoneSymptomsScreen() {
  const params = useLocalSearchParams();
  const { zone, contraindications } = params;
  const userContraindications = contraindications ? JSON.parse(contraindications as string) : [];
  const adaptiveStyles = usePortableAdaptiveStyles();
  
  const zoneData = zone ? zoneSymptoms[zone as string] : null;

  if (!zoneData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Zone non trouvée</Text>
      </SafeAreaView>
    );
  }

  const handleSymptomPress = (symptom: string) => {
    // Rechercher les plantes qui traitent ce symptôme
    const foundPlants = findPlantsBySymptoms([symptom]);
    
    router.push({
      pathname: '/symptom-results' as any,
      params: { 
        symptoms: JSON.stringify([symptom]),
        plantsCount: foundPlants.length.toString(),
        contraindications: JSON.stringify(userContraindications),
        zoneName: zoneData.name,
        selectedSymptom: symptom
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec informations de la zone */}
      <View style={styles.header}>
        <View style={styles.zoneInfo}>
          <Text style={[styles.zoneEmoji, { fontSize: adaptiveStyles.typography.hero }]}>
            {zoneData.emoji}
          </Text>
          <View style={styles.zoneDetails}>
            <Text style={[styles.zoneTitle, { fontSize: adaptiveStyles.typography.title }]}>
              {zoneData.name}
            </Text>
            <Text style={[styles.zoneDescription, { fontSize: adaptiveStyles.typography.body }]}>
              Sélectionnez votre symptôme principal
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.symptomsContainer, { 
          paddingHorizontal: adaptiveStyles.spacing.container 
        }]}>
          <Text style={[styles.sectionTitle, { fontSize: adaptiveStyles.typography.subtitle }]}>
            Symptômes disponibles :
          </Text>
          
          <View style={[
            styles.symptomsGrid,
            {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: adaptiveStyles.spacing.items,
            }
          ]}>
            {zoneData.symptoms.map((symptom, index) => {
              const symptomEmoji = symptomEmojis[symptom] || '🎯';
              const itemWidth = adaptiveStyles.columns.symptoms === 2 ? '48%' :
                             adaptiveStyles.columns.symptoms === 3 ? '31%' :
                             adaptiveStyles.columns.symptoms === 4 ? '23%' :
                             adaptiveStyles.columns.symptoms === 5 ? '18%' : '100%';
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.symptomCard,
                    {
                      width: itemWidth,
                      minHeight: adaptiveStyles.dimensions.cardMinHeight,
                      marginBottom: adaptiveStyles.spacing.items,
                      padding: adaptiveStyles.spacing.cards,
                      borderRadius: adaptiveStyles.borderRadius.medium,
                      ...adaptiveStyles.shadows.light,
                    }
                  ]}
                  onPress={() => handleSymptomPress(symptom)}
                  activeOpacity={0.8}
                >
                  <View style={styles.symptomContent}>
                    <View style={[
                      styles.symptomIcon,
                      {
                        width: adaptiveStyles.iconSizes.large,
                        height: adaptiveStyles.iconSizes.large,
                        borderRadius: adaptiveStyles.borderRadius.small,
                        marginBottom: adaptiveStyles.spacing.items / 2
                      }
                    ]}>
                      <Text style={[styles.symptomEmoji, { fontSize: adaptiveStyles.iconSizes.medium }]}>
                        {symptomEmoji}
                      </Text>
                    </View>
                    
                    <View style={styles.symptomTextContainer}>
                      <Text style={[
                        styles.symptomText,
                        { fontSize: adaptiveStyles.typography.small }
                      ]}>
                        {symptom}
                      </Text>
                      <Text style={[
                        styles.symptomSubtext,
                        { fontSize: adaptiveStyles.typography.caption }
                      ]}>
                        Tap pour voir les plantes
                      </Text>
                    </View>
                    
                    <View>
                      <Text style={[styles.arrow, { fontSize: adaptiveStyles.typography.body }]}>
                        →
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  zoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneEmoji: {
    marginRight: 16,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneTitle: {
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  zoneDescription: {
    color: '#6B7280',
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  symptomsContainer: {
    paddingVertical: 20,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '48%',
    marginHorizontal: '1%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  symptomCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  symptomContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  symptomIcon: {
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  symptomEmoji: {
    textAlign: 'center',
  },
  symptomTextContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  symptomText: {
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
    lineHeight: 24,
    textAlign: 'center',
  },
  symptomSubtext: {
    color: '#64748B',
    lineHeight: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  arrow: {
    color: '#6366F1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    margin: 20,
  },
});
