export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  gradient: string;
  accent: string;
  features: string[];
  tech: { name: string; level: number }[];
  screenshots: string[];
  github?: string;
  demo?: string;
  category: string;
}

export const projects: Project[] = [
  {
    slug: "rakshak",
    title: "Rakshak",
    tagline: "AI Women Safety Platform",
    description:
      "Real-time safety companion with SOS triggers, live location sharing, AI threat detection, and instant alert routing to trusted contacts and authorities.",
    gradient: "from-rose-500/30 via-fuchsia-600/20 to-cyan-500/30",
    accent: "#ff2d6a",
    screenshots: [
      "/screens/rakshak/rakshak_1.png",
      "/screens/rakshak/rakshak_2.png",
      "/screens/rakshak/rakshak_3.png",
    ],
    features: [
      "One-tap SOS with geolocation broadcast",
      "AI-powered anomaly & route deviation alerts",
      "Trusted contact mesh notifications",
      "Offline-safe emergency protocols",
      "Voice-activated distress signals",
    ],
    tech: [
      { name: "Flutter", level: 95 },
      { name: "Firebase", level: 90 },
      { name: "Google Maps API", level: 85 },
      { name: "TensorFlow Lite", level: 75 },
      { name: "Cloud Functions", level: 80 },
    ],
    category: "Mobile · AI · Safety",
  },
  {
    slug: "upi-fraud-detection",
    title: "UPI Fraud Detection",
    tagline: "Cybersecurity Intelligence Platform",
    description:
      "ML-driven fraud detection engine analyzing UPI transaction patterns, velocity anomalies, and behavioral fingerprints to flag suspicious activity in real time.",
    gradient: "from-emerald-500/30 via-cyan-500/20 to-violet-600/30",
    accent: "#00ffc8",
    screenshots: [
      "/screens/upi/upi_1.png",
      "/screens/upi/upi_2.png",
      "/screens/upi/upi_3.png",
      "/screens/upi/upi_4.jpeg",
      "/screens/upi/upi_6.jpeg",
      "/screens/upi/upi_5.png",
    ],
    features: [
      "Real-time transaction scoring",
      "Behavioral fingerprint analysis",
      "Admin threat dashboard",
      "Rule engine + ML hybrid detection",
      "Audit logs & compliance exports",
    ],
    tech: [
      { name: "Python", level: 92 },
      { name: "Scikit-learn", level: 88 },
      { name: "Flask", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Docker", level: 78 },
    ],
    category: "Security · ML · FinTech",
  },
  {
    slug: "college-management",
    title: "College Management System",
    tagline: "Smart Campus Automation",
    description:
      "End-to-end academic operations platform with biometric attendance, automated grading workflows, and real-time analytics for administrators and faculty.",
    gradient: "from-blue-500/30 via-indigo-600/20 to-purple-500/30",
    accent: "#4d7cff",
    screenshots: [
      "/screens/college/college_1.jpeg",
      "/screens/college/college_2.jpeg",
      "/screens/college/college_3.jpeg",
    ],
    features: [
      "QR & biometric attendance",
      "Automated grade computation",
      "Role-based access control",
      "Live dashboard analytics",
      "Notice & timetable modules",
    ],
    tech: [
      { name: "Java", level: 90 },
      { name: "Spring Boot", level: 85 },
      { name: "MySQL", level: 88 },
      { name: "React", level: 82 },
      { name: "Docker", level: 75 },
    ],
    category: "Enterprise · Education",
  },
  {
    slug: "utsava",
    title: "Utsava",
    tagline: "Ganesh Festival Tracker",
    description:
      "Community-driven festival platform mapping mandals, live darshan streams, crowd density heatmaps, and event schedules across the city.",
    gradient: "from-amber-500/30 via-orange-600/20 to-rose-500/30",
    accent: "#ff9f1c",
    screenshots: [
      "/screens/utsava/utsava_1.png",
      "/screens/utsava/utsava_2.png",
      "/screens/utsava/utsava_3.png",
      "/screens/utsava/utsava_4.png",
      "/screens/utsava/utsava_5.png",
      "/screens/utsava/utsava_6.png",
    ],
    features: [
      "Interactive mandal map",
      "Live event countdowns",
      "Crowd density indicators",
      "Photo & story sharing",
      "Push notifications for aartis",
    ],
    tech: [
      { name: "Flutter", level: 92 },
      { name: "Firebase", level: 88 },
      { name: "Google Maps", level: 90 },
      { name: "Supabase", level: 80 },
      { name: "Figma", level: 85 },
    ],
    category: "Community · Mobile",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
