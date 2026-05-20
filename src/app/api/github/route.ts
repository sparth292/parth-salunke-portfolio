import { NextResponse } from "next/server";

const USERNAME = "sparth292";

export const revalidate = 3600;

export async function GET() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "parth-portfolio",
  };

  try {
    const [userRes, reposRes, eventsRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12&type=owner`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(
        `https://api.github.com/users/${USERNAME}/events/public?per_page=20`,
        { headers, next: { revalidate: 3600 } }
      ),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { next: { revalidate: 3600 } }
      ).catch(() => null),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];
    const events = eventsRes.ok ? await eventsRes.json() : [];
    let contributions: { date: string; count: number }[] = [];
    let totalContributions = 0;

    if (contribRes?.ok) {
      const contribData = await contribRes.json();
      contributions = contribData.contributions ?? [];
      totalContributions = contributions.reduce(
        (sum: number, d: { count: number }) => sum + d.count,
        0
      );
    }

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        location: user.location,
      },
      repos: repos.map(
        (r: {
          id: number;
          name: string;
          description: string;
          html_url: string;
          language: string;
          stargazers_count: number;
          forks_count: number;
          updated_at: string;
          topics?: string[];
          fork: boolean;
        }) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          url: r.html_url,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updated: r.updated_at,
          topics: r.topics ?? [],
          fork: r.fork,
        })
      ),
      events: events.slice(0, 15).map(
        (e: {
          id: string;
          type: string;
          repo: { name: string };
          created_at: string;
          payload?: { action?: string };
        }) => ({
          id: e.id,
          type: e.type,
          repo: e.repo?.name,
          created_at: e.created_at,
          action: e.payload?.action,
        })
      ),
      contributions,
      totalContributions,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
