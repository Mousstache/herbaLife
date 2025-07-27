import React, { createContext, useContext, useState, useMemo } from 'react';
import { Plant, Product } from '../data/DataPlant';
import { useContraindications } from './ContraindicationsContext';
import { isPlantDangerous } from '../utils/contraindicationChecker';

interface WishlistContextType {
  favorites: Plant[];
  favoriteProducts: Product[];
  filteredFavorites: Plant[]; // Nouvelles plantes filtrées par contre-indications
  safeFavorites: Plant[]; // Plantes favorites sans danger
  dangerousFavorites: Plant[]; // Plantes favorites avec contre-indications
  addToFavorites: (plant: Plant) => void;
  removeFromFavorites: (plantId: string) => void;
  isFavorite: (plantId: string) => boolean;
  toggleFavorite: (plant: Plant) => void;
  addProductToFavorites: (product: Product) => void;
  removeProductFromFavorites: (productId: string) => void;
  isProductFavorite: (productId: string) => boolean;
  toggleProductFavorite: (product: Product) => void;
  filterBySafety: boolean;
  setFilterBySafety: (filter: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Plant[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [filterBySafety, setFilterBySafety] = useState<boolean>(false);
  
  // Accès aux contre-indications de l'utilisateur
  const { userContraindications } = useContraindications();

  // Calcul des plantes filtrées par sécurité
  const { filteredFavorites, safeFavorites, dangerousFavorites } = useMemo(() => {
    const safe: Plant[] = [];
    const dangerous: Plant[] = [];
    
    favorites.forEach(plant => {
      if (isPlantDangerous(plant, userContraindications)) {
        dangerous.push(plant);
      } else {
        safe.push(plant);
      }
    });
    
    const filtered = filterBySafety ? safe : favorites;
    
    return {
      filteredFavorites: filtered,
      safeFavorites: safe,
      dangerousFavorites: dangerous
    };
  }, [favorites, userContraindications, filterBySafety]);

  const addToFavorites = (plant: Plant) => {
    setFavorites(prev => [...prev, plant]);
  };

  const removeFromFavorites = (plantId: string) => {
    setFavorites(prev => prev.filter(plant => plant.id !== plantId));
  };

  const isFavorite = (plantId: string): boolean => {
    return favorites.some(plant => plant.id === plantId);
  };

  const toggleFavorite = (plant: Plant) => {
    if (isFavorite(plant.id)) {
      removeFromFavorites(plant.id);
    } else {
      addToFavorites(plant);
    }
  };

  // Méthodes pour les produits
  const addProductToFavorites = (product: Product) => {
    if (!product.id) return; // Ne pas ajouter si pas d'ID
    setFavoriteProducts(prev => {
      if (!prev.some(p => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeProductFromFavorites = (productId: string) => {
    setFavoriteProducts(prev => prev.filter(product => product.id !== productId));
  };

  const isProductFavorite = (productId: string): boolean => {
    return favoriteProducts.some(product => product.id === productId);
  };

  const toggleProductFavorite = (product: Product) => {
    if (!product.id) return; // Ne pas traiter si pas d'ID
    if (isProductFavorite(product.id)) {
      removeProductFromFavorites(product.id);
    } else {
      addProductToFavorites(product);
    }
  };

  return (
    <WishlistContext.Provider value={{
      favorites,
      favoriteProducts,
      filteredFavorites,
      safeFavorites,
      dangerousFavorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      addProductToFavorites,
      removeProductFromFavorites,
      isProductFavorite,
      toggleProductFavorite,
      filterBySafety,
      setFilterBySafety
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist doit être utilisé dans un WishlistProvider');
  }
  return context;
};
