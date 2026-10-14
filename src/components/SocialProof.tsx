import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Server, Globe, Zap, Sparkles, HardDrive, Activity, CheckCircle2 } from 'lucide-react';

interface MarqueeRowProps {
  items: Array<{ text: string; icon?: React.ReactNode; highlight?: boolean }>;
  direction: 'left-to-right' | 'right-to-left';
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = React.memo(({ items, direction, speed }) => {
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
        className="flex space-x-3.5 w-max will-change-transform"
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
});

export const SocialProof: React.FC = React.memo(() => {
  const stats = [
    { num: 'India & BD', label: 'BDIX & Local Peering' },
    { num: 'Ryzen & Xeon', label: 'Enterprise CPU Nodes' },
    { num: 'NVMe SSD', label: 'Fast World Generation' },
    { num: 'Sub-60s', label: 'Automated Deployment' },
  ];

  const row1Items = [
    { text: 'BANGLADESH BDIX CORE NODE', icon: <Server className="w-3.5 h-3.5" />, highlight: true },
    { text: 'INDIA MUMBAI CORE FACILITY', icon: <Globe className="w-3.5 h-3.5" /> },
    { text: 'SUB-60s AUTOMATED SETUP', icon: <Zap className="w-3.5 h-3.5" />, highlight: true },
    { text: 'AMD RYZEN 7 5700G POWERED', icon: <Cpu className="w-3.5 h-3.5" /> },
    { text: 'INTEL XEON E5-2697 V4 CLUSTERS', icon: <Cpu className="w-3.5 h-3.5" />, highlight: true },
    { text: 'ENTERPRISE NVMe SSD STORAGE', icon: <HardDrive className="w-3.5 h-3.5" /> },
    { text: 'GAME-OPTIMIZED DDOS FILTERING', icon: <ShieldCheck className="w-3.5 h-3.5" />, highlight: true },
  ];

  const row2Items = [
    { text: 'PTERODACTYL GAME CONTROL PANEL', icon: <Sparkles className="w-3.5 h-3.5" />, highlight: true },
    { text: 'MINECRAFT PAPER & PURPUR READY', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { text: 'PALWORLD & RUST DEDICATED SLOTS', icon: <Server className="w-3.5 h-3.5" /> },
    { text: 'FIVEM TXADMIN INTEGRATION', icon: <Activity className="w-3.5 h-3.5" />, highlight: true },
    { text: 'ONE-CLICK MODPACK INSTALLERS', icon: <Zap className="w-3.5 h-3.5" /> },
    { text: 'AUTOMATED SCHEDULED S3 BACKUPS', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { text: '24/7 TICKET & DISCORD SUPPORT', icon: <CheckCircle2 className="w-3.5 h-3.5" />, highlight: true },
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
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-inter text-[#A3E854] tracking-tight">
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
            <span className="truncate">High-performance gaming infrastructure across India & Bangladesh</span>
          </p>
        </div>

        {/* 2 Streamlined Infinite Marquee Rows */}
        <div className="relative w-full overflow-hidden flex flex-col space-y-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Row 1: Left -> Right */}
          <MarqueeRow items={row1Items} direction="left-to-right" speed={38} />

          {/* Row 2: Right -> Left */}
          <MarqueeRow items={row2Items} direction="right-to-left" speed={34} />
        </div>
      </div>
    </section>
  );
});
