import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, ShieldCheck } from 'lucide-react';

export default function Slide1WhatIs() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl my-auto p-2"
    >
      {/* Main Content Card with Responsive Layout */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-4 sm:p-8 w-full flex flex-col justify-center grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* Left Column: Image Container */}
        <div className="md:col-span-5 flex justify-center items-center h-full">
          <div className="relative w-full h-full max-h-[420px] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner group">
            <img
              src="/medical_eeg_presentation.jpg"
              alt="Medical equipment monitoring presentation"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Text & Feature List */}
        <div className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-2">
          {/* Main Title matching Image 2 */}
          <h1 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 tracking-tight">
            What is<br />Materiovigilance?
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
            The structured monitoring, reporting, and evaluation of incidents involving medical devices.
          </p>

          {/* Feature Items List */}
          <div className="space-y-4">
            {/* Item 1: Monitoring */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100/70 transition-colors">
                <Activity className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-xs sm:text-sm mb-0.5">
                  Monitoring
                </h3>
                <p className="text-slate-500 text-xs leading-normal">
                  Continuous surveillance of medical equipment performance in clinical settings.
                </p>
              </div>
            </div>

            {/* Item 2: Reporting */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100/70 transition-colors">
                <AlertCircle className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-xs sm:text-sm mb-0.5">
                  Reporting
                </h3>
                <p className="text-slate-500 text-xs leading-normal">
                  Documenting adverse events, malfunctions, or safety concerns systematically.
                </p>
              </div>
            </div>

            {/* Item 3: Patient Safety */}
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100/70 transition-colors">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-xs sm:text-sm mb-0.5">
                  Patient Safety
                </h3>
                <p className="text-slate-500 text-xs leading-normal">
                  The ultimate goal: ensuring medical devices do not harm patients or operators.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Divider Line matching Image 2 */}
          <div className="border-t border-slate-100 mt-5 pt-1" />
        </div>

      </div>
    </motion.div>
  );
}
