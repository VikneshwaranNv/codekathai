import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'c' | 'java';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LANGUAGE_STORAGE_KEY = 'codekathai_active_language';

const LanguageContext = createContext<LanguageContextType>({
  language: 'c',
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'c';
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'java' ? 'java' : 'c';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const toggleLanguage = () => {
    const next = language === 'c' ? 'java' : 'c';
    setLanguage(next);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
