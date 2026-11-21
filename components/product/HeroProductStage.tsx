"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  PRODUCT_INDUSTRIES,
  type IndustryKey,
  type IndustryData,
} from "./product-data";
import {
  AnimatedCounter,
  BorderBeam,
  ScanlineEffect,
  EASE_TASTE,
} from "./motion-primitives";

interface HeroProductStageProps {
  activeIndustry?: IndustryKey;
  onIndustryChange?: (key: IndustryKey) => void;
}

export function HeroProductStage({
  activeIndustry: controlledIndustry,
  onIndustryChange,
}: HeroProductStageProps) {
  // 1. Industry State Management
  const [internalIndustry, setInternalIndustry] = useState<IndustryKey>("saas");
  const activeKey = controlledIndustry || internalIndustry;
  const currentData: IndustryData = PRODUCT_INDUSTRIES[activeKey] || PRODUCT_INDUSTRIES.saas;

  // Flash state when industry changes
  const [isReindexing, setIsReindexing] = useState(false);
  useEffect(() => {
    setIsReindexing(true);
    const timer = setTimeout(() => setIsReindexing(false), 380);
    return () => clearTimeout(timer);
  }, [activeKey]);

  const handleSelectIndustry = (key: IndustryKey) => {
    if (onIndustryChange) {
      onIndustryChange(key);
    } else {
      setInternalIndustry(key);
    }
  };

  // 2. Scroll-Scrubbed 3D Unfold (Hero Transition Motion)
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 92%", "center 55%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.6,
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [11, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.94, 1]);
  const y = useTransform(smoothProgress, [0, 1], [42, 0]);
  const opacity = useTransform(smoothProgress, [0, 1], [0.45, 1]);

  // Scroll-linked chart rise animation (dynamically lifts and curves from bottom to top on scroll)
  const chartScaleY = useTransform(smoothProgress, [0.08, 0.88], [0.02, 1]);
  const chartY = useTransform(smoothProgress, [0.08, 0.88], [60, 0]);
  const chartOpacity = useTransform(smoothProgress, [0.05, 0.45], [0.1, 1]);
  const chartPathLength = useTransform(smoothProgress, [0.12, 0.88], [0, 1]);
  const chartAreaOpacity = useTransform(smoothProgress, [0.25, 0.88], [0, 1]);

  // 3. Interactive Chart Scrubbing State
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  // SVG Chart Geometry Computation
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 35;

  const chartData = currentData.chartPoints;
  const minVal = Math.min(...chartData.map((p) => p.value)) * 0.85;
  const maxVal = Math.max(...chartData.map((p) => p.value)) * 1.08;

  const points = chartData.map((p, idx) => {
    const x =
      paddingX +
      (idx / (chartData.length - 1)) * (svgWidth - paddingX * 2);
    const normalizedY = (p.value - minVal) / (maxVal - minVal);
    const y = svgHeight - paddingY - normalizedY * (svgHeight - paddingY * 2);
    return { ...p, x, y };
  });

  // Calculate smooth cubic bezier path
  const splinePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${point.x},${point.y}`;
  }, "");

  const areaPath = `${splinePath} L ${points[points.length - 1].x},${svgHeight} L ${points[0].x},${svgHeight} Z`;

  const activeHoverPoint =
    hoveredPointIndex !== null ? points[hoveredPointIndex] : null;
  const peakPoint = points[currentData.peakIndex] || points[points.length - 1];

  return (
    <div
      ref={stageRef}
      className="relative w-full [perspective:1400px] py-4 sm:py-6"
    >
      {/* Industry Selector Controls (Responsive Grid, Never Clipped on Mobile) */}
      <div className="w-full max-w-xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md">
          {(["saas", "retail", "logistics"] as IndustryKey[]).map((key) => {
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectIndustry(key)}
                className={`w-full py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#134E4A] text-white shadow-md font-bold border border-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04] font-medium border border-transparent"
                }`}
              >
                <span className="block text-[10.5px] sm:text-xs tracking-tight font-semibold truncate">
                  {key === "saas"
                    ? "SaaS Subscription"
                    : key === "retail"
                    ? "E-Commerce"
                    : "B2B Logistics"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Scroll-Scrubbed Unfold Mock Application Frame */}
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-2xl bg-[#0C0C0F] border border-white/[0.08] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* 1. Animated Outer Border Beam (21st.dev signature) */}
        <BorderBeam size={220} duration={10} colorFrom="#D97706" colorTo="#134E4A" />

        {/* 2. Minimal App Chrome Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-white/[0.02] border-b border-white/[0.07] flex items-center justify-between">
          {/* Left: Window Dots & Breadcrumb */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="text-[#134E4A]/40 font-mono text-xs">|</span>
            <span className="font-mono text-xs text-white/60 truncate max-w-[180px] sm:max-w-none">
              {currentData.workspaceName}
            </span>
          </div>

          {/* Right: Plain Minimal Label (Zero Bubbles) */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-white/40">
              Jovix Intelligence Core
            </span>
          </div>
        </div>

        {/* 3. Split Interior Grid: 12-Col Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* ======================================================= */}
          {/* LEFT PANEL (4-Col Desktop): Raw Ingestion Stream        */}
          {/* ======================================================= */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between relative bg-black/30 overflow-hidden">
            {/* Slow AI Scanline Sweeping Effect */}
            <ScanlineEffect color="#D97706" duration={4.2} />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    Raw Ingestion Stream
                  </h4>
                  <p className="text-[11px] font-mono text-white/40 mt-0.5">
                    Unstructured Multi-Source Transactions
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/20">
                  Live Buffer
                </span>
              </div>

              {/* Monospace 5-Row Raw Ledger Table */}
              <div className="space-y-2 mt-4">
                {currentData.rawRows.map((row) => (
                  <div
                    key={row.id}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-colors flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white/90">
                          {row.id}
                        </span>
                        <span className="text-[10px] text-white/40">
                          {row.date}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/55 truncate max-w-[150px] sm:max-w-[190px] mt-0.5">
                        {row.source}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-white tracking-tight">
                        {row.amount}
                      </p>
                      <span
                        className={`inline-block text-[10px] font-medium mt-0.5 ${
                          row.flagType === "error"
                            ? "text-rose-400"
                            : row.flagType === "warning"
                            ? "text-amber-400"
                            : "text-white/50"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT PANEL (8-Col Desktop): Auto-Generated Dashboard   */}
          {/* ======================================================= */}
          <div
            key={activeKey}
            className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-between bg-black/10"
          >
            {/* Top Row: 3 Crisp KPI Mini-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
              {currentData.kpis.map((kpi, idx) => (
                <motion.div
                  key={`${activeKey}-${kpi.label}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + idx * 0.07,
                    ease: EASE_TASTE,
                  }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider truncate">
                      {kpi.label}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        kpi.isPositive
                          ? "text-[#10B981] bg-[#10B981]/15"
                          : "text-rose-400 bg-rose-400/15"
                      }`}
                    >
                      {kpi.delta}
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    <AnimatedCounter
                      value={kpi.value}
                      prefix={kpi.prefix}
                      suffix={kpi.suffix}
                      decimals={kpi.suffix?.includes("%") || kpi.value % 1 !== 0 ? 1 : 0}
                    />
                  </p>
                  <p className="text-[10px] font-mono text-white/40 mt-1">
                    {kpi.sublabel}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Main Interactive Chart Canvas: Custom SVG Cubic Spline Area Chart */}
            <div className="relative p-4 sm:p-5 rounded-xl bg-white/[0.015] border border-white/[0.06] overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Audited Revenue Curve
                  </h4>
                  <p className="text-[11px] font-mono text-white/40">
                    Hover across columns to inspect exact values
                  </p>
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#10B981] tracking-wider uppercase">
                  Continuous Projection
                </span>
              </div>

              {/* Chart SVG */}
              <div className="relative w-full h-56 sm:h-64 mt-2">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#134E4A" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#134E4A" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#134E4A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Subtle Dashed Gridlines */}
                  <line
                    x1={paddingX}
                    y1={svgHeight * 0.25}
                    x2={svgWidth - paddingX}
                    y2={svgHeight * 0.25}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={paddingX}
                    y1={svgHeight * 0.55}
                    x2={svgWidth - paddingX}
                    y2={svgHeight * 0.55}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={paddingX}
                    y1={svgHeight * 0.85}
                    x2={svgWidth - paddingX}
                    y2={svgHeight * 0.85}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />

                  {/* Scroll-Driven & Industry-Transitioned Rising Chart Group */}
                  <motion.g
                    key={activeKey}
                    style={{
                      scaleY: chartScaleY,
                      y: chartY,
                      transformOrigin: "300px 185px",
                      transformBox: "view-box",
                      opacity: chartOpacity,
                    }}
                  >
                    {/* Area Gradient Fill */}
                    <motion.path
                      d={areaPath}
                      fill="url(#splineGradient)"
                      style={{ opacity: chartAreaOpacity }}
                    />

                    {/* SVG Spline Path (Animated Draw Left-to-Right + Scroll Rise) */}
                    <motion.path
                      d={splinePath}
                      fill="none"
                      stroke="#134E4A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ pathLength: chartPathLength }}
                    />

                    {/* Secondary Glow Stroke */}
                    <motion.path
                      d={splinePath}
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      style={{ pathLength: chartPathLength }}
                    />

                    {/* Vertical Hairline Crosshair when Hovered */}
                    {activeHoverPoint && (
                      <line
                        x1={activeHoverPoint.x}
                        y1={paddingY}
                        x2={activeHoverPoint.x}
                        y2={svgHeight - paddingY}
                        stroke="rgba(217, 119, 6, 0.65)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    )}

                    {/* Interactive Points on Spline */}
                    {points.map((p, i) => {
                      const isHovered = hoveredPointIndex === i;
                      const isPeak = i === currentData.peakIndex;

                      return (
                        <g key={p.label}>
                          {/* Hover Capture Invisible Target Bar */}
                          <rect
                            x={p.x - 25}
                            y={0}
                            width={50}
                            height={svgHeight}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredPointIndex(i)}
                            onMouseLeave={() => setHoveredPointIndex(null)}
                            onTouchStart={() => setHoveredPointIndex(i)}
                          />

                          {/* Interactive Double-Ring Active Dot */}
                          {isHovered && (
                            <g>
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="8"
                                fill="#D97706"
                                fillOpacity="0.25"
                              />
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="4.5"
                                fill="#D97706"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                              />
                            </g>
                          )}

                          {/* Peak Point Static Highlight (When Not Hovered) */}
                          {!isHovered && isPeak && (
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="4"
                              fill="#D97706"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                            />
                          )}
                        </g>
                      );
                    })}

                    {/* Default Peak Insight Label (No clipping, green box removed) */}
                    {hoveredPointIndex === null && (
                      <g
                        transform={`translate(${peakPoint.x - 8}, ${Math.max(peakPoint.y - 12, 16)})`}
                      >
                        <text
                          x="0"
                          y="0"
                          textAnchor="end"
                          dominantBaseline="auto"
                          fill="#D97706"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="700"
                          letterSpacing="0.02em"
                        >
                          {currentData.peakLabel}
                        </text>
                      </g>
                    )}
                  </motion.g>
                </svg>

                {/* Floating Glassmorphic Tooltip on Hover (Smart Clamping: never cut off at peaks or edges) */}
                {activeHoverPoint && (() => {
                  const isNearTop = (activeHoverPoint.y / svgHeight) < 0.44;
                  const isNearRight = (activeHoverPoint.x / svgWidth) > 0.82;
                  const isNearLeft = (activeHoverPoint.x / svgWidth) < 0.18;

                  const transformX = isNearRight ? "-95%" : isNearLeft ? "-5%" : "-50%";
                  const transformY = isNearTop ? "18px" : "-125%";

                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.12 }}
                      className="absolute pointer-events-none px-3 py-1.5 rounded-lg bg-[#18221E]/95 border border-white/20 shadow-2xl backdrop-blur-md text-center z-30"
                      style={{
                        left: `${((activeHoverPoint.x / svgWidth) * 100).toFixed(2)}%`,
                        top: `${((activeHoverPoint.y / svgHeight) * 100).toFixed(2)}%`,
                        transform: `translate(${transformX}, ${transformY})`,
                      }}
                    >
                      <p className="text-[10px] font-mono text-white/60">
                        {activeHoverPoint.label}
                      </p>
                      <p className="text-xs font-bold text-[#D97706] tracking-tight whitespace-nowrap">
                        {activeHoverPoint.formatted}
                      </p>
                    </motion.div>
                  );
                })()}
              </div>

              {/* X-Axis Month Labels */}
              <div className="flex items-center justify-between px-3 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-white/40">
                {chartData.map((pt) => (
                  <span key={pt.label}>{pt.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

