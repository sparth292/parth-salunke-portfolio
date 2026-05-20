"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-16 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <span className="font-mono text-xs tracking-[0.4em] text-cyan-500/80 uppercase">
        {label}
      </span>
      <h2 className="mt-3 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-zinc-500">{subtitle}</p>
      )}
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </motion.div>
  );
}
