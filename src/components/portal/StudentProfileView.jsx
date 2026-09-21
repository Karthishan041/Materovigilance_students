import React from 'react';
import { 
  Building2, ShieldCheck, Hash, ArrowRight
} from 'lucide-react';

export default function StudentProfileView({ user, onNavigate }) {
  const profile = {
    fullName: user?.name || 'S. Sarah Jenkins',
    email: user?.email || 'sarah.jenkins@hospital.edu',
    phone: '+1 (555) 234-5678',
    dob: 'August 14, 2001',
    gender: 'Female',
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
    <div className="max-w-5xl mx-auto space-y-6 pb-12 text-[#172033]">
      
      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* Student Avatar */}
        <div className="w-20 h-20 rounded-xl bg-[#0088FF] text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs">
          {profile.fullName.charAt(0)}
        </div>

        {/* Identity Details */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
                {profile.fullName}
              </h1>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">
                {profile.course} • {profile.batch}
              </p>
            </div>

            {/* Verified Student Account Pill */}
            <span className="inline-flex items-center gap-1.5 bg-[#F0F7FF] text-[#0088FF] border border-[#0088FF]/20 font-medium text-xs px-3 py-1.5 rounded-md self-center sm:self-start">
              <ShieldCheck className="w-4 h-4 text-[#0088FF]" />
              <span>Verified Student Account</span>
            </span>
          </div>

          <div className="pt-1 flex flex-wrap justify-center sm:justify-start items-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-medium text-[#172033]">
              <Building2 className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{profile.institution}</span>
            </span>
            <span className="text-[#E2E8F0]">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Hash className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Student ID: <span className="text-[#172033] font-semibold">{profile.studentId}</span></span>
            </span>
          </div>
        </div>

      </div>

      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
        <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
              Personal Information
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Verified personal and contact details registered with the institutional portal
            </p>
          </div>
          <span className="text-[10px] font-semibold text-[#0088FF] bg-[#F0F7FF] border border-[#0088FF]/20 px-2 py-0.5 rounded">
            Official Record
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Full Legal Name
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.fullName}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Institutional Email
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.email}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Phone Number
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.phone}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Date of Birth
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.dob}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Gender
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.gender}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Enrollment Status
            </span>
            <p className="text-sm font-medium text-[#172033] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
              <span>{profile.accountStatus}</span>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: ACADEMIC INFORMATION */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
        <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
              Academic Information
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Current academic program, institutional affiliation, and faculty department
            </p>
          </div>
          <span className="text-xs font-semibold text-[#172033] bg-[#F7F9FC] border border-[#E2E8F0] px-2.5 py-1 rounded-md">
            {profile.batch}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-1">
          <div className="sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Institution / University
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.institution}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Degree / Program
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.course}
            </p>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Department / Specialization
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.department}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Student Registration ID
            </span>
            <p className="text-sm font-semibold text-[#0088FF]">
              {profile.studentId}
            </p>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Curriculum Track
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.curriculumTrack}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Academic Standing
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.year}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: LEARNING PROFILE (EXISTING DATA ONLY) */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
        <div className="border-b border-[#E2E8F0] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
              Learning Profile
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Academic progress snapshot across core modules, simulation cases, and clinical benchmarks
            </p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('performance')}
              className="text-xs font-semibold text-[#0088FF] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>View Full Performance Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Learning Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          
          {/* Tile 1: Overall Progress */}
          <div className="p-4 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0] flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Overall Progress
            </span>
            <div>
              <p className="text-2xl font-bold text-[#0088FF]">62.5%</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">5 of 8 modules passed</p>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#0088FF] h-full rounded-full w-[62.5%]" />
            </div>
          </div>

          {/* Tile 2: Current Module */}
          <div className="p-4 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0] flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Current Module
            </span>
            <div>
              <p className="text-sm font-bold text-[#172033] truncate">Module 3 – MDPI</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">80% progress (Active)</p>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#0088FF] h-full rounded-full w-[80%]" />
            </div>
          </div>

          {/* Tile 3: Completed Modules */}
          <div className="p-4 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0] flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Completed Modules
            </span>
            <div>
              <p className="text-2xl font-bold text-[#172033]">5 / 8</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">Core curriculum units</p>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#0088FF] h-full rounded-full w-[62.5%]" />
            </div>
          </div>

          {/* Tile 4: Clinical Cases Solved */}
          <div className="p-4 rounded-lg bg-[#F7F9FC] border border-[#E2E8F0] flex flex-col justify-between space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Simulation Cases
            </span>
            <div>
              <p className="text-2xl font-bold text-[#172033]">14 Cases</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">Virtual clinical simulations</p>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#0088FF] h-full rounded-full w-[88%]" />
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: ACCOUNT / ACCESS */}
      <div className="bg-white rounded-xl p-6 border border-[#E2E8F0] space-y-5">
        <div className="border-b border-[#E2E8F0] pb-3">
          <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
            Account & Access Information
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Security parameters, institutional authorization, and session verification
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Account Status
            </span>
            <p className="text-sm font-medium text-[#172033] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
              <span>Active & Verified</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Verification Authority
            </span>
            <p className="text-sm font-medium text-[#172033]">
              CDSCO / MvPI Academic Registry
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Portal Access Role
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.role} (Standard Tier)
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Authentication Method
            </span>
            <p className="text-sm font-medium text-[#172033]">
              {profile.verificationMethod}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Current Session
            </span>
            <p className="text-sm font-medium text-[#172033] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#0088FF] rounded-full" />
              <span>Active Now (Session ID: #MV-8901)</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
              Academic Term
            </span>
            <p className="text-sm font-medium text-[#172033]">
              Fall 2026 / Academic Year 2026–27
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
