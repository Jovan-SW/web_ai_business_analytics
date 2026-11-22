"use client";

import React from "react";
import { Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#18221E] text-[#F7F5F0] border-t border-[#18221E] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F7F5F0]/10">
          {/* Brand & Creator Bio (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Jovix
              </span>
            </div>
            <p className="text-sm text-[#F7F5F0]/70 max-w-sm leading-relaxed font-normal">
              Continuous decision intelligence for modern business workflows. Connect data sources,
              audit margin leaks, and execute growth strategies with total confidence.
            </p>
            <div className="pt-2">
              <p className="text-xs font-mono text-[#F7F5F0]/50 uppercase tracking-wider">
                Author &amp; Engineering
              </p>
              <p className="text-sm font-semibold text-[#F7F5F0] mt-0.5">
                Jovan Sebastian William
              </p>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Navigation
            </span>
            <nav className="flex flex-col gap-2.5 text-sm text-[#F7F5F0]/75" aria-label="Footer Navigation">
              <a href="#product" className="hover:text-white transition-colors duration-150 w-fit">
                Product
              </a>
              <a href="#solution" className="hover:text-white transition-colors duration-150 w-fit">
                Solution
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors duration-150 w-fit">
                How it Works
              </a>
              <a href="#faq" className="hover:text-white transition-colors duration-150 w-fit">
                FAQ
              </a>
            </nav>
          </div>

          {/* Contact & Social Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Connect
            </span>
            <div className="flex flex-col gap-2.5 text-sm text-[#F7F5F0]/75">
              <a
                href="mailto:jovsebwil723@gmail.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors duration-150 w-fit group"
              >
                <Mail className="w-4 h-4 text-[#D97706] shrink-0" aria-hidden="true" />
                <span>jovsebwil723@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F7F5F0]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/Jovan-SW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors duration-150 w-fit group"
              >
                <svg
                  className="w-4 h-4 text-[#D97706] fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>github.com/Jovan-SW</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F7F5F0]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5F0]/50 font-mono">
          <p>© 2026 Jovix. All rights reserved. Zero Data Retention Architecture.</p>
          <p className="text-[#F7F5F0]/60">
            Crafted by <span className="text-[#F7F5F0]">Jovan Sebastian William</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

