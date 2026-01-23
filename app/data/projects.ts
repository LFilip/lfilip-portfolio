export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio site built with Next.js 16 and React 19. Features a dark dev aesthetic, page-visit progress tracking, and responsive design.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/lfilip/portfolio",
    highlights: [
      "App Router with server and client components",
      "LocalStorage-based progress gamification",
      "Mobile-responsive navigation",
    ],
  },
  {
    title: "Government Application Dashboard",
    description:
      "Secure dashboard for government applications with real-time data visualization and role-based access control.",
    techStack: ["React", "TypeScript", "NestJS", "PostgreSQL"],
    highlights: [
      "Built with cross-functional team",
      "Comprehensive unit test coverage",
      "Secure authentication and authorization",
    ],
  },
  {
    title: "User Analytics Dashboard",
    description:
      "Dynamic dashboard for tracking user engagement and analytics. Designed in Figma and built with a focus on data visualization.",
    techStack: ["React", "TypeScript", "AWS Lambda", "Terraform"],
    highlights: [
      "Designed UI/UX in Figma",
      "Serverless backend architecture",
      "Infrastructure as code with Terraform",
    ],
  },
  {
    title: "3D Browser-Based Map",
    description:
      "Interactive 3D mapping application with real-time backend data integration for military applications.",
    techStack: ["React", "Three.js", "TypeScript", "Microservices"],
    highlights: [
      "Real-time data streaming",
      "Component design system using molecular design",
      "CI/CD pipelines with GitLab",
    ],
  },
];
