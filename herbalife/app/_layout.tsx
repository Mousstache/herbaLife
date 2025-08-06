import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { WishlistProvider } from '../contexts/WishlistContext';
import { ContraindicationsProvider } from '../contexts/ContraindicationsContext';
import { SplashScreen } from '../components/SplashScreen';
import { LocalizationProvider } from '../i18n';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const handleSplashFinish = () => {
    console.log('Splash screen finished');
    setShowSplash(false);
  };

  console.log('RootLayout render - showSplash:', showSplash, 'loaded:', loaded);

  if (!loaded) {
    console.log('Fonts not loaded yet');
    return null;
  }

  if (showSplash) {
    console.log('Showing splash screen');
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  console.log('Showing main app');

  return (
    <LocalizationProvider>
      <ContraindicationsProvider>
        <WishlistProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="menu" options={{ headerShown: false }} />
              <Stack.Screen name="contraindications" options={{ headerShown: false }} />
              <Stack.Screen name="body-zones" options={{ headerShown: false }} />
              <Stack.Screen name="zone-symptoms" options={{ title: 'Symptômes' }} />
              <Stack.Screen name="recommendations" options={{ title: 'Plantes recommandées' }} />
              <Stack.Screen name="symptom-search" options={{ title: 'Recherche par symptômes' }} />
              <Stack.Screen name="plant-search" options={{ title: 'Recherche de plantes' }} />
              <Stack.Screen name="symptom-results" options={{ title: 'Résultats' }} />
              <Stack.Screen name="wishlist" options={{ title: 'Ma Wishlist 🌿' }} />
              <Stack.Screen name="profile" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </WishlistProvider>
      </ContraindicationsProvider>
    </LocalizationProvider>
  );
}
