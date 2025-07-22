import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './_layout';

type BodyZoneScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BodyZone'>;

interface Props {
  navigation: BodyZoneScreenNavigationProp;
}

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

export default function BodyZoneScreen({ navigation }: Props) {
  const handleZonePress = (zone: string) => {
    navigation.navigate('Recommendations', { zone });
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
                <View style={styles.zoneHeader}>
                  <Text style={styles.zoneEmoji}>{zone.emoji}</Text>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                </View>
                <Text style={styles.zoneDescription}>{zone.description}</Text>
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
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5a6c57',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  zonesContainer: {
    gap: 16,
  },
  zoneCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#7c9885',
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  zoneName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d5016',
    flex: 1,
  },
  zoneDescription: {
    fontSize: 14,
    color: '#5a6c57',
    lineHeight: 20,
  },
});