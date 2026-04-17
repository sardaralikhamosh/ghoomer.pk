import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'PKR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (pkrAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as Currency) || 'PKR';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'PKR' ? 'USD' : 'PKR'));
  };

  const formatPrice = (pkrAmount: number) => {
    if (currency === 'PKR') {
      return `₨${pkrAmount.toLocaleString('en-PK')}`;
    } else {
      const usdAmount = (pkrAmount / 280).toFixed(0);
      return `$${usdAmount}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
