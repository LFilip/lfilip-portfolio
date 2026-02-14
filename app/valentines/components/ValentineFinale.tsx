"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import OrnateCorner from "./OrnateCorner";
import FloatingHearts from "./FloatingHearts";

type Stage = "question" | "celebration";

const WORDS = ["Will", "you", "be", "my", "Valentine?"];

const NO_TEXTS = ["No", "No", "No", "No", "Are you sure?", "Really?!"];

export default function ValentineFinale() {
  const [stage, setStage] = useState<Stage>("question");
  const [showButtons, setShowButtons] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [noScale, setNoScale] = useState(1);
  const noRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setStage("celebration");
  };

  const dodgeNo = useCallback(() => {
    const attempt = noAttempts + 1;
    setNoAttempts(attempt);

    if (attempt >= 7) return;

    // Random position within viewport
    const x = Math.random() * 60 - 30;
    const y = Math.random() * 60 - 30;
    setNoPosition({ x, y });

    // Shrink after attempt 3
    if (attempt >= 3) {
      setNoScale(Math.max(0.4, 1 - attempt * 0.1));
    }
  }, [noAttempts]);

  const noConverted = noAttempts >= 7;
  const currentNoText = noConverted ? "Also Yes!" : (NO_TEXTS[noAttempts] ?? "Really?!");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in"
      data-testid="valentine-finale"
    >
      <OrnateCorner position="top-left" />
      <OrnateCorner position="top-right" />
      <OrnateCorner position="bottom-left" />
      <OrnateCorner position="bottom-right" />

      <div className="text-center px-6 max-w-lg">
        {stage === "question" && (
          <>
            <div className="flex flex-wrap justify-center gap-x-4 mb-12" data-testid="question-text">
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  className="inline-block animate-letter-reveal"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <span className="text-4xl md:text-6xl font-bold animate-shimmer">
                    {word}
                  </span>
                </span>
              ))}
            </div>

            {showButtons && (
              <div className="flex items-center justify-center gap-6" data-testid="finale-buttons">
                <button
                  onClick={handleYes}
                  className="px-10 py-4 text-xl font-bold text-white bg-purple-600 rounded-full shadow-lg shadow-purple-500/30 hover:bg-purple-500 hover:shadow-purple-500/50 transition-all duration-300 animate-pulse-glow"
                  data-testid="yes-button"
                >
                  Yes!
                </button>

                <button
                  ref={noRef}
                  onClick={noConverted ? handleYes : undefined}
                  onMouseEnter={noConverted ? undefined : dodgeNo}
                  onTouchStart={noConverted ? undefined : dodgeNo}
                  className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ${
                    noConverted
                      ? "bg-pink-500 text-white hover:bg-pink-400 shadow-lg shadow-pink-500/30"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                  }`}
                  style={{
                    transform: noPosition
                      ? `translate(${noPosition.x}vw, ${noPosition.y}vh) scale(${noScale})`
                      : `scale(${noScale})`,
                  }}
                  data-testid="no-button"
                >
                  {currentNoText}
                </button>
              </div>
            )}
          </>
        )}

        {stage === "celebration" && (
          <div className="animate-fade-in" data-testid="celebration">
            <div className="text-6xl mb-6 animate-celebration-pulse">💜</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-shimmer">
              I knew you&apos;d say yes!
            </h2>
            <p className="text-xl text-zinc-400 mt-4">Forever and always 💜</p>
            <Link
              href="/"
              className="inline-block mt-8 px-8 py-3 text-lg font-medium text-white bg-purple-600/80 rounded-full hover:bg-purple-500 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      <FloatingHearts active={stage === "celebration"} />
    </div>
  );
}
