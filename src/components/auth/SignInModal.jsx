import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, X } from 'lucide-react';

import MVLogo from '../MVLogo';

export default function SignInModal({ onClose, onSwitchToRegister, onOpenForgotPassword, onLoginSuccess }) {
  const [role, setRole] = useState('student'); // 'student' or 'faculty'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess(role, email || (role === 'student' ? 'arunkumar@srpc.ac.in' : 'faculty@university.edu'));
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

        {/* Left Panel: Graphic & Branding */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Circuit Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Top Logo Container */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex items-center justify-center w-48">
              <MVLogo variant="splash" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-blue-200/90 uppercase">
              Materiovigilance Platform
            </span>
          </div>

          {/* Bottom Narrative Content */}
          <div className="relative z-10 space-y-4 my-auto pt-6">
            <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
              Empowering Future Pharmacists
            </h2>
            <p className="text-xs text-blue-200/80 font-normal leading-relaxed">
              Knowledge for a healthier tomorrow. Access interactive clinical cases, training modules, and device safety analytics.
            </p>

            <div className="border-l-2 border-blue-500 pl-3.5 py-1 text-xs text-blue-200 space-y-0.5">
              <p className="font-semibold">Clinical Precision.</p>
              <p className="font-semibold">Patient Safety First.</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Sign In Form */}
        <div className="md:col-span-7 p-4 sm:p-8 md:overflow-y-auto md:max-h-[85vh] flex flex-col justify-center">
          <div className="max-w-md mx-auto space-y-4 w-full">
            {/* Mobile Logo View */}
            <div className="md:hidden flex justify-center mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center justify-center w-48">
                <MVLogo variant="splash" />
              </div>
            </div>

            {/* Role Switcher Pills */}
            <div className="bg-blue-50/80 p-1 rounded-xl flex items-center border border-blue-100/80">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-blue-900/70 hover:text-blue-900'
                }`}
              >
                STUDENT
              </button>
              
              <button
                type="button"
                onClick={() => setRole('faculty')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  role === 'faculty'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-blue-900/70 hover:text-blue-900'
                }`}
              >
                FACULTY/ADMIN
              </button>
            </div>

            {/* Header */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please enter your details to sign in as {role === 'student' ? 'Student' : 'Faculty Member'}.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="john.doe@hospital.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all h-[42px]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={onOpenForgotPassword}
                    className="text-[11px] font-semibold text-blue-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all h-[42px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded text-blue-700 focus:ring-blue-600 cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 cursor-pointer transition-all mt-2"
              >
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Or Continue With Google */}
            <div className="relative text-center my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">or continue with</span>
            </div>

            <button
              onClick={() => onLoginSuccess(role, 'arunkumar@srpc.ac.in')}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            {/* Footer Link */}
            <div className="text-center text-xs text-slate-500 pt-1">
              New here?{' '}
              <button
                onClick={() => onSwitchToRegister(role)}
                className="text-blue-700 font-bold hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
