"use client";

import { useState, useEffect } from "react";
import { NavbarLogo } from "./NavbarLogo";
import { NavLinks } from "./NavLinks";
import { NavAuthActions } from "./NavAuthActions";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-[#F7F5F0]/90 backdrop-blur-md shadow-sm border-b border-[#18221E]/10"
            : "bg-[#F7F5F0] border-b border-[#18221E]/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <NavbarLogo />
            </div>

            {/* Middle: Navigation Links */}
            <NavLinks />

            {/* Right: Auth Actions (Desktop) */}
            <div className="hidden md:flex items-center">
              <NavAuthActions />
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
                className="p-2 rounded-xl text-[#18221E] hover:bg-[#EFECE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] transition-colors"
              >
                {mobileMenuOpen ? (
                  // Close Icon (X)
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger Icon
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Dropdown */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

