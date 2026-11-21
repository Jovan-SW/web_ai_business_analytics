"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

// Clean SVG Icon component for business stats & contact metrics
const InfoIcon = ({
  type,
}: {
  type: "website" | "phone" | "address" | "speed" | "security" | "workflow";
}) => {
  const icons: Record<string, React.ReactNode> = {
    website: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-[#134E4A]"
      >
        <circle cx="12" cy="10" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-[#134E4A]"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    address: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-[#134E4A]"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    speed: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-[#D97706]"
      >
        <path d="m13 2-2 10h9L7 22l2-10H2l11-10Z" />
      </svg>
    ),
    security: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-[#134E4A]"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    workflow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-[#D97706]"
      >
        <rect width="6" height="6" x="3" y="3" rx="1" />
        <rect width="6" height="6" x="15" y="3" rx="1" />
        <rect width="6" height="6" x="9" y="15" rx="1" />
        <path d="m6 9 3 6" />
        <path d="m18 9-3 6" />
      </svg>
    ),
  };

  return <div className="mr-2.5 flex-shrink-0">{icons[type] || icons.website}</div>;
};

// Clean SVG Icon component for the 3 Pillars
const PillarIcon = ({
  type,
}: {
  type: "analytics" | "intelligence" | "automation";
}) => {
  switch (type) {
    case "analytics":
      return (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case "intelligence":
      return (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="m16.24 16.24 2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
        </svg>
      );
    case "automation":
      return (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M9 6h4a5 5 0 0 1 5 5" />
          <path d="M9 18h4a5 5 0 0 0 5-5" />
          <path d="M6 9v6" />
        </svg>
      );
  }
};

// Vertical Text Rotator Component
export function VerticalTextRotator({
  words,
  interval = 2800,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  if (!words || words.length === 0) return null;

  return (
    <span
      className={cn(
        "inline-flex overflow-hidden align-baseline relative h-[1.25em] text-[#134E4A] font-extrabold",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0, filter: "blur(3px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(3px)" }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Pillar Data Interface
export interface PillarItem {
  number?: string;
  tag?: string;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
  specs?: string[];
  iconType?: "analytics" | "intelligence" | "automation";
}

export const DEFAULT_PILLARS: PillarItem[] = [
  {
    tag: "LEDGER SYNTHESIS",
    title: "Business Analytics",
    subtitle: "Unified Ledger & Metric Modeling",
    description:
      "Ingests and normalizes raw transactional records across ERPs, databases, and payment processors into a single unified data plane. Uncovers accurate unit economics, gross margins, and live cash runway with zero manual spreadsheet reconciliation.",
    iconType: "analytics",
  },
  {
    tag: "REASONING ENGINE",
    title: "AI Intelligence",
    subtitle: "Autonomous Variance & Leak Detection",
    description:
      "Performs continuous heuristic audits across journal entries and operational expenses. Pinpoints vendor overcharges, unit-cost variance spikes, and stealth margin decay weeks before accounting books close.",
    iconType: "intelligence",
  },
  {
    tag: "CLOSED-LOOP OPS",
    title: "Workflow Automation",
    subtitle: "Closed-Loop Action & Bi-Directional Sync",
    description:
      "Converts static analytical findings into automated operational workflows. Dispatches prioritized resolution alerts to department owners and synchronizes reconciled entries directly back into your accounting stack.",
    iconType: "automation",
  },
];

// Prop types for the HeroSection component
export interface HeroSectionProps
  extends Omit<HTMLMotionProps<"section">, "title"> {
  logo?: {
    url?: string;
    alt?: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  rotatingWords?: string[];
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  secondaryCallToAction?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  contactInfo?: {
    website?: string;
    phone?: string;
    address?: string;
  };
  metrics?: {
    icon?: "website" | "phone" | "address" | "speed" | "security" | "workflow";
    label: string;
    value: string;
  }[];
  pillars?: PillarItem[];
  nextSectionPreview?: {
    tag?: string;
    headline?: string;
    description?: string;
  };
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      logo,
      slogan,
      title,
      rotatingWords,
      subtitle,
      callToAction,
      secondaryCallToAction,
      backgroundImage,
      contactInfo,
      metrics,
      pillars = DEFAULT_PILLARS,
      nextSectionPreview = {
        tag: "CONTINUOUS DECISION INTELLIGENCE",
        headline: "From Raw Data to Executive Action",
        description:
          "Jovix unifies your entire business analysis lifecycle through three foundational pillars—eliminating operational blind spots, automating variance detection, and turning raw ledgers into strategic execution.",
      },
      ...props
    },
    ref
  ) => {
    // Scroll progress orchestration for the expanding image transition
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: scrollContainerRef,
      offset: ["start start", "end end"],
    });

    // 1. Hero Left Content: Fades out and slides slightly left as scroll progresses
    const heroContentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
    const heroContentX = useTransform(scrollYProgress, [0, 0.22], [0, -35]);

    // 2. Right Image: Shifts left from 60% to 0%, expands to 100% full width, and clipPath straightens
    const imageLeft = useTransform(scrollYProgress, [0.06, 0.44], ["60%", "0%"]);
    const imageWidth = useTransform(scrollYProgress, [0.06, 0.44], ["40%", "100%"]);
    const imageClipPath = useTransform(
      scrollYProgress,
      [0.06, 0.38],
      [
        "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
        "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
      ]
    );

    // 3. Dark Overlay: Deepens as image expands to provide perfect contrast for the incoming text
    const overlayOpacity = useTransform(scrollYProgress, [0.12, 0.48], [0.35, 0.88]);

    // 4. Next Section Title, Description & 3 Pillars Grid: Appears when image is full
    const nextContentOpacity = useTransform(scrollYProgress, [0.42, 0.72], [0, 1]);
    const nextContentY = useTransform(scrollYProgress, [0.42, 0.72], [40, 0]);

    // Staggered container animation orchestrating entrance
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.15,
        },
      },
    };

    // Smooth upward slide & fade-in for editorial elements
    const itemVariants: Variants = {
      hidden: { y: 22, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    const defaultImage =
      "https://images.unsplash.com/photo-1655841603567-72ca4d864457?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    const bgUrl = backgroundImage || defaultImage;

    return (
      <div
        ref={scrollContainerRef}
        className="relative w-full h-auto md:h-[260vh]"
      >
        {/* Sticky Viewport Stage */}
        <motion.section
          ref={ref}
          className={cn(
            "md:sticky md:top-16 relative flex w-full flex-col overflow-hidden bg-[#F7F5F0] text-[#18221E] md:flex-row h-auto md:h-[calc(100vh-4rem)] min-h-[620px] lg:min-h-[700px] border-b border-[#18221E]/10",
            className
          )}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          {...props}
        >
          {/* Left Side: Strategic Value Proposition & CTAs */}
          <motion.div
            style={{ opacity: heroContentOpacity, x: heroContentX }}
            className="flex w-full flex-col justify-between p-7 sm:p-10 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 z-10"
          >
            <div>
              {/* Optional Brand Slogan (No Bubble) */}
              {(logo || slogan) && (
                <motion.header className="mb-6" variants={itemVariants}>
                  {logo ? (
                    <div className="flex items-center gap-3">
                      {logo.url && (
                        <img
                          src={logo.url}
                          alt={logo.alt || "Logo"}
                          className="h-8 w-auto object-contain rounded"
                        />
                      )}
                      <div>
                        {logo.text && (
                          <p className="text-lg font-bold tracking-tight text-[#18221E]">
                            {logo.text}
                          </p>
                        )}
                        {slogan && (
                          <p className="text-xs font-mono font-semibold tracking-wider uppercase text-[#D97706]">
                            {slogan}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : slogan ? (
                    <p className="text-xs font-mono font-bold tracking-wider uppercase text-[#D97706]">
                      {slogan}
                    </p>
                  ) : null}
                </motion.header>
              )}

              {/* Main Headline with Vertical Text Rotator */}
              <motion.main variants={containerVariants}>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl/[1.18] font-extrabold tracking-[-0.035em] text-[#18221E]"
                  variants={itemVariants}
                >
                  <span>{title}</span>{" "}
                  {rotatingWords && rotatingWords.length > 0 && (
                    <VerticalTextRotator words={rotatingWords} />
                  )}
                </motion.h1>

                {/* Bespoke Double-Tone Accent Hairline */}
                <motion.div
                  className="my-6 flex items-center gap-1.5"
                  variants={itemVariants}
                >
                  <div className="h-1 w-16 bg-[#134E4A]" />
                  <div className="h-1 w-4 bg-[#D97706]" />
                </motion.div>

                {/* Subheadline: Expanded, clear, highly readable */}
                <motion.p
                  className="mb-8 max-w-xl lg:max-w-2xl text-base sm:text-lg leading-relaxed text-[#18221E]/80 font-normal"
                  variants={itemVariants}
                >
                  {subtitle}
                </motion.p>

                {/* Action Buttons: Primary Deep Forest Teal + Secondary Ghost */}
                <motion.div
                  className="flex flex-wrap items-center gap-4"
                  variants={itemVariants}
                >
                  <a
                    href={callToAction.href}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#134E4A] hover:bg-[#0F3F3C] active:scale-[0.98] rounded-xl shadow-sm hover:shadow-md hover:shadow-[#134E4A]/25 transition-all duration-200"
                  >
                    <span>{callToAction.text}</span>
                    <svg
                      className="w-4 h-4 text-[#D97706] transition-transform duration-200 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>

                  {secondaryCallToAction && (
                    <a
                      href={secondaryCallToAction.href}
                      className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-[#18221E] hover:text-[#134E4A] bg-[#FFFFFF] hover:bg-[#EFECE6] border border-[#18221E]/15 rounded-xl transition-colors duration-150"
                    >
                      <svg
                        className="w-4 h-4 text-[#134E4A]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>{secondaryCallToAction.text}</span>
                    </a>
                  )}
                </motion.div>
              </motion.main>
            </div>

            {/* Bottom Section: Enterprise Metrics */}
            <motion.footer
              className="mt-12 w-full pt-6 border-t border-[#18221E]/10"
              variants={itemVariants}
            >
              {metrics && metrics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {metrics.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <InfoIcon type={m.icon || "speed"} />
                      <div>
                        <p className="text-xs font-semibold text-[#18221E]">
                          {m.value}
                        </p>
                        <p className="text-[11px] text-[#18221E]/60">
                          {m.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : contactInfo ? (
                <div className="grid grid-cols-1 gap-4 text-xs text-[#18221E]/70 sm:grid-cols-3">
                  {contactInfo.website && (
                    <div className="flex items-center">
                      <InfoIcon type="website" />
                      <span className="truncate">{contactInfo.website}</span>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center">
                      <InfoIcon type="phone" />
                      <span className="truncate">{contactInfo.phone}</span>
                    </div>
                  )}
                  {contactInfo.address && (
                    <div className="flex items-center">
                      <InfoIcon type="address" />
                      <span className="truncate">{contactInfo.address}</span>
                    </div>
                  )}
                </div>
              ) : null}
            </motion.footer>
          </motion.div>

          {/* Right Side: Entrance Animation (Right-to-Left on Load) + Expanding Image on Scroll */}
          <motion.div
            style={{
              left: imageLeft,
              width: imageWidth,
              clipPath: imageClipPath,
            }}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.15,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className="md:absolute top-0 bottom-0 right-0 w-full min-h-[380px] md:min-h-full overflow-hidden bg-cover bg-center z-20 flex items-center justify-center"
          >
            {/* Base Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${bgUrl})` }}
            />

            {/* Atmospheric Dynamic Overlay with Ambient Lighting for Clarity */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-tr from-[#134E4A]/90 via-[#0F3F3C]/80 to-[#18221E]/95"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 via-black/55 to-black/85" />

            {/* Next Section: 3 Pillars Introduction (Emerges when image is full-width) */}
            {nextSectionPreview && (
              <motion.div
                style={{ opacity: nextContentOpacity, y: nextContentY }}
                className="relative z-30 max-w-6xl w-full text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-white flex flex-col justify-center h-full max-h-full overflow-y-auto"
              >
                {/* Header Tag - Clean Architectural Overline (Zero Bubbles) */}
                {nextSectionPreview.tag && (
                  <p className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.24em] text-[#D97706] mb-3">
                    {nextSectionPreview.tag}
                  </p>
                )}

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                  {nextSectionPreview.headline}
                </h2>

                {/* Subtitle / Intro */}
                {nextSectionPreview.description && (
                  <p className="mt-3 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-sm">
                    {nextSectionPreview.description}
                  </p>
                )}

                {/* The 3 Core Pillars Grid - Bright, Assertive & Professional Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-6 sm:mt-8 text-left">
                  {pillars.map((pillar, idx) => (
                    <div
                      key={pillar.title || idx}
                      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] text-[#18221E] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.45)] border border-[#EFECE6] transition-all duration-300 hover:-translate-y-1.5"
                    >
                      {/* Top Accent Line for Assertive Definition */}
                      <div className="absolute top-0 left-6 right-6 h-[3px] bg-[#18221E]/10 group-hover:bg-[#134E4A] transition-colors duration-300" />

                      <div>
                        {/* Clean Architectural Header (No Bubbles, No Numbers) */}
                        <div className="flex items-center justify-between mb-4 pt-1">
                          {pillar.tag && (
                            <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#D97706]">
                              {pillar.tag}
                            </span>
                          )}

                          <div className="w-9 h-9 rounded-lg bg-[#F7F5F0] border border-[#18221E]/10 text-[#134E4A] flex items-center justify-center group-hover:bg-[#134E4A] group-hover:text-white transition-colors duration-300">
                            <PillarIcon type={pillar.iconType || "analytics"} />
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#18221E] tracking-tight group-hover:text-[#134E4A] transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#D97706] mt-1 font-mono">
                          {pillar.subtitle}
                        </p>

                        {/* Highly Readable Description */}
                        <p className="mt-3.5 text-xs sm:text-sm text-[#18221E]/80 leading-relaxed font-normal">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
