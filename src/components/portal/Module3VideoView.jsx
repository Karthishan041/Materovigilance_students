import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ChevronRight, Play, Pause, Volume2, VolumeX, 
  Maximize, Minimize, RotateCcw, CheckCircle2, FileText, 
  Clock, Award, BookOpen, ShieldCheck, Download, AlertCircle, 
  HelpCircle, Check, X
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

        {/* Page Title & Module Badge */}
        <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded tracking-wider">
              MODULE 3
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded">
              Unit 3 • In Progress
            </span>
          </div>

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
                  Duration: 25 minutes • Status: <span className="text-[#0088FF] font-semibold">In Progress (05:00 / 25:00)</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2.5 py-1 rounded-md">
                  Active Lecture
                </span>
              </div>
            </div>

            {/* Description using existing Module 3 context */}
            <div className="space-y-3 text-xs text-[#172033] leading-relaxed">
              <h4 className="font-bold text-[#172033] text-xs uppercase tracking-wider">
                Lesson Overview
              </h4>
              <p className="text-[#64748B]">
                This instructional unit guides medical officers, clinical pharmacists, and biomedical staff through standard operating procedures (SOPs) for documenting, investigating, and reporting suspected medical device problems. Learn how to accurately classify adverse incidents, isolate malfunctioning equipment, and file statutory notifications under CDSCO and Materiovigilance Programme of India (MvPI) guidelines.
              </p>

              {/* 3 Core Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#F7F9FC] border border-[#E2E8F0] p-3 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-[#0088FF] font-semibold text-xs">
                    <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                    <span>1. Incident Triage</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Immediate patient stabilization and hardware quarantine.
                  </p>
                </div>

                <div className="bg-[#F7F9FC] border border-[#E2E8F0] p-3 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-[#0088FF] font-semibold text-xs">
                    <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                    <span>2. Data Capture</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Logging serial numbers, software logs, and event timelines.
                  </p>
                </div>

                <div className="bg-[#F7F9FC] border border-[#E2E8F0] p-3 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-[#0088FF] font-semibold text-xs">
                    <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                    <span>3. Statutory SLA</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Reporting mandatory event notifications within prescribed deadlines.
                  </p>
                </div>
              </div>
            </div>

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

              <button
                onClick={() => alert('MDPI Standard Guidance Form Downloaded')}
                className="font-medium text-[#0088FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download MDPI Form (PDF)</span>
              </button>
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

        </div>

      </div>
    </div>
  );
}
