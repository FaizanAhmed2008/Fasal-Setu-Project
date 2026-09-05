import React, { createContext, useContext, useMemo, useState } from 'react';
import { translations as baseTranslations, LANG_CODES } from '../i18n/translations';
import { extraTranslations } from '../i18n/extraTranslations';

const translations = {
  en: { ...baseTranslations.en, ...extraTranslations.en },
  hi: { ...baseTranslations.hi, ...extraTranslations.hi },
  mr: { ...baseTranslations.mr, ...extraTranslations.mr },
};

const LanguageContext = createContext(null);

const LS_KEY = 'fasalsetu_lang';

const SEASON_KEYS = {
  Kharif: 'farm.seasonKharif',
  Rabi: 'farm.seasonRabi',
};

function getInitialLang() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored && LANG_CODES.includes(stored)) return stored;
  } catch (_) {
    /* ignore */
  }
  return 'en';
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  const setLanguage = (code) => {
    if (!LANG_CODES.includes(code)) return;
    setLang(code);
    try {
      localStorage.setItem(LS_KEY, code);
    } catch (_) {
      /* ignore */
    }
  };

  const value = useMemo(() => {
    const dict = translations[lang] || translations.en;
    const t = (key, params) => {
      let str = dict[key] ?? translations.en[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          str = String(str).replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        });
      }
      return str;
    };
    const cropName = (name) => (name ? t(`crop.${name}`) : '');
    const seasonName = (name) => (name && SEASON_KEYS[name] ? t(SEASON_KEYS[name]) : name || '');
    const reasonForCrop = (name) => t(`reco.reason${name}`) === `reco.reason${name}`
      ? t('reco.reasonDefault')
      : t(`reco.reason${name}`);
    return { lang, setLanguage, t, cropName, seasonName, reasonForCrop };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};