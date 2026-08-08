import React, { useState } from 'react';
import { Menu, User, X, Sparkles, Code2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenTrackModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrackModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f4f6f8]/90 backdrop-blur-md border-b border-slate-200/60 transition-all">
      <div className="max-w-md md:max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: ABTalks Logo Branding */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4c5b71] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
            AB
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#1e293b] select-none">
            ABTalks
          </span>
        </div>

        {/* Right: Small menu / profile style icon */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTrackModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#4c5b71] border border-slate-200 shadow-sm hover:bg-slate-50 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Select Track</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#4c5b71] shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Lightweight Dropdown Menu */}
      {menuOpen && (
        <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 max-w-md md:max-w-4xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-[#f8f9fb] rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#1e293b]">Indian Student Edition</p>
                <p className="text-[11px] text-slate-500">Free 60-Day Challenge Access</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Batch 2026 Open
              </span>
            </div>

            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-[#4c5b71]" />
              Explore 60-Day Tracks
            </button>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#4c5b71]" />
              How Proof of Work Works
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
