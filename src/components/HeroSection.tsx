import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartChallenge: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartChallenge }) => {
  return (
    <section className="relative px-4 pt-6 pb-8 max-w-md md:max-w-2xl mx-auto text-center">
      {/* Soft claymorphic hero card background */}
      <div className="clay-card-deep p-6 sm:p-8 relative overflow-hidden">
        {/* Soft subtle glow accents behind content */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-slate-200 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Small Eyebrow Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 shadow-xs mb-5">
          <span className="font-mono-code text-[11px] font-semibold tracking-widest text-[#505f76] uppercase">
            THE 60-DAY CHALLENGE
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-[34px] sm:text-5xl font-extrabold text-[#1e293b] leading-[1.12] tracking-tight mb-5">
          60 days.<br />
          One project.<br />
          <span className="text-[#4c5b71]">Every day.</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs sm:max-w-md mx-auto mb-7">
          Commit to daily creative work. Track your progress, prove your growth, and turn consistent coding into visible proof of work.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-3">
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
    </section>
  );
};
