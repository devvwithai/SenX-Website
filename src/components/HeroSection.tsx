import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, Cpu, HardDrive, Globe, Server, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onGetStarted, onViewPricing }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden z-20 select-none">

      {/* Floating Zero-Gravity Infrastructure Glass Cards: Strictly hidden on mobile & tablet */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block max-w-7xl mx-auto">
        
        {/* ================= LEFT SIDE (3 CARDS) ================= */}
        
        {/* LEFT 1: Top Left - Global BGP Anycast */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-[6%] xl:left-[8%] pointer-events-auto"
        >
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center space-x-3 border border-white/20 max-w-[210px] shadow-2xl hover:border-[#A3E854]/50 transition-all">
            <div className="p-2 rounded-xl bg-white/10 text-[#A3E854] border border-white/15">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/50 uppercase">Network</div>
              <div className="text-xs font-bold font-inter text-[#F7F7F7]">Global BGP Anycast</div>
              <div className="text-[10px] font-mono text-[#A3E854]">6 Edge Regions</div>
            </div>
          </div>
        </motion.div>

        {/* LEFT 2: Middle Left - Ryzen 9 5950X */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -1, 0, 1, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 left-[1%] xl:left-[2%] pointer-events-auto"
        >
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center space-x-3 border border-white/20 max-w-[220px] shadow-2xl hover:border-[#A3E854]/50 transition-all">
            <div className="p-2 rounded-xl bg-[#A3E854]/20 text-[#A3E854] border border-[#A3E854]/40">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/50 uppercase">Processor</div>
              <div className="text-xs font-bold font-inter text-[#F7F7F7]">Ryzen 9 5950X</div>
              <div className="text-[10px] font-mono text-[#A3E854]">4.9 GHz • DDR5 ECC</div>
            </div>
          </div>
        </motion.div>

        {/* LEFT 3: Bottom Left - Instant Provisioning */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="absolute bottom-24 left-[6%] xl:left-[8%] pointer-events-auto hidden xl:block"
        >
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center space-x-3 border border-white/20 max-w-[210px] shadow-2xl hover:border-[#A3E854]/50 transition-all">
            <div className="p-2 rounded-xl bg-white/10 text-[#A3E854] border border-white/15">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/50 uppercase">Deployment</div>
              <div className="text-xs font-bold font-inter text-[#F7F7F7]">Instant Provisioning</div>
              <div className="text-[10px] font-mono text-[#A3E854]">Sub-60s Automated</div>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT SIDE (3 CARDS) ================= */}

        {/* RIGHT 1: Top Right - Bangladesh BDIX */}
        <motion.div
          animate={{ y: [0, -11, 0], rotate: [0, -1, 0, 1, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute top-24 right-[6%] xl:right-[8%] pointer-events-auto"
        >
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center space-x-3 border border-white/20 max-w-[210px] shadow-2xl hover:border-[#A3E854]/50 transition-all">
            <div className="p-2 rounded-xl bg-white/10 text-[#A3E854] border border-white/15">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/50 uppercase">Primary Node</div>
              <div className="text-xs font-bold font-inter text-[#F7F7F7]">Bangladesh BDIX</div>
              <div className="text-[10px] font-mono text-[#A3E854]">&lt;10ms Latency</div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT 2: Middle Right - Gen4 NVMe RAID-1 */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute top-1/2 -translate-y-1/2 right-[1%] xl:right-[2%] pointer-events-auto"
        >
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center space-x-3 border border-white/20 max-w-[210px] shadow-2xl hover:border-[#A3E854]/50 transition-all">
            <div className="p-2 rounded-xl bg-white/10 text-[#A3E854] border border-white/15">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/50 uppercase">Storage</div>
              <div className="text-xs font-bold font-inter text-[#F7F7F7]">Gen4 NVMe RAID-1</div>
              <div className="text-[10px] font-mono text-[#A3E854]">9,500 MB/s Read</div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT 3: Bottom Right - 3.2 Tbps DDoS Shield */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -1, 0, 1, 0] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="absolute bottom-24 right-[6%] xl:right-[8%] pointer-events-auto hidden xl:block"
        >
          <div className="liquid-glass p-3.5 rounded-2xl flex items-center space-x-3 border border-white/20 max-w-[210px] shadow-2xl hover:border-[#A3E854]/50 transition-all">
            <div className="p-2 rounded-xl bg-white/10 text-[#A3E854] border border-white/15">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/50 uppercase">Security</div>
              <div className="text-xs font-bold font-inter text-[#F7F7F7]">3.2 Tbps DDoS Shield</div>
              <div className="text-[10px] font-mono text-[#A3E854]">Always-On Filter</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Main Center Headlines & Glass Controls */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-7 px-2">
        
        {/* Top Liquid Glass Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/20 text-[11px] sm:text-xs font-mono text-[#F7F7F7] shadow-xl max-w-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A3E854] shrink-0" />
          <span className="font-semibold tracking-wide truncate">#1 GAME HOSING & BDIX VPS IN BANGLADESH</span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-inter font-black uppercase tracking-tight text-[38px] min-[390px]:text-[44px] sm:text-[64px] lg:text-[84px] leading-[0.94] sm:leading-[0.92] text-[#F7F7F7]"
        >
          Minecraft Hosting & <br />
          <span className="text-[#A3E854] block sm:inline mt-1 sm:mt-0">Cloud VPS Bangladesh.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-base sm:text-base lg:text-lg text-[#F7F7F7]/75 max-w-2xl leading-relaxed"
        >
          Ultra-low latency Minecraft Server Hosting in Bangladesh, BDIX KVM VPS, and 24/7 Discord Bot Servers. Powered by AMD Ryzen 9 7950X CPUs, Gen4 NVMe, and 12 Tbps DDoS shield.
        </motion.p>

        {/* Liquid Glass Buttons - Vertically stacked on mobile, 16px gap, min-height 52px */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto max-w-md sm:max-w-none"
        >
          {/* Primary CTA */}
          <MagneticButton
            onClick={onGetStarted}
            variant="lime"
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 text-xs font-black uppercase tracking-wider justify-center"
          >
            <span>Launch Game Server</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </MagneticButton>

          {/* Secondary CTA */}
          <MagneticButton
            onClick={onViewPricing}
            variant="glass"
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 text-xs font-bold uppercase tracking-wider justify-center"
          >
            <span>Explore Pricing</span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
});
