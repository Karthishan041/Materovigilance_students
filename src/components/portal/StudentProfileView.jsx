import React from 'react';
import { 
  User, Building2, GraduationCap, ShieldCheck, Hash
} from 'lucide-react';

export default function StudentProfileView({ user }) {
  const profile = {
    fullName: user?.name || 'S. Samuel Jenkins',
    email: user?.email || 'samuel.jenkins@hospital.edu',
    phone: '+1 (555) 234-5678',
    dob: 'August 14, 2001',
    gender: 'Male',
    institution: 'University Medical Center',
    course: 'PharmD (Doctor of Pharmacy)',
    batch: '2026',
    studentId: 'STU-2026-8901',
    department: 'Clinical Pharmacy & Materiovigilance',
    accountStatus: 'Active & Verified'
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-8">
      
      {/* Top Profile Header Card */}
      <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
        
        {/* Avatar Container */}
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-lg bg-[#0088FF] text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-xs shrink-0">
          {profile.fullName.charAt(0)}
        </div>

        {/* Student Meta Info */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {profile.course} • Class of {profile.batch}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 bg-[#F0F7FF] text-[#0088FF] border border-blue-100 font-semibold text-xs px-3 py-1.5 rounded-md self-center sm:self-start">
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
              <span>Verified Student Account</span>
            </span>
          </div>

          <div className="pt-2 flex flex-wrap justify-center sm:justify-start items-center gap-3.5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.institution}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              <span>Student ID: {profile.studentId}</span>
            </span>
          </div>
        </div>

      </div>

      {/* Section 1: Personal Details */}
      <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-[#0088FF]" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Personal Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Full Name
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.fullName}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Email Address
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.email}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Phone Number
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.phone}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Date of Birth
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.dob}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Gender
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.gender}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Account Status
            </span>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>{profile.accountStatus}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Academic Information */}
      <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#0088FF]" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Academic Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          <div className="sm:col-span-2 bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Institution / University Name
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.institution}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Degree / Program
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.course}
            </p>
          </div>

          <div className="sm:col-span-2 bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Department / Specialization
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {profile.department}
            </p>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-md border border-slate-200/80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Student Registration ID
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#0088FF]">
              {profile.studentId}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

