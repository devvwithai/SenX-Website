import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

export type CurrencyCode = 'USD' | 'BDT' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  name: string;
  rate: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar', rate: 1 },
  BDT: { code: 'BDT', symbol: '৳', flag: '🇧🇩', name: 'Bangladeshi Taka', rate: 118 },
  INR: { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee', rate: 83.5 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  formatPrice: (usdAmount: number, options?: { showCents?: boolean }) => string;
  getRawPrice: (usdAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const currencyConfig = useMemo(() => CURRENCIES[currency], [currency]);

  const getRawPrice = useCallback((usdAmount: number): number => {
    return usdAmount * CURRENCIES[currency].rate;
  }, [currency]);

  const formatPrice = useCallback((usdAmount: number, options?: { showCents?: boolean }): string => {
    const config = CURRENCIES[currency];
    const converted = usdAmount * config.rate;

    if (currency === 'USD') {
      const showDecimals = options?.showCents !== undefined ? options.showCents : !Number.isInteger(usdAmount);
      return showDecimals ? `$${converted.toFixed(2)}` : `$${converted}`;
    } else if (currency === 'BDT') {
      const rounded = Math.round(converted);
      return `৳${rounded.toLocaleString('en-US')}`;
    } else {
      const rounded = Math.round(converted);
      return `₹${rounded.toLocaleString('en-US')}`;
    }
  }, [currency]);

  const value = useMemo(() => ({
    currency,
    setCurrency,
    currencyConfig,
    formatPrice,
    getRawPrice,
  }), [currency, currencyConfig, formatPrice, getRawPrice]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
