"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  PROBLEM_SOLUTION_PAIRS,
  type ProblemSolutionPair,
} from "./problem-solution-data";
import { TACTILE_SPRING, SwissHairline } from "./swiss-motion";

export function SwissResolutionMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollStep, setScrollStep] = useState<number>(0);

  // Scroll-Pinned Sequence: Pin the table while scrolling through the 4 friction points
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Map progress 0 -> 1 smoothly across 4 friction points
    const step = Math.min(
      PROBLEM_SOLUTION_PAIRS.length - 1,
      Math.max(0, Math.floor(progress * PROBLEM_SOLUTION_PAIRS.length))
    );
    setScrollStep(step);
  });

  // Effective active point: Mouse hover takes precedence, fallback to scroll position
  const activeIndex = hoveredIndex !== null ? hoveredIndex : scrollStep;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] sm:h-[250vh]"
      data-slot="ps-resolution-scroll-container"
    >
      {/* Sticky Pin: Matrix remains locked in the viewport while user scrolls through points */}
      <div className="sticky top-20 sm:top-24 w-full z-10">
        <section
          data-slot="ps-resolution-grid"
          aria-label="Resolution Matrix"
          className="w-full bg-white rounded-3xl border border-[#18221E]/10 shadow-sm overflow-hidden select-none"
        >
          {/* 1. SECTION SUB-HEADER WITH STEP TELEMETRY */}
          <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-[#18221E]/10 bg-[#F7F5F0]/70 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#18221E]">
              Systemic Friction Points Transformed Instantly
            </h3>

            {/* Step Progress Telemetry Indicator */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-wider text-[#18221E]/60 uppercase">
                Step 0{activeIndex + 1} / 04
              </span>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {PROBLEM_SOLUTION_PAIRS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-6 bg-[#134E4A]"
                        : "w-2 bg-[#18221E]/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. 12-COLUMN HEADER STRIP (Desktop only) */}
          <div className="hidden lg:grid grid-cols-12 px-5 sm:px-8 py-3.5 border-b border-[#18221E]/10 text-xs font-bold uppercase tracking-wider text-[#18221E] bg-[#F7F5F0]/80">
            <div className="col-span-1">No.</div>
            <div className="col-span-5 flex items-center gap-2">
              <span>Manual Friction</span>
            </div>
            <div className="col-span-6 flex items-center gap-2">
              <span>AI Resolution</span>
            </div>
          </div>

          {/* 3. 4 INTERACTIVE MATRIX ROWS */}
          <ol className="list-none p-0 m-0">
            {PROBLEM_SOLUTION_PAIRS.map(
              (pair: ProblemSolutionPair, index: number) => {
                const isActive = activeIndex === index;

                return (
                  <li key={pair.id} className="relative">
                    <SwissHairline
                      orientation="horizontal"
                      delay={index * 0.08}
                      color="bg-[#18221E]/8"
                    />

                    {/* Interactive Row Band */}
                    <div
                      role="region"
                      tabIndex={0}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setHoveredIndex(index)}
                      className="relative group cursor-pointer focus-visible:outline-none transition-all duration-300"
                    >
                      {/* High-Contrast Active Sweep */}
                      {isActive && (
                        <motion.span
                          layoutId="swiss-row-active"
                          transition={TACTILE_SPRING}
                          className="absolute inset-0 bg-[#F3EFE6] shadow-xs pointer-events-none z-0 border-l-4 border-[#134E4A]"
                        />
                      )}

                      {/* Main Grid Row Content */}
                      <div className="relative z-10 px-5 sm:px-8 py-4 sm:py-5">
                        {/* DESKTOP LAYOUT (12 Columns) */}
                        <div className="hidden lg:grid grid-cols-12 items-start gap-6">
                          {/* Col 1: Index */}
                          <div className="col-span-1 text-sm font-extrabold tabular-nums pt-1">
                            <span
                              className={`transition-colors duration-300 ${
                                isActive
                                  ? "text-[#134E4A] font-black"
                                  : "text-[#18221E]/30"
                              }`}
                            >
                              {pair.index}
                            </span>
                          </div>

                          {/* Col 5: Manual Friction (Before) */}
                          <div className="col-span-5 pr-4">
                            <div className="mb-1.5 flex items-center gap-2">
                              <span
                                className={`inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded transition-colors duration-300 ${
                                  isActive
                                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                                    : "bg-stone-100/70 text-stone-400 border border-stone-200/40"
                                }`}
                              >
                                Before
                              </span>
                            </div>
                            <h4
                              className={`text-sm sm:text-base tracking-tight mb-1 transition-colors duration-300 ${
                                isActive
                                  ? "font-bold text-[#18221E]"
                                  : "font-medium text-[#18221E]/40"
                              }`}
                            >
                              {pair.problemTitle}
                            </h4>
                            <p
                              className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                                isActive ? "text-[#18221E]" : "text-[#18221E]/35"
                              }`}
                            >
                              {pair.problemDetail}
                            </p>
                          </div>

                          {/* Col 6: AI Resolution (After) */}
                          <div className="col-span-6 pr-4">
                            <div className="mb-1.5 flex items-center gap-2">
                              <span
                                className={`inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded transition-colors duration-300 ${
                                  isActive
                                    ? "bg-[#134E4A]/10 text-[#134E4A] border border-[#134E4A]/25"
                                    : "bg-stone-100/70 text-stone-400 border border-stone-200/40"
                                }`}
                              >
                                After
                              </span>
                            </div>
                            <h5
                              className={`text-sm sm:text-base tracking-tight mb-1 flex items-center gap-1.5 transition-colors duration-300 ${
                                isActive
                                  ? "font-bold text-[#134E4A]"
                                  : "font-medium text-[#18221E]/45"
                              }`}
                            >
                              <span
                                className={
                                  isActive ? "text-[#134E4A]" : "text-stone-300"
                                }
                              >
                                →
                              </span>
                              <span>{pair.solutionTitle}</span>
                            </h5>
                            <p
                              className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                                isActive ? "text-[#18221E]" : "text-[#18221E]/35"
                              }`}
                            >
                              {pair.solutionDetail}
                            </p>
                          </div>
                        </div>

                        {/* MOBILE / TABLET LAYOUT (< lg) */}
                        <div className="lg:hidden space-y-3">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold transition-colors duration-300 ${
                                isActive ? "text-[#134E4A]" : "text-[#18221E]/40"
                              }`}
                            >
                              No. {pair.index}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors duration-300 ${
                                  isActive
                                    ? "bg-rose-100 text-rose-800"
                                    : "bg-stone-100/70 text-stone-400"
                                }`}
                              >
                                Before
                              </span>
                              <span className="text-stone-300 text-xs">→</span>
                              <span
                                className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors duration-300 ${
                                  isActive
                                    ? "bg-[#134E4A]/10 text-[#134E4A]"
                                    : "bg-stone-100/70 text-stone-400"
                                }`}
                              >
                                After
                              </span>
                            </div>
                          </div>

                          {/* Problem Header Mobile */}
                          <div>
                            <h4
                              className={`text-sm tracking-tight transition-colors duration-300 ${
                                isActive
                                  ? "font-bold text-[#18221E]"
                                  : "font-medium text-[#18221E]/45"
                              }`}
                            >
                              {pair.problemTitle}
                            </h4>
                            <p
                              className={`text-xs leading-relaxed mt-0.5 transition-colors duration-300 ${
                                isActive
                                  ? "text-[#18221E]"
                                  : "text-[#18221E]/40"
                              }`}
                            >
                              {pair.problemDetail}
                            </p>
                          </div>

                          {/* Solution Header Mobile */}
                          <div className="pt-2 border-t border-[#18221E]/8">
                            <h5
                              className={`text-sm tracking-tight flex items-center gap-1.5 transition-colors duration-300 ${
                                isActive
                                  ? "font-bold text-[#134E4A]"
                                  : "font-medium text-[#18221E]/45"
                              }`}
                            >
                              <span
                                className={
                                  isActive ? "text-[#134E4A]" : "text-stone-300"
                                }
                              >
                                →
                              </span>
                              <span>{pair.solutionTitle}</span>
                            </h5>
                            <p
                              className={`text-xs leading-relaxed mt-0.5 transition-colors duration-300 ${
                                isActive
                                  ? "text-[#18221E]"
                                  : "text-[#18221E]/40"
                              }`}
                            >
                              {pair.solutionDetail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
          </ol>
        </section>
      </div>
    </div>
  );
}
