import { Link } from "@tanstack/react-router";

interface KitcLogoProps {
  className?: string;
  imgClassName?: string;
  showLink?: boolean;
  variant?: "header" | "mobile" | "footer" | "raw";
}

export function KitcLogo({
  className = "",
  imgClassName = "h-11 sm:h-12",
  showLink = true,
  variant = "header",
}: KitcLogoProps) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/kitc-favicon-512.png"
        alt="Kakatheeya Foundation - KITC Logo"
        className={`${imgClassName} w-auto object-contain rounded-full shadow-md bg-white p-0.5 border border-white/40 shrink-0`}
      />
      {variant === "header" && (
        <div className="flex flex-col text-left leading-tight">
          <span className="font-display font-black text-sm sm:text-base md:text-[17px] tracking-tight text-white drop-shadow-sm">
            KAKATHEEYA FOUNDATION
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#e8a040]">
            Industrial Training Centre
          </span>
        </div>
      )}
      {variant === "mobile" && (
        <div className="flex flex-col text-left leading-tight">
          <span className="font-display font-black text-base tracking-tight text-[#8b2315]">
            KAKATHEEYA FOUNDATION
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">
            Industrial Training Centre
          </span>
        </div>
      )}
      {variant === "footer" && (
        <div className="flex flex-col text-left leading-tight">
          <span className="font-display font-black text-xs sm:text-sm tracking-tight text-[#8b2315]">
            KAKATHEEYA FOUNDATION
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            KITC — Helping Hands
          </span>
        </div>
      )}
    </div>
  );

  if (showLink) {
    return (
      <Link to="/" className="inline-flex items-center group transition-transform hover:opacity-95">
        {content}
      </Link>
    );
  }

  return content;
}
