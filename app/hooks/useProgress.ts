"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "portfolio-visited-pages";

export const TRACKED_PAGES = {
  about: { path: "/", label: "About" },
  projects: { path: "/projects", label: "Projects" },
} as const;

export type PageId = keyof typeof TRACKED_PAGES;

interface ProgressState {
  visitedPages: PageId[];
  totalPages: number;
  progress: number;
}

function getStoredPages(): PageId[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PageId[]) : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  const [visitedPages, setVisitedPages] = useState<PageId[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Loading client-only data after hydration is a legitimate pattern
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
    setVisitedPages(getStoredPages());
  }, []);

  const markVisited = useCallback((pageId: PageId) => {
    setVisitedPages((current) => {
      if (current.includes(pageId)) {
        return current;
      }
      const updated = [...current, pageId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const totalPages = Object.keys(TRACKED_PAGES).length;
  const progress = isHydrated
    ? Math.round((visitedPages.length / totalPages) * 100)
    : 0;

  const state: ProgressState = {
    visitedPages: isHydrated ? visitedPages : [],
    totalPages,
    progress,
  };

  return { ...state, markVisited, isHydrated };
}
