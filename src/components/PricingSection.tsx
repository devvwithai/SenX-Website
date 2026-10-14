import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCurrency } from '../context/CurrencyContext';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  recommended?: boolean;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  features: string[];
}

// Crisp SVG flags for location selector
const LocationFlag: React.FC<{ country: 'BD' | 'IN'; className?: string }> = ({ country, className = "w-4 h-2.5" }) => {
  if (country === 'BD') {
    return (
      <svg viewBox="0 0 20 12" className={`rounded-[2px] overflow-hidden shrink-0 inline-block shadow-sm ${className}`} aria-label="Bangladesh Flag">
        <rect width="20" height="12" fill="#006a4e" />
        <circle cx="9" cy="6" r="4" fill="#f42a41" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 12" className={`rounded-[2px] overflow-hidden shrink-0 inline-block shadow-sm ${className}`} aria-label="India Flag">
      <rect width="20" height="4" y="0" fill="#ff9933" />
      <rect width="20" height="4" y="4" fill="#ffffff" />
      <rect width="20" height="4" y="8" fill="#138808" />
      <circle cx="10" cy="6" r="1.5" fill="#000080" />
    </svg>
  );
};

export const PricingSection: React.FC<{ onSelectPlan: (plan: string) => void }> = React.memo(({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<'bangladesh' | 'india'>('bangladesh');
  const { formatPrice } = useCurrency();

  const plans: PricingPlan[] = useMemo(() => {
    const isBD = selectedLocation === 'bangladesh';
    return [
      {
        id: 'starter',
        name: 'Starter Game Node',
        tagline: isBD
          ? 'Ideal for vanilla and lightweight modded Minecraft servers in Bangladesh with BDIX.'
          : 'Ideal for vanilla and lightweight modded Minecraft servers in India with Mumbai transit.',
        monthlyPrice: 5,
        annualPrice: 4,
        specs: {
          cpu: isBD ? 'AMD Ryzen 7 5700G (2 Dedicated Threads)' : 'Intel Xeon Platinum 8269CY (2 Dedicated Threads)',
          ram: '4 GB High-Speed RAM',
          storage: '50 GB Enterprise NVMe',
          bandwidth: isBD ? 'BDIX Local Peering (<10ms in BD)' : 'Tier-3 Mumbai National Peering',
        },
        features: [
          'Instant Sub-60s Auto Setup',
          'Pterodactyl Game Control Panel',
          'Inline Game Anti-DDoS Mitigation',
          isBD ? 'Direct BDIX Local Peering (<10ms in BD)' : 'Tier-3 Mumbai Datacenter Transit',
          '1 Daily Cloud Backup Slot',
          '24/7 Discord & Ticket Support',
        ],
      },
      {
        id: 'pro',
        name: 'Pro Game Community Node',
        tagline: isBD
          ? 'Most popular for active Minecraft SMP networks, Palworld, FiveM & Rust communities on BDIX.'
          : 'Most popular for active Minecraft SMP networks, Palworld, FiveM & Rust communities in India.',
        monthlyPrice: 15,
        annualPrice: 12,
        recommended: true,
        specs: {
          cpu: isBD ? 'AMD Ryzen 7 5700G (4 High-Clock Cores)' : 'Intel Xeon Platinum 8269CY (4 High-Perf Cores)',
          ram: '12 GB High-Speed RAM',
          storage: '120 GB Enterprise NVMe',
          bandwidth: isBD ? 'High-Speed BDIX Local Transit' : 'High-Speed Mumbai National Peering',
        },
        features: [
          'Everything in Starter Game Node',
          isBD ? 'High Single-Thread Zen 3 Clocks' : 'High-Performance Xeon Platinum Clocks',
          '20.0 TPS Main Game Loop Stability',
          '3 Daily Cloud Backup Slots',
          'Priority 24/7/365 Engineer Support',
          'Custom Domain & Sub-domain Manager',
          'One-Click Modpack & Plugin Installers',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise Game Network Node',
        tagline: 'High-density multi-server game networks, Bungee/Velocity clusters, and heavy modded servers.',
        monthlyPrice: 39,
        annualPrice: 32,
        specs: {
          cpu: isBD ? 'Intel Xeon E5-2697 v4 (Enterprise Compute)' : 'Intel Xeon Platinum 8269CY (Enterprise High Density)',
          ram: '32 GB ECC RAM',
          storage: '300 GB NVMe RAID',
          bandwidth: isBD ? 'High-Speed BDIX Peering' : 'Tier-3 Mumbai Low-Jitter Transit',
        },
        features: [
          'Multi-Server BungeeCord / Velocity Ready',
          'Inline Game-Specific Protocol Scrubbing',
          'Unlimited Daily Cloud Backups & Archive Access',
          'Dedicated Support Assistance',
          'Managed MySQL Databases Included',
          'Full SFTP Access & Custom JAR Support',
        ],
      },
    ];
  }, [selectedLocation]);

  return (
    <section id="pricing" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <Zap className="w-3.5 h-3.5" />
          <span>TRANSPARENT GAME SERVER PRICING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Predictable Pricing.<br />
          <span className="text-[#A3E854]">Zero Hidden Fees.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          Scale effortlessly from a private survival server to large multiplayer networks in Bangladesh and India.
        </p>

        {/* Location Selector Tabs */}
        <div className="pt-3 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedLocation('bangladesh')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 border cursor-pointer ${
              selectedLocation === 'bangladesh'
                ? 'bg-[#A3E854] text-[#050606] border-[#A3E854] shadow-[0_0_15px_rgba(163,232,84,0.25)]'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <LocationFlag country="BD" />
            <span>Bangladesh — BDIX Edge</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedLocation('india')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 border cursor-pointer ${
              selectedLocation === 'india'
                ? 'bg-[#A3E854] text-[#050606] border-[#A3E854] shadow-[0_0_15px_rgba(163,232,84,0.25)]'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <LocationFlag country="IN" />
            <span>India — Mumbai Facility</span>
          </button>
        </div>

        {/* Annual / Monthly Billing Toggle */}
        <div className="pt-2 flex items-center justify-center space-x-3 sm:space-x-4">
          <span className={`text-xs font-mono ${!isAnnual ? 'text-[#A3E854] font-bold' : 'text-white/50'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-white/10 border border-white/20 p-1 transition-colors relative cursor-pointer"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-6 h-6 rounded-full bg-[#A3E854] transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-mono flex items-center space-x-1.5 ${isAnnual ? 'text-[#A3E854] font-bold' : 'text-white/50'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full bg-[#A3E854]/20 border border-[#A3E854]/40 text-[10px] text-[#A3E854] font-bold">
              SAVE 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 items-stretch">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                plan.recommended
                  ? 'bg-[#111411]/90 border-2 border-[#A3E854] shadow-[0_0_35px_rgba(163,232,84,0.12)]'
                  : 'bg-[#111313]/70 border border-white/15 hover:border-white/30'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A3E854] text-[#050606] text-[10px] font-mono font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl sm:text-2xl font-black font-inter text-[#F7F7F7]">{plan.name}</h3>
                </div>
                <p className="text-xs font-inter text-white/60 mb-6 leading-relaxed min-h-[36px]">
                  {plan.tagline}
                </p>

                {/* Price block */}
                <div className="flex items-baseline space-x-1 mb-6 pb-6 border-b border-white/10">
                  <span className="text-3xl sm:text-4xl font-black font-inter text-[#A3E854]">
                    {formatPrice(price)}
                  </span>
                  <span className="text-xs font-mono text-white/50">/month</span>
                  {isAnnual && (
                    <span className="ml-2 text-[10px] font-mono text-[#A3E854] bg-[#A3E854]/10 px-2 py-0.5 rounded border border-[#A3E854]/20">
                      Billed Annually
                    </span>
                  )}
                </div>

                {/* Hardware Specs Checklist */}
                <div className="space-y-2.5 mb-6 text-xs font-mono">
                  <div className="flex items-center text-white/80">
                    <span className="text-white/40 w-24 shrink-0">CPU:</span>
                    <span className="font-semibold text-[#F7F7F7] truncate">{plan.specs.cpu}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <span className="text-white/40 w-24 shrink-0">RAM:</span>
                    <span className="font-semibold text-[#F7F7F7]">{plan.specs.ram}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <span className="text-white/40 w-24 shrink-0">Storage:</span>
                    <span className="font-semibold text-[#F7F7F7]">{plan.specs.storage}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <span className="text-white/40 w-24 shrink-0">Network:</span>
                    <span className="font-semibold text-[#A3E854]">{plan.specs.bandwidth}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-white/10">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-inter text-white/70">
                      <Check className="w-3.5 h-3.5 text-[#A3E854] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order CTA Button */}
              <MagneticButton
                onClick={() => onSelectPlan(plan.name)}
                variant={plan.recommended ? 'lime' : 'glass'}
                className="w-full min-h-[50px] py-3.5 text-xs font-black uppercase tracking-wider justify-center space-x-2"
              >
                <span>Deploy {plan.name.split(' ')[0]} Server</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});
