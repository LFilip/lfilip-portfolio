"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "portfolio-clicked-projects";
const SYNC_EVENT = "portfolio-progress-sync";

export const TRACKED_PROJECTS = {
  "block-miner": { label: "Block Miner" },
  "package-sorter": { label: "Package Sorter" },
  "localpet-virtual-pet-game": { label: "LocalPet" },
  "portfolio-website": { label: "Portfolio" },
  "government-application-dashboard": { label: "Gov Dashboard" },
  "user-analytics-dashboard": { label: "Analytics" },
  "3d-browser-based-map": { label: "3D Map" },
} as const;

export type ProjectId = keyof typeof TRACKED_PROJECTS;

interface ProgressState {
  clickedProjects: ProjectId[];
  totalProjects: number;
  progress: number;
}

function getStoredProjects(): ProjectId[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as ProjectId[]) : [];
  } catch {
    return [];
  }
}

function broadcastSync() {
  // Defer to avoid setState during render
  setTimeout(() => window.dispatchEvent(new CustomEvent(SYNC_EVENT)), 0);
}

export function useProgress() {
  const [clickedProjects, setClickedProjects] = useState<ProjectId[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setClickedProjects(getStoredProjects());

    const handleSync = () => {
      setClickedProjects(getStoredProjects());
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  const toggleClicked = useCallback((projectId: ProjectId) => {
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

  const totalProjects = Object.keys(TRACKED_PROJECTS).length;
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
