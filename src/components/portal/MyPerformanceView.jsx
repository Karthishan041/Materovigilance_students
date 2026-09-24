import React from 'react';
import { Download, Award, BookOpen, CheckCircle, Activity, BarChart2, CheckCircle2, Clock } from 'lucide-react';
import { getProgressColor } from '../../utils/progressColors';

function ProgressRing({ percent, size = 58, strokeWidth = 4.5, label, value, subtext, isDarkMode = false }) {
  const p = typeof percent === 'string' ? parseFloat(percent) : (Number(percent) || 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(Math.max(p, 0), 100) / 100) * circumference;
  const color = getProgressColor(p);

  return (
    <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-4 border flex items-center gap-3.5 shadow-2xs transition-colors`}>
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={isDarkMode ? 'text-[#263554]' : 'text-[#E2E8F0]'}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>
        <span className={`absolute text-[11px] font-bold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
          {Math.round(p)}%
        </span>
      </div>

      <div className="space-y-0.5 min-w-0">
        <span className={`text-[10px] font-bold uppercase tracking-wider block truncate ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
          {label}
        </span>
        <div className={`text-sm font-bold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
          {value || `${percent}%`}
        </div>
        <p className={`text-[11px] truncate ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
          {subtext}
        </p>
      </div>
    </div>
  );
}

export default function MyPerformanceView({ user: _user, onNavigate, isDarkMode = false }) {
  const summaryMetrics = [
    {
      label: 'OVERALL PROGRESS',
      value: '62.5%',
      subtext: '5 of 8 Modules Passed',
      progress: 62.5
    },
    {
      label: 'PRE-TEST BENCHMARK',
      value: '43%',
      subtext: 'Baseline Diagnostic',
      progress: 43
    },
    {
      label: 'POST-TEST / QUIZ AVG',
      value: '89.2%',
      subtext: '+46.2% Competency Gain',
      progress: 89.2
    },
    {
      label: 'VIRTUAL SIMULATIONS',
      value: '92.0%',
      subtext: '14 Clinical Cases Solved',
      progress: 92
    },
    {
      label: 'CURRICULUM HOURS',
      value: '18.5 hrs',
      subtext: '3.5 hrs this week',
      progress: 77
    }
  ];

  const competencyDomains = [
    { domain: 'Medical Device Regulatory Framework', mastery: 94, status: 'Advanced' },
    { domain: 'Adverse Event Signal Detection & Triage', mastery: 88, status: 'Proficient' },
    { domain: 'Medical Device Risk Classification (Class A-D)', mastery: 95, status: 'Advanced' },
    { domain: 'Root Cause Analysis (RCA) & 5-Whys', mastery: 82, status: 'Competent' },
    { domain: 'MvPI Form MD-40 Statutory Reporting', mastery: 90, status: 'Proficient' }
  ];

  const modulePerformanceData = [
    {
      id: 1,
      title: 'Module 1: Fundamentals of Materiovigilance',
      category: 'Core Regulatory',
      status: 'Completed',
      preScore: '40%',
      postScore: '95%',
      progress: 95,
      timeSpent: '2h 15m',
      completedDate: 'Sep 14, 2026'
    },
    {
      id: 2,
      title: 'Module 2: Signal Detection & Risk Classification',
      category: 'Surveillance Analytics',
      status: 'Completed',
      preScore: '45%',
      postScore: '88%',
      progress: 88,
      timeSpent: '3h 10m',
      completedDate: 'Sep 15, 2026'
    },
    {
      id: 3,
      title: 'Module 3: Medical Device Problem Reporting (MDPI)',
      category: 'Clinical Incident SOPs',
      status: 'In Progress',
      preScore: '50%',
      postScore: '80% (Active)',
      progress: 80,
      timeSpent: '1h 45m',
      completedDate: 'In Progress'
    },
    {
      id: 4,
      title: 'Module 4: Post-Market Surveillance Workflows',
      category: 'Quality Systems',
      status: 'Locked',
      preScore: '--',
      postScore: 'Pending',
      progress: 0,
      timeSpent: '0m',
      completedDate: 'Locked'
    },
    {
      id: 5,
      title: 'Module 5: Clinical Investigation & Fault Tree Analysis',
      category: 'Root Cause Engineering',
      status: 'Completed',
      preScore: '42%',
      postScore: '92%',
      progress: 92,
      timeSpent: '2h 50m',
      completedDate: 'Sep 16, 2026'
    }
  ];

  const assessmentHistory = [
    {
      id: 'as-1',
      title: 'Baseline Diagnostic Pre-Test',
      type: 'Diagnostic Exam',
      date: 'Sep 12, 2026',
      score: '43%',
      result: 'Calibrated',
      feedback: 'Identified baseline in pharmacology; targeted focus assigned on Medical Device Rules (MDR 2017).'
    },
    {
      id: 'as-2',
      title: 'Module 1 Mastery Knowledge Check',
      type: 'Unit Quiz',
      date: 'Sep 14, 2026',
      score: '95%',
      result: 'Passed',
      feedback: 'Excellent grasp of materiovigilance definitions and global vigilance reporting timelines.'
    },
    {
      id: 'as-3',
      title: 'Module 2 Signal Detection Multi-choice Checkpoint',
      type: 'Checkpoint',
      date: 'Sep 15, 2026',
      score: '88%',
      result: 'Passed',
      feedback: 'Strong accuracy on Class C & D risk classification rules under Indian MDR guidelines.'
    },
    {
      id: 'as-4',
      title: 'Virtual Clinical Case #402: ICU Infusion Pump Malfunction',
      type: 'Simulation Case',
      date: 'Yesterday, 16:40',
      score: '92%',
      result: 'Passed',
      feedback: 'Immediate quarantine protocol initiated; root-cause log preservation documented correctly.'
    },
    {
      id: 'as-5',
      title: 'Unit 3 MDPI Midterm Checkpoint',
      type: 'Checkpoint',
      date: 'Sep 17, 2026',
      score: '80%',
      result: 'In Progress',
      feedback: 'Unit 4 assessment remaining to complete Module 3.'
    }
  ];

  return (
    <div className={`space-y-5 pb-10 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
      
      {/* Top Header Card */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 sm:p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors`}>
        <div className="space-y-1">
          <h1 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
            My Performance
          </h1>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Track your academic progress, baseline comparisons, module competencies, and simulation assessment history.
          </p>
        </div>

        <button
          onClick={() => alert('Official Academic Performance Transcript downloaded as PDF.')}
          className={`${
            isDarkMode 
              ? 'bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554] text-[#F8FAFC]' 
              : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] text-[#172033]'
          } border font-semibold text-xs px-3.5 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0`}
        >
          <Download className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
          <span>Export Transcript</span>
        </button>
      </div>

      {/* 1. COMPACT CIRCULAR / RING PROGRESS INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {summaryMetrics.map((metric, idx) => (
          <ProgressRing
            key={idx}
            label={metric.label}
            percent={metric.progress}
            value={metric.value}
            subtext={metric.subtext}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {/* 2. TWO-COLUMN LAYOUT: MODULE PERFORMANCE & COMPETENCY AREAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Module Performance */}
        <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 sm:p-6 border space-y-4 transition-colors`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                Module Performance
              </h2>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Individual unit mastery and completion status
              </p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              isDarkMode 
                ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800/60' 
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}>
              5 of 8 Passed
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {modulePerformanceData.map((m) => (
              <div key={m.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                      {m.title}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded border ${
                      isDarkMode 
                        ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' 
                        : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                    }`}>
                      {m.category}
                    </span>
                  </div>
                  <span className={`font-bold text-xs w-10 text-right ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                    {m.status === 'Locked' ? '0%' : m.postScore.replace(' (Active)', '')}
                  </span>
                </div>

                <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDarkMode ? 'bg-[#202D4E]' : 'bg-[#F1F5F9]'}`}>
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${m.progress}%`,
                      backgroundColor: getProgressColor(m.progress)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Competency Areas */}
        <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 sm:p-6 border space-y-4 transition-colors`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
            <div>
              <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                Competency Areas
              </h2>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                Evaluated benchmarks across regulatory knowledge domains
              </p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              isDarkMode 
                ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' 
                : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
            }`}>
              Avg: 89.8%
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {competencyDomains.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold text-xs sm:text-sm ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                    {item.domain}
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${
                      isDarkMode 
                        ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' 
                        : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                    }`}>
                      {item.status}
                    </span>
                    <span className={`font-bold text-xs w-8 text-right ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                      {item.mastery}%
                    </span>
                  </div>
                </div>

                <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDarkMode ? 'bg-[#202D4E]' : 'bg-[#F1F5F9]'}`}>
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${item.mastery}%`,
                      backgroundColor: getProgressColor(item.mastery)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODULE-WISE PERFORMANCE TABLE */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 sm:p-6 border space-y-4 transition-colors`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              Curriculum Module-Wise Performance Breakdown
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Tracking of pre-test diagnostic, post-module assessments, and study time per unit
            </p>
          </div>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            5 of 8 Completed
          </span>
        </div>

        {/* Clean Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDarkMode 
                  ? 'border-[#263554] bg-[#202D4E] text-[#94A3B8]' 
                  : 'border-[#E2E8F0] bg-[#F7F9FC] text-[#64748B]'
              }`}>
                <th className="py-2.5 px-3 rounded-l-lg">Module / Unit</th>
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Pre-Test</th>
                <th className="py-2.5 px-3">Post-Quiz</th>
                <th className="py-2.5 px-3">Time Spent</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDarkMode ? 'divide-[#263554]' : 'divide-[#F1F5F9]'}`}>
              {modulePerformanceData.map((m) => (
                <tr key={m.id} className={`${isDarkMode ? 'hover:bg-[#202D4E]/50' : 'hover:bg-[#F7F9FC]'} transition-colors`}>
                  <td className="py-3 px-3">
                    <span className={`font-semibold block ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>{m.title}</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>{m.completedDate}</span>
                  </td>
                  <td className={`py-3 px-3 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    {m.category}
                  </td>
                  <td className="py-3 px-3">
                    {m.status === 'Completed' && (
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        isDarkMode 
                          ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800/60' 
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}>
                        Completed
                      </span>
                    )}
                    {m.status === 'In Progress' && (
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        isDarkMode 
                          ? 'text-[#0088FF] bg-[#0088FF]/15 border-[#0088FF]/30' 
                          : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                      }`}>
                        In Progress
                      </span>
                    )}
                    {m.status === 'Locked' && (
                      <span className={`text-[11px] px-2 py-0.5 rounded border ${
                        isDarkMode 
                          ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' 
                          : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                      }`}>
                        Locked
                      </span>
                    )}
                  </td>
                  <td className={`py-3 px-3 font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                    {m.preScore}
                  </td>
                  <td className={`py-3 px-3 font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                    {m.postScore}
                  </td>
                  <td className={`py-3 px-3 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    {m.timeSpent}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {m.status === 'Completed' ? (
                      <button
                        onClick={() => onNavigate && onNavigate('course')}
                        className="text-[#0088FF] hover:underline font-semibold text-xs cursor-pointer"
                      >
                        Review
                      </button>
                    ) : m.status === 'In Progress' ? (
                      <button
                        onClick={() => onNavigate && onNavigate('course')}
                        className="text-[#0088FF] hover:underline font-semibold text-xs cursor-pointer"
                      >
                        Continue
                      </button>
                    ) : (
                      <span className={`text-xs ${isDarkMode ? 'text-[#94A3B8]/40' : 'text-slate-300'}`}>Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ASSESSMENT & SIMULATION HISTORY */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-5 sm:p-6 border space-y-4 transition-colors`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              Assessment & Simulation History
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Chronological log of diagnostics, module quizzes, and clinical case attempts
            </p>
          </div>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            {assessmentHistory.length} Recorded Attempts
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {assessmentHistory.map((item) => (
            <div 
              key={item.id}
              className={`${isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'} p-4 rounded-xl border space-y-1.5 transition-colors`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      {item.type}
                    </span>
                    <span className={isDarkMode ? 'text-[#263554]' : 'text-[#E2E8F0]'}>•</span>
                    <span className={`text-[11px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>{item.date}</span>
                  </div>
                  <h3 className={`font-bold text-xs sm:text-sm ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>{item.title}</h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs border ${
                    isDarkMode 
                      ? 'text-[#F8FAFC] bg-[#17213C] border-[#263554]' 
                      : 'text-[#172033] bg-white border-[#E2E8F0]'
                  }`}>
                    Score: {item.score} ({item.result})
                  </span>
                </div>
              </div>

              <p className={`text-xs leading-relaxed pt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                <span className={`font-semibold mr-1 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Feedback:</span>
                {item.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
