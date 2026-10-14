import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Shield, ArrowRight, Check, Zap, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCurrency } from '../context/CurrencyContext';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface ProductItem {
  id: string;
  category: 'minecraft' | 'games' | 'proxy';
  name: string;
  cpu: string;
  ram: string;
  storage: string;
  region: string;
  price: number;
  badge?: string;
  features: string[];
  silhouetteSvg: React.ReactNode;
}

export const GameHostingSection: React.FC<{ onSelectGame: (productName: string) => void }> = React.memo(({ onSelectGame }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'minecraft' | 'games' | 'proxy'>('all');
  const { formatPrice } = useCurrency();

  const products: ProductItem[] = useMemo(() => [
    // MINECRAFT SERVERS
    {
      id: 'minecraft-bd',
      category: 'minecraft',
      name: 'Minecraft Hosting Bangladesh',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[0].model,
      ram: 'High-Speed RAM',
      storage: 'Enterprise NVMe SSD',
      region: 'Dhaka BDIX Local Peering',
      price: 1.59,
      badge: '#1 IN BANGLADESH',
      features: [
        'PaperMC, Purpur, Forge & Fabric Support',
        'Direct BDIX Local Peering (<10ms Ping)',
        'Unlimited Player Slots & Modpacks',
        'Pterodactyl Game Wings Panel',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <rect x="20" y="20" width="60" height="60" rx="8" />
          <rect x="30" y="35" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="55" y="35" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="40" y="55" width="20" height="15" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      ),
    },
    {
      id: 'minecraft-in',
      category: 'minecraft',
      name: 'Minecraft Hosting India',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[2].model,
      ram: 'High-Speed RAM',
      storage: 'Enterprise NVMe SSD',
      region: 'Mumbai Central Facility',
      price: 1.59,
      badge: 'LOW LATENCY INDIA',
      features: [
        'Optimized for 20.0 TPS Stability',
        'National NIXI Peering Route',
        'One-Click Plugin & World Installer',
        'Daily Cloud Backup',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <rect x="20" y="20" width="60" height="60" rx="8" />
          <rect x="35" y="40" width="30" height="20" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      ),
    },
    {
      id: 'bedrock',
      category: 'minecraft',
      name: 'Bedrock & Geyser Crossplay',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[0].model,
      ram: 'High-Speed RAM',
      storage: 'Enterprise NVMe SSD',
      region: 'India & Bangladesh',
      price: 1.79,
      features: [
        'GeyserMC & Floodgate Pre-configured',
        'Seamless Java & Bedrock Mobile Crossplay',
        'Automatic World Saves',
        'Custom Sub-Domain Included',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <rect x="25" y="40" width="50" height="40" rx="4" />
          <polygon points="50,15 80,40 20,40" />
        </svg>
      ),
    },

    // MULTIPLAYER GAME SERVERS
    {
      id: 'palworld',
      category: 'games',
      name: 'Palworld Server BD & IN',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[0].model,
      ram: 'Up to 32GB RAM',
      storage: 'Enterprise NVMe SSD',
      region: 'India & Bangladesh BDIX',
      price: 4.49,
      badge: 'POPULAR',
      features: [
        'Unreal Engine Dedicated Server Ready',
        'Up to 32 Player Co-op & Guild Support',
        'Daily Automated Backups',
        'Inline Anti-DDoS Mitigation',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <circle cx="50" cy="40" r="25" />
          <path d="M 30,75 C 30,55 70,55 70,75 Z" />
        </svg>
      ),
    },
    {
      id: 'rust',
      category: 'games',
      name: 'Rust Server Hosting',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[0].model,
      ram: 'High-Capacity RAM',
      storage: 'Enterprise NVMe SSD',
      region: 'India & Bangladesh BDIX',
      price: 8.99,
      badge: 'HIGH PERFORMANCE',
      features: [
        'Oxide & Carbon Plugin Support',
        'Scheduled Wipe & Map Generator',
        'UDP Game Attack Filtering',
        'Full SFTP File & Config Access',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <polygon points="50,15 85,85 15,85" />
        </svg>
      ),
    },
    {
      id: 'fivem',
      category: 'games',
      name: 'FiveM / GTA V Server',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[1].model,
      ram: 'High-Capacity RAM',
      storage: 'Enterprise NVMe SSD',
      region: 'India & Bangladesh BDIX',
      price: 7.99,
      badge: 'COMMUNITY READY',
      features: [
        'txAdmin Web Panel Pre-Installed',
        'OneSync Infinity Ready',
        'Managed MySQL Database Included',
        'Automated Server Crash Restarts',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <path d="M 20,60 Q 50,20 80,60 Q 50,90 20,60 Z" />
        </svg>
      ),
    },

    // GAME PROXIES & NETWORK SHIELDS
    {
      id: 'proxy-minecraft',
      category: 'proxy',
      name: 'Minecraft Velocity & BungeeCord',
      cpu: INFRASTRUCTURE_CONFIG.supportedCpus[1].model,
      ram: 'High-Efficiency Allocations',
      storage: 'Enterprise NVMe',
      region: 'India & Bangladesh',
      price: 0.99,
      badge: 'LOW LATENCY',
      features: [
        'Velocity & BungeeCord Hub Ready',
        'Player Routing & Cross-Server Bridge',
        'L3/L4/L7 Protocol Protection',
        'Sub-Millisecond Edge Peering',
      ],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <path d="M 50,15 L 85,35 L 85,65 L 50,85 L 15,65 L 15,35 Z" />
        </svg>
      ),
    },
  ], []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section id="game-hosting" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>GAME SERVER INFRASTRUCTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Game Server <span className="text-[#A3E854]">Catalog.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          Ultra-low latency game servers powered by AMD Ryzen 7 5700G & Intel Xeon hardware in Bangladesh and India with direct local BDIX peering.
        </p>

        {/* Product Category Selector Tabs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'All Products', icon: Sparkles },
            { id: 'minecraft', label: 'Minecraft Servers', icon: Gamepad2 },
            { id: 'games', label: 'Multiplayer Games', icon: Gamepad2 },
            { id: 'proxy', label: 'Game Server Proxies', icon: Shield },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 sm:px-5 py-2.5 min-h-[44px] rounded-full border text-xs font-mono font-bold uppercase transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#A3E854] text-[#050606] border-[#A3E854] shadow-lg shadow-[#A3E854]/25 scale-105'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="liquid-glass-card p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/15 hover:border-[#A3E854]/40 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Background Product Silhouette Artwork */}
              <div className="absolute -right-6 -bottom-6 w-48 h-48 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300">
                {product.silhouetteSvg}
              </div>

              <div>
                {/* Card Title Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-black font-inter text-[#F7F7F7]">{product.name}</h3>
                  {product.badge && (
                    <span className="text-[10px] font-mono text-[#A3E854] bg-[#A3E854]/10 px-2.5 py-1 rounded-full border border-[#A3E854]/20 shrink-0 font-bold">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Hardware Chips Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
                    {product.cpu}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
                    {product.ram}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
                    {product.storage}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
                    {product.region}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2 mb-6 sm:mb-8">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-inter text-white/70">
                      <Check className="w-3.5 h-3.5 text-[#A3E854] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Footer & Liquid Glass Magnetic Button CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex sm:block items-baseline justify-between">
                  <span className="text-[10px] font-mono uppercase text-white/40 block">Starting at</span>
                  <span className="text-xl font-black font-inter text-[#A3E854]">
                    {formatPrice(product.price)}
                    <span className="text-xs text-white/50 font-normal">/mo</span>
                  </span>
                </div>

                <MagneticButton
                  onClick={() => onSelectGame(product.name)}
                  variant="lime"
                  className="w-full sm:w-auto min-h-[50px] sm:min-h-0 px-5 py-3 sm:py-2.5 text-xs font-bold font-inter tracking-wide uppercase flex items-center justify-center space-x-1.5"
                >
                  <span>Deploy {product.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
});
