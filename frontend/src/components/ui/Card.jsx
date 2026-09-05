import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white rounded-2xl border border-charcoal-100 shadow-soft ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
