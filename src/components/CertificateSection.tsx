import React from 'react';
import { Award, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock } from 'lucide-react';

interface CertificateSectionProps {
  onStartChallenge: () => void;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({ onStartChallenge }) => {
  return (
    <section id="certificate" className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 mb-2.5 shadow-xs">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
            FINISH WITH PROOF
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e293b] tracking-tight leading-tight max-w-xl mx-auto">
          60 days of work.<br />
          One project.<br />
          <span className="text-[#4c5b71]">A certificate to prove you finished.</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-md mx-auto leading-relaxed">
          Complete all 60 challenge days and finish your project to earn your ABTalks Completion Certificate.
        </p>
      </div>

      {/* Main Grid Layout: Certificate Preview + Requirements & Grace Connection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN (Lg: 7 cols) — CERTIFICATE PREVIEW CARD */}
        <div className="lg:col-span-7 clay-card-shallow p-5 sm:p-7 relative overflow-hidden flex flex-col justify-between border border-slate-200/80">
          {/* Subtle Watermark Decorative Glow */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            {/* Certificate Header Banner */}
            <div className="border border-amber-300/80 bg-gradient-to-b from-amber-50/50 via-white to-slate-50/60 rounded-2xl p-5 sm:p-6 text-center space-y-4 shadow-xs relative">
              <div className="inline-flex items-center gap-1.5 bg-[#4c5b71] text-white font-mono-code text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Award className="w-3 h-3 text-amber-300" />
                <span>ABTALKS</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#1e293b] uppercase tracking-wider font-mono-code">
                  COMPLETION CERTIFICATE
                </h3>
                <div className="w-16 h-0.5 bg-amber-400 mx-auto rounded-full mt-2" />
              </div>

              <div className="py-2 space-y-1">
                <p className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase tracking-widest">
                  THIS CERTIFIES THAT
                </p>
                <div className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-tight underline decoration-amber-400 decoration-2 underline-offset-4">
                  Nitish Kumar
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 max-w-xs mx-auto leading-relaxed pt-1.5">
                  has successfully completed the <strong className="text-slate-800">60-DAY CODING CHALLENGE</strong> and completed their project.
                </p>
              </div>

              {/* Certificate Metric Badges */}
              <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto pt-1 font-mono-code text-[11px]">
                <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-[#4c5b71]">60 / 60 DAYS</div>
                  <div className="text-[9px] text-slate-400 uppercase font-medium">CHALLENGE</div>
                </div>
                <div className="bg-emerald-50 p-2 sm:p-2.5 rounded-xl border border-emerald-200 text-emerald-900 shadow-2xs">
                  <div className="font-bold text-emerald-700 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    <span>DONE</span>
                  </div>
                  <div className="text-[9px] text-emerald-600 uppercase font-medium">PROJECT COMPLETED</div>
                </div>
              </div>

              {/* Footer Verification Row */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono-code text-slate-500">
                <span>Official Credential</span>
                <span className="font-bold text-slate-800">ABTalks Verified</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono-code text-slate-500 text-center mt-4">
            Official ABTalks digital credential issued upon project completion.
          </p>
        </div>

        {/* RIGHT COLUMN (Lg: 5 cols) — REQUIREMENTS & GRACE CONNECTION */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Certificate Requirements Box */}
          <div className="clay-card-shallow p-5 sm:p-6 space-y-3.5 border border-slate-200/80">
            <h4 className="font-mono-code text-xs font-extrabold text-[#1e293b] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>To receive the certificate:</span>
            </h4>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Complete all 60 challenge days</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Complete your project</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Submit your final project</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onStartChallenge}
                className="w-full clay-btn-primary py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer group active:scale-98 transition-all"
              >
                <span>Get your Completion Certificate</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 5-Day Grace Connection Card */}
          <div className="clay-card-shallow p-5 sm:p-6 bg-slate-50/90 border border-slate-200/90 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-mono-code text-[11px] font-bold text-[#1e293b] uppercase">
                5-Day Grace Compatibility
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Need more time to finish your project? Use your one-time 5-day grace period and complete your project within the extra 5 days.
            </p>

            {/* Timeline Flow Visual */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 font-mono-code text-[10px] sm:text-[11px] font-bold text-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  60 DAYS ✓
                </span>
                <span className="text-slate-300">+</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  UP TO 5 GRACE DAYS
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800">
                  PROJECT COMPLETE
                </span>
                <span className="text-slate-300">↓</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 flex items-center gap-1">
                  🏆 CERTIFICATE
                </span>
              </div>
            </div>

            <p className="text-[10px] font-mono-code text-slate-500 leading-normal pt-1">
              The official challenge remains 60 days. The grace period does NOT turn the challenge into a 65-day challenge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
