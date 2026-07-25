import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const BackgroundVideo: React.FC = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const userPausedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Exclusive background video URL specified by user
  const videoSource = 'https://ztnjuprlvjakecnimtrg.supabase.co/storage/v1/object/sign/SenX-Website/bgvideosenx.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMGE5OGFiOC0xZTg2LTQ0Y2MtYmI4OC0wM2MyNTg5YWViMTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTZW5YLVdlYnNpdGUvYmd2aWRlb3NlbngubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTAyMDg4MCwiZXhwIjoxODE2NTU2ODgwfQ.i4f1YUNcpv_Zq5cACEjXGH86BnQwYbYC7tjQFhOrdl0';

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || userPausedRef.current) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Retry playing muted on user interaction or DOM load
          setIsPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
    attemptPlay();

    const video = videoRef.current;
    if (!video) return;

    // Prevent unexpected pausing by auto-resuming if the video gets paused by browser heuristics
    const handlePause = () => {
      if (!userPausedRef.current) {
        attemptPlay();
      }
    };

    // Ensure video resumes when tab regains focus or iframe refreshes
    const handleVisibilityChange = () => {
      if (!document.hidden && !userPausedRef.current) {
        attemptPlay();
      }
    };

    video.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [attemptPlay]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      userPausedRef.current = true;
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        attemptPlay();
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuteState = !isMuted;
    videoRef.current.muted = nextMuteState;
    setIsMuted(nextMuteState);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#050606]">
      
      {/* 1. Video Container with User Specified Video Source */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          referrerPolicy="no-referrer"
          className="w-full h-full max-w-none max-h-none object-cover opacity-75"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Premium Overlays */}
      
      {/* Dark Overlay */}
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

      {/* Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.025] pointer-events-none"
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
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#A3E854]" /> : <Play className="w-3.5 h-3.5 text-zinc-400" />}
        </button>
        <div className="w-[1px] h-3 bg-white/10" />
        <button
          onClick={toggleMute}
          className="p-1 hover:text-[#A3E854] transition-colors focus:outline-none cursor-pointer"
          title={isMuted ? 'Unmute Background Video' : 'Mute Background Video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#A3E854]" />}
        </button>
      </div>

    </div>
  );
});
