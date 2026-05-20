"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "purple" | "none";
  hover?: boolean;
}

const glowMap = {
  cyan: "hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] border-cyan-500/20",
  magenta: "hover:shadow-[0_0_40px_rgba(255,0,170,0.15)] border-fuchsia-500/20",
  purple: "hover:shadow-[0_0_40px_rgba(123,47,255,0.15)] border-violet-500/20",
  none: "border-white/10",
};

export default function GlassPanel({
  children,
  className,
  glow = "cyan",
  hover = true,
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white/[0.03] backdrop-blur-xl",
        glowMap[glow],
        hover && "transition-all duration-500",
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
      {children}
    </motion.div>
  );
}
