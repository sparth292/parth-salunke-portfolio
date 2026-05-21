"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";

const ROLES = [
  "Frontend Developer",
  "Flutter Developer",
  "Cybersecurity Enthusiast",
  "UI/UX Explorer",
];

const RESUME_PATH = "/resume/Parth's Resume.pdf";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-24 pb-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.h1
          className="text-5xl font-bold leading-[1.15] tracking-tight md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.9, ease: "easeOut" }}
        >
          <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Parth
          </span>
          <span className="mt-1 block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent md:mt-2">
            Salunke
          </span>
        </motion.h1>

        <div className="mx-auto mt-8 flex h-10 max-w-md items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={ROLES[roleIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-lg text-cyan-300/90 md:text-xl"
            >
              <span className="text-fuchsia-400">&gt;</span> {ROLES[roleIndex]}
              <span className="ml-1 animate-pulse text-cyan-400">_</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          className="mx-auto mt-6 max-w-lg text-zinc-400 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.6 }}
        >
          Building immersive digital experiences at the intersection of
          mobile engineering, cybersecurity, and futuristic interface design.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5 }}
        >
          <GlowButton href="#wallpapers">View Wallpapers</GlowButton>
          <GlowButton href="/github" variant="secondary">
            Explore Projects
          </GlowButton>
          <GlowButton
            href={RESUME_PATH}
            download="Parth_Salunke_Resume.pdf"
            variant="ghost"
          >
            Download My Resume
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
