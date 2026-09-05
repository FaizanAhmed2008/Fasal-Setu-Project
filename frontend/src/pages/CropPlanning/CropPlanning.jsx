import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sprout, Droplets, Leaf, Check, Calendar, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const CROP_DURATIONS = {
  Tomato: 75,
  Onion: 100,
  Wheat: 120,
  Cotton: 150,
};

const getDuration = (cropName) => {
  if (!cropName) return 90;
  const match = Object.keys(CROP_DURATIONS).find(
    (key) => key.toLowerCase() === cropName.toLowerCase()
  );
  return match ? CROP_DURATIONS[match] : 90;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date) =>
  date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatShortDate = (date) =>
  date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

const TIMELINE_STEPS = [
  {
    labelKey: 'plan.stepSeed',
    icon: Sprout,
    dayOffset: 0,
    tagKey: 'plan.tagDay1',
  },
  {
    labelKey: 'plan.stepSowing',
    icon: Leaf,
    dayOffset: 7,
    tagKey: 'plan.tagWeek1',
  },
  {
    labelKey: 'plan.stepFert1',
    icon: Droplets,
    dayOffset: 30,
    tagKey: 'plan.tagWeek4',
  },
  {
    labelKey: 'plan.stepFert2',
    icon: Droplets,
    dayOffset: 60,
    tagKey: 'plan.tagWeek8',
  },
];

const CropPlanning = () => {
  const navigate = useNavigate();
  const { chosenCrop } = useFarmerState();
  const { t } = useLanguage();

  const cropName = chosenCrop?.crop || 'Tomato';
  const duration = getDuration(cropName);
  const today = useMemo(() => new Date(), []);

  const harvestDate = addDays(today, duration);
  const sowingStart = addDays(today, 1);
  const sowingEnd = addDays(today, 10);

  const timelineSteps = TIMELINE_STEPS.map((step) => ({
    ...step,
    label: t(step.labelKey),
    tag: t(step.tagKey),
    date: addDays(today, step.dayOffset),
  }));

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/crop-recommendation" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={5} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <div className="label-eyebrow mb-3">{t('plan.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl text-balance mb-3">
              {t('plan.title')}
            </h1>
            <p className="text-[15.5px] leading-[1.6] text-charcoal-500 text-pretty max-w-xl">
              {t('plan.subtitle', { crop: cropName })}
            </p>
          </div>

          {/* Key info strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              {
                icon: Sprout,
                label: t('plan.crop'),
                value: cropName,
                accent: true,
              },
              {
                icon: Calendar,
                label: t('plan.sowingWindow'),
                value: t('plan.sowingWindowValue'),
              },
              {
                icon: Leaf,
                label: t('plan.harvestBy'),
                value: formatDate(harvestDate),
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: easeOut, delay: 0.15 + i * 0.07 }}
              >
                <Card className="p-4 flex items-center gap-3">
                  <span
                    className={[
                      'h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      item.accent
                        ? 'bg-forest-100 text-forest-700'
                        : 'bg-cream-100 text-charcoal-600',
                    ].join(' ')}
                  >
                    <item.icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                  </span>
                  <div>
                    <div className="text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                      {item.label}
                    </div>
                    <div
                      className={[
                        'text-[15px] font-semibold mt-0.5',
                        item.accent ? 'text-forest-700' : 'text-charcoal-800',
                      ].join(' ')}
                    >
                      {item.value}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <Card className="p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-2 mb-7">
              <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                <Calendar className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <h2 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">
                {t('plan.seasonTimeline')}
              </h2>
              <span className="ml-auto pill bg-forest-50 text-forest-700">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                {t('plan.days', { n: duration })}
              </span>
            </div>

            {/* Desktop: horizontal timeline */}
            <div className="hidden sm:block">
              <div className="relative flex items-start justify-between">
                {/* Connecting line */}
                <div className="absolute top-[22px] left-[calc(12.5%)] right-[calc(12.5%)] h-[2px] bg-charcoal-200" />
                <div
                  className="absolute top-[22px] left-[calc(12.5%)] h-[2px] bg-forest-400"
                  style={{ width: '75%' }}
                />

                {timelineSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isFirst = i === 0;
                  return (
                    <motion.div
                      key={step.label}
                      className="relative flex flex-col items-center z-10"
                      style={{ width: '25%' }}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: easeOut,
                        delay: 0.3 + i * 0.12,
                      }}
                    >
                      {/* Node */}
                      <motion.div
                        className={[
                          'h-11 w-11 rounded-full flex items-center justify-center border-[2.5px] transition-colors',
                          isFirst
                            ? 'border-forest-500 bg-forest-600 text-white shadow-glow'
                            : 'border-forest-300 bg-white text-forest-700',
                        ].join(' ')}
                        initial={isFirst ? { scale: 0.8 } : {}}
                        animate={isFirst ? { scale: [1, 1.12, 1] } : {}}
                        transition={
                          isFirst
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: 'easeInOut',
                              }
                            : {}
                        }
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                      </motion.div>

                      {/* Label */}
                      <div className="mt-3 text-center px-1">
                        <div className="text-[13px] font-semibold text-charcoal-800 leading-tight">
                          {step.label}
                        </div>
                        <div className="text-[11.5px] text-charcoal-400 mt-1 font-medium">
                          {step.tag}
                        </div>
                        <div className="text-[11px] text-charcoal-400">
                          {formatShortDate(step.date)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="sm:hidden space-y-0">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon;
                const isFirst = i === 0;
                const isLast = i === timelineSteps.length - 1;
                return (
                  <motion.div
                    key={step.label}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                      delay: 0.3 + i * 0.1,
                    }}
                  >
                    {/* Node column */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={[
                          'h-10 w-10 rounded-full flex items-center justify-center border-[2.5px] flex-shrink-0',
                          isFirst
                            ? 'border-forest-500 bg-forest-600 text-white shadow-glow'
                            : 'border-forest-300 bg-white text-forest-700',
                        ].join(' ')}
                        initial={isFirst ? { scale: 0.8 } : {}}
                        animate={isFirst ? { scale: [1, 1.1, 1] } : {}}
                        transition={
                          isFirst
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: 'easeInOut',
                              }
                            : {}
                        }
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.2} />
                      </motion.div>
                      {!isLast && (
                        <div className="w-[2px] flex-1 min-h-[28px] bg-forest-300 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={['pb-6 pt-1.5', isLast ? 'pb-0' : ''].join(' ')}>
                      <div className="text-[14px] font-semibold text-charcoal-800">
                        {step.label}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] font-medium text-charcoal-400">
                          {step.tag}
                        </span>
                        <span className="text-charcoal-300">·</span>
                        <span className="text-[12px] text-charcoal-400">
                          {formatShortDate(step.date)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.7 }}
          >
            <Card className="p-6 sm:p-7 mb-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                  <Check className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <h3 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">
                  {t('plan.keyDates')}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-charcoal-100 bg-cream-50 px-4 py-3.5">
                  <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                    <Sprout className="h-3 w-3" strokeWidth={2.4} /> {t('plan.crop')}
                  </div>
                  <div className="mt-1 text-[15px] font-semibold text-forest-700">
                    {cropName}
                  </div>
                </div>
                <div className="rounded-xl border border-charcoal-100 bg-cream-50 px-4 py-3.5">
                  <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                    <Calendar className="h-3 w-3" strokeWidth={2.4} /> {t('plan.today')}
                  </div>
                  <div className="mt-1 text-[15px] font-semibold text-charcoal-800">
                    {formatDate(today)}
                  </div>
                </div>
                <div className="rounded-xl border border-charcoal-100 bg-cream-50 px-4 py-3.5">
                  <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                    <Leaf className="h-3 w-3" strokeWidth={2.4} /> {t('plan.sowingWindow')}
                  </div>
                  <div className="mt-1 text-[15px] font-semibold text-charcoal-800">
                    {formatShortDate(sowingStart)} – {formatShortDate(sowingEnd)}
                  </div>
                </div>
                <div className="rounded-xl border border-charcoal-100 bg-cream-50 px-4 py-3.5">
                  <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                    <Check className="h-3 w-3" strokeWidth={2.4} /> {t('plan.harvestDate')}
                  </div>
                  <div className="mt-1 text-[15px] font-semibold text-charcoal-800">
                    {formatDate(harvestDate)}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/advisory')}
              className="sm:w-auto"
            >
              {t('plan.startSeason')}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/crop-recommendation')}
              className="sm:w-auto"
            >
              {t('plan.changeCrop')}
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default CropPlanning;
