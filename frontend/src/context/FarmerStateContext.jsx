import React, { createContext, useContext, useState, useCallback } from 'react';

const FarmerStateContext = createContext(null);

const initialState = {
  farmer: { name: '', phone: '', district: '', landSize: '', language: 'English' },
  farm: { season: '', soil: '', irrigation: '' },
  recommendations: [],
  selectedCrops: [],
  chosenCrop: null,
  advisory: { alerts: [] },
  scannerAlerts: [],
  market: null,
  harvest: { estimatedYield: 0, harvestDate: '', yieldPerAcre: 0 },
};

export function FarmerStateProvider({ children }) {
  const [state, setState] = useState(initialState);

  const setFarmer = useCallback((farmer) => {
    setState((prev) => ({ ...prev, farmer: { ...prev.farmer, ...farmer } }));
  }, []);

  const setFarm = useCallback((farm) => {
    setState((prev) => ({ ...prev, farm: { ...prev.farm, ...farm } }));
  }, []);

  const setRecommendations = useCallback((recommendations) => {
    setState((prev) => ({ ...prev, recommendations }));
  }, []);

  const toggleSelectedCrop = useCallback((crop) => {
    setState((prev) => {
      const exists = prev.selectedCrops.find((c) => c.crop === crop.crop);
      if (exists) {
        return { ...prev, selectedCrops: prev.selectedCrops.filter((c) => c.crop !== crop.crop) };
      }
      if (prev.selectedCrops.length >= 2) return prev;
      return { ...prev, selectedCrops: [...prev.selectedCrops, crop] };
    });
  }, []);

  const setChosenCrop = useCallback((crop) => {
    setState((prev) => ({ ...prev, chosenCrop: crop }));
  }, []);

  const setAdvisory = useCallback((advisory) => {
    setState((prev) => ({ ...prev, advisory }));
  }, []);

  const addScannerAlert = useCallback((alert) => {
    setState((prev) => ({
      ...prev,
      scannerAlerts: [...prev.scannerAlerts, alert],
      advisory: {
        ...prev.advisory,
        alerts: [...(prev.advisory.alerts || []), alert],
      },
    }));
  }, []);

  const setMarket = useCallback((market) => {
    setState((prev) => ({ ...prev, market }));
  }, []);

  const setHarvest = useCallback((harvest) => {
    setState((prev) => ({ ...prev, harvest: { ...prev.harvest, ...harvest } }));
  }, []);

  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  const value = {
    ...state,
    setFarmer,
    setFarm,
    setRecommendations,
    toggleSelectedCrop,
    setChosenCrop,
    setAdvisory,
    addScannerAlert,
    setMarket,
    setHarvest,
    resetAll,
  };

  return (
    <FarmerStateContext.Provider value={value}>
      {children}
    </FarmerStateContext.Provider>
  );
}

export function useFarmerState() {
  const ctx = useContext(FarmerStateContext);
  if (!ctx) throw new Error('useFarmerState must be used within FarmerStateProvider');
  return ctx;
}
