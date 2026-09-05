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
  Maize: {
    currentPrice: 2100,
    expectedPrice: 2280,
    priceTrend: 'up',
    yieldPerAcre: 5.5,
    duration: 90,
    season: 'Kharif',
    expectedProfit: 41000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 45000,
    withoutRiskPct: 50,
    withRiskPct: 25,
    diseases: [
      {
        name: 'Fall Armyworm',
        confidence: 75,
        symptoms: 'Ragged holes in leaves, frass near whorl, stunted growth',
        treatment: 'Apply Emamectin benzoate 5% SG @ 0.4g/L. Spray in early morning or evening. Monitor whorl damage.',
        prevention: 'Use pheromone traps for early detection. Encourage natural enemies. Avoid late planting.',
        severity: 'High',
      },
      {
        name: 'Stalk Rot',
        confidence: 68,
        symptoms: 'Discoloration of stalk nodes, wilting, lodging of plants',
        treatment: 'Improve drainage. Avoid excess nitrogen. Remove infected plant debris.',
        prevention: 'Use resistant hybrids. Balanced fertilization. Proper crop rotation.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 88,
        symptoms: 'Vigorous growth. Green healthy leaves. Good cob development.',
        treatment: 'Maintain current management practices. Monitor for pest incidence.',
        prevention: 'Follow recommended plant population. Timely weed management.',
        severity: 'Low',
      },
    ],
  },
  Groundnut: {
    currentPrice: 5800,
    expectedPrice: 6100,
    priceTrend: 'up',
    yieldPerAcre: 2.2,
    duration: 110,
    season: 'Kharif',
    expectedProfit: 43000,
    nearestMandi: 'Nashik Mandi',
    costPerAcre: 45000,
    withoutRiskPct: 48,
    withRiskPct: 24,
    diseases: [
      {
        name: 'Tikka Disease',
        confidence: 78,
        symptoms: 'Circular brown spots with yellow halo on leaves, defoliation',
        treatment: 'Apply Mancozeb 75% WP @ 2g/L or Chlorothalonil 75% WP @ 1.5g/L. Remove affected leaves.',
        prevention: 'Use resistant varieties. Seed treatment with Thiram. Avoid dense planting.',
        severity: 'High',
      },
      {
        name: 'Leaf Spot',
        confidence: 72,
        symptoms: 'Small brown spots on leaves, coalescing into larger lesions',
        treatment: 'Spray Copper oxychloride 50% WP @ 2.5g/L. Ensure good air circulation.',
        prevention: 'Treat seeds with Carbendazim. Maintain field sanitation. Crop rotation.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 85,
        symptoms: 'Good canopy development. Green foliage. Pods filling well.',
        treatment: 'Continue regular irrigation and nutrition. Monitor for leaf diseases.',
        prevention: 'Follow recommended spacing. Balanced nutrition with calcium and boron.',
        severity: 'Low',
      },
    ],
  },
  Bajra: {
    currentPrice: 1850,
    expectedPrice: 1950,
    priceTrend: 'up',
    yieldPerAcre: 2.8,
    duration: 85,
    season: 'Kharif',
    expectedProfit: 34000,
    nearestMandi: 'Aurangabad Mandi',
    costPerAcre: 26000,
    withoutRiskPct: 42,
    withRiskPct: 20,
    diseases: [
      {
        name: 'Downy Mildew',
        confidence: 70,
        symptoms: 'Yellow-green chlorotic streaks on leaves, white downy growth on underside',
        treatment: 'Spray Metalaxyl-MZ @ 2.5g/L. Remove severely infected plants. Improve drainage.',
        prevention: 'Use resistant hybrids. Seed treatment with Metalaxyl. Avoid waterlogging.',
        severity: 'High',
      },
      {
        name: 'Ergot',
        confidence: 65,
        symptoms: 'Honeydew on florets, dark sclerotia replacing grains',
        treatment: 'Remove ergot bodies before harvest. Deep plowing after harvest.',
        prevention: 'Use clean seed. Adjust sowing time to avoid flowering during high humidity.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 88,
        symptoms: 'Drought-tolerant growth. Good panicle emergence. Green healthy foliage.',
        treatment: 'Minimal intervention needed. Monitor for pest incidence.',
        prevention: 'Follow recommended plant density. Balanced nutrition.',
        severity: 'Low',
      },
    ],
  },
  Tur: {
    currentPrice: 7100,
    expectedPrice: 7400,
    priceTrend: 'up',
    yieldPerAcre: 1.5,
    duration: 160,
    season: 'Kharif',
    expectedProfit: 46000,
    nearestMandi: 'Nashik Mandi',
    costPerAcre: 48000,
    withoutRiskPct: 45,
    withRiskPct: 22,
    diseases: [
      {
        name: 'Wilt',
        confidence: 75,
        symptoms: 'Yellowing and wilting of leaves, vascular browning, plant death',
        treatment: 'Drench with Carbendazim 50% WP @ 1g/L. Remove infected plants. Solarize soil.',
        prevention: 'Use resistant varieties. Crop rotation 3-4 years. Seed treatment with Trichoderma.',
        severity: 'High',
      },
      {
        name: 'Pod Borer',
        confidence: 78,
        symptoms: 'Holes in pods, frass visible, damaged seeds inside pods',
        treatment: 'Install pheromone traps. Apply Indoxacarb 14.5% SC @ 0.5ml/L. Release Trichogramma.',
        prevention: 'Early sowing. Intercropping with sorghum. Monitor with light traps.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 86,
        symptoms: 'Good branching. Pods developing well. Green healthy canopy.',
        treatment: 'Continue integrated pest management. Monitor for wilt symptoms.',
        prevention: 'Resistant varieties. Proper spacing. Balanced nutrition.',
        severity: 'Low',
      },
    ],
  },
  Gram: {
    currentPrice: 5500,
    expectedPrice: 5700,
    priceTrend: 'up',
    yieldPerAcre: 1.8,
    duration: 110,
    season: 'Rabi',
    expectedProfit: 38000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 35000,
    withoutRiskPct: 40,
    withRiskPct: 18,
    diseases: [
      {
        name: 'Wilt',
        confidence: 72,
        symptoms: 'Sudden wilting, yellowing, vascular discoloration, plant death',
        treatment: 'Drench soil with Carbendazim 50% WP @ 1g/L. Remove infected plants immediately.',
        prevention: 'Use resistant varieties. Deep summer plowing. Crop rotation 3+ years.',
        severity: 'High',
      },
      {
        name: 'Pod Borer',
        confidence: 76,
        symptoms: 'Holes in pods, caterpillars feeding on seeds, frass accumulation',
        treatment: 'Spray Emamectin benzoate 5% SG @ 0.4g/L. Install pheromone traps @ 10/ha.',
        prevention: 'Early sowing. Intercrop with mustard or linseed. Bird perches.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 87,
        symptoms: 'Good pod set. Green foliage. Uniform flowering.',
        treatment: 'Monitor for pest incidence. Maintain soil moisture at pod filling.',
        prevention: 'Resistant varieties. Seed treatment with Rhizobium culture.',
        severity: 'Low',
      },
    ],
  },
  Safflower: {
    currentPrice: 4200,
    expectedPrice: 4400,
    priceTrend: 'up',
    yieldPerAcre: 1.2,
    duration: 130,
    season: 'Rabi',
    expectedProfit: 35000,
    nearestMandi: 'Nashik Mandi',
    costPerAcre: 28000,
    withoutRiskPct: 38,
    withRiskPct: 17,
    diseases: [
      {
        name: 'Aphid',
        confidence: 74,
        symptoms: 'Colonies on tender shoots, curling of leaves, sticky honeydew',
        treatment: 'Spray Imidacloprid 17.8% SL @ 0.3ml/L. Encourage ladybird beetles.',
        prevention: 'Early sowing. Remove weed hosts. Balanced nitrogen application.',
        severity: 'Medium',
      },
      {
        name: 'Capsule Borer',
        confidence: 68,
        symptoms: 'Holes in capsules, damaged seeds, frass at entry holes',
        treatment: 'Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L. Collect and destroy infested capsules.',
        prevention: 'Pheromone traps for monitoring. Timely harvest to avoid overlap.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 85,
        symptoms: 'Spiny leaves healthy. Good capsule formation. Uniform maturity.',
        treatment: 'Monitor for aphids during flowering. Maintain crop hygiene.',
        prevention: 'Resistant varieties. Proper spacing for air circulation.',
        severity: 'Low',
      },
    ],
  },
  Sunflower: {
    currentPrice: 4700,
    expectedPrice: 4900,
    priceTrend: 'up',
    yieldPerAcre: 1.5,
    duration: 95,
    season: 'Rabi',
    expectedProfit: 36000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 32000,
    withoutRiskPct: 42,
    withRiskPct: 20,
    diseases: [
      {
        name: 'Head Borer',
        confidence: 72,
        symptoms: 'Damage to developing seeds in head, frass visible, reduced seed set',
        treatment: 'Spray Emamectin benzoate 5% SG @ 0.4g/L at ray floret opening. Bird perches.',
        prevention: 'Early sowing. Pheromone traps @ 5/ha. Avoid late planting.',
        severity: 'High',
      },
      {
        name: 'Necrosis',
        confidence: 65,
        symptoms: 'Brown necrotic lesions on leaves, stem cankers, premature drying',
        treatment: 'Remove infected plants. Spray Mancozeb 75% WP @ 2g/L. Improve drainage.',
        prevention: 'Use disease-free seed. Crop rotation. Avoid waterlogging.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 88,
        symptoms: 'Large healthy head. Good seed filling. Strong stem.',
        treatment: 'Ensure bee activity for pollination. Monitor for head borer.',
        prevention: 'Hybrid seeds. Balanced nutrition with boron. Proper spacing.',
        severity: 'Low',
      },
    ],
  },
  Watermelon: {
    currentPrice: 1500,
    expectedPrice: 1600,
    priceTrend: 'up',
    yieldPerAcre: 25,
    duration: 80,
    season: 'Zaid',
    expectedProfit: 55000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 65000,
    withoutRiskPct: 55,
    withRiskPct: 28,
    diseases: [
      {
        name: 'Fruit Fly',
        confidence: 78,
        symptoms: 'Punctures on fruit surface, maggots inside fruit, fruit rot',
        treatment: 'Install cue lure traps. Bag fruits. Spray Malathion 50% EC @ 1.5ml/L.',
        prevention: 'Field sanitation. Remove fallen fruits. Crop rotation.',
        severity: 'High',
      },
      {
        name: 'Powdery Mildew',
        confidence: 70,
        symptoms: 'White powdery coating on leaves, yellowing, reduced photosynthesis',
        treatment: 'Spray Sulphur 80% WP @ 2g/L or Triadimefon 25% WP @ 0.5g/L. Improve air circulation.',
        prevention: 'Resistant varieties. Avoid overhead irrigation. Proper spacing.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 85,
        symptoms: 'Vigorous vines. Fruits developing well. Good sugar content.',
        treatment: 'Maintain irrigation schedule. Monitor for fruit fly.',
        prevention: 'Mulching for moisture conservation. Balanced nutrition.',
        severity: 'Low',
      },
    ],
  },
  Muskmelon: {
    currentPrice: 1800,
    expectedPrice: 1900,
    priceTrend: 'up',
    yieldPerAcre: 20,
    duration: 75,
    season: 'Zaid',
    expectedProfit: 48000,
    nearestMandi: 'Nashik Mandi',
    costPerAcre: 58000,
    withoutRiskPct: 52,
    withRiskPct: 26,
    diseases: [
      {
        name: 'Downy Mildew',
        confidence: 74,
        symptoms: 'Yellow angular spots on upper leaf surface, downy growth on underside',
        treatment: 'Spray Metalaxyl-MZ @ 2.5g/L. Remove severely infected leaves. Reduce humidity.',
        prevention: 'Resistant varieties. Avoid overhead irrigation. Proper spacing.',
        severity: 'High',
      },
      {
        name: 'Fruit Fly',
        confidence: 70,
        symptoms: 'Sting marks on fruit, larval feeding inside, premature ripening',
        treatment: 'Fruit bagging. Cue lure traps. Spray bait spray with Malathion + jaggery.',
        prevention: 'Field sanitation. Destroy infested fruits. Crop rotation.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 86,
        symptoms: 'Good netting on fruits. Sweet aroma. Healthy vine growth.',
        treatment: 'Reduce irrigation near harvest for sweetness. Monitor for mildew.',
        prevention: 'Trellising for better air flow. Seed treatment with Trichoderma.',
        severity: 'Low',
      },
    ],
  },
  Cucumber: {
    currentPrice: 2100,
    expectedPrice: 2200,
    priceTrend: 'up',
    yieldPerAcre: 15,
    duration: 60,
    season: 'Zaid',
    expectedProfit: 42000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 50000,
    withoutRiskPct: 50,
    withRiskPct: 25,
    diseases: [
      {
        name: 'Downy Mildew',
        confidence: 76,
        symptoms: 'Yellow angular lesions on leaves, purplish growth on underside, rapid defoliation',
        treatment: 'Spray Cymoxanil + Mancozeb @ 2g/L. Remove infected leaves. Improve ventilation.',
        prevention: 'Resistant hybrids. Avoid overhead irrigation. Wide spacing.',
        severity: 'High',
      },
      {
        name: 'Cucumber Beetle',
        confidence: 72,
        symptoms: 'Holes in leaves, feeding on flowers and fruits, bacterial wilt transmission',
        treatment: 'Spray Imidacloprid 17.8% SL @ 0.3ml/L. Use yellow sticky traps. Row covers early season.',
        prevention: 'Early planting. Remove weed hosts. Crop rotation with non-cucurbits.',
        severity: 'Medium',
      },
      {
        name: 'Healthy Plant',
        confidence: 87,
        symptoms: 'Continuous flowering. Uniform straight fruits. Dark green leaves.',
        treatment: 'Regular harvesting promotes more fruits. Monitor for beetles.',
        prevention: 'Trellising. Mulching. Balanced nutrition with calcium.',
        severity: 'Low',
      },
    ],
  },
  'Bitter Gourd': {
    currentPrice: 2600,
    expectedPrice: 2700,
    priceTrend: 'up',
    yieldPerAcre: 12,
    duration: 70,
    season: 'Zaid',
    expectedProfit: 38000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 48000,
    withoutRiskPct: 48,
    withRiskPct: 24,
    diseases: [
      {
        name: 'Fruit Fly',
        confidence: 75,
        symptoms: 'Oviposition punctures on fruit, maggots inside, fruit drop and rot',
        treatment: 'Fruit bagging with newspaper. Cue lure traps @ 10/ha. Bait spray weekly.',
        prevention: 'Field sanitation. Destroy infested fruits. Crop rotation.',
        severity: 'High',
      },
      {
        name: 'Mosaic Virus',
        confidence: 68,
        symptoms: 'Mosaic pattern on leaves, stunting, distorted fruits, reduced yield',
        treatment: 'Remove infected plants. Control aphid vector with Imidacloprid. Disinfect tools.',
        prevention: 'Use virus-free seeds. Rogue infected plants early. Reflective mulch.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 85,
        symptoms: 'Good fruit set. Characteristic bitterness. Vigorous vine growth.',
        treatment: 'Regular harvesting. Monitor for fruit fly. Support vines on trellis.',
        prevention: 'Trellising essential. Seed treatment. Remove weed hosts.',
        severity: 'Low',
      },
    ],
  },
  Okra: {
    currentPrice: 2900,
    expectedPrice: 3000,
    priceTrend: 'up',
    yieldPerAcre: 10,
    duration: 55,
    season: 'Zaid',
    expectedProfit: 36000,
    nearestMandi: 'Pune Mandi',
    costPerAcre: 42000,
    withoutRiskPct: 45,
    withRiskPct: 22,
    diseases: [
      {
        name: 'Shoot and Fruit Borer',
        confidence: 78,
        symptoms: 'Bore holes in shoots and fruits, frass, drooping shoots, damaged fruits',
        treatment: 'Spray Emamectin benzoate 5% SG @ 0.4g/L. Install pheromone traps. Collect damaged fruits.',
        prevention: 'Early sowing. Summer deep plowing. Intercrop with marigold.',
        severity: 'High',
      },
      {
        name: 'Yellow Vein Mosaic Virus',
        confidence: 70,
        symptoms: 'Yellow network of veins, stunting, small deformed fruits',
        treatment: 'Remove infected plants. Control whitefly vector. Use reflective mulch.',
        prevention: 'Resistant varieties. Early planting to avoid whitefly peak. Roguing.',
        severity: 'High',
      },
      {
        name: 'Healthy Plant',
        confidence: 86,
        symptoms: 'Continuous flowering. Tender fruits. Dark green healthy leaves.',
        treatment: 'Harvest every 2-3 days. Monitor for borer and virus.',
        prevention: 'Resistant hybrids. Seed treatment. Proper spacing.',
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
  Maize: {
    stage: 'vegetative',
    progress: 45,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 22,
    note: 'Knee-high stage; watch for fall armyworm in whorl.',
  },
  Groundnut: {
    stage: 'flowering',
    progress: 50,
    stageIndex: 2,
    nextStage: 'Pod Formation',
    daysToNext: 18,
    note: 'Pegging stage; ensure calcium for pod development.',
  },
  Bajra: {
    stage: 'vegetative',
    progress: 40,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 25,
    note: 'Tillering stage; minimal irrigation needed.',
  },
  Tur: {
    stage: 'vegetative',
    progress: 35,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 30,
    note: 'Branching stage; monitor for wilt symptoms.',
  },
  Gram: {
    stage: 'flowering',
    progress: 55,
    stageIndex: 2,
    nextStage: 'Pod Formation',
    daysToNext: 15,
    note: 'Flowering peak; watch for pod borer.',
  },
  Safflower: {
    stage: 'vegetative',
    progress: 50,
    stageIndex: 1,
    nextStage: 'Flowering',
    daysToNext: 20,
    note: 'Rosette stage; drought tolerant, monitor aphids.',
  },
  Sunflower: {
    stage: 'flowering',
    progress: 60,
    stageIndex: 2,
    nextStage: 'Seed Filling',
    daysToNext: 12,
    note: 'Ray floret opening; ensure bee activity for pollination.',
  },
  Watermelon: {
    stage: 'fruiting',
    progress: 70,
    stageIndex: 3,
    nextStage: 'Maturity',
    daysToNext: 10,
    note: 'Fruit expansion; monitor for fruit fly and sugar content.',
  },
  Muskmelon: {
    stage: 'fruiting',
    progress: 65,
    stageIndex: 3,
    nextStage: 'Maturity',
    daysToNext: 10,
    note: 'Netting developing; reduce irrigation for sweetness.',
  },
  Cucumber: {
    stage: 'fruiting',
    progress: 75,
    stageIndex: 3,
    nextStage: 'Harvest',
    daysToNext: 5,
    note: 'Continuous harvest; pick every 2-3 days for quality.',
  },
  'Bitter Gourd': {
    stage: 'fruiting',
    progress: 68,
    stageIndex: 3,
    nextStage: 'Maturity',
    daysToNext: 8,
    note: 'Fruit setting on trellis; bag fruits for fruit fly.',
  },
  Okra: {
    stage: 'fruiting',
    progress: 72,
    stageIndex: 3,
    nextStage: 'Harvest',
    daysToNext: 3,
    note: 'Daily harvest needed; monitor for borer and virus.',
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
  Maize: 'high',
  Groundnut: 'high',
  Bajra: 'medium',
  Tur: 'high',
  Gram: 'high',
  Safflower: 'medium',
  Sunflower: 'high',
  Watermelon: 'high',
  Muskmelon: 'high',
  Cucumber: 'high',
  'Bitter Gourd': 'high',
  Okra: 'high',
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

export const getOutcomeComparison = (cropName, landSize = 1) => {
  const cropKey = resolveCropKey(cropName);
  const crop = DEMO_CROPS[cropKey];
  const acres = Number.isFinite(Number(landSize)) && Number(landSize) > 0 ? Number(landSize) : 1;
  const yieldPerAcre = crop.yieldPerAcre || 1;
  const quantityTons = Math.round(acres * yieldPerAcre * 10) / 10;
  const quantityQuintals = Math.round(quantityTons * 10);

  const withPrice = crop.expectedPrice;
  const withoutPrice = Math.min(crop.currentPrice, withPrice - 80);

  const revenueWith = Math.round(withPrice * quantityQuintals);
  const revenueWithout = Math.round(withoutPrice * quantityQuintals);
  const expenses = Math.round((crop.costPerAcre || 40000) * acres);

  let profitWith = revenueWith - expenses;
  let profitWithout = revenueWithout - expenses;
  // Always keep a believable 8–16% guided advantage.
  const minGap = Math.max(4000 * acres, Math.round(profitWith * 0.1));
  if (profitWith <= profitWithout) {
    profitWithout = profitWith - minGap;
  } else if (profitWith - profitWithout < minGap) {
    profitWithout = profitWith - minGap;
  }

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
    potentialLoss: profitWith - profitWithout,
    withRiskPct,
    withoutRiskPct,
    withRisk: riskLabelFromPct(withRiskPct),
    withoutRisk: riskLabelFromPct(withoutRiskPct),
  };
};

export const getRecommendationsForSeason = (season) => {
  return Object.entries(DEMO_CROPS)
    .filter(([_, data]) => data.season === season)
    .map(([name, data]) => {
      // Derive saturation risk from withoutRiskPct (higher = more risk)
      const riskPct = data.withoutRiskPct || 50;
      let saturation_risk = 'Medium';
      if (riskPct >= 55) saturation_risk = 'High';
      else if (riskPct < 35) saturation_risk = 'Low';
      
      // Derive risk_score from withoutRiskPct
      const risk_score = Math.min(100, Math.max(0, riskPct));
      
      return {
        crop: name,
        expected_profit: data.expectedProfit || 35000,
        expected_profit_per_acre: data.expectedProfit || 35000,
        saturation_risk,
        risk_score,
        reasonKey: `reco.reason${name}`,
      };
    })
    .sort((a, b) => b.expected_profit - a.expected_profit);
};
