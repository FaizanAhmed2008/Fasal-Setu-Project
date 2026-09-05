import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Sprout, MapPin, Sun, Cloud, Bug } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FieldScene, TinyLeaf, TinySeed } from './illustrations/FieldScene';

const easeOut = [0.22, 1, 0.36, 1];

const AnimatedNumber = ({ to = 78, duration = 1.6, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, duration, mv, rounded]);

  return <span ref={ref} className={className}>{display}</span>;
};

const SaturationRing = ({ value = 78 }) => {
  const C = 2 * Math.PI * 36;
  return (
    <div className="relative h-[88px] w-[88px]">
      <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90">
        <circle cx="44" cy="44" r="36" stroke="#FBDADA" strokeWidth="6" fill="none" />
        <motion.circle
          cx="44" cy="44" r="36"
          stroke="#D96666"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C - (value / 100) * C }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: easeOut }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-bold text-charcoal-800 leading-none">
          <AnimatedNumber to={value} />
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-charcoal-400 mt-0.5">/100</span>
      </div>
    </div>
  );
};

const SaturationRingLow = ({ value = 24 }) => {
  const C = 2 * Math.PI * 36;
  return (
    <div className="relative h-[88px] w-[88px]">
      <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90">
        <circle cx="44" cy="44" r="36" stroke="#D1FAE5" strokeWidth="6" fill="none" />
        <motion.circle
          cx="44" cy="44" r="36"
          stroke="#3F7E4A"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C - (value / 100) * C }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: easeOut, delay: 0.1 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-bold text-charcoal-800 leading-none">
          <AnimatedNumber to={value} />
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-charcoal-400 mt-0.5">/100</span>
      </div>
    </div>
  );
};

const HeroVisual = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full max-w-[560px] aspect-[5/6] sm:aspect-[6/6] mx-auto">
      {/* Soft field panel backdrop */}
      <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-cream-100 via-cream-50 to-forest-50/60 ring-soft" />
      <div className="absolute inset-0 rounded-[36px] grain-bg opacity-60 mix-blend-multiply" />

      {/* Faint contour lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18] pointer-events-none" viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 180 Q150 140 300 180 T600 200" fill="none" stroke="#3F7E4A" strokeWidth="1" />
        <path d="M0 240 Q150 200 300 240 T600 260" fill="none" stroke="#3F7E4A" strokeWidth="1" />
        <path d="M0 320 Q150 280 300 320 T600 340" fill="none" stroke="#3F7E4A" strokeWidth="1" />
        <path d="M0 420 Q150 380 300 420 T600 440" fill="none" stroke="#3F7E4A" strokeWidth="1" />
      </svg>

      {/* Decorative 3D-ish leaf and seed (subtle) */}
      <motion.div
        aria-hidden
        className="absolute -top-3 -left-3 sm:top-4 sm:left-4 h-14 w-14 sm:h-16 sm:w-16 drop-shadow-[0_8px_20px_rgba(63,126,74,0.25)]"
        animate={{ y: [0, -5, 0], rotate: [-6, 4, -6] }}
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
      >
        <TinyLeaf className="h-full w-full" />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute -bottom-2 -right-2 sm:bottom-6 sm:right-2 h-10 w-10 sm:h-12 sm:w-12 drop-shadow-[0_6px_14px_rgba(155,122,63,0.3)]"
        animate={{ y: [0, 4, 0], rotate: [8, -6, 8] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
      >
        <TinySeed className="h-full w-full" />
      </motion.div>

      {/* Field composition (background, lower portion) */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-[36px] overflow-hidden">
        <div className="absolute inset-0">
          <FieldScene />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cream-50/60 to-transparent" />
      </div>

      {/* Floating card: Tomato (Saturation Risk HIGH) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
        className="absolute top-[8%] right-[-2%] sm:right-2 w-[230px] sm:w-[250px]"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          className="card-soft p-4 backdrop-blur-sm bg-white/95"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-danger-50 flex items-center justify-center text-[18px]">
                🍅
              </div>
<div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal-400">{t('landing.crop')}</div>
                  <div className="text-[14px] font-bold text-charcoal-800 leading-tight">Tomato</div>
                </div>
              </div>
              <span className="pill bg-danger-50 text-danger-600">
                <span className="h-1.5 w-1.5 rounded-full bg-danger-500" />
                {t('risk.high').toUpperCase()}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="label-eyebrow mb-1.5">{t('landing.saturationRisk')}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-bold text-charcoal-800 leading-none tracking-tighter2">
                    <AnimatedNumber to={78} />
                  </span>
                  <span className="text-[12px] font-semibold text-charcoal-400">/ 100</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11.5px] font-medium text-amber-muted">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                  {t('landing.priceSignal')}
                </div>
            </div>
            <SaturationRing value={78} />
          </div>
        </motion.div>
      </motion.div>

      {/* Connector line */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 600 700" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M 380 220 C 380 320, 260 360, 200 440"
          fill="none"
          stroke="#3F7E4A"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.4, ease: easeOut, delay: 1.1 }}
        />
      </svg>

      {/* Floating card: Smarter alternative (Onion) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.7 }}
        className="absolute bottom-[10%] left-[-2%] sm:left-2 w-[235px] sm:w-[260px]"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
          className="card-soft p-4 bg-white/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-forest-50 flex items-center justify-center text-[18px]">
                🧅
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-forest-600">{t('landing.smarterAlternative')}</div>
                <div className="text-[14px] font-bold text-charcoal-800 leading-tight">Onion</div>
              </div>
            </div>
            <span className="pill bg-forest-50 text-forest-700">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
              {t('risk.low').toUpperCase()}
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="label-eyebrow mb-1.5">{t('landing.saturationRisk')}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] font-bold text-charcoal-800 leading-none tracking-tighter2">
                  <AnimatedNumber to={24} />
                </span>
                <span className="text-[12px] font-semibold text-charcoal-400">/ 100</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11.5px] font-medium text-forest-600">
                <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                {t('landing.betterOpportunity')}
              </div>
            </div>
            <SaturationRingLow value={24} />
          </div>
        </motion.div>
      </motion.div>

      {/* Tiny meta strip top-left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        className="absolute top-5 left-5 sm:top-7 sm:left-7 flex items-center gap-2"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur border border-charcoal-100 px-2.5 py-1 text-[10.5px] font-semibold text-charcoal-600 shadow-softer">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-500 animate-pulse" />
          {t('landing.liveSignal')}
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const handlePlan = () => navigate('/onboarding');

  return (
    <section id="top" className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Warm cream backdrop with subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-cream-50" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 contour-bg" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 grain-bg opacity-40" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
            className="relative"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
              className="mb-6"
            >
              <span className="eyebrow">
                <Sprout className="h-3.5 w-3.5" strokeWidth={2.2} />
                {t('landing.heroEyebrow')}
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
              className="h-display text-[40px] sm:text-[52px] lg:text-[60px] text-balance"
            >
              <span className="block">{t('landing.heroL1')}</span>
              <span className="block">{t('landing.heroL2')}</span>
              <span className="block text-forest-600">{t('landing.heroL3')}</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
              className="mt-6 max-w-[520px] text-[16.5px] sm:text-[17px] leading-[1.65] text-charcoal-500 text-pretty"
            >
              {t('landing.heroSub')}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button onClick={handlePlan} className="btn-primary group">
                {t('landing.planCrop')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
              </button>
              <a href="#how-it-works" className="btn-ghost">
                {t('landing.seeHow')}
              </a>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
              className="mt-7 flex items-center gap-2 text-[12.5px] text-charcoal-400"
            >
              <span className="h-1 w-6 rounded-full bg-forest-300" />
              <span>{t('landing.heroFooter')}</span>
            </motion.div>

            {/* Tiny trust strip */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] text-charcoal-500"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.2} />
                {t('landing.districtIntel')}
              </div>
              <div className="flex items-center gap-1.5">
                <Sun className="h-3.5 w-3.5 text-amber-muted" strokeWidth={2.2} />
                {t('landing.weatherAware')}
              </div>
              <div className="flex items-center gap-1.5">
                <Cloud className="h-3.5 w-3.5 text-info-500" strokeWidth={2.2} />
                {t('landing.mandiNetwork')}
              </div>
              <div className="flex items-center gap-1.5">
                <Bug className="h-3.5 w-3.5 text-warn-500" strokeWidth={2.2} />
                {t('landing.pestSignals')}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
