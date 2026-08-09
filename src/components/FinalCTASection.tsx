import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface FinalCTASectionProps {
  onStartChallenge: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onStartChallenge }) => {
  return (
    <section className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="clay-card-deep p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-slate-200 rounded-full blur-2xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50 pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 mb-4 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
            READY TO BUILD?
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1e293b] tracking-tight mb-3">
          Start your 60-day journey.
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xs sm:max-w-md mx-auto mb-6 leading-relaxed">
          Build every day. Make your work visible. Finish your project. Earn your ABTalks Completion Certificate.
        </p>

        <button
          onClick={onStartChallenge}
          className="w-full sm:w-auto clay-btn-primary px-8 py-3.5 rounded-full font-bold text-base inline-flex items-center justify-center gap-2 group cursor-pointer active:scale-98 transition-all"
        >
          <span>Start Your Challenge</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] font-mono-code text-slate-500 mt-4">
          60 days • 1 project • 1 completion certificate
        </p>
      </div>
    </section>
  );
};
