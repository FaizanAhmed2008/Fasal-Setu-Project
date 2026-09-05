import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

const STEP_KEYS = [
  'nav.step1',
  'nav.step2',
  'nav.step3',
  'nav.step4',
  'nav.step5',
  'nav.step6',
  'nav.step7',
  'nav.step8',
  'nav.step9',
];

export const PageNav = ({ children, backTo, backState, hideBack = false }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-cream-50/80 backdrop-blur-xl border-b border-charcoal-100">
      <div className="container-x flex items-center justify-between h-16">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest-600 text-white">
            <Sprout className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="font-display text-[17px] font-bold tracking-tighter2 text-charcoal-800">
            FasalSetu
          </span>
        </a>
        <div className="flex items-center gap-3">
          {!hideBack && <BackButton to={backTo} state={backState} />}
          {children}
          <LanguageSelector compact />
        </div>
      </div>
    </header>
  );
};

export const BackButton = ({ to, state }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const goBack = () => {
    if (to) {
      navigate(to, state ? { state } : undefined);
      return;
    }
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };
  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold text-charcoal-600 hover:text-charcoal-800 hover:bg-cream-100 transition-colors"
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
      {t('nav.back')}
    </button>
  );
};

export const ProgressSteps = ({ active = 0 }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2">
      {STEP_KEYS.map((key, index) => {
        const step = t(key);
        const isActive = index === active;
        const isDone = index < active;
        return (
          <React.Fragment key={step}>
            <div className={`flex items-center gap-1.5 flex-shrink-0 ${isActive ? 'text-forest-700' : isDone ? 'text-charcoal-700' : 'text-charcoal-400'}`}>
              <div
                className={[
                  'h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-[11px] sm:text-[12px] font-bold transition-colors',
                  isActive
                    ? 'bg-forest-600 text-white'
                    : isDone
                    ? 'bg-forest-100 text-forest-700'
                    : 'bg-charcoal-100 text-charcoal-500',
                ].join(' ')}
              >
                {index + 1}
              </div>
              <span className="text-[11px] sm:text-[12.5px] font-semibold hidden md:inline whitespace-nowrap">{step}</span>
            </div>
            {index < STEP_KEYS.length - 1 && (
              <div className={`h-px w-4 sm:w-8 flex-shrink-0 ${isDone ? 'bg-forest-300' : 'bg-charcoal-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
