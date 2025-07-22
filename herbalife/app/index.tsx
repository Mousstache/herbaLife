import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';
import { useWishlist } from '../contexts/WishlistContext';

export default function HomeScreen() {
  const { favorites, addToFavorites } = useWishlist();

  // Test pour ajouter une plante fictive
  const testAddPlant = () => {
    const testPlant = {
      id: 'test-plant',
      name: 'Plante Test',
      latinName: 'Plantae testis',
      emoji: '🌿',
      shortDescription: 'Une plante pour tester',
      fullDescription: 'Description complète de test',
      mainBenefits: ['Test 1', 'Test 2'],
      usage: 'Usage de test',
      contraindications: 'Aucune pour le test',
      products: []
    };
    console.log('🧪 Test - Ajout d\'une plante de test');
    addToFavorites(testPlant);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>PhytoConseil</Text>
          <View style={styles.leafIcon}>
            <Text style={styles.leafEmoji}>🌿</Text>
          </View>
          
          {/* Bouton Wishlist */}
          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={() => router.push('/wishlist' as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.wishlistIcon}>♥</Text>
            {favorites.length > 0 && (
              <View style={styles.wishlistBadge}>
                <Text style={styles.wishlistBadgeText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.illustrationContainer}>
          <Text style={styles.plantEmoji}>🌱</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Bienvenue dans PhytoConseil, votre guide personnalisé pour découvrir les plantes médicinales adaptées à vos besoins.
          </Text>
          <Text style={styles.descriptionText}>
            Explorez des remèdes naturels basés sur la phytothérapie et l'homéopathie.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/contraindications')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
        </TouchableOpacity>

        {/* Bouton de test temporaire */}
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: '#dc2626', marginTop: 10 }]}
          onPress={testAddPlant}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>🧪 Test Wishlist ({favorites.length})</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Conseil personnalisé • Remèdes naturels • Bien-être
          </Text>
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
    paddingHorizontal: responsive.spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: responsive.spacing.xl + 10,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  wishlistButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIcon: {
    fontSize: 20,
    color: '#7c9885',
  },
  wishlistBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: responsive.fontSize.bigTitle,
    fontWeight: 'bold',
    color: '#2d5738',
    letterSpacing: 0.5,
  },
  leafIcon: {
    marginLeft: responsive.spacing.sm,
  },
  leafEmoji: {
    fontSize: responsive.fontSize.title,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: responsive.spacing.xxl,
  },
  plantEmoji: {
    fontSize: responsive.width < 350 ? 100 : 120,
    textShadowColor: 'rgba(124, 152, 133, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: responsive.spacing.xxl,
    paddingHorizontal: responsive.spacing.md,
  },
  welcomeText: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: '#2d5738',
    textAlign: 'center',
    lineHeight: responsive.fontSize.large * 1.4,
    marginBottom: responsive.spacing.md,
  },
  descriptionText: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
    textAlign: 'center',
    lineHeight: responsive.fontSize.medium * 1.5,
  },
  startButton: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.borderRadius.large,
    paddingVertical: responsive.padding.button + 2,
    paddingHorizontal: responsive.spacing.xxl * 2,
    alignItems: 'center',
    marginHorizontal: responsive.spacing.lg,
    marginBottom: responsive.spacing.lg,
    shadowColor: '#000',
    ...responsive.shadow.medium,
  },
  startButtonText: {
    color: '#fff',
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: responsive.spacing.xl,
  },
  footerText: {
    fontSize: responsive.fontSize.small,
    color: '#7c9885',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});
