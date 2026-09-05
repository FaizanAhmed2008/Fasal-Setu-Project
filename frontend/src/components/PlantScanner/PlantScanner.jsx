import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  X,
  CheckCircle,
  AlertTriangle,
  Upload,
  RotateCcw,
  BellPlus,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import Button from '../ui/Button';
import GrowthAnalysis from './GrowthAnalysis';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';
import apiService from '../../services/api';
import { getErrorMessage } from '../../services/errors';

const EASE = [0.22, 1, 0.36, 1];

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/bmp',
  'image/gif',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const STAGE_KEYS = [
  'scanner.stage1',
  'scanner.stage2',
  'scanner.stage3',
  'scanner.stage4',
  'scanner.stage5',
];

const PlantScanner = ({ isOpen, onClose, cropName, onAnalyzed }) => {
  const { addScannerAlert } = useFarmerState();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [state, setState] = useState('idle');
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileError, setFileError] = useState('');
  const [addedAlert, setAddedAlert] = useState(false);

  useEffect(() => {
    if (state !== 'analyzing') return;
    const id = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGE_KEYS.length - 2));
    }, 800);
    return () => clearInterval(id);
  }, [state]);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setState('idle');
    setStage(0);
    setResult(null);
    setErrorMsg('');
    setFileError('');
    setAddedAlert(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setFile(null);
      setPreview(null);
      setFileError(t('scanner.errFileType'));
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFile(null);
      setPreview(null);
      setFileError(t('scanner.errFileSize'));
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setState('idle');
    setStage(0);
    setResult(null);
    setErrorMsg('');
    setFileError('');
    setAddedAlert(false);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setState('analyzing');
    setStage(0);
    setErrorMsg('');
    setResult(null);
    setAddedAlert(false);

    try {
      const data = await apiService.diagnosePlant(cropName, file, (e) => {
        if (e.total > 0 && e.loaded >= e.total) {
          setStage((s) => Math.max(s, 1));
        }
      });

      setStage(STAGE_KEYS.length - 1);

      if (!data || data.status === 'error') {
        const msg =
          data?.recommended_action ||
          data?.confidence_note ||
          t('scanner.errGeneric');
        setTimeout(() => {
          setErrorMsg(String(msg));
          setState('error');
        }, 650);
        return;
      }

      setTimeout(() => {
        setResult(data);
        setState('result');
        onAnalyzed?.(data);
      }, 650);
    } catch (err) {
      setStage(STAGE_KEYS.length - 1);
      setTimeout(() => {
        setErrorMsg(
          getErrorMessage(err, t('scanner.errBackend'))
        );
        setState('error');
      }, 400);
    }
  };

  const handleAddAlert = () => {
    if (!result || addedAlert) return;
    addScannerAlert({
      id: `scanner-${Date.now()}`,
      type: 'pest',
      crop: cropName,
      message: result.issue_name || t('scanner.issueGeneric'),
      action: result.recommended_action || '',
      source: 'scanner',
      date: new Date().toISOString(),
    });
    setAddedAlert(true);
  };

  const pickPhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50 bg-charcoal-900/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="pointer-events-auto w-full max-w-md sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream-50 border border-charcoal-100 shadow-elev"
            >
              <div className="relative px-5 pt-5 pb-6 sm:p-6">
                <button
                  onClick={handleClose}
                  aria-label={t('scanner.close')}
                  className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-charcoal-500 hover:bg-cream-200 hover:text-charcoal-800 transition-colors"
                >
                  <X className="h-5 w-5" strokeWidth={2.2} />
                </button>

                <h2 className="font-heading text-lg font-bold text-charcoal-800 tracking-tightish">
                  {t('scanner.title')}
                </h2>
                <p className="mt-1 text-[13.5px] text-charcoal-500 leading-snug">
                  {t('scanner.subtitle', { crop: cropName })}
                </p>

                {state === 'idle' && (
                  <div className="mt-5">
                    {!file ? (
                      <>
                        <button
                          onClick={pickPhoto}
                          className="w-full rounded-2xl border-2 border-dashed border-forest-300 bg-forest-50/50 hover:bg-forest-100 hover:border-forest-400 transition-colors px-6 py-10 flex flex-col items-center justify-center"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-100 text-forest-600">
                            <Camera className="h-7 w-7" strokeWidth={1.8} />
                          </div>
                          <span className="mt-4 text-[15px] font-semibold text-forest-700">
                            {t('scanner.uploadTitle')}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-charcoal-500">
                            <Upload className="h-4 w-4" strokeWidth={2} />
                            {t('scanner.uploadBtn')}
                          </span>
                        </button>

                        <p className="mt-3 text-center text-[13px] text-charcoal-500">
                          {t('scanner.hint')}
                        </p>
                      </>
                    ) : (
                      <div>
                        {preview && (
                          <div className="relative overflow-hidden rounded-2xl border border-charcoal-100">
                            <img
                              src={preview}
                              alt={t('scanner.leafPreview')}
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        )}

                        <div className="mt-4 text-[12px] text-charcoal-400 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 min-w-0">
                            <ImageIcon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.2} />
                            <span className="truncate">{file.name}</span>
                          </span>
                          <span className="flex-shrink-0">
                            {Math.round(file.size / 1024)} KB
                          </span>
                        </div>

                        <Button
                          size="lg"
                          className="w-full mt-4 gap-2"
                          onClick={handleAnalyze}
                        >
                          <Sparkles className="h-4 w-4" strokeWidth={2.3} />
                          {t('scanner.analyze')}
                        </Button>
                        <button
                          type="button"
                          onClick={pickPhoto}
                          className="mt-2 w-full text-center text-[12.5px] font-semibold text-charcoal-500 hover:text-charcoal-700 transition-colors"
                        >
                          {t('scanner.changePhoto')}
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-[12.5px] text-danger-600">
                        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                        <span>{fileError}</span>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      className="hidden"
                      onChange={handleFile}
                    />
                  </div>
                )}

                {state === 'analyzing' && (
                  <div className="mt-6">
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="relative flex h-28 w-28 items-center justify-center">
                        <motion.span
                          className="absolute inset-0 rounded-full border-2 border-forest-300/50"
                          animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <motion.span
                          className="absolute inset-3 rounded-full border-2 border-forest-400/50"
                          animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-600 text-white"
                        >
                          <Sparkles className="h-6 w-6" strokeWidth={2} />
                        </motion.div>
                      </div>
                    </div>

                    <div className="space-y-2.5 mt-4">
                      {STAGE_KEYS.map((key, i) => {
                        const label = t(key);
                        const active = i === stage;
                        const done = i < stage;
                        return (
                          <motion.div
                            key={label}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                            className={[
                              'flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-300',
                              active
                                ? 'border-forest-300 bg-forest-50'
                                : done
                                ? 'border-charcoal-100 bg-white'
                                : 'border-charcoal-100 bg-white/50 opacity-50',
                            ].join(' ')}
                          >
                            <span
                              className={[
                                'inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                                done ? 'bg-forest-600 text-white' : 'bg-charcoal-100 text-charcoal-400',
                              ].join(' ')}
                            >
                              {done ? (
                                <CheckCircle className="h-3.5 w-3.5" strokeWidth={3} />
                              ) : active ? (
                                <motion.span
                                  className="h-2.5 w-2.5 rounded-full bg-forest-500 border-2 border-forest-200"
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                                />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-charcoal-300" />
                              )}
                            </span>
                            <span
                              className={[
                                'text-[13.5px] font-medium',
                                active ? 'text-forest-700' : done ? 'text-charcoal-700' : 'text-charcoal-400',
                              ].join(' ')}
                            >
                              {label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {state === 'result' && result && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={result.status}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="mt-5"
                    >
                      {preview && (
                        <img
                          src={preview}
                          alt={t('scanner.leafPreview')}
                          className="mb-4 h-44 w-full object-cover rounded-2xl border border-charcoal-100"
                        />
                      )}

                      <GrowthAnalysis result={result} t={t} />

                      <Button
                        onClick={handleAddAlert}
                        variant={addedAlert ? 'secondary' : 'primary'}
                        size="sm"
                        className="mt-4 w-full"
                      >
                        {addedAlert ? (
                          <>
                            <CheckCircle className="h-4 w-4" strokeWidth={2.2} />
                            {t('scanner.addedAlert')}
                          </>
                        ) : (
                          <>
                            <BellPlus className="h-4 w-4" strokeWidth={2.2} />
                            {t('scanner.addAlert')}
                          </>
                        )}
                      </Button>

                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={reset}
                        >
                          <RotateCcw className="h-4 w-4" strokeWidth={2.2} />
                          {t('scanner.scanAnother')}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1" onClick={handleClose}>
                          {t('scanner.done')}
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {state === 'error' && (
                  <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-100 text-danger-600">
                      <AlertTriangle className="h-7 w-7" strokeWidth={1.9} />
                    </div>
                    <h3 className="mt-4 text-[16px] font-bold text-charcoal-800">
                      {t('scanner.errTitle')}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-charcoal-500 max-w-xs">
                      {errorMsg || t('scanner.errGeneric')}
                    </p>
                    <div className="mt-5 flex gap-2">
                      <Button variant="primary" size="sm" onClick={handleAnalyze}>
                        <RotateCcw className="h-4 w-4" strokeWidth={2.2} />
                        {t('scanner.retry')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setState('idle');
                          setFile(null);
                          setPreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        {t('scanner.chooseAnother')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlantScanner;
