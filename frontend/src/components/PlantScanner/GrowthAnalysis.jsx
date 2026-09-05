import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  Activity,
  Gauge,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Leaf,
  Droplets,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import Card from '../ui/Card';
import { GROWTH_STAGES } from '../../data/demoData';
import { useLanguage } from '../../context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1];

const SEVERITY_CONFIG = {
  High: { pill: 'bg-danger-50 text-danger-600 border-danger-200', dot: 'bg-danger-500', text: 'high' },
  Medium: { pill: 'bg-warn-50 text-warn-500 border-warn-200', dot: 'bg-warn-500', text: 'moderate' },
  Moderate: { pill: 'bg-warn-50 text-warn-500 border-warn-200', dot: 'bg-warn-500', text: 'moderate' },
  Low: { pill: 'bg-forest-50 text-forest-700 border-forest-200', dot: 'bg-forest-500', text: 'low' },
};

const CircularGauge = ({ value, max = 100, size = 96, stroke = 9, label, color, showValue = true }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e8e5df"
            strokeWidth={stroke}
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.3, ease: EASE }}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-bold text-charcoal-800 tabular-nums leading-none">{value}</span>
            {label && <span className="text-[9px] font-semibold uppercase tracking-wide text-charcoal-400 mt-0.5">{label}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

const Timeline = ({ currentIndex, t }) => (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-[12px] font-semibold uppercase tracking-wide text-charcoal-400">{t('growth.timeline')}</span>
    </div>
    <div className="flex items-center gap-1">
      {GROWTH_STAGES.map((stage, i) => {
        const isCurrent = i === currentIndex;
        const isDone = i < currentIndex;
        return (
          <div key={stage.key} className="flex-1 relative">
            {i > 0 && (
              <div className={`absolute top-4 left-[-50%] w-full h-0.5 ${isDone || isCurrent ? 'bg-forest-500' : 'bg-charcoal-200'}`} />
            )}
            <div className="flex flex-col items-center">
              <div
                className={[
                  'h-8 w-8 rounded-full flex items-center justify-center border-2 text-[10px] font-bold z-10',
                  isDone
                    ? 'bg-forest-500 border-forest-500 text-white'
                    : isCurrent
                    ? 'bg-white border-forest-600 text-forest-700'
                    : 'bg-white border-charcoal-200 text-charcoal-400',
                ].join(' ')}
              >
                {isDone ? <CheckCircle className="h-4 w-4" /> : <span>{i + 1}</span>}
              </div>
              <span
                className={[
                  'mt-1.5 text-[9px] font-semibold text-center leading-tight',
                  isCurrent ? 'text-forest-700' : isDone ? 'text-charcoal-600' : 'text-charcoal-400',
                ].join(' ')}
              >
                {t(stage.labelKey)}
              </span>
              {isCurrent && (
                <span className="mt-0.5 text-[7px] font-bold uppercase bg-forest-100 text-forest-700 px-1.5 py-0.5 rounded-full">
                  {t('growth.current')}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const StatTile = ({ icon: Icon, label, value, sub, accent }) => (
  <div className="rounded-xl border border-charcoal-100 bg-white p-3 flex flex-col">
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-charcoal-400 mb-1.5">
      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      {label}
    </span>
    <span className={`text-[16px] font-bold tracking-tight ${accent || 'text-charcoal-800'}`}>{value}</span>
    {sub && <span className="text-[11px] text-charcoal-400 mt-0.5">{sub}</span>}
  </div>
);

const InfoBlock = ({ title, icon: Icon, children, tone }) => (
  <div className={`rounded-xl border px-4 py-3 ${tone || 'border-charcoal-100 bg-white'}`}>
    <p className="text-[12px] font-semibold uppercase tracking-wide text-charcoal-500 mb-1 flex items-center gap-1.5">
      <Icon className="h-3 w-3" strokeWidth={2.4} />
      {title}
    </p>
    <div className="text-[13.5px] text-charcoal-800 leading-relaxed">{children}</div>
  </div>
);

const GrowthAnalysis = ({ result, t }) => {
  if (!result) return null;

  const isHealthy = result.status === 'healthy';
  const sevKey = SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG.Medium;
  const healthTone = result.healthScore >= 80 ? 'text-forest-600' : result.healthScore >= 65 ? 'text-warn-500' : 'text-danger-500';
  const healthColor = result.healthScore >= 80 ? '#2d6a4f' : result.healthScore >= 65 ? '#d97706' : '#dc2626';
  const market = result.market || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="rounded-2xl border border-forest-200 bg-gradient-to-br from-forest-50 to-cream-50 p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-forest-700">
          <Activity className="h-4 w-4" strokeWidth={2.2} />
          {t('growth.title')}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
              {t('growth.cropDetected')}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Sprout className="h-5 w-5 text-forest-600" strokeWidth={2.2} />
              <span className="text-[24px] font-bold text-charcoal-800 tracking-tighter2">{t(`crop.${result.crop}`)}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className={`pill ${sevKey.pill} border`}>
                <span className={`h-1.5 w-1.5 rounded-full ${sevKey.dot}`} />
                {isHealthy ? t('growth.healthy') : t(`growth.${sevKey.text}`)} · {t('growth.severity')}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <CircularGauge value={result.aiConfidence || 80} size={84} stroke={8} color="#2d6a4f" />
            <span className="text-[11px] font-semibold text-charcoal-500 mt-1">{t('growth.aiConfidence')}</span>
          </div>
        </div>
      </div>

      {/* Stage + Health grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 flex flex-col items-center">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400 mb-1 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} /> {t('growth.plantProgress')}
          </div>
          <CircularGauge value={result.progressPercent || 50} size={78} stroke={8} color="#2d6a4f" label="%" />
        </Card>
        <Card className="p-4 flex flex-col items-center">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400 mb-1 flex items-center gap-1">
            <Leaf className="h-3.5 w-3.5" strokeWidth={2.2} /> {t('growth.healthScore')}
          </div>
          <CircularGauge value={result.healthScore || 70} size={78} stroke={8} color={healthColor} />
          <span className={`text-[11px] font-bold mt-1 ${healthTone}`}>
            {t(`growth.${result.healthScore >= 80 ? 'healthy' : result.healthScore >= 65 ? 'fair' : 'atRisk'}`)}
          </span>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatTile icon={Calendar} label={t('growth.growthStage')} value={t(`growth.${result.growthStageKey || 'vegetative'}`)} sub={`${t('growth.nextStage')}: ${t(`growth.${stageKeyOf(result.nextStage)}`)}`} accent="text-forest-700" />
        <StatTile icon={Droplets} label={t('growth.daysToNext')} value={`${result.daysToNextStage || 18} ${t('growth.daysUnit')}`} sub={`${t('growth.healthAtStage')}: ${result.healthScore || 70}`} />
      </div>

      {/* Stage timeline */}
      <Card className="p-5">
        <Timeline currentIndex={result.stageIndex ?? 1} t={t} />
        {result.growthNote && (
          <div className="mt-4 rounded-xl bg-forest-50 border border-forest-200 px-4 py-3">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-forest-600 mb-0.5">{t('growth.stageNote')}</p>
            <p className="text-[13px] text-charcoal-800">{result.growthNote}</p>
          </div>
        )}
      </Card>

      {/* Condition & yield impact */}
      <div className="space-y-3">
        <InfoBlock title={t('growth.disease')} icon={isHealthy ? CheckCircle : AlertTriangle} tone={isHealthy ? 'border-forest-200 bg-forest-50/60' : 'border-danger-200 bg-danger-50/60'}>
          <span className="font-semibold">{result.issue_name || t('growth.healthy')}</span>
          {result.symptoms && <span className="block mt-0.5 text-charcoal-600 text-[13px]">{result.symptoms}</span>}
        </InfoBlock>

        <div className={['rounded-xl border px-4 py-3', isHealthy ? 'border-forest-200 bg-forest-50/60' : 'border-warn-200 bg-warn-50/60'].join(' ')}>
          <p className="text-[12px] font-semibold uppercase tracking-wide text-charcoal-500 mb-1 flex items-center gap-1.5">
            <Gauge className="h-3 w-3" strokeWidth={2.4} /> {t('growth.yieldImpact')}
          </p>
          <p className="text-[13.5px] font-semibold text-charcoal-800">{result.yieldImpact}</p>
        </div>
      </div>

      {/* Recommended action */}
      <InfoBlock title={t('growth.recommendedAction')} icon={Shield} tone={isHealthy ? 'border-forest-200 bg-forest-50/60' : 'border-danger-200 bg-danger-50/60'}>
        {result.recommended_action}
      </InfoBlock>

      {result.treatment && !isHealthy && (
        <InfoBlock title={t('growth.treatment')} icon={Activity} tone="border-charcoal-100 bg-white">
          {result.treatment}
        </InfoBlock>
      )}

      {result.prevention && (
        <InfoBlock title={t('growth.prevention')} icon={Shield} tone="border-charcoal-100 bg-white">
          {result.prevention}
        </InfoBlock>
      )}

      {/* Market teaser */}
      {market.currentMarketPrice && market.fasalSetuExpectedPrice && market.fasalSetuExpectedPrice > market.currentMarketPrice && (
        <Card className="p-4 mt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">{t('growth.marketSignal')}</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-forest-700">
              <ArrowRight className="h-3 w-3" strokeWidth={2.6} /> +{market.priceIncreasePercentage}%
            </span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-charcoal-500">{t('growth.currentPriceLabel')}: ₹{market.currentMarketPrice.toLocaleString('en-IN')}</span>
            <span className="text-charcoal-400">→</span>
            <span className="text-forest-700 font-bold">{t('growth.expectedPriceLabel')}: ₹{market.fasalSetuExpectedPrice.toLocaleString('en-IN')}</span>
          </div>
        </Card>
      )}

      {result.confidence_note && (
        <p className="text-[11.5px] text-charcoal-400 italic leading-snug text-center">{result.confidence_note}</p>
      )}
    </motion.div>
  );
};

const stageKeyOf = (stage) => {
  const map = {
    Seedling: 'seedling',
    Vegetative: 'vegetative',
    Flowering: 'flowering',
    Fruiting: 'fruiting',
    Maturity: 'maturity',
    Harvest: 'harvest',
  };
  return map[stage] || 'vegetative';
};

export default GrowthAnalysis;
