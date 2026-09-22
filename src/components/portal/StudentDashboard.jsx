import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, GraduationCap, BookOpen, Activity, Folder, 
  Award, User, HelpCircle, LogOut, Search, Bell, Play, FileText, 
  ArrowRight, ChevronRight, FileCheck, Layers, X, Menu,
  Upload, Plus, Eye, UserCheck
} from 'lucide-react';
import MVLogo from '../MVLogo';
import StudentProfileView from './StudentProfileView';
import DeviceLibraryView from './DeviceLibraryView';
import MyPerformanceView from './MyPerformanceView';
import ResourcesView from './ResourcesView';
import Module3VideoView from './Module3VideoView';

export default function StudentDashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/course/module-3')) {
      return 'module-3';
    }
    return 'dashboard';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Sync route changes with browser history
  const handleNavigate = (navId) => {
    setActiveNav(navId);
    if (typeof window !== 'undefined') {
      const targetPath = navId === 'module-3' ? '/course/module-3' : navId === 'course' ? '/course' : '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ navId }, '', targetPath);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.includes('/course/module-3')) {
        setActiveNav('module-3');
      } else if (window.location.pathname.includes('/course')) {
        setActiveNav('course');
      } else {
        setActiveNav('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Faculty Uploaded Courses State
  const [facultyCourses, setFacultyCourses] = useState([
    {
      id: 'fc-1',
      title: 'Advanced Syringe Pump Calibration & Pressure Alarm Audit',
      faculty: 'Prof. Dr. V. Mehta',
      department: 'Clinical Engineering',
      category: 'High-Risk Equipment',
      duration: '35 mins',
      uploadedAt: 'Today, 09:30 AM',
      description: 'Comprehensive faculty lecture on identifying occlusion pressure sensor failures and standard reporting SOPs under MDR 2017 rules.',
      level: 'Advanced',
      badge: 'New Course'
    },
    {
      id: 'fc-2',
      title: 'Implantable Cardiac Pacemaker Signal Artifact Telemetry',
      faculty: 'Dr. Sarah Jenkins',
      department: 'Biomedical Vigilance',
      category: 'Cardiology Devices',
      duration: '45 mins',
      uploadedAt: 'Yesterday, 02:15 PM',
      description: 'Interactive signal detection guide analyzing dual-chamber sensing abnormalities and lead displacement events.',
      level: 'Intermediate',
      badge: 'Faculty Special'
    },
    {
      id: 'fc-3',
      title: 'Expiratory Valve Stickiness & Ventilator Alarm Protocol',
      faculty: 'Prof. Rajesh Sharma',
      department: 'Critical Care Devices',
      category: 'Respiratory Care',
      duration: '25 mins',
      uploadedAt: '2 days ago',
      description: 'Clinical case walkthrough on documenting valve failure, patient isolation, and emergency reporting.',
      level: 'Essential',
      badge: 'Verified SOP'
    }
  ]);

  const [selectedCourseView, setSelectedCourseView] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    category: 'High-Risk Equipment',
    faculty: user?.name || 'Dr. Sarah Jenkins',
    department: 'Medical Vigilance',
    duration: '30 mins',
    level: 'Intermediate',
    description: ''
  });

  const handleUploadCourseSubmit = (e) => {
    e.preventDefault();
    if (!newCourseForm.title.trim()) return;
    const newCourse = {
      id: `fc-${Date.now()}`,
      title: newCourseForm.title,
      faculty: newCourseForm.faculty || 'Dr. Sarah Jenkins',
      department: newCourseForm.department || 'Clinical Vigilance',
      category: newCourseForm.category,
      duration: newCourseForm.duration || '30 mins',
      uploadedAt: 'Just Now',
      description: newCourseForm.description || 'Newly published course by faculty for student vigilance learning.',
      level: newCourseForm.level,
      badge: 'Newly Uploaded'
    };
    setFacultyCourses([newCourse, ...facultyCourses]);
    setShowUploadModal(false);
    setNewCourseForm({
      title: '',
      category: 'High-Risk Equipment',
      faculty: user?.name || 'Dr. Sarah Jenkins',
      department: 'Medical Vigilance',
      duration: '30 mins',
      level: 'Intermediate',
      description: ''
    });
    alert('Course successfully published! Students can now view this course on their dashboard.');
  };

  const userName = user?.name || 'S. Sarah Jenkins';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'course', label: 'My Course', icon: GraduationCap },
    { id: 'library', label: 'Device Library', icon: Layers },
    { id: 'performance', label: 'My Performance', icon: Activity },
    { id: 'resources', label: 'Resources', icon: Folder },
    { id: 'certificate', label: 'Certificate', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F9FC] flex flex-col font-sans select-none overflow-hidden text-[#172033]">
      
      {/* 1. TOP HEADER NAVBAR */}
      <header className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-3 flex items-center justify-between z-30 shrink-0">
        {/* Left: Mobile Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#64748B] hover:text-[#172033] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <MVLogo variant="navbar" />
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search learning modules, clinical cases, guidelines, MCQs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/15 outline-none transition-all placeholder:text-[#64748B]"
            />
          </div>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative p-2 text-[#64748B] hover:text-[#0088FF] hover:bg-slate-100 rounded-md transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0088FF] rounded-full ring-2 ring-white" />
          </button>

          <div className="h-5 w-[1px] bg-[#E2E8F0]" />

          {/* Student Profile Avatar & Status */}
          <div 
            onClick={() => setActiveNav('profile')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#0088FF] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {userName.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#172033] leading-none group-hover:text-[#0088FF] transition-colors">
                {userName}
              </p>
              <p className="text-[10px] text-[#64748B] font-medium capitalize mt-0.5">
                PharmD Candidate
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col justify-between p-5 shadow-xl border-r border-[#E2E8F0] lg:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <MVLogo variant="navbar" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#64748B] hover:text-[#172033] rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 mb-2 block">
                    Navigation Menu
                  </span>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id || (item.id === 'course' && activeNav === 'module-3');
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleNavigate(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#0088FF] text-white'
                            : 'text-[#172033] hover:text-[#0088FF] hover:bg-[#F0F7FF]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] pt-4 space-y-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    alert('Support portal: Contact support@materiovigilance.edu');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg font-medium text-xs text-[#64748B] hover:text-[#172033] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#64748B]" />
                  <span>Support</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg font-medium text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. BODY CONTAINER: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDEBAR NAVIGATION - Hover Collapsible (Only icons by default, expands on cursor hover) */}
        <aside 
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`bg-white border-r border-[#E2E8F0] flex flex-col justify-between py-4 shrink-0 hidden lg:flex transition-all duration-300 ease-in-out z-40 ${
            isSidebarHovered ? 'w-60 shadow-lg px-3' : 'w-16 px-2'
          }`}
        >
          {/* Main Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id || (item.id === 'course' && activeNav === 'module-3');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  title={!isSidebarHovered ? item.label : undefined}
                  className={`w-full flex items-center py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap overflow-hidden ${
                    isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
                  } ${
                    isActive
                      ? 'bg-[#0088FF] text-white'
                      : 'text-[#172033] hover:text-[#0088FF] hover:bg-[#F0F7FF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                  {isSidebarHovered && (
                    <span className="truncate transition-opacity duration-200">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Nav Actions */}
          <div className="border-t border-[#E2E8F0] pt-3 space-y-1">
            <button
              onClick={() => alert('Support portal: Contact support@materiovigilance.edu')}
              title={!isSidebarHovered ? 'Support' : undefined}
              className={`w-full flex items-center py-2 rounded-lg font-medium text-xs text-[#64748B] hover:text-[#172033] hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap overflow-hidden ${
                isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0 text-[#64748B]" />
              {isSidebarHovered && <span className="truncate">Support</span>}
            </button>

            <button
              onClick={onLogout}
              title={!isSidebarHovered ? 'Logout' : undefined}
              className={`w-full flex items-center py-2 rounded-lg font-medium text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer whitespace-nowrap overflow-hidden ${
                isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
              }`}
            >
              <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
              {isSidebarHovered && <span className="truncate">Logout</span>}
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F7F9FC]">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB CONTENT: DASHBOARD */}
            {activeNav === 'dashboard' && (
              <>
                {/* 1. WELCOME SECTION */}
                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left Narrative */}
                  <div className="space-y-3 max-w-xl text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight leading-snug">
                      Welcome back, {userName}!
                    </h1>
                    
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      You are currently on track with the Medical Device Adverse Event Reporting framework. Complete your simulation case for Infusion Pump Malfunctions to unlock your intermediate vigilance badge.
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                      <button
                        onClick={() => handleNavigate('course')}
                        className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleNavigate('course')}
                        className="text-[#0088FF] hover:text-[#0070D2] text-xs sm:text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors hover:underline"
                      >
                        <span>Review Syllabus</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Overall Progress Donut Indicator */}
                  <div className="bg-[#F7F9FC] border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4 shrink-0">
                    {/* SVG Donut Ring */}
                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#E2E8F0]"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#0088FF]"
                          strokeDasharray="62, 100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-bold text-[#172033] leading-none">62%</span>
                        <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">DONE</span>
                      </div>
                    </div>

                    {/* Progress Metrics */}
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold tracking-wider text-[#64748B] uppercase block">
                        OVERALL PROGRESS
                      </span>
                      <p className="text-xs font-bold text-[#172033]">
                        5 of 8 modules passed
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] pt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                        <span>18 hrs logged this term</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. CURRENT LEARNING SUMMARY (Consistent Component System) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Card 1: Current Module */}
                  <div 
                    onClick={() => handleNavigate('module-3')}
                    className="bg-white rounded-xl p-5 border border-[#E2E8F0] hover:border-[#0088FF] transition-all flex flex-col justify-between space-y-3 cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">
                          CURRENT MODULE
                        </span>
                        <span className="font-semibold text-[10px] text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
                          80%
                        </span>
                      </div>

                      <h3 className="font-bold text-[#172033] text-sm leading-snug group-hover:text-[#0088FF] transition-colors">
                        Module 3 — MDPI
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Medical Device Problem Reporting
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0088FF] h-full rounded-full w-[80%]" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="font-medium text-[#172033]">Next: Unit 4 Assessment</span>
                        <span className="text-[10px] text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                          25m video
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Completed Modules */}
                  <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">
                          COMPLETED MODULES
                        </span>
                        <span className="font-semibold text-[10px] text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded">
                          5 / 8
                        </span>
                      </div>

                      <h3 className="font-bold text-[#172033] text-sm leading-snug">
                        5 / 8 Modules
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        62.5% Complete
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0088FF] h-full rounded-full w-[62.5%]" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="font-medium text-[#172033]">Core vigilance curriculum</span>
                        <span className="text-[10px] text-[#64748B]">3 remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Cases Completed */}
                  <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">
                          CASES COMPLETED
                        </span>
                        <span className="font-semibold text-[10px] text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded">
                          14 Solved
                        </span>
                      </div>

                      <h3 className="font-bold text-[#172033] text-sm leading-snug">
                        14 Cases
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Clinical device simulation cases
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0088FF] h-full rounded-full w-[88%]" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="font-medium text-[#172033]">Active Mastery</span>
                        <span className="text-[10px] text-[#64748B]">Simulations Logged</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. FACULTY UPLOADED COURSES SECTION */}
                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-4">
                  {/* Section Header */}
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#172033] tracking-tight">
                        Faculty Uploaded Courses
                      </h2>
                      <span className="bg-[#F0F7FF] text-[#0088FF] border border-[#0088FF]/20 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {facultyCourses.length} Published
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Specialized modules and clinical guides published by medical faculty for student learning
                    </p>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {facultyCourses.map((fc) => (
                      <div 
                        key={fc.id}
                        className="bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          {/* Badges Row */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
                              {fc.category}
                            </span>
                            <span className="text-[10px] font-medium text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                              {fc.duration}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h3 className="font-bold text-[#172033] text-sm leading-snug group-hover:text-[#0088FF] transition-colors">
                            {fc.title}
                          </h3>

                          <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                            {fc.description}
                          </p>
                        </div>

                        {/* Faculty Meta & Action */}
                        <div className="border-t border-[#F1F5F9] pt-3 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                            <span className="flex items-center gap-1.5 font-medium text-[#172033] truncate">
                              <UserCheck className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
                              <span className="truncate">{fc.faculty}</span>
                            </span>
                            <span className="text-[#64748B] text-[10px] shrink-0">{fc.uploadedAt}</span>
                          </div>

                          <button
                            onClick={() => setSelectedCourseView(fc)}
                            className="w-full bg-white hover:bg-[#F7F9FC] border border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0088FF] text-[#172033] font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#64748B]" />
                            <span>View Uploaded Course</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. RECENT ACTIVITY (Clean academic log feed) */}
                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-4">
                  
                  {/* Activity Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                    <div>
                      <h2 className="text-base font-bold text-[#172033] tracking-tight">
                        Recent Activity
                      </h2>
                      <p className="text-xs text-[#64748B]">
                        Your latest instructional interactions and simulation submissions
                      </p>
                    </div>

                    <button className="text-xs font-semibold text-[#0088FF] hover:underline self-start sm:self-auto cursor-pointer">
                      View All Log
                    </button>
                  </div>

                  {/* Activity Items Feed */}
                  <div className="divide-y divide-[#F1F5F9]">
                    
                    {/* Activity Item 1: Video Completed */}
                    <div className="flex items-start gap-4 py-3 first:pt-1 last:pb-1 group">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] text-[#64748B] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                        <Play className="w-3.5 h-3.5 text-[#0088FF] fill-current ml-0.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#172033] text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors">
                            Video completed: Skill Domain 2
                          </h4>
                          <span className="text-[10px] text-[#64748B]">25 mins ago</span>
                        </div>

                        <p className="text-xs text-[#64748B] leading-relaxed">
                          Classification of high-risk medical devices (Class C & D under MDR 2017 rules)
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className="text-[10px] font-medium text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded">
                            15 min duration
                          </span>
                          <span className="text-[10px] font-medium text-[#172033] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                            <span>100% Watched</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 2: Case Attempted */}
                    <div className="flex items-start gap-4 py-3 group">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] text-[#64748B] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                        <FileText className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#172033] text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors">
                            Case attempted: Infusion Pump Malfunction
                          </h4>
                          <span className="text-[10px] text-[#64748B]">Yesterday, 16:40</span>
                        </div>

                        <p className="text-xs text-[#64748B] leading-relaxed">
                          Virtual case scenario addressing unexpected over-infusion during fentanyl dosing
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className="text-[10px] font-semibold text-[#0088FF] bg-[#F0F7FF] px-2 py-0.5 rounded border border-[#0088FF]/20">
                            Score: 92/100
                          </span>
                          <span className="text-[10px] text-[#64748B]">
                            Feedback by Prof. V. Mehta
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 3: Certificate Earned */}
                    <div className="flex items-start gap-4 py-3 group">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] text-[#64748B] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                        <Award className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#172033] text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors">
                            Certificate earned: Module 1
                          </h4>
                          <span className="text-[10px] text-[#64748B]">3 days ago</span>
                        </div>

                        <p className="text-xs text-[#64748B] leading-relaxed">
                          Fundamentals of Medical Device Safety and Signal Detection
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className="text-[10px] font-medium text-[#172033] bg-[#F7F9FC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                            Verified Credential
                          </span>
                          <button
                            onClick={() => handleNavigate('certificate')}
                            className="text-[10px] font-semibold text-[#0088FF] hover:underline cursor-pointer"
                          >
                            Download PDF
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 4: Pre-test Diagnostic */}
                    <div className="flex items-start gap-4 py-3 last:pb-1 group">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F9FC] text-[#64748B] flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                        <FileCheck className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#172033] text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors">
                            Pre-test Diagnostic Completed
                          </h4>
                          <span className="text-[10px] text-[#64748B]">Sep 12, 2026</span>
                        </div>

                        <p className="text-xs text-[#64748B] leading-relaxed">
                          Initial benchmark assessment for pharmacovigilance and device surveillance
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className="text-[10px] font-medium text-[#172033] bg-[#F7F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded">
                            Baseline Score: 43%
                          </span>
                          <span className="text-[10px] text-[#64748B] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                            <span>Calibrated curriculum initialized</span>
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </>
            )}

            {/* TAB CONTENT: MY COURSE */}
            {activeNav === 'course' && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#172033]">My Course & Curriculum</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Access video lectures, interactive modules, and practice assessments.</p>
                  </div>
                  <span className="bg-[#F0F7FF] text-[#0088FF] border border-[#0088FF]/20 text-xs font-semibold px-3 py-1 rounded-lg self-start sm:self-auto">
                    5 of 8 Completed
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { id: 1, title: 'Module 1: Fundamentals of Materiovigilance', status: 'Completed', score: '95%', duration: '15 mins' },
                    { id: 2, title: 'Module 2: Signal Detection & Risk Classification', status: 'Completed', score: '88%', duration: '20 mins' },
                    { id: 3, title: 'Module 3: Medical Device Problem Reporting (MDPI)', status: 'In Progress', progress: '80%', duration: '25 mins' },
                    { id: 4, title: 'Module 4: Post-Market Surveillance Workflows', status: 'Locked', duration: '30 mins' },
                  ].map((m) => {
                    const isModule3 = m.id === 3;
                    return (
                      <div 
                        key={m.id} 
                        onClick={() => {
                          if (isModule3) {
                            handleNavigate('module-3');
                          } else if (m.status !== 'Locked') {
                            alert(`Launching ${m.title}`);
                          }
                        }}
                        className={`bg-white p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isModule3 
                            ? 'border-[#0088FF]/30 hover:border-[#0088FF] hover:shadow-2xs cursor-pointer group bg-[#F0F7FF]/20' 
                            : m.status !== 'Locked'
                              ? 'border-[#E2E8F0] hover:border-[#CBD5E1] cursor-pointer'
                              : 'border-[#E2E8F0] opacity-80'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Unit {m.id}</span>
                            {isModule3 && (
                              <span className="text-[9px] font-bold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-1.5 py-0.2 rounded">
                                Interactive Video
                              </span>
                            )}
                          </div>
                          <h3 className={`text-sm font-bold transition-colors ${
                            isModule3 ? 'text-[#172033] group-hover:text-[#0088FF]' : 'text-[#172033]'
                          }`}>
                            {m.title}
                          </h3>
                          <p className="text-xs text-[#64748B]">Duration: {m.duration}</p>
                        </div>

                        <div className="text-right flex items-center gap-3 self-start sm:self-auto">
                          {m.status === 'Completed' && (
                            <span className="inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                              Completed • Score: {m.score}
                            </span>
                          )}
                          {m.status === 'In Progress' && (
                            <span className="inline-block text-xs font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2.5 py-1 rounded-md">
                              Active • {m.progress}
                            </span>
                          )}
                          {m.status === 'Locked' && (
                            <span className="inline-block text-xs font-medium text-[#64748B] bg-[#F7F9FC] border border-[#E2E8F0] px-2.5 py-1 rounded-md">
                              Locked
                            </span>
                          )}

                          {m.status !== 'Locked' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isModule3) {
                                  handleNavigate('module-3');
                                } else {
                                  alert(`Launching ${m.title}`);
                                }
                              }}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                                isModule3
                                  ? 'bg-[#0088FF] hover:bg-[#0070D2] text-white shadow-xs'
                                  : 'bg-white hover:bg-[#F7F9FC] border border-[#E2E8F0] text-[#172033] hover:text-[#0088FF] hover:border-[#0088FF]'
                              }`}
                            >
                              {isModule3 ? 'Start Lecture' : m.status === 'Completed' ? 'Review' : 'Resume'}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: MODULE 3 VIDEO LEARNING PAGE */}
            {activeNav === 'module-3' && (
              <Module3VideoView 
                onBack={() => handleNavigate('course')} 
                onNavigate={handleNavigate} 
              />
            )}

            {/* TAB CONTENT: DEVICE LIBRARY */}
            {activeNav === 'library' && (
              <DeviceLibraryView onNavigate={(nav) => setActiveNav(nav)} />
            )}

            {/* TAB CONTENT: MY PERFORMANCE */}
            {activeNav === 'performance' && (
              <MyPerformanceView user={user} onNavigate={(nav) => setActiveNav(nav)} />
            )}

            {/* TAB CONTENT: RESOURCES */}
            {activeNav === 'resources' && (
              <ResourcesView />
            )}

            {/* TAB CONTENT: CERTIFICATE */}
            {activeNav === 'certificate' && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#172033]">Verified Certificates</h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Download and view your official certificates of competency.</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-lg">
                    1 Certificate Issued
                  </span>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <MVLogo variant="navbar" />
                    <span className="text-xs text-blue-300 font-mono">Credential ID: MV-2026-9812</span>
                  </div>

                  <div className="space-y-1.5 py-1">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Issued To</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{userName}</h3>
                    <p className="text-xs text-slate-300">Module 1: Fundamentals of Materiovigilance and Medical Device Safety Signal Detection.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <span className="text-xs text-slate-400">Issue Date: September 14, 2026</span>
                    <button 
                      onClick={() => alert('Certificate PDF downloaded successfully.')}
                      className="bg-[#0088FF] hover:bg-[#0070D2] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all self-start sm:self-auto"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PROFILE */}
            {activeNav === 'profile' && (
              <StudentProfileView user={user} onNavigate={handleNavigate} />
            )}

          </div>
        </main>

      </div>

      {/* VIEW FACULTY COURSE MODAL */}
      <AnimatePresence>
        {selectedCourseView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-2xl overflow-hidden p-6 space-y-5"
            >
              <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
                    Faculty Uploaded Course
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#172033]">{selectedCourseView.title}</h2>
                  <p className="text-xs text-[#64748B]">
                    Uploaded by {selectedCourseView.faculty} ({selectedCourseView.department}) • {selectedCourseView.uploadedAt}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourseView(null)}
                  className="p-1.5 text-[#64748B] hover:text-[#172033] rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900 text-white rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
                  <Play className="w-12 h-12 text-[#0088FF] fill-current" />
                  <div>
                    <p className="text-sm font-semibold text-white">Interactive Faculty Lecture Video</p>
                    <p className="text-xs text-slate-400 mt-0.5">Duration: {selectedCourseView.duration} • Level: {selectedCourseView.level}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">Course Syllabus & Overview</h4>
                  <p className="text-xs text-[#172033] leading-relaxed bg-[#F7F9FC] p-4 rounded-lg border border-[#E2E8F0]">
                    {selectedCourseView.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 border-t border-[#E2E8F0] pt-4">
                <button
                  onClick={() => setSelectedCourseView(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Enrolled in "${selectedCourseView.title}". You can track your progress on your dashboard.`);
                    setSelectedCourseView(null);
                  }}
                  className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-xs px-5 py-2 rounded-lg cursor-pointer transition-all"
                >
                  Start Course Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FACULTY UPLOAD COURSE MODAL */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-lg overflow-hidden p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <h2 className="text-base font-bold text-[#172033]">Upload New Course (Faculty)</h2>
                  <p className="text-xs text-[#64748B] mt-0.5">Publish a course module directly to the student dashboard</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1.5 text-[#64748B] hover:text-[#172033] rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadCourseSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infusion Pump Occlusion Alarm Troubleshooting"
                    value={newCourseForm.title}
                    onChange={e => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg focus:bg-white focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/15 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Category</label>
                    <select
                      value={newCourseForm.category}
                      onChange={e => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg outline-none focus:border-[#0088FF]"
                    >
                      <option value="High-Risk Equipment">High-Risk Equipment</option>
                      <option value="Cardiology Devices">Cardiology Devices</option>
                      <option value="Respiratory Care">Respiratory Care</option>
                      <option value="Surgical Devices">Surgical Devices</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172033] mb-1">Estimated Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 30 mins"
                      value={newCourseForm.duration}
                      onChange={e => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg outline-none focus:border-[#0088FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Faculty Member Name</label>
                  <input
                    type="text"
                    value={newCourseForm.faculty}
                    onChange={e => setNewCourseForm({ ...newCourseForm, faculty: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg outline-none focus:border-[#0088FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">Course Description & Instructions</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the medical device case study, SOP rules, or instructional objectives..."
                    value={newCourseForm.description}
                    onChange={e => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg outline-none focus:border-[#0088FF] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0088FF] hover:bg-[#0070D2] text-white font-semibold text-xs px-5 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Publish Course to Dashboard</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

