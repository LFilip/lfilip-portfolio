export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  demoPath?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "block-miner",
    title: "Block Miner",
    description:
      "Minecraft-style clicker game. Mine blocks, earn coins, upgrade your pickaxe and unlock auto-miners. Simple tap/click controls for mobile and desktop.",
    techStack: ["React 19", "TypeScript", "Next.js", "CSS Animations"],
    demoPath: "/projects/block-miner",
    highlights: [
      "Idle/clicker game mechanics with upgrades",
      "Pixel art aesthetic with satisfying animations",
      "Mobile-friendly tap controls",
    ],
  },
  {
    id: "package-sorter",
    title: "Package Sorting System",
    description:
      "Robotic arm dispatch controller that sorts packages into STANDARD, SPECIAL, or REJECTED stacks based on dimensions and mass.",
    techStack: ["React 19", "TypeScript", "Next.js", "Tailwind CSS"],
    github: "https://github.com/LFilip/lfilip-portfolio/blob/main/app/projects/package-sorter/README.md",
    demoPath: "/projects/package-sorter",
    highlights: [
      "Clean sorting algorithm with full test coverage",
      "Real-time classification as you adjust sliders",
      "Factory dashboard UI with package history",
    ],
  },
  {
    id: "localpet-virtual-pet-game",
    title: "LocalPet - Virtual Pet Game",
    description:
      "Interactive virtual pet game with real-time stat management. Features a game loop, localStorage persistence, and animated transitions.",
    techStack: ["React 19", "TypeScript", "Zustand", "Tailwind CSS"],
    demoPath: "/projects/pet",
    highlights: [
      "Real-time game loop with stat degradation",
      "Zustand state management with localStorage persistence",
      "Animated diagonal wipe transition effect",
    ],
  },
  {
    id: "portfolio-website",
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
    id: "government-application-dashboard",
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
    id: "user-analytics-dashboard",
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
    id: "3d-browser-based-map",
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
