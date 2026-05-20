"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassPanel from "@/components/ui/GlassPanel";
import AppShowcase, { PhoneFrame } from "@/components/ui/AppShowcase";

gsap.registerPlugin(ScrollTrigger);

function ProjectShowcaseModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [project.slug]);

  return (
    <motion.div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-[#050508]/95 p-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-cyan-500/20 bg-[#0a0a12]/90 p-8"
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs text-zinc-500 hover:text-cyan-300"
        >
          [ CLOSE ]
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: project.accent }}
            >
              {project.category}
            </span>
            <h3 className="mt-2 text-3xl font-bold">{project.title}</h3>
            <p className="mt-2 text-zinc-400">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <PhoneFrame
              src={project.screenshots[index]}
              accent={project.accent}
              alt={`${project.title} screenshot`}
            />
            {project.screenshots.length > 1 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {project.screenshots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`relative h-14 w-8 overflow-hidden rounded-md border transition-all ${
                      i === index
                        ? "border-cyan-400 scale-110"
                        : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Module 01"
          title="Project Showcase"
          subtitle="Real apps built & shipped — swipe through screenshots"
        />

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.button
              key={project.slug}
              type="button"
              onClick={() => setActiveProject(project)}
              className="project-card group w-full text-left"
            >
              <GlassPanel
                className={`h-full bg-gradient-to-br ${project.gradient} p-0`}
                glow={i % 2 === 0 ? "cyan" : "magenta"}
              >
                <div className="grid gap-6 p-8 md:grid-cols-2 md:items-center">
                  <div className="order-2 md:order-1">
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: project.accent }}
                    >
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-white transition-colors group-hover:text-cyan-200">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{project.tagline}</p>
                    <p className="mt-4 line-clamp-2 text-sm text-zinc-500">
                      {project.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
                      VIEW APP SHOWCASE →
                    </span>
                  </div>
                  <div
                    className="order-1 flex justify-center md:order-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AppShowcase
                      key={project.slug}
                      screenshots={project.screenshots}
                      accent={project.accent}
                      alt={project.title}
                    />
                  </div>
                </div>
              </GlassPanel>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectShowcaseModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
