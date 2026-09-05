import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, TrendingUp, Users, LineChart, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const TRAD = [
  { labelKey: 'landing.tradSeePrice', muted: true },
  { labelKey: 'landing.tradPlantSame', muted: true },
  { labelKey: 'landing.tradHopeTrend', muted: true },
  { labelKey: 'landing.tradCrashAfter', danger: true },
];

const FS = [
  { icon: LineChart, labelKey: 'landing.fsDetectSignal', muted: true },
  { icon: Users, labelKey: 'landing.fsReadBehaviour', muted: true },
  { icon: TrendingUp, labelKey: 'landing.fsEstimateArea', muted: true },
  { icon: ShieldCheck, labelKey: 'landing.fsCalcSaturation', muted: true },
  { icon: Sparkles, labelKey: 'landing.fsSmartAlternative', accent: true },
];

const Step = ({ icon: Icon, labelKey, muted, danger, accent, index = 0 }) => {
  const { t } = useLanguage();
  return (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.55, ease: easeOut, delay: index * 0.06 }}
    className={[
      'flex items-center gap-3 rounded-xl px-3.5 py-3 border',
      danger
        ? 'border-danger-100 bg-danger-50/60'
        : accent
        ? 'border-forest-200 bg-forest-50/80'
        : 'border-charcoal-100 bg-white',
    ].join(' ')}
  >
    <span
      className={[
        'h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0',
        danger
          ? 'bg-danger-100 text-danger-600'
          : accent
          ? 'bg-forest-600 text-white'
          : 'bg-charcoal-100 text-charcoal-500',
      ].join(' ')}
    >
      {danger ? (
        <X className="h-3.5 w-3.5" strokeWidth={2.6} />
      ) : Icon ? (
        <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
    </span>
    <span
      className={[
        'text-[14.5px] font-medium',
        danger ? 'text-danger-600' : accent ? 'text-forest-700 font-semibold' : 'text-charcoal-600',
      ].join(' ')}
    >
      {t(labelKey)}
    </span>
  </motion.div>
  );
};

const IntelligenceSection = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap id="intelligence" className="py-20 sm:py-28 bg-white">
      <SectionHeading
        align="center"
        eyebrow={t('landing.diffEyebrow')}
        title={
          <>
            {t('landing.diffTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.diffTitle2')}</span>
          </>
        }
        lead={t('landing.diffLead')}
      />

      <div className="mt-14 sm:mt-16 grid lg:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
        {/* Traditional */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="relative rounded-3xl border border-charcoal-100 bg-cream-50/60 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="label-eyebrow">{t('landing.tradAdvisory')}</div>
              <div className="mt-1 text-[18px] font-semibold text-charcoal-800 tracking-tightish">{t('landing.tradReactive')}</div>
            </div>
            <span className="pill bg-charcoal-100 text-charcoal-500">{t('landing.tradReactsAfter')}</span>
          </div>

          <div className="space-y-2.5">
            {TRAD.map((i, idx) => (
              <Step key={idx} index={idx} labelKey={i.labelKey} danger={i.danger} muted={i.muted} />
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-charcoal-100/80 text-[12.5px] text-charcoal-400">
            {t('landing.tradFooter')}
          </div>
        </motion.div>

        {/* FasalSetu */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          className="relative rounded-3xl border border-forest-200 bg-gradient-to-br from-forest-50/60 to-cream-50 p-6 sm:p-8 shadow-soft"
        >
          <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-charcoal-800 text-white px-3 py-1 text-[10.5px] font-semibold tracking-wider uppercase shadow-soft">
            <Sparkles className="h-3 w-3" strokeWidth={2.4} />
            FasalSetu
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="label-eyebrow text-forest-600">{t('landing.fsApproach')}</div>
              <div className="mt-1 text-[18px] font-semibold text-charcoal-800 tracking-tightish">{t('landing.fsPredictive')}</div>
            </div>
            <span className="pill bg-forest-100 text-forest-700">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
              {t('landing.fsBeforePlanting')}
            </span>
          </div>

          <div className="space-y-2.5">
            {FS.map((i, idx) => (
              <Step key={idx} index={idx} icon={i.icon} labelKey={i.labelKey} accent={i.accent} muted={i.muted} />
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-forest-200/60 text-[12.5px] text-forest-700">
            {t('landing.fsFooter')}
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  );
};

export default IntelligenceSection;
