import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, ArrowUpRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { SenXLogo } from './SenXLogo';
import { CurrencySelector } from './CurrencySelector';

interface NavbarProps {
  onNavClick: (item: string) => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ onNavClick, onGetStarted }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 70);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = useMemo(() => [
    { name: 'Game Hosting', id: 'game-hosting' },
    { name: 'Cloud VPS', id: 'cloud-vps' },
    { name: 'Dedicated', id: 'dedicated' },
    { name: 'Locations', id: 'locations' },
    { name: 'Support', id: 'support' },
    { name: 'Status', id: 'status', badge: 'Online' },
    { name: 'Login', id: 'login' },
  ], []);

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Apple-Style Morphing Header: Attached at top when scrolled=false, floating capsule when scrolled=true */}
      <motion.header
        initial={false}
        animate={{
          top: scrolled ? 20 : 0,
          width: scrolled ? '90%' : '100%',
          maxWidth: scrolled ? '1120px' : '100%',
          borderRadius: scrolled ? '9999px' : '0px',
          backgroundColor: scrolled ? 'rgba(17, 19, 19, 0.75)' : 'rgba(5, 6, 6, 0.0)',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: scrolled
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 0px 0px rgba(0, 0, 0, 0)',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(0px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 28,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 sm:px-10 py-3.5 border-b sm:border-b-0 transition-colors"
      >
        {/* Subtle Highlight Line */}
        {scrolled && (
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-full" />
        )}

        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center space-x-3 cursor-pointer focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-xl bg-[#111313] border border-white/20 flex items-center justify-center group-hover:border-[#A3E854]/80 transition-all duration-300 shadow-inner overflow-hidden p-1.5">
            <SenXLogo className="w-5 h-5 text-[#A3E854] transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#A3E854]/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xs" />
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-base font-black font-inter tracking-tight text-[#F7F7F7]">
              SenX <span className="text-[#A3E854]">Cloud</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 bg-white/[0.04] p-1 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="font-inter text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer focus:outline-none px-3.5 py-1.5 rounded-full hover:bg-white/10 active:scale-95 flex items-center space-x-1.5 relative"
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="flex items-center space-x-1 px-1.5 py-0.2 rounded-full bg-[#A3E854]/20 border border-[#A3E854]/40 text-[9px] font-mono text-[#A3E854] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3E854] animate-pulse" />
                  <span>LIVE</span>
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Client Area CTA */}
        <div className="flex items-center space-x-3">
          <MagneticButton
            onClick={onGetStarted}
            variant="lime"
            className="hidden xl:flex px-5 py-2 text-xs font-bold font-inter tracking-wide uppercase"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#050606]" />
            <span>Client Area</span>
          </MagneticButton>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#A3E854] transition-colors focus:outline-none cursor-pointer flex items-center justify-center active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#A3E854]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Dedicated Floating Currency Switcher Extension (Docked directly below center of navbar) */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2.5 sm:-mt-3 pointer-events-auto hidden sm:block z-40">
          <CurrencySelector isDocked />
        </div>
      </motion.header>

      {/* Mobile Full-Screen Glass Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#050606]/98 backdrop-blur-3xl flex flex-col justify-between px-6 xl:hidden overflow-y-auto pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]"
          >
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#A3E854]">
                  Cloud Navigation
                </span>
                <span className="flex items-center text-[10px] font-mono text-[#A3E854] bg-[#A3E854]/10 px-2.5 py-1 rounded-full border border-[#A3E854]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3E854] animate-ping mr-1.5" />
                  All Systems 100%
                </span>
              </div>

              {/* Mobile Currency Selector - Placed near top below header line */}
              <div className="pt-1">
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-2">
                  Select Currency
                </div>
                <CurrencySelector isMobile />
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => handleLinkClick(item.id)}
                    className="flex items-center justify-between text-left text-base font-inter font-semibold text-[#F7F7F7] hover:text-[#A3E854] transition-colors px-4 py-3.5 min-h-[52px] rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#A3E854]/40 cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#A3E854]/20 border border-[#A3E854]/40 text-[9px] font-mono text-[#A3E854] font-bold">
                          LIVE
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                  </motion.button>
                ))}

                {/* Client Area Button - Final item in mobile navigation */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.03 }}
                  className="pt-1"
                >
                  <MagneticButton
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onGetStarted();
                    }}
                    variant="lime"
                    className="w-full min-h-[52px] text-xs font-black tracking-wider uppercase justify-center space-x-2 px-5 py-3.5"
                  >
                    <UserCheck className="w-4 h-4 text-[#050606]" />
                    <span>Client Area</span>
                  </MagneticButton>
                </motion.div>
              </div>
            </div>

            <div className="pt-6 pb-2 text-center">
              <p className="text-[11px] font-mono text-white/40">
                SenX Cloud • Enterprise SLA 99.99%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
