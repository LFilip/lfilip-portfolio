"use client";

import { useState } from 'react';
import Link from 'next/link';
import { IntroScreen } from './components/IntroScreen';
import { DiagonalWipe } from './components/DiagonalWipe';
import { PetHeader } from './components/PetHeader';
import { PetSidebar } from './components/PetSidebar';
import { ContentArea } from './components/ContentArea';
import { PetNavigation } from './components/PetNavigation';
import { usePetStore } from './stores/petStore';
import { useGameLoop } from './hooks/useGameLoop';

export default function PetDemoPage() {
  const pet = usePetStore((state) => state.pet);
  const createPet = usePetStore((state) => state.createPet);

  // Show intro if no pet exists
  const [showIntro, setShowIntro] = useState(!pet);
  const [isAnimating, setIsAnimating] = useState(true);

  // Start game loop when pet exists
  useGameLoop();

  const handleStart = (data: { name: string; emoji: string }) => {
    // Create the pet in the store
    createPet(data.name, data.emoji);

    // IMMEDIATELY hide intro screen and start animation
    setShowIntro(false);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    // After animation completes, stop animating
    setIsAnimating(false);
  };

  const handleReset = () => {
    // Confirm before resetting
    const confirmed = window.confirm(
      "Are you sure you want to choose a different pet? Your current pet's progress will be lost."
    );

    if (confirmed) {
      // Clear the pet and show intro screen
      usePetStore.setState({ pet: null });
      setShowIntro(true);
      setIsAnimating(false);
    }
  };

  // Main app layout with navigation
  const mainLayout = (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Header */}
      <PetHeader onReset={handleReset} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Pet Sidebar (Desktop only) */}
        <PetSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Navigation */}
          <div className="md:hidden p-4">
            <PetNavigation />
          </div>

          {/* Content Area */}
          <ContentArea />
        </main>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Back link */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Link
            href="/projects"
            className="text-zinc-400 hover:text-emerald-400 text-sm transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Show intro screen before pet is selected */}
      {showIntro ? (
        <IntroScreen onStart={handleStart} />
      ) : (
        <>
          {mainLayout}
          {/* DiagonalWipe covers screen initially, then slides open like elevator doors */}
          <DiagonalWipe isAnimating={isAnimating} onComplete={handleAnimationComplete} />
        </>
      )}
    </div>
  );
}
