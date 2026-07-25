import React, { useState, useEffect, useCallback } from 'react';
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
import { FAQSection } from './components/FAQSection';
import { SEOHead } from './components/SEOHead';
import { Footer } from './components/Footer';
import { ContentModal } from './components/ContentModal';

export default function App() {
  const [activeModalTab, setActiveModalTab] = useState<string | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    let animId: number;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      if (!document.hidden) {
        lenis.raf(time);
      }
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const CLIENT_URL = 'https://client.senxcloud.com/';

  const handleNavClick = useCallback((item: string) => {
    if (item === 'login' || item === 'support' || item === 'status') {
      window.location.href = CLIENT_URL;
      return;
    }
    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = CLIENT_URL;
    }
  }, []);

  const handleGetStarted = useCallback(() => {
    window.location.href = CLIENT_URL;
  }, []);

  const handleViewPricing = useCallback(() => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = CLIENT_URL;
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalTab(null);
  }, []);

  return (
    <CurrencyProvider>
      <SEOHead />
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

          {/* Search Engine & AI Answer Engine (AEO) FAQ Section */}
          <FAQSection />

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
