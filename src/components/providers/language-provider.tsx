import { i18n } from 'i18next';
import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'fr';

type LanguageItem = { code: Language; label: string };

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  i18n?: i18n;
  setLanguage: (language: Language) => void;
  languages?: LanguageItem[];
};

const initialState: LanguageProviderState = {
  language: 'en',
  setLanguage: () => null,
  languages: [],
};

export const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

function LanguageProvider({
  children,
  defaultLanguage = 'en',
  storageKey = 'just-notion-language',
}: ThemeProviderProps) {
  const savedLanguage = localStorage.getItem(storageKey) as Language;
  const [language, setLanguage] = useState<Language>(savedLanguage || defaultLanguage);
  const { i18n } = useTranslation();

  const languages: LanguageItem[] = [
    {
      code: 'en',
      label: 'English',
    },
    {
      code: 'fr',
      label: 'French',
    },
  ];

  useEffect(() => {
    if (savedLanguage) i18n.changeLanguage(savedLanguage);
  }, [i18n, savedLanguage]);

  const value = {
    i18n,
    language,
    languages,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      i18n.changeLanguage(language);
      setLanguage(language);
    },
  };

  return (
    <LanguageProviderContext.Provider value={value}>{children}</LanguageProviderContext.Provider>
  );
}

export default LanguageProvider;
