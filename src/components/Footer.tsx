import React from 'react';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const handleScrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white py-8 px-4 mt-8">
      <div className="max-w-md md:max-w-2xl mx-auto flex flex-col items-center justify-center text-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#4c5b71] text-white flex items-center justify-center font-bold text-xs">
            AB
          </div>
          <span className="font-extrabold text-base text-[#1e293b]">ABTalks</span>
        </div>

        <p className="text-xs font-semibold text-slate-600 tracking-wide">
          “Build. Ship. Prove.”
        </p>

        {/* Links */}
        <div className="flex items-center gap-5 text-xs font-semibold text-[#4c5b71] mt-1">
          <button
            onClick={handleScrollToHowItWorks}
            className="hover:underline transition-all cursor-pointer min-h-[32px] flex items-center"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('/auth')}
            className="hover:underline transition-all cursor-pointer min-h-[32px] flex items-center"
          >
            Challenge
          </button>
          <button
            onClick={() => handleNavClick('/auth')}
            className="hover:underline transition-all cursor-pointer min-h-[32px] flex items-center"
          >
            Sign in
          </button>
        </div>

        <p className="text-[11px] font-mono-code text-slate-400 mt-2">
          © 2026 ABTalks • Free 60-Day Coding Challenge
        </p>
      </div>
    </footer>
  );
};
