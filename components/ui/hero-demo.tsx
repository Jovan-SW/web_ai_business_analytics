"use client";

import React from "react";
import { HeroSection } from "@/components/ui/hero-section-2";

export default function HeroSectionDemo() {
  return (
    <div className="w-full">
      <HeroSection
        title="Turn Complex Business Data into"
        rotatingWords={[
          "High-Conviction Decisions",
          "Predictable Profit Margins",
          "Actionable Growth Strategies",
          "Immediate Cost Reductions",
        ]}
        subtitle="Connect your financial data, ERP systems, and daily operational spreadsheets into a single unified workflow. Automatically surface hidden cost leaks, audit margin health across departments, and receive prioritized executive recommendations to scale your profitability with total confidence."
        callToAction={{
          text: "Start Free Analysis",
          href: "#register",
        }}
        secondaryCallToAction={{
          text: "Explore Live Demo",
          href: "#demo",
        }}
        backgroundImage="https://images.unsplash.com/photo-1655841603567-72ca4d864457?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        contactInfo={{
          website: "jovix.io",
          phone: "+1 (800) 582-8499",
          address: "San Francisco & Global Cloud",
        }}
      />
    </div>
  );
}
