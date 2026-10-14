import React, { useRef, useEffect, useCallback } from 'react';

export const BackgroundVideo: React.FC = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Exclusive background video URL specified by user
  const videoSource = 'https://ztnjuprlvjakecnimtrg.supabase.co/storage/v1/object/sign/SenX-Website/bgvideosenx.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMGE5OGFiOC0xZTg2LTQ0Y2MtYmI4OC0wM2MyNTg5YWViMTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTZW5YLVdlYnNpdGUvYmd2aWRlb3NlbngubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTAyMDg4MCwiZXhwIjoxODE2NTU2ODgwfQ.i4f1YUNcpv_Zq5cACEjXGH86BnQwYbYC7tjQFhOrdl0';

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect user data saver and reduced-motion preferences
    const nav = navigator as any;
    if (nav?.connection?.saveData) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, video will remain quiet and idle
      });
    }
  }, []);

  useEffect(() => {
    attemptPlay();

    const video = videoRef.current;
    if (!video) return;

    // Pause video when document is hidden to conserve battery & GPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else {
        attemptPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [attemptPlay]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#050606]">
      {/* 1. Video Container with User Specified Video Source - Always Muted & Ambient */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          referrerPolicy="no-referrer"
          className="w-full h-full max-w-none max-h-none object-cover opacity-75"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Premium Overlays */}
      <div className="absolute inset-0 bg-[#050606]/45 z-10" />

      {/* Bottom Gradient for Smooth Fade into Page Content */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-[#050606] via-[#050606]/70 to-transparent z-10" />

      {/* Left Gradient for Contrast */}
      <div className="absolute inset-y-0 left-0 w-[40vw] bg-gradient-to-r from-[#050606]/80 via-[#050606]/40 to-transparent z-10" />

      {/* Subtle Radial Vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 25%, #050606 85%)',
        }}
      />

      {/* Soft Ambient Lime Glow in Upper Core */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#A3E854]/10 rounded-full blur-[80px] pointer-events-none z-10" />
    </div>
  );
});
