import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Ruler,
  Calendar,
  Sprout,
  Loader2,
  AlertCircle,
  Shield,
  Droplets,
  Bug,
  Leaf,
  FlaskConical,
  AlertTriangle,
  ListChecks,
} from 'lucide-react';
import { useFarmerState } from '../../context/FarmerStateContext';
import apiService from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, ProgressSteps } from '../../components/ui/PageChrome';
import { useLanguage } from '../../context/LanguageContext';
import { getAdvisoryPack } from '../../data/demoData';

const easeOut = [0.22, 1, 0.36, 1];

const SECTION_ICONS = {
  action: ListChecks,
  cropCare: Leaf,
  irrigation: Droplets,
  pest: Bug,
  nutrient: FlaskConical,
  precaution: AlertTriangle,
  next: Shield,
};

const URGENCY_PILL = {
  high: 'bg-danger-50 text-danger-600 border-danger-200',
  medium: 'bg-warn-50 text-warn-500 border-warn-200',
  low: 'bg-forest-50 text-forest-700 border-forest-200',
};

const Advisory = () => {
  const navigate = useNavigate();
  const { farmer, farm, chosenCrop, advisory, setAdvisory } = useFarmerState();
  const { t, cropName, seasonName } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const crop = chosenCrop?.crop || 'Tomato';
  const pack = getAdvisoryPack(crop);
  const cropLabel = cropName(crop);

  useEffect(() => {
    if (!chosenCrop?.crop) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchAdvisory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAdvisory(chosenCrop.crop);
        if (!cancelled) {
          setAdvisory(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || t('advisory.errorMsg'));
          setLoading(false);
        }
      }
    };

    fetchAdvisory();

    return () => { cancelled = true; };
  }, [chosenCrop?.crop, farm.season, setAdvisory, t]);

  const actionSection = pack.sections.find((s) => s.id === 'action');
  const nextSection = pack.sections.find((s) => s.id === 'next');
  const precautionSection = pack.sections.find((s) => s.id === 'precaution');
  const midSections = pack.sections.filter((s) => !['action', 'next', 'precaution'].includes(s.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 text-charcoal-800">
        <PageNav backTo="/crop-planning" />
        <main className="container-x py-24 flex justify-center">
          <Card className="p-8 max-w-md w-full text-center">
            <div className="h-12 w-12 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-5 w-5 text-forest-600 animate-spin" strokeWidth={2} />
            </div>
            <h2 className="text-[22px] font-bold text-charcoal-800 mb-2">{t('advisory.loading')}</h2>
            <p className="text-[14px] leading-[1.6] text-charcoal-500">
              {t('advisory.loadingMsg', { crop: cropLabel })}
            </p>
          </Card>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 text-charcoal-800">
        <PageNav backTo="/crop-planning" />
        <main className="container-x py-24 flex justify-center">
          <Card className="p-8 max-w-md w-full text-center">
            <div className="h-12 w-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-5 w-5 text-red-500" strokeWidth={2} />
            </div>
            <h2 className="text-[22px] font-bold text-charcoal-800 mb-2">{t('advisory.errorTitle')}</h2>
            <p className="text-[14px] leading-[1.6] text-charcoal-500 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => window.location.reload()} className="flex-1">
                {t('advisory.retry')}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/crop-planning')} className="flex-1">
                {t('advisory.goBack')}
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav backTo="/crop-planning" />

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={6} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="mb-8">
            <div className="label-eyebrow mb-2">{t('advisory.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl mb-3">{t('advisory.title')}</h1>
            <p className="text-[15px] leading-[1.6] text-charcoal-500 text-pretty max-w-2xl">
              {t('advisory.forCrop', { crop: cropLabel })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            <span className={`pill border w-fit ${URGENCY_PILL[pack.urgency] || URGENCY_PILL.medium}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {t(`advisory.urgency${pack.urgency.charAt(0).toUpperCase()}${pack.urgency.slice(1)}`)}
            </span>
            <p className="text-[12.5px] text-charcoal-400">{t('advisory.demoNote')}</p>
          </div>

          {actionSection && (
            <Card className="p-6 sm:p-7 mb-5 border-forest-200 bg-gradient-to-br from-forest-50/70 to-white">
              <div className="flex items-start gap-4">
                <span className="h-11 w-11 rounded-2xl bg-forest-600 text-white flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">
                    {t('advisory.priorityNow')}
                  </p>
                  <h2 className="mt-1 text-[18px] font-semibold text-charcoal-800 tracking-tightish">
                    {t(actionSection.key)}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-[1.65] text-charcoal-700 text-pretty">
                    {t(actionSection.bodyKey)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-5">
            {midSections.map((section, i) => {
              const Icon = SECTION_ICONS[section.id] || Sprout;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: easeOut, delay: i * 0.06 }}
                >
                  <Card className="p-5 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-9 w-9 rounded-xl bg-cream-100 text-charcoal-700 flex items-center justify-center">
                        <Icon className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      <h3 className="text-[15px] font-semibold text-charcoal-800 tracking-tightish">
                        {t(section.key)}
                      </h3>
                    </div>
                    <p className="text-[13.5px] leading-[1.65] text-charcoal-600 text-pretty">
                      {t(section.bodyKey)}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {precautionSection && (
            <div className="rounded-2xl border border-warn-200 bg-warn-50 px-5 py-4 mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-warn-500 mb-1">
                {t(precautionSection.key)}
              </p>
              <p className="text-[14px] leading-[1.65] text-charcoal-800">
                {t(precautionSection.bodyKey)}
              </p>
            </div>
          )}

          {nextSection && (
            <Card className="p-5 sm:p-6 mb-8">
              <div className="flex items-start gap-3">
                <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-charcoal-800">{t(nextSection.key)}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.65] text-charcoal-600">{t(nextSection.bodyKey)}</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 sm:p-7 mb-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                <Sprout className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <h3 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">{t('advisory.planSummary')}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                  <MapPin className="h-3 w-3" strokeWidth={2.4} /> {t('advisory.district')}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-charcoal-800">{farmer.district || '—'}</div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                  <Ruler className="h-3 w-3" strokeWidth={2.4} /> {t('advisory.landSize')}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-charcoal-800">{farmer.landSize || '—'} {t('acres')}</div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                  <Calendar className="h-3 w-3" strokeWidth={2.4} /> {t('advisory.season')}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-charcoal-800">{seasonName(farm.season) || '—'}</div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                  <Sprout className="h-3 w-3" strokeWidth={2.4} /> {t('plan.crop')}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-forest-700">{cropLabel}</div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button size="lg" onClick={() => navigate('/harvest-market')}>
              {t('advisory.continue')}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Advisory;
