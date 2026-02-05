"use client";

import { useState, useEffect } from "react";
import Envelope from "./components/Envelope";
import HexGrid from "./components/HexGrid";
import { hexContents } from "./data/memories";

type Phase = "envelope" | "dissolving" | "quilt";

export default function ValentinesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("envelope");
  const [showSkip, setShowSkip] = useState(false);

  const handleSealClick = () => {
    setIsOpen(true);
  };

  // Show skip button after a delay when envelope is opened
  useEffect(() => {
    if (isOpen && !showSkip) {
      const timer = setTimeout(() => {
        setShowSkip(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showSkip]);

  const handleSkip = () => {
    setPhase("dissolving");
    setTimeout(() => {
      setPhase("quilt");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      {/* Ambient glow effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            phase === "quilt"
              ? "radial-gradient(ellipse at center, rgba(126, 34, 206, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(126, 34, 206, 0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Envelope phase */}
      {phase !== "quilt" && (
        <div
          className={`relative transition-all duration-800 ${isOpen ? "mt-96" : ""} ${
            phase === "dissolving" ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          data-testid="envelope-container"
        >
          <Envelope isOpen={isOpen} onSealClick={handleSealClick} onSkip={handleSkip} showSkip={showSkip} />
        </div>
      )}

      {/* Quilt phase */}
      {phase === "quilt" && (
        <div className="animate-fade-in" data-testid="quilt-container">
          <HexGrid hexagons={hexContents} />
        </div>
      )}
    </main>
  );
}
