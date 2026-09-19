import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BottomBar({ currentSlide, totalSlides, onNext, onPrev, onSelectDot, onSignUp }) {
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <footer className="bg-white border-t border-slate-100 px-6 sm:px-12 py-4 flex items-center justify-between z-30 sticky bottom-0 w-full shadow-lg">
      {/* Left: Back Button */}
      <div className="w-24 flex justify-start">
        {currentSlide > 0 ? (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-16" /> /* Placeholder space */
        )}
      </div>

      {/* Center: 4 Pagination Dots */}
      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalSlides }).map((_, index) => {
          // Dots up to and including currentSlide are active blue
          const isActive = index <= currentSlide;
          const isCurrent = index === currentSlide;

          return (
            <button
              key={index}
              onClick={() => onSelectDot(index)}
              title={`Go to slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isCurrent 
                  ? 'bg-blue-600 ring-4 ring-blue-100 scale-110' 
                  : isActive 
                    ? 'bg-blue-600 opacity-90' 
                    : 'bg-slate-200 hover:bg-slate-300'
              }`}
            />
          );
        })}
      </div>

      {/* Right: Next or Sign Up Button */}
      <div className="w-28 flex justify-end">
        {isLastSlide ? (
          <button
            onClick={onSignUp}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>Sign Up</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </footer>
  );
}
