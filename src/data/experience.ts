export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "freelance",
    role: "Freelance Developer",
    org: "Independent Projects",
    period: "Sep 2025 — Dec 2025",
    description:
      "Delivered mobile apps, web dashboards, and automation tools for clients across fintech, education, and community sectors.",
    tags: ["Flutter", "Full-Stack", "Client Work"],
  },
  {
    id: "gssoc",
    role: "Open Source Contributor",
    org: "GirlScript Summer of Code",
    period: "Aug 2025 — Nov 2025",
    description:
      "Contributed to open-source repositories, resolved issues, and collaborated with global developers on production-grade codebases.",
    tags: ["Open Source", "Git", "Collaboration"],
  },
  {
    id: "spit",
    role: "Junior Network Engineer",
    org: "SPIT",
    period: "Jun 2025 — Oct 2025",
    description:
      "Maintained campus network infrastructure, configured routing protocols, and supported secure connectivity for academic systems.",
    tags: ["Networking", "Cisco", "Security"],
  },
];
