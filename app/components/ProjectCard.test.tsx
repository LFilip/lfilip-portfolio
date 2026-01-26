import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import type { Project } from "../data/projects";

describe("ProjectCard Component", () => {
  const baseProject: Project = {
    id: "test-project",
    title: "Test Project",
    description: "A test project description",
    techStack: ["React", "TypeScript"],
  };

  it("should render project title", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("should render project description", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("should render all tech stack items", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("should render demo link when demoPath is provided", () => {
    const projectWithDemo: Project = {
      ...baseProject,
      demoPath: "/projects/demo",
    };

    render(<ProjectCard project={projectWithDemo} />);

    expect(screen.getByRole("link", { name: /try demo/i })).toBeInTheDocument();
  });

  it("should not render demo link when demoPath is not provided", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.queryByRole("link", { name: /try demo/i })
    ).not.toBeInTheDocument();
  });

  it("should render GitHub link when github is provided", () => {
    const projectWithGithub: Project = {
      ...baseProject,
      github: "https://github.com/test/project",
    };

    render(<ProjectCard project={projectWithGithub} />);

    const githubLink = screen.getByRole("link", { name: /github repository/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/test/project"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("should not render GitHub link when github is not provided", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.queryByRole("link", { name: /github repository/i })
    ).not.toBeInTheDocument();
  });

  it("should render live URL link when liveUrl is provided", () => {
    const projectWithLiveUrl: Project = {
      ...baseProject,
      liveUrl: "https://example.com",
    };

    render(<ProjectCard project={projectWithLiveUrl} />);

    const liveLink = screen.getByRole("link", { name: /live demo/i });
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", "https://example.com");
    expect(liveLink).toHaveAttribute("target", "_blank");
  });

  it("should not render live URL link when liveUrl is not provided", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.queryByRole("link", { name: /live demo/i })
    ).not.toBeInTheDocument();
  });

  it("should render highlights when provided", () => {
    const projectWithHighlights: Project = {
      ...baseProject,
      highlights: ["Feature one", "Feature two", "Feature three"],
    };

    render(<ProjectCard project={projectWithHighlights} />);

    expect(screen.getByText("Feature one")).toBeInTheDocument();
    expect(screen.getByText("Feature two")).toBeInTheDocument();
    expect(screen.getByText("Feature three")).toBeInTheDocument();
  });

  it("should not render highlights section when not provided", () => {
    render(<ProjectCard project={baseProject} />);

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  it("should render multiple tech stack badges", () => {
    const projectWithManyTechs: Project = {
      ...baseProject,
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    };

    render(<ProjectCard project={projectWithManyTechs} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("AWS")).toBeInTheDocument();
  });
});

describe("ProjectCard Click Behavior", () => {
  const baseProject: Project = {
    id: "test-project",
    title: "Test Project",
    description: "A test project description",
    techStack: ["React", "TypeScript"],
  };

  it("should have button role and tabIndex", () => {
    render(<ProjectCard project={baseProject} />);

    const card = screen.getByRole("button");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabindex", "0");
  });

  it("should call onProjectClick when card is clicked", () => {
    const mockOnClick = jest.fn();
    render(<ProjectCard project={baseProject} onProjectClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should call onProjectClick on Enter key press", () => {
    const mockOnClick = jest.fn();
    render(<ProjectCard project={baseProject} onProjectClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should call onProjectClick on Space key press", () => {
    const mockOnClick = jest.fn();
    render(<ProjectCard project={baseProject} onProjectClick={mockOnClick} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: " " });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onProjectClick when clicking on a link", () => {
    const mockOnClick = jest.fn();
    const projectWithLink: Project = {
      ...baseProject,
      github: "https://github.com/test",
    };

    render(
      <ProjectCard project={projectWithLink} onProjectClick={mockOnClick} />
    );

    const githubLink = screen.getByRole("link", { name: /github repository/i });
    fireEvent.click(githubLink);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});

describe("ProjectCard Visual States", () => {
  const baseProject: Project = {
    id: "test-project",
    title: "Test Project",
    description: "A test project description",
    techStack: ["React", "TypeScript"],
  };

  it("should have aria-pressed=false when not clicked", () => {
    render(<ProjectCard project={baseProject} isClicked={false} />);

    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-pressed", "false");
  });

  it("should have aria-pressed=true when clicked", () => {
    render(<ProjectCard project={baseProject} isClicked={true} />);

    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-pressed", "true");
  });

  it("should have zinc-800 border when not clicked", () => {
    const { container } = render(
      <ProjectCard project={baseProject} isClicked={false} />
    );

    const card = container.querySelector(".border-zinc-800");
    expect(card).toBeInTheDocument();
  });

  it("should have emerald-500 border when clicked", () => {
    const { container } = render(
      <ProjectCard project={baseProject} isClicked={true} />
    );

    const card = container.querySelector(".border-emerald-500");
    expect(card).toBeInTheDocument();
  });

  it("should show checkmark badge when clicked", () => {
    const { container } = render(
      <ProjectCard project={baseProject} isClicked={true} />
    );

    // The checkmark badge has a specific class structure
    const checkmarkBadge = container.querySelector(".bg-emerald-500.rounded-full");
    expect(checkmarkBadge).toBeInTheDocument();
  });

  it("should not show checkmark badge when not clicked", () => {
    const { container } = render(
      <ProjectCard project={baseProject} isClicked={false} />
    );

    const checkmarkBadge = container.querySelector(
      ".bg-emerald-500.rounded-full"
    );
    expect(checkmarkBadge).not.toBeInTheDocument();
  });
});
