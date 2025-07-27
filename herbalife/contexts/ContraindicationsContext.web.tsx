import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';

interface ContraindicationsContextType {
  userContraindications: string[];
  saveContraindications: (contraindications: string[]) => Promise<void>;
  clearContraindications: () => Promise<void>;
  isLoading: boolean;
}

const CONTRAINDICATIONS_STORAGE_KEY = '@herbalife_contraindications';

const ContraindicationsContext = createContext<ContraindicationsContextType | undefined>(undefined);

// Fonctions de stockage - version web uniquement avec localStorage
const webStorage = {
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

// Fonction pour détecter si on peut utiliser le storage natif
const getStorageInterface = () => {
  if (Platform.OS === 'web') {
    return webStorage;
  }
  
  // Pour mobile, on retourne un storage qui ne fait rien pour l'instant
  // En production, AsyncStorage serait disponible
  return {
    async getItem(key: string): Promise<string | null> {
      console.log('Storage mobile non configuré pour le développement web');
      return null;
    },
    async setItem(key: string, value: string): Promise<void> {
      console.log('Storage mobile non configuré pour le développement web');
    },
    async removeItem(key: string): Promise<void> {
      console.log('Storage mobile non configuré pour le développement web');
    }
  };
};

export const ContraindicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userContraindications, setUserContraindications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const storage = getStorageInterface();

  // Charger les contre-indications au démarrage
  useEffect(() => {
    loadContraindications();
  }, []);

  const loadContraindications = async () => {
    try {
      const storedContraindications = await storage.getItem(CONTRAINDICATIONS_STORAGE_KEY);
      if (storedContraindications) {
        const parsedContraindications = JSON.parse(storedContraindications);
        console.log('Contre-indications chargées:', parsedContraindications);
        setUserContraindications(parsedContraindications);
      } else {
        console.log('Aucune contre-indication sauvegardée trouvée');
        setUserContraindications([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des contre-indications:', error);
      setUserContraindications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContraindications = async (contraindications: string[]) => {
    try {
      await storage.setItem(CONTRAINDICATIONS_STORAGE_KEY, JSON.stringify(contraindications));
      console.log('Contre-indications sauvegardées:', contraindications);
      setUserContraindications(contraindications);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des contre-indications:', error);
      throw error;
    }
  };

  const clearContraindications = async () => {
    try {
      await storage.removeItem(CONTRAINDICATIONS_STORAGE_KEY);
      console.log('Contre-indications effacées');
      setUserContraindications([]);
    } catch (error) {
      console.error('Erreur lors de la suppression des contre-indications:', error);
      throw error;
    }
  };

  return (
    <ContraindicationsContext.Provider
      value={{
        userContraindications,
        saveContraindications,
        clearContraindications,
        isLoading,
      }}
    >
      {children}
    </ContraindicationsContext.Provider>
  );
};

export const useContraindications = () => {
  const context = useContext(ContraindicationsContext);
  if (context === undefined) {
    throw new Error('useContraindications must be used within a ContraindicationsProvider');
  }
  return context;
};
