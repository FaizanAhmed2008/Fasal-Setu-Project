import React from 'react';
import { motion } from 'framer-motion';
import { LANG_NAMES } from '../../i18n/translations';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector = ({ compact = false }) => {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-full bg-charcoal-100/70 p-0.5 gap-0">
      {LANG_NAMES.map(({ code, label }) => {
        const active = code === lang;
        return (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={[
              'relative flex items-center justify-center transition-colors',
              compact ? 'px-2 py-0.5 text-[11.5px]' : 'px-2.5 py-1 text-[12px]',
              active ? 'font-bold text-charcoal-900' : 'font-semibold text-charcoal-500 hover:text-charcoal-700',
            ].join(' ')}
          >
            {active && (
              <motion.div
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 34 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
};