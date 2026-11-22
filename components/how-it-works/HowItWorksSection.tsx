"use client";

import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { HOW_IT_WORKS_STEPS, type HowItWorksStep } from "./how-it-works-data";
import { HowItWorksStepVisual } from "./HowItWorksStepVisual";

export function HowItWorksSection() {
  const [activeStepId, setActiveStepId] = useState<string>(
    HOW_IT_WORKS_STEPS[0].id
  );

  const activeStep =
    HOW_IT_WORKS_STEPS.find((s) => s.id === activeStepId) ||
    HOW_IT_WORKS_STEPS[0];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        data-section="how-it-works"
        className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#F7F5F0] text-[#18221E] border-b border-[#18221E]/10 scroll-mt-20 overflow-hidden"
      >
        {/* Subtle Atmospheric Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#18221E_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===================================================================
              1. SECTION HEADER
              =================================================================== */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#D97706] block mb-3">
              HOW IT WORKS
            </span>
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#18221E] leading-[1.16]"
            >
              From Raw Data Chaos to Boardroom Clarity in Four Steps
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#18221E]/75 leading-relaxed font-normal">
              Zero brittle ETL pipelines and zero manual formula wrangling.
              Activate live multi-source intelligence in under two minutes.
            </p>
          </div>

          {/* ===================================================================
              2. DESKTOP INTERACTIVE STEPPER SPLIT (lg:grid)
              =================================================================== */}
          <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Interactive 4-Step Nav List */}
            <div className="col-span-5 space-y-3">
              {HOW_IT_WORKS_STEPS.map((step: HowItWorksStep) => {
                const isActive = activeStepId === step.id;

                return (
                  <div
                    key={step.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setActiveStepId(step.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStepId(step.id);
                      }
                    }}
                    className={`relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 focus-visible:outline-none ${
                      isActive
                        ? "bg-white shadow-sm border border-[#18221E]/10"
                        : "hover:bg-white/60 border border-transparent"
                    }`}
                  >
                    {/* Active Accent Bar Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="active-step-bar"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="absolute inset-y-0 left-0 w-1.5 bg-[#134E4A] rounded-l-2xl"
                      />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Step Number */}
                      <span
                        className={`text-sm font-mono font-extrabold tabular-nums pt-0.5 transition-colors ${
                          isActive ? "text-[#134E4A]" : "text-[#18221E]/35"
                        }`}
                      >
                        {step.stepNumber}
                      </span>

                      {/* Step Content */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-base font-bold tracking-tight transition-colors ${
                              isActive ? "text-[#18221E]" : "text-[#18221E]/70"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <p
                          className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                            isActive ? "text-[#18221E]" : "text-[#18221E]/50"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Live Interactive Visual Stage */}
            <div className="col-span-7">
              <HowItWorksStepVisual activeStepId={activeStepId} />
            </div>
          </div>

          {/* ===================================================================
              3. MOBILE / TABLET INTERACTIVE TABS & STAGE (< lg)
              =================================================================== */}
          <div className="lg:hidden space-y-6">
            {/* Step Selection Pills Tab Rail */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {HOW_IT_WORKS_STEPS.map((step) => {
                const isActive = activeStepId === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isActive
                        ? "bg-white border-[#134E4A] shadow-xs"
                        : "bg-white/60 border-[#18221E]/10 text-[#18221E]/70"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono font-bold block mb-1 ${
                        isActive ? "text-[#134E4A]" : "text-[#18221E]/40"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span
                      className={`text-xs font-bold tracking-tight block truncate ${
                        isActive ? "text-[#18221E]" : "text-[#18221E]/70"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Description Card for Mobile */}
            <div className="p-4 rounded-2xl bg-white border border-[#18221E]/10 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[#134E4A]">
                  Step {activeStep.stepNumber}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#D97706] font-mono px-2 py-0.5 rounded bg-[#D97706]/10">
                  {activeStep.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#18221E] mb-1">
                {activeStep.title}
              </h3>
              <p className="text-xs text-[#18221E]/80 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Active Step Live Visual */}
            <HowItWorksStepVisual activeStepId={activeStepId} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

