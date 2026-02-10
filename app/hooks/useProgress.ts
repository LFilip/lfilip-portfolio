"use client";

import { useState, useCallback, useEffect } from "react";
import { projects } from "../data/projects";

const STORAGE_KEY = "portfolio-clicked-projects";
const SYNC_EVENT = "portfolio-progress-sync";

interface ProgressState {
  clickedProjects: string[];
  totalProjects: number;
  progress: number;
}

function getStoredProjects(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function broadcastSync() {
  // Defer to avoid setState during render
  setTimeout(() => window.dispatchEvent(new CustomEvent(SYNC_EVENT)), 0);
}

export function useProgress() {
  const [clickedProjects, setClickedProjects] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydration pattern: set initial state from localStorage after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
    setClickedProjects(getStoredProjects());

    const handleSync = () => {
      setClickedProjects(getStoredProjects());
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  const toggleClicked = useCallback((projectId: string) => {
    setClickedProjects((current) => {
      const updated = current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      broadcastSync();
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setClickedProjects([]);
    broadcastSync();
  }, []);

  const totalProjects = projects.length;
  const progress = isHydrated
    ? Math.round((clickedProjects.length / totalProjects) * 100)
    : 0;

  const state: ProgressState = {
    clickedProjects: isHydrated ? clickedProjects : [],
    totalProjects,
    progress,
  };

  return { ...state, toggleClicked, resetProgress, isHydrated };
}
