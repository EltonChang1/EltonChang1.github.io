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
        "h-12 w-auto max-w-full shrink-0 object-contain object-left sm:h-14 md:h-16",
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
        "inline-flex min-w-0 max-w-full items-center rounded-md outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
          "h-11 w-auto max-w-[min(260px,72vw)] object-contain object-left opacity-90 sm:h-12 sm:max-w-[min(300px,70vw)] md:h-14 md:max-w-[min(340px,65vw)] lg:h-14",
          logoClassName,
        )}
      />
    </Link>
  );
}
