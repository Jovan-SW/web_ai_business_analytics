"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  PRODUCT_INDUSTRIES,
  type IndustryKey,
  type IndustryData,
} from "./product-data";
import {
  SpotlightCard,
  EASE_TASTE,
} from "./motion-primitives";
import {
  UploadCloud,
  Cpu,
  LayoutDashboard,
  ArrowRight,
  Send,
  User,
  Bot,
  Sparkles,
  BarChart3,
  Layers,
  ChevronsUpDown,
  MessageSquare,
} from "lucide-react";

/* =========================================================================
   CONTAINER ENTRANCE VARIANTS
   ========================================================================= */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE_TASTE,
    },
  },
};

/* =========================================================================
   CARD 1 (col-span-7): Auto-Layout Dashboard Engine
   ========================================================================= */
function AutoLayoutDashboardCard({
  activeIndustry = "saas",
}: {
  activeIndustry: IndustryKey;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const data: IndustryData =
    PRODUCT_INDUSTRIES[activeIndustry] || PRODUCT_INDUSTRIES.saas;

  return (
    <SpotlightCard className="h-full flex flex-col justify-between">
      {/* 1. Card Header Copy (Top-Left) */}
      <div className="mb-6">
        <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          Charts auto-configure to your data structure
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed font-normal max-w-xl">
          Zero drag-and-drop widgets or manual formulas. AI instantly selects the highest-conviction visualization mode.
        </p>
      </div>

      {/* 2. Visual Stage: Interactive Horizontal Breakdown Bars */}
      <div
        ref={containerRef}
        className="w-full rounded-2xl bg-black/40 border border-white/[0.07] p-4 sm:p-5 relative overflow-hidden backdrop-blur-xs"
      >
        {/* Subtle Live Toggle Pill Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-[11px] font-mono font-bold text-white/90 uppercase tracking-wider">
              Mode: Revenue Breakdown
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/40 tracking-tight">
            Auto-partitioned • 100% Volume
          </span>
        </div>

        {/* Dynamic Horizontal Breakdown Bars with Stagger & Morph */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_TASTE }}
            className="space-y-3"
          >
            {data.bentoBars.map((bar, index) => (
              <div key={`${activeIndustry}-${bar.label}`} className="group/bar">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-white/80 font-medium truncate max-w-[220px] sm:max-w-none">
                    {bar.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-[11px]">{bar.amount}</span>
                    <span className="font-bold text-[#D97706] text-xs">
                      {bar.percentage}
                    </span>
                  </div>
                </div>

                {/* Track */}
                <div className="h-2.5 w-full bg-white/[0.05] rounded-full overflow-hidden p-0.5 border border-white/[0.04]">
                  {/* Animated Bar with scaleX & width */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.12 + index * 0.08,
                      ease: EASE_TASTE,
                    }}
                    style={{
                      transformOrigin: "left",
                      width: `${bar.value}%`,
                      backgroundColor: bar.color || "#134E4A",
                    }}
                    className="h-full rounded-full transition-all group-hover/bar:brightness-110 shadow-xs"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
}

/* =========================================================================
   CARD 2 (col-span-5): Contextual AI Business Assistant (3-Chat Scrollable)
   ========================================================================= */
function ContextualAiBusinessBotCard({
  activeIndustry = "saas",
}: {
  activeIndustry: IndustryKey;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const data: IndustryData =
    PRODUCT_INDUSTRIES[activeIndustry] || PRODUCT_INDUSTRIES.saas;

  // Multi-Beat Chat Choreography State:
  // Beat 0: idle
  // Beat 1 (0.20s): user bubble
  // Beat 2 (0.75s): typing status indicator
  // Beat 3 (1.55s): AI response card
  // Beat 4 (1.90s): data chips pop in
  const [chatStep, setChatStep] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    setChatStep(0);

    const t1 = setTimeout(() => setChatStep(1), 200);
    const t2 = setTimeout(() => setChatStep(2), 750);
    const t3 = setTimeout(() => setChatStep(3), 1550);
    const t4 = setTimeout(() => setChatStep(4), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isInView, activeIndustry]);

  const conversations = data.chatScenario.conversations || [];

  return (
    <SpotlightCard className="h-full flex flex-col justify-between">
      {/* 1. Header Copy */}
      <div className="mb-5">
        <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          Query your business health in real-time
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
          The AI copilot reads your entire dashboard to identify margin leaks, answer diagnostic questions, and draft strategic actions.
        </p>
      </div>

      {/* 2. Visual Stage: Dark Minimal Chat Canvas (Scrollable 3-Thread Stage) */}
      <div
        ref={containerRef}
        className="w-full rounded-2xl bg-black/55 border border-white/[0.08] p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 relative min-h-[300px] overflow-hidden"
      >
        {/* Top Header of Chat Stage with Live Cue */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#134E4A] flex items-center justify-center text-[#D97706]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-mono font-bold text-white/90">
              Jovix Copilot Thread
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-[9.5px] font-mono text-white/50">
            <ChevronsUpDown className="w-3 h-3 text-[#D97706]" />
            <span>Scrollable (3 Conversations)</span>
          </div>
        </div>

        {/* Scrollable Conversation Container */}
        <div
          ref={scrollRef}
          className="h-[230px] sm:h-[245px] overflow-y-auto pr-1.5 space-y-4 overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(217,119,6,0.35)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/[0.02] [&::-webkit-scrollbar-thumb]:bg-[#D97706]/40 hover:[&::-webkit-scrollbar-thumb]:bg-[#D97706]/70 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {conversations.map((conv, idx) => {
            const isFirstChat = idx === 0;

            return (
              <div
                key={conv.id}
                id={`chat-thread-${idx}`}
                className="space-y-2.5 pt-1"
              >
                {/* Separator between threads */}
                {idx > 0 && (
                  <div className="flex items-center justify-between py-1.5 border-t border-white/[0.06] my-2 text-[9px] font-mono text-white/40">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-[#D97706]" />
                      Conversation #{idx + 1}
                    </span>
                    <span>{conv.time}</span>
                  </div>
                )}

                {/* USER BUBBLE */}
                {(!isFirstChat || chatStep >= 1) && (
                  <motion.div
                    initial={isFirstChat ? { opacity: 0, x: 14, y: 6 } : false}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE_TASTE }}
                    className="flex items-start justify-end gap-2"
                  >
                    <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-[#134E4A] text-white px-3 py-2 text-xs leading-relaxed shadow-md border border-white/10">
                      <p className="font-medium">{conv.userQuestion}</p>
                      <span className="block text-[9px] font-mono text-white/50 text-right mt-1">
                        {conv.userRole || "Founder"} • {conv.time}
                      </span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  </motion.div>
                )}

                {/* TYPING STATUS (Only during Beat 2 for first chat) */}
                {isFirstChat && chatStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 pl-1 py-0.5"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#134E4A]/80 text-[#D97706] flex items-center justify-center">
                      <Bot className="w-2.5 h-2.5" />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-[10px] font-mono text-white/60">
                      <span>AI analyzing data</span>
                      <span className="flex items-center gap-0.5 text-[#D97706]">
                        <span className="w-1 h-1 rounded-full bg-[#D97706] animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1 h-1 rounded-full bg-[#D97706] animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1 h-1 rounded-full bg-[#D97706] animate-bounce" />
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* AI RESPONSE CARD */}
                {(!isFirstChat || chatStep >= 3) && (
                  <motion.div
                    initial={isFirstChat ? { opacity: 0, y: 8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE_TASTE }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#134E4A] border border-white/15 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="w-3 h-3 text-[#D97706]" />
                    </div>
                    <div className="max-w-[92%] rounded-2xl rounded-tl-xs bg-white/[0.04] border border-white/[0.09] p-2.5 text-xs leading-relaxed text-white/90 shadow-sm backdrop-blur-xs">
                      <p className="text-white/85 text-[11px] sm:text-xs font-normal">
                        {conv.aiSummary}
                      </p>

                      {/* DATA CHIPS */}
                      {(!isFirstChat || chatStep >= 4) && (
                        <div className="flex flex-wrap gap-1 mt-2 pt-1.5 border-t border-white/[0.06]">
                          {conv.aiChips.map((chip) => (
                            <span
                              key={chip.label}
                              className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border font-semibold inline-flex items-center gap-1 ${
                                chip.type === "critical"
                                  ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                                  : chip.type === "warning"
                                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                                  : chip.type === "success"
                                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                                  : "bg-[#134E4A]/30 border-[#134E4A]/60 text-white/80"
                              }`}
                            >
                              <span
                                className={`w-1 h-1 rounded-full ${
                                  chip.type === "critical"
                                    ? "bg-rose-400"
                                    : chip.type === "warning"
                                    ? "bg-amber-400"
                                    : chip.type === "success"
                                    ? "bg-emerald-400"
                                    : "bg-[#10B981]"
                                }`}
                              />
                              {chip.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar Mockup */}
        <div className="pt-2 border-t border-white/[0.06]">
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
            <span className="text-[10px] font-mono text-white/40 truncate">
              {data.chatScenario.followUpHint}
            </span>
            <button
              type="button"
              aria-label="Send query"
              className="w-5 h-5 rounded-md bg-[#134E4A] hover:bg-[#0F3F3C] text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* =========================================================================
   CARD 3 (col-span-5): Smart Anomaly & Signal Radar
   ========================================================================= */
function SmartAnomalyRadarCard({
  activeIndustry = "saas",
}: {
  activeIndustry: IndustryKey;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const data: IndustryData =
    PRODUCT_INDUSTRIES[activeIndustry] || PRODUCT_INDUSTRIES.saas;

  // Auto-Focus Cycle: every 3.2s softly elevate one row
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || data.anomalies.length === 0) return;
    const interval = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % data.anomalies.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isHovered, data.anomalies.length]);

  return (
    <SpotlightCard className="h-full flex flex-col justify-between">
      {/* 1. Header Copy */}
      <div className="mb-5">
        <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          Detect anomalies before they become losses
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
          Continuously monitors margin fluctuations, rapid stockouts, and peak hour shifts automatically.
        </p>
      </div>

      {/* 2. Visual Stage: 3 Stacked Glassmorphic Alert Rows */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full space-y-2.5 my-auto"
      >
        {data.anomalies.map((item, idx) => {
          const isFocused = activeCycleIndex === idx;

          return (
            <motion.div
              key={`${activeIndustry}-${item.id}`}
              initial={{ x: -16, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -16, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + idx * 0.09,
                ease: EASE_TASTE,
              }}
              onMouseEnter={() => setActiveCycleIndex(idx)}
              className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                isFocused
                  ? "bg-white/[0.06] border-white/[0.14] scale-[1.015] shadow-lg"
                  : "bg-white/[0.02] border-white/[0.06] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.dotColor }}
                  />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/50 uppercase">
                    {item.tag}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">{item.time}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs sm:text-[13px] font-bold text-white tracking-tight">
                  {item.title}
                </h5>
                <span className="font-mono text-[11px] font-semibold text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/20 shrink-0">
                  {item.metric}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SpotlightCard>
  );
}

/* =========================================================================
   CARD 4 (col-span-7): 3-Step Zero-Friction Pipeline (Circuit Beam)
   ========================================================================= */
function ZeroFrictionPipelineCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  // Sync rhythmic ring highlights on Node 1, 2, 3 with traveling pulse
  const [activeStepPulse, setActiveStepPulse] = useState(0);

  useEffect(() => {
    // 3.6s duration loop divided by 3 nodes = 1.2s per node
    const interval = setInterval(() => {
      setActiveStepPulse((prev) => (prev + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const pipelineNodes = [
    {
      num: "01",
      title: "Login & Upload",
      sub: "Excel / CSV / Instant Sync",
      icon: UploadCloud,
      color: "#D97706",
    },
    {
      num: "02",
      title: "AI Pattern Synthesis",
      sub: "Auto-Sanitize & Normalization",
      icon: Cpu,
      color: "#134E4A",
    },
    {
      num: "03",
      title: "Dashboard & Copilot",
      sub: "Interactive Views & 24/7 AI",
      icon: LayoutDashboard,
      color: "#10B981",
    },
  ];

  return (
    <SpotlightCard className="h-full flex flex-col justify-between">
      {/* 1. Header Copy */}
      <div className="mb-6">
        <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
          Three steps from upload to executive action
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed font-normal max-w-xl">
          Engineered for founders and operators to activate instantly without a dedicated data team or complex setup.
        </p>
      </div>

      {/* 2. Visual Stage: 3 Connected Nodes with Animated SVG Circuit Beam */}
      <div
        ref={containerRef}
        className="w-full rounded-2xl bg-black/40 border border-white/[0.07] p-5 sm:p-6 relative overflow-hidden backdrop-blur-xs my-auto"
      >
        {/* Animated Connector Line Behind Nodes (Desktop) */}
        <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-5 pointer-events-none z-0">
          <svg
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="travelBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#134E4A" stopOpacity="0" />
                <stop offset="50%" stopColor="#D97706" stopOpacity="1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Precision SVG Dashed Pathway */}
            <line
              x1="0"
              y1="10"
              x2="100%"
              y2="10"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Continuously Gliding Luminous Traveling Beam */}
            <motion.line
              x1="0"
              y1="10"
              x2="100%"
              y2="10"
              stroke="url(#travelBeam)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="90 350"
              animate={{
                strokeDashoffset: [440, -440],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </div>

        {/* 3 Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {pipelineNodes.map((node, nodeIdx) => {
            const Icon = node.icon;
            const isPulseActive = activeStepPulse === nodeIdx;

            return (
              <motion.div
                key={node.num}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + nodeIdx * 0.1,
                  ease: EASE_TASTE,
                }}
                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center text-center relative ${
                  isPulseActive
                    ? "bg-white/[0.08] border-white/20 shadow-md scale-[1.02]"
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]"
                }`}
              >
                {/* Node Step Badge & Icon with Synchronized Rhythmic Ring */}
                <div
                  className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                    isPulseActive
                      ? "bg-white/10 ring-2 ring-[#D97706]/70 shadow-[0_0_24px_rgba(217,119,6,0.35)]"
                      : "bg-white/[0.04] ring-1 ring-white/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isPulseActive ? "scale-110 text-white" : "text-white/70"
                    }`}
                  />
                  <span className="absolute -top-1.5 -right-1.5 font-mono text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#18221E] text-[#D97706] border border-white/10">
                    {node.num}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white tracking-tight">
                  {node.title}
                </h5>
                <p className="text-[11px] font-mono text-white/50 mt-1 leading-relaxed">
                  {node.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SpotlightCard>
  );
}

/* =========================================================================
   MAIN EXPORT: ProductBentoGrid
   ========================================================================= */
interface ProductBentoGridProps {
  activeIndustry?: IndustryKey;
}

export function ProductBentoGrid({
  activeIndustry = "saas",
}: ProductBentoGridProps) {
  return (
    <section className="w-full">
      {/* Bento Sub-headline Header */}
      <div className="mb-8 sm:mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[#D97706]">
          ASYMMETRIC CORE ENGINES
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#18221E] mt-2">
          Four Core Engines Driving Executive Velocity
        </h3>
      </div>

      {/* Staggered 12-Column Asymmetric Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
      >
        {/* ROW 1: Card 1 (7 cols) + Card 2 (5 cols) */}
        <motion.div variants={cardEntranceVariants} className="lg:col-span-7">
          <AutoLayoutDashboardCard activeIndustry={activeIndustry} />
        </motion.div>

        <motion.div variants={cardEntranceVariants} className="lg:col-span-5">
          <ContextualAiBusinessBotCard activeIndustry={activeIndustry} />
        </motion.div>

        {/* ROW 2: Card 3 (5 cols) + Card 4 (7 cols) */}
        <motion.div variants={cardEntranceVariants} className="lg:col-span-5">
          <SmartAnomalyRadarCard activeIndustry={activeIndustry} />
        </motion.div>

        <motion.div variants={cardEntranceVariants} className="lg:col-span-7">
          <ZeroFrictionPipelineCard />
        </motion.div>
      </motion.div>
    </section>
  );
}

