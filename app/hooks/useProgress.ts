"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "portfolio-clicked-projects";

export const TRACKED_PROJECTS = {
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

export function useProgress() {
  const [clickedProjects, setClickedProjects] = useState<ProjectId[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Loading client-only data after hydration is a legitimate pattern
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
    setClickedProjects(getStoredProjects());
  }, []);

  const markClicked = useCallback((projectId: ProjectId) => {
    setClickedProjects((current) => {
      if (current.includes(projectId)) {
        return current;
      }
      const updated = [...current, projectId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setClickedProjects([]);
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

  return { ...state, markClicked, resetProgress, isHydrated };
}
