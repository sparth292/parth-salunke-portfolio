"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";
import HeroShipTitle from "@/components/sections/HeroShipTitle";

const ROLES = [
  "Frontend Developer",
  "Flutter Developer",
  "Cybersecurity Enthusiast",
  "UI/UX Explorer",
];

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
      {/* Ambient hero glow — no orb */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.6 }}
          className="mb-6 font-mono text-xs tracking-[0.3em] text-cyan-500/70"
        >
          // INCOMING TRANSMISSION
        </motion.div>

        <HeroShipTitle />

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
          transition={{ delay: 5.2, duration: 0.6 }}
        >
          Building immersive digital experiences at the intersection of
          mobile engineering, cybersecurity, and futuristic interface design.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5 }}
        >
          <GlowButton href="#wallpapers">View Wallpapers</GlowButton>
          <GlowButton href="/github" variant="secondary">
            Explore Projects
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
