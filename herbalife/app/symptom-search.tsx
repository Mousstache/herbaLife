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
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../i18n';
import { getSymptomTranslation, getCategoryTranslation } from '../utils/symptomTranslations';

export default function SymptomSearchScreen() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const { t } = useTranslation();

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
          {t('symptomSearch.title')}
        </Text>
        
        <Text style={[styles.subtitle, { fontSize: responsive.fontSize.medium }]}>
          {t('symptomSearch.subtitle')}
        </Text>

        {selectedSymptoms.length > 0 && (
          <View style={[styles.selectedContainer, { 
            padding: responsive.padding.md,
            borderRadius: responsive.borderRadius.medium,
            marginBottom: responsive.spacing.lg
          }]}>
            <Text style={[styles.selectedTitle, { fontSize: responsive.fontSize.large }]}>
              {t('symptomSearch.selectedSymptoms')} ({selectedSymptoms.length})
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
                    {getSymptomTranslation(symptom, t)} ✕
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
                {t('symptomSearch.searchButton')} ({selectedSymptoms.length} {selectedSymptoms.length > 1 ? t('symptomSearch.symptoms') : t('symptomSearch.symptom')})
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
                  {getCategoryTranslation(category.name, t)}
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
                      {getSymptomTranslation(symptom, t)}
                    </Text>
                    <View style={[
                      styles.checkbox,
                      selectedSymptoms.includes(symptom) && styles.checkboxSelected
                    ]}>
                      {selectedSymptoms.includes(symptom) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/body-zones')}>
          <Ionicons name="home-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>{t('common.home')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
          <Text style={styles.navTextActive}>{t('common.search')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/wishlist')}>
          <Ionicons name="bookmark-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>{t('common.favorites')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>{t('common.profile')}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espacement final */}
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122117',
  },
  content: {
    flex: 1,
    paddingHorizontal: responsive.padding.container,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: responsive.spacing.md,
    marginBottom: responsive.spacing.sm,
  },
  subtitle: {
    color: '#96C4A8',
    textAlign: 'center',
    marginBottom: responsive.spacing.lg,
    lineHeight: 22,
  },
  selectedContainer: {
    backgroundColor: '#1a2419',
    borderWidth: 2,
    borderColor: '#38E078',
  },
  selectedTitle: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: responsive.spacing.sm,
  },
  selectedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing.xs,
  },
  selectedSymptom: {
    backgroundColor: '#122117',
    borderWidth: 1,
    borderColor: '#96C4A8',
  },
  selectedSymptomText: {
    color: '#96C4A8',
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#122117',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38E078',
  },
  searchButtonText: {
    color: '#38E078',
    fontWeight: '600',
  },
  categoryContainer: {
    backgroundColor: '#1a2419',
    borderWidth: 1,
    borderColor: '#96C4A8',
  },
  categoryHeader: {
    backgroundColor: '#1a2419',
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
    color: '#FFFFFF',
  },
  categoryCount: {
    color: '#96C4A8',
    backgroundColor: '#122117',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: responsive.spacing.sm,
  },
  expandIcon: {
    color: '#38E078',
    fontWeight: 'bold',
  },
  symptomsContainer: {
    backgroundColor: '#122117',
  },
  symptomItem: {
    backgroundColor: '#122117',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symptomSelected: {
    backgroundColor: '#7c9885',
    borderColor: '#7c9885',
  },
  symptomText: {
    color: '#FFFFFF',
    flex: 1,
  },
  symptomTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#96C4A8',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  checkboxSelected: {
    backgroundColor: '#38E078',
    borderColor: '#38E078',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1a2f1f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#2d3e32',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    // Pas de fond coloré, uniquement des changements de couleur d'icônes et de texte
  },
  navText: {
    fontSize: 12,
    color: '#9eb7a8',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: '#122118',
  },
});
