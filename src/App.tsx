import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
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
import { SEOLandingPage } from './components/SEOLandingPage';
import { KnowledgeBase } from './components/KnowledgeBase';
import { MAIN_LANDING_PAGES, CITY_LOCATION_PAGES } from './data/seoData';

export default function App() {
  const [activeModalTab, setActiveModalTab] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  // Synchronize route changes on browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Callback
  const handleNavigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    if (item === 'support') {
      window.open('https://discord.gg/43QfPM286U', '_blank', 'noopener,noreferrer');
      return;
    }
    if (item === 'status') {
      window.open('https://status.orixcore.com/', '_blank', 'noopener,noreferrer');
      return;
    }
    if (item === 'login') {
      window.location.href = CLIENT_URL;
      return;
    }
    if (item === 'knowledgebase') {
      handleNavigate('/knowledgebase');
      return;
    }

    // If on a sub-page, navigate back to home first
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const element = document.getElementById(item);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = CLIENT_URL;
    }
  }, [handleNavigate]);

  const handleGetStarted = useCallback(() => {
    window.location.href = CLIENT_URL;
  }, []);

  const handleViewPricing = useCallback(() => {
    if (window.location.pathname !== '/') {
      handleNavigate('/');
      setTimeout(() => {
        const element = document.getElementById('pricing');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = CLIENT_URL;
    }
  }, [handleNavigate]);

  const handleCloseModal = useCallback(() => {
    setActiveModalTab(null);
  }, []);

  // Check if currentPath matches an SEO Landing Page
  const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
  const activeLandingData = MAIN_LANDING_PAGES[cleanPath] || CITY_LOCATION_PAGES[cleanPath];
  const isKnowledgeBase = currentPath.startsWith('/knowledgebase');

  return (
    <CurrencyProvider>
      <SEOHead currentPath={currentPath} />
      <div className="relative min-h-screen bg-[#050606] text-[#F7F7F7] selection:bg-[#A3E854]/30 selection:text-[#A3E854] overflow-x-hidden font-inter">
        {/* Full-Screen Infrastructure Background Video with Layered Overlays */}
        <BackgroundVideo />

        {/* Ambient Upward Particle System */}
        <BackgroundParticles />

        {/* Floating Apple Liquid Glass Capsule Header */}
        <Navbar onNavClick={handleNavClick} onGetStarted={handleGetStarted} />

        {/* Main Page Content */}
        <main className="relative z-20">
          {activeLandingData ? (
            <SEOLandingPage
              data={activeLandingData}
              onNavigate={handleNavigate}
              onGetStarted={handleGetStarted}
            />
          ) : isKnowledgeBase ? (
            <KnowledgeBase
              currentSlug={currentPath}
              onNavigate={handleNavigate}
              onGetStarted={handleGetStarted}
            />
          ) : (
            <>
              {/* Hero Environment */}
              <HeroSection onGetStarted={handleGetStarted} onViewPricing={handleViewPricing} />

              {/* Social Proof Marquee & Stat Badges */}
              <SocialProof />

              {/* Bento Grid Feature Section */}
              <BentoGrid />

              {/* LED Dot-Matrix World Network Map */}
              <LEDWorldMap />

              {/* Game Hosting Section */}
              <GameHostingSection onSelectGame={handleGetStarted} />

              {/* Control Panel Section */}
              <ControlPanelSection />

              {/* Pricing Section */}
              <PricingSection onSelectPlan={handleGetStarted} />

              {/* Reviews Section */}
              <ReviewsSection />

              {/* Search Engine & AI Answer Engine (AEO) FAQ Section */}
              <FAQSection />
            </>
          )}

          {/* Footer with Integrated SEO Directory */}
          <Footer onNavigate={handleNavigate} />
        </main>

        {/* Interactive Modal Portal */}
        <ContentModal activeTab={activeModalTab} onClose={handleCloseModal} />
      </div>
    </CurrencyProvider>
  );
}
