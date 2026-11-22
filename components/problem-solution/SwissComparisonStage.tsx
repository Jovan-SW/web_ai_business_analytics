"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { BEFORE_AFTER_COMPARISON } from "./problem-solution-data";
import { TACTILE_SPRING } from "./swiss-motion";

export function SwissComparisonStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  // Mode: "manual" (100% manual), "compare" (interactive split), "ai" (100% AI)
  const [mode, setMode] = useState<"manual" | "compare" | "ai">("compare");
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [displaySplit, setDisplaySplit] = useState(50);

  // GPU Clip-Path Spring Engine
  const splitPos = useMotionValue(50);
  const smoothSplit = useSpring(splitPos, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
  });

  const clipPath = useMotionTemplate`inset(0 0 0 ${smoothSplit}%)`;
  const axisLeft = useMotionTemplate`${smoothSplit}%`;

  useEffect(() => {
    const unsub = smoothSplit.on("change", (latest) => {
      setDisplaySplit(Math.round(latest));
    });
    return () => unsub();
  }, [smoothSplit]);

  // Smooth Scroll-Driven Auto-Sweep:
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 85%", "center 45%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasInteractedRef.current && mode === "compare") {
      const val = 16 + progress * (54 - 16);
      splitPos.set(Math.min(90, Math.max(10, val)));
    }
  });

  // Mode tab switching
  const handleModeChange = (newMode: "manual" | "compare" | "ai") => {
    hasInteractedRef.current = true;
    setMode(newMode);
    if (newMode === "manual") {
      splitPos.set(100);
    } else if (newMode === "ai") {
      splitPos.set(0);
    } else {
      splitPos.set(50);
    }
  };

  // Pointer Drag Handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    hasInteractedRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX;
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    splitPos.set(percent);
    if (mode !== "compare") setMode("compare");
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore in unsupported environments
    }
  };

  const { before, after } = BEFORE_AFTER_COMPARISON;

  return (
    <section
      data-slot="ps-comparison-stage"
      aria-label="Interactive Comparison Stage"
      className="w-full mb-16 select-none"
    >
      <div className="bg-white rounded-3xl border border-[#18221E]/10 shadow-sm overflow-hidden">
        {/* ===================================================================
            1. TOP CONTROL RAIL
            =================================================================== */}
        <div className="border-b border-[#18221E]/10 bg-[#F7F5F0]/80 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Mode Switcher Tabs */}
          <div
            role="group"
            aria-label="Stage Mode Selector"
            className="inline-flex rounded-xl border border-[#18221E]/12 p-1 bg-white shadow-2xs text-xs font-semibold"
          >
            <button
              type="button"
              aria-pressed={mode === "manual"}
              onClick={() => handleModeChange("manual")}
              className="relative px-3.5 py-1.5 uppercase tracking-wider transition-colors z-10 rounded-lg"
            >
              {mode === "manual" && (
                <motion.span
                  layoutId="swiss-stage-tab"
                  transition={TACTILE_SPRING}
                  className="absolute inset-0 bg-[#134E4A] text-white rounded-lg font-bold shadow-xs z-0"
                />
              )}
              <span
                className={`relative z-10 ${
                  mode === "manual"
                    ? "text-white font-bold"
                    : "text-[#18221E]/70 hover:text-[#18221E]"
                }`}
              >
                Manual Method
              </span>
            </button>

            <button
              type="button"
              aria-pressed={mode === "compare"}
              onClick={() => handleModeChange("compare")}
              className="relative px-3.5 py-1.5 uppercase tracking-wider transition-colors z-10 rounded-lg border-x border-[#18221E]/8"
            >
              {mode === "compare" && (
                <motion.span
                  layoutId="swiss-stage-tab"
                  transition={TACTILE_SPRING}
                  className="absolute inset-0 bg-[#134E4A] text-white rounded-lg font-bold shadow-xs z-0"
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 ${
                  mode === "compare"
                    ? "text-white font-bold"
                    : "text-[#18221E]/70 hover:text-[#18221E]"
                }`}
              >
                <span>Compare Split</span>
                <span className="text-[10px] opacity-80 tabular-nums">
                  ({displaySplit}%)
                </span>
              </span>
            </button>

            <button
              type="button"
              aria-pressed={mode === "ai"}
              onClick={() => handleModeChange("ai")}
              className="relative px-3.5 py-1.5 uppercase tracking-wider transition-colors z-10 rounded-lg"
            >
              {mode === "ai" && (
                <motion.span
                  layoutId="swiss-stage-tab"
                  transition={TACTILE_SPRING}
                  className="absolute inset-0 bg-[#134E4A] text-white rounded-lg font-bold shadow-xs z-0"
                />
              )}
              <span
                className={`relative z-10 ${
                  mode === "ai"
                    ? "text-white font-bold"
                    : "text-[#18221E]/70 hover:text-[#18221E]"
                }`}
              >
                With AI
              </span>
            </button>
          </div>

          {/* Hidden accessible range input */}
          <input
            type="range"
            min={0}
            max={100}
            value={displaySplit}
            onChange={(e) => {
              hasInteractedRef.current = true;
              splitPos.set(Number(e.target.value));
              if (mode !== "compare") setMode("compare");
            }}
            className="sr-only"
            aria-label="Compare manual spreadsheet method and AI solution split position"
          />
        </div>

        {/* ===================================================================
            2. INTERACTIVE CANVAS (GPU CLIP-PATH STAGE)
            =================================================================== */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full min-h-[660px] sm:min-h-[580px] lg:min-h-[520px] overflow-hidden bg-[#FAF8F5] cursor-ew-resize"
        >
          {/* =================================================================
              LAYER 1 (BASE: MANUAL SPREADSHEETS)
              ================================================================= */}
          <div className="absolute inset-0 w-full h-full bg-[#F5F1E8]/70 p-5 sm:p-8 flex flex-col justify-between overflow-x-auto">
            <div>
              {/* Header strip */}
              <div className="pb-3 mb-4 border-b border-[#18221E]/10">
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-700 font-bold inline-block">
                  {before.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#18221E] mb-3 tracking-tight">
                {before.title}
              </h3>

              {/* Dense Spreadsheet Matrix with Rounded Frame */}
              <div className="overflow-x-auto border border-[#18221E]/10 rounded-2xl bg-white shadow-xs mb-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F5F0] border-b border-[#18221E]/10 text-[#18221E] text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-2.5 border-r border-[#18221E]/8 text-[#18221E] text-center w-8">
                        #
                      </th>
                      <th className="p-2.5 border-r border-[#18221E]/8">
                        Date
                      </th>
                      <th className="p-2.5 border-r border-[#18221E]/8">
                        Transaction Item
                      </th>
                      <th className="p-2.5 border-r border-[#18221E]/8">
                        Gross Revenue
                      </th>
                      <th className="p-2.5">Diagnostic Friction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#18221E]/8 text-xs">
                    {before.rawSpreadsheetRows.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                        <td className="p-2.5 text-[#18221E] text-center border-r border-[#18221E]/8 tabular-nums">
                          {idx + 1}
                        </td>
                        <td className="p-2.5 text-[#18221E] whitespace-nowrap border-r border-[#18221E]/8 tabular-nums">
                          {row.date}
                        </td>
                        <td className="p-2.5 font-medium text-[#18221E] border-r border-[#18221E]/8">
                          {row.item}
                        </td>
                        <td className="p-2.5 text-[#18221E] tabular-nums border-r border-[#18221E]/8 font-semibold">
                          {row.revenue}
                        </td>
                        <td className="p-2.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                              row.status === "error"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : row.status === "duplicate"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                            }`}
                          >
                            {row.notes}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom strip: Diagnostic friction cards */}
            <div className="pt-3 border-t border-[#18221E]/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {before.manualPainNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-rose-50/80 border border-rose-200/80 rounded-xl text-xs text-[#18221E] leading-relaxed shadow-2xs"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================
              LAYER 2 (OVERLAY: JOVIX AI RECONCILIATION)
              ================================================================= */}
          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 w-full h-full bg-[#0D1E1B] text-white p-5 sm:p-8 flex flex-col justify-between overflow-hidden pointer-events-none"
          >
            {/* Faint Construction Grid Overlay */}
            {showGridOverlay && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="w-full h-full grid grid-cols-6 divide-x divide-emerald-500/10 border-x border-emerald-500/10" />
              </div>
            )}

            <div className="relative z-20">
              {/* Header strip */}
              <div className="pb-3 mb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold inline-block">
                  {after.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-4 tracking-tight">
                {after.title}
              </h3>

              {/* Top 3-Column KPI Grid with Rounded Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {after.kpis.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-[#142A25] shadow-sm flex flex-col justify-between"
                  >
                    <span className="text-xs uppercase tracking-wider text-emerald-300/80 font-semibold block mb-1">
                      {kpi.label}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
                      {kpi.value}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span
                        className={`font-semibold ${
                          kpi.trend === "up"
                            ? "text-emerald-400"
                            : kpi.trend === "down"
                            ? "text-[#D97706]"
                            : "text-zinc-300"
                        }`}
                      >
                        {kpi.delta}
                      </span>
                      <span className="text-emerald-200/60 text-[11px] hidden lg:inline">
                        {kpi.contextNote}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Split (2 Columns: SVG Chart + AI Business Assistant Exchange) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* Left: Line Graph (5 cols) */}
                <div className="lg:col-span-5 border border-white/10 p-4 rounded-2xl bg-[#142A25] flex flex-col justify-between shadow-sm">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-xs uppercase tracking-wider text-emerald-200/80 font-semibold">
                      Real-Time Margin Reconciliation
                    </span>
                    <span className="text-xs text-emerald-400 font-bold tabular-nums">
                      +18.4% Run-Rate
                    </span>
                  </div>

                  {/* SVG Trend Curve */}
                  <div className="w-full my-auto py-2">
                    <svg
                      className="w-full h-24 sm:h-28 overflow-visible"
                      viewBox="0 0 300 100"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="0"
                        y1="85"
                        x2="300"
                        y2="85"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                      />
                      <line
                        x1="0"
                        y1="50"
                        x2="300"
                        y2="50"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="0"
                        y1="18"
                        x2="300"
                        y2="18"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />

                      <polygon
                        points="0,85 0,65 50,55 100,58 150,38 200,42 250,22 300,14 300,85"
                        fill="rgba(16, 185, 129, 0.12)"
                      />

                      <path
                        d="M 0,65 L 50,55 L 100,58 L 150,38 L 200,42 L 250,22 L 300,14"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      <circle cx="250" cy="22" r="3.5" fill="#10B981" />
                      <circle
                        cx="300"
                        cy="14"
                        r="4.5"
                        fill="#D97706"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-200/60 pt-1 border-t border-white/10">
                    <span>Week 44</span>
                    <span>Week 45</span>
                    <span>Week 46</span>
                    <span className="text-white font-bold">Week 47</span>
                  </div>
                </div>

                {/* Right: AI Business Assistant Exchange (7 cols) */}
                <div className="lg:col-span-7 border border-white/10 p-4 rounded-2xl bg-[#142A25] flex flex-col justify-between space-y-2.5 shadow-sm">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-xs uppercase tracking-wider text-emerald-300/80 font-semibold block mb-0.5">
                      Executive Query
                    </span>
                    <p className="text-zinc-100 text-xs font-medium leading-relaxed">
                      &quot;{after.aiBotExchange.question}&quot;
                    </p>
                  </div>

                  <div className="p-3 bg-[#134E4A]/60 border border-[#134E4A] rounded-xl">
                    <span className="text-xs uppercase tracking-wider text-[#D97706] font-bold block mb-0.5">
                      Copilot Root Cause Synthesis
                    </span>
                    <p className="text-emerald-50 text-xs leading-relaxed">
                      {after.aiBotExchange.answer}
                    </p>
                  </div>

                  {/* Warm Amber Action Tag Bar */}
                  <div className="bg-[#D97706] text-white px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                    <span className="text-xs font-bold tracking-wide truncate">
                      {after.aiBotExchange.actionTag}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-black/20 text-white font-bold rounded-lg shrink-0 uppercase tracking-wider">
                      Actionable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================================
              3. VERTICAL AXIS HANDLE
              ================================================================= */}
          <motion.div
            style={{ left: axisLeft }}
            className="absolute top-0 bottom-0 w-0.5 z-30 pointer-events-none -translate-x-1/2"
          >
            <div className="w-full h-full bg-gradient-to-b from-[#134E4A] via-[#D97706] to-[#134E4A] shadow-[0_0_12px_rgba(217,119,6,0.4)]" />

            <div
              className={`w-10 h-10 bg-white text-[#18221E] border-2 border-[#134E4A] flex items-center justify-center cursor-ew-resize rounded-2xl shadow-xl pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-bold transition-transform duration-150 ${
                isDragging ? "scale-110 ring-4 ring-[#D97706]/30" : "hover:scale-105"
              }`}
            >
              <span className="text-[#134E4A]">‹ ›</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
