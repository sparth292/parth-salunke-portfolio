"use client";

import { motion } from "framer-motion";

interface PhoneMockupProps {
  accent: string;
  gradient: string;
  screens?: string[];
}

export default function PhoneMockup({
  accent,
  gradient,
  screens = ["Dashboard", "Features", "Analytics"],
}: PhoneMockupProps) {
  return (
    <div className="relative mx-auto w-[220px] md:w-[260px]">
      <motion.div
        className="relative rounded-[2.5rem] border-2 border-zinc-700/80 bg-zinc-900 p-2 shadow-2xl"
        style={{ boxShadow: `0 0 60px ${accent}33` }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div
          className={`relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient}`}
        >
          <div className="absolute inset-0 flex flex-col gap-2 p-4 pt-10">
            <div className="h-2 w-16 rounded bg-white/20" />
            <div className="mt-2 h-20 rounded-lg border border-white/10 bg-black/30 backdrop-blur" />
            {screens.map((s, i) => (
              <motion.div
                key={s}
                className="rounded-lg border border-white/10 bg-black/20 p-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
              >
                <div className="text-[10px] text-white/60">{s}</div>
                <div className="mt-1 h-1.5 w-full rounded bg-white/10" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-white/10" />
              </motion.div>
            ))}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 opacity-40"
            style={{ background: `linear-gradient(transparent, ${accent}44)` }}
          />
        </div>
      </motion.div>
      <div
        className="absolute -inset-8 -z-10 rounded-full blur-3xl"
        style={{ background: accent, opacity: 0.15 }}
      />
    </div>
  );
}
