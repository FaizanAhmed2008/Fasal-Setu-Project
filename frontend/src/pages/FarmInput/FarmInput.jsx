import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Droplets, Layers, ArrowRight, AlertCircle, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';

const SEASONS = [
  { key: 'Kharif', labelKey: 'farm.seasonKharif' },
  { key: 'Rabi', labelKey: 'farm.seasonRabi' },
  { key: 'Zaid', labelKey: 'farm.seasonZaid' },
];
const SOILS = [
  { key: 'Black', labelKey: 'farm.soilBlack' },
  { key: 'Red', labelKey: 'farm.soilRed' },
  { key: 'Alluvial', labelKey: 'farm.soilAlluvial' },
];
const IRRIGATION = [
  { key: 'Yes', labelKey: 'farm.irrigationYes' },
  { key: 'No', labelKey: 'farm.irrigationNo' },
];

const easeOut = [0.22, 1, 0.36, 1];

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-charcoal-700 mb-2">
      <Icon className="h-3.5 w-3.5 text-forest-600" strokeWidth={2.3} />
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-[14.5px] text-charcoal-800 placeholder:text-charcoal-400 transition-all duration-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:outline-none';

const FarmInput = () => {
  const navigate = useNavigate();
  const { farmer, farm, setFarm } = useFarmerState();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    season: farm.season || '',
    soil: farm.soil || '',
    irrigation: farm.irrigation || '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.season || !formData.soil || !formData.irrigation) {
      setError(t('farm.fillAll'));
      return;
    }

    setFarm({ season: formData.season, soil: formData.soil, irrigation: formData.irrigation });
    navigate('/analyzing');
  };

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/onboarding" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={1} />

        {farmer.name && (
          <div className="max-w-2xl mx-auto mb-6 flex items-center gap-2 rounded-xl border border-charcoal-100 bg-white/60 px-4 py-2.5 text-[12.5px] text-charcoal-500 backdrop-blur-sm">
            <span className="font-medium text-charcoal-700">{farmer.name}</span>
            {farmer.district && <span className="text-charcoal-300">|</span>}
            {farmer.district && <span>{farmer.district}</span>}
            {farmer.landSize && <span className="text-charcoal-300">|</span>}
            {farmer.landSize && <span>{farmer.landSize} {t('acres')}</span>}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8 text-center sm:text-left">
            <div className="label-eyebrow mb-3">{t('farm.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl text-balance">
              {t('farm.title')}
            </h1>
            <p className="mt-3 text-[15.5px] leading-[1.6] text-charcoal-500 text-pretty">
              {t('farm.subtitle')}
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 flex items-start gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-[13px] text-danger-600">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label={t('farm.season')} icon={Calendar}>
                <div className="grid grid-cols-2 gap-2.5">
                  {SEASONS.map((s) => {
                    const active = formData.season === s.key;
                    return (
                      <button
                        type="button"
                        key={s.key}
                        onClick={() => setFormData((p) => ({ ...p, season: s.key }))}
                        className={[
                          'rounded-xl px-4 py-3 text-[14px] font-semibold border transition-all duration-200',
                          active
                            ? 'border-forest-500 bg-forest-50 text-forest-700 shadow-soft'
                            : 'border-charcoal-200 bg-white text-charcoal-600 hover:border-forest-300 hover:text-forest-700',
                        ].join(' ')}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {active && <Check className="h-3.5 w-3.5" strokeWidth={2.6} />}
                          {t(s.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label={t('farm.soil')} icon={Layers}>
                <div className="grid grid-cols-3 gap-2.5">
                  {SOILS.map((s) => {
                    const active = formData.soil === s.key;
                    return (
                      <button
                        type="button"
                        key={s.key}
                        onClick={() => setFormData((p) => ({ ...p, soil: s.key }))}
                        className={[
                          'rounded-xl px-4 py-3 text-[14px] font-semibold border transition-all duration-200',
                          active
                            ? 'border-forest-500 bg-forest-50 text-forest-700 shadow-soft'
                            : 'border-charcoal-200 bg-white text-charcoal-600 hover:border-forest-300 hover:text-forest-700',
                        ].join(' ')}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {active && <Check className="h-3.5 w-3.5" strokeWidth={2.6} />}
                          {t(s.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label={t('farm.irrigation')} icon={Droplets}>
                <div className="grid grid-cols-2 gap-2.5">
                  {IRRIGATION.map((opt) => {
                    const active = formData.irrigation === opt.key;
                    return (
                      <button
                        type="button"
                        key={opt.key}
                        onClick={() => setFormData((p) => ({ ...p, irrigation: opt.key }))}
                        className={[
                          'rounded-xl px-4 py-3 text-[14px] font-semibold border transition-all duration-200',
                          active
                            ? 'border-forest-500 bg-forest-50 text-forest-700 shadow-soft'
                            : 'border-charcoal-200 bg-white text-charcoal-600 hover:border-forest-300 hover:text-forest-700',
                        ].join(' ')}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {active && <Check className="h-3.5 w-3.5" strokeWidth={2.6} />}
                          {t(opt.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="pt-2">
                <Button type="submit" size="lg" className="w-full">
                  {t('farm.submit')}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Button>
                <p className="mt-3 text-center text-[12px] text-charcoal-400">
                  {t('farm.footer')}
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default FarmInput;
