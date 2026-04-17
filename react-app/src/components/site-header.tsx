import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { BrandHomeLink } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { RESUME_PAGE_PATH, RESUME_PDF_URL } from "@/constants/resume";
import { SITE_EMAIL } from "@/constants/social";
import { cn } from "@/lib/utils";

/**
 * Same shell and scroll behavior as `HeroHeader` on the home page: fixed bar,
 * pill (rounded + border + blur) after scroll, mobile drawer, right-side actions.
 */
const menuItems = [
  { name: "Home", to: "/" as const },
  { name: "Projects", to: "/projects" as const },
  { name: "Résumé", to: RESUME_PAGE_PATH },
  { name: "Contact", to: "/#contact" as const },
];

const navLinkClass =
  "text-muted-foreground hover:text-accent-foreground block duration-150";

export function SiteHeader() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="group fixed inset-x-0 top-0 z-50 w-full px-2 pt-[max(0.25rem,env(safe-area-inset-top,0px))]"
      >
        <div
          className={cn(
            "mx-auto max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled ? "mt-1.5" : "mt-0",
            isScrolled &&
              "max-w-4xl rounded-2xl border border-border/80 bg-background/50 backdrop-blur-lg lg:px-5",
          )}
        >
          <div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-3",
              isScrolled && "gap-3 py-1.5 lg:gap-0 lg:py-2",
            )}
          >
            <div className="flex w-full justify-between lg:w-auto">
              <BrandHomeLink
                logoClassName={cn(
                  "transition-[height,max-width,opacity] duration-300 ease-out",
                  isScrolled
                    ? "h-9 max-w-[min(170px,40vw)] opacity-100 sm:h-10 md:h-10 lg:h-10"
                    : "drop-shadow-sm",
                )}
              />

              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close menu" : "Open menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:scale-0 group-data-[state=active]:rotate-180 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          navLinkClass,
                          isActive && "font-semibold text-foreground",
                        )
                      }
                      end={item.to === "/"}
                    >
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border/80 bg-background p-6 shadow-2xl shadow-zinc-300/20 group-data-[state=active]:block md:flex-nowrap dark:shadow-none lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          cn(
                            navLinkClass,
                            isActive && "font-semibold text-foreground",
                          )
                        }
                        end={item.to === "/"}
                        onClick={() => setMenuState(false)}
                      >
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <a href={RESUME_PDF_URL} download>
                    <span>Download PDF</span>
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <a
                    href="https://github.com/EltonChang1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>GitHub</span>
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  <a href={`mailto:${SITE_EMAIL}`}>
                    <span>Email me</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
