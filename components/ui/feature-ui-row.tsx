"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  ChevronRight,
  TrendingUp,
  Database,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* =========================================================================
   1. ODOMETER ENGINE (DIGIT REELS WITH CONTINUOUS RUN CAPABILITY)
   ========================================================================= */

function Reel({ digit, lh, delay }: { digit: number; lh: number; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-top" style={{ height: lh }}>
      <motion.span
        className="flex flex-col"
        initial={{ y: 0 }}
        animate={{ y: -digit * lh }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {Array.from({ length: 10 }).map((_, d) => (
          <span key={d} className="block" style={{ height: lh, lineHeight: `${lh}px` }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Odometer({
  value,
  size,
  run,
  suffix,
}: {
  value: number;
  size: number;
  run: boolean;
  suffix?: string;
}) {
  const lh = Math.round(size * 1.05);
  const chars = String(value).split("");
  return (
    <span
      className="inline-flex tabular-nums"
      style={{ fontSize: size, height: lh, lineHeight: `${lh}px` }}
      role="img"
      aria-label={`${value}${suffix ?? ""}`}
    >
      <span aria-hidden className="inline-flex select-none">
        {chars.map((c, i) => (
          <Reel key={i} digit={run ? Number(c) : 0} lh={lh} delay={0.3 + i * 0.08} />
        ))}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  );
}

/* =========================================================================
   2. VISUAL 1: CHECKLIST WITH FLOATING ODOMETER & AMBIENT SCANNER (STEP 01)
   ========================================================================= */

export interface ChecklistVisualProps {
  title: string;
  rows: { label: string; value: string }[];
  stat: { value: number; suffix?: string; label: string };
  badgeTone?: "spruce" | "charcoal" | "amber";
}

export function ChecklistVisual({
  title,
  rows,
  stat,
  badgeTone = "spruce",
}: ChecklistVisualProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative mt-8 sm:mt-12 w-[min(400px,84vw)]">
      {/* Floating Odometer Metric Pill with Continuous Breathing Float */}
      <motion.div
        className={cn(
          "absolute -right-3 -top-16 z-20 rounded-2xl border px-5 py-3.5 text-white shadow-2xl md:-right-6",
          badgeTone === "spruce"
            ? "border-emerald-400/30 bg-[#134E4A]/95 backdrop-blur-md"
            : "border-white/15 bg-[#18221E]/95 backdrop-blur-md"
        )}
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={
          inView
            ? {
                opacity: 1,
                y: [0, -6, 0],
                scale: 1,
              }
            : {}
        }
        transition={{
          y: {
            repeat: Infinity,
            duration: 4.2,
            ease: "easeInOut",
          },
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="font-extrabold tabular-nums tracking-tight text-[#D97706]">
            <Odometer value={stat.value} size={38} run={inView} suffix={stat.suffix} />
          </div>
          <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <p className="mt-1 text-[12px] font-medium text-white/85 flex items-center gap-1.5">
          <Shield className="size-3 text-emerald-300" />
          <span>{stat.label}</span>
        </p>
      </motion.div>

      {/* Main Checklist Container with Shimmer Border Scan */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-2 backdrop-blur-md shadow-2xl"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Continuous Top Scanner Light Beam */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-28 bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-10 pointer-events-none"
          animate={{ x: ["-100%", "360%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        <div className="rounded-xl bg-white p-4 sm:p-5 shadow-xs">
          <div className="pb-3 flex items-center justify-between border-b border-[#18221E]/8">
            <p className="text-[14px] font-bold text-[#18221E] tracking-tight flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#134E4A]" />
              <span>{title}</span>
            </p>
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              Live Verified
            </span>
          </div>

          <ul className="divide-y divide-[#18221E]/6">
            {rows.map((r, i) => (
              <motion.li
                key={r.label}
                className="group flex items-center justify-between gap-4 py-2.5 text-[13px] transition-colors rounded-lg px-1.5 hover:bg-[#F7F5F0]/80"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 3 }}
              >
                <span className="flex items-center gap-2.5 text-[#18221E]/85 font-medium">
                  <motion.span
                    className="grid size-4 place-items-center rounded-full bg-[#134E4A] text-white shadow-2xs"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: 0.6 + i * 0.15,
                    }}
                  >
                    <Check className="size-2.5" strokeWidth={3} />
                  </motion.span>
                  <span>{r.label}</span>
                </span>
                <span className="text-[#18221E] font-bold font-mono text-xs">{r.value}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   3. VISUAL 2: TIMELINE PIPELINE WITH FLOWING DATA PACKETS (STEP 02)
   ========================================================================= */

export interface TimelineVisualProps {
  title: string;
  stages: { label: string; count: number }[];
  total: number;
  note: string;
}

export function TimelineVisual({ title, stages, total, note }: TimelineVisualProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  let acc = 0;

  return (
    <motion.div
      ref={ref}
      className="relative w-[min(450px,86vw)] rounded-2xl border border-white/15 bg-[#18221E]/95 p-5 sm:p-6 text-white backdrop-blur-md shadow-2xl space-y-4"
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: [0, -5, 0],
              scale: 1,
            }
          : {}
      }
      transition={{
        y: {
          repeat: Infinity,
          duration: 4.8,
          ease: "easeInOut",
        },
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex items-center justify-between text-[14px]">
        <div className="flex items-center gap-2.5">
          <Database className="size-4 text-[#D97706]" />
          <span className="font-bold tracking-tight text-white">{title}</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Pipeline</span>
        </span>
      </div>

      {/* Progress Bars with Streaming Light Pulse */}
      <div className="relative overflow-hidden mt-3 flex h-11 rounded-xl bg-white/10 p-1 gap-1 border border-white/10">
        {/* Continuous Data Packet Pulse Sweep */}
        <motion.div
          className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 z-20 pointer-events-none"
          animate={{ x: ["-100%", "480%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {stages.map((s, i) => {
          const start = acc;
          acc += s.count;
          return (
            <motion.div
              key={s.label}
              className={cn(
                "relative z-10 flex h-full items-center px-3 text-[12px] font-bold rounded-lg truncate transition-transform hover:brightness-110",
                i === 0
                  ? "bg-[#134E4A] text-white"
                  : i === 1
                  ? "bg-[#D97706] text-white"
                  : "bg-white text-[#18221E]"
              )}
              style={{ width: `${(s.count / total) * 100}%`, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + (start / total) * 0.8 }}
            >
              <span className="truncate">{s.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Real-Time Telemetry Markers */}
      <div className="flex justify-between text-[11px] font-mono text-white/60 tabular-nums pt-1">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#134E4A]" />
          <span>Stripe Live</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#D97706]" />
          <span>QuickBooks Synced</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-white" />
          <span>CSV Parsed</span>
        </span>
      </div>

      {/* Execution Note with Dynamic Tag */}
      <motion.div
        className="pt-2 border-t border-white/10 flex items-center justify-between text-xs"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="rounded-md bg-[#D97706] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider font-mono">
          Ready
        </span>
        <span className="text-white/80 font-normal leading-relaxed text-right pl-2">
          {note}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================================
   4. VISUAL 3: DEDICATED SYNTHESIZED EXECUTIVE DASHBOARD (STEP 03)
   ========================================================================= */

export interface DashboardVisualProps {
  marginYield: string;
  reconciledNet: string;
  precisionStat: { value: number; suffix?: string; label: string };
}

export function DashboardVisual({
  marginYield,
  reconciledNet,
  precisionStat,
}: DashboardVisualProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative mt-8 sm:mt-12 w-[min(440px,86vw)]">
      {/* Floating Odometer Pill */}
      <motion.div
        className="absolute -right-3 -top-16 z-20 rounded-2xl border border-emerald-400/30 bg-[#134E4A]/95 px-5 py-3.5 text-white shadow-2xl backdrop-blur-md md:-right-6"
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={
          inView
            ? {
                opacity: 1,
                y: [0, -6, 0],
                scale: 1,
              }
            : {}
        }
        transition={{
          y: {
            repeat: Infinity,
            duration: 4.4,
            ease: "easeInOut",
          },
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="font-extrabold tabular-nums tracking-tight text-[#D97706]">
            <Odometer value={precisionStat.value} size={38} run={inView} suffix={precisionStat.suffix} />
          </div>
          <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <p className="mt-1 text-[12px] font-medium text-white/85 flex items-center gap-1.5">
          <Zap className="size-3 text-[#D97706]" />
          <span>{precisionStat.label}</span>
        </p>
      </motion.div>

      {/* Main Dashboard Card with Glowing Wave Chart */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] p-3 sm:p-4 backdrop-blur-md shadow-2xl space-y-3"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* KPI Dual Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <motion.div
            className="rounded-xl bg-white p-3.5 shadow-sm border border-[#18221E]/8 hover:border-[#134E4A]/40 transition-colors"
            whileHover={{ y: -2 }}
          >
            <span className="text-[10px] font-mono uppercase font-bold text-[#18221E]/60 block mb-1">
              Gross Margin
            </span>
            <p className="text-xl font-black text-[#18221E] tabular-nums">{marginYield}</p>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <TrendingUp className="size-3" />
              <span>+4.2% yield</span>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl bg-white p-3.5 shadow-sm border border-[#18221E]/8 hover:border-[#134E4A]/40 transition-colors"
            whileHover={{ y: -2 }}
          >
            <span className="text-[10px] font-mono uppercase font-bold text-[#18221E]/60 block mb-1">
              Net Reconciled
            </span>
            <p className="text-xl font-black text-[#18221E] tabular-nums">{reconciledNet}</p>
            <span className="mt-1 inline-block text-[11px] font-bold text-[#134E4A] font-mono">
              0 Unmatched Rows
            </span>
          </motion.div>
        </div>

        {/* Dynamic Animated Sparkline Wave Chart */}
        <div className="rounded-xl bg-[#134E4A] p-4 text-white relative overflow-hidden space-y-2 border border-emerald-400/20">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-100">PROFIT RUNWAY TRAJECTORY</span>
            <span className="text-[#D97706] font-bold">OPTIMAL YIELD</span>
          </div>

          <div className="relative h-16 w-full flex items-end">
            <svg
              className="w-full h-full text-emerald-300 overflow-visible"
              viewBox="0 0 200 40"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Animated Path Draw-In */}
              <motion.path
                d="M0 32 Q 35 15, 70 24 T 140 10 T 200 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
              <path
                d="M0 32 Q 35 15, 70 24 T 140 10 T 200 6 L 200 40 L 0 40 Z"
                fill="rgba(52, 211, 153, 0.14)"
              />
            </svg>

            {/* Glowing Apex Beacon on Curve */}
            <motion.div
              className="absolute right-0 top-1 size-3 rounded-full bg-[#D97706] shadow-[0_0_12px_#D97706]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   5. VISUAL 4: INTERACTIVE COPILOT CHAT WITH SHIMMER ACTION (STEP 04)
   ========================================================================= */

export interface CopilotVisualProps {
  question: string;
  answer: string;
  actionTag: string;
}

export function CopilotVisual({ question, answer, actionTag }: CopilotVisualProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative w-[min(450px,86vw)] rounded-2xl border border-white/15 bg-[#18221E]/95 p-5 sm:p-6 text-white backdrop-blur-md shadow-2xl space-y-4 my-2"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: [0, -4, 0],
              scale: 1,
            }
          : {}
      }
      transition={{
        y: {
          repeat: Infinity,
          duration: 4.6,
          ease: "easeInOut",
        },
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex items-center justify-between text-xs pb-2.5 border-b border-white/10 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#D97706] font-bold">JOVIX COPILOT</span>
        </div>
      </div>

      {/* User Prompt Bubble with Dynamic Entrance */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-white text-[#18221E] px-4 py-2.5 text-xs sm:text-[13px] font-semibold leading-relaxed shadow-sm">
          &quot;{question}&quot;
        </div>
      </motion.div>

      {/* AI Bot Diagnostic Bubble with Shimmering 1-Click Action */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        <div className="max-w-[94%] rounded-2xl rounded-tl-xs bg-[#134E4A] text-white p-4 text-xs sm:text-[13px] leading-relaxed shadow-sm space-y-3 border border-emerald-400/25">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>AI DIAGNOSTIC ROOT CAUSE</span>
          </div>

          <p className="text-emerald-50 leading-relaxed font-normal">{answer}</p>

          {/* Interactive 1-Click Action Pill with Moving Shimmer */}
          <div className="pt-2 border-t border-white/15">
            <motion.div
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-lg bg-[#D97706] px-3 py-1.5 text-xs font-bold text-white shadow-xs cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Moving Shimmer Beam */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10">{actionTag}</span>
              <ArrowRight className="size-3 relative z-10" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================================
   6. MASTER COMPONENT: FEATURE UI ROW WITH HOVER ELEVATION & TACTILE DEPTH
   ========================================================================= */

export interface FeatureUIRowProps {
  eyebrow: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  visual: React.ReactNode;
  /** put the visual on the left */
  reverse?: boolean;
  /** panel background behind the visual */
  tone?: "royal" | "night" | "spruce" | "charcoal";
  className?: string;
}

export function FeatureUIRow({
  eyebrow,
  title,
  body,
  cta,
  visual,
  reverse,
  tone = "spruce",
  className,
}: FeatureUIRowProps) {
  const getToneBackground = () => {
    switch (tone) {
      case "royal":
      case "spruce":
        return "bg-[#134E4A]";
      case "night":
      case "charcoal":
      default:
        return "bg-[#18221E]";
    }
  };

  const rowRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={rowRef}
      className={cn(
        "grid w-full items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 lg:gap-18",
        className
      )}
    >
      {/* Content Column with Staggered Entrance */}
      <motion.div
        className={cn("max-w-[460px]", reverse && "md:order-2")}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
          <span className="h-px w-5 bg-[#D97706]" />
          {eyebrow}
        </p>
        <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-[#18221E] leading-[1.18]">
          {title}
        </h3>
        <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#18221E]/75 font-normal">
          {body}
        </p>
        {cta && (
          <motion.a
            href={cta.href}
            className="group mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#18221E]/15 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-[#18221E] hover:border-[#134E4A] hover:text-[#134E4A] transition-colors shadow-2xs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{cta.label}</span>
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </motion.a>
        )}
      </motion.div>

      {/* Visual Canvas Panel with Subtle 3D Hover Lift & Ambient Glow */}
      <motion.div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-3xl px-5 py-10 sm:py-14 md:min-h-[460px] lg:min-h-[500px] md:px-8 md:py-8 shadow-xl border border-[#18221E]/10 cursor-default",
          getToneBackground(),
          reverse && "md:order-1"
        )}
        whileHover={{
          y: -6,
          boxShadow: "0 25px 35px -10px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* Ambient Center Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        {/* Hairline texture on both edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 1px, transparent 1px 9px)",
            maskImage: "linear-gradient(90deg, #000, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/4 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 1px, transparent 1px 9px)",
            maskImage: "linear-gradient(270deg, #000, transparent)",
          }}
        />

        <div className="relative z-10">{visual}</div>
      </motion.div>
    </div>
  );
}

export default FeatureUIRow;
