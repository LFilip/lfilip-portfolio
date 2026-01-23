export interface Experience {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  highlights?: string[];
}

export const personalInfo = {
  name: "Louis J. Filip",
  title: "Full Stack Developer",
  email: "louisfilip@gmail.com",
  location: "Madison, AL",
};

export const intro =
  "Full Stack Developer with experience building secure government applications, real-time data systems, and developer tools. I specialize in React, TypeScript, and Node.js with a focus on creating efficient, maintainable solutions.";

export const experiences: Experience[] = [
  {
    company: "Booz Allen Hamilton Inc.",
    title: "Mid-Level Full Stack Developer",
    location: "Huntsville, AL",
    startDate: "May 2024",
    endDate: "Oct 2025",
    highlights: [
      "Develop and maintain secure government applications with a cross-functional team",
      "Build frontend applications using React, Next.js, and TypeScript",
      "Create backend services and APIs using NestJS and TypeScript",
      "Implement comprehensive unit tests to ensure code reliability",
    ],
  },
  {
    company: "Iva'al Solutions Inc.",
    title: "Mid-Level Full Stack Developer (Interim Team Lead)",
    location: "Huntsville, AL (Remote)",
    startDate: "Feb 2023",
    endDate: "May 2024",
    highlights: [
      "Engineered a dynamic user dashboard using Figma, React, and TypeScript",
      "Revamped backend APIs using TypeScript within AWS Lambda functions",
      "Directed a small team integrating a new microservice with a third-party system",
      "Leveraged Terraform for infrastructure as code",
    ],
  },
  {
    company: "Blue Halo",
    title: "Full Stack Developer",
    location: "Huntsville, AL",
    startDate: "Feb 2022",
    endDate: "Jan 2023",
    highlights: [
      "Contributed to a 3D browser-based map with real-time backend data",
      "Developed robust backend APIs for microservice interactions",
      "Built a functional design system using the molecular design method",
      "Maintained GitLab CI/CD pipelines for microservices",
    ],
  },
  {
    company: "A.I. Solutions",
    title: "Senior Software Engineer",
    location: "Huntsville, AL",
    startDate: "Apr 2021",
    endDate: "Feb 2022",
    highlights: [
      "Product Owner for Major System Component in a classified environment",
      "Maintained legacy radar systems in Perl and C++",
      "Developed custom Linux scripts with Cron automation",
      "Completed Security+ and Linux+ certifications ahead of deadline",
    ],
  },
  {
    company: "SAIC",
    title: "Software Engineer",
    location: "Huntsville, AL",
    startDate: "Feb 2019",
    endDate: "Apr 2021",
    highlights: [
      "Developed C++ embedded software in accordance with DO-178C",
      "Worked on hardware-in-the-loop Linux VM based systems",
      "Rewrote C++ STL printf to be deterministic, eliminating memory leaks",
      "Created documentation for software planning phases",
    ],
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "AWS",
  "Terraform",
  "Docker",
  "C++",
  "Python",
  "Perl",
  "SQL",
  "Git",
  "CI/CD",
  "Linux",
  "RTOS",
];

export const certifications = [
  "CompTIA Security+",
  "CompTIA Linux+",
  "CompTIA Cloud+",
  "Inactive Top Secret Clearance",
];

export const education: Education = {
  school: "The University of Alabama in Huntsville",
  degree: "Bachelor of Science in Computer Science",
  location: "Huntsville, AL",
  graduationDate: "December 2018",
  gpa: "3.54 Major GPA",
  highlights: [
    "Advanced C++ with Object Oriented Design",
    "Mobile Computing Applications",
    "Network Security",
    "Team Software Design",
  ],
};
