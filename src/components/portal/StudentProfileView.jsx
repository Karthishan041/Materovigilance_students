import React from 'react';
import { 
  Building2, ShieldCheck, Hash 
} from 'lucide-react';

export default function StudentProfileView({ user, onNavigate, isDarkMode = false }) {
  const profile = {
    fullName: user?.name || 'Arun Kumar',
    email: user?.email || 'arunkumar@srpc.ac.in',
    phone: '+91 9876543210',
    dob: 'October 29, 2007',
    gender: 'Male',
    institution: 'University Medical Center',
    course: 'PharmD (Doctor of Pharmacy)',
    batch: 'Class of 2026',
    year: 'Year 4 (Clinical Residency)',
    studentId: 'STU-2026-8901',
    department: 'Clinical Pharmacy & Materiovigilance',
    curriculumTrack: 'Medical Device Vigilance & Patient Safety (MDR 2017)',
    accountStatus: 'Active & Verified',
    role: 'Student Learner',
    verificationMethod: 'Institutional SSO & Academic Registry'
  };

  return (
    <div className={`max-w-5xl mx-auto space-y-6 pb-12 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
      
      {/* PROFILE HEADER */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-6 border flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-colors`}>
        
        {/* Student Avatar */}
        <div className="w-20 h-20 rounded-xl bg-[#0088FF] text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs">
          {profile.fullName.charAt(0)}
        </div>

        {/* Identity Details */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
                {profile.fullName}
              </h1>
              <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                {profile.course} • {profile.batch}
              </p>
            </div>

            {/* Verified Student Account Pill */}
            <span className={`inline-flex items-center gap-1.5 font-medium text-xs px-3 py-1.5 rounded-md self-center sm:self-start border ${
              isDarkMode 
                ? 'bg-[#0088FF]/15 text-[#0088FF] border-[#0088FF]/30' 
                : 'bg-[#F0F7FF] text-[#0088FF] border-[#0088FF]/20'
            }`}>
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
              <span>Verified Student Account</span>
            </span>
          </div>

          <div className={`pt-1 flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            <span className={`flex items-center gap-1.5 font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              <Building2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
              <span>{profile.institution}</span>
            </span>
            <span className={isDarkMode ? 'text-[#263554]' : 'text-[#E2E8F0]'}>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Hash className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`} />
              <span>Student ID: <span className={`font-semibold ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>{profile.studentId}</span></span>
            </span>
          </div>
        </div>

      </div>

      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-6 border space-y-5 transition-colors`}>
        <div className={`border-b pb-3 flex items-center justify-between ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              Personal Information
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Verified personal and contact details registered with the institutional portal
            </p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
            isDarkMode 
              ? 'text-[#0088FF] bg-[#0088FF]/15 border-[#0088FF]/30' 
              : 'text-[#0088FF] bg-[#F0F7FF] border-[#0088FF]/20'
          }`}>
            Official Record
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-1">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Full Legal Name
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.fullName}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Institutional Email
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.email}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Phone Number
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.phone}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Date of Birth
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.dob}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Gender
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.gender}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Enrollment Status
            </span>
            <p className={`text-sm font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
              <span>{profile.accountStatus}</span>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: ACADEMIC INFORMATION */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-6 border space-y-5 transition-colors`}>
        <div className={`border-b pb-3 flex items-center justify-between ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              Academic Information
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Current academic program, institutional affiliation, and faculty department
            </p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
            isDarkMode 
              ? 'text-[#94A3B8] bg-[#202D4E] border-[#263554]' 
              : 'text-[#172033] bg-[#F7F9FC] border-[#E2E8F0]'
          }`}>
            {profile.batch}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-1">
          <div className="sm:col-span-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Institution / University
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.institution}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Degree / Program
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.course}
            </p>
          </div>

          <div className="sm:col-span-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Department / Specialization
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.department}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Student Registration ID
            </span>
            <p className="text-sm font-semibold text-[#0088FF]">
              {profile.studentId}
            </p>
          </div>

          <div className="sm:col-span-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Curriculum Track
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.curriculumTrack}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Academic Standing
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.year}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ACCOUNT & ACCESS INFORMATION */}
      <div className={`${isDarkMode ? 'bg-[#17213C] border-[#263554]' : 'bg-white border-[#E2E8F0]'} rounded-xl p-6 border space-y-5 transition-colors`}>
        <div className={`border-b pb-3 ${isDarkMode ? 'border-[#263554]' : 'border-[#E2E8F0]'}`}>
          <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
            Account & Access Information
          </h2>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Security parameters, institutional authorization, and session verification
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-1">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Account Status
            </span>
            <p className={`text-sm font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
              <span>Active & Verified</span>
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Verification Authority
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              CDSCO / MvPI Academic Registry
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Portal Access Role
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.role} (Standard Tier)
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Authentication Method
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              {profile.verificationMethod}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Current Session
            </span>
            <p className={`text-sm font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
              <span>Active Now (Session ID: #MV-8901)</span>
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Academic Term
            </span>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-[#F8FAFC]' : 'text-[#172033]'}`}>
              Fall 2026 / Academic Year 2026–27
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

