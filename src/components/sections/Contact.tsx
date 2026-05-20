"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { social, socialLinks } from "@/data/social";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassPanel from "@/components/ui/GlassPanel";
import GlowButton from "@/components/ui/GlowButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative px-6 py-32 pb-40">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="Module 07"
          title="Establish Connection"
          subtitle="Open a secure channel to collaborate"
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <GlassPanel className="lg:col-span-3 p-8" glow="cyan">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { key: "name", label: "IDENTITY", placeholder: "Your name" },
                { key: "email", label: "FREQUENCY", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="font-mono text-[10px] tracking-widest text-cyan-500/70">
                    {field.label}
                  </label>
                  <input
                    type={field.key === "email" ? "email" : "text"}
                    required
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-all focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-[10px] tracking-widest text-cyan-500/70">
                  TRANSMISSION
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Your message…"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition-all focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                />
              </div>
              <GlowButton type="submit" variant="primary">
                {sent ? "Transmission Sent ✓" : "Send Transmission"}
              </GlowButton>
            </form>
          </GlassPanel>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <GlassPanel className="flex-1 p-6" glow="magenta">
              <h4 className="font-mono text-xs tracking-widest text-fuchsia-400 uppercase">
                Social Nodes
              </h4>
              <div className="mt-6 flex flex-col gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5"
                    whileHover={{ x: 6 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-500/10 font-mono text-lg text-fuchsia-300">
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-sm text-zinc-300">{s.label}</span>
                      {s.label === "Email" && (
                        <span className="block truncate font-mono text-[10px] text-zinc-600">
                          {social.email}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-6 font-mono text-xs text-emerald-500/80" glow="none">
              <div>&gt; status: accepting projects</div>
              <div>&gt; response: &lt; 24h</div>
              <div>&gt; github: @{social.githubUsername}</div>
            </GlassPanel>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center font-mono text-xs text-zinc-600">
        <p>© 2026 Parth Salunke · Built with Next.js · Designed in the Command Center</p>
      </footer>
    </section>
  );
}
