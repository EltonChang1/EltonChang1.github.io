import { Link } from "react-router-dom";

import { BRAND_LOGO_SRC, BRAND_NAME, BRAND_SHORT } from "@/constants/brand";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  size?: number;
  className?: string;
  /** Use empty string when a visible wordmark carries the name. */
  alt?: string;
  "aria-hidden"?: boolean;
};

export function BrandMark({
  size = 32,
  className,
  alt = BRAND_NAME,
  "aria-hidden": ariaHidden,
}: BrandMarkProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={alt}
      aria-hidden={ariaHidden}
      width={size}
      height={size}
      decoding="async"
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

type BrandLockupProps = {
  className?: string;
  markClassName?: string;
  size?: number;
  variant?: "full" | "short";
};

/**
 * Logo mark + wordmark for headers and footers.
 */
export function BrandLockup({
  className,
  markClassName,
  size = 30,
  variant = "full",
}: BrandLockupProps) {
  const label = variant === "full" ? BRAND_NAME : BRAND_SHORT;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={size} className={markClassName} alt="" aria-hidden />
      <span className="font-bold tracking-tight text-foreground">{label}</span>
    </span>
  );
}

type BrandHomeLinkProps = {
  className?: string;
  size?: number;
  variant?: "full" | "short" | "responsive";
};

/** Clickable home link with lockup (site chrome). */
export function BrandHomeLink({
  className,
  size = 28,
  variant = "responsive",
}: BrandHomeLinkProps) {
  const wordmark =
    variant === "short" ? (
      BRAND_SHORT
    ) : variant === "full" ? (
      BRAND_NAME
    ) : (
      <>
        <span className="sm:hidden">{BRAND_SHORT}</span>
        <span className="hidden sm:inline">{BRAND_NAME}</span>
      </>
    );

  return (
    <Link
      to="/"
      className={cn(
        "inline-flex min-w-0 items-center gap-2 rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`${BRAND_NAME} — Home`}
    >
      <BrandMark size={size} alt="" aria-hidden />
      <span className="whitespace-nowrap text-lg font-bold tracking-tight text-foreground">
        {wordmark}
      </span>
    </Link>
  );
}
