"use client";

import { useProgress, TRACKED_PAGES } from "../hooks/useProgress";

export default function ProgressIndicator() {
  const { visitedPages, totalPages, progress } = useProgress();

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Object.keys(TRACKED_PAGES).map((pageId) => (
          <div
            key={pageId}
            className={`w-2 h-2 rounded-full transition-colors ${
              visitedPages.includes(pageId as keyof typeof TRACKED_PAGES)
                ? "bg-emerald-400"
                : "bg-zinc-700"
            }`}
            title={
              TRACKED_PAGES[pageId as keyof typeof TRACKED_PAGES].label
            }
          />
        ))}
      </div>
      <span className="text-xs text-zinc-500">
        {visitedPages.length}/{totalPages}
      </span>
      <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
