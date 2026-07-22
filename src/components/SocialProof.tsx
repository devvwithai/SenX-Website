import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Server, Globe, Zap, Sparkles, HardDrive, Activity, CheckCircle2 } from 'lucide-react';

interface MarqueeRowProps {
  items: Array<{ text: string; icon?: React.ReactNode; highlight?: boolean }>;
  direction: 'left-to-right' | 'right-to-left';
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items 4x to ensure a continuous wide loop with no empty space
  const quadrupledItems = [...items, ...items, ...items, ...items];

  const animateFrom = direction === 'left-to-right' ? '-50%' : '0%';
  const animateTo = direction === 'left-to-right' ? '0%' : '-50%';

  return (
    <div
      className="overflow-hidden w-full py-1.5 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex space-x-3.5 w-max"
        animate={{
          x: [animateFrom, animateTo],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {quadrupledItems.map((item, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center space-x-2.5 px-4 py-2 rounded-full text-xs font-mono tracking-wide border backdrop-blur-md transition-all duration-300 whitespace-nowrap ${
              item.highlight
                ? 'bg-[#A3E854]/10 border-[#A3E854]/40 text-[#A3E854] shadow-[0_0_15px_rgba(163,232,84,0.15)] font-bold'
                : 'bg-[#111313]/90 border-white/10 text-white/80 hover:border-white/30 hover:text-white'
            }`}
          >
            {item.icon && <span className="text-[#A3E854]">{item.icon}</span>}
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const SocialProof: React.FC = () => {
  const stats = [
    { num: '5,000+', label: 'Active Game Nodes' },
    { num: '99.99%', label: 'Uptime SLA' },
    { num: '1.2 Tbps', label: 'Peak Network Volume' },
    { num: '<18ms', label: 'Avg Global Ping' },
  ];

  const row1Items = [
    { text: '99.99% SLA UPTIME GUARANTEE', icon: <CheckCircle2 className="w-3.5 h-3.5" />, highlight: true },
    { text: 'GLOBAL BGP ANYCAST NETWORK', icon: <Globe className="w-3.5 h-3.5" /> },
    { text: 'SINGAPORE SG-1 CORE NODE', icon: <Server className="w-3.5 h-3.5" /> },
    { text: 'SUB-10s INSTANT PROVISIONING', icon: <Zap className="w-3.5 h-3.5" />, highlight: true },
    { text: 'AMD RYZEN 9 7950X3D (5.7GHz)', icon: <Cpu className="w-3.5 h-3.5" /> },
    { text: 'GEN4 NVMe RAID-1 (7,500 MB/s)', icon: <HardDrive className="w-3.5 h-3.5" /> },
    { text: '3.2 TBPS DDOS MITIGATION', icon: <ShieldCheck className="w-3.5 h-3.5" />, highlight: true },
  ];

  const row2Items = [
    { text: 'FRANKFURT DE-1 CENTRAL HUB', icon: <Server className="w-3.5 h-3.5" /> },
    { text: 'MUMBAI IN-1 EDGE FACILITY', icon: <Globe className="w-3.5 h-3.5" /> },
    { text: 'DHAKA BD-1 EDGE REGION', icon: <Activity className="w-3.5 h-3.5" />, highlight: true },
    { text: 'ASHBURN US-EAST PIPELINE', icon: <Server className="w-3.5 h-3.5" /> },
    { text: '10 GBPS DIRECT UNMETERED', icon: <Zap className="w-3.5 h-3.5" /> },
    { text: 'SUB-1MS NETWORK JITTER', icon: <Activity className="w-3.5 h-3.5" />, highlight: true },
    { text: 'ENTERPRISE ECC DDR5 MEMORY', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  const row3Items = [
    { text: 'AUTOMATED HOURLY BACKUPS', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { text: 'PTERODACTYL CONTROL PANEL', icon: <Sparkles className="w-3.5 h-3.5" />, highlight: true },
    { text: 'ONE-CLICK GAME SERVER DEPLOY', icon: <Zap className="w-3.5 h-3.5" /> },
    { text: 'CUSTOM DOMAIN DNS ROUTING', icon: <Globe className="w-3.5 h-3.5" /> },
    { text: 'ZERO DOWNTIME CLUSTER MIGRATION', icon: <ShieldCheck className="w-3.5 h-3.5" />, highlight: true },
    { text: 'REST API & CLI CONTROLLER', icon: <Cpu className="w-3.5 h-3.5" /> },
    { text: '24/7 DEDICATED DEV SUPPORT', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="relative z-20 py-10 sm:py-16 border-y border-white/[0.08] bg-[#050606]/90 backdrop-blur-xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Stat Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="senx-glass p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/[0.08] text-center bg-[#111313]/60 group hover:border-[#A3E854]/40 transition-colors"
            >
              <div className="text-xl sm:text-3xl font-black font-inter text-[#A3E854] tracking-tight">
                {item.num}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50 mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Headline */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[11px] sm:text-xs font-mono text-white/50 uppercase tracking-wider sm:tracking-widest flex items-center justify-center space-x-2 px-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A3E854] shrink-0" />
            <span className="truncate">Powering top esports & developers globally</span>
          </p>
        </div>

        {/* 3 Independent Infinite Marquee Rows */}
        <div className="relative w-full overflow-hidden flex flex-col space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Row 1: Left -> Right */}
          <MarqueeRow items={row1Items} direction="left-to-right" speed={38} />

          {/* Row 2: Right -> Left */}
          <MarqueeRow items={row2Items} direction="right-to-left" speed={32} />

          {/* Row 3: Left -> Right */}
          <MarqueeRow items={row3Items} direction="left-to-right" speed={42} />
        </div>
      </div>
    </section>
  );
};
