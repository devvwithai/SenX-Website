import React from 'react';
import { motion } from 'motion/react';
import { Cpu, HardDrive, Zap, ShieldAlert, Globe, Server, Code, RefreshCw } from 'lucide-react';

export const BentoGrid: React.FC = React.memo(() => {
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
              AMD Ryzen 7 5700G & Intel Xeon Nodes
            </h3>
            <p className="text-xs sm:text-sm font-inter text-white/60 leading-relaxed mb-6">
              High-clock Zen 3 cores for sustained 20.0 TPS Minecraft server tick loops, backed by Intel Xeon E5 multi-core hardware for large community networks.
            </p>
          </div>

          {/* Visual Benchmark Graph */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
            <div className="flex items-center justify-between text-white/50 mb-2 text-[10px]">
              <span>MINECRAFT TICK EXECUTION STABILITY</span>
              <span className="text-[#A3E854] font-bold">20.0 TPS</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-white/80 mb-1">
                  <span>AMD Ryzen 7 5700G (Optimized PaperMC)</span>
                  <span className="text-[#A3E854]">Locked 20 TPS</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A3E854] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-white/40 mb-1">
                  <span>Standard Cloud Server</span>
                  <span>Variable TPS</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/30 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: PCIe NVMe SSD */}
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
              Enterprise NVMe SSD
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Rapid disk I/O designed for instant world generation, seamless chunk loading, and fast MySQL database transactions.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-[10px] space-y-1">
            <div className="text-white/40">STORAGE ARCHITECTURE</div>
            <div className="text-base font-bold text-[#A3E854]">Enterprise NVMe</div>
            <div className="text-white/60">Hardware Redundancy</div>
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
              Inline Anti-DDoS Mitigation
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Always-on hardware scrubbing with custom game protocol inspection engines for Minecraft, Rust, and FiveM UDP payloads.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#A3E854] bg-[#A3E854]/10 p-3 rounded-2xl border border-[#A3E854]/20">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Active Packet Inspection</span>
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
              Scheduled automated snapshots with 1-click restore. Keep your worlds, plugins, and configurations safely archived offsite.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-white/70">
            ✔ Automated S3 Snapshot Slots<br />
            ✔ 1-Click World Recovery
          </div>
        </motion.div>

        {/* Card 5: Regional Locations (Span 2 cols) */}
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
                REGIONAL INFRASTRUCTURE
              </span>
            </div>
            <h3 className="text-xl font-bold font-inter text-[#F7F7F7] mb-2 group-hover:text-[#A3E854] transition-colors">
              Direct BDIX & South Asia Peering
            </h3>
            <p className="text-xs sm:text-sm font-inter text-white/60 mb-6">
              Direct peering at the Bangladesh Internet Exchange (BDIX) in Dhaka and Tier-3 facilities in Mumbai provides sub-millisecond local routing.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-[#A3E854]">
            🇧🇩 Bangladesh (Dhaka BDIX) &nbsp;•&nbsp; 🇮🇳 India (Mumbai Central)
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
              Pterodactyl Game Wings
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Modern game panel with real-time websocket console, 1-click modpack installers, sub-domain manager, and SFTP access.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-[#A3E854]">
            [Pterodactyl Wings Customized Engine]
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
              Game Server Management API
            </h3>
            <p className="text-xs font-inter text-white/60 mb-4">
              Automate game server restarts, backups, and player commands via clean RESTful developer endpoints.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-[10px] font-mono text-white/80 overflow-x-auto">
            <code>POST /api/client/servers/power</code>
          </div>
        </motion.div>

      </div>
    </section>
  );
});
