import React from 'react';
import { UserProfile } from '../types';
import { getEffectiveUserProgress } from '../utils/userProgress';
import {
  ArrowLeft,
  Flame,
  Award,
  Check,
  Calendar,
  Home,
  Rocket,
  BarChart2,
  User as UserIcon
} from 'lucide-react';

interface ProgressPageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ user, onNavigate }) => {
  const progress = getEffectiveUserProgress(user);
  const currentDay = progress.currentDay;
  const streakDays = progress.streakDays;
  const completedDays = progress.completedDays;
  const longestStreak = Math.max(user?.longestStreak ?? 11, streakDays);
  const totalDays = 60;
  const remainingDays = totalDays - completedDays;
  const completionPercentage = progress.completionPercentage;

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-36 selection:bg-[#4c5b71]/15 overflow-x-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4">
        <div className="max-w-md mx-auto h-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#4c5b71] hover:text-[#38485d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <span className="font-extrabold text-sm text-[#4c5b71]">Your Progress</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-5">
        {/* OVERVIEW METRICS CARD */}
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono-code text-[11px] font-bold text-[#4c5b71] tracking-wider uppercase">
                CHALLENGE PROGRESS
              </p>
              <h1 className="text-2xl font-extrabold text-[#191c1e] mt-0.5">
                {currentDay} / {totalDays} Days
              </h1>
            </div>

            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#4c5b71]">
                {completionPercentage}%
              </span>
              <p className="text-[10px] font-mono-code font-bold text-slate-400 uppercase">
                COMPLETE
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4c5b71] rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span className="text-[10px] font-mono-code font-bold text-slate-500 uppercase">Current Streak</span>
              </div>
              <span className="text-lg font-extrabold text-[#191c1e]">{streakDays} days</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-[#4c5b71] mb-1">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-mono-code font-bold text-slate-500 uppercase">Longest Streak</span>
              </div>
              <span className="text-lg font-extrabold text-[#191c1e]">{longestStreak} days</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="text-[10px] font-mono-code font-bold text-slate-500 uppercase">Completed</span>
              </div>
              <span className="text-lg font-extrabold text-[#191c1e]">{completedDays} days</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] font-mono-code font-bold text-slate-500 uppercase">Remaining</span>
              </div>
              <span className="text-lg font-extrabold text-[#191c1e]">{remainingDays} days</span>
            </div>
          </div>
        </section>

        {/* 60-DAY JOURNEY GRID */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#191c1e]">
              60-Day Challenge Map
            </h2>
            <span className="text-xs font-mono-code text-slate-500 font-semibold">
              Track view
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: totalDays }, (_, i) => {
                const dayNum = i + 1;
                const isCompleted = dayNum <= completedDays;
                const isCurrent = dayNum === currentDay;

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
                        ? `Day ${dayNum}: Current Mission`
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
                <span>Completed ({completedDays})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4c5b71] inline-block" />
                <span>Active (Day {currentDay})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#f1f3f5] border border-slate-200 inline-block" />
                <span>Upcoming</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FIXED BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex justify-around items-center max-w-md mx-auto shadow-lg">
        {/* HOME */}
        <button
          onClick={() => onNavigate('/dashboard')}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        {/* CHALLENGE */}
        <button
          onClick={() => onNavigate(`/day/${currentDay}`)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <Rocket className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Challenge</span>
        </button>

        {/* PROGRESS (ACTIVE) */}
        <button
          onClick={() => onNavigate('/progress')}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#4c5b71] cursor-pointer"
        >
          <BarChart2 className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-0.5">Progress</span>
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
