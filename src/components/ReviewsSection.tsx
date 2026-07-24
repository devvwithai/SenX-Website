import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Quote, Server } from 'lucide-react';

export const ReviewsSection: React.FC = React.memo(() => {
  const reviews = useMemo(() => [
    {
      name: 'Alexandre Mercer',
      role: 'Lead Dev, CraftHQ Network',
      server: '1,200 Active Players',
      rating: 5,
      comment: 'Switched our 100+ plugin PaperMC server to SenX Ryzen 9 nodes. TPS stabilized at a constant 20.0 with 800 players online. The sub-20ms ping across Asia is unmatched.',
      avatar: 'AM',
    },
    {
      name: 'Elena Rostova',
      role: 'Community Admin, Palworld Community',
      server: '64 Slot Cluster',
      rating: 5,
      comment: 'Palworld memory leaks used to crash our old host every 4 hours. SenX automated wings auto-restart daemon and 32GB DDR5 allocation solved it completely. Instant setup in 5 seconds.',
      avatar: 'ER',
    },
    {
      name: 'Devon Vance',
      role: 'FiveM Roleplay Network',
      server: '128 Player OneSync',
      rating: 5,
      comment: 'The 3.2 Tbps DDoS shield saved us from targeted UDP flooding during peak Friday nights. Customer support responded in 4 minutes with custom BGP filter tuning.',
      avatar: 'DV',
    },
    {
      name: 'Marcus Chen',
      role: 'Rust Clan Host',
      server: '250 Slot Procedural Map',
      rating: 5,
      comment: 'Oxide plugins load instantly. Map wipes take seconds instead of minutes on Gen4 NVMe RAID storage. Absolutely worth every single penny.',
      avatar: 'MC',
    },
  ], []);

  return (
    <section className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111313] border border-white/10 text-xs font-mono text-[#A3E854]">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>VERIFIED COMMUNITY TESTIMONIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter text-[#F7F7F7]">
          Loved by Server Admins & <span className="text-[#A3E854]">Engineers.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          See why thousands of gaming networks choose SenX Cloud for zero-lag infrastructure.
        </p>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="senx-glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-[#A3E854]/40 transition-all bg-[#111313]/80 flex flex-col justify-between group"
          >
            <div>
              {/* Rating stars & verified badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-[#A3E854]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ))}
                </div>
                <span className="flex items-center text-[10px] font-mono text-[#A3E854] bg-[#A3E854]/10 px-2.5 py-1 rounded-full border border-[#A3E854]/20">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified Host
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm font-inter text-white/80 leading-relaxed italic mb-5 sm:mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center space-x-3 pt-4 border-t border-white/[0.06]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#A3E854]/15 border border-[#A3E854]/30 text-[#A3E854] font-black font-inter flex items-center justify-center text-xs sm:text-sm shrink-0">
                {rev.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold font-inter text-[#F7F7F7] truncate">{rev.name}</div>
                <div className="text-[11px] sm:text-xs font-mono text-white/50 truncate">{rev.role} • <span className="text-[#A3E854]">{rev.server}</span></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});
