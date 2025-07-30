import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { bodyZones } from '../data/DataPlant';
import { responsive } from '../utils/responsive';

// Mapping des images pour chaque zone
const zoneImages: { [key: string]: any } = {
  'nerveux-mental': require('../assets/images/systeme_hormonale.png'),
  'cardiovasculaire': require('../assets/images/coeur_zone.png'),
  'respiratoire': require('../assets/images/gorge.png'),
  'digestif': require('../assets/images/systeme_digestif.png'),
  'immunitaire': require('../assets/images/systeme_immunitaire.png'),
  'musculo-squelettique': require('../assets/images/articulation.png'),
  'peau-cheveux-ongles': require('../assets/images/peau.png'),
  'hormonal-reproducteur': require('../assets/images/systeme_hormonale.png'),
  'urinaire-detox': require('../assets/images/systeme_urinaire.png'),
  'yeux-vision': require('../assets/images/oeil.png'),
};

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

              {/* Image de la zone */}
              <View style={styles.imageContainer}>
                <Image
                  source={zoneImages[zone.id]}
                  style={styles.zoneImage}
                  resizeMode="contain"
                />
              </View>

              {/* Zone de contenu principal adaptatif */}
              {responsive.width < 428 ? (
                <View style={styles.mobileContentContainer}>
                  <View style={styles.mobileHeaderRow}>
                    <Text style={styles.zoneTitle}>{zone.name}</Text>
                    <View style={styles.symptomCounter}>
                      <Text style={styles.symptomIcon}>💊</Text>
                      <Text style={styles.symptomCountText}>
                        {zone.symptoms.length}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.zoneDescription}>
                    {zone.description}
                  </Text>
                </View>
              ) : (
                <>
                  {/* Layout classique pour tablettes */}
                  <Text style={styles.zoneTitle}>
                    {zone.name}
                  </Text>
                  <Text style={styles.zoneDescription}>
                    {zone.description}
                  </Text>
                  <View style={styles.symptomCounter}>
                    <Text style={styles.symptomIcon}>💊</Text>
                    <Text style={styles.symptomCountText}>
                      {zone.symptoms.length} symptômes
                    </Text>
                  </View>
                </>
              )}

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
              onPress={() => router.push('/contraindications')}
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
    paddingHorizontal: responsive.spacing.md,
    paddingTop: responsive.spacing.lg,
    paddingBottom: responsive.spacing.md,
    backgroundColor: '#ffffff',
    marginBottom: responsive.spacing.sm,
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
    paddingHorizontal: responsive.spacing.md,
    flexDirection: responsive.width < 428 ? 'column' : 'row',
    flexWrap: responsive.width < 428 ? 'nowrap' : 'wrap',
    justifyContent: responsive.width < 428 ? 'flex-start' : 'space-between',
  },
  zoneCard: {
    width: responsive.width < 428 ? '100%' : '48%', // Une seule colonne sur petits écrans
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    marginBottom: responsive.spacing.md,
    marginHorizontal: responsive.width < 428 ? 0 : responsive.spacing.xs,
    borderWidth: 1,
    borderColor: '#e8f0e8',
    position: 'relative',
    minHeight: responsive.width < 428 ? 120 : 160, // Hauteur adaptative
    flexDirection: responsive.width < 428 ? 'row' : 'column',
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
  imageContainer: {
    backgroundColor: '#f8f9fa',
    padding: responsive.spacing.sm,
    borderRadius: responsive.borderRadius.large,
    marginBottom: responsive.width < 428 ? 0 : responsive.spacing.xs,
    marginRight: responsive.width < 428 ? responsive.spacing.md : 0,
    width: responsive.width < 428 ? 60 : 80,
    height: responsive.width < 428 ? 60 : 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneImage: {
    width: responsive.width < 428 ? 40 : 50,
    height: responsive.width < 428 ? 40 : 50,
  },
  zoneTitle: {
    fontSize: responsive.width < 428 ? responsive.fontSize.medium : responsive.fontSize.medium,
    fontWeight: 'bold',
    color: '#2d5738',
    textAlign: responsive.width < 428 ? 'left' : 'center',
    marginBottom: responsive.width < 428 ? 0 : responsive.spacing.xs,
    flex: responsive.width < 428 ? 1 : 0,
  },
  zoneDescription: {
    fontSize: responsive.fontSize.small,
    color: '#6b7c68',
    textAlign: responsive.width < 428 ? 'left' : 'center',
    lineHeight: responsive.fontSize.small * 1.2,
    marginBottom: responsive.width < 428 ? 0 : responsive.spacing.xs,
  },
  symptomCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: responsive.spacing.sm,
    paddingVertical: 2,
    borderRadius: responsive.borderRadius.small,
    marginBottom: responsive.width < 428 ? 0 : responsive.spacing.xs,
    alignSelf: responsive.width < 428 ? 'flex-start' : 'center',
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
    paddingHorizontal: responsive.spacing.md,
    marginVertical: responsive.spacing.md,
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
    paddingHorizontal: responsive.spacing.md,
    marginBottom: responsive.spacing.lg,
  },
  shortcutsTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
    color: '#2d5738',
    marginBottom: responsive.spacing.md,
  },
  shortcutsGrid: {
    flexDirection: responsive.width < 428 ? 'column' : 'row',
    justifyContent: 'space-between',
    gap: responsive.width < 428 ? responsive.spacing.sm : 0,
  },
  shortcutButton: {
    flex: responsive.width < 428 ? 0 : 1,
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.md,
    alignItems: 'center',
    marginHorizontal: responsive.width < 428 ? 0 : responsive.spacing.xs,
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
  mobileContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mobileHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing.xs,
  },
});
