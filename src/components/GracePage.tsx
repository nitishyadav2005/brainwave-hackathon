import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Github, Linkedin, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { UserProfile } from '../types';
import { getExtensionInfo } from '../utils/userProgress';
import { CertificateModal } from './CertificateModal';

interface GracePageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const GracePage: React.FC<GracePageProps> = ({
  user,
  onNavigate,
  onUpdateUser,
}) => {
  const [extensionInfo, setExtensionInfo] = useState(() => getExtensionInfo(user));
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Local checklist state for user project progress during grace
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('abtalks_grace_checklist');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      finishCode: true,
      pushGithub: true,
      prepareSubmission: false,
    };
  });

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('abtalks_grace_checklist', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleConfirmComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('abtalks_challenge_status', 'completed');
      localStorage.setItem('abtalks_project_completed', 'true');
      localStorage.setItem('abtalks_grace_used', 'true');
      localStorage.setItem('abtalks_extension_used', 'true');

      try {
        const savedUser = localStorage.getItem('abtalks_user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          parsed.challengeStatus = 'completed';
          parsed.projectCompleted = true;
          parsed.gracePeriodUsed = true;
          parsed.extensionUsed = true;
          localStorage.setItem('abtalks_user', JSON.stringify(parsed));
          if (onUpdateUser) {
            onUpdateUser(parsed);
          }
        }
      } catch (e) {
        console.warn('Error saving completed status:', e);
      }
    }

    setExtensionInfo((prev) => ({
      ...prev,
      challengeStatus: 'completed',
      projectCompleted: true,
      gracePeriodUsed: true,
    }));

    setIsConfirmModalOpen(false);
    setIsCertificateOpen(true);
  };

  const daysLeft = extensionInfo.extensionDaysRemaining ?? 5;
  const isCompleted = extensionInfo.projectCompleted || extensionInfo.challengeStatus === 'completed';
  const isExpired = extensionInfo.isExpired || extensionInfo.challengeStatus === 'grace_expired';

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-32 selection:bg-[#4c5b71]/15 overflow-x-hidden">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#4c5b71] hover:text-[#38485d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] tracking-wider uppercase bg-slate-200/80 px-2.5 py-0.5 rounded-md border border-slate-300/60">
              60 / 60 DAYS COMPLETE
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* CASE 1: ALREADY COMPLETED */}
        {isCompleted ? (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 font-extrabold text-2xl shadow-2xs">
              🎉
            </div>

            <div className="space-y-1.5">
              <span className="font-mono-code text-[10px] font-extrabold text-emerald-800 uppercase bg-emerald-100/90 px-3 py-1 rounded-md border border-emerald-200 inline-block tracking-wider">
                CHALLENGE COMPLETE
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                60 days. You finished what you started.
              </h1>
              <p className="text-xs sm:text-sm text-emerald-900/80 font-medium max-w-md mx-auto leading-relaxed pt-1">
                Congratulations on completing your project and finishing the 60-Day ABTalks Coding Challenge!
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Get My Completion Certificate →</span>
              </button>
              <button
                onClick={() => onNavigate('/dashboard')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer min-h-[44px]"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : isExpired ? (
          /* CASE 2: GRACE EXPIRED */
          <div className="bg-slate-100 border border-slate-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 text-center animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 border border-slate-300 flex items-center justify-center mx-auto text-slate-600 font-extrabold text-xl shadow-2xs">
              ⏳
            </div>

            <div className="space-y-1">
              <span className="font-mono-code text-[10px] font-extrabold text-slate-700 uppercase bg-slate-200 px-3 py-1 rounded-md border border-slate-300 inline-block tracking-wider">
                CHALLENGE WINDOW CLOSED
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-1">
                Your 5-day grace period has ended.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
                Your 60-day progress is saved and your completed project submissions remain accessible anytime.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => onNavigate('/dashboard')}
                className="px-6 py-3 rounded-xl bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                Back to Dashboard →
              </button>
            </div>
          </div>
        ) : (
          /* CASE 3: ACTIVE 5-DAY GRACE PERIOD */
          <>
            {/* HERO HERO BANNER */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-300/80 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono-code text-[11px] font-extrabold text-amber-900 uppercase bg-amber-100 px-3 py-1 rounded-md border border-amber-200 tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  <span>FINAL 5 DAYS</span>
                </span>

                <span className="font-mono-code text-xs font-extrabold text-amber-950 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300">
                  ONE-TIME GRACE PERIOD
                </span>
              </div>

              <div className="space-y-2 text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] tracking-tight">
                  Finish what you started.
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Your 60-day challenge is complete. You have 5 extra days to finish your project.
                </p>
              </div>

              {/* DYNAMIC COUNTDOWN & STATS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-amber-50/90 p-4 rounded-2xl border border-amber-200 text-center space-y-0.5 shadow-2xs">
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-mono-code">
                    {daysLeft}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono-code font-bold text-amber-800 uppercase tracking-wider">
                    DAY{daysLeft !== 1 ? 'S' : ''} LEFT
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-0.5 shadow-2xs">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#191c1e] font-mono-code">
                    60 / 60
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono-code font-bold text-slate-500 uppercase tracking-wider">
                    CHALLENGE DAYS COMPLETE
                  </div>
                </div>
              </div>

              {/* GRACE TIME PROGRESS BAR */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between font-mono-code text-[10px] font-extrabold text-amber-900">
                  <span>GRACE TIME ELAPSED</span>
                  <span>{5 - daysLeft + 1} / 5 DAYS</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden border border-amber-200">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((5 - daysLeft + 1) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </section>

            {/* YOUR PROJECT FINISHING AREA */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
              <div className="space-y-1 text-left">
                <span className="font-mono-code text-[10px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
                  PROJECT CHECKLIST
                </span>
                <h2 className="text-xl font-extrabold text-[#191c1e]">
                  YOUR PROJECT
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Use these final days to finish your project.
                </p>
              </div>

              {/* COMPACT CHECKLIST */}
              <div className="space-y-2.5 pt-1">
                <div
                  onClick={() => toggleChecklist('finishCode')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checklist.finishCode
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                        checklist.finishCode
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-400 bg-white'
                      }`}
                    >
                      {checklist.finishCode && '✓'}
                    </div>
                    <span className="text-xs font-extrabold">Finish the project</span>
                  </div>
                  <span className="font-mono-code text-[10px] font-semibold text-slate-400">Step 1</span>
                </div>

                <div
                  onClick={() => toggleChecklist('pushGithub')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checklist.pushGithub
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                        checklist.pushGithub
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-400 bg-white'
                      }`}
                    >
                      {checklist.pushGithub && '✓'}
                    </div>
                    <span className="text-xs font-extrabold">Push the final code to GitHub</span>
                  </div>
                  <span className="font-mono-code text-[10px] font-semibold text-slate-400">Step 2</span>
                </div>

                <div
                  onClick={() => toggleChecklist('prepareSubmission')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    checklist.prepareSubmission
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                        checklist.prepareSubmission
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-400 bg-white'
                      }`}
                    >
                      {checklist.prepareSubmission && '✓'}
                    </div>
                    <span className="text-xs font-extrabold">Prepare your final submission</span>
                  </div>
                  <span className="font-mono-code text-[10px] font-semibold text-slate-400">Step 3</span>
                </div>
              </div>

              {/* MAIN ACTION CTA */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <span>Mark Project Complete →</span>
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* CONFIRMATION MODAL */}
      {isConfirmModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-200 mb-14 sm:mb-0 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 text-xl font-extrabold shadow-2xs">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#191c1e]">Ready to finish?</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed px-2">
                You're about to complete your ABTalks 60-Day Coding Challenge. You'll receive your completion certificate after confirmation.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleConfirmComplete}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.99] min-h-[44px]"
              >
                Complete Challenge & Get Certificate
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer min-h-[40px]"
              >
                Not Yet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        user={user}
      />
    </div>
  );
};
