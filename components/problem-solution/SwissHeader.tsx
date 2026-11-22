"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { SECTION_HEADER } from "./problem-solution-data";
import { SwissHairline } from "./swiss-motion";

export function SwissHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeSilo, setActiveSilo] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Scroll-driven dynamic transform engine
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.65,
  });

  // Scale: 0.93 -> 1.0 -> 1.0 -> 0.95
  const scale = useTransform(
    smoothProgress,
    [0, 0.22, 0.78, 1],
    [0.93, 1.0, 1.0, 0.95]
  );

  // 3D Tilt: 4.5deg -> 0deg -> 0deg -> -2.5deg
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.22, 0.78, 1],
    [4.5, 0, 0, -2.5]
  );

  // Y-shift parallax: 48px -> 0px -> 0px -> -28px
  const y = useTransform(
    smoothProgress,
    [0, 0.22, 0.78, 1],
    [48, 0, 0, -28]
  );

  // Opacity: 0.82 -> 1.0 -> 1.0 -> 0.85
  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0.82, 1, 1, 0.85]
  );

  // Progress meter fill tied to scroll: 25% -> 88%
  const meterWidth = useTransform(smoothProgress, [0.12, 0.45], ["25%", "88%"]);

  // 3 Disparate Silos causing operational friction in business analytics
  const dataSilos = [
    {
      id: 0,
      badge: "Revenue and Commerce",
      source: "Stripe, Shopify, NetSuite",
      friction: "24h sync delay, unmatched SKUs",
      variance: "-$380 Drift",
      color: "border-rose-300 bg-rose-50/70 text-rose-700",
      accent: "#E11D48",
      detail:
        "Daily payment batch reconciliations miss voided charges and tiered discount codes until month-end audit.",
    },
    {
      id: 1,
      badge: "Marketing and Ad Spend",
      source: "Meta, Google Ad Accounts",
      friction: "Attribution overlap, phantom CAC",
      variance: "21% Blindspot",
      color: "border-amber-300 bg-amber-50/70 text-amber-800",
      accent: "#D97706",
      detail:
        "Ad platforms double-count conversion touchpoints, obscuring real blended customer acquisition costs and payback periods.",
    },
    {
      id: 2,
      badge: "Treasury and Expenses",
      source: "Bank Ledgers, AWS, 3PL Invoices",
      friction: "Interchange creep, hidden vendor surcharges",
      variance: "4.6% Fee Variance",
      color: "border-amber-300 bg-amber-50/70 text-amber-800",
      accent: "#B45309",
      detail:
        "Cloud hosting tier surges and payment processing fees compound silently, eroding gross margins undetected.",
    },
  ];

  // Weekly friction hours distribution (total = 5.2 hrs)
  const weeklyFriction = [
    { day: "Mon", hours: 1.1, task: "Exporting raw CSVs from payment gateways and ERPs" },
    { day: "Tue", hours: 0.9, task: "Diagnosing broken VLOOKUP formula errors in sheets" },
    { day: "Wed", hours: 1.4, task: "Reconciling ad network spend against recorded sales" },
    { day: "Thu", hours: 0.8, task: "Auditing vendor invoices and fee deductions" },
    { day: "Fri", hours: 1.0, task: "Manually assembling executive reporting slides" },
  ];

  return (
    <div style={{ perspective: "1200px" }} className="w-full mb-14 sm:mb-20">
      <motion.header
        ref={headerRef}
        data-slot="ps-header"
        style={shouldReduceMotion ? {} : { scale, rotateX, y, opacity }}
        className="w-full bg-white rounded-3xl border border-[#18221E]/10 shadow-sm overflow-hidden select-none origin-top will-change-transform"
      >
        {/* ===================================================================
            MAIN ASYMMETRIC GRID SPLIT (8 cols Left / 4 cols Right)
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* =================================================================
              LEFT CELL (8 COLS): HEADLINE + TOPOLOGY VISUAL
              ================================================================= */}
          <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 lg:border-r lg:border-[#18221E]/10 flex flex-col justify-between bg-white">
            <div>
              {/* Clean Eyebrow */}
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                  Problem and Solution
                </span>
              </div>

              {/* Monumental Headline */}
              <h2
                id="problem-solution-heading"
                className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08] text-[#18221E]"
              >
                <span>Business data piles up,</span>
                <br />
                <span>yet executive decisions</span>
                <br />
                <span className="text-[#134E4A]">are still based on guesswork.</span>
              </h2>

              {/* High-Conviction Subtitle */}
              <p className="mt-4 text-base sm:text-lg text-[#18221E] max-w-2xl leading-relaxed font-normal">
                Daily transactions, merchant banking fees, and marketing spend stay
                trapped in disconnected spreadsheets. Founders waste hours manually
                stitching numbers while critical margin leakages go unnoticed.
              </p>

              {/* =============================================================
                  DATA FRAGMENTATION TOPOLOGY VISUAL
                  ============================================================= */}
              <div className="mt-8 pt-6 border-t border-[#18221E]/10">
                <div className="rounded-2xl border border-[#18221E]/12 bg-[#FAF8F5] p-5 sm:p-6 shadow-xs relative overflow-hidden">
                  {/* Visual Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#18221E]/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#18221E]">
                      Data Silo Topology
                    </span>
                    <span className="text-[11px] font-semibold text-[#134E4A] bg-[#134E4A]/10 px-2.5 py-0.5 rounded-md">
                      Live Multi-Channel Ingestion
                    </span>
                  </div>

                  {/* 3 Silo Input Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                    {dataSilos.map((silo) => {
                      const isSelected = activeSilo === silo.id;
                      return (
                        <motion.div
                          key={silo.id}
                          role="button"
                          tabIndex={0}
                          whileHover={{ y: -3, transition: { duration: 0.15 } }}
                          onClick={() =>
                            setActiveSilo((prev) => (prev === silo.id ? null : silo.id))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveSilo((prev) =>
                                prev === silo.id ? null : silo.id
                              );
                            }
                          }}
                          className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-white border-[#134E4A] shadow-md ring-2 ring-[#134E4A]/20 scale-[1.02]"
                              : "bg-white/95 border-[#18221E]/10 hover:border-[#134E4A]/40 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#18221E]/5 text-[#18221E]">
                              {silo.badge}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${silo.color}`}
                            >
                              {silo.variance}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#18221E] truncate">
                            {silo.source}
                          </div>
                          <p className="text-xs text-[#18221E] mt-1 leading-snug">
                            {silo.friction}
                          </p>

                          {/* Expanded Silo Context on click */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-2.5 pt-2 border-t border-[#18221E]/10 text-xs text-[#18221E] leading-relaxed"
                            >
                              {silo.detail}
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Circuit Convergence SVG Beam with Live Traveling Pulse Animation */}
                  <div className="my-3.5 relative flex items-center justify-center">
                    <svg
                      className="w-full h-9 overflow-visible"
                      viewBox="0 0 600 36"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Connection Bus Lines */}
                      <path
                        d="M 100 0 L 100 18 L 300 18 L 300 36"
                        stroke="#134E4A"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="opacity-40"
                      />
                      <path
                        d="M 300 0 L 300 36"
                        stroke="#134E4A"
                        strokeWidth="2"
                        className="opacity-60"
                      />
                      <path
                        d="M 500 0 L 500 18 L 300 18 L 300 36"
                        stroke="#134E4A"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="opacity-40"
                      />

                      {/* Traveling Data Packets from Silo 1 (Left) */}
                      <motion.circle
                        r="3.5"
                        fill="#E11D48"
                        animate={{
                          cx: [100, 100, 300, 300],
                          cy: [0, 18, 18, 36],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.4, 0.85, 1],
                        }}
                      />

                      {/* Traveling Data Packets from Silo 2 (Center) */}
                      <motion.circle
                        r="3.5"
                        fill="#D97706"
                        animate={{
                          cx: [300, 300],
                          cy: [0, 36],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 0.5,
                        }}
                      />

                      {/* Traveling Data Packets from Silo 3 (Right) */}
                      <motion.circle
                        r="3.5"
                        fill="#B45309"
                        animate={{
                          cx: [500, 500, 300, 300],
                          cy: [0, 18, 18, 36],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.1,
                          times: [0, 0.4, 0.85, 1],
                        }}
                      />

                      <circle cx="300" cy="34" r="4" fill="#134E4A" />
                    </svg>
                  </div>

                  {/* Reconciled Output Chamber Strip */}
                  <div className="bg-[#134E4A] text-white p-4 rounded-xl shadow-md border border-[#134E4A]/30 relative overflow-hidden flex flex-wrap items-center justify-between gap-3">
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Jovix Autonomous Reconciler</span>
                        <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-emerald-200">
                          Zero Formulas
                        </span>
                      </div>
                      <p className="text-xs text-emerald-100/80 mt-1">
                        Synthesizes raw feeds into a single source of financial truth
                      </p>
                    </div>

                    <div className="flex items-center gap-2 relative z-10">
                      <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-400/20 border border-emerald-400/30 text-emerald-200 uppercase tracking-wider">
                        Latency &lt; 1.8s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT CELL (4 COLS): EXECUTIVE SUMMARY + METERS + HERO FRICTION
              ================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#F7F5F0]/50">
            {/* Upper Sub-Cell: Executive Summary + Decision Bottleneck Scorecard */}
            <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#18221E] block mb-2">
                  Executive Summary
                </span>
                <p className="text-sm text-[#18221E] leading-relaxed font-normal mb-6">
                  {SECTION_HEADER.subheadline}
                </p>

                {/* 3-Tier Decision Bottleneck Scorecard */}
                <div className="space-y-4 pt-4 border-t border-[#18221E]/10">
                  {/* Metric 1: Cycle Time */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-[#18221E] uppercase">Cycle Time to Answer</span>
                      <span className="text-rose-600 font-bold tabular-nums">
                        48 to 72 Hours
                      </span>
                    </div>
                    {/* Animated dynamic progress bar */}
                    <div className="w-full h-2 rounded-full bg-[#18221E]/10 overflow-hidden">
                      <motion.div
                        style={{ width: meterWidth }}
                        className="h-full bg-gradient-to-r from-rose-500 to-[#D97706] rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#18221E] mt-1">
                      <span>Manual spreadsheet latency</span>
                      <span className="text-[#134E4A] font-bold">Jovix: &lt; 5s</span>
                    </div>
                  </div>

                  {/* Metric 2: Undetected Margin Drift */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#18221E]/10 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#18221E] uppercase">
                        Margin Drift Exposure
                      </span>
                      <span className="text-xs font-bold text-rose-600">
                        14.8% Leaks
                      </span>
                    </div>
                    <p className="text-xs text-[#18221E] mt-1 leading-snug">
                      Unlinked discount codes and merchant fee creep slip past manual checks.
                    </p>
                  </div>

                  {/* Metric 3: Human Formula Error Exposure */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#18221E]/10 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#18221E] uppercase">
                        Formula Error Risk
                      </span>
                      <span className="text-xs font-bold text-amber-700">
                        88% of Files
                      </span>
                    </div>
                    <p className="text-xs text-[#18221E] mt-1 leading-snug">
                      Industry audits show nearly 9 out of 10 spreadsheets contain reference errors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SwissHairline orientation="horizontal" color="bg-[#18221E]/10" />

            {/* Lower Sub-Cell: Spruce Green High-Contrast Card with Weekly Sparkline */}
            <div className="p-3 sm:p-4">
              <div className="bg-[#134E4A] text-white p-6 sm:p-7 rounded-2xl shadow-md border border-[#134E4A]/30 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-100/90">
                    Time Wasted Per Week
                  </span>
                  <span className="text-xs px-2.5 py-0.5 bg-[#D97706] text-white font-bold rounded-lg uppercase tracking-wider shadow-2xs">
                    Friction Metric
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight tabular-nums text-white relative z-10">
                  {SECTION_HEADER.frictionStat.value}
                </div>

                {/* Weekly Friction Histogram */}
                <div className="my-3.5 pt-3 border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-between text-xs text-emerald-200/70 mb-2">
                    <span className="uppercase tracking-wider">Hours Lost per Day</span>
                    <span>Total: 5.2 hrs</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 items-end h-14">
                    {weeklyFriction.map((item, idx) => {
                      const isHovered = hoveredDay === idx;
                      const heightPercent = `${(item.hours / 1.5) * 100}%`;
                      return (
                        <div
                          key={item.day}
                          onMouseEnter={() => setHoveredDay(idx)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className="h-full flex flex-col justify-end items-center cursor-pointer group"
                        >
                          <div
                            style={{ height: heightPercent }}
                            className={`w-full rounded-md transition-all duration-200 ${
                              isHovered
                                ? "bg-[#D97706] shadow-sm"
                                : "bg-emerald-400/40 group-hover:bg-emerald-300/80"
                            }`}
                          />
                          <span className="text-xs text-emerald-200/80 mt-1.5 font-semibold">
                            {item.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Micro Tooltip on Hover */}
                  <div className="min-h-[22px] mt-2">
                    {hoveredDay !== null ? (
                      <p className="text-xs text-[#D97706] bg-black/30 px-2 py-1 rounded border border-white/10 truncate font-medium">
                        {weeklyFriction[hoveredDay].day}: {weeklyFriction[hoveredDay].hours}h —{" "}
                        {weeklyFriction[hoveredDay].task}
                      </p>
                    ) : (
                      <p className="text-xs text-emerald-200/50 truncate">
                        Hover bars to inspect friction drivers
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-emerald-100/85 mt-2 leading-snug font-medium border-t border-white/10 pt-2.5 relative z-10">
                  {SECTION_HEADER.frictionStat.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
