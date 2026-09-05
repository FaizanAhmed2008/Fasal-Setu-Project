import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, ArrowUpRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './ui/LanguageSelector';

const NAV_LINKS = [
  { key: 'landing.howItWorks', href: '#how-it-works' },
  { key: 'landing.intelligence', href: '#intelligence' },
  { key: 'landing.market', href: '#market' },
  { key: 'landing.advisory', href: '#advisory' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handlePlan = () => {
    setOpen(false);
    navigate('/onboarding');
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
    >
      <div
        className={[
          'flex w-full max-w-[1180px] items-center justify-between rounded-full transition-all duration-500',
          scrolled
            ? 'bg-white/75 backdrop-blur-xl border border-charcoal-100/80 shadow-soft px-4 sm:px-5 py-2.5'
            : 'bg-transparent border border-transparent px-4 sm:px-5 py-3',
        ].join(' ')}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest-600 text-white shadow-soft">
            <Sprout className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="flex items-baseline gap-2">
            <span className="font-display text-[17px] font-bold tracking-tighter2 text-charcoal-800">
              FasalSetu
            </span>
            <span className="hidden sm:inline text-[11px] font-medium text-charcoal-400">
              {t('landing.tagline')}
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 rounded-full bg-charcoal-50/70 border border-charcoal-100 px-1.5 py-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-charcoal-600 transition-colors duration-200 hover:bg-white hover:text-charcoal-800"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector compact />
          <button
            onClick={handlePlan}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-charcoal-800 px-4 py-2 text-[13.5px] font-semibold text-white transition-all duration-300 hover:bg-forest-700 hover:shadow-soft"
          >
            {t('landing.planCrop')}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-100 bg-white text-charcoal-700"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[68px] left-4 right-4 md:hidden rounded-3xl border border-charcoal-100 bg-white/95 backdrop-blur-xl shadow-elev p-3"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[15px] font-medium text-charcoal-700 hover:bg-cream-100"
                >
                  {t(l.key)}
                </a>
              ))}
              <button
                onClick={handlePlan}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-charcoal-800 px-4 py-3 text-[14px] font-semibold text-white hover:bg-forest-700"
              >
                {t('landing.planCrop')}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
