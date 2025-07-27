import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { bodyZones } from '../data/DataPlant';
import { responsive } from '../utils/responsive';

export default function BodyZonesScreen() {
  const handleZonePress = (zone: any) => {
    router.push({
      pathname: '/zone-symptoms' as any,
      params: { 
        zoneId: zone.id,
        zoneName: zone.name,
        zoneEmoji: zone.emoji,
        zoneColor: zone.color
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Zones du corps</Text>
          <Text style={styles.subtitle}>
            Sélectionnez la zone qui vous préoccupe pour découvrir les symptômes et remèdes naturels associés
          </Text>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>
              {bodyZones.length} zones disponibles
            </Text>
          </View>
        </View>

        {/* Grille des zones */}
        <View style={styles.gridContainer}>
          {bodyZones.map((zone) => (
            <TouchableOpacity
              key={zone.id}
              style={styles.zoneCard}
              onPress={() => handleZonePress(zone)}
              activeOpacity={0.8}
            >
              {/* Badge de zone */}
              <View style={styles.zoneBadge}>
                <Text style={styles.zoneBadgeText}>
                  Zone
                </Text>
              </View>

              {/* Emoji principal */}
              <View style={styles.emojiContainer}>
                <Text style={styles.mainEmoji}>{zone.emoji}</Text>
              </View>

              {/* Titre de la zone */}
              <Text style={styles.zoneTitle}>
                {zone.name}
              </Text>

              {/* Description */}
              <Text style={styles.zoneDescription}>
                {zone.description}
              </Text>

              {/* Compteur de symptômes */}
              <View style={styles.symptomCounter}>
                <Text style={styles.symptomIcon}>💊</Text>
                <Text style={styles.symptomCountText}>
                  {zone.symptoms.length} symptômes
                </Text>
              </View>

              {/* Indicateur de navigation */}
              <View style={styles.navigationIndicator}>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Information supplémentaire */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoEmoji}>🌿</Text>
            <Text style={styles.infoText}>
              Chaque zone propose des remèdes naturels spécifiquement adaptés à vos symptômes
            </Text>
          </View>
        </View>

        {/* Raccourcis rapides */}
        <View style={styles.shortcutsContainer}>
          <Text style={styles.shortcutsTitle}>🔍 Accès rapide</Text>
          <View style={styles.shortcutsGrid}>
            <TouchableOpacity
              style={styles.shortcutButton}
              onPress={() => router.push('/symptom-search')}
              activeOpacity={0.8}
            >
              <Text style={styles.shortcutEmoji}>🔍</Text>
              <Text style={styles.shortcutText}>Recherche par symptôme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shortcutButton}
              onPress={() => router.push('/wishlist')}
              activeOpacity={0.8}
            >
              <Text style={styles.shortcutEmoji}>❤️</Text>
              <Text style={styles.shortcutText}>Ma liste de favoris</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Espace en bas */}
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
  zoneCard: {
    width: responsive.width < 600 ? '48%' : '31%',
    aspectRatio: 1, // Rend le carré parfait
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    marginBottom: responsive.spacing.md,
    borderWidth: 2,
    borderColor: '#e8f0e8',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    ...responsive.shadow.medium,
  },
  zoneBadge: {
    position: 'absolute',
    top: responsive.spacing.xs,
    right: responsive.spacing.xs,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: responsive.spacing.xs,
    paddingVertical: 2,
    borderRadius: responsive.borderRadius.small,
  },
  zoneBadgeText: {
    fontSize: responsive.fontSize.xs,
    color: '#666666',
    fontWeight: '600',
  },
  emojiContainer: {
    backgroundColor: '#f8f9fa',
    padding: responsive.spacing.sm,
    borderRadius: responsive.borderRadius.large,
    marginBottom: responsive.spacing.xs,
  },
  mainEmoji: {
    fontSize: responsive.fontSize.title + 4,
    textAlign: 'center',
  },
  zoneTitle: {
    fontSize: responsive.fontSize.medium,
    fontWeight: 'bold',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.xs,
  },
  zoneDescription: {
    fontSize: responsive.fontSize.small,
    color: '#6b7c68',
    textAlign: 'center',
    lineHeight: responsive.fontSize.small * 1.2,
    marginBottom: responsive.spacing.xs,
  },
  symptomCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: responsive.spacing.sm,
    paddingVertical: 2,
    borderRadius: responsive.borderRadius.small,
    marginBottom: responsive.spacing.xs,
  },
  symptomIcon: {
    fontSize: responsive.fontSize.small,
    marginRight: 2,
  },
  symptomCountText: {
    fontSize: responsive.fontSize.xs,
    color: '#2d5738',
    fontWeight: '600',
  },
  navigationIndicator: {
    position: 'absolute',
    bottom: responsive.spacing.xs,
    right: responsive.spacing.xs,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7c9885',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    color: '#ffffff',
    fontSize: responsive.fontSize.medium,
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
  shortcutsContainer: {
    paddingHorizontal: responsive.spacing.lg,
    marginBottom: responsive.spacing.lg,
  },
  shortcutsTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
    color: '#2d5738',
    marginBottom: responsive.spacing.md,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    alignItems: 'center',
    marginHorizontal: responsive.spacing.xs,
    borderWidth: 2,
    borderColor: '#e8f0e8',
    ...responsive.shadow.small,
  },
  shortcutEmoji: {
    fontSize: responsive.fontSize.title,
    marginBottom: responsive.spacing.xs,
  },
  shortcutText: {
    fontSize: responsive.fontSize.small,
    color: '#5a6b5d',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: responsive.spacing.xl,
  },
});
