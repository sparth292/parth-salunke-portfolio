"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { social } from "@/data/social";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassPanel from "@/components/ui/GlassPanel";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  text: string;
}

const HELP_TEXT = `Available commands:
  help       — Show this message
  github     — Open GitHub hub (repos & contributions)
  projects   — List app showcases
  skills     — List tech orbit nodes
  contact    — Show contact & social links
  clear      — Clear terminal
  showcase   — Jump to app gallery`;

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "success", text: "ParthOS Terminal v3.0 — Type 'help' to begin" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: "input", text: `> ${cmd}` }];

    if (!trimmed) {
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    if (trimmed === "help") {
      newLines.push({ type: "output", text: HELP_TEXT });
    } else if (trimmed === "clear") {
      setLines([]);
      return;
    } else if (trimmed === "github") {
      newLines.push({ type: "success", text: "  Opening GitHub hub…" });
      setLines((prev) => [...prev, ...newLines]);
      setTimeout(() => router.push("/github"), 400);
      return;
    } else if (trimmed === "projects") {
      projects.forEach((p) => {
        newLines.push({
          type: "output",
          text: `  ▸ ${p.slug.padEnd(22)} ${p.title}`,
        });
      });
    } else if (trimmed === "skills") {
      skills.forEach((s) => {
        newLines.push({
          type: "output",
          text: `  • ${s.name.padEnd(14)} ${s.category} — ${s.description.slice(0, 50)}…`,
        });
      });
    } else if (trimmed === "contact") {
      newLines.push(
        { type: "output", text: `  Email:     ${social.email}` },
        { type: "output", text: `  GitHub:    ${social.github}` },
        { type: "output", text: `  LinkedIn:  ${social.linkedin}` },
        { type: "output", text: `  Twitter:   ${social.twitter}` },
        { type: "output", text: `  Instagram: ${social.instagram}` },
        { type: "output", text: `  Pinterest: ${social.pinterest}` },
        { type: "success", text: "  Channel open. Awaiting transmission…" }
      );
    } else if (trimmed === "showcase") {
      newLines.push({ type: "success", text: "  Opening app showcase…" });
      setLines((prev) => [...prev, ...newLines]);
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return;
    } else {
      newLines.push({
        type: "error",
        text: `  Unknown command: '${trimmed}'. Type 'help' for options.`,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] ?? "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="terminal" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="Module 04"
          title="System Terminal"
          subtitle="Try 'github' or 'contact' — full social graph"
        />

        <GlassPanel className="overflow-hidden" glow="cyan">
          <div
            className="flex cursor-text flex-col font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
            role="presentation"
          >
            <div className="flex items-center gap-2 border-b border-cyan-500/20 bg-black/40 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs text-zinc-500">parth@command-center:~</span>
            </div>

            <div ref={scrollRef} className="h-80 overflow-y-auto p-4 md:h-96">
              {lines.map((line, i) => (
                <motion.div
                  key={`${line.text}-${i}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-1 whitespace-pre-wrap leading-relaxed ${
                    line.type === "input"
                      ? "text-cyan-300"
                      : line.type === "error"
                        ? "text-rose-400"
                        : line.type === "success"
                          ? "text-emerald-400"
                          : "text-zinc-400"
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-cyan-500/20 bg-black/60 px-4 py-3">
              <span className="text-emerald-400">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-cyan-100 outline-none placeholder:text-zinc-600"
                placeholder="Enter command…"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
