import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { useCurrency, CURRENCIES, CurrencyCode } from '../context/CurrencyContext';

interface CurrencySelectorProps {
  className?: string;
  isMobile?: boolean;
  isDocked?: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  className = '',
  isMobile = false,
}) => {
  const { currency, setCurrency, currencyConfig } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div ref={dropdownRef} className={`relative w-full ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/20 rounded-2xl cursor-pointer transition-all duration-300 focus:outline-none"
        >
          <div className="flex items-center space-x-2.5">
            <Globe className="w-4 h-4 text-[#A3E854]" />
            <span className="text-xs font-mono uppercase text-white/60">Currency:</span>
            <span className="font-mono text-xs font-bold text-white">{currencyConfig.code}</span>
            <span className="text-xs font-inter text-white/50">({currencyConfig.name})</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#A3E854] transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute left-0 right-0 z-50 mt-2 p-1.5 rounded-2xl bg-[#0a0c0c]/98 border border-white/20 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider px-3 py-1.5 border-b border-white/10 mb-1">
                Select Currency
              </div>
              <div className="space-y-1">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const config = CURRENCIES[code];
                  const isSelected = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleSelect(code)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#A3E854]/20 border border-[#A3E854]/40 text-[#A3E854] font-bold'
                          : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="text-left">
                        <div className={isSelected ? 'text-[#A3E854] font-bold' : 'text-white font-bold'}>
                          {config.code}
                        </div>
                        <div className="text-[10px] text-white/50 font-inter font-normal">
                          {config.name}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#A3E854]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop / Tablet Attached Docked Module
  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Docking Module Capsule Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center space-x-2 px-3.5 py-1 sm:py-1.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none bg-[#090b0b]/90 hover:bg-[#111414] border border-white/20 hover:border-[#A3E854]/60 shadow-[0_10px_25px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-xs font-mono select-none ${
          isOpen ? 'border-[#A3E854] shadow-[0_0_20px_rgba(163,232,84,0.35)] bg-[#111414]' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Connection top-edge highlight bar */}
        <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#A3E854]/60 to-transparent pointer-events-none" />

        {/* Currency Prefix Label */}
        <div className="flex items-center space-x-1.5 text-white/70 group-hover:text-white transition-colors">
          <Globe className="w-3.5 h-3.5 text-[#A3E854] animate-pulse" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Currency</span>
        </div>

        <span className="text-white/25 font-light">|</span>

        {/* Active Currency Code */}
        <div className="flex items-center font-bold text-white group-hover:text-[#A3E854] transition-colors">
          <span className="tracking-wide">{currencyConfig.code}</span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#A3E854] transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#A3E854]' : 'text-white/60 group-hover:text-[#A3E854]'
          }`}
        />
      </button>

      {/* Dropdown Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2.5 w-52 p-2 rounded-2xl bg-[#080a0a]/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#A3E854] to-transparent opacity-80" />

            {/* Restored Dropdown Header */}
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider px-2.5 py-1.5 border-b border-white/10 mb-1">
              Select Currency
            </div>

            <div className="space-y-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                const config = CURRENCIES[code];
                const isSelected = currency === code;

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleSelect(code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#A3E854]/20 border border-[#A3E854]/40 text-[#A3E854] font-bold shadow-inner'
                        : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="text-left">
                      <div className={`leading-tight ${isSelected ? 'text-[#A3E854] font-bold' : 'text-white font-bold'}`}>
                        {config.code}
                      </div>
                      <div className="text-[10px] text-white/40 font-inter font-normal">
                        {config.name}
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-[#A3E854] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
