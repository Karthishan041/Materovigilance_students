import React from 'react';
import { Download } from 'lucide-react';

export default function MyPerformanceView({ user: _user, onNavigate }) {
  const summaryMetrics = [
    {
      label: 'OVERALL PROGRESS',
      value: '62.5%',
      subtext: '5 of 8 Modules Passed',
      isPrimary: true,
      progress: 62.5
    },
    {
      label: 'PRE-TEST BENCHMARK',
      value: '43%',
      subtext: 'Baseline Diagnostic Score',
      isPrimary: false,
      progress: 43
    },
    {
      label: 'POST-TEST / QUIZ AVG',
      value: '89.2%',
      subtext: '+46.2% Competency Gain',
      isPrimary: false,
      progress: 89.2
    },
    {
      label: 'VIRTUAL CASE SIMULATIONS',
      value: '92.0%',
      subtext: '14 Clinical Cases Solved',
      isPrimary: false,
      progress: 92
    },
    {
      label: 'LEARNING ACTIVITY',
      value: '18.5 hrs',
      subtext: '3.5 hrs logged this week',
      isPrimary: false,
      progress: 77
    }
  ];

  const competencyDomains = [
    { domain: 'Medical Device Regulatory Framework (MDR 2017 & CDSCO)', mastery: 94, status: 'Advanced' },
    { domain: 'Adverse Event Signal Detection & Triage Protocols', mastery: 88, status: 'Proficient' },
    { domain: 'Medical Device Risk Classification (Class A, B, C, D)', mastery: 95, status: 'Advanced' },
    { domain: 'Root Cause Analysis (RCA) & 5-Whys Investigation', mastery: 82, status: 'Competent' },
    { domain: 'MvPI Form MD-40 Filing & Statutory SOP Compliance', mastery: 90, status: 'Proficient' }
  ];

  const modulePerformanceData = [
    {
      id: 1,
      title: 'Module 1: Fundamentals of Materiovigilance',
      category: 'Core Regulatory',
      status: 'Completed',
      preScore: '40%',
      postScore: '95%',
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
      timeSpent: '1h 45m',
      completedDate: 'In Progress'
    },
    {
      id: 4,
      title: 'Module 4: Post-Market Surveillance Workflows',
      category: 'Quality Systems',
      status: 'In Progress',
      preScore: '--',
      postScore: 'Pending',
      timeSpent: '45m',
      completedDate: 'In Progress'
    },
    {
      id: 5,
      title: 'Module 5: Clinical Investigation & Fault Tree Analysis',
      category: 'Root Cause Engineering',
      status: 'Completed',
      preScore: '42%',
      postScore: '92%',
      timeSpent: '2h 50m',
      completedDate: 'Sep 16, 2026'
    },
    {
      id: 6,
      title: 'Module 6: High-Risk Implantable Device Vigilance',
      category: 'Cardiology & Orthopedics',
      status: 'Locked',
      preScore: '--',
      postScore: 'Locked',
      timeSpent: '0m',
      completedDate: 'Unlocks after Mod 4'
    },
    {
      id: 7,
      title: 'Module 7: Software as a Medical Device (SaMD) Surveillance',
      category: 'Digital Health & AI',
      status: 'Locked',
      preScore: '--',
      postScore: 'Locked',
      timeSpent: '0m',
      completedDate: 'Locked'
    },
    {
      id: 8,
      title: 'Module 8: Final Comprehensive Materiovigilance Capstone',
      category: 'Board Examination',
      status: 'Locked',
      preScore: '--',
      postScore: 'Locked',
      timeSpent: '0m',
      completedDate: 'Locked'
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
    <div className="space-y-5 pb-10">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            My Performance
          </h1>
          <p className="text-xs text-slate-600 font-normal leading-relaxed">
            Track your academic progress, baseline comparisons, module competencies, and simulation assessment history.
          </p>
        </div>

        <button
          onClick={() => alert('Official Academic Performance Transcript downloaded as PDF.')}
          className="bg-white hover:bg-slate-50 border border-[#D9E1EA] text-slate-700 font-medium text-xs px-3.5 py-2 rounded-md cursor-pointer transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Transcript</span>
        </button>
      </div>

      {/* HORIZONTAL STATISTICS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {summaryMetrics.map((metric, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-md p-4 border border-slate-200 space-y-2.5 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                {metric.label}
              </span>
              <h3 className={`text-2xl font-bold tracking-tight ${metric.isPrimary ? 'text-[#0088FF]' : 'text-slate-900'}`}>
                {metric.value}
              </h3>
              <p className="text-[11px] text-slate-500 font-normal">
                {metric.subtext}
              </p>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-xs ${metric.isPrimary ? 'bg-[#0088FF]' : 'bg-slate-400'}`}
                style={{ width: `${metric.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* MATERIOVIGILANCE COMPETENCY DOMAINS */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Materiovigilance Competency Domains
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluated mastery benchmarks across statutory vigilance knowledge areas
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Overall: 89.8%
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {competencyDomains.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 text-xs sm:text-sm">{item.domain}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 font-normal">
                    {item.status}
                  </span>
                  <span className="font-bold text-slate-900 text-xs w-8 text-right">{item.mastery}%</span>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden">
                <div 
                  className="bg-[#0088FF] h-full rounded-xs"
                  style={{ width: `${item.mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODULE-WISE PERFORMANCE TABLE */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Curriculum Module-Wise Performance Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tracking of pre-test diagnostic, post-module assessments, and study time per unit
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            5 of 8 Completed
          </span>
        </div>

        {/* Clean Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Module / Unit</th>
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Pre-Test</th>
                <th className="py-2.5 px-3">Post-Quiz</th>
                <th className="py-2.5 px-3">Time Spent</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {modulePerformanceData.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-900 block">{m.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{m.completedDate}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {m.category}
                  </td>
                  <td className="py-3 px-3">
                    {m.status === 'Completed' && (
                      <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        Completed
                      </span>
                    )}
                    {m.status === 'In Progress' && (
                      <span className="text-[11px] font-semibold text-[#0088FF] bg-blue-50 px-2 py-0.5 rounded">
                        In Progress
                      </span>
                    )}
                    {m.status === 'Locked' && (
                      <span className="text-[11px] text-slate-400">
                        Locked
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {m.preScore}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {m.postScore}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {m.timeSpent}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {m.status === 'Completed' ? (
                      <button
                        onClick={() => onNavigate && onNavigate('course')}
                        className="text-[#0088FF] hover:underline font-medium text-xs cursor-pointer"
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
                      <span className="text-slate-300 text-xs">Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ASSESSMENT & SIMULATION HISTORY */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Assessment & Simulation History
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chronological log of diagnostics, module quizzes, and clinical case attempts
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {assessmentHistory.length} Recorded Attempts
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {assessmentHistory.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-50/60 p-3.5 rounded-md border border-slate-200/80 space-y-1.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                      {item.type}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    Score: {item.score} ({item.result})
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                <span className="font-medium text-slate-700 mr-1">Feedback:</span>
                {item.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
