import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, BarChart3, Store, CloudSun, ArrowUpRight } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const FEATURES = [
  {
    n: '01',
    icon: Sprout,
    titleKey: 'landing.capRiskTitle',
    bodyKey: 'landing.capRiskBody',
    accent: 'forest',
  },
  {
    n: '02',
    icon: BarChart3,
    titleKey: 'landing.capPlanTitle',
    bodyKey: 'landing.capPlanBody',
    accent: 'amber',
  },
  {
    n: '03',
    icon: Store,
    titleKey: 'landing.capMarketTitle',
    bodyKey: 'landing.capMarketBody',
    accent: 'info',
  },
  {
    n: '04',
    icon: CloudSun,
    titleKey: 'landing.capAdvisoryTitle',
    bodyKey: 'landing.capAdvisoryBody',
    accent: 'warn',
  },
];

const accentMap = {
  forest: { bg: 'bg-forest-50', text: 'text-forest-700', ring: 'ring-forest-100' },
  amber: { bg: 'bg-amber-muted/15', text: 'text-amber-muted', ring: 'ring-charcoal-100' },
  info: { bg: 'bg-info-50', text: 'text-info-600', ring: 'ring-info-100' },
  warn: { bg: 'bg-warn-50', text: 'text-warn-500', ring: 'ring-warn-100' },
};

const FeatureCard = ({ f, i }) => {
  const Icon = f.icon;
  const a = accentMap[f.accent];
  const { t } = useLanguage();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
      whileHover={{ y: -3 }}
      className="group relative h-full rounded-2xl border border-charcoal-100 bg-white p-6 sm:p-7 transition-shadow duration-500 hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className={`h-11 w-11 rounded-xl ${a.bg} ${a.text} flex items-center justify-center ring-1 ${a.ring}`}>
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </div>
        <span className="text-[11px] font-semibold tracking-[0.18em] text-charcoal-400">{f.n}</span>
      </div>
      <h3 className="mt-6 text-[19px] font-semibold text-charcoal-800 tracking-tightish leading-snug">
        {t(f.titleKey)}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.65] text-charcoal-500 text-pretty">
        {t(f.bodyKey)}
      </p>
      <div className="mt-6 flex items-center gap-1.5 text-[12.5px] font-semibold text-charcoal-400 group-hover:text-forest-600 transition-colors duration-300">
        {t('landing.learnMore')}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
      </div>
    </motion.article>
  );
};

const Capabilities = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap className="py-20 sm:py-28 bg-white">
      <SectionHeading
        align="center"
        eyebrow={t('landing.capEyebrow')}
        title={
          <>
            {t('landing.capTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.capTitle2')}</span>
          </>
        }
        lead={t('landing.capLead')}
      />

      <div className="mt-14 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.n} f={f} i={i} />
        ))}
      </div>
    </SectionWrap>
  );
};

export default Capabilities;
