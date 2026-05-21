"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  download?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function GlowButton({
  children,
  href,
  download,
  onClick,
  type = "button",
  variant = "primary",
  className,
}: GlowButtonProps) {
  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium tracking-wider uppercase transition-all duration-300",
    variant === "primary" &&
      "border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]",
    variant === "secondary" &&
      "border border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:shadow-[0_0_30px_rgba(255,0,170,0.3)]",
    variant === "ghost" &&
      "border border-white/20 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300",
    className
  );

  const content = (
    <motion.span className={base} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.span>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (download) {
      return (
        <a href={href} download={download} className="inline-block">
          {content}
        </a>
      );
    }
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {content}
        </a>
      );
    }
    if (href.startsWith("#") || href.startsWith("/")) {
      const isPageRoute =
        !href.startsWith("#") &&
        !href.includes(".") &&
        !href.startsWith("/resume/");
      if (isPageRoute) {
        return (
          <Link href={href} className="inline-block">
            {content}
          </Link>
        );
      }
      return (
        <a href={href} className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
