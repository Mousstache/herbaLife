import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { responsive } from '../utils/responsive';
import { firstLaunchService } from '../utils/firstLaunchService';
import { useTranslation } from '../i18n';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowWelcome, setShouldShowWelcome] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      // TEMPORAIRE : Toujours rediriger vers le menu pour tester
      console.log('Debug: Redirection temporaire vers menu');
      router.replace('/menu');
      return;
      
      // Code original commenté pour test
      /*
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
        // Tout est fait -> directement au menu
        console.log('Debug: Redirection vers menu');
        router.replace('/menu');
        return;
      }
      */
    } catch (error) {
      console.error('Erreur lors de la vérification du premier lancement:', error);
      setShouldShowWelcome(true); // Fallback sur la page de bienvenue
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPress = async () => {
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
          {t('common.loading')}
        </Text>
      </SafeAreaView>
    );
  }

  if (!shouldShowWelcome) {
    return null; // Ne rien afficher si on redirige
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.leafIcon}>
              <Text style={styles.leafEmoji}>🌿</Text>
            </View>
            <Text style={styles.appName}>{t('home.appName')}</Text>
          </View>
          <Text style={styles.tagline}>{t('home.tagline')}</Text>
        </View>

        {/* Illustration principale */}
        <View style={styles.heroSection}>
          <View style={styles.illustrationContainer}>
            <Text style={styles.plantEmoji}>🌱</Text>
            <View style={styles.decorativeElements}>
              <Text style={styles.decorEmoji}>✨</Text>
              <Text style={styles.decorEmoji}>🍃</Text>
            </View>
          </View>
        </View>

        {/* Section de bienvenue */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            {t('home.welcomeTitle')}
          </Text>
          <Text style={styles.welcomeText}>
            {t('home.welcomeText')}
          </Text>
        </View>

        {/* Avantages clés */}
        <View style={styles.featuresSection}>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🎯</Text>
            <Text style={styles.featureText}>{t('home.personalizedAdvice')}</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🌿</Text>
            <Text style={styles.featureText}>{t('home.naturalHundredPercent')}</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>📚</Text>
            <Text style={styles.featureText}>{t('home.scientificBasis')}</Text>
          </View>
        </View>

        {/* Bouton principal */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartPress}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>{t('home.startDiagnosis')}</Text>
            <Text style={styles.startButtonIcon}>→</Text>
          </TouchableOpacity>

          <Text style={styles.actionSubtext}>
            {t('home.actionSubtext')}
          </Text>
        </View>

        {/* Footer informations */}
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerEmoji}>🔒</Text>
            <Text style={styles.footerText}>{t('home.confidentialAndFree')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122117',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: responsive.spacing.md,
    fontSize: responsive.fontSize.medium,
    color: '#96C4A8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Header Section
  header: {
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.lg,
    paddingTop: responsive.spacing.xl,
    paddingBottom: responsive.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.sm,
  },
  leafIcon: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.width < 428 ? 20 : 25,
    width: responsive.width < 428 ? 40 : 50,
    height: responsive.width < 428 ? 40 : 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsive.spacing.sm,
  },
  leafEmoji: {
    fontSize: responsive.width < 428 ? 20 : 24,
  },
  appName: {
    fontSize: responsive.fontSize.bigTitle,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: responsive.fontSize.medium,
    color: '#96C4A8',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingVertical: responsive.spacing.xl,
    paddingHorizontal: responsive.spacing.lg,
  },
  illustrationContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantEmoji: {
    fontSize: responsive.width < 428 ? 80 : 120,
    textAlign: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    top: -10,
    right: -10,
    flexDirection: 'row',
  },
  decorEmoji: {
    fontSize: responsive.fontSize.large,
    marginLeft: responsive.spacing.sm,
  },

  // Welcome Section
  welcomeSection: {
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.spacing.lg,
    backgroundColor: '#ffffff',
    marginHorizontal: responsive.spacing.md,
    borderRadius: responsive.borderRadius.large,
    marginBottom: responsive.spacing.lg,
    ...responsive.shadow.medium,
  },
  welcomeTitle: {
    fontSize: responsive.fontSize.title,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: responsive.spacing.md,
    lineHeight: responsive.fontSize.title * 1.2,
  },
  welcomeText: {
    fontSize: responsive.fontSize.medium,
    color: '#96C4A8',
    textAlign: 'center',
    lineHeight: responsive.fontSize.medium * 1.4,
  },

  // Features Section
  featuresSection: {
    flexDirection: screenWidth < 428 ? 'column' : 'row',
    paddingHorizontal: responsive.spacing.lg,
    marginBottom: responsive.spacing.xl,
    gap: responsive.spacing.md,
  },
  featureCard: {
    flex: screenWidth < 428 ? 0 : 1,
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    padding: responsive.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8f0e8',
    ...responsive.shadow.small,
  },
  featureEmoji: {
    fontSize: responsive.fontSize.bigTitle,
    marginBottom: responsive.spacing.sm,
  },
  featureText: {
    fontSize: responsive.fontSize.medium,
    color: '#96C4A8',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Action Section
  actionSection: {
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.spacing.xl,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.borderRadius.large,
    paddingVertical: responsive.spacing.lg,
    paddingHorizontal: responsive.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%',
    ...responsive.shadow.medium,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
    marginRight: responsive.spacing.sm,
  },
  startButtonIcon: {
    color: '#ffffff',
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
  },
  actionSubtext: {
    fontSize: responsive.fontSize.small,
    color: '#6b7c68',
    textAlign: 'center',
    marginTop: responsive.spacing.md,
    lineHeight: responsive.fontSize.small * 1.3,
  },

  // Footer
  footer: {
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.spacing.xl,
    alignItems: 'center',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    paddingHorizontal: responsive.spacing.md,
    paddingVertical: responsive.spacing.sm,
    borderRadius: responsive.borderRadius.large,
  },
  footerEmoji: {
    fontSize: responsive.fontSize.medium,
    marginRight: responsive.spacing.sm,
  },
  footerText: {
    fontSize: responsive.fontSize.small,
    color: '#7c9885',
    fontWeight: '600',
  },
});
