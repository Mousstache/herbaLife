import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { bodyZones, findPlantsBySymptoms } from '../data/DataPlant';
import { responsive } from '../utils/responsive';

export default function ZoneSymptomsScreen() {
  const params = useLocalSearchParams();
  const { zoneId, zoneName, zoneEmoji, zoneColor } = params;
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  // Trouver la zone correspondante
  const zone = bodyZones.find(z => z.id === zoneId);
  
  if (!zone) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Zone non trouvée</Text>
      </SafeAreaView>
    );
  }

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const searchPlants = () => {
    if (selectedSymptoms.length === 0) return;
    
    const foundPlants = findPlantsBySymptoms(selectedSymptoms);
    router.push({
      pathname: '/symptom-results' as any,
      params: { 
        symptoms: JSON.stringify(selectedSymptoms),
        plantsCount: foundPlants.length.toString(),
        zoneId: zoneId as string,
        zoneName: zoneName as string
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec informations de la zone */}
      <View style={[styles.header, { borderBottomColor: zoneColor as string + '20' }]}>
        {/* Barre de progression */}
        <View style={styles.progressSection}>
          <Text style={styles.stepIndicator}>Étape 3/3</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.zoneInfo}>
          <Text style={[styles.zoneEmoji, { fontSize: responsive.fontSize.hero }]}>
            {zoneEmoji}
          </Text>
          <View style={styles.zoneDetails}>
            <Text style={[styles.zoneTitle, { 
              fontSize: responsive.fontSize.title,
              color: zoneColor as string
            }]}>
              {zoneName}
            </Text>
            <Text style={[styles.zoneDescription, { fontSize: responsive.fontSize.medium }]}>
              {zone.description}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.subtitle, { fontSize: responsive.fontSize.small }]}>
          Sélectionnez les symptômes qui vous concernent
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.symptomsContainer, { 
          paddingHorizontal: responsive.padding.container 
        }]}>
          {zone.symptoms.map((symptom, index) => {
            const isSelected = selectedSymptoms.includes(symptom);
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.symptomCard,
                  {
                    backgroundColor: isSelected ? 'rgba(56, 224, 120, 0.1)' : '#122117',
                    borderColor: isSelected ? '#38E078' : 'transparent',
                    borderWidth: isSelected ? 2 : 0,
                    marginBottom: responsive.spacing.sm,
                    padding: responsive.padding.card,
                    borderRadius: responsive.borderRadius.medium
                  }
                ]}
                onPress={() => toggleSymptom(symptom)}
                activeOpacity={0.7}
              >
                <View style={styles.symptomContent}>
                  <Text style={[
                    styles.symptomText,
                    {
                      fontSize: responsive.fontSize.medium,
                      color: isSelected ? '#FFFFFF' : '#96C4A8',
                      fontWeight: isSelected ? '600' : '400'
                    }
                  ]}>
                    {symptom}
                  </Text>
                  
                  <View style={[
                    styles.checkBox,
                    {
                      backgroundColor: isSelected ? '#38E078' : 'transparent',
                      borderColor: isSelected ? '#38E078' : '#96C4A8',
                      width: 20,
                      height: 20,
                      borderRadius: 3
                    }
                  ]}>
                    {isSelected && (
                      <Text style={[styles.checkMark, { fontSize: 14 }]}>
                        ✓
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bouton de recherche fixe */}
      {selectedSymptoms.length > 0 && (
        <View style={[styles.searchButtonContainer, {
          paddingHorizontal: responsive.padding.container,
          paddingVertical: responsive.padding.md
        }]}>
          <TouchableOpacity
            style={[
              styles.searchButton,
              {
                backgroundColor: '#38E078',
                borderWidth: 0,
                height: responsive.buttonHeight.medium,
                borderRadius: responsive.borderRadius.medium,
                paddingHorizontal: responsive.padding.lg
              }
            ]}
            onPress={searchPlants}
            activeOpacity={0.9}
          >
            <Text style={[styles.searchButtonText, { fontSize: responsive.fontSize.medium, color: '#FFFFFF' }]}>
              Voir les remèdes ({selectedSymptoms.length} symptôme{selectedSymptoms.length > 1 ? 's' : ''})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122117',
  },
  header: {
    backgroundColor: '#1a2419',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#96C4A8',
  },
  progressSection: {
    marginBottom: 16,
  },
  stepIndicator: {
    fontSize: 14,
    color: '#96C4A8',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(150, 196, 168, 0.2)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#38E078',
    borderRadius: 2,
    width: '100%', // Étape 3/3 = 100%
  },
  zoneInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  zoneEmoji: {
    marginBottom: 8,
    textAlign: 'center',
  },
  zoneDetails: {
    flex: 1,
    alignItems: 'center',
  },
  zoneTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  zoneDescription: {
    color: '#96C4A8',
    lineHeight: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: '#96C4A8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
  },
  symptomsContainer: {
    paddingVertical: 20,
  },
  symptomCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  symptomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  checkMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  symptomText: {
    flex: 1,
    lineHeight: 22,
  },
  searchButtonContainer: {
    backgroundColor: '#122117',
    borderTopWidth: 1,
    borderTopColor: '#96C4A8',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    margin: 20,
  },
});
