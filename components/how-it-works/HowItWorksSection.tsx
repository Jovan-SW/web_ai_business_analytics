"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import {
  FeatureUIRow,
  ChecklistVisual,
  TimelineVisual,
  DashboardVisual,
  CopilotVisual,
} from "@/components/ui/feature-ui-row";

export function HowItWorksSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        data-section="how-it-works"
        className="relative w-full pt-14 sm:pt-20 pb-20 sm:pb-28 lg:pb-32 bg-[#F7F5F0] text-[#18221E] border-b border-[#18221E]/10 scroll-mt-20 overflow-hidden"
      >
        {/* Subtle Atmospheric Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#18221E_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===================================================================
              1. SECTION HEADER
              =================================================================== */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#D97706] block mb-3">
              HOW IT WORKS
            </span>
            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#18221E] leading-[1.16]"
            >
              From Raw Data Chaos to Boardroom Clarity in Four Steps
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#18221E]/75 leading-relaxed font-normal">
              No fragile ETL pipelines and zero manual formula wrangling.
              Activate live multi-source intelligence in under two minutes.
            </p>
          </div>

          {/* ===================================================================
              2. FOUR STEP FEATURE ROWS WITH ANIMATED ODOMETER & VISUALS
              =================================================================== */}
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
            {/* Step 1: Sign in & Secure Workspace */}
            <FeatureUIRow
              eyebrow="STEP 01 // AUTHENTICATION"
              title="Sign In with Enterprise Confidence"
              body="Authenticate in seconds via Google Workspace or enterprise SAML SSO. Bank-grade 256-bit AES encryption shields your financial records from day zero with strict zero-retention policies."
              tone="spruce"
              visual={
                <ChecklistVisual
                  title="Tenant Security Verification"
                  rows={[
                    { label: "Google / SAML SSO", value: "Verified" },
                    { label: "Zero Data Retention", value: "Active" },
                    { label: "Isolated Database Vault", value: "Encrypted" },
                    { label: "Immutable Audit Logs", value: "Compliant" },
                  ]}
                  stat={{
                    value: 100,
                    suffix: "%",
                    label: "Tenant Isolation Compliance",
                  }}
                  badgeTone="spruce"
                />
              }
            />

            {/* Step 2: Create Workspace & Ingest Data */}
            <FeatureUIRow
              reverse
              tone="charcoal"
              eyebrow="STEP 02 // DATA INGESTION"
              title="Create Workspace & Connect Data Sources"
              body="Set up your company workspace and link Stripe, QuickBooks, NetSuite, or upload raw CSV ledgers. Jovix normalizes chaotic column headers and transaction schemas in sub-seconds with zero brittle ETL pipelines."
              visual={
                <TimelineVisual
                  title="Multi-Channel Ingestion Pipeline"
                  stages={[
                    { label: "Stripe & POS", count: 2 },
                    { label: "QuickBooks & ERP", count: 2 },
                    { label: "Raw CSV Ledgers", count: 1 },
                  ]}
                  total={5}
                  note="50+ live connectors unified into a normalized ledger in < 1.8s"
                />
              }
            />

            {/* Step 3: Auto-Generate AI Dashboard */}
            <FeatureUIRow
              eyebrow="STEP 03 // AUTOMATED SYNTHESIS"
              title="Auto-Generate Executive AI Dashboards"
              body="Watch raw transaction logs transform into real-time KPI cards, net margin trajectory curves, and automated cost variance flags without writing a single spreadsheet formula."
              tone="spruce"
              visual={
                <DashboardVisual
                  marginYield="42.8%"
                  reconciledNet="$184,200"
                  precisionStat={{
                    value: 99,
                    suffix: ".4%",
                    label: "Financial Formula Precision",
                  }}
                />
              }
            />

            {/* Step 4: Interrogate with AI Copilot */}
            <FeatureUIRow
              reverse
              tone="charcoal"
              eyebrow="STEP 04 // CONVERSATIONAL INTELLIGENCE"
              title="Ask Complex 'Why' Questions in Plain English"
              body="Converse directly with your conversational business assistant. Discover the exact root cause behind margin fluctuations, forecast cash burn runway under new hiring scenarios, and receive prioritized execution roadmaps."
              visual={
                <CopilotVisual
                  question="Why did net profit margin dip 3.8% this week despite record sales volume?"
                  answer="Top-line revenue climbed +14%, but promotional discount code 'OCTOBER-BOOST' overlapped with duplicate cloud vendor invoices ($4,200), compressing gross margin."
                  actionTag="1-Click Deprecate Expired Promo"
                />
              }
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
