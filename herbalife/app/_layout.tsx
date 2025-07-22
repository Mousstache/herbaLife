import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { WishlistProvider } from '../contexts/WishlistContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
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
            name="recommendations" 
            options={{ title: 'Plantes recommandées' }}
          />
          <Stack.Screen 
            name="wishlist" 
            options={{ title: 'Ma Wishlist 🌿' }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </WishlistProvider>
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
