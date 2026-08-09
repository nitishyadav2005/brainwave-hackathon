import React from 'react';
import { Award, Download, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { UserProfile } from '../types';
import { formatFirstName } from '../utils/nameUtils';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  const name = formatFirstName(user?.name) || 'Nitish';
  const track = user?.track || 'Full Stack Development';
  const certDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDownload = () => {
    // Print window or trigger simulated image/PDF download
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-10 border-4 border-slate-900/10 shadow-2xl relative space-y-6 my-auto text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          title="Close Certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Framing Container */}
        <div className="border-2 border-amber-300/80 bg-gradient-to-b from-amber-50/40 via-white to-slate-50/50 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-inner">
          {/* Subtle Watermark Badge */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Branding */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#4c5b71] text-white font-mono-code text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>ABTalks 60-Day Coding Challenge</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] tracking-tight uppercase pt-2">
              COMPLETION CERTIFICATE
            </h1>
          </div>

          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />

          {/* Certificate Body */}
          <div className="space-y-4 py-2">
            <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-widest font-mono-code">
              THIS CERTIFIES THAT
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-[#191c1e] tracking-tight decoration-amber-400/80 underline decoration-2 underline-offset-8">
              {name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed pt-2">
              has successfully completed the <strong>ABTalks 60-Day Coding Challenge</strong>, demonstrating exceptional consistency, discipline, and technical execution.
            </p>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto font-mono-code text-[11px] font-extrabold text-slate-700">
            <div className="bg-white/90 p-3 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[#4c5b71] text-sm">60 / 60 DAYS</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase">COMPLETED</div>
            </div>
            <div className="bg-emerald-50/90 p-3 rounded-xl border border-emerald-200 text-emerald-900 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-emerald-700 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>VERIFIED</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-medium uppercase">PROJECT COMPLETED</div>
            </div>
            <div className="bg-white/90 p-3 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[#4c5b71] text-xs truncate">{track}</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase">TRACK</div>
            </div>
          </div>

          {/* Signature & Date */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200/80 text-left font-mono-code text-[11px] text-slate-500">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Issued On</div>
              <div className="font-bold text-slate-800">{certDate}</div>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Credential</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer min-h-[44px]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
