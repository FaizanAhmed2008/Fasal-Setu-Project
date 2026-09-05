import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sprout, Camera, Droplets, FlaskConical, Bug, Leaf } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, BackButton } from '../../components/ui/PageChrome';
import PlantScanner from '../../components/PlantScanner/PlantScanner';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_CROPS, getCropAdvisories } from '../../data/demoData';

const easeOut = [0.22, 1, 0.36, 1];

const inputCls =
  'w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-[14.5px] text-charcoal-800 placeholder:text-charcoal-400 transition-all duration-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:outline-none';

const ADV_ICONS = {
  water: Droplets,
  nutrient: FlaskConical,
  pest: Bug,
};

const AlreadyPlanted = () => {
  const navigate = useNavigate();
  const { t, cropName } = useLanguage();

  const [crop, setCrop] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8 text-center sm:text-left">
            <div className="label-eyebrow mb-3">{t('already.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl text-balance">
              {t('already.title')}
            </h1>
            <p className="mt-3 text-[15.5px] leading-[1.6] text-charcoal-500 text-pretty">
              {t('already.subtitle')}
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-charcoal-700 mb-2">
                  <Sprout className="h-3.5 w-3.5 text-forest-600" strokeWidth={2.3} />
                  {t('already.crop')}
                </label>
                <select
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setResult(null);
                  }}
                  className={inputCls + ' appearance-none pr-10 bg-no-repeat'}
                >
                  <option value="">{t('already.selectCrop')}</option>
                  {Object.keys(DEMO_CROPS).map((name) => (
                    <option key={name} value={name}>
                      {cropName(name)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full gap-2"
                  disabled={!crop}
                  onClick={() => setScannerOpen(true)}
                >
                  <Camera className="h-4 w-4" strokeWidth={2.4} />
                  {result ? t('already.reScan') : t('already.scanCrop')}
                </Button>
                <p className="mt-3 text-center text-[12px] text-charcoal-400">
                  {t('already.scanHint')}
                </p>
              </div>
            </div>
          </Card>

          {result && crop && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mt-10"
            >
              <div className="mb-6 text-center sm:text-left">
                <div className="label-eyebrow mb-2">{t('already.advisoriesEyebrow')}</div>
                <h2 className="h-section text-2xl sm:text-[28px]">
                  {t('already.advisoriesTitle', { crop: cropName(crop) })}
                </h2>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-charcoal-500 text-pretty">
                  {t('already.advisoriesSub')}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCropAdvisories(crop).map((adv) => {
                  const Icon = ADV_ICONS[adv.type] || Leaf;
                  return (
                    <Card
                      key={adv.type}
                      className="p-5 border-forest-200 bg-gradient-to-br from-forest-50/40 to-white"
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="h-9 w-9 rounded-xl bg-forest-600 text-white flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <h3 className="text-[15px] font-semibold text-charcoal-800 tracking-tightish">
                          {t(adv.titleKey)}
                        </h3>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-charcoal-600">
                        {t(adv.bodyKey)}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {crop && (
        <PlantScanner
          isOpen={scannerOpen}
          onClose={() => setScannerOpen(false)}
          cropName={crop}
          onAnalyzed={(data) => setResult(data)}
        />
      )}
    </div>
  );
};

export default AlreadyPlanted;
