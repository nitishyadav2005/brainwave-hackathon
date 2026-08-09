import React from 'react';
import { Shield, Clock, ArrowRight, CheckCircle2, Award } from 'lucide-react';

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
          Miss a day. Need more time. Life happens. ABTalks gives you a little room without losing the structure of the challenge.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* CARD 1 — STREAK SAVER */}
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
              Miss a day? Use a Streak Saver to protect your active coding streak.
            </p>

            {/* Visual Counter Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/90 border border-amber-200/80 text-amber-900 font-mono-code text-xs font-extrabold mb-4">
              <span>🛡 3</span>
              <span className="text-amber-700 font-semibold text-[11px]">available</span>
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
            Streak Savers protect your streak. They do not add extra challenge days.
          </p>
        </div>

        {/* CARD 2 — 5-DAY GRACE */}
        <div className="clay-card-shallow p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all relative overflow-hidden">
          <div>
            {/* Top Label & Icon */}
            <div className="flex items-center justify-between mb-3.5">
              <span className="font-mono-code text-[10px] font-bold tracking-widest text-[#505f76] uppercase bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/80">
                PROJECT FINISHING WINDOW
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="font-extrabold text-xl sm:text-2xl text-[#1e293b] mb-2 tracking-tight">
              Need 5 more days?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Complete all 60 challenge days but still need time to finish your project? Use your one-time 5-day grace period.
            </p>

            {/* Compact Step Progression Visual */}
            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 mb-4">
              <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block mb-2">
                5-DAY GRACE TIMELINE
              </span>
              <div className="flex flex-wrap items-center gap-1.5 font-mono-code text-[10px] sm:text-[11px] font-bold text-slate-700">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  DAY 60 <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  5-DAY GRACE
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  GRACE 1 · 2 · 3 · 4 · 5
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                  PROJECT COMPLETE
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-600" /> CERTIFICATE
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-[11px] font-mono-code text-slate-500 pt-3 border-t border-slate-100 leading-normal">
            The challenge remains 60 days. The extra 5 days are only for finishing your project.
          </p>
        </div>
      </div>

      {/* SECTION 5 — MAKE THE DIFFERENCE OBVIOUS STATEMENT */}
      <div className="clay-card-shallow p-5 sm:p-6 text-center bg-slate-100/80 border border-slate-200/90 shadow-xs max-w-2xl mx-auto">
        <p className="text-base sm:text-lg font-extrabold text-[#1e293b] leading-relaxed font-mono-code">
          “60 days to build.<br />
          A little flexibility to finish.<br />
          <span className="text-[#4c5b71]">One project you're proud to ship.”</span>
        </p>
      </div>
    </section>
  );
};
