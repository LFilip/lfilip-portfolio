import Link from "next/link";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  isClicked?: boolean;
  onProjectClick?: () => void;
}

export default function ProjectCard({
  project,
  isClicked = false,
  onProjectClick,
}: ProjectCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on a link
    const target = e.target as HTMLElement;
    if (target.closest("a")) {
      return;
    }
    onProjectClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onProjectClick?.();
    }
  };

  return (
    <div
      className={`relative rounded-lg border bg-zinc-900 p-6 transition-colors cursor-pointer ${
        isClicked
          ? "border-emerald-500"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-pressed={isClicked}
      tabIndex={0}
    >
      {isClicked && (
        <div
          className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-zinc-100">{project.title}</h3>
        <div className="flex gap-2">
          {project.demoPath && (
            <Link
              href={project.demoPath}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label="Try demo"
              title="Try Demo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
              aria-label="GitHub repository"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
              aria-label="Live demo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      <p className="text-zinc-400 text-sm mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="inline-block px-2 py-1 rounded bg-zinc-800 text-zinc-300 text-xs border border-zinc-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.highlights && (
        <ul className="text-sm text-zinc-500 space-y-1">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-emerald-400 mr-2">-</span>
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
