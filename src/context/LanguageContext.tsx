import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { Lang, t as translate } from '../i18n/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const changeLanguage = useCallback((locale: Lang) => {
    setLang(locale);
    try {
      window.localStorage.setItem('claims-review-locale', locale);
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    let preferred = new URLSearchParams(window.location.search).get('lang');
    if (preferred !== 'fr' && preferred !== 'en') {
      try {
        preferred = window.localStorage.getItem('claims-review-locale');
      } catch {
        preferred = 'fr';
      }
    }
    changeLanguage(preferred === 'en' ? 'en' : 'fr');
  }, [changeLanguage]);

  const t = (key: string): string => {
    return translate(lang, key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
