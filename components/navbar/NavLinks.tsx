"use client";

import Link from "next/link";
import { useState } from "react";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  subItems?: { title: string; description: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Product",
    href: "#product",
    badge: "v2.0",
    subItems: [
      {
        title: "AI Business Workflow",
        description: "Automasi alur pipeline analitik bisnis berbasis AI",
        href: "#product-workflow",
      },
      {
        title: "Instant Analytics Engine",
        description: "Ekstrak insight finansial & metrik pasar dalam hitungan detik",
        href: "#product-engine",
      },
      {
        title: "Integration Hub",
        description: "Sambungkan ke data internal, spreadsheet, dan CRM",
        href: "#product-integration",
      },
    ],
  },
  {
    label: "Solution",
    href: "#solution",
    subItems: [
      {
        title: "Eksekutif & Founder",
        description: "Keputusan strategis cepat dengan simulasi forecasting",
        href: "#solution-executive",
      },
      {
        title: "Tim Finansial & Operasional",
        description: "Deteksi anomali anggaran dan optimasi efisiensi modal",
        href: "#solution-finance",
      },
      {
        title: "Bisnis Skala Menengah (SME)",
        description: "Analisis kompetitor otomatis tanpa tim analis besar",
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
      className={`hidden md:flex items-center gap-1 lg:gap-2 ${className}`}
      aria-label="Navigasi Utama"
    >
      {NAV_ITEMS.map((item) => {
        const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
        const isOpen = activeDropdown === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasSubItems && setActiveDropdown(item.label)}
            onMouseLeave={() => hasSubItems && setActiveDropdown(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                isOpen
                  ? "text-[#134E4A] bg-[#EFECE6]/80"
                  : "text-[#18221E]/80 hover:text-[#18221E] hover:bg-[#EFECE6]/60"
              }`}
            >
              <span>{item.label}</span>

              {item.badge && (
                <span className="px-1.5 py-0.2 text-[10px] font-semibold rounded bg-[#D97706]/15 text-[#C2410C]">
                  {item.badge}
                </span>
              )}

              {hasSubItems && (
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-[#18221E]/60 ${
                    isOpen ? "rotate-180 text-[#134E4A]" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>

            {/* Dropdown Menu for complex items like Product & Solution */}
            {hasSubItems && isOpen && (
              <div className="absolute left-0 mt-1 w-80 rounded-2xl bg-[#FFFFFF] p-2.5 shadow-xl ring-1 ring-[#18221E]/10 border border-[#EFECE6] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="space-y-1">
                  {item.subItems?.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="block p-2.5 rounded-xl transition-all duration-150 hover:bg-[#EFECE6]/70 group"
                    >
                      <div className="text-sm font-semibold text-[#18221E] group-hover:text-[#134E4A] flex items-center justify-between">
                        <span>{sub.title}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D97706]">
                          →
                        </span>
                      </div>
                      <p className="text-xs text-[#18221E]/70 line-clamp-2 mt-0.5 leading-relaxed">
                        {sub.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

