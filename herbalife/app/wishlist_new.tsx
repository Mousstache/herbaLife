import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useWishlist } from '../contexts/WishlistContext';
import { Ionicons } from '@expo/vector-icons';

export default function WishlistScreen() {
  const { favorites } = useWishlist();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HerbaLife</Text>
      </View>

      {/* Titre et compteur */}
      <Text style={styles.mainTitle}>❤️ Mes plantes favorites</Text>
      <Text style={styles.subtitle}>{favorites.length} plantes</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Liste des plantes favorites */}
        {favorites.length > 0 ? (
          favorites.map((plant, index) => (
            <View key={plant.id} style={styles.plantCardContainer}>
              <TouchableOpacity style={styles.plantCard} activeOpacity={0.7}>
                <View style={styles.plantContent}>
                  <View style={styles.plantInfo}>
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAction}>Voir détails</Text>
                  </View>
                  <View style={styles.plantImageContainer}>
                    <Text style={styles.plantEmoji}>{plant.emoji}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Aucune plante favorite</Text>
            <Text style={styles.emptyText}>
              Ajoutez vos plantes préférées pour les retrouver facilement ici
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <Ionicons name="home-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Recherche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="bookmark" size={24} color="#FFFFFF" />
          <Text style={styles.navTextActive}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#9eb7a8" />
          <Text style={styles.navText}>Profil</Text>
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
    backgroundColor: '#122118',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: '#122118',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9eb7a8',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  plantCardContainer: {
    marginBottom: 12,
  },
  plantCard: {
    backgroundColor: '#1a2f1f',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2d3e32',
  },
  plantContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  plantAction: {
    fontSize: 14,
    color: '#96c5a8',
  },
  plantImageContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3e32',
    borderRadius: 25,
  },
  plantEmoji: {
    fontSize: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9eb7a8',
    textAlign: 'center',
    lineHeight: 22,
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
    backgroundColor: '#39e079',
    borderRadius: 8,
    marginHorizontal: 4,
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
