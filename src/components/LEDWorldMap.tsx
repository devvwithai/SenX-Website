import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Server, Activity, ShieldCheck, Zap, Radio, Cpu, HardDrive, Wifi, Clock } from 'lucide-react';

interface DatacenterLocation {
  id: string;
  flag: string;
  shortCode: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  ping: string;
  cpu: string;
  storage: string;
  network: string;
  status: 'Online' | 'Maintenance';
  uptime: string;
  ip: string;
}

interface ArcConnection {
  id: string;
  from: DatacenterLocation;
  to: DatacenterLocation;
}

// Continent land mask precomputation helper
const COLS = 120;
const ROWS = 60;

const checkIsLand = (normX: number, normY: number): boolean => {
  // North America
  if (normX >= 0.08 && normX <= 0.30 && normY >= 0.12 && normY <= 0.28) return true;
  if (normX >= 0.12 && normX <= 0.29 && normY >= 0.28 && normY <= 0.42) return true;
  if (normX >= 0.18 && normX <= 0.28 && normY >= 0.42 && normY <= 0.52) return true;

  // South America
  if (normX >= 0.27 && normX <= 0.39 && normY >= 0.50 && normY <= 0.65) return true;
  if (normX >= 0.30 && normX <= 0.37 && normY >= 0.65 && normY <= 0.86) return true;

  // Europe & Nordics
  if (normX >= 0.44 && normX <= 0.55 && normY >= 0.18 && normY <= 0.34) return true;
  if (normX >= 0.50 && normX <= 0.62 && normY >= 0.10 && normY <= 0.24) return true;
  if (normX >= 0.55 && normX <= 0.66 && normY >= 0.18 && normY <= 0.32) return true;

  // Africa
  if (normX >= 0.42 && normX <= 0.62 && normY >= 0.35 && normY <= 0.48) return true;
  if (normX >= 0.48 && normX <= 0.62 && normY >= 0.48 && normY <= 0.76) return true;

  // Middle East
  if (normX >= 0.58 && normX <= 0.68 && normY >= 0.30 && normY <= 0.45) return true;

  // Asia
  if (normX >= 0.60 && normX <= 0.92 && normY >= 0.08 && normY <= 0.25) return true;
  if (normX >= 0.68 && normX <= 0.88 && normY >= 0.25 && normY <= 0.42) return true;
  if (normX >= 0.68 && normX <= 0.74 && normY >= 0.35 && normY <= 0.52) return true; // India
  if (normX >= 0.74 && normX <= 0.77 && normY >= 0.34 && normY <= 0.44) return true; // Bangladesh
  if (normX >= 0.76 && normX <= 0.85 && normY >= 0.42 && normY <= 0.55) return true; // SE Asia
  if (normX >= 0.77 && normX <= 0.88 && normY >= 0.52 && normY <= 0.62) return true;

  // Australia
  if (normX >= 0.78 && normX <= 0.91 && normY >= 0.62 && normY <= 0.82) return true;

  return false;
};

// Precompute land mask once at module load
const LAND_GRID = new Uint8Array(ROWS * COLS);
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const normX = c / COLS;
    const normY = r / ROWS;
    LAND_GRID[r * COLS + c] = checkIsLand(normX, normY) ? 1 : 0;
  }
}

export const LEDWorldMap: React.FC = React.memo(() => {
  // Exactly 5 Active SenX Cloud Datacenter Locations
  const locations: DatacenterLocation[] = [
    {
      id: 'usa',
      flag: '🇺🇸',
      shortCode: 'US-East',
      name: 'United States (Ashburn US-East Core)',
      city: 'Ashburn',
      country: 'United States',
      lat: 39.0438,
      lng: -77.4874,
      ping: '24 ms',
      cpu: 'AMD Ryzen 9 7950X3D',
      storage: 'Gen4 NVMe RAID 1',
      network: '10 Gbps',
      status: 'Online',
      uptime: '99.99%',
      ip: '192.99.88.10',
    },
    {
      id: 'germany',
      flag: '🇩🇪',
      shortCode: 'DE-1',
      name: 'Germany (Frankfurt DE-1 Hub)',
      city: 'Frankfurt',
      country: 'Germany',
      lat: 50.1109,
      lng: 8.6821,
      ping: '18 ms',
      cpu: 'AMD EPYC 9654',
      storage: 'Gen4 NVMe RAID 1',
      network: '20 Gbps',
      status: 'Online',
      uptime: '100.00%',
      ip: '188.40.12.98',
    },
    {
      id: 'india',
      flag: '🇮🇳',
      shortCode: 'IN-West',
      name: 'India (Mumbai Core Facility)',
      city: 'Mumbai',
      country: 'India',
      lat: 19.0760,
      lng: 72.8777,
      ping: '16 ms',
      cpu: 'AMD Ryzen 9 7900X',
      storage: 'Gen4 NVMe RAID 1',
      network: '10 Gbps',
      status: 'Online',
      uptime: '99.99%',
      ip: '103.212.44.11',
    },
    {
      id: 'bangladesh',
      flag: '🇧🇩',
      shortCode: 'BD-Edge',
      name: 'Bangladesh (Dhaka Regional Edge)',
      city: 'Dhaka',
      country: 'Bangladesh',
      lat: 23.8103,
      lng: 90.4125,
      ping: '19 ms',
      cpu: 'Intel Xeon E5-2680 v4',
      storage: 'Gen4 NVMe RAID 1',
      network: '10 Gbps',
      status: 'Online',
      uptime: '99.98%',
      ip: '103.114.22.8',
    },
    {
      id: 'singapore',
      flag: '🇸🇬',
      shortCode: 'SG-1',
      name: 'Singapore (Singapore SG-1 Core)',
      city: 'Singapore',
      country: 'Singapore',
      lat: 1.3521,
      lng: 103.8198,
      ping: '12 ms',
      cpu: 'AMD Ryzen 9 9950X',
      storage: 'Gen4 NVMe RAID 1',
      network: '20 Gbps',
      status: 'Online',
      uptime: '100.00%',
      ip: '139.99.18.241',
    },
  ];

  // Map locations by ID for clean lookup
  const locMap = locations.reduce((acc, l) => {
    acc[l.id] = l;
    return acc;
  }, {} as Record<string, DatacenterLocation>);

  // Specific Infrastructure Routes:
  // 1. India ↔ Singapore
  // 2. India ↔ Germany
  // 3. USA ↔ Germany
  // 4. Bangladesh ↔ Singapore
  // 5. India ↔ Bangladesh
  // 6. USA ↔ Singapore
  const arcs: ArcConnection[] = [
    { id: 'in-sg', from: locMap['india'], to: locMap['singapore'] },
    { id: 'in-de', from: locMap['india'], to: locMap['germany'] },
    { id: 'us-de', from: locMap['usa'], to: locMap['germany'] },
    { id: 'bd-sg', from: locMap['bangladesh'], to: locMap['singapore'] },
    { id: 'in-bd', from: locMap['india'], to: locMap['bangladesh'] },
    { id: 'us-sg', from: locMap['usa'], to: locMap['singapore'] },
  ];

  const [hoveredLocation, setHoveredLocation] = useState<DatacenterLocation | null>(locMap['singapore']);
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
    const controlY = Math.min(p1.y, p2.y) - Math.min(dist * 0.35, 85);

    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${controlX.toFixed(1)} ${controlY.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  };

  // Draw NOC Dot Matrix World Map Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;

    let width = (canvas.width = canvas.offsetWidth * 2 || 1600);
    let height = (canvas.height = canvas.offsetHeight * 2 || 800);

    const resizeCanvas = () => {
      if (!canvas) return;
      const w = canvas.offsetWidth * 2;
      const h = canvas.offsetHeight * 2;
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        width = canvas.width = w;
        height = canvas.height = h;
      }
    };

    resizeCanvas();

    const renderDots = () => {
      if (!isVisible || !isTabActive) return;

      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      const stepX = width / COLS;
      const stepY = height / ROWS;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * stepX + stepX / 2;
          const y = r * stepY + stepY / 2;

          const isLand = LAND_GRID[r * COLS + c] === 1;
          const wave = Math.sin(time + c * 0.1 + r * 0.1) * 0.15 + 0.85;

          if (isLand) {
            ctx.fillStyle = `rgba(163, 232, 84, ${0.65 * wave})`;
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.10 * wave})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderDots);
    };

    renderDots();

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
        if (isVisible && isTabActive) {
          renderDots();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        renderDots();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const handleResize = () => {
      resizeCanvas();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="locations" className="relative z-20 py-12 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto select-none">
      
      {/* Background Radial Glow behind the map */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[80%] h-[80%] bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(163,232,84,0.12),rgba(5,6,6,0))]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3"
      >
        <div className="liquid-glass inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-[#A3E854]">
          <Globe className="w-3.5 h-3.5" />
          <span>NETWORK OPERATIONS CENTER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-inter tracking-tight text-[#F7F7F7]">
          Global <span className="bg-gradient-to-r from-[#A3E854] via-[#b6f06a] to-[#d4fa96] bg-clip-text text-transparent">Infrastructure</span>
        </h2>
        <p className="text-xs sm:text-base font-inter text-white/60 leading-relaxed max-w-2xl mx-auto">
          Our global network delivers ultra-low latency, enterprise-grade performance, and reliable connectivity across multiple regions worldwide.
        </p>
      </motion.div>

      {/* Main Container (#050606) with Liquid Glass */}
      <div className="liquid-glass-card p-3 sm:p-8 rounded-3xl border border-white/20 relative overflow-hidden shadow-2xl bg-[#050606]">
        
        {/* Map Viewport Area */}
        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050606] relative">
          <div className="relative w-full aspect-[2/1] min-h-[320px] sm:min-h-[480px] flex items-center justify-center">
            
            {/* Dotted Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-85" />

            {/* SVG Layer for Network Routes & Moving Light Packets */}
            <svg
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <defs>
                {/* SenX Lime Route Gradient Glow */}
                <linearGradient id="limeGradientArc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A3E854" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#A3E854" stopOpacity="1" />
                  <stop offset="100%" stopColor="#A3E854" stopOpacity="0.2" />
                </linearGradient>

                <filter id="limeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Network Routes */}
              {arcs.map((arc, idx) => {
                const pathD = getArcPath(arc.from, arc.to);
                return (
                  <g key={arc.id}>
                    {/* Background Static Dashed Route Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#A3E854"
                      strokeWidth="1.2"
                      strokeOpacity="0.25"
                      strokeDasharray="4 4"
                    />

                    {/* Animated Moving Light Packet Path */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#limeGradientArc)"
                      strokeWidth="2.5"
                      strokeDasharray="100 300"
                      filter="url(#limeGlow)"
                      animate={{
                        strokeDashoffset: [400, -400],
                      }}
                      transition={{
                        duration: 4.5 + (idx % 3) * 0.8,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: idx * 0.4,
                      }}
                    />
                  </g>
                );
              })}

              {/* Exact Coordinate Anchor Dots for Nodes */}
              {locations.map((loc) => {
                const { x, y } = project(loc.lat, loc.lng);
                return (
                  <circle
                    key={`node-anchor-${loc.id}`}
                    cx={x}
                    cy={y}
                    r={2.5}
                    fill="#A3E854"
                    filter="url(#limeGlow)"
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
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    {/* Soft Breathing & Outer Glow Animation */}
                    <span className="absolute -inset-2 rounded-full border border-[#A3E854] animate-ping opacity-50 pointer-events-none" />
                    <span className="absolute -inset-3 rounded-full bg-[#A3E854]/20 blur-sm animate-pulse pointer-events-none" />

                    {/* Pulsing Node Core */}
                    <div
                      className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isHovered
                          ? 'bg-[#A3E854] border-black scale-125 shadow-[0_0_20px_#A3E854]'
                          : 'bg-[#050606] border-[#A3E854] shadow-[0_0_10px_rgba(163,232,84,0.8)]'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#050606]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top Status Badge */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full liquid-glass border border-white/20 hidden sm:flex items-center space-x-2.5 text-xs font-mono z-30">
              <span className="w-2 h-2 rounded-full bg-[#A3E854] animate-pulse" />
              <span className="text-white/90">5 Global Enterprise PoPs • Anycast Mesh Active</span>
            </div>

          </div>
        </div>

        {/* Liquid Glass Hover Inspector Tooltip */}
        <AnimatePresence mode="wait">
          {hoveredLocation && (
            <motion.div
              key={hoveredLocation.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl liquid-glass border border-[#A3E854]/40 bg-[#0d0f0f]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A3E854] to-transparent opacity-80" />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 items-center">
                
                {/* Datacenter Header */}
                <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A3E854]/10 border border-[#A3E854]/30 flex items-center justify-center text-xl shrink-0">
                    {hoveredLocation.flag}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-inter text-[#F7F7F7] flex items-center space-x-1.5">
                      <span>{hoveredLocation.name}</span>
                    </h4>
                    <span className="text-[11px] font-mono text-[#A3E854]">{hoveredLocation.city}, {hoveredLocation.country}</span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-[#A3E854]" />
                    <span>Status</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A3E854] animate-pulse" />
                    <span className="text-xs font-bold font-mono text-[#A3E854]">{hoveredLocation.status}</span>
                  </div>
                </div>

                {/* CPU */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Cpu className="w-3 h-3 text-white/60" />
                    <span>CPU</span>
                  </div>
                  <div className="text-xs font-inter font-medium text-white/90 truncate">{hoveredLocation.cpu}</div>
                </div>

                {/* Storage */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <HardDrive className="w-3 h-3 text-white/60" />
                    <span>Storage</span>
                  </div>
                  <div className="text-xs font-inter font-medium text-white/90 truncate">{hoveredLocation.storage}</div>
                </div>

                {/* Network & Latency */}
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Wifi className="w-3 h-3 text-[#A3E854]" />
                    <span>Network</span>
                  </div>
                  <div className="text-xs font-bold font-mono text-white/90">
                    {hoveredLocation.network} <span className="text-[#A3E854]">({hoveredLocation.ping})</span>
                  </div>
                </div>

                {/* Uptime */}
                <div className="col-span-2 sm:col-span-1 flex flex-col justify-center sm:items-end">
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-white/60" />
                    <span>Uptime</span>
                  </div>
                  <div className="text-xs font-black font-mono text-[#A3E854] bg-[#A3E854]/10 border border-[#A3E854]/30 px-2.5 py-1 rounded-full w-fit">
                    {hoveredLocation.uptime}
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
