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
      viewBox="0 0 320 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="hullTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="45%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="hullSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="35%" stopColor="#475569" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="canopyGlass" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#0e7490" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="exhaustCore" x1="1" y1="0.5" x2="0" y2="0.5">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="exhaustOuter" x1="1" y1="0.5" x2="0" y2="0.5">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="engineGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </radialGradient>
        <filter id="shipShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <filter id="exhaustBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="canopyHighlight">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Plasma exhaust — behind ship */}
      <g filter="url(#exhaustBlur)" opacity="0.85">
        <ellipse cx="18" cy="50" rx="42" ry="14" fill="url(#exhaustOuter)" />
        <ellipse cx="28" cy="50" rx="28" ry="9" fill="url(#exhaustCore)" />
        <path
          d="M0 50 L55 44 L55 56 Z"
          fill="url(#exhaustCore)"
          opacity="0.7"
        />
      </g>

      <g filter="url(#shipShadow)">
        {/* Lower wing */}
        <path
          d="M118 58 L175 52 L198 48 L118 48 Z"
          fill="url(#wingGrad)"
          stroke="#1e293b"
          strokeWidth="0.6"
        />
        <path d="M130 52 L168 50 L155 50 L138 52 Z" fill="#475569" opacity="0.5" />

        {/* Upper wing */}
        <path
          d="M118 42 L175 48 L198 52 L118 52 Z"
          fill="url(#wingGrad)"
          stroke="#1e293b"
          strokeWidth="0.6"
        />
        <path d="M130 48 L168 50 L155 50 L138 48 Z" fill="#94a3b8" opacity="0.35" />

        {/* Tail fin */}
        <path
          d="M52 38 L68 22 L72 38 L68 50 Z"
          fill="#475569"
          stroke="#334155"
          strokeWidth="0.5"
        />
        <path d="M58 36 L66 28 L66 38 Z" fill="#64748b" opacity="0.6" />

        {/* Main fuselage underside */}
        <path
          d="M58 54 C95 58 155 56 198 52 L285 48 C295 48 302 50 305 50
             L305 54 C302 56 295 58 285 58 L198 62 C155 64 95 62 58 58 Z"
          fill="#1e293b"
        />

        {/* Main fuselage top */}
        <path
          d="M58 46 C95 42 155 44 198 48 L285 52 C295 52 302 50 305 50
             L305 50 C302 48 295 46 285 46 L198 42 C155 38 95 40 58 46 Z"
          fill="url(#hullTop)"
          stroke="#334155"
          strokeWidth="0.8"
        />

        {/* Belly / side panel */}
        <path
          d="M72 50 L198 50 L285 50 L298 50 L305 50 L305 52
             L198 54 L72 54 Z"
          fill="url(#hullSide)"
        />

        {/* Panel lines */}
        <g stroke="#1e293b" strokeWidth="0.4" opacity="0.7">
          <line x1="95" y1="47" x2="95" y2="53" />
          <line x1="130" y1="46.5" x2="130" y2="53.5" />
          <line x1="165" y1="47" x2="165" y2="53" />
          <line x1="210" y1="47.5" x2="210" y2="52.5" />
          <line x1="245" y1="48" x2="245" y2="52" />
          <line x1="88" y1="50" x2="270" y2="50" opacity="0.4" />
        </g>

        {/* Nose cone */}
        <path
          d="M285 50 L305 50 L312 50 C316 50 318 49.5 318 50
             C318 50.5 316 51 312 51 L305 51 L285 51 Z"
          fill="url(#hullTop)"
        />
        <path
          d="M298 49 L318 50 L312 50.5 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        <circle cx="316" cy="50" r="1.2" fill="#e2e8f0" opacity="0.9" />

        {/* Weapon hardpoint */}
        <rect x="178" y="54" width="22" height="4" rx="1" fill="#334155" stroke="#1e293b" strokeWidth="0.4" />
        <rect x="182" y="55" width="14" height="2" rx="0.5" fill="#475569" />

        {/* Cockpit frame */}
        <path
          d="M228 44 C248 40 268 40 278 44 C282 46 282 54 278 56
             C268 60 248 60 228 56 C222 54 222 46 228 44 Z"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="1"
        />
        {/* Canopy glass */}
        <path
          d="M232 46 C250 43 266 43 274 46 C277 48 277 52 274 54
             C266 57 250 57 232 54 C229 52 229 48 232 46 Z"
          fill="url(#canopyGlass)"
        />
        {/* Canopy reflection */}
        <path
          d="M238 47 C252 45 262 45 268 47 L265 49 C258 48 248 48 240 50 Z"
          fill="#fff"
          opacity="0.25"
        />

        {/* Engine housings */}
        <g>
          <rect x="48" y="46" width="18" height="8" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
          <rect x="50" y="48" width="14" height="4" rx="1" fill="#1e293b" />
          <ellipse cx="54" cy="50" rx="4" ry="2.5" fill="url(#engineGlow)" opacity="0.9" />
        </g>
        <g>
          <rect x="48" y="54" width="18" height="8" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
          <rect x="50" y="56" width="14" height="4" rx="1" fill="#1e293b" />
          <ellipse cx="54" cy="58" rx="4" ry="2.5" fill="url(#engineGlow)" opacity="0.9" />
        </g>

        {/* Rear stabilizer */}
        <path d="M62 42 L78 38 L80 50 L62 50 Z" fill="#475569" stroke="#334155" strokeWidth="0.4" />

        {/* Intake / vent details */}
        <path d="M200 47 L220 46 L220 54 L200 53 Z" fill="#1e293b" opacity="0.6" />
        <path d="M255 48 L268 47.5 L268 52.5 L255 52 Z" fill="#1e293b" opacity="0.5" />
      </g>

      {/* Hot engine cores (sharp, in front of blur) */}
      <circle cx="46" cy="50" r="3" fill="#fef08a" opacity="0.95" />
      <circle cx="46" cy="50" r="1.5" fill="#fff" />
      <circle cx="46" cy="58" r="2.5" fill="#fef08a" opacity="0.9" />
      <circle cx="46" cy="58" r="1.2" fill="#fff" opacity="0.85" />
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
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[min(380px,82vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <Spaceship className="h-auto w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]" />
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
