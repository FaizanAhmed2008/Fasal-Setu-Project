import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Ruler,
  Calendar,
  AlertCircle,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import CropCard from '../../components/CropCard/CropCard';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const Recommendations = () => {
  const navigate = useNavigate();
  const { t, reasonForCrop, cropName } = useLanguage();
  const {
    farmer,
    farm,
    recommendations,
    selectedCrops,
    toggleSelectedCrop,
  } = useFarmerState();

  const [expandedWhyNot, setExpandedWhyNot] = useState(false);

  const selectedCropNames = selectedCrops.map((c) => c.crop);
  const twoSelected = selectedCrops.length === 2;

  const highestProfitCrop = recommendations.reduce(
    (max, c) => (c.expected_profit_per_acre > (max?.expected_profit_per_acre ?? -Infinity) ? c : max),
    null
  );

  const handleCompare = () => {
    if (twoSelected) {
      navigate('/comparison');
    }
  };

  const farmData = {
    district: farmer.district,
    landSize: farmer.landSize,
    season: farm.season,
  };

  if (!recommendations.length) {
    return (
      <div className="min-h-screen bg-cream-50 text-charcoal-800">
        <PageNav>
          <BackButton to="/farm-input" />
        </PageNav>
        <main className="container-x py-24 flex justify-center">
          <Card className="p-8 max-w-md w-full text-center">
            <div className="h-12 w-12 rounded-2xl bg-cream-100 border border-charcoal-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-5 w-5 text-charcoal-500" strokeWidth={2} />
            </div>
            <h2 className="text-[22px] font-bold text-charcoal-800 mb-2">{t('reco.noneTitle')}</h2>
            <p className="text-[14px] leading-[1.6] text-charcoal-500 mb-6">
              {t('reco.noneMsg')}
            </p>
            <Button onClick={() => navigate('/farm-input')} className="w-full">
              {t('reco.noneBtn')}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/farm-input" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={3} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="mb-6">
            <div className="label-eyebrow mb-2">{t('reco.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl mb-3">
              {t('reco.title')}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-charcoal-500 mb-8 bg-cream-100/60 rounded-xl px-4 py-2.5 border border-charcoal-100/50">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.3} /> {farmData.district || '—'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.3} /> {farmData.landSize || '—'} {t('acres')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.3} /> {farmData.season || '—'}
            </span>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-semibold text-charcoal-800 tracking-tightish">
                {t('reco.recommended')}
              </h2>
              <span className="pill bg-forest-50 text-forest-700">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                {t('reco.tapToSelect')}
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {recommendations.map((crop, i) => {
                const isSelected = selectedCropNames.includes(crop.crop);
                const isHighestProfit = highestProfitCrop?.crop === crop.crop;

                return (
                  <motion.div
                    key={crop.crop}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
                    className="relative"
                  >
                    <button
                      onClick={() => toggleSelectedCrop(crop)}
                      className={`absolute top-4 left-4 z-10 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-forest-600 border-forest-600 text-white'
                          : 'bg-white/80 border-charcoal-200 text-transparent hover:border-charcoal-400'
                      }`}
                      aria-label={isSelected ? `${t('reco.deselect')} ${cropName(crop.crop)}` : `${t('reco.select')} ${cropName(crop.crop)}`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </button>

                    <div
                      className={`rounded-2xl transition-all duration-300 ${
                        isSelected
                          ? 'ring-2 ring-forest-500/60 shadow-md shadow-forest-500/10'
                          : ''
                      }`}
                    >
                      <CropCard
                        crop={crop.crop}
                        expectedProfit={crop.expected_profit_per_acre}
                        saturationRisk={crop.saturation_risk}
                        riskScore={crop.risk_score}
                        reason={reasonForCrop(crop.crop)}
                        isRecommended={i === 0}
                        supply={crop.supply}
                        demand={crop.demand}
                        noteKey={crop.note_key}
                        district={farmer.district}
                        marketOutlook={crop.market_outlook}
                      />
                    </div>

                    {isHighestProfit && (
                      <div className="mt-3">
                        <button
                          onClick={() => setExpandedWhyNot((p) => !p)}
                          className="w-full flex items-center justify-between gap-2 rounded-xl border border-charcoal-100 bg-cream-100/60 px-4 py-3 text-[13px] font-semibold text-charcoal-600 hover:bg-cream-100 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-warn-500" strokeWidth={2.4} />
                            {t('reco.whyNot', { crop: cropName(crop.crop) })}
                          </span>
                          {expandedWhyNot ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedWhyNot && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: easeOut }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 rounded-xl border border-charcoal-100 bg-white px-4 py-3 text-[13px] leading-[1.6] text-charcoal-500">
                                {reasonForCrop(crop.crop)}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>

      <div className="sticky bottom-0 bg-cream-50/90 backdrop-blur-md border-t border-charcoal-100/60 px-4 py-4">
        <div className="container-x flex items-center justify-center">
          {twoSelected ? (
            <Button onClick={handleCompare} className="w-full sm:w-auto px-8">
              {t('reco.compare', { n: selectedCrops.length })}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Button>
          ) : (
            <p className="text-[13px] text-charcoal-400 font-medium">
              {t('reco.selectTwo')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
