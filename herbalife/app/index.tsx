import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
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
          onPress={() => router.push('/body-zone')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Conseil personnalisé • Remèdes naturels • Bien-être
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d5738',
    marginRight: 8,
    letterSpacing: -0.5,
  },
  leafIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#7c9885',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafEmoji: {
    fontSize: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  plantEmoji: {
    fontSize: 120,
  },
  textContainer: {
    paddingHorizontal: 8,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d5738',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#5a6b5d',
    textAlign: 'center',
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#7c9885',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#7c9885',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});
