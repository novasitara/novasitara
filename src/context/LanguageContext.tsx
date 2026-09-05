import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Translations } from '../data/translations';

export type Language = 'EN' | 'DE';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ns_lang');
    return saved === 'DE' ? 'DE' : 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ns_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
