// FasalSetu — Frontend Demo/Fallback Data Layer
// Used when backend APIs are unavailable

export const DEMO_CROPS = {
  Tomato: {
    currentPrice: 2850,
    expectedPrice: 3280,
    priceTrend: 'up',
    yieldPerAcre: 12,
    duration: 75,
    season: 'Kharif',
    expectedProfit: 45000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 78000,
    withoutRiskPct: 68,
    withRiskPct: 32,
    diseases: [
      {
        name: 'Early Blight',
        confidence: 78,
        symptoms: 'Dark brown spots with concentric rings on leaves, stem lesions, fruit rot',
        treatment: 'Apply Mancozeb 75% WP @ 2g/L or Copper oxychloride 50% WP @ 2.5g/L. Remove infected plant debris. Ensure proper spacing between plants for air circulation.',
        prevention: 'Use resistant varieties. Rotate crops every 2-3 seasons. Avoid overhead irrigation. Apply mulch to prevent soil splash.',
        severity: 'Medium',
      },
      {
        name: 'Late Blight',
        confidence: 85,
        symptoms: 'Water-soaked lesions on leaves, white fuzzy growth on leaf undersides, dark brown patches on stems',
        treatment: 'Apply Metalaxyl + Mancozeb immediately. Remove and destroy infected plants. Spray every 7-10 days during wet weather.',
        prevention: 'Choose blight-resistant varieties. Ensure good drainage. Avoid late-season planting. Monitor weather forecasts for disease-favorable conditions.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 92,
        symptoms: 'No visible disease symptoms. Leaves are green and vibrant. Plant appears healthy.',
        treatment: 'Continue regular watering and fertilization schedule. Monitor weekly for early signs of disease.',
        prevention: 'Maintain proper nutrition. Ensure adequate spacing. Practice crop rotation.',
        severity: 'Low',
      },
    ],
  },
  Onion: {
    currentPrice: 2200,
    expectedPrice: 2600,
    priceTrend: 'up',
    yieldPerAcre: 8,
    duration: 100,
    season: 'Kharif',
    expectedProfit: 39000,
    nearestMandi: 'Lasalgaon Mandi',
    costPerAcre: 62000,
    withoutRiskPct: 52,
    withRiskPct: 24,
    diseases: [
      {
        name: 'Downy Mildew',
        confidence: 72,
        symptoms: 'Pale green to yellow streaks on leaves, white fuzzy growth on leaf tips, stunted growth',
        treatment: 'Apply Metalaxyl-MZ @ 2.5g/L. Remove affected leaves. Improve field drainage. Reduce plant density if possible.',
        prevention: 'Use disease-free seed bulbs. Ensure proper field drainage. Avoid waterlogging. Rotate crops regularly.',
        severity: 'Medium',
      },
      {
        name: 'Purple Blotch',
        confidence: 80,
        symptoms: 'Small water-soaked spots on leaves, purple-brown lesions with halos, leaf tip dieback',
        treatment: 'Spray Mancozeb 75% WP @ 2g/L or Chlorothalonil. Remove infected plant material. Reduce humidity around plants.',
        prevention: 'Use certified seed. Maintain proper plant spacing. Avoid overhead irrigation during evening hours.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 88,
        symptoms: 'No visible disease symptoms. Bulbs developing well. Green, upright foliage.',
        treatment: 'Continue normal care. Monitor for thrips and purple blotch.',
        prevention: 'Maintain balanced fertilization. Ensure proper irrigation scheduling.',
        severity: 'Low',
      },
    ],
  },
  Wheat: {
    currentPrice: 2350,
    expectedPrice: 2450,
    priceTrend: 'stable',
    yieldPerAcre: 2.5,
    duration: 120,
    season: 'Rabi',
    expectedProfit: 32000,
    nearestMandi: 'Nagpur Mandi',
    costPerAcre: 28000,
    withoutRiskPct: 48,
    withRiskPct: 26,
    diseases: [
      {
        name: 'Yellow Rust',
        confidence: 76,
        symptoms: 'Yellow-orange pustules on leaves, streaks along leaf veins, reduced photosynthesis',
        treatment: 'Apply Propiconazole 25% EC @ 1ml/L or Tebuconazole 25.9% EC. Remove heavily infected leaves. Spray early morning or evening.',
        prevention: 'Use rust-resistant varieties. Timely sowing. Avoid excess nitrogen application. Monitor regularly during cool, humid weather.',
        severity: 'Medium',
      },
      {
        name: 'Karnal Bunt',
        confidence: 68,
        symptoms: 'Partial smut in grains, fishy smell from infected grain, dark olivaceous spore mass',
        treatment: 'Apply Propiconazole at flag leaf stage. Remove infected grain. Treat seed with Carboxin + Thiram before sowing.',
        prevention: 'Use certified disease-free seed. Maintain proper crop rotation. Avoid late sowing. Balanced nitrogen application.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 90,
        symptoms: 'Healthy green foliage. Good tillering. No disease symptoms observed.',
        treatment: 'Continue regular management practices. Monitor for rust development.',
        prevention: 'Follow recommended agronomic practices. Timely irrigation at critical stages.',
        severity: 'Low',
      },
    ],
  },
  Cotton: {
    currentPrice: 7200,
    expectedPrice: 8100,
    priceTrend: 'up',
    yieldPerAcre: 1.8,
    duration: 150,
    season: 'Kharif',
    expectedProfit: 48000,
    nearestMandi: 'Akola Agri Center',
    costPerAcre: 54000,
    withoutRiskPct: 61,
    withRiskPct: 33,
    diseases: [
      {
        name: 'Bollworm Damage',
        confidence: 82,
        symptoms: 'Holes in bolls, frass (excrement) on bolls, premature boll opening, reduced fiber quality',
        treatment: 'Install pheromone traps. Apply Emamectin benzoate 5% SG @ 0.4g/L. Release Trichogramma chilonis eggs. Spray on boll stage.',
        prevention: 'Use Bt cotton varieties. Install pheromone traps early. Follow IPM practices. Destroy crop residue after harvest.',
        severity: 'High',
      },
      {
        name: 'Leaf Curl Virus',
        confidence: 70,
        symptoms: 'Upward curling of leaves, vein thickening, stunted growth, reduced boll formation',
        treatment: 'No direct cure. Remove and destroy infected plants. Control whitefly vector with Imidacloprid 17.8% SL @ 0.3ml/L.',
        prevention: 'Use virus-resistant varieties. Control whitefly population early. Avoid late planting. Remove weeds that harbor the virus.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 85,
        symptoms: 'Good boll development. Healthy green canopy. No pest damage visible.',
        treatment: 'Continue integrated pest management. Monitor bollworm with pheromone traps.',
        prevention: 'Maintain balanced nutrition. Follow recommended spacing. Practice crop rotation.',
        severity: 'Low',
      },
    ],
  },
  Soybean: {
    currentPrice: 4600,
    expectedPrice: 5200,
    priceTrend: 'up',
    yieldPerAcre: 3.0,
    duration: 90,
    season: 'Kharif',
    expectedProfit: 35000,
    nearestMandi: 'Nashik Mandi',
    costPerAcre: 31000,
    withoutRiskPct: 55,
    withRiskPct: 28,
    diseases: [
      {
        name: 'Rust',
        confidence: 74,
        symptoms: 'Small brown pustules on leaf undersides, yellowing of leaves, premature defoliation',
        treatment: 'Apply Propiconazole 25% EC @ 1ml/L at first appearance. Remove heavily infected plants. Spray during cool morning hours.',
        prevention: 'Use resistant varieties. Ensure proper drainage. Avoid dense planting. Monitor during humid weather.',
        severity: 'Medium',
      },
      {
        name: 'Root Rot',
        confidence: 68,
        symptoms: 'Wilting of plants, brown and rotted roots, stunted growth, plant death in severe cases',
        treatment: 'Drench soil with Carbendazim 50% WP @ 2g/L. Improve drainage. Avoid waterlogging. Remove severely infected plants.',
        prevention: 'Treat seeds with Thiram before sowing. Avoid continuous soybean cultivation. Ensure proper drainage in fields.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 88,
        symptoms: 'Vigorous growth. Green healthy leaves. Good pod formation.',
        treatment: 'Maintain current management practices. Monitor for insect pests.',
        prevention: 'Follow recommended crop rotation. Maintain soil health with organic matter.',
        severity: 'Low',
      },
    ],
  },
  Sugarcane: {
    currentPrice: 3350,
    expectedPrice: 3600,
    priceTrend: 'stable',
    yieldPerAcre: 35,
    duration: 365,
    season: 'Rabi',
    expectedProfit: 52000,
    nearestMandi: 'Kolhapur Mandi',
    costPerAcre: 86000,
    withoutRiskPct: 58,
    withRiskPct: 30,
    diseases: [
      {
        name: 'Red Rot',
        confidence: 76,
        symptoms: 'Red discoloration of internal cane tissue, sour smell, dried leaves, reduced juice quality',
        treatment: 'Remove and destroy infected stubble. Treat setts with Carbendazim before planting. Apply balanced fertilizers.',
        prevention: 'Use disease-free setts. Treat planting material with fungicides. Maintain field hygiene. Remove wild cane from field borders.',
        severity: 'High',
      },
      {
        name: 'Smut',
        confidence: 70,
        symptoms: 'Black, whip-like structures emerging from shoot apex, stunted growth, thin stems',
        treatment: 'Remove whips before they burst. Treat setts with Tricyclazole. Remove infected plants immediately.',
        prevention: 'Use resistant varieties. Treat setts with fungicide before planting. Avoid mechanical damage to growing points.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 86,
        symptoms: 'Tall, vigorous growth. Green canopy. Good juice content.',
        treatment: 'Continue regular irrigation and nutrition management.',
        prevention: 'Maintain proper nutrition and irrigation schedule. Monitor for early pest signs.',
        severity: 'Low',
      },
    ],
  },
  Rice: {
    currentPrice: 2500,
    expectedPrice: 2800,
    priceTrend: 'up',
    yieldPerAcre: 4.5,
    duration: 120,
    season: 'Kharif',
    expectedProfit: 38000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 42000,
    withoutRiskPct: 57,
    withRiskPct: 29,
    diseases: [
      {
        name: 'Bacterial Leaf Blight',
        confidence: 72,
        symptoms: 'Yellow to white stripes along leaf margins, leaf drying from tips, water-soaked lesions',
        treatment: 'Apply Copper hydroxide 77% WP @ 2g/L. Reduce nitrogen application. Maintain proper water management.',
        prevention: 'Use resistant varieties. Avoid excess nitrogen. Maintain proper spacing. Drain fields periodically.',
        severity: 'Medium',
      },
      {
        name: 'Blast Disease',
        confidence: 80,
        symptoms: 'Diamond-shaped lesions on leaves, neck rot, spindle-shaped spots on leaf blades',
        treatment: 'Apply Tricyclazole 75% WP @ 0.3g/L or Kitazin. Spray at nursery and tillering stage. Maintain balanced nutrition.',
        prevention: 'Use blast-resistant varieties. Balanced nitrogen application. Proper water management. Avoid dense planting.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 87,
        symptoms: 'Healthy green tillers. Good root system. No disease symptoms.',
        treatment: 'Continue proper water and nutrient management.',
        prevention: 'Maintain recommended plant spacing. Follow proper irrigation schedule.',
        severity: 'Low',
      },
    ],
  },
};

export const GROWTH_STAGES = [
  { key: 'seedling', labelKey: 'growth.seedling' },
  { key: 'vegetative', labelKey: 'growth.vegetative' },
  { key: 'flowering', labelKey: 'growth.flowering' },
  { key: 'fruiting', labelKey: 'growth.fruiting' },
  { key: 'maturity', labelKey: 'growth.maturity' },
  { key: 'harvest', labelKey: 'growth.harvest' },
];

// Rough stage progression by crop duration (days) — used for the demo timeline.
export const STAGE_DURATION_RATIOS = {
  seedling: 0.12,
  vegetative: [0.12, 0.45],
  flowering: [0.45, 0.65],
  fruiting: [0.65, 0.85],
  maturity: [0.85, 0.95],
  harvest: [0.95, 1],
};

const GROWTH_STAGE_DETAIL = {
  Cotton: {
    stage: 'flowering',
    progress: 72,
    stageIndex: 2,
    nextStage: 'Fruiting',
    daysToNext: 18,
    note: 'Boll formation starting; protect flowers from pest attack.',
  },
  Tomato: {
    stage: 'fruiting',
    progress: 65,
    stageIndex: 3,
    nextStage: 'Maturity',
    daysToNext: 20,
    note: 'Fruits developing; watch for blossom end rot and blight.',
  },
  Onion: {
    stage: 'vegetative',
    progress: 45,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 22,
    note: 'Bulb swelling stage; control thrips and downy mildew.',
  },
  Wheat: {
    stage: 'vegetative',
    progress: 38,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 26,
    note: 'Tillering stage; monitor for rust in humid conditions.',
  },
  Soybean: {
    stage: 'vegetative',
    progress: 52,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 15,
    note: 'Pod initiation; watch for rust and root rot.',
  },
  Sugarcane: {
    stage: 'vegetative',
    progress: 60,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 40,
    note: 'Cane elongation stage; monitor for red rot and smut.',
  },
  Rice: {
    stage: 'flowering',
    progress: 55,
    stageIndex: 2,
    nextStage: 'Fruiting',
    daysToNext: 16,
    note: 'Panicle emergence; guard against blast and blight.',
  },
};

export const getGrowthInfoForCrop = (cropName) => {
  const key = Object.keys(GROWTH_STAGE_DETAIL).find(
    (k) => k.toLowerCase() === (cropName || '').toLowerCase()
  );
  return GROWTH_STAGE_DETAIL[key] || {
    stage: 'vegetative',
    progress: 50,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 20,
    note: 'Crop is in active growth phase.',
  };
};

export const DEMO_MARKET_LOCATIONS = [
  { name: 'Pune Mandi', lat: 18.5204, lng: 73.8567, type: 'mandi' },
  { name: 'Nashik Mandi', lat: 19.9975, lng: 73.7898, type: 'mandi' },
  { name: 'Nagpur Mandi', lat: 21.1458, lng: 79.0882, type: 'mandi' },
  { name: 'Kolhapur Mandi', lat: 16.7050, lng: 74.2433, type: 'mandi' },
  { name: 'Lasalgaon Mandi', lat: 20.0050, lng: 74.2298, type: 'mandi' },
  { name: 'Aurangabad Mandi', lat: 19.8762, lng: 75.3433, type: 'mandi' },
  { name: 'Akola Agri Center', lat: 20.7050, lng: 76.9958, type: 'advisory' },
  { name: 'Jalna Weather Station', lat: 19.8350, lng: 75.8858, type: 'weather' },
];

export const getDiseaseForCrop = (cropName) => {
  const crop = DEMO_CROPS[cropName];
  if (!crop) return null;
  const diseases = crop.diseases;
  // Return a random disease (not healthy) for variety
  const issues = diseases.filter((d) => d.severity !== 'Low');
  if (issues.length === 0) return diseases[0];
  return issues[Math.floor(Math.random() * issues.length)];
};

export const getHealthyResultForCrop = (cropName) => {
  const crop = DEMO_CROPS[cropName];
  if (!crop) return null;
  return crop.diseases.find((d) => d.severity === 'Low') || crop.diseases[crop.diseases.length - 1];
};

export const getMarketDataForCrop = (cropName) => {
  const crop = DEMO_CROPS[cropName];
  if (!crop) return null;

  const currentPrice = crop.currentPrice;
  const expectedPrice = crop.expectedPrice;
  const increase = expectedPrice - currentPrice;
  const increasePct = currentPrice
    ? Math.round((increase / currentPrice) * 100)
    : 0;

  const mandis = [
    { name: 'Pune', distance_km: 42, price: currentPrice },
    { name: 'Nashik', distance_km: 65, price: Math.round(currentPrice * 0.97) },
    { name: 'Nagpur', distance_km: 180, price: Math.round(currentPrice * 0.94) },
  ];

  const mandisWithNet = mandis.map((m) => ({
    ...m,
    market_price: m.price,
    transport_cost: m.distance_km * 5,
    net_price: m.price - m.distance_km * 5,
  }));

  mandisWithNet.sort((a, b) => b.net_price - a.net_price);

  return {
    crop: cropName,
    currentMarketPrice: currentPrice,
    fasalSetuExpectedPrice: expectedPrice,
    priceIncrease: increase,
    priceIncreasePercentage: increasePct,
    confidence: 86,
    marketTrend: crop.priceTrend || 'up',
    recommendation:
      increase > 0
        ? `Hold — prices are expected to rise ~${increasePct}% in the ${crop.season} window. Sell closer to the peak for a better net rate.`
        : 'Sell now — current prices are near seasonal high.',
    mandis: mandisWithNet,
    best_mandi: mandisWithNet[0]?.name,
    sell_window: increase > 0 ? 'Next 12-16 days' : 'Next 7-10 days',
  };
};

const resolveCropKey = (cropName) => {
  if (!cropName) return 'Tomato';
  const match = Object.keys(DEMO_CROPS).find(
    (k) => k.toLowerCase() === String(cropName).toLowerCase()
  );
  return match || 'Tomato';
};

const riskLabelFromPct = (pct) => {
  if (pct >= 55) return 'high';
  if (pct >= 35) return 'medium';
  return 'low';
};

export const ADVISORY_SECTIONS = [
  { id: 'action', key: 'advisory.recommendedAction', field: 'action', tone: 'priority' },
  { id: 'cropCare', key: 'advisory.cropCare', field: 'cropCare', tone: 'info' },
  { id: 'irrigation', key: 'advisory.irrigation', field: 'irrigation', tone: 'info' },
  { id: 'pest', key: 'advisory.pestRisk', field: 'pest', tone: 'warn' },
  { id: 'nutrient', key: 'advisory.nutrient', field: 'nutrient', tone: 'info' },
  { id: 'precaution', key: 'advisory.precaution', field: 'precaution', tone: 'alert' },
  { id: 'next', key: 'advisory.nextAction', field: 'next', tone: 'next' },
];

export const ADVISORY_URGENCY = {
  Tomato: 'high',
  Onion: 'medium',
  Wheat: 'medium',
  Cotton: 'high',
  Soybean: 'medium',
  Sugarcane: 'high',
  Rice: 'high',
};

export const getAdvisoryPack = (cropName) => {
  const crop = resolveCropKey(cropName);
  return {
    crop,
    urgency: ADVISORY_URGENCY[crop] || 'medium',
    sections: ADVISORY_SECTIONS.map((s) => ({
      ...s,
      bodyKey: `advisory.${crop}.${s.field}`,
    })),
  };
};

export const ADVISORY_CARD_TYPES = [
  { type: 'water', titleKey: 'adv.water.title' },
  { type: 'nutrient', titleKey: 'adv.nutrient.title' },
  { type: 'pest', titleKey: 'adv.pest.title' },
];

export const getCropAdvisories = (cropName) => {
  const crop = resolveCropKey(cropName);
  return ADVISORY_CARD_TYPES.map((a) => ({
    ...a,
    bodyKey: `adv.${crop}.${a.type}`,
  }));
};


export const getOutcomeComparison = (cropName, landSize = 1) => {
  const cropKey = resolveCropKey(cropName);
  const crop = DEMO_CROPS[cropKey];
  const acres = Number.isFinite(Number(landSize)) && Number(landSize) > 0 ? Number(landSize) : 1;
  const yieldPerAcre = crop.yieldPerAcre || 1;
  const quantityTons = Math.round(acres * yieldPerAcre * 10) / 10;
  const quantityQuintals = Math.round(quantityTons * 10);

  const withPrice = crop.expectedPrice;
  const withoutPrice = Math.min(crop.currentPrice, withPrice - 80);

  const expenses = Math.round((crop.costPerAcre || 40000) * acres);

  // Anchor the guided (Fasal Setu) net profit to the crop's per-acre expected
  // profit so this figure agrees with the recommendation dashboard.
  const profitWith = Math.round((crop.expectedProfit || 35000) * acres);

  // Believeable, moderate guided advantage: roughly 9–16.5% higher profit.
  const advantagePct = 0.09 + ((cropKey.length % 4) * 0.025);
  const benefit = Math.max(2000 * acres, Math.round(profitWith * advantagePct));
  const profitWithout = profitWith - benefit;

  // Keep revenue internally consistent: revenue = profit + expenses at the
  // guided (expected-price) rate.
  const revenueWith = profitWith + expenses;
  const revenueWithout = profitWithout + expenses;

  const withoutRiskPct = crop.withoutRiskPct || 60;
  const withRiskPct = Math.min(crop.withRiskPct || 30, withoutRiskPct - 18);

  return {
    crop: cropKey,
    acres,
    yieldPerAcre,
    quantityTons,
    quantityQuintals,
    nearestMandi: crop.nearestMandi || 'Pune Mandi',
    withPrice,
    withoutPrice,
    expenses,
    revenueWith,
    revenueWithout,
    profitWith,
    profitWithout,
    potentialLoss: benefit,
    withRiskPct,
    withoutRiskPct,
    withRisk: riskLabelFromPct(withRiskPct),
    withoutRisk: riskLabelFromPct(withoutRiskPct),
  };
};

export const getRecommendationsForSeason = (season) => {
  return Object.entries(DEMO_CROPS)
    .filter(([_, data]) => data.season === season)
    .map(([name, data]) => ({
      crop: name,
      expected_profit: data.expectedProfit || 35000,
      expected_profit_per_acre: data.expectedProfit || 35000,
      saturation_risk: name === 'Tomato' ? 'High' : name === 'Onion' ? 'Low' : 'Medium',
      risk_score: name === 'Tomato' ? 78 : name === 'Onion' ? 24 : 50,
      reasonKey: `reco.reason${name}`,
    }))
    .sort((a, b) => b.expected_profit - a.expected_profit);
};

export const REGIONAL_ACTIVITY = {
  Nashik: {
    Tomato: { farmers_planning: 215, supply: 'high', demand: 'medium' },
    Onion: { farmers_planning: 148, supply: 'medium', demand: 'high' },
    Soybean: { farmers_planning: 96, supply: 'low', demand: 'medium' },
  },
  Pune: {
    Tomato: { farmers_planning: 185, supply: 'high', demand: 'medium' },
    Wheat: { farmers_planning: 132, supply: 'medium', demand: 'medium' },
    Onion: { farmers_planning: 88, supply: 'low', demand: 'high' },
  },
  Nagpur: {
    Cotton: { farmers_planning: 240, supply: 'high', demand: 'high' },
    Soybean: { farmers_planning: 175, supply: 'medium', demand: 'medium' },
    Sugarcane: { farmers_planning: 64, supply: 'low', demand: 'medium' },
  },
  Kolhapur: {
    Sugarcane: { farmers_planning: 205, supply: 'high', demand: 'high' },
    Rice: { farmers_planning: 120, supply: 'medium', demand: 'medium' },
  },
};

export const getRegionalMarketNote = (crop, district = 'Nashik') => {
  const activity = (REGIONAL_ACTIVITY[district] || {})[crop];
  if (!activity) return { supply: null, demand: null, note_key: null };
  const { supply, demand } = activity;
  if (supply === 'high') {
    return { supply, demand, note_key: 'regional.noteHighSupply' };
  }
  if ((supply === 'low' || supply === 'medium') && (demand === 'high' || demand === 'medium')) {
    return { supply, demand, note_key: 'regional.notePositive' };
  }
  return { supply, demand, note_key: null };
};

export const MARKET_OUTLOOK = {
  Tomato: { harvest_weeks: 8, price_min: 2600, price_max: 3150, outlook: 'favorable' },
  Onion: { harvest_weeks: 6, price_min: 2000, price_max: 2400, outlook: 'favorable' },
  Wheat: { harvest_weeks: 12, price_min: 2200, price_max: 2450, outlook: 'stable' },
  Cotton: { harvest_weeks: 16, price_min: 6800, price_max: 7850, outlook: 'favorable' },
  Soybean: { harvest_weeks: 10, price_min: 4200, price_max: 4700, outlook: 'stable' },
  Sugarcane: { harvest_weeks: 36, price_min: 3100, price_max: 3400, outlook: 'caution' },
  Rice: { harvest_weeks: 11, price_min: 2300, price_max: 2600, outlook: 'favorable' },
};

export const getMarketOutlookForCrop = (cropName) =>
  MARKET_OUTLOOK[cropName] || {
    harvest_weeks: null,
    price_min: null,
    price_max: null,
    outlook: null,
  };

export const DEMO_BUYERS = {
  Tomato: [
    { name: 'AgroFresh Mart', crop: 'Tomato', quantity_required: 80, offer_price: 3000 },
    { name: 'Green Basket Foods', crop: 'Tomato', quantity_required: 120, offer_price: 2950 },
    { name: 'Sahakar Mandi Traders', crop: 'Tomato', quantity_required: 60, offer_price: 3050 },
  ],
  Onion: [
    { name: 'VeggieLink Exports', crop: 'Onion', quantity_required: 150, offer_price: 2300 },
    { name: 'Lasalgaon Bazaar', crop: 'Onion', quantity_required: 200, offer_price: 2250 },
    { name: 'FarmDirect Co', crop: 'Onion', quantity_required: 100, offer_price: 2350 },
  ],
  Wheat: [
    { name: 'Maharashtra Grain Co-op', crop: 'Wheat', quantity_required: 300, offer_price: 2320 },
    { name: 'Aata Mills Ltd', crop: 'Wheat', quantity_required: 250, offer_price: 2280 },
  ],
  Cotton: [
    { name: 'Spinning Mills Pune', crop: 'Cotton', quantity_required: 120, offer_price: 7600 },
    { name: 'Cotton Buyers Hub', crop: 'Cotton', quantity_required: 200, offer_price: 7450 },
  ],
  Soybean: [
    { name: 'Soya Crush Plant', crop: 'Soybean', quantity_required: 180, offer_price: 4550 },
    { name: 'Oil Mill Traders', crop: 'Soybean', quantity_required: 140, offer_price: 4480 },
  ],
  Sugarcane: [
    { name: 'Kolhapur Sugar Co-op', crop: 'Sugarcane', quantity_required: 500, offer_price: 3350 },
    { name: 'Sugar Dev Traders', crop: 'Sugarcane', quantity_required: 450, offer_price: 3300 },
  ],
  Rice: [
    { name: 'Rice Millers Nagpur', crop: 'Rice', quantity_required: 220, offer_price: 2480 },
    { name: 'Khadi & Grains Store', crop: 'Rice', quantity_required: 180, offer_price: 2420 },
  ],
};

export const getBuyersForCrop = (cropName) => (DEMO_BUYERS[cropName] || [])
