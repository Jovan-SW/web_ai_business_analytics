"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductTransformVisual() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"live" | "variance" | "reconciled">("live");

  const handleSimulate = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2200);
  };

  return (
    <div className="w-full">
      {/* Top Interactive Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#18221E]/10">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#D97706]">
            LIVE PIPELINE VISUALIZATION
          </span>
          <p className="text-sm font-semibold text-[#18221E] mt-0.5">
            Instant Ingestion &rarr; Autonomous Variance Audit &rarr; Executive Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSimulate}
            disabled={isProcessing}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isProcessing
                ? "bg-[#D97706] text-white cursor-wait"
                : "bg-[#134E4A] hover:bg-[#0F3F3C] text-white shadow-sm hover:shadow-md active:scale-95"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isProcessing ? "bg-white animate-ping" : "bg-[#D97706]"
              }`}
            />
            <span>{isProcessing ? "Ingesting & Auditing..." : "Simulate Live Run"}</span>
          </button>
        </div>
      </div>

      {/* Main Split-Card Transformation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ========================================================= */}
        {/* SISI KIRI (INPUT): Raw, Messy Excel/CSV Ledger            */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#E5E0D8] shadow-lg overflow-hidden">
          {/* Window Header */}
          <div className="px-4 py-3 bg-[#EFECE6]/60 border-b border-[#E5E0D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
              <span className="ml-2 font-mono text-[11px] font-semibold text-[#18221E]/70 truncate max-w-[180px] sm:max-w-none">
                sales_export_unreconciled_q4.csv
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#FECACA]">
              Unreconciled
            </span>
          </div>

          {/* Raw Spreadsheet Body */}
          <div className="p-4 overflow-x-auto flex-1">
            <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-[#18221E]/60">
              <span>Source: Stripe + NetSuite + QuickBooks</span>
              <span>4,820 Unmatched Entries</span>
            </div>

            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#18221E]/60 bg-[#F7F5F0]/80">
                  <th className="py-2 px-2.5">Date</th>
                  <th className="py-2 px-2.5">Invoice / SKU</th>
                  <th className="py-2 px-2.5">Amount</th>
                  <th className="py-2 px-2.5">Audit Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {/* Row 1: Overcharge */}
                <tr className={isProcessing ? "bg-amber-50/70 transition-colors" : ""}>
                  <td className="py-2 px-2.5 text-[#18221E]/70">2024-11-04</td>
                  <td className="py-2 px-2.5 font-medium text-[#18221E]">
                    INV-88192 <span className="text-[#18221E]/40">(AWS Infra)</span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-[#18221E]">$48,200.00</td>
                  <td className="py-2 px-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#DC2626] bg-[#FEE2E2] px-1.5 py-0.5 rounded">
                      <span>Leak: +$4,280</span>
                    </span>
                  </td>
                </tr>

                {/* Row 2: Schema / Missing SKU */}
                <tr className={isProcessing ? "bg-amber-50/70 transition-colors" : ""}>
                  <td className="py-2 px-2.5 text-[#18221E]/70">11/05/2024</td>
                  <td className="py-2 px-2.5 font-medium text-[#18221E]">
                    Stripe_ch_3M49 <span className="text-[#DC2626]">[NULL_SKU]</span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-[#18221E]">$12,450.00</td>
                  <td className="py-2 px-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                      <span>Schema Conflict</span>
                    </span>
                  </td>
                </tr>

                {/* Row 3: MoM Variance */}
                <tr className={isProcessing ? "bg-amber-50/70 transition-colors" : ""}>
                  <td className="py-2 px-2.5 text-[#18221E]/70">Nov 06, 24</td>
                  <td className="py-2 px-2.5 font-medium text-[#18221E]">
                    PO_Logistics_99 <span className="text-[#18221E]/40">(Freight)</span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-[#18221E]">$29,180.00</td>
                  <td className="py-2 px-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#DC2626] bg-[#FEE2E2] px-1.5 py-0.5 rounded">
                      <span>+38% Variance</span>
                    </span>
                  </td>
                </tr>

                {/* Row 4: Unmatched Ledger */}
                <tr className={isProcessing ? "bg-amber-50/70 transition-colors" : ""}>
                  <td className="py-2 px-2.5 text-[#18221E]/70">2024-11-07</td>
                  <td className="py-2 px-2.5 font-medium text-[#18221E]">
                    INV-88204 <span className="text-[#18221E]/40">(SaaS Renew)</span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-[#18221E]">$64,100.00</td>
                  <td className="py-2 px-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                      <span>Ledger Divergence</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Raw Ledger Bottom Status */}
          <div className="p-3 bg-[#F7F5F0] border-t border-[#E5E0D8] text-[11px] font-mono text-[#18221E]/70 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span>3 Critical Schema Anomalies</span>
            </span>
            <span className="font-semibold text-[#DC2626]">Requires Manual Fix</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TENGAH: Indikator Proses AI (Processing Bridge)            */}
        {/* ========================================================= */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
          <div className="relative flex flex-col items-center gap-2.5 w-full">
            {/* Visual Beam */}
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#18221E]/15 via-[#134E4A] to-[#18221E]/15 -z-0" />

            {/* Central Badge */}
            <div className="relative z-10 p-3 sm:p-4 rounded-2xl bg-[#134E4A] text-white shadow-xl border border-white/20 text-center max-w-[210px] w-full">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D97706]/20 border border-[#D97706]/30 text-[10px] font-mono font-bold text-[#D97706] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
                <span>AI Processing &bull; 1.4s</span>
              </div>

              <h4 className="text-xs font-extrabold tracking-tight text-white uppercase">
                Jovix Synthesis
              </h4>
              <p className="text-[10px] text-white/75 mt-1 leading-tight font-mono">
                Schema Mapping &bull; Heuristic Audit &bull; Zero Leaks
              </p>

              {/* Progress Bar Animation */}
              <div className="w-full bg-white/20 h-1 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="bg-[#D97706] h-full"
                  animate={{
                    width: isProcessing ? ["0%", "100%"] : "100%",
                  }}
                  transition={{
                    duration: isProcessing ? 2.2 : 0.8,
                    ease: "easeInOut",
                    repeat: isProcessing ? Infinity : 0,
                  }}
                />
              </div>
            </div>

            {/* Processing Steps Pill */}
            <div className="flex flex-col gap-1 text-[10px] font-mono text-[#18221E]/70 text-center">
              <span>&check; 4,820 Records Normalized</span>
              <span>&check; $14,280 Leaks Flagged</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SISI KANAN (OUTPUT): Ready-to-Use Executive Dashboard      */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#134E4A]/25 shadow-xl overflow-hidden ring-1 ring-[#134E4A]/10">
          {/* Window Header */}
          <div className="px-4 py-3 bg-[#134E4A] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <span className="ml-2 font-mono text-[11px] font-semibold text-white/90">
                Jovix Executive Dashboard
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded border border-[#10B981]/30">
              Live Synced &bull; 2s ago
            </span>
          </div>

          {/* Clean Dashboard Body */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
            {/* 3 KPI Summary Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* KPI 1 */}
              <div className="p-2.5 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8]">
                <p className="text-[10px] font-mono text-[#18221E]/60 uppercase">Net Revenue</p>
                <p className="text-sm sm:text-base font-extrabold text-[#18221E] mt-0.5">$428,500</p>
                <p className="text-[10px] font-semibold text-[#10B981]">+18.4% MoM</p>
              </div>

              {/* KPI 2 */}
              <div className="p-2.5 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8]">
                <p className="text-[10px] font-mono text-[#18221E]/60 uppercase">Gross Margin</p>
                <p className="text-sm sm:text-base font-extrabold text-[#18221E] mt-0.5">34.8%</p>
                <p className="text-[10px] font-semibold text-[#D97706]">+$14,280 Recov.</p>
              </div>

              {/* KPI 3 */}
              <div className="p-2.5 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8]">
                <p className="text-[10px] font-mono text-[#18221E]/60 uppercase">Cash Runway</p>
                <p className="text-sm sm:text-base font-extrabold text-[#18221E] mt-0.5">19.4 Mos</p>
                <p className="text-[10px] font-semibold text-[#134E4A]">Zero Drift</p>
              </div>
            </div>

            {/* Sparkline / Revenue Trend Chart Visual */}
            <div className="p-3.5 rounded-xl bg-[#F7F5F0]/60 border border-[#E5E0D8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-semibold text-[#18221E]">
                  Reconciled Revenue Trajectory (Q1-Q4)
                </span>
                <span className="text-[10px] font-mono text-[#10B981] font-semibold">
                  Audited Curve
                </span>
              </div>

              {/* SVG Trend Graph */}
              <div className="w-full h-20">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 320 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#134E4A" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#134E4A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#E5E0D8" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="320" y2="50" stroke="#E5E0D8" strokeDasharray="3 3" />
                  {/* Fill Area */}
                  <path
                    d="M0,65 Q50,55 100,58 T200,35 T320,12 L320,80 L0,80 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Main Trend Line */}
                  <path
                    d="M0,65 Q50,55 100,58 T200,35 T320,12"
                    stroke="#134E4A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Current Active Data Point */}
                  <circle cx="320" cy="12" r="4.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* AI Actionable Alert Card */}
            <div className="p-3 rounded-xl bg-[#134E4A]/8 border border-[#134E4A]/20 flex items-start gap-2.5">
              <span className="text-[#D97706] text-sm mt-0.5">&bull;</span>
              <div>
                <p className="text-[11px] font-bold text-[#18221E]">
                  Resolved AWS Invoice Leak: +$4,280
                </p>
                <p className="text-[10px] text-[#18221E]/75 leading-relaxed mt-0.5">
                  Duplicate cloud surcharge in INV-88192 detected. Automatically reconciled into ERP with full audit trail.
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Bottom Status */}
          <div className="p-3 bg-[#134E4A]/5 border-t border-[#134E4A]/15 text-[11px] font-mono text-[#134E4A] flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>100% Ready for Board Review</span>
            </span>
            <span className="font-bold text-[#18221E]">Export to PDF / Sheet &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

