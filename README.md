# Cyberpunk Developer Portfolio

A futuristic, cyberpunk-inspired digital command center portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber.

## Features

- **Boot Screen** — System initialization sequence with glitch effects
- **3D Hero** — React Three Fiber orb with particle field
- **Project Showcase** — Cinematic cards with phone mockups + fullscreen project pages
- **Pinterest Wallpapers** — 3 vertical 9:16 pins on landing, full board on "View More"
- **Interactive Terminal** — Commands: `help`, `projects`, `skills`, `contact`, `launch rakshak`
- **Skills Modules** — Holographic floating skill cards
- **Experience Timeline** — Animated glowing career nodes
- **Contact Panel** — Futuristic form with social links

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- Three.js / React Three Fiber
- Lenis (smooth scroll)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

- **Projects**: `src/data/projects.ts`
- **Skills**: `src/data/skills.ts`
- **Experience**: `src/data/experience.ts`
- **Pinterest pins**: `src/data/pinterest-pins.json` (refresh with `npm run fetch-pins`)
- **Hero name/roles**: `src/components/sections/Hero.tsx`

## Build

```bash
npm run build
npm start
```
