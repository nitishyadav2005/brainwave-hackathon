import React from 'react';
import { ArrowRight, Flame, Code2, ShieldCheck, Award } from 'lucide-react';

interface HeroSectionProps {
  onStartChallenge: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartChallenge }) => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-8 w-full max-w-md lg:max-w-6xl mx-auto">
      {/* Soft claymorphic hero card background */}
      <div className="clay-card-deep p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* Soft subtle glow accents behind content */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 shadow-xs mb-5">
              <span className="font-mono-code text-[11px] font-semibold tracking-widest text-[#505f76] uppercase">
                THE 60-DAY CHALLENGE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[34px] sm:text-5xl lg:text-6xl font-extrabold text-[#1e293b] leading-[1.12] tracking-tight mb-5">
              60 days.<br />
              One project.<br />
              <span className="text-[#4c5b71]">Every day.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 mb-7">
              Commit to daily creative work. Track your progress, prove your growth, and turn consistent coding into visible proof of work.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <button
                onClick={onStartChallenge}
                className="w-full sm:w-auto clay-btn-primary px-7 py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Your Challenge</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] font-mono-code text-slate-400 mt-1">
                ⚡ Built for Indian college students
              </p>
            </div>
          </div>

          {/* Right Hero Preview Column (Desktop & Tablet feature preview card) */}
          <div className="hidden lg:block lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-mono-code text-xs font-extrabold text-[#4c5b71] uppercase tracking-wider">
                  60-DAY JOURNEY PREVIEW
                </span>
                <span className="font-mono-code text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  12 DAY STREAK
                </span>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-4 border border-slate-100 space-y-2">
                <span className="text-[10px] font-mono-code font-bold text-slate-400 uppercase block">
                  TODAY'S MISSION (DAY 12)
                </span>
                <h3 className="font-extrabold text-sm text-[#1e293b]">
                  “Build something useful with an API”
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    FULL STACK
                  </span>
                </div>
              </div>

              {/* Mini Journey Grid Preview */}
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-md font-mono-code text-[10px] font-bold flex items-center justify-center ${
                      i + 1 === 10
                        ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-xs'
                        : i + 1 === 12
                        ? 'bg-[#4c5b71] text-white ring-2 ring-[#4c5b71] ring-offset-1'
                        : 'bg-[#d3e4fe] text-[#0b1c30]'
                    }`}
                  >
                    {i + 1 === 10 ? <Award className="w-3 h-3" /> : i + 1}
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center text-xs text-slate-500 font-medium">
                Consistent daily building turns effort into a verified portfolio.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
