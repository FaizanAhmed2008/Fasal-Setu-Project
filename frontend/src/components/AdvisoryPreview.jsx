import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Bug, Sprout, Bell } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const ADVISORIES = [
  {
    icon: CloudRain,
    tone: 'info',
    labelKey: 'landing.advWeatherLabel',
    titleKey: 'landing.advWeatherTitle',
    bodyKey: 'landing.advWeatherBody',
    whenKey: 'landing.advNow',
  },
  {
    icon: Bug,
    tone: 'warn',
    labelKey: 'landing.advPestLabel',
    titleKey: 'landing.advPestTitle',
    bodyKey: 'landing.advPestBody',
    whenKey: 'landing.advTwoHours',
  },
  {
    icon: Sprout,
    tone: 'forest',
    labelKey: 'landing.advTipLabel',
    titleKey: 'landing.advTipTitle',
    bodyKey: 'landing.advTipBody',
    whenKey: 'landing.advYesterday',
  },
];

const toneMap = {
  info: { bg: 'bg-info-50', text: 'text-info-600', dot: 'bg-info-500' },
  warn: { bg: 'bg-warn-50', text: 'text-warn-500', dot: 'bg-warn-500' },
  forest: { bg: 'bg-forest-50', text: 'text-forest-600', dot: 'bg-forest-500' },
};

const AdvisoryCard = ({ a, i }) => {
  const Icon = a.icon;
  const t = toneMap[a.tone];
  const { t: translate } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easeOut, delay: i * 0.08 }}
      whileHover={{ y: -2 }}
      className="group relative h-full rounded-2xl border border-charcoal-100 bg-white p-6 sm:p-7 transition-shadow duration-500 hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-xl ${t.bg} ${t.text} flex items-center justify-center`}>
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </div>
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-charcoal-400">{translate(a.whenKey)}</span>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span className={`pill ${t.bg} ${t.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
          {translate(a.labelKey)}
        </span>
      </div>
      <h3 className="mt-3 text-[17px] sm:text-[18px] font-semibold text-charcoal-800 tracking-tightish leading-snug text-pretty">
        {translate(a.titleKey)}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-charcoal-500 text-pretty">
        {translate(a.bodyKey)}
      </p>
    </motion.div>
  );
};

const AdvisoryPreview = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap id="advisory" className="py-20 sm:py-28 bg-cream-50">
      <SectionHeading
        align="center"
        eyebrow={t('landing.advEyebrow')}
        title={
          <>
            {t('landing.advTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.advTitle2')}</span>
          </>
        }
        lead={t('landing.advLead')}
      />

      <div className="mt-14 sm:mt-16 grid md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {ADVISORIES.map((a, i) => (
          <AdvisoryCard key={a.titleKey} a={a} i={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
        className="mt-10 flex justify-center"
      >
        <div className="inline-flex items-center gap-2 text-[12.5px] text-charcoal-500">
          <Bell className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.3} />
          {t('landing.advFooter')}
        </div>
      </motion.div>
    </SectionWrap>
  );
};

export default AdvisoryPreview;
