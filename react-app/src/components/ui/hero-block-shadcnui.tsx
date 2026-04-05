import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import type { SVGProps } from "react";

/** Lucide v1+ omits some brand marks; minimal inline SVGs match the original design intent. */
function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Public-domain style portrait from Unsplash (direct CDN). Replace with your own asset when ready. */
const HERO_AVATAR_SRC =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=384&h=384&fit=crop&q=80";

export function HeroBlock() {
  const reduceMotion = useReducedMotion();
  const t = (normal: object) => (reduceMotion ? { duration: 0 } : normal);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t({ duration: 0.6 })}
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={t({ delay: 0.2, type: "spring", stiffness: 200 })}
            className="mb-6 inline-block"
          >
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-lg ring-2 ring-primary/20">
              <img
                src={HERO_AVATAR_SRC}
                alt="Portrait placeholder — swap for your photo"
                className="h-full w-full object-cover"
                width={96}
                height={96}
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.3, duration: 0.6 })}
            className="mb-6 text-5xl font-bold text-foreground md:text-7xl"
          >
            Full Stack Developer
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.4, duration: 0.6 })}
            className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground md:text-2xl"
          >
            Crafting beautiful, performant web applications with modern
            technologies. Passionate about clean code and exceptional user
            experiences.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.5, duration: 0.6 })}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="gap-2" asChild>
              <a href="mailto:eltonchangtac@gmail.com">
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t({ delay: 0.6, duration: 0.6 })}
            className="flex justify-center gap-4"
          >
            {[
              {
                icon: IconGithub,
                href: "https://github.com/EltonChang1",
                label: "GitHub",
              },
              { icon: IconLinkedin, href: "#", label: "LinkedIn" },
              {
                icon: Mail,
                href: "mailto:eltonchangtac@gmail.com",
                label: "Email",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                initial={false}
                whileHover={reduceMotion ? undefined : { scale: 1.1, y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: [0, 10, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { delay: 1, duration: 0.6 },
                y: { delay: 1.5, duration: 1.5, repeat: Infinity },
              }
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        aria-hidden
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
