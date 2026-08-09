import React, { useRef, useState } from 'react';
import { UserProfile } from '../types';
import { formatFirstName } from '../utils/nameUtils';
import { getEffectiveUserProgress } from '../utils/userProgress';
import {
  Flame,
  Check,
  Zap,
  Lock,
  Home,
  Rocket,
  BarChart2,
  User as UserIcon,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Calendar,
  FileText,
  Award,
  Trophy,
  X,
  Download,
  Shield,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { REPORT_LIST, ReportDef } from '../data/reportsData';

interface DashboardPageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate, onLogout }) => {
  const journeyRef = useRef<HTMLDivElement>(null);

  // Selected report modal state
  const [selectedReportModal, setSelectedReportModal] = useState<{
    reportId: number;
    reportDef: ReportDef;
    isUnlocked: boolean;
  } | null>(null);

  // Streak Saver State & Confirmation Modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showSavedSuccessToast, setShowSavedSuccessToast] = useState(false);

  // Read Streak Saver values from localStorage / props
  const [streakSaversUsed, setStreakSaversUsed] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedUsed = localStorage.getItem('abtalks_streak_savers_used');
      if (savedUsed !== null && !isNaN(Number(savedUsed))) {
        return Number(savedUsed);
      }
    }
    return user?.streakSaversUsed ?? 0;
  });

  const streakSaversTotal = 3;
  const streakSaversRemaining = Math.max(0, streakSaversTotal - streakSaversUsed);

  // Missed yesterday status & protection tracking
  const [isProtectedYesterday, setIsProtectedYesterday] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('abtalks_streak_saver_protected_yesterday') === 'true';
    }
    return !!user?.streakSaverProtectedYesterday;
  });

  const isMissedYesterdayRaw = (() => {
    if (typeof window !== 'undefined') {
      const storedMissed = localStorage.getItem('abtalks_missed_yesterday');
      if (storedMissed !== null) return storedMissed === 'true';
    }
    return !!user?.missedYesterday;
  })();

  const isMissedYesterday = isMissedYesterdayRaw && !isProtectedYesterday;

  // Handler to confirm using a streak saver
  const handleConfirmUseStreakSaver = () => {
    if (streakSaversRemaining <= 0) return;
    const newUsed = Math.min(3, streakSaversUsed + 1);
    const newRemaining = Math.max(0, 3 - newUsed);
    
    setStreakSaversUsed(newUsed);
    setIsProtectedYesterday(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('abtalks_streak_savers_used', String(newUsed));
      localStorage.setItem('abtalks_streak_savers_remaining', String(newRemaining));
      localStorage.setItem('abtalks_streak_saver_protected_yesterday', 'true');
      localStorage.setItem('abtalks_missed_yesterday', 'false');

      try {
        const savedUser = localStorage.getItem('abtalks_user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          parsed.streakSaversUsed = newUsed;
          parsed.streakSaversRemaining = newRemaining;
          parsed.missedYesterday = false;
          parsed.streakSaverProtectedYesterday = true;
          localStorage.setItem('abtalks_user', JSON.stringify(parsed));
        }
      } catch (e) {
        console.warn('Error updating user in localStorage:', e);
      }
    }

    setIsConfirmModalOpen(false);
    setShowSavedSuccessToast(true);
  };

  // Derived variables based on current user (ensuring clean first name "Nitish", no surname)
  const name = formatFirstName(user?.name);

  const college = user?.college || 'ABES Engineering College';
  const track = user?.track || 'Full Stack Development';

  const isFirstDay = user?.currentDay === 1 && user?.streak === 0;

  const progress = getEffectiveUserProgress(user);
  const currentDay = progress.currentDay;
  const streakDays = progress.streakDays;
  const completedDays = progress.completedDays;
  const totalDays = 60;
  const progressDay = isFirstDay ? 0 : currentDay;
  const completionPercentage = isFirstDay ? 0 : progress.completionPercentage;

  const scrollToJourney = () => {
    if (journeyRef.current) {
      journeyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-28 lg:pb-12 selection:bg-[#4c5b71]/15 overflow-x-hidden">
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto h-full flex items-center justify-between">
          <span
            onClick={() => onNavigate('/')}
            className="font-extrabold text-xl tracking-tight text-[#4c5b71] cursor-pointer select-none"
          >
            ABTalks
          </span>

          {/* Desktop header navigation links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => onNavigate('/dashboard')}
              className="text-xs font-bold text-[#4c5b71] hover:text-[#191c1e] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate(`/day/${currentDay}`)}
              className="text-xs font-bold text-slate-600 hover:text-[#191c1e] transition-colors cursor-pointer"
            >
              Challenge
            </button>
            <button
              onClick={() => onNavigate('/progress')}
              className="text-xs font-bold text-slate-600 hover:text-[#191c1e] transition-colors cursor-pointer"
            >
              Progress
            </button>
            <button
              onClick={() => onNavigate('/profile')}
              className="text-xs font-bold text-slate-600 hover:text-[#191c1e] transition-colors cursor-pointer"
            >
              Profile
            </button>
          </nav>

          <div
            onClick={() => onNavigate('/profile')}
            title={`${name} (${college}) — ${track}`}
            className="w-9 h-9 rounded-full bg-[#4c5b71] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer hover:opacity-90 transition-opacity border-2 border-white select-none"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-md lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        
        {/* RESPONSIVE LAYOUT WRAPPER */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start space-y-5 lg:space-y-0">
          
          {/* SIDEBAR COLUMN (Greeting, Streak, Badges - shown first on mobile, right column on desktop) */}
          <div className="lg:col-span-4 space-y-5 lg:order-2">
            {/* 2. GREETING */}
            <section className="space-y-0.5">
              <h1 className="text-[28px] leading-tight font-extrabold text-[#191c1e] tracking-tight">
                Good evening,<br />
                <span className="text-[#4c5b71]">{name}</span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {isFirstDay
                  ? 'Welcome to your 60-day coding journey!'
                  : isMissedYesterday
                  ? 'Ready to get back on track today?'
                  : 'Ready to crush your goals today?'}
              </p>
            </section>

            {/* MISSED-DAY RECOVERY BANNER / SUCCESS TOAST */}
            {showSavedSuccessToast ? (
              <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-2xs space-y-1 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Streak saved! 🔥</span>
                  </div>
                  <button
                    onClick={() => setShowSavedSuccessToast(false)}
                    className="text-emerald-600 hover:text-emerald-800 text-xs font-bold p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-emerald-900/80 font-medium leading-relaxed">
                  Your {streakDays}-day streak is still alive. Keep building!
                </p>
              </section>
            ) : isMissedYesterday && (
              <section className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 shadow-2xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  <span>Yesterday was missed.</span>
                </div>
                <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                  Protect your momentum with a Streak Saver below or keep building today!
                </p>
              </section>
            )}

            {/* 3. STREAK CARD */}
            {isMissedYesterday && streakSaversRemaining > 0 ? (
              /* STREAK AT RISK STATE */
              <section className="bg-white rounded-2xl p-4 shadow-xs border-2 border-amber-300 relative overflow-hidden transition-all space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6 text-amber-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between flex-wrap gap-1.5">
                      <span className="text-2xl font-extrabold text-[#191c1e] tracking-tight">
                        {streakDays} Day
                      </span>
                      <span className="font-mono-code text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200/80">
                        STREAK AT RISK
                      </span>
                    </div>

                    <p className="text-xs text-amber-900/90 font-semibold mt-0.5">
                      You missed yesterday.
                    </p>
                  </div>
                </div>

                {/* COMPACT STREAK SAVER ACTION */}
                <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#4c5b71]" />
                      <span className="font-bold text-xs text-[#191c1e]">Streak Saver</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Protect your streak <span className="text-slate-400">•</span>{' '}
                      <span className="font-bold text-[#4c5b71]">
                        {streakSaversRemaining} of {streakSaversTotal} remaining
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] min-h-[36px]"
                  >
                    <span>Use Streak Saver →</span>
                  </button>
                </div>
              </section>
            ) : isMissedYesterday && streakSaversRemaining === 0 ? (
              /* STREAK BROKEN STATE */
              <section className="bg-white rounded-2xl p-4 shadow-xs border-2 border-rose-200 relative overflow-hidden transition-all space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-6 h-6 text-rose-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between flex-wrap gap-1.5">
                      <span className="text-2xl font-extrabold text-[#191c1e] tracking-tight">
                        0 Day
                      </span>
                      <span className="font-mono-code text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md border border-rose-200">
                        STREAK BROKEN
                      </span>
                    </div>

                    <p className="text-xs text-rose-900/90 font-medium mt-1 leading-relaxed">
                      Your Streak Savers are all used. Your challenge is still going. Start building again today.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => onNavigate(`/day/${currentDay}`)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Continue Challenge →</span>
                  </button>
                </div>
              </section>
            ) : (
              /* NORMAL ACTIVE STREAK STATE */
              <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex items-center gap-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between flex-wrap gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-[#191c1e] tracking-tight">
                        {streakDays} Day
                      </span>
                      <span className="font-mono-code text-[10px] font-bold text-[#4c5b71] tracking-wider uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                        {isFirstDay ? 'NEW STREAK' : 'ACTIVE STREAK'}
                      </span>
                    </div>

                    {/* Subtle Streak Saver indicator */}
                    <span
                      className="inline-flex items-center gap-1 font-mono-code text-[10px] font-bold text-[#4c5b71] bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/70"
                      title={`${streakSaversRemaining} Streak Savers remaining`}
                    >
                      <Shield className="w-3 h-3 text-[#4c5b71]" />
                      <span>🛡 {streakSaversRemaining} Streak Saver{streakSaversRemaining !== 1 ? 's' : ''}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {isFirstDay ? (
                      <span className="text-[#4c5b71] font-bold">Your streak starts today.</span>
                    ) : (
                      <>
                        Keep showing up. <span className="text-slate-400">•</span>{' '}
                        <span className="text-slate-500 font-semibold">
                          1 day away from {streakDays + 1}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </section>
            )}

            {/* 6. RECENT BADGES (Shown in sidebar on desktop) */}
            <section className="hidden lg:block bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-3">
              <h3 className="text-base font-bold text-[#191c1e]">
                Recent Badges
              </h3>

              <div className="flex flex-wrap gap-2">
                <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                    First Commit
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                    7 Day Streak
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-[#4c5b71] fill-[#4c5b71]" />
                  <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                    10 Builds
                  </span>
                </div>

                <div className="bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-60">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono-code text-xs font-semibold text-slate-500">
                    30 Day Streak
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* MAIN CONTENT COLUMN (Today's Mission & Journey Grid) */}
          <div className="lg:col-span-8 space-y-5 lg:order-1">
            {/* 4. TODAY'S MISSION (PRIMARY ACTION) */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#4c5b71]/20 space-y-4 relative">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="font-mono-code text-[11px] font-bold text-[#4c5b71] tracking-wider uppercase">
              TODAY'S MISSION
            </span>
            <span className="bg-[#4c5b71] text-white font-mono-code text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              DAY {isFirstDay ? '01' : currentDay}
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-[#191c1e] leading-snug">
              {isFirstDay
                ? 'Welcome to ABTalks & First Commit'
                : currentDay === 13
                ? 'Deploy your project to production'
                : 'Build something useful with an API'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFirstDay
                ? 'Set up your local workspace, create your first GitHub repository, and push a working README to kick off your 60-day challenge.'
                : currentDay === 13
                ? 'Package your full-stack app and deploy it to production so anyone on the web can try it.'
                : 'Build a small practical project using a public API and turn the data into something people can use.'}
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-code text-[10px] font-semibold text-slate-600">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60 uppercase">
              FULL STACK
            </span>
            <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200/60 uppercase">
              {isFirstDay ? 'EASY' : 'MEDIUM'}
            </span>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/60 uppercase">
              {isFirstDay ? '15–30 MIN' : '60–90 MIN'}
            </span>
          </div>

          {/* Primary Full-Width CTA */}
          <button
            onClick={() => onNavigate(`/day/${currentDay}`)}
            className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>
              {isFirstDay
                ? 'Start Day 01 →'
                : isMissedYesterday
                ? 'Continue Challenge →'
                : `Continue to Day ${currentDay} →`}
            </span>
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
                {progressDay} / 60 DAYS
              </span>
              <span className="font-mono-code text-[11px] font-bold text-[#4c5b71] ml-2">
                {completionPercentage}% COMPLETE
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
                const isCompleted = !isFirstDay && dayNum <= completedDays;
                const isCurrent = dayNum === currentDay;
                const isMilestone = dayNum % 10 === 0;
                const reportId = isMilestone ? dayNum / 10 : 0;
                const reportDef = isMilestone ? REPORT_LIST.find((r) => r.id === reportId) : undefined;

                return (
                  <button
                    key={dayNum}
                    onClick={() => {
                      if (isMilestone && reportDef) {
                        const isUnlocked = completedDays >= dayNum;
                        setSelectedReportModal({
                          reportId,
                          reportDef,
                          isUnlocked,
                        });
                      } else if (dayNum <= currentDay) {
                        onNavigate(`/day/${dayNum}`);
                      }
                    }}
                    title={
                      isMilestone
                        ? isCompleted
                          ? `Day ${dayNum}: Report Milestone Available`
                          : `Day ${dayNum}: Report Milestone Locked`
                        : isCompleted
                        ? `Day ${dayNum}: Completed`
                        : isCurrent
                        ? `Day ${dayNum}: Active Mission`
                        : `Day ${dayNum}: Upcoming`
                    }
                    className={`
                      aspect-square rounded-lg font-mono-code text-xs font-bold flex flex-col items-center justify-center transition-all relative overflow-hidden
                      ${
                        isMilestone
                          ? isCompleted
                            ? 'bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 text-white border-2 border-amber-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-amber-400/80 z-10'
                            : 'bg-gradient-to-b from-amber-50/90 to-amber-100/70 text-amber-900 border-2 border-dashed border-amber-500/80 shadow-2xs cursor-pointer hover:scale-105 active:scale-95 hover:border-amber-600 hover:shadow-xs'
                          : isCompleted
                          ? 'bg-[#d3e4fe] text-[#0b1c30] border border-[#b1d0fd] hover:bg-[#c2d9fc] cursor-pointer hover:scale-105 active:scale-95 shadow-2xs'
                          : isCurrent
                          ? 'bg-[#4c5b71] text-white shadow-sm ring-2 ring-[#4c5b71] ring-offset-2 ring-offset-white cursor-pointer scale-105 z-10'
                          : 'bg-[#f1f3f5] text-slate-400 border border-slate-200/50 cursor-not-allowed hover:bg-slate-200/60 transition-colors'
                      }
                    `}
                  >
                    {isMilestone ? (
                      isCompleted ? (
                        dayNum === 60 ? (
                          <div className="flex flex-col items-center justify-center gap-0.5">
                            <Trophy className="w-4 h-4 text-amber-100 stroke-[2.2] filter drop-shadow-xs" />
                            <span className="text-[10px] font-black leading-none text-white">60</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-0.5">
                            <Award className="w-4 h-4 text-amber-100 stroke-[2.2] filter drop-shadow-xs" />
                            <span className="text-[10px] font-black leading-none text-white">{dayNum}</span>
                          </div>
                        )
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          {dayNum === 60 ? (
                            <Trophy className="w-3.5 h-3.5 text-amber-600 stroke-[2.2]" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                          )}
                          <span className="text-[10px] font-black text-amber-900 leading-none">{dayNum}</span>
                        </div>
                      )
                    ) : isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    ) : (
                      <span className={isCurrent ? 'font-extrabold text-white text-xs' : 'font-semibold text-slate-400 text-[11px]'}>{dayNum}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grid Legend */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#d3e4fe] inline-block" />
                <span>Completed ({completedDays})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4c5b71] inline-block" />
                <span>Active (Day {currentDay})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600 stroke-[2.2]" />
                <span className="font-bold text-amber-900">Report</span>
              </div>
            </div>
          </div>
        </section>

            {/* 6. RECENT BADGES (Mobile view) */}
            <section className="lg:hidden space-y-2.5 pt-1">
              <h3 className="text-base font-bold text-[#191c1e]">
                Recent Badges
              </h3>

              <div className="flex flex-wrap gap-2">
                <div className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                    First Commit
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                    7 Day Streak
                  </span>
                </div>

                <div className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-[#4c5b71] fill-[#4c5b71]" />
                  <span className="font-mono-code text-xs font-semibold text-[#191c1e]">
                    10 Builds
                  </span>
                </div>

                <div className="bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-60">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono-code text-xs font-semibold text-slate-500">
                    30 Day Streak
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

      </main>

      {/* REPORT MILESTONE BOTTOM SHEET PREVIEW MODAL */}
      {selectedReportModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedReportModal(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 border border-slate-200 shadow-xl space-y-4 animate-in slide-in-from-bottom duration-200 mb-14 sm:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedReportModal.isUnlocked ? (
              /* UNLOCKED REPORT PREVIEW */
              <>
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono-code text-[10px] font-extrabold text-[#4c5b71] uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {selectedReportModal.reportDef.isFinal ? 'FINAL REPORT' : 'CERTIFICATE / REPORT'}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#191c1e]">
                      {selectedReportModal.reportDef.isFinal
                        ? 'ABTalks Final Project Report'
                        : `Progress Report 0${selectedReportModal.reportId}`}
                    </h3>
                    <p className="font-mono-code text-xs font-bold text-slate-500 pt-0.5">
                      {selectedReportModal.reportDef.periodLabel}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedReportModal(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs">
                  <p className="text-slate-700 font-medium italic">
                    “{selectedReportModal.reportDef.subtitle}”
                  </p>
                  <div className="pt-1 flex items-center justify-between font-mono-code font-bold text-slate-600 text-[11px]">
                    <span>{selectedReportModal.reportDef.buildsCount} Builds</span>
                    <span>•</span>
                    <span>{selectedReportModal.reportDef.githubCommits} Commits</span>
                    <span>•</span>
                    <span>{selectedReportModal.reportDef.linkedinPosts} Posts</span>
                  </div>
                  <div className="pt-1 flex items-center gap-1.5 text-emerald-700 font-mono-code font-bold text-[11px]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Status: Completed & Verified</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      const id = selectedReportModal.reportId;
                      setSelectedReportModal(null);
                      onNavigate(`/reports/${id}`);
                    }}
                    className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
                  >
                    <span>View Report →</span>
                  </button>

                  <button
                    onClick={() => {
                      const id = selectedReportModal.reportId;
                      setSelectedReportModal(null);
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('abtalks_auto_print', 'true');
                      }
                      onNavigate(`/reports/${id}`);
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </>
            ) : (
              /* LOCKED REPORT PREVIEW */
              <>
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#191c1e]">
                        Progress Report 0{selectedReportModal.reportId}
                      </h3>
                      <p className="font-mono-code text-xs font-bold text-slate-500">
                        {selectedReportModal.reportDef.periodLabel}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReportModal(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-center space-y-1">
                  <p className="text-xs font-bold text-[#191c1e]">
                    “Complete Day {selectedReportModal.reportDef.requiredCompletedDays} to unlock your report.”
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Turn every 10 completed challenge days into a verified progress document.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => setSelectedReportModal(null)}
                    className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center cursor-pointer min-h-[44px]"
                  >
                    Got it
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* STREAK SAVER CONFIRMATION MODAL */}
      {isConfirmModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-xl border border-slate-200 space-y-4 text-center relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#4c5b71]">
              <Shield className="w-6 h-6 text-[#4c5b71]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-[#191c1e]">
                Protect your streak?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                You have {streakSaversRemaining} Streak Saver{streakSaversRemaining !== 1 ? 's' : ''} for your entire 60-day challenge.
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Use one to keep your current streak alive.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-around text-xs font-bold text-[#191c1e]">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>🔥 {streakDays} Day Streak</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 text-[#4c5b71]">
                <Shield className="w-4 h-4" />
                <span>🛡 {streakSaversRemaining} Streak Saver{streakSaversRemaining !== 1 ? 's' : ''} remaining</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleConfirmUseStreakSaver}
                className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all cursor-pointer active:scale-[0.99] min-h-[44px]"
              >
                Use Streak Saver
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer min-h-[40px]"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FIXED BOTTOM NAVIGATION (Hidden on Desktop) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex justify-around items-center max-w-md mx-auto shadow-lg">
        {/* HOME (ACTIVE) */}
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
          onClick={() => onNavigate('/progress')}
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
