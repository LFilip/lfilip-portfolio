"use client";

import Link from "next/link";
import { Accordion } from "@/app/components/Accordion";
import { useGameLoop } from "./hooks/useGameLoop";
import { GameCanvas, ControlButton, ScoreDisplay } from "./components";
import { GAME_WIDTH } from "./constants/game";

export default function StackJumpPage() {
  const [game, { startHold, releaseHold, resetGame }] = useGameLoop();

  // Calculate camera offset to keep player centered
  const cameraOffset = Math.max(0, game.playerX - GAME_WIDTH / 3);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Back link */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Link
            href="/projects"
            className="text-zinc-400 hover:text-emerald-400 text-sm transition-colors inline-flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-2xl font-bold text-zinc-100 mb-2">Stack Jump</h1>
        <p className="text-zinc-400 text-sm mb-4">
          Hold to build your stack, release to walk!
        </p>

        {/* Score Display */}
        <ScoreDisplay score={game.score} highScore={game.highScore} />

        {/* Game Canvas */}
        <GameCanvas game={game} cameraOffset={cameraOffset} onRetry={resetGame} />

        {/* Control Button */}
        <ControlButton
          isHolding={game.isHolding}
          gameOver={game.gameOver}
          onStartHold={startHold}
          onReleaseHold={releaseHold}
          onReset={resetGame}
        />

      </div>

      {/* About Section */}
      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-3">
          <Accordion title="How to Play">
            <div className="text-sm text-zinc-400 space-y-3">
              <p>Build stacks to cross gaps between platforms!</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">1.</span>
                  Press and hold the button to build your stack
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">2.</span>
                  The longer you hold, the taller your stack grows
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">3.</span>
                  Release to walk - you move forward and down diagonally
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">4.</span>
                  Land on the yellow platform to score and continue!
                </li>
              </ul>
            </div>
          </Accordion>

          <Accordion title="Game Mechanics">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Platform Colors</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-zinc-900 rounded p-3 text-center">
                    <div className="w-8 h-3 bg-emerald-500 rounded mx-auto mb-2" />
                    <div className="text-zinc-300 text-xs font-medium">Current</div>
                    <div className="text-zinc-500 text-xs">You are here</div>
                  </div>
                  <div className="bg-zinc-900 rounded p-3 text-center">
                    <div className="w-8 h-3 bg-yellow-500 rounded mx-auto mb-2" />
                    <div className="text-zinc-300 text-xs font-medium">Target</div>
                    <div className="text-zinc-500 text-xs">Land here!</div>
                  </div>
                  <div className="bg-zinc-900 rounded p-3 text-center">
                    <div className="w-8 h-3 bg-zinc-600 rounded mx-auto mb-2" />
                    <div className="text-zinc-300 text-xs font-medium">Future</div>
                    <div className="text-zinc-500 text-xs">Coming up</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Strategy</h4>
                <p className="text-zinc-400">
                  Watch the gap size! Larger gaps need taller stacks. The stack
                  height indicator shows exactly how far you&apos;ll travel.
                </p>
              </div>
            </div>
          </Accordion>

          <Accordion title="About this Project">
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">
                A simple timing-based game built to demonstrate hold-to-charge
                mechanics and diagonal movement physics.
              </p>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {["React 19", "TypeScript", "Next.js", "Tailwind CSS"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-2">
                  Features Demonstrated
                </h4>
                <ul className="text-zinc-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Hold-to-charge input mechanics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    requestAnimationFrame game loop
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    Touch input support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&#8226;</span>
                    localStorage high score persistence
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
