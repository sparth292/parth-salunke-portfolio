"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { social } from "@/data/social";
import GlassPanel from "@/components/ui/GlassPanel";
import GlowButton from "@/components/ui/GlowButton";
import Particles from "@/components/effects/Particles";
import GridOverlay from "@/components/effects/GridOverlay";

interface GitHubData {
  user: {
    login: string;
    name: string;
    bio: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    location: string;
  };
  repos: {
    id: number;
    name: string;
    description: string;
    url: string;
    language: string;
    stars: number;
    forks: number;
    updated: string;
    topics: string[];
    fork: boolean;
  }[];
  events: {
    id: string;
    type: string;
    repo: string;
    created_at: string;
    action?: string;
  }[];
  contributions: { date: string; count: number }[];
  totalContributions: number;
}

const LANG_COLORS: Record<string, string> = {
  Dart: "#54C5F8",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776AB",
  Java: "#E76F00",
  "C++": "#00599C",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

function formatEvent(type: string, action?: string) {
  const map: Record<string, string> = {
    PushEvent: "Pushed to",
    CreateEvent: "Created",
    WatchEvent: "Starred",
    ForkEvent: "Forked",
    IssuesEvent: action ? `${action} issue in` : "Issue in",
    PullRequestEvent: action ? `${action} PR in` : "PR in",
  };
  return map[type] ?? type.replace("Event", "");
}

function ContributionGrid({ contributions }: { contributions: { date: string; count: number }[] }) {
  if (!contributions.length) {
    return (
      <div className="flex justify-center py-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://ghchart.rshah.org/00f0ff/${social.githubUsername}`}
          alt="GitHub contributions"
          className="max-w-full rounded-lg opacity-90"
        />
      </div>
    );
  }

  const max = Math.max(...contributions.map((c) => c.count), 1);
  const weeks: { date: string; count: number }[][] = [];
  let week: { date: string; count: number }[] = [];

  contributions.forEach((day, i) => {
    week.push(day);
    const d = new Date(day.date);
    if (d.getDay() === 6 || i === contributions.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-max">
        {weeks.map((w, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {w.map((day) => {
              const intensity = day.count / max;
              return (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} contributions`}
                  className="h-3 w-3 rounded-sm transition-transform hover:scale-125"
                  style={{
                    background:
                      day.count === 0
                        ? "rgba(255,255,255,0.06)"
                        : `rgba(0, 240, 255, ${0.2 + intensity * 0.8})`,
                    boxShadow:
                      day.count > 0 ? `0 0 ${intensity * 8}px rgba(0,240,255,0.5)` : undefined,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[10px] text-zinc-500">
        <span>Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((l) => (
          <div
            key={l}
            className="h-3 w-3 rounded-sm"
            style={{ background: `rgba(0, 240, 255, ${0.15 + l * 0.85})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default function GitHubHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setData)
      .catch(() => setError("Could not load GitHub data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050508] text-white">
      <Particles />
      <GridOverlay />

      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-cyan-500/10 bg-[#050508]/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs tracking-widest text-cyan-400 hover:text-cyan-300"
          >
            ← COMMAND CENTER
          </Link>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-fuchsia-400 hover:underline"
          >
            OPEN ON GITHUB →
          </a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-cyan-500/80 uppercase">
            // GitHub Terminal
          </span>
          <h1 className="mt-3 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Code Repository
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Live feed from @{social.githubUsername} — repos, contributions, and activity.
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 font-mono text-cyan-400">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              FETCHING GITHUB DATA…
            </motion.div>
          </div>
        )}

        {error && (
          <GlassPanel className="p-8 text-center" glow="cyan">
            <p className="text-rose-400">{error}</p>
            <a href={social.github} className="mt-4 inline-block font-mono text-sm text-cyan-400">
              View profile on GitHub →
            </a>
          </GlassPanel>
        )}

        {data && (
          <div className="space-y-10">
            {/* Profile */}
            <GlassPanel className="p-8" glow="cyan">
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-500/30">
                  <Image
                    src={data.user.avatar_url}
                    alt={data.user.login}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{data.user.name || data.user.login}</h2>
                  <p className="font-mono text-sm text-cyan-400">@{data.user.login}</p>
                  {data.user.bio && (
                    <p className="mt-3 text-zinc-400">{data.user.bio}</p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-6 font-mono text-xs">
                    <span className="text-zinc-500">
                      <span className="text-white">{data.user.public_repos}</span> repos
                    </span>
                    <span className="text-zinc-500">
                      <span className="text-white">{data.user.followers}</span> followers
                    </span>
                    <span className="text-zinc-500">
                      <span className="text-white">{data.user.following}</span> following
                    </span>
                    {data.totalContributions > 0 && (
                      <span className="text-zinc-500">
                        <span className="text-cyan-300">{data.totalContributions}</span> contributions
                        (last year)
                      </span>
                    )}
                  </div>
                </div>
                <GlowButton href={social.github} variant="primary">
                  Follow on GitHub
                </GlowButton>
              </div>
            </GlassPanel>

            {/* Contributions */}
            <GlassPanel className="p-8" glow="magenta">
              <h3 className="mb-6 font-mono text-xs tracking-[0.3em] text-fuchsia-400 uppercase">
                Contribution Graph
              </h3>
              <ContributionGrid contributions={data.contributions} />
            </GlassPanel>

            {/* Repos */}
            <div>
              <h3 className="mb-6 font-mono text-xs tracking-[0.3em] text-cyan-500 uppercase">
                Repositories
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {data.repos
                  .filter((r) => !r.fork)
                  .map((repo, i) => (
                    <motion.a
                      key={repo.id}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="block"
                    >
                      <GlassPanel className="h-full p-6 transition-all hover:border-cyan-500/30" glow="cyan">
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-mono text-sm text-cyan-300">{repo.name}</span>
                          {repo.language && (
                            <span
                              className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]"
                              style={{
                                color: LANG_COLORS[repo.language] ?? "#aaa",
                                border: `1px solid ${LANG_COLORS[repo.language] ?? "#aaa"}44`,
                              }}
                            >
                              {repo.language}
                            </span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="mt-3 line-clamp-2 text-sm text-zinc-500">
                            {repo.description}
                          </p>
                        )}
                        <div className="mt-4 flex gap-4 font-mono text-[10px] text-zinc-600">
                          <span>★ {repo.stars}</span>
                          <span>⑂ {repo.forks}</span>
                          <span>
                            {new Date(repo.updated).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </GlassPanel>
                    </motion.a>
                  ))}
              </div>
            </div>

            {/* Activity */}
            <GlassPanel className="p-8" glow="purple">
              <h3 className="mb-6 font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {data.events.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-wrap items-baseline gap-2 border-b border-white/5 py-3 font-mono text-xs last:border-0"
                  >
                    <span className="text-emerald-400">{formatEvent(event.type, event.action)}</span>
                    <span className="text-cyan-300">{event.repo}</span>
                    <span className="ml-auto text-zinc-600">
                      {new Date(event.created_at).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                {data.events.length === 0 && (
                  <p className="text-zinc-500">No public activity yet.</p>
                )}
              </div>
            </GlassPanel>

            <div className="text-center">
              <Link href="/#projects" className="font-mono text-xs text-zinc-500 hover:text-cyan-400">
                ← Back to app showcases
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
