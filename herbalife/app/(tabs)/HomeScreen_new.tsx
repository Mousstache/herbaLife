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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './_layout';
import { responsive } from '../../utils/responsive';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
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
            <Text style={styles.appName}>PhytoConseil</Text>
          </View>
          <Text style={styles.tagline}>Votre guide naturel de bien-être</Text>
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
            Découvrez la puissance des plantes
          </Text>
          <Text style={styles.welcomeText}>
            Explorez des remèdes naturels personnalisés basés sur la phytothérapie et l'homéopathie pour améliorer votre bien-être.
          </Text>
        </View>

        {/* Avantages clés */}
        <View style={styles.featuresSection}>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🎯</Text>
            <Text style={styles.featureText}>Conseils personnalisés</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🌿</Text>
            <Text style={styles.featureText}>100% naturel</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>📚</Text>
            <Text style={styles.featureText}>Base scientifique</Text>
          </View>
        </View>

        {/* Bouton principal */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('BodyZone')}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>Commencer mon diagnostic</Text>
            <Text style={styles.startButtonIcon}>→</Text>
          </TouchableOpacity>

          <Text style={styles.actionSubtext}>
            En quelques minutes, obtenez des recommandations adaptées
          </Text>
        </View>

        {/* Footer informations */}
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerEmoji}>🔒</Text>
            <Text style={styles.footerText}>Confidentiel et gratuit</Text>
          </View>
        </View>
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
    color: '#2d5738',
  },
  tagline: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
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
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.md,
    lineHeight: responsive.fontSize.title * 1.2,
  },
  welcomeText: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
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
    color: '#2d5738',
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
