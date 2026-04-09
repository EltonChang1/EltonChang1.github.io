import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { RESUME_PAGE_PATH, RESUME_PDF_URL } from "@/constants/resume";
import { cn } from "@/lib/utils";

/** Optional dark-mode atmosphere (subtle; not a “product screenshot” block). */
const HERO_BG_DARK =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=3276&q=80";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <div className="overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate z-[2] hidden contain-strict opacity-50 lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[350px] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section
          aria-labelledby="hero-heading"
          className="pb-16 md:pb-24"
        >
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <img
                src={HERO_BG_DARK}
                alt=""
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width={3276}
                height={4095}
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to="/#featured-projects"
                    className="group bg-muted hover:bg-background dark:hover:border-t-border mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      See featured projects
                    </span>
                    <span className="block h-4 w-0.5 border-l bg-white dark:border-background dark:bg-zinc-700" />

                    <div className="size-6 overflow-hidden rounded-full bg-background duration-500 group-hover:bg-muted">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1
                    id="hero-heading"
                    className="mx-auto mt-8 max-w-4xl text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]"
                  >
                    Elton Chang
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    Software engineer and builder. Browse projects and
                    documentation below, open my résumé, or reach out to
                    collaborate.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div className="rounded-[14px] border border-border/80 bg-foreground/10 p-0.5">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link to="/#featured-projects">
                        <span className="text-nowrap">View projects</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-11 rounded-xl px-5"
                  >
                    <Link to={RESUME_PAGE_PATH}>
                      <span className="text-nowrap">View résumé</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const menuItems = [
  { name: "Home", to: "/" as const },
  { name: "Projects", to: "/projects" as const },
  { name: "Résumé", to: RESUME_PAGE_PATH },
  { name: "Contact", to: "/#contact" as const },
];

function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="group fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "max-w-4xl rounded-2xl border border-border/80 bg-background/50 backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="Elton Chang home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

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
                    <Link
                      to={item.to}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border/80 bg-background p-6 shadow-2xl shadow-zinc-300/20 group-data-[state=active]:block md:flex-nowrap dark:shadow-none lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
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
                  <a href="mailto:eltonchangtac@gmail.com">
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

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-lg font-bold tracking-tight text-foreground",
        className
      )}
    >
      Elton
    </span>
  );
}
