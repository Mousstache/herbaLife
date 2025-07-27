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
    <ContraindicationsProvider>
      <WishlistProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="dark" backgroundColor="#f8f9f5" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#7c9885',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="contraindications" 
            options={{ title: 'Contre-indications' }}
          />
          <Stack.Screen 
            name="body-zone" 
            options={{ title: 'Sélection de la zone' }}
          />
          <Stack.Screen 
            name="body-zone-symptoms" 
            options={{ title: 'Symptômes de la zone' }}
          />
          <Stack.Screen 
            name="body-zones" 
            options={{ title: 'Zones du corps' }}
          />
          <Stack.Screen 
            name="zone-symptoms" 
            options={{ title: 'Symptômes' }}
          />
          <Stack.Screen 
            name="recommendations" 
            options={{ title: 'Plantes recommandées' }}
          />
          <Stack.Screen 
            name="responsive-test" 
            options={{ title: 'Test Responsive' }}
          />
          <Stack.Screen 
            name="symptom-search" 
            options={{ title: 'Recherche par symptômes' }}
          />
          <Stack.Screen 
            name="symptom-results" 
            options={{ title: 'Résultats' }}
          />
          <Stack.Screen 
            name="wishlist" 
            options={{ title: 'Ma Wishlist 🌿' }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </WishlistProvider>
    </ContraindicationsProvider>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import HomeScreen from './screens/HomeScreen';
// import BodyZoneScreen from './screens/BodyZoneScreen';
// import RecommendationsScreen from './screens/RecommendationsScreen';

// export type RootStackParamList = {
//   Home: undefined;
//   BodyZone: undefined;
//   Recommendations: { zone: string };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="dark" backgroundColor="#f8f9f5" />
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: '#7c9885',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: '600',
//           },
//         }}
//       >
//         <Stack.Screen 
//           name="Home" 
//           component={HomeScreen} 
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen 
//           name="BodyZone" 
//           component={BodyZoneScreen}
//           options={{ title: 'Sélection de la zone' }}
//         />
//         <Stack.Screen 
//           name="Recommendations" 
//           component={RecommendationsScreen}
//           options={{ title: 'Plantes recommandées' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
