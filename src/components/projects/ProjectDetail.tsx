"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { PhoneFrame } from "@/components/ui/AppShowcase";
import GlassPanel from "@/components/ui/GlassPanel";
import Particles from "@/components/effects/Particles";
import GridOverlay from "@/components/effects/GridOverlay";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.from(".project-reveal", {
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050508] text-white">
      <Particles />
      <GridOverlay />

      <div className="relative z-10">
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-cyan-500/10 bg-[#050508]/80 px-6 py-4 backdrop-blur-xl">
          <Link
            href="/#projects"
            className="font-mono text-xs tracking-widest text-cyan-400 hover:text-cyan-300"
          >
            ← BACK TO PROJECTS
          </Link>
        </nav>

        <section
          ref={heroRef}
          className={`relative px-6 pt-32 pb-20 bg-gradient-to-b ${project.gradient} to-[#050508]`}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div className="project-reveal">
              <span
                className="font-mono text-xs tracking-[0.3em] uppercase"
                style={{ color: project.accent }}
              >
                {project.category}
              </span>
              <h1 className="mt-4 text-5xl font-bold md:text-7xl">{project.title}</h1>
              <p className="mt-2 text-xl text-zinc-400">{project.tagline}</p>
              <p className="mt-6 max-w-lg leading-relaxed text-zinc-500">
                {project.description}
              </p>
            </div>
            <div className="project-reveal flex flex-col items-center">
              <PhoneFrame
                src={project.screenshots[index]}
                accent={project.accent}
                alt={project.title}
              />
              {project.screenshots.length > 1 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {project.screenshots.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`relative h-16 w-10 overflow-hidden rounded-lg border transition-all ${
                        i === index ? "border-cyan-400" : "border-white/10 opacity-60"
                      }`}
                    >
                      <Image src={src} alt="" fill className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="project-reveal mb-12 text-center font-mono text-xs tracking-[0.4em] text-cyan-500 uppercase">
              App Screenshots
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {project.screenshots.map((src, i) => (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="project-reveal relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image src={src} alt={`Screen ${i + 1}`} fill className="object-cover object-top" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="project-reveal mb-12 text-center font-mono text-xs tracking-[0.4em] text-cyan-500 uppercase">
              Core Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, i) => (
                <GlassPanel key={feature} className="h-full p-6" glow={i % 2 === 0 ? "cyan" : "magenta"}>
                  <span className="font-mono text-2xl font-bold" style={{ color: project.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">{feature}</p>
                </GlassPanel>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 pb-32 text-center">
          <Link
            href="/#projects"
            className="font-mono text-xs text-cyan-400 hover:underline"
          >
            ← All Projects
          </Link>
        </section>
      </div>
    </div>
  );
}
