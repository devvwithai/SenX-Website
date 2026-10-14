import React from 'react';
import { Github, Disc as Discord, Activity } from 'lucide-react';
import { SenXLogo } from './SenXLogo';
import { SEODirectoryFooter } from './SEODirectoryFooter';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate = (_path: string) => {} }) => {
  return (
    <footer className="relative z-20 border-t border-white/[0.08] bg-[#050606] pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-16 border-b border-white/[0.06]">
          
          {/* Brand Info Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#111313] border border-white/10 flex items-center justify-center p-2">
                <SenXLogo className="w-5 h-5 text-[#A3E854]" />
              </div>
              <span className="text-xl font-black font-inter tracking-tight text-[#F7F7F7]">
                SenX <span className="text-[#A3E854]">Cloud</span>
              </span>
            </div>

            <p className="text-xs font-inter text-white/60 max-w-sm leading-relaxed">
              High-performance game server hosting in Bangladesh and India powered by {INFRASTRUCTURE_CONFIG.supportedCpus[0].model} and {INFRASTRUCTURE_CONFIG.supportedCpus[1].model} hardware, Enterprise NVMe storage, and direct BDIX local peering.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#111313] border border-white/10 text-[11px] sm:text-xs font-mono text-[#A3E854]">
              <span className="w-2 h-2 rounded-full bg-[#A3E854] animate-pulse shrink-0" />
              <span>India & Bangladesh Game Nodes Operational</span>
            </div>
          </div>

          {/* Game Infrastructure Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#A3E854] font-bold tracking-wider">Game Servers</h4>
            <ul className="space-y-2 text-xs font-inter text-white/60">
              <li>
                <button onClick={() => onNavigate('/minecraft-hosting-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Minecraft Hosting BD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/minecraft-hosting-india')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Minecraft Hosting India
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/palworld-hosting-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Palworld Server BD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/rust-hosting-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Rust Hosting BD & IN
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/fivem-hosting-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  FiveM GTA V BD
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#A3E854] font-bold tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs font-inter text-white/60">
              <li>
                <a href="https://status.orixcore.com/" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors flex items-center space-x-1">
                  <span>System Status</span>
                  <Activity className="w-3 h-3 text-[#A3E854]" />
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('/knowledgebase')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Knowledgebase & Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pterodactyl-hosting-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Pterodactyl Game Panel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/knowledgebase/how-to-host-a-minecraft-server-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  How to Host Minecraft in BD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/knowledgebase/best-minecraft-hosting-bangladesh')} className="hover:text-[#A3E854] transition-colors text-left cursor-pointer">
                  Minecraft Benchmark Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#A3E854] font-bold tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs font-inter text-white/60">
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Client Area & Billing</a></li>
              <li><a href="https://discord.gg/43QfPM286U" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors">Support Portal</a></li>
              <li><a href="https://discord.gg/43QfPM286U" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors">Discord Community</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Terms of Service</a></li>
              <li><a href="https://client.senxcloud.com/" className="hover:text-[#A3E854] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* SEO Directory Internal Links Cluster */}
        <div className="py-8 border-b border-white/[0.06]">
          <SEODirectoryFooter onNavigate={onNavigate} />
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} SenX Cloud Inc. All rights reserved. High-performance game server hosting in Bangladesh & India.
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://discord.gg/43QfPM286U" target="_blank" rel="noreferrer" className="hover:text-[#A3E854] transition-colors flex items-center space-x-1">
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
};
