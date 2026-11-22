"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export const SWISS_EASE = [0.22, 1, 0.36, 1] as const;
export const SWISS_SPRING = { stiffness: 120, damping: 28, mass: 0.7 } as const;
export const TACTILE_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.8,
} as const;

/**
 * SwissMaskReveal:
 * Wraps typography in overflow-hidden and executes a vertical mask-reveal
 * inspired by Swiss International Style typography.
 */
interface SwissMaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function SwissMaskReveal({
  children,
  delay = 0,
  duration = 0.65,
  className = "",
}: SwissMaskRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-visible ${className}`}>
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration,
          delay,
          ease: SWISS_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * SwissHairline:
 * A 1px architectural rule that draws itself along its axis
 * (scaleX from origin-left or scaleY from origin-top).
 */
interface SwissHairlineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
  duration?: number;
  color?: string;
}

export function SwissHairline({
  orientation = "horizontal",
  className = "",
  delay = 0,
  duration = 0.9,
  color = "bg-[#18221E]/10",
}: SwissHairlineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`${
          orientation === "horizontal" ? "w-full h-px" : "h-full w-px"
        } ${color} ${className}`}
      />
    );
  }

  if (orientation === "vertical") {
    return (
      <div className={`h-full w-px overflow-hidden ${className}`}>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration,
            delay,
            ease: SWISS_EASE,
          }}
          style={{ transformOrigin: "top" }}
          className={`h-full w-px ${color}`}
        />
      </div>
    );
  }

  return (
    <div className={`w-full h-px overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration,
          delay,
          ease: SWISS_EASE,
        }}
        style={{ transformOrigin: "left" }}
        className={`w-full h-px ${color}`}
      />
    </div>
  );
}

/**
 * SwissScrollFrame:
 * Section/block wrapper using useScroll smoothed with useSpring(SWISS_SPRING).
 * Implements smooth enter-hold-exit transform mapping.
 */
interface SwissScrollFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function SwissScrollFrame({
  children,
  className = "",
}: SwissScrollFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SWISS_SPRING);

  // Smooth progressive opacity without washing out text:
  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0.9, 1, 1, 0.9]
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.18, 0.82, 1],
    [24, 0, 0, -20]
  );

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

