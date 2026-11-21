import Link from "next/link";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className = "" }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0] rounded-sm transition-opacity duration-150 select-none ${className}`}
      aria-label="Jovix Home"
    >
      {/* Pure Typographic Wordmark — Prominent, Clean, Bold */}
      <span className="text-[26px] sm:text-[28px] font-extrabold tracking-[-0.045em] text-[#18221E] transition-colors duration-200 group-hover:text-[#134E4A]">
        Jovix
      </span>
    </Link>
  );
}
