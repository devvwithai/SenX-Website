import React, { useState } from 'react';
import { 
  BookOpen, Search, Clock, Calendar, User, ArrowLeft, 
  ChevronRight, Sparkles, Check, Bookmark, Share2, Layers, Cpu, ExternalLink 
} from 'lucide-react';
import { KNOWLEDGE_ARTICLES, SEOArticleData } from '../data/seoData';

interface KnowledgeBaseProps {
  currentSlug?: string;
  onNavigate: (path: string) => void;
  onGetStarted: () => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ currentSlug, onNavigate, onGetStarted }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // If a specific article slug is provided in URL, show Article Reader Mode
  const activeArticle: SEOArticleData | undefined = currentSlug 
    ? KNOWLEDGE_ARTICLES[currentSlug.replace('/knowledgebase/', '')]
    : undefined;

  const categories = ['All', 'Minecraft Guides', 'VPS & Infrastructure', 'BDIX & Latency', 'Tutorials'];

  const articlesList = Object.values(KNOWLEDGE_ARTICLES).filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render Article Reader View
  if (activeArticle) {
    return (
      <article className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 font-inter text-white">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs font-mono text-white/50">
            <li>
              <button onClick={() => onNavigate('/')} className="hover:text-[#A3E854] transition-colors">
                Home
              </button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-white/30" /></li>
            <li>
              <button onClick={() => onNavigate('/knowledgebase')} className="hover:text-[#A3E854] transition-colors">
                Knowledge Center
              </button>
            </li>
            <li><ChevronRight className="w-3 h-3 text-white/30" /></li>
            <li className="text-[#A3E854] font-medium truncate">{activeArticle.category}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => onNavigate('/knowledgebase')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#A3E854] border border-white/10 mb-8 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{activeArticle.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-jakarta text-white tracking-tight leading-tight mb-6">
            {activeArticle.h1}
          </h1>

          <p className="text-lg text-white/70 font-inter leading-relaxed mb-6">
            {activeArticle.summary}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 py-4 border-y border-white/10 text-xs font-mono text-white/60">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#A3E854]" />
              <span className="text-white font-medium">{activeArticle.author.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#A3E854]" />
              <span>Updated {activeArticle.updatedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#A3E854]" />
              <span>{activeArticle.readTime}</span>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        {activeArticle.tableOfContents.length > 0 && (
          <div className="liquid-glass-card p-6 rounded-2xl border border-white/10 mb-12">
            <h2 className="text-sm font-mono uppercase text-[#A3E854] font-bold mb-3 flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Table of Contents</span>
            </h2>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              {activeArticle.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-[#A3E854] transition-colors">
                    • {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Sections */}
        <div className="space-y-12 leading-relaxed text-base text-white/80 font-inter">
          {activeArticle.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <h2 className="text-2xl font-bold font-jakarta text-white mb-4">
                {section.title}
              </h2>
              <p className="whitespace-pre-line mb-4 text-white/80">
                {section.content}
              </p>

              {section.highlightBox && (
                <div className="p-4 rounded-xl bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] text-xs font-mono my-4">
                  {section.highlightBox}
                </div>
              )}

              {section.codeSnippet && (
                <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-white/90 overflow-x-auto my-4">
                  <code>{section.codeSnippet}</code>
                </pre>
              )}
            </section>
          ))}
        </div>

        {/* Article FAQ */}
        {activeArticle.faqs && activeArticle.faqs.length > 0 && (
          <section className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold font-jakarta text-white mb-6">Article Questions & Answers</h2>
            <div className="space-y-4">
              {activeArticle.faqs.map((faq, idx) => (
                <div key={idx} className="liquid-glass-card p-5 rounded-xl border border-white/10">
                  <h3 className="font-bold text-white text-base mb-2 font-jakarta">{faq.question}</h3>
                  <p className="text-xs text-white/70 font-inter">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Action Callout */}
        <div className="my-16 p-8 rounded-2xl bg-gradient-to-r from-[#0F1211] via-[#151C17] to-[#0F1211] border border-[#A3E854]/30 text-center">
          <h3 className="text-2xl font-black font-jakarta text-white mb-2">
            Ready to experience sub-5ms Minecraft & VPS hosting in Bangladesh?
          </h3>
          <p className="text-xs font-mono text-white/60 mb-6 max-w-xl mx-auto">
            Deploy on AMD Ryzen 9 7950X hardware with instant bKash, Nagad, and Rocket activation.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 rounded-xl bg-[#A3E854] text-[#050606] font-jakarta font-bold text-xs uppercase tracking-wider hover:bg-[#8CD33E] transition-all cursor-pointer shadow-lg"
          >
            Launch Server in Bangladesh
          </button>
        </div>

        {/* Related Guides & Services */}
        <section className="pt-8 border-t border-white/10">
          <h3 className="text-xs font-mono uppercase text-[#A3E854] font-bold mb-4">
            Related Guides & Bangladesh Services
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeArticle.relatedServices.map((slug) => (
              <button
                key={slug}
                onClick={() => onNavigate(`/${slug}`)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#A3E854]/10 text-xs font-mono text-white/70 hover:text-[#A3E854] border border-white/10 transition-all cursor-pointer"
              >
                /{slug}
              </button>
            ))}
          </div>
        </section>
      </article>
    );
  }

  // Render Knowledge Hub Directory List View
  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 font-inter text-white">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#A3E854]/10 border border-[#A3E854]/30 text-[#A3E854] text-xs font-mono font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Bangladesh Game Hosting & Cloud Knowledge Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-jakarta tracking-tight text-white mb-4">
          Expert Technical Guides & Documentation
        </h1>
        <p className="text-base text-white/70 font-inter">
          Master Minecraft server optimization, BDIX networking, Pterodactyl management, and Linux VPS configuration.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-12 max-w-3xl mx-auto space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides (e.g. Minecraft TPS, BDIX Ping, PaperMC, VPS setup)..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 font-inter text-sm focus:outline-none focus:border-[#A3E854] transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#A3E854] text-[#050606] font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesList.map((art) => (
          <div
            key={art.slug}
            onClick={() => onNavigate(`/knowledgebase/${art.slug}`)}
            className="liquid-glass-card rounded-2xl p-6 border border-white/10 hover:border-[#A3E854]/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A3E854] mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#A3E854]/10 border border-[#A3E854]/20">
                  {art.category}
                </span>
                <span>{art.readTime}</span>
              </div>

              <h2 className="text-lg font-bold font-jakarta text-white group-hover:text-[#A3E854] transition-colors mb-2">
                {art.title}
              </h2>

              <p className="text-xs text-white/60 font-inter line-clamp-3 mb-6">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-[#A3E854] transition-colors">
              <span>Read Guide</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
