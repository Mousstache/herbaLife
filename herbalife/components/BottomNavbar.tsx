import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router, usePathname } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Accueil',
    icon: '🏠',
    route: '/',
  },
  {
    id: 'search',
    label: 'Recherche',
    icon: '🔍',
    route: '/body-zones',
  },
  {
    id: 'wishlist',
    label: 'Favoris',
    icon: '❤️',
    route: '/wishlist',
  },
  {
    id: 'menu',
    label: 'Menu',
    icon: '☰',
    route: '/menu',
  },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  const handleNavPress = (route: string) => {
    if (pathname !== route) {
      router.push(route as any);
    }
  };

  const isActive = (route: string) => {
    return pathname === route || 
           (route === '/' && pathname === '/index') ||
           (route === '/body-zones' && pathname.includes('zone'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        {navItems.map((item) => {
          const active = isActive(item.route);
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, active && styles.activeNavItem]}
              onPress={() => handleNavPress(item.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, active && styles.activeIconContainer]}>
                <Text style={[styles.icon, active && styles.activeIcon]}>
                  {item.icon}
                </Text>
              </View>
              <Text style={[styles.label, active && styles.activeLabel]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#122117',
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 196, 168, 0.2)',
  },
  navbar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#122117',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  activeNavItem: {
    backgroundColor: 'rgba(56, 224, 120, 0.1)',
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: '#38E078',
  },
  icon: {
    fontSize: 18,
    color: '#96C4A8',
  },
  activeIcon: {
    color: '#122117',
    fontSize: 18,
  },
  label: {
    fontSize: 10,
    color: '#96C4A8',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#38E078',
    fontWeight: '600',
  },
});
