import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const BackgroundVideo: React.FC = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => setIsPlaying(false));
    });

    const handleVisibilityChange = () => {
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#050606]">
      
      {/* 1. Rotated Portrait Video to Landscape Fill with Aspect Ratio Preservation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="https://v1.pinterest.com/videos/iht/expMp4/f2/40/1e/f2401ef11bc48a265c1a5edabe8f888a_720w.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="min-w-[130vh] min-h-[130vw] w-[180vh] h-[180vw] max-w-none max-h-none object-cover rotate-90 transform origin-center opacity-75 will-change-transform"
        />
      </div>

      {/* 2. Premium Overlays */}
      
      {/* Dark Overlay (40%) */}
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
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#A3E854]/10 rounded-full blur-[140px] pointer-events-none z-10" />

      {/* Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Video Control Buttons Badge */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto flex items-center space-x-2 bg-[#111313]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.08] text-xs text-[#F7F7F7]/70 shadow-xl">
        <button
          onClick={togglePlay}
          className="p-1 hover:text-[#A3E854] transition-colors focus:outline-none cursor-pointer"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <div className="w-[1px] h-3 bg-white/10" />
        <button
          onClick={toggleMute}
          className="p-1 hover:text-[#A3E854] transition-colors focus:outline-none cursor-pointer"
          title={isMuted ? 'Unmute Background Video' : 'Mute Background Video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

    </div>
  );
});
