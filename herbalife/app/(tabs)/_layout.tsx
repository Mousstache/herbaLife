// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// import { AuthGuard } from '@/components/AuthGuard';

// // <AuthGuard>
// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="Profil_info"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />,
//           tabBarStyle: { display: 'none' },
//           href: null,
//         }}
//       />

//     </Tabs>
//   );
// }
// // </AuthGuard>


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';
import BodyZoneScreen from './BodyZoneScreen';
import RecommendationsScreen from './RecommendationScreen';

export type RootStackParamList = {
  Home: undefined;
  BodyZone: undefined;
  Recommendations: { zone: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#f8f9f5" />
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="BodyZone" 
          component={BodyZoneScreen}
          options={{ title: 'Sélection de la zone' }}
        />
        <Stack.Screen 
          name="Recommendations" 
          component={RecommendationsScreen}
          options={{ title: 'Plantes recommandées' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}