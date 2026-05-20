"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/#hero" },
  { label: "GitHub", href: "/github" },
  { label: "Apps", href: "/#projects" },
  { label: "Wallpapers", href: "/#wallpapers" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-cyan-500/10 bg-[#050508]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 3.5, duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/#hero" className="font-mono text-sm tracking-widest text-cyan-400">
          <span className="text-fuchsia-400">&lt;</span>
          DEV.SYS
          <span className="text-fuchsia-400">/&gt;</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 font-mono text-xs tracking-wider text-zinc-400 uppercase transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="font-mono text-xs text-cyan-400 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="border-t border-cyan-500/10 bg-[#050508]/95 backdrop-blur-xl lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 font-mono text-sm text-zinc-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
