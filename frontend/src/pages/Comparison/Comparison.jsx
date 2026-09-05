import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  TrendingUp,
  Shield,
  AlertTriangle,
  Check,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const RISK_CONFIG = {
  low: {
    label: 'low',
    pill: 'bg-forest-50 text-forest-700 border-forest-200',
    bar: 'from-forest-400 to-forest-600',
    dot: 'bg-forest-500',
    multiplier: 1,
  },
  medium: {
    label: 'medium',
    pill: 'bg-warn-50 text-warn-500 border-warn-200',
    bar: 'from-amber-400 to-amber-500',
    dot: 'bg-warn-500',
    multiplier: 0.8,
  },
  high: {
    label: 'high',
    pill: 'bg-danger-50 text-danger-600 border-danger-200',
    bar: 'from-red-400 to-danger-500',
    dot: 'bg-danger-500',
    multiplier: 0.5,
  },
};

const formatCurrency = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;

const getRiskLevel = (crop) => {
  const level = (crop?.saturation_risk || '').toLowerCase();
  return RISK_CONFIG[level] || RISK_CONFIG.low;
};

const computeRiskAdjustedProfit = (profit, riskLevel) => profit * riskLevel.multiplier;

const RiskBar = ({ value, max, tone, t }) => {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between text-[12px] mb-1.5">
        <span className="font-medium text-charcoal-400">{t('compare.riskAdjusted')}</span>
        <span className="font-bold text-charcoal-800 tabular-nums">{formatCurrency(value)}</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-cream-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
          className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
        />
      </div>
    </div>
  );
};

const Comparison = () => {
  const navigate = useNavigate();
  const { selectedCrops, chosenCrop, setChosenCrop } = useFarmerState();
  const { t, cropName, reasonForCrop } = useLanguage();

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/crop-recommendation" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={4} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="mb-10">
            <div className="label-eyebrow mb-2">{t('compare.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl mb-3">
              {t('compare.title')}
            </h1>
            <p className="text-[15px] leading-[1.6] text-charcoal-500 text-pretty max-w-2xl">
              {t('compare.subtitle')}
            </p>
          </div>

          {!selectedCrops || selectedCrops.length === 0 ? (
            <Card className="p-8 max-w-md w-full text-center mx-auto">
              <div className="h-12 w-12 rounded-2xl bg-cream-100 border border-charcoal-100 flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-5 w-5 text-charcoal-500" strokeWidth={2} />
              </div>
              <h2 className="text-[22px] font-bold text-charcoal-800 mb-2">{t('compare.noneTitle')}</h2>
              <p className="text-[14px] leading-[1.6] text-charcoal-500 mb-6">
                {t('compare.noneMsg')}
              </p>
              <Button onClick={() => navigate('/crop-recommendation')} className="w-full">
                {t('compare.noneBtn')}
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Button>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              <ComparisonGrid
                key={selectedCrops.map((c) => c.crop).join('|')}
                crops={selectedCrops.slice(0, 2)}
                chosenCrop={chosenCrop}
                t={t}
                cropName={cropName}
                reasonForCrop={reasonForCrop}
                onChoose={(crop) => {
                  setChosenCrop(crop);
                  navigate('/crop-planning');
                }}
              />
            </AnimatePresence>
          )}
        </motion.div>
      </main>
    </div>
  );
};

const ComparisonGrid = ({ crops, chosenCrop, onChoose, t, cropName, reasonForCrop }) => {
  const riskAdjusted = crops
    .map((crop, idx) => {
      const config = getRiskLevel(crop);
      const profit = crop.expected_profit_per_acre || 0;
      return {
        crop,
        index: idx,
        config,
        profit,
        adjusted: computeRiskAdjustedProfit(profit, config),
      };
    })
    .sort((a, b) => b.adjusted - a.adjusted);

  const winner = riskAdjusted[0];
  const max = Math.max(...riskAdjusted.map((r) => r.adjusted), 1);

  const isWinner = (entry) => entry.crop.crop === winner.crop.crop;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-8">
        {riskAdjusted.map((entry, i) => (
          <MotionCard key={entry.crop.crop} delay={i * 0.08}>
            <CropCompareCard
              entry={entry}
              max={max}
              winner={isWinner(entry)}
              chosen={chosenCrop?.crop === entry.crop.crop}
              t={t}
              cropName={cropName}
              reasonForCrop={reasonForCrop}
              onChoose={() => onChoose(entry.crop)}
            />
          </MotionCard>
        ))}
      </div>

      <WinnerBanner winner={winner} t={t} cropName={cropName} />
    </motion.div>
  );
};

const MotionCard = ({ children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, ease: easeOut, delay }}
  >
    {children}
  </motion.div>
);

const CropCompareCard = ({ entry, max, winner, chosen, onChoose, t, cropName, reasonForCrop }) => {
  const { crop, config, profit, adjusted } = entry;
  return (
    <Card
      hover
      className={`relative overflow-hidden h-full flex flex-col ${
        winner ? 'ring-2 ring-forest-400/60' : ''
      }`}
    >
      {winner && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-forest-600 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
          <TrendingUp className="h-3 w-3" strokeWidth={2.6} />
          {t('compare.winner')}
        </div>
      )}
      {chosen && (
        <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-charcoal-800 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
          <Check className="h-3 w-3" strokeWidth={2.6} />
          {t('compare.chosen')}
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[26px] font-bold text-charcoal-800 tracking-tighter2 leading-tight">
              {cropName(crop.crop)}
            </h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-400">
              {t('compare.expectedProfit')}
            </p>
            <p className="text-[30px] font-bold text-charcoal-800 tracking-tighter2 leading-none mt-1">
              {formatCurrency(profit)}
              <span className="ml-1 text-[13px] font-normal text-charcoal-400">{t('compare.perAcre')}</span>
            </p>
          </div>
          <span className="h-11 w-11 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center">
            <Sprout className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </div>

        <StatRow icon={Shield} label={t('compare.riskLevel')}>
          <span className={`pill ${config.pill} border`}>
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {t(`risk.${config.label}`).toUpperCase()}
          </span>
        </StatRow>

        <div className="mt-3">
          <p className="text-[14px] leading-[1.6] text-charcoal-500 text-pretty">
            {crop.reason || reasonForCrop(crop.crop) || t('compare.fallbackReason')}
          </p>
        </div>

        <RiskBar value={adjusted} max={max} tone={config.bar} t={t} />

        <div className="mt-auto pt-6">
          <Button onClick={onChoose} variant={winner ? 'primary' : 'secondary'} className="w-full">
            <Check className="h-4 w-4" strokeWidth={2.4} />
            {t('compare.choose')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const StatRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-center justify-between">
    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-charcoal-500">
      <Icon className="h-4 w-4 text-charcoal-400" strokeWidth={2.2} />
      {label}
    </span>
    {children}
  </div>
);

const WinnerBanner = ({ winner, t, cropName }) => {
  const { crop, config, adjusted } = winner;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.45 }}
      className="rounded-3xl bg-gradient-to-br from-forest-600 to-forest-800 text-white shadow-elev p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <Trophy className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              {t('compare.riskWinner')}
            </p>
            <h3 className="text-[20px] sm:text-[24px] font-bold tracking-tighter2 leading-tight">
              {cropName(crop.crop)}
            </h3>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            {t('compare.bestValue')}
          </p>
          <p className="text-[28px] font-bold tracking-tighter2 leading-none">
            {formatCurrency(adjusted)}
            <span className="ml-1 text-[13px] font-normal text-white/70">{t('compare.perAcre')}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-[13px] text-white/80">
        <Shield className="h-4 w-4 text-white/70" strokeWidth={2.2} />
        {t('compare.riskProfile', { label: t(`risk.${config.label}`) })}
        <span className="text-white/30">·</span>
        <AlertTriangle className="h-4 w-4 text-white/70" strokeWidth={2.2} />
        {t('compare.balanceText')}
      </div>
    </motion.div>
  );
};

export default Comparison;
