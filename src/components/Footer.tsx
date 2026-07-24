import React from 'react';
import { Cloud, Github, Disc as Discord, Shield, BookOpen, Activity, ArrowUpRight } from 'lucide-react';
import { SenXLogo } from './SenXLogo';

export const Footer: React.FC = React.memo(() => {
  return (
    <footer className="relative z-20 border-t border-white/[0.08] bg-[#050606] pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-16 border-b border-white/[0.06]">
          
          {/* Brand Info Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#111313] border border-white/10 flex items-center justify-center p-2">
                <SenXLogo className="w-5 h-5 text-[#A3E854]" />
              </div>
              <span className="text-xl font-black font-inter tracking-tight text-[#F7F7F7]">
                SenX <span className="text-[#A3E854]">Cloud</span>
              </span>
            </div>

            <p className="text-xs font-inter text-white/60 max-w-sm leading-relaxed">
              Ultra-high-performance cloud infrastructure and game hosting provider powered by AMD Ryzen 9 5950X processors, Gen4 NVMe storage, and 3.2 Tbps DDoS shield.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#111313] border border-white/10 text-[11px] sm:text-xs font-mono text-[#A3E854]">
              <span className="w-2 h-2 rounded-full bg-[#A3E854] animate-pulse shrink-0" />
              <span>All Infrastructure Nodes Operational</span>
            </div>
          </div>

          {/* Infrastructure Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#A3E854] font-bold tracking-wider">Infrastructure</h4>
            <ul className="space-y-2 text-xs font-inter text-white/60">
              <li><a href="#game-hosting" className="hover:text-[#A3E854] transition-colors">Minecraft Hosting</a></li>
              <li><a href="#game-hosting" className="hover:text-[#A3E854] transition-colors">Palworld Hosting</a></li>
              <li><a href="#game-hosting" className="hover:text-[#A3E854] transition-colors">Rust Hosting</a></li>
              <li><a href="#game-hosting" className="hover:text-[#A3E854] transition-colors">FiveM / GTA V</a></li>
              <li><a href="#cloud-vps" className="hover:text-[#A3E854] transition-colors">High-RAM Cloud VPS</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#A3E854] font-bold tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs font-inter text-white/60">
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors flex items-center space-x-1"><span>System Status</span><Activity className="w-3 h-3 text-[#A3E854]" /></a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Knowledgebase & Docs</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Pterodactyl Game Panel</a></li>
              <li><a href="#locations" className="hover:text-[#A3E854] transition-colors">BGP Looking Glass</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">SLA Guarantee (99.99%)</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#A3E854] font-bold tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs font-inter text-white/60">
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Client Area & Billing</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Support Portal</a></li>
              <li><a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors">Discord Community</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Terms of Service</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} SenX Cloud Inc. All rights reserved. Built for gamers and developers.
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors flex items-center space-x-1">
              <Discord className="w-4 h-4" />
              <span>Discord</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors flex items-center space-x-1">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});
