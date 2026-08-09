import React from 'react';
import { Github, Linkedin, ShieldCheck } from 'lucide-react';

export const ProofOfWorkSection: React.FC = () => {
  return (
    <section id="proof-of-work" className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 mb-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4c5b71]" />
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
            MAKE YOUR WORK VISIBLE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] tracking-tight leading-tight max-w-xl mx-auto">
          Your progress shouldn't disappear after you close your laptop.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          ABTalks turns daily coding into public proof of work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CARD 1 — GITHUB */}
        <div className="clay-card-shallow p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-code text-[11px] font-extrabold tracking-widest text-[#505f76] uppercase flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <Github className="w-4 h-4 text-[#1e293b]" />
                </div>
                GITHUB
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                CODE BASE
              </span>
            </div>
            <h3 className="font-extrabold text-lg sm:text-xl text-[#1e293b] mb-2 tracking-tight">
              “Show what you built.”
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your repository and commit history become a visible record of your consistency.
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-[#4c5b71]">
            <span>Verified commit log</span>
            <span className="text-emerald-6-00 font-bold">✓ PUBLIC PROOF</span>
          </div>
        </div>

        {/* CARD 2 — LINKEDIN */}
        <div className="clay-card-shallow p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-code text-[11px] font-extrabold tracking-widest text-[#505f76] uppercase flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                  <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                </div>
                LINKEDIN
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                PUBLIC BUILD
              </span>
            </div>
            <h3 className="font-extrabold text-lg sm:text-xl text-[#1e293b] mb-2 tracking-tight">
              “Show that you shipped it.”
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Share your build, learnings, or demo and make your progress visible.
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-[#4c5b71]">
            <span>Public accountability</span>
            <span className="text-blue-600 font-bold">✓ SHIPPED DEMO</span>
          </div>
        </div>
      </div>
    </section>
  );
};
