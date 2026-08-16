import React, { useState } from 'react';
import { Menu, X, Sparkles, ShieldCheck, LogIn, Rocket, FileCode2 } from 'lucide-react';

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

  const handleScrollToSection = (elementId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f4f6f8]/90 backdrop-blur-md border-b border-slate-200/60 transition-all">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: CodeTrack Logo Branding */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#4c5b71] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
            CT
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#1e293b]">
            CodeTrack
          </span>
        </div>

        {/* Center/Right: Desktop Navigation (Visible on lg: 1024px+) */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleScrollToSection('how-it-works')}
            className="text-xs font-bold text-slate-600 hover:text-[#1e293b] transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button
            onClick={() => handleScrollToSection('proof-of-work')}
            className="text-xs font-bold text-slate-600 hover:text-[#1e293b] transition-colors cursor-pointer"
          >
            Proof of work
          </button>
          <button
            onClick={() => handleNavClick('/dashboard')}
            className="text-xs font-bold text-slate-600 hover:text-[#1e293b] transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={onOpenTrackModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#4c5b71] border border-slate-200 shadow-xs hover:bg-slate-50 transition-all cursor-pointer min-h-[36px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Select Track</span>
          </button>
          <button
            onClick={() => handleNavClick('/auth')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#4c5b71] hover:bg-[#38485d] shadow-xs transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Start Challenge</span>
          </button>
        </nav>

        {/* Mobile / Tablet Controls (Visible below lg: 1024px) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenTrackModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-[#4c5b71] border border-slate-200 shadow-sm hover:bg-slate-50 transition-all cursor-pointer min-h-[36px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Select Track</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#4c5b71] shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer min-h-[40px]"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Lightweight Dropdown Mobile/Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 max-w-md md:max-w-4xl mx-auto">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleScrollToSection('how-it-works')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <ShieldCheck className="w-4 h-4 text-[#4c5b71]" />
              How it works
            </button>

            <button
              onClick={() => handleScrollToSection('proof-of-work')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <FileCode2 className="w-4 h-4 text-[#4c5b71]" />
              Proof of work
            </button>

            <button
              onClick={() => handleNavClick('/dashboard')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <Rocket className="w-4 h-4 text-[#4c5b71]" />
              Dashboard
            </button>

            <button
              onClick={() => handleNavClick('/auth')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <LogIn className="w-4 h-4 text-[#4c5b71]" />
              Sign in
            </button>

            <button
              onClick={() => handleNavClick('/auth')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold text-[#4c5b71] bg-slate-100 hover:bg-slate-200/80 flex items-center gap-2.5 transition-colors cursor-pointer min-h-[44px]"
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
