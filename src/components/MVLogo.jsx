import React from 'react';

export default function MVLogo({ variant = 'navbar', className = '' }) {
  // SVG Icon representing the Shield + Tech Circuit Logo
  const LogoIcon = ({ iconClass = "w-full h-full" }) => (
    <svg 
      viewBox="0 0 200 240" 
      className={iconClass} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Shield Outline */}
      <path
        d="M 30 20 
           H 170 
           C 182 20, 186 30, 186 42 
           V 125 
           C 186 178, 144 215, 100 226 
           C 56 215, 14 178, 14 125 
           V 42 
           C 14 30, 18 20, 30 20 Z"
        stroke="#1d4ed8"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#ffffff"
      />

      {/* --- CIRCUIT PATTERN INSIDE SHIELD --- */}
      
      {/* 1. Top Center Vertical Trace (Cyan) */}
      <line x1="100" y1="20" x2="100" y2="55" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="100" cy="55" r="7.5" fill="#00b4d8" />

      {/* 2. Top Left Branch (Cyan) */}
      <path d="M 68 28 L 68 50 L 52 66" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="68" cy="28" r="7.5" fill="#00b4d8" />
      <circle cx="52" cy="66" r="7.5" fill="#00b4d8" />

      {/* 3. Top Right Branch 1 (Blue) */}
      <path d="M 132 30 L 132 50 L 118 64" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="132" cy="30" r="7.5" fill="#1d4ed8" />

      {/* 4. Top Right Branch 2 (Cyan) */}
      <path d="M 152 48 L 132 68" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="152" cy="48" r="7.5" fill="#00b4d8" />

      {/* 5. Main Center Diagonal Trunk (Blue) */}
      <path d="M 72 35 L 72 80 L 102 110 L 102 145" stroke="#1d4ed8" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Central Blue Node */}
      <circle cx="102" cy="110" r="8.5" fill="#1d4ed8" />

      {/* 6. Middle-Left Horizontal Trace (Cyan) */}
      <line x1="22" y1="100" x2="56" y2="100" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="56" cy="100" r="7.5" fill="#00b4d8" />

      {/* 7. Center-Left Branch from Blue Trunk */}
      <path d="M 72 80 L 52 100 L 52 120 L 76 144" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="76" cy="144" r="7.5" fill="#1d4ed8" />

      {/* 8. Bottom Left Diagonal to Tip (Blue) */}
      <path d="M 52 120 L 32 140 L 78 186 L 100 208" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* 9. Center-Right Circuit (Cyan Network) */}
      <path d="M 102 110 L 118 94 L 148 94 L 170 72" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="118" cy="94" r="7.5" fill="#00b4d8" />
      <circle cx="170" cy="72" r="7.5" fill="#00b4d8" />

      <path d="M 148 94 L 126 116 L 152 142 L 170 124" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="152" cy="142" r="7.5" fill="#00b4d8" />
      <circle cx="170" cy="124" r="7.5" fill="#00b4d8" />

      {/* 10. Bottom Vertical Traces (Cyan) */}
      <path d="M 72 155 L 72 182" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="72" cy="182" r="7.5" fill="#00b4d8" />

      <path d="M 128 155 L 128 182" stroke="#00b4d8" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="128" cy="182" r="7.5" fill="#00b4d8" />

      <path d="M 100 145 L 100 208" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'splash' || variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex items-center justify-center mb-2 drop-shadow-md">
          <LogoIcon />
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight leading-none">
          MV Learn
        </span>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`w-8 h-9 flex items-center justify-center ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  // Default navbar / compact header logo
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-8 h-9 flex items-center justify-center shrink-0">
        <LogoIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold text-blue-900 tracking-tight leading-none">
          MV Learn
        </span>
        <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase leading-tight mt-0.5">
          MaterioVigilance
        </span>
      </div>
    </div>
  );
}
