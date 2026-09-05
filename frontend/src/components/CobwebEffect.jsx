import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Layers, AlertTriangle, ArrowDown, Sprout } from 'lucide-react';
import { SectionWrap, SectionHeading, Eyebrow } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    icon: TrendingUp,
    titleKey: 'landing.cobwebStep1Title',
    bodyKey: 'landing.cobwebStep1Body',
    accent: 'from-amber-muted/20 to-transparent',
  },
  {
    icon: Users,
    titleKey: 'landing.cobwebStep2Title',
    bodyKey: 'landing.cobwebStep2Body',
    accent: 'from-warn-500/15 to-transparent',
  },
  {
    icon: Layers,
    titleKey: 'landing.cobwebStep3Title',
    bodyKey: 'landing.cobwebStep3Body',
    accent: 'from-info-500/15 to-transparent',
  },
  {
    icon: AlertTriangle,
    titleKey: 'landing.cobwebStep4Title',
    bodyKey: 'landing.cobwebStep4Body',
    accent: 'from-danger-500/15 to-transparent',
  },
  {
    icon: ArrowDown,
    titleKey: 'landing.cobwebStep5Title',
    bodyKey: 'landing.cobwebStep5Body',
    accent: 'from-danger-500/25 to-transparent',
  },
];

const CobwebEffect = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap className="py-20 sm:py-28 bg-cream-50">
      <SectionHeading
        eyebrow={<><span className="h-1 w-3 bg-charcoal-300 rounded-full" /> {t('landing.cobwebEyebrow')}</>}
        align="center"
        title={
          <>
            {t('landing.cobwebTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.cobwebTitle2')}</span>
          </>
        }
        lead={t('landing.cobwebLead')}
      />

      <div className="mt-14 sm:mt-16 max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical connector line on desktop */}
          <div className="hidden md:block absolute left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-charcoal-200 via-charcoal-200 to-charcoal-300/50" aria-hidden="true" />

          <ol className="space-y-3 sm:space-y-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="group flex items-start gap-4 sm:gap-5 rounded-2xl border border-transparent hover:border-charcoal-100 hover:bg-white/70 transition-colors duration-300 p-3 sm:p-4">
                    <div className="relative flex-shrink-0">
                      <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${s.accent} border border-charcoal-100 flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-charcoal-700" strokeWidth={1.8} />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-white border border-charcoal-100 text-[10px] font-semibold text-charcoal-500 flex items-center justify-center">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="pt-1.5">
                      <div className="text-[16px] sm:text-[17px] font-semibold text-charcoal-800 tracking-tightish">{t(s.titleKey)}</div>
                      <div className="mt-1 text-[14.5px] leading-[1.6] text-charcoal-500 text-pretty max-w-xl">{t(s.bodyKey)}</div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          className="mt-10 sm:mt-12 mx-auto max-w-2xl rounded-2xl border border-forest-100 bg-white p-5 sm:p-6 flex items-start gap-3 shadow-soft"
        >
          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-forest-50 flex items-center justify-center">
            <Sprout className="h-4 w-4 text-forest-600" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-charcoal-800 tracking-tightish">{t('landing.cobwebBreakTitle')}</div>
            <div className="mt-1 text-[14px] leading-[1.6] text-charcoal-500">
              {t('landing.cobwebBreakBody')}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  );
};

export default CobwebEffect;
