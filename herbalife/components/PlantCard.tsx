import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Plant } from '../data/DataPlant';
import { isPlantDangerous, getDangerLevel } from '../utils/contraindicationChecker';
import { responsive } from '../utils/responsive';
import { useWishlist } from '../contexts/WishlistContext';

interface Props {
  plant: Plant;
  onPress: () => void;
  userContraindications?: string[];
}

export default function PlantCard({ plant, onPress, userContraindications = [] }: Props) {
  const { isFavorite, toggleFavorite } = useWishlist();
  const dangerLevel = getDangerLevel(plant, userContraindications);
  const isDangerous = dangerLevel === 'dangerous';
  const isWarning = dangerLevel === 'warning';
  const isPlantFavorite = isFavorite(plant.id);

  const handleFavoritePress = () => {
    toggleFavorite(plant);
  };

  return (
    <View style={styles.cardWrapper}>
      {/* Bouton favori au-dessus de tout */}
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={[styles.favoriteIcon, isPlantFavorite && styles.favoriteIconActive]}>
          {isPlantFavorite ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.card,
          isDangerous && styles.dangerousCard,
          isWarning && styles.warningCard
        ]} 
        onPress={onPress} 
        activeOpacity={0.7}
      >
        {/* Effet rayé pour les plantes dangereuses */}
        {isDangerous && (
          <View style={styles.dangerousOverlay}>
            <View style={styles.stripePattern} />
          </View>
        )}
        
        {/* Badge d'avertissement */}
        {isDangerous && (
          <View style={styles.dangerBadge}>
            <Text style={styles.dangerBadgeText}>⚠️ ATTENTION</Text>
          </View>
        )}
        
        {isWarning && (
          <View style={styles.warningBadge}>
            <Text style={styles.warningBadgeText}>⚡ PRUDENCE</Text>
          </View>
        )}

      <View style={styles.header}>
        <Text style={[styles.emoji, isDangerous && styles.dangerousEmoji]}>
          {plant.emoji}
        </Text>
        <View style={styles.titleContainer}>
          <Text style={[styles.name, isDangerous && styles.dangerousName]}>
            {plant.name}
          </Text>
          <Text style={[styles.latinName, isDangerous && styles.dangerousLatinName]}>
            {plant.latinName}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.shortDescription, isDangerous && styles.dangerousDescription]}>
        {plant.shortDescription}
      </Text>
      
      <View style={styles.benefitsContainer}>
        {plant.mainBenefits.slice(0, 2).map((benefit, index) => (
          <View key={index} style={[
            styles.benefitTag, 
            isDangerous && styles.dangerousBenefitTag,
            isWarning && styles.warningBenefitTag
          ]}>
            <Text style={[
              styles.benefitText, 
              isDangerous && styles.dangerousBenefitText,
              isWarning && styles.warningBenefitText
            ]}>
              {benefit}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.seeMoreText, isDangerous && styles.dangerousSeeMore]}>
          {isDangerous ? 'Voir contre-indications →' : 'Voir plus →'}
        </Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: responsive.borderRadius.small,
    padding: responsive.padding.card,
    shadowColor: '#000',
    ...responsive.shadow.small,
    borderLeftWidth: 4,
    borderLeftColor: '#7c9885',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: responsive.spacing.sm,
  },
  dangerousCard: {
    borderLeftColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  warningCard: {
    borderLeftColor: '#ea580c',
    backgroundColor: '#fff7ed',
  },
  dangerousOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  stripePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'repeating-linear-gradient(-45deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.1) 10px, transparent 10px, transparent 20px)',
  },
  dangerBadge: {
    position: 'absolute',
    top: responsive.spacing.sm,
    right: responsive.spacing.sm,
    backgroundColor: '#dc2626',
    paddingHorizontal: responsive.spacing.xs,
    paddingVertical: responsive.spacing.xs / 2,
    borderRadius: responsive.borderRadius.small,
    zIndex: 2,
  },
  dangerBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  warningBadge: {
    position: 'absolute',
    top: responsive.spacing.sm,
    right: responsive.spacing.sm,
    backgroundColor: '#ea580c',
    paddingHorizontal: responsive.spacing.xs,
    paddingVertical: responsive.spacing.xs / 2,
    borderRadius: responsive.borderRadius.small,
    zIndex: 2,
  },
  warningBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.sm,
    zIndex: 2,
    position: 'relative',
  },
  emoji: {
    fontSize: responsive.emojiSize,
    marginRight: responsive.spacing.md,
  },
  dangerousEmoji: {
    opacity: 0.7,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: '#2d5016',
    marginBottom: 2,
  },
  dangerousName: {
    color: '#7f1d1d',
    textDecorationLine: 'line-through',
  },
  latinName: {
    fontSize: responsive.fontSize.small,
    color: '#7c9885',
    fontStyle: 'italic',
  },
  dangerousLatinName: {
    color: '#991b1b',
  },
  shortDescription: {
    fontSize: responsive.fontSize.medium,
    color: '#5a6c57',
    lineHeight: 22,
    marginBottom: responsive.spacing.md,
    zIndex: 2,
    position: 'relative',
  },
  dangerousDescription: {
    color: '#7f1d1d',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing.xs,
    marginBottom: responsive.spacing.md,
    zIndex: 2,
    position: 'relative',
  },
  benefitTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: responsive.spacing.sm,
    paddingVertical: responsive.spacing.xs,
    borderRadius: responsive.borderRadius.medium,
  },
  dangerousBenefitTag: {
    backgroundColor: '#fecaca',
  },
  warningBenefitTag: {
    backgroundColor: '#fed7aa',
  },
  benefitText: {
    fontSize: responsive.fontSize.small,
    color: '#2d5016',
    fontWeight: '500',
  },
  dangerousBenefitText: {
    color: '#7f1d1d',
  },
  warningBenefitText: {
    color: '#9a3412',
  },
  footer: {
    alignItems: 'flex-end',
    zIndex: 2,
    position: 'relative',
  },
  seeMoreText: {
    fontSize: responsive.fontSize.small,
    color: '#7c9885',
    fontWeight: '600',
  },
  dangerousSeeMore: {
    color: '#dc2626',
  },
  favoriteButton: {
    position: 'absolute',
    top: responsive.spacing.sm,
    right: responsive.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#7c9885',
  },
  favoriteIcon: {
    fontSize: 26,
    color: '#7c9885',
    fontWeight: 'bold',
  },
  favoriteIconActive: {
    color: '#dc2626',
  },
});