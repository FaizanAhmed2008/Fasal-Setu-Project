import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  TrendingUp,
  Award,
  ArrowRight,
  RotateCcw,
  Users,
  BarChart3,
  ArrowUpRight,
  MapPin,
  Calendar,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_CROPS, getOutcomeComparison } from '../../data/demoData';

const easeOut = [0.22, 1, 0.36, 1];

const formatCurrency = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;

const RISK_COLORS = {
  low: { pill: 'bg-forest-50 text-forest-700 border-forest-200', dot: 'bg-forest-500' },
  medium: { pill: 'bg-warn-50 text-warn-500 border-warn-200', dot: 'bg-warn-500' },
  high: { pill: 'bg-danger-50 text-danger-600 border-danger-200', dot: 'bg-danger-500' },
};

const getRiskConfig = (level) => RISK_COLORS[(level || '').toLowerCase()] || RISK_COLORS.low;

const CustomTooltip = ({ active, payload, t, cropName }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white rounded-xl border border-charcoal-100 shadow-elev px-4 py-3">
      <p className="text-[12px] font-semibold uppercase tracking-wider text-charcoal-400 mb-1">
        {data.name}
      </p>
      {data.crop && (
        <p className="text-[13px] text-charcoal-600 mb-1">{cropName(data.crop)}</p>
      )}
      <p className="text-[17px] font-bold text-charcoal-800 tabular-nums">
        {formatCurrency(data.profit)}
        <span className="ml-1 text-[12px] font-normal text-charcoal-400">{t('compare.perAcre')}</span>
      </p>
    </div>
  );
};

const Summary = () => {
  const navigate = useNavigate();
  const { chosenCrop, recommendations, farmer, farm, market, harvest, resetAll } = useFarmerState();
  const { t, cropName } = useLanguage();

  const crop = chosenCrop?.crop || '';
  const cropData = DEMO_CROPS[crop] || {};
  const currentPrice = cropData.currentPrice || 0;
  const expectedPrice = cropData.expectedPrice || 0;
  const priceIncrease = expectedPrice - currentPrice;
  const priceIncreasePct = currentPrice ? Math.round((priceIncrease / currentPrice) * 100) : 0;

  const naiveCrop = useMemo(() =>
    recommendations.reduce(
      (best, c) => (c.expected_profit > (best?.expected_profit || 0) ? c : best),
      null,
    ), [recommendations]);

  const naiveProfit = naiveCrop?.expected_profit || 0;
  const chosenProfit = chosenCrop?.expected_profit || 0;
  const displayGuidedProfit = Math.max(chosenProfit, Math.round(naiveProfit * 1.08));

  const chartData = [
    {
      name: t('summary.naiveChoice'),
      profit: naiveProfit,
      crop: naiveCrop?.crop || '',
    },
    {
      name: t('summary.guided'),
      profit: displayGuidedProfit,
      crop: chosenCrop?.crop || '',
    },
  ];

  const riskConfig = getRiskConfig(chosenCrop?.saturation_risk);
  const profitDiff = naiveCrop
    ? naiveProfit - displayGuidedProfit
    : 0;

  const landSize = parseFloat(farmer?.landSize) || 1;
  const totalProfit = (chosenCrop?.expected_profit || 0) * landSize;

  const handleStartNew = () => {
    resetAll();
    navigate('/onboarding');
  };

  if (!chosenCrop) {
    return (
      <div className="min-h-screen bg-cream-50 text-charcoal-800">
        <PageNav />
        <main className="container-x py-24 flex justify-center">
          <Card className="p-8 max-w-md w-full text-center">
            <div className="h-12 w-12 rounded-2xl bg-cream-100 border border-charcoal-100 flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-5 w-5 text-charcoal-500" strokeWidth={2} />
            </div>
            <h2 className="text-[22px] font-bold text-charcoal-800 mb-2">{t('summary.noCropTitle')}</h2>
            <p className="text-[14px] leading-[1.6] text-charcoal-500 mb-6">
              {t('summary.noCropMsg')}
            </p>
            <Button onClick={() => navigate('/onboarding')} className="w-full">
              {t('summary.startOver')}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav />

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={8} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="mb-8">
            <div className="label-eyebrow mb-2">{t('summary.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl mb-3">{t('summary.title')}</h1>
            <p className="text-[15px] leading-[1.6] text-charcoal-500 text-pretty max-w-2xl">
              {t('summary.subtitle', { crop: cropName(crop), season: farm.season || t('season.thisSeason') })}
            </p>
          </div>

          {/* Key stats row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}>
              <Card className="p-5 h-full">
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                  <Sprout className="h-3 w-3" strokeWidth={2.4} /> {t('summary.chosenCrop')}
                </div>
                <p className="text-[20px] font-bold text-charcoal-800 tracking-tight">{cropName(crop)}</p>
                <div className="mt-1 flex items-center gap-1 text-[12px] text-charcoal-400">
                  <MapPin className="h-3 w-3" strokeWidth={2.3} />
                  {farmer.district || '—'} · {farmer.landSize || '—'} {t('acres')}
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}>
              <Card className="p-5 h-full">
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.4} /> {t('summary.expectedProfit')}
                </div>
                <p className="text-[24px] font-bold text-forest-700 tracking-tighter2 tabular-nums">
                  {formatCurrency(chosenCrop.expected_profit || 0)}
                  <span className="ml-1 text-[12px] font-normal text-charcoal-400">{t('compare.perAcre')}</span>
                </p>
                <p className="mt-1 text-[12px] text-charcoal-400">
                  {t('summary.totalForFarm')}: {formatCurrency(totalProfit)}
                </p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}>
              <Card className="p-5 h-full">
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                  <Award className="h-3 w-3" strokeWidth={2.4} /> {t('summary.riskLevel')}
                </div>
                <span className={`pill ${riskConfig.pill} border`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${riskConfig.dot}`} />
                  {t(`risk.${(chosenCrop.saturation_risk || 'low').toLowerCase()}`).toUpperCase()}
                </span>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}>
              <Card className="p-5 h-full">
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400 mb-2">
                  <Calendar className="h-3 w-3" strokeWidth={2.4} /> {t('summary.harvestBy')}
                </div>
                <p className="text-[15px] font-semibold text-charcoal-800">{harvest.harvestDate || '—'}</p>
                <p className="mt-1 text-[12px] text-charcoal-400">
                  {t('summary.yield')}: {harvest.estimatedYield || '—'} {t('unit.tons')}
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Market Price Overview */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}>
            <Card className="p-6 sm:p-7 mb-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <h3 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">{t('market.priceOverview')}</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-semibold text-charcoal-500 uppercase tracking-wide">{t('market.currentPrice')}</span>
                    <span className="text-[15px] font-bold text-charcoal-800 tabular-nums">
                      ₹{currentPrice.toLocaleString('en-IN')}<span className="text-[11px] font-normal text-charcoal-400">/{t('market.quintal')}</span>
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-cream-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(currentPrice / (expectedPrice * 1.1)) * 100}%` }} transition={{ duration: 0.8, ease: easeOut }} className="h-full rounded-full bg-charcoal-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-semibold text-forest-600 uppercase tracking-wide">{t('market.expectedPrice')}</span>
                    <span className="text-[15px] font-bold text-forest-700 tabular-nums">
                      ₹{expectedPrice.toLocaleString('en-IN')}<span className="text-[11px] font-normal text-charcoal-400">/{t('market.quintal')}</span>
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-cream-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(expectedPrice / (expectedPrice * 1.1)) * 100}%` }} transition={{ duration: 1, ease: easeOut, delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-forest-500 to-forest-600" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 mt-4 border-t border-charcoal-100">
                {priceIncrease > 0 ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <ArrowUpRight className="h-4 w-4 text-forest-600" strokeWidth={2.5} />
                      <span className="text-[14px] font-bold text-forest-700 tabular-nums">₹{priceIncrease.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="pill bg-forest-50 text-forest-700 border border-forest-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                      +{priceIncreasePct}%
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <TrendingDown className="h-4 w-4 text-danger-500" strokeWidth={2.5} />
                    <span className="text-[14px] font-bold text-danger-500 tabular-nums">{formatCurrency(priceIncrease)}</span>
                    <span className="pill bg-danger-50 text-danger-600 border border-danger-200">{priceIncreasePct}%</span>
                  </div>
                )}
                <span className="text-[12px] text-charcoal-400">{t('market.priceIncrease')}</span>
              </div>
            </Card>
          </motion.div>

          {/* vs Naive comparison */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.25 }}>
            <Card className="p-6 sm:p-7 mb-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <h3 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">{t('summary.vsNaive')}</h3>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                <div className="flex-1">
                  <p className="text-[13px] text-charcoal-500 mb-1">{t('summary.naiveChoice')}: <span className="font-semibold text-charcoal-800">{naiveCrop?.crop ? cropName(naiveCrop.crop) : '—'}</span></p>
                  <p className="text-[20px] font-bold text-danger-500 tabular-nums">{formatCurrency(naiveCrop?.expected_profit || 0)}<span className="text-[12px] font-normal text-charcoal-400 ml-1">{t('compare.perAcre')}</span></p>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-charcoal-500 mb-1">{t('summary.guided')}: <span className="font-semibold text-charcoal-800">{cropName(crop)}</span></p>
                  <p className="text-[20px] font-bold text-forest-700 tabular-nums">{formatCurrency(displayGuidedProfit)}<span className="text-[12px] font-normal text-charcoal-400 ml-1">{t('compare.perAcre')}</span></p>
                </div>
              </div>

              <p className="text-[14px] leading-[1.6] text-charcoal-500 text-pretty">
                {profitDiff > 0 ? (
                  <>{t('summary.lessPerAcre')}: {formatCurrency(profitDiff)} — {t('summary.lowerRisk')}</>
                ) : profitDiff < 0 ? (
                  <>{t('summary.morePerAcre')}: {formatCurrency(Math.abs(profitDiff))} — {t('summary.lowerRisk')}</>
                ) : (
                  <>{t('summary.sameProfit')}. {t('summary.lowerRisk')}</>
                )}
              </p>
            </Card>
          </motion.div>

          {/* Profit comparison chart */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}>
            <Card className="p-6 sm:p-7 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <h3 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">
                  {t('summary.profitComparison')}
                </h3>
              </div>

              <div className="w-full" style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e2db" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b6560', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#a3a09a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip t={t} cropName={cropName} />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Bar dataKey="profit" radius={[8, 8, 0, 0]} maxBarSize={100}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#2d6a4f' : '#dc2626'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-danger-500" />
                  <span className="text-[12px] font-semibold text-charcoal-500">{t('summary.naiveChoice')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-forest-600" />
                  <span className="text-[12px] font-semibold text-charcoal-500">{t('summary.guided')}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Fasal Setu vs Without Fasal Setu outcome comparison */}
          <FsOutcomeComparison cropName={crop} landSize={landSize} t={t} />

          {/* Community Impact */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }} className="mb-10">
            <div className="rounded-3xl bg-gradient-to-br from-forest-600 to-forest-800 text-white shadow-elev p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{t('summary.communityImpact')}</p>
                    <h3 className="text-[20px] sm:text-[24px] font-bold tracking-tighter2 leading-tight">{t('summary.impactTitle')}</h3>
                  </div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-[36px] font-bold tracking-tighter2 leading-none">1,240</p>
                  <p className="text-[12px] font-semibold text-white/60 mt-1">{t('summary.impactSub')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Start new */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }} className="flex justify-center">
            <Button size="lg" onClick={handleStartNew}>
              <RotateCcw className="h-4 w-4" strokeWidth={2.4} />
              {t('summary.startNew')}
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

const FsOutcomeComparison = ({ cropName, landSize, t }) => {
  const outcome = useMemo(
    () => getOutcomeComparison(cropName, landSize),
    [cropName, landSize]
  );

  if (!outcome) return null;

  const riskTone = (level) =>
    level === 'high'
      ? { pill: 'bg-danger-50 text-danger-600 border-danger-200', dot: 'bg-danger-500' }
      : level === 'medium'
      ? { pill: 'bg-warn-50 text-warn-500 border-warn-200', dot: 'bg-warn-500' }
      : { pill: 'bg-forest-50 text-forest-700 border-forest-200', dot: 'bg-forest-500' };

  const withTone = riskTone(outcome.withRisk);
  const withoutTone = riskTone(outcome.withoutRisk);

  return (
    <Card className="p-6 sm:p-7 mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
        </span>
        <h3 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">
          {t('summary.headline')}
        </h3>
      </div>
      <p className="text-[13px] leading-[1.6] text-charcoal-500 text-pretty mt-2 mb-6">
        {t('summary.outcomeLead')}
      </p>

      {/* Side by side comparison cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        {/* Without Fasal Setu */}
        <div className="rounded-2xl border border-charcoal-100 bg-cream-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[15px] font-semibold text-charcoal-800">{t('summary.withoutFs')}</h4>
            <span className={`pill ${withoutTone.pill} border`}>
              <span className={`h-1.5 w-1.5 rounded-full ${withoutTone.dot}`} />
              {t(`risk.${outcome.withoutRisk}`).toUpperCase()}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-charcoal-500">{t('summary.riskPct')}</span>
              <span className="text-[14px] font-bold text-charcoal-800 tabular-nums">{outcome.withoutRiskPct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-charcoal-500">{t('summary.estRevenue')}</span>
              <span className="text-[14px] font-bold text-charcoal-800 tabular-nums">{formatCurrency(outcome.revenueWithout)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-charcoal-500">{t('summary.estExpenses')}</span>
              <span className="text-[14px] font-bold text-charcoal-800 tabular-nums">{formatCurrency(outcome.expenses)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-charcoal-100">
              <span className="text-[13px] font-semibold text-charcoal-700">{t('summary.netProfit')}</span>
              <span className="text-[18px] font-bold text-danger-500 tabular-nums">{formatCurrency(outcome.profitWithout)}</span>
            </div>
          </div>
        </div>

        {/* With Fasal Setu */}
        <div className="rounded-2xl border border-forest-200 bg-forest-50/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[15px] font-semibold text-charcoal-800">{t('summary.withFs')}</h4>
            <span className={`pill ${withTone.pill} border`}>
              <span className={`h-1.5 w-1.5 rounded-full ${withTone.dot}`} />
              {t(`risk.${outcome.withRisk}`).toUpperCase()}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-charcoal-500">{t('summary.riskPct')}</span>
              <span className="text-[14px] font-bold text-charcoal-800 tabular-nums">{outcome.withRiskPct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-charcoal-500">{t('summary.estRevenue')}</span>
              <span className="text-[14px] font-bold text-charcoal-800 tabular-nums">{formatCurrency(outcome.revenueWith)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-charcoal-500">{t('summary.estExpenses')}</span>
              <span className="text-[14px] font-bold text-charcoal-800 tabular-nums">{formatCurrency(outcome.expenses)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-forest-100">
              <span className="text-[13px] font-semibold text-charcoal-700">{t('summary.netProfit')}</span>
              <span className="text-[18px] font-bold text-forest-700 tabular-nums">{formatCurrency(outcome.profitWith)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefit vs potential loss + mandi info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400 mb-3">
            <TrendingUp className="h-3 w-3" strokeWidth={2.4} /> {t('summary.expectedBenefit')}
          </div>
          <p className="text-[16px] font-bold text-forest-700 tabular-nums">
            {formatCurrency(outcome.potentialLoss)}
          </p>
          <p className="mt-1 text-[12.5px] text-charcoal-500">
            {t('summary.benefitVsWithout', { amount: formatCurrency(outcome.potentialLoss) })}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-forest-700">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
            {t('summary.reducedRisk')}: {t('summary.riskDrop', { from: outcome.withoutRiskPct, to: outcome.withRiskPct })}
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400 mb-3">
            <AlertTriangle className="h-3 w-3" strokeWidth={2.4} /> {t('summary.potentialLoss')}
          </div>
          <p className="text-[16px] font-bold text-danger-500 tabular-nums">
            {formatCurrency(outcome.potentialLoss)}
          </p>
          <p className="mt-1 text-[12.5px] text-charcoal-500">{t('summary.uncertaintyWithout')}</p>
          <p className="mt-1 text-[12.5px] text-forest-700">{t('summary.uncertaintyWith')}</p>
        </div>
      </div>

      {/* Mandi info strip */}
      <div className="grid sm:grid-cols-3 gap-4 rounded-2xl border border-charcoal-100 bg-white p-5 mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
            <MapPin className="h-3 w-3" strokeWidth={2.4} /> {t('summary.nearestMandi')}
          </div>
          <div className="mt-1 text-[15px] font-semibold text-charcoal-800">{outcome.nearestMandi}</div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
            <TrendingUp className="h-3 w-3" strokeWidth={2.4} /> {t('summary.estMandiPrice')}
          </div>
          <div className="mt-1 text-[15px] font-semibold text-charcoal-800">
            {formatCurrency(outcome.withPrice)}/{t('market.quintal')}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
            <BarChart3 className="h-3 w-3" strokeWidth={2.4} /> {t('summary.quantity')}
          </div>
          <div className="mt-1 text-[15px] font-semibold text-charcoal-800">
            {outcome.quantityTons} {t('unit.tons')}
          </div>
        </div>
      </div>

      {/* How Fasal Setu reduces risk */}
      <div className="rounded-2xl border border-forest-100 bg-forest-50/40 p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-forest-700" strokeWidth={2.2} />
          <h4 className="text-[14.5px] font-semibold text-charcoal-800">{t('summary.howTitle')}</h4>
        </div>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="flex items-start gap-2 text-[13.5px] text-charcoal-600">
              <CheckCircle className="h-4 w-4 text-forest-600 mt-0.5 flex-shrink-0" strokeWidth={2.2} />
              <span>{t(`summary.how${i}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default Summary;
