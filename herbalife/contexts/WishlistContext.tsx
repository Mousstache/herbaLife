import React, { createContext, useContext, useState } from 'react';
import { Plant, Product } from '../data/DataPlant';

interface WishlistContextType {
  favorites: Plant[];
  favoriteProducts: Product[];
  addToFavorites: (plant: Plant) => void;
  removeFromFavorites: (plantId: string) => void;
  isFavorite: (plantId: string) => boolean;
  toggleFavorite: (plant: Plant) => void;
  addProductToFavorites: (product: Product) => void;
  removeProductFromFavorites: (productId: string) => void;
  isProductFavorite: (productId: string) => boolean;
  toggleProductFavorite: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Plant[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

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
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
      addProductToFavorites,
      removeProductFromFavorites,
      isProductFavorite,
      toggleProductFavorite
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
