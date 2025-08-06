import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-reanimated';

import { WishlistProvider } from '../contexts/WishlistContext';
import { ContraindicationsProvider } from '../contexts/ContraindicationsContext';
import { SplashScreen } from '../components/SplashScreen';
import { LocalizationProvider } from '../i18n';

export default function RootLayout() {
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
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{ headerShown: false }} />
            <Stack.Screen name="contraindications" options={{ headerShown: false }} />
            <Stack.Screen name="body-zones" options={{ headerShown: false }} />
            <Stack.Screen name="zone-symptoms" options={{ headerShown: false }} />
            <Stack.Screen name="recommendations" options={{ headerShown: false }} />
            <Stack.Screen name="symptom-search" options={{ headerShown: false }} />
            <Stack.Screen name="plant-search" options={{ headerShown: false }} />
            <Stack.Screen name="symptom-results" options={{ headerShown: false }} />
            <Stack.Screen name="wishlist" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </WishlistProvider>
      </ContraindicationsProvider>
    </LocalizationProvider>
  );
}
