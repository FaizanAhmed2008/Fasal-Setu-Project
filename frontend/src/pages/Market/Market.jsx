import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import MandiCard from '../../components/MandiCard/MandiCard';
import { PageNav, BackButton, ProgressSteps } from '../../components/ui/PageChrome';
import { apiService } from '../../services/api';
import { getErrorMessage } from '../../services/errors';

const easeOut = [0.22, 1, 0.36, 1];

const Market = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const farmData = location.state?.farmData || {};
  const selectedCrop = location.state?.selectedCrop || {};
  const marketData = location.state?.marketData || {};

  const [isLoadingAdvisory, setIsLoadingAdvisory] = useState(false);
  const [error, setError] = useState('');

  const handleViewAdvisory = async () => {
    setIsLoadingAdvisory(true);
    setError('');
    try {
      const advisoryData = await apiService.getAdvisory(selectedCrop.crop);
      navigate('/advisory', {
        state: { farmData, selectedCrop, marketData, advisoryData },
      });
    } catch (err) {
      setIsLoadingAdvisory(false);
      setError(
        getErrorMessage(
          err,
          'Could not load advisory. Make sure the FastAPI backend is running on port 8000.'
        )
      );
    }
  };
  if (!marketData.mandis || !marketData.mandis.length) {
    return (
      <div className="min-h-screen bg-cream-50 text-charcoal-800">
        <PageNav>
          <BackButton to="/recommendations" state={{ farmData, recommendations: [selectedCrop] }} />
        </PageNav>
        <main className="container-x py-24 flex justify-center">
          <Card className="p-8 max-w-md w-full text-center">
            <div className="h-12 w-12 rounded-2xl bg-cream-100 border border-charcoal-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-5 w-5 text-charcoal-500" strokeWidth={2} />
            </div>
            <h2 className="text-[18px] font-bold text-charcoal-800 mb-2">Market data not available</h2>
            <p className="text-[14px] leading-[1.6] text-charcoal-500 mb-6">
              Market data isn’t available for this crop and season. The backend returned no mandi information.
            </p>
            <Button
              onClick={() => navigate('/recommendations', { state: { farmData, recommendations: [selectedCrop] } })}
              className="w-full"
            >
              Back to recommendations
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const best =
    marketData.mandis.find((m) => m.name === marketData.best_mandi) || marketData.mandis[0];

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/recommendations" state={{ farmData, recommendations: [selectedCrop] }} />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <ProgressSteps active={2} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="mb-8">
            <div className="label-eyebrow mb-2">Step 03 — Market plan</div>
            <h1 className="h-section text-3xl sm:text-4xl mb-3">
              Where & when should you sell?
            </h1>
            <div className="flex items-center gap-2 text-[14px] text-charcoal-500">
              <span className="font-semibold text-forest-700">{selectedCrop.crop}</span>
              <span>— Market operations</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-8">
            <Card className="p-6 sm:p-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] font-semibold text-charcoal-800 tracking-tightish">Best mandi</h2>
                <span className="pill bg-forest-50 text-forest-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                  Recommended
                </span>
              </div>
              <MandiCard
                name={best.name}
                distance={best.distance_km}
                marketPrice={best.market_price}
                transportCost={best.transport_cost}
                netPrice={best.net_price}
                isBest
              />
            </Card>

            <Card className="p-6 sm:p-7 bg-gradient-to-br from-forest-50/60 to-cream-50">
              <div className="label-eyebrow text-forest-600">Recommended sell window</div>
              <div className="mt-3 flex items-baseline gap-2">
                <Calendar className="h-5 w-5 text-forest-600" strokeWidth={2.2} />
                <span className="text-[20px] font-semibold text-charcoal-800 tracking-tightish">
                  {marketData.sell_window}
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-charcoal-500 text-pretty">
                Market conditions indicate a stronger selling opportunity during this period.
              </p>
              <div className="mt-5 pt-5 border-t border-charcoal-100 text-[12.5px] text-charcoal-500">
                Updated today · within 80 km of your farm
              </div>
            </Card>
          </div>

          <div className="mb-10">
            <h2 className="text-[18px] font-semibold text-charcoal-800 tracking-tightish mb-4">Mandi comparison</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.mandis.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: easeOut, delay: i * 0.07 }}
                >
                  <MandiCard
                    name={m.name}
                    distance={m.distance_km}
                    marketPrice={m.market_price}
                    transportCost={m.transport_cost}
                    netPrice={m.net_price}
                    isBest={m.name === marketData.best_mandi}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-[13px] text-danger-600">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleViewAdvisory}
              isLoading={isLoadingAdvisory}
            >
              View farm advisory
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Market;
