import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { symptomCategories, findPlantsBySymptoms } from '../data/DataPlant';
import { responsive } from '../utils/responsive';

export default function SymptomSearchScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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
    // Naviguer vers l'écran de résultats avec les plantes trouvées
    router.push({
      pathname: '/symptom-results' as any,
      params: { 
        symptoms: JSON.stringify(selectedSymptoms),
        plantsCount: foundPlants.length.toString()
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { fontSize: responsive.fontSize.title }]}>
          Recherche par symptômes 🔍
        </Text>
        
        <Text style={[styles.subtitle, { fontSize: responsive.fontSize.medium }]}>
          Sélectionnez vos symptômes pour découvrir les plantes qui peuvent vous aider
        </Text>

        {selectedSymptoms.length > 0 && (
          <View style={[styles.selectedContainer, { 
            padding: responsive.padding.md,
            borderRadius: responsive.borderRadius.medium,
            marginBottom: responsive.spacing.lg
          }]}>
            <Text style={[styles.selectedTitle, { fontSize: responsive.fontSize.large }]}>
              Symptômes sélectionnés ({selectedSymptoms.length})
            </Text>
            <View style={styles.selectedGrid}>
              {selectedSymptoms.map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.selectedSymptom, { 
                    padding: responsive.padding.sm,
                    borderRadius: responsive.borderRadius.small
                  }]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[styles.selectedSymptomText, { fontSize: responsive.fontSize.small }]}>
                    {symptom} ✕
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={[styles.searchButton, { 
                padding: responsive.padding.md,
                borderRadius: responsive.borderRadius.medium,
                marginTop: responsive.spacing.md
              }]}
              onPress={searchPlants}
            >
              <Text style={[styles.searchButtonText, { fontSize: responsive.fontSize.medium }]}>
                Rechercher les plantes ({selectedSymptoms.length} symptôme{selectedSymptoms.length > 1 ? 's' : ''})
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {symptomCategories.map((category) => (
          <View key={category.id} style={[styles.categoryContainer, { 
            marginBottom: responsive.spacing.md,
            borderRadius: responsive.borderRadius.medium,
            ...responsive.shadow.small
          }]}>
            <TouchableOpacity
              style={[styles.categoryHeader, { 
                padding: responsive.padding.md,
                borderRadius: responsive.borderRadius.medium
              }]}
              onPress={() => toggleCategory(category.id)}
            >
              <View style={styles.categoryHeaderContent}>
                <Text style={[styles.categoryEmoji, { fontSize: responsive.fontSize.large }]}>
                  {category.emoji}
                </Text>
                <Text style={[styles.categoryName, { fontSize: responsive.fontSize.medium }]}>
                  {category.name}
                </Text>
                <Text style={[styles.categoryCount, { fontSize: responsive.fontSize.small }]}>
                  {category.symptoms.length}
                </Text>
              </View>
              <Text style={[styles.expandIcon, { fontSize: responsive.fontSize.large }]}>
                {expandedCategories.includes(category.id) ? '−' : '+'}
              </Text>
            </TouchableOpacity>

            {expandedCategories.includes(category.id) && (
              <View style={[styles.symptomsContainer, { 
                paddingHorizontal: responsive.padding.md,
                paddingBottom: responsive.padding.md
              }]}>
                {category.symptoms.map((symptom, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.symptomItem,
                      {
                        padding: responsive.padding.sm,
                        borderRadius: responsive.borderRadius.small,
                        marginBottom: responsive.spacing.xs
                      },
                      selectedSymptoms.includes(symptom) && styles.symptomSelected
                    ]}
                    onPress={() => toggleSymptom(symptom)}
                  >
                    <Text style={[
                      styles.symptomText,
                      { fontSize: responsive.fontSize.small },
                      selectedSymptoms.includes(symptom) && styles.symptomTextSelected
                    ]}>
                      {selectedSymptoms.includes(symptom) ? '✓ ' : ''}{symptom}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
  title: {
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginTop: responsive.spacing.md,
    marginBottom: responsive.spacing.sm,
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: responsive.spacing.lg,
    lineHeight: 22,
  },
  selectedContainer: {
    backgroundColor: '#e0f2fe',
    borderWidth: 2,
    borderColor: '#7c9885',
  },
  selectedTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: responsive.spacing.sm,
  },
  selectedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing.xs,
  },
  selectedSymptom: {
    backgroundColor: '#7c9885',
  },
  selectedSymptomText: {
    color: '#fff',
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#7c9885',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  categoryContainer: {
    backgroundColor: '#fff',
  },
  categoryHeader: {
    backgroundColor: '#fff',
  },
  categoryHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    marginRight: responsive.spacing.sm,
  },
  categoryName: {
    flex: 1,
    fontWeight: '600',
    color: '#1f2937',
  },
  categoryCount: {
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: responsive.spacing.sm,
  },
  expandIcon: {
    color: '#7c9885',
    fontWeight: 'bold',
  },
  symptomsContainer: {
    backgroundColor: '#f9fafb',
  },
  symptomItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  symptomSelected: {
    backgroundColor: '#7c9885',
    borderColor: '#7c9885',
  },
  symptomText: {
    color: '#374151',
  },
  symptomTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
});
