import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Component Imports
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import SplashScreen from './components/SplashScreen';
import Slide1WhatIs from './components/slides/Slide1WhatIs';
import Slide2WhyMatters from './components/slides/Slide2WhyMatters';
import Slide3WhatCanYouDo from './components/slides/Slide3WhatCanYouDo';
import Slide4HowWillYouLearn from './components/slides/Slide4HowWillYouLearn';
import LearningPortal from './components/portal/LearningPortal';

// Auth Modals Imports
import SignInModal from './components/auth/SignInModal';
import StudentRegisterModal from './components/auth/StudentRegisterModal';
import FacultyRegisterModal from './components/auth/FacultyRegisterModal';
import VerificationModal from './components/auth/VerificationModal';
import ForgotPasswordModal from './components/auth/ForgotPasswordModal';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [portalTab, setPortalTab] = useState(null);

  // Auth State
  const [authModal, setAuthModal] = useState(null); // null | 'sign-in' | 'student-register' | 'faculty-register' | 'verification'
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingRole, setPendingRole] = useState('student');
  const [user, setUser] = useState(null);

  const TOTAL_SLIDES = 4;

  // Keyboard navigation (Left / Right Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showSplash || portalTab || authModal) return;
      if (e.key === 'ArrowRight') {
        if (currentSlide < TOTAL_SLIDES - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setAuthModal('sign-in');
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, showSplash, portalTab, authModal]);

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setAuthModal('sign-in');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleSelectDot = (index) => {
    setCurrentSlide(index);
  };

  const handleSignUpClick = () => {
    setAuthModal('student-register');
  };

  const handleOpenCard = (cardId) => {
    if (!user) {
      setAuthModal('student-register');
    } else {
      setPortalTab(cardId);
    }
  };

  // Auth Flow Handlers - Proceed directly to Learning Portal (Next Page) upon registration
  const handleRegisterSubmit = (email, role = 'student') => {
    setUser({
      name: role === 'faculty' ? 'Dr. Sarah Jenkins' : 'Arun Kumar',
      role: role,
      email: email || (role === 'student' ? 'arunkumar@srpc.ac.in' : 'user@hospital.edu')
    });
    setAuthModal(null);
    setPortalTab('dashboard'); // Launch Student Dashboard!
  };

  const handleVerificationComplete = () => {
    setUser({
      name: pendingRole === 'faculty' ? 'Dr. Sarah Jenkins' : 'Arun Kumar',
      role: pendingRole,
      email: pendingEmail || (pendingRole === 'student' ? 'arunkumar@srpc.ac.in' : 'user@hospital.edu')
    });
    setAuthModal(null);
    setPortalTab('dashboard');
  };

  const handleLoginSuccess = (role, email) => {
    setUser({
      name: role === 'faculty' ? 'Dr. Alex Morgan' : 'Arun Kumar',
      role: role,
      email: email || (role === 'student' ? 'arunkumar@srpc.ac.in' : 'faculty@university.edu')
    });
    setAuthModal(null);
    setPortalTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPortalTab(null);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 font-sans text-slate-900 select-none relative">
      {/* 1. Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* 2. Top Header Bar */}
      <Header 
        user={user}
        onOpenSignIn={() => setAuthModal('sign-in')}
        onOpenRegister={(role) => setAuthModal(role === 'faculty' ? 'faculty-register' : 'student-register')}
        onLogout={handleLogout}
      />

      {/* 3. Main Slide Viewport */}
      <main className="flex-1 w-full overflow-y-auto flex items-center justify-center p-3 sm:p-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && <Slide1WhatIs key="slide-1" />}
          {currentSlide === 1 && <Slide2WhyMatters key="slide-2" />}
          {currentSlide === 2 && <Slide3WhatCanYouDo key="slide-3" />}
          {currentSlide === 3 && (
            <Slide4HowWillYouLearn 
              key="slide-4" 
              onOpenCard={handleOpenCard}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 4. Bottom Control Bar */}
      <BottomBar
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onNext={handleNext}
        onPrev={handlePrev}
        onSelectDot={handleSelectDot}
        onSignUp={handleSignUpClick}
      />

      {/* 5. Interactive Learning Portal Modal */}
      <AnimatePresence mode="wait">
        {portalTab && (
          <LearningPortal
            user={user}
            initialTab={portalTab === 'pre-test' ? 'dashboard' : portalTab}
            onClose={handleLogout}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>

      {/* 6. Auth Modals Flow matching Images 1, 2, 3, 4 */}
      <AnimatePresence mode="wait">
        {authModal === 'sign-in' && (
          <SignInModal
            onClose={() => setAuthModal(null)}
            onSwitchToRegister={(role) => setAuthModal(role === 'faculty' ? 'faculty-register' : 'student-register')}
            onOpenForgotPassword={() => setAuthModal('forgot-password')}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {authModal === 'forgot-password' && (
          <ForgotPasswordModal
            onClose={() => setAuthModal(null)}
            onSwitchToSignIn={() => setAuthModal('sign-in')}
            onResetSuccess={() => setAuthModal('sign-in')}
          />
        )}

        {authModal === 'student-register' && (
          <StudentRegisterModal
            onClose={() => setAuthModal(null)}
            onSwitchToSignIn={() => setAuthModal('sign-in')}
            onSubmitSuccess={(email) => handleRegisterSubmit(email, 'student')}
          />
        )}

        {authModal === 'faculty-register' && (
          <FacultyRegisterModal
            onClose={() => setAuthModal(null)}
            onSwitchToSignIn={() => setAuthModal('sign-in')}
            onSubmitSuccess={(email) => handleRegisterSubmit(email, 'faculty')}
          />
        )}

        {authModal === 'verification' && (
          <VerificationModal
            email={pendingEmail}
            onVerified={handleVerificationComplete}
            onClose={() => setAuthModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
