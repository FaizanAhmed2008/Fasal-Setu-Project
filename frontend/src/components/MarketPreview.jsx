import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Truck, Sparkles, Calendar } from 'lucide-react';
import { SectionWrap, SectionHeading } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const MANDIS = [
  {
    name: 'Pune Mandi',
    distanceKm: 42,
    price: '₹2,850',
    net: '₹2,640',
    best: true,
    arrival: 'Moderate',
    arrivalKey: 'landing.marketModerate',
  },
  {
    name: 'Nashik Mandi',
    distanceKm: 71,
    price: '₹2,920',
    net: '₹2,565',
    arrival: 'Low',
    arrivalKey: 'landing.marketLow',
  },
  {
    name: 'Ahmednagar Mandi',
    distanceKm: 55,
    price: '₹2,760',
    net: '₹2,485',
    arrival: 'High',
    arrivalKey: 'landing.marketHigh',
  },
];

const arrivalTone = {
  Low: 'bg-forest-50 text-forest-700',
  Moderate: 'bg-amber-muted/15 text-amber-muted',
  High: 'bg-danger-50 text-danger-600',
};

const MarketPreview = () => {
  const { t } = useLanguage();
  return (
    <SectionWrap id="market" className="py-20 sm:py-28 bg-white">
      <SectionHeading
        align="center"
        eyebrow={t('landing.marketEyebrow')}
        title={
          <>
            {t('landing.marketTitle1')}
            <br className="hidden sm:block" />
            <span className="text-forest-600">{t('landing.marketTitle2')}</span>
          </>
        }
        lead={t('landing.marketLead')}
      />

      <div className="mt-14 sm:mt-16 grid lg:grid-cols-[1.2fr_1fr] gap-5 lg:gap-6 max-w-5xl mx-auto">
        {/* Mandi comparison card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="rounded-3xl border border-charcoal-100 bg-white shadow-soft overflow-hidden"
        >
          <div className="px-6 sm:px-7 py-5 border-b border-charcoal-100 flex items-center justify-between">
            <div>
              <div className="label-eyebrow">{t('landing.marketCompareLabel')}</div>
              <div className="mt-1 text-[15px] font-semibold text-charcoal-800 tracking-tightish">{t('landing.marketRegion', { crop: t('crop.Tomato') })}</div>
            </div>
            <span className="pill bg-forest-50 text-forest-700">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
              {t('landing.marketLive')}
            </span>
          </div>

          <div className="px-2 sm:px-3 py-2">
            {MANDIS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: easeOut, delay: i * 0.08 }}
                className={[
                  'flex items-center gap-3 sm:gap-4 rounded-2xl px-4 py-3.5 transition-colors',
                  m.best ? 'bg-forest-50/60 border border-forest-100' : 'hover:bg-cream-50',
                ].join(' ')}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-charcoal-800 truncate">{m.name}</span>
                    {m.best && (
                      <span className="pill bg-forest-600 text-white text-[9.5px] tracking-wider">
                        <Sparkles className="h-2.5 w-2.5" strokeWidth={2.6} />
                        {t('landing.marketBestNet')}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[12px] text-charcoal-500">
                    <span className="flex items-center gap-1"><Truck className="h-3 w-3" strokeWidth={2.2} />{m.distanceKm} {t('unit.km')}</span>
                    <span className="flex items-center gap-1">
                      <span className={`pill text-[9.5px] ${arrivalTone[m.arrival]}`}>{t(m.arrivalKey)} {t('landing.marketArrival')}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-charcoal-400">{t('landing.marketNet')}</div>
                  <div className={`text-[18px] font-bold tracking-tighter2 leading-none ${m.best ? 'text-forest-700' : 'text-charcoal-800'}`}>{m.net}</div>
                  <div className="mt-0.5 text-[11.5px] text-charcoal-400">{t('landing.marketQuoted', { price: m.price })}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-6 sm:px-7 py-4 border-t border-charcoal-100 flex items-center justify-between text-[12.5px] text-charcoal-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-forest-500" strokeWidth={2.3} />
              {t('landing.marketWithin')}
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-amber-muted" strokeWidth={2.3} />
              {t('landing.marketUpdated')}
            </div>
          </div>
        </motion.div>

        {/* Sell window side card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="rounded-3xl border border-charcoal-100 bg-gradient-to-br from-forest-50/60 to-cream-50 p-6 sm:p-7 shadow-soft">
            <div className="label-eyebrow text-forest-600">{t('market.sellWindow')}</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[40px] sm:text-[44px] font-bold tracking-tighter2 text-charcoal-800 leading-none">10–14</span>
              <span className="text-[15px] font-semibold text-charcoal-500">{t('landing.marketDays')}</span>
            </div>
            <p className="mt-3 text-[14px] leading-[1.6] text-charcoal-500 text-pretty">
              {t('landing.marketWindowBody')}
            </p>
            <div className="mt-5 grid grid-cols-7 gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => {
                const inWindow = i >= 3 && i <= 12;
                return (
                  <div
                    key={i}
                    className={[
                      'h-7 rounded-md transition-colors',
                      inWindow ? 'bg-forest-500/80' : 'bg-charcoal-100',
                    ].join(' ')}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-charcoal-400">
              <span>{t('plan.today')}</span>
              <span>{t('landing.marketRecWindow')}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-charcoal-100 bg-white p-6 sm:p-7">
            <div className="label-eyebrow">{t('landing.marketMeans')}</div>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-charcoal-500 text-pretty">
              {t('landing.marketMeansBody')}
            </p>
            <div className="mt-5 flex items-center gap-2 text-[12.5px] text-forest-600 font-medium">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2.3} />
              {t('landing.marketPlanSeason')}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  );
};

export default MarketPreview;
