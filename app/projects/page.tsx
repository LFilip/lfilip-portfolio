"use client";

import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { projects, ProjectCategory } from "../data/projects";
import { useProgress, ProjectId } from "../hooks/useProgress";

const CATEGORY_LABELS: Record<ProjectCategory | "all", string> = {
  all: "All",
  professional: "Professional",
  game: "Games",
  demo: "Demos",
};

export default function ProjectsPage() {
  const { clickedProjects, toggleClicked } = useProgress();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-100 mb-4">Projects</h1>
          <p className="text-zinc-400 max-w-2xl">
            A collection of projects I have worked on, from secure government
            applications to real-time data systems and developer tools.
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["all", "professional", "game", "demo"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === category
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              }`}
            >
              {CATEGORY_LABELS[category]}
              <span className="ml-2 text-xs opacity-75">
                ({category === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length})
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isClicked={clickedProjects.includes(project.id as ProjectId)}
              onProjectClick={() => toggleClicked(project.id as ProjectId)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-zinc-500 text-center py-12">
            No projects in this category yet.
          </p>
        )}
      </main>
    </div>
  );
}
