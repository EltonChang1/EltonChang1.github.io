import { Link } from "react-router-dom";

import { BRAND_LOGO_SRC, BRAND_NAME } from "@/constants/brand";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  alt?: string;
  "aria-hidden"?: boolean;
};

/**
 * Full logo image (PNG includes icon + “Elton Chang”). Use `h-* w-auto` for sizing.
 */
export function BrandMark({
  className,
  alt = BRAND_NAME,
  "aria-hidden": ariaHidden,
}: BrandMarkProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={alt}
      aria-hidden={ariaHidden}
      decoding="async"
      className={cn(
        "h-8 w-auto max-w-full shrink-0 object-contain object-left",
        className,
      )}
    />
  );
}

type BrandLockupProps = {
  className?: string;
  /** Classes for the `<img>` (e.g. `h-12 w-auto`) */
  imgClassName?: string;
};

/** Same asset as BrandMark; wordmark is already in the PNG — no extra text. */
export function BrandLockup({ className, imgClassName }: BrandLockupProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <BrandMark className={imgClassName} alt={BRAND_NAME} />
    </span>
  );
}

type BrandHomeLinkProps = {
  className?: string;
  /** Tailwind height scale for the logo in the nav */
  logoClassName?: string;
};

/** Home link: full logo image only (no duplicate wordmark). */
export function BrandHomeLink({
  className,
  logoClassName,
}: BrandHomeLinkProps) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex min-w-0 max-w-full items-center rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`${BRAND_NAME} — Home`}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt=""
        aria-hidden
        decoding="async"
        className={cn(
          "h-8 w-auto max-w-[min(280px,78vw)] object-contain object-left sm:h-9",
          logoClassName,
        )}
      />
    </Link>
  );
}
