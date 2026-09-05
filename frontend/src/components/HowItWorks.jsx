import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Ruler, Calendar, BarChart3, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    n: '01',
    titleKey: 'landing.step1Title',
    bodyKey: 'landing.step1Body',
    items: [
      { icon: MapPin, labelKey: 'landing.iDistrict' },
      { icon: Ruler, labelKey: 'landing.iLandSize' },
      { icon: Calendar, labelKey: 'landing.iSeason' },
    ],
  },
  {
    n: '02',
    titleKey: 'landing.step2Title',
    bodyKey: 'landing.step2Body',
    items: [
      { icon: BarChart3, labelKey: 'landing.iPriceTrends' },
      { icon: ShieldCheck, labelKey: 'landing.iSaturation' },
      { icon: Sparkles, labelKey: 'landing.iCropOpps' },
    ],
  },
  {
    n: '03',
    titleKey: 'landing.step3Title',
    bodyKey: 'landing.step3Body',
    items: [
      { icon: Sparkles, labelKey: 'landing.iCropChoice' },
      { icon: MapPin, labelKey: 'landing.iBestMandi' },
      { icon: Calendar, labelKey: 'landing.iSellWindow' },
      { icon: ShieldCheck, labelKey: 'landing.iAdvisory' },
    ],
  },
];

const StepCard = ({ s, i, isLast }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easeOut, delay: i * 0.1 }}
      className="relative h-full"
    >
      <div className="h-full rounded-2xl border border-charcoal-100 bg-white p-6 sm:p-7 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold tracking-[0.18em] text-forest-600">STEP {s.n}</div>
          <div className="h-7 w-7 rounded-full bg-cream-100 border border-charcoal-100 flex items-center justify-center text-[11px] font-semibold text-charcoal-500">
            {s.n}
          </div>
        </div>
        <h3 className="mt-5 text-[20px] sm:text-[22px] font-semibold text-charcoal-800 tracking-tighter2 leading-tight">
          {t(s.titleKey)}
        </h3>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-charcoal-500 text-pretty">
          {t(s.bodyKey)}
        </p>
        <ul className="mt-5 space-y-2.5 pt-5 border-t border-charcoal-100">
          {s.items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <li key={idx} className="flex items-center gap-2.5 text-[14px] text-charcoal-600">
                <span className="h-7 w-7 rounded-lg bg-cream-100 border border-charcoal-100 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-charcoal-500" strokeWidth={2.2} />
                </span>
                {t(it.labelKey)}
              </li>
            );
          })}
        </ul>
      </div>

      {!isLast && (
        <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-cream-50 border border-charcoal-100 items-center justify-center text-charcoal-400">
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
        </div>
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <SectionWrap id="how-it-works" className="py-20 sm:py-28 bg-cream-50">
      <SectionHeading
        align="center"
        eyebrow={t('landing.howEyebrow')}
        title={
          <>
            {t('landing.howTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.howTitle2')}</span>
          </>
        }
        lead={t('landing.howLead')}
      />

      <div className="mt-14 sm:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
        {STEPS.map((s, i) => (
          <StepCard key={s.n} s={s} i={i} isLast={i === STEPS.length - 1} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <button onClick={() => navigate('/onboarding')} className="btn-primary group">
          {t('landing.planCrop')}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
        </button>
      </motion.div>
    </SectionWrap>
  );
};

export default HowItWorks;
