import React from 'react';
import { MAIN_LANDING_PAGES, CITY_LOCATION_PAGES, KNOWLEDGE_ARTICLES } from '../data/seoData';

interface SEODirectoryFooterProps {
  onNavigate: (path: string) => void;
}

export const SEODirectoryFooter: React.FC<SEODirectoryFooterProps> = ({ onNavigate }) => {
  return (
    <section className="relative z-20 border-t border-white/10 bg-[#080909] py-12 px-4 sm:px-6 lg:px-8 font-inter text-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-mono uppercase tracking-wider text-[#A3E854] font-bold mb-6 flex items-center space-x-2">
          <span>🇧🇩 SenX Cloud Bangladesh Regional & SEO Directory</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-inter text-white/60">
          {/* Main Services */}
          <div>
            <h4 className="font-mono text-white font-semibold mb-3 uppercase text-[11px] text-[#A3E854]">
              Bangladesh Hosting Services
            </h4>
            <ul className="space-y-1.5">
              {Object.values(MAIN_LANDING_PAGES).slice(0, 7).map((page) => (
                <li key={page.slug}>
                  <button
                    onClick={() => onNavigate(`/${page.slug}`)}
                    className="hover:text-[#A3E854] transition-colors text-left cursor-pointer"
                  >
                    • {page.h1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional & City Locations */}
          <div>
            <h4 className="font-mono text-white font-semibold mb-3 uppercase text-[11px] text-[#A3E854]">
              Programmatic Cities & Locations
            </h4>
            <ul className="space-y-1.5">
              {Object.values(CITY_LOCATION_PAGES).map((page) => (
                <li key={page.slug}>
                  <button
                    onClick={() => onNavigate(`/${page.slug}`)}
                    className="hover:text-[#A3E854] transition-colors text-left cursor-pointer"
                  >
                    • {page.h1}
                  </button>
                </li>
              ))}
              {Object.values(MAIN_LANDING_PAGES).slice(7).map((page) => (
                <li key={page.slug}>
                  <button
                    onClick={() => onNavigate(`/${page.slug}`)}
                    className="hover:text-[#A3E854] transition-colors text-left cursor-pointer"
                  >
                    • {page.h1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledgebase Articles */}
          <div>
            <h4 className="font-mono text-white font-semibold mb-3 uppercase text-[11px] text-[#A3E854]">
              Topical Guides & Documentation
            </h4>
            <ul className="space-y-1.5">
              {Object.values(KNOWLEDGE_ARTICLES).map((art) => (
                <li key={art.slug}>
                  <button
                    onClick={() => onNavigate(`/knowledgebase/${art.slug}`)}
                    className="hover:text-[#A3E854] transition-colors text-left cursor-pointer"
                  >
                    • {art.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
