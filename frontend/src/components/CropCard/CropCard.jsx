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
  supply,
  demand,
  noteKey,
  district,
  marketOutlook,
}) => {
  const { t, cropName } = useLanguage();
  const tone = riskMap[saturationRisk?.toLowerCase()] || riskMap.low;

  let noteText = null;
  if (noteKey) {
    noteText = t(noteKey, {
      district: district || '',
      supply: supply ? t(`risk.${supply.toLowerCase()}`) : '',
      demand: demand ? t(`risk.${demand.toLowerCase()}`) : '',
    });
  }

  const outlookTone =
    marketOutlook?.outlook === 'caution'
      ? 'border-warn-200 bg-warn-50 text-warn-700'
      : marketOutlook?.outlook === 'favorable'
      ? 'border-forest-200 bg-forest-50 text-forest-700'
      : 'border-charcoal-200 bg-cream-50 text-charcoal-600';
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
              {cropName(crop)}
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

        {(supply || demand) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {supply && (
              <span className="pill border border-charcoal-200 bg-cream-50 text-charcoal-600">
                {t('regional.supply')}: {t(`risk.${supply.toLowerCase()}`)}
              </span>
            )}
            {demand && (
              <span className="pill border border-charcoal-200 bg-cream-50 text-charcoal-600">
                {t('regional.demand')}: {t(`risk.${demand.toLowerCase()}`)}
              </span>
            )}
          </div>
        )}

        {noteText && (
          <div
            className={`mt-4 rounded-xl border p-3 text-[12.5px] leading-[1.5] ${
              supply === 'high'
                ? 'border-warn-200 bg-warn-50 text-warn-700'
                : 'border-forest-200 bg-forest-50 text-forest-700'
            }`}
          >
            {noteText}
          </div>
        )}

        {marketOutlook && marketOutlook.outlook && (
          <div className="mt-4 rounded-xl border border-charcoal-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-400">
              {t('regional.outlookLabel')}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-[11px] text-charcoal-500">{t('regional.harvestTime')}</p>
                <p className="mt-1 text-[15px] font-semibold text-charcoal-800">
                  {marketOutlook.harvest_weeks} {t('regional.unitWeeks')}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-charcoal-500">{t('regional.priceRange')}</p>
                <p className="mt-1 text-[15px] font-semibold text-charcoal-800">
                  ₹{marketOutlook.price_min?.toLocaleString()}–₹{marketOutlook.price_max?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-charcoal-500">{t('regional.outlookLabel')}</p>
                <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${outlookTone}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {t(`outlook.${marketOutlook.outlook}`)}
                </span>
              </div>
            </div>
          </div>
        )}

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
