import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './_layout';
import { useWishlist } from '../../contexts/WishlistContext';
import PlantCard from '../../components/PlantCard';
import { responsive } from '../../utils/responsive';

type WishlistScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Wishlist'>;

interface Props {
  navigation: WishlistScreenNavigationProp;
}

export default function WishlistScreen({ navigation }: Props) {
  const { favorites, toggleFavorite } = useWishlist();

  const renderPlantCard = ({ item }: { item: any }) => (
    <PlantCard
      plant={item}
      onPress={() => {
        // Handle plant details navigation if needed
        console.log('Plant pressed:', item.name);
      }}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💔</Text>
      <Text style={styles.emptyTitle}>Votre liste de souhaits est vide</Text>
      <Text style={styles.emptyDescription}>
        Explorez nos plantes médicinales et ajoutez celles qui vous intéressent à vos favoris.
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
      >
        <Text style={styles.exploreButtonText}>Explorer les plantes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ma Liste de Souhaits</Text>
        <View style={styles.placeholder} />
      </View>

      {favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <View style={styles.content}>
          <Text style={styles.countText}>
            {favorites.length} plante{favorites.length > 1 ? 's' : ''} en favoris
          </Text>
          <FlatList
            data={favorites}
            renderItem={renderPlantCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing.lg,
    paddingTop: responsive.spacing.md,
    paddingBottom: responsive.spacing.lg,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ece9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 152, 133, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#7c9885',
    fontWeight: 'bold',
  },
  title: {
    fontSize: responsive.fontSize.title,
    fontWeight: '600',
    color: '#2d5738',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: responsive.spacing.lg,
  },
  countText: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
    marginVertical: responsive.spacing.md,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: responsive.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: responsive.spacing.lg,
  },
  emptyTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: '#2d5738',
    textAlign: 'center',
    marginBottom: responsive.spacing.md,
  },
  emptyDescription: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6b5d',
    textAlign: 'center',
    lineHeight: responsive.fontSize.medium * 1.5,
    marginBottom: responsive.spacing.xxl,
  },
  exploreButton: {
    backgroundColor: '#7c9885',
    borderRadius: responsive.borderRadius.large,
    paddingVertical: responsive.padding.button,
    paddingHorizontal: responsive.spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    ...responsive.shadow.medium,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: responsive.fontSize.medium,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
