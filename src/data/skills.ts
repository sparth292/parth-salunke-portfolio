export interface Skill {
  name: string;
  logoSlug: string;
  /** Local or absolute URL — used instead of Simple Icons CDN when set */
  logoSrc?: string;
  category: string;
  color: string;
  description: string;
}

/** Simple Icons CDN — https://simpleicons.org */
export function getSkillLogoUrl(skill: Skill, colorOverride?: string) {
  if (skill.logoSrc) return skill.logoSrc;
  const hex = (colorOverride ?? skill.color).replace("#", "");
  return `https://cdn.simpleicons.org/${skill.logoSlug}/${hex}`;
}

export const skills: Skill[] = [
  {
    name: "Flutter",
    logoSlug: "flutter",
    category: "Mobile",
    color: "#54C5F8",
    description:
      "Cross-platform mobile apps with reactive UI, state management, and native performance.",
  },
  {
    name: "Firebase",
    logoSlug: "firebase",
    category: "Backend",
    color: "#FFCA28",
    description:
      "Auth, Firestore, Cloud Functions, and real-time sync for production mobile backends.",
  },
  {
    name: "Java",
    logoSlug: "openjdk",
    category: "Language",
    color: "#ED8B00",
    description:
      "Enterprise backends, Spring ecosystems, and robust OOP for scalable systems.",
  },
  {
    name: "C++",
    logoSlug: "cplusplus",
    category: "Language",
    color: "#00599C",
    description:
      "Performance-critical logic, systems programming, and competitive problem solving.",
  },
  {
    name: "Python",
    logoSlug: "python",
    category: "Language",
    color: "#3776AB",
    description: "ML pipelines, automation scripts, APIs, and cybersecurity tooling.",
  },
  {
    name: "Docker",
    logoSlug: "docker",
    category: "DevOps",
    color: "#2496ED",
    description:
      "Containerized deployments, reproducible environments, and service orchestration.",
  },
  {
    name: "AWS",
    logoSlug: "amazonaws",
    logoSrc: "/icons/aws.svg",
    category: "Cloud",
    color: "#FF9900",
    description:
      "EC2 instances, networking, and hosting full-stack applications on Amazon Web Services.",
  },
  {
    name: "GitHub",
    logoSlug: "github",
    category: "Tools",
    color: "#ffffff",
    description:
      "Version control, open source collaboration, CI workflows, and project shipping.",
  },
  {
    name: "Supabase",
    logoSlug: "supabase",
    category: "Backend",
    color: "#3ECF8E",
    description:
      "Postgres-backed BaaS with auth, storage, and edge functions for rapid builds.",
  },
  {
    name: "Figma",
    logoSlug: "figma",
    category: "Design",
    color: "#F24E1E",
    description:
      "UI/UX prototyping, design systems, and developer handoff for polished interfaces.",
  },
];
