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
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../i18n';

export default function ZoneSymptomsScreen() {
  const params = useLocalSearchParams();
  const { zoneId, zoneName, zoneEmoji, zoneColor } = params;
  const { t } = useTranslation();
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  // Trouver la zone correspondante
  const zone = bodyZones.find(z => z.id === zoneId);
  
  if (!zone) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t('common.zoneNotFound')}</Text>
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
      {/* Header avec retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('zoneSymptoms.symptomsFor')} {zoneName}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Liste des symptômes */}
        <View style={styles.symptomsContainer}>
          {zone.symptoms.map((symptom, index) => {
            const isSelected = selectedSymptoms.includes(symptom);
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.symptomItem,
                  isSelected && styles.symptomItemSelected
                ]}
                onPress={() => toggleSymptom(symptom)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.symptomText,
                  isSelected && styles.symptomTextSelected
                ]}>
                  {symptom}
                </Text>
                
                <View style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected
                ]}>
                  {isSelected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bouton de recherche fixe */}
      {selectedSymptoms.length > 0 && (
        <View style={styles.searchButtonContainer}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchPlants}
            activeOpacity={0.9}
          >
            <Text style={styles.searchButtonText}>
              {t('zoneSymptoms.search')} ({selectedSymptoms.length})
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
    backgroundColor: '#122118',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#122118',
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
    paddingRight: 48, // Pour compenser le bouton de retour
  },
  content: {
    flex: 1,
  },
  symptomsContainer: {
    paddingHorizontal: 16,
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0,
  },
  symptomItemSelected: {
    backgroundColor: 'rgba(57, 224, 121, 0.1)',
    borderWidth: 2,
    borderColor: '#39e079',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
  },
  symptomText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    flex: 1,
  },
  symptomTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#366347',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkboxSelected: {
    backgroundColor: '#39e079',
    borderColor: '#39e079',
  },
  checkmark: {
    color: '#122118',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#122118',
  },
  searchButton: {
    backgroundColor: '#39e079',
    borderRadius: 25,
    height: 48,
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
    color: '#122118',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    margin: 20,
  },
});
