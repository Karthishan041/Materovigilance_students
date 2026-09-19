import React from 'react';
import { motion } from 'framer-motion';

export default function Slide4HowWillYouLearn({ onOpenCard }) {
  const learningSteps = [
    {
      num: 1,
      id: 'pre-test',
      title: 'Pre-Test',
      desc: 'Establish your baseline knowledge before beginning the curriculum.'
    },
    {
      num: 2,
      id: 'modules',
      title: 'Learning Modules',
      desc: 'Engage with comprehensive, structured content on device safety.'
    },
    {
      num: 3,
      id: 'checks',
      title: 'Knowledge Checks',
      desc: 'Reinforce learning through periodic, low-stakes assessments.'
    },
    {
      num: 4,
      id: 'practice',
      title: 'Practice Cases',
      desc: 'Apply concepts to simulated real-world materiovigilance scenarios.'
    },
    {
      num: 5,
      id: 'post-test',
      title: 'Post-Test',
      desc: 'Evaluate your comprehensive understanding upon module completion.'
    },
    {
      num: 6,
      id: 'certificate',
      title: 'Performance & Certificate',
      desc: 'Review your analytics and earn your professional certification.'
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
      {/* Title Header matching Image 3 */}
      <h1 className="text-blue-700 font-bold text-2xl sm:text-3xl text-center mb-1 tracking-tight">
        How will you learn?
      </h1>
      
      <p className="text-slate-600 text-xs sm:text-sm text-center max-w-2xl mx-auto mb-6 font-medium">
        Your structured pathway to mastering materiovigilance and medical device safety monitoring.
      </p>

      {/* 6 Grid Cards matching Image 3 with Fixed Heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full my-auto">
        {learningSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => onOpenCard && onOpenCard(step.id)}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all p-5 flex items-start gap-3.5 group cursor-pointer"
          >
            {/* Number Badge */}
            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
              {step.num}
            </div>

            {/* Content */}
            <div>
              <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1 group-hover:text-blue-700 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
