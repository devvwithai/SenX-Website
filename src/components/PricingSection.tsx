import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCurrency } from '../context/CurrencyContext';

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

export const PricingSection: React.FC<{ onSelectPlan: (plan: string) => void }> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { formatPrice } = useCurrency();

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter Node',
      tagline: 'Ideal for small community servers and lightweight bots.',
      monthlyPrice: 9,
      annualPrice: 7,
      specs: {
        cpu: '2 Dedicated Threads (Ryzen 9)',
        ram: '4 GB DDR5 RAM',
        storage: '50 GB Gen4 NVMe',
        bandwidth: '1 Gbps Unmetered',
      },
      features: [
        'Instant Sub-10s Auto Setup',
        'Pterodactyl Game Control Panel',
        '3.2 Tbps Anti-DDoS Mitigation',
        '1 Automated Daily S3 Backup',
        'Community Discord Support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Game Node',
      tagline: 'Our most popular setup for high-player Minecraft, Palworld & Rust.',
      monthlyPrice: 24,
      annualPrice: 19,
      recommended: true,
      specs: {
        cpu: '4 Dedicated Cores (Ryzen 9 7950X)',
        ram: '16 GB DDR5 RAM',
        storage: '150 GB Gen4 NVMe',
        bandwidth: '10 Gbps Unmetered',
      },
      features: [
        'Everything in Starter Node',
        'Dedicated Ryzen 9 7950X Physical Cores',
        '3 Automated Hourly S3 Snapshots',
        'Priority 24/7/365 Engineer Support',
        'Free Dedicated IPv4 Address',
        'Custom Domain & Sub-domain Manager',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Dedicated',
      tagline: 'Bare-metal performance for massive networks and corporate workloads.',
      monthlyPrice: 79,
      annualPrice: 65,
      specs: {
        cpu: '16 Cores / 32 Threads (AMD EPYC)',
        ram: '64 GB DDR5 ECC RAM',
        storage: '1 TB NVMe RAID-1',
        bandwidth: '20 Gbps Unmetered',
      },
      features: [
        'Full Root Access & Custom Hypervisor',
        'Dedicated 3.2 Tbps Magic Transit DDoS Filter',
        'Unlimited S3 Backups & Continuous Mirroring',
        'Dedicated Account Manager & 15-min SLA',
        'Multi-region Hot Standby Failover',
        'Custom BGP IP Route Announcement',
      ],
    },
  ];

  return (
    <section id="pricing" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <Zap className="w-3.5 h-3.5" />
          <span>TRANSPARENT ENTERPRISE PRICING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Predictable Pricing.<br />
          <span className="text-[#A3E854]">Zero Hidden Fees.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          Scale effortlessly from a single game server to global multi-region cloud clusters.
        </p>

        {/* Annual / Monthly Billing Toggle */}
        <div className="pt-4 sm:pt-6 flex items-center justify-center space-x-3 sm:space-x-4">
          <span className={`text-xs font-mono ${!isAnnual ? 'text-[#A3E854] font-bold' : 'text-white/50'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-white/10 border border-white/20 p-1 transition-colors relative cursor-pointer"
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
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className={`liquid-glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border relative flex flex-col justify-between transition-all ${
                plan.recommended
                  ? 'border-[#A3E854] shadow-2xl shadow-[#A3E854]/20 lg:-translate-y-2'
                  : 'border-white/15 hover:border-white/30'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#A3E854] text-[#050606] font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center space-x-1 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div>
                <div className="mb-5 sm:mb-6 mt-1 sm:mt-0">
                  <h3 className="text-xl sm:text-2xl font-black font-inter text-[#F7F7F7]">{plan.name}</h3>
                  <p className="text-xs font-inter text-white/60 mt-1 min-h-[32px] leading-relaxed">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/10">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl sm:text-5xl font-black font-inter text-[#A3E854]">
                      {formatPrice(price)}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-white/50">/month</span>
                  </div>
                  {isAnnual && (
                    <span className="text-[10px] font-mono text-[#A3E854] block mt-1">
                      Billed annually ({formatPrice(price * 12)}/yr)
                    </span>
                  )}
                </div>

                {/* Specs Box */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 font-mono text-xs space-y-2 mb-5 sm:mb-6">
                  <div className="flex items-center justify-between text-white/80 gap-2">
                    <span className="text-white/40">CPU:</span>
                    <span className="font-bold text-[#A3E854] truncate text-right">{plan.specs.cpu}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 gap-2">
                    <span className="text-white/40">RAM:</span>
                    <span className="truncate text-right">{plan.specs.ram}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 gap-2">
                    <span className="text-white/40">Storage:</span>
                    <span className="truncate text-right">{plan.specs.storage}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80 gap-2">
                    <span className="text-white/40">Network:</span>
                    <span className="truncate text-right">{plan.specs.bandwidth}</span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2.5 sm:space-x-3 text-xs font-inter text-white/80">
                      <div className="p-0.5 rounded-full bg-[#A3E854]/20 text-[#A3E854] shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Magnetic Action Button */}
              <MagneticButton
                onClick={() => onSelectPlan(plan.name)}
                variant={plan.recommended ? 'lime' : 'glass'}
                className="w-full min-h-[52px] py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <span>Deploy {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
