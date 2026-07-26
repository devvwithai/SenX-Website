import React, { useState } from 'react';
import { 
  Zap, Cpu, ShieldCheck, CreditCard, Terminal, Globe, HardDrive, 
  Server, Sliders, Gauge, Shield, Radio, Box, CheckCircle, 
  DollarSign, Users, Code, Headphones, ArrowLeft, Check, 
  ExternalLink, ChevronRight, Star, Sparkles, Layers 
} from 'lucide-react';
import { SEOLandingPageData } from '../data/seoData';
import { useCurrency } from '../context/CurrencyContext';

interface SEOLandingPageProps {
  data: SEOLandingPageData;
  onNavigate: (path: string) => void;
  onGetStarted: () => void;
}

export const SEOLandingPage: React.FC<SEOLandingPageProps> = ({ data, onNavigate, onGetStarted }) => {
  const { formatPrice, currencyConfig } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Map icon string to Lucide component
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#A3E854]' };
    switch (iconName) {
      case 'Zap': return <Zap {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'HardDrive': return <HardDrive {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Gauge': return <Gauge {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Box': return <Box {...props} />;
      case 'CheckCircle': return <CheckCircle {...props} />;
      case 'DollarSign': return <DollarSign {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Code': return <Code {...props} />;
      case 'Headphones': return <Headphones {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <article className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 font-inter text-white">
      {/* Breadcrumbs for SEO & Accessibility */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-xs font-mono text-white/50">
          <li>
            <button 
              onClick={() => onNavigate('/')} 
              className="hover:text-[#A3E854] transition-colors flex items-center gap-1"
            >
              <span>Home</span>
            </button>
          </li>
          <li><ChevronRight className="w-3 h-3 text-white/30" /></li>
          <li>
            <span className="text-[#A3E854] font-medium">{data.category}</span>
          </li>
          <li><ChevronRight className="w-3 h-3 text-white/30" /></li>
          <li className="text-white/80 truncate max-w-[200px] sm:max-w-none">{data.h1}</li>
        </ol>
      </nav>

      {/* Back to Overview Button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#A3E854] border border-white/10 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Platform</span>
        </button>
      </div>

      {/* Hero Container */}
      <header className="relative rounded-3xl p-8 sm:p-12 mb-16 overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F1211] via-[#080909] to-[#050606] shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E854]/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] text-xs font-mono font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{data.badgeText}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-jakarta tracking-tight text-white mb-6 leading-tight">
          {data.h1}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-white/70 font-inter max-w-3xl mb-8 leading-relaxed">
          {data.subtitle}
        </p>

        {/* CTAs & Local Currency Notice */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-xl bg-[#A3E854] text-[#050606] font-jakarta font-bold text-base hover:bg-[#8CD33E] hover:shadow-[0_0_30px_rgba(163,232,84,0.4)] transition-all transform active:scale-98 cursor-pointer flex items-center space-x-2"
          >
            <span>Deploy in Bangladesh Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-xs font-mono text-white/60 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
            <CreditCard className="w-4 h-4 text-[#A3E854]" />
            <span>Instant bKash, Nagad, Rocket & Cards Automated Activation</span>
          </div>
        </div>
      </header>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="liquid-glass-card p-8 rounded-2xl border border-white/10">
          <h2 className="text-xl font-mono font-bold text-[#A3E854] mb-4 uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>Bangladesh Infrastructure Overview</span>
          </h2>
          <p className="text-white/80 font-inter text-base sm:text-lg leading-relaxed">
            {data.overview}
          </p>
        </div>
      </section>

      {/* Key Highlights Grid */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-jakarta font-bold text-white mb-8">
          Why SenX Cloud is #1 in Bangladesh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.keyHighlights.map((item, idx) => (
            <div key={idx} className="liquid-glass-card p-6 rounded-2xl border border-white/10 hover:border-[#A3E854]/40 transition-all group">
              <div className="p-3 rounded-xl bg-[#A3E854]/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                {renderIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold font-jakarta text-white mb-2">{item.title}</h3>
              <p className="text-xs text-white/60 font-inter leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers Table */}
      <section className="mb-16" id="plans">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-jakarta font-bold text-white">
              Instant Deployment Plans & Pricing
            </h2>
            <p className="text-xs font-mono text-white/60 mt-1">
              Currently showing prices in <span className="text-[#A3E854] font-bold">{currencyConfig.code} ({currencyConfig.symbol})</span>
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#A3E854]/10 text-[#A3E854] border border-[#A3E854]/20 w-fit">
            ⚡ Unmetered BDIX Traffic
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative liquid-glass-card rounded-2xl p-8 border transition-all flex flex-col justify-between ${
                plan.popular 
                  ? 'border-[#A3E854] shadow-[0_0_30px_rgba(163,232,84,0.15)] bg-gradient-to-b from-[#A3E854]/5 to-transparent' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A3E854] text-[#050606] text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  Most Popular in Bangladesh
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold font-jakarta text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-4xl font-black font-jakarta text-[#A3E854]">
                    {formatPrice(plan.priceUsd)}
                  </span>
                  <span className="text-xs font-mono text-white/50">/month</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs font-mono text-white/80">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#A3E854] shrink-0" />
                    <span><strong>RAM:</strong> {plan.ram}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#A3E854] shrink-0" />
                    <span><strong>CPU:</strong> {plan.cpu}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#A3E854] shrink-0" />
                    <span><strong>Storage:</strong> {plan.storage}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#A3E854] shrink-0" />
                    <span><strong>Network:</strong> {plan.bandwidth}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#A3E854] shrink-0" />
                    <span><strong>Location:</strong> Dhaka BDIX Peered</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGetStarted}
                className={`w-full py-3.5 rounded-xl font-jakarta font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-[#A3E854] text-[#050606] hover:bg-[#8CD33E] shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Deploy Plan Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-jakarta font-bold text-white mb-6">
          How SenX Cloud Compares
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 liquid-glass-card">
          <table className="w-full text-left text-xs font-inter min-w-[600px]">
            <thead className="bg-white/5 font-mono uppercase text-[#A3E854] border-b border-white/10">
              <tr>
                <th className="p-4 font-bold">Feature / Metric</th>
                <th className="p-4 font-bold text-[#A3E854] bg-[#A3E854]/10">SenX Cloud Bangladesh</th>
                <th className="p-4 font-bold text-white/60">Generic Singapore Host</th>
                <th className="p-4 font-bold text-white/60">Traditional Local Host</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {data.comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white font-mono">{row.feature}</td>
                  <td className="p-4 font-bold text-[#A3E854] bg-[#A3E854]/5">{row.senxCloud}</td>
                  <td className="p-4 text-white/50">{row.genericSingapore}</td>
                  <td className="p-4 text-white/50">{row.traditionalBd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Hardware Specs Card */}
      <section className="mb-16">
        <div className="liquid-glass-card rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-bold font-jakarta text-white mb-6 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#A3E854]" />
            <span>Hardware & Node Specifications</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.specs.map((spec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">{spec.label}</span>
                <span className="text-sm font-semibold font-mono text-white">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion (AEO Snippet Optimized) */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-jakarta font-bold text-white mb-2">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-xs font-mono text-white/50 mb-8">
          Answers optimized for Bangladeshi users and Search Engine Snippets
        </p>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="liquid-glass-card rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-jakarta font-bold text-base text-white hover:text-[#A3E854] transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className="text-xl font-mono text-[#A3E854]">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-sm text-white/70 font-inter leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Internal Linking Cluster */}
      <section className="pt-8 border-t border-white/10">
        <h3 className="text-sm font-mono uppercase text-[#A3E854] font-bold mb-4">
          Explore Related Bangladesh Hosting Solutions
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.relatedSlugs.map((slug) => (
            <button
              key={slug}
              onClick={() => onNavigate(`/${slug}`)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#A3E854]/10 text-xs font-mono text-white/70 hover:text-[#A3E854] border border-white/10 hover:border-[#A3E854]/30 transition-all cursor-pointer"
            >
              /{slug}
            </button>
          ))}
          <button
            onClick={() => onNavigate('/knowledgebase')}
            className="px-3 py-1.5 rounded-lg bg-[#A3E854]/20 text-xs font-mono text-[#A3E854] border border-[#A3E854]/40 hover:bg-[#A3E854]/30 transition-all cursor-pointer font-bold"
          >
            📚 Knowledge Center & Tutorials
          </button>
        </div>
      </section>
    </article>
  );
};
