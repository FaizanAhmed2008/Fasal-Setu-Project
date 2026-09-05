import React from 'react';

const Soil = () => (
  <g>
    <ellipse cx="200" cy="240" rx="170" ry="44" fill="#E8DECB" />
    <ellipse cx="200" cy="232" rx="170" ry="40" fill="#F1E7D2" />
    {/* row furrows */}
    {Array.from({ length: 7 }).map((_, i) => {
      const y = 220 + i * 4;
      const r = 168 - i * 4;
      return (
        <ellipse
          key={i}
          cx="200"
          cy={y}
          rx={r}
          ry="2"
          fill="#E5DAC2"
          opacity={0.7}
        />
      );
    })}
  </g>
);

const Row = ({ x, y, plants, color = '#5BA15E' }) => (
  <g>
    {plants.map((p, i) => (
      <g key={i} transform={`translate(${x + i * 18}, ${y})`}>
        <line x1="0" y1="0" x2="0" y2="-14" stroke="#7E6A47" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="-4" cy="-15" rx="6" ry="3.5" fill={color} transform="rotate(-25 -4 -15)" opacity="0.95" />
        <ellipse cx="4" cy="-16" rx="6" ry="3.5" fill={color} transform="rotate(25 4 -16)" opacity="0.95" />
        <circle cx="0" cy="-20" r="2.4" fill={color} opacity="0.9" />
      </g>
    ))}
  </g>
);

const Sun = () => (
  <g>
    <defs>
      <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F4D78E" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#F4D78E" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="320" cy="58" r="60" fill="url(#sunGrad)" />
    <circle cx="320" cy="58" r="14" fill="#F4D78E" opacity="0.55" />
  </g>
);

const HorizonHills = () => (
  <g>
    <path d="M0 180 Q60 150 120 170 T240 168 T360 172 T400 178 L400 220 L0 220 Z" fill="#D7E2D4" opacity="0.6" />
    <path d="M0 198 Q70 178 140 192 T280 192 T400 200 L400 220 L0 220 Z" fill="#C2D3BD" opacity="0.7" />
  </g>
);

export const FieldScene = () => (
  <svg
    viewBox="0 0 400 260"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    aria-hidden="true"
  >
    <HorizonHills />
    <Sun />
    <Soil />
    {/* Crops in rows */}
    <Row x={60} y={206} plants={[0,0,0,0,0,0,0,0,0,0,0,0,0]} color="#5BA15E" />
    <Row x={74} y={216} plants={[0,0,0,0,0,0,0,0,0,0,0,0,0]} color="#6BB46E" />
    <Row x={88} y={226} plants={[0,0,0,0,0,0,0,0,0,0,0,0,0]} color="#5BA15E" />
    {/* taller plant in front */}
    <g transform="translate(200, 232)">
      <line x1="0" y1="0" x2="0" y2="-30" stroke="#7E6A47" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="-6" cy="-26" rx="9" ry="5" fill="#4F8E54" transform="rotate(-25 -6 -26)" />
      <ellipse cx="6" cy="-30" rx="10" ry="5.5" fill="#5BA15E" transform="rotate(25 6 -30)" />
      <ellipse cx="-3" cy="-36" rx="6" ry="3.5" fill="#6BB46E" transform="rotate(-15 -3 -36)" />
      <circle cx="0" cy="-42" r="3" fill="#7BC380" />
    </g>
  </svg>
);

export const TinyLeaf = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="leafG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7BC380" />
        <stop offset="100%" stopColor="#3F7E4A" />
      </linearGradient>
    </defs>
    <path
      d="M20 4 C30 10, 34 22, 20 36 C6 22, 10 10, 20 4 Z"
      fill="url(#leafG)"
    />
    <path d="M20 6 L20 34" stroke="#264F2D" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const TinySeed = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="seedG" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E6C58A" />
        <stop offset="100%" stopColor="#9B7A3F" />
      </radialGradient>
    </defs>
    <ellipse cx="20" cy="22" rx="11" ry="14" fill="url(#seedG)" transform="rotate(-15 20 22)" />
    <ellipse cx="17" cy="18" rx="3" ry="4" fill="#F1DBA6" opacity="0.55" transform="rotate(-15 17 18)" />
  </svg>
);
