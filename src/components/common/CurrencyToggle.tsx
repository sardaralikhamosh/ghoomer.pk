import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { motion } from 'motion/react';

export const CurrencyToggle: React.FC = () => {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCurrency}
      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold hover:bg-white/20 transition-all"
    >
      <span className={currency === 'PKR' ? 'text-emerald-400' : 'text-slate-400'}>₨ PKR</span>
      <div className="w-px h-3 bg-white/20" />
      <span className={currency === 'USD' ? 'text-emerald-400' : 'text-slate-400'}>$ USD</span>
    </motion.button>
  );
};
