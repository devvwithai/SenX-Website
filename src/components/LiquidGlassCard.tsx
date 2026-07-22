import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const LiquidGlassCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 translate-y-[-50px] mb-[-30px]"
    >
      <div className="w-[200px] h-[200px] rounded-2xl liquid-glass-card p-4 flex flex-col justify-between group hover:scale-[1.03] transition-transform duration-500 ease-out select-none shadow-2xl">
        {/* Tag line */}
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-mono tracking-wider text-white/90 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/10">
            [ 2025 ]
          </span>
          <div className="flex items-center space-x-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ed29c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5ed29c]"></span>
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div className="my-auto">
          <h3 className="text-[18px] font-inter font-semibold leading-[1.25] text-white/95 tracking-tight">
            Taught by{' '}
            <span className="font-instrument italic font-normal text-[22px] text-white tracking-wide underline decoration-[#5ed29c]/50 underline-offset-4">
              Industry
            </span>{' '}
            Professionals
          </h3>
        </div>

        {/* Small description */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] font-inter text-white/60 leading-normal">
            Direct staff engineer mentorship
          </p>
          <Sparkles className="w-3.5 h-3.5 text-[#5ed29c] opacity-90 flex-shrink-0 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};
