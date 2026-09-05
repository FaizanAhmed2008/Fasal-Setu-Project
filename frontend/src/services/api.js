import axios from 'axios';
import {
  DEMO_CROPS,
  getDiseaseForCrop,
  getHealthyResultForCrop,
  getGrowthInfoForCrop,
  getMarketDataForCrop,
  getRecommendationsForSeason,
  getRegionalMarketNote,
  getMarketOutlookForCrop,
} from '../data/demoData';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

const isBackendAvailable = async () => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/health`, { timeout: 3000 });
    return resp.status === 200;
  } catch {
    return false;
  }
};

let _backendStatus = null;
const checkBackend = async () => {
  if (_backendStatus === null) {
    _backendStatus = await isBackendAvailable();
  }
  return _backendStatus;
};

const getDistrictsFallback = () => ({
  districts: ['Nashik', 'Pune', 'Nagpur', 'Kolhapur'],
});

const getRecommendationsFallback = (district, landSize, season) => {
  const cropData = DEMO_CROPS;
  const crops = Object.entries(cropData)
    .filter(([_, data]) => data.season === season)
    .map(([name, data]) => ({
      crop: name,
      expected_profit: data.expectedProfit || 35000,
      expected_profit_per_acre: data.expectedProfit || 35000,
      total_expected_profit: (data.expectedProfit || 35000) * landSize,
      saturation_risk: name === 'Tomato' ? 'High' : name === 'Onion' ? 'Low' : 'Medium',
      risk_score: name === 'Tomato' ? 78 : name === 'Onion' ? 24 : 50,
      reason:
        name === 'Tomato'
          ? `Prices rose 22% last season, and planted area is already up 17% - high risk of oversupply.`
          : name === 'Onion'
          ? `Prices rose 24% last season, but planted area has not caught up (1%) - low risk of oversupply, still a good opportunity.`
          : `Prices moved 5% and planted area moved 8% last season - moderate saturation risk.`,
      ...getRegionalMarketNote(name, district),
      market_outlook: getMarketOutlookForCrop(name),
    }))
    .sort((a, b) => {
      const riskWeight = { Low: 0.55, Medium: 0.30, High: 0.10 };
      const scoreA = (a.expected_profit / 50000) * (riskWeight[a.saturation_risk] || 0.3);
      const scoreB = (b.expected_profit / 50000) * (riskWeight[b.saturation_risk] || 0.3);
      return scoreB - scoreA;
    });

  return {
    district,
    land_size: landSize,
    season,
    recommendations: crops,
  };
};

const getMarketFallback = (crop) => {
  return getMarketDataForCrop(crop) || {
    crop,
    mandis: [],
    best_mandi: null,
    sell_window: 'Not available',
  };
};

const getAdvisoryFallback = (crop) => {
  const cropInfo = DEMO_CROPS[crop];
  if (!cropInfo) return { crop, alerts: [] };

  return {
    crop,
    alerts: [
      {
        type: 'weather',
        message: 'Moderate rainfall expected in the next 48 hours. Plan field activities accordingly.',
      },
      {
        type: 'pest',
        message: `Monitor ${crop.toLowerCase()} fields regularly for early signs of pest activity during this growth stage.`,
      },
      {
        type: 'weather',
        message: 'Temperature will remain optimal for crop growth. Ensure adequate irrigation.',
      },
    ],
  };
};

const buildAnalysisResult = (cropName, health) => {
  const growth = getGrowthInfoForCrop(cropName);
  const isHealthy = health.status === 'healthy';
  const healthScore = isHealthy ? 84 : 62;
  const stageDetail = getGrowthStageKey(growth.stage);
  return {
    ...health,
    crop: cropName,
    // Growth / lifecycle
    growthStage: growth.stage,
    growthStageKey: stageDetail,
    growthStageLabel: growth.stage,
    progressPercent: growth.progress,
    stageIndex: growth.stageIndex,
    nextStage: growth.nextStage,
    daysToNextStage: growth.daysToNext,
    growthNote: growth.note,
    // Health
    healthScore,
    healthScoreLabel: healthScore >= 80 ? 'Good' : healthScore >= 65 ? 'Fair' : 'At Risk',
    // AI
    aiConfidence: (health.confidence || 80) ,
    // Yield impact
    yieldImpact: isHealthy ? '3-5% (no disease impact)' : '8-12% loss if untreated',
    // Market
    market: getMarketDataForCrop(cropName) ? {
      currentMarketPrice: getMarketDataForCrop(cropName).currentMarketPrice,
      fasalSetuExpectedPrice: getMarketDataForCrop(cropName).fasalSetuExpectedPrice,
      priceIncrease: getMarketDataForCrop(cropName).priceIncrease,
      priceIncreasePercentage: getMarketDataForCrop(cropName).priceIncreasePercentage,
    } : null,
  };
};

const getGrowthStageKey = (stage) => {
  const map = {
    Seedling: 'seedling',
    Vegetative: 'vegetative',
    Flowering: 'flowering',
    Fruiting: 'fruiting',
    Maturity: 'maturity',
    Harvest: 'harvest',
  };
  return map[stage] || 'vegetative';
};

const diagnoseFallback = (cropName) => {
  const rand = Math.random();
  let health;
  if (rand > 0.35) {
    const disease = getDiseaseForCrop(cropName);
    if (disease) {
      health = {
        status: 'issue_detected',
        issue_name: disease.name,
        recommended_action: disease.treatment,
        confidence_note: `Demo analysis: ${disease.confidence}% confidence. This is simulated data for demonstration.`,
        crop: cropName,
        severity: disease.severity,
        symptoms: disease.symptoms,
        prevention: disease.prevention,
        confidence: disease.confidence,
      };
      return buildAnalysisResult(cropName, health);
    }
  }

  const healthy = getHealthyResultForCrop(cropName);
  health = {
    status: 'healthy',
    issue_name: null,
    recommended_action: healthy?.treatment || 'The plant appears healthy. Continue regular care and monitoring.',
    confidence_note: `Demo analysis: ${healthy?.confidence || 88}% confidence. This is simulated data for demonstration.`,
    crop: cropName,
    severity: 'Low',
    symptoms: healthy?.symptoms || 'No disease symptoms detected.',
    prevention: healthy?.prevention || 'Continue standard crop management practices.',
    confidence: healthy?.confidence || 88,
  };
  return buildAnalysisResult(cropName, health);
};

export const apiService = {
  getDistricts: async () => {
    try {
      const available = await checkBackend();
      if (!available) return getDistrictsFallback();
      const response = await api.get('/districts');
      return response.data;
    } catch {
      _backendStatus = false;
      return getDistrictsFallback();
    }
  },

  getRecommendations: async (district, landSize, season) => {
    try {
      const available = await checkBackend();
      if (!available) return getRecommendationsFallback(district, landSize, season);
      const response = await api.get('/recommend', {
        params: { district, land_size: landSize, season },
      });
      return response.data;
    } catch {
      _backendStatus = false;
      return getRecommendationsFallback(district, landSize, season);
    }
  },

  getMarket: async (crop) => {
    try {
      const available = await checkBackend();
      if (!available) return getMarketFallback(crop);
      const response = await api.get('/market', { params: { crop } });
      return response.data;
    } catch {
      _backendStatus = false;
      return getMarketFallback(crop);
    }
  },

  getAdvisory: async (crop) => {
    try {
      const available = await checkBackend();
      if (!available) return getAdvisoryFallback(crop);
      const response = await api.get('/advisory', { params: { crop } });
      return response.data;
    } catch {
      _backendStatus = false;
      return getAdvisoryFallback(crop);
    }
  },

  diagnosePlant: async (crop, imageFile, onUploadProgress) => {
    try {
      const available = await checkBackend();
      if (!available) {
        // Simulate a small delay for realistic feel
        await new Promise((r) => setTimeout(r, 1500));
        if (onUploadProgress) onUploadProgress({ loaded: 100, total: 100 });
        return diagnoseFallback(crop);
      }

      const formData = new FormData();
      formData.append('crop', crop);
      formData.append('image', imageFile);

      const response = await api.post('/diagnose', formData, {
        onUploadProgress,
        timeout: 30000,
      });

      const data = response.data;
      if (!data || data.status === 'error') {
        return diagnoseFallback(crop);
      }

      return buildAnalysisResult(crop, {
        ...data,
        crop,
        severity: data.severity || (data.status === 'healthy' ? 'Low' : 'Medium'),
        symptoms: data.symptoms || '',
        prevention: data.prevention || '',
      });
    } catch {
      _backendStatus = false;
      await new Promise((r) => setTimeout(r, 800));
      return diagnoseFallback(crop);
    }
  },
};

export default apiService;
