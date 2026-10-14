import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Server, Activity, ShieldCheck, Zap, Cpu, HardDrive, Wifi, Clock } from 'lucide-react';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface DatacenterLocation {
  id: string;
  flag: string;
  shortCode: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  cpu: string;
  storage: string;
  network: string;
  status: 'Online' | 'Maintenance';
  ip: string;
}

interface ArcConnection {
  id: string;
  from: DatacenterLocation;
  to: DatacenterLocation;
}

// Continent land mask precomputation helper (Static 100 x 50 grid)
const COLS = 100;
const ROWS = 50;

const checkIsLand = (normX: number, normY: number): boolean => {
  // Asia (focus on India and Bangladesh subcontinent)
  if (normX >= 0.64 && normX <= 0.74 && normY >= 0.35 && normY <= 0.55) return true; // India
  if (normX >= 0.73 && normX <= 0.78 && normY >= 0.35 && normY <= 0.46) return true; // Bangladesh
  if (normX >= 0.58 && normX <= 0.90 && normY >= 0.15 && normY <= 0.40) return true; // Central & North Asia
  if (normX >= 0.76 && normX <= 0.86 && normY >= 0.42 && normY <= 0.60) return true; // SE Asia
  // Europe
  if (normX >= 0.44 && normX <= 0.58 && normY >= 0.18 && normY <= 0.36) return true;
  // Africa
  if (normX >= 0.44 && normX <= 0.62 && normY >= 0.36 && normY <= 0.72) return true;
  // North America
  if (normX >= 0.10 && normX <= 0.30 && normY >= 0.15 && normY <= 0.45) return true;
  // South America
  if (normX >= 0.26 && normX <= 0.38 && normY >= 0.50 && normY <= 0.80) return true;
  // Australia
  if (normX >= 0.78 && normX <= 0.90 && normY >= 0.62 && normY <= 0.80) return true;

  return false;
};

// Precompute land mask once
const LAND_GRID = new Uint8Array(ROWS * COLS);
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    LAND_GRID[r * COLS + c] = checkIsLand(c / COLS, r / ROWS) ? 1 : 0;
  }
}

export const LEDWorldMap: React.FC = React.memo(() => {
  // Two Active Game Hosting Datacenter Locations: Bangladesh & India
  const locations: DatacenterLocation[] = [
    {
      id: 'bangladesh',
      flag: '🇧🇩',
      shortCode: 'BD-DHK',
      name: 'Bangladesh (Dhaka BDIX Edge)',
      city: 'Dhaka',
      country: 'Bangladesh',
      lat: 23.8103,
      lng: 90.4125,
      cpu: 'AMD Ryzen 7 5700G / Intel Xeon E5-2697 v4',
      storage: 'Enterprise NVMe SSD RAID',
      network: 'BDIX Direct Local Peering',
      status: 'Online',
      ip: '103.114.22.8',
    },
    {
      id: 'india',
      flag: '🇮🇳',
      shortCode: 'IN-BOM',
      name: 'India (Mumbai Central Facility)',
      city: 'Mumbai',
      country: 'India',
      lat: 19.0760,
      lng: 72.8777,
      cpu: 'AMD Ryzen 7 5700G / Intel Xeon E5-2697 v4',
      storage: 'Enterprise NVMe SSD RAID',
      network: 'Tier-3 National Transit',
      status: 'Online',
      ip: '103.212.44.11',
    },
  ];

  const locMap = locations.reduce((acc, l) => {
    acc[l.id] = l;
    return acc;
  }, {} as Record<string, DatacenterLocation>);

  // Direct High-Speed Peering Route: India ↔ Bangladesh
  const arcs: ArcConnection[] = [
    { id: 'in-bd', from: locMap['india'], to: locMap['bangladesh'] },
  ];

  const [hoveredLocation, setHoveredLocation] = useState<DatacenterLocation | null>(locMap['bangladesh']);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // SVG Equirectangular Projection mapping to 800 x 400 SVG Canvas coordinates
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) * 800) / 360;
    const y = ((90 - lat) * 400) / 180;
    return { x, y };
  };

  // Quadratic Bezier Arc Generator
  const getArcPath = (from: DatacenterLocation, to: DatacenterLocation) => {
    const p1 = project(from.lat, from.lng);
    const p2 = project(to.lat, to.lng);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const controlX = (p1.x + p2.x) / 2;
    const controlY = Math.min(p1.y, p2.y) - Math.min(dist * 0.45, 60);

    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  };

  // Ultra-lightweight static dot render: draws once on resize, no heavy RAF loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderStaticDots = () => {
      const w = (canvas.width = canvas.offsetWidth * 2 || 1600);
      const h = (canvas.height = canvas.offsetHeight * 2 || 800);

      ctx.clearRect(0, 0, w, h);

      const stepX = w / COLS;
      const stepY = h / ROWS;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * stepX + stepX / 2;
          const y = r * stepY + stepY / 2;
          const isLand = LAND_GRID[r * COLS + c] === 1;

          if (isLand) {
            // Emphasize Indian subcontinent area
            const isSubcontinent = c >= 63 && c <= 78 && r >= 17 && r <= 28;
            ctx.fillStyle = isSubcontinent ? 'rgba(163, 232, 84, 0.75)' : 'rgba(163, 232, 84, 0.40)';
            ctx.beginPath();
            ctx.arc(x, y, isSubcontinent ? 2.5 : 1.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.beginPath();
            ctx.arc(x, y, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    renderStaticDots();

    const handleResize = () => {
      renderStaticDots();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="locations" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto select-none">
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[80%] h-[80%] bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(163,232,84,0.10),rgba(5,6,6,0))]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3"
      >
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <Globe className="w-3.5 h-3.5" />
          <span>SOUTH ASIA GAME ROUTING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Regional <span className="text-[#A3E854]">Infrastructure</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed max-w-2xl mx-auto">
          Optimized specifically for gamers in Bangladesh and India with direct local BDIX peering and high-performance hardware nodes.
        </p>
      </motion.div>

      {/* Main Container (#050606) with Liquid Glass */}
      <div className="liquid-glass-card p-3 sm:p-8 rounded-3xl border border-white/20 relative overflow-hidden shadow-2xl bg-[#050606]">
        
        {/* Map Viewport Area */}
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050606] relative">
          <div className="relative w-full aspect-[2/1] min-h-[300px] sm:min-h-[440px] flex items-center justify-center">
            
            {/* Ultra-efficient static Dotted Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-85" />

            {/* SVG Layer for Network Route */}
            <svg
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <defs>
                <linearGradient id="limeGradientArc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A3E854" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#A3E854" stopOpacity="1" />
                  <stop offset="100%" stopColor="#A3E854" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Direct Interconnection Route */}
              {arcs.map((arc) => {
                const pathD = getArcPath(arc.from, arc.to);
                return (
                  <g key={arc.id}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#A3E854"
                      strokeWidth="1.5"
                      strokeOpacity="0.35"
                      strokeDasharray="4 4"
                    />
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#limeGradientArc)"
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}

              {/* Node Anchor Dots */}
              {locations.map((loc) => {
                const { x, y } = project(loc.lat, loc.lng);
                return (
                  <circle
                    key={`node-anchor-${loc.id}`}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="#A3E854"
                  />
                );
              })}
            </svg>

            {/* Interactive Datacenter Pins */}
            <div className="absolute inset-0 pointer-events-auto z-20">
              {locations.map((loc) => {
                const { x, y } = project(loc.lat, loc.lng);
                const isHovered = hoveredLocation?.id === loc.id;
                const leftPct = (x / 800) * 100;
                const topPct = (y / 400) * 100;

                return (
                  <div
                    key={loc.id}
                    onMouseEnter={() => setHoveredLocation(loc)}
                    onClick={() => setHoveredLocation(loc)}
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group p-2"
                  >
                    <span className="absolute -inset-2 rounded-full border border-[#A3E854] animate-ping opacity-40 pointer-events-none" />
                    <div
                      className={`relative w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        isHovered
                          ? 'bg-[#A3E854] border-black scale-125 shadow-[0_0_15px_#A3E854]'
                          : 'bg-[#050606] border-[#A3E854] shadow-[0_0_8px_rgba(163,232,84,0.6)]'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#050606]" />
                    </div>

                    {/* Permanent Location Tag Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-white whitespace-nowrap">
                      {loc.flag} {loc.city}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top Status Badge */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 hidden sm:flex items-center space-x-2.5 text-xs font-mono z-30">
              <span className="w-2 h-2 rounded-full bg-[#A3E854] animate-pulse" />
              <span className="text-white/90">2 Active Gaming Infrastructure PoPs • India & Bangladesh</span>
            </div>

          </div>
        </div>

        {/* Location Selection Buttons */}
        <div className="mt-4 flex flex-wrap gap-2.5 justify-center">
          {locations.map((loc) => {
            const isSelected = hoveredLocation?.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setHoveredLocation(loc)}
                className={`px-4 py-2.5 min-h-[44px] rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-[#A3E854] text-[#050606] border-[#A3E854] shadow-md shadow-[#A3E854]/20'
                    : 'bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-normal">
                  {loc.shortCode}
                </span>
              </button>
            );
          })}
        </div>

        {/* Liquid Glass Inspector Tooltip */}
        <AnimatePresence mode="wait">
          {hoveredLocation && (
            <motion.div
              key={hoveredLocation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl liquid-glass border border-[#A3E854]/40 bg-[#0d0f0f]/95 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A3E854] to-transparent opacity-80" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                
                {/* Datacenter Header */}
                <div className="sm:col-span-2 lg:col-span-2 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A3E854]/10 border border-[#A3E854]/30 flex items-center justify-center text-xl shrink-0">
                    {hoveredLocation.flag}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-inter text-[#F7F7F7]">
                      {hoveredLocation.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#A3E854]">
                      {hoveredLocation.city}, {hoveredLocation.country}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-[#A3E854]" />
                    <span>Operational State</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A3E854] animate-pulse" />
                    <span className="text-xs font-bold font-mono text-[#A3E854]">{hoveredLocation.status}</span>
                  </div>
                </div>

                {/* CPU Hardware */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Cpu className="w-3 h-3 text-white/60" />
                    <span>Hardware Node</span>
                  </div>
                  <div className="text-xs font-inter font-medium text-white/90 truncate">
                    {hoveredLocation.cpu}
                  </div>
                </div>

                {/* Network Peering */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Wifi className="w-3 h-3 text-[#A3E854]" />
                    <span>Network Transit</span>
                  </div>
                  <div className="text-xs font-bold font-mono text-white/90">
                    {hoveredLocation.network}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
});
