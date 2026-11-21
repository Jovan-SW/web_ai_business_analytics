"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NavbarLogo } from "./NavbarLogo";
import { NavLinks } from "./NavLinks";
import { NavAuthActions } from "./NavAuthActions";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "bg-[#F7F5F0]/85 backdrop-blur-md border-b border-[#18221E]/10 shadow-[0_4px_24px_-4px_rgba(24,34,30,0.06)]"
            : "bg-[#F7F5F0] border-b border-[#18221E]/5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isScrolled ? "h-14 sm:h-15" : "h-16 sm:h-18"
            )}
          >
            {/* Left Edge: Pure Typographic Wordmark */}
            <div className="flex-shrink-0 flex items-center transition-transform duration-300">
              <NavbarLogo />
            </div>

            {/* Center: Quiet, Disciplined Nav Links */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <NavLinks />
            </div>

            {/* Right Edge: Auth Actions (Desktop) */}
            <div className="hidden md:flex items-center">
              <NavAuthActions />
            </div>

            {/* Mobile / Tablet Controls (under 768px): Primary CTA + Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {/* Keep primary button accessible on tablet / small screens */}
              <Link
                href="#register"
                className="inline-flex items-center justify-center px-3 py-1.5 text-[13px] font-medium text-white bg-[#134E4A] hover:bg-[#0F3F3C] active:scale-[0.98] rounded-md transition-all duration-150"
              >
                Get started
              </Link>

              {/* 40x40 Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="w-10 h-10 flex items-center justify-center rounded-md border border-[#EFECE6] bg-[#FFFFFF] text-[#18221E] hover:bg-[#EFECE6]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A]"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 7.5h16.5M3.75 16.5h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
