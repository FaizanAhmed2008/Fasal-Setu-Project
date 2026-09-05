import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SectionWrap } from './ui/Section';
import { TinyLeaf, TinySeed } from './illustrations/FieldScene';

const easeOut = [0.22, 1, 0.36, 1];

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cream-100" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 contour-bg" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 grain-bg opacity-40" aria-hidden="true" />

      {/* Decorative 3D-ish leaves */}
      <motion.div
        aria-hidden
        className="absolute -top-6 right-6 sm:top-10 sm:right-20 h-20 w-20 sm:h-28 sm:w-28 drop-shadow-[0_12px_28px_rgba(63,126,74,0.25)]"
        animate={{ y: [0, -5, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
      >
        <TinyLeaf className="h-full w-full" />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute -bottom-4 left-4 sm:bottom-10 sm:left-24 h-14 w-14 sm:h-16 sm:w-16 drop-shadow-[0_10px_22px_rgba(155,122,63,0.25)]"
        animate={{ y: [0, 4, 0], rotate: [6, -4, 6] }}
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
      >
        <TinySeed className="h-full w-full" />
      </motion.div>

      <SectionWrap className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur border border-charcoal-100 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-700 shadow-softer mb-6">
            <Sparkles className="h-3 w-3" strokeWidth={2.4} />
            {t('landing.ctaKicker')}
          </div>

          <h2 className="h-section text-3xl sm:text-4xl lg:text-[52px] text-balance">
            {t('landing.ctaTitle1')}
            <br />
            <span className="text-forest-600">{t('landing.ctaTitle2')}</span>
          </h2>

          <p className="mt-6 text-[16.5px] sm:text-[17px] leading-[1.65] text-charcoal-500 text-pretty max-w-2xl mx-auto">
            {t('landing.ctaSub')}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/onboarding')} className="btn-primary group">
              {t('landing.planCrop')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
            </button>
            <a href="#how-it-works" className="btn-ghost">
              {t('landing.seeHow')}
            </a>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-[12.5px] text-charcoal-500">
            <span className="h-1 w-6 rounded-full bg-forest-300" />
            {t('landing.heroFooter')}
            <span className="h-1 w-6 rounded-full bg-forest-300" />
          </div>
        </motion.div>
      </SectionWrap>
    </section>
  );
};

export default CTASection;
