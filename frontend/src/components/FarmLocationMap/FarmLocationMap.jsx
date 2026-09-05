import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, LocateFixed } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const easeOut = [0.22, 1, 0.36, 1];

const DISTRICT_PINS = [
  { name: 'Nashik', x: 42, y: 26 },
  { name: 'Pune', x: 30, y: 58 },
  { name: 'Nagpur', x: 82, y: 42 },
  { name: 'Kolhapur', x: 26, y: 82 },
];

const FarmLocationMap = ({ selected, onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-charcoal-700">
          <LocateFixed className="h-4 w-4 text-forest-600" strokeWidth={2.3} />
          {t('onboard.farmLocation')}
        </div>
        <span
          className={[
            'pill',
            selected
              ? 'bg-forest-50 text-forest-700 border-forest-200'
              : 'bg-cream-100 text-charcoal-400 border-charcoal-100',
          ].join(' ')}
        >
          <span
            className={[
              'h-1.5 w-1.5 rounded-full',
              selected ? 'bg-forest-500' : 'bg-charcoal-300',
            ].join(' ')}
          />
          {selected ? selected : t('onboard.selectOnMap')}
        </span>
      </div>
      <p className="text-[12.5px] leading-[1.6] text-charcoal-400 mb-4">
        {t('onboard.mapHint')}
      </p>

      <div className="relative w-full max-w-[420px] mx-auto aspect-square sm:aspect-[5/4]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" role="img" aria-label="Maharashtra district map">
          <defs>
            <linearGradient id="stateFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#eef7ef" />
              <stop offset="100%" stopColor="#e2efe3" />
            </linearGradient>
          </defs>
          <path
            d="M18,20 L60,10 L84,18 L90,38 L84,58 L72,74 L56,92 L34,88 L22,74 L12,48 Z"
            fill="url(#stateFill)"
            stroke="#4d7c5f"
            strokeWidth="0.6"
            strokeLinejoin="round"
            opacity="0.9"
          />
          {DISTRICT_PINS.map((pin, i) => {
            const active = selected === pin.name;
            return (
              <g
                key={pin.name}
                transform={`translate(${pin.x}, ${pin.y})`}
                onClick={() => onSelect?.(pin.name)}
                className="cursor-pointer"
                role="button"
                aria-label={`Select ${pin.name}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect?.(pin.name);
                  }
                }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r={active ? 4.4 : 3.2}
                  fill={active ? '#2f6b43' : '#ffffff'}
                  stroke={active ? '#d3e6d6' : '#2f6b43'}
                  strokeWidth="1.1"
                />
                <motion.circle
                  cx="0"
                  cy="0"
                  r={active ? 6.4 : 5.2}
                  fill="none"
                  stroke="#2f6b43"
                  strokeWidth="0.35"
                  animate={{ r: active ? [6.4, 9, 6.4] : [5.2, 6.6, 5.2], opacity: [0.9, 0.2, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}
                />
                <text
                  x="6.5"
                  y="-3"
                  fontSize="4.6"
                  fontWeight={active ? 700 : 500}
                  fill={active ? '#1c452c' : '#3c4a41'}
                  className="select-none"
                >
                  {pin.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {DISTRICT_PINS.map((pin) => {
          const active = selected === pin.name;
          return (
            <button
              key={pin.name}
              type="button"
              onClick={() => onSelect?.(pin.name)}
              className={[
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold border transition-all duration-200',
                active
                  ? 'border-forest-500 bg-forest-50 text-forest-700'
                  : 'border-charcoal-200 bg-white text-charcoal-600 hover:border-forest-300 hover:text-forest-700',
              ].join(' ')}
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.4} />
              {pin.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FarmLocationMap;
