import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';
import { firstLaunchService } from '../utils/firstLaunchService';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const isFirst = await firstLaunchService.isFirstLaunch();
      const onboardingDone = await firstLaunchService.isOnboardingCompleted();
      
      console.log('Debug: isFirst =', isFirst);
      console.log('Debug: onboardingDone =', onboardingDone);

      if (isFirst) {
        // Première visite -> afficher la page de bienvenue
        console.log('Debug: Affichage de la page de bienvenue');
        setShouldShowWelcome(true);
      } else if (!onboardingDone) {
        // Pas première visite mais onboarding pas fini -> contre-indications
        console.log('Debug: Redirection vers contraindications');
        router.replace('/contraindications');
        return;
      } else {
        // Tout est fait -> directement aux zones du corps
        console.log('Debug: Redirection vers body-zones');
        router.replace('/body-zones');
        return;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du premier lancement:', error);
      setShouldShowWelcome(true); // Fallback sur la page de bienvenue
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartJourney = async () => {
    try {
      // Marquer que l'app a été lancée
      await firstLaunchService.markAsLaunched();
      // Aller aux contre-indications
      router.push('/contraindications');
    } catch (error) {
      console.error('Erreur lors du démarrage:', error);
      router.push('/contraindications');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#7c9885" />
        <Text style={styles.loadingText}>
          Chargement...
        </Text>
      </SafeAreaView>
    );
  }

  if (!shouldShowWelcome) {
    return null; // Ne rien afficher si on redirige
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.appName}>
            HerbaLife
          </Text>
          <View style={styles.leafIcon}>
            <Text style={styles.leafEmoji}>
              🌿
            </Text>
          </View>
        </View>

        {/* Illustration principale */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.plantEmoji}>
            🌱
          </Text>
        </View>

        {/* Texte de bienvenue */}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Bienvenue dans votre guide des plantes médicinales
          </Text>
          <Text style={styles.descriptionText}>
            Découvrez des remèdes naturels personnalisés selon vos besoins et contre-indications.
          </Text>
        </View>

        {/* Bouton principal */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartJourney}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>
            🌿 Commencer mon parcours
          </Text>
        </TouchableOpacity>

        {/* Bouton debug temporaire */}
        <TouchableOpacity
          style={[styles.startButton, styles.debugButton]}
          onPress={async () => {
            try {
              // Supprimer les clés pour simuler une première visite
              await firstLaunchService.markAsLaunched();
              await firstLaunchService.markOnboardingCompleted();
              console.log('Debug: Stockage reinitialise, rechargez app');
              alert('Stockage reinitialise, rechargez app');
            } catch (error) {
              console.error('Erreur reset:', error);
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={[styles.startButtonText, styles.debugButtonText]}>
            🔄 Reset pour tester (DEBUG)
          </Text>
        </TouchableOpacity>

        {/* Informations rassurantes */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>
              🛡️
            </Text>
            <Text style={styles.featureText}>
              Prise en compte de vos contre-indications
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>
              🎯
            </Text>
            <Text style={styles.featureText}>
              Recommandations personnalisées selon vos symptômes
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureEmoji}>
              📚
            </Text>
            <Text style={styles.featureText}>
              Base de données complète de plantes médicinales
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🌿 HerbaLife - Votre guide des plantes médicinales
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f6',
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
  debugButton: {
    backgroundColor: '#ff6b6b',
    marginBottom: responsive.spacing.sm,
  },
  debugButtonText: {
    fontSize: responsive.fontSize.small,
  },
  featuresContainer: {
    alignItems: 'center',
    marginVertical: responsive.spacing.xl,
    paddingHorizontal: responsive.spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.md,
    paddingVertical: responsive.spacing.sm,
    paddingHorizontal: responsive.spacing.md,
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    borderRadius: responsive.borderRadius.medium,
    minWidth: '90%',
  },
  featureEmoji: {
    fontSize: responsive.fontSize.title,
    marginRight: responsive.spacing.md,
  },
  featureText: {
    fontSize: responsive.fontSize.medium,
    color: '#2d5738',
    fontWeight: '500',
    flex: 1,
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsive.fontSize.medium,
    color: '#7c9885',
    marginTop: responsive.spacing.md,
    fontWeight: '500',
  },
});
