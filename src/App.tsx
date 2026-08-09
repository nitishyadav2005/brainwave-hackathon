import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProofOfWorkSection } from './components/ProofOfWorkSection';
import { BuiltForRealLifeSection } from './components/BuiltForRealLifeSection';
import { CertificateSection } from './components/CertificateSection';
import { Footer } from './components/Footer';
import { TrackModal } from './components/TrackModal';
import { AuthPage } from './components/AuthPage';
import { DashboardPage } from './components/DashboardPage';
import { DayChallengePage } from './components/DayChallengePage';
import { ProfilePage } from './components/ProfilePage';
import { ProgressPage } from './components/ProgressPage';
import { ReportPage } from './components/ReportPage';
import { UserProfile } from './types';
import { formatFirstName } from './utils/nameUtils';
import { getEffectiveUserProgress, getExtensionInfo } from './utils/userProgress';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('abtalks_user');
      let parsed = saved ? JSON.parse(saved) : null;
      if (!parsed) {
        parsed = {
          name: 'Nitish',
          email: 'nitishyadav5098@gmail.com',
          streak: 60,
          completedDays: 60,
          currentDay: 60,
          isAuthenticated: true,
        };
      }
      if (parsed) {
        parsed.name = formatFirstName(parsed.name);
        parsed.streak = 60;
        parsed.completedDays = 60;
        parsed.currentDay = 60;
        const progress = getEffectiveUserProgress(parsed);
        const extension = getExtensionInfo(parsed);
        parsed.currentDay = progress.currentDay;
        parsed.streak = progress.streakDays;
        parsed.completedDays = progress.completedDays;
        parsed.extensionUsed = extension.extensionUsed;
        parsed.extensionDaysRemaining = extension.extensionDaysRemaining;
        parsed.challengeStatus = extension.challengeStatus;
        localStorage.setItem('abtalks_user', JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return {
        name: 'Nitish',
        email: 'nitishyadav5098@gmail.com',
        streak: 60,
        completedDays: 60,
        currentDay: 60,
        isAuthenticated: true,
      };
    }
  });

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Router handler
  const handleNavigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // CTA Click handler from Landing Page: redirects to /auth
  const handleStartChallengeFromLanding = () => {
    handleNavigate('/auth');
  };

  const handleOpenTrackModal = () => {
    setIsTrackModalOpen(true);
  };

  const handleCloseTrackModal = () => {
    setIsTrackModalOpen(false);
  };

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
  };

  const handleUpdateUser = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem('abtalks_user');
    setUser(null);
    handleNavigate('/');
  };

  // Route: /auth
  if (currentRoute === '/auth') {
    return (
      <AuthPage
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Route: /dashboard
  if (currentRoute === '/dashboard') {
    return (
      <DashboardPage
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    );
  }

  // Route: /progress
  if (currentRoute === '/progress') {
    return (
      <ProgressPage
        user={user}
        onNavigate={handleNavigate}
      />
    );
  }

  // Route: /profile
  if (currentRoute === '/profile') {
    return (
      <ProfilePage
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  // Route: /day/:id
  if (currentRoute.startsWith('/day/')) {
    const dayStr = currentRoute.replace('/day/', '');
    const dayNum = parseInt(dayStr, 10) || 12;
    return (
      <DayChallengePage
        dayNumber={dayNum}
        user={user}
        onNavigate={handleNavigate}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  // Route: /reports/:id
  if (currentRoute.startsWith('/reports/')) {
    const reportStr = currentRoute.replace('/reports/', '');
    let reportId = 1;
    if (reportStr === 'final' || reportStr === '6') {
      reportId = 6;
    } else {
      reportId = parseInt(reportStr, 10) || 1;
    }
    return (
      <ReportPage
        reportId={reportId}
        user={user}
        onNavigate={handleNavigate}
      />
    );
  }

  // Route: / (Landing Page)
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#1e293b] flex flex-col font-sans selection:bg-[#4c5b71]/15 selection:text-[#0b1c30] overflow-x-hidden">
      {/* Top Header */}
      <Header
        onOpenTrackModal={handleOpenTrackModal}
        onNavigate={handleNavigate}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1 w-full pb-10">
        {/* Hero Viewport */}
        <HeroSection onStartChallenge={handleStartChallengeFromLanding} />

        {/* Dual Proof Signals (GitHub + LinkedIn) */}
        <ProofOfWorkSection />

        {/* Built For Real Life (Streak Savers + 5-Day Grace) */}
        <BuiltForRealLifeSection />

        {/* Finish With Proof (Completion Certificate) */}
        <CertificateSection onStartChallenge={handleStartChallengeFromLanding} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Track Selector Modal */}
      <TrackModal
        isOpen={isTrackModalOpen}
        onClose={handleCloseTrackModal}
      />
    </div>
  );
}
