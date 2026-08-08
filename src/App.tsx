import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MomentumGridSection } from './components/MomentumGridSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ProofOfWorkSection } from './components/ProofOfWorkSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { TrackModal } from './components/TrackModal';

export default function App() {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const handleOpenTrackModal = () => {
    setIsTrackModalOpen(true);
  };

  const handleCloseTrackModal = () => {
    setIsTrackModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#1e293b] flex flex-col font-sans selection:bg-[#4c5b71]/15 selection:text-[#0b1c30]">
      {/* Step 1 Scope: Minimal Top Header */}
      <Header onOpenTrackModal={handleOpenTrackModal} />

      {/* Main Landing Page Content */}
      <main className="flex-1 w-full pb-10">
        {/* Hero Viewport */}
        <HeroSection onStartChallenge={handleOpenTrackModal} />

        {/* 60-Day Momentum Grid */}
        <MomentumGridSection />

        {/* How ABTalks Works */}
        <HowItWorksSection />

        {/* Dual Proof Signals (GitHub + LinkedIn) */}
        <ProofOfWorkSection />

        {/* Final Conversion CTA */}
        <FinalCTASection onStartChallenge={handleOpenTrackModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Track Selector Modal */}
      <TrackModal
        isOpen={isTrackModalOpen}
        onClose={handleCloseTrackModal}
      />
    </div>
  );
}
