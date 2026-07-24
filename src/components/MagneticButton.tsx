import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: 'lime' | 'glass';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = React.memo(({
  children,
  onClick,
  className = '',
  variant = 'lime',
  type = 'button',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Motion values for magnetic displacement
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Gentle, high-precision spring animation (60fps, smooth Aceternity physics)
  const springConfig = { damping: 18, stiffness: 150, mass: 0.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;

    const width = window.innerWidth;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Mobile (<768px or touch): Disable magnetic movement completely
    if (width < 768 || isTouchDevice) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    // Tablet (768px-1023px): Reduced magnetic effect (~0.08 multiplier)
    // Desktop (>=1024px): Gentle, subtle magnetic effect (~0.18 multiplier)
    const multiplier = width >= 1024 ? 0.18 : 0.08;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * multiplier;
    const deltaY = (e.clientY - centerY) * multiplier;

    rawX.set(deltaX);
    rawY.set(deltaY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;
      setRipple({ x: rx, y: ry, id: Date.now() });
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyle =
    variant === 'lime'
      ? 'liquid-glass-lime-btn'
      : 'liquid-glass-btn';

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`relative overflow-hidden cursor-pointer select-none group rounded-full ${baseStyle} ${className}`}
    >
      {/* Tap / Click Ripple Effect */}
      {ripple && (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ left: ripple.x, top: ripple.y }}
          className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-white/30 rounded-full pointer-events-none"
        />
      )}

      {/* Subtle Liquid Glass Reflection Flare */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
});
