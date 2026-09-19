import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Hash, Building2, Calendar, Lock, Eye, EyeOff, 
  ArrowRight, X, Info
} from 'lucide-react';
import MVLogo from '../MVLogo';

export default function FacultyRegisterModal({ onClose, onSwitchToSignIn, onSubmitSuccess }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [gender, setGender] = useState('Male');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    staffId: '',
    designation: '',
    department: '',
    institution: '',
    dob: '',
    password: '',
    confirmPassword: '',
    isAuthorized: false,
    agreeTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess(formData.email || 'faculty@university.edu');
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

        {/* Left Dark Blue Side Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Subtle Circuit Grid Pattern Overlay */}
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

          {/* Bottom Left Narrative Text */}
          <div className="relative z-10 space-y-4 my-auto pt-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Join as Faculty
            </h2>
            <p className="text-xs text-blue-200 font-medium tracking-wide">
              Author courses • Publish cases • Manage research
            </p>

            <div className="border-l-2 border-blue-500 pl-3.5 py-1 text-xs text-slate-300 space-y-1">
              <p>Peer-reviewed clinical rigor</p>
              <p>Institutional data management</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Registration Form */}
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
                Faculty Registration
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Complete your profile to request institutional credentials and authorization.
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
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 2. Institutional Email Address (Full Width) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="sarah.jenkins@university.edu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 3. Institution / University Name (Full Width) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institution / University Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. University Medical Center"
                    value={formData.institution}
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 4. Staff ID & Gender (Equal 50/50 Pair) */}
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Staff ID</label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. STF-8940"
                      value={formData.staffId}
                      onChange={e => setFormData({ ...formData, staffId: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all h-[42px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 h-[42px] items-center">
                    <button
                      type="button"
                      onClick={() => setGender('Male')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gender === 'Male' ? 'bg-blue-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Female')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        gender === 'Female' ? 'bg-blue-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Designation & Department (Equal 50/50 Pair) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                  <select
                    value={formData.designation}
                    onChange={e => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-700 h-[42px]"
                  >
                    <option value="">Select Designation</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Head of Clinical Safety">Head of Clinical Safety</option>
                    <option value="Medical Officer">Medical Officer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none text-slate-700 h-[42px]"
                  >
                    <option value="">Select Department</option>
                    <option value="Pharmacology">Pharmacology</option>
                    <option value="Clinical Pharmacy">Clinical Pharmacy</option>
                    <option value="Biomedical Engineering">Biomedical Engineering</option>
                    <option value="ICU Surveillance">ICU Surveillance</option>
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

              {/* Checkboxes */}
              <div className="space-y-1.5 pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.isAuthorized}
                    onChange={e => setFormData({ ...formData, isAuthorized: e.target.checked })}
                    className="mt-0.5 rounded text-blue-800 focus:ring-blue-600"
                  />
                  <span>I confirm I am an authorized staff member of this institution</span>
                </label>

                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-0.5 rounded text-blue-800 focus:ring-blue-600"
                  />
                  <span>I agree to the <a href="#" className="text-blue-700 underline">Terms of Service</a> and <a href="#" className="text-blue-700 underline">Privacy Policy</a></span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 cursor-pointer transition-all mt-2"
              >
                <span>Request Faculty Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Info Notice */}
            <div className="bg-blue-50/80 border border-blue-100 p-2.5 rounded-xl text-[11px] text-blue-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Your request will be reviewed by a Program Admin before access is granted.
              </span>
            </div>

            {/* Already have access link */}
            <div className="text-center text-xs text-slate-500 pt-0.5">
              Already have access?{' '}
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
