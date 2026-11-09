import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-8', iconOnly = false, light = false }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 font-sans font-bold tracking-tight select-none ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="logoGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003087" />
              <stop offset="100%" stopColor="#0070E0" />
            </linearGradient>
            <linearGradient id="logoGradB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0070E0" />
              <stop offset="100%" stopColor="#00A8E8" />
            </linearGradient>
          </defs>
          <path
            d="M18 28 C 18 19, 27 14, 35 18 L 76 39 C 84 43, 84 55, 76 59 L 44 76 C 36 80, 26 74, 26 65 Z"
            fill="url(#logoGradA)"
          />
          <path
            d="M42 42 C 42 34, 50 29, 58 33 L 82 45 C 88 48, 88 56, 82 59 L 58 71 C 50 75, 42 70, 42 62 Z"
            fill="url(#logoGradB)"
            fillOpacity="0.9"
          />
          <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="5" fill="#0070E0" />
        </svg>
      </div>

      {!iconOnly && (
        <span className={`text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-[#003087]'}`}>
          Pay<span className="text-[#0070E0]">Flow</span>
        </span>
      )}
    </div>
  );
};
