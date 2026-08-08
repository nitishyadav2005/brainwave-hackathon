import React, { useState } from 'react';
import { Menu, X, Sparkles, ShieldCheck, LogIn, Rocket } from 'lucide-react';

interface HeaderProps {
  onOpenTrackModal: () => void;
  onNavigate?: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrackModal, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (route: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const handleScrollToHowItWorks = () => {
    setMenuOpen(false);
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#4c5b71] border border-slate-200 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Select Track</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#4c5b71] shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Lightweight Dropdown Menu */}
      {menuOpen && (
        <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 max-w-md md:max-w-4xl mx-auto">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={handleScrollToHowItWorks}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#4c5b71]" />
              How it works
            </button>

            <button
              onClick={() => handleNavClick('/auth')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#4c5b71]" />
              Sign in
            </button>

            <button
              onClick={() => handleNavClick('/auth')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold text-[#4c5b71] bg-slate-100 hover:bg-slate-200/80 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-[#4c5b71]" />
              Start the challenge
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
