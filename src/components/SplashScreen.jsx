import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import MVLogo from './MVLogo';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onFinish}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8 text-white cursor-pointer select-none"
    >
      {/* Top Spacer */}
      <div className="h-10" />

      {/* Main Content Center */}
      <div className="flex flex-col items-center justify-center gap-8 my-auto">
        {/* Glowing Container Card matching Image 5 */}
        <motion.div 
          initial={{ scale: 0.9, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-3 rounded-3xl bg-blue-500/20 backdrop-blur-md border border-blue-400/30 shadow-2xl shadow-blue-900/50"
        >
          <div className="bg-white rounded-2xl p-7 flex flex-col items-center justify-center w-52 h-52 shadow-xl">
            <MVLogo variant="splash" />
          </div>
        </motion.div>

        {/* Loading Spinner and Status Text */}
        <div className="flex flex-col items-center gap-3">
          {/* Custom Spinner matching Image 5 */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-blue-300/30 border-t-cyan-300 border-r-cyan-300 animate-spin" />
            <div className="absolute w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
          </div>

          <span className="text-xs font-semibold tracking-widest text-blue-100/90 uppercase mt-1">
            Loading Modules
          </span>
        </div>
      </div>

      {/* Bottom Tagline matching Image 5 */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="w-8 h-0.5 bg-blue-400/40 rounded-full" />
        <span className="text-xs font-semibold tracking-widest text-blue-200/80 uppercase">
          Clinical Safety Through Mastery
        </span>
        <span className="text-[10px] text-blue-300/60 mt-1">Click anywhere to skip</span>
      </div>
    </motion.div>
  );
}
