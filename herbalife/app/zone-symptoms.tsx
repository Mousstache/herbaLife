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
                    backgroundColor: isSelected ? (zoneColor as string + '15') : '#FFFFFF',
                    borderColor: isSelected ? zoneColor as string : '#E5E7EB',
                    borderWidth: isSelected ? 2 : 1,
                    marginBottom: responsive.spacing.sm,
                    padding: responsive.padding.card,
                    borderRadius: responsive.borderRadius.medium
                  }
                ]}
                onPress={() => toggleSymptom(symptom)}
                activeOpacity={0.7}
              >
                <View style={styles.symptomContent}>
                  <View style={[
                    styles.checkBox,
                    {
                      backgroundColor: isSelected ? zoneColor as string : 'transparent',
                      borderColor: isSelected ? zoneColor as string : '#D1D5DB',
                      width: responsive.iconSize.medium,
                      height: responsive.iconSize.medium,
                      borderRadius: responsive.borderRadius.small
                    }
                  ]}>
                    {isSelected && (
                      <Text style={[styles.checkMark, { fontSize: responsive.fontSize.small }]}>
                        ✓
                      </Text>
                    )}
                  </View>
                  
                  <Text style={[
                    styles.symptomText,
                    {
                      fontSize: responsive.fontSize.medium,
                      color: isSelected ? zoneColor as string : '#374151',
                      fontWeight: isSelected ? '600' : '400'
                    }
                  ]}>
                    {symptom}
                  </Text>
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
                backgroundColor: zoneColor as string,
                height: responsive.buttonHeight.medium,
                borderRadius: responsive.borderRadius.medium,
                paddingHorizontal: responsive.padding.lg
              }
            ]}
            onPress={searchPlants}
            activeOpacity={0.9}
          >
            <Text style={[styles.searchButtonText, { fontSize: responsive.fontSize.medium }]}>
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
  },
  zoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  zoneEmoji: {
    marginRight: 16,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  zoneDescription: {
    color: '#6B7280',
    lineHeight: 20,
  },
  subtitle: {
    color: '#6B7280',
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
  },
  checkBox: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
