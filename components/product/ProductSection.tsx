"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroProductStage } from "./HeroProductStage";
import { ProductBentoGrid } from "./ProductBentoGrid";
import type { IndustryKey } from "./product-data";

export function ProductSection() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryKey>("saas");

  return (
    <section
      id="product"
      className="relative w-full py-24 sm:py-32 bg-[#F7F5F0] border-b border-[#18221E]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean Architectural Typography (Zero Bubbles) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.24em] text-[#D97706] mb-3">
            CONTINUOUS PRODUCT PIPELINE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#18221E] leading-[1.16]">
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

        {/* 3. Asymmetric Bento Grid (4 Kartu Fitur Inti) */}
        <div className="w-full mt-24 sm:mt-32">
          <ProductBentoGrid activeIndustry={activeIndustry} />
        </div>
      </div>
    </section>
  );
}
