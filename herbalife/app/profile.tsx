import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../i18n';
import { LanguageSelector } from '../components/language';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header avec retour */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('profile.title')}</Text>
        </View>

        {/* Section Paramètres */}
        <Text style={styles.sectionTitle}>{t('common.settings')}</Text>

        {/* Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.settingText}>{t('common.notifications')}</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#2b362f', true: '#35e372' }}
            thumbColor="#FFFFFF"
            style={styles.switch}
          />
        </View>

        {/* Langue */}
        <LanguageSelector />

        {/* Thème */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Thème</Text>
          <Text style={styles.settingValue}>Sombre</Text>
        </View>

        {/* Unités de mesure */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Unités de mesure</Text>
          <Text style={styles.settingValue}>Métrique</Text>
        </View>

        {/* Section Contre-indications */}
        <Text style={styles.sectionTitle}>Contre-indications</Text>

        {/* Bouton Gérer mes contre-indications */}
        <TouchableOpacity 
          style={styles.contraindicationButton}
          onPress={() => router.push('/contraindications')}
          activeOpacity={0.7}
        >
          <Text style={styles.contraindicationText}>Gérer mes contre-indications</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/body-zones')}>
          <Ionicons name="home-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/plant-search')}>
          <Ionicons name="search-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Recherche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/wishlist')}>
          <Ionicons name="bookmark-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#FFFFFF" />
          <Text style={styles.navTextActive}>Profil</Text>
        </TouchableOpacity>
      </View>
      
      {/* Espacement final */}
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121714',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingRight: 48, // Compense le bouton back pour centrer
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#404f46',
    marginTop: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2b362f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  contraindicationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contraindicationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1a2f1f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#2d3e32',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    // Pas de fond coloré, uniquement des changements de couleur d'icônes et de texte
  },
  navText: {
    fontSize: 12,
    color: '#9eb7a8',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
    backgroundColor: '#122118',
  },
});
