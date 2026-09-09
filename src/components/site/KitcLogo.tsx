import { Link } from "@tanstack/react-router";

interface KitcLogoProps {
  className?: string;
  imgClassName?: string;
  showLink?: boolean;
}

export function KitcLogo({ className = "", imgClassName = "h-10 sm:h-11", showLink = true }: KitcLogoProps) {
  const content = (
    <img
      src="/kitc-logo.png"
      alt="Kakatheeya Industrial Training Centre (KITC)"
      className={`${imgClassName} w-auto object-contain ${className}`}
    />
  );

  if (showLink) {
    return (
      <Link to="/" className="inline-flex items-center gap-2">
        {content}
      </Link>
    );
  }

  return content;
}
