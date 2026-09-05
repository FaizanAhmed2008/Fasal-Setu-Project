import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, TrendingUp, Users, ShieldCheck, Sprout, Store, ArrowDown } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const NODES = [
  { icon: LineChart, labelKey: 'landing.d2dNode1' },
  { icon: TrendingUp, labelKey: 'landing.d2dNode2' },
  { icon: Users, labelKey: 'landing.d2dNode3' },
  { icon: ShieldCheck, labelKey: 'landing.d2dNode4', highlight: true },
  { icon: Sprout, labelKey: 'landing.d2dNode5' },
  { icon: Store, labelKey: 'landing.d2dNode6' },
];

const DataToDecision = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap className="py-20 sm:py-28 bg-white">
      <SectionHeading
        align="center"
        eyebrow={t('landing.d2dEyebrow')}
        title={
          <>
            {t('landing.d2dTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.d2dTitle2')}</span>
          </>
        }
        lead={t('landing.d2dLead')}
      />

      <div className="mt-14 sm:mt-16 max-w-5xl mx-auto">
        <div className="relative">
          {/* Connector line - horizontal on lg */}
          <div className="hidden lg:block absolute left-0 right-0 top-[44px] h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" aria-hidden="true" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
            {NODES.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.labelKey}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className={[
                      'relative h-[88px] w-[88px] rounded-2xl flex items-center justify-center transition-shadow duration-500',
                      n.highlight
                        ? 'bg-charcoal-800 text-white shadow-soft'
                        : 'bg-cream-50 border border-charcoal-100 text-charcoal-700',
                    ].join(' ')}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.7} />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border border-charcoal-100 text-[10px] font-semibold text-charcoal-500 flex items-center justify-center shadow-softer">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-3 text-[13.5px] sm:text-[14px] font-semibold text-charcoal-800 tracking-tightish max-w-[140px] leading-tight">
                    {t(n.labelKey)}
                  </div>

                  {/* Mobile/tablet connector */}
                  {i < NODES.length - 1 && (
                    <div className="lg:hidden absolute -bottom-7 left-1/2 -translate-x-1/2 text-charcoal-300">
                      <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
};

export default DataToDecision;
