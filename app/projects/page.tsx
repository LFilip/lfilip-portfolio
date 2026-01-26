"use client";

import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useProgress, ProjectId } from "../hooks/useProgress";

export default function ProjectsPage() {
  const { clickedProjects, toggleClicked } = useProgress();

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-100 mb-4">Projects</h1>
          <p className="text-zinc-400 max-w-2xl">
            A collection of projects I have worked on, from secure government
            applications to real-time data systems and developer tools.
          </p>
        </header>

        <div className="grid gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isClicked={clickedProjects.includes(project.id as ProjectId)}
              onProjectClick={() => toggleClicked(project.id as ProjectId)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
