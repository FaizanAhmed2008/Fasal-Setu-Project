import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Package, TrendingUp, ArrowRight, AlertCircle, Loader2, Store, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import MandiCard from '../../components/MandiCard/MandiCard';
import { PageNav, BackButton } from '../../components/ui/PageChrome';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';
import { DEMO_CROPS, getBuyersForCrop } from '../../data/demoData';

const easeOut = [0.22, 1, 0.36, 1];

const inputCls =
  'w-full rounded-xl border border-charcoal-200 bg-white px-4 py-3 text-[14.5px] text-charcoal-800 placeholder:text-charcoal-400 transition-all duration-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:outline-none';

const ReadyToSell = () => {
  const { t, cropName } = useLanguage();

  const [crop, setCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [contactedBuyer, setContactedBuyer] = useState(null);

  const canCompare = !!crop && Number(quantity) > 0;
  const buyers = getBuyersForCrop(crop);

  const handleContact = (buyer) => setContactedBuyer(buyer.name);

  const handleCompare = async () => {
    if (!canCompare) return;
    setIsLoading(true);
    setError('');
    try {
      const data = await apiService.getMarket(crop);
      setMarketData(data);
    } catch (err) {
      setError(t('sell.loadError'));
    } finally {
      setIsLoading(false);
    }
  };

  const startOver = () => {
    setMarketData(null);
    setError('');
    setContactedBuyer(null);
  };

  const quantityNum = Number(quantity) || 0;
  const best = marketData?.best_mandi
    ? marketData.mandis.find((m) => m.name === marketData.best_mandi)
    : marketData?.mandis?.[0];
  const bestTotal = best && quantityNum > 0 ? best.net_price * quantityNum : null;

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-800">
      <PageNav>
        <BackButton to="/" />
      </PageNav>

      <main className="container-x py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-8 text-center sm:text-left">
            <div className="label-eyebrow mb-3">{t('sell.eyebrow')}</div>
            <h1 className="h-section text-3xl sm:text-4xl text-balance">
              {t('sell.title')}
            </h1>
            <p className="mt-3 text-[15.5px] leading-[1.6] text-charcoal-500 text-pretty">
              {t('sell.subtitle')}
            </p>
          </div>

          {!marketData && (
            <Card className="p-6 sm:p-8 mb-6">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-charcoal-700 mb-2">
                    <Sprout className="h-3.5 w-3.5 text-forest-600" strokeWidth={2.3} />
                    {t('sell.crop')}
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className={inputCls + ' appearance-none pr-10 bg-no-repeat'}
                  >
                    <option value="">{t('sell.selectCrop')}</option>
                    {Object.keys(DEMO_CROPS).map((name) => (
                      <option key={name} value={name}>
                        {cropName(name)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-charcoal-700 mb-2">
                    <Package className="h-3.5 w-3.5 text-forest-600" strokeWidth={2.3} />
                    {t('sell.quantity')}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder={t('sell.quantityPlaceholder')}
                      min="0"
                      className={inputCls}
                    />
                    <span className="flex-shrink-0 rounded-xl border border-charcoal-200 bg-cream-100 px-4 py-3 text-[14.5px] font-semibold text-charcoal-600">
                      {t('sell.quantityUnit')}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-[13px] text-danger-600">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-2">
                  <Button size="lg" className="w-full" disabled={!canCompare} onClick={handleCompare} isLoading={isLoading}>
                    {isLoading ? t('sell.loading') : t('sell.compareCta')}
                    {!isLoading && <ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {isLoading && (
            <Card className="p-10 flex flex-col items-center justify-center text-center">
              <Loader2 className="h-8 w-8 text-forest-600 animate-spin mb-4" strokeWidth={2.2} />
              <p className="text-[15px] font-semibold text-charcoal-700">{t('sell.loading')}</p>
            </Card>
          )}

          {marketData && !isLoading && (
            <div>
              {!marketData.mandis || marketData.mandis.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-[15px] font-semibold text-charcoal-700 mb-4">{t('sell.noMandi')}</p>
                  <Button variant="secondary" onClick={startOver}>
                    {t('sell.startOver')}
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="h-9 w-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <h2 className="text-[18px] font-semibold text-charcoal-800 tracking-tightish">
                        {t('sell.bestMandi')}
                      </h2>
                      <span className="ml-auto pill bg-forest-50 text-forest-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                        {cropName(crop)}
                      </span>
                    </div>

                    <MandiCard
                      name={best?.name}
                      distance={best?.distance_km}
                      marketPrice={best?.market_price}
                      transportCost={best?.transport_cost}
                      netPrice={best?.net_price}
                      isBest
                    />

                    {bestTotal != null && (
                      <p className="mt-4 text-[13.5px] text-charcoal-600">
                        {t('sell.totalAtBest', {
                          mandi: best?.name,
                          quantity: quantityNum,
                          unit: t('sell.quantityUnit'),
                          amount: bestTotal.toLocaleString(),
                        })}
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-[16px] font-semibold text-charcoal-800 tracking-tightish mb-4">
                      {t('sell.resultsTitle')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
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

                  {buyers.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="h-8 w-8 rounded-lg bg-charcoal-800 text-white flex items-center justify-center">
                          <Store className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                        <h3 className="text-[16px] font-semibold text-charcoal-800 tracking-tightish">
                          {t('sell.buyersTitle')}
                        </h3>
                        <span className="ml-auto pill bg-charcoal-50 text-charcoal-600">
                          {cropName(crop)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {buyers.map((buyer, i) => (
                          <motion.div
                            key={buyer.name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: easeOut, delay: i * 0.07 }}
                          >
                            <Card className="p-5 h-full flex flex-col">
                              <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                  <span className="h-10 w-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center flex-shrink-0">
                                    <Store className="h-4.5 w-4.5" strokeWidth={2.2} />
                                  </span>
                                  <div>
                                    <h4 className="text-[15px] font-semibold text-charcoal-800 leading-tight">
                                      {buyer.name}
                                    </h4>
                                    <p className="text-[12px] text-charcoal-500">
                                      {cropName(buyer.crop)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-charcoal-100">
                                <div>
                                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                                    {t('sell.buyerQty')}
                                  </div>
                                  <div className="text-[14px] font-bold text-charcoal-800 mt-0.5">
                                    {buyer.quantity_required?.toLocaleString()}{' '}
                                    <span className="text-[11px] font-normal text-charcoal-400">
                                      {t('sell.quantityUnit')}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-charcoal-400">
                                    {t('sell.buyerOffer')}
                                  </div>
                                  <div className="text-[14px] font-bold text-forest-700 mt-0.5">
                                    ₹{buyer.offer_price?.toLocaleString()}
                                    <span className="text-[11px] font-normal text-charcoal-400">
                                      {' '}{t('sell.perQuintal')}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {contactedBuyer === buyer.name ? (
                                <div className="mt-4 flex items-start gap-2 rounded-xl border border-forest-200 bg-forest-50 px-3 py-2.5 text-[12.5px] font-medium text-forest-700">
                                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-forest-600" strokeWidth={2.4} />
                                  {t('sell.contactSuccess')}
                                </div>
                              ) : (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="mt-4 w-full"
                                  onClick={() => handleContact(buyer)}
                                >
                                  {t('sell.contactBuyer')}
                                </Button>
                              )}
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-3">
                    <Button variant="secondary" size="lg" onClick={startOver}>
                      {t('sell.startOver')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ReadyToSell;
