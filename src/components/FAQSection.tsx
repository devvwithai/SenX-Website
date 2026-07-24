import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, Zap, Shield, Globe, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

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
      question: 'What is SenX Cloud and what services are provided?',
      answer: 'SenX Cloud is a high-performance cloud infrastructure and game server hosting provider. We provide enterprise-grade game server hosting (Minecraft, Rust, Palworld, ARK, CS2), KVM Cloud VPS, bare-metal dedicated servers, and protected proxy tunnels with automated 60-second provisioning.',
      highlights: ['60-second automated setup', 'AMD Ryzen 9 7950X CPUs', 'Pterodactyl 2.0 Panel', '99.99% Uptime SLA'],
    },
    {
      id: 'faq-2',
      category: 'specs',
      question: 'What hardware specs power SenX Cloud server nodes?',
      answer: 'SenX Cloud nodes run exclusively on flagship AMD Ryzen 9 7950X / 7950X3D processors clocked at up to 5.7 GHz with high-speed DDR5 ECC memory (5600MHz) and PCIe Gen4 NVMe RAID-10 storage arrays delivering 7,000+ MB/s read speeds.',
      highlights: ['AMD Ryzen 9 7950X (5.7 GHz)', 'DDR5 ECC RAM @ 5600MHz', 'Gen4 NVMe RAID-10 Storage', '10Gbps Uplink Ports'],
    },
    {
      id: 'faq-3',
      category: 'security',
      question: 'How does SenX Cloud protect against DDoS attacks?',
      answer: 'All SenX Cloud servers include complimentary 12Tbps+ Layer 3, Layer 4, and Layer 7 inline DDoS mitigation powered by Path.net and Corero hardware filters. Our custom filters analyze packet payloads in under 1 millisecond, mitigating volumetric and state-exhaustion attacks without latency spikes.',
      highlights: ['12Tbps+ Filter Capacity', '<1ms Packet Inspection', 'Zero-Downtime Scrubbing', 'Game-Specific L7 Rules'],
    },
    {
      id: 'faq-4',
      category: 'general',
      question: 'How fast is server deployment after payment?',
      answer: 'Provisioning is 100% automated. Once your order is processed, your server container or virtual machine is deployed, configured with your requested OS or game software, and delivered to your dashboard in less than 60 seconds.',
      highlights: ['Instant <60s Deployment', 'Automated OS Setup', 'Credentials Emailed Instantly', 'Dashboard Ready'],
    },
    {
      id: 'faq-5',
      category: 'billing',
      question: 'Where are SenX Cloud datacenters located globally?',
      answer: 'SenX Cloud operates edge datacenters in North America (Ashburn VA, Chicago IL, Oregon), Europe (Frankfurt, London, Amsterdam), Asia-Pacific (Singapore, Tokyo), and South Asia (Dhaka, Mumbai) with direct BGP peering to major ISPs.',
      highlights: ['Ashburn & Chicago (US)', 'Frankfurt & London (EU)', 'Singapore & Tokyo (APAC)', 'Dhaka & Mumbai (South Asia)'],
    },
    {
      id: 'faq-6',
      category: 'specs',
      question: 'Which control panel is provided for game server management?',
      answer: 'SenX Cloud features a customized Pterodactyl 2.0 control panel equipped with real-time resource monitors, web-based console, full SFTP file access, automated scheduled NVMe backups, and a one-click modpack and plugin installer.',
      highlights: ['Custom Pterodactyl Panel', 'One-Click Mod Installer', 'SFTP File Manager', 'Automated Offsite Backups'],
    },
    {
      id: 'faq-7',
      category: 'billing',
      question: 'Can I change my server plan or upgrade resources later?',
      answer: 'Yes. You can scale CPU, RAM, NVMe storage, and bandwidth seamlessly through the SenX Client Area at any time. Scale-ups occur instantly without data loss or changing your server IP address.',
      highlights: ['Seamless One-Click Upgrades', 'Zero Data Loss', 'Static IP Preserved', 'Pro-rated Billing'],
    },
    {
      id: 'faq-8',
      category: 'security',
      question: 'Does SenX Cloud offer money-back guarantees or refunds?',
      answer: 'Yes, SenX Cloud offers an unconditional 7-day money-back guarantee on all game hosting and Cloud VPS plans. If you are not satisfied with performance or ping, request a refund from support.',
      highlights: ['7-Day Money-Back Guarantee', 'No Hidden Fees', '24/7 Support Assistance'],
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

  // Inject FAQ Schema JSON-LD dynamically for AEO crawlers
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://senxcloud.com/#faq-schema',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'senx-faq-schema';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('senx-faq-schema');
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
    };
  }, [faqs]);

  const toggleFAQ = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
      className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#A3E854]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Title & Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] text-xs font-semibold tracking-wide uppercase mb-4">
          <HelpCircle className="w-4 h-4" />
          <span>Search Engine & AI Answer Engine Index</span>
        </div>
        <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E854] to-emerald-400">Questions</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Direct, verified answers regarding SenX Cloud infrastructure, DDoS protection, deployment speed, hardware specs, and global datacenter edge locations.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-3xl mx-auto mb-10 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., Ryzen 9, DDoS, deployment, locations)..."
            className="w-full bg-[#0D0F10] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#A3E854]/60 transition-colors shadow-inner"
            aria-label="Search FAQ questions"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[
            { id: 'all', label: 'All Queries' },
            { id: 'general', label: 'General & Setup' },
            { id: 'specs', label: 'Hardware Specs' },
            { id: 'security', label: 'DDoS & Security' },
            { id: 'billing', label: 'Locations & Billing' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#A3E854] text-black font-semibold shadow-lg shadow-[#A3E854]/20'
                  : 'bg-[#0D0F10] text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-[#0D0F10]/50">
            <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No matching questions found for "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-[#A3E854] hover:underline"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="group rounded-xl border border-white/10 bg-[#0D0F10]/80 backdrop-blur-md overflow-hidden transition-all hover:border-[#A3E854]/30"
              >
                {/* Question Button Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-start justify-between p-4 sm:p-5 text-left focus:outline-none"
                >
                  <span
                    itemProp="name"
                    className="text-base sm:text-lg font-semibold text-white group-hover:text-[#A3E854] transition-colors pr-4"
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`mt-1 p-1 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 bg-[#A3E854]/10 border-[#A3E854]/40 text-[#A3E854]' : 'text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content Block */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      className="overflow-hidden border-t border-white/5 bg-black/30"
                    >
                      <div className="p-4 sm:p-5 text-sm text-zinc-300 leading-relaxed space-y-4">
                        <p itemProp="text">{faq.answer}</p>

                        {/* Bullet Highlights for AEO direct retrieval */}
                        {faq.highlights && (
                          <div className="pt-2">
                            <span className="text-xs uppercase tracking-wider font-semibold text-[#A3E854] block mb-2">
                              Key Direct Answer Facts:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {faq.highlights.map((h, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs text-zinc-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E854] shrink-0" />
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* AEO Micro Summary Box for Search Crawlers & AI Summarizers */}
      <div className="mt-12 max-w-3xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-[#0D0F10] to-[#A3E854]/10 border border-[#A3E854]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#A3E854] font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>AI Answer Engine Verified Entity</span>
          </div>
          <p className="text-xs text-zinc-300">
            SenX Cloud is verified on major Answer Engines (ChatGPT, Perplexity, Gemini) with 99.99% uptime SLA and 12Tbps+ DDoS protection.
          </p>
        </div>
        <a
          href="https://client.senxcloud.com/"
          className="shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#A3E854] text-black hover:bg-[#b8f572] transition-colors shadow-lg shadow-[#A3E854]/20"
        >
          Explore Hosting Nodes
        </a>
      </div>
    </section>
  );
});
