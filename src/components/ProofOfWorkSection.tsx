import React from 'react';
import { Github, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';

export const ProofOfWorkSection: React.FC = () => {
  return (
    <section className="px-4 py-6 max-w-md md:max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4c5b71]" />
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
            DUAL SIGNAL VERIFICATION
          </span>
        </div>
        <h2 className="text-2xl font-bold text-[#1e293b] tracking-tight">
          Your work should be visible.
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Build every day. Submit the proof. Let your progress speak for itself.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* GitHub Card */}
        <div className="clay-card-shallow p-5 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-code text-[11px] font-bold tracking-widest text-[#505f76] uppercase flex items-center gap-1.5">
                <Github className="w-4 h-4 text-[#1e293b]" />
                GITHUB
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                CODE
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#1e293b] mb-1">
              “Show what you built.”
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Keep your code, commits and progress visible.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-[#4c5b71]">
            <span>Commit history verification</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="clay-card-shallow p-5 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-code text-[11px] font-bold tracking-widest text-[#505f76] uppercase flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                LINKEDIN
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                SHIPPED
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#1e293b] mb-1">
              “Show that you shipped it.”
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Share your build and make your consistency visible.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-[#4c5b71]">
            <span>Public accountability tag</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
