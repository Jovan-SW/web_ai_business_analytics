"use client";

import React, { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ShieldCheck, Zap, Sparkles } from "lucide-react";
import { HeroProductStage } from "./HeroProductStage";
import { ProductBentoGrid } from "./ProductBentoGrid";
import type { IndustryKey } from "./product-data";
import { BlurFadeIn, EASE_TASTE } from "./motion-primitives";

/* =========================================================================
   PART 4: Micro-Trust Strip (Bottom Anchor Data)
   ========================================================================= */
const TRUST_SIGNALS = [
  {
    id: "privacy",
    icon: ShieldCheck,
    title: "Enterprise Data Privacy",
    description:
      "Your business metrics remain strictly confidential. Never shared or used to train public AI models.",
    iconColor: "text-[#134E4A]",
    bgColor: "bg-[#134E4A]/10",
    borderColor: "border-[#134E4A]/20",
  },
  {
    id: "speed",
    icon: Zap,
    title: "Sub-5-Second Activation",
    description:
      "Upload CSV or sync live accounts—all executive KPIs and visuals synthesize in real time.",
    iconColor: "text-[#D97706]",
    bgColor: "bg-[#D97706]/10",
    borderColor: "border-[#D97706]/20",
  },
  {
    id: "frictionless",
    icon: Sparkles,
    title: "Zero Formula Setup",
    description:
      "Purpose-built for founders and operators. Immediate clarity without spreadsheets or data engineering.",
    iconColor: "text-[#134E4A]",
    bgColor: "bg-[#134E4A]/10",
    borderColor: "border-[#134E4A]/20",
  },
];

/* =========================================================================
   MASTER COMPONENT: ProductSection
   ========================================================================= */
export function ProductSection() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryKey>("saas");

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="product"
        aria-labelledby="product-section-heading"
        className="relative w-full scroll-mt-16 sm:scroll-mt-20 py-24 sm:py-32 lg:py-36 bg-[#F7F5F0] border-b border-[#18221E]/10 overflow-hidden"
      >
        {/* Top Hairline Accent Divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#18221E]/12 to-transparent pointer-events-none" />

        {/* Atmospheric Architectural Dot Grid & Ambient Radiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Ambient Radial Spotlight centered behind the header */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] opacity-40 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(19, 78, 74, 0.12) 0%, rgba(217, 119, 6, 0.04) 50%, transparent 80%)",
            }}
          />

          {/* Faint Architectural Dot Grid Masked Radially */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(24,34,30,0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,black_30%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Clean Architectural Typography (Zero Bubbles) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_TASTE }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
          >
            <p className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.24em] text-[#D97706] mb-3">
              CONTINUOUS PRODUCT PIPELINE
            </p>
            <h2
              id="product-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#18221E] leading-[1.16]"
            >
              From Raw Data Chaos to Instant Boardroom Clarity
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#18221E]/75 leading-relaxed font-normal">
              Eliminate manual spreadsheet wrangling. Watch Jovix ingest fragmented transaction logs, normalize schemas, audit margin leaks, and render real-time dashboards in sub-seconds.
            </p>
          </motion.div>

          {/* Centerpiece 3D Scroll-Unfolded Interactive Product Stage */}
          <div className="w-full">
            <HeroProductStage
              activeIndustry={activeIndustry}
              onIndustryChange={setActiveIndustry}
            />
          </div>

          {/* 3. Asymmetric Bento Grid (4 Core Feature Engines) */}
          <div className="w-full mt-24 sm:mt-32">
            <ProductBentoGrid activeIndustry={activeIndustry} />
          </div>

          {/* 4. Micro-Trust Strip (Bottom Section Anchor - Horizontal on Mobile & Desktop) */}
          <div className="w-full mt-14 sm:mt-24 pt-6 sm:pt-10 border-t border-[#18221E]/10">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-8">
              {TRUST_SIGNALS.map((signal, index) => {
                const Icon = signal.icon;

                return (
                  <BlurFadeIn
                    key={signal.id}
                    delay={0.08 * index}
                    className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-4 p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 bg-white/40 sm:bg-transparent hover:bg-white/70 border border-[#18221E]/5 sm:border-transparent hover:border-[#18221E]/8 hover:shadow-xs group"
                  >
                    <div
                      className={`w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${signal.bgColor} border ${signal.borderColor} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${signal.iconColor}`} />
                    </div>

                    <div className="w-full min-w-0">
                      <h4 className="text-[11px] sm:text-sm font-bold text-[#18221E] tracking-tight leading-tight sm:leading-snug break-words">
                        {signal.title}
                      </h4>
                      <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs text-[#18221E]/65 leading-tight sm:leading-relaxed font-normal break-words">
                        {signal.description}
                      </p>
                    </div>
                  </BlurFadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
