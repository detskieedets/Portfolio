/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoreCapabilities } from './components/CoreCapabilities';
import { AutomationRushGame } from './components/AutomationRushGame';
import { WorkExperience } from './components/WorkExperience';
import { TechnicalProjects } from './components/TechnicalProjects';
import { WorkflowBlueprints } from './components/WorkflowBlueprints';
import { RoiEstimator } from './components/RoiEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ChangePhotoModal } from './components/ChangePhotoModal';
import { AvatarProvider } from './context/AvatarContext';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sounds.enabled = newState;
    if (newState) {
      sounds.playCoin();
    }
  };

  const scrollTo = (id: string) => {
    sounds.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AvatarProvider>
      <div className="min-h-screen bg-[#faf8f5] bg-tech-grid flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
        {/* Top Sticky Navigation */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onOpenResume={() => setIsResumeOpen(true)}
            onScrollTo={scrollTo}
            onOpenChangePhoto={() => setIsChangePhotoOpen(true)}
          />

          {/* Engineering to Execution: Core Capabilities */}
          <CoreCapabilities />

          {/* Instant Mini-Game: Automation Rush Packet Catcher */}
          <AutomationRushGame onUnlockResume={() => setIsResumeOpen(true)} />

          {/* Work Experience */}
          <WorkExperience />

          {/* Core Technical Projects */}
          <TechnicalProjects />

          {/* Live Workflow Blueprints */}
          <WorkflowBlueprints />

          {/* ROI Estimator */}
          <RoiEstimator />

          {/* Let's Eliminate the Busywork / Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onOpenResume={() => setIsResumeOpen(true)} />

        {/* Full Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Change Profile Photo Modal */}
        <ChangePhotoModal
          isOpen={isChangePhotoOpen}
          onClose={() => setIsChangePhotoOpen(false)}
        />
      </div>
    </AvatarProvider>
  );
}
