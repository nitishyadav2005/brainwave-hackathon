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
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-32 selection:bg-[#4c5b71]/15">
      {/* TopAppBar (Shared Component) */}
      <header className="bg-[#f8f9fb] sticky top-0 w-full z-50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_12px_rgba(76,91,113,0.1)] flex justify-between items-center px-4 md:px-6 py-3 border-b border-slate-200/60">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-lg text-[#4c5b71] hover:opacity-80 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span
            onClick={() => onNavigate('/')}
            className="font-extrabold text-xl md:text-2xl tracking-tight text-[#4c5b71] cursor-pointer select-none"
          >
            ABTalks
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#4c5b71] bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Sign Out</span>
          </button>

          {/* User Headshot Avatar */}
          <div
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full bg-[#64748b] text-white overflow-hidden cursor-pointer hover:opacity-80 active:scale-95 transition-all flex items-center justify-center font-bold text-sm shadow-xs border-2 border-white"
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-4 py-3 shadow-lg max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="flex flex-col gap-2">
              <div className="p-3 bg-[#f8f9fb] rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1e293b]">{userName}</p>
                  <p className="text-[11px] text-slate-500">{user?.college || 'Student Developer'}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
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
      <main className="px-4 py-6 max-w-3xl mx-auto space-y-6 pt-6 md:pt-8">
        {/* Greeting Section */}
        <section className="space-y-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight leading-tight">
            Good evening, <br className="md:hidden" />
            <span className="text-[#4c5b71]">{userName}</span>
          </h1>
          <p className="text-base sm:text-lg text-[#54615d]">
            Ready to crush your goals today?
          </p>
        </section>

        {/* Hero Streak Module */}
        <section className="clay-card p-6 flex items-center justify-between relative overflow-hidden">
          {/* Decorative soft background circle */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#d3e4fe] rounded-full blur-2xl opacity-50 pointer-events-none" />

          <div className="flex items-center gap-4 z-10">
            <div className="w-16 h-16 rounded-full bg-[#eceef0] flex items-center justify-center shadow-[inset_4px_4px_8px_#d8dadc,inset_-4px_-4px_8px_#ffffff]">
              <Flame className="w-9 h-9 text-[#64748b] fill-[#64748b] drop-shadow-[0_0_12px_rgba(100,116,139,0.6)]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#191c1e]">
                {streakDays} Day
              </h2>
              <p className="font-mono-code text-xs font-semibold text-[#4c5b71] tracking-widest uppercase">
                Active Streak
              </p>
            </div>
          </div>

          <div className="z-10 hidden sm:block">
            <div className="px-4 py-2 rounded-full bg-[#64748b] text-white font-mono-code text-xs font-bold shadow-[0_0_15px_rgba(100,116,139,0.3)]">
              On Fire!
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="clay-card p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#ffddb6] flex items-center justify-center shadow-[2px_2px_4px_#d8dadc,-2px_-2px_4px_#ffffff]">
            <Flag className="w-6 h-6 text-[#2a1801]" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#191c1e]">
              Today's Mission: Day {currentDay}
            </h3>
            <p className="text-sm sm:text-base text-[#54615d] max-w-md mx-auto leading-relaxed">
              Complete your advanced pronunciation module to maintain your streak.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="clay-button bg-[#64748b] hover:bg-[#4c5b71] text-white font-mono-code text-sm sm:text-base font-bold py-3.5 px-10 sm:px-16 rounded-full w-full sm:w-auto mt-2 cursor-pointer transition-all"
          >
            Continue Learning
          </button>
        </section>

        {/* Journey Map */}
        <section className="space-y-3">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xl font-extrabold text-[#191c1e]">
              Your Journey
            </h3>
            <span className="font-mono-code text-sm font-medium text-[#54615d]">
              60 Days
            </span>
          </div>

          <div className="clay-inset p-5">
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-3 sm:gap-4 justify-items-center">
              {Array.from({ length: totalDays }, (_, i) => {
                const dayNum = i + 1;
                const isDone = dayNum <= streakDays;
                const isCurrent = dayNum === currentDay;

                return (
                  <div
                    key={dayNum}
                    title={`Day ${dayNum}: ${isDone ? 'Completed' : isCurrent ? 'Active' : 'Pending'}`}
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-[0.75rem] flex items-center justify-center transition-all relative
                      ${
                        isDone
                          ? 'bg-[#d3e4fe] clay-marker-done'
                          : isCurrent
                          ? 'bg-[#64748b] shadow-[0_0_12px_rgba(100,116,139,0.6)] animate-pulse ring-2 ring-white'
                          : 'bg-[#f8f9fb] clay-marker-pending'
                      }
                    `}
                  >
                    {isDone && (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4c5b71] stroke-[2.5]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Badges / Achievements */}
        <section className="space-y-3">
          <h3 className="text-xl font-extrabold text-[#191c1e] px-2">
            Recent Badges
          </h3>

          <div className="flex flex-wrap gap-3">
            <div className="clay-pill px-4 py-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#6f5636] fill-[#6f5636]" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                Perfect Week
              </span>
            </div>

            <div className="clay-pill px-4 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#4c5b71] fill-[#4c5b71]" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                Speed Learner
              </span>
            </div>

            <div className="clay-pill px-4 py-2 flex items-center gap-2 opacity-80">
              <Lock className="w-4 h-4 text-[#74777d]" />
              <span className="font-mono-code text-xs font-semibold text-[#54615d]">
                Grammar Guru
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#eceef0] border-t border-slate-200/80 px-4 py-3 flex justify-around items-center md:hidden shadow-lg rounded-t-2xl pb-safe">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#4c5b71] text-white rounded-full px-4 py-2 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(76,91,113,0.3)]'
              : 'text-[#54615d] px-4 py-2 hover:text-[#4c5b71]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium font-mono-code">Home</span>
        </button>

        {/* Challenge */}
        <button
          onClick={() => setActiveTab('challenge')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'challenge'
              ? 'bg-[#4c5b71] text-white rounded-full px-4 py-2 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(76,91,113,0.3)]'
              : 'text-[#54615d] px-4 py-2 hover:text-[#4c5b71]'
          }`}
        >
          <Rocket className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium font-mono-code">Challenge</span>
        </button>

        {/* Progress */}
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'progress'
              ? 'bg-[#4c5b71] text-white rounded-full px-4 py-2 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(76,91,113,0.3)]'
              : 'text-[#54615d] px-4 py-2 hover:text-[#4c5b71]'
          }`}
        >
          <BarChart2 className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium font-mono-code">Progress</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#4c5b71] text-white rounded-full px-4 py-2 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(76,91,113,0.3)]'
              : 'text-[#54615d] px-4 py-2 hover:text-[#4c5b71]'
          }`}
        >
          <UserIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium font-mono-code">Profile</span>
        </button>
      </nav>
    </div>
  );
};
