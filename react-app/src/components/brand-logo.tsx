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
      fetchPriority="high"
      className={cn(
        "h-20 w-auto max-w-full shrink-0 object-contain object-left drop-shadow-lg sm:h-24 md:h-28",
        className,
      )}
    />
  );
}

type BrandLockupProps = {
  className?: string;
  imgClassName?: string;
};

export function BrandLockup({ className, imgClassName }: BrandLockupProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <BrandMark className={imgClassName} alt={BRAND_NAME} />
    </span>
  );
}

type BrandHomeLinkProps = {
  className?: string;
  logoClassName?: string;
};

export function BrandHomeLink({
  className,
  logoClassName,
}: BrandHomeLinkProps) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex min-w-0 max-w-full items-center rounded-md outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label={`${BRAND_NAME} — Home`}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt=""
        aria-hidden
        decoding="async"
        fetchPriority="high"
        className={cn(
          "h-20 w-auto max-w-[min(560px,94vw)] object-contain object-left drop-shadow-lg sm:h-24 sm:max-w-[min(640px,92vw)] md:h-28 lg:h-32",
          logoClassName,
        )}
      />
    </Link>
  );
}
