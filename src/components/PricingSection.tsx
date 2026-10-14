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

export const PricingSection: React.FC<{ onSelectPlan: (plan: string) => void }> = React.memo(({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { formatPrice } = useCurrency();

  const plans: PricingPlan[] = useMemo(() => [
    {
      id: 'starter',
      name: 'Starter Game Node',
      tagline: 'Ideal for vanilla and lightweight modded Minecraft servers in Bangladesh & India.',
      monthlyPrice: 5,
      annualPrice: 4,
      specs: {
        cpu: `${INFRASTRUCTURE_CONFIG.supportedCpus[0].model} (2 Dedicated Threads)`,
        ram: '4 GB High-Speed RAM',
        storage: '50 GB Enterprise NVMe',
        bandwidth: 'BDIX & Local Transit',
      },
      features: [
        'Instant Sub-60s Auto Setup',
        'Pterodactyl Game Control Panel',
        'Inline Game Anti-DDoS Mitigation',
        'BDIX Local Peering (<10ms in BD)',
        '1 Automated Daily S3 Backup Slot',
        '24/7 Discord & Ticket Support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Game Community Node',
      tagline: 'Most popular for active Minecraft SMP networks, Palworld, FiveM & Rust communities.',
      monthlyPrice: 15,
      annualPrice: 12,
      recommended: true,
      specs: {
        cpu: `${INFRASTRUCTURE_CONFIG.supportedCpus[0].model} (4 High-Clock Cores)`,
        ram: '12 GB High-Speed RAM',
        storage: '120 GB Enterprise NVMe',
        bandwidth: 'High-Speed BDIX & Local Transit',
      },
      features: [
        'Everything in Starter Game Node',
        'High Single-Thread Clock Speeds',
        '20.0 TPS Main Game Loop Stability',
        '3 Automated S3 Snapshot Slots',
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
        cpu: `${INFRASTRUCTURE_CONFIG.supportedCpus[1].model} (Enterprise Compute)`,
        ram: '32 GB ECC RAM',
        storage: '300 GB NVMe RAID',
        bandwidth: 'High-Speed Local Peering',
      },
      features: [
        'Multi-Server BungeeCord / Velocity Ready',
        'Inline Game-Specific Protocol Scrubbing',
        'Unlimited S3 Backups & Archive Access',
        'Dedicated Support Assistance',
        'Managed MySQL Databases Included',
        'Full SFTP Access & Custom JAR Support',
      ],
    },
  ], []);

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

        {/* Annual / Monthly Billing Toggle */}
        <div className="pt-4 sm:pt-6 flex items-center justify-center space-x-3 sm:space-x-4">
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
