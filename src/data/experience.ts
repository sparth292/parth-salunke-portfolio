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
    id: "spit",
    role: "Junior Network Engineer",
    org: "SPIT",
    period: "2024 — Present",
    description:
      "Maintained campus network infrastructure, configured routing protocols, and supported secure connectivity for academic systems.",
    tags: ["Networking", "Cisco", "Security"],
  },
  {
    id: "gssoc",
    role: "Open Source Contributor",
    org: "GirlScript Summer of Code",
    period: "2023 — 2024",
    description:
      "Contributed to open-source repositories, resolved issues, and collaborated with global developers on production-grade codebases.",
    tags: ["Open Source", "Git", "Collaboration"],
  },
  {
    id: "freelance",
    role: "Freelance Developer",
    org: "Independent Projects",
    period: "2022 — Present",
    description:
      "Delivered mobile apps, web dashboards, and automation tools for clients across fintech, education, and community sectors.",
    tags: ["Flutter", "Full-Stack", "Client Work"],
  },
];
