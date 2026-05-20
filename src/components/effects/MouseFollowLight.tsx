"use client";

import { useEffect, useRef } from "react";

export default function MouseFollowLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(0,240,255,0.06), transparent 60%)",
        } as React.CSSProperties
      }
      aria-hidden
    />
  );
}
