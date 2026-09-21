import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle, Award, BookOpen, Play, 
  HelpCircle, FileText, Download, User, ArrowRight, RefreshCw, AlertTriangle, ShieldCheck, LayoutDashboard
} from 'lucide-react';
import MVLogo from '../MVLogo';
import StudentDashboard from './StudentDashboard';

export default function LearningPortal({ user, initialTab = 'dashboard', onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Interactive Quiz state for Pre-test
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Module state
  const [activeModule, setActiveModule] = useState(0);

  // Case study state
  const [caseChoice, setCaseChoice] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pre-test', label: '1. Pre-Test', icon: HelpCircle },
    { id: 'modules', label: '2. Learning Modules', icon: BookOpen },
    { id: 'checks', label: '3. Knowledge Checks', icon: CheckCircle },
    { id: 'practice', label: '4. Practice Cases', icon: FileText },
    { id: 'post-test', label: '5. Post-Test', icon: ShieldCheck },
    { id: 'certificate', label: '6. Certificate', icon: Award }
  ];

  const modulesData = [
    {
      title: 'Module 1: Fundamentals of Materiovigilance',
      duration: '15 mins',
      type: 'Video + Reading',
      content: 'Materiovigilance refers to the clinical discipline and regulatory system concerned with the identification, collection, assessment, and prevention of adverse reactions or malfunctions related to medical devices. Unlike pharmaceuticals, medical devices range from simple syringes to complex implants like cardiac pacemakers.'
    },
    {
      title: 'Module 2: Signal Detection & Risk Classification',
      duration: '20 mins',
      type: 'Interactive Simulation',
      content: 'Risk classification of medical devices (Class I, IIa, IIb, III) determines the intensity of surveillance required. Signal detection involves identifying patterns of incidents that may indicate a systematic defect, design flaw, or software bug.'
    },
    {
      title: 'Module 3: Adverse Event Reporting Workflows',
      duration: '25 mins',
      type: 'Case Analysis',
      content: 'Prompt reporting of adverse device events is vital. Healthcare institutions must follow standard operating procedures (SOPs) to lock affected hardware, archive logs, and submit regulatory notifications within mandatory timeframes.'
    }
  ];

  const handleQuizOption = (qId, optionIdx) => {
    if (!quizSubmitted) {
      setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    }
  };

  if (activeTab === 'dashboard') {
    return (
      <StudentDashboard 
        user={user} 
        onLogout={onLogout || onClose} 
        onSelectCourse={() => setActiveTab('modules')} 
        onSelectCertificate={() => setActiveTab('certificate')} 
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Portal Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0088FF]/20 p-1 flex items-center justify-center">
              <MVLogo variant="icon" className="w-6 h-7" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg leading-none text-white">
                MaterioVigilance Learning Portal
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Student Account: Dr. Alex Morgan (Medical Officer)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 pt-2 flex gap-1 overflow-x-auto shrink-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0088FF] border-t-2 border-[#0088FF] shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0088FF]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* TAB 1: PRE-TEST */}
          {activeTab === 'pre-test' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-[#F0F7FF] border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#0088FF] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Baseline Competency Pre-Test</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Answer these questions to establish your baseline understanding before accessing detailed modules.
                  </p>
                </div>
              </div>

              {/* Question 1 */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-[#0088FF] uppercase tracking-wider">Question 1 of 2</span>
                <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                  What is the primary objective of Materiovigilance?
                </h4>
                <div className="space-y-2">
                  {[
                    'To reduce hospital equipment purchasing budgets',
                    'To continuously monitor medical device performance and safeguard patient safety',
                    'To standardise software code for diagnostic monitors',
                    'To replace medical personnel with automated surgical robotics'
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizOption(1, idx)}
                      className={`w-full text-left p-3 rounded-md border text-xs sm:text-sm transition-all cursor-pointer ${
                        quizAnswers[1] === idx
                          ? 'border-[#0088FF] bg-[#F0F7FF] text-[#0088FF] font-medium'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-[#0088FF] uppercase tracking-wider">Question 2 of 2</span>
                <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                  Which incident must be immediately reported under device vigilance protocols?
                </h4>
                <div className="space-y-2">
                  {[
                    'A minor cosmetic scratch on an unused IV pole',
                    'An unexpected defibrillator failure during emergency resuscitation',
                    'A routine battery replacement during scheduled maintenance',
                    'A request for additional user manual copies'
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizOption(2, idx)}
                      className={`w-full text-left p-3 rounded-md border text-xs sm:text-sm transition-all cursor-pointer ${
                        quizAnswers[2] === idx
                          ? 'border-[#0088FF] bg-[#F0F7FF] text-[#0088FF] font-medium'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-500">
                  {Object.keys(quizAnswers).length} of 2 answered
                </span>
                <button
                  onClick={() => {
                    setQuizSubmitted(true);
                    setActiveTab('modules');
                  }}
                  className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-md flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Submit Pre-Test & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LEARNING MODULES */}
          {activeTab === 'modules' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar Module List */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm mb-2">Curriculum Modules</h3>
                {modulesData.map((mod, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveModule(idx)}
                    className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                      activeModule === idx
                        ? 'border-[#0088FF] bg-white shadow-xs'
                        : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#0088FF]">{mod.type}</span>
                      <span className="text-[11px] text-slate-400">{mod.duration}</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug">
                      {mod.title}
                    </h4>
                  </button>
                ))}
              </div>

              {/* Right Content Area */}
              <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-slate-200 space-y-4">
                <div className="relative aspect-video bg-slate-900 rounded-md overflow-hidden flex items-center justify-center group">
                  <img
                    src="/medical_eeg_presentation.jpg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#0088FF] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-xs bg-slate-900/80 text-white px-2.5 py-1 rounded-md">
                    HD Video Lecture • {modulesData[activeModule].duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">
                    {modulesData[activeModule].title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {modulesData[activeModule].content}
                  </p>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab('checks')}
                    className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Knowledge Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KNOWLEDGE CHECKS */}
          {activeTab === 'checks' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold text-xs uppercase tracking-wider">Checkpoint 1</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-base">
                  Which entity is responsible for submitting root-cause medical device investigation reports?
                </h3>
                <div className="space-y-2">
                  {[
                    'The Hospital Safety Officer and Device Vigilance Team',
                    'Individual patients using home blood pressure cuffs',
                    'Local janitorial staff',
                    'Third-party marketing vendors'
                  ].map((ans, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab('practice')}
                      className="w-full text-left p-3.5 rounded-md border border-slate-200 hover:border-[#0088FF] hover:bg-[#F0F7FF] text-xs sm:text-sm text-slate-700 font-medium transition-all cursor-pointer"
                    >
                      {i + 1}. {ans}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRACTICE CASES */}
          {activeTab === 'practice' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold px-2.5 py-1 rounded">
                    Simulated ICU Case Study #402
                  </span>
                  <span className="text-xs text-slate-400">Difficulty: Intermediate</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  ICU Smart Infusion Pump Over-Infusion Alert
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  During a night shift, an automated smart syringe pump delivers medication at 2x the programmed rate due to a touch-screen firmware calibration error. The nurse intercepts the malfunction before harm occurs. What is your immediate action?
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'a', text: 'Quarantine the infusion pump immediately, log pump serial number, preserve event logs, and report to Materiovigilance Officer within 24 hours.' },
                    { id: 'b', text: 'Restart the pump and continue using it for the next patient.' },
                    { id: 'c', text: 'Discard the pump in regular municipal trash without documentation.' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCaseChoice(c.id);
                      }}
                      className={`w-full text-left p-4 rounded-md border text-xs sm:text-sm transition-all cursor-pointer ${
                        caseChoice === c.id
                          ? c.id === 'a' 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {c.text}
                    </button>
                  ))}
                </div>

                {caseChoice === 'a' && (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-md text-xs text-emerald-800 font-medium flex items-center justify-between">
                    <span>Correct Protocol! Device quarantine & log preservation prevents recurring incidents.</span>
                    <button
                      onClick={() => setActiveTab('post-test')}
                      className="bg-emerald-600 text-white font-semibold px-4 py-2 rounded-md text-xs"
                    >
                      Continue to Post-Test
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: POST-TEST */}
          {activeTab === 'post-test' && (
            <div className="max-w-2xl mx-auto space-y-6 text-center py-6">
              <div className="w-16 h-16 bg-[#F0F7FF] text-[#0088FF] rounded-full flex items-center justify-center mx-auto border border-blue-100">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl">Comprehensive Post-Test</h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                You have completed all curriculum modules and case studies. Click below to verify your competency score and unlock your certificate.
              </p>
              <button
                onClick={() => setActiveTab('certificate')}
                className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-sm px-6 py-3 rounded-md shadow-xs cursor-pointer"
              >
                Complete Post-Test & Generate Certificate
              </button>
            </div>
          )}

          {/* TAB 6: CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Certificate Canvas Mockup */}
              <div className="bg-white border-2 border-slate-200 p-8 rounded-lg shadow-sm text-center relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#F0F7FF] text-[#0088FF] text-xs font-semibold px-3 py-1 rounded">
                    <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
                    <span>VERIFIED CERTIFICATE OF MASTERY</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    Certificate of Competency
                  </h2>

                  <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                    This certifies that
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0088FF]">
                    Dr. Alex Morgan
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    has successfully completed the comprehensive training program in <br />
                    <strong className="text-slate-900 font-semibold">Materiovigilance & Medical Device Safety Monitoring</strong>
                  </p>

                  <div className="pt-6 flex justify-around items-end border-t border-slate-200 max-w-md mx-auto">
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-800">Sept 17, 2026</p>
                      <p className="text-[10px] text-slate-400">Date Issued</p>
                    </div>
                    <div className="w-12 h-12 bg-white border border-blue-100 rounded-full flex items-center justify-center p-2 shadow-xs">
                      <MVLogo variant="icon" className="w-8 h-9" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-800">MV-892401-2026</p>
                      <p className="text-[10px] text-slate-400">Certificate ID</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => alert('Certificate downloaded as PDF!')}
                  className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-md flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}
