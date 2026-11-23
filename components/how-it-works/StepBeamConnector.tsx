"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface StepBeamConnectorProps {
  stepFrom: number;
  stepTo: number;
  direction: "rtl" | "ltr";
  className?: string;
}

export function StepBeamConnector({
  stepFrom,
  stepTo,
  direction,
  className = "",
}: StepBeamConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking: Beam traces as user scrolls between the cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });

  const corePathLength = useTransform(smoothProgress, [0, 1], [0.01, 1]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.2, 1], [0.35, 0.85, 1]);

  // Unique filter & gradient IDs per connector instance
  const filterId = `neon-glow-${stepFrom}-${stepTo}`;
  const coreGradId = `core-grad-${stepFrom}-${stepTo}`;
  const fluxGradId = `flux-grad-${stepFrom}-${stepTo}`;
  const particleGradId = `particle-grad-${stepFrom}-${stepTo}`;

  // Desktop S-curve coordinates (1000 x 200 viewport)
  // Aligns precisely with visual card centers: Right=720, Left=280
  const isRtl = direction === "rtl";

  // S-Curve paths: Emerge flush at y=0 from the top card, terminate flush at y=200 into the bottom card
  // Strand 1: Main Core Laser Beam (Razor thin)
  const desktopPathCore = isRtl
    ? "M 720,0 C 720,100 280,100 280,200"
    : "M 280,0 C 280,100 720,100 720,200";

  // Strand 2: Kinetic Braided Data Flux Strand (Upper harmonic thin wave)
  const desktopPathFlux = isRtl
    ? "M 718,0 C 748,85 252,115 282,200"
    : "M 282,0 C 252,85 748,115 718,200";

  // Strand 3: Radiant Ion Filament (Lower harmonic thin wave)
  const desktopPathWave = isRtl
    ? "M 722,0 C 692,115 308,85 278,200"
    : "M 278,0 C 308,115 692,85 722,200";

  // Mobile Vertical Multi-Thread Coordinates (360 x 120 viewport, flush from y=0 to y=120)
  const mobilePathCore = "M 180,0 L 180,120";
  const mobilePathFlux = "M 178,0 C 195,40 165,80 182,120";
  const mobilePathWave = "M 182,0 C 165,40 195,80 178,120";

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* =====================================================================
          1. DESKTOP SVG MULTI-THREAD TRACING BEAM (md and above)
          ===================================================================== */}
      <div className="hidden md:block relative w-full h-32 sm:h-40 md:h-48 lg:h-52 overflow-visible">
        <svg
          viewBox="0 0 1000 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Fine Futuristic Neon Orange Glow Filter */}
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur1" />
              <feGaussianBlur stdDeviation="5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient 1: Core Neon Orange Laser */}
            <linearGradient id={coreGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FF7700" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFAA00" stopOpacity="0.95" />
            </linearGradient>

            {/* Gradient 2: Kinetic Data Flux Strand */}
            <linearGradient id={fluxGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8800" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFB300" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF6600" stopOpacity="0.8" />
            </linearGradient>

            {/* Gradient 3: Traveling Photon Tracer */}
            <linearGradient id={particleGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="1" />
              <stop offset="60%" stopColor="#FF6B00" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FF3300" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ambient Faint Guideline Track */}
          <path
            d={desktopPathCore}
            stroke="#18221E"
            strokeOpacity="0.06"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* =================================================================
              STRAND 1: ULTRA-THIN PRIMARY GLOWING NEON LASER CORE (Scroll-Traced)
              ================================================================= */}
          {/* 1A. Soft Ambient Neon Bloom Aura */}
          <motion.path
            d={desktopPathCore}
            stroke="#FF5500"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.22"
            style={{ pathLength: corePathLength, opacity: glowOpacity }}
            filter={`url(#${filterId})`}
          />

          {/* 1B. Crisp Neon Orange Core Line */}
          <motion.path
            d={desktopPathCore}
            stroke={`url(#${coreGradId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: corePathLength }}
            filter={`url(#${filterId})`}
          />

          {/* 1C. White-Hot Fine Energy Center */}
          <motion.path
            d={desktopPathCore}
            stroke="#FFF8EE"
            strokeWidth="0.65"
            strokeLinecap="round"
            style={{ pathLength: corePathLength }}
          />

          {/* =================================================================
              STRAND 2: THIN KINETIC BRAIDED DATA FLUX THREAD (Moving Stream)
              ================================================================= */}
          <motion.path
            d={desktopPathFlux}
            stroke={`url(#${fluxGradId})`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="5 9"
            animate={{ strokeDashoffset: [0, -70] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ pathLength: corePathLength }}
            filter={`url(#${filterId})`}
          />

          {/* =================================================================
              STRAND 3: ULTRA-FINE HARMONIC ION FILAMENT (Wavy Energy Shimmer)
              ================================================================= */}
          <motion.path
            d={desktopPathWave}
            stroke="#FF9900"
            strokeWidth="0.75"
            strokeOpacity="0.7"
            strokeLinecap="round"
            strokeDasharray="3 6"
            animate={{ strokeDashoffset: [0, 54] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ pathLength: corePathLength }}
          />

          {/* =================================================================
              CONTINUOUS TRAVELING ENERGY PHOTONS (Riding along the path)
              ================================================================= */}
          <motion.path
            d={desktopPathCore}
            stroke={`url(#${particleGradId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="22 260"
            animate={{ strokeDashoffset: [0, -564] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            filter={`url(#${filterId})`}
          />
        </svg>
      </div>

      {/* =====================================================================
          2. MOBILE SVG MULTI-THREAD TRACING BEAM (< md screens)
          ===================================================================== */}
      <div className="block md:hidden relative w-full h-24 sm:h-28 overflow-visible">
        <svg
          viewBox="0 0 360 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <filter id={`${filterId}-m`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Guideline Track */}
          <path
            d={mobilePathCore}
            stroke="#18221E"
            strokeOpacity="0.06"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Strand 1: Mobile Thin Neon Laser Core */}
          <motion.path
            d={mobilePathCore}
            stroke="#FF5500"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.22"
            style={{ pathLength: corePathLength, opacity: glowOpacity }}
            filter={`url(#${filterId}-m)`}
          />
          <motion.path
            d={mobilePathCore}
            stroke="#FF7700"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: corePathLength }}
            filter={`url(#${filterId}-m)`}
          />
          <motion.path
            d={mobilePathCore}
            stroke="#FFF8EE"
            strokeWidth="0.65"
            strokeLinecap="round"
            style={{ pathLength: corePathLength }}
          />

          {/* Strand 2: Mobile Thin Kinetic Flux Strand */}
          <motion.path
            d={mobilePathFlux}
            stroke="#FFA000"
            strokeWidth="1"
            strokeDasharray="4 7"
            animate={{ strokeDashoffset: [0, -55] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ pathLength: corePathLength }}
            filter={`url(#${filterId}-m)`}
          />

          {/* Strand 3: Mobile Fine Harmonic Filament */}
          <motion.path
            d={mobilePathWave}
            stroke="#FF6600"
            strokeWidth="0.75"
            strokeOpacity="0.7"
            strokeDasharray="3 5"
            animate={{ strokeDashoffset: [0, 40] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            style={{ pathLength: corePathLength }}
          />
        </svg>
      </div>
    </div>
  );
}
