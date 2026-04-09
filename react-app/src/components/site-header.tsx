import { Link, NavLink } from "react-router-dom";

import { RESUME_PAGE_PATH, RESUME_PDF_URL } from "@/constants/resume";
import { cn } from "@/lib/utils";

const linkClass =
  "text-muted-foreground hover:text-foreground transition-colors text-sm font-medium";

const activeClass = "text-foreground font-semibold";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Elton
        </Link>
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
