import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Server, Activity, ShieldCheck, Zap, ArrowRight, Wifi, Cpu, HardDrive } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  city: string;
  country: string;
  x: number; // SVG coordinate x (0 to 1000)
  y: number; // SVG coordinate y (0 to 500)
  ping: string;
  hardware: string;
  networkSpeed: string;
  availableCapacity: string;
  ip: string;
}

export const InfrastructureMap: React.FC = () => {
  const nodes: NetworkNode[] = [
    {
      id: 'singapore',
      name: 'Singapore Edge Datacenter',
      city: 'Singapore',
      country: 'Singapore',
      x: 760,
      y: 290,
      ping: '12ms',
      hardware: 'AMD Ryzen 9 7950X3D • 128GB DDR5 ECC',
      networkSpeed: '10 Gbps Anycast',
      availableCapacity: '94% Free',
      ip: '139.99.18.241',
    },
    {
      id: 'india',
      name: 'Mumbai Core Facility',
      city: 'Mumbai',
      country: 'India',
      x: 685,
      y: 260,
      ping: '16ms',
      hardware: 'AMD Ryzen 9 7900X • 64GB DDR5',
      networkSpeed: '10 Gbps BGP',
      availableCapacity: '88% Free',
      ip: '103.212.44.11',
    },
    {
      id: 'bangladesh',
      name: 'Dhaka Regional Hub',
      city: 'Dhaka',
      country: 'Bangladesh',
      x: 720,
      y: 250,
      ping: '19ms',
      hardware: 'AMD Ryzen 9 5900X • 64GB DDR4',
      networkSpeed: '10 Gbps Direct',
      availableCapacity: '82% Free',
      ip: '103.114.22.8',
    },
    {
      id: 'germany',
      name: 'Frankfurt DE-1 Central',
      city: 'Frankfurt',
      country: 'Germany',
      x: 480,
      y: 170,
      ping: '18ms',
      hardware: 'AMD EPYC 9654 • 512GB ECC',
      networkSpeed: '20 Gbps Anycast',
      availableCapacity: '91% Free',
      ip: '188.40.12.98',
    },
    {
      id: 'usa',
      name: 'Virginia US-East Hub',
      city: 'Ashburn',
      country: 'USA',
      x: 250,
      y: 195,
      ping: '24ms',
      hardware: 'AMD Ryzen 9 7950X3D • 128GB DDR5',
      networkSpeed: '10 Gbps Unmetered',
      availableCapacity: '95% Free',
      ip: '192.99.88.10',
    },
  ];

  const [activeNode, setActiveNode] = useState<NetworkNode>(nodes[0]);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  const displayNode = hoveredNode || activeNode;

  return (
    <section id="locations" className="relative z-20 py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-white/20 text-xs font-mono text-[#A3E854] mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>CLOUD FLUX ANYCAST NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-inter text-[#F7F7F7]">
            Global Low-Latency <span className="text-[#A3E854]">Network Map.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-inter text-white/60 max-w-md mt-4 md:mt-0">
          Dark vector network topology with automated packet routing across 5 core global edge regions.
        </p>
      </div>

      {/* Main Vector Map Container */}
      <div className="liquid-glass-card p-4 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl">
        
        {/* World Map SVG Viewport */}
        <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] rounded-2xl bg-[#080a0a]/90 border border-white/10 overflow-hidden flex items-center justify-center">
          
          {/* Subtle Grid Dot Matrix */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Map Node Pins */}
          <div className="absolute inset-0 pointer-events-auto">
            {nodes.map((node) => {
              const isActive = displayNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ left: `${(node.x / 1000) * 100}%`, top: `${(node.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <span className="absolute -inset-2 rounded-full border border-[#A3E854] animate-ping opacity-40" />
                  <div className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isActive ? 'bg-[#A3E854] border-black scale-125' : 'bg-[#050606] border-[#A3E854]'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#A3E854]/10 border border-[#A3E854]/30 flex items-center justify-center text-[#A3E854]">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">{displayNode.name}</div>
              <div className="text-white/50">{displayNode.city}, {displayNode.country} ({displayNode.ip})</div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-white/80">
            <div>Ping: <span className="text-[#A3E854] font-bold">{displayNode.ping}</span></div>
            <div>Speed: <span className="text-white font-bold">{displayNode.networkSpeed}</span></div>
            <div>Capacity: <span className="text-[#A3E854] font-bold">{displayNode.availableCapacity}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
