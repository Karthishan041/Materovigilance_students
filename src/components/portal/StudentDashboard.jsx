import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, GraduationCap, BookOpen, Activity, Folder, 
  Award, User, HelpCircle, LogOut, Search, Bell, Play, FileText, 
  ArrowRight, ChevronRight, FileCheck, Layers, X, Menu,
  Upload, Plus, Eye, UserCheck, Sun, Moon
} from 'lucide-react';
import MVLogo from '../MVLogo';
import StudentProfileView from './StudentProfileView';
import DeviceLibraryView from './DeviceLibraryView';
import MyPerformanceView from './MyPerformanceView';
import ResourcesView from './ResourcesView';
import Module3VideoView from './Module3VideoView';
import { getProgressColor } from '../../utils/progressColors';

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

  // Dark / Light Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mv-theme') === 'dark';
    }
    return false;
  });

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mv-theme', nextMode ? 'dark' : 'light');
      if (nextMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [isDarkMode]);

  // Notifications State & Outside Click Handler
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Module 3 video checkpoint available',
      time: '10 min ago',
      unread: true
    },
    {
      id: 2,
      title: 'New faculty resource added',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'Module 2 assessment completed',
      time: 'Yesterday',
      unread: false
    },
    {
      id: 4,
      title: 'Simulation Case #402 evaluated',
      time: '2 days ago',
      unread: false
    }
  ]);

  // Overall Progress Interactive Tooltip State
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);
  const desktopProgressRef = useRef(null);
  const mobileProgressRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      const inDesktop = desktopProgressRef.current && desktopProgressRef.current.contains(e.target);
      const inMobile = mobileProgressRef.current && mobileProgressRef.current.contains(e.target);
      if (!inDesktop && !inMobile) {
        setShowProgressTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Review Module Modal State
  const [reviewingModule, setReviewingModule] = useState(null);

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
      description: 'Sensor failure detection and MDR 2017 reporting SOPs.',
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
      description: 'Telemetry guide on sensing abnormalities and lead displacement.',
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
      description: 'Expiratory valve failure isolation and emergency reporting.',
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

  const userName = user?.name || 'Arun Kumar';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'course', label: 'My Course', icon: GraduationCap },
    { id: 'library', label: 'Device Library', icon: Layers },
    { id: 'performance', label: 'My Performance', icon: Activity },
    { id: 'resources', label: 'Resources', icon: Folder },
    { id: 'certificate', label: 'Certificate', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderProgressCircle = (isMobile = false) => (
    <div
      ref={isMobile ? mobileProgressRef : desktopProgressRef}
      className="relative inline-flex flex-col items-center justify-center cursor-pointer select-none group focus:outline-hidden"
      onMouseEnter={() => !isMobile && setShowProgressTooltip(true)}
      onMouseLeave={() => !isMobile && setShowProgressTooltip(false)}
      onClick={(e) => {
        e.stopPropagation();
        setShowProgressTooltip(prev => !prev);
      }}
      aria-label="Overall progress details"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowProgressTooltip(prev => !prev);
        }
      }}
    >
      {/* SVG Donut Ring */}
      <div className="relative w-18 h-18 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-[#E2E8F0]"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            strokeDasharray="62, 100"
            strokeWidth="3.5"
            stroke={getProgressColor(62)}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-base sm:text-sm font-bold text-[#172033] leading-none">62%</span>
          <span className="text-[9px] sm:text-[8px] font-bold text-[#64748B] uppercase tracking-wider mt-0.5">DONE</span>
        </div>
      </div>

      {/* Tooltip / Popover on Hover (Desktop) or Tap (Mobile) */}
      <AnimatePresence>
        {showProgressTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-52 rounded-xl p-3 shadow-xl pointer-events-auto text-left ${
              isMobile 
                ? 'top-full mt-2.5 left-1/2 -translate-x-1/2 bg-[#17213C] border border-[#263554] text-[#F8FAFC]' 
                : 'top-full mt-2.5 -right-2 bg-white border border-[#E2E8F0] text-[#172033]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`text-[9px] font-bold tracking-wider uppercase block ${isMobile ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              OVERALL PROGRESS
            </span>
            <p className={`text-xs font-bold mt-0.5 ${isMobile ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              5 of 8 modules passed
            </p>
            <div className={`flex items-center gap-1.5 text-[11px] pt-1 ${isMobile ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full shrink-0" />
              <span>18 hrs logged this term</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className={`fixed inset-0 z-50 flex flex-col font-sans select-none overflow-hidden student-portal transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#F7F9FC] text-[#172033]'
    }`}>
      
      {/* 1. TOP HEADER NAVBAR */}
      <header className={`${isDarkMode ? 'bg-[#131F37] border-slate-800' : 'bg-white border-[#E2E8F0]'} border-b px-4 sm:px-8 py-3 flex items-center justify-between z-30 shrink-0 transition-colors duration-200`}>
        {/* Left: Mobile Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors cursor-pointer ${
              isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <MVLogo variant="navbar" />
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8 hidden md:block">
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isDarkMode ? 'text-slate-400' : 'text-[#64748B]'}`} />
            <input
              type="text"
              placeholder="Search learning modules, clinical cases, guidelines, MCQs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg outline-none transition-all border focus:ring-2 focus:ring-[#0088FF]/15 ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-[#0088FF]' 
                  : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] placeholder:text-[#64748B] focus:bg-white focus:border-[#0088FF]'
              }`}
            />
          </div>
        </div>

        {/* Right: Theme Toggle, Notifications & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode ? 'text-amber-400 hover:bg-slate-800' : 'text-[#64748B] hover:text-[#0088FF] hover:bg-slate-100'
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Notifications Bell & Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-[#64748B] hover:text-[#0088FF] hover:bg-slate-100'
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0088FF] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className={`absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-xl shadow-lg border p-3 z-50 space-y-2 ${
                isDarkMode ? 'bg-[#131F37] border-slate-800 text-slate-100' : 'bg-white border-[#E2E8F0] text-[#172033]'
              }`}>
                <div className={`flex items-center justify-between border-b pb-2 px-1 ${
                  isDarkMode ? 'border-slate-800' : 'border-[#E2E8F0]'
                }`}>
                  <span className="text-xs font-bold text-[#172033]">Notifications</span>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                    className="text-[10px] text-[#0088FF] hover:underline font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto divide-y divide-[#F1F5F9]">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="py-2 px-1 flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.unread ? 'bg-[#0088FF]' : 'bg-slate-300'}`} />
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <p className="text-xs text-[#172033] font-medium leading-snug truncate">
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-[#64748B] block">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-[1px] bg-[#E2E8F0]" />

          {/* Student Profile Avatar & Status */}
          <div 
            onClick={() => setActiveNav('profile')}
            className="flex items-center gap-2.5 cursor-pointer group"
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
              className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col justify-between p-5 shadow-xl border-r lg:hidden ${
                isDarkMode ? 'bg-[#131F37] border-slate-800' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="space-y-6">
                <div className={`flex items-center justify-between border-b pb-4 ${
                  isDarkMode ? 'border-slate-800' : 'border-[#E2E8F0]'
                }`}>
                  <MVLogo variant="navbar" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-1.5 rounded-md cursor-pointer ${
                      isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 mb-2 block ${
                    isDarkMode ? 'text-slate-400' : 'text-[#64748B]'
                  }`}>
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
                            ? 'bg-[#0088FF] text-white shadow-xs'
                            : isDarkMode
                              ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                              : 'text-[#172033] hover:text-[#0088FF] hover:bg-[#F0F7FF]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-[#64748B]'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`border-t pt-4 space-y-1 ${isDarkMode ? 'border-slate-800' : 'border-[#E2E8F0]'}`}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    alert('Support portal: Contact support@materiovigilance.edu');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
                  }`}
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
          className={`${isDarkMode ? 'bg-[#131F37] border-slate-800' : 'bg-white border-[#E2E8F0]'} border-r flex flex-col justify-between py-4 shrink-0 hidden lg:flex transition-all duration-300 ease-in-out z-40 ${
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
                      : isDarkMode
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'text-[#172033] hover:text-[#0088FF] hover:bg-[#F0F7FF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-[#64748B]'}`} />
                  {isSidebarHovered && (
                    <span className="truncate transition-opacity duration-200">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Nav Actions */}
          <div className={`border-t pt-3 space-y-1 ${isDarkMode ? 'border-slate-800' : 'border-[#E2E8F0]'}`}>
            <button
              onClick={() => alert('Support portal: Contact support@materiovigilance.edu')}
              title={!isSidebarHovered ? 'Support' : undefined}
              className={`w-full flex items-center py-2 rounded-lg font-medium text-xs transition-colors cursor-pointer whitespace-nowrap overflow-hidden ${
                isSidebarHovered ? 'px-3 justify-start gap-3' : 'justify-center px-0'
              } ${
                isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
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
        <main className={`flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-4 sm:p-8 transition-colors duration-200 ${
          isDarkMode ? 'bg-[#0B132B]' : 'bg-[#F7F9FC]'
        }`}>
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB CONTENT: DASHBOARD */}
            {activeNav === 'dashboard' && (
              <>
                {/* 1. WELCOME SECTION */}
                
                {/* DESKTOP WELCOME SECTION (hidden on mobile, flex on desktop) */}
                <div className={`hidden md:flex rounded-xl p-6 border items-center justify-between gap-6 transition-colors duration-200 ${
                  isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  {/* Left Narrative */}
                  <div className="space-y-3 max-w-xl text-left">
                    <h1 className={`text-2xl font-bold tracking-tight leading-snug ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      Welcome back, {userName}!
                    </h1>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      On track with MDR adverse event reporting. Complete your simulation to unlock the intermediate badge.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => handleNavigate('course')}
                        className="bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white font-medium text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleNavigate('course')}
                        className="text-[#0088FF] hover:text-[#0070D2] text-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors hover:underline"
                      >
                        <span>Review Syllabus</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Overall Progress Indicator (clean circle, hover for details) */}
                  <div className={`border rounded-xl p-4 flex items-center justify-center shrink-0 ${
                    isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'
                  }`}>
                    {renderProgressCircle(false)}
                  </div>
                </div>

                {/* MOBILE HERO SECTION (md:hidden) */}
                <div className="md:hidden space-y-3">
                  {/* Narrative & Action Card */}
                  <div className={`rounded-xl p-5 border space-y-4 text-left transition-colors duration-200 ${
                    isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                  }`}>
                    <div className="space-y-1">
                      <h1 className={`text-xl font-bold tracking-tight leading-snug ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Welcome back, {userName}!
                      </h1>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        On track with MDR adverse event reporting. Complete your simulation to unlock the intermediate badge.
                      </p>
                    </div>

                    {/* ROW 1: Continue Learning and Review Syllabus on the SAME HORIZONTAL LINE */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        onClick={() => handleNavigate('course')}
                        className="flex-1 bg-[#0088FF] hover:bg-[#0070D2] active:scale-98 text-white font-medium text-xs px-3 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>

                      <button
                        onClick={() => handleNavigate('course')}
                        className="flex-1 text-[#0088FF] hover:text-[#0070D2] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors hover:underline whitespace-nowrap py-2.5"
                      >
                        <span>Review Syllabus</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>

                  {/* ROW 2: Circular overall progress percentage as a SEPARATE visual element below the action row */}
                  <div className={`rounded-xl p-4 border flex flex-col items-center justify-center transition-colors duration-200 ${
                    isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                  }`}>
                    {renderProgressCircle(true)}
                  </div>
                </div>

                {/* 2. CURRENT LEARNING SUMMARY (Consistent Component System) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Card 1: Current Module */}
                  <div 
                    onClick={() => handleNavigate('module-3')}
                    className={`rounded-xl p-5 border hover:border-[#0088FF] transition-all flex flex-col justify-between space-y-3 cursor-pointer group ${
                      isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className={`font-bold uppercase tracking-wider text-[10px] ${
                          isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        }`}>
                          CURRENT MODULE
                        </span>
                        <span className={`font-semibold text-[10px] px-2 py-0.5 rounded ${
                          isDarkMode 
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' 
                            : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        }`}>
                          80%
                        </span>
                      </div>

                      <h3 className={`font-bold text-sm leading-snug group-hover:text-[#0088FF] transition-colors ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Module 3 — MDPI
                      </h3>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        Medical Device Problem Reporting
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isDarkMode ? 'bg-slate-800' : 'bg-[#F1F5F9]'
                      }`}>
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: '80%', backgroundColor: getProgressColor(80) }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className={`font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Next: Unit 4 Assessment</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          isDarkMode ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                        }`}>
                          25m video
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Completed Modules */}
                  <div className={`rounded-xl p-5 border transition-all flex flex-col justify-between space-y-3 ${
                    isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className={`font-bold uppercase tracking-wider text-[10px] ${
                          isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        }`}>
                          COMPLETED MODULES
                        </span>
                        <span className={`font-semibold text-[10px] px-2 py-0.5 rounded ${
                          isDarkMode 
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' 
                            : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        }`}>
                          5 / 8
                        </span>
                      </div>

                      <h3 className={`font-bold text-sm leading-snug ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        5 / 8 Modules
                      </h3>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        62.5% Complete
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isDarkMode ? 'bg-slate-800' : 'bg-[#F1F5F9]'
                      }`}>
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: '62.5%', backgroundColor: getProgressColor(62.5) }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className={`font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Core vigilance curriculum</span>
                        <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>3 remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Cases Completed */}
                  <div className={`rounded-xl p-5 border transition-all flex flex-col justify-between space-y-3 ${
                    isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className={`font-bold uppercase tracking-wider text-[10px] ${
                          isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        }`}>
                          CASES COMPLETED
                        </span>
                        <span className={`font-semibold text-[10px] px-2 py-0.5 rounded ${
                          isDarkMode 
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' 
                            : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        }`}>
                          14 Solved
                        </span>
                      </div>

                      <h3 className={`font-bold text-sm leading-snug ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        14 Cases
                      </h3>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        Clinical device simulation cases
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                        isDarkMode ? 'bg-slate-800' : 'bg-[#F1F5F9]'
                      }`}>
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: '88%', backgroundColor: getProgressColor(88) }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className={`font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>Active Mastery</span>
                        <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Simulations Logged</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. FACULTY UPLOADED COURSES SECTION */}
                <div className={`rounded-xl p-6 border space-y-4 ${
                  isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  {/* Section Header */}
                  <div className={`border-b pb-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
                    <div className="flex items-center gap-2">
                      <h2 className={`text-base font-bold tracking-tight ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Faculty Uploaded Courses
                      </h2>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        isDarkMode
                          ? 'bg-[#202D4E] text-[#0088FF] border-[#0088FF]/30'
                          : 'bg-[#F0F7FF] text-[#0088FF] border-[#0088FF]/20'
                      }`}>
                        {facultyCourses.length} Published
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      Specialized modules and clinical guides published by medical faculty for student learning
                    </p>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {facultyCourses.map((fc) => (
                      <div 
                        key={fc.id}
                        className={`p-5 rounded-xl border transition-all flex flex-col justify-between space-y-3 group ${
                          isDarkMode
                            ? 'bg-[#202D4E] border-[#263554] hover:border-[#0088FF]/50'
                            : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                        }`}
                      >
                        <div className="space-y-2">
                          {/* Badges Row */}
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              isDarkMode
                                ? 'text-[#0088FF] bg-[#17213C] border-[#0088FF]/30'
                                : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                            }`}>
                              {fc.category}
                            </span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                              isDarkMode
                                ? 'text-[#94A3B8] bg-[#17213C] border-[#263554]'
                                : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                            }`}>
                              {fc.duration}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h3 className={`font-bold text-sm leading-snug group-hover:text-[#0088FF] transition-colors ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            {fc.title}
                          </h3>

                          <p className={`text-xs line-clamp-2 leading-relaxed ${
                            isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                          }`}>
                            {fc.description}
                          </p>
                        </div>

                        {/* Faculty Meta & Action */}
                        <div className={`border-t pt-3 space-y-2.5 ${isDarkMode ? 'border-[#263554]' : 'border-[#F1F5F9]'}`}>
                          <div className={`flex items-center justify-between text-[11px] ${
                            isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                          }`}>
                            <span className={`flex items-center gap-1.5 font-medium truncate ${
                              isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                            }`}>
                              <UserCheck className="w-3.5 h-3.5 text-[#0088FF] shrink-0" />
                              <span className="truncate">{fc.faculty}</span>
                            </span>
                            <span className={`text-[10px] shrink-0 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                              {fc.uploadedAt}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedCourseView(fc)}
                            className={`w-full border font-medium text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                              isDarkMode
                                ? 'bg-[#17213C] hover:bg-[#17213C]/80 border-[#263554] text-[#F8FAFC]'
                                : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] hover:border-[#0088FF] hover:text-[#0088FF] text-[#172033]'
                            }`}
                          >
                            <Eye className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
                            <span>View Uploaded Course</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. RECENT ACTIVITY (Clean academic log feed) */}
                <div className={`rounded-xl p-6 border space-y-4 ${
                  isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
                }`}>
                  
                  {/* Activity Header */}
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
                    isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
                  }`}>
                    <div>
                      <h2 className={`text-base font-bold tracking-tight ${
                        isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                      }`}>
                        Recent Activity
                      </h2>
                      <p className={`text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                        Your latest instructional interactions and simulation submissions
                      </p>
                    </div>

                    <button className="text-xs font-semibold text-[#0088FF] hover:underline self-start sm:self-auto cursor-pointer">
                      View All Log
                    </button>
                  </div>

                  {/* Desktop Activity Items Feed (hidden on mobile, visible on desktop) */}
                  <div className={`hidden md:block divide-y ${
                    isDarkMode ? 'divide-[#263554]' : 'divide-[#F1F5F9]'
                  }`}>
                    
                    {/* Activity Item 1: Video Completed */}
                    <div className="flex items-start gap-4 py-3 first:pt-1 last:pb-1 group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <Play className="w-3.5 h-3.5 text-[#0088FF] fill-current ml-0.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Video completed: Skill Domain 2
                          </h4>
                          <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>25 mins ago</span>
                        </div>

                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Classification of high-risk medical devices (Class C & D under MDR 2017 rules)
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}>
                            15 min duration
                          </span>
                          <span className={`text-[10px] font-medium flex items-center gap-1.5 ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                            <span>100% Watched</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 2: Case Attempted */}
                    <div className="flex items-start gap-4 py-3 group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <FileText className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Case attempted: Infusion Pump Malfunction
                          </h4>
                          <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Yesterday, 16:40</span>
                        </div>

                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Virtual case scenario addressing unexpected over-infusion during fentanyl dosing
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#0088FF] bg-[#202D4E] border-[#0088FF]/30' : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                          }`}>
                            Score: 92/100
                          </span>
                          <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                            Feedback by Prof. V. Mehta
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 3: Certificate Earned */}
                    <div className="flex items-start gap-4 py-3 group">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <Award className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Certificate earned: Module 1
                          </h4>
                          <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>3 days ago</span>
                        </div>

                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Fundamentals of Medical Device Safety and Signal Detection
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#F8FAFC] bg-[#202D4E] border-[#263554]' : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}>
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
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <FileCheck className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold text-xs sm:text-sm group-hover:text-[#0088FF] transition-colors ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Pre-test Diagnostic Completed
                          </h4>
                          <span className={`text-[10px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Sep 12, 2026</span>
                        </div>

                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Initial benchmark assessment for pharmacovigilance and device surveillance
                        </p>

                        <div className="flex items-center gap-3 pt-0.5">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#F8FAFC] bg-[#202D4E] border-[#263554]' : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}>
                            Baseline Score: 43%
                          </span>
                          <span className={`text-[10px] flex items-center gap-1.5 ${
                            isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                          }`}>
                            <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
                            <span>Calibrated curriculum initialized</span>
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Mobile Activity Timeline Feed (compact, non-clumpy feed) */}
                  <div className={`md:hidden divide-y ${
                    isDarkMode ? 'divide-[#263554]/40' : 'divide-[#E2E8F0]'
                  }`}>
                    
                    {/* Activity Item 1: Video Completed */}
                    <div className="py-3 flex items-start gap-3 first:pt-1 last:pb-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                        isDarkMode ? 'bg-[#202D4E] text-[#0088FF] border-[#263554]' : 'bg-[#F0F7FF] text-[#0088FF] border-[#0088FF]/20'
                      }`}>
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`font-semibold text-xs leading-snug ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Video completed: Skill Domain 2
                          </h4>
                          <span className={`text-[10px] shrink-0 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>25 mins ago</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Classification of high-risk medical devices
                        </p>
                        <div className={`flex items-center gap-2 text-[10px] pt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          <span className="text-[#0088FF] font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full inline-block" />
                            100% Watched
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 2: Case Attempted */}
                    <div className="py-3 flex items-start gap-3 last:pb-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`font-semibold text-xs leading-snug ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Case attempted: Infusion Pump Malfunction
                          </h4>
                          <span className={`text-[10px] shrink-0 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Yesterday, 16:40</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Virtual case scenario addressing unexpected over-infusion
                        </p>
                        <div className={`flex items-center gap-2 text-[10px] pt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          <span className={`font-semibold px-1.5 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#0088FF] bg-[#202D4E] border-[#0088FF]/30' : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                          }`}>
                            Score: 92/100
                          </span>
                          <span>•</span>
                          <span>Prof. V. Mehta</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 3: Certificate Earned */}
                    <div className="py-3 flex items-start gap-3 last:pb-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`font-semibold text-xs leading-snug ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Certificate earned: Module 1
                          </h4>
                          <span className={`text-[10px] shrink-0 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>3 days ago</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Fundamentals of Medical Device Safety
                        </p>
                        <div className={`flex items-center gap-2 text-[10px] pt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          <span className={`font-medium px-1.5 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#F8FAFC] bg-[#202D4E] border-[#263554]' : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}>
                            Verified Credential
                          </span>
                          <button
                            onClick={() => handleNavigate('certificate')}
                            className="text-[#0088FF] hover:underline cursor-pointer ml-auto text-[10px]"
                          >
                            PDF
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 4: Pre-test Diagnostic */}
                    <div className="py-3 flex items-start gap-3 last:pb-1">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                        isDarkMode ? 'bg-[#202D4E] text-[#94A3B8] border-[#263554]' : 'bg-[#F7F9FC] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <FileCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`font-semibold text-xs leading-snug ${
                            isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                          }`}>
                            Pre-test Diagnostic Completed
                          </h4>
                          <span className={`text-[10px] shrink-0 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Sep 12</span>
                        </div>
                        <p className={`text-[11px] leading-tight ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          Initial benchmark assessment for pharmacovigilance
                        </p>
                        <div className={`flex items-center gap-2 text-[10px] pt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          <span className={`font-medium px-1.5 py-0.5 rounded border ${
                            isDarkMode ? 'text-[#F8FAFC] bg-[#202D4E] border-[#263554]' : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
                          }`}>
                            Score: 43%
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
              <div className={`rounded-xl p-5 sm:p-6 border space-y-4 ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}>
                <div className={`border-b pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
                }`}>
                  <div>
                    <h2 className={`text-base sm:text-lg font-bold ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      My Course & Curriculum
                    </h2>
                    <p className={`text-xs mt-0.5 ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>
                      Access video lectures, interactive modules, and practice assessments.
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-lg self-start sm:self-auto border ${
                    isDarkMode
                      ? 'bg-[#202D4E] text-[#0088FF] border-[#0088FF]/30'
                      : 'bg-[#F0F7FF] text-[#0088FF] border-[#0088FF]/20'
                  }`}>
                    5 of 8 Completed
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {[
                    { id: 1, title: 'Module 1: Fundamentals of Materiovigilance', status: 'Completed', score: '95%', duration: '15 mins', percent: 95 },
                    { id: 2, title: 'Module 2: Signal Detection & Risk Classification', status: 'Completed', score: '88%', duration: '20 mins', percent: 88 },
                    { id: 3, title: 'Module 3: Medical Device Problem Reporting (MDPI)', status: 'In Progress', progress: '80%', duration: '25 mins', percent: 80 },
                    { id: 4, title: 'Module 4: Post-Market Surveillance Workflows', status: 'Locked', duration: '30 mins', percent: 0 },
                  ].map((m) => {
                    const isModule3 = m.id === 3;
                    return (
                      <div 
                        key={m.id} 
                        onClick={() => {
                          if (isModule3) {
                            handleNavigate('module-3');
                          } else if (m.status === 'Completed') {
                            setReviewingModule(m);
                          } else if (m.status !== 'Locked') {
                            alert(`Launching ${m.title}`);
                          }
                        }}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isModule3 
                            ? (isDarkMode 
                                ? 'border-[#0088FF]/40 hover:border-[#0088FF] hover:shadow-2xs cursor-pointer group bg-[#202D4E]/80' 
                                : 'border-[#0088FF]/30 hover:border-[#0088FF] hover:shadow-2xs cursor-pointer group bg-[#F0F7FF]/20')
                            : m.status !== 'Locked'
                              ? (isDarkMode
                                  ? 'border-[#263554] bg-[#202D4E] hover:border-[#0088FF]/40 cursor-pointer'
                                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] cursor-pointer')
                              : (isDarkMode
                                  ? 'border-[#263554] bg-[#17213C] opacity-75'
                                  : 'border-[#E2E8F0] bg-white opacity-80')
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                              isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                            }`}>
                              Unit {m.id}
                            </span>
                            {isModule3 && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                isDarkMode
                                  ? 'text-[#0088FF] bg-[#17213C] border-[#0088FF]/30'
                                  : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                              }`}>
                                Interactive Video
                              </span>
                            )}
                          </div>
                          <h3 className={`text-sm font-bold transition-colors ${
                            isModule3 
                              ? (isDarkMode ? 'text-[#F8FAFC] group-hover:text-[#0088FF]' : 'text-[#172033] group-hover:text-[#0088FF]') 
                              : (isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]')
                          }`}>
                            {m.title}
                          </h3>
                          <p className={`text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                            Duration: {m.duration}
                          </p>
                          
                          {/* Progress bar adhering to 0-29% Red, 30-89% Green, 90-100% Blue */}
                          {m.status !== 'Locked' && (
                            <div className={`w-full max-w-xs rounded-full h-1 overflow-hidden mt-1 ${
                              isDarkMode ? 'bg-[#17213C]' : 'bg-[#F1F5F9]'
                            }`}>
                              <div 
                                className="h-full rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${m.percent}%`,
                                  backgroundColor: getProgressColor(m.percent)
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="text-right flex items-center gap-3 self-start sm:self-auto shrink-0">
                          {m.status === 'Completed' && (
                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                              isDarkMode 
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' 
                                : 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                            }`}>
                              Completed • Score: {m.score}
                            </span>
                          )}
                          {m.status === 'In Progress' && (
                            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md border ${
                              isDarkMode
                                ? 'text-[#0088FF] bg-[#17213C] border-[#0088FF]/30'
                                : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                            }`}>
                              Active • {m.progress}
                            </span>
                          )}
                          {m.status === 'Locked' && (
                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md border ${
                              isDarkMode
                                ? 'text-[#94A3B8] bg-[#17213C] border-[#263554]'
                                : 'text-[#64748B] bg-[#F7F9FC] border-[#E2E8F0]'
                            }`}>
                              Locked
                            </span>
                          )}

                          {m.status !== 'Locked' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isModule3) {
                                  handleNavigate('module-3');
                                } else if (m.status === 'Completed') {
                                  setReviewingModule(m);
                                } else {
                                  alert(`Launching ${m.title}`);
                                }
                              }}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                                isModule3
                                  ? 'bg-[#0088FF] hover:bg-[#0070D2] text-white shadow-xs'
                                  : isDarkMode
                                  ? 'bg-[#17213C] hover:bg-[#17213C]/80 border border-[#263554] text-[#F8FAFC] hover:text-[#0088FF] hover:border-[#0088FF]'
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
                isDarkMode={isDarkMode}
                onBack={() => handleNavigate('course')} 
                onNavigate={handleNavigate} 
              />
            )}

            {/* TAB CONTENT: DEVICE LIBRARY */}
            {activeNav === 'library' && (
              <DeviceLibraryView isDarkMode={isDarkMode} onNavigate={(nav) => setActiveNav(nav)} />
            )}

            {/* TAB CONTENT: MY PERFORMANCE */}
            {activeNav === 'performance' && (
              <MyPerformanceView isDarkMode={isDarkMode} user={user} onNavigate={(nav) => setActiveNav(nav)} />
            )}

            {/* TAB CONTENT: RESOURCES */}
            {activeNav === 'resources' && (
              <ResourcesView isDarkMode={isDarkMode} />
            )}

            {/* TAB CONTENT: CERTIFICATE */}
            {activeNav === 'certificate' && (
              <div className={`rounded-xl p-5 sm:p-6 border space-y-4 ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}>
                <div className={`border-b pb-3 flex items-center justify-between ${
                  isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
                }`}>
                  <div>
                    <h2 className={`text-base sm:text-lg font-bold ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>Verified Certificates</h2>
                    <p className={`text-xs mt-0.5 ${
                      isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}>Download and view your official certificates of competency.</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                    isDarkMode 
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' 
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
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
              <StudentProfileView isDarkMode={isDarkMode} user={user} onNavigate={handleNavigate} />
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
              className={`rounded-xl border shadow-xl w-full max-w-2xl overflow-hidden p-6 space-y-5 ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className={`flex items-start justify-between border-b pb-3 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <div className="space-y-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    isDarkMode ? 'text-[#0088FF] bg-[#202D4E] border-[#0088FF]/30' : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
                  }`}>
                    Faculty Uploaded Course
                  </span>
                  <h2 className={`text-base sm:text-lg font-bold ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    {selectedCourseView.title}
                  </h2>
                  <p className={`text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                    Uploaded by {selectedCourseView.faculty} ({selectedCourseView.department}) • {selectedCourseView.uploadedAt}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourseView(null)}
                  className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-[#202D4E]' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
                  }`}
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
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Course Syllabus & Overview
                  </h4>
                  <p className={`text-xs leading-relaxed p-4 rounded-lg border ${
                    isDarkMode ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
                  }`}>
                    {selectedCourseView.description}
                  </p>
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2.5 border-t pt-4 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <button
                  onClick={() => setSelectedCourseView(null)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                    isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#202D4E]' : 'text-[#64748B] hover:bg-slate-100'
                  }`}
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
              className={`rounded-xl border shadow-xl w-full max-w-lg overflow-hidden p-6 space-y-4 ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className={`flex items-center justify-between border-b pb-3 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <div>
                  <h2 className={`text-base font-bold ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Upload New Course (Faculty)
                  </h2>
                  <p className={`text-xs mt-0.5 ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}>
                    Publish a course module directly to the student dashboard
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-[#202D4E]' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadCourseSubmit} className="space-y-3.5">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Course Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infusion Pump Occlusion Alarm Troubleshooting"
                    value={newCourseForm.title}
                    onChange={e => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                      isDarkMode 
                        ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]' 
                        : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:bg-white focus:border-[#0088FF]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      Category
                    </label>
                    <select
                      value={newCourseForm.category}
                      onChange={e => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                      className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                        isDarkMode 
                          ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] focus:border-[#0088FF]' 
                          : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] focus:border-[#0088FF]'
                      }`}
                    >
                      <option value="High-Risk Equipment">High-Risk Equipment</option>
                      <option value="Cardiology Devices">Cardiology Devices</option>
                      <option value="Respiratory Care">Respiratory Care</option>
                      <option value="Surgical Devices">Surgical Devices</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${
                      isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                    }`}>
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30 mins"
                      value={newCourseForm.duration}
                      onChange={e => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                      className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                        isDarkMode 
                          ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]' 
                          : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:border-[#0088FF]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Faculty Member Name
                  </label>
                  <input
                    type="text"
                    value={newCourseForm.faculty}
                    onChange={e => setNewCourseForm({ ...newCourseForm, faculty: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border outline-none ${
                      isDarkMode 
                        ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]' 
                        : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:border-[#0088FF]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    Course Description & Instructions
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the medical device case study, SOP rules, or instructional objectives..."
                    value={newCourseForm.description}
                    onChange={e => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border outline-none resize-none ${
                      isDarkMode 
                        ? 'bg-[#202D4E] border-[#263554] text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#0088FF]' 
                        : 'bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] placeholder:text-slate-400 focus:border-[#0088FF]'
                    }`}
                  />
                </div>

                <div className={`flex items-center justify-end gap-2 pt-2 border-t ${
                  isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
                }`}>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                      isDarkMode ? 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#202D4E]' : 'text-[#64748B] hover:bg-slate-100'
                    }`}
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

      {/* REVIEW COMPLETED MODULE MODAL */}
      <AnimatePresence>
        {reviewingModule && (
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
              className={`rounded-xl max-w-lg w-full border shadow-xl p-5 sm:p-6 space-y-4 ${
                isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              {/* Header */}
              <div className={`flex items-start justify-between border-b pb-3 ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}>
                    Unit {reviewingModule.id} Review Summary
                  </span>
                  <h3 className={`text-base font-bold ${
                    isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                  }`}>
                    {reviewingModule.title}
                  </h3>
                </div>
                <button
                  onClick={() => setReviewingModule(null)}
                  className={`p-1 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-[#202D4E]' : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100'
                  }`}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Completion & Mastery Stats */}
              <div className={`flex items-center justify-between p-3.5 rounded-lg border ${
                isDarkMode ? 'bg-[#202D4E] border-[#263554]' : 'bg-[#F7F9FC] border-[#E2E8F0]'
              }`}>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}>
                    Completion Status
                  </span>
                  <span className={`text-xs font-bold ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>
                    Completed
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}>
                    Assessment Score
                  </span>
                  <span className="text-xs font-bold text-[#0088FF]">
                    {reviewingModule.score || '95%'}
                  </span>
                </div>
              </div>

              {/* What you learned */}
              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  What you learned:
                </h4>
                <ul className={`text-xs space-y-1.5 list-disc pl-4 leading-relaxed ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}>
                  {reviewingModule.id === 1 ? (
                    <>
                      <li>Fundamentals of materiovigilance and statutory guidelines</li>
                      <li>Medical device safety principles and risk classification</li>
                      <li>Adverse event reporting thresholds under MDR 2017</li>
                    </>
                  ) : (
                    <>
                      <li>Signal detection algorithms and clinical event triage</li>
                      <li>Device risk classification matrix (Class A to D)</li>
                      <li>Root cause analysis (RCA) and statutory compliance</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Key topics */}
              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'
                }`}>
                  Key topics:
                </h4>
                <ul className={`text-xs space-y-1.5 list-disc pl-4 leading-relaxed ${
                  isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}>
                  {reviewingModule.id === 1 ? (
                    <>
                      <li>Device-related incidents & definitions</li>
                      <li>Reporting workflow and timeline SOPs</li>
                      <li>Patient safety & preventive vigilance</li>
                    </>
                  ) : (
                    <>
                      <li>Adverse incident signal detection</li>
                      <li>Risk prioritization under CDSCO rules</li>
                      <li>MvPI statutory documentation filing</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Action Bar */}
              <div className={`border-t pt-3 flex items-center justify-between ${
                isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'
              }`}>
                <span className={`text-[11px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  Duration: {reviewingModule.duration}
                </span>
                <button
                  onClick={() => setReviewingModule(null)}
                  className={`border font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                    isDarkMode
                      ? 'bg-[#202D4E] hover:bg-[#202D4E]/80 border-[#263554] text-[#F8FAFC] hover:text-[#0088FF] hover:border-[#0088FF]'
                      : 'bg-white hover:bg-[#F7F9FC] border-[#E2E8F0] text-[#172033] hover:text-[#0088FF] hover:border-[#0088FF]'
                  }`}
                >
                  Close Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

