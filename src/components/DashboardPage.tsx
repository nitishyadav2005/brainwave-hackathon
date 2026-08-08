import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Menu,
  Flame,
  Flag,
  Check,
  Star,
  Zap,
  Lock,
  Home,
  Rocket,
  BarChart2,
  User as UserIcon,
  LogOut,
  ArrowRight,
  Code2
} from 'lucide-react';

interface DashboardPageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'challenge' | 'progress' | 'profile'>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = user?.name || 'Nitish';
  const streakDays = user?.streak || 11;
  const currentDay = streakDays + 1; // e.g. Day 12
  const totalDays = 60;

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-28 md:pb-12 selection:bg-[#4c5b71]/15">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-[#4c5b71] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <span
              onClick={() => onNavigate('/')}
              className="font-extrabold text-xl tracking-tight text-[#4c5b71] cursor-pointer select-none"
            >
              ABTalks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>Sign Out</span>
            </button>

            {/* Profile Headshot Avatar */}
            <div
              onClick={() => setActiveTab('profile')}
              className="w-9 h-9 rounded-full bg-[#64748b] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer hover:opacity-90 transition-opacity border border-white"
            >
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-lg max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="flex flex-col gap-2">
              <div className="p-3 bg-[#f8f9fb] rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1e293b]">{userName}</p>
                  <p className="text-[11px] text-slate-500">{user?.college || 'Student Developer'}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {user?.track || 'Full Stack'} Track
                </span>
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('/');
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-[#4c5b71]" />
                View Landing Page
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Canvas */}
      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6 pt-4 md:pt-6">
        {/* Greeting Section */}
        <section className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#191c1e] tracking-tight">
            Good evening, <br className="sm:hidden" />
            <span className="text-[#4c5b71]">{userName}</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Ready to crush your goals today?
          </p>
        </section>

        {/* Hero Streak Module */}
        <section className="clay-card-deep p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          {/* Decorative soft background circle */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

          <div className="flex items-center gap-4 z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f8f9fb] flex items-center justify-center shadow-inner border border-slate-200/80">
              <Flame className="w-8 h-8 sm:w-9 sm:h-9 text-amber-500 fill-amber-500 drop-shadow-md" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
                {streakDays} Day
              </h2>
              <p className="font-mono-code text-[11px] font-bold text-[#4c5b71] tracking-widest uppercase">
                Active Streak
              </p>
            </div>
          </div>

          <div className="z-10 hidden sm:block">
            <div className="px-4 py-2 rounded-full bg-[#64748b] text-white font-mono-code text-xs font-bold shadow-md">
              🔥 On Fire!
            </div>
          </div>
        </section>

        {/* Today's Mission Section */}
        <section className="clay-card-deep p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shadow-xs">
            <Flag className="w-6 h-6 text-amber-800" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#191c1e]">
              Today's Mission: Day {currentDay}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Complete your advanced full-stack module and push your proof-of-work commit to maintain your streak.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="clay-btn-primary bg-[#4c5b71] text-white font-bold py-3.5 px-8 rounded-full w-full sm:w-auto text-sm cursor-pointer shadow-md inline-flex items-center justify-center gap-2 group"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

        {/* Journey Map */}
        <section className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-lg font-extrabold text-[#191c1e]">
              Your Journey
            </h3>
            <span className="font-mono-code text-xs font-semibold text-slate-500">
              60 Days
            </span>
          </div>

          <div className="clay-inset p-4 sm:p-5">
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2.5 sm:gap-3 justify-items-center">
              {Array.from({ length: totalDays }, (_, i) => {
                const dayNum = i + 1;
                const isDone = dayNum <= streakDays;
                const isCurrent = dayNum === currentDay;

                return (
                  <div
                    key={dayNum}
                    title={`Day ${dayNum}: ${isDone ? 'Completed' : isCurrent ? 'Active' : 'Pending'}`}
                    className={`
                      w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-mono-code font-bold transition-all relative
                      ${
                        isDone
                          ? 'bg-[#d3e4fe] text-[#0b1c30] clay-marker-done'
                          : isCurrent
                          ? 'bg-[#64748b] text-white shadow-md animate-pulse ring-2 ring-white'
                          : 'bg-white text-slate-300 clay-marker-pending'
                      }
                    `}
                  >
                    {isDone ? (
                      <Check className="w-4 h-4 stroke-[3] text-[#4c5b71]" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-amber-300" />
                    ) : (
                      <span className="text-[10px] opacity-60">{dayNum}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Achievements / Recent Badges */}
        <section className="space-y-3">
          <h3 className="text-lg font-extrabold text-[#191c1e] px-1">
            Recent Badges
          </h3>

          <div className="flex flex-wrap gap-2.5">
            <div className="clay-pill px-3.5 py-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                Perfect Week
              </span>
            </div>

            <div className="clay-pill px-3.5 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#4c5b71] fill-[#4c5b71]" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                Speed Learner
              </span>
            </div>

            <div className="clay-pill px-3.5 py-2 flex items-center gap-2 opacity-80">
              <Lock className="w-4 h-4 text-slate-400" />
              <span className="font-mono-code text-xs font-semibold text-slate-500">
                Code Artisan
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#f8f9fb]/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex justify-around items-center md:hidden shadow-lg">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#4c5b71] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        {/* Challenge */}
        <button
          onClick={() => setActiveTab('challenge')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'challenge'
              ? 'bg-[#4c5b71] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Challenge</span>
        </button>

        {/* Progress */}
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'progress'
              ? 'bg-[#4c5b71] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Progress</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#4c5b71] text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
};
