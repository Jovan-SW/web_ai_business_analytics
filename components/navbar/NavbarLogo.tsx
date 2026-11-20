import Link from "next/link";

interface NavbarLogoProps {
  className?: string;
}

export function NavbarLogo({ className = "" }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] rounded-lg p-1 transition-transform duration-150 active:scale-95 ${className}`}
      aria-label="Jovix AI Beranda"
    >
      {/* Brand Icon / Glyph */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#134E4A] to-[#0A2E2C] shadow-sm shadow-[#134E4A]/20 ring-1 ring-[#134E4A]/30 group-hover:shadow-md group-hover:shadow-[#134E4A]/30 transition-all duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Neural / Workflow Node Geometry */}
          <path
            d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />
          {/* Inner AI Core */}
          <path
            d="M12 7.5L7.5 10V14L12 16.5L16.5 14V10L12 7.5Z"
            fill="#D97706"
            className="transition-transform duration-300 group-hover:scale-110 origin-center"
          />
          <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
        </svg>

        {/* Subtle AI Spark Indicator */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D97706]"></span>
        </span>
      </div>

      {/* Brand Typography */}
      <div className="flex items-center gap-1.5 tracking-tight">
        <span className="text-xl font-bold tracking-tight text-[#18221E] font-sans group-hover:text-[#134E4A] transition-colors">
          Jovix
        </span>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold tracking-wide bg-[#D97706]/15 text-[#C2410C] border border-[#D97706]/30">
          AI
        </span>
      </div>
    </Link>
  );
}

