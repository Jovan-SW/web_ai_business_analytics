"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useInView,
  animate,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

export const EASE_TASTE = [0.16, 1, 0.3, 1] as const;

/**
 * Deterministic number formatter with standard US English commas.
 * Prevents SSR/Client hydration mismatch across different user browser locales (e.g. id-ID vs en-US).
 */
export function formatNumberDeterministic(val: number, decimals = 0): string {
  if (decimals > 0) {
    const fixed = Number(val).toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decPart}`;
  }
  return Math.round(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * AnimatedCounter component
 * Renders smooth counting animations (starts from 0 up to target value) when scrolled into view
 * and when switching industries, while keeping SSR and hydration deterministically matching.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  // Initial SSR / Hydration state matches final target value deterministically
  const [displayValue, setDisplayValue] = useState(() =>
    formatNumberDeterministic(value, decimals)
  );

  useEffect(() => {
    if (!isInView) return;

    // Smooth counting animation from 0 up to target value
    const controls = animate(0, value, {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(formatNumberDeterministic(latest, decimals));
      },
    });

    return () => controls.stop();
  }, [isInView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums font-extrabold tracking-tight">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

/**
 * BorderBeam component (21st.dev signature effect)
 * Renders a razor-thin 1px animated light beam orbiting cleanly around the perimeter.
 * Uses 60fps GPU-composited SVG stroke-dashoffset animation.
 */
export function BorderBeam({
  size = 180,
  duration = 9,
  colorFrom = "#D97706",
  colorTo = "#134E4A",
  strokeWidth = 1.25,
}: {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  strokeWidth?: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="60%" stopColor={colorTo} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="15"
          ry="15"
          fill="none"
          stroke="url(#beamGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${size} 600`}
          animate={{
            strokeDashoffset: [0, -1200],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}

/**
 * ScanlineEffect
 * Subtle horizontal AI Scanline sweeping smoothly from top to bottom on a slow 4.2s infinite loop.
 */
export function ScanlineEffect({
  color = "#D97706",
  duration = 4.2,
}: {
  color?: string;
  duration?: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      <motion.div
        className="w-full h-10 -top-10 absolute pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${color}15 70%, ${color}40 98%, ${color} 100%)`,
          boxShadow: `0 2px 8px ${color}30`,
        }}
        animate={{
          y: ["0%", "1200%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

/**
 * SpotlightCard component
 * Cursor-tracked lighting wrapper for Bento Cards.
 * Tracks mouse relative position and paints dynamic radial gradient spotlight on hover.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(217, 119, 6, 0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group/spotlight relative rounded-3xl border border-white/[0.08] bg-[#0E1210] p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] hover:border-white/[0.16] transition-colors duration-300 overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              480px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 75%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

/**
 * BlurFadeIn component
 * Subtle blur-to-focus entrance animation with customizable delay, easing, and vertical offset.
 */
export function BlurFadeIn({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 16,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: EASE_TASTE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


