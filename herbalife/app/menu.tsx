import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTranslation } from '../i18n';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MenuScreen() {
  const { t } = useTranslation();
  
  const handleStartJourney = () => {
    // Navigation vers la page suivante (à ajuster selon votre flow)
    router.push('/contraindications');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <View style={styles.content}>
        {/* Hero Section avec image de fond */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ 
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCq4uhm5cL4JcE04aKpq97mB2KytBKdTABqy_t5xm0OsP235yUmNxSdNS7HcjhO84H5_bDPu0n5F1QSqTnGNktgaxlqIMLlE_2Ymj1bxzvnmpplJSW7vSxdw1oTW4ylgPypzbPT-ks8pIM5JjTReqQVG2GRJVM7J877TIjYd3sdAZPzPpaO2qjNwZprw0e7OpgS5eaEweIvObQCYdCYFDKHoUTT2M9ma83f269VzHaj82UN4hAzxeVI5B_XPpX7DWp4AeaahYej5dQ"
            }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay} />
          </ImageBackground>
        </View>

        {/* Texte de bienvenue */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to HerbaLife</Text>
          <Text style={styles.subtitle}>
            Discover the power of nature with our curated selection of medicinal plants. Start your journey to wellness today.
          </Text>
        </View>
      </View>

      {/* Bouton en bas */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartJourney}>
          <Text style={styles.buttonText}>{t('menu.startMyJourney')}</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
  },
  heroContainer: {
    paddingHorizontal: screenWidth > 480 ? 16 : 0,
    paddingVertical: screenWidth > 480 ? 12 : 0,
  },
  heroImage: {
    width: '100%',
    minHeight: 320,
    borderRadius: screenWidth > 480 ? 12 : 0,
    overflow: 'hidden',
    backgroundColor: Colors.dark.background,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 33, 24, 0.3)',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  startButton: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minWidth: 84,
    maxWidth: 480,
  },
  buttonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.15,
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: Colors.dark.background,
  },
});