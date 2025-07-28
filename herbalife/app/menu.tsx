import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';

const { width: screenWidth } = Dimensions.get('window');

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header simplifié */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.leafIcon}>
              <Text style={styles.leafEmoji}>🌿</Text>
            </View>
            <Text style={styles.appName}>PhytoConseil</Text>
          </View>
          <Text style={styles.subtitle}>
            Découvrez des remèdes naturels personnalisés grâce à la phytothérapie et l'homéopathie
          </Text>
        </View>

        {/* Menu principal - centré */}
        <View style={styles.menuContainer}>
          {/* Option 1: Recherche */}
          <TouchableOpacity
            style={[styles.menuCard, styles.searchCard]}
            onPress={() => router.push('/body-zones')}
            activeOpacity={0.85}
          >
            <View style={styles.cardContent}>
              <Text style={styles.menuIcon}>🔍</Text>
              <Text style={styles.menuTitle}>Rechercher</Text>
              <Text style={styles.menuSubtitle}>Trouvez vos remèdes</Text>
            </View>
          </TouchableOpacity>

          {/* Option 2: Wishlist */}
          <TouchableOpacity
            style={[styles.menuCard, styles.wishlistCard]}
            onPress={() => router.push('/wishlist')}
            activeOpacity={0.85}
          >
            <View style={styles.cardContent}>
              <Text style={styles.menuIcon}>💚</Text>
              <Text style={styles.menuTitle}>Ma Wishlist</Text>
              <Text style={styles.menuSubtitle}>Mes favoris</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.spacing.xl,
  },
  
  // Header simplifié
  header: {
    alignItems: 'center',
    paddingTop: responsive.spacing.lg,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.sm,
  },
  leafIcon: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.width < 428 ? 22 : 28,
    width: responsive.width < 428 ? 44 : 56,
    height: responsive.width < 428 ? 44 : 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsive.spacing.md,
    ...responsive.shadow.small,
  },
  leafEmoji: {
    fontSize: responsive.width < 428 ? 22 : 28,
  },
  appName: {
    fontSize: responsive.fontSize.bigTitle,
    fontWeight: '800',
    color: '#2d5738',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
    textAlign: 'center',
    lineHeight: responsive.fontSize.medium * 1.4,
    paddingHorizontal: responsive.spacing.sm,
    maxWidth: '90%',
    fontWeight: '500',
  },

  // Menu container centré
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsive.spacing.lg,
    paddingVertical: responsive.spacing.xl,
  },

  // Cards du menu
  menuCard: {
    width: '100%',
    maxWidth: responsive.width < 428 ? 280 : 320,
    borderRadius: responsive.borderRadius.large,
    padding: responsive.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: responsive.width < 428 ? 140 : 160,
    ...responsive.shadow.large,
  },
  searchCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e8f5e8',
  },
  wishlistCard: {
    backgroundColor: '#f0f7f1',
    borderWidth: 2,
    borderColor: '#d4e8d6',
  },
  cardContent: {
    alignItems: 'center',
    gap: responsive.spacing.sm,
  },
  menuIcon: {
    fontSize: responsive.width < 428 ? 32 : 40,
    marginBottom: responsive.spacing.xs,
  },
  menuTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: '700',
    color: '#2d5738',
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: responsive.fontSize.small,
    color: '#5a6b5d',
    textAlign: 'center',
    fontWeight: '500',
  },
});
