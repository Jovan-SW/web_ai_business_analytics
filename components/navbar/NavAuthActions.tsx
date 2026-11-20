import Link from "next/link";

interface NavAuthActionsProps {
  className?: string;
  onActionClick?: () => void;
}

export function NavAuthActions({ className = "", onActionClick }: NavAuthActionsProps) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Login Button (Subtle / Ghost) */}
      <Link
        href="#login"
        onClick={onActionClick}
        className="px-4 py-2 text-sm font-medium text-[#18221E] hover:text-[#134E4A] hover:bg-[#EFECE6]/70 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A]"
      >
        Login
      </Link>

      {/* Register / CTA Button (Primary Brand Teal + AI Accent Touch) */}
      <Link
        href="#register"
        onClick={onActionClick}
        className="group relative inline-flex items-center justify-center gap-1.5 px-4.5 py-2 text-sm font-semibold text-white bg-[#134E4A] hover:bg-[#0F3F3C] active:scale-[0.98] rounded-full shadow-sm hover:shadow-md hover:shadow-[#134E4A]/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
      >
        <span>Daftar Sekarang</span>
        
        {/* Subtle AI Spark Icon */}
        <svg
          className="w-3.5 h-3.5 text-[#D97706] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      </Link>
    </div>
  );
}

