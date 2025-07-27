import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  
  useEffect(() => {
    console.log('SplashScreen mounted - setting timeout');
    const timer = setTimeout(() => {
      console.log('Timer finished, calling onFinish');
      onFinish();
    }, 2000); // 2 secondes - plus rapide
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  console.log('SplashScreen rendering - simple version');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🌿</Text>
          <Text style={styles.appName}>HerbaLife</Text>
          <Text style={styles.tagline}>Votre guide des plantes médicinales</Text>
        </View>
      </View>
    </View>
  );
}

// Composant pour les points de chargement animés
function LoadingDot({ delay }: { delay: number }) {
  return (
    <View style={styles.loadingDot} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  appName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 42,
    letterSpacing: 2,
  },
  tagline: {
    color: '#A3A3A3',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1,
    fontSize: 18,
    marginBottom: 20,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginHorizontal: 4,
  },
});
