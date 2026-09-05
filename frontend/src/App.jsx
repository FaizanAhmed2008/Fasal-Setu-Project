import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FarmerStateProvider } from './context/FarmerStateContext';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './pages/Landing/LandingPage';
import Onboarding from './pages/Onboarding/Onboarding';
import FarmInput from './pages/FarmInput/FarmInput';
import Analyzing from './pages/Analyzing/Analyzing';
import Recommendations from './pages/Recommendations/Recommendations';
import Comparison from './pages/Comparison/Comparison';
import CropPlanning from './pages/CropPlanning/CropPlanning';
import Advisory from './pages/Advisory/Advisory';
import HarvestMarket from './pages/HarvestMarket/HarvestMarket';
import Summary from './pages/Summary/Summary';

function App() {
  return (
    <FarmerStateProvider>
      <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/farm-input" element={<FarmInput />} />
          <Route path="/analyzing" element={<Analyzing />} />
          <Route path="/crop-recommendation" element={<Recommendations />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/crop-planning" element={<CropPlanning />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/harvest-market" element={<HarvestMarket />} />
          <Route path="/summary" element={<Summary />} />
          {/* Legacy routes - redirect to new flow */}
          <Route path="/recommendations" element={<Navigate to="/crop-recommendation" replace />} />
          <Route path="/market" element={<Navigate to="/harvest-market" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </LanguageProvider>
    </FarmerStateProvider>
  );
}

export default App;
