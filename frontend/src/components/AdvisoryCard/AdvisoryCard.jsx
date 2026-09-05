import React from 'react';
import { CloudRain, Bug, Sprout, Bell } from 'lucide-react';
import Card from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

const AdvisoryCard = ({ type, message, action }) => {
  const { t } = useLanguage();

  const config = {
    weather: {
      icon: CloudRain,
      bg: 'bg-info-50',
      text: 'text-info-600',
      dot: 'bg-info-500',
      labelKey: 'advisoryCard.weather',
    },
    pest: {
      icon: Bug,
      bg: 'bg-warn-50',
      text: 'text-warn-500',
      dot: 'bg-warn-500',
      labelKey: 'advisoryCard.pest',
    },
    default: {
      icon: Sprout,
      bg: 'bg-forest-50',
      text: 'text-forest-600',
      dot: 'bg-forest-500',
      labelKey: 'advisoryCard.cropTip',
    },
  };

  const c = config[type?.toLowerCase()] || config.default;
  const Icon = c.icon;

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className={`h-10 w-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}>
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`pill ${c.bg} ${c.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
              {t(c.labelKey)}
            </span>
          </div>
          <p className="mt-2 text-[14.5px] font-semibold text-charcoal-800 leading-snug">
            {message}
          </p>
          {action && (
            <p className="mt-1.5 text-[12.5px] text-charcoal-500 leading-[1.55]">
              <span className="font-semibold text-charcoal-700">{t('advisoryCard.action')}:</span> {action}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AdvisoryCard;
