import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ChevronRight, Play, Pause, Volume2, VolumeX, 
  Maximize, Minimize, RotateCcw, CheckCircle2, FileText, 
  Clock, Award, BookOpen, ShieldCheck, Download, AlertCircle, 
  HelpCircle, Check, X, Star, MessageSquare, ThumbsUp, Send, User
} from 'lucide-react';
import { getProgressColor } from '../../utils/progressColors';

export default function Module3VideoView({ onBack, onNavigate, isDarkMode = false }) {
  // Video State: Student is already in progress at 05:00 of 25:00 (20%)
  const initialTime = 300; // 05:00 (300 seconds)
  const duration = 1500; // 25:00 (1500 seconds)
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);

  // Checkpoint Interaction State
  const [playbackElapsed, setPlaybackElapsed] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [hasTriggeredQuestion, setHasTriggeredQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(null); // null | 'correct' | 'incorrect'

  // Mobile Tabs State: 'overview' | 'content' | 'qa' | 'feedback'
  const [activeMobileTab, setActiveMobileTab] = useState('overview');

  // Ask a Doubt State
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [doubtTimestamp, setDoubtTimestamp] = useState(null);
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtNotification, setDoubtNotification] = useState(null);

  // Q&A Forum Questions (Connected with Ask a Doubt)
  const [qaQuestions, setQaQuestions] = useState([
    {
      id: 1,
      studentName: 'Arun Kumar',
      studentRole: 'PharmD Student',
      avatarInitial: 'A',
      timestampFormatted: '03:45',
      rawSeconds: 225,
      totalDurationFormatted: '25:00',
      question: 'What is the exact distinction between statutory MDR reporting and voluntary hospital incident reporting under MvPI?',
      teacherReply: 'Statutory MDR reporting under CDSCO Medical Device Rules 2017 is legally mandated for serious adverse events (death or serious deterioration of health), while hospital incident reporting captures internal calibration anomalies and near-misses.',
      teacherName: 'Dr. Sarah Jenkins',
      teacherRole: 'Lead Faculty & Vigilance Officer',
      upvotes: 6,
      userUpvoted: false,
      createdAt: 'Yesterday'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      studentRole: 'Clinical Resident',
      avatarInitial: 'P',
      timestampFormatted: '05:12',
      rawSeconds: 312,
      totalDurationFormatted: '25:00',
      question: 'How long must hospital biomedical engineering teams quarantine an infusion pump following a reported dosage anomaly?',
      teacherReply: 'The affected equipment must remain physically locked and quarantined until the preliminary root-cause investigation is completed by the Materiovigilance Committee.',
      teacherName: 'Dr. Sarah Jenkins',
      teacherRole: 'Lead Faculty & Vigilance Officer',
      upvotes: 3,
      userUpvoted: false,
      createdAt: '2 days ago'
    }
  ]);

  // Student Feedback State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackType, setFeedbackType] = useState('Video Content');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [feedbackNotification, setFeedbackNotification] = useState(null);

  const playerContainerRef = useRef(null);

  // Course Units Data (Actual project structure)
  const courseUnits = [
    {
      id: 1,
      unitNumber: 1,
      title: 'Unit 1: Fundamentals of MDR 2017',
      subtitle: 'Video Completed • 15 mins',
      status: 'Done',
      statusType: 'done',
      duration: '15 mins',
      completed: true
    },
    {
      id: 2,
      unitNumber: 2,
      title: 'Unit 2: Signal Detection & Risk',
      subtitle: 'Video Completed • 20 mins',
      status: 'Done',
      statusType: 'done',
      duration: '20 mins',
      completed: true
    },
    {
      id: 3,
      unitNumber: 3,
      title: 'Unit 3: Problem Reporting (MDPI)',
      subtitle: `Current Video • 05:00 / 25:00`,
      status: 'Watching',
      statusType: 'current',
      duration: '25 mins',
      active: true
    },
    {
      id: 4,
      unitNumber: 4,
      title: 'Unit 4: Root-Cause Investigation',
      subtitle: 'Next Video • 20 mins',
      status: 'Upcoming',
      statusType: 'upcoming',
      duration: '20 mins'
    },
    {
      id: 5,
      unitNumber: 5,
      title: 'Unit 5: Statutory Reporting SOPs',
      subtitle: 'Upcoming Video • 25 mins',
      status: 'Upcoming',
      statusType: 'upcoming',
      duration: '25 mins'
    }
  ];

  // Simulated video playback timer & 10-second checkpoint trigger
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });

        setPlaybackElapsed((prevElapsed) => {
          const newElapsed = prevElapsed + 1;
          // Trigger question checkpoint after approximately 10 seconds of playback
          if (newElapsed >= 10 && !hasTriggeredQuestion) {
            setIsPlaying(false);
            setShowQuestionModal(true);
            setHasTriggeredQuestion(true);
          }
          return newElapsed;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, duration, hasTriggeredQuestion]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.floor(pos * duration));
  };

  const handleSeekToTimestamp = (seconds) => {
    if (typeof seconds === 'number' && !isNaN(seconds)) {
      setCurrentTime(Math.min(duration, Math.max(0, seconds)));
      if (playerContainerRef.current) {
        playerContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (playerContainerRef.current?.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;
    if (selectedOption === 'B') {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  const handleResumeVideoAfterQuestion = () => {
    setShowQuestionModal(false);
    setIsPlaying(true);
  };

  // Re-trigger checkpoint test for demo convenience
  const handleResetCheckpoint = () => {
    setPlaybackElapsed(0);
    setHasTriggeredQuestion(false);
    setSelectedOption(null);
    setAnswerState(null);
    setShowQuestionModal(false);
    setCurrentTime(300);
    setIsPlaying(true);
  };

  // Ask a Doubt Handlers
  const handleOpenAskDoubt = () => {
    setIsPlaying(false);
    setDoubtTimestamp(currentTime);
    setDoubtQuestion('');
    setShowDoubtModal(true);
  };

  const handleSendDoubt = (e) => {
    if (e) e.preventDefault();
    if (!doubtQuestion.trim()) return;

    const capturedTime = doubtTimestamp !== null ? doubtTimestamp : currentTime;
    const newQuestion = {
      id: Date.now(),
      studentName: 'Arun Kumar',
      studentRole: 'PharmD Student',
      avatarInitial: 'A',
      timestampFormatted: formatTime(capturedTime),
      rawSeconds: capturedTime,
      totalDurationFormatted: formatTime(duration),
      question: doubtQuestion.trim(),
      teacherReply: 'Faculty has received this inquiry and will post a clinical review response shortly.',
      teacherName: 'Dr. Sarah Jenkins',
      teacherRole: 'Lead Faculty & Vigilance Officer',
      upvotes: 1,
      userUpvoted: true,
      createdAt: 'Just now'
    };

    setQaQuestions(prev => [newQuestion, ...prev]);
    setShowDoubtModal(false);
    setDoubtQuestion('');
    setDoubtNotification(`Question submitted to Q&A at ${formatTime(capturedTime)}!`);
    
    setTimeout(() => {
      setDoubtNotification(null);
    }, 4000);
  };

  const handleToggleUpvote = (id) => {
    setQaQuestions(prev => prev.map(q => {
      if (q.id === id) {
        const isUpvoted = q.userUpvoted;
        return {
          ...q,
          upvotes: isUpvoted ? q.upvotes - 1 : q.upvotes + 1,
          userUpvoted: !isUpvoted
        };
      }
      return q;
    }));
  };

  // Student Feedback Handlers
  const handleOpenFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = (e) => {
    if (e) e.preventDefault();
    if (!feedbackMessage.trim()) return;

    const newFeedback = {
      id: Date.now(),
      rating: feedbackRating,
      type: feedbackType,
      message: feedbackMessage.trim(),
      videoTitle: 'Medical Device Problem Reporting',
      moduleTitle: 'Module 3: Medical Device Problem Reporting',
      createdAt: new Date().toISOString()
    };

    setSubmittedFeedback(prev => [newFeedback, ...prev]);
    setShowFeedbackModal(false);
    setFeedbackMessage('');
    setFeedbackRating(5);
    setFeedbackNotification('Thanks for your feedback!');
    
    setTimeout(() => {
      setFeedbackNotification(null);
    }, 4000);
  };

  const progressPercent = Math.round((currentTime / duration) * 100);

  const mobileTabs = [
    { id: 'overview', label: 'VIDEO OVERVIEW' },
    { id: 'content', label: 'COURSE CONTENT' },
    { id: 'qa', label: 'Q&A', badge: qaQuestions.length },
    { id: 'feedback', label: 'FEEDBACK' }
  ];

  return (
    <div className={`space-y-4 sm:space-y-5 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
      
      {/* 1. TOP HEADER & BREADCRUMB NAVIGATION */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-4 sm:p-6 border space-y-2.5 sm:space-y-3 transition-colors`}>
        {/* Breadcrumb Row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onBack}
              className={`font-medium transition-colors cursor-pointer ${isDarkMode ? 'text-[#94A3B8] hover:text-[#0088FF]' : 'text-[#64748B] hover:text-[#0088FF]'}`}
            >
              My Course
            </button>
            <span className={isDarkMode ? 'text-[#263554]' : 'text-[#E2E8F0]'}>/</span>
            <span className={`font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Module 3</span>
          </div>

          <button
            onClick={onBack}
            className={`text-xs font-semibold text-[#0088FF] hover:text-[#0070D2] flex items-center gap-1.5 cursor-pointer border px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors ${
              isDarkMode ? 'bg-[#0088FF]/15 border-[#0088FF]/30' : 'bg-[#F0F7FF] border-[#0088FF]/20'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Course</span>
          </button>
        </div>

        {/* Page Title */}
        <div className={`pt-2 border-t space-y-1 ${isDarkMode ? 'border-[#263554]' : 'border-[#F1F5F9]'}`}>
          <h1 className={`text-lg sm:text-2xl font-bold tracking-tight ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
            Module 3: Medical Device Problem Reporting
          </h1>
          <p className={`text-xs sm:text-sm leading-relaxed hidden sm:block ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Learn the fundamentals of identifying, documenting, and reporting medical device problems.
          </p>
        </div>
      </div>

      {/* 2. MAIN LAYOUT: UNIFIED VIDEO PLAYER ON DESKTOP & MOBILE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* PRIMARY COLUMN: (12 COLS ON MOBILE, 8 COLS ON DESKTOP) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          
          {/* ======================================================= */}
          {/* 16:9 VIDEO PLAYER CONTAINER (SHARED BY DESKTOP & MOBILE) */}
          {/* ======================================================= */}
          <div 
            ref={playerContainerRef}
            className={`bg-slate-950 rounded-xl overflow-hidden border ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'} relative aspect-video flex flex-col justify-between shadow-xs select-none w-full text-white transition-colors`}
          >
            {/* Video Canvas / Poster Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/module3_video_poster.jpg"
                alt="Medical Device Problem Reporting Lecture"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isPlaying ? 'opacity-90 scale-[1.01]' : 'opacity-80'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40" />
            </div>

            {/* Top Video Overlay Bar */}
            <div className="relative z-10 p-2.5 sm:p-4 flex items-center justify-between text-white text-xs gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="bg-[#0088FF] text-white font-bold px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] tracking-wider uppercase shrink-0">
                  Unit 3
                </span>
                <span className="font-semibold text-slate-100 truncate text-[11px] sm:text-xs">
                  Medical Device Problem Reporting
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Ask a Doubt Button in Video Player */}
                <button
                  type="button"
                  onClick={handleOpenAskDoubt}
                  className="bg-slate-900/90 hover:bg-[#0088FF] text-slate-100 hover:text-white border border-slate-700 hover:border-[#0088FF] px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
                  title="Ask a Doubt at current video timestamp"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
                  <span className="whitespace-nowrap">Ask a Doubt</span>
                </button>

                <span className="bg-slate-900/80 text-slate-200 px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-mono border border-slate-700 hidden xs:inline-block">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Center Big Play Button (when paused and no modal) */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              {!isPlaying && !showQuestionModal && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#0088FF] hover:bg-[#0070D2] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/20"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1 text-white" />
                </button>
              )}
            </div>

            {/* Narration Captions */}
            {captionsOn && isPlaying && !showQuestionModal && (
              <div className="relative z-10 px-4 sm:px-6 pb-2 text-center pointer-events-none">
                <span className="inline-block bg-slate-950/85 text-white text-[11px] sm:text-sm px-3 py-1 rounded-lg border border-slate-800">
                  "When reporting an event, document the exact device model, lot number, and clinical timeline."
                </span>
              </div>
            )}

            {/* INTERACTIVE QUESTION CHECKPOINT POPUP OVERLAY */}
            <AnimatePresence>
              {showQuestionModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-30 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
                >
                  <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl border shadow-xl w-full max-w-lg p-4 sm:p-6 space-y-3.5 text-left my-auto transition-colors`}>
                    
                    {/* Popup Header */}
                    <div className={`border-b pb-2.5 space-y-1 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          isDarkMode 
                            ? 'text-[#0088FF] bg-[#0088FF]/15 border border-[#0088FF]/30' 
                            : 'text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20'
                        }`}>
                          Checkpoint Assessment
                        </span>
                        <span className={`text-[10px] font-mono ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Pause @ {formatTime(currentTime)}
                        </span>
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                        Quick Knowledge Check
                      </h3>
                      <p className={`text-[11px] sm:text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        Before continuing, answer this question:
                      </p>
                    </div>

                    {/* Question Prompt */}
                    <p className={`text-xs sm:text-sm font-semibold leading-snug ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                      Which of the following is an important step when reporting a suspected medical device problem?
                    </p>

                    {/* Single Choice Options */}
                    <div className="space-y-1.5 sm:space-y-2 pt-1">
                      {[
                        { id: 'A', label: 'A. Ignore the event if the device still works' },
                        { id: 'B', label: 'B. Document the relevant device and event details' },
                        { id: 'C', label: 'C. Delete the device information' },
                        { id: 'D', label: 'D. Wait until the issue occurs repeatedly' },
                      ].map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => {
                              if (answerState !== 'correct') {
                                setSelectedOption(opt.id);
                                setAnswerState(null);
                              }
                            }}
                            className={`p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${
                              isSelected
                                ? isDarkMode
                                  ? 'border-[#0088FF] bg-[#0088FF]/15 text-[#F8FAFC] font-medium'
                                  : 'border-[#0088FF] bg-[#F0F7FF] text-[#172033] font-medium'
                                : isDarkMode
                                ? 'border-[#263554] bg-[#202D4E] text-[#F8FAFC] hover:border-[#0088FF]/50'
                                : 'border-[#E2E8F0] bg-white text-[#172033] hover:bg-[#F7F9FC]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#0088FF] bg-[#0088FF]'
                                : isDarkMode ? 'border-[#263554] bg-[#17213C]' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="flex-1">{opt.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Feedback Messages */}
                    {answerState === 'correct' && (
                      <div className={`p-2.5 sm:p-3 rounded-lg border text-xs flex items-start gap-2 ${
                        isDarkMode 
                          ? 'bg-[#0088FF]/15 border-[#0088FF]/30 text-[#F8FAFC]' 
                          : 'bg-[#F0F7FF] border-[#0088FF]/30 text-[#172033]'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#0088FF]">Correct Answer</p>
                          <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                            Accurate documentation of device serial numbers, lot codes, and clinical incident details is essential for statutory MvPI reporting.
                          </p>
                        </div>
                      </div>
                    )}

                    {answerState === 'incorrect' && (
                      <div className={`p-2.5 sm:p-3 rounded-lg border text-xs flex items-start gap-2 ${
                        isDarkMode 
                          ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC]' 
                          : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033]'
                      }`}>
                        <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
                        <div>
                          <p className={`font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Please Try Again</p>
                          <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                            Suspected problems must always be documented immediately to ensure patient safety and initiate quarantine protocols.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Modal Actions */}
                    <div className={`flex items-center justify-end gap-2.5 pt-2 border-t ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
                      {answerState === 'correct' ? (
                        <button
                          onClick={handleResumeVideoAfterQuestion}
                          className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white font-medium text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <span>Continue Video</span>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleAnswerSubmit}
                          disabled={!selectedOption}
                          className={`font-medium text-xs px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all shadow-xs ${
                            selectedOption
                              ? 'bg-[#0088FF] hover:bg-[#0070D2] text-white cursor-pointer active:scale-98'
                              : isDarkMode
                              ? 'bg-[#202D4E] text-[#94A3B8]/40 border border-[#263554] cursor-not-allowed'
                              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          }`}
                        >
                          Submit Answer
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls Bar */}
            <div className="relative z-10 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-2.5 sm:p-4 space-y-1.5 sm:space-y-2 border-t border-slate-800/60">
              
              {/* Progress Slider Track */}
              <div 
                onClick={handleSeek}
                className="w-full bg-slate-700/60 hover:bg-slate-700 rounded-full h-1.5 sm:h-2 relative cursor-pointer group/track transition-all"
              >
                {/* Buffered Track */}
                <div className="absolute top-0 left-0 bg-slate-600/50 rounded-full h-full w-[65%]" />
                {/* Played Track in #0088FF */}
                <div 
                  className="absolute top-0 left-0 bg-[#0088FF] rounded-full h-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/track:scale-100 transition-transform" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white text-xs pt-0.5">
                {/* Left: Play/Pause, Rewind, Time, Volume */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 sm:p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-white"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                    className="p-1 sm:p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-slate-300 hover:text-white"
                    title="Rewind 10 seconds"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-slate-300">
                    <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Volume Control (hidden on mobile) */}
                  <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-700">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-14 h-1 bg-slate-700 accent-[#0088FF] rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Right: Captions, Speed, Re-test Button, Fullscreen */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Demo Reset Trigger */}
                  <button
                    onClick={handleResetCheckpoint}
                    className="text-[9px] sm:text-[10px] text-slate-400 hover:text-[#0088FF] bg-slate-900 border border-slate-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded cursor-pointer transition-colors hidden md:inline-block"
                    title="Reset to 05:00 and test 10s popup checkpoint"
                  >
                    Re-test Checkpoint
                  </button>

                  {/* CC Button */}
                  <button
                    onClick={() => setCaptionsOn(!captionsOn)}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold border transition-colors cursor-pointer ${
                      captionsOn 
                        ? 'bg-[#0088FF] border-[#0088FF] text-white' 
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    CC
                  </button>

                  {/* Speed Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 cursor-pointer"
                    >
                      {playbackSpeed}x
                    </button>

                    {showSpeedMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-slate-900 border border-slate-700 rounded-lg py-1 shadow-xl z-30 min-w-[70px]">
                        {[0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => {
                              setPlaybackSpeed(speed);
                              setShowSpeedMenu(false);
                            }}
                            className={`w-full text-left px-3 py-1 text-xs hover:bg-[#0088FF] hover:text-white transition-colors cursor-pointer ${
                              playbackSpeed === speed ? 'text-[#0088FF] font-bold' : 'text-slate-300'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 sm:p-1.5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* ======================================================= */}
          {/* MOBILE VIEW (< 1024px): UDEMY-STYLE 4 HORIZONTAL TABS   */}
          {/* ======================================================= */}
          <div className="lg:hidden space-y-4">
            
            {/* HORIZONTALLY SCROLLABLE NAVIGATION TAB BAR */}
            <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl border shadow-2xs overflow-hidden transition-colors`}>
              <div className={`flex items-center overflow-x-auto scrollbar-none no-scrollbar border-b px-2 sm:px-4 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
                {mobileTabs.map((tab) => {
                  const isActive = activeMobileTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveMobileTab(tab.id)}
                      className={`py-3 px-3.5 sm:px-4 text-xs font-bold tracking-tight whitespace-nowrap transition-all relative cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
                        isActive
                          ? 'text-[#0088FF] border-[#0088FF]'
                          : isDarkMode
                          ? 'text-[#94A3B8] border-transparent hover:text-[#F8FAFC]'
                          : 'text-[#64748B] border-transparent hover:text-[#172033]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.badge !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                          isActive 
                            ? 'bg-[#0088FF]/10 text-[#0088FF]' 
                            : isDarkMode
                            ? 'bg-[#202D4E] text-[#94A3B8]'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: VIDEO OVERVIEW CONTENT */}
              {activeMobileTab === 'overview' && (
                <div className="p-4 sm:p-5 space-y-4 text-left">
                  {/* Current Lesson Title & Meta */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isDarkMode
                          ? 'text-[#0088FF] bg-[#0088FF]/15 border border-[#0088FF]/30'
                          : 'text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20'
                      }`}>
                        Unit 3 of 5
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        <Clock className="w-3 h-3 text-[#0088FF]" />
                        <span>25 mins</span>
                      </span>
                    </div>

                    <h2 className={`text-base sm:text-lg font-bold tracking-tight ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                      Medical Device Problem Reporting
                    </h2>
                  </div>

                  {/* Current Video Status & Progress */}
                  <div className={`${isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'} border p-3 rounded-lg space-y-2`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Video Progress</span>
                      <span className="font-bold text-[#0088FF]">{progressPercent}% Completed</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDarkMode ? 'bg-[#17213C]' : 'bg-[#E2E8F0]'}`}>
                      <div 
                        className="bg-[#0088FF] h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className={`flex items-center justify-between text-[11px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      <span>Watched: {formatTime(currentTime)}</span>
                      <span>Total: {formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Compact Lesson Overview */}
                  <div className={`space-y-1.5 text-xs leading-relaxed ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                    <h3 className={`font-bold text-xs uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#64748B]'}`}>
                      Lesson Overview
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      This instructional unit guides medical officers, clinical pharmacists, and biomedical staff through standard operating procedures (SOPs) for documenting, investigating, and reporting suspected medical device problems under CDSCO and Materiovigilance Programme of India (MvPI) guidelines.
                    </p>
                  </div>

                  {/* Download MDPI Form / PDF Option */}
                  <div className={`pt-3 border-t flex items-center justify-between ${isDarkMode ? 'border-[#263554]' : 'border-[#F1F5F9]'}`}>
                    <button
                      type="button"
                      onClick={() => alert('MDPI Standard Guidance Form Downloaded (PDF)')}
                      className={`w-full border font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs ${
                        isDarkMode 
                          ? 'bg-[#0088FF]/15 hover:bg-[#0088FF]/25 border-[#0088FF]/30 text-[#0088FF]' 
                          : 'bg-[#F0F7FF] hover:bg-[#E0EFFF] border-[#0088FF]/30 text-[#0088FF]'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download MDPI Form (PDF)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: COURSE CONTENT */}
              {activeMobileTab === 'content' && (
                <div className="p-4 sm:p-5 space-y-4 text-left">
                  {/* Overall Module Progress Summary */}
                  <div className={`${isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'} border p-3 rounded-lg space-y-2`}>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <h4 className={`font-bold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Module 3 Curriculum</h4>
                        <p className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>5 Units • 1 Active Lecture</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        isDarkMode 
                          ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800/60' 
                          : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      }`}>
                        {progressPercent}% Complete
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDarkMode ? 'bg-[#17213C]' : 'bg-[#E2E8F0]'}`}>
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Vertical Units List */}
                  <div className="space-y-2">
                    {courseUnits.map((unit) => {
                      const isWatching = unit.statusType === 'current';
                      const isDone = unit.statusType === 'done';

                      return (
                        <div
                          key={unit.id}
                          onClick={() => {
                            if (isWatching) {
                              setIsPlaying(true);
                              if (playerContainerRef.current) {
                                playerContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                              }
                            } else if (isDone) {
                              alert(`${unit.title} is already completed. Click to review.`);
                            } else {
                              alert(`${unit.title} unlocks sequentially following Unit 3 completion.`);
                            }
                          }}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isWatching
                              ? isDarkMode
                                ? 'bg-[#0088FF]/15 border-[#0088FF]/40 shadow-2xs'
                                : 'bg-[#F0F7FF] border-[#0088FF]/30 shadow-2xs'
                              : isDone
                              ? isDarkMode
                                ? 'bg-[#202D4E] border-[#263554] hover:bg-[#202D4E]/80'
                                : 'bg-white border-[#E2E8F0] hover:bg-[#F7F9FC]'
                              : isDarkMode
                              ? 'bg-[#17213C] border-[#263554] opacity-60'
                              : 'bg-white border-[#E2E8F0] opacity-75'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : isWatching ? (
                              <div className="w-4 h-4 rounded-full bg-[#0088FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Play className="w-2 h-2 fill-current ml-0.5" />
                              </div>
                            ) : (
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-semibold mt-0.5 ${
                                isDarkMode ? 'border-[#263554] text-[#94A3B8]' : 'border-slate-300 text-slate-400'
                              }`}>
                                {unit.unitNumber}
                              </div>
                            )}

                            <div className="min-w-0">
                              <h4 className={`text-xs font-semibold truncate ${
                                isWatching ? 'text-[#0088FF]' : isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                              }`}>
                                {unit.title}
                              </h4>
                              <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                                {isWatching ? `Current Video • ${formatTime(currentTime)} / ${formatTime(duration)}` : unit.subtitle}
                              </p>
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 border ${
                            isDone
                              ? isDarkMode
                                ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800/60'
                                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                              : isWatching
                              ? isDarkMode
                                ? 'text-[#0088FF] bg-[#0088FF]/15 border-[#0088FF]/30'
                                : 'text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20'
                              : isDarkMode
                              ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]'
                              : 'text-slate-500 bg-slate-100 border-slate-200'
                          }`}>
                            {unit.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next Step: Unit 3 Assessment Card */}
                  <div className={`p-3.5 rounded-xl border space-y-2 mt-2 ${
                    isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
                      <div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider block ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Next Step
                        </span>
                        <h4 className={`font-bold text-xs ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                          Unit 3 Assessment
                        </h4>
                      </div>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      Clinical knowledge check and virtual simulation scenario unlocks after completing this lecture.
                    </p>
                    <button
                      onClick={() => alert('Unit 3 Assessment unlocks upon completing the video lecture.')}
                      className={`w-full border font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isDarkMode 
                          ? 'bg-[#17213C] hover:bg-[#17213C]/80 border-[#263554] text-[#F8FAFC]' 
                          : 'bg-[#F7F9FC] hover:bg-slate-100 border-[#E2E8F0] text-[#172033]'
                      }`}
                    >
                      <span>View Assessment Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Q&A (CONNECTED TO ASK A DOUBT) */}
              {activeMobileTab === 'qa' && (
                <div className="p-4 sm:p-5 space-y-4 text-left">
                  {/* Top Bar with Ask a Doubt trigger */}
                  <div className={`flex items-center justify-between gap-2 border-b pb-3 ${
                    isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
                  }`}>
                    <div>
                      <h3 className={`text-xs sm:text-sm font-bold ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Questions & Answers ({qaQuestions.length})
                      </h3>
                      <p className={`text-[11px] ${
                        isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}>
                        All inquiries linked to video timestamps
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAskDoubt}
                      className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-95 text-white font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Ask a Doubt</span>
                    </button>
                  </div>

                  {/* List of Questions */}
                  <div className="space-y-3">
                    {qaQuestions.map((q) => (
                      <div 
                        key={q.id}
                        className={`rounded-xl p-3 sm:p-4 space-y-2.5 shadow-2xs border ${
                          isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                        }`}
                      >
                        {/* Question Header: Student Info & Clickable Timestamp */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#0088FF] text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {q.avatarInitial || 'A'}
                            </div>
                            <div>
                              <p className={`text-xs font-bold leading-none ${
                                isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                              }`}>
                                {q.studentName}
                              </p>
                              <span className={`text-[10px] ${
                                isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                              }`}>
                                {q.studentRole} • {q.createdAt}
                              </span>
                            </div>
                          </div>

                          {/* Clickable Timestamp Seek Button */}
                          <button
                            type="button"
                            onClick={() => handleSeekToTimestamp(q.rawSeconds)}
                            className={`border px-2 py-0.5 rounded text-[11px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                              isDarkMode
                                ? 'bg-[#17213C] hover:bg-[#0088FF] text-[#0088FF] hover:text-white border-[#0088FF]/40'
                                : 'bg-[#F0F7FF] hover:bg-[#0088FF] text-[#0088FF] hover:text-white border-[#0088FF]/30'
                            }`}
                            title={`Seek video to ${q.timestampFormatted}`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>{q.timestampFormatted}</span>
                          </button>
                        </div>

                        {/* Question Text */}
                        <p className={`text-xs font-medium leading-relaxed ${
                          isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                        }`}>
                          "{q.question}"
                        </p>

                        {/* Verified Teacher Reply */}
                        {q.teacherReply && (
                          <div className={`rounded-lg p-2.5 space-y-1 border ${
                            isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0088FF]">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#0088FF]" />
                              <span>{q.teacherName} ({q.teacherRole})</span>
                            </div>
                            <p className={`text-[11px] leading-relaxed pl-5 ${
                              isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                            }`}>
                              {q.teacherReply}
                            </p>
                          </div>
                        )}

                        {/* Bottom Actions: Upvote & Reply info */}
                        <div className={`flex items-center justify-between text-[11px] pt-1 border-t ${
                          isDarkMode ? 'border-[#263554] text-[#94A3B8]' : 'border-[#F1F5F9] text-[#64748B]'
                        }`}>
                          <button
                            type="button"
                            onClick={() => handleToggleUpvote(q.id)}
                            className={`flex items-center gap-1.5 py-0.5 px-2 rounded-md transition-colors cursor-pointer ${
                              q.userUpvoted 
                                ? (isDarkMode ? 'text-[#0088FF] font-bold bg-[#17213C]' : 'text-[#0088FF] font-bold bg-[#F0F7FF]')
                                : (isDarkMode ? 'hover:bg-[#17213C] text-[#94A3B8]' : 'hover:bg-slate-100 text-[#64748B]')
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{q.upvotes} helpful</span>
                          </button>

                          <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            Verified Inquiry
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ask a Doubt callout banner */}
                  <div className={`rounded-xl p-3.5 flex items-center justify-between gap-3 border ${
                    isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F0F7FF] border-[#0088FF]/20'
                  }`}>
                    <div className="space-y-0.5">
                      <p className={`text-xs font-bold ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Have a question at {formatTime(currentTime)}?
                      </p>
                      <p className={`text-[11px] ${
                        isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}>
                        Timestamp will be automatically captured.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAskDoubt}
                      className="bg-[#0088FF] hover:bg-[#0070D2] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 cursor-pointer shadow-2xs"
                    >
                      Ask Doubt
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: FEEDBACK */}
              {activeMobileTab === 'feedback' && (
                <div className="p-4 sm:p-5 space-y-4 text-left">
                  <div className={`border-b pb-2.5 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
                    <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      Share Feedback
                    </h3>
                    <p className={`text-[11px] mt-0.5 ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      Help improve course quality and explanations for Module 3
                    </p>
                  </div>

                  <form onSubmit={handleSubmitFeedback} className="space-y-3.5 text-xs">
                    {/* 1. Rating (1-5) */}
                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Rating:
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className={`w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                              feedbackRating >= star
                                ? (isDarkMode ? 'bg-[#17213C] border-[#0088FF] text-[#0088FF]' : 'bg-[#F0F7FF] border-[#0088FF] text-[#0088FF]')
                                : (isDarkMode ? 'bg-[#202D4E] border-[#263554] text-[#94A3B8] hover:border-slate-600' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-slate-300')
                            }`}
                            title={`${star} Star${star > 1 ? 's' : ''}`}
                          >
                            <Star className={`w-4 h-4 ${feedbackRating >= star ? 'fill-[#0088FF] text-[#0088FF]' : (isDarkMode ? 'text-slate-600' : 'text-slate-300')}`} />
                          </button>
                        ))}
                        <span className={`text-[11px] ml-2 font-medium ${
                          isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        }`}>
                          {feedbackRating === 5 ? 'Excellent' : feedbackRating === 4 ? 'Good' : feedbackRating === 3 ? 'Average' : feedbackRating === 2 ? 'Fair' : 'Needs Improvement'}
                        </span>
                      </div>
                    </div>

                    {/* 2. Feedback Type / Category */}
                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Feedback Category:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          'Video Content',
                          'Explanation',
                          'Learning Experience',
                          'Technical Issue'
                        ].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFeedbackType(type)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer truncate ${
                              feedbackType === type
                                ? 'bg-[#0088FF] border-[#0088FF] text-white shadow-2xs font-semibold'
                                : (isDarkMode ? 'bg-[#202D4E] border-[#263554] text-[#94A3B8] hover:border-slate-600 hover:text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-slate-300 hover:text-[#172033]')
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Feedback Message */}
                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Message:
                      </label>
                      <textarea
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        placeholder="Tell us what you found useful or what could be improved..."
                        rows={3}
                        className={`w-full text-xs p-3 rounded-lg border outline-hidden resize-none transition-colors ${
                          isDarkMode
                            ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]'
                            : 'bg-white border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:border-[#0088FF]'
                        }`}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!feedbackMessage.trim()}
                      className={`w-full font-semibold text-xs py-2.5 rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                        feedbackMessage.trim()
                          ? 'bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white cursor-pointer'
                          : (isDarkMode ? 'bg-[#202D4E] text-slate-500 border border-[#263554] cursor-not-allowed' : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed')
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Feedback</span>
                    </button>
                  </form>

                  {/* Submitted Feedback History */}
                  {submittedFeedback.length > 0 && (
                    <div className={`pt-3 border-t space-y-2 ${isDarkMode ? 'border-[#263554]' : 'border-[#F1F5F9]'}`}>
                      <h4 className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}>
                        Your Submitted Feedback ({submittedFeedback.length})
                      </h4>
                      {submittedFeedback.map((item) => (
                        <div 
                          key={item.id} 
                          className={`p-2.5 rounded-lg border space-y-1 ${
                            isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className={`font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                              {item.type}
                            </span>
                            <div className="flex items-center text-amber-500">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className={`text-[11px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                            "{item.message}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* ======================================================= */}
          {/* DESKTOP VIEW (>= 1024px): EXISTING LMS TWO-COLUMN VIEW */}
          {/* ======================================================= */}
          <div className="hidden lg:block space-y-5">
            
            {/* VIDEO CONTENT & METADATA SECTION */}
            <div className={`rounded-xl p-6 border space-y-4 ${
              isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className={`flex items-start justify-between gap-3 border-b pb-3 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      Medical Device Problem Reporting
                    </h2>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      isDarkMode 
                        ? 'text-[#0088FF] bg-[#202D4E] border-[#0088FF]/30' 
                        : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                    }`}>
                      Unit 3
                    </span>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Duration: 25 minutes • Status: <span className="text-[#0088FF] font-semibold">In Progress ({formatTime(currentTime)} / {formatTime(duration)})</span>
                  </p>
                </div>

                <div className="text-right shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenAskDoubt}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs border ${
                      isDarkMode
                        ? 'text-[#0088FF] hover:text-white bg-[#202D4E] hover:bg-[#0088FF] border-[#263554]'
                        : 'text-[#0088FF] hover:text-[#0070D2] bg-[#F0F7FF] hover:bg-[#E0EFFF] border-[#0088FF]/30'
                    }`}
                    title="Ask a doubt connected to current timestamp"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Ask a Doubt</span>
                  </button>
                  <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-md border ${
                    isDarkMode
                      ? 'text-[#0088FF] bg-[#202D4E] border-[#0088FF]/30'
                      : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                  }`}>
                    Active Lecture
                  </span>
                </div>
              </div>

              {/* Description using existing Module 3 context */}
              <div className="space-y-2 text-xs leading-relaxed">
                <h4 className={`font-bold text-xs uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  Lesson Overview
                </h4>
                <p className={isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                  This instructional unit guides medical officers, clinical pharmacists, and biomedical staff through standard operating procedures (SOPs) for documenting, investigating, and reporting suspected medical device problems. Learn how to accurately classify adverse incidents, isolate malfunctioning equipment, and file statutory notifications under CDSCO and Materiovigilance Programme of India (MvPI) guidelines.
                </p>
              </div>

              {/* Q&A / DOUBTS SECTION ON DESKTOP */}
              {qaQuestions.length > 0 && (
                <div className={`pt-2 border-t ${isDarkMode ? 'border-[#263554]' : 'border-[#F1F5F9]'}`}>
                  <div className={`rounded-lg p-3.5 space-y-2.5 border ${
                    isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold flex items-center gap-1.5 ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        <HelpCircle className="w-3.5 h-3.5 text-[#0088FF]" />
                        <span>Interactive Q&A Forum ({qaQuestions.length})</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleOpenAskDoubt}
                        className="text-[10px] font-semibold text-[#0088FF] hover:underline cursor-pointer"
                      >
                        + Ask New Question
                      </button>
                    </div>

                    <div className="space-y-2">
                      {qaQuestions.map((item) => (
                        <div 
                          key={item.id} 
                          className={`p-3 rounded-md border text-xs space-y-1.5 ${
                            isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                          }`}
                        >
                          <div className={`flex items-center justify-between text-[11px] ${
                            isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                          }`}>
                            <div className="flex items-center gap-1.5">
                              <span className={`font-bold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                                {item.studentName}
                              </span>
                              <span>•</span>
                              <button
                                type="button"
                                onClick={() => handleSeekToTimestamp(item.rawSeconds)}
                                className="font-mono font-semibold text-[#0088FF] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>{item.timestampFormatted}</span>
                              </button>
                            </div>
                            <span>{item.createdAt}</span>
                          </div>
                          
                          <p className={`font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                            "{item.question}"
                          </p>

                          {item.teacherReply && (
                            <div className={`rounded p-2 text-[11px] flex items-start gap-1.5 border ${
                              isDarkMode 
                                ? 'bg-[#202D4E] border-[#0088FF]/30 text-[#94A3B8]' 
                                : 'bg-[#F0F7FF] border-[#0088FF]/20 text-[#64748B]'
                            }`}>
                              <ShieldCheck className="w-3.5 h-3.5 text-[#0088FF] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-[#0088FF]">{item.teacherName}: </span>
                                <span>{item.teacherReply}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Reference */}
              <div className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t text-[11px] ${
                isDarkMode ? 'border-[#263554] text-[#94A3B8]' : 'border-[#F1F5F9] text-[#64748B]'
              }`}>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0088FF]" />
                    <span>25 minutes lecture</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0088FF]" />
                    <span>Unit 3 of 5</span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => alert('MDPI Standard Guidance Form Downloaded')}
                    className={`font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                      isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC] hover:underline' : 'text-[#64748B] hover:text-[#172033] hover:underline'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MDPI Form (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ======================================================= */}
        {/* RIGHT COLUMN: DESKTOP-ONLY (>= 1024px)                  */}
        {/* ======================================================= */}
        <div className="hidden lg:block lg:col-span-4 space-y-5">
          
          {/* COMPACT MODULE PROGRESS CARD */}
          <div className={`rounded-xl p-5 border space-y-4 ${
            isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
            }`}>
              <div>
                <h3 className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  Module 3 Progress
                </h3>
                <p className={`text-[11px] mt-0.5 ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}>
                  Current video: Medical Device Problem Reporting
                </p>
              </div>
              <span 
                className="text-xs font-bold px-2 py-0.5 rounded border"
                style={{
                  color: getProgressColor(progressPercent),
                  borderColor: `${getProgressColor(progressPercent)}40`,
                  backgroundColor: `${getProgressColor(progressPercent)}15`
                }}
              >
                {progressPercent}% Complete
              </span>
            </div>

            <div className="space-y-1.5">
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                isDarkMode ? 'bg-[#202D4E]' : 'bg-[#F1F5F9]'
              }`}>
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${progressPercent}%`,
                    backgroundColor: getProgressColor(progressPercent)
                  }}
                />
              </div>
              <div className={`flex items-center justify-between text-[10px] ${
                isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
              }`}>
                <span>Video Progress: {formatTime(currentTime)} / {formatTime(duration)}</span>
                <span className={`font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Units list */}
            <div className="space-y-2 pt-1">
              {courseUnits.map((unit) => {
                const isWatching = unit.statusType === 'current';
                const isDone = unit.statusType === 'done';

                return (
                  <div 
                    key={unit.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                      isWatching 
                        ? (isDarkMode ? 'bg-[#202D4E] border-[#0088FF]/50' : 'bg-[#F0F7FF] border-[#0088FF]/30')
                        : isDone 
                        ? (isDarkMode ? 'bg-[#202D4E]/60 border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]')
                        : (isDarkMode ? 'bg-[#17213C] border-[#263554] opacity-75' : 'bg-white border-[#E2E8F0] opacity-75')
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      ) : isWatching ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-[#0088FF] text-white flex items-center justify-center shrink-0">
                          <Play className="w-2 h-2 fill-current ml-0.5" />
                        </div>
                      ) : (
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 text-[9px] font-semibold ${
                          isDarkMode ? 'border-slate-600 text-slate-500' : 'border-slate-300 text-slate-400'
                        }`}>
                          {unit.unitNumber}
                        </div>
                      )}

                      <div>
                        <h4 className={`text-xs font-semibold ${
                          isWatching ? 'text-[#0088FF]' : (isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]')
                        }`}>
                          {unit.title}
                        </h4>
                        <p className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          {unit.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-semibold ${
                      isDone 
                        ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-700') 
                        : isWatching 
                        ? 'text-[#0088FF]' 
                        : (isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]')
                    }`}>
                      {unit.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NEXT STEP: ASSESSMENT (Subtle & clean) */}
          <div className={`rounded-xl p-5 border space-y-3 ${
            isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}>
                  Next Step
                </span>
                <h4 className={`font-bold text-xs sm:text-sm ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  Unit 3 Assessment
                </h4>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Clinical knowledge check and virtual simulation scenario following completion of this lecture.
            </p>

            <button
              onClick={() => {
                alert('Unit 3 Assessment unlocks upon completing the video lecture.');
              }}
              className={`w-full font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                isDarkMode
                  ? 'bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554] text-[#F8FAFC]'
                  : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] hover:border-[#0088FF] text-[#172033] hover:text-[#0088FF]'
              }`}
            >
              <span>View Assessment Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* STUDENT FEEDBACK CARD */}
          <div className={`rounded-xl p-5 border space-y-3 ${
            isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0088FF]" />
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}>
                  Student Feedback
                </span>
                <h4 className={`font-bold text-xs sm:text-sm ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  Unit 3 Feedback
                </h4>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Have suggestions on this video or your learning progress? Share your feedback with us.
            </p>

            <button
              type="button"
              onClick={handleOpenFeedback}
              className={`w-full font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                isDarkMode
                  ? 'bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554] text-[#F8FAFC]'
                  : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] hover:border-[#0088FF] text-[#172033] hover:text-[#0088FF]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Feedback</span>
            </button>
          </div>

        </div>

      </div>

      {/* ======================================================= */}
      {/* ASK A DOUBT MODAL / DIALOG (CONNECTED TO VIDEO TIMESTAMP) */}
      {/* ======================================================= */}
      <AnimatePresence>
        {showDoubtModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setShowDoubtModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`rounded-2xl shadow-xl border w-full max-w-md p-5 sm:p-6 space-y-4 text-left my-auto ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`flex items-center justify-between border-b pb-3 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    isDarkMode ? 'bg-[#202D4E] border-[#263554] text-[#0088FF]' : 'bg-[#F0F7FF] border-[#0088FF]/20 text-[#0088FF]'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      ASK A DOUBT
                    </h3>
                    <p className={`text-[11px] ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      Captured at current playback timestamp
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDoubtModal(false)}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video and Read-Only Timestamp Details */}
              <div className={`p-3.5 rounded-xl space-y-2 text-xs border ${
                isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'
              }`}>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}>
                    Video:
                  </span>
                  <p className={`font-semibold mt-0.5 ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Module 3: Medical Device Problem Reporting
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between ${
                  isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}>
                    Video Timestamp:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                      isDarkMode 
                        ? 'text-[#0088FF] bg-[#17213C] border-[#0088FF]/40' 
                        : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/30'
                    }`}>
                      {formatTime(doubtTimestamp !== null ? doubtTimestamp : currentTime)} / {formatTime(duration)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (Read-Only)
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Input */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-semibold ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  Question:
                </label>
                <textarea
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  placeholder="Type your question or doubt regarding this part of the lecture..."
                  rows={4}
                  className={`w-full text-xs p-3 rounded-xl border outline-hidden resize-none transition-colors ${
                    isDarkMode
                      ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]'
                      : 'bg-white border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:border-[#0088FF]'
                  }`}
                  autoFocus
                />
              </div>

              {/* Action Buttons */}
              <div className={`flex items-center justify-end gap-2.5 pt-3 border-t ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowDoubtModal(false)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    isDarkMode
                      ? 'text-[#94A3B8] hover:text-[#F8FAFC] bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554]'
                      : 'text-[#64748B] hover:text-[#172033] bg-white hover:bg-[#F7F9FC] border-[#E2E8F0]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendDoubt}
                  disabled={!doubtQuestion.trim()}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs flex items-center gap-1.5 ${
                    doubtQuestion.trim()
                      ? 'bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white cursor-pointer'
                      : (isDarkMode ? 'bg-[#202D4E] text-slate-500 border border-[#263554] cursor-not-allowed' : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed')
                  }`}
                >
                  <Send className="w-3 h-3" />
                  <span>Submit Question</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* DESKTOP SHARE FEEDBACK MODAL                            */}
      {/* ======================================================= */}
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowFeedbackModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className={`rounded-xl shadow-xl border w-full max-w-md p-5 sm:p-6 space-y-4 text-left ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`flex items-center justify-between border-b pb-3 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                    isDarkMode ? 'bg-[#202D4E] border-[#263554] text-[#0088FF]' : 'bg-[#F0F7FF] border-[#0088FF]/20 text-[#0088FF]'
                  }`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      Share Feedback
                    </h3>
                    <p className={`text-[11px] ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      Help improve course quality and explanations
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* 1. Rating (1-5) */}
                <div className="space-y-1.5">
                  <label className={`block text-xs font-semibold ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Rating (1–5):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                          feedbackRating >= star
                            ? (isDarkMode ? 'bg-[#202D4E] border-[#0088FF] text-[#0088FF]' : 'bg-[#F0F7FF] border-[#0088FF] text-[#0088FF]')
                            : (isDarkMode ? 'bg-[#202D4E] border-[#263554] text-[#94A3B8] hover:border-slate-600' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-slate-300')
                        }`}
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <Star className={`w-4 h-4 ${feedbackRating >= star ? 'fill-[#0088FF] text-[#0088FF]' : (isDarkMode ? 'text-slate-600' : 'text-slate-300')}`} />
                      </button>
                    ))}
                    <span className={`text-[11px] ml-1 font-medium ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      {feedbackRating === 5 ? 'Excellent' : feedbackRating === 4 ? 'Good' : feedbackRating === 3 ? 'Average' : feedbackRating === 2 ? 'Fair' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>

                {/* 2. Feedback Type */}
                <div className="space-y-1.5">
                  <label className={`block text-xs font-semibold ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Feedback Type:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Video Content',
                      'Explanation',
                      'Learning Experience',
                      'Technical Issue',
                      'Other'
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFeedbackType(type)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer truncate ${
                          feedbackType === type
                            ? 'bg-[#0088FF] border-[#0088FF] text-white shadow-2xs font-semibold'
                            : (isDarkMode ? 'bg-[#202D4E] border-[#263554] text-[#94A3B8] hover:border-slate-600 hover:text-[#F8FAFC]' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-slate-300 hover:text-[#172033]')
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Feedback Message */}
                <div className="space-y-1.5">
                  <label className={`block text-xs font-semibold ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Feedback Message:
                  </label>
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Tell us what you found useful or what could be improved..."
                    rows={4}
                    className={`w-full text-xs p-3 rounded-lg border outline-hidden resize-none transition-colors ${
                      isDarkMode
                        ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]'
                        : 'bg-white border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:border-[#0088FF]'
                    }`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex items-center justify-end gap-2.5 pt-3 border-t ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    isDarkMode
                      ? 'text-[#94A3B8] hover:text-[#F8FAFC] bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554]'
                      : 'text-[#64748B] hover:text-[#172033] bg-white hover:bg-[#F7F9FC] border-[#E2E8F0]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitFeedback}
                  className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  Submit Feedback
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* SUCCESS CONFIRMATION TOAST NOTIFICATION                 */}
      {/* ======================================================= */}
      <AnimatePresence>
        {(doubtNotification || feedbackNotification) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#172033] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs max-w-sm"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-slate-100 flex-1">
              {doubtNotification || feedbackNotification}
            </span>
            <button
              type="button"
              onClick={() => {
                setDoubtNotification(null);
                setFeedbackNotification(null);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
