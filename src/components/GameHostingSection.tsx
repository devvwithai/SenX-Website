import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Server, Cpu, Shield, ArrowRight, Check, Zap, Layers, Globe } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCurrency } from '../context/CurrencyContext';

interface ProductItem {
  id: string;
  category: 'game' | 'vps' | 'dedicated' | 'proxy';
  name: string;
  tagline?: string;
  cpu: string;
  ram: string;
  storage: string;
  region: string;
  price: number;
  badge?: string;
  features: string[];
  silhouetteSvg: React.ReactNode;
}

export const GameHostingSection: React.FC<{ onSelectGame: (productName: string) => void }> = ({ onSelectGame }) => {
  const [activeCategory, setActiveCategory] = useState<'game' | 'vps' | 'dedicated' | 'proxy'>('game');
  const { formatPrice } = useCurrency();

  const products: ProductItem[] = [
    // GAME HOSTING PRODUCTS
    {
      id: 'minecraft',
      category: 'game',
      name: 'Minecraft Hosting',
      cpu: 'Ryzen 9950X',
      ram: 'DDR5 Memory',
      storage: 'NVMe SSD',
      region: 'Singapore',
      price: 4.99,
      badge: 'INSTANT READY',
      features: ['Paper, Spigot & Modpack Engine', 'Sub-domain Creator Included', 'Unlimited Player Slots'],
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
      id: 'palworld',
      category: 'game',
      name: 'Palworld Hosting',
      cpu: 'Ryzen 9950X',
      ram: '32GB DDR5',
      storage: 'Gen4 NVMe',
      region: 'Singapore / Frankfurt',
      price: 19.99,
      badge: 'POPULAR',
      features: ['Unreal Engine 5 Anti-Crash', '32 Dedicated Player Slots', 'Daily Automated Backups'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <circle cx="50" cy="40" r="25" />
          <path d="M 30,75 C 30,55 70,55 70,75 Z" />
        </svg>
      ),
    },
    {
      id: 'rust',
      category: 'game',
      name: 'Rust Hosting',
      cpu: 'Ryzen 9950X',
      ram: '16GB DDR5',
      storage: 'RAID-1 NVMe',
      region: 'Virginia US',
      price: 14.50,
      badge: 'HIGH PERFORMANCE',
      features: ['Oxide & Carbon Plugin Host', '3.2 Tbps Rust DDoS Shield', 'Instant Wipe Scheduler'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <polygon points="50,15 85,85 15,85" />
        </svg>
      ),
    },
    {
      id: 'fivem',
      category: 'game',
      name: 'FiveM / GTA V',
      cpu: 'AMD EPYC',
      ram: '16GB DDR5',
      storage: 'NVMe SSD',
      region: 'Frankfurt / Singapore',
      price: 12.00,
      features: ['Pre-configured txAdmin Panel', 'OneSync Infinity Ready', 'Unlimited MySQL Databases'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <path d="M 20,60 Q 50,20 80,60 Q 50,90 20,60 Z" />
        </svg>
      ),
    },
    {
      id: 'terraria',
      category: 'game',
      name: 'Terraria Hosting',
      cpu: 'Ryzen 7950X',
      ram: '4GB DDR5',
      storage: 'NVMe SSD',
      region: 'Global Anycast',
      price: 3.99,
      features: ['tModLoader 1-Click Installer', 'Auto Save World Daemon', 'Crossplay Enabled'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <rect x="25" y="40" width="50" height="40" rx="4" />
          <polygon points="50,15 80,40 20,40" />
        </svg>
      ),
    },
    {
      id: 'valheim',
      category: 'game',
      name: 'Valheim Hosting',
      cpu: 'Ryzen 7950X',
      ram: '8GB DDR5',
      storage: 'NVMe SSD',
      region: 'Singapore / Mumbai',
      price: 9.99,
      features: ['ValheimPlus Mod Host', 'Dedicated Crossplay Node', 'Daily World Snapshot'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <polygon points="50,10 90,50 50,90 10,50" />
        </svg>
      ),
    },

    // CLOUD VPS PRODUCTS
    {
      id: 'vps-starter',
      category: 'vps',
      name: 'Ryzen 9 Cloud VPS',
      cpu: '2 Dedicated Cores',
      ram: '8GB DDR5 ECC',
      storage: '100GB Gen4 NVMe',
      region: 'Global Anycast',
      price: 14.99,
      badge: 'FAST PROVISIONING',
      features: ['KVM Virtualization Architecture', 'Full Root Access & Custom ISO', 'Weekly Automated Snapshots'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <rect x="15" y="25" width="70" height="18" rx="4" />
          <rect x="15" y="55" width="70" height="18" rx="4" />
        </svg>
      ),
    },
    {
      id: 'vps-pro',
      category: 'vps',
      name: 'High-RAM Compute VPS',
      cpu: '4 Dedicated Cores',
      ram: '16GB DDR5 ECC',
      storage: '250GB Gen4 NVMe',
      region: 'Frankfurt / Singapore',
      price: 29.99,
      badge: 'BEST VALUE',
      features: ['Dedicated IPv4 + /64 IPv6 Subnet', '3.2 Tbps DDoS Scrubbing Included', 'Custom BGP Route Injection'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <circle cx="50" cy="50" r="30" />
        </svg>
      ),
    },
    {
      id: 'vps-ultra',
      category: 'vps',
      name: 'Ultra NVMe VPS',
      cpu: '8 Dedicated Cores',
      ram: '32GB DDR5 ECC',
      storage: '500GB RAID-1 NVMe',
      region: 'Virginia US-East',
      price: 59.99,
      badge: 'HEAVY WORKLOAD',
      features: ['20 Gbps Unmetered Port Speed', 'Hot Standby Replica Node', 'REST API Control Integration'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <polygon points="15,20 85,20 50,80" />
        </svg>
      ),
    },

    // DEDICATED SERVERS
    {
      id: 'dedi-ryzen',
      category: 'dedicated',
      name: 'AMD Ryzen 9950X Bare Metal',
      cpu: '16 Cores / 32 Threads',
      ram: '64GB DDR5 ECC',
      storage: '2x 1TB NVMe RAID',
      region: 'Singapore SG-1',
      price: 129.00,
      badge: 'BARE METAL',
      features: ['100% Dedicated Unshared Hardware', 'IPMI / Out-of-band KVM Over IP', 'Custom Network BGP Peering'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <rect x="20" y="20" width="60" height="60" rx="4" />
        </svg>
      ),
    },
    {
      id: 'dedi-epyc',
      category: 'dedicated',
      name: 'Dual AMD EPYC Monster',
      cpu: '64 Cores / 128 Threads',
      ram: '256GB DDR5 ECC',
      storage: '4x 2TB Gen4 RAID-10',
      region: 'Frankfurt DE-1',
      price: 299.00,
      badge: 'ENTERPRISE',
      features: ['Extreme Multi-Thread Throughput', '25 Gbps Dual Uplink Redundancy', '15-Minute Guaranteed Hardware SLA'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <circle cx="35" cy="50" r="20" />
          <circle cx="65" cy="50" r="20" />
        </svg>
      ),
    },

    // PROXY HOSTING
    {
      id: 'proxy-bgp',
      category: 'proxy',
      name: 'BGP Anycast Shield Proxy',
      cpu: 'Distributed Edge',
      ram: 'Global Anycast',
      storage: 'Edge Cache',
      region: '7 Global PoPs',
      price: 19.00,
      badge: 'DDOS SHIELD',
      features: ['Global GRE & IPIP Tunnel Endpoints', 'Layer 3/4 Anti-DDoS Scrubbing', 'Sub-1ms Anycast Edge Routing'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <path d="M 50,15 L 85,35 L 85,65 L 50,85 L 15,65 L 15,35 Z" />
        </svg>
      ),
    },
    {
      id: 'proxy-game',
      category: 'proxy',
      name: 'L7 Game Firewall Proxy',
      cpu: 'Packet Filter Core',
      ram: 'Zero-Copy Engine',
      storage: 'Rule Engine',
      region: 'Singapore / Frankfurt',
      price: 29.00,
      badge: 'CUSTOM RULES',
      features: ['UDP Protocol Handshake Validation', 'Waterwall Packet Inspector', 'Real-Time Attack Analytics'],
      silhouetteSvg: (
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white/5">
          <polygon points="50,10 90,90 10,90" />
        </svg>
      ),
    },
  ];

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <section id="game-hosting" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Anchor targets for smooth navbar scrolling */}
      <div id="cloud-vps" className="absolute -top-24" />
      <div id="dedicated" className="absolute -top-24" />
      <div id="proxy-hosting" className="absolute -top-24" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>SENX CLOUD INFRASTRUCTURE CATALOG</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Ultra-Performance <span className="text-[#A3E854]">Product Suite.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          Powered by high-frequency AMD Ryzen 9950X cores, Gen4 NVMe arrays, and 3.2 Tbps BGP DDoS mitigation.
        </p>

        {/* Product Category Selector Tabs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'game', label: 'Game Hosting', icon: Gamepad2 },
            { id: 'vps', label: 'Cloud VPS', icon: Layers },
            { id: 'dedicated', label: 'Dedicated Servers', icon: Server },
            { id: 'proxy', label: 'Proxy Hosting', icon: Shield },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 sm:px-5 py-2.5 rounded-full border text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
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
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="liquid-glass-card p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/15 hover:border-[#A3E854]/40 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Background Product Silhouette Artwork */}
              <div className="absolute -right-6 -bottom-6 w-48 h-48 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
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

                {/* Aceternity UI Magnetic Button for Product Card CTA */}
                <MagneticButton
                  onClick={() => onSelectGame(product.name)}
                  variant="lime"
                  className="w-full sm:w-auto min-h-[52px] sm:min-h-0 px-5 py-3 sm:py-2.5 text-xs font-bold font-inter tracking-wide uppercase flex items-center justify-center space-x-1.5"
                >
                  <span>Configure {product.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
