import React from 'react';
import MVLogo from './MVLogo';
import { User, LogIn, UserPlus, LogOut, ShieldCheck } from 'lucide-react';

export default function Header({ user, onOpenSignIn, onOpenRegister, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-100 px-6 sm:px-12 py-3.5 flex items-center justify-between shadow-2xs z-30 sticky top-0">
      {/* Left: Logo */}
      <MVLogo variant="navbar" />

      {/* Right: Auth Action Buttons */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
              <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none">
                  {user.name || 'User'}
                </p>
                <p className="text-[10px] text-blue-700 capitalize font-medium">
                  {user.role || 'Student'} Member
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Log Out"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
