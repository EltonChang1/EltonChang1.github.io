import { Outlet } from "react-router-dom";

import { ScrollToHash } from "@/components/scroll-to-hash";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteLayout() {
  return (
    <>
      <ScrollToHash />
      <SiteHeader />
      <main className="min-h-[calc(100svh-3.5rem)]">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
