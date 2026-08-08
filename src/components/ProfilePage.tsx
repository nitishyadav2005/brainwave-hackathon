import React from 'react';
import { ArrowLeft, User, Building, Code, Flame, Award, Github, Linkedin, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, onLogout }) => {
  const name = user?.name || 'Nitish';
  const college = user?.college || 'ABES Engineering College';
  const track = user?.track || 'Full Stack Development';

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-20 selection:bg-[#4c5b71]/15">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full h-14 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4">
        <div className="max-w-md mx-auto h-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#4c5b71] hover:text-[#38485d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <span className="font-extrabold text-sm text-[#4c5b71]">Student Profile</span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-5">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#4c5b71] text-white flex items-center justify-center font-extrabold text-2xl mx-auto shadow-md border-4 border-white">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-[#191c1e]">{name}</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{college}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Code className="w-3.5 h-3.5" />
            <span>{track} Track</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <div className="text-xl font-extrabold text-[#191c1e]">11 Days</div>
            <div className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold">Current Streak</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
            <Award className="w-6 h-6 text-[#4c5b71] mx-auto mb-1" />
            <div className="text-xl font-extrabold text-[#191c1e]">20%</div>
            <div className="text-[11px] font-mono-code text-slate-500 uppercase font-semibold">60-Day Progress</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Back to ABTalks Home</span>
            <ArrowLeft className="w-4 h-4 rotate-180 text-slate-400" />
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Sign Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};
