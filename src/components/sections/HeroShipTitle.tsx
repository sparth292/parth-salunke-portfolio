"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function WarpStreaks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px origin-left"
          style={{
            top: `${8 + (i * 84) % 90}%`,
            left: "50%",
            width: "45%",
            background: `linear-gradient(90deg, transparent, ${
              i % 3 === 0 ? "rgba(59,130,246,0.5)" : "rgba(0,240,255,0.25)"
            }, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0, x: "-20%" }}
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0, 0.8, 0.6, 0],
            x: ["-20%", "0%", "80%", "120%"],
          }}
          transition={{
            duration: 1.8,
            delay: 3.8 + i * 0.04,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function Spaceship({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="shipBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="shipGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Engine trail */}
      <path
        d="M0 24 L35 22 L35 26 Z"
        fill="url(#shipBody)"
        opacity="0.5"
      />
      <path
        d="M35 20 L95 24 L95 28 L35 28 Z"
        fill="url(#shipBody)"
        filter="url(#shipGlow)"
      />
      {/* Cockpit */}
      <ellipse cx="78" cy="24" rx="8" ry="5" fill="#0f172a" stroke="#00f0ff" strokeWidth="0.8" />
      <ellipse cx="78" cy="24" rx="4" ry="2.5" fill="#00f0ff" opacity="0.6" />
      {/* Wings */}
      <path d="M50 14 L70 20 L50 24 Z" fill="#1d4ed8" opacity="0.9" />
      <path d="M50 24 L70 28 L50 34 Z" fill="#1d4ed8" opacity="0.9" />
      {/* Nose glow */}
      <circle cx="94" cy="24" r="3" fill="#00f0ff" opacity="0.9" />
      <circle cx="98" cy="24" r="1.5" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export default function HeroShipTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.9 });

      if (shipRef.current) {
        tl.fromTo(
          shipRef.current,
          {
            x: "-140vw",
            y: 30,
            scale: 0.35,
            rotation: -8,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            x: "5vw",
            y: 0,
            scale: 1.15,
            rotation: 2,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
          },
          0
        ).to(shipRef.current, {
          x: "115vw",
          y: -20,
          scale: 0.5,
          rotation: 6,
          opacity: 0,
          filter: "blur(4px)",
          duration: 1.2,
          ease: "power2.in",
        });
      }

      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          {
            opacity: 0,
            y: 80,
            scaleX: 0.6,
            skewX: -12,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            scaleX: 1,
            skewX: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
          },
          0.85
        );
      }
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={titleRef} className="relative w-full py-8">
      <WarpStreaks />

      {/* Ship flies across */}
      <div
        ref={shipRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[min(280px,70vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <Spaceship className="h-auto w-full drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
        <motion.div
          className="absolute -left-8 top-1/2 h-1 w-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6] }}
          transition={{ delay: 4.2, duration: 1.5 }}
        />
      </div>

      <h1 className="relative z-30 text-5xl font-bold leading-[1.15] tracking-tight md:text-7xl lg:text-8xl">
        <span className="hero-line block overflow-hidden">
          <span className="inline-block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Parth
          </span>
        </span>
        <span className="hero-line mt-1 block overflow-hidden md:mt-2">
          <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Salunke
          </span>
        </span>
      </h1>
    </div>
  );
}
