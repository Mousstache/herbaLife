import { Platform } from 'react-native';

// Interface pour unifier le stockage
interface StorageInterface {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Création du storage selon la plateforme
const createStorage = (): StorageInterface => {
  if (Platform.OS === 'web') {
    // Implémentation pour le web (localStorage)
    return {
      async getItem(key: string): Promise<string | null> {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(key);
          }
          return null;
        } catch (error) {
          console.error('Erreur localStorage getItem:', error);
          return null;
        }
      },

      async setItem(key: string, value: string): Promise<void> {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, value);
          }
        } catch (error) {
          console.error('Erreur localStorage setItem:', error);
          throw error;
        }
      },

      async removeItem(key: string): Promise<void> {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          console.error('Erreur localStorage removeItem:', error);
          throw error;
        }
      }
    };
  } else {
    // Pour mobile, on essaie d'importer AsyncStorage dynamiquement
    let AsyncStorage: any = null;
    
    try {
      AsyncStorage = require('@react-native-async-storage/async-storage').default;
    } catch (error) {
      console.warn('AsyncStorage non disponible, utilisation d\'un fallback');
    }

    return {
      async getItem(key: string): Promise<string | null> {
        if (AsyncStorage) {
          try {
            return await AsyncStorage.getItem(key);
          } catch (error) {
            console.error('Erreur AsyncStorage getItem:', error);
            return null;
          }
        }
        return null;
      },

      async setItem(key: string, value: string): Promise<void> {
        if (AsyncStorage) {
          try {
            await AsyncStorage.setItem(key, value);
          } catch (error) {
            console.error('Erreur AsyncStorage setItem:', error);
            throw error;
          }
        }
      },

      async removeItem(key: string): Promise<void> {
        if (AsyncStorage) {
          try {
            await AsyncStorage.removeItem(key);
          } catch (error) {
            console.error('Erreur AsyncStorage removeItem:', error);
            throw error;
          }
        }
      }
    };
  }
};

// Export du storage
export const storage: StorageInterface = createStorage();
