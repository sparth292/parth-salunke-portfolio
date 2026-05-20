"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> INITIALIZING SYSTEM…", delay: 0 },
  { text: "> Loading developer modules…", delay: 600 },
  { text: "> Calibrating neural interface…", delay: 1200 },
  { text: "> Establishing secure channel…", delay: 1800 },
  { text: "> Access Granted.", delay: 2400, highlight: true },
];

const LOG_LINES = [
  "[OK] kernel.sys loaded",
  "[OK] graphics.drv initialized",
  "[OK] portfolio.exe mounted",
  "[OK] auth.token verified",
  "[OK] UI renderer online",
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [glitch, setGlitch] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    LOG_LINES.forEach((log, i) => {
      setTimeout(() => setLogs((prev) => [...prev, log]), 400 + i * 350);
    });

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 2000);

    const completeTimer = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 800);
    }, 3200);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#030306]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={`relative w-full max-w-2xl px-8 ${glitch ? "boot-glitch" : ""}`}
          >
            <div className="mb-8 font-mono text-xs tracking-[0.3em] text-cyan-500/60">
              SYS://BOOT_SEQUENCE_v2.4.1
            </div>

            <div className="space-y-3 font-mono text-sm md:text-base">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.highlight
                      ? "text-lg font-bold text-cyan-400 md:text-xl"
                      : "text-zinc-400"
                  }
                >
                  {line.text}
                  {i === visibleLines - 1 && (
                    <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-400" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 max-h-32 overflow-hidden rounded border border-cyan-500/20 bg-black/40 p-4 font-mono text-xs text-emerald-500/80">
              {logs.map((log) => (
                <motion.div
                  key={log}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="leading-relaxed"
                >
                  {log}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 h-1 overflow-hidden rounded-full bg-zinc-900">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030306_70%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
