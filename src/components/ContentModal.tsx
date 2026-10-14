import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Zap, ArrowRight, Server } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useCurrency } from '../context/CurrencyContext';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface ContentModalProps {
  activeTab: string | null;
  onClose: () => void;
}

export const ContentModal: React.FC<ContentModalProps> = React.memo(({ activeTab, onClose }) => {
  const { formatPrice } = useCurrency();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverPreset, setServerPreset] = useState('Minecraft');
  const [serverRam, setServerRam] = useState('4GB RAM');
  const [region, setRegion] = useState('Bangladesh (Dhaka BDIX Edge)');
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
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto senx-glass p-5 sm:p-8 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl text-[#F7F7F7] z-10 bg-[#111313]/95 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Deploy / Client Area Modal Content */}
          <div className="pt-1">
            <div className="flex items-center space-x-2 text-[#A3E854] mb-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 shrink-0" />
              <span>SenX Game Infrastructure Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-inter tracking-tight mb-2 pr-10">
              {activeTab === 'login' ? 'Client Area Portal' : 'Deploy Game Server'}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-inter mb-5 sm:mb-6 leading-relaxed">
              Configure your game server instance in Bangladesh or India with sub-60s automated provisioning.
            </p>

            {formSubmitted ? (
              <div className="bg-black/60 border border-[#A3E854]/40 rounded-2xl p-6 sm:p-8 text-center my-4 sm:my-6">
                <div className="w-12 h-12 rounded-full bg-[#A3E854]/20 text-[#A3E854] flex items-center justify-center mx-auto mb-4 border border-[#A3E854]/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-inter mb-2">Game Server Provisioning Initiated!</h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                  Your <span className="text-[#A3E854] font-bold">{serverPreset}</span> instance with <span className="text-[#A3E854] font-bold">{serverRam}</span> in <span className="text-white font-medium">{region}</span> is being deployed. Confirmation sent to <span className="text-[#A3E854] font-mono">{email || 'user@senxcloud.com'}</span>.
                </p>
                <MagneticButton
                  onClick={() => {
                    window.location.href = 'https://client.senxcloud.com/';
                  }}
                  variant="lime"
                  className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 text-xs font-black uppercase tracking-wider justify-center"
                >
                  <span>Go to Client Panel</span>
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase text-white/70 mb-2">
                    Select Game Server
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {['Minecraft', 'Palworld', 'Rust', 'FiveM'].map((p) => (
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
                      <option value="4GB RAM">4 GB RAM - {formatPrice(5)}/mo</option>
                      <option value="8GB RAM">8 GB RAM - {formatPrice(10)}/mo</option>
                      <option value="12GB RAM">12 GB RAM - {formatPrice(15)}/mo</option>
                      <option value="16GB RAM">16 GB RAM - {formatPrice(20)}/mo</option>
                      <option value="32GB RAM">32 GB RAM - {formatPrice(39)}/mo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase text-white/70 mb-1.5">
                      Hosting Region
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#A3E854] min-h-[44px]"
                    >
                      <option value="Bangladesh (Dhaka BDIX Edge)">Bangladesh (Dhaka BDIX Edge)</option>
                      <option value="India (Mumbai Central Facility)">India (Mumbai Central Facility)</option>
                    </select>
                    <div className="mt-1.5 text-[10px] font-mono text-[#A3E854]">
                      {region.includes('Bangladesh') 
                        ? 'Hardware: AMD Ryzen 7 5700G & Intel Xeon E5-2697 v4 (BDIX)'
                        : 'Hardware: Intel Xeon Platinum 8269CY (Mumbai Facility)'}
                    </div>
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
                  className="w-full min-h-[50px] py-3.5 text-xs font-black uppercase tracking-wider justify-center space-x-2 mt-4"
                >
                  <span>Deploy {serverPreset} Server</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
