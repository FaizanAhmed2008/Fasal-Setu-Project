import React, { useState, useEffect } from 'react';
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
  BarChart2,
  Target,
  Minus,
  Plus,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  MapPin,
  Zap,
  RefreshCw,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { getOutcomeComparison } from '../../data/demoData';

const easeOut = [0.22, 1, 0.36, 1];

// Error Boundary for catching render errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Comparison Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream-50 text-charcoal-800 flex items-center justify-center p-4">
          <Card className="p-8 max-w-md w-full text-center">
            <div className="h-12 w-12 rounded-2xl bg-danger-50 border border-danger-200 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-danger-600" strokeWidth={2} />
            </div>
            <h2 className="text-[22px] font-bold text-charcoal-800 mb-2">Something went wrong</h2>
            <p className="text-[14px] leading-[1.6] text-charcoal-500 mb-6">
              An error occurred while loading the comparison. Please try again.
            </p>
            <pre className="text-left text-[11px] bg-charcoal-100 p-4 rounded-xl overflow-auto mb-4 max-h-40 text-danger-600">
              {this.state.error?.message}
            </pre>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => window.location.reload()} className="flex-1">
                <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
                Reload Page
              </Button>
              <Button variant="secondary" onClick={() => window.history.back()} className="flex-1">
                Go Back
              </Button>
            </div>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }
}

const RISK_CONFIG = {
  low: {
    label: 'low',
    pill: 'bg-forest-50 text-forest-700 border-forest-200',
    bar: 'from-forest-400 to-forest-600',
    dot: 'bg-forest-500',
    multiplier: 1,
    icon: Shield,
    color: 'text-forest-600',
    bg: 'bg-forest-50',
  },
  medium: {
    label: 'medium',
    pill: 'bg-warn-50 text-warn-500 border-warn-200',
    bar: 'from-amber-400 to-amber-500',
    dot: 'bg-warn-500',
    multiplier: 0.8,
    icon: AlertTriangle,
    color: 'text-warn-600',
    bg: 'bg-warn-50',
  },
  high: {
    label: 'high',
    pill: 'bg-danger-50 text-danger-600 border-danger-200',
    bar: 'from-red-400 to-danger-500',
    dot: 'bg-danger-500',
    multiplier: 0.5,
    icon: AlertTriangle,
    color: 'text-danger-600',
    bg: 'bg-danger-50',
  },
};

const formatCurrency = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;
const formatNumber = (value) => Math.round(value).toLocaleString('en-IN');

const getRiskConfig = (riskLabel) => RISK_CONFIG[riskLabel] || RISK_CONFIG.low;

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
  const { t, language } = useLanguage();
  
  // Debug logging
  useEffect(() => {
    console.log('Comparison: selectedCrops:', selectedCrops);
    console.log('Comparison: chosenCrop:', chosenCrop);
  }, [selectedCrops, chosenCrop]);

  // Guard against undefined selectedCrops
  const crops = selectedCrops || [];

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

          {!crops || crops.length === 0 ? (
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
                key={crops.map((c) => c.crop).join('|')}
                crops={crops.slice(0, 2)}
                chosenCrop={chosenCrop}
                t={t}
                language={language}
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

const ComparisonGrid = ({ crops, chosenCrop, onChoose, t, language }) => {
  // Use getOutcomeComparison for detailed Fasal Setu vs Without data
  const comparisonData = (crops || []).map((crop) => {
    if (!crop || !crop.crop) {
      console.warn('ComparisonGrid: Invalid crop object:', crop);
      return null;
    }
    try {
      const outcome = getOutcomeComparison(crop.crop, 1); // per acre
      return {
        ...crop,
        outcome,
      };
    } catch (err) {
      console.error('ComparisonGrid: Error getting outcome for', crop.crop, err);
      return null;
    }
  }).filter(Boolean);

  if (comparisonData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-500">No valid crops to compare</p>
      </div>
    );
  }

  const riskAdjusted = comparisonData
    .map((crop, idx) => {
      if (!crop.outcome) return null;
      const config = getRiskConfig(crop.outcome.withRisk);
      const profit = crop.outcome.profitWith;
      return {
        crop,
        index: idx,
        config,
        profit,
        adjusted: computeRiskAdjustedProfit(profit, config),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.adjusted - a.adjusted);

  if (riskAdjusted.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-500">Unable to calculate comparison</p>
      </div>
    );
  }

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
              language={language}
              onChoose={() => onChoose(entry.crop)}
            />
          </MotionCard>
        ))}
      </div>

      <WinnerBanner winner={winner} t={t} language={language} />
      
      {/* Fasal Setu Advantage Explanation */}
      <FasalSetuAdvantage crops={riskAdjusted} t={t} language={language} />
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

const StatRow = ({ icon: Icon, label, children, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-charcoal-500">
      <Icon className="h-4 w-4 text-charcoal-400" strokeWidth={2.2} />
      {label}
    </span>
    {children}
  </div>
);

const CropCompareCard = ({ entry, max, winner, chosen, onChoose, t, language }) => {
  const { crop, config, profit, adjusted, outcome } = entry;
  const { withoutRisk, withRisk, withoutRiskPct, withRiskPct, profitWithout, profitWith, potentialLoss, nearestMandi, withPrice, withoutPrice, revenueWith, revenueWithout, expenses, quantityQuintals } = outcome;
  
  const withoutConfig = getRiskConfig(withoutRisk);
  
  return (
    <Card
      hover
      className={`relative overflow-hidden h-full flex flex-col ${winner ? 'ring-2 ring-forest-400/60' : ''}`}
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
        {/* Crop Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[26px] font-bold text-charcoal-800 tracking-tighter2 leading-tight">
              {crop.crop}
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

        {/* Fasal Setu vs Without Comparison Table */}
        <div className="mb-5 rounded-xl border border-charcoal-100 bg-cream-50/50 overflow-hidden">
          <div className="grid grid-cols-3 border-b border-charcoal-100">
            <div className="px-3 py-2.5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">{t('compare.scenario')}</p>
            </div>
            <div className="px-3 py-2.5 text-center border-l border-charcoal-100 bg-forest-50/30">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-forest-700 flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" /> {t('compare.withFasalSetu')}
              </p>
            </div>
            <div className="px-3 py-2.5 text-center border-l border-charcoal-100 bg-danger-50/30">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-danger-600 flex items-center justify-center gap-1">
                <Minus className="h-3 w-3" /> {t('compare.withoutFasalSetu')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 divide-y divide-charcoal-100">
            {/* Mandi Price */}
            <div className="grid grid-cols-3 px-3 py-2">
              <div className="text-center text-[12px] font-medium text-charcoal-500">{t('compare.mandiPrice')}</div>
              <div className="text-center border-l border-charcoal-100 text-[14px] font-bold text-forest-700">{formatCurrency(withPrice)}/qtl</div>
              <div className="text-center border-l border-charcoal-100 text-[14px] font-bold text-danger-600">{formatCurrency(withoutPrice)}/qtl</div>
            </div>
            
            {/* Revenue */}
            <div className="grid grid-cols-3 px-3 py-2 bg-cream-50/50">
              <div className="text-center text-[12px] font-medium text-charcoal-500">{t('compare.revenue')}</div>
              <div className="text-center border-l border-charcoal-100 text-[14px] font-bold text-forest-700">{formatCurrency(revenueWith)}</div>
              <div className="text-center border-l border-charcoal-100 text-[14px] font-bold text-danger-600">{formatCurrency(revenueWithout)}</div>
            </div>
            
            {/* Expenses */}
            <div className="grid grid-cols-3 px-3 py-2">
              <div className="text-center text-[12px] font-medium text-charcoal-500">{t('compare.expenses')}</div>
              <div className="text-center border-l border-charcoal-100 text-[14px] font-bold text-charcoal-600">{formatCurrency(expenses)}</div>
              <div className="text-center border-l border-charcoal-100 text-[14px] font-bold text-charcoal-600">{formatCurrency(expenses)}</div>
            </div>
            
            {/* Net Profit */}
            <div className="grid grid-cols-3 px-3 py-2.5 bg-forest-50/30">
              <div className="text-center text-[12px] font-semibold text-charcoal-700">{t('compare.netProfit')}</div>
              <div className="text-center border-l border-charcoal-100 text-[16px] font-bold text-forest-700">{formatCurrency(profitWith)}</div>
              <div className="text-center border-l border-charcoal-100 text-[16px] font-bold text-danger-600">{formatCurrency(profitWithout)}</div>
            </div>
            
            {/* Risk Level */}
            <div className="grid grid-cols-3 px-3 py-2.5 bg-warn-50/30">
              <div className="text-center text-[12px] font-semibold text-charcoal-700">{t('compare.riskLevel')}</div>
              <div className="text-center border-l border-charcoal-100">
                <span className={`inline-flex items-center justify-center gap-1.5 pill ${config.pill} border text-[11px]`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                  {t(`risk.${config.label}`).toUpperCase()}
                </span>
              </div>
              <div className="text-center border-l border-charcoal-100">
                <span className={`inline-flex items-center justify-center gap-1.5 pill ${withoutConfig.pill} border text-[11px]`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${withoutConfig.dot}`} />
                  {t(`risk.${withoutConfig.label}`).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-charcoal-100 bg-white p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-charcoal-400 mb-1">
              <MapPin className="h-3.5 w-3.5" />
              {t('compare.nearestMandi')}
            </div>
            <div className="text-[14px] font-bold text-charcoal-800 truncate">{nearestMandi}</div>
          </div>
          <div className="rounded-xl border border-charcoal-100 bg-white p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-charcoal-400 mb-1">
              <Target className="h-3.5 w-3.5" />
              {t('compare.potentialLoss')}
            </div>
            <div className="text-[14px] font-bold text-danger-600">{formatCurrency(potentialLoss)} {t('compare.perAcre')}</div>
          </div>
        </div>

        {/* Risk Adjusted Bar */}
        <RiskBar value={adjusted} max={max} tone={config} t={t} />

        {/* Reason */}
        <div className="mt-3">
          <p className="text-[14px] leading-[1.6] text-charcoal-500 text-pretty">
            {crop.reason || 'Based on current market and climate signals.'}
          </p>
        </div>

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

const WinnerBanner = ({ winner, t, language }) => {
  const { crop, config, adjusted, outcome } = winner;
  const { profitWith, profitWithout, potentialLoss, withRiskPct, withoutRiskPct } = outcome;
  const profitDiff = profitWith - profitWithout;
  const riskReduction = withoutRiskPct - withRiskPct;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.45 }}
      className="rounded-3xl bg-gradient-to-br from-forest-600 to-forest-800 text-white shadow-elev p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <span className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <Trophy className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
              {t('compare.riskWinner')}
            </p>
            <h3 className="text-[20px] sm:text-[24px] font-bold tracking-tighter2 leading-tight">
              {crop.crop}
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
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-1">{t('compare.profitAdvantage')}</p>
          <p className="text-[20px] font-bold flex items-center gap-1">
            <ArrowUpRight className="h-4 w-4" />
            {formatCurrency(profitDiff)} {t('compare.perAcre')}
          </p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-1">{t('compare.riskReduction')}</p>
          <p className="text-[20px] font-bold flex items-center gap-1">
            <ArrowDownRight className="h-4 w-4" />
            {riskReduction}% {t('compare.lower')}
          </p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-1">{t('compare.potentialLoss')}</p>
          <p className="text-[20px] font-bold flex items-center gap-1">
            <Wallet className="h-4 w-4" />
            {formatCurrency(potentialLoss)} {t('compare.perAcre')}
          </p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mb-1">{t('compare.confidence')}</p>
          <p className="text-[20px] font-bold">86%</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-[13px] text-white/80">
        <Shield className="h-4 w-4 text-white/70" strokeWidth={2.2} />
        {t('compare.riskProfile', { label: t(`risk.${config.label}`) })}
        <span className="text-white/30">·</span>
        <Info className="h-4 w-4 text-white/70" strokeWidth={2.2} />
        {t('compare.fasalSetuAdvantage')}
      </div>
    </motion.div>
  );
};

const FasalSetuAdvantage = ({ crops, t, language }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.6 }}
      className="mt-8"
    >
      <Card className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-charcoal-800">{t('compare.howFasalSetuWorks')}</h3>
            <p className="text-[14px] text-charcoal-500 mt-0.5">{t('compare.howFasalSetuWorksDesc')}</p>
          </div>
        </div>
        
        {/* Key Benefits */}
        <div className="grid sm:grid-cols-3 gap-4">
          <BenefitCard
            icon={Shield}
            title={t('compare.benefitLowerRisk')}
            desc={t('compare.benefitLowerRiskDesc')}
            color="forst"
          />
          <BenefitCard
            icon={TrendingUp}
            title={t('compare.benefitHigherProfit')}
            desc={t('compare.benefitHigherProfitDesc')}
            color="forst"
          />
          <BenefitCard
            icon={Target}
            title={t('compare.benefitSmartDecisions')}
            desc={t('compare.benefitSmartDecisionsDesc')}
            color="forst"
          />
        </div>
      </Card>
    </motion.div>
  );
};

const BenefitCard = ({ icon: Icon, title, desc, color }) => (
  <div className="rounded-xl border border-charcoal-100 bg-white p-4">
    <div className="h-8 w-8 rounded-lg bg-forest-100 text-forest-700 flex items-center justify-center mb-3">
      <Icon className="h-4 w-4" strokeWidth={2.2} />
    </div>
    <h4 className="text-[14px] font-semibold text-charcoal-800 mb-1">{title}</h4>
    <p className="text-[12px] leading-[1.5] text-charcoal-500">{desc}</p>
  </div>
);

const ComparisonWithErrorBoundary = () => (
  <ErrorBoundary>
    <Comparison />
  </ErrorBoundary>
);

export default ComparisonWithErrorBoundary;
