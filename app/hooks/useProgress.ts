"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

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
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as PageId[];
    } catch {
      return [];
    }
  }
  return [];
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): PageId[] {
  return getStoredPages();
}

function getServerSnapshot(): PageId[] {
  return [];
}

export function useProgress() {
  const storedPages = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localPages, setLocalPages] = useState<PageId[]>([]);

  const visitedPages = [...new Set([...storedPages, ...localPages])];

  const markVisited = useCallback(
    (pageId: PageId) => {
      const current = getStoredPages();
      if (!current.includes(pageId)) {
        const updated = [...current, pageId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setLocalPages(updated);
      }
    },
    []
  );

  const totalPages = Object.keys(TRACKED_PAGES).length;
  const progress = Math.round((visitedPages.length / totalPages) * 100);

  const state: ProgressState = {
    visitedPages,
    totalPages,
    progress,
  };

  return { ...state, markVisited };
}
