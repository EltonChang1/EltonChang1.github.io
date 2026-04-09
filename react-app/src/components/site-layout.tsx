import { Outlet, useLocation } from "react-router-dom";

import { ScrollToHash } from "@/components/scroll-to-hash";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

export function SiteLayout() {
  const { pathname } = useLocation();
  const showSiteHeader = pathname !== "/";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md"
      >
        Skip to main content
      </a>
      <ScrollToHash />
      {showSiteHeader && <SiteHeader />}
      <main
        id="main-content"
        className={cn(
          showSiteHeader && "min-h-[calc(100svh-3.5rem)]"
        )}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
