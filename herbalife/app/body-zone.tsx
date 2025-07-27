import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { responsive } from '../utils/responsive';

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
  const { contraindications } = useLocalSearchParams();
  const userContraindications = contraindications ? JSON.parse(contraindications as string) : [];

  const handleZonePress = (zone: string) => {
    router.push({
      pathname: '/body-zone-symptoms' as any,
      params: { 
        zone,
        contraindications: JSON.stringify(userContraindications)
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.zoneEmoji}>{zone.emoji}</Text>
              <Text style={styles.zoneName}>{zone.name}</Text>
              <Text style={styles.zoneDescription}>{zone.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f5',
  },
  content: {
    flex: 1,
    padding: responsive.padding.container,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: responsive.fontSize.title,
    fontWeight: '700',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.xs,
  },
  subtitle: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
    textAlign: 'center',
    marginBottom: responsive.spacing.lg,
    lineHeight: 20,
  },
  zonesContainer: {
    flex: 1,
    flexDirection: responsive.columns.bodyZones === 1 ? 'column' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    gap: responsive.spacing.xs,
  },
  zoneCard: {
    backgroundColor: '#ffffff',
    borderRadius: responsive.borderRadius.medium,
    width: responsive.columns.bodyZones === 1 ? '100%' : '48%',
    height: responsive.height < 700 ? 85 : 95, // Hauteur fixe adaptée
    padding: responsive.padding.card - 4,
    shadowColor: '#000',
    ...responsive.shadow.small,
    borderWidth: 1,
    borderColor: '#e8f0ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneEmoji: {
    fontSize: responsive.height < 700 ? 20 : 24,
    marginBottom: responsive.spacing.xs / 2,
    textAlign: 'center',
  },
  zoneName: {
    fontSize: responsive.height < 700 ? 11 : responsive.fontSize.small,
    fontWeight: '700',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.xs / 2,
    lineHeight: responsive.height < 700 ? 13 : responsive.fontSize.small + 2,
  },
  zoneDescription: {
    fontSize: responsive.height < 700 ? 9 : responsive.fontSize.small - 1,
    color: '#7c9885',
    lineHeight: responsive.height < 700 ? 11 : responsive.fontSize.small + 1,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
});
