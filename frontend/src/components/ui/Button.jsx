import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  ...props
}) => {
  const { t } = useLanguage();
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-forest-600 text-white hover:bg-forest-700 shadow-soft hover:shadow-elev',
    secondary:
      'bg-white text-charcoal-800 border border-charcoal-200 hover:border-charcoal-300 hover:bg-cream-50',
    outline:
      'bg-transparent text-forest-700 border border-forest-300 hover:bg-forest-50',
    ghost:
      'bg-transparent text-charcoal-600 hover:bg-cream-100 hover:text-charcoal-800',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[13.5px]',
    md: 'px-5 py-2.5 text-[14.5px]',
    lg: 'px-7 py-3.5 text-[15px]',
  };

  return (
    <motion.button
      whileHover={isLoading ? undefined : { y: -1 }}
      whileTap={isLoading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {t('loading')}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
