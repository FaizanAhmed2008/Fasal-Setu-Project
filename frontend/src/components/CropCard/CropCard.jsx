import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import RiskGauge from '../RiskGauge/RiskGauge';
import { useLanguage } from '../../context/LanguageContext';

const riskMap = {
  high: { pill: 'bg-danger-50 text-danger-600 border-danger-100', ring: 'ring-danger-200' },
  medium: { pill: 'bg-warn-50 text-warn-500 border-warn-100', ring: 'ring-warn-200' },
  low: { pill: 'bg-forest-50 text-forest-700 border-forest-100', ring: 'ring-forest-200' },
};

const CropCard = ({
  crop,
  expectedProfit,
  saturationRisk,
  riskScore,
  reason,
  isRecommended = false,
  onViewDetails,
  isLoading = false,
  className = '',
}) => {
  const { t } = useLanguage();
  const tone = riskMap[saturationRisk?.toLowerCase()] || riskMap.low;
  return (
    <Card
      hover
      className={`relative overflow-hidden ${className} ${
        isRecommended ? `ring-2 ring-forest-400/60` : ''
      }`}
    >
      {isRecommended && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-charcoal-800 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
          {t('cropCard.recommended')}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-[22px] font-bold text-charcoal-800 tracking-tighter2 leading-tight">
              {crop}
            </h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-400">
              {t('compare.expectedProfit')}
            </p>
            <p className="text-[28px] font-bold text-charcoal-800 tracking-tighter2 leading-none mt-0.5">
              ₹{expectedProfit?.toLocaleString()}
              <span className="ml-1 text-[13px] font-normal text-charcoal-400">{t('compare.perAcre')}</span>
            </p>
          </div>
          <RiskGauge riskLevel={saturationRisk} riskScore={riskScore} size="sm" />
        </div>

        <span className={`pill ${tone.pill} border`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {t(`risk.${saturationRisk?.toLowerCase() || 'low'}`).toUpperCase()} {t('cropCard.risk')}
        </span>

        <p className="mt-4 text-[14px] leading-[1.6] text-charcoal-500 text-pretty">{reason}</p>

        {onViewDetails && (
          <button
            onClick={onViewDetails}
            disabled={isLoading}
            className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-forest-700 hover:text-forest-800 transition-colors disabled:opacity-60 disabled:cursor-wait"
          >
            {isLoading ? t('cropCard.loadingMarket') : t('cropCard.viewMarket')}
            <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </Card>
  );
};

export default CropCard;
