import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { TrendingUp, ArrowRight, Sparkles, Info, AlertTriangle } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const AnimatedNum = ({ to = 78, duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration, ease: easeOut });
    const unsub = rounded.on('change', setDisplay);
    return () => { c.stop(); unsub(); };
  }, [inView, to, duration, mv, rounded]);
  return <span ref={ref}>{display}</span>;
};

const RiskGauge = ({ value, label, level, color, ringColor, bg, accentText }) => {
  const { t } = useLanguage();
  const C = 2 * Math.PI * 70;
  const dash = C - (value / 100) * C;
  return (
    <div className="relative h-[180px] w-[180px] sm:h-[200px] sm:w-[200px]">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r="70" stroke={bg} strokeWidth="12" fill="none" />
        <motion.circle
          cx="90" cy="90" r="70"
          stroke={ringColor}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: dash }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.8, ease: easeOut }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-charcoal-400">{t('landing.riskWord')}</div>
        <div className={`mt-1 text-[44px] sm:text-[52px] font-bold tracking-tighter2 leading-none ${accentText}`}>
          <AnimatedNum to={value} />
        </div>
        <div className="mt-1.5 text-[11px] font-semibold tracking-wider text-charcoal-400">/ 100</div>
      </div>
    </div>
  );
};

const RiskCard = ({
  emoji, crop, value, levelKey, color, ringColor, bg, accentText, badgeBg, badgeText, dot,
  explainerKey, signal,
  index,
}) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: easeOut, delay: index * 0.1 }}
      className="card-soft p-6 sm:p-8 bg-white"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-cream-100 border border-charcoal-100 flex items-center justify-center text-[22px]">
            {emoji}
          </div>
          <div>
            <div className="label-eyebrow">{t('landing.crop')}</div>
            <div className="text-[20px] font-bold text-charcoal-800 tracking-tighter2 leading-tight">{t(`crop.${crop}`)}</div>
          </div>
        </div>
        <span className={`pill ${badgeBg} ${badgeText}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {t(levelKey).toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <RiskGauge
          value={value}
          color={color}
          ringColor={ringColor}
          bg={bg}
          accentText={accentText}
        />
        <div className="flex-1">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-charcoal-400">{t('landing.saturationRisk')}</div>
          <div className="mt-1 text-[18px] font-semibold text-charcoal-800 tracking-tightish leading-snug">
            {t(explainerKey)}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[12.5px] font-medium text-charcoal-500">
            {signal.icon && <signal.icon className={`h-3.5 w-3.5 ${signal.iconColor || 'text-charcoal-400'}`} strokeWidth={2.4} />}
            {t(signal.textKey)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SaturationIntelligence = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap className="py-20 sm:py-28 bg-cream-50">
      <SectionHeading
        align="center"
        eyebrow={t('landing.satEyebrow')}
        title={
          <>
            {t('landing.satTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.satTitle2')}</span>
          </>
        }
        lead={t('landing.satLead')}
      />

      <div className="mt-14 sm:mt-16 grid lg:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
        <RiskCard
          index={0}
          emoji="🍅"
          crop="Tomato"
          value={78}
          levelKey="risk.high"
          color="#D96666"
          ringColor="#D96666"
          bg="#FBDADA"
          accentText="text-danger-600"
          badgeBg="bg-danger-50"
          badgeText="text-danger-600"
          dot="bg-danger-500"
          explainerKey="landing.satTomatoExplain"
          signal={{ icon: TrendingUp, textKey: 'landing.priceSignal', iconColor: 'text-amber-muted' }}
        />
        <RiskCard
          index={1}
          emoji="🧅"
          crop="Onion"
          value={24}
          levelKey="risk.low"
          color="#3F7E4A"
          ringColor="#3F7E4A"
          bg="#D1FAE5"
          accentText="text-forest-600"
          badgeBg="bg-forest-50"
          badgeText="text-forest-700"
          dot="bg-forest-500"
          explainerKey="landing.satOnionExplain"
          signal={{ icon: Sparkles, textKey: 'landing.betterOpportunity', iconColor: 'text-forest-500' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
        className="mt-10 sm:mt-12 max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-charcoal-100 bg-white px-4 py-2 text-[12.5px] text-charcoal-500 shadow-softer">
          <Info className="h-3.5 w-3.5 text-charcoal-400" strokeWidth={2.3} />
          {t('landing.satFooter')}
        </div>
      </motion.div>
    </SectionWrap>
  );
};

export default SaturationIntelligence;
