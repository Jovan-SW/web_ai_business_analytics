"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "./NavLinks";
import { NavAuthActions } from "./NavAuthActions";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#18221E]/30 backdrop-blur-sm z-40 animate-in fade-in duration-200">
      <div className="mx-4 mt-2 max-h-[calc(100vh-85px)] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#EFECE6] p-5 shadow-2xl">
        {/* Mobile Navigation Links */}
        <div className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const hasSub = Boolean(item.subItems && item.subItems.length > 0);
            const isExpanded = expandedSection === item.label;

            return (
              <div key={item.label} className="border-b border-[#EFECE6]/60 pb-2">
                {hasSub ? (
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(isExpanded ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-2 text-base font-semibold text-[#18221E] hover:text-[#134E4A] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-[#D97706]/15 text-[#C2410C]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 text-[#18221E]/60 transition-transform ${
                          isExpanded ? "rotate-180 text-[#134E4A]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Submenu accordion */}
                    {isExpanded && (
                      <div className="mt-1 ml-2 pl-3 border-l-2 border-[#134E4A]/20 space-y-2 py-1">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={onClose}
                            className="block py-1.5 hover:text-[#134E4A]"
                          >
                            <p className="text-sm font-medium text-[#18221E]">{sub.title}</p>
                            <p className="text-xs text-[#18221E]/60 leading-snug">
                              {sub.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2 text-base font-semibold text-[#18221E] hover:text-[#134E4A] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#134E4A]">→</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Auth CTAs */}
        <div className="mt-6 pt-4 border-t border-[#EFECE6] flex flex-col gap-3">
          <NavAuthActions
            className="flex-col !gap-2.5 w-full [&>a]:w-full [&>a]:text-center"
            onActionClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

