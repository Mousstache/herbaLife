import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { responsive, wp, hp, getOptimalColumns, getScreenCategory } from '../utils/responsive';

export default function ResponsiveTestScreen() {
  const screenCategory = getScreenCategory();
  const optimalColumns = getOptimalColumns(150);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: responsive.fontSize.hero }]}>
          Test Responsive Design 📱
        </Text>

        {/* Informations sur l'écran */}
        <View style={[styles.card, { 
          padding: responsive.padding.card,
          borderRadius: responsive.borderRadius.medium,
          marginBottom: responsive.spacing.lg,
          ...responsive.shadow.medium
        }]}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.title }]}>
            Informations de l'écran
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium }}>
            Largeur: {responsive.width}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium }}>
            Hauteur: {responsive.height}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium }}>
            Catégorie: {screenCategory}
          </Text>
        </View>

        {/* Test des colonnes adaptatives */}
        <View style={[styles.card, { 
          padding: responsive.padding.card,
          borderRadius: responsive.borderRadius.medium,
          marginBottom: responsive.spacing.lg,
          ...responsive.shadow.medium
        }]}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.title }]}>
            Colonnes adaptatives
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium, marginBottom: responsive.spacing.sm }}>
            Colonnes contraindications: {responsive.columns.contraindications}
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium, marginBottom: responsive.spacing.sm }}>
            Colonnes plantes: {responsive.columns.plants}
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium, marginBottom: responsive.spacing.sm }}>
            Colonnes optimales (150px min): {optimalColumns}
          </Text>
          
          <View style={[styles.grid, { gap: responsive.spacing.sm }]}>
            {Array.from({ length: 6 }, (_, i) => (
              <View 
                key={i} 
                style={[
                  styles.testCard,
                  { 
                    width: `${100 / responsive.columns.bodyZones - 2}%`,
                    padding: responsive.padding.sm,
                    borderRadius: responsive.borderRadius.small,
                    marginBottom: responsive.spacing.sm
                  }
                ]}
              >
                <Text style={{ fontSize: responsive.fontSize.medium, textAlign: 'center' }}>
                  Card {i + 1}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Test des tailles de police */}
        <View style={[styles.card, { 
          padding: responsive.padding.card,
          borderRadius: responsive.borderRadius.medium,
          marginBottom: responsive.spacing.lg,
          ...responsive.shadow.medium
        }]}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.title }]}>
            Tailles de police adaptatives
          </Text>
          <Text style={{ fontSize: responsive.fontSize.xs, marginBottom: responsive.spacing.xs }}>
            Extra Small Text (xs) - {responsive.fontSize.xs}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.small, marginBottom: responsive.spacing.xs }}>
            Small Text (small) - {responsive.fontSize.small}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.medium, marginBottom: responsive.spacing.xs }}>
            Medium Text (medium) - {responsive.fontSize.medium}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.large, marginBottom: responsive.spacing.xs }}>
            Large Text (large) - {responsive.fontSize.large}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.title, marginBottom: responsive.spacing.xs }}>
            Title Text (title) - {responsive.fontSize.title}px
          </Text>
          <Text style={{ fontSize: responsive.fontSize.bigTitle, marginBottom: responsive.spacing.xs }}>
            Big Title - {responsive.fontSize.bigTitle}px
          </Text>
        </View>

        {/* Test des espacements */}
        <View style={[styles.card, { 
          padding: responsive.padding.card,
          borderRadius: responsive.borderRadius.medium,
          marginBottom: responsive.spacing.lg,
          ...responsive.shadow.medium
        }]}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.title }]}>
            Espacements adaptatifs
          </Text>
          <View style={{ backgroundColor: '#e5e7eb', padding: responsive.spacing.xs, marginBottom: 4 }}>
            <Text style={{ fontSize: responsive.fontSize.small }}>Spacing XS ({responsive.spacing.xs}px)</Text>
          </View>
          <View style={{ backgroundColor: '#d1d5db', padding: responsive.spacing.sm, marginBottom: 4 }}>
            <Text style={{ fontSize: responsive.fontSize.small }}>Spacing SM ({responsive.spacing.sm}px)</Text>
          </View>
          <View style={{ backgroundColor: '#9ca3af', padding: responsive.spacing.md, marginBottom: 4 }}>
            <Text style={{ fontSize: responsive.fontSize.small, color: '#fff' }}>Spacing MD ({responsive.spacing.md}px)</Text>
          </View>
          <View style={{ backgroundColor: '#6b7280', padding: responsive.spacing.lg, marginBottom: 4 }}>
            <Text style={{ fontSize: responsive.fontSize.small, color: '#fff' }}>Spacing LG ({responsive.spacing.lg}px)</Text>
          </View>
          <View style={{ backgroundColor: '#4b5563', padding: responsive.spacing.xl }}>
            <Text style={{ fontSize: responsive.fontSize.small, color: '#fff' }}>Spacing XL ({responsive.spacing.xl}px)</Text>
          </View>
        </View>

        {/* Test des pourcentages */}
        <View style={[styles.card, { 
          padding: responsive.padding.card,
          borderRadius: responsive.borderRadius.medium,
          marginBottom: responsive.spacing.xxl,
          ...responsive.shadow.medium
        }]}>
          <Text style={[styles.sectionTitle, { fontSize: responsive.fontSize.title }]}>
            Largeurs en pourcentage
          </Text>
          <View style={{ backgroundColor: '#7c9885', width: wp(100), height: 40, marginBottom: responsive.spacing.sm }}>
            <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 40, fontSize: responsive.fontSize.small }}>
              100% = {wp(100)}px
            </Text>
          </View>
          <View style={{ backgroundColor: '#7c9885', width: wp(75), height: 40, marginBottom: responsive.spacing.sm }}>
            <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 40, fontSize: responsive.fontSize.small }}>
              75% = {wp(75)}px
            </Text>
          </View>
          <View style={{ backgroundColor: '#7c9885', width: wp(50), height: 40, marginBottom: responsive.spacing.sm }}>
            <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 40, fontSize: responsive.fontSize.small }}>
              50% = {wp(50)}px
            </Text>
          </View>
          <View style={{ backgroundColor: '#7c9885', width: wp(25), height: 40 }}>
            <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 40, fontSize: responsive.fontSize.small }}>
              25% = {wp(25)}px
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  content: {
    paddingHorizontal: responsive.padding.container,
    paddingBottom: responsive.spacing.xxl,
  },
  title: {
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: responsive.spacing.lg,
    marginTop: responsive.spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: responsive.spacing.md,
  },
  card: {
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testCard: {
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
});
