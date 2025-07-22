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

const bodyZones = [
  { id: 'tete', name: 'Tête & Cerveau', emoji: '🧠', description: 'Maux de tête, stress, concentration' },
  { id: 'gorge', name: 'Gorge & Respiratoire', emoji: '🫁', description: 'Toux, mal de gorge, rhume' },
  { id: 'coeur', name: 'Cœur & Circulation', emoji: '❤️', description: 'Circulation, tension, palpitations' },
  { id: 'ventre', name: 'Ventre & Digestion', emoji: '🫃', description: 'Digestion, ballonnements, nausées' },
  { id: 'articulations', name: 'Articulations & Muscles', emoji: '🦴', description: 'Douleurs, inflammations, raideurs' },
  { id: 'peau', name: 'Peau & Beauté', emoji: '✨', description: 'Irritations, acné, cicatrisation' },
  { id: 'sommeil', name: 'Sommeil & Détente', emoji: '😴', description: 'Insomnie, anxiété, relaxation' },
  { id: 'immunite', name: 'Immunité & Énergie', emoji: '🛡️', description: 'Fatigue, défenses naturelles' },
];

export default function BodyZoneScreen() {
  const handleZonePress = (zone: string) => {
    router.push({
      pathname: '/recommendations',
      params: { zone }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Où ressentez-vous un inconfort ?</Text>
          <Text style={styles.subtitle}>
            Sélectionnez la zone concernée pour découvrir les plantes adaptées
          </Text>

          <View style={styles.zonesContainer}>
            {bodyZones.map((zone) => (
              <TouchableOpacity
                key={zone.id}
                style={styles.zoneCard}
                onPress={() => handleZonePress(zone.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.zoneEmoji}>{zone.emoji}</Text>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                </View>
                <Text style={styles.zoneDescription}>{zone.description}</Text>
                <View style={styles.arrow}>
                  <Text style={styles.arrowText}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5a6b5d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  zonesContainer: {
    gap: 16,
  },
  zoneCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e8f0ea',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d5738',
    flex: 1,
  },
  zoneDescription: {
    fontSize: 14,
    color: '#7c9885',
    lineHeight: 20,
    marginLeft: 36,
  },
  arrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  arrowText: {
    fontSize: 20,
    color: '#7c9885',
    fontWeight: '600',
  },
});
