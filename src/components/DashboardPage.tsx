import React, { useRef } from 'react';
import { UserProfile } from '../types';
import {
  Flame,
  Check,
  Zap,
  Lock,
  Home,
  Rocket,
  BarChart2,
  User as UserIcon,
  ArrowRight
} from 'lucide-react';

interface DashboardPageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate, onLogout }) => {
  const journeyRef = useRef<HTMLDivElement>(null);

  // Read user details from props or fallback to ABTalks default student mock data
  const name = user?.name || 'Nitish';
  const college = user?.college || 'ABES Engineering College';
  const track = user?.track || 'Full Stack Development';

  const streakDays = 11;
  const currentDay = 12;
  const totalDays = 60;
  const completionPercentage = 20; // 12 / 60 = 20%

  const scrollToJourney = () => {
    if (journeyRef.current) {
      journeyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-32 selection:bg-[#4c5b71]/15">
      {/* 1. TOP HEADER (56px-64px tall, minimal, no hamburger menu) */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4">
        <div className="max-w-md mx-auto h-full flex items-center justify-between">
          <span
            onClick={() => onNavigate('/')}
            className="font-extrabold text-xl tracking-tight text-[#4c5b71] cursor-pointer select-none"
          >
            ABTalks
          </span>

          <div
            onClick={() => onNavigate('/profile')}
            title={`${name} (${college}) — ${track}`}
            className="w-9 h-9 rounded-full bg-[#4c5b71] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer hover:opacity-90 transition-opacity border-2 border-white select-none"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER (Centered & constrained for mobile 390px, scalable for tablet/desktop) */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-5">
        
        {/* 2. GREETING */}
        <section className="space-y-0.5">
          <h1 className="text-[28px] leading-tight font-extrabold text-[#191c1e] tracking-tight">
            Good evening,<br />
            <span className="text-[#4c5b71]">{name}</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Ready to crush your goals today?
          </p>
        </section>

        {/* 3. STREAK CARD */}
        <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex items-center gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
            <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#191c1e] tracking-tight">
                {streakDays} Day
              </span>
              <span className="font-mono-code text-[10px] font-bold text-[#4c5b71] tracking-wider uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                ACTIVE STREAK
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Keep showing up. <span className="text-slate-400">•</span> <span className="text-slate-500 font-semibold">1 day away from 12</span>
            </p>
          </div>
        </section>

        {/* 4. TODAY'S MISSION (PRIMARY ACTION) */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#4c5b71]/20 space-y-4 relative">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[11px] font-bold text-[#4c5b71] tracking-wider uppercase">
              TODAY'S MISSION
            </span>
            <span className="bg-[#4c5b71] text-white font-mono-code text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              DAY {currentDay}
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-[#191c1e] leading-snug">
              Build something useful with an API
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build a small practical project using a public API and turn the data into something people can use.
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-code text-[10px] font-semibold text-slate-600">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60 uppercase">
              FULL STACK
            </span>
            <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200/60 uppercase">
              MEDIUM
            </span>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60 uppercase">
              60–90 MIN
            </span>
          </div>

          {/* Primary Full-Width CTA */}
          <button
            onClick={() => onNavigate(`/day/${currentDay}`)}
            className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Continue to Day {currentDay}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* 5. JOURNEY */}
        <section ref={journeyRef} className="space-y-3 pt-2">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#191c1e]">
              Your Journey
            </h3>
            <div className="text-right">
              <span className="font-mono-code text-xs font-bold text-[#191c1e]">
                12 / 60 DAYS
              </span>
              <span className="font-mono-code text-[11px] font-bold text-[#4c5b71] ml-2">
                20% COMPLETE
              </span>
            </div>
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4c5b71] rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* 60-Day Grid */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: totalDays }, (_, i) => {
                const dayNum = i + 1;
                const isCompleted = dayNum <= streakDays; // 1 to 11
                const isCurrent = dayNum === currentDay;  // 12
                const isUpcoming = dayNum > currentDay;   // 13 to 60

                return (
                  <button
                    key={dayNum}
                    onClick={() => {
                      if (dayNum <= currentDay) {
                        onNavigate(`/day/${dayNum}`);
                      }
                    }}
                    title={
                      isCompleted
                        ? `Day ${dayNum}: Completed`
                        : isCurrent
                        ? `Day ${dayNum}: Active Mission`
                        : `Day ${dayNum}: Upcoming`
                    }
                    className={`
                      aspect-square rounded-lg font-mono-code text-xs font-bold flex items-center justify-center transition-all
                      ${
                        isCompleted
                          ? 'bg-[#d3e4fe] text-[#0b1c30] hover:bg-[#c2d9fc] cursor-pointer'
                          : isCurrent
                          ? 'bg-[#4c5b71] text-white shadow-xs ring-2 ring-[#4c5b71] ring-offset-1 ring-offset-white cursor-pointer scale-105 z-10'
                          : 'bg-[#f1f3f5] text-slate-400 cursor-not-allowed opacity-80'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <span>{dayNum}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grid Legend */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#d3e4fe] inline-block" />
                <span>Completed (11)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4c5b71] inline-block" />
                <span>Active (Day 12)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#f1f3f5] border border-slate-200 inline-block" />
                <span>Upcoming</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RECENT BADGES */}
        <section className="space-y-2.5 pt-1">
          <h3 className="text-base font-bold text-[#191c1e]">
            Recent Badges
          </h3>

          <div className="flex flex-wrap gap-2">
            {/* Badge 1 */}
            <div className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                First Commit
              </span>
            </div>

            {/* Badge 2 */}
            <div className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                7 Day Streak
              </span>
            </div>

            {/* Badge 3 */}
            <div className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#4c5b71] fill-[#4c5b71]" />
              <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                10 Builds
              </span>
            </div>

            {/* Badge 4 (Locked) */}
            <div className="bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-60">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono-code text-xs font-semibold text-slate-500">
                30 Day Streak
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* 7. FIXED BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex justify-around items-center max-w-md mx-auto shadow-lg">
        {/* HOME */}
        <button
          onClick={() => onNavigate('/dashboard')}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#4c5b71] cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>

        {/* CHALLENGE */}
        <button
          onClick={() => onNavigate(`/day/${currentDay}`)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <Rocket className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Challenge</span>
        </button>

        {/* PROGRESS */}
        <button
          onClick={scrollToJourney}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <BarChart2 className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Progress</span>
        </button>

        {/* PROFILE */}
        <button
          onClick={() => onNavigate('/profile')}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <UserIcon className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
};
