import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Github,
  Linkedin,
  Loader2,
  Home,
  Rocket,
  BarChart2,
  User as UserIcon,
  Flame,
  CheckCircle2,
  Code2,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { formatFirstName } from '../utils/nameUtils';
import { loadUserProfile, saveUserProfile } from '../utils/userProgress';
import { ProofCard } from './ProofCard';

interface DayChallengePageProps {
  dayNumber: number;
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onUpdateUser?: (updatedProfile: UserProfile) => void;
}

export const resetMockChallengeState = () => {
  localStorage.removeItem('abtalks_day12_completed');
  localStorage.removeItem('abtalks_day_12_completed');
  localStorage.removeItem('abtalks_day12_submitted');
  localStorage.removeItem('abtalks_day12_submitted_at');
  localStorage.removeItem('abtalks_progress');
  localStorage.removeItem('abtalks_proof');
  localStorage.removeItem('abtalks_checklist');
  for (let i = 1; i <= 60; i++) {
    localStorage.removeItem(`abtalks_day${i}_completed`);
    localStorage.removeItem(`abtalks_day_${i}_completed`);
    localStorage.removeItem(`abtalks_day${i}_submitted`);
  }
};

if (typeof window !== 'undefined') {
  (window as any).resetMockState = resetMockChallengeState;
}

export const DayChallengePage: React.FC<DayChallengePageProps> = ({
  dayNumber = 12,
  user,
  onNavigate,
  onUpdateUser,
}) => {
  // Check if completed in localStorage (Default MUST be false unless explicitly submitted in current flow)
  const submitFlagKey = `abtalks_day${dayNumber}_submitted`;
  const storageKey = `abtalks_day${dayNumber}_completed`;
  const legacyStorageKey = `abtalks_day_${dayNumber}_completed`;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    const hasBeenSubmitted = localStorage.getItem(submitFlagKey) === 'true';
    if (!hasBeenSubmitted) {
      // Clean stale legacy values from previous test sessions
      localStorage.removeItem(storageKey);
      localStorage.removeItem(legacyStorageKey);
      return false;
    }
    return true;
  });

  // Finish Line Checklist state
  const [checklist, setChecklist] = useState({
    chooseApi: true,
    buildUi: true,
    connectData: false,
    pushGithub: false,
  });

  // Expandable Guidance Accordion state
  const [openGuidance, setOpenGuidance] = useState<number | null>(null);

  // GitHub Proof inputs & status
  const [githubRepo, setGithubRepo] = useState('');
  const [githubCommit, setGithubCommit] = useState('');
  const [githubVerifying, setGithubVerifying] = useState(false);
  const [githubVerified, setGithubVerified] = useState(false);
  const [githubError, setGithubError] = useState('');

  // LinkedIn Proof inputs & status
  const [linkedinPost, setLinkedinPost] = useState('');
  const [linkedinVerifying, setLinkedinVerifying] = useState(false);
  const [linkedinVerified, setLinkedinVerified] = useState(false);
  const [linkedinError, setLinkedinError] = useState('');

  // Calculate items remaining
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const itemsRemaining =
    (4 - checkedCount) +
    (!githubVerified ? 1 : 0) +
    (!linkedinVerified ? 1 : 0);

  const allChecklistDone = checkedCount === 4;
  const canSubmit = itemsRemaining === 0;

  // Toggle checklist item
  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle guidance accordion
  const toggleGuidance = (index: number) => {
    setOpenGuidance((prev) => (prev === index ? null : index));
  };

  // Verify GitHub
  const handleVerifyGithub = () => {
    setGithubError('');
    if (!githubRepo.trim()) {
      setGithubError('Required: Please enter your repository URL');
      return;
    }
    if (!githubCommit.trim()) {
      setGithubError('Required: Please enter your commit URL');
      return;
    }
    if (!githubRepo.includes('github.com')) {
      setGithubError("Couldn't verify this link. Check the URL and try again.");
      return;
    }

    setGithubVerifying(true);
    setTimeout(() => {
      setGithubVerifying(false);
      setGithubVerified(true);
    }, 800);
  };

  // Verify LinkedIn
  const handleVerifyLinkedin = () => {
    setLinkedinError('');
    if (!linkedinPost.trim()) {
      setLinkedinError('Required: Please enter your post URL');
      return;
    }
    if (!linkedinPost.includes('linkedin.com')) {
      setLinkedinError("Couldn't verify this link. Check the URL and try again.");
      return;
    }

    setLinkedinVerifying(true);
    setTimeout(() => {
      setLinkedinVerifying(false);
      setLinkedinVerified(true);
    }, 800);
  };

  // Submit Day 12
  const handleSubmitDay = () => {
    if (!canSubmit) return;
    localStorage.setItem(storageKey, 'true');
    localStorage.setItem(legacyStorageKey, 'true');
    localStorage.setItem(submitFlagKey, 'true');
    const nowIso = new Date().toISOString();
    localStorage.setItem(`abtalks_day${dayNumber}_submitted_at`, nowIso);
    localStorage.setItem('abtalks_last_submission_date', nowIso);

    // Check streak protection status
    const isMissedYesterday = localStorage.getItem('abtalks_missed_yesterday') === 'true';
    const isProtectedYesterday = localStorage.getItem('abtalks_streak_saver_protected_yesterday') === 'true';
    const isStreakBroken = isMissedYesterday && !isProtectedYesterday;

    // Reset state after submission
    localStorage.setItem('abtalks_missed_yesterday', 'false');
    localStorage.setItem('abtalks_streak_saver_protected_yesterday', 'false');

    try {
      const parsedUser = loadUserProfile() || user || ({} as any);
      const currentDayVal = parsedUser.currentDay ?? 1;
      const nextDayVal = Math.min(60, Math.max(currentDayVal, dayNumber + 1));
      const nextCompletedVal = Math.max(parsedUser.completedDays || 0, dayNumber);

      let nextStreakVal: number;
      if (isStreakBroken) {
        nextStreakVal = 1; // Streak broken -> start fresh at 1
      } else {
        const prevStreak = parsedUser.streak || 0;
        nextStreakVal = Math.max(prevStreak + 1, dayNumber);
      }

      const updatedUser: UserProfile = {
        ...parsedUser,
        name: formatFirstName(parsedUser.name),
        email: parsedUser.email || 'nitish@example.com',
        college: parsedUser.college || 'ABES Engineering College',
        track: parsedUser.track || 'Full Stack Development',
        currentDay: nextDayVal,
        streak: nextStreakVal,
        completedDays: nextCompletedVal,
        missedYesterday: false,
        streakSaverProtectedYesterday: false,
        projectCompleted: nextCompletedVal >= 60,
        challengeStatus: nextCompletedVal >= 60 ? 'completed' : 'active',
        isAuthenticated: true,
      };
      saveUserProfile(updatedUser);
      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }
    } catch {
      // ignore JSON errors
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate dynamic completion count & percentage based on dayNumber & completion state
  const currentCompletedCount = isSubmitted
    ? Math.max(user?.completedDays || 0, dayNumber)
    : Math.max(user?.completedDays || 0, dayNumber);
  const completionPercentage = Math.round((dayNumber / 60) * 100);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-36 selection:bg-[#4c5b71]/15 overflow-x-hidden">
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto h-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-1 text-xs font-bold text-[#4c5b71] hover:text-[#38485d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <span className="font-mono-code text-xs font-extrabold text-[#4c5b71] tracking-wider uppercase">
            DAY {dayNumber} / 60
          </span>

          <span className="font-mono-code text-[11px] font-bold text-slate-500">
            {completionPercentage}% COMPLETE
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-md lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-5">
        
        {/* COMPLETED DAY STATE (IF ALREADY SUBMITTED) */}
        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-emerald-200 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <span className="font-mono-code text-[10px] font-bold text-emerald-800 tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                DAY {dayNumber} COMPLETE
              </span>
              <h1 className="text-2xl font-extrabold text-[#191c1e]">
                Day {dayNumber} complete 🎉
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs mx-auto">
                You showed up again. Your {currentCompletedCount}-day streak is alive.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1 text-xs font-mono-code font-bold text-emerald-800">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                GitHub <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                LinkedIn <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            </div>

            {/* Submission Summary Box */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-left space-y-2">
              <p className="text-[11px] font-mono-code font-bold text-slate-500 uppercase">
                View your submission:
              </p>
              <div className="text-xs font-mono-code text-[#4c5b71] space-y-1 truncate">
                <p className="truncate">✓ {githubRepo || `https://github.com/nitish/day${dayNumber}-project`}</p>
                <p className="truncate">✓ {linkedinPost || `https://linkedin.com/posts/nitish-day${dayNumber}`}</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/dashboard')}
              className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <span>Continue to Day {dayNumber + 1} →</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start space-y-5 lg:space-y-0">
            {/* LEFT COLUMN: GUIDANCE & CHECKLIST */}
            <div className="lg:col-span-7 space-y-5">
              {/* 2. MISSION HEADER */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#4c5b71]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] font-bold text-[#4c5b71] tracking-wider uppercase">
                  TODAY'S MISSION
                </span>
                <span className="bg-[#4c5b71] text-white font-mono-code text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  DAY {dayNumber}
                </span>
              </div>

              <h1 className="text-xl font-extrabold text-[#191c1e] leading-snug">
                “Build something useful with an API”
              </h1>

              <p className="text-xs text-slate-600 leading-relaxed">
                Build a small practical project using a public API and turn the data into something people can use.
              </p>

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
            </section>

            {/* 3. MISSION BRIEF: "Your challenge" */}
            <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-3">
              <h2 className="text-base font-bold text-[#191c1e]">
                Your challenge
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Build a small working project that consumes a public API.
              </p>

              <div className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                <div className="flex items-start gap-2">
                  <span className="text-[#4c5b71] font-bold">•</span>
                  <span>Fetch data from an API</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#4c5b71] font-bold">•</span>
                  <span>Display the data clearly</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#4c5b71] font-bold">•</span>
                  <span>Have a usable interface</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#4c5b71] font-bold">•</span>
                  <span>Be pushed to GitHub</span>
                </div>
              </div>
            </section>

            {/* 4. TODAY'S FINISH LINE */}
            <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#191c1e]">
                  Today's finish line
                </h2>
                <span className="text-[11px] font-mono-code font-bold text-[#4c5b71]">
                  {checkedCount}/4 Done
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'chooseApi', label: 'Choose a public API' },
                  { key: 'buildUi', label: 'Build the interface' },
                  { key: 'connectData', label: 'Connect and display API data' },
                  { key: 'pushGithub', label: 'Push your project to GitHub' },
                ].map((item) => {
                  const isChecked = checklist[item.key as keyof typeof checklist];

                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleChecklist(item.key as keyof typeof checklist)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer
                        ${
                          isChecked
                            ? 'bg-slate-50 border-emerald-300 text-slate-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }
                      `}
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors
                          ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }
                        `}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <span
                        className={`text-xs font-semibold ${
                          isChecked ? 'line-through opacity-70' : ''
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 5. BUILD GUIDANCE */}
            <section className="space-y-2.5">
              <h2 className="text-base font-bold text-[#191c1e]">
                Build guidance
              </h2>

              <div className="space-y-2">
                {[
                  {
                    step: '01',
                    title: 'Explore',
                    desc: 'Find an API and understand its response.',
                    detail: 'Search public APIs (e.g. OpenWeather, GitHub REST API, JSONPlaceholder). Test the response using cURL or browser devtools to check data fields.',
                  },
                  {
                    step: '02',
                    title: 'Build',
                    desc: 'Create a simple interface for the data.',
                    detail: 'Set up React components with Tailwind CSS. Design input search boxes or display cards that present the payload cleanly.',
                  },
                  {
                    step: '03',
                    title: 'Connect',
                    desc: 'Fetch and display the API data.',
                    detail: 'Use fetch() or axios inside useEffect/async functions. Handle loading states, error states, and empty response states.',
                  },
                  {
                    step: '04',
                    title: 'Ship',
                    desc: 'Push the finished project to GitHub.',
                    detail: 'Commit your project with a clean README containing screenshots, features, and setup instructions. Push to GitHub.',
                  },
                ].map((g, idx) => {
                  const isOpen = openGuidance === idx;

                  return (
                    <div
                      key={g.step}
                      className="bg-white border border-slate-200/80 rounded-xl overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        onClick={() => toggleGuidance(idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono-code text-xs font-bold text-[#4c5b71] bg-slate-100 px-2 py-0.5 rounded">
                            {g.step}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-[#191c1e]">{g.title}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{g.desc}</p>
                          </div>
                        </div>

                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                          {g.detail}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: PROOF SUBMISSION FORM & PREVIEW */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            {/* 6. PROOF OF WORK */}
            <section className="space-y-3 pt-1">
              <div>
                <h2 className="text-base font-bold text-[#191c1e]">
                  Submit your proof
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Show that you actually shipped today's work.
                </p>
              </div>

              {/* GITHUB CARD */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-[#191c1e] flex items-center gap-1.5">
                    <Github className="w-4 h-4 text-[#191c1e]" />
                    <span>GITHUB</span>
                  </span>

                  {githubVerified && (
                    <span className="text-[11px] font-mono-code font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Verified
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Repository URL
                    </label>
                    <input
                      type="url"
                      value={githubRepo}
                      onChange={(e) => {
                        setGithubRepo(e.target.value);
                        setGithubVerified(false);
                      }}
                      placeholder="https://github.com/username/project"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono-code focus:outline-hidden focus:border-[#4c5b71] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Commit URL
                    </label>
                    <input
                      type="url"
                      value={githubCommit}
                      onChange={(e) => {
                        setGithubCommit(e.target.value);
                        setGithubVerified(false);
                      }}
                      placeholder="https://github.com/username/project/commit/..."
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono-code focus:outline-hidden focus:border-[#4c5b71] bg-slate-50/50"
                    />
                  </div>
                </div>

                {githubError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] font-medium text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{githubError}</span>
                  </div>
                )}

                {githubVerified ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                    <span>✓ GitHub proof verified</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyGithub}
                    disabled={githubVerifying}
                    className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {githubVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Checking GitHub proof…</span>
                      </>
                    ) : (
                      <span>Verify GitHub</span>
                    )}
                  </button>
                )}
              </div>

              {/* LINKEDIN CARD */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-[#191c1e] flex items-center gap-1.5">
                    <Linkedin className="w-4 h-4 text-[#0077b5]" />
                    <span>LINKEDIN</span>
                  </span>

                  {linkedinVerified && (
                    <span className="text-[11px] font-mono-code font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Verified
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Post URL
                  </label>
                  <input
                    type="url"
                    value={linkedinPost}
                    onChange={(e) => {
                      setLinkedinPost(e.target.value);
                      setLinkedinVerified(false);
                    }}
                    placeholder="https://linkedin.com/posts/..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono-code focus:outline-hidden focus:border-[#4c5b71] bg-slate-50/50"
                  />
                </div>

                {linkedinError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] font-medium text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{linkedinError}</span>
                  </div>
                )}

                {linkedinVerified ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                    <span>✓ LinkedIn proof verified</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyLinkedin}
                    disabled={linkedinVerifying}
                    className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {linkedinVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Checking LinkedIn proof…</span>
                      </>
                    ) : (
                      <span>Verify LinkedIn</span>
                    )}
                  </button>
                )}
              </div>
            </section>

            {/* 8. SUBMISSION PROGRESS INDICATOR */}
            <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] tracking-wider uppercase">
                  PROOF STATUS
                </span>
                <span
                  className={`font-mono-code text-[11px] font-bold ${
                    canSubmit ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {canSubmit ? 'Ready to submit' : `${itemsRemaining} items remaining`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono-code font-bold">
                <div
                  className={`p-2 rounded-lg border ${
                    githubVerified
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  GitHub {githubVerified ? '✓' : '○'}
                </div>

                <div
                  className={`p-2 rounded-lg border ${
                    linkedinVerified
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  LinkedIn {linkedinVerified ? '✓' : '○'}
                </div>

                <div
                  className={`p-2 rounded-lg border ${
                    allChecklistDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  Checklist {checkedCount}/4
                </div>
              </div>
            </section>

            {/* 9. SUBMIT DAY BUTTON */}
            <section className="pt-1">
              <button
                type="button"
                disabled={!canSubmit}
                onClick={handleSubmitDay}
                className={`
                  w-full font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer
                  ${
                    canSubmit
                      ? 'bg-[#4c5b71] hover:bg-[#38485d] text-white cursor-pointer active:scale-[0.99]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }
                `}
              >
                <span>Submit Day {dayNumber} →</span>
              </button>
            </section>
          </div>
        </div>
      )}

      </main>

      {/* 10. FIXED BOTTOM NAVIGATION (Hidden on Desktop) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex justify-around items-center max-w-md mx-auto shadow-lg">
        {/* HOME */}
        <button
          onClick={() => onNavigate('/dashboard')}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        {/* CHALLENGE (ACTIVE) */}
        <button
          onClick={() => onNavigate(`/day/${dayNumber}`)}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#4c5b71] cursor-pointer"
        >
          <Rocket className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-0.5">Challenge</span>
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
