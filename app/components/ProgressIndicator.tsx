"use client";

import { useProgress } from "../hooks/useProgress";

export default function ProgressIndicator() {
  const { clickedProjects, totalProjects, progress, resetProgress } =
    useProgress();

  const size = 32;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={`Project exploration progress: ${clickedProjects.length} of ${totalProjects}`}
    >
      <div
        title={`${clickedProjects.length} of ${totalProjects} projects explored`}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Project exploration progress"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-zinc-700"
            strokeWidth={strokeWidth}
          />
          {/* Foreground arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-emerald-400 transition-[stroke-dashoffset] duration-300"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          {/* Centered text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-zinc-300 text-[9px] font-medium"
          >
            {clickedProjects.length}/{totalProjects}
          </text>
        </svg>
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
