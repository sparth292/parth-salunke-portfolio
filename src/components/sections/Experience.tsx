"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          label="Module 06"
          title="Experience Timeline"
          subtitle="Career nodes across the network"
        />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-cyan-500 via-fuchsia-500 to-transparent md:left-1/2 md:-translate-x-px" />

          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              className={`relative mb-12 flex items-start gap-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="hidden flex-1 md:block" />

              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center">
                <motion.div
                  className="h-4 w-4 rounded-full bg-cyan-400"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0,240,255,0.4)",
                      "0 0 0 12px rgba(0,240,255,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute h-8 w-8 rounded-full border border-cyan-500/30" />
              </div>

              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                <span className="font-mono text-xs text-cyan-500">{item.period}</span>
                <h3 className="mt-1 text-xl font-bold text-white">{item.role}</h3>
                <p className="text-sm text-fuchsia-400">{item.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
