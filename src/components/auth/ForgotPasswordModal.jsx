import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, KeyRound, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, 
  CheckCircle2, X, ShieldCheck, AlertCircle 
} from 'lucide-react';
import MVLogo from '../MVLogo';

export default function ForgotPasswordModal({ onClose, onSwitchToSignIn, onResetSuccess }) {
  // Step State: 1 = Email Input, 2 = Code Verification, 3 = New Password Input, 4 = Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  
  // Step 2 Code state
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(119); // 01:59 countdown
  const inputRefs = useRef([]);

  // Step 3 Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Timer effect for Step 2
  useEffect(() => {
    let interval = null;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Step 1 Submit (Email)
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setErrorMessage('');
    setStep(2);
    setResendTimer(119);
  };

  // Step 2 Code Handling
  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  const handleVerifyCodeSubmit = (e) => {
    e.preventDefault();
    if (!isCodeComplete) return;
    setErrorMessage('');
    setStep(3);
  };

  // Step 3 Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    // Success transition
    setStep(4);
    setTimeout(() => {
      onResetSuccess(email || 'user@hospital.edu');
    }, 2000);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs"
    >
      <motion.div
        initial={{ scale: 0.96, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-12 md:max-h-[90vh] my-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side Branding Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Logo Container */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex items-center justify-center w-48">
              <MVLogo variant="splash" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-blue-200/90 uppercase">
              Materiovigilance Platform
            </span>
          </div>

          {/* Narrative Info */}
          <div className="relative z-10 space-y-4 my-auto pt-6">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
              Account Recovery & Security
            </h2>
            <p className="text-xs text-blue-200/80 font-normal leading-relaxed">
              We protect your clinical credentials with end-to-end verification. Follow the steps to safely reset your password.
            </p>

            <div className="border-l-2 border-blue-400 pl-3.5 py-1 text-xs text-blue-200 space-y-1">
              <p className="font-semibold">Step {step} of 3</p>
              <p className="text-[11px] text-blue-300/80">
                {step === 1 && 'Enter Registered Email'}
                {step === 2 && 'Enter 6-Digit Code'}
                {step === 3 && 'Re-enter & Confirm Password'}
                {step === 4 && 'Password Reset Complete'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Interactive Form Steps */}
        <div className="md:col-span-7 p-4 sm:p-8 md:overflow-y-auto md:max-h-[85vh] flex flex-col justify-center">
          <div className="max-w-md mx-auto space-y-5 w-full">
            
            {/* Mobile Header Logo */}
            <div className="md:hidden flex justify-center mb-2">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center justify-center w-48">
                <MVLogo variant="splash" />
              </div>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: Enter Email */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                      Forgot Password?
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Enter your registered email address and we'll send you a 6-digit verification code to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          placeholder="user@hospital.edu"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 cursor-pointer transition-all mt-2"
                    >
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <button
                      onClick={onSwitchToSignIn}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-700 font-semibold cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Enter Verification Code */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 text-center sm:text-left"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Change Email</span>
                    </button>

                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                      Enter 6-Digit Code
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      We've sent a verification code to{' '}
                      <span className="font-semibold text-blue-700">{email || 'your email'}</span>.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyCodeSubmit} className="space-y-4">
                    {/* 6-Digit Code Input Box */}
                    <div className="flex items-center justify-center gap-2 py-2">
                      {code.slice(0, 3).map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => inputRefs.current[idx] = el}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleCodeChange(idx, e.target.value)}
                          onKeyDown={e => handleCodeKeyDown(idx, e)}
                          className="w-10 h-12 text-center text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                        />
                      ))}

                      <span className="text-slate-300 font-bold px-0.5">-</span>

                      {code.slice(3, 6).map((digit, idx) => {
                        const actualIdx = idx + 3;
                        return (
                          <input
                            key={actualIdx}
                            ref={el => inputRefs.current[actualIdx] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleCodeChange(actualIdx, e.target.value)}
                            onKeyDown={e => handleCodeKeyDown(actualIdx, e)}
                            className="w-10 h-12 text-center text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                          />
                        );
                      })}
                    </div>

                    <button
                      type="submit"
                      disabled={!isCodeComplete}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isCodeComplete
                          ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Verify Code & Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Resend Timer */}
                  <div className="text-center text-xs text-slate-500 pt-1">
                    Didn't get the code?{' '}
                    <button
                      disabled={resendTimer > 0}
                      onClick={() => setResendTimer(119)}
                      className="text-blue-700 font-bold hover:underline disabled:text-slate-400 cursor-pointer"
                    >
                      Resend {resendTimer > 0 ? `(${formatTimer(resendTimer)})` : ''}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Re-enter & Confirm Password */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                      Create New Password
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Please enter your new password and confirm it below.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                    {/* New Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type={showConfirmPass ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Reset Password Button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 cursor-pointer transition-all mt-2"
                    >
                      <span>Reset Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Success State */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Password Reset Successfully!
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Your password has been updated. Redirecting to the Log In page...
                    </p>
                  </div>

                  <div className="flex justify-center pt-2">
                    <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
