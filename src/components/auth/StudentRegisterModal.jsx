import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Calendar, Building2, Lock, Eye, EyeOff, 
  ArrowRight, X 
} from 'lucide-react';
import MVLogo from '../MVLogo';

export default function StudentRegisterModal({ onClose, onSwitchToSignIn, onSubmitSuccess }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [gender, setGender] = useState('Female');

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: 'jane.doe@hospital.edu',
    dob: '',
    institution: '',
    course: '',
    batch: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess(formData.email || 'student@hospital.edu');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.96, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 15 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-12 md:max-h-[90vh] my-auto relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Dark Teal Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Subtle Circuit Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

          {/* Top Logo Container */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 flex items-center justify-center w-48">
              <MVLogo variant="splash" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-teal-200/90 uppercase">
              Materiovigilance Platform
            </span>
          </div>

          {/* Bottom Narrative Content */}
          <div className="relative z-10 space-y-4 my-auto pt-6">
            <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
              Your journey to safer healthcare starts here.
            </h2>
            <p className="text-xs text-teal-100/80 font-normal leading-relaxed">
              Learn. Practice. Make a difference. Build your knowledge in medical device safety through interactive learning and real-world cases.
            </p>

            <div className="border-l-2 border-teal-400 pl-3.5 py-1 text-xs text-teal-200 space-y-0.5">
              <p className="font-semibold">Knowledge today.</p>
              <p className="font-semibold">Safer tomorrow.</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Student Form */}
        <div className="md:col-span-7 p-4 sm:p-8 md:overflow-y-auto md:max-h-[85vh]">
          <div className="max-w-md mx-auto space-y-4">
            {/* Mobile Logo View */}
            <div className="md:hidden flex justify-center mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center justify-center w-48">
                <MVLogo variant="splash" />
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Create your account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Get started with Materiovigilance Digital Learning
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* 1. Full Name (Full Width) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. Email Address (Full Width) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="jane.doe@hospital.edu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 3. Institution / Organization (Full Width) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institution / Organization Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Enter hospital or university name"
                    value={formData.institution}
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 4. Age & Gender (Equal 50/50 Pair) */}
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="e.g. 24"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 h-[42px] items-center">
                    {['Male', 'Female', 'Other'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          gender === g ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Course/Program & Batch/Year (Equal 50/50 Pair) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course/Program</label>
                  <select
                    value={formData.course}
                    onChange={e => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-700 h-[42px]"
                  >
                    <option value="">Select course</option>
                    <option value="PharmD">PharmD</option>
                    <option value="MBBS">MBBS</option>
                    <option value="Nursing">B.Sc Nursing</option>
                    <option value="Biomedical">Biomedical Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch/Year</label>
                  <select
                    value={formData.batch}
                    onChange={e => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-700 h-[42px]"
                  >
                    <option value="">Select year</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
              </div>

              {/* 6. Password & Confirm Password (Equal 50/50 Pair) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none h-[42px]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none h-[42px]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-700/20 cursor-pointer transition-all mt-4"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative text-center my-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">or</span>
            </div>

            {/* Already have an account link */}
            <div className="text-center text-xs text-slate-500">
              Already have an account?{' '}
              <button
                onClick={onSwitchToSignIn}
                className="text-blue-700 font-bold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
