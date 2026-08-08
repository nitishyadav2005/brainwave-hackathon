import React from 'react';
import { ArrowLeft, Code2, Github, ExternalLink, Flame, CheckCircle2, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface DayChallengePageProps {
  dayNumber: number;
  user: UserProfile | null;
  onNavigate: (route: string) => void;
}

export const DayChallengePage: React.FC<DayChallengePageProps> = ({ dayNumber, user, onNavigate }) => {
  const isCompleted = dayNumber < 12;

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

          <span className="font-mono-code text-xs font-extrabold text-[#4c5b71] uppercase tracking-wider">
            DAY {dayNumber} OF 60
          </span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-5">
        {/* Challenge Header Card */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase font-mono-code">
              Medium Challenge
            </span>
            <span className="text-xs font-mono-code font-bold text-slate-500">
              Est. 60–90 min
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#191c1e] leading-snug">
            {dayNumber === 12
              ? 'Build something useful with an API'
              : `Day ${dayNumber} Coding Challenge`}
          </h1>

          <p className="text-xs text-slate-600 leading-relaxed">
            Connect to a public REST or GraphQL API (e.g. GitHub API, Weather API, or Gemini API), format the data cleanly, and build an interactive UI widget or mini tool that provides value to users.
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs font-mono-code text-slate-600">
            <span className="px-2 py-1 bg-slate-100 rounded text-[11px]">#FullStack</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[11px]">#APIs</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[11px]">#ProofOfWork</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-[#191c1e] flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#4c5b71]" />
            <span>Submission Guidelines</span>
          </h2>

          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
            <li>Create a new repository or directory for Day {dayNumber}.</li>
            <li>Commit your working code to GitHub with message: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] font-mono-code">"Day {dayNumber}: API integration"</code>.</li>
            <li>Post a screenshot or short video demo on LinkedIn tagging #ABTalks #60DaysOfCode.</li>
          </ul>
        </div>

        {/* Proof Submission Action */}
        <div className="bg-[#4c5b71] text-white rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="text-sm font-bold">Lock in Day {dayNumber} Proof</h3>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            Once submitted on GitHub and LinkedIn, mark this day as complete to maintain your 11-day active streak!
          </p>

          {isCompleted ? (
            <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-3 flex items-center gap-2 text-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Day {dayNumber} verified & locked in!</span>
            </div>
          ) : (
            <button
              onClick={() => {
                alert(`Day ${dayNumber} marked as submitted! Great job maintaining your streak.`);
                onNavigate('/dashboard');
              }}
              className="w-full bg-white text-[#4c5b71] hover:bg-slate-50 font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Submit Proof of Work</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
