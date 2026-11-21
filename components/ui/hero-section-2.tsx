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
      nextSectionPreview = {
        tag: "CONTINUOUS ENTERPRISE INTELLIGENCE",
        headline: "From Raw Operations to Boardroom Execution",
        description:
          "See how Jovix transforms complex data streams into high-margin strategic action.",
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
    const heroContentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
    const heroContentX = useTransform(scrollYProgress, [0, 0.28], [0, -35]);

    // 2. Right Image: Shifts left from 60% to 0%, expands to 100% full width, and clipPath straightens
    const imageLeft = useTransform(scrollYProgress, [0.08, 0.52], ["60%", "0%"]);
    const imageWidth = useTransform(scrollYProgress, [0.08, 0.52], ["40%", "100%"]);
    const imageClipPath = useTransform(
      scrollYProgress,
      [0.08, 0.45],
      [
        "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
        "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
      ]
    );

    // 3. Dark Overlay: Deepens as image expands to provide perfect contrast for the incoming text
    const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.35, 0.85]);

    // 4. Next Section Title & Copy: Appears in center of the full-width image
    const nextContentOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
    const nextContentY = useTransform(scrollYProgress, [0.55, 0.85], [35, 0]);

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
        className="relative w-full h-auto md:h-[220vh]"
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
                  <div className="h-1 w-16 rounded-full bg-[#134E4A]" />
                  <div className="h-1 w-4 rounded-full bg-[#D97706]" />
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

            {/* Atmospheric Dynamic Overlay */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-tr from-[#134E4A] via-[#0F3F3C] to-[#18221E] mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-black/35" />

            {/* Next Section Transition Content: Emerges when image covers full screen */}
            {nextSectionPreview && (
              <motion.div
                style={{ opacity: nextContentOpacity, y: nextContentY }}
                className="relative z-30 max-w-2xl text-center px-6 sm:px-8 py-12 text-white"
              >
                {nextSectionPreview.tag && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-[#D97706] mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
                    <span>{nextSectionPreview.tag}</span>
                  </div>
                )}

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  {nextSectionPreview.headline}
                </h2>

                {nextSectionPreview.description && (
                  <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
                    {nextSectionPreview.description}
                  </p>
                )}

                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D97706]/90">
                  <span>Scroll to explore architecture</span>
                  <svg
                    className="w-4 h-4 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
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
