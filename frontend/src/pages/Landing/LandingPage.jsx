import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import CobwebEffect from '../../components/CobwebEffect';
import IntelligenceSection from '../../components/IntelligenceSection';
import SaturationIntelligence from '../../components/SaturationIntelligence';
import Capabilities from '../../components/Capabilities';
import HowItWorks from '../../components/HowItWorks';
import MarketPreview from '../../components/MarketPreview';
import AdvisoryPreview from '../../components/AdvisoryPreview';
import DataToDecision from '../../components/DataToDecision';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-cream-50 text-charcoal-800">
      <Navbar />
      <main>
        <Hero />
        <CobwebEffect />
        <IntelligenceSection />
        <SaturationIntelligence />
        <Capabilities />
        <HowItWorks />
        <MarketPreview />
        <AdvisoryPreview />
        <DataToDecision />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
