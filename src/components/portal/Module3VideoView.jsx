import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ChevronRight, Play, Pause, Volume2, VolumeX, 
  Maximize, Minimize, RotateCcw, CheckCircle2, FileText, 
  Clock, Award, BookOpen, ShieldCheck, Download, AlertCircle, 
  HelpCircle, Check, X, Star, MessageSquare
} from 'lucide-react';

export default function Module3VideoView({ onBack, onNavigate }) {
  // Student Learning State Architecture (Prototype for HOD Demo)
  // 'new': First-time learner (directed to Pre-Test before Module 1)
  // 'existing': Continuing learner (directly continues current video/unit)
  const [studentStatus, setStudentStatus] = useState('existing');

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

  // Ask a Doubt State
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [doubtTimestamp, setDoubtTimestamp] = useState(null);
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [submittedDoubts, setSubmittedDoubts] = useState([]);
  const [doubtNotification, setDoubtNotification] = useState(null);

  // Student Feedback State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackType, setFeedbackType] = useState('Video Content');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [feedbackNotification, setFeedbackNotification] = useState(null);

  const playerContainerRef = useRef(null);

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
    const newDoubt = {
      videoTitle: 'Medical Device Problem Reporting',
      timestamp: `${formatTime(doubtTimestamp)} / ${formatTime(duration)}`,
      timestampFormatted: formatTime(doubtTimestamp),
      rawSeconds: doubtTimestamp,
      question: doubtQuestion.trim(),
      createdAt: new Date().toISOString()
    };
    setSubmittedDoubts(prev => [newDoubt, ...prev]);
    setShowDoubtModal(false);
    setDoubtQuestion('');
    setDoubtNotification('Your doubt has been sent to the faculty.');
    setTimeout(() => {
      setDoubtNotification(null);
    }, 4000);
  };

  // Student Feedback Handlers
  const handleOpenFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = (e) => {
    if (e) e.preventDefault();
    const newFeedback = {
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
    setFeedbackNotification('Feedback submitted successfully.');
    setTimeout(() => {
      setFeedbackNotification(null);
    }, 4000);
  };

  const progressPercent = Math.round((currentTime / duration) * 100);

  return (
    <div className="space-y-5 text-[#172033]">
      
      {/* 1. TOP HEADER & BREADCRUMB NAVIGATION */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] space-y-3">
        {/* Breadcrumb Row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <button
              onClick={onBack}
              className="font-medium text-[#64748B] hover:text-[#0088FF] transition-colors cursor-pointer"
            >
              My Course
            </button>
            <span className="text-[#E2E8F0]">/</span>
            <span className="font-semibold text-[#172033]">Module 3</span>
          </div>

          <button
            onClick={onBack}
            className="text-xs font-semibold text-[#0088FF] hover:text-[#0070D2] flex items-center gap-1.5 cursor-pointer bg-[#F0F7FF] border border-[#0088FF]/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Course</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            Module 3: Medical Device Problem Reporting
          </h1>

          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Learn the fundamentals of identifying, documenting, and reporting medical device problems.
          </p>
        </div>
      </div>

      {/* 2. MAIN GRID LAYOUT: VIDEO PLAYER (8 COLS) + MODULE PROGRESS & NEXT (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / CENTER: 16:9 VIDEO PLAYER & LECTURE INFO */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* 16:9 VIDEO PLAYER CONTAINER */}
          <div 
            ref={playerContainerRef}
            className="bg-slate-950 rounded-xl overflow-hidden border border-[#E2E8F0] relative aspect-video flex flex-col justify-between shadow-2xs select-none"
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
            <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-[#0088FF] text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                  Unit 3
                </span>
                <span className="font-semibold text-slate-100 truncate max-w-xs sm:max-w-md">
                  Medical Device Problem Reporting
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenAskDoubt}
                  className="bg-slate-900/85 hover:bg-[#0088FF] text-slate-200 hover:text-white border border-slate-700 hover:border-[#0088FF] px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Ask a Doubt at current video timestamp"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#0088FF]" />
                  <span>Ask a Doubt</span>
                </button>
                <span className="bg-slate-900/80 text-slate-200 px-2 py-1 rounded text-[11px] font-mono border border-slate-700">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Center Big Play Button (when paused and no modal) */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              {!isPlaying && !showQuestionModal && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0088FF] hover:bg-[#0070D2] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/20"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1 text-white" />
                </button>
              )}
            </div>

            {/* Narration Captions */}
            {captionsOn && isPlaying && !showQuestionModal && (
              <div className="relative z-10 px-6 pb-2 text-center pointer-events-none">
                <span className="inline-block bg-slate-950/85 text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-lg border border-slate-800">
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
                  className="absolute inset-0 z-30 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
                >
                  <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-lg p-5 sm:p-6 space-y-4 text-left">
                    
                    {/* Popup Header */}
                    <div className="border-b border-[#E2E8F0] pb-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded uppercase tracking-wider">
                          Checkpoint Assessment
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">
                          Pause @ {formatTime(currentTime)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#172033]">
                        Quick Knowledge Check
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Before continuing, answer this question:
                      </p>
                    </div>

                    {/* Question Prompt */}
                    <p className="text-xs sm:text-sm font-semibold text-[#172033] leading-snug">
                      Which of the following is an important step when reporting a suspected medical device problem?
                    </p>

                    {/* Single Choice Options */}
                    <div className="space-y-2 pt-1">
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
                            className={`p-3 rounded-lg border text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#0088FF] bg-[#F0F7FF] text-[#172033] font-medium'
                                : 'border-[#E2E8F0] bg-white text-[#172033] hover:bg-[#F7F9FC]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#0088FF] bg-[#0088FF]'
                                : 'border-slate-300 bg-white'
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
                      <div className="p-3 rounded-lg bg-[#F0F7FF] border border-[#0088FF]/30 text-xs text-[#172033] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0088FF] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#0088FF]">Correct Answer</p>
                          <p className="text-[#64748B] text-[11px] mt-0.5">
                            Accurate documentation of device serial numbers, lot codes, and clinical incident details is essential for statutory MvPI reporting.
                          </p>
                        </div>
                      </div>
                    )}

                    {answerState === 'incorrect' && (
                      <div className="p-3 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0] text-xs text-[#172033] flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#172033]">Please Try Again</p>
                          <p className="text-[#64748B] text-[11px] mt-0.5">
                            Suspected problems must always be documented immediately to ensure patient safety and initiate quarantine protocols.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Modal Actions */}
                    <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#E2E8F0]">
                      {answerState === 'correct' ? (
                        <button
                          onClick={handleResumeVideoAfterQuestion}
                          className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white font-medium text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <span>Continue Video</span>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleAnswerSubmit}
                          disabled={!selectedOption}
                          className={`font-medium text-xs px-5 py-2.5 rounded-lg transition-all shadow-xs ${
                            selectedOption
                              ? 'bg-[#0088FF] hover:bg-[#0070D2] text-white cursor-pointer active:scale-98'
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
            <div className="relative z-10 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-3 sm:p-4 space-y-2 border-t border-slate-800/60">
              
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-white"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer text-slate-300 hover:text-white"
                    title="Rewind 10 seconds"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
                    <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Volume Control */}
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
                <div className="flex items-center gap-2">
                  {/* Demo Reset Trigger */}
                  <button
                    onClick={handleResetCheckpoint}
                    className="text-[10px] text-slate-400 hover:text-[#0088FF] bg-slate-900 border border-slate-700 px-2 py-1 rounded cursor-pointer transition-colors"
                    title="Reset to 05:00 and test 10s popup checkpoint"
                  >
                    Re-test Checkpoint
                  </button>

                  {/* CC Button */}
                  <button
                    onClick={() => setCaptionsOn(!captionsOn)}
                    className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
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
                      className="px-2 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 cursor-pointer"
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
                    className="p-1.5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* VIDEO CONTENT & METADATA SECTION */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E2E8F0] pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-[#172033]">
                    Medical Device Problem Reporting
                  </h2>
                  <span className="text-[10px] font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
                    Unit 3
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Duration: 25 minutes • Status: <span className="text-[#0088FF] font-semibold">In Progress ({formatTime(currentTime)} / {formatTime(duration)})</span>
                </p>
              </div>

              <div className="text-right shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenAskDoubt}
                  className="text-xs font-semibold text-[#0088FF] hover:text-[#0070D2] bg-[#F0F7FF] hover:bg-[#E0EFFF] border border-[#0088FF]/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="Ask a doubt connected to current timestamp"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ask a Doubt</span>
                </button>
                <span className="text-xs font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2.5 py-1.5 rounded-md">
                  Active Lecture
                </span>
              </div>
            </div>

            {/* Description using existing Module 3 context */}
            <div className="space-y-2 text-xs text-[#172033] leading-relaxed">
              <h4 className="font-bold text-[#172033] text-xs uppercase tracking-wider">
                Lesson Overview
              </h4>
              <p className="text-[#64748B]">
                This instructional unit guides medical officers, clinical pharmacists, and biomedical staff through standard operating procedures (SOPs) for documenting, investigating, and reporting suspected medical device problems. Learn how to accurately classify adverse incidents, isolate malfunctioning equipment, and file statutory notifications under CDSCO and Materiovigilance Programme of India (MvPI) guidelines.
              </p>
            </div>

            {/* SUBMITTED DOUBTS LIST (Prototype State Display) */}
            {submittedDoubts.length > 0 && (
              <div className="pt-2 border-t border-[#F1F5F9]">
                <div className="bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#172033] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#0088FF]" />
                      <span>My Submitted Questions ({submittedDoubts.length})</span>
                    </span>
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Sent to Faculty
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {submittedDoubts.map((item, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-md border border-[#E2E8F0] text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                          <span className="font-mono font-semibold text-[#0088FF]">
                            Timestamp: {item.timestampFormatted}
                          </span>
                          <span>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-[#172033] font-medium">"{item.question}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Reference */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
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
                  onClick={handleOpenFeedback}
                  className="font-medium text-xs text-[#0088FF] hover:text-[#0070D2] bg-[#F0F7FF] hover:bg-[#E0EFFF] border border-[#0088FF]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Give Feedback</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('MDPI Standard Guidance Form Downloaded')}
                  className="font-medium text-[#64748B] hover:text-[#172033] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MDPI Form (PDF)</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR: COMPACT MODULE PROGRESS & NEXT STEP */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* COMPACT MODULE PROGRESS CARD */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                  Module 3 Progress
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Current video: Medical Device Problem Reporting
                </p>
              </div>
              <span className="text-xs font-bold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
                {progressPercent}% Complete
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#0088FF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                <span>Video Progress: {formatTime(currentTime)} / {formatTime(duration)}</span>
                <span className="font-semibold text-[#172033]">{progressPercent}%</span>
              </div>
            </div>

            {/* Units list */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#172033]">Unit 1: Fundamentals of MDR 2017</h4>
                    <p className="text-[10px] text-[#64748B]">Video Completed • 15 mins</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700">Done</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#172033]">Unit 2: Signal Detection & Risk</h4>
                    <p className="text-[10px] text-[#64748B]">Video Completed • 20 mins</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700">Done</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F0F7FF] border border-[#0088FF]/30">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0088FF] text-white flex items-center justify-center shrink-0">
                    <Play className="w-2 h-2 fill-current ml-0.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0088FF]">Unit 3: Problem Reporting (MDPI)</h4>
                    <p className="text-[10px] text-[#64748B]">Current Video • 05:00 / 25:00</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#0088FF]">Watching</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] opacity-75">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center shrink-0 text-[9px] font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#172033]">Unit 4: Root-Cause Investigation</h4>
                    <p className="text-[10px] text-[#64748B]">Next Video • 20 mins</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#64748B]">Upcoming</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E2E8F0] opacity-60">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center shrink-0 text-[9px] font-semibold">
                    5
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#172033]">Unit 5: Statutory Reporting SOPs</h4>
                    <p className="text-[10px] text-[#64748B]">Upcoming Video • 25 mins</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#64748B]">Upcoming</span>
              </div>
            </div>
          </div>

          {/* NEXT STEP: ASSESSMENT (Subtle & clean) */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Next Step
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-[#172033]">
                  Unit 3 Assessment
                </h4>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Clinical knowledge check and virtual simulation scenario following completion of this lecture.
            </p>

            <button
              onClick={() => {
                alert('Unit 3 Assessment unlocks upon completing the video lecture.');
              }}
              className="w-full bg-white hover:bg-[#F7F9FC] border border-[#E2E8F0] hover:border-[#0088FF] text-[#172033] hover:text-[#0088FF] font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Assessment Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* STUDENT FEEDBACK CARD */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0088FF]" />
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Student Feedback
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-[#172033]">
                  Unit 3 Feedback
                </h4>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Have suggestions on this video or your learning progress? Share your feedback with us.
            </p>

            <button
              type="button"
              onClick={handleOpenFeedback}
              className="w-full bg-white hover:bg-[#F7F9FC] border border-[#E2E8F0] hover:border-[#0088FF] text-[#172033] hover:text-[#0088FF] font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Feedback</span>
            </button>
          </div>

        </div>

      </div>

      {/* ASK A DOUBT MODAL */}
      <AnimatePresence>
        {showDoubtModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowDoubtModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-full max-w-md p-5 sm:p-6 space-y-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F0F7FF] border border-[#0088FF]/20 flex items-center justify-center text-[#0088FF]">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172033]">Ask a Doubt</h3>
                    <p className="text-[11px] text-[#64748B]">Connected directly to faculty review</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDoubtModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video and Timestamp details */}
              <div className="bg-[#F7F9FC] border border-[#E2E8F0] p-3.5 rounded-lg space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                    Video:
                  </span>
                  <p className="font-semibold text-[#172033] mt-0.5">
                    Medical Device Problem Reporting
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Timestamp:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-xs text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
                      {formatTime(doubtTimestamp)} / {formatTime(duration)}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">
                      (Timestamp: {formatTime(doubtTimestamp)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#172033]">
                  Question:
                </label>
                <textarea
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  placeholder="What would you like to ask about this part of the video?"
                  rows={4}
                  className="w-full text-xs p-3 rounded-lg border border-[#E2E8F0] focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-hidden resize-none text-[#172033] bg-white transition-colors placeholder:text-slate-400"
                  autoFocus
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowDoubtModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#172033] bg-white hover:bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendDoubt}
                  disabled={!doubtQuestion.trim()}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs ${
                    doubtQuestion.trim()
                      ? 'bg-[#0088FF] hover:bg-[#0070D2] text-white cursor-pointer active:scale-98'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  Send Doubt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHARE FEEDBACK MODAL */}
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
              className="bg-white rounded-xl shadow-xl border border-[#E2E8F0] w-full max-w-md p-5 sm:p-6 space-y-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F0F7FF] border border-[#0088FF]/20 flex items-center justify-center text-[#0088FF]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172033]">Share Feedback</h3>
                    <p className="text-[11px] text-[#64748B]">Help improve course quality and explanations</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* 1. Rating (1-5) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172033]">
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
                            ? 'bg-[#F0F7FF] border-[#0088FF] text-[#0088FF]'
                            : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-slate-300'
                        }`}
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <Star className={`w-4 h-4 ${feedbackRating >= star ? 'fill-[#0088FF] text-[#0088FF]' : 'text-slate-300'}`} />
                      </button>
                    ))}
                    <span className="text-[11px] text-[#64748B] ml-1 font-medium">
                      {feedbackRating === 5 ? 'Excellent' : feedbackRating === 4 ? 'Good' : feedbackRating === 3 ? 'Average' : feedbackRating === 2 ? 'Fair' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>

                {/* 2. Feedback Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172033]">
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
                            : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-slate-300 hover:text-[#172033]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Feedback Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172033]">
                    Feedback Message:
                  </label>
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Tell us what you found useful or what could be improved..."
                    rows={4}
                    className="w-full text-xs p-3 rounded-lg border border-[#E2E8F0] focus:border-[#0088FF] focus:ring-1 focus:ring-[#0088FF] outline-hidden resize-none text-[#172033] bg-white transition-colors placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#172033] bg-white hover:bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg transition-colors cursor-pointer"
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

      {/* SUCCESS CONFIRMATION TOAST */}
      <AnimatePresence>
        {(doubtNotification || feedbackNotification) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#172033] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-slate-100">
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
