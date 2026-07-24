import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CurrencyProvider } from './context/CurrencyContext';
import { BackgroundVideo } from './components/BackgroundVideo';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SocialProof } from './components/SocialProof';
import { BentoGrid } from './components/BentoGrid';
import { LEDWorldMap } from './components/LEDWorldMap';
import { GameHostingSection } from './components/GameHostingSection';
import { ControlPanelSection } from './components/ControlPanelSection';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ContentModal } from './components/ContentModal';

export default function App() {
  const [activeModalTab, setActiveModalTab] = useState<string | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavClick = (item: string) => {
    if (item === 'login') {
      setActiveModalTab('login');
      return;
    }
    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveModalTab(item);
    }
  };

  const handleGetStarted = () => {
    setActiveModalTab('deploy');
  };

  const handleViewPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveModalTab('deploy');
    }
  };

  const handleCloseModal = () => {
    setActiveModalTab(null);
  };

  return (
    <CurrencyProvider>
      <div className="relative min-h-screen bg-[#050606] text-[#F7F7F7] selection:bg-[#A3E854]/30 selection:text-[#A3E854] overflow-x-hidden font-inter">
        {/* Full-Screen Infrastructure Background Video with Layered Overlays */}
        <BackgroundVideo />

        {/* Ambient Upward Particle System */}
        <BackgroundParticles />

        {/* Floating Apple Liquid Glass Capsule Header */}
        <Navbar onNavClick={handleNavClick} onGetStarted={handleGetStarted} />

        {/* Main Page Sections */}
        <main className="relative z-20">
          {/* Hero Environment with Orbiting Zero-Gravity Infrastructure Cards */}
          <HeroSection onGetStarted={handleGetStarted} onViewPricing={handleViewPricing} />

          {/* Social Proof Marquee & Stat Badges */}
          <SocialProof />

          {/* Bento Grid Feature Section */}
          <BentoGrid />

          {/* LED Dot-Matrix World Network Map with Live Inspector */}
          <LEDWorldMap />

          {/* Game Hosting Glassmorphic Product Cards */}
          <GameHostingSection onSelectGame={handleGetStarted} />

          {/* Control Panel Management Section */}
          <ControlPanelSection />

          {/* Premium Pricing Section */}
          <PricingSection onSelectPlan={handleGetStarted} />

          {/* Verified Reviews Section */}
          <ReviewsSection />

          {/* Footer */}
          <Footer />
        </main>

        {/* Interactive Modal Portal for Deployment / Client Area */}
        <ContentModal activeTab={activeModalTab} onClose={handleCloseModal} />
      </div>
      <SpeedInsights />
    </CurrencyProvider>
  );
}
