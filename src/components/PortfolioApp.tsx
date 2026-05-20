"use client";

import { useState, useEffect } from "react";
import BootScreen from "@/components/effects/BootScreen";
import Particles from "@/components/effects/Particles";
import GridOverlay from "@/components/effects/GridOverlay";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import CursorGlow from "@/components/effects/CursorGlow";
import MouseFollowLight from "@/components/effects/MouseFollowLight";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Hero from "@/components/sections/Hero";
import PinterestGallery from "@/components/sections/PinterestGallery";
import Projects from "@/components/sections/Projects";
import Terminal from "@/components/sections/Terminal";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function PortfolioApp() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleBootComplete = () => {
    setBooted(true);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return (
    <>
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      <SmoothScroll>
        <div className={`relative min-h-screen bg-[#050508] text-white ${!booted ? "overflow-hidden" : ""}`}>
          <Particles />
          <GridOverlay />
          <NoiseOverlay />
          <MouseFollowLight />
          <CursorGlow />

          <div
            className={`relative z-10 transition-opacity duration-1000 ${booted ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Navbar />
            <main>
              <Hero />
              <PinterestGallery />
              <Projects />
              <Terminal />
              <Skills />
              <Experience />
              <Contact />
            </main>
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}
