"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, type Skill } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillLogo from "@/components/ui/SkillLogo";

const COUNT = skills.length;
const RADIUS = 240;

function polarToCartesian(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

export default function SkillsWheel() {
  const [active, setActive] = useState<Skill>(skills[0]);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setRotation((r) => r + 0.12), 50);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => {
        const idx = skills.findIndex((s) => s.name === prev.name);
        return skills[(idx + 1) % COUNT];
      });
    }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-500/5" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          label="Module 05"
          title="Tech Orbit"
          subtitle="Spin the wheel and know my skills"
        />

        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ minHeight: 580 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Rotating orbit */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ rotate: `${rotation}deg` }}
          >
            <svg
              className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible"
              width={RADIUS * 2 + 100}
              height={RADIUS * 2 + 100}
              style={{ left: -(RADIUS + 50), top: -(RADIUS + 50) }}
            >
              <circle
                cx={RADIUS + 50}
                cy={RADIUS + 50}
                r={RADIUS}
                fill="none"
                stroke="rgba(0,240,255,0.15)"
                strokeWidth="1"
                strokeDasharray="6 10"
              />
            </svg>

            {skills.map((skill, i) => {
              const { x, y } = polarToCartesian(i, COUNT, RADIUS);
              const isActive = skill.name === active.name;
              return (
                <button
                  key={skill.name}
                  type="button"
                  className="absolute flex flex-col items-center transition-transform hover:scale-110"
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setActive(skill)}
                >
                  {/* Counter-rotate so logos stay upright */}
                  <div
                    className="flex flex-col items-center"
                    style={{ transform: `rotate(${-rotation}deg)` }}
                  >
                    <div
                      className={`flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_40px_rgba(0,240,255,0.35)]"
                          : "border-white/15 bg-[#0a0a12]/90 hover:border-cyan-500/40"
                      }`}
                    >
                      <SkillLogo skill={skill} size={28} />
                      <span className="max-w-[60px] truncate font-mono text-[7px] text-zinc-500">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Center hub — fixed, does not rotate */}
          <div className="relative z-20 flex h-72 w-72 flex-col items-center justify-center rounded-full border border-cyan-500/30 bg-[#0a0a12]/95 p-7 text-center backdrop-blur-xl shadow-[0_0_80px_rgba(0,240,255,0.1)] md:h-80 md:w-80">
            <div
              className="pointer-events-none absolute inset-3 rounded-full opacity-40"
              style={{
                background: `conic-gradient(from 0deg, ${active.color}33, transparent, ${active.color}18)`,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 flex flex-col items-center px-2"
              >
                <div
                  className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                  style={{ boxShadow: `0 0 24px ${active.color}33` }}
                >
                  <SkillLogo skill={active} size={44} priority />
                </div>
                <h3 className="mt-3 text-xl font-bold text-white md:text-2xl">{active.name}</h3>
                <span
                  className="mt-1 block font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: active.color }}
                >
                  {active.category}
                </span>
                <p className="mt-3 max-w-[11rem] text-[10px] leading-snug text-zinc-400 md:max-w-[12.5rem] md:text-[11px]">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-[10px] text-zinc-600">
          Hover to pause · Click a node on the orbit
        </p>
      </div>
    </section>
  );
}
