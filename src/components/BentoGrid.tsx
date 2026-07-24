import React from 'react';
import { motion } from 'motion/react';
import { Cpu, HardDrive, Zap, ShieldAlert, Globe, Server, Code, RefreshCw } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3E854] animate-pulse" />
          <span>SENX ARCHITECTURE & BENCHMARKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Engineered for Speed.<br />
          <span className="text-[#A3E854]">Built for Scale.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          Purpose-built cloud infrastructure engineered for zero-throttling workloads, low jitter, and maximum sustained clock speeds.
        </p>
      </div>

      {/* Bento Grid: 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Ryzen Processors (Span 2 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 liquid-glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854]">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#A3E854] bg-[#A3E854]/10 px-3 py-1 rounded-full border border-[#A3E854]/20 font-bold">
                PROCESSOR PERFORMANCE
              </span>
            </div>
            <h3 className="text-xl font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              AMD Ryzen 5950X Engine
            </h3>
            <p className="text-xs sm:text-sm font-inter text-white/60 leading-relaxed mb-6">
              High-frequency 4.9 GHz Zen 16 cores optimized for single-thread game loop performance.
            </p>
          </div>

          {/* Visual Benchmark Graph */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
            <div className="flex items-center justify-between text-white/50 mb-2 text-[10px]">
              <span>SINGLE-THREAD PASSMARK SCORE</span>
              <span className="text-[#A3E854] font-bold">4,850 PTS</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-white/80 mb-1">
                  <span>SenX Ryzen 5950X Engine</span>
                  <span className="text-[#A3E854]">100%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A3E854] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-white/40 mb-1">
                  <span>Legacy Xeon Gold 6248R</span>
                  <span>58%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/30 rounded-full" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: PCIe Gen4 NVMe SSD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="liquid-glass-card p-6 rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] mb-6">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              Gen4 NVMe RAID-1 Arrays
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Sub-millisecond disk I/O for instant world loads, chunk loading, and heavy database read/writes.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-[10px] space-y-1">
            <div className="text-white/40">STORAGE BENCHMARK</div>
            <div className="text-base font-bold text-[#A3E854]">9,500 MB/s</div>
            <div className="text-white/60">Read Speed</div>
          </div>
        </motion.div>

        {/* Card 3: Edge Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="liquid-glass-card p-6 rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              3.2 Tbps L3/L4/L7 DDoS Scrubbing
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Always-on volumetric DDoS filtering with custom game protocol inspection engines for Minecraft, Rust, and FiveM.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#A3E854] bg-[#A3E854]/10 p-3 rounded-2xl border border-[#A3E854]/20">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Active Packet Filter</span>
          </div>
        </motion.div>

        {/* Card 4: Free Backups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="liquid-glass-card p-6 rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              Automated S3 Backups
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Hourly automated snapshots with 1-click restore. Zero data loss guarantee with offsite redundancy.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-white/70">
            ✔ 3 Snapshot Slots Included<br />
            ✔ Geo-redundant Object Storage
          </div>
        </motion.div>

        {/* Card 5: Global Locations (Span 2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 liquid-glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854]">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#A3E854] bg-[#A3E854]/10 px-3 py-1 rounded-full border border-[#A3E854]/20 font-bold">
                GLOBAL NETWORK
              </span>
            </div>
            <h3 className="text-xl font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              Global BGP Anycast Mesh
            </h3>
            <p className="text-xs sm:text-sm font-inter text-white/60 mb-6">
              Direct peering at major Internet Exchange Points (IXPs) ensures ultra-low ping for players globally.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-[#A3E854]">
            Singapore / Frankfurt / Mumbai / Dhaka / USA
          </div>
        </motion.div>

        {/* Card 6: Game Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="liquid-glass-card p-6 rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] mb-6">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              Custom Game Panel
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Enhanced Pterodactyl interface with 1-click modpack installers, sub-domain manager, and web console.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-[#A3E854]">
            [Pterodactyl Wings Custom Build]
          </div>
        </motion.div>

        {/* Card 7: API Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="liquid-glass-card p-6 rounded-3xl border border-white/15 hover:border-[#A3E854]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 w-fit rounded-2xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] mb-6">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              Full REST & GraphQL API
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Automate deployments, scale resources on-demand, and manage power states via developer API tokens.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-white/80 overflow-x-auto">
            <code>POST /api/v1/servers/deploy</code>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
