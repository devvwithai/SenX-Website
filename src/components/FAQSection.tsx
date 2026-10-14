import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, Zap, Shield, Globe, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface FAQItem {
  id: string;
  category: 'general' | 'specs' | 'security' | 'billing';
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQSection: React.FC = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = useMemo(() => [
    {
      id: 'faq-1',
      category: 'general',
      question: 'What game server hosting services does SenX Cloud offer?',
      answer: 'SenX Cloud specializes exclusively in high-performance game server hosting in Bangladesh and India. Supported game server environments include Minecraft (PaperMC, Purpur, Fabric, Forge, Bedrock/Geyser), Palworld, Rust, FiveM (GTA V), and Minecraft Velocity/BungeeCord proxies with sub-60 second automated provisioning.',
      highlights: ['Minecraft Server Hosting', 'Palworld & Rust Hosting', 'FiveM Server Hosting', 'Velocity & BungeeCord Proxies'],
    },
    {
      id: 'faq-2',
      category: 'general',
      question: 'Why is SenX Cloud the best choice for Minecraft Hosting in Bangladesh?',
      answer: 'SenX Cloud connects directly to the Bangladesh Internet Exchange (BDIX) in Dhaka. This guarantees ultra-low ping across all Bangladeshi broadband and mobile networks (Grameenphone, Robi, Banglalink, local ISPs), high single-thread clock speed for 20.0 TPS stability, instant Pterodactyl panel setup, and convenient bKash & Nagad payment methods.',
      highlights: ['Local BDIX Peering', '20.0 TPS Tick Performance', 'Automated Sub-60s Setup', 'bKash & Nagad Payments'],
    },
    {
      id: 'faq-3',
      category: 'specs',
      question: 'What hardware processors power SenX Cloud game nodes?',
      answer: `Our game server infrastructure is powered by verified enterprise hardware: ${INFRASTRUCTURE_CONFIG.supportedCpus[0].model} processors delivering high single-thread clock speeds for Minecraft tick execution, and ${INFRASTRUCTURE_CONFIG.supportedCpus[1].model} multi-core processors for high-density multi-world networks, backed by Enterprise NVMe SSD storage.`,
      highlights: [INFRASTRUCTURE_CONFIG.supportedCpus[0].model, INFRASTRUCTURE_CONFIG.supportedCpus[1].model, 'Enterprise NVMe SSD RAID', 'High-Speed ECC Memory'],
    },
    {
      id: 'faq-4',
      category: 'security',
      question: 'Where are SenX Cloud game server locations situated?',
      answer: 'SenX Cloud operates active game server nodes in Bangladesh (Dhaka BDIX Edge) and India (Mumbai Central Facility). These nodes provide optimal regional routing for players across South Asia without relying on distant international routes.',
      highlights: ['Bangladesh (Dhaka BDIX Edge)', 'India (Mumbai Central Facility)', 'South Asia Game Peering', 'Direct Local Routing'],
    },
    {
      id: 'faq-5',
      category: 'security',
      question: 'How does SenX Cloud protect game servers against DDoS attacks?',
      answer: 'All SenX Cloud game servers include inline hardware DDoS filtering specifically tailored for game traffic. Our filtering rules analyze UDP protocol handshakes and scrub volumetric attack vectors commonly targeting Minecraft, Rust, and FiveM servers.',
      highlights: ['Inline Game DDoS Mitigation', 'UDP Protocol Inspection', 'Zero Latency Spikes', 'Always-On Filtering'],
    },
    {
      id: 'faq-6',
      category: 'specs',
      question: 'Which control panel is provided for game management?',
      answer: 'Every game server includes our customized Pterodactyl Game Wings panel. You get full access to live websocket console logs, an intuitive web file manager, full SFTP access, one-click modpack and plugin installers, automated scheduled backups, and custom sub-domain management.',
      highlights: ['Customized Pterodactyl Panel', 'One-Click Mod & Plugin Installers', 'Live Terminal Console', 'Automated S3 Backups'],
    },
    {
      id: 'faq-7',
      category: 'billing',
      question: 'Can I upgrade my RAM or storage if my player base grows?',
      answer: 'Yes. You can seamlessly scale your game server plan, CPU threads, and RAM allocation directly through the SenX Client Area at any time. Server upgrades take effect instantly with no data loss and your server IP and settings remain intact.',
      highlights: ['Instant One-Click Scaling', 'Zero Data Loss', 'Server IP Preserved', 'Pro-rated Billing'],
    },
    {
      id: 'faq-8',
      category: 'billing',
      question: 'Which payment methods are accepted?',
      answer: 'We accept local Bangladeshi payment methods including bKash, Nagad, Rocket, and local internet banking, as well as Indian payment gateways (UPI, Cards, NetBanking), and international credit/debit cards.',
      highlights: ['bKash & Nagad (Bangladesh)', 'UPI & Local Cards (India)', 'International Cards', 'Instant Automated Invoicing'],
    },
  ], []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [faqs, activeCategory, searchQuery]);

  return (
    <section id="faq" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>GAME SERVER KNOWLEDGE & FAQ</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Frequently Asked <span className="text-[#A3E854]">Questions.</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed">
          Everything you need to know about our game server hosting, BDIX peering, and hardware in Bangladesh & India.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-lg mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-white/40 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search topics (e.g., Minecraft, BDIX, Ryzen, Backups)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111313]/90 border border-white/15 focus:border-[#A3E854]/70 rounded-full pl-11 pr-4 py-2.5 min-h-[44px] text-xs font-mono text-[#F7F7F7] focus:outline-none transition-colors placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'general', label: 'Game Hosting' },
            { id: 'specs', label: 'Hardware & Panel' },
            { id: 'security', label: 'Locations & DDoS' },
            { id: 'billing', label: 'Billing & Setup' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 min-h-[40px] rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-[#A3E854] text-[#050606] font-bold border-[#A3E854]'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-sm font-mono text-white/40">
            No matching questions found for "{searchQuery}".
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#111411]/90 border-[#A3E854]/40 shadow-lg'
                    : 'bg-[#111313]/70 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  className="w-full px-5 sm:px-7 py-4 sm:py-5 min-h-[52px] text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold font-inter text-[#F7F7F7] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isExpanded
                        ? 'bg-[#A3E854] text-[#050606] border-[#A3E854] rotate-180'
                        : 'bg-white/5 text-white/60 border-white/10'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 sm:px-7 pb-5 sm:pb-6 text-xs sm:text-sm font-inter text-white/70 leading-relaxed border-t border-white/[0.06] pt-4"
                    >
                      <p>{faq.answer}</p>

                      {faq.highlights && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {faq.highlights.map((h, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#A3E854]/10 border border-[#A3E854]/30 text-[11px] font-mono text-[#A3E854]"
                            >
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
});
