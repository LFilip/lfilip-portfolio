"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Accordion } from '@/app/components/Accordion';
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

      {/* About Section - Accordions */}
      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-3">
          <Accordion title="How to Play">
            <div className="text-sm text-zinc-400 space-y-3">
              <p>Take care of your virtual pet by keeping their stats healthy!</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">1.</span>
                  Choose a pet name and emoji to get started
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">2.</span>
                  Monitor your pet&apos;s hunger, happiness, and energy levels
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">3.</span>
                  Use the action buttons to feed, play with, or rest your pet
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">4.</span>
                  Stats decrease over time - check back regularly!
                </li>
              </ul>
            </div>
          </Accordion>

          <Accordion title="Game Mechanics">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Stats</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-zinc-900 rounded p-3 text-center">
                    <div className="text-2xl mb-1">🍖</div>
                    <div className="text-zinc-300 text-xs font-medium">Hunger</div>
                    <div className="text-zinc-500 text-xs">Feed to restore</div>
                  </div>
                  <div className="bg-zinc-900 rounded p-3 text-center">
                    <div className="text-2xl mb-1">😊</div>
                    <div className="text-zinc-300 text-xs font-medium">Happiness</div>
                    <div className="text-zinc-500 text-xs">Play to restore</div>
                  </div>
                  <div className="bg-zinc-900 rounded p-3 text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-zinc-300 text-xs font-medium">Energy</div>
                    <div className="text-zinc-500 text-xs">Rest to restore</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Stat Decay</h4>
                <p className="text-zinc-400">
                  Stats decrease by 1 point every few seconds. If any stat reaches 0,
                  your pet becomes unhappy. Keep all stats above 20% for a healthy pet!
                </p>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Persistence</h4>
                <p className="text-zinc-400">
                  Your pet is saved to localStorage - they&apos;ll remember you when you return!
                  Time passes even when you&apos;re away.
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title="About this Project">
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">
                A virtual pet game inspired by Tamagotchi, built to demonstrate real-time state
                management, game loops, and persistent storage in React.
              </p>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {['React 19', 'TypeScript', 'Zustand', 'Tailwind CSS', 'localStorage'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Features Demonstrated</h4>
                <ul className="text-zinc-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Real-time game loop with stat degradation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Zustand state management with localStorage persistence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Animated diagonal wipe transition effect
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Responsive layout with mobile navigation
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
