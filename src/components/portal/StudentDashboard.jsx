import React, { useState } from 'react';
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

export default function StudentDashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'course' | 'library' | 'performance' | 'resources' | 'certificate' | 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

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

  const userName = user?.name || 'S. Samuel Jenkins';

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
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 1. TOP HEADER NAVBAR matching Image */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between z-30 shrink-0 shadow-2xs">
        {/* Left: Mobile Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <MVLogo variant="navbar" />
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search learning modules, clinical cases, guidelines, MCQs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-100/80 border border-slate-200/60 rounded-md focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative p-2 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          <div className="h-6 w-[1px] bg-slate-200" />

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
              <p className="text-xs font-bold text-slate-800 leading-none group-hover:text-[#0088FF] transition-colors">
                {userName}
              </p>
              <p className="text-[10px] text-slate-500 font-medium capitalize mt-0.5">
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
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col justify-between p-5 shadow-2xl lg:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <MVLogo variant="navbar" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
                    Navigation Menu
                  </span>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveNav(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#0088FF] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    alert('Support portal: Contact support@materiovigilance.edu');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>Support</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-semibold text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
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
          className={`bg-white border-r border-slate-200/80 flex flex-col justify-between py-4 shrink-0 hidden lg:flex transition-all duration-300 ease-in-out z-40 ${
            isSidebarHovered ? 'w-60 shadow-xl px-3' : 'w-16 px-2'
          }`}
        >
          {/* Main Navigation Links */}
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={!isSidebarHovered ? item.label : undefined}
                  className={`w-full flex items-center py-2.5 rounded-md font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap overflow-hidden ${
                    isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
                  } ${
                    isActive
                      ? 'bg-[#0088FF] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {isSidebarHovered && (
                    <span className="truncate transition-opacity duration-200">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Nav Actions */}
          <div className="border-t border-slate-100 pt-3 space-y-1">
            <button
              onClick={() => alert('Support portal: Contact support@materiovigilance.edu')}
              title={!isSidebarHovered ? 'Support' : undefined}
              className={`w-full flex items-center py-2 rounded-md font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap overflow-hidden ${
                isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0 text-slate-500" />
              {isSidebarHovered && <span className="truncate">Support</span>}
            </button>

            <button
              onClick={onLogout}
              title={!isSidebarHovered ? 'Logout' : undefined}
              className={`w-full flex items-center py-2 rounded-md font-semibold text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap overflow-hidden ${
                isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
              }`}
            >
              <LogOut className="w-4 h-4 shrink-0 text-red-500" />
              {isSidebarHovered && <span className="truncate">Logout</span>}
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/70">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB CONTENT: DASHBOARD */}
            {activeNav === 'dashboard' && (
              <>
                {/* HERO WELCOME BANNER matching Image */}
                <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
                  
                  {/* Left Narrative */}
                  <div className="space-y-3 max-w-xl">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      Welcome back, {userName}!
                    </h1>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      You are currently on track with the Medical Device Adverse Event Reporting framework. Complete your simulation case for Infusion Pump Malfunctions to unlock your intermediate vigilance badge.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        onClick={() => setActiveNav('course')}
                        className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-md flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActiveNav('course')}
                        className="text-[#0088FF] hover:text-[#0070D2] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Review Syllabus</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Overall Progress Donut Chart Box matching Image */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-md p-3.5 flex items-center gap-4 shrink-0 shadow-2xs">
                    {/* SVG Donut Ring */}
                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#0088FF] transition-all duration-1000 stroke-round"
                          strokeDasharray="62, 100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-extrabold text-slate-900 leading-none">62%</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">DONE</span>
                      </div>
                    </div>

                    {/* Progress Metrics */}
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-extrabold tracking-wider text-slate-400 uppercase">
                        OVERALL PROGRESS
                      </span>
                      <p className="text-xs font-extrabold text-slate-800">
                        5 of 8 modules passed
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#0088FF] font-medium pt-0.5">
                        <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                        <span>18 hrs logged this term</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3 OVERVIEW METRIC CARDS ROW - Clean Medical Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Card 1: Current Module */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                        CURRENT MODULE
                      </span>
                      <span className="font-bold text-[10px] text-[#0088FF] bg-[#F0F7FF] border border-blue-100 px-2 py-0.5 rounded">
                        80%
                      </span>
                    </div>

                    <div className="space-y-0.5 mb-3">
                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0088FF] transition-colors">
                        Module 3 – MDPI
                      </h3>
                      <p className="text-[11px] text-slate-500 font-normal truncate">
                        Medical Device Problem Reporting
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden mb-2.5">
                      <div className="bg-[#0088FF] h-full rounded-xs w-[80%]" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-medium text-slate-600 truncate">Next: Unit 4 Assessment</span>
                      <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">12m left</span>
                    </div>
                  </div>

                  {/* Card 2: Completed Modules */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">COMPLETED MODULES</span>
                      <div className="w-7 h-7 rounded bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900">5</h3>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">/ 8 Modules</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal">
                        Core vigilance curriculum
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden mb-2.5">
                      <div className="bg-[#0088FF] h-full rounded-xs w-[62.5%]" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-700">62.5% Complete</span>
                      <span className="font-normal text-slate-500">3 remaining</span>
                    </div>
                  </div>

                  {/* Card 3: Cases Completed */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all duration-200 relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">CASES COMPLETED</span>
                      <div className="w-7 h-7 rounded bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-baseline gap-1.5">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900">14</h3>
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          VCBL Cases
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal">
                        Clinical device simulation cases
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden mb-2.5">
                      <div className="bg-[#0088FF] h-full rounded-xs w-[88%]" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-700">Simulations Logged</span>
                      <span className="font-normal text-slate-500">Active Mastery</span>
                    </div>
                  </div>

                </div>

                {/* FACULTY UPLOADED COURSES SECTION */}
                <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                          Faculty Uploaded Courses
                        </h2>
                        <span className="bg-blue-50 text-blue-700 border border-blue-100/80 text-[10px] font-bold px-2 py-0.5 rounded-xs">
                          {facultyCourses.length} Published
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Specialized modules and clinical guides published by medical faculty for student learning
                      </p>
                    </div>

                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-md flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all self-start sm:self-auto shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Course (Faculty)</span>
                    </button>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {facultyCourses.map((fc) => (
                      <div 
                        key={fc.id}
                        className="bg-slate-50/70 p-4 rounded-md border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          {/* Badges Row */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-xs">
                              {fc.category}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-xs">
                              {fc.duration}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-blue-700 transition-colors">
                            {fc.title}
                          </h3>

                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {fc.description}
                          </p>
                        </div>

                        {/* Faculty Meta & Action */}
                        <div className="border-t border-slate-200/60 pt-2.5 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-600 font-medium">
                            <span className="flex items-center gap-1 font-bold text-slate-800 truncate">
                              <UserCheck className="w-3 h-3 text-blue-600 shrink-0" />
                              <span className="truncate">{fc.faculty}</span>
                            </span>
                            <span className="text-slate-400 shrink-0">{fc.uploadedAt}</span>
                          </div>

                          <button
                            onClick={() => setSelectedCourseView(fc)}
                            className="w-full bg-white hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-md flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Uploaded Course</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RECENT ACTIVITY SECTION matching Image */}
                <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
                  
                  {/* Activity Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        Recent Activity
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Your latest instructional interactions and simulation submissions
                      </p>
                    </div>

                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800 self-start sm:self-auto cursor-pointer">
                      View All Log
                    </button>
                  </div>

                  {/* Activity Items Feed */}
                  <div className="space-y-4">
                    
                    {/* Activity Item 1: Video Completed */}
                    <div className="flex items-start gap-3.5 group">
                      <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors border border-blue-100/60">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">
                            Video completed: Skill Domain 2
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">25 mins ago</span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Classification of high-risk medical devices (Class C & D under MDR 2017 rules)
                        </p>

                        <div className="flex items-center gap-2.5 pt-0.5">
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs">
                            15 min duration
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            <span>100% Watched</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 2: Case Attempted */}
                    <div className="flex items-start gap-3.5 group">
                      <div className="w-8 h-8 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors border border-teal-100/60">
                        <FileText className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">
                            Case attempted: Infusion Pump Malfunction
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">Yesterday, 16:40</span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Virtual case scenario addressing unexpected over-infusion during fentanyl dosing
                        </p>

                        <div className="flex items-center gap-2.5 pt-0.5">
                          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-xs border border-blue-100">
                            Score: 92/100
                          </span>
                          <span className="text-[10px] font-medium text-slate-500">
                            Feedback by Prof. V. Mehta
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 3: Certificate Earned */}
                    <div className="flex items-start gap-3.5 group">
                      <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors border border-amber-100/60">
                        <Award className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">
                            Certificate earned: Module 1
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">3 days ago</span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Fundamentals of Medical Device Safety and Signal Detection
                        </p>

                        <div className="flex items-center gap-2.5 pt-0.5">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-100">
                            Verified Credential
                          </span>
                          <button
                            onClick={() => setActiveNav('certificate')}
                            className="text-[10px] font-bold text-blue-700 hover:underline cursor-pointer"
                          >
                            Download PDF
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 4: Pre-test Diagnostic */}
                    <div className="flex items-start gap-3.5 group">
                      <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors border border-indigo-100/60">
                        <FileCheck className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">
                            Pre-test Diagnostic Completed
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">Sep 12, 2024</span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Initial benchmark assessment for pharmacovigilance and device surveillance
                        </p>

                        <div className="flex items-center gap-2.5 pt-0.5">
                          <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-xs">
                            Baseline Score: 43%
                          </span>
                          <span className="text-[10px] font-bold text-teal-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
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
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">My Course & Curriculum</h2>
                    <p className="text-xs text-slate-500">Access video lectures, interactive modules, and practice assessments.</p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-md">
                    5 of 8 Completed
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { id: 1, title: 'Module 1: Fundamentals of Materiovigilance', status: 'Completed', score: '95%', duration: '15 mins' },
                    { id: 2, title: 'Module 2: Signal Detection & Risk Classification', status: 'Completed', score: '88%', duration: '20 mins' },
                    { id: 3, title: 'Module 3: Medical Device Problem Reporting (MDPI)', status: 'In Progress', progress: '80%', duration: '25 mins' },
                    { id: 4, title: 'Module 4: Post-Market Surveillance Workflows', status: 'Locked', duration: '30 mins' },
                  ].map((m) => (
                    <div key={m.id} className="bg-slate-50 p-4 rounded-md border border-slate-200/80 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Unit {m.id}</span>
                        <h3 className="text-sm font-bold text-slate-800">{m.title}</h3>
                        <p className="text-xs text-slate-500">Duration: {m.duration}</p>
                      </div>

                      <div className="text-right">
                        {m.status === 'Completed' && (
                          <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                            Completed • Score: {m.score}
                          </span>
                        )}
                        {m.status === 'In Progress' && (
                          <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                            Active • {m.progress}
                          </span>
                        )}
                        {m.status === 'Locked' && (
                          <span className="inline-block text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Verified Certificates</h2>
                    <p className="text-xs text-slate-500">Download and view your official certificates of competency.</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold px-3 py-1 rounded-md">
                    1 Certificate Issued
                  </span>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-md p-6 border border-slate-800 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <MVLogo variant="splash" />
                    <span className="text-xs text-blue-300 font-mono">Credential ID: MV-2026-9812</span>
                  </div>

                  <div className="space-y-1 py-1">
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Issued To</p>
                    <h3 className="text-2xl font-extrabold text-white">{userName}</h3>
                    <p className="text-xs text-slate-300">Module 1: Fundamentals of Materiovigilance and Medical Device Safety Signal Detection.</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/80">
                    <span className="text-xs text-slate-400">Issue Date: September 14, 2026</span>
                    <button 
                      onClick={() => alert('Certificate PDF downloaded successfully.')}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-md shadow-xs cursor-pointer transition-all"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PROFILE */}
            {activeNav === 'profile' && (
              <StudentProfileView user={user} />
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden p-6 space-y-5"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-xs">
                    Faculty Uploaded Course
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900">{selectedCourseView.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Uploaded by {selectedCourseView.faculty} ({selectedCourseView.department}) • {selectedCourseView.uploadedAt}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourseView(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900 text-white rounded-md p-8 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
                  <Play className="w-12 h-12 text-blue-400 fill-current" />
                  <div>
                    <p className="text-sm font-bold text-white">Interactive Faculty Lecture Video</p>
                    <p className="text-xs text-slate-400 mt-0.5">Duration: {selectedCourseView.duration} • Level: {selectedCourseView.level}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Course Syllabus & Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-200/80">
                    {selectedCourseView.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  onClick={() => setSelectedCourseView(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Enrolled in "${selectedCourseView.title}". You can track your progress on your dashboard.`);
                    setSelectedCourseView(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-md shadow-2xs cursor-pointer transition-all"
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Upload New Course (Faculty)</h2>
                  <p className="text-xs text-slate-500">Publish a course module directly to the student dashboard</p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadCourseSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infusion Pump Occlusion Alarm Troubleshooting"
                    value={newCourseForm.title}
                    onChange={e => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newCourseForm.category}
                      onChange={e => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md outline-none"
                    >
                      <option value="High-Risk Equipment">High-Risk Equipment</option>
                      <option value="Cardiology Devices">Cardiology Devices</option>
                      <option value="Respiratory Care">Respiratory Care</option>
                      <option value="Surgical Devices">Surgical Devices</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 30 mins"
                      value={newCourseForm.duration}
                      onChange={e => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Faculty Member Name</label>
                  <input
                    type="text"
                    value={newCourseForm.faculty}
                    onChange={e => setNewCourseForm({ ...newCourseForm, faculty: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Description & Instructions</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the medical device case study, SOP rules, or instructional objectives..."
                    value={newCourseForm.description}
                    onChange={e => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-md shadow-2xs cursor-pointer transition-all flex items-center gap-1.5"
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

