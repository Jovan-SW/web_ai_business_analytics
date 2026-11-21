import Link from "next/link";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className = "" }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0] rounded-sm transition-opacity duration-150 select-none ${className}`}
      aria-label="Jovix AI"
    >
      {/* Pure Typographic Wordmark — No Icon Box */}
      <span className="text-[22px] font-extrabold tracking-[-0.04em] text-[#18221E] transition-colors duration-200 group-hover:text-[#134E4A]">
        Jovix
      </span>

      {/* Bespoke Amber Punctum (Theme Accent Dot) */}
      <span
        aria-hidden="true"
        className="inline-block w-1.5 h-1.5 rounded-full bg-[#D97706] mx-1 -translate-y-[2px] transition-all duration-200 group-hover:scale-125 group-hover:bg-[#C2410C]"
      />

      {/* Suffix AI with Clean Monospace Contrast */}
      <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#134E4A] transition-colors duration-200 group-hover:text-[#D97706]">
        AI
      </span>
    </Link>
  );
}
