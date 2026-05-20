"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import GlowButton from "@/components/ui/GlowButton";

const Scene3D = dynamic(() => import("@/components/effects/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-fuchsia-950/20" />
  ),
});

const ROLES = [
  "Frontend Developer",
  "Flutter Developer",
  "Cybersecurity Enthusiast",
  "UI/UX Explorer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, delay: 3.8, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-24 pb-12"
    >
      <Scene3D />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.6 }}
          className="mb-4 font-mono text-xs tracking-[0.3em] text-cyan-500/70"
        >
          // WELCOME TO THE COMMAND CENTER
        </motion.div>

        <h1
          ref={titleRef}
          className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Parth
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Salunke
          </span>
        </h1>

        <div className="mx-auto mt-6 flex h-10 max-w-md items-center justify-center overflow-hidden">
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
          transition={{ delay: 4.3 }}
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
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-600">
          <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
