import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, UserCheck, FileText, MessageSquare, Award } from 'lucide-react';

export default function Slide3WhatCanYouDo() {
  const steps = [
    {
      id: 'learn',
      title: 'Learn',
      desc: 'Engage with high-yield video lectures and in-depth reading materials curated by experts.',
      icon: BookOpen,
      align: 'left',
      highlight: true
    },
    {
      id: 'practice',
      title: 'Practice',
      desc: 'Apply knowledge through interactive checks and simulated virtual case studies.',
      icon: UserCheck,
      align: 'right',
      highlight: false
    },
    {
      id: 'assess',
      title: 'Assess',
      desc: 'Evaluate your understanding with rigorous, standardized tests designed for competency.',
      icon: FileText,
      align: 'left',
      highlight: false
    },
    {
      id: 'connect',
      title: 'Connect',
      desc: 'Directly ask faculty questions and participate in focused academic discussions.',
      icon: MessageSquare,
      align: 'right',
      highlight: false
    },
    {
      id: 'complete',
      title: 'Complete',
      desc: 'Track your progress and earn verifiable certificates upon successful module completion.',
      icon: Award,
      align: 'left',
      highlight: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl my-auto flex flex-col items-center justify-center p-2"
    >
      {/* Title Header matching Image 1 */}
      <h1 className="text-blue-700 font-bold text-2xl sm:text-3xl text-center mb-1 tracking-tight">
        What can you do on this platform?
      </h1>
      
      <p className="text-slate-600 text-xs sm:text-sm text-center max-w-2xl mx-auto mb-6 font-medium">
        Your comprehensive toolkit for mastering medical education and materiovigilance.
      </p>

      {/* Vertical Timeline Component matching Image 1 */}
      <div className="relative w-full max-w-3xl my-auto">
        {/* Central Vertical Line */}
        <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-0.5 bg-slate-200/90 z-0" />

        {/* Timeline Items */}
        <div className="space-y-4 sm:space-y-5 relative z-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLeft = step.align === 'left';

            return (
              <div 
                key={step.id} 
                className="grid grid-cols-11 items-center gap-2 sm:gap-4 group"
              >
                {/* Left Side Content */}
                <div className="col-span-5 text-right flex flex-col items-end pr-2 sm:pr-4">
                  {isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <h3 className="text-blue-700 font-bold text-sm sm:text-base mb-0.5 group-hover:text-blue-800 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-xs ml-auto">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Center Node Badge */}
                <div className="col-span-1 flex justify-center items-center">
                  <div 
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer group-hover:scale-105 ${
                      step.highlight
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-blue-100'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Right Side Content */}
                <div className="col-span-5 text-left flex flex-col items-start pl-2 sm:pl-4">
                  {!isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <h3 className="text-blue-700 font-bold text-sm sm:text-base mb-0.5 group-hover:text-blue-800 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-xs">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
