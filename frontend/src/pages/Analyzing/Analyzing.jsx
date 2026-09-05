import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, AlertTriangle, Sprout, Check, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import { PageNav } from '../../components/ui/PageChrome';
import { apiService } from '../../services/api';
import { getErrorMessage } from '../../services/errors';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const MESSAGE_KEYS = [
  'analyzing.m1',
  'analyzing.m2',
  'analyzing.m3',
  'analyzing.m4',
  'analyzing.m5',
];

const MESSAGE_INTERVAL = 800;
const MIN_LOADING_MS = 2500;

const Analyzing = () => {
  const navigate = useNavigate();
  const { farmer, farm, setRecommendations } = useFarmerState();
  const { t } = useLanguage();

  const [messageIndex, setMessageIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error' | 'missing'

  const retryRef = useRef(0);
  const startedRef = useRef(false);

  const runAnalysis = useCallback(async () => {
    const district = (farmer?.district || '').trim();
    const season = (farm?.season || '').trim();
    const landSizeNum = parseFloat(farmer?.landSize);

    if (!district || !season || !Number.isFinite(landSizeNum) || landSizeNum <= 0) {
      setStatus('missing');
      return;
    }

    setError('');
    setStatus('loading');
    setStepIndex(0);
    setMessageIndex(0);

    const startedAt = Date.now();
    try {
      const landSize = parseFloat(farmer.landSize);
      const response = await apiService.getRecommendations(farmer.district, landSize, farm.season);
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_LOADING_MS - elapsed);

      await new Promise((resolve) => setTimeout(resolve, wait));

      const recommendations = response?.recommendations || [];
      if (recommendations.length === 0) {
        setStatus('error');
        setError(t('analyzing.errEmpty'));
        return;
      }
      setRecommendations(recommendations);
      setStatus('success');
      navigate('/crop-recommendation');
    } catch (err) {
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_LOADING_MS - elapsed);
      await new Promise((resolve) => setTimeout(resolve, wait));
      setStatus('error');
      setError(
        getErrorMessage(
          err,
          t('analyzing.errBackend')
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmer.district, farmer.landSize, farm.season, navigate, setRecommendations, t]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'loading') return;
    const id = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGE_KEYS.length);
      setStepIndex((prev) => Math.min(prev + 1, MESSAGE_KEYS.length - 1));
    }, MESSAGE_INTERVAL);
    return () => clearInterval(id);
  }, [status]);

  const handleRetry = () => {
    startedRef.current = true;
    retryRef.current += 1;
    runAnalysis();
  };

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800 grain-bg">
      <PageNav />

      <main className="container-x py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="w-full max-w-lg"
        >
          {status === 'error' ? (
            <ErrorState t={t} error={error} onRetry={handleRetry} />
          ) : status === 'missing' ? (
            <MissingState t={t} onBack={() => navigate('/onboarding')} />
          ) : (
            <LoadingState
              t={t}
              message={t(MESSAGE_KEYS[messageIndex])}
              stepIndex={stepIndex}
              status={status}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
};

const LoadingState = ({ message, stepIndex, status, t }) => {
  const done = status === 'success';
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-10">
        <motion.div
          className="absolute -inset-6 rounded-full border-2 border-forest-300/40"
          animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-11 rounded-full border border-forest-200/30"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.05, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-forest-50 to-cream-50 border border-forest-200 flex items-center justify-center shadow-soft">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-forest-600 border-r-forest-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex flex-col items-center">
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: easeOut }}
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-600 text-white shadow-elev"
            >
              {done ? (
                <Check className="h-6 w-6" strokeWidth={2.6} />
              ) : (
                <Sprout className="h-6 w-6" strokeWidth={2.2} />
              )}
            </motion.span>
          </div>
        </div>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tighter2 text-charcoal-800 mb-2">
        {t('analyzing.title')}
      </h1>
      <p className="text-[14.5px] leading-[1.6] text-charcoal-500 mb-8">
        {t('analyzing.subtitle')}
      </p>

      <div className="w-full mb-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="text-[15px] font-medium text-forest-700"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full space-y-2.5">
        {MESSAGE_KEYS.map((key, i) => {
          const m = t(key);
          const isDone = i <= stepIndex;
          const isCurrent = i === stepIndex;
          return (
            <motion.div
              key={m}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeOut, delay: i * 0.08 }}
              className={[
                'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-300',
                isCurrent
                  ? 'border-forest-300 bg-forest-50'
                  : isDone
                  ? 'border-charcoal-100 bg-white'
                  : 'border-charcoal-100 bg-white/50 opacity-50',
              ].join(' ')}
            >
              <span
                className={[
                  'inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                  isDone ? 'bg-forest-600 text-white' : 'bg-charcoal-100 text-charcoal-400',
                ].join(' ')}
              >
                {isDone && !isCurrent ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : isCurrent ? (
                  <motion.span
                    className="h-2.5 w-2.5 rounded-full bg-white border-2 border-forest-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ) : null}
              </span>
              <span
                className={[
                  'text-[13.5px] font-medium',
                  isCurrent ? 'text-forest-700' : isDone ? 'text-charcoal-700' : 'text-charcoal-400',
                ].join(' ')}
              >
                {m}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ErrorState = ({ error, onRetry, t }) => (
  <div className="flex flex-col items-center">
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-50 border border-danger-200"
    >
      <AlertTriangle className="h-7 w-7 text-danger-600" strokeWidth={2.2} />
    </motion.div>

    <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tighter2 text-charcoal-800 mb-3">
      {t('analyzing.errTitle')}
    </h1>
    <p className="text-[14.5px] leading-[1.6] text-charcoal-500 mb-8 max-w-sm text-pretty">
      {error}
    </p>

    <Button onClick={onRetry} size="lg">
      <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
      {t('analyzing.retry')}
    </Button>
  </div>
);

const MissingState = ({ onBack, t }) => (
  <div className="flex flex-col items-center">
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-warn-50 border border-warn-200"
    >
      <AlertTriangle className="h-7 w-7 text-warn-500" strokeWidth={2.2} />
    </motion.div>

    <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tighter2 text-charcoal-800 mb-3">
      {t('analyzing.missingTitle')}
    </h1>
    <p className="text-[14.5px] leading-[1.6] text-charcoal-500 mb-8 max-w-sm text-pretty">
      {t('analyzing.missingMsg')}
    </p>

    <Button onClick={onBack} size="lg">
      <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
      {t('analyzing.missingBtn')}
    </Button>
  </div>
);

export default Analyzing;
