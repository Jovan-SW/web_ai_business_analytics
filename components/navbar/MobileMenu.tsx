"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", href);
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[#18221E]/20 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#F7F5F0] border-b border-[#18221E]/10 p-5 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="divide-y divide-[#EFECE6]">
          {NAV_ITEMS.map((item) => {
            const hasSub = Boolean(item.subItems && item.subItems.length > 0);
            const isExpanded = expandedSection === item.label;

            return (
              <div key={item.label} className="py-2.5">
                {hasSub ? (
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSection(isExpanded ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-1.5 text-[15px] font-medium text-[#18221E] hover:text-[#134E4A] transition-colors"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 text-[#18221E]/50 transition-transform duration-150 ${
                          isExpanded ? "rotate-180 text-[#134E4A]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="mt-2 pl-3 border-l-2 border-[#134E4A]/30 space-y-2 py-1">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="block py-1 hover:text-[#134E4A]"
                          >
                            <p className="text-[14px] font-medium text-[#18221E]">
                              {sub.title}
                            </p>
                            <p className="text-[12px] text-[#18221E]/60 leading-snug">
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
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between py-1.5 text-[15px] font-medium text-[#18221E] hover:text-[#134E4A] transition-colors"
                  >
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Action Rows */}
        <div className="mt-6 pt-4 border-t border-[#EFECE6] flex flex-col gap-2.5">
          <Link
            href="#login"
            onClick={onClose}
            className="w-full py-2.5 text-center text-[14px] font-medium text-[#18221E] rounded-md border border-[#EFECE6] bg-[#FFFFFF] hover:bg-[#EFECE6]/50 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="#register"
            onClick={onClose}
            className="w-full py-2.5 text-center text-[14px] font-medium text-white rounded-md bg-[#134E4A] hover:bg-[#0F3F3C] transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
