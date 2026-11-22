"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { SwissScrollFrame } from "./swiss-motion";
import { SwissHeader } from "./SwissHeader";
import { SwissComparisonStage } from "./SwissComparisonStage";
import { SwissResolutionMatrix } from "./SwissResolutionMatrix";

export function ProblemSolutionSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="masalah-solusi"
        aria-labelledby="problem-solution-heading"
        data-section="problem-solution"
        className="w-full bg-[#F7F5F0] text-[#18221E] pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 border-b border-[#18221E]/10 scroll-mt-20 overflow-hidden relative"
      >
        {/* Subtle Atmospheric Warm Paper & Architectural Grid Backdrops */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#18221E_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(19,78,74,0.06)_0%,transparent_80%)]"
          aria-hidden="true"
        />

        {/* Anchor for Navbar #solution navigation */}
        <div id="solution" className="scroll-mt-20 -top-20 relative pointer-events-none" />

        <SwissScrollFrame className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===================================================================
              SLOT 1: HEADER (WARM PAPER & SPRUCE GREEN EDITORIAL SPLIT)
              =================================================================== */}
          <SwissHeader />

          {/* ===================================================================
              SLOT 2: X-RAY COMPARISON STAGE (GPU CLIP-PATH SCRUBBING)
              =================================================================== */}
          <SwissComparisonStage />

          {/* ===================================================================
              SLOT 3: RESOLUTION MATRIX (SPECIFICATION MATRIX)
              =================================================================== */}
          <SwissResolutionMatrix />
        </SwissScrollFrame>
      </section>
    </MotionConfig>
  );
}
