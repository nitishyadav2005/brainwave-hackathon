import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-8 px-4 mt-8">
      <div className="max-w-md md:max-w-2xl mx-auto flex flex-col items-center justify-center text-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#4c5b71] text-white flex items-center justify-center font-bold text-xs">
            AB
          </div>
          <span className="font-extrabold text-base text-[#1e293b]">ABTalks</span>
        </div>

        <p className="text-xs text-slate-500 max-w-xs">
          The 60-Day Coding Challenge platform built for Indian college students to turn daily consistency into visible proof of work.
        </p>

        <div className="flex items-center gap-4 text-[11px] font-mono-code text-slate-400 mt-2">
          <span>© 2026 ABTalks</span>
          <span>•</span>
          <span>Build Every Day</span>
          <span>•</span>
          <span>Proof of Work</span>
        </div>
      </div>
    </footer>
  );
};
