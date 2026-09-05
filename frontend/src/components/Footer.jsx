import React from 'react';
import { Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FOOTER_LINKS = [
  { key: 'landing.howItWorks', href: '#how-it-works' },
  { key: 'landing.intelligence', href: '#intelligence' },
  { key: 'landing.market', href: '#market' },
  { key: 'landing.advisory', href: '#advisory' },
];

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-cream-100 border-t border-charcoal-100">
      <div className="container-x py-12 sm:py-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-md">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest-600 text-white">
                <Sprout className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="font-display text-[18px] font-bold tracking-tighter2 text-charcoal-800">
                FasalSetu
              </span>
            </a>
            <p className="mt-3 text-[14px] leading-[1.65] text-charcoal-500 text-pretty">
              {t('landing.footerSub')}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-charcoal-500 hover:text-charcoal-800 transition-colors duration-200"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-charcoal-400">
          <div>© {new Date().getFullYear()} FasalSetu. {t('landing.footerBuilt')}</div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-forest-500" />
            {t('landing.footerBridge')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
