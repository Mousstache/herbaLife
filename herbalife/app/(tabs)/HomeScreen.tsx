import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './_layout';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>PhytoConseil</Text>
          <View style={styles.leafIcon}>
            <Text style={styles.leafEmoji}>🌿</Text>
          </View>
        </View>

        <View style={styles.illustrationContainer}>
          <Text style={styles.plantEmoji}>🌱</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Bienvenue dans PhytoConseil, votre guide personnalisé pour découvrir les plantes médicinales adaptées à vos besoins.
          </Text>
          <Text style={styles.descriptionText}>
            Explorez des remèdes naturels basés sur la phytothérapie et l'homéopathie.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('BodyZone')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Remèdes naturels • Conseils personnalisés</Text>
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d5016',
    marginBottom: 8,
  },
  leafIcon: {
    backgroundColor: '#7c9885',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafEmoji: {
    fontSize: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  plantEmoji: {
    fontSize: 120,
  },
  textContainer: {
    paddingHorizontal: 16,
  },
  welcomeText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#2d5016',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5a6c57',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#7c9885',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#8a9688',
    fontStyle: 'italic',
  },
});