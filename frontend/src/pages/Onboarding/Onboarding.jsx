import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  MapPin,
  Ruler,
  Globe,
  ArrowRight,
  AlertCircle,
  Zap,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FarmLocationMap from '../../components/FarmLocationMap/FarmLocationMap';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { useFarmerState } from '../../context/FarmerStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { LANG_CODES, LANG_NAMES } from '../../i18n/translations';
import apiService from '../../services/api';

const FALLBACK_DISTRICTS = ['Nashik', 'Pune', 'Nagpur', 'Kolhapur'];
const langLabel = (code) => (LANG_NAMES.find((l) => l.code === code)?.label ?? code);

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

const Onboarding = () => {
  const navigate = useNavigate();
  const { setFarmer } = useFarmerState();
  const { lang, setLanguage, t } = useLanguage();

  const [districts, setDistricts] = useState(FALLBACK_DISTRICTS);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    landSize: '',
    language: lang,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    apiService.getDistricts()
      .then((data) => {
        if (data?.districts?.length) setDistricts(data.districts);
      })
      .catch(() => {});
  }, []);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, [field]: value }));
    if (field === 'language') setLanguage(value);
  };

  const handleDemo = () => {
    setFormData({
      name: 'Ramesh Patil',
      phone: '9876543210',
      district: 'Nashik',
      landSize: '2',
      language: lang,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.district || !formData.landSize) {
      setError(t('onboard.errRequired'));
      return;
    }

    const landSize = parseFloat(formData.landSize);
    if (isNaN(landSize) || landSize <= 0) {
      setError(t('onboard.errLandSize'));
      return;
    }

    setFarmer({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      district: formData.district,
      landSize: landSize,
      language: formData.language,
    });

    navigate('/farm-input');
  };

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={0} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8 text-center sm:text-left">
            <div className="label-eyebrow mb-3">{t('onboard.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl text-balance">
              {t('onboard.title')}
            </h1>
            <p className="mt-3 text-[15.5px] leading-[1.6] text-charcoal-500 text-pretty">
              {t('onboard.subtitle')}
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
              <Field label={t('onboard.name')} icon={User}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder={t('onboard.namePlaceholder')}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label={t('onboard.phone')} icon={Phone}>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  placeholder={t('onboard.phonePlaceholder')}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label={t('onboard.district')} icon={MapPin}>
                <select
                  value={formData.district}
                  onChange={handleChange('district')}
                  className={inputCls + ' appearance-none pr-10 bg-no-repeat'}
                  required
                >
                  <option value="">{t('onboard.selectDistrict')}</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>

              <FarmLocationMap
                selected={formData.district}
                onSelect={(district) =>
                  setFormData((p) => ({ ...p, district }))
                }
              />

              <Field label={t('onboard.landSize')} icon={Ruler}>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.landSize}
                    onChange={handleChange('landSize')}
                    placeholder={t('onboard.landSizePlaceholder')}
                    step="0.1"
                    min="0.1"
                    className={inputCls}
                    required
                  />
                  <span className="flex-shrink-0 rounded-xl border border-charcoal-200 bg-cream-100 px-4 py-3 text-[14.5px] font-semibold text-charcoal-600">
                    {t('acres')}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] text-charcoal-400">
                  {t('onboard.landSizeHint')}
                </p>
              </Field>

              <Field label={t('onboard.language')} icon={Globe}>
                <select
                  value={formData.language}
                  onChange={handleChange('language')}
                  className={inputCls + ' appearance-none pr-10 bg-no-repeat'}
                  required
                >
                  {LANG_CODES.map((code) => (
                    <option key={code} value={code}>
                      {langLabel(code)}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="pt-2 space-y-3">
                <Button type="submit" size="lg" className="w-full">
                  {t('onboard.submit')}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={handleDemo}
                >
                  <Zap className="h-4 w-4" strokeWidth={2.2} />
                  {t('onboard.demo')}
                </Button>
              </div>
            </form>
          </Card>

          <p className="mt-5 text-center text-[12px] text-charcoal-400">
            {t('onboard.privacy')}
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Onboarding;
