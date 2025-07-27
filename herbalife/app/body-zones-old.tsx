import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { bodyZones } from '../data/DataPlant';
import { responsive } from '../utils/responsive';

export default function BodyZonesScreen() {
  const columns = responsive.columns.bodyZones;

  const handleZonePress = (zone: any) => {
    router.push({
      pathname: '/zone-symptoms' as any,
      params: { 
        zoneId: zone.id,
        zoneName: zone.name,
        zoneEmoji: zone.emoji,
        zoneColor: zone.color
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontSize: responsive.fontSize.title }]}>
          Choisissez une zone du corps
        </Text>
        <Text style={[styles.subtitle, { fontSize: responsive.fontSize.medium }]}>
          Sélectionnez la zone qui vous préoccupe pour voir les symptômes associés
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.zonesGrid, { 
          paddingHorizontal: responsive.padding.container 
        }]}>
          {bodyZones.map((zone, index) => {
            const isLastInRow = columns > 1 && (index + 1) % columns === 0;
            const cardWidth = columns === 1 ? '100%' : 
                             columns === 2 ? '48%' :
                             columns === 3 ? '31%' : '23%';
            
            return (
              <TouchableOpacity
                key={zone.id}
                style={[
                  styles.zoneCard,
                  { 
                    width: cardWidth,
                    backgroundColor: zone.color + '15',
                    borderColor: zone.color + '40',
                    marginBottom: responsive.spacing.md,
                    marginRight: !isLastInRow ? responsive.spacing.sm : 0,
                    padding: responsive.padding.card
                  }
                ]}
                onPress={() => handleZonePress(zone)}
                activeOpacity={0.7}
              >
                <View style={[styles.emojiContainer, { backgroundColor: zone.color + '20' }]}>
                  <Text style={[styles.emoji, { fontSize: responsive.emojiSize }]}>
                    {zone.emoji}
                  </Text>
                </View>
                
                <Text style={[styles.zoneName, { 
                  fontSize: responsive.fontSize.large,
                  color: zone.color
                }]}>
                  {zone.name}
                </Text>
                
                <Text style={[styles.zoneDescription, { fontSize: responsive.fontSize.small }]}>
                  {zone.description}
                </Text>
                
                <View style={[styles.symptomCount, { backgroundColor: zone.color + '10' }]}>
                  <Text style={[styles.symptomCountText, { 
                    fontSize: responsive.fontSize.xs,
                    color: zone.color
                  }]}>
                    {zone.symptoms.length} symptômes
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  zonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  zoneCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    textAlign: 'center',
  },
  zoneName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  zoneDescription: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  symptomCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  symptomCountText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
