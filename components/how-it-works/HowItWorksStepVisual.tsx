"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  FileSpreadsheet,
  Database,
  ArrowRight,
  Sparkles,
  Send,
  Zap,
} from "lucide-react";

interface StepVisualProps {
  activeStepId: string;
}

export function HowItWorksStepVisual({ activeStepId }: StepVisualProps) {
  // Step 4 interactive prompt state
  const [selectedPrompt, setSelectedPrompt] = useState<string>(
    "Why did net profit margin dip 3.8% this week despite record volume?"
  );

  return (
    <div className="relative w-full min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-3 sm:p-6 bg-white rounded-3xl border border-[#18221E]/10 shadow-sm overflow-hidden">
      {/* Background Accent Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#18221E_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-[0.03]"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {/* ===================================================================
            STEP 1 VISUAL: AUTHENTICATION & SECURITY SHIELD
            =================================================================== */}
        {activeStepId === "step-login" && (
          <motion.div
            key="step-login"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-4"
          >
            {/* Security Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-[#18221E]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#134E4A]/10 text-[#134E4A] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#18221E]">
                    Enterprise Authentication
                  </h4>
                  <p className="text-[11px] font-mono text-[#18221E]/60">
                    256-bit AES-GCM Encrypted
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                SOC2 Type II
              </span>
            </div>

            {/* Auth Action Preview */}
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-xl border border-[#18221E]/12 bg-[#F7F5F0] hover:bg-[#F3EFE6] transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-white border border-[#18221E]/10 flex items-center justify-center text-xs font-bold text-[#18221E]">
                    G
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#18221E]">
                    Continue with Google Workspace
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  1-Click
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[#18221E]/12 bg-[#F7F5F0] hover:bg-[#F3EFE6] transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#134E4A] text-white flex items-center justify-center text-xs font-bold">
                    SSO
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#18221E]">
                    Corporate SAML / Okta SSO
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase font-semibold text-[#18221E]/60">
                  Ready
                </span>
              </div>
            </div>

            {/* Verified Session Card */}
            <div className="p-4 rounded-xl bg-[#134E4A] text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-100 font-mono">
                  SESSION INTEGRITY
                </span>
                <span className="text-[#D97706] font-bold font-mono">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                Zero data retention policy enabled. Financial records remain
                strictly isolated within your company tenant.
              </p>
            </div>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 2 VISUAL: WORKSPACE & MULTI-SOURCE INGESTION
            =================================================================== */}
        {activeStepId === "step-workspace" && (
          <motion.div
            key="step-workspace"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-3.5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#18221E]/10">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#D97706] block">
                  WORKSPACE SETUP
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#18221E]">
                  Acme Growth Holdings Inc.
                </h4>
              </div>
              <span className="text-xs font-mono text-[#18221E]/60 bg-[#F7F5F0] px-2.5 py-1 rounded-md border border-[#18221E]/10">
                ws_live_942
              </span>
            </div>

            {/* Connected Data Sources List */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-emerald-700" />
                  <div>
                    <p className="font-bold text-[#18221E]">
                      Stripe Omnichannel Payouts
                    </p>
                    <p className="text-[11px] text-[#18221E]/70 font-mono">
                      12,450 transactions synced
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <div>
                    <p className="font-bold text-[#18221E]">
                      QuickBooks Chart of Accounts
                    </p>
                    <p className="text-[11px] text-[#18221E]/70 font-mono">
                      2 core ledgers linked
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-3 rounded-xl border border-[#18221E]/10 bg-[#F7F5F0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-[#134E4A]" />
                  <div>
                    <p className="font-bold text-[#18221E]">
                      Q3_Sales_Reconciliation.csv
                    </p>
                    <p className="text-[11px] text-[#18221E]/70 font-mono">
                      1,840 rows normalized
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#134E4A] bg-[#134E4A]/10 px-2 py-0.5 rounded">
                  Uploaded
                </span>
              </div>
            </div>

            {/* Schema Normalization Banner */}
            <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#18221E]/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#18221E]/70">Auto-Schema Match:</span>
              <span className="font-bold text-[#134E4A]">100% Complete</span>
            </div>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 3 VISUAL: SYNTHESIZED AI DASHBOARD
            =================================================================== */}
        {activeStepId === "step-dashboard" && (
          <motion.div
            key="step-dashboard"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-3.5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#18221E]/10">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D97706]" />
                <h4 className="text-sm font-bold text-[#18221E]">
                  Synthesized Executive Health
                </h4>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                Real-Time
              </span>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#18221E]/10">
                <span className="text-[10px] font-mono uppercase text-[#18221E]/60 block mb-1">
                  Gross Margin
                </span>
                <p className="text-lg sm:text-xl font-extrabold text-[#18221E] tabular-nums">
                  42.8%
                </p>
                <span className="text-[10px] font-bold text-emerald-700">
                  +4.2% yield
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#18221E]/10">
                <span className="text-[10px] font-mono uppercase text-[#18221E]/60 block mb-1">
                  Net Reconciled
                </span>
                <p className="text-lg sm:text-xl font-extrabold text-[#18221E] tabular-nums">
                  $184,200
                </p>
                <span className="text-[10px] font-bold text-[#134E4A]">
                  99.4% precision
                </span>
              </div>
            </div>

            {/* Sparkline Visual Simulation */}
            <div className="p-3.5 rounded-xl bg-[#134E4A] text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-100 font-mono">
                  PROFIT RUNWAY VELOCITY
                </span>
                <span className="text-[#D97706] font-mono font-bold">
                  OPTIMAL
                </span>
              </div>
              {/* SVG Trend Wave */}
              <div className="h-14 w-full flex items-end">
                <svg
                  className="w-full h-full text-emerald-300"
                  viewBox="0 0 200 40"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 32 Q 35 15, 70 25 T 140 10 T 200 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M0 32 Q 35 15, 70 25 T 140 10 T 200 6 L 200 40 L 0 40 Z"
                    fill="rgba(52, 211, 153, 0.12)"
                  />
                </svg>
              </div>
            </div>

            {/* Auto Diagnosis Banner */}
            <div className="p-2.5 rounded-xl bg-[#F7F5F0] border border-[#18221E]/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#18221E]/70">Variance Audit:</span>
              <span className="font-bold text-emerald-700">
                0 Unmatched Records
              </span>
            </div>
          </motion.div>
        )}

        {/* ===================================================================
            STEP 4 VISUAL: CONVERSATIONAL AI COPILOT INTERACTION
            =================================================================== */}
        {activeStepId === "step-copilot" && (
          <motion.div
            key="step-copilot"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md space-y-3"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[#18221E]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <h4 className="text-sm font-bold text-[#18221E]">
                  Jovix Business Copilot
                </h4>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#134E4A] bg-[#134E4A]/10 px-2 py-0.5 rounded">
                Live Interrogation
              </span>
            </div>

            {/* Conversational Dialog */}
            <div className="space-y-2.5 text-xs">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="max-w-[85%] p-3 rounded-2xl rounded-tr-xs bg-[#18221E] text-white">
                  <p className="font-medium leading-relaxed">
                    &quot;{selectedPrompt}&quot;
                  </p>
                </div>
              </div>

              {/* Bot Answer */}
              <div className="flex justify-start">
                <div className="max-w-[90%] p-3.5 rounded-2xl rounded-tl-xs bg-[#134E4A] text-white space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>AI DIAGNOSTIC ROOT CAUSE</span>
                  </div>
                  <p className="text-xs text-emerald-50 leading-relaxed font-normal">
                    Sales rose +14%, but promo code &apos;OCTOBER-BOOST&apos;
                    compounded with duplicate vendor charges ($4,200),
                    compressing margin.
                  </p>
                  <div className="pt-1.5 border-t border-emerald-400/20">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D97706] hover:underline cursor-pointer">
                      <span>Execute 1-click deprecation</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Sample Query Pill Selector */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {[
                "Why did net profit dip 3.8% this week?",
                "What is our cash runway if marketing doubles?",
              ].map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setSelectedPrompt(query)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors text-left ${
                    selectedPrompt === query
                      ? "bg-[#18221E] text-white border-[#18221E]"
                      : "bg-[#F7F5F0] text-[#18221E]/75 border-[#18221E]/12 hover:border-[#18221E]/30"
                  }`}
                >
                  {query}
                </button>
              ))}
            </div>

            {/* Input Bar Mockup */}
            <div className="relative pt-1">
              <input
                type="text"
                readOnly
                value="Ask anything about profit leaks, runways, or margins..."
                className="w-full px-3.5 py-2.5 pr-10 text-xs rounded-xl bg-[#F7F5F0] border border-[#18221E]/12 text-[#18221E]/50 focus:outline-none cursor-default"
              />
              <button
                type="button"
                className="absolute right-1.5 top-2.5 p-1.5 rounded-lg bg-[#134E4A] text-white hover:bg-[#134E4A]/90 transition-colors"
                aria-label="Send query"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

