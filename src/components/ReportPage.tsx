import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Flame,
  Download,
  Share2,
  Lock,
  Code2,
  Check,
  FileText,
  User,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types';
import { getEffectiveUserProgress } from '../utils/userProgress';
import { REPORT_LIST, getChallengeDaysForReport, ReportDef } from '../data/reportsData';

interface ReportPageProps {
  reportId: number;
  user: UserProfile | null;
  onNavigate: (route: string) => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ reportId, user, onNavigate }) => {
  const progress = getEffectiveUserProgress(user);
  const userCompletedDays = progress.completedDays;

  // Find report definition
  const report: ReportDef =
    REPORT_LIST.find((r) => r.id === reportId) || REPORT_LIST[0];

  const isUnlocked = userCompletedDays >= report.requiredCompletedDays;

  // Reflection state with local storage persistence
  const storageKey = `abtalks_report_${report.id}_reflection`;
  const [reflectionText, setReflectionText] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(storageKey) || '';
    }
    return '';
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Share button state
  const [shareCopied, setShareCopied] = useState(false);

  // Auto-print effect when requested from preview modal
  useEffect(() => {
    if (typeof window !== 'undefined' && isUnlocked) {
      if (sessionStorage.getItem('abtalks_auto_print') === 'true') {
        sessionStorage.removeItem('abtalks_auto_print');
        const timer = setTimeout(() => {
          window.print();
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [isUnlocked]);

  const studentName = user?.name || 'Nitish';
  const studentCollege = user?.college || 'ABES Engineering College';
  const studentTrack = user?.track || 'Full Stack Development';

  const daysList = getChallengeDaysForReport(report.startDay, report.endDay);

  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReflectionText(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, val);
      setReflectionSaved(true);
      setTimeout(() => setReflectionSaved(false), 2000);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareText = `I just completed ${report.isFinal ? '60' : '10'} days of the ABTalks 60-Day Coding Challenge.\n\n${report.buildsCount} builds.\n${report.githubCommits} GitHub commits.\n${report.linkedinPosts} LinkedIn posts.\n\n${report.periodLabel} complete.\n\n#ABTalks #60DayChallenge #BuildInPublic`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `ABTalks - ${report.title}`,
          text: shareText,
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // IF REPORT IS LOCKED
  if (!isUnlocked) {
    const daysNeeded = report.requiredCompletedDays - userCompletedDays;
    return (
      <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans p-4 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center shadow-xs">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono-code text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-3 py-1 rounded-full inline-block">
            LOCKED REPORT
          </span>
          <h1 className="text-xl font-extrabold text-[#191c1e]">
            {report.title} is Locked
          </h1>
          <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto leading-relaxed">
            Complete Day {report.requiredCompletedDays} to unlock this report. ({daysNeeded} more day{daysNeeded > 1 ? 's' : ''} to go!)
          </p>
        </div>

        <button
          onClick={() => onNavigate('/dashboard')}
          className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-36 selection:bg-[#4c5b71]/15 overflow-x-hidden">
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          textarea {
            border: none !important;
            resize: none !important;
            padding: 0 !important;
            background: transparent !important;
          }
        }
      `}</style>

      {/* TOP STICKY HEADER (NO-PRINT) */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between max-w-md mx-auto shadow-xs">
        <button
          onClick={() => onNavigate('/dashboard')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#4c5b71] hover:text-[#191c1e] transition-colors cursor-pointer py-1.5 px-2 -ml-2 rounded-lg hover:bg-slate-100 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <span className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] tracking-wider uppercase">
            ABTalks Report 0{report.id}
          </span>
        </div>

        <button
          onClick={handleDownload}
          className="p-2 text-slate-600 hover:text-[#191c1e] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
          title="Print or Save PDF"
        >
          <Download className="w-4 h-4" />
        </button>
      </header>

      {/* MAIN REPORT CONTAINER */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-5 print-container">
        
        {/* DOCUMENT HEADER / BRANDING */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4 print-card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-[#191c1e]">
                ABTalks
              </span>
              <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                VERIFIED REPORT
              </span>
            </div>
            <span className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
              {report.periodLabel}
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-[#191c1e] leading-snug">
              {report.title}
            </h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {report.subtitle}
            </p>
          </div>

          {/* PROJECT INFORMATION METADATA */}
          <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block">
                  Student
                </span>
                <span className="font-extrabold text-[#191c1e] flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-500" /> {studentName}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block">
                  Track
                </span>
                <span className="font-extrabold text-[#191c1e] flex items-center gap-1 truncate">
                  <Code2 className="w-3 h-3 text-slate-500" /> {studentTrack}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-2 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block">
                  College
                </span>
                <span className="font-medium text-slate-700 flex items-center gap-1 truncate">
                  <GraduationCap className="w-3 h-3 text-slate-500" /> {studentCollege}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block">
                  Challenge
                </span>
                <span className="font-medium text-slate-700 truncate">
                  ABTalks 60-Day
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* REPORT SUMMARY STATS */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 print-card">
          <h2 className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
            REPORT SUMMARY
          </h2>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-emerald-50 border border-emerald-200/80 p-3 rounded-xl space-y-0.5">
              <span className="font-extrabold text-lg text-emerald-900 block">
                {report.buildsCount} / {report.buildsCount}
              </span>
              <span className="font-mono-code text-[10px] font-bold text-emerald-700 uppercase block">
                DAYS COMPLETED
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl space-y-0.5">
              <span className="font-extrabold text-lg text-amber-900 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {report.streak} DAYS
              </span>
              <span className="font-mono-code text-[10px] font-bold text-amber-700 uppercase block">
                STREAK MAINTAINED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono-code">
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-base font-extrabold text-[#191c1e] block">
                {report.buildsCount}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase">
                BUILDS
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-base font-extrabold text-[#191c1e] block">
                {report.githubCommits}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase">
                COMMITS
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-base font-extrabold text-[#191c1e] block">
                {report.linkedinPosts}
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase">
                POSTS
              </span>
            </div>
          </div>
        </div>

        {/* PROJECTS & BUILDS SECTION */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3.5 print-card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
              PROJECTS & BUILDS
            </h2>
            <span className="font-mono-code text-[10px] text-slate-400 font-bold">
              DAYS 0{report.startDay} – {report.endDay < 10 ? '0' + report.endDay : report.endDay}
            </span>
          </div>

          <div className="space-y-3">
            {daysList.map((item) => (
              <div
                key={item.day}
                className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[10px] font-bold bg-[#4c5b71] text-white px-2 py-0.5 rounded">
                    DAY {item.day < 10 ? `0${item.day}` : item.day}
                  </span>
                  <span className="font-mono-code text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> Verified
                  </span>
                </div>

                <h3 className="text-xs font-extrabold text-[#191c1e]">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 pt-1 font-mono-code text-[10px] text-slate-500">
                  <span className="truncate text-slate-600 underline">
                    GitHub: abtalks-day{item.day < 10 ? `0${item.day}` : item.day}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS PRACTICED SECTION */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 print-card">
          <h2 className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
            SKILLS PRACTICED
          </h2>

          <div className="flex flex-wrap gap-1.5 font-mono-code text-xs font-bold">
            {report.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* PROOF OF WORK TABLE / LIST */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 print-card">
          <h2 className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
            PROOF OF WORK
          </h2>

          <div className="space-y-1.5 font-mono-code text-xs">
            {daysList.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between py-1.5 px-3 bg-slate-50 rounded-lg border border-slate-100"
              >
                <span className="font-bold text-slate-700">
                  Day {item.day < 10 ? `0${item.day}` : item.day}
                </span>

                <div className="flex items-center gap-2 text-[10px] font-bold">
                  <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    GitHub <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    LinkedIn <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REFLECTION SECTION ("WHAT I LEARNED") */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 print-card">
          <div className="flex items-center justify-between">
            <h2 className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
              WHAT I LEARNED
            </h2>
            {reflectionSaved && (
              <span className="font-mono-code text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Saved ✓
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 font-medium">
            What did you learn during these {report.isFinal ? '60' : '10'} days? Write your personal notes below:
          </p>

          <textarea
            value={reflectionText}
            onChange={handleReflectionChange}
            placeholder="Write a few things you learned, struggled with, or improved during these days..."
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-[#191c1e] font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4c5b71] transition-all"
          />
        </div>

        {/* REPORT ACHIEVEMENT BADGE */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 shadow-xs text-center space-y-2 print-card">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-base font-extrabold text-emerald-950">
              {report.isFinal ? '60 Days Completed!' : '10 Days Completed.'}
            </h3>
            <p className="text-xs text-emerald-800 font-medium">
              You didn't just learn. You built in public.
            </p>
          </div>

          <div className="pt-1">
            <span className="font-mono-code text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              {report.streak} DAY STREAK
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS (NO-PRINT) */}
        <div className="no-print space-y-2.5 pt-2">
          {/* Download Report Primary Action */}
          <button
            type="button"
            onClick={handleDownload}
            className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Download Report ↓</span>
          </button>

          {/* Share Report Secondary Action */}
          <button
            type="button"
            onClick={handleShare}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareCopied ? 'Copied ✓' : 'Share Report'}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
