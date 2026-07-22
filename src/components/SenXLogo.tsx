import React from 'react';

interface SenXLogoProps {
  className?: string;
}

export const SenXLogo: React.FC<SenXLogoProps> = ({ className = "w-6 h-6 text-[#A3E854]" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
    >
      <path d="M 15 15 L 85 15 L 85 35 L 50 35 L 85 85 L 15 85 L 15 65 L 50 65 Z" />
    </svg>
  );
};
