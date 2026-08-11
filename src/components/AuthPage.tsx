import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Lock, Mail, User, GraduationCap, Code2, AlertCircle } from 'lucide-react';
import { AuthMode, UserProfile } from '../types';
import { formatFirstName } from '../utils/nameUtils';
import { createNewUser, loadUserProfile, saveUserProfile } from '../utils/userProgress';

interface AuthPageProps {
  onNavigate: (route: string) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

const TRACK_OPTIONS = ['Frontend', 'Backend', 'Full Stack', 'Java', 'Data Structures'];

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [successOverlay, setSuccessOverlay] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');

  // Sign In Form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpCollege, setSignUpCollege] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!signInEmail.trim()) {
      newErrors.signInEmail = 'Enter a valid email address.';
    } else if (!validateEmail(signInEmail)) {
      newErrors.signInEmail = 'Enter a valid email address.';
    }

    if (!signInPassword) {
      newErrors.signInPassword = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signInEmail.trim(),
          password: signInPassword,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success && data?.user) {
        const emailClean = data.user.email.toLowerCase().trim();
        let userProfile = loadUserProfile(emailClean);

        if (!userProfile) {
          userProfile = {
            name: formatFirstName(data.user.name),
            email: data.user.email,
            college: data.user.college || 'ABES Engineering College',
            track: data.user.track || 'Full Stack Development',
            currentDay: 1,
            completedDays: 0,
            streak: 0,
            challengeStatus: 'active',
            isAuthenticated: true,
          };
        } else {
          userProfile.name = formatFirstName(data.user.name);
          userProfile.email = data.user.email;
          userProfile.college = data.user.college || userProfile.college;
          userProfile.track = data.user.track || userProfile.track;
          userProfile.isAuthenticated = true;
        }

        saveUserProfile(userProfile);
        setIsLoading(false);
        onLoginSuccess(userProfile);
        onNavigate('/dashboard');
        return;
      }

      setIsLoading(false);
      if (data && typeof data.message === 'string' && data.message.trim() !== '') {
        setErrors({ signInPassword: data.message });
      } else if (res.status === 502 || res.status === 503 || res.status === 504) {
        setErrors({ signInPassword: 'Backend unavailable. Please make sure the backend is running.' });
      } else {
        setErrors({ signInPassword: 'Invalid email or password' });
      }
    } catch {
      setIsLoading(false);
      setErrors({ signInPassword: 'Backend unavailable. Please make sure the backend is running.' });
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!signUpName.trim()) {
      newErrors.signUpName = 'Please enter your name.';
    }

    if (!signUpEmail.trim() || !validateEmail(signUpEmail)) {
      newErrors.signUpEmail = 'Enter a valid email address.';
    }

    if (!signUpPassword) {
      newErrors.signUpPassword = 'Password is required.';
    } else if (signUpPassword.length < 6) {
      newErrors.signUpPassword = 'Password must be at least 6 characters.';
    }

    if (!signUpCollege.trim()) {
      newErrors.signUpCollege = 'Please enter your college name.';
    }

    if (!selectedTrack) {
      newErrors.selectedTrack = 'Choose a track to continue.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signUpName.trim(),
          email: signUpEmail.trim(),
          password: signUpPassword,
          college: signUpCollege.trim(),
          track: selectedTrack,
        }),
      });

      const data = await res.json().catch(() => null);

      if ((res.status === 200 || res.status === 201) && data?.success && data?.user) {
        setIsLoading(false);
        setSuccessOverlay(true);

        const newUser = createNewUser(
          data.user.name,
          data.user.email,
          data.user.college,
          data.user.track
        );

        saveUserProfile(newUser);

        setTimeout(() => {
          onLoginSuccess(newUser);
          onNavigate('/dashboard');
        }, 1500);
        return;
      }

      setIsLoading(false);
      if (data && typeof data.message === 'string' && data.message.trim() !== '') {
        const msg = data.message;
        if (msg.toLowerCase().includes('email')) {
          setErrors({ signUpEmail: msg });
        } else {
          setErrors({ signUpName: msg });
        }
      } else if (res.status === 502 || res.status === 503 || res.status === 504) {
        setErrors({ signUpEmail: 'Backend unavailable. Please make sure the backend is running.' });
      } else {
        setErrors({ signUpName: 'Signup failed. Please try again.' });
      }
    } catch {
      setIsLoading(false);
      setErrors({ signUpEmail: 'Backend unavailable. Please make sure the backend is running.' });
    }
  };

  const handleForgotPassword = () => {
    setForgotMsg('Password reset link sent to your email (Mock).');
    setTimeout(() => setForgotMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#1e293b] flex flex-col items-center justify-between font-sans selection:bg-[#4c5b71]/15">
      {/* AUTH HEADER */}
      <header className="w-full bg-[#f4f6f8]/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
        <div className="w-full max-w-md lg:max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              if (mode === 'select') {
                onNavigate('/');
              } else {
                setMode('select');
                setErrors({});
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#4c5b71] bg-white border border-slate-200 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#4c5b71] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
              AB
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#1e293b]">
              ABTalks
            </span>
          </div>

          <div className="w-16" /> {/* Spacer for symmetry */}
        </div>
      </header>

      {/* SUCCESS OVERLAY FOR SIGNUP */}
      {successOverlay && (
        <div className="fixed inset-0 z-50 bg-[#f4f6f8]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-md animate-bounce">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1e293b] mb-2">
            Welcome to ABTalks.
          </h2>
          <p className="text-sm font-semibold text-[#4c5b71] max-w-xs">
            Your 60-day journey starts now.
          </p>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-md lg:max-w-xl px-4 py-6 flex-1 flex flex-col justify-center mx-auto">
        {/* OPTION SELECTOR VIEW */}
        {mode === 'select' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* INTRO TEXT */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono-code text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
                  START YOUR JOURNEY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] tracking-tight">
                Ready to start your 60 days?
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                Create your ABTalks account and start building your public coding streak.
              </p>
            </div>

            {/* OPTIONS CARDS */}
            <div className="space-y-3.5 pt-2">
              {/* Option 1: SIGN IN */}
              <button
                onClick={() => {
                  setMode('signin');
                  setErrors({});
                }}
                className="w-full text-left clay-card-shallow p-5 flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div>
                  <h3 className="font-extrabold text-base text-[#1e293b] mb-0.5 group-hover:text-[#4c5b71] transition-colors">
                    Sign in
                  </h3>
                  <p className="text-xs text-slate-500">
                    Already have an ABTalks account?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#4c5b71] group-hover:bg-[#4c5b71] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Option 2: CREATE ACCOUNT */}
              <button
                onClick={() => {
                  setMode('signup');
                  setErrors({});
                }}
                className="w-full text-left clay-card-deep p-5 flex items-center justify-between border-2 border-[#4c5b71]/20 hover:border-[#4c5b71] transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div>
                  <div className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono-code text-[10px] font-bold mb-1">
                    RECOMMENDED
                  </div>
                  <h3 className="font-extrabold text-base text-[#1e293b] mb-0.5 group-hover:text-[#4c5b71] transition-colors">
                    Create account
                  </h3>
                  <p className="text-xs text-slate-500">
                    New to ABTalks? Start your journey here.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#4c5b71] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* SIGN IN FORM VIEW */}
        {mode === 'signin' && (
          <div className="clay-card-deep p-6 sm:p-7 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-extrabold text-[#1e293b] tracking-tight">
                Welcome back.
              </h2>
              <p className="text-xs text-slate-500">
                Continue your 60-day challenge.
              </p>
            </div>

            {forgotMsg && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                {forgotMsg}
              </div>
            )}

            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => {
                      setSignInEmail(e.target.value);
                      if (errors.signInEmail) setErrors((prev) => ({ ...prev, signInEmail: '' }));
                    }}
                    placeholder="Enter your email"
                    className={`w-full bg-[#f8f9fb] border rounded-xl py-3 pl-10 pr-3 text-xs text-[#1e293b] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#4c5b71] ${
                      errors.signInEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.signInEmail && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.signInEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1e293b]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-[#4c5b71] hover:underline font-semibold cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={signInPassword}
                    onChange={(e) => {
                      setSignInPassword(e.target.value);
                      if (errors.signInPassword) setErrors((prev) => ({ ...prev, signInPassword: '' }));
                    }}
                    placeholder="Enter your password"
                    className={`w-full bg-[#f8f9fb] border rounded-xl py-3 pl-10 pr-3 text-xs text-[#1e293b] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#4c5b71] ${
                      errors.signInPassword ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.signInPassword && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.signInPassword}
                  </p>
                )}
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full clay-btn-primary py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch to Sign Up */}
            <div className="text-center pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setErrors({});
                  }}
                  className="font-bold text-[#4c5b71] hover:underline cursor-pointer"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>
        )}

        {/* SIGN UP FORM VIEW */}
        {mode === 'signup' && (
          <div className="clay-card-deep p-6 sm:p-7 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-200 my-2">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-extrabold text-[#1e293b] tracking-tight">
                Start your journey.
              </h2>
              <p className="text-xs text-slate-500">
                Your first day starts with one small build.
              </p>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={signUpName}
                    onChange={(e) => {
                      setSignUpName(e.target.value);
                      if (errors.signUpName) setErrors((prev) => ({ ...prev, signUpName: '' }));
                    }}
                    placeholder="Your name"
                    className={`w-full bg-[#f8f9fb] border rounded-xl py-3 pl-10 pr-3 text-xs text-[#1e293b] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#4c5b71] ${
                      errors.signUpName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.signUpName && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.signUpName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                      if (errors.signUpEmail) setErrors((prev) => ({ ...prev, signUpEmail: '' }));
                    }}
                    placeholder="Enter your email"
                    className={`w-full bg-[#f8f9fb] border rounded-xl py-3 pl-10 pr-3 text-xs text-[#1e293b] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#4c5b71] ${
                      errors.signUpEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.signUpEmail && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.signUpEmail}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                      if (errors.signUpPassword) setErrors((prev) => ({ ...prev, signUpPassword: '' }));
                    }}
                    placeholder="Create a password"
                    className={`w-full bg-[#f8f9fb] border rounded-xl py-3 pl-10 pr-3 text-xs text-[#1e293b] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#4c5b71] ${
                      errors.signUpPassword ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.signUpPassword && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.signUpPassword}
                  </p>
                )}
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-bold text-[#1e293b] mb-1.5">
                  College
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={signUpCollege}
                    onChange={(e) => {
                      setSignUpCollege(e.target.value);
                      if (errors.signUpCollege) setErrors((prev) => ({ ...prev, signUpCollege: '' }));
                    }}
                    placeholder="Your college"
                    className={`w-full bg-[#f8f9fb] border rounded-xl py-3 pl-10 pr-3 text-xs text-[#1e293b] placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#4c5b71] ${
                      errors.signUpCollege ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.signUpCollege && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.signUpCollege}
                  </p>
                )}
              </div>

              {/* Choose Track */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1e293b] flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-[#4c5b71]" />
                    Choose your track
                  </label>
                  <span className="text-[10px] font-mono-code text-slate-400">Single track</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {TRACK_OPTIONS.map((track) => {
                    const isSelected = selectedTrack === track;
                    return (
                      <button
                        key={track}
                        type="button"
                        onClick={() => {
                          setSelectedTrack(track);
                          if (errors.selectedTrack) setErrors((prev) => ({ ...prev, selectedTrack: '' }));
                        }}
                        className={`
                          px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5
                          ${
                            isSelected
                              ? 'bg-[#4c5b71] text-white border-[#4c5b71] shadow-xs'
                              : 'bg-[#f8f9fb] text-slate-700 border-slate-200 hover:border-slate-300'
                          }
                        `}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{track}</span>
                      </button>
                    );
                  })}
                </div>

                {errors.selectedTrack && (
                  <p className="text-rose-600 text-[11px] font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.selectedTrack}
                  </p>
                )}
              </div>

              {/* Primary Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full clay-btn-primary py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-3"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <>
                    <span>Create my account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch to Sign In */}
            <div className="text-center pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-600">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signin');
                    setErrors({});
                  }}
                  className="font-bold text-[#4c5b71] hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-4 text-[11px] font-mono-code text-slate-400">
        ABTalks 60-Day Challenge • Proof of Work
      </footer>
    </div>
  );
};
