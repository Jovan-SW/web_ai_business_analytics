"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem } from "./faq-data";

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqAccordionItem({ item, isOpen, onToggle }: FaqAccordionItemProps) {
  const panelId = `faq-panel-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <div
      className={`transition-colors duration-200 border-b border-[#18221E]/10 last:border-b-0 ${
        isOpen ? "bg-white/60" : "hover:bg-white/40"
      }`}
    >
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full text-left py-5 sm:py-6 px-4 sm:px-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] select-none group"
      >
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
          {/* Numerical Index */}
          <span className="font-mono text-xs sm:text-sm font-bold text-[#D97706] tracking-wider shrink-0 pt-0.5 sm:pt-0">
            {item.index}
          </span>

          {/* Question Text */}
          <h3
            className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-150 leading-snug ${
              isOpen ? "text-[#134E4A]" : "text-[#18221E] group-hover:text-[#134E4A]"
            }`}
          >
            {item.question}
          </h3>
        </div>

        {/* Minimal Plus/Close Toggle Icon */}
        <div className="shrink-0 text-[#18221E]/60 group-hover:text-[#134E4A] transition-colors p-1">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Plus className="w-5 h-5 stroke-[2.25]" aria-hidden="true" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content with Clean Simple Text */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1 px-4 sm:px-6 pl-10 sm:pl-14">
              <p className="text-sm sm:text-base text-[#18221E]/80 leading-relaxed font-normal">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
