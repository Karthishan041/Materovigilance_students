import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, BarChart2, ShieldAlert } from 'lucide-react';

export default function Slide2WhyMatters() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl my-auto p-2"
    >
      {/* Main Container Card with Responsive Layout */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-4 sm:p-8 w-full flex flex-col justify-center grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* Left Column: UI Mockup Graphic Container */}
        <div className="md:col-span-5 flex justify-center items-center h-full">
          <div className="w-full h-full max-h-[420px] bg-slate-100/80 rounded-xl p-6 flex items-center justify-center border border-slate-200/50">
            {/* Dashboard Mockup Card matching Image 4 */}
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg border border-slate-200/80 p-4 space-y-3.5">
              {/* Top Header Placeholder Bar */}
              <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div className="h-3 w-28 bg-slate-200 rounded-full" />
              </div>

              {/* Two Stat Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Alert Warning Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="h-2 w-12 bg-slate-200 rounded-full" />
                </div>

                {/* Success Check Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="h-2 w-14 bg-slate-200 rounded-full" />
                </div>
              </div>

              {/* Lower Main Chart Box */}
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 flex flex-col items-center justify-center relative overflow-hidden h-28">
                <BarChart2 className="w-8 h-8 text-blue-600 mb-1" />
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200">
                  <div className="h-full w-4/5 bg-blue-600 rounded-r-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text & Quote Callout */}
        <div className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-2">
          {/* Main Title matching Image 4 */}
          <h1 className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 tracking-tight">
            Why does it matter?
          </h1>

          {/* Paragraph 1 */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 font-normal">
            Medical-device safety is fundamental to modern healthcare. While devices improve patient outcomes, they carry inherent risks that must be systematically monitored and mitigated.
          </p>

          {/* Callout Box with Blue Left Accent Line matching Image 4 */}
          <div className="border-l-4 border-blue-600 pl-4 py-2 my-3 bg-blue-50/30 rounded-r-lg">
            <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
              Awareness of device-related adverse events ensures clinical efficacy and safeguards patient wellbeing across all stages of treatment.
            </p>
          </div>

          {/* Paragraph 2 */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1 font-normal">
            By engaging in rigorous materiovigilance, healthcare professionals actively support best practices, contributing to a global repository of safety data that prevents future incidents.
          </p>
        </div>

      </div>
    </motion.div>
  );
}
