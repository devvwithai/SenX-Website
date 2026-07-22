import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Server, Cpu, Zap, ShieldCheck, Activity, Terminal, ArrowRight, UserCheck } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCurrency } from '../context/CurrencyContext';

interface ContentModalProps {
  activeTab: string | null;
  onClose: () => void;
}

export const ContentModal: React.FC<ContentModalProps> = ({ activeTab, onClose }) => {
  const { formatPrice } = useCurrency();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverPreset, setServerPreset] = useState('Minecraft');
  const [serverRam, setServerRam] = useState('8GB DDR5');
  const [region, setRegion] = useState('Singapore');
  const [email, setEmail] = useState('');

  if (!activeTab) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#050606]/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto senx-glass p-5 sm:p-8 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl text-[#F7F7F7] z-10 bg-[#111313]/95 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Deploy / Client Area Modal Content */}
          <div className="pt-1">
            <div className="flex items-center space-x-2 text-[#A3E854] mb-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 shrink-0" />
              <span>SenX Infrastructure Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-inter tracking-tight mb-2 pr-10">
              {activeTab === 'login' ? 'Client Area Portal' : 'Deploy Instant Server'}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-inter mb-5 sm:mb-6 leading-relaxed">
              Configure your high-performance Ryzen 9 server node with sub-10s automated provisioning.
            </p>

            {formSubmitted ? (
              <div className="bg-black/60 border border-[#A3E854]/40 rounded-2xl p-6 sm:p-8 text-center my-4 sm:my-6">
                <div className="w-12 h-12 rounded-full bg-[#A3E854]/20 text-[#A3E854] flex items-center justify-center mx-auto mb-4 border border-[#A3E854]/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-inter mb-2">Instance Deployment Initiated!</h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                  Your <span className="text-[#A3E854] font-bold">{serverPreset}</span> instance with <span className="text-[#A3E854] font-bold">{serverRam}</span> in <span className="text-white font-medium">{region}</span> is being provisioned. Access credentials sent to <span className="text-[#A3E854] font-mono">{email || 'user@senxcloud.com'}</span>.
                </p>
                <MagneticButton
                  onClick={() => {
                    setFormSubmitted(false);
                    onClose();
                  }}
                  variant="lime"
                  className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 text-xs font-black uppercase tracking-wider justify-center"
                >
                  <span>Go to Server Control Panel</span>
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase text-white/70 mb-2">
                    Select Workload Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {['Minecraft', 'Palworld', 'Rust', 'Cloud VPS'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setServerPreset(p)}
                        className={`p-3 min-h-[44px] rounded-xl border text-xs font-bold font-inter text-center transition-all cursor-pointer ${
                          serverPreset === p
                            ? 'bg-[#A3E854]/20 border-[#A3E854] text-[#A3E854]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase text-white/70 mb-1.5">
                      Memory Allocation
                    </label>
                    <select
                      value={serverRam}
                      onChange={(e) => setServerRam(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#A3E854] min-h-[44px]"
                    >
                      <option value="4GB DDR5">4 GB DDR5 (2 Cores) - {formatPrice(9)}/mo</option>
                      <option value="8GB DDR5">8 GB DDR5 (4 Cores) - {formatPrice(18)}/mo</option>
                      <option value="16GB DDR5">16 GB DDR5 (6 Cores) - {formatPrice(32)}/mo</option>
                      <option value="32GB DDR5">32 GB DDR5 (8 Cores) - {formatPrice(64)}/mo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase text-white/70 mb-1.5">
                      Edge Region Node
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#A3E854] min-h-[44px]"
                    >
                      <option value="Singapore">Singapore SG-1 (12ms)</option>
                      <option value="Mumbai">Mumbai IN-West (16ms)</option>
                      <option value="Frankfurt">Frankfurt DE-1 (18ms)</option>
                      <option value="Dhaka">Dhaka BD-Edge (19ms)</option>
                      <option value="Ashburn">Ashburn US-East (24ms)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase text-white/70 mb-1.5">
                    Account Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@yourserver.com"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#A3E854] min-h-[44px]"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  variant="lime"
                  className="w-full min-h-[52px] py-3.5 text-xs font-black uppercase tracking-wider justify-center space-x-2 mt-4"
                >
                  <span>Confirm & Provision Server</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
