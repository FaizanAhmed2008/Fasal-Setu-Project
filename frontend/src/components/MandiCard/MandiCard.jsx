import React from 'react';
import { Truck, MapPin, TrendingUp, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

const Stat = ({ label, value, accent }) => (
  <div>
    <div className="text-[10.5px] font-semibold uppercase tracking-wider text-charcoal-400">
      {label}
    </div>
    <div className={`text-[15px] font-bold tracking-tightish mt-0.5 ${accent || 'text-charcoal-800'}`}>
      {value}
    </div>
  </div>
);

const MandiCard = ({
  name,
  distance,
  marketPrice,
  transportCost,
  netPrice,
  isBest = false,
}) => {
  const { t } = useLanguage();

  return (
    <Card
      hover
      className={`relative p-5 ${isBest ? 'ring-1 ring-forest-300 bg-forest-50/40' : ''}`}
    >
      {isBest && (
        <div className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-forest-600 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase shadow-soft">
          <Sparkles className="h-3 w-3" strokeWidth={2.4} />
          {t('mandi.bestNetPrice')}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[17px] font-semibold text-charcoal-800 tracking-tightish">
          {name}
        </h4>
        <span className="inline-flex items-center gap-1 text-[12px] text-charcoal-500">
          <Truck className="h-3 w-3" strokeWidth={2.3} />
          {distance} {t('unit.km')}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-charcoal-100">
        <Stat label={t('mandi.market')} value={`₹${marketPrice?.toLocaleString()}`} />
        <Stat label={t('mandi.transport')} value={`₹${transportCost?.toLocaleString()}`} />
        <Stat
          label={t('mandi.netPrice')}
          value={`₹${netPrice?.toLocaleString()}`}
          accent={isBest ? 'text-forest-700' : 'text-charcoal-800'}
        />
      </div>
    </Card>
  );
};

export default MandiCard;
