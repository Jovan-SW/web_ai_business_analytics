import Link from "next/link";

interface NavAuthActionsProps {
  className?: string;
  onActionClick?: () => void;
  hideSecondaryOnMobile?: boolean;
}

export function NavAuthActions({
  className = "",
  onActionClick,
}: NavAuthActionsProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Secondary Action: Plain text link as per taste system standard */}
      <Link
        href="#login"
        onClick={onActionClick}
        className="px-3 py-1.5 text-[14px] font-medium text-[#18221E]/80 hover:text-[#134E4A] rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A]"
      >
        Sign in
      </Link>

      {/* Primary Action Button: Solid Deep Forest Teal, micro-step hover & press */}
      <Link
        href="#register"
        onClick={onActionClick}
        className="inline-flex items-center justify-center px-4 py-1.5 text-[14px] font-medium text-white bg-[#134E4A] hover:bg-[#0F3F3C] active:scale-[0.98] rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#134E4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
      >
        Get started
      </Link>
    </div>
  );
}
