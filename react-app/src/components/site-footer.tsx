import { Link } from "react-router-dom";

import { BrandLockup } from "@/components/brand-logo";
import { BRAND_NAME } from "@/constants/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/30 py-10 text-center text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4">
        <Link
          to="/"
          className="rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${BRAND_NAME} — Home`}
        >
          <BrandLockup imgClassName="h-20 w-auto drop-shadow-lg sm:h-24 md:h-28" />
        </Link>
        <p>
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
