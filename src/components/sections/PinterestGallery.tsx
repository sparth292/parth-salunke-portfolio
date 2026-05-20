"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  pinterestBoard,
  getFeaturedPins,
  type PinterestPin,
} from "@/data/pinterest";
import GlowButton from "@/components/ui/GlowButton";

const PREVIEW_LAYOUT = [
  { rotate: -7, y: 24, scale: 0.92, z: 1 },
  { rotate: 0, y: 0, scale: 1, z: 10 },
  { rotate: 7, y: 24, scale: 0.92, z: 1 },
];

function LandingPinFrame({
  pin,
  layout,
  onClick,
}: {
  pin: PinterestPin;
  layout: (typeof PREVIEW_LAYOUT)[0];
  onClick: () => void;
}) {
  const isCenter = layout.z === 10;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative flex-shrink-0 focus:outline-none"
      style={{ zIndex: layout.z }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: layout.y - 12, scale: layout.scale * 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div
        className="relative transition-transform duration-500"
        style={{
          transform: `rotate(${layout.rotate}deg) translateY(${layout.y}px) scale(${layout.scale})`,
        }}
      >
        {/* Glow halo */}
        <div
          className={`absolute -inset-4 rounded-[2.5rem] blur-2xl transition-opacity duration-500 ${
            isCenter ? "opacity-70" : "opacity-40 group-hover:opacity-60"
          }`}
          style={{
            background: isCenter
              ? "linear-gradient(135deg, rgba(0,240,255,0.35), rgba(255,0,170,0.25))"
              : "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(123,47,255,0.15))",
          }}
        />

        {/* Glass frame */}
        <div
          className={`relative overflow-hidden rounded-[1.75rem] border bg-black/50 backdrop-blur-md ${
            isCenter
              ? "border-cyan-400/40 shadow-[0_0_50px_rgba(0,240,255,0.25)]"
              : "border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          }`}
          style={{
            width: isCenter ? 220 : 180,
            height: isCenter ? 392 : 320,
          }}
        >
          <Image
            src={pin.url}
            alt={pin.title}
            fill
            className="object-cover"
            sizes={isCenter ? "220px" : "180px"}
            unoptimized
            priority={isCenter}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-cyan-500/5" />
          <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {isCenter && (
            <div className="absolute top-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20" />
          )}
        </div>

        {/* Reflection */}
        <div
          className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[80%] -translate-x-1/2 opacity-30 blur-xl"
          style={{
            background: "linear-gradient(to bottom, rgba(0,240,255,0.2), transparent)",
          }}
        />
      </div>
    </motion.button>
  );
}

function PinCardGrid({
  pin,
  onClick,
}: {
  pin: PinterestPin;
  onClick?: () => void;
}) {
  const aspectClass =
    pin.aspect === "horizontal"
      ? "aspect-video"
      : pin.aspect === "square"
        ? "aspect-square"
        : "aspect-[9/16]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${aspectClass}`}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Image src={pin.url} alt={pin.title} fill className="object-cover" unoptimized />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}

export default function PinterestGallery() {
  const { pins, boardTitle, pinterestBoardLink, username, totalOnPinterest } =
    pinterestBoard;
  const featured = getFeaturedPins(pins).slice(0, 3);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<PinterestPin | null>(null);

  const verticalPins = pins.filter((p) => p.aspect === "vertical");
  const horizontalPins = pins.filter((p) => p.aspect === "horizontal");
  const otherPins = pins.filter((p) => p.aspect === "square");

  return (
    <section id="wallpapers" className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* Ambient backdrop for landing trio */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute h-[400px] w-[600px] rounded-full bg-fuchsia-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs tracking-[0.4em] text-cyan-500/80 uppercase">
            // Visual Archive
          </span>
          <h2 className="mt-3 bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            {boardTitle}
          </h2>
        </motion.div>

        {/* Landing — exactly 3 pins, cinematic fan layout */}
        <div className="relative mx-auto flex min-h-[420px] max-w-4xl items-end justify-center gap-0 md:gap-2">
          {/* Floor line */}
          <div className="absolute bottom-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          {featured.map((pin, i) => (
            <LandingPinFrame
              key={pin.id}
              pin={pin}
              layout={PREVIEW_LAYOUT[i]}
              onClick={() => setLightbox(pin)}
            />
          ))}
        </div>

        <motion.p
          className="mt-10 text-center font-mono text-xs text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          @{username} · {pins.length}
          {totalOnPinterest ? ` / ${totalOnPinterest}` : ""} pins
        </motion.p>

        <div className="mt-8 flex justify-center">
          <GlowButton variant="secondary" onClick={() => setExpanded(true)}>
            View All Wallpapers
          </GlowButton>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[300] overflow-y-auto bg-[#050508]/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cyan-500/10 bg-[#050508]/90 px-6 py-4 backdrop-blur-xl">
              <h3 className="font-mono text-sm tracking-widest text-cyan-400 uppercase">
                {boardTitle}
              </h3>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="font-mono text-xs text-zinc-400 hover:text-cyan-300"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-10">
              <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
                {verticalPins.map((pin) => (
                  <div key={pin.id} className="mb-4 break-inside-avoid">
                    <PinCardGrid pin={pin} onClick={() => setLightbox(pin)} />
                  </div>
                ))}
              </div>
              {horizontalPins.length > 0 && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {horizontalPins.map((pin) => (
                    <PinCardGrid key={pin.id} pin={pin} onClick={() => setLightbox(pin)} />
                  ))}
                </div>
              )}
              {otherPins.length > 0 && (
                <div className="mt-10 columns-2 gap-4 sm:columns-3">
                  {otherPins.map((pin) => (
                    <div key={pin.id} className="mb-4 break-inside-avoid">
                      <PinCardGrid pin={pin} onClick={() => setLightbox(pin)} />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-12 text-center">
                <a
                  href={pinterestBoardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-cyan-400 hover:underline"
                >
                  Open on Pinterest →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-500/30"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.url}
                alt={lightbox.title}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
