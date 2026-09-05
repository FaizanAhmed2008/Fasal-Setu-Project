import React from 'react';
import { motion } from 'framer-motion';

const riskMap = {
  high: {
    ring: '#D96666',
    bg: '#FDECEC',
    text: '#B94E4E',
    dot: 'bg-danger-500',
  },
  medium: {
    ring: '#D08A3F',
    bg: '#FBF3E6',
    text: '#A36930',
    dot: 'bg-warn-500',
  },
  low: {
    ring: '#3F7E4A',
    bg: '#ECFDF5',
    text: '#264F2D',
    dot: 'bg-forest-500',
  },
};

const sizes = {
  sm: { px: 96, stroke: 6, r: 38, val: 'text-[20px]' },
  md: { px: 128, stroke: 8, r: 50, val: 'text-[28px]' },
  lg: { px: 160, stroke: 10, r: 64, val: 'text-[36px]' },
};

const RiskGauge = ({ riskLevel = 'low', riskScore = 0, size = 'md' }) => {
  const s = sizes[size] || sizes.md;
  const tone = riskMap[riskLevel?.toLowerCase()] || riskMap.low;
  const C = 2 * Math.PI * s.r;
  const dash = C - (Math.max(0, Math.min(100, riskScore)) / 100) * C;
  const center = s.px / 2;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{ width: s.px, height: s.px, background: tone.bg }}
      >
        <svg
          viewBox={`0 0 ${s.px} ${s.px}`}
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={s.r}
            stroke="#E8E8E6"
            strokeWidth={s.stroke}
            fill="none"
          />
          <motion.circle
            cx={center}
            cy={center}
            r={s.r}
            stroke={tone.ring}
            strokeWidth={s.stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: dash }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="text-center">
          <div className={`${s.val} font-bold tracking-tighter2 leading-none`} style={{ color: tone.text }}>
            {riskScore}
          </div>
          <div className="text-[10px] font-semibold text-charcoal-400 mt-0.5">/ 100</div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
