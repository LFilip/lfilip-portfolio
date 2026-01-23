"use client";

import { useEffect, useState } from 'react';

interface DiagonalWipeProps {
  isAnimating: boolean;
  onComplete: () => void;
}

export const DiagonalWipe = ({ isAnimating, onComplete }: DiagonalWipeProps) => {
  const [shouldOpen, setShouldOpen] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isAnimating && !hasCompleted) {
      // Show the Begin button after a short delay
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 300);

      return () => {
        clearTimeout(buttonTimer);
      };
    }
  }, [isAnimating, hasCompleted]);

  const handleBegin = () => {
    setShowButton(false);
    setShouldOpen(true);

    // Animation duration is 0.8s, call onComplete after
    setTimeout(() => {
      onComplete();
      setHasCompleted(true);
    }, 900);
  };

  // Don't render after animation completes
  if (hasCompleted) return null;

  // Calculate 45 degree angle movement
  const angle = 45;
  const distance = 150; // How far to slide (percentage)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Top-left triangle - slides toward upper-left like elevator door */}
      <div
        className="absolute inset-0 bg-emerald-600 transition-transform duration-[800ms] ease-in-out pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.3))',
          transform: shouldOpen
            ? `translate(${-distance * Math.cos(angle * Math.PI / 180)}%, ${-distance * Math.sin(angle * Math.PI / 180)}%)`
            : 'translate(0, 0)',
        }}
      />

      {/* Bottom-right triangle - slides toward lower-right like elevator door */}
      <div
        className="absolute inset-0 bg-emerald-500 transition-transform duration-[800ms] ease-in-out pointer-events-none"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          filter: 'drop-shadow(-4px -4px 12px rgba(0, 0, 0, 0.3))',
          transform: shouldOpen
            ? `translate(${distance * Math.cos(angle * Math.PI / 180)}%, ${distance * Math.sin(angle * Math.PI / 180)}%)`
            : 'translate(0, 0)',
        }}
      />

      {/* Begin Button */}
      {showButton && !shouldOpen && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <button
            onClick={handleBegin}
            className="bg-zinc-900 text-emerald-400 font-bold text-2xl px-12 py-6 rounded-2xl shadow-2xl hover:scale-110 hover:shadow-emerald-500/30 transition-all duration-300 border-4 border-emerald-500 animate-pulse"
          >
            Begin Adventure
          </button>
        </div>
      )}
    </div>
  );
};
