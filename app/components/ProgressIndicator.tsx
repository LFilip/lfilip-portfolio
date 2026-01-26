"use client";

import { useProgress, TRACKED_PROJECTS } from "../hooks/useProgress";

export default function ProgressIndicator() {
  const { clickedProjects, totalProjects, progress, resetProgress } =
    useProgress();

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Object.keys(TRACKED_PROJECTS).map((projectId) => (
          <div
            key={projectId}
            className={`w-2 h-2 rounded-full transition-colors ${
              clickedProjects.includes(
                projectId as keyof typeof TRACKED_PROJECTS
              )
                ? "bg-emerald-400"
                : "bg-zinc-700"
            }`}
            title={
              TRACKED_PROJECTS[projectId as keyof typeof TRACKED_PROJECTS].label
            }
          />
        ))}
      </div>
      <span className="text-xs text-zinc-500">
        {clickedProjects.length}/{totalProjects}
      </span>
      <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {clickedProjects.length > 0 && (
        <button
          onClick={resetProgress}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          aria-label="Reset progress"
          title="Reset progress"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
