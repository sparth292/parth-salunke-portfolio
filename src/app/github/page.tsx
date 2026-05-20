import type { Metadata } from "next";
import GitHubHub from "@/components/github/GitHubHub";

export const metadata: Metadata = {
  title: "GitHub | Parth Salunke",
  description: "Repositories, contributions, and open source activity by Parth Salunke.",
};

export default function GitHubPage() {
  return <GitHubHub />;
}
