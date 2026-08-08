import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface FinalCTASectionProps {
  onStartChallenge: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onStartChallenge }) => {
  return (
    <section className="px-4 py-8 max-w-md md:max-w-2xl mx-auto">
      <div className="clay-card-deep p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-slate-200 rounded-full blur-2xl opacity-40" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50" />

        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 mx-auto flex items-center justify-center mb-4 text-[#4c5b71] shadow-xs">
          <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] tracking-tight mb-2">
          Your 60 days start with Day 01.
        </h2>

        <p className="text-sm text-slate-600 max-w-xs sm:max-w-md mx-auto mb-6">
          One small build today. A stronger portfolio 60 days from now.
        </p>

        <button
          onClick={onStartChallenge}
          className="w-full sm:w-auto clay-btn-primary px-8 py-3.5 rounded-full font-bold text-base inline-flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Start Day 01</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] font-mono-code text-slate-400 mt-4">
          Free for Indian college students • No credit card required
        </p>
      </div>
    </section>
  );
};
