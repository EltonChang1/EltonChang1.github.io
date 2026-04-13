import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { BrandHomeLink } from "@/components/brand-logo";
import { RESUME_PAGE_PATH, RESUME_PDF_URL } from "@/constants/resume";
import { cn } from "@/lib/utils";

const linkClass =
  "text-muted-foreground hover:text-foreground transition-colors text-sm font-medium";

const activeClass = "text-foreground font-semibold";

/** Matches home hero nav: light glass over dotted backgrounds, stronger bar on scroll. */
export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background,box-shadow,border-color] duration-300",
        isScrolled
          ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
          : "border-b border-transparent bg-background/55 backdrop-blur-md supports-[backdrop-filter]:bg-background/45",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandHomeLink />
        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6"
          aria-label="Main"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => cn(linkClass, isActive && activeClass)}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => cn(linkClass, isActive && activeClass)}
          >
            Projects
          </NavLink>
          <NavLink
            to={RESUME_PAGE_PATH}
            className={({ isActive }) => cn(linkClass, isActive && activeClass)}
          >
            Résumé
          </NavLink>
          <a
            href={RESUME_PDF_URL}
            download
            className={linkClass}
            title="Download résumé PDF"
          >
            PDF
          </a>
          <a
            href="https://github.com/EltonChang1"
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <Link to="/#contact" className={linkClass}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
