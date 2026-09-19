import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, X } from 'lucide-react';

export default function VerificationModal({ email = 'user@hospital.edu', onVerified, onClose }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(119); // 01:59
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isComplete = code.every(digit => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md p-8 relative flex flex-col items-center text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Shield Icon Badge matching Image 2 */}
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-5">
          <ShieldCheck className="w-6 h-6" />
        </div>

        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Enter Verification Code
        </h2>
        
        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
          We've sent a 6-digit code to your registered email for secure access.
        </p>

        {/* 6-Digit Code Inputs matching Image 2 */}
        <div className="flex items-center gap-2 mb-6">
          {code.slice(0, 3).map((digit, idx) => (
            <input
              key={idx}
              ref={el => inputRefs.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              className="w-10 h-12 text-center text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
            />
          ))}

          <span className="text-slate-300 font-bold px-1">-</span>

          {code.slice(3, 6).map((digit, idx) => {
            const actualIdx = idx + 3;
            return (
              <input
                key={actualIdx}
                ref={el => inputRefs.current[actualIdx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(actualIdx, e.target.value)}
                onKeyDown={e => handleKeyDown(actualIdx, e)}
                className="w-10 h-12 text-center text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
              />
            );
          })}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => isComplete && onVerified()}
          disabled={!isComplete}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isComplete
              ? 'bg-blue-800 hover:bg-blue-900 text-white shadow-md shadow-blue-800/30'
              : 'bg-blue-900/40 text-white/70 cursor-not-allowed'
          }`}
        >
          <span>Verify & Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Resend Footer */}
        <div className="mt-5 text-xs text-slate-500">
          Didn't receive the code?{' '}
          <button
            disabled={timer > 0}
            onClick={() => setTimer(119)}
            className="text-blue-700 font-medium hover:underline disabled:text-slate-400 cursor-pointer"
          >
            Resend {timer > 0 ? `in ${formatTimer(timer)}` : ''}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
