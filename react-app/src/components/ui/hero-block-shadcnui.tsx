import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { IconGithub, IconLinkedin } from "@/components/brand-icons";
import { LINKEDIN_URL, SITE_EMAIL } from "@/constants/social";

export function HeroBlock() {
  const reduceMotion = useReducedMotion();
  const t = (normal: object) => (reduceMotion ? { duration: 0 } : normal);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
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
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-background shadow-lg ring-2 ring-primary/20 sm:h-36 sm:w-36">
              <img
                src="/elton.jpg"
                alt="Elton Chang"
                className="h-full w-full object-cover"
                width={144}
                height={144}
                loading="eager"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.25, duration: 0.5 })}
            className="mb-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-sm"
          >
            Software engineering · Data science · Machine learning
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.3, duration: 0.6 })}
            className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl"
          >
            Hi, I&apos;m <span className="text-primary">Elton</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.35, duration: 0.6 })}
            className="mx-auto mb-2 max-w-3xl text-lg font-medium text-foreground md:text-xl"
          >
            Full stack developer
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.4, duration: 0.6 })}
            className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground md:text-xl"
          >
            I build full-stack systems, work with data end-to-end, and ship ML
            that holds up in practice—studying Data Analytics for Science at
            Carnegie Mellon. I also love building things I wish existed: useful,
            a little nerdy, and weirdly hard to find online.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t({ delay: 0.5, duration: 0.6 })}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="gap-2" asChild>
              <Link to="/projects">
                View Projects
                <ArrowDown className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={`mailto:${SITE_EMAIL}`}>
                <Mail className="h-4 w-4" />
                Get in Touch
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
              { icon: IconLinkedin, href: LINKEDIN_URL, label: "LinkedIn" },
              {
                icon: Mail,
                href: `mailto:${SITE_EMAIL}`,
                label: "Email",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  social.href.startsWith("http") ? "noreferrer" : undefined
                }
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

      <motion.a
        href="#featured-projects"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={
          reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, 10, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { delay: 1, duration: 0.6 },
                y: { delay: 1.5, duration: 1.5, repeat: Infinity },
              }
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Scroll to featured projects"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
