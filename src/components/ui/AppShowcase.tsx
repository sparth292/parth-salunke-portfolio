"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface AppShowcaseProps {
  screenshots: string[];
  accent: string;
  alt: string;
  className?: string;
}

export function PhoneFrame({
  src,
  accent,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  accent: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto w-[200px] md:w-[240px] ${className}`}
      style={{ filter: `drop-shadow(0 0 40px ${accent}33)` }}
    >
      <div className="rounded-[2rem] border-2 border-zinc-700/80 bg-zinc-950 p-2 shadow-2xl">
        <div className="absolute left-1/2 top-3 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-black">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="240px"
            priority={priority}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.6rem]"
            style={{
              boxShadow: `inset 0 0 30px ${accent}22`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AppShowcase({
  screenshots,
  accent,
  alt,
  className = "",
}: AppShowcaseProps) {
  const [index, setIndex] = useState(0);

  if (!screenshots.length) return null;

  return (
    <div className={className}>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenshots[index]}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <PhoneFrame src={screenshots[index]} accent={accent} alt={alt} />
          </motion.div>
        </AnimatePresence>
      </div>

      {screenshots.length > 1 && (
        <>
          <div className="mt-4 flex justify-center gap-2">
            {screenshots.map((_, i) => (
              <button
                key={screenshots[i]}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6" : "w-1.5"
                }`}
                style={{
                  background: i === index ? accent : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
              }}
              className="font-mono text-[10px] text-zinc-500 hover:text-cyan-400"
            >
              ‹
            </button>
            <span className="font-mono text-[10px] text-zinc-600">
              {index + 1}/{screenshots.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i + 1) % screenshots.length);
              }}
              className="font-mono text-[10px] text-zinc-500 hover:text-cyan-400"
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}
