import React from 'react';
import { Shield, CheckCircle2, Award } from 'lucide-react';

export const BuiltForRealLifeSection: React.FC = () => {
  return (
    <section id="real-life" className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 mb-2.5">
          <Shield className="w-3.5 h-3.5 text-[#4c5b71]" />
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
            BUILT FOR REAL LIFE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] tracking-tight leading-tight max-w-xl mx-auto">
          Because college doesn't stop for a coding challenge.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
          Miss a day? Life happens. CodeTrack gives you Streak Protection so you keep momentum without losing your hard-earned progress.
        </p>
      </div>

      {/* Feature Card */}
      <div className="max-w-2xl mx-auto mb-8">
        {/* CARD — STREAK SAVER */}
        <div className="clay-card-shallow p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all relative overflow-hidden">
          <div>
            {/* Top Label & Icon */}
            <div className="flex items-center justify-between mb-3.5">
              <span className="font-mono-code text-[10px] font-bold tracking-widest text-[#505f76] uppercase bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/80">
                STREAK PROTECTION
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Shield className="w-4 h-4 fill-amber-500/20 text-amber-600" />
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="font-extrabold text-xl sm:text-2xl text-[#1e293b] mb-2 tracking-tight">
              3 Streak Savers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Miss a day? Use a Streak Saver to protect your active coding streak and keep going.
            </p>

            {/* Visual Counter Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/90 border border-amber-200/80 text-amber-900 font-mono-code text-xs font-extrabold mb-4">
              <span>🛡 3</span>
              <span className="text-amber-700 font-semibold text-[11px]">available per user</span>
            </div>

            {/* Step Progression Visual */}
            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 mb-4">
              <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block mb-2">
                STREAK SAVER FLOW
              </span>
              <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-[10px] sm:text-[11px] font-bold text-slate-700">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  3 available
                </span>
                <span className="text-slate-300">↓</span>
                <span className="text-slate-500 font-normal">use one</span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                  2 remaining
                </span>
                <span className="text-slate-300">↓</span>
                <span className="text-slate-500 font-normal">use again</span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  1 remaining
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200">
                  0 remaining
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-[11px] font-mono-code text-slate-500 pt-3 border-t border-slate-100 leading-normal">
            Streak Savers protect your streak. The challenge remains strictly 60 days.
          </p>
        </div>
      </div>

      {/* STATEMENT */}
      <div className="clay-card-shallow p-5 sm:p-6 text-center bg-slate-100/80 border border-slate-200/90 shadow-xs max-w-2xl mx-auto">
        <p className="text-base sm:text-lg font-extrabold text-[#1e293b] leading-relaxed font-mono-code">
          “60 days of consistent coding.<br />
          Built for real developers.<br />
          <span className="text-[#4c5b71]">One project you're proud to ship.”</span>
        </p>
      </div>
    </section>
  );
};
