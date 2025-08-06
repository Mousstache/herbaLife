import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';

// Importation des fichiers de traduction
import fr from './translations/fr.json';
import en from './translations/en.json';
import es from './translations/es.json';
import it from './translations/it.json';
import ar from './translations/ar.json';
import pt from './translations/pt.json';

// Configuration des traductions
const i18n = new I18n({
  fr,
  en,
  es,
  it,
  ar,
  pt,
});

// Liste des langues disponibles
export const languageOptions = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'ar', name: 'العربية' },
  { code: 'pt', name: 'Português' },
];

// Langue par défaut
i18n.defaultLocale = 'fr';

// Stockage de la clé pour AsyncStorage
const LANGUAGE_KEY = '@herbalife:language';

// Création du contexte
export const LocalizationContext = createContext({
  t: (scope: string, options?: object) => '',
  locale: 'fr',
  setLocale: (locale: string) => {},
  currentLanguage: { code: 'fr', name: 'Français' },
  languages: languageOptions,
});

// Provider pour le contexte de traduction
export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState('fr');
  
  // Trouver la langue actuelle dans les options
  const currentLanguage = languageOptions.find(lang => lang.code === locale) || languageOptions[0];

  useEffect(() => {
    // Initialiser la langue
    const initializeLanguage = async () => {
      try {
        // Obtenir la langue stockée ou utiliser celle du système
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
          setLocale(savedLanguage);
        } else {
          const deviceLanguage = Localization.locale.split('-')[0];
          const isSupported = languageOptions.some(lang => lang.code === deviceLanguage);
          setLocale(isSupported ? deviceLanguage : 'fr');
        }
      } catch (error) {
        console.error('Failed to load language', error);
      }
    };
    
    initializeLanguage();
  }, []);

  useEffect(() => {
    // Mettre à jour la configuration de i18n et enregistrer la préférence
    i18n.locale = locale;
    AsyncStorage.setItem(LANGUAGE_KEY, locale)
      .catch(error => console.error('Failed to save language', error));
  }, [locale]);

  const t = (scope: string, options?: object) => {
    return i18n.t(scope, options);
  };

  return (
    <LocalizationContext.Provider value={{ t, locale, setLocale, currentLanguage, languages: languageOptions }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Hook personnalisé pour utiliser les traductions
export const useTranslation = () => useContext(LocalizationContext);
