import React, { useEffect, useRef } from 'react';

export const BackgroundParticles: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle Particle Setup
    const particleCount = Math.min(Math.floor(width / 24), 35);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulse: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.35, // Move upward continuously
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.12 + Math.random() * 0.35,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw & Update Subtle Upward Particles without expensive shadowBlur
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Wrap around top screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0.05, p.alpha + Math.sin(p.pulse) * 0.1);

        // Draw particle dot without costly shadowBlur rasterization
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 232, 84, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isVisible) {
        isVisible = true;
        render();
      }
    };

    const stopAnimation = () => {
      isVisible = false;
      cancelAnimationFrame(animationFrameId);
    };

    render();

    // Pause animation when tab/page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      stopAnimation();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
});
