"use client";

import Link from "next/link";
import { useState } from "react";

export interface NavItem {
  label: string;
  href: string;
  subItems?: { title: string; description: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Product",
    href: "#product",
    subItems: [
      {
        title: "Business Workflow",
        description: "Automate end-to-end analytical pipelines with multi-agent orchestration.",
        href: "#product-workflow",
      },
      {
        title: "Instant Analytics Engine",
        description: "Extract actionable financial and market intelligence in sub-seconds.",
        href: "#product-engine",
      },
      {
        title: "Integration Hub",
        description: "Seamlessly synchronize internal databases, spreadsheets, and CRMs.",
        href: "#product-integration",
      },
    ],
  },
  {
    label: "Solution",
    href: "#solution",
    subItems: [
      {
        title: "Founders & Executives",
        description: "High-conviction decision making backed by continuous scenario modeling.",
        href: "#solution-executive",
      },
      {
        title: "Finance & Operations",
        description: "Detect budget anomalies early and optimize capital allocation.",
        href: "#solution-finance",
      },
      {
        title: "Mid-Market Growth",
        description: "Enterprise-grade business intelligence without a large analyst headcount.",
        href: "#solution-sme",
      },
    ],
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = "" }: NavLinksProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav
      className={`hidden md:flex items-center gap-1 ${className}`}
      aria-label="Main Navigation"
    >
      {NAV_ITEMS.map((item) => {
        const hasSub = Boolean(item.subItems && item.subItems.length > 0);
        const isOpen = activeDropdown === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasSub && setActiveDropdown(item.label)}
            onMouseLeave={() => hasSub && setActiveDropdown(null)}
          >
            <Link
              href={item.href}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] ${
                isOpen
                  ? "text-[#18221E] bg-[#EFECE6]/70"
                  : "text-[#18221E]/75 hover:text-[#18221E] hover:bg-[#EFECE6]/50"
              }`}
            >
              <span>{item.label}</span>

              {hasSub && (
                <svg
                  className={`w-3.5 h-3.5 text-[#18221E]/50 transition-transform duration-150 ${
                    isOpen ? "rotate-180 text-[#18221E]" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Link>

            {/* Dropdown Panel */}
            {hasSub && isOpen && (
              <div
                className="absolute left-0 top-full pt-1.5 w-84 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                role="region"
                aria-label={`Submenu ${item.label}`}
              >
                <div className="bg-[#FFFFFF] rounded-xl border border-[#EFECE6] p-2 shadow-[0_10px_30px_rgba(24,34,30,0.08)]">
                  <div className="space-y-0.5">
                    {item.subItems?.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="group flex flex-col p-2.5 rounded-lg transition-colors duration-150 hover:bg-[#F7F5F0]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-semibold text-[#18221E] group-hover:text-[#134E4A] transition-colors">
                            {sub.title}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-xs text-[#D97706] opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                          >
                            →
                          </span>
                        </div>
                        <p className="text-[12px] text-[#18221E]/65 leading-relaxed mt-0.5">
                          {sub.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
