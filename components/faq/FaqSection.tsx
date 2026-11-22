"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "./faq-data";
import { FaqAccordionItem } from "./FaqAccordionItem";

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(["faq-data-retention"]));

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      data-section="faq"
      aria-labelledby="faq-heading"
      className="relative w-full py-16 sm:py-24 bg-[#F7F5F0] text-[#18221E] border-b border-[#18221E]/10 scroll-mt-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            1. SECTION HEADER (FAQ ONLY)
            =================================================================== */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#18221E]"
          >
            FAQ
          </h2>
        </div>

        {/* ===================================================================
            2. ACCORDION LIST (5 CLEAN QUESTIONS & SIMPLE ANSWERS)
            =================================================================== */}
        <div className="bg-white rounded-2xl border border-[#18221E]/10 overflow-hidden shadow-xs divide-y divide-[#18221E]/10">
          {FAQ_ITEMS.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={openIds.has(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
